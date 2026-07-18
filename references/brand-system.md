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

## Line motif and scrims (assets/motif)

- line-motif-dark.png / line-motif-light.png (aspect 8.91:1): the
  product-to-pallet line illustration. Bottom strip on covers/closers
  (6.4 in wide, transparency 30 to 55 on dark), or full-width diagram on
  the process slide with Mono stage labels.
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
