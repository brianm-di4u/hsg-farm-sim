#!/usr/bin/env node
// Frame rate and frame cost on the real GPU (installed Chrome, headless, ANGLE/D3D11, vsync off so headroom shows)
// for the busiest scenes, per viewport, while the player walks. --throttle=N adds CDP CPU throttling (4 ≈ a mid-range
// phone, 6 ≈ a low-end one). --software uses the harness's SwiftShader instead of the GPU.
//
//   node games/farm-sim/tools/perf-gpu.mjs [--viewports=desktop,mobile] [--throttle=4] [--query=style=pixel]
//        [--software] [--out=games/farm-sim/reviews/loop-0/perf.json]
//
// Rows: { tier, viewport, scene, throttle, gpu, fps, p50, p95, worst, scriptMs, heapMB }. With --out, rows merge
// into the file (same tier/viewport/scene/throttle/gpu replaced), so throttled and normal runs share one perf.json.
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
const VPS = opt('viewports', 'desktop,mobile').split(','), THROTTLE = +opt('throttle', '1'), OUT = opt('out', '');
const QUERY = opt('query', 'style=pixel'), SOFT = args.includes('--software');
const VIEW = { desktop: [{ width: 1280, height: 800 }, 1], mobile: [{ width: 390, height: 844 }, 3] };
const SCENES = [
  ['1931 town, night, rain', { era: 4, at: 'town', time: 1290, weather: 'rain' }],
  ['1886 town, snow', { era: 3, at: 'town', time: 640, day: 24, weather: 'snow' }],
  ['1886 springs, fog', { era: 3, at: 'promenade', time: 420, day: 3, weather: 'fog' }],
  ['2026 lake, evening', { era: 6, at: 'lake', time: 1110 }],
  ['1871 farm, day', { era: 2, at: 'farmDoor', time: 700 }],
];
const url = pathToFileURL(path.join(GAME, 'index.html')).href + (QUERY ? '?' + QUERY : '');
const launch = SOFT ? { headless: true } : { channel: 'chrome', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--disable-gpu-vsync', '--disable-frame-rate-limit'] };
const browser = await chromium.launch(launch).catch(() => chromium.launch({ ...launch, channel: undefined }));
const rows = [];
for (const vp of VPS) {
  const [viewport, dpr] = VIEW[vp];
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: dpr, isMobile: vp === 'mobile', hasTouch: vp === 'mobile' });
  const page = await ctx.newPage();
  if (THROTTLE > 1) { const cdp = await ctx.newCDPSession(page); await cdp.send('Emulation.setCPUThrottlingRate', { rate: THROTTLE }); }
  await page.goto(url);
  await page.waitForFunction(() => !!window.__game);
  const tier = await page.evaluate(() => { const s = window.__game.getState(); return s.px ? 'T' + s.px.T : 'painted'; });
  for (const [name, sc] of SCENES) {
    await page.evaluate((sc) => { window.__game.seed(7); window.__game.scene(sc); window.__game.act('closeAll'); window.__game.resume(); }, sc); // closeAll: a scene can open a quest card
    await page.waitForFunction(() => { const s = window.__game.getState(); return s.artPending === 0 && s.artLoaded >= s.artTotal; }, null, { timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(800); // warm-up: first chunks, caches
    await page.evaluate(() => window.__game.act('closeAll')); // a scene's first tick can complete a quest and open its card
    await page.keyboard.down('ArrowRight');
    const r = await page.evaluate(() => new Promise((res) => {
      const dts = []; let last = performance.now(); const t0 = last;
      const f = (t) => { dts.push(t - last); last = t; if (t - t0 < 2500) requestAnimationFrame(f); else {
        const s = window.__game.getState(), q = (p) => dts.slice().sort((a, b) => a - b)[Math.min(dts.length - 1, Math.floor(dts.length * p))];
        res({ fps: dts.length / ((t - t0) / 1000), p50: q(0.5), p95: q(0.95), worst: Math.max(...dts), scriptMs: s.frameMs, heapMB: performance.memory ? performance.memory.usedJSHeapSize / 1048576 : 0 });
      } };
      requestAnimationFrame(f);
    }));
    await page.keyboard.up('ArrowRight');
    await page.evaluate(() => window.__game.pause());
    const row = { tier, viewport: vp, scene: name, throttle: THROTTLE, gpu: !SOFT, fps: +r.fps.toFixed(1), p50: +r.p50.toFixed(1), p95: +r.p95.toFixed(1), worst: +r.worst.toFixed(0), scriptMs: +(+r.scriptMs).toFixed(2), heapMB: +r.heapMB.toFixed(1) };
    rows.push(row);
    console.log(`${tier} ${vp.padEnd(7)} ${THROTTLE}x ${SOFT ? 'sw ' : 'gpu'} ${name.padEnd(24)} ${String(row.fps).padStart(6)} fps  p95 ${row.p95} ms  worst ${row.worst} ms  script ${row.scriptMs} ms  heap ${row.heapMB} MB`);
  }
  await ctx.close();
}
await browser.close();
if (OUT) {
  const file = path.resolve(ROOT, OUT);
  const prev = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { rows: [] };
  const key = (r) => [r.tier, r.viewport, r.scene, r.throttle, r.gpu].join('|');
  const keep = prev.rows.filter((r) => !rows.some((n) => key(n) === key(r)));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify({ made: new Date().toISOString(), rows: [...keep, ...rows] }, null, 1) + '\n');
  console.log(`→ ${OUT}`);
}
