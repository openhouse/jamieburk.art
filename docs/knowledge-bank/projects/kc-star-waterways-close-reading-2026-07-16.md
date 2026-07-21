# Kansas City Star Waterways Close Reading - July 16, 2026

## Purpose

This production pass encoded a supplied two-page Kansas City Star clipping into
the public-safe knowledge bank, strengthened the governed waterways claim, added
deterministic protections against overstatement and disclosure, ran the complete
evaluation system, and updated draft pull request #223.

The clipping itself is copyrighted and remains outside the repository. This note
contains citation metadata and bounded paraphrases only. It does not expose the
local source path, the scan, or extracted article text.

## Source reviewed

- Darryl Levings, "In the Name of Art, Go With the Flow," The Kansas City Star,
  November 15, 2007, pp. A1, A4.
- The source record remains `protected` with an opaque locator and no public URL.
- Both pages were rendered and visually inspected so the front-page article,
  continuation, captions, and multi-column chronology could be read in context.
- A text extraction was used as a navigation aid, not as a substitute for visual
  review or as content to republish.

## What the close reading establishes

The source supports these bounded propositions:

1. **Origin and departure.** The article attributes the initiating idea to Jamie
   and reports a July 21 departure from Kansas City's West Bottoms with several
   friends aboard.
2. **Collective construction and operation.** It describes a roughly 12-by-13-foot
   raft built in three weeks from salvaged building material, civic refuse, and
   industrial syrup drums. Two bicycles drove a paddlewheel; the crew mainly
   floated and pedaled to avoid hazards.
3. **Interruption and adaptive recovery.** It reports a 51-day interruption after
   a Coast Guard stop near Vicksburg and a recovery network involving local food
   and shelter, free legal help, temporary work, raft retrieval, repairs,
   navigation equipment, and a legal return to the river.
4. **Participatory purpose.** It presents the project as a lived river experience,
   reports friends joining for route segments, and documents Jamie inviting people
   encountered en route to participate while seeking connection between Kansas
   City's West Bottoms and Delta communities.
5. **Route boundary.** It places the continuing three-person crew south of Baton
   Rouge on November 15 after more than 1,000 miles. At that moment, the precise
   salt-water point remained ahead, and the crew did not expect to reach the Gulf
   itself on the raft.

## What the source does not establish

The clipping does not establish:

- the expedition's exact later terminus or final distance;
- arrival at the Gulf on the raft;
- sole operation, construction, or expedition credit for Jamie;
- a complete builder, rider, host, donor, legal, or support roster;
- measured participant or community outcomes;
- blanket Coast Guard approval of the original design or entire expedition;
- permission to republish the scan or article body.

The broader bank still preserves a conflict between contemporary reports that
date the Coast Guard stop to September 15 and September 18. No date was averaged
or silently selected.

## Knowledge-bank changes

### Intake lifecycle

The existing `INTAKE-WATERWAYS-RAFT-ICLOUD-DELTA-2026` record now links eight
observations across four recovered sources. Its publication boundary now excludes
the article body as well as the scan and private archive paths.

### New atomic observations

Four observations were added:

- `OBS-WATERWAYS-RAFT-KCSTAR-ORIGIN-AND-DEPARTURE`
- `OBS-WATERWAYS-RAFT-KCSTAR-FIELD-OPERATION`
- `OBS-WATERWAYS-RAFT-KCSTAR-RECOVERY-NETWORK`
- `OBS-WATERWAYS-RAFT-KCSTAR-PARTICIPATORY-PURPOSE`

Each observation includes a page-column locator, status, claim or inquiry link,
public-safety flag, and a proposition-specific limitation. The existing
`OBS-WATERWAYS-RAFT-ROUTE-BOUNDARY` remains the fifth clipping-derived observation.

### Source record

`SRC-WATERWAYS-KC-STAR-2007-11-15` was updated with:

- page-level citation metadata;
- a July 16 close-reading date;
- a description of the two-page review;
- 15 explicit support propositions;
- eight explicit non-establishment boundaries;
- continued protected visibility, private preservation status, opaque location,
  and no canonical or archive URL.

### Governed claim

`CLM-WATERWAYS-RAFT-EXPEDITION` now records the 51-day interruption and the
community, legal, and material support that enabled recovery. The clipping's
evidence relationship expanded from five to eleven source-scoped propositions.

The claim still:

- treats more than 1,100 miles as a documented checkpoint rather than a final
  distance;
- credits Libby Hendon, Laura Mattingly, other builders and riders, and route
  communities;
- rejects sole-completion and exact-Gulf claims;
- describes Coast Guard approval only after specific modifications;
- remains held with no public website surfaces.

### Research inquiry

`INQ-WATERWAYS-RAFT-TERMINUS` now records the page-rendering method, construction
and operating details, recovery network, and participatory purpose. It retains the
unresolved terminus, date conflict, incomplete collaborator roster, and source-
rights boundary.

### Archive-production note

The July 15 iCloud Teams archive report gained a July 16 close-reading section and
now names the 51-day interruption and recovery as part of the project's defensible
professional interpretation.

## Evaluation changes

The iCloud Teams archive evaluator grew from 11 to 14 criteria. It now requires:

- all eight governed raft observations and all five clipping-derived observations;
- page-level citation metadata and the July 16 close-reading date;
- a protected source with no public URL;
- locators, limitations, public-safety status, and claim linkage for every
  clipping-derived observation;
- source-closed support for origin, adaptive recovery, participation, and
  cross-community purpose;
- explicit sole-credit and measured-impact boundaries;
- exclusion of protected article prose from public repository records.

Four adversarial tests were added. They verify that the system rejects:

1. publishing the protected clipping at a public URL;
2. deleting an atomic observation and collapsing the source back into a summary;
3. inserting protected article prose into a public-safe observation;
4. removing a governed source support while leaving the claim evidence broader.

## Hill-climb results

### Focused pass

- iCloud Teams archive eval: **14/14 criteria passed**.
- iCloud Teams archive guard: **8/8 tests passed**.
- Knowledge-bank schema and integrity check: **passed**, with the same 11 existing
  careful-claim warnings retained as guardrails.
- `git diff --check`: **passed**.

### Complete recursive pass

The final implementation passed `npm run check` under Node 26, including:

- citation registry check and 10 citation tests;
- 16 portfolio evals;
- 14/14 professor-lens criteria and six mutation tests;
- 5/5 knowledge-bank eval groups across 32 criteria and 2/2 independent holdouts;
- 196/196 knowledge-eval mutation tests;
- 100/100 participation-continuity points and seven mutation tests;
- 14/14 iCloud Teams archive criteria and eight guard tests;
- personal and project Facebook archive guards and 100/100 scorecards;
- application typecheck, lint, and optimized Next.js production build;
- knowledge-bank integrity, public-safety, and route checks.

No evaluation threshold was weakened to obtain a pass.

## Website decision

No website copy, route, or visual surface changed in this pass. The source makes
the knowledge bank deeper and the claim more recomposable, but it does not by
itself create a compositional need for another public card or paragraph. The held
projection can be evaluated later against a particular job, audience, and page
argument.

## Files changed

- `apps/www/src/data/knowledge-bank/historical-knowledge.ts`
- `docs/knowledge-bank/projects/icloud-teams-archive-delta-2026-07-15.md`
- `docs/knowledge-bank/projects/kc-star-waterways-close-reading-2026-07-16.md`
- `scripts/lib/icloud-teams-archive-eval.mjs`
- `scripts/tests/icloud-teams-archive-guard.test.mjs`

## Pull request

- Draft pull request: <https://github.com/openhouse/jamieburk.art/pull/223>
- Branch: `feature/evals-H`
- Base: `develop`
- Raw version of this note:
  <https://raw.githubusercontent.com/openhouse/jamieburk.art/feature/evals-H/docs/knowledge-bank/projects/kc-star-waterways-close-reading-2026-07-16.md>
