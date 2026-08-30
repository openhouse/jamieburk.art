---
rfc: 10
title: Knowledge Wiki Operating Control Plane
stage: exploring
start_date: 2026-08-29
authors:
  - Jamie Burkart
  - Codex, AI-assisted draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - research-operations
  - privacy-governance
  - agentic-memory
  - editorial
  - public-portfolio
implementation: null
supersedes: []
superseded_by: null
---

# Knowledge Wiki Operating Control Plane

> **Proposal boundary**
>
> This RFC is an `exploring` design record. Merging it preserves a testable
> proposal; it does not authorize implementation or adoption, grant source
> access, establish publication permission, or record a real person's review,
> approval, participation, or endorsement. Jamie Burkart remains the decision
> owner for every stage change and consequential action.

## Summary

Add a small operating control plane beside the Knowledge Wiki's semantic,
evidence, and source-custody graphs. The graphs describe what the system holds.
The control plane describes what has been reviewed, what state a matter is in,
whether an evaluation is still healthy for its present use, and which human can
authorize the next action.

The proposal generalizes recurring lessons from project knowledge operations:
source coverage must be inspectable; participation must not silently become
authority; health is perishable; insufficient evidence requires abstention;
and the desired outcome is greater team capacity rather than more records.

## Motivation

A source-backed claim may be correct while the working situation around it has
changed. A person may attend a meeting without committing to a plan. An agent
may have access to a record without consent to quote or publish it. A modeled
reader may pass an exact packet without supplying action authority. A green
receipt may become stale as soon as the candidate changes.

The three graph responsibilities preserve meaning, support, and custody. They
need a complementary, inspectable way to govern source coverage, operating
state, freshness, abstention, and the human decision boundary. Without that
layer, a technically valid knowledge object can be mistaken for a current
commitment, a complete review, or permission to act.

## Goals

- Maintain a source-of-sources coverage registry for every consequential
  review packet.
- Distinguish proposal, invitation, attendance, contribution, commitment,
  authority, adoption, outcome, and correction.
- Treat candidate, situational, and strategic health as separate, perishable
  results with explicit invalidation triggers.
- Run deterministic eligibility and mutation resistance before interpretive
  model review.
- Require `ABSTAIN_INSUFFICIENT_EVIDENCE` when the eligible packet cannot
  support a responsible judgment.
- Track situated voice only when the corpus is sufficient and its authority is
  explicitly unconfirmed, self-authored, or team-confirmed.
- Evaluate whether the method improves capacity, handoff, correction latency,
  open-loop density, and ownership concentration.
- Bind every evaluation and release receipt to the exact candidate.

## Non-goals

- Creating a central command system that overrides repository or human
  authority.
- Treating access as consent, evidence as publication permission, or a model
  pass as approval.
- Inferring commitment, adoption, or outcome from attendance or contribution.
- Giving fictionalized analytical lenses a real person's voice or authority.
- Replacing human judgment with a permanent green status.
- Publishing private source inventories, paths, correspondence, identities, or
  protected records.
- Adding a database, CMS, workflow engine, or new public product through this
  RFC.

## Terminology

**Operating control plane**
: A small set of inspectable contracts and checks governing coverage, state,
  health, evaluation order, abstention, and decision authority. It complements
  the graphs; it does not become a fourth source of truth.

**Source-of-sources coverage registry**
: A record of which source families were eligible, reviewed, excluded,
  unresolved, or unavailable for a particular candidate and purpose. It must
  not expose private locators on a public surface.

**Operating state**
: A precise description of a matter's current standing. Proposal, invitation,
  attendance, contribution, commitment, authority, adoption, outcome, and
  correction are distinct states and require distinct evidence.

**Perishable health**
: A result that is valid only for a stated candidate, situation, strategy, and
  review window. Health is invalidated by relevant change rather than assumed
  permanent.

**Situated voice**
: A scoped representation of a speaker's recurring language and reasoning
  patterns derived from an adequate authorized corpus. It records authority
  state and never licenses impersonation.

## Detailed design

### Source coverage

Every consequential packet records source families rather than only the
sources that happened to support the conclusion. Each family is marked
reviewed, excluded with reason, unresolved, unavailable, or protected. Public
receipts expose only public-safe identifiers and aggregate state. Unknown
rights, consent, or represented-person status fail closed.

### Operating state ledger

Records carry the narrowest supported state. Invitation does not prove
attendance; attendance does not prove contribution; contribution does not
prove commitment; commitment does not prove authority; authority does not
prove adoption; adoption does not prove an outcome. Corrections remain visible
as part of the working history.

### Three bands of health

1. **Candidate health** asks whether the exact artifact and its evidence pass
   deterministic gates now.
2. **Situational health** asks whether the represented relationships, needs,
   constraints, and authorities remain current enough for the task.
3. **Strategic health** asks whether the intervention is still the right use of
   time and attention.

Each result records its invalidation triggers. A source revision,
candidate-affecting change, rights or consent change, new contradiction, or
elapsed review window requires a fresh decision.

### Evaluation order and abstention

Evaluation proceeds in four stages:

1. deterministic eligibility;
2. mutation resistance proving that each hard gate can fail;
3. fictionalized model review of the exact eligible packet;
4. a separate human decision.

The model verdict is `PASS`, `FAIL`, or
`ABSTAIN_INSUFFICIENT_EVIDENCE`. A pass does not provide consent, publication
permission, adoption, or action authority. An abstention is a valid safe result
and should name the missing evidence without inventing it.

### Situated voice

Voice artifacts require a stated corpus, a corpus-sufficiency check, and an
authority state: unconfirmed, self-authored, or team-confirmed. They are tools
for testing legibility, not permission to impersonate or publish private
speech. Public-work lenses remain explicitly fictionalized analytical lenses.

### Outcome measures

The control plane evaluates the method by whether it increases team capacity:
another person can continue the work, corrections arrive sooner, open loops
have owners, and knowledge is less concentrated in one person. Document count,
model confidence, and passing score volume are not success measures.

### Exact-candidate receipts

Every receipt binds to an exact candidate fingerprint and records relevant
source-coverage and health states. Candidate-affecting changes require reruns;
stale receipts are rejected rather than relabeled.

## Security and privacy

- Access, consent, evidentiary support, quotation rights, and publication
  authority remain separate gates.
- Public coverage registries never reveal private paths, protected locators,
  credentials, raw correspondence, or restricted participant data.
- Cross-repository packets inherit the most restrictive applicable boundary.
- Fictionalized model readers receive only the exact eligible packet and may
  abstain.
- The control plane records decision ownership but cannot exercise that
  authority.

## Publication workflow

1. Register the proposed source families and purpose.
2. Resolve deterministic eligibility, rights, privacy, and lifecycle gates.
3. Materialize and fingerprint the exact candidate.
4. Run mutation tests against the candidate's hard gates.
5. If eligible, run fictionalized model review with abstention available.
6. Present the result, missing evidence, and invalidation triggers to Jamie.
7. Jamie decides whether to revise, publish, withhold, adopt, deploy, or stop.
8. Bind any receipt to the exact reviewed candidate.

## Rollout plan

1. Preserve this RFC as an exploring design record.
2. Maintain a deterministic contract and mutation suite in this repository.
3. Explain the method concisely on the existing team-memory page and colophon.
4. Test the contract against one approved, limited cross-repository packet.
5. Observe a real handoff and correction cycle before proposing stage
   advancement.

The instrumentation in this repository tests the proposal's guardrails. It is
not evidence that the wider control plane has been adopted.

## Decision gates

- Jamie explicitly decides whether this RFC advances beyond `exploring`.
- The coverage registry can represent missing, excluded, unresolved, and
  protected source families without exposing private locators.
- Mutation tests independently fail access/consent, operating-state, health,
  abstention, evaluation-order, public-method, and capacity/handoff violations.
- A modeled reader can abstain without being treated as a failed system call.
- An observed teammate handoff and correction cycle demonstrates improved
  capacity without centralizing authority or knowledge in one person.
- Exact-candidate checks reject stale receipts after relevant changes.

## Drawbacks

The added state vocabulary can create ceremony and false precision. Coverage
registries and health windows require maintenance. An overbuilt control plane
could become the very parallel system the method is meant to avoid. The design
therefore favors a small contract, deterministic checks, and review only where
a distinction changes a consequential decision.

## Alternatives

- **Rely on prose conventions.** Simpler, but difficult to test and easy to
  forget between agents and repositories.
- **Put every rule in the graph schema.** More centralized, but conflates what
  the graph holds with how a current candidate may be evaluated or acted upon.
- **Use model review alone.** Flexible, but costly, non-deterministic, and
  unable to provide rights, consent, or authority.
- **Require every repository to share one schema.** Uniform, but weakens local
  authority and makes cross-project adoption needlessly expensive.

## Unresolved questions

- What is the smallest coverage-registry vocabulary that remains useful across
  repositories?
- Which invalidation triggers can be detected automatically and which require
  human observation?
- How should situational and strategic health be reviewed without manufacturing
  busywork?
- What evidence is sufficient to advance a situated-voice artifact from
  unconfirmed to self-authored or team-confirmed?
- Which handoff and correction measures can be compared across projects without
  flattening their different purposes?
