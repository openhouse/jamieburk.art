# DCLA source return: staging release pass

## Scope

The public change adds a descriptive link to the already-published animation.
The typed collaborator relationship stays held; no downloaded video, audio,
private screenshots or engagement metrics are added to the website.
Production, indexing and new media permissions remain separate.

## Defect found during review

A fresh reader noticed that the résumé download in the blue Technical Operations
panel was difficult to see. Computed styles confirmed blue text on the same blue
background: 1:1 contrast. Axe reported this as `color-contrast` **incomplete**
with `messageKey: equalRatio`, not as a violation. The previous matrix retained
only violations, so its zero count did not catch the defect.

A bounded inverse button variant now uses blue text on a white fill. An initial
pale-blue hover was rejected by the live test at 4.32:1. The final normal, hover
and focus states measure 5.59:1 at 375 and 1280 pixels. All six screenshots were
inspected; the keyboard focus ring remains visible. The download target and
visitor-facing wording are unchanged.

## Regression protection and limits

Test-first mutations demonstrated the original failure and missing evidence
coverage. The matrix now retains incomplete node/check payloads, rejects measured
contrast failures (including `equalRatio`), and rejects missing or malformed
classification/measurement fields. A second read-only technical review identified
missing-coverage and downstream-reporting gaps; additional failing mutations
preceded those repairs.

Photo and pseudo-element backgrounds that axe cannot measure are retained as
explicit manual-review needs. They are neither measured failures nor accessibility
passes. The Knowledge Wiki CLI reports that scope; automated checks do not close
human accessibility review or establish WCAG conformance. Existing violations,
overflow, missing images, request failures, stale bindings and coverage gates stay
in force.

## Local preview interruption

One old preview process stopped answering a single AVIF image key. The source
encoded successfully in a fresh process; PNG/WebP responses also worked. A clean
preview process served the same AVIF request. The initiating cause is unproven.
No source asset, format policy or cache was deleted to conceal the failure.
Partial browser runs were retained locally and are not final passing evidence.

The final route sweep runs four viewport contexts in parallel with the same
route inventory, image checks, axe checks and source-fingerprint bindings. The
earlier sequential partial run is retained but is not counted as completion.

The final matrix has 60 observed route/viewport rows, zero axe violations,
overflow, broken images, unlabeled images, failed resources or page errors.
All 112 lazy-image occurrences were followed up. The 494 recorded aborted
background prefetches each retain affirmative request and successful destination
evidence under the existing classifier; they were not discarded as unknown
failures. Twenty retained axe incomplete finding groups remain manual-review
needs. The 19 accessibility-evidence and four visual-freshness tests pass.

## Review and release discipline

Earlier editorial reviews and the first repaired candidate's incomplete reviews
are superseded after byte changes. Historical canonical receipts are preserved
in `history/2026-10-18-before-dcla-source-return/`.

Fresh professor-lens, browser and composite receipts must bind the final candidate.
Two full unchanged checks, hosted CI and the actual running staging container
remain separate observations. This preparation note does not claim deployment
or human approval; the exact-commit release outcome belongs in the PR receipt.

The photo-placement metadata is narrower than the portfolio-level staging
authorization in `jamie-portfolio-album-2026-08-13.md`. Reviewers retained this as
a metadata consistency follow-up, not a new media permission or production grant.

Three fresh readers returned individual 4/4 judgments for each of the two
fictional professor lenses on the final 157-file candidate. Their scope and
independence disclosures remain in the unchanged returned scorecards. One reader
also recorded that the native mobile Menu stays open after route selection until
closed. This is a visible usability follow-up, not a missing project trace or a
claim that all interface issues have been resolved.
