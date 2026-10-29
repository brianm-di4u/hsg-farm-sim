# Valley of Vapors: Through the Ages, visual review (milestone vis-m4)

Reviewer stance: independent and adversarial. Scored only on what the stills show, against official store
screenshots of benchmark A, benchmark B, benchmark C and benchmark D (`benchmarks/`).

## Coverage

- **Contact sheets:** all 15 desktop and all 10 mobile sheets in `screenshots/vis-m4/sheets/`.
- **Full-size desktop frames:** 04, 15, 19, 21, 25, 28, 31, 48, 50, 51, 53, 66, 72, 73, 74, 78 and 82.
- **Full-size mobile frames:** 48 and 82.
- **Zoomed crops:**
  - Player sprite (04).
  - 1886 hat (48).
  - Ripe and harvested crops (15, 16).
  - HUD numerals (04, 50).
  - Tent bounding box (31, 46).
  - Tractor and hay shadows, and the grass seam (85).
  - 1931 springs (73).
  - Fishing bite (26).
  - Roadside stand (66).
- **Seen only on the contact sheets at about half size:** 01, 49, 54, 84, 85 and 86 (desktop) and 04 (mobile).
- **Benchmarks:** A-1/3, B-1/2/3, C-2, D-2/5.

## Scores

| # | Category | Ours (vis-m4) | m2 | before | Typical benchmark |
|---|---|---|---|---|---|
| 1 | Art | **6** | 5 | 3 | 9 |
| 2 | Lighting | **5** | 4 | 4 | 7.5 |
| 3 | Animation and game feel (as stills show) | **4** | 3 | 2 | 8.5 |
| 4 | UI | **5** | 5 | 5 | 8 |
| 5 | Typography | **5** | 5 | 5 | 7.5 |
| 6 | Readability | **6** | 6 | 5 | 8 |
| 7 | Mobile (390×844) | **6** | 6 | 6 | 7 |
| 8 | Authenticity and era distinctness | **7** (towns 8–9, farm yard 6, springs 4) | 7 | 5 | n/a (genre bar for a coherent setting is about 8) |

### Summary

This milestone mostly added things to the world:
- Era vehicles: a carriage, a Model A, a finned sedan and a hatchback.
- Era yard dressing: a wagon in 1871, a tractor and hay in 1955, a hoop house in 2026.
- Ripe sparkles, a harvest pop, a "!" bite emote and a painted cow.
- Ridge ledges, a warm 1931 dusk grade, warm cluster lamps and glowing signs.

That moves Art, Lighting and Feel up one point each. Nothing structural changed:
- The characters are still chibi dolls.
- The farm field is still a void.
- Water is still a tiled strip.
- The UI is still web chrome, and every event still resolves into a black toast.

A new class of problem is now visible: compositing bugs.
- Rectangular boxes around sprites.
- Props with shadows offset so far that they float.
- A horizontal seam band across the grass.
- The player drawn on top of a spring pool.
- A crop drawn over the player's face.

These are cheap to fix and they make the build look unfinished. The 1931+ hot springs also still contradict the
game's own premise: there are five open pools beside two grey boxes.

## (a) Status of the m2 gaps

| m2 # | Gap | Status | Evidence (vis-m4) |
|---|---|---|---|
| 1 | Characters are crude dolls; the 1886 hat reads as a parka halo | **Partly** | Now about 1.7 tiles tall, with eyes, brows and a blush. Still one round-head chibi template with flat fills and no painted or rim pass. The 1886 hat is now an opaque white dome that reads as a pith helmet or bike helmet (48, 70, 77, 81). NPCs are still recolours (Hattie, Josiah). |
| 2 | Farm is an empty green rectangle, same in every era | **Partly** | The yards now differ by era: 84 (cabin, wagon, rail fence), 85 (ranch house, tractor, hay, white fence), 83 (hoop house, white fence). The field below the yard is unchanged in 40–45 and 80, and is 70%+ flat grass. Tilled soil is still a hard-edged brown square (12, 21). |
| 3 | Lighting: a global darken, no golden hour, wrong light colours | **Partly** | Fixed: 1931 cluster globes are warm (53); CLUB, DRIVE-IN, MOTOR HOTEL and BATHS signs glow (53, 78); windows are lit (19, 78); 19:10 dusk is warm amber (82). Still open: "golden" 17:40 (83) looks like noon; 2026 LED pools (79) are as warm as 1955 sodium (78); no bloom on lamp heads; 1871 road pools sit mid-street rather than under the porch lanterns (19). |
| 4 | No juice at key moments | **Partly** | Ripe crops show sparkles instead of rings (15). Harvest pops the item (16). Fishing shows a "!" over the player (26). Duplicates collapse to "×2" (26, 27). Faint chimney smoke appears (70, 81). Still missing: tool swing poses, bobber ripple, heart emote, item arc into the hotbar. Every other result is a black toast (24, 28, 63, 64, 65, 66). |
| 5 | Placeholder vector art in normal play | **Partly** | The rental hut is now painted (63). The roadside stand (66) is a flat box with a flat striped awning, at vector-placeholder grade. The 2026 fund box (51, 67) is a navy UI tile with a "$" standing in the street. The 1931 spring covers (73) are grey boxes that read as safes or AC units. |
| 6 | Water reads as flat tiled texture | **Open** (cosmetic progress) | The creek has a thin brown bank stroke and a pebble caustic texture, but keeps the same repeating diamond sparkles and has no flow, foam, reeds or rocks on the bank (25, 26, 28, 86). Lake (74, 75): the player still stands in a water notch, the creek still hard-cuts into the shore, the brick road still dead-ends at the water, and the dark patches still read as cloud shadows. |
| 7 | No elevation; the ridge is a texture swap | **Partly** | The ridge and quarry now have a raised rock lip with an outline (25, 62, 81). There are still no cliff faces, no wall height, no drop shadows and no stairs. The path just runs through the lip. The tufa hillside is still flat (72, 73). |
| 8 | Hot springs look like teal lollipop icons | **Partly** | Pools now have pale travertine rims and a few faint steam smudges. They are still identical round pools in a 2×2 grid (72, 73, 33, 52). The algae is flat translucent green ellipses. In 1931 (73) five pools are open beside two covers, which contradicts "from 1886 piped and capped, one open display spring". |
| 9 | Streets are lifeless stages | **Partly** | Vehicles have been added: a horse and buggy (28, 29), a Model A (mobile 86), a finned sedan (66), a hatchback (83) and benches. Still only 0–2 NPCs per screen. Lots are still rounded lawns with white curbs and no walks to the doors (47–51). |
| 10 | UI is generic web chrome; toasts fight the action | **Open** | Panels, pill buttons and the salmon selected state are unchanged (05, 06, 60, 68). Toasts are still black system-sans pills stacked mid-playfield (24, 28, 63). On mobile they now cover the context prompt: "Space: Bite!" ghosts under a toast in mobile 26, and "B: Feed and collect" in mobile 28. Tool icons are still thin line drawings. |
| 11 | Old-style numerals in data; tiny source lines | **Open** | The 1807–1886 HUD still sets "1807", "0/5" and "$150" in old-style figures (04 zoom, 31). Source lines are still about 8–9 px small caps (03b, 34, 52, 59, 62). |
| 12 | NPC name labels collide | **Fixed** | "Margaux" and "Josiah" are offset and both are readable (31, 32). They do now sit on top of the TRADE sign. |
| 13 | Mobile HUD breaks into three rows (1931/1955/2026) | **Open** | Mobile 43, 44, 45, 49, 50, 51, 53, 54, 75, 78, 79, 82, 83, 85, 86. The idle joystick is still a full-opacity ring and covers content (mobile 82 covers the bungalows; mobile 47 covers a house). |
| 14 | Season and weather reads are off | **Partly** | Fixed: rain now has streaks (21); fog is neutral rather than mint (23, 72). Still open: no puddles or splashes; snow has green tufts poking through and no roof caps (22, 77); spring oaks are still yellow-olive and read as autumn (04, 25, 46, 64). |
| 15 | Livestock nearly invisible | **Partly** | There is now a painted cow at about 1.3 tiles (28). It is still parked at the top edge of an empty pen, with three toasts under it. |
| 16 | About credit inaccurate | **Fixed** | It now says "generated images and Blender renders" (03). |

**Tally:** fixed 2, partly 11, open 3. Nothing in the top five m2 gaps is fully closed.

## (b) Ranked remaining gaps (most impactful first)

### 1. MAJOR: The characters still belong to a different game
- **Evidence:**
  - 04 zoom: big round head and flat brown fill, with no outline weight or shading that matches the buildings.
  - 48 and 70: the 1886 white dome hat.
  - 50 and 51: the player and NPCs share one body, and only shirt colour changes.
  - 31: Josiah is a brown blob from the back.
  - Mobile 48: the chef NPC is the only silhouette that stands out.
- **Benchmark:** A-1/3 and B-1/2 characters have readable silhouettes, hair shapes and outfits at the
  same screen share.
- **Fix:**
  - Re-light the Blender atlas with the building-art recipe: a warm-brown 1–2 px outline, two-tone shading,
    upper-left key light and a rim light.
  - Reduce the head to body ratio from about 1:1 to about 1:1.6.
  - Give every named NPC one silhouette prop: an apron, a bonnet, a cane, a satchel or a chef toque.
  - Replace the 1886 dome with a tan straw boater or bowler: a flat brim ellipse with a band, so the face shows.
  - Add a soft contact shadow, not just a foot ellipse.

### 2. MAJOR: Compositing bugs make finished art look broken (new)
- **Evidence:**
  - **Rectangular boxes around sprites:** a darker rectangle around the right tent in 31 (visible at normal
    contrast), 07, 11 and 46, and rectangular darker lots behind the 1871 buildings (18, 30, 47).
  - **Floating props:** the tractor and the hay bales in 85 have shadows offset about half a tile below their
    wheels and base, so both read as hovering.
  - **Grass seam:** a horizontal lighter band crosses the grass in 85 and 86 (zoomed), and also 42–45 at about 40%
    height.
  - **Steam layer edge:** a lighter rounded-rectangle haze with hard edges sits over the tufa (73 zoom).
  - **Z-order:** the player is drawn on top of a spring pool (72). Corn leaves are drawn over the player's face
    (16).
- **Fix:**
  - Trim the alpha bounds or feather the AO and shadow pass so it follows the sprite silhouette rather than its
    rectangle.
  - Anchor cast shadows at the sprite's ground contact (y = foot line). Use one shared offset vector for every
    prop.
  - Make grass tiles seamless in both axes, or offset the noise per tile row.
  - Render steam as radial or particle sprites, never rectangles.
  - Y-sort crops and pools with characters by foot line.
  - Make spring pools non-walkable.
  - Add a CI image test that diffs a flat-grass region for banding.

### 3. MAJOR: The farm field is still a green void
- **Evidence:** 40–45, 80, 21, 22, 24 and 84/85 below the path. The field occupies 60–70% of the frame and
  carries only tufts, rocks and flecks.
- **Benchmark:** A-1 and A-3 fill the same area with fence lines, crop rows, worn dirt, bushes and
  stumps.
- **Fix:**
  - Extend the yard dressing into the field:
    - Hedgerow or tree line along the edges.
    - Worn foot and wagon paths to the creek.
    - Mown and unmown patches with clover and bare clay spots.
    - Stumps and brush piles in 1807, a rock cairn, a corn crib.
    - A field-edge plough or cultivator per era.
  - Tilled soil needs furrow texture and auto-tiled soft edges into the grass (12, 21 and 22 show a hard square).

### 4. MAJOR: The hot springs contradict the era design and still look like icons
- **Evidence:**
  - 73 (1931): five open pools plus two grey "covers".
  - 72 (1807): identical round pools in a 2×2 grid.
  - The algae is flat green ellipses, and the steam is two faint smudges.
- **What's wrong:** The game's premise is "from 1886 piped and capped, one open display spring". The flagship
  visual of a game called *Valley of Vapors* is the weakest painted area in it.
- **Fix:**
  - **1807 and 1871:** irregular, different-sized pools with stepped travertine rims, orange and blue-green algae
    mats under clear water, glistening runoff rivulets, and layered animated steam wisps with a static wisp for
    reduced motion.
  - **1886 onward:**
    - Replace all but one pool with a painted spring-house or green cap sprite: a small stone or wood box with
      a hinged lid and pipe, rather than a grey box with a black square.
    - Keep one fenced display spring with a railing and a plaque.
    - Run visible pipes or a conduit to the Row.

### 5. MAJOR: Every result is still a black system toast
- **Evidence:**
  - 24, 28 (three toasts), 63, 64, 65, 66 and 67.
  - Mobile 26 and 28: the toast covers the contextual A/B prompt.
- **What's wrong:** benchmark B-3 and benchmark A show results in-world: emotes, item pop-ups and a quest banner.
- **Fix:**
  - Move the toast lane above the hotbar, theme it per era, cap it at two and never overlap the prompt chip.
  - Add in-world feedback:
    - Milk: a bottle pops from the cow.
    - Petting: a heart emote.
    - Hay: a pile appears in the trough.
  - Show goal completion as a themed ribbon banner, not a toast.
  - Add tool swing frames, a water splash decal and a bobber ripple.

### 6. MAJOR: Water is a tiled strip with a stroke
- **Evidence:**
  - 25, 26, 28 and 86: a uniform creek with identical white diamonds every few tiles.
  - 74 and 75: a player-sized notch in the shore, a hard creek-to-lake cut, the brick road dead-ending into the
    water, and rails stopping at the road.
- **Benchmark:** B-2 water has a bold bank, foam, flow and highlights.
- **Fix:**
  - Depth gradient from pale teal shallows over clay or sand to deep blue.
  - An animated foam line at the shore, and flow streaks in the creek.
  - Rocks, reeds and cattails on the banks, and a riffle at each bridge.
  - Fan the creek mouth into the lake. End the road at a boat ramp or bend it along the shore. Draw a proper
    grade crossing.
  - Remove the notch.

### 7. MAJOR: Lighting still lacks golden hour, bloom and a cool 2026 read
- **Evidence:**
  - 83: summer 17:40 looks like noon.
  - 79 versus 78: 2026 pools are as warm as 1955.
  - 53 and 78: lamp globes are bright but have no bloom halo.
  - 19: oval pools sit on the road with no source above them.
  - 82 is the one frame that gets it right.
- **Fix:**
  - Extend the 82 grade into an hourly LUT so 17:00–19:00 is amber with long shadows in every era, including the
    farm.
  - Give 2026 lamps a 4000 K neutral-white cone.
  - Make 1955 cobra-heads a monochrome orange that desaturates what it hits.
  - Add an additive bloom sprite at every lamp head and sign.
  - Move the 1871 pools under the porch lanterns.

### 8. MAJOR: There is still no real elevation
- **Evidence:** The 25, 62 and 81 ridge is a 1-tile outlined lip with no wall face. The path cuts straight
  through it. The tufa is a flat slab (72, 73). benchmark D-2 composes the whole screen with cliff faces and stairs.
- **Fix:**
  - Painted cliff and bank face tiles, 1–2 tiles tall, with a drop shadow on the lower terrace and stairs where
    the path crosses.
  - Terraced travertine steps for the springs hillside.
  - Let canopies overhang the ledge.

### 9. MAJOR: The UI frame is generic web chrome
- **Evidence:** 05, 06, 07, 60 and 68.
  - 1px-bordered rounded panels, pill buttons and empty grey slot grids.
  - The salmon-on-dark-green selected state has low contrast.
  - Tools are thin single-stroke icons.
- **Benchmark:** B-1/2 hotbar and A-1 use chunky filled icons in framed slots.
- **Fix:**
  - Era material frames: hide and wood (1807), parchment and walnut (1871/1886), brass Deco (1931), Formica and
    chrome (1955), clean card (2026).
  - Filled, painted 32–48 px item icons.
  - Inset bevelled slots.
  - A high-contrast selected state.

### 10. MAJOR: Town lots are still a board game
- **Evidence:** 47–51 and 70. Rounded lawns are edged with white curbs. There are no walks to the doors and no
  foundation plantings. Most screens show 0–2 NPCs. The new vehicles are good but sparse: one per screen, parked
  on grass in 66.
- **Fix:**
  - Paved walks and steps from each door to the street, foundation shrubs, and broken curb lines.
  - 3–6 ambient walkers per town screen.
  - Hitching rails and boardwalks in 1871, angle-parked cars in 1931 and 1955, café tables and bikes in 2026.

### 11. MINOR: Mobile HUD wraps to three rows, the joystick is opaque and toasts cover prompts
- **Evidence:**
  - Mobile 43–45, 49–51, 75, 78, 79, 82, 83, 85 and 86: three HUD rows, costing about 50 px.
  - The joystick ring is opaque (mobile 47, 82).
  - Toasts cover the prompt (mobile 26, 28).
- **Fix:**
  - Fix the date-chip width, or merge money into the date row for the sans themes.
  - Fade the idle joystick to 25%.
  - Reserve a toast lane.

### 12. MINOR: Typography
- **Evidence:** Old-style numerals in the 1807–1886 HUD (04 zoom: "1807", "0/5"). Source lines about 8–9 px (03b,
  34, 52, 59, 62).
- **Fix:**
  - Use `font-variant-numeric: lining-nums tabular-nums` for the HUD, prices and counts.
  - Set source lines to at least 12 px on desktop.

### 13. MINOR: Weather and season
- **Evidence:**
  - 22: snow with green tufts.
  - 77: no roof snow.
  - 21: no puddles or splashes.
  - 04, 25, 46 and 64: spring oaks read as autumn.
- **Fix:**
  - Snow caps on roofs, rocks and tufts, with tufts hidden under snow.
  - Puddle decals and splash rings.
  - Fresh yellow-green spring foliage with redbud and dogwood accents.

### 14. MINOR: Remaining placeholder-grade objects
- **Evidence:** The roadside stand (66), the "$" fund box (51, 67) and the grey spring covers (73).
- **Fix:**
  - Paint them in the building style: a plank stand with a hand-lettered sign and crates.
  - Replace the fund box with a period donation kiosk or thermometer sign.
  - Add a test that rejects any world object without a painted asset.

### 15. MINOR: Livestock staging
- **Evidence:** 28. One cow is parked at the top rail of a large empty pen, with no trough or feed state visible.
- **Fix:**
  - Stage the cow mid-pen with grazing and idle frames.
  - Show a trough with visible hay.
  - Add a second animal or chickens per era.

## (c) What is good and must be preserved

- **Building art and era programme.** These remain the best thing in the game and are commercially competitive.
  The town's progression through the eras is clear:
  - 1871: plank row.
  - 1886: Victorian Row and Second Empire hotel.
  - 1931: Spanish Revival, Quapaw-like dome, Arlington-like hotel, Deco CLUB.
  - 1955: boomerang DRIVE-IN, MOTOR HOTEL.
  - 2026: adaptive reuse (BREWERY, SPA, CULTURAL CTR, FARMERS MARKET), solar bungalow.
- **New era props:** the 1871 buggy and wagon, the 1931 Model A, the 1955 finned sedan and red tractor, and the
  2026 hoop house and hatchback. Keep them and add more, but fix the shadows (85).
- **Era yard dressing (84, 85, 83).** This is the first time the farm reads by era. Push the same treatment into
  the field.
- **The 1931 dusk grade (82).** This is the best lighting frame in the build. Use it as the template for golden
  hour everywhere.
- **Warm cluster lamps (53), glowing signs (53, 78) and lit windows (19, 78).**
- **Ripe sparkles and crop sprites (15).** The radish and corn stages are clean and legible. Keep the harvest pop
  (16).
- **Ridge forest (25, 81).** The mixed shortleaf pine and oak and the novaculite outcrops read well. The ledge lip
  is a good first step toward elevation.
- **Lake Hamilton shoreline story.** Raw red clay in 1931 (74), sand by 1955 (75) and a dock by 2026 (54).
- **Title, wipe and chapter vistas (01, 35, 69).** These are the colour target for the whole game.
- **Road surfaces by era:** dirt, macadam, brick, asphalt with dashes, herringbone pavers.
- **Per-era UI palettes, history and intro cards with sources, label stacking (31), accessibility options (58, 59,
  60) and the vector fallback (71).**
- **Mobile panels:** full-width, with large touch targets and A/B labels; 150% text works (58, 58b).
