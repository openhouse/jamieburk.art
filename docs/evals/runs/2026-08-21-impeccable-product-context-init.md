# Impeccable product-context initialization

**Date:** 2026-08-21

**Branch:** `apply/2026-08-21-A`

## Reader and product truth

Jamie confirmed the inferred product context after the Impeccable initializer
inspected the canonical application and the existing product and design records.
The resulting `PRODUCT.md` now records durable product truth rather than a
deprecated one-word register:

- the primary user is a time-pressed hiring reader or referrer;
- the reader's job is to understand role fit, retrieve credible evidence, and
  choose the next action without learning the portfolio system's internal
  vocabulary;
- the product is a selective portfolio generated from a governed Knowledge
  Wiki Graph, with project sources becoming observations, supported claims,
  evidence, guardrails, and audience-specific projections;
- application and real-world feedback may improve later selections without
  rewriting history;
- access, evidence, consent, attribution, collective credit, publication,
  deployment, and indexing remain separate responsibilities; and
- Jamie retains the human production-publication and indexing decisions.

The update also records the canonical application, product surfaces, evidence
locations, V1 exclusions, brand commitments, and WCAG 2.2 AA accessibility
target. It does not change a public route or visual asset.

## Eval and hill climb

`portfolio-product-context-v1` adds six blocking deterministic criteria for the
Impeccable schema, durable product truth, the hiring-reader job, the Knowledge
Wiki mechanism, authority and public-safety boundaries, and evidence locations
without protected locators. It runs before the rest of the root check so an
obsolete or underspecified product contract fails without consuming modeled
reader evaluations.

The change followed a red-green sequence:

1. The initial test run failed because the evaluator did not yet exist.
2. After the evaluator was added, the inherited `PRODUCT.md` failed all six
   criteria while the legacy-mutation fixture passed, proving the need for the
   context update and the negative test.
3. The first rewritten product record failed the Knowledge Wiki mechanism
   criterion because the parser did not accommodate a line break in the
   explanatory sentence.
4. The parser was corrected to evaluate the complete section. The suite then
   passed six of six blocking criteria and both mutation tests.

## Verification

- `npm run evals:product-context` - passed, six blocking criteria.
- `npm run test:product-context` - passed, two tests.
- `npm run typecheck` - passed.
- `npm run lint` - passed.
- `npm run public-safety` - passed with the existing 11 careful-claim warnings.
- `npm run check:routes` - passed.
- `git diff --check` - passed.

The staging preflight continues to stop at exact-candidate review gates created
by earlier public-surface changes on this branch. The social-preview candidate
differs from its August 15 human review because `DESIGN.md`, the colophon, the
hero, and photography data changed after that review. The full accessibility
receipt is also bound to an older public surface. Neither human receipt is
refingerprinted or represented as current by this run. Staging remains a
non-indexed review surface; production and indexing remain separate human
decisions.
