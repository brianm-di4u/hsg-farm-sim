import { chapter, click } from './helpers.mjs';

const npc = (s, id) => s.npcs.find((n) => n.id === id);

export const tests = [
  {
    name: 'npc schedules',
    async run(t) {
      await chapter(t, 2, { at: 'town' });
      let s = await t.state();
      t.expect(npc(s, 'corinna').hidden, 'at dawn people are indoors');
      await t.game('setState', { time: 595 });
      await t.game('step', 500);
      s = await t.state();
      const c = npc(s, 'corinna');
      t.equal(c.place, 'store', 'Corinna goes to the store at 10:00');
      t.expect(!c.hidden, 'she is out and about');
      const store = s.places.store;
      t.expect(Math.abs(c.tx - store.x) <= 1 && Math.abs(c.ty - store.y) <= 1, `she reached the store front (${c.tx},${c.ty} vs ${store.x},${store.y})`);
      await t.game('act', 'teleport', store.x + 1, store.y + 1, 'up');
      await t.shot('29-town-morning');
      await t.game('setState', { time: 1300 });
      await t.game('step', 600);
      s = await t.state();
      t.expect(s.npcs.every((n) => n.hidden), 'everyone is home by 23:00');
      await t.game('setState', { time: 1050 });
      await t.game('step', 300);
      await t.game('act', 'goto', 'town');
      await t.shot('30-town-evening');
    },
  },
  {
    name: 'dialogue, friendship and gifts',
    async run(t) {
      await chapter(t, 1, { at: 'tradeCamp' });
      await t.game('setState', { time: 700, inv: [{ id: 'hoe' }, { id: 'hickory', n: 2 }, { id: 'acorn', n: 2 }, { id: 'corn', n: 1 }] });
      await t.game('step', 400);
      let s = await t.state();
      const j = npc(s, 'josiah');
      t.equal(j.place, 'tradeCamp', 'Josiah is at the trade camp at noon');
      await t.game('act', 'teleport', j.tx, j.ty - 1, 'down');
      await t.page.keyboard.press('KeyE');
      s = await t.state();
      t.equal(s.modal, 'dialog', 'E talks to the person in front');
      t.equal(npc(s, 'josiah').pts, 3, 'first talk of the day +3');
      const txt = await t.page.textContent('#screen');
      t.expect(/Josiah Crane/.test(txt) && /Trapper/.test(txt), 'dialogue shows name and role');
      await t.shot('31-dialogue');
      await t.checkLayout();
      await click(t, 'close');
      await t.game('act', 'selectItem', 'hickory');
      await t.game('act', 'talk', 'josiah');
      s = await t.state();
      t.equal(npc(s, 'josiah').pts, 3, 'talking twice the same day adds nothing');
      await click(t, 'give', 'josiah');
      s = await t.state();
      t.equal(npc(s, 'josiah').pts, 15, 'a loved gift +12');
      t.expect(/lights up/.test(await t.page.textContent('#screen')), 'love reaction shown');
      await t.shot('32-gift');
      t.equal((await t.game('act', 'give', 'josiah', 'hickory')).already, true, 'one gift a day');
      await t.game('act', 'closeAll');
      await t.game('act', 'sleepSkip');
      await t.game('act', 'give', 'josiah', 'acorn');
      s = await t.state();
      t.equal(npc(s, 'josiah').pts, 11, 'a disliked gift −4');
      // Hearts unlock lines with facts.
      await t.game('setState', { npcs: { josiah: { pts: 45 } } });
      let seen = '';
      for (let d = 0; d < 6 && !/thermometers/.test(seen); d++) { await t.game('act', 'sleepSkip'); const r = await t.game('act', 'talk', 'josiah'); seen += r.lines.join(' '); await t.game('act', 'closeAll'); }
      t.expect(/thermometers/.test(seen), 'two-heart line appears');
      t.expect((await t.state()).almanacIds.includes('f-temp-1804'), 'its fact is added to the almanac');
    },
  },
  {
    name: 'quests and the journal',
    async run(t) {
      await chapter(t, 1, { at: 'tradeCamp' });
      await t.game('setState', { time: 700, inv: [{ id: 'hoe' }, { id: 'corn', n: 10 }, { id: 'squash', n: 4 }, { id: 'bream', n: 3 }, { id: 'catfish', n: 2 }] });
      await t.game('step', 400);
      let s = await t.state();
      const m = npc(s, 'margaux');
      const money = s.money;
      await t.game('act', 'teleport', m.tx, m.ty - 1, 'down');
      await t.game('act', 'interact');
      s = await t.state();
      t.expect(s.quests.find((q) => q.id === 'c1-trade').done, "The trader's order complete");
      t.equal(s.money, money + 120, 'reward paid');
      t.expect(!s.inv.some((i) => i.id === 'corn' || i.id === 'bream'), 'items handed over');
      t.expect(s.toasts.some((x) => /Goal complete: The trader's order/.test(x)), 'goal toast');
      await t.game('act', 'closeAll');
      // A visit quest pops a history card.
      await t.game('act', 'goto', 'springs');
      await t.game('step', 20);
      s = await t.state();
      t.expect(s.quests.find((q) => q.id === 'c1-springs').done, 'Read the springs done by walking there');
      await t.page.keyboard.press('KeyL');
      s = await t.state();
      if (s.modal === 'card') { await t.game('act', 'cardNext'); await t.page.keyboard.press('KeyL'); }
      s = await t.state();
      t.equal(s.modal, 'journal', 'L opens the journal');
      await t.shot('33-journal-goals');
      await click(t, 'jtab', 'quests');
      await t.shot('33b-journal-quests');
      await click(t, 'jtab', 'people');
      await t.shot('33c-journal-people');
      await click(t, 'jtab', 'almanac');
      const alm = await t.page.textContent('#screen');
      t.expect(/Source:/.test(alm), 'almanac lists sources');
      await t.shot('52-almanac');
      await t.checkLayout();
    },
  },
  {
    name: 'fishing',
    async run(t) {
      await chapter(t, 1, { at: 'creek' });
      await t.game('act', 'face', 'right');
      await t.game('act', 'selectItem', 'rod');
      // Cast until something bites (some casts come back empty).
      let s, bites = 0, empties = 0;
      for (let i = 0; i < 8 && !bites; i++) {
        await t.game('setState', { energy: 100 });
        await t.page.keyboard.press('Space'); await t.game('step', 1);
        s = await t.state();
        t.expect(s.fishing && s.fishing.phase === 'wait', 'line in the water');
        s = await t.stepUntil((st) => !st.fishing || st.fishing.phase === 'bite', { max: 400, chunk: 5 });
        if (s.fishing) bites++; else empties++;
      }
      t.expect(bites === 1, `a fish bites (after ${empties} empty casts)`);
      await t.shot('26-bite');
      await t.page.keyboard.press('Space'); await t.game('step', 1);
      s = await t.state();
      t.expect(!s.fishing && s.inv.some((i) => ['bream', 'catfish', 'drum', 'gar'].includes(i.id)), 'caught a creek fish');
      await t.shot('27-catch', { wait: false });
      // Too late.
      for (let i = 0; i < 10; i++) {
        await t.page.keyboard.press('Space'); await t.game('step', 1);
        s = await t.stepUntil((st) => !st.fishing || st.fishing.phase === 'bite', { max: 400, chunk: 5 });
        if (s.fishing) break;
      }
      await t.game('step', 40);
      s = await t.state();
      t.expect(!s.fishing && s.toasts.some((x) => /got away/.test(x)), 'too slow: it got away');
      // Too early.
      await t.page.keyboard.press('Space'); await t.game('step', 3);
      await t.page.keyboard.press('Space'); await t.game('step', 1);
      s = await t.state();
      t.expect(!s.fishing && s.toasts.some((x) => /Too early/.test(x)), 'too early');
      // Timing assist widens the window.
      await t.page.evaluate(() => { window.__vovApp.gm.S.assist = true; });
      await t.page.keyboard.press('Space'); await t.game('step', 1);
      s = await t.state();
      if (s.fishing) t.equal(s.fishing.win, 54, 'assist window 54 ticks (0.9 s)');
      // Lake fish from chapter 4.
      await chapter(t, 4, { at: 'lake' });
      await t.game('step', 20); // arriving at the shore completes a visit quest and shows its card
      t.equal((await t.state()).modal, 'card', 'the lake visit shows a history card');
      await t.game('act', 'closeAll');
      await t.game('act', 'face', 'down');
      await t.game('act', 'selectItem', 'rod');
      let caught = null;
      for (let i = 0; i < 12 && !caught; i++) {
        await t.game('setState', { energy: 100 });
        await t.page.keyboard.press('Space'); await t.game('step', 1);
        s = await t.stepUntil((st) => !st.fishing || st.fishing.phase === 'bite', { max: 400, chunk: 5 });
        if (s.fishing) { await t.page.keyboard.press('Space'); await t.game('step', 1); s = await t.state(); caught = s.inv.find((x) => ['bass', 'crappie', 'whitebass', 'bream', 'catfish'].includes(x.id)); }
      }
      t.expect(caught, 'caught a lake fish in chapter 4 (' + (caught && caught.id) + ')');
    },
  },
  {
    name: 'livestock',
    async run(t) {
      await chapter(t, 2, { at: 'store', time: 600, money: 2000 });
      await t.game('act', 'face', 'up');
      await t.game('act', 'interact');
      await click(t, 'buy', 'animal|1');
      let s = await t.state();
      t.equal(s.animals, 1, 'bought a cow');
      t.equal(s.money, 1500, 'for $500 (game price)');
      await t.game('act', 'closeAll');
      await t.game('act', 'fill', [['hay', 3]]);
      await t.game('act', 'goto', 'trough', 'up');
      await t.game('act', 'selectItem', 'hay');
      await t.game('act', 'interact');
      s = await t.state();
      t.equal(s.trough, 3, 'hay in the trough');
      await t.game('act', 'sleepSkip');
      s = await t.state();
      t.equal(s.penOut.milk, 1, 'the fed cow gave milk');
      t.equal(s.trough, 2, 'she ate one feed');
      await t.game('act', 'goto', 'trough', 'up');
      await t.game('act', 'interact');
      s = await t.state();
      t.equal(s.inv.find((i) => i.id === 'milk')?.n, 1, 'collected the milk');
      t.equal(s.quests.find((q) => q.id === 'c2-milk').progress[0], 1, 'A milk cow progress');
      await t.game('setState', { trough: 0 });
      await t.game('act', 'sleepSkip');
      s = await t.state();
      t.expect(!s.penOut.milk, 'no feed, no milk');
      await t.game('step', 200);
      await t.game('act', 'teleport', 16, 13, 'up');
      await t.shot('28-animals');
    },
  },
];
