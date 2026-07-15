# CallNYC X Full-Population Archival Production

**Review date:** July 15, 2026

**Researcher:** Codex, using Jamie Burkart's authenticated X session

**Account:** [@CallNYCapp](https://x.com/CallNYCapp)

**Projection decision:** One bounded issue-pathway metric is approved for the
CallNYC case study. Raw access-time engagement totals remain research depth.

## Answer First

The @CallNYCapp profile displayed **110 posts** at review time. This pass gives
all 110 profile-counted slots a disposition:

| Population disposition | Count |
| --- | ---: |
| Recovered unique timeline objects | 107 |
| CallNYC-authored posts | 86 |
| CallNYC-authored replies | 6 |
| Reposted external statuses | 15 |
| Profile-counted objects not recovered | 3 |
| Total slots reviewed | 110 |

The recovered record runs from March 5 through November 14, 2016. The three
unrecovered slots remain explicit. The phrase "full-population review" means
100 percent of the profile-counted population received a recovered or
not-recovered disposition; it does not mean that all 110 post bodies were
available.

The strongest new portfolio proof is:

> The recovered social record shows the information architecture operating in
> public: 71 issue-recognition posts linked 61 distinct resident issue pages to
> 26 Council-member accounts.

This is separate from office-account engagement. A second, earlier review
recovered public replies, repost or quote-post amplification, a recognition
response, or independent link sharing from **at least eight then-serving
Council-member accounts**. Eight is a recovery floor, not a lifetime total.

## Public Data Artifacts

- [110-slot census](data/callnyc-x-full-population-census-2026-07-15.csv)
- [Derived summary and URL inventory](data/callnyc-x-full-population-summary-2026-07-15.json)

The census stores public status URLs and derived metadata, not a republished
collection of full tweet bodies. Each recovered row records date, status
author, relationship to the project account, posted URLs, mentions, hashtags,
issue families, stakeholder groups, and access-time interaction labels. Three
rows preserve the unrecovered remainder.

## Method

1. Reviewed the authenticated profile and recorded its displayed 110-post
   count, account identity, join date, and mission description.
2. Crawled the Posts timeline to exhaustion and deduplicated status URLs.
3. Crawled the Replies timeline, recovering one additional CallNYC-authored
   reply not visible in the default Posts result.
4. Reconciled the profile corpus against an authenticated chronological search
   bounded to March through November 2016.
5. Queried the Internet Archive CDX index for preserved CallNYC status URLs.
6. Classified all 107 recovered objects by project relationship, posted URL,
   issue family, stakeholder group, and access-time interaction labels.
7. Assigned the three unresolved profile-counted slots a visible
   `not-recovered` disposition.

The authenticated chronological search returned 47 CallNYC-authored results,
all already present in the profile/replies census. The Internet Archive query
returned three preserved CallNYC status URLs, also already in the recovered
set. Neither method supplied the remaining three objects.

## What The Account Documents

### Launch and actor evidence

The pinned [March 5 launch post](https://x.com/CallNYCapp/status/706208629360304128)
announced CallNYC.org and connected it to Council constituent-services data
during Open Data Day.

A [March 16 first-person reply](https://x.com/CallNYCapp/status/710150246781882369)
identifies Jamie Burkart by name and describes CallNYC as his first
civic-technology project. This is valuable contemporaneous actor evidence, but
it remains a first-person project-account statement rather than independent
third-party verification. Politico and the surviving repository provide the
stronger independent and implementation support.

### Technical implementation

The account documented two public API surfaces:

- A [March 25 district-profile API post](https://x.com/CallNYCapp/status/713537148000018432)
  named fields for Council-member name, phone, email, Twitter, and services.
- An [April 20 reply](https://x.com/CallNYCapp/status/722837286476390401)
  says Jamie made a JSON API through which civic-technology collaborators could
  retrieve Council-member Twitter usernames.

These posts show public technical documentation and intended reuse. They do
not establish current endpoint availability, current contact accuracy, or
external production adoption. The public source repository remains the
implementation record.

### Issue-pathway operation

Seventy-one recovered CallNYC-authored posts used the same operating pattern:
name a resident issue, identify the Council-member account with the highest
reported activity for that historical CouncilStat category, and link the
corresponding CallNYC issue page. Those posts resolve to:

- **61 distinct issue-page URLs**;
- **26 Council-member target accounts**;
- issue families spanning housing and tenants, transportation and streets,
  immigration and legal services, benefits, parks and sanitation, health,
  jobs, government operations, culture, and environmental concerns.

Housing and tenant issues are the largest recovered family, followed by
transportation and street issues. This distribution fits the product's stated
resident-service purpose and Politico's contemporary description of housing as
the largest major category in the source data.

The historical recognition language must retain its data boundary. Different
Council offices used CouncilStat differently and with different frequency.
The posts are evidence of CallNYC's issue architecture and public publishing
practice, not a complete or current ranking of office quality.

## Stakeholder Engagement Patterns

### Council members and offices

The separately inspected interaction set contains at least eight then-serving
member accounts:

- Margaret Chin;
- Mathieu Eugene;
- Helen Rosenthal;
- Rosie Mendez;
- Ydanis Rodriguez;
- Peter Koo;
- Ruben Wills;
- Steven Matteo.

The interaction forms matter more than an aggregate score. They include direct
replies, carrying or reposting a CallNYC recognition, thanking office staff,
adding resident-service context, and independently sharing CallNYC.org with
legal and housing resources. These actions show public-sector resonance. They
do not establish formal endorsement, adoption, constituent outcomes, Council
ownership, or policy causality.

### Civic technology and city institutions

The account's public graph includes the New York City Council and Council Labs,
BetaNYC, Civic Hall, David Moore, Chris Whong, Aliza Aufrichtig, Organize 2.0,
the Mayor's Office, HRA, Housing, Finance, NYCHA, and the Manhattan Borough
President's open-data context. The account both posted CallNYC material and
reposted adjacent civic-technology and digital-government work.

This pattern situates CallNYC inside a real practice community. A repost is
context or curation, not proof that Jamie made the reposted project.

### Legal, housing, and service networks

Helen Rosenthal's independently authored post shared CallNYC.org alongside
MFY Legal Services, Goddard Riverside, and Housing Conservation Coordinators.
Other posts circulated HRA anti-eviction resources and New York City's rent
freeze program. This supports resident-help and referral-network context, not
usage or outcome counts.

### Press

The account thanked Politico and linked its CallNYC coverage. One Council reply
copied the Queens Chronicle. The timeline also carried Gothamist and Gizmodo
reporting about adjacent civic issues and tools.

Only Politico is recovered independent reporting about CallNYC itself. The
other articles are mission context or examples of what the project account
curated; they do not prove Jamie's role or CallNYC outcomes.

## Mission-Relevant Posted URLs

| Destination | Role in the corpus | Evidentiary use |
| --- | --- | --- |
| [Politico New York CallNYC coverage](https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf) | Direct project coverage shared by CallNYC | Independent support for Jamie's role, chronology, product intent, and iteration |
| [Gizmodo on Aliza Aufrichtig's 311 extension](https://gizmodo.com/check-the-history-of-complaints-at-any-nyc-address-with-1764099069) | Adjacent civic-tool article posted by CallNYC | Civic-technology community context only |
| [Chris Whong's 311 Buddy](http://chriswhong.github.io/311buddy/) | Reposted open-data project; current URL returned 404 | Adjacent open-data practice; preserve as a dead destination pending archive recovery |
| [NYC HRA homelessness prevention](https://www.nyc.gov/site/hra/help/homelessness-prevention.page) | City anti-eviction resource posted by CallNYC | Resident-referral practice; current guidance must be verified independently |
| [NYC rent freeze](https://www.nyc.gov/site/rentfreeze/index.page) | City SCRIE resource in a CallNYC reply | Resident-referral practice; current guidance must be verified independently |
| [Council digital roadmap video](https://www.youtube.com/watch?v=vwpGGRK4JgA) | Council 2.0 / digital-government context | Institutional context, not CallNYC adoption |
| [Gothamist on the Pulaski Bridge bike path](https://gothamist.com/news/long-overdue-pulaski-bridge-bike-path-will-officially-open-friday) | Reposted local civic reporting | Adjacent transportation context only |
| `nyctwg.org`, `labs.council.nyc`, and `talk.beta.nyc` | Civic-web models in a reposted launch-day post | Ecosystem context; historical destinations require preservation review |
| CallNYC issue pages and `/api/` | 61 distinct issue pages plus API surfaces | Direct evidence of public information architecture and technical implementation |
| WOWList and Popular Vote pages | Late 2016 cross-project reposts | Cross-project continuity; not CallNYC product traction |

The machine-readable summary keeps all 84 unique posted short URLs and their
displayed destinations. Selected short links were resolved to their final URL
at review time; dead and blocked destinations remain visibly marked rather
than silently replaced.

## Access-Time Engagement

Fifty-six of the 92 CallNYC-authored posts or replies displayed at least one
like or repost at review time. Across those authored objects, the interface
showed 74 reposts and 111 likes. The launch post displayed four reposts and nine
likes; an issue-pathway post about dirty sidewalks displayed four reposts and
nine likes.

These are mutable access-time labels, not stable historical analytics. They do
not expose the complete identity of actors, they may include activity by the
account owner, and they should not be projected as a portfolio performance
metric. The inspected office-authored interactions above are the more useful
mission-relevant traction signal.

## Claims And Boundaries

### Approved

- The full 110-slot population has a recorded disposition.
- 107 unique timeline objects are recovered; three remain not recovered.
- The recovered set contains 86 project posts, six project replies, and 15
  reposts.
- Seventy-one issue-recognition posts link 61 distinct CallNYC issue pages to
  26 Council-member accounts.
- At least eight then-serving Council-member accounts have recoverable public
  interactions involving CallNYC.
- Jamie is publicly named in a contemporaneous first-person project-account
  reply; Politico and the repository independently support his project role.
- The account documented a district-profile API and a JSON endpoint for
  Council-member Twitter usernames.

### Not approved

- All 110 post bodies were recovered.
- The eight-account interaction floor is a complete lifetime total.
- Twenty-six Council-member offices engaged with, endorsed, or adopted
  CallNYC merely because the project named their handles.
- Access-time likes and reposts are stable reach, adoption, or impact metrics.
- Historical recognition posts establish complete or current office
  performance.
- CallNYC was an official Council product, current city service, formal
  hackathon submission, or documented winner.

## Next Research

- Request an account-data export if available to attempt recovery of the three
  unresolved profile-counted objects.
- Preserve the high-value CallNYC status URLs and dead civic-web destinations
  in stable archives.
- Recover collaborator or administrator evidence only if it materially
  strengthens account-establishment or shared-stewardship claims; never publish
  credentials or recovery information.
- Keep stakeholder-account interactions typed by reply, repost, quote post,
  recognition response, or independent link share rather than collapsing them
  into one score.
