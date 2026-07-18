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

Run records form an ordered SHA-256 chain. The validator resolves every recorded
commit and tree in Git, recomputes its governed-input digest, recomputes holdout
scores and floors, and rejects missing commands, unknown criteria, duplicate
reviewers, stale prompts, or an attempt to grant production authority. The
canonical deterministic runner captures timing and output digests for every
required command. Version 2.5 retains both the raw stream and a normalized,
human-readable text copy, and requires deterministic runs to retain the same
seven-dimension decision record, authority log, disagreement record, and reopen
review required of holdouts. The deterministic assessment describes automated
coverage only; it does not impersonate editorial or human judgment. Failed runs
and rejected holdouts remain in the chain;
they are evidence about the system, not debris to erase.

Prompts are versioned with the contract. Contracts remain archived under
`evals/_shared/contracts/`, so stronger current rules do not rewrite the
validity requirements for historical records. A later rejection resets the current
acceptance phase, including earlier deterministic passes. A numerical pass can
never erase a reviewer's refusal or a nonempty blocking-finding list. Accepted
holdouts retain the seven decision dimensions, human authority log, reopen
review, disagreements, and overrides required by the launch suite.

Holdouts supply a model-context attestation binding their session, provider,
candidate commit, and governed prompt. The recorder verifies that the reviewer
did not inspect run records, generated reports, prior scores, or edit the
candidate. This documents process separation; it does not cryptographically
prove human identity. External human review remains outside model authority.

## Recursive protocol

1. Freeze the contract and record both digests.
2. Run deterministic checks and separate blockers from scored weaknesses.
3. Choose the lowest blocking or scored criterion.
4. State one falsifiable hypothesis and make the smallest coherent change.
5. Run affected mutation tests, then the complete check.
6. Obtain a fresh judgment without showing prior scores.
7. Keep the change only if it improves the objective without weakening safety,
   source boundaries, collective credit, accessibility, or reader clarity.
8. Repeat until two consecutive deterministic passes are followed by two
   independent holdouts that accept the unchanged governed candidate. Holdouts
   recorded before or between the qualifying deterministic passes cannot
   satisfy the stop condition.

Run `npm run eval:run` only after committing a frozen candidate. Give each
holdout exactly one governed prompt from `evals/_shared/`, keep prior scores and
run records out of view, save its JSON judgment outside the repo, then ingest it
with `npm run eval:record-holdout -- --input ... --prompt ... --session ...`.

`npm run check:eval-records` validates the complete hash-chained history.
`npm run check:eval-contract` validates contract structure and reports the stop
state without making ordinary development checks circular. Only
`npm run certify:eval-contract` fails when the recursive stop condition has not
been met. The canonical runner also executes staging and production preflights,
the full repository check, dependency audit, and browser evaluation. The browser
gate exercises responsive routes, keyboard focus, canonical/noindex metadata,
console errors, and citation endnote/backlink semantics against the built app.

## Authority and open gates

Hard gates cannot be averaged away. Criterion results require evidence and
actual scores. Command records require actual exit codes. Disagreement,
overrides, unresolved risk, and external gates remain visible.

Acceptance means ready for pull-request review. It does not complete real-reader
testing, collaborator response, media permission, staging deployment, production
deployment, indexing, or Jamie's approval of the exact release SHA. Jamie retains
final authority for public truth, consent, credit, and promotion.
