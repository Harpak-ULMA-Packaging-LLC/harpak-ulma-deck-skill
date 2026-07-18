---
name: harpak-ulma-decks
description: Build, edit, or review any Harpak-ULMA presentation so it ships on-brand per Brand Book v0.3. Use this skill whenever the user mentions a Harpak-ULMA (or Harpak, or ULMA) deck, slides, presentation, pitch, webinar, trade-show session, line assessment, customer proposal, Aura or Aura Edge presentation, or asks to redo old slides in the new brand. Trigger even if they only say "make slides about tray sealing" or "deck for Pack Expo" without naming the brand, when the project context is Harpak-ULMA. Covers narrative structure, the branded .pptx template, verbal identity, partner co-branding compliance, and the Aura sub-brand rules.
---

# Harpak-ULMA deck builder

Build presentation decks that look and sound like Harpak-ULMA: the accountable
integrator, plainspoken and precise, industrial but not crude. Everything here
derives from Harpak-ULMA Brand Book v0.3. When this skill and generic deck
advice conflict, this skill wins.

## What you produce

A .pptx built from `assets/template/Harpak-ULMA-Deck-Template.pptx` (16:9,
13.333 x 7.5 in), in the dark system (default) or light system (bright rooms,
webinars, show floor), that passes the QA gate below. The template contains 55
archetype slides in ten sections (slide 04 is the index) with usage guidance
in the speaker notes; your job is to select, duplicate, and refill them, not
to invent new visual language. Slides 04 and 54 are builder aids: always
delete them from a shipping deck.

## Non-negotiables (memorize before building)

1. Headlines are claims in sentence case, 12 words max. "Recipe-driven
   changeover cut setup from 30 to 18 minutes", never "Changeover Overview".
   Read only the headlines in order: they must deliver the whole argument.
2. One idea per slide, 40 words of body max. Overflow goes to the appendix.
3. One red element per slide (rule, node, CTA, or arrow). Red is the action
   and accent color; if two red elements both look clickable, one is wrong.
   Buttons are 4 px radius, never pills. Errors are tinted panels, never
   solid red buttons.
4. Every figure, unit, part number, date, and stat is set in JetBrains Mono.
   One space between value and unit (120 ppm). Ranges use "to", never a dash.
   No em-dashes anywhere.
5. Every performance figure is verified or carries a visible [GET] tag. Never
   invent a spec, customer quote, or case-study number for a shipping deck.
6. Banned words never ship: seamless, unlock, AI-powered, synergy, leverage,
   best-in-class, revolutionary, cutting-edge, world-class, game-changing,
   state-of-the-art, end-to-end (say "product to pallet"), solutions as a
   catch-all. Full list and replacements: `references/voice-and-copy.md`.
7. Partner marks live on neutral cards only, never recolored, never on red,
   never rebuilt from a web JPEG. Rockwell marks keep 1 S separation from any
   brand red. Details: `references/partners-and-aura.md`.
8. Aura content stays contained: navy surface, the gradient ring as the only
   gradient, signature "Aura by Harpak-ULMA". Corporate steel blue and Aura
   blue-teal never share a surface.
9. The final slide is the ask, stated as a specific dated decision. Never
   end on "Thank you".
10. The logo is never placed on brand red, never restyled, never re-typeset.
    Use the supplied lockup PNGs only. Keep clear space of 1 S (the height of
    the ULMA symbol square) on all sides.
11. The line motif is equipment silhouette glyphs (v0.4 6.A.10), never the
    retired abstract wireframe. Glyphs inherit surface text color: neutral
    #9BA1A7 on dark, ink on light; never white on dark, never filled, never
    per-station recolored, never below 40 px. A product-line glyph always
    carries its label. Detail in `references/brand-system.md`.

## Workflow

### Step 0. Environment

Fonts: Archivo, Inter, JetBrains Mono must be installed for accurate
rendering. In a fresh container:

```bash
mkdir -p /usr/share/fonts/truetype/harpak
cp <skill>/assets/fonts/*.ttf /usr/share/fonts/truetype/harpak/ && fc-cache -f
```

If the deliverable will be edited by humans, also hand them
`assets/fonts/FONTS.md` (the install kit). Without the fonts, PowerPoint
substitutes and the deck loses its voice.

### Step 1. Spine before slides

Answer in writing before touching the template:

1. Who is the audience and what do they believe now? (Plant engineers want
   specs and integration proof; operations leaders want uptime, cost, and who
   owns risk; procurement wants the one-contract model. See
   `references/voice-and-copy.md` for the audience table.)
2. What should they decide or do after?
3. What single obstacle stands between those states?

Then write the headline chain: one claim per future slide, in order. Fix the
chain until it reads as a complete argument on its own. Budget about 2
minutes of talk time per slide; a 30-minute meeting supports 10 to 15 live
slides plus appendix.

### Step 2. Pick the mode and map archetypes

Dark system for customer pitches, dim rooms, screens, events. Light system
for webinars, bright rooms, projectors, the show floor. Do not mix modes
mid-deck except: full-bleed photo slides (mode-neutral), the Aura navy slide,
and covers/closers which exist in both modes.

Open `references/slide-archetypes.md` and map every headline in the chain to
a template slide number. The 55 archetypes cover: covers (dark, light,
co-branded), agendas, section and product-line dividers, statements, big
number, quotes, full-bleed photo, stat bands, before/after, bar and line
charts, comparison table, evidence quotes, card grids, offerings, machine +
spec, machine lineup, glyph process motif, timeline, roadmap, industries,
certifications, do/don't,
bios (hero, dual, team grid, speakers), partner walls with marks, built-with
strip, partner detail, Aura, Aura Edge event, demo frame, case study,
commercial options, FAQ, summary, closings, contact, appendix, and back
cover. If content fits no archetype, compose from two adjacent ones; never
invent new colors, fonts, or decoration.

### Step 3. Build from the template

Preferred path (preserves the design exactly): work on a copy of the
template with the pptx skill's tooling.

```bash
python -c "import zipfile; zipfile.ZipFile('<skill>/assets/template/Harpak-ULMA-Deck-Template.pptx').extractall('unpacked')"
# duplicate archetypes you need more of, BEFORE editing content:
python <pptx-skill>/scripts/add_slide.py unpacked/ slide7.xml --after slide7.xml
# delete unused slides from <p:sldIdLst> in ppt/presentation.xml, then:
python <pptx-skill>/scripts/clean.py unpacked/
# edit text runs in ppt/slides/slideN.xml (keep run fonts/colors; change text only)
(cd unpacked && rm -f ../out.pptx && zip -Xr ../out.pptx .)
```

Net-new slides or programmatic builds: use `scripts/tokens.js` (design
tokens and helpers for pptxgenjs) and copy geometry recipes from
`scripts/build_template.js`, which contains the exact code that generated
every archetype. Follow the grid: 0.67 in margins, 12 columns, 0.25 in
gutters. All measurements and color values: `references/brand-system.md`.

While filling content:

- Update footers: page number and deck label in Mono, small lockup
  bottom-right (color on light, reversed on dark).
- Keep the speaker-notes usage guidance intact or replace it with real
  speaker notes; never leave template instructions in a shipping deck's
  visible slides.
- Photography: real installed equipment with product moving through it,
  operators with real PPE. No stock handshakes, no CGI gloss, no glowing
  overlays. Interim photos live in `assets/photos/`; the line motif
  (`assets/motif/`) stands in where no real photo exists.
- Charts: steel blue #235980 carries data. Red appears in a chart only to
  flag a fault. One takeaway headline per chart; the chart is the proof.

### Step 4. QA gate (required, in this order)

1. `python <skill>/scripts/brand_check.py out.pptx` and fix every FAIL. It
   scans for banned words, em-dashes, dash ranges, off-brand fonts, missing
   footers, and leftover template placeholders, and lists remaining [GET]
   tags so you can report them.
2. Validate the file: `python <pptx-skill>/scripts/office/validate.py out.pptx
   --original <skill>/assets/template/Harpak-ULMA-Deck-Template.pptx`.
3. Render and look at every slide (soffice to PDF, pdftoppm to images).
   Check: headline chain reads as the argument; one red element per slide;
   no text overflow; squint test (the intended element dominates); partner
   marks on neutral cards; Aura containment; the last slide is the ask.
   Glyph spot check: one dark slide reads glyph neutral #9BA1A7, one light
   slide reads ink glyphs, and no closing carries a red dot.
4. Report unresolved [GET] items and placeholders to the user as a short
   gap list. Missing inputs never block a draft; they get tagged and listed.

### Step 5. Deliver

Deliver the .pptx plus the gap list. If humans will edit it, include
`assets/fonts/FONTS.md`. Never deliver a deck that fails brand_check.

## Reference map

| Read | When |
|---|---|
| `references/brand-system.md` | Any visual decision: colors, type sizes, grid, footers, WCAG pairs, dark/light rules, asset inventory |
| `references/slide-archetypes.md` | Mapping content to template slides; what to edit per archetype |
| `references/voice-and-copy.md` | Writing any headline or body copy; banned words; tone by deck type; audiences |
| `references/partners-and-aura.md` | Any slide naming Rockwell, RAMA, CabinPlant, Mondini, Aura, or Aura Edge; any co-branded or event deck |
| `scripts/build_template.js` | Exact geometry recipe for any archetype when building programmatically |
| `assets/fonts/FONTS.md` | Handing off to human editors |

## Governance notes

The brand book is v0.4. The equipment glyph system (6.A.10) is CONFIRMED
canon. Figures marked [GET] in the template are illustrative until the
product team supplies verified specs. Aura and Aura Edge naming is subject
to counsel clearance; the deck asserts no trademark availability. The
interim vector lockups in `assets/logos/` were rebuilt from the in-use site
mark and stand in until the commissioned vector master ships; flag this
when a deck goes to print or large format.

Open items awaiting ratification or input (flag when relevant):
- `#FF5A46` dark-surface eyebrow token: PROPOSED in v0.4, not yet ratified.
  Applied to dark eyebrows in the template; carry it on the open list.
- glyph-case-packer and glyph-palletizer: authored interim geometry
  (CONFIRMED). GET real machine references to true them up.
- Verified per-product specs, partner-approved vector marks, approved
  customer quotes, and commissioned photography, all as tagged [GET].
