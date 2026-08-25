# Apply A homepage hiring hill climb

**Date:** 2026-08-21

**Branch:** `apply/2026-08-21-A`

**Base:** `origin/apply/2026-08-20-A` at `d6702cc811ebfdf1e8d7b20d591a2c93a0842126`

**Candidate source commit:** `506b57f29d7d7ff64f7001d8a5975848632d32b0`

## Reader problem

The inherited homepage asked a rushed hiring reader to process six quick-path
choices, five proof points, seven featured projects, and two passages that
restated the same operating thesis. The Save NYC Spaces photograph also
appeared in the field-and-system spread immediately before the FairRentNYC
project cover.

## Kept change

- Reduced the quick path to Technical Operations, Selected work, and Resume.
- Reduced the proof strip to three high-signal claims.
- Routed the hero's primary action directly to role-fit evidence.
- Removed the duplicate operating-motif passage.
- Set a six-project sequence: FairRentNYC, Harry J. Epstein Company, CallNYC,
  KC Town Hall, WOW List, and Sunday Dinner.
- Kept Sunday Dinner on the homepage and KC Spaces Fund in the complete work
  index.
- Moved the governed field-and-system spread after the six projects so it acts
  as synthesis and no longer repeats the opening project image back to back.
- Preserved the existing full-bleed East River hero and all photo publication,
  caption, credit, and collective-work boundaries.

## Eval change and hill climb

`portfolio-photography-layout-v8` adds a blocking hiring-reader attention
budget and records the six-project argument. The deterministic evaluator now
requires exactly three quick paths, three proof points, the direct role-fit
hero action, one field-and-system passage after selected work, Sunday Dinner in
the featured sequence, and no duplicate operating-motif section.

The new field-and-system order test was run before the implementation change.
It failed because the former evaluator accepted the spread before selected
work. After moving the spread and updating the criterion, the full layout test
file passed 22 of 22 cases.

## Verification

- `npm run typecheck` - passed.
- `npm run lint` - passed.
- `npm run build` - passed with network access after the sandboxed attempt
  failed only because `fonts.googleapis.com` could not resolve.
- `npm run evals:portfolio` - passed, 17 evals with 14 blocking.
- `npm run evals:layout` - passed, 13 blocking criteria and six manifest-bound
  photographs.
- `npm run test:layout` - passed, 22 tests.
- `npm run test:accessibility-contrast` - passed, three tests.
- `npm run public-safety` - passed with the existing 11 careful-claim warnings.
- `npm run check:routes` - passed.
- `npm run knowledge-wiki` - passed with the existing careful-claim warnings.
- `npm run wiki:check` - passed, with the existing orphan diagnostic for the
  BetaNYC newsletter opportunity-source evaluation.
- `npm run wiki:employment:check` - passed after regenerating the four affected
  hiring-acceptance outputs against the candidate source commit.
- `npm run check:citations` and `npm run test:citations` - passed.
- Impeccable mechanical detector - passed with no findings.
- Mobile browser confirmation at 390 by 844 showed the six projects followed
  by the field/system synthesis and then How I Work, with no browser errors.

## Remaining exact-candidate gate

`npm run test:accessibility-evidence` intentionally fails its first test because
the previous 60-route-by-viewport accessibility receipt is fingerprint-bound
to an older public surface. This run did not rewrite or relabel that receipt.
Fresh full-matrix accessibility evidence remains required before treating this
candidate as fully release-ready. The browser confirmation above is a focused
editorial check, not a substitute for that receipt or for Jamie's publication
approval.
