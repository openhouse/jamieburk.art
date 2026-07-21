# Requests for Proposal

This directory holds substantial product, architecture, governance, and process
ideas before implementation commits the repository to them.

The process is adapted from the
[Ember RFC process](https://github.com/emberjs/rfcs). Ember distinguishes
substantial changes from ordinary maintenance, develops proposals in pull
requests, names a champion, and advances accepted work through explicit stages.
This repository uses the same basic discipline at a smaller scale.

An RFP is a **Request for Proposal**. It is a durable design record and an
invitation to refine an idea. It is not an approved implementation, a source of
current system authority, or permission to publish protected material.

## When To Write An RFP

Use an RFP when a change would do one or more of the following:

- introduce a new package, repository, service, data authority, or public API;
- change the boundary between public and private knowledge;
- establish a new idiomatic workflow or governance convention;
- migrate canonical records or stable identifiers;
- create a long-lived security, privacy, rights, or consent obligation;
- require coordination across multiple implementation pull requests;
- materially change how the portfolio, Knowledge Wiki, or evaluation system is
  taught or operated.

Ordinary copy edits, bug fixes, documentation corrections, narrow refactors,
and objective test improvements may use the normal pull-request process.

## Stages

| Stage | Meaning |
|---|---|
| `proposed` | The idea is documented for review. Important questions may remain open. |
| `exploring` | The direction appears useful and merits research, prototypes, or threat modeling. |
| `accepted` | Jamie has approved the direction and the proposal is sufficiently specified for implementation planning. |
| `ready-for-implementation` | Dependencies, migration plan, security review, acceptance criteria, and implementation ownership are settled. |
| `implemented` | The accepted design has been implemented and verified, with deviations recorded. |
| `recommended` | The implementation has survived real use and is the preferred default. |
| `closed` | A proposed or exploring RFP will not proceed. The record remains for context. |
| `discontinued` | A previously accepted or implemented RFP has been superseded or retired. |

Acceptance does not imply implementation. Implementation does not imply public
release, publication permission, production readiness, or recommendation.

## Process

1. Copy [`0000-template.md`](0000-template.md).
2. Assign the next four-digit number and a descriptive filename.
3. Complete the motivation, design, boundaries, drawbacks, alternatives, and
   unresolved questions.
4. Name a champion responsible for keeping the proposal moving or explicitly
   closing it.
5. Open or update a pull request for discussion.
6. Revise the RFP without erasing significant objections or design changes.
7. Record a stage change in the document only after Jamie approves it.
8. Use separate implementation pull requests after the RFP reaches
   `ready-for-implementation`.
9. Update the RFP with material deviations and the implementation references.

For a consequential stage change, reviewers should have a final opportunity to
raise unresolved concerns. There is no automatic time limit: the review period
should fit the consequence, urgency, and availability of the people whose
rights or work are implicated.

## Review Questions

Every RFP should make it possible to answer:

- What problem is this solving?
- Who benefits, and who assumes new work or risk?
- What becomes canonical?
- What remains explicitly outside scope?
- What private or protected material could be affected?
- What cannot be automated or inferred?
- What are the failure and rollback paths?
- What alternatives were considered?
- How will implementation be evaluated?
- What human decisions remain open?

## Public-Safety Rules

RFPs live in the public repository. They must not contain:

- credentials, tokens, cookies, signed URLs, or secret values;
- private filesystem paths or private provider identifiers;
- raw correspondence, transcripts, community records, or stakeholder lists;
- protected source bodies or excerpts not cleared for publication;
- security details that would materially weaken private systems.

Use stable opaque examples and describe categories of private material. A
proposal may specify a local or private configuration pattern without including
the configuration itself.

## File Convention

```text
rfps/0000-template.md
rfps/0001-descriptive-name.md
```

Numbers are stable. Renaming a proposal must not change its number. A major
replacement should receive a new number and mark the earlier RFP
`discontinued`.

## Current RFPs

| RFP | Stage | Title | Review condition |
|---|---|---|---|
| [0001](0001-shared-core-private-public-knowledge-wikis.md) | `proposed` | Shared Core With Private And Public Knowledge Wikis | Revisit after pull request #240 closes |

