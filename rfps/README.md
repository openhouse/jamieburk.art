# Requests For Proposals

This directory is the monorepo's workshop for substantial changes that need
careful design and durable public reasoning before implementation.

The process borrows from the staged Request for Comments practice used by the
Ember.js community. We call these documents Requests For Proposals because an
RFP here is an invitation to improve an idea, identify its obligations, and
decide whether it should become part of the system. An RFP is not an automatic
authorization to build.

## When an RFP is required

Write an RFP when a change would materially affect one or more of the following:

- package or repository architecture;
- public/private trust boundaries;
- knowledge schemas, stable identifiers, or promotion rules;
- publication, consent, rights, or collective-credit governance;
- a workflow used by multiple people or agents;
- a public interface or long-lived data contract;
- security, backup, recovery, or source-custody practices;
- the meaning of an existing project promise.

Routine content corrections, small refactors, dependency maintenance, and
reversible interface polish usually do not need an RFP.

## Principles

1. **The document is public.** Never include credentials, private locators,
   private correspondence, raw protected evidence, personal contact details, or
   material that is not safe to publish.
2. **Proposal is not permission.** Cataloguing an idea or source does not grant
   publication, quotation, processing, or implementation rights.
3. **The optimizing agent cannot approve its own proposal.** Acceptance and
   publication remain human decisions.
4. **State the anti-claims.** A useful proposal says what it does not establish,
   automate, centralize, or authorize.
5. **Keep disagreement visible.** Drawbacks, rejected alternatives, minority
   concerns, and unresolved questions belong in the record.
6. **Prefer bounded experiments.** A synthetic or low-risk vertical slice
   should test architecture before real protected sources are connected.
7. **Retain the history.** Closed, discontinued, and superseded proposals stay
   in the repository so future contributors can understand prior reasoning.

## Lifecycle

| Stage | Meaning | Exit condition |
| --- | --- | --- |
| `proposed` | A concrete idea is available for review. It may still have major open questions. | A human decision moves it to `exploring` or `closed`. |
| `exploring` | The problem is worth pursuing, but research, prototyping, or a champion is still needed. | Evidence and design are sufficient for acceptance, or the work is closed. |
| `accepted` | The proposal is sufficiently specified and has an accountable human champion. | Implementation and required learning material are complete. |
| `ready-for-release` | Implementation, tests, migration notes, and operator documentation are complete. | The change is deliberately enabled or shipped. |
| `released` | The accepted behavior is available in its intended environment. | Sustained use demonstrates that it should become the default recommendation. |
| `recommended` | The approach is mature, supported, and preferred for ordinary use. | It remains recommended, is superseded, or is discontinued. |
| `discontinued` | A previously active or released proposal is no longer supported. | Terminal stage; a successor RFP may supersede it. |
| `closed` | The proposal will not proceed in its present form. | Terminal stage; later work starts with a new or explicitly reopened RFP. |

These stages intentionally distinguish design consensus, implementation,
release, and recommendation. A green automated check cannot advance an RFP
across a human gate.

## Roles

- **Author:** writes and revises the proposal.
- **Champion:** accepts responsibility for moving an accepted proposal through
  implementation and review. `unassigned` is valid before acceptance.
- **Affected reviewers:** people whose work, safety, rights, credit, or systems
  are materially affected.
- **Decision owner:** Jamie Burkart unless an RFP explicitly delegates the
  decision to another named person or governing group.

One person may hold several roles, but those roles should remain explicit. A
fictionalized advisory discussion, LLM judgment, or eval result can inform a
decision but cannot impersonate an affected reviewer.

## Authoring workflow

1. Copy `0000-template.md` to the next available four-digit number and a short
   kebab-case title.
2. Complete the public-safe frontmatter and every required section. Write
   `None` when a section genuinely does not apply.
3. Open a pull request or add the proposal to an already appropriate pull
   request. Explain why the RFP belongs in that review scope.
4. Invite affected reviewers and record substantive revisions in the decision
   log. Do not manufacture consensus when reviewers have not participated.
5. Assign a champion and move to `accepted` only through an explicit human
   decision. If the proposal affects several collaborators, allow a stated
   review window before acceptance.
6. Link implementation pull requests without rewriting the proposal to pretend
   the implementation was inevitable.
7. Advance stages in focused commits. Record release evidence, limitations,
   migrations, and any conditions that remain open.

An RFP can be revised while `proposed` or `exploring`. After acceptance,
material changes should be recorded as amendments or a superseding RFP so the
accepted contract remains legible.

## Numbering and filenames

- `0000-template.md` is never a proposal.
- Proposal files use `NNNN-short-title.md`.
- Numbers identify documents, not priority.
- Do not reuse the number of a closed or removed proposal.

## Required frontmatter

Every proposal includes:

```yaml
---
rfp: 1
title: Example title
stage: proposed
authors:
  - Jamie Burkart
champion: unassigned
created: 2026-07-19
updated: 2026-07-19
implementation_after: null
implementation_prs: []
supersedes: []
superseded_by: null
---
```

Dates use `YYYY-MM-DD`. References to private sources use public-safe opaque IDs
only when the IDs themselves are approved for publication.

## Review standard

A proposal is ready for acceptance when reviewers can answer:

- What problem does this solve, for whom, and why now?
- What is deliberately out of scope?
- Which claims are facts, which are design choices, and which remain unknown?
- How does data enter, move through, and leave the system?
- Where can private information leak or collective credit be distorted?
- What requires human judgment, consent, or approval?
- How will we know the change works, fails safely, and can be reversed?
- What must operators learn, migrate, monitor, back up, and recover?
- What simpler alternatives were considered?

## Current proposals

| RFP | Title | Stage | Champion |
| --- | --- | --- | --- |
| [0001](0001-private-and-public-knowledge-wikis.md) | Shared core for private and public Knowledge Wikis | Proposed | Unassigned |

## Influences

- [Ember RFC process](https://rfcs.emberjs.com/create-rfc)
- [Ember RFC stages](https://rfcs.emberjs.com/stages/)

This process is adapted to a smaller, human-governed portfolio system. It uses
Ember's useful separation of proposal, exploration, acceptance, release, and
recommendation without pretending that this repository has Ember's governance
body or consensus process.
