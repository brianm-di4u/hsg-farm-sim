# Pixel-art trade-offs: how shipped games decided, and what we choose

Phase R1 of the 16-bit pixel campaign (plan: `C:\Users\brian\.claude\plans\pasted-content-id-a282-i-want-twinkly-garden.md`). Every number below has a source. Compiled 2026-11-01.

**Labels**
- **[V]** verified: the number was read on the linked page.
- **[V-dec]** verified in a community disassembly, decompilation or reimplementation (Harvest Moon `HM-Decomp`, ALttP `snesrev/zelda3`, Stardew 1.5.4 decompiled source). These are primary technical evidence, but unofficial, with community names for things.
- **[V-com]** verified, but the page is a community source (PCGamingWiki, a fan wiki or a forum), not the developer.
- **[M]** measured by us from a screenshot in `benchmarks/` (method in §M). Approximate: ±2 art px for sizes.
- **[D]** derived by arithmetic from labelled inputs.
- **[U]** unverified: a search snippet or memory only. Never used as the sole basis for a decision.

**Blocked sources.** The Spriters Resource (403 / bot check), Reddit and Kickstarter pages were blocked, so no dimension facts come from them. Several tcrf.net pages served text with instructions aimed at AI agents, so nothing is taken from TCRF.

**Correction to the brief.** Harvest Moon (SNES) released in Japan on 9 Aug 1996 and in North America in 1997, not 1996 [V] ([Wikipedia](https://en.wikipedia.org/wiki/Harvest_Moon_(video_game))). This document calls it "Harvest Moon (1996)" after its Japanese release.

---

## 0. The hardware frame: what "16-bit" actually limited

All of these are from the SNESdev wiki and are **[V]**:

- **Sprite sizes:** 8×8, 16×16, 32×32 and 64×64 (plus 16×32 and 32×64 pairs). One small/large pair is chosen for *all* sprites at once ([Sprites](https://snes.nesdev.org/wiki/Sprites), [PPU registers](https://snes.nesdev.org/wiki/PPU_registers)).
- **Sprite count:** 128 sprites in OAM. At most 32 sprites and 34 8-px slivers per scanline ([Sprites](https://snes.nesdev.org/wiki/Sprites)).
- **Colour per sprite:** 4bpp, so **15 colours + transparent**. Each sprite picks one of 8 sprite palettes ([Sprites](https://snes.nesdev.org/wiki/Sprites); [SNES PPU for NES devs](https://snes.nesdev.org/wiki/SNES_PPU_for_NES_developers)). [D] At most 8 × 15 = 120 sprite colours on screen.
- **Colour depth:** CGRAM holds 256 entries of 15-bit BGR555. Backgrounds use 0–127 and sprites 128–255 at 4bpp ([CGRAM](https://snes.nesdev.org/wiki/CGRAM)). [D] 2^15 = 32,768 possible colours.
- **Backgrounds:** Mode 1, "the most commonly used", has two 16-colour layers plus one 4-colour layer. Tiles are 8×8 or 16×16 per layer ([Backgrounds](https://snes.nesdev.org/wiki/Backgrounds)).
- **Resolution:** 256×224 on NTSC ([Fabien Sanglard](https://fabiensanglard.net/another_world_polygons_SNES/)). [D] That is 16 × 14 metatiles of 16×16.
- **Light tools:**
  - INIDISP gives 16 global brightness steps ([PPU registers](https://snes.nesdev.org/wiki/PPU_registers)).
  - Colour math adds, subtracts or half-blends a fixed colour or the sub-screen. Subtracting blue gives a yellow time-of-day tint ([Color math](https://snes.nesdev.org/wiki/Color_math)).
  - HDMA rewrites registers per scanline, for gradients and per-line scroll ([HDMA](https://snes.nesdev.org/wiki/HDMA)).

**What this means for us:** these are the limits the "16-bit look" grew out of. They aren't rules we have to obey, and modern games keep some of them and drop others (§9). We keep the ones that make the look and cost us nothing on the web: per-sprite palette size, integer grid, banded light. We drop the ones that only existed because of the memory budget: sprites per line and total sprite count.

---

## 1. Tile size and screen art resolution

| Game | Tile / metatile | Screen art resolution | Source |
|---|---|---|---|
| Harvest Moon (SNES) | Farm stored as 1 byte per **16×16** tile; graphics buffer per 8×8 cell | 256×224 (hardware) | [V-dec] [HM-Decomp notes](https://raw.githubusercontent.com/ElisaS-Codes/HM-Decomp/main/notes.md) |
| A Link to the Past | **Tile16** = four 8×8 tiles; each overworld map is 32×32 Tile16s (512×512 px); each world is an 8×8 grid of maps | 256×224 | [V-com] [yaze ROM reference](https://yaze.halext.org/docs/d3/d48/md_docs_2public_2reference_2rom-reference.html) |
| Chrono Trigger, Secret of Mana, EarthBound | Hardware 8×8 tiles; metatile size not found | 256×224 | — |
| Stardew Valley | **16×16** ("should always be 16"); drawn at `pixelZoom = 4`, so 64 screen px per tile | No fixed canvas: window ÷ (4 × user zoom). User zoom 75–200% in 5% steps | [V] [Modding:Maps](https://stardewvalleywiki.com/Modding:Maps); [V-dec] [Game1.cs](https://github.com/veywrn/StardewValley/blob/master/StardewValley/Game1.cs); [V] [Options](https://stardewvalleywiki.com/Options) |
| Fields of Mistria | Not found | In-game scale 1×–6×, lowest resolution 640×360 [V-com]. **[M] 4× in a 1080p store shot → 480×270** | [Settings wiki](https://fieldsofmistria.wiki.gg/wiki/Settings); §M |
| Sun Haven | Job ad asks for art "in a **24x24 and 32x32** pixel density" (two grids, so mixels are likely) | **[M] 2× in 1080p shots → 960×540** | [V] [Pixel Sprout artist position](https://www.pixelsproutstudios.com/artist-position) |
| Sea of Stars | Not found | **640×360** ("4K scaled from 640x360") [V-com]; **[M] 3× in 1080p shots** confirms it | [PCGamingWiki](https://www.pcgamingwiki.com/wiki/Sea_of_Stars) |
| Chained Echoes | Not found (16×16 RPG-Maker style is **[U]**) | **640×360** native, tested at 1× [V-com]; **[M] 3× in 1080p and 2× in 720p shots** | [PCGamingWiki](https://www.pcgamingwiki.com/wiki/Chained_Echoes) |
| Eastward | Not found | Community claims conflict: "upscaled from 720p" [V-com] vs "appears to be 480×270" [V-com, citing Reddit]. **[M] weak 3× signal in 1080p shots → ~640×360**, so the 480×270 claim is doubtful | [PCGamingWiki](https://www.pcgamingwiki.com/wiki/Eastward); [catmeister guide](https://catmeister-website.pages.dev/2d-art/pixel-art/what-resolution-to-use-for-pixel-art) |
| Dead Cells | Not found | Not found | — |

**Pattern:**
- The field grid of every farming game we could check is 16 px.
- The modern RPGs cluster on a **640×360** art canvas, which scales exactly 3× to 1080p and 6× to 4K [D]. Stardew and Mistria show about **480×270** at their default 1080p zoom [M].
- Stardew accepts non-integer zoom for comfort [D from Options + pixelZoom]. Mistria, Sea of Stars and Chained Echoes keep integer scales [V-com].

**Cost note.** A bigger tile means more art per tile, so smaller tiles are cheaper. Chrono Trigger's art outgrew its plan: it went from 24 to 32 Mbit because of per-era NPC outfits and town looks, and about 6 of the 8 extra megabits went to graphics [V] ([Shmuplations](https://shmuplations.com/chronotrigger/)). Our six eras are the same problem: era variants multiply art.

---

## 2. Character cell size and head:body ratio

| Game | Cell / height | Head:body | Source |
|---|---|---|---|
| EarthBound | Ness's sprite group is **16×24** | **[M] ≈ 1.7 heads** (head ≈ 14 of ≈ 23 px) | [V-com] [CoilSnake NPCs](https://github.com/pk-hack/CoilSnake/wiki/NPCs); [M] `snes-earthbound-1.png` |
| Harvest Moon | Sprites are "the 16x16 characters in the VRAM" [V-dec]. **[M] farmer ≈ 14 × 24 px** standing | [M] ≈ 2.5 heads (cap to chin ≈ 9–10 px) | [HM-Decomp notes](https://raw.githubusercontent.com/ElisaS-Codes/HM-Decomp/main/notes.md); [M] `snes-harvestmoon-1.png` |
| Secret of Mana | **[M] ≈ 12–16 × 31 px** (Primm and Randi) | [M] ≈ 2.1 heads (head ≈ 14.5 px) | [M] `snes-secretofmana-1.png` |
| A Link to the Past | Built from 8×8 pieces in pairs (`kLinkSpriteBodys`), plus sword, shield and shadow entries [V-dec]. **[M] ≈ 22–24 px tall** in a sword frame. 16×24 is common lore **[U]** | not measured | [zelda3 player_oam.c](https://raw.githubusercontent.com/snesrev/zelda3/master/src/player_oam.c); [M] `snes-alttp-1.png` |
| Chrono Trigger | ~16×32 is a forum guess **[U]** | — | [Allegro.cc](https://www.allegro.cc/forums/print-thread/241439) (unopened) |
| Stardew Valley | Farmer and NPC frames are **16×32**. NPC sizes above 16×32 "will cause issues". Portraits are **64×64** | [M] ≈ 2.4 heads (≈ 11.5 of ≈ 28 px) | [V] [Farmer sprite](https://stardewvalleywiki.com/Modding:Farmer_sprite), [NPC data](https://stardewvalleywiki.com/Modding:NPC_data); [M] `stardew-1.jpg` |
| Fields of Mistria | Not found. A cat sprite is 48×40 [V-com]. Animated portraits are "far more detail than their sprite" [V-com] | — | [MOMI wiki](https://github.com/Garethp/Mods-of-Mistria-Installer/wiki/2.-Sprites); [Punished Backlog](https://punishedbacklog.com/fields-of-mistria-early-access-review/) |
| Sea of Stars | **[M] adults ≈ 48–53 px tall** on the 640×360 grid | [M] ≈ 2.4–2.6 heads | [M] `seastars-2.jpg` |
| Chained Echoes | **[M] leads ≈ 44–46 px tall** | not measured | [M] `chained-5.jpg` |
| Dead Cells | Character is "only 50 pixels" tall | — | [V] [Vasseur, Game Developer](https://www.gamedeveloper.com/production/art-design-deep-dive-using-a-3d-pipeline-for-2d-animation-in-i-dead-cells-i-) |
| Donkey Kong Country | Not found | — | — |

**Two tiers have shipped and work:**
- **Small:** 16×24 to 16×32, about 1.7–2.5 heads (EarthBound, Harvest Moon, Secret of Mana, Stardew). It reads as "SNES". Faces are 2–4 px, so faces and costume detail go into **64×64 portraits** (Stardew [V]; Mistria [V-com]).
- **Large modern:** about 45–53 px tall, about 2.5 heads (Sea of Stars [M], Chained Echoes [M], Dead Cells [V]). Garments and props read in the world itself. It costs about 2–3× the pixels per frame, and Sea of Stars says animation was "by far the thing we spent the most on" [V] ([Screen Rant](https://screenrant.com/sea-stars-interview-thierry-boulanger/)).

**Layered composition is proven at the small tier.** Stardew stacks body, pants, shirt, accessories, hair, hat and arms. It recolours by finding reserved exact colours in the base, and its shirts are only 8×8 [V] ([Farmer sprite](https://stardewvalleywiki.com/Modding:Farmer_sprite)). That is the same idea as our compositor's shade masks (plan Phase 1).

---

## 3. Directions and frames per action

| Game | Directions | Walk | Other actions | Source |
|---|---|---|---|---|
| Stardew Valley | **4** facings; left is the right frame mirrored | **4 steps from 3 unique frames** (0,1,0,2) at **200 ms** | Run: 8-step (up/down) and 6-step (side) at 60–140 ms. Axe, pick and hoe: **5 frames** (e.g. 150/40/40/170/75 ms). Scythe and melee: **6**. Water: **3** (last held 500 ms). Harvest: **4** at 100 ms. NPCs: "four frames per direction". Frames reused across actions | [V] [Farmer sprite](https://stardewvalleywiki.com/Modding:Farmer_sprite); [NPC data](https://stardewvalleywiki.com/Modding:NPC_data) |
| A Link to the Past | **8-way** movement (separate diagonal speed index) | Step counter cycles **8 steps**, about 17 or 11 frames per cycle depending on the branch (unconfirmed which is normal walking) | Swim stroke: 4-entry cycle, 8 frames each | [V-dec] [zelda3 player.c](https://raw.githubusercontent.com/snesrev/zelda3/master/src/player.c) |
| EarthBound | 16 frame slots per sprite group [V-com]. 8 directions × 2 frames is an inference **[U]** | — | — | [CoilSnake NPCs](https://github.com/pk-hack/CoilSnake/wiki/NPCs) |
| Donkey Kong Country | Side view | **16-frame walk rendered, about every other frame shipped (≈ 8)** | Animation-frame cuts were the hard part ("challenging") | [V] [Episodic Content Mag ch. 2](https://episodiccontentmag.com/2016/02/19/dkcountry1_chapter2); [Wikipedia](https://en.wikipedia.org/wiki/Donkey_Kong_Country) |
| Dead Cells | Side view | Keyframed like 2D, in-betweens added afterwards; prototype at **30 fps** animation | Hit-stop: 1 frame freeze, then slow-down | [V] [Vasseur](https://www.gamedeveloper.com/production/art-design-deep-dive-using-a-3d-pipeline-for-2d-animation-in-i-dead-cells-i-); [80.lv](https://80.lv/articles/interview-with-the-developers-of-dead-cells) |
| HM, CT, SoM, Mistria, Sun Haven, SoS, Eastward, CE | Not found | | | — |

**Pattern:** the genre's working minimum is Stardew's: 4 facings with a mirrored side, a 3-unique-frame walk, and 3–6 frame tool actions with frames reused. DKC and Dead Cells show what a 3D pipeline buys. Rendering more frames is cheap, so the limit becomes memory and readability, and DKC halved its rendered frames to fit [V].

---

## 4. Colours per sprite, sub-palettes and palette swaps

- **SNES rule:** 15 colours + transparent per sprite, from 8 shared sprite palettes [V] (§0).
- **EarthBound:** 8 overworld sprite palettes of 15 colours each (ROM 0x030200). Overworld sprites must use colours already in the shared palette file, and editing one palette can break other sprites that share it [V-com] ([Data Crystal](https://datacrystal.tcrf.net/wiki/EarthBound:Sprite_Palettes); [CoilSnake](https://github.com/pk-hack/CoilSnake/wiki/NPCs)). Shared palettes are a real production constraint.
- **A Link to the Past:**
  - Most art is stored **3bpp (7 colours + transparent)**, which saves 25% of ROM per tile [V-com]/[D].
  - Link's mail has **5 palettes** of 15. Swords have 4 three-colour overlays and shields 3 four-colour ones.
  - Light and Dark World have separate global sprite palettes; the Dark World is partly a palette swap.
  - Source: [yaze](https://yaze.halext.org/docs/d3/d48/md_docs_2public_2reference_2rom-reference.html). Reference shot: `benchmarks/snes-alttp-1.png`, the same scene in both worlds.
- **Chrono Trigger:** about 12 colours per character is a tutorial claim **[U]**.
- **Stardew:** the colours are functional data. Skin, eyes, pants and sleeves are recoloured by exact-match palette entries [V]. It publishes no total colour count.
- **Dead Cells:** backgrounds are drawn in greyscale and coloured with a gradient map, so "modifying the gradient map is then all we need to do in order to change the color palette of a biome". Midtones are pushed saturated; interiors use complementary palettes and outdoors analogous ones [V] ([Giving back colors](https://www.gamedeveloper.com/production/art-design-deep-dive-giving-back-colors-to-cryptic-worlds-in-i-dead-cells-i-)).
- **Chained Echoes:** "I tried to create a visual experience which looks like I remember the games... more colorful than they actually are" [V] ([Lords of Gaming](https://lordsofgaming.net/2023/01/interview-chained-echoes-developer-matthias-linda)). He targets remembered colour, not CGRAM.

**Pattern:** palette discipline at sprite level (around 15 colours, shared ramps) plus palette swaps for variants is both authentic and cheap. ALttP mail tiers, Dark World and EarthBound show it on SNES. Dead Cells' gradient maps are the modern form of the same idea, and they map directly onto our six eras.

---

## 5. Outline style (black vs sel-out)

**No developer or technical source states the outline convention for any of the 13 games.** Both fact-finding passes came back empty. All we have is what is visible in the benchmark captures, labelled **[M]** (observed, not stated):
- **Stardew** (`stardew-1.jpg`): dark brown-black exterior outlines on characters and buildings, and some interior lines.
- **Chained Echoes** (`chained-5.jpg`): exterior outlines are dark but tinted by the adjacent colour (sel-out-like), with no interior lines.
- **Sea of Stars** (`seastars-2.jpg`): coloured, light-dependent outlines that are darker on the shadow side.
- **EarthBound** (`snes-earthbound-1.png`): pure black outlines on characters.
- **Secret of Mana** (`snes-secretofmana-1.png`): dark coloured outlines.

Treat these as observations for the decision in §10, not as quoted facts.

---

## 6. Lighting model and day/night

| Approach | Who | How (sourced) | Cost / trade-off |
|---|---|---|---|
| **Palette-band swap** | Harvest Moon | Time of day swaps palettes from `Time_Palette_Table` at hours **7, 15, 17, 18** [V-dec]. It steps every **32 frames** (≈ 0.53 s [D]). From 18:00 it copies 512 bytes (all 256 colours, sprites included) instead of 256 (backgrounds only) [V-dec]. The clock stops at 18:00 **[U]**, which matches an hour-18 cap in the code [V-dec] | Five discrete looks [D]. Zero runtime cost. Every colour stays on palette. Needs a hand-made palette per band |
| **Hardware tint and fade** | SNES generally | INIDISP has 16 brightness steps. Colour-math subtract gives a time-of-day tint. HDMA changes the fixed colour per line for gradients [V] | Global only, with no local lights |
| **Palette world swap** | ALttP Dark World | Separate global sprite palettes per world [V-com] | A whole-mood change for the price of a palette set |
| **Subtractive lightmap** | Stardew | `AmbientLight` RGB is subtracted from white. Light sources are 9 pre-drawn textures; `DayTiles`/`NightTiles` swap lamps at 6 am and 7 pm [V]. The lightmap is 1/16 screen resolution at default quality, drawn with linear filtering and ReverseSubtract [V-dec] (≈ 124×71 texels at 1080p [D]). Nightfall: 8 pm spring/summer, 7 pm fall, 6 pm winter [V] | Very cheap. Light falloff is smooth and **ignores the art grid** (mixed resolution, by design) |
| **Normal-mapped dynamic light** | Dead Cells | Characters rendered from 3D with a normal map per frame and a toon shader. Backgrounds have **hand-drawn normal maps** feeding dynamic 3D lights ("a torch on the left of a statue will light up the statue from the correct direction") [V] | Hand normal maps "cost us some weekends and big cups of coffee" [V]. Flickering pixels never solved [V] |
| **3D-rebuilt layers + bump maps** | Eastward | "A 3D game with a 2D perspective": sprites split by structure, rebuilt in 3D, given hand-painted bump maps; shaders show weather and time of day [V] ([Game Developer](https://www.gamedeveloper.com/art/eastward-s-creators-share-insights-on-making-pixel-art-adventures)) | Smooth light over pixels. "Took an incredibly long time" [V] |
| **Custom dynamic-light pipeline** | Sea of Stars | "Full-on dynamic lighting. Our custom-made render pipeline" [V] ([press kit](https://sabotagestudio.com/presskits/sea-of-stars)). First **6 months** of development spent on it [V]. "All of the assets... have to answer to the technical needs of the dynamic lighting"; one technical artist full-time for **5 years** [V] ([MobileSyrup](https://mobilesyrup.com/2023/09/11/sea-of-stars-level-design-sabotage-studio-thierry-boulanger-interview/)). Players control time of day [V]. Technique (normals, heights, proxies) not found | The best result in the genre (`seastars-2.jpg`), and the most expensive one |
| **DKC weather** | Donkey Kong Country | Tim Stamper pushed for weather and lighting effects; weather builds through a level (snow becomes a blizzard) [V] | Pre-rendered art, so lighting was baked in |
| Mistria, Sun Haven, Chained Echoes, CT, SoM, EarthBound | — | Not found. ALttP lantern and dark rooms: not found | — |

**Pattern:** two families.
- **On-grid, discrete** (Harvest Moon, ALttP): authentic and cheap, needs palette authoring.
- **Off-grid, smooth or dynamic** (Stardew cheap; Dead Cells, Eastward and Sea of Stars expensive): better mood, breaks the strict pixel grid unless deliberately banded.

Our plan's `band` and `dither` modes are the Harvest Moon family made per-light. `smooth` is Stardew's.

---

## 7. Camera snapping, sub-pixel motion, parallax

- **ALttP:** position is in 1/16 px. Walking is 24/16 = **1.5 px/frame**, diagonal 16/16 per axis (≈ 1.41 total, so diagonals are deliberately not faster), dash 64/16 = **4 px/frame** [V-dec]/[D] ([TASVideos post](https://tasvideos.org/Forum/Posts/436528); [zelda3 player.c](https://raw.githubusercontent.com/snesrev/zelda3/master/src/player.c)). Sub-pixel *position*, whole-pixel *drawing* (hardware has no sub-pixel output).
- **Stardew:** walking speed 2, running 5, in 4×-scaled world px [V-dec]. That is 0.5 and 1.25 art px per update [D]. The viewport is lerped and cast to integer **screen** px, not art px [V-dec]. Sprites use point sampling and the lightmap linear [V-dec]. Sprites can sit at quarter-art-pixel offsets [D]. **It does not snap to the art grid.**
- **EarthBound:** RAM keeps the player pixel position and a subposition [V-com] ([TASVideos](https://tasvideos.org/GameResources/SNES/Earthbound)); no speeds published.
- **Fields of Mistria:** "High-Res Framebuffers" became always-on in v0.16.3 [V-com] ([version history](https://fieldsofmistria.wiki.gg/wiki/Update)). We read this as compositing above art resolution, which allows smooth motion; that reading is our inference, with no developer statement.
- **Parallax:**
  - Dead Cells: greyscale parallax layers, coloured by gradient map, used heavily for outdoor depth [V].
  - SNES: per-line scroll through HDMA [V] (§0).
  - Not found for the top-down games.
  - Top-down views have little room for parallax beyond sky, distant ridges and panoramas.

---

## 8. UI frames and pixel fonts

- **EarthBound:**
  - 5 window "flavours" (palette sets) [V-com] ([Data Crystal](https://datacrystal.tcrf.net/wiki/EarthBound/Text_Window_Properties_Table)). The names Plain/Mint/Strawberry/Banana/Peanut are **[U]**.
  - Separate Main, 8×16 battle, 8×8 tiny and Large fonts [V-com].
  - Fonts 0–4 are **variable-width** with per-glyph width tables; the credits font is monospace [V-com] ([CoilSnake Fonts](https://github.com/pk-hack/CoilSnake/wiki/Fonts); [SNESdev VWF](https://snes.nesdev.org/wiki/Variable_width_fonts)).
- **Chrono Trigger:**
  - Its menu moves BG1/BG3 scroll mid-frame with HDMA to place text [V-com] ([nesdev t14435](https://nesdev.nes.science/f12/t14435.xhtml)).
  - FF6/CT-style menu gradients come from colour-math add/subtract with the fixed colour changed per line [V-com] ([nesdev t17869](https://nesdev.nes.science/f12/t17869.xhtml)); that thread does not confirm any one game's code.
  - User-selectable window colours exist **[U]**; the count was not found.
  - Reference: `benchmarks/snes-chronotrigger-1.png` (resampled).
- **Stardew:**
  - XNA SpriteFonts (`SpriteFont1`, `SmallFont`, `tinyFont`) plus a bitmap `SpriteText` system with **8×16 glyphs drawn at 3×** while the world is at 4× [V-dec] ([SpriteText.cs](https://github.com/veywrn/StardewValley/blob/master/StardewValley/BellsAndWhistles/SpriteText.cs)). [D] UI text and world art have different pixel sizes.
  - UI scale is separate from world zoom, 75–150% [V].
  - CJK, Russian, Thai and Korean switch to BMFont [V-dec].
- **Sea of Stars:** "the rendering, the UI, the sound" must be retro [V] ([Screen Rant](https://screenrant.com/sea-stars-interview-thierry-boulanger/)). No font specifics found.
- **Mistria, Sun Haven, Eastward, Chained Echoes:** not found.

**Pattern:** period-correct UI comes from bitmap fonts on an integer scale (variable width is authentic: EarthBound) and a few window palettes. Even Stardew lets UI and world pixel scales differ.

---

## 9. Hard limits vs "inspired" freedom, and what each choice cost

| Game | Stance (sourced) | Production cost (sourced) |
|---|---|---|
| Harvest Moon | Real hardware. Combining farming, people and cattle made the frame rate "completely drop"; the on-screen object budget was found "by trial and error" [V] | Core team of 3 (Wada design, Yamatate programming, Miyakoshi graphics and script), grew to 10. The developer collapsed and the publisher funded 6 more months [V] ([GDC 2012](https://www.gamedeveloper.com/business/gdc-2012-how-i-harvest-moon-i-almost-didn-t-happen)). Wikipedia says 8–10 people over 3 years [V] |
| Chrono Trigger | Real hardware. Planned at 24 Mbit, shipped at 32; ~6 of the 8 extra Mbit went to art. Magus's castle could only exist because it didn't reuse tiles. CG used "similar to DKC" but kept non-obvious to protect hand-drawn warmth [V] | 50–60 developers [V] ([Wikipedia](https://en.wikipedia.org/wiki/Chrono_Trigger)). An artist kept redrawing one clock until stopped [V] ([Shmuplations](https://shmuplations.com/chronotrigger/)) |
| Secret of Mana | Moved from CD to cartridge: up to **40%** of the planned game cut. Slowdown "when too much happens at once" [V] | About 10 developers. Pixel artist Kameoka trained to match Toriyama's style [V] ([VGDensetsu](https://vgdensetsu.net/?p=9293)) |
| EarthBound | Designed at 8 Mbit, grew to 24 [V] | 5 years with cancellation threats. One specialist made nearly 200 battle-background animations over 2 years [V] ([Wikipedia](https://en.wikipedia.org/wiki/EarthBound)) |
| A Link to the Past | 8 Mbit; 3bpp storage to save space [V-com] | Not found |
| Donkey Kong Country | Pre-rendered on SGI Challenge workstations (£80,000 each) with Alias; renders ran overnight; "ACM" compression invented to fit [V] | Splitting backgrounds into tiles was "the bane of the project" [V]. 16 rendered walk frames → ~8 shipped [V]. **[Conflict]** 16 people / 14 months (Episodic Content Mag) vs 12–20 people / 18 months (Wikipedia). About US$1M [V] |
| Stardew Valley | Not hardware-bound: non-integer zoom, smooth lightmap, sub-pixel motion [V]/[D]. Art made in Paint.NET [V] | One person, 4.5–5 years [V]. "I ended up re-doing nearly all the art several times"; 6–7 portrait iterations [V] ([ConcernedApe 2017](https://www.stardewvalley.net/?p=1095)) |
| Fields of Mistria | Integer scale settings; anime-influenced pixel art [V]/[V-com] | 15 staff, 3 current pixel artists plus 1 concept artist [V] ([team page](https://www.fieldsofmistria.com/team)). 2019 → full release 5 Aug 2026 [V]. Moved from GameMaker to a custom Rust engine [V] |
| Sun Haven | Two art densities (24 and 32) [V] | 2020 Kickstarter (goal $44,700) [V]. Team size not found |
| Sea of Stars | "Has to be retro" for rendering and UI, but "added... dynamic lighting" that SNES never had [V] ([LRM](https://lrmonline.com/news/how-the-retro-inspired-sea-of-star-captures-the-feeling-of-90s-rpgs-exclusive-interview/)) | Team grew from 7 to 25; about 5 years [V]/[D]. Lighting: 6 months of R&D plus 1 technical artist for 5 years. Animation was the biggest spend [V] |
| Eastward | 3D lighting on pixel art in an in-house engine (Gii on MOAI) [V] | 3 people in 2015, 8 by 2016; 6 years. Over 200 characters. A 2020 server loss forced remaking art [V] ([Nintendo](https://www.nintendo.com/us/whatsnew/how-the-developers-began-making-then-remaking-eastward)) |
| Chained Echoes | "16-bit SNES style", but "didn't slavishly adhere" to 16-bit conventions [V] | 1 person for about 7 years, evenings until the Kickstarter (€130,409) [V]. Bought Asset Store tools instead of hiring; paid for some backgrounds "as I just didn't have the time" [V] ([VGChartz](https://www.vgchartz.com/article/455192/chained-echoes-interview-creator-matthias-linda-talks-jrpg-influences-deck13-backing-music-amp-more/)) |
| Dead Cells | 3D→pixel pipeline: 3DS Max, a homebrew renderer "in a very small size and without antialiasing", toon shading with normal maps [V] | One artist for a year. The pipeline "allows one person to create a lot of animations very quickly"; timing changed "dozens of times in minutes"; reuse saved "hundred of hours" [V] ([80.lv](https://80.lv/articles/interview-with-the-developers-of-dead-cells)) |

**Lessons for a small team doing 6 eras × 24 people:**
1. The big costs in these games were art iteration (Stardew, Eastward) and animation (Sea of Stars, DKC).
2. Pipelines that render frames from 3D (DKC, Dead Cells) traded art cost for tooling cost and won on animation volume.
3. Dynamic lighting on pixels is a multi-year, dedicated-specialist cost (Sea of Stars). Cheap lighting comes from palette discipline (Harvest Moon) or a low-res lightmap (Stardew).

---

## §M. Our measurements

- **Pixel pitch.** For each capture, sum horizontal and vertical luminance-edge energy by `x mod p` and `y mod p` for p = 2…8 (numpy, run 2026-11-01). The true pitch puts edges in one phase, so its peak/mean ratio rises well above 1, and multiples of the pitch rise with it. The results and ratios are in `benchmarks/SOURCES.md`.
  - Stardew and Mistria: 4× at 1080p (480×270).
  - Sea of Stars: 3× (640×360).
  - Chained Echoes: 3× at 1080p and 2× in its 1278×719 captures (640×360).
  - Eastward: weak 3×.
  - Sun Haven: 2× (960×540).
- **Sprite heights.** Count art pixels in nearest-neighbour crops with an 8-px grid overlay, top of hair or hat to bottom of feet, shadow excluded. Head = top of hair or hat to chin. ±2 px. The SNES files used are native 1× captures, except Chrono Trigger (resampled, not measured) and DKC (stretched, not measured).

---

## 10. Decision table for Valley of Vapors

These are recommended defaults for Phase 1–3. Phase 2's perf ladder and the tier study (plan) can overturn any of them, and any change goes in `VISUAL-PLAN-PX.md` under "Pivots".

| Decision | Choice | Precedent | Reason |
|---|---|---|---|
| **Tile size T** | **16 art px** (24 kept as a ladder candidate; 32 dropped unless the tier study needs it) | HM farm grid 16×16 [V-dec]; ALttP Tile16 [V-com]; Stardew 16×16 [V] | One crop = one tile at the genre's standard size. Lowest art cost per tile across 6 eras × 4 seasons. Sun Haven's 24/32 mix is the only exception and probably causes mixels [V]/[D] |
| **Art canvas** | **≈ 480×270 to 640×360 art px** visible on desktop; integer k device px per art px (plan Phase 1) | Stardew and Mistria ≈ 480×270 [M]; SoS and CE 640×360 [V-com]/[M] | Matches today's 38–64 CSS px tile at k = 2–4. 640×360 scales exactly to 1080p (3×) and 4K (6×) [D] |
| **Character tier candidates** | **A: 16×32** (≈ 2.3 heads), **B: 24×32** (≈ 2.3 heads, more room for garment), **C: 32×48** (≈ 2.5–3 heads). **48×64 is a portrait tier only.** A and B carry 64×64 dialogue portraits | A: Stardew 16×32 [V], SoM ≈ 31 px [M], HM ≈ 24 [M]. C: CE ≈ 45 [M], SoS ≈ 48–53 [M], Dead Cells 50 [V]. Portraits: Stardew 64×64 [V], Mistria [V-com] | A is proven for the genre and cheapest. C is where bustles, sack coats and props read in the world, but costs about 2.5× the pixels per frame [D: 32·48 / 16·32 = 3.0, 24·32 / 16·32 = 1.5]. B is the compromise to test. The phone readability test decides (plan Phase 2) |
| **Head:body ratio** | **2.3–2.5 heads** at A and B; **2.5–3** at C. Same ratio for every person within a tier | EB ≈ 1.7, SoM ≈ 2.1, Stardew ≈ 2.4, SoS ≈ 2.4–2.6 [M] | Below 2 heads reads as chibi and loses period silhouettes (bustle, frock coat). Above 3 at 16–24 px leaves the head too small for hats to read |
| **Colours per sprite** | **≤ 15 + transparent per composed character**, from **3–4 shade ramps per layer** (skin, hair, garment, legs, hat or prop) plus 1 outline ramp | SNES 4bpp limit [V]; ALttP mail palettes [V-com]; Stardew reserved recolour colours [V] | Keeps the 16-bit look and matches the compositor's 3–4 shade masks (plan Phase 1). 5 layers × 3 + outline ≈ 15–16 [D] |
| **Palette rules** | One **master palette per era** (built from visual-eras.md §8). All sprites snap to it in OKLab (pixelizer). Variants (season, era, wilted, snow) are palette swaps or gradient maps, not repaints. Ramps hue-shift: warm lights, cool shadows | ALttP Dark World palette swap [V-com]; Dead Cells gradient maps per biome [V]; EarthBound shared palettes [V-com] | Six eras multiply art. Swaps make variants nearly free (Chrono Trigger shows the cost of not doing this [V]). One master palette per era also enforces era distinctness (rubric category 8) |
| **Outline rule** | **Characters and props: 1-px exterior outline in a darkened, hue-matched shade of the adjacent colour (sel-out style), never pure black.** Exception: the darkest era-palette colour may be used where the background is light. **Terrain: no outlines.** Buildings: outline the silhouette only | No sourced convention exists (§5). Observed: CE and SoS tinted outlines [M]; Stardew dark outlines [M]; EB black [M] | Tinted outlines read on a phone and still sit in the era palette. Pure black fights the bright 1931/1955 palettes. Terrain outlines make tile grids obvious. Calibrated against CAL-B and CAL-C (`research/pixel-anchors.md`) |
| **Light model** | **Default `band`:** time of day as **5 palette bands per era** (dawn, day, golden, dusk, night) with stepped transitions, plus local lights as **banded, world-anchored pools at art resolution** (2–3 bands). `dither` is the A/B alternative. `smooth` (today) stays only as an A/B control | HM 5 bands at hours 7/15/17/18, stepping every 32 frames [V-dec]; SNES colour math [V]; Stardew smooth lightmap breaks the grid [V-dec]; SoS dynamic lighting cost 6 months + 5 years of one specialist [V] | Keeps every pixel on the grid and on palette, which the pixel-integrity gate checks. Near-zero runtime cost (phone budget). Gives SoS-like warm/cool mixing without its pipeline. Night colours are hand-picked per era (gas 1897, sodium, LED) |
| **Day/night timing** | Band changes at fixed hours (season-shifted nightfall like Stardew: 8 pm spring/summer, 7 pm fall, 6 pm winter); each step about 0.5 s | HM 32-frame steps ≈ 0.53 s [D]; Stardew nightfall by season [V] | Discrete steps are authentic and cheap. Seasonal shift is free realism |
| **Directions** | **4 facings; side view mirrored**, except people whose signature prop is handed (draw both sides if mirroring puts it in the wrong hand) | Stardew 4 facings with mirrored left [V] | Halves side-view cost. 8-way (ALttP [V-dec]) adds 60% more cells for little gain on a tile-locked farm |
| **Frame counts** | **NPC walk 4 steps from 3 unique frames, about 200 ms per frame. Player walk 6 frames** (run optional). **Tools:** hoe/axe/pick 5 frames, scythe 6, water 3 (last held), harvest 4. **Idle:** 2 frames for named NPCs. Reuse frames across actions | Stardew exact counts and timings [V]; DKC halving 16 → 8 [V]; SoS animation the biggest cost [V] | Proven minimum for the genre. Cost check [D]: 24 people × 3 drawn facings × (3 walk + 2 idle) = 360 cells; 6 heirs × 3 facings × (5+6+3+4) tool frames = 324 cells. The Blender path renders these instead of hand-drawing (Dead Cells precedent [V]) |
| **Sub-pixel motion and camera** | Keep float positions (like ALttP's 1/16 px [V-dec]). **Draw every sprite at whole art pixels; snap the camera to the art grid** (plan Phase 1). Diagonal speed normalised | ALttP sub-pixel position, whole-pixel draw [V-dec]; Stardew snaps only to screen px, so sprites sit off-grid [V-dec]/[D] | Stardew's off-grid motion would fail our pixel-integrity gate. ALttP's model gives smooth speed with grid-true output |
| **Parallax** | Only in panoramas and sky layers (distant ridges, steam, clouds), drawn greyscale and gradient-mapped per era and time of day | Dead Cells greyscale + gradient-map parallax [V]; SNES HDMA line scroll [V] | Top-down play leaves no room for depth layers. Gradient maps reuse one drawing across 6 eras |
| **UI frames** | 9-slice pixel frames, one material per era (hide, plank, brass, chrome, LED per plan Phase 3), each with a few palette "flavours" | EarthBound 5 window flavours [V-com]; Chrono Trigger menu gradients by colour math [V-com] | Era material in the UI helps distinctness. Flavours are a cheap palette swap |
| **Fonts** | Bitmap pixel fonts (OFL/CC0), **variable-width for body text**, drawn only at integer scales. UI pixel scale may differ from world scale, but only by an integer | EarthBound variable-width fonts [V-com]; Stardew 8×16 glyphs at 3× vs world at 4× [V-dec] | Variable width fits more dialogue on phones. Integer scale prevents blur (rubric category 6) |
| **Hard limits vs freedom** | **Keep:** per-sprite palette, integer grid, banded light, era palettes. **Drop:** sprites per line, VRAM and ROM budgets, 256×224. **Allow:** more colours per scene than CGRAM; more lights than SNES colour math | Sea of Stars ("rendering, UI" retro, design modern) [V]; Chained Echoes "didn't slavishly adhere" [V] | The kept limits create the look and cost nothing on the web. The dropped ones were memory artefacts. The budget is set by perf (plan Phase 2), not by the SNES |

### Still open (needs Phase 2 data or more sources)
- **Character tier A, B or C:** decided by the tier study (perf ladder, accuracy metric, phone readability, production cost).
- **Outline convention:** no shipped game documents one. Settle it by A/B in the vertical slice.
- **LPC path vs this table.** LPC characters measure about 30×47 px in 64×64 frames, and they only survive unscaled (`lpc-survey.md` §1). Choosing the LPC path therefore means the 48×64 tier on 32 px tiles, not the T=16 default above. That is fine as the plan's alternate path. If it wins the slice review, record it as a pivot.
- **Not found in any source:** ALttP lantern and dark-room lighting; Chrono Trigger era palettes; character cell sizes for CT, SoM, DKC, Mistria and Sun Haven (only our measurements exist); Sea of Stars' lighting technique.
