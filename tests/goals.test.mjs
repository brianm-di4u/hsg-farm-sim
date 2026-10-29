// Each chapter's special goal mechanics, played through the same actions a player uses.
import { chapter, click } from './helpers.mjs';

const goal = (s, id) => s.quests.find((q) => q.id === id);

export const tests = [
  {
    name: 'chapter 1: rental hut pays rent',
    viewports: ['desktop'],
    async run(t) {
      await chapter(t, 1);
      await t.game('setState', { inv: [{ id: 'hoe' }, { id: 'wood', n: 50 }, { id: 'stone', n: 20 }] });
      await t.game('act', 'craft', 'hut');
      await t.game('act', 'teleport', 18, 9, 'down');
      await t.game('act', 'selectItem', 'hut');
      await t.game('act', 'use');
      let s = await t.state();
      t.expect(goal(s, 'c1-hut').done, 'A hut for the ailing done');
      const m = s.money;
      await t.game('act', 'closeAll');
      await t.game('act', 'sleepSkip');
      s = await t.state();
      t.equal(s.summary.rent, 8, 'Ezra pays $8 rent');
      t.equal(s.money, m + 8, 'rent credited');
      await t.game('act', 'teleport', 18, 11, 'up');
      await t.shot('63-hut');
    },
  },
  {
    name: 'chapter 2: the mill and cold water',
    viewports: ['desktop'],
    async run(t) {
      await chapter(t, 2, { at: 'mill', time: 600 });
      await t.game('setState', { inv: [{ id: 'hoe' }, { id: 'corn', n: 10 }, { id: 'emptyjug', n: 6 }] });
      await t.game('act', 'face', 'up');
      await t.game('act', 'interact');
      let s = await t.state();
      t.equal(s.inv.find((i) => i.id === 'cornmeal')?.n, 10, 'the mill ground 10 cornmeal');
      await t.shot('64-mill');
      await t.game('act', 'goto', 'coldspring', 'up');
      await t.game('act', 'selectItem', 'emptyjug');
      for (let i = 0; i < 6; i++) await t.game('act', 'use');
      s = await t.state();
      t.equal(s.inv.find((i) => i.id === 'coldwater')?.n, 6, 'filled six cold jugs');
      await t.game('act', 'closeAll');
    },
  },
  {
    name: 'chapter 3: brick farmhouse',
    viewports: ['desktop'],
    async run(t) {
      await chapter(t, 3, { at: 'store', time: 600, money: 1000 });
      await t.game('setState', { inv: [{ id: 'hoe' }, { id: 'stone', n: 20 }] });
      await t.game('act', 'face', 'up');
      await t.game('act', 'interact');
      await click(t, 'buy', 'brickhouse|1');
      let s = await t.state();
      t.equal(s.houseStyle, 'brick', 'brick house bought');
      t.equal(s.buildings.find((b) => b.id === 'farmhouse').type, 'farm-brick', 'the farmhouse is redrawn in brick');
      t.expect(goal(s, 'c3-brick').done, 'Brick by brick done');
      await t.game('act', 'closeAll');
      await t.game('act', 'closeAll');
      await t.game('act', 'goto', 'farmDoor', 'down');
      await t.shot('65-brick-house');
    },
  },
  {
    name: 'chapter 5: roadside stand',
    viewports: ['desktop'],
    async run(t) {
      await chapter(t, 5);
      await t.game('setState', { inv: [{ id: 'hoe' }, { id: 'wood', n: 30 }, { id: 'hardware', n: 2 }] });
      await t.game('act', 'craft', 'stand');
      await t.game('act', 'teleport', 19, 15, 'up');
      await t.game('act', 'selectItem', 'stand');
      await t.game('act', 'use');
      let s = await t.state();
      t.expect(goal(s, 'c5-stand').done, 'Roadside stand done');
      await t.game('act', 'closeAll');
      await t.game('act', 'sleepSkip');
      s = await t.state();
      t.equal(s.summary.rent, 40, 'the stand earns $40 overnight');
      await t.game('act', 'teleport', 19, 16, 'up');
      await t.shot('66-stand');
    },
  },
  {
    name: 'chapter 6: tub, fund and friends',
    viewports: ['desktop'],
    async run(t) {
      await chapter(t, 6, { time: 700, money: 3000 });
      await t.game('setState', { inv: [{ id: 'hoe' }, { id: 'wood', n: 30 }, { id: 'hardware', n: 4 }] });
      await t.game('act', 'craft', 'tub');
      await t.game('step', 500);
      let s = await t.state();
      const jo = s.npcs.find((n) => n.id === 'jo');
      await t.game('act', 'teleport', jo.tx, jo.ty - 1, 'down');
      await t.game('act', 'interact');
      s = await t.state();
      t.expect(goal(s, 'c6-tub').done, 'Running of the Tubs done');
      await t.game('act', 'closeAll');
      await t.game('act', 'closeAll');
      await t.game('act', 'goto', 'fund', 'up');
      await t.game('act', 'interact');
      t.equal((await t.state()).modal, 'fund', 'fund box opens');
      await t.shot('67-fund');
      for (let i = 0; i < 2; i++) await click(t, 'donate', '1000');
      s = await t.state();
      t.expect(goal(s, 'c6-fund').done, 'Restoration fund done');
      t.equal(s.money, 1000 + 400, 'paid $2,000 and got the tub reward');
      await t.game('act', 'closeAll');
      await t.game('setState', { npcs: { priya: { pts: 60 }, marcus: { pts: 60 } } });
      s = await t.state();
      t.expect(goal(s, 'c6-friends').done, 'Good neighbors done at 3 hearts with two people');
    },
  },
  {
    name: 'chest and chapter select',
    viewports: ['desktop'],
    async run(t) {
      await chapter(t, 1);
      await t.game('setState', { inv: [{ id: 'hoe' }, { id: 'chest' }, { id: 'stone', n: 12 }] });
      await t.game('act', 'teleport', 12, 13, 'up');
      await t.game('act', 'selectItem', 'chest');
      await t.game('act', 'use');
      await t.game('act', 'interact');
      t.equal((await t.state()).modal, 'chest', 'chest opens');
      await click(t, 'pslot', 2);
      let s = await t.state();
      t.expect(!s.inv.some((i) => i.id === 'stone'), 'stone moved into the chest');
      await t.shot('68-chest');
      await click(t, 'cslot', 0);
      s = await t.state();
      t.equal(s.inv.find((i) => i.id === 'stone')?.n, 12, 'and back out');
      await t.game('act', 'closeAll');
      // Reaching chapter 3 unlocks it in chapter select.
      await t.game('scene', { era: 3 });
      await t.game('act', 'save');
      await t.game('scene', 'title');
      await click(t, 'open', 'chapters');
      t.expect(!(await t.page.$('[data-act="chapter"][data-arg="3"][disabled]')), 'chapter 3 selectable');
      t.expect(await t.page.$('[data-act="chapter"][data-arg="5"][disabled]'), 'chapter 5 locked');
      await t.shot('69-chapters');
      await click(t, 'chapter', '3');
      s = await t.state();
      t.equal(s.ch, 3, 'chapter select starts chapter 3');
    },
  },
];
