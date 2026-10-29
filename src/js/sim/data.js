// Game data: chapters, crops, items, recipes, shops, fish, people, quests.
// Everything here is game content (invented) unless a line carries a `fact` id, which points into
// data/facts.json (audited, sourced). tools/check-facts.mjs scans this file.

export const SEASONS = ['sp', 'su', 'fa', 'wi'];
export const SEASON_NAME = { sp: 'Spring', su: 'Summer', fa: 'Fall', wi: 'Winter' };
export const DAYS_PER_SEASON = 7;
export const YEAR_DAYS = 28;
export const DAY_START = 360;   // 06:00, minutes since midnight
export const DAY_END = 1560;    // 02:00 next day
export const TICKS_PER_MIN = 15;
export const MAX_ENERGY = 100;

// ---------- chapters ----------
export const CHAPTERS = [null,
  { n: 1, title: 'Steam Valley', year: 1807, corpus: 'ancient · frontier', pal: 'ouachita-forest',
    house: 'cabin', animal: null, lake: false, light: 'fire', tier: 1, street: 'trail',
    startMoney: 150, kit: [['seed:radish', 12], ['seed:corn', 6]],
    who: 'Ada Vale', look: { shirt: '#a8473a', pants: '#4a3a2a', hat: 'bonnet', hair: '#3b2a1c', skin: 2 }, // madder-red linsey and a straw sunbonnet
    intro: [
      'Spring, 1807. Ada Vale poles a flatboat up the Ouachita, past the creek where the 1804 explorers camped, and follows the warm stream that runs down from the springs. Steam rises from the hillside to the east.',
      'There is no town yet: a trader\'s camp, a trapper\'s cabin, and a few huts where sick travelers soak in the hot water. The creek bottom is good, rocky ground. It is yours to work.',
    ],
    introFacts: ['f-calfait', 'f-prudhomme'],
    closing: ['f-quapaw-1818', 'f-belding', 'f-reservation', 'f-first-reservation'] },
  { n: 2, title: 'The Reservation', year: 1871, corpus: 'frontier', pal: 'frontier-valley',
    house: 'plank', animal: 'cow', lake: false, light: 'lantern', tier: 1, street: 'dirt',
    startMoney: 200, kit: [['seed:wheat', 10], ['seed:corn', 6]],
    who: 'Caleb Vale', look: { shirt: '#8e3b2b', pants: '#3a3a44', hat: 'brim', hair: '#2a2420', skin: 2 },
    intro: [
      'Spring, 1871. The springs belong to the federal reservation, and claimants have fought over title for decades. Valley Street now runs between two rows of plank hotels and bathhouses.',
      'Caleb Vale, Ada\'s grandson, works the same creek-bottom farm. There is a mill on the creek, a stage to Malvern, and a town that buys what it cannot grow.',
    ],
    introFacts: ['f-yellowstone', 'f-new-madrid'],
    closing: ['f-garland-county', 'f-arlington-1875', 'f-malvern-rail', 'f-enslaved-1860'] },
  { n: 3, title: 'Golden Age of the Row', year: 1886, corpus: 'gilded-spa', pal: 'gilded-spa',
    house: 'brickless', animal: 'cow', lake: false, light: 'gas', tier: 2, street: 'gravel',
    startMoney: 300, kit: [['seed:strawberry', 6], ['seed:potato', 8]],
    who: 'Nora Vale', look: { shirt: '#2b4c9b', pants: '#2a2a33', hat: 'bonnet', hair: '#5a3a22', skin: 2 },
    intro: [
      'Spring, 1886. The railroad has come, and Valley Street is Central Avenue. Grand hotels need fresh food, bathers come by the trainload, and a ballclub has arrived for spring training.',
      'Nora Vale sells to the hotel kitchens. The town has burned before; folks say a brick house is a safe house.',
    ],
    introFacts: ['f-white-stockings', 'f-baden-baden'],
    closing: ['f-fire-1913', 'f-shingle-ban', 'f-buckstaff', 'f-free-baths-1919'] },
  { n: 4, title: 'The Open Town', year: 1931, corpus: 'roaring', pal: 'linen-postcard', night: 'deco-neon',
    house: 'bungalow', animal: 'goat', lake: true, light: 'neon', tier: 2, street: 'paved',
    startMoney: 500, kit: [['seed:sweetpotato', 6], ['seed:pepper', 6]],
    who: 'Ray Vale', look: { shirt: '#c8452b', pants: '#1f2f5c', hat: 'fedora', hair: '#1f1a16', skin: 2 },
    intro: [
      'Spring, 1931. A new dam has backed the creek bottoms into a lake. The Row is finished, a radio station sings from a hotel roof, and the clubs on Central Avenue never seem to close.',
      'Ray Vale keeps goats and a truck garden, and sells to a tourist court on the highway.',
    ],
    introFacts: ['f-carpenter-dam', 'f-lamar'],
    closing: ['f-redistribution', 'f-polio', 'f-mcmath', 'f-mclaughlin'] },
  { n: 5, title: 'Mid-Century', year: 1955, corpus: 'midcentury', pal: 'motor-hotel',
    house: 'ranch', animal: 'hen', lake: true, light: 'sodium', tier: 3, street: 'asphalt',
    startMoney: 800, kit: [['seed:sweetcorn', 8], ['seed:okra', 6]],
    who: 'June Vale', look: { shirt: '#3fbfb5', pants: '#34424a', hat: 'none', hair: '#3b2a1c', skin: 2 },
    intro: [
      'Spring, 1955. Motor hotels line the avenue, a trained-animal show draws families, and a new dam upriver has flooded whole farm communities.',
      'June Vale keeps hens and plans a roadside stand for the tourists driving by.',
    ],
    introFacts: ['f-blakely', 'f-breland'],
    closing: ['f-fordyce-1962', 'f-rail-1964', 'f-desegregated', 'f-1967', 'f-register-1974', 'f-baths-1979', 'f-visitor-center'] },
  { n: 6, title: 'Today', year: 2026, corpus: 'modern', pal: 'lake-life',
    house: 'restored', animal: 'hen', lake: true, light: 'led', tier: 4, street: 'brick',
    startMoney: 1200, kit: [['seed:hops', 4], ['seed:wheat', 10]],
    who: 'Sam Vale', look: { shirt: '#f2a541', pants: '#1e4e79', hat: 'cap', hair: '#2a2420', skin: 2 },
    intro: [
      'Spring, 2026. The bathhouses that closed one by one have found new lives: a brewery, a spa, a hotel, a cultural center. Downtown has a farmers\' market and a bathtub race.',
      'Sam Vale farms the old creek-bottom land with a drip line and sells to people who want to know where their food was grown.',
    ],
    introFacts: ['f-superior', 'f-quapaw-spa'],
    closing: ['f-majestic-fire', 'f-47-springs', 'f-4400-years', 'f-great-american-spa'] },
];

// ---------- crops (all numbers are game numbers) ----------
// ic: icon shape + colors. seasons: when it grows. days: to ripe. regrow: days to ripe again.
export const CROPS = {
  radish:     { name: 'Washita radish', seasons: ['sp', 'fa'], days: 3, regrow: 0, seed: 4, sell: 10, ch: [1], ic: ['root', '#d8506a', '#5c8a3a'] },
  corn:       { name: 'Corn', seasons: ['sp', 'su'], days: 6, regrow: 0, seed: 7, sell: 21, ch: [1, 2], ic: ['cob', '#e8c84a', '#6a9a3a'] },
  beans:      { name: 'Beans', seasons: ['sp', 'su'], days: 4, regrow: 2, seed: 10, sell: 7, ch: [1, 2], ic: ['pod', '#6aa84a', '#3a6a2a'] },
  squash:     { name: 'Squash', seasons: ['su', 'fa'], days: 5, regrow: 0, seed: 10, sell: 26, ch: [1], ic: ['gourd', '#e09a2a', '#6a8a3a'] },
  wheat:      { name: 'Wheat', seasons: ['sp', 'fa'], days: 4, regrow: 0, seed: 8, sell: 22, ch: [2, 3, 6], ic: ['grain', '#d8b25a', '#a8823a'] },
  potato:     { name: 'Potato', seasons: ['sp'], days: 5, regrow: 0, seed: 14, sell: 36, ch: [2, 3], ic: ['root', '#b08a5a', '#5c8a3a'] },
  cabbage:    { name: 'Cabbage', seasons: ['sp', 'fa'], days: 6, regrow: 0, seed: 18, sell: 48, ch: [2, 3], ic: ['head', '#8ac46a', '#4a7a3a'] },
  tomato:     { name: 'Tomato', seasons: ['su', 'fa'], days: 6, regrow: 3, seed: 24, sell: 26, ch: [3, 4], ic: ['round', '#d8402a', '#3a7a2a'] },
  strawberry: { name: 'Strawberry', seasons: ['sp'], days: 5, regrow: 3, seed: 30, sell: 28, ch: [3], ic: ['berry', '#e0303a', '#3a8a3a'] },
  sweetpotato:{ name: 'Sweet potato', seasons: ['su', 'fa'], days: 6, regrow: 0, seed: 22, sell: 60, ch: [4], ic: ['root', '#c8602a', '#5c8a3a'] },
  pepper:     { name: 'Pepper', seasons: ['su', 'fa'], days: 5, regrow: 3, seed: 26, sell: 24, ch: [4], ic: ['pepper', '#d8302a', '#3a7a2a'] },
  peanut:     { name: 'Peanuts', seasons: ['sp', 'su'], days: 6, regrow: 0, seed: 20, sell: 56, ch: [4, 5], ic: ['nut', '#c8a06a', '#7a5a3a'] },
  collards:   { name: 'Collard greens', seasons: ['fa', 'wi', 'sp'], days: 5, regrow: 0, seed: 16, sell: 46, ch: [4, 5], ic: ['leaf', '#3a8a4a', '#2a5a2a'] },
  sweetcorn:  { name: 'Sweet corn', seasons: ['sp', 'su'], days: 6, regrow: 0, seed: 24, sell: 74, ch: [5], ic: ['cob', '#f0d860', '#6a9a3a'] },
  okra:       { name: 'Okra', seasons: ['su'], days: 4, regrow: 2, seed: 30, sell: 22, ch: [5], ic: ['pod', '#5a9a4a', '#2a6a2a'] },
  watermelon: { name: 'Watermelon', seasons: ['su'], days: 6, regrow: 0, seed: 50, sell: 115, ch: [5], ic: ['melon', '#3a8a3a', '#d84a4a'] },
  heirloom:   { name: 'Heirloom tomato', seasons: ['su'], days: 6, regrow: 3, seed: 60, sell: 64, ch: [6], ic: ['round', '#e0702a', '#3a7a2a'] },
  hops:       { name: 'Hops', seasons: ['sp', 'su'], days: 6, regrow: 3, seed: 70, sell: 60, ch: [6], ic: ['cone', '#9acc5a', '#5a8a3a'] },
  blueberry:  { name: 'Blueberries', seasons: ['sp', 'su'], days: 7, regrow: 3, seed: 90, sell: 72, ch: [6], ic: ['berry', '#4a5ab8', '#3a6a3a'] },
  tulip:      { name: 'Tulips', seasons: ['wi', 'sp'], days: 5, regrow: 0, seed: 60, sell: 125, ch: [6], ic: ['flower', '#e04a7a', '#4a8a3a'] },
};
// Game price scale by chapter: an item's listed price is for its first chapter (`base`); later
// chapters pay more for the same thing (wheat in 2026 sells for more than wheat in 1871).
export const CHAPTER_PRICE = [1, 1, 1.4, 1.8, 2.4, 3.2, 4.2];

// ---------- items ----------
// kind: tool | seed | crop | forage | fish | product | material | craft | food | placeable
export const ITEMS = {
  hoe: { name: 'Hoe', kind: 'tool', ic: ['hoe'] },
  jug: { name: 'Watering jug', kind: 'tool', ic: ['jug'] },
  axe: { name: 'Axe', kind: 'tool', ic: ['axe'] },
  pick: { name: 'Pick', kind: 'tool', ic: ['pick'] },
  scythe: { name: 'Scythe', kind: 'tool', ic: ['scythe'] },
  rod: { name: 'Fishing pole', kind: 'tool', ic: ['rod'] },
  wood: { name: 'Wood', kind: 'material', sell: 2, ic: ['log', '#9a6a3a', '#6a4a2a'] },
  stone: { name: 'Stone', kind: 'material', sell: 2, ic: ['stone', '#9a968c', '#6e6a60'] },
  novaculite: { name: 'Novaculite', kind: 'material', sell: 12, ic: ['shard', '#efeae2', '#c99a92'] },
  quartz: { name: 'Quartz crystal', kind: 'material', sell: 40, ic: ['crystal', '#e8f0f8', '#a8c0d8'] },
  hay: { name: 'Hay', kind: 'material', sell: 1, ic: ['grain', '#d8c27a', '#a8925a'] },
  feed: { name: 'Animal feed', kind: 'material', sell: 2, ic: ['bag', '#c8a86a', '#8a6a3a'] },
  hardware: { name: 'Hardware', kind: 'material', sell: 10, ic: ['gear', '#8a8a92', '#5a5a62'] },
  emptyjug: { name: 'Empty jug', kind: 'material', sell: 2, ic: ['bottle', '#c8b89a', '#8a7a5a'] },
  hotwater: { name: 'Hot spring water', kind: 'product', sell: 14, ic: ['bottle', '#2a9d8f', '#f4f2ec'] },
  coldwater: { name: 'Cold spring water', kind: 'product', sell: 18, ic: ['bottle', '#7ab8e0', '#f4f2ec'] },
  greens: { name: 'Wild greens', kind: 'forage', sell: 8, energy: 8, ic: ['leaf', '#5aa84a', '#2a6a2a'] },
  pineknot: { name: 'Pine knot', kind: 'forage', sell: 6, ic: ['log', '#b07a3a', '#6a4a2a'] },
  hickory: { name: 'Hickory nuts', kind: 'forage', sell: 14, energy: 10, ic: ['nut', '#a8784a', '#6a4a2a'] },
  acorn: { name: 'Acorns', kind: 'forage', sell: 6, ic: ['nut', '#8a6a3a', '#5a4a2a'] },
  blackberry: { name: 'Blackberries', kind: 'forage', sell: 12, energy: 10, ic: ['berry', '#3a2a5a', '#3a6a2a'] },
  mushroom: { name: 'Woodland mushroom', kind: 'forage', sell: 16, energy: 8, ic: ['mushroom', '#c8a888', '#8a6a4a'] },
  oakleaf: { name: 'Maple-leaf oak leaf', kind: 'forage', sell: 30, ic: ['leaf', '#c8501f', '#8a3a1a'] },
  milk: { name: 'Milk', kind: 'product', sell: 30, energy: 15, ic: ['bottle', '#f4f2ec', '#c8c8d0'] },
  goatmilk: { name: 'Goat milk', kind: 'product', sell: 44, energy: 15, ic: ['bottle', '#f4f0e0', '#c8c0a8'] },
  egg: { name: 'Egg', kind: 'product', sell: 30, energy: 10, ic: ['egg', '#f4ecd8', '#d8c8a8'] },
  cornmeal: { name: 'Cornmeal', kind: 'craft', sell: 52, energy: 20, ic: ['bag', '#e8d07a', '#a8904a'] },
  shingles: { name: 'Shingles', kind: 'craft', sell: 10, ic: ['plank', '#b88a5a', '#7a5a3a'] },
  staves: { name: 'Barrel staves', kind: 'craft', sell: 16, ic: ['plank', '#a8784a', '#6a4a2a'] },
  charcoal: { name: 'Charcoal', kind: 'craft', sell: 22, ic: ['stone', '#3a3a3a', '#1a1a1a'] },
  whetstone: { name: 'Whetstone', kind: 'craft', sell: 40, ic: ['shard', '#f4f6f5', '#8a8a8a'] },
  tea: { name: 'Spring-water greens tea', kind: 'food', sell: 30, energy: 40, ic: ['cup', '#2a9d8f', '#f4f2ec'] },
  preserves: { name: 'Preserves', kind: 'craft', sell: 120, energy: 25, ic: ['jar', '#c8304a', '#e8e0d0'] },
  cheese: { name: 'Goat cheese', kind: 'craft', sell: 130, energy: 30, ic: ['wedge', '#f0e0a0', '#c8b070'] },
  picnic: { name: 'Picnic lunch', kind: 'food', sell: 40, energy: 60, ic: ['basket', '#b08a5a', '#d8402a'] },
  fence: { name: 'Fence', kind: 'placeable', sell: 1, ic: ['fence', '#9a7a5a', '#6a4a2a'] },
  chest: { name: 'Chest', kind: 'placeable', sell: 10, ic: ['chest', '#9a6a3a', '#d4af37'] },
  sprinkler: { name: 'Sprinkler', kind: 'placeable', sell: 30, ic: ['sprinkler', '#8a8a92', '#4fc3ff'] },
  drip: { name: 'Drip line', kind: 'placeable', sell: 60, ic: ['sprinkler', '#3a3a3a', '#4fc3ff'] },
  hut: { name: 'Rental hut', kind: 'placeable', sell: 0, ic: ['hut', '#a58a64', '#5a4330'] },
  stand: { name: 'Roadside stand', kind: 'placeable', sell: 0, ic: ['stand', '#f26b5b', '#3fbfb5'] },
  tub: { name: 'Race tub', kind: 'craft', sell: 0, ic: ['tub', '#f4f2ec', '#b5654a'] },
};

// Fish: water kinds creek / lake. ch = chapters. sell game prices.
export const FISH = {
  bream: { name: 'Bream', w: ['creek', 'lake'], ch: [1, 2, 3, 4, 5, 6], seasons: SEASONS, sell: 4, p: 5, ic: ['fish', '#c8a040', '#3a6a8a'] },
  catfish: { name: 'Channel catfish', w: ['creek', 'lake'], ch: [1, 2, 3, 4, 5, 6], seasons: ['sp', 'su', 'fa'], sell: 9, p: 3, ic: ['fish', '#7a7a6a', '#4a4a3a'] },
  gar: { name: 'Gar', w: ['creek'], ch: [1, 2, 3], seasons: ['su', 'fa'], sell: 14, p: 1.5, ic: ['fish', '#8a9a6a', '#4a5a3a'] },
  drum: { name: 'Freshwater drum', w: ['creek'], ch: [1, 2, 3], seasons: ['sp', 'su', 'fa', 'wi'], sell: 7, p: 2, ic: ['fish', '#b8b8a8', '#6a6a5a'] },
  bass: { name: 'Largemouth bass', w: ['lake'], ch: [4, 5, 6], seasons: SEASONS, sell: 14, p: 3, ic: ['fish', '#5a8a3a', '#2a4a2a'] },
  crappie: { name: 'White crappie', w: ['lake'], ch: [4, 5, 6], seasons: ['wi', 'sp', 'fa'], sell: 10, p: 3, ic: ['fish', '#d8d8c8', '#5a6a5a'] },
  whitebass: { name: 'White bass', w: ['lake'], ch: [4, 5, 6], seasons: ['sp', 'su'], sell: 11, p: 2, ic: ['fish', '#e8e8e0', '#7a8a9a'] },
  striper: { name: 'Striped bass', w: ['lake'], ch: [5, 6], seasons: ['fa', 'wi', 'sp'], sell: 26, p: 1, ic: ['fish', '#c8d0d8', '#3a3a4a'] },
  walleye: { name: 'Walleye', w: ['lake'], ch: [5, 6], seasons: ['wi', 'sp'], sell: 22, p: 1, ic: ['fish', '#c8b048', '#6a5a2a'] },
  trout: { name: 'Rainbow trout', w: ['creek'], ch: [6], seasons: ['fa', 'wi'], sell: 18, p: 2, ic: ['fish', '#a8c8a0', '#d8607a'] },
};
for (const [id, f] of Object.entries(FISH)) ITEMS[id] = { name: f.name, kind: 'fish', sell: f.sell, energy: 12, ic: f.ic };
for (const [id, c] of Object.entries(CROPS)) {
  ITEMS[id] = { name: c.name, kind: 'crop', sell: c.sell, energy: Math.max(4, Math.round(c.sell / 4)), ic: c.ic };
  ITEMS['seed:' + id] = { name: c.name + ' seeds', kind: 'seed', crop: id, sell: Math.floor(c.seed / 2), ic: ['seed', c.ic[1], c.ic[2]] };
}
export const itemName = (id) => (ITEMS[id] ? ITEMS[id].name : id);
const BASE = { milk: 2, goatmilk: 4, egg: 5, cornmeal: 2, shingles: 2, staves: 2, charcoal: 2, preserves: 3, cheese: 4, picnic: 5,
  hardware: 3, sprinkler: 5, drip: 6, coldwater: 2 };
for (const [id, it] of Object.entries(ITEMS)) it.base = it.kind === 'crop' ? CROPS[id].ch[0] : it.kind === 'seed' ? CROPS[it.crop].ch[0] : (BASE[id] || 1);
// Sell price of an item in a chapter (game prices).
export const sellPrice = (id, ch) => {
  const it = ITEMS[id];
  if (!it || !it.sell) return 0;
  // Wild goods (fish, forage, raw materials) rise more slowly than farm goods.
  const r = CHAPTER_PRICE[ch] / CHAPTER_PRICE[it.base];
  return Math.max(1, Math.round(it.sell * (['fish', 'forage', 'material'].includes(it.kind) ? Math.sqrt(r) : r)));
};
export const seedPrice = (crop, ch) => Math.max(1, Math.round(CROPS[crop].seed * CHAPTER_PRICE[ch] / CHAPTER_PRICE[CROPS[crop].ch[0]]));
export const LEAF_FACT = 'f-maple-leaf-oak';

// Forage tables by season (spawned on ridge/forest tiles each morning).
export const FORAGE = {
  sp: ['greens', 'greens', 'pineknot', 'mushroom'],
  su: ['blackberry', 'blackberry', 'pineknot', 'greens'],
  fa: ['hickory', 'acorn', 'mushroom', 'hickory', 'oakleaf'],
  wi: ['pineknot', 'greens', 'acorn'],
};

// ---------- recipes ----------
// at: where it can be made ('pack' = anywhere from the inventory, 'mill' = the water mill).
export const RECIPES = {
  whetstone: { out: ['whetstone', 1], in: { novaculite: 2, stone: 1 }, ch: [1, 2, 3, 4, 5, 6], at: 'pack' },
  fence: { out: ['fence', 2], in: { wood: 2 }, ch: [1, 2, 3, 4, 5, 6], at: 'pack' },
  chest: { out: ['chest', 1], in: { wood: 20 }, ch: [1, 2, 3, 4, 5, 6], at: 'pack' },
  hut: { out: ['hut', 1], in: { wood: 50, stone: 20 }, ch: [1], at: 'pack' },
  tea: { out: ['tea', 1], in: { greens: 1, hotwater: 1 }, ch: [1, 2, 3, 4, 5, 6], at: 'pack' },
  shingles: { out: ['shingles', 2], in: { wood: 3 }, ch: [2, 3], at: 'pack' },
  staves: { out: ['staves', 2], in: { wood: 4 }, ch: [2, 3], at: 'pack' },
  charcoal: { out: ['charcoal', 1], in: { wood: 5 }, ch: [2, 3, 4], at: 'pack' },
  cornmeal: { out: ['cornmeal', 1], in: { corn: 1 }, ch: [2], at: 'mill' },
  preserves: { out: ['preserves', 1], in: { strawberry: 3 }, ch: [3], at: 'pack', alt: [{ tomato: 4 }, { blueberry: 3 }] },
  cheese: { out: ['cheese', 1], in: { goatmilk: 2 }, ch: [4], at: 'pack' },
  picnic: { out: ['picnic', 1], in: { egg: 1, sweetcorn: 1, watermelon: 1 }, ch: [5], at: 'pack' },
  sprinkler: { out: ['sprinkler', 1], in: { hardware: 1, stone: 5 }, ch: [5, 6], at: 'pack' },
  drip: { out: ['drip', 1], in: { hardware: 2, quartz: 1 }, ch: [6], at: 'pack' },
  stand: { out: ['stand', 1], in: { wood: 30, hardware: 2 }, ch: [5], at: 'pack' },
  tub: { out: ['tub', 1], in: { wood: 30, hardware: 4 }, ch: [6], at: 'pack' },
};

// ---------- shops (per chapter) ----------
// Seeds are added automatically from the chapter's crops (in season). price: game dollars.
export const SHOPS = {
  1: { name: 'Trade camp', keeper: 'margaux', stock: [['emptyjug', 6], ['tea', 70]] },
  2: { name: 'Valley Street store', keeper: null, stock: [['emptyjug', 6], ['feed', 5], ['animal', 500]] },
  3: { name: 'Central Avenue store', keeper: null, stock: [['emptyjug', 6], ['feed', 6], ['hardware', 40], ['animal', 600], ['brickhouse', 800]] },
  4: { name: 'Feed & seed', keeper: null, stock: [['emptyjug', 8], ['feed', 8], ['hardware', 45], ['animal', 700]] },
  5: { name: 'Farm supply', keeper: null, stock: [['emptyjug', 8], ['feed', 8], ['hardware', 50], ['animal', 450]] },
  6: { name: 'Hardware & garden', keeper: null, stock: [['emptyjug', 10], ['feed', 10], ['hardware', 60], ['animal', 600]] },
};
export const ANIMALS = {
  cow: { name: 'Milk cow', product: 'milk' },
  goat: { name: 'Goat', product: 'goatmilk' },
  hen: { name: 'Hen', product: 'egg' },
};
export const PEN_MAX = 4;

// ---------- tool energy ----------
export const ENERGY = { hoe: 2, jug: 1, axe: 3, pick: 3, scythe: 1, rod: 4, tiller: 4 };
export const JUG_CAP = [0, 12, 20, 20, 20];
export const SOAK_FEE = [0, 0, 0, 5, 10, 15, 35];

// ---------- people ----------
// skin: index into the skin palette. Schedules: [minuteOfDay, placeId]. Places come from world.js.
// gifts: love / like / dislike item ids or kinds ('kind:crop'). Lines: { h: min hearts, t, s?: season, fact? }.
export const PEOPLE = {
  // Chapter 1
  josiah: { ch: 1, name: 'Josiah Crane', role: 'Trapper; rents out his spare cabin', home: 'josiahHome',
    look: { shirt: '#6a5a3a', pants: '#4a3a2a', hat: 'cap-fur', hair: '#6a6a6a', skin: 1, beard: true },
    sched: [[360, 'josiahHome'], [450, 'creek'], [690, 'tradeCamp'], [840, 'ridge'], [1080, 'josiahHome']],
    gifts: { love: ['hickory', 'catfish'], like: ['kind:fish', 'corn', 'tea'], dislike: ['acorn'] },
    lines: [
      { h: 0, t: 'Name\'s Josiah. I trap up and down this creek. Folks come for the hot water and stay a week in my spare cabin.' },
      { h: 0, t: 'Ridge rock up north, the white kind, takes an edge like nothing else. Sharpen your tools on it and the work goes easier.' },
      { h: 0, s: 'fa', t: 'Hickories are dropping. Best eating in these hills, if the squirrels leave you any.' },
      { h: 1, t: 'Catfish lie deep under the bridge in the heat of the day. Morning\'s better.' },
      { h: 2, t: 'Explorers came up this creek three winters back, they say, with thermometers and jars. Wrote down that the water was near boiling.', fact: 'f-temp-1804' },
      { h: 3, t: 'You\'re steady, Ada. I\'d trust you with my traps.' },
    ] },
  margaux: { ch: 1, name: 'Margaux Delacroix', role: 'River trader; runs the trade camp', home: 'margauxHome',
    look: { shirt: '#2b4c6b', pants: '#5a3a3a', hat: 'scarf', hair: '#2a1a12', skin: 2 },
    sched: [[360, 'margauxHome'], [480, 'tradeCamp'], [1020, 'creek'], [1140, 'margauxHome']],
    gifts: { love: ['whetstone', 'novaculite'], like: ['squash', 'hickory', 'kind:fish'], dislike: ['pineknot'] },
    lines: [
      { h: 0, t: 'Bonjour. I trade up and down the river: seed, salt, jugs. I buy what grows and what swims.' },
      { h: 0, t: 'Whetstones sell well downriver. Trappers need a fine edge for their knives.' },
      { h: 1, t: 'Travelers tell a tale that the springs were neutral ground where enemies laid down arms. The historians say it is a later embellishment.', legend: true },
      { h: 1, t: 'Another tale says a Spanish explorer bathed here in 1541. Pretty story. No firm proof.', fact: 'f-desoto-legend', legend: true },
      { h: 2, t: 'Bring me corn and fish and I can fill a whole boat for Natchez.' },
      { h: 3, t: 'You bargain fairly. Rare on this river.' },
    ] },
  ezra: { ch: 1, name: 'Ezra Pell', role: 'Health seeker taking the waters', home: 'ezraHome',
    look: { shirt: '#c8c0b0', pants: '#5a5a5a', hat: 'brim', hair: '#a89a8a', skin: 0 },
    sched: [[360, 'ezraHome'], [480, 'soak'], [660, 'springs'], [900, 'tradeCamp'], [1020, 'soak'], [1110, 'ezraHome']],
    gifts: { love: ['tea', 'hotwater'], like: ['greens', 'radish', 'beans'], dislike: ['stone'] },
    lines: [
      { h: 0, t: 'My joints ache, so I came a long way to sit in hot water. The hut I\'m in leaks.' },
      { h: 0, t: 'Someone ought to build a proper hut or two for us. We\'d pay rent gladly.' },
      { h: 1, t: 'A trapper by the name of Percival, they say, built cabins at the springs to rent to folks like me.', fact: 'f-percival' },
      { h: 2, t: 'The steam in the morning hangs in the valley like a cloud. You can see it from the ridge.' },
      { h: 3, t: 'I walk farther every day. Maybe it\'s the water. Maybe it\'s your greens.' },
    ] },
  // Chapter 2
  corinna: { ch: 2, name: 'Corinna Bell', role: 'Keeps a boardinghouse on Valley Street', home: 'inn',
    look: { shirt: '#6a3a5a', pants: '#3a2a3a', hat: 'bonnet', hair: '#4a2a1a', skin: 1 },
    sched: [[360, 'inn'], [600, 'store'], [720, 'inn'], [960, 'mill'], [1080, 'inn']],
    gifts: { love: ['cornmeal', 'milk'], like: ['potato', 'cabbage', 'wheat'], dislike: ['charcoal'] },
    lines: [
      { h: 0, t: 'Twenty-four hotels and boardinghouses in this valley and every one wants cornbread.' },
      { h: 0, t: 'Take your corn to the mill on the creek. Meal keeps; ears don\'t.' },
      { h: 1, t: 'My boarders come for the baths and complain about the stage from Malvern. Twenty-one miles of ruts.' },
      { h: 2, t: 'During the war this whole town emptied out. Most of us came back to ashes.' },
      { h: 3, t: 'You\'re welcome at my table any day, Caleb Vale.' },
    ] },
  amos: { ch: 2, name: 'Amos Thorne', role: 'Drives the stage to Malvern', home: 'stage',
    look: { shirt: '#5a4a3a', pants: '#2a2a2a', hat: 'brim', hair: '#1a1a1a', skin: 3, beard: true },
    sched: [[360, 'stage'], [540, 'street'], [780, 'stage'], [1020, 'inn'], [1140, 'stage']],
    gifts: { love: ['staves', 'tea'], like: ['shingles', 'corn', 'kind:fish'], dislike: ['greens'] },
    lines: [
      { h: 0, t: 'Stage to Malvern and back. Most of a day each way when the creeks are up.' },
      { h: 0, t: 'Every roof on this street needs shingles. Split me some and I\'ll see they get nailed down.' },
      { h: 1, t: 'Talk is a railroad\'s coming. Then where will I be?' },
      { h: 2, t: 'Robbers, floods, broken axles. I\'ve seen \'em all on that road.' },
      { h: 3, t: 'You\'re the only farmer who never haggles. I like that.' },
    ] },
  lucius: { ch: 2, name: 'Lucius Greer', role: 'Druggist who wants to bottle spring water', home: 'drug',
    look: { shirt: '#f0ece0', pants: '#2a2a3a', hat: 'none', hair: '#8a7a6a', skin: 0, glasses: true },
    sched: [[360, 'drug'], [600, 'coldspring'], [780, 'drug'], [1020, 'springs'], [1110, 'drug']],
    gifts: { love: ['coldwater', 'quartz'], like: ['hotwater', 'greens', 'mushroom'], dislike: ['hay'] },
    lines: [
      { h: 0, t: 'Hot water heals the bathers. Cold water, sir, can travel. I mean to bottle it.' },
      { h: 0, t: 'The cold spring up on the ridge north of your place runs sweet. Fill jugs there for me?' },
      { h: 1, t: 'A pharmacist named Greene and his brother started selling bottled spring water this very year, I hear.', fact: 'f-bottling-1871' },
      { h: 2, t: 'That water is cold, not hot. Cold travels better in a crate.', fact: 'f-cold-spring' },
      { h: 3, t: 'If my bottles ever reach Washington, I\'ll tell them a Vale filled the first ones.' },
    ] },
  // Chapter 3
  duval: { ch: 3, name: 'Augustin Duval', role: 'Head chef at the grand hotel', home: 'hotel',
    look: { shirt: '#f4f2ec', pants: '#2a2a2a', hat: 'toque', hair: '#3a2a1a', skin: 1 },
    sched: [[360, 'hotel'], [540, 'store'], [660, 'hotel'], [960, 'street'], [1080, 'hotel']],
    gifts: { love: ['strawberry', 'preserves'], like: ['tomato', 'milk', 'cabbage'], dislike: ['acorn'] },
    lines: [
      { h: 0, t: 'Three hundred guests and every one expects a Baden-Baden table. I need tomatoes and berries.', fact: 'f-baden-baden' },
      { h: 0, t: 'The train brings guests by the hundred. It does not bring fresh berries.' },
      { h: 1, t: 'A course is twenty-one baths, they say. Twenty-one days of my cooking. I must not repeat a menu.', fact: 'f-course' },
      { h: 2, t: 'Build in brick, mon amie. This town has burned before and will again.' },
      { h: 3, t: 'Your strawberries are the best on Central Avenue. I tell everyone.' },
    ] },
  hattie: { ch: 3, name: 'Hattie Coleman', role: 'Bath attendant on the Row', home: 'hattieHome',
    look: { shirt: '#ffffff', pants: '#3a5a7a', hat: 'cap', hair: '#1a1210', skin: 4 },
    sched: [[360, 'hattieHome'], [450, 'bathhouse'], [780, 'springs'], [840, 'bathhouse'], [1080, 'hattieHome']],
    gifts: { love: ['tea', 'blackberry'], like: ['milk', 'strawberry', 'hotwater'], dislike: ['charcoal'] },
    lines: [
      { h: 0, t: 'I\'ve worked these tubs eleven years. Hot packs, towels, the timing of it. Bathers come in stiff and walk out loose.' },
      { h: 0, t: 'Fill jugs at the hot spring for me when you pass. The house tank runs low by afternoon.' },
      { h: 1, t: 'Most attendants on the Row are Black, like me. In these years we may only bathe outside the hours the doctors call best, ten to noon.', ref: 'c-best-hours' },
      { h: 2, t: 'The government built a free bathhouse for folks who can\'t pay. Congress passed it back in 1878.', fact: 'f-free-bathhouse' },
      { h: 3, t: 'One day there\'ll be a bathhouse that\'s ours from the cellar up. I mean to see it.' },
      { h: 4, t: 'You listen, Nora. That counts for a lot.' },
    ] },
  walt: { ch: 3, name: 'Walt Brennan', role: 'Trainer for a visiting ballclub', home: 'depot',
    look: { shirt: '#e8e0d0', pants: '#3a3a5a', hat: 'cap', hair: '#a86a3a', skin: 0 },
    sched: [[360, 'depot'], [480, 'ballfield'], [720, 'store'], [840, 'ballfield'], [1080, 'depot']],
    gifts: { love: ['milk', 'picnic'], like: ['potato', 'cabbage', 'wheat'], dislike: ['greens'] },
    lines: [
      { h: 0, t: 'Our boys came south to boil out the winter. Spring training, the papers call it.', fact: 'f-white-stockings' },
      { h: 0, t: 'Ballplayers eat like horses. Milk and cabbage, a whole wagonload.' },
      { h: 1, t: 'They run up the mountain trails every morning and soak every afternoon.' },
      { h: 2, t: 'The railroad from Malvern is narrow gauge, three feet. Rattles your teeth.', fact: 'f-narrow-gauge' },
      { h: 3, t: 'If we win the pennant, I\'m sending you a ball.' },
    ] },
  // Chapter 4
  ora: { ch: 4, name: 'Ora Fenwick', role: 'Runs a tourist court with her husband Dell', home: 'court',
    look: { shirt: '#3c9a4a', pants: '#4a5675', hat: 'none', hair: '#c8a060', skin: 0 },
    sched: [[360, 'court'], [540, 'store'], [660, 'court'], [1020, 'street'], [1110, 'court']],
    gifts: { love: ['goatmilk', 'cheese'], like: ['sweetpotato', 'pepper', 'tomato'], dislike: ['hay'] },
    lines: [
      { h: 0, t: 'Six cabins and a barbecue pit out by the highway. Travelers want supper and they want it smoky.' },
      { h: 0, t: 'Bring me goat milk and sweet potatoes and I\'ll keep the plates full.' },
      { h: 1, t: 'There\'s a court across town that got its sauce recipe from a guest who couldn\'t pay his ten-dollar bill. Best trade they ever made.', fact: 'f-mcclards' },
      { h: 2, t: 'Dell says the radio brings more customers than the billboards.' },
      { h: 3, t: 'You\'re family here, Ray.' },
    ] },
  sal: { ch: 4, name: 'Sal Romano', role: 'Croupier at a Central Avenue club', home: 'club',
    sched: [[360, 'salHome'], [720, 'street'], [900, 'store'], [1140, 'club'], [1500, 'salHome']],
    look: { shirt: '#14121f', pants: '#14121f', hat: 'fedora', hair: '#1a1a1a', skin: 1 },
    gifts: { love: ['pepper', 'cheese'], like: ['tomato', 'kind:fish', 'peanut'], dislike: ['greens'] },
    lines: [
      { h: 0, t: 'I deal cards till dawn. Nobody in this town sleeps, and the law looks the other way.' },
      { h: 0, t: 'Find me after eight at the club. The cook wants peppers for the late suppers.' },
      { h: 1, t: 'Don\'t believe every story about the big-city fellows who winter here. Half of it\'s made up for the tourists.' },
      { h: 2, t: 'One day this town\'ll get cleaned up. Then what will I do? Farm, maybe.' },
      { h: 3, t: 'You\'re square, Ray. In this town that\'s rare.' },
    ] },
  june: { ch: 4, name: 'June Talley', role: 'Announcer at the radio station', home: 'radio',
    look: { shirt: '#f6c933', pants: '#1f2f5c', hat: 'none', hair: '#8a3a2a', skin: 3 },
    sched: [[360, 'juneHome'], [420, 'radio'], [780, 'street'], [900, 'radio'], [1140, 'juneHome']],
    gifts: { love: ['peanut', 'tomato'], like: ['sweetpotato', 'pepper', 'goatmilk'], dislike: ['stone'] },
    lines: [
      { h: 0, t: 'Good morning, valley! That\'s my line. I read the news, the weather and the hog prices.' },
      { h: 0, t: 'I want a farm report on the air. Bring a basket of four different crops and I\'ll sponsor you.' },
      { h: 1, t: 'The station started in 1924. Its first director ran it for ten years.', fact: 'f-kths' },
      { h: 2, t: 'Dance bands play the hotel roof on Saturday nights. You can hear them clear across the lake.' },
      { h: 3, t: 'You\'re my favorite guest, Ray. Don\'t tell the mayor.' },
    ] },
  // Chapter 5
  lorraine: { ch: 5, name: 'Lorraine Pace', role: 'Owns a motor hotel on the avenue', home: 'motel',
    look: { shirt: '#e26d8e', pants: '#34424a', hat: 'none', hair: '#e8c870', skin: 0 },
    sched: [[360, 'motel'], [600, 'store'], [720, 'motel'], [960, 'drivein'], [1080, 'motel']],
    gifts: { love: ['picnic', 'watermelon'], like: ['egg', 'sweetcorn', 'peanut'], dislike: ['hay'] },
    lines: [
      { h: 0, t: 'Ten stories, covered parking and a pool. Folks drive in from three states.' },
      { h: 0, t: 'My breakfast counter goes through a dozen eggs an hour. I need eggs and sweet corn.' },
      { h: 1, t: 'The baths aren\'t what they were. Doctors have new medicines now.' },
      { h: 2, t: 'They built a dam up the river and made a lake with about two hundred islands.', fact: 'f-200-islands' },
      { h: 3, t: 'There\'s always a room for a Vale.' },
    ] },
  ambry: { ch: 5, name: 'Dr. Nell Ambry', role: 'Animal trainer for a roadside animal show', home: 'zoo',
    look: { shirt: '#f4c542', pants: '#34424a', hat: 'none', hair: '#3a2a1a', skin: 3, glasses: true },
    sched: [[360, 'zoo'], [660, 'street'], [780, 'zoo'], [1020, 'stand'], [1110, 'zoo']],
    gifts: { love: ['sweetcorn', 'peanut'], like: ['egg', 'okra', 'watermelon'], dislike: ['charcoal'] },
    lines: [
      { h: 0, t: 'I train hens to ring bells and walk a tightrope. Reward the right move at the right moment. That\'s all it is.' },
      { h: 0, t: 'Corn is the best reward there is. Ten ears and my hens will work all week.' },
      { h: 1, t: 'The real animal show in town was started by a husband and wife who studied psychology.', fact: 'f-breland' },
      { h: 2, t: 'Their teacher was a famous psychologist. Their method is the method I use.', fact: 'f-skinner' },
      { h: 3, t: 'You have good timing, June. I could make a trainer of you.' },
    ] },
  rusty: { ch: 5, name: 'Rusty Cole', role: 'Farmer moved here when a new lake flooded his valley', home: 'rustyHome',
    look: { shirt: '#5a7a9a', pants: '#3a4a5a', hat: 'brim', hair: '#a85a2a', skin: 1 },
    sched: [[360, 'rustyHome'], [480, 'field'], [720, 'store'], [900, 'lake'], [1080, 'rustyHome']],
    gifts: { love: ['watermelon', 'kind:fish'], like: ['okra', 'egg', 'collards'], dislike: ['quartz'] },
    lines: [
      { h: 0, t: 'My granddad\'s farm is under forty feet of lake water now. The government paid us and moved us.' },
      { h: 0, t: 'Starting over is hard. Some watermelons would make the kids feel at home.' },
      { h: 1, t: 'Whole towns went under. Folks still visit the cemeteries that were moved uphill.' },
      { h: 2, t: 'The fishing\'s good in the new lake, I\'ll give it that. Stripers in the cold months.' },
      { h: 3, t: 'Neighbors like you make a new place feel old.' },
    ] },
  // Chapter 6
  priya: { ch: 6, name: 'Priya Natarajan', role: 'Brewer in a restored bathhouse', home: 'brewery',
    look: { shirt: '#b5654a', pants: '#1e4e79', hat: 'none', hair: '#1a1210', skin: 3 },
    sched: [[360, 'priyaHome'], [480, 'brewery'], [780, 'market'], [900, 'brewery'], [1200, 'priyaHome']],
    gifts: { love: ['hops', 'blueberry'], like: ['wheat', 'heirloom', 'hotwater'], dislike: ['hay'] },
    lines: [
      { h: 0, t: 'We brew with thermal water. It arrives hot, so the first step costs less energy.', fact: 'f-140' },
      { h: 0, t: 'Local hops and local wheat. That\'s the dream. Ten of each?' },
      { h: 1, t: 'The building closed for baths decades ago. Now it\'s a brewery. Old buildings can learn new tricks.', fact: 'f-superior' },
      { h: 2, t: 'Tourists ask if the water tastes like minerals. It tastes like beer.' },
      { h: 3, t: 'Next seasonal is named after your farm. No arguments.' },
    ] },
  marcus: { ch: 6, name: 'Marcus Bell', role: 'Manages the downtown farmers\' market', home: 'market',
    look: { shirt: '#4c8fa8', pants: '#3a3a3a', hat: 'cap', hair: '#1a1210', skin: 4 },
    sched: [[360, 'marcusHome'], [420, 'market'], [840, 'street'], [960, 'market'], [1140, 'marcusHome']],
    gifts: { love: ['heirloom', 'tulip'], like: ['kind:crop', 'egg'], dislike: ['stone'] },
    lines: [
      { h: 0, t: 'Saturday mornings this lot fills with tables. People want to meet the person who grew it.' },
      { h: 0, t: 'Bring me twenty crops for the market stand and I\'ll put your farm\'s name on the banner.' },
      { h: 1, t: 'The Maurice restoration is a big one. We\'re passing the hat for the stained glass.', fact: 'f-maurice' },
      { h: 2, t: 'A Bell has lived on this valley for a long time, my grandma says. Maybe we\'re related to someone you know.' },
      { h: 3, t: 'You\'re the backbone of this market, Sam.' },
    ] },
  jo: { ch: 6, name: 'Jo Tanaka', role: 'Captain of a bathtub-race team', home: 'joHome',
    look: { shirt: '#b5568f', pants: '#2a2a3a', hat: 'helmet', hair: '#1a1a1a', skin: 1 },
    sched: [[360, 'joHome'], [480, 'trail'], [720, 'brewery'], [900, 'street'], [1140, 'joHome']],
    gifts: { love: ['blueberry', 'picnic'], like: ['heirloom', 'kind:fish', 'tea'], dislike: ['hay'] },
    lines: [
      { h: 0, t: 'Every spring teams push bathtubs down Central Avenue. It\'s exactly as silly as it sounds.', fact: 'f-tubs' },
      { h: 0, t: 'Our tub cracked. Build us a new one? Wood and hardware, and make it fast.' },
      { h: 1, t: 'Also, the shortest St. Patrick\'s parade in the world runs on Bridge Street. Ninety-eight feet of glory.', fact: 'f-bridge-street' },
      { h: 2, t: 'I ride the trails north of town on weekends. You can see the whole valley.' },
      { h: 3, t: 'Win or lose, you\'re on the team.' },
    ] },
};

// ---------- quests ----------
// type: plant | ship | craft | place | deliver | collect | catch | species | earn | hearts | visit | variety | donate | buyhouse
// goal: counts toward the chapter's era turn. at: optional minimum time for delivery.
export const QUESTS = [
  // Chapter 1
  { id: 'c1-plant', ch: 1, goal: true, title: 'Break ground', desc: 'Till the creek bottom and plant 9 seeds.', type: 'plant', n: 9, reward: { money: 30 } },
  { id: 'c1-ship', ch: 1, goal: true, title: 'First harvest', desc: 'Ship 50 crops from the bin by the cabin.', type: 'ship', kind: 'crop', n: 50, reward: { money: 50 } },
  { id: 'c1-whet', ch: 1, goal: true, title: 'Razor stone', desc: 'Mine novaculite on the north ridge and craft a whetstone (2 novaculite + 1 stone).', type: 'craft', item: 'whetstone', n: 1, reward: { money: 20 }, facts: ['f-razor-stone', 'f-whetstone-1818'] },
  { id: 'c1-hut', ch: 1, goal: true, giver: 'ezra', title: 'A hut for the ailing', desc: 'Craft a rental hut (50 wood + 20 stone) and place it on your land. Ezra will rent it.', type: 'place', item: 'hut', n: 1, reward: { money: 40, pts: 15 }, facts: ['f-percival'] },
  { id: 'c1-trade', ch: 1, goal: true, giver: 'margaux', title: 'The trader\'s order', desc: 'Bring Margaux 10 corn, 4 squash and 5 fish of any kind.', type: 'deliver', items: { corn: 10, squash: 4, 'kind:fish': 5 }, reward: { money: 120, pts: 15 } },
  { id: 'c1-springs', ch: 1, title: 'Read the springs', desc: 'Visit the steaming springs on the east hillside.', type: 'visit', place: 'springs', reward: { money: 10 }, facts: ['f-jefferson', 'f-four-springs', 'f-temp-1804'] },
  { id: 'c1-quarry', ch: 1, title: 'The old quarry', desc: 'Read the sign at the old quarry pits on the ridge. Leave the site as you found it.', type: 'visit', place: 'quarry', reward: { money: 10 }, facts: ['c-archaeology', 'f-novaculite-quarries'] },
  { id: 'c1-friend', ch: 1, title: 'Friend of the creek', desc: 'Reach 2 hearts with Josiah.', type: 'hearts', npc: 'josiah', n: 2, reward: { money: 40 } },
  // Chapter 2
  { id: 'c2-mill', ch: 2, goal: true, giver: 'corinna', title: 'Grist for the mill', desc: 'Grind corn at the creek mill and bring Corinna 10 cornmeal.', type: 'deliver', items: { cornmeal: 10 }, reward: { money: 200, pts: 15 } },
  { id: 'c2-shingles', ch: 2, goal: true, giver: 'amos', title: 'Shingles for Valley Street', desc: 'Split 20 shingles from wood and bring them to Amos.', type: 'deliver', items: { shingles: 20 }, reward: { money: 160, pts: 15 } },
  { id: 'c2-milk', ch: 2, goal: true, title: 'A milk cow', desc: 'Buy a cow at the store, keep her trough full and collect 10 milk.', type: 'collect', item: 'milk', n: 10, reward: { money: 60 } },
  { id: 'c2-cold', ch: 2, goal: true, giver: 'lucius', title: 'Cold water', desc: 'Fill empty jugs at the cold spring on the north ridge and bring Lucius 6.', type: 'deliver', items: { coldwater: 6 }, reward: { money: 180, pts: 15 }, facts: ['f-bottling-1871', 'f-cold-spring'] },
  { id: 'c2-earn', ch: 2, goal: true, title: 'A paying farm', desc: 'Earn $3,000 from sales this chapter.', type: 'earn', n: 3000, reward: { money: 0 } },
  { id: 'c2-capital', ch: 2, title: 'Capital for a summer', desc: 'Ask Corinna about the war years.', type: 'hearts', npc: 'corinna', n: 2, reward: { money: 40 }, facts: ['f-capital-1862'] },
  // Chapter 3
  { id: 'c3-hotel', ch: 3, goal: true, giver: 'duval', title: 'The hotel table', desc: 'Bring Chef Duval 10 tomatoes and 5 strawberries.', type: 'deliver', items: { tomato: 10, strawberry: 5 }, reward: { money: 420, pts: 15 } },
  { id: 'c3-team', ch: 3, goal: true, giver: 'walt', title: 'Training table', desc: 'Bring Walt 6 milk and 6 cabbages for the ballclub.', type: 'deliver', items: { milk: 6, cabbage: 6 }, reward: { money: 380, pts: 15 } },
  { id: 'c3-hot', ch: 3, goal: true, giver: 'hattie', title: 'Hot water route', desc: 'Fill 5 empty jugs at the hot spring and bring them to Hattie.', type: 'deliver', items: { hotwater: 5 }, reward: { money: 150, pts: 15 }, facts: ['f-crystal', 'f-pythian'] },
  { id: 'c3-brick', ch: 3, goal: true, title: 'Brick by brick', desc: 'Buy a brick farmhouse at the store ($800 and 20 stone).', type: 'buyhouse', reward: { money: 0 }, facts: ['f-shingle-ban'] },
  { id: 'c3-trust', ch: 3, goal: true, title: 'Hattie\'s trust', desc: 'Reach 3 hearts with Hattie.', type: 'hearts', npc: 'hattie', n: 3, reward: { money: 80 } },
  { id: 'c3-hospital', ch: 3, title: 'The new hospital', desc: 'Walk the promenade past the hospital grounds.', type: 'visit', place: 'promenade', reward: { money: 20 }, facts: ['f-army-navy', 'f-gator-farm'] },
  // Chapter 4
  { id: 'c4-bass', ch: 4, goal: true, title: 'The lake fills', desc: 'Catch 3 largemouth bass in the new lake south of the farm.', type: 'catch', item: 'bass', n: 3, reward: { money: 120 }, facts: ['f-carpenter-dam', 'f-7200'] },
  { id: 'c4-court', ch: 4, goal: true, giver: 'ora', title: 'Tourist-court supper', desc: 'Bring Ora 6 goat milk and 6 sweet potatoes.', type: 'deliver', items: { goatmilk: 6, sweetpotato: 6 }, reward: { money: 520, pts: 15 }, facts: ['f-mcclards-goat'] },
  { id: 'c4-report', ch: 4, goal: true, giver: 'june', title: 'Farm report', desc: 'Bring June a basket of 4 different crops (one of each).', type: 'variety', kind: 'crop', n: 4, reward: { money: 300, pts: 15 }, facts: ['f-kths'] },
  { id: 'c4-sal', ch: 4, goal: true, giver: 'sal', title: 'Late supper', desc: 'Bring Sal 8 peppers at the club after 8 p.m.', type: 'deliver', items: { pepper: 8 }, at: 1200, reward: { money: 360, pts: 15 } },
  { id: 'c4-earn', ch: 4, goal: true, title: 'Depression-proof', desc: 'Earn $3,000 from sales this chapter.', type: 'earn', n: 3000, reward: { money: 0 } },
  { id: 'c4-ccc', ch: 4, title: 'Lakes and parks', desc: 'Visit the lake shore.', type: 'visit', place: 'lake', reward: { money: 20 }, facts: ['f-remmel', 'f-ccc'] },
  // Chapter 5
  { id: 'c5-stand', ch: 5, goal: true, title: 'Roadside stand', desc: 'Craft a roadside stand (30 wood + 2 hardware) and place it by the road.', type: 'place', item: 'stand', n: 1, reward: { money: 100 } },
  { id: 'c5-motel', ch: 5, goal: true, giver: 'lorraine', title: 'Motel breakfast', desc: 'Bring Lorraine 12 eggs and 6 ears of sweet corn.', type: 'deliver', items: { egg: 12, sweetcorn: 6 }, reward: { money: 700, pts: 15 } },
  { id: 'c5-train', ch: 5, goal: true, giver: 'ambry', title: 'Training corn', desc: 'Bring Dr. Ambry 10 ears of sweet corn.', type: 'deliver', items: { sweetcorn: 10 }, reward: { money: 600, pts: 15 }, facts: ['f-skinner'] },
  { id: 'c5-rusty', ch: 5, goal: true, giver: 'rusty', title: 'New neighbors', desc: 'Bring Rusty 5 watermelons.', type: 'deliver', items: { watermelon: 5 }, reward: { money: 500, pts: 15 }, facts: ['f-three-sisters'] },
  { id: 'c5-lake', ch: 5, goal: true, title: 'Lake day', desc: 'Catch 3 different kinds of fish.', type: 'species', n: 3, reward: { money: 150 } },
  { id: 'c5-garden', ch: 5, title: 'A garden on the lake', desc: 'Visit the lake shore.', type: 'visit', place: 'lake', reward: { money: 30 }, facts: ['f-garvan-1956', 'f-quartz'] },
  // Chapter 6
  { id: 'c6-brew', ch: 6, goal: true, giver: 'priya', title: 'Thermal brew', desc: 'Bring Priya 10 hops and 10 wheat.', type: 'deliver', items: { hops: 10, wheat: 10 }, reward: { money: 1200, pts: 15 }, facts: ['f-140'] },
  { id: 'c6-market', ch: 6, goal: true, giver: 'marcus', title: 'Market day', desc: 'Bring Marcus 20 crops of any kind for the market stand.', type: 'deliver', items: { 'kind:crop': 20 }, reward: { money: 900, pts: 15 } },
  { id: 'c6-tub', ch: 6, goal: true, giver: 'jo', title: 'Running of the Tubs', desc: 'Craft a race tub (30 wood + 4 hardware) and bring it to Jo.', type: 'deliver', items: { tub: 1 }, reward: { money: 400, pts: 15 }, facts: ['f-tubs', 'f-tubs-2006'] },
  { id: 'c6-fund', ch: 6, goal: true, title: 'Restoration fund', desc: 'Donate $2,000 at the fund box on the Row.', type: 'donate', n: 2000, reward: { money: 0 }, facts: ['f-maurice'] },
  { id: 'c6-friends', ch: 6, goal: true, title: 'Good neighbors', desc: 'Reach 3 hearts with any two people.', type: 'hearts', npc: '*', count: 2, n: 3, reward: { money: 200 } },
  { id: 'c6-spa', ch: 6, title: 'The restored Row', desc: 'Walk the Row and read the plaques.', type: 'visit', place: 'promenade', reward: { money: 30 }, facts: ['f-quapaw-spa', 'f-hale', 'f-ozark', 'f-garvan-210'] },
];

// Cross-chapter spring facts shown at the hot spring sign.
export const SPRING_FACTS = ['f-143', 'f-700000', 'f-tufa', 'f-faults', 'f-cold-ozone'];
export const SKINS = ['#f2d6c0', '#e0b896', '#c08a62', '#8a5a3a', '#5a3a26'];
