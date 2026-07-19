# Knowledge Composite Integration Version-Three Baseline

Date: 2026-07-17

Branch: `feature/knowledge-n`

Lineage baseline commit: `10d20ecd5d8d9f3b94b403fbecf483fef92b5dfe`

Version-two candidate commit: `1dfc2cbb4adebe4d19d0730f2a5e85756a6b8728`

## Reason For Version Three

Two version-two holdouts passed the unchanged candidate, but the subsequent
full repository gate found an existing-suite regression in `KC-FB-005`. The
website had moved KC Spaces Fund to the stricter canonical Technical Operations
projection registry while the older eval still required the previous inline
`getClaimProjection` source-code spelling.

The underlying public wording, bounded role, collective credit, anti-claims,
and active canonical projection remained correct. Version three repairs the
eval to verify the canonical registry reference and resolver path, adds a
mutation that removes that resolver, and places the legacy role eval itself in
the candidate fingerprint scope. The focused eval then passed `100/100`, and
the complete repository check passed before this candidate was frozen.

## Preserved Invariants

- The lineage baseline, donor A-N decisions, canonical N lifecycle, 27 frozen
  portfolio evals, public claims, routes, rights holds, and human gates remain
  unchanged.
- The version-two separation between receipt-level and aggregate holdout trust
  remains unchanged.
- Two new distinct read-only judges must review the same version-three SHA and
  identical contract and candidate fingerprints.
- Earlier receipts are historical evidence only and cannot satisfy this run.
- Code-review readiness remains separate from application sharing, production
  approval, and indexing.

## Starting Evidence

Before freezing version three, the focused KC Spaces Fund corpus and adversarial
eval passed, followed by the full `npm run check`: citation, portfolio,
blind-spot, lifecycle, composite, social-corpus, TypeScript, ESLint, build,
knowledge-bank, public-safety, and route checks all passed. Human gates remained
pending.

## Decision

Freeze contract version three, compute new fingerprints, bind the mosaic review
to the new candidate, and discard all earlier receipts for aggregate scoring.
Run two fresh independent holdouts against the unchanged version-three
candidate.
