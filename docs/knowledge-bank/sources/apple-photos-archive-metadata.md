---
id: source.vault.apple-photos.metadata
title: Apple Photos archive - public-safe metadata boundary
kind: source
status: governed-open
visibility: summary-only
sensitivity: high
last_reviewed: 2026-07-22
review_by: 2026-10-22
canonical_path: docs/knowledge-bank/sources/apple-photos-archive-metadata.md
summary: Metadata-only boundary for Jamie's private lifetime photo archive; no image, preview, filename, face manifest, identifier, location, receipt, or machine path is committed.
source_kind: protected-photo-archive
opaque_locator: vault.source.apple-photos
coverage_date: 2026-07-22
access_state: partial
normalization_state: partial
identity_resolution_state: human-review-required
public_use_status: summary-only
projection:
  status: hold
  surfaces: []
known_gaps:
  - The 600,000-plus scale is Jamie's approximate description, not a frozen census.
  - Dates, locations, album names, formats, and embedded metadata vary across decades and source media.
  - Existing People associations are substantial private retrieval labor, not a complete or public identity graph.
  - The documented AppleScript interface is available; the current PhotoKit helper remains permission-blocked.
relations:
  - type: related_to
    target: index.knowledge-wiki.photography-notebook
    href: ../photography/README.md
    context: Private source boundary for the residency's public-safe working notes.
  - type: related_to
    target: research.photography.proof-of-life.2026-07-22
    href: ../photography/proof-of-life.md
    context: Source boundary used by the first one-image archive encounter.
---

# Apple Photos archive - public-safe metadata boundary

Jamie describes this as a lifetime archive of more than 600,000 photographs.
It includes heterogeneous material such as digital captures, film scans, and
images with incomplete or uneven dates, locations, album context, and technical
metadata. Jamie has invested substantial care in Apple Photos' People feature,
which can support private retrieval by known person.

This record preserves only the existence, broad affordances, and limits of the
source. The private archive may support project research, chronology work,
visual editing, and the discovery of questions or evidence. It is not a public
collection and is not committed, mirrored, indexed, or exposed through this
repository.

Research access is authorized by Jamie for the residency. Publication remains
a separate decision for each exact photograph and use. Existing People
associations do not grant public identity, rights, consent, attribution, or
permission. Exact filenames, source identifiers, locations, previews, contact
sheets, receipts, face associations, and machine configuration remain private.

For the July 22, 2026 first encounter, the archive was reached through Apple
Photos' documented scripting interface. The installed skill source was current,
but its version-2 PhotoKit helper remained permission-blocked. That partial
tool state must be repaired and reverified before the helper is described as
operational.
