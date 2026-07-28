# Pre-Launch D Status

- Date: 2026-07-28
- Branch: `feature/pre-launch-D`
- Base: `develop`
- Pull request: draft until the open gates below are resolved

## Decision

The application source builds cleanly under the repository's Node 26
environment, the new archival-production systems pass their deterministic
checks, and the Knowledge Wiki is structurally current. This is a strong
integration candidate for review.

It is not yet a production-approval receipt. Fresh model-bound holdouts,
staging observation, image rights and consent review, editorial approval, and
Jamie approval remain separate gates.

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
- A resource-aware pre-launch eval contract that runs the cheapest affected
  deterministic checks during iteration and reserves exact candidate-bound
  model judgments for candidate lock.
- A documented repair of two inherited Knowledge Wiki review locks after
  semantic and public-safety revalidation.

## Current Deterministic Evidence

- `npm run wiki:check`: pass; 184 records, 671 semantic/evidence edges, 348
  prose links, no type-aware orphans, and generated outputs current.
- `npm run wiki:test`: 122 of 122 tests pass.
- `npm run wiki:eval`: 121 of 121 blocking criteria pass across 13 lenses.
- `npm run knowledge-bank`: pass with 11 existing careful-claim warnings.
- `npm run public-safety`: pass.
- `npm run check:knowledge-evals`: pass, 5 of 5.
- `npm run test:knowledge-evals`: 196 of 196 mutation tests pass.
- Campaign-media census check and its three tests: pass.
- Public-testimony check and its four tests: pass.
- Pre-launch contract check and its seven tests: pass.
- Application TypeScript, ESLint, and production Next build: pass under Node
  26.5.0. No application source changed after that build.

## Model-Bound Blockers

The repository correctly refuses to reuse stale model evidence:

- `npm run evals:professor-lenses` passes 12 of 14 criteria. Its current
  professor candidate digest is
  `772b0acb54d660def348a0844f618649d0de419ccc75623fd8e1c4546f60fc56`;
  the six existing final scorecards remain bound to an older candidate digest.
- `npm run evals:composite` passes COMP-001 through COMP-005, COMP-007, and
  COMP-008. COMP-006 remains blocked by the stale professor receipts, and
  COMP-009 remains blocked because two provenance-bound independent holdouts
  for the exact current source-tree candidate do not yet exist.
- The available model-evaluation budget is exhausted. This is recorded as
  `blocked-budget`, not translated into a pass or worked around by editing an
  approval artifact.

The frozen pre-launch contract requires two consecutive unchanged,
exact-candidate passes when model evaluation resumes.

## Human and Runtime Gates

- Review rights, consent, exact credit, and crop for every displayed image.
- Complete Jamie's editorial review of public copy and collective-credit
  framing.
- Resolve the 92-versus-94 Hester Street address discrepancy between a
  protected coordination record and the encountered public event page.
- Obtain a fresh live PhotoKit receipt; the prior live probe did not complete.
- Build and deploy the exact accepted candidate to staging.
- Observe desktop, 320px mobile, 200 percent zoom, keyboard focus, image
  loading, citation navigation, and JavaScript-disabled rendering on staging.
- Confirm staging remains noindex and that protected material does not appear
  in rendered HTML or source maps.
- Obtain Jamie's explicit production and indexing approval.

## Commercial-Rent Transcript Boundary

The public repository contains official sources, public-safe metadata, and the
research method. It does not contain raw Otter bodies or private connector
identifiers.

The next transcript-production pass must:

1. declare and census its source population;
2. deduplicate raw and cleaned recordings of the same event;
3. preserve each complete attributable supportive speech;
4. correct automated text and speaker identity against audio;
5. distinguish spoken remarks, written statements, and legislative text;
6. rights-review non-official speakers before public full-text projection.

The automated transcript's first-name error for Eon Huntley is a documented
correction task. It is not silently reproduced as fact.

## Recommended Closeout Order

1. Review this branch's public copy, images, rights, credits, and known address
   discrepancy.
2. When model budget is available, bind fresh professor and composite holdouts
   to one unchanged candidate and pass twice.
3. Merge to staging and run the release-observation matrix.
4. Resolve any staging defects without changing the candidate unnoticed.
5. Approve production content and indexing explicitly.
