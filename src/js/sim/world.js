// The valley map: base terrain (same in every chapter) plus each chapter's overlay of buildings,
// roads, lamps and the lake. Pure data, no DOM. Layout is game design, not a survey map.
import { hash, stream, rnd, chance } from './rng.js';

export const W = 60;
export const H = 44;
export const G = { GRASS: 0, FOREST: 1, PATH: 2, STREET: 3, WATER: 4, DEEP: 5, POOL: 6, TUFA: 7, BRIDGE: 8, QUARRY: 9, ROCK: 10, SAND: 11, RAIL: 12, DIRT: 13, PLAZA: 14, DOCK: 15 };
const BLOCKING = new Set([G.WATER, G.DEEP, G.POOL, G.QUARRY, G.ROCK]);
export const groundBlocks = (g) => BLOCKING.has(g);
export const isWater = (g) => g === G.WATER || g === G.DEEP;

export const CREEK = [22, 23];
export const FIELD = { x0: 2, y0: 15, x1: 20, y1: 31 };
export const HOUSE = { x: 2, y: 8, w: 6, h: 4 };
export const BIN = { x: 8, y: 12 };
export const PEN = { x0: 13, y0: 8, x1: 19, y1: 11 }; // interior
export const TROUGH = { x: 16, y: 12 };
const SLOT_X = [26, 31, 39, 44];
const ROW_Y = { A: 8, B: 15, C: 22 };

// Buildings per chapter: [row, slot, span, type, id, label, place]
const TOWN = {
  1: [['B', 0, 1, 'tent', 'tradeCamp', 'TRADE', 'tradeCamp'], ['B', 1, 1, 'tent', 'margauxHome', '', 'margauxHome'],
      ['C', 0, 1, 'cabin', 'josiahHome', '', 'josiahHome'], ['A', 2, 1, 'hut', 'hut2', '', null], ['A', 3, 1, 'hut', 'ezraHome', '', 'ezraHome']],
  2: [['A', 0, 1, 'plankbath', 'bath1', 'BATHS', null], ['A', 1, 1, 'plankbath', 'bath2', 'BATHS', null], ['A', 2, 1, 'plankbath', 'bath3', 'BATHS', null], ['A', 3, 1, 'plankbath', 'bath4', 'BATHS', null],
      ['B', 0, 1, 'plankstore', 'store', 'STORE', 'store'], ['B', 1, 1, 'plankhotel', 'inn', 'BOARDING', 'inn'], ['B', 2, 1, 'plankstore', 'stage', 'STAGE', 'stage'], ['B', 3, 1, 'plankstore', 'drug', 'DRUGS', 'drug'],
      ['C', 0, 1, 'house', 'h1', '', null], ['C', 1, 1, 'house', 'h2', '', null], ['C', 3, 1, 'house', 'h3', '', null]],
  3: [['A', 0, 1, 'brickbath', 'freebath', 'FREE BATHS', null], ['A', 1, 1, 'brickbath', 'bathhouse', 'BATHS', 'bathhouse'], ['A', 2, 1, 'brickbath', 'bath3', 'BATHS', null], ['A', 3, 1, 'brickbath', 'bath4', 'BATHS', null],
      ['B', 0, 1, 'brickstore', 'store', 'STORE', 'store'], ['B', 1, 1, 'house', 'hattieHome', '', 'hattieHome'], ['B', 2, 2, 'grandhotel', 'hotel', 'HOTEL', 'hotel'],
      ['C', 0, 1, 'house', 'h1', '', null], ['C', 1, 1, 'house', 'h2', '', null], ['C', 3, 1, 'depot', 'depot', 'DEPOT', 'depot']],
  4: [['A', 0, 1, 'decobath', 'bath1', 'BATHS', null], ['A', 1, 1, 'domebath', 'bath2', 'BATHS', null], ['A', 2, 1, 'decobath', 'bath3', 'BATHS', null], ['A', 3, 1, 'decobath', 'bath4', 'BATHS', null],
      ['B', 0, 1, 'brickstore', 'store', 'FEED & SEED', 'store'], ['B', 1, 1, 'club', 'club', 'CLUB', 'club'], ['B', 2, 2, 'twinhotel', 'hotel', 'HOTEL', null],
      ['C', 0, 2, 'court', 'court', 'TOURIST COURT', 'court'], ['C', 2, 1, 'radio', 'radio', 'RADIO', 'radio'], ['C', 3, 1, 'house', 'juneHome', '', 'juneHome']],
  5: [['A', 0, 1, 'decobath', 'bath1', 'BATHS', null], ['A', 1, 1, 'domebath', 'bath2', 'BATHS', null], ['A', 2, 1, 'decobath', 'bath3', 'BATHS', null], ['A', 3, 1, 'decobath', 'bath4', 'BATHS', null],
      ['B', 0, 1, 'modernstore', 'store', 'FARM SUPPLY', 'store'], ['B', 1, 1, 'drivein', 'drivein', 'DRIVE-IN', 'drivein'], ['B', 2, 2, 'motel', 'motel', 'MOTOR HOTEL', 'motel'],
      ['C', 0, 2, 'barn', 'zoo', 'ANIMAL SHOW', 'zoo'], ['C', 2, 1, 'ranchhouse', 'rustyHome', '', 'rustyHome'], ['C', 3, 1, 'ranchhouse', 'h4', '', null]],
  6: [['A', 0, 1, 'restored', 'brewery', 'BREWERY', 'brewery'], ['A', 1, 1, 'restoreddome', 'spa', 'SPA', null], ['A', 2, 1, 'restored', 'center', 'CULTURAL CTR', null], ['A', 3, 1, 'restored', 'hale', 'HOTEL', null],
      ['B', 0, 1, 'modernstore', 'store', 'HARDWARE', 'store'], ['B', 1, 1, 'house', 'joHome', '', 'joHome'], ['B', 2, 2, 'market', 'market', 'FARMERS MARKET', 'market'],
      ['C', 0, 1, 'house', 'priyaHome', '', 'priyaHome'], ['C', 1, 1, 'house', 'marcusHome', '', 'marcusHome'], ['C', 3, 1, 'house', 'h4', '', null]],
};
const EXTRA = {
  2: [{ type: 'mill', id: 'mill', label: 'MILL', x: 24, y: 29, w: 5, h: 4, place: 'mill' }],
  3: [{ type: 'mill', id: 'mill', label: 'MILL', x: 24, y: 29, w: 5, h: 4, place: null }],
  4: [{ type: 'house', id: 'salHome', label: '', x: 24, y: 29, w: 5, h: 4, place: 'salHome' }],
  5: [{ type: 'house', id: 'h5', label: '', x: 24, y: 29, w: 5, h: 4, place: null }],
  6: [{ type: 'house', id: 'h5', label: '', x: 24, y: 29, w: 5, h: 4, place: null }],
};
const HOUSE_TYPE = { cabin: 'farm-cabin', plank: 'farm-plank', brickless: 'farm-plank', brick: 'farm-brick', bungalow: 'farm-bungalow', ranch: 'farm-ranch', restored: 'farm-restored' };

export function lakeMask(x, y) {
  if (y < 33) return 0;
  const dx = (x - 30) / 27, dy = (y - 42) / 9;
  const n = ((hash(x >> 1, y >> 1, 'lake') % 100) / 100 - 0.5) * 0.18;
  const d = dx * dx + dy * dy + n;
  return d < 0.55 ? 2 : d < 1 ? 1 : 0;
}

// Build the map for a chapter. `house` overrides the farmhouse style (brick upgrade in chapter 3).
export function buildWorld(seed, ch, opts = {}) {
  const g = new Uint8Array(W * H);
  const lake = new Uint8Array(W * H);
  const set = (x, y, v) => { if (x >= 0 && y >= 0 && x < W && y < H) g[y * W + x] = v; };
  const get = (x, y) => g[y * W + x];
  const hasLake = ch >= 4;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let v = G.GRASS;
    if (y <= 6 || x >= 58) v = G.FOREST;
    if (y === 0) v = G.ROCK;
    if (y >= 34 && !hasLake && (x < 2 || x > 56)) v = G.FOREST;
    set(x, y, v);
  }
  // Creek: from the ridge to the south edge.
  for (let y = 4; y < H; y++) for (const x of CREEK) set(x, y, G.WATER);
  // Lake (chapter 4+).
  if (hasLake) for (let y = 30; y < H; y++) for (let x = 0; x < W; x++) {
    const m = lakeMask(x, y);
    if (m) { set(x, y, m === 2 ? G.DEEP : G.WATER); lake[y * W + x] = 1; }
    else if (y >= 33 && lakeMask(x, y + 1)) set(x, y, G.SAND);
  }
  for (let y = 0; y < H; y++) for (const x of CREEK) if (lake[y * W + x] === 0 && y >= 30 && hasLake) lake[y * W + x] = 0;
  // Springs: tufa slope, hot pools, soak pool.
  for (let y = 7; y <= 19; y++) for (let x = 50; x <= 57; x++) set(x, y, G.TUFA);
  const special = {};
  for (const [x, y] of [[52, 9], [53, 9], [52, 10], [56, 11]]) { set(x, y, G.POOL); special[x + ',' + y] = 'hotspring'; }
  for (const [x, y] of [[54, 15], [55, 15], [54, 16], [55, 16]]) { set(x, y, G.POOL); special[x + ',' + y] = 'soak'; }
  // Cold spring on the north ridge.
  for (const [x, y] of [[8, 3], [9, 3]]) { set(x, y, G.WATER); special[x + ',' + y] = 'cold'; }
  // Heritage quarry pits.
  for (let x = 40; x <= 44; x++) for (let y = 2; y <= 3; y++) if (!(x === 42 && y === 3)) set(x, y, G.QUARRY);
  // Roads.
  const road = ch === 1 ? G.PATH : G.STREET;
  for (let x = 4; x <= 21; x++) set(x, 13, G.PATH);
  for (let y = 12; y <= 13; y++) set(4, y, G.PATH);
  for (const x of CREEK) { set(x, 13, G.BRIDGE); set(x, 27, G.BRIDGE); }
  set(21, 27, G.PATH); set(20, 27, G.PATH);
  for (let x = 24; x <= 50; x++) { set(x, 13, road); if (ch > 1) set(x, 14, road); }
  if (ch > 1) {
    for (let y = 14; y <= 33; y++) { set(37, y, road); set(38, y, road); }
    for (let x = 24; x <= 49; x++) { set(x, 20, road); set(x, 27, road); }
    for (let x = 24; x <= 49; x++) set(x, 21, ch >= 3 ? G.PLAZA : G.GRASS);
  } else {
    for (let y = 14; y <= 27; y++) set(28, y, G.PATH);
    for (let x = 24; x <= 28; x++) set(x, 27, G.PATH);
  }
  // Trail up to the ridge and the quarry.
  for (let y = 5; y <= 12; y++) set(33, y, ch >= 6 ? G.DIRT : G.PATH);
  for (let x = 33; x <= 42; x++) set(x, 5, ch >= 6 ? G.DIRT : G.PATH);
  for (let x = 42; x <= 42; x++) set(x, 4, G.PATH);
  // Rails (chapters 3–5) along the south of town.
  if (ch >= 3 && ch <= 5) for (let x = 24; x <= 57; x++) if (!isWater(get(x, 32))) set(x, 32, G.RAIL);
  // Ballfield (chapter 3).
  if (ch === 3) for (let y = 33; y <= 41; y++) for (let x = 38; x <= 50; x++) set(x, y, ((x - 44) ** 2 + (y - 37) ** 2 < 10) ? G.DIRT : G.GRASS);
  // Docks (chapter 6).
  if (ch === 6) for (let y = 33; y <= 37; y++) { set(30, y, G.DOCK); set(31, y, G.DOCK); }
  if (ch >= 4) for (let y = 28; y <= 33; y++) if (!isWater(get(37, y))) { set(37, y, road); set(38, y, road); }

  // Buildings.
  const buildings = [];
  const places = {};
  const add = (b) => {
    b.door = b.door || { x: b.x + Math.floor(b.w / 2), y: b.y + b.h - 1 };
    b.front = { x: b.door.x, y: b.door.y + 1 };
    buildings.push(b);
    if (b.place) places[b.place] = { ...b.front };
  };
  const houseStyle = HOUSE_TYPE[opts.house || ''] || HOUSE_TYPE[opts.chapterHouse] || 'farm-cabin';
  add({ type: houseStyle, id: 'farmhouse', label: '', x: HOUSE.x, y: HOUSE.y, w: HOUSE.w, h: HOUSE.h, place: 'farmDoor', door: { x: 4, y: HOUSE.y + HOUSE.h - 1 } });
  for (const [row, slot, span, type, id, label, place] of TOWN[ch] || []) {
    const x = SLOT_X[slot], w = span === 2 ? 10 : 5;
    add({ type, id, label, x, y: ROW_Y[row], w, h: 5, place });
  }
  for (const b of EXTRA[ch] || []) add({ ...b });
  // Named standing points.
  Object.assign(places, {
    bin: { x: BIN.x, y: BIN.y + 1 }, field: { x: 11, y: 22 }, bridge: { x: 24, y: 13 }, town: { x: 37, y: 14 },
    street: { x: 37, y: 17 }, springs: { x: 52, y: 11 }, soak: { x: 54, y: 17 }, coldspring: { x: 8, y: 4 },
    ridge: { x: 30, y: 4 }, quarry: { x: 42, y: 5 }, creek: { x: 21, y: 18 }, farmGate: { x: 21, y: 13 },
    trail: { x: 33, y: 6 }, promenade: { x: 47, y: 14 }, trough: { x: TROUGH.x, y: TROUGH.y + 1 },
    lake: hasLake ? { x: 30, y: 33 } : { x: 21, y: 36 }, ballfield: { x: 44, y: 35 }, fund: { x: 36, y: 13 },
    stand: { x: 19, y: 14 }, market: places.market || { x: 41, y: 20 },
  });
  if (ch === 6) places.lake = { x: 31, y: 37 };
  if (ch === 1) places.tradeCamp = places.tradeCamp || { x: 28, y: 20 };
  // Signs and fixed objects (not saved; rebuilt with the map).
  const fixed = [
    { x: 51, y: 12, t: 'sign', k: 'springs' },
    { x: 43, y: 5, t: 'sign', k: 'quarry' },
    { x: BIN.x, y: BIN.y, t: 'bin' },
  ];
  if (ch >= 2) fixed.push({ x: TROUGH.x, y: TROUGH.y, t: 'trough' });
  if (ch === 6) fixed.push({ x: 36, y: 12, t: 'fund' });
  if (ch >= 2) {
    for (let x = PEN.x0 - 1; x <= PEN.x1 + 1; x++) for (const y of [PEN.y0 - 1, PEN.y1 + 1]) if (!(x === TROUGH.x && y === TROUGH.y)) fixed.push({ x, y, t: 'pen' });
    for (let y = PEN.y0; y <= PEN.y1; y++) for (const x of [PEN.x0 - 1, PEN.x1 + 1]) fixed.push({ x, y, t: 'pen' });
  }
  // Lamps: era light sources at doors and along the street.
  const lamps = [];
  const lampKind = ['', 'fire', 'lantern', 'gas', 'neon', 'sodium', 'led'][ch];
  // The trade camp's fire burns beside the path, clear of where people stand.
  if (ch === 1) { lamps.push({ x: 26.4, y: 21.2, k: 'fire' }, { x: 5.5, y: 14.2, k: 'fire' }); }
  else {
    for (const b of buildings) if (b.place || b.label) lamps.push({ x: b.front.x + 0.5, y: b.front.y - 0.3, k: lampKind, door: true });
    if (ch >= 3) for (const x of [27, 33, 41, 47]) for (const y of [14.9, 21.9]) lamps.push({ x: x + 0.5, y, k: lampKind, post: true });
    lamps.push({ x: 4.5, y: 12.6, k: lampKind, door: true });
  }
  return { ch, W, H, g, lake, buildings, places, special, fixed, lamps };
}

// Seeded natural objects for a fresh chapter (trees, rocks, outcrops, crystal nodes, grass tufts).
// The farm field's stones and tufts appear only in chapter 1 (the land is cleared after that).
export function naturalObjects(world, seed, ch, keepFarm) {
  const r = stream(seed, 'nature', ch);
  const objs = {};
  const { g, W: w } = world;
  const occupied = new Set();
  for (const b of world.buildings) for (let y = b.y - 1; y <= b.y + b.h; y++) for (let x = b.x - 1; x <= b.x + b.w; x++) occupied.add(x + ',' + y);
  for (const f of world.fixed) occupied.add(f.x + ',' + f.y);
  for (const p of Object.values(world.places)) { occupied.add(p.x + ',' + p.y); occupied.add(p.x + ',' + (p.y - 1)); }
  const free = (x, y) => !occupied.has(x + ',' + y) && (g[y * w + x] === G.GRASS || g[y * w + x] === G.FOREST);
  const inFarm = (x, y) => x <= 21 && y >= 7 && y <= 33;
  for (let y = 1; y < H; y++) for (let x = 0; x < W; x++) {
    if (!free(x, y)) continue;
    const k = x + ',' + y;
    const gv = g[y * w + x];
    if (inFarm(x, y)) {
      if (keepFarm) continue;
      const inField = x >= 2 && x <= 20 && y >= 15 && y <= 31;
      if (ch === 1 && inField) {
        const n = rnd(r);
        if (n < 0.05) objs[k] = { t: 'rock', hp: 2 };
        else if (n < 0.12) objs[k] = { t: 'tuft' };
      } else if (!inField && (x < 2 || y >= 32) && chance(r, 0.35)) objs[k] = { t: 'tree', k: chance(r, 0.6) ? 'pine' : 'oak', hp: 3 };
      continue;
    }
    if (gv === G.FOREST) {
      const n = rnd(r);
      const ridge = y <= 6;
      if (ridge && x >= 26 && x <= 49 && n < 0.07) objs[k] = { t: 'outcrop', hp: 3 };
      else if (ridge && n < 0.09) objs[k] = { t: 'crystal', hp: 2 };
      else if (n < (ridge ? 0.42 : 0.5)) objs[k] = { t: 'tree', k: (x + y) % 3 === 0 ? 'oak' : 'pine', hp: 3 };
      else if (n < 0.47) objs[k] = { t: 'rock', hp: 2 };
    } else if (gv === G.GRASS) {
      const town = x >= 24 && x <= 50 && y >= 7 && y <= 33;
      const n = rnd(r);
      if (town) { if (ch <= 2 && n < 0.05) objs[k] = { t: 'tree', k: 'oak', hp: 3 }; else if (ch >= 3 && (y === 12 || y === 15) && x % 3 === 0) objs[k] = { t: 'tree', k: 'magnolia', hp: 99 }; }
      else if (n < 0.18) objs[k] = { t: 'tree', k: n < 0.07 ? 'oak' : 'pine', hp: 3 };
      else if (n < 0.21) objs[k] = { t: 'rock', hp: 2 };
    }
  }
  // Guarantee a few novaculite outcrops on the ridge close to the trail.
  for (const [x, y] of [[30, 3], [35, 2], [37, 4], [46, 3]]) if (g[y * w + x] === G.FOREST) objs[x + ',' + y] = { t: 'outcrop', hp: 3 };
  return objs;
}
