# Recursive Knowledge-Development Run

- Date: 2026-07-13 to 2026-07-14
- Branch: `feature/evals-G`
- Suite: `knowledge-development-lifecycle`, version 1
- Decision: `stop_threshold_met`
- Final candidate fingerprint:
  `5c1ab3d7743e8764a33b7288bf2a188b347fd139986315fa74876aea5af74a34`

## Result

The intake-only baseline scored `0.3775` against a required `0.85`. The first
research pass reached `0.89` before independent judgments were supplied. The
expanded pass then ingested ten new NYC Artist Coalition and Talks Not Raids
sources and selected seven bounded claims for the civic case study.

Independent reviews found and corrected timid Cabaret wording, an ambiguous
causal transition, an overstatement of an announced town hall, and an unclear
transition between the 2017-2023 coalition record and the 2026 Commercial Rent
Stabilization collaboration. The final candidate was then held unchanged for
two fresh blind holdouts. Both scored the ten deterministic or hybrid evals
`4/4` and the two LLM-judged evals `3/4`, producing two consecutive weighted
scores of `0.9725`.

The campaign-press expansion then transcribed the Press sections of Let NYC
Dance, Talks Not Raids, Save NYC Spaces, and Fair Rent NYC as an ordered,
deduplicated research corpus. It preserves 45 placements representing 44
unique articles, including the NPR article listed by two campaigns. Every
article identity has a canonical source record and a retrievable Wayback path.

The expanded candidate was held unchanged for two more fresh blind holdouts.
Both independently reconstructed the corpus, found the sole duplicate, and
scored collective-credit calibration and Chad's lens `4/4`. Each final
scorecard reached `1.0000`, with all twelve criteria met and no blocking or
nonblocking failures.

The KC Town Hall pass then recovered four official KCMO records that establish
the proposal role, Board recommendation, Council acceptance, Council
appropriation, later withdrawal, and reappropriation of the unused amount. The
public projection keeps Jamie's City-listed developer/presenter role separate
from the government decisions and does not convert appropriation into receipt
or expenditure.

Two fresh read-only holdouts reviewed the unchanged KC Town Hall candidate. The
first scored both judged criteria at `4/4`, for a weighted score of `1.0000`;
the second scored `KD-006` at `4/4` and `KD-012` at `3/4`, for `0.9925`. Both met every stopping
criterion with no blocking or nonblocking failures.

The runner binds each judgment to the reviewed candidate files with a SHA-256
fingerprint. `npm run check` fails if evaluated content changes without a new
matching judgment.

Passing this suite means the knowledge-development system and calibration
corpus meet their criteria. It does not approve held claims for the website or
authorize production deployment.

## Corpus Developed

- 27 public-safe captures, all integrated or routed;
- 64 normalized development sources, including 41 new article records and 4
  campaign Press indexes in the campaign-press expansion;
- 83 located, limited atomic observations;
- 18 developed claims, plus selected claims in the canonical registry;
- 10 prioritized research tasks;
- 0 canonical validation errors;
- 45 ordered campaign-press placements representing 44 unique articles;
- 4 official KC Town Hall funding sources and 2 bounded claims;
- 7 selected civic-case-study claims and 0 prohibited public routes.

The source-backed direct claims cover:

- conception of the experiential waterways expedition;
- Great Accommodations program design, outreach, and facilitation;
- initiation and tending of Open House within communal governance;
- fire-code study groups for DIY venues;
- City Hall and coalition Cabaret Law repeal advocacy;
- post-creation Office of Nightlife recommendations and an announced invitation
  to community dialogue;
- Jamie's 2019 Council testimony for Talks Not Raids and MARCH transparency;
- Local Law 220's reporting, notice, and response requirements;
- the City's 2023 replacement of MARCH with CURE, without individual causal
  attribution.

The system now supports the public-source wording that Jamie was a founding
member of NYC Artist Coalition and states his Cabaret actions directly. It
still holds individual causality for Office creation, legislation, and MARCH's
replacement; the exact Fireguard pass-rate result; and CallNYC Council-account
engagement metrics. A readable NPR syndication was recovered and normalized.

## Iterations

| Run                               |            Score | Decision                                     |
| --------------------------------- | ---------------: | -------------------------------------------- |
| Intake-only baseline              |         `0.3775` | Continue: captures had no research paths     |
| Source and research graph         |         `0.8900` | Continue: independent judgments required     |
| First blind review                |     `3/4`, `3/4` | Accept findings and revise                   |
| Ten-source expansion              |         `0.8900` | Continue: new independent judgments required |
| Direct-action revision            | `3/4-4/4`, `3/4` | Accept findings and revise                   |
| Source-precision revision         | `3/4-4/4`, `3/4` | Accept findings and freeze candidate         |
| Final holdout 1                   |         `0.9725` | Pass                                         |
| Final holdout 2                   |         `0.9725` | Pass; stop threshold met                     |
| Campaign-press deterministic pass |         `0.8900` | Continue: independent judgments required     |
| Campaign-press holdout 1          |         `1.0000` | Pass                                         |
| Campaign-press holdout 2          |         `1.0000` | Pass; stop threshold met                     |
| KC Town Hall deterministic pass   |         `0.8900` | Continue: independent judgments required     |
| KC Town Hall holdout 1            |         `1.0000` | Pass                                         |
| KC Town Hall holdout 2            |         `0.9925` | Pass; stop threshold met                     |

## Accepted Improvements

1. Added capture, observation, research-task, and three-axis claim-state
   schemas.
2. Added graph validation from capture through source, observation, claim,
   research task, and projection.
3. Added an executable 12-criterion eval suite and deterministic runner.
4. Added a public-safe intake and promotion protocol plus a photo-editor
   feedback loop.
5. Normalized the initial five-source calibration corpus and the ten additional
   public sources in this pass.
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
13. Matured founding-member, Cabaret contribution, policy-communications,
    Office-accountability, Talks Not Raids testimony, Local Law 220, and CURE
    claims while holding unearned causal language.
14. Reworked the civic case study into direct action, coalition infrastructure,
    and government-record sections with a concrete Council use of coalition
    FOIL research.
15. Preserved the exact Fireguard result as an attributed, held claim with a
    bounded corroboration task.
16. Reproduced all four campaign Press sections as 45 ordered placements and
    44 unique article identities.
17. Recorded campaign-page provenance, original article URLs, immutable
    campaign captures, and a retrievable Wayback path for every article.
18. Reused three existing canonical article records and added 41 normalized
    article records without duplicating source identities.
19. Kept unread article metadata out of personal accomplishment claims and
    routed all article-level interpretation through one bounded close-reading
    task.
20. Added exact-order, exact-count, deduplication, archive-coverage, and
    anti-promotion tests for the campaign corpus.
21. Recovered the official KC Town Hall proposal, resolution, appropriation,
    and reappropriation chain; separated Jamie's role from government action;
    and added exact regression tests for the public wording and unused-funds
    ending.

## Evidence

- [Baseline](./iteration-0-baseline.json)
- [First deterministic research pass](./iteration-1-research-graph.json)
- [First archive-ethics review](./iteration-1-judge.json)
- [First hiring-editor review](./iteration-1-hiring-judge.json)
- [Ten-source deterministic pass](./iteration-2-ten-source.json)
- [Ten-source archive-ethics review](./iteration-2-ethics-judge.json)
- [Ten-source hiring-editor review](./iteration-2-hiring-judge.json)
- [Direct-action deterministic pass](./iteration-3-direct-action.json)
- [Direct-action archive-ethics review](./iteration-3-ethics-judge.json)
- [Direct-action hiring-editor review](./iteration-3-hiring-judge.json)
- [Source-precision deterministic pass](./iteration-4-source-precision.json)
- [Final holdout 1 judgment](./holdout-1-judge.json)
- [Final holdout 1 scorecard](./holdout-1-final.json)
- [Final holdout 2 judgment](./holdout-2-judge.json)
- [Final holdout 2 scorecard](./holdout-2-final.json)
- [Campaign-press hill-climb record](./2026-07-14-campaign-press-hill-climb.md)
- [Campaign-press holdout 1 judgment](./campaign-press-holdout-1-judge.json)
- [Campaign-press holdout 1 scorecard](./campaign-press-holdout-1-final.json)
- [Campaign-press holdout 2 judgment](./campaign-press-holdout-2-judge.json)
- [Campaign-press holdout 2 scorecard](./campaign-press-holdout-2-final.json)
- [KC Town Hall funding hill-climb record](./2026-07-14-kc-town-hall-funding-hill-climb.md)
- [KC Town Hall deterministic pass](./kc-town-hall-funding-deterministic.json)
- [KC Town Hall holdout 1 judgment](./kc-town-hall-funding-holdout-1-judge.json)
- [KC Town Hall holdout 1 scorecard](./kc-town-hall-funding-holdout-1-final.json)
- [KC Town Hall holdout 2 judgment](./kc-town-hall-funding-holdout-2-judge.json)
- [KC Town Hall holdout 2 scorecard](./kc-town-hall-funding-holdout-2-final.json)

## Verification Contract

```bash
npm run evals:knowledge
npm run test:knowledge-evals
npm run check:knowledge-development
npm run check
npm run preflight:production
```

No `/proofs`, `/knowledge-bank`, or `/public-claims` page was added.
