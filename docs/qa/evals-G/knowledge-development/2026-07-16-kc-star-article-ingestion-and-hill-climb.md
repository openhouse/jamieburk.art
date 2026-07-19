# Kansas City Star Article Ingestion and Eval Hill Climb

Date: July 16, 2026

Branch: `feature/evals-G`

Pull request: [#222](https://github.com/openhouse/jamieburk.art/pull/222)

Source reviewed: Darryl Levings, "In the name of art, go with the flow," *The
Kansas City Star*, November 15, 2007, pp. A1, A4.

## Result

The user-supplied two-page newspaper PDF has been close-read and integrated as
a protected-pointer capture, a metadata-only source, six atomic observations,
two new bounded claims, and corroborating evidence for two existing claims.

The strongest newly defensible wording is:

> Jamie originated, co-created, and traveled on a participatory
> recycled-material raft expedition that covered more than 1,000 miles from
> Kansas City down the Missouri and Mississippi Rivers into Louisiana.

This wording is held in the knowledge bank as a future feature candidate. It
has not been projected onto the current website.

## Artifact Review

I performed the following source work:

1. Inspected the PDF's file and document metadata.
2. Extracted its two-page text while preserving newspaper column layout.
3. Rendered and visually inspected both pages to verify headline, placement,
   page continuation, captions, byline, and photo credits.
4. Compared the article against existing waterways records from *The Pitch*,
   Soundings, and 9NEWS.
5. Decomposed the source into atomic observations before changing any claim.
6. Kept the PDF, page images, private locator, and copyrighted article text
   outside Git.

The reviewed artifact is a two-page newspaper feature published while the
expedition was underway. The article appears on page A1 and continues on page
A4. The front-page photograph is credited to Joshua Corban of *The Vicksburg
Post*. Continuation-page photographs are credited to Brian Loden and Joshua
Corban of *The Vicksburg Post*. No image-reuse rights or depicted-person consent
were established in this pass.

## Evidence Encoded

### Capture

Added `CAP-WATERWAYS-KC-STAR-ARTICLE-2026` as an integrated artifact capture
with `protected-pointer` public safety. It records the source's research value
without exposing the local file.

### Source

Added `SRC-WATERWAYS-KC-STAR-2007-11-15` with:

- bibliographic metadata for the article;
- `public-metadata-only` visibility;
- private preservation status;
- no canonical, archive, asset, or local URL;
- an opaque protected locator;
- unknown rights, consent review required, and metadata-only display status;
- explicit lists of what the article supports and does not establish.

### Observations

Added six located and limited observations:

1. `OBS-WATERWAYS-KCSTAR-FRONT-PAGE` records A1 placement and A4 continuation.
2. `OBS-WATERWAYS-KCSTAR-ORIGIN` records the article's attribution of the
   originating expedition idea to Jamie.
3. `OBS-WATERWAYS-KCSTAR-SCALE-AND-ROUTE` records the three-person crew at the
   reported stage, more than 1,000 miles, travel south of Baton Rouge, raft
   dimensions and mechanics, and discarded-material construction.
4. `OBS-WATERWAYS-KCSTAR-PARTICIPATORY-METHOD` records the lived-experience
   purpose, friends joining for route segments, and Jamie inviting people
   aboard.
5. `OBS-WATERWAYS-KCSTAR-INTERRUPTION-AND-RESUMPTION` records the 51-day
   Vicksburg interruption, community support, repair, safety additions, and
   resumption.
6. `OBS-WATERWAYS-KCSTAR-CULTURAL-CONNECTION` records Jamie's contemporaneous
   interpretation of the river as a possible cultural connection between the
   West Bottoms and Delta communities.

Each observation includes a page-level locator, confidence, limitations, and
the claim IDs it supports.

## Claims Changed

### Existing claims strengthened

`CLM-WATERWAYS-EXPEDITION-CONCEPTION` moved from `sourced` to `corroborated`.
Two independent contemporary reports now support Jamie's originating role.
The claim still protects collective construction, travel, repair, and
participation.

`CLM-WATERWAYS-RAFT-EXPEDITION-SCALE` now states that Jamie originated,
co-created, and traveled on the expedition for more than 1,000 miles into
Louisiana. The Kansas City Star source and four new observations were added to
its evidence path. Its case-study projection remains on hold.

### New claims

`CLM-WATERWAYS-PARTICIPATORY-RIVER-METHOD` records the expedition as a
participatory inquiry into river systems, lived experience, invitation, and
cultural connection. It is corroborated, public-safe, and a future feature
candidate, but its case-study projection is held.

`CLM-WATERWAYS-KCSTAR-FRONT-PAGE-COVERAGE` records A1 placement and A4
continuation. It is sourced, public-safe, and a future feature candidate, but
its case-study projection is held.

### Research task updated

`RT-WATERWAYS-GULF-ENDPOINT-CORROBORATION` now includes the new capture and
source. The article strengthens the route through Louisiana but was written
while the voyage was still underway, so it cannot close the endpoint task.

## Boundaries Preserved

The repository now explicitly prevents the following overstatements:

- Jamie alone built, operated, or completed the expedition;
- the reviewed sources establish arrival at salt water or the Gulf of Mexico;
- more than 1,000 reported miles constitute a complete route log;
- front-page coverage constitutes endorsement, audience reach, conversion, or
  cultural impact;
- the article establishes every participant or division of labor;
- the newspaper scan or credited photographs are cleared for public display;
- Jamie's cultural-connection purpose proves a measured community outcome.

The public-safe metadata contains no local paths, filenames, contact details,
raw article transcript, or authenticated state.

## Editorial and Website Decision

No website copy, route, image, or citation was added in this pass. The source
substantially strengthens the knowledge bank, but the waterways work remains a
future feature candidate pending a purpose-specific editorial decision, fuller
participant and route reconstruction, and visual-rights review.

No `/proofs`, `/knowledge-bank`, or `/public-claims` page was created.

## Documentation Updated

The human-readable knowledge bank now:

- presents the two-source corroboration for Jamie's originating role;
- presents four contemporary reports for expedition scale;
- adds separate participatory-method and front-page-coverage sections;
- updates approved wording and anti-claims;
- updates the promotion slate while leaving site selection unchanged;
- records the article as a July 16 metadata-only addition, separate from the
  July 14 Teams archive pass.

## Tests Added and Changed

The raft regression test now verifies:

- `originated, co-created, and traveled` wording;
- travel into Louisiana;
- the Kansas City Star evidence relationship;
- the still-open Gulf task and held site projection.

A new source-specific regression test verifies:

- protected-pointer capture status;
- metadata-only/private source status;
- absence of public and local locators;
- unknown rights and required consent review;
- exactly six source observations;
- corroborated conception and method claims;
- held case-study projections;
- explicit Gulf, endorsement, reach, impact, and rights boundaries;
- absence of local paths, filenames, email addresses, and phone numbers.

## Recursive Eval Result

Baseline before ingestion:

- weighted local score: `0.88`;
- candidate fingerprint:
  `9972527ff61604efad974417666657d5dc8f45ec1b45666113806ce09ea6fa51`;
- 73 captures, 246 sources, 325 observations, and 88 development claims;
- local criteria met with no validation errors.

Final frozen candidate:

- weighted local score: `0.88`, above the `0.85` threshold;
- candidate fingerprint:
  `556ec75dd28fb87f5e984e93fae2aea3752327e64c89167aa842dc00cc08b2d3`;
- 74 captures, 247 sources, 331 observations, 90 development claims, and 57
  research tasks;
- local criteria met with no local failures and zero validation errors;
- two consecutive passes produced the same fingerprint and result.

The score did not rise because the new evidence improved the corpus inside
already-passing local criteria rather than changing their rubric scores.

The following independent or human judgments remain honestly open:

- `KD-006`: collective credit and calibrated causality;
- `KD-012`: Chad's lens;
- `KD-015`: observed hiring-reader comprehension;
- `KD-018`: rights-cleared visual evidence edit;
- `KD-022`: independent Margaret Morse-lens judgment;
- `KD-023`: independent Warren Sack-lens judgment.

Local recursive optimization cannot grade itself as an independent reviewer or
manufacture human approval, so the overall `criteria_met` state remains false
while `local_criteria_met` is true.

## Verification

Completed successfully:

- focused knowledge-development test: 75 tests passed;
- two stable recursive local eval passes;
- citation registry and citation tests;
- portfolio and knowledge-development eval-schema checks;
- full knowledge, social-guard, and application-contract test suites;
- TypeScript typecheck;
- ESLint;
- Next.js production build with all expected routes;
- knowledge-bank validation;
- public-safety validation;
- route validation;
- `git diff --check`.

The first full-check attempt exposed a malformed generated `.next/dev` type
artifact. I moved that disposable build output aside and regenerated it. The
next sandboxed build reached production compilation but could not resolve the
configured Google Fonts because network access was blocked. The complete check
then passed with network access, including Karla and Oswald retrieval. Neither
issue required a source-code workaround.

The knowledge-bank and public-safety checks retain ten expected warnings for
existing `careful` claims whose guardrails must remain attached. They are not
failures and no warning was added by this source.

## Files Changed

- `apps/www/src/data/knowledge-bank/development-records.ts`
- `apps/www/src/data/knowledge-bank/teams-archive.ts`
- `docs/knowledge-bank/anti-claims.md`
- `docs/knowledge-bank/approval-register.md`
- `docs/knowledge-bank/claims.md`
- `docs/knowledge-bank/projects/teams-archive-production.md`
- `docs/knowledge-bank/projects/waterways-and-participatory-art.md`
- `docs/knowledge-bank/promotion-slate.md`
- `docs/knowledge-bank/sources.md`
- `scripts/tests/knowledge-development-evals.test.mjs`
- `docs/qa/evals-G/knowledge-development/kc-star-local-pass-1.json`
- `docs/qa/evals-G/knowledge-development/kc-star-local-pass-2.json`
- `docs/qa/evals-G/knowledge-development/README.md`
- this report.

## Open Work

1. Recover a dated source that establishes the final expedition endpoint, if
   one exists; keep intended destination distinct from achieved destination.
2. Reconstruct fuller participant and division-of-work credit.
3. Seek permission before using the newspaper pages or credited photographs.
4. Run fresh independent and human judgments on this exact candidate when that
   review is explicitly authorized and available.
5. Make a future editorial decision about whether a waterways case study helps
   the hiring argument of that moment.
