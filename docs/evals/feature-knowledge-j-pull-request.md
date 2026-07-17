# feature/knowledge-j

## Problem

Jamie needs a portfolio that helps hiring readers identify his role, concrete
actions, useful results, and next step quickly, while preserving a much deeper
public-safe professional knowledge base for future applications. The repository
also needs a repeatable way for agents to improve claims and presentation
without turning missing consent, corroboration, reader response, or production
approval into automated passes.

## Composite architecture

This branch keeps J's three canonical suites and adds one small umbrella
contract with four profiles: knowledge development, application share,
production launch, and blind-spot stewardship. It consolidates candidate and
rubric fingerprints, grader separation, hard gates, stop states, and 15
adversarial mutation requirements instead of retaining parallel scoring engines.

Every A-N source has an explicit `adopt`, `adapt`, `defer`, or `reject`
disposition in
`docs/evals/feature-evals-composite-decision-ledger.md` and
`.agents/evals/composite-integration.json`. In brief: J remains canonical; K's
lifecycle becomes the workbench; I/B supply fail-closed integrity; C/N/E supply
run binding and grader separation; D/H supply browser and hiring-reader proof;
F/M supply release and CI discipline; A/G/L supply objective separation,
compact contracts, and newcomer documentation.

## Knowledge capabilities

- Append-safe public-safe intake receipts, including unassigned leads and
  explicit duplicate disposition.
- Source-to-observation-to-candidate-to-decision lifecycle records with
  research, promotion, correction, hold, rejection, and retirement boundaries.
- Bounded query and maintenance-report commands; no CMS, database, internal UI,
  or public knowledge-bank route.
- Exact-surface editorial briefs and publication-safe retrieval that fail
  closed.
- Exact-set collective-credit, composition, projection-reachability, and
  mosaic-privacy controls with adversarial mutation tests.
- CI on Node 26 using `npm ci`, the complete repository check, and Docker smoke.

## Website changes

- Corrects mobile heading and CTA overflow found during the first browser pass.
- Replaces a broad résumé noindex rule with a PDF-only rule and removes
  request-time sitemap timestamps, so the production HTML résumé can remain
  indexable while the phone-bearing PDF stays noindex.
- Exposes genuine public artifacts for Harry J. Epstein, FairRentNYC, and
  CallNYC with source notes, and links those proof objects from Technical
  Operations.
- Adds a synthetic Known / Open / Protected worked example to the Lab without
  implying client delivery, production SaaS, or private archive access.
- Fixes shared case-study label and tag contrast after the first full axe matrix
  found 284 violations.

No `/proofs`, `/knowledge-bank`, archive-browser, or participant-record route was
added.

## Recursive evaluation

Evaluated candidate:
`3cae667f95173ff7e6bea678ecd577a94784c94a`

- Candidate archive: `sha256:555bf876946275633d97a0eb6847cd30f643b52be29e5bb526b351cd6af745cc`
- Composite contract: `sha256:714cddcb1eb039ea288e7f1faec1712c2a7f4b215573c41e5000da409c870cfc`
- Evidence bundle: `sha256:253a8a81e26fc026759277c4d9fe7969c1e33cd7cf62c6837a8df3385cace12a`

Three accepted iterations are recorded in
`docs/evals/runs/feature-knowledge-j/iteration-history.json`: composite/lifecycle
integration, indexing and inspectability, then accessibility contrast. The
final local authoring scores are:

| Profile | Score | State |
| --- | ---: | --- |
| Knowledge development | 0.955 | `human_blocked`; no independent unchanged-candidate certifications |
| Blind-spot stewardship | 0.790 | `human_blocked`; cold-reader and independent/live evidence absent |
| Application share | 0.780 | `human_blocked`; reader tasks, packet, and exact approval absent |
| Production launch | 0.780 | `human_blocked`; approval, public cutover, and rollback evidence absent |

These are observations by an evaluator that authored the candidate. They are
not independent certifications and cannot produce `threshold_met`. No
qualifying external LLM holdout result is recorded. The validation ledger still
requires explicit informed approval before sending public-repository
knowledge-bank contents and eval prompts to an external judging service.

## Verification

Passed under Node 26.5.0 and npm 11.17.0:

```text
npm run check
npm run preflight:staging
npm run preflight:production
git diff --check
```

The complete check includes 84 citation/archive tests, six composite-contract
tests, 20 portfolio-eval tests, 16 knowledge-eval tests, 11 blind-spot tests, 19
lifecycle tests, eight integrity mutation tests, typecheck, lint, production
build, compiled-leak detection, public safety, and route checks.

Browser QA covered 14 canonical routes at 320, 375, 768, and 1280 px: 56
passing cells, 56 full-page screenshots, zero overflow, zero missing images,
zero unnamed links, zero axe violations, zero console errors, and a visible skip
link as the first keyboard target. The temporary screenshot bundle is
fingerprinted in the evidence manifest and is not public-site content.

Docker image `jamieburk-art:knowledge-j-final` built successfully and ran as
`nextjs` UID 1001. Local staging smoke verified health, global noindex, résumé
HTML 200, PDF 200 and `application/pdf`, PDF-specific noindex, stable sitemap,
and staging robots disallow. The container was stopped.

`npm audit --omit=dev` reports two moderate advisories through Next.js's bundled
PostCSS. npm proposes an incompatible forced downgrade rather than a compatible
remediation, so no forced dependency change was made.

## Boundaries

The public repository contains no private paths, raw transcripts, credentials,
participant records, protected source prose, or new collaborator-sensitive
media. Memory remains a research lead. Posted links remain distinct from
engagement or endorsement. Collective and institutional outcomes remain
distinct from Jamie's bounded actions. The approved phone remains in the résumé
PDF and is absent from website HTML.

## Remaining gates

Application sharing still needs fresh human comprehension and artifact tasks, a
fixed role-specific packet, and Jamie's approval of the exact candidate.
Production additionally needs explicit indexing approval, public apex/www/npr
and TLS verification, deployment SHA and health evidence, and a tested rollback.
Future collaborator-sensitive media requires candidate-specific rights and
consent review.

**Production was not deployed or enabled for indexing by this branch.**
