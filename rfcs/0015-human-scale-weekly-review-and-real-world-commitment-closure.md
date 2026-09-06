---
rfc: 15
title: Human-Scale Weekly Review and Real-World Commitment Closure
stage: proposed
start_date: 2026-09-05
authors:
  - Jamie Burkart
  - Codex, AI-assisted draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - research-operations
  - privacy-governance
  - developer-experience
  - editorial
implementation: null
supersedes: []
superseded_by: null
---

# Human-Scale Weekly Review and Real-World Commitment Closure

## Summary

Define an evidence-bounded weekly review that asks how Jamie did in lived life,
not how much repository activity occurred. The review distinguishes observed
events, created infrastructure, relationship or project outcomes, accepted
commitments, waiting states, and private self-reported capacity. It gives every
open loop one explicit disposition, requires a designed ending for every
consequential gathering, and carries forward no more than three active outcomes.
It produces a private human-review candidate by default. Any public summary is
a separately authorized, minimal projection.

## Motivation

The Knowledge Wiki can capture extraordinary amounts of activity: commits,
artifacts, transcripts, messages, decisions, branches, evaluations, and source
receipts. That depth protects continuity, but activity is not the same as real-
world progress. A large diff cannot establish that a meeting occurred, a person
accepted an action, a relationship advanced, a client paid, a coalition made a
decision, or Jamie had the capacity to continue.

The immediate observed failure modes are:

- repository counts can overshadow the human events they were meant to serve;
- a stale weekly source can coexist with intense daily production;
- a productive meeting can end without explicit understanding, disagreement,
  ownership, or a reconvening decision;
- another person's proposed action can silently become Jamie's responsibility;
- a complete capture system can leave too many items psychologically active;
- waiting, proposed, sent, accepted, completed, and closed states can collapse;
- visible output can be misread as evidence of rest, health, pleasure, or
  sustainable capacity; and
- a private reflection can leak relationship, health, financial, or movement
  context into a public portfolio.

The desired result is not a more elaborate productivity dashboard. It is a
small weekly decision surface that converts governed evidence into a humane
account of the week and a deliberately narrow next week.

## Goals

- Evaluate lived outcomes separately from repository activity and artifact
  production.
- Use one current seven-local-civil-day window with explicit source cutoffs and
  coverage gaps.
- Distinguish source-backed occurrence, participant report, interpretation,
  inference, and unknown state.
- Close consequential gatherings with recorded understanding, disagreement,
  accepted actions, and a reconvening decision.
- Prevent work from defaulting to Jamie without explicit acceptance.
- Give every open loop exactly one current disposition.
- Limit the next week to no more than three active outcomes.
- Record capacity as private self-report, explicit decline, or unknown—never as
  an inference from visible productivity.
- Keep deterministic state checks ahead of costly or interpretive review.
- Produce a private review candidate that Jamie may correct, reject, or adopt.
- Require separate authorization and redaction before any public projection.

## Non-goals

- Do not define productivity, personal worth, health, virtue, or movement value
  as a numeric score.
- Do not implement a calendar, task manager, health tracker, time tracker,
  surveillance system, or performance-management system.
- Do not infer rest, mood, health, finances, capacity, consent, or relationship
  state from commits, messages, meetings, biometrics, silence, or work volume.
- Do not require Jamie to disclose private bodily or emotional information.
- Do not make every captured record actionable or carry every unresolved item
  into the next week.
- Do not assign another participant's work, represent a group decision, or
  create a deadline without evidence of acceptance.
- Do not authorize outreach, scheduling, spending, paid work, publication,
  deployment, indexing, deletion, or a repository merge.
- Do not implement this proposal merely because its RFC and tests merge.

## Terminology

**Review window:** Seven consecutive local civil dates in a declared timezone.
The window is an evidence boundary, not a free/busy calendar.

**Lived outcome:** An observed change in a human, relational, civic, commercial,
creative, or operational state. Infrastructure may support an outcome but is
not automatically the outcome.

**Activity metric:** A count such as commits, files, lines, branches, messages,
hours, or artifacts. It may describe effort or system change but cannot serve
as the primary success measure.

**Consequential gathering:** A call, meeting, workshop, or conversation whose
purpose includes a decision, coordination, relationship change, or accepted
next action.

**Designed ending:** A four-part record of what was understood, what remains
contested, which actions were explicitly accepted by whom, and whether or how
the participants will reconvene.

**Open loop:** Something that has Jamie's attention but lacks a trusted current
disposition.

**Disposition:** Exactly one of `next-action`, `waiting-for`, `project`,
`someday-maybe`, `reference`, or `closed`.

**Active outcome:** A successful state Jamie has consciously selected for the
next review window. It is not a list of every supporting task.

**Capacity state:** Jamie's private self-report recorded as `recorded`, an
explicit choice not to answer recorded as `declined`, or `unknown`. All three
are valid; inferred capacity is not.

## Detailed design

### Review inputs

The review uses a bounded input manifest rather than unrestricted search. It may
include:

- the current and previous weekly plan;
- calendars and occurrence evidence;
- meeting returns and accepted-action records;
- sent, delivered, waiting, acknowledged, and replied communication states;
- active project and opportunity states;
- private source receipts and coverage limitations;
- public portfolio changes as activity evidence; and
- Jamie's optional private account of experience and capacity.

Every input records a cutoff, evidentiary role, limitation, and public/private
placement. A calendar entry proves scheduling, not occurrence. A sent message
proves sending only when supported by the relevant source. Silence does not
prove rejection, acceptance, or a continuing obligation.

### Review sequence

The canonical sequence is:

1. Establish the seven-day local window and source cutoffs.
2. Record source-backed lived events and explicit coverage gaps.
3. Separate lived outcomes from infrastructure and activity metrics.
4. Close each consequential gathering.
5. Clarify accepted commitments and every open loop.
6. Review waiting-for and project outcomes.
7. Record capacity as `recorded`, `declined`, or `unknown` without inference.
8. Select no more than three active outcomes for the next week.
9. Run deterministic checks.
10. Present the candidate to Jamie for correction and adoption.
11. If separately requested, prepare a minimal public projection for another
    human review.

A failed or incomplete earlier stage cannot be hidden by a strong narrative at
a later stage.

### Outcome and activity separation

The review may report activity metrics as secondary context, but it must never
use them as the primary answer to “How did I do?” Each claimed lived outcome
names the evidence that supports it and the boundary it does not cross.

Examples:

- “A meeting occurred and produced three individually accepted actions” is an
  outcome when occurrence and acceptance are sourced.
- “Four thousand lines changed” is activity, not evidence of human impact.
- “A consulting agreement was prepared” is an artifact state, not a signed
  engagement, authorized hour, or payment.
- “An invitation was delivered” is not attendance, agreement, or reading.

### Designed meeting endings

Every consequential gathering records:

1. **Understanding:** What became clearer?
2. **Contestation:** What remains disputed, uncertain, or intentionally open?
3. **Accepted actions:** Who explicitly accepted which action? What evidence
   establishes acceptance?
4. **Reconvening:** Will the participants meet again, wait for a named trigger,
   or close the thread?

If any part is missing, the meeting-close stage is held. Unowned work stays
unowned. The reviewer may propose an action to Jamie, but it cannot mark that
action active until Jamie accepts it.

### Open-loop clarification

Every open loop receives exactly one disposition:

- `next-action`: one concrete physical or communicative action Jamie accepts;
- `waiting-for`: another person or external event controls the next change;
- `project`: more than one action is required and a successful outcome is
  defined;
- `someday-maybe`: retained without present commitment;
- `reference`: useful knowledge requiring no action; or
- `closed`: deliberately completed, declined, superseded, or no longer pursued.

An active commitment requires an explicit owner, acceptance evidence, a
successful outcome, and a next action. Dates remain proposed, offered, or
recorded targets unless a source establishes agreement.

### Three-outcome selection

The final candidate selects zero to three active outcomes. Supporting actions
may be numerous, but they must roll up to the selected outcomes. A fourth active
outcome holds the review at selection until Jamie defers, delegates, combines,
or closes something.

The limit is a focus constraint, not a claim that only three things matter. All
other records remain safely available in their clarified dispositions.

### Capacity without surveillance

The review asks Jamie whether the week was sustainable and whether the next
week's selection fits actual capacity. Jamie may answer, decline, or leave the
state unknown. No answer is a valid privacy choice and does not produce a bad
score.

The system must not infer capacity from output, message tone, work hours,
calendar density, biometrics, medical records, financial records, or another
person's interpretation. Sensitive detail belongs only in the authorized
private plane and only when Jamie chooses to record it.

### Output contract

The private candidate contains:

- the exact review window and source cutoffs;
- observed lived outcomes with evidence boundaries;
- activity and infrastructure changes in a separate section;
- designed endings for consequential gatherings;
- accepted commitments and clarified open loops;
- waiting-for items with owners and triggers;
- zero to three selected active outcomes;
- capacity state without required sensitive detail;
- unresolved gaps, contradictions, and corrections; and
- human-review, public-projection, and publication authority states.

The candidate is advisory until Jamie adopts it. A passing evaluator means the
record is structurally ready for review, not that its interpretations are true,
its plan is wise, or Jamie has accepted it.

### Evaluation strategy

Deterministic checks run first because the principal failure modes are state and
authority errors. They reject or hold:

- activity counts presented as primary success evidence;
- unsupported occurrence claims;
- stale windows or undispositioned evidence gaps;
- inferred capacity;
- active but unaccepted commitments;
- ownership that defaults to Jamie;
- incomplete meeting endings;
- open loops without a valid disposition;
- more than three active outcomes;
- public projections containing private weekly detail; and
- publication authority granted by the review itself.

Interpretive review occurs only after those checks pass. Any later qualitative
judge must target one documented failure mode, be calibrated against human
labels, and remain advisory. No aggregate score may average away a failed hard
gate.

## Security and privacy

The public RFC and contract contain only generic state names and synthetic
examples. Private weekly inputs may contain correspondence, relationship state,
movement deliberation, opportunity details, health or financial context, and
other sensitive material. Those records remain in the authorized private plane
or protected source custody.

Public candidate checks reject private names used only in private context,
message or transcript bodies, protected locators, provider identifiers,
credentials, medical or financial detail, and undisclosed relationship state.
A body-free receipt may report that a private capacity state was recorded,
declined, or left unknown; it may not expose the response.

Access is not consent. Evidence is not publication permission. A private weekly
review cannot authorize outreach, attribution, quotation, collective action,
or public projection.

## Publication workflow

The default output is private. A public weekly reflection is optional and begins
only after Jamie separately identifies its purpose and audience. It must be
composed from minimal public-safe claims rather than produced by redacting a
private review in place.

Public review separately evaluates evidence, privacy, consent, rights,
attribution, collective credit, current relationship state, and exact wording.
Passing checks create only a public candidate. Jamie retains publication,
deployment, and indexing authority.

## Rollout plan

This RFC is currently only a proposal.

### Separately authorized additive changelog

On September 6 Jamie requested a private two-week retrospective and an additive
IRL changelog for emerging insights. That narrower record is authorized by the
specific request; it does not accept this RFC's full weekly-review workflow,
three-outcome selection rule, capacity prompt, schedule, or operational adoption.

The changelog separates event dates from knowledge dates and preserves an
earlier picture, cited new evidence, revised interpretation, consequence, and
explicit gaps. Corrections append and link to prior entries rather than rewriting
them. Source editions remain identifiable; changed or duplicate evidence cannot
silently become fresh independent corroboration. A recorded conversation is not
an accepted commitment, and activity counts cannot stand in for lived outcomes.

Checks protect the history prefix, citation revisions, dates, state boundaries,
and generated reader view. Passing checks do not validate interpretive quality
or confer human authority. This is a private record, not a scheduled monitor or
an automatic public build log. No private event, person, source locator, or
counterpart topology is part of this public RFC extension.

The separately authorized IRL component now has a bounded shadow review
implementation. Its contract distinguishes occurrence, evidence availability
to the system, and journal recording; historical-as-was and retrospective
views must not substitute one clock for another. Earlier records without
availability evidence remain explicit migration gaps.

The shadow surface keeps scoped corrections and competing accounts visible,
binds consumer review receipts to exact source, mapping, permission and
candidate revisions, and offers at most three proposed attention cards.
It does not create a second task ledger. A reviewed page update is not a
settled claim or an accepted commitment. Real-data migration, independently
reviewed interpretations, canonical promotion, and recurring automation
retain separate gates. This does not accept the full weekly-review proposal.

### Full weekly-review proposal

1. **Proposal:** Review the vocabulary, three-outcome limit, meeting-ending
   contract, private capacity states, and relationship to existing planners.
2. **Exploration:** Apply the contract manually to several historical weeks,
   including one quiet week and one high-activity week. Conduct human error
   analysis before adding interpretive evaluators.
3. **Acceptance:** Jamie records the chosen week boundary, private destination,
   selection rule, and implementation scope.
4. **Implementation:** Add a private review manifest, renderer, deterministic
   evaluator, correction flow, and rollback documentation.
5. **Observation:** Use the workflow for at least four review windows and record
   whether it reduces open-loop burden without erasing important work.
6. **Operational decision:** Jamie decides whether it becomes the default.

Rollback stops generating new candidates and preserves prior reviews as dated
records. It does not delete source evidence or rewrite earlier weeks.

## Decision gates

- Jamie selects the canonical weekly boundary and timezone behavior.
- Jamie decides whether three active outcomes is invariant or an overridable
  default with a recorded exception.
- Jamie approves the private storage and source-access boundaries.
- Jamie approves the capacity-state vocabulary and may remove the prompt.
- Historical trials demonstrate that observed events, activity, commitments,
  waiting states, and closed items remain distinct.
- Human review confirms that the workflow reduces rather than increases burden.
- Any interpretive evaluator receives separate error analysis and validation.
- RFC acceptance precedes implementation.
- Implementation evidence and an observation period precede operational use.
- Public projection, publication, deployment, and indexing remain separate
  human decisions.

## Drawbacks

- The review can become another elaborate maintenance ritual.
- A rigid three-outcome limit may conceal genuinely exceptional weeks.
- Meeting-ending requirements may feel heavy for informal conversations.
- Evidence discipline can privilege what is documentable over meaningful but
  private or ambiguous experience.
- A capacity prompt can feel intrusive even when decline is permitted.
- Clarifying a large backlog may consume the time the system is meant to free.
- Automated structural correctness cannot establish emotional truth, strategic
  wisdom, or whether Jamie should continue a commitment.

These risks favor a small manual pilot and a measured observation period.

## Alternatives

**Continue using existing planners alone.** This preserves fewer concepts, but
the current planners emphasize recorded tasks and dates more than retrospective
lived outcomes, meeting closure, and capacity.

**Adopt a conventional productivity scorecard.** Counts and grades are easy to
render but invite vanity metrics, moralized productivity, and false precision.

**Use only a free-form journal.** A journal better holds felt experience, but it
does not reliably clarify commitments, waiting states, authority, or public and
private boundaries. The proposed system may link to a journal without replacing
it.

**Activate every open loop.** This maximizes visible responsiveness while
destroying focus and turning safe reference material into obligation.

**Publish a weekly build log.** A public log may serve portfolio storytelling,
but it cannot substitute for the private review and would increase privacy,
consent, and performance-pressure risks.

**Do nothing.** Jamie can continue making ad hoc judgments. This avoids process
cost but leaves the observed gap between excellent capture and selective
closure unresolved.

## Unresolved questions

- Should the canonical week run Monday through Sunday, Sunday through Saturday,
  or use a configurable seven-day window?
- Is the three-outcome limit absolute, or may Jamie record an explicit
  exceptional-week override?
- Which existing weekly planner is canonical, and which generated views should
  become projections rather than parallel sources?
- Where should private capacity state live, and what is the minimum sufficient
  retention period?
- Should a consequential gathering without an accepted action still require an
  explicit “no action” ending?
- How should the review represent care, grief, rest, and relationship work that
  matters but should not become public evidence or a task?
- What observation would demonstrate that the review reduces cognitive burden?
- Who, if anyone besides Jamie, may review a private weekly candidate?
