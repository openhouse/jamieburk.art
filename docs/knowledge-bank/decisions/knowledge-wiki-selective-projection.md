---
id: decision.knowledge-wiki.selective-projection
title: Knowledge Wiki depth with selective public projection
kind: decision
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-19
review_by: 2026-10-19
canonical_path: docs/knowledge-bank/decisions/knowledge-wiki-selective-projection.md
summary: Current governance decision to maintain a deep public-safe professional knowledge bank while projecting only purpose-fit, reviewed material into the portfolio.
decision_period: 2026-07
decision_state: documented
decision_question: How should a growing professional knowledge bank support applications and public understanding without turning the portfolio into an archive mirror or publishing protected material?
decision_actors:
  - Jamie Burkart as archive custodian, represented person, and publication authority
  - Codex and other research or implementation agents operating under explicit research authority
  - Collaborators, represented people, rights holders, and editors whose review may be required for particular records or assets
constraints:
  - The repository is public and must not contain secrets, raw private archives, protected communications, or unreviewed personal data.
  - Evidence access, claim support, rights, consent, collective credit, editorial fit, and publication authority are separate questions.
  - The portfolio must remain clear and purpose-fit rather than display everything the Wiki can responsibly preserve.
options_considered:
  - option: Maintain a deep public-safe Wiki and selectively project reviewed, audience-fit claims and artifacts into the portfolio.
    disposition: chosen
    evidence_state: documented
  - option: Render the full knowledge bank as the public portfolio.
    disposition: not-chosen
    evidence_state: documented
  - option: Commit raw private source material so every public claim can link directly to its origin.
    disposition: not-chosen
    evidence_state: documented
  - option: Develop a sibling private Wiki sharing a core package with the public professional Wiki.
    disposition: adapted
    evidence_state: documented
chosen_course: Keep the repository's Knowledge Wiki public-safe and substantially deeper than the portfolio, enforce source and human-review boundaries, and promote only reviewed material that serves a defined public purpose.
resulting_artifacts:
  - index.knowledge-wiki.living-archive
  - portfolio.role-fit-referral-map
outcome_boundary: The current repository implements a public-safe Wiki, governed evaluations, and selective projections; the proposed sibling private Wiki and shared core package remain an RFC rather than a shipped system.
credit_scope: individual-and-collective
projection:
  status: hold
  surfaces: []
unknowns:
  - The final architecture, access model, and migration path for a sibling private Wiki remain open.
  - Record-by-record collaborator review and publication readiness continue to vary.
anti_claims:
  - Research access and successful automated evals do not grant publication permission.
  - A record's presence in public Git does not require or authorize its appearance on the portfolio site.
relations:
  - type: uses_method
    target: method.source-backed-team-memory
    href: ../methods/source-backed-team-memory.md
  - type: related_to
    target: index.knowledge-wiki.living-archive
    href: ../indexes/living-archive.md
  - type: related_to
    target: portfolio.role-fit-referral-map
    href: ../projections/role-fit-and-referral-map.md
  - type: informed_by
    target: research.interpretive-layer-source-return.2026-07-19
    href: ../research-runs/interpretive-layer-source-return-2026-07-19.md
---

# Knowledge Wiki depth with selective public projection

The Knowledge Wiki is a place for sources, fragments, claims, anti-claims,
contradictions, decisions, research needs, and public-safe synthesis to mature.
The portfolio is a projection optimized for a present audience and purpose.
Depth in the first makes selectivity in the second more truthful and flexible.

This decision keeps those systems related but non-identical. The private sibling
Wiki remains a documented proposal, not an implemented fact. Human review,
rights, consent, collective credit, and editorial judgment remain open even
when automated checks pass.
