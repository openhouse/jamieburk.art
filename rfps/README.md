# Repository Feature Proposals

Repository Feature Proposals (RFPs) are durable design documents for substantial
changes to this monorepo, its knowledge systems, and their governance. They give
an idea a stable home before implementation and preserve the reasoning after a
decision is made.

This process borrows from the Ember.js RFC process: substantial changes are
written down, discussed through pull requests, assigned a champion, advanced
through explicit stages, and kept as part of the project's history. This repo
uses the name RFP because proposals may concern research practice, editorial
governance, privacy, and organizational design as well as software interfaces.

## When to write an RFP

Use an RFP when a proposal would do one or more of the following:

- create or substantially change shared architecture or an API;
- introduce a repository, package, application, data model, or workflow;
- change public/private, consent, rights, or publication boundaries;
- establish a convention that future teammates and agents should follow;
- require coordinated migration across more than one system;
- materially change how the Knowledge Wiki is operated or understood.

Routine fixes, bounded content additions, documentation corrections, and
implementation work already authorized by an accepted RFP can use ordinary pull
requests.

## Principles

- **Discussion before commitment.** A proposed RFP is permission to examine an
  idea, not permission to implement it.
- **Explicit human authority.** Jamie is the decision owner unless an RFP names
  another authorized human. Agents may draft, test, and critique RFPs but may not
  advance a human decision gate.
- **Durable reasoning.** Accepted, closed, and superseded RFPs remain in Git so
  future readers can recover the context and alternatives.
- **Implementation is evidence.** Prototypes may answer open questions, but a
  prototype does not silently make its interfaces accepted.
- **Public-safe repository.** Every committed RFP is public. Private examples,
  credentials, protected locators, correspondence, and source material stay out.
- **Smallest sufficient process.** The RFP should be proportionate to the
  proposal's consequences. The template may be concise when the idea is narrow.

## Stages

| Stage | Meaning | Advancement authority |
|---|---|---|
| `proposed` | A complete first draft is available for review. | Author or champion |
| `exploring` | The direction is promising, but material questions or experiments remain. | Decision owner |
| `accepted` | The design is sufficiently specified and authorized for implementation. | Decision owner after review |
| `implementing` | Work is underway against the accepted design and acceptance criteria. | Champion with implementation evidence |
| `operational` | The implementation is in use, documented, and verified against the RFP. | Decision owner |
| `recommended` | The implementation has survived real use and is the preferred default. | Decision owner after an observation period |
| `closed` | A proposed or exploring RFP will not proceed. | Decision owner or author withdrawal |
| `superseded` | A later RFP replaces this one. | Decision owner, with a replacement link |

Merging a `proposed` or `exploring` RFP into `develop` does not accept it. The
stage in front matter is authoritative.

## Workflow

1. Copy [`0000-template.md`](./0000-template.md) to
   `NNNN-short-descriptive-name.md` using the next available four-digit number.
2. Complete the front matter and every required section. Use `Not applicable`
   where a section genuinely does not apply.
3. Open a pull request. The pull request is the primary discussion surface.
4. Name a champion and the relevant review areas. Record substantive objections
   and unresolved questions in the RFP as it evolves.
5. Run `node scripts/check-rfps.mjs` and the repository checks affected by the
   proposal.
6. Jamie or the named human decision owner explicitly records any stage change.
7. Implementation pull requests link the accepted RFP and identify deviations.
8. After implementation and real use, advance the RFP or document why it was
   closed, discontinued, or superseded.

Major changes to an accepted design require a new RFP. Small clarifications may
amend the existing document if the decision history remains legible.

## Review areas

An RFP may name any relevant review areas. Common areas include:

- `knowledge-architecture`
- `public-portfolio`
- `privacy-governance`
- `research-operations`
- `developer-experience`
- `accessibility`
- `deployment`
- `editorial`

Review areas identify consequences that must be considered. They do not imply
that an agent, test, or informal participant has human decision authority.

## Index

| RFP | Title | Stage | Champion |
|---|---|---|---|
| [0001](./0001-shared-core-public-private-knowledge-wikis.md) | Shared Core for Public and Private Knowledge Wikis | `proposed` | Jamie Burkart |

## Validation

Run:

```bash
node scripts/check-rfps.mjs
```

The validator checks numbering, required metadata and sections, known stages,
index coverage, and common public-safety hazards. It cannot establish consensus,
rights, consent, implementation readiness, or acceptance.

The validator is intentionally not added to the root `npm run check` command in
the current Knowledge Wiki candidate because changing that command would stale
candidate-bound browser evidence. A follow-on implementation may add it after
the current pull request closes and fresh candidate evidence is collected.

## Prior art

- [Ember RFCs](https://github.com/emberjs/rfcs)
- [Ember RFC template](https://github.com/emberjs/rfcs/blob/main/0000-template.md)
