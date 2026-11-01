// Layered character sprites rendered in Blender (art-src/blender/characters.py): each atlas row is one
// layer in flat toon greys, each column one frame. A person is composed by multiply-tinting the skin, hair,
// shirt and trouser layers with their `look` colours, adding the fixed layer (eyes, shoes) and any overlays
// (hat, beard, glasses), then outlining the silhouette once. Pure canvas work; no pixel readback, so it runs
// from file:// as well as http.
export const CELL_W = 128;
export const CELL_H = 192;
export const DIRS = ['down', 'up', 'left'];
const PER_DIR = 7; // idle, walk 0-3, use 0-1
export const BASE_LAYERS = ['skin', 'hair', 'shirt', 'legs', 'fixed'];
export const OVERLAYS = ['hat-brim', 'hat-fedora', 'hat-cap', 'hat-helmet', 'hat-bonnet', 'hat-scarf', 'hat-toque', 'hat-capfur', 'beard', 'glasses'];
const HAT_ROW = { brim: 0, fedora: 1, cap: 2, helmet: 3, bonnet: 4, scarf: 5, toque: 6, 'cap-fur': 7 };
export const HAT_COL = { brim: '#7a5a38', cap: '#2b4c9b', fedora: '#3a3434', bonnet: '#c9ad7e', toque: '#f6f4ee', scarf: '#a9432c', 'cap-fur': '#6a5038', helmet: '#f2a541' };
const OUTLINE = '#2a1c14';

// frame: 'idle' | 'walk0'..'walk3' | 'use0' | 'use1'
export function cellIndex(face, frame) {
  const d = face === 'right' ? 2 : Math.max(0, DIRS.indexOf(face));
  const f = frame === 'idle' ? 0 : frame.startsWith('walk') ? 1 + (+frame[4] || 0) : 5 + (+frame[3] || 0);
  return d * PER_DIR + f;
}

function tintCell(out, img, row, col, color, tmp) {
  const t = tmp.getContext('2d');
  t.globalCompositeOperation = 'source-over';
  t.clearRect(0, 0, CELL_W, CELL_H);
  t.drawImage(img, col * CELL_W, row * CELL_H, CELL_W, CELL_H, 0, 0, CELL_W, CELL_H);
  if (color) {
    t.globalCompositeOperation = 'multiply'; t.fillStyle = color; t.fillRect(0, 0, CELL_W, CELL_H);
    t.globalCompositeOperation = 'destination-in';
    t.drawImage(img, col * CELL_W, row * CELL_H, CELL_W, CELL_H, 0, 0, CELL_W, CELL_H);
  }
  out.drawImage(tmp, 0, 0);
}

let tmpCanvas = null;
// Compose one person frame at full cell resolution. `imgs` = { trousers, dress, overlay } atlases.
export function composeCell(imgs, look, skinHex, face, frame) {
  const base = look.dress ? imgs.dress : imgs.trousers;
  const c = document.createElement('canvas'); c.width = CELL_W; c.height = CELL_H;
  const g = c.getContext('2d');
  if (!tmpCanvas) { tmpCanvas = document.createElement('canvas'); tmpCanvas.width = CELL_W; tmpCanvas.height = CELL_H; }
  const col = cellIndex(face, frame);
  const tints = { skin: skinHex, hair: look.hair, shirt: look.shirt, legs: look.pants, fixed: null };
  BASE_LAYERS.forEach((L, row) => tintCell(g, base, row, col, tints[L], tmpCanvas));
  if (look.beard) tintCell(g, imgs.overlay, 8, col, look.hair, tmpCanvas);
  if (look.glasses) tintCell(g, imgs.overlay, 9, col, null, tmpCanvas);
  if (look.hat && look.hat !== 'none' && HAT_ROW[look.hat] != null) tintCell(g, imgs.overlay, HAT_ROW[look.hat], col, look.hatColor || HAT_COL[look.hat], tmpCanvas);
  // Outline: the silhouette grown by ~2 px in the outline colour, under the figure (also fills layer seams).
  const o = document.createElement('canvas'); o.width = CELL_W; o.height = CELL_H;
  const og = o.getContext('2d');
  const r = 2.4;
  for (let a = 0; a < 8; a++) og.drawImage(c, Math.round(Math.cos(a * Math.PI / 4) * r), Math.round(Math.sin(a * Math.PI / 4) * r));
  og.drawImage(c, 0, 0);
  og.globalCompositeOperation = 'source-in'; og.fillStyle = OUTLINE; og.fillRect(0, 0, CELL_W, CELL_H);
  og.globalCompositeOperation = 'source-over'; og.drawImage(c, 0, 0);
  if (face === 'right') {
    const m = document.createElement('canvas'); m.width = CELL_W; m.height = CELL_H;
    const mg = m.getContext('2d'); mg.translate(CELL_W, 0); mg.scale(-1, 1); mg.drawImage(o, 0, 0);
    return m;
  }
  return o;
}

// ---------- pixel style ----------
// Pixel-art atlases (tools/pack-chars-px.py): each tinted layer is three binary mask rows (dark, mid, light), the
// fixed layer one row in its own colours, overlays three mask rows each. Each mask is filled with one colour of the
// person's ramp, so every sprite has a handful of deliberate colours instead of a multiply gradient.
const hsl = (hex) => {
  const n = parseInt(hex.slice(1), 16), r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  let h = 0; const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [(h * 60 + 360) % 360, s, l];
};
const hex = (h, s, l) => {
  s = Math.max(0, Math.min(1, s)); l = Math.max(0, Math.min(1, l));
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return '#' + [r, g, b].map((v) => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('');
};
// Toward a target hue by up to `by` degrees, the short way round.
const turn = (h, to, by) => { const d = ((to - h + 540) % 360) - 180; return (h + Math.sign(d) * Math.min(Math.abs(d), by) + 360) % 360; };
// [shadow, base, highlight]: shadows cooler and a little more saturated, highlights warmer (16-bit hue shifting).
export function ramp(col) {
  const [h, s, l] = hsl(col);
  return [hex(turn(h, 250, 14), s * 1.08 + 0.04, l * 0.64), col, hex(turn(h, 55, 10), s * 0.92, l + (1 - l) * 0.3)];
}
// Skin takes a gentler ramp: the general hue shift turns a skin shadow into a saturated red-brown smear down the
// side of the face.
function skinRamp(col) {
  const [h, s, l] = hsl(col);
  return [hex((h + 356) % 360, s * 0.85, l * 0.8), col, hex(turn(h, 55, 6), s * 0.9, l + (1 - l) * 0.22)];
}
const PX_OUTLINE = '#22160f';
let pxTmp = null;
// A layer's outline shade: well below its shadow, hue-turned the same way (research/pixel-tradeoffs.md §10: a
// darkened, hue-matched shade of the adjacent colour, never pure black).
function outlineOf(col) { const [h, s, l] = hsl(col); return hex(turn(h, 250, 20), Math.min(1, s * 1.1 + 0.05), Math.max(0.06, l * 0.34)); }
function fillMask(out, img, row, col, color, cw, ch, dx = 1, dy = 1) {
  if (!pxTmp || pxTmp.width !== cw || pxTmp.height !== ch) { pxTmp = document.createElement('canvas'); pxTmp.width = cw; pxTmp.height = ch; }
  const t = pxTmp.getContext('2d');
  t.globalCompositeOperation = 'source-over'; t.clearRect(0, 0, cw, ch);
  t.drawImage(img, col * cw, row * ch, cw, ch, 0, 0, cw, ch);
  if (color) { t.globalCompositeOperation = 'source-in'; t.fillStyle = color; t.fillRect(0, 0, cw, ch); }
  out.drawImage(pxTmp, dx, dy);
}
// Pixel atlases from art-src/blender/characters-px.py have 13 cells per direction: idle 0-1, walk 0-5, use 0-4
// (perDir 13); older ones the painted layout's 7. Frame names: 'idle' | 'idle1' | 'walkN' | 'useN'.
export function pxCellIndex(face, frame, perDir) {
  const d = face === 'right' ? 2 : Math.max(0, DIRS.indexOf(face));
  if (perDir !== 13) return cellIndex(face, frame.replace(/^idle1$/, 'idle').replace(/^walk([4-5])$/, (m, n) => 'walk' + (n - 4)).replace(/^use([2-4])$/, 'use1'));
  const n = +(frame.match(/\d+$/) || [0])[0];
  const f = frame.startsWith('idle') ? Math.min(1, n) : frame.startsWith('walk') ? 2 + (n % 6) : 8 + Math.min(4, n);
  return d * 13 + f;
}
// Garment overlay rows (after the 10 hats/beard/glasses rows): look.apron / vest / overalls are colours,
// look.ponytail takes the hair colour.
const GARMENT_ROW = { apron: 10, vest: 11, overalls: 12, ponytail: 13 };
// One person frame at native size plus a 1-px outline border: (cw + 2) x (ch + 2).
export function composePx(imgs, look, skinHex, face, frame, cw, ch, perDir = 7) {
  const base = look.dress ? imgs.dress : imgs.trousers, col = pxCellIndex(face, frame, perDir);
  const c = document.createElement('canvas'); c.width = cw + 2; c.height = ch + 2;
  const g = c.getContext('2d');
  // Each part: [atlas, first mask row, shades, colour]. Drawn in this order (later parts cover earlier ones).
  const parts = [skinHex, look.hair, look.shirt, look.pants].map((tint, L) => [base, L * 3, 3, tint || '#808080']);
  parts.push([base, 12, 1, null]);
  if (look.beard) parts.push([imgs.overlay, 24, 3, look.hair]);
  if (look.glasses) parts.push([imgs.overlay, 27, 3, '#3a3a40']);
  if (perDir === 13) for (const [k, row] of Object.entries(GARMENT_ROW)) if (look[k]) parts.push([imgs.overlay, row * 3, 3, k === 'ponytail' ? look.hair : look[k]]);
  if (look.hat && look.hat !== 'none' && HAT_ROW[look.hat] != null) parts.push([imgs.overlay, HAT_ROW[look.hat] * 3, 3, look.hatColor || HAT_COL[look.hat]]);
  // Outline first: every part's masks moved one pixel each way in that part's outline shade, so the outline
  // takes the hue of whatever it borders (the figure is drawn over the inner part afterwards).
  for (const [im, row, n, tint] of parts) {
    const oc = tint ? outlineOf(tint) : PX_OUTLINE;
    for (let s = 0; s < n; s++) for (const [dx, dy] of [[2, 1], [0, 1], [1, 2], [1, 0]]) fillMask(g, im, row + s, col, oc, cw, ch, dx, dy);
  }
  for (const [im, row, n, tint] of parts) { const rp = !tint ? null : im === base && row === 0 ? skinRamp(tint) : ramp(tint); for (let s = 0; s < n; s++) fillMask(g, im, row + s, col, rp ? rp[s] : null, cw, ch); }
  // Headwear sits on the brow: the face window (skin and eyes below the brow line, rows 13-16) is redrawn over the
  // hat, then beard and glasses over the face again.
  if (perDir === 13 && look.hat && HAT_ROW[look.hat] != null) {
    const sk = skinRamp(skinHex);
    for (let s = 0; s < 3; s++) fillMask(g, base, 13 + s, col, sk[s], cw, ch);
    fillMask(g, base, 16, col, null, cw, ch);
    for (const [im, row, n, tint] of parts) if (row === 24 || row === 27) { const rp = ramp(tint); for (let s = 0; s < n; s++) fillMask(g, im, row + s, col, rp[s], cw, ch); }
  }
  const o = c;
  if (face === 'right') {
    const m = document.createElement('canvas'); m.width = o.width; m.height = o.height;
    const mg = m.getContext('2d'); mg.translate(o.width, 0); mg.scale(-1, 1); mg.drawImage(o, 0, 0);
    return m;
  }
  return o;
}
