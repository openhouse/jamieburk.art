# Portfolio Blind-Spot Hill Climb

Date: 2026-07-15

Candidate: `feature/evals-I` working tree

Suite: `.agents/evals/portfolio-blind-spots.json`

## Objective

Turn seven identified portfolio risks into measurable stopping conditions,
improve every condition an agent can address from public-safe repository
evidence, and stop honestly where direct human evidence is required.

## Baseline

- Role and current-practice evidence existed, but no dedicated blind-spot suite
  governed them.
- Lead-project action, work product, result, and causal-boundary evidence was
  distributed across case studies, proof records, and claims.
- The knowledge bank had strong validation but no compact lifecycle,
  maintenance, review-age, and target-role report.
- No governed protocols existed for collaborator review, hiring-reader tasks,
  market-response observation, or rights-aware photo selection.
- The public asset tree contained no project-image files.

## Iterations

1. Defined seven weighted evals and hard constraints. Three evals explicitly
   require direct human evidence and cannot be passed by an agent.
2. Verified the first-screen role proposition and assembled five bounded
   2025-2026 proof records into a current-evidence set.
3. Composed exactly three lead action-to-outcome chains for Harry J. Epstein,
   FairRentNYC, and CallNYC, with proof/claim references and causal boundaries.
4. Added deterministic maintenance reporting. The first pass found the public
   Espinal/NYC Artist Coalition source was registered but not decomposed; an
   atomic source assertion now links it into the lifecycle.
5. Added protocols and fields for exact-candidate review, collaborator
   correction, timed hiring-reader observation, bounded market response, and
   visual rights/consent review.
6. Added mutation tests proving that absent human evidence, invented current
   proofs, missing causal boundaries, first-screen role drift, visual absence,
   and maintenance drift fail their respective controls.

## Result

| Eval | Result | Score |
| --- | --- | ---: |
| BS-001 Collaborator and independent review | Human blocked | 2/4 |
| BS-002 First-screen role conversion | Criteria met | 4/4 |
| BS-003 Current professional evidence | Criteria met | 4/4 |
| BS-004 Hiring-reader and market observation | Human blocked | 1/4 |
| BS-005 Three lead outcome chains | Criteria met | 4/4 |
| BS-006 Rights-aware visual evidence | Human blocked | 1/4 |
| BS-007 Knowledge-bank maintenance | Criteria met | 4/4 |

Weighted score: `0.71`

Machine-actionable score: `1.00`

Human-evidence score: `0.3409`

Status: `human_blocked`

The recursive agent loop reached its stopping condition. Further score changes
for BS-001, BS-004, or BS-006 require new direct evidence from reviewers,
collaborators, hiring readers, market response, or visual-rights review. A
protocol or agent inference is not a substitute.

## Reproduce

```bash
npm run eval:blind-spots
npm run test:blind-spots
npm run report:knowledge-maintenance
```
