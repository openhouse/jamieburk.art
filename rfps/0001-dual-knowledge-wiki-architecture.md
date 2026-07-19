---
rfp: "0001"
title: Dual Knowledge Wiki and shared core architecture
status: proposed
authors:
  - Jamie Burkart
drafting_support:
  - Codex
decision_owner: Jamie Burkart
champion: unassigned
created: 2026-07-19
last_updated: 2026-07-19
implementation_gate: Revisit only after pull request 239 is closed; implementation requires a separate approved pull request and named champion
supersedes: []
superseded_by: null
related:
  - docs/architecture/ADR-knowledge-wiki-name-and-model.md
  - docs/knowledge-bank/intake-and-maturation.md
  - docs/knowledge-bank/indexes/source-channel-coverage.md
  - docs/knowledge-bank/citational-care.md
  - https://github.com/openhouse/jamieburk.art/pull/239
---

# RFP 0001: Dual Knowledge Wiki and shared core architecture

## Summary

Create a shared, person-independent Knowledge Wiki core package used by two
separate knowledge systems: Jamie Burkart's private personal Knowledge Wiki and
the public-safe professional Knowledge Wiki in `jamieburk.art`. Keep raw source
material and machine credentials outside both repositories. Introduce a
human-gated promotion process through which selected, defensible knowledge can
move from private research into the public professional Wiki and, separately,
into the portfolio.

The proposed system follows one governing principle:

> Shared machinery, separated knowledge, deliberate publication.

This RFP records a future direction. It does not authorize implementation,
repository creation, data migration, package publication, source acquisition,
or deployment in the pull request where it is introduced.

## Status and decision requested

**Status:** Proposed and deferred.

The decision requested after pull request
[#239](https://github.com/openhouse/jamieburk.art/pull/239) closes is whether
this architecture should move to `exploring`. Moving to `exploring` would
authorize a bounded design and threat-model pass, not implementation.

Before implementation can begin, Jamie must:

1. approve the architecture or a revised successor;
2. name a champion;
3. approve the private-repository and backup threat model;
4. approve an implementation pull request with migration and rollback scope.

No active work in pull request #239 should be expanded to implement this RFP.

## Motivation

### The current system correctly protects source material

The current public repository contains a public-safe Knowledge Wiki, a
machine-readable claim and citation registry, broader proof records, and a
selective portfolio projection. Raw transcripts, private correspondence,
participant records, protected source coordinates, unapproved media, and other
sensitive materials stay outside the repository.

That boundary is correct and should remain.

### Archival-production reports are not complete access memory

Repeated archival-production passes have preserved public-safe findings,
methods, limitations, source categories, and opaque `protectedLocatorId`
values. They intentionally do not preserve private filesystem paths, Drive
identifiers, authentication context, or raw source contents.

This creates a missing middle layer. A future researcher may understand what a
pass found without being able to determine:

- which lawful source system holds the original;
- whether it is currently available or only represented by a prior reading;
- whether a cloud file has materialized locally;
- whether an authenticated browser or connector is required;
- which account or repository context is relevant;
- how to reopen the source without exposing its locator publicly;
- when the source was last reread with the present research question in mind.

### Private understanding can be deeper than public presentation

The professional Wiki benefits from clear, defensible, newspaper-safe claims.
It should not carry every relationship, interpretive note, uncertainty,
protected chronology, or sensitive source reading needed to understand Jamie's
life and work responsibly.

A private personal Knowledge Wiki can preserve that thicker context while the
public professional Wiki remains a purpose-built representation. Both systems
need the same durable concepts: pages, sources, readings, assertions, claims,
anti-claims, corrections, relations, rights states, publication decisions, and
review dates.

Duplicating those concepts in two unrelated implementations would invite schema
drift and inconsistent safety rules. Sharing the data itself would collapse the
privacy boundary. A shared core package with separate repositories addresses
both problems.

### Original-source rereading is a continuing practice

The source of truth is not the latest summary. Important pages should
periodically return to original records with a present research question. The
system should distinguish `located`, `opened`, `read`, `closely read`,
`corroborated`, and `approved for public use` rather than treating access as
understanding or understanding as publication permission.

## Goals

1. Give the public and private Wikis one shared, versioned implementation of
   their common domain model and deterministic tooling.
2. Keep Jamie-specific records, private context, and source locators out of the
   core package.
3. Keep the public professional Wiki independently clonable, testable,
   buildable, and deployable without private access.
4. Create a private, local-first place for governed sensitive knowledge,
   contextual annotations, unresolved memories, and source-reading depth.
5. Keep raw source archives, credentials, and browser sessions outside both
   repositories.
6. Resolve opaque source handles through a machine-local access layer without
   publishing private paths or identifiers.
7. Make private-to-public promotion explicit, reviewable, bounded, and
   human-approved.
8. Preserve stable identities, correction history, collective credit,
   protected absence, and publication boundaries through migration.
9. Support periodic original-source rereading and record what changed in the
   interpretation.
10. Allow future people or projects to reuse the generic core without
    inheriting Jamie's records.

## Non-goals

This RFP does not propose:

- implementing the architecture in pull request #239;
- adding a public Knowledge Wiki route to the portfolio;
- automatically publishing private records or generated prose;
- putting raw archives, source binaries, transcripts, messages, participant
  databases, photographs, or credentials into Git;
- treating a GitHub private repository as a universal encrypted vault;
- introducing a CMS, hosted database, graph database, search service, private
  document browser, authentication system, or editing interface;
- replacing the original source systems with the Wiki;
- making every private record professional or every professional record public;
- resolving collaborator rights, consent, or authorship through automation;
- committing machine-specific source paths to either shared repository;
- migrating all existing Knowledge Wiki records in one change;
- renaming current compatibility paths merely for conceptual symmetry.

## Terminology

### Knowledge Wiki core

A generic, person-independent package containing schemas, parsers, graph
construction, validators, query and report tools, policy profiles, and
promotion-bundle contracts. It contains no Jamie-specific records or source
coordinates.

### Private personal Knowledge Wiki

A local-first governed repository for sensitive contextual knowledge,
protected source readings, research notes, people and relationship context,
unresolved memories, private claims and anti-claims, and publication decisions.
Private does not mean unrestricted.

### Public professional Knowledge Wiki

The public-safe evidence and editorial system in `jamieburk.art`. The
repository is public even though the Wiki has no public website route. Every
committed record must be safe and fair if quoted outside its intended context.

### Source vault

The lawful original systems and local encrypted storage that hold raw source
material. Examples include original cloud documents, email systems, message
archives, databases, photographs, transcripts, and source binaries. A vault is
not a Wiki repository.

### Research access layer

Machine-local configuration and state that resolve logical or protected source
handles to lawful source locations and access methods. It contains no
credentials in plaintext and is not committed.

### Promotion bundle

A generated, temporary, public-safe proposal containing the records and
boundaries needed to consider moving selected knowledge from the private Wiki
into the public professional Wiki. It is a review artifact, not an automatic
export.

### Portfolio projection

Audience-specific website copy and media selected from approved public
professional knowledge. Public-Wiki eligibility does not require portfolio
selection.

## Current state

### Repository implementation

The current Knowledge Wiki engine is functional but coupled to this repository:

- generic page parsing, graph construction, checking, queries, tasks, reports,
  and evaluation live under `scripts/knowledge-wiki/`;
- generic-looking record schemas live in
  `apps/www/src/data/knowledge-bank/schema.ts`;
- the graph library imports Jamie-specific canonical records and proof data
  directly from `apps/www`;
- repository root, Wiki root, and root page identity are hard-coded;
- `packages/` is reserved but contains no shared package;
- the accepted foundation ADR scopes the Wiki to the public portfolio
  repository and keeps protected raw sources elsewhere.

This arrangement was appropriate for proving the foundation. A second real
consumer would justify extracting the generic behavior.

### Existing privacy bridge

Canonical records already support opaque `protectedLocatorId` values. Those
identifiers preserve a source relationship without exposing the underlying
location in the public registry. The repository also contains a public-safe
source-channel coverage view.

Neither mechanism tells a trusted local researcher how to resolve a protected
handle. The missing capability is a private resolver, not a more detailed
public source record.

### Existing lifecycle

The current lifecycle already distinguishes capture, triage, source records,
close reading, candidate claims, corroboration, promotion, editorial selection,
public projection, correction, and renewed research. This RFP extends that
model across explicit repository and source-vault boundaries rather than
replacing it.

## Proposed design

### Topology

```text
                 knowledge-wiki-core
                    /           \
                   /             \
    private personal Wiki      jamieburk.art
             |                      |
             |                      +-- public professional Wiki
             |                      +-- selective portfolio
             |
    research access layer
             |
         source vault
```

The dependency arrows point from each Wiki to the core. The core never imports
either Wiki's content. The public repository never imports the private Wiki or
research access layer at build time, runtime, or deployment time.

### Repository responsibilities

| Component | Owns | Must not own |
| --- | --- | --- |
| Knowledge Wiki core | Schemas, parsers, graph compiler, validators, policy profiles, CLI contracts, fixtures | Personal records, portfolio copy, private paths, credentials |
| Private personal Wiki | Governed private pages, contextual readings, sensitive claims and anti-claims, private decisions, logical source references | Passwords, session cookies, raw bulk exports, automatically public output |
| Public professional Wiki | Newspaper-safe pages, defensible claims, public-safe source records, corrections, opportunities, publication boundaries | Raw private evidence, private source coordinates, runtime private dependencies |
| Portfolio | Selected public copy, approved citations, cleared media | Wiki browser, automatic publication of all eligible claims |
| Research access layer | Local root aliases, protected-handle resolution, availability state, access prerequisites | Plaintext credentials, committed configuration, public output |
| Source vault | Immutable or source-native raw evidence and preserved originals | Automatic publication authority |

### Shared core package

The proposed package name is `@openhouse/knowledge-wiki-core`. The name is
provisional until the RFP is accepted.

The core should provide:

- governed Markdown frontmatter parsing;
- stable page, source, claim, inquiry, correction, and decision identities;
- typed relations and graph compilation;
- canonical-reference adapters supplied by each consumer;
- source, evidence, reading, claim, anti-claim, correction, promotion, rights,
  consent, and projection schemas;
- configurable repository and Wiki roots;
- public and private policy profiles;
- deterministic checks, tests, queries, tasks, reports, and redaction helpers;
- promotion-bundle generation and validation;
- fixtures that contain no Jamie-specific information;
- an API and CLI version contract.

The core must not:

- assume a Next.js application;
- import `jamieburk.art` records;
- know Jamie's name, projects, source IDs, filesystem, accounts, or URLs;
- open authenticated services by default;
- render a public site;
- send telemetry;
- mutate original sources;
- define publication decisions for either consumer.

### Package distribution

The preferred end state is a small standalone public repository with tagged,
versioned releases. Both consumers pin an exact compatible package version in
their lockfiles.

During exploration, a temporary workspace package may be used to prove the
boundary without publication. A filesystem dependency must not become the
accepted production mechanism because it would make cloning and CI depend on a
specific sibling-directory layout.

Publishing to npm, installing from a pinned Git tag, or using another package
registry remains an implementation choice. The selected mechanism must support
reproducible installation without granting the public repository access to the
private one.

### Policy profiles

The core should separate data shape from environment policy.

The `public-professional` profile should:

- reject private filesystem paths and private cloud locators;
- reject credentials and credential-like values;
- permit only approved public or public-safe narrative;
- enforce redacted public-registry behavior;
- require publication boundaries and review dates;
- preserve current no-public-Wiki-route behavior;
- make protected source handles non-resolvable.

The `private-personal` profile should:

- allow restricted and private governed pages;
- allow sensitive contextual notes and source readings;
- require sensitivity, custody, access, rights, consent, and retention fields
  where applicable;
- distinguish memory, testimony, original source, inference, and independent
  corroboration;
- reject plaintext credentials and browser tokens;
- reject ungoverned bulk source copies unless a separately approved vault
  policy permits them;
- require explicit promotion decisions before any public export.

The private profile is not simply the public profile with validation disabled.
It is more expressive and also more demanding about custody and risk.

### Research access layer

Machine-specific source access should remain outside both repositories. A
default location may follow the operating system's user configuration
convention, with an explicit environment override for trusted tools.

The configuration should contain:

- stable logical root aliases;
- source kind and lawful custody;
- local path or service locator;
- materialization behavior such as cloud-on-demand;
- read-only expectation;
- required authenticated surface or connector;
- credential reference, never credential value;
- last availability verification;
- librarian notes and cautions;
- mappings from approved protected handles to local resolution instructions.

Credentials should remain in an operating-system credential store or the
authenticated application's own session. Browser cookies and request tokens
must not be exported into the resolver.

Expected local commands include:

- `wiki research doctor`: validate configuration and summarize availability;
- `wiki research tasks`: list unmapped or unavailable protected handles;
- `wiki research resolve <id>`: resolve one handle deliberately;
- `wiki research verify <id>`: record a bounded availability check;
- `wiki research reread <id>`: begin a dated source-reading record.

Commands should redact private locations by default. CI should validate only
the public schema and synthetic example, never require or inspect a user's
local configuration.

### Private personal Wiki

The private Wiki should be local-first. Whether it receives a private remote is
an unresolved threat-model and backup decision, not an assumption.

It may contain:

- private project, person, organization, place, event, and timeline pages;
- protected source readings and precise contextual annotations;
- unresolved memories retained as memories rather than facts;
- sensitive claims and anti-claims;
- collaborator, authorship, credit, consent, and rights context;
- research questions and negative findings;
- mappings among private source identity, public replacements, and portfolio
  projections;
- librarian notes about why material was retained and how it should be read;
- private promotion decisions and review history.

It should not contain:

- plaintext credentials or exported browser sessions;
- raw mailbox, message, social, participant, donor, customer, or stakeholder
  corpora merely because they are accessible;
- duplicated photo or document archives better retained in a source vault;
- material Jamie does not have a lawful and ethical basis to preserve;
- automatic publication hooks.

If a remote is later approved, the remote should contain only the governed
private Wiki, not the source vault. Remote access, collaborators, backups,
retention, incident response, and history-rewrite policy require explicit
decisions.

### Public professional Wiki

The current `jamieburk.art` Knowledge Wiki remains the canonical public-safe
professional layer. It must continue to:

- build and test without the private repository;
- contain no private source coordinates or raw protected material;
- treat the website as a smaller editorial projection;
- keep rights, consent, collective credit, and human approval distinct from
  evidentiary support;
- preserve corrections and held claims without exposing private reasoning;
- reject any promotion bundle that fails public policy.

The public Wiki may use an opaque source handle only where the handle itself is
approved as public-safe and cannot be resolved from public code or artifacts.
Private-to-public identity mappings remain private.

### Original-source rereading

A source reading should record:

- the research question that prompted the return;
- source identity and lawful custody;
- access and reading dates;
- reader identity;
- source version, fingerprint, or preservation state when available;
- exact locators stored only at the permitted layer;
- atomic assertions;
- limitations and anti-claims;
- conflicting or contextual evidence;
- what changed from the prior interpretation;
- rights, consent, and public-use state;
- the next review condition.

The system must not collapse these states:

```text
remembered
  != located
  != available
  != opened
  != closely read
  != corroborated
  != defensible
  != approved for public use
  != selected for the portfolio
```

Periodic review should be triggered by a material claim change, new evidence,
a correction, a new application purpose, an expired review date, or a
high-impact page promotion. It should not require rereading every source on a
fixed schedule without a research question.

### Promotion bundle

The private Wiki may generate a temporary promotion bundle containing only:

- proposed public page, source, claim, and relation IDs;
- a public-safe source description;
- atomic public-safe assertions and limitations;
- proposed claim and anti-claim wording;
- collective-credit and attribution boundaries;
- rights and consent status appropriate for the proposed use;
- proposed public surfaces;
- review date and requested reviewers;
- a non-reversible provenance receipt where useful;
- a checklist of excluded private fields and materials.

The bundle must not contain private paths, Drive IDs, signed URLs, raw excerpts,
private names, source-access instructions, credentials, or a reversible mapping
to private identifiers.

Promotion is a human-gated sequence:

```text
original source
  -> private source reading
  -> private candidate claim and anti-claim
  -> corroboration and contextual review
  -> generated public-safe promotion candidate
  -> public-safety and credit review
  -> Jamie approval
  -> ordinary pull request to jamieburk.art
  -> public professional Wiki record
  -> optional portfolio selection
```

The public repository receives ordinary reviewed source files, not a runtime
connection to the private Wiki. The promotion tool may assist with drafting but
must not push, merge, publish, or deploy automatically.

### Identity and provenance

Stable public IDs and private IDs occupy different trust domains.

- Existing public IDs should remain stable during migration.
- A private record may have a public successor without sharing its private ID.
- The private Wiki may store the mapping from private source to public record.
- The public Wiki must not need that mapping to function.
- A hash or receipt must not be used where it could enable guessing sensitive
  contents from a small candidate set.
- Correction history should survive promotion without publishing protected
  prior wording.
- Collective project identity must remain distinct from individual authorship.

### Configuration

Each consumer should supply a small configuration object to the core:

```ts
type KnowledgeWikiConfig = {
  rootId: string;
  wikiRoot: string;
  policyProfile: "public-professional" | "private-personal";
  canonicalReferenceProvider: CanonicalReferenceProvider;
  outputRoot: string;
};
```

This interface is illustrative, not accepted API. The important boundary is
that the core receives repository-specific roots and canonical references
through adapters rather than importing Jamie-specific modules.

## Privacy, security, rights, and consent

### Threats

The design must account for:

- a sensitive value entering Git history;
- an accidentally public or misconfigured remote;
- a private file entering a package, cache, CI log, build artifact, or support
  bundle;
- machine-specific paths revealing names, projects, or account structure;
- browser tokens being copied into configuration;
- a promotion bundle preserving reversible private identifiers;
- a private repository concentrating more information than necessary;
- a collaborator receiving broader access than intended;
- a compromised machine or credential store;
- package-version drift weakening one consumer's validation;
- private evidence being treated as permission to quote or publish;
- inferred relationship or identity data becoming an unsupported fact.

### Required controls

Before implementation is considered complete:

- the public build must have no dependency edge to the private repository;
- both repositories must scan tracked content for credentials and unsafe paths;
- local configuration and generated private state must be ignored and excluded
  from containers, packages, and support bundles;
- private repository remote behavior must be explicit and tested;
- credentials must use an approved credential store or authenticated
  application session;
- raw sources must remain read-only during research wherever possible;
- publication must require explicit record-level review;
- promotion output must be allowlist-based rather than blacklist-only;
- decoded and normalized leak variants must be tested;
- logs must redact private locators and values;
- private backups and recovery must be documented before relying on the system;
- rights, consent, and attribution must remain human decisions.

### Authorization boundary

Jamie's authorization to research his archives does not create ownership,
publication rights, quotation permission, or consent for third-party material.
The system must preserve those distinctions at every layer.

## Migration and compatibility

Migration should preserve current behavior before adding new capability.

1. Capture the current public Wiki's checks, graph, reports, queries, and test
   fixtures as a baseline tied to an unchanged commit.
2. Extract generic schemas and tooling behind adapters without moving Jamie's
   data or changing generated public output.
3. Keep existing `knowledge-bank`, `knowledge:*`, and `wiki:*` commands as
   compatibility wrappers during transition.
4. Preserve existing page, claim, source, proof, correction, and occurrence
   IDs.
5. Preserve `docs/knowledge-bank/` as the public compatibility path unless a
   separate accepted proposal authorizes migration.
6. Prove byte-equivalent or semantically equivalent public registries and Wiki
   reports where timestamps or source commits are expected to differ.
7. Introduce the private Wiki with synthetic fixtures before adding private
   records.
8. Pilot the promotion flow using a low-risk, already public source rather than
   sensitive evidence.
9. Migrate no source locator until its custody, access, and retention policy is
   explicit.

The first package extraction must be a no-feature-change refactor. If behavior
changes, it should be separated into a later implementation stage.

## Rollout

### Stage 0: RFP exploration

Entry criteria:

- pull request #239 is closed;
- Jamie moves this RFP to `exploring`;
- a champion is named.

Work:

- complete the threat model;
- decide private-repository backup and remote posture;
- inventory generic versus Jamie-specific code;
- prototype package boundaries with synthetic records;
- define promotion-bundle and policy-profile schemas.

Exit criteria:

- unresolved architectural questions have proposed answers;
- migration and rollback plans are reviewable;
- implementation scope is small enough for separate pull requests.

### Stage 1: Extract the core without behavior change

Work:

- create the core package;
- move generic parsing, graph, schema, and validation behavior;
- introduce repository adapters;
- retain command compatibility;
- compare current and extracted outputs.

Exit criteria:

- all existing checks pass;
- public output and behavior remain equivalent;
- generic fixtures contain no Jamie-specific data;
- package ownership and versioning are documented.

### Stage 2: Create a private Wiki skeleton

Work:

- create a local-first repository from synthetic fixtures;
- apply the private policy profile;
- add local-only configuration and state boundaries;
- add no private content until scanners and backup posture pass review.

Exit criteria:

- no remote exists unless separately approved;
- raw sources and credentials are excluded;
- private checks fail closed;
- recovery instructions have been tested.

### Stage 3: Implement research access

Work:

- define root aliases and protected-handle mappings;
- add redacted doctor, task, resolve, verify, and reread commands;
- map a bounded sample of existing protected handles;
- test cloud materialization and unavailable-source states.

Exit criteria:

- a trusted researcher can return to the sampled originals;
- default output exposes no private path;
- unavailable and unmapped are distinguishable;
- no credentials are stored in configuration.

### Stage 4: Pilot private-to-public promotion

Work:

- generate one allowlisted promotion candidate from an already public,
  low-sensitivity source;
- review it manually;
- submit it through an ordinary public pull request;
- verify rejection behavior with synthetic unsafe mutations.

Exit criteria:

- no private repository dependency reaches the public build;
- private identifiers and locators remain absent;
- public claims remain traceable and bounded;
- Jamie records approval separately from tool output.

### Stage 5: Consider broader use

Only after successful operation should the team consider:

- migrating selected private research notes;
- adding more protected-handle mappings;
- approving a private remote;
- inviting trusted collaborators;
- publishing the core package for reuse;
- recommending the architecture as the default practice.

Each expansion requires its own rights, access, maintenance, and threat review.

## Verification and evaluation

### Deterministic checks

The implementation should test that:

- both Wikis validate against the same pinned core contract;
- profile-specific fixtures pass only their intended profile;
- public records reject private paths, credentials, signed URLs, raw excerpts,
  and forbidden source fields;
- private records still reject plaintext secrets and ungoverned bulk sources;
- every public promotion field is allowlisted;
- normalized, encoded, escaped, and Unicode path variants cannot leak;
- private IDs cannot become public canonical references accidentally;
- public graph and build commands succeed with the private repository absent;
- generated public artifacts contain no private dependency, path, locator, or
  sensitive fixture;
- migration preserves stable public IDs and correction links;
- package-version incompatibility fails with a clear diagnostic;
- access commands redact locators unless a deliberate local reveal is
  requested;
- unavailable, unauthenticated, unmaterialized, unmapped, and not-recovered
  remain distinct states.

### Human evaluation

Automated checks cannot establish:

- whether private context has been interpreted fairly;
- whether a source deserves professional significance;
- whether collaborator credit is complete;
- whether publication is ethical or useful;
- whether rights or consent are adequate;
- whether the private Wiki feels safe enough to use honestly;
- whether the promotion workflow creates excessive burden;
- whether the public result helps a hiring reader understand Jamie.

Before `completed`, conduct at least:

- one trusted-researcher source-return exercise;
- one adversarial public-safety review;
- one collaborator-credit review on collective work;
- one recovery exercise from documented setup instructions;
- one public promotion reviewed and approved by Jamie;
- one hiring-reader check of the resulting public projection, if any.

### Success criteria

The architecture succeeds when:

1. a new public contributor can clone `jamieburk.art`, install dependencies,
   run checks, and build without knowing the private Wiki exists;
2. a trusted private researcher can locate a governed record, resolve an
   authorized source, reopen it, and record a new reading without exposing the
   source publicly;
3. the same core semantics and tools govern both repositories;
4. promotion creates a smaller, bounded public record rather than a copy of
   private knowledge;
5. Jamie can decline publication without losing the private research;
6. a package or policy failure cannot silently weaken public-safety checks;
7. future agents can understand how to return to the original source.

## Operational ownership

Jamie is the final decision owner for:

- private source access;
- publication and portfolio selection;
- collaborator naming and credit;
- rights and consent decisions;
- private remote and collaborator access;
- retention and deletion requests.

The implementation champion owns:

- core compatibility and release notes;
- migration and rollback coordination;
- security and privacy test maintenance;
- recovery documentation;
- stage evidence and RFP updates.

Each consuming repository owns its records, policy configuration, and lockfile.
Core releases must document breaking schema or behavior changes. Consumers
should upgrade deliberately rather than follow an unpinned branch.

Recovery documentation must explain:

- how to reinstall the pinned core version;
- how to restore a private Wiki backup without restoring secrets into Git;
- how to rebuild generated graphs and reports;
- how to detect missing cloud materialization;
- how to revoke or rotate compromised credentials;
- how to operate the public repository when all private systems are
  unavailable.

## How we teach this

Use this sentence first:

> The private and public Wikis share a grammar, not a memory.

New contributors should learn the four-layer distinction before learning any
command:

1. core behavior;
2. governed private understanding;
3. governed public professional knowledge;
4. raw original sources.

Canonical learning materials should include:

- the accepted version of this RFP;
- a core package README and API contract;
- a public contributor guide;
- a private researcher guide;
- a source-access setup guide;
- a promotion checklist;
- synthetic examples of accepted and rejected records;
- an incident and recovery guide.

Documentation should never require a public contributor to obtain private
access merely to understand the architecture.

## Drawbacks and risks

### More repositories and versions

Three code repositories plus local configuration and source systems create
coordination overhead. Core changes require compatibility management in two
consumers.

### Duplicated public and private concepts

The same project or source may have separate private and public records. That
duplication is intentional but can drift unless promotion and correction paths
are maintained.

### False confidence in privacy

A repository labeled private can still be copied, backed up, misconfigured,
shared too widely, or exposed through logs and tooling. The private Wiki may
also concentrate sensitive context that was previously distributed.

### Maintenance burden

Schemas, policy profiles, access mappings, rereading dates, and promotion
records require continuing care. A system intended to preserve memory can
become another source of stale metadata.

### Premature generalization

Extracting a core from one mature consumer and one not-yet-created consumer may
produce abstractions that reflect current assumptions too closely.

### Inhibited writing

If the private model is too rigid or surveillance-like, Jamie and trusted
collaborators may avoid recording uncertain, personal, or evolving thought. The
private Wiki must support provisionality and protected absence.

### Promotion friction

Strong human gates can slow publication. Weakening them would defeat the
architecture; improving their ergonomics is the appropriate response.

### Package supply and compatibility risk

A shared package creates another dependency surface. A compromised, missing,
or incompatible release could affect both Wikis. Exact pinning, small scope,
reviewed releases, and local recovery matter.

## Alternatives

### Keep the current public repository plus local configuration

Add only the research access layer and continue recording public-safe summaries
in `jamieburk.art`.

**Advantages:** least infrastructure and no package extraction.

**Limitations:** no governed place for sensitive context, private claims,
relationship knowledge, or private-to-public decisions.

This remains the strongest fallback if the private Wiki's maintenance burden
outweighs its value.

### Put public and private records in one repository

Use ignored directories or encrypted files inside `jamieburk.art`.

**Advantages:** one checkout and simpler relative paths.

**Limitations:** a high-consequence boundary failure, confusing contributor
expectations, difficult CI behavior, and increased risk of accidental staging
or packaging.

Not recommended.

### Make the entire Wiki private and generate the public repository

Treat the private Wiki as the only canonical source and generate all public
records from it.

**Advantages:** one knowledge authority and less duplicated editing.

**Limitations:** the public repository would become operationally dependent on
private infrastructure; generated public prose could obscure human editorial
ownership; public contributions and corrections would be harder.

Not recommended for the current portfolio.

### Use a Git submodule for the core

**Advantages:** exact Git identity without package publication.

**Limitations:** contributor friction, nested repository state, and awkward
dependency upgrades.

Possible for a prototype, not preferred as the teaching model.

### Duplicate the tooling in both repositories

**Advantages:** no shared dependency.

**Limitations:** schema drift, duplicated fixes, and inconsistent privacy
behavior.

Not recommended.

### Store encrypted raw sources in the private repository

**Advantages:** source and interpretation travel together.

**Limitations:** key management, large history, accidental decryption, unclear
deletion semantics, and unnecessary duplication of lawful source systems.

Not recommended as a default. A separate source-vault proposal may evaluate
specific preservation needs.

### Use Localgraph as the private Wiki

Localgraph may provide useful private indexing and source normalization.

**Advantages:** existing local-first concepts and communication-source support.

**Limitations:** an index is not necessarily the authored, governed,
Markdown-first Wiki described here; coupling would need evaluation.

Keep as a possible source and infrastructure collaborator, not an assumed
replacement.

### Do nothing

Continue relying on archival reports, human memory, and ad hoc source return.

**Advantages:** no new complexity.

**Limitations:** source-access knowledge remains fragile, private context has no
governed home, and future research may recursively summarize old findings
instead of returning to originals.

## Unresolved questions

1. Should the private Wiki remain local-only, or should curated records have a
   private remote?
2. What encrypted backup and recovery model is proportionate?
3. Should the core begin as a workspace package, pinned Git dependency, or
   published package?
4. Which existing schemas are genuinely generic, and which encode portfolio
   assumptions?
5. What is the minimum private-record schema that supports honest writing
   without turning the Wiki into a surveillance system?
6. Which sensitive data classes are categorically excluded even from the
   private Wiki?
7. How should private and public identity mappings survive correction or
   deletion requests?
8. What non-reversible provenance receipt is useful without enabling content
   guessing?
9. Which existing `protectedLocatorId` values are suitable for local
   resolution, and which should be retired or remapped?
10. Should private collaborators receive repository access, bounded exports,
    or purpose-specific review packets?
11. How should Localgraph, photo-fieldwork tooling, and authenticated browser
    research relate to the private Wiki without merging their data stores?
12. What evidence should move this architecture from `completed` to
    `recommended`?

## Decision log

| Date | Decision | Rationale |
| --- | --- | --- |
| 2026-07-19 | Establish an RFP space in the monorepo | Preserve substantial ideas without expanding active implementation scope |
| 2026-07-19 | Record the dual-Wiki architecture as proposed and deferred | The idea merits comprehensive study after pull request #239 closes |
| 2026-07-19 | Separate the source vault and credentials from both Wikis | A private repository is governed knowledge, not unrestricted secret storage |
| 2026-07-19 | Require the public repository to remain independently buildable | Public operation must not depend on access to protected systems |

## References

- [Knowledge Wiki foundation ADR](../docs/architecture/ADR-knowledge-wiki-name-and-model.md)
- [Knowledge intake and maturation](../docs/knowledge-bank/intake-and-maturation.md)
- [Source-channel coverage](../docs/knowledge-bank/indexes/source-channel-coverage.md)
- [Citational care](../docs/knowledge-bank/citational-care.md)
- [Knowledge Wiki page contract](../docs/knowledge-bank/schema.md)
- [Ember RFC creation process](https://rfcs.emberjs.com/create-rfc)
- [Ember RFC stages](https://rfcs.emberjs.com/stages/)
