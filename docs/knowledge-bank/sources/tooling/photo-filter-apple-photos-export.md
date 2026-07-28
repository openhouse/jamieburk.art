---
id: source.tooling.photo-filter.apple-photos-export
title: photo-filter Apple Photos export
kind: source
status: maintained
visibility: public
sensitivity: low
last_reviewed: 2026-07-28
review_by: 2027-01-28
canonical_path: docs/knowledge-bank/sources/tooling/photo-filter-apple-photos-export.md
summary: >
  Public source repository for Jamie's Apple Photos browsing, person-filtering,
  timestamped export, and exported-filename metadata lookup workflow.
source_kind: public-source-repository
canonical_url: https://github.com/openhouse/photo-filter/tree/feature/big-album
reviewed_revision: df34e9f59b67a041e99659fb9fe251c0202d4c04
relations:
  - type: documents
    target: method.photography.transcript-linked-source-return
    href: ../../methods/transcript-linked-photographic-source-return.md
    context: Exported filenames and private People labels can retrieve candidate event clusters.
  - type: related_to
    target: source.vault.apple-photos.metadata
    href: ../apple-photos-archive-metadata.md
    context: The tool operates against the private archive governed by this public-safe boundary.
---

# photo-filter Apple Photos export

At the reviewed public revision, `photo-filter` supports album browsing,
faceted Apple Photos People filtering, selected and top-N exports, and lookup
of People labels by exported filename. Its UTC-prefixed exported names preserve
high-resolution creation-time data when Apple Photos supplied it.

These affordances can help locate a bounded cluster around a photographed and
recorded public event. A private People label is a retrieval candidate created
through Jamie's archival labor. A timestamp is a retrieval coordinate. Neither
one proves who is depicted, when the shutter was released, who was speaking,
whether a frame belongs to the event, or whether the image may be published.

Raw labels, filenames, source identifiers, exact timestamps, locations, album
names, exports, and local paths remain in the private research environment.
Only reviewed public-safe findings and governed derivatives may enter this
repository.
