# CallNYC Full-Population Archival Production

Run date: 2026-07-12

## Answer First

The live [@CallNYCapp profile](https://x.com/CallNYCapp) displays **110 posts**.
A fine-grained authenticated pass through both the Posts and Replies timelines
recovered and classified **107 distinct surviving records**:

- 86 authored standalone posts;
- 6 authored replies;
- 15 reposts from 14 other public accounts.

The [110-slot census](callnyc-post-census-2026-07-12.csv) accounts for the full
profile control: 107 recovered records plus three explicitly unresolved slots.
It is a complete accounting of the control population, but not a false claim
that all 110 post contents were recovered. Resolving the final three requires an
official account export or an equivalent record-level source.

## Population Definition

For this pass, the population is the 110-post count displayed by X on July 12,
2026. A recovered record is a unique status ID rendered in the account's Posts
or Replies timeline or recovered through a corroborating authenticated search.

Reposts are part of the account's publication history but retain the original
author's status ID and authorship. Quoted posts authored by CallNYC remain
CallNYC-authored records. The ledger does not reproduce full post text; it
preserves URL, date, type, account, mentions, hashtags, and editorial category.

## Method

1. Read the live profile control total and account metadata.
2. Harvested Posts and Replies separately in 650-pixel increments so X's
   virtualized interface could not skip large regions between reads.
3. Deduplicated every rendered record by primary status ID.
4. Reconciled the timelines against authenticated from-account searches and
   month-bounded searches from March through November 2016.
5. Queried Wayback CDX for desktop Twitter, mobile Twitter, and X status URLs.
6. Checked locally preserved public profile and status captures.
7. Classified every recovered record and retained the three-record control gap
   instead of assigning unsupported IDs, dates, authorship, or content.

## What The Population Shows

### Repeated resident-facing translation

**Seventy-two of the 92 CallNYC-authored records** translate constituent-service
data into issue-specific recognition messages. Those records name **26 distinct
then-sitting Council members** across **66 service-issue hashtag labels** and
generally connect the recognition to a specific CallNYC resident pathway.

The named members are Ben Kallos, Brad Lander, Chaim Deutsch, Margaret Chin,
Ruben Wills, Carlos Menchaca, Mathieu Eugene, Peter Koo, Antonio Reynoso, Daniel
Dromm, Elizabeth Crowley, Fernando Cabrera, Helen Rosenthal, I. Daneek Miller,
Jimmy Van Bramer, Julissa Ferreras-Copeland, Mark Treyger, Melissa
Mark-Viverito, David Greenfield, Ritchie Torres, Rafael Espinal, Rosie Mendez,
Stephen Levin, Steven Matteo, Vanessa Gibson, and Ydanis Rodriguez.

Issue labels span housing maintenance, eviction, rent freezes, affordable
housing, food assistance, immigration, Medicaid, legal services, transit,
street conditions, sanitation, parks, utilities, voting information, and other
resident needs. Some posts carry multiple labels and some labels recur, so 66
is a label count rather than a count of mutually exclusive programs.

### Product and implementation evidence

The non-recognition authored records document a product evolving in public:

- launch of the first project using the released Council constituent-services
  data;
- a district-profile API exposing office name, phone, email, Twitter, and
  service information;
- issue-page buttons that let residents contact Council members directly;
- public accounting of Council-member Twitter coverage;
- explanation that the recognitions were based on CouncilStat open data;
- links to anti-eviction legal services, rent-stabilization events, and other
  resident resources;
- participation in civic-technology discussions about responsive government,
  open data, and resident feedback.

This supports a stronger professional reading of CallNYC: Jamie did not stop at
a one-time visualization. He built and iterated a resident-facing interpretation
layer, then used its public identity to repeatedly connect data, offices, issue
pathways, and feedback.

### Public context and continuity

The 15 reposts preserve selected context from civic technologists, Civic Hall,
the Mayor's Office, Gothamist, Council members and staff, and WOWList. The final
two surviving records are WOWList reposts from November 2016, showing continuity
between two project identities Jamie established.

## Temporal Distribution

| Month | Authored records | Authored replies | Service recognitions | Reposts |
| --- | ---: | ---: | ---: | ---: |
| 2016-03 | 8 | 2 | 1 | 2 |
| 2016-04 | 25 | 1 | 24 | 1 |
| 2016-05 | 48 | 3 | 36 | 8 |
| 2016-06 | 4 | 0 | 4 | 0 |
| 2016-07 | 2 | 0 | 2 | 0 |
| 2016-08 | 0 | 0 | 0 | 0 |
| 2016-09 | 3 | 0 | 3 | 1 |
| 2016-10 | 2 | 0 | 2 | 1 |
| 2016-11 | 0 | 0 | 0 | 2 |

Recovered CallNYC-authored activity runs from March 5 through October 4, 2016.
Repost activity extends through November 14, 2016.

## Claim Boundaries

- The 107 records are the complete recovered surviving timeline, not all 110
  profile-counted contents.
- The three-record gap is unresolved. The available evidence does not establish
  that those records were deleted.
- Outbound recognition of 26 Council members does not mean 26 members engaged
  directly with the account. Direct engagement remains separately counted and
  source-backed.
- Service-recognition posts communicate CallNYC's data interpretation. They are
  not an independent audit of Council-office performance.
- Current reaction totals and impressions are not used as historical reach
  measures.

## Editorial Disposition

The population materially strengthens the bank's account of Jamie's product,
implementation, public-data translation, and feedback-loop practice. It does
not require adding a timeline, social dashboard, or extra metric to the current
site. The public portfolio should draw on this depth when the audience or role
makes the pattern useful.
