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

The public metadata-only capture inventory is stored at
`apps/www/src/data/knowledge-bank/fixtures/social-media-capture-inventory.json`.
It preserves status URLs, dates, author handles, and original/repost
classification where applicable. Post text and authenticated-session state are
not stored in the fixture.

## Findings

### CallNYC

At least six distinct historical NYC Council Member accounts publicly engaged
with CallNYC between 2016 and 2018: Margaret Chin, Ruben Wills, Steven Matteo,
Peter Koo, Mathieu Eugene, and Helen Rosenthal. Observable engagement included
replies, independent sharing, quoted district figures, and acknowledgment of
CallNYC recognition. This is not a claim of endorsement, official adoption, or
causal constituent-service impact.

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

The profile reported 38 posts. Thirty-seven unique timeline records
materialized: 21 original posts and 16 reposts. The surviving account shows
social media operating as part of the product: public support replies, a
community-created tutorial, event-distribution guidance, documentation of the
Sunday Dinner calendar lineage, and later adaptation into rapid multi-city
civic coordination.

The small account count is not used as an adoption metric. WOW List's platform
scale remains supported by its separate aggregate product records.

## Lifecycle state

The CallNYC and mission-relevant NYC Artist Coalition engagement claims, plus
the WOW List product-surface claim, are selected for their case studies. The
NYC Artist Coalition account-establishment claim remains held. Open tasks cover
post-2020 coalition mentions, collaborator corroboration, and WOW List handle
lineage.
