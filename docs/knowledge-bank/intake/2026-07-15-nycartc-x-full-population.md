# NYC Artist Coalition X Full-Population Receipt

**Research date:** July 15, 2026

**Account:** [@NYCArtC](https://x.com/NYCArtC)

**Access posture:** authenticated public X session belonging to Jamie Burkart

**Publication posture:** public-safe account records and derived findings only

## Result

The live profile reported **5,124 posts**. The archival-production pass
recovered **3,367 distinct account items** and preserves the remaining **1,757**
as an explicit recovery gap.

The recovered set contains 696 authored posts and 2,671 reposts.

| Population component | Count |
| --- | ---: |
| Profile-reported posts | 5,124 |
| Recovered account items | 3,367 |
| Recovered authored posts | 696 |
| Recovered reposts | 2,671 |
| Explicit recovery gap | 1,757 |
| Context-only public records, outside denominator | 19 |
| Duplicate rendered views removed | 16 |

This is **100% population accounting, not 100% item recovery**. The gap is not
described as deleted content and no item type is inferred for it. The recovered
range is February 3, 2017 through May 18, 2026.

## Method

1. Verified the authenticated profile and its 5,124-post control.
2. Traversed the replies-inclusive profile in overlapping passes. Both
   converged at 3,031 account-item IDs and a December 13, 2019 cutoff.
3. Ran monthly historical authored-search partitions from January 2017 through
   the cutoff. A second 2017 pass added no IDs.
4. Deduplicated stable status IDs, separated authored posts from native reposts,
   retained context-only records outside the denominator, and removed duplicate
   rendered views.
5. Resolved every distinct `t.co` URL present in recovered account items.
6. Derived campaign-marker, stakeholder, link-domain, repost-source,
   source-lead, and dated visible-interaction inventories.
7. Omitted third-party repost text, redacted public contact and tracking values,
   and excluded every private account surface.

## Campaign Continuity

Among 696 recovered authored posts:

| Campaign marker | Distinct authored posts | Visible marker occurrences |
| --- | ---: | ---: |
| `#FairRentNYC` | 195 | 230 |
| `#SaveNYCSpaces` | 110 | 117 |
| `#LetNYCDance` | 78 | 78 |
| `#TalksNotRaids` | 54 | 61 |

Categories overlap. The counts establish durable public communication under a
shared identity, not campaign outcomes, audience reach, or policy causation.

## Sources And Action Paths

All **1,235 distinct short URLs** in recovered account items resolved. Four
context-only short links remain unresolved and are excluded from that count.

Of 696 authored posts, **446 contain 529 outgoing-link occurrences**
representing **287 distinct short URLs**. Destinations include campaign sites,
official records, reporting, forms, event pages, and field resources.

Mission-relevant source leads include:

- Cabaret Law repeal reporting from Gothamist and The New York Times;
- Office of Nightlife reporting from amNewYork, The New York Times, and the New
  York Daily News;
- MARCH accountability and 50-a reporting from Gothamist;
- commercial-rent reporting from City Limits and the New York Daily News;
- American Theatre's report on the Lark's closure and proposed rent increase;
- Hell Gate reporting on nightlife enforcement in 2023 and Saint Vitus in
  2024.

The bank promotes close-read source records where the body was recovered and
keeps blocked article-body details as source leads. Posting a destination proves
circulation only, not endorsement, article accuracy, audience reach, or
authorship of the linked work.

## Stakeholder Patterns

The authored corpus includes **115 visible `@NYCCouncil` mentions across 109
posts**. It repeatedly addresses public agencies, venues, artists, labor,
tenant, vendor, and community groups.

These are outbound communication findings. They are not incoming Council
engagement. Incoming engagement remains governed by the separate mention corpus,
which counts public posts authored by Council and agency accounts.

Recovered repost sources span organizers, arts and labor groups, tenant and
vendor coalitions, elected officials, and public agencies. Repost-source counts
are lower bounds because historical search did not expose older native reposts.

## Held Traction Observation

On July 15, 2026, 630 of 696 authored posts displayed at least one visible
interaction. Observed totals were 112 replies, 1,527 reposts, 2,761 likes, and
64 bookmarks.

These figures are **held from accomplishment messaging**. Platform counters are
volatile and incomplete; they do not identify stakeholder classes or measure
campaign, policy, organizational, or cultural outcomes. Metrics on third-party
reposts belong to the original posts and are not counted as coalition traction.

## Authorship And Collective Credit

This is a shared coalition-account record. It does not identify Jamie or any
collaborator as author of every post and does not independently prove who
created or administered the account.

Jamie reports that he established the identity system and account while
multiple collaborators used it over time. That statement remains a bounded
first-person claim pending independent account-creation or administrator
evidence. The corpus does establish that one public identity remained usable
across four campaign systems and years of collective work.

## Public-Safety Boundary

The committed artifacts contain no private messages, account settings,
non-public analytics, authentication material, browser storage, follower
exports, or session identifiers. Third-party repost text is omitted. Public
contact details and tracking values are redacted.

## Reproducible Artifacts

- `docs/knowledge-bank/corpora/source-captures/nycartc-x-browser-extraction-2026-07-15-utc.json`
- `docs/knowledge-bank/corpora/nycartc-x-full-population-2026-07-15.json`
- `docs/knowledge-bank/corpora/nycartc-x-full-population-2026-07-15.manifest.json`
- `scripts/derive-nycartc-x-corpus.mjs`
- `scripts/evals-nycartc-x-corpus.mjs`

Run `npm run check:nycartc-corpus` to reproduce the governed corpus and hashes.
Run `npm run evals:nycartc-x` to test population arithmetic, classifications,
source positioning, privacy boundaries, and projection discipline.

## Lifecycle Disposition

- **Intake:** `INTAKE-2026-07-15-NYCARTC-X-FULL-POPULATION`
- **Primary source:** `SRC-NAC-X-CORPUS-2026-07-15`
- **Claims:** `CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER`,
  `CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION`,
  `CLM-NAC-X-STAKEHOLDER-COMMUNICATION`,
  `CLM-NAC-X-REPOST-SOURCE-PATTERN`, and
  `CLM-NAC-X-SOCIAL-TRACTION-OBSERVATION`
- **Inquiry:** `INQ-NAC-X-FULL-POPULATION-2026`

The website is intentionally unchanged. Its current bounded shared-identity
and incoming Council-engagement language is clearer for hiring readers than
these corpus metrics. The deeper campaign, source, stakeholder, repost-source,
traction, and recovery findings remain in the knowledge bank for future
purpose-specific composition.
