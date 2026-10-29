// Versioned saves. localStorage access is wrapped by the caller (main.js); this module only
// serializes, migrates and validates.
import { VERSION } from './sim.js';

export const SAVE_KEY = 'vov-farm-save';
export const SETTINGS_KEY = 'vov-farm-settings';

// migrations[v] turns a version-v state into version v+1.
export const migrations = {
  // v0 (pre-release test format): money was `gold`, the chapter was `era`, no almanac.
  0: (s) => {
    const o = { ...s, v: 1 };
    if (o.gold != null && o.money == null) { o.money = o.gold; delete o.gold; }
    if (o.era != null && o.ch == null) { o.ch = o.era; delete o.era; }
    o.almanac = o.almanac || [];
    o.chaptersReached = o.chaptersReached || [o.ch || 1];
    return o;
  },
};

export function serialize(S) {
  return JSON.stringify({ v: VERSION, savedAt: Date.now(), state: S });
}

export function migrate(state) {
  let s = state;
  let v = s.v ?? 0;
  while (v < VERSION) {
    if (!migrations[v]) throw new Error('no migration from v' + v);
    s = migrations[v](s); v = s.v;
  }
  return s;
}

export function parse(text) {
  const o = JSON.parse(text);
  const s = migrate(o.state || o);
  validate(s);
  return s;
}

export function validate(s) {
  const need = ['seed', 'ch', 'day', 'time', 'money', 'energy', 'player', 'inv', 'soil', 'crops', 'objs', 'npcs', 'quests'];
  for (const k of need) if (s[k] == null) throw new Error('save is missing ' + k);
  if (!(s.ch >= 1 && s.ch <= 6)) throw new Error('bad chapter');
  if (!Array.isArray(s.inv)) throw new Error('bad inventory');
  // Fill fields added after a save was written.
  s.cstats = s.cstats || { planted: 0, shipped: {}, shippedKind: {}, crafted: {}, placed: {}, collected: {}, caught: {}, donated: 0, visited: {} };
  s.chest = s.chest || new Array(24).fill(null);
  s.bin = s.bin || []; s.forage = s.forage || {}; s.animals = s.animals || []; s.penOut = s.penOut || {};
  s.flags = s.flags || {}; s.stats = s.stats || { shipped: 0, earned: 0, caught: 0, harvested: 0 };
  s.almanac = s.almanac || []; s.chaptersReached = s.chaptersReached || [s.ch];
  s.totalDays = s.totalDays ?? s.day;
  return s;
}
