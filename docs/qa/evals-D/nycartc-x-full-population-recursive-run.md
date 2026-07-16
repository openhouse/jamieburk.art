# NYC Artist Coalition X full-population recursive run

Date: 2026-07-15  
Suite: `jamieburk-art-launch-readiness` v13  
Final candidate: `36b6980cd1cc5ac24ad5a069c61d4284e9331833`

## Archival result

The production assigns every slot in the dated `@NYCArtC` profile control a
durable disposition without calling the result a complete account export:

| Measure | Result |
| --- | ---: |
| Dated profile-count slots | 5,124 |
| Item-level public recoveries | 3,367 |
| Unresolved historical slots | 1,757 |
| Account-authored statuses among recoveries | 715 |
| Reposts among recoveries | 2,652 |
| Posted-link occurrences | 1,772 |
| Unique outbound URLs | 1,241 |
| Bounded inbound records | 501 |
| Distinct inbound accounts | 178 |

The inbound ledger preserves 347 explicit mentions and 154 search or thread
contexts. It includes a floor of 24 records from at least seven then-serving
Council-member accounts, 16 city-agency-account records, and 235 records from
identified coalition, civic, or cultural partners. These are account-level
public-exchange records, not official endorsement, reach, impact, attendance,
policy causality, or post-level authorship by Jamie.

Eight mission-relevant articles were close-read into source records. Three
new atomic claims were decomposed with evidence relationships, locators,
limitations, and anti-claims. All three remain held with no public surfaces.
Literal item-level completion remains an open inquiry requiring a privacy-safe
first-party owner archive.

## Recursive hill climb

The first independent pair passed every semantic criterion except editorial
judgment. Grader A1 scored `EDITORIAL-001` at `0.74`, finding that repeated
shared-account boundaries made the public argument compete with its evidence
tail.

1. Consolidated repeated CallNYC and FairRentNYC account boundaries. The
   targeted citation test initially caught an overbroad omission and forced a
   narrower source-specific declaration. Editorial rose to `0.84` for A1.
2. A2 then scored `DECOMP-001` at `0.78`: the new population claim was formally
   held, but its core figures still reached FairRentNYC through a source note.
   The source note was narrowed, and the exact rendered page was verified to
   contain none of `5,124`, `3,367`, or `1,757`.
3. A1 next scored `EDITORIAL-001` at `0.76`, identifying repeated KC Town Hall
   funding and status language across the opening, narrative, notes, and final
   evidence summary. The page summary was recomposed, common municipal limits
   were consolidated, and source-specific limitations remained attached.

Four final independent graders scored all five agent-mutable semantic criteria
at or above `0.8`:

| Grader | Clarity | Chad | Decomposition | Editorial | Voice |
| --- | ---: | ---: | ---: | ---: | ---: |
| A1, hiring and delivery | 0.90 | 0.88 | 0.87 | 0.82 | 0.84 |
| A2, public evidence | 0.93 | 0.90 | 0.95 | 0.84 | 0.88 |
| B1, information architecture | 0.93 | 0.91 | 0.90 | 0.84 | 0.86 |
| B2, TPM hiring | 0.94 | 0.92 | 0.93 | 0.87 | 0.90 |

The change was accepted because the lowest mutable score rose from `0.74` to
`0.82` without regressing deterministic, public-safety, citation, build,
responsive, accessibility, or artifact gates.

## Exact-candidate verification

- `npm run check`: passed, including typecheck, lint, production build,
  citation tests, knowledge-bank checks, public safety, and route checks.
- Eleven routes returned `200` at desktop and mobile widths with zero
  horizontal overflow.
- Eleven routes passed 200-percent-equivalent reflow with zero overflow.
- Twenty-four of twenty-four traversed controls exposed visible focus,
  including thirteen citation links.
- CallNYC and FairRentNYC citation targets and backlinks worked.
- Six priority-artifact observations passed across HJE, FairRentNYC, and
  CallNYC at 375 and 1440 pixels.
- The deterministic `NYCARTC-001` gate recomputed the population, link,
  stakeholder, source, claim-hold, privacy, and local-path boundaries.
- Both v13 observation files pass every agent-observed criterion for the exact
  candidate.

## Stop boundary

The recursive protocol stops at the remaining runtime and human gates.
`RELEASE-001`, `APPROVAL-001`, and `APPLICATION-001` were not self-certified.
A local production build cannot prove the deployed production SHA, and an
agent cannot grant Jamie's publication or application approvals.
