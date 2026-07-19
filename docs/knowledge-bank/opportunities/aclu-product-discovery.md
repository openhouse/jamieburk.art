---
id: opportunity.aclu.product-manager-ii.discovery.8482872002
title: ACLU Product Manager II, Discovery
kind: opportunity
status: governed-open
visibility: public-safe
sensitivity: low
owner: jamie
last_reviewed: "2026-07-18"
review_by: "2026-07-21"
canonical_path: docs/knowledge-bank/opportunities/aclu-product-discovery.md
discoverable: true
organization: American Civil Liberties Union
role_title: Product Manager II, Discovery
job_id: "8482872002"
tier: 1
canonical_url: https://job-boards.greenhouse.io/aclu/jobs/8482872002
source_type: official-employer
opportunity_status: live
verified_at: "2026-07-18"
reverify_by: "2026-07-21"
deadline: null
compensation:
  currency: USD
  minimum: 142694
  maximum: 142694
  basis: annual-base-new-york
  certainty: posted-fixed-location-rate
location:
  city: New York
  office: unspecified
  work_model: hybrid-two-days-weekly-or-eight-days-monthly
term: three-year
reporting_line:
  text: Head of Product
  certainty: confirmed-title-person-unknown
named_personnel: []
confirmed_facts:
  - The role centers structured discovery, problem framing, build-buy-do-not-build decisions, low-risk pilots, and decision traceability.
  - It requires collaboration with privacy, security, counsel, technical, and nontechnical stakeholders.
  - The application requires a PRD or product brief from a launched product.
inferences: []
unknowns:
  - Identity of the current Head of Product.
  - Exact team portfolio, hiring sequence, and term-extension possibility.
hard_screens:
  - id: screen.aclu.launched-product-brief
    kind: application-artifact
    text: Submit a PRD or product brief from a launched product.
    candidate_state: addressed-by-retrospective-callnyc-brief
  - id: screen.aclu.hybrid-presence
    kind: location
    text: Work from the New York office two days per week or eight days per month.
    candidate_state: verify-before-application
application_artifacts:
  - Resume
  - PRD or product brief from a launched product
portfolio_routes:
  - /
  - /work/callnyc
  - /work/fair-rent-nyc
  - /lab/source-backed-team-memory
  - /work/technical-operations
  - /resume
  - /about
acceptance_signals:
  - structured discovery
  - listening
  - problem framing
  - privacy-aware judgment
  - evidence synthesis
  - build buy or do-not-build thinking
  - low-risk pilots
  - decision traceability
  - clear product brief
role_requirements:
  - id: requirement.aclu.discovery-framing
    importance: critical
    text: Lead structured discovery, listening, facilitation, and clear problem framing.
    signal_terms: [discovery, listening, facilitation, problem]
    wiki_evidence: [callnyc-civic-data-guidance, fair-rent-campaign-memory]
    source_status: supported
    public_evidence: [/work/callnyc, /work/fair-rent-nyc]
    status: visible-proven
    gap_type: none
    next_action: Keep the public explanation focused on decisions, not process theater.
  - id: requirement.aclu.risk-and-governance
    importance: critical
    text: Integrate privacy, security, legal, and organizational constraints into product judgment.
    signal_terms: [privacy, risk, constraints, boundaries]
    wiki_evidence: [source-backed-team-memory-method, fair-rent-source-map]
    source_status: supported
    public_evidence: [/work/callnyc, /lab/source-backed-team-memory]
    status: visible-qualified
    gap_type: projection-gap
    next_action: Preserve a concise privacy-aware discovery sentence in the CallNYC case study.
  - id: requirement.aclu.decision-options
    importance: critical
    text: Make build, buy, pilot, or do-not-build recommendations with traceable reasoning.
    signal_terms: [build, pilot, decision, scope]
    wiki_evidence: [application.callnyc.retrospective-product-brief, source-backed-team-memory-method]
    source_status: supported
    public_evidence: [/work/callnyc, /lab/source-backed-team-memory]
    status: visible-qualified
    gap_type: none
    next_action: Use the retrospective brief as the application artifact; do not imply it was written in 2016.
  - id: requirement.aclu.launched-product-brief
    importance: critical
    text: Provide a credible product brief grounded in a product that reached public use.
    signal_terms: [prototype, public, product, brief]
    wiki_evidence: [application.callnyc.retrospective-product-brief, callnyc-civic-data-guidance]
    source_status: supported
    public_evidence: [/work/callnyc]
    status: visible-qualified
    gap_type: none
    next_action: Human-review the retrospective brief against the application prompt before submission.
one_year_success_conditions:
  - Teams use discovery to narrow consequential problems before committing to solutions.
  - Decisions, risks, and reasons to build or not build remain legible across functions.
  - Small pilots create learning without exposing staff, clients, or civil liberties to avoidable harm.
one_year_risk_conditions:
  - Discovery becomes ceremonial while solution commitments are already fixed.
  - Privacy or counsel review arrives too late to influence product direction.
interview_questions:
  - How does the team recognize and support a recommendation not to build?
  - What authority does Discovery have to pause or reshape a proposed initiative?
  - What does excellent collaboration with privacy, security, and counsel look like in practice?
canonical_refs:
  - callnyc-civic-data-guidance
  - fair-rent-campaign-memory
  - source-backed-team-memory-method
relations:
  - type: related_to
    target: capability.technical-operations
  - type: uses_method
    target: method.source-backed-team-memory
  - type: related_to
    target: application.callnyc.retrospective-product-brief
  - type: projected_to
    target: portfolio.work.callnyc
---

# ACLU Product Manager II, Discovery

This role rewards discovery as disciplined product work: listening, framing,
constraints, options, pilots, and decisions that remain understandable later.
The strongest primary artifact is a retrospective CallNYC product brief. It
must be labeled retrospective; its present-day authorship should never be
mistaken for a document produced during the original 2016 build.

## Related Wiki records

- [CallNYC retrospective product brief](../applications/callnyc-retrospective-product-brief.md)
- [CallNYC project](../projects/callnyc.md)
- [Source-Backed Team Memory method](../methods/source-backed-team-memory.md)
