# Judge ruling: loop 6, tier T32

Capture paths are relative to `games/farm-sim/screenshots/review-loop-6/`. I opened every capture cited below myself. My one throwaway zoom is `j-r14-1to4.png`, a nearest-neighbour crop of frames 1–4 of `strips/R14`, saved in the session scratchpad `loop-6/`.

## Hard gates
`reviews/loop-6/GATES.md` covers the gates:
- **Tests:** 88/88 on both suites after the HUD-emoji contrast fix. A recapture of R04 differed by at most 0.06/255, so the review captures stand.
- **Pixel integrity:** passes on all 26 captures (`shots.json`: maxBad 0.004).
- **Performance:** inside budget. The worst 4× phone median p95 is 17.8 ms (`perf.json`).

Critic B's "gates not established" point came from the critic brief only. GATES.md settles it, and the loop is scoreable.

## Spread and disputed facts
No category has critics more than 1.0 apart. The widest spread is 0.5, in pixel, characters, animation, ui and authenticity. The advocate disputes nine facts, so I checked each one.

| Claim | Who was right | What I saw |
|---|---|---|
| "Every heir shares one face" (A) | Advocate | Caleb has a full olive-grey beard from chin to chest (`crops/R03-player`, `crops/R15-player`). Walt has a white beard (`crops/R11-npcs`). The eyes are shared and nobody has a mouth, so that part stands. |
| "Dusk … lamps unlit" (A) | Split | Upper windows on Superior, Quapaw, Ozark and Hale glow amber, and Quapaw's porch lamps are lit. The swan-neck street lamps are pale and unlit, with only a faint pool (`desktop/R06`). The dusk grade is subtle. |
| "Fog blanks the springs" (A) | Advocate | In `desktop/R08` the tiled basin with steam, four spring boxes, the well and the bench are all visible on the right half. The fog lowers contrast but erases nothing. |
| "No shoreline dressing" (A) | Advocate | `desktop/R07` has a pebbled bank with an edge line, a boardwalk at top left and a stone stair at top right. Reeds, boats and birds are missing. |
| "Body never crouches or recovers" in the hoe swing (A) | Advocate, in part | In `j-r14-1to4.png` (frames 1–2 of `strips/R14`) the eyes sit low in the head and the shoulders hunch under the raised hoe, then rise in frame 3. That is real anticipation. The recovery in frames 6–8 steepens only slightly. |
| "Hoe stays diagonal in late frames" (B) | Mostly B | Frames 5–8 of `strips/R14` are near-identical. The steepening is a few degrees. |
| "Sun glyph at 21:30" (A) | Advocate | It is the same "✳ Clear" weather mark as at 11:40 (`desktop/R05` vs `desktop/R04`). It is not a time-of-day error. |
| "Stray pale columns under the hem" (A) | Advocate on the cause | `crops/R04-player`: the columns are a symmetric pair at the leg positions, so they are stockings/feet in a pale value. They still read as detached slivers, which is a minor issue. |
| "Augustin from behind is a white blob" (A) | Neither fully | In `crops/R11-npcs` a toque over whites is just readable but very small. The portrait in `desktop/R11` is clean. |

**Confirmed by my own look (all three reviewers agree):**
- Side and back NPC views are broken. 1886 townswomen are cream bonnet disks wider than the body, with no head or shoulders (`desktop/R04`, `desktop/R08`). 1955 walkers are blue domes (`desktop/R06`), and 2026 walkers are big-headed with no shoulders (`desktop/R19`).
- The side-view slouch hat covers the head and torso through the walk (`strips/R13`).
- The trough is drawn over Caleb's hat (`crops/R15-player`).
- The tilled tile is drawn over the hem in frames 4–8 (`strips/R14`).
- The night dither crosses Ray's hat, face and shirt (`crops/R05-player`).
- Grass is clustered at 2×2 art px against 1 art px on sprites (`crops/R03-player` and `desktop/R03` show the blocky grass beside the finer figure).

## Category rulings

### pixel: 6.5 (A 6.5, B 6.0)
- **For:** one grid with no resampling. The buildings have clean outlines, shingle and brick coursing and hue-shifted ramps, close to the 7–7.5 benchmark band (`desktop/R04`, `desktop/R19`). Crops are cleanly outlined (`desktop/R03`).
- **Against:**
  - Terrain is built from 2×2 art-px clusters, a coarser and noisier texture than the 1-px sprites standing on it (`crops/R03-player`, `crops/R15-player`).
  - The Blender bonnets are soft, pillow-shaded disks with no form outline (`desktop/R04`).
  - The night dither crosses sprite pixels (`crops/R05-player`).
- These are larger than "small noisy spots", so the score stays below 7. B's 6.0 underrates the buildings and crops, which the advocate rightly separates from tile overlap.

### characters: 5.0 (A 5.0, B 5.5)
- **Front views:** above the 5 anchor.
  - Hattie passes, Walt has his cap and beard (`crops/R11-npcs`), and Caleb has his beard and red shirt (`crops/R03-player`).
  - Josiah has his beard and olive shirt, but no fur cap. Margaux's red scarf reads as hair (`desktop/R16`).
  - The hats still don't read as their kind:
    - Caleb's slouch hat looks like a flat cap with a visor line (`crops/R03-player`).
    - Ray's fedora is a grey dome with no pinch (`crops/R05-player`).
    - Nora's bonnet sits on top of the head and does not frame the face (`crops/R04-player`).
- **Side and back views:** well below 5. They appear in most town captures (`desktop/R04`, `desktop/R08`, `desktop/R06`, `desktop/R19`). In side view the slouch hat swallows Caleb (`strips/R13`).
- A's beard error does not lift the score. The defect that sets it is the side and back views, and those are seen in more frames than the front views are.
- The animals are good (`crops/R15-pen`).

### environment: 6.5 (A 6.5, B 6.5)
- **For:** the town streets reach 7–7.5:
  - 1871 board-and-batten Row with a stage office and drugs (`desktop/R09`);
  - 1886 Second Empire Row (`desktop/R04`);
  - 2026 spa dome, cultural centre, market pavilion and herringbone brick (`desktop/R19`);
  - 1807 trade camp with patched tents, a tripod and a creek (`desktop/R16`).
- **Against:**
  - About 70 % of the farm frame is bare grass (`desktop/R03`).
  - The lake is about 75 % repeating wave lattice with a plain dock (`desktop/R07`). Its shore does exist (see above).
  - The two farmyards share one layout (`desktop/R13`, `desktop/R17`).
- The advocate is right that the fixed street grid is historical. I don't count it.

### lighting: 6.0 (A 6.0, B 6.0)
- **For:**
  - 1931 night has era sources: five-globe lamps, a neon CLUB sign and lit windows. The falloff stays on-grid through the ordered dither (`desktop/R05`).
  - Rain darkens and streaks, and lit windows glow through it (`desktop/R09`).
  - Fog with steam is a distinct mood (`desktop/R08`).
- **Against:**
  - The dither checker runs over sprite faces (`crops/R05-player`).
  - The street lamps are unlit at 19:10 dusk (`desktop/R06`).
  - The 18:20 evening has no warm low sun (`desktop/R07`).
  - People have no contact shadow, while props do (`crops/R03-player`).
  - Lamps cast no shadows.
- The advocate's corrections about fog and dusk windows are valid. They don't reach the 7 anchor's "coherent shadows" and a convincing evening, so the score holds at 6.0.

### animation: 6.0 (A 5.5, B 6.0)
- **Walk** (`strips/R13`, `strips/R13-mobile`): all eight leg poses differ, with a long stride in frames 7–8 and an arm swing. The hip settle is hidden under the hat, and the lamp post covers the legs in frames 1–6.
- **Hoe** (`strips/R14`): anticipation with the head and shoulders compressed in frames 1–2 (verified in `j-r14-1to4.png`), a strike with a squint in frame 4, and a small recovery. The dust is low-contrast tan inside the tile. There is no lean and no hit-stop.
- That is clearly past the 5 anchor ("basic walk cycle; little secondary motion"). The missing secondary motion and weak impact feedback keep it at 6.0. B is right here, and A's "never crouches" is wrong.

### ui: 7.0 (A 6.5, B 7.0)
- **For:**
  - The 5×7 face is integer-crisp on desktop and phone (`desktop/R11`, `mobile/R12`).
  - Per-era palettes: green 1807 (`desktop/R16`), cream 1886 (`desktop/R04`), navy and gold 1931 (`mobile/R12`), cream and teal 1955 (`desktop/R18`), blue 2026 (`desktop/R19`).
  - The new book, satchel and bars icons are pixel art.
  - The shop has a clear hierarchy (`desktop/R18`).
- That meets the 7 anchor across four chapters.
- **Against, all small fixes:**
  - "Close Esc" shows on touch (`mobile/R12`).
  - The scythe touches the slot digit, so slot 5 reads "57" in every hotbar (`mobile/R12`).
  - Panels are flat fills rather than material frames (`desktop/R18`).
- The score is at the gate, not above it.

### readability: 6.5 (A 6.5, B 6.5)
- **For:** the player pops on every desktop frame (`desktop/R04`, `desktop/R03`), and phone text is large (`mobile/R12`).
- **Against:**
  - Depth-sort faults: the trough over the hat (`crops/R15-player`), the tilled tile over the hem (`strips/R14`), and the lantern over Nora's face (`desktop/R08`).
  - Bonnet-disk NPCs don't read as people (`desktop/R04`).
  - Name tags abut and Ezra is hidden (`desktop/R16`).

### authenticity: 7.0 (A 7.0, B 6.5)
- Of the anchor's four axes, three are strong: architecture, vehicles and light sources. All six eras sort blind:
  - 1807 tents and cabin (`desktop/R16`);
  - 1871 unpainted frame bathhouses, stage and drugs (`desktop/R09`);
  - 1886 painted Second Empire Row (`desktop/R04`);
  - 1931 named houses, five-globe lamps and neon (`desktop/R05`);
  - 1955 motor hotel, drive-in, centre line and hydrant (`desktop/R06`);
  - 2026 adaptive reuse with solar panels (`desktop/R19`).
- The advocate is right that the 1955 Row reusing the 1931 facades is historically faithful.
- Clothing lags: misread hats (`crops/R03-player`, `crops/R05-player`) and no fur cap for Josiah (`desktop/R16`). That keeps the score at 7.0 and not higher.

**Total: 6.5 + 5.0 + 6.5 + 6.0 + 6.0 + 7.0 + 6.5 + 7.0 = 50.5 / 80.** Six categories are below gate: pixel, characters, environment, lighting, animation and readability, with characters furthest off. **Verdict: continue.**

## Calibration (unlabeled frame, `reviews/loop-6/calibration.jpg`)
- **Pixel 8.0.** Clean hand-placed clusters and consistent dark outlines on sprites, fences, house and crops. Ramps are disciplined. The large portrait is a different, smoother family.
- **Environment 7.5.** A dressed, charming snow scene (fenced plot, cottage with flower boxes, signpost), but a large share of plain snow field.
- **Lighting 6.0.** Flat daylight with soft drop shadows. There is no light source, time-of-day or weather lighting beyond a snow palette.

## Ranked gaps (top 12, by expected gain ÷ effort; gate categories break ties)
Merges:
- B's G-character-construction is folded into G-npc-side-back-views and G-hat-silhouettes.
- B's G-texture-discipline is folded into G-ground-cluster-scale.
- B's G-scene-composition is folded into G-sparse-farm-lake.
- B's G-night-materials is folded into G-dither-over-sprites.
- B's G-action-separation is split into G-walk-side-hat and G-hoe-impact.
- G-ui-panel-material is split so the touch fixes stand alone at S effort.

Dropped below the cut:
- G-face-template (+0.3, M);
- G-historical-signatures (+0.5, M; authenticity already meets its gate);
- G-era-ui-material (+0.5, M);
- G-gameplay-contrast (+0.3, M).

1. **G-npc-side-back-views** (characters, WS2, sev 5, M, +1.0)
   - Problem: side and back views of the townswomen, 1955 and 2026 walkers are hat disks or domes with no head or shoulders (`desktop/R04`, `desktop/R08`, `desktop/R06`, `desktop/R19`).
   - Fix: rebake each NPC hat per facing, clamped to at most 1.2× head width, so the head outline and shoulder line show from side and back. Match the front view's head:body ratio.
   - Test: in side and back frames the hat must not exceed 1.2× head width, and skin or hair must show below the brim.
2. **G-depth-sort** (readability, WS1, sev 3, S, +0.5)
   - Problem: the trough is drawn over the hat (`crops/R15-player`), the tilled tile over the hem (`strips/R14`), and the lantern over the face (`desktop/R08`).
   - Fix: sort actors and props by foot Y, and always draw ground decals (tilled soil, paths) in a pass under actors.
3. **G-dither-over-sprites** (lighting, WS4, sev 3, S, +0.5)
   - Problem: the dither checker crosses sprite pixels (`crops/R05-player`, `desktop/R05`).
   - Fix: mask the light dither off actor sprites. Light sprites with one palette-ramp step plus a 1-art-px warm rim on the lamp side, and keep the dither on ground and walls.
4. **G-walk-side-hat** (animation, WS5, sev 3, S, +0.5)
   - Problem: the side-view slouch hat hides the head, torso and hip settle (`strips/R13`).
   - Fix: clamp the side-facing hat to the head plus 2 art px of brim so the shoulder and torso show. Add a 1-px hat bob that lags the hip settle by one frame.
5. **G-touch-ui-fixes** (ui, WS6, sev 2, S, +0.3)
   - Problem: "Close Esc" shows on touch (`mobile/R12`), and the slot digit collides with the icon so slot 5 reads "57" (`mobile/R12`, `desktop/R16`).
   - Fix: hide key-hint chips when the pointer is coarse. Inset slot digits into a 1-px dark plate in the corner and shrink icons by 1 art px so nothing overlaps.
6. **G-evening-dusk-light** (lighting, WS4, sev 2, S, +0.3)
   - Problem: the street lamps are off at 19:10 (`desktop/R06`), and 18:20 has no warm low sun (`desktop/R07`).
   - Fix: switch street lamps on from 18:30 with the dithered pool. Add a 2–3 band on-grid warm tint across the evening frame and stretch prop shadows to 2× length.
7. **G-actor-shadows** (lighting, WS4, sev 2, S, +0.3)
   - Problem: people have no contact shadow, while props do (`crops/R03-player`, `desktop/R17`).
   - Fix: give every actor the same dark ellipse props use, 1 art px tall per 4 px of width.
8. **G-label-overlap** (readability, WS6, sev 2, S, +0.3)
   - Problem: the JOSIAH, TRADE and MARGAUX tags abut, and Ezra's tag floats over nobody (`desktop/R16`).
   - Fix: stack tags vertically when within 8 art px of each other, and hide the tag of any NPC fully occluded by the player.
9. **G-hat-silhouettes** (characters, WS2, sev 4, M, +0.5)
   - Problem: the slouch hat reads as a flat cap, the fedora as a dome, and the bonnet as a cap (`crops/R03-player`, `crops/R05-player`, `crops/R04-player`).
   - Fix: hand-pixel front-facing hat silhouettes at 1×:
     - slouch: a wide, thin dark brim breaking the head outline;
     - fedora: a crown notch and a 1-px band;
     - bonnet: a brim tunnel framing the face on both sides.
10. **G-ground-cluster-scale** (pixel, WS3, sev 3, M, +0.5)
    - Problem: grass and ground are 2×2 art-px speckle (`desktop/R03`, `crops/R15-player`).
    - Fix: redraw the grass and dirt tiles at 1 art px with 2–3 tones and deliberate clumps, cutting the colour changes per tile by at least half. Make the water lattice period at least twice as long (`desktop/R07`).
11. **G-sparse-farm-lake** (environment, WS3, sev 3, M, +0.5)
    - Problem: the farm is mostly bare grass, the lake is open water, and both farmyards share one layout (`desktop/R03`, `desktop/R07`, `desktop/R17`).
    - Fix:
      - Field: at least 6 dressing clusters per screen (stumps, rock groups, tall-grass patches, a fence run).
      - Lake: reeds and lily pads along the shore, a moored boat and birds.
      - 1931 farmyard: a different crate, trough and path layout from 1871.
12. **G-hoe-impact** (animation, WS5, sev 3, M, +0.3)
    - Problem: dust stays inside the tile in a soil tone, and frames 5–8 are near-identical (`strips/R14`).
    - Fix:
      - Draw dust puffs 2 ramp steps lighter than the soil, rising 4–8 art px above the tile edge.
      - Add a 1-px forward lean at the strike and a 2-frame hit-stop.
      - Make the recovery reach a vertical hoe by frame 7.

```json
{
  "loop": 6,
  "role": "judge",
  "tier": "T32",
  "scores": {
    "pixel": {"score": 6.5, "confidence": 0.75, "evidence": [
      {"shot": "desktop/R04", "note": "buildings: clean outlines, coursing, hue-shifted ramps; NPC bonnets soft pillow-shaded disks"},
      {"shot": "desktop/R19", "note": "spa dome, cultural centre, herringbone brick cleanly clustered"},
      {"shot": "crops/R03-player", "note": "grass in 2x2 art-px speckle beside 1-px sprite"},
      {"shot": "crops/R05-player", "note": "night dither crosses hat, face and shirt"}
    ]},
    "characters": {"score": 5.0, "confidence": 0.75, "evidence": [
      {"shot": "crops/R03-player", "note": "Caleb bearded (A wrong on 'one face'); slouch reads as flat cap"},
      {"shot": "crops/R05-player", "note": "fedora a grey dome, no pinch"},
      {"shot": "crops/R04-player", "note": "Nora's bonnet sits on top, does not frame face"},
      {"shot": "crops/R11-npcs", "note": "Hattie passes, Walt cap and beard; Augustin back view tiny"},
      {"shot": "desktop/R04", "note": "townswomen side/back are bonnet disks, no head or shoulders"},
      {"shot": "desktop/R06", "note": "1955 walkers blue domes"},
      {"shot": "strips/R13", "note": "side-view slouch hat swallows head and torso"},
      {"shot": "crops/R15-pen", "note": "animals good"}
    ]},
    "environment": {"score": 6.5, "confidence": 0.75, "evidence": [
      {"shot": "desktop/R09", "note": "1871 frame Row, stage, drugs: dressed and distinct"},
      {"shot": "desktop/R16", "note": "trade camp dense: patched tents, tripod, creek"},
      {"shot": "desktop/R03", "note": "about 70% bare grass"},
      {"shot": "desktop/R07", "note": "pebble shore and stairs exist, but 75% repeating water lattice, plain dock"},
      {"shot": "desktop/R17", "note": "farmyard layout reused from desktop/R13"}
    ]},
    "lighting": {"score": 6.0, "confidence": 0.7, "evidence": [
      {"shot": "desktop/R05", "note": "five-globe lamps, neon, windows; on-grid dither falloff; no lamp shadows"},
      {"shot": "crops/R05-player", "note": "dither checker over the sprite"},
      {"shot": "desktop/R06", "note": "windows and porch lamps lit at dusk, street lamps unlit, subtle grade"},
      {"shot": "desktop/R07", "note": "18:20 evening with no warm low light"},
      {"shot": "desktop/R08", "note": "fog lowers contrast; springs, steam, spring boxes still visible"},
      {"shot": "desktop/R09", "note": "rain streaks and darkened grade, no wet surfaces"}
    ]},
    "animation": {"score": 6.0, "confidence": 0.65, "evidence": [
      {"shot": "strips/R14", "note": "wind-up compression in frames 1-2 (judge zoom), strike + squint in 4, slight recovery; dust inside tile, frames 5-8 near-identical"},
      {"shot": "strips/R13", "note": "eight distinct leg poses; hat hides torso and settle; post covers legs 1-6"},
      {"shot": "strips/R13-mobile", "note": "same cycle at phone scale"}
    ]},
    "ui": {"score": 7.0, "confidence": 0.65, "evidence": [
      {"shot": "desktop/R18", "note": "1955 cream/teal shop, crisp type, clear hierarchy; flat panel"},
      {"shot": "mobile/R12", "note": "1931 navy/gold pack reflow crisp on phone; 'Close Esc' on touch; slot 5 reads '57'"},
      {"shot": "desktop/R04", "note": "1886 cream HUD, pixel book/satchel/bars icons"},
      {"shot": "desktop/R19", "note": "2026 blue HUD, per-era palette"}
    ]},
    "readability": {"score": 6.5, "confidence": 0.7, "evidence": [
      {"shot": "desktop/R03", "note": "player and crop stages clear"},
      {"shot": "mobile/R12", "note": "phone text large and crisp"},
      {"shot": "crops/R15-player", "note": "trough drawn over the hat"},
      {"shot": "strips/R14", "note": "tilled tile drawn over the hem in frames 4-8"},
      {"shot": "desktop/R08", "note": "lantern over Nora's face"},
      {"shot": "desktop/R16", "note": "name tags abut; Ezra's tag over nobody"}
    ]},
    "authenticity": {"score": 7.0, "confidence": 0.65, "evidence": [
      {"shot": "desktop/R16", "note": "1807 tents and cabin"},
      {"shot": "desktop/R09", "note": "1871 unpainted frame bathhouses"},
      {"shot": "desktop/R04", "note": "1886 painted Second Empire Row"},
      {"shot": "desktop/R05", "note": "1931 named houses, five-globe lamps, neon"},
      {"shot": "desktop/R06", "note": "1955 motor hotel, drive-in, hydrant; Row continuity is historical"},
      {"shot": "desktop/R19", "note": "2026 adaptive reuse, solar"},
      {"shot": "crops/R03-player", "note": "clothing lags: slouch hat misread"}
    ]}
  },
  "calibration": {"pixel": 8.0, "environment": 7.5, "lighting": 6.0},
  "gaps": [
    {"id": "G-npc-side-back-views", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["desktop/R04", "desktop/R08", "desktop/R06", "desktop/R19"], "benchmark": "chained-5.jpg", "fix": "Rebake each NPC hat per facing, clamped to <=1.2x head width, so head outline and shoulder line show from side and back; match the front view's head:body ratio. Test: skin or hair visible below the brim in every side/back frame."},
    {"id": "G-depth-sort", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/R15-player", "strips/R14", "desktop/R08"], "fix": "Sort actors and props by foot Y; always draw ground decals (tilled soil, paths) in a pass under actors."},
    {"id": "G-dither-over-sprites", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["crops/R05-player", "desktop/R05"], "benchmark": "seastars-2.jpg", "fix": "Mask light dither off actor sprites; light sprites with one palette-ramp step plus a 1-art-px warm rim on the lamp side; keep dither on ground and walls."},
    {"id": "G-walk-side-hat", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["strips/R13", "strips/R13-mobile"], "fix": "Clamp the side-facing hat to head + 2 art px brim so shoulders and torso show; add a 1-px hat bob lagging the hip settle by one frame."},
    {"id": "G-touch-ui-fixes", "category": "ui", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["mobile/R12", "desktop/R16"], "fix": "Hide key-hint chips on coarse pointers; inset slot digits on a 1-px dark corner plate and shrink icons 1 art px so no icon touches its digit."},
    {"id": "G-evening-dusk-light", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["desktop/R06", "desktop/R07"], "benchmark": "seastars-2.jpg", "fix": "Street lamps on from 18:30 with the dithered pool; 2-3 band on-grid warm evening tint; prop shadows 2x long at evening."},
    {"id": "G-actor-shadows", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["crops/R03-player", "desktop/R17"], "fix": "Give every actor the same dark contact ellipse props use (1 art px tall per 4 px wide)."},
    {"id": "G-label-overlap", "category": "readability", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["desktop/R16"], "fix": "Stack tags vertically when within 8 art px of each other; hide the tag of an NPC fully occluded by the player."},
    {"id": "G-hat-silhouettes", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/R03-player", "crops/R05-player", "crops/R04-player"], "benchmark": "stardew-1.jpg", "fix": "Hand-pixel front hat silhouettes at 1x: slouch with a wide thin dark brim breaking the head outline; fedora with crown notch and 1-px band; bonnet brim tunnel framing the face on both sides."},
    {"id": "G-ground-cluster-scale", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "crops/R15-player", "desktop/R07"], "benchmark": "stardew-1.jpg", "fix": "Redraw grass and dirt tiles at 1 art px with 2-3 tones and deliberate clumps, halving colour changes per tile; lengthen the water lattice period at least 2x."},
    {"id": "G-sparse-farm-lake", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R07", "desktop/R17"], "benchmark": "stardew-1.jpg", "fix": ">=6 dressing clusters per field screen (stumps, rock groups, tall grass, fence run); reeds, lily pads, a moored boat and birds at the lake; a distinct 1931 farmyard layout."},
    {"id": "G-hoe-impact", "category": "animation", "expectedGain": 0.3, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14"], "fix": "Dust puffs 2 ramp steps lighter than soil rising 4-8 art px above the tile edge; 1-px forward lean and 2-frame hit-stop at the strike; hoe vertical by frame 7."}
  ],
  "verdict": "continue"
}
```
