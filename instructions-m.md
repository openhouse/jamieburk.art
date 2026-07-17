# Feature Evals Composite Integration Instructions

## Purpose

Build one coherent evaluation and knowledge-development system from the strongest
ideas in the frozen `feature/evals-A` through `feature/evals-N` pull-request
family.

The result must:

- start from the current `feature/knowledge-m` branch;
- preserve the current M knowledge-bank architecture and public-safety rules;
- create a consolidated set of executable evals;
- use those evals to improve the knowledge bank and public portfolio;
- build and verify the complete application;
- hill climb recursively without fabricating evidence or human approval; and
- open a pull request named `feature/knowledge-m` with apply target `develop`.

This is an integration assignment, not a request to merge fourteen branches.
Treat every `feature/evals-*` branch as a read-only design reference.

## Repository And Branch

Repository:

- <https://github.com/openhouse/jamieburk.art>

Working branch:

- `feature/knowledge-m`

Apply target:

- `develop`

Lineage anchor:

- `feature/knowledge-m` was created from `feature/evals-M` at
  `289dd4499eb3e7b78bc16b380a02ac180dca35bb`.

Begin from the current remote head, which may contain this instruction file:

```bash
git fetch origin
git switch feature/knowledge-m
git pull --ff-only origin feature/knowledge-m
git status --short --branch
git merge-base --is-ancestor 289dd4499eb3e7b78bc16b380a02ac180dca35bb HEAD
```

Do not rewrite, rebase, force-push, close, merge, or otherwise modify the
`feature/evals-*` branches or pull requests. They are frozen for comparative
study.

## Repository Orientation

- Canonical application: `apps/www`
- Runtime: Node 26 and npm workspaces
- Framework: Next.js App Router, React, TypeScript, MDX, Tailwind, daisyUI
- Canonical public-safe knowledge records:
  `apps/www/src/data/knowledge-bank/records.ts`
- Knowledge schemas:
  `apps/www/src/data/knowledge-bank/schema.ts`
- Public proof projection:
  `apps/www/src/data/proofs.ts`
- Human-readable knowledge records: `docs/knowledge-bank/`
- Current eval controls and protocols: `docs/qa/`
- Current deterministic checkers: `scripts/check-*.mjs`
- Canonical full gate: `npm run check`
- Pull-request CI: `.github/workflows/portfolio-readiness.yml`

Read `AGENTS.md` before editing. Its public-safety, Chad-lens, knowledge-bank,
scope, deployment, and voice rules are binding.

## Non-Negotiable Boundaries

1. Do not add a public `/proofs`, `/knowledge-bank`, or
   `/public-claims` route.
2. Do not commit private archive paths, raw transcripts, correspondence,
   participant records, stakeholder lists, credentials, analytics, legal
   review, private contact data, or unapproved media.
3. Use opaque protected locators for private evidence.
4. Keep source existence, Jamie's individual role, collective accomplishment,
   institutional action, use, outcome, transfer, and causality as separate
   propositions.
5. Never convert social-account mentions, post volume, follower counts, or
   engagement into endorsement, adoption, individual authorship, or impact.
6. Never convert a planned or simulated human review into completed human
   evidence.
7. Never let an authoring or optimizing agent certify its own editorial quality.
8. A mature claim does not have to appear on the website.
9. Do not create a second competing knowledge bank or a second live eval
   control plane.
10. Do not bulk-merge or cherry-pick an entire `feature/evals-*` branch.
    Port narrowly, preserving the current M architecture.
11. Do not expand the public site merely to improve an eval score.
12. Production deployment and indexing remain human decisions for Jamie.

## Frozen PR Reference Map

Read the current PR body, commits, key rubrics, and relevant implementation
before porting a capability.

| Branch | Pull request | Capability to preserve |
| --- | --- | --- |
| `feature/evals-A` | [#220](https://github.com/openhouse/jamieburk.art/pull/220) | Integrated launch, knowledge, and portfolio-effectiveness loop; exact-SHA release evidence; maintainability |
| `feature/evals-B` | [#212](https://github.com/openhouse/jamieburk.art/pull/212) | Blind-spot controls; mosaic privacy; countability bias; evaluator independence; action-conversion stop rule |
| `feature/evals-C` | [#221](https://github.com/openhouse/jamieburk.art/pull/221) | Compact multi-audience judgment profiles for hiring, safety, Chad, Morse, and Sack |
| `feature/evals-D` | [#216](https://github.com/openhouse/jamieburk.art/pull/216) | Inspectable iteration history; accessibility; archive bias; consequence, collaboration, maintenance, and release controls |
| `feature/evals-E` | [#211](https://github.com/openhouse/jamieburk.art/pull/211) | Browser and blind-reader scenarios; application versus production thresholds; explicit human gates |
| `feature/evals-F` | [#210](https://github.com/openhouse/jamieburk.art/pull/210) | Real-job comparison; unfamiliar-reader holdouts; contribution provenance; output/outcome/causality separation |
| `feature/evals-G` | [#222](https://github.com/openhouse/jamieburk.art/pull/222) | Rich knowledge-development lifecycle; atomic observations; correction history; photo feedback; future offer |
| `feature/evals-H` | [#223](https://github.com/openhouse/jamieburk.art/pull/223) | Adversarial mutation tests; frozen review locks; independent holdouts; source-scope controls |
| `feature/evals-I` | [#219](https://github.com/openhouse/jamieburk.art/pull/219) | Correction readiness; policy fingerprints; underclaiming review; maintenance and drift visibility |
| `feature/evals-J` | [#209](https://github.com/openhouse/jamieburk.art/pull/209) | Optimizer/grader separation; exact candidate hashes; run receipts; consecutive-pass and human-blocked decisions |
| `feature/evals-K` | [#217](https://github.com/openhouse/jamieburk.art/pull/217) | Append-safe intake, query, report, validation, and editorial-palette tooling |
| `feature/evals-L` | [#213](https://github.com/openhouse/jamieburk.art/pull/213) | Specialized survivorship, role, outcome, visual-proof, present-tense, and release evaluators |
| `feature/evals-M` | [#215](https://github.com/openhouse/jamieburk.art/pull/215) | Canonical base; paired evidence/development records; lean deterministic full check and CI |
| `feature/evals-N` | [#214](https://github.com/openhouse/jamieburk.art/pull/214) | Human hiring-reader loop; hands-on launch QA; application/production separation; recent-capability and transfer maps |

Use commands such as these for read-only comparison:

```bash
git fetch origin '+refs/heads/feature/evals-*:refs/remotes/origin/feature/evals-*'
git diff --stat origin/develop...origin/feature/evals-K
git diff --name-only origin/develop...origin/feature/evals-K
git show origin/feature/evals-K:evals/knowledge-lifecycle/rubric.json
gh pr view 217
```

## Composite Architecture

### Preserve The M Base

Keep these decisions from `feature/evals-M`:

- `apps/www/src/data/knowledge-bank/schema.ts` remains the canonical schema.
- `records.ts` remains the canonical assembled knowledge-bank export.
- Evidence accession and knowledge development remain separate modules.
- Public citation generation remains deterministic and redacted.
- Existing command names remain stable.
- `npm run check` remains the single required local and CI gate.
- The website remains a selective projection from the bank.

Do not replace the M model with another branch's complete directory tree.

### One Eval Control Plane

Use `docs/qa/` as the canonical home for rubric configuration, human protocols,
and run records because it already exists on the base branch.

Recommended structure:

```text
docs/qa/
  eval-control-plane-M.json
  knowledge-lifecycle-M.json
  portfolio-readiness-M.json
  blind-spot-readiness-M.json
  professor-lenses-M.json
  human-validation-M.md
  application-outcomes-M.md
  launch-qa-M.md
  runs/
    README.md
    <dated exact-candidate receipts>
```

Do not also maintain independent live rubrics under `.agents/evals/`,
`evals/`, and `docs/evals/`. Reference frozen implementations as design
sources, but normalize the composite into `docs/qa/`.

### Checker And Tool Surface

Preserve the existing checkers and add only the missing capabilities:

```text
scripts/check-knowledge-lifecycle.mjs
scripts/check-chad-lens.mjs
scripts/check-portfolio-readiness.mjs
scripts/check-professor-lenses.mjs
scripts/check-blind-spots.mjs          # new
scripts/check-eval-integrity.mjs       # new
scripts/intake-knowledge-lead.mjs      # new, from K's operator model
scripts/query-knowledge-bank.mjs       # new
scripts/report-knowledge-lifecycle.mjs # new
scripts/lib/eval-integrity.mjs         # new shared validation
scripts/tests/eval-integrity.test.mjs  # new mutation tests
scripts/tests/knowledge-lifecycle.test.mjs
scripts/tests/blind-spots.test.mjs
```

Add package commands without renaming current commands:

```json
{
  "check:blind-spots": "node scripts/check-blind-spots.mjs",
  "check:eval-integrity": "node scripts/check-eval-integrity.mjs",
  "test:evals": "node --test scripts/tests/knowledge-lifecycle.test.mjs scripts/tests/blind-spots.test.mjs scripts/tests/eval-integrity.test.mjs",
  "knowledge:intake": "node scripts/intake-knowledge-lead.mjs",
  "knowledge:query": "node scripts/query-knowledge-bank.mjs",
  "report:knowledge-lifecycle": "node scripts/report-knowledge-lifecycle.mjs"
}
```

Wire `check:blind-spots`, `check:eval-integrity`, and the focused eval tests
into both `check:evals` and `check`.

Interactive intake and query commands must not run during CI.

## Required Eval Families

### 1. Knowledge Lifecycle

Consolidate overlapping branch criteria into these required contracts:

| ID | Contract |
| --- | --- |
| `KB-001` | Every intake has a stable ID, visibility, status, disposition, and linked records |
| `KB-002` | Sources preserve provenance, rights, public-use boundaries, and protected locators |
| `KB-003` | Source readings decompose evidence into atomic located assertions and explicit limitations |
| `KB-004` | Candidate maturity, promotion, rejection, and hold states remain internally consistent |
| `KB-005` | Jamie's role, collective credit, institutional action, use, outcome, and causality stay distinct |
| `KB-006` | Contradictions, corrections, negative evidence, and unresolved questions remain traversable |
| `KB-007` | Editorial selection remains independent from evidence maturity and reversible by surface |
| `KB-008` | Archive population and denominator claims expose retrieval limits, deletions, and survivorship bias |
| `KB-009` | Visual discovery creates research leads while rights, consent, caption, and evidentiary use remain separate |
| `KB-010` | Maintenance reports expose stale reviews, dead links, policy drift, duplicate IDs, and orphaned records |

### 2. Portfolio Readiness

Separate application-share readiness from production-launch readiness.

| ID | Contract |
| --- | --- |
| `PR-001` | An unfamiliar reader can identify target role, value, three proofs, and next action |
| `PR-002` | Jamie is visible as actor; the work's purpose and usable end are concise and bounded |
| `PR-003` | Lead claims and metrics are inspectably source-backed |
| `PR-004` | Output, observed use, outcome, attribution boundary, and transfer are distinct |
| `PR-005` | Historical depth resolves into current capability and a future-facing offer |
| `PR-006` | Rights-cleared visual proof reduces reading burden without becoming decorative evidence |
| `PR-007` | Resume, contact, referral, LinkedIn, GitHub, and CTA destinations are accurate |
| `PR-008` | Keyboard, focus, screen reader, mobile, zoom, contrast, metadata, and link behavior work |
| `PR-009` | Build, runtime, staging, production cutover, rollback, robots, sitemap, and exact SHA are verifiable |
| `PR-010` | A factual stopping rule prevents P2 polish from delaying applications |

### 3. Blind-Spot And External-Validity Controls

These may pass as control protocols while their human outcomes remain pending.

| ID | Contract |
| --- | --- |
| `BS-001` | Independent hiring-reader comprehension is measured only from real dated sessions |
| `BS-002` | Individual role and collective credit have collaborator corroboration or an explicit hold |
| `BS-003` | Enumerable archive traces do not crowd out offline, relational, maintenance, or implementation work |
| `BS-004` | Whole-graph review detects mosaic privacy risk beyond record-level safety |
| `BS-005` | Author, optimizer, deterministic checker, model grader, and human reviewer remain distinct |
| `BS-006` | Application and referral outcomes are recorded privately and never attributed to the site without evidence |
| `BS-007` | Rubric, evidence, policy, and public-projection drift remain visible |
| `BS-008` | Real job descriptions reveal role-specific proof strengths and gaps without rewriting employer needs |

### 4. Existing Lenses

Preserve and strengthen the existing:

- Chad lens;
- Prof. Margaret Morse lens; and
- Prof. Warren Sack lens.

These are editorial frameworks, not current quotations, endorsements, or
testimonials from Chad or either professor. Their protected source material must
remain outside the public repository.

### 5. Eval Integrity

Implement the anti-gaming strengths from H, I, and J:

- Freeze and hash each rubric before a hill-climb run.
- Bind every receipt to the exact candidate commit and content hash.
- Record checker version, rubric hash, evidence snapshot hash, command, result,
  timestamp, and reviewer class.
- Reset model and human judgments after a material candidate change.
- Require two consecutive passing model judgments without content changes where
  a model judgment is used.
- Do not let model scores override deterministic failures.
- Do not let deterministic checks claim editorial or human success.
- Preserve `stop_human_blocked`, `stop_external_evidence_blocked`,
  `stop_threshold_met`, and `continue` as distinct decisions.
- Mutation-test semantic reversals, not only missing tokens.

Required mutation attacks include:

1. project-level evidence silently promoted to Jamie-role evidence;
2. a pending human review changed to completed;
3. a protected URL or locator exposed publicly;
4. a social population described as a platform-complete export;
5. a mention described as endorsement or impact;
6. a mature claim automatically activated on the website;
7. a rights-needed image described as cleared;
8. a proposal described as delivered work;
9. an institutional sequence described as sole causation;
10. a stale rubric hash accepted after material edits;
11. an authoring agent counted as an independent judge;
12. source volume used as a proxy for professional importance.

Each mutation must make the targeted criterion fail.

## Human Evidence Protocols

Create protocols, not synthetic results.

### Hiring Readers

Use at least three unfamiliar readers:

- a hiring manager in technical project management, product operations, or
  implementation;
- a recruiter or experienced referrer; and
- a civic, public-interest, or public-sector delivery leader.

After 30 seconds ask:

1. What role is Jamie seeking?
2. What does Jamie help a team do?
3. What would you click next?

After two minutes ask:

1. Which three proofs do you remember?
2. What did Jamie personally do?
3. What became usable, changed, or easier to continue?
4. What feels private, overstated, broken, confusing, or hard to trust?
5. Would you interview, refer, continue, or stop?

Store only approved, bounded, non-identifying results.

### Real Job Descriptions

Evaluate at least five dated real postings. Record:

- role and organization;
- required capabilities;
- strongest matching proof;
- material proof gap;
- whether the gap blocks application; and
- the next bounded action.

Job archetypes and agent-authored sample postings do not count.

### Collaborator Review

Keep project existence, individual contribution, observed outcome, collective
context, limitation, and permission to paraphrase or attribute as separate
fields. Silence is not approval.

### Human Launch QA

The exact candidate must receive hands-on review for:

- canonical routes and redirects;
- keyboard navigation, focus, headings, link purpose, and citations;
- VoiceOver or equivalent screen-reader use;
- 320 px and 375 px mobile layouts;
- desktop layout, 200 percent zoom, text reflow, contrast, and reduced motion;
- resume PDF text, links, clipping, phone policy, and download behavior;
- health, TLS, `www`, canonical URLs, sitemap, robots, and rollback.

Human-gated criteria must remain `pending-human-review` until the work occurs.

## Operator Tooling

Port K's useful interface ideas into the M data model.

`knowledge:intake` must:

- create a stable intake record without exposing protected material;
- support URL, memory, claim, artifact, repository, and photo-lead kinds;
- reject duplicate IDs and unsafe protected URLs;
- be append-safe; and
- never promote or project automatically.

`knowledge:query` must support bounded filters for:

- project;
- source;
- candidate status;
- claim status;
- visibility;
- evidence relationship;
- open research inquiry;
- rights or consent state;
- projection surface; and
- stale review date.

`report:knowledge-lifecycle` must summarize:

- intake and disposition counts;
- unprocessed and deferred items;
- orphaned sources or candidates;
- promotion and hold counts;
- unresolved contradictions;
- public claims without adequate support;
- mature but unselected claims;
- rights and consent holds;
- stale records; and
- open human evidence gates.

Reports must omit protected locators and private excerpts.

## Implementation Stages

### Stage 0: Establish The Baseline

```bash
nvm install 26
nvm use 26
npm ci
npm run check
git status --short
```

Record the exact starting SHA and every baseline failure. Do not describe a
pre-existing failure as introduced by the composite.

### Stage 1: Inventory Without Merging

For each frozen PR:

1. read its current PR body;
2. inspect its rubric and checker;
3. inspect mutation tests and run receipts;
4. identify the smallest portable capability;
5. record destination, adaptation needed, duplication risk, and decision; and
6. mark it `port`, `adapt`, `reference-only`, or `reject`.

Reject wholesale fixture ingestion, duplicate control planes, stale generated
records, and branch-specific architecture that conflicts with M.

### Stage 2: Add Failing Eval Contracts

Add the consolidated rubric and tests before changing content or lifecycle data.

Run each focused checker and preserve the red baseline. A new eval that passes
before the missing capability is implemented is not a valid regression test.

Commit suggestion:

`test(evals): define composite readiness contracts`

### Stage 3: Implement Eval Integrity And Operator Tools

Implement:

- one canonical rubric loader;
- exact-candidate run receipts;
- policy fingerprints and material-change resets;
- mutation tests;
- intake, query, and report commands; and
- control-plane validation.

Commit suggestion:

`feat(evals): add governed composite evaluation runtime`

### Stage 4: Hill Climb The Knowledge Bank

For each failed knowledge criterion:

1. identify the exact missing evidence or lifecycle relationship;
2. make the smallest coherent schema, source, reading, candidate, claim,
   correction, inquiry, promotion, or editorial change;
3. run the focused checker;
4. run its mutation tests;
5. regenerate the public registry when canonical records change;
6. confirm redaction and public safety; and
7. rerun the full knowledge and citation gates.

Do not strengthen public copy until the stronger claim exists in the bank with
support, boundaries, anti-claims, status, and surface selection.

Commit suggestion:

`feat(knowledge): satisfy composite lifecycle contracts`

### Stage 5: Hill Climb The Public Portfolio

Only change the site where a failed criterion identifies a real reader problem
and the knowledge bank supports the repair.

Optimize in this order:

1. factual and privacy safety;
2. Jamie's role, action, and usable outcome;
3. collective credit and causality;
4. hiring comprehension and reader effort;
5. current capability and next action;
6. accessibility and responsive use;
7. visual proof and finish.

Prefer omission over internal workflow language or placeholders.

Commit suggestion:

`feat(portfolio): resolve evidence-backed readiness gaps`

### Stage 6: Run Independent And Adversarial Evaluation

For every candidate:

1. freeze rubric and candidate hashes;
2. run deterministic checks;
3. run mutations;
4. run a read-only model grader if the criterion requires judgment;
5. record unresolved human and external gates without filling them in;
6. make the smallest repair;
7. rerun focused and full gates; and
8. require two consecutive model passes without content changes before stopping.

Stop when:

- all deterministic blockers pass;
- mutations fail as intended;
- model-gated criteria meet their frozen threshold twice;
- open human/external gates are accurately labeled;
- application-share P0 blockers are gone;
- production P1 blockers are either gone or explicitly human-blocked; and
- remaining P2 work does not justify delaying applications.

### Stage 7: Build And Browser QA

Run the exact repository gates:

```bash
npm run check:citations
npm run test:citations
npm run knowledge-bank
npm run check:knowledge-lifecycle
npm run check:chad-lens
npm run check:portfolio-readiness
npm run check:professor-lenses
npm run check:blind-spots
npm run check:eval-integrity
npm run test:evals
npm run public-safety
npm run check:routes
npm run typecheck
npm run lint
npm run build
npm run check
```

Run environment preflights:

```bash
npm run preflight:staging
npm run preflight:production
```

Production preflight verifies an indexable configuration. It does not authorize
deployment or indexing.

If Docker is available, build and run the image, then verify:

- `PORT=3000`;
- `/api/health`;
- canonical routes;
- static assets;
- resume PDF;
- robots;
- sitemap; and
- graceful startup and shutdown.

Use Playwright or equivalent browser automation for desktop and mobile
screenshots, console errors, overflow, focus, and route smoke tests. Record
screenshots only when they are public-safe and useful for review.

### Stage 8: Review The Final Diff

Before committing the final candidate:

```bash
git diff --check
git status --short
git diff --stat origin/develop...HEAD
git log --oneline origin/develop..HEAD
```

Confirm:

- no protected source path or private excerpt is present;
- no unrelated user work was staged;
- no generated registry is stale;
- no eval can pass by token presence alone;
- no human or external result was fabricated;
- no duplicate eval framework was added; and
- no public route exposes the knowledge bank.

## Pull Request

Push the branch without force:

```bash
git push -u origin feature/knowledge-m
```

Create the pull request:

```bash
gh pr create \
  --base develop \
  --head feature/knowledge-m \
  --title "feature/knowledge-m" \
  --body-file /tmp/feature-knowledge-m-pr.md
```

The PR body must include:

1. objective and branch lineage;
2. capabilities integrated from each frozen PR;
3. architecture decisions and rejected duplications;
4. knowledge-bank and website changes;
5. red-to-green eval table;
6. mutation-test results;
7. exact candidate SHA and rubric hashes;
8. automated checks and browser/Docker evidence;
9. open human, rights, collaborator, deployment, and indexing gates;
10. public-safety boundaries;
11. screenshots where useful; and
12. rollback or revert notes.

The PR apply target must be `develop`.

Do not merge the pull request. Leave the exact reviewed candidate available for
Jamie and human reviewers.

## Required Deliverables

- Consolidated eval rubrics and deterministic checkers.
- Red-green tests and semantic mutation tests.
- Exact-candidate run receipts.
- Blind-spot and external-validity controls.
- Human hiring-reader, collaborator, application, and launch-QA protocols.
- Append-safe intake, query, and lifecycle-report tools.
- Knowledge-bank and public-site repairs required by the frozen evals.
- Updated CI running the canonical `npm run check`.
- A complete PR description and green GitHub checks.

## Definition Of Done

The assignment is complete only when:

- `feature/knowledge-m` is based on the current remote branch;
- every frozen PR has a recorded integration disposition;
- one canonical eval control plane exists;
- new evals were demonstrated red before repair and green afterward;
- semantic mutation tests reject adversarial reversals;
- the complete Node 26 `npm run check` passes;
- build and browser verification pass;
- public safety and citation redaction pass;
- human and external gates remain honestly pending where not performed;
- the branch is pushed without force;
- a pull request named `feature/knowledge-m` targets `develop`; and
- the PR remains unmerged for review.
