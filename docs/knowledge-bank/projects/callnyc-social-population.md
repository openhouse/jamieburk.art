# CallNYC full social-population archival production

Reviewed July 15, 2026.

This report reconciles the full population reported by the public
[`@CallNYCapp`](https://x.com/CallNYCapp) profile and records what the recovered
posts establish about CallNYC's public-information system, source ecosystem,
and stakeholder engagement.

The machine-readable companion is
[`callnyc-x-population-2026-07-15.json`](../data/callnyc-x-population-2026-07-15.json).
It contains the complete 110-row disposition manifest and all 84 recovered
posted-URL identities. It deliberately excludes raw post bodies, private
session data, and authentication material.

## Finding

The profile reports 110 posts. The review recovered 107 distinct content
objects and assigned explicit `not-recovered` dispositions to the remaining
three profile-counted slots. This is 100 percent population disposition coverage
and **107-of-110 content recovery**. It is not 110-of-110 content
recovery.

The recovered set shows that CallNYC was more than a launch announcement:

- 86 ordinary CallNYC-authored posts;
- 6 CallNYC replies;
- 15 reposted external posts;
- 71 recognition posts;
- 26 Council-member handles addressed by recognition posts;
- 61 distinct CallNYC issue pages connected to those handles;
- 84 distinct posted short URLs; and
- activity from March 5 through November 14, 2016.

The most defensible product-operations interpretation is that the account
operated a repeatable issue-to-representative distribution system. It connected
resident-facing service pathways to the Council offices whose constituent work
the data described. Publication does not establish that every recipient saw,
endorsed, or acted on a post.

## Population method

The reconciliation used:

1. an authenticated profile Posts timeline crawl;
2. an authenticated profile Replies timeline crawl;
3. authenticated date-bounded chronological search;
4. direct inspection of a recoverable reply omitted from the current profile
   timeline; and
5. Internet Archive status-URL lookup.

The direct-status recovery is CallNYC's April 20, 2016 reply in a civic-tech
conversation: it announced a JSON API for obtaining Council-member Twitter
usernames. Its omission from the current profile timeline is one reason the
research model preserves source view and disposition rather than treating one
interface as the archive.

Three population slots remain unresolved. `Not recovered` does not mean
deleted, private, suspended, nonexistent, or known. No status IDs, dates,
bodies, or relationship types are assigned to those slots.

## Issue distribution

The recovered classification records the following mission-relevant issue
families. A post can belong to more than one family, so these are thematic
occurrences rather than mutually exclusive post totals.

| Issue family | Occurrences |
| --- | ---: |
| Housing and tenants | 38 |
| Transportation and streets | 19 |
| Civic technology and open data | 15 |
| Parks, environment, and sanitation | 12 |
| Immigration and legal services | 9 |
| Culture and community | 6 |
| Jobs and economic support | 6 |
| Benefits and social services | 5 |
| Government and democracy | 3 |
| Health and safety | 3 |

The 71 recognition posts are especially useful evidence. They associated 61
distinct issue pages with 26 Council-member handles. That establishes a
designed communication practice; it does not establish policy outcomes or
formal Council adoption.

## Posted URLs and source roles

The complete manifest preserves 84 distinct short URLs. Most point to CallNYC
issue pages or its API. Thirteen point outside the CallNYC domain, including
the Council's former labs site, BetaNYC, NYC Technology Working Group, WOW
List, public-service pages, civic-tech tools, reporting, YouTube, and later
voting resources inside reposted external posts.

Source role matters:

| Source | Role in the knowledge bank | What it does not establish |
| --- | --- | --- |
| [Politico New York coverage](https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf) | Direct contemporaneous CallNYC coverage | Official Council product status or adoption |
| [Participatory Politics on verified Councilmatic offices](https://participatorypolitics.org/become-verified-on-nyc-councilmatic/) | Peer civic-technology and Council-communication context | Coverage of, or partnership with, CallNYC |
| [Gizmodo on a 311-data browser extension](https://gizmodo.com/check-the-history-of-complaints-at-any-nyc-address-with-1764099069) | Adjacent open-data context shared by CallNYC | Coverage of CallNYC |
| [311 Buddy](https://chriswhong.github.io/311buddy/) | Adjacent civic-technology tool inside a reposted post | CallNYC authorship or impact |
| [Gothamist on the Pulaski Bridge bike path](https://gothamist.com/news/long-overdue-pulaski-bridge-bike-path-will-officially-open-friday) | Issue context inside a reposted post | Coverage of CallNYC or CallNYC traction |
| [HRA homelessness prevention](https://www.nyc.gov/site/hra/help/homelessness-prevention.page) | Resident-facing public-service guidance distributed by CallNYC | A formal HRA partnership or measured service outcome |
| [NYC Rent Freeze](https://www.nyc.gov/site/rentfreeze/index.page) | Resident-facing SCRIE/DRIE guidance distributed by CallNYC | A formal City partnership or measured service outcome |

Only the Politico article in this table is direct CallNYC coverage. The others
document the account's civic-tech neighborhood, issue context, or service
distribution practice.

## Repost audit

Every recovered CallNYC-authored or reply post with a visible repost count was
opened and audited:

| Measure | Count |
| --- | ---: |
| CallNYC-authored or reply posts with displayed reposts | 41 |
| Displayed reposts on those posts | 74 |
| Currently public reposter-account appearances | 63 |
| Distinct currently public reposter accounts | 46 |
| Displayed reposts without a currently public account identity | 11 |

The 11-account gap can reflect private, deleted, suspended, hidden, or renamed
accounts, or another platform condition. No specific cause is assigned.

The 15 external posts reposted by CallNYC are excluded from the CallNYC
traction totals. Their visible reply, repost, and like metrics belong to their
original authors.

## Council-member engagement

Cross-checking current public repost lists against the official
[September 28, 2016 Council roster](https://legistar.council.nyc.gov/View.ashx?GUID=5b6f62c6-7eae-4d9e-9aec-c8b8fc36438c&ID=38126&M=AO&N=TWludXRlcyBvZiB0aGUgU3RhdGVkIE1lZXRpbmc%3D)
produced a lower bound of **at least 19 distinct serving Council-member
accounts**:

| Council member | Public repost-list evidence |
| --- | --- |
| Vanessa Gibson | [CallNYC post](https://x.com/CallNYCapp/status/725334082364821504/retweets) |
| Mathieu Eugene | [CallNYC post](https://x.com/CallNYCapp/status/726080902024040448/retweets) |
| Peter Koo | [CallNYC post](https://x.com/CallNYCapp/status/725403215282487296/retweets) |
| Margaret Chin | [CallNYC post](https://x.com/CallNYCapp/status/731212042863005697/retweets) |
| Ruben Wills | [CallNYC post](https://x.com/CallNYCapp/status/731873940923109376/retweets) |
| Chaim Deutsch | [CallNYC post](https://x.com/CallNYCapp/status/738140834973900800/retweets) |
| Elizabeth Crowley | [CallNYC post](https://x.com/CallNYCapp/status/732752376709447680/retweets) |
| Fernando Cabrera | [CallNYC post](https://x.com/CallNYCapp/status/726900698827358208/retweets) |
| I. Daneek Miller | [CallNYC post](https://x.com/CallNYCapp/status/727528637340241920/retweets) |
| Jimmy Van Bramer | [CallNYC post](https://x.com/CallNYCapp/status/775370427644411904/retweets) |
| Mark Treyger | [CallNYC post](https://x.com/CallNYCapp/status/727689676115611650/retweets) |
| David Greenfield | [CallNYC post](https://x.com/CallNYCapp/status/730856560071741440/retweets) |
| Rafael Espinal | [CallNYC post](https://x.com/CallNYCapp/status/734492930262585344/retweets) |
| Antonio Reynoso | [CallNYC post](https://x.com/CallNYCapp/status/753631998221033472/retweets) |
| Ritchie Torres | [CallNYC post](https://x.com/CallNYCapp/status/724986599419875333/retweets) |
| Rosie Mendez | [CallNYC post](https://x.com/CallNYCapp/status/733027856025047041/retweets) |
| Steven Matteo | [CallNYC post](https://x.com/CallNYCapp/status/748532929802997760/retweets) |
| Ben Kallos | [CallNYC post](https://x.com/CallNYCapp/status/724723473852059649/retweets) |
| Helen Rosenthal | [CallNYC post](https://x.com/CallNYCapp/status/723153082096345092/retweets) |

Six Council-member-authored posts or replies also explicitly involved CallNYC:

- [Peter Koo authored a wrapper post](https://x.com/CMPeterKoo/status/725422741160079360), April 27, 2016;
- [Steven Matteo replied](https://x.com/StevenMatteo/status/727621921341358081), May 3, 2016;
- [Ruben Wills replied](https://x.com/CM_RubenWills/status/732717792097603584), May 17, 2016;
- [Helen Rosenthal authored a post](https://x.com/HelenRosenthal/status/780797474277511170), September 27, 2016;
- [Mathieu Eugene authored a quote post](https://x.com/CMMathieuEugene/status/783305320508514304), October 4, 2016; and
- [Margaret Chin publicly thanked CallNYC for its recognition](https://x.com/CM_MargaretChin/status/884863588317442049), July 11, 2017.

These authored interactions overlap the 19-member repost set, so they do not
increase the unique-person lower bound. Likes remain excluded because liker
identities were not reliably recoverable.

## Other stakeholder patterns

The recoverable public record also includes:

- the `@NYCHA` agency account in the public repost list for a NYCHA building
  maintenance recognition post;
- civic-technology peers such as NYC School of Data, Aliza Aufrichtig, Chris
  Whong, and Participatory Politics participants;
- two public mentions from a legal-services account, including a recommendation
  to follow CallNYC for NYC information and data;
- public community-network visibility from `@NYCProgressives`; and
- constituent replies that connect the issue-recognition posts to lived service
  concerns.

Current profile biographies are not used as proof of 2016 institutional roles.
Serving Council-member status is the exception because it was cross-checked
against the official roster.

## Editorial decision

Promote the following to the CallNYC case study:

> CallNYC paired 61 resident-facing issue pages with recognition posts directed
> to 26 Council accounts. A full-population disposition pass recovered
> attributable interactions from at least 19 serving Council member accounts,
> including public reposts and six member-authored posts or replies.

Keep the 110-row disposition detail, URL inventory, issue-family table, and
stakeholder examples in the knowledge bank. They supply depth for future job
applications, source briefs, and photo-editor research without overloading the
public case study.

## Boundaries

- CallNYC remains an archived, independent prototype, not an official or
  current City service.
- One hundred percent disposition coverage is not one hundred percent content
  recovery.
- `Not recovered` is not `did not exist`.
- Account identity does not establish Jamie's authorship of every post.
- A repost, reply, quote, follow, or mention is not universal endorsement.
- The 19-member figure is a recovered lower bound, not a complete lifetime
  census.
- Contextual source articles are not direct CallNYC coverage.
- Original-author metrics on reposted external posts are not CallNYC traction.
