// DOM UI: HUD, hotbar, prompt, toasts and every panel. Panels are rebuilt from state when opened or
// changed; clicks are delegated through data-act attributes (main.js routes them).
import * as sim from './sim/sim.js';
import * as D from './sim/data.js';
import { iconURL, personSprite } from './render/art.js';
import * as PA from './render/painted.js';
import { UI_THEME } from './render/palette.js';

export const qs = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const money = (n) => '$' + Math.round(n).toLocaleString('en-US');
let app = null;
let FACT = new Map();
export function init(a, facts) { app = a; FACT = new Map(facts.map((f) => [f.id, f])); }
export const fact = (id) => FACT.get(id);

// ---------- theme ----------
export function applyTheme(ch) {
  const t = UI_THEME[ch] || UI_THEME[3];
  const r = document.documentElement.style;
  r.setProperty('--ui-bg', t.bg); r.setProperty('--ui-fg', t.fg); r.setProperty('--ui-accent', t.accent);
  r.setProperty('--ui-accent-fg', t.accentFg); r.setProperty('--ui-muted', t.muted); r.setProperty('--ui-border', t.border); r.setProperty('--ui-font', t.font); r.setProperty('--ui-display', t.display || t.font);
}

// ---------- HUD ----------
const last = {};
const setText = (id, v) => { if (last[id] !== v) { last[id] = v; const el = document.getElementById(id); if (el) el.textContent = v; } };
const WX = { clear: ['☀', 'Clear'], rain: ['🌧', 'Rain'], snow: ['❄', 'Snow'], fog: ['🌫', 'Fog'] };
export function hud(gm) {
  const S = gm.S;
  setText('h-date', sim.dateLabel(S));
  setText('h-time', sim.clock(S));
  // Icon and word in separate spans, so the phone HUD at large text can keep the icon and drop the word.
  if (last.wx !== S.weather) { last.wx = S.weather; const [ic, word] = WX[S.weather]; const el = document.getElementById('h-wx'); if (el) el.innerHTML = `<span aria-hidden="true">${ic}</span><span class="wx-w"> ${word}</span>`; }
  setText('h-money', money(S.money));
  setText('h-energy', `${Math.round(S.energy)}/${S.maxEnergy}`);
  const pct = Math.round(S.energy / S.maxEnergy * 100);
  if (last.ebar !== pct) { last.ebar = pct; qs('#h-ebar').style.width = pct + '%'; qs('.h-energy').classList.toggle('low', S.energy <= 15); }
  // Goal tracker: the chapter's goals with progress.
  const goals = sim.goalsFor(S.ch);
  const sig = goals.map((q) => q.id + (S.quests[q.id]?.done ? 1 : 0) + sim.progressText(gm, q)).join('|') + S.ch;
  if (last.quest !== sig) {
    last.quest = sig;
    const open = goals.filter((q) => !S.quests[q.id].done);
    const done = goals.length - open.length;
    qs('#h-quest').innerHTML = `<b>Chapter ${S.ch} goals · ${done}/${goals.length}</b>` + (open.length ? open.slice(0, 3).map((q) => `<div class="q">◇ ${esc(q.title)} <span class="muted">${esc(sim.progressText(gm, q))}</span></div>`).join('')
      : `<div class="q">✓ All goals done. Sleep to turn the era.</div>`);
  }
  hotbar(gm);
}
export function hotbar(gm) {
  const S = gm.S;
  const sig = S.inv.slice(0, sim.HOTBAR).map((it) => (it ? it.id + it.n : '-')).join(',') + '|' + S.sel + '|' + S.jug;
  if (last.hot === sig) return;
  last.hot = sig;
  const cap = D.JUG_CAP[D.CHAPTERS[S.ch].tier] || 20;
  qs('#hotbar').innerHTML = S.inv.slice(0, sim.HOTBAR).map((it, i) => `<button class="slot${i === S.sel ? ' sel' : ''}" data-act="hot" data-arg="${i}" aria-label="Slot ${i + 1}: ${it ? esc(D.itemName(it.id)) + (it.n > 1 ? ' ×' + it.n : '') : 'empty'}${i === S.sel ? ' (selected)' : ''}">
      <span class="k">${i + 1}</span>${it ? `${icon(it.id)}${it.n > 1 ? `<span class="n">${it.n}</span>` : ''}` : ''}
      ${it && it.id === 'jug' ? `<span class="jug"><i style="width:${Math.round(S.jug / cap * 100)}%"></i></span>` : ''}</button>`).join('');
}
export function resetHud() { for (const k of Object.keys(last)) delete last[k]; }

// ---------- prompt ----------
export function describeTarget(gm) {
  const S = gm.S;
  if (S.fishing) return S.fishing.phase === 'bite' ? 'Bite! Use now to reel in' : 'Waiting for a bite… (Use reels in early)';
  const t = sim.target(gm);
  const npc = sim.npcAt(gm, t.x, t.y);
  if (npc) return `Talk to ${D.PEOPLE[npc].name.split(' ')[0]}`;
  const bi = gm.bmap[t.y * 60 + t.x];
  if (t.x >= 0 && t.y >= 0 && bi >= 0) {
    const b = gm.world.buildings[bi];
    if (b.id === 'farmhouse') return 'Go to bed';
    if (b.place === 'store' || b.place === 'tradeCamp') return sim.shopOpen(S) ? `Shop: ${D.SHOPS[S.ch].name}` : 'Shop (closed now)';
    if (b.place === 'mill' && S.ch === 2) return 'Grind corn at the mill';
  }
  const o = sim.objAt(gm, t.x, t.y);
  if (o) {
    const m = { bin: 'Ship items', trough: 'Feed and collect', sign: 'Read the sign', fund: 'Restoration fund', chest: 'Open chest' }[o.t];
    if (m) return m;
  }
  const sp = gm.world.special[t.x + ',' + t.y];
  if (sp === 'soak') return 'Soak in the hot pool';
  const k = t.x + ',' + t.y;
  const c = S.crops[k];
  if (c && sim.isRipe(c)) return `Harvest ${D.CROPS[c.id].name.toLowerCase()}`;
  if (S.forage[k]) return `Pick up ${D.itemName(S.forage[k]).toLowerCase()}`;
  if (sp === 'hotspring' || sp === 'cold') { const sel = sim.selected(S); return sel && sel.id === 'emptyjug' ? 'Fill the jug' : sp === 'hotspring' ? 'Read about the springs' : 'Cold spring (fill empty jugs)'; }
  return '';
}

// ---------- toasts ----------
export function toast(text, kind = 'info') {
  const box = qs('#toasts');
  // The same message again just bumps a counter on the toast already showing.
  const same = [...box.children].find((c) => c.dataset.text === text);
  if (same) { same.dataset.n = (+same.dataset.n || 1) + 1; same.textContent = text + '  ×' + same.dataset.n; clearTimeout(same._t); same._t = setTimeout(() => same.remove(), 2800); }
  const el = same || document.createElement('div');
  if (!same) { el.className = 'toast ' + kind; el.textContent = text; el.dataset.text = text; box.appendChild(el); }
  while (box.children.length > 3) box.firstChild.remove();
  if (!same) el._t = setTimeout(() => el.remove(), kind === 'quest' ? 4200 : 2800);
  const sr = qs('#sr'); sr.textContent = ''; sr.textContent = text;
  app.toastLog.push(text); if (app.toastLog.length > 30) app.toastLog.shift();
}

// ---------- screens ----------
export function show(html, cls = '') {
  const s = qs('#screen');
  s.className = 'screen ' + cls;
  s.innerHTML = html;
  s.hidden = false;
  const f = s.querySelector('[data-focus]') || s.querySelector('button.primary') || s.querySelector('button');
  if (f) f.focus({ preventScroll: true });
}
export function hide() { const s = qs('#screen'); s.hidden = true; s.innerHTML = ''; s.className = 'screen'; }

const closeBtn = '<button class="btn" data-act="close">Close <span class="kbd">Esc</span></button>';
const head = (title, extra = '') => `<div class="row spread"><h2>${esc(title)}</h2><div class="row">${extra}${closeBtn}</div></div>`;

export function titleScreen(hasSave, saveInfo) {
  show(`<div class="title-wrap">
    <div class="brand"><h1>Valley of Vapors</h1><div class="sub">Through the Ages</div></div>
    <div class="title-menu">
      ${hasSave ? `<button class="btn primary" data-act="continue" data-focus>Continue</button>` : `<button class="btn" disabled>Continue</button>`}
      <button class="btn ${hasSave ? '' : 'primary'}" data-act="newgame" ${hasSave ? '' : 'data-focus'}>New game</button>
      <button class="btn" data-act="open" data-arg="chapters">Chapter select</button>
      <button class="btn" data-act="open" data-arg="settings">Settings</button>
      <button class="btn" data-act="open" data-arg="help">Help</button>
      <button class="btn" data-act="open" data-arg="about">About</button>
    </div>
    ${saveInfo ? `<div class="title-note">${esc(saveInfo)}</div>` : ''}
    <div class="title-note">A farming and life sim across six eras of the Hot Springs valley. Characters and prices are game content; history cards cite their sources.</div>
  </div>`, 'title');
}

export function chaptersScreen(reached) {
  show(`<div class="panel">${head('Chapter select')}
    <p class="muted small">Start a new save at the beginning of any chapter you have reached. This replaces the current save.</p>
    <ul class="list">${D.CHAPTERS.slice(1).map((c) => {
      const ok = reached.includes(c.n);
      return `<li class="li"><div class="grow"><b>${c.n}. ${esc(c.title)}</b> <span class="muted small">(${c.year})</span><div class="small muted">${ok ? esc(c.intro[0].slice(0, 110)) + '…' : 'Not reached yet.'}</div></div>
        <button class="btn sm" data-act="chapter" data-arg="${c.n}" ${ok ? '' : 'disabled'}>Play</button></li>`;
    }).join('')}</ul></div>`);
}

export function helpScreen() {
  const k = app.settings.keys;
  const kb = (a) => k[a].map((x) => `<span class="kbd">${esc(keyName(x))}</span>`).join(' ');
  show(`<div class="panel">${head('Help')}
    <h3>Controls</h3>
    <table class="keys">
      <tr><td>Move</td><td>${kb('up')} ${kb('left')} ${kb('down')} ${kb('right')} · touch pad · tap a tile to walk there</td></tr>
      <tr><td>Use tool / item</td><td>${kb('use')} · <b>A</b> button · click or tap a tile next to you</td></tr>
      <tr><td>Talk / interact</td><td>${kb('talk')} · <b>B</b> button</td></tr>
      <tr><td>Hotbar</td><td><span class="kbd">1</span>–<span class="kbd">8</span>, ${kb('prev')} ${kb('next')}, mouse wheel, tap a slot</td></tr>
      <tr><td>Eat selected</td><td>${kb('eat')}</td></tr>
      <tr><td>Pack · Journal · Menu</td><td>${kb('inv')} · ${kb('journal')} · ${kb('pause')}</td></tr>
    </table>
    <h3>How to farm</h3>
    <p>Hoe the soil in your field, plant seeds that grow in the current season, and water them with the jug every day (rain does it for you). Ripe crops wear a ring badge. Put what you want to sell in the shipping bin by your house: it is paid overnight. Sleep to end the day; staying up past 2:00 costs money.</p>
    <p>Energy drops as you work. Eat food, soak in a hot pool once a day, or sleep. A whetstone made from ridge novaculite makes your tools cheaper to use.</p>
    <h3>Eras</h3>
    <p>Each chapter has five goals. When they are done, go to bed and choose <b>Sleep and turn the era</b>. A history card closes the chapter, the valley redraws in the next era, and the next generation of the Vale family takes over the farm. You can stay in a chapter as long as you like.</p>
    <h3>What is real</h3>
    <p>History cards and lines marked with a source are real and cite where they come from. <span class="tag">Legend</span> marks stories that historians say are not true. The Vale family, every neighbor, all prices, crop times and recipes are <b>game content</b>, invented for play.</p>
  </div>`);
}

export function aboutScreen() {
  show(`<div class="panel">${head('About')}
    <p><b>Valley of Vapors: Through the Ages</b> is an original, open-source (MIT) farming and life sim, part of the Hot Springs Games collection. It is not affiliated with any park, business or commercial game.</p>
    <p>History comes from the collection's research corpus and the audited trivia bank (Encyclopedia of Arkansas, National Park Service, USGS, Wikipedia and others); each card names its source. Native history is presented from National Park Service and Encyclopedia of Arkansas sources; the old quarry in the game is a place to read about, not to dig.</p>
    <p>Code ideas: tilemaps (MDN), grid search (Red Blob Games), fixed-step loop pattern (MainLoop.js, Glenn Fiedler), mulberry32 PRNG (Tommy Ettinger, via bryc/code, public domain). Details in SAMPLES.md.</p>
    <p class="muted small">The map condenses the valley: the farm, Bathhouse Row, the springs and the lake sit closer together than they really do, and the lake stands for the reservoirs that Remmel Dam (1924) and Carpenter Dam (1931) made below town. The farm's creek is Hot Springs Creek, which has run in a stone arch under the town since the 1880s.</p>
    <p class="muted small">Painted art was made for this game: images generated with OpenAI's Codex image tool from prompts kept in the repository, and Blender character renders (see SAMPLES.md); fonts are open-source (SIL OFL, see SAMPLES.md); all sounds are synthesized. Characters and prices are invented.</p>
  </div>`);
}

export function pauseScreen(canSave) {
  show(`<div class="panel" style="max-width:24rem">${head('Paused')}
    <div style="display:grid;gap:8px">
      <button class="btn primary" data-act="close" data-focus>Resume</button>
      <button class="btn" data-act="save" ${canSave ? '' : 'disabled'}>Save now</button>
      <button class="btn" data-act="open" data-arg="journal">Journal</button>
      <button class="btn" data-act="open" data-arg="settings">Settings</button>
      <button class="btn" data-act="open" data-arg="help">Help</button>
      <button class="btn" data-act="title">Save and quit to title</button>
    </div>${canSave ? '' : '<p class="small muted">Saving is unavailable in this browser (storage blocked). Progress lasts until you close the page.</p>'}</div>`);
}

// ---------- inventory and crafting ----------
export function inventoryScreen(gm, tab = 'items', pick = null) {
  const S = gm.S;
  const slots = S.inv.map((it, i) => `<button class="slot${i === S.sel ? ' sel' : ''}${i === pick ? ' pick' : ''}" data-act="slot" data-arg="${i}" aria-label="Slot ${i + 1}: ${it ? esc(D.itemName(it.id)) + ' ×' + it.n : 'empty'}">
    ${i < sim.HOTBAR ? `<span class="k">${i + 1}</span>` : ''}${it ? `${icon(it.id)}${it.n > 1 ? `<span class="n">${it.n}</span>` : ''}` : ''}</button>`).join('');
  const it = pick != null ? S.inv[pick] : sim.selected(S);
  const det = it ? itemDetail(gm, it) : '<span class="muted">Select an item. Click two slots to swap them; slots 1–8 are the hotbar.</span>';
  const tabs = `<div class="tabs"><button class="tab ${tab === 'items' ? 'on' : ''}" data-act="invtab" data-arg="items">Pack</button><button class="tab ${tab === 'craft' ? 'on' : ''}" data-act="invtab" data-arg="craft">Crafting</button></div>`;
  let body;
  if (tab === 'craft') {
    body = `<ul class="list">${sim.recipesFor(S).map(([id, r]) => {
      const ok = sim.canCraft(S, id);
      const ins = Object.entries(r.in).map(([i, n]) => `<span class="${sim.count(S, i) >= n ? '' : 'muted'}">${n} ${esc(D.itemName(i).toLowerCase())} (${sim.count(S, i)})</span>`).join(', ');
      return `<li class="li">${icon(r.out[0])}<div class="grow"><b>${esc(D.itemName(r.out[0]))}${r.out[1] > 1 ? ' ×' + r.out[1] : ''}</b><div class="small">${r.at === 'mill' ? 'At the creek mill: ' : ''}${ins}</div></div>
        ${r.at === 'pack' ? `<button class="btn sm ${ok ? 'primary' : ''}" data-act="craft" data-arg="${id}" ${ok ? '' : 'disabled'}>Craft</button>` : ''}</li>`;
    }).join('')}</ul><p class="small muted">Recipes are game content.</p>`;
  } else body = `<div class="grid">${slots}</div><div class="detail">${det}</div>`;
  show(`<div class="panel">${head('Pack', `<span class="muted">${money(S.money)}</span>`)}${tabs}${body}</div>`);
}
function itemDetail(gm, it) {
  const S = gm.S, def = D.ITEMS[it.id];
  const p = D.sellPrice(it.id, S.ch);
  const crop = def.kind === 'seed' ? D.CROPS[def.crop] : null;
  return `<div class="row">${icon(it.id, 'big')}<div class="grow"><b>${esc(def.name)}</b> ×${it.n}
    <div class="small muted">${esc(kindLabel(def.kind))}${p ? ` · sells for ${money(p)}` : ''}${def.energy ? ` · +${def.energy} energy` : ''}${crop ? ` · ${crop.days} days, ${crop.seasons.map((s) => D.SEASON_NAME[s]).join('/')}${crop.regrow ? `, regrows every ${crop.regrow}` : ''}` : ''}${it.id === 'jug' ? ` · ${S.jug} water` : ''}</div></div>
    ${def.energy ? `<button class="btn sm" data-act="eat" data-arg="${it.id}">Eat</button>` : ''}</div>`;
}
const kindLabel = (k) => ({ tool: 'Tool', seed: 'Seeds', crop: 'Crop', forage: 'Foraged', fish: 'Fish', product: 'Farm product', material: 'Material', craft: 'Crafted good', food: 'Food', placeable: 'Place on your land' }[k] || k);

// ---------- shipping bin ----------
export function binScreen(gm) {
  const S = gm.S;
  const sellable = S.inv.map((it, i) => ({ it, i })).filter(({ it }) => it && D.ITEMS[it.id].kind !== 'tool' && D.sellPrice(it.id, S.ch));
  const total = S.bin.reduce((a, e) => a + D.sellPrice(e.id, S.ch) * e.n, 0);
  show(`<div class="panel">${head('Shipping bin')}
    <p class="small muted">Items in the bin are sold overnight. Click an item to ship the whole stack; click a shipped item to take it back.</p>
    <div class="row spread"><h3>Your pack</h3><button class="btn sm" data-act="shipall">Ship all crops, fish and forage</button></div>
    <ul class="list">${sellable.map(({ it, i }) => `<li class="li">${icon(it.id)}<div class="grow">${esc(D.itemName(it.id))} ×${it.n}</div><span class="price">${money(D.sellPrice(it.id, S.ch))} each</span><button class="btn sm" data-act="ship" data-arg="${i}">Ship</button></li>`).join('') || '<li class="muted">Nothing to ship.</li>'}</ul>
    <h3>In the bin · ${money(total)} tonight</h3>
    <ul class="list">${S.bin.map((e, i) => `<li class="li">${icon(e.id)}<div class="grow">${esc(D.itemName(e.id))} ×${e.n}</div><span class="price">${money(D.sellPrice(e.id, S.ch) * e.n)}</span><button class="btn sm" data-act="unship" data-arg="${i}">Take back</button></li>`).join('') || '<li class="muted">Empty.</li>'}</ul>
  </div>`);
}

// ---------- chest ----------
export function chestScreen(gm) {
  const S = gm.S;
  const cell = (it, act, i) => `<button class="slot" data-act="${act}" data-arg="${i}" aria-label="${it ? esc(D.itemName(it.id)) + ' ×' + it.n : 'empty'}">${it ? `${icon(it.id)}${it.n > 1 ? `<span class="n">${it.n}</span>` : ''}` : ''}</button>`;
  show(`<div class="panel">${head('Chest')}<p class="small muted">Click an item to move it between your pack and the chest.</p>
    <h3>Chest</h3><div class="grid">${S.chest.map((it, i) => cell(it, 'cslot', i)).join('')}</div>
    <h3>Pack</h3><div class="grid">${S.inv.map((it, i) => cell(it, 'pslot', i)).join('')}</div></div>`);
}

// ---------- shop ----------
export function shopScreen(gm, tab = 'buy') {
  const S = gm.S;
  const tabs = `<div class="tabs"><button class="tab ${tab === 'buy' ? 'on' : ''}" data-act="shoptab" data-arg="buy">Buy</button><button class="tab ${tab === 'sell' ? 'on' : ''}" data-act="shoptab" data-arg="sell">Sell</button></div>`;
  let body;
  if (tab === 'buy') {
    body = `<ul class="list">${sim.shopList(S).map((e) => {
      const name = e.name || D.itemName(e.id);
      const icon = e.id === 'animal' ? iconURL(D.ANIMALS[D.CHAPTERS[S.ch].animal].product) : e.id === 'brickhouse' ? iconURL('stone') : iconURL(e.id);
      const crop = e.id.startsWith('seed:') ? D.CROPS[e.id.slice(5)] : null;
      const one = e.id === 'animal' || e.id === 'brickhouse';
      return `<li class="li"><img alt="" src="${icon}"><div class="grow"><b>${esc(name)}</b>${crop ? `<div class="small muted">${crop.days} days · ${crop.seasons.map((s) => D.SEASON_NAME[s]).join('/')}${crop.regrow ? ` · regrows every ${crop.regrow}` : ''} · sells ${money(D.sellPrice(e.id.slice(5), S.ch))}</div>` : e.id === 'animal' ? `<div class="small muted">${S.animals.length}/${D.PEN_MAX} in the pen</div>` : ''}</div>
        <span class="price">${money(e.price)}</span><button class="btn sm" data-act="buy" data-arg="${e.id}|1" ${S.money >= e.price ? '' : 'disabled'}>Buy</button>${one ? '' : `<button class="btn sm" data-act="buy" data-arg="${e.id}|5" ${S.money >= e.price * 5 ? '' : 'disabled'}>×5</button>`}</li>`;
    }).join('')}</ul>`;
  } else {
    const items = S.inv.filter((it) => it && D.ITEMS[it.id].kind !== 'tool' && D.sellPrice(it.id, S.ch));
    const seen = new Set();
    body = `<ul class="list">${items.filter((it) => !seen.has(it.id) && seen.add(it.id)).map((it) => `<li class="li">${icon(it.id)}<div class="grow">${esc(D.itemName(it.id))} ×${sim.count(S, it.id)}</div><span class="price">${money(D.sellPrice(it.id, S.ch))}</span>
      <button class="btn sm" data-act="sell" data-arg="${it.id}|1">Sell 1</button><button class="btn sm" data-act="sell" data-arg="${it.id}|99">All</button></li>`).join('') || '<li class="muted">Nothing to sell.</li>'}</ul>`;
  }
  show(`<div class="panel">${head(D.SHOPS[S.ch].name, `<span class="muted">${money(S.money)}</span>`)}${tabs}${body}<p class="small muted">Prices are game prices, not historical ones.</p></div>`);
}

// ---------- journal ----------
export function journalScreen(gm, tab = 'goals') {
  const S = gm.S, C = D.CHAPTERS[S.ch];
  const tabs = ['goals', 'quests', 'people', 'almanac'].map((t) => `<button class="tab ${tab === t ? 'on' : ''}" data-act="jtab" data-arg="${t}">${{ goals: 'Goals', quests: 'Quests', people: 'People', almanac: 'Almanac' }[t]}</button>`).join('');
  let body = '';
  const qli = (q) => { const st = S.quests[q.id]; return `<li class="li ${st.done ? 'done' : ''}"><div class="grow"><b>${st.done ? '✓' : '◇'} ${esc(q.title)}</b> ${q.giver ? `<span class="small muted">· ${esc(D.PEOPLE[q.giver].name)}</span>` : ''}<div class="small">${esc(q.desc)}</div></div><span class="small">${st.done ? 'Done' : esc(sim.progressText(gm, q))}</span></li>`; };
  if (tab === 'goals') {
    body = `<p><b>Chapter ${S.ch}: ${esc(C.title)}</b> <span class="muted">(${C.year}, ${esc(C.who)})</span></p>
      <ul class="list">${sim.goalsFor(S.ch).map(qli).join('')}</ul>
      <p class="small">${sim.goalsDone(S) ? (S.ch === 6 ? '<b>Every goal is done.</b> Go to bed and choose “Finish the story”.' : '<b>All goals done.</b> Go to bed and choose “Sleep and turn the era”.') : 'Finish all five goals to turn the era.'}</p>`;
  } else if (tab === 'quests') {
    body = `<ul class="list">${D.QUESTS.filter((q) => q.ch === S.ch && !q.goal).map(qli).join('')}</ul>`;
  } else if (tab === 'people') {
    body = `<ul class="list">${Object.entries(S.npcs).map(([id, n]) => { const p = D.PEOPLE[id], h = sim.hearts(n.pts); return `<li class="li"><canvas class="pp" data-pid="${id}" width="36" height="48" aria-hidden="true"></canvas><div class="grow"><b>${esc(p.name)}</b><div class="small muted">${esc(p.role)}</div><div class="small">Loves: ${p.gifts.love.map((g) => esc(giftName(g))).join(', ')}</div></div><span class="hearts" aria-label="${h} of 5 hearts">${'♥'.repeat(h)}${'♡'.repeat(5 - h)}</span></li>`; }).join('')}</ul><p class="small muted">Talk once a day and give one gift a day to make friends. All people are fictional.</p>`;
  } else {
    const ids = S.almanac;
    body = ids.length ? ids.map((id) => factHtml(id)).join('') : '<p class="muted">Facts you read on history cards and signs collect here.</p>';
    body = `<p class="small muted">${ids.length} of ${FACT.size} facts collected.</p>` + body;
  }
  show(`<div class="panel">${head('Journal')}<div class="tabs">${tabs}</div>${body}</div>`);
  document.querySelectorAll('canvas.pp').forEach((c) => { const id = c.dataset.pid; const ctx = c.getContext('2d'); portrait(ctx, id, 36, 48, 64) || ctx.drawImage(personSprite(id, D.PEOPLE[id].look, 'down', 0, 64), 0, 0, 36, 48); });
}
export function repaintPortraits() {
  document.querySelectorAll('canvas.pp').forEach((c) => { const ctx = c.getContext('2d'); ctx.clearRect(0, 0, c.width, c.height); portrait(ctx, c.dataset.pid, 36, 48, 64); });
  const c = document.querySelector('.dialog .portrait'), id = c && c.dataset.pid;
  if (c && id) { const ctx = c.getContext('2d'); ctx.clearRect(0, 0, 84, 112); ctx.fillStyle = 'rgba(0,0,0,0.08)'; ctx.fillRect(0, 0, 84, 112); portrait(ctx, id, 84, 112, 160); }
}
// Painted portrait: the upper body of the person's sprite, scaled up. False when the art has not loaded.
function portrait(ctx, id, w, h, u) {
  const sp = PA.personSprite(id, D.PEOPLE[id].look, 'down', 'idle', u);
  if (!sp) return false;
  const cw = sp.c.width * 0.78, ch = cw * h / w;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(sp.c, (sp.c.width - cw) / 2, sp.c.height * 0.03, cw, ch, 0, 0, w, h);
  return true;
}
// An item icon: the painted file when there is one, else the drawn icon as a data URL.
function icon(id, cls = '') { return PA.iconHtml(id, cls) || `<img alt="" class="${cls}" src="${iconURL(id)}"${cls === 'big' ? ' width="40" height="40"' : ''}>`; }
const giftName = (g) => (g.startsWith('kind:') ? 'any ' + g.slice(5) : D.itemName(g).toLowerCase());
export function factHtml(id) {
  const f = FACT.get(id);
  if (!f) return '';
  // The full address stays available (tooltip, and copyable as selected text) but the card shows only its site.
  const site = String(f.sourceUrl || '').replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
  return `<div class="fact">${f.legend ? '<span class="tag">Legend</span>' : ''}${esc(f.text)}<span class="src" title="${esc(f.sourceUrl)}">Source: ${esc(f.source)} · <span class="site">${esc(site)}</span></span></div>`;
}

// ---------- settings ----------
export const ACTIONS = { up: 'Move up', down: 'Move down', left: 'Move left', right: 'Move right', use: 'Use tool / item', talk: 'Talk / interact', eat: 'Eat selected', prev: 'Previous hotbar slot', next: 'Next hotbar slot', inv: 'Pack', journal: 'Journal', pause: 'Menu / close' };
export function keyName(code) { return code.replace(/^Key/, '').replace(/^Digit/, '').replace('Arrow', '').replace('Space', 'Space').replace('Escape', 'Esc'); }
export function settingsScreen(waiting) {
  const s = app.settings;
  const opt = (act, val, cur, label) => `<button class="tab ${cur === val ? 'on' : ''}" data-act="${act}" data-arg="${val}" aria-pressed="${cur === val}">${label}</button>`;
  show(`<div class="panel">${head('Settings')}
    <h3>Text size</h3><div class="tabs">${opt('text', '1', String(s.text), '100%')}${opt('text', '1.25', String(s.text), '125%')}${opt('text', '1.5', String(s.text), '150%')}</div>
    <h3>Motion</h3><div class="tabs">${opt('motion', 'auto', s.motion, 'Follow system')}${opt('motion', 'reduced', s.motion, 'Reduced')}${opt('motion', 'full', s.motion, 'Full')}</div>
    <h3>Touch controls</h3><div class="tabs">${opt('touch', 'auto', s.touch, 'Auto')}${opt('touch', 'on', s.touch, 'Always show')}${opt('touch', 'off', s.touch, 'Hide')}</div>
    <h3>Sound</h3><div class="tabs">${opt('mute', 'off', s.mute ? 'on' : 'off', 'Sound on')}${opt('mute', 'on', s.mute ? 'on' : 'off', 'Muted')}${opt('vol', '0.25', String(s.volume), 'Quiet')}${opt('vol', '0.5', String(s.volume), 'Normal')}${opt('vol', '1', String(s.volume), 'Loud')}</div>
    <h3>Graphics</h3><div class="tabs">${opt('gfx', 'painted', s.gfx || 'painted', 'Painted')}${opt('gfx', 'simple', s.gfx || 'painted', 'Simple (faster)')}</div>
    <h3>Assists</h3><div class="tabs">${opt('assist', 'on', s.assist ? 'on' : 'off', 'Wider fishing window')}${opt('assist', 'off', s.assist ? 'on' : 'off', 'Normal window')}${opt('contrast', 'on', s.contrast ? 'on' : 'off', 'High-contrast HUD')}${opt('contrast', 'off', s.contrast ? 'on' : 'off', 'Standard HUD')}</div>
    <h3>Keys</h3>
    <table class="keys">${Object.entries(ACTIONS).map(([a, label]) => `<tr><td>${label}</td><td>${s.keys[a].map((k) => `<span class="kbd">${esc(keyName(k))}</span>`).join(' ')}</td><td><button class="btn sm" data-act="rebind" data-arg="${a}">${waiting === a ? 'Press a key…' : 'Change'}</button></td></tr>`).join('')}</table>
    <div class="row" style="margin-top:8px"><button class="btn sm" data-act="resetkeys">Reset keys</button></div>
  </div>`);
}

// ---------- dialogue and prompts ----------
export function dialogScreen(d, gm) {
  const S = gm.S;
  const sel = sim.selected(S);
  const canGive = sel && D.ITEMS[sel.id].kind !== 'tool';
  const facts = (d.facts || []).map(factHtml).join('');
  show(`<div class="dialog" role="dialog" aria-label="${esc(d.name)}"><canvas class="portrait" data-pid="${d.npc}" width="84" height="112" aria-hidden="true"></canvas>
    <div class="panel"><div class="row spread"><div><div class="who">${esc(d.name)} <span class="hearts small" aria-label="${d.hearts} hearts">${'♥'.repeat(d.hearts)}${'♡'.repeat(5 - d.hearts)}</span></div><div class="role">${esc(d.role)}</div></div></div>
    ${d.lines.map((l, i) => `<p class="text">${d.legend && i === d.lines.length - 1 ? '<span class="tag">Legend</span>' : ''}${esc(l)}</p>`).join('')}
    ${(d.reminders || []).map((r) => `<p class="text small"><span class="tag">Request</span>${esc(r)}</p>`).join('')}
    ${d.giftText ? `<p class="text"><i>${esc(d.giftText)}</i></p>` : ''}
    ${facts ? `<details><summary class="small">Source</summary>${facts}</details>` : ''}
    <div class="row">${canGive && !d.giftText ? `<button class="btn" data-act="give" data-arg="${d.npc}">Give ${esc(D.itemName(sel.id).toLowerCase())}</button>` : ''}<button class="btn primary" data-act="close" data-focus>Bye</button></div></div></div>`, 'dlg');
  const c = document.querySelector('.dialog .portrait');
  if (c) { const ctx = c.getContext('2d'); ctx.fillStyle = 'rgba(0,0,0,0.08)'; ctx.fillRect(0, 0, 84, 112); portrait(ctx, d.npc, 84, 112, 160) || ctx.drawImage(personSprite(d.npc, D.PEOPLE[d.npc].look, 'down', 0, 80), 2, -6, 80, 120); }
}
export function bedScreen(gm) {
  const S = gm.S;
  const turn = sim.goalsDone(S);
  show(`<div class="panel" style="max-width:28rem"><h2>Go to bed?</h2>
    <p>It is ${sim.clock(S)}. Sleeping ends the day: shipped items are paid, crops grow, and the game saves.</p>
    ${turn ? `<p><b>${S.ch === 6 ? 'Every goal of the last chapter is done.' : 'All five goals are done.'}</b> ${S.ch === 6 ? 'You can finish the story tonight.' : `You can turn the era tonight: the farm passes to the next generation in ${D.CHAPTERS[S.ch + 1].year}.`}</p>` : ''}
    <div style="display:grid;gap:8px">${turn ? `<button class="btn primary" data-act="sleepturn" data-focus>${S.ch === 6 ? 'Sleep and finish the story' : 'Sleep and turn the era'}</button>` : ''}
      <button class="btn ${turn ? '' : 'primary'}" data-act="sleep" ${turn ? '' : 'data-focus'}>Sleep</button><button class="btn" data-act="close">Not yet</button></div></div>`);
}
export function fundScreen(gm) {
  const S = gm.S, q = sim.QUEST['c6-fund'], st = S.quests['c6-fund'];
  show(`<div class="panel" style="max-width:30rem">${head('Restoration fund')}
    ${factHtml('f-maurice')}
    <p>Raised from you so far: <b>${money(S.cstats.donated)}</b> of the ${money(q.n)} goal (game).</p>
    <div class="row">${[250, 500, 1000].map((a) => `<button class="btn" data-act="donate" data-arg="${a}" ${S.money >= a ? '' : 'disabled'}>Give ${money(a)}</button>`).join('')}</div>
    ${st && st.done ? '<p><b>Goal met. Thank you!</b></p>' : ''}</div>`);
}
export function signScreen(kind, gm) {
  if (kind === 'quarry') {
    show(`<div class="panel" style="max-width:34rem">${head('The old quarry')}
      <p class="muted small">A heritage site. Please leave it as you found it: nothing here may be dug or taken.</p>
      ${factHtml('c-archaeology')}${factHtml('f-novaculite-quarries')}${factHtml('f-razor-stone')}
      <p class="small">Novaculite for whetstones comes from the white outcrops elsewhere on the ridge.</p></div>`);
  } else {
    show(`<div class="panel" style="max-width:34rem">${head('The hot springs')}
      <p class="muted small">Steam rises where the water meets the air: the "Valley of Vapors."</p>
      ${D.SPRING_FACTS.map(factHtml).join('')}
      <p class="small">Fill empty jugs here for hot spring water. The soak pool is just down the slope.</p></div>`);
  }
}
export function cardScreen(card) {
  show(`<div class="panel" style="max-width:38rem" role="dialog" aria-label="${esc(card.title)}">
    ${card.kicker ? `<div class="card-era">${esc(card.kicker)}</div>` : ''}<h2>${esc(card.title)}</h2>
    ${(card.paras || []).map((p) => `<p>${esc(p)}</p>`).join('')}
    ${(card.facts || []).map(factHtml).join('')}
    ${card.note ? `<p class="small muted">${esc(card.note)}</p>` : ''}
    <div class="row" style="justify-content:flex-end"><button class="btn primary" data-act="cardnext" data-focus>${esc(card.button || 'Continue')}</button></div></div>`);
}
export function summaryScreen(gm, sum) {
  const S = gm.S;
  show(`<div class="panel" style="max-width:30rem" role="dialog" aria-label="Morning summary">
    <div class="card-era">Good morning</div><h2>${esc(sim.dateLabel(S))}</h2>
    ${sum.passOut ? `<p><b>You collapsed after 2:00.</b> Someone carried you home. You lost ${money(sum.lost)} and woke tired.</p>` : ''}
    <h3>Shipped yesterday (${esc(sum.date)})</h3>
    <ul class="list">${sum.shipped.map((e) => `<li class="li">${icon(e.id)}<div class="grow">${esc(D.itemName(e.id))} ×${e.n}</div><span class="price">${money(e.total)}</span></li>`).join('') || '<li class="muted">Nothing shipped.</li>'}</ul>
    ${sum.rent ? `<p>Rent and stand sales: <b>${money(sum.rent)}</b></p>` : ''}
    <p>Earned: <b>${money(sum.total + sum.rent)}</b> · Cash: <b>${money(S.money)}</b></p>
    ${sum.wilted ? `<p>${sum.wilted} out-of-season crop${sum.wilted > 1 ? 's' : ''} wilted with the change of season. Clear them with the scythe.</p>` : ''}
    <p>Weather today: ${WX[S.weather]}${S.weather === 'rain' ? ' (crops are watered)' : S.weather === 'snow' ? ' (crops are watered by the snowmelt)' : ''}.</p>
    <div class="row" style="justify-content:flex-end"><button class="btn primary" data-act="cardnext" data-focus>Start the day</button></div></div>`);
}
