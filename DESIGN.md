---
name: "Jamie Burkart Portfolio"
description: "A public-safe editorial portfolio for technical project management, product operations, implementation, and civic work."
theme: "human-index"
colors:
  primary-work-jacket-blue: "#2f6f89"
  secondary-institutional-green: "#4e6f61"
  accent-red-pencil: "#c83b32"
  neutral-graphite: "#222b36"
  paper: "#ffffff"
  field: "#f3f6f8"
  rule: "#d9e4e9"
  ink: "#1a232b"
  social-card-charcoal: "#0c161c"
typography:
  identity: "TeX Gyre Pagella, Iowan Old Style, Palatino Linotype, Palatino, Baskerville, Georgia, serif"
  display: "Iowan Old Style, Palatino Linotype, Palatino, Baskerville, Georgia, serif"
  body: "Karla, ui-sans-serif, system-ui, sans-serif"
  label: "Oswald, Arial Narrow, ui-sans-serif, system-ui, sans-serif"
rounded:
  selector: "0.25rem"
  field: "0.25rem"
  box: "0.25rem"
---

# Design System: The Human Index

## North Star

The portfolio is an editorial argument about a person at work. It should feel
like civic print, a careful index, and a lived field rather than a product
dashboard. The knowledge system supplies factual depth. The public composition
selects from that depth, minimizes the reader's burden, and lets photographs
restore bodies, places, tools, weather, and duration.

The interface is neither an archive browser nor a photo gallery. Text and image
work together to make Jamie's recurring action legible: listening for emerging
structure, building usable forms with people, and leaving continuity behind.

## Color

- **Work-jacket blue** carries links, primary actions, and structural emphasis.
- **Institutional green** carries stewardship and outcome language.
- **Red pencil** is reserved for visible correction or accountable intervention.
- **Graphite** carries navigation, proof bands, and formal authority.
- **White, field grey, and blue-grey rules** make long reading calm and precise.

Semantic states retain their daisyUI meanings. Do not turn the full semantic
palette into decoration. No decorative gradients, colored orbs, bokeh, or
simulated paper texture. The homepage social card's approved charcoal
photographic-contrast gradient is the one scoped exception: it integrates copy
with the full-bleed photograph and becomes fully transparent before the
portrait.

## Typography

TeX Gyre Pagella is the identity face for Jamie Burkart's name, including the
Open Graph card. The system serif stack carries page titles and true editorial
landmarks. Karla carries prose and controls. Oswald carries compact labels and
index numbers. Letter spacing is never negative. Large type is reserved for the
home hero and page titles; panel headings remain compact.

## Photography

Photography is an argument, not wallpaper. Every public image must:

1. Appear in `apps/www/src/data/photography.ts`.
2. Use a metadata-stripped derivative with a neutral public filename.
3. Include stable dimensions, useful alt text, a factual caption, a credit or
   archive note, allowed placements, and an explicit publication status.
4. Avoid exposing private archive identifiers, filenames, paths, faces, or
   locations beyond what the composition intentionally publishes.
5. Remain subject to human rights and caption review. Selection quality and an
   automated score never confer publication permission.

Relational and campaign photographs stay held until photographer, depicted
people, artwork, caption, and collective-credit questions are resolved. A route
may deliberately contain no photograph when the available image would weaken
truth, comparison, or task completion.

## Composition

- The home hero is full-bleed, photographic, and unframed. Text sits directly
  in the scene with one even contrast wash, never a gradient or a card.
- The homepage social card carries that same full-bleed photographic grammar,
  one light even wash, and one cinematic left-to-right charcoal gradient that
  reaches every edge, supports the role-and-name hierarchy, and becomes fully
  transparent before the right-side portrait. It uses no rule or floating
  placard. Its visible copy is limited to the canonical role and name; creator
  attribution follows the exact governed occurrence and permission rather than
  becoming generic footer text. Its executable contract and ordered change
  protocol live in `apps/www/src/data/social-card.ts` and
  `docs/decisions/home-social-card-rendering.md`.
- Indexes use rules, numbers, and stable columns instead of repeated floating
  cards.
- Cards are reserved for discrete artifacts, calls to action, and genuinely
  bounded tools. Cards do not contain other cards.
- Photographs receive stable aspect ratios and captions beneath the image.
- Page sections are full-width bands or unframed layouts with a constrained
  inner measure.
- The first viewport names Jamie and his literal role while leaving a hint of
  the next section on common desktop and mobile screens.

## Accessibility

Maintain one H1 per route, visible keyboard focus, 44px minimum command targets,
AA contrast, reduced-motion behavior, descriptive alt text, explicit image
dimensions, no horizontal overflow, and verified lazy-image completion after a
full-page scroll. Test all canonical routes at 360, 375, 768, and 1280 CSS
pixels before accepting a visual candidate.

## Public Safety

No photograph, screenshot, caption, or design flourish can bypass the public
safety model. Do not publish private correspondence, community records,
analytics, locations, unapproved collaborators, sensitive documents, or archive
locators. Staging review does not make production indexable, and repository
checks do not replace Jamie's human approval.
