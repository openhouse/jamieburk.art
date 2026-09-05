---
rfc: 14
title: Finite Weekly Review and Sustainable Commitment Protocol
stage: proposed
start_date: 2026-09-05
authors:
  - Jamie Burkart
  - Codex, AI-assisted draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - privacy-governance
  - research-operations
  - editorial
  - accessibility
implementation: null
supersedes: []
superseded_by: null
---

# Finite Weekly Review and Sustainable Commitment Protocol

> **Proposal boundary**
>
> This RFC proposes a review method. It does not authorize implementation,
> collection of personal activity, access to private sources, publication of a
> weekly review, automatic selection of commitments, or any action named in a
> review. Merging a proposed RFC preserves it for discussion; it does not accept
> the design.

## Summary

Create a private-by-default weekly review protocol that distinguishes lived
outcomes from supporting artifacts, retains open loops without converting them
into obligations, permits conscious non-pursuit, protects sustaining capacity
without scoring rest as productivity, and limits the following week to at most
three chosen commitments. The public repository contains only the method,
contract, and synthetic evaluations. Any real weekly record belongs in
operator-local or private-sidecar custody unless Jamie separately approves a
minimal public-safe projection.

## Motivation

The Knowledge Wiki can now preserve increasingly complete records of projects,
relationships, applications, meetings, communications, and source custody. That
strength creates a new failure mode: everything that can be remembered can begin
to feel like something that must be completed. Repository activity can also look
like real-world progress even when no external state changed, while important
lived outcomes can disappear beneath the volume of supporting machinery.

A useful weekly review must therefore do more than count work. It must help Jamie
answer five different questions without collapsing them:

1. What changed in the world or in a relationship?
2. What supporting structures or artifacts became usable?
3. What remains open, waiting, held, or intentionally not pursued?
4. What finite capacity needs protection for its own sake?
5. Which few commitments deserve the next week?

The method should increase contact with reality and reduce compulsory backlog.
It should not create a life-logging product, infer wellbeing from computer
activity, make rest answerable to output, or turn fictionalized analytical
lenses into decision-makers.

## Goals

- Separate source-bounded lived outcomes from operating artifacts and activity.
- Preserve uncertainty and distinguish completed, continuing, waiting, held,
  superseded, and consciously-not-pursuing states.
- Keep every actual weekly review private by default.
- Allow zero to three next-week commitments, with no automatic carryover.
- Provide one default commitment slot each for livelihood, community, and
  sustaining life, without requiring that every slot be filled.
- Protect a capacity boundary without requiring health, sleep, or other intimate
  disclosure.
- Treat rest, pleasure, care, and unstructured time as valuable in themselves,
  never merely as inputs to later productivity.
- Use automation and fictionalized review only as advisory evidence for Jamie's
  judgment.
- Provide deterministic failure cases before any operational implementation.

## Non-goals

- Do not implement a calendar, task manager, wellbeing tracker, journal, time
  tracker, notification system, or public weekly-status route.
- Do not ingest Computer History, private correspondence, calendars, health data,
  location, biometrics, or relationship records through this RFC.
- Do not publish a real weekly review, named relationship interpretation, private
  third-party detail, or protected source locator.
- Do not calculate a productivity grade, moral score, wellness score, utilization
  rate, streak, or comparison with other people.
- Do not require a minimum number of commitments or evidence of rest.
- Do not infer that a draft was sent, an invitation was accepted, a meeting
  produced authority, a pull request was merged, or a repository artifact changed
  the external world.
- Do not authorize work, outreach, spending, publication, deployment, or another
  person's assignment.
- Do not make a simulated reviewer, page owner, model, or evaluator an authority
  over priorities.

## Terminology

**Weekly review record**
: A private, time-bounded interpretation of evidence about one civil week. It is
  correctable working knowledge, not a comprehensive account of a life.

**Lived outcome**
: A source-bounded external or relational change, such as a submitted application,
  completed conversation, accepted responsibility, received response, or human
  decision. Activity and artifacts alone do not establish an outcome.

**Operating artifact**
: A document, pull request, evaluator, transcript, plan, or other structure that
  may make work usable. Its creation is real work but does not by itself establish
  adoption, delivery, response, payment, or impact.

**Open-loop disposition**
: One of `completed`, `continuing`, `waiting`, `held`, `consciously-not-pursuing`,
  or `superseded`. Retention in the graph does not imply future commitment.

**Consciously not pursuing**
: A legitimate current disposition for something worth remembering but not worth
  carrying now. It is not deletion, failure, or a promise to reconsider.

**Commitment budget**
: Zero to three human-chosen, bounded commitments for the next week. The default
  permits at most one commitment in each lane: livelihood, community, and
  sustaining life.

**Sustaining capacity boundary**
: A private or minimally stated limit that protects finite capacity. It may
  concern rest, care, pleasure, relationships, unstructured time, or work limits,
  but it requires no intimate explanation and is not evaluated by later output.

## Detailed design

### Custody and projection

The public repository holds this RFC, its machine-readable contract, synthetic
cases, evaluator, and non-sensitive receipts. A future real weekly review must be
created only in operator-local or private-sidecar custody. The public repository
must never be the default destination for a real review.

A public projection, if later requested, is a separately authored summary. It
must pass public-safety review and Jamie's exact-candidate approval. It cannot be
generated merely by redacting names from a private record because relationship,
health, scheduling, and source details can remain identifying by implication.

### Review layers

The protocol uses six layers:

1. **Window and evidence boundary** — record the civil dates, timezone, source
   classes consulted, source cutoffs, and material gaps. Observation is evidence,
   not instruction.
2. **Lived outcomes** — record only externally or relationally supported changes.
   Each outcome keeps its support state and uncertainty.
3. **Operating artifacts** — record structures that became usable without
   converting them into adoption or external impact.
4. **Open loops and dispositions** — give every reviewed loop an explicit current
   disposition. Do not silently reschedule or carry items forward.
5. **Interpretation** — state what the week appears to mean, keeping fact,
   inference, feeling, and modeled editorial advice distinguishable.
6. **Finite selection** — Jamie chooses zero to three bounded commitments and one
   capacity boundary for the next week.

The layers may be rendered together for private use, but their source types and
authority remain distinct in structured data.

### Lived outcomes and artifacts

Every candidate lived outcome must answer: what changed, for whom, what source
supports that change, and what remains unproven? A Git commit, generated PDF,
draft message, transcript, or test pass belongs under operating artifacts unless
separate evidence establishes an external change.

Examples:

| Observation | Allowed weekly state | Not established |
|---|---|---|
| Application confirmation received | lived outcome: submitted | interview, qualification, or hiring |
| Meeting occurred and participants spoke | lived outcome: conversation occurred | collective decision or assignment |
| Pull request opened and tests passed | operating artifact | merge, deployment, adoption, or impact |
| Message draft exists | operating artifact | sent, delivered, read, or accepted |

### Open loops without compulsory backlog

Every open loop reviewed during the week receives one disposition. `Waiting` means
another event or person is currently required. `Held` means a named gate prevents
safe progress. `Consciously-not-pursuing` means Jamie declines to allocate current
attention while preserving enough context to understand the decision later.

No state automatically becomes a next-week commitment. Carryover is a fresh human
choice. An automation may surface candidates and their evidence, but it cannot
select, schedule, or reactivate them.

### Commitment budget

The default budget is at most three commitments and at most one in each lane:

- **Livelihood** — a bounded step affecting employment, paid practice, or material
  stability.
- **Community** — a bounded step supporting collective, civic, relational, or
  stewardship work.
- **Sustaining life** — a bounded protection or experience valuable in itself,
  including rest, care, pleasure, relationship, or unstructured time.

Zero commitments is valid. A commitment must name an observable stopping point,
not an unbounded ambition such as “work through the whole backlog.” The lanes are
selection aids, not moral quotas. A future accepted implementation may permit a
human-recorded exception, but automation must never expand the default budget.

### Sustaining capacity

The review records only whether a capacity boundary exists. It must not require
hours slept, diagnoses, symptoms, medication, biometrics, reasons for rest, or a
demonstration that rest improved output. Jamie may privately write more, but the
protocol cannot require, score, or publicly project it.

### Automation and modeled review

Computer activity, Git history, calendars, and message state may become candidate
evidence only through separately authorized, source-appropriate access. Automated
observations remain incomplete and untrusted until human review. Absence of
captured activity is not absence of life, rest, care, or work.

Fictionalized analytical lenses may challenge the interpretation, surface
tradeoffs, or suggest candidates. They are not quotations, endorsements,
participants, page-owner approvals, or priority authorities. Jamie chooses every
commitment and outward action.

### Evaluation behavior

The deterministic evaluator fails closed when a candidate:

- exceeds the three-commitment or one-per-lane budget;
- automatically carries open loops forward;
- presents artifacts as external outcomes;
- claims unsupported completion of external actions;
- treats rest as a productivity optimization variable;
- requires intimate health or bodily disclosure;
- treats captured computer activity as authoritative without human review;
- gives a modeled reviewer action authority; or
- automatically projects private detail to a public surface.

The evaluator may mark a structurally sound candidate `ready-for-human-review`.
That state authorizes no action or publication.

## Security and privacy

Weekly reviews can reveal routines, relationships, employment activity, political
work, finances, health, location, emotional state, and third-party confidences.
They are high-risk compound records even when each individual fact seems ordinary.
Private-by-default custody and minimum-necessary collection are hard boundaries.

No credential, private source locator, raw transcript, message body, calendar
detail, third-party health detail, negotiation state, or inferred relationship
condition belongs in public Git. A public projection must be independently useful
without private provenance. Uncertainty fails closed.

Observation tools must never run, broaden their scope, or change settings under
this RFC. Access, collection, retention, interpretation, publication, and action
remain separate authorizations.

## Publication workflow

1. Keep the complete weekly review in private-sidecar or operator-local custody.
2. Mark every source, inference, disposition, and uncertainty before selection.
3. Let Jamie approve the private interpretation and choose the next commitments.
4. If a public summary is desired, compose a new minimum-necessary projection
   from public-safe facts; do not publish the private record with redactions.
5. Run public-safety and claim-governance checks against the exact projection.
6. Obtain Jamie's approval for the exact text, destination, and timing.
7. Treat merge, deployment, indexing, sending, and another person's acceptance as
   separate states.

No evaluator, role-play, PR, or RFC stage supplies publication authority.

## Rollout plan

1. **Proposal:** Review this RFC, contract, synthetic cases, and threat model.
2. **Private manual pilot:** If Jamie accepts the RFC, conduct four weekly reviews
   without automated source ingestion and retain them privately.
3. **Observation:** Assess whether the method reduces carryover, distinguishes
   outcomes from artifacts, and protects capacity without increasing disclosure
   or review burden.
4. **Revision:** Change the lanes, budget, dispositions, or questions based on the
   manual pilot. Preserve reasons for material changes.
5. **Optional tooling:** Only after a separate accepted design, consider a private
   renderer or validator. Do not add automatic collection by default.
6. **Public projection pilot:** Only if useful, test one separately approved,
   minimal public-safe summary.

Rollback is simple while the RFC remains proposed: retain the proposal and do not
operate the method. A later manual pilot can stop without migrating or deleting
private records.

## Decision gates

- Jamie decides whether to accept the review layers and disposition vocabulary.
- Jamie decides whether the default budget is zero to three and one per lane.
- Jamie decides whether a sustaining capacity boundary belongs in every review.
- Privacy review confirms that real reviews remain private by default.
- A manual pilot must show reduced decision burden without compulsory disclosure.
- Any source ingestion, automation, reminder, or recurring schedule requires
  separate explicit authorization and scope.
- Any public projection requires exact-copy public-safety review and Jamie's
  separate approval.
- Acceptance, implementation, operation, recommendation, merge, deployment, and
  publication remain distinct decisions.

## Drawbacks

- A three-commitment budget may be too rigid during unusually demanding weeks.
- The livelihood, community, and sustaining-life lanes can oversimplify work that
  belongs to several domains at once.
- Dispositioning open loops takes time and could itself become administrative
  labor.
- A capacity boundary can become another compliance demand if the method is used
  mechanically.
- Private weekly records concentrate sensitive context and require careful
  retention and deletion decisions.
- The protocol cannot determine whether a week felt meaningful; structured state
  remains only an aid to reflection.
- A sophisticated evaluator may give false confidence if the underlying evidence
  is incomplete or the human interpretation is poor.

## Alternatives

**Continue with ordinary task lists.** This is simpler, but task lists usually do
not distinguish lived outcomes, artifacts, waiting, and conscious non-pursuit.

**Use an established weekly-review method unchanged.** This reduces design work,
but generic methods may not preserve the public/private, evidence, consent, and
collective-authority boundaries required by this ecosystem.

**Track time or computer activity quantitatively.** This supplies apparently
objective data but systematically misses unobserved life, relational quality,
care, and meaning while increasing surveillance risk.

**Allow an unlimited priority list.** This preserves every ambition but reproduces
the backlog pressure the protocol is intended to relieve.

**Publish a weekly build log.** A public log can support accountability, but it
would privilege visible artifacts and create pressure to expose private work. A
separate public-safe projection remains available if later justified.

**Do nothing.** The existing graph can retain open work, but without a finite
selection protocol its completeness may continue to increase cognitive and moral
burden.

## Unresolved questions

- Is three the correct default budget after four real private pilots?
- Should the three lanes remain fixed, or should Jamie name them each week?
- How long should consciously-not-pursuing context be retained?
- What is the minimum useful evidence citation for a private lived outcome?
- Should capacity boundaries be retained after the reviewed week or expire by
  default?
- What deletion or retention schedule should govern complete private reviews?
- Can a public-safe weekly projection ever provide enough value to justify its
  privacy and performative-pressure risks?
