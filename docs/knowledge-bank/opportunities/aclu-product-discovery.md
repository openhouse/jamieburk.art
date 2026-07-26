---
id: opportunity.aclu.product-manager-discovery.8482872002
title: ACLU - Product Manager II, Discovery
kind: opportunity
status: governed-open
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-26
review_by: 2026-07-29
canonical_path: docs/knowledge-bank/opportunities/aclu-product-discovery.md
summary: Public-safe requirement and portfolio-coverage map for ACLU's live term-limited Product Manager II, Discovery role.
canonical_url: https://job-boards.greenhouse.io/aclu/jobs/8482872002
source_type: official-employer
opportunity_status: live
verified_at: 2026-07-26
portfolio_routes:
  - /
  - /work/callnyc
  - /work/fair-rent-nyc
  - /work/technical-operations
  - /lab/source-backed-team-memory
  - /resume
  - /about
discovery_terms:
  - structured discovery
  - stakeholder listening
  - problem framing
  - privacy-aware product judgment
  - decision traceability
  - low-risk pilots
confirmed_facts:
  - The New York role is hybrid, three-year term-limited, and reports to the Head of Product.
  - The posted New York salary is $142,694.
  - The application requires a redacted PRD or product brief from a launched product.
inferences: []
unknowns:
  - The identity of the Head of Product and the role's first discovery portfolio.
  - Whether a retrospective CallNYC brief will satisfy the launched-product artifact screen.
hard_screens:
  - id: screen.aclu.launched-product-brief
    text: A redacted PRD or product brief from a launched product is required.
    state: review-needed
    disposition: verify
  - id: screen.aclu.new-york-hybrid
    text: The role requires two office days per week or eight days per month in New York.
    state: likely-met
    disposition: proceed
role_requirements:
  - id: requirement.aclu.discovery-and-synthesis
    importance: critical
    kind: capability
    text: Conduct structured discovery and synthesize stakeholder needs, constraints, and risks.
    wiki_evidence:
      - project.callnyc
      - method.source-backed-team-memory
    public_evidence:
      - route: /work/technical-operations
        needle: clarifies requirements
    status: visible-qualified
    gap_type: wording
    next_action: Build a concise retrospective discovery narrative from CallNYC.
  - id: requirement.aclu.facilitation-without-authority
    importance: critical
    kind: capability
    text: Facilitate alignment across technical and nontechnical stakeholders without formal authority.
    wiki_evidence:
      - project.callnyc
    public_evidence:
      - route: /work/fair-rent-nyc
        needle: collaborators
    status: visible-weak
    gap_type: public-projection
    next_action: Name one bounded facilitation decision and its usable output.
  - id: requirement.aclu.privacy-and-governance
    importance: critical
    kind: capability
    text: Balance innovation with privacy, security, legal, and governance constraints.
    wiki_evidence:
      - method.source-backed-team-memory
    public_evidence:
      - route: /lab/source-backed-team-memory
        needle: Known, Open, and Protected
    status: visible-qualified
    gap_type: none
    next_action: Keep the human-review and protected-source boundary explicit.
  - id: requirement.aclu.product-brief
    importance: critical
    kind: artifact
    text: Provide a credible product brief for a launched product.
    wiki_evidence:
      - project.callnyc
    public_evidence: []
    status: wiki-proven-not-projected
    gap_type: public-projection
    next_action: Produce and human-review a redacted retrospective CallNYC product brief.
  - id: requirement.aclu.do-not-build-judgment
    importance: important
    kind: capability
    text: Evaluate build, buy, pilot, and do-not-build options with traceable reasoning.
    wiki_evidence:
      - method.source-backed-team-memory
    public_evidence: []
    status: source-needed
    gap_type: source
    next_action: Revisit one bounded decision record; do not invent a do-not-build example.
one_year_success_conditions:
  - Stakeholders trust the discovery process and can act on concise, traceable recommendations.
  - The role can recommend not building and can shape governance without becoming a meeting secretary.
one_year_risk_conditions:
  - Coordination responsibility is high while decision authority and product sponsorship are weak.
interview_questions:
  - What decisions can this role make after discovery, and who sponsors the recommendation?
  - What distinguishes an excellent product brief in the first six months?
relations:
  - type: uses_source
    target: source.jobs.aclu.product-discovery.8482872002
    href: ../sources/jobs-aclu-product-discovery-8482872002.md
  - type: related_to
    target: project.callnyc
    href: ../projects/callnyc.md
  - type: uses_method
    target: method.source-backed-team-memory
    href: ../methods/source-backed-team-memory.md
evidence:
  - target: source.jobs.aclu.product-discovery.8482872002
    relationship: direct-support
    confidence: high
    supports:
      - official role requirements and application artifact as rechecked July 22, 2026
human_review: governed-open
---

# ACLU - Product Manager II, Discovery

This role fits Jamie's listening, synthesis, facilitation, source discipline,
and ambiguity work. The decisive unresolved artifact is a concise, redacted
product brief from a launched product. A retrospective CallNYC brief is a
promising candidate, not yet an accepted substitute.

Recheck the [official source](../sources/jobs-aclu-product-discovery-8482872002.md)
before outward use.
