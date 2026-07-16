# NYC Artist Coalition Campaign Press Hill Climb

- Date: 2026-07-14
- Branch: `feature/evals-G`
- Candidate fingerprint:
  `d477405928aaa56cb6b8261e1d8a671c1a10a7c9850b07097549ad02fe08c8d5`
- Decision: `stop_threshold_met`

## Objective

Aggregate the Press sections from four NYC Artist Coalition campaign sites,
preserve their exact public record in the knowledge bank, and prevent an
article listing from silently becoming evidence for a personal accomplishment
claim.

## Recovered Corpus

| Campaign | Press placements |
| --- | ---: |
| Let NYC Dance | 21 |
| Talks Not Raids | 7 |
| Save NYC Spaces | 8 |
| Fair Rent NYC | 9 |
| **Total** | **45** |

The corpus contains 44 unique article identities. The sole cross-campaign
duplicate is the NPR article `With Its 'No Dancing' Law Verging On Repeal, New
York Legitimizes Its Nightlife`, which appears on both Let NYC Dance and Save
NYC Spaces.

The source-page order and exact listed URLs live in
`campaign-press-capture-inventory.json`. Four campaign Press indexes establish
that these links appeared in campaign-curated press sections. Forty-one new
article records join three reused canonical article records. Every unique
article identity has a retrievable Wayback path.

## Epistemic Boundary

Campaign placement establishes campaign curation. It does not establish the
truth of an article, Jamie's role, individual causality, or the article's
support for a portfolio claim.

Accordingly:

- the aggregate corpus claim cites only the four campaign indexes;
- article metadata observations support no claims;
- the aggregate claim is `public-safe` but `dormant`;
- its projection is held and names no reader-facing surfaces;
- article-level propositions must pass close reading, credit review, causal
  calibration, and source association through
  `RT-NYCAC-CAMPAIGN-PRESS-CLOSE-READING`.

The public website was not changed. No `/proofs`, `/knowledge-bank`, or
`/public-claims` page was added.

## Recursive Evaluation

The deterministic pass reconstructed all 45 placements and 44 identities,
verified the sole duplicate, found a Wayback path for every article, and found
no broken references, unsafe promotion, or public-route violations. It scored
`0.8900` while awaiting independent judgments.

Two fresh read-only judges reviewed the unchanged candidate. Both scored
`KD-006` (collective credit and calibrated causality) and `KD-012` (source-backed
strength through Chad's lens) `4/4`. Both bound judgments to the exact candidate
fingerprint. Their final weighted scores were `1.0000`, with all twelve
criteria met.

Stop condition: two consecutive independent holdouts passed on one unchanged
candidate fingerprint, and neither reported a material issue requiring another
iteration.

## Verification

```bash
npm run test:knowledge-evals
npm run run:knowledge-development -- --label campaign-press-holdout-1 --judgments docs/qa/evals-G/knowledge-development/campaign-press-holdout-1-judge.json --require-pass
npm run run:knowledge-development -- --label campaign-press-holdout-2 --judgments docs/qa/evals-G/knowledge-development/campaign-press-holdout-2-judge.json --require-pass
npm run check
npm run preflight:production
```

The campaign-press integrity tests pass `8/8`. Each bound holdout scorecard
passes at `1.0000`.
