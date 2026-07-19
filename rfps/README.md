# Requests for Proposal

RFPs are the monorepo's durable design-discussion records for substantial
changes. They create room to develop an idea before implementation makes it
expensive to reconsider.

This process borrows from the Ember.js RFC community: substantial proposals
are written down, reviewed through pull requests, revised in response to
feedback, and advanced through explicit stages. This repository uses the term
**RFP**, or **Request for Proposal**, because these documents may cover product,
archival, governance, and operating-system changes as well as code.

An accepted RFP approves a direction. It does not merge an implementation,
publish content, resolve rights or consent, authorize production deployment,
or replace a human decision gate.

## Index

| RFP | Title | Stage | Decision timing |
| --- | --- | --- | --- |
| [0001](text/0001-shared-core-private-and-public-knowledge-wikis.md) | Shared Core, Private Personal Wiki, and Public Professional Wiki | Proposed | Revisit after the current Knowledge Wiki pull request closes |

## When To Write An RFP

Use an RFP when a proposal would make a substantial change to one or more of
the following:

- repository, package, or application boundaries;
- the Knowledge Wiki record model or lifecycle;
- public/private information architecture;
- source access, authentication, custody, or retention;
- claim promotion or publication governance;
- stable commands or APIs used by more than one repository;
- deployment, indexing, or production safety;
- a migration that would be difficult to reverse; or
- a shared convention that future contributors would be expected to follow.

An RFP is usually unnecessary for:

- copy editing;
- a bounded factual correction;
- a bug fix that restores documented behavior;
- an eval fixture or test that does not change policy;
- routine source intake under the existing lifecycle; or
- an implementation already specified by an accepted RFP.

When uncertain, a short proposed RFP is less costly than implementing an
unclear system boundary.

## Lifecycle

RFPs move through these stages:

| Stage | Meaning |
| --- | --- |
| `proposed` | The idea is documented and open for initial review. No implementation commitment exists. |
| `exploring` | The idea appears worth pursuing but still needs research, design work, a champion, or answers. |
| `accepted` | Jamie and the relevant maintainers approve the specified direction for implementation. |
| `implementing` | Work is underway in one or more implementation pull requests. |
| `implemented` | The accepted scope has shipped or the process change has taken effect. |
| `recommended` | The result has survived use and is the preferred approach for new work. |
| `closed` | A proposed or exploring RFP will not proceed. The record and rationale remain. |
| `discontinued` | An accepted or implemented RFP has been superseded or retired. |

Stages describe different kinds of confidence. Automated checks may establish
schema validity or implementation conformance, but they may not move an RFP
through a human decision gate.

## Process

1. Copy [`0000-template.md`](0000-template.md) to
   `rfps/text/0000-descriptive-title.md`.
2. Fill in the proposal, especially motivation, boundaries, drawbacks,
   alternatives, privacy, migration, and unresolved questions.
3. Open or update a pull request. Discussion belongs on the pull request so
   the proposal and its feedback remain connected.
4. Replace `0000` with the next available four-digit RFP number before merge.
5. Identify the champion and the people whose decisions are required.
6. Revise the RFP as the design improves. Preserve consequential changes in
   the decision history.
7. Move the RFP to `accepted` only after Jamie and relevant maintainers agree
   that it is sufficiently specified.
8. Implement through separate, reviewable pull requests linked from the RFP.
9. Update the stage and implementation links as evidence accumulates.

The author of an RFP does not have to implement it. A proposal may remain in
`exploring` while awaiting source research, privacy review, a collaborator, or
a more appropriate implementation window.

## Decision Review

This project does not need to reproduce Ember's community-scale governance.
For consequential decisions, use a bounded final review instead:

- summarize the proposed decision;
- list remaining objections and unresolved questions;
- identify which questions block acceptance and which may remain open;
- give Jamie and relevant maintainers a reasonable review window;
- record the decision and rationale in the RFP; and
- require a new RFP for a materially different design.

Jamie remains the final authority for personal identity, publication,
relationships, consent, private-source use, and portfolio direction.

## Public-Safety Contract

This repository is public. RFPs must be safe for public discovery even when
they describe private systems.

Do not include:

- private filesystem paths or source coordinates;
- credentials, cookies, tokens, recovery codes, or signed URLs;
- private names, contact details, correspondence, or transcripts;
- raw archive manifests or private record counts that create mosaic risk;
- unapproved quotations, photographs, or screenshots; or
- information whose presence in Git would make reliable deletion difficult.

Use abstract examples, environment-variable names, opaque identifiers, and
explicit protected boundaries. A private repository is not a credential vault,
and a public RFP is not permission to create the system it describes.

## Relationship To ADRs

An RFP asks whether and how a substantial change should be made. An
architecture decision record explains a consequential decision after the
direction has been chosen.

An accepted RFP may lead to an ADR when the implemented architecture needs a
shorter durable decision record. Do not rewrite an RFP into an ADR or erase its
alternatives and unresolved questions.

## Relationship To Evals

RFPs define desired behavior and acceptance criteria. Evals test an
implementation candidate against those criteria.

Passing evals does not:

- accept an RFP;
- approve private-source use;
- grant rights or consent;
- approve a public projection;
- complete human usability review; or
- authorize production release.

## Prior Art

This process is adapted from the
[Ember.js RFC process](https://github.com/emberjs/rfcs), especially its use of
proposal pull requests, explicit stages, champions, alternatives, drawbacks,
unresolved questions, and the separation between accepting a design and
shipping its implementation.
