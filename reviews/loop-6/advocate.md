# Advocate: loop 6, tier T32

Capture paths are relative to `games/farm-sim/screenshots/review-loop-6/`. Throwaway zooms I made to check claims are in the session scratchpad `loop-6/` folder (prefixed `a-`). They are nearest-neighbour crops of the named captures, not new evidence.

Hard gates: `reviews/loop-6/GATES.md` records tests at 88/88 on both suites after the emoji fix, pixel integrity passing on all 26 captures, and performance inside budget. Critic B wrote that "the brief does not establish the all-tests-green ... gates". That was true of the critic brief, but GATES.md settles it. The loop is scoreable.

## Overall
Both critics are right about the biggest problem. The 1886 townswomen in side and back view are bonnet disks on purple sacks with no visible head, and they appear in six captures. The slouch hat also swallows Caleb in the walk strip. I concede both in full. Critic A, though, makes several claims that the captures plainly contradict: dusk with "lamps unlit", fog that "blanks the springs", a hoe swing where the body "never crouches", "no shoreline dressing", "one face on every heir" and a "smudge face" portrait. Those errors pull his lighting, animation and ui reasoning down. Critic B's scores are better calibrated, but his gap gains of +1.0 and +1.5 are overstated for fixes that overlap.

Critic means: pixel 6.25, characters 5.25, environment 6.5, lighting 6.0, animation 5.75, ui 6.75, readability 6.5, authenticity 6.75 (total 49.75).

---

## 1. pixel: critics 6.5 / 6.0, mean 6.25. Proposed **6.5**

- **Concede (A): terrain is built from coarser clusters than the sprites.** I measured it myself on `desktop/R03`. Grass colour changes fall almost entirely on x ≡ 0 (mod 4): 1792 of 1843 changes, with run lengths of 4, 8, 12 and 16 px. The player and the crop field change on every even x (mod 4 split 139/136 and 4705/4435). So grass is drawn at 2×2 art px and sprites at 1 art px. It is all on one grid, so nothing is resampled, but there are two cluster densities. This is real.
- **Concede (A, B): the night dither runs through sprite pixels.** In `crops/R05-player` the checker crosses Ray's hat, face and shirt (zoom `a-r05-street.png`).
- **Concede (A): the Blender-baked bonnets are a different family.** In `desktop/R04` they are soft, pillow-shaded disks with one dark seam, unlike the hand-clustered facades.
- **Rebut the cause (A): the "stray pale 1-art-px columns" below the skirt hems.** In `crops/R04-player` and `crops/R08-player` they come as a symmetric pair, attached under the hem at the leg positions. They are the feet or stockings drawn in a pale value, not loose noise. That is a colour choice on legs, not a cluster-discipline failure.
- **Rebut in part (B): "crowded highlights" in `crops/R03-field`.** The corn, wheat, potato, bean and cabbage sprites have clean dark outlines, two- to three-step leaf ramps and deliberate white ripe markers. The crowding is overlap between neighbouring tiles, which is a layout and readability problem, not pixel craft. `crops/R04-row` and `crops/R19-row` show hand-placed coursing, shingles, mosaic dome tiles and herringbone brick at a CAL-A level, as Critic A himself grants.
- **Why 6.5:** buildings, props, crops and animals (`crops/R15-pen`) meet the 7-anchor "clean clusters and ramps, one outline rule". The coarse terrain and the soft bonnets are the "small noisy spots", and they are large enough to hold the score below 7.

## 2. characters: critics 5.0 / 5.5, mean 5.25. Proposed **5.5**

- **Concede in full (A): side and back NPC views are broken.** `desktop/R04`, `desktop/R08`, `desktop/R10`, `desktop/R11` and `desktop/R15` all show cream bonnet disks wider than the body, with no head, face edge or shoulders. In `desktop/R06` the 1955 walkers are blue domes (zoom `a-r06-row.png`). This is the worst defect in the build.
- **Concede (A, B): hats.** In `crops/R03-player` and `crops/R15-player` Caleb's slouch hat reads as a flat cap with a visor line. In `crops/R05-player` Ray's fedora has no pinched crown. In `crops/R04-player` Nora's bonnet sits on top of the head as a dome and does not tunnel around the face. The loop's hat change is real (the brims no longer swallow the shoulders from the front), but the hat kinds still don't read.
- **Rebut (A, plainly wrong): "Every heir shares one face and body, recoloured."** Caleb has a full beard: the olive-grey cluster from chin to chest in `crops/R03-player` and `crops/R15-player` (zoom `a-r03-caleb.png`). Critic A's own fix G-face-template asks for beards, and one already exists. Among the neighbours, Walt has a white beard under his cap and Hattie has a different skin ramp and a white cap (`crops/R11-npcs`). The eye template is shared and no one has a mouth. That part stands.
- **Rebut (A): "Augustin from behind is a white blob."** In `crops/R11-npcs` the back view shows a tall white toque above a white jacket: that is a chef from behind. His portrait in `desktop/R11` (zoom `a-r11-portrait.png`) has a toque with a brown band, brows, eyes, a white moustache and beard, and dark trousers. He is identifiable.
- **Partly rebut (B): "the every-person checklist condition is not demonstrated."** True for the full cast. But the front views carry more than the 5-anchor's "few checklist features":
  - Hattie passes.
  - Walt mostly passes.
  - Josiah has his beard and olive shirt.
  - Margaux has her blue shirt and brown skirt.
  - Caleb has his beard and red shirt.

  That is all from `crops/R11-npcs`, `crops/R16-npcs` and `crops/R03-player`.
- **Good, uncontested:** the cows, goat and hens in `crops/R15-pen`, and the squint at hoe impact in `strips/R14` frame 4.
- **Why 5.5:** front views sit above 5, and side and back views sit below it. Critic B's 5.5 weighs both, while Critic A's 5.0 rests partly on the two factual errors above.

## 3. environment: critics 6.5 / 6.5, mean 6.5. Proposed **6.5**

- **Concede (A, B): open ground and water.** `desktop/R03` is mostly bare grass. `desktop/R17` has a large empty lower half. `desktop/R07` is about 75 % repeated wave lattice.
- **Concede (A): the farmyard layout repeats.** `desktop/R13` and `desktop/R17` place the house, crate, pump, path, fence and trough identically. The props do swap per era: log cabin to bungalow, woodpile to hay bales, wagon to Model A. Era dressing exists, but the composition is reused.
- **Rebut (A, B): `desktop/R02` as "mostly empty fill".** `desktop/R02` has a log cabin with a stone chimney and woodpile, a chopping-block woodpile, two barrels, a crate, a campfire ring, two rocks, three shrubs, pines and an oak. `mobile/R02` adds a scarecrow and more shrubs and rocks. It is lighter than Stardew, but it is dressed.
- **Rebut (A, plainly wrong): "no shoreline dressing" in `desktop/R07`.** The shore has a pebbled sand bank with a dark edge line, a boardwalk at top left, the dock, and a stone stair landing at right. Reeds, boats and birds are indeed missing.
- **Rebut the cause (A): the town block "identical from 1886 to 2026".** Bathhouse Row is one real street, and holding the street grid fixed across eras is the point of the setting. What changes is the buildings, paving and furniture:
  - cobbles with wall lanterns (`desktop/R04`);
  - brick with five-globe lamps (`desktop/R05`);
  - asphalt with a centre line, a hydrant and swan-neck lamps (`desktop/R06`);
  - herringbone brick with modern posts and planters (`desktop/R19`).

  Only the bench and barrel spots repeat.
- **Also missed:** `desktop/R16` (tent folds, patches, trade goods, cook tripod, campfire, creek) and `desktop/R15` (pen, stream, plank bridge, buggy) are dense.
- **Why 6.5:** the towns reach 7 to 7.5, but the farms and the lake are at 5.5 to 6. A mean of 6.5 holds.

## 4. lighting: critics 6.0 / 6.0, mean 6.0. Proposed **6.5**

- **Concede (A, B): the dither crosses sprites.** It runs over sprites and paving in `crops/R05-player` and `desktop/R05`. Lamps cast no shadows. People have no contact shadow in `crops/R03-player` and `crops/R17-player`, while props such as the wagon and Model A do (`desktop/R13`, `desktop/R17`).
- **Concede (A): the lake evening is flat.** `desktop/R07` at 18:20 has no warm low light, and only a broad darkening toward the bottom.
- **Rebut (A, plainly wrong): "Dusk ... with the lamps unlit" (`desktop/R06`).** In zoom `a-r06-row.png`, Quapaw's two porch lamps glow warm with halos, and the upper windows of Superior, Quapaw, Ozark and Hale are lit amber. The street lamp head is pale, with a faint warm patch on the asphalt under it. The scene has a violet-grey dusk grade that differs from the noon `desktop/R19`. Critic B saw this correctly ("a distinct dusk palette").
- **Rebut (A, plainly wrong): fog "blanks the springs on the right half" and "hides the spring props".** In `desktop/R08`, on the right half, the steaming tiled spring basin with its stair, two rising steam plumes, four stone spring-box covers, the well and the bench are all visible. The fog lowers contrast. It does not erase anything.
- **Missed evidence:** the 7-anchor asks for "era light sources ... weather moods; light kept on-grid". The captures show:
  - era sources: five-globe lamps, a neon CLUB sign and amber windows (`desktop/R05`, `mobile/R05`); porch lamps at dusk (`desktop/R06`); lit windows in the 1871 rain (`desktop/R09`);
  - four distinct weather moods: rain with streaks and a darkened grade (`desktop/R09`), snow (`desktop/R10`), fog with steam (`desktop/R08`), night (`desktop/R05`);
  - on-grid falloff through the 4×4 ordered dither (`a-r05-street.png`).

  What is missing is coherent cast shadows and a lit evening.
- **Why 6.5:** half a point above the mean, within the band. It credits the era sources and weather range both critics underweight, and still sits below 7 because of the sprite dither, R07 and the missing shadows.

## 5. animation: critics 5.5 / 6.0, mean 5.75. Proposed **6.0**

- **Concede (A): the side-view slouch hat hides the walk.** In `strips/R13` it covers the head and most of the torso, so the claimed 2/1/0 hip settle is mostly hidden. A lamp post stands in front of the legs in frames 1–6. That is the intended thin opaque occlusion, but it hurts the read.
- **Partly rebut (A): "no face shows ... the claimed hip settle can't be seen".** In my stacked crop of the hat region (`a-r13-top.png`), the hat crown sits at visibly different heights across the eight frames (lower in 1–2 than in 3–4), and a sliver of cheek shows under the brim's front edge. The settle is faint, not absent. Critic B reports "a visible rise-and-settle".
- **Rebut (A, plainly wrong): "The body column never leans, crouches or recovers" (`strips/R14`).** In frames 1–2 (zoom `a-r14-early.png`) the head is pulled down: the eyes sit noticeably lower than in frame 3 and the shoulders are hunched under the raised hoe. That is a wind-up compression. Frame 3 rises and frame 4 strikes with a squint. In frames 6–8 (zoom `a-r14-late.png`) the hoe steepens from the shallow strike diagonal toward upright, with the blade on the ground beside the body. That is a recovery.
- **Partly rebut (B): "the hoe stays diagonally across the right side through the late samples".** The angle does change, steepening through frames 6–8. Critic B is right that frames 6–8 differ only slightly.
- **Concede (A, B): the dust is weak.** The puffs are low-contrast tan blobs that stay inside the tile. Only frame 8 pushes one past the right edge, still at tile level. There is no hit-stop and no lean.
- **Why 6.0:** a distinct walk with a faint settle and a hoe with anticipation, strike, squint and recovery sit above the 5-anchor "2–3 frame swing with no anticipation". Missing secondary motion keeps it below 7. This matches Critic B.

## 6. ui: critics 6.5 / 7.0, mean 6.75. Proposed **7.0**

- **Concede (A): touch blemishes.** "Close Esc" shows on the phone (`mobile/R12`). The scythe's top touches the "5" so slot 5 reads "57" (`mobile/R02`, `mobile/R05`, `mobile/R12`). Panels are flat fills with a gold or cream double rule rather than material nine-slices (`desktop/R12`, `desktop/R18`).
- **Rebut (A): "The portrait is tiny with a smudge face".** `a-r11-portrait.png` from `desktop/R11` shows a clean framed sprite with toque, band, brows, eyes and beard. It is small, but it is not a smudge.
- **Rebut the cause (A): "A sun glyph shows at 21:30".** The `desktop/R05` glyph is the same "✳ Clear" weather mark as `desktop/R04` at 11:40. It is a clear-weather icon, not a time-of-day sun, and the rain (`desktop/R09`), snow (`desktop/R10`) and fog (`desktop/R08`) captures each get their own glyph. A moon variant would be nicer, but this is not a wrong-state bug.
- **Concede (A): name tags crowd.** In `desktop/R16` the JOSIAH, TRADE and MARGAUX tags abut in one row.
- **Missed evidence:** the panels are era-distinct, which is the 7-anchor's "per era":
  - green (`desktop/R02`), cream (`desktop/R04`, `desktop/R11`), navy and gold (`desktop/R05`, `desktop/R12`), cream with teal buttons (`desktop/R18`), blue (`desktop/R19`);
  - the 5×7 face is integer-crisp on phone (`mobile/R11`, `mobile/R12`);
  - the new HUD book, satchel and bars icons are pixel art on both viewports;
  - the hierarchy (title, subtitle, body, request tag, button) is clear in `mobile/R11`.
- **Why 7.0:** the anchor is met across several chapters. The remaining issues are polish.

## 7. readability: critics 6.5 / 6.5, mean 6.5. Proposed **6.5**

- **Concede (A, B): depth-order faults.**
  - The lantern sits over Nora's face (`crops/R08-player`).
  - The trough, which stands north of the player on the fence line, is drawn over the top of Caleb's hat (`crops/R15-player`). That is a sort error.
  - The tilled tile hides the feet and hem in frames 4–8 (`a-r14-late.png`).
  - The bonnet-disk NPCs don't read as people (`desktop/R04`).
  - Mature crops overlap cell edges (`crops/R03-field`).
- **Rebut (A): "Fog hides the spring props".** See lighting: the props are visible in `desktop/R08`.
- **Good:**
  - The player pops on every desktop frame.
  - 1931 night is navigable on the phone, with lamps, signs and the player clear (`mobile/R05`).
  - Phone dialogue text is large and wrapped (`mobile/R11`).
  - Ripe markers are visible (`crops/R03-field`).
- **Why 6.5:** the mean holds.

## 8. authenticity: critics 7.0 / 6.5, mean 6.75. Proposed **7.0**

- **Concede (A, B): clothing lags architecture.** The hats misread (`crops/R03-player`, `crops/R05-player`), and Josiah has no fur-cap tail (`crops/R16-npcs`).
- **Rebut the cause (A): "The 1955 Row is the 1931 facades with new signs."** That is what the real Row looked like: the 1920s bathhouses stood unchanged through mid-century. The 1955 era is carried by the motor hotel, the drive-in with its boomerang roof, the asphalt with a painted centre line, the hydrant and swan-neck street lamps (`desktop/R06`, `desktop/R18`). Reusing the facades is fidelity, not laziness.
- **On A's "1871 bathhouses already two-storey porched Victorians" (`desktop/R09`):** the 1871 buildings are unpainted board-and-batten and clapboard frame structures with plain galleries. They are not the ornate painted Second Empire of `desktop/R04`, and the sequence 1871 → 1886 reads as an upgrade. Whether any 1871 frame bathhouse had a second storey is a research question. The captures can't settle it, so I don't count it against the score either way.
- **Why 7.0:** all six eras sort blind on architecture, vehicles and lamps, across `desktop/R16`, `desktop/R09`, `desktop/R04`, `desktop/R05` with `desktop/R17`, `desktop/R06` and `desktop/R19`. That is the 7-anchor "each era recognisable and grounded". Clothing holds it at 7 rather than above.

---

## Facts each critic got plainly wrong
**Critic A**
1. "One face ... on every heir". Caleb has a full beard (`crops/R03-player`, `crops/R15-player`).
2. "Augustin from behind is a white blob". The toque and chef's whites read from behind (`crops/R11-npcs`), and the portrait is detailed (`desktop/R11`).
3. "The body column never leans, crouches or recovers". There is a wind-up compression in frames 1–2 and the hoe steepens upright in frames 6–8 (`strips/R14`).
4. "Dusk ... lamps unlit". The porch lamps and windows are lit (`desktop/R06`).
5. "Fog ... blanks the springs" and "Fog hides the spring props". The basin, steam, spring boxes, well and bench are visible (`desktop/R08`).
6. "No shoreline dressing". There is a pebble bank, a boardwalk and a stone stair (`desktop/R07`).
7. "Portrait ... smudge face". The face has brows, eyes and a beard (`desktop/R11`).

**Critic B**
1. "The brief does not establish the all-tests-green ... gates". `GATES.md` records 88/88 on both suites and pixel integrity passing on all 26 captures.
2. "The hoe stays diagonally across the right side through the late samples". The angle steepens through frames 6–8 (`strips/R14`), though the change is small.

## Gaps: adjusted severity and gain
No new gaps. The critics' gaps overlap heavily: A's G-npc-side-back-views, G-hat-silhouettes and G-face-template together cover most of B's G-character-construction, and A's G-ground-cluster-scale is the concrete version of B's G-texture-discipline. Gains in overlapping gaps should not be added together.

| Gap | Critic | Original sev / gain | Adjusted sev / gain | Reason |
|---|---|---|---|---|
| G-npc-side-back-views | A | 5 / 1.0 | 5 / 1.0 | Fully confirmed in six captures |
| G-hat-silhouettes | A | 4 / 0.5 | 4 / 0.5 | Confirmed; it also hides the walk |
| G-face-template | A | 3 / 0.5 | 2 / 0.3 | Beards, skin ramps and the chef portrait already vary faces; only the mouth and brows are missing |
| G-ground-cluster-scale | A | 3 / 0.5 | 3 / 0.5 | Measured and confirmed (grass on a 4-px period) |
| G-sparse-farm-lake | A | 3 / 0.5 | 3 / 0.5 | R03, R07 and R17 confirmed; the "town layout repeats by era" part is historically grounded, so drop it |
| G-dither-over-sprites | A | 3 / 0.5 | 3 / 0.5 | Confirmed |
| G-dusk-evening-flat | A | 3 / 0.5 | 2 / 0.3 | R06 dusk has lit lamps and windows; only R07 is truly flat |
| G-depth-sort | A | 3 / 0.5 | 3 / 0.5 | Confirmed: trough over hat, tile over hem, lantern over face |
| G-hoe-body-motion | A | 3 / 0.5 | 2 / 0.3 | Wind-up compression, squint and recovery exist; lean, hit-stop and visible dust are missing |
| G-walk-visibility | A | 3 / 0.5 | 3 / 0.5 | Confirmed; same root as G-hat-silhouettes |
| G-ui-panel-material | A | 2 / 0.5 | 2 / 0.4 | Esc hint and "57" confirmed; the portrait and sun-glyph parts are overstated |
| G-label-overlap | A | 2 / 0.5 | 2 / 0.3 | Confirmed in R16; R11 tags only touch |
| G-actor-shadows | A | 2 / 0.3 | 2 / 0.3 | Confirmed |
| G-character-construction | B | 5 / 1.5 | 5 / 1.0 | The defect is mostly side and back proportions; front views already meet part of the checklist. Overlaps A's three character gaps |
| G-texture-discipline | B | 4 / 1.0 | 3 / 0.5 | Buildings and crops already have clean material clusters; the real issue is terrain scale |
| G-scene-composition | B | 4 / 1.0 | 3 / 0.5 | R02, R15 and R16 are dressed; R03, R07 and R17 are the sparse ones |
| G-night-materials | B | 4 / 1.0 | 3 / 0.5 | Dither over sprites confirmed; dark facades outside the pools are a night choice, and the signs and windows still read on the phone |
| G-action-separation | B | 3 / 1.0 | 3 / 0.5 | Recovery exists but is subtle; the dust value is the main issue |
| G-gameplay-contrast | B | 3 / 0.5 | 2 / 0.3 | Crop overlap confirmed; the player pops in `mobile/R04` and on every desktop frame |
| G-historical-signatures | B | 3 / 0.5 | 3 / 0.5 | Confirmed (Josiah's cap, Margaux's bundle) |
| G-era-ui-material | B | 2 / 0.5 | 2 / 0.5 | Confirmed |

Proposed total: 6.5 + 5.5 + 6.5 + 6.5 + 6.0 + 7.0 + 6.5 + 7.0 = **51.5 / 80**. The critic mean is 49.75. Below gate: pixel, characters, environment, lighting, animation and readability. Characters is still furthest off, and its fix is G-npc-side-back-views.

```json
{
  "loop": 6,
  "role": "advocate",
  "tier": "T32",
  "scores": {
    "pixel": {"score": 6.5, "confidence": 0.7, "evidence": [
      {"shot": "crops/R04-row", "note": "hand-placed coursing, shingles, ramps; CAL-A on buildings"},
      {"shot": "crops/R19-row", "note": "mosaic dome, tile roofs, herringbone clean"},
      {"shot": "crops/R03-field", "note": "crop sprites cleanly outlined and ramped; crowding is tile overlap, not craft"},
      {"shot": "desktop/R03", "note": "measured: grass changes on a 4-px period (2x2 art px) vs 2-px on sprites; confirmed coarse terrain"},
      {"shot": "crops/R05-player", "note": "night dither crosses sprite pixels (conceded)"},
      {"shot": "crops/R04-player", "note": "pale columns under hem are paired legs/feet, not stray noise"}
    ]},
    "characters": {"score": 5.5, "confidence": 0.6, "evidence": [
      {"shot": "crops/R04-player", "note": "Nora beside reference: bonnet sits as dome, no face tunnel (conceded)"},
      {"shot": "crops/R03-player", "note": "Caleb has a full beard: A's 'one face on every heir' is wrong; slouch reads as flat cap (conceded)"},
      {"shot": "crops/R11-npcs", "note": "Hattie passes, Walt bearded with cap, Augustin back view shows toque and whites"},
      {"shot": "desktop/R11", "note": "Augustin portrait: toque, brows, eyes, white beard; identifiable"},
      {"shot": "desktop/R04", "note": "side/back townswomen are bonnet disks with no head (conceded, worst defect)"},
      {"shot": "desktop/R06", "note": "1955 walkers blue dome heads (conceded)"},
      {"shot": "crops/R15-pen", "note": "animals articulate and good"}
    ]},
    "environment": {"score": 6.5, "confidence": 0.7, "evidence": [
      {"shot": "desktop/R02", "note": "cabin, woodpiles, barrels, crate, campfire, rocks, shrubs; not 'mostly empty'"},
      {"shot": "desktop/R16", "note": "dense trade camp: tent folds, goods, tripod, fire, creek"},
      {"shot": "desktop/R07", "note": "repeated water lattice dominates (conceded) but pebble shore, boardwalk, stair exist"},
      {"shot": "desktop/R03", "note": "mostly bare grass (conceded)"},
      {"shot": "desktop/R17", "note": "era props swap but yard layout identical to desktop/R13 (conceded)"},
      {"shot": "desktop/R06", "note": "street fixed by history; paving and furniture change per era"}
    ]},
    "lighting": {"score": 6.5, "confidence": 0.55, "evidence": [
      {"shot": "desktop/R05", "note": "five-globe lamps, neon, windows; on-grid ordered-dither falloff; dither over sprites and no lamp shadows (conceded)"},
      {"shot": "desktop/R06", "note": "dusk grade with lit porch lamps and amber windows; A's 'lamps unlit' wrong"},
      {"shot": "desktop/R08", "note": "fog lowers contrast but spring basin, steam, spring boxes visible"},
      {"shot": "desktop/R09", "note": "rain mood with lit windows, no puddles"},
      {"shot": "desktop/R10", "note": "distinct snow mood"},
      {"shot": "desktop/R07", "note": "18:20 evening flat, no warm low light (conceded)"}
    ]},
    "animation": {"score": 6.0, "confidence": 0.6, "evidence": [
      {"shot": "strips/R14", "note": "wind-up compression frames 1-2, strike + squint 4, hoe steepens upright 6-8; dust weak, no lean/hit-stop"},
      {"shot": "strips/R13", "note": "distinct stride poses; faint crown height change; hat hides torso and settle (conceded)"},
      {"shot": "strips/R13-mobile", "note": "same cycle at phone scale"}
    ]},
    "ui": {"score": 7.0, "confidence": 0.65, "evidence": [
      {"shot": "desktop/R11", "note": "clear hierarchy, crisp 5x7 face, readable portrait"},
      {"shot": "mobile/R11", "note": "phone dialogue crisp, wrapped, large"},
      {"shot": "desktop/R12", "note": "navy/gold 1931 panel; flat fill (conceded)"},
      {"shot": "desktop/R18", "note": "1955 cream/teal shop; era-distinct, clear rows"},
      {"shot": "mobile/R12", "note": "6-column reflow; 'Close Esc' on touch and '57' slot collision (conceded)"},
      {"shot": "desktop/R19", "note": "2026 blue HUD; per-era palette"}
    ]},
    "readability": {"score": 6.5, "confidence": 0.65, "evidence": [
      {"shot": "mobile/R05", "note": "night navigable on phone, player and lamps clear"},
      {"shot": "mobile/R11", "note": "phone text sizes good"},
      {"shot": "crops/R15-player", "note": "trough drawn over hat: sort error (conceded)"},
      {"shot": "crops/R08-player", "note": "lantern over face (conceded)"},
      {"shot": "crops/R03-field", "note": "ripe markers read; mature crops overlap cells"},
      {"shot": "desktop/R04", "note": "bonnet-disk NPCs don't read as people (conceded)"}
    ]},
    "authenticity": {"score": 7.0, "confidence": 0.6, "evidence": [
      {"shot": "desktop/R16", "note": "1807 trade camp and cabin"},
      {"shot": "desktop/R09", "note": "1871 unpainted frame bathhouses, stage, drugs"},
      {"shot": "desktop/R04", "note": "1886 painted Second Empire Row and hotel"},
      {"shot": "desktop/R05", "note": "1931 named Row houses, five-globe lamps, neon club"},
      {"shot": "desktop/R06", "note": "1955 continuity of real Row plus motor hotel, drive-in, asphalt, hydrant"},
      {"shot": "desktop/R19", "note": "2026 brewery, cultural centre, market, solar"},
      {"shot": "crops/R16-npcs", "note": "clothing lags: Josiah lacks fur cap (conceded)"}
    ]}
  },
  "gaps": [
    {"id": "G-npc-side-back-views", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["desktop/R04", "desktop/R06", "desktop/R08", "desktop/R10", "desktop/R19"], "benchmark": "chained-5.jpg", "fix": "Rebuild side/back NPC views with the front view's head:body ratio and shoulder line; clamp hats to <=1.2x head width; re-bake bonnets/helmets per facing so head and face edge show."},
    {"id": "G-hat-silhouettes", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/R03-player", "crops/R05-player", "crops/R04-player", "strips/R13"], "benchmark": "stardew-1.jpg", "fix": "Hand-pixel per-facing hat silhouettes: slouch wide thin brim breaking the head outline, fedora pinched crown + band, deep bonnet tunnel around face."},
    {"id": "G-face-template", "category": "characters", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS2", "evidence": ["crops/R06-player", "crops/R16-npcs", "crops/R03-player"], "benchmark": "seastars-2.jpg", "fix": "Add mouth pixel and brows; extend existing accents (Caleb's and Walt's beards) to the rest of the cast (glasses, June's ponytail)."},
    {"id": "G-ground-cluster-scale", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R07", "desktop/R15"], "benchmark": "stardew-1.jpg", "fix": "Redraw grass, ground and water at 1 art px with fewer deliberate clumps and 2-3 tones to match sprite density."},
    {"id": "G-sparse-farm-lake", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R07", "desktop/R17"], "benchmark": "stardew-1.jpg", "fix": "Dress empty fields and lake (stumps, tall grass, reeds, boats, birds) and vary farmyard layout by era; keep the historical street grid."},
    {"id": "G-dither-over-sprites", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["crops/R05-player", "desktop/R05"], "benchmark": "seastars-2.jpg", "fix": "Light sprites with palette-ramp steps and a 1-px warm rim instead of the dither checker; keep dither for ground and walls."},
    {"id": "G-dusk-evening-flat", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["desktop/R07", "desktop/R06"], "benchmark": "seastars-2.jpg", "fix": "Warm banded low-sun tint and long shadows at evening (R07); brighten street-lamp pools at dusk (R06 windows and porch lamps already lit)."},
    {"id": "G-depth-sort", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["strips/R14", "crops/R15-player", "crops/R08-player"], "fix": "Sort by foot Y, draw ground decals under actors, give thin occluders over the face the silhouette treatment."},
    {"id": "G-hoe-body-motion", "category": "animation", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14"], "fix": "Keep the existing wind-up compression and squint; add a forward lean at the strike, a 2-frame hit-stop, and dust rising above the tile in a lighter value."},
    {"id": "G-walk-visibility", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["strips/R13", "strips/R13-mobile"], "fix": "Shrink side-view hat so torso settle and arm swing show; add 1-px hat bob and hem/coat swing."},
    {"id": "G-ui-panel-material", "category": "ui", "expectedGain": 0.4, "severity": 2, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R12", "desktop/R18", "mobile/R12", "mobile/R02"], "benchmark": "stardew-5.jpg", "fix": "Per-era nine-slice frames, hide key hints on touch, inset slot numbers; optional moon variant of the clear-weather glyph at night."},
    {"id": "G-label-overlap", "category": "readability", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["desktop/R16"], "fix": "Stack/offset NPC name tags or show only the nearest one."},
    {"id": "G-actor-shadows", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["crops/R03-player", "crops/R17-player"], "fix": "Give people the same contact-shadow ellipse props have."},
    {"id": "G-character-construction", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "L", "workstream": "WS2", "evidence": ["crops/R04-player", "crops/R11-npcs", "crops/R16-npcs"], "benchmark": "chained-5.jpg", "fix": "Redraw named people with distinct anatomy, posture and garment construction, starting with side/back proportions; validate all five checklist features. Overlaps G-npc-side-back-views."},
    {"id": "G-texture-discipline", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS1", "evidence": ["desktop/R03", "crops/R03-field", "crops/R19-player"], "benchmark": "stardew-1.jpg", "fix": "Bring terrain to sprite cluster scale and lower background microcontrast; building and crop clusters already conform. Overlaps G-ground-cluster-scale."},
    {"id": "G-scene-composition", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R07", "desktop/R17"], "benchmark": "chained-5.jpg", "fix": "Compose purposeful work areas, worn routes, vegetation groups and varied shoreline detail; articulate dock materials and supports."},
    {"id": "G-night-materials", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R05", "crops/R05-player", "mobile/R05"], "benchmark": "seastars-2.jpg", "fix": "Reduce dither extent and contrast on sprites, retain unlit material ramps, add source-directed highlights and shadows. Overlaps G-dither-over-sprites."},
    {"id": "G-action-separation", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "strips/R13"], "benchmark": "Rubric animation 7", "fix": "Make the existing upright recovery more distinct from the strike, separate dust from soil by value, add delayed hat and garment motion."},
    {"id": "G-gameplay-contrast", "category": "readability", "expectedGain": 0.3, "severity": 2, "effort": "M", "workstream": "WS3", "evidence": ["crops/R03-field", "mobile/R04"], "benchmark": "stardew-1.jpg", "fix": "Keep mature plants inside their cells and preserve visible soil boundaries; lower decorative-ground contrast near gameplay."},
    {"id": "G-historical-signatures", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["crops/R16-npcs", "crops/R11-npcs"], "benchmark": "chained-5.jpg for setting coherence; characters.md for period requirements", "fix": "Add checklist-supported headwear, garment and occupational signatures, including Josiah's cap flap and Margaux's trade bundle."},
    {"id": "G-era-ui-material", "category": "ui", "expectedGain": 0.5, "severity": 2, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R12", "desktop/R18", "mobile/R11"], "benchmark": "stardew-5.jpg; seastars-4.jpg", "fix": "Add restrained era-specific frame materials, corners and button treatments while preserving crisp type and mobile layout."}
  ],
  "verdict": "continue"
}
```
