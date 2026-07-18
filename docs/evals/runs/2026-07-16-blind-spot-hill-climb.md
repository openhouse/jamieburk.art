# Blind-Spot Eval Hill-Climb - 2026-07-16

## Run

- Evals: `PR-019` through `PR-025`
- Rubric SHA-256: `434917bbdf1ca5455591bd7b83970376b8fd03ccc19aeeab433f2e87e4ec69c4`
- Candidate basis: working tree based on `03a38be5`; exact review SHA must be
  recorded after commit and before either human-only gate can pass
- Public-safety boundary: judges received only the frozen rubric, public
  candidate files, public registry, and public-safe eval evidence
- Decision: `stop_human_blocked`

## Iterations

| Eval | Baseline | Current | Decision | Highest-value result or remaining condition |
| --- | ---: | ---: | --- | --- |
| `PR-019` observed hiring-reader response | `0` | `1` | `stop_human_blocked` | Exact protocol, scorecards, and outcome ledger are ready; three independent target readers have not reviewed the exact commit. |
| `PR-020` flagship civic composition | `1` | `4` | Accept | Dedicated NYC Artist Coalition composition connects participation, identity, safety, testimony, campaigns, and bounded public outcomes. |
| `PR-021` collaborator corroboration | `1` | `3` | Accept | Every priority gap now has source class, owner, fallback path, outreach state, retention consent, quote permission, and a conservative projection rule. Actual replies remain open evidence. |
| `PR-022` output / use / outcome / transfer | `2` | `3` | Accept | A cross-project matrix separates each proposition; HJE and Sunday Dinner metrics now state their approved-history basis and independent-support limits. |
| `PR-023` visual and artifact proof | `1` | `3` | Accept | Three lead pages now carry semantic, source-backed figures with provenance and explicit limits; unapproved photographs and screenshots remain withheld. |
| `PR-024` recent capability | `2` | `4` | Accept | Technical Operations now exposes three bounded 2026 signals and distinguishes developing methods, proposals, and coursework from deployed products. |
| `PR-025` hands-on launch QA | `0` | `1` | `stop_human_blocked` | Route, device, keyboard, screen-reader, PDF, metadata, and trusted-reader protocols are ready; qualified human review and Jamie approval remain outstanding. |

Scores use the suite's `0-4` scale. A prepared protocol is not evidence that a
human activity occurred.

## Blind Judge Results

### Panel 1

The first read-only judge received no patch intent or optimization history.

| Eval | Score | Pass | Confidence | Finding |
| --- | ---: | --- | ---: | --- |
| `PR-020` | `4` | yes | `0.94` | Jamie's role, concrete actions, practical end, citations, and collective-credit boundaries form one coherent civic story. |
| `PR-021` | `2` | no | `0.98` | The first matrix lacked explicit owners, fallback sources, consent states, and quotation states. |
| `PR-022` | `3` | yes | `0.94` | The distinctions held, but Sunday Dinner aggregate provenance needed to be explicit and HJE independent support remains open. |
| `PR-023` | `3` | yes | `0.89` | Three semantic figures reduce prose burden without publishing rights-unclear media. |
| `PR-024` | `4` | yes | `0.93` | The role-fit path makes current technical, public-data, documentation, and human-reviewed AI practice legible. |

The judge accurately separated Jamie's work, coalition work, legislative and
agency action, and longer movement history. It also explained what each figure
proved and did not prove before relying on surrounding prose.

### Remediation And Confirmation

The corroboration matrix gained per-claim ownership, fallback sources, source
classes, outreach state, retention consent, quotation permission, and explicit
nonresponse handling. Sunday Dinner and HJE outcome language now distinguishes
approved first-person or project-history framing from independent support.

A second read-only judge then scored `PR-021` and `PR-022` at `3`, passing both
with high confidence. Its remaining gaps are evidence-development work, not
composition defects: no independent business record was added for HJE's 2x
contribution claim, and no collaborator response was invented.

## Browser Evidence

- NYC Artist Coalition rendered at `1512x857`, `375x812`, and `320x568` with
  no horizontal overflow. The 320-pixel scan found no overflowing descendant.
- The page rendered one H1, four timeline steps, 26 inline source-note links,
  and the expected collective-causality limit.
- Technical Operations rendered at `375x812` with all three 2026 current-practice
  signals and no horizontal overflow.
- The homepage rendered at `1512x857` with NYC Artist Coalition on the quick
  path and no horizontal overflow.
- A clean Webpack browser session reported no console errors. A preliminary
  Turbopack dev session exposed a missing optional local Lightning CSS native
  module; the production build uses the repo's verified build path and is
  checked separately.

These automated and agent-observed results support `PR-020`, `PR-023`, and
`PR-024`. They do not satisfy `PR-025`.

## Human Gates

`PR-019` and `PR-025` remain `pending-human-review` in
`docs/evals/blind-spot-human-status.json`. They require an exact 40-character
candidate SHA, dated independent reviewers, recorded issue dispositions, and
the approvals defined in their frozen rubrics. The validator rejects any
attempt to mark them passed with only agent or automated evidence.

## Deterministic Verification

- `npm run evals:portfolio`
- `npm run check:blind-spot-evidence`
- `npm run test:portfolio-evals`
- `npm run test:blind-spot-evidence`
- `npm run knowledge-lifecycle`
- `npm run check:citations`
- `npm run test:citations`
- `npm run check`
- `npm run preflight:staging`
- `npm run preflight:production`

The complete commands are rerun on the final working tree before publication.
