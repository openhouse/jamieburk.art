# Accessibility evidence repair — 2026-10-18

## Failure reproduced

The retained August browser matrix did not match the October public surface.
A fresh production build and browser sweep found a real Contact-page contrast
failure in the blue conversation panel, not merely a stale receipt:

| Text | Observed foreground | Background | axe contrast | Required |
| --- | --- | --- | --- | --- |
| Conversation prompt | `#dee8ec` | `#2f6f89` | 4.48:1 | 4.5:1 |
| Engagement boundary | `#c5d7de` | `#2f6f89` | 3.76:1 | 4.5:1 |

The two low-opacity white classes were changed to opaque white. No text,
permission, offer, layout, image, or relationship claim changed. A contrast
regression derived from the actual blue token and paragraph opacity failed
before the change and passed afterward. The repaired mobile panel was visually
inspected; its wording and layout remain intact.

## Capture reliability

The first attempted sweep stopped after 54 observations when a navigation's
`networkidle` wait timed out. It was not complete evidence. The runner now waits
for the actual DOM, fonts, and post-scroll images rather than using global
network quiescence as a proxy for rendering.

A subsequent complete sweep found zero axe violations but initially counted
131 aborted speculative Next.js requests as resource failures. A separate
instrumented reproduction established that some cancellations occurred during
scrolling, before page-close, with `rsc: 1` and `next-router-prefetch: 1` headers.
They were not failed rendered images, fonts, documents, or user navigations.

The reusable runner now freezes request observations before closing each page.
It separately retains canceled speculative prefetches only when all documented
header, origin, resource-type, URL, and exact-error conditions hold. Other
failures remain gating. Both behaviors have red-to-green tests, including
negative cases for real errors and actual RSC navigations. A partial-run test
also verifies that interrupted observations cannot overwrite canonical reports.
Code review then found that screenshots were still written before interaction
checks finished. Screenshot bytes now remain in memory until capture and the
final surface-stability check complete. A separate failing-then-passing test
guards interruption after screenshot capture, preserving both prior pixels and
reports. This publication-order repair did not change the captured app or
retained evidence bytes.

Additional red-to-green evaluator tests reject a duplicated caption viewport
masquerading as four width observations and an unloaded image hidden behind a
successful summary. These strengthen the evidence contract.

## Scope

Final recapture completed at `2026-10-18T19:17:47.142Z`, bound to public-surface
fingerprint `4bd72b92a7741ab059b35010432c9d05dfc6a2d11c2fefa24d5c00411ddaaa42`
(157 runtime/build inputs). All 60 rows passed: zero axe violations, overflow,
broken or unloaded images after scrolling, unlabeled images, gating request
failures, non-success pages, or invalid heading/landmark rows. The 136 canceled
speculative prefetches are individually retained with their classification
evidence. No browser warnings or errors were observed. Caption geometry,
homepage-to-About navigation, keyboard/menu behavior, and reflow checks passed.
The final four screenshot hashes match the exact captures inspected by the
model. All 29 focused capture, contrast, evidence, and freshness tests passed,
including the subsequent screenshot-publication regression.

The canonical reports are generated only by a fresh build and browser run.
Their current status must be read from the final report and validation output,
not inferred from this repair narrative. The four retained homepage/About
captures and the Contact repair were visually inspected by the model. This
does not close human screen-reader review, human browser-zoom review, Jamie's
content approval, or production/indexing approval.
