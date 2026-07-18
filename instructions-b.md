# Feature/Evals Composite Integration B - Coding Team Handoff

**Repository:** openhouse/jamieburk.art
**Starting branch:** feature/knowledge-b
**Expected starting commit:** 67fc30427e544199540f81d6b50cf94ef8101f47
**Working branch / PR head:** feature/knowledge-b
**Pull request base:** develop
**Canonical application:** apps/www
**Runtime:** Node 26, npm workspaces

## 0. Assignment

Start from the current state of origin/feature/knowledge-b. Integrate the strongest mechanisms from the frozen feature/evals-A through feature/evals-N branch family into one coherent, public-safe evaluation and recursive portfolio-improvement system.

The result must:

1. Test the truthfulness, usefulness, hiring clarity, and release readiness of the portfolio.
2. Distinguish machine facts, LLM judgments, human approvals, and external outcomes.
3. Recursively improve the Knowledge Bank and public portfolio without weakening evidence, credit, privacy, accessibility, or maintainability.
4. Preserve an auditable record of each evaluation round, including failed and superseded candidates.
5. Open a pull request from feature/knowledge-b to develop.

The feature/evals-* branches are frozen study material. Read them, but do not edit, merge, rebase, or use them as new working branches. Reimplement selected mechanisms against the current feature/knowledge-b architecture.

This is an integration pass, not a branch-volume contest. Prefer one authoritative implementation of each concept.

## 1. Governing principles

### The portfolio is a composed argument

The Knowledge Bank may hold much more material than the public site displays. Select public evidence according to audience and purpose. Do not automatically publish every mature claim, source, project, photograph, or artifact.

### Hard gates cannot be averaged away

A high aggregate score cannot excuse:

- an unsupported public claim;
- incorrect individual credit for collective work;
- a private path or protected artifact on a public surface;
- an inaccessible primary workflow;
- a missing or unapproved resume/contact route;
- a broken production build;
- a stale judgment about a different candidate commit;
- a human approval that has not occurred.

### Recursive improvement is evidence-seeking

Every iteration should improve the actual candidate. Do not weaken a rubric, remove a difficult test, relabel an unresolved state as passing, or rewrite history to raise a score.

### The means are part of the outcome

Preserve collective credit, uncertainty, privacy, participant rights, and public safety while improving hiring clarity. Make Jamie's contribution legible without appropriating collaborators' work.

### "Not measured" is a valid state

Human-reader comprehension, collaborator corroboration, media rights, application outcomes, and production approval are not deterministic facts. Represent them as not-yet-measured, scheduled, observed, passed, failed, or human-blocked. Never auto-pass them.

## 2. Start from the exact branch state

Do not begin on develop, main, or a feature/evals-* branch.

In a clean clone or isolated worktree:

~~~bash
git fetch origin --prune

git switch feature/knowledge-b 2>/dev/null || \
  git switch --track origin/feature/knowledge-b

git pull --ff-only origin feature/knowledge-b
git status --short
git branch --show-current
git rev-parse HEAD
~~~

Expected branch:

~~~text
feature/knowledge-b
~~~

Expected starting commit:

~~~text
67fc30427e544199540f81d6b50cf94ef8101f47
~~~

Expected worktree state: clean.

If the remote branch has legitimately advanced, record the new SHA and review its changes before proceeding. If the tree is dirty, stop and report it. Do not stash, reset, or discard another person's work.

Do not rebase feature/knowledge-b onto a newer develop during this assignment. The pull request will show the cumulative branch delta against develop.

## 3. Inspect the repository before editing

Read, at minimum:

~~~text
AGENTS.md
README.md
package.json
apps/www/package.json
apps/www/src/data/proofs.ts
apps/www/src/data/knowledge-bank/
evals/portfolio-claims/
evals/chad-lens/
evals/margaret-morse-lens/
evals/warren-sack-lens/
evals/knowledge-bank-lifecycle/
evals/portfolio-system-blind-spots/
scripts/
docs/knowledge-bank/
docs/evals/
.github/workflows/
~~~

Confirm paths rather than assuming they match this handoff exactly. Preserve established schemas and naming where they already express the intended concept.

The current branch already contains a substantial evaluation architecture. Extend it. Do not create:

- a second Knowledge Bank;
- a second claim schema;
- a duplicate proofs registry;
- a parallel public-safety scanner;
- another public route for raw claims;
- an eval that copies canonical evidence into its own data store.

## 4. Baseline before modification

Use the repository's Node version:

~~~bash
nvm install
nvm use
node --version
npm --version
npm ci
~~~

Run and save the baseline result:

~~~bash
npm run check
git status --short
~~~

If npm run check fails before your changes, record the exact command, failure, environment, and commit SHA before editing. Do not silently attribute a baseline failure to this integration.

The ordinary build and evaluation path must be offline and deterministic. Temporary failures at X, Facebook, Wayback, Google, a publisher, or another external service must not block npm run check.

## 5. What to learn from the frozen branch family

Study the family with read-only commands:

~~~bash
git log --oneline origin/develop..origin/feature/evals-H
git diff --stat origin/develop...origin/feature/evals-H
git show origin/feature/evals-H:path/to/file
~~~

Do not use git merge, git rebase, or wholesale git cherry-pick against these branches.

Integrate their distinctive strengths selectively:

| Branch | Mechanism to preserve |
| --- | --- |
| feature/evals-A | Portfolio-effectiveness model: reader validation, collaborator proof, operating sequences, recent practice, visuals, exact-SHA provenance, and maintainability. |
| feature/evals-B | Governance spine: exact claim-role classification, composition manifest, source balance, privacy review, and independent judge provenance. This is already the working foundation. |
| feature/evals-C | Explicit application-ready versus production-ready profiles; candidate and rubric fingerprints that invalidate stale judgments; fail-closed production checks. |
| feature/evals-D | Exact-commit QA, historical versioning, responsive-width checks, contrast/focus/citation checks, and source-decomposition ledgers. |
| feature/evals-E | Paired Knowledge Bank lifecycle and public composition process; structured accession, reading, claim, and decision records; selective public projection. |
| feature/evals-F | Real-job tests, independent comprehension, role provenance, output-to-outcome chains, rights review, and a regular outward-application cadence. |
| feature/evals-G | Full evaluation lab notebook: deterministic and judge artifacts, screenshots, failed candidates, superseded candidates, and iteration records. |
| feature/evals-H | Blind hiring-reader rehearsal, concise public composition, actual artifact inspection, resume/indexing/Docker QA, responsive checks, and human cutover gates. |
| feature/evals-I | Adversarial mutation tests, frozen hashes and baselines, immutable git-object checks, exhaustive collective-credit checks, and fail-closed projection rules. |
| feature/evals-J | Procedural history, baseline/revision/certification/stop ledgers, and an explicit application argument selecting proof pillars while deferring nonessential depth. |
| feature/evals-K | Append-safe intake, query, and publication-palette tooling that makes the Knowledge Bank useful without auto-publishing it. |
| feature/evals-L | Modular executable evaluators for hiring clarity, outcomes, role corroboration, present-tense offer, survivorship, visual proof, release governance, and corpus health. |
| feature/evals-M | Portable continuous integration using the repository's Node version and required PDF tooling, with a concise root gate. |
| feature/evals-N | Human handoff and governance: collaborator-corroboration matrix, outcome/transfer map, hiring-reader loop, launch checklist, recent-capability map, and artistic-continuity map. |

When two branches implement the same concept, choose the simpler version that fits current B schemas. Record the decision; do not keep both.

## 6. Target architecture

### Preserve the existing domain suites

Keep these authoritative suites and strengthen them only where composite review exposes a real gap:

~~~text
evals/portfolio-claims/evals.json
evals/chad-lens/eval.json
evals/margaret-morse-lens/eval.json
evals/warren-sack-lens/eval.json
evals/knowledge-bank-lifecycle/evals.json
evals/portfolio-system-blind-spots/evals.json
~~~

Their responsibilities remain distinct:

- portfolio-claims: claim truth, support, role precision, and public wording;
- chad-lens: hiring clarity, actor visibility, usable outcomes, and reader burden;
- margaret-morse-lens: artistic inquiry, embodied knowledge, hospitality, atmosphere, place, and media archaeology;
- warren-sack-lens: social-software insight, recursive structures, interfaces, participation, and technical/conceptual originality;
- knowledge-bank-lifecycle: accession, research, claim maturation, projection, photo feedback, and archival care;
- portfolio-system-blind-spots: systemic omissions, skew, survivorship, corroboration, maintenance, and governance.

### Add one composite readiness coordinator

Add one orchestration layer, preferably:

~~~text
evals/portfolio-readiness/
  README.md
  rubric.json
  scorecard.schema.json
  judge-prompt.md
  application-argument.json
  human-status.json
  runs/
~~~

If an equivalent coordinator already exists, extend it instead. The coordinator should reference results from the domain suites. It must not duplicate their canonical claims or evidence.

### Readiness profiles

Model at least three states:

~~~text
system-ready
application-ready
production-ready
~~~

Suggested meanings:

- system-ready: deterministic checks pass; candidate, rubric, and run artifacts are internally coherent and reproducible.
- application-ready: system-ready plus successful hiring-reader comprehension, correct resume/contact materials, and human approval of the exact candidate to share.
- production-ready: application-ready plus media/rights review, exact-SHA release approval, indexing decision, deploy rehearsal, and post-deploy verification.

Do not call the site production-ready merely because the build passes.

### Criterion model

Every composite criterion should include:

~~~text
id
name
description
evaluationClass
weight
hardGate
threshold
evidenceRequirements
failureExamples
remediationGuidance
owner
~~~

Evaluation classes:

~~~text
deterministic
llm-judge
human
external-outcome
hybrid
~~~

A reasonable initial 100-point model:

| Criterion | Weight | Typical class |
| --- | ---: | --- |
| Application comprehension | 12 | human / LLM-judge |
| Claim and source governance | 14 | deterministic / hybrid |
| Exact role and collective credit | 10 | hybrid |
| Operating sequence, outputs, outcomes, and transfer | 10 | hybrid |
| Recent and present-tense capability | 6 | hybrid |
| Artifact and visual proof | 6 | human / hybrid |
| Resume, contact, and application path | 6 | deterministic / human |
| Responsive and accessible experience | 8 | deterministic / human |
| Runtime, routes, indexing, and release behavior | 8 | deterministic |
| Maintainability and contributor comprehension | 5 | hybrid |
| Collaborator corroboration | 5 | human / external-outcome |
| Independent hiring-reader validation | 5 | human |
| Exact-candidate approval and cutover | 5 | human |

Weights order work; they do not override hard gates.

### Candidate and rubric fingerprints

Every scored run must bind itself to:

- the exact Git commit SHA;
- a digest of all public candidate surfaces under review;
- a digest of the rubric and schemas;
- the evaluator version;
- the judge prompt version;
- model/provider identity for LLM judgments;
- timestamp;
- test environment.

Any material change to candidate or rubric invalidates prior certification. Never carry a score forward to a changed digest.

### Evaluation authority

Separate authority explicitly:

- deterministic scripts certify machine-observable facts;
- LLM judges make bounded editorial judgments with cited evidence;
- humans approve shareability, rights, interpretation, and release;
- external outcomes remain observations, not controllable gates.

The agent that authored a candidate must not be its only judge. Require at least two independent judgment passes for subjective readiness claims.

## 7. Required eval coverage

### Hiring comprehension

Test whether a reader can quickly answer:

~~~text
What work does Jamie do?
What kinds of teams and situations need him?
What did he personally do?
What became usable because of the work?
What evidence can I inspect?
What should I do next if I want to hire or contact him?
~~~

Measure reader burden and comprehension. Do not reward jargon density.

### Claim and citation integrity

Test that:

- consequential claims resolve to canonical Knowledge Bank IDs;
- citations support precise nearby wording;
- private evidence never receives a public path or link;
- known, open, protected, and not recovered remain distinct;
- negative research does not become a universal absence claim;
- source URLs are not invented;
- stronger public wording first exists in the bank with evidence and guardrails.

### Role and collective credit

Test each prominent project for:

- Jamie's specific actions;
- collaborators and institutional context;
- decision authority versus support role;
- outputs, outcomes, and limits;
- language that avoids both overstatement and self-erasure.

Add adversarial examples that attempt to convert "supported," "helped establish," or "served as" into sole-credit claims. Those mutations must fail.

### Operating sequence and transfer

Primary proof cases should expose a readable chain:

~~~text
emerging condition -> stakeholder listening -> requirements / decisions ->
operating structure -> implementation -> use -> outcome -> durable handoff
~~~

Do not force every project into identical language. Preserve differences among civic, cultural, technical, construction, and artistic work.

### Recent capability

Test whether the portfolio shows present-tense evidence, not only historical importance. Recent practice can include implementation, product operations, source-backed team memory, AI evaluation, knowledge systems, documentation, and launch support when accurately documented.

### Artistic and relational continuity

Test that the portfolio does not erase experimentation, hospitality, public gathering, embodied research, media archaeology, place, participation, and relationships merely because they are harder to translate into conventional hiring language.

These dimensions should explain why Jamie's operating systems differ from generic administration. They should not overwhelm the hiring argument.

### Visual and artifact proof

Test whether readers can inspect actual work rather than only assertions. Distinguish:

- evidentiary images;
- representative images;
- diagrams or reconstructions;
- private images awaiting rights review.

Rights, consent, factual relevance, and visual quality are separate decisions.

### Accessibility and responsive behavior

Test at minimum:

~~~text
320px
375px
768px
desktop
~~~

Include keyboard navigation, visible focus, color contrast, heading structure, link purpose, citation and backlink behavior, reduced motion, print readability, and JavaScript-disabled citation navigation where applicable.

### Release and runtime behavior

Test:

- production build;
- Docker build and non-root runtime where supported;
- health endpoint;
- sitemap and robots behavior;
- staging noindex;
- production indexing only with explicit approval;
- canonical resume route and file;
- internal links and known public routes;
- no console or hydration errors;
- exact candidate SHA.

### Maintenance and handoff

A contributor with only the repo should be able to:

- add a source or lead safely;
- mature it into evidence and a claim;
- query the bank;
- understand why a claim is or is not public;
- run every required evaluator;
- identify human-owned approvals;
- reproduce the most recent machine result.

## 8. Knowledge Bank operating tools

Adapt the useful intake/query concepts from feature/evals-K to current B schemas. Do not import a competing data model.

Provide or preserve commands equivalent to:

~~~bash
npm run knowledge:lead -- --help
npm run knowledge:query -- --help
npm run knowledge:palette -- --help
~~~

### Intake requirements

- Accept a source, memory, artifact, or research lead without prematurely treating it as a public claim.
- Generate stable IDs through the established convention.
- Record access state, provenance, uncertainty, public-safety boundary, and next research action.
- Append safely and reject duplicate IDs.
- Never ingest a private filesystem path into a public record.

### Query requirements

- Find sources, evidence, claims, projects, organizations, and unresolved research questions.
- Show support relationships and public-use boundaries.
- Offer JSON output for agent workflows.
- Remain deterministic and offline.

### Publication palette requirements

- Return only records explicitly authorized for the requested surface.
- Require an exact named surface, not a vague public flag.
- Preserve guardrails and collective-credit language.
- Never publish automatically.

If these capabilities already exist under other names, improve and document them rather than adding aliases merely to match this handoff.

## 9. Build the integration

Implement the smallest coherent set of changes that satisfies the architecture.

Expected work may include:

~~~text
evals/portfolio-readiness/*
scripts/check-portfolio-readiness.mjs
scripts/lib/portfolio-readiness-validation.mjs
scripts/test-portfolio-readiness.mjs
scripts/intake-knowledge-lead.mjs
scripts/query-knowledge-lifecycle.mjs
scripts/knowledge-palette.mjs
.github/workflows/portfolio-readiness.yml
package.json
README.md
AGENTS.md
docs/evals/*
docs/knowledge-bank/*
~~~

Only add a listed file when it fills a gap. Prefer existing utilities and naming.

Do not:

- upgrade Next.js, React, TypeScript, Zod, Tailwind, daisyUI, or Node;
- add a CMS, database, private archive browser, public claims database, or remote fetch to the normal build;
- expose raw transcripts, private correspondence, private source files, face tags, GPS/EXIF payloads, private stakeholder lists, or local paths;
- make a public change solely to raise a metric;
- add a prominent claim before its Knowledge Bank representation is mature;
- delete failed evaluation history.

## 10. Recursive hill-climb protocol

Use a bounded, auditable loop.

### Freeze the evaluation contract

Before the first improvement round:

1. Record the candidate SHA and candidate-surface digest.
2. Record the rubric/schema digest.
3. Record evaluator and judge-prompt versions.
4. Run every deterministic baseline gate.
5. Run independent subjective evaluations.
6. Save the complete baseline, including failures.

Do not edit the rubric during a candidate hill climb. A rubric change begins a new evaluation series and baseline.

### Iterate

For each round:

1. Select the highest-severity failed hard gate.
2. If hard gates pass, select the lowest-scoring criterion with actionable evidence.
3. Identify the root cause in the Knowledge Bank, composition, code, artifact set, or eval tooling.
4. Make one bounded revision with an explicit hypothesis.
5. Update canonical Knowledge Bank records before strengthening public claims.
6. Build the full candidate.
7. Re-run the affected evaluator.
8. Re-run the complete regression suite.
9. Compare the result to the prior candidate.
10. Keep the revision only if it improves the target without a hard-gate failure or material regression.
11. Record candidate, evidence, result, decision, and next action even when rejecting the revision.

Use no more than eight candidate rounds in one uninterrupted series unless the run record explains why a new bounded series is warranted.

### Independent judgment

For LLM-judged criteria:

- use at least two independent judge passes;
- give judges the frozen rubric and exact candidate evidence;
- require criterion-level citations or file/route references;
- prohibit assumptions from private archive facts absent from the bundle;
- preserve model/provider and prompt provenance;
- treat disagreement as evidence requiring review, not a score to average away.

### Stop rules

Stop the machine hill climb only when:

- every deterministic hard gate passes;
- every LLM-judged hard gate passes in two consecutive independent rounds;
- the weighted threshold is met;
- candidate and rubric digests remain unchanged across both confirming rounds;
- no existing domain-suite criterion regresses below threshold;
- no public-safety, collective-credit, accessibility, citation, or build regression exists;
- unresolved human and external states are represented honestly.

If the iteration limit is reached, return the best passing candidate and unresolved criteria. Do not claim the threshold was met.

Human review can move system-ready to application-ready or production-ready; an agent cannot.

## 11. Evaluation artifacts and run ledger

Store public-safe, versioned run artifacts. Each run should include:

~~~text
run ID
candidate SHA
candidate digest
rubric digest
evaluator versions
environment
commands
criterion results
hard-gate results
judge provenance
evidence references
screenshots where appropriate
human-state snapshot
decision: keep / reject / supersede / certify-machine-state
known limitations
~~~

Do not overwrite history. Mark superseded runs as superseded while preserving them.

Do not commit secret prompts, credentials, private research artifacts, or protected source material. A run may reference a public-safe source ID without embedding its private artifact.

Keep generated output bounded. Do not commit dependency caches, complete build output, or repeated copies of unchanged screenshots.

## 12. Public-site changes during the hill climb

The composite system should improve the actual portfolio where evidence demonstrates a need. Use this order:

1. Identify the reader or readiness problem.
2. Locate or mature supporting Knowledge Bank material.
3. Choose the smallest public projection that resolves the problem.
4. Preserve canonical claim IDs and citations.
5. Verify collective credit and protected boundaries.
6. Test the composed page in context.
7. Keep the change only if it strengthens the portfolio as a whole.

Use canonical Claim rendering where exact approved wording is required. Use Cite for supported authored prose. Do not turn the site into a claims database or cite every sentence.

The public argument should make Jamie visible as the actor, explain what became usable, and reduce specialized language for hiring and public-sector readers. It should also preserve the artistic, civic, technical, social, and relational continuity that makes the practice distinctive.

## 13. Continuous integration

Add or update one GitHub Actions workflow for the composite readiness gate.

Requirements:

- use Node 26;
- install with npm ci;
- install poppler-utils only when existing PDF/resume tests require it;
- run the deterministic offline suite;
- avoid external social-media, archive, publisher, or LLM calls in required CI;
- upload bounded failure artifacts when useful;
- fail on deterministic hard-gate failure;
- do not interpret unresolved human review as machine failure unless the selected release profile requires that human gate.

An optional manually triggered workflow may run external link checks or LLM judgments. It must not be required for ordinary build reproducibility.

## 14. Verification

Run the available equivalents of all commands below. Add evals:portfolio-readiness to root scripts and root check only after it is stable and deterministic.

~~~bash
nvm use
npm ci

npm run check:citations
npm run test:citations
npm run knowledge-bank
npm run evals:portfolio
npm run evals:chad-lens
npm run evals:margaret-morse
npm run evals:warren-sack
npm run evals:knowledge-bank-lifecycle
npm run evals:blind-spots
npm run evals:portfolio-readiness
npm run public-safety
npm run check:routes

npm run typecheck
npm run lint
npm run build
npm run check

npm run preflight:staging
npm run preflight:production
git diff --check
~~~

If a named script does not exist, either add it when part of the target architecture or document why an existing command is authoritative. Do not add empty aliases that always pass.

Production preflight may honestly end in human-blocked when exact-candidate approval, rights review, or deployment approval remains open. Its deterministic subchecks must still report accurately.

### Docker/runtime verification

When supported:

1. Build the production image.
2. Run it as the configured non-root user.
3. Verify the health endpoint.
4. Verify representative routes, resume, sitemap, and robots output.
5. Confirm staging remains noindex.
6. Confirm no production deployment or indexing change occurred.

### Manual browser QA

Verify the exact built candidate at 320, 375, 768, and desktop widths. Capture enough evidence to review:

- home-page hiring argument;
- primary project narrative and artifacts;
- citation/reference behavior;
- resume and contact path;
- keyboard focus;
- private-source behavior;
- mobile layout;
- changed photo or media surfaces.

## 15. Documentation

Update README.md and AGENTS.md so a future contributor understands:

- the purpose and location of each domain eval;
- the composite coordinator;
- readiness-state definitions;
- candidate and rubric fingerprints;
- independent-judge requirements;
- human-gate ownership;
- hill-climb and stop protocol;
- intake/query/publication-palette commands;
- offline CI behavior;
- public-safety and collective-credit rules;
- exact verification commands.

Add a concise architecture note under docs/evals/ explaining why selected family mechanisms were integrated and why others were not copied wholesale.

Do not claim that human research, collaborator review, application outcomes, or production approval occurred unless a dated record demonstrates it.

## 16. Suggested commit sequence

Use small, reviewable commits:

~~~text
feat(evals): add composite portfolio readiness schema
feat(evals): add exact-candidate and independent-judge validation
feat(knowledge-bank): add append-safe intake and query tooling
test(evals): add adversarial mutations and recursive run ledger
ci(evals): add deterministic portfolio readiness workflow
content(portfolio): apply source-backed hill-climb improvements
docs(evals): document readiness profiles and human gates
~~~

Do not force this sequence if implementation divides more naturally. Do not mix unrelated cleanup into these commits.

Before every commit:

~~~bash
git status --short
git diff --check
~~~

Stage surgically. Do not assume every untracked file belongs to this assignment.

## 17. Pull request

Push the existing working branch:

~~~bash
git push -u origin feature/knowledge-b
~~~

Create the pull request with:

~~~text
base: develop
head: feature/knowledge-b
~~~

Using GitHub CLI:

~~~bash
gh pr create \
  --base develop \
  --head feature/knowledge-b \
  --title "Knowledge B: composite evaluation and recursive readiness system" \
  --body-file .github/pr-body-feature-knowledge-b.md
~~~

Do not target main. Do not create a new feature/evals-* branch. Do not deploy production as part of opening the PR.

Open the PR as ready for review when all machine hard gates pass. If machine work is complete but required human gates remain open, state them plainly; do not manufacture approval. A draft is appropriate only while machine implementation or verification remains incomplete.

### Required PR body sections

~~~md
# Knowledge B: Composite Evaluation and Recursive Readiness

## Summary

## Why

## Starting state
- Branch: feature/knowledge-b
- Starting SHA: 67fc30427e544199540f81d6b50cf94ef8101f47
- Base: develop

## Integrated mechanisms
- List each adopted feature/evals-* mechanism and its current path.

## Deliberately not imported
- List duplicate, obsolete, unsafe, or overbroad mechanisms and why omitted.

## Evaluation architecture
- Domain suites
- Composite coordinator
- Deterministic / LLM / human / external authority
- Readiness profiles
- Fingerprints and run ledger

## Recursive improvement results
- Baseline
- Iterations
- Accepted and rejected candidates
- Final machine state
- Remaining human or external states

## Portfolio changes
- Knowledge Bank changes
- Public-site projections
- Claim and collective-credit review

## Verification
- Include exact commands and results.

## Manual QA
- Widths
- Keyboard/accessibility
- Citations
- Resume/contact
- Docker/runtime

## Human gates
- Hiring-reader review
- Collaborator corroboration
- Media rights/consent
- Exact-candidate approval
- Production cutover approval

## Risks and follow-up

## Screenshots and run artifacts
~~~

The PR description must distinguish "machine checks pass" from application-ready and production-ready.

## 18. Definition of done

This assignment is complete when:

- work began from the current clean feature/knowledge-b branch;
- frozen feature/evals-* branches remained unchanged;
- existing B architecture remained canonical;
- one composite readiness coordinator exists without duplicating domain evals;
- application-ready and production-ready are distinct;
- candidate and rubric fingerprints invalidate stale results;
- deterministic, LLM, human, and external authority are explicit;
- hard gates cannot be averaged away;
- two independent passes confirm subjective hard gates;
- the hill climb is bounded, regression-aware, and auditable;
- failed and superseded candidates remain recorded;
- collective-credit and public-safety mutations fail;
- intake/query/palette tooling works against the canonical Knowledge Bank or existing equivalents are documented;
- public-site changes are source-backed and compositionally justified;
- accessibility, responsive, citation, route, resume, runtime, and indexing behavior are verified;
- normal checks remain offline and deterministic;
- CI uses Node 26 and required PDF tooling;
- documentation enables a contributor with no outside context to continue safely;
- all machine checks pass or pre-existing failures are documented honestly;
- unresolved human/external gates remain visibly unresolved;
- feature/knowledge-b is pushed;
- the pull request targets develop.

## 19. Final test

Before opening the PR, ask whether the system enables a future coding agent to answer these questions from the repo alone:

~~~text
What candidate did we evaluate?
What rubric did we use?
Which facts were machine-observed?
Which judgments came from LLMs?
Which decisions still belong to people?
Which public claims are supported, bounded, and correctly credited?
What changed during the recursive process?
What failed or was rejected?
Why did the final candidate improve?
What remains unmeasured or protected?
Is this safe to share for an application?
Is this approved to deploy to production?
~~~

If the repository cannot answer those questions, the integration is not finished.

The purpose is not to make the evaluation system look comprehensive. The purpose is to help Jamie and future collaborators make the strongest truthful portfolio for the moment at hand, while preserving enough provenance, care, and operational clarity to improve it again tomorrow.
