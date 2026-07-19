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

## Contract history

Version 1 established the branch-family, semantic, lifecycle, candidate, and
governance gates. Its first baseline exposed a diagnostic bug: a stale
application judgment made `projection_restraint` fail even though citation,
knowledge, and public-safety checks passed, and the evidence line incorrectly
read as passing. No composite judgment had been requested at that point.

Version 2 repairs the gate boundary. `projection_restraint` now depends only on
the citation, knowledge-bank, public-safety, and private-path checks;
`no_regression` separately owns application-judgment freshness. The version 1
baseline remains preserved, but version 2 requires a new baseline and new
candidate-bound judgments.

Version 3 closes a fingerprinting gap found by an independent systems review.
The branch-family ledger and governance record now participate in the contract
fingerprint because they directly affect hard gates. The append-only lifecycle
gate now runs the Git-history prefix validation rather than inferring
append-only integrity from file presence and event types. Version 2 judgments
and certification are therefore superseded.

Version 4 binds reviewability to the same candidate and contract surface as the
judgments. Generated composite judgments, certification, baselines, and the
stop record no longer change the reviewability count after the candidate is
frozen. This prevents excluded evaluation artifacts from changing a hard gate
without changing either fingerprint.

Version 5 keeps the existing review thresholds and permits a larger integration
only through at most three bounded review packets. Every candidate- or
contract-affecting changed file must be committed and assigned to exactly one
packet. Unassigned files, overlapping assignments, empty packets, oversized
packets, and dirty candidate paths fail closed. This version also brings the
Knowledge Wiki and hiring-acceptance suites into the composite no-regression
gate and fingerprint surface.

## Review packets

The packet manifest lives at
`evals/composite-integration/evidence/review-packets.json`. Its order is the
recommended review order:

1. composed portfolio, governed Wiki content, opportunities, and reader contracts;
2. evaluation contracts, fixtures, receipts, and judgments;
3. executable tooling and tests.

The 50-file, 10,000-added-line, and 2,000-added-line single-file ceilings apply
to each packet. The aggregate added-line and single-file ceilings also remain
in force. Packetization cannot hide an uncommitted file or remove a file from
the candidate and contract fingerprints.

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
public-safety, route, knowledge-lifecycle, application-readiness, Knowledge Wiki,
and hiring-acceptance checks.
