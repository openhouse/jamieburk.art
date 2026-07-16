# Kansas City Star Waterway Article: Knowledge-Bank Ingestion and Eval Record

Date: 2026-07-16

Branch: `feature/evals-I`

Pull request: [#219](https://github.com/openhouse/jamieburk.art/pull/219)

Source supplied by Jamie: `KC_Star_Article.pdf`

## Purpose

This pass preserves the strongest public-safe facts and bounded professional
claims afforded by a two-page *Kansas City Star* article about the 2007
collective river expedition *Release Yourself onto the Water until it Tastes of
Salt*.

The work strengthens the knowledge bank. It does not add the article scan to
the public repository, force a new portfolio-page projection, or replace the
existing collective-credit and exact-candidate human-review gates.

## Source Verified

- Publication: *The Kansas City Star*
- Date: November 15, 2007
- Byline: Darryl Levings
- Front-page headline: "In the name of art, go with the flow"
- Continuation: page A4, under "RIVER: Adventure of a lifetime takes three
  friends from KC to Louisiana"
- PDF pages: 2
- PDF size: 2,379,685 bytes
- PDF SHA-256:
  `8e9821ddccffc062983e3cf38f5a6080a1a5d1ee0cf1d0ff2b38b5ff40b17cd3`

## Review Method

1. Inspected PDF metadata and file type.
2. Calculated a SHA-256 fingerprint.
3. Rendered both pages at high resolution.
4. Visually reviewed the front page, continuation, captions, photographs,
   byline, date, column flow, and article boundaries.
5. Compared layout-aware text extraction with the rendered pages.
6. Separated reported facts, attributed participant statements, contextual
   reporting, and source limitations.
7. Compared the article with the existing *Pitch*, Facebook-event, and
   waterway-participation records.
8. Ran schema, citation, privacy, collective-credit, portfolio, mutation,
   route, type, lint, and production-build checks.

## What the Article Establishes

### Publication and visibility

The expedition was the photographic lead story on the November 15, 2007 front
page and continued on page A4. The article and its photographs are treated as
copyrighted material. Citation metadata and bounded paraphrases are preserved;
the scan is not republished.

### Jamie's documented role

The article reports that the expedition began with an idea originated by
Jamie. This independently corroborates the existing contemporaneous *Pitch*
report. It supports concept origination, not sole authorship of the raft,
journey, participant experience, or every operational decision.

### Collective credit

The article names Libby Hendon, Jamie Burkart, and Laura Mattingly as the crew
then traveling south. It also reports that friends joined the raft for portions
of the journey. The project, raft, operation, and journey remain classified as
collective work.

### Material and technical system

The report describes:

- an approximately 12-by-13-foot raft;
- construction over three weeks;
- discarded building materials, civic refuse, and plastic syrup drums;
- two bicycles linked to a paddlewheel;
- paddling and other adaptations used after the Vicksburg interruption.

These details establish the system the group used. They do not allocate
individual design, fabrication, maintenance, navigation, or repair credit.

### Route and chronology

The article establishes:

- a July 21, 2007 departure from Kansas City's West Bottoms;
- travel down the Missouri and Mississippi river system;
- an interim location south of Baton Rouge by November 15;
- a continuing intention to test for salt below New Orleans.

It does not establish the later Gulf terminus because the journey was still
underway when the article was published. A separate 2009 *Pitch* follow-up
supports the later Gulf endpoint and four-month duration. Neither source
establishes every stop, route segment, participant, or contribution.

### Participatory method

The article frames the project as a lived experience on the rivers and with
people along them. It reports stops for supplies and conversation, friends
joining for segments, invitations for people to board, and relationships formed
through the journey. These details strengthen the existing participatory-
practice throughline.

### Disruption and local support

The report describes Coast Guard intervention, a 51-day interruption near
Vicksburg, legal assistance, repairs, work opportunities, material help, and a
large community sendoff before the crew resumed the journey. This is evidence
of disruption and relational support. It is not converted into a quantified
impact, resilience score, or claim that Jamie individually secured every form
of assistance.

### Civic interpretation

The article records Jamie interpreting Kansas City's river as a space commonly
perceived through danger, division, history, and industry, while proposing the
possibility of cultural connection between the West Bottoms and Delta
communities. This strengthens the public-safe interpretation of the project as
participatory inquiry into place, infrastructure, and collective life.

## What the Article Does Not Establish

- Jamie alone designed, built, operated, or completed the raft.
- Jamie was the expedition's only participant or leader.
- The article itself proves that the crew reached the Gulf of Mexico.
- Every participant, visitor, stop, route segment, or later project phase.
- Individual ownership of every design, fabrication, navigation, repair, or
  documentation task.
- Measured cultural, community, educational, environmental, or policy impact.
- Rights or permission to republish the scanned pages or photographs.

## Knowledge-Bank Records Added

### Intake

- `INT-WATER-KCSTAR-GO-WITH-FLOW-2007`

The intake record connects the artifact to the waterway-participation project,
three existing claims, the open route task, the public-safe source record, and
the PDF fingerprint.

### Source

- `SRC-WATER-KCSTAR-GO-WITH-FLOW-2007`

The source is `public-metadata-only`. It has no exposed local path or asset URL.
The scan is rights-bounded as `permission-needed` and `metadata-only`.

### Atomic assertions

- `AST-WATER-KCSTAR-PUBLICATION`
- `AST-WATER-KCSTAR-CONCEPT-ORIGIN`
- `AST-WATER-KCSTAR-COLLECTIVE-CREW`
- `AST-WATER-KCSTAR-RAFT-SYSTEM`
- `AST-WATER-KCSTAR-PARTICIPATORY-METHOD`
- `AST-WATER-KCSTAR-INTERIM-ROUTE`
- `AST-WATER-KCSTAR-OPERATIONAL-DISRUPTION`
- `AST-WATER-KCSTAR-CIVIC-INTERPRETATION`
- `AST-WATER-KCSTAR-GULF-BOUNDARY`

### Research inquiry

- `INQ-WATER-KCSTAR-CLOSE-READ-2026`

The inquiry records the methods, recovered findings, limitations, source link,
and public-safe result of this pass.

## Existing Claims Strengthened

### `CLM-WATER-RAFT-CONCEPT`

Added independent concept-origin corroboration, material-system detail,
collective-crew evidence, Jamie's civic interpretation, and sharper boundaries
between idea origination and collective implementation.

### `CLM-WATER-GULF-ROUTE`

Added the July 21 West Bottoms departure, interim Louisiana position, collective
crew, and explicit pre-terminus boundary. The claim now distinguishes what the
2007 *Star* article establishes from what the 2009 *Pitch* follow-up establishes.

### `CLM-WATER-PARTICIPATORY-THROUGHLINE`

Added evidence of encounters, invitations aboard, community support during
disruption, and Jamie's interpretation of the river as civic and cultural
space. The claim still preserves collective authorship and does not claim
measured impact.

## Existing Research Task Updated

`TASK-WATER-GULF-ROUTE` now includes the *Kansas City Star* source. Its public
summary distinguishes:

- documented departure;
- documented interim geography;
- later independently reported Gulf terminus;
- the still-unrecovered stop-by-stop route.

## Documentation Updated

`docs/knowledge-bank/projects/waterway-participation.md` now includes:

- independent concept-origin corroboration;
- the named collective crew;
- the raft-system description;
- route chronology and source-specific endpoint boundaries;
- the participation and disruption record;
- Jamie's civic interpretation;
- updated open research and "Do Not Say Yet" language.

The public portfolio website was not changed in this pass. The knowledge bank
now has greater depth available for future audience-specific composition.

## Evaluation Coverage Added

The knowledge-development mutation suite now includes:

`Kansas City Star waterway evidence preserves collective credit and the
interim-route boundary`

The test requires:

- correct publication metadata;
- metadata-only rights treatment;
- all nine source assertions;
- collective-credit and Gulf-boundary assertions;
- evidence links from all three governed claims;
- anti-claim language against solo design or construction;
- route-task integration;
- public-registry exclusion of the source artifact;
- exact project-note treatment of the raft and interim endpoint.

## Knowledge-Bank Inventory Change

| Record type | Before | After | Change |
| --- | ---: | ---: | ---: |
| Intake | 64 | 65 | +1 |
| Sources | 256 | 257 | +1 |
| Source assertions | 350 | 359 | +9 |
| Claims | 112 | 112 | 0 |
| Research tasks | 59 | 59 | 0 |
| Research inquiries | 28 | 29 | +1 |
| Citation pages | 6 | 6 | 0 |

Maintenance integrity remains clean: zero unresolved source IDs, undecomposed
intake sources, unlinked sources, duplicate IDs, stale claims, or stale proofs.

## Evaluation Results

### Passed

- Knowledge-bank schema and lifecycle validation.
- Public-safety validation.
- Citation generation, redaction, and citation checks.
- 12 of 12 citation tests.
- Portfolio eval schema: 15 evals, 10 blocking, weight total 100.
- 12 of 12 portfolio-eval tests.
- Blind-spot machine score: `1.0`.
- 12 of 12 blind-spot mutation tests.
- Chad-lens role, action, end, result, CTA, and hiring-path check.
- TypeScript typecheck.
- ESLint.
- Next.js production build for all 17 routes.
- Route check.
- New Kansas City Star focused regression test.
- 34 knowledge-development tests that do not depend on a current independent
  hybrid scorecard.

### Honest stopping conditions

The knowledge-development score is `0.89`, with `KB-001` through `KB-006`,
`KB-008`, and `KB-010` at full machine score. `KB-007` and `KB-009` remain
blocked by the exact-candidate governance contract:

- the prior hybrid report describes an older candidate;
- collective-credit semantics and a consequential public knowledge surface
  changed;
- this candidate cannot provide its own independent collective-credit and
  reverse-coverage review.

Four knowledge-development tests therefore remain red by design: three verify
that the frozen inventories and hybrid report are current, and one expects the
next failed criterion to advance beyond `KB-007`. They should turn green only
after an independent review of the exact committed candidate, not through a
candidate-authored baseline rewrite.

The blind-spot suite remains `human_blocked` at weighted score `0.7575` because
collaborator review, hiring-reader observation, and rights-cleared visual
selection still require people.

## Files Added

- `apps/www/src/data/knowledge-bank/batches/kansas-city-star-waterway-2007-2026-07-16.ts`
- `docs/knowledge-bank/runs/2026-07-16-kansas-city-star-waterway-ingestion.md`

## Files Changed

- `apps/www/src/data/knowledge-bank/records.ts`
- `docs/knowledge-bank/projects/waterway-participation.md`
- `docs/knowledge-bank/data/portfolio-blind-spots-evidence-2026-07-15.json`
- `scripts/tests/knowledge-development.test.mjs`
- `docs/knowledge-bank/README.md`

## Deliberate Non-Changes

- Did not add the copyrighted PDF or newspaper photographs to Git.
- Did not expose the local source path.
- Did not add a new public portfolio claim or case-study page.
- Did not characterize the article's front-page placement as measured impact.
- Did not assign sole raft authorship or erase collaborators.
- Did not treat the November 2007 article as proof of the later Gulf endpoint.
- Did not rewrite the frozen collective-credit baseline or stale hybrid review.

## Next Human Actions

1. Have an independent reviewer assess collective credit and reverse coverage
   for the exact candidate commit.
2. Seek participant corroboration from Libby Hendon, Laura Mattingly, and other
   contributors if individual work allocation becomes important.
3. Recover additional public route records for the interval between the
   November 2007 report and the Gulf terminus.
4. Conduct rights review before using either newspaper page or its photographs
   on the public website.
5. Decide later whether this deeper record advances a specific hiring or public
   argument strongly enough to merit website projection.
