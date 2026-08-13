---
id: opportunity.nyc-oti.senior-product-manager.782366
title: NYC OTI - Senior Product Manager 782366
kind: opportunity
status: governed-open
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-13
review_by: 2026-08-14
canonical_path: docs/knowledge-bank/opportunities/oti-senior-product-manager.md
summary: Public-safe requirement, leadership, and portfolio-coverage map for four live NYC OTI Public Interest Technology Crew Senior Product Manager positions.
canonical_url: https://cityjobs.nyc.gov/job/senior-product-manager-in-brooklyn-jid-44507
source_type: official-employer
opportunity_status: live
verified_at: 2026-08-13
portfolio_routes:
  - /
  - /work/technical-operations
  - /work/callnyc
  - /work/fair-rent-nyc
  - /lab/source-backed-team-memory
  - /resume
  - /about
  - /contact
discovery_terms:
  - resident-facing product delivery
  - public launch
  - problem framing and discovery
  - cross-functional product leadership
  - accessibility and privacy
  - post-launch measurement
confirmed_facts:
  - Job ID 782366 covers four full-time OTI Senior Product Manager positions with a $100,000 to $180,000 range and an August 14, 2026 deadline.
  - The positions are part of the Public Interest Technology Crew and own resident-facing products from problem framing through public launch.
  - The posting does not identify a direct manager.
inferences:
  - Luke Farrell is the nearest publicly visible operating lead because he publicly says he is leading the PIT Crew team; a direct reporting line is not confirmed.
unknowns:
  - Which PIT Crew and agency problem each position would join.
  - The direct manager, product decision escalation path, and practical salary target.
  - Whether OTI will accept Jamie under the Senior IT Architect minimum-qualification language or another eligible civil-service title.
leadership_context:
  direct_report:
    title: PIT Crew operating lead
    person_id: person.luke-farrell
    evidence_state: public-operating-lead-not-confirmed
    note: Luke Farrell publicly says he leads the PIT Crew; the posting does not state a reporting line.
  senior_vision:
    title: Chief Technology Officer and OTI Commissioner
    person_id: person.lisa-gelobter
    evidence_state: official-senior-leader
    note: The City identifies Lisa Gelobter as OTI Commissioner and records her PIT Crew service-delivery direction.
hard_screens:
  - id: screen.oti-product.minimum-qualification
    text: The Senior IT Architect civil-service minimum qualifications emphasize architecture or infrastructure experience and require employer review.
    state: review-needed
    disposition: verify
  - id: screen.oti-product.deadline
    text: The official application deadline is August 14, 2026.
    state: likely-met
    disposition: proceed
role_requirements:
  - id: requirement.oti-product.end-to-end-public-product
    importance: critical
    kind: capability
    text: Own a resident-facing product from problem framing through public launch and decide version-one scope.
    wiki_evidence:
      - project.callnyc
      - capability.technical-operations
    public_evidence:
      - route: /work/callnyc
        needle: public-facing
      - route: /work/technical-operations
        needle: public launch
    status: visible-qualified
    gap_type: wording
    next_action: Tell one end-to-end CallNYC story with explicit product decisions and bounded authorship.
  - id: requirement.oti-product.discovery-and-research
    importance: critical
    kind: capability
    text: Run discovery with New Yorkers and agency partners and turn findings into a buildable direction.
    wiki_evidence:
      - project.callnyc
      - method.source-backed-team-memory
    public_evidence:
      - route: /work/technical-operations
        needle: clarifies requirements
      - route: /lab/source-backed-team-memory
        needle: evidence
    status: visible-qualified
    gap_type: public-projection
    next_action: Prepare a concise discovery artifact showing questions, evidence, tradeoffs, and decision.
  - id: requirement.oti-product.cross-functional-launch
    importance: critical
    kind: capability
    text: Coordinate design, engineering, research, policy, legal, accessibility, security, communications, and executive stakeholders through launch.
    wiki_evidence:
      - capability.technical-operations
    public_evidence:
      - route: /work/technical-operations
        needle: product, engineering, security, legal
      - route: /work/fair-rent-nyc
        needle: public testimony
    status: visible-proven
    gap_type: none
    next_action: Show how Jamie made dependencies and decision ownership legible.
  - id: requirement.oti-product.metrics-and-learning
    importance: critical
    kind: artifact
    text: Define outcome metrics, instrument the product, and report post-launch learning.
    wiki_evidence:
      - method.source-backed-team-memory
    public_evidence:
      - route: /work/technical-operations
        needle: operational metrics
      - route: /work/technical-operations
        needle: retrospectives
    status: visible-weak
    gap_type: source
    next_action: Prepare one verified outcomes-and-learning example; do not substitute activity counts for resident outcomes.
  - id: requirement.oti-product.accessibility-privacy
    importance: critical
    kind: capability
    text: Build accessibility, privacy, and ethical data handling into product scope and tradeoffs.
    wiki_evidence:
      - method.source-backed-team-memory
    public_evidence:
      - route: /lab/source-backed-team-memory
        needle: Protected
    status: visible-qualified
    gap_type: wording
    next_action: Name an actual gate and what it prevented or changed.
one_year_success_conditions:
  - A resident-facing service has shipped, is measurable and accessible, and has improved through evidence from real users.
  - Agency partners trust the product process and the in-house team leaves behind stronger public delivery capacity.
one_year_risk_conditions:
  - Civil-service title mismatch blocks appointment despite role-level fit.
  - Rapid delivery becomes feature velocity without agency ownership, resident learning, or a sustainable production path.
interview_questions:
  - Would this position report to Luke Farrell or another PIT Crew lead, and who owns final product and policy tradeoffs?
  - Which of the five PIT Crews is hiring first, and what resident outcome will define its first year?
relations:
  - type: uses_source
    target: source.jobs.oti.senior-product-manager.782366
    href: ../sources/jobs-oti-senior-product-manager-782366.md
  - type: related_to
    target: person.luke-farrell
    href: ../people/luke-farrell.md
    context: Nearest publicly visible operating lead; direct reporting remains unconfirmed.
  - type: related_to
    target: person.lisa-gelobter
    href: ../people/lisa-gelobter.md
    context: Officially documented commissioner and senior vision owner for OTI and the PIT Crew.
  - type: related_to
    target: project.callnyc
    href: ../projects/callnyc.md
  - type: related_to
    target: capability.technical-operations
    href: ../capabilities/technical-operations.md
  - type: uses_method
    target: method.source-backed-team-memory
    href: ../methods/source-backed-team-memory.md
evidence:
  - target: source.jobs.oti.senior-product-manager.782366
    relationship: direct-support
    confidence: high
    supports:
      - official role facts, minimum qualifications, duties, compensation, position count, and deadline as rechecked August 13, 2026
  - target: source.linkedin.luke-farrell-pit-crew-leadership.2026
    relationship: context
    confidence: moderate
    supports:
      - nearest publicly visible operating lead without proving a direct reporting line
  - target: source.nyc.pit-crew-launch.2026-07-13
    relationship: context
    confidence: high
    supports:
      - official commissioner identity and senior PIT Crew vision
human_review: governed-open
---

# NYC OTI - Senior Product Manager 782366

This is the highest-upside mission match and the most urgent application. The
portfolio already shows resident-facing civic work, cross-functional delivery,
press and stakeholder communication, and governed knowledge systems. The two
real screens are product-level proof from concept through launch and the Senior
IT Architect civil-service qualifications; neither can be solved by stronger
copy alone.

Luke Farrell is the nearest publicly visible operating lead, not a confirmed
direct manager. Lisa Gelobter is the documented commissioner and senior vision
owner. Recheck the [official posting](../sources/jobs-oti-senior-product-manager-782366.md)
before outward use.
