---
id: projection.visual.kc-town-hall.tired-of-tires-flyer
title: Tired of Tires resident-service flyer occurrence
kind: projection
projection_type: visual-occurrence
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-20
review_by: 2027-02-20
canonical_path: docs/knowledge-bank/projections/photography/kc-town-hall-tired-of-tires-flyer.md
summary: Exact public occurrence binding the cropped service flyer to the KC Town Hall resident-service sequence.
projection_status: active
portfolio_edition: edition.launch.2026-08
asset: asset.design.kc-town-hall.tired-of-tires-flyer.2019.001
derivative: derivative.design.kc-town-hall.tired-of-tires-flyer.public-crop.v1
route: /work/kc-town-hall
component: ResidentServiceSequence
purpose:
  - resident-service-interface
  - promise-to-delivery-sequence
crop:
  desktop: full public-safe crop
  mobile: full public-safe crop
alt_text: Archived Tired of Tires flyer announcing a recurring free residential tire-pickup service from KC Town Hall and the Oak Park Neighborhood Association.
caption:
  text: An archived outreach design translated eligibility and a recurring schedule into a resident-facing service promise. Obsolete contact details and dates are excluded from this public derivative.
  assertions:
    - statement.design.kc-town-hall.tired-of-tires-service-model.v1
    - statement.design.kc-town-hall.tired-of-tires-public-crop.v1
credit:
  text: Design courtesy of KC Town Hall.
  assertions:
    - statement.design.kc-town-hall.tired-of-tires.courtesy-credit.v1
permission_source: source.permission.kc-town-hall.tired-of-tires-portfolio.2026-08-14
approval:
  public_git: approved
  staging: approved
  production: open
  indexing: open
rollback:
  action: Remove the flyer occurrence from ResidentServiceSequence while retaining the governed asset and source records.
  preserves_history: true
relations:
  - type: uses_source
    target: asset.design.kc-town-hall.tired-of-tires-flyer.2019.001
    href: ../../assets/graphics/kc-town-hall-tired-of-tires-flyer-2019.md
  - type: uses_source
    target: source.permission.kc-town-hall.tired-of-tires-portfolio.2026-08-14
    href: ../../sources/permissions/kc-town-hall-tired-of-tires-portfolio-2026-08-14.md
  - type: related_to
    target: edition.launch.2026-08
    href: edition-launch-2026-08.md
---

# Tired of Tires resident-service flyer occurrence

This occurrence makes the public promise legible while excluding obsolete
contact details and dates. Production and indexing remain open.
