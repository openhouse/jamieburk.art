# Public engagement pathway RFC hill-climb

- Date: 2026-09-04
- Candidate: `work/2026-09-03-C`
- Scope: RFC 0012, its machine-readable contract, adversarial scenarios, and
  portfolio production-readiness integration
- Decision owner: Jamie Burkart

## Baseline: RED

The new behavior test was written before the evaluator. The test harness failed
with `ERR_MODULE_NOT_FOUND` for the not-yet-created public engagement pathway
evaluator. This established that the repository had no executable policy for
preventing private relationship evidence from becoming public offer or demand
evidence.

## Cycle 1: executable boundary

Added a proposed RFC, contract, evaluator, six scenario fixtures, and seven
behavior tests. The first green candidate:

- accepted a complete public-safe pathway only as ready for human review;
- denied private source classes and unsupported demand claims;
- denied checkout, premature pricing, and a new top-level route;
- denied automatic continuation or missing separate authorization; and
- held an incomplete engagement ladder.

Focused result: 7/7 tests, 6/6 scenarios, and 9/9 hard criteria passed.

## Cycle 2: remove the contact self-loop

Close reading found that the first contract used `/contact` as both the
canonical page and its on-page primary action. The candidate now distinguishes:

- **See ways to work together** — a supporting link from an existing portfolio
  context to `/contact`; and
- **Discuss a working session** — an email action on the Contact page.

The same focused tests and scenarios passed after the correction.

## Cycle 3: integrate without diluting the rubric

Adding blocking criterion PR-017 initially made the portfolio readiness weights
total 105. The suite correctly failed. Overlapping weight was reassigned from
general comprehension, claim safety, CTA truth, and professional-legibility
criteria while retaining all of them as blocking. The final suite contains 17
criteria, 14 blocking, with weights totaling exactly 100.

## Cycle 4: fail closed on unknown provenance

An adversarial test showed that a blacklist rejected known private source labels
but accepted an unknown label. The evaluator now allows only existing approved
public portfolio evidence and a separately approved self-authored public offer.
Known private sources retain specific denial reasons; every other source or
claim class is denied as unapproved.

## Final candidate: GREEN

The fail-fast hill-climb command verifies:

```bash
npm run hillclimb:public-engagement-pathway
```

Expected evidence for this candidate:

- portfolio eval schema: 17 criteria, 14 blocking, weight 100;
- RFC behavior tests: 8/8 passing;
- RFC scenarios: 7/7 passing;
- RFC hard criteria: all passing;
- RFC structure and behavioral checks: 12 numbered RFCs passing;
- public-safety checks: passing, with existing careful-claim warnings retained;
- route checks: passing; and
- paired-workspace tests: 11/11 passing.

These deterministic results do not satisfy fresh rendered-reader review,
accept RFC 0012, approve exact copy or pricing, authorize implementation, merge,
publish, deploy, or index anything. Those remain human gates.
