---
rfc: 4
title: Jamie Burkart Knowledge Ecosystem and Public Source Editions
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
  - editorial
implementation: https://github.com/openhouse/jamieburk.art/pull/269
supersedes: []
superseded_by: null
---

# Jamie Burkart Knowledge Ecosystem and Public Source Editions

## Summary

Create a coherent, cross-repository knowledge ecosystem in which private
archival research, public source editions, the public-safe Knowledge Wiki, and
the hiring portfolio have distinct responsibilities but share stable identities
and explicit exchange contracts. Establish a proposed public source edition
about Jamie Burkart as a person at work: his public words, appearances,
institutional descriptions, published reception, professional evaluations with
permission, and public dialogues with collaborators and peers. Preserve
original words when rights permit, retain context and contrary evidence, and
link rather than duplicate records already canonical in project-specific
archives. Move information between trust domains only through reviewed,
content-addressed promotion packets. Jamie authorized a bounded in-repository
pilot on August 3, 2026. That decision authorizes public-safe Wiki integration,
held claim records, source fingerprints, and hard-gate evaluation; it does not
authorize a sibling repository, private correspondence, unapproved images, or
an automatic portfolio projection.

## Motivation

Jamie's recent recommendation-letter research demonstrates that his
professional record is not exhausted by a resume or a project list. It also
exists in other people's descriptions of his work, recurring invitations and
encounters, public testimony, classroom evaluations, symposium participation,
institutional relationships, photographs, correspondence, and the continuity
of conversations over time.

That wider record can make several dimensions of Jamie's practice more
legible:

- technical and operational delivery;
- civic and cultural organizing;
- public speaking and public-intellectual participation;
- reciprocal learning across art, technology, policy, and community practice;
- hospitality, convening, and relationship stewardship;
- intellectual persistence across places and years;
- the way collaborators, teachers, institutions, and public officials have
  understood his contributions.

The current repositories already contain complementary strengths:

- `openhouse/archival-research-projects` can preserve governed private research
  packages, exact source coverage, protected communication representations,
  and explicit gaps;
- the proposed private personal Knowledge Wiki in RFC 0001 can retain richer
  memory, relationships, uncertainty, and routes back to original sources;
- `openhouse/commercial-rent-stabilization-public-support` demonstrates a
  navigable public source edition built around attributed original words and
  citational context;
- the `jamieburk.art` Knowledge Wiki holds public-safe claims, evidence
  boundaries, corrections, collective credit, and projection guidance;
- the portfolio website composes a small, audience-specific argument for
  hiring readers;
- RFC 0003 defines a related living loop for photographs, oral history,
  rights, and selective placement.

These systems are not yet joined by one explicit authority map. Without that
map, future work may either underuse valuable research or solve the problem by
copying too much. Both outcomes are costly. Important context can remain buried
in one-off ZIP packages, while duplicated transcripts, drifting summaries, and
private-to-public leakage can make the apparent integration less trustworthy.

The opportunity is not to put Jamie's whole life on the portfolio. It is to
make the deeper record durable and queryable, then let each public surface use
only what its purpose, evidence, rights, credit, and audience justify.

## Goals

- Define an authority map for private archives, private research, public source
  editions, the public Knowledge Wiki, and portfolio projections.
- Establish a proposed public source-edition model centered on Jamie without
  reducing people, relationships, or complex reception to testimonials.
- Preserve public original words in full when legally and ethically permitted,
  and preserve citations, contextual summaries, and bounded quotations when
  full-text republication is not permitted.
- Make public appearances, symposium encounters, professional evaluations,
  published profiles, public dialogues, and institutional descriptions
  discoverable through stable people, event, source, statement, project, and
  relationship records.
- Keep subject-specific source editions canonical for their own full-text
  records while allowing Jamie-centered indexes to link across them.
- Define a one-way promotion process from protected research to public-safe
  knowledge without making the public build depend on private infrastructure.
- Preserve disagreement, uncertainty, correction, collective credit, and the
  difference between encounter, relationship, supervision, collaboration, and
  endorsement.
- Give future agents and teammates a deterministic, inspectable contract for
  cross-repository updates.
- Improve the Knowledge Wiki's depth while preserving the portfolio as a
  selective, reader-centered composition.
- Provide evaluation criteria that reward retrieval, provenance, context, and
  truthful professional legibility without rewarding disclosure volume.

## Non-goals

- This implementation does not authorize a sibling repository, a public
  full-text corpus, or portfolio publication beyond separately approved exact
  candidates.
- It does not authorize publishing private emails, direct messages, iMessages,
  WhatsApp messages, private transcripts, contact graphs, account inventories,
  or protected source locators.
- It does not treat Jamie's access to material as the speaker's consent to
  quote, publish, identify, or characterize them.
- It does not create a comprehensive biography, social graph, fan page,
  endorsement leaderboard, reputation score, or sentiment-analysis product.
- It does not require every favorable statement to appear on the portfolio.
- It does not exclude neutral, complicated, corrective, or critical public
  evidence when that evidence is necessary for an honest record.
- It does not copy every transcript into every repository.
- It does not broaden the Commercial Rent Stabilization repository into a
  general Jamie archive.
- It does not replace the claim registry, Knowledge Wiki, public citation
  registry, photo system, or current portfolio data models.
- It does not infer authorship, collaboration, supervision, endorsement,
  friendship, causation, or continuing relationship from co-presence or a
  single communication.
- It does not make unpublished course work, private evaluations, or private
  recommendation research public by default.
- It does not add a public archive browser or new portfolio route during the
  bounded pilot.
- It does not transfer decision authority from Jamie, quoted people, rights
  holders, collaborators, or project stewards to an automated system.

## Terminology

**Knowledge ecosystem**
: The related repositories, source vaults, schemas, exchange artifacts,
  editorial practices, and human decisions that preserve and project Jamie's
  professional record.

**Private research capsule**
: A governed project in `archival-research-projects` containing the assignment,
  source inventory, protected research, findings, gaps, and bounded
  deliverables. It is not a public source merely because it is structured.

**Private personal Wiki**
: The sibling system proposed in RFC 0001 for protected memory, research
  context, relationships, source return, and publication preparation.

**Public source edition**
: A public repository or bounded collection that preserves source-level records
  with archival context. It is optimized for reading, citation, correction, and
  reuse rather than for making a portfolio argument.

**Jamie-centered source edition**
: The proposed public source edition whose subject is Jamie as a person at
  work. Its working scope includes Jamie's public words and public records, plus
  other people's public or permission-cleared words about, with, or in direct
  professional relation to him.

**Reception record**
: A source-bounded record of how a named person or institution publicly
  described, evaluated, introduced, invited, credited, questioned, or responded
  to Jamie or his work. It does not imply endorsement beyond the quoted source.

**Encounter record**
: A dated, sourced occurrence in which people were present in a shared public or
  professional context. Encounter is weaker than relationship and does not
  establish collaboration.

**Relationship assertion**
: A dated and qualified statement about continuity between people, supported by
  an appropriate source. Relationship kinds remain specific, such as teacher,
  collaborator, correspondent, host, participant, organizer, or peer.

**Canonical source home**
: The one repository responsible for the exact public source record, transcript
  version, corrections, and content checksum.

**Reference record**
: A compact record that points to a canonical source in another public
  repository without copying its full text.

**Promotion packet**
: A bounded, reviewed proposal that carries only the material needed to create
  or update a public record. It contains no protected originals or private
  locators.

**Portfolio projection**
: A deliberately selected and rewritten use of eligible Knowledge Wiki material
  for a specific public audience. Eligibility does not require selection.

**Public words**
: Words already published in a public setting or deliberately approved for
  publication. Public availability does not by itself settle copyright,
  quotation, privacy, dignity, or contextual-fairness questions.

## Detailed design

### 1. Architectural principles

#### 1.1 Preserve first, interpret second, publish separately

Source preservation, research interpretation, public knowledge, and portfolio
composition are different operations. A source can be important without being
publishable. A claim can be defensible without belonging on the website. A
public statement can be quotable without functioning as an endorsement.

#### 1.2 The system should remember generously and publish deliberately

The private layers may retain unresolved, intimate, partial, or exploratory
context when custody is appropriate. The public layers should expose only
material that is source-backed, rights-aware, fair to others, useful for a
defined audience, and approved for that surface.

#### 1.3 Original words remain situated

A statement record should preserve who spoke, when, where, to whom, in what
role, about what subject, through which source, and with what transcript or
quotation confidence. Extracting a sentence must not erase the event, speaker
position, surrounding exchange, or the difference between public and private
speech.

#### 1.4 Jamie is a subject, not the sole author of the record

The proposed source edition may center Jamie without appropriating other
people's work or converting collective outcomes into individual causation. It
should make Jamie's actions visible while retaining the actors, institutions,
conditions, disagreements, and shared labor around them.

#### 1.5 Full text is a rights state, not a quality score

Full text is appropriate for Jamie-authored public material, public records,
licensed work, material in the public domain, or work published with explicit
permission. Copyrighted journalism and third-party creative work should
normally receive metadata, a contextual abstract, a link or archive locator,
and only a bounded quotation unless rights permit more.

#### 1.6 Link canonical records; do not fork them

If the Commercial Rent Stabilization source edition is canonical for a public
speech, the Jamie-centered edition should create a reference and subject-role
index entry. It should not create an independent transcript that can drift.

#### 1.7 The portfolio is an argument, not an archive interface

The public website should continue to minimize hiring-reader burden. It may use
selected quotations, source notes, event descriptions, and relationship context
from the Knowledge Wiki, but it should not display the full research graph or
mirror the source edition.

### 2. Repository topology and authority

The proposed topology has five distinct roles:

```text
local Source Vault and authenticated providers
                  |
                  v
private research capsules -----> private personal Knowledge Wiki
                  |                         |
                  +----------+--------------+
                             |
                    reviewed promotion packet
                             |
              +--------------+---------------+
              v                              v
project-specific public source       Jamie-centered public
editions                              source edition
              \                              /
               \-- pinned public manifests-/
                             |
                             v
             jamieburk.art public-safe Knowledge Wiki
                             |
                  deliberate projection decision
                             |
                             v
                    portfolio and applications
```

Authority is assigned as follows:

| Concern | Canonical home | Public? |
|---|---|---|
| Raw correspondence, provider exports, private transcripts, original binaries | Source Vault or governed private package | No |
| Research coverage, protected findings, source gaps, private relationship context | `archival-research-projects` capsule or private personal Wiki | No |
| A public issue-specific speech or testimony transcript | Relevant public source edition | Yes, subject to rights |
| A public or permission-cleared source substantially about Jamie | Proposed Jamie-centered source edition | Yes, subject to rights |
| Public-safe professional claim, boundary, correction, and source relationship | `jamieburk.art` Knowledge Wiki | Yes |
| Current hiring argument and selected case-study copy | `jamieburk.art` website | Yes |
| Source photo, private metadata, oral-history working material | Photo archive and governed private photo workspace | No |
| Approved public derivative, placement, and caption assertion | RFC 0003 photo records and portfolio manifest | Yes |

No repository becomes canonical merely by containing a copy. Canonicality is a
declared responsibility with a stable ID, content digest, correction path, and
named steward.

### 3. Proposed Jamie-centered public source edition

The working repository name is:

```text
openhouse/jamie-burkart-public-record
```

The name is intentionally provisional. Alternatives appear below. Jamie must
approve the name, mission, and initial public corpus before repository creation.

The edition should answer questions such as:

- What did Jamie say publicly, and in what setting?
- How did teachers, collaborators, organizers, institutions, journalists, and
  public officials publicly describe or respond to his work?
- Which invitations, presentations, evaluations, and recurring exchanges show
  the development of a practice over time?
- What evidence distinguishes attendance, participation, contribution,
  collaboration, leadership, and outcome?
- Where is the canonical source, what is recoverable, what remains unknown, and
  what may be quoted?

It should include both a reader-friendly Markdown collection and a
machine-readable graph export. A possible structure is:

```text
README.md
CONTRIBUTING.md
CORRECTIONS.md
docs/
  people/
  projects/
  events/
  relationships/
  reception/
  statements/
    by-jamie/
    about-jamie/
    public-dialogues/
  sources/
  indexes/
    chronology.md
    by-person.md
    by-project.md
    by-place.md
    by-practice.md
    rights-and-coverage.md
data/
  public-knowledge-manifest.json
  schema-version.json
schemas/
scripts/
evals/
```

The first edition should remain bounded. It should not begin by importing every
private finding. A pilot corpus of 10 to 20 public or permission-cleared records
is large enough to test retrieval, context, rights, correction, and portfolio
use without making the initial rights review unmanageable.

### 4. Record model

The cross-repository core should support at least these public identities:

```text
person:<slug>
organization:<slug>
project:<slug>
event:<date-or-slug>
source:<slug>
statement:<slug>
relationship:<slug>
asset:<slug>
claim:<slug>
projection:<slug>
```

The literal delimiter and namespace remain an implementation decision. Stable
IDs must survive moves, title changes, repository renames, and regenerated
indexes.

A public statement or reception record should include:

- stable ID and canonical public URL;
- speaker or author, with role at the time of the statement;
- subject and named entities;
- date, place, event, and project context where known;
- source type and canonical source ID;
- exact-source locator that is itself public-safe;
- transcription method and confidence;
- quotation or full-text rights basis;
- public-domain, license, permission, or bounded-quotation state;
- exact text, excerpt, or contextual abstract as allowed;
- source-language and translation state;
- evidence state and corroboration scope;
- relationship type, if asserted, with its own evidence;
- collective-credit and causation boundaries;
- correction path and version history;
- content checksum and last-reviewed date;
- allowed public uses and prohibited interpretations.

The model should distinguish at least these record kinds:

- `jamie_public_statement`;
- `public_statement_about_jamie`;
- `public_dialogue`;
- `institutional_description`;
- `published_profile_or_review`;
- `public_introduction_or_invitation`;
- `formal_evaluation`;
- `event_encounter`;
- `relationship_assertion`;
- `project_credit`;
- `public_correction`;
- `cross_repository_reference`.

`formal_evaluation` requires special care. A transcript in Jamie's possession
may support private research while remaining non-public. Full publication
requires a rights and dignity decision appropriate to the source and author.

### 5. Relationship and encounter semantics

The system should make long-running intellectual and professional connections
retrievable without exaggerating them. It should model the following as
different assertions:

- Jamie attended an event;
- Jamie presented or asked a question;
- another participant responded publicly;
- two people exchanged contact information;
- correspondence continued after the event;
- they collaborated on a project;
- one person supervised, taught, recommended, or hired Jamie;
- the relationship remained active as of a stated date.

Each assertion needs its own date range, source, confidence, privacy class, and
public-use boundary. A public event photograph may show co-presence but cannot
establish a conversation, relationship, agreement, or endorsement. Private
correspondence may establish continuity for private research but still require
consent before quotation or public characterization.

This model can retain the importance of Studio 3 in Innsbruck, the Weibel
Institute symposium in Vienna, MIT Media Lab encounters, and later continuing
conversations without forcing every detail into the public site or collapsing
travel, participation, dialogue, and relationship into one claim.

### 6. Source-edition policy

Every source record should declare one of these text dispositions:

| Disposition | Public representation |
|---|---|
| `full_text_public_record` | Complete text plus official source and version |
| `full_text_jamie_authored` | Complete text with Jamie's approval and source context |
| `full_text_licensed` | Complete text plus license or permission receipt |
| `bounded_quotation` | Short quotation, contextual abstract, and canonical link |
| `metadata_only` | Bibliographic and contextual record without quotation |
| `reference_only` | Pointer to another canonical public edition |
| `withheld` | Public-safe notice of an intentional absence, when useful and non-revealing |

The repository must not assume that public accessibility grants republication
rights. The default for third-party journalism, books, course material, private
evaluations, and correspondence is `bounded_quotation`, `metadata_only`, or
`withheld` until reviewed.

Automated transcripts must preserve:

- the original audio or video source identity;
- whether the source was public or private;
- transcription engine and date;
- speaker-label confidence;
- human correction state;
- omissions and inaudible passages;
- whether the speaker reviewed the attributed text;
- the exact version approved for public use.

Unverified automated speaker labels cannot support attributed quotation.

### 7. Cross-repository exchange contract

Public repositories should exchange compact manifests rather than reading one
another's working trees or private infrastructure at build time.

Each source edition should generate a versioned file such as:

```json
{
  "schemaVersion": "1.0.0",
  "edition": "example-public-source-edition",
  "commit": "FULL_COMMIT_SHA",
  "generatedAt": "2026-08-03T00:00:00Z",
  "records": [
    {
      "id": "statement:example",
      "kind": "cross_repository_reference",
      "canonicalUrl": "https://example.org/records/example",
      "contentSha256": "SHA256",
      "rightsDisposition": "reference_only",
      "publicSummary": "Public-safe bounded summary.",
      "relatedIds": ["person:jamie-burkart", "event:example"]
    }
  ]
}
```

The consuming repository should pin the source repository, commit, schema
version, and manifest digest. Refreshing an import is an intentional operation
that produces a reviewable diff. Public builds must be deterministic and work
with network access disabled.

The exchange contract should enforce:

- one canonical source home per exact record;
- stable identity and alias mapping;
- schema-version compatibility;
- content and manifest checksums;
- correction and supersession metadata;
- rights and allowed-use dispositions;
- public-safe fields only;
- explicit source cutoff and coverage limits;
- no private paths, account identifiers, source-vault IDs, or protected graph
  cardinality;
- no automatic strengthening of imported text into a claim.

The Knowledge Wiki may turn an imported source reference into a public claim
only through its existing evidence, agency, guardrail, and projection workflow.

### 8. Private-to-public promotion

The promotion sequence extends RFC 0001:

```text
protected original
  -> governed private source record
  -> private observation and competing interpretations
  -> bounded public candidate
  -> evidence, rights, consent, dignity, and collective-credit review
  -> Jamie publication decision
  -> content-addressed promotion packet
  -> public source-edition pull request
  -> public Knowledge Wiki claim or reference pull request
  -> optional portfolio projection
```

A promotion packet should contain only:

- proposed public IDs and destination repository;
- public wording or approved transcript version;
- public-safe source metadata;
- evidence and limitation statement;
- speaker or rights-holder review state;
- rights basis and allowed uses;
- collective-credit and agency boundaries;
- correction contact and revocation procedure;
- destination surfaces;
- schema version and source-content fingerprints;
- Jamie's explicit decision field.

It must exclude raw private messages, private account metadata, private paths,
contact details, provider URLs, access recipes, and unrelated context.

No automation may populate a human consent, rights, or publication approval as
`approved`. Validation can prove that a decision field exists and is bound to
an unchanged candidate; it cannot make the decision.

### 9. Public Knowledge Wiki integration

The `jamieburk.art` Knowledge Wiki remains canonical for professional meaning,
not for every source's full text. It should gain bounded reference records and
indexes that can answer:

- Which public sources support a capability or project claim?
- Which people described Jamie's work in which context?
- Which public appearances show Jamie speaking, organizing, facilitating,
  building, or learning?
- Which relationships are public-safe to characterize, and at what level?
- Which source editions hold the canonical transcript or statement?
- Which claims remain private, under-corroborated, rights-blocked, or simply
  unselected?

Possible Knowledge Wiki pages include:

- `Jamie Burkart: practice and professional throughline`;
- `Public speaking and testimony`;
- `Teaching, learning, and intellectual exchange`;
- `Symposia, encounters, and continuing conversations`;
- `Invitations, evaluations, and institutional reception`;
- `Hospitality, convening, and relational infrastructure`;
- `Public record and reception: source-edition index`.

These pages should summarize and connect. They should not reproduce protected
research or become collections of decontextualized praise.

### 10. Portfolio and application integration

The portfolio may project from mature Knowledge Wiki claims in several forms:

- one sentence that names Jamie's recurring practice;
- a project-specific quote with nearby context and citation;
- a compact public-appearance chronology;
- a relevant evaluation or introduction, with permission;
- a photograph connected to an event record and oral history;
- an application-specific evidence packet assembled from approved records.

Every projected use should identify:

- the visitor problem it solves;
- the claim or capability it supports;
- the exact source edition and record version;
- why this quotation or event is more useful than a shorter paraphrase;
- its credit, rights, expiry, and correction state;
- the page and component where it appears.

The portfolio should not add a general `/proofs`, `/knowledge-bank`, or raw
archive route. The citation layer may remain visually quiet while its contract
remains machine-checkable.

### 11. Photo and oral-history integration

RFC 0003 remains authoritative for photographic source identity, derivatives,
captions, rights, represented-person review, oral history, and placement.

This RFC adds cross-repository relationships:

- an event can link to a governed photo set;
- a statement can link to a photograph that shows the public setting;
- a person label can become a public identity assertion only after review;
- an oral history can create research observations without becoming a public
  caption automatically;
- a public source edition may reference an approved photo derivative but must
  not copy the private asset or Apple Photos metadata;
- a portfolio placement must remain destination-bound and separately approved.

Photographs should help readers understand where knowledge was produced, who
was present, and how Jamie worked. They must not be used as visual proof of a
relationship or endorsement that the record does not otherwise establish.

### 12. Contribution and correction workflow

Collaborators and readers should be able to contribute without editing private
research or learning protected context.

A public contribution may propose:

- a public source;
- a correction to identity, role, date, wording, or credit;
- an approved first-person recollection;
- permission to publish a bounded quotation or evaluation;
- a missing public event or project record;
- a withdrawal or narrower-use request.

The contribution template should state that submission does not guarantee
publication and should ask separately about:

- factual accuracy;
- preferred name and role at the relevant time;
- authorship and credit;
- quotation permission;
- photograph permission and represented-person concerns;
- allowed surfaces;
- public attribution or anonymity;
- correction and withdrawal contact.

Corrections should propagate from the canonical source home through regenerated
manifests and intentional downstream refreshes. Previously published portfolio
uses should be listed as occurrences so a correction or revocation can be
completed rather than merely recorded.

### 13. Evaluation system

The ecosystem should use layered checks rather than rerunning every expensive
judge on every change.

#### Deterministic hard gates

- schema and stable-ID validity;
- cross-repository ID collision and canonical-home uniqueness;
- checksum and pinned-commit integrity;
- public/private field allowlists;
- local-path, account-identifier, secret, and protected-locator leakage;
- transcript version and speaker-attribution state;
- rights-disposition completeness;
- correction and supersession closure;
- collective-credit and agency fields;
- exact-candidate binding for reviews and publication decisions;
- deterministic offline portfolio builds.

#### Targeted semantic evaluators

- Does the public description say no more than the source permits?
- Does a relationship assertion exceed its evidence?
- Does the record preserve meaningful context around quoted words?
- Does Jamie remain visible without converting collective work into sole
  authorship or causation?
- Does the portfolio use reduce hiring-reader burden?
- Does a source edition remain readable as an archive rather than a database
  dump?
- Does the corpus preserve heteroglossia rather than selecting only praise?
- Does a private absence remain honestly represented without leaking it?

#### Human gates

- quotation and full-text publication permission;
- copyright and license review where needed;
- represented-person and photograph review;
- collaborator credit and fairness;
- public-interest and dignity judgment;
- Jamie's publication and portfolio-selection decisions;
- real hiring-reader comprehension.

The evaluation runner should select affected cases by changed record kinds,
edges, policies, and surfaces. It should run the full deterministic suite on
every candidate, targeted semantic judges only for affected risks, and a frozen
holdout suite before release. A passing score cannot average away a failed
privacy, rights, attribution, or exact-candidate gate.

#### Required adversarial mutations

Mutation tests should attempt to:

- turn a private email into a public quotation;
- infer collaboration from event co-presence;
- infer endorsement from a favorable sentence;
- remove the speaker's role-at-time;
- copy a transcript whose canonical home is another repository;
- publish a machine transcript with uncertain speaker labels;
- drop a contradictory or limiting passage;
- convert coalition action into Jamie's sole outcome;
- retain a private path or account identifier in generated output;
- use a stale promotion approval after content changes;
- publish a photo without destination-specific permission;
- import a live remote manifest during the public build.

Each mutation must fail for the right reason.

### 14. Operating cost and recursive work

The system should measure improvement per unit of human and model attention.
Every research or hill-climbing run should declare:

- the changed candidate and exact fingerprint;
- the risks or criteria affected;
- deterministic checks run;
- semantic evaluators selected and why;
- holdouts intentionally deferred or run;
- token, time, and external-service cost where available;
- findings retained, rejected, or left unresolved;
- human gates still open.

The preferred recursive step is the smallest bounded change that improves the
lowest meaningful criterion without weakening provenance, privacy, consent,
rights, credit, accessibility, or reader clarity. More evaluation is not
automatically better governance. Reusing stale green receipts is not an
optimization.

## Security and privacy

The most serious risk is treating a rich private research package as a staging
area for public copy. The system must instead assume that protected sources are
non-exportable unless a bounded candidate completes every required gate.

Likely leakage paths include:

- copied Markdown front matter, comments, source excerpts, or filenames;
- generated indexes, backlinks, graph exports, search data, and test fixtures;
- full-text search output retained in logs or evaluation traces;
- hashes or counters that reveal the shape of a private communication history;
- account identifiers, email addresses, provider URLs, browser state, and local
  paths;
- photo metadata, People labels, locations, and bystanders;
- cached manifests that retain withdrawn material;
- Git history, package tarballs, CI artifacts, and ZIP deliverables;
- an LLM summary that paraphrases protected content too specifically;
- public characterization of an ongoing relationship that a participant did
  not approve.

Required controls include:

- deny-by-default public export schemas;
- separate public and private fixtures;
- no public build dependency on a private repository, authenticated service, or
  local Source Vault;
- content-addressed promotion packets with candidate-bound human decisions;
- public artifact and Git-history scanning;
- field- and edge-level privacy policies;
- rights and consent expiry or revocation handling;
- bounded logs and evaluation retention;
- public correction contacts and occurrence tracking;
- minimum-necessary use of names, relationships, and quotations;
- incident-response procedures for accidental publication.

Access is not consent. Evidence is not publication permission. A public URL is
not a blanket full-text license. A successful evaluator is not a human decision.
When any required publication state is unknown, public export fails closed.

## Publication workflow

The publication workflow has three independent decisions:

1. **Source-edition decision:** May this source, transcript, quotation, or
   reference enter the public source edition?
2. **Knowledge decision:** What bounded professional meaning may the public
   Knowledge Wiki derive from it?
3. **Composition decision:** Does that meaning or quotation serve the current
   portfolio or application?

Approval at one layer does not approve the next.

For third-party words, the workflow must record who owns or controls the text,
the basis for full text or quotation, the speaker's preferred attribution where
applicable, the allowed surfaces, and the correction or withdrawal route.

The initial public edition should be reviewed record by record. Bulk promotion
from the recommendation research package is prohibited. Private communication
inventories may guide source discovery but may not appear in public coverage
statistics or imply that a person endorses Jamie.

## Rollout plan

Jamie authorized a bounded implementation pilot on August 3, 2026. Phases 1
through 3 and the public-safe Knowledge Wiki portion of Phase 5 may proceed in
this pull request. A sibling source-edition repository, any full-text
third-party corpus, and the Phase 6 portfolio canary retain their separate human
decision gates.

### Phase 0: Preserve and discuss the proposal - completed

- Preserve the original proposal and record Jamie's implementation decision.
- Review the authority map with maintainers of the named repositories.
- Decide whether the proposed source edition is useful, fair, and sustainably
  scoped.
- Make no public corpus, repository, or portfolio change.

### Phase 1: Inventory and contract design

- Inventory record models, stable IDs, validators, exports, and correction
  workflows across the three public repositories and private research package.
- Define the smallest shared public manifest schema.
- Produce a source-rights matrix and threat model.
- Identify duplicate records and name their canonical homes.
- Select representative public, private, cross-repository, transcript, photo,
  and correction fixtures.

### Phase 2: Shared-contract prototype

- Extend or prototype the shared core described in RFC 0001.
- Add public-source-edition and cross-repository-reference schemas using only
  synthetic fixtures.
- Build deterministic export, import, digest, and compatibility checks.
- Demonstrate that the portfolio builds offline with all sibling repositories
  absent.
- Keep the prototype removable until the RFC is accepted.

### Phase 3: Private maturation pilot

- Select a bounded thread from the recommendation research project.
- Preserve its protected context in the private research system.
- Identify which elements are already public, which require permission, which
  can support only a public-safe summary, and which should remain private.
- Produce candidate promotion packets without publishing them.
- Record rejected and withheld candidates so later work does not repeatedly
  rediscover the same boundary.

### Phase 4: Public source-edition pilot

- Create the sibling repository only after Jamie approves its name and public
  mission.
- Begin with 10 to 20 rights-clear, public-source records.
- Prefer Jamie-authored public words, official public records, already licensed
  sources, and cross-repository references.
- Exercise corrections, reference-only links, versioned transcripts, and one
  consented third-party contribution.
- Publish a content-addressed public manifest.

### Phase 5: Knowledge Wiki integration

- Import the pinned public manifest through a reviewable update.
- Create or strengthen public-safe people, event, relationship, reception, and
  practice pages.
- Bind each stronger claim to its canonical source and guardrail.
- Keep private source paths, communication inventories, and unpublished words
  absent.
- Run deterministic, targeted semantic, and holdout evaluations.

### Phase 6: Portfolio canary

- Choose one hiring-reader problem that the new evidence can solve.
- Compare the current page with one bounded candidate using a real source,
  context, and optional approved photograph.
- Test comprehension, credibility, collective credit, accessibility, and visual
  burden.
- Retain the change only after Jamie approves the exact candidate.

### Phase 7: Operational observation

- Complete at least three correction or expansion cycles across repositories.
- Measure source-return success, duplicate drift, rights-review burden,
  evaluator cost, and portfolio usefulness.
- Document failures and revise the contract before considering the architecture
  operational or recommended.

### Rollback

Every public import is pinned and reversible. Removing a manifest import must
leave the Knowledge Wiki and portfolio buildable. Canonical public transcripts
remain in their source editions. Private originals remain in their governed
custody and never depend on the public graph for recovery.

## Decision gates

### To advance to `exploring`

- Jamie confirms that the five-role authority map reflects the intended
  practice.
- The maintainers identify at least three representative cross-repository
  workflows and two failure cases.
- The working scope distinguishes public record, reception, encounter,
  relationship, recommendation, and endorsement.
- The proposed repository name and public mission receive initial review.

### To advance to `accepted`

- Jamie approves the repository topology, source-edition mission, initial
  corpus, and decision owners.
- The relationship to RFCs 0001 and 0003 is explicit and non-conflicting.
- The public manifest schema, canonical-home rule, stable-ID policy, and
  correction propagation contract are specified and tested with synthetic
  fixtures.
- A rights matrix covers public records, Jamie-authored work, copyrighted
  journalism, event recordings, course evaluations, recommendations,
  correspondence, photographs, and collaborator recollections.
- The threat model covers private research packages, Git history, package and
  CI artifacts, generated indexes, LLM context, and cross-repository imports.
- The evaluation plan proves that hard gates cannot be averaged away.
- Open questions likely to create incompatible repositories or public harm are
  resolved.

### To advance to `implementing`

- An implementation plan references an accepted RFC revision.
- The initial corpus has a source and rights inventory.
- Baseline and adversarial fixtures are bound to the exact implementation
  candidate.
- A correction and rollback path exists before the first public import.
- Named humans own publication, rights, and portfolio decisions.

### To advance to `operational`

- Public builds succeed with all private and sibling repositories unavailable.
- Cross-repository manifests verify against pinned commits and digests.
- No public artifact contains private source text, paths, accounts, or graph
  structure.
- Each full-text third-party record has a recorded rights basis.
- Each relationship statement is no stronger than its evidence and approved
  public use.
- Canonical records and references do not drift across repositories.
- At least one correction or withdrawal has been completed end to end.
- A real portfolio canary improves comprehension without weakening truth,
  collective credit, accessibility, or reader focus.
- Jamie approves the operational release.

### To advance to `recommended`

- Repeated research and publication cycles show reliable source return and
  correction propagation.
- The source edition remains useful as a reading environment, not merely a data
  dependency.
- The Knowledge Wiki becomes deeper while the portfolio remains selective.
- Rights, consent, and editorial workload are sustainable.
- Evaluator cost is proportional to changed risk and no stale approval has been
  accepted.
- Jamie explicitly chooses the architecture as the default practice.

Automated evidence can support these gates. It cannot establish consent,
copyright permission, relationship meaning, collaborator fairness, public
interest, or Jamie's decision.

## Drawbacks

- A fifth repository role adds maintenance, naming, and onboarding burden.
- A Jamie-centered archive can become self-congratulatory or flatten other
  people into evidence about one person.
- Public source editions can encourage full-text collection beyond legal or
  editorial need.
- Stable identities and pinned manifests add friction to spontaneous research.
- Cross-repository schemas can become more abstract than the actual work
  requires.
- Relationship modeling can over-formalize living, changing human connections.
- Permission and correction work may be substantial, especially for older
  material and photographs.
- The private and public layers may drift if promotion and correction queues are
  not maintained.
- A comprehensive public record can increase exposure, misinterpretation, and
  unwanted discoverability for Jamie and others.
- The architecture can distract from the immediate employment purpose if the
  pilot is not tightly bounded.

These drawbacks argue for a small public pilot, a strong right to withhold, and
an explicit measure of whether each layer is earning its operational cost.

## Alternatives

### Add all findings directly to `jamieburk.art`

This is the fastest path but makes the portfolio repository carry archival,
private-boundary, source-edition, and presentation responsibilities at once. It
would increase leakage risk and make the public site harder to compose.

### Keep the recommendation package as a standalone ZIP

This preserves its private boundary and exact research context. It does not
make durable public-safe findings, source references, or corrections easy to
discover across future projects.

### Add a testimonials section to the portfolio

This would be simple and legible, but it would narrow a rich record to praise,
encourage decontextualized quotation, and erase the difference between teacher,
collaborator, public official, journalist, participant, and friend.

### Expand the Commercial Rent Stabilization source edition

That repository already models attributed public words well, but broadening it
to every dimension of Jamie's life would collapse its issue-specific mission.
It should remain canonical for Commercial Rent Stabilization records and export
references to other systems.

### Put the Jamie-centered source edition inside the portfolio monorepo

This reduces repository overhead and may be appropriate for a small pilot. It
also makes it easier for the archival corpus to dominate the hiring site and
couples source-edition growth to portfolio deployments. The RFC leaves this as
an unresolved implementation choice.

### Use a private Wiki only

This preserves nuance and lowers public risk. It does not provide the public,
citable, readable original-word experience Jamie values. It remains a viable
choice if the rights and maintenance burden of a public source edition is too
high.

### Create a public link index without transcripts or structured records

This is inexpensive and legally conservative. It would not preserve correction
history, stable identity, event context, or the connection between source,
claim, photograph, and portfolio occurrence.

### Do nothing

The current repositories can continue independently. Valuable findings will
remain usable through manual research, but source rediscovery, duplicate
summaries, and loss of relational context will continue to consume time.

## Unresolved questions

- Should the public source edition be named `jamie-burkart-public-record`,
  `jamie-burkart-public-words-and-reception`, or something less person-centered?
- Should the pilot live inside `jamieburk.art` before becoming a sibling
  repository?
- Does RFC 0001 need to reach `accepted` before this RFC can be implemented, or
  can the public manifest pilot proceed independently?
- Which current repository should host the shared schema package and release
  process?
- Which existing records are duplicated, and which repository should become
  canonical for each?
- Which public sources permit full-text republication, and which require
  metadata, bounded quotation, or permission?
- Should narrative evaluations and recommendation letters ever enter the public
  source edition, and under what author-review process?
- What is the minimum evidence needed to publish a continuing-relationship
  assertion?
- How should a participant request correction, narrower attribution, or
  withdrawal across Git history and downstream occurrences?
- How should translations preserve original language, translator credit, and
  uncertainty?
- Which photo and oral-history records can accompany the first edition without
  creating a second rights-review program?
- What is the smallest useful first corpus for the current job-search timeline?
- Which hiring-reader tests would demonstrate that a portfolio projection is
  helping rather than adding social proof without clarity?
- Who besides Jamie should review the first public edition for fairness to
  collaborators and quoted people?
