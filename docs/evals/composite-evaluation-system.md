# Composite Evaluation System

## Purpose

The composite coordinates knowledge development, portfolio readiness,
blind-spot governance, and modular domain checks while keeping their evidence
types distinct. It makes recursive improvement possible without confusing
measurement, publication, or approval.

**Protocol is not evidence.** A well-formed hiring-reader procedure does not
prove a hiring reader understood the site. A release runbook does not prove a
deployment occurred. An AI archival review is not collaborator testimony.

## Canonical Flow

```text
public-safe intake
  -> source review and atomic assertions
  -> bounded claims, anti-claims, and research questions
  -> maturity and projection eligibility
  -> audience-specific editorial selection
  -> website, resume, or application composition
  -> reader, collaborator, visual, market, and runtime observations
  -> corrections, new intake, and the next bounded iteration
```

The private archive is outside this flow's public repository. Protected material
may produce an opaque locator and public-safe summary; it must not enter Git as
raw evidence.

## Grader Separation

| Observer | May establish | May not establish |
| --- | --- | --- |
| Deterministic | Files, schema, graph relations, hashes, commands, counts | Meaning, consent, reader response, deployment |
| Browser | Rendered layout, keyboard behavior, links, console, visible artifacts | Source truth, rights, hiring response |
| LLM judge | Clarity, voice, reading burden, bounded semantic interpretation | Human observation, permission, market response |
| Human approval | Reader response, collaborator context, permission, Jamie's decision | Runtime state not observed by that person |
| Runtime | Exact deployment, DNS, TLS, indexing, health, rollback | Editorial approval or social truth |
| Hybrid | Explicitly named combinations of the above | A blended score that hides missing component evidence |

An optimizing agent may not grade its own patch. Scorecards bind candidate,
rubric, and evidence fingerprints. Changing any governed input invalidates the
old scorecard.

## Profiles

### Fast

Validates contracts, canonical paths, command wiring, public-safety boundaries,
and adversarial tests. It contains no external-evidence requirement and belongs
in `npm run check`.

### Application

Adds hiring clarity, proof, resume, contact, responsive behavior, Chad's lens,
Margaret Morse's lens, Warren Sack's lens, and independent reader evidence.
The agent-verifiable candidate may be ready while final status remains
`human_blocked` pending Jamie and real reader approval.

### Production

Adds exact deployment, DNS, TLS, robots, sitemap, canonical host, health,
rollback, and indexing evidence. A local production build is preparation, not a
production observation.

## Composition Control

Every primary route has an audience, reader decision, primary action, governing
argument, and claim budget. The budget is a review signal, not permission to
delete useful claims mechanically. Reduce reader burden through selection,
sequencing, artifacts, and progressive disclosure while preserving the deeper
bank.

## Blind-Spot States

- `criteria_met`: required evidence exists and passes.
- `governed_open`: the gap, boundary, owner, next action, and stop rule are
  explicit.
- `human_blocked`: a person, permission, or market observation is required.
- `not_observed`: a required browser or runtime surface was unavailable.
- `failed`: evidence contradicts the criterion or a hard gate failed.

Open and blocked states are honest outcomes. They cannot be averaged into a
pass.

## Recursive Protocol

1. Freeze the rubric and candidate fingerprints.
2. Run deterministic and domain gates.
3. Collect exact-candidate browser evidence when public surfaces changed.
4. Obtain fresh semantic judgments from contexts blind to patch intent.
5. Rank failures lexicographically: safety, hard gates, blockers, semantic gap,
   then low-risk finish.
6. State one causal hypothesis and protected invariants.
7. Make the smallest coherent change at the controlling layer.
8. Rerun focused and adjacent regressions, then the complete suite.
9. Compare neutral baseline and candidate bundles.
10. Keep only improvements that do not weaken a higher-order objective.
11. Record accepted and rejected iterations.
12. Require two unchanged passing runs where the suite requires stability.

Stop after eight iterations, three no-improvement iterations, or an external
boundary. Never polish indefinitely because more archive material exists.

## Application Cadence

When the candidate is usable, cap noncritical archival or aesthetic work at one
90-minute block per opportunity. Return unresolved evidence work to the
knowledge queue and return Jamie's time to the application, referral,
conversation, or outreach.

## Release Triage

### P0: Blocks Application Sharing

- private or unsupported public content;
- broken resume, contact, route, or primary proof path;
- failed claim, public-safety, accessibility, or application gate;
- role language that hides supported agency or invents authority;
- stale exact-candidate review represented as current.

### P1: Blocks Production

- reviewed SHA differs from deployed SHA;
- DNS, TLS, canonical, robots, sitemap, health, or rollback failure;
- missing hands-on launch QA;
- missing Jamie approval of the exact candidate and indexing state.

### P2: Does Not Block Immediate Application Use

- additional archive depth;
- optional visual refinement with no legibility or rights effect;
- broader noncontroversial citation density;
- held claims that do not serve the current application argument.

## Operator Commands

```bash
npm run evals:fast
npm run evals:knowledge
npm run evals:portfolio:application
npm run evals:portfolio:production
npm run evals:blind-spots
npm run evals:browser
npm run evals:release
npm run knowledge:intake -- --title "..." --summary "..." --project callnyc --kind public-url --url https://example.org
npm run knowledge:query -- --project callnyc --publication-safe
npm run knowledge:report
```

Intake defaults to preview mode. `--write` appends only to the ignored
`reports/generated/knowledge-intake.jsonl` queue. Canonical integration still
requires source decomposition, review, and a committed batch.

## Public-Safety Boundary

The composite repository may contain public sources, public-safe summaries,
opaque protected locator IDs, claim boundaries, anti-claims, and minimized
aggregate receipts. It must not contain raw private material, authenticated
state, private contact data, or uncleared media. Jamie's phone remains confined
to the approved noindex resume PDF.
