#!/usr/bin/env node
// Size survey for the pixel-art packer: tours every chapter, season and weather in the painted style with
// `?sizelog`, walks the player over the whole map so every building, tree, prop and person is drawn, and records
// the size (in tiles) each image was requested at. Writes art-src/px-sizes.json: { name: [widths in tiles] }.
//   node games/farm-sim/tools/px-sizes.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.resolve(HERE, '../../../shared/test-harness/package.json'));
const { chromium } = require('playwright');
const url = pathToFileURL(path.resolve(HERE, '..', 'index.html')).href + '?sizelog';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 800 } })).newPage();
await page.goto(url);
await page.waitForFunction(() => !!window.__game);
for (let era = 1; era <= 6; era++) {
  for (const [day, weather] of [[1, null], [8, null], [15, null], [22, null], [23, 'snow'], [2, 'rain']]) {
    await page.evaluate(([era, day, weather]) => { window.__game.seed(7); window.__game.scene({ era, at: 'farmDoor', day, time: 700, weather }); }, [era, day, weather]);
    await page.waitForFunction(() => { const s = window.__game.getState(); return s.artPending === 0; }, null, { timeout: 30000 });
    // A sweep of camera positions (the draw list covers the view plus a margin), each rendered once.
    await page.evaluate(() => { for (let y = 4; y < 44; y += 8) for (let x = 4; x < 60; x += 10) { window.__game.act('teleport', x, y); window.__game.act('render'); } });
  }
  process.stdout.write(`chapter ${era} `);
}
const log = await page.evaluate(() => window.__game.act('sizeLog'));
await browser.close();
const out = {};
for (const [name, ws] of Object.entries(log).sort()) out[name] = Object.keys(ws).map(Number).sort((a, b) => a - b);
fs.writeFileSync(path.resolve(HERE, '..', 'art-src', 'px-sizes.json'), JSON.stringify(out, null, 1) + '\n');
console.log(`\n${Object.keys(out).length} images surveyed → art-src/px-sizes.json`);
