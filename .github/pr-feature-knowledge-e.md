## Summary

- Integrates the strongest compatible work from `feature/evals-A` through
  `feature/evals-N` onto the current knowledge branch.
- Implements a typed, loss-resistant knowledge lifecycle for intake, sources,
  proposition-level readings, claims, research tasks, corrections, projection
  decisions, anti-claims, and public-safe boundaries.
- Adds candidate-bound recursive evals for knowledge lifecycle and portfolio
  launch readiness, including Chad, Margaret Morse, and Warren Sack lenses.
- Adds operational intake, query, report, validation, compiled-output privacy,
  and semantic-inflation checks.
- Strengthens the public portfolio and downloadable resume while preserving
  collective credit, uncertainty, protected evidence, and publication choice.

## Base and head

- Base branch: `develop`
- Base SHA: `2ec37fe6e47d11e600ede204d19a98f7d3cff139`
- Head branch: `feature/knowledge-e`
- Final governed candidate:
  `8e68adecb69e1b8daf3745c2b8662fa090e90b94`
- Composite ledger:
  `docs/integration/feature-evals-composite-ledger.md`
- Hill-climb record:
  `docs/integration/feature-knowledge-e-hill-climb.md`

## Public portfolio changes

- Removes internal editorial status and staging language from public routes.
- Synchronizes public copy, structured claims, direct evidence paths, and the
  downloadable two-page resume.
- Uses Jamie's phone number in the resume PDF.
- Removes the unsupported Harry J. Epstein doubling claim.
- Bounds WOWList metrics to a dated 2017 activity snapshot and does not convert
  activity into adoption.
- Separates Sunday Dinner's 300-plus gatherings from the distinct 196 Artists
  Residency founder role and 20-plus resident-artist record.
- Preserves Julia Fredenberg's Sunday Dinner co-host credit.
- Gives KC Town Hall a cited official sequence without implying disbursement,
  completed restoration, or a causal outcome that the records do not establish.
- Keeps NYC Artist Coalition and FairRentNYC chronology consistent at
  `2017-Present`.
- Adds three public artifact images with provenance records while leaving the
  final rights and consent gate pending.

## Eval evidence

### Knowledge lifecycle

- Independent score: `100`
- Hard-gate failures: `0 / 8`
- Quality-target gaps: `0 / 4`
- Judge-floor failures: `0`
- Deterministic tests: `119 / 119`
- Repository graph: 38 entities, 154 intake records, 275 sources and readings,
  123 claims, 54 research tasks, and 100 projection decisions

### Launch readiness

- Independent score: `100`
- Hard-gate failures: `0 / 14`
- Quality-target gaps: `0 / 2`
- Judge-floor failures: `0`
- Deterministic tests: `20 / 20`
- Citation tests: `10 / 10`

Both assessments are bound to the exact governed candidate, with no stale
content or suite fingerprint.

## Browser and build evidence

- `npm run build`: passed, 17 routes
- Browser profile: local production build at `127.0.0.1:3034`
- Coverage: 14 required routes x 4 viewports = 56 observations
- Browser hard failures: 0
- Browser errors: 0
- Horizontal overflow failures: 0
- Staging indexing behavior remains `noindex, nofollow`

## Human gates

The recursive protocol stops as `stop_human_blocked`. These gates remain
pending and were not self-certified:

- Jamie claim approval
- Jamie production approval
- media rights and consent
- collaborator-sensitive credit review
- collaborator claim corroboration or permission
- blind hiring-reader validation

## Review note

This PR is for review against `develop`. Do not merge, deploy, index, or perform
the production cutover without the named human approvals.
