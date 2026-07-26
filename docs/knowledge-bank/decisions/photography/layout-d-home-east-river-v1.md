---
id: decision.photo.layout-d.home-east-river.v1
title: Select East River photograph for the Layout D homepage canary
kind: decision
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-26
review_by: 2026-08-26
canonical_path: docs/knowledge-bank/decisions/photography/layout-d-home-east-river-v1.md
summary: Bounded editorial decision to advance the East River photograph as the Layout D homepage hero for public-branch and staging review.
decision_period: July 2026
decision_state: documented-with-boundary
decision_question: Which first-viewport composition best joins personal presence, public landscape, and immediate professional role clarity?
decision_actors:
  - Jamie Burkart as final public editorial decision owner.
  - AI-assisted curatorial and implementation team as proposal authors.
constraints:
  - Public Git is publication.
  - Literal role language and primary actions must remain in the first viewport.
  - Permission, creator, custody, represented-person review, production, and indexing remain distinct.
  - A simulated panel cannot confer approval.
options_considered:
  - option: Use the East River photograph as the homepage hero.
    disposition: chosen
    evidence_state: documented
  - option: Retain the Cabaret Law hearing photograph as the homepage hero.
    disposition: not-chosen
    evidence_state: documented
  - option: Use no photograph in the homepage hero.
    disposition: not-chosen
    evidence_state: documented
chosen_course: Advance the East River derivative, exact credit, caption, crop family, and route as one governed branch and staging occurrence.
resulting_artifacts:
  - projection.photo.layout-d.home.east-river
  - edition.layout-d.photo-knowledge.2026-07
outcome_boundary: The decision authorizes the exact public-Git and staging canary only. It does not approve production, indexing, future uses, different crops, or unrelated photographs.
credit_scope: individual-and-collective
projection:
  status: hold
  surfaces: []
unknowns:
  - The private source binding has not yet been independently verified.
  - Raw private permission evidence has not been reinspected in this implementation PR.
  - Production behavior and final crop have not been observed on staging.
anti_claims:
  - The East River image was selected by score, vote, or curatorial consensus.
  - The photograph proves Jamie's professional role or a recurring practice.
  - Staging approval confers production or indexing approval.
relations:
  - type: related_to
    target: evaluation.curatorial.layout-d.home-east-river.v1
    href: ../../evaluations/curatorial/layout-d-home-east-river-v1.md
  - type: related_to
    target: projection.photo.layout-d.home.east-river
    href: ../../projections/photography/layout-d-home-east-river.md
  - type: related_to
    target: edition.layout-d.photo-knowledge.2026-07
    href: ../../projections/photography/layout-d-portfolio-edition.md
---

# Select East River Photograph for the Layout D Homepage Canary

Jamie authorized implementation of RFC 0003. This decision records the smallest
complete public occurrence that can test the architecture without presenting
the portfolio edition as final.

The image was chosen for its relationship to the full first viewport, not
because an automated system declared it the best photograph.
