# NYC Artist Coalition social-population archival production

**Reviewed:** 2026-07-15
**Account:** [@NYCArtC](https://x.com/NYCArtC)
**Status:** complete review of the retrievable public union; literal full-account
recovery remains blocked on an account-owner X Archive.

This is a public-safe archival production record. The
[machine-readable manifest](../../../apps/www/src/data/knowledge-bank/fixtures/nycartc-retrievable-population.json)
preserves public status URLs, source-post dates, author handles, record types,
posted-link metadata, mention handles, hashtags, classification-input digests,
first positive matches, bounded incoming mentions, and dated aggregate counts.
It excludes raw post text, credentials, cookies, private account state, session
data, phone numbers, and private messages.

## Population and stopping condition

The authenticated Posts and Posts & replies surfaces were traversed through
repeated no-growth states. Exact yearly `from:NYCArtC` Latest searches from 2017
through July 14, 2026 were then used to recover older
coalition-account-authored records outside the profile surfaces. Deduplication
by public source-status URL yielded 3,123 unique records.

| Population measure | Count |
| --- | ---: |
| Profile-reported posts | 5,124 |
| Unique records from Posts | 764 |
| Primary records from Posts & replies | 2,698 |
| Coalition-account-authored records in yearly-search union | 554 |
| Unique retrievable union reviewed | 3,123 |
| Profile-counted records not materialized | 2,001 |
| Profile-counter coverage | 60.9% |

Every record in the 3,123-record retrievable union was reviewed. This is not a
claim that all 5,124 profile-counted posts were recovered. X documents that
Posts displays the latest 800 records, Posts & replies displays the latest 3,200,
and older posts may fail to appear because of indexing restrictions. X directs
account owners beyond the recent profile timeline to download an X Archive and
browse account information beginning with the first post.

The stopping condition for this public-surface pass was therefore repeated
no-growth across all inspected profile and yearly-search routes. The next
materially different retrieval surface is the owner archive. The 2,001-record
remainder is not represented as empty, absent, deleted, or reviewed.

## Status identity and timeline appearance

The manifest classifies the 3,123 unique source-status URLs as:

- 608 coalition-account originals;
- 77 coalition-account replies;
- 2,438 external-source statuses surfaced through native repost cards.

Source-status identity and timeline appearance are separate axes. Two
coalition-account-authored quote posts also appeared as native self-repost
cards, so the profile capture contains 2,440 native-repost appearances without
changing the unique source-status partition. Fifteen coalition quote posts
initially inherited a quoted card's reply state; the replayable classifier
corrects those source statuses to originals.

For native reposts, X exposes the source post's timestamp, not the date
`@NYCArtC` reposted it. Source-post years must not be presented as coalition
account activity years.

## Mission continuity

The public classifier matches source-post bodies, hashtags, and displayed link
destinations after excluding profile chrome, source display names, and quoted-
card content. Signals can overlap.

| Mission signal | Recovered records |
| --- | ---: |
| Fair Rent NYC | 477 |
| Save NYC Spaces | 192 |
| Let NYC Dance | 97 |
| Talks Not Raids | 62 |
| Nightlife governance | 57 |
| Artist labor | 98 |

The fixture retains a SHA-256 digest of each classification input and the first
matched public-safe value for every assigned label. This supports public audit
of positive matches without republishing tweet bodies. Full false-negative
replay requires the private raw capture.

These are subject-matter counts, not measures of authorship, endorsement,
participation, reach, causality, or impact.

## Posted sources

The recovered population contains 1,451 external-link occurrences, representing
1,161 distinct short URLs across 1,339 records. Every recovered posted link is
preserved in the manifest. Representative mission-relevant destinations include:

| Source role | Organization | Public destination |
| --- | --- | --- |
| Cabaret Law repeal reporting | Gothamist | [Article](https://gothamist.com/arts-entertainment/nyc-cabaret-law-repealed) |
| Nightlife-enforcement accountability | NYC Mayor's Office of Media and Entertainment | [M.A.R.C.H. reports](https://www.nyc.gov/site/mome/nightlife/march-report.page) |
| Commercial-rent reporting | WNYC / Gothamist | [Article](https://gothamist.com/news/in-pandemics-aftermath-calls-grow-for-nyc-to-regulate-commercial-rents) |
| Music-worker relief analysis | The Nation | [Article](https://www.thenation.com/article/culture/covid-touring-musicians-aid/) |
| Music-worker relief reporting | Gothamist | [Article](https://gothamist.com/arts-entertainment/musicians-rally-for-pandemic-relief) |
| Music-industry policy resource | Future of Music Coalition | [Ticketing basics](https://futureofmusic.org/news/2023/3/15/ticketing-basics-holdbacks) |
| Independent cultural-space reporting | The New York Times | [Article](https://www.nytimes.com/2022/03/17/arts/music/jazz-club.html) |
| Cultural-policy leadership | WNYC | [Interview](https://www.wnyc.org/story/meet-nycs-new-commissioner-of-cultural-affairs/) |

A source circulated by the account is not automatically coverage of NYC Artist
Coalition. Posted-source inventory, direct coverage, official records, partner
acknowledgment, and project self-description remain separate evidence roles.
Existing campaign press and policy records in the knowledge bank continue to
govern public accomplishment claims.

## Source network

The unique-URL population contains 623 visible source authors. Frequent sources
include Olympia Kazi, Future of Music Coalition, United for Small Business NYC,
Music Workers Alliance, Street Vendor Project, Artist Studio Affordability
Project, League of Independent Theater New York, tenant and legal advocates,
public agencies, elected officials, journalism, and community accounts.

This supports a claim about the range of information and voices the coalition
account circulated. It does not establish that every source account engaged
with the coalition, endorsed a campaign, collaborated with Jamie, or authorized
the repost. It is also not a count of formal coalition participants.

## Incoming public response

A separate bounded 2021 through July 14, 2026 incoming search rendered 98
public records from 43 authors:

- 75 records from 34 authors directly matched `@NYCArtC`;
- 23 records from 15 authors were surrounding conversation context retained for
  auditability.

Curated direct records preserve several mission-relevant relationship types:

- Olympia Kazi connected coalition campaigns to Office of Nightlife reporting,
  Council oversight, Talks Not Raids follow-through, and Fair Rent NYC;
- TakeRoot Justice named NYC Artist Coalition among citywide small-business
  partners;
- United for Small Business NYC named the coalition among Commercial Rent
  Stabilization speak-out co-hosts;
- F.Y. Eye documented Fair Rent NYC distribution through its public-service-
  advertising network;
- independent-theater and nightlife stakeholders publicly acknowledged the
  coalition's representation or continuing work.

This result is complete for the rendered bounded search, not a complete archive
of every later mention, reply, quote, repost, or like. Former-officeholder
context is not counted as serving-Council engagement. The existing six-serving-
member authored-mention lower bound remains governed separately.

## Visible interaction snapshot

At the July 14, 2026 access snapshot, 618 of the 685 coalition-account originals
or replies displayed at least one reply, repost, or like. They displayed 118
replies, 1,490 reposts, and 2,698 likes, totaling 4,306 displayed interaction
units under the manifest's definition.

These values are retained in the bank and held from the website. They are
volatile interface observations, not unique people, reach, conversion,
endorsement, participation, or policy impact. Views and bookmarks are excluded
from the interaction-unit total. Metrics on external posts surfaced through
native reposts do not become coalition traction.

## Collective authorship and public composition

The corpus demonstrates a durable shared public identity and publishing system.
It does not identify who authored each coalition-account post. Jamie's memory
that he established the identity system remains in a separate corroboration
inquiry; no post is assigned to Jamie, Olympia Kazi, or another collaborator
without post-level evidence.

The website receives one selected claim about durable social infrastructure and
the complete retrievable review. The incoming-response and visible-interaction
claims remain held. This keeps the public case study readable while preserving
the depth needed for future applications, source research, collaborator proofs,
and photo-editor briefs.

## Next archival pass

Literal full-account recovery requires an account-owner X Archive. That pass
should:

1. reconcile stable status IDs against the 3,123-record public union and the
   5,124-post profile counter;
2. classify every newly materialized source status with the checked-in rules;
3. preserve raw archive data only in a private workspace;
4. publish only public-safe derived metadata, source relationships, and bounded
   claims;
5. revise the 60.9% boundary only when the full counter gap is closed or
   explained.
