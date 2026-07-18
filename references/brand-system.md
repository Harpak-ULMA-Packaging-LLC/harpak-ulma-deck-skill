# Brand system for decks (from Brand Book v0.3)

Everything a deck needs from the brand book, translated to PowerPoint units.
Slide canvas: 13.333 x 7.5 in (16:9). 1 in = 96 px at slide scale.

## Color tokens

Use hex without # in pptxgenjs. Status: red-500 and neutral-900 are CANON
(from the live CMS); ramps and steel blue are PROPOSED (ratification pending);
values marked "derived" were authored for the deck system and follow the
book's rules.

| Token | Hex | Deck role |
|---|---|---|
| ink / neutral-900 | 030303 | Dark-system background; text on light |
| paper | FFFFFF | Light-system background; text on dark |
| neutral-50 | F7F8F9 | Light panel tint (highlight column, next-step panel) |
| neutral-100 | F1F2F3 | Icon chips, mark slots on light |
| neutral-200 | E0E2E4 | Hairlines and card borders on light |
| neutral-300 | C7CACD | Big divider numerals on light; muted text on dark |
| neutral-400 | A7ABB0 | Agenda numerals light; eyebrows on dark |
| neutral-500 | 7E8388 | Mono captions, footers, stat labels |
| neutral-600 | 5B5F64 | Secondary body on light; footnotes on dark |
| neutral-700 | 404448 | Body text on light; big numerals on dark |
| neutral-800 | 26282B | Hairlines and card borders on dark |
| red-500 | DC220A | THE accent: rule, CTA, current node, red stage tags |
| red-400 | E55738 | Red text on dark when red-500 would fail contrast |
| red-600 | BD1C08 | Red text on light for small sizes (timeline labels) |
| red-700 | 991506 | Error icon/text in tinted panels |
| red-100 | FCE3DD | Error/DON'T panel tint |
| blue-600 | 235980 | Links, info, chart series (light) |
| blue-300 | 7EAFD3 | Links on dark |
| green success text | 11532D | DO icon and text |
| green tint (derived) | E9F2EC | DO panel tint |
| navy (Aura) | 0C1B33 | Aura slide background only |
| glyph neutral | 9BA1A7 | Equipment glyphs on dark (8.0:1 on ink); v0.4 CONFIRMED |
| eyebrow dark | FF5A46 | Dark-surface eyebrow text (6.8:1 on ink); v0.4 PROPOSED, awaiting ratification |
| navy surface (derived) | 13253F | Aura product panel fill |
| navy border (derived) | 24374F | Aura hairlines |
| teal (Aura) | 00E3CC | Aura eyebrows/accents on navy only |
| aura blue | 0078FF | Ring gradient start only, never as fill or text |
| card dark (derived) | 141719 | Card fill on dark system |

Red discipline: red-500 is the single action/accent hue. Semantic error red
shares the hue; keep them from meeting: an error is a red-100 panel with
red-700 text and an icon, never a solid red button.

Dark-surface rules: cards lift from the background by a neutral-800 hairline
border, not luminance. Red text on dark uses red-400. Links on dark use
blue-300.

## WCAG pairs (computed in the brand book; use only these)

| Foreground | Background | Ratio | Use |
|---|---|---|---|
| 030303 | FFFFFF | 20.6 | Body on light |
| 5B5F64 | FFFFFF | 6.4 | Secondary on light |
| 235980 | FFFFFF | 7.5 | Links on light |
| FFFFFF | DC220A | 4.9 | CTA label (AA) |
| FFFFFF | 030303 | 20.6 | Body on dark |
| C7CACD | 030303 | ~13 | Muted on dark |
| 7E8388 | 030303 | ~5.5 | Mono captions on dark (min size 8 pt) |
| E55738 | 030303 | ~5.7 | Red text on dark |
| FFFFFF | 0C1B33 | ~15 | Body on navy |
| 00E3CC | 0C1B33 | ~9 | Teal eyebrow on navy |

## Typography

Faces (SIL OFL, in assets/fonts): Archivo = display and headings. Inter =
body and UI. JetBrains Mono = every figure, unit, part number, eyebrow,
caption, footer. Never let Archivo carry body or Inter carry a display line
(role bleed). Max two weights per component. No all-caps except short mono
eyebrows and labels. No centered multi-line body. No justified text. No
synthetic bold: use the named families below.

PowerPoint family names as installed:

| Role | Font family | Size (pt) | Notes |
|---|---|---|---|
| Cover display | Archivo ExtraBold | 40 to 44 | lineSpacingMultiple 1.02 |
| Statement display | Archivo ExtraBold | 44 to 48 | one claim only |
| Slide headline | Archivo (bold) | 24 | sentence case, claim |
| Divider title | Archivo (bold) | 32 | |
| Card/row title | Inter SemiBold | 13 to 15 | |
| Body | Inter | 11 to 13 | lineSpacingMultiple 1.35 |
| Support line under display | Inter | 13 to 14 | neutral-300 dark / neutral-600 light |
| Eyebrow | JetBrains Mono Medium | 10 | caps, charSpacing 2 |
| Stat numeral | JetBrains Mono Medium | 30 to 40 | |
| Stat label | JetBrains Mono Medium | 8.5 | caps, charSpacing 1.8, neutral-500 |
| Spec table rows | JetBrains Mono / Medium | 10 to 10.5 | labels neutral-400, values right-aligned |
| Captions and footnotes | JetBrains Mono | 7.5 to 8.5 | neutral-500, charSpacing 1 to 1.5 |
| Footer | JetBrains Mono | 8 | page number + deck label |
| Big divider numeral | JetBrains Mono Medium | 92 | neutral-700 dark / neutral-300 light |

Floor: never below 7.5 pt anywhere; body never below 10.5 pt.

## Grid and geometry

- Margins 0.67 in all sides. Content width 11.99 in.
- 12 columns, 0.25 in gutters, column width 0.7703 in.
  x(i) = 0.67 + i * 1.0203; width(span) = span * 0.7703 + (span-1) * 0.25.
- Header zone: eyebrow at y 0.56, headline at y 0.9. Content starts y 2.05
  to 2.2. Footer baseline y 7.08.
- Radius tokens: buttons 0.042 in (4 px), cards and image frames 0.083 in
  (8 px), chips 0.042 in. Nothing is ever a pill.
- Hairlines 0.75 pt: neutral-200 on light, neutral-800 on dark.
- Red rule: 0.55 x 0.052 in, left-aligned. One per slide, only on covers,
  dividers, statements, quotes, back cover.
- Icon chips 0.52 in square, radius 8 px, fill F1F2F3 light / 1B1E20 dark,
  icon inset 22%.
- CTA button: 0.58 in tall, radius 4 px, red-500 fill, white Inter SemiBold
  12.5 label. Exactly one per closing slide.

## Footers

Content slides: bottom-left `NN  ·  DECK LABEL` in Mono 8 neutral-500
(dark: neutral-500, light: neutral-400); bottom-right horizontal lockup
1.25 in wide (color on light, reversed on dark). Covers, dividers,
statements, closers, and full-bleeds carry no page footer.

## Logo usage in decks

Files in assets/logos (interim vectors rebuilt from the in-use mark):

| File | Use |
|---|---|
| lockup-horizontal-color.png | Light backgrounds (default) |
| lockup-horizontal-reversed.png | Ink/near-black backgrounds |
| lockup-horizontal-white.png | Over photography (one-color knockout) |
| lockup-stacked-color.png / -reversed.png | Square or constrained spaces |
| aura-ring.png | Aura slides only; the only gradient allowed |

Aspect ratio horizontal lockup 8.19:1; stacked 1.95:1; ring 1:1. Cover
lockup 2.1 in wide; closing 1.9; footer 1.25. Never on brand red, never
recolored, never with effects, nothing inside 1 S clear space (S = symbol
square height, about 0.26 in at cover size).

## Equipment silhouette glyphs (assets/glyphs, assets/glyph-png) — v0.4 6.A.10

The line motif is now built from equipment silhouette glyphs: stroke
silhouettes of the real Harpak-ULMA machine classes, ratified canon in
Brand Book v0.4 (6.A.10, CONFIRMED). This is a second iconography tier
above the 24 px icons, drawn for motif and display scale.

The eight masters (assets/glyphs/glyph-*.svg, currentColor, height-64
canvas, feet on a shared y=60 baseline, no baked hex): weigher (64 wide),
thermoformer (136), tray-sealer (88), flow-wrapper (128), vffs (76),
robot (76), case-packer (96), palletizer (84). Pre-rendered PNGs in
assets/glyph-png as `<glyph>-ink.png` (light surfaces) and
`<glyph>-neutral.png` (dark surfaces).

Construction rules (6.A.10.2): 2 px stroke, butt caps, miter joins,
monochrome currentColor, fill none. Silhouette plus mechanism marks only;
if a detail does not identify the machine class at 64 px it is omitted.
Never scale a glyph vertically to fill a tile, never add interior detail,
never a fill or gradient, never per-station recoloring, never a baked hex.

Color (6.A.10.4): glyphs inherit the surface text token. Dark: glyph
neutral #9BA1A7 on ink (8.0:1). Light: ink #030303. Never pure white
glyphs on dark. Minimum display height 40 px on slides; below that use a
text label (the 24 px icon redraws do not exist yet).

Motif composition (6.A.10.5): the product-to-pallet motif places glyphs on
a shared 2 px baseline, feet touching, real machine names below an eyebrow
cap, with the Aura ring floated slightly above the baseline at the end,
labeled AURA / Line intelligence. Default order: weigher, thermoformer,
tray-sealer, robot, case-packer, palletizer, ring. Stations swap to match
the quoted line (vertical example: weigher, VFFS, case-packer); never show
a station the quote does not include.

Product line language (6.A.10.6): one glyph per product line, always with
its label. Tray Sealing (glyph-tray-sealer, G. Mondini platform),
Thermoforming (glyph-thermoformer, TFS / TFX series), Flow Wrapping
(glyph-flow-wrapper, FM series), Vertical FFS (glyph-vffs, Bagging
systems), Automation (glyph-robot, Robotics and line control), Weighing
and Infeed (glyph-weigher, CabinPlant systems). The glyph never stands
alone; the word is the claim.

Red on the glyph motif: at most one red accent dot per slide, on the
mechanism of the station the slide discusses, and it counts as the slide's
one red element. Default is zero dots. The motif strips ship with zero
dots.

Governance: glyph-case-packer and glyph-palletizer are authored interim
geometry (CONFIRMED, GET real references to true up). Silhouettes of
partner-supplied machines are original class drawings, not partner marks;
captions keep named partner credit (Mondini Trave, CabinPlant).

## Recomposed motif strips and scrims (assets/motif)

- glyph-motif-dark.png / glyph-motif-light.png (aspect 8.97:1): the
  recomposed product-to-pallet strip built from the six glyphs plus the
  Aura ring, feet on a shared baseline, zero red dots. Neutral on dark,
  ink on light. Bottom strip on covers, closings, statement, and back
  cover; the process slide draws glyphs at display scale in code instead.
  The abstract wireframe motif (line-motif-*.png) is RETIRED at v0.4 and
  removed; brand_check fails any deck that re-embeds it.
- scrim-bottom.png, scrim-left.png: gradient scrims guaranteeing text
  contrast over photography. Keep text inside the scrim zone.

## Icons (assets/icons)

Machined outline style per the brand icon grid: 24 px grid, 2 px stroke,
square caps, 2 px outer corner radius. 16 glyphs x 7 colors, named
`<glyph>-<color>.png` (ink, white, n600, red, red700, green, blue).
Glyphs: tray-seal, thermoform, automation, partner, uptime, service, gauge,
checklist, line-flow, check, x, alert, arrow-right, data, shield, doc.
Icons are monochrome; red variants only for error/alert or the single
next-step arrow accent.

## Photos (assets/photos)

Interim real photography pending the commissioned shoot: machine-bagger and
machine-bagger-2 (ULMA vertical baggers), operator-hmi (operator with PPE at
HMI), medical-line (medical packaging, cropped), pouches-dark and pack-dark
(product on black, good on dark system), line-hmi-ui (line-control HMI
screen), shrimp-pack (pack shot), headshot-marchand and
headshot-marchand-rounded (presenter headshot; the rounded PNG carries the
8 px corner treatment for bio slides). Headshot rules: square crop, neutral
background when reshot, 8 px radius, initials chip as the placeholder.
Never scale up small photos for full-bleed; never use render gloss or stock.

## Partner marks (assets/partners)

rockwell.png, rama.png (the sanctioned placeholder wordmark until the
official vector arrives), cabinplant.png, mondini.png, sterimed.png.
All are reference rasters extracted from supplied files: usable in drafts
and internal decks, tagged [GET] for production, replaced by
partner-approved vectors before anything ships externally. Marks always sit
on white slots (see markSlot in scripts/build_template.js), never on the
dark field, red, or any colored band.
