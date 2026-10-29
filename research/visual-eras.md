# Visual Eras: Paintable Facts for the Hot Springs Valley Farm (1807, 1871, 1886, 1931, 1955, 2026)

Art-direction research for the farming game. Each row cites a URL. **[inferred]** = our reading or general knowledge applied to Hot Springs, not stated by a source. **[conflict]** = sources disagree (both given). "corpus:" means the audited shared research in `C:\Video Game Projects\research\` (or the trivia game's research folder), which carries the primary URLs. Hex values are estimates, never measured from photos. Compiled 2026-10-29.

**Rule carried from the corpus:** the 1924 hotel at the Central/Fountain "Y" is described for massing only. Paint a generic "grand hotel" and do not name or brand it.

---

## 1. Geography for a top-down map

### 1.1 Gulpha Creek: correction to the brief

**[conflict]** The brief says Gulpha Creek enters Lake Hamilton. The mapping sources put its mouth in **Lake Catherine**, below Carpenter Dam:
- OpenStreetMap's "Gulpha Creek" ends at 34.47216, -92.98641 — [OSM way 250880954](https://www.openstreetmap.org/way/250880954). That is the same spot as the trivia anchor "Lake Catherine: shore point nearest the Row" (34.47217, -92.98658) — corpus: `games/trivia/research/geo-anchors.json`.
- GNIS gives the stream's primary point (normally its mouth) as 34.4662, -92.9843 — [GNIS 77086 via HometownLocator](https://arkansas.hometownlocator.com/maps/feature-map,ftc,1,fid,77086,n,gulpha%20creek.cfm).
- Both points lie east of Carpenter Dam (-93.0258), so they are in Lake Catherine (Remmel Dam, 1924), not Lake Hamilton.
- Before 1924 the creek ran straight into the Ouachita River. The 1804 Dunbar–Hunter party camped at "Calfait (Gulpha) Creek / Ellis Landing" on Dec. 7 — corpus: `history-timeline.md` → [EOA Hunter-Dunbar](https://encyclopediaofarkansas.net/entries/hunter-dunbar-expedition-2205/).
- Hot Springs Creek (Bathhouse Row) is the stream that empties into Lake Hamilton — [Wikipedia: Hot Springs, AR](https://en.wikipedia.org/wiki/Hot_Springs,_Arkansas).
- **Map consequence [inferred]:** if the farm sits in the Gulpha bottoms, the lake visible from it in 1931–2026 is Lake Catherine's upper arm (from 1924), with Lake Hamilton beyond the ridge to the west. If the design needs Lake Hamilton on the farm's shore, put the farm on the lower Hot Springs Creek arm instead, or say openly that the geography is fictionalized.

### 1.2 Gulpha Creek's course (from OSM geometry)

| Point | Lat, lon | Note | Source |
|---|---|---|---|
| Upper end of the named stream | 34.53628, -93.02989 | North of the campground, on North Mountain's east flank | [OSM way 250880957](https://www.openstreetmap.org/way/250880957) |
| Gulpha Gorge Campground | 34.52689, -93.03618 | Creek runs 25 m from the camp centroid | [OSM way 472151389](https://www.openstreetmap.org/way/472151389) |
| Gulpha Gorge picnic grounds | 34.52203, -93.03546 | — | [OSM node 359022326](https://www.openstreetmap.org/node/359022326) |
| Abreast of Hot Springs Mtn summit | ~34.5175, -93.032 | About 1.2 km east of the summit (34.51755, -93.04565) **[inferred from geometry]** | OSM; summit from corpus `geo-anchors.json` (GNIS 57949) |
| USGS gauge "Gulpha Creek at Hot Springs" | 34.5089, -93.0092 | — | [OSM node 12091120237](https://www.openstreetmap.org/node/12091120237) |
| Middle Branch joins | 34.50082, -93.00996 | — | [OSM way 953155838](https://www.openstreetmap.org/way/953155838) |
| USGS gauge at Ridgeway St | 34.494, -93.0065 | Top of the Class II+ reach | [OSM node 12091120236](https://www.openstreetmap.org/node/12091120236); [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/4284/main) |
| East Branch joins near the mouth | 34.4740, -92.9866 | — | [OSM way 953148934](https://www.openstreetmap.org/way/953148934) |
| Mouth (Lake Catherine) | 34.47216, -92.98641 | — | OSM way 250880954 |

- **Length and direction:** about 6.4 mi of named channel (sum of the two OSM ways). It runs **south along the east side of North Mountain and Hot Springs Mountain**, then **south-east** to Lake Catherine **[inferred from geometry]**.
- **The gorge:** the 1902 USGS sketch says the springs rise at "the western end of Hot Springs Mountain, which is known as Indian Mountain east of West Branch of Gulpha Creek" — corpus search summary of [Haywood & Weed 1902 (npshistory)](https://npshistory.com/publications/hosp/haywood-weed/sec8.htm). Read this as one ridge that the creek cuts through: Hot Springs/North Mountain on the west, Indian Mountain on the east **[inferred]**. From Goat Rock (North Mountain, 34.5273, -93.0392) the view looks out to "Indian Mountain and east Hot Springs" — [NPS Goat Rock](https://www.nps.gov/places/goat-rock-view-point.htm).
- **Creek bed:**
  - A small diversion dam at the campground leaves a wide shallow side and a series of deeper pools — [Visit Hot Springs](https://hotsprings.org/blog/lakes-pools-waterfalls/).
  - Below Ridgeway St the reach averages 35 ft/mi with "essentially no pools, lots of rocks" — [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/4284/main).
  - Novaculite boulders are "strewn along" the North Mountain trails above the gorge — [NPS Goat Rock](https://www.nps.gov/places/goat-rock-view-point.htm).
  - Novaculite runs white to grayish-black, with pink, red and tan — corpus: `visual-style-guide.md` → [AR Archeological Survey](https://archeology.uark.edu/wp-content/uploads/2021/07/Arkansas-Novaculite.pdf).
  - **Paint [inferred]:** a cobble-and-gravel bed of pale gray and white novaculite with tan sandstone, riffles between short pools, and low ledges. No source found for named bluffs on Gulpha Creek.
- **Bottomland soils:** no soil-survey series were retrieved for the Gulpha bottoms. **[inferred]** Paint brown gravelly loam on the low terraces and stony slopes above. The corpus notes "rocky soil" across the northern county — corpus: `history-timeline.md` → [EOA Whittington](https://encyclopediaofarkansas.net/entries/whittington-garland-county-10724/).

### 1.3 Vegetation bands

| Band | What grows there | Source |
|---|---|---|
| Ridges and dry south slopes | Shortleaf pine–oak woodland: 35.7% of the park in the dry-mesic type plus ~20% in the dry type | [NPS HOSP veg monitoring](https://www.nps.gov/articles/hospvegmon.htm) (via search summary) |
| Old growth | Shortleaf pine, blackjack oak and white oak; trees over 130 years old, a few over 200 | [Wikipedia: HSNP](https://en.wikipedia.org/wiki/Hot_Springs_National_Park) |
| North slopes | Oak and hickory (pine on south slopes) | corpus: `visual-style-guide.md` → Wikipedia HSNP |
| Stream corridors | "Ouachita-Ozark Small Stream Hardwood Forest," ~20% of the park | [NPS HOSP veg monitoring](https://www.nps.gov/articles/hospvegmon.htm) |
| Creek banks and cobble bars | Sycamore, river birch, sweetgum, maples, oaks and hazel alder "adjacent to stream bed cobble"; pine-dominated riparian types still carry sycamore and river birch | [Okla. Wildlife Dept. Interp Book p.246–247](https://wildlifedepartment.com/magazine/InterpBook/files/basic-html/page247.html) (Ozark–Ouachita types, regional) |
| Giant cane | Not sourced for Gulpha Creek. **[inferred]** Small canebrake patches on the low bottoms are plausible; ask before treating them as fact | — |

### 1.4 Hot Springs Creek, the mountains and Central Avenue

- **Valley:** Central Avenue (originally Valley Street) follows Hot Springs Creek "in the valley between the North and West Mountains" — [Central Ave HD NRHP nomination](https://npgallery.nps.gov/GetAsset/18195d15-bdf3-4b67-b1de-fe40609ce075).
- **Sides of the street:** the Row stands on the creek's east bank at the foot of Hot Springs Mountain, and the commercial blocks stand on the west side — same nomination; corpus `games/trivia/research/bathhouse-row-layout.md`.
- **Creek route (OSM):**
  - Culvert from Park Ave (34.52243, -93.05527).
  - Under the east edge of Central and the Magnolia Promenade.
  - Back into the open at 34.507257, -93.052004.
  - About 2.7 mi south to Lake Hamilton at 34.46347, -93.04426.
  - Sources: corpus `bathhouse-row-layout.md` §5; [OSM way 352881672](https://www.openstreetmap.org/way/352881672).
- **Peaks (OSM):** Hot Springs Mountain 34.51759, -93.04546 (315 m); North Mountain 34.52648, -93.04157 (344 m); Sugarloaf 34.52037, -93.08213 (348 m) — [OSM nodes 358986020, 358986313, 359013699](https://www.openstreetmap.org/node/358986313). West Mountain has no OSM peak node; Music Mountain (1,405 ft) is its high point — corpus `geography-lakes-mountains.md`.
- **Other anchors:** Bathhouse Row 34.513889, -93.053611; Display Spring 34.514086, -93.053074; Hot Water Cascade 34.516057, -93.052644; Carpenter Dam 34.442222, -93.025833; Lake Hamilton centroid 34.4325, -93.0887 — corpus `geo-anchors.json`; [Wikipedia: Lake Hamilton](https://en.wikipedia.org/wiki/Lake_Hamilton_and_Lake_Catherine).

---

## 2. The springs and tufa

| Topic | Fact | Source |
|---|---|---|
| Tufa colour | "dark-gray and porous travertine, or calcareous tufa" (1902) | [Weed 1902, sec. 8](https://npshistory.com/publications/hosp/haywood-weed/sec8.htm) |
| Tufa colour | "barren gray"; also "creamy alabaster-like tufa"; green deposits are "brilliant emerald-green tufa" from "the growth of hot-water algae" | [Weed 1902, sec. 9](https://npshistory.com/publications/hosp/haywood-weed/sec9.htm) |
| Tufa colour | NPS today: "a more drab gray"; Wikipedia: "white to tan travertine" near the openings | [NPS tufa](https://www.nps.gov/hosp/learn/photosmultimedia/tufa.htm); [Wikipedia HSNP](https://en.wikipedia.org/wiki/Hot_Springs_National_Park) |
| Terraces | Before bathhouses diverted the water, the upper springs "cascaded down the slope and formed mineral terraces of calcium carbonate (tufa)" | NPS trail marker, [HMdb 145670](https://www.hmdb.org/m.asp?m=145670) (via search summary) |
| Not Mammoth-style | The larger springs lacked the "bowls and basins" of Yellowstone's Mammoth terraces | [Weed 1902, sec. 9](https://npshistory.com/publications/hosp/haywood-weed/sec9.htm) |
| Extent | The spring zone was a strip "a few hundred feet wide and a quarter of a mile long." Springs "formerly issued abruptly from the tufa slopes"; smaller ones were "mere oozes." Earlier writers noted the ground lacked forest growth | same |
| Algae | Blue-green alga *Phormidium treleasei* grows where the water meets light and air | [EoA photo 1638](https://encyclopediaofarkansas.net/photo-of-day/this-day-1638/) |
| Algae colour by temperature | At Yellowstone, cyanobacteria mats are yellow-green at the hottest edge and turn orange, rust or brown as the water cools. **[inferred]** Hot Springs is an analogue only | [NPS Yellowstone thermophiles](https://www.nps.gov/yell/learn/nature/thermophilic-bacteria.htm) |
| Display Spring | A shallow pool "shaded by trees, surrounded by mosses and blue-green algae," about 143°F | corpus `bathhouse-row-and-springs.md` → [NPS](https://www.nps.gov/hosp/planyourvisit/thermal-springs.htm) |
| Display Spring build | Designed in the 1930s between the Maurice and Fordyce: "two seeps were led together to run over small cascades of tufa masonry into a small pool" and on into the creek arch. Meant to be temporary, it was kept because crowds liked it | [CLI Bathhouse Row](https://npshistory.com/publications/hosp/cli-bathhouse-row.pdf) |
| Cascade | Built ~1982 as a man-made tufa outcrop that flows into a geometric thermal pool on Arlington Lawn | corpus `bathhouse-row-layout.md` → CLI |
| Steam | "Valley of Vapors" came from the steam over the springs (corpus). A photographer reports the densest steam on cool early mornings | corpus `geography-lakes-mountains.md`; [Terragalleria](https://www.terragalleria.com/blog/?p=1332) |

**Springs before capping (1807 to the 1870s):**
- **Huts and tents:** the first bathhouses were "brush huts and log cabins placed over excavations cut in the rocks to receive hot water" — [Wikipedia HSNP](https://en.wikipedia.org/wiki/Hot_Springs_National_Park). NPS describes them as "crude structures of canvas and lumber... little more than tents perched over individual springs or reservoirs carved out of the rock" — [NPS Bathhouse Row](https://www.nps.gov/hosp/learn/historyculture/bathhouse-row.htm).
- **Wooden troughs:** later, wooden troughs carried water from hillside springs to bathhouses along the creek, and some tufa was cut away to make room — Wikipedia HSNP.
- **Hollowed-log tubs:** no source found. **[inferred]** A blog dates a log bathhouse with one "wooden tub" to 1830 (Asa Thompson) — [publicpleasuregarden (unverified)](https://publicpleasuregarden.blogspot.com/2019/06/the-evolution-of-commercial-healing.html).
- **Corn Hole (1870s):**
  - A muddy foot-soaking spring, about 120°F, at the mouth of a tufa formation that visitors dug deeper.
  - Wooden benches ringed it; an 1870s photo shows women in the morning and men in the afternoon.
  - Source: [NPS Corn Hole](https://www.nps.gov/places/corn-hole.htm).
  - **[conflict]** How it ended: it "dried up in 1882" ([Wikipedia HSNP](https://en.wikipedia.org/wiki/Hot_Springs_National_Park)) vs. dynamite blasting sent the water elsewhere, and it was absent from the 1901 survey (NPS).
- **Mud Hole:** in 1878 a simple frame building went up over the "mud hole" spring as the Free Bathhouse — [EOA Government Free Bathhouse](https://encyclopediaofarkansas.net/entries/government-free-bathhouse-14771/).
- **Ral City:** an 1878 photo shows the free-spring encampment at a tufa outcrop midway up the mountain — corpus `bathhouse-row-and-springs.md` → [NPS Ral Spring](https://www.nps.gov/places/ral-spring.htm).

**When the springs were covered and piped:**
- **1877:** Supt. Kelley cleared the squatters from the mountainside and the springs — [CLI](https://npshistory.com/publications/hosp/cli-bathhouse-row.pdf).
- **1880s–90s:** the Row ran on "individual cooling tanks and mazes of above-ground pipes and wooden troughs to their rear," and the springs had "decrepit wooden covers" — CLI. This is the 1886 back-of-Row look.
- **By 1901:** all springs walled and covered — corpus `hot-springs-national-park.md`. By 1902 they were "all covered, and mostly concealed beneath turf and shrubbery," and some bathhouses stood "directly over large springs" — [Weed 1902, sec. 9](https://npshistory.com/publications/hosp/haywood-weed/sec9.htm).
- **Early 1930s:** a central collection system was built (corpus: completed 1933). A reservoir and pump house "near the tufa cliffs" was finished in 1950, after which the old per-bathhouse cooling towers came down — CLI.

---

## 3. Hot Springs Creek and the town by chapter

| Chapter | What to paint | Sources |
|---|---|---|
| **1807** | An empty cabin and several visitor-built shacks (1804). Prudhomme's settlement, then Percival's rental cabins (1807). Brush huts and tents over rock-cut pools. The creek open in a narrow wooded valley; steam rising | corpus `history-timeline.md` → [EOA Garland Co.](https://encyclopediaofarkansas.net/entries/garland-county-770/); [CLI](https://npshistory.com/publications/hosp/cli-bathhouse-row.pdf) ("log cabins and huts" in 1804) |
| **1871** | Population ~1,276 (1870). "Mostly located on one street, which is about a mile long, following the Hot Springs Creek" (Cutter, 1874). Frame buildings of one to three stories with **board-and-batten** siding, gentle-pitch or gabled roofs, one-story shed porches facing the street, **high parapets and false fronts**. Wooden bathhouses on the east bank with **bridges from their entrances over the open creek**. The creek was used as an open sewer and flooded the dirt road. Mountain Valley water sold from 1871. No railroad yet: stage from Malvern | [Central Ave HD nomination](https://npgallery.nps.gov/GetAsset/18195d15-bdf3-4b67-b1de-fe40609ce075); [NPS Bathhouse Row](https://www.nps.gov/hosp/learn/historyculture/bathhouse-row.htm) (postcard caption; file is labeled "incorrectly-dated-1875"); [CLI](https://npshistory.com/publications/hosp/cli-bathhouse-row.pdf); corpus `downtown-and-landmarks.md` |
| **1886** | Creek just arched over; Valley Street now **Central Avenue**, paved in front of the Row; "trees were planted, paved sidewalks were installed." Larger Victorian bathhouses (1880–88): Rector 1881, the **ironclad "Big Iron"** 1883 over a spring at a tufa dome, brick Rammelsberg 1880, Palace 1880, old Hale by 1882. The first hotel at the "Y" is a **white frame** building with two wings and a 190-ft facade (1875). Avenue Hotel (1882): five-story brick with a balustraded **mansard** center and a pressed-metal cornice. Opera House (1882), Victorian brick. Typical commercial block: **two-story brick, elaborate pressed-metal cornice, cast-iron storefront pilasters, wood-and-glass storefronts, transoms, canvas awnings**. Behind the Row: tanks, pipes and troughs. Horsecars on Central | Central Ave HD nomination; [CLI](https://npshistory.com/publications/hosp/cli-bathhouse-row.pdf); corpus `downtown-and-landmarks.md` (horsecars 1874/75–1887) |
| **1931** | Present Bathhouse Row complete (1912–1923). Per-building materials and colours are in corpus `visual-style-guide.md` → Architecture by building: cream/white brick and stucco, red clay tile, green tile on Maurice and Superior, Quapaw mosaic dome, Fordyce lozenge brick and copper-and-glass marquee. Magnolia Promenade with 20 five-globe cluster street lights (by 1929). Medical Arts tower (1929–30, Art Deco limestone). Southern Club's dark Pittsburgh glass front (1927). The twin-towered 1924 hotel closes the vista at the "Y" (generic, unnamed). Maurice therapy pool (1931). Electric streetcars still running (buses 1938). Grand Promenade not yet begun (grading 1933) | corpus `visual-style-guide.md`, `bathhouse-row-and-springs.md`; [CLI](https://npshistory.com/publications/hosp/cli-bathhouse-row.pdf) |
| **1955** | Grand Promenade, a brick walk behind the Row, nearly done (final landscaping July 25, 1958; width cut from 22 ft to 18 ft in 1956); goose-neck lamps along it. Noble Fountain moved to Reserve St in 1957; Row bandstand removed 1958. Mid-1950s remodels on Central: pressed metal stripped and brick **stuccoed**, **wrought-iron balconies**, louvered shutters, buff-brick veneer (Hale Block, 1956). Southern Club's first-in-town escalator (1950s). Park Ave **tourist courts** from the 1937–44 wave: Cove (c.1937, International Style stucco), Parkway (1943, brick Tudor/Craftsman), Lynwood (c.1944, English Revival). The gambling era is still open | corpus `bathhouse-row-layout.md`, `bathhouse-row-and-springs.md`; Central Ave HD nomination; [EOA Southern Club](https://encyclopediaofarkansas.net/entries/southern-club-1208/); Wikipedia: [Cove](https://en.wikipedia.org/wiki/Cove_Tourist_Court), [Parkway](https://en.wikipedia.org/wiki/Parkway_Courts_Historic_District), [Lynwood](https://en.wikipedia.org/wiki/Lynwood_Tourist_Court_Historic_District) |
| **2026** | Superior = brewery; Quapaw = spa (2008); Hale = 9-room hotel (2019); Ozark = cultural center (2014); Fordyce = visitor center (1989); Buckstaff still bathing; Lamar = park offices plus Bathhouse Row Emporium; Maurice closed for a $31.6M restoration (groundbreaking Aug 2025). The grand hotel's stucco stripped to brick (2023–25). Majestic site an empty lot (fire 2014, razed 2016). Historic-style fixtures on Park Ave ("Light Uptown," 2017) | corpus `bathhouse-row-and-springs.md`, `history-timeline.md`, `visual-style-guide.md`; [Sentinel-Record 2017 via PressReader](https://www.pressreader.com/usa/the-sentinel-record/20171118/281522226384562) (via search summary) |

**Notes and conflicts:**
- **[conflict] Creek arch date:** "In 1882-83 the government enclosed Hot Springs creek in an underground arch" ([NPS Bathhouse Row](https://www.nps.gov/hosp/learn/historyculture/bathhouse-row.htm)); "In 1884, the Department of the Interior covered the creek and paved the road" ([Central Ave HD nomination](https://npgallery.nps.gov/GetAsset/18195d15-bdf3-4b67-b1de-fe40609ce075)); built 1884–1886 as a "rock masonry arch culvert" ([CLI](https://npshistory.com/publications/hosp/cli-bathhouse-row.pdf)). **[inferred]** For the 1886 chapter, show the arch newly finished, with fresh lawn not yet planted (the 300 trees and the lawn date from 1892).
- **[conflict] Jens Jensen:** 1916 (corpus, Wikipedia) vs. 1918 (CLI).
- **1890s landscape (after 1886, before 1931):** Stevens's 1892–97 front: a 14-ft concrete promenade, a 9-ft lawn border, Lombardy poplars, with magnolias added by 1894 to replace them — [CLI](https://npshistory.com/publications/hosp/cli-bathhouse-row.pdf). The **red-brick second hotel** (1893) and the **red-brick Army and Navy Hospital** (1887) on the hill are the gilded-era landmarks between chapters — CLI.
- **Decline (1962–1985):** closures ran from the Fordyce (1962) to the Lamar (1985) — corpus `bathhouse-row-and-springs.md` → Closure and reuse timeline. By 1984 the Central Avenue storefronts had aluminum-and-glass replacements, covered transoms, removed awnings and "a modern wood, steel and fiberglass canopy" over the sidewalk — [Central Ave HD nomination](https://npgallery.nps.gov/GetAsset/18195d15-bdf3-4b67-b1de-fe40609ce075). Two big mid-1960s motels stood on Central: the Aristocrat and the Downtowner — same nomination.
- **Neon:** no source describes specific 1930s–50s Central Avenue neon signs. The Superior had a green neon script sign and the Maurice an orange neon lobby sign — corpus `visual-style-guide.md`. **[inferred]** Use generic invented sign text, as the corpus already does.

---

## 4. Roads, paving and street lighting

| Item | Date | Fact | Source |
|---|---|---|---|
| Trace and dirt road | 1807–1883 | The creek "flowed down the center of the valley and crossed the major dirt roads at several places" | [Central Ave HD nomination](https://npgallery.nps.gov/GetAsset/18195d15-bdf3-4b67-b1de-fe40609ce075) |
| Name | late 1870s | Valley Street renamed Central Avenue | corpus `downtown-and-landmarks.md` → EOA |
| First paving | 1884 | The road in front of the bathhouses was paved and sidewalks installed. **Material not stated**; **[inferred]** macadam or gravel, not brick, unless a photo shows otherwise | nomination |
| Front walk | 1890s / 1939 | 14-ft concrete promenade; "a 12 foot wide concrete walkway" by 1939 | [CLI](https://npshistory.com/publications/hosp/cli-bathhouse-row.pdf) |
| Highway paving | 1930s | A city marker says the Park Ave/Hwy 5 route was the only completely paved highway into town | [HMdb 264082](https://www.hmdb.org/m.asp?m=264082) (via search summary) |
| Streetcars | 1874/75 | Horse (mule) cars begin | corpus `downtown-and-landmarks.md` |
| Streetcars | 1893 or 1895 | Electric cars replace them **[conflict]** | corpus `downtown-and-landmarks.md` |
| Streetcars | 1938 | Buses replace streetcars. Trolley tracks "are now buried by several inches of pavement along Central Avenue" | corpus; [CLI](https://npshistory.com/publications/hosp/cli-bathhouse-row.pdf) |
| Electric utility | 1883 | The local electric company operated "under other names since 1883" (incorporated as Citizens Electric 1913) | [1922 Garland Co. history, USGenWeb](https://files.usgwarchives.us/ar/garland/history/1922/centenni/citizens4ms.txt) (via search summary; host refused direct fetch) |
| Electric utility | 1894 | A streetcar line bought power from the Hot Springs Electric Light & Power Co. | [Street Railway Journal 1894 scan](https://download.osmand.net/wiki/File:The_Street_railway_journal_(1894)_(14758518742).jpg) (via search summary) |
| Utility owner | — | The street-railway owner also owned the city's water, gas and electric utilities | [Wikipedia: Hot Springs Street Railroad](https://en.wikipedia.org/wiki/Hot_Springs_Street_Railroad) |
| Gas lamps | by 1897 | Four iron gas street lamps along the Row front, plus "two newer incandescent lights" | [CLI](https://npshistory.com/publications/hosp/cli-bathhouse-row.pdf) |
| Ornamental electric | 1914 | Fifteen ornamental electric standards along the Row; 20 five-globe cluster lights by 1929; the 1930s lamps still stand | CLI |
| Sodium vapour | 1960s–2000s | **[inferred]** Typical US practice; no Hot Springs date found. High-pressure sodium is orange-pink, ~#FFB46B | [Wikipedia: Sodium-vapor lamp](https://en.wikipedia.org/wiki/Sodium-vapor_lamp) |
| LED | 2010s–2026 | No Hot Springs or Entergy conversion date found. The 2017 Park Ave project used historic-style fixtures. **[inferred]** Neutral-white LED in 2026 | [Sentinel-Record via PressReader](https://www.pressreader.com/usa/the-sentinel-record/20171118/281522226384562) |

---

## 5. Lake Hamilton timeline

| Date | Event | Source |
|---|---|---|
| Feb 1929 | Ford, Bacon & Davis begin work; the reservoir area is evacuated in April 1929 | [EOA Carpenter Dam](https://encyclopediaofarkansas.net/entries/carpenter-dam-4731/) |
| fall 1929 | Nearly 1,000 men on site. The work camp was "a complete, self-sufficient village": barracks, cottages, commissary, mess hall, bath houses, dance halls, movie theater, church, hospital and school | [NRHP nomination GA0078](https://arkansasheritage.com/docs/default-source/national-registry/ga0078-pdf) |
| 1929–31 | "All the lumber and gravel for the concrete... was taken from the future lake bed" | same |
| Dec 1931 | Construction complete, $6.5M | [EOA](https://encyclopediaofarkansas.net/entries/carpenter-dam-4731/) |
| 1932 | Lake formed | [Wikipedia](https://en.wikipedia.org/wiki/Lake_Hamilton_and_Lake_Catherine) |

- **Filling and first full pool:** no gate-closure or full-pool date was found. **[inferred]** For the 1931 chapter, show a reservoir still filling: drowned stump fields, a raw bare-earth line, and sawmill debris.
- **Dam look:** a linear concrete gravity dam with a vertical upstream face. Ten tainter spillway gates on the south half. On the north, a powerhouse of concrete, steel, brick and glass with "a few basic art deco elements." A lighted walkway along the crest and a locomotive crane on top — [GA0078](https://arkansasheritage.com/docs/default-source/national-registry/ga0078-pdf).
- **[conflict] Dam size:** 115 ft high × 1,165 ft long ([EOA](https://encyclopediaofarkansas.net/entries/carpenter-dam-4731/)) vs. ~100 × ~1,000 ft ([Wikipedia](https://en.wikipedia.org/wiki/Lake_Hamilton_and_Lake_Catherine)).
- **Size:**
  - 7,200 acres (EOA; Wikipedia); 18.5 mi long ([Entergy 2004 newsletter](https://cdn.entergy.com/userfiles/content/operations_information/hydro/pdfs/2004_Summer_Life_on_the_Lakes.pdf), via search summary).
  - **[conflict] Shoreline:** ~200 mi ([arkansas.com](https://www.arkansas.com/hot-springs/outdoor-recreation/lake-hamilton); [Visit Hot Springs](https://hotsprings.org/curated-itineraries/weekend-trip/lake-getaway/)) vs. ~80 mi **[UNVERIFIED]** in corpus `geography-lakes-mountains.md` vs. 300 mi in a 2026 guide that also says 7,460 acres.
- **Later development:**
  - The lake drew "resorts, restaurants, motels, and water sport facilities" ([Wikipedia](https://en.wikipedia.org/wiki/Lake_Hamilton_and_Lake_Catherine)) and "housing developments, especially condominiums" ([EOA](https://encyclopediaofarkansas.net/entries/carpenter-dam-4731/)). No dates are given.
  - The Fish Hatchery is on the south shore; floods came in 1982 and 1990 (EOA).
  - **[inferred]** Phasing: fishing camps and boat docks in the 1940s–50s; lake homes and condos from the 1970s, densest in the 2000s.
- **Red clay shoreline:** not sourced; mark it **[inferred]**.

---

## 6. Farm life in Garland County

| Item | Fact | Source |
|---|---|---|
| Land | "About half of the county could be farmed, while the other half is quite mountainous" | [Humphreys' Dairy NRHP nom. GA0858](https://www.arkansasheritage.com/docs/default-source/national-registry/GA0858-pdf) |
| Cattle | 4,672 in the 1880 census; 12,844 in 1950, of which 4,696 were milk cows | same |
| Crops | Small rocky farms of wheat, corn and cattle; a water-powered corn mill; charcoal, stave and shingle mills | corpus `history-timeline.md` → [EOA Whittington](https://encyclopediaofarkansas.net/entries/whittington-garland-county-10724/) |
| Cotton | No source ties cotton to Garland County. Treat it as minor or absent **[inferred]** | corpus `history-timeline.md` |
| Selling to town | Twice-weekly trips to town with milk, chickens, eggs, sausage from home-raised hogs and vegetables. The wife baked cakes for Hot Springs hotels. Surplus milk went to families and hotels | GA0858 |
| Dogtrot (c.1866) | Gillham House, near Royal: a one-story **pine-log dogtrot**, half- and center-notched pens, side-gable roof, shed porch across the front, massive stone chimneys. The hall was later boarded in with vertical planks | [Gillham House NRHP nom. GA0045](https://www.arkansasheritage.com/docs/default-source/national-registry/GA0045-pdf) |
| Clearing a farm | The dairy founder set up a sawmill to clear the land, then built from the lumber and locally quarried stone. The first house was "a dog-trot plan two-room log house" | GA0858 |
| Single pen | A one-story cabin with a stone chimney on one side, expanded when the family could afford it (Ozark entry; regional) | [EOA Ozark Vernacular Architecture](https://encyclopediaofarkansas.net/entries/ozark-vernacular-architecture-4699/) |
| 1920s–30s farmhouse | c.1920 **Craftsman** 1½-story farmhouse with a shed dormer, fieldstone porch piers and chimney, **green asphalt shingles** | GA0858 |
| Barn and dairy | A **gambrel barn** with a mortared fieldstone lower story and wood clapboard gambrel. The c.1930 dairy plant has stucco over boards, corrugated or standing-seam metal roofs, and lightning rods | GA0858 |
| Box house, 1950s ranch | Not sourced locally. **[inferred]** A board-and-batten box house for 1871–1886; a brick or asbestos-shingle ranch for 1955 | — |
| Fences | Barbed wire was patented 1874 **[inferred]** for local adoption from the 1880s; split-rail before that. No Garland County stock-law date found | [Wikipedia: Barbed wire](https://en.wikipedia.org/wiki/Barbed_wire) |
| Tools | **[inferred]** Mule and walking plough through 1931. A small tractor or tiller and a pickup by 1955. A compact tractor or UTV in 2026 | general |

**Farmhouse by chapter [inferred from the rows above]:** 1807 single-pen log cabin; 1871 dogtrot log house; 1886 dogtrot with a frame addition or a board-and-batten box house; 1931 Craftsman bungalow with a gambrel barn; 1955 the same plus a ranch addition and a dairy shed; 2026 a restored farmhouse or a lake-style metal-roof home.

---

## 7. Clothing silhouettes (fictional townsfolk)

General Western fashion, applied to Hot Springs **[inferred]**.

| Chapter | Men | Women | Workers |
|---|---|---|---|
| 1807 | Linen hunting shirt or frock, breeches or trousers, round or felt hat; gentry in a tailcoat | High-waisted (Empire) gown, short-gown and petticoat on the frontier | Trappers in buckskin and wool. Enslaved workers were present in the resort economy; depict with care (corpus) |
| 1871 | Sack coat or frock coat, vest, wide-brim hat | First bustle period: draped back fullness, fitted bodice | Shirt, suspenders, wool trousers, slouch hat; bath attendants are mentioned from 1875 |
| 1886 | Three-piece "ditto"/sack suit, bowler or soft felt hat; top hat for formal wear | Peak bustle c.1886–88 sticking straight out behind, tight corseted bodice | Corduroy or fustian jacket and waistcoat |
| 1931 | Single-breasted suit with wide lapels, fedora or summer boater | Bias-cut, longer hems below the knee, cloche fading into small brimmed hats | Overalls and chambray; white attendant uniforms **[inferred]** |
| 1955 | Gray flannel suit, narrow tie, short-brim hat; aloha or sport shirt at the lake | New Look: fitted waist with a full or pencil skirt; capris at the lake | Work-wear cottons; dairy whites |
| 2026 | Casual: tees, shorts, fleece | Athleisure, sundresses | Hi-vis vests, ball caps |

Sources:
- [Wikipedia: 1795–1820 in Western fashion](https://en.wikipedia.org/wiki/1795%E2%80%931820_in_Western_fashion)
- [1870s](https://en.wikipedia.org/wiki/1870s_in_Western_fashion)
- [1880s](https://en.wikipedia.org/wiki/1880s_in_Western_fashion) (bustle "greatest proportions c. 1886–1888"; "ditto suits"; bowlers)
- [1930–1945](https://en.wikipedia.org/wiki/1930%E2%80%931945_in_Western_fashion)
- [1945–1960](https://en.wikipedia.org/wiki/1945%E2%80%931960_in_Western_fashion)
- Attendants (from 1875) and slavery: corpus `bathhouse-row-and-springs.md`

---

## 8. Palette notes per chapter (hex est.)

These build on the corpus palettes P1–P8 in `visual-style-guide.md`. The thermal-water palette (P2) applies in every chapter.

| Chapter | Plain words | Suggested hexes | Basis |
|---|---|---|---|
| 1807 | Dark pine and oak; gray tufa slopes bare of trees; white novaculite; steam; brown creek gravel | pine #2F4A2C, oak #5C7A3A, tufa #9A968C, novaculite #EDEAE2, gravel #A08A6A, steam #F4F6F5 @40% | P1/P2; [Weed 1902](https://npshistory.com/publications/hosp/haywood-weed/sec9.htm) |
| 1871 | Unpainted board-and-batten, whitewash, mud street, open brown creek, emerald algae at the outflows | board #A58A64, whitewash #EFE8DA, mud #7B6248, creek #6E6A60, algae #2F8F5B | P3; Central Ave HD nomination |
| 1886 | Red-brown brick, gray pressed-metal cornices, a white frame hotel, black iron, striped canvas awnings, iron-gray "Big Iron" | brick #9E4A35, cornice #8C8C86, hotel white #EFE8DA, iron #1F2A24, awning #B8504A / #EFE8DA | nomination; [CLI](https://npshistory.com/publications/hosp/cli-bathhouse-row.pdf) |
| 1931 | Cream brick, white stucco, red tile, magnolia green, limestone; saturated **linen-postcard** skies | P4 + P6: cream #E6D7B5, tile #A9432C, magnolia #2F4F2F, sky #2F7FC6 | linen postcards 1930s–50s, corpus → [Collectors Weekly](https://collectorsweekly.com/postcards/linen) |
| 1955 | **Kodachrome**: deep blues, punchy reds, warm skin; turquoise and coral motor courts; new lake blue | sky #3A7CC3, Kodachrome red #C8312B, turquoise #3FBFB5, coral #F26B5B, lake #2E6E8E | Kodachrome from 1935, [Wikipedia](https://en.wikipedia.org/wiki/Kodachrome); P7 **[inferred]** |
| 2026 | Restored brick, clean stucco, LED white nights, lake blues, redbud and dogwood | P8: lake #1E4E79, brick #B5654A, redbud #B5568F, LED #F2F5FF | P8 |

---

## Facts worth adding to the shared corpus (new, sourced)

1. Gulpha Creek empties into **Lake Catherine** (34.4722, -92.9864), not Lake Hamilton; about 6.4 mi of named channel along the east side of North and Hot Springs Mountains — [OSM way 250880954](https://www.openstreetmap.org/way/250880954); [GNIS 77086](https://arkansas.hometownlocator.com/maps/feature-map,ftc,1,fid,77086,n,gulpha%20creek.cfm).
2. Coordinates: Gulpha Gorge Campground 34.52689, -93.03618; North Mountain peak 34.52648, -93.04157 (344 m); Sugarloaf 34.52037, -93.08213 (348 m) — OSM (fills gaps listed in `geography-lakes-mountains.md`).
3. 1874 Central Avenue: board-and-batten frame buildings with false fronts and shed porches. Late-1880s blocks: two-story brick with pressed-metal cornices and canvas awnings — [Central Ave HD nomination](https://npgallery.nps.gov/GetAsset/18195d15-bdf3-4b67-b1de-fe40609ce075).
4. 1884: the creek was covered and the road in front of the bathhouses paved, with trees and paved sidewalks (nomination). The CLI gives 1884–86 for a "rock masonry arch culvert."
5. Street lighting: four iron gas lamps by 1897; fifteen ornamental electric standards in 1914; twenty five-globe cluster lights by 1929; trolley tracks buried under Central's pavement — [CLI](https://npshistory.com/publications/hosp/cli-bathhouse-row.pdf).
6. "Big Iron" ironclad bathhouse 1883; first Arlington a white frame building; Army and Navy Hospital red brick 1887 — CLI.
7. Weed 1902 tufa wording: "dark-gray and porous," "barren gray," "creamy alabaster-like," emerald-green where algae grow; no Mammoth-style basins — [npshistory sec8/sec9](https://npshistory.com/publications/hosp/haywood-weed/sec9.htm).
8. Carpenter Dam work camp (~1,000 men in 1929); lumber and gravel from the lake bed; ten tainter gates; Art Deco touches on the powerhouse — [GA0078](https://arkansasheritage.com/docs/default-source/national-registry/ga0078-pdf).
9. Lake Hamilton shoreline ~200 mi (arkansas.com) vs. the corpus's unverified ~80 mi; length 18.5 mi (Entergy 2004).
10. Garland County agriculture: half the county farmable; cattle 4,672 (1880) → 12,844 (1950); a farm selling milk, eggs, sausage and cakes to hotels — [GA0858](https://www.arkansasheritage.com/docs/default-source/national-registry/GA0858-pdf). Gillham House c.1866 pine-log dogtrot — [GA0045](https://www.arkansasheritage.com/docs/default-source/national-registry/GA0045-pdf).
11. Park Avenue tourist courts: Cove c.1937 (International Style stucco), Parkway 1943, Lynwood c.1944 (NRHP 2004) — Wikipedia.

**Still unsourced:** Central Avenue paving material, 1884–1930s; gas-lighting start date; sodium and LED conversion dates; Lake Hamilton gate-closure and full-pool dates; Gulpha bottom soil series; canebrakes on Gulpha Creek; Central Avenue neon in the 1930s–50s.
