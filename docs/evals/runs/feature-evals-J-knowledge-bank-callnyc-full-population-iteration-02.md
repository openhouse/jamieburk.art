# feature/evals-J - CallNYC Full-Population Iteration 02

## Frozen inputs

- Rubric commit: `2216610afa01637ef81d95c1a69112cc2acdc090`
- Unchanged content candidate: `f2080d2050251e769445f62fb9771e742f16e5cf`
- Process evidence commit: `aed4b6e7b7f5c9c8b5176e7f17de14eaa9691b9d`
- Target: `claim-development`
- Selected criterion: `KB-010 - Recursive optimization integrity`
- Certification 1 judge session: `019f63f1-d596-74a2-9b10-61be1696555e`

## Scope

All eighteen knowledge-bank intake records, including the integrated CallNYC
full-population record and its governed website projection.

## Evidence before

The baseline passed every content criterion and failed only the candidate-
specific process criterion.

- Weighted score: `0.835`
- `KB-010`: `1`, blocking failure
- Consecutive passing runs: `0`
- Run-level decision: `revise`

## Change

Committed the fresh baseline and complete iteration record at `aed4b6e7`. The
content candidate stayed unchanged; that commit added only two process files
under `docs/evals/runs`.

## Evidence after

- Weighted score: `0.85`
- `KB-010`: `1 -> 3`, pass
- Every blocking and nonblocking criterion: `3` or above
- Full census recomputation: `110 / 107 / 3`, with `86 / 6 / 15` relationship
  counts and `71 / 61 / 26` issue-pathway counts
- Office-account source inventory: eight unique accounts, status URLs, and
  bounded source records
- Citation, citation-test, knowledge-bank-eval, knowledge-bank, public-safety,
  route, typecheck, and lint commands: pass
- First passing judgment on the exact content candidate: `1`

The judge verified that `aed4b6e7` is process-only and that certifications for
earlier content candidates were not reused.

## Regressions

- No knowledge, source, claim, credit, privacy, chronology, projection,
  registry, route, test, or public-site content changed after the candidate.
- The 110-slot census still exposes its three-item recovery remainder.
- Recognition targets, verified office interactions, and mutable access-time
  labels remain distinct evidence classes.
- No claim of threshold completion is made after only one passing judgment.

## Decision

`accept`

The candidate meets the frozen claim-development threshold once. Preserve the
exact candidate and obtain one additional fresh independent passing judgment
before recording `stop_threshold_met`.
