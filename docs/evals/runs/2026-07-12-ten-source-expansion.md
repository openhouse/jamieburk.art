# Ten-Source Portfolio Expansion Hill-Climb - 2026-07-12

## Run

- Evals: `PR-001` through `PR-005` and `PR-015` through `PR-018`
- Candidate: `feature/evals-N` working tree before final commit
- Result: two consecutive independent unchanged-candidate confirmations scored
  `PR-005`, `PR-015`, and `PR-016` through `PR-018` at `4/4`
- Public-safety boundary: only public URLs, public records, public-safe typed
  records, site copy, and repository governance were reviewed

## Ten New Sources

1. Greene Hill Food Co-op profile of Sunday Dinner, WOWList, and NYC Artist
   Coalition work.
2. KCUR reporting on Jamie's 8th Street Tunnel public-history program.
3. The Pitch's 2009 follow-up reporting the raft crew's Gulf terminus.
4. Save NYC Spaces public campaign record.
5. New York City Council's 2018 Small Business hearing transcript.
6. KCMO's 2019 KC Town-Hall proposal and board record.
7. KCMO's Round Two recommended-project presentation.
8. Michael Rees's collaborator-authored Claudette project page.
9. sbdiy's public WOWList calendar and add-event links.
10. KCMO's 2021 board minutes identifying Jamie with KC Town Hall.

## Iterations

| Iteration | Decision | Highest-value finding |
| --- | --- | --- |
| Baseline | Revise | New sources were not yet represented as typed intake, claims, or website citations. |
| 1 | Revise | Three new sources strengthened claims but had not returned to their linked research inquiries. |
| 2 | Revise | Greene Hill's title and body used inconsistent co-host naming, and Claudette was missing from one project-specific projection. |
| 3 | Revise | Human-readable project dossiers still retained stale waterways wording and omitted new NYCAC evidence. |
| 4 | Revise | A held Claudette projection compressed collaborator credit, and Greene Hill's NYCAC evidence was described as inquiry context without a reciprocal link. |
| 5 | Pass | All source, intake, claim, inquiry, projection, credit, and public-safety relationships were consistent. |
| Confirmation | Pass | A second independent judge passed the unchanged candidate at `4/4` on every affected blocking and lifecycle eval. |

## Website Projection

- WOWList now cites two public examples of community-event use.
- Sunday Dinner now cites a 2017 profile documenting weekly community-open
  hosting without using it to prove larger aggregate counts.
- FairRentNYC now cites Jamie's Save NYC Spaces public voice and 2018 Council
  testimony; its narrative was compressed by 126 words.
- KC Town Hall now cites Jamie's presenter role, the unanimous `$490,539`
  recommendation, and continued 2021 project identification.
- Tunnel, raft, and Claudette records remain mature public-safe depth held from
  the current hiring-site composition.

## Confirmation Scores

| Eval | Pass 1 | Pass 2 |
| --- | ---: | ---: |
| `PR-005` | 4 | 4 |
| `PR-015` | 4 | 4 |
| `PR-016` | 4 | 4 |
| `PR-017` | 4 | 4 |
| `PR-018` | 4 | 4 |

The broader holdout found no patch regression in `PR-001` through `PR-004`.
Pre-existing artifact-depth work under nonblocking `PR-002` remains visible and
was not worsened by this pass.

## Verification

- `npm run check`
- `npm run preflight:staging`
- `npm run preflight:production`
- `npm run knowledge-lifecycle`
- `npm run test:knowledge-lifecycle`
- `npm run check:citations`
- `npm run test:citations`
- `npm run knowledge-bank`
- `npm run public-safety`
- production-mode browser QA on four changed routes at `320` and `1280` pixels:
  status `200`, no overflow, no console errors, and complete citation/backlink
  semantics
