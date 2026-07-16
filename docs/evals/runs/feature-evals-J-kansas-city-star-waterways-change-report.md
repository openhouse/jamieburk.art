# Kansas City Star Waterways Knowledge-Bank Change Report

**Date:** 2026-07-16  
**Branch:** `feature/evals-J`  
**Pull request:** `openhouse/jamieburk.art#209`  
**Frozen content candidate:** `0b6b64466699bc3d9b8897c695dcac692f79b8a2`  
**Frozen eval rubric:** `2216610afa01637ef81d95c1a69112cc2acdc090`  
**Final knowledge-development decision:** `stop_threshold_met`

## Source Reviewed

Darryl Levings, "In the name of art, go with the flow," *The Kansas City
Star*, November 15, 2007, A1 and A4.

The supplied two-page PDF was treated as a privately preserved copy of a
published newspaper artifact. The PDF, full article text, photographs, local
path, unrelated newspaper content, and reporter contact details were not
committed or republished.

## Work Performed

1. Inspected the PDF metadata and confirmed a two-page newspaper artifact.
2. Rendered both pages at high resolution and visually reviewed the front page,
   A4 continuation, headline, byline, captions, article jump, photographs, and
   multi-column reading order.
3. Extracted layout-aware text as a navigation aid and reconciled it against
   the rendered pages.
4. Compared the article with the existing contemporaneous Pitch source, the
   later Charlotte Street *Great Accommodations* page, and recovered public
   Facebook event traces.
5. Compared this branch's close reading with the independently developed
   `feature/evals-H` pass and retained its stronger recovery-network insight
   without importing an incompatible data model.
6. Decomposed the article into project identity, Jamie's initiating role,
   named crew, artifact form, chronology, route checkpoint, interruption and
   recovery, public purpose, support ecology, and explicit non-support.
7. Promoted the supported portion of the prior waterways intake into a
   governed reserve claim while keeping all website projection separate.
8. Added deterministic assertions for support, non-support, maturity,
   collective credit, public-registry exclusion, and private-path safety.
9. Ran focused and complete deterministic evaluation passes.
10. Ran one blind independent baseline and two fresh independent unchanged-
    candidate certifications, persisting each result and the stop decision.

## Defensible Knowledge Added

The governed claim now supports this wording:

> In 2007, Jamie conceived *Release Yourself onto the Water until it Tastes of
> Salt*. The Kansas City Star documented Jamie, Libby Hendon, and Laura
> Mattingly traveling from Kansas City's West Bottoms into Louisiana on a
> reclaimed-material, bicycle-powered raft and passing the 1,000-mile marker.

The source also supports these bounded details:

- a July 21 departure from Kansas City's West Bottoms;
- a roughly 12-by-13-foot raft made from reclaimed building material, civic
  refuse, and soda-manufacturing containers;
- two bicycles linked to paddlewheel propulsion;
- a reported position south of Baton Rouge by November 15, 2007;
- a 51-day interruption near Vicksburg;
- a crew-and-community-supported return involving local hospitality, free
  legal assistance, temporary work, vessel retrieval, repairs, navigation
  equipment, and crew adaptation;
- friends joining portions of the route and a wider support ecology involving
  hosts, Vicksburg residents, legal help, and public agencies;
- a living-experience purpose centered on rivers and encounters with people;
- Jamie's attributed interpretation of the river as connective cultural space
  between Kansas City's West Bottoms and Delta communities; and
- front-page Kansas City Star coverage.

## Claims Not Made

- The crew reached the Gulf of Mexico.
- The article establishes the exact endpoint or complete itinerary.
- Jamie completed the expedition alone.
- Jamie personally performed every design, fabrication, navigation, logistics,
  documentation, public-engagement, safety, or recovery task.
- The three named crew members were the complete participant or support roster.
- Every estimate, recollection, or safety characterization was independently
  audited.
- Historical reporting constitutes current river-travel authorization or
  guidance.
- Possession of the PDF grants republication rights.

## Files Changed

### Structured Knowledge

- `apps/www/src/data/knowledge-bank/records.ts`
  - added source `SRC-WATERWAYS-KC-STAR-GO-WITH-FLOW-2007`;
  - added claim `CLM-WATERWAYS-RAFT-EXPEDITION-2007`;
  - added inquiry `INQ-WATERWAYS-RAFT-ROUTE-AND-ROLES-2026`;
  - promoted `INTAKE-WATERWAYS-PARTICIPATORY-PRACTICE-2026-07-12` to
    `integrated`;
  - strengthened the raft proposition with named crew, artifact, chronology,
    route, 1,000-mile, interruption, and supported-return evidence;
  - added a separate river-as-connective-cultural-space proposition; and
  - added collective-credit, endpoint, rights, safety, and current-use limits.

### Human-Readable Knowledge

- `docs/knowledge-bank/projects/waterways-participatory-practice.md`
  - added the canonical project note, source chain, confirmed record, Chad-lens
    decomposition, boundaries, projection decision, and research queue.
- `docs/knowledge-bank/research/2026-07-16-kansas-city-star-waterways-evidence.md`
  - added the frozen source close-reading and content-candidate handoff.
- `docs/knowledge-bank/claims.md`
  - added the human-readable governed-claim mirror.
- `docs/knowledge-bank/intake.md`
  - recorded integrated maturity and unresolved endpoint, task, and rights
    questions.
- `docs/knowledge-bank/sources.md`
  - documented handling rules for locally preserved published articles.
- `docs/knowledge-bank/anti-claims.md`
  - added sole-credit, Gulf, endpoint, republication, and current-guidance
    prohibitions.
- `docs/knowledge-bank/README.md`
  - linked the project and source-review notes.

### Tests

- `scripts/tests/citations.test.mjs`
  - added assertions for the 1,000-mile marker and 51-day interruption;
  - asserted non-support for Gulf arrival and republication rights;
  - verified the governed claim, collective-credit boundary, integrated intake,
    direct-support propositions, public-registry exclusion, and private-path
    safety.

### Evaluation Records

- `docs/evals/runs/knowledge-bank-development-waterways-kc-star-baseline-0b6b6446.json`
  - blind baseline scorecard.
- `docs/evals/runs/knowledge-bank-development-waterways-kc-star-certification-01-0b6b6446.json`
  - first passing unchanged-candidate certification.
- `docs/evals/runs/knowledge-bank-development-waterways-kc-star-certification-02-0b6b6446.json`
  - second passing unchanged-candidate certification.
- `docs/evals/runs/feature-evals-J-knowledge-bank-waterways-kc-star-iteration-01.md`
  - frozen inputs, selected failure, before/after evidence, scores, regressions,
    and final decision.
- `docs/evals/runs/feature-evals-J-knowledge-bank-waterways-kc-star-stop.md`
  - certified knowledge, boundaries, regression audit, and stop record.
- `docs/evals/runs/feature-evals-J-kansas-city-star-waterways-change-report.md`
  - this complete user-facing change report.

## Website Decision

No website route, copy, card, résumé line, image, download, metadata surface,
or navigation item changed. No `/proofs`, `/knowledge-bank`, newspaper archive,
or waterways route was added.

This is strong reserve knowledge. It can later support a particular artistic-
practice, participatory-program, public-engagement, implementation, or systems-
thinking argument, but the source alone does not create a compositional need on
the current hiring site.

## Verification

Focused checks passed under Node 26.5.0:

- `npm run evals:knowledge-bank`: 10 evals, 6 blocking, total weight 100;
- `npm run test:knowledge-bank-evals`: 16 of 16 tests;
- `npm run check:citations`;
- `npm run test:citations`: 84 of 84 citation and archive tests;
- `npm run knowledge-bank`, retaining 10 established careful-claim warnings as
  intended guardrails;
- `npm run public-safety`; and
- `git diff --check`.

The complete `npm run check` passed twice on the unchanged frozen content
candidate. Each pass included:

- 17 portfolio eval definitions and 18 portfolio-eval tests;
- 10 knowledge-bank eval definitions and 16 knowledge-bank-eval tests;
- 7 blind-spot eval definitions and 11 blind-spot-eval tests;
- 84 citation and archive tests;
- TypeScript, ESLint, and an optimized Next.js production build;
- 17 application routes; and
- knowledge-bank, public-safety, citation, and route checks.

Independent knowledge-development results:

| Run | Weighted score | Result |
| --- | ---: | --- |
| Blind baseline | `0.9325` | `KB-001` through `KB-009` passed; `KB-010` correctly failed because exact-candidate process evidence did not yet exist |
| Certification 1 | `0.955` | All ten criteria passed; consecutive passing runs `1` |
| Certification 2 | `0.955` | All ten criteria passed; consecutive passing runs `2`; eligible with no errors or blockers |

The final decision is `stop_threshold_met` for the `claim-development` target.
This does not substitute for Jamie's later approval of any website projection
or for separate live and human production-launch gates.

## Remaining Opportunities

1. Recover independent evidence for the route after November 15, 2007 and the
   expedition's exact endpoint.
2. Invite Libby Hendon and Laura Mattingly to clarify or correct roles,
   material decisions, daily operations, public encounters, and omissions.
3. Inventory surviving photographs, video, diagrams, writing, and vessel
   documentation with creator and publication-rights metadata.
4. Reconcile later Gulf-completion references before strengthening the claim.
5. Convert the broad lineage question into ranked source-fact-decision tests.
6. Add structured correction triggers for future endpoint or collaborator-role
   evidence before any stronger public projection.

## Final State

The source is encoded, the strongest defensible claim is governed, collective
credit and uncertainty remain visible, the copyrighted artifact stays private,
the current website remains composed, and the frozen content candidate has two
consecutive independent passing judgments.
