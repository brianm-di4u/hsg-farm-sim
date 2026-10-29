// The rules. One serializable state object (gm.S) plus derived data (world, nav). No DOM here, so
// tools/balance.mjs can run the same code in Node.
import { rnd, stream, ri, pick, chance, hash } from './rng.js';
import * as D from './data.js';
import { buildWorld, naturalObjects, W, H, G, groundBlocks, isWater, FIELD, PEN, TROUGH, BIN } from './world.js';
import { makeNav, findPath } from './path.js';

export const VERSION = 1;
const SPEED = 4.5 / 60;          // tiles per tick
const NPC_SPEED = 3 / 60;
const INV_SIZE = 24;
export const HOTBAR = 8;
export const key = (x, y) => x + ',' + y;
const DIR = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

// ---------- creation ----------
export function newGame(opts = {}) {
  const seed = (opts.seed ?? 1) >>> 0;
  const S = {
    v: VERSION, seed, ch: 0, day: 0, totalDays: 0, time: D.DAY_START, tick: 0, weather: 'clear',
    money: 0, energy: D.MAX_ENERGY, maxEnergy: D.MAX_ENERGY, rs: hash(seed, 'run') | 0,
    player: { x: 4.5, y: 13.9, face: 'down', moving: false, walk: 0 }, sel: 0, inv: new Array(INV_SIZE).fill(null), jug: 0,
    soil: {}, crops: {}, objs: {}, forage: {}, animals: [], trough: 0, penOut: {}, chest: new Array(INV_SIZE).fill(null),
    npcs: {}, quests: {}, chapterEarned: 0, bin: [], cstats: null, stats: { shipped: 0, earned: 0, caught: 0, harvested: 0 },
    almanac: [], flags: {}, houseStyle: null, soakDay: -1, fishing: null, autoPath: null, summary: null,
    passOut: false, finished: false, chaptersReached: [1], log: [],
  };
  const gm = { S, world: null, nav: makeNav(), navVersion: 0, events: [] };
  enterChapter(gm, opts.era || 1, { money: opts.money });
  return gm;
}

export function attach(S) {
  const gm = { S, world: null, nav: makeNav(), navVersion: 0, events: [] };
  rebuildWorld(gm);
  return gm;
}

export function rebuildWorld(gm) {
  const S = gm.S;
  gm.world = buildWorld(S.seed, S.ch, { house: S.houseStyle || D.CHAPTERS[S.ch].house });
  gm.bmap = new Int16Array(W * H).fill(-1);
  gm.world.buildings.forEach((b, i) => { for (let y = b.y; y < b.y + b.h; y++) for (let x = b.x; x < b.x + b.w; x++) gm.bmap[y * W + x] = i; });
  gm.fixed = {};
  for (const f of gm.world.fixed) gm.fixed[key(f.x, f.y)] = f;
  gm.navVersion++;
}

const emptyCstats = () => ({ planted: 0, shipped: {}, shippedKind: {}, crafted: {}, placed: {}, collected: {}, caught: {}, donated: 0, visited: {} });

export function enterChapter(gm, ch, opts = {}) {
  const S = gm.S;
  const C = D.CHAPTERS[ch];
  const first = S.ch === 0;
  S.ch = ch; S.day = 0; S.time = D.DAY_START; S.tick = 0; S.weather = 'clear';
  if (!S.chaptersReached.includes(ch)) S.chaptersReached.push(ch);
  if (first || opts.money != null) S.money = opts.money ?? C.startMoney;
  else S.money += Math.round(C.startMoney / 2); // a family gift at each new generation (game)
  S.energy = S.maxEnergy;
  S.houseStyle = null;
  S.crops = {}; S.soil = {}; S.forage = {}; S.animals = []; S.trough = 0; S.penOut = {};
  S.quests = {}; S.chapterEarned = 0; S.cstats = emptyCstats(); S.fishing = null; S.autoPath = null; S.passOut = false;
  // Keep placed farm objects (fences, chests, sprinklers) from earlier chapters; huts and stands retire.
  const kept = {};
  for (const [k, o] of Object.entries(S.objs)) if (o.placed && !['hut', 'stand'].includes(o.t)) kept[k] = o;
  rebuildWorld(gm);
  S.objs = { ...naturalObjects(gm.world, S.seed, ch, !first), ...kept };
  // Tools: one set, era tier from the chapter. Seeds of old crops are sold back at half price.
  const inv = S.inv;
  for (let i = 0; i < inv.length; i++) {
    const it = inv[i]; if (!it) continue;
    const def = D.ITEMS[it.id];
    if (def.kind === 'tool') inv[i] = null;
    else if (def.kind === 'seed' && !D.CROPS[def.crop].ch.includes(ch)) { S.money += D.sellPrice(it.id, ch) * it.n; inv[i] = null; }
    else if (it.id === 'hut' || it.id === 'stand') inv[i] = null;
  }
  compactTools(S, ['hoe', 'jug', 'axe', 'pick', 'scythe', 'rod']);
  for (const [id, n] of C.kit) addItem(S, id, n);
  S.jug = D.JUG_CAP[C.tier] || 20;
  S.npcs = {};
  for (const [id, p] of Object.entries(D.PEOPLE)) if (p.ch === ch) {
    const at = placeOf(gm, p.sched[0][1]);
    S.npcs[id] = { pts: 0, talkDay: -1, giftDay: -1, x: at.x + 0.5, y: at.y + 0.9, path: null, place: p.sched[0][1], hidden: true, face: 'down' };
  }
  for (const q of D.QUESTS) if (q.ch === ch) S.quests[q.id] = { done: false };
  S.player.x = 4.5; S.player.y = 13.9; S.player.face = 'down';
  startDay(gm, true);
  emit(gm, 'chapter', { ch });
}

function compactTools(S, tools) {
  // Put tools in the first slots in a fixed order, shifting other items right.
  const others = S.inv.filter(Boolean);
  S.inv = new Array(INV_SIZE).fill(null);
  tools.forEach((t, i) => { S.inv[i] = { id: t, n: 1 }; });
  let j = tools.length;
  for (const it of others) { while (j < INV_SIZE && S.inv[j]) j++; if (j < INV_SIZE) S.inv[j++] = it; }
}

export const emit = (gm, type, data = {}) => { gm.events.push({ type, ...data }); };
const toast = (gm, text, kind = 'info') => emit(gm, 'toast', { text, kind });
const sound = (gm, id) => emit(gm, 'sound', { id });

// ---------- calendar ----------
export const season = (S) => D.SEASONS[Math.floor((S.day % D.YEAR_DAYS) / D.DAYS_PER_SEASON)];
export const dayOfSeason = (S) => (S.day % D.DAYS_PER_SEASON) + 1;
export const year = (S) => D.CHAPTERS[S.ch].year + Math.floor(S.day / D.YEAR_DAYS);
export const clock = (S) => { const m = S.time % 1440; const h = Math.floor(m / 60), mm = m % 60; return String(h).padStart(2, '0') + ':' + String(mm).padStart(2, '0'); };
export const dateLabel = (S) => `${D.SEASON_NAME[season(S)]} ${dayOfSeason(S)}, ${year(S)}`;
export const hearts = (pts) => Math.min(5, Math.floor(pts / 20));
export const shopOpen = (S) => S.time >= 480 && S.time < (S.ch === 1 ? 1140 : 1020);
// 0 = full daylight … 1 = full night (game curve).
export function darkness(S) {
  const t = S.time;
  if (t < 420) return 0.3 - (t - 360) / 60 * 0.3;
  if (t < 1080) return 0;
  if (t < 1200) return (t - 1080) / 120 * 0.85;
  return 0.85;
}

// ---------- inventory ----------
export function count(S, id) {
  let n = 0;
  for (const it of S.inv) if (it && matches(it.id, id)) n += it.n;
  return n;
}
export function matches(itemId, want) {
  if (want.startsWith('kind:')) return D.ITEMS[itemId] && D.ITEMS[itemId].kind === want.slice(5);
  return itemId === want;
}
export function addItem(S, id, n = 1) {
  const def = D.ITEMS[id];
  const max = def && def.kind === 'tool' ? 1 : 99;
  for (const it of S.inv) if (it && it.id === id && it.n < max) { const k = Math.min(n, max - it.n); it.n += k; n -= k; if (!n) return 0; }
  for (let i = 0; i < S.inv.length && n > 0; i++) if (!S.inv[i]) { const k = Math.min(n, max); S.inv[i] = { id, n: k }; n -= k; }
  return n; // leftover that didn't fit
}
export function removeItem(S, id, n = 1) {
  for (let i = S.inv.length - 1; i >= 0 && n > 0; i--) {
    const it = S.inv[i];
    if (it && matches(it.id, id)) { const k = Math.min(n, it.n); it.n -= k; n -= k; if (!it.n) S.inv[i] = null; }
  }
  return n === 0;
}
export const selected = (S) => S.inv[S.sel] || null;
export function swapSlots(S, a, b) { const t = S.inv[a]; S.inv[a] = S.inv[b]; S.inv[b] = t; }

// ---------- map queries ----------
export const ground = (gm, x, y) => (x < 0 || y < 0 || x >= W || y >= H ? G.ROCK : gm.world.g[y * W + x]);
const BLOCK_OBJ = new Set(['tree', 'stump', 'rock', 'outcrop', 'crystal', 'fence', 'chest', 'hut', 'stand', 'bin', 'trough', 'pen', 'sign', 'fund', 'sprinkler', 'drip']);
export function objAt(gm, x, y) { return gm.S.objs[key(x, y)] || gm.fixed[key(x, y)] || null; }
export function blocked(gm, x, y) {
  if (x < 0 || y < 0 || x >= W || y >= H) return true;
  if (groundBlocks(gm.world.g[y * W + x])) return true;
  if (gm.bmap[y * W + x] >= 0) return true;
  const o = objAt(gm, x, y);
  return !!(o && BLOCK_OBJ.has(o.t));
}
export function placeOf(gm, name) {
  const S = gm.S;
  if (name === 'stand') { const k = Object.keys(S.objs).find((k) => S.objs[k].t === 'stand'); if (k) { const [x, y] = k.split(',').map(Number); return { x, y: y + 1 }; } }
  return gm.world.places[name] || gm.world.places.street;
}
export const waterKind = (gm, x, y) => (gm.world.lake[y * W + x] ? 'lake' : 'creek');
export const inField = (x, y) => x >= FIELD.x0 && x <= FIELD.x1 && y >= FIELD.y0 && y <= FIELD.y1;
export const onFarm = (x, y) => x >= 1 && x <= 21 && y >= 7 && y <= 33;

export function target(gm) {
  const p = gm.S.player;
  const tx = Math.floor(p.x), ty = Math.floor(p.y - 0.1);
  const [dx, dy] = DIR[p.face];
  return { x: tx + dx, y: ty + dy, px: tx, py: ty };
}

// ---------- the tick ----------
// input: { mx, my } movement in -1..1. Modal UI stops the clock (the caller just doesn't tick).
export function tick(gm, input = {}) {
  const S = gm.S;
  if (S.finishedDay) return;
  S.tick++;
  if (S.tick >= D.TICKS_PER_MIN) {
    S.tick = 0; S.time++;
    if (S.time >= D.DAY_END) { sleep(gm, { passOut: true }); return; }
    visitCheck(gm);
  }
  movePlayer(gm, input);
  moveNpcs(gm);
  fishTick(gm);
  animalTick(gm);
}

function movePlayer(gm, input) {
  const S = gm.S, p = S.player;
  let mx = input.mx || 0, my = input.my || 0;
  if ((mx || my) && S.fishing) { S.fishing = null; toast(gm, 'You reel in your line.'); }
  if ((mx || my) && S.autoPath) S.autoPath = null;
  if (!mx && !my && S.autoPath && S.autoPath.length) {
    const n = S.autoPath[0];
    const dx = n.x + 0.5 - p.x, dy = n.y + 0.9 - p.y;
    if (Math.abs(dx) < 0.08 && Math.abs(dy) < 0.08) { S.autoPath.shift(); if (!S.autoPath.length) { S.autoPath = null; if (S.autoFace) { p.face = S.autoFace; S.autoFace = null; } } }
    else { mx = Math.abs(dx) > 0.04 ? Math.sign(dx) : 0; my = Math.abs(dy) > 0.04 ? Math.sign(dy) : 0; if (Math.abs(dx) > 0.04 && Math.abs(dy) > 0.04) my = 0; }
  }
  if (!mx && !my) { p.moving = false; return; }
  const len = Math.hypot(mx, my);
  let sp = SPEED * (S.energy <= 15 ? 0.7 : 1);
  if (S.autoPath) sp = Math.min(sp, Math.max(Math.abs((S.autoPath[0]?.x ?? 0) + 0.5 - p.x), Math.abs((S.autoPath[0]?.y ?? 0) + 0.9 - p.y), 0.02));
  const vx = mx / len * sp, vy = my / len * sp;
  if (Math.abs(mx) > Math.abs(my) + 0.01) p.face = mx > 0 ? 'right' : 'left';
  else if (my) p.face = my > 0 ? 'down' : 'up';
  else p.face = mx > 0 ? 'right' : 'left';
  const hw = 0.28, top = 0.2;
  const free = (x, y) => !blocked(gm, Math.floor(x - hw), Math.floor(y - top)) && !blocked(gm, Math.floor(x + hw), Math.floor(y - top))
    && !blocked(gm, Math.floor(x - hw), Math.floor(y - 0.01)) && !blocked(gm, Math.floor(x + hw), Math.floor(y - 0.01));
  if (free(p.x + vx, p.y)) p.x += vx;
  if (free(p.x, p.y + vy)) p.y += vy;
  p.x = Math.max(0.3, Math.min(W - 0.3, p.x)); p.y = Math.max(1.2, Math.min(H - 0.01, p.y));
  p.moving = true; p.walk = (p.walk + 1) % 10000;
}
function visitCheck(gm) {
  const S = gm.S, p = S.player;
  for (const [id, st] of Object.entries(S.quests)) {
    if (st.done) continue;
    const q = QUEST[id];
    if (q.type === 'visit') { const pl = placeOf(gm, q.place); if (Math.abs(pl.x + 0.5 - p.x) < 2.5 && Math.abs(pl.y + 0.5 - p.y) < 2.5) { S.cstats.visited[q.place] = true; checkQuests(gm); } }
  }
}
export const QUEST = Object.fromEntries(D.QUESTS.map((q) => [q.id, q]));

export function npcPlaceNow(S, id) {
  const p = D.PEOPLE[id];
  let place = p.sched[0][1];
  for (const [t, pl] of p.sched) if (S.time >= t) place = pl;
  if (S.weather === 'rain' && !['inn', 'hotel', 'club', 'store', 'bathhouse', 'radio', 'motel', 'brewery', 'market', 'zoo', 'court', 'drug', 'stage', 'depot', 'tradeCamp', 'drivein'].includes(place)) place = p.home;
  if (S.time >= 1320 && !(id === 'sal' && S.time < 1500)) place = p.home;
  return place;
}
// People who share a place stand side by side (a fixed offset per person in the chapter's cast).
function spotFor(gm, id, place) {
  const base = placeOf(gm, place);
  if (place === D.PEOPLE[id].home) return base;
  const cast = Object.keys(gm.S.npcs);
  const i = cast.indexOf(id);
  for (const dx of [[0, 1, -1][i % 3], 0]) { const x = base.x + dx; if (!blocked(gm, x, base.y)) return { x, y: base.y }; }
  return base;
}
function moveNpcs(gm) {
  const S = gm.S;
  const blk = (x, y) => blocked(gm, x, y);
  for (const [id, n] of Object.entries(S.npcs)) {
    const want = npcPlaceNow(S, id);
    if (want !== n.place || (!n.path && n.placeArrived !== want)) {
      n.place = want; n.placeArrived = null;
      const to = spotFor(gm, id, want);
      const sx = Math.floor(n.x), sy = Math.floor(n.y - 0.1);
      n.path = findPath(gm.nav, gm.navVersion, W, H, blk, sx, sy, to.x, to.y);
      n.path = n.path ? n.path.slice() : null;
      n.hidden = false;
      if (!n.path) { n.x = to.x + 0.5; n.y = to.y + 0.9; n.placeArrived = want; }
    }
    if (n.path && n.path.length) {
      const t = n.path[0];
      const dx = t.x + 0.5 - n.x, dy = t.y + 0.9 - n.y;
      const d = Math.hypot(dx, dy);
      if (d <= NPC_SPEED) { n.x = t.x + 0.5; n.y = t.y + 0.9; n.path.shift(); }
      else { n.x += dx / d * NPC_SPEED; n.y += dy / d * NPC_SPEED; n.face = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'); }
      n.moving = true;
      if (!n.path.length) { n.path = null; n.placeArrived = n.place; n.moving = false; n.face = 'down'; }
    } else n.moving = false;
    n.hidden = n.place === D.PEOPLE[id].home && !n.path && (S.time >= 1320 || S.time < 400);
  }
}

// ---------- energy ----------
function spend(gm, tool) {
  const S = gm.S;
  let c = D.ENERGY[tool] || 0;
  if (S.flags.whet && ['hoe', 'axe', 'pick', 'tiller'].includes(tool)) c = Math.max(1, c - 1);
  if (S.energy < c) { toast(gm, 'Too tired. Eat something, soak in the springs, or sleep.', 'warn'); sound(gm, 'nope'); return false; }
  S.energy -= c;
  return true;
}

// ---------- actions ----------
// use(): context first (person, object, building), then the selected item on the target tile.
export function use(gm, at) {
  const S = gm.S;
  if (S.fishing) return reel(gm);
  const t = at || target(gm);
  const npc = npcAt(gm, t.x, t.y);
  if (npc) return { talk: npc };
  const r = interactAt(gm, t.x, t.y);
  if (r) return r;
  return useItemAt(gm, t.x, t.y);
}

export function npcAt(gm, x, y) {
  for (const [id, n] of Object.entries(gm.S.npcs)) {
    if (n.hidden) continue;
    if (Math.abs(n.x - (x + 0.5)) < 0.75 && Math.abs(n.y - 0.5 - (y + 0.5)) < 0.8) return id;
  }
  return null;
}

export function interactAt(gm, x, y) {
  const S = gm.S;
  const bi = x >= 0 && y >= 0 && x < W && y < H ? gm.bmap[y * W + x] : -1;
  if (bi >= 0) {
    const b = gm.world.buildings[bi];
    if (b.id === 'farmhouse') return { bed: true };
    if (b.place === 'store' || b.place === 'tradeCamp') {
      if (!shopOpen(S)) { toast(gm, `The ${D.SHOPS[S.ch].name.toLowerCase()} is closed. Open 8:00 to ${S.ch === 1 ? '19:00' : '17:00'}.`); return { done: true }; }
      return { shop: true };
    }
    if (b.place === 'mill' && S.ch === 2) return mill(gm);
    if (b.label) { toast(gm, `${titleCase(b.label)}.`); return { done: true }; }
    return null;
  }
  const o = objAt(gm, x, y);
  if (o) {
    if (o.t === 'bin') return { bin: true };
    if (o.t === 'trough') return trough(gm);
    if (o.t === 'sign') return { sign: o.k };
    if (o.t === 'fund') return { fund: true };
    if (o.t === 'chest') return { chest: true };
    if (o.t === 'hut') { toast(gm, S.ch === 1 ? 'Ezra rents this hut. He pays every morning.' : 'An old rental hut.'); return { done: true }; }
    if (o.t === 'stand') { toast(gm, 'Your roadside stand. Travelers pay into the cash box each morning.'); return { done: true }; }
  }
  const sp = gm.world.special[key(x, y)];
  if (sp === 'soak') return soak(gm);
  const sel = selected(S);
  if ((sp === 'hotspring' || sp === 'cold') && sel && sel.id === 'emptyjug') return fillJug(gm, sp === 'cold' ? 'coldwater' : 'hotwater');
  if (sp === 'hotspring' && (!sel || sel.id !== 'jug')) return { sign: 'springs' };
  return null;
}
const titleCase = (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

function fillJug(gm, out) {
  const S = gm.S;
  removeItem(S, 'emptyjug', 1); addItem(S, out, 1); sound(gm, 'splash');
  toast(gm, out === 'hotwater' ? 'Filled a jug with steaming spring water.' : 'Filled a jug with cold spring water.');
  return { done: true };
}

function soak(gm) {
  const S = gm.S;
  if (S.soakDay === S.day) { toast(gm, 'You already soaked today.'); return { done: true }; }
  const fee = D.SOAK_FEE[S.ch];
  if (S.money < fee) { toast(gm, `A soak costs $${fee} (game price).`); return { done: true }; }
  S.money -= fee; S.soakDay = S.day;
  S.energy = Math.min(S.maxEnergy, S.energy + 30);
  sound(gm, 'splash');
  toast(gm, fee ? `A hot soak, $${fee}. +30 energy.` : 'A long hot soak. +30 energy.', 'good');
  return { done: true };
}

function mill(gm) {
  const S = gm.S;
  const n = count(S, 'corn');
  if (!n) { toast(gm, 'The miller grinds corn into meal. Bring corn.'); return { done: true }; }
  removeItem(S, 'corn', n); addItem(S, 'cornmeal', n);
  S.cstats.crafted.cornmeal = (S.cstats.crafted.cornmeal || 0) + n;
  sound(gm, 'craft'); toast(gm, `Ground ${n} corn into ${n} cornmeal.`, 'good');
  checkQuests(gm);
  return { done: true };
}

function trough(gm) {
  const S = gm.S;
  const sel = selected(S);
  let did = false;
  for (const [id, n] of Object.entries(S.penOut)) if (n) {
    addItem(S, id, n);
    S.cstats.collected[id] = (S.cstats.collected[id] || 0) + n;
    toast(gm, `Collected ${n} ${D.itemName(id).toLowerCase()}.`, 'good'); did = true;
  }
  S.penOut = {};
  if (S.animals.length) { S.animals.forEach((a) => { a.petDay = S.day; }); if (!did) toast(gm, 'You scratch the animals behind the ears. They look happy.'); did = true; }
  if (sel && (sel.id === 'hay' || sel.id === 'feed')) {
    const room = 20 - S.trough;
    const k = Math.min(room, sel.n);
    if (k > 0) { removeItem(S, sel.id, k); S.trough += k; toast(gm, `Put ${k} ${sel.id === 'hay' ? 'hay' : 'feed'} in the trough (${S.trough}/20).`); did = true; }
  }
  if (!did) toast(gm, S.ch === 1 ? 'An empty spot for a pen.' : `The trough has ${S.trough} feed. Animals: ${S.animals.length}/${D.PEN_MAX}. Buy animals at the store.`);
  sound(gm, 'pickup');
  checkQuests(gm);
  return { done: true };
}

export function useItemAt(gm, x, y) {
  const S = gm.S;
  const k = key(x, y);
  const crop = S.crops[k];
  if (crop && !crop.dead && isRipe(crop)) return harvest(gm, x, y);
  if (S.forage[k]) return pickForage(gm, x, y);
  const sel = selected(S);
  if (!sel) { if (crop && crop.dead) return clearDead(gm, x, y); return { none: true }; }
  const def = D.ITEMS[sel.id];
  const g = ground(gm, x, y);
  const o = S.objs[k];
  switch (sel.id) {
    case 'hoe': return hoe(gm, x, y);
    case 'jug': {
      if (isWater(g) || g === G.POOL) { S.jug = D.JUG_CAP[D.CHAPTERS[S.ch].tier]; sound(gm, 'splash'); toast(gm, 'Jug filled.'); return { done: true }; }
      if (!S.soil[k]) return { none: true };
      if (S.jug <= 0) { toast(gm, 'The jug is empty. Fill it at the creek.', 'warn'); return { none: true }; }
      if (!spend(gm, 'jug')) return { none: true };
      S.jug--; S.soil[k] = 2; sound(gm, 'water');
      return { done: true, fx: 'water' };
    }
    case 'axe': return chop(gm, x, y);
    case 'pick': return mine(gm, x, y);
    case 'scythe': {
      if (crop && crop.dead) return clearDead(gm, x, y);
      if (o && o.t === 'tuft') { if (!spend(gm, 'scythe')) return { none: true }; delete S.objs[k]; addItem(S, 'hay', 1 + (chance(S, 0.5) ? 1 : 0)); sound(gm, 'swish'); gm.navVersion++; return { done: true }; }
      return { none: true };
    }
    case 'rod': return cast(gm, x, y);
  }
  if (def.kind === 'seed') return plant(gm, x, y, def.crop);
  if (def.kind === 'placeable') return place(gm, x, y, sel.id);
  if (crop && crop.dead) return clearDead(gm, x, y);
  if (def.energy) return { eat: sel.id };
  return { none: true };
}

function hoe(gm, x, y) {
  const S = gm.S;
  const tiles = S.ch >= 5 ? lineTiles(S, x, y, 3) : [[x, y]];
  const ok = tiles.filter(([tx, ty]) => canTill(gm, tx, ty));
  if (!ok.length) {
    const o = S.objs[key(x, y)];
    if (o && (o.t === 'tuft' || o.t === 'rock')) toast(gm, o.t === 'tuft' ? 'Clear the grass with the scythe first.' : 'Break the rock with the pick first.');
    else if (!inField(x, y) && ground(gm, x, y) === G.GRASS) toast(gm, 'Till inside your field (south of the cabin).');
    return { none: true };
  }
  if (!spend(gm, S.ch >= 5 ? 'tiller' : 'hoe')) return { none: true };
  for (const [tx, ty] of ok) S.soil[key(tx, ty)] = S.weather === 'rain' || S.weather === 'snow' ? 2 : 1;
  sound(gm, 'till');
  return { done: true, fx: 'dirt' };
}
function lineTiles(S, x, y) {
  const [dx, dy] = DIR[S.player.face];
  return [0, 1, 2].map((i) => [x + dx * i, y + dy * i]);
}
function canTill(gm, x, y) {
  const S = gm.S;
  if (!inField(x, y)) return false;
  if (ground(gm, x, y) !== G.GRASS) return false;
  if (S.soil[key(x, y)] || S.crops[key(x, y)] || S.objs[key(x, y)] || gm.fixed[key(x, y)]) return false;
  return true;
}

function plant(gm, x, y, cropId) {
  const S = gm.S, k = key(x, y);
  if (!S.soil[k]) { toast(gm, 'Seeds go in tilled soil. Use the hoe first.'); return { none: true }; }
  if (S.crops[k]) return { none: true };
  const c = D.CROPS[cropId];
  if (!c.seasons.includes(season(S))) { toast(gm, `${c.name} won't grow in ${D.SEASON_NAME[season(S)]}. It grows in ${c.seasons.map((s) => D.SEASON_NAME[s]).join(' and ')}.`, 'warn'); return { none: true }; }
  removeItem(S, 'seed:' + cropId, 1);
  S.crops[k] = { id: cropId, age: 0, h: 0 };
  S.cstats.planted++;
  sound(gm, 'plant');
  checkQuests(gm);
  return { done: true };
}
export const isRipe = (c) => !c.dead && c.age >= D.CROPS[c.id].days;
export function cropStage(c) {
  if (c.dead) return -1;
  const d = D.CROPS[c.id].days;
  if (c.age >= d) return 4;
  return Math.min(3, Math.floor(c.age / d * 4));
}
function harvest(gm, x, y) {
  const S = gm.S, k = key(x, y), c = S.crops[k], def = D.CROPS[c.id];
  let n = 1 + (rnd(S) < 0.1 ? 1 : 0);
  addItem(S, c.id, n);
  S.stats.harvested += n;
  if (def.regrow) { c.age = def.days - def.regrow; c.h++; }
  else { delete S.crops[k]; S.soil[k] = 1; }
  sound(gm, 'pickup');
  emit(gm, 'pop', { x, y, item: c.id, n });
  checkQuests(gm);
  return { done: true };
}
function clearDead(gm, x, y) { delete gm.S.crops[key(x, y)]; sound(gm, 'swish'); return { done: true }; }
function pickForage(gm, x, y) {
  const S = gm.S, k = key(x, y), id = S.forage[k];
  delete S.forage[k]; addItem(S, id, 1); sound(gm, 'pickup');
  emit(gm, 'pop', { x, y, item: id, n: 1 });
  if (id === 'oakleaf' && !S.almanac.includes(D.LEAF_FACT)) emit(gm, 'card', { title: 'A rare leaf', facts: [D.LEAF_FACT] });
  return { done: true };
}
function chop(gm, x, y) {
  const S = gm.S, k = key(x, y), o = S.objs[k];
  if (!o) return { none: true };
  if (o.t === 'tree' && o.k === 'magnolia') { toast(gm, 'Leave the town\'s magnolias be.'); return { none: true }; }
  if (o.placed) return pickUp(gm, x, y);
  if (o.t !== 'tree' && o.t !== 'stump') return { none: true };
  if (!spend(gm, 'axe')) return { none: true };
  o.hp--; sound(gm, 'chop');
  if (o.hp <= 0) {
    if (o.t === 'tree') { S.objs[k] = { t: 'stump', hp: 2, since: S.totalDays }; addItem(S, 'wood', 5); emit(gm, 'pop', { x, y, item: 'wood', n: 5 }); if (o.k === 'pine' && chance(S, 0.3)) addItem(S, 'pineknot', 1); }
    else { delete S.objs[k]; addItem(S, 'wood', 2); emit(gm, 'pop', { x, y, item: 'wood', n: 2 }); gm.navVersion++; }
  }
  return { done: true, fx: 'chip' };
}
function mine(gm, x, y) {
  const S = gm.S, k = key(x, y), o = S.objs[k];
  if (!o) return { none: true };
  if (o.placed) return pickUp(gm, x, y);
  if (!['rock', 'outcrop', 'crystal'].includes(o.t)) return { none: true };
  if (!spend(gm, 'pick')) return { none: true };
  o.hp--; sound(gm, 'clink');
  if (o.hp <= 0) {
    delete S.objs[k]; gm.navVersion++;
    const loot = o.t === 'rock' ? [['stone', 3]] : o.t === 'outcrop' ? [['novaculite', 2], ['stone', 1]] : [['quartz', 1], ['stone', 1]];
    for (const [id, n] of loot) { addItem(S, id, n); emit(gm, 'pop', { x, y, item: id, n }); }
  }
  return { done: true, fx: 'spark' };
}
function pickUp(gm, x, y) {
  const S = gm.S, k = key(x, y), o = S.objs[k];
  if (o.t === 'hut' || o.t === 'stand') { toast(gm, 'That stays where it is.'); return { none: true }; }
  if (o.t === 'chest' && S.chest.some(Boolean)) { toast(gm, 'Empty the chest first.'); return { none: true }; }
  delete S.objs[k]; addItem(S, o.t, 1); gm.navVersion++; sound(gm, 'pickup');
  return { done: true };
}
function place(gm, x, y, id) {
  const S = gm.S, k = key(x, y);
  if (blocked(gm, x, y) || S.crops[k] || S.objs[k] || S.forage[k]) { toast(gm, 'Something is in the way.'); return { none: true }; }
  const g = ground(gm, x, y);
  if (id === 'stand') { if (!(onFarm(x, y) || (y >= 12 && y <= 14 && x <= 22))) { toast(gm, 'Put the stand on your land, by the road.'); return { none: true }; } }
  else if (!onFarm(x, y)) { toast(gm, 'Build on your own land (west of the creek).'); return { none: true }; }
  if (g !== G.GRASS && g !== G.PATH && g !== G.DIRT) { toast(gm, 'Not on that ground.'); return { none: true }; }
  removeItem(S, id, 1);
  S.objs[k] = { t: id, placed: true };
  if (S.soil[k] && id !== 'sprinkler' && id !== 'drip') delete S.soil[k];
  S.cstats.placed[id] = (S.cstats.placed[id] || 0) + 1;
  gm.navVersion++; sound(gm, 'place');
  if (id === 'hut') toast(gm, 'Ezra moves into the new hut. Rent: $8 a day (game price).', 'good');
  checkQuests(gm);
  return { done: true };
}
export function eat(gm, id) {
  const S = gm.S, def = D.ITEMS[id];
  if (!def || !def.energy || !count(S, id)) return false;
  if (S.energy >= S.maxEnergy) { toast(gm, 'You\'re not hungry.'); return false; }
  removeItem(S, id, 1);
  S.energy = Math.min(S.maxEnergy, S.energy + def.energy);
  sound(gm, 'eat'); toast(gm, `Ate ${def.name.toLowerCase()}. +${def.energy} energy.`);
  return true;
}

// ---------- fishing ----------
function cast(gm, x, y) {
  const S = gm.S, g = ground(gm, x, y);
  if (!isWater(g) || gm.world.special[key(x, y)]) { toast(gm, 'Cast into the creek or the lake.'); return { none: true }; }
  if (!spend(gm, 'rod')) return { none: true };
  const biteAt = ri(S, 60, 210);
  S.fishing = { phase: 'wait', t: 0, biteAt, win: S.assist ? 54 : 36, water: waterKind(gm, x, y), x, y, empty: rnd(S) < 0.35 };
  sound(gm, 'cast');
  return { done: true };
}
function fishTick(gm) {
  const S = gm.S, f = S.fishing;
  if (!f) return;
  f.t++;
  if (f.phase === 'wait' && f.t >= f.biteAt) {
    if (f.empty) { S.fishing = null; toast(gm, 'Nothing is biting. Cast again.'); return; }
    f.phase = 'bite'; sound(gm, 'bite'); emit(gm, 'bite');
  }
  else if (f.phase === 'bite' && f.t > f.biteAt + f.win) { S.fishing = null; toast(gm, 'It got away.'); sound(gm, 'nope'); }
}
export function reel(gm) {
  const S = gm.S, f = S.fishing;
  if (!f) return { none: true };
  if (f.phase === 'wait') { S.fishing = null; toast(gm, 'Too early. Wait for the bobber to dip.'); return { done: true }; }
  const id = rollFish(S, f.water);
  S.fishing = null;
  addItem(S, id, 1);
  S.cstats.caught[id] = (S.cstats.caught[id] || 0) + 1; S.stats.caught++;
  sound(gm, 'catch'); toast(gm, `Caught a ${D.FISH[id].name.toLowerCase()}!`, 'good');
  emit(gm, 'pop', { x: f.x, y: f.y, item: id, n: 1 });
  checkQuests(gm);
  return { done: true, caught: id };
}
export function fishTable(ch, water, sea) {
  return Object.entries(D.FISH).filter(([, f]) => f.ch.includes(ch) && f.w.includes(water) && f.seasons.includes(sea));
}
function rollFish(S, water) {
  const t = fishTable(S.ch, water, season(S));
  const tot = t.reduce((a, [, f]) => a + f.p, 0);
  let r = rnd(S) * tot;
  for (const [id, f] of t) { r -= f.p; if (r <= 0) return id; }
  return t[t.length - 1][0];
}

// ---------- animals ----------
function animalTick(gm) {
  const S = gm.S;
  if (!S.animals.length || S.tick % 6) return;
  for (const a of S.animals) {
    if (!a.tx || Math.hypot(a.tx - a.x, a.ty - a.y) < 0.1) {
      if (rnd(S) < 0.02) { a.tx = PEN.x0 + 0.5 + rnd(S) * (PEN.x1 - PEN.x0); a.ty = PEN.y0 + 0.7 + rnd(S) * (PEN.y1 - PEN.y0); }
      continue;
    }
    const dx = a.tx - a.x, dy = a.ty - a.y, d = Math.hypot(dx, dy);
    a.x += dx / d * 0.08; a.y += dy / d * 0.08; a.face = dx > 0 ? 'right' : 'left';
  }
}

// ---------- shop, bin, crafting ----------
export function shopList(S) {
  const sea = season(S);
  const list = [];
  for (const [id, c] of Object.entries(D.CROPS)) if (c.ch.includes(S.ch) && c.seasons.includes(sea)) list.push({ id: 'seed:' + id, price: D.seedPrice(id, S.ch) });
  for (const [id, price] of D.SHOPS[S.ch].stock) {
    if (id === 'animal') { const a = D.CHAPTERS[S.ch].animal; if (a) list.push({ id: 'animal', name: D.ANIMALS[a].name, price }); }
    else if (id === 'brickhouse') { if (!S.houseStyle) list.push({ id: 'brickhouse', name: 'Brick farmhouse (+20 stone)', price }); }
    else list.push({ id, price });
  }
  return list;
}
export function buy(gm, id, n = 1) {
  const S = gm.S;
  const e = shopList(S).find((x) => x.id === id);
  if (!e) return false;
  const cost = e.price * n;
  if (S.money < cost) { toast(gm, 'Not enough money.', 'warn'); sound(gm, 'nope'); return false; }
  if (id === 'animal') {
    const a = D.CHAPTERS[S.ch].animal;
    if (S.animals.length + n > D.PEN_MAX) { toast(gm, 'The pen holds four.', 'warn'); return false; }
    S.money -= cost;
    for (let i = 0; i < n; i++) S.animals.push({ kind: a, x: PEN.x0 + 1.5 + S.animals.length, y: PEN.y0 + 1.6, petDay: -1, born: S.day });
    toast(gm, `A ${D.ANIMALS[a].name.toLowerCase()} joins the farm. Keep feed in the trough.`, 'good'); sound(gm, 'coin');
    return true;
  }
  if (id === 'brickhouse') {
    if (count(S, 'stone') < 20) { toast(gm, 'You need 20 stone for the foundation.', 'warn'); return false; }
    S.money -= cost; removeItem(S, 'stone', 20); S.houseStyle = 'brick'; rebuildWorld(gm);
    S.flags.brick = true; toast(gm, 'Masons raise a brick farmhouse.', 'good'); sound(gm, 'coin');
    checkQuests(gm);
    return true;
  }
  const left = addItem(S, id, n);
  const got = n - left;
  if (!got) { toast(gm, 'Your pack is full.', 'warn'); return false; }
  S.money -= e.price * got; sound(gm, 'coin');
  return true;
}
export function sell(gm, id, n = 1) {
  const S = gm.S, have = count(S, id), k = Math.min(n, have), p = D.sellPrice(id, S.ch);
  if (!k || !p) return false;
  removeItem(S, id, k);
  credit(gm, p * k); sound(gm, 'coin');
  S.cstats.shipped[id] = (S.cstats.shipped[id] || 0) + k;
  const kind = D.ITEMS[id].kind; S.cstats.shippedKind[kind] = (S.cstats.shippedKind[kind] || 0) + k;
  checkQuests(gm);
  return true;
}
function credit(gm, amt) { const S = gm.S; S.money += amt; S.chapterEarned += amt; S.stats.earned += amt; }
export function toBin(gm, slot, n) {
  const S = gm.S, it = S.inv[slot];
  if (!it) return false;
  const def = D.ITEMS[it.id];
  if (!D.sellPrice(it.id, S.ch) || def.kind === 'tool') { toast(gm, 'That can\'t be shipped.'); return false; }
  const k = Math.min(n ?? it.n, it.n);
  const e = S.bin.find((b) => b.id === it.id);
  if (e) e.n += k; else S.bin.push({ id: it.id, n: k });
  it.n -= k; if (!it.n) S.inv[slot] = null;
  sound(gm, 'drop');
  return true;
}
export function fromBin(gm, i) {
  const S = gm.S, e = S.bin[i];
  if (!e) return false;
  const left = addItem(S, e.id, e.n);
  if (left) e.n = left; else S.bin.splice(i, 1);
  return true;
}
export function recipesFor(S) { return Object.entries(D.RECIPES).filter(([, r]) => r.ch.includes(S.ch)); }
export function canCraft(S, id) {
  const r = D.RECIPES[id];
  if (!r || !r.ch.includes(S.ch) || r.at !== 'pack') return false;
  return Object.entries(r.in).every(([i, n]) => count(S, i) >= n);
}
export function craft(gm, id) {
  const S = gm.S;
  if (!canCraft(S, id)) { toast(gm, 'Missing ingredients.', 'warn'); return false; }
  const r = D.RECIPES[id];
  for (const [i, n] of Object.entries(r.in)) removeItem(S, i, n);
  addItem(S, r.out[0], r.out[1]);
  S.cstats.crafted[r.out[0]] = (S.cstats.crafted[r.out[0]] || 0) + r.out[1];
  if (id === 'whetstone' && !S.flags.whet) { S.flags.whet = true; toast(gm, 'Your tools take a razor edge: the hoe, axe and pick cost 1 less energy.', 'good'); }
  sound(gm, 'craft');
  checkQuests(gm);
  return true;
}
export function donate(gm, amt) {
  const S = gm.S;
  if (S.money < amt) { toast(gm, 'Not enough money.', 'warn'); return false; }
  S.money -= amt; S.cstats.donated += amt;
  toast(gm, `Donated $${amt} to the restoration fund.`, 'good'); sound(gm, 'coin');
  checkQuests(gm);
  return true;
}

// ---------- people ----------
export function talk(gm, id) {
  const S = gm.S, n = S.npcs[id], p = D.PEOPLE[id];
  if (!n) return null;
  const out = { npc: id, name: p.name, role: p.role, lines: [], facts: [] };
  // Face the player.
  const pl = S.player;
  n.face = Math.abs(pl.x - n.x) > Math.abs(pl.y - n.y) ? (pl.x > n.x ? 'right' : 'left') : (pl.y > n.y ? 'down' : 'up');
  // Quest hand-in first; reminders follow the person's own line.
  const reminders = [];
  for (const q of D.QUESTS) {
    if (q.ch !== S.ch || q.giver !== id || S.quests[q.id].done) continue;
    if (q.type === 'deliver' || q.type === 'variety') {
      if (q.at && S.time < q.at) { reminders.push(`Come find me after ${clockOf(q.at)}. ${q.desc}`); continue; }
      if (canDeliver(S, q)) {
        if (q.type === 'deliver') for (const [it, k] of Object.entries(q.items)) removeItem(S, it, k);
        else varietyTake(S, q.n, true);
        completeQuest(gm, q);
        out.lines.push(thanks(p, q));
        out.done = q.id;
      } else reminders.push(`${q.desc} ${progressText(gm, q)}`);
    }
  }
  if (n.talkDay !== S.day) { n.talkDay = S.day; addPts(gm, id, 3); }
  const h = hearts(n.pts);
  const sea = season(S);
  const cands = p.lines.filter((l) => l.h <= h && (!l.s || l.s === sea));
  if (cands.length) {
    const best = cands.filter((l) => l.h === Math.max(...cands.map((c) => c.h)));
    const pool = (S.day + hash(id) % 3) % 2 === 0 ? best : cands;
    const l = pool[(S.day + (hash(id, S.day) % 5)) % pool.length];
    out.lines.push(l.t);
    if (l.fact) out.facts.push(l.fact);
    if (l.ref) out.facts.push(l.ref);
    if (l.legend) out.legend = true;
  }
  out.reminders = reminders;
  out.hearts = hearts(n.pts);
  sound(gm, 'talk');
  return out;
}
const clockOf = (m) => `${Math.floor(m / 60) % 24}:${String(m % 60).padStart(2, '0')}`;
function thanks(p, q) { return `${['Perfect.', 'Wonderful.', 'Just what I needed.', 'Thank you kindly.'][q.id.length % 4]} Here, this is yours. (+$${q.reward.money})`; }
export function canDeliver(S, q) {
  if (q.type === 'variety') return varietyTake(S, q.n, false);
  return Object.entries(q.items).every(([it, k]) => count(S, it) >= k);
}
function varietyTake(S, n, take) {
  const ids = [...new Set(S.inv.filter((it) => it && D.ITEMS[it.id].kind === 'crop').map((it) => it.id))];
  if (ids.length < n) return false;
  if (take) ids.slice(0, n).forEach((id) => removeItem(S, id, 1));
  return true;
}
export function addPts(gm, id, k) {
  const n = gm.S.npcs[id]; if (!n) return;
  const before = hearts(n.pts);
  n.pts = Math.max(0, Math.min(100, n.pts + k));
  if (hearts(n.pts) > before) { toast(gm, `${D.PEOPLE[id].name}: ${'♥'.repeat(hearts(n.pts))}`, 'good'); emit(gm, 'heart', { npc: id }); }
  checkQuests(gm);
}
export function giftReaction(id, item) {
  const g = D.PEOPLE[id].gifts;
  const hit = (list) => list.some((w) => matches(item, w));
  if (hit(g.love)) return 'love';
  if (hit(g.dislike)) return 'dislike';
  if (hit(g.like)) return 'like';
  return 'neutral';
}
export function give(gm, id, itemId) {
  const S = gm.S, n = S.npcs[id];
  if (!n || !itemId || !count(S, itemId)) return null;
  if (D.ITEMS[itemId].kind === 'tool') return null;
  if (n.giftDay === S.day) { toast(gm, `You already gave ${D.PEOPLE[id].name.split(' ')[0]} a gift today.`); return { already: true }; }
  const r = giftReaction(id, itemId);
  removeItem(S, itemId, 1);
  n.giftDay = S.day;
  addPts(gm, id, { love: 12, like: 6, neutral: 2, dislike: -4 }[r]);
  sound(gm, r === 'dislike' ? 'nope' : 'gift');
  const first = D.PEOPLE[id].name.split(' ')[0];
  const text = { love: `${first} lights up. "I love this!"`, like: `${first} smiles. "Thank you."`, neutral: `${first} nods. "That's kind of you."`, dislike: `${first} frowns. "Oh. Well."` }[r];
  return { reaction: r, text };
}

// ---------- quests ----------
export function questProgress(gm, q) {
  const S = gm.S, cs = S.cstats;
  switch (q.type) {
    case 'plant': return [cs.planted, q.n];
    case 'ship': return [cs.shippedKind[q.kind] || 0, q.n];
    case 'craft': return [cs.crafted[q.item] || 0, q.n];
    case 'place': return [cs.placed[q.item] || 0, q.n];
    case 'collect': return [cs.collected[q.item] || 0, q.n];
    case 'catch': return [cs.caught[q.item] || 0, q.n];
    case 'species': return [Object.keys(cs.caught).length, q.n];
    case 'earn': return [S.chapterEarned, q.n];
    case 'donate': return [cs.donated, q.n];
    case 'visit': return [cs.visited[q.place] ? 1 : 0, 1];
    case 'buyhouse': return [S.houseStyle === 'brick' ? 1 : 0, 1];
    case 'hearts': {
      if (q.npc === '*') { const c = Object.values(S.npcs).filter((n) => hearts(n.pts) >= q.n).length; return [c, q.count]; }
      return [hearts((S.npcs[q.npc] || { pts: 0 }).pts), q.n];
    }
    case 'deliver': { const e = Object.entries(q.items); return [e.reduce((a, [it, k]) => a + Math.min(k, count(S, it)), 0), e.reduce((a, [, k]) => a + k, 0)]; }
    case 'variety': { const ids = new Set(S.inv.filter((it) => it && D.ITEMS[it.id].kind === 'crop').map((it) => it.id)); return [Math.min(q.n, ids.size), q.n]; }
  }
  return [0, 1];
}
export function progressText(gm, q) { const [a, b] = questProgress(gm, q); return `(${Math.min(a, b).toLocaleString('en-US')}/${b.toLocaleString('en-US')})`; }
export function checkQuests(gm) {
  const S = gm.S;
  for (const q of D.QUESTS) {
    if (q.ch !== S.ch || !S.quests[q.id] || S.quests[q.id].done) continue;
    if (q.type === 'deliver' || q.type === 'variety') continue;
    const [a, b] = questProgress(gm, q);
    if (a >= b) completeQuest(gm, q);
  }
}
function completeQuest(gm, q) {
  const S = gm.S;
  S.quests[q.id].done = true; S.quests[q.id].day = S.day;
  if (q.reward.money) credit(gm, q.reward.money);
  if (q.reward.pts && q.giver) { const n = S.npcs[q.giver]; if (n) n.pts = Math.min(100, n.pts + q.reward.pts); }
  toast(gm, `${q.goal ? 'Goal' : 'Quest'} complete: ${q.title}${q.reward.money ? ` (+$${q.reward.money})` : ''}`, 'quest');
  sound(gm, 'quest');
  if (q.facts && q.facts.length) emit(gm, 'card', { title: q.title, facts: q.facts });
  if (goalsDone(S)) emit(gm, 'goals', { ch: S.ch });
}
export const goalsFor = (ch) => D.QUESTS.filter((q) => q.ch === ch && q.goal);
export const goalsDone = (S) => goalsFor(S.ch).every((q) => S.quests[q.id] && S.quests[q.id].done);

// ---------- days ----------
export function sleep(gm, opts = {}) {
  const S = gm.S;
  const sum = { date: dateLabel(S), shipped: [], total: 0, rent: 0, wilted: 0, passOut: !!opts.passOut, lost: 0 };
  // Shipping.
  for (const e of S.bin) {
    const p = D.sellPrice(e.id, S.ch);
    sum.shipped.push({ id: e.id, n: e.n, each: p, total: p * e.n });
    sum.total += p * e.n;
    S.cstats.shipped[e.id] = (S.cstats.shipped[e.id] || 0) + e.n;
    const kind = D.ITEMS[e.id].kind; S.cstats.shippedKind[kind] = (S.cstats.shippedKind[kind] || 0) + e.n;
  }
  S.bin = [];
  if (sum.total) credit(gm, sum.total);
  if (S.ch === 1 && Object.values(S.objs).some((o) => o.t === 'hut')) { sum.rent = 8; credit(gm, 8); }
  if (Object.values(S.objs).some((o) => o.t === 'stand')) { sum.rent += 40; credit(gm, 40); }
  if (opts.passOut) { sum.lost = Math.min(100, Math.floor(S.money * 0.1)); S.money -= sum.lost; }
  // Crops grow where watered.
  for (const [k, c] of Object.entries(S.crops)) {
    if (c.dead) continue;
    if (S.soil[k] === 2) c.age++;
  }
  // Soil dries; bare tilled soil may revert.
  const dr = stream(S.seed, 'soil', S.ch, S.day);
  for (const k of Object.keys(S.soil)) {
    if (S.crops[k]) S.soil[k] = 1;
    else if (rnd(dr) < 0.15) delete S.soil[k];
    else S.soil[k] = 1;
  }
  // Animals produce if fed.
  for (const a of S.animals) {
    if (S.trough > 0) {
      S.trough--;
      const prod = D.ANIMALS[a.kind].product;
      S.penOut[prod] = (S.penOut[prod] || 0) + (a.petDay >= S.day - 1 && chance(S, 0.25) ? 2 : 1);
    }
  }
  S.day++; S.totalDays++;
  const newSea = season(S);
  if (S.day % D.DAYS_PER_SEASON === 0) {
    for (const c of Object.values(S.crops)) if (!c.dead && !D.CROPS[c.id].seasons.includes(newSea)) { c.dead = true; sum.wilted++; }
  }
  S.summary = sum;
  S.passOut = !!opts.passOut;
  startDay(gm, false);
  if (opts.passOut) S.energy = Math.round(S.maxEnergy * 0.6);
  S.player.x = 4.5; S.player.y = 13.9; S.player.face = 'down';
  emit(gm, 'slept', { summary: sum, turn: !!opts.turn });
  return sum;
}

export function startDay(gm, first) {
  const S = gm.S;
  S.time = D.DAY_START; S.tick = 0; S.fishing = null; S.autoPath = null;
  S.energy = S.maxEnergy;
  const r = stream(S.seed, 'wx', S.ch, S.day);
  const sea = season(S);
  const p = { sp: 0.35, su: 0.22, fa: 0.25, wi: 0.25 }[sea];
  let wx = 'clear';
  if (!first && rnd(r) < p) wx = sea === 'wi' && rnd(r) < 1 / 12 ? 'snow' : 'rain';
  else if (!first && (sea === 'sp' || sea === 'fa') && rnd(r) < 0.3) wx = 'fog';
  S.weather = wx;
  if (wx === 'rain' || wx === 'snow') for (const k of Object.keys(S.soil)) S.soil[k] = 2;
  // Sprinklers water around them.
  for (const [k, o] of Object.entries(S.objs)) {
    if (o.t !== 'sprinkler' && o.t !== 'drip') continue;
    const [x, y] = k.split(',').map(Number);
    const r8 = o.t === 'drip';
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      if (!r8 && dx && dy) continue;
      const kk = key(x + dx, y + dy);
      if (S.soil[kk]) S.soil[kk] = 2;
    }
  }
  // Forage: clear yesterday's, spawn today's on free forest tiles.
  S.forage = {};
  const fr = stream(S.seed, 'forage', S.ch, S.day);
  const table = D.FORAGE[sea];
  const n = ri(fr, 4, 7);
  for (let i = 0, tries = 0; i < n && tries < 200; tries++) {
    const x = ri(fr, 1, 57), y = ri(fr, 1, 6);
    const k = key(x, y);
    if (ground(gm, x, y) !== G.FOREST || S.objs[k] || gm.fixed[k] || blocked(gm, x, y)) continue;
    let id = pick(fr, table);
    if (id === 'oakleaf' && rnd(fr) > 0.35) id = 'acorn';
    S.forage[k] = id; i++;
  }
  // Grass tufts on the farm margins (hay for animals), and stumps regrow into trees.
  const tr = stream(S.seed, 'tufts', S.ch, S.day);
  for (let i = 0, tries = 0; i < 3 && tries < 60; tries++) {
    const x = ri(tr, 2, 21), y = ri(tr, 14, 33);
    const k = key(x, y);
    if (ground(gm, x, y) !== G.GRASS || S.objs[k] || S.soil[k] || S.crops[k] || blocked(gm, x, y) || (x === 4 && y < 15)) continue;
    S.objs[k] = { t: 'tuft' }; i++;
  }
  for (const [k, o] of Object.entries(S.objs)) if (o.t === 'stump' && S.totalDays - (o.since || 0) >= 7) S.objs[k] = { t: 'tree', k: 'pine', hp: 3 };
  if (S.day % 7 === 0 && !first) {
    const rr = stream(S.seed, 'rocks', S.ch, S.day);
    for (let i = 0; i < 4; i++) { const x = ri(rr, 25, 50), y = ri(rr, 1, 6), k = key(x, y); if (ground(gm, x, y) === G.FOREST && !S.objs[k] && !S.forage[k]) S.objs[k] = { t: rnd(rr) < 0.5 ? 'outcrop' : 'rock', hp: 3 }; }
  }
  gm.navVersion++;
  for (const n of Object.values(S.npcs)) { n.path = null; n.placeArrived = null; }
  // Put people where their schedule says at dawn.
  for (const [id, n] of Object.entries(S.npcs)) {
    const at = placeOf(gm, D.PEOPLE[id].sched[0][1]);
    n.x = at.x + 0.5; n.y = at.y + 0.9; n.place = D.PEOPLE[id].sched[0][1]; n.placeArrived = n.place; n.hidden = true;
  }
}

// Turn the era: the closing card facts come back so the UI can show them.
export function turnEra(gm) {
  const S = gm.S;
  if (!goalsDone(S)) return null;
  const from = S.ch;
  const closing = D.CHAPTERS[from].closing;
  for (const f of closing) if (!S.almanac.includes(f)) S.almanac.push(f);
  if (from === 6) { S.finished = true; emit(gm, 'finale'); return { from, to: null, closing }; }
  enterChapter(gm, from + 1);
  return { from, to: from + 1, closing };
}
export function readFacts(S, ids) { for (const f of ids) if (!S.almanac.includes(f)) S.almanac.push(f); }
