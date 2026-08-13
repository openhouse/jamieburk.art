---
name: "Jamie Burkart Portfolio"
description: "A public-safe editorial portfolio for senior product management, technical project delivery, implementation, and civic work."
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

For the August 2026 employment edition, the single page job is sharper: a
public-sector hiring reader should recognize a senior product leader, understand
the discover-deliver-sustain practice, inspect three decisive cases, and reach a
resume or conversation without decoding the archive behind the page.

## Color

- **Work-jacket blue** carries links, primary actions, and structural emphasis.
- **Institutional green** carries stewardship and outcome language.
- **Red pencil** is reserved for visible correction or accountable intervention.
- **Graphite** carries navigation, proof bands, and formal authority.
- **White, field grey, and blue-grey rules** make long reading calm and precise.

Semantic states retain their daisyUI meanings. Do not turn the full semantic
palette into decoration. No gradients, colored orbs, bokeh, or simulated paper
texture.

## Typography

Display type uses a system serif for identity, page titles, and true editorial
landmarks. Karla carries prose and controls. Oswald carries compact labels and
index numbers. Tight negative tracking is reserved for large display headlines;
body copy and utility labels remain neutral or open. Large type is reserved for
the home hero, section theses, and page titles; evidence labels remain compact.

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

Jamie confirmed on August 12, 2026 that the bounded employment-edition source
album has publication rights and permission for this portfolio. That clears the
six selected derivatives for the exact governed occurrence. It does not erase
creator-credit duties, collective context, the distinction between access and
consent, or the still-open production and indexing decisions.

## Composition

- The home hero is a split field: role-first work-jacket blue beside a current,
  full-bleed, unframed civic-work photograph. The split keeps copy readable
  without turning the photograph into wallpaper or placing text over a face.
- Indexes use rules, numbers, and stable columns instead of repeated floating
  cards.
- Cards are reserved for discrete artifacts, calls to action, and genuinely
  bounded tools. Cards do not contain other cards.
- Photographs receive stable aspect ratios and captions beneath the image.
- Page sections are full-width bands or unframed layouts with a constrained
  inner measure.
- The first viewport names Jamie, the literal senior product role, the value
  proposition, and two actions. Desktop shows the current photograph beside
  that proposition; mobile places the complete proposition before the image.

## August 2026 employment-edition composition

The homepage uses the Impeccable concept seed `5e4cf5f7` and assigned structure
three: discover, deliver, sustain. The structure won because it maps directly
to product leadership and asks less of a ten-second hiring reader than a
portfolio taxonomy or archive explanation.

The signature is a product-practice case file made from the portfolio's own
materials: documentary photography, work-jacket blue, graphite, field paper,
serif declarations, ruled evidence, and compact utility labels. The one visual
risk is scale—the thesis and case names are allowed to read like civic posters—
while everything else stays flat, unrounded, still, and operational.

The public story is deliberately short:

1. Jamie turns public problems into products people can use.
2. The practice moves through discovery, delivery, and sustainability.
3. WOW List, Harry J. Epstein Company, and NYC Artist Coalition / Fair Rent NYC
   prove the practice under different conditions.
4. Seven governed photographs make the work material without exposing the
   private archive or selection machinery.
5. The final band offers one role-specific conversation and the resume.

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
