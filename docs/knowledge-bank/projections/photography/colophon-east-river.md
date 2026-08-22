---
id: projection.photo.colophon.east-river
title: Colophon East River editorial-path occurrence
kind: projection
projection_type: photo-occurrence
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-22
review_by: 2027-02-22
canonical_path: docs/knowledge-bank/projections/photography/colophon-east-river.md
summary: Exact public occurrence binding the East River derivative to the colophon's four-step explanation of how one documented object becomes part of the portfolio.
projection_status: active
portfolio_edition: edition.launch.2026-08
asset: asset.photo.east-river-manhattan-bridge.2022.001
derivative: derivative.photo.east-river.layout-c.v1
route: /colophon
component: Editorial process figure
purpose:
  - editorial-method
  - provenance-literacy
  - correction-path
sequence:
  position: 1
  follows: section.colophon-purpose
  precedes: section.living-publication
crop:
  desktop: complete 4:3 frame
  mobile: complete 4:3 frame
alt_text: Jamie Burkart at the East River shoreline beneath the Manhattan Bridge.
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
  action: Remove the colophon figure and retain the four-step editorial explanation in text.
  preserves_history: true
relations:
  - type: uses_source
    target: asset.photo.east-river-manhattan-bridge.2022.001
    href: ../../assets/photographs/east-river-manhattan-bridge-2022.md
  - type: uses_source
    target: source.permission.elana-gordon.east-river.2026-07
    href: ../../sources/permissions/elana-gordon-east-river-portfolio-2026.md
  - type: related_to
    target: edition.launch.2026-08
    href: edition-launch-2026-08.md
---

# Colophon East River editorial-path occurrence

The colophon reuses the complete 4:3 public derivative to make the portfolio's
editorial process concrete. The page leads the reader from selection through
observation, writing, and revision while keeping the existing caption and
visible creator credit intact.

The photograph is an example, not proof that every project follows one rigid
sequence. If the asset, attribution, permission, or public wording changes,
this occurrence returns to review.

## Rollback

Remove the figure and keep the four-step explanation in text. Preserve the
asset, permission capsule, correction history, and this occurrence record.
