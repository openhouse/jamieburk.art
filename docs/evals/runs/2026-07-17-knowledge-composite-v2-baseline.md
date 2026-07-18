# Knowledge Composite Integration Version-Two Baseline

Date: 2026-07-17

Branch: `feature/knowledge-n`

Lineage baseline commit: `10d20ecd5d8d9f3b94b403fbecf483fef92b5dfe`

Instrument-repair starting commit: `330503ad986919ddd6ed2967120b2b3deb0f0bb7`

## Reason For Version Two

Two read-only judges independently reproduced the contract and candidate
fingerprints and found no critical regression or unresolved instrument defect.
Both nevertheless withheld the required `CI-007 = 4` because each was forbidden
from inspecting the other holdout receipt while the receipt-level rubric asked
each judge to prove the completed two-receipt aggregate.

That was an evaluator-design contradiction. It was not repaired by changing a
score or exposing one judge to another. Contract version two assigns each judge
the frozen instrument, its own independence, and its own exact-candidate
binding. The deterministic aggregate checker alone verifies the pair and may
derive final `CI-007 = 4`.

## Preserved Invariants

- The original lineage baseline, canonical N lifecycle, 27 frozen portfolio
  evals, public claims, routes, rights holds, and human gates are unchanged.
- Two distinct read-only judges remain mandatory.
- Both receipts must bind one exact candidate SHA and identical contract and
  candidate fingerprints.
- Each receipt must use the exact schema, cite evidence present in the
  candidate commit, report no critical regression or unresolved instrument
  defect, and score receipt-level `CI-007` at least `3`.
- Evaluation dates may differ because unchanged candidate identity, not a
  shared calendar day, is the trust boundary.
- Code-review readiness remains separate from application sharing and
  production approval.

## Starting Evidence

At the instrument-repair starting commit, 52 lifecycle tests, 31 composite
tests, citation tests, the frozen 27-eval suite, public-safety checks, route
checks, Node 26 typecheck/lint/build, a staging Docker build, and an 18-endpoint
runtime smoke had passed. Human gates remained pending.

## Decision

Freeze contract version two, produce a new candidate fingerprint and commit,
and discard all earlier receipts. Run two fresh independent holdouts against
the unchanged version-two candidate.
