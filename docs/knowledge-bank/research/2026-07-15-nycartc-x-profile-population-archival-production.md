# NYC Artist Coalition X profile-population archival production

Reviewed July 15, 2026.

## Answer first

The authenticated public-interface review gives every one of the 5,124 objects
reported by the `@NYCArtC` profile a disposition. It recovered 3,123 unique
public status records and records the remaining 2,001 profile-counted slots as
`not-materialized-public-interface`.

This is 100% disposition coverage, not literal recovery of 100% of the source
records. X documents an 800-post Posts display limit, a 3,200-post Posts and
replies display limit, and older-post indexing constraints. X directs account
owners to the X Archive to browse from the first post. The 2,001 unresolved
slots therefore remain **not recovered**, not deleted, absent, or nonexistent.

## What was reviewed

- exhausted authenticated Posts and Posts-and-replies timelines;
- yearly authenticated Latest searches for statuses authored by `@NYCArtC`;
- a bounded incoming-mention search for post-2020 stakeholder evidence;
- the existing strict historical NYC Council-member interaction review;
- every posted URL, mention, hashtag, source-account handle, relationship type,
  bounded mission label, and access-time interaction label visible in the
  recovered corpus.

The public census excludes full post bodies, private messages, follower
identities, cookies, credentials, account-recovery information, and session
state. Expanded URL query strings are removed while the publicly posted short
URLs and destination paths remain available for source recovery.

## Population reconciliation

| Population measure | Count |
| --- | ---: |
| Profile-reported objects | 5,124 |
| Recovered public-interface records | 3,123 |
| Recovered share of profile counter | 60.9% |
| Not materialized through the public interface | 2,001 |
| Disposition-ledger rows | 5,124 |
| Disposition coverage | 100% |

The recovered 3,123 records partition into 608 coalition-account originals, 77
coalition-account replies, and 2,438 external source statuses surfaced through
native repost cards. The 685 originals and replies are account-authored source
statuses. The corpus does not identify which collaborator authored any given
shared-account status.

For native reposts, X exposes the external source status's date and interaction
labels rather than the date or traction of the coalition account's repost. The
repost population therefore documents **curation**, not reciprocal engagement
from the 623 source accounts and not a dated account-activity series.

## What the account documents

The profile and recovered corpus support a durable umbrella-identity finding.
The account carries four named campaign identities: `#SaveNYCSpaces`,
`#LetNYCDance`, `#TalksNotRaids`, and `#FairRentNYC`. Repeated functions in the
record include campaign calls to action, hearing mobilization, arts-labor and
independent-venue resources, commercial-rent advocacy, nightlife-governance
follow-through, collaborator amplification, and mission-relevant source
curation.

Deterministic, overlapping subject labels identify 477 FairRentNYC records, 192
Save NYC Spaces records, 97 Let NYC Dance records, 62 Talks Not Raids records,
57 nightlife-governance records, and 98 artist-labor records. These are corpus
classifications, not unique campaigns, human-authorship assignments, outcome
counts, or proof of Jamie's personal authorship.

The most frequent recovered source authors after `@NYCArtC` include Olympia
Kazi, Future of Music Coalition, United for Small Business NYC, Music Workers
Alliance, Street Vendor Project, and Artist Studio Affordability Project.
Their appearance shows what the coalition account curated. It does not establish
that those accounts engaged with Jamie or the coalition.

## Posted URLs and public source trail

The recovered corpus contains 1,451 external-link occurrences in 1,339 records,
representing 1,161 distinct posted short URLs. Mission-relevant specimens
include:

- Gothamist reporting on the pending Cabaret Law repeal, including Olympia
  Kazi's public comments as a NYC Artist Coalition member;
- the Mayor's Office of Media and Entertainment MARCH reporting page;
- Gothamist reporting on Commercial Rent Stabilization after the pandemic;
- The Nation and Gothamist reporting on music-worker pandemic relief;
- Future of Music Coalition's concert-ticketing policy explainer;
- reporting and public resources concerning independent cultural spaces,
  nightlife governance, artist labor, storefronts, and public cultural policy.

A posted link establishes source circulation through the recovered account
surface. It does not by itself establish agreement, coalition participation,
Jamie-specific authorship, or causality for the linked event or policy outcome.

## Stakeholder engagement

The strict historical Council-member review remains the defensible public
floor: at least five then-serving New York City Council member accounts made 15
recoverable direct mentions of or replies to `@NYCArtC`. The accounts were
Rafael Espinal, Stephen Levin, Jimmy Van Bramer, Mark Levine, and Justin
Brannan. This is a recoverable minimum, not a complete historical total or
evidence of endorsement, adoption, legislative authorship, or policy causality.

A separate post-2020 incoming-mention query rendered 98 records from 43 authors.
Seventy-five records from 34 authors directly matched `@NYCArtC`; 23 additional
records were retained only as surrounding conversation context. The bounded
set includes public examples in which TakeRoot Justice named NYC Artist
Coalition among small-business partners, United for Small Business NYC named
the coalition among commercial-rent speak-out cohosts, and FY_EYE circulated
FairRentNYC through its public-service-announcement network. It adds no new
then-serving Council account to the strict historical minimum.

Olympia Kazi authored 89 of 526 results in the broader February 2017-March 2025
mention search and 15 of the 75 direct matches in the narrower post-2020 query.
The two counts have different windows and denominators; neither assigns her
authorship of coalition-account statuses.

## Access-time interaction snapshot

At access time, 618 of the 685 coalition-account-authored statuses displayed at
least one reply, repost, or like. Their displayed labels summed to 118 replies,
1,490 reposts, and 2,698 likes, or 4,306 interaction units under that narrow
arithmetic. The snapshot is retained for reproducibility, not promoted as a
portfolio metric. The labels are mutable and do not represent unique people,
complete historical reach, conversion, endorsement, participation, or impact.

## Portfolio decision

The public case study may use two bounded claims:

1. `@NYCArtC` operated as a durable shared public identity carrying four named
   cultural-space campaigns across a 5,124-slot archive ledger.
2. A strict review recovered at least 15 direct mentions or replies from five
   then-serving Council-member accounts.

Both claims must retain the shared-authorship, public-interface, endorsement,
and causality boundaries. Jamie's statement that he established the account and
identity system remains a first-person memory lead until independent account-
creation or collaborator evidence is recovered. His separately governed
co-founder and campaign-web authorship claims do not make him the author of all
685 account-authored statuses or the sole owner of collective outcomes.

## Artifacts

- `data/nycartc-x-profile-population-census-2026-07-15.csv`: 5,124-row public
  disposition ledger, excluding raw post bodies.
- `data/nycartc-x-profile-population-summary-2026-07-15.json`: methods, totals,
  classifications, URL inventory, stakeholder findings, and boundaries.
- `scripts/research/build-nycartc-x-census.mjs`: deterministic builder from the
  protected authenticated capture.

Literal source-record recovery remains open until Jamie's owner X Archive is
obtained and compared with this public-interface census.
