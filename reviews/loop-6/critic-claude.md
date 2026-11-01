# Critic A (critic-claude) — loop 6, tier T32

## Verdict
Buildings, props and era architecture now read like a shipped indie pixel game. The Second Empire Row (`desktop/R04`, `crops/R04-row`), the 2026 brewery and spa (`crops/R19-row`), the 1931 bungalow with its Model A (`desktop/R17`) and the animals (`crops/R15-pen`) sit around CAL-A level. The people still drag the whole build down. Front views are a readable but generic chibi template: one face (grey-ringed eyes, no mouth) on every heir, and hats that still don't read as their kind. Side and back views are broken outright. 1886 townswomen are giant cream bonnet disks on purple sacks with no head, face or shoulders (`desktop/R04`, `desktop/R08`, `desktop/R10`, zoomed in `scratchpad/loop-6/z-r04-npcs.png`). 1955 walkers have huge blue dome heads (`desktop/R06`). 2026 walkers are bobbleheads with no shoulders (`desktop/R19`). In the walk strip the slouch hat still covers the head and most of the torso, which hides the new hip settle (`strips/R13`). Lighting has improved: night lamps now fall off through an on-grid dither (`desktop/R05`). But the dither lays a checker mesh over the sprites, and dusk and evening are close to flat (`desktop/R06`, `desktop/R07`). The UI is crisp, integer-scaled and changes colour per era. Its panels are still flat boxes, and the phone UI shows keyboard hints. Five categories sit below the gate of 7, and characters is the furthest off.

Measured: the art grid is a 2-screen-px pitch (640×400 art) on buildings and sprites, and every edge in the player box falls on even x. Grass, ground and water texture are built from 2×2 art-px clusters (run lengths of 4, 8, 12 screen px in `desktop/R03` grass against 2 and 4 on sprites and buildings). So terrain reads at half the detail density of everything standing on it.

## Scores

### 1. pixel — 6.5
- Good: one grid with no resampling. Buildings have clean dark outlines, shingle and brick coursing, and warm-to-cool ramps (`crops/R04-row`, `crops/R19-row`, about CAL-A 7.5 on buildings alone). Crops are crisp with readable stage silhouettes (`crops/R03-field`).
- Against it:
  - Terrain cluster scale is double the sprite scale (2×2 art-px blocks), so the grass in `desktop/R03`, `desktop/R15` and `desktop/R02` and the water caustics in `desktop/R07` read as uniform speckle over 50–75 % of each frame. That is the anchor's "5": noisy ground clusters.
  - The Blender-rendered bonnets on NPCs are pillow-shaded disks with a single dark seam and no form outline (`desktop/R04`, `z-r04-npcs.png`), a different family from the hand-clustered buildings.
  - Stray pale 1-art-px columns hang below the skirt hems on Nora and Ada (`crops/R04-player`, `crops/R16-player`).
  - At night the ordered dither runs straight through sprite pixels (`crops/R05-player`).
- Below CAL-B (8.5), which keeps ground and sprites on one cluster language.

### 2. characters — 5.0
- Checklist, front views:
  - Hattie passes: white cap, white dress, skin 4 (`crops/R11-npcs`).
  - Walt mostly passes: blue short cap, light jersey, dark knickers (`crops/R11-npcs`).
  - Josiah: grey beard, olive hunting shirt, but a plain grey cap with no fur or tail (`crops/R16-npcs`). 4/5 at best.
  - Margaux: blue shirt, brown skirt, but the red scarf reads as red hair (`crops/R16-npcs`).
  - Ezra is labelled but hidden behind the player (`desktop/R16`).
  - Caleb's "slouch hat" reads as a flat newsboy cap with no wide brim (`crops/R03-player`, `crops/R09-player`, `crops/R15-player`).
  - Ray's fedora reads as a grey round dome, with no pinched crown or snapped brim (`crops/R05-player`, `crops/R17-player`).
  - Nora's sun bonnet is a shallow cream cap that doesn't project or frame the face (`crops/R04-player`).
  - June Vale has no ponytail and reads bald-domed (`crops/R06-player`).
  - Sam's cap passes (`crops/R07-player`).
- Every heir shares one face and body, recoloured.
- Side and back views fail outright: bonnet disks larger than the body with no head (`desktop/R04`, `desktop/R08`, `desktop/R10`), blue dome heads (`desktop/R06`, `z-r06-npcs.png`), shoulderless carrot bodies (`desktop/R19`, `z-r19-npcs.png`). Augustin from behind is a white blob (`crops/R11-npcs`).
- Good: the expression change at the hoe impact (`strips/R14` frame 4), and the cows, goat and hens (`crops/R15-pen`).
- Well below CAL-A (6.5), whose townsfolk at least keep human proportions from every side.

### 3. environment — 6.5
- Good:
  - Rich, era-specific buildings: 1871 board-and-batten false fronts (`desktop/R09`), the 1886 Row (`desktop/R04`), 2026 market pavilion and herringbone brick (`desktop/R19`).
  - Props with contact shadows: wagon, pump, crate, hay (`desktop/R13`, `desktop/R17`).
  - Crops show every growth stage (`crops/R03-field`).
  - Snow-capped roofs (`desktop/R10`).
- Against it:
  - Farm and lake screens are mostly empty fill. `desktop/R03` is about 70 % bare grass. `desktop/R07` is about 75 % open water with a repeating caustic diamond and no shoreline dressing, reeds, boats or birds.
  - The town block layout (bench, barrels, lamp spacing, street grid) is identical from 1886 to 2026 (`desktop/R04` vs `desktop/R05`, `desktop/R06`, `desktop/R19`).
  - The 1871 and 1931 farmyards share crate, path, fence and trough positions exactly (`desktop/R13` vs `desktop/R17`).
  - Tall crops fuse into one continuous column (`crops/R03-field`).
- Below CAL-A (8), whose farm screens are dense from edge to edge.

### 4. lighting — 6.0
- Good:
  - 1931 night is the best frame. Five-globe lamps light the brick, windows glow, and the neon CLUB sign tints (`desktop/R05`, `mobile/R05`). The falloff is on-grid at 2 px (`z-r05-lamp.png`), which meets the 7-anchor requirement that light respect the grid.
  - Rain darkens and streaks (`desktop/R09`). Snow is cold and bright (`desktop/R10`).
- Against it:
  - The dither checker is laid over sprites and facades as a visible mesh (`crops/R05-player`, `z-r05-lamp.png`). Lamps cast no shadows.
  - Dusk at 19:10 is a faint tint with the lamps unlit (`desktop/R06`). The 18:20 lake evening has no warm low sun at all (`desktop/R07`).
  - Fog is one uniform grey dithered wash that blanks the springs on the right half (`desktop/R08`).
  - People have no contact shadow (`crops/R03-player`, `crops/R17-player`) while props do.
  - Rain has no puddles or splashes.
- Matches CAL-A (5.5) and exceeds it at night, but stays below CAL-B (7).

### 5. animation — 5.5
- Walk (`strips/R13`, `strips/R13-mobile`): stride poses differ, with legs apart in 1–2, passing in 3–4, and a long stride in 7–8, plus a red sleeve swinging. But the slouch-hat disk covers head, shoulders and torso in the side view, so the claimed 2/1/0 hip settle can't be seen. No face shows, no hat bob, no secondary motion. A lamp post covers the legs in frames 1–6.
- Hoe (`strips/R14`): raised in 1–2, coming over in 3, striking in 4, then held in 5–8. The body column never leans, crouches or recovers, and the hands don't visibly grip the handle. Frames 5–8 are nearly identical. The new dust puffs are low-contrast tan blobs inside the soil tile, not rising above it.
- Good: the squint on impact (frame 4).
- Between the 5 anchor ("tools 2–3 frame swing with no anticipation") and 7. The walk is closer to 6 than the hoe is.

### 6. ui — 6.5
- Good: the 5×7 pixel face is integer-scaled and crisp on desktop and phone (`desktop/R11`, `z-r11-dlg.png`, `mobile/R11`). The palette changes per era: green 1807 (`desktop/R02`), cream 1886 (`desktop/R04`), navy and gold 1931 (`desktop/R12`), blue 2026 (`desktop/R19`). The new HUD pixel icons are coherent. The title wordmark is clean (`desktop/R01`, `mobile/R01`).
- Against it:
  - Panels are flat fills with a 1-px line, not material nine-slices (`desktop/R12`, `desktop/R18`), against the wooden frame in stardew-5 (7.5).
  - The portrait is tiny with a smudge face (`z-r11-dlg.png`).
  - The phone shows "Close Esc" (`mobile/R12`).
  - Slot numbers collide with icons, so slot 5 reads "57" (`mobile/R02`, `mobile/R04`).
  - A sun glyph shows at 21:30 (`desktop/R05`).
  - NPC name tags overlap each other and the sprites (`desktop/R16`, `crops/R11-npcs`).

### 7. readability — 6.5
- Good: the player and interactables pop in daylight (`desktop/R04`, `mobile/R04`). Ripe crops carry white sparkle markers (`crops/R03-field`). 1931 night stays playable on the phone (`mobile/R05`). Phone text is about 10 CSS px or more (`mobile/R11`).
- Against it:
  - A lamp-post lantern sits squarely over Nora's face and chest (`crops/R08-player`).
  - The water trough is drawn over Caleb's hat (`crops/R15-player`).
  - The tilled tile is drawn over the skirt hem (`strips/R14` frames 4–8).
  - Side-view NPCs don't read as people (`desktop/R04`, `desktop/R06`).
  - Fog hides the spring props (`desktop/R08`).
  - Overlapping name tags (`desktop/R16`).
- Below CAL-A (8.5).

### 8. authenticity — 7.0
- Six eras sort blind on architecture alone:
  - 1807: log cabin and canvas trade camp (`desktop/R02`, `desktop/R16`).
  - 1871: board-and-batten bathhouses with a Stage office and Drugs (`desktop/R09`).
  - 1886: Second Empire Row and grand hotel (`desktop/R04`).
  - 1931: Quapaw, Ozark, Superior and Hale named, five-globe lamps (correct for 1929 on), neon club, bungalow and Model A (`desktop/R05`, `desktop/R17`).
  - 1955: motor hotel, drive-in, hydrant (`desktop/R06`).
  - 2026: brewery, cultural centre, farmers market, solar panels (`desktop/R19`).
- Against it:
  - Clothing lags: the slouch hat and fedora are misread (`crops/R03-player`, `crops/R05-player`). Josiah's fur cap is missing (`crops/R16-npcs`).
  - The 1955 Row is the 1931 facades with new signs.
  - The 1871 bathhouses are already two-storey porched Victorians.

## Ranked gaps
1. **G-npc-side-back-views** (characters, WS2, sev 5, M, +1.0)
   - Problem: side and back NPC sprites are malformed: bonnet disks larger than the body with no head, blue dome heads, shoulderless bobblehead bodies (`desktop/R04`, `desktop/R06`, `desktop/R19`).
   - Fix: give side and back views the same head:body ratio and shoulder line as the front view. Clamp hat size to at most 1.2× head width. Re-bake the bonnet and helmet hats per facing so the head and face edge show.
2. **G-hat-silhouettes** (characters, WS2, sev 4, M, +0.5)
   - Problem: the slouch hat reads as a flat cap from the front and as a torso-covering disk from the side. The fedora reads as a dome. The sun bonnet is shallow (`crops/R03-player`, `crops/R05-player`, `crops/R04-player`, `strips/R13`).
   - Fix: hand-pixel 3 to 4 hat silhouettes per facing at 1×. Slouch: wide brim shown as a thin dark ellipse that breaks the head outline. Fedora: pinched crown notch and a band. Bonnet: a deep brim tunnel around the face.
3. **G-face-template** (characters, WS2, sev 3, M, +0.5)
   - Problem: one face with no mouth on every person.
   - Fix: add a mouth pixel, brows, and per-person hair and face accents (beard, glasses, a ponytail for June).
4. **G-ground-cluster-scale** (pixel, WS1/WS3, sev 3, M, +0.5)
   - Problem: grass, ground and water are drawn in 2×2 art-px clusters, half the sprite density (`desktop/R03`, `desktop/R07`).
   - Fix: redraw terrain tiles at 1 art px with fewer, larger deliberate clumps and two or three tones, as in CAL-A grass.
5. **G-sparse-farm-lake** (environment, WS3, sev 3, M, +0.5)
   - Problem: the R03, R07 and R02 screens are mostly empty, and town and farm layouts repeat across eras.
   - Fix: add stumps, rocks, tall grass, fence runs, reeds, lily pads, a boat and birds. Vary the street furniture by era.
6. **G-dither-over-sprites** (lighting, WS4, sev 3, S, +0.5)
   - Problem: the light and fog dither checker crosses sprite pixels (`crops/R05-player`).
   - Fix: light sprites with one palette-ramp step instead of dithering them, keeping the dither for ground and walls. Add a 1-px warm rim on the lamp side.
7. **G-dusk-evening-flat** (lighting, WS4, sev 3, S, +0.5)
   - Problem: dusk and evening barely differ from day (`desktop/R06`, `desktop/R07`).
   - Fix: switch lamps on from dusk, add a warm low-sun gradient banded on-grid, and stretch shadows long.
8. **G-depth-sort** (readability, WS1, sev 3, S, +0.5)
   - Problem: a ground decal is drawn over the skirt (`strips/R14`), the trough over the hat (`crops/R15-player`), and a lantern over the face (`crops/R08-player`).
   - Fix: sort by foot Y. Decals always go under actors. Thin occluders in front of the face get the silhouette treatment.
9. **G-hoe-body-motion** (animation, WS5, sev 3, M, +0.5)
   - Problem: only the tool moves (`strips/R14`).
   - Fix: add a 1-px crouch on wind-up, a forward lean at the strike, a 2-frame hit-stop, and dust that rises above the tile edge in a lighter value.
10. **G-walk-visibility** (animation, WS5, sev 3, S, +0.5)
    - Problem: the hip settle and arm swing are hidden under the hat (`strips/R13`).
    - Fix: shrink the side-view hat and add a 1-px hat bob and a hem or coat swing.
11. **G-ui-panel-material** (ui, WS6, sev 2, M, +0.5)
    - Problem: panels are flat boxes (`desktop/R12`, `desktop/R18`), the phone shows "Esc" (`mobile/R12`), slot numbers overlap icons (`mobile/R02`), a sun shows at night (`desktop/R05`), and the portrait is tiny.
    - Fix: per-era nine-slice frames, hide key hints on touch, inset the slot numbers, use a moon glyph at night, and enlarge the portrait to 2×.
12. **G-label-overlap** (readability, WS6, sev 2, S, +0.5)
    - Problem: NPC name tags collide (`desktop/R16`, `desktop/R11`).
    - Fix: stack or offset the tags, or show only the nearest NPC's tag.
13. **G-actor-shadows** (lighting, WS4, sev 2, S, +0.3)
    - Problem: people have no contact shadow, while props do (`crops/R03-player`).
    - Fix: give people the same dark ellipse that props have.

```json
{
  "loop": 6,
  "role": "critic-claude",
  "tier": "T32",
  "scores": {
    "pixel": {"score": 6.5, "confidence": 0.7, "evidence": [
      {"shot": "crops/R04-row", "note": "clean building clusters, outlines, hue-shifted ramps ~CAL-A"},
      {"shot": "crops/R19-row", "note": "tile roofs and stucco clean"},
      {"shot": "desktop/R03", "note": "grass drawn in 2x2 art-px clusters, half sprite density; speckle across most of frame"},
      {"shot": "desktop/R07", "note": "water caustic pattern repeats over 75% of frame"},
      {"shot": "crops/R04-player", "note": "stray pale columns below skirt hem"},
      {"shot": "crops/R05-player", "note": "night dither runs through sprite pixels"}
    ]},
    "characters": {"score": 5.0, "confidence": 0.75, "evidence": [
      {"shot": "crops/R11-npcs", "note": "Hattie passes; Walt mostly; Augustin from behind a white blob"},
      {"shot": "crops/R16-npcs", "note": "Josiah lacks fur cap; Margaux scarf reads as hair; Ezra hidden"},
      {"shot": "crops/R03-player", "note": "slouch hat reads as flat cap"},
      {"shot": "crops/R05-player", "note": "fedora reads as grey dome; same face template"},
      {"shot": "crops/R04-player", "note": "sun bonnet shallow, does not frame face"},
      {"shot": "desktop/R04", "note": "townswomen side/back: bonnet disks bigger than body, no head"},
      {"shot": "desktop/R06", "note": "1955 walkers with giant blue dome heads"},
      {"shot": "crops/R15-pen", "note": "animals good"}
    ]},
    "environment": {"score": 6.5, "confidence": 0.7, "evidence": [
      {"shot": "desktop/R04", "note": "dense era buildings, but repeated block layout"},
      {"shot": "desktop/R09", "note": "1871 board-and-batten fronts"},
      {"shot": "desktop/R03", "note": "~70% bare grass"},
      {"shot": "desktop/R07", "note": "~75% open water, no shore dressing"},
      {"shot": "crops/R03-field", "note": "all crop stages, tall crops fuse into columns"},
      {"shot": "desktop/R17", "note": "bungalow, Model A, hay; same yard layout as desktop/R13"}
    ]},
    "lighting": {"score": 6.0, "confidence": 0.7, "evidence": [
      {"shot": "desktop/R05", "note": "five-globe lamps, windows, neon; on-grid dither falloff; dither mesh over sprites; no lamp shadows"},
      {"shot": "desktop/R06", "note": "dusk nearly flat, lamps unlit"},
      {"shot": "desktop/R07", "note": "evening with no warm low light"},
      {"shot": "desktop/R08", "note": "fog a uniform grey wash hiding springs"},
      {"shot": "desktop/R09", "note": "rain reads, no puddles"},
      {"shot": "crops/R03-player", "note": "no actor contact shadow"}
    ]},
    "animation": {"score": 5.5, "confidence": 0.65, "evidence": [
      {"shot": "strips/R13", "note": "distinct stride poses but hat disk hides torso, hip settle and face; no secondary motion"},
      {"shot": "strips/R13-mobile", "note": "same cycle at phone scale"},
      {"shot": "strips/R14", "note": "hoe raise/strike/hold; body static, frames 5-8 near identical, dust low-contrast inside tile; squint on impact"}
    ]},
    "ui": {"score": 6.5, "confidence": 0.7, "evidence": [
      {"shot": "desktop/R11", "note": "integer pixel font, clear hierarchy; tiny portrait"},
      {"shot": "mobile/R11", "note": "phone text crisp and wrapped"},
      {"shot": "desktop/R12", "note": "flat box panel, era palette"},
      {"shot": "mobile/R12", "note": "Close Esc hint on touch"},
      {"shot": "mobile/R02", "note": "slot numbers collide with icons ('57')"},
      {"shot": "desktop/R18", "note": "shop clean but plain"}
    ]},
    "readability": {"score": 6.5, "confidence": 0.65, "evidence": [
      {"shot": "mobile/R04", "note": "player and buildings clear on phone"},
      {"shot": "mobile/R05", "note": "night playable on phone"},
      {"shot": "crops/R08-player", "note": "lantern covers Nora's face"},
      {"shot": "crops/R15-player", "note": "trough drawn over hat"},
      {"shot": "desktop/R16", "note": "name tags overlap; Ezra hidden"},
      {"shot": "crops/R03-field", "note": "ripe sparkle markers"}
    ]},
    "authenticity": {"score": 7.0, "confidence": 0.65, "evidence": [
      {"shot": "desktop/R16", "note": "1807 trade camp tents, log cabin"},
      {"shot": "desktop/R09", "note": "1871 frame bathhouses, stage, drugs"},
      {"shot": "desktop/R05", "note": "1931 named Row houses, five-globe lamps, neon club"},
      {"shot": "desktop/R06", "note": "1955 motor hotel, drive-in, hydrant; Row facades reused"},
      {"shot": "desktop/R19", "note": "2026 brewery, cultural centre, market, solar"},
      {"shot": "crops/R03-player", "note": "slouch hat misread; clothing lags architecture"}
    ]}
  },
  "gaps": [
    {"id": "G-npc-side-back-views", "category": "characters", "expectedGain": 1.0, "severity": 5, "effort": "M", "workstream": "WS2", "evidence": ["desktop/R04", "desktop/R06", "desktop/R19", "desktop/R08"], "benchmark": "chained-5.jpg", "fix": "Rebuild side/back NPC views with the front view's head:body ratio and shoulder line; clamp hats to <=1.2x head width; re-bake bonnets/helmets per facing so head and face edge show."},
    {"id": "G-hat-silhouettes", "category": "characters", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS2", "evidence": ["crops/R03-player", "crops/R05-player", "crops/R04-player", "strips/R13"], "benchmark": "stardew-1.jpg", "fix": "Hand-pixel per-facing hat silhouettes: slouch wide thin brim breaking the head outline, fedora pinched crown + band, deep bonnet tunnel around face."},
    {"id": "G-face-template", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS2", "evidence": ["crops/R06-player", "crops/R16-npcs"], "benchmark": "seastars-2.jpg", "fix": "Add mouth pixel, brows, and per-person hair/face accents (beards, glasses, ponytail)."},
    {"id": "G-ground-cluster-scale", "category": "pixel", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R07", "desktop/R15"], "benchmark": "stardew-1.jpg", "fix": "Redraw grass, ground and water at 1 art px with fewer deliberate clumps and 2-3 tones to match sprite density."},
    {"id": "G-sparse-farm-lake", "category": "environment", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R03", "desktop/R07", "desktop/R17"], "benchmark": "stardew-1.jpg", "fix": "Dress empty fields and lake (stumps, tall grass, reeds, boats, birds) and vary street furniture and yard layout by era."},
    {"id": "G-dither-over-sprites", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["crops/R05-player", "desktop/R05", "desktop/R08"], "benchmark": "seastars-2.jpg", "fix": "Light sprites with palette-ramp steps and a 1-px warm rim instead of the dither checker; keep dither for ground and walls."},
    {"id": "G-dusk-evening-flat", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS4", "evidence": ["desktop/R06", "desktop/R07"], "benchmark": "seastars-2.jpg", "fix": "Lamps on from dusk, warm banded low-sun tint, longer shadows at evening."},
    {"id": "G-depth-sort", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS1", "evidence": ["strips/R14", "crops/R15-player", "crops/R08-player"], "fix": "Sort by foot Y, draw ground decals under actors, give thin occluders over the face the silhouette treatment."},
    {"id": "G-hoe-body-motion", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14"], "fix": "Add 1-px crouch on wind-up, forward lean on strike, 2-frame hit-stop, and dust rising above the tile in a lighter value."},
    {"id": "G-walk-visibility", "category": "animation", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS5", "evidence": ["strips/R13", "strips/R13-mobile"], "fix": "Shrink side-view hat so torso settle and arm swing show; add 1-px hat bob and hem/coat swing."},
    {"id": "G-ui-panel-material", "category": "ui", "expectedGain": 0.5, "severity": 2, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R12", "desktop/R18", "mobile/R12", "mobile/R02", "desktop/R05"], "benchmark": "stardew-5.jpg", "fix": "Per-era nine-slice frames, hide key hints on touch, inset slot numbers, moon glyph at night, 2x portrait."},
    {"id": "G-label-overlap", "category": "readability", "expectedGain": 0.5, "severity": 2, "effort": "S", "workstream": "WS6", "evidence": ["desktop/R16", "desktop/R11"], "fix": "Stack/offset NPC name tags or show only the nearest one."},
    {"id": "G-actor-shadows", "category": "lighting", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS4", "evidence": ["crops/R03-player", "crops/R17-player"], "fix": "Give people the same contact-shadow ellipse props have."}
  ],
  "verdict": "continue"
}
```
