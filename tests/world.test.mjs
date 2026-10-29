import { chapter, holdKey } from './helpers.mjs';

export const tests = [
  {
    name: 'movement and collision',
    async run(t) {
      await chapter(t, 1);
      let s = await t.state();
      const x0 = s.player.x;
      await holdKey(t, 'ArrowRight', 40);
      s = await t.state();
      t.expect(s.player.x > x0 + 2.5, `arrow right moves (${x0} → ${s.player.x})`);
      t.equal(s.player.face, 'right', 'faces right');
      await holdKey(t, 'KeyS', 10);
      s = await t.state();
      t.equal(s.player.face, 'down', 'WASD works');
      // The creek blocks.
      await t.game('act', 'teleport', 20, 18);
      await holdKey(t, 'ArrowRight', 90);
      s = await t.state();
      t.expect(s.player.x < 22, `creek blocks walking (x = ${s.player.x})`);
      // The bridge doesn't.
      await t.game('act', 'teleport', 20, 13);
      await holdKey(t, 'ArrowRight', 90);
      s = await t.state();
      t.expect(s.player.x > 24, `bridge crosses the creek (x = ${s.player.x})`);
      // Buildings block.
      await t.game('act', 'teleport', 2, 12);
      await holdKey(t, 'ArrowUp', 40);
      s = await t.state();
      t.expect(s.player.y > 12, 'the cabin wall blocks');
      // Diagonal.
      await t.game('act', 'teleport', 10, 20);
      await t.page.keyboard.down('ArrowRight'); await t.page.keyboard.down('ArrowDown');
      await t.game('step', 20);
      await t.page.keyboard.up('ArrowRight'); await t.page.keyboard.up('ArrowDown');
      s = await t.state();
      t.expect(s.player.x > 10.9 && s.player.y > 21.1, 'diagonal moves both ways');
      // Map edge.
      await t.game('act', 'teleport', 1, 13);
      await holdKey(t, 'ArrowLeft', 60);
      s = await t.state();
      t.expect(s.player.x >= 0.3, 'stays on the map');
      await t.game('act', 'teleport', 30, 13);
      await t.shot('11-walk');
    },
  },
  {
    name: 'forage, trees and rocks',
    async run(t) {
      await chapter(t, 1);
      const find = (pred) => t.page.evaluate((src) => {
        const f = new Function('o', 'x', 'y', 'return ' + src);
        const gm = window.__vovApp.gm;
        for (const [k, o] of Object.entries(gm.S.objs)) { const [x, y] = k.split(',').map(Number); if (f(o, x, y) && !window.__game.act('blocked', x, y + 1)) return { x, y }; }
        return null;
      }, pred);
      const tree = await find("o.t === 'tree' && o.k !== 'magnolia' && y > 7 && y < 40");
      await t.game('act', 'teleport', tree.x, tree.y + 1, 'up');
      await t.game('act', 'selectItem', 'axe');
      for (let i = 0; i < 3; i++) await t.game('act', 'use');
      let s = await t.state();
      t.equal(s.inv.find((i) => i.id === 'wood')?.n, 5, 'a tree gives 5 wood');
      t.equal((await t.game('act', 'objAt', tree.x, tree.y)).t, 'stump', 'a stump remains');
      for (let i = 0; i < 2; i++) await t.game('act', 'use');
      s = await t.state();
      t.equal(s.inv.find((i) => i.id === 'wood')?.n, 7, 'the stump gives 2 more');
      const out = await find("o.t === 'outcrop'");
      await t.game('act', 'teleport', out.x, out.y + 1, 'up');
      await t.game('act', 'selectItem', 'pick');
      for (let i = 0; i < 3; i++) await t.game('act', 'use');
      s = await t.state();
      t.equal(s.inv.find((i) => i.id === 'novaculite')?.n, 2, 'an outcrop gives 2 novaculite');
      const f = s.forage[0];
      t.expect(s.forage.length >= 4, `forage spawned (${s.forage.length})`);
      const [fx, fy] = f.k.split(',').map(Number);
      const below = await t.game('act', 'blocked', fx, fy + 1);
      await t.game('act', 'teleport', fx, below ? fy - 1 : fy + 1, below ? 'down' : 'up');
      await t.game('act', 'use');
      s = await t.state();
      t.expect(s.inv.some((i) => i.id === f.id), `picked up ${f.id}`);
      await t.game('act', 'goto', 'ridge');
      await t.shot('25-ridge');
      // Forage changes with the season.
      await t.game('setState', { day: 14 });
      await t.game('act', 'sleepSkip');
      s = await t.state();
      t.expect(s.forage.every((x) => ['hickory', 'acorn', 'mushroom', 'oakleaf'].includes(x.id)), 'fall forage table');
    },
  },
];
