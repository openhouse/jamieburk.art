---
id: source.photo-metadata.portfolio-cover-images.2026.public-safe
title: Public-safe metadata capsule for the August 2026 project-cover images
kind: source
source_kind: photo-metadata
status: maintained
visibility: summary-only
sensitivity: moderate
last_reviewed: 2026-08-20
review_by: 2027-02-20
canonical_path: docs/knowledge-bank/sources/photo-metadata/portfolio-cover-images-2026-public-safe.md
summary: Public-safe capsule retaining only the capture dates, creator state, and project courtesy credits needed to govern the selected Sunday Dinner and KC Town Hall portfolio derivatives.
retained_fields:
  sunday_dinner_shared_map:
    capture_date: 2013-01-06
    creator_state: unresolved
    display_credit: Photo courtesy of Sunday Dinner NYC.
  kc_town_hall_roof_work:
    capture_date: 2019-03-24
    creator_state: unresolved
    display_credit: Photo courtesy of KC Town Hall.
excluded_fields:
  - source album identifier
  - Apple Photos identifier
  - original filename
  - People tags
  - face associations
  - geolocation
  - device and camera details
  - filesystem paths
  - raw metadata
projection:
  status: hold
  surfaces: []
relations:
  - type: related_to
    target: source.permission.jamie-portfolio-album.2026-08-13
    href: ../permissions/jamie-portfolio-album-2026-08-13.md
---

# Public-safe project-cover image metadata

This capsule keeps only the fields required for a truthful date and credit on
the two selected public derivatives. It does not expose the source album,
archive identifiers, original filenames, People tags, face associations,
location, camera details, private filesystem paths, or raw metadata.

Individual photographer identity remains unresolved for both derivatives. The
public display credits Sunday Dinner NYC and KC Town Hall, respectively. Public
Git and staging are authorized; production publication and indexing remain open
for the exact candidate.
