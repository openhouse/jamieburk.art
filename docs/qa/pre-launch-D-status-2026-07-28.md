# Pre-Launch D Status

- Date: 2026-07-28
- Branch: `feature/pre-launch-D`
- Base: `develop`
- Pull request state: draft pending the open gates below

## Decision

This is a strong integration candidate for Jamie's final public-surface
review. The application, Knowledge Wiki, photographic governance, campaign
media census, and public-testimony corpus are integrated behind deterministic
checks.

It is not a production-approval receipt. Image decisions, editorial approval,
exact-candidate model holdouts, staging observation, production approval, and
indexing approval remain separate gates.

Use [the public-surface review packet](pre-launch-D-public-surface-review.md)
for the shortest path to an application-sharing decision.

## What This Branch Adds

- A campaign-site media census covering 430 distinct works, including 225
  photo entries and six explicit unreadable-source gaps.
- A nine-transcript NYC Council corpus preserving complete attributed turns
  for 227 supportive or partly supportive speakers, including public
  officials.
- A governed next-corpus inquiry for official Albany sources and four unique
  Commercial Rent Stabilization public-event recordings from November 2025
  through April 2026.
- Public-safe source records for S8319, A5568A, the official Senate
  announcement, and Eon Huntley's independently published policy support.
- Explicit recovery tasks for full speeches by Emily Gallagher, Julia
  Salazar, Shahana Hanif, Brad Lander, Eon Huntley, Olympia Kazi,
  small-business owners, coalition speakers, and other legislators.
- A protected current-workstream source return for late-July 2026 Commercial
  Rent Stabilization report review, speech preparation, and event
  coordination.
- A resource-aware pre-launch eval contract that runs affected deterministic
  checks during iteration and reserves exact-candidate model judgments for
  candidate lock.
- A focused visual and editorial pass informed by two independent Impeccable
  critiques.

## Public-Surface Improvements

- Reduced the homepage project repetition to three lead case studies.
- Named Harry J. Epstein Company in the careful 2x growth proof.
- Added case-study breadcrumbs, section links, and earlier mobile orientation.
- Rebalanced the resume page around its primary PDF action and selected impact.
- Removed repeated side-rule callouts that made unrelated notes look alike.
- Added eager loading to first artifact images likely to become the largest
  contentful element.

## Current Deterministic Evidence

- `npm run wiki:check`: pass; 185 records, 674 semantic/evidence edges, 349
  prose links, no type-aware orphans, and generated outputs current.
- `npm run wiki:test`: pass.
- `npm run wiki:eval`: 124 of 124 blocking criteria pass across 13 lenses.
- `npm run knowledge-bank`: pass with 11 careful-claim warnings.
- `npm run public-safety`: pass.
- `npm run check:knowledge-evals`: pass, 5 of 5.
- `npm run test:knowledge-evals`: 196 of 196 mutation tests pass.
- Campaign-media census check and its three tests: pass.
- Public-testimony check and its four tests: pass.
- Pre-launch contract check and its seven tests: pass.
- Application TypeScript and ESLint: pass under Node 26.5.0.
- Impeccable detector: no new blocking finding; inherited palette and radius
  notices remain advisory.
- Local browser matrix: 42 of 42 route-viewport checks passed across desktop,
  mobile, and 320px widths, with no overflow, broken image, missing image alt,
  console error, or serious/critical axe finding.
- CallNYC inline citations render with JavaScript disabled.
- Production Next build: pass under Node 26.5.0.
- Staging-configured Docker build: pass.
- Docker runtime: all 17 canonical routes, health, robots, and sitemap
  endpoints returned 200; every response carried `noindex, nofollow`;
  `robots.txt` disallowed crawling; health reported staging/nonproduction; and
  no tested private-path signature appeared in rendered responses.
- The complete deterministic check reaches only the exact-candidate model
  gates described below; all preceding deterministic gates pass.

## Model-Bound Blockers

The repository correctly refuses to reuse stale model evidence after the
candidate changes:

- Professor-lens final scorecards must be rebound to the exact current
  candidate.
- Composite integration requires two provenance-bound independent holdouts for
  one unchanged source-tree candidate.
- The available model-evaluation budget is exhausted. This remains
  `blocked-budget`; it is not translated into a pass or bypassed by changing an
  approval artifact.

The frozen pre-launch contract requires two consecutive unchanged,
exact-candidate passes when model evaluation resumes.

## Human and Runtime Gates

- Review rights, consent, exact credit, crop, and production use for eight
  unique displayed photographs across 15 occurrences.
- Complete Jamie's editorial review of public copy and collective-credit
  framing.
- Obtain a fresh live PhotoKit receipt if private-source rebinding is required
  before a photo decision.
- Deploy the exact accepted candidate to staging.
- Observe desktop, 320px mobile, 200 percent zoom, screen-reader semantics,
  keyboard focus, image loading, citation navigation, and JavaScript-disabled
  rendering on staging.
- Confirm staging remains noindex and that protected material does not appear
  in rendered HTML or source maps.
- Obtain Jamie's explicit production approval and separate indexing approval.

The 92-versus-94 Hester Street discrepancy remains a protected current-event
coordination matter. The public portfolio does not publish either address, so
it is not a portfolio launch blocker.

## Commercial-Rent Transcript Boundary

The public repository contains official sources, public-safe metadata, and the
research method. It does not contain raw Otter bodies or private connector
identifiers.

The next transcript-production pass must declare and census its source
population, deduplicate recordings, preserve attributable complete turns,
correct automated text against audio, distinguish types of statements, and
rights-review non-official speakers before public full-text projection.

The automated transcript's first-name error for Eon Huntley is a documented
correction task. It is not silently reproduced as fact.

## Recommended Closeout Order

1. Complete the public-surface review packet, especially the eight photograph
   decisions.
2. Run the final deterministic, production-build, Docker, and route matrix on
   one unchanged candidate.
3. When model budget is available, bind fresh professor and composite holdouts
   to that candidate and pass twice.
4. Merge to staging and run release observation while preserving noindex.
5. Approve production content and indexing explicitly.
