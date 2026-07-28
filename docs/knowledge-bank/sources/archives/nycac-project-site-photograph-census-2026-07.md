---
id: source.nycac.project-site-photograph-census.2026-07-28
title: NYC Artist Coalition project-site photograph census
kind: source
status: governed-open
visibility: public-safe
sensitivity: moderate
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/sources/archives/nycac-project-site-photograph-census-2026-07.md
summary: A deterministic full-population disposition of recovered Wayback image URLs from five NYC Artist Coalition project and campaign domains.
source_kind: public-web-archive-census
public_use: metadata-and-bounded-context-only
reproduction_rights: unresolved
relations:
  - type: related_to
    target: index.photo-set.nycac-project-sites.2017-2026
    href: ../../indexes/photo-sets/nycac-project-sites-2017-2026.md
---

# NYC Artist Coalition project-site photograph census

## Population

The census accounts for all 522 status-200
image URLs in the collapsed Wayback CDX populations for the five named domains.
187 URL records were classified as photographs
and grouped into 179 exact archived-payload
families. 335 image URLs received explicit
non-photo dispositions. Nothing was silently discarded.

| Site | Archived image URLs | Photo URLs | Explicit exclusions | Held photo families |
| --- | ---: | ---: | ---: | ---: |
| NYC Artist Coalition | 207 | 103 | 104 | 99 |
| FairRentNYC | 107 | 20 | 87 | 18 |
| Talks Not Raids | 65 | 12 | 53 | 12 |
| Let NYC Dance | 87 | 30 | 57 | 30 |
| Save NYC Spaces | 56 | 22 | 34 | 22 |

## Method

The census uses Wayback CDX URL populations collapsed by URL key, deterministic
path-based classification, exact archived payload digests, and archived HTML
occurrence recovery where available. A family hint groups related filenames
for later editorial work but does not assert that two different digests are the
same camera exposure.

The checked-in source-manifest directory preserves the exact image and HTML CDX
rows used for every domain, the query and capture time for each population, and
a SHA-256 receipt for every recovered HTML page. The machine-readable census
repeats those input receipts so a later pass can verify the population without
depending on this working session.

## Completeness boundary

The result is complete for the recovered CDX populations, not for every network
request that ever occurred. Wayback omissions, blocked resources, JavaScript
loads, and uncrawled variants remain possible. The local project repositories
and Apple Photos archive are corroborating research surfaces for future
matching, not hidden additions to the public count.

## Rights boundary

The census preserves public URLs and context only. It does not republish pixels
or clear creator rights, exact credit, depicted-person dignity, consent, crop,
caption, or destination. Every photograph family remains held by default.
