# feature/evals-* Composite Integration Instructions

Date: 2026-07-16

Repository: `openhouse/jamieburk.art`

Working branch: `feature/knowledge-i`

Pull request base: `develop`

## Assignment

Build one coherent evaluation and knowledge-development system from the strongest
mechanisms in the frozen `feature/evals-*` pull-request family. Begin from the
current state of `feature/knowledge-i`, create and consolidate the evals, build
the implementation, recursively hill climb against the frozen criteria, and
open a pull request from `feature/knowledge-i` into `develop`.

The coding team should need no context beyond this file, the repository, and the
linked GitHub pull requests.

This is a selective integration, not a merge contest. Do not merge the fourteen
feature branches wholesale. They contain parallel schemas, duplicated corpora,
competing runners, generated evidence, and different historical snapshots.
Integrate their strongest behaviors into the canonical structures already on
`feature/knowledge-i`.

## Starting State

`feature/knowledge-i` was created from the exact head of `feature/evals-I`:

```text
793f7262cd3df8d7401d9b3e0f8209240d5fa640
```

That commit is the content baseline for this integration. A documentation-only
commit containing this file may sit above it. Do not reset the branch to the
baseline SHA. Fetch the current branch, record its actual starting SHA, and
retain that SHA in every evaluation run.

At the time this brief was prepared, `develop` pointed to:

```text
2ec37fe6e47d11e600ede204d19a98f7d3cff139
```

Treat the fetched remote branches as authoritative. Existing local eval
worktrees may be stale or contain unpublished work.

## Non-Negotiable Boundaries

1. The `feature/evals-*` family is frozen for study. Do not commit, force-push,
   rebase, close, supersede, or otherwise modify those branches or pull
   requests.
2. Work only on `feature/knowledge-i`.
3. The final pull request must use `develop` as its base and
   `feature/knowledge-i` as its head.
4. The repository is public. Do not commit raw transcripts, private paths,
   private correspondence, credentials, authenticated exports, participant or
   applicant data, private analytics, contact lists, unapproved photographs,
   unapproved quotations, or protected source locators.
5. A recollection is an intake lead, not independent documentary confirmation.
6. A protocol is not proof that a human review, collaborator review, rights
   decision, deployment, or market response occurred.
7. Collective work must preserve collaborators and formal institutional actors
   while naming Jamie's supported actions plainly.
8. Do not optimize by deleting useful evidence, weakening qualifiers, hiding
   open questions, suppressing Jamie's supported agency, or publishing more of
   the knowledge bank than the audience needs.
9. The website is a selective projection of the knowledge bank. There must be
   no public `/proofs`, `/knowledge-bank`, or internal-review route.
10. Jamie's phone number may remain in the approved resume PDF. Do not expose it
    in website HTML, structured data, generated public registries, or source
    files that render publicly.
11. Do not represent Source-Backed Team Memory as finished production SaaS or
    automated trust.
12. Do not deploy production or enable indexing. The pull request prepares a
    candidate; Jamie retains exact-commit release authority.

## Frozen PR Family

Use the following branches as read-only design references. Before implementation,
fetch them into remote-tracking refs and confirm their current GitHub heads.

| Branch | PR | Head when briefed | Distinctive contribution to integrate |
| --- | --- | --- | --- |
| `feature/evals-A` | [#220](https://github.com/openhouse/jamieburk.art/pull/220) | `3757c4f5` | Simple separation of launch readiness, portfolio effectiveness, and knowledge maturation; concise judge contracts. |
| `feature/evals-B` | [#212](https://github.com/openhouse/jamieburk.art/pull/212) | `67fc3042` | Composition manifest, exact role-evidence classification, mosaic privacy review, and controls for risks created by the portfolio system itself. |
| `feature/evals-C` | [#221](https://github.com/openhouse/jamieburk.art/pull/221) | `ff440a9c` | Clean application-versus-production profiles, diagnostic-versus-closure states, and candidate/rubric fingerprinting. |
| `feature/evals-D` | [#216](https://github.com/openhouse/jamieburk.art/pull/216) | `5a7095ff` | Empirical responsive and accessibility QA, genuine visual-proof review, semantic iteration, and explicit observer integrity. |
| `feature/evals-E` | [#211](https://github.com/openhouse/jamieburk.art/pull/211) | `d7d8e0d0` | Layered source, browser, judge, and human orchestration; lexicographic optimization; blind-reader protocol and stopping rules. |
| `feature/evals-F` | [#210](https://github.com/openhouse/jamieburk.art/pull/210) | `ba746185` | Broad integrated launch contract, application timeboxing, target-role specificity, and anti-perfectionism that returns effort to outward action. |
| `feature/evals-G` | [#222](https://github.com/openhouse/jamieburk.art/pull/222) | `d97055d7` | Detailed research and holdout run records, hybrid local/independent grading, and source-specific hill-climb traceability. |
| `feature/evals-H` | [#223](https://github.com/openhouse/jamieburk.art/pull/223) | `934c1bdf` | Release rehearsal, real artifacts, editorial compression, multi-perspective holdouts, runtime smoke tests, mutation attacks, and immutable review locks. |
| `feature/evals-I` | [#219](https://github.com/openhouse/jamieburk.art/pull/219) | `793f7262` | Canonical starting substrate: batches, corpora, source captures, claim lifecycle, policy fingerprints, maintenance reports, and strict development gates. |
| `feature/evals-J` | [#209](https://github.com/openhouse/jamieburk.art/pull/209) | `7e1b758b` | Claim-development versus projection-candidate distinction, correction readiness, fresh read-only judges, and an explicit application argument. |
| `feature/evals-K` | [#217](https://github.com/openhouse/jamieburk.art/pull/217) | `5b0cbcd1` | Operator tools for append-safe intake, lifecycle query and reporting, exact-surface authorization, artifact checks, and strict fast/release modes. |
| `feature/evals-L` | [#213](https://github.com/openhouse/jamieburk.art/pull/213) | `68846b1f` | Modular independently runnable gates, `governed-open` status, corpus-specific checks, and a concrete five-minute hiring-reader protocol. |
| `feature/evals-M` | [#215](https://github.com/openhouse/jamieburk.art/pull/215) | `289dd449` | Practical P0/P1/P2 triage, concise release loop, CI integration, and concrete readiness registers. |
| `feature/evals-N` | [#214](https://github.com/openhouse/jamieburk.art/pull/214) | `10d20ecd` | Human-centered synthesis across current capability, outcome transfer, collaborator evidence, visual proof, artistic continuity, and recursive method. |

## Stage 1: Establish a Clean Working Copy

Use Node 26. Do not work in any frozen eval worktree.

```bash
git fetch origin --prune
git fetch origin \
  '+refs/heads/feature/evals-*:refs/remotes/origin/feature/evals-*' \
  '+refs/heads/feature/knowledge-i:refs/remotes/origin/feature/knowledge-i' \
  '+refs/heads/develop:refs/remotes/origin/develop'
```

If `feature/knowledge-i` is not checked out locally:

```bash
git worktree add --track -b feature/knowledge-i \
  /private/tmp/jamieburk-art-knowledge-i \
  origin/feature/knowledge-i
```

If the local branch already exists and is not checked out elsewhere:

```bash
git worktree add /private/tmp/jamieburk-art-knowledge-i feature/knowledge-i
```

Then:

```bash
cd /private/tmp/jamieburk-art-knowledge-i
git status --short --branch
git rev-parse HEAD
nvm use 26
npm ci
```

Record these values in the first integration run note:

- starting `feature/knowledge-i` SHA;
- current `origin/develop` SHA;
- all fourteen eval branch SHAs;
- Node and npm versions;
- date and environment;
- whether the baseline check passed before integration.

Run the unmodified baseline:

```bash
npm run check
npm run preflight:staging
npm run preflight:production
git diff --check
```

If a build fails only because `next/font` cannot reach Google Fonts, retry in a
network-enabled clean environment before changing application code. Do not
replace the site's typography merely to mask an environment failure.

## Stage 2: Produce the Composite Decision Ledger

Before importing code, create:

```text
docs/evals/composite-integration-decision-log.md
```

For every branch A through N, record:

- the exact branch SHA reviewed;
- the problem its mechanism solves;
- the relevant paths and tests;
- `adopt`, `adapt`, `defer`, or `reject`;
- the canonical destination in `feature/knowledge-i`;
- duplicate or conflicting structures it replaces;
- the public-safety and migration risks;
- the validation that will prove the integration works.

Do not satisfy this stage by copying PR summaries. Inspect the actual rubric,
runner, tests, schemas, browser evidence, and knowledge structures. Use commands
such as:

```bash
git diff --stat origin/develop...origin/feature/evals-K
git diff --name-status origin/develop...origin/feature/evals-K
git log --oneline origin/develop..origin/feature/evals-K
git show origin/feature/evals-K:evals/knowledge-lifecycle/README.md
```

The ledger must account for all fourteen branches even when a mechanism is
deferred. Nothing enters the composite merely because it is large, recent, or
already passing on its source branch.

## Stage 3: Define the Canonical Evaluation Architecture

Preserve `feature/knowledge-i` as the canonical data and policy substrate. Avoid
introducing a second claim graph, second public citation registry, second proof
schema, or parallel source-ID namespace.

The composite should have four coordinated layers.

### 3.1 Knowledge Development

Canonical starting contract:

```text
.agents/evals/knowledge-bank-development.json
scripts/check-knowledge-development.mjs
scripts/tests/knowledge-development.test.mjs
```

It must evaluate:

1. lossless public-safe intake and explicit disposition;
2. provenance and protected-source handling;
3. atomic source decomposition into support, limitation, contradiction,
   context, and open question;
4. claim maturity and evidence fit;
5. graph identity and referential integrity;
6. research queue discipline;
7. Jamie's specific role, collective credit, and anti-claims;
8. projection eligibility independent from claim maturity;
9. underclaiming and explicit editorial selection;
10. photo or artifact observations returning to research without automatic
    publication;
11. correction triggers, supersession, and review-age visibility;
12. append-safe intake, query, and maintenance reporting for future agents.

Keep the current strict development threshold unless a versioned contract
change is explicitly approved:

- weighted score at least `0.95`;
- every blocking criterion scores `4`;
- every nonblocking criterion scores at least `3`;
- all deterministic gates pass;
- two unchanged-candidate passing runs;
- the optimizing agent does not grade its own patch.

### 3.2 Portfolio Readiness

Canonical starting contract:

```text
.agents/evals/portfolio-production-readiness.json
docs/evals/portfolio-production-readiness.md
scripts/check-portfolio-evals.mjs
scripts/tests/portfolio-evals.test.mjs
```

Keep separate evaluation modes:

- `application_share`: hiring clarity, claim safety, proof, resume, contact,
  accessibility, and application action paths;
- `production_launch`: all application gates plus exact deployment, runtime,
  indexing, rollback, and Jamie's approval.

Required interpretive lenses:

- **Chad lens:** Jamie's role, action, practical end, usable result, and
  contribution boundary are legible in one pass. Penalize understatement and
  overstatement symmetrically.
- **Margaret Morse lens:** preserve one compact, evidenced threshold where
  artistic, civic, technical, social, embodied, participatory, spatial, and
  hospitable practices remain connected without exposing protected academic
  records or displacing hiring clarity.
- **Warren Sack lens:** make the recurring sequence inspectable: observe
  relationships, model or prototype, build an interface or inhabitable system,
  expose it to use, learn, document, and hand off. Preserve prototype,
  production, originality, and collective-credit boundaries.

Preserve the existing thresholds:

- application-share weighted score at least `0.80`, blocking minimum `3`,
  nonblocking minimum `2`, plus Jamie's exact-candidate approval;
- production-launch weighted score at least `0.90`, every blocking gate passed,
  blocking minimum `3`, nonblocking minimum `2`, blind-reader median `4`,
  holdout regression passed, two unchanged passing runs, and Jamie's exact
  production approval.

A weighted score may never average away a failed blocking gate.

### 3.3 Blind-Spot Governance

Canonical starting contract:

```text
.agents/evals/portfolio-blind-spots.json
scripts/check-portfolio-blind-spots.mjs
scripts/tests/portfolio-blind-spots.test.mjs
```

Integrate the strongest controls from B, C, E, K, L, and N. At minimum cover:

- collaborator corroboration and permission;
- real target-reader comprehension and referral behavior;
- bounded job-application response learning;
- current 2024-2026 technical and operational evidence;
- action-to-output-to-use-to-outcome-to-transfer chains;
- rights-aware visual proof;
- source maturation and unsupported public claims;
- archive denominator and survivorship bias;
- mosaic privacy and contextual integrity;
- public argument selection and claim budget;
- reviewability of the integration diff;
- maintenance burden, stale review, and correction readiness;
- hands-on launch QA and exact-deployment evidence.

Use distinct statuses:

- `criteria_met`: the named evidence exists and passes;
- `governed_open`: the gap, boundary, owner, next action, and stopping rule are
  explicit, but the external evidence does not yet exist;
- `human_blocked`: a real person, permission, deployment, or market observation
  is required;
- `not_observed`: the required surface could not be inspected;
- `failed`: available evidence contradicts the criterion or a hard gate failed.

Never convert `governed_open`, `human_blocked`, or `not_observed` into a pass.

### 3.4 Modular Corpus And Domain Evals

Keep the current corpus-specific derivations and guards independently runnable.
Do not bury them inside one weighted portfolio score. This includes CallNYC,
WOW List, KC Town Hall, NYC Artist Coalition, Urbanhermit, Facebook events and
posts, KC Spaces Fund, citation integrity, public safety, routes, and the
governed project-lineage evaluators already wired into `npm run check`.

Each corpus eval must recompute its published aggregate from item-level or
control-level records, preserve its actual population denominator, distinguish
authored posts from replies or reposts, and reject endorsement, adoption,
causality, authorship, and impact inflation.

## Stage 4: Standardize Eval Contracts And Graders

Every canonical criterion should expose these fields, directly or through its
suite schema:

```text
id
title
category
grader
applies_to
blocking
weight
inputs
procedure
pass_criteria
anti_gaming
evidence_required
remediation_hint
stopping_boundary
```

Supported observer types:

1. `deterministic`: schema, graph, files, commands, DOM facts, HTTP behavior,
   hashes, routes, and reproducible counts;
2. `browser`: rendered responsive, accessibility, keyboard, console, link, and
   artifact observations;
3. `llm_judge`: clarity, voice, reading burden, professional interpretation,
   evidence quality, and bounded semantic judgment;
4. `human_approval`: collaborator, hiring reader, rights holder, Jamie, or
   other named human authority;
5. `runtime`: exact deployed environment, DNS, TLS, indexing, smoke, health,
   and rollback behavior;
6. `hybrid`: an explicit combination whose component evidence remains visible.

Enforce grader separation:

- the optimizing agent may not supply its own independent score;
- holdout judges receive the frozen rubric, exact candidate, and public-safe
  evidence bundle, but not patch intent, prior scores, or implementation chat;
- human and runtime observations cannot be synthesized by an LLM;
- every scorecard binds the candidate SHA, rubric fingerprint, evidence-bundle
  fingerprint, judge identity or role code, and timestamp;
- changing the candidate, rubric, or governed evidence invalidates prior
  approvals and semantic scorecards;
- rubric changes create a new version and restart the run.

## Stage 5: Build The Composite

Implement in small, reviewable commits. A recommended order is:

1. composite decision ledger and architecture documentation;
2. shared schemas and grader contracts;
3. deterministic runners and common scoring library;
4. anti-gaming and mutation tests;
5. append-safe intake, query, and maintenance tools;
6. browser and responsive QA harness;
7. human-review and release protocols;
8. knowledge-bank migrations or policy reconciliation;
9. selective website improvements justified by failed evals;
10. final run records and PR documentation.

### 5.1 Consolidate Rather Than Duplicate

- Reuse the existing I-branch records, policies, batches, corpora, and public
  registry.
- Adapt K's intake and query ergonomics to the existing schema rather than
  importing a parallel lifecycle.
- Adapt B's composition manifest and role classification into canonical policy
  records rather than maintaining separate truth tables.
- Adapt C's fingerprints and diagnostic/closure distinction into common run
  schemas.
- Adapt D and H's browser evidence into a reproducible route matrix rather than
  committing an unbounded screenshot archive.
- Adapt E and L's human protocols into minimized public-safe templates.
- Adapt G's detailed traceability into compact durable run notes with generated
  machine output kept under ignored `reports/generated/` paths.
- Adapt J and N's application argument, artistic continuity, recursive-method,
  current-capability, and outcome-transfer maps without turning every true
  claim into website copy.
- Adapt M's P0/P1/P2 triage into the final readiness report.

### 5.2 Add Operator Commands

Provide discoverable npm commands for at least:

```text
evals:fast
evals:knowledge
evals:portfolio:application
evals:portfolio:production
evals:blind-spots
evals:browser
evals:release
knowledge:intake
knowledge:query
knowledge:report
```

Command names may follow existing conventions if changing them would create
unnecessary churn. Document the final command map in the root README. Ensure
`npm run check` invokes deterministic regressions but does not require
fabricated human evidence or a live production deployment.

### 5.3 Required Test Coverage

Add or preserve tests for:

- suite schema and exact criterion IDs;
- weight totals and profile membership;
- candidate, rubric, and evidence fingerprint mismatches;
- two-consecutive-pass requirements;
- human and runtime gates that fail closed;
- no-silent-loss intake and unresolved-reference detection;
- claim maturity versus projection status;
- collective versus individual role classification;
- overclaiming and underclaiming;
- protocol-as-evidence attacks;
- source mention versus endorsement or impact;
- chronology versus causality;
- observed social population versus all-time export;
- repost or shared-account activity versus individual authorship;
- negative search versus nonexistence;
- private path, raw text, authenticated-state, and protected-locator leakage;
- deletion of qualifiers, boundaries, anti-claims, or source limitations;
- review-lock or policy-fingerprint drift;
- website claim changes without knowledge-bank reconciliation;
- resume phone leakage into HTML;
- route, CTA, canonical, robots, sitemap, and resume-artifact integrity;
- responsive overflow, keyboard focus, contrast, alt text, and console errors.

Mutation tests should deliberately refresh editable checksums where applicable.
The system must still reject a semantically hostile change that updates its own
ordinary digest.

## Stage 6: Establish The Baseline

After the composite framework is implemented but before changing public copy,
freeze the rubric version and capture a complete baseline.

The baseline record must include:

- branch and candidate SHA;
- base SHA;
- rubric and policy fingerprints;
- changed-file and line counts;
- deterministic results;
- browser route matrix;
- current semantic scorecards;
- current human, rights, runtime, and market evidence states;
- open blind spots;
- application-share and production-launch eligibility;
- the highest-priority failing mutable criterion;
- explicit non-goals for the run.

Do not award a score for evidence that was unavailable. Use `not_observed` or
the appropriate blocked status.

## Stage 7: Hill Climb Recursively

Use this loop without changing the rubric during a run.

1. Run all deterministic gates against the exact candidate.
2. Collect browser evidence for the rubric's required routes and viewports.
3. Obtain independent semantic scorecards from fresh judge contexts.
4. Sort failures lexicographically:
   - public safety, privacy, factual integrity, collective credit;
   - failed deterministic or runtime hard gates;
   - failed blocking criteria;
   - highest-weight semantic gap;
   - smallest low-risk quality improvement.
5. Select one primary failure. State a causal hypothesis, intended evidence,
   protected invariants, and expected score movement.
6. Make the smallest coherent patch at the controlling layer: knowledge bank,
   website, artifact, infrastructure, protocol, or external-evidence request.
7. Run the focused test, adjacent regressions, and full deterministic suite.
8. Rebuild and collect fresh browser evidence when a rendered surface changed.
9. Give neutral baseline and candidate bundles to a fresh judge that did not
   author the patch.
10. Keep the patch only when the target improves or a failed gate becomes a
    pass, no higher-priority dimension regresses, no hard constraint weakens,
    and the diff remains proportionate.
11. Record the iteration, accepted or rejected decision, exact evidence,
    remaining blocker, and next action.
12. Repeat until the relevant stop condition is reached.

### Hill-Climb Stop Conditions

Stop successfully only when:

- the selected profile's deterministic gates pass;
- its weighted threshold and per-criterion floors are met;
- no blocking criterion is averaged away;
- two consecutive complete runs pass on the unchanged candidate where required;
- required semantic judges are independent and candidate-bound;
- no new public-safety, claim, accessibility, or collective-credit regression
  appears;
- the remaining human and runtime gates are either genuinely completed or
  truthfully blocked;
- the final change is useful for the intended audience, not merely scoreable.

Stop and report `human_blocked` when the next step requires:

- Jamie's exact-candidate approval;
- collaborator confirmation or permission;
- a target hiring reader or bounded market-response sample;
- image rights or depicted-person consent;
- a private source that is unavailable or unsafe to expose;
- production deployment, DNS, TLS, indexing, health, or rollback evidence.

Also stop after eight iterations or three consecutive iterations without
objective improvement. Do not continue polishing indefinitely.

### Application Cadence Guardrail

When the application candidate is otherwise usable, cap noncritical archival
or aesthetic work at one 90-minute research block per opportunity. Return
unresolved proof work to the knowledge queue and return Jamie's time to the
application, referral, conversation, or outreach. The evaluation system exists
to support a successful professional life, not to postpone it.

## Stage 8: Build And Verify

Run under Node 26 from a clean install:

```bash
nvm use 26
npm ci
npm run typecheck
npm run lint
npm run build
npm run check
npm run preflight:staging
npm run preflight:production
git diff --check
```

Run all newly introduced focused commands and tests explicitly. Do not rely on
their inclusion in `npm run check` without verifying the wiring.

For rendered QA, inspect every canonical application-facing route at minimum:

```text
320 x 844
375 x 812
768 x 1024
1440 x 1000
```

Verify:

- no document, heading, toolbar, card, figure, button, or code block overflows;
- keyboard order and visible focus;
- landmarks and heading order;
- readable text contrast;
- useful alt text and captions;
- truthful CTA labels and destinations;
- no browser console errors;
- canonical metadata, robots policy, and sitemap behavior;
- the resume HTML page and approved PDF;
- phone absent from HTML and present only where approved;
- public citations and proof links resolve;
- staging remains `noindex` and production-mode output is internally coherent.

If Docker is available, build and run the production image, verify its non-root
runtime, and smoke the canonical routes, `/api/health`, `robots.txt`,
`sitemap.xml`, and the resume PDF. A local production-mode container is not
evidence that the public production cutover occurred.

## Stage 9: Final Integration Audit

Before opening the pull request, produce a concise durable report under:

```text
docs/evals/runs/<date>-feature-knowledge-i-composite.md
```

It must include:

- exact head and base SHAs;
- the A-N decision ledger summary;
- canonical architecture and command map;
- migrations performed and duplicate structures removed;
- baseline and final scores;
- every recursive iteration and rejected regression;
- deterministic, browser, semantic, and build results;
- human, rights, market, and production gates still open;
- public-safety review and private-material exclusions;
- reviewability assessment and suggested review order;
- application-share status;
- production-launch status;
- explicit statement that the PR does not deploy production.

Run final repository checks once more after writing the report. The report must
describe the exact commit that the final scorecards evaluate. If the report
commit changes governed inputs, renew the affected scorecards.

## Stage 10: Commit And Push

Keep commits comprehensible and avoid mixing generated evidence with framework
logic. Stage only intended files.

```bash
git status --short
git diff --stat origin/develop...HEAD
git diff --check
git add <explicit-paths>
git commit -m "feat(evals): integrate composite knowledge evaluation system"
git push -u origin feature/knowledge-i
```

Do not use `git add -A` without first verifying that the worktree contains no
unrelated files. Do not rewrite or force-push the frozen eval branches.

## Stage 11: Create The Pull Request

First verify that no PR already exists for this head:

```bash
gh pr list \
  --repo openhouse/jamieburk.art \
  --state all \
  --head feature/knowledge-i
```

If none exists, create exactly one pull request:

```bash
gh pr create \
  --repo openhouse/jamieburk.art \
  --base develop \
  --head feature/knowledge-i \
  --title "feature/knowledge-i" \
  --body-file /tmp/feature-knowledge-i-pr.md
```

The pull request apply target must be `develop`.

The PR body must contain:

1. **Purpose:** one composite system from the frozen eval family.
2. **Starting point:** `feature/knowledge-i`, originally cut from
   `feature/evals-I` at `793f7262`.
3. **Branch-family synthesis:** one sentence for each A-N contribution adopted,
   adapted, deferred, or rejected.
4. **Architecture:** canonical suites, graders, modes, commands, and data flow.
5. **Website changes:** only the audience-facing changes justified by failed
   evals, with linked knowledge-bank support.
6. **Validation:** exact commands and results, including browser and runtime
   evidence.
7. **Hill-climb record:** baseline, iterations, final state, and rejected
   regressions.
8. **Public-safety boundaries:** what was deliberately kept out of Git and the
   website.
9. **Human gates:** collaborator, reader, rights, application, and exact-release
   evidence still required.
10. **Review plan:** suggested commit and subsystem order for reviewers.
11. **Release boundary:** no production deployment or indexing authorization.

Open the PR as a draft if any implementation, validation, or reviewability work
remains. Mark it ready only when the composite framework and agent-verifiable
criteria pass and the PR body clearly names every external gate still open.

## Definition Of Done

This assignment is complete when all of the following are true:

- work began from the current `feature/knowledge-i` branch;
- every frozen A-N PR was inspected and dispositioned in the decision ledger;
- one canonical eval architecture replaces parallel alternatives;
- knowledge development, application readiness, production readiness,
  blind-spot governance, and modular corpus checks remain distinct but
  coordinated;
- append-safe intake, query, maintenance, correction, and projection workflows
  are usable by a future agent;
- deterministic, browser, LLM, human, and runtime observers cannot impersonate
  one another;
- anti-gaming and mutation tests reject both overstatement and understatement;
- public copy remains selective, clear, source-backed, and proportionate;
- all agent-verifiable hard gates pass;
- recursive hill climbing reaches its criterion or stops honestly at an
  external boundary;
- full build and verification results are recorded against the exact candidate;
- the branch is pushed to `origin/feature/knowledge-i`;
- exactly one pull request exists from `feature/knowledge-i` into `develop`;
- the pull request does not claim production deployment or approval that has
  not occurred.

## Final Principle

Build a system that can remember more than the website should say, research more
than it can presently prove, and express the strongest defensible account of
Jamie's work for the audience at hand. Preserve uncertainty without shame,
agency without inflation, collective credit without self-erasure, and recursive
improvement without confusing measurement for the life the work is meant to
support.
