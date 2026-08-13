---
id: evaluation.employment-leadership-context.2026-08-13
title: Priority opportunity leadership-context evaluation - August 13, 2026
kind: evaluation
status: governed-open
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-13
review_by: 2026-08-16
canonical_path: docs/knowledge-bank/evaluations/employment-leadership-context-2026-08-13.md
summary: Regression contract for current opportunity selection, reporting-context confidence, senior vision context, and external hiring boundaries.
evaluation_type: employment-leadership-context
failure_modes:
  - A published reporting role is silently converted into a named direct manager.
  - A nearby operational or executive leader is presented as the direct supervisor.
  - A public biography is treated as a private opinion, endorsement, or hiring decision.
  - A priority opportunity lacks a current official posting or an explicit hard-screen review.
deterministic_checks:
  - Four priority opportunity IDs resolve to live official-employer records.
  - Each priority record has a typed reporting context, source, confidence state, and boundary.
  - Each priority record has a sourced person for senior vision context.
  - ACLU remains role-only and OTI remains nearest-public-operational-lead unless stronger evidence is recovered.
human_checks:
  - Confirm the actual direct manager and decision authority during the hiring process.
  - Recheck each posting and leadership page before outward use.
  - Jamie decides whether and how any public-context person appears in an application.
relations:
  - type: related_to
    target: index.knowledge-wiki.employment-context
    href: ../indexes/employment-context.md
  - type: related_to
    target: opportunity.codepath.engineering-project-manager.5160542007
    href: ../opportunities/codepath-engineering-project-manager.md
  - type: related_to
    target: opportunity.aclu.senior-project-manager.8620968002
    href: ../opportunities/aclu-senior-project-manager.md
  - type: related_to
    target: opportunity.benepass.product-operations.7f963a7a
    href: ../opportunities/benepass-product-operations.md
  - type: related_to
    target: opportunity.nyc-oti.senior-product-manager.782366
    href: ../opportunities/oti-senior-product-manager-782366.md
human_review: governed-open
---

# Priority opportunity leadership-context evaluation

This evaluation exists because an org-chart-shaped answer can look precise
while being false. It preserves four distinct evidence states and fails closed
when a person has not been publicly verified.

The deterministic evaluator can validate graph shape, source presence, and
confidence boundaries. It cannot confirm an internal reporting line, predict a
hiring outcome, or substitute a simulated public-context lens for a real
person's judgment.
