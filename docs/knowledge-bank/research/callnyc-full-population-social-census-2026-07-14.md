# CallNYC Full-Population Social Census - July 14, 2026

## Purpose

This public-safe archival production pass assigns a disposition to the full
population represented by the authenticated `@CallNYCapp` profile count at
review time. It identifies mission-relevant communication patterns, posted
destinations, public sources, and bounded traction signals without treating
social activity as adoption or service impact.

The typed lifecycle records live in
`apps/www/src/data/knowledge-bank/callnyc-social-census-2026-07-14.ts`.
The redacted item-level census lives in
`docs/knowledge-bank/data/callnyc-public-post-ledger.json`.

## What 100% Means

The authenticated profile displayed `110 posts`. The review produced a
disposition for all 110 observed slots:

| Disposition | Count |
| --- | ---: |
| Recoverable public status records | 107 |
| Unresolved profile-count slots | 3 |
| Total observed population | 110 |

This is **100% disposition coverage**, not a native X data export. The three
unresolved slots have no inferred status ID, date, content, or deletion reason.
They remain open research items.

## Method

The review used an authenticated, read-only X session and:

1. traversed the Posts route to exhaustion, recovering 106 unique statuses;
2. traversed the Replies route to exhaustion, recovering 107 unique statuses;
3. deduplicated the union by canonical status URL;
4. verified that the one Replies-only record was a public CallNYC reply;
5. checked rendered results for unavailable, withheld, or deleted placeholders;
6. reconciled the union against the observed profile count;
7. classified account posts, account replies, reposts, stakeholder mentions,
   issue-recognition posts, posted destinations, and current visible metrics;
8. resolved public shortened links in July 2026; and
9. omitted raw post text from the repository while retaining stable status IDs,
   public URLs, dates, classifications, and SHA-256 content digests.

The 107 recovered records span March 5 through November 14, 2016. No
unavailable placeholder exposed a missing status ID. Date-bounded authenticated
search recovered fewer records than the timeline union and did not add a new
status.

## Population Findings

The 107 recovered records comprise:

- 86 account posts;
- 6 account replies; and
- 15 reposts.

Of the 92 account-authored statuses, 82 mention `@NYCCouncil`. The account was
therefore not only a broadcast surface. It repeatedly situated CallNYC in an
institutional constituent-service context while keeping the project independent
and unofficial.

### Issue Recognition and Contact Pattern

The corpus contains 71 issue-specific recognition statuses that:

- name 26 Council-member handles;
- link 61 distinct CallNYC issue pages; and
- span 16 top-level issue categories.

The 26-member count excludes the institutional handles `@NYCCouncil`, `@NYCHA`,
and `@NYCHousing`. The ledger preserves both the included member-handle list and
the excluded institutional list so the classification is reproducible.

This supports a bounded professional claim: Jamie's independently built,
issue-oriented civic-data prototype was paired with a repeatable public
recognition and contact loop. It does not establish that Jamie authored every
post, that every tagged office responded, or that any status produced a
completed constituent-service outcome.

The six account replies show several interaction modes:

- directing a conversation toward official SCRIE and instructional resources;
- explaining the resident-facing perspective behind the project;
- following up in a Council-member pothole exchange;
- announcing a reusable JSON endpoint for Council-member handles;
- announcing issue-specific posting and contact controls; and
- identifying Jamie in a first-person exchange as the builder of his first
  civic-technology project.

The last item is first-party account speech, not independent role evidence.
Politico New York remains the stronger source for Jamie's independent build.

## Current Visible Reaction Pattern

As observed on July 14, 2026:

- 46 of 71 issue-recognition statuses retained at least one visible reply,
  repost, or like;
- visible counts across those statuses totaled 4 replies, 66 reposts, and 86
  likes.

These are mutable present-day interface observations. They are not 2016
snapshots, unique-person counts, complete engagement histories, proof of
endorsement, evidence of institutional deployment, or measured service impact.

Separate source-by-source review continues to support a recovered minimum of
eight then-serving Council-member accounts that replied to, quoted, reposted,
or directly shared CallNYC between April 2016 and July 2017. That reciprocal
engagement study extends beyond the 2016 account-authored corpus and retains its
own office-date and denominator limits.

## Posted Destinations

The corpus contains 84 unique shortened links. In July 2026 they resolved to 76
unique destinations:

- 63 CallNYC destinations; and
- 13 external destinations.

Current resolution does not prove that a destination behaved the same way in
2016.

### External Destination Inventory

**Independent coverage and civic-data context**

- [Politico / Capital New York coverage of CallNYC](http://www.capitalnewyork.com/article/city-hall/2016/03/8593638/website-allows-getting-know-councilmembers-through-data)
- [Gizmodo coverage of an address-level 311 browser tool](https://gizmodo.com/check-the-history-of-complaints-at-any-nyc-address-with-1764099069)
- [Gothamist coverage of the Pulaski Bridge bike-path opening](https://gothamist.com/news/long-overdue-pulaski-bridge-bike-path-will-officially-open-friday)

**Civic-technology ecosystem**

- [New York City Council Labs](https://labs.council.nyc/)
- [NYC Transparency Working Group](https://nyctwg.org/)
- [BetaNYC community forum](https://talk.beta.nyc/)
- [311Buddy](http://chriswhong.github.io/311buddy/)

**Official and instructional service resources**

- [NYC Rent Freeze](https://www.nyc.gov/rentfreeze)
- [NYC homelessness-prevention help](https://www.nyc.gov/site/hra/help/homelessness-prevention.page)
- [SCRIE instructional video](https://www.youtube.com/watch?v=vwpGGRK4JgA)

**Adjacent Jamie projects**

- [WOW List](https://wowlist.org/)
- [WOW List Down With Trump path](https://wowlist.org/DownWithTrump)
- [Popular Vote](https://popular.vote/)

The external links show a curated civic context: independent coverage, open
government infrastructure, service guidance, adjacent civic tools, and city
news. Their presence does not make the referenced work part of CallNYC or
establish Jamie's role in it.

## New Source Discovery

An independently recovered source strengthens the CallNYC record:

- Noel Hidalgo, [A Brief Recap of NYC School of Data 2016](https://schoolofdata.nyc/a-brief-recap-of-nyc-school-of-data-2016/),
  March 8, 2016. The contemporaneous recap included CallNYC among its
  “Featured Hacks” and described it as profiling City Council
  constituent-service data.

Safe wording is “included among featured hacks.” The source does not establish
an award, formal presentation, partnership, endorsement, or institutional
adoption, and it does not establish Jamie's role by itself.

The Gizmodo and Gothamist articles were also accessioned as contextual sources.
They document the subjects they cover; their appearance in the account corpus
documents curatorial context, not Jamie's participation in those projects.

## Product and Measurement Leads

The corpus surfaced two product claims that deserve repository and web-archive
verification before public projection:

- a JSON endpoint intended to make Council-member social handles reusable; and
- issue-specific posting and contact controls intended to help residents act
  from an issue page.

The account also published an aggregate “people helped” interpretation of
CouncilStat issue records. That wording is retained as a source fact and
rejected as a verified person-level or outcome claim. An administrative issue
row is not automatically a unique resident, a successful resolution, a CallNYC
user, or an outcome caused by CallNYC.

## Lifecycle Decisions

- The issue-and-contact-loop claim is public-ready and deferred from website
  projection pending human editorial review.
- The NYC School of Data recognition claim is public-ready and deferred from
  website projection pending human editorial review.
- Current visible reaction counts are corroborated but held as a dated research
  snapshot.
- API and contact-control announcements are corroborated as announcements and
  routed to implementation verification.
- The aggregate service-outcome interpretation is explicitly rejected.
- The three unresolved profile-count slots remain an open, high-priority
  research task.

## Governing Anti-Claims

- Do not call this a complete X export.
- Do not infer the identity, date, content, or deletion reason of an unresolved
  slot.
- Do not treat a profile count as a stable lifetime denominator.
- Do not attribute every account-authored status to Jamie.
- Do not equate Council-handle mentions or visible reactions with adoption,
  endorsement, resident use, institutional deployment, or service impact.
- Do not convert administrative issue rows into unique people or successful
  outcomes.
- Do not treat shared articles as evidence that Jamie participated in the work
  they cover.
