# Knowledge Lifecycle Hill-Climb - 2026-07-12

## Run

- Evals: `PR-016`, `PR-017`, and `PR-018`
- Frozen rubric commit: `04b84830`
- Evaluated candidate commit: `80f4c266`
- Result: all three criteria scored `4` in two consecutive independent runs
- Public-safety boundary: judges inspected only public repository records,
  public sources, public-safe summaries, governance, generated reports, and
  executable checks

## Criterion

The run required a lossless public-safe intake path, source-associated claim
maturation, explicit research limitations, visible proof backlog, independently
reviewed projections, and reciprocal photo/reader feedback routes that cannot
automatically become claims or public assets.

## Iterations

| Iteration | Scores `016 / 017 / 018` | Decision | Highest-value finding |
| --- | --- | --- | --- |
| Baseline | `4 / 3 / 3` | Revise | Intake worked, but source-strength and reciprocal projection decisions were not yet fully inspectable. |
| 1 | `3 / 4 / 4` | Revise | Three CallNYC corrections lacked reverse intake disposition. |
| 2 | `4 / 3 / 4` | Revise | Waterways source propositions did not yet encode the published route account precisely. |
| 3 | `4 / 3 / 4` | Revise | Held wording compressed attribution boundaries for CallNYC, waterways, and Talks Not Raids. |
| 4 | `3 / 3 / 3` | Revise | Reader feedback could link directly to a claim, and one historical-status sentence exceeded its positive source support. |
| 5 | `4 / 3 / 4` | Revise | Human-readable proof wording dropped first-person source attribution. |
| 6 | `4 / 3 / 4` | Revise | A proof linked Jamie's advocacy too causally to the later CURE outcome. |
| 7 | `4 / 3 / 3` | Revise | Open House needed the source-backed verb `tended`; active projection and public-proof selection rationales were incomplete. |
| 8 | `4 / 4 / 4` | Provisional pass | No material lifecycle, evidence, privacy, or projection defect remained. |
| Confirmation | `4 / 4 / 4` | Stop - threshold met | A second independent judge passed the exact unchanged candidate. |

## Accepted Changes

- Added typed intake records for URLs, artifacts, memories, hypotheses, photo
  leads, corrections, and reader feedback.
- Required stable source, inquiry, claim, or correction disposition for every
  active intake item; governance artifact paths alone are not sufficient.
- Prevented photo leads and reader feedback from linking directly to
  accomplishment claims.
- Added reverse orphan checks for sources and corrections, source-boundary
  conflict checks, and regression tests for high-risk wording.
- Added public sources, mature claims, and bounded inquiries for waterways,
  Open House, NYC Artist Coalition, Cabaret Law repeal, Office of Nightlife,
  Talks Not Raids, Intro 1156, and the later CURE sequence.
- Kept route/duration claims explicitly attributed to Jamie's published
  first-person account and preserved collective credit and noncausality limits.
- Required a compositional rationale for every active or held projection.
- Added generated audits for canonical proof coverage, proof research backlog,
  held mature claims, claim projections, and public proof-surface decisions.
- Demonstrated a concrete claim-to-photo-lead-to-inquiry round trip and a
  reader-feedback-to-governance-inquiry round trip.

## Confirmation

Both independent confirmation scorecards reported:

- `PR-016`: `4`, pass `true`
- `PR-017`: `4`, pass `true`
- `PR-018`: `4`, pass `true`
- confidence: `0.97`
- no silently orphaned intake, source, claim, inquiry, correction, or proof
- no claim stronger than its recorded source posture
- no automatic intake, photo, or reader-feedback path to public projection

## Deterministic Verification

- `npm run knowledge-lifecycle`
- `npm run test:knowledge-lifecycle`
- `npm run report:knowledge-lifecycle`
- `npm run check:citations`
- `npm run test:citations`
- `npm run knowledge-bank`
- `npm run public-safety`
- `npm run check` under the repository's Node 26 runtime
