---
rfp: "0000"
title: Replace with a concise proposal title
status: draft
authors:
  - Name
decision_owner: Name
champion: unassigned
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
implementation_gate: Describe the explicit condition that permits implementation
supersedes: []
superseded_by: null
related: []
---

# RFP 0000: Proposal title

## Summary

Explain the proposal in one paragraph. State what would change, who or what it
serves, and the intended result.

## Status and decision requested

State the current status, the decision currently being requested, and what this
RFP does not authorize.

## Motivation

Describe the current problem using observable evidence. Explain why the problem
is important enough to require a durable proposal.

## Goals

- List concrete outcomes the proposal intends to make possible.

## Non-goals

- List adjacent work that remains outside this proposal.

## Terminology

Define new or overloaded terms. Prefer terms that can become durable shared
language.

## Current state

Describe the current architecture, workflow, ownership, and constraints. Link
to relevant repository records.

## Proposed design

Describe the proposed system in enough detail for a future implementation team
to understand its boundaries and responsibilities.

### Components and ownership

Identify each component, its canonical data, its consumers, and what it must
never contain.

### Data and control flow

Show how information and decisions move through the system. Make trust
boundaries and human gates explicit.

### Interfaces and contracts

Describe schemas, commands, APIs, file formats, package boundaries, or human
review contracts introduced by the proposal.

## Privacy, security, rights, and consent

Describe sensitive data classes, likely failure modes, access controls,
publication boundaries, and rights or consent requirements. A private
repository must not be treated as a universal source vault.

## Migration and compatibility

Explain how the system moves from the current state without losing stable IDs,
history, corrections, links, or working behavior.

## Rollout

Break implementation into independently reviewable stages. Include explicit
entry and exit criteria.

## Verification and evaluation

Define deterministic checks, human review, runtime evidence, and success
criteria. State what automated checks cannot establish.

## Operational ownership

Identify who maintains the result, how upgrades occur, how recovery works, and
what documentation future teammates need.

## How we teach this

Explain how the proposal should be introduced to contributors and agents. Name
the canonical documentation and terminology.

## Drawbacks and risks

Describe complexity, maintenance, migration, privacy, security, cost,
contributor, and failure risks.

## Alternatives

Describe credible alternatives, including doing nothing. Explain why each was
not selected or what evidence could make it preferable.

## Unresolved questions

- Preserve questions that require research, prototyping, or human decisions.

## Decision log

| Date | Decision | Rationale |
| --- | --- | --- |
| YYYY-MM-DD | RFP drafted | Initial proposal |

## References

- Link to relevant internal records and primary external documentation.
