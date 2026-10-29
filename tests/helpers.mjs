// Shared helpers for the Valley of Vapors tests (imported by *.test.mjs; not a test file itself).

// A paused chapter with the player at a named place.
export async function chapter(t, era = 1, o = {}) {
  await t.seed(o.seed ?? 7);
  const s = await t.game('scene', { era, at: o.at || 'farmDoor', time: o.time, day: o.day, weather: o.weather, money: o.money });
  if (o.setup) await t.game('setState', o.setup);
  return s;
}

// First free field tile (no object, soil or crop) scanning from (x0, y0).
export async function freeField(t, x0 = 3, y0 = 16, n = 1) {
  return t.page.evaluate(([x0, y0, n]) => {
    const out = [];
    for (let y = y0; y <= 31 && out.length < n; y++) for (let x = x0; x <= 20 && out.length < n; x++) {
      const k = x + ',' + y;
      const S = window.__vovApp.gm.S;
      if (S.objs[k] || S.soil[k] || S.crops[k] || window.__game.act('blocked', x, y)) continue;
      // keep a free tile above it so the player can stand there facing down
      const up = x + ',' + (y - 1);
      if (S.objs[up] || S.crops[up]) continue;
      out.push({ x, y });
    }
    return out;
  }, [x0, y0, n]);
}

// Hold a key for n ticks of the paused game (real keyboard events, deterministic stepping).
export async function holdKey(t, key, ticks) {
  await t.page.keyboard.down(key);
  await t.game('step', ticks);
  await t.page.keyboard.up(key);
  await t.game('step', 1);
}
export async function press(t, key, ticks = 2) {
  await t.page.keyboard.press(key);
  await t.game('step', ticks);
}

export async function click(t, act, arg) {
  const sel = arg != null ? `[data-act="${act}"][data-arg="${arg}"]` : `[data-act="${act}"]`;
  await t.page.click(sel);
  await t.page.waitForTimeout(30);
}

// WCAG contrast of every visible text element against its nearest opaque background (from the baseball tests).
export async function contrastReport(page) {
  return page.evaluate(() => {
    const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(',').map((x) => parseFloat(x)); return { r: v[0], g: v[1], b: v[2], a: v[3] == null ? 1 : v[3] }; };
    const lum = ({ r, g, b }) => { const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const blend = (top, bot) => ({ r: top.r * top.a + bot.r * (1 - top.a), g: top.g * top.a + bot.g * (1 - top.a), b: top.b * top.a + bot.b * (1 - top.a), a: 1 });
    const bgOf = (el) => {
      const stack = [];
      for (let e = el; e; e = e.parentElement) {
        const c = parse(getComputedStyle(e).backgroundColor);
        if (c && c.a > 0) { stack.push(c); if (c.a >= 0.99) break; }
      }
      let bg = { r: 26, g: 22, b: 18, a: 1 };
      for (let i = stack.length - 1; i >= 0; i--) bg = blend(stack[i], bg);
      return bg;
    };
    const fails = [];
    let checked = 0;
    for (const el of document.querySelectorAll('#hud *, #screen *, #hotbar *, #prompt, .toast')) {
      if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') continue;
      const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!own) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || +cs.opacity === 0) continue;
      if (el.closest('[disabled]')) continue;
      const fg = parse(cs.color); if (!fg) continue;
      const bg = bgOf(el);
      const L1 = lum(blend(fg, bg)), L2 = lum(bg);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const size = parseFloat(cs.fontSize), bold = +cs.fontWeight >= 700;
      const need = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5;
      checked++;
      if (ratio < need) fails.push({ text: el.textContent.trim().slice(0, 40), ratio: +ratio.toFixed(2), need, tag: el.tagName, cls: el.className });
    }
    return { checked, fails };
  });
}
