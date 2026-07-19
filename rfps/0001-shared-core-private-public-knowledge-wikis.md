---
rfp: "0001"
title: Shared Core With Private And Public Knowledge Wikis
stage: proposed
start_date: 2026-07-19
champion: Jamie Burkart
authors:
  - Jamie Burkart
  - Codex, as an AI-assisted drafting collaborator
review_after: Close or merge pull request 240
relevant_areas:
  - Knowledge Wiki architecture
  - archival production
  - source access
  - public safety
  - portfolio projection
  - recursive evaluation
implementation: deferred
---

# RFP-0001: Shared Core With Private And Public Knowledge Wikis

## Summary

Create a shared, content-neutral Knowledge Wiki core package consumed by two
distinct knowledge systems:

1. the public professional Knowledge Wiki in `jamieburk.art`; and
2. a sibling private personal Knowledge Wiki permitted to hold protected
   research context, private source-resolution information, and unresolved
   archival interpretation.

The private Wiki would import the public graph as a read-only, exact-version
layer. A one-way, human-reviewed promotion process would prepare sanitized
candidate records for the public Wiki. The public repository would never depend
on the private repository at build or runtime.

This RFP records the idea for review after pull request
[#240](https://github.com/openhouse/jamieburk.art/pull/240) closes. It does not
authorize creating a private repository, moving records, publishing a package,
or changing the current Knowledge Wiki architecture.

## Motivation

### The Knowledge Wiki Must Remain Grounded In Originals

The public Knowledge Wiki intentionally replaces private source locations with
opaque identifiers and public-safe descriptions. This protects collaborators,
community members, private correspondence, source rights, and Jamie's personal
archive.

That protection also creates a continuity problem. A future researcher or agent
may understand a source record but be unable to reopen the original without
rediscovering:

- which provider or archive holds it;
- which authenticated context is required;
- which preserved snapshot was reviewed;
- whether a local copy exists;
- what rights, consent, or handling restrictions apply;
- how an earlier archival-production pass reached its interpretation.

Periodic source re-encounter is part of responsible archival practice. The
system should support returning to original materials in their native form,
with present-day questions, while preserving earlier interpretations rather
than silently replacing them.

### One Public Repository Cannot Responsibly Hold Every Layer

The public portfolio needs clarity, defensible claims, collective credit, and a
small number of purposeful projections. It should not contain raw private
material or become an evidence browser.

The personal archive needs greater depth. It must be able to preserve:

- research leads and memories that are not confirmed claims;
- source locators and access conditions;
- private notes about authorship and attribution;
- rights, consent, and custody information;
- source-specific observations and non-support;
- unresolved contradictions and protected absences;
- records that may never become public professional material.

Forcing both needs into one repository either weakens the archive or endangers
the public boundary.

### Shared Semantics Should Not Be Reimplemented Twice

Two independent Wiki implementations would drift. Stable IDs, graph rules,
status semantics, lifecycle events, redaction, queries, and evals should be
defined once and consumed by both repositories.

## Goals

- Preserve one shared semantic model for public and private Wiki records.
- Make protected source-resolution reproducible across authorized research
  sessions and worktrees.
- Enable periodic, recorded re-encounter with original source materials.
- Keep public and private authority explicit and non-substitutable.
- Allow the private graph to contextualize public records without duplicating
  public authority.
- Establish a one-way, allowlisted promotion path from private research to a
  public pull-request candidate.
- Keep credentials outside both Git repositories.
- Keep the public portfolio independent of private infrastructure.
- Preserve append-only history, corrections, anti-claims, rights, consent, and
  collective attribution across promotion.
- Support candidate-bound evaluation of the core, each Wiki, and the bridge
  between them.

## Non-Goals

This proposal does not:

- make the Knowledge Wiki publicly editable;
- add a public `/knowledge-bank`, `/proofs`, or evidence-browser route;
- move the portfolio out of `apps/www`;
- create a CMS, hosted database, search service, or AI chatbot;
- commit passwords, tokens, cookies, browser profiles, or signed URLs;
- require raw archives, large binaries, or every protected original to live in
  Git;
- grant publication rights by placing a record in a private repository;
- make private evidence available to public hiring evaluators;
- automatically promote mature private claims;
- replace collaborator review, rights clearance, editorial judgment, or Jamie
  approval;
- implement the architecture before this RFP advances.

## Terminology

### Knowledge Wiki Core

A content-neutral package containing schemas, parsing, graph construction,
validation, lifecycle semantics, redaction, query primitives, promotion-packet
rules, and reusable eval helpers. It contains no Jamie-specific records or
private locators.

Provisional package name:

```text
@jamie-burkart/knowledge-wiki-core
```

### Public Professional Wiki

The governed, public-safe knowledge and projection system in
`openhouse/jamieburk.art`. It remains authoritative for public claims, public
source descriptions, publication decisions, portfolio wording, and the public
site.

### Private Personal Wiki

A sibling private repository that may contain protected metadata, research
notes, source-resolution mappings, and private graph relations. It is not
automatically authoritative for public wording.

### Source Vault

The existing collection of local archives, cloud folders, authenticated
services, preserved captures, and other original materials. The Source Vault is
not one required storage product and is not necessarily stored in Git.

### Source Resolver

A private mapping from stable source IDs to authorized access methods. It can
identify a provider, local object, preserved snapshot, native viewer, handling
restriction, or credential reference. It must not store credential values.

### Source Re-Encounter

A recorded review of an original source in its native or best-preserved form.
It captures what was inspected, the scope of review, the access date, changes
in interpretation, and any new research questions.

### Promotion Packet

An allowlisted, reviewable export containing only material proposed for the
public Wiki. It is a candidate for a public pull request, not an automatic
publication event.

## Design Principles

1. **Composition, not forking.** Both Wikis consume the same versioned core.
2. **One-way public independence.** Public builds never require private data or
   private infrastructure.
3. **Private does not mean unrestricted.** Sensitive classes retain handling,
   rights, consent, and access boundaries inside the private system.
4. **No credentials in Git.** Repositories store credential references only.
5. **Public authority remains public.** Published wording and portfolio
   selection are reviewed in the public repository.
6. **Private knowledge may remain unresolved.** A memory or lead is not promoted
   merely because it has been catalogued.
7. **Promotion is allowlisted.** The exporter constructs a permitted packet
   rather than deleting forbidden fields from an unrestricted object.
8. **Every interpretation can return to a source.** Resolvability and source
   encounter are first-class operational concerns.
9. **History is amended, not erased.** Changed understanding creates a new
   event or superseding observation.
10. **Human gates remain visible.** Automation cannot imply consent,
    publication permission, employment acceptance, or production approval.

## Proposed Repository Topology

```text
openhouse/jamieburk.art                 public
├── apps/www                            composed portfolio
├── docs/knowledge-bank                 public professional Wiki
├── packages/knowledge-wiki-core        shared content-neutral core source
└── rfps                                substantial future proposals

private sibling repository             private
├── records                             protected personal Wiki records
├── lifecycle                           append-only private research history
├── access                              source-resolution metadata
├── imports/public                      exact public-graph receipts
├── promotion                           generated public candidates
└── local configuration                 ignored or external

source vaults                           private, outside Git as appropriate
├── local originals
├── authenticated cloud sources
├── preserved web captures
└── rights-restricted media and records
```

The private repository name, remote, owner, backup policy, and collaborator
access are unresolved. This document deliberately uses a generic label.

## Dependency Direction

The allowed dependency graph is:

```text
knowledge-wiki-core
        │
        ├──────────────► public professional Wiki ─────► portfolio
        │
        └──────────────► private personal Wiki
                              │
public registry snapshot ─────┘
                              │
                              └────► sanitized promotion packet ─────► public PR
```

The following dependencies are forbidden:

- the public site importing the private repository;
- public CI requiring private credentials or private network access;
- a public record linking directly to a private path or provider identifier;
- promotion tooling writing directly to production;
- the core package importing Jamie-specific content.

## Knowledge Wiki Core

### Responsibilities

The shared core should own:

- stable record and relation primitives;
- schema validation and version migration;
- Markdown/frontmatter parsing where shared;
- deterministic semantic-graph construction;
- link, alias, and stable-ID validation;
- lifecycle event types and append-only validation;
- evidence relation and anti-claim semantics;
- rights, consent, visibility, and publication-state primitives;
- query result shaping and field-level redaction helpers;
- source-resolver interfaces, not source coordinates;
- source re-encounter receipt types;
- promotion-packet schemas and allowlists;
- candidate and contract fingerprint helpers;
- reusable mutation fixtures and test utilities.

### Exclusions

The core must not contain:

- portfolio copy or project-specific claims;
- private paths, URLs, provider IDs, or credential names;
- public-site components or styling;
- a hosted service requirement;
- default rules that convert maturity into publication;
- a single hard-coded repository layout.

### Versioning

Both Wikis must record the exact core version and integrity hash used for a
build, query, import, or promotion packet.

A core release that changes record meaning, redaction behavior, promotion
allowlists, or stable-ID semantics requires an explicit migration plan. Schema
version and package version are related but distinct.

The source may initially live at `packages/knowledge-wiki-core` in this
monorepo. Before the private repository gains remote CI, the package must have a
portable, immutable distribution method. Possible methods are evaluated under
Alternatives and remain unresolved.

## Authority Model

| Domain | Canonical authority | Derived layer |
|---|---|---|
| Shared schemas and graph semantics | Versioned core package | Generated graph and validation reports |
| Public claims and wording | Public repository | Portfolio pages and public registry |
| Public publication decisions | Public repository plus Jamie approval | Deployed portfolio |
| Protected research observations | Private repository | Private graph and research reports |
| Private source resolution | Private resolver configuration | Redacted resolvability status |
| Original files and captures | Source Vault or source institution | Checksums, locators, encounter receipts |
| Credentials and sessions | Keychain, authenticated application, or approved secret store | Credential reference only |
| Rights and consent decisions | Named human decision record | Machine-enforced allow or hold status |
| Promotion candidate | Generated packet plus private review receipt | Public pull request |
| Final public acceptance | Public repository review | Merged public record and projection |

When the private and public Wikis disagree about public wording, the public
repository remains authoritative for what is published. The private Wiki may
open an inquiry or promotion packet proposing a correction.

## Stable Identity And Namespaces

Stable IDs must remain globally unique across both Wikis without exposing
private meaning.

The core should validate namespaces such as:

```text
SRC-...
CLM-...
INT-...
INQ-...
HIST-...
ENC-...
PROMO-...
```

Private records may reference public stable IDs. Public records must not
reference private-only IDs unless the reference is replaced by an approved
opaque public boundary record.

Renames and path moves must preserve stable identity. Cross-repository imports
must bind to exact Git commits or content fingerprints, not floating branch
names.

## Private Source Resolver

### Public Pattern

The core may publish a schema and example using fictional identifiers. The real
resolver configuration belongs in the private system or a local external
configuration directory.

Conceptual record:

```json
{
  "sourceId": "SRC-EXAMPLE-PROTECTED",
  "provider": "authenticated-cloud-drive",
  "locatorRef": "LOCATOR-EXAMPLE",
  "credentialRef": "CREDENTIAL-REFERENCE-ONLY",
  "preferredViewer": "native-document-viewer",
  "accessStatus": "authentication-required",
  "rightsStatus": "research-only",
  "lastResolvedAt": "YYYY-MM-DD"
}
```

The example communicates shape, not real coordinates.

### Resolution States

The resolver should distinguish:

- `resolvable`;
- `authentication-required`;
- `temporarily-unavailable`;
- `missing`;
- `format-unsupported`;
- `rights-hold`;
- `identity-ambiguous`;
- `not-yet-mapped`.

An audit may report aggregate states and opaque source IDs. It should not print
private paths or URLs by default.

### Credential Handling

`credentialRef` identifies an authorized access context. Credential values stay
in one of the following:

- an authenticated browser or native application;
- macOS Keychain;
- an approved secret manager;
- an ephemeral environment supplied outside Git.

The resolver must not inspect or export browser cookies, password stores, or
session databases. Full access authorization does not remove this restriction.

## Source Re-Encounter Workflow

A re-encounter should answer more than whether a locator works.

1. Resolve the stable source ID without printing protected coordinates.
2. Open the original in its native or best-preserved representation.
3. Confirm source identity, authorship signals, dates, and completeness.
4. Inspect layout, sequence, annotations, comments, media, and folder context
   when those features are relevant and authorized.
5. Compare the source with the claims, anti-claims, and prior research notes it
   currently supports.
6. Record what was inspected and what was not inspected.
7. Add new observations, corrections, or inquiries without overwriting prior
   interpretation.
8. Reassess rights, consent, attribution, and public-use boundaries.
9. Decide separately whether any public promotion should be proposed.

Proposed encounter receipt fields:

```text
encounter_id
source_id
performed_at
reviewer_type
review_scope
representation_reviewed
source_identity_status
interpretation_change
new_observation_ids
new_inquiry_ids
rights_change
limitations
core_version
source_snapshot_fingerprint
```

Private encounter receipts may contain protected notes. Public records may
receive only an approved summary, review date, and resulting correction or
claim change.

## Importing The Public Graph Into The Private Wiki

The private Wiki needs public context to avoid duplicating public records.

The import should:

1. identify an exact public Git commit;
2. load only the redacted public registry and other explicitly exported public
   graph artifacts;
3. verify the public artifact fingerprint and core compatibility;
4. mount imported records as read-only;
5. allow private records to relate to imported public stable IDs;
6. prevent private edits from masquerading as changes to imported records;
7. retain an import receipt with commit, fingerprint, and core version.

No private query result should imply that an imported public claim has been
updated until the corresponding public pull request is merged.

## Promotion From Private To Public

### Principle

Promotion is a proposal compiler, not a synchronization command.

### Required Inputs

A promotion candidate should identify:

- private source and observation IDs;
- proposed public source description;
- proposed canonical and projected claim wording;
- exact evidence relationships;
- support and non-support;
- qualifications and anti-claims;
- collective-credit and attribution requirements;
- publication status and allowed surfaces;
- rights and consent state;
- unresolved questions;
- exact private and public candidate fingerprints;
- core version and promotion contract version.

### Allowlisted Output

The generated packet may contain only public-schema fields explicitly permitted
by the promotion contract. It must not begin with a full private object and try
to delete unsafe fields.

The packet should include:

```text
promotion-summary.md
public-record-candidates.json
public-markdown-candidates/
evaluation-receipt.json
human-review-checklist.md
```

It should be possible to inspect the complete packet before any public branch is
created.

### Human Decisions

Promotion requires distinct decisions for:

- factual adequacy;
- collective attribution;
- collaborator consent where appropriate;
- quotation and media rights;
- public-safety review;
- editorial usefulness;
- Jamie approval;
- target public surface.

No maturity score can substitute for these decisions.

### Public Pull Request

After private review, an authorized person or agent may apply the packet to a
clean public branch. The public repository reruns its own validators against
the resulting files. The private evaluation receipt is context, not a pass
token.

## Privacy And Security Model

### Data Classes

| Class | Example category | Git posture | Public posture |
|---|---|---|---|
| Public | Published article or approved claim | Public repository allowed | Eligible after editorial selection |
| Public-safe metadata | Bounded description of protected source | Either repository | Eligible when schema and review permit |
| Protected research | Private notes, unresolved attribution, correspondence context | Private repository only when appropriate | Never directly projected |
| Vault object | Raw export, large media, transcript, mailbox, original archive | Usually outside Git | Never directly projected |
| Secret | Password, token, cookie, signing key | Never in Git | Never exposed |
| Human decision | Consent, rights, approval, employment decision | Referenced by receipt | Only approved status may be exposed |

### Threat Cases

The implementation must consider at least:

- accidental commit of a private path, URL, provider ID, or resource key;
- generated reports or source maps exposing protected fields;
- encoded or normalized variants bypassing a string scanner;
- promotion of a private relation through an otherwise public record;
- a public build resolving or probing private infrastructure;
- logs printing a locator during a failed resolution;
- credentials entering fixtures, snapshots, or error messages;
- a private remote granting broader access than intended;
- Git history retaining a secret after apparent deletion;
- private records being treated as publication permission;
- imported public records drifting from their bound commit;
- source identity being inferred from a checksum or filename;
- private Wiki summaries being supplied to a public-only hiring evaluator.

### Controls

- Default-deny field allowlists for every public export.
- Secret scanning and private-coordinate scanning before commit and promotion.
- Decoded and normalized leakage fixtures.
- Redacted errors and logs.
- Exact candidate, contract, and core fingerprints.
- No private dependency in public lockfiles, builds, or runtime configuration.
- Branch protection and least-privilege collaborator access for any private
  remote.
- Recovery guidance for accidental secret or protected-data commits.
- Human rights, consent, and public-safety review.

## Evaluation Model

### Core Package Evals

- Schemas accept valid public and private extensions while rejecting unknown
  authority or publication states.
- Graph generation is deterministic.
- Stable IDs survive path and title changes.
- Lifecycle histories remain append only.
- Redaction is field-allowlisted.
- Promotion packets are reproducible from the same candidates and contract.
- Schema migration fixtures preserve meaning or fail closed.

### Private Wiki Evals

- Every governed private source has a disposition and resolver status.
- Resolver output is redacted by default.
- No plaintext credentials exist in tracked files, fixtures, reports, or Git
  history.
- Source encounters identify scope and limitations.
- Memories remain leads until supported.
- Rights, consent, knowledge maturity, and editorial selection remain separate.
- Imported public records are read-only and exact-commit bound.

### Promotion Bridge Evals

- Public output contains only allowlisted fields.
- No private identifier remains after direct, encoded, normalized, or derived
  inspection.
- Every promoted claim retains support, non-support, qualifications,
  anti-claims, attribution, and protected boundaries.
- A private claim cannot strengthen public wording without explicit evidence.
- Rights or consent holds prevent affected projections.
- Promotion cannot write to a public branch or remote without an explicit
  reviewed action.
- The public repository independently validates the applied packet.

### Public Wiki Evals

Existing citation, public-safety, lifecycle, Wiki, hiring, portfolio, and
composite checks remain authoritative. The new architecture must not weaken
their thresholds or turn private evidence into evaluator-visible support.

### Human Gates

Automated evals cannot establish:

- that a collaborator agrees with an attribution;
- that private correspondence should be quoted;
- that an image or document may be republished;
- that a private remote has appropriate social and organizational access;
- that a public projection serves the current portfolio argument;
- that an application should be submitted;
- that a deployment should become indexable;
- that Jamie approves an exact candidate.

## Operational Interfaces

Names are illustrative and not accepted APIs.

```bash
# Core and graph integrity
npm run wiki:check

# Private source access, redacted by default
npm run source:audit
npm run source:resolve -- SRC-EXAMPLE-PROTECTED
npm run source:encounter -- SRC-EXAMPLE-PROTECTED

# Import exact public context into the private Wiki
npm run public:import -- --commit PUBLIC_GIT_SHA

# Preview a public candidate without writing to the public repository
npm run promotion:prepare -- CLM-EXAMPLE
npm run promotion:check -- PROMO-EXAMPLE
```

Commands that can open originals, write lifecycle history, create a promotion
packet, or affect another repository must default to preview or require an
explicit action flag.

## Migration Plan

### Phase 0: Proposal And Threat Model

- Close or merge PR #240 without adding this architecture to its production
  claims.
- Review this RFP, including repository topology and threat cases.
- Inventory existing schemas, graph logic, lifecycle tools, manifests, and
  protected resolver needs.
- Decide the private repository's initial local and remote posture.

Exit condition: RFP advances to `accepted` or is closed.

### Phase 1: Extract A Content-Neutral Core

- Move shared types and pure functions into a package without changing current
  public behavior.
- Keep compatibility exports for existing scripts.
- Add core unit and mutation tests.
- Prove the public Wiki produces the same semantic output before and after the
  extraction.

Exit condition: no public graph, citation, route, or portfolio regression.

### Phase 2: Create A Local Private Pilot

- Create the sibling repository locally.
- Add private-only schemas and resolver configuration outside public Git.
- Import a public graph snapshot by exact commit.
- Migrate one existing protected manifest as metadata, not raw source bodies.
- Exercise source resolution and re-encounter against a small authorized set.

Exit condition: local pilot can reopen sources without leaking coordinates or
changing public authority.

### Phase 3: Pilot Promotion

- Select one bounded source family with clear rights and attribution.
- Prepare an allowlisted promotion packet.
- Apply it to a clean public test branch.
- Run both private bridge evals and all public checks.
- Reject or revise the packet if human review finds unnecessary disclosure or
  weak editorial purpose.

Exit condition: one reversible, reviewed promotion demonstrates the boundary.

### Phase 4: Decide Private Remote And Backup

- Review repository visibility, collaborator access, branch protection,
  backups, secret scanning, incident response, and data-retention needs.
- Decide which protected classes are appropriate for Git and which remain only
  in external vaults.
- Establish portable distribution for the core package.

Exit condition: Jamie explicitly approves the remote and backup model.

### Phase 5: Broader Migration

- Migrate resolver mappings and private research records incrementally.
- Preserve stable IDs and prior archival-production receipts.
- Never block current public work on completing the private migration.
- Record unresolved and missing sources rather than manufacturing closure.

Exit condition: demonstrated daily value, bounded maintenance burden, and no
public-safety regression.

## Rollback And Failure Recovery

- The public repository remains fully operable if the private repository or
  source vault is unavailable.
- The public Wiki can continue using the last compatible core version.
- A failed private pilot can be archived without moving any public authority.
- Promotion packets are disposable until applied and reviewed in a public
  branch.
- Core migrations require a downgrade or forward-migration plan for persisted
  records.
- Accidental credential or protected-data commits require credential rotation,
  access review, and Git-history remediation; deleting the latest file is not
  sufficient.
- Imported public snapshots can be discarded and regenerated because they are
  derived from exact public commits.

## How We Teach This

The central teaching model is:

```text
Original source
    ↓
Private research and interpretation
    ↓
Human-reviewed promotion candidate
    ↓
Public professional knowledge
    ↓
Purposeful portfolio projection
```

Documentation should make five distinctions repeatedly:

1. access is not publication permission;
2. a private record is not a confirmed claim;
3. a confirmed claim is not automatically selected for the portfolio;
4. a promotion packet is not a merged public record;
5. an automated pass is not human approval.

New teammates should begin with a fictional source fixture and complete one
resolution, encounter, import, and rejected promotion before working with real
protected material.

## Drawbacks

### Operational Complexity

Two repositories and a shared package create versioning, coordination, backup,
and onboarding work. A small project can spend more time governing the system
than learning from the archive.

### Split-Brain Risk

Public and private records can disagree or duplicate one another. Exact imports,
clear authority, and one-way promotion reduce but do not eliminate this risk.

### False Security From A Private Remote

A private GitHub repository is still a replicated system with collaborators,
logs, caches, backups, and account risk. Some material should remain outside
Git entirely.

### Package Distribution Burden

A core package inside the public monorepo is convenient locally but awkward for
a sibling repository unless there is a stable package distribution method.
Publishing and versioning the package creates maintenance work.

### Promotion Friction

Allowlisted promotion is intentionally slower than copying text. Excessive
friction could discourage useful updates or delay applications. The process
must remain proportional to risk and honor the one-working-day application
constraint.

### Schema Can Flatten Interpretation

Archival encounters include ambiguity, atmosphere, visual form, and changing
questions that do not fit neatly into typed records. The private Wiki must keep
room for prose and uncertainty rather than treating schema coverage as complete
understanding.

### Local Access Remains Contingent

Cloud authentication, materialization delays, proprietary formats, and missing
software can still prevent source access. A resolver can describe these limits;
it cannot abolish them.

## Alternatives

### Alternative 1: Keep One Public Repository Plus Ignored Local Config

Commit resolver schemas and store real mappings in an ignored local file.

Advantages:

- smallest architectural change;
- no second repository or package distribution;
- sufficient for a single-machine pilot.

Disadvantages:

- private research history is not durably versioned;
- weak handoff and backup story;
- ignored files can drift across worktrees;
- limited support for protected observations and private graph relations.

This remains a sensible first prototype even if the full RFP is accepted.

### Alternative 2: Put Private Records In This Repository With Encryption

Commit encrypted bundles alongside public records.

Advantages:

- one history and one checkout;
- encrypted payloads can be backed up publicly.

Disadvantages:

- key management becomes part of every workflow;
- filenames, sizes, history, or configuration may still leak metadata;
- public CI and contributors encounter private artifacts;
- accidental plaintext commits become more likely.

Not recommended as the default.

### Alternative 3: Make The Private Wiki The Sole Authority

Generate the entire public Wiki and portfolio registry from the private system.

Advantages:

- one maximal graph;
- no duplicated public records.

Disadvantages:

- public builds become dependent on private infrastructure;
- public review cannot fully reproduce its own inputs;
- private availability or access failure can block applications and deployment;
- the trust boundary becomes harder to explain and test.

Rejected by this proposal.

### Alternative 4: Duplicate Core Logic In Both Repositories

Advantages:

- independent release schedules;
- no package distribution.

Disadvantages:

- semantic drift is inevitable;
- security fixes and schema changes must be duplicated;
- promotion compatibility becomes fragile.

Rejected by this proposal.

### Alternative 5: Create A Dedicated Third Core Repository

Move the shared package to its own content-neutral repository.

Advantages:

- clean ownership and portable dependency;
- independent tests and releases;
- neither Wiki repository owns shared semantics.

Disadvantages:

- a third repository increases coordination and release work;
- premature extraction may freeze abstractions before private use teaches us
  what is actually shared.

This may become preferable after a local pilot.

### Alternative 6: Do Nothing

Continue using public-safe records, opaque locators, and ad hoc private
manifests.

Advantages:

- no new system or maintenance burden;
- existing public-safety boundary remains understood.

Disadvantages:

- authorized agents repeatedly rediscover source access;
- source re-encounter is difficult to schedule and audit;
- private interpretive history remains fragmented;
- archival-production passes may become detached from original materials.

## Unresolved Questions

1. Should the private repository begin local-only or with a private remote?
2. Which protected data classes are suitable for private Git, and which must
   remain exclusively in external vaults?
3. Should the core source remain in this monorepo or move to a dedicated third
   repository after the pilot?
4. What portable package distribution method should replace local sibling-path
   development?
5. How should globally unique private IDs be generated without leaking source
   meaning?
6. Which source-resolution metadata may safely be committed to a private
   remote?
7. How often should important sources require re-encounter, and which events
   should trigger it immediately?
8. What constitutes sufficient source-identity confirmation for a resolver?
9. How should private prose observations link to structured claims without
   forcing premature decomposition?
10. What collaborator-review workflow is appropriate for collective project
    records?
11. Should promotion packets ever include short protected excerpts for private
    reviewer context if those excerpts are excluded from the public patch?
12. How should public corrections propagate back into imported private context?
13. Which person or process may advance an RFP stage when Jamie is unavailable?
14. What is the minimum viable incident-response plan before creating a private
    remote?
15. How do we keep this architecture from delaying a live application by more
    than one working day?

## Stage Criteria

### Accepted

- [ ] Jamie approves the two-Wiki, shared-core direction.
- [ ] Public and private authority boundaries are understood.
- [ ] The alternatives and principal drawbacks have been reviewed.
- [ ] The initial private repository posture is selected.
- [ ] The first protected source family for a pilot is selected.

### Ready For Implementation

- [ ] Core package boundaries and compatibility exports are specified.
- [ ] Private repository access, backup, and incident-response plans are
      approved.
- [ ] Resolver, encounter, import, and promotion schemas are reviewed.
- [ ] Credential and secret-storage methods are selected.
- [ ] Threat-model fixtures and public-leakage tests are defined.
- [ ] Migration and rollback owners are identified.
- [ ] No implementation work depends on an unclosed PR #240 candidate.

### Implemented

- [ ] The public Wiki consumes the shared core without semantic regression.
- [ ] A local private pilot imports an exact public snapshot.
- [ ] Authorized source resolution works without printing private coordinates.
- [ ] One source re-encounter is recorded with scope and limitations.
- [ ] One promotion packet is prepared and tested on a clean public branch.
- [ ] All public and bridge checks pass without weakening existing thresholds.
- [ ] Material deviations from this RFP are recorded.

### Recommended

- [ ] The system has supported multiple real archival-production passes.
- [ ] Source re-encounter measurably reduces rediscovery and improves claim
      quality.
- [ ] The promotion workflow has produced useful public changes without private
      leakage or attribution regressions.
- [ ] Backup, recovery, package upgrades, and collaborator access have been
      exercised.
- [ ] Jamie finds the maintenance burden proportionate to the archival value.

## Immediate Next Review

After PR #240 closes:

1. read this RFP without beginning implementation;
2. compare it with the final merged Knowledge Wiki architecture;
3. update assumptions that changed during review;
4. answer the local-only versus private-remote question;
5. choose whether to advance to `exploring`, revise, or close;
6. identify a bounded pilot source family and a threat-model reviewer.

## History

| Date | Stage | Note |
|---|---|---|
| 2026-07-19 | `proposed` | Initial proposal records a shared core, sibling private Wiki, source resolver, re-encounter workflow, and one-way public promotion boundary. Implementation deferred until PR #240 closes. |

