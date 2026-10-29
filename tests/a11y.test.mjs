import { chapter, click, contrastReport, freeField } from './helpers.mjs';

async function sweepChapter(t, ch) {
  const fails = [];
  const push = (r, sc) => { for (const f of r.fails) fails.push({ ...f, sc: `ch${ch} ${sc}` }); };
  await chapter(t, ch, { at: ch === 1 ? 'tradeCamp' : 'store', time: 600 });
  await t.game('act', 'fill', [['corn', 3], ['wood', 5]]);
  push(await contrastReport(t.page), 'hud');
  for (const sc of ['inventory', 'journal', 'settings', 'pause', 'summary', 'card', 'help']) {
    await t.game('scene', sc);
    push(await contrastReport(t.page), sc);
    await t.game('act', 'closeAll');
  }
  await t.game('act', 'face', 'up');
  await t.game('act', 'interact');
  push(await contrastReport(t.page), 'shop');
  await t.game('act', 'closeAll');
  const id = (await t.state()).npcs[0].id;
  await t.game('act', 'talk', id);
  push(await contrastReport(t.page), 'dialog');
  await t.game('act', 'closeAll');
  await t.game('act', 'toast', 'A toast for contrast');
  push(await contrastReport(t.page), 'toast');
  return fails;
}

export const tests = [
  {
    name: 'contrast in every chapter palette',
    async run(t) {
      let fails = [];
      fails = fails.concat((await contrastReport(t.page)).fails.map((f) => ({ ...f, sc: 'title' })));
      for (let ch = 1; ch <= 6; ch++) fails = fails.concat(await sweepChapter(t, ch));
      const seen = new Set();
      for (const f of fails) { const key = f.sc.split(' ')[0] + f.cls + f.text; if (seen.has(key)) continue; seen.add(key); if (seen.size <= 25) t.log(`${f.sc}: "${f.text}" ${f.ratio} < ${f.need} (${f.tag}.${f.cls})`); }
      t.equal(fails.length, 0, 'all text passes WCAG contrast in all six chapter themes');
    },
  },
  {
    name: 'text size',
    async run(t) {
      await chapter(t, 3, { at: 'town' });
      await t.game('scene', 'settings');
      await click(t, 'text', '1.5');
      let s = await t.state();
      t.equal(s.settings.text, 1.5, 'text size 150%');
      const fs = await t.page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
      t.equal(fs, '24px', 'root font scaled');
      await t.game('act', 'closeAll');
      await t.checkLayout();
      await t.shot('58-text-150');
      await t.game('scene', 'inventory');
      await t.checkLayout();
      await t.shot('58b-text-150-pack');
      await t.game('act', 'closeAll');
      await t.game('scene', 'settings');
      await click(t, 'text', '1.25');
      await t.game('act', 'closeAll');
      await t.checkLayout();
      await t.game('scene', 'settings');
      await click(t, 'text', '1');
    },
  },
  {
    name: 'reduced motion',
    reducedMotion: true,
    async run(t) {
      let s = await t.state();
      t.equal(s.reduced, true, 'system preference honored');
      await chapter(t, 1, { at: 'springs' });
      await t.game('resume');
      await t.page.waitForTimeout(600);
      s = await t.state();
      t.equal(s.particles, 0, 'no drifting steam particles');
      await t.game('pause');
      await t.shot('59-reduced');
      // Era turn without the wipe animation.
      await t.game('act', 'completeGoals');
      await t.game('act', 'sleep', true);
      await t.game('act', 'cardNext');
      await t.game('act', 'cardNext');
      s = await t.state();
      t.expect(!s.wipe && s.ch === 2 && s.modal === 'card', 'era turns instantly to the next intro card');
      await t.game('scene', 'settings');
      await click(t, 'motion', 'full');
      s = await t.state();
      t.equal(s.reduced, false, 'Full motion setting overrides');
      await click(t, 'motion', 'auto');
    },
  },
  {
    name: 'rebinding keys persists',
    viewports: ['desktop'],
    async run(t) {
      await chapter(t, 1);
      await t.game('scene', 'settings');
      await click(t, 'rebind', 'use');
      t.expect(/Press a key/.test(await t.page.textContent('#screen')), 'waits for a key');
      await t.page.keyboard.press('KeyU');
      let s = await t.state();
      t.equal(s.settings.keys.use[0], 'KeyU', 'Use is now U');
      await t.shot('60-rebind');
      await t.game('act', 'closeAll');
      const [f] = await freeField(t);
      await t.game('act', 'teleport', f.x, f.y - 1, 'down');
      await t.game('act', 'select', 0);
      await t.page.keyboard.press('KeyU'); await t.game('step', 2);
      s = await t.state();
      t.equal(s.soil[f.x + ',' + f.y], 1, 'U tills');
      await t.reload();
      s = await t.state();
      t.equal(s.settings.keys.use[0], 'KeyU', 'binding survives a reload');
      await t.game('scene', 'settings');
      await click(t, 'resetkeys');
      t.equal((await t.state()).settings.keys.use[0], 'Space', 'reset restores Space');
    },
  },
  {
    name: 'sound settings persist',
    async run(t) {
      await t.game('scene', 'settings');
      await click(t, 'mute', 'on');
      await click(t, 'vol', '0.25');
      let s = await t.state();
      t.equal(s.settings.volume, 0.25, 'quiet volume');
      await click(t, 'mute', 'on');
      await t.reload();
      s = await t.state();
      t.equal(s.settings.mute, true, 'mute persists');
      t.equal(s.settings.volume, 0.25, 'volume persists');
      await t.game('scene', 'settings');
      await click(t, 'vol', '0.5');
      // A real click unlocks audio; actions then play sounds.
      await chapter(t, 1);
      await t.page.mouse.click(5, 300);
      const before = (await t.state()).audioPlayed;
      await t.page.keyboard.press('Digit2'); await t.game('step', 1);
      await t.game('act', 'select', 0);
      const [f] = await freeField(t);
      await t.game('act', 'teleport', f.x, f.y - 1, 'down');
      await t.game('act', 'use');
      s = await t.state();
      t.expect(s.audioPlayed > before, `sounds played (${before} → ${s.audioPlayed})`);
    },
  },
  {
    name: 'live region and high contrast',
    async run(t) {
      await chapter(t, 1);
      await t.game('act', 'toast', 'Quest complete: test');
      const s = await t.state();
      t.equal(s.srText, 'Quest complete: test', 'toasts are announced in the live region');
      t.equal(await t.page.getAttribute('#toasts', 'aria-live'), 'polite', 'toast stack is a polite live region');
      await t.game('scene', 'settings');
      await click(t, 'contrast', 'on');
      t.expect(await t.page.evaluate(() => document.body.classList.contains('hc')), 'high-contrast HUD class');
      await click(t, 'contrast', 'off');
    },
  },
  {
    name: 'phone readability',
    viewports: ['mobile'],
    async run(t) {
      await chapter(t, 2, { at: 'town', time: 640 });
      const z = await t.game('act', 'spriteSizes');
      t.expect(z.tile >= 30, `tiles are ${z.tile} CSS px`);
      t.expect(z.person[0] >= 30 && z.person[1] >= 45, `people are ${z.person.join('×')} CSS px`);
      const minFont = await t.page.evaluate(() => Math.min(...[...document.querySelectorAll('#hud *')].filter((e) => e.childNodes.length && e.textContent.trim()).map((e) => parseFloat(getComputedStyle(e).fontSize))));
      t.expect(minFont >= 11, `HUD text ≥ 11 px (${minFont})`);
    },
  },
];
