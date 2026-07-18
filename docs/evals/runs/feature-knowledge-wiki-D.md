# Knowledge Wiki Foundation D Eval Run

**Branch:** `feature/knowledge-wiki-D`
**Base:** `feature/knowledge-c` at `e42d6a14`
**Contract:** `evals/knowledge-wiki/suite.json`
**Date:** 2026-07-18

## Objective

Implement the report-first Knowledge Wiki foundation from the M brief while
preserving the existing knowledge, citation, lifecycle, public-safety, and
portfolio architecture.

## Recursive Hill Climb

### Iteration 1

Candidate `sha256:2812d8449ddef9b4d3b0e98be95826e3b4eb0a75eb935180aab30c5d264d29d6`
failed authority phrasing, boundary retrieval, and missing independent-judgment
gates.

The underlying records passed structural, identity, relation, generation,
reachability, mutation, and projection checks. The retrieval checker compared
literal line-wrapped strings and produced false negatives.

### Iteration 2

The evaluator normalized whitespace and punctuation before testing required
boundaries. The authority test was changed from one brittle sentence to the
presence of the actual architectural decisions. One chronology benchmark still
looked for a boundary on a record outside its bounded query result.

### Iteration 3

The chronology benchmark was corrected to require a boundary actually carried
by the correction record. All deterministic gates passed. Candidate binding
still failed, correctly, because no independent judgment existed.

### Iteration 4

Architecture/editorial and systems/public-safety judgments were bound to the
exact candidate and contract. The candidate passed.

### Iteration 5

Review found that backlink and navigation diagnostics were available only as
JSON. Markdown backlink and navigation reports were added for the VS Code-first
reader. The candidate and contract fingerprints changed, and stale judgment
binding failed as designed.

### Final Candidate

The independent judgments were re-performed and rebound after the Markdown
views were inspected.

- Candidate: `sha256:f16835b0b486b86b1532f6b7bfaa1bcfbbaf62de7ab499cef041527e277269bd`
- Contract: `sha256:b68eafc205a64bcc965d0946666e93b6ac4646d1b05c8fbeabe08edd2cfba5d0`
- Governed records: 17
- Typed relations: 35
- Prose links: 32
- Discoverable and reachable: 16/16
- Maximum path from Start Here: 2
- Generic relation rate: 0
- Test assertions: 16 passing, including 11 cataloged mutation fixtures
- Query benchmarks: 5 passing with material boundaries

## Manual Authority Gates

- Human navigation study: `not-requested`
- Collaborator consent: `not-requested`
- Rights clearance: `human-blocked`
- Editorial approval: `not-requested`
- Production observation: `not-requested`

The Digital District photograph remains outside the repository and outside all
public projections. Its Wiki record is a public-safe receipt, not clearance.

## Stop Condition

Stop only after the exact final candidate passes twice consecutively without
changes. Automated completion does not close the manual authority gates.

**Result:** met. The final candidate and contract passed twice consecutively
without changes. The automated foundation cycle stopped for human review.
