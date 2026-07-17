# Feature Evals Composite Integration Record M

## Decision

Use `feature/evals-M` as the architectural base. Treat `feature/evals-A`
through `feature/evals-N` as frozen, read-only design references. Port the
smallest capability that closes a real control gap; do not merge a branch or
retain parallel live rubric trees.

## Dispositions

| Branch | Decision | Capability | Composite destination | Duplication or safety boundary |
| --- | --- | --- | --- | --- |
| `feature/evals-A` | adapt | Integrated launch, knowledge, portfolio-effectiveness, exact-SHA, and maintenance gates | Portfolio and eval-integrity controls | Do not add A's separate three-suite runtime |
| `feature/evals-B` | port | External-validity blind spots, mosaic privacy, countability bias, evaluator independence, and action conversion | `blind-spot-readiness-M.json` and human protocols | Passing controls must not be described as passing human outcomes |
| `feature/evals-C` | adapt | Hiring, safety, Chad, Morse, and Sack audience questions | Existing M lens checks and unfamiliar-reader protocol | Do not maintain multiple editable model-judgment trees |
| `feature/evals-D` | reference-only | Iteration history plus accessibility, archive-bias, consequence, collaboration, maintenance, and release concepts | Consolidated criteria and run receipts | Reject the `v1` through `v23` directory history as a live control plane |
| `feature/evals-E` | port | Blind-reader and browser scenarios, separate application and production thresholds, explicit human gates | Portfolio register, launch QA, and human validation | Agents cannot fill human gates |
| `feature/evals-F` | port | Real-job review, unfamiliar-reader holdouts, role provenance, and output/use/outcome/causality distinctions | Human validation and portfolio contracts | Archetypes and generated postings do not count as market evidence |
| `feature/evals-G` | adapt | Low-friction capture, atomic observations, independent knowledge states, corrections, photo feedback, and future offer | Ten consolidated knowledge-lifecycle contracts | Do not duplicate M's schema or records assembly |
| `feature/evals-H` | port | Semantic mutation attacks, frozen rubric hashes, independent authority boundaries, and source-scope guards | Eval-integrity runtime and tests | Reject large branch-specific fixtures that duplicate canonical records |
| `feature/evals-I` | port | Correction readiness, underclaiming review, policy fingerprints, and drift visibility | Knowledge maintenance report and eval-integrity receipt | Source volume cannot become importance or impact |
| `feature/evals-J` | port | Optimizer/grader separation, exact candidate hashes, run receipts, consecutive-pass rule, and human-blocked decision | Eval-control plane and `docs/qa/runs/` | No model judgment is required where deterministic evidence is sufficient |
| `feature/evals-K` | adapt | Append-safe intake, bounded query, lifecycle report, and editorial palette | Operator tools over the M data model | Tools cannot auto-promote or auto-project |
| `feature/evals-L` | adapt | Survivorship, role, outcome, visual-proof, present-tense, release, and hiring-comprehension checks | Consolidated knowledge, portfolio, and blind-spot criteria | Reject a separate script for every archive population |
| `feature/evals-M` | port | Paired evidence/development records, deterministic checks, CI, and selective public projection | Canonical base | Preserve command names and public-safety behavior |
| `feature/evals-N` | port | Human reader loop, launch QA, outcome-transfer map, recent-capability map, and application/production separation | Human protocols and portfolio thresholds | Human and external evidence remains pending until performed |

## Canonical Homes

- Knowledge schema and records: `apps/www/src/data/knowledge-bank/`
- Rubrics, human protocols, and receipts: `docs/qa/`
- Deterministic checks and operator commands: `scripts/`
- Public projection: existing `apps/www` routes and data only
- Full local and CI gate: `npm run check`

## Rejected Composite Patterns

- wholesale branch merges or cherry-picks;
- simultaneous live rubrics in `.agents/evals/`, `evals/`, `docs/evals/`, and
  `docs/qa/`;
- duplicated social or archive fixtures when M already retains the evidence;
- token-presence checks presented as semantic evaluation;
- synthetic human, collaborator, recruiter, or professor results;
- automatic website expansion from claim maturity; and
- public routes exposing the knowledge bank or evaluation apparatus.
