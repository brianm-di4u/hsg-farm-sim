import { chapter, click, freeField } from './helpers.mjs';

export const tests = [
  {
    name: 'night, sleep and collapse',
    async run(t) {
      await chapter(t, 2, { at: 'town' });
      await t.game('setState', { time: 1150 });
      await t.shot('18-dusk');
      await t.game('setState', { time: 1320 });
      let s = await t.state();
      t.equal(s.clock, '22:00', 'clock reads 22:00');
      await t.shot('19-night');
      // Bed from the farmhouse door.
      await t.game('act', 'goto', 'farmDoor', 'up');
      await t.game('act', 'interact');
      s = await t.state();
      t.equal(s.modal, 'bed', 'bed prompt at the door');
      await click(t, 'sleep');
      s = await t.state();
      t.equal(s.modal, 'summary', 'morning summary after sleeping');
      t.equal(s.clock, '06:00', 'new day starts at 06:00');
      t.equal(s.day, 1, 'day advanced');
      t.equal(s.energy, 100, 'energy restored');
      await t.shot('20-summary');
      await t.checkLayout();
      await click(t, 'cardnext');
      // Collapse at 02:00.
      await t.game('setState', { time: 1558, money: 500 });
      await t.game('step', 40);
      s = await t.state();
      t.equal(s.day, 2, 'collapsing ends the day');
      t.expect(s.summary.passOut, 'summary marks the collapse');
      t.equal(s.money, 450, 'lost 10% of cash');
      t.equal(s.energy, 60, 'woke tired');
    },
  },
  {
    name: 'clock speed and modal pause',
    async run(t) {
      await chapter(t, 1);
      await t.game('step', 15 * 60);
      let s = await t.state();
      t.equal(s.clock, '07:00', 'one game hour = 900 ticks (15 s)');
      await t.game('scene', 'journal');
      await t.game('step', 300);
      s = await t.state();
      t.equal(s.clock, '07:00', 'clock stops while a panel is open');
      await t.game('act', 'closeAll');
    },
  },
  {
    name: 'weather',
    async run(t) {
      await chapter(t, 1);
      // Deterministic: the same seed gives the same weather sequence.
      const seq = async () => { await t.seed(11); await t.game('scene', { era: 1 }); const w = []; for (let i = 0; i < 12; i++) { await t.game('act', 'sleepSkip'); w.push((await t.state()).weather); } return w.join(','); };
      const a = await seq(), b = await seq();
      t.equal(a, b, 'weather is deterministic for a seed');
      t.expect(/rain/.test(a), `rain occurs in 12 spring/summer days (${a})`);
      // Rain waters tilled soil.
      await t.game('setState', { soil: { '5,20': 1 }, weather: 'clear' });
      let s;
      for (let i = 0; i < 20; i++) { await t.game('setState', { soil: { '5,20': 1 } }); await t.game('act', 'sleepSkip'); s = await t.state(); if (s.weather === 'rain') break; }
      t.equal(s.weather, 'rain', 'found a rainy day');
      if (s.soil['5,20']) t.equal(s.soil['5,20'], 2, 'rain watered the soil');
      await t.game('act', 'goto', 'field');
      await t.shot('21-rain');
      await t.game('setState', { weather: 'snow', day: 22 });
      await t.shot('22-snow');
      await t.game('setState', { weather: 'fog', day: 3, time: 400 });
      await t.shot('23-fog');
    },
  },
  {
    name: 'energy',
    async run(t) {
      await chapter(t, 1, { at: 'field' });
      const [f] = await freeField(t);
      await t.game('act', 'teleport', f.x, f.y - 1, 'down');
      await t.game('setState', { energy: 1 });
      await t.game('act', 'select', 0);
      await t.game('act', 'use');
      let s = await t.state();
      t.expect(s.toasts.some((x) => /Too tired/.test(x)), 'tools refuse at low energy');
      t.equal(s.energy, 1, 'no energy spent');
      // Low energy slows walking.
      await t.game('setState', { energy: 10 });
      const x0 = s.player.x;
      await t.page.keyboard.down('ArrowRight'); await t.game('step', 20); await t.page.keyboard.up('ArrowRight');
      s = await t.state();
      const slow = s.player.x - x0;
      await t.game('setState', { energy: 100, player: { tx: 11, ty: 22 } });
      const s2 = await t.state();
      await t.page.keyboard.down('ArrowRight'); await t.game('step', 20); await t.page.keyboard.up('ArrowRight');
      const fast = (await t.state()).player.x - s2.player.x;
      t.expect(slow < fast * 0.8, `slower when tired (${slow.toFixed(2)} vs ${fast.toFixed(2)})`);
      // Food and soaks restore.
      await t.game('setState', { energy: 20, inv: [{ id: 'hoe' }, { id: 'jug' }, { id: 'hickory', n: 2 }] });
      await t.game('act', 'eat', 'hickory');
      s = await t.state();
      t.equal(s.energy, 30, 'hickory nuts +10 energy');
      await t.game('act', 'goto', 'soak', 'up');
      await t.game('act', 'interact');
      s = await t.state();
      t.equal(s.energy, 60, 'hot soak +30 energy');
      await t.game('act', 'interact');
      s = await t.state();
      t.equal(s.energy, 60, 'one soak a day');
      await t.game('setState', { energy: 12 });
      await t.game('act', 'goto', 'field');
      await t.shot('24-low-energy');
    },
  },
];
