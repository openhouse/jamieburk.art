# `feature/evals-*` Composite Integration Instructions (J)

Date: 2026-07-16  
Repository: [`openhouse/jamieburk.art`](https://github.com/openhouse/jamieburk.art)  
Working branch: `feature/knowledge-j`  
Pull-request base: `develop`

## Purpose

Build one coherent next-generation knowledge and evaluation system from the
strongest ideas in the frozen `feature/evals-A` through `feature/evals-N` pull
request family.

The result should:

- preserve source-backed professional knowledge without forcing all of it onto
  the public website;
- make Jamie's role, action, useful result, and role fit clear to hiring readers;
- keep collective credit, uncertainty, privacy, consent, and rights boundaries
  intact;
- give coding and research agents executable criteria they can improve against;
- distinguish application-share readiness from production-launch readiness;
- stop honestly when the remaining evidence or approval must come from a human;
- leave the repository simpler to operate than fourteen parallel systems.

This is an integration project, not a branch contest and not a request to merge
all fourteen implementations together.

## Starting State

Start from the current remote state of `feature/knowledge-j`. That branch was
seeded from the exact head of `feature/evals-J` at commit
`7e1b758b416bbe7c221f601e331696d95515c593`. The working branch may have newer
commits by the time you begin; do not reset it to the seed commit.

The source PR family is frozen for study:

- do not push to any `feature/evals-*` branch;
- do not rebase, reset, or rewrite those branches;
- do not merge a source branch wholesale;
- inspect fetched remote refs and import behavior in reviewable slices;
- prefer adapting a well-understood idea over copying a parallel framework.

The canonical application remains `apps/www`. Follow `AGENTS.md`, the root
`README.md`, and the repository's public-safety rules.

## Non-Negotiable Boundaries

1. The repository is public. Commit only material suitable for public scrutiny.
2. Raw transcripts, correspondence, private coalition records, participant or
   stakeholder lists, internal analytics, credentials, protected source prose,
   private filesystem paths, and unapproved media stay outside Git.
3. Protected sources may be represented only by public-safe summaries and
   opaque locators that reveal no private path or access mechanism.
4. There must be no public `/proofs`, `/knowledge-bank`, `/public-claims`, raw
   transcript, private archive, or archive-browser route.
5. Website pages remain a selective composition for a specific audience. They
   must not become a rendering of the complete knowledge graph.
6. A memory is a research lead, not independent documentary proof.
7. A source count is not impact. A posted link is not endorsement. A mention is
   not reciprocal engagement. A government action is not Jamie's sole outcome.
8. Collective work must retain collective and institutional credit.
9. No automated process may claim human approval, collaborator corroboration,
   media permission, production deployment, or hiring-reader comprehension.
10. Phone information may remain in the approved resume PDF but must not be
    added to public HTML. Preserve the PDF-specific noindex policy.
11. Uncertainty markers belong in governed research or launch-blocker records,
    not in production-facing copy.
12. Do not reopen the visual identity, framework, CMS, analytics, or navigation
    architecture unless a failing frozen criterion requires a bounded change.

## Source-Branch Integration Map

Use this map to ensure that every source PR receives an explicit disposition.
Create a decision ledger recording `adopt`, `adapt`, `defer`, or `reject` for
each item, with the destination file and rationale.

| Source | Pull request | Distinctive strength | Minimum integration expectation |
| --- | --- | --- | --- |
| `feature/evals-A` | [#220](https://github.com/openhouse/jamieburk.art/pull/220) | Balanced separation of launch readiness, portfolio effectiveness, and knowledge development | Preserve separate objectives and hard gates that cannot be averaged away |
| `feature/evals-B` | [#212](https://github.com/openhouse/jamieburk.art/pull/212) | System-level blind spots, mosaic privacy, composition budgets, role-evidence classification, auditable judge artifacts | Add self-critique controls and exact-set attribution/projection checks |
| `feature/evals-C` | [#221](https://github.com/openhouse/jamieburk.art/pull/221) | Clean application-ready versus production-ready profiles; candidate and contract fingerprints | Bind judgments to both the exact candidate and frozen rubric; fail production closed |
| `feature/evals-D` | [#216](https://github.com/openhouse/jamieburk.art/pull/216) | Versioned QA history, browser measurements, accessibility, visual proof, exact-commit review | Retain concrete browser evidence and regression history, not only final scores |
| `feature/evals-E` | [#211](https://github.com/openhouse/jamieburk.art/pull/211) | Source, browser, independent-judge, and human evaluation layers | Make grader layers explicit and prevent source checks from masquerading as release approval |
| `feature/evals-F` | [#210](https://github.com/openhouse/jamieburk.art/pull/210) | Pragmatic release gates, negative tests, preflight and rollback guidance | Carry production mechanics and anti-inflation regression tests into the release path |
| `feature/evals-G` | [#222](https://github.com/openhouse/jamieburk.art/pull/222) | Compact machine-readable agent objectives and hybrid criteria capped by missing independent review | Keep the canonical rubric compact and cap machine-only evidence honestly |
| `feature/evals-H` | [#223](https://github.com/openhouse/jamieburk.art/pull/223) | Strongest reader-facing release proof: compression, visual evidence, blind holdouts, Docker/runtime checks | Adopt the hiring-reader and runtime evidence model without fabricating human results |
| `feature/evals-I` | [#219](https://github.com/openhouse/jamieburk.art/pull/219) | Fail-closed integrity, immutable baselines, projection reachability, adversarial mutations | Protect collective credit and public projection from coordinated semantic drift |
| `feature/evals-J` | [#209](https://github.com/openhouse/jamieburk.art/pull/209) | Disciplined research and certification history; separate claim-development and projection targets | Keep J as the canonical base and preserve its two-target recursive protocol |
| `feature/evals-K` | [#217](https://github.com/openhouse/jamieburk.art/pull/217) | Append-safe intake, query/report tooling, exact-route manifests, correction and retirement history | Build the usable knowledge-workbench capabilities into J's architecture |
| `feature/evals-L` | [#213](https://github.com/openhouse/jamieburk.art/pull/213) | Clear newcomer operating manual and explicit `governed-open` status | Make the final commands, statuses, and maintenance loop understandable without oral context |
| `feature/evals-M` | [#215](https://github.com/openhouse/jamieburk.art/pull/215) | Operational simplicity, CI integration, and P0/P1/P2 release prioritization | Add a durable CI gate and separate application blockers from production blockers and refinements |
| `feature/evals-N` | [#214](https://github.com/openhouse/jamieburk.art/pull/214) | Comprehensive grader separation and human-evidence maps | Preserve explicit deterministic, holdout, and human roles plus honest pending-human records |

## Stage 0: Establish the Integration Workspace

### 0.1 Check out the working branch

In a fresh clone:

```bash
git clone https://github.com/openhouse/jamieburk.art.git
cd jamieburk.art
git fetch --prune origin
git switch --track origin/feature/knowledge-j
```

In an existing clone where the local branch already exists:

```bash
git fetch --prune origin
git switch feature/knowledge-j
git pull --ff-only origin feature/knowledge-j
```

Confirm that the branch is clean and record the starting SHA:

```bash
git status --short --branch
git rev-parse HEAD
git log -1 --oneline
```

Do not begin from `develop`, a local `feature/evals-*` worktree, or a stale
unpublished branch.

### 0.2 Fetch the frozen source refs

```bash
git fetch --prune origin \
  '+refs/heads/feature/evals-*:refs/remotes/origin/feature/evals-*'
```

Inspect source work without checking out or modifying the source branch:

```bash
git diff --name-status origin/feature/knowledge-j...origin/feature/evals-H
git show origin/feature/evals-K:docs/knowledge-bank/knowledge-lifecycle.md
git show origin/feature/evals-N:docs/evals/portfolio-production-readiness.md
```

Use `git show`, `git diff`, and small manually reviewed ports. Cherry-pick only
when a commit is genuinely atomic, compatible with J, and understood file by
file. Never use a wholesale branch merge as a substitute for integration.

### 0.3 Establish the baseline

Use Node 26 and the lockfile exactly as committed:

```bash
nvm install
nvm use
npm ci
npm run check
```

Record failures as baseline observations. Do not change tests merely to make a
red baseline green. If a build fails because a network font cannot be fetched,
repeat the observation in a clean network-enabled environment before changing
application code.

### 0.4 Create the decision ledger

Add a public-safe integration ledger under `docs/evals/` that records:

- source branch and PR;
- source behavior or control being considered;
- decision: `adopt`, `adapt`, `defer`, or `reject`;
- canonical destination in `feature/knowledge-j`;
- duplicated or superseded implementation removed or avoided;
- safety, credit, accessibility, and maintenance implications;
- verification that proves the decision was implemented correctly.

The ledger is the guarantee that the family was studied without requiring all
of it to survive as code.

## Stage 1: Create the Composite Evals

### 1.1 Extend J rather than creating a fourth parallel framework

Treat the current J files as canonical:

```text
.agents/evals/portfolio-production-readiness.json
.agents/evals/knowledge-bank-development.json
.agents/evals/blind-spot-readiness.json
docs/evals/
scripts/check-portfolio-evals.mjs
scripts/check-knowledge-bank-evals.mjs
scripts/check-blind-spot-evals.mjs
scripts/score-*-eval-run.mjs
scripts/tests/*-evals.test.mjs
```

Consolidate imported behavior into these contracts and runners. Do not retain
multiple scoring engines for the same question. Compatibility aliases are
acceptable temporarily, but the root `package.json` must expose one obvious
canonical command for each suite.

### 1.2 Define four evaluation profiles

1. **Knowledge development**
   - Can an intake fragment become source-associated, decomposed, bounded,
     corrected, researched, and retained without silent loss?
   - Passing this profile does not imply website publication.
2. **Application share**
   - Can a hiring reader identify Jamie's target role, actions, useful results,
     evidence, resume, and contact path quickly and accurately?
3. **Production launch**
   - Does the exact approved candidate pass deployment, indexing, routing,
     runtime, accessibility, rollback, and human approval gates?
4. **Blind-spot stewardship**
   - Are missing external outcomes, role corroboration, visual rights,
     survivorship bias, current-work evidence, hiring comprehension, mosaic
     privacy, and evaluation overfitting represented honestly and actionably?

Application-share eligibility must never be described as production approval.
Blind-spot governance must never be described as closure of the underlying gap.

### 1.3 Use explicit grader roles

Every criterion must declare its grader and admissible evidence:

- **Deterministic grader:** schemas, hashes, exact sets, file and route facts,
  DOM facts, HTTP behavior, links, build output, and mutation tests.
- **Browser grader:** visible rendered behavior across supported routes and
  viewports, keyboard operation, focus, overflow, contrast, media, and errors.
- **Independent LLM holdout:** clarity, voice, reader burden, evidence quality,
  Chad's lens, Margaret Morse lens, Warren Sack lens, and bounded editorial
  judgment. The holdout must not author the patch or receive its intent.
- **Human approver or participant:** exact public claims, collaborator-sensitive
  material, consent, rights, resume/contact approval, genuine target-reader
  response, and production cutover.

An unavailable observation is `not_observed` or `pending-human-review`, never a
pass. An agent may prepare a protocol for a human-only criterion but may not
complete it.

### 1.4 Bind every run to immutable inputs

Every scored run must contain:

- candidate commit SHA or deterministic candidate fingerprint;
- evaluation-contract version and fingerprint;
- profile and evaluator identity;
- admissible evidence bundle fingerprint;
- per-criterion score, pass state, evidence, findings, and confidence;
- unresolved blockers and next action;
- whether the evaluator authored or modified the candidate;
- final state such as `continue`, `threshold_met`, or `human_blocked`.

Changing the public candidate, rubric, relevant knowledge records, exact-route
manifest, or evidence bundle invalidates prior approval. Do not let a stale
scorecard coexist with a changed candidate.

### 1.5 Preserve hard gates and profile thresholds

Use a 0-4 scale for semantic criteria, with weighted scores only after hard
gates pass.

Recommended composite thresholds:

- knowledge-development weighted score: at least `0.85`;
- application-share weighted score: at least `0.80`;
- production-launch weighted score: at least `0.90`;
- every blocking criterion: at least `3/4`;
- every nonblocking criterion: at least `2/4`;
- required specialist lenses: at least their declared criterion minimum;
- final semantic confirmation: two independent judgments against the unchanged
  candidate;
- final recursive confirmation: two consecutive complete passing rounds with
  no content change;
- production: Jamie's approval of the exact commit and indexing state.

Weighted strength must never compensate for a failed safety, provenance,
credit, accessibility, runtime, or approval gate.

### 1.6 Preserve the named lenses without impersonation

The composite must retain:

- **Chad's lens:** Jamie is visible as the actor; the action, purpose, useful
  result, evidence, and collective boundary are legible without apology or
  inflation.
- **Margaret Morse lens:** one compact threshold preserves embodied, artistic,
  relational, spatial, hospitable, participatory, and media-aware intelligence.
- **Warren Sack lens:** the portfolio demonstrates a recurring movement from
  observing relationships through modeling or prototyping, interface or shared
  form, situated use, learning, revision, documentation, and handoff.

These are contemporary editorial criteria informed by historical records. They
are not current professor-authored rubrics, testimonials, or endorsements.

### 1.7 Add adversarial and mutation coverage

At minimum, tests must reject:

- memory presented as independent corroboration;
- recommendation presented as appropriation, appropriation as receipt, or
  proposal as completed delivery;
- project-account posts silently assigned to Jamie individually;
- outbound mentions counted as incoming stakeholder engagement;
- social counters converted into reach, adoption, endorsement, or impact;
- source metadata converted into article support without close reading;
- collective or institutional outcomes converted into sole causality;
- historical status rendered as current status;
- `not recovered` converted into `did not exist`;
- private locators, authentication identity, credentials, or protected prose
  entering committed or compiled output;
- denial or caveat wording that accidentally satisfies a positive role claim;
- synchronized edits to a policy and editable checksum that bypass review;
- hidden metadata, summaries, PDF text, or shared renderers bypassing exact-route
  projection controls;
- visual custody treated as publication permission;
- an agent or simulated reader counted as required human evidence.

## Stage 2: Build the Composite System

### 2.1 Build the knowledge workbench

Adapt K's lifecycle capabilities into J's existing knowledge model. The target
flow is:

```text
lead -> source -> atomic observation -> candidate claim -> research task
     -> promotion/correction/hold/rejection decision -> canonical claim
     -> editorial brief -> exact public surface manifest -> composed page
```

Add or consolidate commands with these responsibilities:

```text
knowledge:intake             append a public-safe immutable capture receipt
check:knowledge-lifecycle    validate graph, maturity, decisions, and boundaries
report:knowledge-lifecycle   create an ignored or public-safe maintenance report
query:knowledge-lifecycle    retrieve a bounded editorial/research palette
```

Required behavior:

- intake may begin `unassigned` when the project is unknown;
- duplicate leads must point to the retained item rather than disappear;
- mutable triage and research state must not rewrite immutable capture facts;
- observations are proposition-level and carry source locators and limitations;
- candidate maturity and projection eligibility are separate states;
- `research`, `hold`, `reject`, `correct`, and `retire` are valid outcomes;
- superseded decisions remain inspectable rather than being silently erased;
- public-safe queries return only records authorized for the exact destination;
- research tasks and protected media never leak through publication-safe modes;
- visual discoveries return to intake and require separate identity, date,
  place, meaning, rights, and consent review;
- readable generated maps must fail when they drift from canonical records.

Do not add a database, CMS, public search, archive browser, or internal-tool UI.

### 2.2 Add fail-closed integrity controls

Adapt the strongest controls from B and I:

- classify every project as individual, collective, or mixed;
- classify each Jamie-attributed claim in mixed work;
- maintain exact-set coverage for public claims and approved proof records;
- map each public route to every source file capable of rendering a projection;
- include shared renderers, metadata, MDX, generated prose, static assets, and
  resume text in projection reachability;
- bind reviewed policy baselines to immutable Git objects or an equivalently
  non-self-updating review artifact;
- add a dated mosaic-privacy review for combinations of individually safe data;
- govern route-level argument, audience, action, claim budget, and exclusions;
- fail on silent deletion, reassignment, weakened guardrails, held/use-now
  drift, or ungoverned public copy.

Fingerprint-report commands must not automatically rewrite the independent
baseline they are meant to test.

### 2.3 Improve the public portfolio only where the evals demonstrate need

Adopt H, D, and K's strongest compositional lessons:

- keep the first hiring path short and role-specific;
- lead case studies with Jamie's bounded role, action, and useful result;
- make critical proof inspectable without requiring readers to understand the
  archive or governance system;
- compress repeated qualification panels while retaining complete source
  boundaries in the knowledge layer;
- keep unlike projects unlike while making the recurring operating method
  visible;
- use real approved visual artifacts where they reduce reader burden;
- give every image provenance, rights status, alt text, caption, and an explicit
  statement of what it does not establish;
- verify the smallest supported mobile viewport rather than hiding overflow;
- keep citations quiet but complete and navigable;
- omit unresolved or unapproved public material instead of publishing workflow
  narration.

Do not add every mature knowledge-bank claim to the website. A stronger bank
should increase editorial choice, not page length.

### 2.4 Preserve application and release mechanics

Adapt F, H, M, and N's release work:

- one root `npm run check` must run citation, eval, schema, public-safety,
  typecheck, lint, build, knowledge-bank, and route gates;
- staging preflight must remain explicitly `noindex`;
- production preflight must require explicit production environment and
  indexing values;
- verify canonical URLs, sitemap, robots, health, redirects, resume HTML, and
  resume-PDF noindex behavior;
- build and smoke-test the production Docker image as a non-root user;
- preserve rollback instructions and prior routing state;
- add or consolidate GitHub Actions CI using Node 26 and `npm ci`;
- keep P0 application blockers, P1 production blockers, and P2 refinements
  separate;
- never mark production complete from a local production-mode build alone.

Update `README.md`, `AGENTS.md`, and relevant docs when canonical commands or
responsibilities change. Remove obsolete parallel command documentation.

## Stage 3: Hill Climb Recursively

Recursive improvement is a bounded experimental protocol, not permission to
polish indefinitely.

### 3.1 Freeze the run

Before each cycle:

1. record the rubric fingerprint;
2. record the candidate SHA or fingerprint;
3. record the profile and evidence bundle;
4. run every deterministic gate;
5. collect fresh browser observations where the public surface changed;
6. obtain independent semantic judgments for affected criteria;
7. establish the baseline score and blockers before editing.

### 3.2 Choose one bounded move

Select in this order:

1. highest-severity failed hard gate;
2. highest-weight blocking criterion below threshold;
3. largest weighted quality gap;
4. highest-value unresolved claim for which decisive evidence is available.

Make the smallest coherent change likely to improve that target. Name the
adjacent qualities that must not regress: truth, credit, privacy, accessibility,
voice, evidence depth, route stability, and maintainability.

### 3.3 Verify the candidate

For every accepted iteration:

- run focused tests first;
- run all affected mutation tests;
- regenerate only derived artifacts whose source changed;
- run the complete suite at milestone commits;
- repeat browser observations for affected routes and viewports;
- use a fresh holdout that did not make the patch;
- compare against the baseline without telling the holdout which is newer;
- reject the change if a hard gate regresses or the target does not improve;
- preserve a public-safe rejected-run record when it teaches the system
  something consequential.

Use at minimum:

```bash
npm run evals:portfolio
npm run test:portfolio-evals
npm run evals:knowledge-bank
npm run test:knowledge-bank-evals
npm run evals:blind-spots
npm run test:blind-spot-evals
npm run check
npm run preflight:staging
npm run preflight:production
git diff --check
```

Add canonical commands for the integrated lifecycle, browser, professor-lens,
visual-evidence, and release checks to this sequence as they are implemented.

### 3.4 Stop responsibly

Stop when any of these is true:

- the profile threshold is met in two consecutive complete runs against an
  unchanged candidate;
- the next required evidence is human memory, permission, consent,
  corroboration, target-reader response, production access, or an unavailable
  source;
- the configured iteration budget is reached;
- two consecutive rounds produce no meaningful improvement;
- further change would increase complexity or reading burden without improving
  a criterion.

Use `threshold_met` only for the evaluated profile. Use `human_blocked` when
the automated work is complete but a human-only gate remains. Do not weaken a
criterion or edit the rubric during a run to manufacture a stop.

## Stage 4: Prepare and Create the Pull Request

The pull request head is `feature/knowledge-j`. The apply target is `develop`.

### 4.1 Final repository review

Confirm:

```bash
git status --short --branch
git fetch --prune origin
git log --oneline origin/develop..HEAD
git diff --stat origin/develop...HEAD
git diff --check origin/develop...HEAD
```

Review the complete public diff for:

- private paths, protected prose, credentials, or authentication metadata;
- unapproved names, quotations, images, or contact information;
- unsupported metrics, causal claims, authorship, current-status language, or
  claims of endorsement, adoption, or impact;
- public TODOs or internal workflow narration;
- duplicated eval frameworks, stale generated files, and contradictory docs;
- accidental public routes or proof-bank interfaces;
- oversized committed captures that should be minimized or represented by a
  reproducible public-safe derivation.

### 4.2 Required checks

Run under Node 26:

```bash
nvm use
npm ci
npm run check
npm run preflight:staging
npm run preflight:production
```

Also run the integrated browser, Docker/runtime, visual-proof, and exact-PDF
checks introduced by the composite. Record what was actually observed. Do not
claim a check ran if it did not.

### 4.3 Commit and push

Keep commits reviewable by concern. A recommended sequence is:

1. source-family decision ledger and composite contracts;
2. eval runners, schemas, scoring, and mutation tests;
3. knowledge intake, query, report, correction, and manifest tools;
4. fail-closed credit, projection, and privacy controls;
5. bounded website improvements and approved evidence;
6. CI, browser, Docker, release, and rollback verification;
7. final exact-candidate run records and documentation.

Push without rewriting the shared branch:

```bash
git push origin feature/knowledge-j
```

Do not force-push unless Jamie explicitly authorizes history rewriting.

### 4.4 Create or update the PR

Check whether the branch already has a pull request:

```bash
gh pr list --head feature/knowledge-j --base develop
```

If none exists, create it:

```bash
gh pr create \
  --repo openhouse/jamieburk.art \
  --base develop \
  --head feature/knowledge-j \
  --title "feature/knowledge-j" \
  --body-file docs/evals/feature-knowledge-j-pull-request.md
```

If one exists, update that PR rather than creating a duplicate.

The PR body must include:

1. the user and hiring problem being solved;
2. the composite architecture and what was deliberately consolidated;
3. the A-N decision ledger summary;
4. material knowledge-bank capabilities added;
5. bounded website changes and their proof basis;
6. baseline, iteration, rejection, and final eval results;
7. candidate and rubric fingerprints;
8. deterministic, browser, LLM-holdout, and human evidence kept separate;
9. public-safety, collective-credit, rights, and causality boundaries;
10. application-share status and production-launch status as separate decisions;
11. exact commands and results for checks, browser QA, Docker smoke, and
    preflights;
12. remaining human gates and the next responsible action;
13. an explicit statement that production was not deployed unless it actually
    was authorized and verified.

Do not merge until the exact final candidate, public claims, resume, contact
path, visual evidence, and production/indexing decision receive the approvals
required by their profiles.

## Definition of Done

The integration is complete when:

- the branch descends from the current `feature/knowledge-j` state;
- every A-N source branch has a recorded integration disposition;
- one canonical eval architecture replaces parallel duplication;
- knowledge-development, application-share, production-launch, and blind-spot
  profiles are executable and documented;
- deterministic, browser, independent-LLM, and human evidence are separated;
- candidate and contract changes invalidate stale judgments;
- append-safe intake, correction, retirement, query, report, and exact-surface
  selection work without adding a public knowledge-bank interface;
- collective-credit, projection-reachability, mosaic-privacy, and adversarial
  mutation controls fail closed;
- public pages remain concise, role-specific, source-backed, accessible, and
  selective;
- all automated checks pass against the final candidate;
- two unchanged qualifying rounds satisfy the relevant automated stop rule;
- human-only gates remain honestly open until observed;
- the PR `feature/knowledge-j` targets `develop` and contains a complete,
  newcomer-readable account of the work.

The aim is not to preserve fourteen implementations. It is to preserve their
best knowledge: a portfolio that can become clearer without becoming thinner,
and a knowledge system that can become deeper without overwhelming or
endangering the public surface.
