# Recursive Portfolio Eval Run: feature/evals-G

- Date: 2026-07-13
- Base: `origin/develop` at `2ec37fe6e47d11e600ede204d19a98f7d3cff139`
- Reviewed application candidate: `5d872a92`
- Protocol: `portfolio-production-readiness`, version 3
- Decision: `stop_human_blocked`

## Result

The candidate clears the deterministic and LLM-scored portion of the
application-share profile with a normalized weighted score of `0.8537` against
a minimum of `0.80`. It is not yet application-share eligible because the
profile requires Jamie's approval of the exact resume, contact path, and public
claim set.

The candidate is not production-launch eligible. The current public apex has
not been cut over to this reviewed build (`PR-011`), and Jamie has not approved
the exact production commit and indexing state (`PR-012`). The production
packet's URLs therefore cannot pass their live final check (`PR-014`). No
production deployment or indexing change was made during this run.

## Protocol Note

The first run exposed an aggregation defect: the application-share score was
being divided by production-only gates. Version 2 declares the evals included
in each readiness profile and normalizes by their included weight. The rubric's
qualitative criteria, hard constraints, and production gates did not change.
The unchanged code candidate then passed the complete production preflight
twice under version 2.

Version 3 adds `PR-015`, a blocking Chad-lens criterion: can a warm referrer
send the portfolio to a hiring manager with one accurate sentence and no
apology? The initial substantive blind panel scored the prior projection
`3, 4, 3` (median `3`). One bounded iteration moved linked, actor-led approved
proof directly beneath the hero and strengthened two featured summaries. Two
unchanged-candidate confirmation panels then scored `4, 4, 4` and `4, 4, 4`.

## Scorecard

| Eval | Baseline | Final | State |
| --- | ---: | ---: | --- |
| PR-001 Two-minute comprehension | 3 | 4 | Blocking pass; three-judge median 4 |
| PR-002 Inspectable evidence | 1-2 | 2 | Nonblocking minimum; approved local proof remains thin on two lead cases |
| PR-003 Role-fit traceability | 2 | 3 | Improved |
| PR-004 Voice and compression | 2 | 2 | Nonblocking minimum; further compression remains useful |
| PR-005 Claim governance | 4 | 4 | Blocking pass |
| PR-006 Resume readiness | 4 | 4 | Blocking pass |
| PR-007 CTA truthfulness | 2 | 4 | Blocking pass |
| PR-008 Indexing consistency | 2 | 4 | Blocking pass in production-mode container |
| PR-009 Build and runtime | 4 | 4 | Blocking pass |
| PR-010 Responsive access | 1 | 4 | Blocking pass |
| PR-011 Production cutover | 0 | 0 | Human release action remains |
| PR-012 Exact-candidate approval | Not observed | Not observed | Human decision remains |
| PR-013 AI and memory proof | 2 | 4 | Improved |
| PR-014 Application packet | 1 | 2 | Production URL check remains |
| PR-015 Chad-lens professional legibility | 3 | 4 | Blocking pass; two consecutive three-judge medians of 4 |

The final application profile includes `PR-001` through `PR-007`, `PR-009`,
`PR-010`, `PR-013`, `PR-014`, and `PR-015`; its included weights total `82`.
The weighted points are `70`, yielding `70 / 82 = 0.8537`. The all-eval
production score is `0.78`, before the unsatisfied launch and human-approval
gates.

## Changes Accepted

1. Clarified the first-viewport role, value, and path to role-fit proof.
2. Removed unexplained OTI shorthand from the general hiring path.
3. Made CTA labels truthful and shared controls safe at narrow widths.
4. Linked Technical Operations capabilities directly to named project proof.
5. Added a production-only OTI application packet and corrected the current
   FairRentNYC collaboration date across public surfaces.
6. Added Jamie-supplied AI Evals course-completion evidence and a bounded
   synthetic Source-Backed Team Memory example.
7. Added an approved CallNYC public graphic and bounded public-source
   inventories for Harry J. Epstein Company and NYC Artist Coalition surfaces.
8. Reduced repeated public governance layers in case-study presentation.
9. Aligned sitemap and route-specific indexing behavior, preserving `noindex`
   only on the phone-bearing resume PDF.
10. Added and satisfied a blocking Chad-lens eval by placing five linked,
    actor-led approved proofs directly beneath the hero and joining action,
    usable result, consequence, and calibrated shared causality.

## Verification

- Complete production preflight: passed twice on unchanged candidate
- Citation tests: 9 passed
- Portfolio eval schema tests: 9 passed
- Application contract tests: 14 passed
- TypeScript, ESLint, Next.js production build: passed
- Knowledge-bank and public-safety checks: passed with 10 intentional careful-
  claim guardrail warnings
- Production Docker image: `jamieburk-art:evals-g`
- Production container: `55382ebcdb542c65f9dc33b6e453c209651d25df8c7a6eaccb243b529ba86498`
- Canonical route smoke: 14 of 14 passed
- Responsive matrix: 14 routes at 320, 375, 768, and 1280 pixels; 56 of 56
  passed with no overflow, duplicate IDs, broken fragments, or console errors
- Production health, robots, sitemap, HTML resume, and PDF headers: passed
- PR-015 blind panels: baseline median 3; two consecutive final medians of 4

## Visual Evidence

- [Homepage, 1280 pixels](./homepage-1280.png)
- [Homepage, 320 pixels](./homepage-320.png)
- [Technical Operations, 320 pixels](./technical-operations-320.png)
- [Source-Backed Team Memory, 320 pixels](./source-backed-memory-320.png)

No unapproved Harry J. Epstein Company or FairRentNYC screenshots were added.
Their public proof objects are bounded URL inventories until a suitable local
specimen receives explicit approval.
