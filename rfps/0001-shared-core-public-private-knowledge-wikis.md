---
rfp: 1
title: Shared Core for Public and Private Knowledge Wikis
stage: proposed
start_date: 2026-07-19
authors:
  - Jamie Burkart
  - Codex
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - public-portfolio
  - privacy-governance
  - research-operations
  - developer-experience
  - editorial
implementation: null
supersedes: []
superseded_by: null
---

# Shared Core for Public and Private Knowledge Wikis

## Summary

Create a reusable Knowledge Wiki core package consumed by two sibling systems:
Jamie's public professional Knowledge Wiki in `jamieburk.art` and a separate
private personal Knowledge Wiki. Keep original and highly sensitive source
material in a local Source Vault beneath both systems. Move knowledge toward the
public Wiki only through an explicit, reviewed publication packet. This RFP
defines the intended architecture and governance but does not authorize its
implementation before the current Knowledge Wiki pull request is closed and this
proposal is separately accepted.

## Motivation

The current public Knowledge Wiki has developed a strong evidence lifecycle:
intake, source, observation, claim and anti-claim, inquiry, publication decision,
and public projection. It also has a necessary constraint: everything committed
to this repository must be safe to publish.

That constraint protects Jamie and collaborators, but it prevents the public
repository from holding several kinds of context that can improve future
research:

- private memories and interpretations that have not been corroborated;
- exact relationships between opaque source IDs and protected originals;
- research notes involving correspondence or participant information;
- unresolved contradictions and possible leads;
- personal history that matters to Jamie but has no professional publication
  purpose;
- source-access and materialization state needed to return to originals;
- draft claims whose wording or collective-credit boundaries are not mature.

Earlier archival production can therefore leave a public-safe receipt without
leaving a sufficiently durable route back to the source. A later agent may know
that a protected source exists but not whether it lives in a filesystem folder,
an authenticated cloud collection, a repository, a communications archive, or
an earlier private research bundle. The agent may also be unable to distinguish
an unknown location from an unavailable file, an unmaterialized cloud object,
or an expired authenticated session.

The desired system should preserve depth without forcing that depth onto the
portfolio. Jamie's personal Wiki should be able to remember generously. His
professional Wiki should be able to publish deliberately. Both should use the
same technical and conceptual grammar so evidence does not become incompatible
as it moves through research, maturation, and composition.

## Goals

- Establish one reusable core package for Knowledge Wiki schemas, compilation,
  validation, policy enforcement, derived views, and tooling.
- Let a public professional Wiki and a private personal Wiki consume the same
  versioned core without sharing a content repository.
- Preserve a strict one-way publication boundary: private knowledge may produce
  a reviewed public candidate, while the public build never depends on private
  content or infrastructure.
- Make prior archival production discoverable through source and research-run
  records with explicit coverage and access states.
- Keep credentials and high-risk originals outside Git, including private Git.
- Preserve stable identity, provenance, collective credit, anti-claims, rights,
  uncertainty, and human publication authority across projections.
- Permit periodic return to original sources so interpretation remains grounded
  in present questions rather than frozen summaries.
- Give agents a documented, testable operating contract without granting them
  authority to publish, disclose, or accept architectural decisions.

## Non-goals

- This RFP does not create the private repository, publish a package, migrate
  current records, or change the portfolio website.
- It does not make the public Wiki a public editing platform or anonymous wiki.
- It does not put passwords, tokens, browser cookies, credentials, or signing
  keys in either repository.
- It does not place raw communications, complete social exports, participant
  datasets, financial records, or large media archives in Git by default.
- It does not make every private record eligible for professional publication.
- It does not equate access authorization with consent, rights clearance,
  corroboration, public interest, or editorial selection.
- It does not automatically synchronize private changes into the public site.
- It does not require the private Wiki to be hosted on GitHub. Remote custody is
  a separate risk decision.
- It does not replace the current canonical Knowledge Wiki during the open
  `feature/knowledge-wiki-E` pull request.

## Terminology

**Knowledge Wiki core**
: A content-free package containing the common domain model, compiler, policy
  engine, validators, CLI contracts, and reusable interface components.

**Public professional Wiki**
: The public-safe professional knowledge system in `jamieburk.art`. Its website
  is a selective projection of this knowledge, not a database dump.

**Private personal Wiki**
: A separate, access-controlled research and personal knowledge repository. It
  may contain private details that are appropriate for durable Git history, but
  it is not a credential store or unrestricted raw archive.

**Source Vault**
: Local or separately governed storage for original files, exports, databases,
  private correspondence, and other material that should not enter Git.

**Source Access Registry**
: Ignored machine-local configuration that resolves opaque source IDs to an
  authorized access method without placing credentials or private paths in the
  public repository.

**Publication packet**
: A bounded, reviewable proposal to add or change public knowledge. It contains
  public wording, evidence relationships, anti-claims, credit, rights state,
  intended surfaces, and review decisions, but excludes protected source data.

**Projection**
: A purpose-specific composition made from eligible knowledge. Projection is an
  editorial act and is not implied by factual maturity.

## Detailed design

### System topology

The target system has four trust layers:

```text
@jamie-burkart/knowledge-wiki-core
              |                 |
              v                 v
  public professional Wiki   private personal Wiki
              ^                 |
              |                 v
       reviewed publication   local Source Vault
             packet          and Access Registry
```

The dependency rules are strict:

1. Both Wikis consume a pinned release of the core package.
2. The core package contains no Jamie-specific content or private fixtures.
3. The public repository never imports from, builds against, or requires the
   private repository, Source Vault, or Source Access Registry.
4. The private Wiki may read a released public graph for comparison, but it must
   not mutate the public repository automatically.
5. A private record reaches the public repository only through a publication
   packet and an ordinary public pull request.
6. Closing, merging, or indexing a private record never publishes it.

### Repository topology

The anticipated repositories are:

```text
openhouse/jamieburk.art
  apps/www/
  packages/knowledge-wiki-core/     # initial package source, if accepted
  docs/knowledge-bank/              # current public Wiki root during migration
  rfps/

jamie-knowledge-private             # proposed private repository name
  apps/wiki/
  knowledge/
  research-runs/
  publication-candidates/
  policies/
```

The initial implementation may extract the existing compiler into
`packages/knowledge-wiki-core` inside this monorepo because `packages/*` is
already reserved for shared packages. The package can then be published through
an agreed private or public package channel so the sibling private repository
consumes a pinned version. Extracting the package into an independent public
repository remains a future option if neutral ownership or release cadence
becomes valuable.

The private repository name, host, visibility, encryption, and backup policy are
not accepted by this RFP. They require a threat-model review before creation.

### Core package responsibilities

The core package should own:

- schemas for entities, sources, observations, claims, anti-claims, inquiries,
  decisions, projections, rights, people, organizations, projects, events,
  assets, research runs, and publication packets;
- Markdown and structured-record parsing;
- stable-ID and relation validation;
- graph compilation, backlinks, indexes, wanted pages, and correction views;
- public and private policy profiles;
- field- and edge-level leakage prevention;
- source coverage and research-run receipt validation;
- deterministic public-packet generation;
- schema versioning and migrations;
- command-line contracts for checking, querying, and generating derived views;
- reusable accessible components for private and public operator interfaces;
- synthetic fixtures and adversarial tests.

The core package should not own:

- Jamie-specific content or prose;
- actual source locators, account identifiers, or credentials;
- deployment configuration for either application;
- raw archives or generated private indexes;
- a default decision that private knowledge should be published;
- a network client that silently retrieves or mutates provider data.

The package publication allowlist must be explicit. `npm pack --dry-run` or its
equivalent must be inspected and tested so source content, generated reports,
local paths, and credentials cannot enter a release.

### Data classifications

The shared model should recognize at least three storage classifications:

| Classification | Permitted location | Typical material |
|---|---|---|
| `public` | Public professional Wiki | Public-safe claims, sources, guardrails, projections |
| `private-repository` | Private personal Wiki | Private notes, unresolved memories, protected source metadata, research context |
| `vault-only` | Source Vault | Credentials, raw correspondence, participant data, sensitive exports, source binaries |

Classification is not publication state. A `private-repository` claim may be
well supported and still have no public purpose or permission. A `public` claim
may be mature but deliberately unselected for the current portfolio.

Records should also preserve independent dimensions for:

- evidentiary maturity;
- sensitivity;
- rights and consent;
- custody;
- access state;
- publication eligibility;
- projection selection;
- review owner and review date.

These dimensions must not collapse into a single `status` field.

### Identity and cross-Wiki references

Public concepts should have stable public entity IDs. Private records should use
private IDs that are never assumed to be safe to disclose. A private record may
carry an optional `public_projection_id` after an explicit publication decision.

The public graph must not contain tombstones, hashes, counters, backlinks, or
missing-edge diagnostics that reveal the existence or shape of private records.
The private graph may point to a released public entity, but the public graph may
not point back to a private identity.

Promotion creates or updates a public record; it does not change the private
record into a public object. This lets private context remain richer than the
public representation without creating two competing versions of the same file.

### Source Access Registry

The repository should commit a schema, example, protocol, and diagnostic tool
for source access. Each authorized machine may keep an ignored local registry,
for example:

```yaml
version: 1
sources:
  vault.example.project-folder:
    kind: filesystem
    location_env: EXAMPLE_ARCHIVE_ROOT
    fallback:
      kind: authenticated-browser
      url_env: EXAMPLE_ARCHIVE_URL
      session_ref: browser.example-account
    access: read-only
    sensitivity: protected
    materialization: on-demand
    last_verified: 2026-07-19
```

Committed source records contain only opaque IDs and public-safe boundaries.
Machine-local configuration may contain private paths and search recipes, but
not passwords, tokens, cookies, or raw source content. Credentials remain in an
operating-system secret store or authenticated browser profile.

The diagnostic interface should distinguish:

- `reachable`;
- `not-materialized`;
- `auth-required`;
- `permission-blocked`;
- `missing`;
- `stale`;
- `unconfigured`.

Diagnostics must redact secret and private values. Automated access should be
read-only unless a separate operation receives explicit authorization.

### Archival production receipts

Every substantial research pass should produce a durable receipt recording:

- research-run ID and date;
- source IDs and source cutoff;
- population definition and denominator;
- acquisition method and tool versions where relevant;
- files, records, pages, or items successfully inspected;
- exclusions, failures, inaccessible material, and uncertainty;
- checksums or immutable manifest references where appropriate;
- observations, claims, anti-claims, and inquiries produced;
- public/private/vault dispositions;
- the authorized route back to the originals;
- reviewer and rights state.

A request for a `100%` pass is not itself evidence that complete coverage was
achieved. The receipt must define the population and record the observed
coverage. Missing or inaccessible material must remain visible as a bounded gap.

### Publication workflow

The private Wiki should offer a command conceptually similar to:

```bash
knowledge-wiki propose-publication --record private.claim.example
```

The command creates a publication candidate in the private workspace. It must
not push, open, or modify the public repository. The packet should include:

- proposed public ID and wording;
- source basis using only public-safe metadata;
- claim and anti-claim relationships;
- collective-credit and agency scope;
- rights, consent, and public-interest state;
- protected boundaries and prohibited wording;
- intended portfolio or application surfaces;
- unresolved questions;
- content and schema fingerprints;
- Jamie's explicit decision field.

After human review, an authorized operator may export a bounded packet and use
it to author a normal pull request in the public repository. The public validator
must reconstruct and test the public graph without access to the private Wiki.

No command may treat successful validation, an LLM recommendation, factual
maturity, or the existence of a publication candidate as publication approval.

### Policy profiles

The core should expose explicit policy profiles rather than scattered conditionals:

```text
public-professional
private-personal
publication-packet
package-release
```

`public-professional` fails closed on private fields, private edges, local paths,
protected locators, unapproved assets, and unresolved publication decisions.

`private-personal` permits protected knowledge that is appropriate for private
Git while still rejecting credentials, unsafe binaries, and vault-only classes.

`publication-packet` allows only the bounded fields needed for public review and
records every omission or transformation.

`package-release` allows schemas, code, documentation, and synthetic fixtures but
rejects all personal knowledge and repository-specific generated output.

### Command-line contract

The eventual core should make routine operations discoverable and consistent:

```bash
knowledge-wiki check
knowledge-wiki graph
knowledge-wiki query <expression>
knowledge-wiki sources list
knowledge-wiki sources doctor [--id <source-id>]
knowledge-wiki research-runs list [--source <source-id>]
knowledge-wiki propose-publication --record <private-id>
knowledge-wiki verify-publication <packet>
knowledge-wiki migrate --from <version> --to <version>
```

Commands should be deterministic where possible, default to read-only, avoid
printing protected values, and distinguish automated checks from human gates.

### Interface modes

The shared UI package may provide accessible primitives for graph navigation,
source status, claim maturity, anti-claims, corrections, research runs, and
publication review. The two applications should compose those primitives for
different purposes:

- The public portfolio emphasizes clarity, relevance, and a small citation
  contract. It does not expose a database-like public Knowledge Wiki browser.
- The private Wiki emphasizes retrieval, comparison, contradiction, source
  return, unresolved inquiries, and publication preparation.

Shared components must not imply shared routes or identical information density.
The private interface should make classification and rights visible. The public
interface should contain no hidden private payloads, debugging metadata, or
client-side graph fragments.

### Versioning and migration

The core package should use semantic versions after its first stable contract.
Each Wiki records its core and schema versions. Migrations must be explicit,
reviewable, restartable, and tested against copies rather than irreplaceable
originals.

During extraction, the current public compiler remains canonical. The package
must first demonstrate output parity before ownership moves. A migration should
retain stable IDs, aliases, relation semantics, source boundaries, corrections,
and generated-view behavior.

The public and private Wikis need not upgrade simultaneously, but publication
packets must declare compatible schema versions. The core should provide a
compatibility error rather than silently dropping unknown fields.

### Agent operating contract

Agents working in either Wiki must:

- identify the repository and policy profile before reading or writing;
- treat access as permission to inspect, not permission to publish;
- use read-only source access by default;
- preserve originals and record transformations;
- distinguish retrieved evidence from memory and inference;
- preserve contradictory evidence and anti-claims;
- name collective actors and bound Jamie's role;
- keep rights, consent, and publication decisions human-controlled;
- never move content across trust boundaries by copying an entire private file;
- report incomplete coverage and expired access honestly;
- bind evaluation evidence to the exact candidate under review.

### Backups, deletion, and recovery

The private Wiki and Source Vault require separate retention decisions. Git is
useful for history but makes deletion difficult. Before private data is committed,
the team must define:

- whether the private repository has a remote;
- who can access that remote and its backups;
- encryption at rest and in transit;
- backup locations and recovery tests;
- how legal, safety, or consent-based deletion requests are handled;
- whether a class of material should remain vault-only because Git history is
  inappropriate;
- how lost credentials or compromised devices are rotated and contained.

No implementation should promise cryptographic erasure from third-party Git
hosting without verifying that provider's behavior.

## Security and privacy

### Threat model

The implementation must assume at least these failure modes:

- a private file is accidentally staged in the public repository;
- generated backlinks, indexes, reports, or search data reveal private IDs;
- a publication packet retains private front matter, comments, paths, or links;
- a test fixture contains copied personal data;
- the shared package publishes repository content through an overly broad file
  allowlist;
- CI logs or artifacts print private configuration;
- a public build reaches across the filesystem or network for private data;
- an authenticated browser session is mistaken for durable authorization;
- a private repository is treated as a secret manager;
- Git history preserves data that a later deletion policy cannot remove easily;
- an LLM prompt or retained run includes more protected context than necessary;
- `noindex`, an unlinked route, encryption of one field, or an opaque ID is
  mistaken for privacy.

### Required controls

Before the architecture can become operational, it must include:

- deny-by-default public export schemas;
- complete graph-closure leakage tests, including aliases and encoded forms;
- package-content allowlists and package dry-run inspection;
- secret scanning and local-path scanning;
- ignored local configuration plus an automated tracked-file check;
- restrictive permissions for machine-local registries;
- synthetic fixtures only in the core package;
- redacted logging and diagnostics;
- no private network or filesystem dependency in public builds;
- immutable or checksummed raw-source manifests where appropriate;
- explicit read-only provider modes;
- human approval fields that automation cannot populate;
- adversarial tests that attempt to leak private fields through every generated
  surface;
- documented incident response for accidental publication.

The public and private repositories should run different policy suites against
the same core. Passing the private suite does not imply public safety.

## Publication workflow

Publication is a sequence of explicit transformations:

```text
vault source
  -> private source record
  -> private observation
  -> private claim plus anti-claims
  -> corroboration, rights, and credit review
  -> publication candidate
  -> Jamie decision
  -> bounded public packet
  -> public pull request
  -> exact-candidate public-safety and editorial review
  -> optional portfolio projection
```

At every step, the system should preserve the distinction between:

- what the source says;
- what Jamie remembers;
- what the researcher infers;
- what can be defended publicly;
- what may be published;
- what serves the current public argument.

The final portfolio projection remains smaller than the public professional
Wiki. A claim may be public, mature, and intentionally unused.

## Rollout plan

No rollout begins until the current `feature/knowledge-wiki-E` pull request is
closed and this RFP advances to `accepted` through an explicit Jamie decision.

### Phase 0: Preserve the proposal

- Merge this RFP in `proposed` state.
- Collect comments and concrete use cases.
- Make no repository, package, or private-data migration.

### Phase 1: Inventory and boundary extraction

- Inventory current Wiki schemas, compiler responsibilities, scripts, generated
  outputs, and public-site dependencies.
- Define the minimum stable core API and package publication policy.
- Produce a private-data threat model and hosting decision.
- Establish baseline public graph and generated-output fixtures.

### Phase 2: Core package prototype

- Create `packages/knowledge-wiki-core` without changing canonical ownership.
- Move pure parsing, schema, graph, and policy logic behind a compatibility
  adapter.
- Prove byte-equivalent or semantically equivalent public outputs.
- Test the package tarball for content leakage.
- Keep the prototype removable until the RFP reaches `accepted`.

### Phase 3: Private Wiki pilot

- Create the private sibling only after custody and backup decisions are signed
  off.
- Use synthetic or low-sensitivity records first.
- Connect an ignored Source Access Registry with no credentials in Git.
- Verify that the private Wiki and public Wiki use the same pinned core version.
- Exercise source-return and research-run receipts before importing wider history.

### Phase 4: Publication-packet pilot

- Select one already public-safe, low-risk claim.
- Reconstruct it through the private workflow.
- Generate a bounded packet and inspect every serialized field.
- Author a public pull request without giving the public build private access.
- Compare the result with the established manual workflow.

### Phase 5: Operational observation

- Run several archival-production and publication cycles.
- Measure retrieval success, false leakage blocks, migration burden, and editorial
  usefulness.
- Document deviations and unresolved operational costs.
- Advance to `operational` only after the accepted behavior is implemented and
  verified.

### Phase 6: Recommendation decision

- Consider `recommended` only after sustained use demonstrates that the shared
  package improves return-to-source, public safety, and compositional clarity.
- If the package's ownership inside `jamieburk.art` creates friction, propose a
  separate RFP to extract it into an independent public repository.

### Rollback

The current public Wiki remains usable throughout extraction. The compatibility
adapter and baseline fixtures provide a rollback point. The private pilot must
not become the only copy of original source material. Publication packets are
review artifacts and must not be required to recover the private source graph.

## Decision gates

### To advance to `exploring`

- Jamie confirms that the four-layer topology matches his intended practice.
- At least three representative workflows are documented: source return,
  private research maturation, and public promotion.
- The proposed private-data classes are reviewed for omissions.

### To advance to `accepted`

- Jamie approves the repository and custody topology.
- A package boundary inventory demonstrates what will and will not move.
- The threat model covers Git history, package publication, CI, generated views,
  browser authentication, source vaults, and LLM context.
- The core API, policy profiles, stable-ID behavior, and migration contract are
  specified well enough to implement.
- Hosting, backup, access, and deletion decisions for the private Wiki are
  recorded by an authorized human.
- Open questions likely to cause a breaking architectural change are resolved.

### To advance to `implementing`

- An implementation plan references an accepted RFP revision.
- Baseline public outputs and failure fixtures are bound to the implementation
  candidate.
- The work has a named human review owner and a rollback path.

### To advance to `operational`

- The public Wiki builds and validates with the private repository absent.
- Both Wikis consume the same released core package version.
- Package contents contain no Jamie-specific or protected material.
- Leakage mutation tests fail closed across graph, reports, search, UI, logs,
  exports, and publication packets.
- A source-return pilot distinguishes unavailable, unmaterialized, expired-auth,
  permission-blocked, missing, and stale states.
- A publication packet completes an end-to-end human-reviewed public pull request.
- Documentation, migration, recovery, and incident-response procedures exist.
- Jamie approves the first operational release.

### To advance to `recommended`

- Multiple real research cycles demonstrate reliable return to originals.
- Multiple publication decisions demonstrate bounded public export without
  private dependency or leakage.
- The operating burden is acceptable and documented.
- No unresolved high-severity privacy or rights issue remains.
- Jamie explicitly chooses the system as the default practice.

Automated checks may provide evidence for these gates. They cannot make Jamie's
decision or establish collaborator consent, rights clearance, or public value.

## Drawbacks

- Three knowledge/storage contexts and a package add conceptual and operational
  complexity.
- Shared schemas can create pressure to model private life in the vocabulary of
  professional evidence.
- A private Git repository may encourage over-collection or create durable
  copies of information that should have remained ephemeral.
- Package versioning and migrations can slow spontaneous archival work.
- Publication packets add friction when a simple manual edit might have been
  adequate.
- A common core can become an overly generic framework if it tries to satisfy
  every future use case.
- The public package's safety may create a false sense that all consumers have
  equivalent privacy requirements.
- Private and public accounts of one event may drift, producing confusing or
  contradictory records.
- Source-access tooling can become stale as cloud interfaces, authentication,
  filesystem mounts, and provider exports change.
- Maintaining a second interface may take attention from the employment goals
  the professional Wiki is meant to serve.

These costs argue for a small pilot, a narrow core, explicit non-goals, and an
observation period before recommendation.

## Alternatives

### Keep one public Wiki with opaque private references

This preserves simplicity and the strongest publication boundary. It does not
provide a durable place for private interpretation, exact source routing, or
unfinished research. Important context would remain scattered across local
folders and conversations.

### Keep one private canonical Wiki and generate the public Wiki

This creates a single content authority, but makes the public system dependent
on a private source and raises the consequences of an exporter defect. It also
risks treating publication as a redaction problem instead of a separate
composition and decision.

### Store private and public records in one repository with visibility flags

This is operationally convenient and unacceptable for this public repository.
Flags, hidden routes, and `noindex` are not privacy controls, and Git history
would preserve mistakes.

### Use branches for public and private knowledge

Branches are designed to converge. They share object storage and history, making
them an unsuitable privacy boundary.

### Fork the current repository into a private copy

A fork would duplicate the website and accumulated implementation, encouraging
drift and accidental reverse merges. Sibling consumers of a shared package make
the trust direction clearer.

### Use an off-the-shelf personal knowledge application

This could provide fast private authoring and search. It would not automatically
share the evidence lifecycle, typed graph, public-safety semantics, stable IDs,
or publication-packet contract. Such an application could still become a client
of the core or a source adapter later.

### Put everything in the local Source Vault

This minimizes hosted exposure but leaves structured knowledge, relationships,
research decisions, and review history difficult for agents and collaborators to
query. The Vault should preserve originals, not substitute for the Wiki.

### Do nothing

The public Wiki can continue to mature, but source-return knowledge and private
research context will remain dependent on individual conversations, local memory,
and scattered handoffs. Repeated archival production will continue to spend time
rediscovering access paths and coverage boundaries.

## Unresolved questions

- Should the core package remain in the `jamieburk.art` monorepo or move to an
  independent public repository before its first stable release?
- Should the private Wiki have a remote at all, and if so, what hosting,
  encryption, access, retention, and deletion guarantees are acceptable?
- Which private details are suitable for Git history, and which must remain
  vault-only?
- What identifier scheme permits intentional public continuity without leaking
  the existence or cardinality of private records?
- Should publication packets be Markdown, JSON, a signed bundle, or a combination?
- Which fields require field-level classification in addition to record-level
  classification?
- How should collaborator corrections or withdrawal requests propagate across
  private records, public claims, and prior Git history?
- Which source providers can be addressed through read-only adapters, and which
  must remain documented manual workflows?
- What is the minimum private Wiki interface that supports real archival work
  without becoming a second product-design diversion?
- How will package migrations remain usable by agents while preserving human
  review of semantic changes?
- What observation period and evidence should be required before the architecture
  becomes `recommended`?

