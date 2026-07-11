# Citational Care Composite C QA

## Base

- Branch: `feature/citational-care-composite-C`
- Base: `origin/feature/citational-care-composite`
- Base SHA: `5d57171ab6e6d643ca8e57efc41578791830142b`
- Canonical app: `apps/www`
- First cited route: `/work/callnyc`

The target branch passed `npm ci`, typecheck, lint, build, and the inherited
`npm run check` before implementation.

## Composition Ledger

No candidate branch was merged or cherry-picked wholesale. The integration was
reimplemented against the target after inspecting A-N.

| Candidate | Composed idea | Integration decision |
| --- | --- | --- |
| A | Separated source, claim, evidence, research, and page records; page-local numbering; checks, tests, report | Used as the end-to-end reference, adapted to the target's knowledge-bank and MDX conventions |
| B, N | Compact public vocabulary, meaningful accessible labels, public/protected distinctions | Used in record names, rendered labels, and fail-closed checks |
| F, K | First-class media artifacts, rights status, credit, visible scope, representation and crop boundaries | Added without publishing the Digital District participant photograph |
| L | Authored multi-source notes under one visible number | Added `citation-notes.json`; the date and CouncilStat notes each combine original and archive-carrier evidence |
| M | Corrections, supersession fields, and production gating | Added correction records and a production-only block for the unresolved résumé PDF wording |
| G | Browser behavior and responsive QA | Adopted as the manual/browser verification matrix below |
| C | Future remark/rehype automation | Deferred. Explicit server-rendered `<Cite />` and `<References />` preserve the current Turbopack build |
| J | Separate knowledge-bank package | Deferred. The target did not already have one, and package extraction would add churn to this vertical slice |

## Public-Safety Decisions

- The public page has no source-bank or knowledge-bank browser.
- The Digital District participant photograph is protected, unlinked, and not
  referenced by the page manifest.
- The bounded archive search uses an opaque private artifact ID only.
- The negative result says “not recovered”; it does not claim nonexistence.
- The Council's “first CouncilStat hackathon” wording remains attributed.
- Announced 1-3 p.m. hours are not presented as actual event duration.
- CallNYC is described as an independent follow-on, archived, and unofficial.
- The binary résumé PDF was not silently edited without its approved source.

## Automated Verification

- [x] `npm ci`
- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm run check:citations`
- [x] `npm run test:citations` (20 tests)
- [x] `npm run report:citations`
- [x] `npm run check`
- [ ] `npm run preflight:staging` completed through citation tests, typecheck,
  and lint, then the macOS Turbopack build stalled before compilation on two
  attempts. A cold ordinary build and the equivalent staging Docker build both
  passed.
- [x] `npm run preflight:production` fails only on the recorded résumé
  correction, before build
- [x] Docker image builds and serves the required routes
- [x] Optional public-link audit completed: 7 links, 0 warnings

## Browser Verification

- [x] Desktop rendering
- [x] 768px rendering
- [x] 375px rendering
- [x] 320px rendering
- [x] No horizontal overflow
- [x] Superscript marker jumps to its reference
- [x] Each backlink returns to its exact occurrence with 128px scroll margin
- [x] Repeated reference reuses its number and exposes multiple backlinks
- [x] Focus ring is visible by keyboard: 3px ochre with 3px offset
- [x] Target reference highlight is visible
- [x] References retain semantic roles and meaningful source links
- [x] Server HTML contains complete citations and references without hydration
- [x] Print layout hides backlinks and exposes external URLs
- [x] No duplicate DOM IDs
- [x] No console errors

## Known Production Blocker

`correction.callnyc.resume-event-wording` remains
`required-before-production`. The current PDF says “the New York City Council's
first civic-data hackathon,” which is broader than the recovered sources. It
must be regenerated from the approved editable résumé source using the bounded
replacement in `corrections.json`.
