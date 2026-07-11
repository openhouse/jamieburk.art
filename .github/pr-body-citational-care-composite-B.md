# Citational Care Composite B

## Summary

Adds the composite public-safe citation architecture and pilots it on the
CallNYC case study.

## Composite synthesis

- Structured JSON and Zod records for sources, claims, evidence, citation
  notes, media governance, research runs, corrections, and page projections.
- Deterministic page-local numbering, reusable evidence, occurrence-specific
  backlinks, public/withheld source modes, and generated reporting.
- Accessible inline numerical notes and a readable References section.
- Strong validation for broken relationships, unsafe paths, malformed links,
  archival overreach, negative-search overreach, and protected content.
- Source-backed CallNYC chronology with the participant photograph withheld
  pending rights and consent review.

## CallNYC corrections

- Corrects the case-study year to 2016.
- Uses the supported wording "first CouncilStat hackathon."
- Records Civic Hall's announced January 30, 1-3 p.m. window and
  constituent-services focus without treating announced hours as proven event
  duration.
- Treats "New York City Council Hackathon" as promotional branding.
- Describes the Wayback page as an archival carrier, not a recovered calendar
  listing.
- Separates the hackathon from Jamie's later independent CallNYC development.
- Preserves the unofficial, archived-prototype disclaimer.

## Baseline

The clean `feature/citational-care-composite` baseline passed `npm ci`,
typecheck, lint, build, and the full `npm run check` before implementation.
`npm ci` reported two inherited moderate audit findings. The inherited
Knowledge Bank check reported ten careful-review warnings.

## Verification

- [x] `npm run check:citations`
- [x] `npm run test:citations` - 13 passing tests
- [x] `npm run report:citations`
- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm run check`
- [x] `npm run knowledge-bank`
- [x] `npm run public-safety`
- [x] `npm run check:routes`

The citation check reports eight nonblocking governance warnings: six public
sources do not have separate archive URLs, the Digital District photograph
still requires rights or consent review, and the approved resume wording needs
follow-up.

## Browser QA

- [x] 320, 375, 768, and 1440 CSS-pixel layouts inspected
- [x] citation-to-reference fragments work
- [x] reference-to-claim backlinks work
- [x] no duplicate IDs
- [x] no reference overflow
- [x] no console errors
- [x] private participant evidence remains absent from the public projection
- [ ] final human Tab/Enter and screen-reader spot check before production

The browser controller could not synthesize a real Tab/Enter sequence. Static
markup, component tests, focus styles, click-driven fragment navigation, and
backlinks were verified. Screenshots were captured locally for review and were
not committed as public repository artifacts.

## Known follow-up

The approved resume PDF still uses "first civic-data hackathon." This PR does
not hand-edit the binary. Update it through the approved resume source and
generation workflow.
