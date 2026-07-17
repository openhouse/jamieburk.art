# Feature/evals composite integration

## Purpose

This cycle integrates the strongest non-duplicative capabilities from the
frozen `feature/evals-A` through `feature/evals-N` branch family into
`feature/knowledge-c`.

The branch family is evidence, not a merge queue. `feature/knowledge-c` remains
the governing architecture. Every inspected capability receives an explicit
`adopt`, `adapt`, `deduplicate`, `defer`, `protect`, or `reject` disposition.

## Contract-first cycle

1. Pin the frozen remote heads.
2. Freeze `evals/composite-integration/suite.json` and its mutation fixtures.
3. Capture the failing `feature/knowledge-c` baseline.
4. Implement one highest-value missing capability at a time.
5. Run focused tests, canonical checks, and candidate-bound judgments.
6. Reject any iteration that weakens public safety, source boundaries,
   collective credit, or reviewability.
7. Stop after two consecutive passing runs on the same candidate and contract.

Changing the contract starts a new version and invalidates the baseline and
judgments. A diagnostic pass does not close human-reader, rights, production,
or publication-approval gates.

## Governing architecture

- Canonical knowledge: `apps/www/src/data/knowledge-bank/records.ts`
- Lifecycle records: `apps/www/src/data/knowledge-bank/lifecycle-records.ts`
- Public projection: `apps/www/src/data/knowledge-bank/public-registry.json`
- Knowledge eval: `evals/knowledge-lifecycle/`
- Portfolio eval: `evals/portfolio-readiness/`
- Blind-spot diagnostic: `evals/blind-spots/`
- Composite integration contract: `evals/composite-integration/`

The composite suite evaluates integration quality. It does not replace or
duplicate any of the three governing suites.

## Evidence layers

Deterministic checks, model judgments, human-reader evidence, rights review,
production evidence, and Jamie's approval remain distinct. A missing external
layer is recorded as blocked; proxy signals cannot promote it to pass.

## Commands

```bash
npm run test:composite
npm run evals:composite
```

The final composite runner also invokes the canonical citation, knowledge,
public-safety, route, knowledge-lifecycle, and application-readiness checks.
