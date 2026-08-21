---
id: evaluation.jobs.nyc-open-data.strong-match
title: NYC Jobs deterministic strong-match opportunity feed
kind: evaluation
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-20
review_by: 2026-08-27
canonical_path: docs/knowledge-bank/evaluations/nyc-jobs-opportunity-feed.md
summary: Cost-conscious deterministic screening and transparent Jamie-specific ranking of the official NYC Jobs open-data feed.
relations:
  - type: uses_source
    target: source.jobs.nyc-open-data.current
    href: ../sources/nyc-jobs-open-data.md
human_review: governed-open
---

# NYC Jobs deterministic strong-match opportunity feed

This run evaluated the August 18, 2026 row-data edition. It deduplicated 2,760 source rows into 1,426 jobs, deterministically excluded 1,088 ineligible or specialized rows before scoring, scored 338, and admitted 13 above the strong gate.

Admission requires fit at least 75, securability at least 60, and combined score at least 84. Combined score weights fit at 62% and securability at 38%. The scores are relative evidence scores, not probabilities.

| Rank | Job ID | Role | Agency | Fit | Securability | Combined | Salary | Deadline |
| ---: | --- | --- | --- | ---: | ---: | ---: | --- | --- |
| 1 | 787600 | [Technical Project Manager](../opportunities/nyc-jobs-787600.md) | OFFICE OF CRIMINAL JUSTICE | 100 | 78 | 91.6 | $68,213–$100,000 | 2026-09-20 |
| 2 | 786621 | [Business Analyst / Project Manager](../opportunities/nyc-jobs-786621.md) | CONSUMER AND WORKER PROTECTION | 100 | 73 | 89.7 | $68,214–$130,000 | 2026-09-14 |
| 3 | 782953 | [Efficiency Program Manager](../opportunities/nyc-jobs-782953.md) | OFFICE OF THE MAYOR | 98 | 75 | 89.3 | $120,000–$140,000 | 2026-10-06 |
| 4 | 786453 | [Policy Analyst, Community Services Delivery](../opportunities/nyc-jobs-786453.md) | OFFICE OF THE MAYOR | 92 | 85 | 89.3 | $115,000–$115,000 | 2026-09-13 |
| 5 | 792925 | [Associate Director of Policy Implementation](../opportunities/nyc-jobs-792925.md) | CAMPAIGN FINANCE BOARD | 98 | 70 | 87.4 | $125,000–$135,000 | 2026-10-13 |
| 6 | 779597 | [Co-Governance Project Coordinator](../opportunities/nyc-jobs-779597.md) | OFFICE OF THE MAYOR | 92 | 78 | 86.7 | $90,000–$110,000 | 2026-09-14 |
| 7 | 788977 | [Senior Project Manager](../opportunities/nyc-jobs-788977.md) | CAMPAIGN FINANCE BOARD | 96 | 70 | 86.1 | $115,000–$130,000 | 2026-09-28 |
| 8 | 783903 | [Senior Business Analyst/Project Manager](../opportunities/nyc-jobs-783903.md) | CONSUMER AND WORKER PROTECTION | 100 | 63 | 85.9 | $75,443–$130,000 | 2026-08-23 |
| 9 | 792692 | [Policy Analyst for Budget, Finance, and Labor](../opportunities/nyc-jobs-792692.md) | OFFICE OF THE MAYOR | 86 | 85 | 85.6 | $110,000–$110,000 | 2026-10-13 |
| 10 | 782011 | [Outreach and Engagement Manager](../opportunities/nyc-jobs-782011.md) | OFFICE OF THE MAYOR | 85 | 85 | 85 | $100,000–$110,000 | 2026-09-25 |
| 11 | 779383 | [Director of Community Engagement](../opportunities/nyc-jobs-779383.md) | OFFICE OF THE MAYOR | 90 | 75 | 84.3 | $100,000–$125,000 | 2026-09-04 |
| 12 | 779989 | [Director of Operations](../opportunities/nyc-jobs-779989.md) | OFFICE OF THE MAYOR | 90 | 75 | 84.3 | $100,000–$125,000 | 2026-09-04 |
| 13 | 786357 | [Deputy Chief of Staff](../opportunities/nyc-jobs-786357.md) | OFFICE OF THE MAYOR | 90 | 75 | 84.3 | $125,000–$125,000 | 2026-09-14 |

## Gate order

1. Deduplicate internal and external copies by Job ID, preferring the external row.
2. Exclude internal-only, expired, sub-$100,000 maximum, licensed-specialist, advanced-degree-required, and construction-specialist postings.
3. Require a Jamie-relevant title family before broad City boilerplate can count.
4. Score functional fit, participatory-governance relevance, salary, vacancy count, deadline, qualification flexibility, and requested experience.
5. Materialize only strong survivors as review-gated opportunity nodes.
6. Merge them with maintained live opportunities for the daily action digest.

## Human and model gates

Direct official-posting review remains required. Only after deterministic admission and role-specific evidence mapping may a tailored resume, cover letter, or named synthetic hiring-reader evaluation run. Jamie alone decides whether and when to apply.
