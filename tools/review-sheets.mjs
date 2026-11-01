#!/usr/bin/env node
// Contact sheets for a shots-gpu capture set: labelled grids of frames (6 per sheet), close-ups (6 per sheet) and,
// with --compare=<older set>, before/after pairs of the same frame. For a fast first sweep; full-size files remain
// the evidence.
//
//   node games/farm-sim/tools/review-sheets.mjs review-loop-1 [--compare=review-loop-0] [--tier=T16] [--base-tier=painted]
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const GAME = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.resolve(GAME, '..', '..');
const require = createRequire(path.resolve(ROOT, 'shared', 'test-harness', 'package.json'));
const { chromium } = require('playwright');
const args = process.argv.slice(2);
const opt = (k, d) => { const a = args.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const set = args.find((a) => !a.startsWith('--'));
const dir = path.join(GAME, 'screenshots', set);
const idx = JSON.parse(fs.readFileSync(path.join(dir, 'shots.json'), 'utf8'));
const cmp = opt('compare', ''), tierOnly = opt('tier', ''), baseTier = opt('base-tier', '');
const outDir = path.join(dir, 'sheets');
fs.mkdirSync(outDir, { recursive: true });
const url = (f) => `data:image/png;base64,${fs.readFileSync(f).toString('base64')}`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent('<!doctype html><body></body>');
async function sheet(items, cols, cellW, name) {
  const data = await page.evaluate(async ({ items, cols, cellW }) => {
    const ims = await Promise.all(items.map((it) => { const i = new Image(); i.src = it.url; return i.decode().then(() => i); }));
    const cellH = Math.round(cellW * Math.max(...ims.map((i) => i.height / i.width))) + 26;
    const rows = Math.ceil(ims.length / cols);
    const c = document.createElement('canvas'); c.width = cols * cellW + (cols + 1) * 6; c.height = rows * cellH + (rows + 1) * 6;
    const x = c.getContext('2d'); x.fillStyle = '#101218'; x.fillRect(0, 0, c.width, c.height);
    ims.forEach((im, k) => {
      const cx = 6 + (k % cols) * (cellW + 6), cy = 6 + Math.floor(k / cols) * (cellH + 6), h = Math.round(cellW * im.height / im.width);
      x.drawImage(im, cx, cy + 24, cellW, h);
      x.fillStyle = '#ffd21f'; x.font = '700 15px sans-serif'; x.fillText(items[k].label, cx + 2, cy + 17);
    });
    return c.toDataURL('image/png');
  }, { items, cols, cellW });
  fs.writeFileSync(path.join(outDir, name), Buffer.from(data.split(',')[1], 'base64'));
  return name;
}
const made = [];
const groups = {};
for (const s of idx.shots) if (!tierOnly || s.tier === tierOnly) (groups[`${s.tier}-${s.viewport}`] = groups[`${s.tier}-${s.viewport}`] || []).push(s);
for (const [g, shots] of Object.entries(groups)) {
  const mob = g.endsWith('mobile'), per = mob ? 8 : 6, cols = mob ? 4 : 3;
  for (let i = 0; i < shots.length; i += per) made.push(await sheet(shots.slice(i, i + per).map((s) => ({ url: url(path.join(dir, s.file)), label: `${s.id} ${s.title}` })), cols, mob ? 300 : 620, `${g}-${String(i / per + 1).padStart(2, '0')}.png`));
  const crops = shots.flatMap((s) => s.crops.map((c) => ({ url: url(path.join(dir, c.file)), label: `${s.id} close-up ${c.target}` })));
  for (let i = 0; i < crops.length; i += 6) made.push(await sheet(crops.slice(i, i + 6), 3, 620, `${g}-closeups-${String(i / 6 + 1).padStart(2, '0')}.png`));
}
if (cmp) {
  const old = JSON.parse(fs.readFileSync(path.join(GAME, 'screenshots', cmp, 'shots.json'), 'utf8'));
  const pairs = [];
  for (const s of idx.shots) {
    if (tierOnly && s.tier !== tierOnly) continue;
    const o = old.shots.find((x) => x.id === s.id && x.viewport === s.viewport && (!baseTier || x.tier === baseTier));
    if (o) pairs.push({ url: url(path.join(GAME, 'screenshots', cmp, o.file)), label: `BEFORE ${s.id} ${o.tier}/${s.viewport}` }, { url: url(path.join(dir, s.file)), label: `AFTER ${s.id} ${s.tier}/${s.viewport}` });
  }
  for (let i = 0; i < pairs.length; i += 6) made.push(await sheet(pairs.slice(i, i + 6), 2, 640, `compare-${String(i / 6 + 1).padStart(2, '0')}.png`));
}
await browser.close();
console.log(`${made.length} sheets → screenshots/${set}/sheets/`);
