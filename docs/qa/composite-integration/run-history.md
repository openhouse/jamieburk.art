# Composite Integration Run History

**Date:** July 16, 2026

**Starting commit:** `68846b1f0a8672ff80598a7fef50ce5343c3e004`

**Rubric:** `feature-evals-composite-integration` `1.0.0`

Run artifacts are retained under `evals/composite-integration/runs/`. Each
passing holdout records the evaluated Git commit and candidate-input SHA-256.
The input fingerprint excludes only run artifacts, so recording a result does
not change the candidate it describes.

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

The machine-verifiable composite criterion is eligible to stop after two
passing holdouts record the same unchanged candidate fingerprint. The site is
eligible for targeted job applications under the existing public-safe claim
set. Production launch remains blocked pending the human gates in
`docs/qa/release-status.json`; no automated result closes them.
