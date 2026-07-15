# Project social-media archival production

Reviewed: 2026-07-14

## Confirmed account inventory

| Project or campaign family | Confirmed handle | Account role |
| --- | --- | --- |
| CallNYC | [@CallNYCApp](https://x.com/CallNYCApp) | Historical project account |
| NYC Artist Coalition, SaveNYCSpaces, LetNYCDance, TalksNotRaids, FairRentNYC | [@NYCArtC](https://x.com/NYCArtC) | Shared coalition and campaign account |
| WOW List | [@wowlist](https://x.com/wowlist) | Historical project account |
| KC Town Hall | [@KCTownHall](https://x.com/KCTownHall) | Historical project account |

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

For `@NYCArtC`, the authenticated Posts and Posts & replies surfaces were
traversed through repeated no-growth states, then reconciled with exact yearly
`from:NYCArtC` Latest searches from 2017 through July 14, 2026. Their union
yielded 3,123 unique public records. The profile reported 5,124 posts. X's
missing-posts guidance documents that profile Posts exposes the latest 800
records and Posts & replies exposes the latest 3,200. Its separate new-user FAQ
directs account owners to an X Archive that can be browsed beginning with the
first post. The dedicated public-safe fixture at
`apps/www/src/data/knowledge-bank/fixtures/nycartc-retrievable-population.json`
therefore claims 100% review of the retrievable union, not 100% of the profile
counter. Its 2,001-record owner-archive remainder is explicit and blocking.

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

The complete retrievable union contains 3,123 unique source-status URLs: 608
account originals, 77 account replies, and 2,438 external-source posts surfaced
through native reposts. Source-status identity and profile-timeline appearance
are retained as separate facts. Two account-authored quote posts also appeared
as native self-repost cards, so the profile capture contains 2,440 native-repost
appearances without double-counting those two source URLs. The corpus contains
1,451 external-link occurrences representing
1,161 distinct short URLs and 623 visible source authors. Those source authors
span artist-labor groups, independent arts organizations, small-business and
tenant coalitions, legal advocates, public agencies, elected officials,
journalism, and community accounts.

This is evidence of a durable shared publishing and curation surface, not 3,123
Jamie-authored statements. Recurring overlapping subject signals include 477
FairRentNYC records, 192 SaveNYCSpaces records, 97 LetNYCDance records, 62
TalksNotRaids records, 57 nightlife-governance records, and 98 artist-labor
records. These counts show continuity and range in the recovered corpus; they
are not reach, participation, endorsement, or policy-impact measures.
The checked-in classifier excludes profile chrome, source display names, and
quoted-card content before matching source-post bodies, hashtags, and displayed
link destinations. The public fixture retains a SHA-256 input digest and the
first positive match for each label. That makes positive labels auditable and
the private capture reproducible without publishing raw post text; a full
false-negative replay still requires that private capture.

Independent final holdout reviewers live-checked the two ambiguous self-repost
URLs and a stratified set spanning all six mission signals and represented
record types. Matched values agreed with visible records where the URLs
rendered; unavailable URLs remained explicit verification limits. The two
ambiguous URLs rendered as account-authored quote-post source statuses while
the raw profile capture preserved their self-repost-card appearance. A separate
quote-post check found fifteen account source statuses that had inherited a
quoted card's reply state; those now remain originals. Together, those findings
produced the two-axis taxonomy above. An owner-archive pass should
rerun the same public rule manifest over the private full text before publishing
only redacted matched evidence and aggregate counts.

The source network makes collective infrastructure visible. Frequent source
authors include Olympia Kazi, Future of Music Coalition, United for Small
Business NYC, Music Workers Alliance, Street Vendor Project, Artist Studio
Affordability Project, League of Independent Theater New York, tenant and legal
advocates, and public-agency or officeholder accounts. A native repost does not
show that a source account engaged with the coalition or authorized the repost,
so source circulation remains separate from incoming stakeholder response.

The recovered 2017-2020 incoming-mention corpus contained 358 unique status
URLs. Six Council Member accounts appeared as authors. Four had clearly
mission-relevant engagement: Rafael Espinal, Stephen Levin, Carlina Rivera, and
Jimmy Van Bramer. Their records connected the shared account to Cabaret Law
repeal, Office of Nightlife convening, Talks Not Raids, public testimony,
co-sponsorship, cultural-space preservation, and arts-and-culture advocacy.

Two additional Council Member author appearances were incidental or too
context-limited to count as mission-relevant traction. A bounded 2021-2026
Latest search subsequently rendered 98 records from 43 authors. Of those, 75
records from 34 authors directly match `@NYCArtC`; 23 are surrounding
conversation context retained for auditability. It
adds collaborator, partner, public-service-advertising, theater, and nightlife
continuity but no serving-Council Member author to the four-account
mission-relevant count.

In that later set, Olympia Kazi authored 15 records connecting the shared
account to Council hearings, Office of Nightlife accountability, Talks Not
Raids follow-through, and FairRentNYC. TakeRoot Justice named NYC Artist
Coalition among citywide small-business partners; United for Small Business NYC
named it among Commercial Rent Stabilization speak-out co-hosts; and F.Y. Eye
documented FairRentNYC distribution through its public-service-advertising
network. A 2023 Stephen Levin record is retained as former-officeholder context,
not serving-Council engagement.

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

### KC Town Hall

All 183 profile-counted records materialized and were reviewed: 142 originals,
13 replies, and 28 reposts. Posts yielded 170 primary records. Replies rendered
188 cards: the same 183 primary records plus five parent or conversation-context
cards authored by other accounts. Keeping those contexts separate reconciles
the account population exactly and prevents a platform presentation detail from
becoming a false five-record surplus.

The public-safe fixture preserves a row-level `tire-related` classification for
all 100 relevant records and a mechanically derived `survey-linked`
classification for 12 records. The former records a close-reading judgment
against each inspectable public status URL; raw post text remains excluded.

The 155 `@KCTownHall`-authored records show the account functioning as a public
operating surface. It opened a neighborhood-process and survey loop around the
36th-and-Indiana site, published project and building updates, coordinated
recurring free household tire-pickup intake from 2019 through 2022, circulated
cleanup and civic resources, and sustained stakeholder dialogue. One hundred
records are tire-related; 12 contain a project survey link. These counts describe
publishing and workflow patterns, not independently audited outcomes or survey
participation.

Across the full population, 118 records contained external links, producing 133
occurrences and 31 distinct short URLs. Representative sources include Kansas
City Star reporting on Leon's Thriftway, Northeast News affordable-housing
coverage, KCUR election guidance, official Missouri voter information, RideKC
transit planning, a KCATA ozone-alert resource, and KC Town Hall cleanup and
COVID-resource videos. Sources circulated by the account are context, not
coverage of KC Town Hall unless the source itself says so.

Three sitting Kansas City Council Member accounts directly responded in
mission-relevant contexts. Quinton Lucas quote-responded to a KC Town Hall
alert about Leon's Thriftway and described contact with ownership. Jolie Justus
replied with bounded EDC and community follow-up. Melissa Robinson thanked the
account for work to improve community conditions. Official City records confirm
that each was serving on the Council at the relevant date. These are direct
public responses, not blanket endorsements or proof that KC Town Hall caused a
government decision.

A Bridging the Gap collaborator separately reported receiving a large KC Town
Hall tire drop-off. Two community accounts quote-amplified an Oak Park cleanup
notice, and KCMO 311 responded in a service-resolution thread. Tags and mentions
without responses are not counted as engagement.

As a dated interface snapshot, 77 of the 155 account-authored records showed at
least one interaction, totaling 22 replies, 70 reposts, 174 likes, and one
bookmark. These 267 displayed units are not unique people, reach, conversion,
participation, endorsement, or impact. Counts attached to the 28 redistributed
source posts are excluded from the account-authored total.

The account published specific tire and resident-savings totals. Those figures
remain attributed first-party evidence pending independently inspectable
drop-off, disposal, or collaborator records. The institutional feed is likewise
not assigned post by post to Jamie. The social archive does not establish the
separate municipal funding chain, contract execution, funding receipt,
expenditure, or completion of the building project.

## Lifecycle state

The CallNYC public-guidance and Council-engagement claims, the mission-relevant
NYC Artist Coalition engagement and shared social-infrastructure claims, and
the complete-population WOW List product-surface claim are selected for their
case studies. The complete-population KC Town Hall operating-surface claim is
also selected. The NYC Artist Coalition account-establishment claim remains
held. Open tasks cover the three unmaterialized CallNYC records, the 2,001-record
NYC Artist Coalition owner-archive gap, collaborator corroboration, WOW List
handle lineage, independent TiredOfTires outcome corroboration, and recovery of
KC Town Hall site and survey decision records.
