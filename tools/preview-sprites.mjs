// Review sheet for the layered character atlases: composes sample people with the game's own
// src/js/render/sprites.js and screenshots them on grass at full and in-game size.
//   node games/farm-sim/tools/preview-sprites.mjs   ->  games/farm-sim/art-src/preview-chars.png (git-ignored)
import { chromium } from '../../../shared/test-harness/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const GAME = path.resolve(HERE, '..');
const src = fs.readFileSync(path.join(GAME, 'src/js/render/sprites.js'), 'utf8').replace(/^export /gm, '');
const uri = (f) => 'data:image/png;base64,' + fs.readFileSync(path.join(GAME, 'art-src', f)).toString('base64');
const looks = [
  { shirt: '#7a5a3a', pants: '#4a3a2a', hat: 'none', hair: '#3b2a1c', skin: '#e0b896', dress: true },
  { shirt: '#8e3b2b', pants: '#3a3a44', hat: 'brim', hair: '#2a2420', skin: '#c08a62' },
  { shirt: '#2b4c9b', pants: '#2a2a33', hat: 'bonnet', hair: '#5a3a22', skin: '#e0b896', dress: true },
  { shirt: '#c8452b', pants: '#1f2f5c', hat: 'fedora', hair: '#1f1a16', skin: '#8a5a3a' },
  { shirt: '#6a5a3a', pants: '#4a3a2a', hat: 'cap-fur', hair: '#6a6a6a', skin: '#e0b896', beard: true },
  { shirt: '#f0ece0', pants: '#2a2a3a', hat: 'none', hair: '#8a7a6a', skin: '#f2d6c0', glasses: true },
  { shirt: '#f4f2ec', pants: '#2a2a2a', hat: 'toque', hair: '#3a2a1a', skin: '#e0b896' },
  { shirt: '#b5568f', pants: '#2a2a3a', hat: 'helmet', hair: '#1a1a1a', skin: '#e0b896' },
  { shirt: '#f4c542', pants: '#34424a', hat: 'cap', hair: '#3a2a1a', skin: '#5a3a26', glasses: true },
  { shirt: '#3c9a4a', pants: '#4a5675', hat: 'scarf', hair: '#c8a060', skin: '#f2d6c0', dress: true },
];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1500, height: 1000 } });
await page.setContent('<!doctype html><body style="margin:0;background:#5f8f3e"><canvas id="c" width="1500" height="1000"></canvas></body>');
await page.addScriptTag({ content: src + '\nwindow.composeCell = composeCell;' });
await page.evaluate(async ({ atl, looks }) => {
  const load = async (u) => { const i = new Image(); i.src = u; await i.decode(); return i; };
  const imgs = { trousers: await load(atl.trousers), dress: await load(atl.dress), overlay: await load(atl.overlay) };
  const g = document.getElementById('c').getContext('2d');
  g.imageSmoothingQuality = 'high';
  const frames = ['idle', 'walk0', 'walk1', 'walk2', 'walk3', 'use0', 'use1'];
  // Row 1: all frames of person 0 and 1 facing down/left/up/right, full size.
  let x = 0;
  for (const face of ['down', 'left', 'up', 'right']) for (const f of frames.slice(0, 5)) { g.drawImage(window.composeCell(imgs, looks[1], looks[1].skin, face, f), x, 0, 64, 96); x += 64; }
  x = 0;
  for (const face of ['down', 'left', 'up']) for (const f of frames) { g.drawImage(window.composeCell(imgs, looks[0], looks[0].skin, face, f), x, 100, 64, 96); x += 66; }
  // Row 3: the whole cast at 2x game size, then at game size (44 px tiles: 44x66).
  looks.forEach((l, i) => g.drawImage(window.composeCell(imgs, l, l.skin, 'down', 'idle'), i * 130, 210, 128, 192));
  looks.forEach((l, i) => g.drawImage(window.composeCell(imgs, l, l.skin, i % 2 ? 'left' : 'down', 'walk1'), i * 70, 420, 64, 96));
  looks.forEach((l, i) => g.drawImage(window.composeCell(imgs, l, l.skin, 'down', 'idle'), 720 + i * 46, 430, 44, 66));
  looks.forEach((l, i) => g.drawImage(window.composeCell(imgs, l, l.skin, 'up', 'idle'), 720 + i * 46, 500, 44, 66));
}, { atl: { trousers: uri('chars-trousers.png'), dress: uri('chars-dress.png'), overlay: uri('chars-overlay.png') }, looks });
const out = path.join(GAME, 'art-src', 'preview-chars.png');
await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1500, height: 580 } });
await browser.close();
console.log('wrote', out);
