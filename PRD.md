# Valley of Vapors: Through the Ages — PRD

## 1. Vision
An original top-down farming and life sim on one piece of land in the Hot Springs valley, played across
six chapters from 1807 to 2026. Each chapter is a new generation of the fictional Vale family on the same
creek-bottom farm beside Gulpha Creek. The valley is redrawn in each era's palette; the town grows from
health-seeker huts to Bathhouse Row to a restored national-park downtown; crops, tools, buyers and
neighbors change with it. Every chapter ends with a short, sourced history card.

**Pillars**
1. **A solid daily loop first:** till, plant, water, harvest, ship, sleep — readable and satisfying on a
   phone as well as a laptop.
2. **Same valley, different century:** the map, palette, buildings, crops and tools visibly change, and
   the player feels the town growing around their farm.
3. **History told straight:** sourced facts on cards with sources; legends labelled; invented people and
   game prices labelled as game content; sensitive history stated factually and never gamified.
4. **Finishable:** about 15–25 in-game days per chapter, 5 clear goals per chapter.

**Players:** casual players who like cozy sims; local-history fans; families (all-ages content).

## 2. Modes
- **Story** (default): chapters 1→6 in order. The player turns the era when that chapter's 5 goals are
  done (and may stay longer).
- **Free play** after Chapter 6: the game continues in 2026 with all systems.
- **Chapter select** (unlocked per save after reaching a chapter): replay any reached chapter's map in
  free play without affecting the story save. *(Kept small: it loads that chapter with starter money.)*

## 3. Rules
Complete rules are in `MECHANICS.md` (time, calendar, weather, tiles, tools, energy, crops, foraging,
fishing, livestock, inventory, crafting, shops, NPCs, quests, saves). Numbers that matter for balance
are in §9 and in `src/js/sim/data.js`.

## 4. Content map (era by era)

Fact ids refer to `data/facts.json` (audited bank). Characters are fictional; all prices are game prices.

### Chapter 1 — Steam Valley (1807) · palette `ouachita-forest`
- **Map:** forest valley; no town. A trader's camp by the creek, two health-seeker huts near the springs,
  a hot pool to soak in, a cold seep, novaculite outcrops on the north ridge, the heritage quarry sign.
- **Crops:** corn, beans, squash, Washita radish. **Forage:** wild greens, pine knots, hickory nuts,
  acorns. **Fish (creek):** bream, channel catfish, gar.
- **Cast:** Josiah Crane (trapper who rents out a cabin), Margaux Delacroix (river trader; runs the
  shop), Ezra Pell (health seeker).
- **Goals:** Break ground (plant 9); First harvest (ship 50 crops); Razor stone (craft a whetstone);
  A hut for the ailing (build a rental hut from 50 wood + 20 stone; Ezra rents it); The trader's order
  (10 corn + 4 squash + 5 fish).
- **Optional:** Read the springs (1804 card), The old quarry (heritage sign), Friend of the creek.
- **Closing card:** hs-0008, hs-0007, hs-0001, hs-0473.

### Chapter 2 — The Reservation (1871) · `frontier-valley`
- **Map:** Valley Street with two rows of plank hotels and bathhouses, a store, a stage stop, the water
  mill on the creek, a cold spring (bottling), a cow pen on the farm.
- **Crops:** corn, wheat, potatoes, beans, cabbage. **Livestock:** cow (milk). **Timber goods:** staves,
  shingles, charcoal.
- **Cast:** Corinna Bell (boardinghouse), Amos Thorne (stage driver), Lucius Greer (druggist and would-be
  bottler).
- **Goals:** Grist for the mill (10 cornmeal to Corinna); Shingles for Valley Street (20 shingles to
  Amos); A milk cow (collect 10 milk); Cold water (6 cold jugs to Lucius); Earn $3,000 this chapter.
- **Closing card:** hs-0011, hs-0058, hs-0016, and the 1860 enslaved-labor census line (HT, card text
  with source).

### Chapter 3 — Golden Age of the Row (1886) · `gilded-spa`
- **Map:** Central Avenue, a grand brick hotel, plank and brick bathhouses, the depot, a ballfield, a
  magnolia promenade, the Free Bathhouse.
- **Crops:** tomatoes, strawberries, cabbage, wheat, potatoes. **Livestock:** cow.
- **Cast:** Augustin Duval (hotel chef), Hattie Coleman (bath attendant), Walt Brennan (ballclub trainer).
- **Goals:** The hotel table (10 tomatoes + 5 strawberries); Training table (6 milk + 6 cabbage to Walt);
  Hot water route (5 hot jugs to Hattie); Brick by brick ($800 + 20 stone at the store); Hattie's trust
  (3 hearts).
- **Closing card:** hs-0026, hs-0030, hs-0062, hs-0020.

### Chapter 4 — The Open Town (1931) · `linen-postcard` day / `deco-neon` night
- **Map:** the full Row, a twin-tower hotel, a radio mast, a tourist court, club neon; the south bottoms
  are now Lake Hamilton (bigger fishing water).
- **Crops:** sweet potatoes, peppers, peanuts, tomatoes. **Livestock:** goats (goat milk).
- **Cast:** Ora Fenwick (tourist court), Sal Romano (croupier, out at night), June Talley (radio).
- **Goals:** The lake fills (3 largemouth bass); Tourist-court supper (6 goat milk + 6 sweet potatoes);
  Farm report (a basket of 4 different crops to June); Late supper (8 peppers to Sal after 20:00);
  Earn $3,000 this chapter.
- **Closing card:** hs-0038, hs-0035, hs-0308, hs-0311.

### Chapter 5 — Mid-Century (1955) · `motor-hotel`
- **Map:** a motor-hotel slab with a covered deck, a drive-in, an animal-show barn, the bathhouses (some
  quiet), a bigger lake.
- **Crops:** sweet corn, okra, watermelon, peanuts. **Livestock:** hens (eggs). **Tool:** garden tiller.
- **Cast:** Lorraine Pace (motor hotel), Dr. Nell Ambry (animal trainer), Rusty Cole (farmer relocated
  from a flooded valley).
- **Goals:** Roadside stand (build the stand); Motel breakfast (12 eggs + 6 sweet corn); Training corn
  (10 sweet corn to Dr. Ambry); New neighbors (5 watermelons to Rusty); Lake day (catch 3 species).
- **Closing card:** hs-0089, hs-0044, hs-0047, hs-0049; bridge: hs-0100, hs-0050, hs-0096.

### Chapter 6 — Today (2026) · `lake-life`
- **Map:** the restored Row (brewery, spa, cultural center, hotel), a farmers' market, Bridge Street,
  lake docks, mountain-bike trailhead.
- **Crops:** heirloom tomatoes, hops, wheat, blueberries, tulips. **Livestock:** hens. **Tool:** drip line.
- **Cast:** Priya Natarajan (brewer), Marcus Bell (market manager), Jo Tanaka (tub-race captain).
- **Goals:** Thermal brew (10 hops + 10 wheat); Market day (20 produce to Marcus); Running of the Tubs
  (craft the race tub for Jo); Restoration fund (donate $2,000); Good neighbors (3 hearts with two people).
- **Closing card (finale):** hs-0051, hs-0148, hs-0145, hs-0512; then credits and free play.

**Cross-chapter:** spring facts at the hot pool (hs-0147, hs-0146, hs-0156, hs-0151, hs-0157); the
Almanac collects every card read.

## 5. Screens and UX flow
Title (New game · Continue · Chapter select · Settings · Help · About) → opening card → play.
In play: HUD (date, time, weather icon, money, energy bar + number, quest tracker, hotbar), with buttons
for Menu and Journal. Panels: Inventory/Crafting, Shop (buy/sell), Journal (Goals · Quests · People ·
Almanac), Settings, Help (controls, how to farm, game-content note), Pause (Resume · Save · Settings ·
Title). Overlays: dialogue box (portrait, name, text, choices), morning summary (shipped items, earnings,
weather), history card (facts + sources), era wipe, toasts (live region).

## 6. Art direction
Procedural Canvas art, palettes pasted from `shared/design/tokens.css` (`ERA_PALETTE` mapping above),
motifs from `research/visual-style-guide.md` (log cabin, plank bathhouse, cream brick and red tile,
Deco chevrons and neon, motor-hotel slab and starbursts, restored brick and lake blues). Tufa, steam and
algae colors from the thermal-water palette. People are chunky 1 × 1.5-tile figures with era clothing
colors, a dark outline and a name tag when near, readable at 34 px tiles. Ripe crops carry a ring
badge; watered soil a droplet; quest-givers a "!" bubble — shape and label, never color alone.

## 7. Audio
WebAudio synthesized: till thud, water splash, chop, pick clink, pickup, coin, cast/bite/catch, door,
era chime, soft morning bird. Quiet by default (master 0.5), mute toggle, volume slider. No music loop
(known gap: a human hasn't listened).

## 8. Accessibility and input
- **Keyboard:** WASD/arrows move; Space/J use; E/K talk/interact; F eat; 1–8 hotbar; Q/R cycle hotbar; I/Tab
  inventory; L journal; Esc pause/close; Enter confirms dialogue. **Every binding is rebindable** in
  Settings (saved).
- **Mouse:** click a tile within reach to use; click hotbar slots, panels and buttons.
- **Touch:** on-screen pad (8-way, left), A (use) and B (talk/interact) buttons (right), tappable hotbar
  and HUD buttons; tap a tile within reach to use it. All touch targets ≥ 44 px.
- **Text size** 100 / 125 / 150%; **reduced motion** (no steam drift, no camera easing, instant era
  wipe, no screen shake); **high-contrast HUD** option; fishing **timing assist**; live region for
  toasts. Text contrast ≥ 4.5:1 on every panel (checked by test).

## 9. Balance targets (checked by `tools/balance.mjs`)
The bot plays without walking (a time cost per action instead), so a person takes longer; the day
counts below are for the bot. Results are in REPORT.md.
| Metric | Target band |
|---|---|
| Chapter 1 income per day, steady strategy, days 3–14 | $40–$160 |
| Income per day, steady strategy, chapter 6 | $250–$900 |
| Days to finish each chapter's goals, steady strategy | 12–28 |
| Days to finish all six chapters, steady strategy | 90–150 |
| Best crop profit per tile-day ÷ median crop, per chapter | ≤ 1.8 |
| Energy used on a full farm day (steady strategy) | 70–100% |
| Forage-and-fish-only strategy income ÷ crops-only strategy (mean of chapters) | 35–80% |
| Days a player can't afford seeds (starting cash, steady) | 0 |

## 10. Performance and budgets
60 fps on a mid-range laptop (headless 1280×800 and 390×844 both ≥ 55 fps in tests), `index.html`
under 2 MB (target < 400 KB), hooks ready in under 2 s (target < 300 ms), JS heap under 40 MB, zero
network requests, zero console errors.

## 11. Save and load
Autosave every morning; manual save in the pause menu; Continue on the title. Versioned format with
migrations (`MECHANICS.md` §10). The game works with storage blocked (a toast explains saves are off).

## 12. Acceptance criteria
| # | Feature | Criterion |
|---|---|---|
| AC1 | Title | Title shows New game, Continue (disabled without a save), Chapter select, Settings, Help, About; hooks ready < 2 s |
| AC2 | Help/About | Help lists controls for keyboard, mouse and touch and says prices/people are game content; About credits sources and samples |
| AC3 | Layout | No horizontal overflow or off-screen controls on any screen at both viewports |
| AC4 | Movement & collision | Arrow/WASD moves the player; walls and water block; diagonal works; player can't leave the map |
| AC5 | Tilling | Hoe on grass/dirt in the field tills; costs energy; not on paths/water/buildings |
| AC6 | Planting & watering | Seeds plant only on tilled soil in season; watering marks soil (droplet); jug empties and refills at water |
| AC7 | Growth & harvest | Watered crops advance one stage a day; ripe crops show a badge; harvest adds the crop; regrow crops regrow |
| AC8 | Seasons | Out-of-season crops wilt at the season change; seasons rotate every 7 days; year label advances after 28 |
| AC9 | Day/night & sleep | Clock runs 06:00→02:00; night overlay with lamps; sleeping ends the day, autosaves and shows the summary; collapsing at 02:00 costs cash |
| AC10 | Weather | Rain waters crops; snow and fog appear; daily weather is deterministic for a seed |
| AC11 | Energy | Tools cost energy; low energy slows; 0 energy blocks tools; food and soaks restore |
| AC12 | Shipping & economy | Bin items are paid overnight at listed prices; morning summary totals them |
| AC13 | Shops | Buy and sell with quantity; can't overspend; store hours enforced |
| AC14 | Inventory & hotbar | 24 slots, stacks to 99, hotbar 1–8 by key, click and tap; items can be moved |
| AC15 | Crafting | Recipes consume ingredients and produce items; whetstone lowers tool costs |
| AC16 | Foraging & resources | Forage spawns by season; trees/rocks/outcrops yield wood, stone, novaculite; regrowth |
| AC17 | Fishing | Cast, bite window, catch by water/chapter/season; miss when late; timing assist widens the window |
| AC18 | Livestock | Buy an animal; fed animals produce daily; petting raises happiness |
| AC19 | NPC schedules | NPCs move between scheduled places by time; go home at night |
| AC20 | Friendship & dialogue | Talking and gifts change hearts once a day; lines vary by hearts/season; gift reactions |
| AC21 | Quests | Quests track progress, complete on delivery, pay rewards; journal lists them |
| AC22 | Era goals & turn | When 5 goals are done the era can be turned at bedtime; history card shows sourced facts with sources |
| AC23 | Era changes | After a turn the palette, buildings, cast, crops, shop, tools, house and livestock all match the new chapter |
| AC24 | All six chapters | Each chapter loads, renders and can be completed (goals satisfiable with its own items) |
| AC25 | Facts | Every displayed history fact is in `data/facts.json`, matches the audited bank, shows its source (`check-facts.mjs` passes); legends are labelled |
| AC26 | Save/load | Autosave and manual save restore the full state after reload; old versions migrate; storage blocked still plays |
| AC27 | Determinism | Same seed + same inputs → same state after N ticks |
| AC28 | Keyboard rebinding | A rebound key works in play and persists after reload |
| AC29 | Text size | 125% and 150% scale the HUD and panels without overflow |
| AC30 | Reduced motion | No steam drift, camera easing or wipe animation under reduced motion |
| AC31 | Touch | On-screen pad moves, A uses, B talks; a full till→plant→water loop works by touch; targets ≥ 44 px |
| AC32 | Real-input loop | Keyboard-only (no setState) tills, plants, waters, sleeps, harvests |
| AC33 | Contrast | Text in HUD and panels ≥ 4.5:1 in every chapter palette |
| AC34 | Readability on phones | Player, NPCs and crops are ≥ 30 CSS px tall/wide at 390 px wide; name tags legible |
| AC35 | Performance | ≥ 55 fps both viewports; heap < 40 MB; HTML < 2 MB; ready < 2 s; no external requests; no console errors |
| AC36 | Balance | `tools/balance.mjs` results inside §9 bands, outliers named |
| AC37 | Audio | Sounds play on actions, mute and volume persist |
| AC38 | Live region | Toasts (harvest, quest done, era turn) are announced in an aria-live region |

## 13. Out of scope
Multiplayer; marriage/romance (the cast is all-ages friendship only); combat or mines with monsters;
seasonal festivals as playable minigames (they appear as days with dialogue and cards); animal
slaughter; music tracks; real historical figures as characters; a world bigger than one valley map;
controller support beyond keyboard/mouse/touch.
