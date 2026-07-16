# Kansas City Star River Expedition Accession

Date of archival-production pass: July 16, 2026  
Knowledge-bank source ID: `SRC-KCSTAR-RIVER-EXPEDITION-2007`  
Source-reading ID: `READ-KCSTAR-RIVER-EXPEDITION-2007`

This is the complete public-safe change record for the Kansas City Star article
pass on `feature/evals-E`. It is designed both as a research memo and as an
inspectable list of what changed in the repository.

## Source identification

- Article: "In the name of art, go with the flow"
- Author: Darryl Levings
- Publication: The Kansas City Star
- Publication date: November 15, 2007
- Printed locations: front page and page A4
- Preserved form reviewed: two-page participant-supplied PDF scan
- Fixity fingerprint: `8e9821ddccffc062983e3cf38f5a6080a1a5d1ee0cf1d0ff2b38b5ff40b17cd3`
- Public-link status: no public article URL recovered during this pass
- Publication rule: metadata and public-safe findings may be cited; the scan is
  not committed or republished without a separate rights decision

The publication date comes from the newspaper masthead. It is not inferred
from the later PDF container metadata.

## Inspection performed

1. Inspected PDF metadata and page count.
2. Rendered both pages to images for visual verification.
3. Read the front page and continuation together so that headline, byline,
   captions, route, role, technical details, and limitations remained joined.
4. Extracted text locally as a reading aid and checked it against the rendered
   pages.
5. Searched for a public copy of the article; none was recovered.
6. Compared the article with existing river-expedition records from The Pitch,
   WLBT, and Charlotte Street Foundation.
7. Kept all temporary renders, extracted text, and the source scan outside Git.

## What the article supports

The close reading stores eight atomic propositions:

- the article's November 15, 2007, front-page publication and A4 continuation;
- attribution of the expedition's originating idea to Jamie;
- crew credit for Jamie, Libby Hendon, and Laura Mattingly;
- collective construction of an approximately twelve-by-thirteen-foot raft in
  three weeks from discarded materials, powered by two bicycles and a
  paddlewheel;
- departure from Kansas City's West Bottoms on July 21 and more than one
  thousand river miles completed while the journey continued through
  Louisiana;
- Jamie's invitation for people encountered along the route to join the raft;
- Jamie's framing of the river as a possible cultural connection between
  Kansas City's West Bottoms and communities farther south; and
- collective adaptation after regulatory and logistical interruption,
  including craft modifications and added safety and communication equipment.

## What the article does not support

- It does not establish the later arrival at the Gulf of Mexico.
- It does not support sole authorship, sole construction, or sole operation by
  Jamie.
- It does not divide every construction, navigation, support, or adaptation
  task among the crew and wider support network.
- It is not a complete route log or participant list.
- It does not establish measured participation, civic, or cultural outcomes.
- The scan's existence does not create permission to republish the newspaper
  pages.

## Knowledge-bank changes

### New records

- `INTAKE-KCSTAR-RIVER-EXPEDITION-2007` accounts for the supplied artifact and
  marks raw material as protected outside the repository.
- `SRC-KCSTAR-RIVER-EXPEDITION-2007` stores public bibliographic metadata,
  source scope, anti-claims, rights status, and a non-sensitive protected
  locator ID. It has `public-metadata-only` visibility and no invented URL.
- `READ-KCSTAR-RIVER-EXPEDITION-2007` decomposes the article into eight atomic,
  located propositions and four explicit limitations.

### Matured existing claim

`CLM-RIVER-EXPEDITION-ORIGIN` moved from `public-ready` to `projected`.

The claim now:

- puts Jamie's documented origin role in the sentence;
- names Libby Hendon and Laura Mattingly as the crew with him;
- connects the work to a clear participatory and cultural purpose;
- records a usable result: an operating, adaptable raft journey that passed one
  thousand miles and invited people encountered along the route aboard;
- cites the Kansas City Star article directly;
- cites WLBT and The Pitch as public corroboration;
- preserves the distinction between in-progress evidence and later Gulf
  completion; and
- prohibits sole-credit, complete-contribution-ledger, and measured-impact
  overclaims.

### Corroborated existing claims

- `CLM-RIVER-EXPEDITION-GULF-COMPLETION` now uses the article only as
  in-progress route and crew corroboration. Its later Gulf outcome still rests
  on the separate retrospective source.
- `CLM-RIVER-EXPEDITION-ORGANIZER-2007` now uses the article as corroboration
  for Jamie's originating role, the named crew, and the participatory purpose.

### Publication decisions

- `DEC-RIVER-EXPEDITION-ORIGIN-PUBLISH-ABOUT` approves the compact About-page
  projection.
- `DEC-RIVER-EXPEDITION-ORIGIN-DEFER` remains in force for a future full
  river-program case study and now explicitly distinguishes that larger
  composition from the approved About paragraph.

## Website changes

The About page now includes this cited projection:

> In 2007, I originated "Release Yourself onto the Water until it Tastes of
> Salt" and carried it out with Libby Hendon and Laura Mattingly as a
> found-material, bicycle-powered river expedition from Kansas City. We invited
> people we met along the route to join the raft, treating the Missouri and
> Mississippi as lived places connecting cities and people.

A short following sentence connects concept, field operations, public
participation, and adaptation under real constraints to Jamie's current
implementation practice. This is editorial interpretation, not a new measured
outcome claim.

The About citation order now places the Kansas City Star metadata-only note
after the two NTER CHNG sources, followed by public WLBT and Pitch
corroboration. The newspaper note renders without an external link.

## Files changed

- `apps/www/src/data/knowledge-bank/kansas-city-star-river-expedition-2026-07-16.ts`
- `apps/www/src/data/knowledge-bank/lifecycle-records.ts`
- `apps/www/src/data/knowledge-bank/source-expansion-2026-07-13.ts`
- `apps/www/src/data/knowledge-bank/records.ts`
- `apps/www/src/data/knowledge-bank/public-registry.json`
- `apps/www/src/app/about/page.tsx`
- `scripts/tests/citations.test.mjs`
- `scripts/tests/knowledge-lifecycle-evals.test.mjs`
- `docs/knowledge-bank/README.md`
- `docs/knowledge-bank/sources.md`
- `docs/knowledge-bank/projection-map.md`
- `docs/knowledge-bank/research/kansas-city-star-river-expedition-2007.md`
- eval assessment artifacts refreshed by the recursive hill-climb pass

## Recursive eval record

Baseline before this accession:

- launch source eval: 13 of 13 hard gates passed; 2 of 2 quality targets met;
- knowledge-lifecycle eval: 7 of 7 hard gates passed; 4 of 4 quality targets
  met; and
- latest independent launch review: 93.5 of 100, with the Margaret Morse,
  Warren Sack, Chad, hiring-reader, agency, role-fit, evidence, collective-work,
  and public-safety criteria at 4 of 4. Visual proof remained 2 of 4 and
  completion confidence 3 of 4 because their remaining gates require human
  rights, reader, collaborator, and production decisions.

Post-change verification and independent-judge results are recorded below once
the branch is tested and the hill-climb cycle closes.

## Privacy, rights, and credit decisions

- No source scan, local path, temporary render, extracted article text, or
  archive dump enters the repository.
- No public URL is invented for the metadata-only source.
- The source's copyright status is not confused with evidentiary usefulness.
- Jamie's documented origin role is stated directly.
- Libby Hendon and Laura Mattingly retain visible collective credit.
- The Kansas City Star article is not used to prove the Gulf endpoint.
- A public article does not become proof of adoption, impact, or every
  contributor's role.

## Remaining human decisions

- Rights clearance would be required before displaying the newspaper pages.
- A future full river-program case study remains an editorial decision, not an
  automatic consequence of this accession.
- The broader release candidate still awaits the existing human gates for
  media rights, collaborator-sensitive credit, blind-reader review, claim
  corroboration where queued, and Jamie's production approval.
