---
id: source.nyc-jobs.open-data.pda4-rgn4
title: NYC Jobs Open Data source pda4-rgn4
kind: source
status: maintained
visibility: public
sensitivity: low
last_reviewed: 2026-08-20
review_by: 2026-08-25
canonical_path: docs/knowledge-bank/sources/nyc-jobs-open-data-pda4-rgn4.md
summary: Machine-readable, weekly NYC Jobs discovery source and revision signal for governed opportunity intake.
source_kind: official-open-data-filter
url: https://data.cityofnewyork.us/City-Government/NYC-Jobs/pda4-rgn4/about_data
retrieved_at: 2026-08-20
relations:
  - type: related_to
    target: method.nyc-jobs-opportunity-loop
    href: ../methods/nyc-jobs-opportunity-loop.md
---

# NYC Jobs Open Data source pda4-rgn4

The NYC Open Data page describes this dataset as containing current postings
from the City's official jobs site. Its metadata identifies the Department of
Citywide Administrative Services as the provider and records an automated
weekly update cadence.

The machine-readable metadata reported `rowsUpdatedAt` `1787079680`, or
`2026-08-18T19:01:20.000Z`, when retrieved on August 20, 2026. The opportunity
loop compares that revision value with its last completed refresh. A greater
value marks the local intake stale and starts a new deterministic scan.

This asset is a community-created filtered view (`pda4-rgn4`) of the underlying
NYC Jobs view (`kpav-sd4t`). It is therefore a discovery and freshness signal,
not sufficient authority for an application decision. The individual official posting
controls the current description, deadline, applicant restrictions, and
application path. A high score enters a candidate intake queue; it does not
publish a claim, submit an application, or imply an employer's hiring decision.

The raw feed is transient. The repository retains only the source edition,
policy, evaluation evidence, and public-safe candidate summaries. It does not
retain recruitment contacts or the complete mutable posting corpus.
