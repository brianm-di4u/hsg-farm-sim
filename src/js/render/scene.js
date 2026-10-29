// Frame rendering: chunk-cached ground and buildings, a y-sorted dynamic layer, particles,
// weather and night lighting.
import { W, H, G } from '../sim/world.js';
import * as sim from '../sim/sim.js';
import { PEOPLE, CHAPTERS, QUESTS, ITEMS } from '../sim/data.js';
import { palette, LIGHT, NIGHT, SIGN_FONT, rgba, mix, shade } from './palette.js';
import { cached, drawGround, drawBuilding, signText, personSprite, animalSprite, treeSprite, objSprite, cropSprite, soilSprite, iconCanvas, clearArt } from './art.js';
import { ART, img as artImg } from './assets.js';
import { bakeTerrain, terrainReady, drawPool, pattern } from './terrain.js';
import * as PA from './painted.js';
import { noise } from '../sim/rng.js';

const CHUNK = 16;
export const R = {
  canvas: null, ctx: null, dpr: 1, cssW: 0, cssH: 0, ts: 40, u: 40, cam: { x: 0, y: 0 }, chunks: new Map(),
  cu: 40, fallback: new Set(), particles: [], pops: [], night: null, useT: -1e9, artFlushT: 0, reduced: false, mobile: false, offsetY: 0, frames: 0, chunkBakes: 0, lastT: 0, hover: null,
};

export function setup(canvas) {
  R.canvas = canvas; R.ctx = canvas.getContext('2d');
  R.nightEl = document.getElementById('nightfx');
  resize();
}
export function resize() {
  const c = R.canvas;
  R.cssW = c.clientWidth || window.innerWidth; R.cssH = c.clientHeight || window.innerHeight;
  // Phones get a 1.5× canvas: sharp enough for 34 px tiles, 44% fewer pixels to fill each frame.
  R.dpr = Math.min(R.cssW < 700 ? 1.5 : 2, window.devicePixelRatio || 1);
  c.width = Math.round(R.cssW * R.dpr); c.height = Math.round(R.cssH * R.dpr);
  R.mobile = R.cssW < 700;
  // Desktop is zoomed in (the review found the old 44 px view too far out); phones keep a close view.
  const ts = R.mobile ? 38 : (R.cssW >= 1100 ? 64 : 56);
  if (ts !== R.ts || Math.round(ts * R.dpr) !== R.u) {
    R.ts = ts; R.u = Math.round(ts * R.dpr);
    // Terrain chunks are baked at no more than 1.5x the CSS tile size, which caps their memory on 2x screens.
    R.cu = Math.min(R.u, Math.round(ts * 1.5));
    R.chunks.clear(); clearArt();
  }
  R.offsetY = R.mobile ? -R.cssH * 0.1 : 0;
  R.night = null;
}

function chunkCanvas(gm, cx, cy, P) {
  const S = gm.S;
  const painted = terrainReady();
  const snow = painted && S.weather === 'snow';
  const k = `${S.ch}|${P.sea}|${S.houseStyle || ''}|${cx},${cy}|${R.cu}|${painted ? 1 : 0}|${snow ? 1 : 0}`;
  let c = R.chunks.get(k);
  if (c) { R.chunks.delete(k); R.chunks.set(k, c); return c; }
  if (R.chunks.size > 10) { const first = R.chunks.keys().next().value; R.chunks.delete(first); }
  const u = R.cu;
  const t0 = performance.now();
  c = document.createElement('canvas');
  c.width = CHUNK * u; c.height = CHUNK * u;
  const ctx = c.getContext('2d');
  ctx.translate(-cx * CHUNK * u, -cy * CHUNK * u);
  const g = gm.world.g;
  const at = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? -1 : g[y * W + x]);
  if (painted) {
    bakeTerrain(ctx, gm.world, cx * CHUNK, cy * CHUNK, CHUNK, u, P, { snow });
    for (let y = cy * CHUNK - 1; y < Math.min(H, (cy + 1) * CHUNK + 1); y++) for (let x = cx * CHUNK - 1; x < Math.min(W, (cx + 1) * CHUNK + 1); x++) {
      const v = at(x, y);
      if (v === G.POOL) drawPool(ctx, x, y, u, S.ch, gm.world.special[x + ',' + y], at);
      else if (v === G.BRIDGE || v === G.DOCK || v === G.RAIL || v === G.QUARRY) tileOverlay(ctx, v, x, y, u, P, at);
      else if (v === G.SAND && (x === 22 || x === 23) && at(x, y - 1) === G.WATER) { const wv = at(x, y + 1); if (wv === G.WATER || wv === G.DEEP) { ctx.fillStyle = shade(P.water, -0.1); ctx.fillRect(x * u, y * u, u, u); tileOverlay(ctx, G.BRIDGE, x, y, u, P, (xx, yy) => (yy === y && (xx === 22 || xx === 23) ? G.BRIDGE : G.GRASS)); } }
      else if (v === G.STREET && (at(x, y + 1) === G.WATER || at(x, y + 1) === G.DEEP)) boatRamp(ctx, x, y, u, P);
    }
  } else {
    for (let y = cy * CHUNK; y < Math.min(H, (cy + 1) * CHUNK); y++) for (let x = cx * CHUNK; x < Math.min(W, (cx + 1) * CHUNK); x++) {
      drawGround(ctx, at(x, y), x, y, u, P, { n: at(x, y - 1), s: at(x, y + 1), w: at(x - 1, y), e: at(x + 1, y) });
    }
  }
  // Buildings that overlap this chunk (clipped to it).
  ctx.save();
  ctx.beginPath(); ctx.rect(cx * CHUNK * u, cy * CHUNK * u, CHUNK * u, CHUNK * u); ctx.clip();
  for (const b of gm.world.buildings) {
    if (b.x + b.w + 2 < cx * CHUNK || b.x - 2 > (cx + 1) * CHUNK || b.y + b.h + 1 < cy * CHUNK || b.y - 1 > (cy + 1) * CHUNK) continue;
    if (PA.buildingSprite(S.ch, b, u)) footing(ctx, b, u, P); // painted buildings are drawn in the sorted layer
    else drawBuilding(ctx, b, u, P);
  }
  ctx.restore();
  R.chunks.set(k, c);
  R.chunkBakes++; R.bakedFrame = R.frames;
  R.bakeMs = Math.max(R.bakeMs || 0, performance.now() - t0);
  (R.bakeLog || (R.bakeLog = [])).push(Math.round(performance.now() - t0)); if (R.bakeLog.length > 20) R.bakeLog.shift();
  return c;
}
export function invalidateChunks() { R.chunks.clear(); }

export function camera(gm) {
  const p = gm.S.player;
  const vw = R.cssW / R.ts, vh = R.cssH / R.ts;
  let cx = p.x - vw / 2, cy = p.y - 0.75 - vh / 2 - R.offsetY / R.ts;
  cx = vw >= W ? (W - vw) / 2 : Math.max(0, Math.min(W - vw, cx));
  cy = vh >= H ? (H - vh) / 2 : Math.max(0, Math.min(H - vh, cy));
  if (!R.reduced && R.camInit) { R.cam.x += (cx - R.cam.x) * 0.25; R.cam.y += (cy - R.cam.y) * 0.25; if (Math.abs(cx - R.cam.x) < 0.01) R.cam.x = cx; if (Math.abs(cy - R.cam.y) < 0.01) R.cam.y = cy; }
  else { R.cam.x = cx; R.cam.y = cy; R.camInit = true; }
  return R.cam;
}
export const snapCamera = (gm) => { R.camInit = false; camera(gm); };
export function screenToTile(sx, sy) { return { x: Math.floor(R.cam.x + sx / R.ts), y: Math.floor(R.cam.y + sy / R.ts) }; }
export function tileToScreen(x, y) { return { x: (x - R.cam.x) * R.ts, y: (y - R.cam.y) * R.ts }; }

// ---------- particles ----------
export function addPop(x, y, item, n) { R.pops.push({ x: x + 0.5, y: y + 0.2, item, n, t: 0 }); }
// Tool feedback: soil puffs and clods for the hoe, a splash ring and droplets for the jug, chips for the axe,
// sparks and grit for the pick. Reduced motion keeps a single short ring and no flying particles.
export function addFx(kind, x, y) {
  const cx = x + 0.5, cy = y + 0.62, P = R.particles;
  if (kind === 'water' || kind === 'dirt') P.push({ ring: true, x: cx, y: cy, life: 22, max: 22, col: kind === 'water' ? '#d8f0ff' : '#c8a87a' });
  if (R.reduced) return;
  const spec = { dirt: [['#6a4a2e', '#8a6a48', '#4a3422'], 9, 0.07, 0.065], water: [['#bfe4fa', '#8cc8ec', '#ffffff'], 10, 0.05, 0.07], chip: [['#d8b07a', '#a87a48', '#f0d8a8'], 8, 0.08, 0.07], spark: [['#ffffff', '#ffe6a0', '#c8c4ba'], 9, 0.06, 0.09] }[kind] || [['#fff'], 6, 0.06, 0.06];
  const [cols, n, s, v] = spec;
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.4, sp = v * (0.4 + Math.random() * 0.8);
    P.push({ x: cx, y: cy - 0.1, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 26 + Math.random() * 10, col: cols[i % cols.length], s: s * (0.6 + Math.random() * 0.8), round: kind !== 'chip', ground: cy + 0.1 + Math.random() * 0.2, spark: kind === 'spark' });
  }
  if (kind === 'dirt') for (let i = 0; i < 3; i++) P.push({ x: cx + (Math.random() - 0.5) * 0.4, y: cy, vx: (Math.random() - 0.5) * 0.01, vy: -0.006, life: 40, max: 40, col: '#b89870', s: 0.22, dust: true });
}
// Hearts rising over a neighbour whose friendship just grew.
export function addHearts(x, y) {
  const n = R.reduced ? 1 : 5;
  for (let i = 0; i < n; i++) R.particles.push({ x: x + (Math.random() - 0.5) * 0.5, y: y - 1.6, vx: (Math.random() - 0.5) * 0.01, vy: -0.016 - Math.random() * 0.01, life: 60 + i * 6, max: 60 + i * 6, heart: true, s: 0.2 + Math.random() * 0.08 });
}

// ---------- the frame ----------
export function draw(gm, ui) {
  const S = gm.S, ctx = R.ctx, ts = R.ts, u = R.u, dpr = R.dpr;
  const now = performance.now();
  const dt = Math.min(3, R.lastT ? (now - R.lastT) / 16.67 : 1); R.lastT = now;
  R.frames++;
  const sea = sim.season(S);
  const P = palette(S.ch, sea);
  const cam = camera(gm);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = P.forest; ctx.fillRect(0, 0, R.canvas.width, R.canvas.height);
  const sx0 = Math.floor(cam.x), sy0 = Math.floor(cam.y), sx1 = Math.ceil(cam.x + R.cssW / ts), sy1 = Math.ceil(cam.y + R.cssH / ts);
  const ox = -cam.x * u, oy = -cam.y * u;
  // Painted art arriving: rebake once things settle (not once per image).
  // Only textures and this chapter's buildings live in the baked chunks; other images need no rebake.
  if (ART.dirty && (ART.pending === 0 || now - R.artFlushT > 600)) {
    ART.dirty = false; R.artFlushT = now;
    const mine = PA.buildingNames(S.ch);
    if (ART.fresh.some((n) => n.startsWith('tex-') || mine.has(n))) R.chunks.clear();
    ART.fresh.length = 0;
  }
  // Chunks (baked at R.cu px per tile, drawn at R.u).
  const cs = CHUNK * u;
  for (let cy = Math.max(0, Math.floor(sy0 / CHUNK)); cy <= Math.min(Math.floor((H - 1) / CHUNK), Math.floor(sy1 / CHUNK)); cy++)
    for (let cx = Math.max(0, Math.floor(sx0 / CHUNK)); cx <= Math.min(Math.floor((W - 1) / CHUNK), Math.floor(sx1 / CHUNK)); cx++)
      ctx.drawImage(chunkCanvas(gm, cx, cy, P), Math.round(ox + cx * cs), Math.round(oy + cy * cs), cs, cs);
  ctx.setTransform(1, 0, 0, 1, Math.round(ox), Math.round(oy));
  // Soil.
  drawSoil(ctx, S, sx0, sy0, sx1, sy1, u);
  waterFx(ctx, gm, sx0, sy0, sx1, sy1, u, now);
  // Dynamic layer: every entry has a sort key (its base row), a draw function and optionally a shadow.
  const list = [];
  const inView = (x, y) => x >= sx0 - 3 && x <= sx1 + 2 && y >= sy0 - 1 && y <= sy1 + 4;
  const pl = S.player;
  for (const [k, o] of Object.entries(S.objs)) { const [x, y] = k.split(',').map(Number); if (inView(x, y) && !(o.t === 'tuft' && S.weather === 'snow' && ART.on)) list.push(objEntry(ctx, o, x, y, P, u, pl)); }
  for (const f of gm.world.fixed) if (inView(f.x, f.y)) list.push(objEntry(ctx, f, f.x, f.y, P, u, pl));
  for (const l of gm.world.lamps) {
    if (l.door && l.k === 'lantern' && inView(Math.floor(l.x), Math.floor(l.y))) {
      const sp = PA.lampSprite('lantern', u * 0.62);
      if (sp) { const lx = (l.x + 0.75) * u, ly = (l.y + 0.55) * u; list.push({ y: l.y + 0.55, d: () => ctx.drawImage(sp.c, lx + sp.ox, ly + sp.oy) }); }
    }
    if (!(l.post || l.k === 'fire') || !inView(Math.floor(l.x), Math.floor(l.y))) continue;
    const sp = PA.lampSprite(l.k, u);
    if (sp) list.push({ y: l.y + 0.05, sil: l.k === 'fire' ? null : { c: sp.c, bx: l.x * u, by: (l.y + 0.05) * u, ox: sp.ox, oy: sp.oy }, d: () => { ctx.drawImage(sp.c, l.x * u + sp.ox, (l.y + 0.05) * u + sp.oy); if (l.k === 'fire') fireFlicker(ctx, l, u, now); } });
    else if (l.post) list.push({ y: l.y, d: () => ctx.drawImage(objSprite({ t: 'lamp' }, P, u), (l.x - 0.5) * u, (l.y - 1.5) * u) });
  }
  for (const [name, dx, dy, dw] of PA.DECO[S.ch] || []) {
    const tx = Math.floor(dx), ty = Math.floor(dy - 0.05), k = tx + ',' + ty;
    if (!inView(tx, ty) || S.objs[k] || S.crops[k]) continue;
    const sp = PA.decoSprite(name, dw, u);
    if (sp) list.push({ y: dy, sh: [dx, dy + 0.02, dw * 0.46], d: () => ctx.drawImage(sp.c, dx * u + sp.ox, dy * u + sp.oy) });
  }
  for (const b of gm.world.buildings) {
    if (b.x + b.w < sx0 - 1 || b.x > sx1 + 1 || b.y > sy1 + 1 || b.y + b.h < sy0 - 1) continue;
    const sp = PA.buildingSprite(S.ch, b, u, S.weather === 'snow');
    if (sp) list.push({ y: b.y + b.h - 0.02, d: () => { ctx.drawImage(sp.c, sp.x, sp.y); if (b.label) buildingLabel(ctx, b, sp, u, P); } });
    if (sp && S.ch >= 3 && b.id !== 'farmhouse' && b.w === 5) for (const fx of [b.x + 0.35, b.x + b.w - 0.35]) {
      const bs = PA.propSprite('bush', u * 0.8, Math.round(fx), b.y);
      if (bs) list.push({ y: b.y + b.h + 0.01, d: () => ctx.drawImage(bs.c, fx * u + bs.ox, (b.y + b.h - 0.02) * u + bs.oy) });
    }
  }
  for (const [k, c] of Object.entries(S.crops)) {
    const [x, y] = k.split(',').map(Number); if (!inView(x, y)) continue;
    list.push({ y: y + 0.9, d: () => {
      const st = sim.cropStage(c), sp = PA.cropSprite(c.id, st, u);
      const front = y + 0.9 > pl.y && y < pl.y + 1.2 && Math.abs(x + 0.5 - pl.x) < 0.8 && st >= 3;
      if (front) ctx.globalAlpha = 0.5;
      if (sp) ctx.drawImage(sp.c, (x + 0.5) * u + sp.ox, (y + 0.86) * u + sp.oy); else ctx.drawImage(cropSprite(c.id, st, u), x * u, (y - 0.4) * u);
      ctx.globalAlpha = 1;
      if (st === 4) ripeBadge(ctx, x, y, u, now);
    } });
  }
  for (const [k, id] of Object.entries(S.forage)) {
    const [x, y] = k.split(',').map(Number); if (!inView(x, y)) continue;
    list.push({ y: y + 0.6, d: () => { ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse((x + 0.5) * u, (y + 0.8) * u, u * 0.25, u * 0.08, 0, 0, 7); ctx.fill(); ctx.drawImage(PA.iconSprite(id, Math.round(u * 0.7)) || iconCanvas(id, Math.round(u * 0.7)), (x + 0.15) * u, (y + 0.05) * u); } });
  }
  for (const a of S.animals) list.push({ y: a.y, sh: [a.x, a.y, a.kind === 'hen' ? 0.2 : 0.45], d: () => {
    const sp = PA.animalSprite(a.kind, a.face || 'right', u);
    const bob = R.reduced ? 0 : Math.sin(now / 340 + a.x * 3) * u * 0.015;
    if (sp) ctx.drawImage(sp.c, a.x * u + sp.ox, a.y * u + sp.oy + bob); else ctx.drawImage(animalSprite(a.kind, a.face || 'right', u), (a.x - 0.5) * u, (a.y - 0.95) * u);
  } });
  const walkFrame = (t) => 'walk' + (Math.floor(t) % 4);
  for (const [id, n] of Object.entries(S.npcs)) {
    if (n.hidden || !inView(Math.floor(n.x), Math.floor(n.y))) continue;
    const p = PEOPLE[id];
    list.push({ y: n.y, sh: [n.x, n.y, 0.3], d: () => {
      const moving = n.moving && !R.reduced;
      const sp = PA.personSprite(id, p.look, n.face || 'down', moving ? walkFrame(now / 140) : 'idle', u);
      if (sp) ctx.drawImage(sp.c, n.x * u + sp.ox, n.y * u + sp.oy);
      else ctx.drawImage(personSprite(id, p.look, n.face || 'down', moving ? (Math.floor(now / 160) % 2) : 0, u), (n.x - 0.5) * u, (n.y - 1.5) * u);
      questBubble(ctx, gm, id, n, u);
    } });
  }
  const look = CHAPTERS[S.ch].look;
  list.push({ y: pl.y + 0.001, sh: [pl.x, pl.y, 0.3], d: () => {
    const since = now - R.useT;
    const frame = since < 110 ? 'use0' : since < 300 ? 'use1' : pl.moving && !R.reduced ? walkFrame(pl.walk / 7) : 'idle';
    const sp = PA.personSprite('player' + S.ch, look, pl.face, frame, u);
    const swing = since < 300 && !R.reduced && sim.selected(S);
    const behind = pl.face === 'up';
    if (swing && behind) toolSwing(ctx, S, pl, since, u);
    if (sp) ctx.drawImage(sp.c, pl.x * u + sp.ox, pl.y * u + sp.oy);
    else ctx.drawImage(personSprite('player' + S.ch, look, pl.face, pl.moving && !R.reduced ? (Math.floor(pl.walk / 8) % 2) : 0, u), (pl.x - 0.5) * u, (pl.y - 1.5) * u);
    if (swing && !behind) toolSwing(ctx, S, pl, since, u);
  } });
  // Shadows first (under everything in the sorted layer), then the layer.
  const sun = sunShadow(S);
  if (sun.a > 0.01) {
    ctx.save();
    for (const b of gm.world.buildings) {
      if (b.x + b.w < sx0 - 4 || b.x > sx1 + 4 || b.y > sy1 + 2 || b.y + b.h < sy0 - 3) continue;
      const sp = PA.buildingSprite(S.ch, b, u, S.weather === 'snow');
      if (sp) { ctx.globalAlpha = sun.a * 1.15; ctx.drawImage(silhouette(sp.c), sp.x + sun.sx * u * 0.55, sp.y + u * 0.18); ctx.globalAlpha = 1; }
    }
    for (const it of list) if (it.sh) blobShadow(ctx, it.sh[0], it.sh[1], it.sh[2], u, sun);
    for (const it of list) if (it.sil) silShadow(ctx, it.sil, u, sun);
    ctx.restore();
    ctx.setTransform(1, 0, 0, 1, Math.round(ox), Math.round(oy));
  }
  list.sort((a, b) => a.y - b.y);
  // Target highlight under the dynamic layer's top.
  if (ui.showTarget) {
    const t = ui.targetOverride || sim.target(gm);
    ctx.lineWidth = Math.max(2, u * 0.06);
    ctx.strokeStyle = 'rgba(20,16,12,0.85)'; ctx.strokeRect(t.x * u + u * 0.06, t.y * u + u * 0.06, u * 0.88, u * 0.88);
    ctx.strokeStyle = 'rgba(255,250,235,0.95)'; ctx.lineWidth = Math.max(1, u * 0.03); ctx.strokeRect(t.x * u + u * 0.06, t.y * u + u * 0.06, u * 0.88, u * 0.88);
  }
  for (const it of list) it.d();
  // Name tags for people near the player.
  ctx.font = `bold ${Math.round(u * 0.3)}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  // Tags that would overlap stack upward instead.
  const tags = [];
  for (const [id, n] of Object.entries(S.npcs)) {
    if (n.hidden || Math.hypot(n.x - pl.x, n.y - pl.y) > 3.2) continue;
    const name = PEOPLE[id].name.split(' ')[0];
    const w = ctx.measureText(name).width + u * 0.3, h = u * 0.38;
    let x = n.x * u - w / 2, y = (n.y - 2.38) * u;
    for (let k = 0; k < 4 && tags.some((t) => x < t.x + t.w && t.x < x + w && y < t.y + t.h && t.y < y + h); k++) y -= h + u * 0.06;
    tags.push({ x, y, w, h });
    ctx.fillStyle = 'rgba(16,14,12,0.82)'; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#ffffff'; ctx.fillText(name, x + w / 2, y + h / 2 + u * 0.01);
  }
  // Fishing line.
  if (S.fishing) {
    const f = S.fishing;
    const bx = (f.x + 0.5) * u, by = (f.y + 0.5) * u + (f.phase === 'bite' ? u * 0.12 : Math.sin(now / 300) * u * 0.04);
    ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = Math.max(1, u * 0.025);
    ctx.beginPath(); ctx.moveTo(pl.x * u + u * 0.25, (pl.y - 1.0) * u); ctx.quadraticCurveTo((pl.x * u + bx) / 2, Math.min(by, pl.y * u) - u * 0.6, bx, by); ctx.stroke();
    ctx.fillStyle = '#e03a3a'; ctx.beginPath(); ctx.arc(bx, by, u * 0.1, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(bx - u * 0.1, by - u * 0.02, u * 0.2, u * 0.04);
    if (f.phase === 'bite') bubble(ctx, pl.x * u, (pl.y - 2.15) * u, '!', u, '#f4c542');
  }
  // Particles and pops.
  steamFor(gm, sx0, sy0, sx1, sy1, dt);
  drawParticles(ctx, u, dt);
  if (R.reduced) for (const k of Object.keys(gm.world.special)) { if (gm.world.special[k] === 'cold') continue; const [x, y] = k.split(',').map(Number); ctx.fillStyle = 'rgba(255,255,255,0.28)'; ctx.beginPath(); ctx.ellipse((x + 0.5) * u, (y - 0.1) * u, u * 0.35, u * 0.25, 0, 0, 7); ctx.fill(); }
  R.pops = R.pops.filter((p) => (p.t += dt) < 50);
  for (const p of R.pops) {
    const a = Math.min(1, (50 - p.t) / 15);
    const k = Math.min(1, p.t / 16), hop = R.reduced ? 0.5 : (p.t < 16 ? Math.sin(k * Math.PI) * 0.7 + k * 0.45 : 0.45 + (p.t - 16) * 0.012);
    const lift = hop, sc = R.reduced ? 1 : p.t < 6 ? 0.6 + p.t / 15 : p.t < 20 ? 1 + Math.sin((p.t - 6) / 14 * Math.PI) * 0.12 : 1;
    ctx.save(); ctx.translate((p.x) * u, (p.y - 0.9 - lift) * u); ctx.scale(sc, sc); ctx.translate(-p.x * u, -(p.y - 0.9 - lift) * u);
    ctx.globalAlpha = a;
    ctx.drawImage(PA.iconSprite(p.item, Math.round(u * 0.6)) || iconCanvas(p.item, Math.round(u * 0.6)), (p.x - 0.3) * u, (p.y - 1.2 - lift) * u);
    if (p.n > 1) { ctx.font = `bold ${Math.round(u * 0.3)}px system-ui, sans-serif`; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#000'; ctx.lineWidth = u * 0.06; ctx.strokeText('×' + p.n, (p.x + 0.35) * u, (p.y - 0.75 - lift) * u); ctx.fillText('×' + p.n, (p.x + 0.35) * u, (p.y - 0.75 - lift) * u); }
    ctx.globalAlpha = 1;
    ctx.restore();
  }
  // Screen-space overlays.
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  weather(ctx, S, now, dt);
  nightPass(gm, P, cam, now);
  prefetch(gm, P, sx0, sy0, sx1, sy1);
}

// Chunks just outside the view are baked ahead on quiet frames (at most one every third frame, never on a frame
// that already baked) and drawn once into a 1-pixel canvas, so the browser rasterises them now rather than on
// the frame the camera reaches them.
let pre = null;
function prefetch(gm, P, sx0, sy0, sx1, sy1) {
  if (R.bakedFrame === R.frames || R.frames % 3) return;
  const m = 6, out = [];
  for (let cy = Math.max(0, Math.floor((sy0 - m) / CHUNK)); cy <= Math.min(Math.floor((H - 1) / CHUNK), Math.floor((sy1 + m) / CHUNK)); cy++)
    for (let cx = Math.max(0, Math.floor((sx0 - m) / CHUNK)); cx <= Math.min(Math.floor((W - 1) / CHUNK), Math.floor((sx1 + m) / CHUNK)); cx++) out.push([cx, cy]);
  if (out.length > 10) return; // more than the LRU holds
  const k0 = R.chunkBakes;
  for (const [cx, cy] of out) {
    const c = chunkCanvas(gm, cx, cy, P);
    if (R.chunkBakes !== k0) { if (!pre) { pre = document.createElement('canvas'); pre.width = pre.height = 1; } pre.getContext('2d').drawImage(c, 0, 0, 1, 1); return; }
  }
}

// ---------- painted-layer helpers ----------
const LABEL_STYLE = { 1: ['#2a2420', '#e8dcc0'], 2: ['#2a2420', '#e6d8bc'], 3: ['#e8b84a', '#1f2a24'], 4: ['#f3e9d2', '#1f1c2e'], 5: ['#fff6e0', '#d9503f'], 6: ['#f6f3ec', '#183f63'] };
function toolSwing(ctx, S, pl, since, u) {
  const it = sim.selected(S); if (!it || !ITEMS[it.id] || ITEMS[it.id].kind !== 'tool') return;
  const t = Math.min(1, since / 260), e = t < 0.35 ? t / 0.35 : 1, side = pl.face === 'left' ? -1 : 1;
  const a = (-2.3 + e * 2.5) * side, s = u * 0.62;
  const hx = pl.x * u + (pl.face === 'left' ? -0.28 : pl.face === 'right' ? 0.28 : 0.18) * u, hy = (pl.y - 0.72 + (pl.face === 'up' ? -0.1 : 0)) * u;
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(a); if (side < 0) ctx.scale(-1, 1);
  ctx.globalAlpha = Math.min(1, (1 - t) * 4);
  ctx.drawImage(PA.iconSprite(it.id, Math.round(s)) || iconCanvas(it.id, Math.round(s)), -s * 0.2, -s * 0.85, s, s);
  ctx.restore();
}
function fireFlicker(ctx, l, u, now) {
  if (R.reduced) return;
  const f = 0.5 + 0.5 * Math.sin(now / 90) * Math.sin(now / 37 + 1);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.25 + f * 0.2;
  ctx.drawImage(gradSprite('#ff9a40'), (l.x - 0.6) * u, (l.y - 0.85) * u, 1.2 * u, 1.0 * u);
  ctx.restore();
}
function buildingLabel(ctx, b, sp, u, P) {
  const [fg, bg] = LABEL_STYLE[P.ch] || LABEL_STYLE[1];
  const style = SIGN_FONT[P.ch];
  // A painted sign board over the entrance, about where the facade meets the roof.
  const cy = sp.y + sp.h * (b.w >= 10 ? 0.5 : 0.56);
  const mw = Math.min(sp.w * 0.62, u * 4.2), lh = Math.ceil(u * 0.82 * 0.6);
  // Rendered once per label and size: text drawing every frame is costly on phones.
  const c = cached(`lbl|${b.label}|${P.ch}|${u}`, mw + 4, lh + 4, (g) => signText(g, b.label, (mw + 4) / 2, (lh + 4) / 2, mw, u * 0.82, fg, bg, style));
  ctx.drawImage(c, Math.round(sp.x + sp.w / 2 - c.width / 2), Math.round(cy - c.height / 2));
}
// Sun: shadows swing from west (morning) to east (evening), always falling a little south; faint under cloud.
function sunShadow(S) {
  const h = S.time / 60, f = Math.max(0, Math.min(1, (h - 6) / 14));
  const sx = (f - 0.5) * 1.8, sy = 0.34 + Math.abs(sx) * 0.12;
  const day = 1 - sim.darkness(S);
  const wx = S.weather === 'rain' || S.weather === 'snow' ? 0.3 : S.weather === 'fog' ? 0.45 : 1;
  return { sx, sy, a: 0.26 * day * day * wx };
}
const sils = new WeakMap();
function silhouette(c) {
  let s = sils.get(c);
  if (!s) { s = document.createElement('canvas'); s.width = c.width; s.height = c.height; const g = s.getContext('2d'); g.drawImage(c, 0, 0); g.globalCompositeOperation = 'source-in'; g.fillStyle = '#0c1410'; g.fillRect(0, 0, s.width, s.height); sils.set(c, s); }
  return s;
}
function silShadow(ctx, it, u, sun) {
  const m = ctx.getTransform();
  ctx.setTransform(1, 0, -sun.sx * 0.85, -sun.sy * 0.85, m.e + it.bx, m.f + it.by);
  ctx.globalAlpha = sun.a;
  ctx.drawImage(silhouette(it.c), it.ox, it.oy);
  ctx.globalAlpha = 1;
  ctx.setTransform(m);
}
function blobShadow(ctx, x, y, r, u, sun) {
  ctx.globalAlpha = Math.min(0.5, sun.a * 1.6);
  ctx.fillStyle = '#0c1410';
  ctx.beginPath(); ctx.ellipse((x + sun.sx * 0.12) * u, (y - 0.04) * u, r * u, r * u * 0.38, 0, 0, 7); ctx.fill();
  ctx.globalAlpha = 1;
}
function buildingShadow(ctx, b, u, sun) {
  const H = b.w >= 10 ? 3.2 : b.type.startsWith('farm') ? 1.9 : 2.4;
  const dx = sun.sx * H, dy = sun.sy * H;
  const x0 = (b.x + 0.15) * u, x1 = (b.x + b.w - 0.15) * u, y0 = (b.y + 1.2) * u, y1 = (b.y + b.h) * u, ex = dx * u, ey = dy * u;
  const pts = sun.sx >= 0 ? [[x0, y0], [x1, y0], [x1 + ex, y0 + ey], [x1 + ex, y1 + ey], [x0 + ex, y1 + ey], [x0, y1]]
    : [[x0, y0], [x1, y0], [x1, y1], [x1 + ex, y1 + ey], [x0 + ex, y1 + ey], [x0 + ex, y0 + ey]];
  // Two passes, the second pulled in toward the footprint: a cheap soft penumbra.
  ctx.fillStyle = '#0c1410';
  for (const [k, a] of [[1, 0.45], [0.72, 0.4]]) {
    ctx.globalAlpha = sun.a * a;
    ctx.beginPath(); pts.forEach(([px, py], i) => { const qx = px - (px === x0 || px === x1 ? 0 : (1 - k) * ex), qy = py - (py === y0 || py === y1 ? 0 : (1 - k) * ey); return i ? ctx.lineTo(qx, qy) : ctx.moveTo(qx, qy); }); ctx.closePath(); ctx.fill();
  }
  ctx.globalAlpha = 1;
}
// Baked under a painted building: a soft dark contact band where the walls meet the ground.
function footing(ctx, b, u) {
  // Three stacked, slightly smaller bands: a soft edge without a blur filter.
  ctx.fillStyle = 'rgba(12,16,10,0.12)';
  for (let i = 0; i < 3; i++) ctx.fillRect((b.x + 0.02 + i * 0.06) * u, (b.y + b.h - 0.6 + i * 0.04) * u, (b.w - 0.04 - i * 0.12) * u, (0.74 - i * 0.08) * u);
}
function objEntry(ctx, o, x, y, P, u, pl) {
  if (o.t === 'tree') {
    const sp = PA.treeSprite(o.k || 'pine', P.sea, u, x, y);
    if (sp) {
      const bx = (x + 0.5) * u, by = (y + 0.92) * u;
      // See-through when the player walks behind the canopy.
      const px = pl.x * u, py = (pl.y - 0.6) * u;
      const behind = pl.y < y + 0.92 && px > bx + sp.ox + u * 0.2 && px < bx + sp.ox + sp.c.width - u * 0.2 && py > by + sp.oy && py < by;
      return { y: y + 0.95, sil: { c: sp.c, bx, by, ox: sp.ox, oy: sp.oy }, d: () => { if (behind) ctx.globalAlpha = 0.45; ctx.drawImage(sp.c, bx + sp.ox, by + sp.oy); ctx.globalAlpha = 1; } };
    }
  } else if (o.t !== 'pen') {
    const sp = PA.propSprite(o.t, u, x, y);
    if (sp) {
      const bx = (x + 0.5) * u, by = (y + 0.9) * u;
      return { y: y + 0.95, sil: o.t === 'tuft' ? null : { c: sp.c, bx, by, ox: sp.ox, oy: sp.oy }, d: () => ctx.drawImage(sp.c, bx + sp.ox, by + sp.oy) };
    }
  }
  if (ART.on && ART.pending === 0 && ART.loaded > 0) R.fallback.add(o.t);
  return { y: y + 0.95, d: () => drawObj(ctx, o, x, y, P, u) };
}
// Tilled soil: painted soil in one world-anchored pattern fill, dry and watered, with a darker rim where it
// meets untilled ground and a droplet mark on watered tiles (a shape, not just a colour).
function drawSoil(ctx, S, sx0, sy0, sx1, sy1, u) {
  const dry = pattern(ctx, 'tex-soil', u), wet = pattern(ctx, 'tex-soil-wet', u);
  const tiles = [];
  for (const [k, st] of Object.entries(S.soil)) {
    const [x, y] = k.split(',').map(Number);
    if (x < sx0 - 1 || x > sx1 || y < sy0 - 1 || y > sy1) continue;
    tiles.push([x, y, st]);
  }
  if (!dry || !wet) { for (const [x, y, st] of tiles) ctx.drawImage(soilSprite(st, u), x * u, y * u); return; }
  const pd = new Path2D(), pw = new Path2D();
  for (const [x, y, st] of tiles) (st === 2 ? pw : pd).rect(x * u, y * u, u, u);
  ctx.fillStyle = dry; ctx.fill(pd); ctx.fillStyle = wet; ctx.fill(pw);
  const has = (x, y) => S.soil[x + ',' + y] != null;
  const e = Math.max(1, u * 0.07);
  for (const [x, y, st] of tiles) {
    ctx.fillStyle = 'rgba(30,18,8,0.35)';
    if (!has(x, y - 1)) ctx.fillRect(x * u, y * u, u, e);
    if (!has(x, y + 1)) ctx.fillRect(x * u, (y + 1) * u - e * 1.6, u, e * 1.6);
    if (!has(x - 1, y)) ctx.fillRect(x * u, y * u, e, u);
    if (!has(x + 1, y)) ctx.fillRect((x + 1) * u - e, y * u, e, u);
    if (st === 2) {
      ctx.fillStyle = 'rgba(150,205,235,0.9)';
      ctx.beginPath(); ctx.moveTo(x * u + u * 0.82, y * u + u * 0.1); ctx.quadraticCurveTo(x * u + u * 0.92, y * u + u * 0.28, x * u + u * 0.82, y * u + u * 0.31); ctx.quadraticCurveTo(x * u + u * 0.72, y * u + u * 0.28, x * u + u * 0.82, y * u + u * 0.1); ctx.fill();
    }
  }
}
// Bridges, docks, rails and quarry pits on top of the painted terrain, styled by era.
function boatRamp(ctx, x, y, u, P) {
  const px = x * u, py = (y + 0.85) * u;
  const gr = ctx.createLinearGradient(0, py, 0, py + u * 0.9);
  gr.addColorStop(0, P.ch >= 5 ? '#b8b4aa' : '#9a8a70'); gr.addColorStop(1, 'rgba(120,140,140,0)');
  ctx.fillStyle = gr; ctx.fillRect(px + u * 0.05, py, u * 0.9, u * 0.9);
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(px + u * 0.05, py + u * 0.55, u * 0.9, Math.max(1, u * 0.03));
}
function tileOverlay(ctx, v, x, y, u, P, at) {
  const px = x * u, py = y * u;
  if (v === G.BRIDGE) {
    const left = at(x - 1, y) !== G.BRIDGE, right = at(x + 1, y) !== G.BRIDGE;
    const concrete = P.ch >= 4;
    const deck = concrete ? '#b8b2a6' : P.ch === 1 ? '#8a6a44' : '#9a7a52';
    const x0 = px - (left ? u * 0.18 : 0), w = u + (left ? u * 0.18 : 0) + (right ? u * 0.18 : 0);
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(x0, py + u * 0.86, w, u * 0.16);
    ctx.fillStyle = deck; ctx.fillRect(x0, py + u * 0.06, w, u * 0.84);
    if (concrete) { ctx.fillStyle = shade(deck, -0.2); for (let i = 0; i < 2; i++) ctx.fillRect(x0, py + u * (0.33 + i * 0.27), w, Math.max(1, u * 0.02)); }
    else if (P.ch === 1) { for (let i = 0; i < 4; i++) { ctx.fillStyle = shade(deck, i % 2 ? -0.14 : 0.06); ctx.fillRect(x0, py + u * (0.08 + i * 0.205), w, u * 0.19); } }
    else { ctx.fillStyle = shade(deck, -0.28); for (let i = 0; i < 7; i++) ctx.fillRect(x0 + i * w / 7, py + u * 0.06, Math.max(1, u * 0.025), u * 0.84); }
    ctx.fillStyle = concrete ? '#ddd7ca' : '#5a4028';
    ctx.fillRect(x0, py + u * 0.02, w, u * 0.1); ctx.fillRect(x0, py + u * 0.84, w, u * 0.1);
    for (const sx of [0.15, 0.85]) { ctx.fillRect(px + sx * u - u * 0.05, py - u * 0.05, u * 0.1, u * 0.2); ctx.fillRect(px + sx * u - u * 0.05, py + u * 0.8, u * 0.1, u * 0.2); }
  } else if (v === G.DOCK) {
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(px + u * 0.1, py + u * 0.1, u * 0.9, u);
    for (let i = 0; i < 4; i++) { ctx.fillStyle = shade('#a8845c', i % 2 ? -0.1 : 0.05); ctx.fillRect(px + u * 0.04, py + i * u / 4, u * 0.92, u / 4 - Math.max(1, u * 0.02)); }
    ctx.fillStyle = '#5e4630'; ctx.fillRect(px + u * 0.02, py, u * 0.08, u); ctx.fillRect(px + u * 0.9, py, u * 0.08, u);
  } else if (v === G.RAIL) {
    ctx.fillStyle = '#7a7268'; ctx.fillRect(px, py + u * 0.12, u, u * 0.76);
    for (let i = 0; i < 3; i++) { ctx.fillStyle = '#4a3424'; ctx.fillRect(px + (i + 0.12) * u / 3, py + u * 0.1, u * 0.14, u * 0.8); }
    ctx.fillStyle = '#c8ccd2'; ctx.fillRect(px, py + u * 0.28, u, u * 0.07); ctx.fillRect(px, py + u * 0.64, u, u * 0.07);
    ctx.fillStyle = '#5a5e64'; ctx.fillRect(px, py + u * 0.35, u, u * 0.02); ctx.fillRect(px, py + u * 0.71, u, u * 0.02);
  } else if (v === G.QUARRY) {
    const cx = px + u / 2, cy = py + u / 2, rx = u * (0.5 + noise(x, y, 40) * 0.12), ry = u * (0.4 + noise(x, y, 41) * 0.1);
    // Old pits are shallow, soft-edged hollows half full of leaves, ringed by white spoil chips.
    ctx.save();
    ctx.fillStyle = 'rgba(30,24,16,0.18)'; ctx.beginPath(); ctx.ellipse(cx, cy, rx * 1.12, ry * 1.12, 0, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(30,24,16,0.3)'; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(122,92,56,0.85)'; ctx.beginPath(); ctx.ellipse(cx + u * 0.03, cy + u * 0.06, rx * 0.78, ry * 0.7, 0, 0, 7); ctx.fill();
    ctx.restore();
    for (let i = 0; i < 9; i++) { ctx.fillStyle = ['#a8642e', '#c8902e', '#7a4a26'][i % 3]; ctx.beginPath(); ctx.ellipse(cx + (noise(x, y, i + 50) - 0.5) * rx * 1.3, cy + (noise(x, y, i + 60) - 0.4) * ry, u * 0.05, u * 0.025, noise(x, y, i + 70) * 3, 0, 7); ctx.fill(); }
    for (let i = 0; i < 8; i++) { const a = noise(x, y, i) * 6.28; ctx.fillStyle = i % 2 ? '#f2eee4' : '#d8d0c0'; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * rx * 1.05, cy + Math.sin(a) * ry * 1.05); ctx.lineTo(cx + Math.cos(a) * rx * 1.05 + u * 0.07, cy + Math.sin(a) * ry * 1.05 + u * 0.02); ctx.lineTo(cx + Math.cos(a) * rx * 1.05 + u * 0.02, cy + Math.sin(a) * ry * 1.05 + u * 0.05); ctx.fill(); }
  }
}

function drawObj(ctx, o, x, y, P, u) {
  if (o.t === 'tree') ctx.drawImage(treeSprite(o.k || 'pine', P, u), (x - 0.2) * u, (y - 1.2) * u);
  else ctx.drawImage(objSprite(o, P, u), x * u, (y - 0.5) * u);
}
function ripeBadge(ctx, x, y, u, now) {
  // A four-point sparkle over ripe produce (shape + motion, not colour alone); steady under reduced motion.
  const ph = R.reduced ? 0.8 : 0.55 + 0.45 * Math.sin(now / 260 + x * 1.7 + y), s = u * (0.1 + 0.07 * ph);
  const cx = (x + 0.8) * u, cy = (y - 0.45) * u;
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(R.reduced ? 0 : now / 1400);
  ctx.fillStyle = 'rgba(30,20,8,0.55)'; star(ctx, s * 1.35);
  ctx.fillStyle = '#fff8d0'; star(ctx, s);
  ctx.restore();
}
function star(ctx, s) {
  ctx.beginPath(); ctx.moveTo(0, -s); ctx.quadraticCurveTo(0, 0, s, 0); ctx.quadraticCurveTo(0, 0, 0, s); ctx.quadraticCurveTo(0, 0, -s, 0); ctx.quadraticCurveTo(0, 0, 0, -s); ctx.fill();
}
function bubble(ctx, x, y, text, u, col) {
  ctx.fillStyle = col; ctx.strokeStyle = '#1a1612'; ctx.lineWidth = Math.max(2, u * 0.05);
  ctx.beginPath(); ctx.arc(x, y, u * 0.22, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#1a1612'; ctx.font = `bold ${Math.round(u * 0.32)}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y + u * 0.02);
}
function questBubble(ctx, gm, id, n, u) {
  const S = gm.S;
  const q = QUESTS.find((q) => q.ch === S.ch && q.giver === id && S.quests[q.id] && !S.quests[q.id].done);
  if (!q) return;
  const ready = (q.type === 'deliver' || q.type === 'variety') && sim.canDeliver(S, q);
  bubble(ctx, n.x * u + u * 0.42, (n.y - 1.72) * u, ready ? '✓' : '!', u, ready ? '#8fe08a' : '#f4c542');
}

// Rain streaks and splash rings at full resolution; the colour of the weather goes in the atmosphere pass.
function weather(ctx, S, now, dt) {
  const w = R.canvas.width, h = R.canvas.height;
  if (S.weather === 'rain' || S.weather === 'snow') {
    const rain = S.weather === 'rain';
    const n = R.reduced ? 40 : rain ? 140 : 110;
    if (rain) { ctx.strokeStyle = 'rgba(215,230,255,0.62)'; ctx.lineWidth = 1.4 * R.dpr; ctx.beginPath(); }
    else ctx.fillStyle = 'rgba(255,255,255,0.9)';
    for (let i = 0; i < n; i++) {
      const sp = rain ? 0.9 : 0.1;
      const x = (noise(i, 1) * w + (R.reduced ? 0 : now * 0.05 * (rain ? 0.3 : 0.4) + (rain ? 0 : Math.sin(now / 900 + i) * 12 * R.dpr))) % w;
      const y = (noise(i, 2) * h + (R.reduced ? 0 : now * sp)) % h;
      if (rain) { ctx.moveTo(x, y); ctx.lineTo(x - 4 * R.dpr, y + 18 * R.dpr); }
      else { const r = (1.4 + noise(i, 3) * 1.6) * R.dpr; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
    }
    if (rain) {
      ctx.stroke();
      if (!R.reduced) { // splash rings where drops land
        ctx.strokeStyle = 'rgba(220,235,255,0.55)'; ctx.lineWidth = Math.max(1, R.dpr * 0.8);
        for (let i = 0; i < 44; i++) {
          const ph = (now / 420 + noise(i, 7)) % 1, cyc = Math.floor(now / 420 + noise(i, 7));
          const x = noise(i, cyc % 97) * w, y = noise(i + 50, cyc % 89) * h, r = (2 + ph * 7) * R.dpr;
          ctx.globalAlpha = 1 - ph; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.4, 0, 0, 7); ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
    }
  }
}

// Sparkles on open water and slow flow lines down the creek (south), in world space.
function waterFx(ctx, gm, sx0, sy0, sx1, sy1, u, now) {
  const g = gm.world.g, lake = gm.world.lake;
  ctx.save();
  for (let y = Math.max(0, sy0); y <= Math.min(H - 1, sy1); y++) for (let x = Math.max(0, sx0); x <= Math.min(W - 1, sx1); x++) {
    const v = g[y * W + x];
    if (v !== G.WATER && v !== G.DEEP) continue;
    const n = noise(x, y, 77);
    if (!lake[y * W + x] && !R.reduced) {
      const ph = (now / 1600 + n) % 1;
      ctx.globalAlpha = 0.28 * Math.sin(ph * Math.PI);
      ctx.fillStyle = '#e8f6f2';
      ctx.fillRect((x + 0.15 + noise(x, y, 78) * 0.6) * u, (y + ph) * u, Math.max(1, u * 0.04), u * 0.26);
    }
    if (n < 0.45) {
      const tw = R.reduced ? 0.5 : Math.max(0, Math.sin(now / 520 + n * 40));
      if (tw < 0.05) continue;
      ctx.globalAlpha = 0.75 * tw * tw;
      ctx.fillStyle = '#ffffff';
      const gx = (x + 0.15 + noise(x, y, 79) * 0.7) * u, gy = (y + 0.15 + noise(x, y, 80) * 0.7) * u, r = u * (0.05 + 0.05 * tw);
      ctx.beginPath(); ctx.moveTo(gx - r * 2.2, gy); ctx.lineTo(gx, gy - r * 0.7); ctx.lineTo(gx + r * 2.2, gy); ctx.lineTo(gx, gy + r * 0.7); ctx.closePath(); ctx.fill();
    }
  }
  ctx.restore();
}

// Steam: soft puffs from the hot springs and pools, bathhouse vents on the Row, and the creek on cold mornings.
let puffC = null;
function puff() {
  if (puffC) return puffC;
  puffC = document.createElement('canvas'); puffC.width = puffC.height = 64;
  const g = puffC.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,0.9)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.45)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return puffC;
}
const ROW_BATHS = new Set(['bath1', 'bath2', 'bath3', 'bath4', 'freebath', 'bathhouse', 'spa', 'brewery', 'center', 'hale']);
function steamFor(gm, sx0, sy0, sx1, sy1, dt) {
  if (R.reduced) return;
  const S = gm.S, ps = R.particles;
  if (ps.length > 240) return;
  const cold = (S.time < 620 && (sim.season(S) === 'wi' || sim.season(S) === 'fa')) || S.weather === 'fog' || S.weather === 'snow';
  const rate = (S.ch === 1 ? 1.4 : 1) * (cold ? 1.6 : 1);
  const add = (x, y, s, life, vy) => ps.push({ x, y, vx: (Math.random() - 0.5) * 0.004, vy, life, max: life, col: '#ffffff', s, steam: true });
  for (const k of Object.keys(gm.world.special)) {
    const [x, y] = k.split(',').map(Number);
    if (x < sx0 - 1 || x > sx1 + 1 || y < sy0 - 1 || y > sy1 + 3) continue;
    if (gm.world.special[k] === 'cold') continue;
    if (Math.random() < 0.09 * dt * rate) add(x + 0.2 + Math.random() * 0.6, y + 0.2, 0.2 + Math.random() * 0.14, 170, -0.013);
  }
  for (const b of gm.world.buildings) {
    if (!ROW_BATHS.has(b.id) || b.x + b.w < sx0 || b.x > sx1 || b.y > sy1 || b.y + 1 < sy0 - 2) continue;
    if (Math.random() < 0.035 * dt * rate) add(b.x + b.w * (0.35 + Math.random() * 0.3), b.y + 0.6, 0.22 + Math.random() * 0.15, 120, -0.012);
  }
  if (cold) for (let y = Math.max(4, sy0); y <= Math.min(H - 1, sy1); y++) {
    if (Math.random() < 0.012 * dt) add(22 + Math.random() * 2, y + Math.random(), 0.35, 170, -0.006);
  }
}
function drawParticles(ctx, u, dt) {
  R.particles = R.particles.filter((p) => (p.life -= dt) > 0);
  const pf = puff();
  for (const p of R.particles) {
    p.x += p.vx * dt; p.y += p.vy * dt;
    if (p.steam) {
      const t = 1 - p.life / p.max; // 0 → 1 over the puff's life
      const a = Math.min(1, t * 2.5) * (1 - t) * 0.42, r = p.s * u * (0.5 + t * 2.2);
      p.vx += (Math.random() - 0.5) * 0.0006 * dt;
      ctx.globalAlpha = a; ctx.drawImage(pf, p.x * u - r, p.y * u - r, r * 2, r * 2);
    } else if (p.ring) {
      const t = 1 - p.life / p.max;
      ctx.globalAlpha = (1 - t) * 0.8; ctx.strokeStyle = p.col; ctx.lineWidth = Math.max(1, u * 0.04 * (1 - t));
      ctx.beginPath(); ctx.ellipse(p.x * u, p.y * u, u * (0.15 + t * 0.45), u * (0.06 + t * 0.18), 0, 0, 7); ctx.stroke();
    } else if (p.dust) {
      const t = 1 - p.life / p.max, r = p.s * u * (0.6 + t * 1.4);
      ctx.globalAlpha = (1 - t) * 0.35; ctx.fillStyle = p.col; ctx.beginPath(); ctx.arc(p.x * u, p.y * u, r, 0, 7); ctx.fill();
    } else if (p.heart) {
      const t = 1 - p.life / p.max, s = p.s * u, hx = (p.x + Math.sin(t * 9 + p.s * 40) * 0.08) * u, hy = p.y * u;
      ctx.globalAlpha = Math.min(1, (1 - t) * 2.5); ctx.fillStyle = '#e8506a'; ctx.strokeStyle = '#5a1a26'; ctx.lineWidth = Math.max(1, u * 0.025);
      ctx.beginPath(); ctx.moveTo(hx, hy + s * 0.35); ctx.bezierCurveTo(hx - s * 0.9, hy - s * 0.25, hx - s * 0.35, hy - s * 0.85, hx, hy - s * 0.3); ctx.bezierCurveTo(hx + s * 0.35, hy - s * 0.85, hx + s * 0.9, hy - s * 0.25, hx, hy + s * 0.35); ctx.fill(); ctx.stroke();
    } else {
      p.vy += 0.0055 * dt;
      if (p.ground && p.y > p.ground && p.vy > 0) { p.y = p.ground; p.vy *= -0.35; p.vx *= 0.6; }
      ctx.globalAlpha = Math.min(1, p.life / 10); ctx.fillStyle = p.col;
      if (p.round) { ctx.beginPath(); ctx.arc(p.x * u, p.y * u, p.s * u * 0.5, 0, 7); ctx.fill(); } else { ctx.save(); ctx.translate(p.x * u, p.y * u); ctx.rotate(p.life * 0.3); ctx.fillRect(-p.s * u / 2, -p.s * u / 4, p.s * u, p.s * u / 2); ctx.restore(); }
      if (p.spark) { ctx.globalAlpha *= 0.4; ctx.beginPath(); ctx.arc(p.x * u, p.y * u, p.s * u * 1.3, 0, 7); ctx.fill(); }
    }
  }
  ctx.globalAlpha = 1;
}

// Atmosphere: one quarter-resolution overlay canvas (scaled up by the browser) carries the era tint, the
// time-of-day colour (dawn rose, golden hour, dusk violet), the weather colour and drifting fog, and at night
// the darkness with soft holes for each light: lamps pool their light on the ground, lit windows glow on
// building fronts after dusk, and the player carries a light only when it is truly dark.
const NS = 4;
const gradSprites = new Map();
function gradSprite(col) {
  let c = gradSprites.get(col);
  if (c) return c;
  c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, col === 'hole' ? 'rgba(0,0,0,0.95)' : rgba(col, 1)); gr.addColorStop(1, col === 'hole' ? 'rgba(0,0,0,0)' : rgba(col, 0));
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  gradSprites.set(col, c);
  return c;
}
let fogC = null;
function fogSprite() {
  if (fogC) return fogC;
  fogC = document.createElement('canvas'); fogC.width = fogC.height = 256;
  const g = fogC.getContext('2d');
  for (let i = 0; i < 26; i++) {
    const x = noise(i, 11) * 256, y = noise(i, 12) * 256, r = 40 + noise(i, 13) * 70;
    for (const [ox, oy] of [[0, 0], [256, 0], [-256, 0], [0, 256], [0, -256], [256, 256], [-256, -256], [256, -256], [-256, 256]]) {
      const gr = g.createRadialGradient(x + ox, y + oy, 0, x + ox, y + oy, r);
      gr.addColorStop(0, 'rgba(240,244,246,0.5)'); gr.addColorStop(1, 'rgba(240,244,246,0)');
      g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
    }
  }
  return fogC;
}
const ERA_TINT = { 1: ['#2f5a48', 0.07], 2: ['#a07850', 0.09], 3: ['#c89040', 0.05], 4: ['#e8b878', 0.07], 5: ['#ff9060', 0.04], 6: ['#3a6a98', 0.04] };
function todTint(t) {
  if (t < 450) return ['#ff9a7a', 0.2 * (450 - t) / 90];
  if (t < 960) return null;
  if (t < 1110) return ['#ffa848', 0.38 * (t - 960) / 150];
  if (t < 1220) return [t < 1160 ? '#e8806a' : '#9a5a9a', 0.17];
  return null;
}
const NEON = { 4: { club: '#ff4a6a', court: '#4fd8ff', radio: '#ffb040' }, 5: { motel: '#ff5a7a', drivein: '#4fe0ff', store: '#ffcf4a', zoo: '#ff8a3a' } };
function nightPass(gm, P, cam, now) {
  const S = gm.S;
  const d = sim.darkness(S);
  const el = R.nightEl;
  const fog = S.weather === 'fog' && S.time < 720 ? Math.min(1, (720 - S.time) / 200) : 0;
  const W2 = R.canvas.width, H2 = R.canvas.height, u = R.u;
  const w = Math.ceil(W2 / NS), h = Math.ceil(H2 / NS);
  if (el.width !== w || el.height !== h) { el.width = w; el.height = h; }
  const n = el.getContext('2d');
  n.globalCompositeOperation = 'source-over'; n.globalAlpha = 1;
  n.clearRect(0, 0, w, h);
  R.nightOn = true;
  // Era, hour and weather colour.
  const [ec, ea] = ERA_TINT[S.ch] || ERA_TINT[1];
  n.fillStyle = rgba(ec, ea * (1 - d) * (1 - fog)); n.fillRect(0, 0, w, h);
  const tt = todTint(S.time);
  if (tt) { n.fillStyle = rgba(tt[0], tt[1]); n.fillRect(0, 0, w, h); }
  if (S.weather === 'rain') { n.fillStyle = 'rgba(40,52,72,0.2)'; n.fillRect(0, 0, w, h); }
  if (S.weather === 'snow') { n.fillStyle = 'rgba(214,226,240,0.12)'; n.fillRect(0, 0, w, h); }
  if (fog) {
    const f = fogSprite(), fs = 256 * u / 64 / NS;
    for (const [sp, a, k] of [[0.006, 0.55, 0], [0.011, 0.4, 1]]) {
      n.globalAlpha = a * fog;
      const ox = -(((cam.x * u / NS) * (1 + k * 0.3) + (R.reduced ? 0 : now * sp)) % fs) - fs, oy = -(((cam.y * u / NS) * (1 + k * 0.3)) % fs) - fs;
      for (let y = oy; y < h; y += fs) for (let x = ox; x < w; x += fs) n.drawImage(f, x, y, fs, fs);
    }
    n.globalAlpha = 1;
    n.fillStyle = `rgba(232,238,240,${0.22 * fog})`; n.fillRect(0, 0, w, h);
  }
  if (d <= 0.01) return;
  n.fillStyle = rgba(NIGHT[S.ch], S.time < 480 ? d * 0.55 : d); n.fillRect(0, 0, w, h);
  n.globalCompositeOperation = 'destination-out';
  const hole = gradSprite('hole');
  const glows = [];
  const cut = (wx, wy, rx, ry, col, ga) => {
    const sx = (wx - cam.x) * u, sy = (wy - cam.y) * u;
    if (sx < -rx * u || sy < -ry * u || sx > W2 + rx * u || sy > H2 + ry * u) return;
    n.drawImage(hole, (sx - rx * u) / NS, (sy - ry * u) / NS, 2 * rx * u / NS, 2 * ry * u / NS);
    if (col) glows.push([sx, sy, rx, ry, col, ga]);
  };
  for (const l of gm.world.lamps) {
    const L = LIGHT[l.k]; if (!L) continue;
    const col = l.k === 'neon' ? '#ffd8a0' : L.col;
    if (l.post) { cut(l.x, l.y + 0.15, L.r * 0.95, L.r * 0.6, col, 0.34); cut(l.x, l.y - 1.25, 0.5, 0.5, col, 0.6); }
    else cut(l.x, l.y + 0.5, L.r * 0.8, L.r * 0.5, col, 0.3);
  }
  // Lit windows: most buildings with people in them, varied per building and fading out late at night.
  if (S.time > 1050 && S.time < 1440) for (const b of gm.world.buildings) {
    if (!(b.place || b.label || b.id === 'farmhouse')) continue;
    const late = S.time > 1350 ? (1440 - S.time) / 90 : 1;
    if (noise(b.x, b.y, 91) > 0.85) continue;
    const wy = b.y + b.h - (b.w >= 10 ? 1.9 : 1.55);
    const k = b.w >= 10 ? 5 : 3;
    for (let i = 0; i < k; i++) if (noise(b.x + i, b.y, 92) < 0.8) cut(b.x + b.w * (i + 0.5) / k, wy, 0.42, 0.34, '#ffcf7a', 0.55 * late);
  }
  // Signs light up after dark: neon in 1931 and 1955, warm floodlit boards otherwise.
  for (const b of gm.world.buildings) {
    if (!b.label) continue;
    const sp = PA.buildingSprite(S.ch, b, u); if (!sp) continue;
    const neon = NEON[S.ch] && NEON[S.ch][b.id];
    cut((sp.x + sp.w / 2) / u, (sp.y + sp.h * (b.w >= 10 ? 0.5 : 0.56)) / u, neon ? 1.7 : 1.1, neon ? 0.75 : 0.45, neon || '#ffe2b0', neon ? 0.8 : 0.35);
  }
  if (d > 0.45) cut(S.player.x, S.player.y - 0.4, 1.9, 1.4, S.ch === 1 ? '#ffb060' : '#ffd8a0', 0.12);
  // Coloured light inside each hole.
  n.globalCompositeOperation = 'source-over';
  for (const [sx, sy, rx, ry, col, ga] of glows) {
    n.globalAlpha = ga * d;
    n.drawImage(gradSprite(col), (sx - rx * u * 0.8) / NS, (sy - ry * u * 0.8) / NS, 1.6 * rx * u / NS, 1.6 * ry * u / NS);
  }
  n.globalAlpha = 1;
}

// ---------- vista (title, era wipe) ----------
export function vista(ctx, w, h, ch, sea = 'sp') {
  // The painted panorama of this era, cover-fitted with its focus a little right of centre (the town).
  const im = artImg('vista-' + ch);
  if (im) {
    const k = Math.max(w / im.naturalWidth, h / im.naturalHeight), dw = im.naturalWidth * k, dh = im.naturalHeight * k;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(im, Math.min(0, Math.max(w - dw, w / 2 - dw * 0.56)), (h - dh) / 2, dw, dh);
    const vg = ctx.createRadialGradient(w / 2, h * 0.45, Math.min(w, h) * 0.3, w / 2, h * 0.5, Math.max(w, h) * 0.75);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(10,8,6,0.45)');
    ctx.fillStyle = vg; ctx.fillRect(0, 0, w, h);
    return;
  }
  const P = palette(ch, sea);
  const tok = P.tok;
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.7);
  const skyTop = { 1: '#7aa0b8', 2: '#a8bcc8', 3: '#c8d8e0', 4: '#2f7fc6', 5: '#8fd0e8', 6: '#f2a541' }[ch];
  const skyBot = { 1: '#d8e4e0', 2: '#e8e0d0', 3: '#f2e8d0', 4: '#a7ddf2', 5: '#fff6e0', 6: '#f6d8b8' }[ch];
  sky.addColorStop(0, skyTop); sky.addColorStop(1, skyBot);
  ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
  // Far ridges (the Ouachitas run east-west).
  const ridge = (y0, amp, col, k) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, h); for (let x = 0; x <= w; x += w / 40) ctx.lineTo(x, y0 + Math.sin(x / w * 6 + k) * amp + Math.sin(x / w * 17 + k * 2) * amp * 0.3); ctx.lineTo(w, h); ctx.fill(); };
  ridge(h * 0.42, h * 0.04, mix(P.forest, skyBot, 0.55), 1);
  ridge(h * 0.5, h * 0.05, mix(P.forest, skyBot, 0.3), 2.2);
  ridge(h * 0.6, h * 0.035, P.forest, 3.1);
  // Valley floor and creek.
  ctx.fillStyle = P.grass; ctx.fillRect(0, h * 0.68, w, h * 0.32);
  ctx.fillStyle = ch >= 4 ? P.water : P.water; ctx.beginPath(); ctx.moveTo(w * 0.42, h * 0.68); ctx.quadraticCurveTo(w * 0.35, h * 0.82, w * 0.48, h); ctx.lineTo(w * 0.56, h); ctx.quadraticCurveTo(w * 0.42, h * 0.84, w * 0.46, h * 0.68); ctx.fill();
  if (ch >= 4) { ctx.fillStyle = P.water; ctx.beginPath(); ctx.ellipse(w * 0.5, h * 1.02, w * 0.45, h * 0.12, 0, 0, 7); ctx.fill(); }
  // Town silhouette by era.
  const base = h * 0.68, sw = w / 28;
  const bcol = P.wall, rcol = P.roof;
  const blds = { 1: [[16, 1.2, 1]], 2: [[14, 1.5, 1.5], [16, 1.8, 1.2], [18, 1.4, 1.5]], 3: [[13, 2.4, 2], [15.5, 1.8, 1.5], [17.5, 2.8, 2.5], [20, 2, 1.6]],
    4: [[12, 2.2, 1.8], [14.3, 2.6, 1.6], [16.4, 3.8, 3], [19.8, 2.2, 1.6], [22, 4.4, 0.3]], 5: [[12, 2, 1.6], [14, 2.4, 1.6], [16.2, 4.6, 3.2], [20, 1.6, 2.4]], 6: [[12, 2.2, 1.6], [14.2, 2.6, 1.6], [16.4, 3.8, 3], [20, 2.2, 2.2]] }[ch];
  for (const [x, hh, ww] of blds) { ctx.fillStyle = shade(bcol, -0.1); ctx.fillRect(x * sw, base - hh * sw, ww * sw, hh * sw); ctx.fillStyle = rcol; ctx.fillRect(x * sw - sw * 0.1, base - hh * sw - sw * 0.25, ww * sw + sw * 0.2, sw * 0.3); }
  // Farm on the left.
  ctx.fillStyle = shade(P.wood, -0.1); ctx.fillRect(sw * 4, base + sw * 0.4, sw * 2.2, sw * 1.4); ctx.fillStyle = P.roof; ctx.beginPath(); ctx.moveTo(sw * 3.8, base + sw * 0.45); ctx.lineTo(sw * 5.1, base - sw * 0.5); ctx.lineTo(sw * 6.4, base + sw * 0.45); ctx.fill();
  for (let i = 0; i < 5; i++) { ctx.fillStyle = shade(P.grass, i % 2 ? -0.12 : 0.05); ctx.fillRect(sw * (2 + i * 1.2), base + sw * 2.2, sw * 1.0, sw * 2); }
  // Steam off the hillside.
  for (let i = 0; i < 7; i++) { ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); ctx.ellipse(w * (0.78 + i * 0.02), h * (0.52 - i * 0.03), w * (0.03 + i * 0.006), h * 0.035, 0, 0, 7); ctx.fill(); }
}
