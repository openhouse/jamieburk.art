---
rfc: 12
title: Public Engagement Pathway for Focused Consulting and Implementation
stage: proposed
start_date: 2026-09-04
authors:
  - Jamie Burkart
  - Codex, AI-assisted draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - public-portfolio
  - information-architecture
  - editorial
  - privacy-governance
  - accessibility
  - deployment
implementation: null
supersedes: []
superseded_by: null
---

# Public Engagement Pathway for Focused Consulting and Implementation

> **Proposal and evidence boundary**
>
> This RFC proposes a public pathway; it does not authorize page changes,
> pricing, publication, deployment, or indexing. The proposal stands only on
> Jamie's existing public-safe portfolio evidence and a self-authored statement
> of availability. Private conversations, relationship records, expressions of
> interest, transcripts, negotiations, and draft agreements are neither source
> material nor evidence of demand, adoption, endorsement, or an engagement.

## Summary

Add a concise, public-safe engagement pathway to the existing Contact page so a
visitor can understand how a small working session may, by separate agreement,
lead to a diagnostic or implementation engagement. Keep interest in salaried
and embedded roles equally visible and distinct. The first version should reuse
the current information architecture and email contact path, add no top-level
navigation item or commerce system, publish no fee without Jamie's separate
approval, and make every expansion of scope a new mutual decision.

## Motivation

The portfolio already explains Jamie's operating practice and invites roles,
referrals, focused consulting, and collaboration. It does not yet help a
prospective collaborator recognize the smallest sensible way to begin or
understand how a conversation differs from paid work, a diagnostic, or an
implementation engagement.

That ambiguity increases the visitor's response burden and can encourage useful
working time to accumulate before scope, compensation, authority, or an exit is
clear. A compact pathway can make the offer legible without recasting the whole
portfolio as a consultancy or revealing the private circumstances that made the
design question salient.

The observed public problem is limited: the Contact page names consulting but
does not explain a path into it. Whether visitors want these engagement forms,
whether fees should appear publicly, and whether the pathway merits a dedicated
route are assumptions to test after Jamie authorizes an implementation.

## Goals

- Let a visitor distinguish interest in a role from interest in scoped work.
- State one low-burden, paid starting shape without promising free discovery.
- Show three progressively broader engagement forms in buyer-decision language.
- Require separate scope and authorization at every transition.
- Reuse the existing Contact route and truthful email interaction.
- Keep the public offer fully supportable without private evidence.
- Provide deterministic and reader-review gates before any publication.

## Non-goals

- Do not publish or allude to a named private relationship, conversation,
  transcript, negotiation, opportunity, budget, proposal, or agreement.
- Do not claim an existing client, engagement, endorsement, adoption, measured
  result, pipeline, demand signal, or market validation.
- Do not approve a fee, minimum, retainer, package price, cancellation term, or
  contract language for the public site.
- Do not create a Services route, top-level navigation item, checkout, payment
  flow, scheduling integration, intake database, client portal, or new runtime
  dependency.
- Do not replace the path for salaried, embedded, public-interest, or long-term
  roles with consulting language.
- Do not implement, merge, deploy, or index the proposal.

## Terminology

**Public engagement pathway**
: A short explanation of recognizable ways to begin working with Jamie. It is
  an invitation to discuss fit, not a binding offer or evidence of prior demand.

**Focused working session**
: A separately authorized session organized around one consequential decision,
  knot, or working artifact and one bounded useful outcome.

**Knowledge operations diagnostic**
: A separately scoped review of a bounded workflow, evidence base, team-memory
  problem, or implementation question.

**Implementation or fractional operations**
: A separately agreed period of delivery, adoption support, documentation, or
  operating leadership with explicit scope, cadence, authority, and exit terms.

**Separate authorization**
: A fresh affirmative agreement on scope, compensation, timing, authority, and
  outputs. A preceding conversation or engagement never supplies it implicitly.

## Detailed design

### Information architecture

Use the existing `/contact` route as the canonical engagement surface. The
Technical Operations & Implementation page may receive one contextual link to
that surface if implementation is later authorized. The homepage and primary
navigation should not grow a new Services destination in the first iteration.

The Contact page should make two visitor intentions visibly distinct:

1. **Roles and embedded leadership** — continue to the resume or email Jamie
   about a role, referral, or longer-term operating need.
2. **Scoped work** — inspect the three-step engagement pathway and email Jamie
   to discuss the smallest fitting start.

This keeps one canonical contact location, preserves the portfolio's current
role positioning, and lets observed use—not speculation—justify any future
dedicated route.

### Engagement ladder

The public surface should describe three options as decisions, not packages:

| Engagement form | Question for the visitor | Bounded outcome | Continuation |
|---|---|---|---|
| Focused working session | Is there one important decision, knot, or working artifact that would benefit from an hour of structured attention? | A clarified question, decision map, or agreed next step appropriate to the session. | None unless separately proposed and authorized. |
| Knowledge operations diagnostic | Does a bounded workflow, evidence base, or team-memory problem need diagnosis before implementation? | A scoped map of what is known, open, protected, risky, and worth doing next. | Implementation remains a separate decision. |
| Implementation or fractional operations | Is there enough shared understanding to scope delivery, adoption, documentation, and handoff? | A separately agreed engagement with explicit scope, authority, cadence, and exit conditions. | Extension or renewal requires a new agreement. |

The sequence is available but not mandatory. A visitor may begin at the fitting
level. Each item should state who the work is for, the decision it helps make,
the kind of outcome it can produce, and the boundary around continuation. Exact
deliverables belong in the later agreement, not in broad public copy.

### Call to action

Use **See ways to work together** for a supporting link into the existing
Contact page. On that page, use one primary action: **Discuss a working
session**. It should open the existing email interaction. Each label must
describe what the action actually does; neither may say book, buy, reserve, or
start when no calendar, payment, acceptance, or contract occurs.

The email prompt may ask for:

- the decision, knot, or artifact involved;
- why it matters now;
- who needs to use the result; and
- any real deadline or access constraint.

Those prompts are an aid to fit, not a prerequisite for contact and not consent
to begin work.

### Pricing posture

Do not publish an exact fee in the first implementation unless Jamie separately
approves the number, currency, unit, effective date, and conditions against the
exact candidate. The initial surface may say that scope, timing, and fees are
confirmed in writing before paid work begins. Private negotiations and draft
agreements cannot establish public pricing or market validation.

### Evidence and claims

The surface may rely on existing approved public portfolio evidence to explain
Jamie’s capabilities. It may also state Jamie's current availability to discuss
work after Jamie approves that exact wording. It may not use private records to
claim that anyone has hired, retained, requested, endorsed, adopted, paid, or
measured the work.

Public examples should link to existing case studies rather than introduce
private or hypothetical clients. Any stronger factual claim must first exist in
the canonical knowledge bank with its source, support, guardrail, public-use
boundary, and review date.

## Security and privacy

The principal leakage risk is inferential: public copy could paraphrase a
private conversation closely enough to identify a person, relationship, budget,
or live opportunity even without quoting it. Review must therefore assess
provenance and dependency, not only search for names.

The public offer must pass a deletion test: if every private transcript,
correspondence record, relationship entry, and draft agreement vanished, the
public wording would remain true, useful, and supportable. A private expression
of interest is not public evidence of a client, demand, endorsement, price, or
result.

No protected locator, private graph edge, private repository identity, contact
record, negotiation state, or private-source-derived anecdote may enter the
public candidate. Uncertainty fails closed to `TODO: Jamie approval required.`

## Publication workflow

1. Jamie decides whether to advance this RFC from `proposed`.
2. An implementation branch drafts only the bounded Contact-page pathway and,
   if still useful, one contextual link from Technical Operations.
3. The candidate uses existing public-safe proof and a separately approved
   self-authored availability statement.
4. Deterministic checks evaluate routing, CTA truth, private-source exclusion,
   pricing posture, separate authorization, and scope boundaries.
5. Fresh readers test whether they can distinguish roles from scoped work and
   select a fitting next step without inventing a client history.
6. Jamie reviews the exact copy, pricing posture, candidate commit, and public
   contact behavior.
7. Merge, deployment, and production indexing remain separate decisions.

Rights, consent, attribution, evidence, editorial selection, publication,
deployment, and indexing remain distinct gates. A passing evaluation satisfies
none of the human gates by itself.

## Rollout plan

1. **Proposal:** Review this RFC, contract, adversarial cases, and new
   production-readiness criterion. No page changes occur.
2. **Bounded prototype, after acceptance:** Draft the two-intention Contact
   layout and three engagement descriptions without changing navigation or
   adding infrastructure.
3. **Reader test:** Give the rendered candidate to role-seeking, public-sector,
   and prospective consulting readers. Measure comprehension, next-action
   clarity, and unintended claims.
4. **Human review:** Jamie approves or revises the exact copy, pricing posture,
   and candidate.
5. **Staging:** Deploy noindex, inspect contact behavior, accessibility, mobile
   layout, metadata, routes, and private-source independence.
6. **Production decision:** Publish and index only after separate approval.
7. **Observation:** Review inquiries after a defined period without storing
   private inquiry bodies in public analytics or the public repository.

Rollback removes the bounded Contact-page pathway and contextual link while
preserving the RFC and review history. The existing email and role pathways
remain available.

## Decision gates

- Jamie decides whether the consulting pathway belongs on the public site.
- Jamie decides whether the three engagement labels fit his practice.
- Jamie approves the exact public copy and availability statement.
- Jamie decides whether to publish a fee and approves its exact conditions.
- Jamie approves any implementation and the exact candidate commit.
- Fresh reader evidence must show that role interest remains legible and that
  the engagement ladder reduces rather than increases decision burden.
- Public-safety review must establish independence from private sources and no
  implied client, demand, endorsement, adoption, payment, or result.
- Merge, staging deployment, production deployment, and indexing remain
  separate human decisions.

## Drawbacks

- Consulting language may dilute Jamie's positioning for salaried or embedded
  roles if it becomes visually dominant.
- Three options may create choice burden if their distinctions are vague.
- Withholding price may add an email round trip; publishing price prematurely
  may constrain an untested offer or disclose a private negotiation posture.
- An hourly starting point can encourage buyers to focus on time rather than
  the decision or outcome unless the copy leads with the problem.
- A minimal Contact-page treatment may be less discoverable than a dedicated
  route, though it is safer while the pathway is unvalidated.
- Public language can still reveal private context by implication, so lexical
  redaction alone is insufficient.

## Alternatives

**Do nothing** preserves the current role-first positioning but leaves
prospective consulting collaborators without a clear, compensated starting
path.

**Create a dedicated Services route now** gives the offer more room but adds
navigation and content weight before use has shown that the pathway deserves a
separate destination.

**Publish only a single hourly session** is simple, but hides the meaningful
path from diagnosis to implementation and may make Jamie appear to sell time
rather than operating outcomes.

**Publish prices immediately** may reduce inquiry friction, but an exact fee is
a separate positioning decision and cannot be inferred from private material.

**Use a booking and checkout product** can automate scheduling and payment, but
adds integration, accessibility, privacy, cancellation, and operational work
outside the bounded V1 need.

**Tell the origin story of the pathway** might make the page feel specific, but
would turn a private relationship into public marketing evidence. The design
can retain the learning without publishing its provenance.

## Unresolved questions

- Should the public label be “Focused working session,” “Decision session,” or
  another phrase that prospective collaborators understand more quickly?
- Should the first version name a one-hour duration or describe only a bounded
  session until the operating pattern has been tested?
- Should exact pricing remain inquiry-only or become public after the offer has
  been used and reviewed?
- What evidence and observation period would justify a dedicated route or a
  top-level navigation item?
- Which two existing public case studies best help a visitor recognize the fit
  without adding proof burden to the Contact page?
- How should the pathway describe availability if Jamie is simultaneously open
  to salaried roles, fractional work, and bounded consulting?
