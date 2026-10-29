// Painted sprites: which image each building, tree, prop and person uses, and pre-scaled cached canvases
// of them at the current tile size. Every function returns null when its art has not loaded (or `?art=0`),
// and the caller falls back to the vector art in art.js.
import { img, hasArt, ART, manifest } from './assets.js';
import { cached } from './art.js';
import { composeCell, CELL_W, CELL_H } from './sprites.js';
import { SKINS } from '../sim/data.js';

// ---------- buildings ----------
// [image, mirrored]. Same building types get different art per chapter; houses alternate mirror images.
const BLD = {
  1: { tradeCamp: 'tent', margauxHome: 'tent2', josiahHome: 'cabin', hut2: 'hut', ezraHome: ['hut', 1] },
  2: { bath1: 'plankbath', bath2: 'plankbath2', bath3: ['plankbath', 1], bath4: ['plankbath2', 1], store: 'plankstore', inn: 'plankhotel', stage: 'stage', drug: 'drug',
       h1: 'house2', h2: ['house2', 1], h3: 'house2', mill: 'mill' },
  3: { freebath: 'vicbath-free', bathhouse: 'vicbath-1', bath3: 'vicbath-2', bath4: 'vicbath-3', store: 'brickstore', hattieHome: 'house3', hotel: 'grandhotel',
       h1: ['house3', 1], h2: 'house3', depot: 'depot', mill: 'mill' },
  4: { bath1: 'row-1', bath2: 'row-2', bath3: 'row-3', bath4: 'row-4', store: 'brickstore4', club: 'club', hotel: 'twinhotel', court: 'court', radio: 'radio',
       juneHome: 'house4', salHome: ['house4', 1] },
  5: { bath1: 'row-1', bath2: 'row-2', bath3: 'row-3', bath4: 'row-4', store: 'modernstore', drivein: 'drivein', motel: 'motel', zoo: 'barn',
       rustyHome: 'ranchhouse', h4: ['ranchhouse', 1], h5: 'ranchhouse' },
  6: { brewery: 'row-1r', spa: 'row-2r', center: 'row-3r', hale: 'row-4r', store: 'hardware', joHome: 'house6', priyaHome: ['house6', 1], marcusHome: 'house6',
       h4: ['house6', 1], market: 'market', h5: 'house6' },
};
export function buildingArt(ch, b) {
  if (b.id === 'farmhouse') return { name: 'bld-' + b.type, flip: false };
  const e = (BLD[ch] || {})[b.id];
  if (!e) return null;
  const [n, flip] = Array.isArray(e) ? e : [e, 0];
  return { name: 'bld-' + n, flip: !!flip };
}
export function buildingNames(ch) {
  const s = new Set(['bld-farm-cabin', 'bld-farm-plank', 'bld-farm-brick', 'bld-farm-bungalow', 'bld-farm-ranch', 'bld-farm-restored']);
  for (const e of Object.values(BLD[ch] || {})) s.add('bld-' + (Array.isArray(e) ? e[0] : e));
  return s;
}

// A loaded image scaled once to w × h device pixels (optionally mirrored).
export function scaled(name, w, h, flip = false, tint = null) {
  const im = img(name);
  if (!im) return null;
  w = Math.max(1, Math.round(w)); h = Math.max(1, Math.round(h));
  return cached(`img|${name}|${w}|${h}|${flip ? 1 : 0}|${tint ? tint.join() : ''}`, w, h, (g) => {
    let src = im, sw = im.naturalWidth, sh = im.naturalHeight;
    while (sw / 2 >= w && sh / 2 >= h) {
      const c = document.createElement('canvas'); c.width = Math.ceil(sw / 2); c.height = Math.ceil(sh / 2);
      const cg = c.getContext('2d'); cg.imageSmoothingQuality = 'high'; cg.drawImage(src, 0, 0, c.width, c.height); src = c; sw = c.width; sh = c.height;
    }
    g.imageSmoothingQuality = 'high';
    if (flip) { g.translate(w, 0); g.scale(-1, 1); }
    g.drawImage(src, 0, 0, w, h);
    if (tint) { // [colour, strength]: a 'color' blend kept inside the sprite's own alpha
      g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'color'; g.globalAlpha = tint[1]; g.fillStyle = tint[0]; g.fillRect(0, 0, w, h);
      g.globalAlpha = 1; g.globalCompositeOperation = 'destination-in'; if (flip) { g.translate(w, 0); g.scale(-1, 1); } g.drawImage(src, 0, 0, w, h);
    }
  });
}
const aspect = (name) => { const im = img(name); return im ? im.naturalHeight / im.naturalWidth : 1; };

// Placement of a building's painted sprite in device pixels (world space): the image spans the footprint's
// width and its base sits on the footprint's south edge, so roofs and chimneys may rise above the footprint.
export function buildingSprite(ch, b, u, snow = false) {
  const a = buildingArt(ch, b);
  if (!a || !img(a.name)) return null;
  const w = b.w * u, h = w * aspect(a.name);
  const c = snow ? snowy(a.name, w, h, a.flip) : scaled(a.name, w, h, a.flip);
  return { c, x: b.x * u, y: (b.y + b.h) * u - h, w, h };
}
// Snow lying on the roof: the roof fills the top of each painting (the three-quarter view), so a white wash that
// fades out down the image, kept inside the building's own outline, reads as a snow-covered roof.
function snowy(name, w, h, flip) {
  const base = scaled(name, w, h, flip);
  return cached(`snow|${name}|${Math.round(w)}|${flip ? 1 : 0}`, base.width, base.height, (g) => {
    g.drawImage(base, 0, 0);
    // Screen keeps the shingles' texture showing through, like a dusting; only the roof band at the top.
    g.globalCompositeOperation = 'screen';
    const gr = g.createLinearGradient(0, 0, 0, base.height * 0.42);
    gr.addColorStop(0, 'rgba(235,240,248,0.85)'); gr.addColorStop(0.7, 'rgba(225,232,242,0.55)'); gr.addColorStop(1, 'rgba(225,232,242,0)');
    g.fillStyle = gr; g.fillRect(0, 0, base.width, base.height);
    g.globalCompositeOperation = 'destination-in'; g.drawImage(base, 0, 0);
  });
}

// ---------- trees and props ----------
const TREE = { oak: { w: 2.3 }, pine: { w: 1.75 }, magnolia: { w: 1.9 } };
export function treeArt(kind, sea) {
  if (kind === 'oak') return 'tree-oak-' + (sea || 'su');
  if (kind === 'pine') return 'tree-pine';
  if (kind === 'magnolia') return 'tree-magnolia';
  return null;
}
// Returns { c, ox, oy } with (ox, oy) the offset of the sprite's top-left from the base point, in pixels.
export function treeSprite(kind, sea, u, x = 0, y = 0) {
  const name = treeArt(kind, sea);
  if (!name || !img(name)) return null;
  const vary = 0.88 + ((x * 7 + y * 13) % 9) / 36; // a little size variety
  const w = (TREE[kind] || TREE.oak).w * u * vary, h = w * aspect(name);
  const flip = (x * 5 + y * 3) % 2 === 1;
  // The painted summer oak leans yellow; pull it toward the valley's deep summer green.
  const tint = name === 'tree-oak-su' ? ['#3f7a2a', 0.38] : name === 'tree-oak-sp' ? ['#7cc048', 0.45] : null;
  return { c: scaled(name, w, h, flip, tint), ox: -w / 2, oy: -h };
}
const PROP_IMG = { hut: 'bld-hut', stand: 'icon-stand', chest: 'icon-chest', sprinkler: 'icon-sprinkler', drip: 'icon-drip', fence: 'icon-fence', fund: 'icon-crate' };
const PROP = { hut: 1.7, stand: 1.4, chest: 0.85, sprinkler: 0.7, drip: 0.75, fence: 1.0, fund: 0.85, rock: 0.95, outcrop: 1.05, crystal: 0.78, tuft: 0.85, bin: 1.0, trough: 1.5, sign: 1.0, campfire: 1.05, bush: 1.0 };
export function propSprite(t, u, x = 0, y = 0) {
  const w0 = PROP[t], name = PROP_IMG[t] || t;
  if (!w0 || !img(name)) return null;
  const w = w0 * u * (t === 'rock' || t === 'tuft' ? 0.9 + ((x * 7 + y * 3) % 5) / 20 : 1), h = w * aspect(name);
  const flip = !['sign', 'bin', 'hut', 'stand', 'chest', 'fund'].includes(t) && (x + y) % 2 === 1;
  if (t === 'fund' && img('icon-coin')) { // the restoration-fund box: a crate with a coin on its lid
    const c = cached(`fund|${Math.round(w)}`, w, h, (g) => { g.drawImage(scaled(name, w, h), 0, 0); g.drawImage(scaled('icon-coin', w * 0.5, w * 0.5), w * 0.25, 0); });
    return { c, ox: -w / 2, oy: -h };
  }
  return { c: scaled(name, w, h, flip), ox: -w / 2, oy: -h };
}

// ---------- crops, animals, lamps ----------
// Crop sheets: five growth stages in 128 x 192 cells, bottom-aligned at one scale. Stage -1 (wilted) is the
// grown plant tinted dry brown.
export function cropSprite(id, stage, u) {
  const name = 'crop-' + id, im = img(name);
  if (!im) return null;
  const cell = Math.max(0, Math.min(4, stage < 0 ? 3 : stage)), cw = im.naturalWidth / 5, ch = im.naturalHeight;
  const w = Math.round(u * 1.08), h = Math.round(w * ch / cw);
  const c = cached(`crop|${id}|${stage}|${w}`, w, h, (g) => {
    g.imageSmoothingQuality = 'high';
    g.drawImage(im, cell * cw, 0, cw, ch, 0, 0, w, h);
    if (stage < 0) { g.globalCompositeOperation = 'source-atop'; g.fillStyle = 'rgba(120,88,48,0.72)'; g.fillRect(0, 0, w, h); }
  });
  return { c, ox: -w / 2, oy: -h };
}
const ANIMAL_W = { cow: 1.55, goat: 1.05, hen: 0.62 };
export function animalSprite(kind, face, u) {
  const name = 'animal-' + kind;
  if (!img(name)) return null;
  const w = (ANIMAL_W[kind] || 1) * u, h = w * aspect(name);
  return { c: scaled(name, w, h, face === 'left'), ox: -w / 2, oy: -h };
}
const LAMP = { lantern: ['lamp-lantern', 0.62], gas: ['lamp-gas', 0.5], neon: ['lamp-deco', 0.95], sodium: ['lamp-sodium', 0.62], led: ['lamp-led', 0.5], fire: ['campfire', 1.0] };
export function lampSprite(kind, u) {
  const e = LAMP[kind];
  if (!e || !img(e[0])) return null;
  const w = e[1] * u, h = w * aspect(e[0]);
  return { c: scaled(e[0], w, h), ox: -w / 2, oy: -h };
}

// ---------- farmyard decor ----------
// Era props around the farmhouse yard (between the house and the pen, and the field's west edge). Render-only:
// they don't block movement and are skipped on any tile that has a tree, rock or crop.
// [image, x, y (base point, tiles), width (tiles)]
export const DECO = {
  1: [['deco-woodpile', 9.6, 9.2, 1.5], ['deco-barrels', 10.9, 11.3, 1.1], ['deco-scarecrow', 1.0, 22.9, 1.1]],
  2: [['deco-wagon', 10.0, 10.9, 2.3], ['deco-woodpile', 9.0, 8.6, 1.4], ['deco-haystack', 1.0, 16.6, 1.3], ['deco-pump', 8.7, 10.2, 0.9]],
  3: [['deco-wagon', 10.1, 10.9, 2.3], ['deco-barrels', 8.9, 8.8, 1.1], ['deco-haystack', 1.0, 16.6, 1.3], ['deco-pump', 8.7, 10.2, 0.9], ['deco-scarecrow', 1.0, 24.4, 1.1]],
  4: [['deco-modelA', 10.0, 10.9, 2.5], ['deco-haybale', 8.9, 8.8, 1.2], ['deco-scarecrow', 1.0, 22.9, 1.1], ['deco-pump', 8.7, 10.2, 0.9]],
  5: [['deco-tractor', 10.0, 10.9, 2.4], ['deco-haybale', 8.9, 8.8, 1.2], ['deco-barrels', 1.0, 16.6, 1.1]],
  6: [['deco-greenhouse', 10.0, 10.9, 2.6], ['deco-beehives', 8.9, 8.8, 1.2], ['deco-raisedbeds', 1.0, 17.0, 1.9]],
};
// Town: vehicles and street furniture in the lots at the ends of the blocks, out of the walking lines.
const TOWN_DECO = {
  2: [['street-buggy', 25.0, 19.4, 2.0], ['street-hitch', 25.0, 26.4, 1.2], ['deco-barrels', 49.9, 26.4, 1.1]],
  3: [['street-carriage', 25.0, 19.4, 2.0], ['street-buggy', 49.9, 26.4, 2.0], ['street-hitch', 25.0, 26.4, 1.2], ['street-bench', 25.0, 12.5, 1.1]],
  4: [['street-sedan31', 25.0, 19.4, 2.0], ['street-coupe31', 49.9, 26.4, 2.0], ['street-bench', 25.0, 26.4, 1.1], ['street-planter', 25.0, 12.5, 1.0]],
  5: [['street-car55a', 25.0, 19.4, 2.05], ['street-car55b', 49.9, 26.4, 2.05], ['street-hydrant', 25.0, 26.4, 0.7], ['street-bench', 25.0, 12.5, 1.1]],
  6: [['street-car26a', 25.0, 19.4, 2.0], ['street-umbrella', 49.9, 26.4, 1.3], ['street-bikes', 25.0, 26.4, 1.2], ['street-planter', 25.0, 12.5, 1.0]],
};
for (const ch of Object.keys(TOWN_DECO)) DECO[ch].push(...TOWN_DECO[ch]);
export function decoSprite(name, wTiles, u) {
  if (!img(name)) return null;
  const w = wTiles * u, h = w * aspect(name);
  return { c: scaled(name, w, h), ox: -w / 2, oy: -h };
}

// ---------- item icons ----------
// Painted icon for an item id, or null. Seeds are the plain packet with the crop's produce on its corner.
const seedCrop = (id) => (id.startsWith('seed:') ? id.slice(5) : null);
export function iconSprite(id, px) {
  const crop = seedCrop(id);
  if (crop) {
    if (!img('icon-seedpacket') || !img('icon-' + crop)) return null;
    return cached(`icp|${id}|${px}`, px, px, (g) => { g.drawImage(scaled('icon-seedpacket', px, px), 0, 0); g.drawImage(scaled('icon-' + crop, px * 0.6, px * 0.6), px * 0.42, px * 0.42); });
  }
  return img('icon-' + id) ? scaled('icon-' + id, px, px) : null;
}
// DOM markup for an icon from the packed files (no canvas readback, so file:// works); null when not painted.
export function iconHtml(id, cls = '') {
  if (!ART.on) return null;
  const M = manifest(), crop = seedCrop(id);
  if (crop) return M['icon-seedpacket'] && M['icon-' + crop] ? `<span class="ic-seed ${cls}"><img alt="" src="assets/${M['icon-seedpacket'].file}"><img alt="" class="ic-crop" src="assets/${M['icon-' + crop].file}"></span>` : null;
  return M['icon-' + id] ? `<img alt="" class="${cls}" src="assets/${M['icon-' + id].file}">` : null;
}

// ---------- people ----------
export const peopleReady = () => !!(img('chars-trousers') && img('chars-dress') && img('chars-overlay'));
export const FEET = 164 / 192; // ground point within a character cell
// A person frame at u px per tile: 1.0 tile wide × 1.5 tall cell; returns { c, ox, oy } relative to the feet.
export function personSprite(id, look, face, frame, u) {
  if (!peopleReady()) return null;
  const w = Math.round(u * 1.3), h = Math.round(w * CELL_H / CELL_W);
  const c = cached(`pp|${id}|${face}|${frame}|${w}`, w, h, (g) => {
    const cell = composeCell({ trousers: img('chars-trousers'), dress: img('chars-dress'), overlay: img('chars-overlay') },
      face === 'up' ? { ...look, glasses: false } : look, SKINS[look.skin ?? 1], face, frame);
    let src = cell, sw = CELL_W;
    while (sw / 2 >= w) { const t = document.createElement('canvas'); t.width = Math.ceil(src.width / 2); t.height = Math.ceil(src.height / 2); const tg = t.getContext('2d'); tg.imageSmoothingQuality = 'high'; tg.drawImage(src, 0, 0, t.width, t.height); src = t; sw = t.width; }
    g.imageSmoothingQuality = 'high'; g.drawImage(src, 0, 0, w, h);
  });
  return { c, ox: -w / 2, oy: -h * FEET };
}
export { hasArt };
