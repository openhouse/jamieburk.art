# Feature evals A: knowledge-bank maturation hill climb

## Criterion

The knowledge-bank evaluation asks whether a public-safe fragment can enter the
repository without being lost, be decomposed into bounded observations, mature
through research into a defensible claim, and remain available for later
composition without being published automatically.

Acceptance requires:

- a weighted score of at least `4.5 / 5`;
- every criterion at or above its individual floor;
- all canonical validation, citation, safety, type, lint, and build gates;
- two consecutive fresh-judge acceptances;
- no score gained by deleting evidence, collective credit, source limitations,
  unresolved research, or protected boundaries.

## Baseline

The branch already had a public-safe proof bank and an accessible citation
layer, but it had no canonical intake queue, proposition-level observation
records, proof-coverage ledger, or evaluation devoted to maturation. The six
new public URLs and four memory leads therefore had no uniform path into the
system. The baseline is described structurally rather than assigned a
retrospective numerical score.

## Iteration 1: capture, mature, and project selectively

The first pass added:

- 10 dispositioned intake items: six public URLs and four memory leads;
- 21 atomic observations with locators, limitations, and claim or inquiry links;
- six public sources with explicit `supportsGenerally` and
  `doesNotEstablish` boundaries;
- seven bounded claim records, including mature claims held from publication;
- six research inquiries for unresolved routes, outcomes, roles, and metrics;
- a documented photo-to-observation-to-research feedback path;
- two selected NYC Artist Coalition claims on the FairRentNYC page, with
  collective credit and page-local citations;
- deterministic validation, reporting, tests, and eight knowledge-bank evals.

The deterministic framework scored this pass **4.55 / 5**. The lowest eligible
criterion was existing-site evidence coverage at `4 / 5` because the new pilot
material was integrated while older public proof claims still lacked a uniform
coverage disposition.

## Iteration 2: account for the existing public argument

The second pass added a coverage ledger for every existing proof claim. Each
record now states whether it is source-backed, partially source-backed,
resume-backed, protected-support, or research-needed; links to available public
sources or research inquiries; and names one bounded next action.

This raised existing-site coverage from `4` to `5` and the weighted score from
**4.55 to 4.65 / 5**. All `15 / 15` existing proof claims now have an evidence
coverage disposition.

## Measured result

| Criterion | Score | Result |
| --- | ---: | --- |
| Lossless intake | 5 | 10/10 pilot fragments retained with status and boundaries |
| Observation atomicity | 4 | 21 proposition-level observations linked to claims or inquiries |
| Evidence scope | 5 | 6/6 pilot sources state what they do not establish |
| Claim maturation | 4 | Seven claims and six inquiries preserve support and uncertainty |
| Projection discipline | 5 | Held claims have no public surface; only two selected claims project |
| Existing-site coverage | 5 | 15/15 proof claims have coverage dispositions |
| Safety and collective credit | 5 | Protected/private locators do not enter the public bundle |
| Recomposition and feedback | 4 | Held depth and photo-led research remain available for later use |

Weighted score: **4.65 / 5**.

## Public composition decision

The framework does not turn every recovered fact into portfolio copy. This run
selected two 2017 NYC Artist Coalition claims because they strengthen an
existing public case study and have direct public support. The waterways,
participatory-art, Sunday Dinner, and WOW List findings remain mature or
researchable knowledge-bank material held for a future composition decision.
The NPR link is retained as a research lead but is not asked to establish
Jamie's role.

## Iteration 3: make photo feedback operational

The first fresh judge rejected the candidate because the documented photo
feedback workflow had no canonical instance. Its bounded next action was to use
the existing protected Digital District photograph record as a real chain.

The third pass added:

- one protected `photo-lead` intake;
- one visual observation limited to visible placard wording and generic table
  context;
- one linked research inquiry for corroboration, rights, consent, crop, and
  publication review;
- claim anti-claims and a continued held projection;
- deterministic rejection when the chain is broken.

No photograph, participant identity, private path, or additional public claim
was added. The post-change judge accepted the candidate at **4.65 / 5** and
identified one narrower anti-gaming gap: the eval checked linkage but did not
yet require every exact publication-hold state.

## Iteration 4: enforce the hold, not merely the links

The final pass made the photo-feedback eval require:

- `public-metadata-only` source visibility;
- permission-needed rights and review-needed consent;
- display status exactly `hold`;
- `private-support` evidence with `renderCitation: false`;
- a projection exactly `hold` with no surface;
- a present protected locator that is absent from the public registry;
- complete intake, observation, source, claim, and inquiry links;
- exclusion of every chain ID from the generated public registry.

Mutation tests now reject accidental clearance, a deprecated projection, a
deleted locator, a renderable citation, incomplete links, or registry exposure.

## Hard gates

- `npm run check`: passed.
- `npm run preflight:staging`: passed with staging noindex configuration.
- `npm run preflight:production`: passed with the explicit production index
  configuration.
- `npm audit --omit=dev --audit-level=high`: passed with no high or critical
  advisory; two moderate PostCSS advisories remain inside Next.js.
- Production Docker build and health check: passed.
- FairRentNYC responsive, citation, collective-credit, held-content, and console
  QA: passed at 320, 375, 768, 1024, and 1440 px.

## Fresh-judge decision

Two consecutive fresh contexts independently accepted the final candidate:

| Criterion | Judge A | Judge B |
| --- | ---: | ---: |
| Lossless intake | 5 | 5 |
| Observation atomicity | 4 | 4 |
| Evidence scope | 5 | 5 |
| Claim maturation | 4 | 4 |
| Projection discipline | 5 | 5 |
| Existing-site coverage | 5 | 5 |
| Safety and collective credit | 5 | 5 |
| Recomposition and feedback | 4 | 4 |

Both judges returned **4.65 / 5**, every configured floor met, accepted `true`,
and no regressions. Both identify observation locator and limitation consistency
as the next bounded maturation opportunity.

## Decision

**Accept iteration 4 and stop this run.** The framework meets its weighted
target and every floor in two consecutive fresh contexts. The remaining
atomicity improvement belongs to a future evidence-maturation pass; it does not
justify adding weaker prose, removing uncertainty, or delaying this bounded
public improvement.
