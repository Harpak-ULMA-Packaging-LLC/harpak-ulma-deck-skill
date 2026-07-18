# Slide archetypes (template v2, 54 slides)

The template (`assets/template/Harpak-ULMA-Deck-Template.pptx`) contains 54
archetype slides in ten sections. Slide 04 is a builder index of the whole
set. Each slide's speaker notes carry its own usage rules; this file is the
selection map. Duplicate archetypes with the pptx skill's `add_slide.py`
BEFORE editing content, delete what you don't use, then refill text runs
(keep each run's font and color; change only the text).

## Section map

| # | Archetype | Mode | Use when |
|---|---|---|---|
| **Covers and setup** | | | |
| 01 | Cover | dark | Default opener: pitches, reviews, dim rooms |
| 02 | Cover, co-branded / event | dark | Partner sessions; partner mark on neutral chip |
| 03 | Cover | light | Webinars, bright rooms, show floor |
| 04 | Template index | light | Builder navigation. DELETE before presenting |
| **Structure** | | | |
| 05 | Agenda | dark | Decks > 20 slides or unfamiliar audience |
| 06 | Agenda | light | As 05 |
| 07 | Section divider | dark | Every 5 to 8 slides |
| 08 | Section divider | light | As 07 |
| 09 | Section divider with motif | dark | Divider ahead of a data or scope section |
| **Narrative** | | | |
| 10 | Statement | dark | One claim, reset attention |
| 11 | Big number | dark | A single figure carries the argument |
| 12 | Quote | dark | One approved customer voice |
| 13 | Quote | light | As 12 |
| 14 | Full-bleed photo | neutral | Section opener or industry beat |
| **Evidence and data** | | | |
| 15 | Stat band | dark | Three numbers that carry the commitment |
| 16 | Stat band | light | As 15 |
| 17 | Before / after | dark | A change measured as two ranges |
| 18 | Chart, bar | light | One comparison; takeaway headline |
| 19 | Chart, line | dark | A trend; kicker column repeats start and end |
| 20 | Comparison table | light | Options against criteria |
| 21 | Evidence quotes | light | Sourced third-party proof |
| **Solutions and scope** | | | |
| 22 | Three cards | dark | Three parallel commitments or ideas |
| 23 | Offerings 3-up | light | Solution scopes with links |
| 24 | Content + photo | light | Claim, proof rows, equipment photo |
| 25 | Machine + spec | dark | One machine, specs lead |
| 26 | Machine lineup | dark | The proposed line's bill of machines |
| 27 | Process motif | light | Product-to-pallet scope diagram |
| 28 | Timeline | light | Phases to a decision, weeks |
| 29 | Roadmap | dark | Multi-quarter rollout, red node = decided now |
| 30 | 2x2 capability grid | light | Four-part scope |
| 31 | Industries 3-up | light | Verticals: food, medical, consumer |
| 32 | Certifications | light | Compliance chips. Verify per line [GET] |
| 33 | Do / don't | light | Approved vs banned comparison |
| **People** | | | |
| 34 | Bio hero | light | One presenter, full treatment with facts rail |
| 35 | Bio dual | dark | Two presenters with photos/initials chips |
| 36 | Team grid | light | Project team; the one-contact card is the point |
| 37 | Speakers | light | Compact webinar two-up |
| **Partners** | | | |
| 38 | Partner ecosystem wall | light | Marks on neutral cards + role claims |
| 39 | Partner ecosystem wall | dark | As 38 on the dark system (cards stay white) |
| 40 | Built-with strip + contexts | light | Co-branding weights A to D |
| 41 | Partner detail | light | One partner deep, with compliance rules |
| **Aura** | | | |
| 42 | Aura sub-brand | navy | Aura content; ring, containment |
| 43 | Aura Edge event | dark | Booth/session slide; EDGE accent wordmark |
| 44 | Demo / video frame | dark | Media placeholder with play chip |
| **Commercial and closing** | | | |
| 45 | Case study | light | Challenge, approach, measured result |
| 46 | Commercial options | light | Three scopes; red RECOMMENDED tag |
| 47 | FAQ | light | Four real questions, voice-true answers |
| 48 | Summary + next step | light | Three takeaways + ask panel |
| 49 | Closing CTA | dark | Final slide: the ask, one red button |
| 50 | Closing CTA | light | As 49 |
| 51 | Contact | light | Contact block in Mono + photo |
| **Governance** | | | |
| 52 | Appendix + legal | light | Overflow; keep the four Mono legal lines |
| 53 | Cheat sheet | light | Builder reference. DELETE before presenting |
| 54 | Back cover | dark | Span phrase close |

## Composition rules

- A deck is: cover, (agenda), argument slides in headline-chain order with a
  divider every 5 to 8, summary, closing ask, appendix. 10 to 15 live slides
  per 30 minutes.
- Vary layouts: never two identical card grids back to back; alternate dense
  (table, spec, lineup) with light (statement, big number, photo) slides.
- Dark decks pull from dark + neutral archetypes; light decks from light +
  neutral. The Aura navy slide and full-bleed photos fit either system.
- People slides: bio hero (34) for a keynote speaker, bio dual (35) for a
  pitch pair, team grid (36) for project teams, speakers (37) for webinars.
  Photos are square, neutral background, 8 px radius; the initials chip is
  the sanctioned placeholder.
- Partner content: wall (38/39) for the ecosystem, built-with strip (40)
  when partners are context, partner detail (41) when one partnership is
  the story. Read `references/partners-and-aura.md` first, always.
- Need a layout that doesn't exist? Compose from adjacent archetypes with
  the grid and tokens in `references/brand-system.md`, reusing exact
  geometry from `scripts/build_template.js`. Never invent new colors, type
  styles, shadows, or decoration; the system's restraint is the look.
- Before delivery: delete slides 04 and 53, renumber nothing (footers are
  per-slide text), and run the QA gate.
