// Procedural art: ground tiles, buildings, people, plants, objects and item icons.
// Everything is drawn with Canvas 2D paths into cached canvases. `u` = one tile in device pixels.
import { G } from '../sim/world.js';
import { noise } from '../sim/rng.js';
import { mix, shade, rgba } from './palette.js';
import { SKINS, ITEMS, CROPS } from '../sim/data.js';

const cache = new Map();
export function clearArt() { cache.clear(); }
export function cached(k, w, h, draw) {
  let c = cache.get(k);
  if (c) return c;
  c = document.createElement('canvas');
  c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h));
  draw(c.getContext('2d'));
  cache.set(k, c);
  return c;
}
export const artCacheSize = () => cache.size;

const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function ell(ctx, x, y, rx, ry, c) { ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), 0, 0, Math.PI * 2); ctx.fill(); }
function poly(ctx, pts, c, stroke, lw) { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); if (c) { ctx.fillStyle = c; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1; ctx.stroke(); } }
const OUT = '#1a1612';

// ---------- ground ----------
export function drawGround(ctx, gv, x, y, u, P, nb) {
  const px = x * u, py = y * u;
  const n = (k) => noise(x, y, k);
  switch (gv) {
    case G.GRASS: case G.FOREST: {
      const base = gv === G.GRASS ? P.grass : P.forest;
      R(ctx, px, py, u, u, base);
      for (let i = 0; i < 6; i++) {
        const sx = px + n(i) * u, sy = py + n(i + 9) * u;
        R(ctx, sx, sy, u * 0.06, u * 0.12, shade(base, i % 2 ? -0.18 : 0.12));
      }
      if (gv === G.FOREST) for (let i = 0; i < 3; i++) R(ctx, px + n(i + 30) * u, py + n(i + 40) * u, u * 0.14, u * 0.04, shade(base, -0.3));
      if (gv === G.GRASS && n(77) < 0.12 && P.sea !== 'wi') { ell(ctx, px + n(78) * u * 0.8 + u * 0.1, py + n(79) * u * 0.8 + u * 0.1, u * 0.05, u * 0.05, P.flower); }
      break;
    }
    case G.PATH: case G.DIRT: {
      const base = gv === G.PATH ? P.path : P.dirt;
      R(ctx, px, py, u, u, base);
      for (let i = 0; i < 5; i++) ell(ctx, px + n(i) * u, py + n(i + 5) * u, u * 0.05, u * 0.035, shade(base, i % 2 ? -0.15 : 0.15));
      edges(ctx, px, py, u, nb, (g) => g === G.GRASS || g === G.FOREST, P.grass);
      break;
    }
    case G.STREET: street(ctx, px, py, u, P, x, y, nb); break;
    case G.PLAZA: {
      R(ctx, px, py, u, u, P.ch >= 4 ? '#c8c2b4' : '#c8a07a');
      ctx.strokeStyle = rgba('#000000', 0.12); ctx.lineWidth = Math.max(1, u * 0.03);
      ctx.strokeRect(px + 0.5, py + 0.5, u / 2, u / 2); ctx.strokeRect(px + u / 2, py + u / 2, u / 2, u / 2);
      break;
    }
    case G.WATER: case G.DEEP: {
      const base = gv === G.WATER ? P.water : P.deep;
      R(ctx, px, py, u, u, base);
      ctx.strokeStyle = rgba('#ffffff', 0.16); ctx.lineWidth = Math.max(1, u * 0.04);
      for (let i = 0; i < 2; i++) { const yy = py + (0.3 + i * 0.4) * u + n(i) * u * 0.1, xx = px + n(i + 3) * u * 0.5; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.quadraticCurveTo(xx + u * 0.15, yy - u * 0.06, xx + u * 0.3, yy); ctx.stroke(); }
      if (nb.n !== G.WATER && nb.n !== G.DEEP && nb.n !== G.BRIDGE && nb.n !== G.POOL) R(ctx, px, py, u, u * 0.12, rgba('#000000', 0.18));
      break;
    }
    case G.POOL: {
      R(ctx, px, py, u, u, P.tufa);
      ell(ctx, px + u / 2, py + u / 2, u * 0.5, u * 0.46, P.rim);
      ell(ctx, px + u / 2, py + u / 2, u * 0.44, u * 0.4, P.algae);
      ell(ctx, px + u / 2, py + u / 2, u * 0.36, u * 0.32, P.pool);
      ell(ctx, px + u * 0.4, py + u * 0.42, u * 0.1, u * 0.05, rgba('#ffffff', 0.35));
      break;
    }
    case G.TUFA: {
      R(ctx, px, py, u, u, P.tufa);
      for (let i = 0; i < 3; i++) R(ctx, px + n(i) * u * 0.8, py + n(i + 4) * u, u * 0.25, u * 0.05, P.rim);
      if (n(12) < 0.3) R(ctx, px + n(13) * u * 0.7, py + n(14) * u * 0.7, u * 0.2, u * 0.08, rgba('#2f8f5b', 0.5));
      break;
    }
    case G.BRIDGE: {
      R(ctx, px, py, u, u, P.water);
      R(ctx, px, py + u * 0.05, u, u * 0.9, P.wood);
      ctx.fillStyle = shade(P.wood, -0.3);
      for (let i = 1; i < 4; i++) ctx.fillRect(px + i * u / 4, py + u * 0.05, Math.max(1, u * 0.03), u * 0.9);
      R(ctx, px, py + u * 0.05, u, u * 0.06, P.woodDark); R(ctx, px, py + u * 0.89, u, u * 0.06, P.woodDark);
      break;
    }
    case G.QUARRY: {
      R(ctx, px, py, u, u, P.forest);
      ell(ctx, px + u / 2, py + u / 2, u * 0.5, u * 0.45, '#5a5650');
      ell(ctx, px + u / 2, py + u * 0.55, u * 0.4, u * 0.33, '#3a3834');
      for (let i = 0; i < 6; i++) ell(ctx, px + n(i) * u, py + n(i + 7) * u, u * 0.04, u * 0.03, '#efeae2');
      break;
    }
    case G.ROCK: {
      R(ctx, px, py, u, u, '#5a5650');
      poly(ctx, [[px, py + u], [px + u * 0.3, py + u * 0.3], [px + u * 0.6, py + u * 0.6], [px + u, py + u * 0.2], [px + u, py + u]], '#6e6a62');
      break;
    }
    case G.SAND: R(ctx, px, py, u, u, P.sand); for (let i = 0; i < 4; i++) R(ctx, px + n(i) * u, py + n(i + 3) * u, u * 0.04, u * 0.04, shade(P.sand, -0.15)); break;
    case G.RAIL: {
      R(ctx, px, py, u, u, '#8a7a6a');
      for (let i = 0; i < 3; i++) R(ctx, px + (i + 0.15) * u / 3, py + u * 0.15, u * 0.12, u * 0.7, '#5a3a24');
      R(ctx, px, py + u * 0.3, u, u * 0.06, '#9aa0a8'); R(ctx, px, py + u * 0.64, u, u * 0.06, '#9aa0a8');
      break;
    }
    case G.DOCK: R(ctx, px, py, u, u, P.water); R(ctx, px + u * 0.05, py, u * 0.9, u, '#9c7a55'); for (let i = 1; i < 4; i++) R(ctx, px + u * 0.05, py + i * u / 4, u * 0.9, Math.max(1, u * 0.03), '#6e563c'); break;
    default: R(ctx, px, py, u, u, P.grass);
  }
}
function edges(ctx, px, py, u, nb, isOther, col) {
  const e = u * 0.1;
  ctx.fillStyle = rgba(col, 0.55);
  if (isOther(nb.n)) ctx.fillRect(px, py, u, e);
  if (isOther(nb.s)) ctx.fillRect(px, py + u - e, u, e);
  if (isOther(nb.w)) ctx.fillRect(px, py, e, u);
  if (isOther(nb.e)) ctx.fillRect(px + u - e, py, e, u);
}
function street(ctx, px, py, u, P, x, y, nb) {
  const ch = P.ch;
  R(ctx, px, py, u, u, P.street);
  if (ch === 2) { for (let i = 0; i < 3; i++) R(ctx, px + noise(x, y, i) * u, py + noise(x, y, i + 3) * u, u * 0.3, u * 0.05, shade(P.street, -0.2)); }
  else if (ch === 3) { for (let i = 0; i < 8; i++) ell(ctx, px + noise(x, y, i) * u, py + noise(x, y, i + 9) * u, u * 0.03, u * 0.03, shade(P.street, i % 2 ? -0.2 : 0.2)); }
  else if (ch === 4) { if (noise(x, y, 1) < 0.2) R(ctx, px + u * 0.2, py + u * 0.4, u * 0.3, u * 0.02, shade(P.street, -0.15)); }
  else if (ch === 5) {
    if ((x === 37 && y > 14) && y % 2) R(ctx, px + u - u * 0.04, py + u * 0.1, u * 0.08, u * 0.5, '#f4c542');
    if ((y === 13 || y === 20 || y === 27) && x % 2 && x !== 37 && x !== 38) R(ctx, px + u * 0.1, py + u - u * 0.04, u * 0.5, u * 0.08, '#f4c542');
  } else if (ch === 6) {
    ctx.strokeStyle = rgba('#000000', 0.18); ctx.lineWidth = Math.max(1, u * 0.025);
    for (let r = 0; r < 4; r++) { ctx.beginPath(); ctx.moveTo(px, py + r * u / 4); ctx.lineTo(px + u, py + r * u / 4); ctx.stroke(); for (let c = 0; c < 2; c++) { const xx = px + (c + (r % 2) * 0.5) * u / 2; ctx.beginPath(); ctx.moveTo(xx, py + r * u / 4); ctx.lineTo(xx, py + (r + 1) * u / 4); ctx.stroke(); } }
  }
  // Curb toward grass.
  const curb = (g) => g === G.GRASS || g === G.FOREST;
  if (ch >= 3) edges(ctx, px, py, u, nb, curb, ch >= 4 ? '#d8d4cc' : '#c8b898');
}

// ---------- buildings ----------
// The facade faces south; roof fills the upper part of the footprint.
export function drawBuilding(ctx, b, u, P) {
  const x = b.x * u, y = b.y * u, w = b.w * u, h = b.h * u;
  const dx = (b.door.x - b.x) * u;
  const f = BUILD[b.type] || BUILD.house;
  ctx.save();
  f(ctx, x, y, w, h, u, P, dx, b);
  ctx.restore();
}
function door(ctx, x, y, u, col, frame) { R(ctx, x + u * 0.22, y + u * 0.15, u * 0.56, u * 0.85, frame || OUT); R(ctx, x + u * 0.28, y + u * 0.2, u * 0.44, u * 0.8, col); ell(ctx, x + u * 0.62, y + u * 0.6, u * 0.035, u * 0.035, '#d9a23a'); }
function windows(ctx, x, y, w, rows, cols, u, glass, frame, skipX) {
  const ww = u * 0.42, wh = u * 0.5;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const cx = x + (c + 0.5) * w / cols - ww / 2;
    if (skipX != null && Math.abs(cx + ww / 2 - skipX) < u * 0.6 && r === rows - 1) continue;
    const cy = y + r * u * 0.85;
    R(ctx, cx - u * 0.05, cy - u * 0.05, ww + u * 0.1, wh + u * 0.1, frame);
    R(ctx, cx, cy, ww, wh, glass);
    R(ctx, cx + ww / 2 - u * 0.02, cy, u * 0.04, wh, frame);
    R(ctx, cx + u * 0.05, cy + u * 0.05, ww * 0.3, wh * 0.25, rgba('#ffffff', 0.25));
  }
}
export function signText(ctx, text, cx, cy, maxW, u, fg, bg, style) {
  if (!text) return;
  const fs = Math.round(u * 0.36);
  ctx.font = `bold ${fs}px ${style === 'deco' ? '"Century Gothic", Futura, "Trebuchet MS", sans-serif' : style === 'neon' ? '"Arial Black", Impact, sans-serif' : 'Georgia, "Times New Roman", serif'}`;
  let tw = ctx.measureText(text).width;
  const scale = Math.min(1, (maxW - u * 0.3) / tw);
  const bw = tw * scale + u * 0.3, bh = fs * 1.35;
  if (bg) { R(ctx, cx - bw / 2 - u * 0.04, cy - bh / 2 - u * 0.04, bw + u * 0.08, bh + u * 0.08, OUT); R(ctx, cx - bw / 2, cy - bh / 2, bw, bh, bg); }
  ctx.save(); ctx.translate(cx, cy); ctx.scale(scale, 1);
  ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  if (style === 'neon') { ctx.shadowColor = fg; ctx.shadowBlur = u * 0.25; }
  ctx.fillText(text, 0, fs * 0.05);
  ctx.restore();
}
function gable(ctx, x, y, w, rh, col, u, overhang = 0.15) {
  const o = u * overhang;
  poly(ctx, [[x - o, y + rh], [x + w / 2, y], [x + w + o, y + rh]], col, OUT, Math.max(1, u * 0.05));
  ctx.strokeStyle = shade(col, -0.25); ctx.lineWidth = Math.max(1, u * 0.03);
  for (let i = 1; i < 5; i++) { const yy = y + rh * i / 5; const half = (w / 2 + o) * i / 5; ctx.beginPath(); ctx.moveTo(x + w / 2 - half, yy); ctx.lineTo(x + w / 2 + half, yy); ctx.stroke(); }
}
function hip(ctx, x, y, w, rh, col, u) {
  poly(ctx, [[x - u * 0.15, y + rh], [x + u * 0.6, y], [x + w - u * 0.6, y], [x + w + u * 0.15, y + rh]], col, OUT, Math.max(1, u * 0.05));
  ctx.fillStyle = shade(col, -0.2);
  for (let i = 0; i < w / (u * 0.3); i++) ctx.fillRect(x + i * u * 0.3, y + rh * 0.55, Math.max(1, u * 0.04), rh * 0.4);
}
function wallFill(ctx, x, y, w, h, u, style, col) {
  R(ctx, x, y, w, h, col);
  ctx.fillStyle = shade(col, -0.18);
  if (style === 'log') for (let i = 0; i < h / (u * 0.25); i++) { ctx.fillRect(x, y + i * u * 0.25, w, Math.max(1, u * 0.04)); ell(ctx, x + u * 0.06, y + i * u * 0.25 + u * 0.12, u * 0.08, u * 0.1, shade(col, 0.15)); ell(ctx, x + w - u * 0.06, y + i * u * 0.25 + u * 0.12, u * 0.08, u * 0.1, shade(col, 0.15)); ctx.fillStyle = shade(col, -0.18); }
  else if (style === 'plank') for (let i = 0; i < w / (u * 0.22); i++) ctx.fillRect(x + i * u * 0.22, y, Math.max(1, u * 0.03), h);
  else if (style === 'clap') for (let i = 0; i < h / (u * 0.18); i++) ctx.fillRect(x, y + i * u * 0.18, w, Math.max(1, u * 0.03));
  else if (style === 'brick') { for (let r = 0; r < h / (u * 0.14); r++) { ctx.fillRect(x, y + r * u * 0.14, w, Math.max(1, u * 0.02)); for (let c = 0; c < w / (u * 0.3); c++) ctx.fillRect(x + (c + (r % 2) * 0.5) * u * 0.3, y + r * u * 0.14, Math.max(1, u * 0.02), u * 0.14); } }
  ctx.strokeStyle = OUT; ctx.lineWidth = Math.max(1, u * 0.05); ctx.strokeRect(x, y, w, h);
}
function yard(ctx, x, y, w, h, u, P) {
  // Small buildings sit in a fenced yard that fills the rest of their plot.
  ctx.strokeStyle = shade(P.wood, -0.2); ctx.lineWidth = Math.max(1, u * 0.06);
  ctx.beginPath(); ctx.moveTo(x + u * 0.2, y + h - u * 0.15); ctx.lineTo(x + u * 0.2, y + u * 0.4); ctx.lineTo(x + w - u * 0.2, y + u * 0.4); ctx.lineTo(x + w - u * 0.2, y + h - u * 0.15); ctx.stroke();
  for (let i = 0; i <= 8; i++) R(ctx, x + u * 0.15 + i * (w - u * 0.3) / 8, y + u * 0.3, u * 0.1, u * 0.25, P.woodDark);
}
const BUILD = {
  'farm-cabin': (ctx, x, y, w, h, u, P, dx) => { const rh = h * 0.42; wallFill(ctx, x + u * 0.2, y + rh, w - u * 0.4, h - rh, u, 'log', '#7a5634'); gable(ctx, x + u * 0.2, y, w - u * 0.4, rh, '#5a4330', u); R(ctx, x + w - u * 1.3, y + u * 0.1, u * 0.5, rh * 0.8, '#8a8478'); door(ctx, x + dx, y + h - u, u, '#5a3a22'); windows(ctx, x + u * 3, y + rh + u * 0.5, u * 2, 1, 1, u, '#3a4a40', OUT); },
  'farm-plank': (ctx, x, y, w, h, u, P, dx) => { const rh = h * 0.4; wallFill(ctx, x + u * 0.1, y + rh, w - u * 0.2, h - rh, u, 'plank', '#a58a64'); gable(ctx, x + u * 0.1, y, w - u * 0.2, rh, '#5a4330', u); R(ctx, x + u * 0.4, y + u * 0.1, u * 0.45, rh * 0.8, '#7a6a58'); door(ctx, x + dx, y + h - u, u, '#7a5a3a'); windows(ctx, x + u * 2.4, y + rh + u * 0.45, u * 3.2, 1, 2, u, '#3a4048', '#efe8da'); },
  'farm-brick': (ctx, x, y, w, h, u, P, dx) => { const rh = h * 0.38; wallFill(ctx, x + u * 0.1, y + rh, w - u * 0.2, h - rh, u, 'brick', '#a84a34'); hip(ctx, x + u * 0.1, y, w - u * 0.2, rh, '#4a3a34', u); R(ctx, x + w - u * 1.2, y, u * 0.45, rh * 0.7, '#8a3a2a'); door(ctx, x + dx, y + h - u, u, '#2a4a3a', '#e6d7b5'); windows(ctx, x + u * 2.3, y + rh + u * 0.4, u * 3.4, 1, 2, u, '#2b4c9b', '#e6d7b5'); },
  'farm-bungalow': (ctx, x, y, w, h, u, P, dx) => { const rh = h * 0.36; wallFill(ctx, x + u * 0.1, y + rh, w - u * 0.2, h - rh, u, 'clap', '#e8dcc0'); hip(ctx, x - u * 0.05, y + u * 0.1, w + u * 0.1, rh, '#6a4a3a', u); R(ctx, x + u * 0.1, y + h - u * 1.1, w - u * 0.2, u * 0.12, '#8a6a4a'); for (const px of [0.3, 2.3, 3.7, 5.6]) R(ctx, x + px * u, y + h - u * 1.1, u * 0.14, u * 1.05, '#f3e9d2'); door(ctx, x + dx, y + h - u, u, '#c8452b'); windows(ctx, x + u * 2.3, y + rh + u * 0.45, u * 3.4, 1, 2, u, '#1f2f5c', '#f3e9d2'); },
  'farm-ranch': (ctx, x, y, w, h, u, P, dx) => { const rh = h * 0.3; wallFill(ctx, x, y + rh, w, h - rh, u, 'clap', '#f4ecd8'); poly(ctx, [[x - u * 0.2, y + rh], [x + u * 0.5, y + u * 0.2], [x + w - u * 0.5, y + u * 0.2], [x + w + u * 0.2, y + rh]], '#3fbfb5', OUT, u * 0.05); R(ctx, x, y + rh + u * 0.6, w, u * 0.25, '#f26b5b'); door(ctx, x + dx, y + h - u, u, '#f4c542'); windows(ctx, x + u * 2.2, y + rh + u * 1.0, u * 3.6, 1, 2, u, '#34424a', '#ffffff'); },
  'farm-restored': (ctx, x, y, w, h, u, P, dx) => { const rh = h * 0.4; wallFill(ctx, x + u * 0.1, y + rh, w - u * 0.2, h - rh, u, 'clap', '#f6f3ec'); gable(ctx, x + u * 0.1, y, w - u * 0.2, rh, '#5a6a72', u); ctx.strokeStyle = '#8a9aa2'; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(x + u * 0.6 + i * u * 0.6, y + rh * 0.3); ctx.lineTo(x + u * 0.4 + i * u * 0.62, y + rh); ctx.stroke(); } door(ctx, x + dx, y + h - u, u, '#b5654a'); windows(ctx, x + u * 2.3, y + rh + u * 0.45, u * 3.4, 1, 2, u, '#183f63', '#f6f3ec'); },
  tent: (ctx, x, y, w, h, u, P, dx, b) => {
    yard(ctx, x, y, w, h, u, P);
    poly(ctx, [[x + u * 0.8, y + h - u * 0.6], [x + w / 2, y + u * 0.9], [x + w - u * 0.8, y + h - u * 0.6]], '#e8dcc0', OUT, u * 0.06);
    for (let i = 1; i < 4; i++) poly(ctx, [[x + w / 2, y + u * 0.9], [x + u * 0.8 + i * (w - u * 1.6) / 4 - u * 0.12, y + h - u * 0.6], [x + u * 0.8 + i * (w - u * 1.6) / 4 + u * 0.12, y + h - u * 0.6]], '#a9432c');
    poly(ctx, [[x + dx + u * 0.1, y + h - u * 0.6], [x + dx + u * 0.5, y + h - u * 1.5], [x + dx + u * 0.9, y + h - u * 0.6]], '#3a2a1a');
    for (const [cx, cw] of [[0.4, 0.7], [w / u - 1.2, 0.8]]) { R(ctx, x + cx * u, y + h - u * 0.95, cw * u, u * 0.6, '#8a6a3a'); ctx.strokeStyle = OUT; ctx.strokeRect(x + cx * u, y + h - u * 0.95, cw * u, u * 0.6); }
    if (b.label) signText(ctx, b.label, x + w / 2, y + u * 0.55, w * 0.7, u, '#2a2420', '#efe8da');
  },
  cabin: (ctx, x, y, w, h, u, P, dx) => { yard(ctx, x, y, w, h, u, P); const rh = u * 1.4, bx = x + u * 0.6, bw = w - u * 1.2; wallFill(ctx, bx, y + u * 0.9 + rh, bw, h - rh - u * 0.9, u, 'log', '#6a4a2c'); gable(ctx, bx, y + u * 0.9, bw, rh, '#4a3424', u); door(ctx, x + dx, y + h - u, u, '#3a2a1a'); },
  hut: (ctx, x, y, w, h, u, P, dx) => { yard(ctx, x, y, w, h, u, P); const bx = x + u * 1.0, bw = w - u * 2, by = y + u * 1.6; wallFill(ctx, bx, by + u, bw, h - u * 2.6, u, 'plank', '#9a8462'); poly(ctx, [[bx - u * 0.2, by + u * 1.1], [bx + bw + u * 0.2, by + u * 0.2], [bx + bw + u * 0.2, by + u * 1.1]], '#6a5a42', OUT, u * 0.05); door(ctx, x + dx, y + h - u, u, '#3a2a1a'); },
  plankbath: (ctx, x, y, w, h, u, P, dx, b) => { const rh = h * 0.32; wallFill(ctx, x + u * 0.1, y + rh, w - u * 0.2, h - rh, u, 'plank', '#b89a72'); gable(ctx, x + u * 0.1, y, w - u * 0.2, rh, '#6a5a48', u); door(ctx, x + dx, y + h - u, u, '#5a3a22'); windows(ctx, x + u * 0.1, y + rh + u * 1.0, w - u * 0.2, 1, 3, u, '#3a4048', '#efe8da', x + dx + u / 2); signText(ctx, b.label, x + w / 2, y + rh + u * 0.4, w * 0.8, u, '#2a2420', '#efe8da'); },
  plankstore: (ctx, x, y, w, h, u, P, dx, b) => { R(ctx, x + u * 0.2, y + u * 0.3, w - u * 0.4, u * 1.2, '#7a6248'); wallFill(ctx, x + u * 0.1, y + u * 1.0, w - u * 0.2, h - u * 1.0, u, 'plank', '#a58a64'); R(ctx, x, y + h - u * 1.6, w, u * 0.15, '#5a4330'); door(ctx, x + dx, y + h - u, u, '#5a3a22'); windows(ctx, x + u * 0.1, y + u * 2.3, w - u * 0.2, 1, 2, u, '#3a4048', '#efe8da'); signText(ctx, b.label, x + w / 2, y + u * 1.45, w * 0.86, u, '#2a2420', '#efe8da'); },
  plankhotel: (ctx, x, y, w, h, u, P, dx, b) => { const rh = h * 0.24; wallFill(ctx, x + u * 0.1, y + rh, w - u * 0.2, h - rh, u, 'clap', '#efe8da'); gable(ctx, x + u * 0.1, y, w - u * 0.2, rh, '#5a4330', u); windows(ctx, x + u * 0.1, y + rh + u * 0.3, w - u * 0.2, 2, 3, u, '#3a4048', '#7b6248', x + dx + u / 2); R(ctx, x, y + rh + u * 1.15, w, u * 0.12, '#7b6248'); door(ctx, x + dx, y + h - u, u, '#8e3b2b'); signText(ctx, b.label, x + w / 2, y + h - u * 1.55, w * 0.9, u, '#efe8da', '#8e3b2b'); },
  house: (ctx, x, y, w, h, u, P, dx) => { yard(ctx, x, y, w, h, u, P); const rh = u * 1.3, bx = x + u * 0.6, bw = w - u * 1.2, wallC = [, '#9a8462', '#c8b898', '#e6d7b5', '#f3e9d2', '#d9d4ca', '#e8d8c8'][P.ch]; wallFill(ctx, bx, y + u + rh, bw, h - rh - u, u, P.ch <= 2 ? 'plank' : 'clap', wallC); gable(ctx, bx, y + u, bw, rh, shade(P.roof, -0.1), u); door(ctx, x + dx, y + h - u, u, shade(P.trim, -0.4)); },
  ranchhouse: (ctx, x, y, w, h, u, P, dx) => { yard(ctx, x, y, w, h, u, P); const bx = x + u * 0.5, bw = w - u, by = y + u * 2; wallFill(ctx, bx, by, bw, h - u * 2, u, 'clap', '#f4ecd8'); poly(ctx, [[bx - u * 0.2, by], [bx + u * 0.4, by - u * 0.6], [bx + bw - u * 0.4, by - u * 0.6], [bx + bw + u * 0.2, by]], '#f26b5b', OUT, u * 0.05); door(ctx, x + dx, y + h - u, u, '#3fbfb5'); },
  brickbath: (ctx, x, y, w, h, u, P, dx, b) => { const rh = h * 0.3; wallFill(ctx, x + u * 0.1, y + rh, w - u * 0.2, h - rh, u, 'brick', '#e6d7b5'); hip(ctx, x + u * 0.1, y, w - u * 0.2, rh, '#a9432c', u); for (let i = 0; i < 3; i++) { const cx = x + (i + 0.5) * w / 3; ctx.fillStyle = OUT; ctx.beginPath(); ctx.arc(cx, y + rh + u * 1.6, u * 0.32, Math.PI, 0); ctx.fillRect(cx - u * 0.32, y + rh + u * 1.6, u * 0.64, u * 0.5); ctx.fill(); ctx.fillStyle = '#2b4c9b'; ctx.beginPath(); ctx.arc(cx, y + rh + u * 1.6, u * 0.26, Math.PI, 0); ctx.fill(); ctx.fillRect(cx - u * 0.26, y + rh + u * 1.6, u * 0.52, u * 0.44); ctx.fillStyle = '#d9a23a'; ctx.fillRect(cx - u * 0.26, y + rh + u * 1.38, u * 0.52, u * 0.06); } door(ctx, x + dx, y + h - u, u, '#4e7d5b', '#a9432c'); signText(ctx, b.label, x + w / 2, y + rh + u * 0.55, w * 0.85, u, '#d9a23a', '#1f2a24'); },
  brickstore: (ctx, x, y, w, h, u, P, dx, b) => { wallFill(ctx, x + u * 0.1, y + u * 0.6, w - u * 0.2, h - u * 0.6, u, 'brick', '#a84a34'); R(ctx, x, y + u * 0.4, w, u * 0.35, '#5a3a2a'); windows(ctx, x + u * 0.1, y + u * 1.6, w - u * 0.2, 1, 3, u, '#2b4c9b', '#e6d7b5'); for (let i = 0; i < 6; i++) R(ctx, x + i * w / 6, y + h - u * 1.55, w / 12, u * 0.4, i % 2 ? '#f2efe8' : '#4e7d5b'); door(ctx, x + dx, y + h - u, u, '#4e7d5b', '#e6d7b5'); signText(ctx, b.label, x + w / 2, y + u * 1.05, w * 0.9, u, '#f2efe8', '#1f2a24'); },
  grandhotel: (ctx, x, y, w, h, u, P, dx, b) => { const rh = h * 0.26; wallFill(ctx, x + u * 0.2, y + rh, w - u * 0.4, h - rh, u, 'brick', '#b85a3a'); hip(ctx, x + u * 0.2, y + u * 0.2, w - u * 0.4, rh, '#5a4c38', u); for (const tx of [x, x + w - u * 1.4]) { wallFill(ctx, tx, y + u * 0.3, u * 1.4, h - u * 0.3, u, 'brick', '#c86a44'); poly(ctx, [[tx - u * 0.1, y + u * 0.6], [tx + u * 0.7, y - u * 0.1], [tx + u * 1.5, y + u * 0.6]], '#4e7d5b', OUT, u * 0.05); } windows(ctx, x + u * 1.5, y + rh + u * 0.25, w - u * 3, 3, 6, u, '#2b4c9b', '#e6d7b5', x + dx + u / 2); R(ctx, x + u * 1.4, y + h - u * 1.35, w - u * 2.8, u * 0.18, '#1f2a24'); door(ctx, x + dx, y + h - u, u, '#4e7d5b', '#d9a23a'); signText(ctx, b.label, x + w / 2, y + rh - u * 0.2, w * 0.4, u, '#d9a23a', '#1f2a24'); },
  depot: (ctx, x, y, w, h, u, P, dx, b) => { const rh = h * 0.4; wallFill(ctx, x + u * 0.4, y + rh, w - u * 0.8, h - rh, u, 'clap', '#d8c098'); hip(ctx, x - u * 0.1, y + u * 0.3, w + u * 0.2, rh, '#6a3a2a', u); door(ctx, x + dx, y + h - u, u, '#4e7d5b'); windows(ctx, x + u * 0.4, y + rh + u * 0.8, w - u * 0.8, 1, 3, u, '#3a4048', '#6a3a2a', x + dx + u / 2); signText(ctx, b.label, x + w / 2, y + rh + u * 0.25, w * 0.7, u, '#1f2a24', '#f2efe8'); },
  mill: (ctx, x, y, w, h, u, P, dx, b) => { const rh = h * 0.38; wallFill(ctx, x + u * 0.3, y + rh, w - u * 0.5, h - rh, u, 'plank', '#9a7a5a'); gable(ctx, x + u * 0.3, y, w - u * 0.5, rh, '#5a4330', u); const cx = x - u * 0.2, cy = y + h * 0.6, r = u * 1.15; ctx.strokeStyle = '#4a3424'; ctx.lineWidth = u * 0.12; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.lineWidth = u * 0.08; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); ctx.stroke(); } door(ctx, x + dx, y + h - u, u, '#5a3a22'); signText(ctx, b.label, x + w / 2 + u * 0.1, y + rh + u * 0.45, w * 0.6, u, '#2a2420', '#efe8da'); },
  decobath: (ctx, x, y, w, h, u, P, dx, b) => { R(ctx, x + u * 0.1, y + u * 0.5, w - u * 0.2, u * 0.7, '#a9432c'); wallFill(ctx, x + u * 0.1, y + u * 1.1, w - u * 0.2, h - u * 1.1, u, 'stucco', '#f3e9d2'); for (let i = 0; i < 6; i++) poly(ctx, [[x + u * 0.1 + i * (w - u * 0.2) / 6, y + u * 1.6], [x + u * 0.1 + (i + 0.5) * (w - u * 0.2) / 6, y + u * 1.35], [x + u * 0.1 + (i + 1) * (w - u * 0.2) / 6, y + u * 1.6]], '#d4af37'); windows(ctx, x + u * 0.1, y + u * 2.2, w - u * 0.2, 1, 3, u, '#1f2f5c', '#c8452b', x + dx + u / 2); door(ctx, x + dx, y + h - u, u, '#1f2f5c', '#d4af37'); signText(ctx, b.label, x + w / 2, y + u * 0.85, w * 0.8, u, '#f3e9d2', null, 'deco'); },
  domebath: (ctx, x, y, w, h, u, P, dx, b) => { wallFill(ctx, x + u * 0.1, y + u * 1.4, w - u * 0.2, h - u * 1.4, u, 'stucco', '#f0e6d0'); ell(ctx, x + w / 2, y + u * 1.45, w * 0.32, u * 1.2, OUT); ell(ctx, x + w / 2, y + u * 1.45, w * 0.3, u * 1.12, '#2f7fc6'); for (let i = -2; i <= 2; i++) ell(ctx, x + w / 2 + i * u * 0.32, y + u * 1.0, u * 0.08, u * 0.08, '#d4af37'); R(ctx, x + u * 0.1, y + u * 1.4, w - u * 0.2, u * 0.25, '#c8452b'); windows(ctx, x + u * 0.1, y + u * 2.3, w - u * 0.2, 1, 3, u, '#1f2f5c', '#c8452b', x + dx + u / 2); door(ctx, x + dx, y + h - u, u, '#c8452b', '#d4af37'); signText(ctx, b.label, x + w / 2, y + u * 1.95, w * 0.6, u, '#1f2f5c', null, 'deco'); },
  club: (ctx, x, y, w, h, u, P, dx, b) => { wallFill(ctx, x + u * 0.1, y + u * 0.6, w - u * 0.2, h - u * 0.6, u, 'stucco', '#1a1826'); for (let i = 0; i < 5; i++) R(ctx, x + u * 0.1 + i * (w - u * 0.2) / 5, y + u * 0.6, Math.max(1, u * 0.03), h - u * 0.6, '#3a3850'); R(ctx, x + u * 0.1, y + u * 0.6, w - u * 0.2, u * 0.12, '#d4af37'); door(ctx, x + dx, y + h - u, u, '#7c5a2e', '#d4af37'); signText(ctx, b.label, x + w / 2, y + u * 1.6, w * 0.7, u, '#ff3b3b', null, 'neon'); signText(ctx, '★', x + w / 2, y + u * 2.5, u * 2, u, '#4fc3ff', null, 'neon'); },
  twinhotel: (ctx, x, y, w, h, u, P, dx, b) => { wallFill(ctx, x + u * 1.2, y + u * 1.4, w - u * 2.4, h - u * 1.4, u, 'brick', '#e8dcc0'); for (const tx of [x + u * 0.2, x + w - u * 2.6]) { wallFill(ctx, tx, y + u * 0.3, u * 2.4, h - u * 0.3, u, 'brick', '#f3e9d2'); R(ctx, tx + u * 0.3, y, u * 1.8, u * 0.35, '#c8452b'); R(ctx, tx + u * 0.6, y - u * 0.2, u * 1.2, u * 0.25, '#c8452b'); windows(ctx, tx + u * 0.1, y + u * 0.8, u * 2.2, 3, 2, u, '#1f2f5c', '#c8452b'); } windows(ctx, x + u * 2.6, y + u * 1.8, w - u * 5.2, 2, 4, u, '#1f2f5c', '#c8452b', x + dx + u / 2); R(ctx, x + u * 2.6, y + h - u * 1.4, w - u * 5.2, u * 0.2, '#1f2f5c'); door(ctx, x + dx, y + h - u, u, '#1f2f5c', '#d4af37'); signText(ctx, b.label, x + w / 2, y + u * 1.0, u * 2.6, u, '#1f2f5c', '#f6c933', 'deco'); },
  court: (ctx, x, y, w, h, u, P, dx, b) => { for (let i = 0; i < 4; i++) { const cx = x + u * 0.3 + i * u * 2.4, cy = y + u * 1.6; wallFill(ctx, cx, cy + u * 0.7, u * 1.9, u * 1.6, u, 'clap', '#f3e9d2'); gable(ctx, cx, cy, u * 1.9, u * 0.8, '#3c9a4a', u, 0.1); R(ctx, cx + u * 0.7, cy + u * 1.5, u * 0.5, u * 0.8, '#c8452b'); } R(ctx, x + dx + u * 0.45, y + u * 0.2, u * 0.12, h - u * 0.4, '#5a3a22'); signText(ctx, b.label, x + w / 2, y + u * 0.6, w * 0.6, u, '#1f2f5c', '#f6c933', 'deco'); door(ctx, x + dx, y + h - u, u, '#c8452b', '#f3e9d2'); },
  radio: (ctx, x, y, w, h, u, P, dx, b) => { wallFill(ctx, x + u * 0.3, y + u * 2.0, w - u * 0.6, h - u * 2.0, u, 'stucco', '#f3e9d2'); R(ctx, x + u * 0.3, y + u * 2.0, w - u * 0.6, u * 0.3, '#2f7fc6'); const mx = x + w - u * 1.1; ctx.strokeStyle = '#c8452b'; ctx.lineWidth = Math.max(1, u * 0.06); poly(ctx, [[mx - u * 0.4, y + u * 2.0], [mx, y + u * 0.05], [mx + u * 0.4, y + u * 2.0]], null, '#c8452b', u * 0.06); for (let i = 1; i < 6; i++) { const yy = y + u * 0.05 + i * u * 0.33, hw = u * 0.4 * i / 6; ctx.beginPath(); ctx.moveTo(mx - hw, yy); ctx.lineTo(mx + hw, yy); ctx.stroke(); } ell(ctx, mx, y + u * 0.05, u * 0.1, u * 0.1, '#ff3b3b'); windows(ctx, x + u * 0.3, y + u * 2.6, w - u * 0.6, 1, 2, u, '#1f2f5c', '#c8452b', x + dx + u / 2); door(ctx, x + dx, y + h - u, u, '#2f7fc6'); signText(ctx, b.label, x + u * 1.6, y + u * 1.4, u * 2.6, u, '#f6c933', '#1f2f5c', 'deco'); },
  modernstore: (ctx, x, y, w, h, u, P, dx, b) => { wallFill(ctx, x + u * 0.1, y + u * 0.8, w - u * 0.2, h - u * 0.8, u, 'stucco', P.ch === 6 ? '#b5654a' : '#d9d4ca'); R(ctx, x, y + u * 0.6, w, u * 0.3, P.ch === 6 ? '#183f63' : '#34424a'); R(ctx, x + u * 0.3, y + u * 2.0, w - u * 0.6, u * 1.2, P.ch === 6 ? '#183f63' : '#8fd0e8'); for (let i = 0; i < 6; i++) R(ctx, x + i * w / 6, y + u * 1.6, w / 12, u * 0.35, i % 2 ? '#ffffff' : P.ch === 6 ? '#f2a541' : '#f26b5b'); door(ctx, x + dx, y + h - u, u, '#8fd0e8', '#34424a'); signText(ctx, b.label, x + w / 2, y + u * 1.2, w * 0.92, u, P.ch === 6 ? '#f6f3ec' : '#222222', P.ch === 6 ? '#183f63' : '#f4c542', 'deco'); },
  drivein: (ctx, x, y, w, h, u, P, dx, b) => { R(ctx, x + u * 0.5, y + u * 2.2, w - u, h - u * 2.2, '#f4ecd8'); ctx.strokeStyle = OUT; ctx.lineWidth = u * 0.05; ctx.strokeRect(x + u * 0.5, y + u * 2.2, w - u, h - u * 2.2); poly(ctx, [[x, y + u * 2.3], [x + u * 0.5, y + u * 1.4], [x + w - u * 0.5, y + u * 1.4], [x + w, y + u * 2.3]], '#f26b5b', OUT, u * 0.05); for (let i = 0; i < 5; i++) R(ctx, x + u * 0.6 + i * (w - u * 1.2) / 5, y + u * 1.6, (w - u * 1.2) / 10, u * 0.6, '#ffffff'); R(ctx, x + u * 0.8, y + u * 2.7, w - u * 1.6, u * 0.9, '#8fd0e8'); poly(ctx, [[x + u * 0.4, y + u * 0.2], [x + w - u * 1, y + u * 0.2], [x + w - u * 0.4, y + u * 0.7], [x + w - u * 1, y + u * 1.2], [x + u * 0.4, y + u * 1.2]], '#3fbfb5', OUT, u * 0.05); signText(ctx, b.label, x + w / 2 - u * 0.3, y + u * 0.7, w * 0.75, u, '#fff6e0', null, 'neon'); door(ctx, x + dx, y + h - u, u, '#f4c542'); },
  motel: (ctx, x, y, w, h, u, P, dx, b) => { R(ctx, x + u * 1.5, y, w - u * 3, h - u * 1.3, '#d9d4ca'); ctx.strokeStyle = OUT; ctx.lineWidth = u * 0.06; ctx.strokeRect(x + u * 1.5, y, w - u * 3, h - u * 1.3); for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) { const wx = x + u * 1.7 + c * (w - u * 3.4) / 7, wy = y + u * 0.25 + r * u * 0.85; R(ctx, wx, wy, (w - u * 3.4) / 7 - u * 0.1, u * 0.55, c % 2 ? '#3fbfb5' : '#34424a'); R(ctx, wx, wy + u * 0.55, (w - u * 3.4) / 7 - u * 0.1, u * 0.12, '#ffffff'); } R(ctx, x, y + h - u * 1.4, w, u * 0.3, '#f26b5b'); for (let i = 0; i < 6; i++) R(ctx, x + u * 0.2 + i * (w - u * 0.4) / 5, y + h - u * 1.1, u * 0.12, u * 1.1, '#d9d4ca'); R(ctx, x + w - u * 1.4, y + u * 0.4, u * 1.1, u * 2.4, '#f4c542'); ctx.strokeRect(x + w - u * 1.4, y + u * 0.4, u * 1.1, u * 2.4); ctx.save(); ctx.translate(x + w - u * 0.85, y + u * 1.6); ctx.rotate(-Math.PI / 2); signText(ctx, 'MOTEL', 0, 0, u * 2.2, u, '#f26b5b', null, 'neon'); ctx.restore(); door(ctx, x + dx, y + h - u, u, '#3fbfb5'); signText(ctx, b.label, x + w / 2, y + h - u * 1.25, u * 3.2, u, '#222222', '#fff6e0', 'deco'); },
  barn: (ctx, x, y, w, h, u, P, dx, b) => { const rh = h * 0.42; wallFill(ctx, x + u * 0.3, y + rh, w - u * 0.6, h - rh, u, 'plank', '#c8452b'); poly(ctx, [[x, y + rh], [x + u * 1.6, y + u * 0.6], [x + w / 2, y], [x + w - u * 1.6, y + u * 0.6], [x + w, y + rh]], '#5a5a62', OUT, u * 0.05); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = u * 0.08; ctx.strokeRect(x + dx - u * 0.6, y + h - u * 1.6, u * 2.2, u * 1.6); door(ctx, x + dx, y + h - u, u, '#8a2a1a', '#ffffff'); signText(ctx, b.label, x + w / 2, y + rh + u * 0.5, w * 0.6, u, '#222222', '#f4c542', 'deco'); },
  restored: (ctx, x, y, w, h, u, P, dx, b) => { R(ctx, x + u * 0.1, y + u * 0.5, w - u * 0.2, u * 0.7, '#a9432c'); wallFill(ctx, x + u * 0.1, y + u * 1.1, w - u * 0.2, h - u * 1.1, u, 'brick', '#e6d7b5'); windows(ctx, x + u * 0.1, y + u * 2.1, w - u * 0.2, 1, 3, u, '#183f63', '#4e7d5b', x + dx + u / 2); R(ctx, x + u * 0.2, y + h - u * 1.25, w - u * 0.4, u * 0.12, '#4e7d5b'); door(ctx, x + dx, y + h - u, u, '#4e7d5b', '#d9a23a'); signText(ctx, b.label, x + w / 2, y + u * 1.6, w * 0.88, u, '#f6f3ec', '#183f63'); },
  restoreddome: (ctx, x, y, w, h, u, P, dx, b) => { BUILD.domebath(ctx, x, y, w, h, u, P, dx, { label: '' }); signText(ctx, b.label, x + w / 2, y + u * 1.95, w * 0.6, u, '#f6f3ec', '#183f63'); },
  market: (ctx, x, y, w, h, u, P, dx, b) => { R(ctx, x, y + u * 1.5, w, h - u * 1.5, '#c8bba0'); for (let i = 0; i < 4; i++) { const sx = x + u * 0.3 + i * u * 2.4; poly(ctx, [[sx, y + u * 1.6], [sx + u * 1.0, y + u * 0.9], [sx + u * 2.0, y + u * 1.6]], i % 2 ? '#f2a541' : '#4c8fa8', OUT, u * 0.04); R(ctx, sx + u * 0.1, y + u * 2.4, u * 1.8, u * 0.6, '#9c7a55'); for (let k = 0; k < 4; k++) ell(ctx, sx + u * 0.35 + k * u * 0.42, y + u * 2.35, u * 0.14, u * 0.12, ['#d8402a', '#e8c84a', '#4a8a3a', '#b5568f'][(i + k) % 4]); } ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = Math.max(1, u * 0.03); ctx.beginPath(); ctx.moveTo(x, y + u * 0.7); for (let i = 0; i <= 10; i++) ctx.lineTo(x + i * w / 10, y + u * (0.7 + (i % 2) * 0.18)); ctx.stroke(); for (let i = 0; i <= 10; i++) ell(ctx, x + i * w / 10, y + u * (0.72 + (i % 2) * 0.18), u * 0.06, u * 0.06, '#f6e8a0'); signText(ctx, b.label, x + w / 2, y + u * 0.35, w * 0.6, u, '#183f63', '#f2a541'); },
};
BUILD.stucco = BUILD.house;

// ---------- people ----------
export function drawPerson(ctx, look, face, frame, u) {
  const cx = u / 2, by = u * 1.5;
  const skin = SKINS[look.skin ?? 1];
  const lw = Math.max(1, u * 0.05);
  ell(ctx, cx, by - u * 0.06, u * 0.3, u * 0.09, 'rgba(0,0,0,0.28)');
  const step = frame ? u * 0.07 : 0;
  ctx.lineWidth = lw; ctx.strokeStyle = OUT;
  // legs
  for (const [lx, off] of [[-0.14, step], [0.04, -step]]) { ctx.fillStyle = look.pants; ctx.fillRect(cx + lx * u, by - u * 0.42 + Math.max(0, off), u * 0.12, u * 0.36 - Math.abs(off)); ctx.strokeRect(cx + lx * u, by - u * 0.42 + Math.max(0, off), u * 0.12, u * 0.36 - Math.abs(off)); }
  // body
  ctx.fillStyle = look.shirt; rr(ctx, cx - u * 0.24, by - u * 0.86, u * 0.48, u * 0.5, u * 0.1); ctx.fill(); ctx.stroke();
  // arms
  ctx.fillStyle = look.shirt;
  const sw = frame ? u * 0.05 : 0;
  rr(ctx, cx - u * 0.33, by - u * 0.82 - sw, u * 0.11, u * 0.36, u * 0.05); ctx.fill(); ctx.stroke();
  rr(ctx, cx + u * 0.22, by - u * 0.82 + sw, u * 0.11, u * 0.36, u * 0.05); ctx.fill(); ctx.stroke();
  ell(ctx, cx - u * 0.275, by - u * 0.44 - sw, u * 0.055, u * 0.055, skin); ell(ctx, cx + u * 0.275, by - u * 0.44 + sw, u * 0.055, u * 0.055, skin);
  // head
  const hy = by - u * 1.08;
  ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(cx, hy, u * 0.22, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  // hair
  ctx.fillStyle = look.hair;
  if (face === 'up') { ctx.beginPath(); ctx.arc(cx, hy, u * 0.22, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }
  else { ctx.beginPath(); ctx.arc(cx, hy - u * 0.02, u * 0.22, Math.PI * 1.02, Math.PI * 1.98); ctx.fill(); }
  if (look.beard && face !== 'up') { ctx.fillStyle = look.hair; ctx.beginPath(); ctx.arc(cx, hy + u * 0.07, u * 0.16, 0.1, Math.PI - 0.1); ctx.fill(); }
  // face
  if (face !== 'up') {
    ctx.fillStyle = OUT;
    const ex = face === 'left' ? -0.08 : face === 'right' ? 0.08 : 0;
    if (face === 'down') { ell(ctx, cx - u * 0.08, hy + u * 0.02, u * 0.03, u * 0.035, OUT); ell(ctx, cx + u * 0.08, hy + u * 0.02, u * 0.03, u * 0.035, OUT); }
    else ell(ctx, cx + ex * u * 1.3, hy + u * 0.02, u * 0.03, u * 0.035, OUT);
    if (look.glasses) { ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = Math.max(1, u * 0.025); if (face === 'down') { ctx.strokeRect(cx - u * 0.14, hy - u * 0.02, u * 0.11, u * 0.08); ctx.strokeRect(cx + u * 0.03, hy - u * 0.02, u * 0.11, u * 0.08); } else ctx.strokeRect(cx + ex * u * 1.3 - u * 0.06, hy - u * 0.02, u * 0.11, u * 0.08); }
  }
  hat(ctx, look.hat, cx, hy, u, look);
}
function hat(ctx, kind, cx, hy, u) {
  ctx.strokeStyle = OUT; ctx.lineWidth = Math.max(1, u * 0.04);
  const C = { brim: '#5a4430', cap: '#2b4c9b', fedora: '#3a3434', bonnet: '#e8dcc8', toque: '#ffffff', scarf: '#a9432c', 'cap-fur': '#6a5038', helmet: '#f2a541' };
  if (kind === 'none' || !kind) return;
  ctx.fillStyle = C[kind];
  if (kind === 'brim' || kind === 'fedora') { ell(ctx, cx, hy - u * 0.12, u * 0.33, u * 0.08, C[kind]); ctx.fillStyle = C[kind]; rr(ctx, cx - u * 0.17, hy - u * 0.36, u * 0.34, u * 0.24, u * 0.06); ctx.fill(); ctx.stroke(); if (kind === 'fedora') R(ctx, cx - u * 0.17, hy - u * 0.2, u * 0.34, u * 0.05, '#8a2a2a'); }
  else if (kind === 'cap' || kind === 'helmet') { ctx.beginPath(); ctx.arc(cx, hy - u * 0.06, u * 0.23, Math.PI, 0); ctx.fill(); ctx.stroke(); ell(ctx, cx + u * 0.12, hy - u * 0.06, u * 0.16, u * 0.05, shade(C[kind], -0.2)); }
  else if (kind === 'bonnet' || kind === 'scarf') { ctx.beginPath(); ctx.arc(cx, hy - u * 0.02, u * 0.26, Math.PI * 0.95, Math.PI * 2.05); ctx.fill(); ctx.stroke(); }
  else if (kind === 'toque') { rr(ctx, cx - u * 0.17, hy - u * 0.5, u * 0.34, u * 0.36, u * 0.12); ctx.fill(); ctx.stroke(); }
  else if (kind === 'cap-fur') { rr(ctx, cx - u * 0.22, hy - u * 0.32, u * 0.44, u * 0.24, u * 0.1); ctx.fill(); ctx.stroke(); R(ctx, cx + u * 0.15, hy - u * 0.15, u * 0.1, u * 0.25, '#8a6a48'); }
}
export function personSprite(id, look, face, frame, u) {
  return cached(`p|${id}|${face}|${frame}|${u}`, u, u * 1.5, (ctx) => drawPerson(ctx, look, face, frame, u));
}

export function animalSprite(kind, face, u) {
  return cached(`a|${kind}|${face}|${u}`, u, u, (ctx) => {
    ctx.save(); if (face === 'left') { ctx.translate(u, 0); ctx.scale(-1, 1); }
    ctx.lineWidth = Math.max(1, u * 0.04); ctx.strokeStyle = OUT;
    ell(ctx, u * 0.5, u * 0.92, u * 0.32, u * 0.07, 'rgba(0,0,0,0.25)');
    if (kind === 'hen') { ell(ctx, u * 0.45, u * 0.62, u * 0.24, u * 0.2, '#f8f4ec'); ctx.stroke(); ell(ctx, u * 0.68, u * 0.42, u * 0.12, u * 0.12, '#f8f4ec'); ctx.stroke(); poly(ctx, [[u * 0.78, u * 0.42], [u * 0.9, u * 0.46], [u * 0.78, u * 0.5]], '#f4c542'); ell(ctx, u * 0.68, u * 0.3, u * 0.05, u * 0.05, '#d8302a'); ell(ctx, u * 0.71, u * 0.4, u * 0.02, u * 0.02, OUT); R(ctx, u * 0.4, u * 0.8, u * 0.03, u * 0.1, '#e09a2a'); R(ctx, u * 0.5, u * 0.8, u * 0.03, u * 0.1, '#e09a2a'); }
    else {
      const body = kind === 'cow' ? '#f4f2ec' : '#d8c0a0';
      for (const lx of [0.25, 0.38, 0.6, 0.72]) R(ctx, u * lx, u * 0.66, u * 0.07, u * 0.24, kind === 'cow' ? '#3a3a3a' : '#8a6a48');
      ell(ctx, u * 0.48, u * 0.56, u * 0.3, u * 0.17, body); ctx.stroke();
      if (kind === 'cow') { ell(ctx, u * 0.4, u * 0.52, u * 0.09, u * 0.07, '#2a2a2a'); ell(ctx, u * 0.58, u * 0.6, u * 0.07, u * 0.05, '#2a2a2a'); }
      ell(ctx, u * 0.8, u * 0.44, u * 0.12, u * 0.1, body); ctx.stroke();
      ell(ctx, u * 0.84, u * 0.42, u * 0.02, u * 0.02, OUT);
      if (kind === 'goat') { ctx.strokeStyle = '#6a5a4a'; ctx.beginPath(); ctx.moveTo(u * 0.76, u * 0.36); ctx.quadraticCurveTo(u * 0.7, u * 0.22, u * 0.64, u * 0.28); ctx.stroke(); }
      else { ell(ctx, u * 0.88, u * 0.5, u * 0.06, u * 0.04, '#e8b0a0'); }
    }
    ctx.restore();
  });
}

// ---------- plants and objects ----------
export function treeSprite(kind, P, u) {
  return cached(`t|${kind}|${P.ch}|${P.sea}|${u}`, u * 1.4, u * 2.2, (ctx) => {
    const cx = u * 0.7, by = u * 2.15;
    ell(ctx, cx, by - u * 0.08, u * 0.45, u * 0.12, 'rgba(0,0,0,0.25)');
    R(ctx, cx - u * 0.08, by - u * 0.75, u * 0.16, u * 0.7, '#5a3a22');
    ctx.lineWidth = Math.max(1, u * 0.04); ctx.strokeStyle = OUT;
    if (kind === 'pine') {
      for (let i = 0; i < 3; i++) { const t = by - u * (0.55 + i * 0.45), hw = u * (0.6 - i * 0.14); poly(ctx, [[cx - hw, t], [cx, t - u * 0.75], [cx + hw, t]], i % 2 ? P.pine : shade(P.pine, 0.08), OUT, Math.max(1, u * 0.04)); }
    } else if (kind === 'magnolia') {
      ell(ctx, cx, by - u * 1.25, u * 0.6, u * 0.62, '#2a5a34'); ctx.stroke();
      if (P.sea === 'sp' || P.sea === 'su') for (let i = 0; i < 6; i++) ell(ctx, cx + Math.cos(i) * u * 0.35, by - u * 1.25 + Math.sin(i * 2) * u * 0.3, u * 0.08, u * 0.07, '#f8f4ec');
    } else {
      if (P.sea === 'wi') { ctx.strokeStyle = '#5a4a3a'; ctx.lineWidth = u * 0.06; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(cx, by - u * 0.7); ctx.lineTo(cx + (i - 2) * u * 0.25, by - u * (1.3 + (i % 2) * 0.35)); ctx.stroke(); } }
      else { for (const [ox, oy, r] of [[-0.25, 1.1, 0.4], [0.25, 1.1, 0.4], [0, 1.45, 0.45]]) { ell(ctx, cx + ox * u, by - oy * u, r * u, r * u * 0.9, P.oak); ctx.stroke(); } for (let i = 0; i < 4; i++) ell(ctx, cx + (i - 1.5) * u * 0.2, by - u * (1.2 + (i % 2) * 0.3), u * 0.08, u * 0.06, shade(P.oak, 0.2)); }
      if (P.sea === 'sp') for (let i = 0; i < 4; i++) ell(ctx, cx + (i - 1.5) * u * 0.25, by - u * (1.0 + (i % 2) * 0.5), u * 0.07, u * 0.06, P.flower);
    }
  });
}
export function objSprite(o, P, u) {
  const k = `o|${o.t}|${o.k || ''}|${P.ch}|${u}`;
  return cached(k, u, u * 1.5, (ctx) => {
    const by = u * 1.5, cx = u / 2;
    ctx.lineWidth = Math.max(1, u * 0.04); ctx.strokeStyle = OUT;
    switch (o.t) {
      case 'rock': ell(ctx, cx, by - u * 0.3, u * 0.4, u * 0.28, '#8a867c'); ctx.stroke(); ell(ctx, cx - u * 0.1, by - u * 0.4, u * 0.15, u * 0.08, '#aaa69c'); break;
      case 'outcrop': poly(ctx, [[u * 0.1, by - u * 0.1], [u * 0.25, by - u * 0.7], [u * 0.5, by - u * 0.9], [u * 0.7, by - u * 0.6], [u * 0.92, by - u * 0.1]], '#efeae2', OUT, u * 0.04); poly(ctx, [[u * 0.3, by - u * 0.15], [u * 0.45, by - u * 0.6], [u * 0.6, by - u * 0.15]], '#c99a92'); R(ctx, u * 0.6, by - u * 0.55, u * 0.12, u * 0.05, '#ffffff'); break;
      case 'crystal': for (const [ox, h, a] of [[-0.18, 0.7, -0.2], [0.05, 0.95, 0], [0.24, 0.6, 0.25]]) { ctx.save(); ctx.translate(cx + ox * u, by - u * 0.12); ctx.rotate(a); poly(ctx, [[-u * 0.09, 0], [-u * 0.09, -h * u * 0.75], [0, -h * u], [u * 0.09, -h * u * 0.75], [u * 0.09, 0]], '#e8f0f8', OUT, u * 0.04); R(ctx, -u * 0.03, -h * u * 0.7, u * 0.03, h * u * 0.5, '#ffffff'); ctx.restore(); } break;
      case 'stump': ell(ctx, cx, by - u * 0.25, u * 0.3, u * 0.16, '#6a4a2c'); ctx.stroke(); ell(ctx, cx, by - u * 0.3, u * 0.22, u * 0.1, '#c8a070'); break;
      case 'tuft': for (let i = 0; i < 5; i++) poly(ctx, [[cx + (i - 2) * u * 0.12, by - u * 0.12], [cx + (i - 2) * u * 0.16, by - u * (0.45 + (i % 2) * 0.15)], [cx + (i - 2) * u * 0.12 + u * 0.07, by - u * 0.12]], shade(P.grass, -0.25)); break;
      case 'fence': case 'pen': R(ctx, u * 0.1, by - u * 0.75, u * 0.12, u * 0.7, P.woodDark); R(ctx, u * 0.78, by - u * 0.75, u * 0.12, u * 0.7, P.woodDark); R(ctx, 0, by - u * 0.65, u, u * 0.1, P.wood); R(ctx, 0, by - u * 0.38, u, u * 0.1, P.wood); break;
      case 'chest': rr(ctx, u * 0.12, by - u * 0.7, u * 0.76, u * 0.6, u * 0.08); ctx.fillStyle = '#9a6a3a'; ctx.fill(); ctx.stroke(); R(ctx, u * 0.12, by - u * 0.5, u * 0.76, u * 0.06, '#5a3a22'); R(ctx, cx - u * 0.06, by - u * 0.55, u * 0.12, u * 0.14, '#d4af37'); break;
      case 'bin': rr(ctx, u * 0.06, by - u * 0.85, u * 0.88, u * 0.75, u * 0.06); ctx.fillStyle = '#8a6a3a'; ctx.fill(); ctx.stroke(); R(ctx, u * 0.02, by - u * 0.95, u * 0.96, u * 0.18, '#6a4a2a'); ctx.strokeRect(u * 0.02, by - u * 0.95, u * 0.96, u * 0.18); for (let i = 1; i < 4; i++) R(ctx, u * 0.06 + i * u * 0.22, by - u * 0.75, Math.max(1, u * 0.03), u * 0.6, '#6a4a2a'); signText(ctx, 'SHIP', cx, by - u * 0.45, u * 0.9, u * 0.7, '#f4f2ec', null); break;
      case 'trough': R(ctx, u * 0.04, by - u * 0.55, u * 0.92, u * 0.4, '#7a5a3a'); ctx.strokeRect(u * 0.04, by - u * 0.55, u * 0.92, u * 0.4); R(ctx, u * 0.1, by - u * 0.5, u * 0.8, u * 0.12, '#c8b070'); break;
      case 'sign': R(ctx, cx - u * 0.05, by - u * 0.9, u * 0.1, u * 0.85, P.woodDark); rr(ctx, u * 0.05, by - u * 1.25, u * 0.9, u * 0.5, u * 0.05); ctx.fillStyle = P.ch >= 3 ? '#5e4b3c' : '#9a7a5a'; ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ede3c8'; for (let i = 0; i < 3; i++) ctx.fillRect(u * 0.18, by - u * 1.15 + i * u * 0.12, u * 0.64, Math.max(1, u * 0.04)); break;
      case 'fund': rr(ctx, u * 0.15, by - u * 0.9, u * 0.7, u * 0.8, u * 0.06); ctx.fillStyle = '#183f63'; ctx.fill(); ctx.stroke(); R(ctx, u * 0.3, by - u * 0.8, u * 0.4, u * 0.05, '#f2a541'); signText(ctx, '$', cx, by - u * 0.45, u * 0.6, u, '#f2a541', null); break;
      case 'sprinkler': case 'drip': R(ctx, cx - u * 0.06, by - u * 0.5, u * 0.12, u * 0.4, '#6a6a72'); ell(ctx, cx, by - u * 0.55, u * 0.18, u * 0.08, o.t === 'drip' ? '#2a2a2a' : '#9a9aa2'); ctx.stroke(); ell(ctx, cx, by - u * 0.6, u * 0.06, u * 0.06, '#4fc3ff'); break;
      case 'hut': R(ctx, u * 0.05, by - u * 0.95, u * 0.9, u * 0.85, '#9a8462'); ctx.strokeRect(u * 0.05, by - u * 0.95, u * 0.9, u * 0.85); poly(ctx, [[-u * 0.05, by - u * 0.85], [cx, by - u * 1.45], [u * 1.05, by - u * 0.85]], '#6a5a42', OUT, u * 0.04); R(ctx, u * 0.38, by - u * 0.55, u * 0.24, u * 0.45, '#3a2a1a'); break;
      case 'stand': R(ctx, u * 0.04, by - u * 0.5, u * 0.92, u * 0.4, '#b0844a'); ctx.strokeRect(u * 0.04, by - u * 0.5, u * 0.92, u * 0.4); R(ctx, u * 0.08, by - u * 1.3, u * 0.08, u * 0.8, '#6a4a2a'); R(ctx, u * 0.84, by - u * 1.3, u * 0.08, u * 0.8, '#6a4a2a'); for (let i = 0; i < 4; i++) R(ctx, i * u / 4, by - u * 1.38, u / 4, u * 0.22, i % 2 ? '#ffffff' : '#f26b5b'); for (let i = 0; i < 4; i++) ell(ctx, u * 0.2 + i * u * 0.2, by - u * 0.55, u * 0.08, u * 0.07, ['#3a8a3a', '#f0d860', '#d84a4a', '#5a9a4a'][i]); break;
      case 'lamp': R(ctx, cx - u * 0.04, by - u * 1.4, u * 0.08, u * 1.3, '#2a2a2a'); ell(ctx, cx, by - u * 1.42, u * 0.12, u * 0.1, '#f4e8b0'); break;
    }
  });
}
// Crops: stage 0 seeds … 3 near ripe, 4 ripe (produce visible), -1 dead.
export function cropSprite(id, stage, u) {
  return cached(`c|${id}|${stage}|${u}`, u, u * 1.4, (ctx) => {
    const by = u * 1.3, cx = u / 2;
    const [shape, c1, c2] = CROPS[id].ic;
    ctx.lineWidth = Math.max(1, u * 0.035); ctx.strokeStyle = OUT;
    if (stage === -1) { ctx.strokeStyle = '#6a5030'; ctx.lineWidth = u * 0.06; ctx.beginPath(); ctx.moveTo(cx, by - u * 0.1); ctx.lineTo(cx - u * 0.1, by - u * 0.55); ctx.moveTo(cx, by - u * 0.3); ctx.lineTo(cx + u * 0.15, by - u * 0.45); ctx.stroke(); return; }
    if (stage === 0) { for (const ox of [-0.12, 0.1]) ell(ctx, cx + ox * u, by - u * 0.18, u * 0.05, u * 0.04, '#e8d8a8'); return; }
    const leaf = c2;
    const hgt = [0, 0.3, 0.55, 0.8, 0.95][stage];
    const tall = shape === 'cob' || shape === 'grain' || shape === 'cone';
    const H = (tall ? 1.15 : 0.75) * hgt * u;
    // stalk/leaves
    ctx.strokeStyle = shade(leaf, -0.25); ctx.lineWidth = Math.max(1, u * 0.05);
    ctx.beginPath(); ctx.moveTo(cx, by - u * 0.12); ctx.lineTo(cx, by - u * 0.12 - H); ctx.stroke();
    const leaves = 2 + stage;
    for (let i = 0; i < leaves; i++) {
      const t = (i + 1) / (leaves + 1), side = i % 2 ? 1 : -1;
      const ly = by - u * 0.12 - H * t;
      poly(ctx, [[cx, ly], [cx + side * u * (0.18 + 0.06 * stage), ly - u * 0.08], [cx + side * u * 0.08, ly + u * 0.04]], leaf, OUT, Math.max(1, u * 0.025));
    }
    if (stage < 4) return;
    const top = by - u * 0.12 - H;
    switch (shape) {
      case 'cob': for (const s of [-1, 1]) { ctx.save(); ctx.translate(cx + s * u * 0.1, top + H * 0.45); ctx.rotate(s * 0.4); ell(ctx, 0, 0, u * 0.07, u * 0.17, c1); ctx.stroke(); ctx.restore(); } break;
      case 'root': ell(ctx, cx, by - u * 0.16, u * 0.18, u * 0.1, c1); ctx.stroke(); break;
      case 'pod': for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(cx + (i - 1) * u * 0.16, top + H * (0.3 + i * 0.15)); ctx.rotate((i - 1) * 0.5); ell(ctx, 0, 0, u * 0.04, u * 0.13, c1); ctx.stroke(); ctx.restore(); } break;
      case 'gourd': ell(ctx, cx + u * 0.12, by - u * 0.22, u * 0.22, u * 0.15, c1); ctx.stroke(); break;
      case 'grain': for (let i = -1; i <= 1; i++) ell(ctx, cx + i * u * 0.1, top + u * 0.05, u * 0.05, u * 0.14, c1); break;
      case 'head': ell(ctx, cx, by - u * 0.28, u * 0.26, u * 0.2, c1); ctx.stroke(); ell(ctx, cx, by - u * 0.3, u * 0.12, u * 0.09, shade(c1, 0.2)); break;
      case 'round': R(ctx, cx + u * 0.22, top - u * 0.05, u * 0.05, H + u * 0.05, '#8a6a4a'); for (const [ox, oy] of [[-0.12, 0.3], [0.1, 0.5], [-0.05, 0.7]]) { ell(ctx, cx + ox * u, top + H * oy, u * 0.09, u * 0.09, c1); ctx.stroke(); } break;
      case 'berry': for (const [ox, oy] of [[-0.18, 0.75], [0.15, 0.6], [0, 0.85], [0.2, 0.9], [-0.1, 0.5]]) { ell(ctx, cx + ox * u, top + H * oy, u * 0.06, u * 0.06, c1); ctx.stroke(); } break;
      case 'pepper': for (const [ox, oy] of [[-0.14, 0.45], [0.12, 0.6], [0, 0.8]]) { ctx.save(); ctx.translate(cx + ox * u, top + H * oy); ell(ctx, 0, 0, u * 0.05, u * 0.12, c1); ctx.stroke(); ctx.restore(); } break;
      case 'nut': ell(ctx, cx, by - u * 0.3, u * 0.28, u * 0.18, shade(leaf, 0.1)); ctx.stroke(); for (let i = -1; i <= 1; i++) ell(ctx, cx + i * u * 0.14, by - u * 0.14, u * 0.06, u * 0.04, c1); break;
      case 'leaf': for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate(cx, by - u * 0.14); ctx.rotate((i - 2) * 0.45); ell(ctx, 0, -u * 0.25, u * 0.1, u * 0.24, c1); ctx.stroke(); ctx.restore(); } break;
      case 'melon': ell(ctx, cx, by - u * 0.25, u * 0.32, u * 0.2, c1); ctx.stroke(); ctx.strokeStyle = shade(c1, -0.3); for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.ellipse(cx + i * u * 0.1, by - u * 0.25, u * 0.03, u * 0.18, 0, 0, Math.PI * 2); ctx.stroke(); } break;
      case 'cone': R(ctx, cx + u * 0.18, top - u * 0.15, u * 0.05, H + u * 0.15, '#8a6a4a'); for (const [ox, oy] of [[-0.1, 0.3], [0.08, 0.5], [-0.06, 0.7]]) { ell(ctx, cx + ox * u, top + H * oy, u * 0.07, u * 0.1, c1); ctx.stroke(); } break;
      case 'flower': for (const ox of [-0.15, 0.15]) { R(ctx, cx + ox * u - u * 0.02, top + u * 0.1, u * 0.04, H * 0.6, shade(leaf, -0.2)); poly(ctx, [[cx + ox * u - u * 0.1, top + u * 0.12], [cx + ox * u - u * 0.1, top - u * 0.05], [cx + ox * u - u * 0.03, top + u * 0.03], [cx + ox * u, top - u * 0.08], [cx + ox * u + u * 0.03, top + u * 0.03], [cx + ox * u + u * 0.1, top - u * 0.05], [cx + ox * u + u * 0.1, top + u * 0.12]], c1, OUT, u * 0.03); } break;
    }
  });
}
export function soilSprite(state, u) {
  return cached(`s|${state}|${u}`, u, u, (ctx) => {
    const col = state === 2 ? '#4a3424' : '#7a5638';
    R(ctx, u * 0.04, u * 0.04, u * 0.92, u * 0.92, col);
    ctx.fillStyle = shade(col, -0.25);
    for (let i = 0; i < 3; i++) ctx.fillRect(u * 0.1, u * (0.22 + i * 0.25), u * 0.8, Math.max(1, u * 0.05));
    if (state === 2) { // droplet mark: watered is a shape, not only a color
      ctx.fillStyle = '#7ab8e0'; ctx.beginPath(); ctx.moveTo(u * 0.8, u * 0.12); ctx.quadraticCurveTo(u * 0.92, u * 0.3, u * 0.8, u * 0.34); ctx.quadraticCurveTo(u * 0.68, u * 0.3, u * 0.8, u * 0.12); ctx.fill();
    }
  });
}

// ---------- item icons (DOM and canvas) ----------
export function iconCanvas(id, px) {
  const it = ITEMS[id];
  const ic = it ? it.ic : ['bag', '#888', '#555'];
  return cached(`i|${id}|${px}`, px, px, (ctx) => drawIcon(ctx, ic, px, id));
}
const urlCache = new Map();
export function iconURL(id, px = 64) {
  const k = id + '|' + px;
  if (!urlCache.has(k)) urlCache.set(k, iconCanvas(id, px).toDataURL());
  return urlCache.get(k);
}
export function drawIcon(ctx, ic, s, id) {
  const [shape, c1 = '#888', c2 = '#555'] = ic;
  const u = s;
  ctx.lineWidth = Math.max(1, u * 0.05); ctx.strokeStyle = OUT; ctx.lineJoin = 'round';
  const handle = (x1, y1, x2, y2) => { ctx.strokeStyle = OUT; ctx.lineWidth = u * 0.13; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.strokeStyle = '#a8783a'; ctx.lineWidth = u * 0.08; ctx.stroke(); ctx.lineWidth = Math.max(1, u * 0.05); ctx.strokeStyle = OUT; };
  switch (shape) {
    case 'hoe': handle(u * 0.25, u * 0.85, u * 0.7, u * 0.2); poly(ctx, [[u * 0.6, u * 0.15], [u * 0.88, u * 0.25], [u * 0.85, u * 0.38], [u * 0.65, u * 0.3]], '#9aa0a8', OUT, u * 0.04); break;
    case 'axe': handle(u * 0.25, u * 0.88, u * 0.62, u * 0.2); poly(ctx, [[u * 0.5, u * 0.12], [u * 0.85, u * 0.22], [u * 0.82, u * 0.5], [u * 0.6, u * 0.35]], '#9aa0a8', OUT, u * 0.04); break;
    case 'pick': handle(u * 0.3, u * 0.88, u * 0.6, u * 0.25); ctx.strokeStyle = OUT; ctx.lineWidth = u * 0.12; ctx.beginPath(); ctx.moveTo(u * 0.25, u * 0.28); ctx.quadraticCurveTo(u * 0.6, u * 0.05, u * 0.9, u * 0.35); ctx.stroke(); ctx.strokeStyle = '#9aa0a8'; ctx.lineWidth = u * 0.07; ctx.stroke(); break;
    case 'scythe': handle(u * 0.25, u * 0.9, u * 0.55, u * 0.15); ctx.strokeStyle = OUT; ctx.lineWidth = u * 0.1; ctx.beginPath(); ctx.moveTo(u * 0.55, u * 0.15); ctx.quadraticCurveTo(u * 0.95, u * 0.2, u * 0.9, u * 0.55); ctx.stroke(); ctx.strokeStyle = '#c8ccd2'; ctx.lineWidth = u * 0.05; ctx.stroke(); break;
    case 'rod': ctx.strokeStyle = '#8a5a2a'; ctx.lineWidth = u * 0.06; ctx.beginPath(); ctx.moveTo(u * 0.15, u * 0.9); ctx.lineTo(u * 0.85, u * 0.12); ctx.stroke(); ctx.strokeStyle = '#e8e8e8'; ctx.lineWidth = Math.max(1, u * 0.02); ctx.beginPath(); ctx.moveTo(u * 0.85, u * 0.12); ctx.lineTo(u * 0.82, u * 0.6); ctx.stroke(); ell(ctx, u * 0.82, u * 0.65, u * 0.06, u * 0.06, '#e03a3a'); ell(ctx, u * 0.25, u * 0.78, u * 0.08, u * 0.08, '#5a5a5a'); break;
    case 'jug': rr(ctx, u * 0.2, u * 0.3, u * 0.55, u * 0.55, u * 0.15); ctx.fillStyle = '#9a6a4a'; ctx.fill(); ctx.stroke(); R(ctx, u * 0.38, u * 0.15, u * 0.2, u * 0.18, '#7a4a2a'); ctx.strokeRect(u * 0.38, u * 0.15, u * 0.2, u * 0.18); ctx.strokeStyle = OUT; ctx.lineWidth = u * 0.07; ctx.beginPath(); ctx.arc(u * 0.78, u * 0.55, u * 0.13, -1.4, 1.4); ctx.stroke(); ell(ctx, u * 0.47, u * 0.55, u * 0.1, u * 0.06, '#4fc3ff'); break;
    case 'log': ctx.save(); ctx.translate(u / 2, u / 2); ctx.rotate(-0.3); rr(ctx, -u * 0.38, -u * 0.15, u * 0.7, u * 0.3, u * 0.08); ctx.fillStyle = c1; ctx.fill(); ctx.stroke(); ell(ctx, u * 0.32, 0, u * 0.08, u * 0.15, '#d8b080'); ctx.stroke(); ctx.restore(); break;
    case 'stone': ell(ctx, u * 0.5, u * 0.58, u * 0.34, u * 0.26, c1); ctx.stroke(); ell(ctx, u * 0.4, u * 0.5, u * 0.12, u * 0.06, shade(c1, 0.3)); break;
    case 'shard': poly(ctx, [[u * 0.2, u * 0.8], [u * 0.35, u * 0.25], [u * 0.65, u * 0.15], [u * 0.8, u * 0.7]], c1, OUT, u * 0.05); poly(ctx, [[u * 0.4, u * 0.7], [u * 0.5, u * 0.3], [u * 0.62, u * 0.68]], c2); break;
    case 'crystal': for (const [ox, h] of [[-0.15, 0.55], [0.05, 0.75], [0.22, 0.5]]) poly(ctx, [[u * (0.42 + ox), u * 0.88], [u * (0.42 + ox), u * (0.88 - h * 0.8)], [u * (0.5 + ox), u * (0.88 - h)], [u * (0.58 + ox), u * (0.88 - h * 0.8)], [u * (0.58 + ox), u * 0.88]], c1, OUT, u * 0.04); break;
    case 'grain': for (let i = -1; i <= 1; i++) { ctx.strokeStyle = c2; ctx.lineWidth = u * 0.05; ctx.beginPath(); ctx.moveTo(u * 0.5, u * 0.9); ctx.lineTo(u * (0.5 + i * 0.18), u * 0.35); ctx.stroke(); ell(ctx, u * (0.5 + i * 0.2), u * 0.28, u * 0.08, u * 0.18, c1); } break;
    case 'bag': case 'seed': rr(ctx, u * 0.22, u * 0.25, u * 0.56, u * 0.62, u * 0.08); ctx.fillStyle = shape === 'seed' ? '#e8dcc0' : c1; ctx.fill(); ctx.stroke(); R(ctx, u * 0.28, u * 0.18, u * 0.44, u * 0.12, shape === 'seed' ? '#c8b898' : c2); if (shape === 'seed') { ell(ctx, u * 0.5, u * 0.58, u * 0.16, u * 0.16, c1); ctx.stroke(); ell(ctx, u * 0.5, u * 0.42, u * 0.06, u * 0.1, c2); } break;
    case 'gear': ctx.fillStyle = c1; ctx.beginPath(); for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, r = i % 2 ? u * 0.28 : u * 0.38; ctx.lineTo(u / 2 + Math.cos(a) * r, u / 2 + Math.sin(a) * r); } ctx.closePath(); ctx.fill(); ctx.stroke(); ell(ctx, u / 2, u / 2, u * 0.1, u * 0.1, c2); break;
    case 'bottle': rr(ctx, u * 0.3, u * 0.32, u * 0.4, u * 0.56, u * 0.1); ctx.fillStyle = c1; ctx.fill(); ctx.stroke(); R(ctx, u * 0.42, u * 0.14, u * 0.16, u * 0.2, c1); ctx.strokeRect(u * 0.42, u * 0.14, u * 0.16, u * 0.2); R(ctx, u * 0.32, u * 0.5, u * 0.36, u * 0.16, c2); break;
    case 'leaf': ctx.save(); ctx.translate(u / 2, u / 2); ctx.rotate(-0.6); ell(ctx, 0, 0, u * 0.18, u * 0.36, c1); ctx.stroke(); ctx.strokeStyle = c2; ctx.beginPath(); ctx.moveTo(0, -u * 0.3); ctx.lineTo(0, u * 0.4); ctx.stroke(); ctx.restore(); break;
    case 'nut': for (const [ox, oy] of [[-0.12, 0.05], [0.14, -0.02], [0.02, 0.18]]) { ell(ctx, u * (0.5 + ox), u * (0.55 + oy), u * 0.15, u * 0.13, c1); ctx.stroke(); ell(ctx, u * (0.5 + ox), u * (0.45 + oy), u * 0.13, u * 0.05, c2); } break;
    case 'berry': for (const [ox, oy] of [[-0.14, 0.05], [0.12, 0.0], [0, 0.18], [0.02, -0.12]]) { ell(ctx, u * (0.5 + ox), u * (0.55 + oy), u * 0.12, u * 0.12, c1); ctx.stroke(); } poly(ctx, [[u * 0.5, u * 0.3], [u * 0.65, u * 0.18], [u * 0.58, u * 0.34]], c2); break;
    case 'mushroom': R(ctx, u * 0.42, u * 0.5, u * 0.16, u * 0.35, '#e8dcc8'); ctx.strokeRect(u * 0.42, u * 0.5, u * 0.16, u * 0.35); ctx.fillStyle = c1; ctx.beginPath(); ctx.arc(u * 0.5, u * 0.52, u * 0.3, Math.PI, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); break;
    case 'egg': ell(ctx, u * 0.5, u * 0.55, u * 0.24, u * 0.3, c1); ctx.stroke(); break;
    case 'plank': for (let i = 0; i < 3; i++) { R(ctx, u * 0.15, u * (0.25 + i * 0.2), u * 0.7, u * 0.15, i % 2 ? c2 : c1); ctx.strokeRect(u * 0.15, u * (0.25 + i * 0.2), u * 0.7, u * 0.15); } break;
    case 'cup': rr(ctx, u * 0.25, u * 0.35, u * 0.45, u * 0.45, u * 0.08); ctx.fillStyle = c2; ctx.fill(); ctx.stroke(); ell(ctx, u * 0.47, u * 0.38, u * 0.2, u * 0.05, c1); ctx.lineWidth = u * 0.06; ctx.beginPath(); ctx.arc(u * 0.72, u * 0.55, u * 0.1, -1.4, 1.4); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = u * 0.03; ctx.beginPath(); ctx.moveTo(u * 0.4, u * 0.28); ctx.quadraticCurveTo(u * 0.35, u * 0.18, u * 0.45, u * 0.08); ctx.stroke(); break;
    case 'jar': rr(ctx, u * 0.27, u * 0.3, u * 0.46, u * 0.56, u * 0.1); ctx.fillStyle = c1; ctx.fill(); ctx.stroke(); R(ctx, u * 0.3, u * 0.2, u * 0.4, u * 0.14, '#d4af37'); ctx.strokeRect(u * 0.3, u * 0.2, u * 0.4, u * 0.14); R(ctx, u * 0.33, u * 0.5, u * 0.34, u * 0.18, c2); break;
    case 'wedge': poly(ctx, [[u * 0.15, u * 0.75], [u * 0.85, u * 0.75], [u * 0.85, u * 0.4], [u * 0.15, u * 0.55]], c1, OUT, u * 0.05); ell(ctx, u * 0.5, u * 0.62, u * 0.05, u * 0.05, c2); break;
    case 'basket': rr(ctx, u * 0.15, u * 0.45, u * 0.7, u * 0.4, u * 0.08); ctx.fillStyle = c1; ctx.fill(); ctx.stroke(); ctx.lineWidth = u * 0.06; ctx.beginPath(); ctx.arc(u * 0.5, u * 0.45, u * 0.3, Math.PI, 0); ctx.stroke(); ell(ctx, u * 0.4, u * 0.45, u * 0.1, u * 0.08, c2); break;
    case 'fence': R(ctx, u * 0.2, u * 0.25, u * 0.12, u * 0.6, c2); R(ctx, u * 0.68, u * 0.25, u * 0.12, u * 0.6, c2); R(ctx, u * 0.1, u * 0.38, u * 0.8, u * 0.1, c1); R(ctx, u * 0.1, u * 0.62, u * 0.8, u * 0.1, c1); break;
    case 'chest': rr(ctx, u * 0.15, u * 0.3, u * 0.7, u * 0.5, u * 0.08); ctx.fillStyle = c1; ctx.fill(); ctx.stroke(); R(ctx, u * 0.15, u * 0.46, u * 0.7, u * 0.06, '#5a3a22'); R(ctx, u * 0.45, u * 0.42, u * 0.1, u * 0.12, c2); break;
    case 'sprinkler': R(ctx, u * 0.45, u * 0.45, u * 0.1, u * 0.4, c1); ell(ctx, u * 0.5, u * 0.42, u * 0.22, u * 0.08, c1); ctx.stroke(); for (let i = -2; i <= 2; i++) ell(ctx, u * (0.5 + i * 0.15), u * (0.25 - Math.abs(i) * 0.03), u * 0.035, u * 0.05, c2); break;
    case 'hut': R(ctx, u * 0.2, u * 0.45, u * 0.6, u * 0.4, c1); ctx.strokeRect(u * 0.2, u * 0.45, u * 0.6, u * 0.4); poly(ctx, [[u * 0.1, u * 0.5], [u * 0.5, u * 0.15], [u * 0.9, u * 0.5]], c2, OUT, u * 0.04); break;
    case 'stand': R(ctx, u * 0.15, u * 0.55, u * 0.7, u * 0.3, '#b0844a'); ctx.strokeRect(u * 0.15, u * 0.55, u * 0.7, u * 0.3); for (let i = 0; i < 4; i++) R(ctx, u * (0.1 + i * 0.2), u * 0.2, u * 0.2, u * 0.15, i % 2 ? '#fff' : c1); R(ctx, u * 0.15, u * 0.35, u * 0.05, u * 0.2, '#6a4a2a'); R(ctx, u * 0.8, u * 0.35, u * 0.05, u * 0.2, '#6a4a2a'); break;
    case 'tub': ctx.fillStyle = c1; ctx.beginPath(); ctx.moveTo(u * 0.1, u * 0.4); ctx.lineTo(u * 0.9, u * 0.4); ctx.quadraticCurveTo(u * 0.88, u * 0.8, u * 0.5, u * 0.8); ctx.quadraticCurveTo(u * 0.12, u * 0.8, u * 0.1, u * 0.4); ctx.fill(); ctx.stroke(); ell(ctx, u * 0.25, u * 0.85, u * 0.08, u * 0.08, c2); ell(ctx, u * 0.75, u * 0.85, u * 0.08, u * 0.08, c2); break;
    case 'fish': ell(ctx, u * 0.45, u * 0.5, u * 0.3, u * 0.16, c1); ctx.stroke(); poly(ctx, [[u * 0.72, u * 0.5], [u * 0.92, u * 0.32], [u * 0.92, u * 0.68]], c2, OUT, u * 0.04); ell(ctx, u * 0.28, u * 0.46, u * 0.035, u * 0.035, OUT); R(ctx, u * 0.35, u * 0.48, u * 0.25, u * 0.04, rgba(c2, 0.6)); break;
    // crop shapes as icons
    case 'root': ell(ctx, u * 0.5, u * 0.62, u * 0.22, u * 0.26, c1); ctx.stroke(); for (const a of [-0.4, 0, 0.4]) { ctx.save(); ctx.translate(u * 0.5, u * 0.36); ctx.rotate(a); ell(ctx, 0, -u * 0.12, u * 0.06, u * 0.14, c2); ctx.restore(); } break;
    case 'cob': ctx.save(); ctx.translate(u / 2, u / 2); ctx.rotate(0.5); ell(ctx, 0, 0, u * 0.14, u * 0.34, c1); ctx.stroke(); ctx.fillStyle = shade(c1, -0.15); for (let i = -3; i <= 3; i++) ctx.fillRect(-u * 0.12, i * u * 0.08, u * 0.24, Math.max(1, u * 0.02)); poly(ctx, [[-u * 0.14, u * 0.1], [-u * 0.28, u * 0.42], [0, u * 0.3]], c2); ctx.restore(); break;
    case 'pod': for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(u * (0.32 + i * 0.18), u * 0.5); ctx.rotate(0.3); ell(ctx, 0, 0, u * 0.07, u * 0.28, c1); ctx.stroke(); ctx.restore(); } break;
    case 'gourd': ell(ctx, u * 0.5, u * 0.6, u * 0.3, u * 0.24, c1); ctx.stroke(); R(ctx, u * 0.46, u * 0.25, u * 0.08, u * 0.15, c2); break;
    case 'head': ell(ctx, u * 0.5, u * 0.55, u * 0.32, u * 0.28, c1); ctx.stroke(); ell(ctx, u * 0.5, u * 0.52, u * 0.16, u * 0.13, shade(c1, 0.25)); break;
    case 'round': ell(ctx, u * 0.5, u * 0.56, u * 0.3, u * 0.26, c1); ctx.stroke(); poly(ctx, [[u * 0.38, u * 0.32], [u * 0.5, u * 0.38], [u * 0.62, u * 0.32], [u * 0.5, u * 0.28]], c2); ell(ctx, u * 0.4, u * 0.48, u * 0.06, u * 0.04, rgba('#ffffff', 0.5)); break;
    case 'pepper': ctx.save(); ctx.translate(u / 2, u / 2); ctx.rotate(0.4); ell(ctx, 0, u * 0.05, u * 0.15, u * 0.3, c1); ctx.stroke(); R(ctx, -u * 0.04, -u * 0.32, u * 0.08, u * 0.12, c2); ctx.restore(); break;
    case 'melon': ell(ctx, u * 0.5, u * 0.55, u * 0.38, u * 0.28, c1); ctx.stroke(); ctx.strokeStyle = shade(c1, -0.35); for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.ellipse(u * (0.5 + i * 0.13), u * 0.55, u * 0.05, u * 0.26, 0, 0, Math.PI * 2); ctx.stroke(); } break;
    case 'cone': for (const [ox, oy] of [[0, 0], [-0.14, 0.18], [0.14, 0.15]]) { ell(ctx, u * (0.5 + ox), u * (0.45 + oy), u * 0.13, u * 0.2, c1); ctx.stroke(); } break;
    case 'flower': R(ctx, u * 0.47, u * 0.45, u * 0.06, u * 0.45, c2); poly(ctx, [[u * 0.3, u * 0.5], [u * 0.3, u * 0.18], [u * 0.42, u * 0.32], [u * 0.5, u * 0.12], [u * 0.58, u * 0.32], [u * 0.7, u * 0.18], [u * 0.7, u * 0.5]], c1, OUT, u * 0.04); break;
    default: ell(ctx, u / 2, u / 2, u * 0.3, u * 0.3, c1); ctx.stroke();
  }
}
