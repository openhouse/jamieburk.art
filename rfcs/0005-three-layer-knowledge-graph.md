---
rfc: 5
title: Three-Layer Knowledge Graph and Governed Source Materialization
stage: exploring
start_date: 2026-08-10
authors:
  - Jamie Burkart
  - Codex, AI-assisted draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - privacy-governance
  - research-operations
  - developer-experience
  - editorial
  - public-portfolio
implementation: null
supersedes: []
superseded_by: null
---

# Three-Layer Knowledge Graph and Governed Source Materialization

> **Proposal boundary**
>
> This RFC is an `exploring` design record. Merging it preserves the proposal
> for discussion. It does not authorize migration, a new repository, source
> access, private materialization, public projection, deployment, or indexing.
> Jamie Burkart remains the decision owner for every stage change.

## Summary

Distinguish three responsibilities that the emerging Knowledge Wiki ecosystem
currently represents in one broad graph: a **semantic graph** of meaning, an
**evidence graph** of support and complication, and a protected **source-custody
layer** that knows where authoritative bytes reside and under what access
conditions. Define explicit, default-deny transitions between the layers. Count
graph degree only across semantic relationships; attach evidence after semantic
selection; and materialize source artifacts only through bounded,
source-specific workflows. Audience-specific projections remain a fourth
output rather than another source of truth. This architecture is intended to
keep context packets relevant as the archive grows while preserving
provenance, contradiction, rights, consent, collective credit, and human
publication authority. It also treats plural, attributed lenses and explicit
knowledge handoffs as first-class operating structure: synthesis may ensemble
different readings without forcing consensus or turning one perspective into a
total account.

At Jamie Burkart's request, pull request 273 includes a read-only evaluation
prototype: a versioned layer policy, derived compiler, semantic-radius and
packet-family planner, custody-request planner, projection-eligibility check,
CLI, and implementation eval suite. The prototype supplies implementation
evidence while the RFC remains `exploring`; it does not itself record the
separate human stage-advancement decision required by the repository RFC
process. It performs no authenticated source read, artifact copy, public
projection, deployment, or indexing.

## Motivation

The Knowledge Wiki is becoming a useful coordination plane across portfolio
work, job opportunities, civic and cultural projects, photographs, testimony,
research records, websites, and private source systems. Its present generated
graph is already heterogeneous: projects, capabilities, methods, claims,
sources, indexes, research runs, and individual assets are all first-class
nodes.

A private production-shaped packet run made the consequences measurable. Nine
portfolio and opportunity seeds traversed a normalized graph of 389 nodes and
1,342 edges. The cumulative packets reached 9 nodes at degree zero, 24 at
degree one, 73 at degree two, and 344 at degree three. Degree three therefore
expanded from a selective orientation set to approximately 88 percent of the
whole graph. The dominant expansion came from evidence-rich project hubs and
photographic records, not from 271 newly meaningful semantic concepts.

That run also exposed a separate boundary failure: machine-local acquisition
paths entered materialized context until the packet compiler was repaired.
Structural proximity, evidence availability, source location, and disclosure
permission cannot safely share one undifferentiated traversal model.

The observed problems are:

1. **Distance is not consistently relevance.** A generic relation can make a
   large evidence census as cheap to traverse as one semantic concept.
2. **Evidence-rich projects dominate union packets.** A high-degree project can
   overwhelm thinner but still important opportunity neighborhoods.
3. **New opportunities have uneven graph maturity.** Some connect to methods,
   capabilities, and projects; others initially connect only to their official
   source record. Thin linkage is easily mistaken for weak fit.
4. **Source authority is distributed.** Git, websites, authenticated accounts,
   local archives, and Apple Photos require different access and capture
   protocols. The graph compiler cannot safely impersonate all of them.
5. **Public safety is a data-flow property.** A public-safe node may be informed
   by protected evidence without inheriting its locator or making the evidence
   publishable.
6. **A structural pass is not editorial adequacy.** Reaching every node and
   verifying every checksum does not prove that a packet is useful to a photo
   editor, hiring reader, researcher, or public visitor.
7. **Knowledge state is more precise than availability.** A record may have
   been created, communicated, received, incorporated into a decision, or acted
   on. Collapsing those events into “the team knew” conceals the handoff that
   may need repair.
8. **Plurality is not a defect to normalize away.** People in different roles
   may hold source-backed, mutually complicating views. A summary that invents
   one institutional voice can erase expertise, boundaries, disagreement, and
   the conditions under which trust was granted.

The expected outcome is a graph that can remain deep without making every
query broad, and a materialization workflow that can remain powerful without
turning access into disclosure.

## Goals

- Give semantic meaning, evidentiary support, and source custody separate,
  testable authorities.
- Make semantic graph distance interpretable enough to use as a context radius.
- Prevent evidence and asset hubs from silently expanding the semantic radius.
- Preserve supporting, complicating, contradictory, and private evidence
  without forcing it onto a public or recipient-facing surface.
- Route each source through the workflow responsible for its custody and
  authorization state.
- Keep exact bytes, derivatives, locators, and interpretations distinguishable.
- Make every cross-layer transition explicit, reviewable, and default-deny.
- Support private-full research packets and smaller audience-specific
  projections from the same frozen semantic selection.
- Preserve compatibility with the current Knowledge Wiki and adjacent packet
  compiler while establishing a migration path.
- Evaluate retrieval relevance, source completeness, privacy loss, and human
  authority independently.
- Preserve attributed lenses, disagreements, and open operational questions
  without requiring a single consensus interpretation.
- Make knowledge handoffs and their temporal states inspectable, including what
  was available but not demonstrably considered before a decision.
- Compose permissioned scopes by their most restrictive effective boundary
  when knowledge from multiple universes enters one projection.

## Non-goals

- The evaluation prototype does not authorize adoption, canonical-record
  migration, source-adapter execution, or operational use of the architecture.
- It does not create a CMS, database, search service, archive browser, private
  document browser, authentication system, or AI chatbot.
- It does not move the full private archive, Apple Photos library, Gmail,
  Messages, Drive, or authenticated browser state into Git.
- It does not make the public portfolio depend on a private repository or live
  authenticated source.
- It does not approve any photograph, correspondence, transcript, name, quote,
  or protected locator for disclosure or publication.
- It does not replace RFC 0001, RFC 0002, RFC 0003, or RFC 0004. It proposes a
  sharper internal distinction compatible with their public/private,
  photographic, and federated-system boundaries.
- It does not prescribe a graph database, vector database, model provider, or
  hosted infrastructure.
- It does not treat graph traversal, automated scoring, or an LLM judgment as
  editorial selection or stage-advancement authority.
- It does not require every evidence item or source artifact to become an
  individual public Knowledge Wiki page.

## Terminology

**Semantic graph**
: The comparatively sparse graph of entities and interpretations used to make
  the work intelligible: people, projects, opportunities, capabilities,
  methods, events, decisions, claims, inquiries, and projections.

**Evidence graph**
: The graph of source records, atomic observations, assets, captures,
  derivatives, citations, support, contradiction, limitation, and provenance
  used to test semantic interpretations.

**Source-custody layer**
: The protected registry and source-specific workflows that know where
  authoritative bytes reside, whether access is current, what was queried or
  captured, and whether an exact copy, pointer, or protected absence is allowed.

**Projection**
: A recipient- and purpose-specific output selected from eligible semantic
  records and approved evidence. A portfolio page, résumé, editor packet, and
  LLM context packet are different projections.

**Atomic observation**
: A bounded statement of what one source directly shows, says, or records,
  separated from broader interpretation and publication wording.

**Evidence attachment**
: An evidence record selected after the semantic radius is frozen. Attachment
  does not increase semantic degree.

**Materialization**
: The controlled act of copying or rendering an authorized source artifact into
  a private run. A pointer or explicit not-recovered disposition is also a valid
  outcome.

**Transition**
: A governed movement from one layer to another, such as bounded capture from
  custody into evidence, reviewed interpretation from evidence into semantics,
  or editorial selection from semantics into a projection.

**Private-full packet**
: A packet compiled inside a named private recipient envelope with all permitted
  context and explicit protected dispositions. It is not a publication bundle.

**Lens**
: An attributed, situated way of observing or interpreting an event. A lens
records role, source, time, and scope; it does not claim that its holder knew all
other records or endorsed a later synthesis.

**Knowledge handoff**
: A typed transfer between scopes or roles whose state may be proposed,
communicated, received, incorporated, or acted on. These states are not
interchangeable.

**Operational question**
: A source-linked question about flow, timing, standing, responsibility, or a
missing decision basis. A counterfactual may remain useful as an operational
question without being promoted to a factual claim.

## Detailed design

### Architectural rule

The governing distinction is:

```text
source custody
  -- bounded capture and receipt -->
evidence graph
  -- atomic observation and interpretation review -->
semantic graph
  -- audience selection and human gates -->
projection
```

The reverse direction is used for retrieval:

```text
semantic seed
  -> bounded semantic radius
  -> evidence attachment proposal
  -> source-specific materialization request
  -> recipient-specific projection
```

No layer inherits the authority of the layer beneath it. Access does not prove
evidence; evidence does not prove interpretation; a mature interpretation does
not authorize publication.

### Layer 1: semantic graph

The semantic graph answers: **What does this mean?**

It contains human-legible concepts such as:

- a project and its bounded purpose;
- a capability demonstrated through identified work;
- an opportunity and its requirements;
- a person or organization with an explicit relationship;
- a method that recurs across projects;
- a decision and the operating condition it changed;
- a claim, anti-claim, correction, or open inquiry;
- an event, place, timeline, or portfolio projection.

Semantic edges should use verbs whose meaning can be reviewed. Examples include
`fits_requirement`, `demonstrated_by`, `participated_in`, `informed_by`,
`resulted_in`, `supersedes`, and `projected_to`. The current `related_to` edge
may remain during migration, but it should not be the preferred relation for new
records when a more exact verb is available.

The semantic graph must not store:

- credentials, cookies, tokens, or authentication caches;
- private filesystem paths or protected provider locators;
- raw correspondence or transcript bodies merely to make them searchable;
- source pixels that have not been approved for the graph's environment;
- a conclusion that evidence maturity equals publication eligibility.

Semantic degree counts only semantic-to-semantic traversal. An adjacent
evidence record may be proposed as an attachment, but it does not become an
intermediate bridge to another semantic node during the same radius pass.

### Layer 2: evidence graph

The evidence graph answers: **What supports, complicates, or contradicts this
interpretation?**

It contains:

- governed source records and atomic observations;
- photographs and photo-set indexes;
- transcripts and labeled transcript derivatives;
- web captures and deployment observations;
- PDFs and verified text extractions;
- direct-support, context, private-support, contradiction, and limitation
  relations;
- derivation, version, checksum, and completeness metadata;
- explicit unavailable, protected, duplicate, and not-recovered dispositions.

The evidence graph may be much larger than the semantic graph. A project may
have one semantic node, several evidence indexes, and thousands of source
artifacts. Evidence volume is preserved without granting every artifact equal
semantic weight.

Evidence records distinguish at least:

```text
source identity
capture or observation
derived transformation
evidence class
supports / complicates / contradicts
rights and consent state
public-safe disposition
```

Contradictory observations remain separate. Counts observed at different
cutoffs remain dated observations rather than values to average into a single
claim. A photograph establishes only visible evidence and reviewed metadata; it
does not establish invisible intent, consent, diagnosis, causation, or the
complete event.

### Layer 3: source custody

The source-custody layer answers: **Where are the authoritative bytes, and under
what authority may they be inspected or copied?**

It may identify, outside public Git:

- the source system and account boundary;
- an opaque source ID and protected locator;
- the exact Git commit, provider revision, or archive cutoff;
- the query, pagination state, result count, and retained count;
- a current authorization receipt;
- the acquisition tool or source-specific skill;
- the exact-copy, pointer, protected, or not-recovered disposition;
- the digest of an immutable captured object;
- errors, staleness, revocation, and retention rules.

The custody layer does not contain credentials. Credentials remain in the
operating-system keychain, authenticated application, or other responsible
secret store. A historical authorization receipt, visible application, or
filesystem accessibility is not current authorization.

Custody adapters remain source-specific. Local files, websites, Apple Photos,
Gmail, Drive, PDFs, Instagram exports, Messages, audio, and video have different
completeness and privacy contracts. Connector failure is not an empty result.

### Controlled transitions

Cross-layer transitions are default-deny.

| Transition | Required basis | Forbidden shortcut |
|---|---|---|
| Custody to evidence | Bounded request, current authorization, source cutoff, disposition, capture receipt | Broad copying because an account is accessible |
| Evidence to semantics | Atomic observation, evidence class, interpretation review, limitations | Treating a filename, proximity, or source body as a mature claim |
| Semantics to projection | Named recipient, public-safe wording, rights, consent, credit, editorial approval | Automatic publication when a claim becomes mature |
| Evidence to projection | Prior semantic selection plus recipient and human disclosure gates | Directly publishing an artifact because it supports a selected claim |

There is no custody-to-projection transition. Source artifacts must first
receive evidence identity and then be attached to a reviewed semantic selection.

### Heteroglossic team-knowledge practice

The graph should help a team coordinate without pretending the team must be of
one mind. Its unit of integrity is not a consensus paragraph; it is a
source-addressable ensemble whose component lenses remain recoverable.

A reusable diagnostic form is a **multi-lens knowledge timeline**:

| Time | Lens or role | Observation | Source | Handoff state | Decision relation | Operational question |
|---|---|---|---|---|---|---|
| bounded timestamp | attributed scope | what this source directly records | opaque evidence ID | proposed / communicated / received / incorporated / acted | considered / available-unconsidered / later / unknown | unresolved flow question |

The table is a debugging interface, not a device for deciding which person is
right. It should make visible:

- what each role could observe within its own scope;
- what was expected to travel to another role;
- whether receipt, incorporation, or action is actually evidenced;
- which source-backed observations were available before a decision;
- which observations were considered, unconsidered, later, or unknown;
- where standing, purpose, or responsibility changed; and
- which contradictions or counterfactuals must remain open questions.

Ensemble synthesis may compare and translate lenses, but it must not silently
merge them. It preserves source attribution and uncertainty, names any
translation step, and distinguishes an authored synthesis from the speech or
belief of a participant. A simulated expert or participant voice is a review
hypothesis, never that person's statement, approval, or proxy decision; the
actual person must confirm any position attributed to them.

This pattern reframes a common team failure. The problem is not always missing
information. It may be a broken handoff: a criterion, promise, qualification,
purpose, or boundary existed in one scope but did not travel durably into the
scope where a later decision was made. The correction is therefore not “share
everything.” It is to define the minimum necessary handoff, preserve its
source, and record its state.

### Participant correction without historical erasure

A participant may challenge an attributed observation, dispute a handoff
state, supply context, or restrict a proposed projection. The correction is a
new attributed record linked to the original; it does not replace the source
or make earlier recipients retroactively know the corrected account.

Every correction records its target, raising lens, status, requested effect,
and whether the original remains preserved. An unresolved request to restrict
projection holds the affected projection pending human review. Acceptance may
change a later projection while the source record and correction history stay
inspectable. Declining or disputing a correction also remains part of the
record; the graph does not convert review into consensus.

### Scoped universes and boundary composition

A team, project, care relationship, personal archive, job application, and
public portfolio are separate knowledge universes. Each may stand on its own
with its own membership, purpose, custody, language, retention, and authority.
They may compose for a named task, but composition does not dissolve their
boundaries.

For a projection built from scopes `S1 ... Sn`, the default permitted field set
is their intersection:

```text
effective fields = requested fields ∩ allowed(S1) ∩ ... ∩ allowed(Sn)
```

Any additional disclosure requires an explicit override from every authority
whose scope would otherwise withhold it. Missing or ambiguous permission fails
closed. The resulting projection records the contributing scope IDs, allowed
fields, blocked fields, recipient, purpose, and review owner. No scope inherits
another scope's broader audience merely because the records can be joined.

### Traversal and packet compilation

A graph-radius run proceeds in phases:

1. Freeze the recipient, question, semantic seed set, graph snapshot, semantic
   edge policy, maximum degree, and context limits.
2. Traverse only semantic nodes and permitted semantic edge types.
3. Record exact semantic paths from each seed and freeze the semantic radius.
4. Propose evidence attachments for the selected semantic nodes.
5. Apply evidence-class, sensitivity, duplication, and recipient budgets.
6. Route approved artifact requests through source-specific custody workflows.
7. Materialize exact copies, protected pointers, and explicit failure states.
8. Generate a private-full overview and any smaller recipient projection.

Packet structure may remain compatible with the adjacent graph-packet compiler:

```text
degree-NNN/
  semantic/
    nodes.jsonl
    edges.jsonl
    paths.jsonl
  evidence/
    observations.jsonl
    relations.jsonl
    attachments.jsonl
  artifacts/
    exact/
    pointers/
  ledgers/
    artifacts.jsonl
    custody-receipts.jsonl
  projections/
    private-full-overview.txt
    recipient-overview.txt
  manifest.json
  checksums.sha256
```

The physical directory names are not accepted by this RFC. The required design
property is that semantic radius, evidence attachment, custody materialization,
and recipient projection remain independently inspectable.

### Relation namespaces

Cross-layer relations should be narrower than within-layer editorial relations.

| From | To | Candidate relations |
|---|---|---|
| Semantic | Semantic | `fits_requirement`, `demonstrated_by`, `informed_by`, `participated_in`, `projected_to` |
| Semantic | Evidence | `supported_by`, `documented_by`, `complicated_by`, `contradicted_by` |
| Evidence | Evidence | `derived_from`, `contains_evidence`, `supersedes_capture`, `duplicates` |
| Evidence | Custody | `captured_from`, `held_by`, `not_recovered_from` |

Direction must be preserved even when an operator requests undirected discovery.
The packet records both the stored edge direction and the traversal direction.

### Packet families and high-degree evidence hubs

Every multi-seed run should produce two inspectable packet families:

1. one cumulative degree sequence for each seed independently; and
2. one cumulative degree sequence for the union of the frozen seeds.

The per-seed sequences reveal whether an opportunity or portfolio surface has a
meaningful evidence neighborhood of its own. The union sequence reveals shared
methods, projects, and capabilities. A strongly connected seed must not conceal
another seed whose source has been captured but whose semantic links remain
thin. Every union report therefore includes per-seed coverage and contribution
counts.

Evidence hubs expand lazily. Reaching a project or evidence index may register
the existence, class, and population of its attached artifacts, but exact
artifact expansion requires an explicit recipient-specific budget. In the
absence of that budget, the packet records a deferred hub with its candidate
count and reason. It must not silently take the first items, sample without a
declared method, or treat the whole population as one additional semantic hop.

### Projection model

A projection is an output with a named audience, purpose, disclosure boundary,
and selection owner. Examples include:

- the public portfolio;
- a tailored résumé or application packet;
- a private photo-editor context packet;
- a research dossier;
- an LLM context packet;
- a public-safe Sourcebook or Knowledge Wiki view.

Private-full compilation and audience projection are separate artifacts. A
projection may omit a defensible claim because it is irrelevant, unresolved for
that audience, too sensitive, or compositionally burdensome. Omission does not
delete the underlying semantic or evidence record.

### Machine-readable proposal contract

The companion
[`0005-three-layer-knowledge-graph.contract.json`](./0005-three-layer-knowledge-graph.contract.json)
expresses the proposed layers, traversal domain, transition requirements, and
human authority boundary. It is an executable design appendix, not a runtime
schema and not implementation authorization.

The evaluation prototype uses
`config/knowledge-wiki/graph-layers.json` to classify current record kinds and
mixed photo-set indexes. Its runtime is
`scripts/knowledge-wiki/layers.mjs`; the read-only CLI is
`scripts/knowledge-wiki/layered-graph.mjs`. These paths are implementation
evidence for review, not a stage change or source-access capability.

The synthetic evaluation suite at
`evals/knowledge-bank/graph-layers-rfc-evals.json` exercises boundary behavior:
semantic traversal stops before an evidence hub, stale access cannot become a
capture, evidence cannot become semantics without an observation, source
custody cannot project directly, publication remains human-gated, plural lenses
survive a knowledge-flow audit, handoff states remain distinct, and composed
scopes retain only mutually permitted fields. The
evaluator at `scripts/rfcs/three-layer-knowledge-graph-eval.mjs` reports hard
failures separately from weighted design criteria.

The suite also verifies that participant corrections append to history, that
unresolved restriction requests hold a projection, and that destructive
replacement fails closed. This RFC is the generic architecture dependency for
the protected opportunity classification under review in PR #272. That
relationship does not authorize this branch to import protected sources,
identify a prospective client, or convert a private opportunity into a public
claim.

## Security and privacy

The primary threats are:

- a protected locator entering a public graph, overview, log, or Git history;
- a semantic query triggering broad authenticated-source copying;
- an evidence index revealing the existence or shape of protected records;
- a source body becoming public because its derived claim is public-safe;
- credentials or browser state entering a packet;
- a recipient receiving the private-full packet when only a minimum-necessary
  projection was approved;
- a high score masking failure of rights, consent, identity, or publication
  authority;
- an ensemble summary presenting a simulated or synthesized voice as a real
  participant's statement;
- a timeline converting chronology into causality or an unanswered
  counterfactual into fact; and
- one contributing scope's broad permission overriding another scope's narrower
  trust boundary; and
- a correction workflow deleting the original, inventing participant agreement,
  or continuing a projection while a restriction request is unresolved.

The design fails closed:

- custody instances remain outside public Git;
- semantic and evidence records use opaque source IDs where protected custody
  exists;
- acquisition paths are excluded from materialized node context;
- source adapters require current authorization and bounded queries;
- incomplete pagination and connector errors remain explicit failures;
- exact copies are content-addressed and derivatives identify their source;
- public builds do not require private repositories, local paths, providers, or
  authentication;
- repository history is treated as a disclosure surface;
- hard privacy and authority gates cannot be averaged away by rubric scores.

Private examples, correspondence, transcript text, source paths, original
pixels, contact information, and authenticated locators must not appear in this
public RFC, its machine contract, eval fixtures, reports, or pull request.

## Publication workflow

This RFC changes no public route or portfolio copy.

If an implementation is later accepted, public projection would still follow
the existing governed lifecycle:

```text
bounded capture
  -> source record
  -> atomic observation
  -> claim and anti-claim
  -> inquiry or correction
  -> publication decision
  -> audience-specific projection
```

Automation may validate structure, traceability, redaction, and candidate
binding. Jamie retains final authority over claim wording, first-person voice,
rights, consent, credit, editorial selection, portfolio composition,
deployment, and production indexing. Collaborator or rights-holder review
remains independent where applicable.

## Rollout plan

No rollout begins while this RFC remains `exploring`.

If Jamie later advances it, a bounded sequence could be:

1. **Contract review.** Review terminology, layer ownership, transition rules,
   threat model, and relation vocabulary without changing production records.
2. **Synthetic prototype.** Exercise the machine-readable contract only against
   synthetic graphs and protected-absence fixtures.
3. **Read-only compatibility report.** Classify current graph node and edge
   types into proposed layers without rewriting canonical records.
4. **Private packet canary.** Re-run one authorized packet with both current and
   proposed traversal, comparing relevance, coverage, privacy, and context size.
5. **Migration proposal.** Produce an exact mapping, compatibility plan,
   rollback strategy, and repository impact report for separate authorization.
6. **Implementation pull requests.** Link the accepted RFC, identify deviations,
   and keep public-site changes separate from private tooling changes.
7. **Observation period.** Measure retrieval quality and operator burden before
   recommending the architecture as a default.

Rollback means retaining the frozen source graph and current packet compiler,
removing no canonical records, and treating proposed classifications as derived
views until an accepted migration proves reversible.

## Decision gates

Jamie must explicitly decide:

- whether the three-layer distinction is the preferred conceptual model;
- whether semantic degree should categorically exclude evidence traversal;
- whether the current `related_to` relation needs weighting, deprecation, or
  replacement;
- where private semantic and evidence instances may live;
- whether a shared schema belongs in this repository, another repository, or a
  neutral package;
- which source-custody registry fields may exist outside Git;
- whether the adjacent packet compiler should adopt the contract;
- what evidence is required before an RFC stage advances to `accepted`;
- which person or team may champion implementation;
- whether any resulting public projection is appropriate.

Before acceptance, review must include knowledge architecture, privacy,
research operations, editorial practice, developer experience, and the impact
on the existing RFC family. A deterministic pass or merged pull request cannot
advance these human gates.

## Drawbacks

- Three layers introduce more records, joins, schemas, and operator concepts.
- Existing nodes may have mixed responsibilities that are expensive to classify.
- Some source systems cannot provide stable identifiers or complete exports.
- Strict semantic traversal can initially reduce recall if evidence is the only
  bridge between two meaningful concepts.
- Source-specific adapters increase operational and maintenance burden.
- Separating private-full packets from projections adds storage and review work.
- Evidence attachments can still become large without explicit budgets.
- A machine-readable proposal contract may create false confidence if treated
  as production code or an accepted standard.
- Public and private environments may drift unless snapshot and schema versions
  remain explicit.

## Alternatives

### Keep one graph and tune edge weights

The current graph could remain unified while `related_to`, evidence, and asset
edges receive different weights. This is simpler, but it does not adequately
separate locator privacy, source authorization, and publication authority.

### Keep one graph and cap high-degree nodes

A traversal could stop at hubs or sample their neighbors. This controls size
but makes the result dependent on arbitrary thresholds and does not clarify what
kind of object each node represents.

### Separate only public and private graphs

RFC 0001 already proposes a public/private distinction. That boundary remains
necessary, but public/private classification alone does not distinguish meaning
from evidence or custody. Each environment may still need all three
responsibilities.

### Use search or embeddings instead of graph radius

Semantic search could rank relevant artifacts directly. It may improve recall,
but it is harder to audit, does not replace typed provenance, and still needs
custody and publication boundaries.

### Copy everything into a private context store

A private store could simplify retrieval. It would multiply sensitive copies,
weaken source authority, complicate deletion and revocation, and make access
look like permission to aggregate.

### Do nothing

The current graph and packet compiler can continue to operate. The observed
degree-three expansion and acquisition-path regression indicate that growth
would increase relevance and disclosure risks, so doing nothing should remain
an explicit decision rather than an accidental default.

## Unresolved questions

- Should `related_to` remain a semantic edge, carry a higher traversal cost, or
  become non-traversable by default?
- Which current node types contain mixed semantic and evidence responsibilities?
- Can one stable public entity ID safely span public and private environments,
  or should private records project to separate public IDs?
- What is the minimum viable custody receipt for local files, Git, websites,
  authenticated providers, and Apple Photos?
- Should evidence attachment budgets be per semantic node, per evidence class,
  per source system, or per recipient?
- How should a query request breadth when evidence itself is the research
  subject rather than an attachment to semantic meaning?
- Which contradictory observations may be public-safe even when their original
  source remains protected?
- How should revocation or source disappearance propagate without exposing a
  protected record's prior existence?
- Should the proposal contract become part of a future shared package, remain
  an RFC appendix, or be replaced by implementation schemas after acceptance?
- What human review protocol is proportionate for private LLM context packets
  that will never be published but may contain sensitive source material?
- Which handoff states need independent evidence receipts in a production
  implementation, and which can be derived safely from source events?
- How should the graph represent a lens that changes over time without
  overwriting its earlier situated observation?
- When does an unresolved operational question belong in a recipient projection
  rather than only in the private research record?
- Which roles may acknowledge, accept, decline, or resolve a participant
  correction in each scoped universe?
