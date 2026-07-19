---
rfp: 1
title: Shared core for private and public Knowledge Wikis
stage: proposed
authors:
  - Jamie Burkart
champion: unassigned
created: 2026-07-19
updated: 2026-07-19
implementation_after: Current Knowledge Wiki pull request is closed
implementation_prs: []
supersedes: []
superseded_by: null
---

# RFP 0001: Shared core for private and public Knowledge Wikis

## Summary

Create a reusable Knowledge Wiki core package inherited by two deliberately
separate systems:

1. the public professional Knowledge Wiki in `jamieburk.art`; and
2. a sibling private Knowledge Wiki for Jamie's personal and professional
   archival production.

The public Wiki will continue to contain only newspaper-safe knowledge approved
for a public repository. The private Wiki may hold richer working context and
private source metadata, subject to stricter governance. Machine-specific
locators and authentication references will live in an untracked local source
configuration, not in either repository.

Knowledge will move from private research toward public use only through an
explicit, reviewable promotion bundle and a human-approved pull request. The
public system will have no runtime, build-time, or repository dependency on the
private system.

This RFP records the idea for later consideration. It does not authorize the
creation of a private repository, the movement of private sources into Git, or
implementation before the current Knowledge Wiki pull request closes.

## Motivation

Jamie's archival practice spans public artifacts, private working folders,
collaborator records, local repositories, cloud services, correspondence,
photographs, transcripts, and memories that require further research. The
public Knowledge Wiki has correctly adopted a newspaper-safe boundary. That
boundary is a strength, but it also means the public repository cannot itself
be the complete workspace for discovering, rereading, challenging, and
maturing knowledge.

At present, an authorized agent may know that a source exists without having a
durable, safe way to learn:

- which access method is appropriate;
- whether the source has materialized locally;
- which private locator resolves an opaque source ID;
- when the source was last reread and from what present-day question;
- which claims it supports, complicates, or contradicts;
- which rights, credit, or consent conditions constrain use;
- whether a public-safe formulation has passed human review.

The risk has two sides. If everything is forced into the public repository,
private people and records can be exposed. If private context remains scattered
and tacit, useful evidence can be forgotten, source rereading becomes difficult,
and agents may over-rely on prior summaries instead of returning to the record.

The proposed architecture treats the private and public Wikis as related but
different instruments. They share a grammar and tools; they do not share a
trust boundary.

## Evidence and present state

The current public repository already establishes several important facts:

- `docs/knowledge-bank/` is a public-safe professional knowledge base;
- the website is a selective projection, not a dump of all known material;
- protected sources can be represented through bounded metadata and anti-claims;
- citations, public-safety rules, graph checks, and evals govern publication;
- there is intentionally no public `/proofs` page;
- private transcripts, correspondence, community records, stakeholder lists,
  credentials, and other protected material are prohibited from the repo.

The architectural proposal below extends those commitments. It does not weaken
them.

## Goals

- Give private archival production a durable, governed home without making the
  public repository less safe.
- Let public and private Wikis inherit the same schemas, identifiers,
  validators, graph semantics, review receipts, and promotion contract.
- Make opaque source IDs resolvable on an authorized machine without committing
  local paths, cloud URLs, credentials, cookies, or tokens.
- Require periodic return to original sources and record when, why, and against
  which source version a rereading occurred.
- Preserve claims, anti-claims, uncertainty, collective credit, source rights,
  publication status, and protected absence through the full lifecycle.
- Support a bounded private-to-public promotion workflow that produces a small,
  inspectable candidate rather than copying a private graph into public Git.
- Allow public corrections to be reconciled back into private work without
  automatic synchronization.
- Keep LLM agents useful as researchers and critics while reserving consent,
  acceptance, and publication decisions for people.
- Make backup, recovery, deletion, and incident response part of the design.

## Non-goals and anti-claims

- This proposal does not create the private repository.
- It does not import, inventory, or publish any private source.
- It does not make a GitHub private repository equivalent to a secure vault.
- It does not authorize bulk ingestion merely because Jamie can access a source.
- It does not grant quotation, image, publication, or model-training rights.
- It does not automatically promote private claims to the portfolio.
- It does not require every private memory or record to enter Git.
- It does not collapse personal memory, professional evidence, collective
  history, and public portfolio copy into one undifferentiated graph.
- It does not replace conversation with collaborators, rights holders, or
  affected communities.
- It does not infer sole authorship from custody, technical authorship, account
  administration, or archival visibility.
- It does not make eval passage equivalent to factual truth, consent, editorial
  quality, hiring effectiveness, or production approval.
- It does not require a public Knowledge Wiki interface or a public `/proofs`
  page.

## Stakeholders and human gates

### Decision owner

Jamie Burkart is the decision owner unless a later amendment explicitly
delegates a decision. Acceptance requires Jamie to name a champion after the
current Knowledge Wiki pull request closes.

### Affected roles

- Jamie as archive custodian, subject, author, operator, and job seeker;
- collaborators and communities represented in sources or claims;
- future researchers, editors, photo editors, and application writers;
- maintainers of the public site and shared core;
- authorized agents operating against local or cloud sources;
- recipients who may receive tailored public or private exports.

### Human-only gates

The following cannot be auto-approved:

- accepting this RFP;
- connecting a real protected source;
- granting a person or agent private-repository access;
- deciding whether sensitive material belongs in Git at all;
- interpreting consent, rights, collective credit, or potential harm;
- approving a promotion bundle for the public repository;
- publishing a quote, image, personal fact, or collaborator-attributed claim;
- production deployment or a change in repository visibility;
- incident response decisions involving affected people.

Automated checks may block these gates. They may not open them.

## Detailed design

### Repository topology

The target topology is:

```text
knowledge-wiki-core (versioned package)
|-- public Knowledge Wiki: jamieburk.art
`-- private Knowledge Wiki: sibling private repository
    `-- local source resolver: untracked machine configuration
```

The private repository must be a separate repository, not a branch, worktree,
fork, subdirectory, or submodule of the public repository. A branch is not a
privacy boundary, and a submodule encourages accidental linkage and access
confusion.

Allowed dependency direction:

```text
public Wiki  -----> knowledge-wiki-core
private Wiki -----> knowledge-wiki-core
private research --reviewed promotion bundle--> public pull request
public corrections --explicit reconciliation--> private Wiki
```

Forbidden dependency direction:

```text
public build -X-> private repository
public CI    -X-> local source configuration
public graph -X-> private locators or raw evidence
```

There is no automatic bidirectional synchronization.

### Shared core package

A future accepted implementation should extract a package such as
`packages/knowledge-wiki-core` from behavior already proven in the public Wiki.
The package should own only trust-boundary-neutral contracts:

- schema primitives and versioning;
- stable ID and relationship formats;
- claim, anti-claim, source, event, person, organization, project, task, and
  review-receipt vocabularies;
- evidence-strength and claim-state transitions;
- sensitivity, rights, consent, credit, and publication-decision fields;
- graph validation and closure checks;
- source-resolver interfaces, never concrete private locators;
- promotion-bundle schemas;
- deterministic public-safety and decoded-leak scanners;
- migration utilities and compatibility tests;
- synthetic fixtures and operator-facing diagnostics.

The core must not contain Jamie's private data, public portfolio copy, machine
paths, cloud resource keys, credentials, or provider session state.

### Public Wiki responsibilities

The public Wiki remains the canonical source for approved professional claims
and public-facing contextual knowledge. It may contain:

- public or explicitly approved sources;
- bounded source metadata for protected evidence;
- public-safe claims and anti-claims;
- careful collective-credit relationships;
- approved public citations;
- publication decisions and human review receipts that reveal no protected
  content;
- website projections selected for a specific audience and purpose.

It must remain independently clonable, testable, buildable, and deployable with
no access to the private repository or local resolver.

### Private Wiki responsibilities

The private Wiki may contain governed working knowledge such as:

- private source metadata and access conditions;
- rereading notes and research questions;
- claim candidates, contradictions, and unresolved attribution questions;
- application-specific context not suitable for the public site;
- richer relationship and timeline work;
- proposed corrections and promotion bundles;
- links to externally stored protected artifacts through opaque IDs.

“Private” is not “unrestricted.” Family crises, health information, legal
material, third-party correspondence, raw community records, credentials, and
similarly sensitive evidence may remain outside Git as locator-only records or
may be deliberately absent. The private Wiki must support a reasoned `hold`,
`defer`, `locator-only`, or `do-not-process` decision.

### Local source resolver

An authorized machine may use a configuration such as:

```text
~/.config/jamieburk.art/knowledge-sources.yaml
```

The path may be overridden by `KNOWLEDGE_SOURCE_CONFIG`. The file is outside
both repositories, readable only by the local user, and covered by backup and
incident-response guidance appropriate to its sensitivity.

Illustrative, deliberately fake configuration:

```yaml
version: 1
sources:
  ARCHIVE-EXAMPLE-001:
    kind: local-directory
    locator: /example/private/archive
    access: local-authorized
  ARCHIVE-EXAMPLE-002:
    kind: cloud-folder
    locator: https://example.invalid/private-folder
    access: authenticated-browser-profile
```

The resolver may contain locators and an authentication-profile label. It must
not contain passwords, session cookies, API tokens, recovery codes, or private
keys. Those belong in the operating system keychain or provider-managed session
storage. Repository examples must use synthetic values.

The resolver interface should return a typed access plan and availability
status. It should not silently fetch, download, OCR, transcribe, or ingest a
source. Those actions require an explicit task with a recorded scope and output
policy.

### Stable identity and relationships

Public and private records need stable IDs to preserve provenance across
promotion without exposing locators. An ID identifies a conceptual record, not
its storage path.

The same public-safe source may have the same ID in both Wikis. A private-only
source ID may appear in a promotion bundle only when the ID and bounded metadata
are approved for publication. Otherwise, promotion produces a new public
evidence record with a documented private lineage retained solely in the
private Wiki.

Relationships must carry attribution and certainty. For example, `contributed
to`, `organized by`, `supported`, `implemented`, `operated`, and `founded with`
must not be treated as interchangeable edges.

### Rereading receipts

To keep archival work grounded in the present, every consequential return to an
original source should produce a receipt containing:

- opaque source IDs;
- reviewer identity and whether the reviewer is human or agent;
- review date and present research question;
- source version, export date, or content digest when available;
- access method and completeness limits;
- findings stated as claims and anti-claims;
- confirmed, corrected, contradicted, or newly proposed record IDs;
- rights, credit, privacy, and publication concerns;
- follow-up tasks and required human decisions.

A receipt is not a substitute for the source. Public receipts must omit private
locators, excerpts, identities, and facts unless separately approved.

### Promotion bundles

Private-to-public movement occurs through a generated but human-edited bundle.
The bundle is a small review object, not a private database export. It contains:

- a bounded proposed claim;
- public-safe context and date range;
- proposed credit language and named collective context when approved;
- supporting evidence classes and public citations;
- anti-claims and unresolved questions;
- rights, consent, sensitivity, and publication decisions;
- proposed public record IDs and projection surfaces;
- source completeness and counterevidence notes;
- required reviewers and their decisions;
- an expiry or rereview date when the evidence can drift.

The bundle is assembled in a clean temporary export with a deny-by-default
allowlist. A leak scan runs before a public branch is created. The final public
pull request contains only the approved public records and citations, not the
private bundle or its working history.

Promotion is complete only when a person reviews the rendered diff, decoded
files, generated artifacts, Git history, and proposed public language.

### Public-to-private reconciliation

Public corrections should be available to private work through an explicit
reconciliation command or review task. Reconciliation compares stable IDs and
records accepted wording, dates, anti-claims, and source-status changes. It does
not overwrite richer private notes or silently resolve conflicts.

## Public, private, and protected boundaries

### Suggested sensitivity classes

| Class | Meaning | Public repo | Private Git | External protected store |
| --- | --- | --- | --- | --- |
| `public` | Already public and safe to contextualize | Allowed | Allowed | Optional |
| `approved-public` | Reviewed and approved for this use | Allowed | Allowed | Optional |
| `private-working` | Useful private professional context | Prohibited | Allowed when necessary | Preferred for raw binaries |
| `protected` | Sensitive personal, collaborator, legal, community, or rights-constrained material | Prohibited | Metadata or locator only by default | Required by default |
| `secret` | Credentials, tokens, cookies, keys, recovery material | Prohibited | Prohibited | Keychain or secret manager only |
| `excluded` | Material deliberately not processed or retained | Prohibited | Decision record only | As decided by custodian |

Classification is necessary but not sufficient. An `approved-public` fact may
still be inappropriate for a particular audience, context, or composition.

### Protected absence

The system must be able to record that material is known to exist but should not
be opened, summarized, retained, or promoted. Absence can be an ethical and
editorial decision, not a data-quality defect to be optimized away.

## Security and privacy

### Threat model

The design must address at least:

- accidentally committing a local config or private export;
- leaking locators through stack traces, logs, screenshots, test snapshots,
  source maps, generated reports, shell history, or CI artifacts;
- copying private text into a public issue, PR, commit message, or agent prompt;
- public builds traversing sibling directories or resolving a private package;
- broad collaborator access to a private repository;
- repository visibility changing accidentally;
- sensitive material remaining in Git history after apparent deletion;
- a compromised browser session, machine, dependency, or automation token;
- generated claims laundering uncertain private interpretation into public fact;
- backups preserving data beyond a deliberate deletion decision.

### Required controls

- Separate repositories and credentials, with least-privilege collaborator
  access.
- No private repository as a dependency, submodule, workspace, or CI checkout of
  the public repo.
- Local config outside Git with restrictive file permissions.
- Secrets in a keychain or secret manager, never in YAML or environment-example
  files.
- Synthetic fixtures for public CI and core-package tests.
- Allowlisted promotion exports and denylisted secret/private patterns.
- Scanning of decoded, generated, ignored, staged, and committed candidate
  surfaces before public push.
- Logs that use opaque IDs and redact locators by default.
- No upload of private artifacts to public CI, model eval services, or PR
  attachments.
- Documented credential rotation, access revocation, Git-history response, and
  affected-person notification procedures.
- Encrypted backups where appropriate and periodic restore tests.

No scanner proves safety. Controls reduce risk and create useful stopping
points for human review.

## Collective credit and rights

The shared core should require fields that keep claims socially accurate:

- Jamie's role and evidence for that role;
- named collaborators or collective context when public and approved;
- alternate role formulations and anti-claims;
- source creator, custodian, subject, and rights holder as distinct concepts;
- permission to possess, process, quote, reproduce, and publish as distinct
  decisions;
- whether an account or artifact had multiple operators;
- whether a public outcome belongs to a coalition, institution, elected body,
  neighborhood, or other collective rather than to Jamie alone;
- uncertainty and who should be consulted before stronger language is used.

Custody is not authorship. Technical implementation is not public organizing.
Facilitation is not unilateral creation. The system should make these
distinctions easier to preserve than to erase.

## Implementation plan

Implementation begins only after this RFP is accepted and the current Knowledge
Wiki pull request is closed.

### Phase 0: decision and threat review

- Name a champion and affected reviewers.
- Decide private repository ownership, hosting, access, and backup policy.
- Review this threat model and define an incident contact path.
- Inventory current schemas by responsibility without moving private data.
- Record the accepted scope and unresolved decisions.

Exit: RFP is `accepted`; no private sources have moved.

### Phase 1: extract the shared core

- Create `packages/knowledge-wiki-core` inside the public monorepo.
- Move only neutral schemas, validators, graph semantics, and synthetic fixtures.
- Preserve current public behavior through characterization tests.
- Prove the public site builds with the package and no private dependencies.

Exit: no-behavior-change public migration passes deterministic and rendered
checks.

### Phase 2: scaffold the private repository

- Create a private repository from a clean template, not from public Git history
  plus later secrets.
- Pin an explicit core-package version or immutable commit.
- Add sensitivity defaults, protected-absence states, private leak checks,
  access documentation, and synthetic fixtures.
- Verify repository visibility and collaborator access through a human review.

Exit: private repo works only with synthetic data and recovery documentation.

### Phase 3: implement local source resolution

- Add the source-resolver interface and local config loader.
- Validate file permissions and reject secrets in config.
- Return typed availability and access plans without implicit ingestion.
- Test missing, stale, offline, partially materialized, and unauthorized states.

Exit: synthetic source IDs resolve locally; no real source has been ingested.

### Phase 4: one governed vertical slice

- Select one low-risk, already bounded project question.
- Authorize access explicitly.
- Reread the original source and create a private receipt.
- Produce one promotion bundle with claims, anti-claims, credit, and rights.
- Leak-test a clean export and open a human-reviewed public pull request.
- Reconcile any public correction back into the private Wiki.

Exit: the complete lifecycle is demonstrated without a boundary violation.

### Phase 5: measured migration

- Add projects only when there is a present research purpose.
- Prefer metadata and external raw storage over bulk binary ingestion.
- Measure unresolved claims, stale rereadings, credit reviews, promotion
  outcomes, false-positive scans, and operator burden.
- Stop or redesign if the system encourages indiscriminate capture.

Exit: representative use demonstrates value and sustainable operations.

### Phase 6: recommendation

- Publish operator and contributor learning materials.
- Complete backup and recovery exercise.
- Review incidents, near misses, maintenance load, and collaborator feedback.
- Advance to `recommended` only if ordinary use is safer and clearer than the
  prior practice.

## Evaluation and release criteria

### Architectural invariants

- A clean clone of the public repo builds and passes checks with no private
  repository, local config, cloud session, or private environment variable.
- Public package manifests, lockfiles, CI, Docker contexts, and source maps do
  not reference the private repo or local resolver.
- The shared core contains only synthetic fixtures and trust-neutral code.
- The private repo can consume a pinned core version without changing public
  visibility or publishing private artifacts.

### Privacy and leakage evals

- Mutation tests insert fake private paths, cloud locators, credentials,
  encoded secrets, ignored files, logs, generated reports, and Git-history
  artifacts; the appropriate gates fail.
- Promotion rejects records without sensitivity, rights, credit, anti-claims,
  source completeness, and human decision fields.
- Decoded and rendered candidate inspection finds no protected value that is
  hidden by encoding or generation.
- Public CI is unable to resolve private source IDs by design.

### Knowledge-quality evals

- A rereading receipt binds findings to a source version or digest and present
  research question.
- Contradictory evidence remains visible and blocks unqualified promotion.
- Role language does not strengthen automatically as evidence accumulates.
- Collective outcomes retain collective attribution.
- Public wording can be traced to public-safe evidence and explicit decisions.
- Stale or superseded source readings produce a review task, not silent reuse.

### Human review

- Jamie reviews one synthetic and one authorized low-risk vertical slice.
- At least one reviewer attempts to find a privacy, rights, credit, or
  attribution failure.
- Any collaborator-specific claim follows the review appropriate to its risk.
- The rendered public diff is reviewed independently of machine scores.

### Operational release gates

- Restore a private repository and its external locator configuration from
  backups without exposing secrets in logs.
- Revoke a test collaborator and test token successfully.
- Exercise a simulated accidental-publication response.
- Document package upgrades, schema migrations, source unavailability, and
  decommissioning.

The implementation is `ready-for-release` only when all deterministic criteria
pass and required human gates are explicitly recorded. It is not `recommended`
until sustained use demonstrates lower risk and manageable maintenance.

## Migration, operations, and recovery

Core schemas require semantic versioning and explicit migration commands.
Public and private repos may upgrade on different schedules; compatibility must
be checked rather than assumed. A private repository must not force an urgent
public deploy, and a public content update must not rewrite private history.

Operational ownership must cover:

- package releases and compatibility windows;
- schema and identifier migrations;
- private access review;
- source-config backup and restore;
- external raw-source custody and checksums;
- stale-locator and stale-rereading queues;
- deletion and retention decisions;
- incident response and credential rotation;
- eventual export or decommissioning in open formats.

Raw protected binaries should generally remain in their source system or an
encrypted archival store. The private Wiki records provenance, digests, and
access conditions rather than becoming a second uncontrolled document lake.

## Teaching and documentation

Before release, maintainers need:

- a public contributor guide explaining the trust boundary;
- a private operator guide for source resolution and rereading receipts;
- a promotion-bundle review checklist;
- examples of bounded claims, anti-claims, and collective-credit language;
- a source-rights and protected-absence guide;
- setup, backup, restore, revocation, and incident-response runbooks;
- a package migration guide;
- synthetic end-to-end examples that require no private access;
- a short explanation for agents that access authorization does not equal
  publication permission.

## Drawbacks

- Two repositories and a shared package create versioning, migration, and
  maintenance work.
- A private graph can encourage accumulation beyond a present need.
- Rich metadata about protected sources can itself become sensitive.
- Promotion bundles add friction to portfolio updates.
- Opaque identifiers improve safety but can make research harder to navigate.
- Automated leak scanning can create false confidence or burdensome false
  positives.
- Git is a poor home for large binaries, mutable cloud documents, and data that
  may need complete deletion.
- A sophisticated apparatus can privilege what is easily structured and scored
  over embodied, relational, artistic, or atmospheric knowledge.
- Jamie may become the sole long-term operator of an overly complex system.

These costs are reasons to begin with a small vertical slice and retain the
option to close the RFP.

## Alternatives considered

### Keep one public Wiki only

This preserves the strongest boundary and lowest maintenance burden. It does
not solve private source resolution, rereading receipts, or durable claim
development. It remains preferable if the private system cannot be operated
safely.

### Put private records on a private branch or in ignored directories

This has low setup cost but is rejected. Branches, worktrees, and ignore rules
are not security boundaries; mistakes, history, tooling, or repository
visibility changes can expose material.

### Use one private repository and generate the public site from it

This creates a single source of truth but makes public builds dependent on a
more sensitive system and increases the blast radius of generation errors. It
is rejected for the initial architecture.

### Use a private fork of the public repository

A fork begins with unnecessary public application history and encourages drift
between copies. Its relationship may also be visible depending on hosting. A
clean sibling repository with a versioned core is clearer.

### Keep private context only in local folders and cloud drives

This avoids a new database but preserves the current difficulty of source
discovery, relationship tracking, rereading, and promotion. It remains a valid
choice for raw evidence and excluded material.

### Adopt an existing personal knowledge platform

An encrypted notes or knowledge-graph product may provide sync, search, and
access controls with less custom code. It may not enforce the same claim,
anti-claim, credit, promotion, and public-build contracts. This should be
researched before acceptance, especially for private notes and raw-source
custody.

### Store local locators in an encrypted file inside the private repo

This improves portability but combines encrypted secret material with Git
history and complicates rotation and deletion. A keychain-backed external
configuration is preferred initially, subject to operational review.

### Do nothing yet

This is the current decision. Recording the RFP now preserves the design while
the current pull request is completed and studied. The proposal can remain
`proposed`, move to `exploring`, or close without implementation.

## Unresolved questions

- Should the shared core be an internal workspace package, a separately
  versioned repository, or both over time?
- Which private-repository host, owner, access model, and geographic storage
  policy are appropriate?
- Should personal and private professional knowledge share one private Wiki or
  use separate repositories with the same core?
- Which protected records may enter private Git, and which must remain
  locator-only or deliberately absent?
- What local config format and keychain integration best support macOS while
  remaining portable?
- What backup system can honor both disaster recovery and complete deletion?
- Which stable IDs may be public, and when should promotion mint a new public
  identity?
- How should source versions be represented for mutable cloud documents and
  authenticated social-media surfaces?
- What constitutes sufficient collaborator review for role and credit claims?
- Who can act as an independent privacy and threat-model reviewer?
- How will the system measure whether it supports present inquiry instead of
  indiscriminate accumulation?
- What maintenance budget is acceptable before the architecture should be
  simplified or discontinued?

## Decision record

| Date | Actor | Decision or revision | Evidence or reason |
| --- | --- | --- | --- |
| 2026-07-19 | Jamie Burkart | Proposed a sibling private Knowledge Wiki inheriting the same core as the public professional Wiki. | The public Wiki needs to remain newspaper-safe while private archival production needs a governed, resolvable workspace. |
| 2026-07-19 | Codex, drafting support | Drafted RFP 0001 and left implementation deferred. | Preserve the architecture for review after the current Knowledge Wiki pull request closes. |

## References

- [Repository Knowledge Bank guidance](../README.md#knowledge-bank)
- [Ember RFC process](https://rfcs.emberjs.com/create-rfc)
- [Ember RFC stages](https://rfcs.emberjs.com/stages/)
- [RFP process for this monorepo](README.md)
