# Valley of Vapors: town content

Everything the game shows about Hot Springs, sorted by chapter. Each line cites the corpus file it came from
(and, through it, the original source). Player-facing history facts are restated from the **audited
bank** (`games/trivia/data/questions.json`, `confidence: confirmed`) and listed by bank id in
`data/facts.json`; `tools/check-facts.mjs` verifies them. Everything marked **game** is invented for
play (characters, prices, crop growth times, recipes) and is labelled as game content on screen.

Abbreviations: HT = `research/history-timeline.md`, CEF = `research/culture-events-food.md`,
GLM = `research/geography-lakes-mountains.md`, FW = `research/fish-and-wildlife.md`,
VSG = `research/visual-style-guide.md`, GH = `research/game-hooks.md` §11, bank = audited bank id.

## How the six chapters map to the corpus era ids

The brief asks for six eras; the corpus has seven ids. The `revival` years (1968–1999) are covered by
the Chapter 5 closing card and the Chapter 6 opening card instead of a playable chapter.

| Chapter | Story year (game) | Corpus era id(s) | Palette slug (tokens) | Map state |
|---|---|---|---|---|
| 1. Steam Valley | 1807 | `ancient` → early `frontier` | `ouachita-forest` | no town; health-seeker huts by the springs; trader camp |
| 2. The Reservation | 1871 | `frontier` | `frontier-valley` | Valley Street: two rows of plank hotels and bathhouses; water mill |
| 3. Golden Age of the Row | 1886 | `gilded-spa` | `gilded-spa` | Central Avenue, brick hotel, bathhouses, depot, ballfield |
| 4. The Open Town | 1931 | `roaring` | `linen-postcard` by day, `deco-neon` at night | full Row, radio mast, tourist court, club neon; Lake Hamilton fills the south |
| 5. Mid-Century | 1955 | `midcentury` | `motor-hotel` | motor hotel, drive-in stand, animal-show barn; lake bigger |
| 6. Today | 2026 | `modern` (+ `revival` recap) | `lake-life` | restored Row: brewery, spa, cultural center; farmers' market; tub race |

The story year is the year the chapter starts (game choice). Dates inside the era (fires, dams, laws)
are told in fact cards with their real dates, never as events "happening" in the story year.

## Chapter 1 — Steam Valley (1807)

**Setting facts (sourced)**
- People have lived in the area for more than 10,000 years; the park has 92 known archaeological sites
  including prehistoric novaculite quarries; artifacts include novaculite points and grinding stones —
  HT ancient › Narrative (NPS Archeology).
- Caddo confederations controlled the area from about AD 800; Native occupation lasted to about 1600 —
  HT ancient (EOA). The park consults with the Absentee Shawnee Tribe, the Caddo Nation, the Osage
  Nation and the Quapaw Tribe — HT ancient (NPS Archeology). *Used on the heritage-site sign.*
- Novaculite: Native peoples quarried it for thousands of years (bank hs-0472); its name means "razor
  stone" (bank hs-0143); grades "Washita" (porous) and "Arkansas" (fine, waxy); settlers sharpened axes
  and saws with it and traded it — HT ancient/frontier › Economy (EOA Novaculite). Whetstone mining in
  the region began as early as 1818 (bank hs-0012).
- 1804 Dunbar–Hunter expedition, sent by Jefferson (bank hs-0003): four principal springs (hs-0113),
  water about 148–150°F (hs-0114), camped at Calfait Creek, today Gulpha Creek (hs-0115); found an empty
  cabin and visitor shacks, swans, deer, raccoons and buffalo sign; microbes in the hot water — HT frontier.
- 1807: Jean Pierre Emanuel Prudhomme built the first real settlement (hs-0282); trapper John Percival
  built cabins to rent to health seekers (hs-0283).
- De Soto bathing in 1541 is a legend with no firm evidence (hs-0471, **[LEGEND]**); the "neutral ground"
  truce story is a tourism-era embellishment — HT ancient (EOA). *Shown only as "a tale travelers tell",
  labelled Legend.*
- Forest: oak/hickory on north slopes, shortleaf pine on south slopes; maple-leaf oak grows at only four
  sites in the world, all in the Ouachitas (hs-0170) — FW › Plants and forests.
- Wildlife present in the park today: white-tailed deer, wild turkey, squirrel, rabbit, raccoon, gray fox
  — FW › Mammals. Bison, elk, cougar and red wolf are extirpated (same).
- Travel: river boat up the Ouachita, then foot — HT frontier › Transport.

**Closing card facts:** the Quapaw ceded the land Aug. 24, 1818 (hs-0008); the Beldings came from
Massachusetts in 1828 and built a small hotel (hs-0007); Jackson signed the reservation act April 20,
1832 (hs-0001); EOA calls it the nation's first federal reservation (hs-0473).

**Game content (invented):** corn, beans, squash and the "Washita radish" (the name nods to the 1804
"cabbage raddish of the Washita" — HT frontier; growth data is game). Forage: hickory nuts, acorns, pine
knots, wild greens. Cast: Josiah Crane (trapper, cabin renter archetype), Margaux Delacroix (river trader;
French place names show French presence — HT ancient), Ezra Pell (an ailing health seeker in a hut).

## Chapter 2 — The Reservation (1871)

**Setting facts (sourced)**
- The reservation (1832) barred settlement; claimants fought over title for about 45 years
  (1832–1877) — HT frontier › Narrative; the Rector claim rested on New Madrid Certificate No. 467 (hs-0010).
- Hot Springs is 40 years older than Yellowstone as a reservation (hs-0002).
- State capital May 6 to July 14, 1862 (hs-0009); the town emptied in the war and was burned by
  guerrillas — HT frontier.
- 1870: about 1,200 people; by 1873 six bathhouses and 24 hotels and boardinghouses — HT frontier (Wikipedia).
  Main street was Valley Street (renamed Central Avenue in the late 1870s, hs-0060).
- Farming: rocky soil; small farms of wheat and cattle; produce eaten or sold in Hot Springs; a
  water-powered corn mill (Watson, then Ross) on the South Fork of the Saline; charcoal works, stave mills
  and shingle mills — HT frontier › Farming (EOA Whittington, via search summary).
- 1871: Mountain Valley Spring Water first sold (hs-0348) by pharmacist Peter E. Greene and his brother;
  its spring is cold (hs-0394), about a dozen miles north of downtown — CEF › Food and drink.
- Stage from Malvern: 21 miles, most of a day, with breakdowns, floods and robbers — HT frontier › Transport.
- Sensitive history (card only, never gameplay): in 1860, 613 of 5,635 Hot Spring County residents were
  enslaved and many worked in hotels — HT frontier › Daily life (EOA). Shown factually on the closing card.

**Closing card facts:** Garland County created in 1873 (hs-0011); the first Arlington Hotel opened 1875
(hs-0058); Diamond Jo Reynolds's railroad carried visitors from Malvern (hs-0016).

**Game content:** corn → cornmeal at the mill, wheat, potatoes, beans; a milk cow; staves, shingles,
charcoal from timber; "spring water" jugs. Cast: Corinna Bell (boardinghouse keeper), Amos Thorne
(stage driver), Lucius Greer (druggist who wants to bottle cold spring water; an archetype, not Greene).

## Chapter 3 — Golden Age of the Row (1886)

**Setting facts (sourced)**
- Railroad: the original line from Malvern was 3-foot narrow gauge (hs-0015); converted to standard
  gauge in about three hours on Oct. 16, 1889 (hs-0017); an 1877 railroad booklet compared Hot Springs
  to Baden-Baden (hs-0018).
- Spring training: the Chicago White Stockings came in 1886, the first major league club to do so
  (hs-0182).
- Free Bathhouse act Dec. 16, 1878 (hs-0019); a "course" was 21 baths (hs-0022); attendant fee capped at
  20 cents a bath in 1920 (hs-0023). Bath attendants were mostly African American until the 1980s; Black
  bathers were barred from the 10 a.m.–noon "best" hours in the 1880s — HT gilded-spa › Daily life (NPS).
  The Crystal Bathhouse (1904) was the first built exclusively for African Americans (hs-0063); the
  Knights of Pythias opened the Pythian Bathhouse in 1914 (hs-0031).
- The Army and Navy Hospital (1887) was the nation's first joint Army-Navy general hospital (hs-0024).
- H. L. Campbell founded the alligator farm in 1902 (hs-0298); W. N. Benton, a former St. Louis
  insurance agent, bought Mountain Valley in 1879 (hs-0350); the national forest began in 1907 as the
  Arkansas National Forest (hs-0118).
- Farming: farms sold produce in town; charcoal, staves and shingles from the timbered north county;
  wood shingles outlawed after 1913 (hs-0030) — HT gilded-spa › Farming. Produce to hotels and
  ballclubs is **[inferred]** (HT) and shown as game.
- Look: cream brick, red clay tile, terra cotta, magnolias, iron grilles — VSG › Era looks.

**Closing card facts:** the Sept. 5, 1913 fire began with ironing that set a curtain alight (hs-0026)
and led to the wood-shingle ban (hs-0030); the Buckstaff has offered baths since 1912 (hs-0062); the
Free Bathhouse gave about 87,040 free baths in 1919 (hs-0020).

**Game content:** tomatoes, strawberries, cabbage, wheat; hotel and ballclub orders; brick farmhouse.
Cast: Augustin Duval (grand-hotel chef), Hattie Coleman (veteran bath attendant who teaches the jug
route; her dialogue states the segregated-hours rule factually), Walt Brennan (a fictional ballclub
trainer; no real players).

## Chapter 4 — The Open Town (1931)

**Setting facts (sourced)**
- Carpenter Dam formed Lake Hamilton, completed 1931 (hs-0121), about 7,200 acres (hs-0122); Remmel Dam
  (1924) formed Lake Catherine (hs-0123); the CCC built Lake Catherine State Park (hs-0042).
- The Lamar's 1923 opening completed Bathhouse Row (hs-0077); the third Arlington was completed in 1924
  (hs-0076); the Quapaw was named for Native artifacts found digging its basement (hs-0078).
- KTHS radio's founding director was Campbell Arnoux, 1924–1934 (hs-0319).
- A tourist court's goat barbecue: by 1928 the McClards were cooking goat (hs-0353) with a sauce recipe a
  guest traded for an unpaid bill (hs-0354) of $10 (hs-0355) — CEF › Food and drink. *Told as a fact card;
  the game's tourist-court couple are fictional.*
- Timber: Dierks Forests built a major timber industry; novaculite mining grew in the 1920s–30s — HT
  roaring › Economy. Buses replaced streetcars in 1938 (hs-0041).
- Gambling-era figures (McLaughlin, Capone, Madden) appear only as facts; the game uses fictional
  archetypes — research/00-INDEX.md › Content rules.

**Closing card facts:** the WWII Army redistribution center processed more than 32,000 service members
(hs-0038); the Army-Navy Hospital was the nation's largest center for adults with polio (hs-0035); the
1946 GI Revolt, led by Sid McMath (hs-0308), toppled Mayor Leo P. McLaughlin's machine (hs-0311).

**Game content:** goats (milk, cheese), peppers, sweet potatoes, peanuts; lake fishing opens; a
"farm report" radio sponsorship. Cast: Dell and Ora Fenwick (tourist court, one NPC: Ora), Sal Romano
(a fictional croupier who buys late-night suppers), June Talley (radio announcer).

## Chapter 5 — Mid-Century (1955)

**Setting facts (sourced)**
- Blakely Mountain Dam creates Lake Ouachita (hs-0126), which has about 200 islands (hs-0127); Lake
  Ouachita State Park preserves the Three Sisters Springs (hs-0128); the lake flooded Buckville and Cedar
  Glades, relocating farm families — HT midcentury › Farming (EOA).
- Keller and Marian Breland (hs-0333), students of B. F. Skinner (hs-0325), ran the IQ Zoo (1955), whose
  trained chickens walked tightropes — HT midcentury › Daily life (APA Monitor).
- Verna Cook Garvan began Garvan Woodland Gardens in 1956 (hs-0324); the Bathers played in the Class C
  Cotton States League (hs-0229); the Army-Navy Hospital went to the state for one dollar in 1960 (hs-0045);
  quartz crystal became the state mineral in 1967 (hs-0129).
- A 1950–1965 hotel and motel boom along Park Avenue — HT midcentury (Rex Nelson).

**Closing card facts:** the Fordyce was the first bathhouse to close, in 1962 (hs-0089); passenger rail
ended in 1964 (hs-0044); bathhouses were desegregated in 1965 (hs-0047); the casino revival ended in 1967
(hs-0049). Revival bridge: Bathhouse Row listed on the National Register Nov. 13, 1974 (hs-0100); about
96,000 baths a year by 1979 (hs-0050); the Fordyce reopened as the visitor center in 1989 (hs-0096).

**Game content:** chickens (eggs), sweet corn, okra, watermelon; motel-diner orders; a roadside stand.
Cast: Lorraine Pace (motor-hotel owner), Dr. Nell Ambry (fictional animal trainer), Rusty Cole (farmer
relocated from the flooded valley; fictional family).

## Chapter 6 — Today (2026)

**Setting facts (sourced)**
- The Superior houses a brewery and distillery (hs-0102); thermal water reaches it at about 140°F
  (hs-0364). Quapaw Baths & Spa opened July 2008 (hs-0103); the Hale is the nine-suite Hotel Hale
  (hs-0101); the Ozark houses the cultural center (hs-0104); the Maurice restoration is about
  $31.6 million (hs-0052).
- Festivals: the World's Shortest St. Patrick's Day Parade on Bridge Street (hs-0368); the Running of the
  Tubs, where teams push bathtubs (hs-0378), began in 2006 per the bank (hs-0379; CEF lists 2005 — data note
  in REPORT.md; the game uses the bank value). Garvan Woodland Gardens is 210 acres (hs-0141).
- Lake Ouachita striped bass are stocked every year because they don't reproduce naturally there
  (hs-0138); new brush piles are mostly cedar (hs-0139).
- Economy: tourism, forestry, manufacturing and regional medicine — HT modern › Economy.

**Closing card facts:** the Majestic Hotel fire, Feb. 27, 2014 (hs-0051); 47 springs at an average
143°F (hs-0148); most thermal water about 4,400 years old (hs-0145); the "Great American Spa" (hs-0512).

**Game content:** heirloom tomatoes, hops (for the brewery, game), wheat, blueberries, tulip bulbs
(Garvan tulips are sourced in FW as an attraction; the crop is game); a farmers' market stall; a tub for
the race. Cast: Priya Natarajan (brewer), Marcus Bell (farmers' market manager), Jo Tanaka (tub-race
captain). All fictional.

## Cross-chapter: springs, rocks, fish, climate

- Springs: average about 143°F (hs-0147); over 700,000 gallons a day (hs-0146); tufa/travertine around the
  openings (hs-0156); the alpha and beta faults carry heated water up (hs-0151); Happy Hollow and
  Whittington cold springs are ozone-filtered (hs-0157) — GLM › Thermal springs. Steam: "Valley of Vapors"
  comes from steam off the springs — GLM. Tufa colors and algae greens follow VSG/GLM estimated hexes.
- Hot-jug and cold-jug gameplay: hot water from the thermal spring; cold from a cold spring (GH idea 15).
- Fish (FW › Species table): creek/river chapters 1–3 — bream (sunfish), channel catfish, gar, freshwater
  drum; Lake Hamilton from Chapter 4 — largemouth bass, white crappie, bream, channel catfish, white bass;
  Lake Ouachita/Chapter 5+ adds striped bass, walleye; Chapter 6 adds rainbow trout (stocked in the
  tailwaters about Nov–Mar). Prices and catch odds are game.
- Rocks: novaculite (white to gray-black; also pink, red, tan); quartz crystal (state mineral 1967) —
  GLM › Rocks and minerals.
- Climate (GLM › Climate): May is wettest (6.3 in), July average high 93°F, January low 32°F, about
  1.1 in of snow a year. The game's rain chance by season follows these normals: spring 35%, summer 22%,
  fall 25%, winter 25% with a 1-in-12 chance a winter rain day is snow (game rounding of "rare snow").
- Seasons look (VSG › Valley of Vapors hook, **[inferred]**): redbud magenta in spring, saturated greens in
  summer, sweetgum/maple orange in fall, gray-brown oak with pine green in winter; morning steam fog.

## Content rules applied
- No logos, no brand names on in-game goods ("cold spring water", not a brand); real businesses appear
  only in fact cards.
- No living people as characters; real historic figures appear only in fact cards.
- Native history: heritage-site sign and fact cards only; the old quarry is a "leave it as you found it"
  site the player can read about but never dig. Novaculite for whetstones comes from ordinary ridge
  outcrops. No Native NPCs are invented as caricature or quest-givers.
- Slavery, segregation and the Jim Crow bathing rules are stated factually on cards and in one adult NPC's
  dialogue, never turned into a mechanic.
- Legends (de Soto, neutral ground) carry a "Legend" label.
