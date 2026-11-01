#!/usr/bin/env node
// Review captures on the real GPU for the pixel-art campaign: the canonical frames in tools/review-shots.json,
// rendered by the installed Chrome (headless, ANGLE/D3D11) from file://. Also writes nearest-neighbour close-ups,
// 8-frame motion strips, an index (shots.json) for the review brief, and runs the pixel-integrity check.
//
//   node games/farm-sim/tools/shots-gpu.mjs <out=review-loop-0> [--only=R04,R10] [--viewports=desktop,mobile]
//        [--query=style=pixel] [--no-crops] [--no-strips] [--verify] [--max-bad=0.004]
//
// Output: games/farm-sim/screenshots/<out>/<viewport>/<id>.png, crops/<id>-<name>.png, strips/<id>.png, shots.json.
// Pixel integrity (hard gate): with the pixel style, every k×k block of device pixels (k = device px per art px)
// outside the DOM UI must be one colour. The share of mixed blocks per frame must stay under --max-bad; the
// worst frames are listed in shots.json. --verify captures R04 twice and fails if the two differ.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const GAME = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.resolve(GAME, '..', '..');
const require = createRequire(path.resolve(ROOT, 'shared', 'test-harness', 'package.json'));
const { chromium } = require('playwright');
const args = process.argv.slice(2);
const opt = (k, d) => { const a = args.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const out = args.find((a) => !a.startsWith('--')) || 'review-loop-0';
const ONLY = opt('only', '') ? opt('only', '').split(',') : null;
const VPS = opt('viewports', 'desktop,mobile').split(',');
const QUERY = opt('query', 'style=pixel'), MAXBAD = +opt('max-bad', '0.004');
const CROPS = !args.includes('--no-crops'), STRIPS = !args.includes('--no-strips'), VERIFY = args.includes('--verify');
const SPEC = JSON.parse(fs.readFileSync(path.join(GAME, 'tools', 'review-shots.json'), 'utf8'));
const VIEW = { desktop: [{ width: 1280, height: 800 }, 1], mobile: [{ width: 390, height: 844 }, 2] };
const dirOut = path.join(GAME, 'screenshots', out);
const url = pathToFileURL(path.join(GAME, 'index.html')).href + (QUERY ? '?' + QUERY : '');
const GPU_ARGS = ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--allow-file-access-from-files'];
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: GPU_ARGS }).catch(() => chromium.launch({ headless: true, args: GPU_ARGS }));

const problems = [];
const index = { out, made: new Date().toISOString(), query: QUERY, tiers: [], gpu: null, integrity: { ok: true, maxBad: MAXBAD, bad: [], frames: {} }, shots: [] };
const save = (file, buf) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, buf); return path.relative(dirOut, file).split(path.sep).join('/'); };
const frames = (page, n = 3) => page.evaluate((n) => new Promise((r) => { let k = 0; const f = () => (++k >= n ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }), n);

// Image work (crops, strips, integrity) happens in a blank page's canvas: no image libraries needed.
const lab = await (await browser.newContext()).newPage();
await lab.setContent('<!doctype html><body></body>');
const b64 = (buf) => 'data:image/png;base64,' + buf.toString('base64');
const fromData = (d) => Buffer.from(d.split(',')[1], 'base64');
async function crop(buf, x, y, w, h, scale) {
  return fromData(await lab.evaluate(async ({ src, x, y, w, h, scale }) => {
    const im = new Image(); im.src = src; await im.decode();
    const c = document.createElement('canvas'); c.width = Math.round(w * scale); c.height = Math.round(h * scale);
    const g = c.getContext('2d'); g.imageSmoothingEnabled = false; g.drawImage(im, x, y, w, h, 0, 0, c.width, c.height);
    return c.toDataURL('image/png');
  }, { src: b64(buf), x, y, w, h, scale }));
}
// A character close-up beside its period reference image (research/refs), both at the same height.
async function besideRef(buf, refPath) {
  if (!refPath || !fs.existsSync(refPath)) return buf;
  const ref = 'data:image/jpeg;base64,' + fs.readFileSync(refPath).toString('base64');
  return fromData(await lab.evaluate(async ({ src, ref }) => {
    const a = new Image(); a.src = src; await a.decode(); const b = new Image(); b.src = ref; await b.decode();
    const h = a.height, bw = Math.round(b.width * h / b.height), c = document.createElement('canvas'); c.width = a.width + 8 + bw; c.height = h + 22;
    const g = c.getContext('2d'); g.fillStyle = '#111'; g.fillRect(0, 0, c.width, c.height); g.imageSmoothingEnabled = false; g.drawImage(a, 0, 22);
    g.imageSmoothingEnabled = true; g.drawImage(b, a.width + 8, 22, bw, h);
    g.fillStyle = '#fff'; g.font = 'bold 14px sans-serif'; g.fillText('in game', 4, 16); g.fillText('period reference (research/refs)', a.width + 12, 16);
    return c.toDataURL('image/png');
  }, { src: b64(buf), ref }));
}
async function strip(bufs, labelPx = 18) {
  return fromData(await lab.evaluate(async ({ srcs, labelPx }) => {
    const ims = await Promise.all(srcs.map(async (s) => { const im = new Image(); im.src = s; await im.decode(); return im; }));
    const w = ims[0].width, h = ims[0].height, c = document.createElement('canvas'); c.width = w * ims.length + 4 * (ims.length - 1); c.height = h + labelPx + 4;
    const g = c.getContext('2d'); g.fillStyle = '#111'; g.fillRect(0, 0, c.width, c.height); g.imageSmoothingEnabled = false;
    ims.forEach((im, i) => { g.drawImage(im, i * (w + 4), labelPx + 4); g.fillStyle = '#fff'; g.font = `bold ${labelPx - 4}px sans-serif`; g.fillText(String(i + 1), i * (w + 4) + 4, labelPx); });
    return c.toDataURL('image/png');
  }, { srcs: bufs.map(b64), labelPx }));
}
// Share of k×k blocks (aligned to the canvas origin) that are not one colour, outside the excluded rects.
async function integrity(buf, k, skip) {
  return lab.evaluate(async ({ src, k, skip }) => {
    const im = new Image(); im.src = src; await im.decode();
    const c = document.createElement('canvas'); c.width = im.width; c.height = im.height;
    const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(im, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data, W = c.width;
    let n = 0, bad = 0;
    const inSkip = (x, y) => skip.some((r) => x + k > r.x && x < r.x + r.w && y + k > r.y && y < r.y + r.h);
    for (let by = 0; by + k <= c.height; by += k) for (let bx = 0; bx + k <= W; bx += k) {
      if (inSkip(bx, by)) continue;
      n++;
      const i0 = (by * W + bx) * 4;
      let same = true;
      for (let y = 0; y < k && same; y++) for (let x = 0; x < k; x++) { const i = ((by + y) * W + bx + x) * 4; if (Math.abs(d[i] - d[i0]) > 3 || Math.abs(d[i + 1] - d[i0 + 1]) > 3 || Math.abs(d[i + 2] - d[i0 + 2]) > 3) { same = false; break; } }
      if (!same) bad++;
    }
    return { blocks: n, bad, share: n ? bad / n : 0 };
  }, { src: b64(buf), k, skip });
}

async function setup(page, s) {
  if (s.title_screen) { await page.evaluate(() => window.__game.scene('title')); await frames(page, 4); return; }
  await page.evaluate((s) => {
    const g = window.__game; g.seed(7); g.scene(s.scene);
    if (s.setup) g.setState(s.setup);
    if (s.plot) { // a strip of tilled, watered soil with each crop at five growth stages (rows), for readability
      const st = { crops: [] };
      s.plot.crops.forEach((id, i) => { for (let r = 0; r < 5; r++) st.crops.push({ x: s.plot.x + i, y: s.plot.y + r, id, age: r * 2, watered: r % 2 === 0 }); });
      g.setState(st);
    }
    if (s.tool) g.act('selectItem', s.tool);
    // Staging so characters can be judged: neighbours placed round the player, animals in the pen.
    if (s.npcsNear || s.talk) {
      const st = g.getState(), ids = st.npcs.map((n) => n.id).slice(0, 3), p = st.player;
      const spots = [[-1.6, -0.2], [1.6, -0.2], [0, -1.6]];
      g.setState({ npcs: Object.fromEntries(ids.map((id, i) => [id, { hidden: false, x: p.x + spots[i][0], y: p.y + spots[i][1], face: 'down', path: null, moving: false }])) });
    }
    if (s.animals) g.setState({ animals: s.animals.map(([kind, x, y], i) => ({ kind, x, y, petDay: -1, born: 0, face: i % 2 ? 'left' : 'right' })) });
    for (const a of s.acts || []) g.act(...a);
  }, s);
  await page.waitForFunction(() => { const st = window.__game.getState(); return st.artPending === 0; }, null, { timeout: 30000 }).catch(() => problems.push(`${s.id}: art still loading`));
  if (s.talk) await page.evaluate(() => { const st = window.__game.getState(); const n = st.npcs.find((n) => !n.hidden) || st.npcs[0]; if (n) window.__game.act('talk', n.id); });
  if (s.modal) await page.evaluate((m) => window.__game.scene(m), s.modal);
  // Warm up 1.5 s of ambient motion (steam, chimney smoke) on a stepped clock, then pin it: frames repeat exactly.
  await page.evaluate(() => { for (let i = 0; i <= 90; i++) { window.__game.act('clock', 48000 + i * 16.7); window.__game.act('render'); } window.__game.act('clock', 49520); window.__game.act('render'); });
  await frames(page, 3);
}
// Device-pixel rect of a tile rect, from the camera and tile size the game reports.
const tileRect = (st, dpr, x, y, w, h) => ({ x: Math.max(0, Math.round((x - st.cam.x) * st.ts * dpr)), y: Math.max(0, Math.round((y - st.cam.y) * st.ts * dpr)), w: Math.round(w * st.ts * dpr), h: Math.round(h * st.ts * dpr) });

for (const vp of VPS) {
  const [viewport, dpr] = VIEW[vp];
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: dpr, isMobile: vp === 'mobile', hasTouch: vp === 'mobile' });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => problems.push(`${vp} pageerror: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') problems.push(`${vp} console: ${m.text()}`); });
  await page.goto(url);
  await page.waitForFunction(() => !!window.__game);
  if (!index.gpu) index.gpu = await page.evaluate(() => { const c = document.createElement('canvas').getContext('webgl'); const e = c && c.getExtension('WEBGL_debug_renderer_info'); return { renderer: e ? c.getParameter(e.UNMASKED_RENDERER_WEBGL) : 'unknown' }; });
  for (const s of SPEC.shots) {
    if (ONLY && !ONLY.includes(s.id)) continue;
    if (vp !== 'desktop' && !s.mobile) continue;
    await setup(page, s);
    const st = await page.evaluate(() => window.__game.getState());
    if (st.px && !index.tiers.includes('T' + st.px.T)) index.tiers.push('T' + st.px.T);
    const buf = await page.screenshot();
    const row = { id: s.id, title: s.title, cats: s.cats, tier: st.px ? 'T' + st.px.T : 'painted', viewport: vp, file: save(path.join(dirOut, vp, `${s.id}.png`), buf), crops: [], strip: null };
    // pixel integrity outside the DOM UI (and canvas text, until the bitmap font lands: name tags are excluded by the threshold)
    if (st.px) {
      const skip = await page.evaluate((dpr) => [...document.querySelectorAll('#hud, #hotbar, #touch, #prompt, #toasts, #screen, #wipe')].flatMap((e) => [e, ...e.querySelectorAll('*')]).map((e) => e.getBoundingClientRect()).filter((r) => r.width && r.height).map((r) => ({ x: (r.x - 24) * dpr, y: (r.y - 24) * dpr, w: (r.width + 48) * dpr, h: (r.height + 48) * dpr })), dpr); // 24 CSS px of margin for panel shadows
      const r = await integrity(buf, st.px.k, skip);
      index.integrity.frames[`${vp}/${s.id}`] = +r.share.toFixed(5);
      if (r.share > MAXBAD) { index.integrity.ok = false; index.integrity.bad.push(`${vp}/${s.id} (${(r.share * 100).toFixed(2)}%)`); }
    }
    if (CROPS && vp === 'desktop' && st.player) {
      for (const [name, x, y, w, h] of s.crops || []) {
        let rect;
        if (name === 'player') rect = tileRect(st, dpr, st.player.x - 1.5, st.player.y - 2.2, 3, 3);
        else if (name === 'npcs') { // every visible neighbour within 4 tiles of the player, plus the player
          const ns = [...st.npcs.filter((n) => !n.hidden && Math.hypot(n.x - st.player.x, n.y - st.player.y) < 4), st.player];
          if (ns.length < 2) continue;
          const x0 = Math.min(...ns.map((n) => n.x)) - 1, x1 = Math.max(...ns.map((n) => n.x)) + 1, y0 = Math.min(...ns.map((n) => n.y)) - 2.6, y1 = Math.max(...ns.map((n) => n.y)) + 0.4;
          rect = tileRect(st, dpr, x0, y0, x1 - x0, y1 - y0);
        }
        else rect = tileRect(st, dpr, x, y, w, h);
        rect.w = Math.min(rect.w, viewport.width * dpr - rect.x); rect.h = Math.min(rect.h, viewport.height * dpr - rect.y);
        if (rect.w < 8 || rect.h < 8) continue;
        const scale = Math.max(1, Math.min(4, Math.floor(900 / Math.max(rect.w, rect.h))));
        let img = await crop(buf, rect.x, rect.y, rect.w, rect.h, scale);
        if (name === 'player' && SPEC.refs && s.scene) img = await besideRef(img, path.join(GAME, SPEC.refs[String(s.scene.era)] || ''));
        row.crops.push({ name, file: save(path.join(dirOut, 'crops', `${s.id}-${name}.png`), img) });
      }
    }
    if (STRIPS && s.strip) {
      const shots = [];
      // The clock is pinned and advanced 50 ms per frame alongside the sim ticks, so time-based animation (tool
      // swings, NPC steps, particles) is sampled at the same moments every capture.
      await page.evaluate(() => window.__game.act('clock', 100000));
      if (s.strip.key) await page.keyboard.down(s.strip.key);
      for (let i = 0; i < 8; i++) {
        if (s.strip.act && i === 0) await page.evaluate((a) => window.__game.act(a), s.strip.act);
        await page.evaluate(([n, i]) => { window.__game.act('clock', 100000 + (i + 1) * 50); window.__game.step(n); }, [s.strip.ticks, i]);
        await page.evaluate(() => window.__game.act('render'));
        await frames(page, 1);
        const st2 = await page.evaluate(() => window.__game.getState());
        const r = tileRect(st2, dpr, st2.player.x - 1.25, st2.player.y - 2.0, 2.5, 2.5);
        shots.push(await crop(await page.screenshot(), r.x, r.y, r.w, r.h, vp === 'desktop' ? 2 : 1));
      }
      if (s.strip.key) await page.keyboard.up(s.strip.key);
      await page.evaluate(() => window.__game.act('clock', null));
      row.strip = save(path.join(dirOut, 'strips', `${s.id}${vp === 'desktop' ? '' : '-' + vp}.png`), await strip(shots));
    }
    await page.evaluate(() => window.__game.act('clock', null));
    index.shots.push(row);
    process.stdout.write(`${vp}/${s.id} `);
  }
  if (VERIFY && vp === 'desktop' && (!ONLY || ONLY.includes('R04'))) {
    const s = SPEC.shots.find((x) => x.id === 'R04');
    await setup(page, s); const a = await page.screenshot();
    await setup(page, s); const b = await page.screenshot();
    const diff = await lab.evaluate(async ({ a, b }) => {
      const load = async (s) => { const im = new Image(); im.src = s; await im.decode(); const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const g = c.getContext('2d'); g.drawImage(im, 0, 0); return g.getImageData(0, 0, c.width, c.height).data; };
      const x = await load(a), y = await load(b); let s = 0; for (let i = 0; i < x.length; i++) s += Math.abs(x[i] - y[i]); return s / x.length;
    }, { a: b64(a), b: b64(b) });
    if (diff > 0.5) problems.push(`verify: R04 differs between two captures (mean ${diff.toFixed(2)}/255)`);
    else console.log(`\nverify: R04 repeatable (mean diff ${diff.toFixed(3)}/255)`);
  }
  await ctx.close();
}
fs.mkdirSync(dirOut, { recursive: true });
fs.writeFileSync(path.join(dirOut, 'shots.json'), JSON.stringify(index, null, 1) + '\n');
await browser.close();
console.log(`\n${index.shots.length} captures → screenshots/${out}/ · pixel integrity: ${index.tiers.length ? (index.integrity.ok ? 'pass' : 'FAIL ' + index.integrity.bad.join(', ')) : 'n/a (not the pixel style)'}`);
if (problems.length) { console.log('problems:\n  ' + problems.join('\n  ')); process.exitCode = 1; }
if (index.tiers.length && !index.integrity.ok) process.exitCode = 1;
