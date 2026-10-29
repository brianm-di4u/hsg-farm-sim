# Valley of Vapors: Through the Ages — report

An original farming and life sim on one creek-bottom farm in the Hot Springs valley, played across six
chapters from 1807 to 2026. `index.html` (0.65 MB, including inlined fonts) plus `assets/` (222 painted WebP
images, 9.3 MB, loaded progressively). Build `src/` with `node shared/tools/inline.mjs games/farm-sim`. Nothing is
committed; the coordinator reviews and commits.

**Visual pass (2026-10-29).** Painted art replaced the vector prototype. It covers:
- 48 era buildings, terrain textures laid as smooth regions, and crops, animals, props, vehicles and icons;
- Blender-rendered characters with walk and tool-swing cycles;
- era lighting with lit windows and neon, moving sun shadows, steam, and weather;
- a per-era display typeface, and painted title and era-wipe panoramas.

The simulation, saves and balance are unchanged. The final run (`--milestone visual-final`) passed **88/88**
at both viewports, and the file:// check passes. The independent review scored the game 35/80 before the
pass and 44/80 after its last round. Details are in `VISUAL-PLAN.md` and `VISUAL-REPORT.md`. The sections
below describe the build before the visual pass, except where noted.

## What was built
- **The daily loop.** A 60 × 44-tile valley (farm, Gulpha Creek, town, the springs, the north ridge,
  the south bottoms) with chunk-cached procedural tiles and a y-sorted object layer. Hoe, watering jug,
  axe, pick, scythe and fishing pole; till, plant, water, grow by season, harvest, regrow; trees, rocks,
  novaculite outcrops and quartz nodes; daily forage on the ridge; a shipping bin paid overnight; sleep,
  a morning summary and autosave; collapse at 02:00 costs 10% of cash. Energy with food, a once-a-day hot
  soak, and a novaculite whetstone that permanently sharpens the hoe, axe and pick.
- **Time and weather.** Fixed 60 Hz step (a game minute is 15 ticks), 06:00–02:00 days, 4 × 7-day
  seasons, a 28-day year. Seeded daily weather from the corpus climate normals (rain waters crops,
  rare winter snow, morning steam fog). Night darkens to era light sources (campfire, lantern, gas, neon,
  sodium, LED).
- **People.** 18 fictional neighbors, three per chapter, each with a schedule (BFS paths, side-by-side
  spots at shared places, home at night), five hearts of friendship, daily talk and gift rules, loved,
  liked and disliked gifts, lines unlocked by hearts and season, and one request each.
- **Quests and eras.** 36 quests (5 goals per chapter plus extras). With all five goals done, the bed
  offers "Sleep and turn the era": a closing history card (3–7 sourced facts), a valley vista wiping from
  one era's palette to the next, and the next chapter's intro card. The next generation of the Vale family
  takes over: new palette and UI theme, town buildings, roads and lamps, cast, crops and shop, era tools
  (the 1955 tiller tills three tiles; drip lines in 2026), farmhouse style, livestock type (cow, goat,
  hen), and a lake that fills the south bottoms from 1931. Money, goods, the almanac and the whetstone
  carry over. Chapter 6 ends with a finale card and free play.
- **Era content.** 1807 Steam Valley (trade camp, health-seeker huts, rental hut goal, heritage quarry
  sign), 1871 The Reservation (water mill, shingles, milk cow, cold-spring jugs), 1886 Golden Age of the
  Row (hotel kitchen, ballclub, hot-water route, brick farmhouse), 1931 The Open Town (Lake Hamilton bass,
  tourist court, radio farm report, a late supper at the club), 1955 Mid-Century (roadside stand, motel
  breakfast, animal-show corn, relocated neighbors), 2026 Today (brewery hops, farmers' market, the race
  tub, the restoration fund). 20 crops, 10 fish (creek and lake tables by chapter and season), 16 recipes.
- **History, handled carefully.** 84 facts in `data/facts.json`: 81 restated from the audited bank and 3
  quoted from `research/history-timeline.md` (park archaeology and tribal consultation, the 1860 enslaved
  population, the 1880s segregated bathing hours). Every card names its source and URL. Legends (de Soto,
  the neutral ground) carry a Legend tag. The old quarry is a read-only heritage site; novaculite comes from
  ordinary ridge outcrops. No Native characters are invented; no real people appear as characters.
- **Polish.** WebAudio sound for every action (quiet by default, mute and volume); settings for text size
  (100/125/150%), motion (system/reduced/full), touch controls, high-contrast HUD, a wider fishing window,
  and fully rebindable keys; a live region for toasts; on-screen pad with A and B buttons and tap-to-walk
  on phones; a journal with goals, quests, people and the almanac; chapter select; a chest.

## Acceptance criteria
| AC | Status | Evidence |
|---|---|---|
| AC1 title, hooks < 2 s | met | screens › title and hooks (hooks in ~100 ms) |
| AC2 help/about | met | screens › help and about |
| AC3 layout both viewports | met | `checkLayout` across 30+ screens, all chapters, text 125/150% |
| AC4 movement and collision | met | world › movement and collision (keyboard; creek, bridge, walls, diagonal, edge) |
| AC5 tilling | met | farm › tilling rules |
| AC6 planting and watering | met | farm › plant and water (season rule, jug refill) |
| AC7 growth and harvest | met | farm › growth and harvest (regrow, dry crops don't grow) |
| AC8 seasons | met | farm › seasons and wilting (wilt, year rollover) |
| AC9 day/night, sleep, collapse | met | time › night, sleep and collapse; time › clock speed and modal pause |
| AC10 weather | met | time › weather (deterministic per seed; rain waters) |
| AC11 energy | met | time › energy (refusal, slower when tired, food, one soak a day) |
| AC12 shipping | met | economy › shipping bin pays overnight |
| AC13 shops | met | economy › shop buy and sell, hours |
| AC14 inventory and hotbar | met | economy › inventory and hotbar (keys 1–8, Q/R, click, swap, stacks of 99) |
| AC15 crafting | met | economy › crafting and the whetstone |
| AC16 forage and resources | met | world › forage, trees and rocks |
| AC17 fishing | met | life › fishing (bite window, empty casts, too early/late, assist, lake fish) |
| AC18 livestock | met | life › livestock |
| AC19 schedules | met | life › npc schedules |
| AC20 friendship and dialogue | met | life › dialogue, friendship and gifts |
| AC21 quests | met | life › quests and the journal |
| AC22 era goals and turn | met | eras › goals and the era turn |
| AC23 era changes | met | eras › goals and the era turn; eras › all six chapters |
| AC24 all six chapters completable | met | eras › all six chapters; eras › finishing chapter 6; goals › (6 tests); balance bot finishes all six chapters on 6/6 seeds |
| AC25 sourced facts, legends | met | content › 2 tests; `tools/check-facts.mjs`: 84 facts, 143 game texts, 0 problems |
| AC26 save/load | met | save › autosave, continue and manual save; old versions migrate; storage blocked |
| AC27 determinism | met | save › determinism |
| AC28 rebinding | met | a11y › rebinding keys persists |
| AC29 text size | met | a11y › text size |
| AC30 reduced motion | met | a11y › reduced motion |
| AC31 touch | met | input › touch: pad, A and B, tap to walk (real CDP touch; targets ≥ 44 px) |
| AC32 real-input loop | met | input › keyboard only: till, plant, water, sleep, harvest (no setState) |
| AC33 contrast | met | a11y › contrast in every chapter palette (0 failures, 6 themes × 10 screens) |
| AC34 phone readability | met | a11y › phone readability (34 px tiles, 34 × 51 px people, HUD text ≥ 11 px) |
| AC35 performance | met | perf › performance and budgets: 59–60 fps, ≤ 1.1 ms script per frame, 9.5 MB heap, 299 KB page, hooks in ~100 ms (both viewports) |
| AC36 balance | met, outliers named | `tools/balance.mjs 6` (below) |
| AC37 audio | met | a11y › sound settings persist |
| AC38 live region | met | a11y › live region and high contrast |

## Test results
`node shared/test-harness/run.mjs games/farm-sim --milestone final`: **82/82 passed** (desktop 1280 × 800 and
mobile 390 × 844), zero console errors and zero external requests (the harness fails a test on either).
13 test files: 45 tests on desktop and 37 on mobile (some are viewport-only), 130 screenshots in
`screenshots/final/{desktop,mobile}` with 20 contact sheets in `screenshots/final/sheets`. Every sheet was
inspected, and the full-size frames were checked for the dialogue, legend, history-card, night and touch screens.

One test fix after the run: `content › legends are labelled` only saved `61-legend` when the de Soto legend came
up first; in the final run the neutral-ground legend came first, so the shot was skipped (the assertion
passed). The test now saves whichever legend appears; it was rerun alone (2/2 passed) and the frame added to
`screenshots/final/desktop`.

Earlier milestones (m1–m4) were each run at both viewports and inspected; the defects they found are in
DEV-PLAN §5 (19 entries).

## Balance (`node games/farm-sim/tools/balance.mjs 6`: 6 seeds × 3 strategies, the real sim in Node)
The bots act through the game's rule functions (till, plant, water, harvest, chop, mine, cast and reel,
buy, craft, talk, give, sleep) and model walking as a time cost, so a person takes longer than the bot.

| Metric | Result | Target |
|---|---|---|
| Chapter 1 income per day, days 3–14 (steady) | $112.9 | $40–160 |
| Chapter 6 income per day (steady) | $581.5 | $250–900 |
| Days to finish all six chapters (steady) | 93.3 (6/6 seeds finish) | 90–150 |
| Days per chapter (steady) | 13 · 17 · 19 · 14 · 14 · 16 | 12–28 each |
| Best crop ÷ median crop, profit per tile-day (worst chapter) | 1.5 (chapter 3, strawberries) | ≤ 1.8 |
| Energy used on a dry day (steady) | 73% | 70–100% |
| Forage-and-fish income ÷ crops-only income (mean of chapters) | 58% | 35–80% |
| Days a player can't afford seeds | 0 | 0 |

Income per day by chapter, steady / crops-only / forage-and-fish: $96/160/155 · $152/452/209 ·
$70/491/215 · $453/798/292 · $700/808/374 · $582/515/414.

**Outliers and near-edges (named, not hidden):**
- **Chapter 1 fishing pays about as well as farming** (forage-and-fish 97% of crops-only). Early crops are
  cheap and the creek is close; from chapter 2 on, fishing falls to 37–48% of farming. Lever: creek fish
  prices or the 35% empty-cast rate.
- **Chapter 6 forage ratio is 80%**, at the top of the band, because 2026 crops cost more to seed.
- **Chapter 3 can take a second spring** for some seeds (14–21 days): the hotel table needs spring
  strawberries and summer/fall tomatoes; a missed strawberry window waits for the next year. The steady
  bot's chapter 3 income is low ($70/day) because it saves for the brick house.
- **Total days (93) sit near the low edge** of the band; human players take longer than the bot.

## Performance
Final run, measured while walking (camera and chunks moving), on a quiet machine (CPU < 50%):

| Scene | Desktop fps | Mobile fps | Script per frame (desktop / mobile) |
|---|---|---|---|
| Chapter 1 farm, morning | 58.8 | 60.4 | 1.00 / 0.94 ms |
| Chapter 3 town, morning | 60.3 | 60.5 | 0.99 / 0.76 ms |
| Chapter 4 town, night (lamps, neon) | 59.6 | 60.4 | 1.11 / 0.81 ms |
| Chapter 6 lake | 60.2 | 60.4 | 0.81 / 0.68 ms |

JS heap 9.5 MB (budget 40). Page 299 KB (budget 2 MB). Hooks ready in about 100 ms (budget 2 s). No chunk
rebakes while standing still.

What made it fit: 16 × 16-tile chunk canvases baked once (LRU of 14), only the y-sorted dynamic layer drawn
each frame; the night light pass on a separate quarter-resolution `<canvas>` with pre-drawn gradient sprites
(was 7–10 ms a frame and 33 fps on the phone viewport, now about 0.4 ms); device-pixel ratio capped at 2,
and at 1.5 below 700 px wide.

**Load sensitivity.** Earlier full runs, while other sessions' Playwright suites held the CPU at 84–100%,
measured 7–36 fps for these same scenes with script cost still under 2 ms a frame: the drops were the
machine, not the game. The final run waited for the CPU to stay under 50% before starting.

## Known gaps
- **Nobody has listened to the audio or used a screen reader.** Sounds are short and quiet by default;
  the live region was tested automatically only.
- **The revival years (1968–1999) are not a playable chapter.** The brief asked for six eras; the corpus
  has seven ids, so revival appears on the chapter 5 closing card and the chapter 6 intro.
- ~~Chapter 4 has no full palette swap.~~ Fixed in the visual pass: each era has its own world tint, road
  surface, light colour, display face and painted buildings.
- Each person has 5–6 lines; after a few weeks they repeat. No weekday or festival-day schedules.
- Chapter select replaces the current save (no separate slot).
- ~~Blocky lake shoreline; tufa reads like pavement.~~ Fixed in the visual pass: the shore and banks are smooth
  contours, and the tufa is painted travertine with terraces and algae. The visual gaps that remain are listed in
  `VISUAL-REPORT.md`.
- The balance bot doesn't walk, so its day counts are a floor, not a prediction for people.
- Out of scope per PRD §13: romance, combat, playable festivals, music, controller support.

## Data notes (not fixed, reported)
- **Running of the Tubs start year:** the audited bank (hs-0379, Visit Hot Springs 2026 press release)
  says 2006; `research/culture-events-food.md` says 2005. The game uses the bank value.
- **The 90-day filing deadline of the May 31, 1870 act** (`research/game-hooks.md` §11, idea 5) has no
  audited bank item, so the chapter 2 title fight is told only through hs-0010 (Certificate No. 467) and
  hs-0002.
- `research/game-hooks.md` §11 offers six map states by year (1875, 1893, 1924, 1938, 1960s, 2026); the
  game uses six chapter story years of its own (1807, 1871, 1886, 1931, 1955, 2026), with dated events
  told on cards rather than shown as happening in the story year.
- The audited bank cites the same Encyclopedia of Arkansas Garland County page under two URL spellings
  (`garland-county-770` and `Garland-County-770`); `check-facts.mjs` compares each fact with its own bank
  item, so both pass.
- No sourced crop list exists for any era (`research/history-timeline.md` notes this). Crops are game
  choices, anchored where the corpus allows: corn milled at a water mill, wheat, cattle, timber goods
  (frontier); produce sold to hotels and ballclubs (**[inferred]** in the corpus); goats for barbecue
  (the McClard's fact).

## Harness requests
- **Load-independent performance numbers.** With other sessions' Playwright suites running (CPU 84–100%,
  20–36 Chrome processes) `t.fps` for the same scene ranged from 7 to 60. A `t.frameCost()` that measures
  in-page time per animation frame, or a harness note to run perf tests alone, would make AC35 stable.
- **inline.mjs export forms.** `export const a = 1, b = 2` silently exports only `a`, and an export named
  `$` is left as a raw `export` keyword. Either support them or fail the build with a message. Both cost a
  debugging round here (DEV-PLAN defects 1 and 2).

## Files
`PRD.md`, `MECHANICS.md`, `DEV-PLAN.md` (milestones, hook spec, test matrix, defect log), `SAMPLES.md`,
`research/town-content.md`, `data/facts.json`, `tools/balance.mjs`, `tools/check-facts.mjs`,
`tests/*.test.mjs` (13 files plus `helpers.mjs`), `src/` (index, CSS, `js/main.js`, `js/ui.js`,
`js/audio.js`, `js/sim/` rng, data, world, path, sim, save; `js/render/` palette, art, scene).
