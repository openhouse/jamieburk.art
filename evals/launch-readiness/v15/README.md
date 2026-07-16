# Launch-readiness evals v15

This suite turns the portfolio's publication intentions into an optimization
contract for human and LLM collaborators.

Version 15 adds a deterministic Facebook event archival-production gate for
Jamie's capture-date personal Past Events population and the WOW List Page. It
requires two matching traversals, public minimization, selected event-level
decomposition, traction and stakeholder boundaries, explicit body-level URL
incompleteness, and a strict distinction between a current empty interface and
historical nonexistence. It retains the v14 Urbanhermit gate, v13 NYC Artist
Coalition X gate, v12 KC Town Hall population gate, v11 WOW List population
gate, and every earlier invariant. Versions 1 through 14 remain in the
repository so earlier candidate records stay reproducible.

The target is not the largest possible scalar score. The target is a
lexicographic result:

1. every hard gate passes;
2. no scored criterion is below `0.8`;
3. the weighted score is at least `0.9`;
4. required human approvals are explicit;
5. the result repeats across two consecutive runs with two independent
   semantic graders.

An agent must never trade public safety, factual accuracy, collective credit,
accessibility, or rights clearance for a higher readability or visual score.

## Commands

Validate the suite itself:

```bash
npm run check:launch-evals
```

Report deterministic findings and the evidence still required:

```bash
npm run eval:launch-readiness
```

Evaluate two completed, independent observation files as a release gate:

```bash
npm run eval:launch-readiness:strict -- \
  --observations evals/launch-readiness/runs/<run-a>.json,evals/launch-readiness/runs/<run-b>.json
```

Start an observation file from the committed template:

```bash
cp evals/launch-readiness/v15/observation-template.json \
  evals/launch-readiness/runs/$(date +%Y%m%d-%H%M)-local.json
```

Run artifacts are normally local review evidence. Commit only intentionally
public-safe runs that contain no machine-local paths, private screenshots,
tokens, private source excerpts, or unapproved names.

## Recursive hill-climb loop

1. Run the report and existing repository checks.
2. Select the lowest failing mutable criterion. Human approval gates are not
   mutable by an agent.
3. State one causal hypothesis and make one bounded change.
4. Re-run the targeted eval, all previously passing hard gates, and the
   protected-invariant checks.
5. Accept the change only if the target criterion improves and no protected
   invariant regresses. Otherwise revert only that attempted change.
6. Record the evidence, commit SHA, grader identity, and remaining uncertainty.
7. Continue until the target is reached, a human gate is required, three
   bounded attempts fail, or the next change would violate an invariant.

The optimization order is deliberate. An agent first improves hard-gate pass
rate, then the weakest scored criterion, then the weighted score, and finally
prefers the smaller change.

## Evidence layers

### Deterministic

Static source and knowledge-bank relationships. The runner currently checks:

- NYC Artist Coalition chronology;
- CallNYC announced-hours attribution;
- resume action semantics;
- ten-source public research uniqueness, boundaries, and claim linkage;
- iCloud archive production across Jamie Projects History, CRS, and job-hunt;
- governed Google Shared Drive inventory, close reading, protected locators,
  proposal and visual boundaries, and selective workflow projection;
- authenticated social-account inventory, recovery reconciliation, shared
  campaign identity, full displayed WOW List and KC Town Hall populations,
  bounded interaction floors, and authorship boundaries;
- KC Town Hall proposal, Council action, interim status, withdrawal, and
  separately sourced mission-aligned transition;
- personal and WOW List Facebook event population reconciliation, public
  minimization, selected event proof, and not-recovered boundaries;
- campaign press-index completeness, deduplication, preservation, and
  non-projection boundaries.

### Browser

Measured rendered behavior. Use the deployed review URL and record:

- `scrollWidth` and `clientWidth` at 320, 375, 768, and 1440 pixels;
- screenshots for any failure and its correction;
- measured text contrast, including composited backgrounds;
- keyboard traversal and visible focus;
- 200 percent zoom behavior;
- actual rendered artifacts, captions, alt text, and rights status.

Do not pass responsive behavior by applying `overflow-x: hidden` over clipped
content. Do not pass visual proof with cards that merely describe artifacts.

### Semantic

Use two independent graders. Give each grader the same public pages, rubric,
and role context. Do not give a grader private source material.

`CHAD-001` is not a vocabulary check. Ask each grader to paraphrase, in plain
language, who Jamie was in the work, what he did, what became usable, and toward
what end. The criterion fails when those answers require source notes, internal
governance language, or unexplained domain expertise. Preserve contribution
language and collective credit while reducing the reader's burden.

Each grader must return:

```json
{
  "criterionId": "CLARITY-001",
  "score": 0.8,
  "passed": true,
  "evidence": ["Visible page-specific observation"],
  "limitations": ["What was not established"],
  "grader": {
    "type": "llm",
    "name": "provider/model",
    "runId": "independent-run-id"
  }
}
```

Prompt the grader to score only the rendered public experience. A grader must
quote or point to concrete visible evidence, name uncertainty, and apply the
anti-gaming rules in `evals.json`.

### Runtime

Runtime release evidence must come from the exact candidate SHA. A local build
does not prove that production serves that build. Verify the canonical domain,
health payload, robots policy, sitemap, canonical URLs, social image, resume
PDF, security headers, and rollback reference after deployment.

### Human

Jamie alone can satisfy final publication and launch approvals. Agents may
surface unresolved approvals and prepare the record. They may not infer or
self-certify consent.

## Agent handoff prompt

```text
Optimize the jamieburk.art launch-readiness eval suite recursively.

Read evals/launch-readiness/v15/evals.json and preserve every protected
invariant. Run npm run eval:launch-readiness and the repository checks. Choose
the lowest failing mutable criterion, state one causal hypothesis, and make one
bounded change. Re-evaluate. Keep the change only if it improves the
lexicographic objective without regressing a hard gate or invariant. Record
visible evidence and uncertainty. Stop at a human approval or rights boundary,
after three failed attempts on one criterion, or when two independent passing
runs meet the suite target.
```

Version 15 adds the Facebook event archival-production gate. Full capture-date
index reconciliation must never be renamed a native owner export, a complete
event-body crawl, or all-ever history; the current WOW List empty Events surface
must never become a claim that no historical event existed.
