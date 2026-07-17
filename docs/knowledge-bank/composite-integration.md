# Composite Knowledge Integration

This document records how the frozen `feature/evals-A` through
`feature/evals-N` family is metabolized into `feature/knowledge-g`.

The integration ports capabilities, not branch histories. G remains the one
canonical typed graph, approval register, readiness ledger, public registry,
and publication model.

## Integrated Capabilities

- A and N: population reconciliation, explicit exclusions, corpus digests, and
  non-additive controls.
- B and J: correction history plus accepted, rejected, blocked, and stop-state
  run records.
- C and N: exact candidate, rubric, graph, projection, and corpus fingerprints
  with deterministic, independent, and human graders kept separate.
- D and F: build, accessibility, route, staging, production-preflight, Docker,
  cutover, and rollback evidence.
- E and H: reader coherence plus embodied, artistic, participatory, and
  relational intelligence.
- I: fail-closed binding of visible routes, metadata, generated data, public
  documents, and hidden claim-capable surfaces.
- K: append-safe intake receipts and read-only multidimensional retrieval.
- L: role, survivorship, outcome, visual, corroboration, cumulative-disclosure,
  and future-offer controls in the canonical readiness ledger.
- M: human-readable project dossiers that distinguish access, authorship,
  stewardship, adoption, and open research.

## Intake

Use `scripts/intake-knowledge-lead.mjs` to create the smallest public-safe
receipt for a URL, memory, artifact, metric, photo lead, or correction.

The command requires project and claim-family routing plus either a canonical
capture ID or a research-task ID. It rejects private locators, credentials, and
underlying URLs for protected pointers. `--dry-run` validates without writing.

Receipts live in `docs/knowledge-bank/data/intake-ledger.jsonl`. They are
append-only routing records, not a second claim bank. Integrated receipts point
to canonical typed captures in `apps/www/src/data/knowledge-bank/`.

## Retrieval

Use `scripts/query-knowledge-lifecycle.mjs` to retrieve stable public-safe
summaries by record type, project, claim state, surface, confidence, date,
audience, or purpose.

The query command is read-only. It distinguishes zero results from a failed
query and does not decide whether a retrieved claim should be published.

## Projection Integrity

`docs/knowledge-bank/projection-surface-bindings.json` inventories every
claim-capable route, metadata surface, generated public registry, public
document, and content source. The default policy is deny.

`scripts/check-projection-integrity.mjs` fails when a newly discovered app
surface is not bound, a claim-bearing surface lacks an evidence and citation
policy, a protected source enters the public registry, or a prohibited public
route exists.

The website remains a selective projection. Integration of a defensible claim
does not select it for the site.

## Authority

1. The knowledge and composite runners report machine state.
2. The readiness ledger reports blind spots and evidence state.
3. The approval register reports exact public-use permission.
4. Independent judges report bounded interpretive findings on fingerprinted
   candidates.
5. Jamie, collaborators, rights holders, and observed readers control their
   respective human decisions.
6. Jamie's explicit exact-candidate decision controls production release.

No layer may simulate the authority of the next.
