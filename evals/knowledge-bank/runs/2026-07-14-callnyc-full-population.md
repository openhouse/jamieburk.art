# CallNYC full-population archival production

Date: 2026-07-14

Branch: `feature/evals-A`

Starting head: `c0990d0a58e9e7bf6d57ab3ffa7e86df5968d9bc`

## Objective

Disposition the full population represented by the authenticated
`@CallNYCApp` profile count, preserve every recoverable public item and posted
URL, mature mission-relevant findings through the knowledge-bank lifecycle,
and strengthen the public case study without turning outreach, shared-account
activity, issue rows, or current engagement metrics into unsupported outcomes.

## Authenticated method

- Scrolled Posts and Replies to exhaustion in Jamie's authenticated X session.
- Deduplicated canonical status URLs and reconciled both tab populations.
- Ran monthly date-bounded searches as an independent discovery channel.
- Inspected status pages and resolved every recovered `t.co` link.
- Preserved public item identity, date, relationship, text, mentions, hashtags,
  URL destinations, visible metrics, and interface-level visual tokens.
- Excluded credentials, cookies, session records, direct messages, private
  analytics, and individual-author inference.

Fresh Posts produced 106 unique URLs. Replies produced 107 and supplied one
account reply absent from Posts. Their union matched the item ledger exactly.
Monthly search recovered only 47 of 92 authored statuses and supplied no new
IDs, so search was retained as incomplete discovery evidence rather than a
completeness test.

## Population and findings

| Finding | Count |
| --- | ---: |
| Observed profile-count slots | 110 |
| Item-level public records | 107 |
| Original account posts | 86 |
| Account replies | 6 |
| Reposts | 15 |
| Explicit unresolved slots | 3 |
| Account-authored statuses mentioning `@NYCCouncil` | 82 |
| Data-derived recognition posts | 71 |
| Intended Council-member accounts | 26 |
| Unique issue pages | 61 |
| Constituent-service categories | 16 |
| Short-link occurrences | 98 |
| Unique short URLs | 84 |
| Resolved destinations | 76 |
| CallNYC destinations | 63 |
| External destinations | 13 |
| Records carrying an `Image` visual token | 82 |
| Records carrying only uninterpreted emoji-like visual tokens | 5 |

The ledger provides 100 percent disposition coverage of the observed count. It
is not an X export, deletion history, withheld-status log, or historical
analytics report.

## Stakeholder and source findings

The dominant operating pattern was a repeatable public-engagement loop: derive
an issue from CouncilStat, connect it to a resident-facing issue page, name the
associated Council-member account, and place the pathway into public
conversation. Institutional accounts `@NYCCouncil`, `@NYCHousing`, and
`@NYCHA` are excluded from the 26-member intended-audience set.

The reciprocal-engagement standard remains separate. Direct public records now
support a recovered floor of eight sitting Council members after authenticated
verification of Ydanis Rodriguez's quote-post: Peter Koo, Steven Matteo, Ruben
Wills, Ydanis Rodriguez, Rosie Mendez, Helen Rosenthal, Mathieu Eugene, and
Margaret Chin. Carlina Rivera's 2016 post remains excluded because it predates
her Council service.

The complete recovered URL set surfaced official Rent Freeze and
homelessness-prevention resources, Council Labs, the NYC Transparency Working
Group, BetaNYC, 311Buddy, Gizmodo and Gothamist reporting, Politico's CallNYC
coverage, and adjacent public projects. Circulation establishes neither
partnership nor adoption. Current availability does not establish 2016
availability.

## Knowledge lifecycle

The pass added one integrated intake, eight observations, ten bounded sources,
three claims, and three research inquiries.

Selected for the CallNYC case study:

- `CLM-CALLNYC-SOCIAL-ENGAGEMENT-ARCHITECTURE`

Strengthened from the broader engagement audit:

- `CLM-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT` now carries an eight-member recovered
  floor.

Held as reserve depth:

- `CLM-CALLNYC-PUBLIC-API-ANNOUNCEMENT`
- `CLM-CALLNYC-PUBLIC-SOURCE-CIRCULATION`

Open research retains the three unrecovered count slots, historical 94/96
percent account claims, the `2,330 helped` claim, API and contact-control
implementation, individual account authorship, and visual-asset recovery and
rights review.

## Recursive hill climb

1. The first deterministic run rejected the candidate because the new public
   claim lacked a proof-coverage target. Adding the target restored the gate.
2. The full-population criterion then rejected the intake until it stated
   exactly that the ledger is not a platform export.
3. Independent Judge A rejected future recomposition value at `3 / 5`: a field
   called `mediaUrls` contained interface tokens rather than URLs. The field and
   documentation were corrected and a regression invariant was added.
4. A later adversarial read found an order-dependent stakeholder classifier in
   a post mentioning both `@MMViverito` and `@NYCHA`. The implementation now
   excludes institutional accounts explicitly, requires exactly one member
   account per recognition record, preserves the 26-account list, and rejects a
   mutation that adds `@NYCHA`.
5. The active public wording now says the 26 accounts were the intended
   institutional audience, keeping that number distinct from the separate
   eight-member response floor.
6. A final visual-evidence audit found that five of 87 token-bearing records
   carried only emoji-like tokens. The canonical field is now `visualTokens`:
   82 `Image`-indicator records are visual-recovery leads; five emoji-only sets
   remain uninterpreted; no media assets are claimed as archived.

Two consecutive fresh judges accepted the final candidate:

| Judge | Mean | Minimums | Decision | Lowest criterion |
| --- | ---: | --- | --- | --- |
| A | 4.750 | all met | accept | Chad lens, 4 / 5 |
| B | 4.875 | all met | accept | Selective composition and reader burden, 4 / 5 |

Both judges scored population integrity, stakeholder and traction integrity,
and public safety and collective credit at `5 / 5`. Neither found a material
regression.

## Verification

- Node `v26.5.0`.
- Knowledge-bank deterministic suite: `5 / 5` across 14 criteria.
- Knowledge maturation and mutation tests: 41/41 passed.
- Citation tests: 10/10 passed.
- Launch-eval tests: 6/6 passed.
- Citation registry: current and redacted.
- Public-safety and route checks: passed.
- Staging preflight and production build: passed with staging noindex settings.
- Responsive browser QA at 320, 375, 768, 1024, and 1440 px: HTTP 200, visible
  active claim and Sources section, working noteref target, visible keyboard
  focus, no horizontal overflow, and no console or page errors.
- Generated reports:
  `reports/generated/knowledge-bank-maturation.md` and
  `reports/generated/citations.md`.

## Decision

Accept. The complete observed account population has an honest disposition;
the reusable ledger preserves every recovered public item and posted URL;
mission, stakeholder, and product findings are bounded; the public portfolio
uses only the strongest hiring-relevant projection; and unresolved evidence
remains available for future archival and visual work.
