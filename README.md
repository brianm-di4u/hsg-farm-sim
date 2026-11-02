# Valley of Vapors: Through the Ages

Farming and life sim across the town's eras, in 16-bit-style pixel art. Part of **Hot Springs Games**, an
open-source (MIT) collection of browser games set in Hot Springs, Arkansas. The game ships as a self-contained
`index.html`: pixel art is packed into `assets/`, sound is synthesized with WebAudio, and nothing loads from the
network.

The collection's other sim, Woodland Gardens Keeper, lives in
[hsg-garden-sim](https://github.com/brianm-di4u/hsg-garden-sim). It began as this game, so both repositories
share history up to 29 October 2026.

All games in the collection are original designs. Real places, schools and businesses appear as setting and
history only; no logos are reproduced and nothing implies endorsement. School rosters are fictional.

## Play

Open `index.html` in a browser, or serve the folder (`python -m http.server 8765`) and open http://127.0.0.1:8765/.

## Develop

```bash
npm run setup   # installs Playwright and Chromium for the test harness
npm run build   # rebuilds index.html from src/ (edit src/, not index.html)
npm test        # runs tests/*.test.mjs; screenshots land in screenshots/
HS_QUERY=style=pixel npm test   # the same suite with the pixel style forced on
python -I tools/pack-px.py --tile 32   # repacks the pixel art from art-src/ (generated sources are git-ignored)
```

Design docs: `PRD.md`, `MECHANICS.md`, `DEV-PLAN.md`, `REPORT.md`, `VISUAL-PLAN-PX.md` and `VISUAL-REPORT.md`
(the pixel-art campaign, its scores and the judge's backlog), and `reviews/` (the review-loop protocol, rubric
and every loop's critiques). `VISUAL-PLAN.md` is the earlier painted-art plan.

## History

The pixel-art campaign (1 November 2026) ran in the offline monorepo and was replayed here commit by commit on
top of the split commit it grew from. A painted-art fix pass made in this repository on 29 October is not part of
this line. It survives in hsg-garden-sim's history (`eda8488`).

## Vendored from the collection

This repo was split out of the original Hot Springs Games monorepo (kept offline), which holds the full research
corpus, `LESSONS.md` and the session brief. Copies kept here so the game builds and tests on its own:

- `shared/test-harness/`: the Playwright screenshot test runner (`run.mjs`, `art-pack.mjs`, `sheets.mjs`, `gallery.mjs`).
- `shared/tools/inline.mjs`: bundles `src/` into the single-file `index.html`.
- `shared/data/trivia-questions.json`: snapshot of the audited trivia bank (`data/questions.json` in [hsg-trivia](https://github.com/brianm-di4u/hsg-trivia)), read by the fact-check tools.
- `research/`: `history-timeline.md` comes from the collection's shared research corpus.

Older docs in this repo refer to monorepo paths such as `games/farm-sim/` and `shared/...`; here the game
folder is the repo root.

## License

MIT (see `LICENSE`). Third-party code in `vendor/` keeps its own license.
