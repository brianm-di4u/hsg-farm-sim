#!/usr/bin/env node
// Runs the real economy and growth sim (src/js/sim/*) in Node with scripted players and reports
// income per day, days to reach each era, and energy pressure against the PRD §9 target bands.
//   node tools/balance.mjs [seeds=6]
// The bots act through the same rule functions the game uses (till, plant, water, harvest, chop,
// mine, cast/reel, buy, craft, talk, give, sleep). Walking is modelled as a time cost per action.
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = (f) => pathToFileURL(path.join(here, '..', 'src/js/sim', f)).href;
const sim = await import(src('sim.js'));
const D = await import(src('data.js'));
const { FIELD } = await import(src('world.js'));

const SEEDS = +(process.argv[2] || 6);
const DAY_LIMIT = 1500; // the bot heads to bed by 01:00
const MIN = { tile: 3, gather: 5, town: 40, fishWalk: 10, talk: 4 };

function sel(gm, id) {
  const S = gm.S;
  let i = S.inv.findIndex((it) => it && it.id === id);
  if (i < 0) return false;
  if (i >= sim.HOTBAR) { sim.swapSlots(S, i, sim.HOTBAR - 1); i = sim.HOTBAR - 1; }
  S.sel = i; return true;
}
const k = sim.key;
const spend = (gm, m) => { gm.S.time = Math.min(D.DAY_END - 1, gm.S.time + m); };
const late = (gm) => gm.S.time >= DAY_LIMIT;

// Profit per tile-day for a crop in a chapter, over a 14-day window with replanting.
export function cropRate(id, ch) {
  const c = D.CROPS[id];
  const sell = D.sellPrice(id, ch), seed = D.seedPrice(id, ch);
  let days = 0, money = -seed, n = 0;
  if (c.regrow) { days = c.days; n = 1; while (days + c.regrow <= 14) { days += c.regrow; n++; } money += n * sell; }
  else { n = Math.floor(14 / c.days); money = n * (sell - seed); days = n * c.days; }
  return money / 14;
}
function bestCrop(gm, need) {
  const S = gm.S, sea = sim.season(S), left = D.DAYS_PER_SEASON - (S.day % D.DAYS_PER_SEASON);
  const nextSea = D.SEASONS[(D.SEASONS.indexOf(sea) + 1) % 4];
  const ok = Object.entries(D.CROPS).filter(([id, c]) => c.ch.includes(S.ch) && c.seasons.includes(sea) && (c.days <= left || c.seasons.includes(nextSea)));
  if (need) { const n = ok.find(([id]) => id === need); return n ? n[0] : null; }
  ok.sort((a, b) => cropRate(b[0], S.ch) - cropRate(a[0], S.ch));
  return ok.length ? ok[0][0] : null;
}

// Items the open goals still need (beyond what the pack holds), by item id or 'kind:x'.
function needs(gm) {
  const S = gm.S, out = {};
  const add = (id, n) => { if (n > 0) out[id] = (out[id] || 0) + n; };
  for (const q of D.QUESTS) {
    if (q.ch !== S.ch || S.quests[q.id].done) continue;
    if (q.type === 'deliver') for (const [it, n] of Object.entries(q.items)) add(it, n);
    if (q.type === 'variety') add('variety', q.n);
    if (q.type === 'craft') { for (const [it, n] of Object.entries(D.RECIPES[q.item].in)) add(it, n); }
    if (q.type === 'place') { if (!sim.count(S, q.item)) for (const [it, n] of Object.entries(D.RECIPES[q.item].in)) add(it, n); }
    if (q.type === 'buyhouse') add('stone', 20);
    if (q.type === 'catch') add('catch:' + q.item, q.n - (S.cstats.caught[q.item] || 0));
    if (q.type === 'species') add('species', q.n);
    if (q.type === 'collect') add('collect:' + q.item, q.n - (S.cstats.collected[q.item] || 0));
  }
  // Crafted deliverables need their inputs.
  const expand = { shingles: ['wood', 3, 2], cornmeal: ['corn', 1, 1], tub: null, coldwater: ['emptyjug', 1, 1], hotwater: ['emptyjug', 1, 1] };
  for (const [id, n] of Object.entries({ ...out })) {
    const have = sim.count(S, id);
    if (expand[id] && have < n) { const [inp, a, b] = expand[id]; add(inp, Math.ceil((n - have) / b) * a); }
    if (id === 'tub' && have < n) { add('wood', 30); add('hardware', 4); }
  }
  return out;
}

function harvestAll(gm) {
  const S = gm.S;
  for (const key of Object.keys(S.crops)) {
    const c = S.crops[key];
    const [x, y] = key.split(',').map(Number);
    if (c.dead) { sel(gm, 'scythe'); sim.useItemAt(gm, x, y); continue; }
    if (sim.isRipe(c)) { sim.useItemAt(gm, x, y); spend(gm, 1); }
  }
}
function waterAll(gm, stats) {
  const S = gm.S;
  if (S.weather === 'rain' || S.weather === 'snow') return;
  sel(gm, 'jug');
  const cap = D.JUG_CAP[D.CHAPTERS[S.ch].tier];
  for (const key of Object.keys(S.crops)) {
    if (S.crops[key].dead || S.soil[key] === 2 || late(gm)) continue;
    if (S.jug <= 0) { S.jug = cap; spend(gm, 8); }
    const [x, y] = key.split(',').map(Number);
    const e = S.energy;
    sim.useItemAt(gm, x, y); spend(gm, 1);
    stats.water += e - S.energy;
  }
}
function fieldTiles() { const t = []; for (let y = FIELD.y0; y <= FIELD.y1; y++) for (let x = FIELD.x0; x <= FIELD.x1; x++) t.push([x, y]); return t; }
const TILES = fieldTiles();

// Till and plant up to `want` crops, preferring crops the goals need.
function plant(gm, want, stats, needList) {
  const S = gm.S;
  let planted = Object.keys(S.crops).filter((k2) => !S.crops[k2].dead).length;
  const plan = [];
  for (const id of needList) { const c = bestCrop(gm, id); if (c) plan.push(c); }
  const filler = bestCrop(gm);
  want += plan.length;
  for (const [x, y] of TILES) {
    if (planted >= want || late(gm) || S.energy < 8) break;
    const kk = k(x, y);
    if (S.crops[kk]) continue;
    const o = S.objs[kk];
    if (o && o.t === 'rock') { sel(gm, 'pick'); while (S.objs[kk] && S.energy > 8) sim.useItemAt(gm, x, y); spend(gm, MIN.tile); continue; }
    if (o && o.t === 'tuft') { sel(gm, 'scythe'); sim.useItemAt(gm, x, y); }
    if (o && o.placed) continue;
    if (!S.soil[kk]) { sel(gm, 'hoe'); const e = S.energy; sim.useItemAt(gm, x, y); stats.till += e - S.energy; spend(gm, MIN.tile); }
    if (!S.soil[kk]) continue;
    const needed = plan.length > 0;
    const crop = needed ? plan.shift() : filler;
    if (!crop) break;
    if (!sim.count(S, 'seed:' + crop)) { if ((!needed && S.money - D.seedPrice(crop, S.ch) < (stats.reserve || 0)) || !sim.buy(gm, 'seed:' + crop, 1)) break; }
    sel(gm, 'seed:' + crop);
    if (sim.useItemAt(gm, x, y).done) { planted++; stats.planted++; }
    if (S.soil[kk] === 1 && S.weather !== 'rain') { sel(gm, 'jug'); if (S.jug <= 0) S.jug = 12; const e = S.energy; sim.useItemAt(gm, x, y); stats.water += e - S.energy; }
  }
}
function gather(gm, type, n) {
  const S = gm.S;
  const tool = type === 'tree' ? 'axe' : 'pick';
  for (const [kk, o] of Object.entries(S.objs)) {
    if (n <= 0 || late(gm) || S.energy < 10) break;
    if (o.t !== type && !(type === 'tree' && o.t === 'stump') || o.k === 'magnolia' || o.placed) continue;
    const [x, y] = kk.split(',').map(Number);
    if (x <= 21 && y >= 14 && y <= 31) continue; // keep the field for crops
    sel(gm, tool);
    const before = type === 'tree' ? sim.count(S, 'wood') : type === 'outcrop' ? sim.count(S, 'novaculite') : sim.count(S, 'stone');
    while (S.objs[kk] && S.energy >= 4) sim.useItemAt(gm, x, y);
    const after = type === 'tree' ? sim.count(S, 'wood') : type === 'outcrop' ? sim.count(S, 'novaculite') : sim.count(S, 'stone');
    n -= after - before; spend(gm, MIN.gather);
  }
}
function fishSpot(gm, kind) {
  // A water tile of the right kind with walkable ground just north of it.
  for (let y = 5; y < 44; y++) for (let x = 0; x < 60; x++) {
    const g = sim.ground(gm, x, y);
    if ((g === 4 || g === 5) && !gm.world.special[x + ',' + y] && sim.waterKind(gm, x, y) === kind && !sim.blocked(gm, x, y - 1)) return { x, y };
  }
  return { x: 22, y: 18 };
}
function fish(gm, want, stats, waterKind) {
  const S = gm.S;
  const spot = fishSpot(gm, waterKind === 'lake' && S.ch >= 4 ? 'lake' : 'creek');
  sel(gm, 'rod'); spend(gm, MIN.fishWalk);
  let got = 0;
  for (let i = 0; i < 40 && got < want && !late(gm) && S.energy >= 6; i++) {
    S.player.x = spot.x + 0.5; S.player.y = spot.y - 1 + 0.9; S.player.face = 'down';
    const r = sim.use(gm, { x: spot.x, y: spot.y });
    if (!S.fishing) break;
    let guard = 0;
    while (S.fishing && S.fishing.phase !== 'bite' && guard++ < 400) sim.tick(gm, {});
    if (S.fishing && S.fishing.phase === 'bite') { const rr = sim.reel(gm); if (rr.caught) { got++; stats.fish++; } }
  }
  return got;
}

function playDay(gm, strat, stats) {
  const S = gm.S;
  const e0 = S.energy;
  const need = needs(gm);
  { const cheapest = Math.min(...Object.keys(D.CROPS).filter((id) => D.CROPS[id].ch.includes(S.ch) && D.CROPS[id].seasons.includes(sim.season(S))).map((id) => D.seedPrice(id, S.ch)));
    const hasSeeds = S.inv.some((it) => it && D.ITEMS[it.id].kind === 'seed');
    if (isFinite(cheapest) && S.money < cheapest && !hasSeeds && !Object.keys(S.crops).length) stats.broke++; }
  harvestAll(gm);
  stats.reserve = 0;
  for (const q of D.QUESTS) if (q.ch === S.ch && !S.quests[q.id].done && strat === 'steady') { if (q.type === 'buyhouse') stats.reserve = Math.max(stats.reserve, 850); if (q.type === 'donate') stats.reserve = Math.max(stats.reserve, Math.min(800, q.n - S.cstats.donated)); }
  // Animals.
  const animal = D.CHAPTERS[S.ch].animal;
  if (animal && strat !== 'forage') {
    const wantAnimals = need['collect:' + D.ANIMALS[animal].product] || need[D.ANIMALS[animal].product] || need.milk || need.goatmilk || need.egg ? 2 : (S.money > 2500 ? 2 : 0);
    while (S.animals.length < wantAnimals && sim.buy(gm, 'animal', 1)) stats.spent++;
    if (S.animals.length) {
      const feed = S.animals.length * 2 - S.trough;
      if (feed > 0) { sim.buy(gm, 'feed', feed); sel(gm, 'feed'); }
      S.player.face = 'up'; sim.interactAt(gm, 16, 12); spend(gm, 5);
    }
  }
  // Talk to everyone for friendship goals (and gift something they like).
  if (strat === 'steady') {
    for (const id of Object.keys(S.npcs)) {
      sim.talk(gm, id); spend(gm, MIN.talk);
      const g = D.PEOPLE[id].gifts.love.concat(D.PEOPLE[id].gifts.like).find((x) => !x.startsWith('kind:') && sim.count(S, x) && !need[x] && !((need.variety || need['kind:crop']) && D.CROPS[x]));
      if (g) sim.give(gm, id, g);
      else if (!need.variety && !need['kind:crop']) { const anyCrop = S.inv.find((it) => it && D.ITEMS[it.id].kind === 'crop' && !need[it.id] && sim.giftReaction(id, it.id) !== 'dislike'); if (anyCrop) sim.give(gm, id, anyCrop.id); }
    }
    spend(gm, MIN.town);
  }
  // Farming.
  if (strat !== 'forage') {
    waterAll(gm, stats);
    const growing = (id) => Object.values(S.crops).filter((c) => c.id === id && !c.dead).length;
    const needCrops = [];
    for (const id of Object.keys(need)) if (D.CROPS[id]) for (let i = sim.count(S, id) + growing(id) * (D.CROPS[id].regrow ? 2 : 1); i < need[id] && needCrops.length < 24; i++) needCrops.push(id);
    if (need.variety) for (const id of Object.keys(D.CROPS)) if (D.CROPS[id].ch.includes(S.ch) && !sim.count(S, id)) needCrops.push(id);
    const reserve = strat === 'steady' ? 0.2 : 0.1;
    const want = Math.max(8, Math.floor((S.maxEnergy * (1 - reserve)) / 1.15));
    plant(gm, want, stats, needCrops);
  } else {
    // Forage the ridge and fish all day.
    for (const kk of Object.keys(S.forage)) { const [x, y] = kk.split(',').map(Number); sim.useItemAt(gm, x, y); spend(gm, MIN.gather); }
    fish(gm, 60, stats, S.ch >= 4 ? 'lake' : 'creek');
  }
  // Goal work.
  if (strat === 'steady') {
    for (const [id, n] of Object.entries(need)) {
      const have = sim.count(S, id);
      if (have >= n) continue;
      if (id === 'wood') gather(gm, 'tree', n - have);
      else if (id === 'stone') gather(gm, 'rock', n - have);
      else if (id === 'novaculite') gather(gm, 'outcrop', n - have);
      else if (id === 'hardware' || id === 'emptyjug') sim.buy(gm, id, n - have);
      else if (id === 'kind:fish' || D.FISH[id]) fish(gm, n - (id === 'kind:fish' ? sim.count(S, 'kind:fish') : have), stats, D.FISH[id] && D.FISH[id].w.includes('lake') && !D.FISH[id].w.includes('creek') ? 'lake' : 'creek');
      else if (id.startsWith('catch:')) fish(gm, 6, stats, 'lake');
      else if (id === 'species') { const got = Object.keys(S.cstats.caught).length; if (got < n) fish(gm, 4, stats, Object.keys(S.cstats.caught).length % 2 ? 'creek' : 'lake'); }
    }
    // Fill jugs at the springs; mill corn; craft what goals need.
    for (const [w, sp] of [['coldwater', 'cold'], ['hotwater', 'hotspring']]) if (need[w] && sim.count(S, w) < need[w]) { const n = Math.min(sim.count(S, 'emptyjug'), need[w] - sim.count(S, w)); for (let i = 0; i < n; i++) { sim.removeItem(S, 'emptyjug', 1); sim.addItem(S, w, 1); } if (n) spend(gm, 30); }
    if (need.cornmeal && S.ch === 2 && sim.count(S, 'corn')) { const n = Math.min(sim.count(S, 'corn'), need.cornmeal - sim.count(S, 'cornmeal')); if (n > 0) { sim.removeItem(S, 'corn', n); sim.addItem(S, 'cornmeal', n); spend(gm, 30); } }
    for (const q of D.QUESTS) {
      if (q.ch !== S.ch || S.quests[q.id].done) continue;
      if (q.type === 'craft' || q.type === 'place') { if (!sim.count(S, q.item) && sim.canCraft(S, q.item)) sim.craft(gm, q.item); if (q.type === 'place' && sim.count(S, q.item)) { const spot = q.item === 'stand' ? [19, 14] : [20, 10]; S.player.x = spot[0] + 0.5; S.player.y = spot[1] + 1.9; sel(gm, q.item); sim.useItemAt(gm, spot[0], spot[1]); } }
      if (q.type === 'deliver' && q.items.shingles) while (sim.count(S, 'shingles') < q.items.shingles && sim.canCraft(S, 'shingles')) sim.craft(gm, 'shingles');
      if (q.type === 'deliver' && q.items.tub && !sim.count(S, 'tub') && sim.canCraft(S, 'tub')) sim.craft(gm, 'tub');
      if (q.type === 'buyhouse') { if (S.money > 820 && sim.count(S, 'stone') >= 20) sim.buy(gm, 'brickhouse', 1); }
      if (q.type === 'donate' && S.money > 900) sim.donate(gm, Math.min(q.n - S.cstats.donated, S.money - 700));
      if (q.type === 'visit') { S.cstats.visited[q.place] = true; sim.checkQuests(gm); }
      if ((q.type === 'deliver' || q.type === 'variety') && sim.canDeliver(S, q)) { const t = S.time; if (q.at && S.time < q.at) S.time = q.at; sim.talk(gm, q.giver); S.time = Math.max(t, S.time); }
    }
  }
  if (strat !== 'forage' && strat !== 'crops' && S.energy > 30) fish(gm, 3, stats, 'creek');
  // Ship everything the goals don't need.
  for (let i = 0; i < S.inv.length; i++) {
    const it = S.inv[i]; if (!it) continue;
    const def = D.ITEMS[it.id];
    if (!['crop', 'fish', 'forage', 'product', 'craft'].includes(def.kind)) continue;
    let keep = need[it.id] || 0;
    if (def.kind === 'fish' && need['kind:fish']) keep = Math.max(keep, need['kind:fish']);
    if (def.kind === 'crop' && (need['kind:crop'] || need.variety)) keep = Math.max(keep, need['kind:crop'] ? 20 : 1);
    if (it.id === 'whetstone' || it.id === 'tub') continue;
    const n = it.n - keep;
    if (n > 0) sim.toBin(gm, i, n);
  }
  if (S.weather !== 'rain' && S.weather !== 'snow') stats.energyUsed.push((e0 - S.energy) / S.maxEnergy);
  const m0 = S.money;
  sim.sleep(gm, { turn: false });
  gm.events.length = 0;
  return S.money - m0;
}

function run(seed, strat, maxDays = 260) {
  const gm = sim.newGame({ seed });
  const res = { seed, strat, chapterDays: [], income: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }, broke: 0, energy: [], finished: false };
  const stats = { water: 0, till: 0, planted: 0, fish: 0, spent: 0, broke: 0, energyUsed: [] };
  let dayInCh = 0;
  for (let d = 0; d < maxDays; d++) {
    const ch = gm.S.ch;
    const gain = playDay(gm, strat, stats);
    res.income[ch].push(gain);
    dayInCh++;
    if (process.env.DEBUG_CH && strat === 'steady' && seed === +(process.env.DEBUG_SEED || 1017) && +process.env.DEBUG_CH === ch && dayInCh % 7 === 0) console.log('  [debug] ch' + ch + ' day ' + dayInCh + ' ' + sim.season(gm.S) + ': ' + sim.goalsFor(ch).filter((q) => !gm.S.quests[q.id].done).map((q) => q.id + ' ' + JSON.stringify(sim.questProgress(gm, q))).join('; ') + ' crops ' + JSON.stringify(Object.values(gm.S.crops).reduce((a, c) => (a[c.id] = (a[c.id] || 0) + 1, a), {})));
    if (strat === 'steady' && sim.goalsDone(gm.S)) {
      res.chapterDays.push(dayInCh); dayInCh = 0;
      const r = sim.turnEra(gm); gm.events.length = 0;
      if (!r || r.to == null) { res.finished = true; break; }
    } else if (strat !== 'steady' && dayInCh >= 21 && ch < 6) { res.chapterDays.push(dayInCh); dayInCh = 0; sim.QUESTS; for (const q of sim.goalsFor(ch)) gm.S.quests[q.id].done = true; sim.turnEra(gm); gm.events.length = 0; }
    else if (strat !== 'steady' && dayInCh >= 21 && ch === 6) break;
  }
  if (!res.finished && strat === 'steady') res.stuck = 'ch' + gm.S.ch + ' day ' + dayInCh + ': ' + sim.goalsFor(gm.S.ch).filter((q) => !gm.S.quests[q.id].done).map((q) => q.id + ' ' + JSON.stringify(sim.questProgress(gm, q))).join('; ') + ' · money ' + gm.S.money;
  res.broke = stats.broke;
  res.energy = stats.energyUsed;
  res.stats = stats;
  return res;
}

const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
const fmt = (n) => (Math.round(n * 10) / 10).toLocaleString('en-US');
const band = (v, lo, hi) => (v >= lo && v <= hi ? 'ok' : 'OUT');

console.log(`Valley of Vapors balance · ${SEEDS} seeds per strategy\n`);
// Crop table.
console.log('Crop profit per tile-day (14-day window, replanting), by chapter');
let worstRatio = 0;
for (let ch = 1; ch <= 6; ch++) {
  const rates = Object.keys(D.CROPS).filter((id) => D.CROPS[id].ch.includes(ch)).map((id) => [id, cropRate(id, ch)]).sort((a, b) => b[1] - a[1]);
  const med = rates.map((r) => r[1]).sort((a, b) => a - b)[Math.floor(rates.length / 2)];
  const ratio = rates[0][1] / med;
  worstRatio = Math.max(worstRatio, ratio);
  console.log(`  ch${ch}: ${rates.map(([id, r]) => `${id} ${fmt(r)}`).join(', ')}  · best/median ${fmt(ratio)} ${band(ratio, 0, 1.8)}`);
}
const results = {};
for (const strat of ['steady', 'crops', 'forage']) {
  results[strat] = [];
  for (let s = 1; s <= SEEDS; s++) results[strat].push(run(1000 + s * 17, strat));
}
const st = results.steady;
console.log('\nSteady strategy (works the goals, farms, fishes a little)');
for (let ch = 1; ch <= 6; ch++) {
  const inc = mean(st.map((r) => mean(r.income[ch].slice(ch === 1 ? 2 : 0, ch === 1 ? 14 : 99))));
  const days = mean(st.map((r) => r.chapterDays[ch - 1] ?? NaN));
  console.log(`  ch${ch}: income/day $${fmt(inc)} · days to finish goals ${fmt(days)} ${band(days, 12, 28)}`);
}
const totals = st.map((r) => r.chapterDays.reduce((a, b) => a + b, 0));
const finished = st.filter((r) => r.finished).length;
const inc1 = mean(st.map((r) => mean(r.income[1].slice(2, 14))));
const inc6 = mean(st.map((r) => mean(r.income[6])));
const energy = mean(st.map((r) => mean(r.energy)));
const broke = st.reduce((a, r) => a + r.broke, 0);
const chMean = (rs, ch) => mean(rs.map((r) => mean(r.income[ch])));
const cropsInc = mean(results.crops.map((r) => mean(Object.values(r.income).flat())));
const forageInc = mean(results.forage.map((r) => mean(Object.values(r.income).flat())));
const steadyAll = mean(st.map((r) => mean(Object.values(r.income).flat())));
const forageRatio = mean([1, 2, 3, 4, 5, 6].map((ch) => chMean(results.forage, ch) / chMean(results.crops, ch)).filter(isFinite));
console.log('\nIncome/day by chapter, steady / crops-only / forage+fish: ' + [1, 2, 3, 4, 5, 6].map((ch) => `$${Math.round(chMean(st, ch))}/${Math.round(chMean(results.crops, ch))}/${Math.round(chMean(results.forage, ch))}`).join(' · '));
console.log('Forage+fish ÷ crops-only by chapter: ' + [1, 2, 3, 4, 5, 6].map((ch) => (chMean(results.forage, ch) / chMean(results.crops, ch) * 100).toFixed(0) + '%').join(' · '));
console.log(`  all six chapters: ${fmt(mean(totals))} days (finished ${finished}/${SEEDS})`);
console.log('\nBy strategy (mean income per day across chapters)');
console.log(`  steady $${fmt(steadyAll)} · crops-only $${fmt(cropsInc)} · forage-and-fish $${fmt(forageInc)}`);
console.log('\nTargets (PRD §9)');
const rows = [
  ['Ch1 income/day, days 3–14', inc1, 40, 160, '$'],
  ['Ch6 income/day', inc6, 250, 900, '$'],
  ['Days for all six chapters', mean(totals), 90, 150, ''],
  ['Best crop ÷ median (worst chapter)', worstRatio, 0, 1.8, ''],
  ['Energy used per day (steady)', energy * 100, 70, 100, '%'],
  ['Forage+fish income ÷ crops-only', forageRatio * 100, 35, 80, '%'],
  ['Days unable to afford seeds', broke, 0, 0, ''],
];
for (const [name, v, lo, hi, unit] of rows) console.log(`  ${name.padEnd(36)} ${unit === '$' ? '$' : ''}${fmt(v)}${unit === '%' ? '%' : ''}  (target ${lo}–${hi})  ${band(v, lo, hi)}`);
for (let ch = 1; ch <= 6; ch++) { const d = st.map((r) => r.chapterDays[ch - 1]); console.log(`  ch${ch} days per seed: ${d.join(', ')}`); }
for (const r of st) if (r.stuck) console.log('  stuck: ' + r.stuck);
console.log('  steady stats (seed 1): ' + JSON.stringify({ ...st[0].stats, energyUsed: undefined }));
