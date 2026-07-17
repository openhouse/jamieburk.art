# feature/evals-J - Knowledge Bank Iteration 01

## Frozen inputs

- Rubric commit: `2216610afa01637ef81d95c1a69112cc2acdc090`
- Candidate before: `2216610afa01637ef81d95c1a69112cc2acdc090`
- Candidate after: `ed0a8098d4c6d2c8399b357d3a5af082e87ebf0b`
- Target: `claim-development`
- Selected criterion: `KB-002 - Source decomposition and epistemic fit`
- Judge: fresh, read-only Codex sessions with no optimization history

## Scope

- `INTAKE-WATERWAYS-PARTICIPATORY-PRACTICE-2026-07-12`
- `INTAKE-NYCA-CULTURAL-SPACE-POLICY-2026-07-12`
- `INTAKE-CALLNYC-COUNCIL-ENGAGEMENT-2026-07-12`

## Evidence before

The baseline passed safety, maturity, and compositional-range checks but stored
compound candidate claims above intake-level source lists. Several Waterways and
NYCA sentences combined documented actions with formation, collaborator,
campaign-output, route, and policy-outcome propositions that the associated
sources did not all establish.

- Weighted score: `0.6425`
- Failed blockers: `KB-002`, `KB-003`, `KB-009`, `KB-010`
- Decision: `revise`

## Change

- Added a typed proposition layer with source IDs, specific source support,
  boundaries, decision use, and required next steps.
- Split Shop Shows, Open House, the raft expedition, and Great Accommodations
  into separate propositions.
- Distinguished Jamie's conception of the raft project from the group's travel.
- Credited Jamie's housemates and Suzanne Hogan in the supported content.
- Limited current NYCA candidates to Gothamist-supported fire-code study groups,
  City Hall advocacy, coalition affiliation, and public-safety analysis.
- Preserved coalition formation, town halls, campaign systems, Office of
  Nightlife, Talks Not Raids, MARCH, and broader policy outcomes as memory or
  research propositions with explicit next steps.
- Kept CallNYC engagement as a memory and metric-definition research lead.

## Evidence after

- Weighted score: `0.7925`
- `KB-002`: `2 -> 3`, pass
- `KB-003`: `2 -> 4`, pass
- `KB-004`: `2 -> 3`, pass
- `KB-005`: `2 -> 3`, pass
- `KB-007`: `2 -> 3`, pass
- `KB-009`: unchanged at `2`, fail
- `KB-010`: `2 -> 1`, fail because the judged candidate contained no committed
  knowledge-development run artifact

Deterministic citation, privacy, proposition-source, maturity, and projection
checks passed. No public website surface or generated citation changed.

## Regressions

- No claim, privacy, projection, route, build, or website regression observed.
- Process score decreased because the framework was now being judged as an
  executed run rather than only as a design. This is accepted as an honest
  measurement, not a content regression.

## Decision

`accept`

The selected content criterion improved materially and no substantive blocker
regressed. The next iteration is `KB-010`: commit the actual run evidence before
continuing to the remaining contradiction-and-correction blocker.
