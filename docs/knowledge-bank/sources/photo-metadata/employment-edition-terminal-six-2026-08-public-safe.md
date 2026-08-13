---
id: source.photo-metadata.employment-edition.2026-08.public-safe
title: Employment-edition terminal six metadata summary
kind: source
source_kind: private-photo-metadata-summary
status: governed-open
visibility: summary-only
sensitivity: moderate
last_reviewed: 2026-08-12
review_by: 2027-02-12
canonical_path: docs/knowledge-bank/sources/photo-metadata/employment-edition-terminal-six-2026-08-public-safe.md
summary: Public-safe capsule of the bounded Apple Photos reconciliation used to check people, dates, album context, and caption precision for the six selected portfolio derivatives.
source_boundary:
  provider: local Apple Photos library through the governed photo-fieldwork bridge
  scope: six selected derivatives only
  access: read-only
  writes: none
  protected_locators: held-outside-git
findings:
  - derivative: derivative.photo.civic-field-exchange.home.v1
    people: Jamie Burkart and Irene Tung
    capture_date: 2026-07-29
    album_context: Small Business United report press conference
    confidence: high
  - derivative: derivative.photo.collective-synthesis.field-record.v1
    public_context: NYC Artist Coalition steering-group synthesis
    capture_year: 2017
    confidence: moderate
  - derivative: derivative.photo.civic-interface.field-record.v1
    public_context: Fair Rent NYC field outreach
    capture_year: 2019
    confidence: moderate
  - derivative: derivative.photo.public-information-materials.field-record.v1
    capture_date: 2023-02-09
    public_context: Fair Rent NYC bilingual public-information materials
    confidence: high
  - derivative: derivative.photo.bicycle-canoe-system.field-record.v1
    depicted_person: Jamie Burkart
    capture_date: 2023-05-21
    confidence: high
  - derivative: derivative.photo.maintenance-in-practice.field-record.v1
    depicted_person: Jamie Burkart
    public_context: KC Town Hall maintenance
    capture_date: unverified
    confidence: moderate
projection:
  status: hold
  surfaces: []
relations:
  - type: related_to
    target: asset-set.photo.employment-edition-terminal-six.2026-08
    href: ../../assets/photographs/employment-edition-terminal-six-2026-08.md
---

# Employment-edition terminal six metadata summary

A fresh, read-only local Apple Photos authorization and bounded reconciliation
were used to check the six selected images. This summary retains only the
public-safe facts needed for captions and alt text. It does not expose library
identifiers, private file paths, unrelated people tags, full album membership,
or the private selection tree.

The reconciliation did not write to Photos. Metadata informed candidate facts;
the selected local pixels were also visually inspected. The KC Town Hall image
keeps its capture date explicitly unverified rather than converting a missing
date into false precision.
