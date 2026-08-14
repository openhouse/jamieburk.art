---
id: projection.photo.sunday-dinner.shared-map
title: Sunday Dinner shared-map occurrence
kind: projection
projection_type: photo-occurrence
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-14
review_by: 2027-02-14
canonical_path: docs/knowledge-bank/projections/photography/sunday-dinner-shared-map.md
summary: Exact public occurrence binding the Sunday Dinner shared-map derivative to the work index and case study.
projection_status: active
portfolio_edition: edition.launch.2026-08
asset: asset.photo.sunday-dinner.shared-map.2013.001
derivative: derivative.photo.sunday-dinner.shared-map.v1
routes:
  - /work
  - /work/196-sunday-dinner
components:
  - WorkCard
  - CaseStudyLayout
purpose:
  - situated-work-evidence
  - participation-context
crop:
  desktop: 50% 44%
  mobile: 50% 44%
alt_text: A person stands at a crowded dinner table, raising one hand and holding up a sheet of paper as others laugh beside a hand-drawn map.
caption:
  text: A Sunday Dinner gathering with a hand-drawn map and shared table, January 6, 2013.
  assertions:
    - statement.photo.sunday-dinner.shared-map.context.v1
    - statement.photo.sunday-dinner.shared-map.capture-date.v1
credit:
  text: From Jamie Burkart's photo archive. Photographer not identified in the retained export.
  assertions:
    - statement.photo.sunday-dinner.shared-map.archive-credit.v1
permission_source: source.permission.jamie-portfolio-album.2026-08-13
approval:
  public_git: approved
  staging: approved
  production: open
  indexing: open
rollback:
  action: Remove the occurrence from WorkCard and CaseStudyLayout while retaining the governed asset and source records.
  preserves_history: true
relations:
  - type: uses_source
    target: asset.photo.sunday-dinner.shared-map.2013.001
    href: ../../assets/photographs/sunday-dinner-shared-map-2013.md
  - type: uses_source
    target: source.permission.jamie-portfolio-album.2026-08-13
    href: ../../sources/permissions/jamie-portfolio-album-2026-08-13.md
  - type: related_to
    target: edition.launch.2026-08
    href: edition-launch-2026-08.md
---

# Sunday Dinner shared-map occurrence

This occurrence gives the participation-infrastructure project a situated, human-scale threshold without publishing participant identities or treating a social photograph as outcome proof. Production and indexing remain open.
