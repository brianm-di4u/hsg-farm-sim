import { chapter, click } from './helpers.mjs';

const CAST = { 1: ['josiah', 'margaux', 'ezra'], 2: ['corinna', 'amos', 'lucius'], 3: ['duval', 'hattie', 'walt'], 4: ['ora', 'sal', 'june'], 5: ['lorraine', 'ambry', 'rusty'], 6: ['priya', 'marcus', 'jo'] };
const HOUSE = { 1: 'farm-cabin', 2: 'farm-plank', 3: 'farm-plank', 4: 'farm-bungalow', 5: 'farm-ranch', 6: 'farm-restored' };
const YEAR = { 1: 1807, 2: 1871, 3: 1886, 4: 1931, 5: 1955, 6: 2026 };

export const tests = [
  {
    name: 'goals and the era turn',
    async run(t) {
      await chapter(t, 1);
      await t.game('setState', { soil: { '5,20': 2 }, crops: [{ x: 5, y: 20, id: 'corn', age: 2 }], inv: [{ id: 'hoe' }, { id: 'jug' }, { id: 'axe' }, { id: 'pick' }, { id: 'scythe' }, { id: 'rod' }, { id: 'seed:radish', n: 5 }, { id: 'corn', n: 3 }, { id: 'whetstone', n: 1 }] });
      await t.game('act', 'goto', 'farmDoor', 'up');
      await t.game('act', 'interact');
      t.expect(!(await t.page.$('[data-act="sleepturn"]')), 'no era option before the goals are done');
      await t.game('act', 'closeAll');
      await t.game('act', 'completeGoals');
      let s = await t.state();
      t.expect(s.canTurn, 'all five goals done');
      const money = s.money;
      await t.game('act', 'interact');
      t.expect(await t.page.$('[data-act="sleepturn"]'), 'bed offers to turn the era');
      await t.shot('34a-bed-turn');
      await click(t, 'sleepturn');
      s = await t.state();
      t.equal(s.modal, 'summary', 'morning summary first');
      await click(t, 'cardnext');
      s = await t.state();
      t.equal(s.modal, 'card', 'then the closing history card');
      const txt = await t.page.textContent('#screen');
      t.expect(/what came next/.test(txt) && /Quapaw/.test(txt) && /April 20, 1832/.test(txt), 'closing card has the sourced facts');
      t.expect((txt.match(/Source:/g) || []).length >= 4, 'each fact shows a source');
      await t.shot('34-history-card');
      await t.checkLayout();
      await click(t, 'cardnext');
      s = await t.state();
      t.expect(s.wipe, 'the valley vista wipes to the next era');
      await t.game('act', 'animAt', 900);
      await t.shot('35-wipe', { wait: false });
      await t.game('act', 'endWipe');
      s = await t.state();
      t.equal(s.ch, 2, 'now chapter 2');
      t.equal(s.year, 1871, 'story year 1871');
      t.equal(s.modal, 'card', 'chapter 2 intro card');
      t.expect(/The Reservation/.test(await t.page.textContent('#screen')), 'intro names the new chapter');
      await t.shot('36-era2-intro');
      await click(t, 'cardnext');
      s = await t.state();
      t.equal(s.crops.length, 0, 'crops cleared for the new generation');
      t.expect(s.inv.some((i) => i.id === 'whetstone') && s.inv.some((i) => i.id === 'corn'), 'goods carry over');
      t.expect(!s.inv.some((i) => i.id === 'seed:radish'), 'old-era seeds sold back');
      t.expect(s.money > money, 'family gift and seed refund added');
      t.expect(s.almanacIds.includes('f-reservation'), 'closing facts recorded in the almanac');
      const theme = await t.page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--ui-bg').trim());
      t.equal(theme.toUpperCase(), '#EFE8DA', 'UI theme switched to the frontier-valley palette');
      await t.shot('37-era2-farm');
    },
  },
  {
    name: 'all six chapters',
    async run(t) {
      for (let ch = 1; ch <= 6; ch++) {
        await chapter(t, ch, { at: 'farmDoor', time: 540 });
        let s = await t.state();
        t.equal(s.year, YEAR[ch], `chapter ${ch} year`);
        t.equal(s.buildings.find((b) => b.id === 'farmhouse').type, HOUSE[ch], `chapter ${ch} farmhouse style`);
        t.equal(s.npcs.map((n) => n.id).sort().join(','), CAST[ch].slice().sort().join(','), `chapter ${ch} cast`);
        t.equal(s.quests.filter((q) => q.goal).length, 5, `chapter ${ch} has five goals`);
        t.expect(s.inv.some((i) => i.id.startsWith('seed:')), `chapter ${ch} starter seeds`);
        await t.game('act', 'teleport', 9, 17, 'down');
        await t.shot(`${39 + ch}-ch${ch}-farm`);
        await t.game('setState', { time: 640 });
        await t.game('step', 450);
        await t.game('act', 'goto', 'town', 'down');
        await t.shot(`${45 + ch}-ch${ch}-town`);
        await t.checkLayout();
        // Shop stocks this chapter's seeds.
        await t.game('act', 'goto', ch === 1 ? 'tradeCamp' : 'store', 'up');
        await t.game('act', 'interact');
        s = await t.state();
        t.equal(s.modal, 'shop', `chapter ${ch} shop opens`);
        const shopTxt = await t.page.textContent('#screen');
        t.expect(/seeds/.test(shopTxt), `chapter ${ch} sells seeds`);
        await t.game('act', 'closeAll');
      }
      // Chapter 4 at night: neon.
      await chapter(t, 4, { at: 'town', time: 1290 });
      await t.game('step', 30);
      await t.shot('53-ch4-night');
      // Chapter 6 has a lake and docks; chapter 1 has no lake.
      let s = await t.state();
      t.expect(s.places.lake.y > 30, 'lake shore place');
      await chapter(t, 6, { at: 'lake' });
      await t.shot('54-ch6-lake');
    },
  },
  {
    name: 'finishing chapter 6',
    async run(t) {
      await chapter(t, 6);
      await t.game('act', 'completeGoals');
      await t.game('act', 'goto', 'farmDoor', 'up');
      await t.game('act', 'interact');
      t.expect(/finish the story/i.test(await t.page.textContent('#screen')), 'bed offers to finish the story');
      await click(t, 'sleepturn');
      await click(t, 'cardnext');
      let txt = await t.page.textContent('#screen');
      t.expect(/Majestic/.test(txt) && /4,400/.test(txt), 'finale history card');
      await click(t, 'cardnext');
      const s = await t.state();
      t.expect(s.finished, 'story finished');
      txt = await t.page.textContent('#screen');
      t.expect(/through the ages/i.test(txt) && /free play/i.test(txt), 'finale card offers free play');
      await t.shot('55-finale');
      await click(t, 'cardnext');
      t.equal((await t.state()).ch, 6, 'free play continues in 2026');
    },
  },
];
