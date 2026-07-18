# KC Town Hall full-population archival production

Run date: 2026-07-14  
Branch: `feature/evals-A`  
Evaluated commit: `d2536a0ff2c505efe2ccfa96ebf043d46376d054`

## Objective

Recover and disposition the complete surviving public population of
`@KCTownHall` records; preserve mission-relevant sources, claims, and traction
patterns; publish only the strongest hiring-relevant projection; and keep
authorship, service totals, stakeholder engagement, and private resident data
inside explicit boundaries.

## Population result

The authenticated profile displayed 183 posts. Cross-tab recovery found 170
unique items on Posts and 13 additional account-authored replies on Replies.
After excluding five other-account conversation-context items, the ledger
contains 183 unique attributable records:

| Relationship | Records |
| --- | ---: |
| Account posts | 142 |
| Account replies | 13 |
| Reposts | 28 |
| **Total** | **183** |

This is the complete surviving population observed on July 14, 2026. It is not
a native export, lifetime account history, deletion log, or proof that no older
record was removed before capture.

## Findings retained

- 100 records concern the resident tire-report, pickup-coordination, and
  result-reporting workflow: 96 posts, three replies, and one repost.
- The remaining corpus preserves neighborhood culture, civic information,
  Town Hall participation, racial-justice documentation, and pandemic-resource
  routing.
- The 155 account-authored records mention 35 external handles. These are
  outreach touchpoints, not responses.
- The 28 project-selected reposts come from 16 source accounts. Nine source
  statuses came from three city political figures; this is amplification, not
  nine outside-authored engagements.
- Two then-sitting Council members authored recoverable direct responses in one
  April 2019 exchange. Record-level interaction annotations and an official
  Council roster support that floor.
- The corpus contains 133 short-link occurrences: 31 unique short URLs
  resolving to 20 public destinations, including nine project or direct-lineage
  destinations.
- A July 2026 snapshot records 22 replies, 70 reposts, and 174 likes on the 155
  account-authored statuses. Source-post metrics on reposts remain separately
  owned and are not project traction.

## Composition decision

One claim is active on `/work/kc-town-hall`: the shared public account functioned
as a recurring operating surface, with 100 of 183 surviving records concerning
resident tire reports, pickups, and result reporting from 2019 through 2022.

Population completeness, Council response, mission breadth, and mutable
traction remain held in the bank for future recomposition. The public page does
not infer who authored each shared-account post, one service completion per
record, Jamie's sole field-work credit, partnership, endorsement, adoption, or
audited impact.

## Hill climb

The first independent judge accepted the initial corpus commit and identified
three bounded improvements:

1. pin the public ledger citation to immutable Git history;
2. derive Council responses from record-level interaction fields rather than a
   hidden status-ID list; and
3. recompute stored aggregates from the 183 item records.

The successor commit implemented all three. Two new adversarial tests prove
that aggregate-only drift and removal of a response annotation fail the
KC Town Hall hard gate. The public citation now points to the immutable
evaluated commit containing those annotations.

## Final independent judgments

Two fresh read-only judges evaluated commit
`d2536a0ff2c505efe2ccfa96ebf043d46376d054` independently.

| Judge | Knowledge mean | Launch mean | KC Town Hall mean | Accepted |
| --- | ---: | ---: | ---: | --- |
| A | 5.00 | 4.75 | 4.71 | Yes |
| B | 5.00 | 4.38 | 4.71 | Yes |

Every knowledge criterion met its configured minimum, every launch criterion
met its floor, every KC Town Hall-specific score was at least 4, and neither
judge found a material regression. Both requested the same bounded follow-up:
repin the ledger citation from the initial corpus commit to the evaluated
successor. This run applies that follow-up.

## Deterministic verification

- Citation check: passed; 10 tests passed.
- Launch eval check: passed; 6 tests passed.
- Knowledge eval: 5/5 across 16 criteria; 53 tests passed.
- TypeScript, lint, and Next.js production build: passed.
- Knowledge-bank, public-safety, and route checks: passed.
- Staging preflight with `noindex`: passed.
- Production preflight with explicit `index`: passed.
- Production dependency audit: no high- or critical-severity findings; two
  inherited moderate PostCSS advisories remain in Next.js's dependency tree.
- Local rendered inspection at 1280 x 720: one H1, nine noterefs, one Sources
  region, nine backlinks, no duplicate IDs, no horizontal overflow, no browser
  console errors, and working forward/back citation anchors below the header.

## Durable artifacts

- Item ledger: `docs/knowledge-bank/data/kctownhall-public-post-ledger.json`
- Canonical model: `apps/www/src/data/knowledge-bank/kctownhall-social-corpus.ts`
- Intake report:
  `docs/knowledge-bank/intake/2026-07-14-kctownhall-full-population-social-corpus.md`
- Portfolio projection: `apps/www/src/content/work/kc-town-hall.mdx`
- Hard gate: `KB-EVAL-KCTH-FULL-POPULATION`

## Remaining inquiries

- A native account export or other public archive could clarify prior deletion
  and historical availability, but is not required for the current claim.
- Collaborator proofs are needed before assigning individual account authorship
  or field-work responsibility.
- Service ledgers, receipts, and approved collaborator records are needed before
  publishing project-reported tire or avoided-fee totals as reconciled outcomes.
- Historical analytics would be needed before converting current visible
  reactions into a reach claim.
