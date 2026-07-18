# Composite Integration Run History

**Date:** July 17, 2026

**Starting commit:** `68846b1f0a8672ff80598a7fef50ce5343c3e004`

**Rubric:** `feature-evals-composite-integration` `1.3.0`

Run artifacts are retained under `evals/composite-integration/runs/`. Each
passing holdout records the evaluated Git commit and candidate-input SHA-256.
The input fingerprint covers the tracked and unignored repository tree,
including build, lock, configuration, application, and public-asset inputs. It
excludes only immutable run artifacts and ephemeral generated/build output, so
recording a result does not change the candidate it describes.

## Baseline

The untouched branch passed its pre-existing `npm run check`. The first new
composite evaluation scored 68/100 with three hard-gate failures. It found no
collective-credit policy, no exact-route projection manifest, incomplete
corpus-language controls, no application decision, and no routine intake or
query commands. Seven fail-closed and anti-overclaim tests passed.

## Accepted Iterations

1. **Portable evaluator imports.** Plain Node initially could not resolve an
   application-only `@/data` alias. The shared work-data imports were made
   explicit and the composite tests then ran under Node 26.
2. **Governance and daily operations.** Added project credit classification,
   exact-route proof and claim bindings, public-safe append-only lead intake,
   composable lifecycle queries, application-versus-production status, and
   corpus survivorship language. The targeted score reached 100/100.
3. **Evaluator correctness.** The first full check exposed a floating-point
   mismatch: all criteria printed PASS while the process exited nonzero. The
   threshold now uses the same rounded score it reports, with a regression test
   requiring a visibly perfect scorecard to pass.
4. **Responsive interface.** Browser QA found 385-pixel overflow on Technical
   Operations and Source-Backed Team Memory at 320 and 375 pixels. Shared
   buttons now wrap within their container, and the compact Technical
   Operations H1 steps from `text-4xl` to `text-5xl`. The repeated matrix
   passed all 32 route/viewport combinations.
5. **Independent adversarial holdout.** A read-only qualitative evaluator found
   that the first 100/100 score could coexist with missing collective-project
   classifications, fail-open publication-safe output, free-text proof
   provenance, a CallNYC resume-surface mismatch, unenforced holdouts, and
   presence-only quality checks. The evaluator and tests were strengthened,
   every actively projected collective project was classified, proof records
   gained resolvable source or claim IDs, publication filtering gained explicit
   guards, and quality criteria now execute their underlying evals.
6. **Second independent adversarial holdout.** A fresh read-only evaluator
   reproduced the candidate fingerprint and all underlying quality programs,
   then found additional fail-open paths: active projects outside route
   manifests, hollow credit rules, skipped public routes, held and protected
   proof references, malformed scorecards, signed Google URLs, unconstrained
   queries, and human-gate owner drift. The validators now cover every active
   projection and every public route, require substantive credit language,
   constrain proof evidence and project queries, construct publication-safe
   output from closed allowlists, validate the full scorecard contract, and
   require exact human-owner agreement with agent self-certification disabled.
7. **Third independent adversarial holdout.** A new clean-candidate review
   forged internally contradictory scorecards, passed sensitive identifiers
   through intake, substituted semantically false credit rules and hollow route
   metadata, selected proofs on unrelated routes, and demonstrated that several
   evidence gates remained presence-only. The scorecard is now recomputed
   against the current rubric and release state; intake rejects additional
   sensitive classes and ambiguous write syntax; collective policy invokes the
   semantic overclaim detector; routes are discovered from the App Router;
   proof claims are bound to selecting routes; donor, source, corpus, and
   correction gates validate substance; and candidate exclusions admit only
   schema-valid evidence paths.

The complete rejected-candidate summary is retained in
`docs/qa/composite-integration/adversarial-review-history.md`.

No public claim, metric, case-study narrative, homepage argument, or resume
wording changed in this integration. The two interface repairs address direct
browser evidence rather than adding portfolio content to satisfy a score.

## Verification Summary

- `npm ci`: passed on Node 26.5.0 / npm 11.17.0; npm reported two moderate
  dependency vulnerabilities.
- `npm run check`: passed, including every existing corpus, blind-spot, Chad,
  Margaret Morse, Warren Sack, public-safety, build, composite, and recursive
  gate.
- `npm run preflight:staging`: passed with staging host and noindex values. An
  initial sandboxed run could not resolve Google Fonts; the unchanged command
  passed with network access.
- `npm run preflight:production`: passed with the production host and index
  values.
- Docker staging image: built and ran as the non-root application user.
- Runtime: health, all canonical pages, six case studies, sitemap, robots, and
  resume PDF returned 200; `/proofs`, `/knowledge-bank`, and `/public-claims`
  returned 404; all six legacy routes returned 308 to canonical destinations.
- Browser: 8 routes x 4 widths (320, 375, 768, 1280) passed one-H1, no-overflow,
  keyboard-focus, document-completeness, internal-link, and console-error
  checks.
- Resume: both pages rendered and were visually inspected; text extraction
  found no placeholder or internal marker. The approved phone remains in the
  PDF and was not found in non-PDF website files.
- Compiled output: no private filesystem path, supporting-materials marker,
  protected locator, raw meeting-transcript marker, Otter marker, or unresolved
  Jamie-approval marker was found.

## Stopping Decision

The machine-verifiable composite criterion is eligible to stop only after two
committed passing holdouts record the same unchanged candidate fingerprint and
an independent qualitative pass finds no blocking enforcement defect. The site
is eligible for targeted job applications under the existing public-safe claim
set. Production launch remains blocked pending the human gates in
`docs/qa/release-status.json`; no automated result closes them.
