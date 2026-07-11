# Citational Care F - Visual QA

Reviewed locally on 2026-07-11 from the production build in staging-safe mode.

## Captures

- `callnyc-cited-opening-desktop.png` - 1440 x 1100 cited opening and case-study context.
- `callnyc-references-desktop.png` - 1440 x 1100 citation target and References section.
- `callnyc-citation-keyboard-focus.png` - keyboard focus on the opening event citation.
- `callnyc-mobile-390.png` - 390 x 844 narrow mobile opening.

## Verified

- CallNYC displays 2016 and keeps the archived, independent, unofficial status visible.
- Citation numbers follow first appearance; repeated notes reuse their number.
- Citation links move to numbered references and references link back to each occurrence.
- The focused citation link receives a 3px solid visible outline.
- At 390px, document width remained within the viewport and no References links overflowed.
- Restricted participant evidence rendered an approved description with no public link.
- The server-rendered HTML contains citation targets, reference targets, and backlinks, so the anchor interaction does not require JavaScript.
- Staging-safe responses retained `X-Robots-Tag: noindex, nofollow` on the inspected routes.
- The existing Dockerfile built successfully; all required routes returned 200 from the staging-safe container with `noindex, nofollow`.

## Build Note

The untouched baseline and the first branch build both stalled at the Turbopack optimized-build phase with the default worker mode in this workspace. The canonical build and full `npm run check` then passed with `NEXT_TURBOPACK_USE_WORKER=0`; the Next.js webpack production build also passed after allowing the configured Google fonts to load. Typecheck, lint, citation validation, knowledge-bank validation, public-safety validation, and route validation passed.
