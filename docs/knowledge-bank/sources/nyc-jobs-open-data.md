---
id: source.jobs.nyc-open-data.current
title: NYC Jobs official open-data feed
kind: source
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-20
review_by: 2026-08-27
canonical_path: docs/knowledge-bank/sources/nyc-jobs-open-data.md
canonical_url: https://data.cityofnewyork.us/City-Government/NYC-Jobs/pda4-rgn4/about_data
source_type: official-public-data
source_kind: official-job-dataset
publisher: City of New York
provider: Department of Citywide Administrative Services (DCAS)
dataset_id: pda4-rgn4
data_last_updated: 2026-08-18
rows_updated_at: 2026-08-18T19:01:20.000Z
row_count: 2760
update_frequency: "Weekly"
automated_update: true
verified_at: 2026-08-20
summary: Machine-readable official source for current City job discovery, freshness checks, deterministic screening, and review-gated opportunity intake.
human_review: governed-open
---

# NYC Jobs official open-data feed

Data last updated: August 18, 2026. The verified snapshot contains 2,760 rows. NYC Open Data identifies the feed as automated and updated weekly. It contains both internal and external postings, so external-applicant status is a mandatory deterministic screen.

This is a complementary discovery source. It does not replace direct checks of CityJobs search results and official detail pages. In the August 18 snapshot, several current OTI product and SPEED postings already tracked in the Wiki were absent, so the daily digest merges qualified feed discoveries with maintained opportunities rather than treating this dataset as a complete inventory.

A newer `rowsUpdatedAt` value marks the local opportunity snapshot stale and releases a refresh. A metadata-page edit by itself does not. A source-clock regression fails closed for review.

## Boundaries

- A row is evidence that the source listed a posting at the observation time, not that the role remains open or that Jamie qualifies.
- Scores are prioritization aids, not probabilities, endorsements, or hiring predictions.
- Raw descriptions are processed transiently and are not copied into the generated opportunity records.
- Every admitted record remains review-gated before application-material generation or submission.
