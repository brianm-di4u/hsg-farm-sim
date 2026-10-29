// Boot, fixed-step loop, input, screen flow, saves and the window.__game test hooks.
import * as sim from './sim/sim.js';
import * as D from './sim/data.js';
import { hash } from './sim/rng.js';
import * as save from './sim/save.js';
import * as scene from './render/scene.js';
import * as ui from './ui.js';
import { play, unlock, setVolume, audioState } from './audio.js';
import { artCacheSize, clearArt } from './render/art.js';
import { FONT_FAMILIES } from './render/palette.js';
import { ART, want, allNames } from './render/assets.js';
import * as PA from './render/painted.js';
import { terrainReady } from './render/terrain.js';

const T0 = performance.now();
const DEFAULT_KEYS = { up: ['ArrowUp', 'KeyW'], down: ['ArrowDown', 'KeyS'], left: ['ArrowLeft', 'KeyA'], right: ['ArrowRight', 'KeyD'], use: ['Space', 'KeyJ'], talk: ['KeyE', 'KeyK'], eat: ['KeyF'], prev: ['KeyQ'], next: ['KeyR'], inv: ['KeyI', 'Tab'], journal: ['KeyL'], pause: ['Escape'] };
const app = {
  gm: null, settings: null, storageOK: true, paused: false, seed: null, toastLog: [], held: new Set(), queue: [], modalQueue: [],
  ui: { scene: 'title', modal: null, data: null, invTab: 'items', invPick: null, shopTab: 'buy', jTab: 'goals', rebinding: null },
  fx: { wipe: null, animAt: null }, pad: { x: 0, y: 0 }, loadMs: 0, lastRenderTitle: false, dirty: true,
};
window.__vovApp = app;
window.__vovScene = scene;

// ---------- storage ----------
function store(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); return true; } catch { return false; } }
function load(k) { try { return localStorage.getItem(k); } catch { return null; } }
function probeStorage() { try { localStorage.setItem('vov-probe', '1'); localStorage.removeItem('vov-probe'); return true; } catch { return false; } }
function loadSettings() {
  let s = {};
  try { s = JSON.parse(load(save.SETTINGS_KEY) || '{}') || {}; } catch { s = {}; }
  const keys = { ...DEFAULT_KEYS, ...(s.keys || {}) };
  return { text: s.text || 1, motion: s.motion || 'auto', touch: s.touch || 'auto', mute: !!s.mute, volume: s.volume ?? 0.5, assist: !!s.assist, contrast: !!s.contrast, gfx: s.gfx === 'simple' ? 'simple' : 'painted', keys };
}
function saveSettings() { store(save.SETTINGS_KEY, JSON.stringify(app.settings)); }
function saveGame() {
  if (!app.gm) return false;
  const ok = store(save.SAVE_KEY, save.serialize(app.gm.S));
  return ok;
}
function readSave() {
  const t = load(save.SAVE_KEY);
  if (!t) return null;
  try { return save.parse(t); } catch (e) { return { error: String(e.message || e) }; }
}

// ---------- settings ----------
function reducedMotion() {
  const m = app.settings.motion;
  if (m === 'reduced') return true;
  if (m === 'full') return false;
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function touchWanted() {
  const t = app.settings.touch;
  if (t === 'on') return true;
  if (t === 'off') return false;
  return (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) || navigator.maxTouchPoints > 0;
}
function applySettings() {
  const s = app.settings;
  document.documentElement.style.fontSize = 16 * s.text + 'px';
  document.documentElement.classList.toggle('text-l', s.text >= 1.25);
  document.body.classList.toggle('hc', !!s.contrast);
  scene.R.reduced = reducedMotion();
  setVolume(s.volume, s.mute);
  if (app.gm) app.gm.S.assist = s.assist;
  layoutVisibility();
}
function layoutVisibility() {
  const g = app.ui.scene === 'game';
  document.getElementById('hud').hidden = !g;
  document.getElementById('hotbar').hidden = !g;
  document.getElementById('touch').hidden = !(g && touchWanted());
  if (!g) document.getElementById('prompt').hidden = true;
}

// ---------- game lifecycle ----------
function startGame(gm, intro) {
  app.gm = gm;
  gm.S.assist = app.settings.assist;
  app.ui.scene = 'game';
  closeModal(true);
  ui.applyTheme(gm.S.ch); ui.resetHud();
  scene.invalidateChunks(); scene.snapCamera(gm);
  layoutVisibility();
  gm.events.length = 0;
  if (intro) introCard(gm.S.ch);
  app.dirty = true;
}
function newGame(opts = {}) {
  const seed = opts.seed ?? app.seed ?? ((Date.now() ^ (Math.random() * 1e9)) >>> 0);
  const prev = readSave();
  const gm = sim.newGame({ seed, era: opts.era || 1, money: opts.money });
  if (prev && prev.chaptersReached) for (const c of prev.chaptersReached) if (!gm.S.chaptersReached.includes(c)) gm.S.chaptersReached.push(c);
  const skip = opts.skipIntro ?? !!window.__TEST__;
  startGame(gm, !skip);
  if (opts.paused) app.paused = true;
  if (!opts.noSave) saveGame();
  return gm;
}
function continueGame() {
  const s = readSave();
  if (!s || s.error) { ui.toast(s && s.error ? 'That save could not be loaded: ' + s.error : 'No save found.', 'warn'); return false; }
  startGame(sim.attach(s), false);
  ui.toast(`Welcome back. ${sim.dateLabel(s)}.`);
  return true;
}
function toTitle() {
  if (app.gm && app.ui.scene === 'game') saveGame();
  app.ui.scene = 'title';
  closeModal(true);
  ui.applyTheme(3);
  { const nf = document.getElementById('nightfx'); nf.getContext('2d').clearRect(0, 0, nf.width, nf.height); scene.R.nightOn = false; }
  layoutVisibility();
  const s = readSave();
  const info = s && !s.error ? `Saved: Chapter ${s.ch}, ${sim.dateLabel(s)} · $${Math.round(s.money).toLocaleString('en-US')}` : s && s.error ? 'The saved game could not be read.' : (!app.storageOK ? 'Saving is unavailable in this browser.' : '');
  ui.titleScreen(!!(s && !s.error), info);
  app.ui.modal = 'title';
  app.lastRenderTitle = false;
}

// ---------- modals ----------
function openModal(name, data) {
  const gm = app.gm;
  app.ui.modal = name; app.ui.data = data ?? null;
  app.held.clear(); app.pad.x = app.pad.y = 0;
  document.getElementById('prompt').hidden = true;
  switch (name) {
    case 'inventory': ui.inventoryScreen(gm, app.ui.invTab, app.ui.invPick); break;
    case 'journal': ui.journalScreen(gm, app.ui.jTab); break;
    case 'shop': ui.shopScreen(gm, app.ui.shopTab); break;
    case 'bin': ui.binScreen(gm); break;
    case 'chest': ui.chestScreen(gm); break;
    case 'settings': ui.settingsScreen(app.ui.rebinding); break;
    case 'help': ui.helpScreen(); break;
    case 'about': ui.aboutScreen(); break;
    case 'pause': ui.pauseScreen(app.storageOK); break;
    case 'chapters': ui.chaptersScreen(chaptersReached()); break;
    case 'bed': ui.bedScreen(gm); break;
    case 'fund': ui.fundScreen(gm); break;
    case 'sign': ui.signScreen(data, gm); sim.readFacts(gm.S, data === 'quarry' ? ['c-archaeology', 'f-novaculite-quarries', 'f-razor-stone'] : D.SPRING_FACTS); break;
    case 'dialog': ui.dialogScreen(data, gm); if (data.facts) sim.readFacts(gm.S, data.facts); break;
    case 'card': ui.cardScreen(data); if (data.facts) sim.readFacts(gm.S, data.facts); break;
    case 'summary': ui.summaryScreen(gm, data); break;
    default: break;
  }
}
function refreshModal() { if (app.ui.modal && app.ui.modal !== 'title') openModal(app.ui.modal, app.ui.data); }
function closeModal(all) {
  if (all) app.modalQueue.length = 0;
  ui.hide();
  const was = app.ui.modal;
  app.ui.modal = null; app.ui.data = null; app.ui.invPick = null; app.ui.rebinding = null;
  if (!all && app.modalQueue.length) { const next = app.modalQueue.shift(); next(); return; }
  if (!all && app.ui.scene === 'title' && was !== 'title') toTitle();
  app.dirty = true;
}
function queueModal(fn) { if (app.ui.modal) app.modalQueue.push(fn); else fn(); }
function chaptersReached() { const s = readSave(); const r = new Set([1, ...(s && s.chaptersReached || []), ...(app.gm ? app.gm.S.chaptersReached : [])]); return [...r]; }

function introCard(ch) {
  const C = D.CHAPTERS[ch];
  openModal('card', { kicker: `Chapter ${ch} · ${C.year}`, title: C.title, paras: C.intro, facts: C.introFacts, note: `You play ${C.who}. The Vale family, their neighbors and all prices are fictional game content.`, button: 'Begin' });
}
function closingCard(from) {
  const C = D.CHAPTERS[from];
  openModal('card', { kicker: `Chapter ${from} closes`, title: `${C.title}: what came next`, paras: [from === 6 ? 'The springs still steam, and the valley keeps changing.' : `The years pass. Here is what history records about the time after ${C.year}.`], facts: C.closing, button: from === 6 ? 'Continue' : 'Turn the era', after: 'turn' });
}

// ---------- era turn ----------
function doTurn() {
  const gm = app.gm;
  const from = gm.S.ch;
  const r = sim.turnEra(gm);
  if (!r) return;
  play('era');
  if (r.to == null) {
    openModal('card', { kicker: 'The end of the story', title: 'The valley through the ages', paras: ['Six generations of the Vale family worked the same creek-bottom farm, from a trapper\'s trail in 1807 to a farmers\' market in 2026.', 'The farm stays open: keep playing in free play, or start again from the title screen.'], facts: [], button: 'Keep farming' });
    saveGame();
    return;
  }
  ui.applyTheme(r.to); ui.resetHud(); scene.invalidateChunks(); scene.snapCamera(gm);
  saveGame();
  startWipe(from, r.to, () => introCard(r.to));
}
function startWipe(from, to, done) {
  const c = document.getElementById('wipe');
  if (scene.R.reduced) { c.hidden = true; done(); return; }
  c.hidden = false;
  c.width = Math.round(c.clientWidth * scene.R.dpr) || window.innerWidth; c.height = Math.round(c.clientHeight * scene.R.dpr) || window.innerHeight;
  const a = document.createElement('canvas'); a.width = c.width; a.height = c.height; scene.vista(a.getContext('2d'), a.width, a.height, from);
  const b = document.createElement('canvas'); b.width = c.width; b.height = c.height; scene.vista(b.getContext('2d'), b.width, b.height, to);
  app.fx.wipe = { t0: performance.now(), dur: 1800, a, b, c, done, from, to };
}
function drawWipe(now) {
  const w = app.fx.wipe;
  const t = app.fx.animAt != null ? app.fx.animAt : now - w.t0;
  const p = Math.max(0, Math.min(1, t / w.dur));
  const ctx = w.c.getContext('2d');
  ctx.drawImage(w.a, 0, 0);
  // A soft-edged sweep from one era's painting to the next (eased), feathered over a fifth of the width.
  const e = p * p * (3 - 2 * p), band = w.c.width * 0.2, x = -band + e * (w.c.width + 2 * band);
  if (!w.m) { w.m = document.createElement('canvas'); w.m.width = w.c.width; w.m.height = w.c.height; }
  const mg = w.m.getContext('2d');
  mg.globalCompositeOperation = 'source-over'; mg.clearRect(0, 0, w.m.width, w.m.height); mg.drawImage(w.b, 0, 0);
  const gr = mg.createLinearGradient(x - band, 0, x + band, 0); gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  mg.globalCompositeOperation = 'destination-in'; mg.fillStyle = gr; mg.fillRect(0, 0, w.m.width, w.m.height);
  ctx.drawImage(w.m, 0, 0);
  ctx.fillStyle = 'rgba(16,14,12,0.7)'; ctx.fillRect(0, w.c.height - 70 * scene.R.dpr, w.c.width, 70 * scene.R.dpr);
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.font = `bold ${Math.round(26 * scene.R.dpr)}px Georgia, serif`;
  ctx.fillText(`${D.CHAPTERS[w.from].year}  →  ${D.CHAPTERS[w.to].year}`, w.c.width / 2, w.c.height - 26 * scene.R.dpr);
  if (p >= 1 && app.fx.animAt == null) { const done = w.done; app.fx.wipe = null; w.c.hidden = true; done(); }
}

// ---------- events from the sim ----------
function drainEvents() {
  const gm = app.gm;
  if (!gm || !gm.events.length) return;
  const evs = gm.events.splice(0);
  for (const e of evs) {
    switch (e.type) {
      case 'toast': ui.toast(e.text, e.kind); break;
      case 'sound': play(e.id); break;
      case 'pop': scene.addPop(e.x, e.y, e.item, e.n); break;
      case 'card': queueModal(() => openModal('card', { kicker: 'History', title: e.title, facts: e.facts })); break;
      case 'goals': ui.toast(e.ch === 6 ? 'Every goal is done! Sleep to finish the story.' : 'All five goals done! Go to bed to turn the era.', 'quest'); break;
      case 'slept': {
        play('sleep');
        const sum = e.summary;
        saveGame();
        queueModal(() => openModal('summary', sum));
        if (e.turn) app.modalQueue.push(() => closingCard(gm.S.ch));
        if (gm.S.day % 7 === 0 && !e.turn) ui.toast(`A new season: ${D.SEASON_NAME[sim.season(gm.S)]}. Check the store for new seeds.`, 'good');
        break;
      }
      case 'chapter': ui.applyTheme(e.ch); break;
      case 'heart': { const n = gm.S.npcs[e.npc]; if (n) scene.addHearts(n.x, n.y); break; }
      default: break;
    }
  }
  app.dirty = true;
}

// ---------- actions ----------
function handleResult(r, t) {
  const gm = app.gm;
  if (!r) return;
  if (r.talk) return openTalk(r.talk);
  if (r.bed) return openModal('bed');
  if (r.shop) { app.ui.shopTab = 'buy'; return openModal('shop'); }
  if (r.bin) return openModal('bin');
  if (r.chest) return openModal('chest');
  if (r.fund) return openModal('fund');
  if (r.sign) return openModal('sign', r.sign);
  if (r.eat) { sim.eat(gm, r.eat); return; }
  if (r.fx && t) scene.addFx(r.fx === 'water' ? 'water' : r.fx === 'dirt' ? 'dirt' : r.fx === 'spark' ? 'spark' : 'chip', t.x, t.y);
}
function openTalk(id) {
  const d = sim.talk(app.gm, id);
  if (d) openModal('dialog', d);
}
function doUse(at) {
  const gm = app.gm;
  if (at) { const p = gm.S.player; const dx = at.x + 0.5 - p.x, dy = at.y + 0.5 - (p.y - 0.3); p.face = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'); }
  const t = at || sim.target(gm);
  scene.R.useT = performance.now();
  handleResult(sim.use(gm, at ? { x: at.x, y: at.y } : undefined), t);
}
function doTalk() {
  const gm = app.gm;
  if (gm.S.fishing) return handleResult(sim.reel(gm));
  const t = sim.target(gm);
  const npc = sim.npcAt(gm, t.x, t.y);
  if (npc) return openTalk(npc);
  const r = sim.interactAt(gm, t.x, t.y);
  if (r) return handleResult(r, t);
  const sel = sim.selected(gm.S);
  if (sel && D.ITEMS[sel.id].energy) sim.eat(gm, sel.id);
}
function tickOnce() {
  const gm = app.gm;
  while (app.queue.length) {
    const a = app.queue.shift();
    if (app.ui.modal) continue;
    if (a.k === 'use') doUse(a.at);
    else if (a.k === 'talk') doTalk();
    drainEvents();
  }
  if (app.ui.modal || app.fx.wipe) return;
  let mx = 0, my = 0;
  const k = app.settings.keys, held = (a) => k[a].some((c) => app.held.has(c));
  if (held('left')) mx -= 1; if (held('right')) mx += 1; if (held('up')) my -= 1; if (held('down')) my += 1;
  if (!mx && !my) { mx = app.pad.x; my = app.pad.y; }
  sim.tick(gm, { mx, my });
  drainEvents();
}

// ---------- input ----------
function keyAction(code) {
  for (const [a, codes] of Object.entries(app.settings.keys)) if (codes.includes(code)) return a;
  return null;
}
function onKeyDown(e) {
  unlock();
  if (app.ui.rebinding) {
    e.preventDefault();
    const a = app.ui.rebinding;
    if (e.code !== 'Escape') {
      for (const [k, codes] of Object.entries(app.settings.keys)) app.settings.keys[k] = codes.filter((c) => c !== e.code);
      app.settings.keys[a] = [e.code, ...app.settings.keys[a].filter((c) => c !== e.code)].slice(0, 2);
      saveSettings();
    }
    app.ui.rebinding = null; ui.settingsScreen(null);
    return;
  }
  const act = keyAction(e.code);
  if (app.ui.modal) {
    if (e.code === 'Escape' || (act === 'pause' && e.code !== 'Space')) {
      e.preventDefault();
      if (['card', 'summary'].includes(app.ui.modal)) return cardNext();
      if (app.ui.modal === 'title') return;
      return closeModal();
    }
    if ((act === 'inv' && app.ui.modal === 'inventory') || (act === 'journal' && app.ui.modal === 'journal')) { e.preventDefault(); return closeModal(); }
    if (e.code === 'Tab') return; // keep focus navigation in panels
    return;
  }
  if (app.ui.scene !== 'game') return;
  if (act) e.preventDefault();
  if (/^Digit[1-8]$/.test(e.code)) { app.gm.S.sel = +e.code.slice(5) - 1; play('click'); return; }
  if (e.repeat && act !== 'up' && act !== 'down' && act !== 'left' && act !== 'right') return;
  switch (act) {
    case 'up': case 'down': case 'left': case 'right': app.held.add(e.code); break;
    case 'use': app.queue.push({ k: 'use' }); break;
    case 'talk': app.queue.push({ k: 'talk' }); break;
    case 'eat': { const s = sim.selected(app.gm.S); if (s) { sim.eat(app.gm, s.id); drainEvents(); } break; }
    case 'prev': app.gm.S.sel = (app.gm.S.sel + sim.HOTBAR - 1) % sim.HOTBAR; break;
    case 'next': app.gm.S.sel = (app.gm.S.sel + 1) % sim.HOTBAR; break;
    case 'inv': openModal('inventory'); break;
    case 'journal': openModal('journal'); break;
    case 'pause': openModal('pause'); break;
  }
}
function onKeyUp(e) { app.held.delete(e.code); }

function canvasPointer(e) {
  unlock();
  if (app.ui.scene !== 'game' || app.ui.modal || !app.gm) return;
  const rect = e.target.getBoundingClientRect();
  const t = scene.screenToTile(e.clientX - rect.left, e.clientY - rect.top);
  const gm = app.gm, p = gm.S.player;
  const px = Math.floor(p.x), py = Math.floor(p.y - 0.1);
  const d = Math.max(Math.abs(t.x - px), Math.abs(t.y - py));
  if (d <= 1 && !(t.x === px && t.y === py)) { app.queue.push({ k: 'use', at: t }); return; }
  if (d === 0) return;
  // Walk there (or next to it when it's blocked).
  let goal = t, face = null;
  if (sim.blocked(gm, t.x, t.y) || sim.npcAt(gm, t.x, t.y)) {
    const opts = [[0, 1, 'up'], [-1, 0, 'right'], [1, 0, 'left'], [0, -1, 'down']].map(([dx, dy, f]) => ({ x: t.x + dx, y: t.y + dy, f })).filter((o) => !sim.blocked(gm, o.x, o.y));
    if (!opts.length) return;
    opts.sort((a, b) => Math.hypot(a.x - px, a.y - py) - Math.hypot(b.x - px, b.y - py));
    goal = opts[0]; face = goal.f;
  }
  const path = pathTo(gm, px, py, goal.x, goal.y);
  if (path) { gm.S.autoPath = path; gm.S.autoFace = face; }
}
function pathTo(gm, sx, sy, gx, gy) {
  // Reuse the sim's BFS through a throwaway nav cache.
  const W = 60, H = 44;
  const prev = new Int32Array(W * H).fill(-1);
  const start = sy * W + sx, goal = gy * W + gx;
  prev[start] = start; const q = [start];
  for (let i = 0; i < q.length; i++) {
    const c = q[i]; if (c === goal) break;
    const cx = c % W, cy = (c / W) | 0;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = cx + dx, ny = cy + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const n = ny * W + nx; if (prev[n] !== -1 || sim.blocked(gm, nx, ny)) continue;
      prev[n] = c; q.push(n);
    }
  }
  if (prev[goal] === -1) return null;
  const out = [];
  for (let c = goal; c !== start; c = prev[c]) out.push({ x: c % W, y: (c / W) | 0 });
  return out.reverse();
}

function setupTouch() {
  const pad = document.getElementById('pad'), knob = pad.querySelector('.knob');
  let id = null;
  const move = (e) => {
    const r = pad.getBoundingClientRect();
    let dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    const len = Math.hypot(dx, dy), max = r.width / 2;
    if (len > max) { dx = dx / len * max; dy = dy / len * max; }
    knob.style.transform = `translate(${dx * 0.6}px, ${dy * 0.6}px)`;
    if (len < 12) { app.pad.x = app.pad.y = 0; return; }
    const a = Math.atan2(dy, dx), oct = Math.round(a / (Math.PI / 4));
    const dirs = { 0: [1, 0], 1: [1, 1], 2: [0, 1], 3: [-1, 1], 4: [-1, 0], '-4': [-1, 0], '-3': [-1, -1], '-2': [0, -1], '-1': [1, -1] };
    [app.pad.x, app.pad.y] = dirs[oct];
  };
  pad.addEventListener('pointerdown', (e) => { unlock(); id = e.pointerId; try { pad.setPointerCapture(id); } catch { /* */ } move(e); e.preventDefault(); });
  pad.addEventListener('pointermove', (e) => { if (e.pointerId === id) move(e); });
  const end = (e) => { if (e.pointerId !== id) return; id = null; app.pad.x = app.pad.y = 0; knob.style.transform = ''; };
  pad.addEventListener('pointerup', end); pad.addEventListener('pointercancel', end);
  document.getElementById('btn-a').addEventListener('pointerdown', (e) => { e.preventDefault(); unlock(); if (!app.ui.modal) app.queue.push({ k: 'use' }); });
  document.getElementById('btn-b').addEventListener('pointerdown', (e) => { e.preventDefault(); unlock(); if (!app.ui.modal) app.queue.push({ k: 'talk' }); });
}

// ---------- clicks on UI ----------
function cardNext() {
  const d = app.ui.data;
  closeModal();
  if (d && d.after === 'turn') doTurn();
}
function onClick(e) {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  unlock(); play('click');
  const act = el.dataset.act, arg = el.dataset.arg;
  const gm = app.gm;
  switch (act) {
    case 'open': openModal(arg); break;
    case 'close': closeModal(); break;
    case 'cardnext': cardNext(); break;
    case 'continue': continueGame(); break;
    case 'newgame': newGame({}); break;
    case 'chapter': newGame({ era: +arg }); break;
    case 'title': toTitle(); break;
    case 'save': ui.toast(saveGame() ? 'Game saved.' : 'Saving is unavailable here.', 'good'); break;
    case 'hot': gm.S.sel = +arg; break;
    case 'slot': {
      const i = +arg;
      if (app.ui.invPick != null && app.ui.invPick !== i) { sim.swapSlots(gm.S, app.ui.invPick, i); app.ui.invPick = null; }
      else { app.ui.invPick = app.ui.invPick === i ? null : i; if (i < sim.HOTBAR) gm.S.sel = i; }
      refreshModal(); break;
    }
    case 'invtab': app.ui.invTab = arg; app.ui.invPick = null; refreshModal(); break;
    case 'craft': sim.craft(gm, arg); drainEvents(); refreshModal(); break;
    case 'eat': sim.eat(gm, arg); drainEvents(); refreshModal(); break;
    case 'shoptab': app.ui.shopTab = arg; refreshModal(); break;
    case 'buy': { const [id, n] = arg.split('|'); sim.buy(gm, id, +n); drainEvents(); refreshModal(); break; }
    case 'sell': { const [id, n] = arg.split('|'); sim.sell(gm, id, +n); drainEvents(); refreshModal(); break; }
    case 'ship': sim.toBin(gm, +arg); drainEvents(); refreshModal(); break;
    case 'unship': sim.fromBin(gm, +arg); refreshModal(); break;
    case 'shipall': gm.S.inv.forEach((it, i) => { if (it && ['crop', 'fish', 'forage'].includes(D.ITEMS[it.id].kind)) sim.toBin(gm, i); }); drainEvents(); refreshModal(); break;
    case 'cslot': { const it = gm.S.chest[+arg]; if (it) { const left = sim.addItem(gm.S, it.id, it.n); if (left) it.n = left; else gm.S.chest[+arg] = null; } refreshModal(); break; }
    case 'pslot': { const it = gm.S.inv[+arg]; if (it && D.ITEMS[it.id].kind !== 'tool') { const j = gm.S.chest.findIndex((c) => !c || (c.id === it.id && c.n + it.n <= 99)); if (j >= 0) { if (gm.S.chest[j]) gm.S.chest[j].n += it.n; else gm.S.chest[j] = { ...it }; gm.S.inv[+arg] = null; } } refreshModal(); break; }
    case 'jtab': app.ui.jTab = arg; refreshModal(); break;
    case 'give': { const sel = sim.selected(gm.S); const r = sim.give(gm, arg, sel && sel.id); drainEvents(); if (r && r.text) { const d = { ...app.ui.data, giftText: r.text, hearts: sim.hearts(gm.S.npcs[arg].pts) }; openModal('dialog', d); } break; }
    case 'sleep': closeModal(); sim.sleep(gm); drainEvents(); break;
    case 'sleepturn': closeModal(); sim.sleep(gm, { turn: true }); drainEvents(); break;
    case 'donate': sim.donate(gm, +arg); drainEvents(); refreshModal(); break;
    case 'text': app.settings.text = +arg; saveSettings(); applySettings(); refreshModal(); break;
    case 'motion': app.settings.motion = arg; saveSettings(); applySettings(); refreshModal(); break;
    case 'touch': app.settings.touch = arg; saveSettings(); applySettings(); refreshModal(); break;
    case 'mute': app.settings.mute = arg === 'on'; saveSettings(); applySettings(); refreshModal(); break;
    case 'vol': app.settings.volume = +arg; app.settings.mute = false; saveSettings(); applySettings(); play('coin'); refreshModal(); break;
    case 'assist': app.settings.assist = arg === 'on'; saveSettings(); applySettings(); refreshModal(); break;
    case 'contrast': app.settings.contrast = arg === 'on'; saveSettings(); applySettings(); refreshModal(); break;
    case 'gfx': if (app.settings.gfx !== arg) { app.settings.gfx = arg; saveSettings(); ui.toast(arg === 'simple' ? 'Simple graphics from the next start (reload the page).' : 'Painted graphics from the next start (reload the page).', 'good'); } refreshModal(); break;
    case 'rebind': app.ui.rebinding = arg; ui.settingsScreen(arg); break;
    case 'resetkeys': app.settings.keys = JSON.parse(JSON.stringify(DEFAULT_KEYS)); saveSettings(); refreshModal(); break;
  }
  app.dirty = true;
}

// ---------- loop ----------
let acc = 0, lastT = 0;
function frame(now) {
  requestAnimationFrame(frame);
  const t0 = performance.now();
  frameBody(now);
  const ms = performance.now() - t0;
  app.frameMs = app.frameMs == null ? ms : app.frameMs * 0.95 + ms * 0.05;
  app.frameMax = Math.max(app.frameMax || 0, ms);
}
function frameBody(now) {
  const dt = Math.min(0.25, lastT ? (now - lastT) / 1000 : 0); lastT = now;
  if (app.fx.wipe) { drawWipe(now); return; }
  if (app.ui.scene === 'title') { if (!app.lastRenderTitle || app.titleArt !== ART.loaded) renderTitle(); return; }
  if (!app.gm) return;
  if (!app.paused && !app.ui.modal) {
    acc += dt;
    let n = 0;
    while (acc >= 1 / 60 && n < 10) { tickOnce(); acc -= 1 / 60; n++; }
    if (n >= 10) acc = 0;
  } else { acc = 0; if (app.queue.length && !app.ui.modal) tickOnce(); }
  if (app.ui.modal && app.portraitArt !== ART.loaded && PA.peopleReady()) { app.portraitArt = ART.loaded; ui.repaintPortraits(); }
  if (!app.ui.modal || app.dirty || ART.dirty) render();
}
function render() {
  const gm = app.gm;
  if (gm.S.ch !== app.artCh) { app.artCh = gm.S.ch; wantChapter(gm.S.ch); wantAll(); }
  scene.draw(gm, { showTarget: !app.ui.modal && app.ui.scene === 'game' });
  ui.hud(gm);
  const pr = document.getElementById('prompt');
  const txt = app.ui.modal ? '' : ui.describeTarget(gm);
  if (txt) { const key = touchWanted() ? (/^Talk|bed|Shop|Ship|Read|Feed|fund|Open|Soak|Grind/.test(txt) ? 'B' : 'A') : ui.keyName(app.settings.keys[/^Talk|bed|Shop|Ship|Read|Feed|fund|Open|Soak|Grind/.test(txt) ? 'talk' : 'use'][0]); const s = `${key}: ${txt}`; if (pr.textContent !== s) pr.textContent = s; pr.hidden = false; }
  else pr.hidden = true;
  app.dirty = false;
}
function renderTitle() {
  const c = scene.R.canvas, ctx = scene.R.ctx;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const s = readSave();
  const ch = s && !s.error ? s.ch : 3;
  want(['vista-' + ch]);
  scene.vista(ctx, c.width, c.height, ch);
  app.lastRenderTitle = true; app.titleArt = ART.loaded;
}

// ---------- test hooks ----------
function compact() {
  const gm = app.gm;
  const base = { scene: app.ui.scene, modal: app.ui.modal, paused: app.paused, reduced: scene.R.reduced, loadMs: app.loadMs, settings: { ...app.settings, keys: app.settings.keys }, storageOK: app.storageOK, toasts: app.toastLog.slice(-8), wipe: !!app.fx.wipe, ts: scene.R.ts, touch: touchWanted(), audioPlayed: audioState.played, artCache: artCacheSize() };
  if (!gm) return base;
  const S = gm.S;
  const t = sim.target(gm);
  return {
    ...base, ch: S.ch, era: S.ch, chapter: D.CHAPTERS[S.ch].title, year: sim.year(S), day: S.day, totalDays: S.totalDays, season: sim.season(S), dayOfSeason: sim.dayOfSeason(S), date: sim.dateLabel(S),
    time: S.time, clock: sim.clock(S), weather: S.weather, money: S.money, energy: S.energy, maxEnergy: S.maxEnergy, seed: S.seed,
    player: { x: +S.player.x.toFixed(3), y: +S.player.y.toFixed(3), tx: Math.floor(S.player.x), ty: Math.floor(S.player.y - 0.1), face: S.player.face, moving: S.player.moving },
    target: { x: t.x, y: t.y }, sel: S.sel, selItem: sim.selected(S)?.id || null, jug: S.jug,
    inv: S.inv.filter(Boolean).map((i) => ({ id: i.id, n: i.n })), invSlots: S.inv.map((i) => (i ? i.id : null)),
    soil: S.soil, crops: Object.entries(S.crops).map(([k, c]) => { const [x, y] = k.split(',').map(Number); return { x, y, id: c.id, age: c.age, stage: sim.cropStage(c), ripe: sim.isRipe(c), dead: !!c.dead }; }),
    objs: Object.keys(S.objs).length, objAt: null, forage: Object.entries(S.forage).map(([k, id]) => ({ k, id })), bin: S.bin,
    npcs: Object.entries(S.npcs).map(([id, n]) => ({ id, x: +n.x.toFixed(2), y: +n.y.toFixed(2), tx: Math.floor(n.x), ty: Math.floor(n.y - 0.1), place: n.place, hidden: n.hidden, pts: n.pts, hearts: sim.hearts(n.pts) })),
    quests: Object.entries(S.quests).map(([id, st]) => ({ id, done: st.done, goal: !!sim.QUEST[id].goal, progress: sim.questProgress(gm, sim.QUEST[id]) })),
    goalsDone: sim.goalsDone(S), canTurn: sim.goalsDone(S), fishing: S.fishing ? { ...S.fishing } : null, animals: S.animals.length, trough: S.trough, penOut: S.penOut,
    almanac: S.almanac.length, almanacIds: S.almanac, chapterEarned: S.chapterEarned, houseStyle: S.houseStyle, flags: S.flags, summary: S.summary, finished: S.finished,
    places: gm.world.places, buildings: gm.world.buildings.map((b) => ({ id: b.id, type: b.type, x: b.x, y: b.y, w: b.w, h: b.h, front: b.front, label: b.label })),
    chunkBakes: scene.R.chunkBakes, bakeMs: +(scene.R.bakeMs || 0).toFixed(1), bakeLog: (scene.R.bakeLog || []).slice(), artLoaded: ART.loaded, artPending: ART.pending, artFailed: ART.failed.slice(), artTotal: allNames().length, vectorFallback: [...scene.R.fallback],
    painted: { terrain: terrainReady(), people: PA.peopleReady(), buildings: gm.world.buildings.filter((b) => PA.buildingSprite(S.ch, b, scene.R.u)).length }, frames: scene.R.frames, particles: scene.R.particles.length, frameMs: +(app.frameMs || 0).toFixed(2), srText: document.getElementById('sr').textContent, cam: { ...scene.R.cam }, autoPath: S.autoPath ? S.autoPath.length : 0,
  };
}
function deepMerge(t, p) {
  for (const [k, v] of Object.entries(p)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && t[k] && typeof t[k] === 'object' && !Array.isArray(t[k])) deepMerge(t[k], v);
    else t[k] = v;
  }
}
const hooks = {
  seed(n) { app.seed = n >>> 0; if (app.gm) app.gm.S.rs = hash(n, 'run') | 0; return n; },
  getState: compact,
  setState(p = {}) {
    const gm = app.gm; if (!gm) return compact();
    const S = gm.S;
    const q = { ...p };
    if (q.inv) { S.inv = new Array(24).fill(null); q.inv.forEach((it, i) => { if (it) S.inv[i] = { id: it.id, n: it.n ?? 1 }; }); delete q.inv; }
    if (q.crops) { S.crops = {}; for (const c of q.crops) { S.crops[c.x + ',' + c.y] = { id: c.id, age: c.age ?? 0, h: 0, dead: !!c.dead }; if (!S.soil[c.x + ',' + c.y]) S.soil[c.x + ',' + c.y] = c.watered ? 2 : 1; } delete q.crops; }
    if (q.player) { const pl = q.player; if (pl.tx != null) { S.player.x = pl.tx + 0.5; S.player.y = pl.ty + 0.9; } if (pl.face) S.player.face = pl.face; delete q.player; }
    if (q.quests) { for (const [id, st] of Object.entries(q.quests)) S.quests[id] = { ...(S.quests[id] || {}), ...st }; delete q.quests; }
    if (q.npcs) { for (const [id, v] of Object.entries(q.npcs)) Object.assign(S.npcs[id] || {}, v); delete q.npcs; }
    const house = q.houseStyle !== undefined;
    deepMerge(S, q);
    if (house) sim.rebuildWorld(gm);
    gm.navVersion++;
    sim.checkQuests(gm); drainEvents();
    scene.snapCamera(gm); ui.resetHud(); app.dirty = true; render();
    return compact();
  },
  isIdle() { return (!app.fx.wipe || app.fx.animAt != null) && ART.pending === 0 && app.fontsReady !== false; },
  step(n = 1) { app.paused = true; for (let i = 0; i < n; i++) tickOnce(); if (app.ui.scene === 'game' && app.gm) render(); return compact(); },
  pause() { app.paused = true; return true; },
  resume() { app.paused = false; return true; },
  scene(name) {
    if (name && typeof name === 'object') {
      const gm = sim.newGame({ seed: app.seed ?? 1, era: name.era || 1, money: name.money });
      startGame(gm, false);
      if (name.at) { const p = gm.world.places[name.at]; if (p) { gm.S.player.x = p.x + 0.5; gm.S.player.y = p.y + 0.9; } }
      if (name.time != null) gm.S.time = name.time;
      if (name.day != null) { gm.S.day = name.day; sim.startDay(gm, false); if (name.time != null) gm.S.time = name.time; }
      if (name.weather) gm.S.weather = name.weather;
      if (name.paused !== false) app.paused = true;
      scene.snapCamera(gm); render();
      return compact();
    }
    if (name === 'title') { toTitle(); return compact(); }
    if (name === 'game') { if (!app.gm) newGame({ seed: app.seed ?? 1, noSave: true }); app.ui.scene = 'game'; closeModal(true); layoutVisibility(); render(); return compact(); }
    if (!app.gm && !['settings', 'help', 'about', 'chapters'].includes(name)) newGame({ seed: app.seed ?? 1, noSave: true });
    if (name === 'card') { introCard(app.gm.S.ch); return compact(); }
    if (name === 'summary') { openModal('summary', app.gm.S.summary || { date: sim.dateLabel(app.gm.S), shipped: [], total: 0, rent: 0, wilted: 0 }); return compact(); }
    if (['settings', 'help', 'about', 'chapters'].includes(name) && app.ui.scene === 'title') { openModal(name); return compact(); }
    if (app.ui.scene !== 'game') { app.ui.scene = 'game'; closeModal(true); layoutVisibility(); }
    openModal(name);
    render();
    return compact();
  },
  newGame(opts = {}) { newGame({ ...opts }); if (opts.paused) app.paused = true; render(); return compact(); },
  act(name, ...args) {
    const gm = app.gm;
    const r = (() => {
      switch (name) {
        case 'use': doUse(); return true;
        case 'interact': case 'talkKey': doTalk(); return true;
        case 'useAt': doUse({ x: args[0], y: args[1] }); return true;
        case 'face': gm.S.player.face = args[0]; return true;
        case 'select': gm.S.sel = args[0]; return true;
        case 'selectItem': { const i = gm.S.inv.findIndex((it) => it && it.id === args[0]); if (i >= 0) { if (i >= sim.HOTBAR) { sim.swapSlots(gm.S, i, sim.HOTBAR - 1); gm.S.sel = sim.HOTBAR - 1; } else gm.S.sel = i; } return i >= 0; }
        case 'teleport': gm.S.player.x = args[0] + 0.5; gm.S.player.y = args[1] + 0.9; if (args[2]) gm.S.player.face = args[2]; scene.snapCamera(gm); return true;
        case 'goto': { const p = gm.world.places[args[0]]; if (!p) return false; gm.S.player.x = p.x + 0.5; gm.S.player.y = p.y + 0.9; gm.S.player.face = args[1] || 'up'; scene.snapCamera(gm); return true; }
        case 'ship': { const i = gm.S.inv.findIndex((it) => it && it.id === args[0]); return i >= 0 && sim.toBin(gm, i, args[1]); }
        case 'buy': return sim.buy(gm, args[0], args[1] ?? 1);
        case 'sell': return sim.sell(gm, args[0], args[1] ?? 1);
        case 'craft': return sim.craft(gm, args[0]);
        case 'eat': return sim.eat(gm, args[0]);
        case 'sleep': closeModal(true); sim.sleep(gm, { turn: !!args[0] }); return true;
        case 'sleepSkip': { closeModal(true); sim.sleep(gm, { turn: !!args[0] }); const evs = gm.events.splice(0); evs.filter((e) => e.type === 'toast').forEach((e) => app.toastLog.push(e.text)); saveGame(); return true; }
        case 'talk': { const d = sim.talk(gm, args[0]); if (d) openModal('dialog', d); return d; }
        case 'give': return sim.give(gm, args[0], args[1]);
        case 'cast': return sim.use(gm);
        case 'reel': return sim.reel(gm);
        case 'turnEra': { closeModal(true); doTurn(); return true; }
        case 'completeGoals': { for (const q of sim.goalsFor(gm.S.ch)) gm.S.quests[q.id].done = true; return true; }
        case 'card': { const C = D.CHAPTERS[gm.S.ch]; openModal('card', { kicker: 'History', title: args[1] || 'History', facts: args[0] || C.closing }); return true; }
        case 'closingCard': closingCard(gm.S.ch); return true;
        case 'toast': ui.toast(args[0]); return true;
        case 'animAt': app.fx.animAt = args[0]; if (app.fx.wipe) drawWipe(performance.now()); return true;
        case 'endWipe': { app.fx.animAt = null; if (app.fx.wipe) { const w = app.fx.wipe; app.fx.wipe = null; w.c.hidden = true; w.done(); } return true; }
        case 'close': closeModal(); return true;
        case 'closeAll': closeModal(true); return true;
        case 'cardNext': cardNext(); return true;
        case 'save': return saveGame();
        case 'reloadSave': return continueGame();
        case 'loadRaw': { try { const s = save.parse(args[0]); startGame(sim.attach(s), false); return true; } catch (e) { return String(e.message); } }
        case 'rawSave': return load(save.SAVE_KEY);
        case 'fill': { const gmS = gm.S; for (const [id, n] of args[0]) sim.addItem(gmS, id, n); return true; }
        case 'objAt': { const o = sim.objAt(gm, args[0], args[1]); return o ? { ...o } : null; }
        case 'blocked': return sim.blocked(gm, args[0], args[1]);
        case 'describe': return ui.describeTarget(gm);
        case 'spriteSizes': return { tile: scene.R.ts, person: [scene.R.ts, scene.R.ts * 1.5] };
        case 'render': render(); return true;
      }
      return null;
    })();
    drainEvents(); if (app.ui.scene === 'game' && app.gm) render();
    return r && typeof r === 'object' ? JSON.parse(JSON.stringify(r)) : r;
  },
};
window.__game = hooks;

// ---------- painted art ----------
// The chapter on screen loads first; the rest follows in the background.
function wantChapter(ch) {
  const b = PA.buildingNames(ch);
  return want(allNames().filter((n) => (!n.startsWith('vista-') || n === 'vista-' + ch || n === 'vista-' + (ch + 1)) && (!n.startsWith('bld-') || b.has(n))));
}
function wantAll() { if (!app.wantedAll) { app.wantedAll = true; setTimeout(() => want(allNames()), 1200); } }

// ---------- boot ----------
function boot() {
  if (document.fonts && document.fonts.load) {
    app.fontsReady = false;
    Promise.all(FONT_FAMILIES.map((f) => document.fonts.load(`700 20px "${f}"`).catch(() => null))).then(() => { app.fontsReady = true; clearArt(); app.lastRenderTitle = false; app.dirty = true; });
  }
  app.storageOK = probeStorage();
  app.settings = loadSettings();
  scene.setup(document.getElementById('view'));
  ui.init(app, typeof FACTS !== 'undefined' ? FACTS.facts : []);
  applySettings();
  setupTouch();
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', () => { app.held.clear(); app.pad.x = app.pad.y = 0; });
  document.getElementById('view').addEventListener('pointerdown', canvasPointer);
  document.getElementById('view').addEventListener('wheel', (e) => { if (app.gm && !app.ui.modal && app.ui.scene === 'game') { app.gm.S.sel = (app.gm.S.sel + (e.deltaY > 0 ? 1 : sim.HOTBAR - 1)) % sim.HOTBAR; e.preventDefault(); } }, { passive: false });
  document.getElementById('app').addEventListener('click', onClick);
  window.addEventListener('resize', () => { scene.resize(); app.lastRenderTitle = false; app.dirty = true; layoutVisibility(); });
  if (window.matchMedia) window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener?.('change', applySettings);
  toTitle();
  if (!app.storageOK) ui.toast('Saving is unavailable in this browser. You can still play.', 'warn');
  app.loadMs = Math.round(performance.now() - T0);
  requestAnimationFrame(frame);
}
boot();
