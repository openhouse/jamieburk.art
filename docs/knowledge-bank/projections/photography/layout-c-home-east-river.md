---
id: projection.photo.layout-c.home.east-river
title: Layout C homepage East River occurrence
kind: projection
projection_type: photo-occurrence
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-26
review_by: 2027-01-26
canonical_path: docs/knowledge-bank/projections/photography/layout-c-home-east-river.md
summary: Exact public occurrence binding the East River derivative to the Layout C homepage hero, crop, caption, credit, assertions, and release states.
projection_status: active
portfolio_edition: edition.layout-c.2026-07
asset: asset.photo.east-river-manhattan-bridge.2022.001
derivative: derivative.photo.east-river.layout-c.v1
route: /
component: Hero
purpose:
  - orientation
  - personal-presence
  - public-scale
sequence:
  position: 1
  follows: null
  precedes: section.start-here
crop:
  desktop: 50% 50%
  mobile: 73% 50%
alt_text: Jamie Burkart in a life vest holding a canoe paddle on the East River shoreline beneath the Manhattan Bridge.
caption:
  text: At the East River beneath the Manhattan Bridge, 2022.
  assertions:
    - statement.photo.east-river.place.v1
    - statement.photo.east-river.capture-year.v1
credit:
  text: Photograph by Elana Gordon. From Jamie Burkart's photo archive.
  assertions:
    - statement.photo.east-river.creator.v2
    - statement.photo.east-river.custody.v1
permission_source: source.permission.elana-gordon.east-river.2026-07
approval:
  public_git: approved
  staging: approved
  production: open
  indexing: open
rollback:
  action: Remove the Hero image occurrence and retain the existing role-first text composition.
  preserves_history: true
relations:
  - type: uses_source
    target: asset.photo.east-river-manhattan-bridge.2022.001
    href: ../../assets/photographs/east-river-manhattan-bridge-2022.md
  - type: uses_source
    target: source.permission.elana-gordon.east-river.2026-07
    href: ../../sources/permissions/elana-gordon-east-river-portfolio-2026.md
  - type: related_to
    target: source.recollection.jamie-canoe-commuting.2026-07
    href: ../../sources/recollections/jamie-canoe-commuting-2026-07.md
    context: Encountering the composed placement prompted a later recollection.
  - type: related_to
    target: edition.layout-c.2026-07
    href: edition-layout-c-2026-07.md
---

# Layout C homepage East River occurrence

This is the unit approved for public Git and staging review: exact image,
transform, route, component, crop family, alt text, caption, credit, and
surrounding first-viewport task.

Production publication and indexing remain open. If creator attribution,
permission, caption basis, dignity review, or derivative identity changes, the
occurrence fails closed until the affected records are reviewed again.

## Rollback

Remove the Hero image occurrence and retain the role-first text composition.
Do not delete the asset, correction, permission summary, or historical decision
record. A withdrawal changes use, not history.
