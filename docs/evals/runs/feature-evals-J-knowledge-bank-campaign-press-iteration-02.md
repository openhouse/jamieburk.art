# feature/evals-J - Campaign Press Iteration 02

## Frozen inputs

- Rubric commit: `2216610afa01637ef81d95c1a69112cc2acdc090`
- Candidate before: `e6e44f56cdfd9817ad7ee0f6921b1a600aee2653`
- Content candidate after: `55392ce53af5716715730c8912e3d84a0367e31e`
- Target: `claim-development`
- Selected criterion: `KB-009 - uncertainty, contradiction, and correction readiness`
- Successful judge session: `019f5e52-6a36-7211-abf8-4e88638072d1`

## Scope

- `INTAKE-WATERWAYS-PARTICIPATORY-PRACTICE-2026-07-12`
- `INTAKE-SUNDAY-DINNER-COMMUNITY-HOSTING-2026-07-13`
- `INTAKE-NYCA-CULTURAL-SPACE-POLICY-2026-07-12`
- `INTAKE-NYCA-CAMPAIGN-PRESS-CORPUS-2026-07-13`
- `INTAKE-CALLNYC-COUNCIL-ENGAGEMENT-2026-07-12`

## Evidence before

The structured source records preserved two obsolete Gothamist URLs even though
their current publisher locations had been recovered. A New York Times access
restriction was recorded only in the human-readable index, leaving the
structured record's access state less specific than the research trail.

- Weighted score: `0.85`
- `KB-009`: `3`, pass with an identified source-state opportunity
- All blocking criteria: `3` or above

## Change

Normalized the two Gothamist records to their current publisher URLs, added the
New York Times access restriction to structured source metadata, synchronized
the human-readable index, and added regression tests for both corrections.

## Evidence after

- Weighted score: `0.85`
- `KB-009`: `3`, pass with the selected source-state defect corrected
- All blocking and nonblocking criteria: `3` or above
- `npm run check:citations`, `npm run test:citations`, `npm run
  evals:knowledge-bank`, `npm run test:knowledge-bank-evals`, `npm run
  knowledge-bank`, and `npm run public-safety`: pass in the fresh judge
- No public route, page copy, work data, governed proof, or generated registry
  changed

## Regressions

- No privacy, provenance, credit, chronology, projection, registry, or website
  regression was observed.
- The judge identified a nonblocking refinement: record the campaign-listed and
  current Gothamist headlines as explicit aliases if a later close-reading pass
  needs title-history precision.

## Decision

`accept`

The selected criterion meets the frozen rubric. The exact content candidate now
requires two fresh, consecutive independent judgments without further content
changes.
