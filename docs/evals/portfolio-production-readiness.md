# Portfolio Production Readiness Evals

This suite turns the portfolio's publication intentions into a stable objective
function for recursive LLM-agent improvement. The machine-readable rubric lives
at `.agents/evals/portfolio-production-readiness.json`.

The website is a projection of the public-safe knowledge bank. An agent may
improve clarity, evidence presentation, navigation, and release safety. It may
not strengthen a claim beyond its proof record, publish protected material, or
substitute its own approval for Jamie's or a collaborator's.

## Objective

Make the portfolio ready to:

1. help a hiring reader understand Jamie's role and strongest evidence quickly;
2. support job applications with inspectable, defensible proof;
3. preserve collective credit, privacy, consent, and uncertainty;
4. ship safely at `https://jamieburk.art` with consistent metadata, indexing,
   routing, and deployment behavior.

## Score Model

Each eval receives a score from 0 to 4:

- `0` - absent, broken, unsafe, or contradicted;
- `1` - materially incomplete;
- `2` - usable but below the publication threshold;
- `3` - strong and application-ready;
- `4` - exceptional, specific, inspectable, and trustworthy.

The weighted score is:

```txt
weighted_score = sum(eval.weight * eval.score / 4) / 100
```

A candidate is launch-eligible only when all of these conditions hold:

- every blocking eval passes;
- weighted score is at least `0.90`;
- no individual eval scores below `3`;
- the blind-reader comprehension median is at least `4`;
- the Chad Lens professional-legibility median is at least `4`, with no reader
  below `3`;
- deterministic checks and the holdout regression pass;
- Jamie has explicitly approved the exact production candidate.

Weighted strength never compensates for a failed blocking eval.

## Recursive Hill-Climb Protocol

1. **Freeze the rubric.** Record the rubric version and candidate commit before
   evaluation. An optimizing agent must not edit the eval suite during a run.
2. **Establish a baseline.** Run every deterministic check and score every LLM
   eval. Store claims, screenshots, URLs, command output, and approval state as
   evidence. Do not infer a pass from absence of an error.
3. **Choose one move.** Select the highest-priority failed blocking eval. If no
   blocker fails, select the largest weighted score gap. Prefer the smallest
   patch that can materially improve that criterion.
4. **Protect invariants.** Before editing, identify claim, privacy, credit,
   accessibility, routing, and deployment surfaces that the patch could affect.
5. **Implement and verify.** Run the deterministic suite first. Then re-run the
   affected LLM evals, adjacent regression evals, and a blind holdout review.
6. **Reject regressions.** Revert or revise a patch that creates a new blocker,
   lowers the weighted score, weakens a source boundary, or makes the site less
   legible at any supported viewport.
7. **Record the iteration.** Save the before score, change summary, evidence,
   after score, regressions, and next candidate. Generated reports belong under
   `reports/generated/portfolio-evals/` and must not contain private sources.
8. **Stop responsibly.** Stop when the launch threshold is met, after eight
   iterations, or after three consecutive iterations without score improvement.
   At the latter two limits, report the remaining blocker instead of polishing
   indefinitely.

## Grader Separation

Use three grader roles:

- **Deterministic grader:** commands, HTTP behavior, DOM facts, link targets,
  file presence, schema checks, and deployment smoke tests.
- **LLM judge:** positioning, voice, evidence quality, reading burden, and
  whether artifacts make claims easier to trust. The judge cites visible
  evidence and returns only a score, pass/fail, concise rationale, and findings.
- **Human approver:** public claims, collaborator-sensitive material, images,
  screenshots, contact information, resume artifact, and production cutover.

The **Chad Lens judge panel** is a deliberately mixed blind-reader set: a
human-resources gatekeeper, a public-sector generalist, and a technical delivery
leader. They score whether the visible portfolio names Jamie's agency, the
purpose of the work, and what became usable in language each audience can
understand. They also check the opposite failure: cautious wording that erases
documented stewardship or implementation responsibility.

The optimizing agent must not grade its own patch. A holdout LLM judge receives
only the frozen rubric, candidate URLs, and evidence bundle. It does not receive
the patch intent, prior scores, or implementation discussion.

## Evidence Bundle

Every run should identify:

- candidate commit SHA and deployment URL;
- `npm run check`, staging preflight, and production preflight output;
- production Docker build and route-smoke results;
- response headers, canonical URLs, robots files, sitemap, and health output;
- desktop and mobile screenshots for every primary route;
- public-link results and CTA target inventory;
- extracted resume text plus rendered resume pages;
- knowledge-bank, approval-register, and launch-ledger results;
- LLM scorecards with page-level evidence.

Do not place raw transcripts, private correspondence, private notes, internal
analytics, contact lists, credentials, or unapproved artifacts in an eval
bundle.

## Optimizer Prompt

```txt
You are optimizing Jamie Burkart's public portfolio against the frozen
portfolio-production-readiness eval suite.

Evaluate the current candidate before editing. Preserve every hard constraint.
Choose the highest-priority failed blocker, or the largest weighted score gap
when no blocker fails. Make the smallest coherent patch likely to improve that
criterion. Run deterministic checks, then affected judges and the blind holdout.
Do not strengthen claims, expose protected sources, invent evidence, change the
rubric, or replace required human approval. Record evidence and score changes.
Stop when the launch threshold is reached or the iteration limit requires a
blocked report.
```

## Grader Output

Each eval result should use this shape:

```json
{
  "eval_id": "PR-001",
  "score": 3,
  "pass": true,
  "evidence": [
    "https://staging.jamieburk.art/",
    "The first viewport identifies the role, operating-structure promise, and primary actions."
  ],
  "findings": [],
  "recommended_next_move": null,
  "confidence": 0.91
}
```

Use `not_observed` when required evidence could not be collected. Do not convert
an unavailable observation into a pass.
