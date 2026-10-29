// Per-chapter colors. Named-palette hexes come from shared/design/tokens.css (estimates per
// research/visual-style-guide.md); ground and foliage tones are game choices tuned for readability.

const TOK = {
  'ouachita-forest': { bg: '#1F3324', surface: '#2F4A2C', primary: '#5C7A3A', secondary: '#A08A6A', accent: '#C99A92', text: '#EDEAE2', muted: '#BFC7B0', highlight: '#F4F6F5', shale: '#2B2A27' },
  'frontier-valley': { bg: '#C9D3D6', surface: '#EFE8DA', primary: '#A58A64', secondary: '#7B6248', accent: '#8E3B2B', text: '#2A2420', muted: '#5A4330', highlight: '#3B5236' },
  'gilded-spa': { bg: '#E6D7B5', surface: '#F2EFE8', primary: '#A9432C', secondary: '#C46A3E', accent: '#4E7D5B', text: '#1F2A24', muted: '#5A4C38', highlight: '#D9A23A', cobalt: '#2B4C9B' },
  'deco-neon': { bg: '#14121F', surface: '#1F1C2E', primary: '#D4AF37', secondary: '#7C5A2E', accent: '#FF3B3B', text: '#D8CFBD', muted: '#8A8590', highlight: '#4FC3FF', felt: '#1E5B3A' },
  'linen-postcard': { bg: '#F3E9D2', surface: '#FBF6EA', primary: '#2F7FC6', secondary: '#C8452B', accent: '#F6C933', text: '#1F2F5C', muted: '#4A5675', highlight: '#F28C28', horizon: '#A7DDF2', foliage: '#3C9A4A' },
  'motor-hotel': { bg: '#8FD0E8', surface: '#D9D4CA', primary: '#3FBFB5', secondary: '#F26B5B', accent: '#F4C542', text: '#222222', muted: '#34424A', highlight: '#FFF6E0', rose: '#E26D8E' },
  'lake-life': { bg: '#1E4E79', surface: '#183F63', primary: '#B5654A', secondary: '#4C8FA8', accent: '#F2A541', text: '#F6F3EC', muted: '#C3D3DF', highlight: '#B5568F', dock: '#9C7A55', fall: '#C8501F' },
  'thermal-water': { bg: '#1F5F6B', primary: '#2A9D8F', secondary: '#2F8F5B', accent: '#6B8E3A', tufa: '#9A968C', rim: '#C8C3B6', wet: '#3A3A36' },
};
export { TOK };

// Ground and material colors per chapter (game choices on top of the named palettes).
const BASE = {
  1: { grass: '#557a36', forest: '#30482a', path: '#9a8462', street: '#9a8462', water: '#3d6f7a', deep: '#2c5562', sand: '#b8a27a', dirt: '#8a6a48',
       wood: '#7a5a3a', woodDark: '#4a3424', wall: '#8a6a48', roof: '#5a4330', trim: '#efeae2', glass: '#3a4a40', sign: '#efe8da', ink: '#2a2420', ui: 'ouachita-forest' },
  2: { grass: '#6e8a4a', forest: '#3b5236', path: '#8a6f52', street: '#7b6248', water: '#4a7a86', deep: '#3a6470', sand: '#b8a27a', dirt: '#8a6a48',
       wood: '#a58a64', woodDark: '#5a4330', wall: '#a58a64', roof: '#5a4330', trim: '#efe8da', glass: '#3a4048', sign: '#efe8da', ink: '#2a2420', ui: 'frontier-valley' },
  3: { grass: '#62904a', forest: '#355a34', path: '#b8a888', street: '#b4a688', water: '#4a8090', deep: '#3a6878', sand: '#c8b48a', dirt: '#a07a52',
       wood: '#8a6a4a', woodDark: '#5a4c38', wall: '#e6d7b5', roof: '#a9432c', trim: '#f2efe8', glass: '#2b4c9b', sign: '#1f2a24', ink: '#d9a23a', ui: 'gilded-spa' },
  4: { grass: '#4f9a4a', forest: '#2f6a3a', path: '#c8b898', street: '#8c8a90', water: '#2f7fc6', deep: '#22609a', sand: '#e0cc9a', dirt: '#a07a52',
       wood: '#9a6a3a', woodDark: '#5a3a22', wall: '#f3e9d2', roof: '#c8452b', trim: '#d4af37', glass: '#1f2f5c', sign: '#14121f', ink: '#ff3b3b', ui: 'deco-neon' },
  5: { grass: '#5fa84a', forest: '#3a7a3a', path: '#d9d4ca', street: '#45474c', water: '#3a9ac8', deep: '#2a7aa8', sand: '#ead8a8', dirt: '#a07a52',
       wood: '#b0844a', woodDark: '#6a4a2a', wall: '#d9d4ca', roof: '#3fbfb5', trim: '#f26b5b', glass: '#34424a', sign: '#fff6e0', ink: '#f26b5b', ui: 'motor-hotel' },
  6: { grass: '#58964a', forest: '#2f6040', path: '#c8bba0', street: '#9a5a48', water: '#2f6a96', deep: '#1e4e79', sand: '#d8c49a', dirt: '#8a6a48',
       wood: '#9c7a55', woodDark: '#5e4b3c', wall: '#b5654a', roof: '#4a3a34', trim: '#f6f3ec', glass: '#183f63', sign: '#183f63', ink: '#f2a541', ui: 'lake-life' },
};

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const toHex = (r, g, b) => '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
export const mix = (a, b, t) => { const A = hex(a), B = hex(b); return toHex(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t); };
export const shade = (a, t) => (t < 0 ? mix(a, '#000000', -t) : mix(a, '#ffffff', t));
export const rgba = (h, a) => { const [r, g, b] = hex(h); return `rgba(${r},${g},${b},${a})`; };

// Season shifts for living things.
const SEASON = {
  sp: { grass: ['#8fc85a', 0.18], leaf: '#7cbf4a', accent: '#c4569a' },
  su: { grass: ['#3f8a2f', 0.08], leaf: '#3f8a34', accent: '#e8d860' },
  fa: { grass: ['#b0902a', 0.32], leaf: '#d0702a', accent: '#c8501f' },
  wi: { grass: ['#8a8070', 0.45], leaf: '#7a6a58', accent: '#e8e8f0' },
};

export function palette(ch, sea) {
  const b = BASE[ch];
  const s = SEASON[sea];
  return {
    ...b, ch, sea,
    grass: mix(b.grass, s.grass[0], s.grass[1]),
    forest: mix(b.forest, s.grass[0], s.grass[1] * 0.6),
    leaf: s.leaf, flower: s.accent,
    pine: sea === 'wi' ? '#2f4a34' : '#2f5a32', pineDark: '#1f3a24',
    oak: s.leaf,
    tufa: TOK['thermal-water'].tufa, rim: TOK['thermal-water'].rim, pool: TOK['thermal-water'].primary, algae: TOK['thermal-water'].secondary,
    soil: '#7a5638', soilWet: '#4a3424', tok: TOK[b.ui],
  };
}

// UI theme per chapter: panel background, text, accent (accent text), muted text, border.
export const UI_THEME = {
  1: { bg: '#1F3324', fg: '#EDEAE2', accent: '#C99A92', accentFg: '#1F3324', muted: '#BFC7B0', border: '#5C7A3A', font: 'var(--font-frontier)' },
  2: { bg: '#EFE8DA', fg: '#2A2420', accent: '#8E3B2B', accentFg: '#FFFFFF', muted: '#5A4330', border: '#A58A64', font: 'var(--font-frontier)' },
  3: { bg: '#F2EFE8', fg: '#1F2A24', accent: '#A9432C', accentFg: '#FFFFFF', muted: '#5A4C38', border: '#D9A23A', font: 'var(--font-serif-victorian)' },
  4: { bg: '#1F1C2E', fg: '#D8CFBD', accent: '#D4AF37', accentFg: '#14121F', muted: '#A8A3AE', border: '#D4AF37', font: 'var(--font-deco)' },
  5: { bg: '#FFF6E0', fg: '#222222', accent: '#1F7F78', accentFg: '#FFFFFF', muted: '#34424A', border: '#3FBFB5', font: 'var(--font-sans)' },
  6: { bg: '#183F63', fg: '#F6F3EC', accent: '#F2A541', accentFg: '#183F63', muted: '#C3D3DF', border: '#4C8FA8', font: 'var(--font-sans)' },
};

// Night tint and light color per chapter's light source.
export const LIGHT = {
  fire: { col: '#ffb060', r: 3.2 }, lantern: { col: '#ffc070', r: 2.6 }, gas: { col: '#ffe0a0', r: 2.6 },
  neon: { col: '#ff6070', r: 2.6, alt: '#4fc3ff' }, sodium: { col: '#ffb040', r: 3.0 }, led: { col: '#f0f4ff', r: 3.2 },
};
export const NIGHT = { 1: '#0a1020', 2: '#0d1224', 3: '#101428', 4: '#14121f', 5: '#0e1630', 6: '#0a1a30' };
