# CallNYC Full-Population Archive Eval Run

Date: 2026-07-15

Candidate: `b40eb507`

Decision: `stop_human_blocked`

The candidate meets the archive, application-share, and production-readiness
criteria exercised in this run. Production deployment and indexing remain
blocked on Jamie's explicit approval of the exact candidate.

## Population Accounting

The authenticated replies-inclusive profile reported 110 posts. Repeated
bottom-of-timeline passes recovered 107 distinct public items: 92 authored by
`@CallNYCapp` and 15 reposts. The repository preserves every recovered item,
its raw capture, SHA-256 digest, derivation manifest, transformation script,
and reproducible aggregates. The three-item profile-count difference remains
explicit and unresolved.

The corpus recovered:

- 71 service-recognition posts naming 26 distinct Council members;
- 61 normalized resident-facing issue-page destinations;
- 98 outgoing-link occurrences, including 13 external source or resource
  links;
- 75 authored posts with visible media;
- 59 authored posts with visible engagement;
- dated authored-post totals of 8 replies, 74 reposts, and 111 likes.

These visible labels are archival observations, not lifetime analytics or
resident outcomes.

## Mission-Relevant Findings

The corpus and linked evidence distinguish three different systems:

1. CallNYC's own output: 71 recognition posts directed to 26 Council members.
2. Incoming stakeholder response: attributable interactions from at least 20
   serving Council-member accounts, including eight member-authored posts or
   replies.
3. Product decisions: borough-based filtering, a Twitter contact path added
   after conversations about reluctance to call, social-sharing and search
   discovery design, and a small Council-member Twitter JSON interface.

The source inventory also preserves contemporaneous reporting, public-service
resources, and civic-technology peers without converting those links into
Jamie authorship, endorsement, official City status, or current guidance.

## Recursive Correction

The first blind judge rejected the candidate because the public raw capture,
manifest, and corpus named the personal account used to authenticate the X
session. That identity was unnecessary to reproduce the public record and
conflicted with the archive's no-session-data contract.

The hill climb:

- removed authenticated-session identity from all public corpus artifacts;
- regenerated and cross-checked the raw-capture digest;
- added lifecycle assertions that prohibit authentication identity and the
  personal account handle in those three public artifacts;
- added a public-safety scanner rule that rejects authentication-identity keys
  anywhere under the public corpus tree;
- changed the internal selection rationale from `public uptake` to the more
  exact `attributable public response`;
- preserved a boundary that historical addresses, telephone numbers, and
  service links in public posts are archival text, not current guidance.

## Verification

- `node scripts/derive-callnyc-x-corpus.mjs` reproduced the committed corpus
  and all aggregates.
- Two consecutive `npm run preflight:production` runs passed on the unchanged
  candidate with Node 26 and the explicit production indexing policy.
- Citation tests: 10/10.
- Portfolio eval tests: 9/9.
- Knowledge-lifecycle tests: 41/41.
- TypeScript, ESLint, Next.js production build, knowledge-bank, public-safety,
  citation, and route checks passed.
- The production build generated all 17 routes.
- Authenticated browser QA confirmed the current CallNYC page, nine source
  notes, the public corpus link, the product-decision language, the population
  boundary, and no horizontal overflow.

## Blind Regression

Three independent read-only judges inspected the repaired source, generated
public registry, corpus chain, and build artifacts without using PR text,
optimization notes, eval-run history, Git history, or deployed sites.

| Judge | FP-001 | FP-002 | FP-003 | PR-002 | PR-004 | PR-015 | PR-017 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| A | 4 | 4 | 3 | 4 | 3 | 4 | 4 |
| B | 4 | 4 | 4 | 4 | 4 | 4 | 4 |
| C | 4 | 4 | 4 | 4 | 3 | 4 | 4 |
| Median | **4** | **4** | **4** | **4** | **3** | **4** | **4** |

All three repaired-candidate judgments passed. No judge reported a critical
overstatement, critical understatement, privacy leak, protected-data finding,
source-disclaimer conflict, or corpus reproducibility defect. The final human
decision is whether this exact candidate is approved for production deployment
and indexing.
