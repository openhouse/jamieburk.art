---
id: asset.photo.east-river-manhattan-bridge.2022.001
title: East River beneath the Manhattan Bridge, 2022
kind: asset
media_type: photograph
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-26
review_by: 2027-01-26
canonical_path: docs/knowledge-bank/assets/photographs/east-river-manhattan-bridge-2022.md
summary: Public-safe record for a 2022 East River photograph of Jamie Burkart, made by Elana Gordon and used in the Layout D homepage hero.
rights_state: permission-needed
consent_state: review-needed
public_display_status: hold
private_source_binding:
  provider: photo-fieldwork
  status: pending-independent-verification
  opaque_id: null
  public_note: The public derivative is identified; a durable private source binding remains a human-gated canary item.
public_derivatives:
  - id: derivative.photo.east-river.layout-d.v1
    path: apps/www/public/images/field-notes/jamie-east-river.webp
    media_type: image/webp
    width: 1280
    height: 960
    checksum: 748b6f12e2845dd7dc1ca3fa3f35d61c26a468150b7e3d6d386ae3622d996621
    metadata_stripped: true
    status: staging-candidate
statements:
  - id: statement.photo.east-river.creator.v2
    property: creator
    value: Elana Gordon
    rank: preferred
    confidence: high
    references:
      - source.permission.elana-gordon.east-river.2026-07
    supersedes:
      - statement.photo.east-river.creator.unknown.v1
  - id: statement.photo.east-river.creator.unknown.v1
    property: creator
    value: unknown
    rank: deprecated
    confidence: limited
    references:
      - source.photo-metadata.east-river.2022.public-safe
    superseded_by: statement.photo.east-river.creator.v2
  - id: statement.photo.east-river.capture-year.v1
    property: capture_year
    value: "2022"
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
  - Jamie stands on a rocky shoreline holding a canoe paddle and wearing a life vest.
  - Water, the Manhattan Bridge, shoreline, and city buildings are visible.
interpretation_boundary: The photograph may support a curatorial reading of public landscape, readiness, navigation, and operational stewardship. It does not by itself prove a recurring practice, professional role, leadership status, event identity, or outcome.
anti_claims:
  - The photograph alone proves a recurring bicycle-canoe practice.
  - Archive custody establishes creator attribution or copyright ownership.
  - Permission for this portfolio use grants future unrestricted use.
relations:
  - type: related_to
    target: correction.photo.east-river.clearance-scope.2026-07
    href: ../../corrections/photography/east-river-clearance-scope-2026-07.md
    context: Preserves the independent-review correction from unscoped clearance labels to occurrence-specific states.
  - type: related_to
    target: index.photo-set.east-river-canoe.2022
    href: ../../indexes/photo-sets/east-river-canoe-2022.md
    context: Public-safe member of a privately bounded related-frame set.
  - type: projected_to
    target: projection.photo.layout-d.home.east-river
    href: ../../projections/photography/layout-d-home-east-river.md
    context: Homepage hero occurrence in the Layout D portfolio edition.
  - type: related_to
    target: source.recollection.jamie-canoe-commuting.2026-07
    href: ../../sources/recollections/jamie-canoe-commuting-2026-07.md
    context: Encountering the composed image prompted a dated first-person recollection.
---

# East River beneath the Manhattan Bridge, 2022

![Jamie Burkart in a life vest holding a canoe paddle on the East River shoreline beneath the Manhattan Bridge.](../../../../apps/www/public/images/field-notes/jamie-east-river.webp)

## Current Use

The Layout D homepage uses this derivative as a first-viewport orientation
image. Its factual caption is “At the East River beneath the Manhattan Bridge,
2022.” The credit is “Photograph by Elana Gordon. From Jamie Burkart's photo
archive.”

The image, crop, caption, credit, and route are governed as one occurrence.
Production and indexing remain separate open human gates.

## What Is Established

- Elana Gordon is the preferred current creator attribution.
- The public date precision is year only: 2022.
- The public place precision is landmark only.
- Jamie's photo archive holds the copy used for the public derivative.
- The committed derivative is metadata-minimized and checksum-bound.

## What It Does Not Establish

The image does not establish the frequency of bicycle-canoe journeys, Jamie's
professional role, the complete context of the outing, or any project outcome.
The later recollection remains a dated first-person source rather than a caption
fact.

## Governance

The public derivative and bounded permission summary are reviewable here.
Jamie's authorization covers this exact public-branch review occurrence; it is
not production approval. Raw permission correspondence, source identifiers,
exact private coordinates, related private frames, and the unresolved private
source binding remain outside public Git.
