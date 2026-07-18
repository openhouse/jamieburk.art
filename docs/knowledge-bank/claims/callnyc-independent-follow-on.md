---
id: claim.callnyc.independent-follow-on
title: CallNYC was an independent CouncilStat follow-on
kind: claim
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-18
review_by: 2027-01-18
canonical_path: docs/knowledge-bank/claims/callnyc-independent-follow-on.md
summary: >
  After the fuller CouncilStat dataset was released, Jamie independently built
  CallNYC as a public-facing interpretation of constituent-services records.
authority: registry-adapter
registry_ids:
  - CLM-CALLNYC-INDEPENDENT-FOLLOW-ON
claim_status: confirmed-with-boundary
relations:
  - type: part_of
    target: project.callnyc
    href: ../projects/callnyc.md
  - type: uses_source
    target: source.politico.callnyc.2016-03-14
    href: ../sources/politico-callnyc-2016-03-14.md
  - type: projected_to
    target: portfolio.work.callnyc
    href: ../projections/work-callnyc.md
evidence:
  - target: source.politico.callnyc.2016-03-14
    relationship: direct-support
    confidence: high
    supports:
      - Jamie's independent development and iteration
      - the event, data-release, and prototype sequence
projection:
  status: active
  surfaces:
    - /work/callnyc
    - /resume
anti_claims:
  - Jamie caused the CouncilStat release.
  - CallNYC was commissioned by the Council.
  - CallNYC was a winning or formal hackathon submission.
---

# CallNYC was an independent CouncilStat follow-on

## Bounded proposition

After the fuller CouncilStat dataset was released, Jamie independently built
CallNYC as a public-facing interpretation of those constituent-services
records.

## Evidence and boundary

[Politico New York coverage](../sources/politico-callnyc-2016-03-14.md)
directly supports Jamie's development and the event-to-data-to-prototype
sequence. The claim does not make CallNYC an official Council product, a formal
event submission, or a winner.

## Current projection

The approved public language appears in the
[CallNYC projection record](../projections/work-callnyc.md). The structured
claim and evidence fields remain authoritative in the existing citation
registry during the migration bridge.
