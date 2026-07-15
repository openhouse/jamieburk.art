# Review Checklist

Use this checklist before staging review, production review, or any PR that
changes public claims.

- [ ] Every public claim has a matching entry in `docs/knowledge-bank/claims.md`.
- [ ] Every new public-safe fragment has an intake record, next action, and projection intent.
- [ ] Every supplied URL has been close-read into support and non-support boundaries before it is used as evidence.
- [ ] Memories that exceed current evidence remain hypotheses linked to research inquiries.
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
- [ ] Mature bank-only claims are not projected merely because they are interesting.
- [ ] Existing consequential site claims have source-discovery inquiries when citation support is incomplete.
- [ ] Photo discoveries return as leads and do not inherit identity, role, rights, consent, or publication approval.
- [ ] Metrics are approved, softened, or explicitly bounded.
- [ ] Mutable Facebook event-card numeric displays retain their observed labels or are explicitly treated as unlabeled; they are not summed or described as attendance, unique people, reach, endorsement, or impact.
- [ ] Complete event-control accounting is not described as complete content recovery, a native platform export, or a complete lifetime history.
- [ ] Personal Facebook event counts keep the 502-record Past events surface,
  21-record hosted-events tab, 18-record overlap, and 505-record union distinct.
- [ ] Facebook hosted-events-tab membership and displayed host labels are not
  treated as sole authorship, production responsibility, attendance, or impact.
- [ ] WOW List's current zero-event display and bounded historical non-recovery
  are not rewritten as proof that no event ever existed.
- [ ] Personal association rows, host networks, guest context, exact private
  locations, raw descriptions, comments, and account state remain outside the repo.
- [ ] URLs found in event descriptions remain research routes until close reading
  establishes what each destination supports and does not support.
- [ ] Event pages are not used to assign individual authorship, sole organization, or policy causality without separate evidence.
- [ ] Public event ledgers exclude guest and attendee identities, invite context, comments, working-document locators, meeting access, credentials, and private analytics.
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
- [ ] `npm run knowledge-bank` passes.
- [ ] `npm run public-safety` passes.
- [ ] `npm run check:routes` passes.
- [ ] `npm run preflight:staging` passes.
- [ ] `npm run preflight:production` passes only with explicit production
  indexing environment variables.
- [ ] Jamie has approved production launch content.
