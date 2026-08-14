# Agency, collective credit, and campaign-web implementation hill climb

Date: 2026-07-14

Branch: `feature/evals-H`

## Objective

Extend the recursive knowledge-bank framework so it can preserve strong claims
about Jamie's work while distinguishing individual contribution, shared and
coalition production, public testimony, institutional authorship, and
legislative enactment. Then use the framework to reconcile Jamie's direct NYC
Artist Coalition campaign-site work with the source record and public site.

## Framework iteration

The canonical schema now includes public-safe entities and source-linked agency
relations. Each relation records actors, action, object, purpose, result, credit
scope, supporting claims and sources, and an explicit overstatement boundary.

The agency graph contains:

- 18 public-safe entities;
- 17 bounded relations across individual, shared, collective, and institutional
  credit;
- exactly two enactment relations, both assigned to the New York City Council;
- open, inconclusive inquiries for Talks Not Raids / M.A.R.C.H. and CallNYC
  Council-account engagement.

Adversarial tests reject advocacy rewritten as enactment, missing attribution
boundaries, unrelated public evidence, loss of archival Git support, and
repository authorship inflated into sole policy, copy, data, or design credit.

## Content iteration

Retained Git histories were inspected after a holdout identified a contradiction
between public website-authorship language and an inquiry that still treated
component authorship as unresolved. The review found:

- 134 of 135 FairRentNYC commits authored by Jamie, with the remaining commit
  identified as Ember CLI boilerplate;
- 31 of 32 Talks Not Raids commits authored by Jamie, with the remaining commit
  identified as Ember CLI boilerplate;
- 133 of 134 Let NYC Dance commits authored by Jamie, with the remaining commit
  identified as Ember CLI boilerplate;
- 17 retained coalition-site Ghost deployment commits authored by Jamie.

The bank now carries a bounded repository-level implementation and maintenance
claim. The public FairRentNYC composition uses that canonical claim and cites
both the aggregate retained-history note and the public FairRentNYC repository.
The related inquiry remains partially recovered for policy, copy, data, image,
design, and collaborator-level attribution.

This is stronger than generic "helped with websites" language and narrower than
sole authorship of every campaign component. Campaign positions, participation,
and outcomes remain collectively credited.

## Recursive holdouts

The first holdout rejected the candidate because the generated public citation
registry was stale. The registry was regenerated and the complete check passed.

The second holdout rejected the candidate because public website-authorship
copy was not reconciled with the new open inquiry. Repository history was then
researched, integrated, bounded, projected through a canonical claim, and
covered by mutation tests.

Two consecutive fresh holdouts accepted the final candidate:

| Holdout | Knowledge score | Agency score | Accepted |
| --- | ---: | ---: | --- |
| Final A | 4.7 / 5 | 5 / 5 | Yes |
| Final B | 4.8 / 5 | 5 / 5 | Yes |

The second accepted holdout requested an additional sole-credit mutation. That
test was added and passed before final validation.

## Final result

- deterministic knowledge score: **5.0 / 5.0** across 10 criteria;
- knowledge mutation tests: **19 / 19**;
- 11 original pilot intakes, 10 source-expansion intakes, and 4 campaign-index
  intakes retained with dispositions and boundaries;
- 98 proposition-level observations;
- 45 campaign press appearances resolving to 44 distinct bounded articles;
- five hiring-relevant NYC Artist Coalition assertions projected through the
  canonical citation layer;
- held claims, protected photo evidence, and incomplete research inquiries
  remain outside public composition.

## Verification

- Node `v26.5.0` full repository check: passed.
- `npm run preflight:staging`: passed.
- `npm run preflight:production`: passed.
- Citation tests: 9 / 9 passed; generated registry current and redacted.
- Portfolio eval suite: 14 evals, 11 blocking, weights total 100.
- Knowledge-bank and public-safety checks: passed with the expected 10 careful
  claim warnings.
- Responsive FairRentNYC browser QA: 5 / 5 viewports at 320, 375, 768, 1024,
  and 1440 pixels; nine source notes and nine noterefs; no horizontal overflow
  or console errors.
- Production dependency audit: no high or critical findings; two moderate
  PostCSS advisories remain nested under Next.js, and npm's forced fix proposes
  a breaking framework downgrade.

## Decision

Accept the iteration. The framework now preserves a stronger, defensible account
of Jamie's direct implementation while preventing that evidence from absorbing
collective political work or institutional outcomes. Further component-level
research can mature without blocking the current repository-level claim.
