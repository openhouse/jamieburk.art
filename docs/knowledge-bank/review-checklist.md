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
- [ ] Case studies distinguish delivered outputs, observed adoption, outcome
  status, and causal boundaries.
- [ ] High-value exact-role claims have corroboration status and a next action.
- [ ] Textual artifact descriptions are not represented as approved images.
- [ ] Archive coverage records offline work, failures, maintenance, and
  non-recovery without equating survival with importance.
- [ ] No raw transcripts, private notes, legal-review materials, stakeholder
  lists, private rows, private screenshots, private photos, private fonts,
  credentials, or private correspondence have been committed.
- [ ] No public `/proofs`, `/knowledge-bank`, or `/public-claims` route exists.
- [ ] `npm run knowledge-bank` passes.
- [ ] `npm run public-safety` passes.
- [ ] `npm run check:routes` passes.
- [ ] `npm run evals:knowledge-lifecycle` scores at least 95/100 with no hard
  failures.
- [ ] `npm run evals:chad` scores at least 90/100 with no hard failures.
- [ ] `npm run evals:callnyc-x` scores 100/100 with no hard failures.
- [ ] `npm run evals:wowlist-x` scores 100/100 with no hard failures.
- [ ] `npm run check:nycartc-corpus` reproduces the governed corpus and hashes.
- [ ] `npm run evals:nycartc-x` scores 100/100 with no hard failures.
- [ ] `npm run evals:urbanhermit-x` scores 100/100 with no hard failures.
- [ ] `npm run evals:nycac-facebook-events` scores 100/100 with no hard failures.
- [ ] `npm run evals:blind-spots` gives each of the seven criteria 100/100 with
  truthful state semantics.
- [ ] `npm run evals:margaret-morse` scores 100/100 without reducing artistic,
  embodied, participatory, or media-archaeological work to utility.
- [ ] `npm run evals:warren-sack` scores 100/100 while preserving recursive
  relational thinking, prototype range, and collective authorship.
- [ ] `npm run evals:recursive` passes.
- [ ] `npm run preflight:staging` passes.
- [ ] `npm run preflight:production` passes only with explicit production
  indexing environment variables.
- [ ] Jamie has approved production launch content.
- [ ] Five real no-coaching hiring-comprehension sessions meet the external
  criterion; automated or role-play reviews are not counted.
