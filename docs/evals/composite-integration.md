# Composite Integration Evals

The composite suite tests whether the strongest compatible controls from the
frozen `feature/evals-A` through `feature/evals-N` family have been integrated
into the canonical `feature/knowledge-g` system without creating another
knowledge bank.

Canonical suite: `.agents/evals/composite-integration.json`

Executable runner: `scripts/run-composite-integration.mjs`

Frozen branch record: `docs/knowledge-bank/frozen-evals-family.json`

## What It Adds

The existing knowledge-development and portfolio-production-readiness suites
remain canonical. The composite suite adds cross-branch controls for:

- append-safe public-safe intake;
- multidimensional read-only retrieval;
- fail-closed publication-surface coverage;
- candidate, rubric, graph, projection, and corpus fingerprints;
- stale-judgment rejection;
- non-additive population controls;
- visible iteration and stop history;
- exact-candidate build and browser evidence;
- explicit separation of machine, independent, human, rights, and release
  authority.

## Commands

```bash
npm run evals:composite
npm run test:composite-evals
npm run run:composite-integration
npm run check:composite-integration
```

`npm run check:pre-evidence` is the non-self-referential bootstrap contract.
Run it before creating an exact-candidate evidence manifest. After the manifest
exists, `npm run check` is the authoritative root confirmation and must pass
without omitting the composite gate.

Use `--judgments <file>` only for scorecards produced independently of the
optimizing patch. The judgment bundle must include the exact candidate and
rubric fingerprints emitted by the runner.

Use `--previous <report>` to demonstrate a second passing run on an unchanged
candidate. Use `--require-pass` only for the complete gate. It must continue to
fail while required independent or human decisions are absent.

## Recursive Protocol

1. Freeze the candidate and rubric fingerprints.
2. Run all deterministic checks before editing.
3. Select the highest-severity privacy, provenance, graph, or projection
   failure; otherwise choose the highest-weight blocker.
4. Make the smallest coherent improvement.
5. Run affected tests, the full repository contract, adjacent regressions, and
   a blind holdout where interpretation is involved.
6. Reject any patch that weakens evidence, collective credit, privacy,
   accessibility, or reader comprehension.
7. Record accepted, rejected, blocked, and superseded iterations under
   `docs/qa/knowledge-g/composite-integration/`.
8. Require two passing runs on the same candidate.
9. Stop after eight iterations, three no-improvement iterations, or an honest
   external or human boundary.

A local pass reports engineering readiness. It is not publication approval or
production release authority.
