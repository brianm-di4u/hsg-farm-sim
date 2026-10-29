import { chapter, click } from './helpers.mjs';

export const tests = [
  {
    name: 'title and hooks',
    async run(t) {
      const s = await t.state();
      t.equal(s.scene, 'title', 'starts on the title');
      t.expect(t.loadMs < 2000, `hooks ready in ${t.loadMs} ms (< 2000)`);
      for (const a of ['newgame', 'open']) t.expect(await t.page.$(`[data-act="${a}"]`), `title has ${a}`);
      t.expect(await t.page.$('.title-menu button[disabled]'), 'Continue disabled without a save');
      await t.shot('01-title');
      await t.checkLayout();
    },
  },
  {
    name: 'help and about',
    async run(t) {
      await click(t, 'open', 'help');
      const help = await t.page.textContent('#screen');
      t.expect(/Controls/.test(help) && /touch pad/i.test(help) && /game content/i.test(help), 'help covers controls and the game-content note');
      await t.shot('02-help');
      await t.checkLayout();
      await click(t, 'close');
      await click(t, 'open', 'about');
      const about = await t.page.textContent('#screen');
      t.expect(/MIT/.test(about) && /mulberry32/.test(about), 'about credits license and samples');
      await t.shot('03-about');
      await t.checkLayout();
    },
  },
  {
    name: 'new game shows the chapter intro then the farm',
    async run(t) {
      await t.seed(3);
      await t.game('newGame', { skipIntro: false });
      let s = await t.state();
      t.equal(s.modal, 'card', 'intro card first');
      const txt = await t.page.textContent('#screen');
      t.expect(/Steam Valley/.test(txt) && /Calfait Creek/.test(txt) && /Source:/.test(txt), 'intro names the chapter and cites a source');
      await t.shot('03b-intro-card');
      await t.checkLayout();
      await click(t, 'cardnext');
      s = await t.state();
      t.equal(s.modal, null, 'card closed');
      t.equal(s.ch, 1, 'chapter 1');
      t.equal(s.date, 'Spring 1, 1807', 'date label');
      await t.game('pause');
      await t.shot('04-game');
      await t.checkLayout();
    },
  },
];
