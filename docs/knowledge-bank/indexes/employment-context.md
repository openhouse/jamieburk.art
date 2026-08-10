---
id: index.knowledge-wiki.employment-context
title: Employment context and hiring acceptance
kind: index
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-10
review_by: 2026-09-10
canonical_path: docs/knowledge-bank/indexes/employment-context.md
summary: Task-oriented entry point for live opportunity research, role coverage, public-only hiring evaluation, and private-boundary rules.
relations:
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
---

# Employment context and hiring acceptance

This index connects present-tense role research to the deep Wiki without
turning a private job hunt into public content. Opportunity facts come from
official employer sources. Application status, relationship history, warm
paths, message bodies, contact details, and real hiring outcomes remain private.

## Current priority contexts

- [NYC OTI - Technical Operations Manager](../opportunities/oti-technical-operations.md)
- [ACLU - Product Manager II, Discovery](../opportunities/aclu-product-discovery.md)
- [Benepass - Product Operations Manager](../opportunities/benepass-product-operations.md)
- [CodePath - Senior Program Manager, Claude Corps](../opportunities/codepath-claude-corps.md)
- [Asana - AI Implementation Manager](../opportunities/asana-ai-implementation.md)
- [PermitFlow - Product Operations Manager](../opportunities/permitflow-product-operations.md)

## Conditional protected context

- [Protected source-backed team-memory consulting lead](../opportunities/source-backed-team-memory.md)

This node belongs in the opportunity base set but not the live-job count. Its
metadata is anonymous, its commercial state is conditional, and its protected
communications never enter the public hiring evaluator.

## Research a role

1. Recheck the official posting.
2. Separate confirmed facts, inferences, and unknowns.
3. Decompose requirements into stable IDs.
4. Map Wiki evidence, public evidence, real gaps, and one next action.
5. Preserve hard screens and one-year team questions.
6. Keep private relationship and application context outside the repo.

## Evaluate the public portfolio

The public hiring evaluator receives only opportunity context, reader context,
and files that produce public routes. The separate gap resolver may then ask
whether a missing signal is already supported in the Wiki.

Named reader profiles are explicitly simulated public-context lenses. They are
not endorsements, participation, private opinions, or hiring decisions.

## Reports

- [Authored employment coverage baseline](../evaluations/employment-context-coverage-2026-07-18.md)
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
