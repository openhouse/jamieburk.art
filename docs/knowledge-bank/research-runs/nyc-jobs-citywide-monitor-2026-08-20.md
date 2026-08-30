---
id: research.nyc-jobs.citywide-monitor.2026-08-20
title: NYC Jobs citywide opportunity monitor, August 20, 2026
kind: research-run
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-21
review_by: 2026-08-27
canonical_path: docs/knowledge-bank/research-runs/nyc-jobs-citywide-monitor-2026-08-20.md
summary: Deterministic full-feed screen and person-specific ranking that admitted seven of 1,426 unique City job IDs to provisional review.
human_review: governed-open
relations:
  - type: uses_source
    target: source.nyc-open-data.jobs.pda4-rgn4
    href: ../sources/nyc-open-data-jobs-pda4-rgn4.md
  - type: related_to
    target: research.nyc-oti-product-management-ranking.2026-08-20
    href: nyc-oti-product-management-ranking-2026-08-20.md
---

# NYC Jobs citywide opportunity monitor, August 20, 2026

## Decision

The first full-feed pass evaluated 2,760 rows representing 1,426 unique job
IDs. After inexpensive eligibility screens, 325 remained. Seven roles—0.49% of
the unique population—cleared the strong-match gate and entered provisional
intake. None became a canonical opportunity or changed the public resume in
this pass.

| Rank | Role / Job ID | Agency | Fit | Secure | Composite | Deadline |
| ---: | --- | --- | ---: | ---: | ---: | ---: |
| 1 | Senior Advisor, Digital Strategy 789143 | Office of the Mayor | 100 | 90 | 95.50 | 2026-09-29 |
| 2 | Associate Director of Policy Implementation 792925 | Campaign Finance Board | 100 | 87 | 94.15 | 2026-10-13 |
| 3 | Senior Project Manager 788977 | Campaign Finance Board | 87 | 95 | 90.60 | 2026-09-28 |
| 4 | Project Manager, Enterprise Technology Business Solutions 778437 | Department of Health and Mental Hygiene | 99 | 78 | 89.55 | 2026-10-04 |
| 5 | Associate Director of Product Design 777595 | Campaign Finance Board | 91 | 87 | 89.20 | 2026-09-27 |
| 6 | Technical Project Manager 787600 | Mayor's Office of Criminal Justice | 100 | 73 | 87.85 | 2026-09-20 |
| 7 | Operations Manager 783958 | Office of the Mayor | 77 | 88 | 81.95 | 2026-08-24 |

`Fit` is evidence overlap and `Secure` is a heuristic estimate of screen
survival, not a predicted probability. The composite is `55% fit + 45%
secure`. Admission requires composite 78, fit 75, and secure 65. Every admitted
record still carries `human-review-required` for qualifications.

## Error analysis and hill climb

The initial screen incorrectly admitted four roles whose dataset rows were
marked `External` but whose descriptions required a permanent City title or
exam-list eligibility. The screen now treats explicit current-City-employee
language as a deterministic exclusion. A regression test preserves that
correction.

The remaining seven are research leads, not equally recommended applications.
The Senior Advisor role may emphasize communications more than product
delivery; the Product Design role may expect a conventional senior design
portfolio; the Technical Project Manager and Operations Manager salary ranges
only reach or slightly exceed Jamie's $100,000 target. Named hiring-reader and
posting-level reviews should resolve these questions before materials are
generated.

## Cost-aware evaluation order

1. Verify dataset identity, update timestamp, and schema.
2. Deduplicate job IDs, preferring the external row for evaluation.
3. Exclude internal, expired, non-annual, sub-$100,000-ceiling, credential-
   locked, and explicit current-City-employee-only rows.
4. Compute fit and hiring-likelihood heuristics.
5. Send only new strong matches to cached named-reader model review.
6. Require human qualification, publication, and application decisions.

The current public resume remains tailored to the submitted OTI PIT Crew
Senior Product Manager application. Provisional discoveries do not displace an
active candidacy.
