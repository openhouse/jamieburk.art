---
rfc: 18
title: Staging B review profile with explicit content holds
stage: proposed
start_date: 2026-10-18
authors:
  - Codex
champion: unassigned
decision_owner: Jamie Burkart
review_areas:
  - deployment
  - privacy-governance
  - accessibility
  - public-portfolio
implementation: null
supersedes: []
superseded_by: null
---

# Staging B review profile with explicit content holds

## Summary

Propose a separate review profile for staging B that could permit an explicitly
classified PR-016 content-completeness hold while preserving every safety and
operational requirement. Production acceptance would remain unchanged. This RFC
is **proposed, not authorized or implemented**: the existing commands, thresholds,
reviews, CI, and deployment gates remain active. Jamie must choose this policy
explicitly before implementation; policy approval would not approve a release.

## Motivation

At public candidate `c100e12e59df9ec90f5876e0aa6db1d28c6a54fd`, six advisory
reader cards give PR-015 scores of 3/4/4 and PR-016 scores of 2/2/3. The latter
fails the existing median-4/minimum-3 requirement. The full serial check stops at
the professor-lens gate, as does
[the exact-candidate hosted run](https://github.com/openhouse/jamieburk.art/actions/runs/39163268802).
These are preserved failures, not accepted hill-climb improvement.

Both staging and production preflights invoke the same full check. If staging is
meant to support review of incomplete but safe work, that purpose needs an
explicit contract. A different environment name alone does not change acceptance.

An evaluator audit found that the current failure identifiers are too broad for
an exception:

- `unanimous-holdouts` combines scores for both lenses with reviewer identity,
  card count, phase, score validity, and candidate integrity. A read-only
  injected-card diagnostic produced that same failure identifier for the current
  hold, a PR-015 regression, duplicate reviewers, and a stale candidate.
- PR-016 itself includes anti-overclaim boundaries as well as completeness.
  A low score does not identify a harmless content gap.
- COMP-006 also checks absence of `/proofs/page.tsx` and presence of at least
  one mature held claim.
  COMP-009 requires two accepted whole-candidate judgments with all criteria at
  4 and no missing observations. Neither can be bypassed wholesale.

The audit examined the public candidate's
[professor evaluator](../scripts/lib/professor-lens-eval.mjs),
[composite evaluator](../scripts/lib/composite-integration-eval.mjs),
[portfolio rubric](../.agents/evals/portfolio-production-readiness.json), and
[preflight commands](../package.json). It did not establish judge calibration,
human acceptance, or deployment readiness.

## Goals

- Let Jamie decide whether staging B may serve as a review environment.
- Distinguish a narrow, adjudicated content hold from safety or integrity failure.
- Preserve raw production results and make any review deployment's limits clear.
- Keep release evidence bound to the actual candidate and destination.

## Non-goals

- Lowering production thresholds or retrospectively converting failed reviews.
- Treating scores, a proposed RFC, or a passing test as human authorization.
- Publishing new evidence, names, media, or protected sources to improve scores.
- Changing staging A, production, indexing policy, or the site's approved copy.
- Deploying, merging, or introducing an authentication system through this RFC.

## Terminology

- **Content hold:** an identified gap in a work sequence, learning, continuation,
  or handoff. It is eligible for consideration only when explicitly separated
  from truth, credit, rights, privacy, accessibility, and integrity concerns.
- **Hard hold:** any safety, authority, operational, unknown, or mixed failure.
- **Review eligibility:** checks support considering a staging-only release. It
  is not production acceptance or permission to deploy.
- **Release approval:** Jamie's separate approval of an exact commit, destination,
  review profile, and disclosed holds.

## Detailed design

### Separate reports, unchanged production contract

Keep the existing production checks and raw scores intact. A future, separately
named and versioned staging-B report must identify the policy decision, complete
candidate fingerprint, raw results, adjudicated findings, unresolved holds, and
each hard requirement. It must never label a failed production result accepted.

Do not classify a hold from its score, command exit code, or a broad identifier.
Refactor aggregated checks into typed, independently tested requirements while
preserving their original aggregate behavior. Recognize a content-only finding
only through an explicit candidate-bound adjudication approved by Jamie. Unknown
or mixed findings fail closed; the six current cards are not a validated
automatic classifier.

PR-015, review integrity, factual support, collective credit, source boundaries,
privacy, rights, consent, accessibility, and operational safety remain blocking.
Check every other COMP-006 condition independently. Require fresh independent
whole-candidate review under a separately specified staging contract; do not
manufacture COMP-009 production acceptance. Preserve actual production scores
and missing observations in those records.

The staging runner must account for every command in the full check inventory.
Run remaining independent checks even when an advisory hold is encountered.
Missing results, unexpected failures, timeouts, stale generated files, omitted
commands, and source changes invalidate eligibility. No generic ignored-exit
list or success masking is permitted. Local verification and hosted CI remain
distinct requirements.

### Exact candidate and destination

Changes to code, policy, configuration, or review inputs invalidate the affected
reviews. Adding a package command changes the professor candidate; do not merely
replace the fingerprint on an old scorecard. Whole-source composite reviews must
be renewed for any included source change. Freeze the review contract and reader
roster before a bounded review; do not resample until passing.

Before release, verify the staging-B destination, current serving revision,
rollback revision, and build/runtime environment. Require staging values for
health metadata, canonical URL, robots, sitemap behavior, and noindex headers.
A production destination, unexpected remote, or indexable candidate is a hard
hold. After deployment, verify the named commit and these controls from the
served site; a successful push alone is insufficient.

### Eval audit and acceptance plan

The current reader findings support error analysis but not reliable automatic
classification. Judge validation and the meaning of "current" remain unresolved.
Human policy review is pending. Six candidate-bound cards are a small evidence
set, not a general labeled dataset. Pipeline hygiene requires separate production
and staging reports, complete check coverage, and fresh candidate bindings.

The following are **future implementation acceptance scenarios**, not executed
tests or present deployment eligibility:

| Input or event | Required result |
|---|---|
| Explicitly adjudicated PR-016 completeness-only hold; all other requirements pass | Potential staging-only eligibility; production remains held |
| PR-015 also fails | Hard hold |
| PR-016 includes unsupported outcomes, credit, privacy, rights, consent, or truth issues | Hard hold |
| Low score with an unknown or mixed explanation | Hard hold |
| Missing/duplicate reviewer, stale hash, wrong phase, malformed or inconsistent card | Hard hold |
| Prohibited public route or broken held-claim boundary | Hard hold, independently of professor scores |
| Whole-candidate staging reviews absent, stale, incomplete, or optimizer-authored | Hard hold |
| Required check missing, errored, timed out, or based on stale generated output | Hard hold |
| Source, policy, or review inputs change after review | Invalidate affected evidence; require fresh review |
| Wrong destination, indexing enabled, or no verified rollback | Hard hold |
| Policy approved but named release commit not approved | No deployment |
| Reviewer asks for protected corroboration | Preserve the hold; do not disclose protected material |

Implement behavioral tests before changing runtime gates. Include mutation cases
for every hard boundary, parity checks for unchanged production behavior, and
coverage checks for the full command inventory. Do not test this prose with
keyword assertions and present that as runtime safety evidence.

## Security and privacy

Staging with noindex is still publicly accessible; it is not private storage or
access control. Existing public-use approvals and source-minimization boundaries
apply unchanged. The proposed profile does not authorize more disclosure, new
media, correspondence, raw evidence, or stronger factual claims. Keep public
reports free of protected locators and private counterpart details.

## Publication workflow

This proposal may be reviewed in the existing draft pull request. A proposed or
merged RFC is not implementation authority. Jamie must first approve the narrow
policy and specified staging-review contract. After implementation and fresh
local/hosted verification, Jamie must separately approve a named release commit.
Record any deployment as a **review deployment with an unresolved content hold**,
not production acceptance. Production remains separately gated.

## Rollout plan

1. Review this proposed policy, its taxonomy, and the unresolved questions below.
2. Record Jamie's explicit decision; retain the existing policy if declined.
3. If accepted, implement typed requirements and the staging-only profile using
   failing behavioral tests first. Keep production behavior unchanged.
4. Run all affected tests and full local/hosted verification, then obtain fresh
   independent candidate-bound staging reviews. Preserve production failures.
5. Present the exact commit, destination, holds, verification, and rollback plan
   for Jamie's release approval. Do not deploy before that approval.
6. Deploy only the approved candidate; verify the served commit and safety
   controls. Roll back to the verified prior staging revision on a release
   verification failure. No production or indexing change is included.

## Decision gates

- **Now:** proposed only; existing acceptance and deployment gates stay active.
- **Before acceptance:** Jamie explicitly chooses staging B as a review
  environment and approves the finding taxonomy and review contract.
- **Before review eligibility:** complete behavioral evidence, local and hosted
  checks, valid independent reviews, and no hard or unknown failures.
- **Before deployment:** Jamie approves the named commit and destination after
  reviewing holds and rollback evidence.
- **Before operational status:** successful observed deployment/readback evidence
  and Jamie's decision. Simulated readers cannot satisfy human gates.

## Drawbacks

Two profiles add maintenance and can drift. Manual adjudication requires care;
an apparent content gap can conceal an unsupported claim. Publicly accessible
staging may be mistaken for accepted work. The design must not become a way to
avoid difficult evidence or accessibility work.

## Alternatives

- Keep full acceptance blocking staging: simplest and currently active, but
  incomplete work can be reviewed only locally or through existing artifacts.
- Use local preview for content review: avoids a new release profile and remains
  available while this proposal is pending.
- Bypass the professor/composite command or lower thresholds: rejected because
  broad failures include safety and integrity conditions, not only completeness.

## Unresolved questions

- Does Jamie choose this staging-only exception or retain full acceptance?
- What exact finding categories and adjudication record should Jamie approve?
- What must the two staging reviewers observe and accept without falsely
  claiming production-quality acceptance or human calibration?
- Where should the review-deployment disclosure appear so a visitor cannot
  reasonably mistake it for production acceptance?

TODO: Jamie approval required.
