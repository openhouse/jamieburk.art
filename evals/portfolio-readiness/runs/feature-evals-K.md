# feature/evals-K run record

Date: 2026-07-12

Base: `origin/develop` at `2ec37fe6e47d11e600ede204d19a98f7d3cff139`

Decision sought: application readiness, with production still requiring Jamie's
explicit approval.

## Score history

| Pass | Independent scores | Recommendation | What the scores exposed |
| --- | --- | --- | --- |
| Baseline | 61 | Iterate | Mobile overflow, a diffuse application path, proof buried below context, and repeated governance language. |
| First revision | 76 / 79 | Iterate | Better role framing, but substantial mobile reading burden and weak proof prioritization remained. |
| Second revision | 81 / 81 | Iterate | The application foundations held; Technical Operations, CallNYC, and the HTML resume still asked too much of a first-pass reader. Development screenshots also introduced a Next.js indicator that was not production UI. |
| Final production revision | 90 / 92 | Application-ready | Both fresh judges scored every criterion at least 4 and returned the same recommendation. The pair is within the rubric's two-point stability tolerance. |

The final scorecards were produced independently from the current working tree,
the canonical claim layer, the rendered resume, and production-mode browser
evidence. Prior scores were withheld from the final judges.

## Accepted repairs

- Standardized the recommended application sequence around Technical
  Operations, Harry J. Epstein Company, and CallNYC.
- Put three strongest proof destinations before the complete Technical
  Operations inventory, with progressive disclosure for supporting mobile
  evidence.
- Reworked the HTML resume into three lead claims with direct source-backed case
  study links and a secondary impact disclosure.
- Corrected resume actions so “Download resume PDF” links directly to the PDF.
- Reduced repeated homepage card detail while retaining the complete `/work`
  index.
- Linked homepage proof points and the Technical Operations proof map to their
  case studies.
- Recast internal-sounding approval language as settled public boundaries
  without strengthening any claim.
- Kept CallNYC's full evidence, boundaries, links, sources, and credits while
  moving supplemental mobile material behind a clearly labeled disclosure.
- Removed duplicate section IDs from CallNYC's responsive evidence trees after
  a final judge identified the source-level accessibility risk.

## Verification evidence

- Fast deterministic eval: all 10 gates passed.
- Staging preflight: citation registry, 9 citation tests, typecheck, lint, build,
  knowledge bank, public safety, and route checks passed.
- Production preflight: the same complete gate set passed with production URL
  and indexing configuration.
- Production browser matrix: 30 observations across 10 routes at desktop, 390px,
  and 320px; all returned 200 with one H1, no empty links, no horizontal
  overflow, no duplicate IDs, no console errors, and no page errors. The skip
  link was the first tab stop.
- Resume PDF: two substantive rendered pages, current contact artifact, no
  clipping, overlap, broken glyphs, JavaScript, or encryption.
- `--skip-commands` was tested to fail closed; skipped gates cannot satisfy the
  stop condition.

## Remaining refinements

These are not application blockers in the final pair, but they are the clearest
next improvements:

- Replace selected text-only output abstractions with approved, redacted visual
  specimens when rights and contextual use are settled.
- Rebalance the resume PDF so the THICK ARTS role does not continue with one
  bullet at the top of page two.
- Consider a more compact 320px navigation treatment without hiding
  destinations or shrinking touch targets.
- Continue consolidating repeated public-safety vocabulary where a single
  project boundary can carry the same meaning.

## Decision

The recursive stop condition for **application-ready** is reached: deterministic
evidence passed, two fresh scores reached at least 90, every criterion reached at
least 4, and both judges returned `application-ready`. This run does not grant
production approval. Publishing to production remains Jamie's explicit human
decision.
