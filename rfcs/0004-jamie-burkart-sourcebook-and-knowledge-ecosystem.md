---
rfc: 4
title: Jamie Burkart Sourcebook and Federated Knowledge Ecosystem
stage: implementing
start_date: 2026-08-03
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
  - accessibility
  - editorial
implementation:
  repository: openhouse/jamieburk.art
  pull_request: 270
  branch: agent/jamie-knowledge-ecosystem-rfc
  base_commit: 945cd984b0e2b40c745b95b18d87f9e8768db0bf
  phase: in-repository-content-pilot
supersedes: []
superseded_by: null
---

# Jamie Burkart Sourcebook and Federated Knowledge Ecosystem

The [initial proposed architecture](./history/0004-initial-proposal-knowledge-ecosystem-and-public-source-editions.md)
and [professional-record implementation snapshot](./history/0004-professional-record-implementation-snapshot.md)
are preserved as historical design inputs. This file is the sole canonical RFC
0004 and records the combined, bounded implementation decision.

## Summary

Create a federated knowledge ecosystem in which archival research, attributable
public words, the public-safe Knowledge Wiki, and the portfolio have distinct
authorities but share stable references. Add a proposed public **Jamie Burkart
Sourcebook** modeled on the navigability and citational care of the NYC Artist
Coalition public-support statement library. The Sourcebook would preserve
rights-cleared words and documents about Jamie's work without flattening every
perspective into praise or endorsement. The Knowledge Wiki would interpret
those sources into bounded claims, relations, anti-claims, and research
inquiries. `jamieburk.art` would remain a selective, audience-specific
projection rather than an archive browser. Protected originals, private
communications, and confidential research packages would remain outside every
public repository and could contribute only through reviewed publication
packets. On August 3, 2026, Jamie Burkart explicitly authorized a bounded
implementation in this pull request: a synthetic contract, a Git-native pilot
indexing three already-public statements in this repository, Knowledge Wiki
bindings, and evals. That decision does not authorize third-party quotations,
names, photographs, recommendation material, a new public repository, website
projection, deployment, or production indexing.

## Implementation decision

Jamie, the named decision owner, authorized implementation on August 3, 2026.
The first increment is deliberately narrower than the full architecture:

- it remains in `openhouse/jamieburk.art` as a content-only Git pilot;
- it begins with the complete governed population of three recovered,
  already-public statements authored and delivered by Jamie in official New
  York City Council hearings;
- it stores each statement body only once at its existing Knowledge Wiki path
  while the Sourcebook registry becomes the canonical perspective-metadata and
  browse authority for this pilot;
- it imports no protected package bytes, private locators, recommendation
  language, third-party correspondence, or unapproved media;
- it adds no portfolio route and does not change production publication state.

This is an implementation decision, not a finding that every later source class
has a publication basis. The unresolved questions below remain open for the
separate-repository and third-party-perspective phases.

A concurrent professional-record increment also contributes a content-addressed,
reference-only import from the governed sibling source edition: twelve
public-safe records, seven pinned references to Jamie's already-public
statements, and four explicit public-coverage gaps. The Knowledge Wiki records
institutional facts, encounters, reception, and held claims without importing
protected source bodies or inferring recommendation, endorsement, speaking
roles, or publication permission. This increment remains an in-repository
research and interpretation layer; it adds no portfolio route or public claim
projection.

## Motivation

Jamie has accumulated a rich but distributed record of work as a technical
project manager, artist, civic technologist, public intellectual, community
builder, and organizer. The record includes public projects, official records,
websites, testimony, scholarship, teaching relationships, symposia, public
events, photographs, recommendations, and the words of people who have
encountered the work in different contexts.

The present system already protects and projects important parts of that record:

- `jamieburk.art` contains the public portfolio, public-safe Knowledge Wiki,
  citation registry, agency graph, and projection controls;
- the confidential archival-research system can preserve exact artifacts,
  request-family crosswalks, source and claim ledgers, gaps, and recipient
  packages;
- the public NYC Artist Coalition statement library demonstrates how a large
  body of original words can remain browsable in GitHub or VS Code through one
  canonical store and many generated routes;
- the local Source Vault and authorized providers can retain originals that do
  not belong in Git or do not have public-use permission.

These systems do not yet offer one legible path from a protected source encounter
to a rights-cleared public record, then to a Knowledge Wiki claim, and finally
to a deliberately composed portfolio surface. The missing path creates two
opposite risks:

1. **Understatement by omission.** Important encounters, relationships,
   artifacts, and public assessments can remain scattered or undiscoverable,
   leaving Jamie's professional and intellectual range thinner than the record.
2. **Overstatement by aggregation.** A body of correspondence, attendance,
   praise, social interaction, or recommendation material can be collapsed into
   unsupported claims of endorsement, causation, intimacy, or unanimous
   approval.

The desired ecosystem should remember generously and publish deliberately. It
should make original words easy to find when public use is authorized, retain
critique and uncertainty alongside appreciation, keep Jamie visible as an
actor, preserve collective credit, and let each repository do one coherent job.

This proposal begins from `feature/pre-launch-C` at commit
`945cd984b0e2b40c745b95b18d87f9e8768db0bf`. Earlier eval branches and private
research packages are donor evidence, not an implementation base. Their work
must be compared semantically and re-derived against this foundation before any
later migration.

## Goals

- Preserve every relevant lead through an explicit disposition rather than
  silently dropping material that is not ready for the current portfolio.
- Make rights-cleared original words and bounded excerpts about Jamie's work
  directly browsable in GitHub, VS Code, and ordinary Markdown.
- Represent description, assessment, recommendation, critique, qualification,
  disagreement, and support without calling them all endorsements.
- Keep Jamie's actions, purposes, artifacts, decisions, relationships, and
  professional through-lines visible while retaining shared, collective, and
  institutional credit.
- Give confidential archival research, a public Sourcebook, the public-safe
  Knowledge Wiki, and the portfolio separate, testable authorities.
- Use stable IDs, commit-bound provenance, checksums, relations, and publication
  packets so records can be joined without copying protected material.
- Support people-, project-, event-, place-, theme-, year-, source-type-, and
  relationship-oriented discovery without duplicating canonical text.
- Let the portfolio use the strongest supportable public wording without
  becoming a database dump, testimonial wall, or self-celebratory archive.
- Create a migration path from the exact `feature/pre-launch-C` state that does
  not blindly cherry-pick older candidate-bound evidence.
- Make rights, consent, attribution, collective credit, and editorial selection
  independent human gates.

## Non-goals

- This increment does not create a separate Sourcebook repository or choose its
  final name.
- It does not import private research packages, raw transcripts, educational
  records, correspondence, direct messages, contact data, private photographs,
  or source locators into this public repository.
- It does not approve a quote, photograph, recommendation, testimonial, name,
  relationship description, or symposium account for public use.
- It does not treat a public post, follow, like, attendance record, meeting,
  recommendation request, or ongoing communication as an endorsement.
- It does not establish that a scheduled event occurred or that a remembered
  conversation has been corroborated.
- It does not create a public `/knowledge-bank`, `/public-claims`, `/proofs`, or
  raw private-archive route.
- It does not add a CMS, database, authentication system, AI chatbot, archive
  browser, or search service to V1.
- It does not automatically synchronize repositories or let a private build
  become a dependency of the public website.
- It does not replace RFC 0001. It specializes that proposal for a public-safe
  source corpus about Jamie and depends on compatible publication boundaries.
- It does not authorize implementation beyond the bounded increment Jamie
  approved on August 3, 2026 merely because the RFC or its pull request is
  merged.

## Terminology

**Source Vault**
: Local or separately governed custody for original files, exports, private
  communications, protected records, and media that must not enter public Git.

**Confidential research project**
: A request-family production package with exact artifacts where allowed,
  protected pointers, ledgers, authored synthesis, gaps, checksums, and a named
  recipient boundary.

**Jamie Burkart Sourcebook**
: The proposed public-safe, Markdown-first repository of attributable public
  words, rights-cleared complete statements, bounded excerpts, and documentary
  records about Jamie's work. “Sourcebook” is a working product name, not an
  accepted repository name.

**Perspective record**
: A canonical record preserving what a person or institution said, wrote, or
  documented in a bounded context. Its stance may be descriptive, supportive,
  critical, mixed, procedural, or unknown.

**Encounter**
: A bounded event or exchange joining people, places, projects, and sources. A
  calendar entry can establish scheduling; occurrence requires appropriate
  corroboration.

**Knowledge Wiki**
: The public-safe, Markdown-first editorial and research system at the
  compatibility path `docs/knowledge-bank`, together with its structured claim,
  source, evidence, agency, and projection registries.

**Portfolio projection**
: Purpose-built website or application copy selected from eligible public-safe
  knowledge for a defined audience. Projection is an editorial act, not an
  automatic consequence of evidence maturity.

**Publication packet**
: A bounded proposal that moves only public-safe wording and metadata across a
  trust boundary, with source basis, anti-claims, rights, consent, credit,
  intended surfaces, fingerprints, and explicit human decisions.

**Public words**
: Words whose public provenance and republication basis have been reviewed.
  Public availability alone does not necessarily authorize full-text
  republication.

## Detailed design

### Design principles

1. **Capture is broader than projection.** Every supplied or discovered lead
   receives a stable intake record and disposition. Only a small subset reaches
   the portfolio.
2. **One canonical body, many paths.** A public perspective body is stored once.
   Project, person, event, place, theme, year, and source-type pages point to it.
3. **Words are not endorsements by default.** Records preserve attributed
   stance and context rather than inheriting a generic “support” label.
4. **Evidence is not permission.** Evidentiary value, access, copyright,
   consent, attribution, and publication selection remain separate dimensions.
5. **The graph preserves plurality.** Contradiction, qualification, critique,
   silence, uncertainty, and change over time remain visible.
6. **Jamie remains legible.** Public composition must identify Jamie's bounded
   actions, purposes, decisions, and results without appropriating collective or
   institutional outcomes.
7. **Public systems fail closed.** A missing clearance, unresolved identity,
   protected locator, or private dependency blocks projection.
8. **Repository history is a disclosure surface.** Material that should not be
   public must never be committed and later “redacted.”

### Federated topology

The ecosystem has five responsibilities and four trust layers:

```text
local Source Vault and authorized providers
                    |
                    v
       confidential archival research
                    |
          reviewed publication packet
                    |
                    v
      public Jamie Burkart Sourcebook
                    |
      source IDs + commit-bound export
                    |
                    v
     jamieburk.art public Knowledge Wiki
                    |
        selected portfolio projection
                    |
                    v
              apps/www website
```

The dependency rules are:

1. The Source Vault and confidential research system may know protected source
   locations. Public systems may not.
2. Confidential research may propose a publication packet but may not push to a
   public repository or mark a human permission field approved.
3. The Sourcebook accepts only public-safe records and assets. Its checks run
   without access to any private repository, provider, or local vault.
4. The Knowledge Wiki references a pinned Sourcebook record and source commit;
   it does not duplicate the canonical statement body by default.
5. The portfolio projects from governed Knowledge Wiki claims and citations,
   never directly from private research or an unreviewed Sourcebook record.
6. No public build imports private content, private identifiers, private graph
   structure, local paths, or protected diagnostic output.

### Repository responsibilities

| System | Canonical authority | Explicitly not authoritative for |
| --- | --- | --- |
| Source Vault | Original protected bytes and access routing | Public wording, consent, or editorial selection |
| Confidential research | Request scope, source coverage, exact/pointer custody, joins, claims, gaps, deliverables | Public permission or production copy |
| Jamie Burkart Sourcebook | Public-safe perspective bodies, documentary records, public provenance, browse routes | Interpretive career claims or private source completeness |
| Knowledge Wiki | Claims, anti-claims, agency, relations, inquiries, publication decisions, projection guidance | Protected originals or a complete public reading experience |
| Portfolio | Audience-specific narrative, case studies, resume, About, and selected citations | Archival completeness or source custody |

RFC 0001's proposed shared core should eventually provide compatible schemas and
validators across the private and public knowledge systems. Until that proposal
is accepted and implemented, this RFC favors explicit exports and adapters over
premature package extraction.

### Sourcebook precedent and deliberate differences

The public [NYC Artist Coalition statement library](https://github.com/openhouse/commercial-rent-stabilization-public-support/tree/f806a04eeac4912d509bc9b051a95567582daa79)
at snapshot `f806a04eeac4912d509bc9b051a95567582daa79` supplies the
principal precedent:

- a canonical campaign/theme/public-moment statement tree;
- complete statement bodies where the publication basis allows them;
- generated browse routes by campaign, issue, person, year, legislation, and
  source type;
- stable Knowledge Wiki-compatible frontmatter;
- source hashes, provenance, completeness, publication state, gaps, evals, and
  a local archiving skill;
- the rule that one body is stored once and linked from many routes.

The Jamie-focused Sourcebook must differ in four ways:

1. Its subject is a person with overlapping private, professional, artistic,
   civic, and educational relationships; it therefore needs stricter identity,
   relationship, consent, and contextual-integrity controls.
2. Its organizing dimensions are not all campaigns. Projects, encounters,
   practices, places, institutions, and periods must be first-class.
3. Its records include critique, description, procedural records, and Jamie's
   own public words as well as recommendations or support.
4. Full text is optional. Official records, speaker-owned text, and text with a
   clear republication basis may be complete; publisher-controlled or
   permission-pending material remains an excerpt or source pointer.

### Proposed Sourcebook filesystem

The working repository shape is:

```text
README.md
START-HERE.md
records/
  projects/<project>/<public-moment>/<speaker-or-document>.md
  practices/<practice>/<public-moment>/<speaker-or-document>.md
  encounters/<encounter>/<speaker-or-document>.md
  self-authored/<context>/<document>.md
browse/
  people/
  projects/
  practices/
  encounters/
  places/
  institutions/
  themes/
  years/
  source-types/
catalog/
  INDEX.md
  SCOPE-AND-COVERAGE.md
  RIGHTS-AND-CONSENT.md
  GAPS-AND-NONRECOVERIES.md
  PROVENANCE.md
  VALIDATION.md
sources/
  public-manifests/
schemas/
skills/
tools/
evals/
```

`records/` is canonical. `browse/` is generated or link-only. A record has one
primary contextual home even when it participates in many projects and themes.
The canonical home is an editorial retrieval choice, not a claim that the
speaker or text belongs exclusively to that context.

### Perspective record contract

The eventual schema should extend the current Knowledge Wiki frontmatter with
fields similar to:

```yaml
id: perspective.example.2026-01-01
title: Bounded descriptive title
kind: perspective
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-03
canonical_path: records/projects/example/event/speaker.md
summary: A public-safe orientation sentence.
relations:
  - type: describes
    target: person.jamie-burkart
speaker:
  id: person.example
  public_name: Example Name
  role_at_time: Public role established by the source
context:
  kind: public-event
  date: 2026-01-01
  event_id: event.example.2026-01-01
stance:
  value: descriptive
  basis: The source documents work without expressing blanket support.
text:
  completeness: bounded-excerpt
  certification: source-transcribed
source:
  id: source.example.2026-01-01
  type: official-transcript
  url: https://example.org/public-source
  source_sha256: <digest>
rights:
  evidence_use: reviewed
  quote_use: reviewed
  full_text_republication: not-applicable
consent:
  attribution: reviewed
  public_projection: pending
projection:
  status: hold
  surfaces: []
boundaries:
  - The statement does not imply endorsement of every aspect of Jamie's work.
```

Exact field names require a schema ADR or accepted implementation design. The
independent dimensions are mandatory even if the syntax changes:

- source identity and immutable provenance;
- speaker identity and role at the time;
- event or communication context;
- text completeness and transcript certification;
- stance and the basis for classification;
- evidentiary use;
- copyright or republication basis;
- consent and attribution state;
- collective-credit boundary;
- public-projection decision;
- review owner, date, and expiration where relevant.

### Relationship and encounter model

The ecosystem should add or standardize these public-safe concepts:

- `person`: Jamie, collaborator, professor, public official, writer,
  participant, interviewer, or other attributed speaker;
- `organization`: institution or collective without implying that one speaker
  represents the whole organization;
- `event`: public hearing, symposium, exhibition, office hours, meeting, panel,
  or other bounded occasion;
- `encounter`: an event-specific relation among people, places, and work;
- `perspective`: attributed words or documentary characterization;
- `relationship`: a time-bounded, evidence-bounded connection such as taught,
  collaborated, corresponded, interviewed, convened, attended, or encountered;
- `claim`: an authored proposition with support and anti-claim relations;
- `projection`: a surface-specific composition decision.

A relationship edge must carry source basis, date range or uncertainty,
public-use boundary, and credit scope. “Continues to be in communication” is a
claim requiring a bounded source and review date, not a permanent relationship
property.

Jamie has identified European symposium travel, conversations around an
Innsbruck event and a Vienna event, and ongoing scholarly communication as
candidate examples of the field this system should remember. This RFC records
the desired class of knowledge only. It does not establish attendance, identify
private correspondents, characterize their views, or approve private exchanges
for publication.

### Heteroglossia and stance

The Sourcebook should use a non-flattened stance vocabulary:

```text
self-description
description
assessment
recommendation
support
qualified-support
critique
mixed
procedural
context-only
unknown
```

One record may carry more than one position with a written classification basis.
The system must retain time-aware role, audience, medium, and context. It must
not convert a recommendation letter into support for every later role, a public
official's participation into institutional endorsement, or a private exchange
into a testimonial.

The Sourcebook may present multiple perspectives together without resolving
them. The Knowledge Wiki may author a synthesis only when it cites the relevant
records, preserves disagreement, and states the interpretation boundary.

### Referential interoperability

Public references should be deterministic and ordinary:

- stable semantic IDs survive path changes;
- canonical paths remain repository-relative;
- public source bodies carry SHA-256 hashes;
- cross-repository references name repository, record ID, and source commit;
- Sourcebook exports carry a schema version and whole-export fingerprint;
- Knowledge Wiki claims list exact Sourcebook record IDs and pinned commits;
- portfolio citations resolve through the public registry generated from
  Knowledge Wiki authorities;
- moves preserve redirect or alias metadata and regenerate all browse links;
- confidential identifiers are never reused as public IDs merely for
  convenience.

The public graph must not expose private record counts, hashes, tombstones,
backlinks, local paths, or the existence of a protected relationship. A
publication packet creates a new public identity and records the private mapping
only on the protected side.

### Reader and operator paths

The ecosystem serves different people without giving them the same interface.

**GitHub or VS Code researcher**

- starts at the Sourcebook's `START-HERE.md`;
- descends through project, practice, encounter, person, place, year, or source
  type;
- reads the canonical public words with source and context at hand;
- follows a stable ID into the public Knowledge Wiki for bounded synthesis.

**Hiring manager or public reader**

- starts on the portfolio homepage, About, resume, or a case study;
- receives a concise account of Jamie's role, purpose, and result;
- can open a small citation or source note when trust requires it;
- is not asked to navigate a claims database before understanding the work.

**Jamie or an authorized researcher**

- begins with a request family or research inquiry;
- searches bounded sources and records access coverage;
- retains exact protected evidence only in the appropriate custody layer;
- proposes public records and projections through reviewable packets;
- sees gaps, rights questions, contradictions, and expiring approvals.

**Collaborator, speaker, or rights holder**

- can inspect the exact public wording, context, attribution, and intended
  surface relevant to them;
- can request correction, qualification, withdrawal, or narrower use;
- does not need access to unrelated private research.

### Knowledge Wiki integration

The existing Knowledge Wiki remains the canonical public claim layer. It should
gain the minimum extensions necessary to reference Sourcebook records:

- a `perspective` or compatible source kind;
- public `person`, `event`, `encounter`, and `relationship` records where useful;
- typed relations such as `said_by`, `said_at`, `describes`, `assesses`,
  `qualifies`, `responds_to`, and `public_sourcebook_record`;
- projection controls distinguishing source eligibility from editorial use;
- an anti-claim preventing “perspective,” “interaction,” or “recommendation”
  from becoming “endorsement” without direct evidence;
- generated source coverage and wanted-page views;
- correction and withdrawal propagation from Sourcebook IDs to dependent
  claims and pages.

New public route design is deferred. The V1 portfolio should continue to expose
composed pages and citations, not a raw Wiki Explorer. Public Sourcebook browsing
can occur in GitHub first; a reader-facing web view requires separate evidence
that it improves comprehension without increasing privacy or maintenance risk.

### Portfolio integration

The portfolio can use the ecosystem in four bounded ways:

1. **About and professional through-line.** Compose a public-safe account that
   connects artistic, civic, technical, and operational practice without
   forcing every period into one job-title narrative.
2. **Case-study perspective modules.** Where rights and context are clear, add
   a small number of attributed voices that clarify what Jamie made usable.
   These are not decorative testimonials.
3. **Event and intellectual-context notes.** Link selected public encounters to
   methods, questions, and later work while avoiding social-name-dropping or
   claims of affiliation.
4. **Source notes and citations.** Let readers move from a bounded claim to the
   relevant public record without exposing protected inventories.

Every projection should answer:

- What did Jamie do?
- Toward what purpose and for whom?
- What artifact, decision, practice, or usable result survives?
- Whose labor and authority were shared, collective, or institutional?
- What does the source establish, and what does it not establish?
- Why does this evidence help this audience understand the work?

### Ingestion and maturation workflow

```text
request family or research inquiry
  -> bounded source search and access receipt
  -> exact artifact or protected pointer
  -> derived transcript or observation with transformation disclosed
  -> identity, chronology, and relationship reconciliation
  -> claim, anti-claim, gap, and rights review
  -> publication packet with a new public ID
  -> Sourcebook pull request
  -> Sourcebook checks and human public-use decision
  -> pinned Knowledge Wiki source relation
  -> claim and projection review
  -> portfolio pull request
  -> candidate-bound checks and human editorial decision
```

Each arrow is a state transition, not a synonym. A repaired transcript is not
audio-certified. A source is not a claim. A supported claim is not a selected
projection. A selected projection is not consent. A merged staging change is
not production indexing.

### Branch correction and donor recovery

No implementation from an older eval branch should be cherry-picked wholesale.
A later implementation pass should create a donor matrix with one row per
candidate change:

| Field | Purpose |
| --- | --- |
| donor branch and commit | Identify the exact prior proposal |
| semantic domain | Claim, schema, UI, source, eval, generated output, or tooling |
| current-base equivalent | Show whether `feature/pre-launch-C` already contains or supersedes it |
| source basis | Rebind the change to current public or protected evidence |
| public-safety review | Confirm that no private content or locator crosses the boundary |
| decision | Re-derive, adapt, reject, defer, or already present |
| dependent regeneration | Name graphs, registries, reports, screenshots, and checks invalidated |

The implementation branch must begin at the accepted base chosen at that later
time. It should recreate accepted semantics in the current schemas, regenerate
derived output, and bind all receipts to one unchanged candidate. Prior green
checks are historical evidence only.

### Evaluation contract

Implementation should add tests at the boundary where each failure can occur.
The minimum eval families are:

**Sourcebook structure**

- unique IDs, canonical paths, parseable frontmatter, and valid typed links;
- one canonical body per perspective with generated browse routes;
- source-body and export fingerprints;
- explicit scope, coverage, nonrecovery, and source cutoffs;
- reproducible generated indexes and clean rebuilds.

**Privacy, rights, and consent**

- secret, local-path, private-identifier, and protected-locator scanning;
- no raw private communications, transcripts, education records, or media;
- fail closed on missing attribution, quote-use, full-text, or image state;
- no private graph cardinality or tombstone leakage;
- correction and withdrawal dependency detection.

**Semantic integrity**

- stance classification has a basis and does not default to support;
- recommendation, contact, attendance, and engagement cannot mutate into
  endorsement;
- scheduled events cannot mutate into occurred events without corroboration;
- repaired transcripts cannot mutate into certified transcripts;
- relationship edges carry dates, evidence, and boundaries;
- every claim says what its sources do not establish.

**Agency and editorial quality**

- Jamie is visible as an actor where the record supports it;
- shared, collective, and institutional credit remain explicit;
- the portfolio does not become a source dump or praise wall;
- a source inclusion does not create an automatic website projection;
- high-risk wording resolves to a canonical Knowledge Wiki claim and citation.

**Release discipline**

- all reports, generated registries, screenshots, ZIPs, and judge receipts bind
  to one candidate fingerprint;
- stale evidence fails after any candidate-affecting change;
- staging remains `noindex`;
- production indexing, rights, consent, and editorial approval remain human
  gates.

Adversarial fixtures should mutate each prohibited transition and demonstrate
that the relevant check fails. Subjective portfolio judges should be calibrated
against human labels and kept separate from deterministic release gates.

## Security and privacy

This RFC is committed to a public repository. It contains no private source
text, private repository path, account identifier, credential, protected
locator, or unapproved quotation.

The principal risks are:

- accidentally committing protected source content or Git history;
- exposing the existence or shape of private relationships through public IDs,
  hashes, backlinks, or gaps;
- publishing a private correspondent's words because Jamie can access them;
- reproducing publisher-controlled text beyond the reviewed basis;
- presenting a recommendation or public encounter as a permanent endorsement;
- inferring identity, intent, relationship, diagnosis, authorship, or consent
  from photographs or communication metadata;
- joining records on loose dates or names and presenting the result as certain;
- letting generated browse pages or client bundles contain private fields;
- preserving a correction or withdrawal in one repository while stale
  projections remain elsewhere.

Controls must include:

- private custody outside public Git, including public branch history;
- minimum-necessary publication packets with allowlisted fields;
- new public IDs rather than leaked private identities;
- deterministic joins labeled as exact, explicit, identifier-based,
  time-bounded, or human-review candidates;
- source-specific transcript and event-occurrence states;
- independent rights, consent, attribution, and projection fields;
- public build independence from every private system;
- dependency reports for correction, expiration, and withdrawal;
- current human review before public use of names, quotes, and media;
- repository and compiled-output scanning before every push and release.

Access is not consent. Evidence is not permission. A private repository is not
a rights grant. A public event does not make every conversation at that event
public. A photograph does not establish an invisible relationship or intention.

## Publication workflow

Publication occurs through two distinct reviews.

### Protected source to public Sourcebook

1. An authorized researcher defines a bounded question and source population.
2. The confidential project records queries, cutoffs, inspected material, gaps,
   joins, and transformations.
3. A publication packet proposes only public-safe text and metadata.
4. Automated checks verify structure, provenance, leakage boundaries, and open
   gates.
5. Jamie reviews purpose, accuracy, sensitivity, and public interest.
6. The speaker, rights holder, collaborator, or other reviewer is consulted when
   required by the rights and consent policy.
7. An ordinary Sourcebook pull request records the exact candidate and review
   decision.

### Public Sourcebook to portfolio

1. A Knowledge Wiki change references the pinned Sourcebook record.
2. The claim records evidence, anti-claim, agency, credit, guardrail, and
   intended surfaces.
3. The public registry and derived Wiki views are regenerated.
4. A portfolio change composes only eligible claims for a defined audience.
5. Staging checks bind to the unchanged candidate and remain `noindex`.
6. Jamie separately approves content, media, deployment, and production
   indexing.

Validation can show that a candidate conforms to its technical and governance
contract. It cannot grant rights, consent, endorsement, collaborator approval,
editorial approval, deployment approval, or production indexing.

## Rollout plan

### Phase 0: accept or revise the architecture — authorized for bounded implementation

- Review this RFC alongside RFC 0001 and the current Knowledge Wiki ADR.
- Choose the Sourcebook product and repository name.
- Approve the trust topology, record classes, and human decision owners.
- Record Jamie's explicit implementation decision and keep later publication
  surfaces behind their own gates.

### Phase 1: current-base inventory and donor matrix

- Freeze the selected implementation base and record its SHA.
- Inventory current Wiki authorities, source kinds, people, events,
  perspectives, testimony, and projection machinery.
- Compare older branches and confidential research outputs by semantic domain.
- Record re-derive, adapt, reject, defer, and already-present decisions.
- Make no public content change in this phase.

### Phase 2: synthetic contract prototype

- Prototype the Sourcebook schema, validator, browse generator, and publication
  packet with synthetic people, events, and statements only.
- Add leakage, stance, endorsement, relationship, transcript, and stale-receipt
  mutation tests.
- Test a content-free Sourcebook export and Knowledge Wiki adapter.

### Phase 3: bounded public pilot

- Select one project with official or creator-controlled public sources and a
  clear collective-credit model.
- Build a small complete population with documented denominator and gaps.
- Review every name, quotation, full-text body, and intended public surface.
- Keep the portfolio unchanged while GitHub and VS Code retrieval are observed.

### Phase 4: Knowledge Wiki integration

- Add accepted source, person, event, encounter, relationship, and perspective
  adapters without creating a second claim registry.
- Bind a small set of claims to the pinned pilot export.
- Regenerate graphs, registries, reports, and eval evidence.
- Exercise correction and withdrawal propagation.

### Phase 5: selective portfolio projection

- Choose one reader problem and one bounded surface, such as an About-page
  through-line or a case-study perspective note.
- Run public-safety, citation, route, accessibility, visual, and candidate-bound
  checks on staging.
- Observe reader comprehension before expanding the pattern.

### Phase 6: operationalization

- Document ownership, review cadence, source cutoffs, rights expiration,
  corrections, withdrawals, backups, and disaster recovery.
- Add further projects only when the pilot demonstrates retrieval value and
  sustainable maintenance.
- Consider a separate public web view only after Git-native use establishes a
  concrete audience need.

Rollback means removing or holding the public projection while preserving the
public correction record. A rights or consent withdrawal may require repository
history remediation beyond an ordinary revert; that procedure must be agreed
before the first sensitive public record is committed.

## Decision gates

The RFC may remain `proposed` while discussion occurs. Advancement requires:

### Before `exploring`

- Jamie approves the problem framing and federated direction.
- The Sourcebook working name and intended audience are explicitly discussed.
- Reviewers agree that “many perspectives” includes critique and uncertainty,
  not only favorable statements.
- The relation to RFC 0001 is resolved well enough to avoid duplicate cores.

### Before `accepted`

- Jamie approves repository visibility, ownership, threat model, and correction
  policy.
- A rights and consent matrix defines when full text, excerpts, names,
  photographs, and relationship descriptions may be used.
- Stable public ID and publication-packet contracts are specified.
- The V1 source populations and explicit non-goals are selected.
- The donor-matrix method is approved for older branch recovery.
- Accessibility and operator-maintenance acceptance criteria are named.

### Before `implementing`

- An implementation pull request links the accepted RFC and exact base SHA.
- Synthetic fixtures demonstrate the trust boundary before personal content is
  added.
- Deterministic and adversarial checks exist for the pilot's highest-risk
  transitions.
- No unresolved private dependency is required by a public build.

### Before `operational`

- One bounded public pilot has complete population accounting and human review.
- Correction, withdrawal, rights expiration, and stale-receipt workflows have
  been exercised.
- The Knowledge Wiki consumes a pinned, reproducible public export.
- The portfolio remains understandable without the Sourcebook.
- Jamie approves the exact public content and deployment separately.

### Before `recommended`

- Real GitHub or VS Code use demonstrates that readers can find original words.
- A bounded reader study shows that portfolio comprehension improves or remains
  strong.
- Maintenance survives at least one source update and one correction cycle.
- No material privacy, rights, collective-credit, or authorship failure remains
  open.
- Jamie explicitly chooses the system as the preferred default.

## Drawbacks

- A federated system creates more repositories, schemas, checks, and release
  boundaries than a single folder.
- Stable cross-repository references and correction propagation require durable
  maintenance.
- Rights and consent review may make the public corpus substantially smaller
  than the private archive.
- Git is durable and distributed; a mistaken sensitive commit can be difficult
  to retract completely.
- A Jamie-centered corpus can read as self-promotional or extractive if the
  context, critique, collaborator agency, and public purpose are weak.
- Browsable original words can burden readers if the portfolio does not remain
  selective.
- Generated indexes can create false confidence in completeness unless every
  population and cutoff is explicit.
- A shared schema can encourage premature abstraction before real pilot records
  reveal the right distinctions.
- Human review, correction, and rights expiration are ongoing obligations, not
  one-time launch tasks.

## Alternatives

### Extend only the current Knowledge Wiki

This avoids another repository and may be sufficient for a small number of
public sources. It does not provide the direct, corpus-like GitHub and VS Code
experience Jamie values, and it risks mixing canonical source bodies with
interpretive claims.

### Put the full corpus inside `jamieburk.art`

This simplifies linking but would increase the public portfolio repository's
size, review surface, and chance of source/projection confusion. The site should
remain a composed portfolio, and its repository should not become the custody
location for a growing source archive.

### Use the confidential research repository as the Sourcebook

This would confuse recipient-bounded research with public publication and could
expose protected artifacts, source structure, or private gaps. Private Git is
not a public rights-clearing workflow.

### Rename the corpus “statements of support for Jamie”

This is easy to understand but epistemically too narrow. It would pressure
descriptive, critical, qualified, procedural, and historically bounded records
into endorsement language. “Sourcebook” or “public perspectives” better
preserves plurality.

### Generate the public Sourcebook directly from the private archive

Automation could reduce duplicate authoring, but an exporter defect would make
the public system depend on private classification. An allowlisted publication
packet and ordinary public pull request create a more legible human boundary.

### Build a public web Knowledge Wiki immediately

This may eventually aid discovery, but it introduces route, design, search,
accessibility, and privacy work before Git-native retrieval has been tested. The
portfolio already serves public readers; GitHub is the lower-risk Sourcebook
pilot surface.

### Do nothing

The current portfolio can continue to improve, but original words, encounters,
and relationships will remain distributed. Future research will keep paying the
cost of rediscovery, and Jamie's public record may remain both thinner and less
auditable than the surviving evidence permits.

## Unresolved questions

- Is **Jamie Burkart Sourcebook** the right name, or should the public repository
  use **Jamie Burkart Public Perspectives**, **Jamie Burkart Documentary
  Record**, or another non-endorsement frame?
- Should the Sourcebook be a separate public repository at pilot time, or a
  content-only prototype that becomes separate after evaluation?
- Must RFC 0001 reach `accepted` before this RFC, or can the Sourcebook pilot use
  compatible local schemas while the shared core remains proposed?
- Which one project has the clearest rights basis and bounded denominator for a
  first public pilot?
- Which public-source classes permit complete text, and which require excerpts
  or outbound source links?
- When is speaker or collaborator consultation ethically required even if legal
  republication rights appear sufficient?
- How should a public record represent a relationship whose present continuity
  is uncertain or private?
- Should Jamie's own public words live in the same canonical record tree or a
  separately signposted self-authored collection?
- What correction and withdrawal promise can a distributed Git repository make
  honestly?
- Which Sourcebook records, if any, should be mirrored into a future public web
  view rather than linked from GitHub?
- How will readers distinguish an archival record, a recommendation, an
  attributed perspective, and an endorsement at a glance?
- What observation period and reader evidence should be required before any
  perspective pattern expands across the portfolio?
