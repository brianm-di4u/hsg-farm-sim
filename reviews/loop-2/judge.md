# Judge: loop 2, tier T16

## Hard gates

| Gate | Status | Evidence |
|---|---|---|
| All tests green | **Met** | `GATES.md`: pixel suite 88/88. The painted suite was 87/88; its one failure was a mobile fps reading taken while the GPU capture was running, and run again alone it passed 2/2. That is a re-run on a quiet machine, which is what loop 1's ruling asked for |
| Pixel integrity on every capture | **Met** | `screenshots/review-loop-2/shots.json`: `integrity.ok: true`, 0 bad frames out of 25, maxBad 0.004 |
| Performance budget (`research/pixel-budget.md`) | **Met** | `perf.json`: desktop GPU min 262.5 fps (floor 58). Phone 4× min 53.2 fps (floor 30), worst p95 42.8 ms (cap 50). Phone 6× min 68.8 fps (floor 24). Heap ≤ 18.4 MB (cap 40). Logged, not gated: a 280 ms worst frame on the 6× lake. The 145 ms worst frame on the 4× springs is under the 150 ms logging line |

All hard gates hold, so this loop is scored. Codex's "provisional pending verification" caveat is dropped; the advocate is right that `GATES.md` settles it.

## Disputes I checked myself

No category has the critics more than 1.0 apart; the widest spread is 0.5. I still opened every capture where the advocate disputed a fact, plus the strips.

| Claim | Capture checked | Ruling |
|---|---|---|
| 1931 signs clip ("IPERI", "UAPA"), so the 3×5 font or board is too small (A) | `desktop/R05`, `desktop/R06` | **Advocate right.** In R06 the same boards read SUPERIOR, QUAPAW, OZARK and HALE in full. In R05 a faint "R" sits just outside the lit area on the Superior board, so the night glow mask is narrower than the board. This is a lighting defect, not pixel craft |
| "TRAD" is a board that's too small (A) | `desktop/R16`, `crops/R16-npcs` | **Advocate mostly right.** The "Margaux" label begins exactly where the E would be. Either way, the fix is label de-collision |
| The towns have no hitching posts or street props (A) | `desktop/R04`, `desktop/R09`, `mobile/R04` | **Advocate right.** Lantern and hitching posts stand at every door and along both street edges, and every 1886 facade has a planter. It is one post sprite repeated, and the towns still have no people, vehicles, benches or barrels |
| The 1931 Row "cannot be seen at all" (A) | `desktop/R05`, `mobile/R05` | **Advocate right on the fact.** Gables, roof lines and arched window grids show at a very low value. For play it hardly matters, because doors and entrances can't be picked out on the phone |
| There is no warm light at dusk (A) | `desktop/R06` | **Advocate right.** The Row windows glow warm at 19:10. The street lamps are off and there are no long shadows |
| There is no impact burst on the hoe (B) | `strips/R14` frames 4–5 | **Advocate right; Codex wrong.** A grey chip of about 3 art px flies off right of the blade in frame 4 and again higher in frame 5. A's "at most 2–3 px" is accurate |
| The lamp post is opaque over the player in frames 1–6 (A) or 1–4 (advocate) | `strips/R13` | **A closer.** The post is fully opaque across the player in 1–4 and still overlaps the player's left edge, opaque, in 5–6. The see-through rule in `CHANGES.md` doesn't fire here |
| Margaux has the scarf (B) / a salmon covering (advocate) / no red scarf (A) | `crops/R16-npcs` | **A right on the checklist.** Her crown is a rounded light-brown dome, a shade rosier than her hair, with no knot and no red. The checklist item fails. Codex's "has the scarf" is too generous |
| Hattie wears a brown hat (A) / a headband (B) | `crops/R11-npcs` | **Both partly right.** A white band sits on a brown crown. It doesn't read as the checklist cap |

### New findings (missed or misattributed by all three)

1. **The "dead animal prop" is the ox, rendered on its side.** In `desktop/R13` and `desktop/R15`, the brown body with white socks, a horned head at its right end and a yoke-shaped object beside it is the ox actor rotated about 90°. Loop 1's ruling recorded the same ox leaning about 30°. **Augustin is still tilted about 30°** in `desktop/R11` and `mobile/R11`; A calls him a "faceless white column", but the column is leaning. One actor-rotation bug, not two art defects. It costs characters and environment, and it is cheap to fix.
2. **Two loop-2 changes are claimed but don't show in the captures.**
   - The tool action is described as "five held poses matching the body". In `strips/R14` frames 1–5 the body is pixel-identical and only the tool sprite changes.
   - Chimney smoke "on cool mornings … winter days" is absent at 07:50 in rain (`desktop/R02`) and on a winter day at 10:40 (`desktop/R10`).
   - The bonnet "framing the face" is also not visible: in `crops/R04-player` the brim is a tan band at the brow.
3. **Capture coverage is costing evidence.**
   - R14 ("hoe swing on the field") was captured on grass next to the campfire, so no tilled tile can show.
   - No character close-up has the reference sheet that the brief promises beside it (A and the advocate both noted this).
   - The only 2026 capture is the lake, so the restored Row and "Hotel Hale" are never seen.
   - R02 ("spring morning") is in rain.

   The capture script should fix all four before loop 3.

## Rulings per category

### 1. pixel: 6.0 (A 6.0, B 5.5, advocate 6.0)
**Meets the 7 descriptor:**
- The buildings in `crops/R04-row` and `desktop/R04` have one dark outline, readable mansard, dormer and brick clusters, and coherent per-era palettes.
- The same is true of the animals in `crops/R15-pen` and the crop tiles in `crops/R03-field`.

**At the 5 anchor:**
- **Ground.** Grass, cobble and snow are per-pixel confetti in three or four close values (`crops/R04-player`, `crops/R03-field`, `desktop/R10`). Beside `stardew-1.jpg` (CAL-A, 7.5), whose ground is a calm fill with sparse hand-placed tufts, the difference is obvious.
- **Characters.** They use flat two- or three-tone fills and a brown outline, next to four- or five-step building ramps (`crops/R04-player`). That gives two asset families.
- **Stray highlights.** The corn and wheat columns still carry stray cream specks (`crops/R03-field`).
- **Title.** The title art is a downscaled painting (`desktop/R01`).

Half the asset families now meet 7 and the terrain, which fills most of every frame, sits at 5. **6.0.** The sign "clipping" is not counted here (see disputes).

### 2. characters: 4.5 (A 4.5, B 5.0, advocate 5.0)
Checked against `research/refs/characters.md`; no capture has the reference sheet beside it.

**Every person fails two or more checklist items:**
- **Nora** (`crops/R04-player`): a dome bonnet with its brim at the brow, and blue only at the shoulders.
- **Caleb** (`crops/R03-player`): a banded dome, not a slouch brim.
- **Ray** (`crops/R05-player`, `desktop/R17`): a grey dome, not a fedora.
- **Ada** (`crops/R16-player`): khaki hair and a knee-length apron.
- **Margaux** (`crops/R16-npcs`): no red scarf.
- **Josiah:** his cap doesn't read as fur.
- **Ezra:** hidden inside the tent.

**Other defects:**
- Walt, Augustin and Hattie face away during dialogue (`crops/R11-npcs`).
- Augustin is still tilted (`desktop/R11`, `mobile/R11`), and the ox lies on its side (`desktop/R15`).
- Every head is the same dome, and every face is two dark columns either side of a nose block.

**Improvements:**
- The pen animals are clearly better than loop 1: the cows, goat and hens have clean silhouettes and contact shadows (`crops/R15-pen`), and the hens are no longer heart shapes.

The 5 anchor allows "1–2 checklist misses per person"; this cast misses more, and two actors render broken. The animal gains offset the ox regression. **4.5.**

### 3. environment: 6.0 (A 6.0, B 6.0, advocate 6.0)
**Construction reads:**
- The buildings show how they are built: log courses (`desktop/R02`), board-and-batten and false fronts (`desktop/R09`), Second Empire mansards (`desktop/R04`), Craftsman knee-braces and a 1920s truck (`desktop/R17`), and the drive-in and motor hotel (`desktop/R06`).
- Crops read in five stages at one scale (`crops/R03-field`).
- The pen fence joins (`desktop/R15`).
- The display spring is a good new sprite (`desktop/R08`).

**Dressing is thin:**
- **Towns.** No people or vehicles, only the repeated post sprite (`desktop/R04`, `desktop/R09`).
- **Farms.** The lower halves are empty speckle grass (`desktop/R13`, `desktop/R17`).
- **Lake.** About 80% of `desktop/R07` is water with a visible diagonal repeat, and the pier has no posts.

**Broken or placeholder objects:**
- A blank white rounded rectangle on the 1871 cabin (`desktop/R13`, every frame of `strips/R13`).
- A box-shaped dog at the springs (`desktop/R08`).
- The ox lying flat (`desktop/R13`).

Against CAL-A (8) this is "competent buildings, sparse dressing". **6.0.**

### 4. lighting: 5.5 (A 5.0, B 5.5, advocate 5.5)
**Above the 5 anchor:**
- Pool edges are stepped on the art grid (`crops/R05-player`).
- Light sources match the era: five-globe clusters in 1931 (`desktop/R05`) and curved arm lamps in 1955 (`desktop/R06`).
- Row windows glow warm at dusk (`desktop/R06`).
- Snow roofs follow each building (`desktop/R10`).

**Below 7:**
- **1931 night.** Facades sit near black and the pools are identical overlapping ellipses on a grid. A bright horizontal seam runs at the street edge, once in `desktop/R05` at y≈455 and twice in `mobile/R05`.
- **Fog.** One milky veil over everything, the player included (`desktop/R08`).
- **2026 evening.** No golden light (`desktop/R07`).
- **Rain.** No splashes (`desktop/R09`).
- **Shadows.** Buildings and characters cast almost none.

On-grid, era-correct light lifts this above 5. Crushed night values and flat weather keep it well under 7. **5.5.**

### 5. animation: 5.0 (A 5.0, B 5.5, advocate 5.5)
**Walk** (`strips/R13`, `strips/R13-mobile`):
- About four distinct leg poses, with a stride in frames 7–8.
- No arm swing and no head bob; the dome hat stays rigid.

**Hoe** (`strips/R14`):
- The tool has a real five-pose arc and a small impact chip in frames 4–5.
- The body is the same frame throughout 1–5, so the tool rotates over a statue, and it covers her face in frames 1–2.
- No tilled tile appears in 6–8, and the swing lands on grass beside the campfire (`desktop/R14`).

**Ambient:**
- None in any capture: no smoke, no water motion, no NPC idles.

The 7 descriptor's "wind-up, impact and settle" is met by the tool sprite alone. A body that doesn't move, the missing result and the absent ambient life hold this at the 5 anchor. **5.0.**

### 6. ui: 6.0 (A 5.5, B 6.0, advocate 6.0)
**What works:**
- DotGothic16 body text and Silkscreen headings are crisp and integer-scaled on both viewports (`desktop/R12`, `mobile/R11`).
- Loop 1's misprinted glyphs are fixed: "1955" in `desktop/R06` and "2026 18:20" in `desktop/R07` read correctly.
- Every era has a consistent colour theme, and hierarchy is clear.

**What doesn't:**
- Panels are flat CSS rectangles with web-form "Buy / x5 / Close Esc" buttons (`desktop/R18`).
- The Hen icon is an empty oval and Hardware is a gear (`desktop/R18`).
- Slot numbers print over the icon art (`desktop/R12`).
- The dialogue portrait is small (`desktop/R11`, `mobile/R11`).
- The title is a smooth serif (`desktop/R01`).

The 7 descriptor's font and focus criteria are met; its frame and icon criteria are not. **6.0.**

### 7. readability: 6.0 (A 6.0, B 6.0, advocate 6.0)
**What works:**
- The target bracket always finds the player (`desktop/R03`, `mobile/R04`, `mobile/R05`).
- Phone text is comfortably legible (`mobile/R04`, `mobile/R11`).
- The cabbage column shows five distinct stages (`crops/R03-field`).

**What doesn't:**
- The phone HUD takes the top ~26% of the screen (`mobile/R04`), and dialogue takes the bottom ~45% (`mobile/R11`).
- Doors and buildings vanish at night (`mobile/R05`), and fog halves contrast on the gameplay layer (`desktop/R08`).
- Mature bean tiles merge (`crops/R03-field`).
- Ezra is hidden (`desktop/R16`).
- The post covers the player (`strips/R13`).

I agree with the advocate that NPC sameness belongs under characters, not here. **6.0.**

### 8. authenticity: 6.5 (A 6.0, B 6.5, advocate 6.5)
**The buildings would sort blind across five eras:**
- 1807: log cabin and patched trade tents (`desktop/R02`, `desktop/R16`).
- 1871: weathered board-and-batten and false fronts (`desktop/R09`).
- 1886: brick and frame mansards and the grand hotel (`desktop/R04`).
- 1931: Craftsman bungalow, 1920s pickup and five-globe lamps (`desktop/R17`, `desktop/R05`).
- 1955: real Row names, drive-in and motor hotel (`desktop/R06`).

Five-globe clusters and real Row names are 9-anchor detail.

**What fails:**
- Clothing fails the checklist (see characters).
- 2026 has no modern cue on screen (`desktop/R07`).
- Flower boxes bloom in the snow (`desktop/R10`).

Above the 6 gate, short of 7 because 7 requires the clothing to pass. **6.5.**

**Total: 45.5 / 80** (loop 1: 39.0). Authenticity meets its gate; the other seven categories do not. **Verdict: continue.**

## Ranked gaps (top 12, by expected gain ÷ effort; S = 1, M = 2, L = 4)

Merged duplicates:
- A's headwear gap and B's character-construction gap.
- A's ground gap and B's texture-hierarchy gap.
- A's night facades and B's value separation (night part).
- A's empty towns and B's inhabited environments.
- A's tool feedback and B's motion and contact.
- A's UI material and B's UI art language.
- A's and B's phone HUD items.
- The weather and fog items.

Corrected causes:
- The "sign clipping" is the night glow mask plus a label overlap.
- The "dead-animal prop" is the ox actor's rotation bug.

Out of the top 12: G-2026-era-signals (authenticity is already at its gate) and G-era-lived-detail (mostly covered by G-town-life-dressing).

1. **G-night-facade-value-floor**: lighting, WS4. Gain +1.0, severity 4, effort M.
   - **Fix:** clamp re-darkened facades to at least 35% value under a cool moon ramp, with trim and doors one step lighter.
   - Widen each sign's glow mask to its whole board.
   - Draw lamp pools as 2–3 banded steps in at least 3 footprint shapes.
   - Remove the horizontal seam at the street edge.
   - **Test:** mean luminance of each facade bbox ≥ 0.30 in R05, and no row in R05 or mobile/R05 brighter than its neighbours by > 20/255 across > 50% of the width.
   - **Evidence:** `desktop/R05`, `mobile/R05`.
2. **G-ground-texture-calm**: pixel, WS3. Gain +1.0, severity 4, effort M.
   - **Fix:** re-author the grass, cobble, snow and water tiles as a 2-tone base (ΔL ≤ 6), plus hand-placed 3–6 px clusters (tufts, pebbles, cobble outlines, wave crests) covering 10–15% of pixels.
   - Break water repetition with at least 4 tile variants.
   - **Test:** isolated single-pixel ratio (pixels whose 8 neighbours all differ) < 5% per terrain tile.
   - **Evidence:** `crops/R04-player`, `crops/R03-field`, `desktop/R10`, `desktop/R07`.
   - **Benchmark:** `stardew-1.jpg`, `chained-5.jpg`.
3. **G-tool-body-poses**: animation, WS5. Gain +1.0, severity 4, effort M.
   - **Fix:** five distinct body frames per direction that match the tool poses (arms raised, torso lean, impact crouch, recoil); keep the tool behind the head in the wind-up.
   - A 6–10 px soil burst over 2–3 frames, with 1–2 frames of hit-stop.
   - The tile becomes tilled on the impact frame.
   - A 6-frame walk with arm swing and a 1-px head bob.
   - Recapture R14 on an untilled field tile.
   - **Test:** body pixels differ between every pair of frames 1–5.
   - **Evidence:** `strips/R14`, `strips/R13`, `desktop/R14`.
4. **G-actor-upright-render**: characters, WS2. Gain +0.5, severity 3, effort S.
   - **Fix:** find the shared rotation or lean applied to actors and force rotation to 0 for idle NPCs and animals.
   - Draw the ox standing.
   - **Test:** a unit test asserts every actor's draw angle is 0 outside scripted actions.
   - **Evidence:** `desktop/R11`, `mobile/R11`, `desktop/R13`, `desktop/R15`.
5. **G-town-life-dressing**: environment, WS3. Gain +1.0, severity 4, effort M.
   - **Fix:** 3–6 ambient townsfolk and 1–2 era vehicles per town screen (buggies in 1871/1886, cars in 1931/1955).
   - Benches, barrels and crates beside the existing posts, with 1-px contact shadows under every prop.
   - Flowers, rocks and a worn path in the empty lower farm half.
   - Reeds, a boat and pier posts at the lake.
   - **Evidence:** `desktop/R04`, `desktop/R09`, `desktop/R17`, `desktop/R07`.
   - **Benchmark:** `chained-5.jpg`.
6. **G-ui-era-frames-icons**: ui, WS6. Gain +1.0, severity 3, effort M.
   - **Fix:** nine-slice pixel frames per era material instead of CSS borders, and pixel buttons in place of the web-form Buy, x5 and Close buttons.
   - Real Hen and Hardware icons.
   - A dialogue portrait at 2× or more with a name plate.
   - Slot numbers in a corner badge off the icon art.
   - A bitmap title font.
   - **Evidence:** `desktop/R18`, `desktop/R12`, `desktop/R11`, `desktop/R01`.
   - **Benchmark:** `stardew-5.jpg`.
7. **G-npc-facing-and-labels**: readability, WS6. Gain +0.5, severity 3, effort S.
   - **Fix:** turn NPCs to face the player when talking starts.
   - Show only the nearest NPC's label, or de-collide labels so none overlaps a sign or another label (this frees TRADE).
   - Move Ezra's spawn point outside the tent footprint.
   - **Evidence:** `crops/R11-npcs`, `desktop/R16`, `mobile/R11`.
8. **G-headwear-silhouettes**: characters, WS2. Gain +1.5, severity 5, effort L.
   - **Fix:** per-kind hat sprites in four directions whose silhouettes break the head outline:
     - slouch hat with a 2-px brim wider than the head
     - fedora with a pinch notch and snapped brim
     - sun bonnet whose brim surrounds the face
     - knotted red head scarf
     - fur cap with tail
     - soft toque
     - ball cap with a visible bill
   - An ankle-length skirt silhouette for every era before 1955.
   - Checklist hair and hat colours (Ada `#3b2a1c`, Hattie white cap).
   - Eyes separated from the nose block, plus a 1-px mouth.
   - **Test:** each named person passes 4 of 5 checklist items in a grayscale 1× close-up shown beside the reference sheet.
   - **Evidence:** `crops/R04-player`, `crops/R03-player`, `crops/R05-player`, `crops/R16-npcs`, `crops/R16-player`.
9. **G-placeholder-props**: environment, WS3. Gain +0.4, severity 2, effort S.
   - **Fix:** replace the blank white rectangle on the 1871 cabin with a textured board, or remove it.
   - Redraw the box-shaped dog at the springs.
   - Swap the flower boxes for bare or evergreen boxes in winter.
   - **Evidence:** `desktop/R13`, `strips/R13`, `desktop/R08`, `desktop/R10`.
10. **G-occlusion-see-through**: readability, WS1. Gain +0.3, severity 2, effort S.
    - **Fix:** fade any post or lantern prop to 40% alpha while its bbox overlaps the player's.
    - In fog, draw the faded post behind the player, not through the face.
    - **Evidence:** `strips/R13`, `crops/R08-player`.
11. **G-phone-hud-compact**: readability, WS6. Gain +0.5, severity 4, effort M.
    - **Fix:** merge date, money and energy and the three buttons into one 44-CSS-px strip.
    - Collapse goals to a tap-to-expand single line.
    - Cap the dialogue panel at 35% of the viewport height.
    - **Test:** HUD ≤ 12% of a 390×844 viewport.
    - **Evidence:** `mobile/R04`, `mobile/R11`, `mobile/R05`.
12. **G-fog-evening-moods**: lighting, WS4. Gain +0.5, severity 3, effort M.
    - **Fix:** replace the flat fog alpha with 2–3 banded, drifting fog sprites that are thinner within 2 tiles of the player.
    - A warm low-sun ramp and sun glints on water for the 2026 evening.
    - Street lamps on at dusk.
    - Rain splash sprites.
    - Make the claimed chimney smoke appear in winter and morning captures.
    - **Evidence:** `desktop/R08`, `desktop/R07`, `desktop/R06`, `desktop/R10`.

**Capture fixes for loop 3** (not scored gaps; they unblock evidence):
- Shoot R14 on a field tile.
- Composite the reference sheet into every character close-up.
- Add a 2026 restored-Row daytime frame.
- Capture R02 in clear weather.

```json
{
  "loop": 2,
  "role": "judge",
  "tier": "T16",
  "scores": {
    "pixel": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/R04-row", "note": "Buildings meet the 7 descriptor: one dark outline, clean mansard/dormer/brick clusters, coherent era palette"},
        {"shot": "crops/R04-player", "note": "Cobble is per-pixel confetti; character uses flat 2-3 tone fills beside 4-5 step building ramps"},
        {"shot": "crops/R03-field", "note": "Crop tiles clean but stray cream specks in corn/wheat; grass is speckle"},
        {"shot": "crops/R15-pen", "note": "Animals have clean outlined clusters"},
        {"shot": "desktop/R01", "note": "Title art is a downscaled painting"}
      ]
    },
    "characters": {
      "score": 4.5,
      "confidence": 0.75,
      "evidence": [
        {"shot": "crops/R04-player", "note": "Nora: dome bonnet, brim at brow not framing face; eyes either side of a nose block"},
        {"shot": "crops/R16-npcs", "note": "Margaux no red scarf; Josiah cap not fur; Ezra hidden; same dome head on all"},
        {"shot": "crops/R11-npcs", "note": "Walt, Augustin, Hattie face away in dialogue; Augustin faceless"},
        {"shot": "desktop/R11", "note": "Augustin in-world sprite still tilted ~30 degrees (same bug as loop 1)"},
        {"shot": "desktop/R15", "note": "Ox renders lying on its side; pen cows, goat and hens are clean and improved"}
      ]
    },
    "environment": {
      "score": 6.0,
      "confidence": 0.8,
      "evidence": [
        {"shot": "desktop/R09", "note": "1871 board-and-batten and false fronts with real construction detail"},
        {"shot": "desktop/R04", "note": "Strong buildings; repeated post sprite and planters only; no people or vehicles"},
        {"shot": "desktop/R13", "note": "Blank white rectangle on cabin, ox lying flat, empty lower half of frame"},
        {"shot": "desktop/R07", "note": "Lake ~80% water with diagonal repeat; pier without posts"},
        {"shot": "crops/R03-field", "note": "Five crop stages at one scale"}
      ]
    },
    "lighting": {
      "score": 5.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "crops/R05-player", "note": "Pool edges stepped on the art grid"},
        {"shot": "desktop/R05", "note": "Facades near black, identical pools, seam at y~455, sign glow narrower than boards"},
        {"shot": "mobile/R05", "note": "Two horizontal seams; doors unreadable"},
        {"shot": "desktop/R06", "note": "Row windows lit warm at dusk; street lamps off; no long shadows"},
        {"shot": "desktop/R08", "note": "Fog is one flat veil including over the player"},
        {"shot": "desktop/R10", "note": "Snow roofs follow each building"}
      ]
    },
    "animation": {
      "score": 5.0,
      "confidence": 0.7,
      "evidence": [
        {"shot": "strips/R14", "note": "Five tool poses and a ~3 px chip on frames 4-5, but body frame identical through 1-5; no tilled tile; on grass"},
        {"shot": "strips/R13", "note": "About 4 leg poses, no arm swing or bob; lamp post opaque over player frames 1-6"},
        {"shot": "strips/R13-mobile", "note": "Same limited cycle at phone scale"},
        {"shot": "desktop/R10", "note": "No chimney smoke on a winter day despite the claimed ambient change"}
      ]
    },
    "ui": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "desktop/R12", "note": "Crisp integer-scaled DotGothic16/Silkscreen, clear hierarchy; slot numbers over icon art"},
        {"shot": "desktop/R18", "note": "Flat CSS panel, web-form Buy/x5/Close buttons, Hen oval and Hardware gear placeholders"},
        {"shot": "desktop/R06", "note": "Loop-1 glyph misprints fixed: 1955 reads correctly"},
        {"shot": "mobile/R11", "note": "Small portrait beside a large dialogue panel"},
        {"shot": "desktop/R01", "note": "Smooth serif title"}
      ]
    },
    "readability": {
      "score": 6.0,
      "confidence": 0.75,
      "evidence": [
        {"shot": "mobile/R04", "note": "Player bracket and text legible; HUD takes top ~26%"},
        {"shot": "mobile/R05", "note": "Buildings and doors unreadable at night"},
        {"shot": "crops/R03-field", "note": "Cabbage stages distinct; mature bean tiles merge"},
        {"shot": "desktop/R08", "note": "Fog halves contrast on the gameplay layer"},
        {"shot": "desktop/R16", "note": "Ezra hidden inside the tent"}
      ]
    },
    "authenticity": {
      "score": 6.5,
      "confidence": 0.7,
      "evidence": [
        {"shot": "desktop/R09", "note": "1871 weathered board-and-batten and false fronts"},
        {"shot": "desktop/R04", "note": "1886 Second Empire mansards and grand hotel"},
        {"shot": "desktop/R17", "note": "1931 Craftsman bungalow and 1920s pickup"},
        {"shot": "desktop/R06", "note": "1955 real Row names, drive-in, motor hotel"},
        {"shot": "desktop/R07", "note": "No 2026 cue on screen"},
        {"shot": "desktop/R10", "note": "Flower boxes bloom in snow"}
      ]
    }
  },
  "gaps": [
    {"id": "G-night-facade-value-floor", "category": "lighting", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R05", "mobile/R05"], "benchmark": "seastars-2.jpg", "fix": "Clamp re-darkened facades to >= 35% value under a cool moon ramp with trim/doors one step lighter; widen each sign glow mask to its full board; 2-3 banded lamp-pool steps in at least 3 footprint shapes; remove the street-edge seam. Test: facade bbox mean luminance >= 0.30 in R05 and no full-width bright row > 20/255 above neighbours."},
    {"id": "G-ground-texture-calm", "category": "pixel", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["crops/R04-player", "crops/R03-field", "desktop/R10", "desktop/R07"], "benchmark": "stardew-1.jpg; chained-5.jpg", "fix": "Re-author grass, cobble, snow and water as a 2-tone base (dL <= 6) plus hand-placed 3-6 px clusters covering 10-15% of pixels; at least 4 water tile variants to break the diagonal repeat. Test: isolated single-pixel ratio < 5% per terrain tile."},
    {"id": "G-tool-body-poses", "category": "animation", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS5", "evidence": ["strips/R14", "strips/R13", "desktop/R14"], "benchmark": "pixel-anchors.md section 3.5", "fix": "Five distinct body frames per direction matching the tool poses (arms up, lean, impact crouch, recoil), tool behind the head on wind-up; 6-10 px soil burst over 2-3 frames with 1-2 frames hit-stop; tile tilled on the impact frame; 6-frame walk with arm swing and 1-px bob; recapture R14 on an untilled field tile. Test: body pixels differ between every pair of frames 1-5."},
    {"id": "G-actor-upright-render", "category": "characters", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS2", "evidence": ["desktop/R11", "mobile/R11", "desktop/R13", "desktop/R15"], "fix": "Find the shared actor rotation/lean and force angle 0 for idle NPCs and animals so Augustin stands upright and the ox stands instead of lying on its side; unit test asserts every actor draw angle is 0 outside scripted actions."},
    {"id": "G-town-life-dressing", "category": "environment", "expectedGain": 1.0, "severity": 4, "effort": "M", "workstream": "WS3", "evidence": ["desktop/R04", "desktop/R09", "desktop/R17", "desktop/R07"], "benchmark": "chained-5.jpg", "fix": "3-6 ambient townsfolk and 1-2 era vehicles per town screen; benches, barrels, crates beside the existing posts; 1-px contact shadow under every prop; flowers, rocks and a worn path in the empty lower farm half; reeds, a boat and pier posts at the lake."},
    {"id": "G-ui-era-frames-icons", "category": "ui", "expectedGain": 1.0, "severity": 3, "effort": "M", "workstream": "WS6", "evidence": ["desktop/R18", "desktop/R12", "desktop/R11", "desktop/R01"], "benchmark": "stardew-5.jpg", "fix": "Nine-slice pixel frames per era material replacing CSS borders and web-form buttons; real Hen and Hardware icons; dialogue portrait at >= 2x with a name plate; slot numbers in a corner badge off the icon art; bitmap title font."},
    {"id": "G-npc-facing-and-labels", "category": "readability", "expectedGain": 0.5, "severity": 3, "effort": "S", "workstream": "WS6", "evidence": ["crops/R11-npcs", "desktop/R16", "mobile/R11"], "fix": "NPCs turn to face the player when dialogue opens; show only the nearest label or de-collide so no label overlaps a sign or another label (frees TRADE); move Ezra's spawn outside the tent footprint."},
    {"id": "G-headwear-silhouettes", "category": "characters", "expectedGain": 1.5, "severity": 5, "effort": "L", "workstream": "WS2", "evidence": ["crops/R04-player", "crops/R03-player", "crops/R05-player", "crops/R16-npcs", "crops/R16-player"], "benchmark": "stardew-1.jpg; seastars-2.jpg; research/refs/characters.md", "fix": "Per-kind 4-direction hat sprites that break the head outline (2-px slouch brim, pinched fedora, face-surrounding sun bonnet, knotted red scarf, fur cap with tail, soft toque, billed cap); ankle-length skirt silhouette pre-1955; checklist hair/hat colours; eyes separated from nose block plus 1-px mouth. Test: each named person passes 4 of 5 checklist items in a grayscale 1x close-up beside the reference sheet."},
    {"id": "G-placeholder-props", "category": "environment", "expectedGain": 0.4, "severity": 2, "effort": "S", "workstream": "WS3", "evidence": ["desktop/R13", "strips/R13", "desktop/R08", "desktop/R10"], "fix": "Replace or remove the blank white rectangle on the 1871 cabin; redraw the box-shaped dog at the springs; swap flower boxes for bare or evergreen boxes in winter."},
    {"id": "G-occlusion-see-through", "category": "readability", "expectedGain": 0.3, "severity": 2, "effort": "S", "workstream": "WS1", "evidence": ["strips/R13", "crops/R08-player"], "fix": "Fade any post or lantern prop to 40% alpha while its bbox overlaps the player's bbox; in fog draw the faded post behind the player rather than through the face."},
    {"id": "G-phone-hud-compact", "category": "readability", "expectedGain": 0.5, "severity": 4, "effort": "M", "workstream": "WS6", "evidence": ["mobile/R04", "mobile/R11", "mobile/R05"], "benchmark": "stardew-1.jpg", "fix": "Merge date, money/energy and the three buttons into one 44-CSS-px strip; collapse goals to a tap-to-expand single line; cap dialogue at 35% of viewport height. Test: HUD <= 12% of a 390x844 viewport."},
    {"id": "G-fog-evening-moods", "category": "lighting", "expectedGain": 0.5, "severity": 3, "effort": "M", "workstream": "WS4", "evidence": ["desktop/R08", "desktop/R07", "desktop/R06", "desktop/R10"], "benchmark": "seastars-2.jpg", "fix": "2-3 banded drifting fog sprites thinned within 2 tiles of the player instead of a flat alpha; warm low-sun ramp and sun glints on water for 2026 evening; street lamps on at dusk; rain splash sprites; make the claimed chimney smoke appear in winter and morning captures."}
  ],
  "verdict": "continue"
}
```
