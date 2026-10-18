# Staging A release review — October 18, 2026

## Scope

Release the current text-only portfolio projection to staging A. No new Red Hook
photograph, recording, participant record, or private correspondence is included.
The limited named Red Hook summary retains its existing approved boundary.
Production deployment, indexing and merge remain outside this release.

## Bounded improvement

The fresh review exposed stale evidence and an ambiguous temporal reading, not a
reason to relabel historic work as current. Jamie clarified that well-supported
past and present projects count, with dates explicit. The original dissent and
the same reader's clarified judgment are both preserved. The unchanged rubric
and public candidate are bound in all six current scorecards.

Professor-panel regression tests now reject repeated reader identities, missing
reader identities, and six cards for only one lens. The three negative tests
failed against the earlier implementation; the strengthened implementation passes
all 16 professor tests. No required score or unanimous acceptance rule changed.

The new staging-A release contract requires the exact app and domain, matching
reviewed/remote/running-container revisions, staging/noindex build and runtime
configuration, and successful hosted smoke checks. All six contract tests pass.
A branch pointer or stale deployment report cannot substitute for the running
container's revision. CI runs these tests after the full repository check.

## Observed local evidence

- Professor lenses: 18/18 criteria; six individual scores of 4 after the explicit
  owner interpretation. These are fictional analytical lenses, not participation
  or endorsement by the named people.
- Responsive browser matrix: 15 canonical routes at 360, 375, 768 and 1280 pixels.
  All 60 observations returned HTTP 200; no axe violations, overflow, missing
  image labels, broken images after scrolling, page errors or unclassified failed
  requests were observed. Verified RSC prefetch cancellations remain recorded.
- Current visual, keyboard, mobile navigation, reflow, accessibility-evidence and
  staging-contract tests: 25/25. Human assistive-technology review remains distinct.
- Public-safety check passes; existing careful-claim warnings remain visible.
- The Node 26 staging-A production build succeeded after retrying the initial
  sandbox-only Google Fonts network failure. No site code was changed to mask it.

Professor candidate: `ea63cae85d422bac902f81b0236702d5065133749be643fe70ab46a94d7df788`.
Public runtime surface: `730aaa4b9155058d977e23b6578b5ab2d561e9a9d7412c6b5603e5374913a9b8`.

## Release conditions

This note is preparation evidence, not a deployment receipt. The final complete
source-tree reviews, full checks, hosted CI, pushed commit and running release
must still agree. Deployment results belong to the exact-commit PR handoff.
Preserve failed gates; never treat this note as evidence that those later steps
already occurred. Staging A remains noindex and production remains unchanged.
