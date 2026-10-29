# Valley of Vapors: development plan

## 1. Milestones

| Milestone | Scope | Exit check |
|---|---|---|
| **M1 Foundation** | `src/` layout, build, fixed-step loop, seeded RNG, map generation (Chapter 1), procedural tile sprites, chunk cache, camera, player movement + collision, title/HUD shells, `window.__game` hooks, save skeleton | `--milestone m1`: title, map at both viewports, movement test, zero errors |
| **M2 Core loop** | Tools, energy, soil, crops, watering, growth, seasons, harvest, inventory + hotbar, shipping bin, sleep/day end/summary, weather, shop, crafting (whetstone), forage, trees/rocks/outcrops, real-input keyboard loop | `--milestone m2`: farm tests + real-input test pass; screenshots of a growing field |
| **M3 Content** | NPCs, schedules, pathing, dialogue, friendship, gifts, quests, era goals + era turn, history cards + facts, all six chapter overlays/casts/crops/shops, fishing, livestock, `tools/balance.mjs`, `tools/check-facts.mjs` | `--milestone m3`: every chapter shot at both viewports; balance inside bands; facts 100% |
| **M4 Polish** | Night lighting, steam/rain/snow particles, audio, settings (rebinding, text size, reduced motion, high contrast, timing assist, volume), touch pad, journal/almanac, help/about, contrast pass, live region | `--milestone m4`: a11y + touch tests pass; contrast 0 failures |
| **M5 Optimization / final** | Perf and size pass, defect sweep, `--milestone final` at both viewports, gallery, contact sheets, REPORT.md | final run green; every screenshot inspected |

### Task breakdown
- **M1:** `sim/rng.js` (mulberry32, attribution), `sim/data.js` skeleton (eras, palettes), `sim/world.js`
  (base terrain + Chapter 1 overlay), `render/tiles.js` + `render/chunks.js`, `main.js` loop/input/hooks,
  `ui/screens.js` (title), `ui/hud.js`.
- **M2:** `sim/sim.js` actions (till, water, plant, harvest, chop, mine, scythe, place, eat, ship, sleep),
  crop growth, weather roll, energy, inventory ops, shop buy/sell, recipes, forage spawn, morning summary,
  `ui/panels.js` (inventory, craft, shop), `tests/farm`, `tests/input-keys`.
- **M3:** `sim/path.js`, NPC schedules + movement, `ui/dialog.js`, quests + goals, era turn, overlays for
  chapters 2–6, fishing state machine, livestock, `data/facts.json`, history card UI, tools.
- **M4:** `render/fx.js`, `audio.js`, `ui/settings.js`, `ui/touch.js`, journal, help, contrast fixes.
- **M5:** profiling (chunk cache hits, draw counts), dead-code trim, final run, REPORT.

## 2. Build and run
```
node shared/tools/inline.mjs games/farm-sim
node shared/test-harness/run.mjs games/farm-sim --milestone m1
node shared/test-harness/sheets.mjs games/farm-sim --milestone m1
node games/farm-sim/tools/balance.mjs
node games/farm-sim/tools/check-facts.mjs
```

## 3. `window.__game` hook spec
| Method | Behavior |
|---|---|
| `seed(n)` | Sets the RNG seed used by the next `newGame` and reseeds the running stream. Returns `n`. |
| `getState()` | Compact JSON: `{ scene, era, chapter, year, day, season, dayOfSeason, time (minutes since 00:00), clock 'HH:MM', weather, money, energy, maxEnergy, player {x,y,tx,ty,face}, target {x,y}, sel, hotbar [ids], inv [{id,n}], jug, tiles: {tilled, watered}, crops [{x,y,id,stage,ripe,age}], objects summary, npcs [{id,x,y,tx,ty,place,hearts,pts}], quests [{id,done,progress,goal}], goalsDone, canTurn, modal, fishing, animals, almanac count, settings, paused, idle, reduced, loadMs }` |
| `setState(patch)` | Deep-merges `patch` into the live state (e.g. `{ money: 500, player: { tx: 10, ty: 12 } }`); special keys: `inv: [{id,n}]` replaces the inventory, `crops: [...]` replaces crops, `time`, `energy`. Redraws and returns `getState()`. |
| `isIdle()` | `false` while an era wipe, card/panel fade, toast entry, sleep fade or sprite-cache rebuild is running; ambient steam, NPC walking and weather particles are excluded. |
| `step(n)` | Pauses (if not already) and advances `n` fixed ticks (clock, movement from currently held keys, NPCs, fishing timers). Returns `getState()`. |
| `pause()` / `resume()` | Freeze / unfreeze the loop's simulation (rendering continues on demand). |
| `scene(name)` | `'title' | 'game' | 'settings' | 'help' | 'about' | 'inventory' | 'craft' | 'shop' | 'journal' | 'pause' | 'summary' | 'card' | 'chapters'`. `scene({ era: 1..6, at?: placeId })` loads that chapter (new state, Spring 1, starter kit) and puts the player at a named place (`farm`, `field`, `bin`, `town`, `shop`, `springs`, `ridge`, `creek`, `lake`, `quarry`, `mill`, `market`…). |
| `newGame(opts)` | `{ seed?, era? = 1, paused?, money?, skipIntro? = true under __TEST__ }` |
| `act(name, ...args)` | Named actions without pointer input: `use`, `interact`, `face(dir)`, `select(slot)`, `till(x,y)`, `water(x,y)`, `plant(x,y,seed)`, `harvest(x,y)`, `ship(id,n)`, `buy(id,n)`, `sell(id,n)`, `craft(recipe)`, `sleep(turnEra?)`, `give(npc,item)`, `talk(npc)`, `cast()`, `reel()`, `turnEra()`, `goto(place)`, `teleport(x,y)`, `completeGoals()` (test shortcut: marks all goals of the chapter done), `card(id)`, `toast(text)`, `animAt(ms)` (freeze wipe/card animation clock). |

`window.__TEST__` only skips the intro text crawl and the title attract steam; rules and rendering are
unchanged.

## 4. Test matrix
Screenshots are produced at both viewports (desktop 1280×800, mobile 390×844) unless a test is marked
d-only or m-only. Tests are `tests/<file>.test.mjs › test name`.

| AC | Test | Screenshots |
|---|---|---|
| AC1 | screens › title and hooks | 01-title |
| AC2 | screens › help and about | 02-help, 03-about |
| AC3 | `checkLayout` in screens, economy, life, eras, a11y (title, game, intro card, bin, shop, pack, craft, summary, dialogue, journal, history card, every chapter's town, text 125/150%) | 03b-intro-card, 04-game, 05-inventory, 05b-bin, 06-craft, 07-shop |
| AC4 | world › movement and collision | 11-walk |
| AC5 | farm › tilling rules | 12-tilled |
| AC6 | farm › plant and water | 13-planted-watered |
| AC7 | farm › growth and harvest | 14-growing, 15-ripe, 16-harvested |
| AC8 | farm › seasons and wilting | 17-wilted |
| AC9 | time › night, sleep and collapse; time › clock speed and modal pause | 18-dusk, 19-night, 20-summary |
| AC10 | time › weather | 21-rain, 22-snow, 23-fog |
| AC11 | time › energy | 24-low-energy |
| AC12 | economy › shipping bin pays overnight | 05b-bin |
| AC13 | economy › shop buy and sell, hours | 07-shop, 07b-shop-sell |
| AC14 | economy › inventory and hotbar | 05-inventory |
| AC15 | economy › crafting and the whetstone | 06-craft |
| AC16 | world › forage, trees and rocks | 25-ridge |
| AC17 | life › fishing | 26-bite, 27-catch |
| AC18 | life › livestock | 28-animals |
| AC19 | life › npc schedules | 29-town-morning, 30-town-evening |
| AC20 | life › dialogue, friendship and gifts | 31-dialogue, 32-gift |
| AC21 | life › quests and the journal | 33-journal-goals, 33b-journal-quests, 33c-journal-people |
| AC22 | eras › goals and the era turn | 34a-bed-turn, 34-history-card, 35-wipe, 36-era2-intro, 37-era2-farm |
| AC23 | eras › goals and the era turn (theme, crops, carry-over); eras › all six chapters (house, cast, shop) | 40–45 chN-farm |
| AC24 | eras › all six chapters; eras › finishing chapter 6; goals › chapter 1/2/3/5/6 mechanics; `tools/balance.mjs` (every seed finishes all six chapters) | 46–51 chN-town, 53-ch4-night, 54-ch6-lake, 55-finale, 63-hut, 64-mill, 65-brick-house, 66-stand, 67-fund |
| AC25 | content › facts on screen are sourced; content › legends are labelled; `tools/check-facts.mjs` | 52-almanac, 61-legend, 62-quarry-sign |
| AC26 | save › autosave, continue and manual save; save › old save versions migrate; save › storage blocked; goals › chest and chapter select | 68-chest, 69-chapters |
| AC27 | save › determinism | — |
| AC28 | a11y › rebinding keys persists (d-only) | 60-rebind |
| AC29 | a11y › text size | 58-text-150, 58b-text-150-pack |
| AC30 | a11y › reduced motion | 59-reduced |
| AC31 | input › touch: pad, A and B, tap to walk (m-only) | 56-touch-pad |
| AC32 | input › keyboard only: till, plant, water, sleep, harvest (d-only) | 57-keys-harvest |
| AC33 | a11y › contrast in every chapter palette | — |
| AC34 | a11y › phone readability (m-only) | (04-game, mobile) |
| AC35 | perf › performance and budgets | — |
| AC36 | `tools/balance.mjs` (REPORT balance table) | — |
| AC37 | a11y › sound settings persist | — |
| AC38 | a11y › live region and high contrast | — |

## 5. Defect log
| # | Milestone | Defect | Fix |
|---|---|---|---|
| 1 | M1 | The bundler exports only the first name of `export const W = 60, H = 44`, so `H` was undefined (NaN camera, crash in the night pass) | One export per line |
| 2 | M1 | An export named `$` is not matched by the bundler's `\w+` pattern ("Unexpected token 'export'") | Renamed to `qs` |
| 3 | M1 | `toTitle` and `closeModal` recursed at boot | `closeModal(all)` never returns to the title |
| 4 | M1 | HUD visible on the title: `#hud { display: flex }` overrode `hidden` | `[hidden] { display: none !important }` |
| 5 | M1 | Dawn too dark (0.55) | 0.3 at 06:00 |
| 6 | M1 | Title subtitle low contrast on a pale sky | Dark plate behind the title |
| 7 | M2 | The 1807 town had a grid of dirt streets that read as a later town | Two trails only (to the camp and the cabin) |
| 8 | M3 | Two people scheduled to the same place stood on one tile; talking reached the wrong one | Per-person side offsets |
| 9 | M3 | Visit quests registered only while walking | Checked once a game minute |
| 10 | M3 | Fishing out-earned farming (bot: $2,479 a day) | Fish prices cut, 35% empty casts, rod 4 energy, wild goods scale by the square root of the chapter price |
| 11 | M3 | Chapter 4 had no spring crop and summer-only peppers (a dead first week, a lost year if missed) | Peanuts sp/su, collards fa/wi/sp, peppers su/fa |
| 12 | M3 | Chapters 1–2 finished in 8–9 bot days | Bigger goals (ship 50, hut 50 wood + 20 stone, squash in the trade order, 10 cornmeal, 20 shingles, 10 milk, $3,000) |
| 13 | M3 | Watermelon (7 days in a 7-day season) had a one-day planting window | 6 days |
| 14 | M4 | Quest-givers only repeated their request, so personal lines and legends never showed | Personal line first, the request after it with a Request tag |
| 15 | M4 | Chapter 4 night at 33 fps on the phone viewport (per-frame gradients, full-resolution blits) | Quarter-resolution overlay canvas with pre-drawn gradient sprites |
| 16 | M4 | Hotbar counts and slot numbers failed contrast on light themes | Dark pill behind counts; slot numbers in the theme text color |
| 17 | M4 | The brick house ($1,200 + 30 stone) starved chapter 3's summer planting | $800 + 20 stone |
| 18 | M4 | Night read as evening after the overlay change | Darkness 0.85, smaller lamp radius |
| 19 | final | `content › legends` saved `61-legend` only when the de Soto legend came first; the final run drew the neutral-ground legend first and skipped the frame | Save whichever legend appears |
