# KC Spaces Fund Facebook posts eval run

Date: 2026-07-15

## Criterion

- Score: 100/100
- Required score: 100/100
- Hard failures allowed: 0
- Command: `npm run evals:kcspacesfund-facebook-posts`

## Dimensions

| Dimension | Score |
| --- | ---: |
| Population boundary | 16/16 |
| Record integrity | 10/10 |
| Recovery states | 10/10 |
| Mission sequence | 10/10 |
| Route and source semantics | 10/10 |
| Displayed interaction boundary | 10/10 |
| Governed sources | 8/8 |
| Lifecycle integration | 12/12 |
| Credit, privacy, and projection | 14/14 |

## Recursive hill climb

The first run scored 90/100 because the immutable public-identity digest in the
new evaluator did not match the imported 40-row ledger. The ledger itself,
population counts, sources, lifecycle links, credit boundaries, privacy checks,
and projection checks all passed. The digest was recomputed from the public
fixture, updated to the exact 40-row value, and the evaluator was rerun.

The second run scored 100/100 with no hard failures. The first full repository
check then surfaced a Chad-lens hard failure because the strengthened proof no
longer contained the evaluator's exact collective-credit phrase. The proof was
revised to restore explicit named-organizer credit without weakening the new
role language. Chad's lens then scored 100/100.

The full `npm run check` outer gate passed after that revision. It included the
production build, citation and lifecycle tests, route and public-safety checks,
all prior corpus evaluators, the 100/100 KC Spaces Fund evaluator, and the
recursive protocol.

## Held boundaries

- Forty means every surviving public record exposed by the capture-date Page
  feed, not complete lifetime history or a native Meta export.
- Jamie receives bounded credit for web infrastructure and cross-channel naming
  support, not Page publishing, public organizing, fundraising ownership, grant
  decisions, fiscal sponsorship, or sole naming authorship.
- Displayed reactions and comments are mutable interface signals, not reach,
  endorsement, conversion, mandate, causality, or impact.
- The independently discovered Kansas City Star article must not be described
  as a Page-posted route.
- Raw bodies, personal identities, private analytics, authenticated state, and
  protected campaign records remain outside the public repository.
