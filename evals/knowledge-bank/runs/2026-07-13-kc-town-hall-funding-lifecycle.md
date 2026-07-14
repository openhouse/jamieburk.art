# KC Town Hall funding lifecycle

Date: 2026-07-13

Branch: `feature/evals-A`

Starting head: `18163e2b7b311ced832d38e3b0f8140810a7c7b9`

## Objective

Locate and preserve the official record that the Kansas City Council acted on
the Central City Economic Development Sales Tax Board recommendation for KC
Town Hall, while preventing recommendation, authorization, appropriation,
agreement execution, disbursement, and project completion from collapsing into
one overstated funding claim.

## Source chain

The canonical bank now retains five official public records:

1. the Resolution 190649 fact sheet recording the Board's July 16, 2019 vote
   to recommend $490,539;
2. Resolution 190649, adopted as substituted on September 26, 2019, accepting
   the recommendation and authorizing negotiation of a funding agreement;
3. Committee Substitute for Ordinance 190642, passed the same day,
   appropriating $490,539 to a City project account for KC Town Hall;
4. the May 10, 2022 CCED project update recording a $490,539 budget, $0
   disbursed, and contract execution pending an escrow agent; and
5. Ordinance 240317, passed March 28, 2024, recording the project's withdrawal
   and returning the unused $490,539 to the fund.

## Knowledge result

One memory lead matured into:

- 5 bounded official sources;
- 8 atomic observations: Board recommendation, Council acceptance, negotiation
  authorization, appropriation, zero disbursement, pending contract execution,
  withdrawal, and reappropriation;
- 2 `confirmed-with-boundary` claims;
- 1 recovered research inquiry;
- 1 active correction retiring recommendation-only wording; and
- 1 page-local citation plan.

The public case study projects four nonredundant source notes from the five
canonical records. The fact sheet remains in the knowledge bank, while the
Council resolution carries its proposition in the public source layer.

## Boundaries

The accepted public language may say that the Council accepted the Board's
recommendation and appropriated $490,539. It must also preserve that:

- appropriation was not payment to KC Town Hall;
- a later City update reported $0 disbursed and agreement execution pending;
- the project later withdrew and the Council returned the unused funds;
- the official records do not establish that Jamie alone caused the Council
  action; and
- the official records do not establish why the project withdrew.

## Recursive hill climb

The first implementation preserved the funding sequence but kept some compound
observations and loaded every source boundary into the default reading path.
The recursive passes:

1. split the lifecycle into eight proposition-level observations;
2. retained five canonical sources while projecting four nonredundant notes;
3. moved source notes after the role, action, and contact path;
4. placed source-specific scope and limits in collapsed native `details`
   disclosures;
5. changed the shared introduction from an overbroad `Official records` label
   to the source-class-neutral `Sources supporting the claims above`; and
6. folded a redundant Context section into What was unclear after a fresh judge
   scored reader burden below the configured floor.

Two mutation tests now reject the two most consequential failures: omitting the
2024 disposition and rewriting appropriation as money received.

## Independent judgment

Two consecutive final judges evaluated the post-hill-climb candidate:

| Suite | Judge 1 | Judge 2 | Target | Scored floors |
| --- | ---: | ---: | ---: | --- |
| Knowledge-bank maturation | 5.00 | 5.00 | 4.50 | all met |
| Launch-readiness judgment | 4.50 | 4.50 | 4.20 | all met |

Both judges found no scored knowledge, truth, consent, citation, or launch
regression. Reader burden recovered from 3/5 to 4/5 after the editorial
consolidation. Full launch acceptance remains intentionally open until Jamie
approves the exact staging-reviewed SHA and post-production smoke testing
passes. A future Jamie-approved public-safe documentation excerpt may improve
KC Town Hall's visual-proof score; it is not required to preserve this fact.

## Verification

- Node `v26.5.0` citation tests: 10/10 passed.
- Knowledge mutation and maturation tests: 15/15 passed.
- Launch-eval tests: 6/6 passed.
- `npm run check`: passed.
- `npm run preflight:staging`: passed with explicit noindex behavior.
- `npm run preflight:production`: passed with explicit index opt-in.
- `npm audit --omit=dev --audit-level=high`: passed with no high or critical
  advisory; two documented moderate PostCSS advisories remain nested under
  Next.js.
- Responsive and keyboard QA: passed at 320, 375, 768, 1024, and 1440 pixels
  with one H1, no horizontal overflow, no console errors, four noterefs, four
  ordered source notes, four backlinks, collapsed scope disclosures, and
  working hash navigation.

Generated reports:

- `reports/generated/knowledge-bank-maturation.md`
- `reports/generated/citations.md`
- `reports/generated/launch-readiness.md`

## Decision

Accept the iteration. The knowledge bank now preserves the complete official
funding lifecycle, while the public page makes the strongest accurate claim in
a form useful to a hiring reader: the project won Council approval and a
$490,539 appropriation, but the funds were not disbursed.
