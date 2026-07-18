# Feature evals A recursive run

## Candidate

- Base: `origin/develop` at `2ec37fe6e47d11e600ede204d19a98f7d3cff139`
- Branch: `feature/evals-A`
- Protocol source: `evals/launch-readiness/evals.json`
- Public environment: production-configured local Docker candidate

## Iteration 0

The deterministic suite passed before the bounded content change. Browser QA
covered 45 route and viewport combinations across 9 canonical routes at 320,
375, 768, 1024, and 1440 pixels. It found one H1 per route, no horizontal or
heading overflow, production canonical/index metadata, and no console errors.

| Criterion | Score | Public observation |
| --- | ---: | --- |
| Role legibility | 5 | The homepage names the target role and routes directly to technical operations, work, resume, and contact. |
| Evidence and epistemic care | 4 | CallNYC carries claim-level citations and visible archive boundaries. |
| Emerging-work framing | 5 | Primary framing describes emerging work as normal material for implementation, not a team deficiency. |
| Reader burden and hierarchy | 3 | The main paths are clear, though several proof pages remain text-heavy. |
| Collective credit and protected boundaries | 5 | Collective work, private records, and unavailable artifacts remain explicitly bounded. |
| Visual proof and credibility | 3 | The visual system is coherent, but key case studies ask the reader to accept mostly textual descriptions. |
| Operational credibility | 5 | Requirements, workflows, implementation, handoff, and release governance are tied to specific cases. |

Deterministic weighted score: **4.3 / 5**. All criterion floors passed.

## Bounded hypothesis

**Lowest criterion:** Visual proof and credibility, tied with reader burden at 3.

**Hypothesis:** Adding one already-public, cleared CallNYC project artifact will
raise visual proof from 3 to 4 without weakening evidence, collective credit,
privacy, accessibility, or reader hierarchy.

The Council hackathon promotional graphic was rejected for display because its
knowledge record remains `metadata-only`. The selected CallNYC project mark is
preserved in Jamie's public source repository, contains no participant data,
and is shown with a direct source link and an explicit non-affiliation boundary.

## Iteration 1

The change adds:

- one locally served CallNYC project mark;
- a public-safe source and claim record;
- a generated citation and source note;
- a responsive semantic figure with useful alt text;
- a source link and visible non-affiliation boundary;
- a deterministic eval invariant protecting the artifact and boundary.

## Verification

- `npm run check`: passed.
- `npm run preflight:staging`: passed with staging noindex configuration.
- `npm run preflight:production`: passed with explicit production index
  configuration.
- `npm audit --omit=dev --audit-level=high`: passed; npm reported two residual
  moderate PostCSS advisories inside Next.js and no high or critical advisory.
- Production Docker build: passed as `jamieburk-art:evals-A-iter1`.
- Container health, production robots, sitemap, and project-mark asset: passed.
- Browser QA: passed for 9 routes across 5 viewports with no H1 overflow,
  horizontal overflow, console errors, broken artifact pixels, or missing
  citation and focus semantics.
- Project-mark SHA-256:
  `8d9608537a6dd9d5accf9cac0a17201d5924b4bc8ab945594b59e1fe23e1bc7f`.

The first local build attempt exposed an omitted macOS Lightning CSS optional
package. Installing the exact lockfile-pinned native package repaired the local
environment without changing repository metadata. The complete checks then
passed, and Docker independently passed its own clean `npm ci` build path.

## Fresh-judge results

Two fresh judge contexts independently returned the same complete scorecard:

| Criterion | Iteration 0 | Judge A | Judge B |
| --- | ---: | ---: | ---: |
| Role legibility | 5 | 5 | 5 |
| Evidence and epistemic care | 4 | 4 | 4 |
| Emerging-work framing | 5 | 5 | 5 |
| Reader burden and hierarchy | 3 | 3 | 3 |
| Collective credit and protected boundaries | 5 | 5 | 5 |
| Visual proof and credibility | 3 | 4 | 4 |
| Operational credibility | 5 | 5 | 5 |

The deterministic scorer accepted both runs at **4.4 / 5**, with no missing
scores, no below-minimum criteria, and no regressions. The iteration improves
the weighted objective by `0.1` and meets the two-consecutive-fresh-judge stop
condition.

## Decision

**Accept iteration 1.** The artifact makes one project more inspectable without
exposing participants, borrowing an uncleared graphic, weakening the unofficial
status, or adding a new visual theme.

The next recursive pass should address the now-lowest criterion: reader burden.
Both judges recommend consolidating repeated post-Sources project-governance
material on the CallNYC mobile page while retaining every unique source,
boundary, public link, and protected status.
