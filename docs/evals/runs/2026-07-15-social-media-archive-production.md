# Social-Media Archive Production Eval Run

Date: 2026-07-15

Candidate: `f2e14de9`

Decision: `stop_human_blocked`

The candidate meets the automated application-share and production-readiness
criteria exercised in this run. Production deployment and indexing remain
blocked on Jamie's explicit approval of the exact candidate.

## Authenticated Public Method

The review used Jamie Burkart's authenticated X session. The live account menu
identified `Jamie Burkart @urbanhermit`, and the public project profiles were
opened in that authenticated session. The repository retains only public URLs,
dated public profile state, bounded findings, and explicit limitations. It does
not retain cookies, session data, private messages, private-account material,
follower exports, or hidden platform data.

Authenticated profile state reproduced the dated discovery counts already in
the knowledge bank:

| Account | Profile-reported posts |
| --- | ---: |
| `@CallNYCapp` | 110 |
| `@NYCArtC` | 5,124 |
| `@wowlist` | 38 |
| `@KCTownHall` | 183 |
| `@KCSpacesFund` | 35 |

These figures are discovery metadata, not accomplishment or impact claims.

## Archival Findings

- CallNYC preserves a lower bound of 20 distinct serving Council-member
  accounts with public engagement and eight member-authored posts or replies.
- NYC Artist Coalition preserves at least five direct serving Council-member
  relationships, four mission-relevant, while thread-context relationships
  remain outside the strict count.
- Olympia Kazi's attributable use across 2020-2022 supports Jamie's first-person
  account of establishing a durable shared identity system without assigning
  every coalition post to Jamie.
- All 38 profile-reported WOW List items were recovered.
- The KC Town Hall pass recovered 181 of 183 profile-reported items and retains
  the two-item gap.
- KC Spaces Fund preserves at least 11 named public `#FUNDED` highlights while
  keeping organizer, selection, disbursement, and authorship boundaries intact.

## Recursive Corrections

The archival pass corrected the CallNYC working count from 19 to 20 distinct
members and from six to eight member-authored interactions. It also narrowed
the NYC Artist Coalition strict direct count by excluding thread context.

The first blind regression found one portfolio defect: the Technical Operations
capability cards named proof but did not link readers to deeper evidence. The
hill climb added truthful project destinations to all four cards, replaced the
unexplained homepage `OTI` shorthand, expanded `HJE`, and expanded `QA/UAT`.
A regression test now requires every primary capability to retain proof and a
labeled internal destination.

## Verification

- Two consecutive `npm run preflight:production` runs passed on `f2e14de9`.
- Citation tests: 10/10.
- Portfolio eval tests: 9/9.
- Knowledge-lifecycle tests: 40/40.
- TypeScript, ESLint, production build, knowledge-bank, public-safety, and route
  checks passed.
- The production build generated all 17 routes.
- Authenticated browser QA confirmed four rendered related-work sections,
  truthful destinations, no unexplained `OTI`, and no horizontal overflow on
  the inspected homepage and Technical Operations surfaces.

## Blind Regression

Three independent read-only judges inspected the exact source and freshly built
HTML without using PR text, optimization notes, eval-run history, or deployed
sites.

| Judge | PR-001 | PR-003 |
| --- | ---: | ---: |
| A3 | 4 | 4 |
| B3 | 4 | 4 |
| C3 | 4 | 4 |
| Median | **4** | **4** |

No judge reported a remaining failure. The final human decision is whether this
exact candidate is approved for production deployment and indexing.
