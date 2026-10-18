# Two-stage review repair — October 18, 2026

## Decision and scope

Jamie approved RFC 0018's two-stage repair and staging A release only after all
gates pass. This bounded change separates independent substantive review from
verification of the completed review pair. It does not change portfolio copy,
claims, media, contact information or production approval.

The previous contract and held receipts remain byte-for-byte unchanged in
`history/2026-10-18-pre-rfc0018/`. They remain historical holds. The new suite is
version 2, with version 4 substantive review receipts. Its semantic digest is
`6ad0d6a0cbbbe972e65754e6cec7ab501227c91aaa13be8dd30bba65cb07d0f7`.

## Bounded improvement

The prior gate asked each reviewer to certify a completed pair before that pair
existed. Reviewers now assess exactly COMP-001 through COMP-008. The deterministic
COMP-009 gate then requires both valid judgments and all eight technical passes.
All nine criteria and the 36/36 stopping score remain required.

Regression tests were written first and observed failing before implementation.
The final focused run passed 52/52 tests on Node 26.5.0. The cases cover missing,
duplicate, blank, malformed, stale, altered, extra-scope and failing judgments;
unavailable evidence; changed source bytes; unauthorized rubric weakening; and
technical failure despite a valid review pair. Synthetic examples exist only in
test memory, not in stored review receipts.

A separate code audit found an intermediate case where COMP-009 reported a pass
despite a technical failure, although overall acceptance remained false. That
diagnostic inconsistency was repaired and regression-tested. The audit reported
no unresolved blocking issue; it is not a final substantive judgment.

## Evidence at the review handoff

All 85 non-pair technical commands passed, including the existing build, type,
lint, public-safety, route and knowledge checks. This is pre-review evidence,
not a complete release check. With the previous receipts still on disk, the new
evaluator reports all eight technical results separately and holds final acceptance.

Two fresh independent judgments, two full unchanged `npm run check` executions,
exact-commit CI, private commissioning evidence and actual staging-container
verification remain required. Their execution logs and final source bindings stay
outside the fingerprinted source tree; the PR records the exact-commit outcome.

## Boundaries retained

Production, indexing, collaborator corroboration, human hiring usability and new
media approval remain separate. Well-supported past and present projects may
show working method with explicit dates. Red Hook remains a limited text-only
summary; photo attribution is not publication permission.
