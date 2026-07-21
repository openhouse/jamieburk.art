---
id: decision.callnyc.issue-pathways
title: CallNYC issue pathways for public constituent-services data
kind: decision
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-19
review_by: 2026-10-19
canonical_path: docs/knowledge-bank/decisions/callnyc-issue-pathways.md
summary: Bounded reconstruction of Jamie's independent choice to interpret public CouncilStat records as resident-facing issue pages and next-step guidance.
decision_period: 2016-03
decision_state: documented-with-boundary
decision_question: What independent public interface could make newly released constituent-services records more actionable for residents?
decision_actors:
  - Jamie Burkart as independent prototype designer and implementer
  - New York City Council as publisher and institutional steward of CouncilStat data
  - Constituents represented in aggregate public records, not as documented CallNYC users
constraints:
  - The source data came from an official institution, but Jamie held no Council product or policy authority.
  - Public records required interpretation without exposing or inventing individual constituent stories.
  - The archive does not establish resident adoption, formal submission, or Council endorsement.
options_considered:
  - option: Organize the public records into issue pathways and next-step guidance in an independent prototype.
    disposition: chosen
    evidence_state: documented
  - option: Republish the raw dataset without an interpretation layer.
    disposition: not-observed
    evidence_state: not-observed
  - option: Represent the prototype as an official Council service.
    disposition: not-observed
    evidence_state: not-observed
chosen_course: Jamie independently built CallNYC as a resident-facing interpretation of public constituent-services records, organized around issues and possible next steps.
resulting_artifacts:
  - project.callnyc
outcome_boundary: Source code and contemporary reporting establish the independent prototype and its interpretation of CouncilStat data; they do not establish official status, formal adoption, resident outcomes, or continuing service availability.
credit_scope: individual
projection:
  status: hold
  surfaces: []
unknowns:
  - Complete contemporaneous design notes and user-research records have not been recovered.
  - The number and characteristics of residents who used the prototype are not established.
anti_claims:
  - CallNYC was not an official New York City Council product.
  - The official data release does not establish that Jamie caused the release or that the Council adopted his interface.
relations:
  - type: uses_source
    target: source.councilstat.fuller-release.2016
    href: ../sources/nycc-constituent-services-data-2016-05-27.md
  - type: uses_source
    target: source.callnyc.source-repository
    href: ../sources/callnyc-source-repository.md
  - type: resulted_in
    target: project.callnyc
    href: ../projects/callnyc.md
  - type: informed_by
    target: research.interpretive-layer-source-return.2026-07-19
    href: ../research-runs/interpretive-layer-source-return-2026-07-19.md
---

# CallNYC issue pathways for public constituent-services data

The official Council release and the surviving implementation support a useful
separation of roles. The Council published and stewarded CouncilStat data.
Jamie independently designed an interpretation layer that organized those
records around issues a resident might recognize and a next step they could
take.

This is an implementation decision, not evidence of institutional adoption.
The unobserved alternatives must not be rewritten as options presented to or
rejected by the Council.
