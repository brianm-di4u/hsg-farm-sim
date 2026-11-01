#!/usr/bin/env node
// Complexity ladder: how much the pixel style can draw before it misses the budget, per device profile.
// Climbs one axis at a time from a busy base scene (1886 town, walking), using the __game.bench() hook to add
// render-only load, and records fps, p95 and worst frame, the game's script time per frame and the heap.
//
//   node games/farm-sim/tools/perf-ladder.mjs [--profiles=gpu,sw,phone4,phone6] [--axes=sprites,size,frames,lights,particles,tile]
//        [--out=games/farm-sim/benchmarks/ladder.json]
//
// Profiles: gpu = desktop 1280x800 on the real GPU (vsync off); sw = the same in SwiftShader (the harness's renderer);
// phone4 / phone6 = 390x844@3 on the GPU with 4x / 6x CDP CPU throttling (main thread only: raster cost is
// under-counted, so read phone rows next to the sw rows). A rung passes when it meets that profile's budget.
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
const PROFILES = opt('profiles', 'gpu,sw,phone4,phone6').split(',');
const AXES = opt('axes', 'sprites,size,frames,lights,particles,tile').split(',');
const OUT = opt('out', 'games/farm-sim/benchmarks/ladder.json');
const GPU = ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--disable-gpu-vsync', '--disable-frame-rate-limit'];
const PROF = {
  gpu: { launch: { channel: 'chrome', args: GPU }, ctx: { viewport: { width: 1280, height: 800 } }, throttle: 1, pass: (r) => r.fps >= 58 && r.scriptMs <= 4 },
  sw: { launch: {}, ctx: { viewport: { width: 1280, height: 800 } }, throttle: 1, pass: (r) => r.fps >= 55 && r.scriptMs < 8 },
  phone4: { launch: { channel: 'chrome', args: GPU }, ctx: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true }, throttle: 4, pass: (r) => r.fps >= 30 && r.p95 <= 50 },
  phone6: { launch: { channel: 'chrome', args: GPU }, ctx: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true }, throttle: 6, pass: (r) => r.fps >= 24 && r.scriptMs <= 16 },
};
const RUNGS = {
  sprites: [0, 50, 100, 200, 400, 800, 1600].map((n) => ({ label: `${n} sprites 24x32`, bench: { sprites: n, size: [24, 32], frames: 4 } })),
  size: [[16, 24], [16, 32], [24, 32], [32, 48], [48, 64], [64, 96], [128, 128]].map((s) => ({ label: `100 sprites ${s[0]}x${s[1]}`, bench: { sprites: 100, size: s, frames: 4 } })),
  frames: [4, 8, 16, 32].map((f) => ({ label: `60 sprites 32x48, ${f} frames`, bench: { sprites: 60, size: [32, 48], frames: f } })),
  lights: [0, 16, 64, 256].map((n) => ({ label: `${n} extra lights at night`, time: 1290, bench: { lights: n } })),
  particles: [0, 250, 500, 1000, 2000].map((n) => ({ label: `${n} particles`, bench: { particles: n } })),
  tile: [16, 24, 32].map((t) => ({ label: `tile ${t}`, tile: t, bench: null })),
};
const url = (tile) => pathToFileURL(path.join(GAME, 'index.html')).href + `?style=pixel&tile=${tile}`;
const rows = [];
for (const pn of PROFILES) {
  const P = PROF[pn];
  const browser = await chromium.launch({ headless: true, ...P.launch }).catch(() => chromium.launch({ headless: true }));
  const ctx = await browser.newContext(P.ctx);
  const page = await ctx.newPage();
  if (P.throttle > 1) { const cdp = await ctx.newCDPSession(page); await cdp.send('Emulation.setCPUThrottlingRate', { rate: P.throttle }); }
  let tileNow = null;
  for (const axis of AXES) for (const rung of RUNGS[axis]) {
    const tile = rung.tile || 16;
    if (tile !== tileNow) { await page.goto(url(tile)); await page.waitForFunction(() => !!window.__game); tileNow = tile; }
    await page.evaluate(({ time, bench }) => { const g = window.__game; g.seed(7); g.scene({ era: 3, at: 'town', time: time || 700 }); g.act('closeAll'); g.bench(bench); g.resume(); }, rung);
    await page.waitForFunction(() => { const s = window.__game.getState(); return s.artPending === 0 && s.artLoaded >= s.artTotal; }, null, { timeout: 90000 }).catch(() => {});
    await page.waitForTimeout(700);
    await page.evaluate(() => window.__game.act('closeAll'));
    await page.keyboard.down('ArrowRight');
    const r = await page.evaluate(() => new Promise((res) => {
      const dts = []; let last = performance.now(); const t0 = last;
      const f = (t) => { dts.push(t - last); last = t; if (t - t0 < 2000) requestAnimationFrame(f); else {
        const s = window.__game.getState(), srt = dts.slice().sort((a, b) => a - b);
        res({ fps: dts.length / ((t - t0) / 1000), p95: srt[Math.floor(srt.length * 0.95)], worst: srt[srt.length - 1], scriptMs: s.frameMs, heapMB: performance.memory ? performance.memory.usedJSHeapSize / 1048576 : 0 });
      } };
      requestAnimationFrame(f);
    }));
    await page.keyboard.up('ArrowRight');
    await page.evaluate(() => { window.__game.pause(); window.__game.bench(null); });
    const row = { profile: pn, axis, rung: rung.label, fps: +r.fps.toFixed(1), p95: +r.p95.toFixed(1), worst: +r.worst.toFixed(0), scriptMs: +(+r.scriptMs).toFixed(2), heapMB: +r.heapMB.toFixed(1) };
    row.pass = P.pass(row);
    rows.push(row);
    console.log(`${pn.padEnd(6)} ${axis.padEnd(9)} ${rung.label.padEnd(28)} ${String(row.fps).padStart(6)} fps  p95 ${String(row.p95).padStart(5)}  worst ${String(row.worst).padStart(4)}  script ${String(row.scriptMs).padStart(5)} ms  heap ${row.heapMB}  ${row.pass ? 'pass' : 'FAIL'}`);
  }
  await browser.close();
}
const file = path.resolve(ROOT, OUT);
fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, JSON.stringify({ made: new Date().toISOString(), rows }, null, 1) + '\n');
// The highest passing rung per axis on the strictest profile measured (phone4 if present).
const strict = PROFILES.includes('phone4') ? 'phone4' : PROFILES[0];
console.log(`\nHighest passing rung per axis (${strict}):`);
for (const axis of AXES) { const ok = rows.filter((r) => r.profile === strict && r.axis === axis && r.pass); console.log(`  ${axis}: ${ok.length ? ok[ok.length - 1].rung : 'none'}`); }
console.log(`→ ${OUT}`);
