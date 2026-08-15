---
id: projection.photo.home-og.east-river
title: Homepage Open Graph East River occurrence
kind: projection
projection_type: photo-occurrence
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-14
review_by: 2027-02-14
canonical_path: docs/knowledge-bank/projections/photography/home-og-east-river.md
summary: Exact 1200 by 630 homepage social-card occurrence using a metadata-stripped full-frame East River JPEG beside the current portfolio identity and visible photographer credit.
projection_status: active
portfolio_edition: edition.launch.2026-08
asset: asset.photo.east-river-manhattan-bridge.2022.001
derivative: derivative.photo.east-river.og-source.v1
route: /opengraph-image
cache_revision: human-index-photo-v1
component: ImageResponse
purpose:
  - social-link-orientation
  - personal-presence
  - role-legibility
render:
  width: 1200
  height: 630
  photo_treatment: full-frame-contain
  new_photo_crop: false
alt_text: Jamie Burkart at the East River shoreline beneath the Manhattan Bridge — Technical Project Manager, Product Operations & Implementation.
visible_identity:
  name: Jamie Burkart
  role: Technical Project Manager - Product Operations & Implementation
  tagline: I help emerging work become usable systems.
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
distribution_boundary: This occurrence is the automated link preview for Jamie's professional portfolio homepage. Social platforms may cache that preview; the occurrence does not grant a standalone social-media license, transfer rights, or unrestricted reuse of the photograph.
approval:
  public_git: approved
  staging: approved
  production: open
  indexing: open
rollback:
  action: Restore the prior text-only Open Graph image while retaining the homepage photograph, permission capsule, and historical projection record.
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
    context: Uses a metadata-stripped JPEG conversion of the same complete frame without introducing a new photo crop.
  - type: related_to
    target: edition.launch.2026-08
    href: edition-launch-2026-08.md
---

# Homepage Open Graph East River occurrence

This social card lets the homepage travel with the same visual identity that a
visitor encounters on arrival. It uses a metadata-stripped JPEG conversion of
the complete East River frame inside the card without a new photo crop. Jamie's
current name, role, and homepage promise occupy a separate Human Index panel;
Elana Gordon's photographer credit remains visible in the rendered image.

The occurrence is bounded to the automated preview of a jamieburk.art
professional-portfolio link. A social platform may cache that preview as part
of normal link rendering, but this record does not claim a separate social
media license or permission for the photograph to circulate independently of
the portfolio link.

Public Git and staging are approved for this occurrence. Production publication
and indexing remain tied to Jamie's approval of the exact release candidate.
