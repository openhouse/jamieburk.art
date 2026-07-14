# Recursive Knowledge-Development Run

- Date: 2026-07-13 to 2026-07-14
- Branch: `feature/evals-G`
- Suite: `knowledge-development-lifecycle`, version 1
- Decision: `stop_threshold_met`
- Final candidate fingerprint:
  `2abeced36a55ee43a4f7985a0ab3f720acb1dcd07f8f710e7eff5209003e68d1`

## Result

The intake-only baseline scored `0.3775` against a required `0.85`. The first
research pass reached `0.89` before independent judgments were supplied. A
blind review passed at `3/4` on collective-credit discipline and `3/4` on
Chad-lens professional legibility while finding three correctable source-
discipline issues.

The candidate was revised, then held unchanged for two fresh blind holdouts.
Both scored every eval `4/4`, producing two consecutive weighted scores of
`1.0000`. The runner binds each final judgment to the five reviewed files with
a SHA-256 fingerprint; `npm run check` fails if evaluated content changes
without a new matching judgment.

Passing this suite means the knowledge-development system and calibration
corpus meet their criteria. It does not approve held claims for the website or
authorize production deployment.

## Corpus Developed

- 12 public-safe captures, all integrated or routed;
- 5 newly normalized public sources;
- 15 located, limited atomic observations;
- 9 developed claims: 6 source-backed direct claims and 3 held candidates;
- 8 prioritized research tasks;
- 0 canonical validation errors;
- 0 new public-site projections or routes.

The source-backed direct claims cover:

- conception of the experiential waterways expedition;
- Great Accommodations program design, outreach, and facilitation;
- initiation and tending of Open House within communal governance;
- fire-code study groups for DIY venues;
- City Hall and coalition Cabaret Law repeal advocacy;
- the announced 2017 Office of Nightlife town hall and its community-
  accountability intent.

The system preserves but does not promote candidate claims concerning Jamie's
co-founder role, causal contribution to Cabaret Law repeal, contribution to
creating the Office of Nightlife, Talks Not Raids and M.A.R.C.H. outcomes, and
CallNYC Council-account engagement metrics. The NPR URL remains a retrieval
candidate; no claim relies on unread content.

## Iterations

| Run | Score | Decision |
| --- | ---: | --- |
| Intake-only baseline | `0.3775` | Continue: captures had no research paths |
| Source and research graph | `0.8900` | Continue: independent judgments required |
| First blind review | `3/4`, `3/4` | Accept findings and revise |
| Final holdout 1 | `1.0000` | Pass |
| Final holdout 2 | `1.0000` | Pass; stop threshold met |

## Accepted Improvements

1. Added capture, observation, research-task, and three-axis claim-state
   schemas.
2. Added graph validation from capture through source, observation, claim,
   research task, and projection.
3. Added an executable 12-criterion eval suite and deterministic runner.
4. Added a public-safe intake and promotion protocol plus a photo-editor
   feedback loop.
5. Normalized five readable sources and routed the inaccessible NPR source to
   recovery work.
6. Decomposed sources into atomic observations before claim synthesis.
7. Kept direct actions strong while holding larger role and causal claims.
8. Corrected the Greene Hill page's internal Julie/Julia ambiguity by using
   `Fredenberg` in derived records until another source resolves it.
9. Added source-backed evidence for Jamie's Open House tending role alongside
   communal decision-making.
10. Linked every candidate claim directly to its research tasks.
11. Added an editorial promotion slate separating feature candidates,
    supporting proof, and research-before-promotion.
12. Bound checked-in holdout judgments to the exact reviewed candidate.

## Evidence

- [Baseline](./iteration-0-baseline.json)
- [First deterministic research pass](./iteration-1-research-graph.json)
- [First archive-ethics review](./iteration-1-judge.json)
- [First hiring-editor review](./iteration-1-hiring-judge.json)
- [Final holdout 1 judgment](./holdout-1-judge.json)
- [Final holdout 1 scorecard](./holdout-1-final.json)
- [Final holdout 2 judgment](./holdout-2-judge.json)
- [Final holdout 2 scorecard](./holdout-2-final.json)

## Verification Contract

```bash
npm run evals:knowledge
npm run test:knowledge-evals
npm run check:knowledge-development
npm run check
npm run preflight:production
```

No `/proofs`, `/knowledge-bank`, or `/public-claims` page was added.
