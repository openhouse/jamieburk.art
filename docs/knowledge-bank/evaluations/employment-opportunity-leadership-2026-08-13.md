---
id: evaluation.employment-opportunity-leadership.2026-08-13
title: Employment opportunity leadership and freshness evaluation - August 13, 2026
kind: evaluation
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-13
review_by: 2026-08-16
canonical_path: docs/knowledge-bank/evaluations/employment-opportunity-leadership-2026-08-13.md
summary: Deterministic evaluation contract for five priority and historical opportunity records, current status, and evidence-bounded leadership context.
evaluation_type: employment-opportunity-governance
opportunity_ids:
  - opportunity.aclu.senior-project-manager-lps.8620968002
  - opportunity.benepass.product-operations.7f963a7a
  - opportunity.aclu.senior-project-manager-national-campaigns.8631854002
  - opportunity.nyc-oti.senior-product-manager.782366
  - opportunity.nyc-oti.technical-operations-manager.782369
hard_gates:
  - All five records exist and use official employer postings as direct evidence.
  - The four current roles are live and the expired OTI Technical Operations role is closed.
  - Every current role has structured direct-report and senior-vision context.
  - Confirmed, inferred, and unresolved reporting relationships remain distinct.
  - Every named person has a public source and an explicit non-endorsement boundary.
  - Closed roles cannot receive a ready-for-human-review hiring decision.
result:
  deterministic_state: pass
  baseline_tests: 213
  baseline_blocking_criteria: 151
  candidate_tests: 217
  candidate_blocking_criteria: 152
  candidate_change: Add current opportunity and leadership records, close stale records, and make leadership uncertainty machine-checkable.
  public_projection_change: none
relations:
  - type: related_to
    target: index.knowledge-wiki.employment-context
    href: ../indexes/employment-context.md
  - type: related_to
    target: opportunity.nyc-oti.senior-product-manager.782366
    href: ../opportunities/oti-senior-product-manager.md
  - type: related_to
    target: opportunity.nyc-oti.technical-operations-manager.782369
    href: ../opportunities/oti-technical-operations.md
---

# Employment opportunity leadership and freshness evaluation - August 13, 2026

This evaluation prevents a common career-research failure: converting a public
title, a nearby leader, or an inferred org chart into a confirmed direct
reporting relationship. It also preserves an expired dream role as a historical
benchmark without allowing it into the live-opportunity set.

The deterministic test is
[`scripts/knowledge-wiki/opportunity-leadership.test.mjs`](../../../scripts/knowledge-wiki/opportunity-leadership.test.mjs).
Its checks govern knowledge depth only. They do not establish application
submission, recruiter interest, interview likelihood, offer probability, team
fit, or endorsement by any named person.
