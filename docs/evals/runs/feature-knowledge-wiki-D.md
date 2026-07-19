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

### Iteration 6

The first commit rehearsal exposed extra terminal blank lines in three
generated Markdown reports. The generator was corrected, the reports were
regenerated, and stale candidate binding failed as designed. Both independent
judgments were rechecked against the corrected output.

### Foundation Candidate

The independent judgments were re-performed and rebound after the Markdown
views and generator correction were inspected.

- Candidate: `sha256:7533b88aa34368e75bffcaa298450c5e4fd32e7cfcfbea1279a2f21627f7bb7f`
- Contract: `sha256:b68eafc205a64bcc965d0946666e93b6ac4646d1b05c8fbeabe08edd2cfba5d0`
- Governed records: 17
- Typed relations: 35
- Prose links: 32
- Discoverable and reachable: 16/16
- Maximum path from Start Here: 2
- Generic relation rate: 0
- Test assertions: 16 passing, including 11 cataloged mutation fixtures
- Query benchmarks: 5 passing with material boundaries

## Employment-Acceptance Extension

The employment-context handoff added a present-tense acceptance layer without
turning the portfolio into a job-matching product or converting employer
requirements into proof about Jamie.

- Six current opportunities were verified against official employer sources.
- Thirty-four stable requirements preserve priority, coverage, evidence routes,
  gaps, and next actions.
- Nine reader profiles are explicitly simulated lenses, not real participation
  or endorsement.
- A public-only hiring evaluator is separated from a later public-safe Wiki gap
  resolver.
- Title-blind discovery ranks all six targets above nursing, senior Rust
  engineering, and quota-carrying sales negative controls.
- Thirteen hiring mutations and ten composite tests fail closed.
- The Technical Operations opening was shortened to make Jamie, the operating
  structure, and the usable outcomes immediately legible.
- Local Playwright observation covered eleven routes at desktop, mobile,
  200%-equivalent reflow, keyboard focus, and JavaScript-disabled settings.

The larger integration retained the original review thresholds through three
exact-accounting packets: 40 content files, 18 evaluation files, and 18 tooling
files. Every bound file was committed and assigned exactly once.

## Final Integrated Candidate

- Composite candidate: `sha256:aafeb12274a9be0d4effe060b7b30ca255959e47b861d439891a79c2502fef20`
- Composite contract: `sha256:0e94918879b96698c649c59edcdd39a675507c324b73e8a9ab6079e857f9dc7a`
- Application candidate: `sha256:590f92bad30cfa4ac30c314a3fd86cbc91a1d83057e8431e41e9c27724972dbf`
- Application score: 86.5/100 against an 86 threshold
- Knowledge lifecycle score: 100/100
- Governed Wiki records: 23
- Typed relations: 47
- Prose links: 39
- Discoverable and reachable: 22/22
- Composite score: 100/100; all ten hard gates and eight canonical
  no-regression checks passed

## Manual Authority Gates

- Human navigation study: `not-requested`
- Collaborator consent: `not-requested`
- Rights clearance: `human-blocked`
- Editorial approval: `not-requested`
- Production observation: `not-requested`
- Named-reader participation: `not-claimed`
- Application submission: `human-only`
- Employment acceptance: `human-only`

The Digital District photograph remains outside the repository and outside all
public projections. Its Wiki record is a public-safe receipt, not clearance.

## Stop Condition

Stop only after the exact final candidate passes twice consecutively without
changes. Automated completion does not close the manual authority gates.

**Result:** met. The final integrated candidate and contract passed twice
consecutively without changes. The automated cycle stopped for human review.
