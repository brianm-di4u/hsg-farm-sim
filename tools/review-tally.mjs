#!/usr/bin/env node
// Closes review loop N. Validates the JSON block that ends each review (schema in reviews/schema.json), writes
// scores.json and gaps.json from the judge, updates reviews/HISTORY.md, applies the stop rule (PROTOCOL.md) and
// prints the ranked backlog for the next development loop.
//
//   node games/farm-sim/tools/review-tally.mjs <N> [--validate]   (--validate: check the files only)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const GAME = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const N = +args.find((a) => /^\d+$/.test(a));
if (!(N >= 0)) { console.error('usage: review-tally.mjs <N> [--validate]'); process.exit(2); }
const REV = path.join(GAME, 'reviews'), loopDir = path.join(REV, `loop-${N}`);
const CATS = ['pixel', 'characters', 'environment', 'lighting', 'animation', 'ui', 'readability', 'authenticity'];
const GATE = { pixel: 7, characters: 7, environment: 7, lighting: 7, animation: 7, ui: 7, readability: 7, authenticity: 6 };
const COST = { S: 1, M: 2, L: 4 }, CAPACITY = 8, STALLS = 2, CAP = Infinity; // 2 stagnant loops, no cap (PROTOCOL.md)

function block(file) {
  const t = fs.readFileSync(file, 'utf8');
  const all = [...t.matchAll(/```json\s*([\s\S]*?)```/g)];
  if (!all.length) throw new Error(`${path.basename(file)}: no json block`);
  return JSON.parse(all[all.length - 1][1]);
}
function check(j, role, errs) {
  const where = `${role}`;
  if (j.loop !== N) errs.push(`${where}: loop ${j.loop} != ${N}`);
  for (const c of CATS) {
    const s = j.scores && j.scores[c];
    if (!s) { errs.push(`${where}: missing score ${c}`); continue; }
    if (!(s.score >= 1 && s.score <= 10) || Math.round(s.score * 2) !== s.score * 2) errs.push(`${where}: ${c} score ${s.score} not in 1..10 by 0.5`);
    if (role !== 'advocate' && (!Array.isArray(s.evidence) || s.evidence.length < 2)) errs.push(`${where}: ${c} has fewer than 2 cited captures`);
  }
  for (const g of j.gaps || []) {
    if (!/^G-[a-z0-9-]+$/.test(g.id || '')) errs.push(`${where}: bad gap id ${g.id}`);
    if (!CATS.includes(g.category)) errs.push(`${where}: gap ${g.id} bad category ${g.category}`);
    if (!COST[g.effort]) errs.push(`${where}: gap ${g.id} bad effort ${g.effort}`);
  }
}

const files = { 'critic-claude': 'critic-claude.md', 'critic-codex': 'critic-codex.md', advocate: 'advocate.md', judge: 'judge.md' };
const got = {}, errs = [];
for (const [role, f] of Object.entries(files)) {
  const p = path.join(loopDir, f);
  if (!fs.existsSync(p)) { if (role !== 'critic-claude' && role !== 'critic-codex' && args.includes('--validate')) continue; errs.push(`missing ${f}`); continue; }
  try { got[role] = block(p); check(got[role], role, errs); } catch (e) { errs.push(String(e.message)); }
}
if (errs.length) { console.error(`✗ loop ${N}:\n  ${errs.join('\n  ')}`); process.exit(1); }
if (args.includes('--validate')) { console.log(`✓ loop ${N}: ${Object.keys(got).join(', ')} valid`); process.exit(0); }

// history
const histPath = path.join(REV, 'history.json');
const hist = fs.existsSync(histPath) ? JSON.parse(fs.readFileSync(histPath, 'utf8')) : { loops: [] };
const J = got.judge, prev = hist.loops.filter((l) => l.loop < N).sort((a, b) => b.loop - a.loop)[0];
const scores = Object.fromEntries(CATS.map((c) => [c, J.scores[c].score]));
const total = CATS.reduce((s, c) => s + scores[c], 0);
// A loop counts as progress only if its total beats the best total so far (football v3's final rule: single categories
// swinging +/-0.5 between judges must not reset the count).
const best = Math.max(-Infinity, ...hist.loops.filter((l) => l.loop < N).map((l) => l.total));
const rose = prev ? total > best : true;
const stalls = rose ? 0 : (prev ? prev.stalls : 0) + 1;
const pass = CATS.every((c) => scores[c] >= GATE[c]);
const verdict = pass ? 'stop-pass' : stalls >= STALLS ? 'stop-stagnant' : N + 1 >= CAP ? 'stop-cap' : 'continue';
const critics = Object.fromEntries(['critic-claude', 'critic-codex', 'advocate'].map((r) => [r, Object.fromEntries(CATS.map((c) => [c, got[r].scores[c].score]))]));
const entry = { loop: N, scores, total, stalls, verdict, critics, calibration: J.calibration || null, date: new Date().toISOString().slice(0, 10) };
hist.loops = [...hist.loops.filter((l) => l.loop !== N), entry].sort((a, b) => a.loop - b.loop);
fs.writeFileSync(histPath, JSON.stringify(hist, null, 2) + '\n');

// backlog: judge gaps, regressions forced to the top
const weight = (c) => (scores[c] < GATE[c] ? 1.5 : scores[c] >= GATE[c] + 1 ? 0.3 : 1);
const gaps = (J.gaps || []).map((g) => ({ ...g, priority: +(g.expectedGain * weight(g.category) / COST[g.effort]).toFixed(3) }));
if (prev) for (const c of CATS) if (prev.scores[c] - scores[c] >= 0.5) gaps.push({ id: `G-regression-${c}`, category: c, expectedGain: prev.scores[c] - scores[c], severity: 5, effort: 'S', workstream: 'WS1', fix: `Find and undo what lowered ${c} since loop ${prev.loop}`, priority: 99 });
gaps.sort((a, b) => b.priority - a.priority);
let room = CAPACITY;
for (const g of gaps) { g.selected = room - COST[g.effort] >= 0; if (g.selected) room -= COST[g.effort]; }
fs.writeFileSync(path.join(loopDir, 'scores.json'), JSON.stringify({ loop: N, judge: scores, total, critics, gates: GATE, verdict }, null, 2) + '\n');
fs.writeFileSync(path.join(loopDir, 'gaps.json'), JSON.stringify(gaps, null, 2) + '\n');

// HISTORY.md
const head = `| Loop | ${CATS.map((c) => c[0].toUpperCase() + c.slice(1)).join(' | ')} | Total | Δ | Stalls | Verdict |\n|${'---|'.repeat(CATS.length + 5)}\n`;
const rows = hist.loops.map((l, i) => {
  const p = hist.loops[i - 1];
  const d = p ? (l.total - p.total >= 0 ? '+' : '') + (l.total - p.total).toFixed(1) : '—';
  return `| ${l.loop} | ${CATS.map((c) => `${l.scores[c]}${l.scores[c] >= GATE[c] ? ' ✓' : ''}`).join(' | ')} | ${l.total.toFixed(1)} | ${d} | ${l.stalls} | ${l.verdict} |`;
}).join('\n');
const crit = hist.loops.map((l) => `| ${l.loop} | ${['critic-claude', 'critic-codex', 'advocate'].map((r) => CATS.map((c) => l.critics[r][c]).join(' / ')).join(' | ')} |`).join('\n');
fs.writeFileSync(path.join(REV, 'HISTORY.md'), `# Review history (judged scores)\n\nGenerated by tools/review-tally.mjs. Gates: ${CATS.map((c) => `${c} ≥ ${GATE[c]}`).join(', ')}. ✓ means the gate is met.\n\n${head}${rows}\n\n` +
  `## Reviewer spread (${CATS.join(' / ')})\n\n| Loop | Critic A (Claude) | Critic B (Codex) | Advocate |\n|---|---|---|---|\n${crit}\n` +
  (hist.loops.some((l) => l.calibration) ? `\n## Calibration (blind benchmark scored by the judge)\n\n${hist.loops.filter((l) => l.calibration).map((l) => `- loop ${l.loop}: ${JSON.stringify(l.calibration)}`).join('\n')}\n` : ''));

console.log(`loop ${N}: ${CATS.map((c) => `${c} ${scores[c]}`).join(', ')} · total ${total.toFixed(1)}${prev ? ` (${total - prev.total >= 0 ? '+' : ''}${(total - prev.total).toFixed(1)})` : ''} · stalls ${stalls} → ${verdict}`);
console.log(`\nbacklog (capacity ${CAPACITY}):`);
for (const g of gaps.slice(0, 14)) console.log(`  ${g.selected ? '▶' : ' '} ${g.priority.toFixed(2).padStart(5)}  ${g.workstream.padEnd(4)} ${g.effort} ${g.id}: ${g.fix.slice(0, 110)}`);
