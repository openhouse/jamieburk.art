---
rfc: 12
title: Public Engagement Pathway for a Bounded Working Session
stage: proposed
start_date: 2026-09-04
authors:
  - Jamie Burkart
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - public-portfolio
  - editorial
  - privacy-governance
  - accessibility
  - knowledge-architecture
implementation: null
supersedes: []
superseded_by: null
---

# Public Engagement Pathway for a Bounded Working Session

> **Proposal boundary**
>
> This RFC proposes public information architecture and copy for review. It
> does not authorize implementation, publication, public pricing, deployment,
> production indexing, or representation of any past or current client
> engagement.

## Summary

Add one concise, outcome-led engagement pathway to the existing Contact page:
a paid, 60-minute working session with one outcome agreed in advance and a
usable takeaway. Preserve full-time roles, larger projects, referrals, and
collaboration as equally visible ways to contact Jamie. Use the About page only
as a supporting link into Contact; do not create a new Services route, booking
system, public price, testimonial, or case study for this proposal.

## Motivation

The current site describes Jamie's practice and invites “consulting
conversations,” but it leaves a high-intent reader to invent the first useful
step. That is an observable information-architecture gap: the Contact page
names categories of interest without explaining what a small, concrete
engagement would involve or produce.

The working assumption is that some prospective employers, clients, and
collaborators can recognize Jamie's value more easily through a bounded piece
of work than through an undefined exploratory call. This proposal tests that
assumption without converting any private opportunity, conversation, or
relationship into public content and without presenting an untested offer as a
proven client outcome.

## Goals

- Give a high-intent reader one legible, low-commitment way to begin paid work.
- Lead with a problem and usable outcome rather than selling undifferentiated
  time.
- Make the paid boundary, 60-minute boundary, and separate continuation
  decision explicit.
- Preserve employment, project, referral, and collaboration pathways.
- Reuse the existing Contact page and email channel.
- Keep the copy public-safe, accessible, and easy to revise or remove.
- Learn from inquiries without adding tracking, analytics, or private records
  to the public repository.

## Non-goals

- Do not publish the identity, statements, correspondence, transcript,
  relationship state, negotiating history, or presumed intent of any person or
  organization that informed private practice development.
- Do not claim that the proposed session has already produced a client result.
- Do not imply a testimonial, endorsement, client relationship, retained role,
  or accepted offer.
- Do not publish a price until Jamie makes a separate public-pricing decision.
- Do not create `/services`, a booking widget, a calendar integration, a
  checkout flow, a contact form, a CRM, analytics, or authentication.
- Do not make a session the only way to hire or collaborate with Jamie.
- Do not authorize implementation, publication, deployment, or indexing.

## Terminology

**Working session**
: One paid, 60-minute collaborative session organized around an agreed problem
  and outcome. It is neither a free discovery call nor an automatically
  recurring engagement.

**Usable takeaway**
: A bounded artifact made during or immediately from the session, such as a
  decision brief, system map, evaluation frame, or next-step plan. Its exact
  form is agreed in advance and must fit the hour.

**Engagement pathway**
: A clear public description of how someone may begin working with Jamie. It is
  an invitation, not evidence that a particular engagement exists.

**Continuation decision**
: A new mutual choice after the session. One session does not authorize or
  obligate another session, project, retainer, employment relationship, or
  other work.

## Detailed design

### Information architecture

Use `/contact` as the primary surface because it is already the destination for
roles, referrals, consulting, and collaboration. Add a compact section below
the opening paragraph and above the contact details. The existing email link is
the action; no new collection system is required.

Use `/about` only as a supporting path. If the RFC is later accepted, one short
link near the existing Contact call to action may say “Start with a focused
working session.” The full explanation remains on Contact so the site has one
canonical place to maintain the offer.

A standalone Services page is premature. One proposed entry offer does not yet
justify a new top-level content category, and a new route would ask readers to
decide what kind of buyer they are before they understand the work.

### Reader sequence

The section answers five questions in this order:

1. **What is it?** One paid, focused 60-minute working session.
2. **What can I bring?** A decision, knowledge bottleneck, implementation
   problem, or emerging system that needs structure.
3. **What happens?** Jamie and the participant agree one useful outcome in
   advance and work on it together.
4. **What do I leave with?** A concise, fit-to-hour artifact.
5. **What happens next?** Nothing automatically; both parties decide
   separately whether further work would help.

### Proposed public copy

**Start with one focused working session**

Start with one paid, focused 60-minute working session. Bring a decision, knowledge bottleneck, or implementation problem. We’ll name one useful outcome in advance and turn the hour into a concise artifact—such as a decision brief, system map, or next-step plan. The session stands on its own. Afterward, we can separately decide whether more work would help. You can also contact me about full-time roles, larger projects, referrals, or collaboration.

**Call to action:** Propose a working session

The call to action opens the existing public email address. A future
implementation may prefill only a generic subject. It must not encode a client
name, private source, relationship identifier, or sensitive query parameter.

### Fit and boundary examples

Good candidates have a question small enough to improve within an hour and
important enough that a concrete artifact will reduce uncertainty afterward.
Examples include clarifying a project decision, mapping a knowledge flow,
framing an implementation sequence, or designing a bounded evaluation.

The session should not promise a complete strategy, application build, source
archive, legal conclusion, organizational transformation, or unlimited
follow-up. If the desired outcome cannot responsibly fit the hour, the response
should narrow it or propose a separate project discussion.

### Positioning

The site should frame the session as an access point to Jamie's broader
practice, not as a commodity hour. The object being offered is a bounded
decision-and-artifact loop: clarify, work, leave something usable, then choose.
The duration controls scope; the outcome explains value.

Employment and larger engagements remain explicit. The page must not suggest
that Jamie is available only as an hourly consultant or that every initial
conversation is billable. Referrals and ordinary collaboration inquiries still
have a clear route.

### Information placement boundary

Anything committed to this repository is public, even when it is not rendered
on the website. The pathway therefore uses three information planes rather
than treating the private sidecar as a container for every non-public file.

| Plane | What belongs there | What does not belong there |
| --- | --- | --- |
| Public website | The general paid-session offer; representative problem types and artifacts; the 60-minute and stand-alone boundaries; separate continuation choice; employment, project, referral, and collaboration paths; the public email action | A person's identity, private quotation, relationship or negotiation state, presumed intent, private rate, private source route, testimonial implication, or unsupported outcome |
| Public repository, not website copy | This RFC; generic adversarial evaluator cases; clearly labeled fictionalized page-owner assignments and their public-source bases | A private repository locator or backlink, protected evidence, or any claim that the modeled owners participated, approved, or endorsed the page |
| Private sidecar Knowledge Wiki | Named relationship context; governed chronology; commercial and communication state; bounded interpretation; agreement drafts; source dispositions; governed pointers; links from private records to stable public IDs | Credentials, authenticated browser state, full account exports, unrestricted source binaries, raw message databases, or an automatic power to publish |
| Source vault outside Git | Raw transcripts and correspondence; message databases; full account exports; credentials and session state; sensitive source binaries retained under their own custody rules | Public copy, Git history, or a claim that access establishes consent or publication permission |

The page-owner names are transparent repository governance, not public-site
content. Their assessments may use only the exact public candidate and public
sources. Any deliberation that depends on a named private relationship stays
in the private sidecar and cannot be cited as a public endorsement.

A private record may point to a stable public projection ID. The public graph
never points back, reveals the private topology, or depends on private access
to build. Moving an insight outward requires a separate public candidate that
removes identifying provenance, states evidence and limits, and returns the
exact wording to Jamie for a publication decision.

### Pricing

The session is described as paid so compensation is not ambiguous. The amount
is intentionally absent. Before publishing a number, Jamie should decide
whether a public rate improves qualification enough to justify reduced
flexibility, and whether the rate, payment timing, cancellation terms, and tax
handling are ready to be stated consistently.

Pricing shared privately for a particular inquiry does not by itself authorize
public pricing.

### State model

```text
public copy draft
  -> human review
  -> RFC decision
  -> bounded implementation candidate
  -> accessibility and public-safety checks
  -> Jamie publication approval
  -> staging observation
  -> Jamie production/indexing approval
```

No automated step collapses these states. “Ready for human review” never means
published, accepted, deployed, or indexed.

## Security and privacy

The public offer is a new statement of Jamie's practice. Its existence may be
informed by private learning, but its public validity cannot depend on revealing
the private origin. The public surface must not identify a specific prospect,
company, conversation, transcript, message, relationship state, proposal,
negotiation, private rate, presumed intention, protected source locator, or
private repository.

Public copy must not reverse-engineer an identifiable private exchange through
distinctive quotation or unusually specific chronology. It must not imply that
someone requested, endorsed, bought, accepted, or benefited from the offer.
An inquiry received after publication remains private by default and is not a
testimonial or case study.

The Contact page continues to use a direct `mailto:` link. This proposal adds no
new storage, cookies, third-party script, behavioral analytics, or sensitive
form processing. Email custody and deletion remain outside the public
repository.

## Publication workflow

1. Keep this RFC at `proposed` while reviewing positioning, copy, and price
   posture.
2. Jamie decides whether to accept the design and whether the public session
   should remain price-opaque.
3. A separate implementation change adds only the accepted copy and link to the
   existing public surfaces.
4. Run exact-candidate RFC, public-language, accessibility, route, build, and
   public-safety checks.
5. Jamie reviews the rendered staging page, including mobile layout and the
   resulting email action.
6. Jamie separately authorizes publication, deployment, and production
   indexing.
7. Inquiries and outcomes remain private unless a later publication packet has
   its own factual, rights, consent, attribution, and approval basis.

## Rollout plan

### Phase 0 — proposal and evaluation

- Review this RFC and its exact public copy.
- Pressure-test privacy, reader burden, pathway completeness, and authority.
- Leave the live site unchanged.

### Phase 1 — bounded implementation candidate

After RFC acceptance, add the Contact section and, if still useful, one About
link. Reuse existing components and styles. Do not add a route or dependency.

### Phase 2 — staging observation

Verify heading order, link purpose, keyboard operation, focus visibility,
mobile reading order, metadata, and plain-language comprehension. Confirm that
the pathway remains secondary to the portfolio's broader hiring position.

### Phase 3 — optional production release

Only after Jamie's exact-candidate approval, deploy and decide separately
whether production indexing is authorized. A simple rollback removes the new
section and supporting link without affecting the Contact route.

### Phase 4 — learning review

After enough real inquiries to be informative, review whether readers
understand fit, whether the one-hour boundary is workable, whether the takeaway
is consistently achievable, and whether a public price or dedicated route is
actually warranted. No individual inquiry is published by default.

## Decision gates

- Jamie approves, revises, or rejects the public positioning.
- Jamie decides whether the session is exactly 60 minutes on the public page.
- Jamie decides whether public pricing remains absent.
- Jamie accepts the RFC before implementation begins.
- Jamie reviews the exact rendered copy before publication.
- Accessibility, public-language, route, build, and public-safety checks pass
  for the exact candidate.
- Jamie separately approves deployment and production indexing.
- Any future named outcome, quotation, endorsement, or case study receives its
  own evidence, rights, consent, attribution, affected-person, and publication
  review.

## Drawbacks

- A paid first step may deter people who expect an exploratory conversation.
- Omitting the price preserves flexibility but adds an email round trip.
- A one-hour frame may encourage overly large requests unless fit language and
  advance scoping remain clear.
- An artifact expectation creates preparation and follow-up pressure; the
  agreement must keep the takeaway proportionate to the hour.
- Adding another hiring path can dilute Jamie's full-time and implementation
  leadership positioning if the surrounding copy is not balanced.
- A direct email channel provides less structured qualification than a form,
  but avoids new data collection and infrastructure.

## Alternatives

### Keep the current generic consulting invitation

This has the lowest maintenance cost but leaves the first useful step and its
value undefined.

### Publish an hourly rate without an offer structure

This makes price visible but commoditizes time, provides no outcome model, and
does not help a reader recognize fit.

### Create a Services page now

This offers more room but creates navigation and maintenance weight before the
practice has enough distinct, tested offers to justify a category.

### Add a booking and payment platform

This lowers scheduling friction only after the offer is already understood. It
introduces privacy, accessibility, vendor, cancellation, and operational
questions that are unnecessary for the first test.

### Offer a free discovery call

This is familiar but reproduces ambiguity about whose problem is being worked
on and when compensated work begins. A brief fit check may still occur by
email; substantive working time is paid.

### Publish the private origin story as a case study

This would create narrative specificity at the cost of privacy, consent,
factual posture, and relationship safety. It is not acceptable for this
proposal.

## Unresolved questions

- Should the public copy say “60-minute” or use the more flexible “one focused
  session” while the agreement carries the duration?
- Should a private price be supplied in the first reply or only after fit is
  confirmed?
- Does the About page need a supporting link, or is Contact discoverable enough
  without it?
- What minimum preparation produces a useful hour without turning the inquiry
  into unpaid consulting?
- Which artifact examples are most legible to hiring managers as well as
  prospective consulting clients?
- What observation period and evidence would justify revisiting a public price
  or standalone Services route?
