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
summary: Exact social-preview occurrence binding the selected full-bleed East River editorial composition to jamieburk.art Open Graph and Twitter cards, with creator attribution in alt metadata and the governed record and Jamie's dated production decision.
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
  fixed: full-bleed 1200 by 630 cover, centered at 46 percent vertically
  source_derivative: 4:3 JPEG with intentional top-and-bottom crop in the fixed social composition
alt_text: Jamie Burkart — Technical Project Manager — at the East River beneath the Manhattan Bridge. Photograph by Elana Gordon.
caption:
  text: At the East River beneath the Manhattan Bridge, 2022.
  assertions:
    - statement.photo.east-river.place.v1
    - statement.photo.east-river.capture-year.v1
credit:
  text: Photograph by Elana Gordon. From Jamie Burkart's photo archive.
  rendered_in_image: false
  carried_in_alt_metadata: true
  in_image_credit_basis: optional by creator for this bounded portfolio use
  assertions:
    - statement.photo.east-river.creator.v2
    - statement.photo.east-river.custody.v1
permission_source: source.permission.elana-gordon.east-river.2026-07
publication_authority_source: source.permission.jamie-portfolio-album.2026-08-13
approval:
  public_git: approved
  staging: approved
  production: approved
  indexing: approved
  authority: Jamie Burkart
  approved_at: 2026-08-15
  selected_variant: image-4-editorial-proposition
  alternatives_reviewed: 6
  unique_compositions_reviewed: 4
  rendered_sha256: 1f83d66b7e35e8a3a955819cf2104b79a88c9a8bd3953fd6fa691143bdb6da42
distribution_boundary: Social platforms may cache this card as a preview of jamieburk.art. No standalone reuse, endorsement, or broader image license is asserted.
rollback:
  action: Restore the prior contained split composition with visible credit while retaining this occurrence and its review history.
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
messages and social feeds. Jamie's name and working proposition remain primary;
the metadata-stripped East River derivative provides situated presence through
the exact fixed social crop. The literal role remains available to platforms in
the card metadata without burdening the rendered composition.

The image uses the exact full-bleed crop Jamie approved for this fixed social
composition. Elana Gordon remains identified as creator in alt metadata and the
canonical asset record; her protected permission explicitly makes in-image
credit optional for this bounded portfolio use. The credited homepage
occurrence remains unchanged. Platform caching is treated as delivery of a
jamieburk.art preview, not as permission for standalone reuse or endorsement.

## Six-alternative close reading

Jamie reviewed six supplied 1200 by 630 alternatives on August 15, 2026. Two
pairs were byte-identical, leaving four distinct compositions. He explicitly
removed Image 1 from consideration and selected Image 4, which is identical to
Image 5, for production and indexing.

The selected composition gives the situated photograph the full field, makes
Jamie's name the dominant editorial structure, follows with the plain-language
working proposition, and leaves the destination quiet at lower left. It keeps
the literal role and creator credit in metadata and the governed record rather
than rendering them as additional lines. The comparison files remain outside
Git; this record preserves the public-safe decision and exact selected-render
hash.

## Procedural score

The renderer consumes a prioritized composition score in
`apps/www/src/data/social-preview.ts`: photograph as field; name as primary;
proposition as secondary; destination as quiet continuation; role and credit as
metadata. The score also declares crop, contrast purpose, typography, spatial
coordinates, selected-variant history, and the approved render dimensions and
SHA-256. The build runs `social-preview:verify`, which fails if generated PNG
bytes, dimensions, or content type drift from that approval. Layout evaluations
also fail if an instruction, rendered-field boundary, metadata boundary, local
asset binding, or verifier hook is lost.

The approval binds only this image, crop, copy, route, destination, and hash.
Any later change reopens production and indexing review.

## Rollback

Restore the prior contained split card with visible credit without deleting
this occurrence, permission summary, or decision history.
