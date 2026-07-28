# Cost-Aware Pre-Launch Evaluation

The portfolio's governance is intentionally rigorous. Cost awareness changes
when a check runs, not what must be true before release.

## Three Speeds

### 1. Iteration

While files are changing, run deterministic checks for every affected domain.
The planner maps changed paths to testimony, campaign media, Knowledge Wiki,
photography, application UI, citations, governance, and deployment checks.

Run:

```bash
node scripts/pre-launch-evals/check.mjs
npm run wiki:check
npm run wiki:test
```

An unrecognized path fails closed to the full suite. Governance, dependency,
evaluation-contract, and deployment changes also require the full suite. The
standard Wiki check and test commands validate the campaign-media census,
public-testimony corpus, and pre-launch contract.

### 2. Candidate Lock

Once source and content edits stop, commit the candidate and bind evidence to:

- the exact candidate digest;
- the exact frozen eval-contract digest;
- the exact browser and research evidence packet.

Then run the unchanged release gates:

```bash
npm run check
npm run build
```

Any candidate-affecting edit invalidates the receipt and its dependent browser
evidence, accessibility matrix, and model judgments.

### 3. Release Observation

After deterministic success, build the documented Docker staging image and
observe the deployed candidate. Verify desktop, mobile, 200 percent zoom,
keyboard focus, accessibility, citations, images, routes, and noindex.

Rights, consent, credit, crop, editorial approval, production deployment, and
indexing remain human gates.

## Model Judgment

Model judgment is most useful after candidate lock. A valid pass requires exact
candidate, contract, and evidence bindings plus two consecutive unchanged
passes. `blocked-budget`, `blocked-access`, `missing`, and `stale` are honest
states. None can be translated into a pass or hidden by changing the eval.

## Hill Climbing

1. Freeze the contract for the optimization cycle.
2. Run the planner and deterministic domain checks.
3. Change one highest-value failing criterion.
4. Re-run every invalidated domain.
5. Reject public-safety, rights, consent, claim-integrity, accessibility, or
   reader-legibility regressions.
6. Lock the candidate only when no source-affecting edit remains.
7. Run the full suite, build, browser evidence, model holdouts, and human review.

The planner reduces redundant work during exploration. It never changes the
definition of done.
