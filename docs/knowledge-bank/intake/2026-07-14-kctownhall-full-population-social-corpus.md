# KC Town Hall Full-Population Social Corpus

Run date: 2026-07-14

## Answer First

The live [@KCTownHall profile](https://x.com/KCTownHall) displayed **183
posts**. An authenticated read-only pass through the Posts and Replies surfaces
recovered **all 183 unique surviving items**:

- 142 account posts;
- 13 account replies; and
- 28 reposts from 16 other public accounts.

The [item-level ledger](../data/kctownhall-public-post-ledger.json) closes
exactly against that current profile control with no unresolved slots. This is
100 percent recovery of the surviving profile population observed on July 14,
2026. It is not a platform export, a deletion history, or proof that no older
item was deleted before capture.

## Method

1. Used the profile's displayed 183-post count as the population control.
2. Harvested Posts and Replies separately to reduce omissions from X's
   virtualized timeline.
3. Deduplicated every rendered item by canonical status ID.
4. Reconciled 170 Posts-surface items with 13 account replies found only on the
   Replies surface; five other-account conversation-context items were excluded.
5. Classified all 183 records by account relationship, primary theme, public
   mentions, hashtags, posted destinations, media signals, and measurement
   boundary.
6. Resolved 31 unique posted `t.co` URLs to 20 unique public destinations.
7. Closely read high-signal destinations while distinguishing resident-routing
   context from coverage of KC Town Hall.

Authentication was used only to read public material. No credential, cookie,
session, private-message, account-recovery, or private-analytics material was
captured or committed. The ledger does not reproduce post text, public phone
numbers, or street addresses.

## Population

| Relationship | Records |
| --- | ---: |
| Account posts | 142 |
| Account replies | 13 |
| Reposts | 28 |
| **Total** | **183** |

The earliest recovered item is July 2, 2018. The latest is September 24, 2022.

## Findings

### Resident-service operations

One hundred records concern the Tired of Tires workflow: 96 account posts,
three account replies, and one repost. The public account repeatedly solicited
resident locations, announced pickup cycles, documented pickups, and reported
curb conditions and program continuity.

This is operating-pattern evidence, not an audited service ledger. One hundred
records do not equal one hundred completed pickups or households. Project posts
also contain self-reported tire and avoided-fee figures that remain separate
from the public claim until independently reconciled.

### Mission breadth

The remaining public record includes:

| Primary theme | Records |
| --- | ---: |
| Neighborhood culture and community | 27 |
| Civic information and service routing | 26 |
| Town Hall development and participation | 16 |
| Racial-justice documentation | 12 |
| Pandemic-resource routing | 2 |

These categories describe how the shared public identity was used. They do not
assign every post to Jamie or convert public circulation into project impact.

### Stakeholder touchpoints

The 155 account-authored records mention 35 external handles. The account
mentioned Quinton Lucas 26 times and Melissa Robinson 23 times. Those are
outreach counts, not responses.

The 28 reposts come from 16 source accounts spanning city leadership and
government, schools, transit, neighborhood organizations, residents, and local
media. Nine source statuses were authored by Quinton Lucas, Melissa Robinson,
or Jolie Justus. Reposting an official's public post is project-selected
amplification, not engagement authored by that official toward KC Town Hall.

### Direct Council response

A narrower recoverable floor contains two direct outside-authored responses by
sitting Kansas City Council members in the April 29, 2019 Leon's Thriftway
exchange:

- [Quinton Lucas](https://x.com/QuintonLucasKC/status/1122866432130334720)
  quote-posted KC Town Hall and described speaking with store ownership.
- [Jolie Justus](https://x.com/joliejustus/status/1122883010582466560)
  replied to KC Town Hall about work with the Economic Development Corporation
  and community on possible solutions.

The [official 2018 city roster](https://www.kcmo.gov/home/showpublisheddocument/12/636943889997730000)
identifies Lucas and Justus as members of the Council during the applicable
Council term. Two is a direct-response floor, not a complete lifetime count or
proof of partnership, adoption, endorsement, or outcome.

### Posted sources and public knowledge routing

The corpus preserves 133 short-link occurrences, 31 unique short URLs, and 20
unique resolved destinations. Nine are KC Town Hall or direct-lineage pages.
External destinations include:

- [KCUR election guidance](https://www.kcur.org/politics-elections-and-government/2018-08-05/a-cheat-sheet-for-tuesdays-primary-election-in-missouri);
- Missouri voter registration;
- [Northeast News affordable-housing reporting](https://northeastnews.net/pages/affordable-housing-policy-hits-docket-kcmo/);
- RideKC service and transit-planning pages;
- Curbed housing-policy reporting; and
- Kansas City Star reporting about Leon's Thriftway.

These sources clarify what information the account routed to residents. They
are not necessarily coverage of KC Town Hall, and sharing them does not
establish authorship, agreement with every proposition, or resulting action.

### Visible reactions

At the July 2026 public snapshot, 77 of 155 account-authored statuses displayed
at least one reaction. Their visible totals were 22 replies, 70 reposts, and
174 likes. Metrics on the 28 reposted source statuses are excluded because they
belong to the original posts.

This is a current interface snapshot, not contemporaneous analytics. It does
not establish unique people, impressions, clickthrough, completed services,
adoption, causality, or impact.

## Composition Decision

### Selected for the portfolio

> KC Town Hall also used its shared public account as an operating surface: 100
> of 183 surviving records concern resident tire reports, pickups, and result
> reporting from 2019 through 2022.

### Retained in reserve

- The current 183-item profile population is fully reconciled.
- The account connected service operations to civic information, neighborhood
  culture, participation, racial-justice documentation, and pandemic resources.
- Two sitting Council members authored recoverable direct responses in one
  April 2019 exchange.
- The full posted-destination inventory and mutable reaction snapshot remain
  available for future research and recomposition.

## Boundaries

- The shared account does not identify which teammate composed each post.
- A complete current profile population is not a platform export or proof
  against prior deletion.
- Project outreach, outside-authored engagement, project-selected reposts, and
  visible reactions are different relationship types.
- Project-reported tire and fee figures need independent reconciliation before
  stronger use.
- Resident addresses, phone numbers, direct messages, account credentials,
  private analytics, and private service records remain outside the repo.
- The public record does not connect every account action or field operation to
  Jamie individually.

## Durable Artifacts

- Canonical model: `apps/www/src/data/knowledge-bank/kctownhall-social-corpus.ts`
- Item-level ledger: `docs/knowledge-bank/data/kctownhall-public-post-ledger.json`
- Portfolio projection: `apps/www/src/content/work/kc-town-hall.mdx`
- Proof coverage target: `kc-town-hall-public-service-interface`
- Recursive hard gate: `KB-EVAL-KCTH-FULL-POPULATION`
