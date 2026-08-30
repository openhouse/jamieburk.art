---
rfc: 9
title: Knowledge Operations Control Plane
stage: implementing
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
  - developer-experience
  - editorial
  - public-portfolio
implementation:
  contract: docs/knowledge-bank/methods/source-backed-team-memory.operations.json
  evaluator: scripts/knowledge-wiki/knowledge-operations-control-plane-eval.mjs
  tests: scripts/knowledge-wiki/knowledge-operations-control-plane-eval.test.mjs
supersedes: []
superseded_by: null
---

# Knowledge Operations Control Plane

> **Implementation boundary**
>
> Jamie Burkart authorized this repository-local implementation on 2026-08-29.
> It operationalizes recurring safeguards observed across the Knowledge Wiki
> ecosystem without importing private source content, forcing sibling
> repositories into one schema, or advancing RFC 0005 or RFC 0006. Merge,
> deployment, publication, outreach, and other consequential actions remain
> separate human decisions.

## Summary

Add a small, machine-readable operating contract for the source-backed team
memory method. The contract keeps source coverage and freshness, temporal state,
multidimensional health, planning horizons, exact-candidate dependency receipts,
situated voice, evaluation order, federation boundaries, and human action
authority explicit. Deterministic evaluation runs before subjective model work.
The public method page explains the same system in plain language while the
machine contract and mutation tests protect its operating invariants.

This RFC implements an operating layer above the three graph responsibilities in
[RFC 0005](./0005-three-layer-knowledge-graph.md) and the exchange and receipt
boundaries proposed in
[RFC 0006](./0006-federated-knowledge-exchange-and-release-receipts.md).
It does not accept, operationalize, or change the stage of either proposal.

## Motivation

The existing architecture distinguishes semantic meaning, evidence, source
custody, public projection, and cross-repository exchange. Recent ecosystem work
also demonstrates a recurring set of operational needs:

- a source record must say what it can establish, what it cannot establish,
  when it was reviewed, what remains missing, and what triggers refresh;
- opportunities and relationships need event-backed states rather than a single
  mutable status or a narrative inference;
- health needs several visible dimensions so one score cannot conceal a failed
  hard gate;
- immediate actions, active-week maintenance, application-cycle work, and
  longer-term learning need distinct horizons;
- a receipt must become stale when its exact candidate or upstream dependency
  changes;
- source-backed voice needs a named lens, audience, purpose, and public/private
  boundary without implying endorsement or participation;
- deterministic failures should stop the workflow before a subjective model call
  is commissioned; and
- automation may prepare a decision but may not silently acquire human authority.

These mechanisms already appear in different forms across the ecosystem. Without
one maintained contract in this repository, they remain easier to omit, conflate,
or describe differently from the way the portfolio actually operates.

## Goals

- Make the recurring operating mechanisms inspectable in one public-safe
  machine-readable contract.
- Fail closed when a source is stale, a state transition is invalid, an exact
  candidate receipt no longer matches, or a deterministic gate fails.
- Prevent subjective model work from running before objective checks pass.
- Keep source, claim, projection, evaluation, receipt, and action readiness as
  separate health dimensions.
- Preserve four planning horizons: 24 hours, 7 days, 30 days, and 90 days.
- Preserve situated voice without presenting simulation as endorsement,
  participation, or authority.
- Require human authorization for outreach, applications, publication, merge,
  deployment, spending, endorsement, and political action.
- Explain the operating control plane on the public team-memory method page in
  language useful to a hiring or project sponsor.
- Keep the contract covered by mutation tests and the repository root check.

## Non-goals

- This RFC does not import, summarize, enumerate, or expose private coalition,
  client, relationship, employment, communication, or source-custody records.
- It does not synchronize sibling repositories or require them to adopt this
  schema.
- It does not create a database, service, event bus, dashboard, CMS, chatbot,
  private archive browser, or automatic publication pipeline.
- It does not replace the canonical claim, evidence, source, agency, projection,
  or exchange schemas already maintained elsewhere in the repository.
- It does not grant a model, agent, evaluator, or automation authority to act on
  Jamie's behalf.
- It does not prove that every sibling implementation conforms to this contract.
- It does not authorize merge, deployment, production indexing, outreach, an
  application, or another real-world action.

## Terminology

**Operating control plane**
: The maintained rules that decide whether knowledge work is fresh, eligible to
  advance, ready for review, or waiting for a human decision. It does not contain
  the underlying private corpus.

**Source coverage**
: A record of what a source can establish, cannot establish, when it was last
  reviewed, its cutoff, known gaps, custody, refresh trigger, and allowed
  projection.

**Temporal state**
: An event-backed position in an allowed workflow. A state transition is not
  inferred solely from optimistic prose, relationship warmth, or the passage of
  time.

**Health dimension**
: One independently reported readiness measure. A green dimension cannot average
  away a failed hard gate in another dimension.

**Dependency receipt**
: A record tied to an exact commit, content fingerprint, and upstream
  fingerprint. It is stale after any candidate-affecting dependency changes.

**Situated voice**
: Source-backed language identified by lens, audience, purpose, and
  public/private boundary. A role-play lens remains fictionalized analytical
  interpretation, not a real person's endorsement or participation.

**Human action contract**
: A proposed action with an owner, authority state, evidence, due date, and next
  state. Automation can prepare it but cannot approve its consequential action.

## Detailed design

### Maintained machine contract

`source-backed-team-memory.operations.json` is the canonical operating contract
for this method. It records:

1. the semantic, evidence, and source-custody graph responsibilities;
2. required source-coverage and freshness fields, with projection held by
   default;
3. allowed opportunity and relationship states and their invariants;
4. independently reported health dimensions;
5. the four planning horizons;
6. exact-candidate dependency receipt fields and invalidation behavior;
7. ordered deterministic, subjective, and human review stages;
8. situated-voice requirements and non-endorsement safeguards;
9. consequential actions reserved for human authorization; and
10. federation rules that retain local authority and refuse forced schema
    merger.

The contract is intentionally small. It describes control state, not source
bodies or a universal internal graph schema.

### Workflow evaluator

The evaluator receives a synthetic or public-safe workflow item plus the current
candidate state. It applies the following order:

1. source freshness;
2. allowed state transition;
3. exact candidate and upstream receipt match;
4. deterministic checks;
5. subjective review eligibility; and
6. human authorization.

Any failure in stages one through four returns `hold` and identifies deterministic
remediation. No subjective evaluation is eligible at that point. If the item
would perform a consequential action, it remains held for a human decision until
that action is explicitly approved. The evaluator never sends, submits,
publishes, merges, deploys, spends, endorses, or acts politically.

### Mutation tests

The test suite begins with the maintained candidate, then deliberately damages
one invariant at a time. It verifies that the evaluator rejects:

- a source registry that no longer states what a source cannot establish;
- health collapsed into one composite score;
- simulated voice represented as endorsement; and
- automation granted human action authority.

Workflow tests separately prove that stale sources, changed upstream
fingerprints, deterministic failures, and missing human authorization stop the
item at the appropriate stage.

### Public explanation

The Source-Backed Team Memory method and its rendered lab page explain the
control plane without exposing implementation clutter or private corpus details.
The page remains a composed proposal: it tells a sponsor how the memory stays
fresh, how state and receipts prevent drift, and where human judgment remains.

### Relationship to federation

The control plane may assess an exchange envelope produced under RFC 0006, but
does not make the exchange authoritative. Each repository retains local custody,
schema, correction, projection, and decision authority. A public-safe receipt
may establish candidate identity and check results; it does not establish
consent, endorsement, publication permission, or action authority.

## Security and privacy

The contract contains public-safe field names and synthetic states only. It must
not contain private source paths, protected identifiers, credentials, raw
messages, transcripts, participant data, private graph structure, client-private
details, or authenticated locators. Public builds remain independent of private
repositories and authenticated providers.

Source access is not consent. Evidence is not publication permission. A source
record defaults to held projection until its destination has its own authority.
Situated voice records a lens and boundary but does not manufacture attribution
or endorsement. Candidate receipts contain fingerprints, not private source
locators or bodies.

If freshness cannot be established, parsing fails, a state is unknown, or a
candidate receipt does not match, evaluation fails closed. Error output names
the failed invariant without printing protected source material.

## Publication workflow

The public lab page may describe the method because it contains no private source
content and makes its proposal status explicit. Changes flow through the ordinary
claim, citation, public-language, accessibility, route, and public-safety checks.
The machine contract and evaluator remain repository artifacts rather than a new
public route.

Automation may generate an evaluation result or a proposed action contract. It
cannot authorize public wording, attribution, photo use, publication, indexing,
merge, deployment, outreach, an application, spending, endorsement, or political
action. Jamie remains the decision owner.

## Rollout plan

1. Add the machine-readable contract and deterministic evaluator.
2. Add workflow and mutation tests before relying on the evaluator.
3. Add a concise operating-control-plane explanation to the maintained method
   and rendered lab page.
4. Add the evaluator and tests to the root repository check.
5. Run the affected Knowledge Wiki, RFC, public-language, public-safety, app, and
   route checks against one exact candidate.
6. Observe the contract during real portfolio and application work. Record
   omissions or false holds before proposing cross-repository adoption.

Rollback is deletion of the new contract, evaluator, tests, scripts, RFC, and
public explanation in one reviewed change. Existing RFCs, graphs, claims, and
source records remain compatible because this implementation does not migrate
them.

## Decision gates

- The current implementing stage records Jamie's authorization to build and
  evaluate this repository-local control plane.
- A pull request may merge only after the exact candidate passes the new
  mutation suite, RFC validation, affected existing evaluators, public-safety
  checks, and the application check.
- Advancing to `operational` requires Jamie to review the public explanation,
  the contract, the fresh exact-candidate verification receipt, and at least one
  real workflow observation.
- Advancing to `recommended` requires an observation period demonstrating that
  the control plane catches meaningful drift without creating excessive manual
  work or needless subjective model use.
- Adoption in another repository requires that repository's own decision owner,
  privacy boundary, tests, and migration decision.

## Drawbacks

The control plane adds another maintained artifact and another set of checks to
an already extensive suite. The state vocabulary may be too general for some
projects and too specific for others. Exact-candidate receipts create deliberate
rework after upstream changes. Conservative freshness and authority rules can
hold work that a person could safely advance after context-specific review.

The mitigation is to keep the contract small, report precise failure reasons,
retain local authority, and revise the contract from observed failure modes
rather than adding speculative complexity.

## Alternatives

**Leave the mechanisms distributed across existing evaluators and documents.**
This avoids a new artifact but makes omissions and inconsistent vocabulary more
likely.

**Expand RFC 0005 or RFC 0006 directly.** Those RFCs address graph architecture
and federation seams. Keeping the operations layer separate avoids advancing or
overloading proposals whose decision gates remain open.

**Build a service or database now.** This would create synchronization,
authentication, custody, migration, and operational obligations that the current
need does not justify.

**Use model judges for every decision.** This would spend more, make objective
failures less reproducible, and risk granting interpretive output more authority
than it has.

**Use one aggregate readiness score.** This is simpler to display but could hide
a failed rights, freshness, receipt, or human-action gate behind unrelated green
scores.

## Unresolved questions

- Which contract fields prove most useful during the next real application or
  project cycle, and which create maintenance without changing a decision?
- Should a later accepted RFC define a public-safe exchange adapter for sibling
  repositories, or is documentation plus local authority sufficient?
- What observation period and failure sample are sufficient before Jamie
  considers the control plane operational?
