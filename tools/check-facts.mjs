#!/usr/bin/env node
// Checks every history fact the game can display.
//   node tools/check-facts.mjs
// 1. data/facts.json: bank facts exist in the audited bank (games/trivia/data/questions.json), are
//    `confirmed`, cite the same source and URL, and the card text contains the key part(s) of the bank's
//    answer; corpus facts quote strings that really appear in the named research file.
// 2. src/js/sim/data.js: every fact/ref id it uses exists in facts.json.
// 3. Any year shown in game text (dialogue, chapter intros, quest descriptions) must be the chapter's
//    story year or appear in a fact attached to that same text, so no unsourced date reaches the screen.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const game = path.resolve(here, '..');
const repo = path.resolve(game);
const facts = JSON.parse(fs.readFileSync(path.join(game, 'data/facts.json'), 'utf8')).facts;
const bank = JSON.parse(fs.readFileSync(path.join(repo, 'shared/data/trivia-questions.json'), 'utf8')).questions;
const D = await import(pathToFileURL(path.join(game, 'src/js/sim/data.js')).href);

const norm = (s) => String(s).toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();
const byId = new Map(facts.map((f) => [f.id, f]));
let bad = 0;
const fail = (msg) => { bad++; console.log('FAIL ' + msg); };

for (const f of facts) {
  if (!f.text || !f.source || !f.sourceUrl) fail(`${f.id}: missing text/source/url`);
  if (f.bank) {
    const q = bank.find((x) => x.id === f.bank);
    if (!q) { fail(`${f.id}: ${f.bank} not in audited bank`); continue; }
    if (q.confidence !== 'confirmed') fail(`${f.id}: bank confidence ${q.confidence}`);
    if (q.source !== f.source) fail(`${f.id}: source differs (bank "${q.source}")`);
    if (q.sourceUrl !== f.sourceUrl) fail(`${f.id}: source URL differs`);
    for (const part of String(f.key).split('|')) {
      if (!norm(q.answer).includes(norm(part))) fail(`${f.id}: key "${part}" not in bank answer "${q.answer}"`);
      if (!norm(f.text).includes(norm(part))) fail(`${f.id}: card text lacks key "${part}"`);
    }
    if (!bad) console.log(`ok   ${f.id.padEnd(22)} ${f.bank}  ${q.answer}`);
  } else if (f.corpus) {
    const src = fs.readFileSync(path.join(repo, f.corpus.file), 'utf8');
    for (const c of f.corpus.contains) if (!src.includes(c)) fail(`${f.id}: "${c}" not found in ${f.corpus.file}`);
    console.log(`ok   ${f.id.padEnd(22)} corpus ${f.corpus.file}`);
  } else fail(`${f.id}: neither bank nor corpus`);
}

// Collect every displayed text with the facts attached to it.
const texts = [];
const used = new Set();
const need = (id, where) => { used.add(id); if (!byId.has(id)) fail(`${where}: unknown fact "${id}"`); };
for (const ch of D.CHAPTERS.slice(1)) {
  const attached = [...ch.introFacts, ...ch.closing];
  attached.forEach((id) => need(id, `chapter ${ch.n}`));
  ch.intro.forEach((t) => texts.push({ where: `chapter ${ch.n} intro`, t, facts: ch.introFacts, year: ch.year }));
}
for (const [id, p] of Object.entries(D.PEOPLE)) {
  for (const l of p.lines) {
    const fs_ = [l.fact, l.ref].filter(Boolean);
    fs_.forEach((x) => need(x, `${id} line`));
    texts.push({ where: `${id} line`, t: l.t, facts: fs_, year: D.CHAPTERS[p.ch].year });
  }
}
for (const q of D.QUESTS) {
  (q.facts || []).forEach((x) => need(x, `quest ${q.id}`));
  texts.push({ where: `quest ${q.id}`, t: q.title + ' ' + q.desc, facts: q.facts || [], year: D.CHAPTERS[q.ch].year });
}
D.SPRING_FACTS.forEach((x) => need(x, 'spring sign'));
if (D.LEAF_FACT) need(D.LEAF_FACT, 'oak leaf');

for (const x of texts) {
  const years = x.t.match(/\b(1[5-9]\d\d|20[0-2]\d)\b/g) || [];
  for (const y of years) {
    if (+y === x.year) continue;
    const ok = x.facts.some((id) => byId.has(id) && byId.get(id).text.includes(y));
    if (!ok) fail(`${x.where}: year ${y} not backed by an attached fact — "${x.t.slice(0, 70)}…"`);
  }
  if (/legend|tale/i.test(x.t) === false && /de soto|neutral ground/i.test(x.t)) fail(`${x.where}: legend not labelled`);
}

const unused = facts.filter((f) => !used.has(f.id)).map((f) => f.id);
if (unused.length) console.log(`note: ${unused.length} facts not referenced by game data: ${unused.join(', ')}`);
console.log(`\n${facts.length} facts, ${texts.length} game texts scanned, ${bad} problem(s)`);
process.exit(bad ? 1 : 0);
