# CallNYC full-population archival hill climb

Reviewed: 2026-07-14

## Objective

Review every retrievable `@CallNYCApp` record, preserve a public-safe metadata
inventory, develop mission-relevant claims and sources, and require two fresh
holdout passes before treating the candidate as complete.

## Population reconciliation

- Profile counter: 110 posts.
- Posts timeline: 106 primary status records.
- Replies timeline: 107 primary status records.
- Deduplicated union: 107 records, all reviewed.
- Unmaterialized profile-counted records: 3, retained as an open research task.
- Record types: 86 originals, 6 replies, and 15 reposts.
- Row-level `recoveredFrom` values reproduce both timeline denominators.
- Three links nested inside quoted-post cards were excluded from the primary
  record population.

The public fixture stores URLs, timestamps, author handles, record types,
posted-link metadata, analysis classifications, and recovery provenance. It
does not store post text, cookies, or authenticated-session state.

## Developed findings

- 92 records were authored by the institutional account.
- 71 issue-specific recognition records credited 26 distinct Council-member
  handles.
- 75 CallNYC deep-link occurrences represent 62 distinct service or API paths
  across 16 service domains plus the API.
- 94 records contain external links; the fixture inventories 98 link
  occurrences and 84 distinct short URLs.
- The bounded incoming search contains 11 classified stakeholder records.
- Eight historical Council Member accounts have authored, source-level public
  engagement records. The May 2016 `@CarlinaRivera` repost is not counted
  because Rivera was not serving as a Council Member at publication.
- Visible interaction totals remain dated research context, not reach,
  endorsement, adoption, conversion, or service-impact claims.

The aggregate fixture is publicly auditable at immutable commit
`ff2a8a555bc91c05b75551aa59bd488133af74e7`.

## Hill-climb history

1. The first pass recovered the complete retrievable union and identified the
   service-path, URL, source, and stakeholder patterns.
2. An independent judge found a mixed-case API URL omitted by the first
   normalization pass. The count was corrected from 74 to 75 and classifications
   were moved to record level.
3. A second judge found the generated public citation registry stale. The
   registry was regenerated and the aggregate source was added directly to the
   public occurrence.
4. A further holdout required row-level Posts/Replies provenance, explicit
   treatment of the Carlina Rivera record, and a stable public source. Those
   requirements produced the final fixture contract and immutable permalink.

## Final result

Candidate fingerprint:
`3d93888c5f3d1dd5e15fc697946d1677977041b78a8b707dbe90b4d828123db0`

Two fresh independent holdouts each scored `KD-006` and `KD-012` at `4/4`.
Both required exact fingerprint alignment and recomputed the population,
publishing pattern, URL inventory, stakeholder classification, Council union,
public claim resolution, and attribution boundaries. The lifecycle evaluator
then passed all 13 criteria at weighted score `1.0` in two consecutive runs.

Artifacts:

- `callnyc-full-population-final-holdout-5-judge.json`
- `callnyc-full-population-final-holdout-5-run.json`
- `callnyc-full-population-final-holdout-6-judge.json`
- `callnyc-full-population-final-holdout-6-run.json`
