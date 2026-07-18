# Slide archetypes (template v3, 55 slides)

The template (`assets/template/Harpak-ULMA-Deck-Template.pptx`) contains 55
archetype slides in ten sections. Slide 04 is a builder index of the whole
set. Each slide's speaker notes carry its own usage rules; this file is the
selection map. Duplicate archetypes with the pptx skill's `add_slide.py`
BEFORE editing content, delete what you don't use, then refill text runs
(keep each run's font and color; change only the text).

v0.4 update: the abstract wireframe motif is retired. The line motif, the
process slide, product-line dividers, closings, and machine slides now use
the equipment silhouette glyphs (assets/glyphs, assets/glyph-png). See the
glyph section of `references/brand-system.md`.

## Section map

| # | Archetype | Mode | Use when |
|---|---|---|---|
| **Covers and setup** | | | |
| 01 | Cover (glyph motif strip) | dark | Default opener: pitches, reviews, dim rooms |
| 02 | Cover, co-branded / event | dark | Partner sessions; partner mark on neutral chip |
| 03 | Cover (glyph motif strip) | light | Webinars, bright rooms, show floor |
| 04 | Template index | light | Builder navigation. DELETE before presenting |
| **Structure** | | | |
| 05 | Agenda | dark | Decks > 20 slides or unfamiliar audience |
| 06 | Agenda | light | As 05 |
| 07 | Section divider | dark | Every 5 to 8 slides |
| 08 | Section divider | light | As 07 |
| 09 | Section divider with glyph motif | dark | Divider ahead of a data or scope section |
| 10 | Product-line divider | dark | Open a product line; glyph + label (6.A.10.6) |
| **Narrative** | | | |
| 11 | Statement | dark | One claim, reset attention |
| 12 | Big number | dark | A single figure carries the argument |
| 13 | Quote | dark | One approved customer voice |
| 14 | Quote | light | As 13 |
| 15 | Full-bleed photo | neutral | Section opener or industry beat |
| **Evidence and data** | | | |
| 16 | Stat band | dark | Three numbers that carry the commitment |
| 17 | Stat band | light | As 16 |
| 18 | Before / after | dark | A change measured as two ranges |
| 19 | Chart, bar | light | One comparison; takeaway headline |
| 20 | Chart, line | dark | A trend; kicker column repeats start and end |
| 21 | Comparison table | light | Options against criteria |
| 22 | Evidence quotes | light | Sourced third-party proof |
| **Solutions and scope** | | | |
| 23 | Three cards | dark | Three parallel commitments or ideas |
| 24 | Offerings 3-up | light | Solution scopes with links |
| 25 | Content + photo | light | Claim, proof rows, equipment photo |
| 26 | Machine + spec (glyph header id) | dark | One machine, specs lead |
| 27 | Machine lineup (glyph header ids) | dark | The proposed line's bill of machines |
| 28 | Process motif (equipment glyphs) | light | Product-to-pallet scope diagram |
| 29 | Timeline | light | Phases to a decision, weeks |
| 30 | Roadmap | dark | Multi-quarter rollout, red node = decided now |
| 31 | 2x2 capability grid | light | Four-part scope |
| 32 | Industries 3-up | light | Verticals: food, medical, consumer |
| 33 | Certifications | light | Compliance chips. Verify per line [GET] |
| 34 | Do / don't | light | Approved vs banned comparison |
| **People** | | | |
| 35 | Bio hero | light | One presenter, full treatment with facts rail |
| 36 | Bio dual | dark | Two presenters with photos/initials chips |
| 37 | Team grid | light | Project team; the one-contact card is the point |
| 38 | Speakers | light | Compact webinar two-up |
| **Partners** | | | |
| 39 | Partner ecosystem wall | light | Marks on neutral cards + role claims |
| 40 | Partner ecosystem wall | dark | As 39 on the dark system (cards stay white) |
| 41 | Built-with strip + contexts | light | Co-branding weights A to D |
| 42 | Partner detail | light | One partner deep, with compliance rules |
| **Aura** | | | |
| 43 | Aura sub-brand | navy | Aura content; ring, containment |
| 44 | Aura Edge event | dark | Booth/session slide; EDGE accent wordmark |
| 45 | Demo / video frame | dark | Media placeholder with play chip |
| **Commercial and closing** | | | |
| 46 | Case study | light | Challenge, approach, measured result |
| 47 | Commercial options | light | Three scopes; red RECOMMENDED tag |
| 48 | FAQ | light | Four real questions, voice-true answers |
| 49 | Summary + next step | light | Three takeaways + ask panel |
| 50 | Closing CTA (glyph motif) | dark | Final slide: the ask, one red button, no red dot |
| 51 | Closing CTA (glyph motif) | light | As 50 |
| 52 | Contact | light | Contact block in Mono + photo |
| **Governance** | | | |
| 53 | Appendix + legal | light | Overflow; keep the four Mono legal lines |
| 54 | Cheat sheet | light | Builder reference. DELETE before presenting |
| 55 | Back cover (glyph motif) | dark | Span phrase close, no red dot |

## Glyph usage (v0.4 6.A.10)

- Process motif (28): equipment glyphs on a shared 2 px baseline, feet
  touching, eyebrow cap + real machine name below each, Aura ring floated
  above the baseline at the end (AURA / Line intelligence). Default order:
  weigher, thermoformer, tray-sealer, robot, case-packer, palletizer, ring.
  Swap stations to match the quoted line; never show one the quote omits.
- Product-line divider (10): one glyph paired with its Archivo label and
  sub line, per 6.A.10.6. The label is always present; the glyph never
  stands alone. Swap per product line (Tray Sealing, Thermoforming, Flow
  Wrapping, Vertical FFS, Automation, Weighing and Infeed).
- Covers (01, 03), statement (11), motif divider (09), closings (50, 51),
  back cover (55): the recomposed glyph motif strip (glyph-motif-*.png),
  zero red dots. Dark uses glyph neutral #9BA1A7; light uses ink.
- Machine + spec (26) and lineup (27): optional glyph as a header
  identifier next to the machine name, neutral on the dark cards. Photos
  stay the hero; the glyph is wayfinding, not decoration.
- Color: glyphs inherit surface text color (neutral on dark, ink on
  light), never pure white on dark, never a fill, never per-station
  recoloring. Minimum display height 40 px; below that use a text label.

## Composition rules

- A deck is: cover, (agenda), argument slides in headline-chain order with a
  divider every 5 to 8, summary, closing ask, appendix. 10 to 15 live slides
  per 30 minutes.
- Vary layouts: never two identical card grids back to back; alternate dense
  (table, spec, lineup) with light (statement, big number, photo) slides.
- Dark decks pull from dark + neutral archetypes; light decks from light +
  neutral. The Aura navy slide and full-bleed photos fit either system.
- Dark-surface eyebrow text uses the warm token #FF5A46 (v0.4 PROPOSED);
  light eyebrows stay neutral. Aura surfaces keep teal accents.
- People slides: bio hero (35) for a keynote speaker, bio dual (36) for a
  pitch pair, team grid (37) for project teams, speakers (38) for webinars.
  Photos are square, neutral background, 8 px radius; the initials chip is
  the sanctioned placeholder.
- Partner content: wall (39/40) for the ecosystem, built-with strip (41)
  when partners are context, partner detail (42) when one partnership is
  the story. Read `references/partners-and-aura.md` first, always.
- Need a layout that doesn't exist? Compose from adjacent archetypes with
  the grid and tokens in `references/brand-system.md`, reusing exact
  geometry from `scripts/build_template.js`. Never invent new colors, type
  styles, shadows, or decoration; the system's restraint is the look.
- Before delivery: delete slides 04 and 54 (builder aids), and run the QA
  gate.
