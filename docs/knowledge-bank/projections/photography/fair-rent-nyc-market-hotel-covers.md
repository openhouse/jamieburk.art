---
id: projection.photo.fair-rent-nyc.market-hotel-covers
title: Fair Rent NYC Market Hotel cover occurrences
kind: projection
projection_type: photo-occurrence
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-10-13
review_by: 2027-02-20
canonical_path: docs/knowledge-bank/projections/photography/fair-rent-nyc-market-hotel-covers.md
summary: Existing homepage, work-index, and case-study covers bound to the already-authorized Market Hotel derivative, separate from its participation-sequence occurrence.
projection_status: active
portfolio_edition: edition.launch.2026-08
asset: asset.photo.project-site.save-nyc-spaces-save-nyc-spaces-group-photo-nyc-artist-coalition-6y2gjc2
derivative: derivative.photo.nycac-market-hotel-banner.v1
routes:
  - /
  - /work
  - /work/fair-rent-nyc
components:
  - WorkCard
  - CaseStudyLayout
purpose:
  - collective-participation
  - public-room-context
  - project-cover
crop:
  desktop: 50% 45%
  mobile: 50% 45%
alt_text: Organizers, artists, and public officials hold a hand-painted Save NYC Spaces and NYC Artist Coalition banner in front of a packed Market Hotel room.
caption:
  text: A collective Save NYC Spaces town hall at Market Hotel, October 11, 2017.
  assertions:
    - statement.photo.nycac-market-hotel.place.v1
    - statement.photo.nycac-market-hotel.capture-date.v1
    - statement.photo.nycac-market-hotel.collective-event.v1
credit:
  text: Photo courtesy of NYC Artist Coalition.
  assertions:
    - statement.photo.nycac-market-hotel.courtesy-credit.v1
permission_source: source.permission.jamie-portfolio-album.2026-08-13
approval:
  public_git: approved
  staging: approved
  production: open
  indexing: open
rollback:
  action: Remove the Market Hotel cover from WorkCard and CaseStudyLayout while retaining the asset, source, and separate participation-sequence occurrence.
  preserves_history: true
relations:
  - type: uses_source
    target: asset.photo.project-site.save-nyc-spaces-save-nyc-spaces-group-photo-nyc-artist-coalition-6y2gjc2
    href: ../../assets/photographs/project-sites/save-nyc-spaces-save-nyc-spaces-group-photo-nyc-artist-coalition-6y2gjc2.md
  - type: uses_source
    target: source.permission.jamie-portfolio-album.2026-08-13
    href: ../../sources/permissions/jamie-portfolio-album-2026-08-13.md
  - type: related_to
    target: projection.photo.fair-rent-nyc.market-hotel-banner
    href: fair-rent-nyc-market-hotel-banner.md
  - type: related_to
    target: edition.launch.2026-08
    href: edition-launch-2026-08.md
---

# Fair Rent NYC Market Hotel cover occurrences

The homepage and work-index uses are `WorkCard`; the Fair Rent NYC cover is
`CaseStudyLayout`. The August 13 permission source already authorizes editorial
selection, responsive crops, public Git, and staging review for this portfolio.
This record repairs the missing destination binding. It grants no new permission.

The existing participation-sequence occurrence remains separately bound to
its 50% 50% crop. Visible people do not become identified attendees, endorsers,
speakers, or evidence of Jamie's sole causation. Production and indexing remain open.
