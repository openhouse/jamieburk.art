---
id: evaluation.commercial-rent.advocacy-hill-climb.2026-08-12
title: Commercial Rent Stabilization advocacy evidence hill climb
kind: evaluation
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-12
review_by: 2026-09-12
canonical_path: docs/knowledge-bank/evaluations/commercial-rent-advocacy-hill-climb-2026-08-12.md
summary: Baseline, bounded intervention, and acceptance conditions for the August 2026 advocacy source return.
relations:
  - type: informed_by
    target: research.commercial-rent.advocacy-source-return.2026-08-12
    href: ../research-runs/commercial-rent-advocacy-source-return-2026-08-12.md
---

# Commercial Rent Stabilization advocacy evidence hill climb

## Baseline

The existing Knowledge Bank passed its 32-criterion evaluation at `5/5` and
`2/2` fresh independent holdouts, and all 212 deterministic knowledge-eval
tests passed. The weakness was coverage, not correctness: no canonical
machine-readable record yet represented the final report acknowledgment,
actual delivered July 29 speech, recent legislative-staff coordination, press
footage request, or bounded negative coverage result.

The isolated worktree initially lacked dependencies and used Node 24. After
normalizing to the repository's required Node 26 and installing the locked
dependencies, the baseline passed. Environment setup is not counted as a
source improvement.

## Bounded intervention

This branch adds one governed source-return module and the smallest connected
Wiki surface needed to make the new evidence inspectable. It deliberately does
not add public case-study copy, resume copy, media, a report binary, private
paths, email text, a public transcript, or a claim of press coverage.

The new hard-gate eval targets the weakest semantic boundary: plausible
language that would turn real advocacy work into an unsupported stronger
claim. Its mutation set must reject:

- prepared remarks represented as delivered remarks;
- a run of show represented as final attendance;
- staff coordination represented as elected-official endorsement;
- a scheduled meeting represented as completed work;
- a footage request represented as press coverage;
- report acknowledgment represented as authorship or full validation;
- district association represented as landlord motive or causation; and
- a public event represented as media-reuse permission.
- a live campaign post represented as Jamie-attributed coverage or completed
  NYC Artist Coalition collaborator credit.

## Acceptance rule

Keep the change only if the new exact-candidate eval passes, every adversarial
mutation is rejected, all new projections remain held, the existing
knowledge-eval suite remains green, Wiki graph and health checks pass, and
public-safety checks detect no protected locator or source leakage.

## Exact-candidate result

- Commercial-rent advocacy evaluator: 10/10 hard gates.
- Advocacy tests: 14/14, including ten adversarial mutations.
- Knowledge Wiki: 401 records, 1,403 semantic/evidence edges, 453 prose links,
  zero type-aware orphans, and 187/187 deterministic Wiki tests.
- Knowledge Wiki evaluator: 151/151 blocking criteria across 14 lenses.
- Production build: passed on Node 26.
- Candidate-bound browser matrix: 56/56 route/viewport cases, zero Axe 4.12.1
  violations, zero caption failures, no broken images after scroll, and a
  verified homepage-to-About navigation.

The repository-wide check reaches the pre-existing professor-lens exact-candidate
gate and correctly stops because its six independent scorecards describe an
earlier public-source candidate. The staged B candidate contains 121 professor
paths with SHA-256
`505689bcaaede8e54616384ac47d1d9615e11153e854cd1af4307fc458ceb20b`;
0/6 existing scorecards match it. This branch does not rewrite those judgments.
The composite suite consequently keeps `COMP-006` open and independently keeps
`COMP-009` open because its two source-tree holdout receipts also predate B.
The professor mutation suite passes 8/8 defensive cases around its one expected
exact-candidate failure; the composite mutation suite passes 15/15 defensive
cases around the same expected acceptance failure. Fresh independent review
remains a merge-readiness gate, not a reason to weaken either evaluator or
claim completion.
