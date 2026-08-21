---
id: source.nycac.apple-photos.steering-group-card-field.2017
title: NYC Artist Coalition steering-group card-field photo metadata capsule
kind: source
source_kind: private-photo-metadata-capsule
status: governed-open
visibility: summary-only
sensitivity: moderate
last_reviewed: 2026-08-21
review_by: 2027-02-21
canonical_path: docs/knowledge-bank/sources/photo-metadata/nycac-steering-group-card-field-2017.md
summary: Public-safe capsule joining the selected photo-select occurrence to its exact existing Apple Photos inventory record without exposing the library identifier, archive filename, private path, or raw metadata.
association:
  exact_match: true
  inventory_generated_at: 2026-08-14
  capture_year: 2017
  original_width: 4896
  original_height: 3264
  faces_recorded: 0
  location_recorded: false
  designated_portfolio_album: confirmed
  project_collection: NYC Artist Coalition
capability_boundary:
  static_profile_doctor: passed
  existing_inventory_join: completed
  fresh_photokit_receipt: not_observed_within_check_window
  claim: This association uses the existing local inventory; it does not claim a new live PhotoKit authorization receipt.
private_fields_held:
  - library identifier
  - original archive filename
  - filesystem path
  - album identifier
  - raw metadata
projection:
  status: hold
  surfaces: []
relations:
  - type: related_to
    target: asset.photo.nycac.steering-group-card-field.2017.001
    href: ../../assets/photographs/nycac-steering-group-card-field-2017.md
  - type: related_to
    target: source.permission.jamie-portfolio-album.2026-08-13
    href: ../permissions/jamie-portfolio-album-2026-08-13.md
---

# NYC Artist Coalition steering-group card-field photo metadata capsule

The exact selected photo-select occurrence matches one record in Jamie's
existing local Apple Photos inventory and belongs to the designated portfolio
album. The inventory supplies the capture year, source dimensions, project
collection, and absence of recorded faces or location data.

The static local capability profile passed. A fresh read-only PhotoKit receipt
did not arrive within the check window, so this record deliberately limits
itself to the existing inventory join. Private identifiers and archive
locators remain outside Git.
