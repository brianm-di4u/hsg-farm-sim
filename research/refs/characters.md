# Character feature checklist

Critics score rubric category 2 (Characters) against this sheet, and the accuracy metric (plan Phase 2: silhouette IoU, palette ΔE) uses it to pick each person's reference render.

**Scope.** All 18 people in `PEOPLE` in `src/js/sim/data.js` (read-only), plus the 6 Vale heirs from the chapter table in the same file: 24 people. Compiled 2026-11-01.

**Columns**
- **Silhouette:** what must read in grayscale at 1× on a phone.
- **Headwear / Garment / Palette:** the checks. Palette hexes come from the person's `look` in `data.js`. They are the source of truth until the era master palette exists; then each one snaps to its nearest era-palette colour.
- **Signature prop:** one held or worn object that identifies the role. **[inferred]** means our reading of the `role` and lines in `data.js`, not a stated fact.
- **Supports:** reference IDs from `clothing/SOURCES.md` (C…) and `town/SOURCES.md` (T…), and sections of `../visual-eras.md`.

**Skin** is the `SKINS` index in `data.js`: 0 `#f2d6c0`, 1 `#e0b896`, 2 `#c08a62`, 3 `#8a5a3a`, 4 `#5a3a26`. This sheet does not assign anyone an ethnicity beyond what the game's own text says.

**How critics score:** each person has 5 checks (silhouette, headwear, garment, palette, prop). A person passes at 4 of 5. Category 2 at 7 or above needs every on-screen named person to pass. At 9 or above, all 5 checks must pass and a blind viewer must be able to tell the person apart from the rest of the cast in grayscale.

**Rule for every era before 1955:** women's lower garment is a long skirt or petticoat to the ankle, never trousers, even though `look` calls the layer `pants`. In 1955, women wear skirts in town and may wear capris or jeans at work or the lake (`visual-eras.md` §7).

---

## Chapter 1: 1807, frontier (refs: C1807-1…6, T1807-1…2; `visual-eras.md` §7)

| Person | Silhouette | Headwear | Garment | Palette | Signature prop | Supports |
|---|---|---|---|---|---|---|
| **Ada Vale** (heir, `look.hat: none`) | Upright young woman. High waist with a straight column skirt; sleeves pushed up for work | Bare head with hair pinned up. A plain linen cap is allowed but not required | Short-gown (a loose jacket to the hip) over an ankle-length petticoat, plus an apron. No Empire town gown | shirt `#7a5a3a`, skirt `#4a3a2a`, hair `#3b2a1c`, skin 2 | Pole or hoe [inferred: she poles a flatboat upriver in the chapter intro] | C1807-2 (working women, aprons), C1807-1 (waistline only), C1807-4 (river travel) |
| **Josiah Crane**, trapper | Broad and bearded with a bulky cap. Long hunting shirt flares below the belt | **Fur cap** with a tail or flap at the back (`cap-fur`) | Fringed buckskin or linen hunting shirt to mid-thigh, belted. Leggings and moccasins | shirt `#6a5a3a`, pants `#4a3a2a`, hair and beard `#6a6a6a` (gray), skin 1, cap `#6a5038` | Traps on a cord, or a possibles bag [inferred: "I trap up and down this creek"] | C1807-6 (cap, fringe, beard; 1837 Rockies, date gap), C1807-5 |
| **Margaux Delacroix**, river trader | Compact. Head wrapped, sleeves rolled, a pack or bundle at the hip | **Head scarf** knotted at the nape (`scarf`, `#a9432c`) | Loose shirt and a long skirt or petticoat. Kerchief across the shoulders | shirt `#2b4c6b`, skirt `#5a3a3a`, hair `#2a1a12`, skin 2, scarf `#a9432c` | Trade bundle, or a whetstone in hand [inferred: she trades seed, salt and jugs, and loves whetstones] | C1807-3 (kerchief, market vendor), C1807-5 (French river trade, stocking cap) |
| **Ezra Pell**, health seeker | Stooped older man. Long coat, knees slightly bent | **Round brim hat** with a medium crown (`brim`) | Long plain coat over a waistcoat, breeches or trousers, light shirt | shirt `#c8c0b0`, trousers `#5a5a5a`, hair `#a89a8a` (gray), skin 0 | Walking stick [inferred: "my joints ache"; he walks farther each day] | C1807-3 (elderly man in long coat), C1807-2 (old man by the fire), C1886-5 (health-seeker pose; wrong era for clothes) |

## Chapter 2: 1871, frontier town (refs: C1871-1…3, T1871-1…6)

| Person | Silhouette | Headwear | Garment | Palette | Signature prop | Supports |
|---|---|---|---|---|---|---|
| **Caleb Vale** (heir) | Lean farmer. Wide hat brim breaks the head outline | **Slouch hat**: low crown, wide soft brim (`brim`) | Work shirt with sleeves rolled, vest or suspenders, wool trousers | shirt `#8e3b2b`, trousers `#3a3a44`, hair `#2a2420`, skin 2 | Hoe or ox goad [inferred] | C1871-3 (Hot Springs, slouch hat), T1871-6 (Hot Springs market wagon), `visual-eras.md` §7 workers |
| **Corinna Bell**, boardinghouse keeper | Woman with a **first-bustle** back: fullness draped behind the waist, front flat. Bonnet on top of the head | **Small bonnet** tipped forward with ribbon ties (`bonnet`) | Fitted bodice, plain overskirt with back drape, ground-length skirt, apron (working version of the fashion plate) | bodice `#6a3a5a`, skirt `#3a2a3a`, hair `#4a2a1a`, skin 1 | Cornbread pan or a basket of meal [inferred: "every one wants cornbread"] | C1871-1 (bonnet and first bustle, idealised), T1871-1, T1871-2 (Valley Street) |
| **Amos Thorne**, stage driver | Big frame. Long coat, wide hat, a whip angled up over the shoulder | **Wide-brim slouch hat** (`brim`) | Long dark coat or duster over a vest, trousers in boots | coat `#5a4a3a`, trousers `#2a2a2a`, hair and beard `#1a1a1a`, skin 3 | **Driving whip** [inferred: stage to Malvern] | C1871-3 (driver on a cart, slouch hat, Hot Springs), C1871-2 (frock coats and hats, 1870) |
| **Lucius Greer**, druggist | Neat, narrow, upright. Bare head, spectacles glint | None (`hat: none`) | **White shirt with sleeves gartered**, dark vest, dark trousers, maybe a short apron | shirt `#f0ece0`, trousers `#2a2a3a`, hair `#8a7a6a`, skin 0, **glasses** | **Glass bottle or stoneware jug** of spring water [stated: "I mean to bottle it"] | C1871-2 (men's dress c.1870). **Gap:** no PD druggist photo found |

## Chapter 3: 1886, golden age of the Row (refs: C1886-1…6, C1931-3…4 for attendants, T1886-1…5)

| Person | Silhouette | Headwear | Garment | Palette | Signature prop | Supports |
|---|---|---|---|---|---|---|
| **Nora Vale** (heir) | Young farm woman. Fitted bodice, full skirt, **no bustle** at work. Bonnet brim frames the face | **Sun bonnet** with a deep brim (`bonnet`) | Long cotton work dress with fitted bodice and apron | dress `#2b4c9b`, skirt `#2a2a33`, hair `#5a3a22`, skin 2 | Berry basket or hoe [inferred: strawberries for the hotel] | C1886-4 (farm women 1886, no bustle), C1886-1 (town bustle, for contrast only) |
| **Augustin Duval**, head chef | Stout chef in whites. Tall pale head shape | **Toque**: soft and pleated, shorter and floppier than the modern tall toque (`toque`) | White double-breasted jacket, **long white apron to the shin**, dark trousers | jacket `#f4f2ec`, trousers `#2a2a2a`, hair `#3a2a1a`, skin 1, toque `#ffffff` | Ladle or a tray of berries [inferred] | C1886-6 (toques, whites, aprons; NYC 1902) |
| **Hattie Coleman**, bath attendant. Her own line: "Most attendants on the Row are Black, like me" | Slim figure **all in white** with a small cap. Sleeves to the elbow | **Small white cap or headband** (`cap`; recolour it white, not the default blue `#2b4c9b`) | **White dress with an apron**, ankle length. `look.pants: #3a5a7a` should render as a skirt (see flags) | dress `#ffffff`, hair `#1a1210`, skin 4 | **Folded towels or a hot-pack**, or a water jug [stated: "hot packs, towels"; she asks for jugs of hot water] | C1931-3 (Fordyce staff postcard: Black women attendants in white with caps), C1931-4 (bath hall); simplify back to 1886. **Gap:** no 1880s attendant photo |
| **Walt Brennan**, ball-club trainer | Athletic. Short cap on the crown, knickers and long stockings show the calves | **1880s ball cap**: low round crown, short bill (`cap`) | Lace-front jersey with a turned-down collar, wide belt, knickers to below the knee, **white stockings**. A trainer may wear a vest over it | shirt `#e8e0d0`, trousers `#3a3a5a`, hair `#a86a3a`, skin 0 | Bat over the shoulder, or a medicine bag [inferred] | C1886-3 (1887 cap and uniform), C1886-2 (1885 White Stockings jerseys, moustaches) |

## Chapter 4: 1931, the open town (refs: C1931-1…5, T1931-1…6)

| Person | Silhouette | Headwear | Garment | Palette | Signature prop | Supports |
|---|---|---|---|---|---|---|
| **Ray Vale** (heir) | Farmer in a fedora: pinched crown, brim snapped down | **Felt fedora** (`fedora`) | Work shirt with rolled cuffs, belted work trousers or bib overalls | shirt `#c8452b`, trousers `#1f2f5c`, hair `#1f1a16`, skin 2 | Hoe, or a goat on a lead [inferred: goat milk quest] | C1931-1 (Arkansas farmer, work clothes), C1931-5 (fedoras) |
| **Ora Fenwick**, tourist-court owner | Woman in a below-knee house dress with a pointed collar and short puffed sleeves. Bobbed or waved hair | None (`hat: none`); waved bob | Small-print cotton house dress, apron, hem below the knee | dress `#3c9a4a`, skirt `#4a5675`, hair `#c8a060`, skin 0 | Platter of barbecue or a serving fork [inferred: "six cabins and a barbecue pit"] | C1931-2 (Arkansas house dress, 1939), T1931-4 (tourist court postcard) |
| **Sal Romano**, croupier | Sharp dark column: dark suit, fedora, narrow tie | **Dark felt fedora** (`fedora`) | Dark single- or double-breasted suit, white shirt, tie. At the table: sleeve garters, vest | suit `#14121f`, hair `#1a1a1a`, skin 1. Needs a white shirt-front accent to read on a phone | **Deck of cards** or a croupier's rake [inferred] | C1931-5 (gambling house, suits, fedoras, neon) |
| **June Talley**, radio announcer | Woman with a waved bob, long bias-cut skirt and fitted blouse | None (`hat: none`) | Fitted blouse, **mid-calf skirt** (`look.pants: #1f2f5c` should render as a skirt) | blouse `#f6c933`, skirt `#1f2f5c`, hair `#8a3a2a`, skin 3 | **Studio microphone** (1930s carbon or ribbon type) [inferred: "Good morning, valley!"] | `visual-eras.md` §7 (1931 women). **Gap:** no PD photo of a woman announcer or a period microphone in the pack |

## Chapter 5: 1955, mid-century (refs: C1955-1…4, T1955-1…6)

| Person | Silhouette | Headwear | Garment | Palette | Signature prop | Supports |
|---|---|---|---|---|---|---|
| **June Vale** (heir) | Young woman. Work shirt tucked in, rolled jeans or capris, ponytail | None (`hat: none`) | Short-sleeved blouse or work shirt, rolled jeans or capris, sneakers or boots | shirt `#3fbfb5` (turquoise), trousers `#34424a`, hair `#3b2a1c`, skin 2 | Egg basket or roadside-stand crate [inferred: chapter goals] | C1955-1 (Arkansas farm family 1953), C1955-2 (1956 dress, for town) |
| **Lorraine Pace**, motor-hotel owner | **New Look**: nipped waist with a full skirt (bell shape), short curled hair | None; short curled set | Fitted sleeveless or cap-sleeve bodice, belted waist, full mid-calf skirt | top `#e26d8e`, skirt `#34424a`, hair `#e8c870`, skin 0 | **Room key on a large fob** or a coffee pot [inferred] | C1955-2 (Miss Arkansas 1956 dress), T1955-1, T1955-4 (motor courts) |
| **Dr. Nell Ambry**, animal trainer | Woman in a work coat with **cat-eye glasses**. Hen at her feet or on her arm | None (`hat: none`) | Short-sleeved blouse with slacks, or a **white work coat** | blouse `#f4c542`, slacks `#34424a`, hair `#3a2a1a`, skin 3, **glasses** (cat-eye) | **A hen and a small bell**, or a clicker [stated: "I train hens to ring bells"] | C1955-3 (cat-eye shape), C1955-4 (glasses and work coat), T1955-5 (the animal show's postcard) |
| **Rusty Cole**, displaced farmer | Rangy farmer in a straw brim hat, overalls | **Straw or felt brim hat** (`brim`) | **Bib overalls** over a work shirt, or work shirt and slacks | shirt `#5a7a9a`, trousers `#3a4a5a`, hair `#a85a2a`, skin 1 | **Fishing rod** [inferred: "the fishing's good in the new lake"] or a watermelon | C1955-1 (overalls and brim hats, Arkansas 1953), T1955-2 (Lake Hamilton) |

## Chapter 6: 2026, today (refs: C2026-1…4, T2026-1…5)

| Person | Silhouette | Headwear | Garment | Palette | Signature prop | Supports |
|---|---|---|---|---|---|---|
| **Sam Vale** (heir) | Modern farmer. Ball cap, tee or flannel, jeans, boots | **Ball cap**, structured, curved bill (`cap`) | Tee or flannel shirt, work jacket, jeans, boots | shirt `#f2a541`, jeans `#1e4e79`, hair `#2a2420`, skin 2 | Drip-line coil or a tablet [stated: "a drip line" in the chapter intro] | C2026-3 (ball cap, work jacket), C2026-2 (casual dress), T2026-5 (Arkansas farm, UTV) |
| **Priya Natarajan**, brewer | Woman in a work apron and rubber boots | None (`hat: none`); hair tied back | Tee or work shirt, **long brewer's apron**, rubber boots | shirt `#b5654a`, apron or jeans `#1e4e79`, hair `#1a1210`, skin 3 | **Brewer's mash paddle** or a hop bine [inferred: she brews with thermal water and loves hops] | C2026-2 (casual dress). **Gap:** no PD/CC photo of a working brewer. Setting: T2026-2 and T2026-3 (the restored Row) |
| **Marcus Bell**, market manager | Man in a ball cap and a canvas jacket or polo, lanyard | **Ball cap** with a patch (`cap`) | Polo or flannel shirt with work jacket, jeans, name badge on a lanyard | shirt `#4c8fa8`, trousers `#3a3a3a`, hair `#1a1210`, skin 4 | **Clipboard** or the market banner [stated: "I'll put your farm's name on the banner"] | C2026-3 (ball cap, canvas jacket), C2026-1 (market manager outfit, canopy, A-frame sign) |
| **Jo Tanaka**, bathtub-race captain | **Helmet** makes a round, oversized head. Padded vest, gloves | **Helmet** (`helmet`, `#f2a541`) | Team tee, padded vest, gloves, shorts or joggers | shirt `#b5568f`, trousers `#2a2a3a`, hair `#1a1a1a`, skin 1 | **Push bar or the tub itself** [stated: teams push bathtubs down Central Avenue] | C2026-4 (race helmet and gear; that race is on water, ours is pushed on the street, so use the gear only) |

---

## Flags for the art and data owners

These are not changes. `src/` belongs to the render-core session, so they are listed here for whoever owns `data.js` and the compositor.

1. **There is no garment type in `look`.** Ada, Margaux, Corinna, Nora, Hattie, Ora, June Talley and Lorraine need a skirt or petticoat layer where `look` has `pants`. Something like `look.lower: 'skirt' | 'pants' | 'knickers' | 'overalls'` would let the compositor pick the right silhouette. Walt needs knickers and stockings, and Rusty overalls.
2. **Hattie's cap colour.** `HAT_COL.cap` is `#2b4c9b` (blue) in `src/js/render/sprites.js`. Hattie's cap should be white (C1931-3). That needs a per-person hat colour, or a separate `cap-white` hat kind.
3. **Hat kinds missing from `HAT_ROW`.** The references call for a slouch hat (Caleb, Amos) different from Ezra's round hat; a straw boater or straw brim (1931 and 1955); a sun bonnet (Nora) different from the 1871 dress bonnet (Corinna); an 1886 short-bill cap (Walt) different from a 2026 structured cap (Sam, Marcus). All are `brim`, `bonnet` or `cap` today.
4. **Glasses style per era.** Lucius (1871) wears small round spectacles. Ambry (1955) wears cat-eye frames (C1955-3). Both use the single `glasses` overlay today.
5. **Signature props** are not in `look`. Twenty-four props at sprite scale is a production line item. In the 16×32 tier most can only appear in portraits or idles (see `../pixel-tradeoffs.md` §2 and §10).

## Reference gaps (from the refs pack)
- A woman radio announcer of the 1930s and a period microphone (June Talley).
- A druggist in spectacles c.1871 (Lucius).
- A bath attendant of the 1880s (Hattie; extrapolated from 1910s–30s Hot Springs photos).
- A working brewer (Priya).
- A 1950s woman animal trainer at work and a motor-hotel owner (Ambry, Lorraine; partial references only).
- Everyday 1871 bonnets (only a fashion plate).
