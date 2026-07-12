# Recursive Portfolio Improvement Loop

This loop turns editorial intention into an agent-operable hill climb without
letting the agent optimize away truth, care, or human approval.

## Fast Loop

1. Record the current Git revision and preserve a baseline scorecard.
2. Run `npm run eval:portfolio -- --profile fast`.
3. Render and inspect the routes required by the rubric. Produce a scorecard
   using `judge-prompt.md`.
4. Validate it with
   `npm run eval:portfolio -- --profile fast --scorecard path/to/scorecard.json`.
5. Select one failure with the highest combination of weight, severity, and
   reader impact. A failed deterministic or critical criterion always outranks
   cosmetic improvement.
6. Trace the failure to its controlling layer: knowledge bank, website,
   artifact, infrastructure, or human approval.
7. Make the smallest coherent change. If public wording becomes stronger, update
   and validate the canonical knowledge-bank claim first.
8. Re-run deterministic gates and create a new rendered scorecard.
9. Compare baseline and candidate under neutral labels. Accept the candidate
   only when:
   - every deterministic gate still passes;
   - weighted score improves by at least 2 points, or a failed gate becomes a
     pass;
   - no critical criterion regresses;
   - no criterion drops below 4;
   - the repair's anti-gaming check passes.
10. Revert a candidate that does not meet the acceptance rule, record what was
    learned, and try a different bounded repair.

## Release Loop

When the fast target is reached:

1. Produce two scorecards from fresh judge contexts and run
   `npm run eval:portfolio -- --profile release --scorecard path/to/scorecard-a.json --confirming-scorecard path/to/scorecard-b.json`.
2. Verify rendered desktop and 320/390px mobile routes, keyboard order, focus
   states, console output, external links, metadata, robots, sitemap, resume,
   citations, and contact behavior.
3. Ensure the second judge did not see the first judge's numeric scores.
4. Require both scorecards to pass. The result is stable when the weighted totals
   differ by no more than 2 points, all criteria remain at least 4, and the same
   release recommendation is returned.
5. Stop at `application-ready` when the application path is trustworthy.
6. Stop at `production-ready` only after all release gates pass and Jamie gives
   explicit approval. Agent repetition cannot substitute for consent or launch
   authority.

## Optimization Order

1. factual accuracy and contextual integrity
2. working resume, contact, and application path
3. positioning and role-fit clarity
4. proof specificity and reader effort
5. narrative and visual finish
6. optional depth, imagery, and archival enrichment

The desired local maximum is not maximum disclosure or maximum rhetoric. It is
the strongest public-safe account the evidence and context can sustain, made
easy for the intended reader to understand and act on.
