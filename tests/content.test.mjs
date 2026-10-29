import { chapter } from './helpers.mjs';

export const tests = [
  {
    name: 'facts on screen are sourced',
    viewports: ['desktop'],
    async run(t) {
      const r = await t.page.evaluate(() => {
        const ids = new Set(FACTS.facts.map((f) => f.id));
        const missing = FACTS.facts.filter((f) => !f.source || !f.sourceUrl || !f.text).map((f) => f.id);
        return { n: ids.size, missing };
      });
      t.expect(r.n >= 80, `${r.n} facts inlined`);
      t.equal(r.missing.length, 0, 'every fact has text, source and URL');
      // Every closing card shows a source line per fact.
      for (let ch = 1; ch <= 6; ch++) {
        await chapter(t, ch);
        await t.game('act', 'closingCard');
        const txt = await t.page.textContent('#screen');
        const facts = (txt.match(/Source:/g) || []).length;
        t.expect(facts >= 4, `chapter ${ch} closing card: ${facts} sourced facts`);
        t.expect(!/undefined/.test(txt), `chapter ${ch} card has no undefined text`);
        await t.game('act', 'closeAll');
      }
    },
  },
  {
    name: 'legends are labelled; heritage site is read-only',
    viewports: ['desktop'],
    async run(t) {
      await chapter(t, 1, { at: 'tradeCamp' });
      await t.game('setState', { npcs: { margaux: { pts: 30 } } });
      let found = false;
      for (let d = 0; d < 10 && !found; d++) {
        const r = await t.game('act', 'talk', 'margaux');
        const txt = await t.page.textContent('#screen');
        if (/Spanish explorer|neutral ground/.test(txt)) { found = true; t.expect(/Legend/.test(txt), 'legend line carries the Legend tag'); await t.shot('61-legend'); }
        await t.game('act', 'closeAll');
        await t.game('act', 'sleepSkip');
      }
      t.expect(found, 'a legend line came up');
      // The quarry sign: facts, and nothing to dig.
      await t.game('act', 'goto', 'quarry', 'right');
      await t.game('act', 'interact');
      const txt = await t.page.textContent('#screen');
      t.expect(/leave it as you found it/i.test(txt) && /Caddo Nation/.test(txt), 'quarry sign: consultation and leave-no-trace note');
      await t.shot('62-quarry-sign');
      await t.game('act', 'closeAll');
      await t.game('act', 'teleport', 41, 4, 'up');
      await t.game('act', 'selectItem', 'pick');
      const before = (await t.state()).inv.length;
      await t.game('act', 'use');
      const s = await t.state();
      t.equal(s.inv.length, before, 'the pick does nothing at the quarry pits');
    },
  },
];
