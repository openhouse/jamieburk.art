# Kansas City Star Raft Archival-Production Pass

Date: July 16, 2026
Artifact: Darryl Levings, "In the name of art, go with the flow," *The
Kansas City Star*, November 15, 2007, pages A1 and A4.

Raw Markdown: <https://raw.githubusercontent.com/openhouse/jamieburk.art/feature/evals-M/docs/knowledge-bank/kansas-city-star-raft-2026-07-16.md>

## What I did

1. Inspected the supplied two-page scan as both rendered pages and extracted
   text.
2. Identified the article, author, publication date, page locations, captions,
   photographs, continuation headline, and publication context.
3. Created a public-safe canonical source record without committing the PDF or
   exposing its protected locator.
4. Decomposed the article into seven atomic assertions covering placement,
   project origin, collaborators, craft design, verified scale, participation,
   operational recovery, and the endpoint boundary.
5. Promoted a new bank-only claim about Jamie's originating role, collaborative
   execution, improvised technical design, participatory model, verified scale,
   and resilience.
6. Added the article as non-rendered corroboration for the existing
   participatory-public-systems throughline.
7. Updated the open route inquiry and the held Gulf candidate to distinguish
   verified travel into Louisiana from an unverified final landing point.
8. Created a rights-aware photo-editor lead for the newspaper photographs.
9. Added a deterministic knowledge-lifecycle eval for complete source,
   reading, claim, hold, inquiry, report, and rights-control lineage.
10. Regenerated the redacted public citation registry.

## Strong findings encoded

- The article appeared on the Kansas City edition's front page and continued on
  page A4.
- It attributes the expedition idea to Jamie and identifies Jamie, Libby
  Hendon, and Laura Mattingly as the three-person core crew.
- The roughly 12-by-13-foot craft was built in three weeks from reclaimed
  materials and propelled by two bicycles linked to a paddlewheel.
- By November 15, 2007, the crew had traveled more than 1,000 miles from its
  July 21 Kansas City departure and was in Louisiana.
- Friends joined for portions of the trip, and people encountered along the
  route were invited to participate.
- The crew resumed after a 51-day interruption in Vicksburg involving local
  legal help, community support, raft recovery, and technical modifications.
- Jamie connected the expedition to overcoming Kansas City's perception of the
  river as invisible or merely divisive infrastructure and to awakening cultural
  relationships among river communities.

## Claim decisions

### Promoted in the knowledge bank

The evidence supports a bounded claim that Jamie originated and helped carry
out a collaborative art expedition that traveled more than 1,000 miles from
Kansas City into Louisiana on a bicycle-powered raft built from reclaimed
materials, invited participation, and resumed after a 51-day interruption.

This is retained as reserve knowledge for future role-specific portfolio,
resume, interview, or photo-editing work. It is not automatically projected to
a public website page.

### Still held

The article does not establish completion of the Gulf objective. At the time of
publication, it says the saltwater objective was still ahead, the endpoint was
unknown, and the crew did not expect to see the Gulf from the raft. The exact
final landing point and completion chronology remain research questions.

The article also does not support solo credit. Libby Hendon, Laura Mattingly,
friends who joined, Vicksburg supporters, legal assistance, repair help, and
other participants remain part of the project's documented collective record.

## Public-safety and rights decisions

- The supplied PDF is not committed.
- Newspaper pages and photographs are not treated as cleared public assets.
- The source record exposes bibliographic metadata and public-safe findings,
  not a private filesystem location.
- Photographer and newspaper rights require review before any image use.
- No personal contact information from the article is retained.

## Website decision

No website copy changed. The current About page already presents the
participatory-public-systems throughline clearly. This pass increases the depth
and specificity available to future compositions without increasing the current
reader's burden.

## Files added or changed

- `apps/www/src/data/knowledge-bank/kansas-city-star-raft-batch-2026-07-16.ts`
- `apps/www/src/data/knowledge-bank/kansas-city-star-raft-development-2026-07-16.ts`
- `apps/www/src/data/knowledge-bank/evidence-batch-2026-07-12.ts`
- `apps/www/src/data/knowledge-bank/development-records.ts`
- `apps/www/src/data/knowledge-bank/records.ts`
- `scripts/check-knowledge-lifecycle.mjs`
- `docs/qa/recursive-evals-M.md`
- `docs/knowledge-bank/projects/participatory-public-systems.md`
- `docs/knowledge-bank/kansas-city-star-raft-2026-07-16.md`

`apps/www/src/data/knowledge-bank/public-registry.json` was regenerated and
verified byte-for-byte unchanged. That is the intended result: metadata-only
evidence and its protected locator do not enter the public citation payload.

## Verification

Fresh local verification on July 16, 2026:

- Knowledge-lifecycle baseline after adding the new criterion: 102/103.
- Knowledge lifecycle after the archival-production pass: 103/103.
- Citation tests: 16/16.
- Chad lens: 12/12.
- Portfolio readiness: 10/10.
- Prof. Margaret Morse and Prof. Warren Sack lenses: 2/2.
- TypeScript, lint, Next.js production build, public-safety scan, citation
  validation, and route checks: passed.
- Full Node 26 `npm run check`: passed.

GitHub Actions status is recorded in the pull-request update after the commit is
pushed.
