# Composite evaluation governance

The portfolio uses exactly three top-level concerns: launch readiness,
portfolio effectiveness, and knowledge-bank integrity. The shared contract at
`evals/_shared/contract.json` joins them without creating a fourth product
objective.

## Candidate binding

Each certifying run records the contract ID, semantic version, contract digest,
candidate branch, Git commit, Git tree, and digest of governed candidate inputs.
Generated reports and run records are excluded from the candidate-input digest
so evidence can be committed without a self-referential fingerprint.

A run is stale when either digest differs from the current contract. A rubric
change requires a new version and starts a new consecutive-pass and holdout
streak. Optimizers may change the candidate, never the contract that is scoring
the active iteration.

## Recursive protocol

1. Freeze the contract and record both digests.
2. Run deterministic checks and separate blockers from scored weaknesses.
3. Choose the lowest blocking or scored criterion.
4. State one falsifiable hypothesis and make the smallest coherent change.
5. Run affected mutation tests, then the complete check.
6. Obtain a fresh judgment without showing prior scores.
7. Keep the change only if it improves the objective without weakening safety,
   source boundaries, collective credit, accessibility, or reader clarity.
8. Repeat until two deterministic passes and two independent holdouts accept the
   unchanged governed candidate.

## Authority and open gates

Hard gates cannot be averaged away. Criterion results require evidence and
actual scores. Command records require actual exit codes. Disagreement,
overrides, unresolved risk, and external gates remain visible.

Acceptance means ready for pull-request review. It does not complete real-reader
testing, collaborator response, media permission, staging deployment, production
deployment, indexing, or Jamie's approval of the exact release SHA. Jamie retains
final authority for public truth, consent, credit, and promotion.
