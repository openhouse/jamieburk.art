# Recursive Knowledge-Development Run

- Date: 2026-07-13 to 2026-07-15
- Branch: `feature/evals-G`
- Suite: `knowledge-development-lifecycle`, version 1
- Decision: deterministic criteria met; fresh independent judgments pending
- Final candidate fingerprint:
  `370218ee39146fe8111e3ed79d3a187629cc49fa44639e57b0d782b5690ae536`

## Result

The latest institutional-value expansion recovered five public DCLA, Council,
CreateNYC, and coalition records. It establishes the chronology between Tom
Finkelpearl's February description of independently organizing DIY
participants and his May Council testimony explicitly naming NYC Artist
Coalition. The selected claim frames the coalition as a reciprocal civic
intermediary that brought situated cultural-space knowledge, maps,
recommendations, convenings, and testimony into formal planning, oversight,
and legislative processes. It does not infer private motive, personal
dependence, institutional endorsement, or sole causality.

Two fresh deterministic runs on this candidate produced the same fingerprint
and scored `0.89`, with all eleven executable criteria at `4/4`. `KD-006` and
`KD-012` remain pending because fresh independent judgments require explicit
authorization to export the candidate. The package-level maintained-holdout
command also still references a missing judgment file from a preceding
candidate.

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
or expenditure. It also records Jamie's approved first-hand account that he
transitioned the project to a mission-aligned organization, without publishing
private circumstances or presenting the transition as a City-record fact.

Two fresh read-only holdouts reviewed the unchanged KC Town Hall candidate. The
two judges each scored `KD-006` at `4/4` and `KD-012` at `3/4`, for weighted
scores of `0.9925`. Both met every stopping criterion with no blocking or
nonblocking failures.

The runner binds each judgment to the reviewed candidate files with a SHA-256
fingerprint. `npm run check` fails if evaluated content changes without a new
matching judgment.

The latest social-production expansion reconciles both authenticated project
account populations. CallNYC preserves 107 recovered records against a
110-post counter and makes the three-record gap explicit. WOW List preserves
all 38 profile-counted records, including one record recovered only in Replies,
and develops the account's product-support, distribution, curation, and
coordination functions without treating social activity as adoption or impact.
Two fresh WOW List holdouts each scored `KD-006` and `KD-012` at `4/4`; both
unchanged-candidate scorecards reached `1.0000`.

The NYC Artist Coalition expansion exhausted the authenticated Posts, Posts &
replies, and yearly authored-search surfaces and reviewed all 3,123 unique
status URLs they materialized. The public fixture preserves 608 account
originals, 77 account replies, 2,438 external-source statuses surfaced through
native reposts, 1,161 distinct posted short URLs, 623 visible source authors,
15 quote-post corrections, and two account-authored statuses also observed as
self-repost cards. The profile counter reports 5,124 posts; the remaining 2,001
are explicitly blocked on an account-owner archive rather than represented as
reviewed, absent, or deleted.

Independent holdouts exposed and corrected source-status/timeline-appearance
conflation, quoted-card classifier leakage, inherited reply state on quote
posts, an ambiguous engagement-field name, and excessive archive mechanics in
the hiring paragraph. Two final fresh holdouts on the unchanged candidate then
scored `KD-006` and `KD-012` at `4/4`; both scorecards reached `1.0000` with all
thirteen criteria met.

The NTER CHNG pass recovered the project's archived homepage, the official
America: Now and Here Kansas City artist index, and a shared artist-detail
record. It preserves Jamie Burkart, Drew Bolton, and Garrett Fuselier as equal
collaborators; records the 2011 exhibition inclusion without placing the work
at the Nerman Museum; and keeps the contact-bearing artist-detail locator out
of the public repository and citation layer. A first blind `4/4` review led to
a broader contact-data regression test and therefore a new fingerprint. A
fresh blind holdout on that final fingerprint scored both judged criteria
`4/4`; the complete lifecycle scorecard reached `1.0000` with no failures.

Passing this suite means the knowledge-development system and calibration
corpus meet their criteria. It does not approve held claims for the website or
authorize production deployment.

## Corpus Developed

- 52 public-safe captures, all integrated or routed;
- 161 normalized sources, including 41 new article records and 4
  campaign Press indexes in the campaign-press expansion;
- 202 located, limited atomic observations;
- 38 developed claims, plus selected claims in the canonical registry;
- 27 prioritized research tasks;
- 0 canonical validation errors;
- 45 ordered campaign-press placements representing 44 unique articles;
- 4 official KC Town Hall funding sources, 1 metadata-only first-hand source,
  and 3 bounded claims;
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
| KC Town Hall holdout 1            |         `0.9925` | Pass                                         |
| KC Town Hall holdout 2            |         `0.9925` | Pass; stop threshold met                     |
| CallNYC final holdout 1           |         `1.0000` | Pass                                         |
| CallNYC final holdout 2           |         `1.0000` | Pass; stop threshold met                     |
| WOW List first holdout            |     `4/4`, `3/4` | Repair dangling methodology sentence         |
| WOW List final holdout 1          |         `1.0000` | Pass                                         |
| WOW List final holdout 2          |         `1.0000` | Pass; stop threshold met                     |
| NYCAC first population holdout    |     `4/4`, `3/4` | Revise taxonomy and replayability            |
| NYCAC classifier holdout          |     `4/4`, `3/4` | Remove quoted-card leakage                    |
| NYCAC editorial holdout           |     `3/4`, `3/4` | Clarify metric; compress public projection   |
| NYCAC final holdout H             |         `1.0000` | Pass                                         |
| NYCAC final holdout I             |         `1.0000` | Pass; stop threshold met                     |
| NTER CHNG deterministic pass      |         `0.8900` | Continue: independent judgments required     |
| NTER CHNG holdout J               |     `4/4`, `4/4` | Harden contact-data regression test          |
| NTER CHNG final holdout K         |         `1.0000` | Pass; maintained release gate                |

## Accepted Improvements

1. Added capture, observation, research-task, and three-axis claim-state
   schemas.
2. Added graph validation from capture through source, observation, claim,
   research task, and projection.
3. Added an executable 21-criterion eval suite and deterministic runner.
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
22. Added Jamie's approved first-hand KC Town Hall transition as a distinct,
    metadata-only evidence class; omitted private circumstances; and required
    attribution and separation from the City record on every public surface.
23. Reconciled all 38 profile-counted WOW List records across Posts and Replies,
    preserved row-level recovery provenance, and added exact population,
    authorship, URL, classification, and anti-inflation tests.
24. Classified a bounded 16-record incoming search, promoted ten
    mission-relevant third-party records across four stakeholder groups, kept
    all six exclusions visible, and linked nine independent URL posts to their
    query provenance.
25. Normalized representative organizer-use, peer-attribution,
    community-response, and circulated-context sources while keeping Jamie,
    collaborators, institutional publishing, and downstream outcomes distinct.
26. Reconciled all 3,123 records retrievable from exhausted authenticated
    `@NYCArtC` public surfaces against the 5,124-post counter and routed the
    2,001-record gap to a critical owner-archive task.
27. Separated source-status identity from timeline appearance, corrected 15
    quote posts that had inherited a quoted card's reply state, and preserved
    two account-authored source URLs also observed as self-repost cards.
28. Checked in a deterministic mission classifier, per-record input digests,
    positive-match evidence, and regression tests excluding profile chrome,
    display names, and quoted-card content.
29. Preserved 1,161 distinct posted short URLs, 623 visible source authors, six
    overlapping mission-signal inventories, and bounded incoming-stakeholder
    findings without converting curation or interaction into endorsement,
    reach, causality, or impact.
30. Kept the hiring-facing social-infrastructure projection concise while
    retaining the complete taxonomy, platform limits, and owner-archive
    dependency in the cited knowledge record.
31. Recovered NTER CHNG's collaborative installation and America: Now and Here
    exhibition lineage; preserved equal credit, Nerman and Kruger anti-claims,
    explicit research gaps, and a metadata-only boundary around the archived
    artist page's historical contact data.
32. Converted eight known portfolio blind spots into explicit evals, added a
    canonical public-safe readiness ledger, separated the maintained local gate
    from the full human-and-independent release gate, and recorded two stable
    local passes without fabricating reader, rights, or judge approvals.

## Evidence

- [NYC Artist Coalition institutional-value hill-climb record](./2026-07-15-nycac-institutional-value-hill-climb.md)
- [Blind-spot eval hill-climb record](./2026-07-15-blind-spot-evals-hill-climb.md)
- [Blind-spot local pass 1](./blind-spots-local-pass-1.json)
- [Blind-spot local pass 2](./blind-spots-local-pass-2.json)
- [NYC Artist Coalition institutional-value deterministic run 1](./nycac-institutional-value-deterministic-1.json)
- [NYC Artist Coalition institutional-value deterministic run 2](./nycac-institutional-value-deterministic-2.json)

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

## Full-population Social Production

- [CallNYC hill-climb record](./2026-07-14-callnyc-full-population-hill-climb.md)
- [CallNYC final holdout 1](./callnyc-full-population-final-holdout-5-run.json)
- [CallNYC final holdout 2](./callnyc-full-population-final-holdout-6-run.json)
- [WOW List hill-climb record](./2026-07-14-wowlist-full-population-hill-climb.md)
- [WOW List final holdout 1 judgment](./wowlist-full-population-final-holdout-1-judge.json)
- [WOW List final holdout 1 scorecard](./wowlist-full-population-final-holdout-1-run.json)
- [WOW List final holdout 2 judgment](./wowlist-full-population-final-holdout-2-judge.json)
- [WOW List final holdout 2 scorecard](./wowlist-full-population-final-holdout-2-run.json)
- [NYC Artist Coalition hill-climb record](./2026-07-15-nycartc-retrievable-population-hill-climb.md)
- [NYC Artist Coalition final holdout H judgment](./nycartc-final-holdout-H-judge.json)
- [NYC Artist Coalition final holdout H scorecard](./nycartc-final-holdout-H-run.json)
- [NYC Artist Coalition final holdout I judgment](./nycartc-final-holdout-I-judge.json)
- [NYC Artist Coalition final holdout I scorecard](./nycartc-final-holdout-I-run.json)

## NTER CHNG Wayback Production

- [Hill-climb record](./2026-07-15-nterchng-wayback-hill-climb.md)
- [Deterministic pass after privacy hardening](./nterchng-remediation-deterministic.json)
- [Superseded holdout J judgment](./nterchng-holdout-J-superseded-judge.json)
- [Final holdout K judgment](./nterchng-final-holdout-K-judge.json)
- [Final holdout K scorecard](./nterchng-final-holdout-K-run.json)

## Teams Archive Production

- [Hill-climb record](./2026-07-14-teams-archive-hill-climb.md)
- [Authenticated iCloud reconciliation](./2026-07-15-icloud-teams-hill-climb.md)
- [iCloud reconciliation deterministic run 1](./teams-icloud-deterministic-1.json)
- [iCloud reconciliation deterministic run 2](./teams-icloud-deterministic-2.json)
- [Deterministic pass before vocabulary remediation](./teams-archive-deterministic.json)
- [Deterministic pass after remediation](./teams-archive-deterministic-2.json)
- [Holdout 1 judgment](./teams-archive-holdout-1-judge.json)
- [Holdout 1 final](./teams-archive-holdout-1-final.json)
- [Holdout 2 judgment](./teams-archive-holdout-2-judge.json)
- [Holdout 2 final](./teams-archive-holdout-2-final.json)

## Google Shared Drives Production

- [Hill-climb record](./2026-07-14-google-shared-drives-hill-climb.md)
- [Pre-remediation deterministic pass](./google-shared-drives-iteration-2.json)
- [Strict pre-remediation judgment](./google-shared-drives-iteration-2-judge.json)
- [Intermediate judgment](./google-shared-drives-iteration-3-judge.json)
- [Final deterministic pass](./google-shared-drives-deterministic.json)
- [Final holdout 1 judgment](./google-shared-drives-final-holdout-1-judge.json)
- [Final holdout 1 scorecard](./google-shared-drives-final-holdout-1-final.json)
- [Final holdout 2 judgment](./google-shared-drives-final-holdout-2-judge.json)
- [Final holdout 2 scorecard](./google-shared-drives-final-holdout-2-final.json)

## Verification Contract

```bash
npm run evals:knowledge
npm run test:knowledge-evals
npm run check:knowledge-development
npm run check
npm run preflight:production
```

No `/proofs`, `/knowledge-bank`, or `/public-claims` page was added.
