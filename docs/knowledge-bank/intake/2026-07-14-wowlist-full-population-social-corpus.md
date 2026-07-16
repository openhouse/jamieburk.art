# WOWList Full-Population Social Corpus

Run date: 2026-07-14

## Answer First

The live [@wowlist profile](https://x.com/wowlist) displayed **38 posts**. An
authenticated read-only pass through the Posts and Replies surfaces recovered
**all 38 unique items**:

- 16 account posts;
- 6 account replies; and
- 16 reposts from 13 other public accounts.

The [item-level ledger](../data/wowlist-public-post-ledger.json) closes exactly
against that current live-profile control with no unresolved slots. This is 100
percent recovery of the surviving profile population observed on July 14,
2026. It is not a platform export, a deletion history, or proof that no older
item was deleted before capture.

## Method

1. Used the profile's displayed 38-post count as the population control.
2. Harvested Posts and Replies separately in 650-pixel increments to reduce
   omissions from X's virtualized timeline.
3. Deduplicated every rendered item by canonical status ID.
4. Reconciled 37 Posts-tab items with one additional account reply found on the
   Replies tab.
5. Classified all 38 records by account relationship, primary theme, mentions,
   hashtags, and public outbound destinations.
6. Resolved all 35 posted `t.co` URLs to 34 unique destinations.
7. Closely read mission-relevant public destinations while distinguishing
   source context from press coverage of WOWList.

Authentication was used only to read public material. No credential, cookie,
session, private-message, account-recovery, or private-analytics material was
captured or committed. The ledger stores concise public-safe summaries rather
than reproducing full third-party repost text.

## Population

| Relationship | Records |
| --- | ---: |
| Account posts | 16 |
| Account replies | 6 |
| Reposts | 16 |
| **Total** | **38** |

The earliest recovered item is February 12, 2014. The latest is January 12,
2017. The reposts originated from 13 public accounts. That variety documents a
networked public identity; it does not establish endorsement of WOWList by each
source account.

## What The Population Shows

### Product lineage and support

The [first recovered account post](https://x.com/wowlist/status/433671630837919744)
names Richard and Jamie and describes WOWList as based on calendars made at
Sunday Dinner. A later [reply](https://x.com/wowlist/status/771457416298921985)
states that NYCDIY ran on WOWList and again connects the project to the Sunday
Dinner potluck.

All six account replies function as support, onboarding, or local-calendar
identity guidance. Together they explain:

- how followed calendars populated a home feed;
- where a person could find their WOW Lists on a profile;
- how to submit an event to multiple lists;
- what NYCDIY was;
- how to join NYCDIY, add shows, and receive a weekly email; and
- how NYCDIY, WOWList, and Sunday Dinner related.

This makes Jamie's product-operations contribution legible without claiming he
personally wrote each reply: the shared public identity he established became a
usable support surface for the product he co-built.

### Distribution and community use

Five account posts directly distribute events, conferences, festivals, tours,
or public demonstrations. Five reposts amplify other organizers' event or
calendar use. A 2015 post also thanked a community member for creating a
product tutorial.

These are concrete public traces of use and event routing. They do not measure
the platform's total event volume, user population, geographic adoption,
support workload, satisfaction, or impact. Those larger historical claims
remain grounded in the product archive and retain their own evidence posture.

### Scene knowledge

Three account posts route knowledge about DIY cultural infrastructure and
connections among scenes. Two public destinations were recovered through the
Wayback Machine:

- [Grasstronaut's all-ages music manualfesto](https://web.archive.org/web/20150406041311/http://grasstronaut.com/2015/01/29/homework-in-every-town/)
  discusses community building, conflict resolution, legal and organizational
  knowledge, and documenting cultural spaces.
- Elise Granata's [Good Times article, “Zines 2.0”](https://web.archive.org/web/20150907001335/http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html)
  describes Grasstronaut's effort to document and connect geographically
  separated grassroots arts spaces.

These sources clarify the mission context of links WOWList shared. They are not
press coverage, reviews, or endorsements of WOWList.

### Civic mobilization and care

Five account posts and five reposts center civic mobilization or care. The
recovered routes include a Black Lives Matter demonstration, nationwide
anti-Trump events, popular-vote organizing, Standing Rock support, Ghost Ship
mutual aid and memorials, a call to mayors about safe conditions for DIY
spaces, and a DIY-space fund.

[KQED's memorial-vigil report](https://www.kqed.org/news/11207317/video-mourners-gather-at-candlelight-vigil-to-honor-victims-of-oakland-fire)
and [Meow Wolf's DIY Fund page](https://meowwolf.com/blob/meow-wolfs-diy-fund)
confirm the context of two shared resources. Sharing them documents public
routing and care; it does not make WOWList or Jamie their organizer, author,
participant, beneficiary, or cause.

## Classification

| Primary theme | Records |
| --- | ---: |
| Product support and onboarding | 6 |
| Product and community infrastructure | 3 |
| Event distribution | 5 |
| Scene knowledge and connection | 3 |
| Civic mobilization and care, account posts | 5 |
| Civic-care amplification | 5 |
| Platform use and event amplification | 5 |
| Community-scene context | 6 |
| **Total** | **38** |

## Claims Promoted

### Selected for the portfolio

> The public account Jamie established became a direct support surface: its six
> surviving replies explained feed scope, profile navigation, multi-list event
> submission, joining local calendars, and how NYCDIY ran on WOWList from the
> Sunday Dinner potluck.

### Retained in reserve

- The 38-item current profile population is fully reconciled.
- The account routed practical and historical knowledge among DIY scenes.
- The account's record extends from event distribution into public gathering,
  mutual aid, mourning, and cultural-space support.

Reserve status means these claims remain available for future composition; it
does not mean they are weak. They are not the clearest additional argument for
the current hiring-focused page.

## Attribution and Measurement Boundaries

- Jamie confirms that he established the account and co-built the product.
- The shared account does not identify which teammate composed each post.
- A complete current profile population is not a complete platform export or
  proof against prior deletion.
- Reposts and links do not establish authorship, organizing credit,
  participation, endorsement, causality, or impact.
- Visible reply, repost, and like totals are mutable July 2026 snapshots, not
  historical analytics or project-owned performance measures.
- The social corpus does not validate the larger user, event, or geographic
  totals held elsewhere in the knowledge bank.

## Durable Artifacts

- Canonical model: `apps/www/src/data/knowledge-bank/wowlist-social-corpus.ts`
- Item-level public ledger: `docs/knowledge-bank/data/wowlist-public-post-ledger.json`
- Portfolio projection: `apps/www/src/content/work/wowlist.mdx`
- Proof-bank entry: `wowlist-public-support-surface`
- Recursive hard gate: `wowlist-full-population-archive`
