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
