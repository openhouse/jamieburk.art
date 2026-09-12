# Knowledge-reading evaluation

RFC 0017's small, pure prototype uses invented data only. No live reader or source
system calls it. The corpus labels are provisional engineering expectations,
authored from observed failure categories and expanded with adversarial cases.
They are neither participant judgments nor a representative sampled dataset.

## Audit findings and response

1. Structural presence and exact-source custody cannot establish a substantive
   close reading. Keep source validation, behavioral state tests, and human
   semantic review as separate gates. This suite tests the middle category.
2. Evaluating only forbidden actions rewards an always-hold model. The corpus
   includes valid authored, scaffold, reference, disagreement-resolution, and
   feedback returns as positive controls. Report valid acceptance and invalid
   rejection with denominators. Do not call these human-calibrated TPR/TNR.
3. A candidate can hide omitted disagreements by supplying its own inventory.
   Require a separately supplied revision-pinned inventory. Its authenticity and
   completeness still require source-adapter and independent human review.
4. Repeatedly tuning on fixtures is development, not a held-out semantic test.
   There is no claimed train/test split, calibrated LLM judge, or measured prose
   accuracy. The proposed participant pilot requires independent cases/labels
   after the bounded reader and source family are selected.

## Run and interpret

- `npm run test:knowledge-reading`: actual input/output tests, including view
  order, dialogue return, scoped retirement, nonmutation, and missing inventory.
- `npm run evals:knowledge-reading`: scenario results plus receipt freshness.
- `npm run evals:knowledge-reading:record`: rerun tests and record current content
  hashes and scenario outcomes. Run only after finishing the candidate edits.
- `npm run check:rfcs`: includes receipt/behavior validation; the aggregate
  `npm run check` also executes the behavioral test suite.

All bound files, including the RFC, cases, test source, this specification, eval
code, package commands, and RFC integration, participate in the receipt. The
receipt excludes itself to avoid a circular hash. A pushed Git commit binds the
receipt too; its exact SHA and hosted check state belong in the pull request.
Any later candidate change requires fresh checks. Passing does not establish
source truth, participant comprehension, human review, approval, or adoption.

The hill climb first improved the empty prototype from 8/34 to 34/34 tests.
Five additional adversarial tests exposed omission and source-identity gaps:
34/39 before the bounded fix, 39/39 afterward. Test counts describe different
specifications at those stages. The report also reruns an explicit allow-all
baseline on the final case corpus; it is not an assessment of legacy production.

## Human pilot, not yet run

Use the RFC's three-reader bounded pilot after authorization. Record each
reader's account of the change, their source retrieval, uncertainty recognition,
recognition that reference creates no obligation, and correction or explicit
decline. Include at least one correction to framing. Record its disposition in
a subsequent version or a reason for declining it. A false commitment or implied
collective endorsement blocks advancement regardless of other successes. Track
repeated explanation and stale drafts as observations; do not infer wellbeing
or agreement from tool usage or throughput. Preserve individual failures instead
of averaging them into an approval score.
