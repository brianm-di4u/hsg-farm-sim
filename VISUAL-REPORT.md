# Valley of Vapors — visual enhancement report

The vector prototype became a painted, lit, era-specific top-down farming game. The simulation, saves, quests
and balance are unchanged (the only sim-side edit in the main pass moves the 1807 trade-camp fire's drawing
position off the spot where people stand; the map edits of the fix pass are listed below). Plan:
`VISUAL-PLAN.md`. Nothing is committed.

## Fix pass after the coordinator's review (2026-10-29)

The coordinator's review (`--milestone coord-review`, 88/88 passing) found eight problems. All eight are fixed in
`repos/hsg-farm-sim`; the shots are in `screenshots/coord-fix/`.

1. **The creek now reaches the lake.** **Correction:** the main pass reported that the creek mouth "blends into
   the lake". It did not. The 1931 and 1955 lake shots showed the creek stopping at a straight edge above the
   shore, a flat pale plank box on dry clay, a boat ramp drawn as two see-through squares, and the player
   standing in a two-tile notch of water.
   - The walkable shore tiles across the creek mouth are now drawn as water. The creek bed fades into the lake's
     texture and tint over its last four tiles, so there is no edge.
   - A timber footbridge, styled by era, spans the mouth over the water. Before, it was a concrete-coloured box
     from 1931.
   - Each boat ramp is one grooved slab. It runs from the road end into the water, darkening below a foam
     waterline. Ramps are drawn only where a road meets the lake.
   - The two-tile inlet in the 1931–1955 shore row is now shore, and the lake visit point stands on the clay
     shore, facing open water. *Map edit:* the shore row is tiles (30, 33) and (31, 33); the visit point
     moved from (30, 33), a water tile, to (34, 33).
2. **Hot Springs Creek, arched over from 1886.**
   - The farm's creek is Hot Springs Creek in MECHANICS.md, the PRD, REPORT.md, the plan and the About screen.
     Gulpha Creek runs east of Hot Springs Mountain (`research/visual-eras.md` §1.1).
   - From chapter 3 (1886), the creek north of the main road is covered, as the real creek was arched over past
     the Row in 1882–84. Those tiles are now grass, and the road crosses on brick.
   - The creek comes out of a painted stone culvert headwall south of the road. *Map edit:* tiles x 22–23,
     y 4–13, chapters 3–6 only. No natural objects are placed on the covered creek, and the seeded layout
     elsewhere is unchanged.
   - Chapters 1–2 keep the open creek.
   - The 1807 intro no longer says the farm's creek is Calfait (Gulpha) Creek. Ada passes the creek where the
     explorers camped and follows the warm stream up from the springs. The Calfait fact card is unchanged.
3. **Tufa without seams, and painted spring works.**
   - The straight-edged light and dark bands came from the grey porous patches. They were filled at full
     resolution, with polygonal edges and thin rectangular rust streaks.
   - The grey patches, rust stain and algae runs are now painted into a layer at an eighth of the resolution,
     with the grey laid at three thresholds, and scaled up. Everything fades out.
   - The terrace lips are fewer and vary in strength.
   - The spring boxes and the soaking basin are painted sprites (`ground-springbox`, `ground-soakpool`),
     replacing grey code squares and a turquoise rectangle. The code versions remain only as fallbacks.
4. **Name tags no longer cover building signs.** Each sign board's rectangle is recorded as it is drawn. A tag
   that would overlap a sign or another tag moves to the nearest clear spot: above, beside or below it. In the
   1807 trade-camp scene the tags now sit side by side under TRADE. In 1886 Hattie's tag sits below BATHS.
5. **The phone HUD stays at two rows at 150% text.** At text sizes of 125% and up, phones cap the date and
   money chips in px. The weather keeps its icon, and its word moves to a visually hidden span that screen
   readers still read.
6. **Chapter 1 Ada stands out.** She now wears a madder-red linsey shirt and a straw sunbonnet; before, she was
   brown on brown. She reads in rain, snow and fog and is distinct from Margaux (blue shirt, kerchief) and
   Josiah. Two parts of the shared face rig made the eyes look teary on everyone with darker skin. A pink
   blush was fixed under each eye, and a large white catch-light blurred into a grey ring at tile size. The
   cheeks now sit in the skin layer, so each person's skin tint carries them; the catch-light is smaller and
   the iris darker. The three atlases were re-rendered in Blender 5.2.3 (`characters.py`) and repacked
   (530 KB).
7. **1955 centre lines are white.** The 1948 federal manual made white the centre-line colour. Yellow centre
   lines between opposing traffic became the rule only in the 1971 edition. Sources are in
   `research/visual-eras.md` §4.
8. **Art provenance.**
   - SAMPLES.md has a new "Art provenance" section: tool, counts, style references, license, and what was not
     used.
   - `art-src/PROMPTS.md` holds all 14 image-generation prompts verbatim, extracted from the session that made
     the art.
   - No photographs went to the generator. The `/Sample Images/` photos were not used for this game's art at
     all, as style references or as image-to-image inputs.
   - The style references were the game's own generated pilot images.
   - The About screen and the plan point to the new section.

New art: three Codex paintings (`prop-springbox`, `prop-soakpool`, `prop-culvert` → `assets/ground-*.webp`,
85 KB). That brings `assets/` to 225 images (9.35 MB).

**Tests (fix pass).**
- `npm run build`, then `node shared/test-harness/run.mjs . --milestone coord-fix --gpu --file-url`: **88/88
  passed** (48 desktop, 40 mobile; 166 screenshots). Contact sheets are in `screenshots/coord-fix/sheets`, and
  70 before/after sheets against `coord-review` are in `screenshots/coord-fix/before-after`.
- Software GL, `--milestone coord-fix-sw`: **87/88**. The one failure was the mobile perf budget: 51.5, 53.9
  and 47.7 fps in chapters 1, 3 and 4, against a floor of 55. The machine was at 90% CPU at the time, with
  about 170 Chrome and Node processes from other sessions.
  - Script time stayed at 2.0–2.3 ms per frame.
  - Re-run alone: once at 53.8 fps in chapter 3 (CPU 47% after), then **passing** at 58.3–59.8 fps with
    0.9–1.4 ms of script per frame (CPU 54%).
  - Treat it as load, not a regression. If the coordinator sees it on an idle machine, the tufa bake (three
    low-resolution field passes) and the per-frame tag placement are the new costs to look at first.
- `tools/check-file-url.mjs`: 225/225 images and 7/7 fonts at both viewports.
- `tools/check-facts.mjs`: 84 facts, 0 problems.
- `tools/balance.mjs 6`: unchanged from HEAD (93.3 days; energy 73.3%; forage 58.3%). An early version of the
  culvert edit kept trees off the whole creek line. That shifted the seeded tree layout and the days to 91.2,
  so the exclusion now covers only the covered tiles.
- The changed screens were inspected full size (74, 75, 73, 86, 87, 31, 21, 22, 54 desktop; 48, 58, 31
  mobile). Close-ups the suite doesn't frame are in `screenshots/coord-fix/extra/`: the creek mouth in 1931
  and 1955, the 1955 boat ramp, the culvert in 1886 snow, the 2026 soaking basin, and Ada's face before and
  after.

## What changed

**Direction: 2D, hand-painted, with Blender-rendered characters.** The tile grid and its collision stayed. Every
layer drawn on top of it was rebuilt.

- **Painted world (222 images, 9.3 MB of WebP, including 72 item icons).** One approved pilot set (plank bathhouse, oak, grass, log
  cabin) was the style reference for every later batch: gouache storybook look, three-quarter top-down, light
  from the upper left, warm outlines. The batches cover:
  - **Buildings (48).** Every chapter's town and farmhouse:
    - frontier tents, a trapper's cabin and brush huts (1807);
    - plank bathhouses, a false-front store, a boardinghouse, a stage stop, a druggist and the water mill (1871);
    - four different Victorian bathhouses, a brick block, a cottage, a depot and the grand hotel (1886);
    - a Bathhouse Row of four distinct revival bathhouses (Mission, tiled dome, Neoclassical, Renaissance),
      a supper club, a radio station with its mast, a twin-tower hotel and a tourist court (1931);
    - a farm supply, a drive-in, a motor hotel and a show barn (1955);
    - the same four Row bathhouses restored for new uses (brewery, spa, cultural centre, hotel), plus a
      hardware store and the farmers' market (2026);
    - six farmhouse eras.
  - **Nature and props:** oak in four seasons, shortleaf pine, magnolia, boulder, novaculite outcrop, quartz,
    grass, beautyberry, bin, trough, sign and campfire. The street lamps match each era's light source:
    lantern post, gas lamp, five-globe cluster lamp, cobra-head sodium and an LED heritage pole.
  - **Crops and animals:** 20 crop sheets of five growth stages each; cow, goat and hen.
  - **Farmyard decor (12)** by era: woodpile, haystack, wagon, Model-A-style truck, tractor, greenhouse,
    raised beds, beehives, pump and others.
  - **Town props (14):** buggy, carriage, 1931, 1955 and 2026 cars, bench, planter, hitching rail, hydrant,
    bikes and a café table.
  - **Six era panoramas** for the title screen and the era wipe. They share one composition, so the wipe
    reads as the same valley a generation later.
- **Characters.** `art-src/blender/characters.py` builds one jointed chibi figure:
  - It is rendered from the game camera in three directions (right is mirrored) × idle, a 4-frame walk and a
    2-frame tool swing.
  - Each layer is rendered on its own in soft toon greys.
  - The game tints skin, hair, shirt and trousers from each person's `look`.
  - A dress body, eight hats, beards and glasses are overlays.
  - Three atlases (0.5 MB) cover all 24 people.
  - Dialogue and journal portraits are cut from the same sprites.
- **Terrain** (`render/terrain.js`):
  - Painted, tiling textures (made seamless at pack time) are laid as smooth regions. Marching squares over a
    noise-bent field gives natural edges to creek banks, the lake shore, paths, the forest and the tufa.
  - Collision stays on whole tiles.
  - Street surfaces change by era: trail, rutted clay road, macadam, brick, asphalt with centre lines,
    herringbone pavers.
  - The worked field has mown rows and a headland.
  - The grass carries seasonal wildflowers, clover and leaf litter.
  - The creek banks have reeds and grey and white novaculite stones.
  - Snow covers the ground, and roofs on snow days.
- **Springs:**
  - The tufa is cream travertine with grey porous patches, irregular rimstone lips, rust streaks and
    blue-green algae mats fanning downslope. This is how the 1902 survey describes it (`research/visual-eras.md` §2).
  - From 1886 the springs are capped with painted stone spring boxes, leaving one open display spring.
  - Steam rises from pools and bathhouse vents, and over the creek on cold mornings.
- **Water:**
  - The lake shore is smooth and wandering, with a sand bank (raw red clay in 1931), a foam line and darker
    deep water.
  - The creek runs under a timber footbridge into the lake and fades into the lake water (fixed in the fix pass;
    the main pass claimed this but the shots showed a hard edge).
  - Glints and flow lines are animated.
- **Light** (one quarter-resolution overlay):
  - Each era has a tint.
  - Dawn is rose and the golden hour is amber.
  - Rain and snow have their own colour, and fog drifts in two layers.
  - Night darkness has soft holes. Lamps pool light on the ground in each era's colour (campfire, lantern,
    gas, warm incandescent, sodium orange, cool LED).
  - Windows light up after dusk and go dark late at night.
  - Signs glow after dark: neon for the 1931 club and the 1955 motel, drive-in and stores, floodlit boards
    elsewhere.
  - The player carries a light only when it is truly dark.
- **Shadows.** Building shadows swing west to east through the day. Trees, people, props and lamps cast
  sheared silhouette shadows. Contact shading sits where walls meet the ground.
- **Game feel:**
  - The walk cycle and tool-swing frames, with the selected tool arcing through the swing.
  - Hoe soil puffs and clods, jug splash rings and droplets, axe chips and pick sparks.
  - Harvests pop out of the tile with a bounce and a count, and hearts rise when a friendship grows.
  - Ripe crops twinkle, trees fade when you walk behind them, and animals idle-bob.
  - The camera is zoomed in on desktop: 64 px tiles instead of 44.
- **UI and type:**
  - Seven OFL font families give each era its own display face: IM Fell English (1807/1871), Playfair Display
    (1886), Josefin Sans (1931), Righteous (1955) and Outfit (2026). Alegreya and Nunito Sans are the body faces.
  - Building signs use the era face.
  - Panels are framed and slots inset. Numerals are lining.
  - Toasts sit in a lane above the hotbar, and a repeated toast becomes ×2 instead of stacking.
  - Fact cards show the source and its site, with the full address in the tooltip.
  - The title is a painted panorama with a wordmark.
  - The era wipe is a soft-edged sweep between the two eras' paintings.
  - The phone HUD stays at two rows in every theme.
- **About screen** now credits the painted art and fonts, and says plainly that the map condenses the valley
  (see the research note on Gulpha Creek below; the fix pass renamed the farm's creek Hot Springs Creek).

## Review scores (independent adversarial reviewer, same benchmarks each round)

| Category | Before | After M2 | After M4 | Benchmarks |
|---|---|---|---|---|
| Art | 3 | 5 | **6** | 9 |
| Lighting | 4 | 4 | **5** | 7.5–8 |
| Animation and game feel | 2 | 3 | **4** | 8.5–9 |
| UI | 5 | 5 | **5** | 8 |
| Typography | 5 | 5 | **5** | 7.5–8 |
| Readability | 5 | 6 | **6** | 8 |
| Mobile (390 × 844) | 6 | 6 | **6** | 7 |
| Authenticity and era distinctness | 5 | 7 | **7** (towns 8–9) | about 8 |
| **Total** | **35/80** | **41/80** | **44/80** | about 64/80 |

The three reviews are in `research/review-before.md`, `review-m2.md` and `review-m4.md`. Each was an independent agent
shown only the live screenshots and the benchmarks.

**Work done after the M4 review (not yet re-scored).** The M4 review's three unchanged categories were UI,
typography and mobile, and these fixes target them, its compositing bugs and several of its named gaps:
- **Icons and props:** 72 painted item icons replace the drawn line icons in the hotbar, pack, shop, bin, recipes
  and pickups. The roadside stand, chest, sprinkler, drip line, fence and fund box are now painted props.
- **Shadows:**
  - Building shadows use the painting's own silhouette. They no longer use the footprint boxes the reviewer saw
    as "darker rectangles".
  - Vehicles and decor sit on contact shadows instead of floating.
- **Textures** were flattened before being made seamless. This removed the light/dark band visible in the grass.
- **Toasts** use the era's panel colours. On phones their lane sits above the A/B prompt.
- **HUD and controls:**
  - HUD figures use lining numerals in the era's body face.
  - The phone HUD stays at two rows.
  - The joystick is faded until touched.
- **Small fixes:**
  - The 1886 bonnet is straw-coloured.
  - Spring oaks are greener.
  - Snow hides grass tufts.
  - The 2026 LED light is cooler.
  - Golden hour is stronger.
  - Crops in front of the player turn see-through.
- **Springs and lake:**
  - The soaking pool is a built stone basin from 1886 on.
  - The creek mouth gets a plank crossing.
  - Roads that meet the lake end in a boat ramp.

## Tests

`node shared/test-harness/run.mjs games/farm-sim --milestone visual-final`: **88/88 passed** (48 desktop, 40 mobile; 166 screenshots, 25 contact sheets). Zero console errors and
zero external requests (the harness fails on either). Every sheet in `screenshots/visual-final/sheets` was
inspected, plus full frames of the night, weather, springs, lake and dialogue screens. 55 before/after sheets (`sheets.mjs --compare visual-before`) are in `screenshots/visual-final/before-after`.

| Suite | What it covers | Status |
|---|---|---|
| 13 original test files (82 tests) | All 38 acceptance criteria, unchanged | pass |
| `art.test.mjs` (new, 6 tests) | All painted assets (222 then, 225 after the fix pass) load with no failures; the painted terrain, people and buildings are what gets drawn; `?art=0` falls back to vector art; a 16-shot era, season, weather and night tour; no painted object falls back to placeholder art | pass |
| `perf.test.mjs` (updated) | fps and script time while walking in four chapters; heap; no rebakes while standing still (the wait now lets background prefetch finish) | pass |
| `tools/check-file-url.mjs` (new) | The built game from file:// at both viewports: 222/222 images (225/225 after the fix pass), 7/7 fonts, painted terrain and people, no errors, no requests | pass |
| `tools/check-facts.mjs` | 84 facts, 143 texts, 0 problems | pass |
| `tools/balance.mjs 6` | Same results as before the pass: 93.3 days, best crop ÷ median 1.5, energy 73.3%, forage 58.3%, 0 broke days | pass |

## Performance

Measured while walking. Each source used its own scene set: the harness perf test (software rendering) walks
four chapters; `tools/perf-scenes.mjs` walks the busiest scenes from file://. CPU was at 17–48% during the
final run.

| Scene | Desktop fps | Mobile fps | Script per frame (desktop / mobile) |
|---|---|---|---|
| Chapter 1 farm (harness) | 60.7 | 60.0 | 1.20 / 1.33 ms |
| Chapter 3 town (harness) | 60.3 | 58.3 | 1.43 / 1.93 ms |
| Chapter 4 town at night (harness) | 60.5 | 56.3 | 1.13 / 1.20 ms |
| Chapter 6 lake (harness) | 59.0 | 59.9 | 0.70 / 1.06 ms |
| 1931 town, night, rain (`perf-scenes`, software) | 60.7 | 60.4 | 1.2 / 1.2 ms |
| 1886 town in snow (`perf-scenes`, software) | 60.2 | 59.2 | 0.2 / 0.2 ms |
| Same scenes on the real GPU (`--gpu`) | 60.0–60.5 | 60.1–60.4 | 0.2–1.6 ms |

- **JS heap:** 9.5 MB (budget 40).
- **Load:** hooks ready in about 80 ms over http and about 220 ms from file:// with the GPU. The worst frame
  while walking is 17 ms on desktop and 50 ms once on mobile, when a chunk bakes in snow.
- **Load sensitivity:** on a busy machine (other sessions' suites, CPU 60–90%) the harness measured 40–52 fps for
  the same scenes. Script time stayed under 4.4 ms, so those drops were the machine, not the game.

- **Script per frame** stays near 1 ms. The frame draws only cached canvases; every painted sprite is
  pre-scaled once per tile size.
- **Terrain chunks** (16 × 16 tiles) bake once per chapter, season and weather, at no more than 1.5× the CSS
  tile size. An LRU of 10 holds them: about 40 MB on desktop and 33 MB on phones.
- **Bakes take 6–20 ms**, down from 75–117 ms. Three things got them there:
  - an integer value-noise hash instead of the string hash;
  - grass patches drawn at an eighth of the resolution and scaled up, instead of a blur filter;
  - no canvas filters anywhere in the bake.
- **Prefetch.** Chunks just outside the view are baked on quiet frames and pre-rasterised, so walking across a
  chunk border no longer hitches.
- **Loading is progressive.** The current chapter's art loads first, the rest after 1.2 s. `isIdle()` stays
  false while art or fonts load. Hooks are ready in about 80 ms, and the HTML is 0.65 MB, including 0.26 MB
  of inlined fonts.
- **Download:** 9.3 MB of WebP in `assets/`. A chapter's first view needs about 3–4 MB of it; the six
  panoramas account for 2.35 MB.
- **Low-end fallback.** Settings → Graphics → "Simple (faster)" keeps the vector art and downloads no
  images (`?art=0` forces it). No WebGL is used, so there is no WebGL dependency.

## Known gaps

From the M4 review, still open or only partly fixed (MAJOR unless noted):
- **The characters are still chibi.** One template with a large round head, now with painterly shading, eyes and
  brows. They read well, but next to the illustrated buildings they look like a different game. The next step
  is a second, slimmer body (head-to-body 1:1.6) and a signature prop per named neighbour.
- **The farm field is still open grass** between the yard and the field edge. The yards are dressed by era. The
  field has mown rows and wildflowers, but no hedgerows, worn paths or stumps.
- **Elevation is only suggested.** The ridge has a rock lip and a shadow, but there are no cliff faces or stairs,
  and the tufa slope is flat.
- **Water lacks depth.** The lake has a smooth shore and foam but no depth gradient or animated foam. The creek
  has flow lines and glints.
- **The streets are quiet.** Only the 2–3 scheduled neighbours walk, with no ambient townsfolk. Vehicles are
  parked in the lots, not moving.
- **No tool-specific animation.** The swing frames are generic, and the tool icon arcs over them.
- **The UI frames are themed by colour, not material.** There are no wood, hide or brass frames per era.
- **MINOR:** small source lines on cards (0.86 rem); the cow idles
  at one spot in the pen.

Not reviewed after the last fixes: the icon, shadow and texture changes listed under the review table were
checked in the final screenshots but have not been re-scored.

From before the pass, unchanged:
- Nobody has listened to the audio or used a screen reader.
- The chapter 4 lake is named Lake Hamilton (see research below).

## New research (in `research/visual-eras.md`, with sources)

- **Gulpha Creek drains to Lake Catherine (Remmel Dam, 1924), not Lake Hamilton.** Its mouth is at 34.4722,
  -92.9864 (OSM way 250880954; GNIS 77086). Hot Springs Creek is the stream that reaches Lake Hamilton. The
  story keeps "the lake fills in 1931". The About screen now says the map condenses the valley and that the
  lake stands for the reservoirs made by Remmel Dam (1924) and Carpenter Dam (1931). **The chapter 4 text
  and quests still name Lake Hamilton:** a content decision for the coordinator.
- **Tufa as described in 1902** (Weed): "dark-gray and porous," creamy alabaster-like patches, emerald green
  where algae grow, and no large basins.
- **Street lighting:** four iron gas lamps by 1897; 15 ornamental electric standards in 1914; 20 five-globe
  cluster lights by 1929. This is the basis of the 1886 gas lamp and the 1931 cluster lamp.
- **Central Avenue:**
  - 1874: board-and-batten buildings with false fronts.
  - 1884: the creek arched over and the street paved.
  - Late 1880s: brick blocks with pressed-metal cornices and canvas awnings.
- **Carpenter Dam:**
  - work began in February 1929 with a camp of about 1,000 men;
  - finished in December 1931;
  - lumber and gravel came from the lake bed.
  - This supports the 1931 raw red-clay shore.
- **Vegetation:** shortleaf pine–oak on ridges; sycamore, river birch and sweetgum on creek banks (NPS
  vegetation monitoring).

## Requests for the coordinator

**Shared research.** Add the 11 sourced facts listed at the end of `research/visual-eras.md`, and record:
- the Gulpha Creek correction;
- the street-lighting dates;
- the Lake Hamilton shoreline conflict: about 200 miles (arkansas.com) against the corpus's unverified 80.

Still unsourced anywhere:
- Central Avenue's paving material, 1884–1930s;
- the start date of gas lighting;
- the sodium and LED conversion dates;
- Lake Hamilton's full-pool date.

**Content decision.** Lake Hamilton versus Lake Catherine for the farm's lake (above).

**Harness: a frame-cost helper.** `t.frameCost()` would measure in-page time per frame. The `frameMs` and
`bakeLog` hooks here do it by hand.

**Harness: a shared packer.** Consider adopting `tools/pack-art.mjs` features into `shared/test-harness/art-pack.mjs`:
- `trim` with the true aspect ratio, for sprites anchored to footprints;
- `seamless` texture cross-fade;
- sprite-sheet slicing by transparent gaps, since generated sheets rarely keep exact columns;
- `keyAll`, to key white enclosed by the motif (bare branches, bench slats).

**Lessons.** For LESSONS:
- **String hashes in hot loops.** `hash(...parts)` joins strings. Used per sample in marching squares, it made
  chunk bakes 3× slower. Use an integer hash for render noise.
- **Canvas filters.** `ctx.filter = 'blur()'` in a bake is the costliest thing a 2D bake can do. Draw at low
  resolution and scale up instead.
- **Tinted toon layers.** Rendering a Blender figure layer by layer in greys, then multiply-tinting in canvas,
  gives a whole cast from three atlases.

## Files

- **Source:** `src/js/render/` `assets.js` (loader), `terrain.js` (painted terrain), `painted.js` (sprite
  mapping and placement), `sprites.js` (character compositor). Plus edits to `scene.js`, `art.js`,
  `palette.js`, `ui.js`, `main.js` and `styles/main.css`.
- **Art sources:** `art-src/art.json` (packing spec), `art-src/PROMPTS.md` (every image prompt) and
  `art-src/blender/characters.py` + `.blend`. Raw PNGs
  are git-ignored and `assets/` holds the packed WebP.
- **Tools:**
  - `tools/pack-art.mjs`
  - `tools/build-fonts.mjs`
  - `tools/preview-sprites.mjs`
  - `tools/check-file-url.mjs`
  - `tools/perf-scenes.mjs` (`--gpu` for the real GPU)
- **Vendored fonts:** `vendor/fonts/` (recorded in SAMPLES.md).
- **Research and reviews:** `research/visual-eras.md` and `research/review-*.md` (the three reviews).
- **Benchmarks:** `benchmarks/` (git-ignored, with SOURCES.md).
