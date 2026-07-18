# NYC Artist Coalition Campaign Press Ingestion Hill-Climb - 2026-07-13

## Run

- Evals: `PR-005`, `PR-015`, `PR-016`, `PR-017`, and `PR-018`, with
  non-regression review for `PR-001` through `PR-004`
- Candidate: `feature/evals-N` working tree before final commit
- Result: two consecutive independent unchanged-candidate confirmations scored
  every affected eval `4/4`
- Public-safety boundary: only public campaign pages, public article metadata,
  dated Wayback captures, and public-safe repository records were reviewed

## Corpus

| Campaign | Placements |
| --- | ---: |
| Let NYC Dance | 21 |
| Talks Not Raids | 7 |
| Save NYC Spaces | 8 |
| Fair Rent NYC | 9 |
| **Total** | **45** |

The placements resolve to 44 unique articles. NPR Music's Cabaret Law report
appears in both Let NYC Dance and Save NYC Spaces and remains one source with
two explicitly retained placements.

This pass added 41 article source records and four separate archived campaign
index records. Three previously reviewed article records were reused. Every
unique article and every index record has a timestamped Wayback locator. The
capture-derived fixture records exact listed URLs, source-page order, normalized
source IDs, capture metadata, and duplicate disposition.

## Iterations

| Iteration | Decision | Highest-value finding |
| --- | --- | --- |
| Baseline | Revise | The four campaign Press sections were not represented as a complete, typed, deduplicated corpus. |
| 1 | Revise | A dossier sentence exceeded the evidence for four-site authorship, and three live campaign indexes lacked immutable count evidence. |
| 2 | Revise | Unread article records still carried campaign-wide subject propositions, and the repository could not reconstruct the source-page inventories offline. |
| 3 | Revise | The new fixture preserved source-page order, but two typed manifests and the dossier used a different presentation order; Set equality hid the mismatch. |
| 4 | Revise | Archive metadata on an already cited Save NYC Spaces source would add a reader-facing secondary link, making the prior blind-reader baseline inexact. |
| 5 | Pass | Separate archived index records preserved immutable count evidence while the public registry and reader-facing portfolio remained unchanged. |
| Confirmation 1 | Pass | Independent reconstruction and all affected evals scored `4/4` on the unchanged candidate. |
| Confirmation 2 | Pass | A second independent judge repeated the reconstruction and scored all affected evals `4/4`. |

## Accepted Design

- Capture placement, article source, research inquiry, aggregate claim, and
  website projection remain separate objects.
- Unreviewed articles establish only that a captured Press section listed them.
- The 45-placement / 44-article aggregate uses only four archived campaign
  indexes as evidence.
- The aggregate is confirmed with boundaries but held from all public surfaces.
- Article-level role, collaborator, chronology, quotation, and outcome claims
  remain under `INQ-NYCAC-CAMPAIGN-PRESS-CORPUS` until close reading.
- The complete research dossier stays in the knowledge bank; the hiring site
  does not inherit the full corpus by default.

## Confirmation Scores

| Eval | Confirmation 1 | Confirmation 2 |
| --- | ---: | ---: |
| `PR-005` | 4 | 4 |
| `PR-015` | 4 | 4 |
| `PR-016` | 4 | 4 |
| `PR-017` | 4 | 4 |
| `PR-018` | 4 | 4 |

The holdouts observed no repair regression in `PR-001` through `PR-004`. The
public citation registry remained byte-identical to the evaluated HEAD, and no
page, component, public content, proof selection, work metadata, or public asset
changed.

## Verification

- `npm run check`
- `npm run preflight:staging`
- `npm run preflight:production`
- `npm run knowledge-lifecycle`
- `npm run test:knowledge-lifecycle`
- `npm run check:citations`
- `npm run test:citations`
- `npm run evals:portfolio`
- `npm run test:portfolio-evals`
- `npm run knowledge-bank`
- `npm run public-safety`
- `git diff --check`
