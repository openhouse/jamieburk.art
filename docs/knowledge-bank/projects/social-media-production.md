# Project social-media archival production

Reviewed: 2026-07-14

## Confirmed account inventory

| Project or campaign family | Confirmed handle | Account role |
| --- | --- | --- |
| CallNYC | [@CallNYCApp](https://x.com/CallNYCApp) | Historical project account |
| NYC Artist Coalition, SaveNYCSpaces, LetNYCDance, TalksNotRaids, FairRentNYC | [@NYCArtC](https://x.com/NYCArtC) | Shared coalition and campaign account |
| WOW List | [@wowlist](https://x.com/wowlist) | Historical project account |

Project templates and an external 2015 mention also use `@WOWListNYC`. The
exact account-rename history was not recovered, so the knowledge bank treats it
as an unresolved historical reference rather than a confirmed alias.

No separate project Twitter account was confirmed in this pass for the other
current portfolio projects. That is a bounded inventory result, not proof that
no account ever existed.

## Method

The review used Jamie's authenticated in-app browser session. Public profile
metadata was recorded as a July 14, 2026 snapshot. Historical Latest searches
were traversed and deduplicated by status URL. Council Member engagement counts
include only posts authored by Council Member accounts; posts that merely tag
an official, resident comments, likes, deleted posts, private activity, and
unrecoverable native reposts are excluded.

For `@CallNYCApp`, both the Posts and Replies tabs were traversed to the March
2016 beginning and through repeated no-growth passes. The Posts tab yielded 106
unique status records; the Replies tab yielded 107; their union was 107. The
profile reported 110 posts. The review therefore covers 100% of the retrievable
public population, not 100% of the profile counter: three profile-counted
records did not materialize and remain an open recovery task. Each fixture row
records whether it materialized in Posts, Replies, or both. Three status links
nested inside quoted-post cards were excluded from the primary-record
population.

The public metadata-only capture inventory is stored at
`apps/www/src/data/knowledge-bank/fixtures/social-media-capture-inventory.json`.
It preserves status URLs, dates, author handles, and original/repost
classification where applicable. Post text and authenticated-session state are
not stored in the fixture.

The dedicated CallNYC population fixture is stored at
`apps/www/src/data/knowledge-bank/fixtures/callnyc-full-population.json`. It
preserves metadata for all 107 retrievable records and every posted external
URL while excluding post text, cookies, private account state, and session
data.

For `@wowlist`, both Posts and Replies were likewise traversed to their
February 2014 beginning and through repeated no-growth passes. Posts yielded
37 unique primary records. Replies yielded 38, adding one project-account
reply that appeared only on that surface. Their 38-record union exactly
reconciles to the profile counter. The dedicated public-safe fixture at
`apps/www/src/data/knowledge-bank/fixtures/wowlist-full-population.json`
preserves record provenance, all posted-link metadata, bounded incoming-search
classifications, and dated aggregate interaction context without post text or
authenticated-session state.

## Findings

### CallNYC

The 107 recovered records span March 5-November 14, 2016: 86 originals, 6
replies, and 15 reposts. Ninety-two were authored by `@CallNYCApp`.

Across those authored posts, 71 issue-specific recognition posts credited 26
distinct Council-member handles. The account posted 75 CallNYC deep-link
occurrences representing 62 distinct issue or API paths across 16 service
domains plus the API. This recurring structure connected an issue, a Council
office, recognition, and a usable service pathway. The handle count describes
what CallNYC published; it is not a count of officials who engaged.

Across the full recovered population, 94 records contained external links and
84 distinct short URLs were inventoried. Mission-relevant sources included:

- direct CallNYC coverage in Politico;
- official service guidance including NYC's Rent Freeze program;
- civic-technology peers including Councilmatic, the New York Tech Working
  Group, Council Labs, and BetaNYC;
- open-data work such as the renter-facing 311 tool covered by Gizmodo; and
- issue reporting such as Gothamist's Pulaski Bridge bike-path coverage.

The bounded incoming-mention search yielded 11 public records: four Council-
office posts, two legal-services posts, two resident posts, two civic-
technology posts, and one incidental network mention. Separately, the account
timeline preserved five Council-authored engagement records as reposts. Peter
Koo appears in both sets; the other four timeline records add Mathieu Eugene,
Helen Rosenthal, Rosie Mendez, and Ydanis Rodriguez, producing the eight-
account union below.

The timeline also preserved a May 2016 repost authored by `@CarlinaRivera`.
It is not counted as Council-member engagement because Rivera was not serving
as a Council Member at the time of that record.

At least eight distinct historical NYC Council Member accounts publicly
engaged with CallNYC between 2016 and 2018: Margaret Chin, Ruben Wills, Steven
Matteo, Peter Koo, Mathieu Eugene, Helen Rosenthal, Rosie Mendez, and Ydanis
Rodriguez. Observable engagement included replies, independent sharing,
quote-posts, quoted district figures, and acknowledgment of CallNYC
recognition. This is not a claim of endorsement, official adoption, or causal
constituent-service impact.

As a dated interface snapshot, 59 of the 92 CallNYC-authored posts displayed at
least one interaction, totaling 8 replies, 74 reposts, and 111 likes. These 193
interaction units are not unique people, reach, conversion, endorsement, or
service impact. They remain knowledge-bank context rather than headline site
copy.

### NYC Artist Coalition

The recovered 2017-2020 incoming-mention corpus contained 358 unique status
URLs. Six Council Member accounts appeared as authors. Four had clearly
mission-relevant engagement: Rafael Espinal, Stephen Levin, Carlina Rivera, and
Jimmy Van Bramer. Their records connected the shared account to Cabaret Law
repeal, Office of Nightlife convening, Talks Not Raids, public testimony,
co-sponsorship, cultural-space preservation, and arts-and-culture advocacy.

Two additional Council Member author appearances were incidental or too
context-limited to count as mission-relevant traction. A complete post-2020
incoming-mention inventory remains open because X returned a persistent search
error during bounded retries.

Jamie states that he established the account and a public-facing identity
system that collaborators, including Olympia Kazi, used over years. That role
claim is preserved but held for collaborator or dated account-record
corroboration. The visible feed is shared work and must not be attributed to
Jamie post by post without evidence.

### WOW List

All 38 profile-counted records materialized and were reviewed: 16 originals,
6 replies, and 16 reposts. Twenty-two were authored by `@wowlist`. The authored
population shows social media operating as part of the product: direct support
for calendar and event workflows, a community-created tutorial, event and list
distribution, documentation of the Sunday Dinner lineage, mission-relevant
source curation, and later adaptation into rapid multi-city civic coordination.

Thirty-one records contained an external link. The inventory preserves 35
link occurrences representing 35 distinct short URLs; 23 appeared in
`@wowlist`-authored records. Representative destinations include DIY cultural
reporting from Santa Cruz Good Times, an all-ages organizing resource from
Grasstronaut, Meow Wolf's archived DIY-space fund page, KQED's Ghost Ship
vigil documentation, an Indian Country Today Standing Rock giving resource,
the Allied Media Conference, a community-created product tutorial, and the
archived `popular.vote` adaptation.

A separate bounded search recovered 16 incoming records. Ten were
mission-relevant third-party records from ten accounts across DIY arts and
music, calendar-community, neighborhood-civic, and creative-technology
contexts. Nine independently posted a WOW List event, list, or project URL.
Punks & Criminals explicitly said it was adding shows to WOW List; Music
Hackathon described the service as made by its co-organizer Jamie Burkart; and
an All Ages calendar account publicly responded to a members-meeting
invitation. Six other search results were retained as project-contributor
self-documentation, context-limited greetings, unrelated handle use, or false
positives rather than converted into traction.

The small account count is not used as an adoption metric. Evidence about WOW
List's platform scale comes from separate aggregate product records.

As a dated interface snapshot, 12 of the 22 `@wowlist`-authored records showed
at least one interaction, totaling 2 replies, 20 reposts, and 21 likes. These
43 displayed units are not unique people, reach, conversion, endorsement,
attendance, or impact. Interaction counts on the 16 redistributed source
records are excluded from the project-account total.

## Lifecycle state

The CallNYC public-guidance and Council-engagement claims, the mission-relevant
NYC Artist Coalition engagement claim, and the complete-population WOW List
product-surface claim are selected for their case studies. The NYC Artist
Coalition account-establishment claim remains held. Open tasks cover the three
unmaterialized CallNYC records, post-2020 coalition mentions, collaborator
corroboration, and WOW List handle lineage.
