# NYC Artist Coalition X archival production

Date: 2026-07-15
Account: [@NYCArtC](https://x.com/NYCArtC)
Disposition: integrated into the repo-internal knowledge bank; new public-site projections remain held

## Population definition

The authenticated profile displayed 5,124 posts at review time. Three public
surfaces were reconciled by source-status ID: the Posts timeline, the Posts and
replies timeline, and bounded historical searches. The resulting ledger gives
every displayed profile-count slot one durable disposition.

| Disposition | Count |
| --- | ---: |
| Recovered account-authored statuses | 715 |
| Recovered native reposts | 2,652 |
| Recovered public items | 3,367 |
| Unresolved historical slots | 1,757 |
| **Total dated profile control** | **5,124** |

This is 100 percent disposition of the dated profile control. It is not 100
percent item-level recovery, a first-party export, or a deletion history. No
status ID, date, type, text, author, or deletion reason is inferred for an
unresolved slot.

The public-safe population ledger is
[`nycartc-public-post-ledger.json`](../data/nycartc-public-post-ledger.json).
It stores public status metadata, classifications, link metadata, aggregate
counts, and content digests. It excludes raw post text, direct messages,
contacts, private analytics, account settings, credentials, cookies, and
authenticated-session material.

## Mission patterns

The recovered population shows one shared coalition account carrying four
campaign identities across years: Let NYC Dance, Talks Not Raids, Save NYC
Spaces, and FairRentNYC. Campaign and issue classifications overlap; they are
navigation aids, not measures of participation or impact.

The account also functioned as a source-routing surface. The ledger retains
1,772 posted-link occurrences across 1,241 unique public URLs. A post or repost
is evidence that a source entered the account's public record. It does not
establish authorship of the source, agreement with every statement, readership,
conversion, reach, or policy impact.

Eight mission-relevant sources were close-read and normalized:

| Date | Source | Knowledge-bank use |
| --- | --- | --- |
| 2023-05-08 | [The New York Times, “They Helped New York Bounce Back. Now Their Rents Are Surging.”](https://www.nytimes.com/2023/05/08/nyregion/small-businesses-rent-hikes-nyc.html) | Commercial-rent pressure, neighborhood disparity, and public storefront data |
| 2023-06-09 | [Hell Gate, “Who Is Leading Raids on NYC Nightclubs?”](https://hellgatenyc.com/who-is-leading-raids-on-nyc-nightclubs/) | Renewed nightlife-enforcement and MARCH accountability questions |
| 2024-02-08 | [Hell Gate, “Lucy’s Is Being Evicted. Do the Landlords Care?”](https://hellgatenyc.com/lucys-east-village-evicted-do-the-landlords-care/) | Venue eviction and cultural-space displacement |
| 2024-02-22 | [Hell Gate, “Mayor Adams Said the Era of Nightlife Raids Was Over. So What Happened to Saint Vitus?”](https://hellgatenyc.com/saint-vitus-dob-nypd-nightlife-raid-shutdown/) | Nightlife-enforcement accountability after the announced CURE transition |
| 2025-10-03 | [Hell Gate, “Nightclub Raids Are on the Rise in 2025, Report Says”](https://hellgatenyc.com/cure-march-raids-2025-report/) | Later nightlife-inspection reporting and institutional-accountability context |
| 2026-02-20 | [City & State, “Socialists take aim at commercial rent”](https://www.cityandstateny.com/policy/2026/02/socialists-take-aim-commercial-rent/411572/) | State commercial-rent legislation and longer policy lineage |
| 2026-02-21 | [Bushwick Daily, “New Bill Seeks to Guarantee Lease Renewals for NYC Small Businesses”](https://bushwickdaily.com/news/new-bill-seeks-to-guarantee-lease-renewals-for-nyc-small-bus/) | Commercial-lease legislation and Olympia Kazi's continuing cultural-space advocacy |
| 2026-02-22 | [Gothamist, “New York lawmakers seek rent control to protect small businesses”](https://gothamist.com/news/new-york-lawmakers-seek-rent-control-to-protect-small-businesses) | Proposed rent guidelines, lease terms, and competing stakeholder positions |

These articles are contextual sources and research leads. Their appearance in
the account record does not make NYC Artist Coalition or Jamie their author,
nor does it prove that the account team endorsed every statement.

## Stakeholder exchange

A separate recoverable public-search pass retained 501 records from 178 public
accounts. It distinguishes 347 explicit `@NYCArtC` mentions from 154 records
that survive as search or thread context.

| Bounded stakeholder floor | Records | Accounts |
| --- | ---: | ---: |
| Contemporaneous Council-member accounts | 24 | at least 7 |
| New York City agency accounts | 16 | 2 |
| Identified coalition, civic, or cultural partners | 235 | 15 |

The public-safe engagement ledger is
[`nycartc-public-engagement-ledger.json`](../data/nycartc-public-engagement-ledger.json).
One-way tags by `@NYCArtC` are not counted as direct incoming exchange. Native
reposts are source circulation, not incoming engagement. The counts are floors,
not an endorsement claim, a complete historical census, or a measure of unique
people, reach, participation, adoption, or policy causality.

## Claims developed

- `CLM-NYCARTC-FULL-PROFILE-DISPOSITION`
- `CLM-NYCARTC-SOURCE-ROUTING-CONTINUITY`
- `CLM-NYCARTC-STAKEHOLDER-EXCHANGE-FLOOR`

All three remain held from new website projection. The existing FairRentNYC
case study already carries the reader-useful conclusions: the shared campaign
identity and the bounded Council-member-account interaction floor. The deeper
population and source network remain available for future compositions.

## Open completion task

Literal item-level completion requires a first-party archive from the
`@NYCArtC` account owner. No such archive was recovered in the current
accessible archive pass. Any future export must be transformed privately and
must exclude direct messages, contacts, private analytics, account settings,
credentials, cookies, advertising data, and other nonpublic fields before a
public-safe ledger is regenerated.
