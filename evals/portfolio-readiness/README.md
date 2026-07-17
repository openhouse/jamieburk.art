# Composite Portfolio Readiness

This suite coordinates the existing domain evals without replacing them. It binds
machine and LLM judgments to one exact candidate revision and rubric digest, then
keeps human application and production authority separate.

## Profiles

- system-ready: deterministic contracts and two independent judges pass across
  two consecutive rounds on an unchanged candidate and rubric.
- application-ready: system-ready plus the human checks named by the application
  profile.
- production-ready: application-ready plus rights, indexing, deploy, and
  post-deploy approval for the exact candidate.

A machine may certify only system-ready.

## Commands

~~~bash
npm run test:portfolio-readiness
npm run evals:portfolio-readiness
npm run evals:portfolio-readiness:application
npm run evals:portfolio-readiness:production
npm run evals:portfolio-readiness:capture -- --run-id RUN --revision FULL_SHA
~~~

The capture command runs every domain command from rubric.json and writes a
digest-only receipt. It does not run external links or LLMs. The checker
validates the current run, candidate and rubric fingerprints, four judge
artifacts, no-regression rule, application argument, and human-state registry.

## Recursive loop

1. Freeze candidate and rubric digests.
2. Run every deterministic suite.
3. Obtain independent hiring/comprehension and evidence/systems judgments.
4. Repair the highest-severity hard gate or lowest actionable criterion.
5. Re-run the affected suite and the full regression set.
6. Keep only a non-regressing improvement.
7. Repeat with a fresh pair of judges.
8. Stop after two passing rounds or preserve the best candidate at iteration 8.

Every machine criterion must meet its own threshold in every scorecard. Across
rounds, non-regression compares each judge role's weighted result and hard-gate
state. Criterion-level disagreements remain visible review signals; they are not
averaged away or treated as precise measurements of candidate change.

Do not edit the rubric during one candidate series. A rubric change starts a new
baseline. Do not call an LLM judgment hiring-reader validation.

## Artifacts

- rubric.json: criteria, profiles, domain suites, and stop policy.
- scorecard.schema.json: portable scorecard contract.
- application-argument.json: the current audience, decision, proof pillars, and
  deliberate omissions.
- human-status.json: human-owned states and blockers.
- judge-prompt.md: bounded instructions for independent judges.
- runs/current-run.json: pointer to the current exact-candidate run.
- runs/RUN/provenance.json: baseline, accepted iteration, limitations, and
  candidate/rubric fingerprints.
- runs/RUN/deterministic.json: command outcomes and output digests.
- runs/RUN/browser-qa.json: exact-candidate responsive, keyboard, no-JavaScript,
  route, console, and screenshot-digest receipt from the standalone build.
- runs/RUN/judges/: two roles across two consecutive rounds.

The provenance record binds every judge artifact to a distinct read-only
orchestration session and verifies its artifact digest. Browser screenshots are
also digest-bound. These receipts improve auditability; they do not prove human
reader comprehension or evaluator independence cryptographically.

Run artifacts are public-safe process evidence, not cryptographic proof and not
evidence that an external outcome occurred.
