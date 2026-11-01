# Pixel rubric anchors: calibration images and score descriptors

This file is for the pixel campaign's critics and judge (plan Phase 0). It gives each of the 8 rubric categories word anchors at scores 3, 5, 7 and 9. It also pegs three **pixel-art** calibration images to those anchors, so scoring drift can be checked: the judge scores one calibration image every 3rd loop, and a gap of more than 1 point from the pegs below means the judge is drifting.

Why the anchors are pixel art: in the football campaign, photoreal-leaning anchors marked stylized art down. Every image cited here is pixel art from a shipped game. All benchmark files live in `benchmarks/`, are git-ignored and review-only, and their sources are in `benchmarks/SOURCES.md`.

Compiled 2026-11-01. "Measured" means taken from the store capture with the method in `benchmarks/SOURCES.md` (pixel pitch) or by counting art pixels in a nearest-neighbour crop (±2 art px). Pegs are judgement calls written before any loop ran. They are the agreed reference, not a claim about the games' quality.

---

## 1. The three calibration images

| ID | File | What it is | Art grid (measured) | Why it was chosen |
|---|---|---|---|---|
| **CAL-A** | `benchmarks/stardew-1.jpg` | Stardew Valley: farm by day, with farmhouse, coop, barn, crops, animals and farmer | 4× pitch → 480×270 art px; farmer ≈ 28 art px tall with hat, head ≈ 11–12 px (≈ 2.4 heads) | The genre's reference point. Plain 16 px tile grid, dark outlines, flat daylight, almost no dynamic lighting. It is the "competent, shipped, beloved" middle of the scale |
| **CAL-B** | `benchmarks/chained-5.jpg` | Chained Echoes: market square by day, with striped awnings, stalls, crates, NPCs, an ox and a puddle reflection | 2× pitch in a 1278×719 capture → 640×360 art px; lead characters ≈ 44–46 art px tall | A 16-bit-faithful JRPG town. Disciplined palette, hue-shifted ramps, sel-out-style coloured outlines, cast shadows. It is also the closest match to our Central Avenue awnings and market (1886, 2026) |
| **CAL-C** | `benchmarks/seastars-2.jpg` | Sea of Stars: village clearing at night, with about 14 characters, lanterns, glowing crystals, a tent interior and cast shadows | 3× pitch → 640×360 art px (letterboxed in-game); adults ≈ 48–53 art px tall, head ≈ 20 px (≈ 2.4–2.6 heads) | The ceiling for lighting and atmosphere on pixel art: real-time coloured point lights and shadows while the sprite grid stays crisp. It shows what "9" looks like for lighting without drifting into painted or photoreal |

**Supplementary floor reference (not pegged in every category):** `benchmarks/snes-harvestmoon-1.png` is native 256×223 Harvest Moon (1996). It is an honest 16-bit floor: authentic to the hardware, readable, sparse. Use it to stop critics from treating "SNES-authentic" as automatically low or automatically high.

### Pegged reference scores

| Category | CAL-A Stardew farm | CAL-B Chained Echoes market | CAL-C Sea of Stars night |
|---|---|---|---|
| 1 Pixel craft | 7.5 | 8.5 | 9 |
| 2 Characters | 6.5 | 8 | 9 |
| 3 Environment | 8 | 8.5 | 8.5 |
| 4 Lighting & atmosphere | 5.5 | 7 | 9.5 |
| 5 Animation & feel | n/a (still image; see §3.5) | n/a | n/a |
| 6 UI & typography | n/a (no UI in frame) | n/a | n/a |
| 7 Readability & mobile | 8.5 | 7.5 | 7 |
| 8 Era / setting authenticity | 7 (setting coherence only) | 7.5 | 7 |

Use for UI pegs: `stardew-5.jpg` (dialogue portrait box) = 7.5; `chained-3.jpg` (battle menu) = 8; `seastars-4.jpg` (equipment menu) = 8.5; `snes-chronotrigger-1.png` (window frames, resampled file) = 7, the period-authentic reference.

For readability, view every image downscaled so its art grid sits at **1 art px = 1 CSS px on a 390-CSS-px-wide phone** (390 / 480 = 0.81 of CAL-A's frame, 390 / 640 = 0.61 of CAL-B and CAL-C), not at desktop size.

---

## 2. How to use the anchors

1. Read the 3 / 5 / 7 / 9 descriptors for the category. Find the two the capture falls between. Score in 0.5 steps.
2. Cite evidence: a shot ID and, for pixel craft, a zoomed crop. A score above 7 must name the anchor it beats, for example "lighting ≥ CAL-B: coloured lamp pools with cast shadows, still below CAL-C because there are no rim lights".
3. Hard limits are not scored here. Grid integrity is a hard gate checked by script (plan Phase 0). The rubric scores craft, not whether the grid is legal.
4. A score of 9 or above needs a side-by-side with the pegged calibration image in the same category.

---

## 3. Category anchors

### 3.1 Pixel craft
Grid integrity, palette discipline, clusters, outlines, no anti-aliasing blur.

| Score | What it looks like |
|---|---|
| **3** | Mixed pixel sizes ("mixels") or blurred, resampled art. Banding and pillow shading. Orphan single pixels as noise. Colours look picked per asset, so the scene has no shared palette. Generator output that was only downsized |
| **5** | One grid, but clusters are noisy, especially in foliage and ground. Outlines are inconsistent between assets: some black, some none, some 2 px. Ramps are mostly straight value steps without hue shift. Several near-duplicate colours |
| **7** | Clean clusters and readable shapes. One outline rule applied everywhere. Ramps hue-shift (warm lights, cool shadows). The palette is shared across assets. Dithering is used only where it reads as texture. **CAL-A sits here (7.5):** clean but simple ramps and heavy dark outlines |
| **9** | Every cluster is intentional. Sel-out or coloured outlines that bend with the light. Texture that reads at 1× without noise. No stray pixels at 4× zoom. Material is shown in very few colours (wood, brick, cloth, water each clearly different). **CAL-C (9):** cobbled ground, foliage and rock read at 1× with minimal noise. **CAL-B (8.5):** awning stripes and stones are very clean, ground slightly busy |

### 3.2 Characters
Match to the reference checklist (`research/refs/characters.md`), silhouette, detail at the chosen tier.

| Score | What it looks like |
|---|---|
| **3** | Characters are interchangeable blobs that differ only by tint. Headwear and garment don't match the checklist. Faces are smears. Proportions drift between people |
| **5** | Checklist items are present but generic: a "hat" rather than *this* hat. Silhouettes only separate with colour. 1–2 checklist misses per person |
| **7** | Each named person is recognisable in silhouette alone, in grayscale at 1×. Headwear, garment and signature prop match the checklist. Consistent head:body ratio across the cast. **CAL-A (6.5):** charming and readable, but the farmer is tiny (≈ 28 px) and townsfolk rely on colour and hair more than garment |
| **9** | Distinct body types, ages and postures. Garment construction is readable (bustle, sack coat, apron, overalls). Faces carry expression at the tier's size. Every checklist feature passes. **CAL-C (9):** about 14 characters in frame, all distinct in silhouette, age and costume. **CAL-B (8):** clear silhouettes, less body-type variety |

### 3.3 Environment
Terrain, buildings, props, crops, animals.

| Score | What it looks like |
|---|---|
| **3** | Tiles repeat visibly. Buildings are flat boxes. Props float, with no contact shadow or base. Crops are icons pasted on soil |
| **5** | Varied tiles, but obvious seams and grid-locked edges. Buildings have generic doors and windows. Few props. Animals stiff |
| **7** | Ground transitions blend (paths, grass, soil). Buildings show construction: siding, shingles, brick coursing, trim. Prop density tells a story (barrels, crates, fences). Crops show growth stages. **CAL-A (8):** board-and-batten siding, shingle courses, fence variety, crop rows and animals; tile repetition visible in grass |
| **9** | Dense, layered scenes that stay readable. Every surface has material and wear. Props and buildings sit in the ground with contact shadows. Set dressing carries history (era-specific detail). **CAL-B (8.5):** awnings, wares, rugs, puddle, ox. **CAL-C (8.5):** rock formations, tent interior, mixed flora |

### 3.4 Lighting and atmosphere

| Score | What it looks like |
|---|---|
| **3** | One global multiply tint for night, so everything goes murky. Lamps don't light anything. No weather or time-of-day feel |
| **5** | Day/night tint plus soft radial light blobs that ignore the pixel grid (smooth gradients over crisp sprites), or no cast shadows. Moody but flat. **CAL-A by day ≈ 5.5:** flat daylight, no shadows on sprites |
| **7** | Lights respect the grid (banded or dithered), have colour temperature, and light the ground and nearby sprites. Contact or cast shadows are consistent with one sun direction. Weather and steam read as atmosphere, not noise. **CAL-B (7):** consistent soft cast shadows, puddle reflection, daylight warmth |
| **9** | Several coloured light sources mix. Sprites take rim or bounce light. Night stays readable while keeping its mood, and the light tells you where to go. **CAL-C (9.5):** warm lantern versus cool crystal light, crisp sprites, cast shadows from multiple sources |

### 3.5 Animation and feel
Must cite motion strips (plan Phase 4 step 2). The calibration images are stills, so there is no peg. These anchors come from frame counts in `research/pixel-tradeoffs.md`.

| Score | What it looks like |
|---|---|
| **3** | Sliding sprites. A 2-frame walk or none. Tools have no swing. Camera jitter or sub-pixel shimmer: sprites wobble against the tiles |
| **5** | A 4-frame walk in 4 directions (SNES baseline). Tools have a 2–3 frame swing with no anticipation. The camera follows smoothly but sprites and tiles snap at different times |
| **7** | A 6-frame walk (Stardew-level). Tool actions with wind-up, impact and settle. Crops and grass react. Idle breathing on key NPCs. Pixel-locked camera with no shimmer |
| **9** | An 8-frame walk or more with secondary motion (coat tails, bustle, hat bob). Unique idles and gestures for named people. Hit-stop and squash on tools. Ambient life: steam, water, birds, flags. All of it on the grid |

### 3.6 UI and typography

| Score | What it looks like |
|---|---|
| **3** | Browser-default or anti-aliased fonts beside pixel art. Mixed font sizes not on integer scales. Panels are plain CSS boxes |
| **5** | A pixel font, but scaled to non-integer sizes or blurred. Frames are generic. Icons are mixed styles |
| **7** | A pixel font drawn at integer scale. Nine-slice frames in one material. Icons on the same grid and palette as the world. Clear focus and selection states. **`stardew-5.jpg` (7.5):** wooden frame, bitmap font, portrait box |
| **9** | Per-era UI material and font (hide → plank → brass → chrome → LED, per plan Phase 3). Fully legible at phone size. Animated transitions on the grid. **`seastars-4.jpg` (8.5):** crisp, legible, consistent with the world |

### 3.7 Readability and mobile
View on a 390-CSS-px-wide phone at the game's real scale (see §1).

| Score | What it looks like |
|---|---|
| **3** | Player lost in the scene. Interactables look like decoration. Text under 8 CSS px. Touch targets under 30 CSS px |
| **5** | The player is findable, but crops, ripeness and NPCs need squinting. Night or fog hides gameplay objects |
| **7** | Player, NPCs, ripe crops and interactables each pop by value contrast. Night stays playable. Text ≥ 10 CSS px |
| **9** | Readable at a glance on a phone in sunlight. Clear foreground and background value separation, and the gameplay layer stays legible under any weather or light. **CAL-A (8.5):** bright values with strong outlines; the farmer is small. **CAL-B (7.5):** busy ground competes with characters. **CAL-C (7):** night purple lowers contrast at phone size |

### 3.8 Era authenticity and distinctness
Gate is 6. For calibration images this measures **setting coherence** only, because they are not Hot Springs. For our captures it means: does the frame match `research/visual-eras.md` and the refs packs (`research/refs/`), and can a blind viewer tell the six eras apart?

| Score | What it looks like |
|---|---|
| **3** | Eras differ only by palette tint. Anachronisms (1807 brick storefronts, 2026 gas lamps). Clothing generic across eras |
| **5** | Era signatures are present but thin: one or two landmark buildings carry the change. Clothing matches the era table in `visual-eras.md` §7 loosely. Some palette bleed between eras |
| **7** | A blind viewer sorts 6 shots into the right order. Buildings follow the town-by-chapter table (board-and-batten and false fronts in 1871; brick, pressed-metal cornices and awnings in 1886; the Row and Deco in 1931; motor courts in 1955; restored Row in 2026). Clothing passes `refs/characters.md`. **Calibration images (7–7.5):** a consistent invented setting with no internal anachronisms |
| **9** | Period detail you'd only know from the references: street lights by date (gas 1897, five-globe clusters 1929), bathhouse materials per building, correct hats and garments per person. The era palette (visual-eras.md §8) is held across terrain, buildings, UI and lighting. Nothing anachronistic |

---

## 4. Known biases to watch

- **Night-image bias:** CAL-C is a night image. Critics tend to over-reward moody darkness. Score lighting at 9 only if gameplay objects stay readable (category 7).
- **Resolution bias:** a larger art grid (CAL-B and CAL-C at 640×360) can look "more detailed" than CAL-A (480×270) for the same craft. Score craft per art pixel, not total detail.
- **Recognition bias:** Stardew is familiar and the critic may over-score it. Its pegs are deliberately mid-range in lighting and characters.
- **Fidelity drift:** if a capture starts using smooth gradients or high-res overlays (Eastward-style smooth light, `eastward-3.jpg`), score it under lighting, but pixel craft may not exceed 7 while non-grid gradients cover sprites.
