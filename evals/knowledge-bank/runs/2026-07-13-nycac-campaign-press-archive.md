# NYC Artist Coalition campaign press archive

Date: 2026-07-13

Branch: `feature/evals-A`

Starting head: `b7c0d399fc1eb9cff3eac37f11da0bbd42874f4a`

## Objective

Preserve every article appearance from the Press sections of Let NYC Dance,
Talks Not Raids, Save NYC Spaces, and the supplied Fair Rent NYC archive while
deduplicating article identity, retaining campaign provenance, and preventing
metadata-level discovery from becoming unsupported public claims.

## Result

The canonical bank now retains:

- 21 Let NYC Dance appearances;
- 7 Talks Not Raids appearances;
- 8 Save NYC Spaces appearances;
- 9 Fair Rent NYC appearances;
- 45 appearances in total;
- 44 distinct article identities;
- one NPR article with two preserved campaign memberships;
- 41 newly normalized article sources;
- 3 newly normalized campaign-index sources;
- 3 existing article sources and the existing Save NYC Spaces source reused;
- 45 located and bounded campaign-selection observations;
- 4 dispositioned campaign-index intakes;
- 1 held aggregate claim;
- 1 partially recovered close-reading inquiry.

Article records remain bounded source leads. Campaign selection establishes
that an article appeared in a campaign Press section; it does not establish the
article's full contents, Jamie's individual role, campaign-site authorship,
policy causation, or a complete history of the issue.

## Hill climb

The first holdout identified a stale generated launch report. Regenerating the
report restored its current 8 hard gates, 5 runtime cases, and 8 judge criteria,
including the Chad lens. No public-site copy was added: the aggregate press
claim remains held with no authorized public surface.

Two subsequent fresh holdouts inspected the final candidate independently:

| Suite | Judge 1 | Judge 2 | Target | Scored floors |
| --- | ---: | ---: | ---: | --- |
| Knowledge-bank maturation | 4.80 | 4.80 | 4.50 | all met |
| Launch-readiness judgment | 4.30 | 4.30 | 4.20 | all met |

Both judges reported no regressions. Knowledge acceptance passed twice. The
launch judgment meets its weighted target and every scored criterion floor,
but full launch acceptance remains intentionally open until Jamie approves the
exact staging-reviewed SHA and a post-deployment production smoke test passes.
Those release gates cannot be satisfied by a pre-merge pull request.

## Verification

- Node `v26.5.0` clean install: passed.
- `npm run check`: passed.
- `npm run preflight:staging`: passed.
- `npm run preflight:production`: passed.
- `npm audit --omit=dev --audit-level=high`: passed with no high or critical
  findings; the documented moderate PostCSS advisory remains.
- Knowledge mutation tests: 12/12 passed, including rejection after removing a
  press appearance relationship.
- Staging Docker build: passed.
- Container smoke: 7/7 routes returned 200 with staging noindex headers;
  `robots.txt` disallowed crawling.
- Responsive browser QA: 55/55 route/viewport cases passed with no overflow,
  console errors, or H1 failures.
- Citation and keyboard QA: passed; the held press claim remained absent from
  the public page and the skip link remained first in focus order.

Generated reports:

- `reports/generated/knowledge-bank-maturation.md`
- `reports/generated/launch-readiness.md`
- `reports/generated/citations.md`

## Decision

Accept the knowledge iteration. The bank gains a complete source-discovery
field without turning the portfolio into a press bibliography. The next
bounded maturation pass is proposition-level close reading of selected
articles, prioritized by current hiring and public-argument needs.
