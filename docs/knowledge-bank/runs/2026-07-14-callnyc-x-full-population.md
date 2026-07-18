# CallNYC X full-population archival production

Date: July 14, 2026  
Operator: Codex, using Jamie Burkart's authenticated in-app browser session  
Account: `@CallNYCapp`

## Question

What does the full recoverable CallNYC account population establish about the
project's product strategy, public documentation, source ecosystem,
stakeholder engagement, and visible traction?

## Population result

The profile reported **110 posts**. A replies-inclusive timeline sweep recovered
**107 distinct items** after overlapping scroll passes repeatedly reached the
bottom without adding records:

| Population | Count |
| --- | ---: |
| Recoverable timeline items | 107 |
| Authored by `@CallNYCapp` | 92 |
| Reposted from other accounts | 15 |
| Profile-count difference | 3 |

The public corpus inventories 100% of the 107 recoverable records. It does not
rename that result as 100% of the profile-reported 110. The three-count gap is a
first-class archival finding and research task.

Cross-checks did not add records:

- X's authenticated `from:CallNYCapp` search returned a 47-post subset.
- The media surface added no status URL absent from the replies-inclusive
  timeline.
- A bounded Wayback status query returned two known authored statuses and one
  known media URL.

Possible explanations include unavailable authored posts, removed reposts, or
platform-count residue. The evidence does not choose among them.

The corpus covers March 5 through November 14, 2016. Activity was concentrated
in April and May: 82 of 107 recoverable items appeared in those two months.

## Item-level preservation

[`callnyc-x-full-population-2026-07-14.json`](../corpora/callnyc-x-full-population-2026-07-14.json)
preserves, for every recoverable item:

- canonical status URL;
- publication timestamp;
- authored-versus-reposted classification;
- complete visible text;
- visible replies, reposts, and likes;
- account mentions;
- outgoing short URLs and displayed destinations;
- visible media presence.

The file includes the SHA-256 digest of the raw authenticated capture used to
produce it. The committed raw browser extraction, transformation manifest, and
derivation script preserve the rest of the provenance chain. Run
`node scripts/derive-callnyc-x-corpus.mjs` from the repository root to verify
the raw-to-derived item transformation and recompute every aggregate. No
messages, settings, follower exports, credentials, private analytics, or
non-public account data entered the corpus.

## Product and publication pattern

The account was not merely a launch announcement:

| Pattern | Finding |
| --- | ---: |
| Service-recognition posts | 71 |
| Distinct Council members named by that pattern | 26 |
| Authored posts mentioning `@NYCCouncil` | 82 |
| Authored posts carrying outgoing links | 87 of 92 |
| Internal CallNYC link occurrences | 85 |
| Distinct displayed CallNYC destinations | 65 |
| Distinct normalized CallNYC destinations | 63 |
| Distinct normalized issue pages | 61 |
| Authored posts with visible media | 75 |

The recurring unit connected a resident issue, a named Council member, a visual
recognition asset, and a specific CallNYC destination. A May 4, 2016 post
explicitly said the recognitions were based on CouncilStat constituent-services
open data.

This establishes a repeatable public communication system. It does not
establish a formal City award program, equal CouncilStat use across district
offices, or a complete measure of service quality.

## Stakeholder engagement

### Council members

CallNYC named twenty-six Council members in seventy-one recognition posts. That
is project output, not responsive engagement.

The separate lower-bound stakeholder-response finding remains **at least eight
sitting Council members** whose accounts visibly replied to, quote-posted,
retransmitted, named, or linked CallNYC. Keeping these numbers separate avoids
turning targeted outreach into reciprocal uptake.

### Council and City institutions

Eighty-two authored posts mentioned `@NYCCouncil`. Other visible institutional
links included `@NYCHA`, `@NYCHousing`, `@NYCHRA`, City Rent Freeze resources,
the CouncilStat hackathon, and Council 2.0 / NYC Digital context.

### Civic-technology peers

The account linked or reposted work associated with Civic Hall, BetaNYC,
Council Labs, NYC Technology Working Group, 311Buddy, and Renter Be Aware. These
sources place CallNYC inside a contemporaneous civic/open-data conversation.
They do not transfer peer-project authorship or outcomes to Jamie.

### Residents and public users

The content consistently addressed recognizable concerns such as eviction,
rent freezes, food stamps, citizenship, NYCHA maintenance, street safety,
utilities, legal services, and transportation. The archive establishes the
pathways and invitations; it does not expose or estimate resident identities,
service use, or outcomes.

### Media and adjacent projects

The account posted Politico's CallNYC coverage, linked Gizmodo's Renter Be Aware
article, reposted Gothamist transportation reporting, and later amplified WOW
List / popular.vote organizing infrastructure.

## Visible traction

On July 14, 2026, **59 of 92 authored posts** retained at least one visible
reply, repost, or like. Authored-post totals were:

- 8 replies;
- 74 reposts;
- 111 likes.

Reposted items and the original posts' metrics were excluded from CallNYC
traction totals. These are dated visible labels, not complete lifetime
analytics. They may omit deleted, hidden, private, or platform-suppressed
activity and do not measure resident outcomes or policy impact.

The strongest visible authored-post totals belonged to:

- the March 5 launch announcement: 4 reposts and 9 likes;
- a May 12 dirty-sidewalks recognition: 4 reposts and 9 likes;
- a May 1 Con Edison recognition: 3 reposts and 7 likes;
- a June 1 Access-A-Ride recognition: 5 reposts and 4 likes;
- a May 4 reply to Steven Matteo about potholes: 1 reply, 2 reposts, and
  5 likes.

## Posted source inventory

The corpus contains 98 outgoing-link occurrences represented by 84 distinct
short URLs. Eighty-five occurrences pointed to CallNYC pages. Thirteen linked
outside the project:

| Posted destination | Source role | July 2026 observation |
| --- | --- | --- |
| Politico / Capital New York CallNYC article | Independent project coverage | Live legacy article; archived PDF is canonical portfolio evidence |
| Gizmodo: Renter Be Aware | Peer civic-technology reporting | Live |
| Gothamist: Pulaski Bridge bike path | Transportation reporting | Live at a migrated URL |
| NYC Rent Freeze | Official SCRIE / DRIE resource | Redirects to NYC.gov; current guidance must be rechecked before use |
| NYC HRA homelessness prevention | Official anti-eviction / legal-services resource | Live destination with access limits |
| SCRIE how-to video | Public benefit explainer | Live YouTube destination |
| 311Buddy | Peer 311-data prototype | Current project URL returns 404 |
| NYC Technology Working Group | Civic/open-data infrastructure | Redirect / TLS access unresolved |
| Council Labs | Council civic-technology infrastructure | Redirect with certificate mismatch |
| BetaNYC Talk | Civic/open-data discussion infrastructure | Domain no longer resolves |
| WOW List | Adjacent community-calendar project | Redirects; current request timed out |
| WOW List DownWithTrump page | Adjacent organizing resource | Redirects; current request timed out |
| popular.vote | Adjacent organizing resource | Current destination returned an access error |

The link-status column is preservation metadata, not a recommendation to use
historical guidance today.

## Product decisions recovered from Politico

A close reading of Miranda Neubauer's March 14, 2016 Politico New York article
adds concrete implementation evidence:

- Jamie used only records that included a borough to reduce out-of-city queries
  and spam.
- Conversations with neighbors and friends revealed that some people were wary
  of calling, prompting him to add Council-member Twitter contacts.
- Jamie described using software-development skills to design for social
  sharing and search discovery around resident issue queries.
- The project was delivered rapidly after the fuller dataset release for Beta
  NYC's School of Data.
- The article preserved the warning that district offices used CouncilStat with
  different frequency, limiting direct comparisons.

An April 20 project-account post also announced a JSON interface for retrieving
Council-member Twitter usernames.

These details support product judgment and implementation. They do not establish
a representative usability study, perfect data cleaning, measured search
conversion, current API availability, or official City commissioning.

## Account stewardship

A March 16, 2016 reply from `@CallNYCapp` says, in first person, that the speaker
is Jamie Burkart and that CallNYC is his first civic-technology project. This
directly supports Jamie's use and stewardship of the project account during the
launch period. It does not prove that he alone created the account or authored
all later posts.

## Lifecycle decisions

Promoted to the CallNYC case study:

- the 71-post / 26-member / 61-normalized-issue-page public communication system;
- Politico-backed filtering, communication-channel, sharing, and discovery
  decisions;
- the existing lower bound of eight Council members who visibly engaged back.

Retained in the deeper bank:

- dated visible engagement totals;
- all 107 item-level records;
- thirteen external-link occurrences and preservation status;
- first-person launch-period account stewardship;
- peer civic-technology and public-resource context.

Research-queued:

- the three-item profile-count discrepancy;
- archived replacements for dead or unstable linked resources.
