# Launch Readiness Evals

These evals turn the publication intentions into a recursive protocol an LLM
agent can execute without converting judgment into false certainty.

## Objective

Prepare `jamieburk.art` to support job applications and trusted professional
sharing by making Jamie's value legible, claims defensible, paths usable, and
production operations reversible.

The canonical positioning sentence is:

> I turn emerging work into usable systems for complex public-facing teams.

## Recursive protocol

1. Start from a clean branch based on the requested upstream commit.
2. Run `npm run evals:launch` and retain the baseline score and failures.
3. Inspect each failed criterion against its named evidence and source files.
4. Make the smallest coherent repair that improves the criterion without
   weakening another gate.
5. Run the focused test, then rerun the full evaluator.
6. Stop when automated score is at least 94, all hard gates pass, no
   anti-gaming rule is violated, and remaining manual gates are explicit.
7. Run staging and production preflights. Production deployment still requires
   Jamie's approval of the exact reviewed SHA.

## Automated criteria

| Criterion | Weight | Hard gate | Passing condition |
| --- | ---: | :---: | --- |
| Message alignment | 14 | No | Primary public surfaces use the emerging-work positioning consistently. |
| CallNYC external validation | 14 | Yes | The five-member verified minimum is canonical, cited, projected, and bounded against official-endorsement claims. |
| Responsive contracts | 14 | Yes | Known narrow-screen failures are repaired at their source without global overflow hiding. |
| Resume application artifact | 14 | Yes | The approved PDF exists, is readable, remains two pages, and contains exactly one phone number. |
| Application paths | 10 | Yes | Resume, contact, LinkedIn, and GitHub destinations remain explicit and approved. |
| Production cutover | 10 | Yes | The runbook names candidate, verification, and rollback commands. |
| Release gate wiring | 12 | Yes | Citation, knowledge-bank, public-safety, route, eval-test, and prelaunch commands exist. |
| Chad-lens legibility | 16 | Yes | Jamie is the actor; entry condition, purpose, usable outputs, bounded proof, and next actions are explicit. |
| Knowledge-bank lifecycle | 18 | Yes | Intake has no silent loss; evidence maturity, safety, and editorial selection remain separate; every public proof has source-coverage status. |
| Portfolio evidence expansion | 18 | Yes | Ten new, non-orphan public sources mature bounded claims, reduce proof debt, and selectively strengthen cited portfolio surfaces. |
| KC Town Hall Council allocation | 18 | Yes | Board recommendation, Council appropriation, and resolution are primary-sourced while allocation remains distinct from agreement execution, receipt, and disbursement. |
| Campaign press corpus | 18 | Yes | All four campaign press indexes retain complete membership, deduplicate to canonical articles, and keep unreviewed sources out of claim support. |

The executable implementation is `scripts/lib/launch-readiness-evals.mjs`.
Generated reports are written to `reports/generated/` and are ignored by Git.

## Manual criteria

- **Hiring-manager 30-second test:** the reviewer can state Jamie's role,
  differentiated value, three supporting proofs, and the next action.
- **Resume visual balance:** rendered pages have no clipping or overlap and no
  role begins with an orphaned continuation bullet. Replacing the approved PDF
  requires Jamie's approval.
- **Repository hygiene:** open PRs targeting `develop` are active and owned, or
  closed/labeled as superseded.
- **Postdeploy verification:** production health, indexing, sitemap,
  canonical-host behavior, key routes, and resume delivery pass after the
  explicitly approved deploy.

## Anti-gaming rules

- Do not delete claims, evidence, routes, or useful content merely to reduce
  failures.
- Do not conceal overflow globally instead of repairing the responsible
  element.
- Do not strengthen public wording before updating canonical evidence,
  boundaries, and prohibited formulations.
- Do not publish private evidence to satisfy a citation check.
- Do not treat an automated score as approval to deploy production.
- Do not reduce reader burden by erasing Jamie as actor, omitting the purpose,
  or replacing concrete outputs with generic systems language.
- Do not satisfy no-silent-loss by auto-publishing intake, treating memories as
  corroboration, or moving every mature reserve claim onto the current site.
- Do not satisfy evidence expansion with duplicate, orphaned,
  self-authored-only, or boundary-free source records.
- Do not equate a Council appropriation or funding-negotiation authorization
  with an executed agreement, receipt, disbursement, project completion, or
  current status.
- Do not satisfy press-corpus completeness by dropping cross-campaign
  duplicates, treating index membership as claim support, or marking
  unreviewed articles as close-read.
