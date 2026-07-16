# NYC Artist Coalition X population-accounting run

Date: July 15, 2026

Operator: Codex, using Jamie Burkart's authenticated in-app browser session

Account: [@NYCArtC](https://x.com/NYCArtC)

## Question

What does a full population-accounted pass establish about campaign continuity,
posted sources, stakeholder communication, mission-relevant traction, and
evidence gaps?

## Population result

The profile reported 5,124 posts. The pass recovered 3,367 distinct account
items and preserves the 1,757-item difference explicitly. It does not describe
the difference as deleted content or infer item type.

| Population component | Count |
| --- | ---: |
| Profile-reported posts | 5,124 |
| Recovered account items | 3,367 |
| Recovered authored posts | 696 |
| Recovered reposts | 2,671 |
| Explicit recovery gap | 1,757 |
| Context-only public records, outside denominator | 19 |
| Duplicate rendered context views removed | 16 |

The recovered range is February 3, 2017 through May 18, 2026.

## Method

1. Verified the signed-in `@urbanhermit` identity and opened the replies-inclusive profile.
2. Traversed the rendered profile in overlapping increments, then repeated a denser overlapping pass. Both converged at 3,031 account-item IDs and a December 13, 2019 cutoff.
3. Ran monthly historical authored-search partitions from January 2017 through the cutoff. A second month-by-month 2017 pass added no IDs.
4. Recorded per-item recovery partition membership, classified authored posts
   and native reposts separately, retained 19 context-only records, and removed
   16 duplicate rendered context views of account items.
5. Resolved all distinct `t.co` URLs present in recovered account items.
6. Omitted third-party repost text while preserving status identity, source handle, text hash, hashtags, mentions, links, date, and media metadata.
7. Redacted public contact details and tracking values and excluded all private account surfaces.
8. Derived campaign-marker, mention, repost-source, link-domain, source-lead, and held visible-interaction inventories.

## Campaign continuity

Among 696 recovered authored posts:

| Campaign marker | Distinct authored posts | Visible marker occurrences |
| --- | ---: | ---: |
| `#FairRentNYC` | 195 | 230 |
| `#SaveNYCSpaces` | 110 | 117 |
| `#LetNYCDance` | 78 | 78 |
| `#TalksNotRaids` | 54 | 61 |

Categories overlap. These counts establish durable public communication under
one shared identity, not campaign outcomes, audience reach, or policy causation.

## Sources and action paths

Every one of the 1,235 distinct short URLs in recovered account items resolved.
Four context-only short links remain unresolved and are excluded from that
count.

Of 696 authored posts, 446 contain 529 outgoing-link occurrences representing
287 distinct short URLs. The inventory spans campaign sites, government records,
reporting, forms, event pages, and field resources.

Mission-relevant source leads include:

- Cabaret Law repeal reporting from Gothamist and The New York Times;
- Office of Nightlife reporting from amNewYork, The New York Times, and the New York Daily News;
- MARCH accountability and 50-a reporting from Gothamist;
- commercial-rent reporting from City Limits and the New York Daily News;
- American Theatre's report on the Lark's closure and proposed rent increase;
- Hell Gate reporting on recurring nightlife enforcement in 2023 and Saint Vitus in 2024.

A posted destination proves source circulation only. It does not establish
endorsement, article accuracy, audience reach, or authorship of the linked work.

## Stakeholder patterns

The authored corpus includes 115 visible `@NYCCouncil` mentions across 109
posts. It repeatedly addresses public agencies, venues, artists, labor, tenant,
vendor, and community groups. These are outbound communication findings.

The separately governed incoming-engagement claim remains narrower: at least
four people serving on the Council visibly engaged with the coalition account
from 2018 through 2020, based on posts authored by their accounts and official
role corroboration.

Recovered repost sources span organizers, arts and labor groups, tenant and
vendor coalitions, elected officials, and public agencies. Those counts are
lower bounds because historical search did not expose older native reposts.

## Held observation

On the capture date, 630 of 696 authored posts displayed at least one visible
interaction. Aggregate labels were 112 replies, 1,527 reposts, 2,761 likes, and
64 bookmarks.

These figures remain on hold. Platform metrics are volatile and incomplete;
they do not identify stakeholder classes or measure campaign, policy,
organizational, or cultural outcomes.

## Authorship and privacy

This is a shared coalition-account record. It does not identify Jamie or any
collaborator as author of every post and does not independently prove who
created or administered the account.

The public capture contains no private messages, account settings, non-public
analytics, authentication material, follower exports, browser storage, or
session identifiers. Third-party repost text is omitted. Contact and tracking
values are redacted.

## Reproducible artifacts

- [Public-safe raw extraction](../corpora/source-captures/nycartc-x-browser-extraction-2026-07-15-utc.json)
- [Governed item-level corpus](../corpora/nycartc-x-full-population-2026-07-15.json)
- [Transformation manifest](../corpora/nycartc-x-full-population-2026-07-15.manifest.json)
- Derivation and validation: `scripts/derive-nycartc-x-corpus.mjs`

Run `npm run check:nycartc-corpus` to reproduce the derived metrics and verify
the hashes, population accounting, URL resolution, redaction, and classification
rules.

## Next research

1. Recover a lawful account archive or stronger public archive to reduce the 1,757-item gap.
2. Close-read and preserve blocked or dead article bodies before promoting article-level claims.
3. Corroborate Jamie's account-establishment and identity-stewardship role while preserving shared authorship.
