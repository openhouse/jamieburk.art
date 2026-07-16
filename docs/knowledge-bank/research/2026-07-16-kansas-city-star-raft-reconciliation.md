# Kansas City Star raft feature reconciliation and change report

Date: 2026-07-16

Pull request: [feature/evals-K, PR #217](https://github.com/openhouse/jamieburk.art/pull/217)

## Executive disposition

The supplied two-page scan is a preservation copy of a source already present
in the knowledge bank: Darryl Levings, "In the name of art, go with the flow,"
*The Kansas City Star*, November 15, 2007, pages A1 and A4.

This pass did not create a duplicate source or publish the article. It recorded
the new intake as an explicit duplicate, reconciled the pages with the existing
source, preserved three additional atomic observations, strengthened collective
credit and endpoint boundaries, added a completed research task and regression
test, and retained the existing decision not to project the claim onto the
current website.

## Artifact inspection

- Confirmed a two-page, unencrypted PDF containing pages A1 and A4.
- Confirmed title, author, publication, date, pagination, captions, and article
  continuation visually.
- Confirmed that the scan has no usable text layer. Machine extraction returned
  no article text, so no OCR output was treated as ground truth.
- Rendered and close-read the page images for consequential claims.
- Matched the supplied copy to SHA-256
  `8e9821ddccffc062983e3cf38f5a6080a1a5d1ee0cf1d0ff2b38b5ff40b17cd3`.
- Kept the raw copyrighted PDF, rendered pages, and any derived text outside the
  public repository.

## What the article supports

The article directly supports the following bounded observations:

1. The documented traveling crew at that stage was James Burkart, Libby Hendon,
   and Laura Mattingly.
2. The three-person expedition had traveled more than 1,000 miles from Kansas
   City into Louisiana.
3. The article describes the project as beginning with Jamie's idea.
4. The crew modified the raft, obtained legal assistance in Vicksburg, and
   resumed after a regulatory pause.
5. Jamie framed the river as overlooked civic space and as a cultural
   connection between Kansas City's West Bottoms and Delta towns.
6. The reported project title, *Release Yourself onto the Water until It Tastes
   of Salt*, expressed a saltwater aspiration.

## What the article does not establish

- Jamie alone conceived, built, operated, or completed every part of the
  expedition.
- The three named travelers are the complete roster of builders, supporters,
  hosts, legal helpers, or other participants.
- Responsibility was equal or fully allocated among the named crew.
- The raft reached the Gulf of Mexico or salt water.
- The project title proves endpoint completion.
- The project produced measured civic or cultural impact.

## Repository changes

### Intake and preservation

- Added append-only receipt
  `LEAD-WATERWAYS-KC-STAR-RAFT-RECONCILIATION-20260716`.
- Marked it as a duplicate of `LEAD-WATERWAYS-RAFT-ROUTE-ARCHIVE`.
- Reused protected locator
  `ARCHIVE-WATERWAYS-KC-STAR-RAFT-2007-001` rather than exposing a filesystem
  path or creating a second source.
- Added the corresponding extracted lifecycle lead and connected it to the
  existing project, source, candidates, and reconciliation task.
- Added chained integrity checkpoint
  `CHECKPOINT-WATERWAYS-KC-STAR-RECONCILIATION-2026-07-16-J` to bind the updated
  append-only intake ledger.

### Source and observations

- Re-reviewed canonical source
  `SRC-WATERWAYS-KANSAS-CITY-STAR-RAFT-2007` on 2026-07-16.
- Expanded its general support and non-support boundaries while preserving
  `public-metadata-only` visibility.
- Added `OBS-KC-STAR-RAFT-COLLECTIVE-IDENTITY-2007` for the named traveling
  crew and explicit incomplete-roster boundary.
- Added `OBS-KC-STAR-RAFT-CIVIC-CULTURAL-FRAMING-2007` for Jamie's river-as-
  civic-and-cultural-space framing.
- Added `OBS-KC-STAR-RAFT-SALTWATER-TITLE-BOUNDARY-2007` to preserve the
  project title as aspiration while preventing it from becoming endpoint proof.

### Claims and research

- Connected the collective-identity and civic-framing observations to promoted
  candidate `CND-WATERWAYS-RAFT-EXPEDITION`.
- Connected the title-boundary observation to held candidate
  `CND-WATERWAYS-RAFT-GULF-ENDPOINT`.
- Strengthened the Gulf candidate's boundary and anti-claim language.
- Updated canonical claim `CLM-WATERWAYS-RAFT-EXPEDITION-2007` with named-crew
  support, title-versus-endpoint guidance, and a 2026-07-16 review record.
- Added completed research task
  `TASK-WATERWAYS-KC-STAR-RECONCILIATION-2026-07-16` with methods, findings,
  limitations, and next actions.
- Left the existing Louisiana-route correction in force. No new promotion or
  correction decision was needed because the strongest canonical assertion did
  not change.

### Regression protection

- Added a lifecycle regression test requiring the preservation copy to remain:
  deduplicated; linked to the protected source; decomposed into three bounded
  observations; collective in its credit; held at the Gulf endpoint; and absent
  from public projection.

### Website decision

- No website copy, page, route, citation marker, asset, or visual treatment was
  changed.
- The canonical waterways projection remains `hold` with no public surfaces.
- No `/proofs`, `/knowledge-bank`, `/public-claims`, or archive route was added.
- A future waterways composition may use these observations only after an
  audience brief and exact-surface human approval select them.

## Recursive eval history

### Pass 1: integrated lifecycle

- The lifecycle graph passed with the duplicate receipt, lead, observations,
  source changes, candidate relationships, research task, and integrity
  checkpoint.
- All 52 existing lifecycle tests passed.
- Review identified one remaining weakness: the article-specific behavior was
  valid but lacked its own regression test.

### Pass 2: mutation-resistant lifecycle

- Added the article-specific regression test.
- Lifecycle validation passed again.
- All 53 lifecycle tests passed, including the new deduplication,
  decomposition, public-safety, collective-credit, endpoint, and projection
  assertions.

### Full repository gate

`npm run check` passed under Node 26. The gate included:

- Chad, Margaret Morse, and Warren Sack lens contracts;
- citation validation and 14 citation tests;
- six eval-runner tests;
- lifecycle validation and 53 lifecycle tests;
- social-archive validation;
- NYC Artist Coalition X: 100/100;
- Urbanhermit X: 100/100;
- NYC Artist Coalition Facebook events: 100/100;
- NYC Artist Coalition Facebook posts: 100/100;
- KC Spaces Fund Facebook posts: 100/100;
- personal Facebook posts: 100/100;
- personal and WOW List Facebook events: 100/100;
- Call Script bridge: 100/100;
- DCLA and Council bridge: 100/100;
- portfolio blind-spot governance: 100/100, with external closure honestly still
  open;
- WOW List Facebook tests;
- all 42 route-and-viewport visual observations and 24 source-bound captures;
- TypeScript, ESLint, and the Next.js production build;
- compiled-lifecycle leak detection across 42 protected locators;
- knowledge-bank, public-safety, and route checks.

The knowledge-bank and public-safety commands repeated 11 existing `Careful`
claim warnings. Those warnings require their guardrails to remain attached and
did not indicate a failure in this change.

Dependency installation from the existing lockfile reported two moderate npm
advisories and pending install-script review notices for `sharp` and
`unrs-resolver`. This pass did not modify dependencies or the lockfile.

## Files changed

- `apps/www/src/data/knowledge-bank/lifecycle-records.ts`
- `apps/www/src/data/knowledge-bank/records.ts`
- `docs/knowledge-bank/intake/receipts.jsonl`
- `docs/knowledge-bank/governance/integrity-checkpoints.jsonl`
- `scripts/tests/knowledge-lifecycle.test.mjs`
- `docs/knowledge-bank/research/2026-07-16-kansas-city-star-raft-reconciliation.md`

## Remaining research

The exact Gulf endpoint remains unresolved. Reopen that question only for an
endpoint-specific route log, geolocated record, contemporaneous report, or
bounded participant corroboration. Future collaborator accounts can also
clarify construction, operating, hosting, support, and project-title roles.

The substantial confirmed record does not depend on resolving those questions:
Jamie initiated and organized the experiential premise for a collective,
recycled-material, bicycle-powered raft expedition that traveled more than
1,000 miles from Kansas City into Louisiana, adapted during a regulatory pause,
and treated the river as civic and cultural space.
