---
id: decision.knowledge-wiki.selective-projection
title: Knowledge Wiki Selective Projection
kind: decision
status: maintained
visibility: public-safe
sensitivity: low
projection_status: never-public
last_reviewed: "2026-07-19"
review_by: "2026-10-19"
human_review_state: not-requested
aliases: []
canonical_path: docs/knowledge-wiki/decisions/knowledge-wiki-selective-projection.md
summary: Decision to maintain a deep public-safe professional Wiki while projecting only reviewed, purpose-fit material into the portfolio.
authority_refs: []
decision_question: How should a growing professional Wiki support applications without becoming an archive mirror or publishing protected material?
decision_actors:
  - Jamie Burkart as archive custodian, represented person, and publication authority
  - Research and implementation agents operating under explicit authorization and public-safety constraints
  - Collaborators, represented people, rights holders, and editors whose review may be required
constraints:
  - The repository is public and cannot contain secrets or raw private archives.
  - Evidence access, support, rights, consent, credit, editorial fit, and publication authority are separate questions.
  - The portfolio must remain clear and purpose-fit rather than display everything the Wiki can preserve.
options_considered:
  - option: Maintain a deep public-safe Wiki and selectively project reviewed material.
    disposition: chosen
    evidence_state: documented
  - option: Render the full Wiki as the public portfolio.
    disposition: not-chosen
    evidence_state: documented
  - option: Commit raw private sources so every claim can link directly to its origin.
    disposition: not-chosen
    evidence_state: documented
  - option: Develop a sibling private Wiki sharing a core package.
    disposition: adapted
    evidence_state: documented-rfp
chosen_course: Keep the Knowledge Wiki public-safe and deeper than the portfolio, enforce source and human-review boundaries, and promote only reviewed material serving a defined public purpose.
outcome_boundary: The repository implements a public-safe Wiki and selective projections; the proposed private sibling and shared core remain an RFP rather than a shipped system.
unknowns:
  - The final access model and migration path for a sibling private Wiki remain open.
  - Record-level collaborator review and publication readiness continue to vary.
anti_claims:
  - Research access and successful automated evals do not grant publication permission.
  - Presence in public Git does not require appearance on the portfolio site.
relations:
  - type: informed_by
    target: method.source-backed-team-memory
    context: Source-backed memory keeps evidence, interpretation, and projection distinct.
  - type: related_to
    target: index.evidence-debt-promotion-queue
    context: Mature but unselected material remains available for later purpose-fit composition.
---

# Knowledge Wiki Selective Projection

Depth in the Wiki makes selectivity in the portfolio more truthful and
flexible. Automated checks can validate the boundary; they cannot approve the
voice, represented people, rights, consent, or final public composition.

Return to the [Knowledge Wiki](../README.md) or the
[Decision Records index](../indexes/decision-records.md).
