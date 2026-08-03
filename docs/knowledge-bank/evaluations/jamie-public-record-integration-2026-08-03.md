---
id: evaluation.jamie-public-record-integration.2026-08-03
title: Jamie public-record integration evaluation
kind: evaluation
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-03
review_by: 2026-11-03
canonical_path: docs/knowledge-bank/evaluations/jamie-public-record-integration-2026-08-03.md
summary: Candidate-bound deterministic and adversarial evaluation for the first content-addressed Jamie public-record Knowledge Wiki import.
relations:
  - type: related_to
    target: index.knowledge-wiki.jamie-public-record-source-edition
    href: ../indexes/jamie-public-record-source-edition.md
  - type: informed_by
    target: source.jamie-public-record-initial-manifest
    href: ../sources/jamie-public-record-initial-manifest.md
---

# Jamie public-record integration evaluation

## Exact candidate

- Source repository commit: `f9858d41b28b36c35aece8e6986629ac569aaa84`
- Source manifest SHA-256: `23a2a65ce9769a3d7643727bf533857dbc35a26f3c880bd06d57e8503ba074a8`
- Library candidate fingerprint: `ff882202174c3f117af4e48a78c21c3d2ff2bea575be2459dcc7b3b9d54f1612`
- Record population: 12

## Executed checks

On Node 26.5.0:

- `wiki:professional-record:check` validated the pinned commit, manifest
  digest, candidate fingerprint, record counts, canonical homes, public-release
  state, private-dependency boundary, photo boundary, RFC stage, Wiki citation,
  and portfolio hold.
- `test:professional-record` passed 13 tests: one unchanged-candidate baseline
  plus twelve adversarial mutations.
- `public-safety` passed with the repository's existing eleven careful-claim
  warnings.
- `git diff --check` passed.

The general RFC validator could not run in the isolated worktree because its
declared `gray-matter` dependency was unavailable. A dependency installation
was not authorized, so the implementation-specific evaluator independently
checks RFC 0004's stage and implementation link while leaving the general gate
open.

## Hill climb

The initial failure analysis prioritized four harms:

1. stale or unpinned cross-repository evidence;
2. coverage gaps silently promoted into event or relationship claims;
3. a private sibling repository becoming a runtime dependency;
4. valid metadata being mistaken for public release, photograph approval, or
   portfolio approval.

The final evaluator injects each class of failure and rejects it. Any change to
the source manifest requires a new digest, lock, downstream evaluation, and
review. Green checks do not close the remaining human gates.
