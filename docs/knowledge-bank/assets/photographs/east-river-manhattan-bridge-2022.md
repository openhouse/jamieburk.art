---
id: asset.photo.east-river-manhattan-bridge.2022.001
title: East River beneath the Manhattan Bridge, 2022
kind: asset
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-26
review_by: 2027-01-26
canonical_path: docs/knowledge-bank/assets/photographs/east-river-manhattan-bridge-2022.md
summary: >
  Public-safe record for a 2022 photograph of Jamie Burkart on the East River
  shoreline beneath the Manhattan Bridge, made by Elana Gordon and preserved
  as the lead occurrence in the Layout C portfolio edition.
media_type: photograph
private_source_binding:
  provider: photo-fieldwork
  opaque_id: pfwpub_c7462c9d3be9e0492271
  verification_status: independently-verified-local
  verified_at: 2026-07-26
  network_upload: false
public_derivatives:
  - id: derivative.photo.east-river.layout-c.v1
    path: apps/www/public/images/field-notes/jamie-east-river.webp
    media_type: image/webp
    width: 1280
    height: 960
    checksum_sha256: 748b6f12e2845dd7dc1ca3fa3f35d61c26a468150b7e3d6d386ae3622d996621
    metadata_stripped: true
    status: public-git-approved
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
    superseded_by: statement.photo.east-river.creator.v2
    references:
      - source.photo-metadata.east-river.2022.public-safe
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
  - The Manhattan Bridge, East River, shoreline, and city buildings are visible.
interpretation_boundary: >
  The photograph may support a curatorial reading of public landscape,
  readiness, navigation, and operational stewardship. It does not by itself
  prove a recurring practice, professional role, leadership status, project
  identity, journey count, or outcome.
rights_state: cleared
consent_state: cleared
public_display_status: cleared
relations:
  - type: related_to
    target: index.photo-set.east-river-canoe.2022
    href: ../../indexes/photo-sets/east-river-canoe-2022.md
    context: One of several privately related frames from the same outing.
  - type: uses_source
    target: source.photo-metadata.east-river.2022.public-safe
    href: ../../sources/photo-metadata/east-river-2022-public-safe.md
    context: Supports date, place, custody, and private-binding verification.
  - type: uses_source
    target: source.permission.elana-gordon.east-river.2026-07
    href: ../../sources/permissions/elana-gordon-east-river-portfolio-2026.md
    context: Supports preferred creator attribution and bounded portfolio permission.
  - type: projected_to
    target: projection.photo.layout-c.home.east-river
    href: ../../projections/photography/layout-c-home-east-river.md
    context: Lead occurrence in the Layout C portfolio edition.
  - type: related_to
    target: source.recollection.jamie-canoe-commuting.2026-07
    href: ../../sources/recollections/jamie-canoe-commuting-2026-07.md
    context: Encountering the composition prompted a later first-person recollection.
---

# East River beneath the Manhattan Bridge, 2022

![Jamie Burkart in a life vest holding a canoe paddle on the East River shoreline beneath the Manhattan Bridge.](../../../../apps/www/public/images/field-notes/jamie-east-river.webp)

## Orientation

Elana Gordon made this photograph during a 2022 East River canoe outing. Jamie
holds the archive copy. The governed derivative above is approved for public Git
within the bounded portfolio workflow. The corrected Layout C occurrence is a
candidate on hold; exact-occurrence, dignity, creator crop, production, and
indexing review remain open.

## Current public use

The photograph is preserved as the lead occurrence in the historical
`edition.layout-c.2026-07` record. Layout E remains the current authored site
composition; this asset record does not automatically place the image there.

## Provenance

The private source was independently matched to this derivative inside the
authorized local Photo Fieldwork workspace on 2026-07-26. The public opaque ID
is random. Private identifiers, source filenames, paths, coordinates, preview
digests, People associations, and permission correspondence remain outside Git.

## Attribution correction

The earlier public record did not assert a third-party creator. Direct
first-person confirmation established Elana Gordon as the preferred creator.
The former unknown state remains legible as deprecated history rather than
being silently erased.

## Curatorial boundary

The photograph creates presence, public landscape, materiality, and movement.
Those are curatorial readings. The factual caption stays short, and the deeper
bicycle-canoe recollection remains a separate dated source.

## Open questions

- Which related frames should receive first-class records?
- Does a future edition benefit from returning to this image?
- What is the strongest human-reviewed lower bound for distinct bicycle-canoe
  journeys in the archive?

## Correction and withdrawal

Any change to creator, permission, crop, caption, credit, route, or release state
requires a new exact-occurrence review. Revocation removes active placement,
preserves history, and never exposes a private reason without authorization.
