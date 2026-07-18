# NYC Artist Coalition X Population-Accounted Archival Pass

**Run date:** 2026-07-15
**Account:** `@NYCArtC`
**Status:** 100% population accounting, not 100% item recovery
**Public-safety posture:** protected full capture; minimized public aggregate-and-digest ledger

## Decision

The profile reported 5,124 posts. This pass recovered and reviewed 3,367
distinct account items and preserves the remaining 1,757 profile-count slots as
an explicit recovery gap. Every slot has a recovered-or-gap disposition, but
the gap is not described as deleted and no content type is inferred.

The corpus is strong evidence that one shared public identity carried multiple
campaign systems over time. It is not evidence that Jamie authored every post,
that one collaborator controlled the account, or that posting caused policy
outcomes.

## Acquisition And Stopping Rule

The authenticated review combined repeated traversal of the replies-inclusive
timeline, monthly historical account searches, canonical status-ID
deduplication, separate retention of public context records, and resolution of
every distinct `t.co` URL in recovered account items. A local search did not
recover a lawful owner X Archive.

The public route stopped at December 13, 2019 after 3,031 account items.
Historical searches recovered 336 additional authored posts but did not expose
older native reposts. An owner archive is the next responsible method for
reducing the gap.

## Population

| Measure | Count |
| --- | ---: |
| Profile-reported slots | 5,124 |
| Recovered account items | 3,367 |
| Explicit recovery gap | 1,757 |
| Recovered authored posts | 696 |
| Recovered native reposts | 2,671 |
| Supplemental public contexts outside denominator | 19 |
| Duplicate rendered contexts removed | 16 |

Two account self-reposts remain classified as authored source statuses.
Fifteen quote-post records were repaired so quoted-card text, reply state,
hashtags, and mentions do not contaminate account-authored classifications.

## Campaign Continuity

Source-body-only classification found these overlapping traces:

| Campaign marker | Authored posts |
| --- | ---: |
| `#FairRentNYC` | 186 |
| `#SaveNYCSpaces` | 106 |
| `#LetNYCDance` | 76 |
| `#TalksNotRaids` | 54 |

The figures measure recovered public communication, not unique initiatives,
audience reach, policy outcomes, or Jamie's individual output.
The earliest recovered `#FairRentNYC` account marker is dated October 25, 2018;
the public case-study chronology now uses that bounded starting point.

## Sources And Stakeholders

All 1,235 distinct short URLs in recovered account items resolved. Among
authored posts, 446 carried 529 link occurrences representing 287 distinct
short URLs. Twelve mission-relevant source leads connect the account record to
Cabaret Law repeal, the Office of Nightlife, MARCH and venue-enforcement
scrutiny, commercial-rent policy, and cultural-space loss. Circulation does not
mean the account authored, endorsed, or independently verified a source.

The recovered authored corpus contains 104 source-body `@NYCCouncil` mentions
across 100 posts. These are outbound communication findings, not incoming
Council engagement. The strict direct-interaction ledger remains authoritative
for incoming engagement.

Recovered native reposts include 194 Olympia Kazi source records alongside
cultural, labor, vendor, venue, and civic sources. This is collective source
circulation, not proof of who selected a repost or wrote an authored post.

## Traction Hold

On July 15, 2026, 628 of 696 recovered authored posts displayed at least one
reply, repost, or like. The interface displayed 112 replies, 1,527 reposts,
2,761 likes, and 64 bookmarks in aggregate. These counters are volatile,
incomplete, and not unique people. All counters remain held from accomplishment
messaging and do not establish reach, attendance, adoption, endorsement, or
policy impact.

## Public Safety And Lifecycle

The authenticated capture and full item-level corpus remain protected outside
the public repository. The committed 15 KB ledger retains aggregates, selected
mission-source leads, and cryptographic digests while omitting bulk post text,
quoted-card text, per-item status records, per-item mentions and counters,
historical contact details, authentication state, private messages, account
settings, private analytics, follower exports, browser storage, and session
identifiers.

- **Intake:** `INT-NYCAC-X-FULL-POPULATION-2026-07-15`
- **Primary source:** `SRC-NYCAC-X-FULL-POPULATION-2026-07-15`
- **Claims:** five bounded `CLM-NYCAC-X-*` archive claims
- **Inquiry:** `INQ-NYCAC-X-OWNER-ARCHIVE-2026`
- **Public artifacts:** minimized ledger, hash manifest, builder, checker, and
  protected-capture derivation code
- **Protected source:** `NYCAC-X-AUTHENTICATED-CAPTURE-2026-07-15`

The website is intentionally unchanged. Its current bounded shared-identity
and incoming Council-engagement language is clearer for hiring readers. The
full record remains available for future composition and correction.

## Reproduce

```bash
npm run check:nycartc-corpus
npm run evals:nycartc-x
```
