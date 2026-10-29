// Painted art: every asset in assets/manifest.json loads, the painted layer is what gets drawn, the vector art
// still works with ?art=0, and a tour of eras, seasons, weather and night for the visual review.
import { chapter } from './helpers.mjs';

const waitArt = (t) => t.page.waitForFunction(() => { const s = window.__game.getState(); return s.artPending === 0 && s.artLoaded > 0; }, null, { timeout: 15000 });

export const tests = [
  {
    name: 'painted art loads with no failures',
    async run(t) {
      await chapter(t, 3, { at: 'town', time: 660 });
      await t.waitForStable();
      // The rest of the set streams in after the chapter's own art; wait for all of it.
      await t.page.waitForFunction(() => { const s = window.__game.getState(); return s.artPending === 0 && s.artLoaded >= s.artTotal; }, null, { timeout: 20000 });
      const s = await t.state();
      t.equal(s.artFailed.length, 0, `no asset failed to load (${s.artFailed.join(', ')})`);
      t.expect(s.artLoaded >= 100, `${s.artLoaded} of ${s.artTotal} painted assets loaded`);
      t.expect(s.painted.terrain && s.painted.people && s.painted.buildings > 5, `painted terrain, people and ${s.painted.buildings} buildings in use`);
      await t.shot('70-art-town');
    },
  },
  {
    name: 'vector fallback with ?art=0',
    url: 'index.html?art=0',
    async run(t) {
      await chapter(t, 4, { at: 'town', time: 660 });
      const s = await t.state();
      t.equal(s.artLoaded, 0, 'no painted art requested');
      t.expect(!s.painted.terrain && !s.painted.people, 'vector terrain and people');
      await t.shot('71-vector-fallback');
    },
  },
  {
    name: 'era and weather tour',
    async run(t) {
      const tour = [
        ['72-springs-1807', 1, { at: 'springs', time: 420, day: 3 }],
        ['73-springs-1931', 4, { at: 'springs', time: 900, day: 10 }],
        ['74-new-lake-1931', 4, { at: 'lake', time: 600, day: 3 }],
        ['75-lake-1955-evening', 5, { at: 'lake', time: 1110, day: 10 }],
        ['76-town-1871-rain', 2, { at: 'town', time: 700, weather: 'rain' }],
        ['77-town-1886-snow', 3, { at: 'town', time: 640, day: 24, weather: 'snow' }],
        ['78-town-1955-night', 5, { at: 'town', time: 1290 }],
        ['79-town-2026-night', 6, { at: 'town', time: 1290 }],
        ['80-farm-1807-fall', 1, { at: 'field', time: 800, day: 17 }],
        ['81-ridge-1886', 3, { at: 'quarry', time: 960, day: 10 }],
        ['82-town-1931-dusk', 4, { at: 'street', time: 1150 }],
        ['83-farm-2026-golden', 6, { at: 'stand', time: 1060, day: 10 }],
        ['84-yard-1871', 2, { at: 'bin', time: 640 }],
        ['85-yard-1955', 5, { at: 'bin', time: 900 }],
        ['86-lot-1931', 4, { at: 'bridge', time: 900 }],
        ['87-lot-1955-night', 5, { at: 'bridge', time: 1290 }],
      ];
      for (const [name, ch, o] of tour) {
        await chapter(t, ch, o);
        await waitArt(t);
        await t.waitFrames(3);
        await t.shot(name);
      }
      // Nothing the painted set covers may fall back to vector placeholders during the tour.
      const s = await t.state();
      const painted = ['tree', 'rock', 'outcrop', 'crystal', 'tuft', 'bin', 'trough', 'sign', 'hut'];
      t.equal(s.vectorFallback.filter((k) => painted.includes(k)).join(), '', 'no placeholder art for painted objects');
      await t.checkLayout();
    },
  },
];
