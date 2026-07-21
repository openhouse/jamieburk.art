# Ten-source NYC Artist Coalition expansion

Date: 2026-07-13

Branch: `feature/evals-A`
Starting head: `b51ded63e373922d0b5e1c30ad2bcc89eeff703b`

## Objective

Use the Greene Hill Food Co-op profile as a research lead, recover ten
additional public sources, mature their supported propositions into the
knowledge bank, and strengthen the portfolio without turning every recovered
fact into public copy.

## Source intake

Exactly ten new source records were added:

1. Bedford + Bowery, `6 Things to Know About Making DIY Spaces Work`.
2. Bedford + Bowery, `What Can the Night Mayor Do? The DIY Scene Discusses`.
3. Mixmag, `Let NYC dance: The battle to save New York City's nightlife`.
4. NYC Artist Coalition, `Supporters List`.
5. NYC Artist Coalition, `Tell NYC Council: Legalize Dance`.
6. Save NYC Spaces, `New Nightlife Mayor Must Assist Diverse Cultures`.
7. NYC Artist Coalition, `No Dancing Cabaret Law REPEALED! 1926-2017`.
8. New York City Council, Int 1688-2017 / Local Law 178.
9. New York City Council, Int 1652-2017 / Local Law 214.
10. New York City Council Committee on Small Business hearing transcript,
    October 22, 2018, pp. 347-348.

The previously captured NPR lead was recovered through a public-radio
syndication page and promoted to an integrated source. It predates this
ten-source expansion and is not double-counted.

## Iteration 1: ingest and project

The first pass added ten dispositioned intake records, ten bounded sources,
eight claims, one new component-authorship inquiry, and a first public
projection on `/work/fair-rent-nyc`.

The first fresh judge rejected the composition even though deterministic
checks passed. Six cited claims made the page read as policy chronology, moving
Jamie's usable work too far down the hiring path. Projection discipline fell
below its floor and the Chad lens regressed from 4 to 3.

## Iteration 2: select for the hiring argument

Two government-only outcome claims returned to held projections:

- enactment of the Office of Nightlife and Nightlife Advisory Board;
- repeal of the Cabaret Law licensing requirement.

The public page retained four claims that show Jamie acting:

- safety organizing for DIY venues;
- founding and organizer attribution within NYC Artist Coalition;
- speaking in the coalition-spearheaded Office of Nightlife town hall;
- Council testimony supporting commercial-rent protections.

Duplicated web-authorship copy was reduced, the work-card history was corrected
to `2017-Present`, and direct implementation language was softened from `built`
to `helped build` or `contributed` while component-level authorship remains an
open research inquiry.

## Iteration 3: atomic source knowledge

The source expansion now contains 31 proposition-level observations. Compound
statements were split so organizer attribution, publication-time signup count,
safety education, policy proposals, town-hall roles, campaign priorities,
legislative outcomes, and Jamie's testimony can be reused independently. Every
observation has a locator, limitation, and claim or inquiry relationship.

The resulting bank contains:

- 10 new source records;
- 31 new observations;
- 8 new bounded claims;
- 3 selected claims and 5 held claims;
- 1 new open component-authorship inquiry;
- no private source locator or protected evidence in the public registry.

## Eval result

Deterministic knowledge-bank score: **5.00 / 5.00**.

Two consecutive fresh judges accepted the final candidate:

| Suite | Judge C | Judge D | Target | Floors |
| --- | ---: | ---: | ---: | --- |
| Knowledge-bank maturation | 4.90 | 5.00 | 4.50 | all met |
| Launch readiness | 4.40 | 4.40 | 4.20 | all met |

No launch criterion regressed from the accepted run. Reader burden remains the
lowest criterion at 3/5, its configured floor; the four-claim public selection
was retained because it establishes a concise role chronology without
publishing all mature depth.

## Verification

- Node `v26.5.0` clean install: passed.
- `npm run check`: passed.
- `npm run preflight:staging`: passed with explicit noindex behavior.
- `npm run preflight:production`: passed with explicit index opt-in.
- `npm audit --omit=dev --audit-level=high`: passed; two moderate PostCSS
  advisories remain nested under Next.js, and npm's proposed forced fix is a
  breaking framework downgrade.
- Responsive browser QA: 55 route/viewport combinations passed at 320, 375,
  768, 1024, and 1440 px with one H1, no horizontal overflow, and no console
  errors.
- FairRentNYC citation QA: seven noterefs, one endnotes section, seven ordered
  source notes, seven backlinks, collapsed publication boundaries, and no held
  outcome projection rendered.
- Keyboard QA: the first Tab stop is `Skip to content`, targeting `#main`.
- Staging Docker build: passed on Node 26.
- Container smoke: health returned `ok`, FairRentNYC returned 200 with
  `X-Robots-Tag: noindex, nofollow`, robots disallowed crawling, and sitemap
  remained noindex.

Generated reports:

- `reports/generated/knowledge-bank-maturation.md`
- `reports/generated/citations.md`

## Decision

Accept the iteration. The bank gained factual depth and future recomposition
range while the public page became more selective, more source-backed, and
more direct about Jamie's role. The next research priority remains public Git
history or collaborator proof for component-level campaign-web authorship.
