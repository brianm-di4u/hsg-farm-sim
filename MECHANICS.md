# Valley of Vapors: core mechanics

The mechanical foundation for an original top-down farming and life sim. Ideas come from the samples in
`SAMPLES.md` (tile rendering and camera, grid pathing, fixed-step loop, seeded PRNG, data-driven
dialogue); the code is written fresh for this game unless `SAMPLES.md` names an adapted snippet.

## 1. Architecture

```
src/
  index.html, styles/main.css
  js/sim/      pure, DOM-free modules (Node can import them: tools/balance.mjs, tests)
    rng.js        mulberry32 + string hash; per-day sub-streams
    data.js       eras, crops, items, recipes, shops, fish, NPCs, quests (inlined JSON-like objects)
    world.js      map generation per era (tile grid, objects, spawn points), walkability
    sim.js        the game state object and every rule: tick(), act(), sleep(), economy, quests
    path.js       BFS on the tile grid with a cache
    save.js       serialize / migrate / validate
  js/render/   canvas drawing: tiles.js (procedural tile sprites per palette), chunks.js,
               sprites.js (people, crops, objects), fx.js (steam, rain, night light), scene.js
  js/ui/       DOM overlays: hud.js, panels.js (inventory, craft, shop, journal), dialog.js,
               settings.js (rebinding, text size, motion), touch.js (on-screen pad), screens.js
  js/audio.js  WebAudio synth blips
  js/main.js   boot, loop, input, window.__game hooks
```

The **state is one serializable object** (`S`), owned by `sim.js`. Rendering and UI read it; only
`sim.js` functions change it. Anything random goes through the seeded RNG in the state.

## 2. Loop and time

- **Fixed step:** 60 ticks per real second, accumulator loop (`frame dt` clamped to 250 ms), render once
  per frame with interpolation-free drawing (movement is smooth enough at 60 Hz). `pause()` stops ticks;
  `step(n)` runs `n` ticks synchronously (tests, balance).
- **Clock:** one game minute = 15 ticks (0.25 s). A day runs 06:00 → 02:00 (1,200 game minutes,
  5 real minutes). At 02:00 the player collapses: wakes at 06:00 at home, loses 10% of cash (max $100) and
  starts at 60% energy. Menus, dialogue and cards stop the clock.
- **Calendar:** 4 seasons × 7 days = a 28-day year. Spring, Summer, Fall, Winter. Each chapter starts on
  Spring 1 of its story year; the year label advances every 28 days.
- **Weather** is rolled each morning from the day's RNG stream: rain (crops watered automatically), clear,
  steam-fog morning (visual only), snow (winter, rare, nothing grows outdoors). Chances in
  `research/town-content.md` › Climate.
- **Day/night:** light level from the clock: dawn 06–07, day, dusk 18–20, night after 20:00. Night is a
  dark overlay with light holes cut around lamps (era light sources: campfire, lantern, gas lamp, neon,
  sodium, LED), drawn at quarter resolution on a separate overlay canvas (pre-drawn gradient sprites,
  scaled up by the browser) so night costs well under a millisecond per frame.

## 3. Tile world

- **Grid:** 60 × 44 tiles; 1 tile = 16 world units. Layers per tile: `ground` (grass, dirt, path, sand,
  water, deep water, rock, floor, tufa, hot pool), `soil` state (untilled / tilled / watered), and an
  `obj` id for blocking or interactive objects (tree, stump, rock, outcrop, fence, building part, bin,
  bed, sign, chest, sprinkler, crop).
- **Regions** (fixed layout, redrawn per era): the farm (west, 18 × 14 tillable field), Gulpha Creek
  (runs north–south between farm and town; a footbridge), the town strip (center; main street running
  north–south with era buildings both sides), the springs (east slope: steaming pools, tufa, a jug
  spring), the north ridge (forest, novaculite outcrops, the heritage quarry site), the south bottoms
  (creek mouth; from Chapter 4 a lake fills it).
- **Era overlay:** `world.js` builds the base terrain once (seeded, deterministic) and then applies the
  chapter's overlay: buildings, roads, lamps, NPC homes, lake level, shop counters. Player changes to the
  farm (tilled soil, crops, placed objects) persist across chapters except crops, which are cleared.
- **Collision:** the player is an 10 × 6 unit box at the feet; movement resolves X then Y against
  blocking tiles (axis-separated AABB vs grid), so walls slide. NPCs move tile to tile.
- **Chunked rendering:** the static ground + building layer is baked into 16 × 16-tile chunk canvases at
  the current zoom × DPR, per era palette, and redrawn only when a tile in the chunk changes (`dirty`
  set). The frame draws only chunks that overlap the camera, then the dynamic layer (crops, objects,
  people sorted by y, particles), then night and weather overlays, then the HUD (DOM).
- **Camera:** follows the player, clamped to the map; zoom picks a whole-ish tile size: about 40 CSS px
  on desktop, about 34 CSS px on phones (portrait shows 11 × 18 tiles). Reduced motion turns off camera
  easing.

## 4. Player, tools and actions

- **Movement:** 4.5 tiles/s, 8-way input, the sprite faces the dominant axis. The **target tile** is the
  tile in front of the player's feet (or a tapped/clicked tile within 1.5 tiles).
- **Use** (Space / J / pad A): context first, then the selected hotbar item:
  1. a person in front → talk (or give the selected item, if it is a giftable item and the player holds
     Use for 0.4 s or presses G);
  2. an interactive object (bed, door, shipping bin, shop counter, sign, spring, mill, chest, pen,
     crafting bench) → interact;
  3. otherwise the selected tool or item on the target tile.
- **Tools** (energy cost, base): hoe 2 (till), watering jug 1 (holds 12, 20 from Chapter 3, refill at
  water), axe 3 (tree → wood ×3 over 3 hits, stump → wood ×1), pick 3 (rock → stone, outcrop → novaculite,
  crystal node → quartz), scythe 1 (grass tufts → hay, clears dead crops), rod 4 per cast. A crafted **whetstone** makes
  axe, hoe and pick cost 1 less (minimum 1) for the rest of the save. Era tools: Chapter 5 adds the
  garden tiller (hoe tills 3 tiles in a row for 4 energy), Chapter 6 the drip line (a better sprinkler).
- **Seeds and items** are placed on the target tile (seed on tilled soil; sprinkler/chest/fence on free
  ground).
- **Energy:** 100 max. Shown as a bar with a number. At 15 or less the player walks slower; at 0 tools
  stop working. Food items restore energy (eat from the inventory). A **hot-spring soak** (interact with a
  bath spot: free in Chapters 1–2, a game fee later) restores 30 energy once a day.

## 5. Soil and crops

- Till → `tilled`; water → `watered` (darker soil plus a droplet mark, so the state is not color-only).
  Each morning: watered crops grow one day; tilled soil without a crop has a 20% chance to revert;
  `watered` resets to `tilled` unless it rained or a sprinkler covers the tile.
- **Crop data** (`data.js`): `{ id, era: [chapters], seasons, days, regrow, seed, sell, energy? }`.
  Stages are drawn from `days` (seed, sprout, young, mature, ripe). Ripe crops show a ring badge.
  Out-of-season crops wilt at the season change (they become a dead stalk you clear with the scythe).
- **Harvest:** Use with empty hands or the scythe on a ripe crop. Yield 1 (+1 at 10% chance); regrowing
  crops return to their regrow stage.
- **Sprinklers:** water the 4 neighbors (drip line: 8) every morning.

## 6. Foraging, fishing-lite and livestock

- **Forage:** each morning the day's RNG places 4–7 forage items on ridge/forest tiles by season and
  chapter (hickory nuts and acorns in fall, wild greens in spring, pine knots any season, quartz in
  ridge nodes). Trees regrow from stumps after 7 days; rocks respawn on the ridge weekly.
- **Fishing:** Use the rod facing water → a cast (4 energy). A bite comes after 1.0–3.5 s (game RNG); 35%
  of casts come back empty. On a bite a "!" appears and the player has 0.6 s (0.9 s with the timing
  assist) to press Use. Success picks a
  fish from the water's table (creek, lake, deep lake) by chapter and season, weighted. Miss = nothing.
- **Livestock (lite):** Chapters 2–6 add one animal type (cow, cow, goat, hen, hen). A pen holds up to 4.
  Each morning an animal that was fed (feed in the trough: hay from the scythe or bought feed) and is
  happy produces its product (milk, goat milk, egg) next to the trough; petting (Use) once a day adds
  happiness. Animals are bought from the chapter's shop. No slaughter.

## 7. Inventory, crafting, shops, economy

- **Inventory:** 24 slots; slots 1–8 are the hotbar. Stacks up to 99 (tools 1). Items:
  `{ id, kind: tool|seed|crop|forage|fish|product|material|placeable|food|quest, name, sell, energy? }`.
- **Crafting** (from the inventory panel, or at a bench for bigger items): recipe tables per chapter,
  e.g. whetstone (2 novaculite + 1 stone), fence, chest, sprinkler, rental hut, cornmeal (at the mill),
  staves/shingles (bench), jug of spring water (fill at a spring), preserves, smoked trout, tub.
- **Shops:** each chapter has a general store counter (open 08:00–17:00, closed on the season's last
  day) with seeds in season, feed, animals, tool upgrades. Buy/sell panels show quantities and totals.
- **Shipping bin:** items put in the bin are sold at their `sell` price overnight; the morning summary
  lists them. NPC orders (quests) pay a premium.
- **Prices** are game prices, labelled as such in Help. An item's listed price is for its first
  chapter; later chapters scale farm goods by a chapter factor (1, 1.4, 1.8, 2.4, 3.2, 4.2) and wild
  goods (fish, forage, raw materials) by its square root. Balance targets live in PRD §9 and are checked by
  `tools/balance.mjs`, which runs these same modules.

## 8. NPCs, schedules, friendship, dialogue

- **Schedules:** each NPC has keyed points `{ t: minutesSince0600, at: placeId }`, with optional rain
  and season overrides. When the clock passes a point, the NPC paths there (BFS on walkable tiles, cached
  per start/goal pair, 3 tiles/s). People who share a place stand side by side (a fixed offset per cast
  member). After 22:00 NPCs go home and are hidden indoors.
- **Friendship:** 0–100 points, shown as 5 hearts (20 each). Talking once a day +3; a gift once a day:
  loved +12, liked +6, neutral +2, disliked −4; finishing that NPC's quest +15. Hearts unlock dialogue
  lines and one "favor" each (e.g. a recipe or a discount).
- **Dialogue:** data-driven nodes `{ id, text, minHearts, when?: {season, weather, quest}, next?,
  choices?: [{ text, then, effect }] }`. The picker chooses the highest-priority node whose conditions
  pass, rotating daily among equals so lines don't repeat every day. Any line that states a historical
  fact carries a `fact` id and is checked by `tools/check-facts.mjs`.

## 9. Quests and era progression

- **Quest types:** deliver (items to an NPC), ship (n items of a kind), build (place a crafted object),
  earn (chapter cash total), befriend (hearts with an NPC), visit (stand at a place / read a sign), catch
  (fish species). Visit quests are checked once a game minute. Talking to a quest-giver shows their own
  line first and the open request after it; delivery is automatic when the items are in the pack.
- **Era goals:** each chapter flags 5 of its quests as goals. When all are done, the journal and the bed
  prompt offer **"Turn the era"**. Sleeping with that choice plays the closing **history card** (3–4
  sourced facts with sources), the valley vista wipe into the next palette, then the next chapter's
  opening card. The player can keep playing the old chapter as long as they like first.
- **What changes at an era turn:** palette and tile style; town buildings, roads and lamps; the cast;
  crops and seeds (old crops cleared, unsold crops kept in the inventory); the shop; tools (era upgrade);
  farmhouse style (cabin → plank house → brick farmhouse → bungalow → ranch house → restored farmhouse);
  livestock type (old animals retire to a neighbor, explained in a line); the lake level (Chapter 4+);
  music key. Money carries over at 100% (it's the family farm), as do the Almanac, collection log,
  whetstone and placed objects.
- **Framing:** each chapter is a new generation of the fictional Vale family on the same creek-bottom farm.

## 10. RNG, determinism, saves

- **RNG:** mulberry32 seeded from the save seed; the day stream is `hash(seed, era, dayIndex)` so weather,
  forage and fish tables for a day don't depend on how many actions happened before. Action rolls
  (extra yield, bite timing) use the running stream in the state, so a replay from the same state is exact.
- **Save:** `localStorage['vov-farm-save']` = `{ v: 1, savedAt, state }`. `save.js` migrates older
  versions step by step (`migrations[v] = (s) => s'`) and validates shape (unknown or broken saves are
  ignored, with a message). Autosave each morning; manual save from the pause menu. Settings live in
  `vov-farm-settings`. All storage calls are wrapped in try/catch; the game runs without storage.

## 11. Test hooks

`window.__game` (contract in `shared/test-harness/README.md`): `seed`, `getState` (a compact JSON view),
`setState` (merge-patch onto the live state), `isIdle` (false during transitions, wipes, card fades and
art caching; ambient steam and NPC walking don't count), `step(n)`, `pause`/`resume`, `scene(name |
{ era, at })`, `newGame(opts)`, `act(name, ...args)`. Full spec in `DEV-PLAN.md` §3.
