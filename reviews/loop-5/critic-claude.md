# Critic A (critic-claude): loop 5, tier T32

## Verdict

The buildings and the era-swapped town are now a real asset. The 1886, 1931, 1955 and 2026 Row frames (`desktop/R04`, `desktop/R05`, `desktop/R06`, `desktop/R19`) have clean dark outlines, hue-shifted ramps and period signage that holds up next to Chained Echoes' market (`chained-5`). The 2026 adaptive-reuse labels are historically sharp: Superior as a brewery, Ozark as a cultural centre, Hotel Hale. Everything that moves, or that lights the scene, still sits at SNES-baseline level or below. The people are chibi blocks with a single shared face. Every hat kind comes out as the same oversized disc (`crops/R03-player`, `crops/R05-player`, `crops/R17-player`, `crops/R07-player`), and the ambient bonnet women are four identical clones (`desktop/R04`, `desktop/R10`). The walk cycle has about four leg poses and no body or hat bob (`strips/R13`). The hoe strike has no anticipation, and its dust is a flat tan bar (`strips/R14`). Night light pools are concentric "target" rings that tint grass green and brick red, and they never touch a sprite (`desktop/R05`, `mobile/R05`). Dusk (`desktop/R06`) and evening (`desktop/R07`) read as daytime. This loop's new 50% checker see-through puts a conspicuous screen-door mesh over the player's face when a lamp post is in front (`crops/R08-player`). On mobile, the UI font has visible spacing gaps ("fi l ls", "Duva l", "Too l"), and hotbar slot 5 reads as "57" (`mobile/R11`, `mobile/R12`, `mobile/R04`). The environment is ahead of the characters, animation and lighting, and those three now cap the score.

## Scores

### 1. pixel: 6.5
- **Buildings and props are near CAL-A quality:** one dark-outline rule, clean shingle and siding clusters, warm-to-cool ramps (`crops/R19-row`, `crops/R04-row`; the bungalow and Model-A pickup in `desktop/R17`). By themselves these would sit around 7.5, level with `stardew-1`.
- **Ground pulls the score down:** the meadow is a camouflage of isolated 1–2 px cells with no authored grass tufts (zoom of `desktop/R03`; also `desktop/R02`, `desktop/R13`). Snow ground has the same speckle (`desktop/R10`). That is the rubric's "noisy clusters" at 5.
- **Character sprites follow a different outline rule:** dark outline on the body but none inside, and the "face window" leaves skin rectangles. In profile it pokes a pale square through the hat brim (`strips/R13`, frames 1–8).
- **New defect, `crops/R08-player`:** the lamp post in front of Nora is drawn as a dark 50% checker straight across her face and apron, so it reads as dither noise rather than transparency.
- **Crop art looks more painterly than the rest:** many-colour leaves next to the flat tile soil mounds (`crops/R03-field`).
- No resampling blur anywhere. The integrity gate passes.

### 2. characters: 5.0
- **Hats:**
  - Caleb's slouch hat is a mushroom disc wider than his shoulders (`crops/R03-player`, `crops/R09-player`, `crops/R15-player`).
  - Ray's fedora reads as a flat cap, with no pinched crown or snapped brim (`crops/R05-player`, `crops/R17-player`).
  - Sam's ball cap reads as a beanie: the bill is a grey smear across the crown, not a forward projection (`crops/R07-player`, `crops/R19-player`).
- **June Vale** reads as a bald boy, with no ponytail or tucked shirt (`crops/R06-player`).
- **The 1886 cast in `crops/R11-npcs`:**
  - Hattie passes (white cap, white dress, skin 4).
  - Walt has a cap and a pale shirt but no knickers or white stockings.
  - Augustin shows only a white blob from behind.
- **The 1807 cast in `crops/R16-npcs`:**
  - Josiah's fur cap is a grey beret with no tail.
  - Margaux's scarf reads as red hair.
  - Ezra is not visible at all: his label floats over the tent.
- **Every face is the same:** big grey eyes and a smudge for nose and mouth (`crops/R02-player`, `crops/R16-player`). The arms are skin-coloured stumps.
- Ambient women are exact clones (×4 in `desktop/R04` and `desktop/R10`, ×3 in `desktop/R08`).
- **Against the anchors:** below CAL-A's 6.5 (`stardew-1` townsfolk at least differ by garment), and well below `seastars-2`, where about 14 people are all distinct.
- Animals are better than the people (`crops/R15-pen`). One goat has green patches on its white coat.

### 3. environment: 6.5
- **Strong building work:**
  - Bathhouse facades with porches, cresting, dormers and chimneys (`desktop/R04`, `desktop/R19`).
  - A board-sided 1871 street (`desktop/R09`).
  - Era-swapped farmsteads on the same plot: log cabin (`desktop/R02`), log cabin with wagon and pump (`desktop/R13`), Craftsman bungalow with pickup (`desktop/R17`).
  - Crops at every growth stage with ripeness sparkles (`crops/R03-field`).
- **Weaknesses:**
  - Large empty meadows, about 60% of `desktop/R03` and the lower half of `desktop/R13`.
  - `desktop/R07` is 80% open water with no shoreline props, boats or reeds. The new ramp is a flat grey slab beside the shore that never enters the water (my zoom of `desktop/R07`).
  - Buildings sit on bare lawn with no yards, fences, walks or contact shadows. The Row has grass behind it where Hot Springs Mountain should rise.
  - Prop shadows are oversized flat ellipses, for example the wagon in `desktop/R13`.
- **Against the anchors:** below CAL-A's 8 (`stardew-1` fills every tile with fences, bushes, crops and paths).

### 4. lighting: 5.5
- **Night, `desktop/R05`, `mobile/R05`:** pools are on-grid and banded, but drawn as 3–4 concentric rings that tint the grass bright green and the brick red. They look like targets rather than light. Facades go near-black apart from small window dots, with no spill onto the street. A fedora NPC standing in a pool stays flat grey (my zoom of `desktop/R05`).
- **Dusk, `desktop/R06`:** a slight desaturation, with lamps unlit and no warm or long light.
- **Evening, `desktop/R07`:** a cool tint, with no sky colour or sun glint on the water.
- **Rain, `desktop/R09`:** sparse streaks, with no darkening, wet sheen, puddles or splashes.
- **Fog (`desktop/R08`) and snow (`desktop/R10`)** are the best moods: snow-capped roofs, a pale wash, steam over the spring pool.
- **Against the anchors:** CAL-B (`chained-5`) has consistent cast shadows and a puddle reflection, and CAL-C (`seastars-2`) has coloured point lights that light the sprites. This build has neither, so it sits just above the 5 anchor.

### 5. animation: 5.0
- **Walk, `strips/R13` and `strips/R13-mobile`:**
  - About four distinct leg poses across 8 frames. Frames 3 and 5 are near-duplicates.
  - No vertical body bob, no visible arm swing, and the hat is rigid.
  - In profile the brim covers the whole torso, so the walk reads as a disc on legs. A red limb in frame 7 runs from hip to foot.
- **Hoe, `strips/R14`:**
  - Overhead wind-up (frames 1–2), then the strike on frame 4.
  - The body never moves: no lean-back, no squash, no hit-stop.
  - Frames 5–8 hold almost the same hoe angle, so the "lowers to rest" is barely visible.
  - The dust is a flat tan horizontal bar beside the tile that grows instead of dissipating.
  - The freshly tilled tile is drawn over Nora's hem and feet, a z-order error (my zoom of frames 3, 4, 5 and 8).
- **Against the anchor:** this is the SNES 5 anchor, a 4-pose walk and a swing without anticipation, with no ambient life shown in any strip.

### 6. ui: 6.0
- **What works:**
  - The bitmap font is crisp at integer scale on desktop (`desktop/R12`, `desktop/R18`).
  - The HUD material changes per era: dark green in 1807 (`desktop/R02`), cream in 1871/1886 (`desktop/R04`), navy and gold in 1931 (`desktop/R05`), blue in 2026 (`desktop/R19`). That is a real plus toward the 9 anchor.
  - The new hotbar chips are clean.
- **What fails:**
  - The dialogue "portrait" is just the walking sprite upscaled into a small box (`desktop/R11`), against the hand-drawn bust in `stardew-5` (pegged 7.5).
  - The shop is rows of flat buttons that read as a web table (`desktop/R18`).
  - Nameplates collide: JOSIAH, TRADE and MARGAUX butt together and EZRA floats unattached (`desktop/R16`). AUGUSTIN overlaps Walt (`desktop/R11`).
  - On phone the font has irregular gaps after the narrow glyphs: "fi l ls", "Duva l", "strawberr ies", "se lect" (`mobile/R11`, `mobile/R12`, `mobile/R01`).
  - The phone dialogue pushes the portrait outside the box's left edge (`mobile/R11`).

### 7. readability: 6.5
- **What reads:**
  - The player is always findable thanks to the cursor bracket and the central camera (`desktop/R03`, `mobile/R02`).
  - Crop stages and ripe sparkles are clear (`crops/R03-field`).
  - Phone text is at least 10 CSS px and the touch buttons are large (`mobile/R04`, `mobile/R13`).
- **What doesn't:**
  - Hotbar slot 5's numeral merges with the sickle and reads "57", on desktop and mobile (`desktop/R02`, `mobile/R04`).
  - Nameplates hide NPC heads (`desktop/R11`).
  - 1955 NPCs wear ambiguous blue discs (`desktop/R06`).
  - At night, buildings and doors are unreadable on phone, though the street is playable (`mobile/R05`).
  - The checker mesh hides the player's face in fog (`desktop/R08`).
- **Against the anchors:** below CAL-A (8.5), and about level with CAL-C's 7 minus the label clutter.

### 8. authenticity: 6.5
- **Historian-grade wins:**
  - Real Row names: Superior, Quapaw, Ozark, Hale (`desktop/R05`, `desktop/R06`).
  - Correct 2026 reuse: Superior brewery, Ozark cultural centre, Hotel Hale, plus a farmers' market pavilion (`desktop/R19`, `crops/R19-row`).
  - Five-globe lamp clusters in 1931 (`desktop/R05`).
  - A Model-A-style pickup and a Craftsman bungalow (`desktop/R17`).
  - A Googie drive-in and a motor hotel in 1955 (`desktop/R06`).
  - A board-sided 1871 street (`desktop/R09`).
  - A blind viewer could sort all six eras.
- **Losses:**
  - The Quapaw has its tiled dome in 2026 (`desktop/R19`) but is a domeless brown Victorian in 1955 (`desktop/R06`). The dome dates from 1922, so that is an internal anachronism.
  - The 1886 Row is a uniform set of green-roofed Second Empire piles (`desktop/R04`).
  - Clothing misses the checklist: generic hats, Walt with no knickers or stockings, June Vale with no 1950s cues (`crops/R11-npcs`, `crops/R06-player`).
- **Against the anchor:** buildings sit at the 7 anchor, clothing at 5.

## Ranked gaps

1. **G-hat-silhouettes** (characters, WS2, sev 4, effort M, +1.0)
   - **Problem:** every hat is a near-identical disc wider than the shoulders (`crops/R03-player`, `crops/R05-player`, `crops/R07-player`).
   - **Fix:** author per-kind hat sprites:
     - fedora with a pinched crown and a snapped front brim;
     - slouch hat with a drooping brim that is no more than 1.3× head width;
     - ball cap with a bill projecting 3–4 px toward the facing direction;
     - fur cap with a tail;
     - knotted scarf;
     - 1886 short-bill cap.
   - Shrink brims in profile so the torso shows.
2. **G-walk-cycle-6f** (animation, WS5, sev 4, effort M, +1.0)
   - **Problem:** about four poses, no bob (`strips/R13`).
   - **Fix:** a 6-frame walk with a 1 px body drop on contact frames, 2-pose arm swing, and a 1 px hat and hair lag. In profile, show the torso under a narrower brim.
3. **G-night-dusk-light** (lighting, WS4, sev 4, effort M, +1.0)
   - **Problem:** ring "targets" with no sprite response (`desktop/R05`, `desktop/R06`, `desktop/R07`).
   - **Fix:**
     - Draw pools as one warm hue in 2 bands with a dithered edge, multiplied, not hue-replaced on the grass.
     - Add window light spill as trapezoids on the street.
     - Add a warm rim or tint on sprites inside a pool.
     - Dusk gets an orange key light and lit lamp heads. Evening water gets a sun-glint column.
4. **G-character-identity** (characters, WS2, sev 3, effort M, +0.5)
   - **Problem:** cloned bonnet women (`desktop/R04`, `desktop/R10`), a hidden Ezra (`desktop/R16`), June Vale reading bald (`crops/R06-player`), one face for everyone.
   - **Fix:**
     - Vary ambient palettes and garments.
     - Add a ponytail for June Vale, knickers and stockings for Walt, a stick for Ezra.
     - Give each person 2–3 eye and mouth variants and a distinct hairline.
5. **G-hoe-feel** (animation, WS5, sev 3, effort S, +0.5)
   - **Problem:** `strips/R14` shows a static body, a dust bar, and the tilled tile drawn over the feet.
   - **Fix:**
     - Add a 1–2 px lean-back on the wind-up.
     - On impact, squash the body 1 px and hold for 2 frames.
     - Replace the dust with 3–4 small puff clusters plus soil chips that shrink over 4 frames.
     - Draw the tilled-tile decal on the ground layer, under sprites.
6. **G-checker-occlusion** (pixel, WS1, sev 3, effort S, +0.5)
   - **Problem:** a dark checker covers the player's face (`crops/R08-player`).
   - **Fix:**
     - Skip see-through for thin props like lamp posts.
     - For canopies and buildings, draw the hidden player as a 1 px player-coloured outline rather than checkering a dark occluder over the face.
7. **G-ground-clusters** (pixel/environment, WS3, sev 3, effort M, +0.5)
   - **Problem:** the meadow is camo noise (`desktop/R03`, `desktop/R02`).
   - **Fix:** remove isolated single pixels. Author 3–6 px grass-tuft clusters, sparse blade sprigs and path-edge tufts on a 16 px tile set, as Stardew does in `stardew-1`.
8. **G-mobile-font-metrics** (ui, WS6, sev 3, effort S, +0.5)
   - **Problem:** gaps after narrow glyphs on phone (`mobile/R11`, `mobile/R12`, `mobile/R01`).
   - **Fix:** use per-glyph advance widths for the bitmap font at integer scale on mobile, the same metrics as desktop.
9. **G-portrait-nameplates** (ui, WS6, sev 3, effort L, +0.5)
   - **Problem:** an upscaled sprite as the portrait (`desktop/R11`), and colliding labels (`desktop/R16`).
   - **Fix:** draw 48×48 bust portraits for the named cast. Show the nameplate only for the nearest or targeted NPC, with collision offset.
10. **G-scene-dressing** (environment, WS3, sev 3, effort M, +0.5)
    - **Problem:** empty fields and water (`desktop/R03`, `desktop/R07`), and buildings on bare lawn.
    - **Fix:**
      - Add fences, woodpiles, bushes and stumps to the fields.
      - Add reeds, rocks, a boat and buoys to the lake.
      - Give buildings yards, walks and contact shadows.
      - Put a wooded mountain backdrop behind the Row.
11. **G-row-per-era** (authenticity, WS7, sev 3, effort M, +0.5)
    - **Problem:** the Quapaw has no dome in 1955 (`desktop/R06`) but has one in 2026 (`desktop/R19`), and the 1886 Row is uniform (`desktop/R04`).
    - **Fix:** build per-building era sprites from the refs, for example the Quapaw dome from 1922 and the Ozark's Spanish Revival towers. Vary 1886 materials: frame, brick, Moorish.
12. **G-hotbar-numerals** (readability, WS6, sev 2, effort S, +0.5)
    - **Problem:** "5" plus the sickle reads "57" (`desktop/R02`, `mobile/R04`).
    - **Fix:** put the numeral on a dark backing chip with a 1 px gap from the icon, or move it to the slot frame. Hide numerals on touch.
13. **G-weather-ground** (lighting, WS4, sev 2, effort S, +0.5)
    - **Problem:** rain doesn't change the ground (`desktop/R09`).
    - **Fix:** darken the ground one ramp step, add puddle tiles with highlight pixels and splash sprites, and lower the overall value.
14. **G-sort-order** (pixel, WS1, sev 2, effort S, +0.25)
    - **Problem:** the fence trough is drawn over Caleb's hat (`crops/R15-player`).
    - **Fix:** sort by foot y, and treat fence-mounted props as part of the fence layer.

```json
{
  "loop": 5,
  "role": "critic-claude",
  "tier": "T32",
  "scores": {
    "pixel": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/R19-row", "note": "clean outlined clusters and hue-shifted ramps on buildings, ~CAL-A level"},
        {"shot": "crops/R08-player", "note": "new 50% checker of a dark lamp post covers the player's face as screen-door noise"},
        {"shot": "desktop/R03", "note": "meadow is camo noise of isolated 1-2 px cells, no authored tufts"},
        {"shot": "strips/R13", "note": "profile face window leaves a pale skin square through the hat brim"},
        {"shot": "crops/R03-field", "note": "crop art more painterly than the flat soil tiles"}
      ]
    },
    "characters": {
      "score": 5.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/R03-player", "note": "Caleb's slouch hat is a mushroom disc wider than his shoulders"},
        {"shot": "crops/R05-player", "note": "Ray's fedora reads as a flat cap, no pinched crown"},
        {"shot": "crops/R07-player", "note": "Sam's ball cap has no projecting bill, reads as a beanie"},
        {"shot": "crops/R06-player", "note": "June Vale reads as a bald boy"},
        {"shot": "crops/R16-npcs", "note": "Josiah's fur cap is a beret, Margaux's scarf reads as hair, Ezra not visible"},
        {"shot": "crops/R11-npcs", "note": "Hattie passes; Walt lacks knickers and stockings; shared face on everyone"},
        {"shot": "desktop/R04", "note": "four identical bonnet-woman clones"}
      ]
    },
    "environment": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R19", "note": "rich restored Row, herringbone walk, market pavilion"},
        {"shot": "desktop/R17", "note": "bungalow and pickup era swap of the same farm plot"},
        {"shot": "crops/R03-field", "note": "all crop stages readable"},
        {"shot": "desktop/R03", "note": "about 60% empty meadow"},
        {"shot": "desktop/R07", "note": "80% open water, flat ramp slab that never enters the water, no shore dressing"}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R05", "note": "banded on-grid pools drawn as concentric target rings that tint grass green; no light on sprites; black facades"},
        {"shot": "mobile/R05", "note": "same ring pools; buildings unreadable at night on phone"},
        {"shot": "desktop/R06", "note": "dusk barely differs from day, lamps unlit"},
        {"shot": "desktop/R09", "note": "rain streaks only, no wet ground or darkening"},
        {"shot": "desktop/R10", "note": "snow roofs and wash are the best mood"},
        {"shot": "desktop/R08", "note": "fog wash and steam acceptable"}
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/R13", "note": "about 4 distinct leg poses in 8 frames, no body or hat bob, torso hidden under brim"},
        {"shot": "strips/R13-mobile", "note": "same cycle, near-duplicate frames"},
        {"shot": "strips/R14", "note": "no anticipation or squash; hoe angle nearly frozen in frames 5-8; dust is a flat tan bar; tilled tile drawn over the feet"}
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R12", "note": "crisp bitmap font, era HUD colours (1931 navy and gold), clean chips"},
        {"shot": "desktop/R11", "note": "portrait is the walk sprite upscaled; nameplates overlap heads"},
        {"shot": "desktop/R16", "note": "JOSIAH/TRADE/MARGAUX labels collide, EZRA floats"},
        {"shot": "desktop/R18", "note": "shop reads as a web table of buttons"},
        {"shot": "mobile/R11", "note": "font spacing gaps ('Duva l', 'strawberr ies'); portrait outside the box"},
        {"shot": "mobile/R12", "note": "'fi l ls', 'Too l' gaps"}
      ]
    },
    "readability": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "mobile/R04", "note": "player findable, text at least 10 CSS px, big touch buttons; slot 5 reads '57'"},
        {"shot": "crops/R03-field", "note": "ripe sparkles and stages clear"},
        {"shot": "desktop/R11", "note": "nameplates hide NPC heads"},
        {"shot": "mobile/R05", "note": "street playable at night, buildings and doors not"},
        {"shot": "desktop/R08", "note": "checker mesh hides the player's face"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.65,
      "evidence": [
        {"shot": "desktop/R19", "note": "Superior brewery, Ozark cultural centre, Hotel Hale: correct 2026 reuse"},
        {"shot": "desktop/R05", "note": "real Row names, five-globe lamps for 1931"},
        {"shot": "desktop/R17", "note": "Model-A-style pickup and Craftsman bungalow"},
        {"shot": "desktop/R06", "note": "Googie drive-in and motor hotel; but the Quapaw lacks its 1922 dome, which appears in 2026"},
        {"shot": "desktop/R04", "note": "1886 Row a uniform Second Empire set"},
        {"shot": "crops/R11-npcs", "note": "clothing misses the checklist (Walt, generic hats)"}
      ]
    }
  },
  "gaps": [
    {"id": "G-hat-silhouettes", "category": "characters", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/R03-player", "crops/R05-player", "crops/R07-player", "crops/R17-player"], "benchmark": "seastars-2", "fix": "Per-kind hat sprites: fedora with pinched crown and snapped brim; slouch hat with drooping brim no more than 1.3x head width; ball cap with a 3-4 px forward bill; fur cap with tail; knotted scarf; 1886 short-bill cap. Narrow the brims in profile so the torso shows."},
    {"id": "G-walk-cycle-6f", "category": "animation", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["strips/R13", "strips/R13-mobile"], "benchmark": "stardew-1", "fix": "6-frame walk with a 1 px body drop on contact frames, 2-pose arm swing, 1 px hat and hair lag; remove near-duplicate frames; show the torso in profile."},
    {"id": "G-night-dusk-light", "category": "lighting", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R05", "mobile/R05", "desktop/R06", "desktop/R07"], "benchmark": "seastars-2", "fix": "Single warm-hue lamp pools in 2 bands with dithered edges (multiply, not hue replace); window light spill on the street; warm rim tint on sprites inside pools; dusk orange key light with lamp heads lit; sun-glint column on evening water."},
    {"id": "G-character-identity", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["desktop/R04", "desktop/R10", "crops/R16-npcs", "crops/R06-player", "crops/R11-npcs"], "benchmark": "chained-5", "fix": "Vary ambient NPC palettes and garments (no clones); ponytail for June Vale, knickers and white stockings for Walt, visible Ezra with stick; 2-3 eye and mouth variants and distinct hairlines per person."},
    {"id": "G-hoe-feel", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["strips/R14"], "benchmark": "stardew-1", "fix": "1-2 px lean-back on wind-up, 1 px squash and 2-frame hold on impact, dust as 3-4 small puff clusters plus soil chips shrinking over 4 frames; draw the tilled-tile decal on the ground layer under sprites."},
    {"id": "G-checker-occlusion", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["crops/R08-player", "desktop/R08"], "fix": "Skip see-through for thin props like lamp posts; for canopies and buildings, show the hidden player as a 1 px player-coloured outline instead of checkering a dark occluder across the face."},
    {"id": "G-ground-clusters", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R02", "desktop/R10"], "benchmark": "stardew-1", "fix": "Remove isolated single-pixel noise from the meadow and snow ground; author 3-6 px grass-tuft clusters, sparse sprigs and path-edge tufts on the 16 px tile set."},
    {"id": "G-mobile-font-metrics", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS6", "evidence": ["mobile/R11", "mobile/R12", "mobile/R01"], "fix": "Use per-glyph advance widths for the bitmap font at integer scale on mobile (same metrics as desktop) so 'l', 'i' and '.' don't leave gaps."},
    {"id": "G-portrait-nameplates", "category": "ui", "expectedGain": 0.5, "severity": 3, "effort": "L", "workstream": "WS6", "evidence": ["desktop/R11", "desktop/R16"], "benchmark": "stardew-5", "fix": "48x48 hand-drawn bust portraits for the named cast; show the nameplate only for the nearest or targeted NPC, with collision offset so labels never overlap heads or each other."},
    {"id": "G-scene-dressing", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R07", "desktop/R04"], "benchmark": "stardew-1", "fix": "Dress the open fields (fences, woodpiles, bushes, stumps) and the lake (reeds, rocks, boat, buoys, ramp running into the water); give buildings yards, walks and contact shadows; wooded mountain backdrop behind the Row."},
    {"id": "G-row-per-era", "category": "authenticity", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS7", "evidence": ["desktop/R06", "desktop/R19", "desktop/R04"], "fix": "Per-building era sprites from the refs: Quapaw dome from 1922 onward (1931, 1955), Ozark's Spanish Revival towers; vary 1886 bathhouse materials (frame, brick, Moorish) instead of a uniform Second Empire set."},
    {"id": "G-hotbar-numerals", "category": "readability", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["desktop/R02", "mobile/R04"], "fix": "Put slot numerals on a dark backing chip with a 1 px gap from the icon, or move them to the slot frame; hide them on touch. Slot 5 plus sickle currently reads '57'."},
    {"id": "G-weather-ground", "category": "lighting", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["desktop/R09"], "benchmark": "chained-5", "fix": "In rain, darken the ground one ramp step, add puddle tiles with highlight pixels and splash sprites, and lower the overall value."},
    {"id": "G-sort-order", "category": "pixel", "expectedGain": 0.25, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["crops/R15-player"], "fix": "Sort sprites by foot y; treat fence-mounted props like the trough as part of the fence layer so they never draw over the player's hat."}
  ],
  "verdict": "continue"
}
```
