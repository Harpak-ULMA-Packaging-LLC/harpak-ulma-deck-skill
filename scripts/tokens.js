// Harpak-ULMA deck tokens and helpers for pptxgenjs.
// Usage: const { C, F, L, helpers } = require("./tokens.js");
// Geometry recipes for every archetype live in build_template.js.

const C = {
  ink: "030303", paper: "FFFFFF",
  n50: "F7F8F9", n100: "F1F2F3", n200: "E0E2E4", n300: "C7CACD", n400: "A7ABB0",
  n500: "7E8388", n600: "5B5F64", n700: "404448", n800: "26282B",
  red: "DC220A", red400: "E55738", red600: "BD1C08", red700: "991506", red100: "FCE3DD",
  blue: "235980", blue500: "2E6FA3", blue300: "7EAFD3", blue100: "DCE9F3",
  green: "11532D", greenFill: "1E8045", greenTint: "E9F2EC",
  amber: "7A4807", amberFill: "C2740C",
  navy: "0C1B33", navySurface: "13253F", navyBorder: "24374F",
  teal: "00E3CC", auraBlue: "0078FF",
  surfaceDark: "0E1012", cardDark: "141719", borderDark: "26282B",
  glyphNeutral: "9BA1A7",  // v0.4 6.A.10.4: equipment glyphs on dark (8.0:1 on ink)
  eyebrowDark: "FF5A46",   // v0.4 PROPOSED: dark-surface eyebrow text (6.8:1 on ink)
};

// Equipment glyph aspect ratios (width/height), height-64 canvas (v0.4 6.A.10.3).
// Pre-rendered PNGs live in assets/glyph-png as <glyph>-ink.png / <glyph>-neutral.png.
const GLYPH_AR = {
  weigher: 64 / 64, thermoformer: 136 / 64, "tray-sealer": 88 / 64,
  "flow-wrapper": 128 / 64, vffs: 76 / 64, robot: 76 / 64,
  "case-packer": 96 / 64, palletizer: 84 / 64,
};
const GLYPH_FEET = 60 / 64; // baseline sits at 60/64 of glyph height

const F = {
  display: "Archivo ExtraBold", head: "Archivo", headSemi: "Archivo SemiBold",
  body: "Inter", bodyMed: "Inter Medium", bodySemi: "Inter SemiBold",
  mono: "JetBrains Mono", monoMed: "JetBrains Mono Medium",
};

const L = {
  PAGE_W: 13.333, PAGE_H: 7.5, MX: 0.67,
  CW: 13.333 - 2 * 0.67, GUT: 0.25,
  COLW: (13.333 - 2 * 0.67 - 11 * 0.25) / 12,
  LOCKUP_AR: 2400 / 293, STACK_AR: 1800 / 921, MOTIF_AR: 2296 / 256, // glyph motif strip
  R_CARD: 0.083, R_BTN: 0.042,
  gx: (i) => 0.67 + i * ((13.333 - 2 * 0.67 - 11 * 0.25) / 12 + 0.25),
  gw: (span) => span * ((13.333 - 2 * 0.67 - 11 * 0.25) / 12) + (span - 1) * 0.25,
};

// helpers(pres, assetDir) returns the same primitives build_template.js uses.
function helpers(pres, A) {
  const txt = (s, text, o) => s.addText(text, Object.assign({ margin: 0, fontFace: F.body, color: C.ink, valign: "top", align: "left" }, o));
  return {
    txt,
    bg: (s, color) => { s.background = { color }; },
    eyebrow: (s, text, x, y, color, w) => txt(s, text.toUpperCase(), { x, y, w: w || 8, h: 0.28, fontFace: F.monoMed, fontSize: 10, color, charSpacing: 2 }),
    redRule: (s, x, y, w) => s.addShape(pres.ShapeType.rect, { x, y, w: w || 0.55, h: 0.052, fill: { color: C.red } }),
    hair: (s, x, y, w, color) => s.addShape(pres.ShapeType.line, { x, y, w, h: 0, line: { color, width: 0.75 } }),
    card: (s, x, y, w, h, mode, fill) => s.addShape(pres.ShapeType.roundRect, {
      x, y, w, h, rectRadius: L.R_CARD,
      fill: { color: fill || (mode === "dark" ? C.cardDark : C.paper) },
      line: { color: mode === "dark" ? C.borderDark : C.n200, width: 0.75 },
    }),
    iconChip: (s, icon, x, y, mode, size) => {
      const sz = size || 0.52, pad = sz * 0.22;
      s.addShape(pres.ShapeType.roundRect, { x, y, w: sz, h: sz, rectRadius: L.R_CARD, fill: { color: mode === "dark" ? "1B1E20" : C.n100 } });
      s.addImage({ path: `${A}/icons/${icon}-${mode === "dark" ? "white" : "ink"}.png`, x: x + pad, y: y + pad, w: sz - 2 * pad, h: sz - 2 * pad });
    },
    footer: (s, n, mode, deckLabel) => {
      const dark = mode === "dark";
      txt(s, `${String(n).padStart(2, "0")}  ·  ${deckLabel || "HARPAK-ULMA"}`, { x: L.MX, y: 7.08, w: 6, h: 0.22, fontFace: F.mono, fontSize: 8, color: dark ? C.n500 : C.n400, charSpacing: 1.2 });
      const lw = 1.25;
      s.addImage({ path: `${A}/logos/lockup-horizontal-${dark ? "reversed" : "color"}.png`, x: L.PAGE_W - L.MX - lw, y: 7.075, w: lw, h: lw / L.LOCKUP_AR });
    },
    slideHeader: (s, eyebrowText, title, mode, titleW) => {
      const dark = mode === "dark";
      txt(s, eyebrowText.toUpperCase(), { x: L.MX, y: 0.56, w: 8, h: 0.28, fontFace: F.monoMed, fontSize: 10, color: dark ? C.eyebrowDark : C.n500, charSpacing: 2 }); // v0.4 dark eyebrow token
      txt(s, title, { x: L.MX, y: 0.9, w: titleW || 10.6, h: 1.0, fontFace: F.head, bold: true, fontSize: 24, color: dark ? C.paper : C.ink, lineSpacingMultiple: 1.08 });
    },
  };
}

module.exports = { C, F, L, GLYPH_AR, GLYPH_FEET, helpers };
