---
id: source.nycac.campaign-site-media-census.2026-07
title: NYC Artist Coalition campaign-site media census, July 2026
kind: source
status: maintained
visibility: public-safe
sensitivity: moderate
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/sources/nycac-campaign-site-media-census-2026-07.md
summary: Full-population public-web census of image occurrences on five NYC Artist Coalition project and campaign sites plus one historical Fair Rent NYC capture.
source_kind: public-web-census
source_date: 2026-07-28
public_use_status: metadata-only
coverage:
  pages: 82
  image_occurrences: 529
  unique_image_urls: 413
  photo_entries: 181
  apple_photos_matched_entries: 29
  apple_photos_candidate_assets: 57
  media_index_sha256: b27b0de0a9cbffe104d9c6e81fe1429d2aa8a8833ffe80ccf28ca5b5a391de46
  photo_index_sha256: eebfa98a366a0d6fa86677dd2cb2d0867ae8906e0d65ba7c5a1a50e0ceb2b4fb
relations:
  - type: documents
    target: project.nyc-artist-coalition
    href: ../projects/nyc-artist-coalition-2017.md
  - type: documents
    target: project.fair-rent-nyc
    href: ../projects/fair-rent-nyc.md
  - type: documents
    target: project.let-nyc-dance
    href: ../projects/let-nyc-dance.md
  - type: documents
    target: project.talks-not-raids
    href: ../projects/talks-not-raids-orientation.md
  - type: documents
    target: project.save-nyc-spaces
    href: ../projects/save-nyc-spaces.md
  - type: related_to
    target: index.knowledge-wiki.photography
    href: ../indexes/photography.md
---

# NYC Artist Coalition campaign-site media census, July 2026

## Scope

This census followed every same-site HTML page reachable from the public
campaign roots for:

- `nycartc.com`;
- `fairrentnyc.nycartc.com`;
- `letnycdance.nycartc.com`;
- `talksnotraids.com`;
- `savenycspaces.nycartc.com`; and
- the December 1, 2021 Wayback capture of the earlier Fair Rent NYC site.

The crawl reached 82 pages and recorded 529 image occurrences representing 413
unique public URLs. Classification retained 181 photographs,
photograph-candidates, and portraits as individual Wiki asset records. Logos,
maps, and graphics remain in the machine-readable media census without being
misrepresented as photographs.

The committed source data is:

- [campaign-site-media-index.json](../data/campaign-site-media-index.json);
- [campaign-site-photo-index.json](../data/campaign-site-photo-index.json); and
- [generated photograph records](../assets/photographs/campaign-sites/).

## What page context supports

Public page title, nearby heading, recovered alt text, occurrence count, and
image URL can show how a campaign presented an image. That context can suggest
an event, person, campaign function, or editorial purpose for further research.

It does not by itself establish:

- who made the photograph;
- every person represented;
- the exact event, date, or location;
- Jamie's individual authorship or account stewardship;
- consent for a new crop, caption, or destination; or
- production clearance for the portfolio.

## Local Apple Photos return

A read-only, local-only comparison used public filenames and Flickr numeric
identifiers as retrieval leads. Twenty-nine public images yielded 57 candidate
assets. No photograph, private catalog identifier, People association,
coordinate, exact Apple Photos capture time, or archive path entered Git or a
network service.

The remaining 152 public images had no filename or Flickr-ID match in this
pass. A match is a candidate cross-reference, not identity proof. A non-match
does not mean the original is absent from the archive.

## Rights and display boundary

Jamie authorized portfolio use of imagery from these project and campaign
sites. That archive-level authorization does not settle every photographer
credit, represented-person concern, exact derivative, crop, caption, or
destination. Every generated asset therefore remains metadata-only with
`rights_state: permission-needed`, `public_display_status: hold`, and
`consent_state: review-needed`.

## Completeness boundary

“Full population” applies to the declared roots and historical capture at the
time of the crawl. It does not include unreachable pages, unlinked files,
additional Wayback dates, social-media originals, deleted hosts, private
drafts, or every photographic relative in Apple Photos.
