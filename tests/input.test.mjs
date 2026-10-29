// Real input only (keyboard and touch): no setState and no act() for the farming actions.
import { chapter } from './helpers.mjs';

// A field column whose tiles from the path (y = 13) down to `y` have no blocking objects, and whose
// target tile is free for tilling.
async function clearColumn(t, y = 16) {
  return t.page.evaluate((ty) => {
    const gm = window.__vovApp.gm, S = gm.S;
    for (let x = 6; x <= 19; x++) {
      let ok = !S.objs[x + ',' + ty] && !S.soil[x + ',' + ty];
      for (let yy = 13; yy <= ty; yy++) if (window.__game.act('blocked', x, yy)) ok = false;
      if (ok) return x;
    }
    return null;
  }, y);
}
// Walk with held keys: x first along the current row, then y. Stepping is deterministic.
async function walkTo(t, keys, tx, ty) {
  const K = { left: keys.left || 'ArrowLeft', right: keys.right || 'ArrowRight', up: keys.up || 'ArrowUp', down: keys.down || 'ArrowDown' };
  for (let guard = 0; guard < 40; guard++) {
    const s = await t.state();
    const dx = tx + 0.5 - s.player.x;
    if (Math.abs(dx) <= 0.08) break;
    const key = dx > 0 ? K.right : K.left;
    const ticks = Math.max(1, Math.floor(Math.abs(dx) / 0.075));
    await t.page.keyboard.down(key); await t.game('step', ticks); await t.page.keyboard.up(key);
  }
  for (let guard = 0; guard < 40; guard++) {
    const s = await t.state();
    const dy = ty + 0.9 - s.player.y;
    if (Math.abs(dy) <= 0.08) break;
    const key = dy > 0 ? K.down : K.up;
    const ticks = Math.max(1, Math.floor(Math.abs(dy) / 0.075));
    await t.page.keyboard.down(key); await t.game('step', ticks); await t.page.keyboard.up(key);
  }
  return t.state();
}
async function face(t, key) { await t.page.keyboard.down(key); await t.game('step', 1); await t.page.keyboard.up(key); await t.game('step', 1); }
async function key(t, k) { await t.page.keyboard.press(k); await t.game('step', 2); }

export const tests = [
  {
    name: 'keyboard only: till, plant, water, sleep, harvest',
    viewports: ['desktop'],
    async run(t) {
      await chapter(t, 1);
      const col = await clearColumn(t, 16);
      t.expect(col != null, `found a clear column (${col})`);
      let s = await walkTo(t, {}, col, 15);
      t.equal(s.player.tx + ',' + s.player.ty, `${col},15`, 'walked to the field edge');
      await face(t, 'ArrowDown');
      s = await t.state();
      t.equal(s.target.x + ',' + s.target.y, `${col},16`, 'facing the tile to till');
      await key(t, 'Digit1'); await key(t, 'Space');
      s = await t.state();
      t.equal(s.soil[`${col},16`], 1, 'tilled with Space');
      await key(t, 'Digit7'); await key(t, 'Space');
      s = await t.state();
      t.equal(s.crops.find((c) => c.x === col && c.y === 16)?.id, 'radish', 'planted a radish');
      await key(t, 'Digit2'); await key(t, 'Space');
      s = await t.state();
      t.equal(s.soil[`${col},16`], 2, 'watered');
      for (let day = 0; day < 3; day++) {
        // Walk home along the path and go to bed with E, then Enter through the prompts.
        await walkTo(t, {}, col, 13);
        await walkTo(t, {}, 4, 12);
        await face(t, 'ArrowUp');
        await key(t, 'KeyE');
        s = await t.state();
        t.equal(s.modal, 'bed', `day ${day + 1}: bed prompt`);
        await t.page.keyboard.press('Enter'); await t.page.waitForTimeout(30);
        s = await t.state();
        t.equal(s.modal, 'summary', `day ${day + 1}: slept`);
        await t.page.keyboard.press('Enter'); await t.page.waitForTimeout(30);
        s = await t.state();
        t.equal(s.modal, null, 'summary closed');
        await walkTo(t, {}, col, 13);
        await walkTo(t, {}, col, 15);
        await face(t, 'ArrowDown');
        s = await t.state();
        const crop = s.crops.find((c) => c.x === col && c.y === 16);
        if (crop && !crop.ripe && s.soil[`${col},16`] !== 2) { await key(t, 'Digit2'); await key(t, 'Space'); }
      }
      s = await t.state();
      t.expect(s.crops.find((c) => c.x === col && c.y === 16)?.ripe, 'radish ripe after three nights');
      await t.shot('57-keys-harvest');
      await key(t, 'Space');
      s = await t.state();
      t.expect(s.inv.some((i) => i.id === 'radish'), 'harvested with Space');
      t.expect(!s.crops.some((c) => c.x === col && c.y === 16), 'crop removed');
    },
  },
  {
    name: 'touch: pad, A and B, tap to walk',
    viewports: ['mobile'],
    async run(t) {
      await chapter(t, 1);
      let s = await t.state();
      t.expect(s.touch, 'touch controls shown on a touch phone');
      const box = async (sel) => t.page.$eval(sel, (e) => { const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height }; });
      const pad = await box('#pad'), A = await box('#btn-a'), B = await box('#btn-b');
      for (const [n, b] of [['pad', pad], ['A', A], ['B', B]]) t.expect(b.w >= 44 && b.h >= 44, `${n} target ≥ 44 px (${b.w}×${b.h})`);
      const slots = await t.page.$$eval('#hotbar .slot', (els) => els.map((e) => e.getBoundingClientRect()).map((r) => Math.min(r.width, r.height)));
      t.expect(slots.every((v) => v >= 44), `hotbar slots ≥ 44 px (${Math.min(...slots)})`);
      // Hold the pad to the right while the game steps.
      const x0 = s.player.x;
      const drag = t.touchDrag([pad.x, pad.y], [pad.x + 55, pad.y], { steps: 4, holdEndMs: 400 });
      for (let i = 0; i < 40 && !(await t.page.evaluate(() => window.__vovApp.pad.x)); i++) await t.page.waitForTimeout(15);
      await t.game('step', 30);
      await drag;
      s = await t.state();
      t.expect(s.player.x > x0 + 1.5, `pad moved the player right (${x0} → ${s.player.x.toFixed(2)})`);
      // Tap-to-walk to a clear field column, then till/plant/water with A.
      const col = await clearColumn(t, 17);
      const scr = await t.page.evaluate(([x, y]) => { const R = window.__vovScene.R; return { x: (x + 0.5 - R.cam.x) * R.ts, y: (y + 0.5 - R.cam.y) * R.ts }; }, [col, 16]);
      await t.tap([scr.x, scr.y]);
      await t.game('step', 420);
      s = await t.state();
      t.equal(s.player.tx + ',' + s.player.ty, `${col},16`, 'tap walked to the tile');
      // Face down with a short pad flick, then A.
      const d2 = t.touchDrag([pad.x, pad.y], [pad.x, pad.y + 40], { steps: 2, holdEndMs: 120 });
      await t.page.waitForTimeout(60); await t.game('step', 1); await d2; await t.game('step', 1);
      s = await t.state();
      t.equal(s.player.face, 'down', 'pad flick faces down');
      const slotBox = async (i) => box(`#hotbar [data-arg="${i}"]`);
      const tapUse = async () => { await t.tap([A.x, A.y]); await t.game('step', 2); };
      await t.tap(Object.values(await slotBox(0)).slice(0, 2)); await tapUse();
      s = await t.state();
      t.equal(s.soil[`${s.target.x},${s.target.y}`], 1, 'A tilled the tile');
      await t.tap(Object.values(await slotBox(6)).slice(0, 2)); await tapUse();
      await t.tap(Object.values(await slotBox(1)).slice(0, 2)); await tapUse();
      s = await t.state();
      t.expect(s.crops.some((c) => c.x === s.target.x && c.y === s.target.y), 'A planted');
      t.equal(s.soil[`${s.target.x},${s.target.y}`], 2, 'A watered');
      await t.shot('56-touch-pad');
      // B talks: walk to Josiah's spot with a tap, then B.
      await t.game('setState', { time: 470 });
      await t.game('step', 400);
      s = await t.state();
      const j = s.npcs.find((n) => n.id === 'josiah');
      await t.game('act', 'teleport', j.tx, j.ty - 1, 'down');
      await t.tap([B.x, B.y]); await t.game('step', 2);
      s = await t.state();
      t.equal(s.modal, 'dialog', 'B opens a conversation');
    },
  },
];
