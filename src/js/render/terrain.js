// Painted terrain. Each material is a tiling painted texture laid down as one smooth region per chunk:
// a field sampled every third of a tile (bilinear over the tile grid plus a little value noise) is
// contoured with marching squares, so creek banks, shorelines, paths and the tufa get natural edges
// while collision stays on whole tiles. The field is defined in world coordinates, so neighbouring
// chunks meet exactly. Used only when the painted textures have loaded; art.js draws the vector tiles
// otherwise.
import { W, H, G, CREEK, CULVERT_Y, culverted } from '../sim/world.js';
import { noise } from '../sim/rng.js';
import { img } from './assets.js';
import { rgba, mix, shade } from './palette.js';
import { cached } from './art.js';

const STEP = 1 / 3;
const lerp = (a, b, t) => a + (b - a) * t;
// Integer lattice hash for the value noise: the field sampling calls it hundreds of thousands of times per chunk
// bake, so it avoids the string-joining hash in rng.js (render-only; nothing in the simulation uses it).
function ih(x, y, k) {
  let h = Math.imul(x | 0, 0x27d4eb2d) ^ Math.imul(y | 0, 0x165667b1) ^ Math.imul(k | 0, 0x9e3779b1);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b); h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
export function vnoise(x, y, k) {
  const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  return lerp(lerp(ih(xi, yi, k), ih(xi + 1, yi, k), sx), lerp(ih(xi, yi + 1, k), ih(xi + 1, yi + 1, k), sx), sy);
}

// Texture name and repeat size (tiles) per ground material and chapter.
export const STREET_TEX = { 1: 'tex-path', 2: 'tex-road', 3: 'tex-gravel', 4: 'tex-brick', 5: 'tex-asphalt', 6: 'tex-pavers' };
const REPEAT = { 'tex-grass': 5, 'tex-forest': 5, 'tex-path': 3, 'tex-road': 4, 'tex-gravel': 3, 'tex-brick': 3, 'tex-asphalt': 4, 'tex-pavers': 2.5,
  'tex-flagstone': 3, 'tex-sand': 4, 'tex-clay': 4, 'tex-tufa': 4, 'tex-creek': 3, 'tex-lake': 6, 'tex-soil': 2, 'tex-soil-wet': 2, 'tex-snow': 4, 'tex-rock': 4 };
export const TERRAIN_TEX = Object.keys(REPEAT);
// The creek mouth: the strip of shore sand across the creek where it meets the lake is walkable (a plank crossing)
// but is drawn as water, so the creek runs on into the lake.
export function mouthAt(world, x, y) {
  if (!CREEK.includes(x) || y <= 0 || y >= H - 1) return false;
  const g = world.g, wet = (v) => v === G.WATER || v === G.DEEP;
  return g[y * W + x] === G.SAND && wet(g[(y - 1) * W + x]) && wet(g[(y + 1) * W + x]);
}
export const terrainReady = () => ['tex-grass', 'tex-forest', 'tex-path', 'tex-creek'].every((n) => img(n));

// A texture pre-scaled to its repeat size at this tile size, as a canvas pattern source.
export function texCanvas(name, u) {
  const im = img(name);
  if (!im) return null;
  const px = Math.max(8, Math.round((REPEAT[name] || 4) * u));
  return cached(`tex|${name}|${px}`, px, px, (g) => {
    // Halve in steps so the downscale stays sharp.
    let src = im, w = im.naturalWidth;
    while (w / 2 >= px) {
      const c = document.createElement('canvas'); c.width = c.height = Math.ceil(w / 2);
      const cg = c.getContext('2d'); cg.imageSmoothingQuality = 'high'; cg.drawImage(src, 0, 0, c.width, c.height); src = c; w = c.width;
    }
    g.imageSmoothingQuality = 'high'; g.drawImage(src, 0, 0, px, px);
  });
}
// A painted image scaled once to w x h px (halving first so the downscale stays sharp), or null until it loads.
export function paintedAt(name, w, h) {
  const im = img(name);
  if (!im) return null;
  w = Math.max(2, Math.round(w)); h = Math.max(2, Math.round(h));
  return cached(`pa|${name}|${w}x${h}`, w, h, (g) => {
    let src = im, sw = im.naturalWidth, sh = im.naturalHeight;
    while (sw / 2 >= w && sh / 2 >= h) {
      const c = document.createElement('canvas'); c.width = Math.ceil(sw / 2); c.height = Math.ceil(sh / 2);
      const cg = c.getContext('2d'); cg.imageSmoothingQuality = 'high'; cg.drawImage(src, 0, 0, c.width, c.height); src = c; sw = c.width; sh = c.height;
    }
    g.imageSmoothingQuality = 'high'; g.drawImage(src, 0, 0, w, h);
  });
}
const aspectOf = (name) => { const im = img(name); return im ? im.naturalHeight / im.naturalWidth : 1; };
// Names of the painted ground pieces baked into the chunks (their arrival triggers a rebake).
export const GROUND_ART = ['ground-culvert', 'ground-springbox', 'ground-soakpool'];

const patterns = new WeakMap();
export function pattern(ctx, name, u) {
  const c = texCanvas(name, u);
  if (!c) return null;
  let p = patterns.get(c);
  if (!p) { p = ctx.createPattern(c, 'repeat'); patterns.set(c, p); }
  return p;
}

// ---------- marching squares ----------
// mask(tx, ty) -> 0..1 for a tile; the field is bilinear between tile centres, plus noise of amplitude `amp`.
function sampleField(mask, x0, y0, n, amp, k) {
  const F = new Float32Array((n + 1) * (n + 1));
  const memo = new Map();
  const m = (tx, ty) => { const key = tx * 1000 + ty; let v = memo.get(key); if (v === undefined) { v = mask(Math.max(0, Math.min(W - 1, tx)), Math.max(0, Math.min(H - 1, ty))); memo.set(key, v); } return v; };
  for (let j = 0; j <= n; j++) for (let i = 0; i <= n; i++) {
    const px = x0 + i * STEP, py = y0 + j * STEP;
    const gx = px - 0.5, gy = py - 0.5, xi = Math.floor(gx), yi = Math.floor(gy);
    let fx = gx - xi, fy = gy - yi;
    fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
    const b = lerp(lerp(m(xi, yi), m(xi + 1, yi), fx), lerp(m(xi, yi + 1), m(xi + 1, yi + 1), fx), fy);
    let v = b - 0.5;
    // Noise only in the transition band, so it bends edges but never spawns islands or holes.
    if (amp) v += ((vnoise(px * 1.1, py * 1.1, k) - 0.5) * amp + (vnoise(px * 2.9, py * 2.9, k + 7) - 0.5) * amp * 0.45 + (vnoise(px * 0.28, py * 0.28, k + 13) - 0.5) * amp * 1.2) * Math.min(1, 6 * b * (1 - b));
    F[j * (n + 1) + i] = v;
  }
  return F;
}
// Returns { fill: Path2D of the inside, edge: Path2D of the iso line } in pixels (tile * u).
function contour(F, x0, y0, n, u) {
  const fill = new Path2D(), edge = new Path2D();
  const N = n + 1;
  const X = (i) => (x0 + i * STEP) * u, Y = (j) => (y0 + j * STEP) * u;
  for (let j = 0; j < n; j++) {
    let runStart = -1;
    for (let i = 0; i <= n; i++) {
      const a = i < n ? F[j * N + i] : -1, b = i < n ? F[j * N + i + 1] : -1, c = i < n ? F[(j + 1) * N + i + 1] : -1, d = i < n ? F[(j + 1) * N + i] : -1;
      const full = a > 0 && b > 0 && c > 0 && d > 0;
      if (full) { if (runStart < 0) runStart = i; continue; }
      if (runStart >= 0) { fill.rect(X(runStart), Y(j), X(i) - X(runStart), Y(j + 1) - Y(j)); runStart = -1; }
      if (i >= n) break;
      if (a <= 0 && b <= 0 && c <= 0 && d <= 0) continue;
      const pts = [], cross = [];
      const corners = [[X(i), Y(j), a], [X(i + 1), Y(j), b], [X(i + 1), Y(j + 1), c], [X(i), Y(j + 1), d]];
      for (let q = 0; q < 4; q++) {
        const [px, py, v] = corners[q], [nx, ny, w] = corners[(q + 1) % 4];
        if (v > 0) pts.push([px, py]);
        if ((v > 0) !== (w > 0)) { const t = v / (v - w); const p = [px + (nx - px) * t, py + (ny - py) * t]; pts.push(p); cross.push(p); }
      }
      if (pts.length > 2) { fill.moveTo(pts[0][0], pts[0][1]); for (let q = 1; q < pts.length; q++) fill.lineTo(pts[q][0], pts[q][1]); fill.closePath(); }
      for (let q = 0; q + 1 < cross.length; q += 2) { edge.moveTo(cross[q][0], cross[q][1]); edge.lineTo(cross[q + 1][0], cross[q + 1][1]); }
    }
  }
  return { fill, edge };
}
// A region straight from a continuous field f(px, py) (inside where f > 0), for soft natural patches.
function fieldRegion(x0, y0, n, u, f) {
  const F = new Float32Array((n + 1) * (n + 1));
  for (let j = 0; j <= n; j++) for (let i = 0; i <= n; i++) F[j * (n + 1) + i] = f(x0 + i * STEP, y0 + j * STEP);
  return contour(F, x0, y0, n, u);
}
function region(ctx, x0, y0, n, u, mask, amp, k) {
  return contour(sampleField(mask, x0, y0, n, amp, k), x0, y0, n, u);
}

// ---------- the chunk ----------
// ctx is translated so that world tile (x, y) is at pixel (x*u, y*u). Draws tiles [tx0, tx0+size) x [ty0, ty0+size).
export function bakeTerrain(ctx, world, tx0, ty0, size, u, P, opts = {}) {
  const g = world.g, ch = world.ch;
  const at = (x, y) => g[y * W + x];
  const lakeAt = (x, y) => world.lake[y * W + x];
  const M = 1; // margin tiles so strokes cross chunk borders cleanly
  const x0 = tx0 - M, y0 = ty0 - M, n = Math.round((size + 2 * M) / STEP);
  const R = (mask, amp, k) => region(ctx, x0, y0, n, u, mask, amp, k);
  const fillTex = (path, name, tint, tintA, mode = 'color') => {
    const p = pattern(ctx, name, u);
    if (!p) return false;
    ctx.fillStyle = p; ctx.fill(path);
    if (tint) { ctx.save(); ctx.globalCompositeOperation = mode; ctx.globalAlpha = tintA; ctx.fillStyle = tint; ctx.fill(path); ctx.restore(); }
    return true;
  };
  const stroke = (path, col, w, alpha = 1) => { ctx.save(); ctx.globalAlpha = alpha; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(path); ctx.restore(); };
  const px0 = tx0 * u, py0 = ty0 * u, pw = size * u;
  const winter = P.sea === 'wi';

  // 1. Grass everywhere, tinted to the era and season, with soft lighter and darker patches.
  ctx.fillStyle = pattern(ctx, 'tex-grass', u); ctx.fillRect(px0, py0, pw, pw);
  ctx.save(); ctx.globalCompositeOperation = 'color'; ctx.globalAlpha = winter ? 0.62 : 0.42; ctx.fillStyle = P.grass; ctx.fillRect(px0, py0, pw, pw); ctx.restore();
  // Lighter and darker meadow patches, drawn at an eighth of the resolution and scaled up: soft edges with no
  // blur filter (a filter pass over the whole chunk is the costliest thing a bake can do).
  {
    const q = 8, span = size + 2 * M, pc = lowres(Math.ceil(span * u / q)), pg = pc.getContext('2d');
    pg.setTransform(1, 0, 0, 1, 0, 0); pg.clearRect(0, 0, pc.width, pc.height); pg.translate(-x0 * u / q, -y0 * u / q);
    const a = fieldRegion(x0, y0, n, u / q, (px, py) => vnoise(px * 0.23, py * 0.23, 41) * 0.8 + vnoise(px * 0.9, py * 0.9, 42) * 0.2 - 0.6);
    pg.globalAlpha = 0.22; pg.fillStyle = shade(P.grass, -0.4); pg.fill(a.fill);
    const b = fieldRegion(x0, y0, n, u / q, (px, py) => vnoise(px * 0.2 + 9, py * 0.2, 47) * 0.8 + vnoise(px * 0.8, py * 0.8, 48) * 0.2 - 0.62);
    pg.globalAlpha = 0.18; pg.fillStyle = shade(P.grass, 0.4); pg.fill(b.fill);
    ctx.save(); ctx.imageSmoothingQuality = 'high'; ctx.drawImage(pc, x0 * u, y0 * u, pc.width * q, pc.height * q); ctx.restore();
  }

  // Farm field: from 1871 the field is worked land, so it reads as mown rows inside a darker margin.
  if (ch >= 2) fieldRows(ctx, world, u, P);
  decals(ctx, world, tx0, ty0, size, u, P);

  // 2. Forest floor and the ridge-top rock.
  const forest = R((x, y) => (at(x, y) === G.FOREST || at(x, y) === G.QUARRY ? 1 : 0), 0.7, 3);
  stroke(forest.edge, shade(P.forest, -0.25), u * 0.2, 0.18);
  fillTex(forest.fill, 'tex-forest', P.forest, winter ? 0.45 : 0.28);
  // The ridge stands above the valley: a rocky lip with a shadowed face along its foot.
  const ridge = R((x, y) => (y <= 6 && at(x, y) === G.FOREST ? 1 : 0), 0.7, 3);
  ctx.save(); ctx.translate(0, u * 0.22); stroke(ridge.edge, 'rgba(30,22,14,0.5)', u * 0.42); ctx.restore();
  ctx.save(); ctx.translate(0, u * 0.1); stroke(ridge.edge, '#6e5e48', u * 0.26, 0.9); ctx.restore();
  stroke(ridge.edge, '#a89a80', u * 0.07, 0.8);
  const rock = R((x, y) => (at(x, y) === G.ROCK ? 1 : 0), 0.6, 5);
  fillTex(rock.fill, 'tex-rock');
  stroke(rock.edge, '#3a3630', u * 0.06, 0.5);

  // 3. Paths and dirt, edged with a darker grass fringe.
  const path = R((x, y) => (at(x, y) === G.PATH || at(x, y) === G.DIRT || (at(x, y) === G.STREET && ch === 1) ? 1 : 0), 0.5, 7);
  stroke(path.edge, shade(P.grass, -0.45), u * 0.09, 0.35);
  fillTex(path.fill, 'tex-path', P.path, 0.25);
  stroke(path.edge, shade(P.path, 0.25), u * 0.03, 0.25);

  // 4. Streets: man-made, so straight edges (no noise) except the 1871 dirt road; a curb from 1886 on.
  if (ch > 1) {
    const st = R((x, y) => (at(x, y) === G.STREET ? 1 : 0), ch === 2 ? 0.3 : 0, 11);
    if (ch >= 3) stroke(st.edge, ch >= 4 ? '#d8d2c4' : '#b8aa8a', u * 0.2);
    if (ch >= 3) stroke(st.edge, '#5a5246', u * 0.04, 0.6);
    fillTex(st.fill, STREET_TEX[ch], ch === 2 ? '#8a6a52' : null, 0.45);
    if (ch === 2) stroke(st.edge, shade(P.grass, -0.45), u * 0.08, 0.3);
    const plaza = R((x, y) => (at(x, y) === G.PLAZA ? 1 : 0), 0, 13);
    stroke(plaza.edge, '#6a6256', u * 0.05, 0.5);
    fillTex(plaza.fill, ch >= 6 ? 'tex-pavers' : 'tex-flagstone');
    if (ch === 5) centreLines(ctx, world, tx0, ty0, size, u);
  }

  // 5. Sand (raw red clay on the new 1931 shore).
  const mouth = (x, y) => mouthAt(world, x, y);
  const sand = R((x, y) => (at(x, y) === G.SAND && !mouth(x, y) ? 1 : 0), 0.8, 23);
  fillTex(sand.fill, ch === 4 ? 'tex-clay' : 'tex-sand');

  // 6. The tufa slope: travertine, terraces and mineral streaks.
  const tufa = R((x, y) => (at(x, y) === G.TUFA || at(x, y) === G.POOL ? 1 : 0), 0.8, 19);
  stroke(tufa.edge, '#8a7a5a', u * 0.22, 0.35);
  if (fillTex(tufa.fill, 'tex-tufa', '#a8a296', 0.4)) {
    ctx.save(); ctx.clip(tufa.fill);
    // Porous grey tufa with creamy patches (the 1902 description), rust-coloured mineral stain and the algae runs.
    // They are painted at an eighth of the resolution and scaled up, and the grey is laid in three thresholds, so
    // every patch fades out instead of ending in a hard (or straight) edge. The terrace lips stay crisp on top.
    const q = 8, span = size + 2 * M, pc = lowres(Math.ceil(span * u / q)), pg = pc.getContext('2d');
    pg.setTransform(1, 0, 0, 1, 0, 0); pg.clearRect(0, 0, pc.width, pc.height); pg.setTransform(1 / q, 0, 0, 1 / q, -x0 * u / q, -y0 * u / q);
    pg.fillStyle = '#6e6c66';
    for (const t of [-0.08, 0, 0.08]) { pg.globalAlpha = 0.1; pg.fill(fieldRegion(x0, y0, n, u, (px, py) => vnoise(px * 0.6, py * 0.6, 61) - 0.52 - t).fill); }
    pg.globalAlpha = 1;
    stains(pg, world, tx0, ty0, size, u);
    algae(pg, world, u);
    ctx.save(); ctx.imageSmoothingQuality = 'high'; ctx.drawImage(pc, x0 * u, y0 * u, pc.width * q, pc.height * q); ctx.restore();
    terraces(ctx, world, tx0, ty0, size, u);
    ctx.restore();
  }

  // 7. Water: banks, then the lake and creek beds, depth, shallows and a foam line.
  const isW = (x, y) => (at(x, y) === G.WATER || at(x, y) === G.DEEP || at(x, y) === G.BRIDGE || at(x, y) === G.DOCK || mouth(x, y) ? 1 : 0);
  const water = R(isW, 0.6, 23);
  const bank = ch >= 4 && world.lake.some((v) => v) ? (ch === 4 ? '#9a4a2a' : '#8a6a44') : '#6a5034';
  stroke(water.edge, bank, u * 0.34, 0.85);
  stroke(water.edge, shade(bank, -0.3), u * 0.16, 0.6);
  fillTex(water.fill, 'tex-lake', P.water, 0.45);
  const creek = R((x, y) => (isW(x, y) && !lakeAt(x, y) ? 1 : 0), 0.6, 23);
  if (fillTex(creek.fill, 'tex-creek', P.water, 0.25)) {
    const deep = R((x, y) => (at(x, y) === G.DEEP ? 1 : 0), 0.9, 29);
    ctx.save(); ctx.globalAlpha = 0.38; ctx.fillStyle = shade(P.deep, -0.35); ctx.fill(deep.fill); ctx.restore();
    const deeper = R((x, y) => { let k = 0; for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) if (at(Math.max(0, Math.min(W - 1, x + i)), Math.max(0, Math.min(H - 1, y + j))) === G.DEEP) k++; return k >= 9 ? 1 : 0; }, 1.0, 31);
    ctx.save(); ctx.globalAlpha = 0.28; ctx.fillStyle = shade(P.deep, -0.5); ctx.fill(deeper.fill); ctx.restore();
    const jy = mouthY(world);
    if (jy) {
      // The creek bed turns into open lake water over its last four tiles: thin bands of the lake texture and its
      // tint, rising to full strength at the shore, so the creek ends in the lake's own colours with no edge.
      ctx.save(); ctx.clip(creek.fill);
      const lp = pattern(ctx, 'tex-lake', u), bx = x0 * u, bw = (size + 2 * M) * u;
      for (let i = 0; i <= 20; i++) {
        const a = Math.min(1, (i + 1) / 16), yb = (jy - 4 + i * 0.25) * u, bh = i === 20 ? u * 2 : u * 0.25 + 1;
        ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = a; ctx.fillStyle = lp; ctx.fillRect(bx, yb, bw, bh);
        ctx.globalCompositeOperation = 'color'; ctx.globalAlpha = a * 0.45; ctx.fillStyle = P.water; ctx.fillRect(bx, yb, bw, bh);
      }
      ctx.restore();
    }
    stroke(water.edge, '#cfe8e0', u * 0.22, 0.22);
    stroke(water.edge, '#ffffff', u * 0.035, 0.55);
  }
  if (culverted(ch) && tx0 - M <= CREEK[1] + 2 && tx0 + size + M >= CREEK[0] - 1 && ty0 - M <= CULVERT_Y + 2 && ty0 + size + M >= CULVERT_Y) culvert(ctx, u);

  // 8. Snow cover on snow days: a soft blanket that leaves water, streets and paths showing through at the edges.
  if (opts.snow) {
    const snow = R((x, y) => { const v = at(x, y); return v === G.GRASS || v === G.FOREST || v === G.TUFA || v === G.ROCK || v === G.SAND ? 1 : 0; }, 0.9, 37);
    ctx.save(); ctx.clip(snow.fill);
    ctx.globalAlpha = 0.95; ctx.fillStyle = pattern(ctx, 'tex-snow', u) || '#f4f6f8'; ctx.fillRect(px0, py0, pw, pw);
    ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = 0.5; ctx.fillStyle = '#ffffff'; ctx.fillRect(px0, py0, pw, pw);
    ctx.restore();
  }
}

// White broken centre lines on 1955 asphalt: the 1948 federal manual made white the centre-line colour; yellow
// centre lines between opposing traffic only became the rule in the 1971 edition.
function centreLines(ctx, world, tx0, ty0, size, u) {
  ctx.save(); ctx.fillStyle = '#eeebe2'; ctx.globalAlpha = 0.85;
  for (let y = ty0; y < ty0 + size; y++) for (let x = tx0; x < tx0 + size; x++) {
    if (x < 0 || y < 0 || x >= W || y >= H || world.g[y * W + x] !== G.STREET) continue;
    if (x === 37 && y > 14 && y % 2) ctx.fillRect((x + 1) * u - u * 0.05, (y + 0.15) * u, u * 0.1, u * 0.55);
    if ((y === 13 || y === 20 || y === 27) && x % 2 && x !== 37 && x !== 38) ctx.fillRect((x + 0.15) * u, (y + 1) * u - u * 0.05, u * 0.55, u * 0.1);
  }
  ctx.restore();
}

// Worked field: alternating mown rows and a darker headland margin round the farm field (FIELD in world.js).
function fieldRows(ctx, world, u, P) {
  const F = { x0: 2, y0: 15, x1: 20, y1: 31 };
  ctx.save();
  ctx.globalAlpha = 0.16; ctx.strokeStyle = shade(P.grass, -0.5); ctx.lineWidth = u * 0.5; ctx.lineJoin = 'round';
  ctx.strokeRect((F.x0 - 0.1) * u, (F.y0 - 0.1) * u, (F.x1 - F.x0 + 1.2) * u, (F.y1 - F.y0 + 1.2) * u);
  // Mown stripes: lighter and darker by the same amount, so the field reads as mown, not as a pale band.
  for (let y = F.y0; y <= F.y1; y++) {
    ctx.globalAlpha = 0.07; ctx.fillStyle = y % 2 ? shade(P.grass, 0.5) : shade(P.grass, -0.5);
    ctx.fillRect(F.x0 * u, y * u, (F.x1 - F.x0 + 1) * u, u);
  }
  ctx.restore();
}
// Small things in the grass that make it read as a meadow: wildflowers by season, fallen leaves in autumn,
// darker clover and the odd pebble. Baked with the chunk; purely visual.
const BLOOM = { sp: ['#f4f0e4', '#f2d24a', '#b67ad8', '#e88aa8'], su: ['#f2d24a', '#f4f0e4', '#e8803a'], fa: ['#d8a040', '#c8642a', '#9a4a2a'], wi: [] };
function decals(ctx, world, tx0, ty0, size, u, P) {
  const g = world.g, cols = BLOOM[P.sea] || [];
  for (let y = Math.max(0, ty0); y < Math.min(H, ty0 + size); y++) for (let x = Math.max(0, tx0); x < Math.min(W, tx0 + size); x++) {
    if (g[y * W + x] !== G.GRASS) continue;
    const n = (k) => noise(x, y, 500 + k);
    if (n(0) < 0.28) { // clover and grass blades
      ctx.fillStyle = rgba(shade(P.grass, -0.45), 0.35);
      for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse((x + n(i + 1)) * u, (y + n(i + 4)) * u, u * 0.07, u * 0.045, n(i + 7) * 3, 0, 7); ctx.fill(); }
    }
    if (cols.length && n(10) < (P.sea === 'sp' ? 0.2 : 0.12)) {
      const fx = (x + 0.2 + n(11) * 0.6) * u, fy = (y + 0.2 + n(12) * 0.6) * u, col = cols[Math.floor(n(13) * cols.length)];
      for (let i = 0; i < 4; i++) {
        const px = fx + (n(14 + i) - 0.5) * u * 0.4, py = fy + (n(18 + i) - 0.5) * u * 0.3;
        if (P.sea === 'fa') { ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(px, py, u * 0.05, u * 0.028, n(22 + i) * 3, 0, 7); ctx.fill(); continue; }
        ctx.fillStyle = rgba('#2a4a1a', 0.5); ctx.beginPath(); ctx.arc(px + u * 0.01, py + u * 0.015, u * 0.04, 0, 7); ctx.fill();
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, u * 0.035, 0, 7); ctx.fill();
        ctx.fillStyle = '#f8e070'; ctx.beginPath(); ctx.arc(px, py, u * 0.012, 0, 7); ctx.fill();
      }
    }
    if (n(30) < 0.05) { ctx.fillStyle = '#9a968c'; ctx.beginPath(); ctx.ellipse((x + n(31)) * u, (y + n(32)) * u, u * 0.06, u * 0.04, 0, 0, 7); ctx.fill(); }
    // Creek banks: reeds and rounded grey and white (novaculite) stones on grass that touches flowing water.
    const wet = (dx, dy) => { const v = g[Math.max(0, Math.min(H - 1, y + dy)) * W + Math.max(0, Math.min(W - 1, x + dx))]; return (v === G.WATER || v === G.DEEP) && !world.lake[Math.max(0, Math.min(H - 1, y + dy)) * W + Math.max(0, Math.min(W - 1, x + dx))]; };
    const side = wet(1, 0) ? 1 : wet(-1, 0) ? -1 : 0;
    if (side) {
      const bx = side > 0 ? x + 0.82 : x + 0.18;
      if (n(40) < 0.55 && P.sea !== 'wi') {
        ctx.lineCap = 'round';
        for (let i = 0; i < 7; i++) {
          const rx = (bx + (n(41 + i) - 0.5) * 0.3) * u, ry = (y + 0.2 + n(48 + i) * 0.7) * u, h = u * (0.25 + n(55 + i) * 0.3), lean = (n(62 + i) - 0.5) * u * 0.12;
          ctx.strokeStyle = i % 3 ? shade(P.grass, -0.35) : (P.sea === 'fa' ? '#b08a4a' : '#7a8a3a'); ctx.lineWidth = Math.max(1, u * 0.035);
          ctx.beginPath(); ctx.moveTo(rx, ry); ctx.quadraticCurveTo(rx + lean * 0.5, ry - h * 0.6, rx + lean, ry - h); ctx.stroke();
          if (i === 2 && P.sea !== 'sp') { ctx.fillStyle = '#6a4a2a'; ctx.beginPath(); ctx.ellipse(rx + lean, ry - h - u * 0.04, u * 0.025, u * 0.07, 0, 0, 7); ctx.fill(); }
        }
      }
      for (let i = 0; i < 3; i++) if (n(70 + i) < 0.5) {
        const sx = (bx + (n(73 + i) - 0.5) * 0.25) * u, sy = (y + 0.15 + n(76 + i) * 0.7) * u, r = u * (0.06 + n(79 + i) * 0.06);
        ctx.fillStyle = 'rgba(30,24,16,0.3)'; ctx.beginPath(); ctx.ellipse(sx + r * 0.2, sy + r * 0.35, r * 1.05, r * 0.7, 0, 0, 7); ctx.fill();
        ctx.fillStyle = i % 2 ? '#d8d4ca' : '#9a968c'; ctx.beginPath(); ctx.ellipse(sx, sy, r, r * 0.72, 0, 0, 7); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.beginPath(); ctx.ellipse(sx - r * 0.3, sy - r * 0.3, r * 0.35, r * 0.2, 0, 0, 7); ctx.fill();
      }
    }
  }
}
// Rust-coloured mineral stain running downhill on the tufa, and algae spots (soft: drawn into the low-resolution layer).
function stains(ctx, world, tx0, ty0, size, u) {
  for (let y = ty0 - 1; y < ty0 + size + 1; y++) for (let x = tx0 - 1; x < tx0 + size + 1; x++) {
    if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const v = world.g[y * W + x];
    if (v !== G.TUFA && v !== G.POOL) continue;
    const n = (k) => noise(x, y, 300 + k);
    if (n(12) < 0.45) { ctx.fillStyle = 'rgba(176,96,40,0.2)'; ctx.beginPath(); ctx.ellipse((x + n(13)) * u, (y + 0.55) * u, u * 0.12, u * (0.35 + n(14) * 0.3), (n(16) - 0.5) * 0.3, 0, 7); ctx.fill(); }
    if (n(15) < 0.3) { ctx.fillStyle = 'rgba(40,140,120,0.22)'; ctx.beginPath(); ctx.ellipse((x + n(16)) * u, (y + n(17)) * u, u * 0.36, u * 0.18, 0, 0, 7); ctx.fill(); }
  }
}
// Thermophilic algae: blue-green runs from each hot pool down the slope, edged with rusty mineral stain.
function algae(ctx, world, u) {
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const k of Object.keys(world.special)) {
    if (world.special[k] === 'cold') continue;
    const [x, y] = k.split(',').map(Number);
    const len = 2 + noise(x, y, 600) * 1.6;
    for (let i = 0; i < 6; i++) {
      const t = i / 5, wob = (noise(x, y, 610 + i) - 0.5) * 0.5;
      const ex = (x + 0.5 + wob * t * 1.4) * u, ey = (y + 0.9 + t * len) * u, rx = u * (0.32 + t * 0.4), ry = u * (0.22 + t * 0.12);
      ctx.fillStyle = 'rgba(176,96,40,0.16)'; ctx.beginPath(); ctx.ellipse(ex, ey, rx * 1.15, ry * 1.2, 0, 0, 7); ctx.fill();
      ctx.fillStyle = `rgba(52,150,124,${0.34 - t * 0.22})`; ctx.beginPath(); ctx.ellipse(ex, ey, rx, ry, 0, 0, 7); ctx.fill();
    }
  }
}
// Rimstone terraces on the tufa: pale lips with shadowed faces below, orange mineral streaks running downhill,
// and blue-green algae where hot water spreads.
function terraces(ctx, world, tx0, ty0, size, u) {
  for (let y = ty0 - 1; y < ty0 + size + 1; y++) for (let x = tx0 - 1; x < tx0 + size + 1; x++) {
    if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const v = world.g[y * W + x];
    if (v !== G.TUFA && v !== G.POOL) continue;
    const n = (k) => noise(x, y, 300 + k);
    const k = n(20) < 0.32 ? 1 : n(20) < 0.48 ? 2 : 0;
    for (let r = 0; r < k; r++) {
      const cx = (x + 0.1 + n(r) * 0.8) * u, cy = (y + 0.2 + r * 0.45 + n(r + 4) * 0.2) * u, rw = u * (0.45 + n(r + 8) * 0.7), rh = u * (0.12 + n(r + 9) * 0.14), rot = (n(r + 10) - 0.5) * 0.6;
      const a0 = 0.25 + n(r + 11) * 0.4, a1 = Math.PI - 0.25 - n(r + 12) * 0.4;
      ctx.beginPath(); ctx.ellipse(cx, cy + u * 0.03, rw, rh, rot, a0, a1); ctx.strokeStyle = 'rgba(90,70,40,0.28)'; ctx.lineWidth = u * 0.08; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(cx, cy, rw, rh, rot, a0, a1); ctx.strokeStyle = `rgba(255,250,235,${0.35 + n(r + 13) * 0.25})`; ctx.lineWidth = u * (0.025 + n(r + 14) * 0.025); ctx.stroke();
    }
  }
}

// The culvert headwall where Hot Springs Creek comes out from under the road (1886 on): cut stone with an arch,
// hanging below the road's south edge, the creek spilling out of it.
function culvert(ctx, u) {
  const cx = (CREEK[0] + CREEK[1] + 1) / 2, top = CULVERT_Y + 0.86;
  const name = 'ground-culvert', a = aspectOf(name), wT = 2.4;
  const sp = paintedAt(name, wT * u, wT * a * u);
  if (sp) { ctx.drawImage(sp, (cx - wT / 2) * u, top * u); return; }
  const x0 = (cx - 1.35) * u, w = 2.7 * u, y0 = top * u, h = u * 0.55;
  ctx.fillStyle = 'rgba(20,16,10,0.35)'; ctx.fillRect(x0 + u * 0.05, y0 + h, w, u * 0.12);
  ctx.fillStyle = '#9a9284'; ctx.fillRect(x0, y0, w, h);
  ctx.fillStyle = '#c8c0b0'; ctx.fillRect(x0 - u * 0.05, y0 - u * 0.04, w + u * 0.1, u * 0.12);
  ctx.strokeStyle = 'rgba(60,52,40,0.45)'; ctx.lineWidth = Math.max(1, u * 0.02);
  for (let r = 1; r < 3; r++) { ctx.beginPath(); ctx.moveTo(x0, y0 + r * h / 3); ctx.lineTo(x0 + w, y0 + r * h / 3); ctx.stroke(); }
  for (let r = 0; r < 3; r++) for (let i = 1; i < 8; i++) { const bx = x0 + (i + (r % 2) * 0.5) * w / 8; ctx.beginPath(); ctx.moveTo(bx, y0 + r * h / 3); ctx.lineTo(bx, y0 + (r + 1) * h / 3); ctx.stroke(); }
  ctx.fillStyle = '#1c2220'; ctx.beginPath(); ctx.moveTo(cx * u - u * 0.75, y0 + h); ctx.lineTo(cx * u - u * 0.75, y0 + h * 0.55); ctx.ellipse(cx * u, y0 + h * 0.55, u * 0.75, h * 0.42, 0, Math.PI, 0); ctx.lineTo(cx * u + u * 0.75, y0 + h); ctx.fill();
  ctx.fillStyle = 'rgba(230,245,240,0.6)'; ctx.beginPath(); ctx.ellipse(cx * u, y0 + h + u * 0.05, u * 0.7, u * 0.08, 0, 0, 7); ctx.fill();
}

// Hot-spring pools on the tufa: a cream rim, turquoise water deepening to the centre, a glint.
// From 1886 the springs were piped and covered; one stays open as a display spring (game choice of which).
export function drawPool(ctx, x, y, u, ch = 1, kind = 'soak', at = null) {
  const cx = (x + 0.5) * u, cy = (y + 0.5) * u;
  if (ch >= 3 && kind === 'soak' && at) {
    // From 1886 the soaking pool is built: one stone-rimmed basin across its tiles, steaming turquoise water.
    const pool = (dx, dy) => at(x + dx, y + dy) === G.POOL;
    // The painted basin is drawn whole from its top-left tile (both chunks it straddles include that tile).
    const pa = aspectOf('ground-soakpool'), bw = 2.3, sp = paintedAt('ground-soakpool', bw * u, bw * pa * u);
    if (sp) { if (!pool(-1, 0) && !pool(0, -1)) ctx.drawImage(sp, (x + 1 - bw / 2) * u, (y + 1 - bw * pa / 2) * u); return; }
    ctx.fillStyle = '#3aa7a0'; ctx.fillRect(x * u, y * u, u, u);
    const gr = ctx.createLinearGradient(0, y * u, 0, (y + 1) * u); gr.addColorStop(0, 'rgba(20,90,100,0.45)'); gr.addColorStop(1, 'rgba(120,220,200,0.2)');
    ctx.fillStyle = gr; ctx.fillRect(x * u, y * u, u, u);
    const r = u * 0.16; ctx.fillStyle = '#cfc6b0';
    if (!pool(0, -1)) ctx.fillRect(x * u, y * u, u, r * 1.4);
    if (!pool(0, 1)) ctx.fillRect(x * u, (y + 1) * u - r, u, r);
    if (!pool(-1, 0)) ctx.fillRect(x * u, y * u, r, u);
    if (!pool(1, 0)) ctx.fillRect((x + 1) * u - r, y * u, r, u);
    ctx.fillStyle = 'rgba(80,66,44,0.4)';
    if (!pool(0, -1)) ctx.fillRect(x * u, y * u + r * 1.4, u, u * 0.05);
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fillRect(x * u + u * 0.25, y * u + u * 0.45, u * 0.3, u * 0.04);
    return;
  }
  if (ch >= 3 && kind === 'hotspring' && !(x === 52 && y === 9)) {
    // A tufa-masonry spring box with an iron lid, weeping a little warm water.
    const ba = aspectOf('ground-springbox'), bw = 1.05, sb = paintedAt('ground-springbox', bw * u, bw * ba * u);
    if (sb) { ctx.fillStyle = 'rgba(40,30,20,0.28)'; ctx.beginPath(); ctx.ellipse(cx + u * 0.06, cy + u * 0.36, u * 0.48, u * 0.16, 0, 0, 7); ctx.fill(); ctx.drawImage(sb, cx - bw * u / 2, cy + u * 0.45 - bw * ba * u); return; }
    ctx.fillStyle = 'rgba(40,30,20,0.35)'; ctx.fillRect(cx - u * 0.36, cy - u * 0.2, u * 0.76, u * 0.62);
    ctx.fillStyle = '#b8ae98'; ctx.fillRect(cx - u * 0.4, cy - u * 0.3, u * 0.8, u * 0.6);
    ctx.fillStyle = '#d8d0bc'; ctx.fillRect(cx - u * 0.4, cy - u * 0.3, u * 0.8, u * 0.12);
    ctx.strokeStyle = 'rgba(70,60,44,0.6)'; ctx.lineWidth = Math.max(1, u * 0.025);
    for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(cx - u * 0.4, cy - u * 0.3 + i * u * 0.2); ctx.lineTo(cx + u * 0.4, cy - u * 0.3 + i * u * 0.2); ctx.stroke(); }
    ctx.fillStyle = '#3a3836'; ctx.fillRect(cx - u * 0.22, cy - u * 0.24, u * 0.44, u * 0.3);
    ctx.strokeStyle = '#6a6660'; ctx.strokeRect(cx - u * 0.22, cy - u * 0.24, u * 0.44, u * 0.3);
    ctx.beginPath(); ctx.arc(cx, cy - u * 0.09, u * 0.06, 0, 7); ctx.stroke();
    ctx.fillStyle = 'rgba(52,150,124,0.5)'; ctx.beginPath(); ctx.ellipse(cx + u * 0.1, cy + u * 0.38, u * 0.24, u * 0.1, 0, 0, 7); ctx.fill();
    return;
  }
  // An open pool: an irregular travertine rim, clear water over green-blue algae, deepening to the vent.
  const rim = (r, k) => { ctx.beginPath(); for (let i = 0; i <= 14; i++) { const a = i / 14 * Math.PI * 2, rr = r * (0.86 + noise(x, y, 700 + i + k) * 0.28); ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.82 + u * 0.03); } ctx.closePath(); };
  ctx.fillStyle = '#efe4c8'; rim(u * 0.58, 0); ctx.fill();
  ctx.fillStyle = 'rgba(150,110,60,0.35)'; rim(u * 0.5, 0); ctx.fill();
  ctx.fillStyle = '#5ab89a'; rim(u * 0.45, 0); ctx.fill();
  if (ch >= 3 && kind === 'hotspring') { ctx.strokeStyle = '#8a7a5a'; ctx.lineWidth = u * 0.07; rim(u * 0.56, 0); ctx.stroke(); }
  {
  ctx.fillStyle = '#efe6cf'; ctx.beginPath(); ctx.ellipse(cx, cy + u * 0.04, u * 0.54, u * 0.47, 0, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(120,90,50,0.35)'; ctx.beginPath(); ctx.ellipse(cx, cy + u * 0.08, u * 0.46, u * 0.38, 0, 0, 7); ctx.fill();
  const gr = ctx.createRadialGradient(cx, cy, u * 0.03, cx, cy, u * 0.4);
  gr.addColorStop(0, 'rgba(24,96,110,0.95)'); gr.addColorStop(0.6, 'rgba(60,170,160,0.75)'); gr.addColorStop(1, 'rgba(140,215,190,0.3)');
  ctx.fillStyle = gr; rim(u * 0.42, 0); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.beginPath(); ctx.ellipse(cx - u * 0.12, cy - u * 0.1, u * 0.12, u * 0.035, -0.3, 0, 7); ctx.fill();
  }
}

let lowC = null;
function lowres(w) { if (!lowC || lowC.width < w) { lowC = document.createElement('canvas'); lowC.width = lowC.height = w; } return lowC; }
function mouthY(world) {
  if (!world.lake.some((v) => v)) return 0;
  for (let y = 0; y < H; y++) if (world.lake[y * W + 22]) return y;
  return 0;
}
export function mixGrass(P, t) { return mix(P.grass, P.forest, t); }
export { rgba };
