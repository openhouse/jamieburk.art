---
id: projection.photo.global-social-preview.east-river
title: Global social preview East River occurrence
kind: projection
projection_type: photo-occurrence
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-14
review_by: 2027-02-14
canonical_path: docs/knowledge-bank/projections/photography/global-social-preview-east-river.md
summary: Exact public occurrence binding the approved East River derivative, site identity copy, crop, alt text, visible credit, metadata tags, and release states to the global Open Graph card.
projection_status: active
portfolio_edition: edition.launch.2026-08
asset: asset.photo.east-river-manhattan-bridge.2022.001
derivative: derivative.photo.east-river.social-preview.v1
route: /opengraph-image
component: ImageResponse
purpose:
  - social-sharing
  - personal-presence
  - role-orientation
crop:
  social_card: 72% 50%
alt_text: Jamie Burkart beside the East River beneath the Manhattan Bridge, with portfolio text identifying his technical project management, product operations, and implementation practice.
caption:
  text: East River, 2022.
  assertions:
    - statement.photo.east-river.place.v1
    - statement.photo.east-river.capture-year.v1
credit:
  text: Photograph by Elana Gordon.
  assertions:
    - statement.photo.east-river.creator.v2
permission_source: source.permission.elana-gordon.east-river.2026-07
approval:
  public_git: approved
  staging: approved
  production: open
  indexing: open
rollback:
  action: Revert the Open Graph card to its prior text-only composition while retaining the homepage occurrence and historical record.
  preserves_history: true
relations:
  - type: uses_source
    target: asset.photo.east-river-manhattan-bridge.2022.001
    href: ../../assets/photographs/east-river-manhattan-bridge-2022.md
  - type: uses_source
    target: source.permission.elana-gordon.east-river.2026-07
    href: ../../sources/permissions/elana-gordon-east-river-portfolio-2026.md
  - type: related_to
    target: projection.photo.layout-c.home.east-river
    href: layout-c-home-east-river.md
    context: The social card intentionally stays in step with the approved homepage identity image.
  - type: related_to
    target: edition.launch.2026-08
    href: edition-launch-2026-08.md
---

# Global social preview East River occurrence

This is the exact image occurrence approved for public Git and staging review:
the metadata-stripped JPEG derivative of the approved East River photograph, a 1200 × 630 split composition,
the current site name, role and homepage tagline, a crop that preserves Jamie's
face and New York context, descriptive alt text, and visible Elana Gordon
credit.

The card is a traveling threshold for text messages and social platforms. It
does not convert the photograph into proof of a professional outcome, expand
the underlying permission beyond these named portfolio occurrences, or make
staging indexable.

## Synchronization contract

The application composes this card from `site`, `socialPreview`, and the
governed East River photo record. The social-preview eval fails when homepage
and card imagery diverge, metadata tags stop using the shared configuration,
the derivative changes without a new checksum, the visible credit disappears,
or the occurrence loses its rights and release-state bindings.

## Rollback

Revert the Open Graph card to its prior text-only composition while retaining
the homepage occurrence, asset, credit correction, permission source, and this
historical occurrence record. A withdrawal changes use, not history.
