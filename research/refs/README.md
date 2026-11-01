# Reference image packs: Valley of Vapors

Public-domain and Creative Commons reference images for the art team, sorted by chapter (1807, 1871, 1886, 1931, 1955, 2026). They feed the character and town art notes (`research/refs/characters.md`, written separately). They are **reference only**. Nothing here ships in the game.

## Layout

```
refs/
  README.md            this file: policy, index, gaps
  clothing/SOURCES.md  one table per era: source, licence, what to read off each image
  clothing/<era>/      people and dress (3-6 images per era)
  town/SOURCES.md      one table per era
  town/<era>/          Bathhouse Row, Central Avenue, springs, farms, dam and lake, tourist courts
```

Each image has a stable ID: `C<era>-<n>` for clothing, `T<era>-<n>` for town. Cite them in other docs as "supports: C1886-3". The SOURCES tables give, for every image: file, title, creator and date, place, exact licence, what it is a reference for, a "what to read off it" note, accuracy caveats (region, year gap), the source page and the direct file URL.

## Licence policy

- Only public-domain, CC0, "no known restrictions" (Library of Congress, Flickr Commons) and CC BY / CC BY-SA images are kept. Anything with an unclear licence was skipped (for example the undated Curt Teich postcards and the LoC "rights not evaluated" fashion set).
- Licences were read from each file's own page: Wikimedia Commons licence templates (PD-US, PD-Art, PD-Scan, PD-USGov-NPS, PD-USGov-USDA, PD-US-not-renewed, CC0 ...) or the LoC rights statement.
- **CC BY and CC BY-SA files need attribution if they are ever shipped or published.** They are not shipped; they are kept as reference. The CC files are: C1955-3 (CC BY 3.0, Tom Oates), C2026-4 (CC BY 2.0, Moosealope), T1955-3, T2026-3, T2026-4 (CC BY-SA 3.0, Brandonrush), T1955-5 (CC BY 2.0, Boston Public Library).
- Do not trace or paste these images into game art. Use them for silhouette, proportion, materials, massing and palette.
- Some NPS archive items carry the Commons tag PD-USGov-NPS although the original photographer or postcard publisher is not named (C1931-3, C1931-4, C1955-2, T1931-5). They are kept on that tag, as reference only.

## How the files were made

- Downloaded from Wikimedia Commons (API thumbnails) and loc.gov (sized JPGs), with a descriptive User-Agent.
- Re-saved as JPG at 1024 px or less on the long side (quality 85). Total: 58 images, about 9.5 MB.
- Stereographs are kept as full cards (two near-identical halves). Use either half.

## Counts

| Era | clothing | town |
|---|---|---|
| 1807 | 6 | 2 |
| 1871 | 3 | 6 |
| 1886 | 6 | 5 |
| 1931 | 5 | 6 |
| 1955 | 4 | 6 |
| 2026 | 4 | 5 |

## Gaps (no free image found)

- **1807:** no photographs exist. Clothing comes from 1807-1813 paintings and plates (Pennsylvania, London); the trapper (C1807-6, 1837 scene) and the French river trader (C1807-5, 1845) are later and from the Missouri and Rocky Mountain fur trade. No image of a woman French river trader in a head scarf; combine the vendor's head covering in C1807-3 with C1807-5.
- **1871:** no druggist in spectacles; no photo of a woman in an everyday bonnet (C1871-1 is a fashion plate). No Black stagecoach driver photo; C1871-2 (1871 print of Black Americans) and C1871-3 (Hot Springs cart driver, c.1880) are the closest.
- **1886:** no 1880s photo of a Black woman bath attendant; use C1931-3 and C1931-4 (Hot Springs, 1910s-30s). The chef (C1886-6) is New York, 1902. The farm family (C1886-4) is Nebraska.
- **1931:** no woman radio announcer; no tourist-court woman at work (use C1931-2 for the everyday dress). The farmer's fedora comes from townsmen in C1931-5.
- **1955:** no woman animal trainer at work (glasses from C1955-3 and C1955-4, the zoo building from T1955-5); no young woman farmer in work clothes; no motor-hotel owner (use C1955-2 for 1950s dress).
- **2026:** no working brewer (South Asian woman); the bathtub-race gear (C2026-4) comes from a Canadian water race.
- **Town:** no Hot Springs farm photo for any era; the farms are from elsewhere in Arkansas (T1807-2, T1931-6, T1955-6, T2026-5) or near town (T1871-6). No 1807 town view (T1807-1 is from 1834).

## Findings to pass on

- **[conflict] Big Iron date:** T1871-4 is captioned "Big Iron Bath-house" in Harper's Monthly, January 1878, and shows a wooden mansard-roofed bathhouse over the open creek. `visual-eras.md` §3 dates the ironclad "Big Iron" to 1883, so the 1883 building may be a rebuild of an earlier bathhouse of the same name.
- **T1955-5 (I.Q. Zoo postcard):** Boston Public Library dates its whole Tichnor set to 1930-45, but the zoo opened in 1955 [general knowledge, not checked here], so this card is 1955 or later.
- **T1871-3** is a 1916 painting of the town "in 1875". Trust its layout (open creek, footbridges, one street), not its building styles.
- Images showing Black Americans: C1807-2, C1807-3, C1871-2, C1931-3, C1931-4, C1955-2, C2026-1, C2026-2, C2026-3. The SOURCES notes say where period images use caricature (C1807-2) so it is not copied. No images of enslaved people are included. C1807-5's younger man is, by Bingham's original title, of French and Native American parentage; C1807-6's trappers wear Native-made dress (moccasins, fringed buckskin). Neither image is used to depict a Native character.

## Index

| ID | Path | Licence | Reference for |
|---|---|---|---|
| C1807-1 | `clothing/1807/london-walking-dress-fashion-plate-sep-1807-lacma.jpg` | Public domain (PD-LACMA; published 1807) | women's silhouette, headwear, palette |
| C1807-2 | `clothing/1807/quilting-frolic-1813-krimmel.jpg` | Public domain (PD-Art; artist died 1821) | frontier woman farmer, elderly man, men's hats, garment layers |
| C1807-3 | `clothing/1807/philadelphia-market-scene-1811-krimmel.jpg` | Public domain (PD-Art; artist died 1821) | river trader woman's head covering, elderly health seeker, market vendor garments |
| C1807-4 | `clothing/1807/ferry-scene-susquehanna-1811-13-svinin-met.jpg` | Public domain (PD-Art; artist died 1839) | travellers at small scale, hats, river setting |
| C1807-5 | `clothing/1807/fur-traders-descending-missouri-1845-bingham-met.jpg` | CC0 1.0 (Metropolitan Museum of Art Open Access) | French river trader, headwear, palette |
| C1807-6 | `clothing/1807/trappers-1858-60-alfred-jacob-miller-walters.jpg` | Public domain (PD-Art; artist died 1874; Walters Art Museum) | trapper in fur cap and beard: headwear, garment |
| C1871-1 | `clothing/1871/frank-leslies-ladys-magazine-fashion-plate-1871-rijks.jpg` | CC0 1.0 (Rijksmuseum) | boardinghouse keeper: bonnet, first-bustle silhouette |
| C1871-2 | `clothing/1871/fifteenth-amendment-celebration-1870-lithograph-loc.jpg` | No known restrictions on publication (LoC; published 1871) | stagecoach driver (Black man) and Black Americans' dress c.1870: frock coats, hats |
| C1871-3 | `clothing/1871/allen-roan-notary-hot-springs-c1880-kennedy-nypl.jpg` | Public domain (PD-Scan; NYPL stereograph, published c.1872-1887) | stagecoach or cart driver pose, brim hat, local road |
| C1886-1 | `clothing/1886/de-bazar-fashion-plate-1886-rijks.jpg` | CC0 1.0 (Rijksmuseum) | young woman in town: peak bustle silhouette, hats |
| C1886-2 | `clothing/1886/chicago-white-stockings-team-1885.jpg` | Public domain (PD-US, published 1885) | baseball trainer and players: jersey, moustaches |
| C1886-3 | `clothing/1886/silver-flint-white-stockings-old-judge-card-1887-loc.jpg` | No known restrictions on publication (LoC; published 1887) | 1886-style ball cap, uniform |
| C1886-4 | `clothing/1886/william-moore-family-sargent-ne-1886-butcher-loc.jpg` | No known restrictions on publication (LoC) | young woman farmer, farmer men: work dress |
| C1886-5 | `clothing/1886/health-seeker-wheelchair-hot-springs-c1885-kennedy-nypl.jpg` | Public domain (PD-Scan; NYPL stereograph, published c.1872-1887) | elderly health seeker, attendant, rolling chair |
| C1886-6 | `clothing/1886/delmonicos-kitchen-cooks-toques-nyc-1902-byron.jpg` | Public domain (PD-US, published 1902) | hotel head chef: toque, whites, apron |
| C1931-1 | `clothing/1931/farmer-sam-nichols-boone-co-ar-1935-shahn-fsa-loc.jpg` | No known restrictions (LoC, FSA/OWI; U.S. government work) | farmer: work clothes, porch setting |
| C1931-2 | `clothing/1931/husband-wife-farmers-chicot-farms-ar-1939-fsa-loc.jpg` | No known restrictions (LoC, FSA/OWI; U.S. government work) | farm woman's house dress; farmer's work jacket |
| C1931-3 | `clothing/1931/fordyce-bathhouse-staff-postcard-c1915-30s-nps.jpg` | Public domain (PD-USGov-NPS, per Commons / NPGallery) | bath attendants' white uniforms and caps (supports the 1886 attendant too); managers' suits |
| C1931-4 | `clothing/1931/bath-attendants-ladies-bath-hall-hot-springs-undated-nps.jpg` | Public domain (PD-USGov-NPS, per Commons / NPGallery) | bath attendant uniform; bath-hall interior |
| C1931-5 | `clothing/1931/bar-gambling-house-butte-mt-1939-fsa-loc.jpg` | No known restrictions (LoC, FSA/OWI; U.S. government work) | croupier and townsmen: dark suit, fedora; neon storefront |
| C1955-1 | `clothing/1955/neighbors-culp-ar-1953-mennonite-archives.jpg` | No known copyright restrictions (Flickr Commons, Mennonite Church USA Archives) | farmer in brim hat; farm family dress |
| C1955-2 | `clothing/1955/bath-attendant-grace-johnson-miss-arkansas-1956-nps.jpg` | Public domain (PD-USGov-NPS, per Commons / NPGallery) | young woman's 1950s dress (motor-hotel owner, young woman farmer in town); attendant uniform |
| C1955-3 | `clothing/1955/cats-eye-glasses-c1958-tom-oates.jpg` | CC BY 3.0 - Tom Oates (credit required: 'Photo by Tom Oates, 2009') | woman animal trainer's glasses: shape |
| C1955-4 | `clothing/1955/wanda-bradshaw-lockheed-cat-eye-glasses-smithsonian.jpg` | No known copyright restrictions (Flickr Commons, Smithsonian Institution Archives) | woman animal trainer: glasses on a face, white work coat |
| C2026-1 | `clothing/2026/farmers-market-manager-dc-2023-usda.jpg` | Public domain (PD-USGov-USDA) | farmers'-market manager: outfit, props |
| C2026-2 | `clothing/2026/market-vendor-manager-apron-dc-2023-usda.jpg` | Public domain (PD-USGov-USDA) | modern casual dress: tees, jeans, polos |
| C2026-3 | `clothing/2026/farmer-stanley-madison-lyles-station-in-2021-usda.jpg` | Public domain (PD-USGov-USDA / NRCS) | farmers'-market manager (Black man in ball cap); farmer in ball cap |
| C2026-4 | `clothing/2026/bathtub-race-nanaimo-bc-2009-moosealope.jpg` | CC BY 2.0 - Moosealope | bathtub-race captain: helmet, safety gear |
| T1807-1 | `town/1807/hot-springs-creek-sketch-1834-pub1844-featherstonhaugh.jpg` | Public domain (PD-old-100-1923; published 1844) | springs and tufa, creek, valley massing, a few cabins |
| T1807-2 | `town/1807/log-cabin-tavern-c1820-blevins-ar-habs-loc.jpg` | No known restrictions (LoC, HABS; U.S. government work) | farm buildings: dogtrot log house, roof, porch |
| T1871-1 | `town/1871/hot-springs-health-resort-engraving-1873-taylor-loc.jpg` | Public domain (PD-old-100-1923; published 1873) | early town: wooden bathhouses, troughs, frame buildings |
| T1871-2 | `town/1871/main-street-looking-north-1875-loc.jpg` | No known restrictions on publication (LoC; published c.1875) | the one-street town: building massing, street, fences |
| T1871-3 | `town/1871/central-ave-view-of-1875-postcard-pub1916-nps.jpg` | Public domain (published 1916; Commons tag PD-USGov-NPS) | layout: open creek with footbridges to the bathhouses |
| T1871-4 | `town/1871/big-iron-bathhouse-harpers-1878.jpg` | Public domain (PD-US; published 1878) | bathhouses over the open creek: roofs, bridges, tufa |
| T1871-5 | `town/1871/old-mud-hole-spring-stereo-1870s-80s-clary-nypl.jpg` | Public domain (PD-Scan; NYPL stereograph, published c.1872-1887) | springs and tufa: free pools, signs |
| T1871-6 | `town/1871/market-wagon-oxen-stereo-c1880-kennedy-nypl.jpg` | Public domain (PD-Scan; NYPL stereograph, published c.1872-1887) | farm-to-town transport; farmers' hats; board-and-batten houses |
| T1886-1 | `town/1886/bath-houses-print-1888-loc.jpg` | Public domain (PD-old-100-1923; published 1888) | the Victorian Row: building massing, palette, street life |
| T1886-2 | `town/1886/birds-eye-view-1890-townsend-loc.jpg` | Public domain (PD-Art; published 1890) | town layout for the top-down map |
| T1886-3 | `town/1886/central-avenue-1895-1910-detroit-loc.jpg` | No known restrictions (LoC, Detroit Publishing Co.; published before 1931) | commercial blocks: cornices, storefronts, awnings, poplars |
| T1886-4 | `town/1886/palace-bathhouse-victorian-postcard-1909-nps.jpg` | Public domain (PD-US-expired; published 1909) | a single Victorian bathhouse: tower, colour |
| T1886-5 | `town/1886/city-valley-looking-south-stereo-1880s-kennedy-nypl.jpg` | Public domain (PD-Scan; NYPL stereograph, published c.1872-1887) | the first (white frame) Arlington Hotel; valley massing |
| T1931-1 | `town/1931/central-ave-bathhouse-row-looking-north-c1924.jpg` | Public domain (PD-US-no notice; published c.1924) | the whole 1920s town: Row, Central Ave, twin-towered hotel |
| T1931-2 | `town/1931/bathhouse-row-postcard-1916-nps.jpg` | Public domain (published 1916; Commons tag PD-USGov-NPS) | Row front: promenade, lawn, Buckstaff facade |
| T1931-3 | `town/1931/carpenter-dam-linen-postcard-1930-45-tichnor.jpg` | Public domain (PD-US-not-renewed; Tichnor Bros. linen postcard, Boston Public Library) | Carpenter Dam massing; linen-postcard palette |
| T1931-4 | `town/1931/best-tourist-court-linen-postcard-1930-45-tichnor.jpg` | Public domain (PD-US-not-renewed; Tichnor Bros. linen postcard, Boston Public Library) | tourist court: building massing, signs, palette |
| T1931-5 | `town/1931/promenade-carriage-medical-arts-arlington-1938-nps.jpg` | Public domain (PD-USGov-NPS, per Commons / NPGallery) | Medical Arts tower and Arlington; carriage; autumn palette |
| T1931-6 | `town/1931/tenant-farmer-home-arkansas-1935-fsa-loc.jpg` | No known restrictions (LoC, FSA/OWI; U.S. government work) | poor farmhouse: siding, roof, porch, piers |
| T1955-1 | `town/1955/central-court-linen-postcard-1930-45-tichnor.jpg` | Public domain (PD-US-not-renewed; Tichnor Bros. linen postcard, Boston Public Library) | tourist court: flat-roofed units, awnings, neon sign |
| T1955-2 | `town/1955/lake-hamilton-sailboats-linen-postcard-1930-45-tichnor.jpg` | Public domain (PD-US-not-renewed; Tichnor Bros. linen postcard, Boston Public Library) | Lake Hamilton: early lake, bridge, boats |
| T1955-3 | `town/1955/lynwood-tourist-court-1944-photo2013-brandonrush.jpg` | CC BY-SA 3.0 - Brandonrush | 1940s tourist court: gables, brick, signs |
| T1955-4 | `town/1955/fountain-motel-tourist-court-1979-margolies-loc.jpg` | No known restrictions on publication (LoC, John Margolies Roadside America archive) | International Style motor court: massing, details, colour |
| T1955-5 | `town/1955/iq-zoo-postcard-tichnor-bpl.jpg` | CC BY 2.0 - Boston Public Library (Tichnor Brothers collection) | the animal trainer's workplace: facade, signs |
| T1955-6 | `town/1955/new-chicken-house-farm-culp-ar-1955-mennonite-archives.jpg` | No known copyright restrictions (Flickr Commons, Mennonite Church USA Archives) | 1950s farm outbuilding: poultry house |
| T2026-1 | `town/2026/central-ave-street-scene-2020-highsmith-loc.jpg` | No known restrictions on publication (LoC, Carol M. Highsmith Archive) | today's Central Avenue: storefronts, street furniture |
| T2026-2 | `town/2026/fordyce-visitor-center-2020-highsmith-loc.jpg` | No known restrictions on publication (LoC, Carol M. Highsmith Archive) | Fordyce facade: lozenge brick, red tile, marquee; Medical Arts tower |
| T2026-3 | `town/2026/bathhouse-row-looking-north-2013-brandonrush.jpg` | CC BY-SA 3.0 - Brandonrush | today's Row: Quapaw dome, arcade, landscape, Arlington |
| T2026-4 | `town/2026/lake-hamilton-2013-brandonrush.jpg` | CC BY-SA 3.0 - Brandonrush | today's lake: shoreline homes, water colour |
| T2026-5 | `town/2026/arkansas-farm-field-plan-utv-2019-nrcs-usda.jpg` | Public domain (PD-USGov-USDA) | modern farm: field layout, UTV, yard |