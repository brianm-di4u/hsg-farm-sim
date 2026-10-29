import { chapter, click } from './helpers.mjs';

export const tests = [
  {
    name: 'shipping bin pays overnight',
    async run(t) {
      await chapter(t, 1);
      await t.game('setState', { money: 100, inv: [{ id: 'hoe' }, { id: 'jug' }, { id: 'radish', n: 4 }, { id: 'corn', n: 2 }] });
      await t.game('act', 'goto', 'bin', 'up');
      await t.game('act', 'interact');
      let s = await t.state();
      t.equal(s.modal, 'bin', 'bin panel opens');
      await t.shot('05b-bin');
      await t.checkLayout();
      await click(t, 'shipall');
      s = await t.state();
      t.equal(s.bin.length, 2, 'two stacks in the bin');
      t.expect(!s.inv.some((i) => i.id === 'radish'), 'radishes left the pack');
      await t.game('act', 'closeAll');
      await t.game('act', 'sleepSkip');
      s = await t.state();
      t.equal(s.money, 100 + 4 * 10 + 2 * 21, 'paid 4×$10 + 2×$21 (game prices)');
      t.equal(s.summary.total, 82, 'summary total');
      t.equal(s.bin.length, 0, 'bin emptied');
      const q = s.quests.find((x) => x.id === 'c1-ship');
      t.equal(q.progress[0], 6, 'shipped crops count toward First harvest');
    },
  },
  {
    name: 'shop buy and sell, hours',
    async run(t) {
      await chapter(t, 1, { at: 'tradeCamp', time: 540 });
      await t.game('act', 'face', 'up');
      await t.game('act', 'interact');
      let s = await t.state();
      t.equal(s.modal, 'shop', 'trade camp opens the shop at 9:00');
      await t.shot('07-shop');
      await t.checkLayout();
      const m0 = s.money;
      await click(t, 'buy', 'seed:corn|5');
      s = await t.state();
      t.equal(s.money, m0 - 35, 'bought 5 corn seeds for $35');
      t.equal(s.inv.find((i) => i.id === 'seed:corn').n, 11, 'seeds added (6 + 5)');
      await t.game('setState', { money: 3 });
      await t.game('act', 'buy', 'seed:corn', 1);
      s = await t.state();
      t.equal(s.money, 3, 'cannot overspend');
      await click(t, 'shoptab', 'sell');
      await t.shot('07b-shop-sell');
      await click(t, 'sell', 'seed:radish|1');
      s = await t.state();
      t.equal(s.money, 5, 'sold one radish seed for $2');
      await t.game('act', 'closeAll');
      await t.game('setState', { time: 1200 });
      await t.game('act', 'interact');
      s = await t.state();
      t.expect(s.modal !== 'shop' && s.toasts.some((x) => /closed/.test(x)), 'closed at 20:00');
    },
  },
  {
    name: 'inventory and hotbar',
    async run(t) {
      await chapter(t, 1);
      for (const [k, i] of [['Digit3', 2], ['Digit8', 7], ['Digit1', 0]]) { await t.page.keyboard.press(k); t.equal((await t.state()).sel, i, `${k} selects slot ${i + 1}`); }
      await t.page.keyboard.press('KeyR');
      t.equal((await t.state()).sel, 1, 'R selects the next slot');
      await t.page.keyboard.press('KeyQ');
      t.equal((await t.state()).sel, 0, 'Q selects the previous slot');
      await t.page.click('#hotbar [data-act="hot"][data-arg="4"]');
      t.equal((await t.state()).sel, 4, 'clicking a hotbar slot selects it');
      await t.page.keyboard.press('KeyI');
      let s = await t.state();
      t.equal(s.modal, 'inventory', 'I opens the pack');
      await click(t, 'slot', 0); await click(t, 'slot', 9);
      s = await t.state();
      t.equal(s.invSlots[9], 'hoe', 'hoe swapped into slot 10');
      t.equal(s.invSlots[0], null, 'slot 1 now empty');
      await click(t, 'slot', 9); await click(t, 'slot', 0);
      await click(t, 'slot', 6);
      await t.shot('05-inventory');
      await t.checkLayout();
      // Stacks cap at 99.
      await t.game('act', 'fill', [['wood', 150]]);
      s = await t.state();
      const woods = s.inv.filter((i) => i.id === 'wood').map((i) => i.n);
      t.equal(woods.join(','), '99,51', 'wood stacks to 99');
      await t.page.keyboard.press('KeyI');
      t.equal((await t.state()).modal, null, 'I closes the pack');
    },
  },
  {
    name: 'crafting and the whetstone',
    async run(t) {
      await chapter(t, 1, { at: 'field' });
      await t.game('setState', { inv: [{ id: 'hoe' }, { id: 'jug' }, { id: 'axe' }, { id: 'pick' }, { id: 'novaculite', n: 2 }, { id: 'stone', n: 1 }, { id: 'wood', n: 4 }] });
      await t.game('scene', 'inventory');
      await click(t, 'invtab', 'craft');
      await t.shot('06-craft');
      await t.checkLayout();
      await click(t, 'craft', 'whetstone');
      let s = await t.state();
      t.expect(s.flags.whet, 'whetstone sharpens the tools');
      t.expect(s.inv.some((i) => i.id === 'whetstone'), 'whetstone in the pack');
      t.expect(s.quests.find((q) => q.id === 'c1-whet').done, 'Razor stone goal done');
      await t.game('act', 'closeAll');
      await t.game('act', 'cardNext');
      await t.game('act', 'closeAll');
      await t.game('act', 'select', 0);
      await t.game('act', 'face', 'down');
      const e0 = (await t.state()).energy;
      const [f] = await t.page.evaluate(() => { const S = window.__vovApp.gm.S; for (let y = 16; y < 31; y++) for (let x = 3; x < 20; x++) if (!S.objs[x + ',' + y] && !S.objs[x + ',' + (y - 1)]) return [{ x, y }]; return [null]; });
      await t.game('act', 'teleport', f.x, f.y - 1, 'down');
      await t.game('act', 'use');
      s = await t.state();
      t.equal(s.energy, e0 - 1, 'a sharp hoe costs 1 energy');
      await t.game('act', 'craft', 'fence');
      s = await t.state();
      t.equal(s.inv.find((i) => i.id === 'fence')?.n, 2, 'fence recipe makes 2');
    },
  },
];
