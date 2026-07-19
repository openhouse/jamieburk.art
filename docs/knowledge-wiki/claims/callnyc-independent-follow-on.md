---
id: claim.callnyc.independent-follow-on
title: CallNYC independent follow-on claim
kind: claim
status: maintained
visibility: public-safe
sensitivity: low
projection_status: careful
last_reviewed: "2026-07-18"
review_by: "2027-01-18"
human_review_state: not-requested
aliases:
  - Independent CallNYC development
canonical_path: docs/knowledge-wiki/claims/callnyc-independent-follow-on.md
summary: Bounded proposition connecting Jamie's independent implementation to the CouncilStat chronology.
authority_refs:
  - domain: claim
    id: CLM-CALLNYC-INDEPENDENT-FOLLOW-ON
relations:
  - type: part_of
    target: project.callnyc
    context: Governs the primary role statement for the project.
  - type: uses_source
    target: source.politico.callnyc.2016-03-14
    context: Direct support for sequence, independent development, iteration, and coverage.
  - type: supports
    target: capability.technical-operations
    context: Bounded evidence of public-data interpretation and implementation.
  - type: contradicts
    target: anti-claim.callnyc.official-council-product
    context: Independent follow-on wording excludes official product or commissioned status.
  - type: projected_to
    target: projection.portfolio.callnyc
    context: The portfolio selects approved wording from the canonical claim record.
---

# CallNYC Independent Follow-On Claim

The canonical claim states that Jamie independently built CallNYC as a
public-facing interpretation after the fuller CouncilStat dataset became
available. The approved portfolio and resume phrasings remain in typed claim
record `CLM-CALLNYC-INDEPENDENT-FOLLOW-ON`.

## Support

- [Politico New York](../sources/politico-callnyc-2016.md) directly supports
  the sequence, Jamie's development and iteration, and contemporary coverage.
- The public source repository corroborates the surviving implementation in
  the canonical evidence graph.

## Boundary

The claim does not say Jamie caused the data release, worked for the Council,
received a commission, made an official submission, or won the hackathon. See
the [anti-claim](callnyc-not-official-council-product.md).

## Projection

The [portfolio projection record](../projections/callnyc-case-study.md) keeps
the project chronology and role legible while leaving detailed source and
social-archive findings in the deeper system.
