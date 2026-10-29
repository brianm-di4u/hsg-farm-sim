// Frame rendering: chunk-cached ground and buildings, a y-sorted dynamic layer, particles,
// weather and night lighting.
import { W, H, G } from '../sim/world.js';
import * as sim from '../sim/sim.js';
import { PEOPLE, CHAPTERS, QUESTS, ITEMS } from '../sim/data.js';
import { palette, LIGHT, NIGHT, rgba, mix, shade } from './palette.js';
import { drawGround, drawBuilding, personSprite, animalSprite, treeSprite, objSprite, cropSprite, soilSprite, iconCanvas, clearArt } from './art.js';
import { noise } from '../sim/rng.js';

const CHUNK = 16;
export const R = {
  canvas: null, ctx: null, dpr: 1, cssW: 0, cssH: 0, ts: 40, u: 40, cam: { x: 0, y: 0 }, chunks: new Map(),
  particles: [], pops: [], night: null, reduced: false, mobile: false, offsetY: 0, frames: 0, chunkBakes: 0, lastT: 0, hover: null,
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
  const ts = R.mobile ? 34 : (R.cssW >= 1100 ? 44 : 40);
  if (ts !== R.ts || Math.round(ts * R.dpr) !== R.u) { R.ts = ts; R.u = Math.round(ts * R.dpr); R.chunks.clear(); clearArt(); }
  R.offsetY = R.mobile ? -R.cssH * 0.1 : 0;
  R.night = null;
}

function chunkCanvas(gm, cx, cy, P) {
  const S = gm.S;
  const k = `${S.ch}|${P.sea}|${S.houseStyle || ''}|${cx},${cy}|${R.u}`;
  let c = R.chunks.get(k);
  if (c) return c;
  if (R.chunks.size > 14) { const first = R.chunks.keys().next().value; R.chunks.delete(first); }
  const u = R.u;
  c = document.createElement('canvas');
  c.width = CHUNK * u; c.height = CHUNK * u;
  const ctx = c.getContext('2d');
  ctx.translate(-cx * CHUNK * u, -cy * CHUNK * u);
  const g = gm.world.g;
  const at = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? -1 : g[y * W + x]);
  for (let y = cy * CHUNK; y < Math.min(H, (cy + 1) * CHUNK); y++) for (let x = cx * CHUNK; x < Math.min(W, (cx + 1) * CHUNK); x++) {
    drawGround(ctx, at(x, y), x, y, u, P, { n: at(x, y - 1), s: at(x, y + 1), w: at(x - 1, y), e: at(x + 1, y) });
  }
  // Buildings that overlap this chunk (clipped to it).
  ctx.save();
  ctx.beginPath(); ctx.rect(cx * CHUNK * u, cy * CHUNK * u, CHUNK * u, CHUNK * u); ctx.clip();
  for (const b of gm.world.buildings) {
    if (b.x + b.w + 2 < cx * CHUNK || b.x - 2 > (cx + 1) * CHUNK || b.y + b.h < cy * CHUNK || b.y - 1 > (cy + 1) * CHUNK) continue;
    drawBuilding(ctx, b, u, P);
  }
  ctx.restore();
  R.chunks.set(k, c);
  R.chunkBakes++;
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
export function addFx(kind, x, y) {
  const cols = { dirt: '#7a5638', water: '#7ab8e0', spark: '#ffffff', chip: '#c8a070' }[kind] || '#fff';
  for (let i = 0; i < 6; i++) R.particles.push({ x: x + 0.5, y: y + 0.6, vx: (Math.random() - 0.5) * 0.06, vy: -Math.random() * 0.06, life: 24, col: cols, s: 0.07 });
}
function steamFor(gm, sx0, sy0, sx1, sy1, dt) {
  if (R.reduced) return;
  for (const k of Object.keys(gm.world.special)) {
    const [x, y] = k.split(',').map(Number);
    if (x < sx0 - 1 || x > sx1 + 1 || y < sy0 - 1 || y > sy1 + 2) continue;
    if (gm.world.special[k] === 'cold') continue;
    if (Math.random() < 0.08 * dt) R.particles.push({ x: x + 0.3 + Math.random() * 0.4, y: y + 0.4, vx: (Math.random() - 0.5) * 0.004, vy: -0.012, life: 140, col: '#ffffff', s: 0.22, steam: true });
  }
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
  // Chunks.
  for (let cy = Math.max(0, Math.floor(sy0 / CHUNK)); cy <= Math.min(Math.floor((H - 1) / CHUNK), Math.floor(sy1 / CHUNK)); cy++)
    for (let cx = Math.max(0, Math.floor(sx0 / CHUNK)); cx <= Math.min(Math.floor((W - 1) / CHUNK), Math.floor(sx1 / CHUNK)); cx++)
      ctx.drawImage(chunkCanvas(gm, cx, cy, P), Math.round(ox + cx * CHUNK * u), Math.round(oy + cy * CHUNK * u));
  ctx.setTransform(1, 0, 0, 1, Math.round(ox), Math.round(oy));
  // Soil.
  for (const [k, st] of Object.entries(S.soil)) {
    const [x, y] = k.split(',').map(Number);
    if (x < sx0 - 1 || x > sx1 || y < sy0 - 1 || y > sy1) continue;
    ctx.drawImage(soilSprite(st, u), x * u, y * u);
  }
  // Dynamic layer.
  const list = [];
  const inView = (x, y) => x >= sx0 - 2 && x <= sx1 + 1 && y >= sy0 - 1 && y <= sy1 + 3;
  for (const [k, o] of Object.entries(S.objs)) { const [x, y] = k.split(',').map(Number); if (inView(x, y)) list.push({ y: y + 0.95, d: () => drawObj(ctx, o, x, y, P, u) }); }
  for (const f of gm.world.fixed) if (inView(f.x, f.y)) list.push({ y: f.y + 0.95, d: () => drawObj(ctx, f, f.x, f.y, P, u) });
  for (const l of gm.world.lamps) if (l.post && inView(l.x, l.y)) list.push({ y: l.y, d: () => ctx.drawImage(objSprite({ t: 'lamp' }, P, u), (l.x - 0.5) * u, (l.y - 1.5) * u) });
  for (const [k, c] of Object.entries(S.crops)) {
    const [x, y] = k.split(',').map(Number); if (!inView(x, y)) continue;
    list.push({ y: y + 0.9, d: () => { const st = sim.cropStage(c); ctx.drawImage(cropSprite(c.id, st, u), x * u, (y - 0.4) * u); if (st === 4) ripeBadge(ctx, x, y, u, now); } });
  }
  for (const [k, id] of Object.entries(S.forage)) {
    const [x, y] = k.split(',').map(Number); if (!inView(x, y)) continue;
    list.push({ y: y + 0.6, d: () => { ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse((x + 0.5) * u, (y + 0.8) * u, u * 0.25, u * 0.08, 0, 0, 7); ctx.fill(); ctx.drawImage(iconCanvas(id, Math.round(u * 0.7)), (x + 0.15) * u, (y + 0.05) * u); } });
  }
  for (const a of S.animals) list.push({ y: a.y, d: () => ctx.drawImage(animalSprite(a.kind, a.face || 'right', u), (a.x - 0.5) * u, (a.y - 0.95) * u) });
  for (const [id, n] of Object.entries(S.npcs)) {
    if (n.hidden || !inView(Math.floor(n.x), Math.floor(n.y))) continue;
    const p = PEOPLE[id];
    list.push({ y: n.y, d: () => {
      const fr = n.moving && !R.reduced ? (Math.floor(now / 160) % 2) : 0;
      ctx.drawImage(personSprite(id, p.look, n.face || 'down', fr, u), (n.x - 0.5) * u, (n.y - 1.5) * u);
      questBubble(ctx, gm, id, n, u);
    } });
  }
  const pl = S.player;
  const look = CHAPTERS[S.ch].look;
  list.push({ y: pl.y + 0.001, d: () => {
    const fr = pl.moving && !R.reduced ? (Math.floor(pl.walk / 8) % 2) : 0;
    ctx.drawImage(personSprite('player' + S.ch, look, pl.face, fr, u), (pl.x - 0.5) * u, (pl.y - 1.5) * u);
  } });
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
  for (const [id, n] of Object.entries(S.npcs)) {
    if (n.hidden || Math.hypot(n.x - pl.x, n.y - pl.y) > 3.2) continue;
    const name = PEOPLE[id].name.split(' ')[0];
    const w = ctx.measureText(name).width + u * 0.3;
    ctx.fillStyle = 'rgba(16,14,12,0.82)'; ctx.fillRect(n.x * u - w / 2, (n.y - 1.95) * u, w, u * 0.38);
    ctx.fillStyle = '#ffffff'; ctx.fillText(name, n.x * u, (n.y - 1.76) * u);
  }
  // Fishing line.
  if (S.fishing) {
    const f = S.fishing;
    const bx = (f.x + 0.5) * u, by = (f.y + 0.5) * u + (f.phase === 'bite' ? u * 0.12 : Math.sin(now / 300) * u * 0.04);
    ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = Math.max(1, u * 0.025);
    ctx.beginPath(); ctx.moveTo(pl.x * u + u * 0.25, (pl.y - 1.0) * u); ctx.quadraticCurveTo((pl.x * u + bx) / 2, Math.min(by, pl.y * u) - u * 0.6, bx, by); ctx.stroke();
    ctx.fillStyle = '#e03a3a'; ctx.beginPath(); ctx.arc(bx, by, u * 0.1, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(bx - u * 0.1, by - u * 0.02, u * 0.2, u * 0.04);
    if (f.phase === 'bite') bubble(ctx, pl.x * u, (pl.y - 1.9) * u, '!', u, '#f4c542');
  }
  // Particles and pops.
  steamFor(gm, sx0, sy0, sx1, sy1, dt);
  R.particles = R.particles.filter((p) => (p.life -= dt) > 0);
  for (const p of R.particles) {
    p.x += p.vx * dt; p.y += p.vy * dt; if (!p.steam) p.vy += 0.004 * dt;
    if (p.steam) { const a = Math.min(1, p.life / 140) * 0.35; ctx.fillStyle = rgba('#ffffff', a); ctx.beginPath(); ctx.arc(p.x * u, p.y * u, p.s * u * (1.6 - p.life / 140), 0, 7); ctx.fill(); }
    else { ctx.fillStyle = p.col; ctx.fillRect(p.x * u, p.y * u, p.s * u, p.s * u); }
  }
  if (R.reduced) for (const k of Object.keys(gm.world.special)) { if (gm.world.special[k] === 'cold') continue; const [x, y] = k.split(',').map(Number); ctx.fillStyle = 'rgba(255,255,255,0.28)'; ctx.beginPath(); ctx.ellipse((x + 0.5) * u, (y - 0.1) * u, u * 0.35, u * 0.25, 0, 0, 7); ctx.fill(); }
  R.pops = R.pops.filter((p) => (p.t += dt) < 50);
  for (const p of R.pops) {
    const a = Math.min(1, (50 - p.t) / 15), lift = R.reduced ? 0.5 : p.t * 0.02;
    ctx.globalAlpha = a;
    ctx.drawImage(iconCanvas(p.item, Math.round(u * 0.6)), (p.x - 0.3) * u, (p.y - 1.2 - lift) * u);
    if (p.n > 1) { ctx.font = `bold ${Math.round(u * 0.3)}px system-ui, sans-serif`; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#000'; ctx.lineWidth = u * 0.06; ctx.strokeText('×' + p.n, (p.x + 0.35) * u, (p.y - 0.75 - lift) * u); ctx.fillText('×' + p.n, (p.x + 0.35) * u, (p.y - 0.75 - lift) * u); }
    ctx.globalAlpha = 1;
  }
  // Screen-space overlays.
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  weather(ctx, S, now, dt);
  nightPass(gm, P, cam);
}

function drawObj(ctx, o, x, y, P, u) {
  if (o.t === 'tree') ctx.drawImage(treeSprite(o.k || 'pine', P, u), (x - 0.2) * u, (y - 1.2) * u);
  else ctx.drawImage(objSprite(o, P, u), x * u, (y - 0.5) * u);
}
function ripeBadge(ctx, x, y, u, now) {
  const by = (y - 0.55) * u + (R.reduced ? 0 : Math.sin(now / 280 + x) * u * 0.04);
  ctx.lineWidth = Math.max(2, u * 0.06); ctx.strokeStyle = 'rgba(16,14,12,0.9)';
  ctx.beginPath(); ctx.arc((x + 0.82) * u, by, u * 0.12, 0, 7); ctx.stroke();
  ctx.strokeStyle = '#fff6c0'; ctx.lineWidth = Math.max(1, u * 0.035); ctx.stroke();
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
  bubble(ctx, n.x * u + u * 0.32, (n.y - 1.65) * u, ready ? '✓' : '!', u, ready ? '#8fe08a' : '#f4c542');
}

function weather(ctx, S, now, dt) {
  const w = R.canvas.width, h = R.canvas.height;
  if (S.weather === 'rain' || S.weather === 'snow') {
    ctx.fillStyle = S.weather === 'rain' ? 'rgba(40,50,70,0.18)' : 'rgba(220,230,240,0.12)'; ctx.fillRect(0, 0, w, h);
    const n = R.reduced ? 40 : 110;
    for (let i = 0; i < n; i++) {
      const sp = S.weather === 'rain' ? 0.9 : 0.12;
      const x = (noise(i, 1) * w + (R.reduced ? 0 : now * 0.05 * (S.weather === 'rain' ? 0.3 : 0.4))) % w;
      const y = (noise(i, 2) * h + (R.reduced ? 0 : now * sp)) % h;
      if (S.weather === 'rain') { ctx.strokeStyle = 'rgba(200,220,255,0.45)'; ctx.lineWidth = R.dpr; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 3 * R.dpr, y + 12 * R.dpr); ctx.stroke(); }
      else { ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.arc(x, y, 2 * R.dpr, 0, 7); ctx.fill(); }
    }
  }
  if (S.weather === 'fog' && S.time < 660) {
    const a = 0.4 * Math.min(1, (660 - S.time) / 180);
    const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, rgba('#ffffff', a)); g.addColorStop(1, rgba('#e8eef0', a * 0.6));
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }
}

// Night: a quarter-resolution dark layer with soft holes cut at each light (pre-drawn gradient
// sprites, no per-frame gradients), scaled up, then additive glow sprites on top.
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
function nightPass(gm, P, cam) {
  const S = gm.S;
  const d = sim.darkness(S);
  const el = R.nightEl;
  if (d <= 0.01) { if (R.nightOn) { el.getContext('2d').clearRect(0, 0, el.width, el.height); R.nightOn = false; } return; }
  R.nightOn = true;
  const W2 = R.canvas.width, H2 = R.canvas.height, u = R.u;
  const w = Math.ceil(W2 / NS), h = Math.ceil(H2 / NS);
  if (el.width !== w || el.height !== h) { el.width = w; el.height = h; }
  const n = el.getContext('2d');
  n.globalCompositeOperation = 'source-over';
  n.clearRect(0, 0, w, h);
  n.fillStyle = rgba(NIGHT[S.ch], d); n.fillRect(0, 0, w, h);
  n.globalCompositeOperation = 'destination-out';
  const hole = gradSprite('hole');
  const lights = [];
  for (const l of gm.world.lamps) lights.push(l);
  lights.push({ x: S.player.x, y: S.player.y - 0.6, k: 'self' });
  const vis = [];
  for (const l of lights) {
    const sx = (l.x - cam.x) * u, sy = (l.y - cam.y) * u;
    const L = LIGHT[l.k] || { r: 1.7 };
    const r = (l.k === 'self' ? 1.8 : L.r) * u;
    if (sx < -r || sy < -r || sx > W2 + r || sy > H2 + r) continue;
    n.drawImage(hole, (sx - r) / NS, (sy - r) / NS, 2 * r / NS, 2 * r / NS);
    if (l.k !== 'self' && LIGHT[l.k]) vis.push({ sx, sy, L, l });
  }
  // Warm light tint inside each hole, on the same low-res overlay (scaled up by the browser).
  n.globalCompositeOperation = 'source-over'; n.globalAlpha = 0.28 * d;
  for (const { sx, sy, L, l } of vis) {
    const r = L.r * u * 0.75 / NS;
    const col = L.alt && (Math.floor(l.x) % 2) ? L.alt : L.col;
    n.drawImage(gradSprite(col), sx / NS - r, sy / NS - r, 2 * r, 2 * r);
  }
  n.globalAlpha = 1;

}

// ---------- vista (title, era wipe) ----------
export function vista(ctx, w, h, ch, sea = 'sp') {
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
