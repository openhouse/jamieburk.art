# `feature/knowledge-f` Composite Eval Run

## Scope

This run integrates the strongest compatible controls from the frozen `feature/evals-A` through `feature/evals-N` branch family into the existing F launch-eval spine. The frozen branches remained read-only. No branch was merged or cherry-picked wholesale.

The pass adds evaluator and knowledge-system governance. It does not add a public knowledge-bank route, publish reserve claims, alter public claim wording, replace the resume, deploy production, or claim completion of a human gate.

## Starting State

- Branch: `feature/knowledge-f`
- Required ancestor: `ba74618558e55a836d9a73b5293f6fdb45e684ff`
- Apply target: `develop`
- Starting automated result: 47 criteria, 100/100, all hard gates passing
- Starting eval regression suite: 138 passing tests
- Starting manual gates: explicit and unresolved
- Runtime: Node 26.5.0, npm 11.17.0

## Frozen Contract

- Contract: `docs/evals/composite-contract.json`
- Contract version: `2026-07-17.1`
- Minimum score: 94
- Required automated certification: two passing runs against one clean unchanged candidate
- Required independent holdout: manual
- Required production approval: manual

The contract preserves eighteen evaluation families and freezes every observed criterion ID, weight, and hard-gate status. New constitutional gates cover contract integrity, candidate binding, provenance-frontier closure, selective projection, and normalized public safety.

## Recursive Hill Climb

### Baseline

The inherited F suite passed. The gap was not another portfolio claim. The gap was that reports did not bind the exact candidate, contract, material inputs, evaluator, and public registry, and the launch runner did not independently validate the complete canonical provenance frontier.

### Iteration 1: Create the composite evals

Added the frozen contract, exact-candidate identity, graph validator, projection validator, normalized safety inspector, certification command, and adversarial test suite.

The first composite run failed honestly:

- score: 99/100;
- hard-gate failure: `release-gate-wiring`;
- cause: the contract required `evals:certify`, but `package.json` did not yet expose it.

### Iteration 2: Build repeat certification

Added `npm run evals:certify`, wired production prelaunch to certification, and made certification require two automated-ready runs with identical candidate, contract, material, evaluator, and registry fingerprints.

The focused suite passed 154 tests, and the launch suite reached 100/100 across 52 criteria.

An intentional dirty-worktree certification run failed both passes. This established that automated readiness alone cannot certify an uncommitted candidate.

### Iteration 3: Remove secret-shaped test literals

The complete repository check exposed two synthetic fixtures whose literal source text matched the existing credential scanner: a private-key header and bearer-token shape. The tests did not contain real credentials, but retaining recognizable secret syntax in a public fixture would weaken the repository's own standard.

The fixtures now assemble synthetic values at runtime. The adversarial behavior remains, while `npm run public-safety` passes.

### Iteration 4: Close contract-family coverage

Added explicit mappings from all eighteen required families to known criteria and a mutation test that rejects a missing family or an unknown criterion reference. Updated contributor, launch-readiness, and blocker documentation to distinguish repeat automation from independent and production approvals.

## Final Automated State Before Commit

- `npm run test:citations`: 19 passed
- `npm run test:evals`: 155 passed
- `npm run check`: passed
- Next.js production build: passed, 17 routes generated
- Knowledge-bank validation: passed with 12 existing careful-claim warnings
- Public-safety validation: passed
- Route validation: passed
- Launch evals: 52 criteria, 100/100, all hard gates passed
- Public citation registry: unchanged and current
- Public site projection: unchanged

The final clean-candidate SHA and fingerprints are necessarily generated after this tracked run record is committed. They are recorded in the pull request and ignored `reports/generated/launch-certification.json`; a tracked file cannot contain the hash of the commit that contains itself.

## Adversarial Coverage Added

- missing contracted criterion;
- family without criterion coverage;
- unknown family criterion;
- weight drift;
- hard-gate demotion;
- hard-coded pass without evidence;
- malformed or stale candidate fingerprint;
- dangling source edge;
- private-support relationship rendered as a citation;
- silently dropped public occurrence;
- citation source outside canonical evidence;
- reserve claim silently promoted to a public route;
- escaped, encoded, Unicode-obscured, and aliased private paths;
- provider credential, key, bearer, and phone-shaped values assembled from synthetic parts;
- dirty certification candidate;
- changed material digest between certification runs.

## Manual Gates Still Required

Nineteen human gates remain unresolved. They include the hiring-manager comprehension test, resume visual balance, five-real-role review, independent hiring holdout, contribution/outcome/technical/collaboration review, visual rights, longitudinal and agency review, branch/PR integration review, the Margaret Morse and Warren Sack editorial reviews, the independent exact-candidate holdout, production approval, and postdeploy verification.

No automated result in this run completes those gates.

## Stop Decision

The recursive automated climb stops because the frozen score threshold is met, all 52 automated criteria pass, all hard gates pass, the public registry remains unchanged, and the remaining work requires independent or human observation. Clean-candidate repeat certification is performed after commit. Production deployment remains unauthorized.
