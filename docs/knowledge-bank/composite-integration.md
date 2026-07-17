# Composite integration decision register

Status: implemented on `feature/knowledge-d`

Starting candidate: `5a7095ffc8e064c5fff8a5acfb114e04f7114a15`

Apply target: `develop`

## Purpose

This register records how the frozen `feature/evals-A` through
`feature/evals-N` branch family informed one maintained system. It is a decision
record, not a second rubric or knowledge store. Historical branch contents stay
in Git; the active implementation lives in the canonical paths named below.

## Governing decisions

1. Preserve `apps/www/src/data/knowledge-bank/records.ts` and its imported
   modules as the only canonical machine-readable knowledge system.
2. Preserve `proofs.ts` as a curated hiring-facing projection layer, never as
   an independent source of stronger facts.
3. Preserve every v23 criterion and create v24 only because the evaluation
   contract itself changed.
4. Select the active contract through one pointer:
   `evals/launch-readiness/active.json`.
5. Bind observations to the exact current Git SHA and canonical SHA-256 suite
   fingerprint.
6. Reject stale, duplicate, wrong-layer, threshold-inconsistent, or
   self-impersonated evidence before scoring.
7. Require distinct semantic grader identities and run IDs. A changed run ID
   alone does not create independence.
8. Keep human comprehension, collaborator agreement, rights clearance,
   application choice, and launch approval as non-agent judgments.
9. Make the bank queryable and reportable by reading canonical records
   directly. Generated reports remain derived views and must pass drift checks.
10. Keep the public website editorially composed. No public knowledge browser,
    database, CMS, or automatic projection was added.

## Branch-family synthesis

| Branch | Distinct strength retained | Integrated expression |
| --- | --- | --- |
| `feature/evals-A` | Makes missing population and evidence visible | Intake, inquiry, and open-state gates remain explicit |
| `feature/evals-B` | Separates kinds of concern | Criterion domains and observer layers prevent one score from hiding another |
| `feature/evals-C` | Distinguishes application readiness from production and privacy | Human application, runtime release, and approval remain separate gates |
| `feature/evals-D` | Establishes a versioned recursive protocol | v23 is preserved; v24 is active and historical versions remain runnable |
| `feature/evals-E` | Gives knowledge a rich lifecycle | Intake maturity, public use, editorial state, evidence, and projections stay distinct |
| `feature/evals-F` | Treats release engineering as evidence | Exact candidate binding and the runtime release gate remain non-substitutable |
| `feature/evals-G` | Uses fingerprints and holdouts against overfitting | Contract fingerprints, exact SHA binding, and holdout criteria are enforced |
| `feature/evals-H` | Centers close reading, agency, and editorial restraint | Chad, decomposition, selection, and archive-bias criteria remain scored |
| `feature/evals-I` | Tests evaluator correctness adversarially | New tests reject mismatched contracts, commits, identities, and pass flags |
| `feature/evals-J` | Separates optimizer from judge under a frozen rubric | Independent observer policy and immutable historical contracts are explicit |
| `feature/evals-K` | Makes the bank operable through tools | Query, lifecycle report, and generated projection register were added |
| `feature/evals-L` | Keeps the lifecycle compact enough to maintain | New tools read the existing records instead of creating another schema |
| `feature/evals-M` | Brings data-quality discipline across platforms | Existing bounded population validators remain hard gates in one domain |
| `feature/evals-N` | Protects cross-surface consistency and governance | Projection drift, active-version ownership, and canonical-record checks fail closed |

## Active contract

The v24 contract has 45 criteria:

- 28 non-tradeable hard gates;
- 17 scored criteria whose weights total 1;
- eight domains covering accuracy, knowledge lifecycle, archival production,
  evaluation integrity, experience, narrative, human truth, and release; and
- six protected invariants that cannot be traded for a higher score.

Two new hard gates carry the composite changes:

- `EVALSYS-001`: candidate, contract, observer, and threshold integrity.
- `KNOWOPS-001`: queryable canonical knowledge and projection-drift control.

## Operator path

```bash
npm run knowledge:query -- CallNYC
npm run knowledge:report
npm run knowledge:projection-map
npm run check:knowledge-operations
npm run check:launch-evals
npm run eval:launch-readiness
```

The query and reports omit evidence locators, internal excerpts, raw archives,
and machine-local paths. The tracked projection register is generated from
canonical records and checked for drift.

## Recursive climb protocol

1. Establish the full deterministic baseline.
2. Select the lowest failing mutable criterion.
3. State one causal hypothesis.
4. Make one bounded change.
5. Re-run the targeted criterion and every previously passing hard gate.
6. Keep the change only when the lexicographic objective improves without
   weakening an invariant.
7. Bind browser and semantic observations to the final exact commit and
   contract fingerprint.
8. Stop at real human, collaborator, rights, application, or deployed-runtime
   judgment.

## Deliberate non-integration

The composite does not add a public knowledge-bank route, automatic website
publication, a second fact store, a database, a CMS, private archive browsing,
or agent-created human approval. It does not alter the frozen branch family.
