---
id: decision.callnyc.issue-pathways
title: CallNYC Issue Pathways
kind: decision
status: maintained
visibility: public-safe
sensitivity: low
projection_status: never-public
last_reviewed: "2026-07-19"
review_by: "2026-10-19"
human_review_state: not-requested
aliases: []
canonical_path: docs/knowledge-wiki/decisions/callnyc-issue-pathways.md
summary: Bounded reconstruction of the choice to turn CouncilStat records into an independent resident-facing issue pathway.
authority_refs:
  - domain: claim
    id: CLM-CALLNYC-INDEPENDENT-FOLLOW-ON
decision_question: What independent public interface could make newly released constituent-services records more actionable for residents?
decision_actors:
  - Jamie Burkart as the documented independent product builder
  - CouncilStat and Council actors as the public-data and institutional context
  - Residents and civic-technology peers as users and feedback participants
constraints:
  - Public records did not themselves provide a resident-facing action route.
  - Issue categories, Council geography, and institutional authority had to remain understandable.
  - An independent prototype could not imply official Council ownership or endorsement.
options_considered:
  - option: Build an independent issue-to-contact pathway and iterate it publicly.
    disposition: chosen
    evidence_state: documented
  - option: Present CallNYC as an official Council service.
    disposition: not-chosen
    evidence_state: documented
  - option: Leave the public records as an unmediated dataset.
    disposition: not-observed
    evidence_state: not-observed
chosen_course: Jamie built and publicly iterated an independent interface connecting issue categories to relevant Council contact paths.
outcome_boundary: The record establishes an independent prototype, public launch, and iteration; it does not establish official adoption, service ownership, or policy impact.
unknowns:
  - A complete public user-study record has not been recovered.
  - The BetaNYC School of Data presentation remains a wanted source record.
anti_claims:
  - CallNYC was not an official New York City Council product.
  - Public attention or engagement does not prove institutional adoption.
relations:
  - type: resulted_in
    target: project.callnyc
    context: The decision produced the core resident-facing product pathway.
  - type: related_to
    target: capability.civic-interface
    context: The choice illustrates public-interface work across resident and institutional contexts.
---

# CallNYC Issue Pathways

The decision was to build an independent interface around public records while
keeping its institutional status explicit. Options marked not observed are not
claims about a formal decision meeting; they identify what cannot be inferred
from the surviving record.

Return to the [CallNYC project](../projects/callnyc.md) or the
[Decision Records index](../indexes/decision-records.md).
