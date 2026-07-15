# Morse and Sack lens hill climb

## Purpose

This iteration adds two independent evaluation lenses to the launch-readiness
suite:

- the Margaret Morse lens protects the connection among artistic inquiry,
  civic and technical practice, participation, hospitality, memory, place, and
  the ways people inhabit systems;
- the Warren Sack lens treats evaluation as governance by preserving a
  multidimensional decision, human authority, reopen paths, unresolved risk,
  and disagreement beside any aggregate result.

These are portfolio-team editorial heuristics synthesized from user-supplied
context. They are not quotations, current endorsements, or professor-authored
reviews. No educational record, private correspondence, email address, phone
number, or screenshot supplied for this work is committed to the repository.

## Baseline and hypothesis

Before the change, the portfolio contained artistic, participatory, technical,
and civic dimensions, but a reader had to reconstruct their relationship. The
evaluation suite also exposed criterion scores without requiring every run to
record the dimensions, authority, risks, or disagreements behind its result.

The bounded hypothesis was:

1. one restrained About-page threshold can make the cross-practice method
   legible without weakening the hiring argument; and
2. a deterministic governance contract can prevent an aggregate pass from
   erasing multidimensional judgment or granting a model final authority.

## Iterations

### 1. Make the lenses explicit

The first iteration added two weighted criteria, source and runtime checks, an
attribution boundary, the seven-part decision vector, four human authority
records, reopen triggers, and the About-page threshold.

A fresh adversarial judge scored the Morse lens `4 / 5` but the Sack lens
`3 / 5`. Its criticism was precise: the policy was visible, but the scorer could
still return `accepted: true` without a populated per-run decision vector,
unresolved risks, or surviving disagreement.

### 2. Reopen the decision and enforce the run record

The criticism was preserved in
`2026-07-15-morse-sack-governance-reopen.json` and treated as new evaluative
evidence. The scorer now rejects a run unless it records:

- all seven decision dimensions exactly once;
- an assessment, nonblank evidence, and an unresolved-risks array for each;
- every policy-defined human authority and its disposition;
- every reopen trigger exactly once and an explicit reopen review;
- structured provenance for any invoked override;
- open disagreements and an explicit disagreement review.

Machine-readable run records are validated by `npm run check:launch-evals` and
recomputed by the deterministic scorer. An aggregate score cannot substitute
for the governance record.

### 3. Close the semantic loopholes

A second adversarial pass found that field presence alone was too permissive.
The validator was tightened to reject blank evidence, incomplete trigger
review, substituted authority owners, and unstructured override records. The
lower judgment remains in the record as the cause of this improvement.

## Final fresh judges

| Criterion | Judge A | Judge B |
| --- | ---: | ---: |
| Role legibility | 5 | 5 |
| Evidence and epistemic care | 4 | 4 |
| Emerging-work framing | 5 | 5 |
| Reader burden and hierarchy | 4 | 3 |
| Chad lens | 4 | 4 |
| Collective credit and protected boundaries | 5 | 5 |
| Visual proof and credibility | 3 | 4 |
| Operational credibility | 5 | 5 |
| Margaret Morse lens | 4 | 4 |
| Warren Sack lens | 5 | 4 |
| **Weighted result** | **4.42** | **4.32** |

Both current-candidate judges meet the `4 / 5` floor for the new lenses, every
criterion minimum, and the `4.2 / 5` weighted target. Their full decision
records remain in the machine-readable Judge A and Judge B run files.

Neither run claims production acceptance. Exact-SHA approval and post-deploy
production smoke remain open release-time gates, so `hardGatesPass` and
`accepted` remain false. The model score does not authorize publication.

## Public result

The About page now says, in a single paragraph, that Jamie's operating practice
grew from an artistic and participatory one and that software, events, rooms,
records, and public systems are environments people inhabit. It names the
concrete consequence: participation, memory, place, and relationships shape the
structure from the beginning.

The target role remains the first and dominant professional signal. The new
paragraph neither quotes a professor nor asks a hiring reader to interpret
private history.

## Verification evidence

- Focused launch-eval schema and source checks passed.
- Fifteen launch-eval regression tests passed, including decision-record,
  trigger-completeness, authority, override-provenance, and surviving-dissent
  tests.
- Responsive browser QA returned successful pages with no horizontal overflow
  at 375 and 1440 pixels for About, Technical Operations, WOW List, and 196
  Sunday Dinner.
- The complete repository check passed before the final governance-only
  strengthening and is rerun after this report is added.

## Open disagreements and next work

- The portfolio still needs another decisive, cleared public artifact that
  makes the artistic-to-operational continuity inspectable rather than mainly
  textual.
- Reader burden remains the lowest or tied-lowest public criterion, especially
  on the Technical Operations proof map.
- Formal management authority is strongest in bounded project contexts and
  must not be generalized into unsupported organization-wide personnel
  authority.
- Exact-SHA staging approval and production smoke remain release work owned by
  humans, not by the eval system.

## Decision

Accept the two new criteria and their implementation for PR review. Preserve
the open disagreements, keep production acceptance false, and revisit the
decision when release evidence or a listed reopen trigger changes.
