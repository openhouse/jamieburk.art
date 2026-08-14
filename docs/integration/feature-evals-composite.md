# Feature eval family composite integration

## Decision

`feature/knowledge-h` keeps the H-derived knowledge bank as the canonical
architecture and treats `feature/evals-A` through `feature/evals-N` as frozen,
read-only reference implementations.

The branch family is not merged wholesale. It contains overlapping schemas,
duplicate corpora, alternative run layouts, and different names for equivalent
concepts. Useful contracts are adopted or adapted into the existing schema;
parallel roots are rejected.

The machine-readable decision register is
`docs/integration/feature-evals-composite.json`.

## Composite additions

- A hashed nine-criterion composite integration rubric.
- Exact frozen heads and an inspectable A-N decision for every branch.
- Append-safe intake replay, duplicate preservation, and collision rejection.
- Queryable held claims, open inquiries, corrections, projection states, and
  orphan sources.
- Mutation tests for branch omission, missing destinations, arbitrary semantic
  drift even after checksum refresh, fabricated heads, decorative decision
  records, optimizer self-grading, synthesized human evidence, candidate-file
  omission, provenance collapse, and blocker compensation.
- Two independent holdout records bound to one content fingerprint.

The content fingerprint represents the raw bytes of the complete tracked and
unignored Git source tree except for those two result records. The evidence bundle remains a
high-signal reading guide, while exact candidate identity includes every source,
public UI, accessibility, indexing, validation, runtime, and release file.

Source-branch identity resolves through `refs/remotes/origin`; this avoids a
local branch with the same short name silently substituting a different commit.
The base portfolio suite, decision register, and human blind-spot controls are
also content-bound to reviewed digests.

## Deliberate non-additions

- No second lifecycle schema or records root.
- No public knowledge-bank or proofs route.
- No wholesale copy of branch corpora already represented by H.
- No new public portfolio copy merely to demonstrate integration.
- No claim that automated controls constitute collaborator permission, hiring
  validation, production approval, or real-world impact.

## Website decision

The inherited H public composition remains selected. Its complete baseline,
professor lenses, citation graph, knowledge checks, and public-safety checks
pass. The composite changes improve future ingestion and governance but do not
provide new evidence that would justify increasing current reader burden.

## Verification

Run:

```bash
npm run evals:composite
npm run test:composite
npm run test:lifecycle-operations
npm run check
npm run preflight:staging
npm run preflight:production
```

PR readiness remains separate from production approval. The exact commit still
requires Jamie's approval before deployment or indexing.
