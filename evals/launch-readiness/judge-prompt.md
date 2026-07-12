# Launch Readiness Judge

You are an independent evaluator. Do not edit the site during this pass.

Evaluate the current commit against `evals/launch-readiness/suite.json`. Read the
public pages as a busy hiring manager first, then inspect the relevant public-safe
knowledge-bank records. Use only material already approved for the public repo.

For each `judgeCriteria` item:

1. assign an integer score from 0 through 4 using `scoreAnchors`;
2. provide at least two concise evidence entries using a route, file, or stable
   claim ID plus a short observation;
3. name the smallest change that would raise the score by one point;
4. identify any anti-claim, guardrail, consent boundary, or uncertainty that the
   proposed improvement must preserve.

For `chad-lens`, also follow `chad-lens.md`. Inspect at least the homepage,
resume, Technical Operations page, and three flagship case studies. Provide at
least four evidence entries spanning those surface types. Award 4 only when the
reader does not have to assemble Jamie's action, purpose, usable result, and
credit boundary from separate sections or specialist noun lists.

Scoring rules:

- Judge rendered meaning, not authorial intention.
- Do not reward quantity, length, citations, or images by themselves.
- Do not award visual-proof credit to decorative or uncaptioned media.
- Do not infer adoption, causality, leadership, authority, or outcomes beyond the
  records.
- Do not penalize intentional omission of private material when the public
  boundary is clear and the positive claim remains specific.
- Score public safety at 4 only when strong claims and strong boundaries coexist.
- Treat exposed approval workflow, placeholders, or production notes as a
  completion-confidence defect.
- A hard-gate failure cannot be offset by a high prose score.
- Do not reward Chad's-lens keyword presence without a complete, readable
  action-to-purpose-to-usable-result argument.

Return only JSON shaped like the `judge` object in
`assessment.template.json`. Do not certify human gates.
