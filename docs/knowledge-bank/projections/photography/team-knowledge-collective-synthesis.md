---
id: projection.photo.team-knowledge.collective-synthesis
title: Team-knowledge collective-synthesis occurrence
kind: projection
projection_type: photo-occurrence
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-20
review_by: 2027-02-20
canonical_path: docs/knowledge-bank/projections/photography/team-knowledge-collective-synthesis.md
summary: Exact public occurrence binding the collective-synthesis derivative to the Knowledge Wiki Graph lab entry.
projection_status: active
portfolio_edition: edition.launch.2026-08
asset: asset.photo.nycac.collective-synthesis.2017.001
derivative: derivative.photo.nycac.collective-synthesis.portfolio.v1
routes:
  - /lab/source-backed-team-memory
components:
  - SourceBackedTeamMemoryPage
  - MediaImage
purpose:
  - collective-sensemaking-context
  - team-knowledge-pattern
crop:
  desktop: 50% 50%
  mobile: 50% 50%
alt_text: Dozens of multicolored handwritten cards arranged in loose clusters across a wooden floor, with people seated just outside the frame.
caption:
  text: A shared field of handwritten cards from an NYC Artist Coalition steering-group session, February 2017.
  assertions:
    - statement.photo.collective-synthesis.context.v1
    - statement.photo.collective-synthesis.capture-date.v1
credit:
  text: Photo courtesy of NYC Artist Coalition.
  assertions:
    - statement.photo.collective-synthesis.project-credit.v1
permission_source: source.permission.jamie.photo-select-portfolio.2026-08-13
approval:
  public_git: approved
  staging: approved
  production: open
  indexing: open
rollback:
  action: Remove the occurrence from SourceBackedTeamMemoryPage while retaining the governed asset and source records.
  preserves_history: true
relations:
  - type: uses_source
    target: asset.photo.nycac.collective-synthesis.2017.001
    href: ../../assets/photographs/nycac-collective-synthesis-2017.md
  - type: uses_source
    target: source.permission.jamie.photo-select-portfolio.2026-08-13
    href: ../../sources/permissions/photo-select-album-portfolio-2026-08-13.md
  - type: related_to
    target: method.source-backed-team-memory
    href: ../../methods/source-backed-team-memory.md
  - type: related_to
    target: edition.launch.2026-08
    href: edition-launch-2026-08.md
---

# Team-knowledge collective-synthesis occurrence

This occurrence uses a real collective working artifact as a visual threshold
for the Knowledge Wiki Graph method. It presents the method as a way to make
existing language and relationships navigable, not as intelligence arriving
from outside the team. Production and indexing remain open.
