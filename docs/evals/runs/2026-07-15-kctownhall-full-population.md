# KC Town Hall Full-Population Archive Eval Run

Date: 2026-07-15

Candidate: `87588d74`

Decision: `stop_human_blocked`

The candidate meets the archive, application-share, and production-readiness
criteria exercised in this run. Production deployment and indexing remain
blocked on Jamie's explicit approval of the exact candidate.

## Population Accounting

The authenticated `@KCTownHall` profile reported 183 posts. The Posts route
recovered 170 primary records. The replies-inclusive route rendered 188 cards:
183 primary account records and five other-account conversation-context cards.
The route union therefore accounts for all 183 profile-reported records with
no unresolved population gap.

The corpus contains:

- 142 originals, 13 replies, and 28 reposts;
- 155 account-authored records;
- 30 records from 2018, 85 from 2019, 41 from 2020, 17 from 2021, and 10 from
  2022;
- 100 tire-related records and 12 survey-linked records;
- 118 records containing external links and 133 external-link occurrences;
- 31 distinct posted short URLs, all explicitly dispositioned;
- nine curated mission-relevant source records; and
- 77 account-authored records with visible dated interaction.

The public repository preserves a redacted acquisition ledger, a public-safe
derived fixture, URL disposition ledger, SHA-256 manifest, deterministic
derivation script, and tests for route corruption and coordinated record
substitution. Raw post text, historical contact information, exact addresses,
authentication state, private material, and browser-session data remain
outside Git.

## Mission-Relevant Findings

The complete population supports three bounded findings:

1. The account functioned as project infrastructure. One hundred records
   documented recurring household tire-pickup work, while 12 linked the
   neighborhood survey and resident-input surface.
2. Public stakeholder dialogue is visible at item level. Direct responses came
   from three then-serving Council-member accounts and KCMO 311; a Bridging the
   Gap collaborator separately reported receiving one KC Town Hall tire
   drop-off. Two community amplifications remain separately classified.
3. The account circulated civic and neighborhood information beyond project
   promotion. The source inventory includes housing, transit, elections, voter
   access, air quality, COVID-era resource, and cleanup material.

Visible interaction on the capture date totaled 22 replies, 70 reposts, 174
likes, and one bookmark across 77 account-authored records. Those 267 displayed
units remain archival observations, not people, endorsements, conversion,
adoption, causation, or accomplishment evidence.

The 31 posted short URLs are divided into 10 promoted-source rows, 15
operational-link-family rows, and six named research-inquiry rows. Linked
articles remain field context unless they directly support a claim. The six
unresolved leads stay in research rather than disappearing or becoming proof.

## Portfolio Projection

The public case study now connects four bounded claims to 12 public source
notes:

- Jamie co-led redevelopment planning and public-benefit documentation, and
  KCMO records identify him as a presenter;
- the 2019 municipal packet labels a $189,629 Phase One cold-shell scope
  completed;
- the packet says a collaborative neighborhood survey directly shaped the
  proposal; and
- the complete 183-record social archive documents public operating patterns
  and item-level stakeholder responses.

Jamie's reported general-contractor title, personal survey-system authorship,
individual Tired of Tires role and metrics, Cleveland Avenue outcomes, and
stewardship-transition detail remain held in named research inquiries. The
public page does not assign every account post, collective program outcome, or
municipal action to Jamie.

## Recursive Correction

Deterministic checks and independent review produced five substantive repair
rounds:

- moved the build and test environment from an incompatible Node 24 x64 path
  to the repository's Node 26 runtime;
- added a redacted acquisition ledger, complete URL triage, item-level
  stakeholder sources, service-date sources, and explicit unresolved-inquiry
  routing after the first governance review;
- clarified Jamie's supported co-lead and presenter role, projected the
  independently documented Phase One and collaborative-survey facts at project
  level, and kept personal contractor and authorship details held after the
  hiring-clarity review;
- derived primary and context membership from actual Posts and Replies route
  contents, then added route-corruption coverage; and
- made reconciliation resistant to a coordinated same-count substitution and
  attributed every public Phase One completion statement to the municipal
  packet after the final adversarial governance finding.

## Verification

- `node scripts/derive-kctownhall-x-corpus.mjs --check` reconciled 183/183
  profile-reported records and every exact aggregate.
- Two consecutive `npm run preflight:production` runs passed on the unchanged
  candidate with Node 26 and explicit production indexing policy.
- Citation tests: 10/10.
- Portfolio eval tests: 9/9.
- Knowledge-lifecycle tests: 44/44.
- TypeScript, ESLint, Next.js production build, knowledge-bank, public-safety,
  citation, and route checks passed.
- The production build generated all 17 routes.
- Earlier desktop and 390-by-844 mobile checks found no horizontal overflow or
  console errors. Those browser checks preceded the final copy expansion, so a
  final human visual read remains part of production approval.

## Blind Regression

One independent read-only judge inspected the committed evidence and public
projection directly. Two additional holdout judges scored a frozen evidence
packet derived from the same committed artifacts and deterministic results.
Tool-overrun transcripts that did not produce final scorecards were excluded.

| Judge | KP-001 | KP-002 | KP-003 | KP-004 | PR-002 | PR-004 | PR-015 | PR-017 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| A | 4 | 4 | 4 | 4 | 4 | 3 | 4 | 4 |
| B | 4 | 4 | 4 | 4 | 4 | 3 | 3 | 4 |
| C | 4 | 4 | 4 | 4 | 4 | 3 | 4 | 4 |
| Median | **4** | **4** | **4** | **4** | **4** | **3** | **4** | **4** |

All three final judges passed the candidate and reported no critical finding.
The shared 3 for voice and compression records a real residual: some role
language remains abstract, and one concrete public-safe example of Jamie's
documentation intervention could sharpen a future composition. Judge B also
held the Chad lens at 3 for that reason. These are bounded improvement
opportunities, not publication-threshold failures. The remaining required
decision is Jamie's approval of the exact production candidate.
