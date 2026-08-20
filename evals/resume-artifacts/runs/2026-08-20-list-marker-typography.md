# Resume list-marker typography — 2026-08-20

## Scope

Five governed resume artifacts and the byte-identical public projection were
reviewed. Resume prose, ordering, page geometry, hyperlinks, and embedded font
families remained unchanged. A deterministic post-export pass reduced only the
list-label text operator in each tagged PDF list item.

## Acceptance contract

- Associated item text retains its established size.
- Every bullet or numeral renders exactly one point smaller than that text.
- Tagged `/LI` structure remains present and machine-readable.
- Palatino Linotype, Oswald, and Karla remain embedded.
- Each PDF remains tagged, unencrypted, two-page US Letter with active intended
  links and no syntax or stream-encoding errors.

## Observed coverage

| Artifact | Pages inspected | List items verified |
| --- | ---: | ---: |
| ACLU Learning & Project Solutions | 1–2 | 13 |
| ACLU National Campaigns | 1–2 | 12 |
| Benepass Product Operations | 1–2 | 14 |
| NYC OTI Senior Product Manager 782366 | 1–2 | 16 |
| Active-opportunity portfolio | 1–2 | 18 |

The public site PDF is byte-identical to the active-opportunity portfolio PDF.

## Visual inspection

All ten exported pages were rendered at 144 DPI and inspected together and at
full-page scale. No clipping, overlap, broken glyph, stranded heading, malformed
link styling, spacing shift, or pagination change was observed. The smaller
markers remain clearly visible while placing appropriate emphasis on the item
text.

## Deterministic verification

- `npm run evals:public-language`
- `npm run evals:resume-artifacts`
- `npm run test:resume-artifacts`
- `qpdf --check` on each of the five governed PDFs

The artifact evaluator reads the exported PDF content streams, measures the
first list-label font operator against the first associated text font operator,
accounts for the active content transform, and fails outside a 0.05-point
tolerance from the required one-point difference.
