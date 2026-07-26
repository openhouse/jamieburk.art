---
id: projection.photo.layout-c.home.east-river
title: Layout C homepage East River occurrence
kind: projection
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-26
review_by: 2027-01-26
canonical_path: docs/knowledge-bank/projections/photography/layout-c-home-east-river.md
summary: >
  Reproducible corrected-credit Layout C homepage candidate binding the East
  River derivative to one base commit, patch, candidate tree, route, crop
  family, caption, credit, sequence position, purpose, portfolio edition, and
  human-gated release state.
projection_type: photo-occurrence
projection_status: hold
occurrence_status: candidate-hold
portfolio_edition: edition.layout-c.2026-07
asset: asset.photo.east-river-manhattan-bridge.2022.001
derivative: derivative.photo.east-river.layout-c.v1
candidate_base_commit: fea303e54c6b5fae36caee872a2a7450501f9e11
candidate_patch:
  path: docs/qa/photo-knowledge/layout-c-credit-correction.patch
  sha256: e2746073bf4dc7b3648b19c4e1eff8fbd4bdf8d5c196de2cc5a0f19d22aebd89
candidate_tree: 3059ab6209621cfbca60d352dd83cc596675600a
render_receipt:
  path: docs/qa/photo-knowledge/layout-c-render-receipt.json
  sha256: 0aa8126c4350396ba29aaa5b432a749c07217836b5ed1fed37e8666c6693085d
route: /
component: Hero
purpose:
  - orientation
  - personal-presence
  - public-scale
sequence:
  position: 1
  follows: null
  precedes: section.start-here
crop:
  desktop: 50% 50%
  mobile: 73% 50%
viewport_behavior:
  mobile:
    width: 360
    height: 800
    object_position: 73% center
    screenshot: docs/qa/photo-knowledge/layout-c-home-360x800.png
    screenshot_sha256: 2765480352a9b561abfbf05630984b1bc1d6ed745d7ce70f5b59e9f41bb6362f
    horizontal_overflow: false
    corrected_credit_present: true
  desktop:
    width: 1280
    height: 900
    object_position: center
    screenshot: docs/qa/photo-knowledge/layout-c-home-1280x900.png
    screenshot_sha256: 89ad3b6a6dc190e78e34b8ed682410aa827504bd22ab5557b5934f7d8e8ee6ae
    horizontal_overflow: false
    corrected_credit_present: true
typography:
  role: font-label
  name: font-display
  name_size: 6xl-to-7xl
  value_proposition: 2xl-to-3xl-semibold
adjacent_copy:
  role: Technical Project Manager - Product Operations & Implementation
  name: Jamie Burkart
  value_proposition: I help emerging work become usable systems.
  supporting: >
    I work with public-facing teams to clarify requirements, build workflows
    and tools, carry context through implementation, and leave behind
    documentation people can use.
actions:
  - label: View selected work
    href: /work
  - label: View resume
    href: /resume
renderer_sources:
  - path: apps/www/src/components/Hero.tsx
    snapshot: docs/qa/photo-knowledge/layout-c-renderer-sources/apps/www/src/components/Hero.tsx
    sha256: 9126f3fd6a1a0117b1270c796b7e4afe677fa755bc6beeec4aa90dd6de9cbf6d
  - path: apps/www/src/app/page.tsx
    snapshot: docs/qa/photo-knowledge/layout-c-renderer-sources/apps/www/src/app/page.tsx
    sha256: 6521616938ac69d27b8321b897892cd4fda32c318421e7cb666cc9c82b78d130
  - path: apps/www/src/data/photography.ts
    snapshot: docs/qa/photo-knowledge/layout-c-renderer-sources/apps/www/src/data/photography.ts
    sha256: dc1cdbc6496cc1c5f70cd85c815ef840e1763bb1cbaf5c325a1f1d9a4501969f
  - path: apps/www/src/app/globals.css
    snapshot: docs/qa/photo-knowledge/layout-c-renderer-sources/apps/www/src/app/globals.css
    sha256: d49422f139fcf57efbc620cf366b5cbe9e9e68d1a899ddaa854a995021577978
  - path: apps/www/src/styles/tokens.css
    snapshot: docs/qa/photo-knowledge/layout-c-renderer-sources/apps/www/src/styles/tokens.css
    sha256: 0a17667b30a657c5ea6c4c627453211660df3ef1b061ed4c83d90cd79aaab890
alt_text: >
  Jamie Burkart in a life vest holding a canoe paddle on the East River
  shoreline beneath the Manhattan Bridge.
caption:
  text: At the East River beneath the Manhattan Bridge, 2022.
  assertions:
    - statement.photo.east-river.place.v1
    - statement.photo.east-river.capture-year.v1
credit:
  text: Photograph by Elana Gordon. From Jamie Burkart's photo archive.
  assertions:
    - statement.photo.east-river.creator.v2
    - statement.photo.east-river.custody.v1
permission_source: source.permission.elana-gordon.east-river.2026-07
approval:
  public_git: approved
  staging: not-active-current-layout
  production: open
  indexing: open
approval_basis:
  public_git: source.permission.elana-gordon.east-river.2026-07#delivery_channel_interpretation
  staging: Corrected candidate has local production-mode evidence but is not active in Layout E.
  production: Jamie approval remains open
  indexing: Jamie approval remains open
human_gates:
  jamie_exact_occurrence: open
  mobile_crop_dignity_review: open
  creator_exact_crop_review: open
  production: open
  indexing: open
rollback:
  strategy: remove-placement-preserve-record
  drill: evals/photo-knowledge/rollback/layout-c-home-east-river-drill.json
  cache_review_required: true
  history_retained: true
projection:
  status: hold
  surfaces:
    - corrected-layout-c-candidate
rights_state: cleared
consent_state: review-needed
public_display_status: hold
relations:
  - type: uses_source
    target: source.permission.elana-gordon.east-river.2026-07
    href: ../../sources/permissions/elana-gordon-east-river-portfolio-2026.md
    context: Bounded creator and portfolio-use basis.
  - type: related_to
    target: decision.photo.layout-c.home-east-river.v1
    href: ../../decisions/photography/layout-c-home-east-river-v1.md
    context: The editorial selection decision.
  - type: related_to
    target: edition.layout-c.2026-07
    href: ./edition-layout-c-2026-07.md
    context: Lead occurrence in the dated Layout C edition.
  - type: related_to
    target: source.recollection.jamie-canoe-commuting.2026-07
    href: ../../sources/recollections/jamie-canoe-commuting-2026-07.md
    context: The composed occurrence prompted a later recollection.
---

# Layout C homepage East River occurrence

This record governs one corrected-credit candidate reconstructed from base
commit `fea303e5` plus a one-line, checksummed patch. Candidate tree
`3059ab62` binds the derivative not only to route and crop, but to the renderer
source, typography, adjacent copy, actions, and exact production-mode mobile
and desktop viewport evidence. Both screenshots visibly contain the corrected
credit. The current Layout E application does not actively render this
occurrence.

The public repository contains the derivative, patch, and evidence, but the
occurrence itself remains on hold. Jamie's exact-occurrence approval, mobile
crop dignity review, creator exact-crop review, production, and indexing are
open. A coherent candidate is not a cleared placement.

Caption and credit are factual surfaces. Readiness and navigation are
curatorial readings carried by the whole composition, not caption assertions.
