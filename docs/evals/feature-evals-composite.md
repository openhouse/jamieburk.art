# Feature eval family composite

**Suite:** `.agents/evals/feature-evals-composite.json`
**Integration register:** `docs/integration/feature-evals-composite.json`
**Frozen integration origin:** `feature/knowledge-h`, originally based on `develop`
**Current release branch:** `work/2026-09-03-A`
**Current pull-request base:** `work/2026-09-01-A`
**Protocol:** suite version 2; review receipt version 4; RFC 0018 accepted October 18, 2026

## Purpose

This suite governs deliberate integration of the frozen `feature/evals-A`
through `feature/evals-N` family. It does not reward the number of imported
files. It rewards one understandable architecture that preserves the family's
strongest contracts and rejects parallel implementations.

The nine blocking criteria cover:

1. exact A-N source inventory;
2. inspectable integration decisions;
3. one canonical knowledge architecture;
4. append-safe intake and lifecycle queries;
5. source, claim, agency, correction, and population integrity;
6. selective public composition and practice continuity;
7. honest blind-spot governance;
8. frozen anti-gaming and grader separation;
9. deterministic verification of two independent exact-candidate judgments.

Every criterion scores either `4` or `0`. There is no partial-credit path around
a blocker. The complete suite passes at `36/36` only.

## Recursive protocol

1. Freeze the suite and record its rubric digest.
2. Evaluate before editing.
3. Select the highest-priority failed blocker.
4. Make the smallest coherent patch.
5. Run every non-pair technical check and mutation test before editorial judges.
   Report the missing-pair aggregate as HOLD. `preReviewCriteria` describes only
   the eight technical results; it is not independent acceptance or release.
6. Commission two fresh blind reviewers. Each judges COMP-001 through COMP-008
   only, under `substantive-COMP-001-through-COMP-008`. Each receipt contains
   exactly those eight criterion IDs once, scores at 4 or 0, evidence, findings,
   unavailable evidence and a recommendation. Neither reviewer scores COMP-009.
7. Retain only an improvement without a privacy, credit, accessibility, or
   comprehension regression.
8. Run the complete unchanged `npm run check` after both judgments exist. Every
   substantive criterion requires its technical evidence and both independent
   acceptances. COMP-009 verifies the complete pair; a missing, duplicate, stale,
   altered, extra-scope or failing judgment blocks completion.
9. Require two complete verification executions against the same candidate
   fingerprint, rubric, review payload digests and technical evidence. Recompute
   fingerprints before and after each. Keep aggregate logs outside the source tree.
10. Bind the verified source tree to the commit tested by CI. Verify the actual
    running container separately after an authorized staging release.

The candidate fingerprint covers the raw bytes of every tracked or unignored
file in the Git source tree. Only the two declared holdout result records are excluded. This
binds the canonical knowledge records, public rendering, accessibility,
indexing, validators, runtime, and release configuration while avoiding a
circular digest over the results themselves. The smaller evidence bundle is a
judge reading guide, not the definition of candidate identity.

The rubric digest is also pinned in the evaluator rather than trusted only from
the mutable suite file. The complete base suite, integration register, blind-
spot controls, and `refs/remotes/origin` branch-head set have reviewed digests.
The composite evaluator also fails canonical-integrity and frozen-governance
criteria when Knowledge Wiki generated views or employment-context reports are
stale, so a passing component result cannot conceal an out-of-date derived
surface.
Distinct holdouts must bind full prompt text, read-only review process, model,
timing, result transport, and all judgment provenance in private commissioning
evidence. Before release, retain a private attestation that two distinct processes
were separately commissioned, bound to the candidate and both payload digests.
Do not publish process IDs or local locators. Public labels and digests are not
proof of process identity. Missing commissioning evidence holds release.

The immutable judgment digest includes the substantive review scope. The final
evaluator requires distinct nonblank judge IDs and reviewer labels, the exact
eight-score roster, complete current bindings and no unavailable required evidence.
The coordinator may package receipts but cannot revise a reviewer's judgment.

## Preserved history

The pre-RFC0018 rubric, protocol and held judgments are preserved unchanged in
`docs/evals/history/2026-10-18-pre-rfc0018/`. The owner-approved protocol starts a
new run. Historical holds remain holds and are not evidence of new acceptance.

## Human boundary

Passing the suite does not close collaborator corroboration, collective review,
fresh-human hiring usability, the private job-funnel baseline, external human
validity, production approval, deployment verification, or indexing approval.
Those remain human evidence and human decisions.
