# Requests for Proposal

RFP means **Request for Proposal** in this repository. RFPs give substantial
technical, product, governance, editorial, and operating-model changes a
durable place to develop before implementation begins.

This process borrows from the
[Ember RFC process](https://rfcs.emberjs.com/create-rfc): substantial changes
should explain their motivation, detailed design, drawbacks, alternatives, and
unresolved questions; discussion should improve the proposal; and acceptance
should be distinct from implementation and release.

RFPs are part of this monorepo because proposed changes often cross the
portfolio application, Knowledge Wiki, research workflow, public-safety model,
and future shared packages. Keeping the proposal beside the affected system
makes its assumptions reviewable without turning an early idea into active
scope.

## When to write an RFP

Use an RFP when a proposal would do one or more of the following:

- establish a new repository, package, application, service, or long-lived
  subsystem;
- change a public/private boundary or source-governance policy;
- introduce a new canonical data model, workflow, or contributor convention;
- require coordinated migration across multiple ownership surfaces;
- create a difficult-to-reverse operational commitment;
- materially change how future teammates understand or extend the system.

An RFP is normally unnecessary for bug fixes, bounded content corrections,
documentation clarification, routine dependency maintenance, or implementation
that follows an already accepted proposal.

## Principles

1. **Proposal is not permission.** Merging or accepting an RFP does not by
   itself authorize implementation, migration, deployment, publication, or
   access to protected material.
2. **Public-safe by construction.** This is a public repository. RFPs must not
   contain private paths, credentials, protected locators, private quotations,
   or sensitive source contents.
3. **State the burden.** A proposal must describe maintenance, migration,
   teaching, privacy, security, and failure costs as seriously as benefits.
4. **Keep alternatives alive.** Rejection, deferral, and deliberate non-action
   are valid outcomes.
5. **Separate decision stages.** Design acceptance, implementation readiness,
   completed implementation, and recommended use are different claims.
6. **Preserve human gates.** Rights, consent, collaborator credit, Jamie's
   approval, and production authorization cannot be inferred from automated
   checks.

## Lifecycle

| Status | Meaning | Implementation allowed? |
| --- | --- | --- |
| `draft` | An idea is being shaped before formal review. | No |
| `proposed` | The RFP is ready for review and recorded discussion. | No |
| `exploring` | The direction is promising, but material questions remain. | Only explicitly approved prototypes |
| `accepted` | The design is approved as the intended direction. | Only under the RFP's implementation gate |
| `implementing` | Approved implementation work is underway. | Yes, within approved scope |
| `completed` | The accepted scope is implemented and verified. | Complete |
| `recommended` | The result has been used successfully and is the preferred approach. | Complete |
| `closed` | The proposal will not proceed in its current form. | No |
| `superseded` | Another RFP replaces this proposal. | Follow the replacement |

Moving to `accepted`, `completed`, or `recommended` should happen in a focused
pull request or commit that records the decision and supporting evidence.
Substantial changes to an accepted design require an amendment or successor
RFP rather than silent editing.

## Roles

- **Author:** develops the proposal and integrates review.
- **Decision owner:** has authority to accept, defer, or close the proposal.
- **Champion:** shepherds an accepted proposal through implementation and
  reports when evidence supports a stage change.
- **Reviewers:** examine relevant technical, product, editorial, archival,
  privacy, accessibility, operational, and audience concerns.

One person may hold several roles. An RFP may remain `exploring` until it has a
champion.

## Authoring process

1. Copy [`0000-template.md`](0000-template.md).
2. Assign the next unused four-digit number and a descriptive filename.
3. Fill every required section. Use `Not applicable` with a reason rather than
   deleting a section.
4. Open or update a pull request for discussion.
5. Revise the RFP in response to evidence and review.
6. Record important decisions in its decision log.
7. Change status only when the corresponding criteria are met.
8. Link implementation pull requests back to the accepted RFP.

Unlike Ember's separate RFC repository, this monorepo assigns numbers in
sequence when the proposal file is created. The number is a stable document
identity, not a claim that the proposal has been accepted.

## Current proposals

| RFP | Status | Title |
| --- | --- | --- |
| [0001](0001-dual-knowledge-wiki-architecture.md) | Proposed | Dual Knowledge Wiki and shared core architecture |

## Attribution

The process is adapted to this repository from Ember's public RFC practice,
especially its distinction among proposed, exploring, accepted, released, and
recommended work. Ember's full process includes community and core-team
structures that are intentionally simplified here.
