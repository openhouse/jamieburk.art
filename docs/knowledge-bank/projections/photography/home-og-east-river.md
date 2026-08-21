---
id: projection.photo.home-og.east-river
title: Homepage Open Graph East River occurrence
kind: projection
projection_type: photo-occurrence
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-15
review_by: 2027-02-14
canonical_path: docs/knowledge-bank/projections/photography/home-og-east-river.md
summary: Exact 1200 by 630 homepage social-card occurrence using a metadata-stripped East River JPEG as a full-bleed cover image beneath the current name and role, with creator credit governed off-image under optional-credit permission.
projection_status: active
portfolio_edition: edition.launch.2026-08
asset: asset.photo.east-river-manhattan-bridge.2022.001
derivative: derivative.photo.east-river.og-source.v1
route: /opengraph-image
cache_revision: human-index-photo-v5
component: ImageResponse
render_contract: home-social-card-role-led-v1
render_contract_path: apps/www/src/data/social-card.ts
decision_record: docs/decisions/home-social-card-rendering.md
selected_composition: role-led-cinematic
purpose:
  - social-link-orientation
  - personal-presence
  - role-legibility
render:
  width: 1200
  height: 630
  photo_treatment: full-bleed-cover
  crop_alignment: center 46 percent
  new_photo_crop: true
  identity_field: full-frame-cinematic-left-gradient
  identity_field_opacity: 1
  minimum_accessible_identity_field_opacity: 0.674140289044
  contrast_target: 4.5
  gradient: true
  vertical_rule: false
  golden_render_sha256: b2eabe890f187c9e836e723c16260a8c2ffb53e7511b47712f9c099f554857a0
alt_text: Jamie Burkart at the East River shoreline beneath the Manhattan Bridge — Technical Project Manager, Product Operations & Implementation.
visible_identity:
  name: Jamie Burkart
  name_typeface: TeX Gyre Pagella Regular 2.501
  name_typeface_license: GUST Font License
  interface_typeface: Karla Regular 400 and Bold 700, version 2.004
  interface_typeface_license: SIL Open Font License 1.1
  role: Technical Project Manager - Product Operations & Implementation
credit:
  visible_in_image: false
  recorded_text: Photograph by Elana Gordon.
  policy: optional-at-jamie-discretion
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
    context: Uses a metadata-stripped JPEG source from the same cleared frame and applies a homepage-aligned 1200 by 630 cover treatment under the bounded portfolio permission.
  - type: related_to
    target: edition.launch.2026-08
    href: edition-launch-2026-08.md
---

# Homepage Open Graph East River occurrence

This social card lets the homepage travel with the same visual identity that a
visitor encounters on arrival. It uses a metadata-stripped JPEG source from the
cleared East River frame as a full-bleed 1200 by 630 cover image beneath one
light contrast wash and a cinematic left-to-right charcoal gradient. The
gradient remains darkest beneath the role-and-name hierarchy, reaches the full
frame, and becomes fully transparent before the right-side portrait. It uses
neither the former floating placard nor a vertical rule. Only Jamie's current
role and name are visible. His name uses the same licensed TeX Gyre Pagella
identity face as the site.

The selected composition is governed by the executable
`home-social-card-role-led-v1` contract and its human-readable decision record.
The contract encodes the layer order, visible-copy order, typographic hierarchy,
selected opacity, measured contrast floor, exact render hash, instructions, and
priority order. The renderer consumes its layout values directly. A change to
the photograph, crop, copy, typography, gradient, or layout invalidates the old
contrast measurement and requires the render contract, cache revision when
pixels change, governed occurrence, evals, and inspected output to move together.

Elana Gordon remains the recorded creator and remains visibly credited on the
homepage. Her protected permission explicitly leaves visible credit or no
visible credit to Jamie's preference, so this exact Open Graph occurrence omits
the credit from its pixels while retaining the creator statement, permission
capsule, and revocation path in the governed record.

The occurrence is bounded to the automated preview of a jamieburk.art
professional-portfolio link. A social platform may cache that preview as part
of normal link rendering, but this record does not claim a separate social
media license or permission for the photograph to circulate independently of
the portfolio link.

Public Git and staging are approved for this occurrence. Production publication
and indexing remain tied to Jamie's approval of the exact release candidate.
