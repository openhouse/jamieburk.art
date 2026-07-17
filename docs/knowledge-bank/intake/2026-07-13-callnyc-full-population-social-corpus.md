# CallNYC full-population social corpus

**Reviewed:** 2026-07-13
**Account:** [@CallNYCApp](https://x.com/CallNYCapp)
**Canonical ledger:** `docs/knowledge-bank/data/callnyc-public-post-ledger.json`

## Archival question

What does the full recoverable public account record establish about CallNYC's
mission, product, sources, stakeholder reach, traction, and Jamie's role, and
what remains unknown?

For this pass, `100 percent` means every slot in the 110-item profile count
observed on the review date receives a disposition. It does not mean X supplied
a platform export, deletion history, withheld-status log, or historical
analytics.

## Method

1. Scrolled the authenticated Posts surface to exhaustion twice and
   deduplicated canonical status URLs.
2. Scrolled the authenticated Replies surface to exhaustion and reconciled its
   account-authored statuses against the Posts result.
3. Used date-bounded authenticated search, direct status checks, public search,
   and Wayback/CDX recovery for missing IDs.
4. Resolved every recovered `t.co` URL and recorded its current destination and
   observed HTTP status.
5. Preserved status ID, date, account relationship, public text, mentions,
   hashtags, outbound links, media URLs, and currently visible public metrics.
6. Excluded credentials, cookies, session material, private messages, account
   analytics, and post-author identity inference.

## Population audit

| Disposition | Count |
| --- | ---: |
| Original account posts | 86 |
| Account replies | 6 |
| Reposts | 15 |
| Unique item-level recoveries | 107 |
| Explicit unresolved count slots | 3 |
| **Observed population disposition total** | **110** |

The Posts tab yielded 106 items. The Replies tab supplied one additional reply,
[`722837286476390401`](https://x.com/CallNYCapp/status/722837286476390401),
that was absent from the Posts-tab inventory. Three count slots remain
`not-recovered`; no status IDs or content are inferred for them.

## Mission and product pattern

The dominant account-authored pattern was a repeatable civic-data engagement
loop:

1. identify a constituent-service issue in CouncilStat data;
2. name the Council-member account associated with the highest reported issue
   count under the project's method;
3. link to a CallNYC issue page;
4. thank the office and place the issue in a public conversation.

The recovered corpus contains:

- 92 account-authored statuses, 82 of which mention `@NYCCouncil`;
- 71 data-derived issue-recognition posts;
- 26 Council-member handles named in those recognition posts;
- 61 unique linked issue pages;
- 16 top-level constituent-service categories;
- 98 short-link occurrences resolving to 76 unique destinations;
- 63 unique CallNYC destination URLs; and
- 13 unique external destination URLs.

These are publication and information-architecture measures. A tag is intended
institutional reach, not evidence that the office saw, replied to, reposted, or
endorsed the project. A post is not a resolved case. A link is not verified
resident use.

## Stakeholder patterns

### Council members and offices

The 71 recognition posts named 26 contemporaneous Council-member accounts
across housing, transportation, immigration, benefits, sanitation, parks,
utilities, health, finance, cultural affairs, land use, and other service
categories.

A separate direct-action standard still supports the stronger reciprocal
traction claim: at least five sitting members publicly amplified CallNYC in
2016. Helen Rosenthal recommended it to constituents; Ydanis Rodriguez, Rosie
Mendez, and Mathieu Eugene quote-amplified recognitions; and Peter Koo retweeted
one. That is individual-account amplification, not official NYC Council
endorsement.

### Residents and public-service pathways

The six recovered replies show a more reciprocal mode than the recognition
posts. They include:

- rent-freeze and SCRIE guidance linking to an official City page and a public
  how-to video;
- a response about people experiencing an issue helping surface solutions;
- an affirmative exchange with a Council member about pothole engagement;
- a JSON endpoint announcement for Council-member Twitter usernames;
- an issue-specific Council contact-button announcement; and
- a first-person introduction connecting Jamie to CallNYC.

The historical guidance is not current advice. The portfolio must continue to
present CallNYC as archived and unofficial.

### Civic-tech and open-data ecosystem

Posted or reposted links connect CallNYC to Council Labs, NYC Transparency
Working Group, BetaNYC, 311Buddy, a Gizmodo article about a 311 browser tool,
the NYC Digital Playbook conversation, Civic Hall, and Politico's CallNYC
coverage. These links document ecosystem orientation and source discovery;
they do not by themselves establish partnership, endorsement, or use.

An independent source discovered during this pass is stronger. Noel Hidalgo's
[NYC School of Data 2016 recap](https://schoolofdata.nyc/a-brief-recap-of-nyc-school-of-data-2016/)
featured CallNYC among civic hacks and described it as profiling City Council
constituent-service data. The knowledge bank promotes this as contemporaneous
independent recognition, not an award or official endorsement.

## Posted URL inventory

The ledger preserves all 84 unique recovered `t.co` links and their 76 resolved
destinations. Mission-relevant external destinations include:

- official City rent-freeze and homelessness-prevention resources;
- a SCRIE how-to video;
- Politico coverage of CallNYC;
- Council Labs, NYC Transparency Working Group, and BetaNYC;
- 311Buddy and related Gizmodo coverage;
- Gothamist reporting on the Pulaski Bridge bike path; and
- adjacent WOW List project pages.

Resolver status was observed in July 2026. A current `200`, redirect, `403`, or
`404` does not establish 2016 availability or continuity.

## Claims promoted

- `CLM-CALLNYC-SOCIAL-ENGAGEMENT-ARCHITECTURE` is selected for the CallNYC
  case study and Technical Operations. It makes the scale and intended audience
  legible without converting tags into responses or issue rows into people.
- `CLM-CALLNYC-SCHOOL-OF-DATA-RECOGNITION` is selected for the case study as
  independent contemporaneous recognition.
- `callnyc-public-engagement-architecture` is added to the proof bank with
  source-backed coverage and explicit anti-claims.

## Reserve depth

Contemporaneous account posts announced:

- a District Profile API with name, phone, email, Twitter, and service fields;
- a JSON endpoint for Council-member Twitter usernames; and
- issue-specific buttons for tweeting Council members.

`CLM-CALLNYC-PUBLIC-API-ANNOUNCEMENT` records the announcements as reserve
depth. The currently available source repository and live archived snapshot do
not yet independently establish the exact historical endpoint behavior,
interaction design, use, or adoption.

## Research debt

- Recover or explain the three unresolved profile-count slots without
  inventing status IDs or content.
- Reconstruct the exact method behind the account's 94 and 96 percent
  Council-on-Twitter claims.
- Reconstruct the exact 2016 query behind the account's `2,330 helped in 365`
  post.
- Recover the historical API response and issue-specific contact controls.
- Attribute individual posts only from drafts, exports, repository evidence,
  explicit signing, or collaborator confirmation.

The current public dataset metadata states that one row represents an issue and
one case can contain multiple issues. Therefore, the account's historical
`helped` wording is not promoted as a verified unique-person count. The current
dataset also must not be assumed to reproduce the exact 2016 schema or office
population.

## Public-safety boundaries

- Do not call the ledger a complete X export.
- Do not convert 26 named Council-member accounts into 26 reciprocal
  engagements or endorsements.
- Do not convert 71 recognition posts into service outcomes.
- Do not convert issue rows into unique people helped.
- Do not attribute every account post to Jamie.
- Do not aggregate currently visible metrics as contemporaneous campaign
  analytics or unique-person reach.
- Do not publish authentication, session, private-message, or account-analytics
  material.
