# feature/evals-J - Kansas City Star Waterways Stop Record

## Frozen Inputs

- Rubric commit: `2216610afa01637ef81d95c1a69112cc2acdc090`
- Frozen content candidate: `0b6b64466699bc3d9b8897c695dcac692f79b8a2`
- Target: `claim-development`
- Stop decision: `stop_threshold_met`

## Independent Judgments

| Pass | Judge session | Weighted score | Result |
| --- | --- | ---: | --- |
| Baseline | `019f6cdd-9de5-7aa1-9e1b-5fd365ec3fcc` | `0.9325` | Substantive criteria passed; exact-candidate process evidence absent |
| Certification 1 | `019f6ce3-d9e9-7450-8826-fb1ed9d62485` | `0.955` | Pass; consecutive passing runs `1` |
| Certification 2 | `019f6ce9-0d5b-7a22-88b2-4f90d67663df` | `0.955` | Pass; consecutive passing runs `2` |

The frozen scorer reports certification 2 as eligible with no errors or
blockers. `KB-001` through `KB-010` pass in both certification judgments.

## Certified Knowledge

- The November 15, 2007 Kansas City Star front page and A4 continuation
  independently document *Release Yourself onto the Water until it Tastes of
  Salt*.
- The source attributes the initiating idea to Jamie while naming Libby Hendon
  and Laura Mattingly as the other core crew members.
- It documents a July 21 departure from Kansas City's West Bottoms, a roughly
  12-by-13-foot reclaimed-material raft with bicycle-paddlewheel propulsion,
  progress south of Baton Rouge, and passage beyond the 1,000-mile marker.
- It reports a 51-day interruption near Vicksburg and a crew-and-community-
  supported return involving local hospitality, legal help, temporary work,
  vessel retrieval, repairs, and navigation equipment.
- Jamie's river-as-connective-cultural-space interpretation is preserved as an
  attributed artistic and civic proposition, not a measured impact claim.

## Boundaries

- Do not claim Gulf arrival or an exact endpoint.
- Do not assign Jamie sole credit for construction, travel, logistics,
  documentation, public engagement, safety work, or recovery.
- Keep the newspaper PDF, full article text, photographs, local path, and
  reporter contact details outside the repository.
- Do not treat historical reporting as current river-travel guidance.
- Keep the claim in the governed knowledge bank unless a later editorial
  decision approves a specific website projection.

## Regression Audit

- The rubric blob is unchanged from rubric commit through certification.
- The knowledge content remained unchanged after the frozen candidate.
- All post-candidate changes are evaluation records under `docs/evals/runs/`.
- Complete `npm run check` passed twice on the frozen content candidate under
  Node 26.5.0.
- The public citation registry contains neither the metadata-only source nor
  the intake item, protected locator, source filename, or private path.
- No website route, copy, visual asset, résumé line, or public artifact gallery
  changed.

## Remaining Opportunities

These do not block the certified claim-development target:

- recover independent endpoint evidence;
- invite Libby Hendon and Laura Mattingly to clarify or correct roles;
- inventory surviving artifacts with rights metadata;
- convert the broad lineage question into ranked source-fact-decision tests;
  and
- add structured correction triggers before a future stronger projection.

## Decision

`stop_threshold_met`

The exact candidate has two consecutive independent passing judgments against
the frozen rubric. Preserve it for review and merge.
