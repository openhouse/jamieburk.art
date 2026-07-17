# Participation Infrastructure Eval Run

Date: 2026-07-15
Criterion: `KB-EVAL-PARTICIPATION-INFRASTRUCTURE`
Branch: `feature/evals-A`

## Maturation hypothesis

The portfolio becomes stronger if protected WOW List and Sunday Dinner records
are reduced to reproducible public-safe aggregates, while public Call Script
sources make one early listening workflow concrete. The iteration must improve
source support without converting rows, marks, follows, or Facebook responses
into people or outcomes, and without assigning collective work to Jamie alone.

## Hard gates

- WOW List snapshot and geography calculations retain dates, denominators, and
  the 50-post threshold.
- Popular Vote event and follow relationships remain distinct from attendance,
  membership, endorsement, and impact.
- Sunday Dinner participant rows remain absent.
- The 2,783 workbook summary remains attributed to the workbook and the
  unresolved 14-mark difference remains visible in the bank.
- Call Script code authorship remains distinct from shared-account publishing
  and coalition formation.
- The DCLA event's 445-response display never becomes attendance or unique
  reach.
- NYC Artist Coalition credit remains collective and policy causality remains
  bounded.
- Only the existing WOW scale and NYC Artist Coalition participation arguments
  gain public weight; deeper claims remain held.

## Recursive iterations

### Iteration 1: Evidence recovery

Recovered aggregate table counts from two WOW List snapshots, reproduced the
35-group geography convention, and isolated the Popular Vote calendar's 933
event and 196 follower relationships. Inspected the complete Sunday Dinner
event-column span and found that the per-column aggregate does not exactly
reconcile with the workbook summary. Read the public Call Script page,
repository history, DCLA event, and pre-meeting discussion.

Lowest criterion: scope integrity. The first synthesis risked making public
platform relationships sound like participation outcomes.

### Iteration 2: Denominator and authorship repair

Rewrote every metric with its source object and denominator: users, post/event
rows, city-region-country groups at a stated threshold, event relationships,
follower account IDs, workbook marks, and Facebook responses. Added explicit
anti-claims for attendance, membership, unique people, endorsement, policy
impact, shared-account authorship, and sole coalition credit.

Lowest criterion: projection discipline. The deeper continuity story was true
to Jamie's practice but larger than the current page needed.

### Iteration 3: Selective projection

Kept the Popular Vote traction, Sunday Dinner reconciliation, and cross-project
continuity synthesis held in the bank. Promoted only a compact cited WOW List
scale sentence and strengthened the already-active NYC Artist Coalition
participation claim with one concrete pre-DCLA listening example.

## Result

Accepted after two consecutive deterministic passes and the complete repository
gate.

- `npm run check:knowledge-evals`: passed at 5/5 across 26 criteria.
- `npm run test:knowledge-evals`: 221 tests passed, including six new
  participation-infrastructure and adversarial mutation tests.
- `npm run knowledge-bank`: passed with the existing careful-claim guardrail
  warnings.
- `npm run public-safety`: passed.
- `npm run report:knowledge-evals`: regenerated
  `reports/generated/knowledge-bank-maturation.md`.
- `npm run check`: passed under Node 26.5.0 and npm 11.17.0, including citation,
  launch, and knowledge evals; typecheck; lint; the Next.js production build;
  knowledge-bank and public-safety checks; and route validation.
- Standalone staging smoke test: `/work/wowlist` rendered the aggregate scale
  claim and source note; `/work/fair-rent-nyc` rendered the Call Script listening
  example and source note; `/api/health` returned healthy; and `robots.txt`
  disallowed indexing.

The first full run used an inherited Node 24 x64 shell install and stopped at a
missing local `lightningcss` native binary. A clean `npm ci` under the repo's
Node 26 arm64 runtime restored the correct optional package; the unchanged full
gate then passed. This was an environment repair, not an application-code
exception or relaxed criterion.
