// Harpak-ULMA presentation template v2 — 54 archetypes, Brand Book v0.3
// Sections: covers/setup, structure, narrative, evidence, solutions, people,
// partners, Aura, commercial/closing, governance.
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.defineLayout({ name: "HU", width: 13.333, height: 7.5 });
pres.layout = "HU";
pres.author = "Harpak-ULMA";
pres.company = "Harpak-ULMA";
pres.title = "Harpak-ULMA presentation template v2";

// ---------- tokens ----------
const C = {
  ink: "030303", paper: "FFFFFF",
  n50: "F7F8F9", n100: "F1F2F3", n200: "E0E2E4", n300: "C7CACD", n400: "A7ABB0",
  n500: "7E8388", n600: "5B5F64", n700: "404448", n800: "26282B",
  red: "DC220A", red400: "E55738", red600: "BD1C08", red700: "991506", red100: "FCE3DD",
  blue: "235980", blue500: "2E6FA3", blue300: "7EAFD3", blue100: "DCE9F3",
  green: "11532D", greenFill: "1E8045", greenTint: "E9F2EC",
  navy: "0C1B33", navySurface: "13253F", navyBorder: "24374F",
  teal: "00E3CC",
  cardDark: "141719", borderDark: "26282B", chipDark: "1B1E20",
  glyphNeutral: "9BA1A7",   // 6.A.10.4: glyph tier on dark, 8.0:1 on ink
  eyebrowDark: "FF5A46",    // PROPOSED (v0.4 6.A.10.4): dark-surface eyebrow text, 6.8:1 on ink
};
// Equipment glyph aspect ratios (width/height), canvas height 64 (6.A.10.3)
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
const A = (p) => `assets/${p}`;
const PAGE_W = 13.333, PAGE_H = 7.5, MX = 0.67;
const CW = PAGE_W - 2 * MX;
const GUT = 0.25, COLW = (CW - 11 * GUT) / 12;
const gx = (i) => MX + i * (COLW + GUT);
const gw = (span) => span * COLW + (span - 1) * GUT;
const LOCKUP_AR = 2400 / 293, MOTIF_AR = 2296 / 256;
const R_CARD = 0.083, R_BTN = 0.042;
const PART_AR = { rockwell: 848 / 221, rama: 315 / 92, cabinplant: 284 / 127, mondini: 448 / 113, sterimed: 160 / 65 };

// ---------- helpers ----------
let PAGE = 0;
function S(color) { const s = pres.addSlide(); PAGE++; s.__n = PAGE; s.background = { color }; return s; }
function txt(s, text, o) {
  s.addText(text, Object.assign({ margin: 0, fontFace: F.body, color: C.ink, valign: "top", align: "left" }, o));
}
function eyebrow(s, text, x, y, color, w) {
  txt(s, text.toUpperCase(), { x, y, w: w || 8, h: 0.28, fontFace: F.monoMed, fontSize: 10, color, charSpacing: 2 });
}
function redRule(s, x, y, w) {
  s.addShape(pres.ShapeType.rect, { x, y, w: w || 0.55, h: 0.052, fill: { color: C.red } });
}
function hair(s, x, y, w, color) {
  s.addShape(pres.ShapeType.line, { x, y, w, h: 0, line: { color, width: 0.75 } });
}
function vhair(s, x, y, h, color) {
  s.addShape(pres.ShapeType.line, { x, y, w: 0, h, line: { color, width: 0.75 } });
}
function footer(s, mode, deckLabel) {
  const dark = mode === "dark";
  txt(s, `${String(s.__n).padStart(2, "0")}  ·  ${deckLabel || "HARPAK-ULMA"}`, {
    x: MX, y: 7.08, w: 6, h: 0.22, fontFace: F.mono, fontSize: 8, color: dark ? C.n500 : C.n400, charSpacing: 1.2,
  });
  const lw = 1.25, lh = lw / LOCKUP_AR;
  s.addImage({ path: A(dark ? "logos/lockup-horizontal-reversed.png" : "logos/lockup-horizontal-color.png"), x: PAGE_W - MX - lw, y: 7.075, w: lw, h: lh });
}
function card(s, x, y, w, h, mode, fill) {
  const dark = mode === "dark";
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: R_CARD,
    fill: { color: fill || (dark ? C.cardDark : C.paper) },
    line: { color: dark ? C.borderDark : C.n200, width: 0.75 },
  });
}
function iconChip(s, icon, x, y, mode, size) {
  const dark = mode === "dark", sz = size || 0.52;
  s.addShape(pres.ShapeType.roundRect, { x, y, w: sz, h: sz, rectRadius: R_CARD, fill: { color: dark ? C.chipDark : C.n100 } });
  const pad = sz * 0.22;
  s.addImage({ path: A(`icons/${icon}-${dark ? "white" : "ink"}.png`), x: x + pad, y: y + pad, w: sz - 2 * pad, h: sz - 2 * pad });
}
function headline(s, text, y, mode, size, w) {
  txt(s, text, { x: MX, y, w: w || CW, h: 1.0, fontFace: F.head, bold: true, fontSize: size || 24, color: mode === "dark" ? C.paper : C.ink, lineSpacingMultiple: 1.08 });
}
function slideHeader(s, eyebrowText, title, mode, titleW) {
  const dark = mode === "dark";
  // v0.4 6.A.10.4: dark-surface eyebrow text uses the derived warm token (PROPOSED). Light stays neutral.
  eyebrow(s, eyebrowText, MX, 0.56, dark ? C.eyebrowDark : C.n500);
  headline(s, title, 0.9, mode, 24, titleW || 10.6);
}
function containImg(s, path, ar, x, y, w, h) {
  let dw = w, dh = w / ar;
  if (dh > h) { dh = h; dw = h * ar; }
  s.addImage({ path, x: x + (w - dw) / 2, y: y + (h - dh) / 2, w: dw, h: dh });
}
// Place an equipment glyph so its feet land on baseline `by`, horizontally centered in [x, x+colw].
// `col` is "ink" (light surfaces) or "neutral" (dark surfaces). Returns the drawn box.
function glyphOnBaseline(s, name, col, cx, by, h) {
  const w = h * GLYPH_AR[name];
  const top = by - h * GLYPH_FEET;
  s.addImage({ path: A(`glyph-png/${name}-${col}.png`), x: cx - w / 2, y: top, w, h });
  return { w, top };
}
// Small glyph as a header identifier next to a machine name (wayfinding, not decoration).
function glyphTag(s, name, col, x, y, h) {
  const w = h * GLYPH_AR[name];
  s.addImage({ path: A(`glyph-png/${name}-${col}.png`), x, y, w, h });
  return w;
}
function markSlot(s, partner, x, y, w, h) {
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: R_CARD, fill: { color: C.paper }, line: { color: C.n200, width: 0.5 } });
  containImg(s, A(`partners/${partner}.png`), PART_AR[partner], x + 0.14, y + 0.12, w - 0.28, h - 0.24);
}
const notes = (s, t) => s.addNotes(t);
let s;

// =====================================================================
// SECTION 1 · COVERS AND SETUP (01 to 04)
// =====================================================================

// 01 — COVER, DARK (deck master)
s = S(C.ink);
s.addImage({ path: A("logos/lockup-horizontal-reversed.png"), x: MX, y: 0.62, w: 2.1, h: 2.1 / LOCKUP_AR });
eyebrow(s, "Line assessment · Q3 2026", MX, 2.28, C.eyebrowDark);
txt(s, "We build your line,\nproduct to pallet.", { x: MX, y: 2.62, w: 10.8, h: 2.15, fontFace: F.display, fontSize: 43, color: C.paper, lineSpacingMultiple: 1.02 });
redRule(s, MX, 4.78);
txt(s, "One contract. One number to call. This review covers throughput, changeover,\nand the uptime we own after the line ships.", { x: MX, y: 5.0, w: 9.2, h: 0.75, fontFace: F.body, fontSize: 13, color: C.n300, lineSpacingMultiple: 1.35 });
s.addImage({ path: A("motif/glyph-motif-dark.png"), x: PAGE_W - MX - 6.4, y: 6.0, w: 6.4, h: 6.4 / MOTIF_AR, transparency: 30 });
txt(s, "PREPARED FOR [CUSTOMER] · JULY 2026", { x: MX, y: 6.98, w: 6, h: 0.22, fontFace: F.mono, fontSize: 8.5, color: C.n500, charSpacing: 1.5 });
txt(s, "HARPAK-ULMA · TAUNTON, MA", { x: PAGE_W - MX - 4, y: 6.98, w: 4, h: 0.22, align: "right", fontFace: F.mono, fontSize: 8.5, color: C.n500, charSpacing: 1.5 });
notes(s, "COVER, DARK (default deck master per Brand Book Section 10).\nUse for: customer pitches, internal reviews, any dim room.\nReplace: eyebrow (deck type + date), title (one claim, sentence case, 12 words max), support line, PREPARED FOR.\nRules: title is a claim, not a topic label. One red rule is the only red element. Never place the lockup on red. Keep 1 S clear space around the lockup (S = symbol square height).");

// 02 — COVER, DARK, CO-BRANDED / EVENT
s = S(C.ink);
s.addImage({ path: A("logos/lockup-horizontal-reversed.png"), x: MX, y: 0.62, w: 2.1, h: 2.1 / LOCKUP_AR });
s.addImage({ path: A("logos/aura-ring.png"), x: PAGE_W - MX - 0.85, y: 0.55, w: 0.85, h: 0.85 });
eyebrow(s, "Automation Fair 2026 · Session T-412", MX, 2.28, C.eyebrowDark);
txt(s, "The fault flagged before\nthe line stops.", { x: MX, y: 2.62, w: 10.8, h: 2.15, fontFace: F.display, fontSize: 43, color: C.paper, lineSpacingMultiple: 1.02 });
txt(s, "Aura Edge by Harpak-ULMA runs the same intelligence on hardware at the line.\nThis session shows a measured fault catch on a running tray-seal line.", { x: MX, y: 4.85, w: 9.4, h: 0.75, fontFace: F.body, fontSize: 13, color: C.n300, lineSpacingMultiple: 1.35 });
card(s, MX, 5.9, 3.9, 1.0, "light");
txt(s, "CO-PRESENTED WITH", { x: MX + 0.25, y: 6.05, w: 3.4, h: 0.2, fontFace: F.monoMed, fontSize: 7.5, color: C.n500, charSpacing: 1.8 });
containImg(s, A("partners/rockwell.png"), PART_AR.rockwell, MX + 0.25, 6.3, 2.2, 0.42);
txt(s, "PACK EXPO 2026\nAUTOMATION FAIR 2026", { x: PAGE_W - MX - 4, y: 6.3, w: 4, h: 0.6, align: "right", fontFace: F.mono, fontSize: 8.5, color: C.n500, charSpacing: 1.5, lineSpacingMultiple: 1.5 });
notes(s, "COVER, DARK, CO-BRANDED (event or partner session).\nCompliance (Section 7): the partner mark sits on a neutral white card, never on red or the dark field directly. The Rockwell mark shown is a reference raster; production requires the partner-approved vector and brand-team sign-off [GET]. Keep at least 1 S of neutral separation between the mark and any brand-red element (red-proximity ruling). The red eyebrow and the mark are separated by the neutral card and distance by design; do not move them closer.\nAura ring: the only gradient on the slide. External signature: 'Aura Edge by Harpak-ULMA'.");

// 03 — COVER, LIGHT
s = S(C.paper);
s.addImage({ path: A("logos/lockup-horizontal-color.png"), x: MX, y: 0.62, w: 2.1, h: 2.1 / LOCKUP_AR });
eyebrow(s, "Packaging Parables webinar · July 2026", MX, 2.28, C.n500);
txt(s, "Flexible seafood lines:\nvariety without the changeover tax.", { x: MX, y: 2.62, w: 11.6, h: 2.15, fontFace: F.display, fontSize: 40, color: C.ink, lineSpacingMultiple: 1.04 });
redRule(s, MX, 4.75);
txt(s, "A systems view of multi-SKU seafood packaging: one integrated line,\nrecipe-driven changeover, and the numbers to hold it accountable.", { x: MX, y: 4.98, w: 9.4, h: 0.75, fontFace: F.body, fontSize: 13, color: C.n600, lineSpacingMultiple: 1.35 });
s.addImage({ path: A("motif/glyph-motif-light.png"), x: PAGE_W - MX - 6.4, y: 6.0, w: 6.4, h: 6.4 / MOTIF_AR });
txt(s, "MIKE MARCHAND · SENIOR PRODUCT MANAGER", { x: MX, y: 6.98, w: 6, h: 0.22, fontFace: F.mono, fontSize: 8.5, color: C.n500, charSpacing: 1.5 });
notes(s, "COVER, LIGHT (bright rooms, webinars, the show floor; Section 10). Same anatomy as the dark cover: eyebrow, claim title, one red rule, support line, motif strip.");

// 04 — TEMPLATE INDEX (BUILDERS)
s = S(C.paper);
slideHeader(s, "For deck builders · Delete before presenting", "What's in this template", "light");
const idx = [
  ["01 to 04", "Covers and setup", "Dark, co-branded, light, this index"],
  ["05 to 10", "Structure", "Agendas, section and product-line dividers"],
  ["11 to 15", "Narrative", "Statements, big number, quotes, full-bleed"],
  ["16 to 22", "Evidence and data", "Stat bands, charts, tables, sourced quotes"],
  ["23 to 34", "Solutions and scope", "Cards, machines, glyph motif, roadmap, industries"],
  ["35 to 38", "People", "Bios, team grid, speakers"],
  ["39 to 42", "Partners", "Ecosystem walls, built-with, partner detail"],
  ["43 to 45", "Aura", "Sub-brand, event slide, demo frame"],
  ["46 to 52", "Commercial and closing", "Case study, options, FAQ, asks, contact"],
  ["53 to 55", "Governance", "Appendix and legal, cheat sheet, back cover"],
];
idx.forEach((row, i) => {
  const col = i % 2, r = Math.floor(i / 2);
  const x = gx(col * 6), w = gw(6) - 0.3, y = 2.15 + r * 0.95;
  txt(s, row[0], { x, y: y + 0.02, w: 1.35, h: 0.25, fontFace: F.monoMed, fontSize: 9.5, color: C.n500, charSpacing: 1 });
  txt(s, row[1], { x: x + 1.5, y, w: w - 1.5, h: 0.28, fontFace: F.bodySemi, fontSize: 12.5, color: C.ink });
  txt(s, row[2], { x: x + 1.5, y: y + 0.32, w: w - 1.5, h: 0.28, fontFace: F.body, fontSize: 10, color: C.n600 });
  if (r < 4) hair(s, x, y + 0.72, w, C.n200);
});
txt(s, "PICK ARCHETYPES, DUPLICATE, REFILL. USAGE RULES LIVE IN EACH SLIDE'S SPEAKER NOTES. DELETE SLIDES 04 AND 54 BEFORE PRESENTING.", { x: MX, y: 6.74, w: CW, h: 0.25, fontFace: F.mono, fontSize: 7.5, color: C.n500, charSpacing: 1 });
footer(s, "light", "TEMPLATE");
notes(s, "TEMPLATE INDEX. Builder navigation only; delete before presenting (along with the cheat sheet, slide 54).");

// =====================================================================
// SECTION 2 · STRUCTURE (05 to 09)
// =====================================================================

const agenda = [
  ["01", "The line today", "Where the current line stands, measured"],
  ["02", "Where throughput is lost", "Changeover, faults, and waiting"],
  ["03", "The integrated approach", "One line, one accountable owner"],
  ["04", "What the numbers say", "Throughput, changeover, scrap"],
  ["05", "Service and uptime", "Who owns the line after it ships"],
  ["06", "Decision and next steps", "The ask, dated"],
];
function agendaSlide(mode) {
  s = S(mode === "dark" ? C.ink : C.paper);
  const dark = mode === "dark";
  slideHeader(s, "Agenda", "What we'll cover", mode);
  agenda.forEach((row, i) => {
    const col = i % 2, r = Math.floor(i / 2);
    const x = gx(col * 6), w = gw(6) - 0.3, y = 2.15 + r * 1.5;
    txt(s, row[0], { x, y, w: 0.8, h: 0.5, fontFace: F.monoMed, fontSize: 20, color: dark ? C.n600 : C.n400 });
    txt(s, row[1], { x: x + 0.85, y: y + 0.02, w: w - 0.9, h: 0.35, fontFace: F.bodySemi, fontSize: 14.5, color: dark ? C.paper : C.ink });
    txt(s, row[2], { x: x + 0.85, y: y + 0.4, w: w - 0.9, h: 0.3, fontFace: F.body, fontSize: 10.5, color: dark ? C.n400 : C.n600 });
    if (r < 2) hair(s, x, y + 1.12, w, dark ? C.n800 : C.n200);
  });
  footer(s, mode, "LINE ASSESSMENT");
  notes(s, `AGENDA, ${mode.toUpperCase()}. Six items max; cut the agenda for decks under 20 slides unless the audience is new to each other. Each item: short title + what the section proves.`);
}
agendaSlide("dark");   // 05
agendaSlide("light");  // 06

function divider(mode, num, title, sub, withMotif) {
  s = S(mode === "dark" ? C.ink : C.paper);
  const dark = mode === "dark";
  txt(s, num, { x: MX, y: 1.7, w: 4, h: 1.7, fontFace: F.monoMed, fontSize: 92, color: dark ? C.n700 : C.n300 });
  redRule(s, MX, 3.62);
  txt(s, title, { x: MX, y: 3.85, w: 10.5, h: 0.9, fontFace: F.head, bold: true, fontSize: 32, color: dark ? C.paper : C.ink });
  txt(s, sub, { x: MX, y: 4.62, w: 9, h: 0.4, fontFace: F.body, fontSize: 13, color: dark ? C.n300 : C.n600 });
  if (withMotif) s.addImage({ path: A(dark ? "motif/glyph-motif-dark.png" : "motif/glyph-motif-light.png"), x: PAGE_W - MX - 6.4, y: 6.05, w: 6.4, h: 6.4 / MOTIF_AR, transparency: dark ? 45 : 0 });
  txt(s, `SECTION ${num} OF 06`, { x: MX, y: 6.98, w: 5, h: 0.22, fontFace: F.mono, fontSize: 8.5, color: C.n500, charSpacing: 1.5 });
  notes(s, `SECTION DIVIDER, ${mode.toUpperCase()}${withMotif ? " WITH MOTIF" : ""}. Number in mono, muted; title is a claim about the section where possible. Use every 5 to 8 slides in decks over 15 slides.`);
}
divider("dark", "02", "Where throughput is lost", "Three failure modes we measured on the current line.", false);   // 07
divider("light", "03", "The integrated approach", "One control layer, one recipe, every machine in step.", false); // 08
divider("dark", "04", "What the numbers say", "Throughput, changeover, and scrap, measured on the line.", true);  // 09

// 10 — PRODUCT-LINE DIVIDER, DARK (6.A.10.6: glyph + label + sub line, label always present)
function productLineDivider(mode, glyph, label, subline) {
  s = S(mode === "dark" ? C.ink : C.paper);
  const dark = mode === "dark";
  eyebrow(s, "Product line", MX, 2.55, dark ? C.eyebrowDark : C.n500);
  redRule(s, MX, 2.9);
  txt(s, label, { x: MX, y: 3.15, w: 7.2, h: 0.9, fontFace: F.head, bold: true, fontSize: 40, color: dark ? C.paper : C.ink });
  txt(s, subline, { x: MX, y: 4.15, w: 7, h: 0.4, fontFace: F.body, fontSize: 14, color: dark ? C.n300 : C.n600 });
  const gH = 2.3, baseline = 5.0, cx = PAGE_W - MX - (gH * GLYPH_AR[glyph]) / 2 - 0.4;
  glyphOnBaseline(s, glyph, dark ? "neutral" : "ink", cx, baseline, gH);
  txt(s, "PRODUCT LINES: TRAY SEALING · THERMOFORMING · FLOW WRAPPING · VERTICAL FFS · AUTOMATION · WEIGHING AND INFEED", { x: MX, y: 6.98, w: CW, h: 0.22, fontFace: F.mono, fontSize: 8, color: C.n500, charSpacing: 1.2 });
  notes(s, "PRODUCT-LINE DIVIDER (v0.4 6.A.10.6). One equipment glyph paired with its Archivo label and sub line. The label is always present; the glyph never stands alone. Swap the glyph and label per the six product lines: Tray Sealing (glyph-tray-sealer, G. Mondini platform), Thermoforming (glyph-thermoformer, TFS / TFX series), Flow Wrapping (glyph-flow-wrapper, FM series), Vertical FFS (glyph-vffs, Bagging systems), Automation (glyph-robot, Robotics and line control), Weighing and Infeed (glyph-weigher, CabinPlant systems). Glyph is neutral on dark, ink on light; minimum 40 px display height.");
}
productLineDivider("dark", "tray-sealer", "Tray sealing", "G. Mondini platform");

// =====================================================================
// SECTION 3 · NARRATIVE (10 to 14)
// =====================================================================

// 10 — STATEMENT, DARK
s = S(C.ink);
s.addImage({ path: A("motif/glyph-motif-dark.png"), x: PAGE_W - 7.2, y: 6.05, w: 7.2, h: 7.2 / MOTIF_AR, transparency: 55 });
redRule(s, MX, 2.35);
txt(s, "We own the whole line.", { x: MX, y: 2.6, w: 11.8, h: 1.3, fontFace: F.display, fontSize: 48, color: C.paper });
txt(s, "Rockwell controls and Mondini sealing run on the line. We integrate them\nand stand behind the combined result.", { x: MX, y: 4.0, w: 9.6, h: 0.8, fontFace: F.body, fontSize: 14, color: C.n300, lineSpacingMultiple: 1.4 });
notes(s, "STATEMENT, DARK. One claim, 8 words or fewer if possible. Use before or after a dense section to reset attention. Squint test: the claim must dominate.");

// 11 — BIG NUMBER, DARK
s = S(C.ink);
eyebrow(s, "The cost of manual changeover", MX, 1.5, C.eyebrowDark);
txt(s, "47 min", { x: MX, y: 1.85, w: 11, h: 2.0, fontFace: F.monoMed, fontSize: 110, color: C.paper });
redRule(s, MX, 4.15);
txt(s, "Average changeover on the current line, timed across 12 SKU changes.", { x: MX, y: 4.4, w: 10.5, h: 0.5, fontFace: F.head, bold: true, fontSize: 20, color: C.paper });
txt(s, "Each one is lost production plus a scrap ramp at restart. At 4.6 changeovers\nper day, the line gives back more than three hours of capacity, daily.", { x: MX, y: 5.05, w: 9.6, h: 0.8, fontFace: F.body, fontSize: 12.5, color: C.n300, lineSpacingMultiple: 1.4 });
txt(s, "SOURCE: LINE ASSESSMENT WK 1 TIMING STUDY · ILLUSTRATIVE [GET]", { x: MX, y: 6.55, w: 9, h: 0.25, fontFace: F.mono, fontSize: 8, color: C.n600, charSpacing: 1.2 });
footer(s, "dark", "LINE ASSESSMENT");
notes(s, "BIG NUMBER, DARK. One number, huge, in Mono; the claim explains what it means; the source line makes it defensible. Use when a single figure carries the argument. Replace with the measured value [GET].");

// 12 — QUOTE, DARK
s = S(C.ink);
redRule(s, MX, 2.1);
txt(s, "“They quoted the changeover time before we signed.\nThe line holds it.”", { x: MX, y: 2.38, w: 11.4, h: 1.9, fontFace: F.head, bold: true, fontSize: 28, color: C.paper, lineSpacingMultiple: 1.15 });
txt(s, "OPERATIONS DIRECTOR · FROZEN FOODS PLANT · [PLACEHOLDER · REPLACE WITH APPROVED QUOTE]", { x: MX, y: 4.55, w: 11, h: 0.25, fontFace: F.mono, fontSize: 9, color: C.n500, charSpacing: 1.5 });
footer(s, "dark", "LINE ASSESSMENT");
notes(s, "QUOTE, DARK. One real, approved quote; never invent a customer voice. Attribute by role on the line. A number inside a quote is verified like any other spec.");

// 13 — QUOTE, LIGHT
s = S(C.paper);
redRule(s, MX, 2.1);
txt(s, "“The operator picks the SKU at one screen.\nEverything downstream just follows.”", { x: MX, y: 2.38, w: 11.4, h: 1.9, fontFace: F.head, bold: true, fontSize: 28, color: C.ink, lineSpacingMultiple: 1.15 });
txt(s, "PLANT ENGINEER · SEAFOOD PROCESSOR · [PLACEHOLDER · REPLACE WITH APPROVED QUOTE]", { x: MX, y: 4.55, w: 11, h: 0.25, fontFace: F.mono, fontSize: 9, color: C.n500, charSpacing: 1.5 });
footer(s, "light", "WEBINAR");
notes(s, "QUOTE, LIGHT. Mirror of the dark quote. Same rules: real, approved, attributed by role.");

// 14 — FULL-BLEED PHOTO
s = S(C.ink);
s.addImage({ path: A("photos/photo-medical-line.jpg"), x: 0, y: 0, w: PAGE_W, h: PAGE_H, sizing: { type: "cover", w: PAGE_W, h: PAGE_H } });
s.addImage({ path: A("motif/scrim-left.png"), x: 0, y: 0, w: 9.4, h: PAGE_H });
s.addImage({ path: A("logos/lockup-horizontal-white.png"), x: MX, y: 0.62, w: 1.9, h: 1.9 / LOCKUP_AR });
eyebrow(s, "Medical and pharma", MX, 4.45, C.n300);
txt(s, "Validated medical device packaging,\none accountable line.", { x: MX, y: 4.8, w: 9.6, h: 1.4, fontFace: F.display, fontSize: 30, color: "FFFFFF", lineSpacingMultiple: 1.06 });
txt(s, "ISO 11607 PROCESS VALIDATION\nTYVEK, POUCH, AND RIGID TRAY FORMATS", { x: MX, y: 6.5, w: 5.6, h: 0.55, fontFace: F.mono, fontSize: 8.5, color: C.n300, charSpacing: 1.4, lineSpacingMultiple: 1.5 });
notes(s, "FULL-BLEED PHOTO (mode-neutral). Over photography the lockup runs as the one-color white knockout (Section 3). The scrim guarantees contrast; keep text inside the scrim zone. Real installed lines only.");

// =====================================================================
// SECTION 4 · EVIDENCE AND DATA (15 to 21)
// =====================================================================

const stats3 = [
  ["120 ppm", "TRAY-SEAL THROUGHPUT"],
  ["<20 min", "TOOLING CHANGEOVER"],
  ["4 hr", "LINE-DOWN RESPONSE"],
];
function statBand(mode) {
  s = S(mode === "dark" ? C.ink : C.paper);
  const dark = mode === "dark";
  slideHeader(s, "What we commit to", "The line we stand behind, in numbers", mode);
  stats3.forEach((st, i) => {
    const x = gx(i * 4), w = gw(4) - 0.35;
    txt(s, st[0], { x, y: 2.7, w, h: 0.85, fontFace: F.monoMed, fontSize: 40, color: dark ? C.paper : C.ink });
    txt(s, st[1], { x, y: 3.62, w, h: 0.25, fontFace: F.monoMed, fontSize: 8.5, color: C.n500, charSpacing: 1.8 });
    if (i > 0) vhair(s, gx(i * 4) - GUT / 2 - 0.05, 2.75, 1.1, dark ? C.n800 : C.n200);
  });
  hair(s, MX, 4.45, CW, dark ? C.n800 : C.n200);
  txt(s, "Every figure is quoted before the line ships and measured after it runs. If a spec is at risk, you hear it from us first.", { x: MX, y: 4.75, w: 10.5, h: 0.6, fontFace: F.body, fontSize: 12.5, color: dark ? C.n300 : C.n600, lineSpacingMultiple: 1.35 });
  txt(s, "ILLUSTRATIVE FIGURES · REPLACE WITH VERIFIED SPECS BEFORE PRESENTING [GET]", { x: MX, y: 6.55, w: 10, h: 0.25, fontFace: F.mono, fontSize: 8, color: dark ? C.n600 : C.n500, charSpacing: 1.2 });
  footer(s, mode, "LINE ASSESSMENT");
  notes(s, `STAT BAND, ${mode.toUpperCase()}. Three stats max, Mono. Units follow the value with one space. Delete the [GET] line only when verified figures are in.`);
}
statBand("dark");   // 15
statBand("light");  // 16

// 17 — BEFORE / AFTER, DARK
s = S(C.ink);
slideHeader(s, "The change, measured", "Changeover before and after recipe control", "dark");
txt(s, "BEFORE · MANUAL SETPOINTS", { x: gx(0), y: 2.6, w: gw(5), h: 0.25, fontFace: F.monoMed, fontSize: 8.5, color: C.n500, charSpacing: 1.8 });
txt(s, "45 to 90 min", { x: gx(0), y: 2.95, w: gw(5), h: 0.95, fontFace: F.monoMed, fontSize: 44, color: C.n400 });
txt(s, "Crew-dependent, verified after the fact.", { x: gx(0), y: 4.0, w: gw(5), h: 0.3, fontFace: F.body, fontSize: 11, color: C.n400 });
s.addImage({ path: A("icons/arrow-right-red.png"), x: gx(5) + gw(1) / 2 - 0.02, y: 3.15, w: 0.55, h: 0.55 });
txt(s, "AFTER · RECIPE-DRIVEN", { x: gx(7), y: 2.6, w: gw(5), h: 0.25, fontFace: F.monoMed, fontSize: 8.5, color: C.n500, charSpacing: 1.8 });
txt(s, "10 to 20 min", { x: gx(7), y: 2.95, w: gw(5), h: 0.95, fontFace: F.monoMed, fontSize: 44, color: C.paper });
txt(s, "Guided, validated before restart, same result every shift.", { x: gx(7), y: 4.0, w: gw(5), h: 0.3, fontFace: F.body, fontSize: 11, color: C.n300 });
hair(s, MX, 4.75, CW, C.n800);
txt(s, "The spread is the point: recipe control does not just cut the average, it removes the variance a schedule cannot plan around.", { x: MX, y: 5.0, w: 10.8, h: 0.6, fontFace: F.body, fontSize: 12.5, color: C.n300, lineSpacingMultiple: 1.35 });
txt(s, "ILLUSTRATIVE RANGES · REPLACE WITH MEASURED VALUES [GET]", { x: MX, y: 6.55, w: 9, h: 0.25, fontFace: F.mono, fontSize: 8, color: C.n600, charSpacing: 1.2 });
footer(s, "dark", "LINE ASSESSMENT");
notes(s, "BEFORE/AFTER, DARK. Two figures, one red arrow (the single red element). The after value is white, the before value muted; the hierarchy does the arguing. Ranges use 'to'.");

// 18 — CHART BAR, LIGHT
s = S(C.paper);
slideHeader(s, "What the numbers say", "Recipe-driven changeover cut setup from 30 to 18 minutes", "light");
s.addChart(pres.ChartType.bar, [
  { name: "Changeover minutes", labels: ["Manual setpoints", "Recipe-driven"], values: [30, 18] },
], {
  x: MX, y: 2.2, w: gw(7), h: 3.9,
  barDir: "col", barGapWidthPct: 120,
  chartColors: [C.blue],
  showLegend: false, showTitle: false,
  showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.ink, dataLabelFontFace: F.monoMed, dataLabelFontSize: 11, dataLabelFormatCode: '0" min"',
  catAxisLabelColor: C.n600, catAxisLabelFontFace: F.body, catAxisLabelFontSize: 10.5, catAxisLineColor: C.n300,
  valAxisLabelColor: C.n500, valAxisLabelFontFace: F.mono, valAxisLabelFontSize: 9, valAxisLineShow: false, valAxisMaxVal: 35,
  valGridLine: { color: C.n200, size: 0.5 }, catGridLine: { style: "none" },
});
const kx = gx(8), kw = gw(4);
card(s, kx, 2.2, kw, 2.5, "light", C.n50);
txt(s, "-40%", { x: kx + 0.3, y: 2.55, w: kw - 0.6, h: 0.7, fontFace: F.monoMed, fontSize: 34, color: C.ink });
txt(s, "SETUP TIME PER SKU CHANGE", { x: kx + 0.3, y: 3.32, w: kw - 0.6, h: 0.25, fontFace: F.monoMed, fontSize: 8.5, color: C.n500, charSpacing: 1.6 });
txt(s, "At 4.6 changeovers per day, that is about an hour of production back, every day.", { x: kx + 0.3, y: 3.7, w: kw - 0.6, h: 0.8, fontFace: F.body, fontSize: 10.5, color: C.n700, lineSpacingMultiple: 1.35 });
txt(s, "ILLUSTRATIVE PILOT DATA · REPLACE WITH VERIFIED LINE DATA [GET]", { x: MX, y: 6.3, w: 8, h: 0.25, fontFace: F.mono, fontSize: 8, color: C.n500, charSpacing: 1.2 });
footer(s, "light", "WEBINAR");
notes(s, "CHART BAR, LIGHT. Headline states the takeaway; the chart is proof. Steel blue carries data (Section 4 role). Native chart: edit via right-click > Edit Data.");

// 19 — CHART LINE, DARK
s = S(C.ink);
slideHeader(s, "After go-live", "OEE climbed 16 points in eight shifts", "dark");
s.addChart(pres.ChartType.line, [
  { name: "OEE %", labels: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"], values: [62, 64, 63, 66, 71, 74, 76, 78] },
], {
  x: MX, y: 2.2, w: gw(8), h: 3.9,
  chartColors: [C.blue300],
  lineSize: 2.5, lineSmooth: false, lineDataSymbol: "none",
  showLegend: false, showTitle: false, showValue: false,
  catAxisLabelColor: C.n500, catAxisLabelFontFace: F.mono, catAxisLabelFontSize: 9, catAxisLineColor: C.n700,
  valAxisLabelColor: C.n500, valAxisLabelFontFace: F.mono, valAxisLabelFontSize: 9, valAxisLineShow: false,
  valAxisMinVal: 55, valAxisMaxVal: 85,
  valGridLine: { color: C.n800, size: 0.5 }, catGridLine: { style: "none" },
});
const lk = gx(9), lkw = gw(3);
txt(s, "78%", { x: lk, y: 2.5, w: lkw, h: 0.8, fontFace: F.monoMed, fontSize: 40, color: C.paper });
txt(s, "OEE, SHIFT 8", { x: lk, y: 3.35, w: lkw, h: 0.25, fontFace: F.monoMed, fontSize: 8.5, color: C.n500, charSpacing: 1.8 });
hair(s, lk, 3.85, lkw - 0.3, C.n800);
txt(s, "62%", { x: lk, y: 4.05, w: lkw, h: 0.55, fontFace: F.monoMed, fontSize: 24, color: C.n400 });
txt(s, "OEE, SHIFT 1", { x: lk, y: 4.62, w: lkw, h: 0.25, fontFace: F.monoMed, fontSize: 8.5, color: C.n500, charSpacing: 1.8 });
txt(s, "ILLUSTRATIVE TREND · REPLACE WITH MEASURED OEE FROM THE LINE [GET]", { x: MX, y: 6.3, w: 9, h: 0.25, fontFace: F.mono, fontSize: 8, color: C.n600, charSpacing: 1.2 });
footer(s, "dark", "LINE ASSESSMENT");
notes(s, "CHART LINE, DARK. Trend data in blue-300 (the dark-surface data color). No markers, no smoothing, quiet grid. The kicker column repeats the start and end values in Mono so the delta reads without the axis.");

// 20 — COMPARISON TABLE, LIGHT
s = S(C.paper);
slideHeader(s, "Options", "Three paths to the rate you need", "light");
const tblRows = [
  [
    { text: "", options: { fill: { color: C.paper } } },
    { text: "Upgrade in place", options: { bold: true } },
    { text: "Integrated line", options: { bold: true, fill: { color: C.n50 } } },
    { text: "New greenfield", options: { bold: true } },
  ],
  ["Throughput gain", "+10 to 15%", { text: "+35 to 50%", options: { fill: { color: C.n50 }, fontFace: F.monoMed } }, "+50% and up"],
  ["Tooling changeover", "unchanged", { text: "< 20 min", options: { fill: { color: C.n50 }, fontFace: F.monoMed } }, "< 20 min"],
  ["Integration risk", "stays with you", { text: "owned by us", options: { fill: { color: C.n50 }, fontFace: F.bodySemi } }, "owned by us"],
  ["Typical timeline", "8 to 10 wk", { text: "16 to 20 wk", options: { fill: { color: C.n50 }, fontFace: F.monoMed } }, "40+ wk"],
  ["Budget band", "$", { text: "$$", options: { fill: { color: C.n50 }, fontFace: F.monoMed } }, "$$$$"],
];
const normRows = tblRows.map((row, ri) => row.map((cell, ci) => {
  const base = typeof cell === "string" ? { text: cell, options: {} } : { text: cell.text, options: Object.assign({}, cell.options) };
  base.options = Object.assign({
    fontFace: ci === 0 ? F.bodySemi : F.body, fontSize: 10.5,
    color: ri === 0 ? C.ink : (ci === 0 ? C.ink : C.n700),
    align: "left", valign: "middle",
    border: [{ type: "solid", color: C.n200, pt: 0.5 }],
    margin: [0.06, 0.12, 0.06, 0.12],
  }, base.options);
  if (ri === 0 && ci > 0) base.options.fontSize = 11;
  return base;
}));
s.addTable(normRows, { x: MX, y: 2.1, w: CW, rowH: 0.62, colW: [3.2, 2.93, 2.93, 2.93], border: { type: "solid", color: C.n200, pt: 0.5 } });
txt(s, "ILLUSTRATIVE RANGES · REPLACE WITH THE QUOTED FIGURES FOR THIS LINE [GET]", { x: MX, y: 6.3, w: 8, h: 0.25, fontFace: F.mono, fontSize: 8, color: C.n500, charSpacing: 1.2 });
footer(s, "light", "WEBINAR");
notes(s, "COMPARISON TABLE, LIGHT. Neutral header, hairlines, figures in Mono. Recommended column gets the n50 tint and weight, never a colored band. Ranges use 'to'.");

// 21 — EVIDENCE QUOTES, LIGHT
s = S(C.paper);
slideHeader(s, "The evidence", "Changeover cost is documented, not anecdotal", "light");
const ev = [
  ["“Changeovers are not only time-consuming but are also accompanied by production losses … with significant financial loss.”", "STAPELBROEK ET AL., 2024 · RUG RESEARCH"],
  ["“Crucial production time is lost every hour equipment sits idle during changeovers.”", "REINKE, 2013 · MANUFACTURING.NET"],
  ["“High-mix, high-volume operations result in increased setups and changeovers, impacting efficiency and profitability.”", "CRB GROUP, 2015"],
];
ev.forEach((e, i) => {
  const y = 2.2 + i * 1.35;
  txt(s, e[0], { x: MX, y, w: gw(8), h: 0.95, fontFace: F.body, fontSize: 12, color: C.n700, lineSpacingMultiple: 1.35 });
  txt(s, e[1], { x: gx(8) + 0.2, y: y + 0.04, w: gw(4) - 0.2, h: 0.6, align: "right", fontFace: F.mono, fontSize: 8.5, color: C.n500, charSpacing: 1, lineSpacingMultiple: 1.4 });
  if (i < ev.length - 1) hair(s, MX, y + 1.08, CW, C.n200);
});
footer(s, "light", "WEBINAR");
notes(s, "EVIDENCE, LIGHT. Sourced third-party quotes, Mono citations right-aligned. Every quote keeps its source. Three max.");

// =====================================================================
// SECTION 5 · SOLUTIONS AND SCOPE (22 to 33)
// =====================================================================

// 22 — THREE CARDS, DARK
s = S(C.ink);
slideHeader(s, "How we work", "One accountable integrator, three commitments", "dark");
const commits = [
  ["uptime", "Accountability", "We own the line after the sale. Support is staffed by people who know your installed line, with response measured in hours."],
  ["gauge", "Excellence", "We hold the line to stated throughput, tolerance, and changeover times, and we are willing to publish them."],
  ["checklist", "Integrity", "We quote what the line will actually do. If a spec is at risk, you hear it from us first."],
];
commits.forEach((cd, i) => {
  const x = gx(i * 4), w = gw(4) - 0.18, y = 2.05, h = 3.45;
  card(s, x, y, w, h, "dark");
  iconChip(s, cd[0], x + 0.3, y + 0.32, "dark");
  txt(s, cd[1], { x: x + 0.3, y: y + 1.1, w: w - 0.6, h: 0.35, fontFace: F.bodySemi, fontSize: 14.5, color: C.paper });
  txt(s, cd[2], { x: x + 0.3, y: y + 1.55, w: w - 0.6, h: 1.7, fontFace: F.body, fontSize: 11, color: C.n300, lineSpacingMultiple: 1.4 });
});
footer(s, "dark", "LINE ASSESSMENT");
notes(s, "THREE CARDS, DARK. One idea per card, 40 words max each. Cards lift by hairline border, not luminance. Icons monochrome.");

// 23 — OFFERINGS 3-UP, LIGHT
s = S(C.paper);
slideHeader(s, "Solutions", "The line, in three scopes", "light");
const offers = [
  ["tray-seal", "Tray sealing", "G. Mondini Trave and Cigno lines, integrated and supported product to pallet."],
  ["thermoform", "Thermoforming", "The TFX platform for higher throughput and recyclable materials."],
  ["automation", "Automation", "ULMA robot loading and full-line integration on Allen-Bradley controls."],
];
offers.forEach((o, i) => {
  const x = gx(i * 4), w = gw(4) - 0.18, y = 2.05, h = 4.0;
  card(s, x, y, w, h, "light");
  iconChip(s, o[0], x + 0.3, y + 0.32, "light");
  txt(s, o[1], { x: x + 0.3, y: y + 1.1, w: w - 0.6, h: 0.35, fontFace: F.bodySemi, fontSize: 14.5, color: C.ink });
  txt(s, o[2], { x: x + 0.3, y: y + 1.55, w: w - 0.6, h: 1.6, fontFace: F.body, fontSize: 11, color: C.n600, lineSpacingMultiple: 1.4 });
  txt(s, "View solution", { x: x + 0.3, y: y + h - 0.62, w: 2, h: 0.3, fontFace: F.bodySemi, fontSize: 11, color: C.blue, underline: true });
});
footer(s, "light", "WEBINAR");
notes(s, "OFFERINGS, LIGHT. Steel blue carries links (underlined). Cards name real machines, not 'solutions'.");

// 24 — CONTENT + PHOTO, LIGHT
s = S(C.paper);
slideHeader(s, "The approach", "You tell us the product and the rate.\nWe spec the line that hits it.", "light", gw(6) + 0.4);
const bl = [
  "One project owner spans Harpak-ULMA and every partner brand on the line. You never integrate vendors.",
  "Recipes push new product specs to every HMI at once, so a SKU change is a selection, not a procedure.",
  "The line auto-validates readiness before start, so a missed setting shows up before scrap does.",
];
bl.forEach((b, i) => {
  const y = 2.75 + i * 1.05;
  s.addImage({ path: A("icons/check-ink.png"), x: MX, y: y + 0.03, w: 0.22, h: 0.22 });
  txt(s, b, { x: MX + 0.42, y, w: gw(6) - 0.42, h: 0.95, fontFace: F.body, fontSize: 12, color: C.n700, lineSpacingMultiple: 1.35 });
});
const p24x = gx(7), p24w = gw(5);
s.addImage({ path: A("photos/photo-machine-bagger.jpg"), x: p24x, y: 1.55, w: p24w, h: 4.55, sizing: { type: "cover", w: p24w, h: 4.55 } });
txt(s, "ULMA VERTICAL BAGGER ON A MULTI-SKU SEAFOOD LINE", { x: p24x, y: 6.25, w: p24w, h: 0.25, fontFace: F.mono, fontSize: 7.5, color: C.n500, charSpacing: 1 });
footer(s, "light", "WEBINAR");
notes(s, "CONTENT + PHOTO, LIGHT. Claim headline, three proof rows, real equipment photo with a Mono caption naming the machine.");

// 25 — MACHINE + SPEC, DARK
s = S(C.ink);
slideHeader(s, "Solutions / Tray sealing", "One tray-seal line, held to its numbers", "dark");
const specX = MX, specY = 2.1, specW = gw(5);
card(s, specX, specY, specW, 4.15, "dark");
txt(s, "G. MONDINI · PLATFORM", { x: specX + 0.3, y: specY + 0.28, w: specW - 0.6, h: 0.2, fontFace: F.monoMed, fontSize: 8, color: C.n500, charSpacing: 1.8 });
txt(s, "Trave tray sealer", { x: specX + 0.3, y: specY + 0.52, w: specW - 2.0, h: 0.35, fontFace: F.bodySemi, fontSize: 15, color: C.paper });
glyphTag(s, "tray-sealer", "neutral", specX + specW - 0.9, specY + 0.26, 0.44); // header id, wayfinding not decoration
const spec = [
  ["Throughput", "up to 120 ppm"],
  ["Tooling changeover", "< 20 min"],
  ["Formats per tool", "multiple"],
  ["Control platform", "Allen-Bradley"],
  ["Reference part", "RA-4520"],
];
spec.forEach((rw, i) => {
  const y = specY + 1.15 + i * 0.58;
  txt(s, rw[0], { x: specX + 0.3, y: y + 0.08, w: 2.4, h: 0.3, fontFace: F.mono, fontSize: 10, color: C.n400 });
  txt(s, rw[1], { x: specX + specW - 2.9, y: y + 0.08, w: 2.6, h: 0.3, align: "right", fontFace: F.monoMed, fontSize: 10.5, color: C.paper });
  if (i < spec.length - 1) hair(s, specX + 0.3, y + 0.5, specW - 0.6, C.borderDark);
});
const phX = gx(5) + 0.1, phW = gw(7) - 0.1;
s.addImage({ path: A("photos/photo-pouches-dark.jpg"), x: phX, y: 2.1, w: phW, h: 3.7, sizing: { type: "cover", w: phW, h: 3.7 } });
txt(s, "MULTIPLE PACK FORMATS THROUGH A SINGLE LINE · REAL EQUIPMENT PHOTOGRAPHY", { x: phX, y: 5.95, w: phW, h: 0.3, fontFace: F.mono, fontSize: 7.5, color: C.n500, charSpacing: 1 });
footer(s, "dark", "LINE ASSESSMENT");
notes(s, "MACHINE + SPEC, DARK. Specs lead. All figures in Mono with units; part numbers always Mono. Replace with actual machine spec [GET].");

// 26 — MACHINE LINEUP, DARK
s = S(C.ink);
slideHeader(s, "The hardware on this line", "Three machines, one control layer", "dark");
const lineup = [
  ["photos/photo-machine-bagger.jpg", 1439 / 1388, "ULMA VB 44", "Vertical bagger, multihead weigher infeed", ["120 bpm", "11 SKUs"], "vffs"],
  ["photos/photo-machine-bagger-2.jpg", 764 / 977, "ULMA TFX 500", "Thermoformer, recyclable film ready", ["120 mm draw", "<20 min"], "thermoformer"],
  ["photos/photo-line-hmi-ui.jpg", 995 / 679, "Line control", "Allen-Bradley recipe layer, one HMI", ["1 recipe", "5 machines"], null],
];
lineup.forEach((m, i) => {
  const x = gx(i * 4), w = gw(4) - 0.18, y = 2.05, h = 4.35;
  card(s, x, y, w, h, "dark");
  s.addShape(pres.ShapeType.roundRect, { x: x + 0.22, y: y + 0.22, w: w - 0.44, h: 1.95, rectRadius: R_CARD, fill: { color: C.paper } });
  containImg(s, A(m[0]), m[1], x + 0.32, y + 0.3, w - 0.64, 1.79);
  const nameX = m[5] ? x + 0.28 + 0.44 * GLYPH_AR[m[5]] + 0.18 : x + 0.28;
  if (m[5]) glyphTag(s, m[5], "neutral", x + 0.28, y + 2.34, 0.44); // optional header id
  txt(s, m[2], { x: nameX, y: y + 2.35, w: x + w - 0.28 - nameX, h: 0.32, fontFace: F.bodySemi, fontSize: 13.5, color: C.paper });
  txt(s, m[3], { x: x + 0.28, y: y + 2.75, w: w - 0.56, h: 0.55, fontFace: F.body, fontSize: 10.5, color: C.n300, lineSpacingMultiple: 1.3 });
  m[4].forEach((chip, j) => {
    const cx = x + 0.28 + j * 1.55;
    s.addShape(pres.ShapeType.roundRect, { x: cx, y: y + 3.5, w: 1.42, h: 0.42, rectRadius: R_BTN, fill: { color: C.chipDark }, line: { color: C.borderDark, width: 0.5 } });
    txt(s, chip, { x: cx, y: y + 3.5, w: 1.42, h: 0.42, align: "center", valign: "middle", fontFace: F.monoMed, fontSize: 9.5, color: C.n300 });
  });
});
txt(s, "MACHINE NAMES AND FIGURES ILLUSTRATIVE · REPLACE WITH THE QUOTED LINE [GET]", { x: MX, y: 6.6, w: 9, h: 0.25, fontFace: F.mono, fontSize: 8, color: C.n600, charSpacing: 1.2 });
footer(s, "dark", "LINE ASSESSMENT");
notes(s, "MACHINE LINEUP, DARK. Three machine cards: photo on a white inset panel (equipment photography stays on neutral), name, role, two Mono spec chips. Use for the proposed line's bill of machines.");

// 27 — PROCESS MOTIF, LIGHT (recomposed on equipment glyphs, 6.A.10.5)
s = S(C.paper);
slideHeader(s, "The product-to-pallet line", "Product to pallet, one accountable line", "light");
{
  const stations = [
    ["weigher", "INFEED", "CabinPlant weigher"],
    ["thermoformer", "FORM", "TFS thermoformer"],
    ["tray-sealer", "SEAL", "Mondini Trave"],
    ["robot", "LOAD", "ULMA robot"],
    ["case-packer", "PACK", "Case packer"],
    ["palletizer", "PALLET", "Palletizer"],
  ];
  const nCol = 7, colw = CW / nCol, baseline = 4.15, gH = 0.72;
  s.addShape(pres.ShapeType.line, { x: MX, y: baseline, w: CW, h: 0, line: { color: C.n300, width: 1.5 } });
  stations.forEach((st, i) => {
    const cx = MX + (i + 0.5) * colw;
    glyphOnBaseline(s, st[0], "ink", cx, baseline, gH);
    txt(s, st[1], { x: cx - colw / 2, y: baseline + 0.16, w: colw, h: 0.2, align: "center", fontFace: F.monoMed, fontSize: 8, color: C.n600, charSpacing: 1.6 });
    txt(s, st[2], { x: cx - colw / 2, y: baseline + 0.4, w: colw, h: 0.5, align: "center", fontFace: F.body, fontSize: 9.5, color: C.ink, lineSpacingMultiple: 1.2 });
  });
  // Aura ring floated slightly above the baseline at the end
  const rcx = MX + 6.5 * colw, rH = 0.6;
  s.addImage({ path: A("logos/aura-ring.png"), x: rcx - rH / 2, y: baseline - 0.16 - rH, w: rH, h: rH });
  txt(s, "AURA", { x: rcx - colw / 2, y: baseline + 0.16, w: colw, h: 0.2, align: "center", fontFace: F.monoMed, fontSize: 8, color: C.n600, charSpacing: 1.6 });
  txt(s, "Line intelligence", { x: rcx - colw / 2, y: baseline + 0.4, w: colw, h: 0.5, align: "center", fontFace: F.body, fontSize: 9.5, color: C.ink });
}
txt(s, "Stations swap to match the quoted line. A vertical line runs weigher, VFFS, case packer. Never show a station the quote does not include.", { x: MX, y: 5.55, w: 10.8, h: 0.5, fontFace: F.body, fontSize: 10.5, color: C.n500 });
footer(s, "light", "WEBINAR");
notes(s, "PROCESS MOTIF, LIGHT (v0.4 6.A.10.5). Stations are equipment glyphs on a shared 2 px baseline, feet touching, real machine names below an eyebrow cap. The Aura ring floats slightly above the baseline at the end, labeled AURA / Line intelligence. Default order: weigher, thermoformer, tray sealer, robot, case packer, palletizer, ring. Swap stations to match the quoted line; never show a station the quote does not include (vertical example: weigher, VFFS, case packer). Glyphs are ink on light; at most one red accent dot per slide on the mechanism of the station discussed, default zero.");

// 28 — TIMELINE, LIGHT
s = S(C.paper);
slideHeader(s, "From decision to running line", "From assessment to accountable line", "light");
const steps = [
  ["WK 0 to 2", "Line assessment", "Product, rates, constraints, measured on site"],
  ["WK 2 to 6", "Line spec and quote", "Throughput and changeover commitments in writing"],
  ["WK 6 to 22", "Build and integrate", "Machines, controls, and recipes as one system"],
  ["WK 22 to 26", "FAT and install", "Acceptance against the quoted numbers"],
  ["ONGOING", "Uptime ownership", "Parts, response, and the number you call"],
];
const tlY = 3.3, stepW = CW / 5;
s.addShape(pres.ShapeType.line, { x: MX + 0.2, y: tlY, w: CW - 0.4, h: 0, line: { color: C.n300, width: 1.5 } });
steps.forEach((st, i) => {
  const cx = MX + stepW * i + 0.2;
  const last = i === steps.length - 1;
  s.addShape(pres.ShapeType.ellipse, { x: cx - 0.07, y: tlY - 0.07, w: 0.14, h: 0.14, fill: { color: last ? C.red : C.ink } });
  txt(s, st[0], { x: cx - 0.05, y: tlY - 0.62, w: stepW - 0.3, h: 0.25, fontFace: F.monoMed, fontSize: 8.5, color: last ? C.red600 : C.n500, charSpacing: 1.4 });
  txt(s, st[1], { x: cx - 0.05, y: tlY + 0.3, w: stepW - 0.3, h: 0.35, fontFace: F.bodySemi, fontSize: 12.5, color: C.ink });
  txt(s, st[2], { x: cx - 0.05, y: tlY + 0.72, w: stepW - 0.35, h: 0.85, fontFace: F.body, fontSize: 9.5, color: C.n600, lineSpacingMultiple: 1.3 });
});
txt(s, "ILLUSTRATIVE DURATIONS · REPLACE WITH THE PROJECT PLAN FOR THIS LINE [GET]", { x: MX, y: 6.3, w: 8, h: 0.25, fontFace: F.mono, fontSize: 8, color: C.n500, charSpacing: 1.2 });
footer(s, "light", "WEBINAR");
notes(s, "TIMELINE, LIGHT. Five nodes max; the single red node marks the current or decision step.");

// 29 — ROADMAP, DARK
s = S(C.ink);
slideHeader(s, "Rollout", "Four quarters from first line to full-plant recipes", "dark");
const quarters = [
  ["Q3 2026", "Line 1 conversion", "Bagging line to recipe control; baseline OEE captured", false],
  ["Q4 2026", "Lines 2 and 3", "Tray-seal and thermoform lines onto the same layer", true],
  ["Q1 2027", "Aura Edge pilot", "Fault prediction on the highest-scrap line", false],
  ["Q2 2027", "Plant standard", "One recipe model, every line, one service owner", false],
];
const rmY = 2.85, qW = CW / 4;
s.addShape(pres.ShapeType.line, { x: MX + 0.2, y: rmY, w: CW - 0.4, h: 0, line: { color: C.n700, width: 1.5 } });
quarters.forEach((q, i) => {
  const cx = MX + qW * i + 0.2;
  s.addShape(pres.ShapeType.ellipse, { x: cx - 0.07, y: rmY - 0.07, w: 0.14, h: 0.14, fill: { color: q[3] ? C.red : C.paper } });
  txt(s, q[0], { x: cx - 0.05, y: rmY - 0.6, w: qW - 0.4, h: 0.25, fontFace: F.monoMed, fontSize: 9.5, color: q[3] ? C.red400 : C.n500, charSpacing: 1.6 });
  txt(s, q[1], { x: cx - 0.05, y: rmY + 0.32, w: qW - 0.4, h: 0.35, fontFace: F.bodySemi, fontSize: 13, color: C.paper });
  txt(s, q[2], { x: cx - 0.05, y: rmY + 0.75, w: qW - 0.45, h: 0.85, fontFace: F.body, fontSize: 10, color: C.n300, lineSpacingMultiple: 1.35 });
});
hair(s, MX, 5.15, CW, C.n800);
txt(s, "Each phase ships with its own acceptance numbers. No phase starts until the last one holds its spec for 30 days.", { x: MX, y: 5.4, w: 10.5, h: 0.6, fontFace: F.body, fontSize: 12, color: C.n300, lineSpacingMultiple: 1.35 });
txt(s, "ILLUSTRATIVE PLAN · DATE THE PHASES TO THE SIGNED PROJECT [GET]", { x: MX, y: 6.55, w: 9, h: 0.25, fontFace: F.mono, fontSize: 8, color: C.n600, charSpacing: 1.2 });
footer(s, "dark", "LINE ASSESSMENT");
notes(s, "ROADMAP, DARK. Quarters in Mono; the red node is the quarter being decided in this meeting. Four phases max; more belongs in a project plan, not a slide.");

// 30 — 2x2 CAPABILITY GRID, LIGHT
s = S(C.paper);
slideHeader(s, "Scope", "What one accountable integrator covers", "light");
const caps = [
  ["line-flow", "Line design and integration", "Machines, controls, conveyance, and recipes specified as one system."],
  ["gauge", "Stated performance", "Throughput, tolerance, and changeover quoted in writing and measured after install."],
  ["service", "Service and parts", "Parts same day, a technician on site within 4 hours of a line-down call."],
  ["shield", "Compliance and hygiene", "Washdown design, food safety, and validation support where the line demands it."],
];
caps.forEach((cp, i) => {
  const col = i % 2, r = Math.floor(i / 2);
  const x = gx(col * 6), w = gw(6) - 0.25, y = 2.1 + r * 2.15;
  iconChip(s, cp[0], x, y, "light", 0.5);
  txt(s, cp[1], { x: x + 0.75, y: y + 0.02, w: w - 0.8, h: 0.32, fontFace: F.bodySemi, fontSize: 13.5, color: C.ink });
  txt(s, cp[2], { x: x + 0.75, y: y + 0.42, w: w - 0.8, h: 0.9, fontFace: F.body, fontSize: 11, color: C.n600, lineSpacingMultiple: 1.35 });
});
txt(s, "SERVICE FIGURES ILLUSTRATIVE · REPLACE WITH THE PUBLISHED COMMITMENT [GET]", { x: MX, y: 6.5, w: 8, h: 0.25, fontFace: F.mono, fontSize: 8, color: C.n500, charSpacing: 1.2 });
footer(s, "light", "WEBINAR");
notes(s, "2x2 GRID, LIGHT. Four capabilities max; icon + claim + one line of proof.");

// 31 — INDUSTRIES 3-UP, LIGHT
s = S(C.paper);
slideHeader(s, "Where the lines run", "Food first, then medical, then consumer goods", "light");
const inds = [
  ["photos/photo-pouches-dark.jpg", "FOOD", "Washdown lines for fresh, frozen, and proteins. The volume priority."],
  ["photos/photo-medical-line.jpg", "MEDICAL AND PHARMA", "Validated packaging: Tyvek, pouch, and rigid tray under ISO 11607."],
  ["photos/photo-pack-dark.jpg", "CONSUMER GOODS", "Format flexibility for retail-ready and e-commerce packs."],
];
inds.forEach((ind, i) => {
  const x = gx(i * 4), w = gw(4) - 0.18, y = 2.05;
  s.addImage({ path: A(ind[0]), x, y, w, h: 2.5, sizing: { type: "cover", w, h: 2.5 } });
  txt(s, ind[1], { x, y: y + 2.72, w, h: 0.24, fontFace: F.monoMed, fontSize: 9, color: C.red600, charSpacing: 1.8 });
  txt(s, ind[2], { x, y: y + 3.02, w: w - 0.1, h: 0.85, fontFace: F.body, fontSize: 11, color: C.n700, lineSpacingMultiple: 1.35 });
});
txt(s, "INTERIM PHOTOS FROM FOOD LINES · REPLACE PER VERTICAL WHEN APPROVED IMAGERY EXISTS [GET]", { x: MX, y: 6.5, w: 9, h: 0.25, fontFace: F.mono, fontSize: 8, color: C.n500, charSpacing: 1.2 });
footer(s, "light", "WEBINAR");
notes(s, "INDUSTRIES, LIGHT. Vertical priority per the owner: food, then medical and pharma, then consumer goods. Red Mono eyebrows are the accent; keep the photos real. The consumer-goods photo is a food pack standing in until vertical-specific imagery exists [GET].");

// 32 — CERTIFICATIONS, LIGHT
s = S(C.paper);
slideHeader(s, "Compliance", "The paperwork ships with the line", "light");
const certs = ["ISO 11607-1", "USDA SANITARY", "CE MACHINERY", "UL 508A PANELS", "3-A SSI"];
certs.forEach((cert, i) => {
  const w = (CW - 4 * 0.3) / 5, x = MX + i * (w + 0.3), y = 2.35;
  card(s, x, y, w, 1.5, "light");
  s.addImage({ path: A("icons/badge-ink.png"), x: x + w / 2 - 0.17, y: y + 0.24, w: 0.34, h: 0.34 });
  txt(s, cert, { x: x + 0.08, y: y + 0.78, w: w - 0.16, h: 0.5, align: "center", fontFace: F.monoMed, fontSize: 9, color: C.n700, charSpacing: 1, lineSpacingMultiple: 1.3 });
});
txt(s, "Design files, validation protocols, and acceptance records are deliverables, not extras. Ask for the compliance binder from a recent install.", { x: MX, y: 4.4, w: 10.5, h: 0.6, fontFace: F.body, fontSize: 12, color: C.n600, lineSpacingMultiple: 1.35 });
txt(s, "VERIFY THE APPLICABLE CERTIFICATIONS PER LINE BEFORE PRESENTING [GET]", { x: MX, y: 6.5, w: 9, h: 0.25, fontFace: F.mono, fontSize: 8, color: C.n500, charSpacing: 1.2 });
footer(s, "light", "WEBINAR");
notes(s, "CERTIFICATIONS, LIGHT. Neutral chips, Mono labels, badge icon. This is a claims surface: confirm every certification applies to the quoted line before it ships [GET].");

// 33 — DO / DON'T, LIGHT
s = S(C.paper);
slideHeader(s, "Verbal identity in practice", "Say the spec, not the slogan", "light");
const doItems = [
  "Tray sealing at up to 120 ppm, with tooling changeover under 20 minutes.",
  "Parts shipped same day. A technician on site within 4 hours.",
  "Aura reads line data and flags a fault before the line stops.",
];
const dontItems = [
  "End-to-end solutions that drive innovation.",
  "World-class service and support.",
  "AI-powered insights for smart packaging.",
];
function ddCard(x, title, items, icon, iconColor, tint) {
  const w = gw(6) - 0.18, y = 2.05, h = 4.2;
  card(s, x, y, w, h, "light", tint);
  s.addImage({ path: A(`icons/${icon}-${iconColor}.png`), x: x + 0.3, y: y + 0.32, w: 0.3, h: 0.3 });
  txt(s, title, { x: x + 0.75, y: y + 0.33, w: 3, h: 0.32, fontFace: F.bodySemi, fontSize: 14, color: C.ink });
  items.forEach((it, i) => {
    const iy = y + 1.05 + i * 1.0;
    txt(s, it, { x: x + 0.3, y: iy, w: w - 0.6, h: 0.9, fontFace: F.body, fontSize: 11.5, color: C.n700, lineSpacingMultiple: 1.3 });
    if (i < items.length - 1) hair(s, x + 0.3, iy + 0.82, w - 0.6, C.n200);
  });
}
ddCard(gx(0), "Say this", doItems, "check", "green", C.greenTint);
ddCard(gx(6), "Not this", dontItems, "x", "red700", C.red100);
txt(s, "FULL BANNED AND WATCH LIST: BRAND BOOK SECTION 2 · SEMANTIC TINTS CARRY STATUS ONLY, NEVER DECORATION", { x: MX, y: 6.55, w: CW, h: 0.25, fontFace: F.mono, fontSize: 7.5, color: C.n500, charSpacing: 1 });
footer(s, "light", "WEBINAR");
notes(s, "DO/DON'T, LIGHT. Semantic tints pair with an icon and text so color is never the only signal.");

// =====================================================================
// SECTION 6 · PEOPLE (34 to 37)
// =====================================================================

// 34 — BIO HERO, LIGHT
s = S(C.paper);
slideHeader(s, "Your presenter", "Eighteen years on packaging lines", "light");
s.addImage({ path: A("photos/headshot-marchand-rounded.png"), x: MX, y: 2.15, w: 1.9, h: 1.9 });
txt(s, "Mike Marchand", { x: MX, y: 4.25, w: 3.4, h: 0.42, fontFace: F.headSemi, fontSize: 18, color: C.ink });
txt(s, "Senior product manager\nMultihead weighers and vertical baggers", { x: MX, y: 4.72, w: 3.6, h: 0.6, fontFace: F.body, fontSize: 11, color: C.n600, lineSpacingMultiple: 1.35 });
txt(s, "M.MARCHAND@HARPAK-ULMA.COM", { x: MX, y: 5.55, w: 3.6, h: 0.24, fontFace: F.mono, fontSize: 8.5, color: C.n500, charSpacing: 1 });
const bx = gx(4), bw = gw(5) - 0.2;
txt(s, "Mike specs weighing and bagging lines for food processors across North America. He ran changeover on a multihead line before he ever quoted one, and it shows: his line specs read like a shift plan, not a brochure. Lately he leads the recipe-driven changeover program on multi-SKU seafood and frozen lines.", { x: bx, y: 2.2, w: bw, h: 2.6, fontFace: F.body, fontSize: 12, color: C.n700, lineSpacingMultiple: 1.45 });
const fx = gx(9), fw = gw(3);
card(s, fx, 2.15, fw, 3.65, "light", C.n50);
const facts = [["18 yr", "ON PACKAGING LINES"], ["60+", "LINES COMMISSIONED"], ["11", "SKUS ON HIS LAST LINE"]];
facts.forEach((f, i) => {
  const y = 2.5 + i * 1.1;
  txt(s, f[0], { x: fx + 0.3, y, w: fw - 0.6, h: 0.5, fontFace: F.monoMed, fontSize: 24, color: C.ink });
  txt(s, f[1], { x: fx + 0.3, y: y + 0.55, w: fw - 0.6, h: 0.22, fontFace: F.monoMed, fontSize: 7.5, color: C.n500, charSpacing: 1.6 });
  if (i < 2) hair(s, fx + 0.3, y + 0.92, fw - 0.6, C.n200);
});
footer(s, "light", "WEBINAR");
notes(s, "BIO HERO, LIGHT. One presenter, full treatment: square photo with the 8 px radius, name in Archivo, bio written by what they do on the line (never adjectives; podcast rule, Section 11), Mono facts rail. Photo guidance: neutral background when reshot; this studio-blue interim shot is acceptable until then. Bio 60 words max.");

// 35 — BIO DUAL, DARK
s = S(C.ink);
slideHeader(s, "Your presenters", "Who's on the line tonight", "dark");
const duo = [
  ["photo", "Mike Marchand", "Senior product manager", "Weighers and baggers. Runs the recipe-driven changeover program.", "M.MARCHAND@HARPAK-ULMA.COM"],
  ["DW", "Dana Whitfield", "Field service engineer", "Tray-seal installs and commissioning. The number you call at 2 a.m.", "D.WHITFIELD@HARPAK-ULMA.COM"],
];
duo.forEach((sp, i) => {
  const x = gx(i * 6), w = gw(6) - 0.25, y = 2.2, h = 3.4;
  card(s, x, y, w, h, "dark");
  if (sp[0] === "photo") {
    s.addImage({ path: A("photos/headshot-marchand-rounded.png"), x: x + 0.3, y: y + 0.35, w: 1.15, h: 1.15 });
  } else {
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.3, y: y + 0.35, w: 1.15, h: 1.15, rectRadius: R_CARD, fill: { color: C.chipDark } });
    txt(s, sp[0], { x: x + 0.3, y: y + 0.35, w: 1.15, h: 1.15, align: "center", valign: "middle", fontFace: F.monoMed, fontSize: 16, color: C.n500 });
  }
  txt(s, sp[1], { x: x + 1.75, y: y + 0.42, w: w - 2.1, h: 0.4, fontFace: F.headSemi, fontSize: 16, color: C.paper });
  txt(s, sp[2], { x: x + 1.75, y: y + 0.88, w: w - 2.1, h: 0.3, fontFace: F.body, fontSize: 11.5, color: C.n400 });
  hair(s, x + 0.3, y + 1.85, w - 0.6, C.borderDark);
  txt(s, sp[3], { x: x + 0.3, y: y + 2.05, w: w - 0.6, h: 0.6, fontFace: F.body, fontSize: 10.5, color: C.n300, lineSpacingMultiple: 1.35 });
  txt(s, sp[4], { x: x + 0.3, y: y + 2.8, w: w - 0.6, h: 0.25, fontFace: F.mono, fontSize: 8.5, color: C.n500, charSpacing: 1 });
});
footer(s, "dark", "LINE ASSESSMENT");
notes(s, "BIO DUAL, DARK. Two presenters. Photos use the rounded square chip; the initials chip is the placeholder until a real headshot exists. Describe each person by what they do on the line.");

// 36 — TEAM GRID, LIGHT
s = S(C.paper);
slideHeader(s, "The project team", "One owner, and the people behind the number", "light");
const team = [
  ["photo", "Mike Marchand", "Product · weighers and baggers", "M.MARCHAND@HARPAK-ULMA.COM"],
  ["DW", "Dana Whitfield", "Field service · tray sealing", "D.WHITFIELD@HARPAK-ULMA.COM"],
  ["RK", "Reyna Koh", "Project owner · your one contact", "R.KOH@HARPAK-ULMA.COM"],
];
team.forEach((tm, i) => {
  const x = gx(i * 4), w = gw(4) - 0.18, y = 2.2, h = 3.1;
  card(s, x, y, w, h, "light");
  if (tm[0] === "photo") {
    s.addImage({ path: A("photos/headshot-marchand-rounded.png"), x: x + 0.3, y: y + 0.35, w: 1.05, h: 1.05 });
  } else {
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.3, y: y + 0.35, w: 1.05, h: 1.05, rectRadius: R_CARD, fill: { color: C.n100 } });
    txt(s, tm[0], { x: x + 0.3, y: y + 0.35, w: 1.05, h: 1.05, align: "center", valign: "middle", fontFace: F.monoMed, fontSize: 14, color: C.n500 });
  }
  txt(s, tm[1], { x: x + 0.3, y: y + 1.6, w: w - 0.6, h: 0.35, fontFace: F.headSemi, fontSize: 14, color: C.ink });
  txt(s, tm[2], { x: x + 0.3, y: y + 2.0, w: w - 0.6, h: 0.5, fontFace: F.body, fontSize: 10.5, color: C.n600, lineSpacingMultiple: 1.3 });
  txt(s, tm[3], { x: x + 0.3, y: y + 2.55, w: w - 0.6, h: 0.24, fontFace: F.mono, fontSize: 8, color: C.n500, charSpacing: 0.8 });
});
txt(s, "EXTEND TO SIX BY DUPLICATING THE ROW · THE PROJECT OWNER CARD ALWAYS NAMES THE ONE CONTACT", { x: MX, y: 5.75, w: CW, h: 0.25, fontFace: F.mono, fontSize: 7.5, color: C.n500, charSpacing: 1 });
footer(s, "light", "LINE ASSESSMENT");
notes(s, "TEAM GRID, LIGHT. Three cards per row, six max per slide. The one-contact model is the point: the project owner card carries the claim. Replace initials chips with photos as they exist.");

// 37 — SPEAKERS, LIGHT (webinar house style)
s = S(C.paper);
slideHeader(s, "Your presenters", "Who you'll hear from", "light");
const speakers = [
  ["MM", "Mike Marchand", "Senior product manager", "Multihead weighers and vertical baggers", "M.MARCHAND@HARPAK-ULMA.COM"],
  ["DW", "Dana Whitfield", "Field service engineer", "Tray-seal installs and line commissioning", "D.WHITFIELD@HARPAK-ULMA.COM"],
];
speakers.forEach((sp, i) => {
  const x = gx(i * 6), w = gw(6) - 0.25, y = 2.2, h = 3.3;
  card(s, x, y, w, h, "light");
  s.addShape(pres.ShapeType.roundRect, { x: x + 0.3, y: y + 0.35, w: 1.15, h: 1.15, rectRadius: R_CARD, fill: { color: C.n100 } });
  txt(s, sp[0], { x: x + 0.3, y: y + 0.35, w: 1.15, h: 1.15, align: "center", valign: "middle", fontFace: F.monoMed, fontSize: 16, color: C.n500 });
  txt(s, sp[1], { x: x + 1.75, y: y + 0.42, w: w - 2.1, h: 0.4, fontFace: F.headSemi, fontSize: 16, color: C.ink });
  txt(s, sp[2], { x: x + 1.75, y: y + 0.88, w: w - 2.1, h: 0.3, fontFace: F.body, fontSize: 11.5, color: C.n600 });
  hair(s, x + 0.3, y + 1.85, w - 0.6, C.n200);
  txt(s, sp[3], { x: x + 0.3, y: y + 2.05, w: w - 0.6, h: 0.55, fontFace: F.body, fontSize: 10.5, color: C.n700, lineSpacingMultiple: 1.35 });
  txt(s, sp[4], { x: x + 0.3, y: y + 2.75, w: w - 0.6, h: 0.25, fontFace: F.mono, fontSize: 8.5, color: C.n500, charSpacing: 1 });
});
txt(s, "REPLACE THE INITIALS CHIP WITH A PHOTO: SQUARE CROP, NEUTRAL BACKGROUND, 8 PX RADIUS (SEE SLIDE 34)", { x: MX, y: 6.0, w: CW, h: 0.25, fontFace: F.mono, fontSize: 7.5, color: C.n500, charSpacing: 1 });
footer(s, "light", "WEBINAR");
notes(s, "SPEAKERS, LIGHT. Compact two-up for webinars. For a fuller treatment use the bio hero (34) or bio dual (35).");

// =====================================================================
// SECTION 7 · PARTNERS (38 to 41)
// =====================================================================

const partnerData = [
  ["rockwell", "TECHNOLOGY AND PLATFORM", "Controls and information layer: FactoryTalk, Allen-Bradley."],
  ["rama", "END-OF-LINE PACKAGING", "Case packing, cartoning, and wrap-around. Added via ULMA."],
  ["cabinplant", "PROCESSING PARTNER", "Food processing and weighing systems."],
  ["mondini", "EXCLUSIVE NA SUPPLY", "Tray sealing. We are the exclusive North American source."],
];
function partnerWall(mode) {
  s = S(mode === "dark" ? C.ink : C.paper);
  slideHeader(s, "The ecosystem", "Category specialists, one accountable line", mode);
  partnerData.forEach((p, i) => {
    const x = gx(i * 3), w = gw(3) - 0.14, y = 2.15, h = 3.3;
    card(s, x, y, w, h, "light");
    txt(s, p[1], { x: x + 0.24, y: y + 0.28, w: w - 0.48, h: 0.4, fontFace: F.monoMed, fontSize: 7.5, color: C.n500, charSpacing: 1.4 });
    markSlot(s, p[0], x + 0.24, y + 0.72, w - 0.48, 1.0);
    txt(s, p[2], { x: x + 0.24, y: y + 1.95, w: w - 0.48, h: 1.2, fontFace: F.body, fontSize: 10, color: C.n600, lineSpacingMultiple: 1.35 });
  });
  txt(s, "REFERENCE MARKS FROM SUPPLIED FILES · PRODUCTION REQUIRES PARTNER-APPROVED VECTORS [GET] · NEVER RECOLOR OR RESTYLE · KEEP 1 S CLEAR OF BRAND RED", { x: MX, y: 5.75, w: CW, h: 0.25, fontFace: F.mono, fontSize: 7.5, color: C.n500, charSpacing: 1 });
  footer(s, mode, "LINE ASSESSMENT");
  notes(s, `PARTNER WALL, ${mode.toUpperCase()}. Full-color marks on uniform white cards (marks never sit on the dark field or on red). RAMA shows the placeholder wordmark until the official vector arrives [GET]. Every card pairs the mark with what the partner does on the line; a logo wall with no claims is banned by the brief. Rockwell red-proximity ruling applies.`);
}
partnerWall("light"); // 38
partnerWall("dark");  // 39

// 40 — BUILT-WITH STRIP + CO-BRAND CONTEXTS, LIGHT
s = S(C.paper);
slideHeader(s, "Co-branding", "Four weights of partner presence", "light");
card(s, MX, 2.0, CW, 1.0, "light", C.paper);
txt(s, "BUILT WITH", { x: MX + 0.3, y: 2.38, w: 1.3, h: 0.24, fontFace: F.monoMed, fontSize: 8.5, color: C.n500, charSpacing: 1.8 });
["rockwell", "rama", "cabinplant", "mondini"].forEach((p, i) => {
  containImg(s, A(`partners/${p}.png`), PART_AR[p], MX + 1.9 + i * 2.55, 2.2, 2.25, 0.6);
});
const ctxs = [
  ["A", "Endorsement badge", "The partner's own issued badge, used exactly as issued."],
  ["B", "Built-on credit", "Text preferred: 'Runs on Rockwell Allen-Bradley controls.'"],
  ["C", "Ecosystem wall", "Full-color marks on uniform neutral cards. The default."],
  ["D", "Formal co-brand lockup", "Only with a written agreement and partner sign-off. LEGAL gate."],
];
ctxs.forEach((c, i) => {
  const y = 3.5 + i * 0.78;
  txt(s, c[0], { x: MX, y: y + 0.02, w: 0.5, h: 0.35, fontFace: F.monoMed, fontSize: 15, color: C.n400 });
  txt(s, c[1], { x: MX + 0.6, y, w: 3.4, h: 0.3, fontFace: F.bodySemi, fontSize: 12.5, color: C.ink });
  txt(s, c[2], { x: MX + 4.2, y: y + 0.02, w: CW - 4.2, h: 0.35, fontFace: F.body, fontSize: 11, color: C.n600 });
  if (i < 3) hair(s, MX, y + 0.55, CW, C.n200);
});
txt(s, "LIGHTEST WEIGHT THAT DOES THE JOB WINS · WHEN IN DOUBT, USE B AND FLAG TO MARKETING", { x: MX, y: 6.65, w: CW, h: 0.25, fontFace: F.mono, fontSize: 7.5, color: C.n500, charSpacing: 1 });
footer(s, "light", "LINE ASSESSMENT");
notes(s, "BUILT-WITH + CONTEXTS, LIGHT. The strip is context C in practice: uniform marks on one neutral band, no recoloring, generous spacing. Contexts A to D are the escalation ladder; D requires a written agreement and counsel (Section 7).");

// 41 — PARTNER DETAIL, LIGHT
s = S(C.paper);
slideHeader(s, "Partner detail", "Rockwell on the line: controls, data, and one owner", "light");
card(s, MX, 2.1, gw(5), 3.9, "light");
markSlot(s, "rockwell", MX + 0.3, 2.4, gw(5) - 0.6, 1.1);
txt(s, "TECHNOLOGY AND PLATFORM", { x: MX + 0.3, y: 3.7, w: gw(5) - 0.6, h: 0.22, fontFace: F.monoMed, fontSize: 7.5, color: C.n500, charSpacing: 1.6 });
txt(s, "ControlLogix and Kinetix run the machines. FactoryTalk carries recipes, telemetry, and the data model Aura reads. We engineer on it; you keep one control standard.", { x: MX + 0.3, y: 3.98, w: gw(5) - 0.6, h: 1.3, fontFace: F.body, fontSize: 11, color: C.n700, lineSpacingMultiple: 1.4 });
txt(s, "CREDIT LINE: 'RUNS ON ROCKWELL ALLEN-BRADLEY CONTROLS'", { x: MX + 0.3, y: 5.45, w: gw(5) - 0.6, h: 0.4, fontFace: F.mono, fontSize: 8, color: C.n500, charSpacing: 1 });
const rrX = gx(6), rrW = gw(6);
const rrRules = [
  "Use the partner-approved vector mark only; this raster is reference [GET].",
  "The mark stays on white or neutral cards, never on the dark field or red.",
  "Keep 1 S of neutral separation from any brand-red element.",
  "Never recolor, restyle, crop, or rebuild the mark.",
];
rrRules.forEach((r, i) => {
  const y = 2.3 + i * 0.75;
  s.addImage({ path: A("icons/check-ink.png"), x: rrX, y: y + 0.02, w: 0.22, h: 0.22 });
  txt(s, r, { x: rrX + 0.4, y, w: rrW - 0.4, h: 0.6, fontFace: F.body, fontSize: 11, color: C.n700, lineSpacingMultiple: 1.3 });
});
card(s, rrX, 5.35, rrW, 0.95, "light", C.n50);
s.addImage({ path: A("icons/alert-ink.png"), x: rrX + 0.25, y: 5.62, w: 0.32, h: 0.32 });
txt(s, "Red proximity: brand red and Rockwell red read as one hue. Never adjacent, never on the same band, never harmonized.", { x: rrX + 0.75, y: 5.55, w: rrW - 1.0, h: 0.65, fontFace: F.body, fontSize: 10, color: C.n700, lineSpacingMultiple: 1.3 });
footer(s, "light", "LINE ASSESSMENT");
notes(s, "PARTNER DETAIL, LIGHT. One partner deep: mark on a neutral slot, role stated as what it does on the line, the approved credit line in Mono, and the compliance rules beside it. Duplicate per partner as needed.");

// =====================================================================
// SECTION 8 · AURA (42 to 44)
// =====================================================================

// 42 — AURA SUB-BRAND, NAVY
s = S(C.navy);
s.addImage({ path: A("logos/aura-ring.png"), x: PAGE_W - MX - 1.15, y: 0.52, w: 1.15, h: 1.15 });
eyebrow(s, "Aura by Harpak-ULMA", MX, 0.56, C.teal);
headline(s, "Aura reads line data and flags the fault\nbefore the line stops", 0.9, "dark", 24, 9.6);
const auraRows = [
  ["Source-grounded answers", "Every answer cites the document it came from."],
  ["Confidence tier on every answer", "High, medium, or low, stated up front."],
  ["Safety before any procedure", "Full LOTO callout before a panel opens."],
];
auraRows.forEach((r, i) => {
  const y = 2.5 + i * 1.15;
  txt(s, r[0], { x: MX, y, w: 5.6, h: 0.32, fontFace: F.bodySemi, fontSize: 13.5, color: "FFFFFF" });
  txt(s, r[1], { x: MX, y: y + 0.38, w: 5.6, h: 0.3, fontFace: F.body, fontSize: 11, color: C.n300 });
  if (i < 2) hair(s, MX, y + 0.88, 5.6, C.navyBorder);
});
const apX = gx(7), apW = gw(5), apY = 2.4, apH = 3.6;
s.addShape(pres.ShapeType.roundRect, { x: apX, y: apY, w: apW, h: apH, rectRadius: R_CARD, fill: { color: C.navySurface }, line: { color: C.navyBorder, width: 0.75 } });
txt(s, "AURA · LANE 2", { x: apX + 0.3, y: apY + 0.3, w: apW - 0.6, h: 0.22, fontFace: F.monoMed, fontSize: 8.5, color: C.teal, charSpacing: 1.8 });
txt(s, "Seal temperature dropped on Lane 2.", { x: apX + 0.3, y: apY + 0.65, w: apW - 0.6, h: 0.35, fontFace: F.bodySemi, fontSize: 13.5, color: "FFFFFF" });
txt(s, "Check tooling. Tap to view trend.", { x: apX + 0.3, y: apY + 1.05, w: apW - 0.6, h: 0.3, fontFace: F.body, fontSize: 11.5, color: C.n300 });
hair(s, apX + 0.3, apY + 1.62, apW - 0.6, C.navyBorder);
txt(s, "SEAL TEMP            178 C, falling\nTHRESHOLD            180 to 200 C\nTREND                12 min decline", { x: apX + 0.3, y: apY + 1.85, w: apW - 0.6, h: 1.0, fontFace: F.mono, fontSize: 9.5, color: C.n300, lineSpacingMultiple: 1.6 });
txt(s, "CONFIDENCE HIGH · SOURCE: TFS-407 MANUAL 4.2", { x: apX + 0.3, y: apY + 3.05, w: apW - 0.6, h: 0.25, fontFace: F.monoMed, fontSize: 8, color: C.teal, charSpacing: 1.2 });
txt(s, "PRODUCT SURFACE SHOWN AS ILLUSTRATION · REAL UI SCREENSHOTS CARRY THE AURA PRODUCT SYSTEM (DM SANS)", { x: MX, y: 6.5, w: CW, h: 0.25, fontFace: F.mono, fontSize: 7.5, color: C.n500, charSpacing: 1 });
footer(s, "dark", "LINE ASSESSMENT");
notes(s, "AURA SUB-BRAND (Section 8, Option B). Deep Navy surface; the ring is the only gradient and is never filled. Signature: 'Aura by Harpak-ULMA'. Steel blue never appears here (two blues, scope-separated). DM Sans only inside real product screenshots.");

// 43 — AURA EDGE EVENT, DARK
s = S(C.ink);
s.addImage({ path: A("logos/lockup-horizontal-reversed.png"), x: MX, y: 0.62, w: 1.9, h: 1.9 / LOCKUP_AR });
s.addImage({ path: A("logos/aura-ring.png"), x: PAGE_W - MX - 1.5, y: 0.62, w: 1.5, h: 1.5 });
eyebrow(s, "Automation Fair 2026", MX, 2.5, C.eyebrowDark);
txt(s, "One line. One number to call.", { x: MX, y: 2.85, w: 11.6, h: 1.2, fontFace: F.display, fontSize: 44, color: C.paper });
txt(s, [
  { text: "AURA ", options: { color: "FFFFFF" } },
  { text: "EDGE", options: { color: C.teal } },
  { text: "  by Harpak-ULMA", options: { color: C.n300, fontFace: F.body, fontSize: 13 } },
], { x: MX, y: 4.3, w: 8, h: 0.45, fontFace: F.bodySemi, fontSize: 16, charSpacing: 2 });
txt(s, "Calling faults before they stop the line. Live on a running tray-seal demo, twice a day.", { x: MX, y: 4.85, w: 9.4, h: 0.4, fontFace: F.body, fontSize: 13, color: C.n300 });
txt(s, "BOOTH C-4120 · DEMOS 10:30 AND 14:30 · PACK EXPO 2026 · AUTOMATION FAIR 2026", { x: MX, y: 6.75, w: 10, h: 0.25, fontFace: F.mono, fontSize: 8.5, color: C.n500, charSpacing: 1.5 });
notes(s, "AURA EDGE EVENT, DARK. Booth and session slide. The EDGE-in-accent wordmark treatment is illustrative; drop in the official Aura Edge lockup artwork when placing this in production [GET]. The ring is the only gradient. External signature stays 'Aura Edge by Harpak-ULMA'. On the show floor the default field is white (Section 10); this dark variant is for screens and low-light stages.");

// 44 — DEMO / VIDEO FRAME, DARK
s = S(C.ink);
slideHeader(s, "The demo", "Watch the line catch its own fault", "dark");
const vfX = MX, vfW = gw(8), vfH = vfW * 9 / 16 * 0.72;
s.addShape(pres.ShapeType.roundRect, { x: vfX, y: 2.15, w: vfW, h: 4.0, rectRadius: R_CARD, fill: { color: C.cardDark }, line: { color: C.borderDark, width: 0.75 } });
s.addImage({ path: A("photos/photo-line-hmi-ui.jpg"), x: vfX + 0.12, y: 2.27, w: vfW - 0.24, h: 3.76, sizing: { type: "cover", w: vfW - 0.24, h: 3.76 }, transparency: 25 });
s.addShape(pres.ShapeType.roundRect, { x: vfX + vfW / 2 - 0.42, y: 3.73, w: 0.84, h: 0.84, rectRadius: R_CARD, fill: { color: C.red } });
s.addImage({ path: A("icons/play-white.png"), x: vfX + vfW / 2 - 0.21, y: 3.94, w: 0.42, h: 0.42 });
const dsX = gx(9), dsW = gw(3);
txt(s, "DEMO SCRIPT RULES", { x: dsX, y: 2.3, w: dsW, h: 0.24, fontFace: F.monoMed, fontSize: 8.5, color: C.n500, charSpacing: 1.8 });
const demoRules = ["Action-first. What it does in plant terms, then how.", "A real fault prediction, not a canned reel.", "Confidence tier and cited source on every claim."];
demoRules.forEach((r, i) => {
  const y = 2.7 + i * 1.05;
  txt(s, r, { x: dsX, y, w: dsW, h: 0.95, fontFace: F.body, fontSize: 10.5, color: C.n300, lineSpacingMultiple: 1.35 });
  if (i < 2) hair(s, dsX, y + 0.82, dsW, C.n800);
});
txt(s, "REPLACE THE POSTER WITH A REAL CAPTURE · EMBED VIA INSERT > VIDEO · KEEP THE 16:9 FRAME", { x: MX, y: 6.55, w: 10, h: 0.25, fontFace: F.mono, fontSize: 7.5, color: C.n500, charSpacing: 1 });
footer(s, "dark", "LINE ASSESSMENT");
notes(s, "DEMO / VIDEO FRAME, DARK. The media card holds a poster frame until a real video is embedded (Insert > Video over the frame). The red play chip is the one red element. Demo script rules come from Section 11: action-first, real prediction, confidence and source on every claim.");

// =====================================================================
// SECTION 9 · COMMERCIAL AND CLOSING (45 to 51)
// =====================================================================

// 45 — CASE STUDY, LIGHT
s = S(C.paper);
slideHeader(s, "Case study · Frozen foods", "Film scrap down 15 percent,\npayback in 9 months", "light", gw(6));
txt(s, [
  { text: "The challenge. ", options: { fontFace: F.bodySemi, color: C.ink } },
  { text: "Eleven SKUs on one bagging line, with manual setpoint entry at every HMI. Recipe mismatches turned every changeover into startup scrap.", options: {} },
], { x: MX, y: 2.5, w: gw(6) - 0.2, h: 1.2, fontFace: F.body, fontSize: 11.5, color: C.n700, lineSpacingMultiple: 1.4 });
txt(s, [
  { text: "The approach. ", options: { fontFace: F.bodySemi, color: C.ink } },
  { text: "One integrated recipe layer on Allen-Bradley controls. The operator selects the SKU once; bag length, label data, and weigher targets update together, and the line validates readiness before start.", options: {} },
], { x: MX, y: 3.75, w: gw(6) - 0.2, h: 1.5, fontFace: F.body, fontSize: 11.5, color: C.n700, lineSpacingMultiple: 1.4 });
const csx = gx(7), csw = gw(5);
s.addImage({ path: A("photos/photo-operator-hmi.jpg"), x: csx, y: 1.55, w: csw, h: 2.9, sizing: { type: "cover", w: csw, h: 2.9 } });
card(s, csx, 4.65, csw, 1.55, "light", C.ink);
txt(s, "15%", { x: csx + 0.35, y: 4.92, w: 2, h: 0.65, fontFace: F.monoMed, fontSize: 30, color: "FFFFFF" });
txt(s, "FILM SCRAP REDUCTION", { x: csx + 0.35, y: 5.6, w: 2.2, h: 0.22, fontFace: F.monoMed, fontSize: 7.5, color: C.n400, charSpacing: 1.4 });
txt(s, "9 mo", { x: csx + 2.75, y: 4.92, w: 2, h: 0.65, fontFace: F.monoMed, fontSize: 30, color: "FFFFFF" });
txt(s, "PAYBACK ON THE RETROFIT", { x: csx + 2.75, y: 5.6, w: 2.2, h: 0.22, fontFace: F.monoMed, fontSize: 7.5, color: C.n400, charSpacing: 1.4 });
vhair(s, csx + 2.55, 4.95, 0.95, C.n700);
txt(s, "OPERATOR AT THE LINE HMI · REAL PPE, LEGIBLE SCREEN", { x: csx, y: 6.32, w: csw, h: 0.22, fontFace: F.mono, fontSize: 7.5, color: C.n500, charSpacing: 1 });
txt(s, "ILLUSTRATIVE CASE · REPLACE WITH A NAMED, APPROVED INSTALL [GET]", { x: MX, y: 6.32, w: gw(6), h: 0.25, fontFace: F.mono, fontSize: 8, color: C.n500, charSpacing: 1.2 });
footer(s, "light", "WEBINAR");
notes(s, "CASE STUDY, LIGHT. Challenge, approach, measured result in the ink panel. Every figure sourced or [GET].");

// 46 — COMMERCIAL OPTIONS, LIGHT
s = S(C.paper);
slideHeader(s, "Commercial", "Three ways to buy the same accountability", "light");
const opts = [
  ["Upgrade in place", "$", ["Recipe layer on existing machines", "Control migration, no new iron", "Service contract on the result"], false],
  ["Integrated line", "$$", ["New machines where they pay back", "One control layer, one recipe model", "Throughput and changeover in writing", "Uptime ownership after install"], true],
  ["New greenfield", "$$$$", ["Full line design, product to pallet", "Every stage specified as one system", "Commissioning and training included"], false],
];
opts.forEach((o, i) => {
  const x = gx(i * 4), w = gw(4) - 0.18, y = 2.05, h = 4.15;
  card(s, x, y, w, h, "light", o[3] ? C.n50 : C.paper);
  if (o[3]) txt(s, "RECOMMENDED FOR THIS LINE", { x: x + 0.28, y: y + 0.24, w: w - 0.56, h: 0.2, fontFace: F.monoMed, fontSize: 7.5, color: C.red600, charSpacing: 1.6 });
  txt(s, o[0], { x: x + 0.28, y: y + 0.5, w: w - 0.56, h: 0.35, fontFace: F.bodySemi, fontSize: 14.5, color: C.ink });
  txt(s, o[1], { x: x + 0.28, y: y + 0.92, w: w - 0.56, h: 0.4, fontFace: F.monoMed, fontSize: 16, color: C.n600 });
  o[2].forEach((row, j) => {
    const ry = y + 1.55 + j * 0.62;
    s.addImage({ path: A("icons/check-ink.png"), x: x + 0.28, y: ry + 0.02, w: 0.2, h: 0.2 });
    txt(s, row, { x: x + 0.58, y: ry, w: w - 0.86, h: 0.55, fontFace: F.body, fontSize: 10, color: C.n700, lineSpacingMultiple: 1.25 });
  });
});
txt(s, "BUDGET BANDS ILLUSTRATIVE · PRICE TO THE QUOTED LINE [GET]", { x: MX, y: 6.5, w: 8, h: 0.25, fontFace: F.mono, fontSize: 8, color: C.n500, charSpacing: 1.2 });
footer(s, "light", "LINE ASSESSMENT");
notes(s, "COMMERCIAL OPTIONS, LIGHT. Three scopes, same accountability claim. The recommended tag in red Mono is the slide's one red element; the n50 tint does the rest. Never more than four included rows per card.");

// 47 — FAQ, LIGHT
s = S(C.paper);
slideHeader(s, "Questions we get", "Asked in every assessment, answered up front", "light");
const faqs = [
  ["Do we have to replace machines that still run?", "No. The recipe layer runs on existing iron where the controls allow. New machines only where the payback is shown."],
  ["What happens to our operators?", "They stop re-keying setpoints and start supervising changeovers. Training is part of commissioning, not an extra."],
  ["Who do we call when something stops?", "One number. The project owner spans us and every partner brand on the line."],
  ["What if the line misses the quoted numbers?", "The commitments are in writing and measured at FAT. If a spec is at risk, you hear it from us first."],
];
faqs.forEach((f, i) => {
  const col = i % 2, r = Math.floor(i / 2);
  const x = gx(col * 6), w = gw(6) - 0.3, y = 2.15 + r * 1.95;
  txt(s, f[0], { x, y, w, h: 0.55, fontFace: F.bodySemi, fontSize: 12.5, color: C.ink, lineSpacingMultiple: 1.2 });
  txt(s, f[1], { x, y: y + 0.62, w, h: 0.95, fontFace: F.body, fontSize: 10.5, color: C.n600, lineSpacingMultiple: 1.35 });
  if (r < 1) hair(s, x, y + 1.68, w, C.n200);
});
footer(s, "light", "LINE ASSESSMENT");
notes(s, "FAQ, LIGHT. Four questions max, real ones from sales calls. Answers hold the voice: plain, specific, honest about limits. No question marks in headlines elsewhere; this is the one Q-and-A surface.");

// 48 — SUMMARY + NEXT STEP, LIGHT
s = S(C.paper);
slideHeader(s, "Summary", "Three things to take back to the plant", "light");
const takeaways = [
  ["01", "Variety is a systems problem", "SKU count is not the enemy. Uncoordinated machines are."],
  ["02", "Recipes beat procedures", "A selection at one HMI beats a checklist at five."],
  ["03", "One owner for uptime", "A multi-vendor line should still have one number to call."],
];
takeaways.forEach((t, i) => {
  const y = 2.25 + i * 1.3;
  txt(s, t[0], { x: MX, y, w: 0.8, h: 0.5, fontFace: F.monoMed, fontSize: 18, color: C.n400 });
  txt(s, t[1], { x: MX + 0.85, y, w: gw(7) - 0.85, h: 0.32, fontFace: F.bodySemi, fontSize: 13.5, color: C.ink });
  txt(s, t[2], { x: MX + 0.85, y: y + 0.4, w: gw(7) - 0.85, h: 0.35, fontFace: F.body, fontSize: 11, color: C.n600 });
  if (i < 2) hair(s, MX, y + 0.98, gw(7), C.n200);
});
const nx = gx(8), nw = gw(4);
card(s, nx, 2.25, nw, 3.4, "light", C.n50);
txt(s, "NEXT STEP", { x: nx + 0.3, y: 2.6, w: nw - 0.6, h: 0.22, fontFace: F.monoMed, fontSize: 8.5, color: C.n500, charSpacing: 1.8 });
txt(s, "Book the two-week line assessment.", { x: nx + 0.3, y: 2.92, w: nw - 0.6, h: 0.8, fontFace: F.bodySemi, fontSize: 15, color: C.ink, lineSpacingMultiple: 1.2 });
txt(s, "We measure the current line and quote the rate, changeover, and uptime we will commit to.", { x: nx + 0.3, y: 3.85, w: nw - 0.6, h: 0.95, fontFace: F.body, fontSize: 10.5, color: C.n600, lineSpacingMultiple: 1.35 });
s.addImage({ path: A("icons/arrow-right-red.png"), x: nx + 0.3, y: 5.05, w: 0.3, h: 0.3 });
footer(s, "light", "WEBINAR");
notes(s, "SUMMARY, LIGHT. Three takeaways, each a claim with support. The red arrow is the one accent and points at the same ask as the closer.");

// 49 — CLOSING CTA, DARK
s = S(C.ink);
eyebrow(s, "The ask", MX, 1.5, C.eyebrowDark);
txt(s, "One line. One number to call.", { x: MX, y: 1.85, w: 11.5, h: 1.1, fontFace: F.display, fontSize: 40, color: C.paper });
txt(s, "Approve the two-week line assessment and we will spec the line that hits your rate,\nwith the changeover and uptime commitments in writing.", { x: MX, y: 3.05, w: 10, h: 0.8, fontFace: F.body, fontSize: 13.5, color: C.n300, lineSpacingMultiple: 1.4 });
s.addShape(pres.ShapeType.roundRect, { x: MX, y: 4.25, w: 3.15, h: 0.58, rectRadius: R_BTN, fill: { color: C.red } });
txt(s, "Request a line assessment", { x: MX, y: 4.25, w: 3.15, h: 0.58, align: "center", valign: "middle", fontFace: F.bodySemi, fontSize: 12.5, color: "FFFFFF" });
txt(s, "PACKAGING@HARPAK-ULMA.COM   ·   +1 508 555 0142 [PLACEHOLDER]   ·   HARPAK-ULMA.COM", { x: MX, y: 5.15, w: 10, h: 0.25, fontFace: F.mono, fontSize: 9, color: C.n500, charSpacing: 1.2 });
s.addImage({ path: A("logos/lockup-horizontal-reversed.png"), x: MX, y: 6.55, w: 1.9, h: 1.9 / LOCKUP_AR });
s.addImage({ path: A("motif/glyph-motif-dark.png"), x: PAGE_W - MX - 5.6, y: 6.45, w: 5.6, h: 5.6 / MOTIF_AR, transparency: 45 });
notes(s, "CLOSING, DARK. The final slide is the ask with a date, never 'Thank you'. One red button, 4 px radius.");

// 50 — CLOSING CTA, LIGHT
s = S(C.paper);
eyebrow(s, "The ask", MX, 1.5, C.n500);
txt(s, "One line. One number to call.", { x: MX, y: 1.85, w: 11.5, h: 1.1, fontFace: F.display, fontSize: 40, color: C.ink });
txt(s, "Approve the two-week line assessment and we will spec the line that hits your rate,\nwith the changeover and uptime commitments in writing.", { x: MX, y: 3.05, w: 10, h: 0.8, fontFace: F.body, fontSize: 13.5, color: C.n600, lineSpacingMultiple: 1.4 });
s.addShape(pres.ShapeType.roundRect, { x: MX, y: 4.25, w: 3.15, h: 0.58, rectRadius: R_BTN, fill: { color: C.red } });
txt(s, "Request a line assessment", { x: MX, y: 4.25, w: 3.15, h: 0.58, align: "center", valign: "middle", fontFace: F.bodySemi, fontSize: 12.5, color: "FFFFFF" });
txt(s, "PACKAGING@HARPAK-ULMA.COM   ·   +1 508 555 0142 [PLACEHOLDER]   ·   HARPAK-ULMA.COM", { x: MX, y: 5.15, w: 10, h: 0.25, fontFace: F.mono, fontSize: 9, color: C.n500, charSpacing: 1.2 });
s.addImage({ path: A("logos/lockup-horizontal-color.png"), x: MX, y: 6.55, w: 1.9, h: 1.9 / LOCKUP_AR });
s.addImage({ path: A("motif/glyph-motif-light.png"), x: PAGE_W - MX - 5.6, y: 6.45, w: 5.6, h: 5.6 / MOTIF_AR });
notes(s, "CLOSING, LIGHT. Identical anatomy to the dark closer. White on red-500 passes AA at 4.91:1.");

// 51 — CONTACT, LIGHT
s = S(C.paper);
slideHeader(s, "Contact", "One number to call", "light");
const contacts = [
  ["pin", "Headquarters", "175 John Quincy Adams Rd\nTaunton, MA 02780"],
  ["service", "Line-down service", "+1 508 555 0142 [PLACEHOLDER]\nParts same day. Technician within 4 hours [GET]"],
  ["doc", "Sales and assessments", "PACKAGING@HARPAK-ULMA.COM\nHARPAK-ULMA.COM"],
];
contacts.forEach((c, i) => {
  const y = 2.35 + i * 1.35;
  iconChip(s, c[0], MX, y, "light", 0.5);
  txt(s, c[1], { x: MX + 0.75, y: y + 0.0, w: 3.4, h: 0.3, fontFace: F.bodySemi, fontSize: 12.5, color: C.ink });
  txt(s, c[2], { x: MX + 0.75, y: y + 0.36, w: gw(6) - 0.75, h: 0.75, fontFace: F.mono, fontSize: 9.5, color: C.n600, charSpacing: 0.5, lineSpacingMultiple: 1.5 });
  if (i < 2) hair(s, MX, y + 1.12, gw(6), C.n200);
});
const cpx = gx(7), cpw = gw(5);
s.addImage({ path: A("photos/photo-operator-hmi.jpg"), x: cpx, y: 1.55, w: cpw, h: 4.55, sizing: { type: "cover", w: cpw, h: 4.55 } });
txt(s, "THE PEOPLE WHO ANSWER KNOW YOUR INSTALLED LINE", { x: cpx, y: 6.25, w: cpw, h: 0.25, fontFace: F.mono, fontSize: 7.5, color: C.n500, charSpacing: 1 });
footer(s, "light", "LINE ASSESSMENT");
notes(s, "CONTACT, LIGHT. Contact details in Mono (they are data). Verify the address, phone, and service commitment before shipping [GET]; the placeholders are intentional guards.");

// =====================================================================
// SECTION 10 · GOVERNANCE (52 to 54)
// =====================================================================

// 52 — APPENDIX + LEGAL, LIGHT
s = S(C.paper);
txt(s, "A", { x: MX, y: 1.7, w: 4, h: 1.7, fontFace: F.monoMed, fontSize: 92, color: C.n300 });
redRule(s, MX, 3.62);
txt(s, "Appendix", { x: MX, y: 3.85, w: 10.5, h: 0.9, fontFace: F.head, bold: true, fontSize: 32, color: C.ink });
txt(s, "Reference material. Not presented live.", { x: MX, y: 4.62, w: 9, h: 0.4, fontFace: F.body, fontSize: 13, color: C.n600 });
txt(s, "CONFIDENTIAL · FOR THE NAMED RECIPIENT\nPERFORMANCE FIGURES ARE QUOTED PER LINE AND VERIFIED AT FAT\nAURA AND AURA EDGE NAMING SUBJECT TO COUNSEL CLEARANCE\nPARTNER MARKS BELONG TO THEIR OWNERS AND FOLLOW EACH PARTNER'S GUIDELINES", { x: MX, y: 5.75, w: 11, h: 1.0, fontFace: F.mono, fontSize: 8, color: C.n500, charSpacing: 1, lineSpacingMultiple: 1.6 });
notes(s, "APPENDIX + LEGAL. Overflow lives here. The four Mono lines are the standing legal and governance footers; keep them intact.");

// 53 — CHEAT SHEET (BUILDERS)
s = S(C.paper);
slideHeader(s, "For deck builders · Delete before presenting", "The system on one slide", "light");
const chips = [
  ["Ink", C.ink], ["Red 500", C.red], ["Red 600", C.red600], ["Blue 600", C.blue],
  ["N600", C.n600], ["N200", C.n200], ["N50", C.n50], ["Navy (Aura)", C.navy],
];
chips.forEach((ch, i) => {
  const x = MX + (i % 4) * 1.5, y = 2.15 + Math.floor(i / 4) * 1.06;
  s.addShape(pres.ShapeType.roundRect, { x, y, w: 1.32, h: 0.52, rectRadius: R_CARD / 2, fill: { color: ch[1] }, line: { color: C.n200, width: 0.5 } });
  txt(s, `${ch[0].toUpperCase()} ${ch[1]}`, { x, y: y + 0.56, w: 1.5, h: 0.2, fontFace: F.mono, fontSize: 7.5, color: C.n500 });
});
const tx = gx(7);
txt(s, "Display · Archivo ExtraBold", { x: tx, y: 2.1, w: 5.2, h: 0.45, fontFace: F.display, fontSize: 20, color: C.ink });
txt(s, "Heading · Archivo Bold", { x: tx, y: 2.62, w: 5.2, h: 0.38, fontFace: F.head, bold: true, fontSize: 16, color: C.ink });
txt(s, "Emphasis · Inter SemiBold", { x: tx, y: 3.06, w: 5.2, h: 0.32, fontFace: F.bodySemi, fontSize: 12.5, color: C.ink });
txt(s, "Body · Inter Regular, 11 to 13 pt, line 1.35", { x: tx, y: 3.42, w: 5.2, h: 0.3, fontFace: F.body, fontSize: 11.5, color: C.n700 });
txt(s, "DATA · JETBRAINS MONO · 120 PPM · RA-4520", { x: tx, y: 3.78, w: 5.2, h: 0.28, fontFace: F.monoMed, fontSize: 10, color: C.n700, charSpacing: 1 });
hair(s, MX, 4.65, CW, C.n200);
const rules = [
  "One red element per slide. If two reds both look clickable, one is wrong.",
  "Headlines are claims in sentence case, 12 words max. Body 40 words max.",
  "Figures, units, and part numbers in Mono. Ranges use 'to', never a dash.",
  "No banned words: seamless, unlock, AI-powered, world-class, cutting-edge, end-to-end.",
  "Grid: 0.67 in margins, 12 columns, 0.25 in gutters. Radius: 4 px buttons, 8 px cards.",
  "Every figure is verified or tagged [GET]. Delete slides 04 and 54 before presenting.",
];
rules.forEach((r, i) => {
  const col = i % 2, rr = Math.floor(i / 2);
  txt(s, r, { x: gx(col * 6), y: 4.85 + rr * 0.62, w: gw(6) - 0.3, h: 0.55, fontFace: F.body, fontSize: 10, color: C.n700, lineSpacingMultiple: 1.25 });
});
footer(s, "light", "TEMPLATE");
notes(s, "CHEAT SHEET. Build reference only; delete before presenting (with the index, slide 04). Fonts required: Archivo, Inter, JetBrains Mono (assets/fonts install kit).");

// 54 — BACK COVER, DARK
s = S(C.ink);
s.addImage({ path: A("logos/lockup-horizontal-reversed.png"), x: MX, y: 2.9, w: 3.4, h: 3.4 / LOCKUP_AR });
redRule(s, MX, 3.75);
txt(s, "Product to pallet.", { x: MX, y: 3.98, w: 8, h: 0.6, fontFace: F.head, bold: true, fontSize: 22, color: C.paper });
txt(s, "HARPAK-ULMA.COM · TAUNTON, MASSACHUSETTS", { x: MX, y: 6.98, w: 8, h: 0.22, fontFace: F.mono, fontSize: 8.5, color: C.n500, charSpacing: 1.5 });
s.addImage({ path: A("motif/glyph-motif-dark.png"), x: PAGE_W - MX - 6.4, y: 6.0, w: 6.4, h: 6.4 / MOTIF_AR, transparency: 40 });
notes(s, "BACK COVER, DARK. The span phrase anchors the close. Nothing else competes.");

pres.writeFile({ fileName: "Harpak-ULMA-Deck-Template.pptx" }).then(() => console.log("written", PAGE, "slides"));
