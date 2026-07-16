# Kansas City Star Waterways Evidence Update

**Date:** 2026-07-16
**Branch:** `feature/evals-J`
**Pull request:** `openhouse/jamieburk.art#209`
**Source reviewed:** Darryl Levings, *In the name of art, go with the flow*, The Kansas City Star, November 15, 2007, A1 and A4
**Repository posture:** Public-safe metadata and synthesis; source PDF withheld

## Why This Pass Happened

Jamie supplied a two-page Kansas City Star PDF documenting the 2007 river
expedition *Release Yourself onto the Water until it Tastes of Salt*. The
knowledge bank already held a Pitch source, a later Charlotte Street project
page, and recovered event traces, but it still treated the expedition as a
claim candidate with unresolved route, collaborator, and endpoint questions.

This pass closely read the stronger newspaper artifact, decomposed its evidence
jobs, promoted the defensible portion into a governed reserve claim, retained
the unresolved boundaries, and left the current hiring site unchanged.

## Source Review Performed

1. Inspected the PDF metadata and confirmed a two-page newspaper artifact.
2. Rendered both pages to high-resolution images.
3. Visually reviewed the A1 front page and A4 continuation, including headline,
   byline, publication date, captions, article jump, photographs, and page
   placement.
4. Extracted layout-aware text and reconciled it against the rendered pages.
5. Compared the article with the existing Pitch source, Charlotte Street's
   Great Accommodations page, and recovered public Facebook event records.
6. Separated project conception, crew identity, artifact form, route progress,
   public purpose, and support ecology from endpoint, complete task allocation,
   and publication-rights questions.
7. Compared the close reading against the independently developed
   `feature/evals-H` treatment, retaining its stronger recovery-network insight
   without importing that branch's different data model or weakening this
   branch's established governance.
8. Kept the source PDF, full article text, newspaper photographs, unrelated
   page content, and the reporter's contact details outside Git.

## New Defensible Knowledge

The evidence now supports the following bounded claim:

> In 2007, Jamie conceived *Release Yourself onto the Water until it Tastes of
> Salt*. The Kansas City Star documented Jamie, Libby Hendon, and Laura
> Mattingly traveling from Kansas City's West Bottoms into Louisiana on a
> reclaimed-material, bicycle-powered raft and passing the 1,000-mile marker.

Additional supported context:

- the project launched from the West Bottoms on July 21;
- the raft was approximately 12 by 13 feet;
- it used reclaimed building material, civic refuse, soda-manufacturing
  containers, and bicycle-powered paddlewheel propulsion;
- the article reported the crew south of Baton Rouge by November 15, 2007;
- the article reported a 51-day interruption near Vicksburg followed by a
  crew-and-community-supported return involving local hospitality, free legal
  help, temporary work, raft retrieval, repairs, and navigation equipment;
- the journey was framed as a living experience on the rivers and with people
  encountered along them;
- Jamie interpreted the river as connective cultural space between Kansas
  City's West Bottoms and Delta communities;
- the journey depended on a wider ecology of friends, hosts, Vicksburg
  residents, legal assistance, and public agencies; and
- the Kansas City Star gave the project front-page coverage.

## Claims Deliberately Not Made

- The crew reached the Gulf of Mexico.
- The article establishes the exact endpoint or complete itinerary.
- Jamie completed the expedition alone.
- Jamie personally designed, built, navigated, documented, or operated every
  part of the project.
- The three named crew members were the complete participant or supporter
  roster.
- Every estimate, recollection, or safety characterization in the article was
  independently audited.
- The historical journey is current river-travel guidance or an authorized
  model to repeat.
- Possession of the PDF grants permission to republish its text or images.

## Files Changed

### Structured Knowledge

- `apps/www/src/data/knowledge-bank/records.ts`
  - added source `SRC-WATERWAYS-KC-STAR-GO-WITH-FLOW-2007`;
  - added governed claim `CLM-WATERWAYS-RAFT-EXPEDITION-2007`;
  - added inquiry `INQ-WATERWAYS-RAFT-ROUTE-AND-ROLES-2026`;
  - promoted `INTAKE-WATERWAYS-PARTICIPATORY-PRACTICE-2026-07-12` from
    `claim-candidate` to `integrated`;
  - strengthened the raft proposition with named crew, route, artifact, and
    1,000-mile evidence;
  - added a separate proposition preserving Jamie's river-as-connective-space
    interpretation;
  - updated research questions, boundaries, review date, and reviewers.
  - incorporated the parallel `feature/evals-H` pass's recovery-network insight
    as bounded support, without adopting incompatible record identifiers.

### Human-Readable Knowledge

- `docs/knowledge-bank/projects/waterways-participatory-practice.md`
  - added the canonical public-safe project note, source chain, Chad-lens
    decomposition, projection decision, boundaries, and research queue.
- `docs/knowledge-bank/claims.md`
  - added the human-readable mirror of the governed waterways claim.
- `docs/knowledge-bank/intake.md`
  - recorded the thread's integrated status and unresolved boundaries.
- `docs/knowledge-bank/sources.md`
  - documented the handling policy for locally preserved published articles.
- `docs/knowledge-bank/anti-claims.md`
  - added Gulf-endpoint, sole-credit, rights, and current-guidance prohibitions.
- `docs/knowledge-bank/README.md`
  - linked the project and research notes from the knowledge-bank orientation.
- `docs/knowledge-bank/research/2026-07-16-kansas-city-star-waterways-evidence.md`
  - added this complete source-review, change, evaluation, and handoff record.

### Tests and Evaluation Evidence

- `scripts/tests/citations.test.mjs`
  - added source-support and non-support assertions;
  - added governed-claim, collective-credit, intake-maturity, proposition, and
    public-registry exclusion assertions;
  - added a private-path and source-filename leak guard.
- `docs/evals/runs/portfolio-waterways-kc-star-2026-07-16.json`
  - records the exact frozen content candidate, complete deterministic passes,
    independent-judgment state, and final stop decision.

## Publication and Privacy Decisions

- The PDF was used for research but was not copied into the repository.
- No full article text or newspaper photograph was reproduced.
- No reporter contact information was retained.
- The source uses a protected opaque locator and public-safe metadata.
- The source remains absent from the generated public citation registry.
- The knowledge-bank claim projects only to its repository project note.
- No `/proofs`, knowledge-bank, newspaper-archive, or waterways website route
  was created.
- No homepage, résumé, Work page, About page, or case-study copy changed.

## Eval Hill Climb

The source most directly strengthens:

- `KB-002`, by replacing a thin route lead with atomic source support and
  explicit non-support;
- `KB-003`, by preserving Libby Hendon, Laura Mattingly, and the wider support
  ecology while keeping Jamie's documented initiating role visible;
- `KB-004`, by making actor, action, artifact, and useful end legible;
- `KB-005`, by adding July 21 and November 15 chronology, Louisiana progress,
  and a bounded 1,000-mile milestone;
- `KB-008`, by preserving artistic, civic, material, logistical, and relational
  texture for later composition;
- the Chad, Margaret Morse, and Warren Sack lenses, by adding a concrete example
  of structure emerging from material conditions, becoming inhabitable through
  collaboration, and joining technical form to public meaning.

The complete verification results and exact candidate SHA are filled in below
after the candidate is frozen.

## Verification Results

Pending final candidate freeze and repeated evaluation.

## Remaining Questions

1. Where and when did the expedition end after the November 15 report?
2. Which sources can independently establish or correct later Gulf-completion
   language?
3. How do Libby Hendon and Laura Mattingly describe their roles and Jamie's?
4. What surviving media and project artifacts have clear creator attribution
   and publication rights?
5. Which future hiring argument, if any, benefits enough from this story to
   justify projecting a concise version onto the website?
