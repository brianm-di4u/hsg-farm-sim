# Valley of Vapors: Through the Ages, visual review (milestone vis-m2)

Reviewer stance: independent and adversarial. Scored only on what the stills show, against official store
screenshots of benchmark A, benchmark B, benchmark C and benchmark D (`benchmarks/`).

Material viewed: all 14 desktop and 10 mobile contact sheets, plus these full-size frames: desktop 01, 04, 15, 19,
28, 31, 48, 49, 53, 63, 74, 78 and 83. I also zoomed into 48 (player sprite), 63 (HUD numerals) and 78 (HUD).
The remaining requested frames (21, 25, 35, 50, 51, 54, 72, 73, 82 and mobile 04/48/78) were reviewed on the
contact sheets at roughly half size. Benchmarks viewed: A-1/3/5, B-1/2/3, C-1/2/4,
D-1/2/3/5. Most of the benchmark loads failed, so the benchmark judgments rest on only four images: A-1,
B-2, C-2 and D-2.

## Scores

| # | Category | Ours (vis-m2) | Before (review-before) | Typical benchmark |
|---|---|---|---|---|
| 1 | Art | **5** | 3 | 9 |
| 2 | Lighting | **4** | 4 | 7.5 |
| 3 | Animation and game feel (as stills show) | **3** | 2 | 8.5 |
| 4 | UI | **5** | 5 | 8 |
| 5 | Typography | **5** | 5 | 7.5 |
| 6 | Readability | **6** | 5 | 8 |
| 7 | Mobile (390×844) | **6** | 6 | 7 |
| 8 | Authenticity and era distinctness | **7** (towns 8–9, farm 3) | 5 | n/a (fantasy settings; genre bar for a coherent setting is about 8) |

Summary: the buildings are now the best thing in the game. Several of them would hold up next to commercial
painted art, and the town's progression through the eras is clear and historically grounded. Everything around
the buildings falls short: the characters, the farm, water, lighting, motion and the UI frame. The result looks
like a high-end building pack placed on a prototype. The jump in Art comes almost entirely from building sprites
and vistas. Lighting has not moved, and in some eras the light colour is wrong.

## Ranked gap list

### 1. MAJOR: The characters are crude dolls in a painted world
- **Evidence:** 04-game, 15-ripe, 48-ch3-town (zoomed), 28-animals, 29-town-morning, 31-dialogue, 63-hut and
  mobile 46–51.
- **What's wrong:**
  - Player and NPCs share one round-headed chibi template with flat fills and almost no face. At desktop scale
    they are about 1 tile tall next to buildings 4–6 tiles tall that are rendered at illustration detail. The two
    styles do not belong to the same game.
  - The 1886 player's hat renders as a white ring around the face and reads as a fur parka hood. That is wrong for
    an Arkansas spring and is the most visible costume in the game (48, 58, 70, 77, 81).
  - NPCs are hard to tell apart and have no idle personality. Ezra (63) is a brown blob.
  - Benchmark characters are about 2 tiles tall, have clear faces and silhouettes, and have per-NPC sprites.
- **Fix:**
  - Re-render the Blender atlas with a painted pass that matches the buildings: warm-brown outline, two-tone
    gouache shading, upper-left key light and rim light.
  - Raise character height to about 1.6–1.8 tiles and keep the 1-tile footprint.
  - Give faces eyes and brows at 2–3 px, plus mouth variants.
  - Build distinct era silhouettes:

    | Era | Costume |
    |---|---|
    | 1807 | Hunting frock, felt hat |
    | 1871 | Slouch hat, suspenders |
    | 1886 | Straw boater with a tan brim drawn as an ellipse, never a white halo |
    | 1931 | Fedora, vest |
    | 1955 | Ball cap, denim |
    | 2026 | Cap, tee, backpack |

  - Add a soft contact-shadow ellipse under every figure.
  - Give each named NPC at least one unique silhouette element: an apron, a bonnet, a cane, a satchel.

### 2. MAJOR: The farm is an empty green rectangle that barely changes across six eras
- **Evidence:** 40–45-chN-farm (only fence colour, a tree and the HUD change), 80-farm-1807-fall,
  83-farm-2026-golden, mobile 40–45.
- **What's wrong:**
  - The core screen of a farming game is 70% flat repeated grass with a few tufts and rocks.
  - Benchmarks fill the same area with layered props, hedgerows, height and worn ground.
  - The prompt promises six historically distinct eras, but on the farm 1931 and 2026 look the same.
- **Fix:**
  - Add per-era farm dressing layers:

    | Era | Farm dressing |
    |---|---|
    | 1807 | Stumps, girdled trees, worm (zig-zag) split-rail fence, brush piles, cane brake by the creek |
    | 1871 | Hay rick, wagon, smokehouse, rail fence |
    | 1886 | Board fence, barn, windmill or well sweep |
    | 1931 | Bungalow, Model A, ice-box porch, no power lines yet |
    | 1955 | Tractor, utility poles and drop line, chain-link, ranch house |
    | 2026 | High tunnel (hoop house), drip lines, solar array, pickup, market crates |

  - Break up the grass with worn footpaths, mown and unmown patches, clover and bare spots.
  - Add a hedgerow or tree line along the field edge.

### 3. MAJOR: Lighting is a global darken with weak blobs, golden hour is missing, and some light colours are wrong for the era
- **Evidence:** 19-night, 53-ch4-night, 78-town-1955-night, 79-town-2026-night, 82-town-1931-dusk,
  83-farm-2026-golden, mobile 18/19.
- **What's wrong:**
  - Night is a multiply over the whole frame with small soft spots. Lamp heads do not glow, and signs dim along
    with everything else.
  - 1931 ornamental cluster lamps glow cold cyan-blue (53). Incandescent globes of that period were warm, about
    2700 K, so the colour reads like mercury vapour or LED and contradicts the era design.
  - 1955 has no neon at all on DRIVE-IN, MOTOR HOTEL or BATHS (78), even though neon is the defining night
    feature of 1950s Central Avenue.
  - 1871 has bright oval light pools on the road with no lamps to cast them (19).
  - "Golden" 17:40 (83) is indistinguishable from noon. Dusk at 19:10 (82) is a muddy brown-grey wash.
- **Fix:**
  - Build a time-of-day colour grade: a lookup table keyed by hour covering dawn pink, neutral noon, amber from
    17:00 to 19:00 with longer and warmer shadows, blue hour, then night.
  - Use per-era colour temperatures with an additive emissive head and bloom on each light source:

    | Light source | Colour temperature | Notes |
    |---|---|---|
    | Campfire | ~1900 K | Flicker |
    | Lantern | ~2000 K | |
    | Gas mantle | ~2100 K | Slight green-yellow |
    | 1931 incandescent cluster | ~2700 K | |
    | 1955 low-pressure sodium | ~1800 K | Monochrome orange |
    | 2026 LED | ~4000 K | Crisp, cool-white cones |

  - Draw neon tubes on 1931 CLUB and the 1955 signs and keep them at full brightness at night.
  - Tie every light pool on the ground to a visible source, such as window spill quads under lit windows.
  - Signs should not darken below legibility.

### 4. MAJOR: No visible juice at the key moments
- **Evidence:**
  - 15-ripe: ripe crops are marked by hollow white debug-looking rings.
  - 13/14: no splash or wet-soil sheen beyond a tint.
  - 26-bite and 27-catch: the bobber is a tiny dot, there is no "!" over the player, and feedback is a toast.
  - 28-animals: feedback is three stacked toasts.
  - 63/64/65: completion is a toast.
- **What's wrong:** Every interaction resolves into a text toast. Benchmarks show particles, item pop-ups,
  emotes and character tool poses even in stills.
- **Fix:**
  - Ripe crops get a sparkle and bob instead of rings.
  - Harvest pops the item in an arc into the hotbar slot.
  - Watering shows droplets and a dark wet-soil decal.
  - Tool use shows the swing frame and a dust puff.
  - Fishing gets a bobber ripple, a "!" emote over the player and a catch held overhead.
  - Animals show a heart emote.
  - Add chimney smoke, spring steam, birds and butterflies.
  - Goal completion gets a banner and a confetti or ribbon flourish rather than a toast.

### 5. MAJOR: Placeholder vector art appears in normal play
- **Evidence:** 63-hut. The placed rental hut is a grey pentagon with a black chimney and the NPC overlaps it.
  `assets/bld-hut.webp` exists but is not used for the placed item.
- **What's wrong:** A placeholder in a goal-completion moment breaks the illusion instantly.
- **Fix:** Map the placed rental hut (and every other placeable) to its painted sprite. Add a test that fails if
  any object falls back to vector drawing in a run without `?art=0`.

### 6. MAJOR: Water reads as flat tiled texture
- **Evidence:** 26-bite, 54-ch6-lake, 74-new-lake-1931, 75-lake-1955-evening, 83-farm-2026-golden, 21-rain.
- **What's wrong:**
  - The creek is a uniform grey-blue strip with a repeating diamond-sparkle pattern, no bank depth, no rocks, no
    flow direction.
  - The lake has no depth gradient and no shoreline foam. Its dark patches read as cloud shadows.
  - In 74 the creek meets the lake with a hard rectangular cut. The brick road and the railway dead-end into the
    shoreline. The player stands in a water notch.
  - benchmark B's water (B-2) has bold banks, foam, flow and highlights.
- **Fix:**
  - Shade the lake by depth: pale teal shallows over clay or sand to deep blue.
  - Animate a foam line at the shore. Add sky-tint reflections and flow streaks in the creek. Place rocks, reeds
    and cattails along the banks.
  - Fan the creek mouth into the lake.
  - End the road at a boat ramp or bend it along the shore. Bridge or curve the railway.
  - Blend two noise scales over water and grass textures to kill visible repetition.

### 7. MAJOR: The world has no elevation, and the ridge is only a texture swap
- **Evidence:** 25-ridge, 81-ridge-1886, 62-quarry-sign, 72-springs-1807, 73-springs-1931.
- **What's wrong:**
  - The north ridge and the springs hillside are flat colour regions.
  - There are no cliff faces, banks, steps or drop shadows.
  - Benchmarks (D-2, benchmark A) rely on ledges and cliffs to compose every screen.
- **Fix:**
  - Add painted cliff and bank edge tiles with drop shadows and stairs.
  - Terrace the tufa hillside.
  - Make the novaculite outcrops sit on visible rock shelves.
  - Let tree canopies overlap the ledge edges for depth.

### 8. MAJOR: The hot springs, the game's namesake, look like teal lollipop icons
- **Evidence:** 72-springs-1807, 73-springs-1931, 33/52 (background), 59-reduced, mobile 72/73.
- **What's wrong:**
  - Each spring is a perfect teal circle with a stroke tail. There is barely any steam.
  - The tufa is a flat beige region.
  - In 1931 the springs sit open beside Bathhouse Row. By then almost all were enclosed and piped, with a couple
    left as display springs.
- **Fix:**
  - Draw irregular pools with travertine rims.
  - Use clear water over orange and blue-green algae mats rather than opaque teal.
  - Add thin glistening runoff rivulets and layered animated steam wisps, with a static wisp sprite for reduced
    motion.
  - From 1886 cover most springs with spring houses or green-painted covers, and keep one or two display springs
    in 1931 and later.

### 9. MAJOR: Streets are lifeless stages with no era props, vehicles or crowds
- **Evidence:** 47/48/49/50/51-town, 29/30-town, 76-town-1871-rain, 77-town-1886-snow, 78/79.
- **What's wrong:**
  - The roads are bare texture.
  - A 1955 motor hotel has no cars. 1871 has no horses or wagons.
  - Only 0–2 NPCs are on screen at once.
  - Lots are rounded-rectangle lawns edged with white curbs. That reads as a board game, with no walkways to the
    doors and no contact shadows under the buildings.
- **Fix:**
  - Add era prop sets:

    | Era | Street props |
    |---|---|
    | 1871 | Hitching rails, horses, freight wagon, boardwalk, barrels |
    | 1886 | Mule streetcar rails, carriages, gas lamps (keep) |
    | 1931 | Angle-parked Model As, hydrants, benches, awnings |
    | 1955 | Finned cars, parking meters, neon |
    | 2026 | Bikes, planters, café tables, EVs, string lights |

  - Add 3–6 ambient walkers.
  - Draw sun-direction cast shadows under buildings, add footpaths and foundation plantings, and break up the curb
    lines.

### 10. MAJOR: The UI is generic web chrome and toasts fight both the theme and the action
- **Evidence:** 26/27 (the duplicate "Nothing is biting" twice), 28-animals (three toasts covering the cow), 63-hut,
  64-mill, 60-rebind, 33-journal.
- **What's wrong:**
  - The per-era palettes are a good idea, but the panels are 1px-bordered rounded rectangles with pill buttons.
  - Toasts are black system-sans pills that ignore the era theme. They stack in the upper centre of the
    playfield, exactly where the action is.
  - Item icons are thin line drawings and much less chunky than the benchmarks (A-1, B-2).
  - The selected state in Settings (salmon on dark green) has low contrast.
- **Fix:**
  - Give frames material textures per era: hewn wood and leather (1807), parchment and walnut (1871/1886), brass
    and Deco lacquer (1931), chrome and Formica (1955), clean card (2026).
  - Theme the toasts to match and move them to a lane above the hotbar or under the goals panel. Collapse
    duplicates into "×2" and cap the stack at two.
  - Redraw item icons as filled, painted 32–48 px icons.
  - Use a high-contrast selected state.

### 11. MINOR: Typography uses old-style numerals for data, and some text is very small
- **Evidence:** HUD in every 1807–1886 shot (zoomed 63: "1807" and "$198" drawn with old-style figures),
  34-history-card and 61/62 (source lines about 8–9 px), 60-rebind (buttons about 11 px).
- **Fix:**
  - Use `font-variant-numeric: lining-nums tabular-nums` for the HUD, prices and counts.
  - Set the desktop minimum to 14 px body and 12 px meta and source lines.
  - Keep the display serif for headings only.

### 12. MINOR: NPC name labels collide
- **Evidence:** 31-dialogue and 32-gift ("Josia Margaux", with "Josiah" clipped under "Margaux"), mobile 31/32.
- **Fix:** Add collision avoidance for labels (stack them or offset vertically), or show only the label of the
  NPC nearest the player.

### 13. MINOR: The mobile HUD breaks into three rows in the 1931, 1955 and 2026 themes
- **Evidence:** Mobile 43/44/45-farm, 49/50/51-town, 53, 54, 74, 75, 78, 79, 82, 83. In these eras the money box
  drops below the date box, which wastes about 50–60 px of a 844 px screen. The 1807–1886 themes fit in two rows.
- **Further problems:**
  - The joystick ring permanently covers about 15% of the playfield (25-ridge covers the trade tent).
  - Dialogue portraits sit on top of the joystick.
- **Fix:**
  - Give the date chip a fixed width and reduce the theme font size, or merge money into the date row.
  - Fade the idle joystick to about 25% opacity.
  - Raise dialogue above the touch controls.

### 14. MINOR: Season and weather reads are off
- **Evidence:**
  - 04-game, 40-ch1-farm, 46-ch1-town and 64-mill: spring oaks are yellow-olive and read as autumn.
  - 21-rain (desktop and mobile): there are no visible rain streaks, splashes or puddles, only a darker grade.
    Rain is indistinguishable from overcast.
  - 22-snow: green tufts and rocks sit on a flat white texture.
  - 12-tilled and 13-planted: tilled soil is a hard-edged brown square with no furrows and no soft edge into the
    grass.
  - 77-town-1886-snow: no snow on any roof.
  - 23-fog and 72-springs-1807: mint-green fog wash.
- **Fix:**
  - Use fresh yellow-green spring foliage with redbud and dogwood accents, which is accurate for the Ouachitas.
  - Add snow caps on roofs, rocks and tufts.
  - Make fog neutral blue-grey with height or distance falloff instead of a tinted veil.
  - Add angled rain streaks, ground splash rings, a wet sheen on paths and puddle decals. These can be static in
    reduced motion.
  - Give tilled soil furrow texture and auto-tiled soft edges.

### 15. MINOR: Livestock is nearly invisible
- **Evidence:** 28-animals. The cow is a small brown shape at the top of an empty pen, hidden behind toasts.
- **Fix:**
  - Scale animals to read at a glance (a cow about 2×1.5 tiles).
  - Place them mid-pen with idle and grazing frames.
  - Show a feed state on the trough.

### 16. MINOR: The About screen's art credit is inaccurate
- **Evidence:** 03-about (desktop and mobile) says "All art is drawn in code". The build ships painted raster
  assets (`assets/*.webp`, vistas) and Blender-rendered character atlases.
- **Fix:** Update the credit to describe the painted and generated assets and the Blender characters.

## What is good and must be preserved
- **Building art.** The painted building sprites are excellent, and they are historically legible:
  - 1807: tents and the trapper cabin.
  - 1871: rough plank bathhouses on a red-dirt street.
  - 1886: Victorian, Second Empire and Queen Anne bathhouses and a grand hotel with galleries, lit by gas lamps
    on a macadam street.
  - 1931: Spanish and Mediterranean Revival bathhouses, including a tiled-dome bathhouse that reads as the
    Quapaw, a neoclassical one, an Arlington-like twin-tower hotel and an Art Deco club.
  - 1955: a motor hotel and a boomerang-roof drive-in.
  - 2026: adaptive reuse (brewery, spa, cultural centre, hotel in the old Row) with a farmers market and solar
    panels. This is the strongest era-distinct content in the game.
- **Road surfaces by era:** dirt, then gravel or macadam, brick, asphalt with yellow dashes and herringbone
  pavers. Lamp sprites differ by era as well. Keep the lamp sprites and fix only the light colours.
- **Lake Hamilton shoreline:** raw red-clay shores in 1931 (74), sand by 1955 (75) and a dock by 2026 (54).
  This is exactly the right historical beat.
- **Title screen and era-wipe vistas** (01-title, 35-wipe, 69-chapters). They set a strong, warm tone. Use them
  as the colour and lighting target for in-game golden hour.
- **Per-era UI palettes** (green and parchment for the early eras, navy and gold for 1931, mint and cream for
  1955, slate blue for 2026). The concept is right. It needs better materials, not a new scheme.
- **History, intro and chapter cards** with sources (03b, 34, 36, 59). They have good hierarchy and tone. Only
  the source lines need a larger size.
- **Crop sprites** (15-ripe: radish and corn stages) read clearly.
- **Mobile layout:** full-width panels, large touch targets, clear A/B labels, the hotbar fits, and 150% text
  works (58, 58b).
- **Accessibility settings** (text size, reduced motion, high-contrast HUD, rebinding) and the vector fallback
  path.
