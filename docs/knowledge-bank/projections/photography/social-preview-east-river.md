---
id: projection.photo.social-preview.east-river
title: East River social-preview occurrence
kind: projection
projection_type: photo-occurrence
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-15
review_by: 2027-02-15
canonical_path: docs/knowledge-bank/projections/photography/social-preview-east-river.md
summary: Exact social-preview occurrence binding the complete East River derivative to jamieburk.art Open Graph and Twitter cards with role-first copy, alt text, creator credit, and open production and indexing gates.
projection_status: active
portfolio_edition: edition.launch.2026-08
asset: asset.photo.east-river-manhattan-bridge.2022.001
derivative: derivative.photo.east-river.social-preview.v1
route: /opengraph-image
component: Next.js ImageResponse social preview
purpose:
  - social-orientation
  - personal-presence
  - hiring-reader-entry
crop:
  desktop: complete 4:3 derivative, contained without crop
  mobile: complete 4:3 derivative, contained without crop
alt_text: Jamie Burkart — Technical Project Manager, with a photograph of Jamie at the East River beneath the Manhattan Bridge.
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
publication_authority_source: source.permission.jamie-portfolio-album.2026-08-13
approval:
  public_git: approved
  staging: approved
  production: open
  indexing: open
distribution_boundary: Social platforms may cache this card as a preview of jamieburk.art. No standalone reuse, endorsement, or broader image license is asserted.
rollback:
  action: Replace the social card with the prior text-only composition while retaining this occurrence and its review history.
  preserves_history: true
relations:
  - type: uses_source
    target: asset.photo.east-river-manhattan-bridge.2022.001
    href: ../../assets/photographs/east-river-manhattan-bridge-2022.md
  - type: uses_source
    target: source.permission.elana-gordon.east-river.2026-07
    href: ../../sources/permissions/elana-gordon-east-river-portfolio-2026.md
  - type: uses_source
    target: source.permission.jamie-portfolio-album.2026-08-13
    href: ../../sources/permissions/jamie-portfolio-album-2026-08-13.md
  - type: related_to
    target: edition.launch.2026-08
    href: edition-launch-2026-08.md
---

# East River social-preview occurrence

This occurrence makes the site recognizable when its URL travels through text
messages and social feeds. The role and working proposition remain primary; the
complete, metadata-stripped East River derivative provides situated presence.

The image is contained without a new crop. Elana Gordon's creator credit is
visible on the card, and archive custody remains distinct in the canonical
asset record. Platform caching is treated as delivery of a jamieburk.art
preview, not as permission for standalone reuse or endorsement.

Public Git and staging are approved for review. Production publication and
indexing remain open and require Jamie's exact-candidate approval.

## Rollback

Restore the prior text-only social card without deleting this occurrence,
permission summary, or decision history.
