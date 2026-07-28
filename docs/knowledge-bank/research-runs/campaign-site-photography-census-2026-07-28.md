---
id: research.campaign-sites.photography-census.2026-07-28
title: Campaign-site photography census
kind: research-run
status: governed-open
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/research-runs/campaign-site-photography-census-2026-07-28.md
summary: >
  Reproducible census of photographs and other raster assets published through
  NYC Artist Coalition, Fair Rent NYC, Talks Not Raids, Let NYC Dance, and
  Save NYC Spaces campaign surfaces.
relations:
  - type: related_to
    target: index.knowledge-wiki.photography
    href: ../indexes/photography.md
  - type: related_to
    target: project.nyc-artist-coalition
    href: ../projects/nyc-artist-coalition-2017.md
  - type: related_to
    target: project.fair-rent-nyc
    href: ../projects/fair-rent-nyc.md
  - type: related_to
    target: project.talks-not-raids
    href: ../projects/talks-not-raids-orientation.md
  - type: related_to
    target: project.let-nyc-dance
    href: ../projects/let-nyc-dance.md
  - type: related_to
    target: project.save-nyc-spaces
    href: ../projects/save-nyc-spaces.md
---

# Campaign-site photography census

This pass treats the campaign websites as already composed archival evidence.
The location of a photograph, its neighboring testimony or action language,
and its reuse across a project identity are part of what the image meant in
practice.

The machine-readable census is
[`campaign-site-image-census-2026-07.json`](../data/campaign-site-image-census-2026-07.json).
It enumerates every raster file in the declared retained public source trees,
the 75-photo structured FairRentNYC Flickr corpus, and media locators recovered
from the declared live sites and Ghost sitemaps when the refresh ran.

## Surfaces

- NYC Artist Coalition, including retained Ghost posts and pages from 2017
  onward;
- the retained 2019 FairRentNYC Ember application and its mapped storefront
  photography;
- the current Fair Rent NYC Ghost publication;
- Talks Not Raids;
- Let NYC Dance;
- Save NYC Spaces.

The retained 2019 FairRentNYC source is a stronger primary snapshot than an
incomplete replay alone. Wayback remains a supplementary return path when the
local source and current publication do not establish a historical occurrence.

## Classification

Every record is classified as one of the following:

- campaign photograph;
- campaign testimony portrait;
- candidate photograph;
- press reference reproduction;
- public-official reference portrait;
- campaign graphic or document;
- map reference;
- organization or publisher mark;
- interface asset;
- unresolved raster.

This prevents a Council headshot, a newspaper logo, a flyer, and a photograph
made within the project from acquiring the same evidentiary or rights status.

## Public boundary

The public census contains public URLs, source-relative locators, page
occurrences, public alt text, and limited public context. It contains no local
absolute path, Apple Photos identifier, face record, exact private coordinate,
private source digest, or archive manifest.

Every item remains `human-review-required` for portfolio reuse. Prior campaign
publication is evidence of publication history, not automatic clearance for a
new crop, caption, credit, page, or employment context.

## Apple Photos return

The census gives later local work a finite reconciliation queue. High-value
families can be searched in Jamie's library by public filename, Flickr ID,
people already named in Photos, time range, project album, and visible scene.
Those private matches may add capture dates, people associations, related
frames, and stronger selections. Private identifiers and metadata stay in the
Photo Fieldwork trust domain. Only a separately reviewed public-safe
interpretation returns to this repository.

## Known gaps

- Some historical pages may have been omitted from current sitemaps.
- Ghost theme and page changes can make a once-visible image unreachable
  without Wayback.
- A filename or public occurrence does not establish Jamie as photographer.
- Duplicate crops and exports need family-level visual confirmation.
- `unresolved-raster` records require human inspection before promotion.

Run `npm run campaign-photos:check` for the committed public-safe contract.
Run the private refresh command documented in the repository workflow only
from a machine with the retained campaign source roots.
