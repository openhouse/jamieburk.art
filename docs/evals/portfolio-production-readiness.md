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

A candidate is application-share eligible when all of these conditions hold:

- weighted score is at least `0.80`;
- every application-required eval passes;
- every blocking eval scores at least `3` and every nonblocking eval scores at
  least `2`;
- Jamie has approved the exact resume, contact path, and public claim set.

A candidate is production-launch eligible only when all of these conditions
hold:

- every blocking eval passes;
- weighted score is at least `0.90`;
- every blocking eval scores at least `3` and every nonblocking eval scores at
  least `2`;
- the blind-reader comprehension median is at least `4`;
- deterministic checks and the holdout regression pass;
- two consecutive complete runs meet the threshold;
- Jamie has explicitly approved the exact production candidate.

Weighted strength never compensates for a failed blocking eval.

## Chad Lens

`PR-015` makes courageous precision a blocking application criterion. It asks
whether the site gives Jamie full, defensible credit without asking a reader to
decode vague abstractions or converting collective work into solo causality.

A passing candidate makes six things legible on its primary surfaces:

1. Jamie's role;
2. Jamie's action;
3. the practical end of the work;
4. what became usable, changed, launched, or easier to continue;
5. the approved proof for the claim; and
6. the boundary between Jamie's contribution and the collective outcome.

The grader must look for errors in both directions. Understatement includes
hiding supported ownership behind generic helper language, omitting useful
scale, and substituting words such as `systems`, `data`, or `AI` for the actual
work. Overstatement includes unsupported ownership, causality, authority,
scale, current status, or erasure of collaborators. Confidence is not a reason
to exceed the knowledge bank, and caution is not a reason to suppress it.

## Knowledge Lifecycle

`PR-016` through `PR-018` treat the knowledge bank as a production system, not
an appendix to the current website.

- `PR-016` requires lossless public-safe intake and explicit disposition. A
  fragment can mature, remain under research, be deferred, or be rejected, but
  it cannot silently disappear because it was not selected for a page.
- `PR-017` requires source-associated claim maturation. Sources are decomposed
  into what they support, what they do not establish, and what remains open.
  Existing public claims without canonical source coverage become visible
  research backlog.
- `PR-018` requires projection discipline and reciprocal discovery. The bank
  remains deeper than the site; audience-specific compositions select from it;
and photo or reader feedback returns to intake without becoming an automatic
public claim.

## Blind-Spot Evals

`PR-019` through `PR-025` cover failure modes that a source-complete archive
and technically sound site can still miss:

- `PR-019` requires observed response from real target readers and a bounded
  application-outcome loop;
- `PR-020` requires a fully composed flagship civic story rather than scattered
  coalition references;
- `PR-021` inventories collaborator corroboration and consent gaps;
- `PR-022` separates outputs, use, outcomes, and transfer;
- `PR-023` measures whether approved visual and inspectable artifacts reduce
  reading burden;
- `PR-024` requires a legible 2024-2026 capability bridge; and
- `PR-025` requires hands-on human launch QA.

The optimizing agent may prepare `PR-019` and `PR-025`, but it cannot pass
them. A passing record requires independent reviewers, dates, the exact
candidate SHA, and the evidence named in each rubric entry. The machine-readable
status lives in `docs/evals/blind-spot-human-status.json`.

## Margaret Morse And Warren Sack Lenses

`PR-026` and `PR-027` make two dimensions of Jamie's record blocking
application-share criteria.

- `PR-026`, the Margaret Morse lens, asks whether one compact public threshold
  preserves the continuity among artistic, civic, technical, and social work.
  It looks for embodied inquiry, media archaeology, attention, hospitality,
  atmosphere, participation, place, and shared authorship without turning the
  site into a detached autobiography.
- `PR-027`, the Warren Sack lens, asks whether Jamie's recurring technical
  method is inspectable: observe relationships, model or prototype, build an
  interface or inhabitable system, expose it to use, and revise from response.
  It requires prototype, deployment, originality, and collaborative-credit
  boundaries.

Both lenses use independent LLM judges. Historical faculty records are
protected corroborating context, not current blanket endorsements. The public
site uses independently published evidence; raw academic records, grades,
student identifiers, private correspondence, contact information, and
protected screenshots stay outside Git. See
`docs/evals/margaret-morse-and-warren-sack-lenses.md`.

Evidence state, visibility state, and projection state are independent. A
public source may suggest an unresolved claim. A mature public-safe claim may be
held from the current site for composition. A private visual lead may create a
research inquiry without exposing the image or its locator.

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
8. **Confirm success.** A passing run is provisional. Re-run the complete suite
   against the unchanged candidate and require a second consecutive pass.
9. **Stop responsibly.** Stop when the relevant threshold is confirmed, after
   eight iterations, or after three consecutive iterations without score
   improvement. At the latter two limits, report the remaining blocker instead
   of polishing indefinitely.

## Grader Separation

Use three grader roles:

- **Deterministic grader:** commands, HTTP behavior, DOM facts, link targets,
  file presence, schema checks, and deployment smoke tests.
- **LLM judge:** positioning, voice, evidence quality, reading burden, and
  whether artifacts make claims easier to trust. The judge cites visible
  evidence and returns only a score, pass/fail, concise rationale, and findings.
- **Human approver:** public claims, collaborator-sensitive material, images,
  screenshots, contact information, resume artifact, and production cutover.

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
- Chad-lens scorecards with paired public-copy and knowledge-bank citations,
  including explicit understatement and overstatement findings;
- application packet manifest, target-role brief, and cross-surface consistency
  report when evaluating a live application.
- target-reader scorecards and bounded application outcomes for `PR-019`;
- collaborator corroboration, output-transfer, visual-proof, and recent-work
  matrices for `PR-021` through `PR-024`;
- dated hands-on keyboard, screen-reader, mobile, PDF, and trusted-reader
  results for `PR-025`.
- artistic-continuity scorecards, a protected-source boundary audit, and the
  About-page threshold for `PR-026`;
- a recursive-method project map, prototype-production audit, and independent
  scorecards for `PR-027`.

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

For an application-only run, replace `launch threshold` with `application-share
threshold` and do not infer permission to deploy or index production.

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

## Current Observed Failure Seeds

These are starting observations, not permanent special cases. An agent must
reproduce them against the candidate before grading or editing:

- test every canonical route at `320`, `375`, `768`, and `1280` pixels;
- verify that long headings and CTAs do not widen the document;
- verify that labels such as `Download resume` match their destinations;
- reject unexplained employer-specific acronyms in the general hiring path;
- require stable sitemap dates or no sitemap dates;
- distinguish language that makes emerging work inhabitable from language that
  presents ambiguity as personal or organizational failure;
- verify that production serves the reviewed portfolio rather than the previous
  application while preserving the prior project at its intended subdomain.
