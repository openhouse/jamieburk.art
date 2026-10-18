---
rfc: 18
title: Non-circular composite release review
stage: proposed
start_date: 2026-10-18
authors:
  - Portfolio engineering agent
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - privacy-governance
  - deployment
  - developer-experience
implementation: null
supersedes: []
superseded_by: null
---

# Non-circular composite release review

## Summary

Separate independent substantive judgments from deterministic verification of the
completed review pair. Keep all nine blocking criteria, the 36/36 stopping score,
two independent reviewers, exact-candidate binding, full checks and human approval
boundaries. This proposed RFC is not permission to change the frozen contract.

## Motivation

The current COMP-009 requires each review to certify that two accepted reviews
already exist, including both reviews' passing COMP-009 scores. A reviewer cannot
observe that condition before its own review is complete. Candidate-hash exclusions
avoid a digest cycle but do not solve this judgment cycle. An independent protocol
audit confirmed this failure. Claiming an unobserved pass would violate the same
contract we are trying to satisfy.

## Goals

- Preserve independent judgments and failed or unavailable evidence.
- Make the final stopping condition observable after the reviews exist.
- Retain every substantive criterion, privacy boundary and exact-source binding.
- Reject duplicate reviewers, missing reviews, stale candidates, altered payloads,
  substantive failures and unauthorized human-gate closure.

## Non-goals

No automatic production approval, merge, indexing, consent, outreach or submission.
No reduced score, dropped substantive criterion or optimizer-authored review.
No retroactive conversion of held judgments into passing ones.

## Terminology

An independent substantive judgment covers COMP-001 through COMP-008. A pair
verification is the deterministic COMP-009 result, computed after two complete
judgments exist. Neither is human approval or proof of real-world effectiveness.

## Detailed design

Start a new rubric version only after Jamie authorizes this change. Preserve the
previous frozen rubric, digest and held receipts as historical evidence. Freeze
the new rubric before commissioning fresh reviewers.

Reviewers receive the frozen rubric, current public-safe source tree and observed
technical evidence, not optimization intent or each other's scores. Each records
all eight substantive criteria at 4 or 0, candid findings and unavailable evidence.
Its verdict means acceptance of that substantive scope only. It does not score
the future aggregate pair condition. Receipts explicitly name that scope.

Before review, run every non-pair technical check and report the aggregate pair
condition as an expected hold, never as a pass. After collection, run the complete
unchanged release command including the aggregate gate. Do not omit any other
failed check from either stage.

The final evaluator recomputes the deterministic evidence for COMP-001 through
COMP-008 and requires
two distinct accepted substantive judgments, all eight scores at 4, no unobserved
required evidence, current full-tree fingerprints, current rubric bindings and
complete judgment digests. It then computes COMP-009. Duplicate or extra criteria,
including a self-certified COMP-009 score, must fail rather than substitute for
the aggregate check. A substantive criterion passes only if its required technical
evidence passes and both independent reviewers accept it. The evaluator cannot
override a reviewer's failure or missing evidence.

The suite still requires 36/36 and two complete final verification executions
against one unchanged source tree, rubric, review-payload digests and technical
evidence set. Check fingerprints before and after each execution; a changed input
invalidates stability. Bind that source tree to the commit tested by CI and the
running container. CI and running-container checks remain separate.

Only the same two declared result files remain outside the candidate fingerprint.
Private commissioning evidence stays outside public Git. The release operator
must verify two distinct separately commissioned read-only review processes and
retain a private attestation bound to the candidate and both payload digests.
Missing commissioning evidence holds release. Public reviewer labels and receipt
digests do not authenticate process identity. The coordinator may package receipts
but cannot change an independent judgment.

The digest covers the complete immutable judgment fields already specified by
`holdoutJudgmentPayload`, plus the new substantive-scope discriminator. Aggregate
verification logs and the private commissioning attestation remain outside the
fingerprinted source tree; a public-safe exact-commit summary may be posted on the
PR. No extra source-tree exclusions are introduced. Never write aggregate results
back into a reviewer's judgment to make it pass.

## Security and privacy

Do not publish private locators, process identifiers, records or correspondence.
No inferred evidence, rights or consent. Preserve all anti-gaming and public-safety
checks, and add regressions that demonstrate both a valid two-stage completion
and every missing, duplicate, stale, altered or failing input remains held.

## Publication workflow

The reviewed source candidate may reach staging only after local checks, two
independent substantive judgments, deterministic pair verification, exact-commit
CI and the already-authorized staging release checks. Production and indexing
still require Jamie's separate approval. This RFC does not approve new media.

## Rollout plan

1. Retain the current held result and obtain the decision owner's approval.
2. Archive the old contract and add failing regression tests for the new protocol.
3. Implement the smallest contract/evaluator change; freeze and verify its digest.
4. Run technical checks, collect two fresh independent substantive judgments and
   verify the pair twice against the same unchanged candidate.
5. Update the existing PR and deploy only the verified commit to staging A.
6. If any step fails, retain HOLD; do not bypass or silently relax the gate.

## Decision gates

Jamie must explicitly authorize the two-stage contract revision. Passing tests,
this proposal or a PR update cannot advance that decision. Record the approved
scope and date here before implementation. A new rubric/version is a new run,
not a passing result for the previous held run.

## Drawbacks

More explicit scope metadata is needed. Independent review and aggregate release
verification can be confused unless receipts label their different meanings.
Review authenticity remains an orchestration responsibility, not a JSON guarantee.

## Alternatives

Keep the current contract and hold staging. Dropping COMP-009, accepting a single
review, or fabricating a future pair condition is unacceptable. A joint editorial
review would sacrifice the blind initial judgments and is not proposed.

## Unresolved questions

- Await Jamie's decision on the two-stage protocol.
- Human accessibility, collaborator and production gates remain separate and open.
