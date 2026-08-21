---
id: source.nyc-open-data.jobs.pda4-rgn4
title: NYC Open Data — NYC Jobs dataset pda4-rgn4
kind: source
status: maintained
visibility: public
sensitivity: low
last_reviewed: 2026-08-20
review_by: 2026-08-27
canonical_path: docs/knowledge-bank/sources/nyc-open-data-jobs-pda4-rgn4.md
summary: Official DCAS citywide job-posting feed used as a freshness trigger and discovery source, with posting-level verification retained as a separate gate.
source_kind: official-open-data-dataset
url: https://data.cityofnewyork.us/City-Government/NYC-Jobs/pda4-rgn4/about_data
retrieved_at: 2026-08-20
relations:
  - type: related_to
    target: research.nyc-jobs.citywide-monitor.2026-08-20
    href: ../research-runs/nyc-jobs-citywide-monitor-2026-08-20.md
  - type: related_to
    target: source.nyc-jobs.oti-product-search.2026-08-20
    href: nyc-jobs-oti-product-search-2026-08-20.md
---

# NYC Open Data — NYC Jobs dataset pda4-rgn4

The Department of Citywide Administrative Services describes this dataset as
current job postings on the City of New York's official jobs site, including
internal and external postings. Its SODA view metadata is the machine-readable
freshness authority for this opportunity source.

On August 20, 2026, the view metadata reported:

- dataset ID `pda4-rgn4`;
- `rowsUpdatedAt` `1787079680`, or `2026-08-18T19:01:20Z`;
- 2,760 rows returned by the resource endpoint;
- 1,426 unique job IDs after deterministic deduplication; and
- attribution to the Department of Citywide Administrative Services.

The maintained monitor compares the live dataset ID, required schema, and
`rowsUpdatedAt` value with the stored source state. A newer timestamp triggers
a full refresh and scoring pass. An identity change, missing required field, or
timestamp regression stops the pipeline for review.

## Coverage and authority limits

This feed is a discovery source, not the sole lifecycle authority. The August
18 snapshot omitted several OTI postings that had been opened and verified on
the official jobs site on August 20. Several rows marked `External` also stated
in their descriptions that only current permanent City employees or reachable
exam-list candidates could apply. The monitor therefore:

- does not close an opportunity merely because its job ID is absent;
- reads posting text as well as the `Posting Type` field;
- keeps salary, deadline, credential, and City-employee restrictions as hard
  screens before semantic scoring; and
- requires the official posting and application system to be rechecked before
  application or canonical promotion.

The feed contains public job descriptions. The repository stores a compact
source state, a scored provisional intake, and checksums rather than committing
the complete 2,760-row source body.
