# Margaret Morse And Warren Sack Lens Hill-Climb - 2026-07-16

## Run

- Evals: `PR-026` and `PR-027`
- Candidate basis: working tree based on `0308b97a`; the final commit is recorded
  in pull request 214
- Public-safety boundary: judges received public candidate files, public-safe
  source summaries, the frozen rubrics, and generated registry evidence; the
  private narrative evaluations, student record details, and recommendation
  screenshot were not projected
- Overall decision: `stop_human_blocked` only because `PR-019` and `PR-025`
  still require exact-SHA human evidence

## Iterations

| Eval | Baseline | Current | Decision | Highest-value result |
| --- | ---: | ---: | --- | --- |
| `PR-026` Margaret Morse lens | `3` | `4` | Accept | The About page now preserves a legible threshold where artistic, civic, technical, and social practice remain connected through hospitality, atmosphere, place, shared authorship, and attention. |
| `PR-027` Warren Sack lens | `2` | `4` | Accept | The About page now exposes a source-backed observe-model-build-use-revise method across Open House, CallNYC, and NYC Artist Coalition. |

Scores use the suite's `0-4` scale. The first pass established a true artistic
throughline but left the Morse criteria too implicit and did not expose a
complete three-project recursive map. The hill climb added those missing
relations without turning historical faculty evaluations into present-day
endorsements.

## Blind Judge Results

Three independent read-only judges evaluated the repaired candidate. Each
scored both evals at `4`, and no judge reported a critical issue.

| Panel | `PR-026` | `PR-027` | Result |
| --- | ---: | ---: | --- |
| Judge 1 | `4` | `4` | Accept / Accept |
| Judge 2 | `4` | `4` | Accept / Accept |
| Judge 3 | `4` | `4` | Accept / Accept |

All three panels audited privacy, historical-endorsement drift, prototype versus
production status, originality, causality, and collective credit. Each could
trace the full recursive sequence in Open House, CallNYC, and NYC Artist
Coalition from the public page and its source notes.

## Browser Evidence

- Playwright rendered `/about` at `1440x1000`, `390x844`, and `320x568`.
- Every viewport returned `200`, rendered one H1, the recursive-method heading,
  all three project rows, and five source notes.
- No viewport had horizontal overflow or console errors.
- Full-page desktop, mobile, and narrow screenshots were inspected locally;
  type, hierarchy, citations, project rows, source boundaries, calls to action,
  and footer all remained legible. The visible circular `N` in local screenshots
  is the Next.js development indicator and is not part of the production UI.
- A broader Playwright pass covered 11 application routes at desktop, mobile,
  and a 200%-reflow-equivalent viewport. All returned `200`; all had one legible
  H1 and no horizontal overflow.
- The broader pass also confirmed 23 of 23 traversed controls exposed visible
  focus outlines, CallNYC and FairRentNYC citation links remained local and
  accessible, metadata was present, and the resume PDF returned `200`.

These automated and agent-observed results do not satisfy the human-only
`PR-025` launch gate.

## Public-Safety Result

The public registry includes only bounded summaries and claims. Protected
source locators refer to the private UCSC records without publishing their raw
text, student identifier, grades, private correspondence, or screenshots. The
public page relies on the published Open House article and already governed
project evidence for its visible claims.

## Deterministic Verification

- `npm run generate:citations`
- `npm run evals:portfolio`
- `npm run test:portfolio-evals`
- `npm run knowledge-lifecycle`
- `npm run test:knowledge-lifecycle`
- `npm run test:citations`
- `npm run check`
- `npm run preflight:staging`
- `npm run preflight:production`
- `git diff --check`

The complete commands are rerun on the final working tree before publication.
