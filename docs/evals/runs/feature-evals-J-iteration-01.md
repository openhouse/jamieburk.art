# feature/evals-J - Iteration 01

## Frozen inputs

- Base candidate: `2ec37fe6e47d11e600ede204d19a98f7d3cff139`
- Rubric: `.agents/evals/portfolio-production-readiness.json`
- Selected criterion: `PR-007 - CTA labels match their actions`
- Adjacent criteria: `PR-001 - Two-minute application comprehension` and
  `PR-004 - Voice, compression, and reading burden`

## Baseline evidence

Three shared components labeled links to the HTML resume page as downloads:

- `apps/www/src/components/Hero.tsx`
- `apps/www/src/components/CaseStudyLayout.tsx`
- `apps/www/src/components/ContactCTA.tsx`

The homepage also used the unexplained employer-specific acronym `OTI`. Public
copy on the About page and KC Town Hall case study described goals as
ambiguous, despite Jamie's stated preference to frame work as emerging or still
taking shape.

## Change

- Point every shared resume-download action to the approved PDF and add the
  `download` behavior.
- Use the truthful label `Download resume PDF`.
- Replace the homepage acronym with the general role family.
- Frame goals and work as emerging, while preserving the site's concrete
  operating-structure promise.
- Add source-level regression checks for mislabeled resume actions,
  `ambiguous goals`, and the unexplained homepage acronym.

## Result

- `PR-007` deterministic source contract: reached in this branch.
- `npm run preflight:staging`: passed.
- `npm run preflight:production`: passed.
- Browser review: homepage and CallNYC rendered without horizontal overflow at
  desktop and 320px; resume-download links resolved to the approved PDF;
  headings and CTAs remained legible; browser console errors: none.
- Skip-link presence: observed. Keyboard focus visibility: `not_observed`
  because the browser harness did not produce a reliable focus transition.
- `PR-001` and `PR-004` full scores: `not_observed`; independent blind judges
  remain required.
- Overall application-share and production-launch eligibility: `not_observed`
  until a complete run record is graded and approved against the final commit.
- Decision: accept the bounded iteration. Continue with independent judges,
  complete accessibility testing, production cutover evidence, a second
  unchanged passing run, and Jamie's approval of the exact candidate.

No private source material, new claim, collaborator-sensitive artifact, or
production deployment is introduced by this iteration.
