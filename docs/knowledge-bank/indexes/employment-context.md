---
id: index.knowledge-wiki.employment-context
title: Employment context and hiring acceptance
kind: index
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-13
review_by: 2026-09-13
canonical_path: docs/knowledge-bank/indexes/employment-context.md
summary: Task-oriented entry point for live opportunity research, role coverage, public-only hiring evaluation, and private-boundary rules.
relations:
  - type: related_to
    target: opportunity.nyc-oti.senior-product-manager.782366
    href: ../opportunities/oti-senior-product-manager.md
  - type: related_to
    target: opportunity.aclu.senior-project-manager-lps.8620968002
    href: ../opportunities/aclu-senior-project-manager-lps.md
  - type: related_to
    target: opportunity.aclu.senior-project-manager-national-campaigns.8631854002
    href: ../opportunities/aclu-senior-project-manager-national-campaigns.md
  - type: related_to
    target: opportunity.nyc-oti.technical-operations-manager.782369
    href: ../opportunities/oti-technical-operations.md
  - type: related_to
    target: opportunity.aclu.product-manager-discovery.8482872002
    href: ../opportunities/aclu-product-discovery.md
  - type: related_to
    target: opportunity.benepass.product-operations.7f963a7a
    href: ../opportunities/benepass-product-operations.md
  - type: related_to
    target: opportunity.codepath.claude-corps.5182020007
    href: ../opportunities/codepath-claude-corps.md
  - type: related_to
    target: opportunity.asana.ai-implementation.8027437
    href: ../opportunities/asana-ai-implementation.md
  - type: related_to
    target: opportunity.permitflow.product-operations.8a6e6066
    href: ../opportunities/permitflow-product-operations.md
  - type: related_to
    target: opportunity.protected.source-backed-memory-consulting.2026
    href: ../opportunities/source-backed-team-memory.md
  - type: related_to
    target: evaluation.employment-context.coverage.2026-07-18
    href: ../evaluations/employment-context-coverage-2026-07-18.md
  - type: related_to
    target: evaluation.employment-opportunity-leadership.2026-08-13
    href: ../evaluations/employment-opportunity-leadership-2026-08-13.md
---

# Employment context and hiring acceptance

This index connects present-tense role research to the deep Wiki without
turning a private job hunt into public content. Opportunity facts come from
official employer sources. Application status, relationship history, warm
paths, message bodies, contact details, and real hiring outcomes remain private.

## Current priority contexts

- [NYC OTI - Senior Product Manager](../opportunities/oti-senior-product-manager.md) — four PIT Crew positions; official deadline August 14, 2026
- [ACLU - Senior Project Manager, Learning and Project Solutions](../opportunities/aclu-senior-project-manager-lps.md)
- [Benepass - Product Operations Manager](../opportunities/benepass-product-operations.md)
- [ACLU - Senior Project Manager, National Campaigns](../opportunities/aclu-senior-project-manager-national-campaigns.md)

## Other live contexts

- [Asana - AI Implementation Manager](../opportunities/asana-ai-implementation.md)
- [PermitFlow - Product Operations Manager](../opportunities/permitflow-product-operations.md)

## Historical fit benchmarks

- [NYC OTI - Technical Operations Manager](../opportunities/oti-technical-operations.md) — expired August 7, 2026; retain as a dream-role pattern for analogous openings
- [ACLU - Product Manager II, Discovery](../opportunities/aclu-product-discovery.md) — closed
- [CodePath - Senior Program Manager, Claude Corps](../opportunities/codepath-claude-corps.md) — closed

## Public leadership context

- [Aileen Palmer](../people/aileen-palmer.md) and [Jaclyn Chen](../people/jaclyn-chen.md) — Benepass direct-manager and company-vision context
- [James Williams](../people/james-williams-aclu.md) and [Deirdre Schifeling](../people/deirdre-schifeling.md) — ACLU National Campaigns title-match and departmental-vision context
- [Terence Dougherty](../people/terence-dougherty.md) — nearest named ACLU senior operational leader; the LPS direct manager remains unresolved
- [Luke Farrell](../people/luke-farrell.md) and [Lisa Gelobter](../people/lisa-gelobter.md) — NYC PIT Crew operating-lead and commissioner-level vision context

These links document public organizational context. They do not establish
awareness, hiring authority for a particular application, recommendation, or
endorsement.

## Conditional protected context

- [Protected source-backed team-memory consulting lead](../opportunities/source-backed-team-memory.md)

This node belongs in the opportunity base set but not the live-job count. Its
metadata is anonymous, its commercial state is conditional, and its protected
communications never enter the public hiring evaluator.

## Research a role

1. Recheck the official posting.
2. Separate confirmed facts, inferences, and unknowns.
3. Classify reporting lines as posting-confirmed, public title match, public operational proximity, or unresolved.
4. Decompose requirements into stable IDs.
5. Map Wiki evidence, public evidence, real gaps, and one next action.
6. Preserve hard screens and one-year team questions.
7. Keep private relationship and application context outside the repo.

## Evaluate the public portfolio

The public hiring evaluator receives only opportunity context, reader context,
and files that produce public routes. The separate gap resolver may then ask
whether a missing signal is already supported in the Wiki.

Named reader profiles are explicitly simulated public-context lenses. They are
not endorsements, participation, private opinions, or hiring decisions.

## Reports

- [Authored employment coverage baseline](../evaluations/employment-context-coverage-2026-07-18.md)
- [Opportunity leadership and freshness evaluation](../evaluations/employment-opportunity-leadership-2026-08-13.md)
- [Opportunity coverage](../../../reports/wiki-opportunity-coverage.md)
- [Career trajectory coverage](../../../reports/wiki-career-trajectory-coverage.md)
- [Source-channel coverage](../../../reports/wiki-source-channel-coverage.md)
- [Title-blind discovery](../../../reports/wiki-opportunity-discovery.md)
- [Public-only hiring baseline](../../../reports/hiring-acceptance-public.md)
- [Wiki gap resolution](../../../reports/hiring-acceptance-gap-resolution.md)

Passing these checks does not establish an interview, offer, team fit, or human
reader comprehension.

## Operator commands

```bash
npm run wiki:query -- --live-opportunities
npm run wiki:query -- --requirement requirement.oti.delivery-coordination
npm run wiki:employment:report
npm run wiki:hillclimb
```
