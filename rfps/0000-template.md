---
rfp: "0000"
title: Replace with a concise proposal title
stage: proposed
created: YYYY-MM-DD
updated: YYYY-MM-DD
champion: unassigned
owners:
  - Jamie Burkart
areas:
  - architecture
decision_required_from:
  - Jamie Burkart
review_after: null
implementation_prs: []
supersedes: []
superseded_by: null
---

# RFP 0000: Proposal Title

## Summary

Explain the proposed change in one short paragraph.

## Motivation

Describe the problem, who encounters it, why the current system is insufficient,
and why the question is worth resolving now.

## Present State

Describe the relevant architecture and behavior as it exists. Link to canonical
repository records. Distinguish observed facts from assumptions.

## Goals

- List the outcomes this proposal should achieve.

## Non-Goals

- List adjacent work this proposal deliberately excludes.

## Terminology

Define terms whose meaning is important to the design.

## Detailed Proposal

Describe the design in enough detail for a teammate with only repository context
to understand and eventually implement it.

Include, as relevant:

- ownership boundaries;
- repositories and packages;
- APIs, commands, schemas, or content contracts;
- public/private information flow;
- source custody and authentication;
- failure states and recovery;
- human review and approval;
- migration and compatibility;
- documentation and teaching; and
- how the proposal interacts with existing evals.

## Security, Privacy, Rights, And Consent

Describe protected information, threat boundaries, allowed flows, prohibited
flows, deletion or retention concerns, and human decisions that automation may
not make.

## Public-Safety Boundary

State what may appear in this public repository and what must remain in a
private repository, local configuration, provider, credential store, physical
archive, or collaborator's custody.

## Adoption And Migration

Describe a phased, reversible path from the present state. Acceptance of an RFP
does not itself begin or complete migration.

## Compatibility And Rollback

Explain how existing records, commands, deployments, and collaborators remain
supported. Explain how to stop or reverse implementation without losing source
custody or history.

## Acceptance Criteria

- [ ] Add measurable criteria for accepting the design.
- [ ] Separate implementation checks from human-only gates.

## Implementation Evidence

List the pull requests, candidate identifiers, eval receipts, documentation,
and human reviews needed to advance beyond `accepted`.

## How We Teach This

Explain how a new teammate learns the concept, which terms are canonical, and
which documentation must change.

## Drawbacks

Describe operational cost, conceptual complexity, maintenance burden, privacy
risk, migration risk, and ways the proposal could make the system worse.

## Alternatives

Describe other designs, including doing nothing. Explain why each alternative
might still be preferable.

## Unresolved Questions

- List questions that remain genuinely open.
- Mark which questions block acceptance.

## Decision History

| Date | Stage | Decision or material change | Decided by |
| --- | --- | --- | --- |
| YYYY-MM-DD | proposed | Initial proposal | Author |

## References

- Link to relevant repository records and external prior art.
