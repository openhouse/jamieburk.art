# `feature/evals-*` Composite Integration Instructions

**Audience:** A coding and editorial team with no context beyond this repository and its GitHub pull requests.

**Assignment:** Integrate the strongest, compatible ideas from the frozen `feature/evals-A` through `feature/evals-N` branch family into the current `feature/knowledge-f` branch. Create or refine the evals first, build the canonical implementation second, recursively hill climb against the frozen criteria, and open one pull request named `feature/knowledge-f` whose apply target is `develop`.

This is an integration assignment, not a branch-merging exercise. Treat the fourteen `feature/evals-*` branches as read-only reference implementations. Preserve their strongest ideas, but produce one coherent system in `feature/knowledge-f`.

## Required Outcome

At completion:

1. `feature/knowledge-f` is the only implementation branch changed by this work.
2. The implementation extends the repository's current knowledge-bank and launch-eval architecture instead of adding a parallel architecture.
3. The evaluator measures the exact candidate being reviewed, resists obvious score gaming, and distinguishes automated evidence from human approval.
4. The knowledge bank can receive, mature, reconcile, and selectively project evidence without silent loss or automatic publication.
5. Public claims remain defensible, bounded, collectively credited, and consistent wherever they appear.
6. Repository, application, knowledge-bank, public-safety, citation, route, and launch checks pass on the exact pushed commit.
7. A GitHub pull request exists with:
   - head: `feature/knowledge-f`
   - base/apply target: `develop`
   - title: `feature/knowledge-f`

Do not merge or deploy the pull request. Jamie's approval of an exact candidate SHA and the production deployment remain separate human gates.

## Mission And Positioning

The repository mission in `AGENTS.md` is authoritative:

> Build and maintain a focused, public-safe portfolio that makes Jamie legible as a Technical Project Manager - Product Operations & Implementation lead who turns emerging work into usable systems for complex public-facing teams.

The canonical positioning sentence is:

> I turn emerging work into usable systems for complex public-facing teams.

This language matters. It treats ambiguity and transition as ordinary conditions of meaningful work, not as deficiencies. The implementation should show how Jamie finds structures latent in cultural, organizational, civic, archival, and technical material and gives them usable, resilient form.

Keep the hiring argument clear. Preserve the deeper artistic, relational, participatory, and civic practice that explains why Jamie's operating systems differ from conventional administration.

## Non-Negotiable Starting State

Start from the current remote state of `feature/knowledge-f`.

- Repository: `openhouse/jamieburk.art`
- Working branch: `feature/knowledge-f`
- Required ancestor at assignment creation: `ba74618558e55a836d9a73b5293f6fdb45e684ff`
- Pull-request apply target: `develop`
- `develop` at assignment creation: `2ec37fe6e47d11e600ede204d19a98f7d3cff139`
- Runtime: Node `>=26 <27`, npm `>=11`
- Canonical application: `apps/www`

The required ancestor identifies the reviewed handoff point. The remote branch may advance as the integration team commits. Before beginning, verify that the current `origin/feature/knowledge-f` still contains that ancestor:

```bash
git fetch origin develop feature/knowledge-f
git merge-base --is-ancestor ba74618558e55a836d9a73b5293f6fdb45e684ff origin/feature/knowledge-f
```

The second command must exit successfully. If it does not, stop and document the mismatch. Do not force, reset, or reconstruct the branch by guesswork.

Use the existing branch if it is already checked out:

```bash
git switch feature/knowledge-f
git pull --ff-only origin feature/knowledge-f
git status --short --branch
```

In a fresh clone where no local branch exists:

```bash
git switch --track origin/feature/knowledge-f
git status --short --branch
```

The worktree must be clean before integration begins. Do not discard unrelated work. If unrelated changes are present, preserve them and use a separate worktree.

## Frozen Reference Family

The following branches and pull requests are frozen for study. Read them through remote refs, GitHub diffs, or a disposable review worktree. Do not push to them, rebase them, merge them wholesale, or cherry-pick their complete commit series.

| Reference | Pull request | Distinctive strength to carry forward |
| --- | --- | --- |
| `feature/evals-A` | [#220](https://github.com/openhouse/jamieburk.art/pull/220) | Mutation-resistant provenance, sealed evidence-frontier checks, source receipts, graph closure, and adversarial tests for alias, Unicode, Markdown, and escaped-JSON bypasses. |
| `feature/evals-B` | [#212](https://github.com/openhouse/jamieburk.art/pull/212) | Separation of lifecycle, claim, Chad, Morse, Sack, and blind-spot governance; a mosaic model that keeps dramatic evidence from eclipsing collaborators, operational labor, or smaller proofs. |
| `feature/evals-C` | [#221](https://github.com/openhouse/jamieburk.art/pull/221) | Clear distinction between application readiness and production readiness; privacy-aware population controls; candidate and contract fingerprints; triangulation and rights decisions. |
| `feature/evals-D` | [#216](https://github.com/openhouse/jamieburk.art/pull/216) | Versioned launch protocols, rubric history, observation templates, and explicit deterministic, semantic, browser, human, deployment, and rollback gates. |
| `feature/evals-E` | [#211](https://github.com/openhouse/jamieburk.art/pull/211) | Rich typed lifecycle semantics for accessions, readings, propositions, claim maturity, and publication decisions; source-specific endpoint and non-affordance boundaries. |
| `feature/evals-F` | [#210](https://github.com/openhouse/jamieburk.art/pull/210) | The current working spine: end-to-end release engineering, weighted criteria, hard gates, anti-gaming rules, selective projection, browser/build verification, cutover, rollback, and human gates. |
| `feature/evals-G` | [#222](https://github.com/openhouse/jamieburk.art/pull/222) | Exact-candidate fingerprints, consecutive unchanged passes, auditable stop records, and the useful principle that stronger evidence need not inflate an already-passing score. |
| `feature/evals-H` | [#223](https://github.com/openhouse/jamieburk.art/pull/223) | Close-reading rigor, attribution and support ecology, conflict preservation, rights-aware article records, and refusal to turn research depth into public-site bloat. |
| `feature/evals-I` | [#219](https://github.com/openhouse/jamieburk.art/pull/219) | Evaluator-correctness tests that catch stale, hard-coded, unbound, or below-minimum passes; commit/input binding; privacy-safe regression fixtures. |
| `feature/evals-J` | [#209](https://github.com/openhouse/jamieburk.art/pull/209) | Optimizer/evaluator separation, frozen rubrics, read-only judges, repeated exact-candidate certification, conservative reserve posture, and explicit stop records. |
| `feature/evals-K` | [#217](https://github.com/openhouse/jamieburk.art/pull/217) | Usable lifecycle tooling: append-only intake receipts, duplicate reconciliation, integrity checkpoints, CLI workflows, compiled leak scans, and titles treated as leads rather than proof. |
| `feature/evals-L` | [#213](https://github.com/openhouse/jamieburk.art/pull/213) | A compact source-to-claim loop, source-specific governance, staging/production preflights, and maintainable implementation boundaries. |
| `feature/evals-M` | [#215](https://github.com/openhouse/jamieburk.art/pull/215) | Archive breadth plus selective composition, rights-aware photo-editor leads, development/batch distinctions, and proof that protected evidence need not alter the public citation registry. |
| `feature/evals-N` | [#214](https://github.com/openhouse/jamieburk.art/pull/214) | Cross-surface claim consistency, adversarial holdouts, generalized sensitive-value detection, privacy-safe tests, and minimal material movement. |

These are design inputs, not fourteen mandatory subsystems. Integrate a concept only when it improves the canonical implementation without duplicating vocabulary, records, runners, or reports.

## Read Before Editing

Read these files in this order:

1. `AGENTS.md`
2. `package.json`
3. `docs/knowledge-bank/README.md`
4. `docs/evals/launch-readiness.md`
5. `docs/knowledge-bank/launch-blockers.md`
6. `docs/knowledge-bank/public-safety.md`
7. `docs/knowledge-bank/publishing-governance.md`
8. `docs/knowledge-bank/citational-care.md`
9. `apps/www/src/data/knowledge-bank/schema.ts`
10. `apps/www/src/data/knowledge-bank/framework.ts`
11. `apps/www/src/data/knowledge-bank/records.ts`
12. `apps/www/src/data/proofs.ts`
13. `scripts/lib/launch-readiness-evals.mjs`
14. `scripts/run-launch-evals.mjs`
15. `scripts/tests/launch-evals.test.mjs`
16. `scripts/check-knowledge-bank.mjs`
17. `scripts/check-public-safety.mjs`
18. `scripts/check-citations.mjs`

Then inspect each frozen PR's file list, core schema, runner, tests, and most distinctive fixtures. Avoid spending integration time rereading duplicated prose when the executable difference is already clear.

## Canonical Architecture

Extend the current `feature/knowledge-f` architecture. Do not import branch-letter namespaces or retain parallel versions of the same concept.

The canonical layers are:

| Layer | Canonical location | Responsibility |
| --- | --- | --- |
| Repository policy | `AGENTS.md` | Mission, public-safety rules, Chad lens, app boundary, and deployment policy. |
| Human-readable knowledge bank | `docs/knowledge-bank/` | Public-safe research notes, intake receipts, project narratives, source coverage, anti-claims, guardrails, and approval state. |
| Canonical citational records | `apps/www/src/data/knowledge-bank/records.ts` | Claims, sources, support relationships, projections, inquiries, corrections, and page plans. |
| Lifecycle framework | `apps/www/src/data/knowledge-bank/framework.ts` | Intake, maturation, relationships, publication decisions, proof debt, and photo leads. |
| Type system | `apps/www/src/data/knowledge-bank/schema.ts` | Shared evidence, status, safety, editorial, source, claim, and relationship semantics. |
| Broader proof layer | `apps/www/src/data/proofs.ts` | Public-safe professional accomplishments and supporting boundaries. |
| Public projection | `apps/www` routes and content | Audience-specific composition from the bank, never a mirror of the bank. |
| Evaluator | `scripts/lib/launch-readiness-evals.mjs` | Pure or read-only criteria evaluated against explicit candidate inputs. |
| Runner | `scripts/run-launch-evals.mjs` | Candidate collection, execution, report generation, and process exit state. |
| Regression tests | `scripts/tests/launch-evals.test.mjs` | Evaluator correctness, adversarial mutations, candidate binding, and anti-gaming behavior. |
| Generated evidence | `reports/generated/` | Ignored local run outputs; never treated as public portfolio content. |

Prefer one vocabulary for each concept. Before adding a type, runner, register, or report, search for an existing equivalent. Consolidate semantics deliberately instead of keeping multiple names for the same state.

## Core Invariants

The composite system must preserve all of the following.

### Public safety

- This is a public repository. Do not add private source files, local filesystem paths, raw transcripts, private correspondence, credentials, signed URLs, contact details, private stakeholder lists, unapproved images, internal analytics, or protected archive inventories.
- A protected source may be represented by public bibliographic metadata, a bounded paraphrase, proposition-level support, explicit non-affordances, and an opaque protected locator ID.
- Never place a real private value inside a test fixture. Generate synthetic sensitive values for detection tests.
- A source being locally accessible does not make it publishable.
- Archive custody is not rights clearance, consent, or permission.

### No silent loss

- Every submitted memory, source, URL, artifact, correction, or photo lead receives a durable intake disposition.
- An item may become a source, proposition, claim, inquiry, correction, relationship, reserve lead, duplicate, protected record, or rejection with reason.
- Duplicate reconciliation must preserve provenance to each intake event.
- `not recovered` is distinct from `did not exist`.
- A title, filename, search result, timeline count, or URL is a lead, not automatically support for a claim.

### Independent judgments

Keep these states separate in both schema and evaluator logic:

1. **Evidentiary maturity:** what the record establishes.
2. **Publication safety:** whether the material may be public and under which boundary.
3. **Editorial selection:** whether the material serves the present public argument.

Publicly defensible does not mean selected. Selected does not mean prominent. Omitted from the website does not mean discarded from the knowledge bank.

### Claims and agency

- Make Jamie's direct contribution legible with active, specific verbs.
- Keep project existence, Jamie's role, outputs, observed outcomes, authority, title, causality, and current status separate.
- Collective work requires collective-credit language. Do not erase collaborators or infer sole authorship.
- Do not infer private institutional motives from public sequence or testimony.
- Do not convert allocation into agreement execution, receipt, disbursement, completion, or present status.
- Do not convert social interaction into endorsement, reach, causality, or measured impact.
- A claim may be strengthened only after its canonical record, support, guardrail, prohibited formulations, and public-use boundary are updated.

### Portfolio composition

- The website is a projection of the knowledge bank, not an archive browser or claims database.
- Do not add public `/proofs`, `/knowledge-bank`, or `/public-claims` routes.
- Minimize reader burden while preserving necessary qualification.
- Keep the actor, entry condition, purpose, usable output, bounded evidence, and next action visible.
- Preserve at least one threshold where Jamie's artistic, civic, technical, and social practices remain visibly connected.
- Counts can establish scale or a floor when appropriately bounded. They cannot substitute for an implementation account or relationship model.

## Stage 0: Establish A Reproducible Baseline

Use Node 26 and install from the lockfile:

```bash
node --version
npm --version
npm ci
```

Record the exact starting state:

```bash
git status --short --branch
git rev-parse HEAD
git rev-parse origin/feature/knowledge-f
git rev-parse origin/develop
git diff --stat origin/develop...HEAD
```

Run the existing gates before changing the rubric or implementation:

```bash
npm run test:evals
npm run evals:launch
npm run check
npm run preflight:staging
npm run preflight:production
```

Run these serially. Next.js builds and generated artifacts can contend when concurrent checks use the same worktree.

Capture:

- candidate SHA;
- evaluator contract/rubric version if present;
- score, threshold, hard-gate status, and criterion failures;
- test, citation, route, public-safety, knowledge-bank, and application-check results;
- public citation registry digest;
- list of human gates and their actual state;
- environment-specific failures, without misreporting them as product failures.

If the starting branch passes, that is a baseline, not proof that the composite work is unnecessary. The integration adds evaluator correctness, provenance, operational usability, and resistance to regressions. Do not lower passing criteria to preserve the baseline score.

## Stage 1: Create And Freeze The Composite Evals

Define the evaluation contract before building new features. The rubric should describe the desired behavior independently of the current implementation.

### Required criterion families

The composite evaluator must cover these families, either as distinct suites or clearly inspectable groups in one runner:

| Family | What it must establish |
| --- | --- |
| Candidate identity | Every result binds to the exact Git SHA plus a digest of material evaluator inputs, public projection inputs, and the rubric contract. |
| Evaluator integrity | Stale reports, hard-coded passes, missing inputs, disabled criteria, below-minimum data, and unbound candidate results fail. |
| Provenance frontier | Every selected claim closes through projection, canonical claim, proposition/support edge, source or approved first-party basis, and public-use boundary. |
| Lifecycle integrity | Intake, reading, proposition, claim, inquiry, correction, publication decision, duplicate reconciliation, and reserve disposition cannot silently disappear. |
| Evidence quality | Support class, source independence, corroboration, conflict, non-affordances, and open questions remain explicit. |
| Publication governance | Evidence maturity, public safety, rights/consent, and editorial selection remain independently represented. |
| Cross-surface consistency | The same canonical claim cannot drift materially across homepage, work pages, resume, structured data, proof data, citation registry, and metadata. |
| Chad lens | Jamie is the actor; entry condition, purpose, usable outputs, bounded proof, audience language, and next action are legible with low reader burden. |
| Margaret Morse lens | Embodiment, attention, experimentation, hospitality, atmosphere, artistic intelligence, participation, memory, place, and artistic-civic-technical-social continuity survive the hiring composition. |
| Warren Sack lens | Recursive relations, implementation, interface or embodied interaction, multimodal documentation, dialogue, use context, and collective authorship remain connected. |
| Portfolio mosaic | Dramatic achievements cannot erase small operational proofs, sustained maintenance, collaboration, artistic inquiry, or unresolved evidence debt. |
| Blind spots | Role specificity, independent comprehension, contribution, outcomes, technical depth, collaboration, visuals, longitudinal synthesis, application cadence, agency, and integration governance retain owners and stop rules. |
| Archive population controls | Bounded social, event, press, attendance, database, or other aggregate populations reconcile without claiming universal historical completeness. |
| Privacy and rights | Protected values, raw records, private locators, unapproved media, identities, and false rights status do not enter the public repository or generated public registry. |
| Selective projection | Mature reserve evidence can improve the bank without forcing public-site changes; public citation output remains stable when no projection is selected. |
| Release readiness | Build, responsive behavior, resume artifact, routes, citations, knowledge bank, public safety, environment, cutover, rollback, and postdeploy requirements are explicit. |
| Application readiness | Role-fit and reviewer-comprehension evidence stay distinct from production infrastructure readiness. |
| Integration governance | Branch ownership, frozen references, supersession, exact-SHA review, PR base, deployment approval, and postdeploy verification cannot collapse into one status. |

### Criterion contract

Every automated criterion must declare:

- stable ID;
- human-readable name and purpose;
- suite/family;
- weight;
- hard-gate status;
- evidence inputs;
- passing condition;
- minimum population or coverage requirement where relevant;
- failure message that identifies the actionable defect;
- anti-gaming rule;
- stop condition;
- related manual gate, if judgment or external action remains necessary.

Version the rubric. Record why criteria changed. A rubric change invalidates prior certification until the candidate passes against the new contract.

### Automated, semantic, browser, and human evidence

Do not flatten unlike evidence into one score.

- **Deterministic:** schema, graph closure, population reconciliation, routes, build, citations, digests, privacy scans, occurrence consistency.
- **Semantic:** clarity, agency, support entailment, Chad lens, Morse lens, Sack lens, anti-flattening review. Retain prompt/model/contract inputs when an LLM is used.
- **Browser/visual:** responsive behavior, clipping, overlap, route usability, resume delivery, key viewport checks.
- **Human:** independent comprehension, collaborator confirmation, rights and consent, resume approval, exact-SHA production approval, deployment, and postdeploy verification.

Automated protocol readiness is not a completed human result. Human gates remain `required-not-run` until a qualified person actually performs and records them.

### Adversarial fixtures

Tests must prove that the evaluator fails when the candidate is materially corrupted. At minimum, include synthetic mutations for:

- orphaned selected claim;
- missing support edge;
- unsupported stronger wording;
- alias/Unicode/Markdown/escaped-JSON sensitive-value bypass;
- source count below required minimum;
- record silently removed from a bounded population;
- duplicate incorrectly discarded rather than reconciled;
- stale result copied to a different commit;
- evaluator input changed without candidate digest changing;
- hard-coded pass or disabled criterion;
- public projection changed while canonical claim stays unchanged;
- collective project recast as sole authorship;
- reserve claim silently promoted to a public page;
- protected source or local path introduced;
- human approval marked complete without observation evidence.

Use synthetic fixture values. Tests must not teach the repository the private literals they are designed to catch.

### Stop rule

Freeze the threshold and stop rule before implementation. The default inherited launch rule is:

- automated score is at least `94`;
- every automated hard gate passes;
- no anti-gaming rule is violated;
- every remaining manual gate is explicit and honestly states its status;
- the same exact candidate and contract pass twice consecutively without file changes between runs;
- an independent read-only holdout confirms the final exact candidate;
- the final run record contains candidate, contract, input, and public-registry fingerprints.

Passing criteria may improve in evidence quality without receiving extra points. The goal is trustworthy readiness, not score inflation.

## Stage 2: Build One Composite System

Once the rubric is frozen, implement only what is needed to satisfy it coherently.

### Integration order

1. **Normalize vocabulary.** Map concepts from A-N onto the current F schema and document any deliberate semantic changes.
2. **Strengthen candidate binding.** Add contract and material-input fingerprints without making ignored generated reports part of the candidate.
3. **Strengthen evaluator tests.** Catch stale, hard-coded, missing-input, below-minimum, and privacy-bypass passes before adding new score surface.
4. **Close provenance.** Ensure selected public claims can be traversed to bounded support and source posture.
5. **Complete lifecycle operations.** Add append-only intake receipts, reconciliation, integrity checks, or CLI affordances only where the current framework lacks a usable operation.
6. **Add cross-surface occurrence checks.** Detect material drift while allowing audience-appropriate paraphrase and composition.
7. **Add editorial lenses and mosaic controls.** Preserve agency and hiring clarity without erasing embodiment, relationships, collaboration, or small operational work.
8. **Add independent holdout mechanics.** Keep optimizer and final judge roles separate and bind both to the exact candidate.
9. **Exercise selective projection.** Demonstrate that protected or reserve evidence can mature without changing public output.
10. **Complete build and release controls.** Ensure staging and production preflights, cutover, rollback, and manual approvals remain legible.

### Implementation boundaries

- Extend current modules before adding new ones.
- Do not create `schema-a`, `schema-b`, `runner-g`, `evals-n`, or other branch-letter artifacts.
- Do not keep fourteen reports that answer the same question in incompatible forms.
- Do not add a database, CMS, authentication system, archive browser, private-document browser, analytics platform, AI chatbot, or major framework change.
- Use structured parsers and typed data for structured records.
- Keep source-specific exceptions explicit and narrow. Do not weaken a general rule to accommodate one difficult source.
- Prefer compact, inspectable records to duplicated prose.
- Preserve contradictions and date conflicts as governed inquiries; do not resolve them by choosing the more convenient version.
- A source-specific endpoint may support one proposition and explicitly fail to support another.
- Store raw archive artifacts outside the public repository.

### Recommended operational affordances

If they are not already adequately available, add small repository-native commands for:

- accepting an intake record;
- reconciling a duplicate while preserving both receipts;
- validating graph closure;
- listing unresolved proof debt;
- showing selected versus reserve claims;
- calculating candidate and contract fingerprints;
- running a privacy-safe compiled-output scan;
- producing a human-readable run record.

Commands should call the canonical schema and validation library. They must not become a second source of truth.

### Public projection test

Exercise at least two opposing cases:

1. Mature a public-safe, relevant claim and deliberately project it to an appropriate public surface with canonical citation support.
2. Mature a protected, reserve, rights-pending, or compositionally unnecessary claim without changing the public citation registry or public site.

The second case is essential. It proves that "no silent loss" does not mean "publish everything."

### Photo and visual evidence

Photo-editor leads may identify candidate moments, evidence value, source period, and research questions. They must also preserve rights, consent, vulnerability, caption, and purpose as unresolved until reviewed.

Visual evidence can feed new research and claims. It cannot become public merely because a local archive contains it. Do not add unapproved archive photographs to the app.

## Stage 3: Hill Climb Recursively

Use this loop. Do not perform a large undifferentiated rewrite and score only at the end.

### Iteration protocol

1. Run the relevant focused test and the full evaluator on the current exact candidate.
2. Record the candidate fingerprint, contract fingerprint, score, hard failures, warnings, and manual gates.
3. Select one bounded failure or one evidence-quality weakness.
4. State a falsifiable repair hypothesis.
5. Make the smallest coherent change that could satisfy it.
6. Run focused tests for the changed subsystem.
7. Run adversarial fixtures that should now fail under corruption.
8. Run `npm run check` and `npm run evals:launch` on the unchanged candidate.
9. Compare results. Reject a move that weakens another hard gate, privacy boundary, collective-credit rule, or reader comprehension.
10. Commit the coherent increment with an explanatory message.
11. Repeat until the frozen stop rule is met.

### Optimizer and judge separation

The agent or person making changes is the optimizer. The final holdout must be read-only and must not repair the candidate it judges.

The final holdout should receive:

- exact candidate SHA;
- exact contract version and digest;
- material-input digest;
- expected commands, not expected answers;
- no private evidence that the public evaluator or public reader would not have.

If the holdout finds a defect, return to the optimizer, change the candidate, and restart the consecutive-pass count. Do not edit the result record to make the old candidate pass.

### Honest failure handling

- A network or service outage is an environment observation, not a successful product check.
- A browser check not run is `required-not-run`, not passed.
- A missing collaborator response is unresolved, not consent.
- A source not recovered is unresolved, not nonexistent.
- A score at threshold with a hard-gate failure is a failure.
- A passing run bound to a prior commit is stale and invalid.
- A changed rubric or material input invalidates the previous consecutive-pass sequence.

### Timebox and outward action

Use the existing 90-minute opportunity timebox for noncritical archival proof debt. When a proof question does not block a hard gate or materially improve the current application argument, return it to the inquiry queue and return effort to applications, outreach, conversations, or release work.

The knowledge bank should support the job search, not indefinitely postpone it.

## Required Validation

Run all commands on the exact commit that will be pushed. Run them serially.

```bash
npm run test:citations
npm run test:evals
npm run knowledge-bank
npm run public-safety
npm run check:routes
npm run evals:launch
npm run check
npm run preflight:staging
npm run preflight:production
git diff --check origin/develop...HEAD
git status --short --branch
```

`npm run check` currently composes citation checks, citation tests, eval tests, the `apps/www` check, knowledge-bank validation, public-safety validation, route checks, and launch evals. Still report focused commands separately when they establish a specific integration claim.

Browser and visual checks should cover at least:

- `/`
- `/work`
- `/work/technical-operations`
- `/resume`
- `/about`
- `/contact`
- every modified work or lab route
- resume PDF delivery
- narrow mobile and desktop viewports
- clipping, overlap, horizontal overflow, focus order, links, and primary next actions

Do not conceal layout defects with global overflow suppression.

The production preflight validates production configuration. It does not authorize or perform a production deployment.

## Required Run Record

Add a durable, public-safe Markdown run record under `docs/evals/runs/` for the final candidate. It must include:

- date and branch;
- candidate SHA;
- base branch and current merge base;
- rubric version and digest;
- material evaluator-input digest;
- public citation registry digest;
- commands run and exit status;
- score, threshold, hard-gate count, failures, and warnings;
- adversarial mutations exercised;
- two consecutive unchanged-candidate results;
- independent holdout identity by role, not private personal details;
- unresolved manual gates as `required-not-run`, `blocked`, or `failed`;
- material changes made during the hill climb;
- source-safety and rights boundaries;
- explicit statement that the run does not authorize deployment.

Generated machine reports may remain ignored under `reports/generated/`. The durable run record should summarize results without exposing protected material or machine-specific paths.

## Pull Request Procedure

Before committing, inspect the complete branch diff:

```bash
git status --short
git diff --stat origin/feature/knowledge-f
git diff --check
```

Stage explicit paths. Do not use a broad add if the worktree contains anything unrelated:

```bash
git add AGENTS.md package.json apps/www docs scripts
git status --short
```

Adjust the explicit path list to the actual work. Never stage private archive files, local reports, screenshots, credentials, build output, or unrelated user changes.

Commit coherent increments while hill climbing. The final integration commit message may be:

```bash
git commit -m "feat: integrate composite knowledge evaluation system"
```

Push the required branch:

```bash
git push origin feature/knowledge-f
```

Check whether a pull request already exists:

```bash
gh pr view feature/knowledge-f --repo openhouse/jamieburk.art
```

If it exists, update that pull request. Do not create a duplicate. If it does not exist, create it:

```bash
gh pr create \
  --repo openhouse/jamieburk.art \
  --base develop \
  --head feature/knowledge-f \
  --title "feature/knowledge-f" \
  --body-file docs/evals/feature-knowledge-f-pr.md
```

Create `docs/evals/feature-knowledge-f-pr.md` as a public-safe PR handoff before invoking the command. It should contain:

1. **Intent:** one canonical integration of the frozen eval branch family.
2. **Starting point:** `feature/knowledge-f` and required ancestor `ba74618558e55a836d9a73b5293f6fdb45e684ff`.
3. **Composite decisions:** what was adopted from A-N, what was normalized, and what was deliberately omitted as duplication.
4. **Architecture:** canonical schema, lifecycle, evaluator, runner, tests, and public projection boundaries.
5. **Hill-climb record:** baseline, iterations, final exact candidate, frozen contract, and consecutive passes.
6. **Verification:** every command and result, plus browser/visual evidence.
7. **Public safety:** protected-source, privacy, rights, consent, and collective-credit controls.
8. **Human gates:** every item still requiring Jamie, collaborators, independent readers, rights reviewers, deployment approval, or postdeploy verification.
9. **Frozen family:** A-N remained read-only and this PR does not claim to merge or supersede them administratively.
10. **Apply target:** `develop`.

After creating or updating the PR, verify its metadata:

```bash
gh pr view feature/knowledge-f \
  --repo openhouse/jamieburk.art \
  --json number,title,headRefName,baseRefName,isDraft,url,mergeStateStatus,statusCheckRollup
```

The returned `headRefName` must be `feature/knowledge-f` and `baseRefName` must be `develop`. Do not change the base to `feature/evals-F`, another feature branch, or a composite branch.

## Acceptance Checklist

The assignment is complete only when every applicable item below is true.

- [ ] `origin/feature/knowledge-f` contains required ancestor `ba74618558e55a836d9a73b5293f6fdb45e684ff`.
- [ ] Only `feature/knowledge-f` was changed; `feature/evals-A` through `feature/evals-N` remained read-only.
- [ ] The team reviewed all fourteen frozen implementations and documented adoption or omission decisions.
- [ ] One canonical schema, lifecycle model, evaluator, runner, and report contract remain.
- [ ] The rubric was defined and versioned before implementation changes were judged.
- [ ] Results bind to the exact candidate, contract, material inputs, and public registry.
- [ ] Stale, hard-coded, below-minimum, missing-input, and disabled-gate passes are rejected by tests.
- [ ] Adversarial fixtures cover provenance, privacy bypasses, population loss, claim drift, reserve promotion, collective-credit inflation, and fabricated human approval.
- [ ] Evidence maturity, publication safety, rights/consent, and editorial selection remain independent.
- [ ] Intake and duplicate reconciliation preserve provenance without automatic publication.
- [ ] Selected public claims close to canonical support and bounded source posture.
- [ ] Material claim wording is consistent across public occurrences or differences are intentional and governed.
- [ ] Chad, Margaret Morse, Warren Sack, portfolio-mosaic, and blind-spot criteria pass without projecting protected professor material.
- [ ] Protected or reserve evidence can mature without changing public output.
- [ ] No private paths, raw archives, contact details, credentials, signed URLs, private identities, or unapproved media entered the repository or compiled output.
- [ ] Direct agency and collective credit are both legible.
- [ ] All deterministic repository checks pass on the exact pushed SHA.
- [ ] Browser and visual checks are recorded for all affected routes and viewports.
- [ ] Two consecutive unchanged-candidate runs pass the frozen automated contract.
- [ ] An independent read-only holdout passes the exact final candidate.
- [ ] Human gates remain explicit and honest.
- [ ] The pull request title is `feature/knowledge-f`.
- [ ] The pull request head is `feature/knowledge-f`.
- [ ] The pull request base/apply target is `develop`.
- [ ] The PR documents verification, remaining risk, and deployment boundaries.
- [ ] No merge or production deployment was performed as part of this assignment.

## Reject These Failure Modes

Reject an integration that does any of the following:

- bulk-merges or wholesale cherry-picks the frozen branches;
- creates parallel A-N schemas, runners, registers, or report formats;
- changes the rubric after seeing results solely to obtain a pass;
- raises the score by deleting hard evidence, claims, routes, useful content, unresolved slots, or difficult criteria;
- hard-codes expected counts or pass states without deriving them from canonical data;
- uses a stale report from another commit;
- lets the optimizer certify its own final exact candidate as the independent holdout;
- converts an automated score into human approval or deployment authority;
- imports raw private archives into the public repository;
- weakens privacy detection to accommodate an existing leak;
- puts private literals into regression tests;
- treats access, custody, or authentication as publication permission;
- treats a source index, title, tag, post, or link as close-read support;
- erases source conflict, uncertainty, unresolved population slots, or non-affordances;
- overstates Jamie's title, authority, causality, individual authorship, or present role;
- understates Jamie's direct operational, technical, design, facilitation, maintenance, or implementation work;
- erases collaborators or assumes their permission;
- publishes every mature claim merely because it is defensible;
- turns the public site into a knowledge-bank viewer;
- mistakes a production preflight for production approval;
- opens the pull request against any branch other than `develop`.

## Escalation Conditions

Stop and record a blocker rather than guessing when:

- `feature/knowledge-f` no longer contains the required ancestor;
- the frozen branches materially disagree about a factual claim and the canonical evidence does not resolve it;
- a change would expose protected data or requires uncertain publication rights;
- a public claim needs collaborator confirmation or permission;
- an evaluator cannot distinguish a real signal from a hard-coded implementation detail;
- a command fails because of runtime, network, or service state and the failure cannot be reproduced locally;
- the same person or agent would have to act as both optimizer and final independent holdout;
- a requested visual lacks rights, consent, caption, or vulnerability review;
- a production deployment or resume replacement requires Jamie's approval.

Record the precise unresolved condition, evidence already checked, and smallest next action. Do not transform uncertainty into either a positive claim or a negative conclusion.

## Final Handoff Standard

A teammate, reviewer, or future agent with only the repository and pull request should be able to answer:

1. What candidate was evaluated?
2. What rubric and material inputs were used?
3. What did the frozen A-N family contribute to the composite?
4. How does a fragment become a source, proposition, claim, reserve item, or public projection?
5. Which public claims are supported, bounded, and selected?
6. Which evidence remains protected, unresolved, rights-pending, or compositionally reserved?
7. What changed during each hill-climb iteration?
8. Which automated gates passed?
9. Which human gates remain?
10. What exact branch and PR should be reviewed against `develop`?

The successful result is not the largest possible system. It is the smallest coherent system that preserves the archive's depth, produces trustworthy claims, makes Jamie's value immediately legible, and remains safe and maintainable as new evidence arrives.
