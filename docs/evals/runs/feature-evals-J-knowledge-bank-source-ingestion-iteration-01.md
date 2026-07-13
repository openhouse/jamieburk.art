# feature/evals-J - Source Ingestion Iteration 01

## Frozen inputs

- Rubric commit: `2216610afa01637ef81d95c1a69112cc2acdc090`
- Candidate before: `c42dc1ebfe79eca443171240667eaeac97ca1eae`
- Content candidate after: `059d63325064d8b4d57e288d371d8a765dd85961`
- Target: `claim-development`
- Selected criterion: `KB-006 - Maturity and projection discipline`
- Judges: distinct fresh, read-only Codex sessions

## Scope

- `INTAKE-WATERWAYS-PARTICIPATORY-PRACTICE-2026-07-12`
- `INTAKE-SUNDAY-DINNER-COMMUNITY-HOSTING-2026-07-13`
- `INTAKE-NYCA-CULTURAL-SPACE-POLICY-2026-07-12`
- `INTAKE-CALLNYC-COUNCIL-ENGAGEMENT-2026-07-12`

## Evidence before

The expanded source candidate passed the knowledge-bank schema and public-safety
checks, but `npm run test:citations` failed one regression test because it
asserted exactly three intake records. The canonical proof record also included
new Sunday Dinner provenance that was not synchronized into the human-readable
claim register.

- Weighted score: `0.825`
- `KB-006`: `3`, criterion pass with a deterministic regression finding
- All other criteria: claim-development pass
- Run-level decision: `revise`; the exact candidate had one judgment and could
  not satisfy the two-pass stop rule

## Change

- Replaced the brittle three-item assertion with an invariant that requires a
  non-empty intake collection and checks every item for non-projection and public
  registry exclusion.
- Synchronized the Sunday Dinner evidence class, source basis, source note, and
  review date between `apps/www/src/data/proofs.ts` and
  `docs/knowledge-bank/claims.md`.
- Preserved the exact public wording, website routes, public citation registry,
  and `no-public-projection` status of all intake records.

## Evidence after

- Weighted score: `0.8425`
- `KB-006`: `3 -> 4`, pass
- `KB-010`: `3 -> 2`, pending because this iteration and its exact-candidate
  scorecard were not yet durable at judgment time
- `npm run test:citations`: `12/12` pass
- `npm run test:knowledge-bank-evals`: `16/16` pass
- `npm run check:citations`, `npm run evals:knowledge-bank`,
  `npm run knowledge-bank`, `npm run public-safety`, and route checks: pass
- No website surface or generated public citation changed

The read-only judge's `npm run report:citations` attempt failed only because that
report command writes a generated file and the judge was intentionally sandboxed
read-only. Citation validation and tests passed independently.

## Regressions

- No content, privacy, claim, credit, projection, route, registry, or public-site
  regression was observed.
- Process integrity remains pending until this iteration and scorecard are
  committed and fresh judges certify the unchanged content candidate.

## Decision

`accept`

The selected criterion improved and the content candidate cleared the weighted
threshold. Commit the process record, keep
`059d63325064d8b4d57e288d371d8a765dd85961` unchanged, and obtain two fresh
passing judgments before recording `stop_threshold_met`.
