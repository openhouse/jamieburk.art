---
name: "Jamie Burkart Portfolio"
description: "A public-safe, image-led portfolio for technical project management, product operations, implementation, and civic work."
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
typography:
  display: "Karla, ui-sans-serif, system-ui, sans-serif"
  body: "Karla, ui-sans-serif, system-ui, sans-serif"
  label: "Oswald, Arial Narrow, ui-sans-serif, system-ui, sans-serif"
rounded:
  selector: "0.25rem"
  field: "0.25rem"
  box: "0.25rem"
---

# Design System: The Human Index

## North Star

The portfolio is an argument about a person at work. It should feel like a
public workbench, a careful index, and a lived field rather than a product
dashboard or a photo gallery. The knowledge system supplies factual depth. The
public composition selects from that depth, minimizes the reader's burden, and
lets photographs restore bodies, places, tools, weather, material, and duration.

Text and image work together to make Jamie's recurring action legible:
listening for emerging structure, building usable forms with people, supporting
implementation, and leaving continuity behind.

## Experience Principles

1. **Person before abstraction.** The home page names and pictures Jamie in the
   first viewport.
2. **Proof before atmosphere.** Photography introduces place and practice, then
   copy identifies the work, Jamie's role, and what became usable.
3. **Sequence before grid.** Rules, captions, indexes, and paced rows organize
   attention. Repeated cards are reserved for genuinely bounded tools.
4. **Material without nostalgia.** Buildings, tools, paper, river
   infrastructure, and work processes make operational production tangible
   without turning the site into an archival scrapbook.
5. **Care remains operational.** Collective credit, privacy, consent, public
   safety, and protected absence remain part of the visual system.

## Color

- **Work-jacket blue** carries links, primary actions, and structural emphasis.
- **Institutional green** carries stewardship and outcome language.
- **Red pencil** is reserved for correction, focus, and accountable intervention.
- **Graphite** carries proof bands, navigation contrast, and formal authority.
- **White, field grey, and blue-grey rules** make long reading calm and precise.

The daisyUI semantic state mapping is:

- `info` = observed
- `neutral` = asserted
- `success` = corroborated
- `warning` = disputed or awaiting review
- `secondary` = protected
- `accent` = corrected
- `error` = harm or unsafe action

Do not use the semantic palette as decoration. No gradients, colored orbs,
bokeh, simulated paper texture, or one-hue page wash.

## Typography

Karla carries identity, headings, prose, and controls. Oswald carries compact
labels and index numbers. The result should feel direct, human, and operational,
not like a generic editorial portfolio. Letter spacing is never negative. Large
type is reserved for the home hero and route titles; compact surfaces use
compact headings.

## Photography

Photography is an argument, not wallpaper. Every committed image must:

1. Appear in `apps/www/src/data/photography.ts`.
2. Use a metadata-stripped derivative with a neutral public filename.
3. Include stable dimensions, useful alt text, a factual caption, an honest
   credit note, allowed placements, subject exposure, and publication status.
4. Avoid exposing private archive identifiers, filenames, paths, faces, or
   locations beyond what the composition intentionally publishes.
5. Remain subject to human rights, caption, consent, and credit review.

Selection quality, a public pull request, or an automated score never confers
production publication permission. Relational and campaign photographs stay
held until photographer, depicted people, artwork, caption, and
collective-credit questions are resolved. A route may deliberately contain no
photograph when an available image would weaken truth or task completion.

## Composition

- The home hero is full-bleed, photographic, and unframed. Text sits directly
  in the scene with one even contrast wash, never a gradient or a card.
- The hero leaves part of the next section visible on common viewports.
- Indexes use rules, numbers, and stable columns instead of floating cards.
- Cards are reserved for discrete artifacts, calls to action, and framed tools.
- Photographs receive stable aspect ratios and factual captions beneath.
- Sections are full-width bands or unframed layouts with constrained content.
- Work pages place role, years, visibility, action, and evidence near the work
  rather than separating visual experience from hiring legibility.

## Accessibility

Maintain one H1 per route, visible keyboard focus, 44px minimum command targets,
WCAG 2.2 AA contrast, reduced-motion behavior, descriptive alt text, explicit
image dimensions, no horizontal overflow, and verified image completion after a
full-page scroll. Test canonical routes at 360, 768, and 1280 CSS pixels.

## Public Safety

No photograph, screenshot, caption, or design flourish can bypass the public
safety model. Do not publish private correspondence, community records,
analytics, locations, unapproved collaborators, sensitive documents, or archive
locators. Staging review does not make production indexable, and repository
checks do not replace Jamie's final human approval.
