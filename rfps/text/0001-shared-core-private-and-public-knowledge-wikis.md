---
rfp: "0001"
title: Shared Core, Private Personal Wiki, and Public Professional Wiki
stage: proposed
created: 2026-07-19
updated: 2026-07-19
champion: unassigned
owners:
  - Jamie Burkart
areas:
  - knowledge-wiki
  - architecture
  - archival-production
  - privacy
  - source-access
decision_required_from:
  - Jamie Burkart
  - Knowledge Wiki maintainer
review_after: "Pull request #241 is closed and the accepted Knowledge Wiki baseline is known"
implementation_prs: []
supersedes: []
superseded_by: null
---

# RFP 0001: Shared Core, Private Personal Wiki, and Public Professional Wiki

## Summary

Create a shared, domain-neutral Knowledge Wiki core package used by two sibling
Wiki repositories: Jamie Burkart's private personal Knowledge Wiki and the
public-safe professional Knowledge Wiki in `jamieburk.art`. Add a local private
source resolver that maps opaque protected source identifiers to authorized
filesystem, cloud, browser, physical, or collaborator-held sources without
placing those coordinates or credentials in either public Git history or the
shared package.

This RFP documents the idea for later review. It does not authorize
implementation before the current Knowledge Wiki pull request closes, does not
create a private repository, and does not change the public site's build or
publication boundary.

## Motivation

### The Knowledge Wiki has two legitimate scales

The public professional Wiki needs to be clear, bounded, source-backed, and
safe if quoted in a newspaper. It supports the portfolio, applications,
professional collaboration, and public understanding of Jamie's work.

Jamie's larger personal knowledge environment has a different responsibility.
It may need to preserve:

- unresolved memories and hypotheses;
- private or sensitive source descriptions;
- relationship and collaborator context;
- contested or contradictory accounts;
- richer excerpts and working interpretations;
- private rights, consent, custody, and retention decisions;
- research leads not ready for public discovery;
- source locations and access instructions; and
- professional, artistic, civic, relational, and personal knowledge that may
  never belong in a portfolio.

Making the public Wiki hold all of that would make it unsafe and less useful.
Making the private Wiki a separate, incompatible system would duplicate the
engine, fragment stable IDs, and allow lifecycle rules to drift.

### Archival passes preserved findings better than wayfinding

The existing archival-production work deliberately retained public-safe
summaries, source classes, evidence limits, integrity controls, and opaque
`protectedLocatorId` values while excluding private source paths, authenticated
state, raw records, and sensitive manifests.

That was the correct publication decision. It also means a later authorized
researcher may know that a protected source exists without knowing how to
reopen it. Browser sessions expire. Cloud files may not be materialized.
Temporary captures disappear. A broad archive search may be slower and less
reliable than the focused route used in the original pass.

The problem is not simply missing credentials. It is the absence of a durable,
private resolution layer between the public-safe source identifier and the
source's actual custody system.

### Returning to original sources is part of the method

The Wiki should not recursively summarize its own summaries. Periodic research
must return to original sources with questions situated in the present. A later
reading may strengthen, narrow, contradict, or reframe an earlier account.

A durable architecture should support:

1. locating the original source;
2. recording why it was revisited;
3. distinguishing direct observation, memory, testimony, and inference;
4. preserving what changed in the interpretation;
5. retaining anti-claims and protected boundaries; and
6. making a new, separate projection decision.

## Present State

The current monorepo has npm workspaces for `apps/*` and `packages/*`, but the
`packages/` directory is only reserved for future shared code.

The Knowledge Wiki implementation currently combines reusable and
Jamie-specific concerns:

- Markdown frontmatter parsing and stable IDs;
- record kinds, relations, status, visibility, and review vocabularies;
- graph construction, link checking, queries, and health reporting;
- direct imports from the portfolio's canonical claims and proofs;
- assumptions about `docs/knowledge-wiki` and generated artifact locations;
- public-repository private-path rejection; and
- portfolio-specific authority and projection checks.

This coupling is reasonable for the first bounded implementation. It is not yet
a package that a sibling private Wiki can safely inherit.

The public repository also carries opaque protected source identifiers. It does
not and should not carry the private map that resolves those identifiers.

## Goals

1. Preserve one stable Knowledge Wiki record and relation model across public
   and private contexts.
2. Let both Wikis inherit parsing, graph, query, correction, and evaluation
   behavior from a versioned shared core.
3. Keep public professional records independently buildable and safe without
   access to the private repository.
4. Give authorized local researchers a durable route back to original sources.
5. Separate source coordinates from authentication secrets and from public
   source descriptions.
6. Support explicit, human-reviewed promotion from private research to public
   professional knowledge.
7. Preserve corrections, dissent, uncertainty, rights, consent, and collective
   credit through promotion.
8. Make migration incremental, testable, and reversible.
9. Avoid duplicating raw archives or making Git the custody system for source
   material.
10. Teach a future teammate where each kind of information belongs.

## Non-Goals

This RFP does not propose:

- a public Knowledge Wiki route;
- anonymous or public editing;
- a CMS, database service, search service, or AI chatbot;
- automatic publication from the private Wiki;
- storing passwords, cookies, tokens, or browser profiles in Git;
- importing the private repository during a public site build;
- copying the complete photo, email, message, Drive, or social archives into a
  Git repository;
- resolving current rights, consent, collaborator-credit, or publication
  decisions;
- replacing Google Drive, iCloud, local filesystems, provider archives, or
  physical custody systems; or
- beginning implementation before the current Knowledge Wiki pull request is
  closed and its baseline is reviewed.

## Terminology

### Knowledge Wiki Core

A domain-neutral package containing schemas, parsers, graph behavior, queries,
health checks, lifecycle primitives, and extension interfaces. It contains no
Jamie-specific knowledge, private paths, credentials, portfolio copy, or
deployment code.

### Public Professional Wiki

The public-safe, Git-reviewed professional knowledge system in
`jamieburk.art`. Its repository may be read by anyone and must remain safe for
public discovery. The portfolio is a smaller composition projected from it.

### Private Personal Wiki

A separately governed private repository containing richer personal and
archival research records. Private means access-restricted, not ungoverned and
not appropriate for credential storage.

### Source Vault

The original custody environment for source material, such as a local volume,
cloud provider, email account, authenticated platform, photo library, physical
archive, or collaborator. A source vault is not necessarily a single software
system.

### Private Source Resolver

A local configuration and adapter layer that maps an opaque protected source ID
to one or more source-vault access routes. It may contain sensitive coordinates
but no reusable authentication secrets.

### Promotion Candidate

A generated, uncommitted public-safe draft derived from selected private
records. It must pass policy checks and human review before an ordinary pull
request may add it to the public professional Wiki.

### Projection

An audience-specific composition, such as a portfolio page, resume, application
brief, or photo-editor brief. Promotion into the public Wiki does not require or
imply projection to the website.

## Proposed System Topology

```text
                         shared versioned dependency
                    +--------------------------------+
                    | @openhouse/knowledge-wiki-core |
                    +--------------------------------+
                              ^              ^
                              |              |
                +-------------+              +----------------+
                |                                             |
  +-------------------------------+          +-------------------------------+
  | Private Personal Knowledge    |          | Public Professional Knowledge |
  | Wiki                          |          | Wiki in jamieburk.art          |
  |                               |          |                               |
  | richer research and context   |          | public-safe records           |
  | private policy                |          | public policy and citations   |
  | promotion candidate producer  |          | portfolio projections         |
  +-------------------------------+          +-------------------------------+
                ^                                             ^
                | private resolver                            | reviewed PR only
                |                                             |
  +-------------------------------+                            |
  | Source vaults and credentials |----------------------------+
  | remain outside public builds  |       public sources only
  +-------------------------------+
```

The private Wiki may import a read-only snapshot of public record identity for
cross-referencing. The public Wiki must never import private records, private
configuration, or the private repository at build time.

## Repository And Package Boundaries

### Proposed repositories

Names are provisional:

| System | Visibility | Responsibility |
| --- | --- | --- |
| `knowledge-wiki-core` | Public | Shared engine, schemas, extension interfaces, and generic documentation |
| `jamie-knowledge-private` | Private or initially local-only | Personal research records, private policy, promotion preparation, and source-resolution metadata |
| `jamieburk.art` | Public | Professional public-safe Wiki, claim authorities, citations, evals, and portfolio |

The core should first be extracted inside `packages/knowledge-wiki-core` in the
existing monorepo. Moving it into a separate repository or publishing it should
happen only after the interface has survived use by both Wikis.

### Dependency direction

Allowed:

```text
private Wiki  -> core
public Wiki   -> core
private Wiki  -> redacted snapshot of public IDs, when useful
```

Prohibited:

```text
core          -> either Wiki's content
public Wiki   -> private Wiki
public build  -> private resolver or source vault
```

This direction prevents an absent private checkout from breaking public builds
and makes a private-data leak through dependency packaging structurally harder.

## Knowledge Wiki Core

### Proposed responsibilities

The core package should own:

- Markdown and frontmatter loading;
- stable record identity;
- configurable record-kind and relation vocabularies;
- graph construction and traversal;
- prose-link and fragment validation;
- correction and supersession primitives;
- wanted-record representation;
- review-date and lifecycle primitives;
- query and report interfaces;
- extension points for authority resolution;
- extension points for content policies;
- deterministic serialization and integrity digests; and
- test helpers for mutation and graph-closure checks.

### Responsibilities that remain outside core

The public professional Wiki should own:

- public-safety patterns;
- portfolio claim, citation, proof, and composition authorities;
- newspaper-safe content requirements;
- production-route and deployment checks;
- public registry generation; and
- rules forbidding private paths from committed records.

The private personal Wiki should own:

- private sensitivity and retention policy;
- consent, custody, access, and deletion fields;
- resolver configuration and adapters;
- private research-note conventions;
- collaborator access decisions; and
- generation of promotion candidates.

### Illustrative API

The final API requires design review. A useful boundary might resemble:

```ts
const wiki = loadWiki({
  root,
  vocabulary,
  policy,
  authorityResolver,
  artifactDirectory
});

await wiki.check();
await wiki.buildGraph();
await wiki.query({ id: "project.callnyc" });
await wiki.reportHealth();
```

The core must receive roots, policies, and authority resolvers through explicit
configuration. It must not import application records by relative path.

## Shared Record Identity

Stable IDs should remain the cross-repository joining mechanism. Paths and
titles may change.

A private record may:

- share the stable ID of a public subject while adding private annotations in a
  separate private record namespace;
- reference a public record by stable ID;
- contain private-only records with no public equivalent; or
- propose a future public ID through a promotion candidate.

A private record must not silently redefine a public claim's canonical wording.
Where both systems discuss the same subject, the relationship should be
explicit, for example:

```yaml
id: private-research.project.callnyc.oral-history
subject_ref: project.callnyc
visibility: private
```

The exact private extension schema remains unresolved.

## Private Source Resolver

### Configuration placement

The real resolver should live outside both repositories at an operating-system
appropriate private configuration path. Repositories may contain:

- a JSON Schema or equivalent contract;
- an example with invented values;
- adapter documentation;
- validation code; and
- an ignored environment variable that points to the private configuration.

They must not contain the real map.

Illustrative environment configuration:

```bash
KNOWLEDGE_WIKI_SOURCE_CONFIG="<private-local-config-path>"
```

### Resolver record

Illustrative only:

```yaml
version: 1

roots:
  private-example-root:
    kind: filesystem
    location: "<private-root>"
    access: read-only

sources:
  ARCHIVE-EXAMPLE-SOURCE-2026:
    root: private-example-root
    relative_locator: "<private-relative-locator>"
    expected_type: document
    hydration: on-demand
    custody: jamie
    last_verified: "2026-07-19"
```

### Supported access kinds

The resolver should eventually represent:

- local filesystem;
- iCloud or another on-demand filesystem;
- Google Drive or Shared Drive;
- authenticated browser surface;
- provider API or export;
- email or calendar search recipe;
- photo-library query or opaque asset ID;
- physical box, folder, or media;
- collaborator custody; and
- not-yet-recovered source.

### Resolution states

Do not collapse access failures into `missing`. At minimum distinguish:

- configured and readable;
- configured but not materialized;
- authentication required;
- provider unavailable;
- permission denied;
- source moved;
- physical source;
- collaborator-held;
- not configured; and
- not recovered.

`not recovered` is not evidence that a source never existed.

### Credentials

The resolver may name an authentication method or credential alias. It must not
store:

- passwords;
- cookies or authenticated browser state;
- OAuth access or refresh tokens;
- API keys;
- recovery codes;
- private keys; or
- expiring signed URLs.

Those remain in Keychain, an authenticated browser profile, a provider-managed
connector, or another approved credential store.

### Proposed local commands

Names are provisional:

```bash
npm run sources:doctor
npm run sources:coverage
npm run sources:locate -- <protected-source-id>
npm run sources:research-start -- <protected-source-id>
```

`doctor` should test configuration and prerequisites without opening or
modifying source material. `coverage` should report resolvable IDs without
printing coordinates. `locate` should reveal a location only in an authorized
local interactive context. `research-start` should create an uncommitted,
dated return-to-source worksheet.

CI should validate the schema and examples. CI must not require Jamie's private
resolver.

## Private Personal Wiki

### Appropriate content

Subject to a future private policy, the private Wiki may hold:

- source-level research notes and bounded excerpts;
- memories clearly identified as memories;
- collaborator testimony and correction state;
- private project chronology and role research;
- rights, consent, custody, and retention decisions;
- competing interpretations;
- research leads and negative findings;
- private relationship and organizational context;
- source-resolution records; and
- promotion history.

### Content that should remain outside private Git

Private Git history is durable and difficult to erase reliably. The private
Wiki should usually reference rather than copy:

- raw email, message, social, or contact archives;
- complete participant, donor, applicant, guest, or resident datasets;
- large photograph, audio, video, or database collections;
- credentials and authenticated state;
- health, financial, legal, or identity records not required for the research
  purpose;
- material subject to a credible deletion requirement; and
- unnecessary sensitive information about other people.

The private Wiki is a governed research and memory layer, not a universal data
dump.

### Initial hosting posture

The safest first implementation is a local private Git repository with an
explicit ignored-source policy and encrypted machine backups. Creating a remote
private repository should follow a threat-model decision covering:

- account and organization ownership;
- collaborator access;
- branch and audit controls;
- backup and recovery;
- deletion limitations;
- incident response; and
- whether any record class is too sensitive for hosted Git.

## Public Professional Wiki

The public Wiki remains independently valid and buildable. This RFP does not
weaken any existing constraints:

- every committed record is public-safe;
- claims retain source basis, support level, guardrails, and anti-claims;
- private paths and protected locators remain excluded;
- the portfolio remains a selective composition, not an archive browser;
- human approval remains necessary for rights, consent, reader response,
  publication, and production; and
- no private repository or local config is required by CI, staging, production,
  or a public contributor.

## Private-To-Public Promotion

Promotion is a review workflow, not synchronization.

```text
private source or memory
        |
        v
private research record
        |
        v
explicit selection for public consideration
        |
        v
generated uncommitted promotion candidate
        |
        +--> public-safety and authority checks
        +--> rights, consent, and collective-credit review
        +--> Jamie editorial decision
        |
        v
ordinary pull request to the public Wiki
        |
        v
optional separate portfolio projection decision
```

### Promotion candidate requirements

A candidate should include:

- proposed public stable ID and kind;
- public-safe summary;
- source-class and support description;
- bounded claim wording, when relevant;
- anti-claims and protected boundaries;
- collective-credit and authorship posture;
- rights and consent state;
- omitted private fields and transformation receipt;
- proposed public relations and authority references;
- reviewer questions; and
- an explicit website-projection decision, normally `none` or `pending`.

### Promotion invariants

1. No command commits directly to the public repository.
2. No private path, excerpt, identity, or resolver coordinate enters the
   candidate.
3. A successful automated check cannot grant rights or consent.
4. Public wording must remain understandable without access to private evidence.
5. A private record may remain valuable without ever being promoted.
6. Promotion into the public Wiki does not automatically change the website.
7. A later correction may narrow, supersede, or retract public wording.

## Return-To-Source Workflow

The shared core should support, and the private policy should require when
appropriate, a dated worksheet containing:

- source ID and access date;
- researcher and source position;
- present research question;
- source version, integrity information, or preservation state;
- direct observations;
- memory or testimony considered separately;
- interpretations and confidence;
- what the source supports;
- what it does not establish;
- rights, consent, and collective-credit notes;
- differences from the prior Wiki account;
- corrections or new inquiries created; and
- public and projection decisions.

This makes situated rereading visible without turning every interpretive note
into public copy.

## Security, Privacy, Rights, And Consent

### Threat boundaries

The design should assume:

- the public repository and its full history are globally readable;
- a private Git host reduces access but does not provide reliable erasure or a
  credential vault;
- local and cloud source roots may be unavailable or only partly materialized;
- authenticated browser state is ephemeral and sensitive;
- debug output, generated artifacts, and patches can leak private coordinates;
- combining harmless metadata may create mosaic risk; and
- collaborators may have rights or legitimate expectations that differ from
  Jamie's source access authorization.

### Required controls

- read-only access by default;
- least-privilege provider scopes;
- credentials outside repositories;
- private configuration excluded from Git and generated bundles;
- file permissions appropriate to a single local user;
- redacted logs and errors;
- no private coordinates in CI output;
- mutation tests against locator and credential leakage;
- immutable or checksummed source captures where appropriate;
- explicit custody, consent, and retention fields; and
- a documented response if private material enters Git history.

### Authorization boundary

Jamie's authorization permits research access within the available technical
and legal boundaries. It does not by itself:

- grant copyright or republication rights;
- waive another person's privacy or consent;
- make every source appropriate for private Git;
- approve public wording;
- approve website projection; or
- permit credentials to be copied from their custody systems.

## Public-Safety Boundary

This public RFP may describe the architecture, generic schemas, opaque IDs,
commands, and safety principles.

It must not contain:

- real private source coordinates;
- names or details learned only from private material;
- raw research manifests;
- authenticated URLs or resource keys;
- actual local resolver content;
- credential aliases that disclose account structure unnecessarily;
- private excerpts or screenshots; or
- enough combined metadata to reconstruct a protected source population.

## Adoption And Migration

### Phase 0: Preserve the current baseline

- Close and review the current Knowledge Wiki pull request.
- Record the accepted baseline commit and command behavior.
- Keep the present 27 portfolio evals and human gates unchanged.
- Make no package or private-repository change under this RFP yet.

### Phase 1: Inventory and characterize the extraction boundary

- Identify generic and portfolio-specific behavior in the current Wiki scripts.
- Write characterization tests for the unchanged public Wiki.
- Define the minimum core API and policy interface.
- Decide which record vocabularies are core defaults versus repository policy.

### Phase 2: Extract the core inside the monorepo

- Create `packages/knowledge-wiki-core`.
- Move pure parsing, graph, query, and validation behavior behind a package API.
- Inject roots, authority resolvers, vocabularies, and policies.
- Keep public commands and outputs behaviorally compatible.
- Do not create or read private data.

### Phase 3: Prototype the private Wiki locally

- Create a local-only private repository from a minimal template.
- Depend on a pinned core version.
- Add private policy, sensitivity, custody, and retention fields.
- Seed only a small, low-risk set of records.
- Validate deletion, backup, and failure behavior before expanding scope.

### Phase 4: Add the private source resolver

- Define the resolver schema and adapters.
- Store real configuration outside both repositories.
- Add redacted `doctor` and coverage commands.
- Resolve a small set of existing protected IDs.
- Test offline, unmounted, unmaterialized, and authentication-required states.

### Phase 5: Prototype promotion

- Generate an uncommitted candidate from one low-risk private record.
- Prove that the candidate contains no private coordinate or content.
- Require ordinary public-repo review and human approval.
- Verify that promotion does not create a website projection automatically.

### Phase 6: Decide package distribution and private hosting

- Evaluate whether the core should remain a monorepo package, become a public
  repository, or be published to a package registry.
- Complete the private-hosting threat model.
- Decide collaborator access and recovery procedures.
- Advance the RFP only on evidence from actual use.

## Compatibility And Rollback

### Compatibility

- Existing Wiki Markdown remains canonical through the core extraction.
- Stable IDs and public relations retain their meaning.
- Existing npm commands should remain available or receive documented aliases.
- Public CI and production remain independent of private systems.
- The compatibility Knowledge Bank remains in place until separately migrated.

### Rollback

Each phase should be independently reversible:

- the core extraction can be reverted to local scripts while retaining tests;
- the private prototype can remain local or be archived without affecting the
  public repo;
- the resolver can be disabled by removing its environment pointer;
- promotion candidates are uncommitted until approved; and
- no migration should move or delete original source material.

Rollback must not erase decision history, corrections, custody notes, or source
integrity information.

## Acceptance Criteria

The RFP may move to `accepted` when:

- [ ] The current Knowledge Wiki pull request is closed and its baseline is
      identified.
- [ ] Jamie approves the three-system boundary: core, private personal Wiki,
      and public professional Wiki.
- [ ] The dependency direction and prohibition on public-to-private imports are
      accepted.
- [ ] The team agrees that raw archives and credentials remain outside Git.
- [ ] The private source-resolver boundary is understood and considered
      technically feasible.
- [ ] The private-to-public promotion workflow retains rights, consent,
      collective-credit, and human publication gates.
- [ ] The phased migration is sufficiently reversible.
- [ ] Blocking unresolved questions have explicit decisions or bounded
      experiments.

Implementation may move to `implemented` only when:

- [ ] The public Wiki passes its unchanged characterization and safety suites.
- [ ] The core package contains no Jamie-specific content or private
      configuration.
- [ ] Public builds succeed without the private repository or resolver.
- [ ] A private prototype passes its policy, backup, deletion, and access tests.
- [ ] Resolver logs and coverage reports reveal no private coordinates.
- [ ] Mutation tests reject credentials and private locators crossing into a
      promotion candidate.
- [ ] At least one low-risk source is reopened through the resolver and produces
      a dated return-to-source record.
- [ ] At least one low-risk promotion candidate completes human review without
      automatic publication.
- [ ] Jamie approves the implemented boundary after hands-on review.

The RFP may move to `recommended` only after both Wikis have used the shared
core over time without policy drift, accidental coupling, or source leakage.

## Implementation Evidence

Future implementation should retain:

- the accepted RFP commit;
- linked implementation pull requests;
- package API and policy documentation;
- characterization-test receipts for the public Wiki;
- adversarial private-locator and credential-leak tests;
- resolver failure-state tests;
- a redacted return-to-source receipt;
- a redacted promotion receipt;
- private-hosting and backup decisions;
- Jamie's human review; and
- an ADR for the final repository and dependency topology.

No eval produced by the optimizing implementation agent may substitute for an
independent review of the same unchanged candidate.

## How We Teach This

The canonical introductory sentence should be:

> One shared engine supports two separately governed Wikis: a private personal
> knowledge environment and a public-safe professional knowledge environment.

New teammates should learn five rules first:

1. Stable IDs connect knowledge; repositories enforce different boundaries.
2. The public Wiki never depends on private data.
3. Original sources remain in source vaults, not in the Wiki engine.
4. Promotion is human-reviewed transformation, not synchronization.
5. Publication is a separate decision from capture, research, and maturation.

Required learning materials would include:

- core package README and API examples;
- public and private policy guides;
- source-resolver setup using invented values;
- return-to-source workflow;
- promotion and correction workflow;
- threat model and incident response; and
- a diagram showing allowed and prohibited information flows.

## Drawbacks

### More architecture

Three systems, policies, and a promotion boundary are harder to understand than
one repository. Package releases and compatibility introduce maintenance work.

### Policy divergence

The public and private Wikis may interpret shared fields differently. The core
must remain small enough to avoid hiding policy inside generic code.

### False confidence from the word private

A private repository can encourage overcollection. Git history, hosted backups,
and collaborator access may make deletion difficult. The private Wiki still
needs minimization and retention discipline.

### Resolver sensitivity

A resolver that contains source coordinates can become a high-value map of the
archive. Its logs, backups, and error messages require protection.

### Promotion complexity

Transformation receipts and human gates add work. A poor promotion tool could
strip necessary context or imply that automated redaction is sufficient.

### Extraction cost

The current scripts mix reusable and portfolio-specific behavior. Prematurely
extracting a generic package could freeze the wrong abstractions.

### Personal continuity risk

A sophisticated system that only one person understands may become less useful
than well-labeled folders. Documentation, simple commands, and recoverable
defaults are essential.

## Alternatives

### Keep private records in a gitignored directory inside `jamieburk.art`

This is simpler but creates accidental-staging, archive-bundling, and conceptual
boundary risks. It also makes the public repository's checkout a de facto
private workspace. Not recommended for canonical private knowledge.

### Make the entire Knowledge Wiki private and export the public site

This gives one knowledge authority but makes public-source collaboration,
auditing, and repository safety harder. A public build would depend on a
private export pipeline. This may be appropriate elsewhere but conflicts with
the current public professional knowledge objective.

### Maintain two independent Wiki implementations

This avoids package extraction but duplicates schemas, graph behavior, fixes,
and teaching. Drift would be likely. Not recommended beyond a disposable
prototype.

### Store encrypted private records in the public repository

Encryption may protect contents but exposes ciphertext history, key-management
burden, file presence, change patterns, and irreversible mistakes. It also
complicates collaboration and deletion. Not recommended as the default.

### Use a hosted personal knowledge product

A hosted Wiki or notes system may offer mature access control and search. It
would weaken the current Markdown, Git-review, typed-graph, local-source, and
promotion workflow unless used only as a source vault or interface.

### Build a database-backed application now

This could support permissions and search but expands V1 far beyond the proven
need. The present problem is governance and source continuity, not a missing
database.

### Create only the local resolver

This directly addresses source wayfinding with less architecture. It does not
provide a governed home for private interpretation or a shared engine. It is a
credible first bounded experiment even if the full RFP remains exploring.

### Do nothing

The public Wiki can continue using opaque identifiers and one-off archival
passes. This avoids complexity but leaves future researchers dependent on
session memory, broad archive searches, and manually reconstructed access
routes.

## Unresolved Questions

Questions marked **blocking** require an answer before acceptance.

1. **Blocking:** Should the private Wiki begin local-only, or use a hosted
   private Git remote from its first commit?
2. **Blocking:** Which private record classes are suitable for Git history, and
   which require a different store with reliable deletion?
3. **Blocking:** What is the minimum generic API that can be extracted without
   freezing portfolio-specific assumptions?
4. **Blocking:** May private records extend a public subject's stable ID, or
   must every private annotation use a distinct namespaced ID?
5. **Blocking:** Who may access the private Wiki and resolver besides Jamie?
6. Should the core remain in this monorepo, become its own public repository,
   or be published to a package registry?
7. Which schema technology should define the core contract?
8. Should the private resolver be part of the core package, a separate adapter
   package, or private-repo code behind a core interface?
9. How should physical and collaborator-held sources be verified without
   pressuring custody holders?
10. What backup and recovery approach protects the private map without making
    uncontrolled copies?
11. What is the deletion and incident-response procedure if sensitive material
    enters private or public Git history?
12. How should public corrections flow back into related private research
    without making the public repo depend on the private repo?
13. How much integrity metadata can safely remain public without increasing
    mosaic risk?
14. What qualifies an RFP implementation as `recommended` after real use?

## Decision History

| Date | Stage | Decision or material change | Decided by |
| --- | --- | --- | --- |
| 2026-07-19 | proposed | Record the shared-core, sibling-Wiki, private-resolver, and human-gated promotion architecture for review after PR #241 closes. No implementation is authorized by this proposal. | Jamie Burkart and Codex drafting session |

## References

- [Knowledge Wiki](../../docs/knowledge-wiki/README.md)
- [Knowledge Wiki schema](../../docs/knowledge-wiki/schema.md)
- [Knowledge Wiki authoring workflow](../../docs/knowledge-wiki/authoring.md)
- [Knowledge Wiki architecture decision](../../docs/architecture/ADR-knowledge-wiki-name-and-model.md)
- [Knowledge Wiki architecture inventory](../../docs/architecture/knowledge-wiki-inventory.md)
- [Knowledge Bank lifecycle](../../docs/knowledge-bank/framework.md)
- [Knowledge Bank public safety](../../docs/knowledge-bank/public-safety.md)
- [Knowledge Bank publishing governance](../../docs/knowledge-bank/publishing-governance.md)
- [Ember.js RFC process](https://github.com/emberjs/rfcs)
- [Ember.js RFC template](https://github.com/emberjs/rfcs/blob/main/0000-template.md)
