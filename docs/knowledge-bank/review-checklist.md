# Review Checklist

Use this checklist before staging review, production review, or any PR that
changes public claims.

- [ ] Every public claim has a matching entry in `docs/knowledge-bank/claims.md`.
- [ ] Every structured proof in `apps/www/src/data/proofs.ts` has status,
  support level, evidence class, guardrail, protected boundaries, and review
  date.
- [ ] Homepage claims are compact and understandable in one pass.
- [ ] Resume claims match the approved resume and do not invent stronger
  language.
- [ ] Technical Operations claims answer "toward what end?"
- [ ] Work metadata includes `proofBankIds` for strong or metric-bearing claims.
- [ ] Pending and private claims are not projected onto public pages.
- [ ] Public pages contain no TODO, placeholder, pending approval,
  before-launch, or screenshot-pending language.
- [ ] Careful claims preserve contribution, stewardship, or collective-work
  language.
- [ ] Metrics are approved, softened, or explicitly bounded.
- [ ] Collaborator-sensitive claims are approved or omitted.
- [ ] NYC Artist Coalition website authorship is visible without overstating
  collective campaign leadership.
- [ ] Source-Backed Team Memory does not expose private collaborator, pricing,
  transcript, or company context.
- [ ] Case studies use public-safe Known / Open / Protected boundaries where
  needed.
- [ ] No raw transcripts, private notes, legal-review materials, stakeholder
  lists, private rows, private screenshots, private photos, private fonts,
  credentials, or private correspondence have been committed.
- [ ] No public `/proofs`, `/knowledge-bank`, or `/public-claims` route exists.
- [ ] `docs/qa/recursive-evals-M.md` has been followed for claim review,
  public-safety boundaries, hiring clarity, web QA, and release gates.
- [ ] `npm run knowledge-bank` passes.
- [ ] `npm run public-safety` passes.
- [ ] `npm run check:knowledge-lifecycle` passes at 68/68.
- [ ] `npm run check:chad-lens` passes at 10/10.
- [ ] `npm run check:evals` passes.
- [ ] `npm run check:routes` passes.
- [ ] `npm run preflight:staging` passes.
- [ ] `npm run preflight:production` passes only with explicit production
  indexing environment variables.
- [ ] Jamie has approved production launch content.
