import { chapter, freeField } from './helpers.mjs';

// Stand above tile (x, y) facing down, so the target is (x, y).
const standAbove = (t, x, y) => t.game('act', 'teleport', x, y - 1, 'down');

export const tests = [
  {
    name: 'tilling rules',
    async run(t) {
      await chapter(t, 1);
      const [f] = await freeField(t);
      await standAbove(t, f.x, f.y);
      await t.game('act', 'select', 0);
      let s = await t.state();
      t.equal(s.selItem, 'hoe', 'hoe selected');
      const e0 = s.energy;
      await t.game('act', 'use');
      s = await t.state();
      t.equal(s.soil[f.x + ',' + f.y], 1, 'field tile tilled');
      t.equal(s.energy, e0 - 2, 'hoe costs 2 energy');
      await t.game('act', 'teleport', 6, 12, 'down'); // facing the path at y = 13
      await t.game('act', 'use');
      s = await t.state();
      t.expect(!s.soil['6,13'], 'path is not tillable');
      await t.game('act', 'teleport', 21, 18, 'right'); // facing the creek
      await t.game('act', 'use');
      s = await t.state();
      t.expect(!s.soil['22,18'], 'water is not tillable');
      await standAbove(t, f.x, f.y);
      await t.shot('12-tilled');
    },
  },
  {
    name: 'plant and water',
    async run(t) {
      await chapter(t, 1);
      const fs = await freeField(t, 3, 16, 3);
      for (const f of fs) { await standAbove(t, f.x, f.y); await t.game('act', 'select', 0); await t.game('act', 'use'); }
      const f = fs[0];
      await standAbove(t, f.x, f.y);
      await t.game('act', 'selectItem', 'seed:radish');
      await t.game('act', 'use');
      let s = await t.state();
      t.equal(s.crops.length, 1, 'one crop planted');
      t.equal(s.crops[0].id, 'radish', 'radish planted');
      await t.game('act', 'select', 1);
      const jug = s.jug;
      await t.game('act', 'use');
      s = await t.state();
      t.equal(s.soil[f.x + ',' + f.y], 2, 'watered');
      t.equal(s.jug, jug - 1, 'jug used one water');
      // Corn in fall fails (season rule).
      await t.game('setState', { day: 15 });
      await standAbove(t, fs[1].x, fs[1].y);
      await t.game('act', 'selectItem', 'seed:corn');
      await t.game('act', 'use');
      s = await t.state();
      t.equal(s.crops.length, 1, 'corn refused in fall');
      t.expect(s.toasts.some((x) => /won't grow in Fall/.test(x)), 'toast explains the season');
      await t.game('setState', { day: 0 });
      // Refill the jug at the creek.
      await t.game('setState', { jug: 0 });
      await t.game('act', 'teleport', 21, 18, 'right');
      await t.game('act', 'select', 1);
      await t.game('act', 'use');
      s = await t.state();
      t.equal(s.jug, 12, 'jug refilled at the creek');
      await standAbove(t, f.x, f.y);
      await t.shot('13-planted-watered');
    },
  },
  {
    name: 'growth and harvest',
    async run(t) {
      await chapter(t, 1);
      const fs = await freeField(t, 3, 17, 6);
      const crops = fs.map((f, i) => ({ x: f.x, y: f.y, id: i < 3 ? 'radish' : 'beans', age: 0, watered: true }));
      await t.game('setState', { crops });
      for (let d = 0; d < 4; d++) {
        const st = await t.state();
        const soil = {}; for (const c of st.crops) soil[c.x + ',' + c.y] = 2;
        await t.game('setState', { soil });
        if (d === 1) { await standAbove(t, fs[0].x, fs[0].y); await t.shot('14-growing'); }
        await t.game('act', 'sleepSkip');
      }
      let s = await t.state();
      const rad = s.crops.filter((c) => c.id === 'radish');
      const beans = s.crops.filter((c) => c.id === 'beans');
      t.expect(rad.every((c) => c.ripe), 'radishes ripe after 3 watered days');
      t.expect(beans.every((c) => c.ripe), 'beans ripe after 4 watered days');
      await standAbove(t, fs[0].x, fs[0].y);
      await t.shot('15-ripe');
      await t.game('act', 'select', 7);
      await t.game('act', 'use');
      s = await t.state();
      t.expect(s.inv.some((i) => i.id === 'radish'), 'radish harvested into the pack');
      t.expect(!s.crops.some((c) => c.x === fs[0].x && c.y === fs[0].y), 'radish removed (no regrow)');
      await standAbove(t, fs[3].x, fs[3].y);
      await t.game('act', 'use');
      s = await t.state();
      const b = s.crops.find((c) => c.x === fs[3].x && c.y === fs[3].y);
      t.expect(b && !b.ripe && b.age === 2, 'beans regrow (age set back to 2)');
      await t.shot('16-harvested');
      // Unwatered crops don't grow.
      const age = s.crops.find((c) => c.id === 'radish').age;
      await t.game('setState', { soil: Object.fromEntries(s.crops.map((c) => [c.x + ',' + c.y, 1])), weather: 'clear' });
      await t.game('act', 'sleepSkip');
      s = await t.state();
      if (s.weather !== 'rain') t.expect(s.crops.find((c) => c.id === 'radish').age === age, 'dry crops did not grow');
    },
  },
  {
    name: 'seasons and wilting',
    async run(t) {
      await chapter(t, 1);
      const fs = await freeField(t, 3, 18, 3);
      await t.game('setState', { day: 6, crops: [{ ...fs[0], id: 'radish', age: 1 }, { ...fs[1], id: 'corn', age: 2 }, { ...fs[2], id: 'beans', age: 1 }] });
      await t.game('act', 'sleepSkip');
      let s = await t.state();
      t.equal(s.season, 'su', 'summer after 7 spring days');
      t.expect(s.crops.find((c) => c.id === 'radish').dead, 'radish (spring/fall) wilted in summer');
      t.expect(!s.crops.find((c) => c.id === 'corn').dead, 'corn (spring/summer) survives');
      t.equal(s.summary.wilted, 1, 'summary counts the wilted crop');
      await standAbove(t, fs[0].x, fs[0].y);
      await t.shot('17-wilted');
      await t.game('act', 'selectItem', 'scythe');
      await t.game('act', 'use');
      s = await t.state();
      t.expect(!s.crops.some((c) => c.dead), 'scythe clears the dead crop');
      await t.game('setState', { day: 27 });
      await t.game('act', 'sleepSkip');
      s = await t.state();
      t.equal(s.year, 1808, 'the year advances after 28 days');
      t.equal(s.date, 'Spring 1, 1808', 'date wraps to spring');
    },
  },
];
