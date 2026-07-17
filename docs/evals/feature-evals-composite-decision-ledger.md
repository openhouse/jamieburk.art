# `feature/evals-*` composite decision ledger

Date: 2026-07-16
Working branch: `feature/knowledge-j`
Apply target: `develop`

This ledger records how the frozen `feature/evals-A` through
`feature/evals-N` family informed the composite. A disposition applies to the
distinctive behavior, not to every file in a source branch. No source branch
was merged wholesale or modified.

| Source | PR | Behavior reviewed | Decision | Canonical destination | Duplication avoided | Safety, credit, accessibility, maintenance | Verification |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| A | [#220](https://github.com/openhouse/jamieburk.art/pull/220) | Separate launch, portfolio, and knowledge objectives with hard gates | Adapt | `.agents/evals/composite-integration.json` | No fourth scoring engine | Safety and approval cannot be averaged away | `npm run evals:composite` |
| B | [#212](https://github.com/openhouse/jamieburk.art/pull/212) | Mosaic privacy, composition budgets, role classification, exact sets | Adapt | `docs/knowledge-bank/governance/` | No parallel proof registry | Makes combined-data and collective-credit risk reviewable | `npm run check:knowledge-integrity` |
| C | [#221](https://github.com/openhouse/jamieburk.art/pull/221) | Candidate, contract, and evidence fingerprints | Adopt | `scripts/lib/eval-run-contract.mjs` | Shared validator for all three scorers | Stale scorecards fail when governed inputs change | `npm run evals:composite` |
| D | [#216](https://github.com/openhouse/jamieburk.art/pull/216) | Versioned QA history and concrete observations | Adapt | `docs/evals/runs/feature-knowledge-j/` | One run format for all profiles | Keeps what was actually observed distinct from an overall score | Scorer validation and final run records |
| E | [#211](https://github.com/openhouse/jamieburk.art/pull/211) | Deterministic, browser, independent-judge, and human layers | Adopt | `.agents/evals/composite-integration.json` | No layer may impersonate another | Human comprehension, consent, rights, and release stay human | Composite mutation tests |
| F | [#210](https://github.com/openhouse/jamieburk.art/pull/210) | Negative tests and pragmatic release gates | Adapt | `scripts/tests/knowledge-integrity.test.mjs` and root preflights | Existing preflight commands retained | Fail-closed regressions cover deletion, reassignment, reachability, and privacy | `npm run check` and both preflights |
| G | [#222](https://github.com/openhouse/jamieburk.art/pull/222) | Compact machine-readable objectives and honest machine-only caps | Adapt | `.agents/evals/composite-integration.json` | Umbrella references J's suites instead of duplicating criteria | `human_blocked` remains a successful honest stop | Composite contract tests |
| H | [#223](https://github.com/openhouse/jamieburk.art/pull/223) | Hiring-reader, browser, visual, and runtime evidence | Adapt | Composite grader map and PR evidence table | No simulated cold readers or unsupported visual claims | Reader and runtime evidence remain explicit pending observations | Final run records and PR status |
| I | [#219](https://github.com/openhouse/jamieburk.art/pull/219) | Fail-closed attribution, projection reachability, immutable review inputs | Adapt | `scripts/check-knowledge-integrity.mjs` and governance manifests | No editable checksum baseline | Exact semantic sets and run fingerprints expose coordinated drift | Integrity mutation tests |
| J | [#209](https://github.com/openhouse/jamieburk.art/pull/209) | Research history and separate claim/projection targets | Adopt | `.agents/evals/portfolio-production-readiness.json`, `knowledge-bank-development.json`, `blind-spot-readiness.json` | J remains the only scoring architecture | Preserves research depth and honest publication separation | Three canonical suite checkers and scorers |
| K | [#217](https://github.com/openhouse/jamieburk.art/pull/217) | Append-safe intake, lifecycle, query/report, correction history | Adapt | `lifecycle-schema.ts`, `lifecycle-records.ts`, `scripts/*knowledge-lifecycle*` | K's separate rubric and full duplicate corpus were not retained | Unassigned leads survive; exact-surface queries fail closed | `npm run check:knowledge-lifecycle` |
| L | [#213](https://github.com/openhouse/jamieburk.art/pull/213) | Newcomer operating manual and `governed-open` status | Adapt | `docs/knowledge-bank/knowledge-lifecycle.md`, `README.md`, `AGENTS.md` | One command and maintenance narrative | Clarifies what is usable without implying publication or release | Docs reviewed by root checks and public-safety scan |
| M | [#215](https://github.com/openhouse/jamieburk.art/pull/215) | Operational simplicity, CI, P0/P1/P2 release priority | Adopt | `.github/workflows/portfolio-readiness.yml` | One Node 26 workflow runs canonical root check | CI catches contract, application, safety, and route drift | GitHub Actions plus local `npm run check` |
| N | [#214](https://github.com/openhouse/jamieburk.art/pull/214) | Grader separation and human-evidence map | Adopt | Composite grader roles and run binding | No second human-evidence framework | Prevents agents or simulated readers from satisfying human gates | Composite and scorer mutation tests |

## Deliberate deferrals

- No public knowledge-bank, proof, archive, or internal-tool interface.
- No database, CMS, auth, analytics, or search system.
- No wholesale import of K's later lifecycle corpus; J's canonical bank remains
  the source of truth and the lifecycle seed demonstrates the process.
- No claim of completed cold-reader, consent, rights, collaborator, production,
  or cutover approval unless separately observed by the required person.
- No visual identity, navigation, or framework redesign without a failing
  frozen criterion.

## Canonical stop rule

Automated profiles may reach `threshold_met` after two complete passing runs on
an unchanged candidate. Application and production profiles stop at
`human_blocked` whenever the next valid evidence is Jamie's exact-candidate
approval, a real target-reader result, consent or rights clearance,
collaborator-sensitive review, or verified production access.
