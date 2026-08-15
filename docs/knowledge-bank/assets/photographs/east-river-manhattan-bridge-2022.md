---
id: asset.photo.east-river-manhattan-bridge.2022.001
title: East River beneath the Manhattan Bridge, 2022
kind: asset
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-15
review_by: 2027-02-14
canonical_path: docs/knowledge-bank/assets/photographs/east-river-manhattan-bridge-2022.md
summary: Public-safe record for a 2022 photograph of Jamie Burkart at the East River, made by Elana Gordon and used as the Layout C homepage hero.
media_type: photograph
rights_state: cleared
consent_state: cleared
public_display_status: cleared
projection:
  status: active
  surfaces:
    - /
    - /opengraph-image
private_source_binding:
  provider: photo-fieldwork
  opaque_id: pfwpub_ylAbyl1bHgM5
  resolution_state: verified-private-2026-07-26
public_derivatives:
  - id: derivative.photo.east-river.layout-c.v1
    path: apps/www/public/images/field-notes/jamie-east-river.webp
    media_type: image/webp
    width: 1280
    height: 960
    checksum: 748b6f12e2845dd7dc1ca3fa3f35d61c26a468150b7e3d6d386ae3622d996621
    metadata_stripped: true
    status: staging-candidate
  - id: derivative.photo.east-river.og-source.v1
    path: apps/www/public/images/social/jamie-east-river-og-source.jpg
    media_type: image/jpeg
    width: 1280
    height: 960
    checksum: 430005bcac2c4c889d98f5ad031a097346d3e15060a7e1ea8237bcce8fa766d7
    metadata_stripped: true
    transform: Full-frame JPEG source for local Next ImageResponse rendering; the current 1200 by 630 occurrence applies a cover crop at render time.
    status: staging-candidate
statements:
  - id: statement.photo.east-river.creator.unknown.v1
    property: creator
    value: not-recorded-in-layout-c-v1
    rank: deprecated
    confidence: limited
    references:
      - correction.photo.east-river-credit.2026-07
  - id: statement.photo.east-river.creator.v2
    property: creator
    value: person.elana-gordon
    rank: preferred
    confidence: high
    references:
      - source.permission.elana-gordon.east-river.2026-07
    supersedes:
      - statement.photo.east-river.creator.unknown.v1
  - id: statement.photo.east-river.capture-year.v1
    property: capture_year
    value: 2022
    precision: year
    rank: preferred
    confidence: high
    references:
      - source.photo-metadata.east-river.2022.public-safe
  - id: statement.photo.east-river.place.v1
    property: public_place_label
    value: East River beneath the Manhattan Bridge
    precision: landmark
    rank: preferred
    confidence: high
    references:
      - source.photo-metadata.east-river.2022.public-safe
  - id: statement.photo.east-river.custody.v1
    property: archive_custody
    value: Jamie Burkart photo archive
    rank: preferred
    confidence: high
    references:
      - source.photo-metadata.east-river.2022.public-safe
visible_observations:
  - Jamie wears a life vest and holds a canoe paddle on a rocky shoreline.
  - The Manhattan Bridge, water, shoreline, and city buildings are visible.
interpretation_boundary: The photograph may invite readings of public landscape, navigation, readiness, or stewardship. It does not by itself prove a recurring practice, professional role, event identity, leadership status, or outcome.
relations:
  - type: related_to
    target: index.photo-set.east-river-canoe.2022
    href: ../../indexes/photo-sets/east-river-canoe-2022.md
    context: One of several privately related frames from the outing.
  - type: projected_to
    target: projection.photo.layout-c.home.east-river
    href: ../../projections/photography/layout-c-home-east-river.md
    context: Homepage hero occurrence in Layout C.
  - type: projected_to
    target: projection.photo.home-og.east-river
    href: ../../projections/photography/home-og-east-river.md
    context: Full-bleed cover treatment inside the homepage Open Graph preview; creator credit is omitted from the pixels under optional-credit permission and retained in the governed record.
  - type: uses_source
    target: source.photo-metadata.east-river.2022.public-safe
    href: ../../sources/photo-metadata/east-river-2022-public-safe.md
  - type: uses_source
    target: source.permission.elana-gordon.east-river.2026-07
    href: ../../sources/permissions/elana-gordon-east-river-portfolio-2026.md
  - type: collaborated_with
    target: person.elana-gordon
    href: ../../people/elana-gordon.md
    context: Elana Gordon is the preferred creator attribution.
---

# East River beneath the Manhattan Bridge, 2022

![Jamie Burkart in a life vest holding a canoe paddle on the East River shoreline beneath the Manhattan Bridge.](../../../../apps/www/public/images/field-notes/jamie-east-river.webp)

## Current public use

The governed WebP appears as the Layout C homepage hero. A metadata-stripped
full-frame JPEG source is rendered with a 1200 by 630 cover crop inside the
homepage Open Graph preview. The homepage caption names the public place and
year and visibly credits Elana Gordon as photographer while naming Jamie
Burkart's photo archive as the custodian of this copy. Under Elana's explicit
optional-credit permission, the Open Graph pixels omit the credit while the
governed creator statement and permission capsule remain attached.

## What is established

- Creator: Elana Gordon.
- Capture year: 2022, at year precision.
- Public place label: East River beneath the Manhattan Bridge.
- Archive custody: Jamie Burkart's photo archive.
- Permission: bounded portfolio use summarized in a public-safe capsule; the
  private evidence remains outside Git.

## What it does not establish

The image is not evidence by itself of how often Jamie traveled by canoe, how
the canoe reached the shoreline, a professional role, or an outcome. A later
first-person recollection opened those questions without changing the homepage.

## Correction history

Layout C initially named only archive custody. On July 26, 2026, the preferred
creator statement and visible credit were corrected to name Elana Gordon. The
former missing-credit state remains legible as deprecated history rather than a
competing attribution.

On August 15, 2026, Jamie supplied protected correspondence showing that Elana
left visible credit or no visible credit to his preference for the authorized
portfolio use. The homepage credit remains visible; the governed Open Graph
occurrence now omits credit from its pixels and records that placement choice
without copying the private correspondence into Git.

## Open gates

Public Git and staging review are approved for this occurrence. Production
publication and indexing remain open decisions for Jamie. Revocation routes to
the occurrence record and rollback instructions rather than deleting this
historical asset record.
