import { chapter } from './helpers.mjs';

export const tests = [
  {
    name: 'performance and budgets',
    async run(t) {
      t.expect(t.loadMs < 2000, `hooks ready in ${t.loadMs} ms`);
      const bytes = await t.page.evaluate(() => document.documentElement.outerHTML.length);
      t.expect(bytes < 2 * 1024 * 1024, `page ${(bytes / 1024).toFixed(0)} KB < 2 MB`);
      for (const [ch, at] of [[1, 'farmDoor'], [3, 'town'], [4, 'town'], [6, 'lake']]) {
        await chapter(t, ch, { at, time: ch === 4 ? 1250 : 700 });
        await t.waitForStable(); // painted art for the chapter has loaded and the first chunks are baked
        await t.game('resume');
        // Walk while measuring so the camera and chunks move.
        await t.page.keyboard.down('ArrowRight');
        const fps = await t.fps(1500);
        await t.page.keyboard.up('ArrowRight');
        const fm = (await t.state()).frameMs;
        await t.game('pause');
        t.log(`ch${ch} ${at}: ${fps.toFixed(1)} fps, ${fm} ms of script per frame`);
        t.expect(fm < 8, `chapter ${ch} frame script cost ${fm} ms (< 8 ms)`);
        t.expect(fps >= 55, `chapter ${ch} runs at ${fps.toFixed(1)} fps (≥ 55)`);
      }
      const mb = await t.memoryMB();
      t.log(`heap ${mb.toFixed(1)} MB`);
      t.expect(mb < 40, `JS heap ${mb.toFixed(1)} MB < 40`);
      // Standing still doesn't rebake chunks.
      await chapter(t, 2, { at: 'town' });
      await t.game('resume');
      await t.page.waitForTimeout(1500); // chunks around the view are baked ahead in the background first
      const a = (await t.state()).chunkBakes;
      await t.page.waitForTimeout(700);
      const b = (await t.state()).chunkBakes;
      await t.game('pause');
      t.equal(b, a, 'no chunk rebakes while standing still');
    },
  },
];
