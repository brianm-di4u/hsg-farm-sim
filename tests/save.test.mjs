import { chapter, click, freeField } from './helpers.mjs';

export const tests = [
  {
    name: 'autosave, continue and manual save',
    async run(t) {
      await t.seed(21);
      await t.game('newGame', {});
      const [f] = await freeField(t);
      await t.game('setState', { money: 777, crops: [{ x: f.x, y: f.y, id: 'corn', age: 2, watered: true }] });
      await t.game('act', 'sleepSkip');
      let s = await t.state();
      const want = { day: s.day, money: s.money, crops: s.crops.length, date: s.date };
      await t.reload();
      s = await t.state();
      t.equal(s.scene, 'title', 'reload lands on the title');
      t.expect(!(await t.page.$('.title-menu button[disabled]')), 'Continue enabled');
      t.expect(/Chapter 1/.test(await t.page.textContent('#screen')), 'title shows the saved chapter');
      await click(t, 'continue');
      s = await t.state();
      t.equal(s.day, want.day, 'day restored');
      t.equal(s.money, want.money, 'money restored');
      t.equal(s.crops.length, want.crops, 'crops restored');
      t.equal(s.crops[0].age, 3, 'crop age restored');
      // Manual save from the pause menu.
      await t.game('setState', { money: 4321 });
      await t.game('scene', 'pause');
      await click(t, 'save');
      await t.reload();
      await click(t, 'continue');
      t.equal((await t.state()).money, 4321, 'manual save restored');
    },
  },
  {
    name: 'old save versions migrate',
    async run(t) {
      await chapter(t, 2);
      const raw = await t.game('act', 'rawSave');
      const o = JSON.parse(raw || '{}');
      const st = o.state || (await t.page.evaluate(() => JSON.parse(JSON.stringify(window.__vovApp.gm.S))));
      // Build a v0-style save: money was `gold`, chapter was `era`, no almanac.
      const v0 = { ...st, v: 0, gold: 999, era: st.ch };
      delete v0.money; delete v0.ch; delete v0.almanac; delete v0.chaptersReached;
      const r = await t.game('act', 'loadRaw', JSON.stringify({ v: 0, state: v0 }));
      t.equal(r, true, 'v0 save loads');
      const s = await t.state();
      t.equal(s.money, 999, 'gold became money');
      t.equal(s.ch, 2, 'era became the chapter');
      t.equal(s.almanac, 0, 'almanac added');
      const bad = await t.game('act', 'loadRaw', JSON.stringify({ v: 1, state: { ch: 9 } }));
      t.expect(typeof bad === 'string', `a broken save is rejected with a message (${bad})`);
    },
  },
  {
    name: 'storage blocked',
    initScript: () => {
      const no = () => { throw new Error('storage blocked'); };
      Object.defineProperty(window, 'localStorage', { get: no, configurable: true });
    },
    async run(t) {
      let s = await t.state();
      t.equal(s.storageOK, false, 'storage detected as blocked');
      t.expect(/unavailable/.test(await t.page.textContent('#screen')), 'title explains saving is unavailable');
      await t.seed(4);
      await t.game('newGame', {});
      await t.game('act', 'sleepSkip');
      s = await t.state();
      t.equal(s.day, 1, 'the game still plays');
      await t.game('scene', 'pause');
      t.expect(await t.page.$('[data-act="save"][disabled]'), 'Save button disabled');
      await t.game('scene', 'settings');
      await click(t, 'text', '1.25');
      t.equal((await t.state()).settings.text, 1.25, 'settings still apply');
    },
  },
  {
    name: 'determinism',
    async run(t) {
      const runOnce = async () => {
        await t.seed(99);
        await t.game('newGame', { paused: true });
        const [f] = await freeField(t);
        await t.game('act', 'teleport', f.x, f.y - 1, 'down');
        await t.game('act', 'select', 0); await t.game('act', 'use');
        await t.game('act', 'selectItem', 'seed:corn'); await t.game('act', 'use');
        await t.page.keyboard.down('ArrowRight'); await t.game('step', 37); await t.page.keyboard.up('ArrowRight');
        await t.game('step', 900);
        for (let i = 0; i < 4; i++) await t.game('act', 'sleepSkip');
        await t.game('act', 'goto', 'creek', 'right');
        await t.game('act', 'selectItem', 'rod');
        await t.game('act', 'use'); await t.game('step', 300);
        const s = await t.state();
        return JSON.stringify({ p: s.player, w: s.weather, f: s.forage, c: s.crops, n: s.npcs.map((n) => [n.x, n.y]), m: s.money, e: s.energy, fish: s.fishing, inv: s.inv });
      };
      const a = await runOnce();
      const b = await runOnce();
      t.equal(a, b, 'same seed and same inputs give the same state');
    },
  },
];
