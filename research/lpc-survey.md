# LPC character art survey for Valley of Vapors

Researched 2026-11-01. Generator data is pinned to commit
`86160e7507d6841259cff624a51a63c1d4847ee3` (2026-10-28) of
[LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator][gen-repo]. Paths, authors and licences
below were read from that commit's `sheet_definitions/*.json` files and `CREDITS.csv` (13,915 rows, one per PNG).

Status labels:

- **VERIFIED**: read on the linked page, file or PNG.
- **VERIFIED+csv**: read in the sheet definition and also checked against the matching `CREDITS.csv` row.
- **UNVERIFIED**: inferred, or not opened. Do not rely on it until someone checks.

None of this is legal advice. Where the text below interprets a licence, it says so.

---

## 1. Summary and recommendation

**Use LPC for characters, but only at the 48x64 tier on the 32 px tile setting. Never scale it.**

- **Size.** LPC frames are 64x64 ([constants.ts][constants], VERIFIED). The LPC style guide says the base body
  "should fit in a 32x48 space and the clothing should fit in 48x64 space" ([style guide][styleguide], VERIFIED).
  I measured the male body plus male head on the walk "down" frame at 30x47 px. With a bowler hat it is 26x53 px
  (PNG measurement, VERIFIED). That fits our 48x64 tier exactly, and it fits only if hats sit inside the frame.
  LPC tiles are 32x32 ([lpc.opengameart.org][lpc-about], VERIFIED), which matches our `?tile=32` pixel tier
  (`PX.T` in `src/js/render/assets.js`). At our default 16 px tiles an LPC character would stand about 3 tiles tall.
- **Recolouring works with our system.** Bodies, shirts, trousers, skirts, neckwear, shoes, bandanas and hair use
  fixed palette ramps. Cloth ramps have 6 colours: an outline plus 5 shades ([cloth_ulpc.json][pal-cloth], VERIFIED).
  The male body uses exactly the 6-colour "light" skin ramp (PNG colour count, VERIFIED). These convert straight
  to our shade masks. Hats, coats, vests, dresses and glasses ship as 19 to 34 pre-coloured variant PNGs instead.
  For those, take one variant and rank its colours by brightness. The bowler's default variant has 5 colours.
- **Coverage.** The generator covers most of 1886, 1931 and 2026, and some of 1871. It is weak on 1807 frontier
  wear, any bustle, bonnets and 1950s women's wear. It has **no** baseball cap, fedora, cloche, wide-brim hat,
  bonnet, chef toque, fur cap or bicycle helmet. I searched all 768 sheet-definition file names and read every
  hat and covering definition (VERIFIED). Plan on drawing
  about 10 hats and 4 to 5 silhouette garments ourselves, in LPC style (see section 5).
- **Animation limits.** Every body has walk (9 frames), idle, run, sit, emote, thrust, slash and more, plus a
  ready-made "watering" playback cycle. But frock, collared and trench coats are **male-only and have only the
  6 original animations** (no idle, run or sit), and the dresses are female-only with 6 animations plus idle
  (CREDITS.csv, VERIFIED). Hats do not support the child body.
- **Licences.** Every item we need offers at least one of CC-BY-SA 3.0, OGA-BY 3.0 or CC0. Pick one licence per
  source (the OpenGameArt FAQ says "You must follow only one of the licenses", [OGA FAQ][oga-faq], VERIFIED). Never
  pick GPL for art. License our own modified LPC files under **CC-BY-SA 3.0**, which accepts every input above. Our
  game code is not affected by ShareAlike (section 7). Credit every author listed for every layer we ship, and link
  to the OpenGameArt pages.
- **Do not trust one metadata source.** The generator and OpenGameArt disagree in both directions. The male body
  lists OGA-BY 3.0 in the generator, but its OGA page lists only CC-BY-SA 3.0 and GPL 3.0. The tricorne lists only
  OGA-BY 3.0 in the generator, but its OGA pages also list CC-BY-SA 3.0 and GPL 3.0 (section 4). Choose a licence
  that appears on both the generator row and the OGA page.

---

## 2. LPC format facts

### 2.1 Origin and licence of the 2012 base

| Fact | Source | Status |
|---|---|---|
| The 2012 Liberated Pixel Cup artwork was to be "dual licensed under CC BY-SA 3.0 and GPLv3". Style: overhead 16-bit RPG, "front-facing overhead orthographic view", 32x32 tiles. | [lpc.opengameart.org][lpc-about] | VERIFIED |
| The base asset pack lists CC-BY-SA 3.0 and GPL 3.0. Attribution: "Images are copyright their respective authors, as listed in CREDITS.TXT". The Sharm and Redshrike assets are "also available under the OGA-BY 3.0 License". | [LPC Base Assets (OGA)][oga-base] | VERIFIED |
| The style guide and its assets are dual licensed CC BY-SA 3.0 and GPL 3 or later. | [style guide index][styleguide-index] | VERIFIED |
| The style guide names farming/simulation games as an intended use. Camera is "top-down, roughly 60 degrees", orthographic. Light comes from above, slightly from the left. Character outlines are "black or near black, no selective outlining". Drop shadows are #322125 at 60% opacity. Bases are "approximately two and a half heads tall". | [style guide][styleguide] | VERIFIED |
| Sheet row order is "back, left, front, right". The generator calls the same order `["up","left","down","right"]`. | [style guide][styleguide], [constants.ts][constants] | VERIFIED |
| Frame size inside the original 2012 zip | not opened | UNVERIFIED (the generator uses 64x64, see below) |

### 2.2 Universal sheet layout (generator)

`FRAME_SIZE = 64` and `STANDARD_ANIMATION_FRAMES_PER_ROW = 13`, so a full sheet is 832 px wide
([constants.ts][constants], VERIFIED). I counted frames from the PNG sizes of
`spritesheets/body/bodies/male/<anim>.png` at the pinned commit ([example: walk.png][png-walk]).

| Animation | Rows (directions) | Frames per row | PNG size | Sheet row offset | Status |
|---|---|---|---|---|---|
| spellcast | 4 | 7 | 448x256 | 0 | VERIFIED |
| thrust | 4 | 8 | 512x256 | 4 | VERIFIED |
| walk | 4 | 9 (the generator's walk cycle plays frames 1 to 8) | 576x256 | 8 | VERIFIED |
| slash | 4 | 6 | 384x256 | 12 | VERIFIED |
| shoot | 4 | 13 | 832x256 | 16 | VERIFIED |
| hurt | 1 (facing down only) | 6 | 384x64 | 20 | VERIFIED |
| climb | 1 | 6 | 384x64 | 21 | VERIFIED |
| idle | 4 | 2 (cycle 0,0,1) | 128x256 | 22 | VERIFIED |
| jump | 4 | 5 | 320x256 | 26 | VERIFIED |
| sit | 4 | 3 | 192x256 | 30 | VERIFIED |
| emote | 4 | 3 | 192x256 | 34 | VERIFIED |
| run | 4 | 8 | 512x256 | 38 | VERIFIED |
| combat idle | 4 | 2 | 128x256 | 42 | VERIFIED |
| 1h slash / backslash / halfslash | 4 | backslash cycle reaches index 12; halfslash 6 | not measured | 46 / 50 | VERIFIED from [constants.ts][constants] only |
| watering | (reuses thrust) | cycle 0,1,4,4,4,4,5 of the thrust row, `noExport: true` | none | 4 | VERIFIED |

- The original six animations fill rows 0 to 20: 21 rows, or 1344 px. Extended animations run to row 53.
  These are derived from the row offsets in [constants.ts][constants].
- **There is no carry or lift animation.** It is not in the `ANIMATIONS` list ([constants.ts][constants],
  VERIFIED). A farm sim will need to draw one, or fake it with walk frames plus an item drawn over the head.
- Body types are `male, female, teen, child, muscular, pregnant` (`BODY_TYPES`, [constants.ts][constants],
  VERIFIED). Skeleton and zombie are special bodies (`sheet_definitions/body/special/body_skeleton.json`,
  `body_zombie.json` under [sheet_definitions][sd-base]).
  Heads are separate layers: human male, female, elderly, child, plus fantasy heads ([OGA: LPC Character Bases][oga-bases]).
  That page says version 3.0 (10/2022) "separated modular heads from headless bodies" and harmonised head and hand
  positions across all bodies except child (VERIFIED).

### 2.3 Names: ULPC, LPC Revised, LPC Expanded

From the generator README "Terms" section ([README][gen-repo], VERIFIED):

- **ULPC**: the original LPC extended with oversize weapon frames and more bases. The original LPC had only
  spellcast, slash, thrust, walk, shoot and hurt, for adult male and female, at 64x64.
- **LPC Revised (LPCR)**: ElizaWy's rework. It changes some frame counts and orders, uses a new palette and
  smaller heads. ElizaWy's repo says its assets are "CC-BY-3.0 or OGA-by 3.0"
  ([ElizaWy/LPC README][eliza], VERIFIED).
- **LPC Expanded (LPCE)**: adds bow, climb, run and jump animations, and child and elderly bases. The README notes
  "Many of the assets ... are not yet drawn for these new animations and bases."

### 2.4 Generator, forks and credits system

- The current home is [LiberatedPixelCup/...][gen-repo], live at
  [liberatedpixelcup.github.io][gen-live] (HTTP 200). The code is GPL 3.0 ([LICENSE][gen-license]). VERIFIED.
- The [sanderfrenken fork][fork] is a GitHub fork of the LiberatedPixelCup repo, last pushed 2025-01-03. Its site
  [sanderfrenken.github.io][fork-live] still responds. The README thanks sanderfrenken for "maintaining the
  primary fork of the repository for many years". VERIFIED. Use the LiberatedPixelCup repo, which is current.
- **Credits system.** Each sheet definition carries a `credits[]` array of `{file, notes, authors[], licenses[],
  urls[]}`. `CREDITS.csv` has the same data per PNG (`filename,notes,authors,licenses,urls`), and the build
  regenerates it ([README][gen-repo], [CREDITS.csv][credits-csv]). The live generator can also download a credits
  CSV or text file for the current character ([README][gen-repo]). VERIFIED.
- README rule: "If you generate a sprite using this tool, or use individual images taken directly from the
  `spritesheets` subdirectory from this repo, you must at least credit all the authors (except for CC0 licensed
  artwork)." Make the credits "accessible from within your game", for example on the credits screen or through
  a visible link ([README][gen-repo], VERIFIED).
- **Recolouring.** Items with a `recolors` field (material `cloth`, `hair`, `body`, `metal`, `wood`) are recoloured
  at runtime by palette swap with a tolerance of ±1 per channel ([PALETTE_RECOLOR_GUIDE.md][pal-guide], VERIFIED).
  In the pinned commit, 222 sheet definitions are variant-only, 122 use the cloth palette and 122 the hair palette
  (my count over all definitions).

### 2.5 Style fit notes

- **Proportions.** I measured the male head at 22x21 px and the body plus head at 30x47 px on the walk "down"
  frame. The figure spans x 17 to 47 and y 15 to 62 of the 64x64 cell, with the feet at y 62 (PNG measurement,
  VERIFIED). That is a large-headed figure about 2.2 heads tall. The style guide says about 2.5. "Roughly 3:4
  head-to-body" overstates the head. The measured head-to-rest-of-body ratio is about 4:5.
- **Fantasy lean.** About a third of the catalogue is armour, helmets, weapons, wizard hats and beast heads. The
  civilian clothes are mostly pirate, medieval or "pseudo-victorian" (bluecarrot16's own words on
  [LPC Gentleman][oga-gentleman], VERIFIED). Modern basics (t-shirt, polo, shorts) come from ElizaWy's LPC Revised.
- **Palette.** The style guide requires no fixed palette but asks for hue-shifted ramps: highlights toward yellow,
  shadows toward purple, "No pure colors!" ([style guide][styleguide], VERIFIED). Our era palettes must follow
  this rule for recoloured LPC parts to match.
- **Downscaling breaks it. Do not do it.** LPC art uses 1 px near-black outlines and 5-shade ramps on a 30 px wide
  figure. Scaling 64 to 48 (×0.75) with nearest-neighbour drops every fourth row and column, which breaks
  outlines and makes walk frames jitter unevenly. Scaling to 32 px (×0.5) halves the figure to about 15x24 and
  merges the ramps into mush. Smooth scaling blurs everything. Our 16x32 and 24x32 tiers need art drawn at that
  size, not LPC. **(Reasoning, UNVERIFIED by test.)**
- **Cropping is fine; scaling is not.** For the 48x64 tier, crop each 64x64 cell to x 8 to 56. The style guide's
  48x64 clothing box and the measured 26x53 bowler silhouette both fit. A 32x48 crop clips hats: the bowler starts
  at y 9 and the feet end at y 62, a 53 px span. Slash and thrust arm swings also go wider than 32.

---

## 3. Licence matrix

| Licence | Attribution | ShareAlike on our modified art | Technical measures (DRM) | Notes | Source |
|---|---|---|---|---|---|
| **CC0** | Not required | No | No restriction | Credit anyway, as a courtesy and for traceability. | [OGA FAQ][oga-faq], [CC0 legal code][cc0] |
| **CC-BY 3.0 / 4.0** | Required: creator, copyright and licence notices, link; 4.0 also requires saying whether you modified it | No | Not allowed to restrict recipients' rights | 4.0 lets you satisfy attribution with "a URI or hyperlink to a resource that includes the required information". | [CC BY 4.0 legal code][ccby4] §3(a) |
| **OGA-BY 3.0** | Same as CC-BY 3.0 | No | **Removed**: OGA-BY "removes that license's restriction on technical measures" | §8(g): "You may distribute this work under the terms of the Creative Commons Attribution 3.0 license". | [OGA-BY 3.0 text][ogaby], [OGA-BY FAQ][ogaby-faq] |
| **CC-BY-SA 3.0** | Required (§4(c)), including "a credit identifying the use of the Work in the Adaptation" | **Yes**: adaptations must use BY-SA 3.0, a later BY-SA version, or a CC-compatible licence (§4(b)) | Not allowed (§4(a), 4(b)) | No non-CC licence is compatible with BY-SA 3.0, so GPL is not. | [BY-SA 3.0 legal code][bysa3], [CC compatible licences][cc-compat] |
| **CC-BY-SA 4.0** | Required, plus "indicate if You modified" (§3(a)) | **Yes** (§3(b)) | Not allowed | GPLv3 is a "BY-SA-Compatible License", one way only, so BY-SA 4.0 adaptations can go to GPLv3. | [BY-SA 4.0 legal code][bysa4], [CC compatible licences][cc-compat] |
| **GPL 2.0 / 3.0** | OGA: "Attribution is an optional part of the GPL, however you should assume that all work contained on OpenGameArt requires it" | Copyleft on the work and its modifications | Section 3 (anti-circumvention) | "Source code" means "the preferred form of the work for making modifications to it". Conveying it requires giving "all recipients a copy of this License". For art in a non-GPL game, OGA warns that game developers should "fully understand GNU GPL". | [GPL 3.0 text][gpl3], [GPL FAQ][gpl-faq-art], [OGA FAQ][oga-faq] |
| **"OGA-SA 3.0"** | n/a | n/a | n/a | **Not a real OGA licence.** The OGA FAQ lists OGA-BY 3.0/4.0 only. It appears on 17 CREDITS.csv rows (corset, scarf). Treat it as a data error and pick the CC-BY-SA 3.0 that is also listed. | [OGA FAQ][oga-faq], [CREDITS.csv][credits-csv] |

**Multiple licences mean you choose one.** "You must follow only one of the licenses. However, when you
re-distribute/edit, you are encouraged to include/use all of the licenses" ([OGA FAQ][oga-faq], VERIFIED).

**Choice rule for this project:**

1. Use **CC-BY-SA 3.0** if it is listed on the generator row *or* every upstream OGA page.
2. Otherwise use **OGA-BY 3.0**, then CC-BY, then CC0.
3. Never choose GPL.
4. Record the choice per source in `credits.json` (section 8).

---

## 4. Asset catalogue (generator items worth using)

**How to read this table:**

- **Path** is the folder under `spritesheets/`.
- **Def** is the file under `sheet_definitions/`. Prefix it with
  `https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/blob/86160e7507d6841259cff624a51a63c1d4847ee3/sheet_definitions/`.
- Authors and licences are copied exactly from the definition's `credits[]` entry. Authors in brackets are named
  only in its `notes` field; credit them too.
- **Recolour** is either "pal" (palette ramp, works directly with our shade masks) or "var N" (N pre-coloured
  variants).
- **Anims**: "all" means all 17 generator animations. Otherwise the list is from the definition or from
  CREDITS.csv.
- Every row is VERIFIED from its sheet definition unless marked otherwise.

### 4.1 Bodies and heads

| ID | Item (def) | Path | Authors | Licences listed | Pick | Notes |
|---|---|---|---|---|---|---|
| B1 | Body male (`body/body.json`) | body/bodies/male | bluecarrot16, JaidynReiman, Benjamin K. Smith (BenCreating), Evert, Eliza Wyatt (ElizaWy), TheraHedwig, MuffinElZangano, Durrani, Johannes Sjölund (wulax), Stephen Challener (Redshrike) | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | CC-BY-SA 3.0 | VERIFIED+csv (walk.png). The [OGA bases page][oga-bases] lists only CC-BY-SA 3.0 and GPL 3.0, so do not pick OGA-BY. |
| B2 | Body female | body/bodies/female | BenCreating, bluecarrot16, TheraHedwig, Evert, MuffinElZangano, Durrani, Pierre Vigier (pvigier), ElizaWy, Matthew Krohn (makrohn), wulax, Redshrike | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | CC-BY-SA 3.0 | |
| B3 | Body teen | body/bodies/teen | bluecarrot16, Evert, TheraHedwig, BenCreating, MuffinElZangano, Durrani, pvigier, ElizaWy, makrohn, wulax, Redshrike | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | CC-BY-SA 3.0 | |
| B4 | Body child | body/bodies/child | bluecarrot16, BenCreating, ElizaWy, MuffinElZangano, Durrani, Nila122, kheftel, Redshrike | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | CC-BY-SA 3.0 | Very few hats or clothes fit it. |
| B5 | Body muscular | body/bodies/muscular | bluecarrot16, JaidynReiman, Evert, TheraHedwig, MuffinElZangano, Durrani, Sander Frenken (castelonia), BenCreating, ElizaWy, dalonedrau, Redshrike | CC-BY-SA 3.0, GPL 3.0 | CC-BY-SA 3.0 | |
| B6 | Body pregnant | body/bodies/pregnant | bluecarrot16, JaidynReiman, Evert, TheraHedwig, MuffinElZangano, Durrani, BenCreating, pvigier, ElizaWy, makrohn, wulax, Redshrike | CC-BY-SA 3.0, GPL 3.0 | CC-BY-SA 3.0 | |
| H1 | Human male head (`head/heads/human/heads_human_male.json`) | head/heads/human/male | bluecarrot16, BenCreating, Redshrike | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | CC-BY-SA 3.0 | VERIFIED+csv (walk.png) |
| H2 | Human female head | head/heads/human/female | bluecarrot16, BenCreating, Redshrike | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | CC-BY-SA 3.0 | |
| H3 | Human male elderly head | head/heads/human/male_elderly | BenCreating, ElizaWy, Redshrike | OGA-BY 3.0, CC-BY 3.0 | OGA-BY 3.0 | |
| H4 | Human female elderly head | head/heads/human/female_elderly | BenCreating, ElizaWy, Redshrike | OGA-BY 3.0, CC-BY 3.0 | OGA-BY 3.0 | |
| H5 | Human child head | head/heads/human/child | Redshrike, kheftel, bluecarrot16 | OGA-BY 3.0, CC-BY 3.0, GPL 3.0 | OGA-BY 3.0 | |

### 4.2 Hats and head coverings

None of these support the child body.

| ID | Item (def) | Path | Authors | Licences listed | Recolour | Pick / notes |
|---|---|---|---|---|---|---|
| T1 | Tricorne (`headwear/hats/tricorne/hat_tricorne.json`) | hat/pirate/tricorne/basic | bluecarrot16 [JaidynReiman] | OGA-BY 3.0 | var 24 | **Licence conflict.** [LPC Pirates][oga-pirates] lists CC-BY-SA 3.0 only. [LPC Expanded Hats][oga-hats-exp] says all its assets are CC-BY-SA/GPL 3.0, with Tricorne "also OGA-BY 3.0". Pick CC-BY-SA 3.0. VERIFIED+csv. |
| T2 | Bicorne fore-aft (`headwear/hats/foreaft/hat_bicorne_foreaft.json`) | hat/pirate/bicorne/foreaft | bluecarrot16, JaidynReiman | OGA-BY 3.0 | var | Same conflict and same pick as T1. A better 1807 shape than the tricorne. |
| T3 | Bicorne athwart (`headwear/hats/athwart/hat_bicorne_athwart_basic.json`) | hat/pirate/bicorne/athwart/basic | bluecarrot16 [JaidynReiman] | OGA-BY 3.0 | var | Same as T1. |
| T4 | Formal top hat (`headwear/hats/formal/hat_formal_tophat.json`) | hat/formal/tophat | bluecarrot16 | CC-BY-SA 3.0, GPL 3.0 | var 26 | CC-BY-SA 3.0. The OGA hats page says Formal Hats are "CC-BY-SA 3.0 and GPL 3.0 only". |
| T5 | Formal bowler (`headwear/hats/formal/hat_formal_bowler.json`) | hat/formal/bowler | bluecarrot16 | CC-BY-SA 3.0, GPL 3.0 | var 26 | CC-BY-SA 3.0. VERIFIED+csv. Its [LPC Gentleman][oga-gentleman] page also says CC-BY-SA 3.0 / GPL 3.0. Base for our fedora and cloche edits. |
| T6 | Leather cap (`headwear/hats/caps/hat_cap_leather.json`) | hat/cloth/leather_cap | Johannes Sjölund (wulax), Matthew Krohn (Makrohn), JaidynReiman | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | var 25 | CC-BY-SA 3.0. A skullcap shape. Possible base for a bath attendant cap. |
| T7 | Bandana (`headwear/coverings/bandana/hat_bandana.json`) | hat/cloth/bandana | Matthew Krohn (makrohn), JaidynReiman, Marcel van de Steeg (MadMarcel) | OGA-BY 3.0, CC-BY-SA 3.0 | pal | CC-BY-SA 3.0. VERIFIED+csv. |
| T8 | Kerchief (`headwear/coverings/headbands/hat_headband_kerchief.json`) | hat/pirate/kerchief | bluecarrot16, JaidynReiman, Nila122 | OGA-BY 3.0, CC-BY-SA 3.0, GPL 2.0, GPL 3.0 | pal | CC-BY-SA 3.0. 1807 women's head cloth. |
| T9 | Hood (`headwear/coverings/hoods/hat_hood_cloth.json`) | hat/cloth/hood | wulax, JaidynReiman | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | pal | CC-BY-SA 3.0 |
| T10 | Cavalier / Bonnie (`headwear/hats/caps/hat_cap_cavalier.json`, `hat_cap_bonnie.json`) | hat/pirate/cavalier, hat/pirate/bonnie | bluecarrot16, JaidynReiman | OGA-BY 3.0 | var 24 | Conflict as T1, pick CC-BY-SA 3.0. Brimmed hat; a possible base for a wide-brim repaint. |
| X1 | Stetson cowboy hat (external, [OGA][oga-stetson]) | not in the generator | AntumDeluge | CC-BY 4.0, CC-BY 3.0, OGA-BY 3.0 | n/a | The author says its east/west angle "doesn't match LPC well". "TODO: Add sets for attack, magic, hurt, etc." Not usable for walk without redrawing. VERIFIED |
| X2 | "LPC Hats", 3 hats ([OGA][oga-lpc-hats]) | not in the generator | Baŝto | CC-BY-SA 3.0, GPL 3.0 | n/a | Which hats these are: UNVERIFIED (preview not inspected). |

### 4.3 Torso

| ID | Item (def under `torso/`) | Path | Bodies | Authors | Licences listed | Recolour, anims |
|---|---|---|---|---|---|---|
| C1 | Frock coat (`jacket/torso_jacket_frock.json`) | torso/jacket/frock | male | bluecarrot16 | CC-BY-SA 3.0 | var 24. **6 original anims only.** VERIFIED+csv |
| C2 | Frock lapel / collar trim (`jacket/accessory/torso_jacket_frock_lapel.json`, `..._collar.json`) | torso/jacket/trim | male | bluecarrot16 | OGA-BY 3.0 | 6 anims (csv) |
| C3 | Collared coat (`jacket/torso_jacket_collared.json`) | torso/jacket/collared | male | bluecarrot16 | CC-BY-SA 3.0, GPL 3.0 | var 25. 6 anims (csv). The suit jacket. |
| C4 | Trench coat (`jacket/torso_jacket_trench.json`) | torso/jacket/trench | male | bluecarrot16 | CC-BY-SA 3.0, GPL 3.0 | 2 variants (gray, dark gray). 6 anims (csv) |
| C5 | Vest (`vest/torso_clothes_vest.json`) | torso/clothes/vest | male | bluecarrot16, Thane Brimhall (pennomi), laetissima, Redshrike, wulax. The striped and gray variants also credit Michael Whitlock (bigbeargames). | CC-BY-SA 3.0, GPL 3.0 | var 26. 7 anims (6 + idle, csv) |
| C6 | Open vest (`vest/torso_clothes_vest_open.json`) | torso/clothes/vest_open | male | bluecarrot16, pennomi, laetissima | CC-BY-SA 3.0, GPL 3.0 | var 24 |
| C7 | Collared/formal longsleeve (`shirts/longsleeve/torso_clothes_longsleeve_formal.json`) | torso/clothes/longsleeve/formal | male | bluecarrot16, pennomi, laetissima, Redshrike, wulax | CC-BY-SA 3.0, GPL 3.0 | White only. 6 anims (csv). Dress shirt. |
| C8 | Longsleeve (`shirts/longsleeve/torso_clothes_longsleeve.json`) | torso/clothes/longsleeve/longsleeve | male, female, teen, pregnant | male: JaidynReiman, wulax. female: bluecarrot16, ElizaWy, JaidynReiman, Redshrike. Teen and pregnant credits differ (see def). | male and female: OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0. teen: OGA-BY 3.0, GPL 3.0. pregnant: CC-BY-SA 3.0, GPL 3.0. | pal, all |
| C9 | Longsleeve laced (`shirts/longsleeve/torso_clothes_longsleeve_laced.json`) | torso/clothes/longsleeve/laced | male | bluecarrot16, JaidynReiman, Redshrike, wulax | CC-BY-SA 3.0, GPL 3.0 | var 24. Stand-in for the 1807 hunting shirt. |
| C10 | Longsleeve 2 buttoned (`shirts/longsleeve/torso_clothes_longsleeve2_buttoned.json`) | torso/clothes/longsleeve/longsleeve2_buttoned | male, female, teen | ElizaWy, JaidynReiman, Redshrike, wulax | OGA-BY 3.0 | all |
| C11 | T-shirt (`shirts/shortsleeve/torso_clothes_tshirt.json`) | torso/clothes/shortsleeve/tshirt | male, female, teen | ElizaWy, JaidynReiman, Redshrike, wulax | OGA-BY 3.0 | pal, all. VERIFIED+csv. The [OGA page][oga-shirts] lists 7 licences, including CC-BY-SA 3.0. |
| C12 | Shortsleeve polo (`shirts/shortsleeve/torso_clothes_shortsleeve_polo.json`) | torso/clothes/shortsleeve/shortsleeve_polo | male, female, teen | ElizaWy, JaidynReiman, Redshrike, wulax | OGA-BY 3.0 | pal, all |
| C13 | Tank top (`shirts/sleeveless/torso_clothes_sleeveless_tanktop.json`) | torso/clothes/sleeveless/tanktop | female, pregnant | bluecarrot16, ElizaWy, makrohn, MadMarcel, Redshrike, wulax | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | var 24 |
| C14 | Sleeveless (`shirts/sleeveless/torso_clothes_sleeveless.json`) | torso/clothes/sleeveless/sleeveless | male, female | male: bluecarrot16, makrohn, JaidynReiman, MadMarcel, Nila122, wulax, Redshrike | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | 6 anims (csv) |
| C15 | Blouse / longsleeve blouse (`shirts/torso_clothes_blouse.json`, `..._blouse_longsleeve.json`) | torso/clothes/blouse(_longsleeve) | female | bluecarrot16, ElizaWy, Lanea Zimmerman (Sharm) | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | var 19 |
| C16 | Corset (`shirts/torso_clothes_corset.json`) | torso/clothes/corset | female | ElizaWy, Nila122 | "OGA-SA 3.0", CC-BY-SA 3.0, GPL 3.0 | var 19. Pick CC-BY-SA 3.0. |
| C17 | Apron (`aprons/torso_aprons_apron.json`) | torso/aprons/apron | male, female, teen | Nila122 | OGA-BY 3.0, CC-BY-SA 3.0, GPL 2.0, GPL 3.0 | var 24 |
| C18 | Apron full / half (`aprons/torso_aprons_apron_full.json`, `..._half.json`) | torso/aprons/apron_full, apron_half | female | ElizaWy, bluecarrot16 | OGA-BY 3.0, GPL 3.0 | var 24 |
| C19 | Overalls (`aprons/torso_aprons_overalls.json`) | torso/aprons/overalls | male, female, teen | ElizaWy, bluecarrot16, JaidynReiman | OGA-BY 3.0, GPL 3.0 | var 24, all. VERIFIED+csv |
| C20 | Suspenders (`aprons/torso_aprons_suspenders.json`) | torso/aprons/suspenders | male, muscular, female, pregnant, teen | ElizaWy, JaidynReiman | OGA-BY 3.0 | var 24, all (csv) |
| D1 | Bodice (`dresses/dress_bodice.json`) | dress/bodice | female | bluecarrot16, makrohn, Sharm | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | var 24. 7 anims (csv) |
| D2 | Sash dress (`dresses/dress_sash.json`) | dress/sash | female | bluecarrot16, pennomi, laetissima, makrohn | CC-BY-SA 3.0, GPL 3.0 | var 24. 7 anims (csv) |
| D3 | Slit dress (`dresses/dress_slit.json`) | dress/slit | female | Nila122, ElizaWy, bluecarrot16 | OGA-BY 3.0, CC-BY-SA 3.0, GPL 2.0, GPL 3.0 | var 24. 7 anims |

### 4.4 Legs and feet

All use the cloth palette ("pal").

| ID | Item (def under `legs/` or `feet/`) | Path | Bodies | Authors | Licences listed | Anims |
|---|---|---|---|---|---|---|
| L1 | Pants (`pants/legs_pants.json`) | legs/pants | male, muscular, female, teen, pregnant | male: bluecarrot16, JaidynReiman, ElizaWy, makrohn, wulax, Redshrike. The thin version adds Joe White. | OGA-BY 3.0, GPL 3.0, CC-BY-SA 3.0 | all. VERIFIED+csv. The csv walk.png row also lists `opengameart.org/content/lpc-expanded-pants` (not opened), which the def omits. |
| L2 | Formal pants (`pants/legs_formal.json`) | legs/formal | male, muscular, female, teen, pregnant | bluecarrot16, JaidynReiman, ElizaWy, wulax, Redshrike | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | all |
| L3 | Striped formal pants (`pants/legs_formal_striped.json`) | legs/formal_striped | same | same | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | all |
| L4 | Cuffed pants (`pants/legs_cuffed.json`) | legs/cuffed | male, female, teen | JaidynReiman, ElizaWy, Bluecarrot16, wulax, Redshrike | male: OGA-BY 3.0, GPL 3.0. thin: OGA-BY 3.0 | all |
| L5 | Pantaloons (`pants/legs_pantaloons.json`) | legs/pantaloons | male, muscular, female, pregnant, teen | Nila122, JaidynReiman, wulax, Redshrike | OGA-BY 3.0, GPL 2.0, GPL 3.0, CC-BY-SA 3.0 (muscular: CC-BY-SA 3.0, GPL 2.0/3.0) | all |
| L6 | Hose (`leggings/legs_hose.json`) | legs/hose | male, female, teen | male: JaidynReiman, ElizaWy, bluecarrot16, wulax, Redshrike | male: OGA-BY 3.0, GPL 3.0. thin: OGA-BY 3.0 | all |
| L7 | Shorts / short shorts (`shorts/legs_shorts.json`, `..._short.json`) | legs/shorts/shorts, legs/shorts/short_shorts | male, female, teen, pregnant | JaidynReiman, ElizaWy, Bluecarrot16, wulax, Redshrike | male: OGA-BY 3.0, GPL 3.0. thin: OGA-BY 3.0 | all |
| L8 | Belle skirt (`skirts/legs_skirt_belle.json`) | legs/skirts/belle | female, pregnant, teen | bluecarrot16, makrohn, Sharm | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | 10: no run, jump or sit (def; csv shows 9 PNGs) |
| L9 | Straight skirt (`skirts/legs_skirt_straight.json`) | legs/skirts/straight | female, pregnant, teen | bluecarrot16, ElizaWy | OGA-BY 3.0, GPL 3.0 | no run, jump or sit |
| L10 | Plain skirt (`skirts/legs_skirts_plain.json`) | legs/skirts/plain | male, female, teen, pregnant | bluecarrot16, pvigier, wulax, Ahmad3366, JaidynReiman | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | includes sit, but no run or jump |
| L11 | Overskirt (`skirts/legs_skirt_overskirt.json`) | legs/skirts/overskirt | female, pregnant, teen | bluecarrot16, makrohn, Sharm | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | no run, jump or sit |
| F1 | Basic boots (`boots/feet_boots_basic.json`) | feet/boots/basic | all adult | JaidynReiman, bluecarrot16, Nila122 | OGA-BY 3.0, CC-BY-SA 3.0, GPL 2.0, GPL 3.0 | all |
| F2 | Revised boots (`boots/feet_boots_revised.json`) | feet/boots/revised | all adult | male: JaidynReiman, ElizaWy, Bluecarrot16, Redshrike, wulax | male: OGA-BY 3.0, GPL 3.0. thin: OGA-BY 3.0 | all |
| F3 | Basic shoes (`shoes/feet_shoes_basic.json`) | feet/shoes | all adult | JaidynReiman, bluecarrot16, wulax. The thin version: JaidynReiman, Joe White, wulax. | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | all |
| F4 | Revised shoes (`shoes/feet_shoes_revised.json`) | feet/shoes/revised | all adult | male: JaidynReiman, ElizaWy, Bluecarrot16, Redshrike, wulax | male: OGA-BY 3.0, GPL 3.0. thin: OGA-BY 3.0 | all |

### 4.5 Neck, glasses, beards, hair

| ID | Item (def) | Path | Authors | Licences listed | Notes |
|---|---|---|---|---|---|
| N1 | Necktie (`headwear/neck/neck_necktie.json`) | neck/tie/necktie | JaidynReiman, bluecarrot16, pennomi, laetissima, Makrohn | CC-BY-SA 3.0, GPL 3.0 | pal. No climb. |
| N2 | Bowtie (`headwear/neck/neck_bowtie.json`) | neck/tie/bowtie | JaidynReiman, bluecarrot16, pennomi, laetissima, Makrohn | CC-BY-SA 3.0, GPL 3.0 | pal |
| N3 | Cravat (`headwear/neck/neck_cravat.json`) | neck/cravat | bluecarrot16 | OGA-BY 3.0, GPL 3.0 | pal. 1807 and 1871. |
| N4 | Jabot (`headwear/neck/neck_jabot.json`) | neck/jabot | bluecarrot16 | OGA-BY 3.0, GPL 3.0 | pal |
| N5 | Scarf (`headwear/neck/neck_scarf.json`) | neck/scarf | Nila122, JaidynReiman, wulax, Redshrike | "OGA-SA 3.0", CC-BY-SA 3.0, GPL 2.0, GPL 3.0 | Pick CC-BY-SA 3.0. |
| G1 | Glasses (`headwear/accessories/glasses/facial_glasses.json`) | facial/glasses/glasses | ElizaWy | OGA-BY 3.0 | var 32. Fits the child body too. |
| G2 | Round glasses (`.../facial_glasses_round.json`) | facial/glasses/round | bluecarrot16, pennomi, laetissima | CC-BY-SA 3.0, GPL 3.0 | 1871 to 1931 |
| G3 | Secretary glasses (`.../facial_glasses_secretary.json`) | facial/glasses/secretary | JaidynReiman, pennomi, laetissima | CC-BY-SA 3.0, GPL 3.0 | Nearest thing to 1955 cat-eye frames (the cat-eye fit is UNVERIFIED; preview not inspected). |
| G4 | Sunglasses (`.../facial_glasses_sunglasses.json`) | facial/glasses/sunglasses | Michael Whitlock (bigbeargames), pennomi, laetissima | CC-BY-SA 3.0, GPL 3.0 | 2026 |
| G5 | Monocle (`headwear/accessories/monocle/facial_monocle_left.json`) | facial/monocle | bluecarrot16, pennomi, laetissima | CC-BY-SA 3.0, GPL 3.0 | 1886 |
| E1 | Basic beard (`hair/beards/beards_beard.json`) | beards/beard/basic | JaidynReiman, Carlo Enrico Victoria (Nemisys) | CC-BY-SA 3.0, GPL 3.0 | Hair palette |
| E2 | Trimmed beard | beards/beard/trimmed | ElizaWy | OGA-BY 3.0 | |
| E3 | Winter beard | beards/beard/winter | bluecarrot16 | CC0 | |
| E4 | Mustache (`hair/mustaches/beards_mustache.json`) | beards/mustache/basic | JaidynReiman, Nemisys | CC-BY-SA 3.0, GPL 3.0 | |
| E5 | Handlebar mustache | beards/mustache/handlebar | ElizaWy | OGA-BY 3.0 | 1871 and 1886 |
| E6 | Walrus mustache | beards/mustache/walrus | ElizaWy | OGA-BY 3.0 | 1871 and 1886 |
| R1 | Long tied (`hair/braids/hair_long_tied.json`) | hair/long_tied | JaidynReiman, thecilekli, bluecarrot16 | CC0 | A tied-back queue for 1807 men. |
| R2 | Bangs bun (`hair/braids/hair_bangs_bun.json`) | hair/bangs_bun | ElizaWy, bluecarrot16 | CC0 | 1807 to 1886 women |
| R3 | High bun, extension (`hair/extensions/ties/hairext_high_bun.json`) | hair/extensions/ties/high_bun | JaidynReiman | OGA-BY 3.0 | 1886 |
| R4 | Bob (`hair/bob/hair_bob.json`) | hair/bob | ElizaWy, bluecarrot16 | CC0 | 1931 |
| R5 | Parted (`hair/short/hair_parted.json`) | hair/parted | JaidynReiman, Joe White, Manuel Riecke (MrBeast) | CC-BY-SA 3.0, GPL 3.0 | 1886 to 1955 men |
| R6 | Plain (`hair/short/hair_plain.json`) | hair/plain | JaidynReiman, MrBeast, Joe White | OGA-BY 3.0, CC-BY-SA 3.0, GPL 3.0 | |
| R7 | Buzzcut | hair/buzzcut | ElizaWy | OGA-BY 3.0 | 2026 |
| R8 | Balding | hair/balding | ElizaWy | OGA-BY 3.0 | |
| R9 | High and tight | hair/high_and_tight | Skorpio, bluecarrot16 | CC-BY-SA 3.0, GPL 3.0 | 1955 |
| R10 | Curly short | hair/curly_short | ElizaWy | OGA-BY 3.0 | 1955 women |
| R11 | Swoop | hair/swoop | JaidynReiman, MrBeast | CC-BY-SA 3.0, GPL 3.0 | 1931 and 1955 |
| R12 | Pixie | hair/pixie | JaidynReiman, MrBeast | CC-BY-SA 3.0, GPL 3.0 | |
| R13 | Large curls | hair/curls_large | JaidynReiman | OGA-BY 3.0+, CC-BY 3.0+, GPL 3.0+ | 1871 ringlets |
| R14 | Long straight | hair/long_straight | JaidynReiman, thecilekli, bluecarrot16 | CC0 | |

---

## 5. Era fit table

The IDs refer to section 4. "GAP" means nothing suitable exists in the generator. "Edit" means start from the
named LPC item, which makes the result an adaptation: CC-BY-SA if the source was chosen as CC-BY-SA, and it must
credit the source authors.

| Era | Body / head | Torso | Legs / feet | Hat | Hair / face / extras |
|---|---|---|---|---|---|
| **1807** trapper / settler (m) | B1 or B5, H1, H3 | Buckskin fringed hunting shirt: **GAP** (stand-in: C9 laced or C8 recoloured tan, fringe hand-drawn). Linen hunting shirt: C8 recoloured. | L5 pantaloons or L1, F1 boots. Leggings: L6 hose. | Fur cap: **GAP**. Gentry: T2 or T3 bicorne, T1 tricorne (slightly old-fashioned) | R1 long tied, E1 or E3, N3 cravat |
| **1807** women | B2, H2, H4 | Short-gown: C15 longsleeve blouse plus C17 apron. Empire-waist gown: **GAP** (edit D2 sash dress, raising the sash). | L10 plain skirt as petticoat, F3 shoes | T8 kerchief. Mob cap: **GAP** | R2 bangs bun |
| **1871** (m) | B1, H1, H3 | C1 frock coat with C2 trim (male only, 6 anims), C7 shirt, C5 vest | L2 or L3, F1 | T4 top hat. Wide-brim: **GAP** (repaint T10, or X1 needs a full redraw) | E5, E6, E1, N3 cravat or N1 |
| **1871** (f) | B2, H2 | D1 bodice or C15 longsleeve blouse | L8 belle skirt. First bustle: **GAP** (edit L8: add a back hump on the up and side frames) | Bonnet: **GAP** | R2, R13, R3 |
| **1886** (m) | B1, H1 | Three-piece suit: C3 collared coat, C5 vest, C7 shirt | L2 or L3, F3 | T5 bowler. Chef toque: **GAP**. Bath attendant cap: **GAP** (maybe edit T6). Baseball trainer cap: **GAP** | N1 or N2, G5, E5 |
| **1886** chef / bath attendant | B1 or B2 | C8 or C11 recoloured white, C17 apron (chef) | L1 recoloured white | toque and cap **GAP** (see above) | |
| **1886** (f) | B2, H2 | D1 bodice, C15 longsleeve blouse | L8. Peak bustle: **GAP** (bigger edit of L8) | Small hat or bonnet: **GAP** | R3 high bun |
| **1931** (m) | B1, H1 | Wide-lapel suit: C3 (lapels as drawn; widen them by hand) or C4 trench. Croupier: C7 white, C5 black, N2 | L2 black, F3. Overalls: C19 plus C20 suspenders | Fedora: **GAP** (edit T5: wider brim, pinched crown) | R5, R11, E4 |
| **1931** (f) | B2, H2 | C15 blouse | L9 straight skirt | Cloche: **GAP** (edit T5: short down-turned brim) | R4 bob |
| **1955** (m) | B1, H1 | Gray flannel suit: C3 in gray, C7, N1 | L2 gray, F3 | Fedora (shared with 1931) | R9, R5 |
| **1955** (f) | B2, H2 | New Look: D1 bodice or C15 | Full mid-calf skirt: edit L8 (shorten). Capris: **GAP** (crop L4) | none needed | R10, R12. Cat-eye: G3 (approximate) |
| **2026** | B1, B2, B3, B4 with H1, H2, H5 | C11 t-shirt, C12 polo, C13 tank. Hi-vis: C11 recoloured neon with hand-added reflective bands (**GAP** for the bands). | L7 shorts, L4 cuffed pants as jeans, F3 or F4 | Ball cap: **GAP**. Bike helmet: **GAP** | R7, R14, G4, G1 |

---

## 6. Gaps

1. **Hats to draw (about 10):** fur cap, mob cap, wide-brim slouch hat, bonnet (poke style), chef toque,
   bath-attendant cap, 1886 baseball cap, fedora, cloche, ball cap, bicycle helmet. Plus child-body versions of
   any hat a child wears, since no generator hat supports `child`.
2. **Silhouettes to draw:** bustle (1871 small, 1886 peak), Empire-waist gown, 1950s mid-calf full skirt,
   capris, buckskin fringe, hi-vis reflective bands.
3. **Body coverage:** every coat (C1 to C4) and vest (C5, C6) is male-only. Dresses (D1 to D3) and blouses (C15)
   are female-only. A woman in a coat in 1931, 1955 or 2026 needs new art.
4. **Animation coverage:** coats and the formal shirt have only spellcast, thrust, walk, slash, shoot and hurt.
   Dresses, the vest and the bodice add idle only. Long skirts lack run and sit. Plan to fall back to walk frame 0
   for idle, or draw idle frames. Nothing has a carry animation.
5. **Style:** LPC is medieval and fantasy leaning. 1807 frontier and 1950s womenswear are the furthest from its
   catalogue. Our own hand-drawn additions must follow the style guide rules: hue-shifted ramps, near-black
   outlines, about 60 degree camera, light from above.
6. **Scale:** LPC only works for the 48x64 tier on the 32 px tile setting. The 16x32 and 24x32 tiers need
   separate hand-drawn art. Do not produce them by scaling LPC (section 2.5).

---

## 7. Obligations

Licence facts are quoted from the legal codes linked in section 3. How they apply to our recolouring and
compositing is **our reading, not legal advice**.

### 7.1 Attribution, for every licence except CC0

- **CC-BY-SA 3.0 §4(c):** keep copyright notices and give the author's name, the title if supplied, and the URI
  "that Licensor specifies", plus a credit for any adaptation. The credit may be "implemented in any reasonable
  manner". If the work credits its other contributors, the LPC credit must appear "as part of these credits and in
  a manner at least as prominent". ([BY-SA 3.0][bysa3])
- **BY 4.0 / BY-SA 4.0 §3(a):** creator, copyright notice, licence notice, disclaimer notice, link, and
  "indicate if You modified the Licensed Material". A hyperlink to a page with the details is acceptable.
  ([BY 4.0][ccby4], [BY-SA 4.0][bysa4])
- **OpenGameArt's suggested format:** `"[asset name]" by [author name] licensed [license(s)]: [asset url]`
  ([OGA FAQ][oga-faq]).
- **LPC specific:**
  - The generator README says to "credit everyone who helped contribute to the LPC sprites you are using".
  - The base assets say authors are "as listed in CREDITS.TXT".
  - Some items ask for a link back, for example "Please link back to this page on OpenGameArt"
    ([LPC Gentleman][oga-gentleman]).
  - Rule for us: **credit every author in the `authors` field and every person named in `notes`, and link every
    URL in the `urls` field.** ([README][gen-repo], [base assets][oga-base]; all VERIFIED)

### 7.2 What counts as an adaptation for us (interpretation)

- **BY-SA 3.0 Adaptation:** a work "recast, transformed, or adapted including in any form recognizably derived
  from the original". A **Collection** holds the Work "in its entirety in unmodified form". BY-SA 4.0 Adapted
  Material is material "translated, altered, arranged, transformed, or otherwise modified" ([BY-SA 3.0][bysa3],
  [BY-SA 4.0][bysa4]).
- **Our reading:**
  - Recolouring, cropping 64x64 to 48x64, converting to a shade mask, redrawing frames, and baking several layers
    into one PNG all make an **adaptation** of each source layer involved.
  - Shipping an untouched PNG next to other files is a **collection**.
  - Treat every LPC file we ship as an adaptation. License it CC-BY-SA 3.0 (allowed for BY-SA 3.0 sources, and for
    OGA-BY, CC-BY and CC0 sources, which allow adaptations under any terms with attribution), and list the changes
    ("recoloured to shade mask; cropped to 48x64; frames re-packed").
- **Runtime compositing helps.** Our runtime composites layers in the player's browser, so we never distribute a
  baked composite. Each shipped file derives from one source and its credit stays simple. Screenshots and trailers
  do show composites: credit them as LPC-derived and license them CC-BY-SA 3.0.

### 7.3 ShareAlike covers the art, not the game code

- BY-SA 3.0 §4(a) and 4(b) apply to the Work "as incorporated in a Collection", but this "does not require the
  Collection apart from the Work itself to be made subject to the terms of this License" ([BY-SA 3.0][bysa3]).
- The OpenGameArt FAQ, quoting the FSF, says game code and game media "are separate entities and do not need to
  be released under the same license" ([OGA FAQ][oga-faq]).
- **Our reading:** the JS code keeps whatever licence we choose. Only our LPC-derived image files (and any art
  made by editing them) must be CC-BY-SA, and anyone may reuse those files under it.

### 7.4 Technological measures (DRM)

- BY-SA 3.0 forbids "any effective technological measures" that restrict recipients' rights. OGA-BY removes this
  restriction ([BY-SA 3.0][bysa3], [OGA-BY FAQ][ogaby-faq]).
- A plain browser game that serves ordinary PNG files over HTTP imposes no such measure, so this is not an issue
  for hsargames.com (our reading). Do not encrypt or obfuscate the sprite files.
- The generator README warns that app stores and Steam are unclear territory ("To be safe ... use CC0 and/or OGA-BY
  assets only if you intend to publish on such platforms"). Revisit this before any app-store build.

### 7.5 GPL for art

- If we ever picked GPL for an item, the "source" would be "the preferred form of the work for making
  modifications" ([GPL 3.0][gpl3]). For a sprite that means the layered originals, plus our palette and mask
  recipe. We would also have to give recipients the licence text.
- The GPL FAQ allows GPL on non-software "as long as it is clear what constitutes the 'source code'"
  ([GPL FAQ][gpl-faq-art]).
- **Avoid this.** Every item in section 4 has a non-GPL option. Still, keep the untouched upstream layer PNGs in
  `art-src/lpc/` (section 8). It costs nothing and documents provenance.

### 7.6 Licence texts to distribute

- BY-SA 3.0 §4(a) requires "a copy of, or the Uniform Resource Identifier (URI) for, this License with every copy".
  4.0 accepts a link.
- Ship full texts anyway, in `LICENSES/`:
  - `CC-BY-SA-3.0.txt`, from the [legal code][bysa3]
  - `OGA-BY-3.0.txt`, from the [OGA text][ogaby]
  - `CC-BY-3.0.txt`, only if we pick CC-BY for any item
  - `CC0-1.0.txt`, optional
  - `GPL-3.0.txt`, only if GPL is ever chosen

### 7.7 Dual- and multi-licensed items

Pick one licence and record it ([OGA FAQ][oga-faq]). Prefer a licence that appears on both the generator row and
the OGA page, because they disagree in places (B1 and T1 above).

---

## 8. CREDITS-ART.md procedure

### 8.1 Layout (proposed, not yet created)

```
art-src/lpc/
  UPSTREAM.txt          repo URL + commit SHA used (86160e7507d6841259cff624a51a63c1d4847ee3) + date pulled
  CREDITS.upstream.csv  copy of the generator's CREDITS.csv at that commit (unmodified)
  layers/<generator path>/<anim>.png   untouched upstream PNGs we actually use (provenance / "preferred form")
  credits.json          our machine-readable map: shipped file -> source layers -> chosen licence + changes
LICENSES/
  CC-BY-SA-3.0.txt  OGA-BY-3.0.txt  (CC-BY-3.0.txt, CC0-1.0.txt only if used)
CREDITS-ART.md          generated, never hand-edited
```

### 8.2 credits.json schema

```json
{
  "upstream": {
    "repo": "https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator",
    "commit": "86160e7507d6841259cff624a51a63c1d4847ee3"
  },
  "outboundLicense": "CC-BY-SA 3.0",
  "files": {
    "assets/chars/lpc/hat_bowler.png": {
      "changes": "converted bluecarrot16's grey base variant to a 5-level shade mask; cropped 64x64 frames to 48x64; kept walk/idle/thrust/slash only; re-packed into one strip",
      "sources": [
        {
          "upstreamFiles": [
            "hat/formal/bowler/adult/walk.png",
            "hat/formal/bowler/adult/idle.png",
            "hat/formal/bowler/adult/thrust.png",
            "hat/formal/bowler/adult/slash.png"
          ],
          "chosenLicense": "CC-BY-SA 3.0",
          "note": "generator lists CC-BY-SA 3.0, GPL 3.0; OGA page lists the same"
        }
      ]
    }
  }
}
```

Authors, licence lists and URLs are **not** typed by hand. The script joins them from `CREDITS.upstream.csv`, so
they cannot drift.

### 8.3 Generator script (describe only; e.g. `tools/build-art-credits.mjs`)

1. Load `credits.json` and parse `CREDITS.upstream.csv` with a real CSV parser. Fields are quoted and contain
   commas. Index rows by `filename.trim()`.
2. For each shipped file and each source:
   - Look up every `upstreamFiles` row. **Fail** if one is missing.
   - Merge authors (de-duplicated: the bandana row lists JaidynReiman twice) and URLs.
   - **Fail** if `chosenLicense` is not in the row's `licenses` list.
   - **Fail** if `chosenLicense` starts with `GPL`, unless `allowGpl: true` is set.
   - **Fail** on `OGA-SA`.
   - **Warn** if `notes` names a person who is not in `authors` (example: "JaidynReiman" in the tricorne notes),
     and add that person to the credit.
   - **Warn** if `chosenLicense` is not the outbound licence and is not permissive.
3. Check that every file under `assets/chars/lpc/` has an entry in `credits.json`, and the reverse. **Fail** on
   orphans.
4. Write `CREDITS-ART.md`, grouped by shipped file in the format of section 8.4. Then add a summary: "All
   authors" as an alphabetical, de-duplicated list, licence counts, and links to `LICENSES/`.
5. Also write a small `credits-art.json` (shipped file, authors, licence, primary link) for the in-game screen.
6. Copy the needed licence texts into `LICENSES/`.
7. Run it in the build. Make CI fail if `CREDITS-ART.md` is stale.

### 8.4 In-game credits

- Add a **Credits** entry on the title screen and in the pause/settings menu.
- Show a short block of text:
  - "Character sprites based on the Liberated Pixel Cup (LPC) and the Universal LPC Spritesheet Character
    Generator."
  - The full de-duplicated author list. It is short enough to show; the README's sample statement shows this
    form.
  - "Licensed CC-BY-SA 3.0 / OGA-BY 3.0 / CC0; see detailed credits."
  - A visible link to the hosted `CREDITS-ART.md` (for example `hsargames.com/<game>/CREDITS-ART.md`) and to
    `LICENSES/`.
- This meets the README's "accessible from within your game ... visible link" and the "reasonable manner" tests in
  CC 3.0 and 4.0.
- Also link `CREDITS-ART.md` from the game's page on the site.

### 8.5 Example entry (real data, VERIFIED+csv)

The source is the CREDITS.csv row `hat/formal/bowler/adult/walk.png`:
`"" , "bluecarrot16" , "CC-BY-SA 3.0,GPL 3.0" , "https://opengameart.org/content/lpc-gentleman,https://opengameart.org/content/lpc-expanded-hats-facial-helmets"`.
The [LPC Gentleman][oga-gentleman] page confirms the author bluecarrot16, the licences "CC-BY-SA 3.0 / GPL 3.0",
and the request "Please link back to this page on OpenGameArt".

```markdown
### assets/chars/lpc/hat_bowler.png
Licence of this file: CC-BY-SA 3.0 (LICENSES/CC-BY-SA-3.0.txt)
Changes: converted to a 5-level shade mask; frames cropped 64x64 -> 48x64; walk/idle/thrust/slash only; re-packed.

- "Formal Bowler Hat" (hat/formal/bowler/adult/{walk,idle,thrust,slash}.png)
  by bluecarrot16. Used under CC-BY-SA 3.0 (also offered under GPL 3.0).
  https://opengameart.org/content/lpc-gentleman
  https://opengameart.org/content/lpc-expanded-hats-facial-helmets
  Via the Universal LPC Spritesheet Character Generator @ 86160e7.
```

The matching body layer comes from the `body/bodies/male/walk.png` row. Its 10 authors, in order: bluecarrot16,
JaidynReiman, Benjamin K. Smith (BenCreating), Evert, Eliza Wyatt (ElizaWy), TheraHedwig, MuffinElZangano, Durrani,
Johannes Sjölund (wulax), Stephen Challener (Redshrike). It links 9 OGA URLs. Choose CC-BY-SA 3.0 for it.

---

## 9. Sources

Every link below was opened during this research (fetched 2026-11-01).

Generator (pinned commit `86160e7`):

- [gen-repo]: Generator repository and README (licensing, terms, credits rules): https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator
- [gen-live]: Live generator: https://liberatedpixelcup.github.io/Universal-LPC-Spritesheet-Character-Generator/
- [gen-license]: Generator code licence (GPL 3): https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/blob/86160e7507d6841259cff624a51a63c1d4847ee3/LICENSE
- [credits-csv]: CREDITS.csv: https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/blob/86160e7507d6841259cff624a51a63c1d4847ee3/CREDITS.csv
- [constants]: constants.ts (frame size, body types, directions, animation rows and cycles): https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/blob/86160e7507d6841259cff624a51a63c1d4847ee3/sources/state/constants.ts
- [sd-base]: Sheet definitions root: https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/blob/86160e7507d6841259cff624a51a63c1d4847ee3/sheet_definitions/
- [pal-guide]: PALETTE_RECOLOR_GUIDE.md: https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/blob/86160e7507d6841259cff624a51a63c1d4847ee3/PALETTE_RECOLOR_GUIDE.md
- [pal-cloth]: Cloth palette: https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/blob/86160e7507d6841259cff624a51a63c1d4847ee3/palette_definitions/cloth/cloth_ulpc.json
- [png-walk]: Male body walk sheet (dimensions and colours measured): https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/blob/86160e7507d6841259cff624a51a63c1d4847ee3/spritesheets/body/bodies/male/walk.png
  - The other measured PNGs sit beside it: spellcast, thrust, slash, shoot, hurt, idle, run, sit, emote, jump,
    climb and combat_idle. Also `spritesheets/head/heads/human/male/walk.png` and
    `spritesheets/hat/formal/bowler/adult/walk.png`.

Forks and related repos:

- [fork]: sanderfrenken fork: https://github.com/sanderfrenken/Universal-LPC-Spritesheet-Character-Generator
- [fork-live]: https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator/
- [eliza]: ElizaWy LPC Revised README: https://github.com/ElizaWy/LPC

LPC competition:

- [lpc-about]: LPC about page: https://lpc.opengameart.org/
- [styleguide-index]: Style guide index (licence footer): https://lpc.opengameart.org/static/LPC-Style-Guide/build/index.html
- [styleguide]: Style guide: https://lpc.opengameart.org/static/LPC-Style-Guide/build/styleguide.html

OpenGameArt:

- [oga-base]: LPC base assets: https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles
- [oga-bases]: LPC Character Bases: https://opengameart.org/content/lpc-character-bases
- [oga-gentleman]: LPC Gentleman: https://opengameart.org/content/lpc-gentleman
- [oga-pirates]: LPC Pirates: https://opengameart.org/content/lpc-pirates
- [oga-hats-exp]: LPC Expanded Hats, Facial, Helmets: https://opengameart.org/content/lpc-expanded-hats-facial-helmets
- [oga-shirts]: LPC Expanded Simple Shirts: https://opengameart.org/content/lpc-expanded-simple-shirts
- [oga-stetson]: Stetson cowboy hat: https://opengameart.org/content/stetson-cowboy-hat
- [oga-lpc-hats]: LPC Hats (Baŝto): https://opengameart.org/content/lpc-hats
- [oga-faq]: OpenGameArt FAQ (also mirrored at https://lpc.opengameart.org/content/faq): https://opengameart.org/content/faq
- [ogaby]: OGA-BY 3.0 text: https://static.opengameart.org/OGA-BY-3.0.txt
- [ogaby-faq]: OGA-BY 3.0 FAQ: https://opengameart.org/content/oga-by-30-faq

Licence texts:

- [bysa3]: CC BY-SA 3.0 legal code: https://creativecommons.org/licenses/by-sa/3.0/legalcode
- [bysa4]: CC BY-SA 4.0 legal code: https://creativecommons.org/licenses/by-sa/4.0/legalcode.en
- [ccby4]: CC BY 4.0 legal code: https://creativecommons.org/licenses/by/4.0/legalcode.en
- [cc0]: CC0 1.0 legal code: https://creativecommons.org/publicdomain/zero/1.0/legalcode.en
- [cc-compat]: CC compatible licences: https://creativecommons.org/share-your-work/licensing-considerations/compatible-licenses/
- [gpl3]: GPL 3.0 text: https://www.gnu.org/licenses/gpl-3.0.txt
- [gpl-faq-art]: GPL FAQ, using the GPL for non-software: https://www.gnu.org/licenses/gpl-faq.en.html#GPLOtherThanSoftware

[gen-repo]: https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator
[gen-live]: https://liberatedpixelcup.github.io/Universal-LPC-Spritesheet-Character-Generator/
[gen-license]: https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/blob/86160e7507d6841259cff624a51a63c1d4847ee3/LICENSE
[credits-csv]: https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/blob/86160e7507d6841259cff624a51a63c1d4847ee3/CREDITS.csv
[constants]: https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/blob/86160e7507d6841259cff624a51a63c1d4847ee3/sources/state/constants.ts
[sd-base]: https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/blob/86160e7507d6841259cff624a51a63c1d4847ee3/sheet_definitions/
[pal-guide]: https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/blob/86160e7507d6841259cff624a51a63c1d4847ee3/PALETTE_RECOLOR_GUIDE.md
[pal-cloth]: https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/blob/86160e7507d6841259cff624a51a63c1d4847ee3/palette_definitions/cloth/cloth_ulpc.json
[png-walk]: https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/blob/86160e7507d6841259cff624a51a63c1d4847ee3/spritesheets/body/bodies/male/walk.png
[fork]: https://github.com/sanderfrenken/Universal-LPC-Spritesheet-Character-Generator
[fork-live]: https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator/
[eliza]: https://github.com/ElizaWy/LPC
[lpc-about]: https://lpc.opengameart.org/
[styleguide-index]: https://lpc.opengameart.org/static/LPC-Style-Guide/build/index.html
[styleguide]: https://lpc.opengameart.org/static/LPC-Style-Guide/build/styleguide.html
[oga-base]: https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles
[oga-bases]: https://opengameart.org/content/lpc-character-bases
[oga-gentleman]: https://opengameart.org/content/lpc-gentleman
[oga-pirates]: https://opengameart.org/content/lpc-pirates
[oga-hats-exp]: https://opengameart.org/content/lpc-expanded-hats-facial-helmets
[oga-shirts]: https://opengameart.org/content/lpc-expanded-simple-shirts
[oga-stetson]: https://opengameart.org/content/stetson-cowboy-hat
[oga-lpc-hats]: https://opengameart.org/content/lpc-hats
[oga-faq]: https://opengameart.org/content/faq
[ogaby]: https://static.opengameart.org/OGA-BY-3.0.txt
[ogaby-faq]: https://opengameart.org/content/oga-by-30-faq
[bysa3]: https://creativecommons.org/licenses/by-sa/3.0/legalcode
[bysa4]: https://creativecommons.org/licenses/by-sa/4.0/legalcode.en
[ccby4]: https://creativecommons.org/licenses/by/4.0/legalcode.en
[cc0]: https://creativecommons.org/publicdomain/zero/1.0/legalcode.en
[cc-compat]: https://creativecommons.org/share-your-work/licensing-considerations/compatible-licenses/
[gpl3]: https://www.gnu.org/licenses/gpl-3.0.txt
[gpl-faq-art]: https://www.gnu.org/licenses/gpl-faq.en.html#GPLOtherThanSoftware
