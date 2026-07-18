# Knowledge Composite Integration Run

Date: 2026-07-17

Branch: `feature/knowledge-n`

Candidate commit: `1dfc2cbb4adebe4d19d0730f2a5e85756a6b8728`

Contract version: `2`

Contract fingerprint: `2b2322c54cdf2b52535c0bb53e8c5d59fda6bc2c23fab42cac93fa5cab5ea5ca`

Candidate fingerprint: `db27f859d131460ad72d31d451c0b337a2ca9edd71dc8566d6a4368297bc9367`

## Decision

`pass_for_code_review`

The composite integration is ready for pull-request review. It is not yet
approved for job-application sharing, production deployment, or production
indexing. Those decisions remain bound to explicit human gates.

## Integration Scope

The run began from the pinned `feature/knowledge-n` baseline at
`10d20ecd5d8d9f3b94b403fbecf483fef92b5dfe`. It inspected the complete
`feature/evals-*` donor family A through N and selectively integrated durable
controls into the canonical N lifecycle. The frozen contract records every
accepted and rejected donor decision. No donor branch was merged or
cherry-picked wholesale, and no second knowledge bank, publication registry,
database, CMS, or public search surface was created.

The resulting system adds:

- exact agency and collective-credit relations;
- bounded intake, query, reporting, and compiled-leak controls;
- selective composition manifests and mosaic-privacy review;
- archival survivorship, rights separation, and research re-entry controls;
- exact-candidate fingerprinting and two independent holdout receipts;
- truthful separation of code-review, application-share, and production gates.

## Recursive Hill Climb

Nine iterations were required. The state record preserves the complete defect
log. The substantial repairs included:

1. Preserving structural validation errors during holdout aggregation.
2. Narrowing compiled-output leak checks to publicly served text.
3. Making missing holdouts fail explicitly instead of normalizing to infinity.
4. Binding mosaic review and adding operator, rights, and re-entry mutations.
5. Binding holdout agreement to an exact Git candidate.
6. Requiring the named candidate commit itself to contain implementation work.
7. Closing graph, composition-route, and receipt-evidence bypasses.
8. Repairing lifecycle and knowledge-checker regressions while strengthening
   donor decisions, public wording, query modes, survivorship, claim budgets,
   receipt schema, history inspection, and human-status validation.
9. Separating each judge's receipt-level trust decision from the deterministic
   two-receipt aggregate, removing an evaluator contradiction without weakening
   unchanged-candidate identity.

## Independent Holdouts

Two distinct, read-only judges evaluated the unchanged version-two candidate.
Neither authored the patch nor saw the optimization history. Both reproduced
the exact SHA and fingerprints, reported no critical regression or unresolved
instrument defect, and returned `pass_for_code_review`.

| Criterion | Holdout 1 | Holdout 2 | Conservative aggregate |
| --- | ---: | ---: | ---: |
| CI-001 | 3 | 4 | 3 |
| CI-002 | 4 | 4 | 4 |
| CI-003 | 4 | 4 | 4 |
| CI-004 | 4 | 4 | 4 |
| CI-005 | 4 | 4 | 4 |
| CI-006 | 4 | 4 | 4 |
| CI-007 | 3 | 3 | 4 |
| CI-008 | 3 | 3 | 3 |
| CI-009 | 4 | 4 | 4 |

The deterministic checker derives aggregate `CI-007 = 4` only after validating
both exact independent receipts. The final weighted score is `0.950`, above the
`0.900` implementation-review threshold, with every criterion at least `3` and
all required criteria at `4`.

## Verification Record

The exact candidate or its unchanged public runtime passed:

- 52 knowledge-lifecycle tests;
- 32 composite-integration tests, including aggregate-derivation mutation;
- 10 citation tests;
- the frozen 27-eval portfolio suite, including 18 portfolio-eval tests;
- 5 blind-spot evidence tests;
- knowledge-bank, lifecycle, citation, corpus, route, metadata, robots, public
  safety, and compiled-leak checks;
- Node 26 TypeScript, ESLint, and Next.js production build;
- a Docker staging build and 18-endpoint HTTP 200 runtime smoke;
- staging robots behavior with indexing disabled;
- responsive, metadata, link, and console browser QA before the final
  evaluator-only commit. Version two did not change public runtime code.

The public-safety checker completed with 16 intentional review warnings and no
failure. The host's optional native Node dependency was repaired by reinstalling
dependencies under Node 26; `package-lock.json` was restored and no source
change resulted. `npm audit` continues to report two moderate dependency
vulnerabilities; they are recorded residual risk rather than a hidden pass.

## Human Gates

The following remain deliberately pending:

- `PR-019`: trusted hiring reader review;
- `PR-025`: exact-candidate human launch QA;
- artifact-level rights and permissions;
- collaborator consent where recorded as required;
- exact-candidate production approval;
- explicit production indexing approval.

No automated score, AI judgment, or protocol result has been represented as a
human approval. The valid next action is pull-request review, followed by the
named human gates before application sharing or production launch.
