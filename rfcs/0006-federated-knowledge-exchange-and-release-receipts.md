---
rfc: 6
title: Federated Knowledge Exchange and Candidate-Bound Release Receipts
stage: proposed
start_date: 2026-08-13
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
  - deployment
implementation: null
supersedes: []
superseded_by: null
---

# Federated Knowledge Exchange and Candidate-Bound Release Receipts

> **Proposal boundary**
>
> This RFC is `proposed`. It records a cross-repository protocol for review; it
> does not authorize synchronization, source access, record import, schema
> migration, public projection, deployment, or indexing. Jamie Burkart remains
> the decision owner. The `feature/launch-2026-08-13-02-B` branch is a leading-edge
> review candidate by project convention, not an accepted architecture or a
> release authorization.

## Summary

Define a public-safe exchange envelope for the federated Knowledge Wiki and
graph ecosystem. Each repository or system keeps authority over its own work:
source custody keeps authoritative bytes and access state; governed research
keeps request scope and transformations; canonical editions keep source records;
the public record and semantic-evidence graph keep public-safe relationships and
interpretations; a deterministic packet compiler keeps bounded transport
receipts; and project sites or the portfolio keep audience-specific composition.
Crossing a repository boundary transfers a versioned proposal or reference, not
the originating system's authority. Any release receipt binds to one exact
candidate and records separate human decisions for public safety, rights,
consent, collective credit, editorial selection, voice, and publication. A
packet, green check, merged branch, or mature claim can never issue those
decisions.

This protocol extends the federated topology in
[RFC 0004](./0004-jamie-burkart-sourcebook-and-knowledge-ecosystem.md)
and the semantic, evidence, custody, and projection distinctions in
[RFC 0005](./0005-three-layer-knowledge-graph.md). It does not advance either
RFC's stage. A companion machine-readable contract and synthetic evaluator make
the proposed authority boundary inspectable without reading an adjacent
repository, materializing a source, or changing a public surface.

## Motivation

The ecosystem has recently become more differentiated. Adjacent implementations
now demonstrate several useful responsibilities:

- Markdown-first research packages keep requests, exact artifacts,
  transformations, interpretation, gaps, and delivery state separate.
- Canonical subject editions keep public-safe records, provenance, stable IDs,
  corrections, and source bodies where use is authorized.
- A subject-centered public record can cite pinned canonical editions without
  inheriting their entire corpus or selecting them for a portfolio.
- A deterministic graph-packet compiler can produce degree-bounded frontiers,
  typed traversal paths, artifact dispositions, input fingerprints, token and
  byte budgets, checksums, and reproducible overviews.
- Project-site composition can use original artifacts and source-backed voice
  while explicitly distinguishing historic activity, current activity, and a
  proposed relaunch.
- Portfolio candidates can bind deterministic and human-review receipts to one
  exact commit while retaining hard gates that a composite score cannot average
  away.

These developments confirm the direction of RFCs 0004 and 0005, but expose a
remaining gap. The ecosystem knows what each layer means and broadly which
system owns which responsibility; it does not yet define one small,
machine-inspectable contract for what crosses between them.

Without that contract, several failure modes remain plausible:

1. A context packet can be mistaken for a canonical store because it contains
   complete, well-formed files.
2. A public-safe source record can be mistaken for a selected public
   composition because it exists in a public repository.
3. A pinned reference can lose its source cutoff, transformation history, or
   correction state when it crosses into another graph.
4. A release check can remain green after the candidate, generated graph, copy,
   or assets change.
5. A project described in the historic tense can drift into an unsupported
   claim of current service or relaunch.
6. Source-backed perspectives can be flattened into one institutional voice or
   a simulated voice can be presented as a real person's statement.
7. An unresolved correction or request to restrict projection can fail to hold
   downstream compositions.
8. A broader repository's permissions can silently override a narrower source
   or participant boundary.

The expected outcome is modest: repositories remain independently useful, but
their exchanges become explicit enough to review, reproduce, revoke, and refuse.

## Goals

- Give every participating repository role a bounded canonical authority.
- Define a minimal exchange envelope for references, proposals, packets,
  corrections, and candidate-bound receipts.
- Preserve source cutoff, input snapshots, record IDs, transformations,
  coverage, limitations, and content fingerprints across repository boundaries.
- Keep transport completeness separate from source, interpretive, editorial,
  and publication authority.
- Make stale candidate receipts fail after any candidate-affecting change.
- Make public composition declare whether its posture is `historic`, `current`,
  or `relaunch-proposed`.
- Preserve attributed, potentially conflicting lenses and source-backed voice
  without forcing consensus.
- Propagate correction and projection-restriction notices without deleting the
  original record or exposing protected mappings.
- Compose multiple scopes by the most restrictive applicable boundary.
- Keep every public build independent of private repositories, authenticated
  providers, local paths, and protected graph structure.
- Supply synthetic tests that demonstrate the authority boundary without
  treating those tests as acceptance or release approval.

## Non-goals

- This RFC does not accept or operationalize RFC 0005.
- It does not create a shared package, service, registry, event bus, database,
  CMS, search engine, archive browser, authenticated API, or automatic sync.
- It does not require repositories to share one schema internally.
- It does not move source bodies, credentials, private locators, protected
  identifiers, or private graph topology into this repository.
- It does not identify, inventory, or expose private repositories in a public
  exchange envelope.
- It does not approve a claim, quotation, name, photograph, attribution,
  relationship description, or source body for public use.
- It does not make a context packet, source edition, public-record entry, or
  Knowledge Wiki record a portfolio page by default.
- It does not add or change a route in `apps/www`.
- It does not merge sibling launch candidates or reuse their candidate-bound
  receipts.
- It does not deploy to staging or production, change robots policy, or approve
  production indexing.

## Terminology

**Repository role**
: A bounded responsibility that may be implemented by a repository, a governed
  local system, or a directory within one repository. A role is not necessarily
  a one-to-one repository name.

**Exchange envelope**
: A versioned, minimum-necessary manifest that carries public-safe references,
  lineage, scope, limitations, intended purpose, and disposition between roles.
  It is not a source archive or an authorization token.

**Canonical subject edition**
: A source-aware edition authoritative for a bounded subject corpus, its stable
  public identities, provenance, source bodies where allowed, and corrections.

**Public record**
: A subject-centered, public-safe record that references canonical editions and
  joins their public facts without becoming the canonical body for every source.

**Semantic-evidence graph**
: The governed interpretation environment defined by RFC 0005: claims,
  anti-claims, entities, agency, evidence relations, inquiries, corrections, and
  projection eligibility.

**Context packet**
: A deterministic, bounded transport artifact compiled from a frozen graph
  snapshot and traversal policy. It may be complete for its declared request but
  is never a canonical source or release authority.

**Public composition**
: An audience- and purpose-specific arrangement of eligible material for a
  project site, portfolio, case study, or another public surface.

**Temporal posture**
: A required declaration that a composition describes historic activity,
  current activity, or a proposed relaunch. It constrains tense, availability,
  invitation language, and update obligations.

**Candidate binding**
: The exact commit, content fingerprint, input snapshot digests, and generated
  output digests to which a receipt applies.

**Release receipt**
: A record that deterministic checks and named human decisions refer to the same
  exact candidate. It records authority exercised elsewhere; it does not create
  that authority.

**Correction notice**
: An append-only envelope recording a challenge, qualification, withdrawal, or
  restriction request and the dependent records that require review.

## Detailed design

### Relationship to the existing RFCs

RFC 0004 assigns distinct authorities to source custody, confidential research,
public source editions, the Knowledge Wiki, and the portfolio. RFC 0005 assigns
distinct responsibilities to semantic meaning, evidence, source custody, and
projection. Those axes are compatible but not identical:

- a repository may contain both semantic and evidence records;
- a source edition may be public while still withholding a body or identity;
- a packet may transport several layers without becoming authoritative for any
  of them; and
- a public composition may cite multiple editions while remaining a separate
  editorial decision.

RFC 0006 therefore governs the seams. It neither collapses layer into repository
nor imposes one internal representation across the ecosystem.

### Authority map

```text
source custody
  -> governed research
  -> canonical subject edition
  -> public record and semantic-evidence graph
        |                         |
        v                         v
  deterministic packet      projection proposal
        compiler                  |
        |                         v
        +-- transport only --> public composition
                                  |
                         candidate-bound receipt
                                  |
                                  v
                       human-controlled release
```

The arrows mean “may propose a bounded exchange,” not “inherits authority.”
Correction notices may travel to any dependent role. No arrow bypasses the
human decisions appropriate to its destination.

| Role | Canonical authority | Explicitly not authoritative for |
|---|---|---|
| Source custody | Exact bytes, source location, access state, capture receipt | Public wording, consent, or selection |
| Governed research | Request, coverage, transformation, analysis, gaps, deliverable | Public permission or canonical public identity |
| Canonical subject edition | Public-safe source record, public identity, provenance, correction, authorized body | Portfolio selection or private-source completeness |
| Public record | Subject-centered public facts and pinned edition references | Every underlying source body or editorial selection |
| Semantic-evidence graph | Meaning, evidence relation, agency, anti-claim, inquiry, projection eligibility | Source custody or publication approval |
| Packet compiler | Frozen traversal, bounded files, dispositions, checksums, reproducibility | Canonical knowledge, adequacy, consent, or release |
| Public composition | Arrangement, temporal posture, source-backed voice, invitation | Archival completeness or source authority |
| Portfolio projection | Hiring-facing selection and composition | Complete public record or private research view |

### Exchange envelope

Every exchange begins with a manifest shaped like this conceptual example:

```json
{
  "envelope_id": "exchange.public-safe-example.v1",
  "contract_version": 1,
  "kind": "projection-proposal",
  "origin": {
    "repository_role": "semantic-evidence-graph",
    "snapshot_commit": "full-commit-id",
    "record_ids": ["public.record.id"],
    "content_fingerprint": "sha256-digest"
  },
  "target": {
    "repository_role": "public-composition",
    "surface_id": "bounded-public-surface"
  },
  "purpose": "Explain a historic project to a defined public reader.",
  "lineage": {
    "source_cutoff": "ISO-8601 timestamp or dated snapshot",
    "input_snapshots": ["public-snapshot-digest"],
    "transformation_receipts": ["public-transformation-id"],
    "coverage": "bounded population statement",
    "limitations": ["what this proposal does not establish"]
  },
  "temporal_posture": "historic",
  "disposition": "held-for-human-review"
}
```

The example is deliberately reference-only. Bodies may travel only when the
source edition has authority to reproduce them and the destination has a
minimum-necessary need. Protected public-to-private mappings stay on the
protected side. Public envelopes never contain private paths, protected
locators, credentials, private identifiers, private graph counts, tombstones,
or raw private source bodies.

The origin records the exact snapshot it is authoritative for. The target
accepts, rejects, holds, or supersedes the proposal under its own rules. Import
does not silently mutate either side's canonical record.

### Exchange kinds

The first protocol version distinguishes seven kinds:

| Kind | Purpose | Authority boundary |
|---|---|---|
| `capture-receipt` | Record a bounded, authorized source encounter | Does not establish evidence, interpretation, or publication permission |
| `publication-proposal` | Propose a new public-safe identity and record from governed research | Public destination performs independent rights, consent, identity, and context review |
| `canonical-record-reference` | Cite a stable record at a pinned edition snapshot | Does not copy canonical authority or select the record for a surface |
| `context-packet` | Transport a bounded graph neighborhood and governed artifacts | Cannot act as a canonical store or release receipt |
| `correction-notice` | Notify dependent roles of qualification, withdrawal, or restriction | Preserves the original and triggers destination review |
| `projection-proposal` | Propose records, wording, voice, and composition for an audience | Remains held until destination-specific human gates are recorded |
| `release-receipt` | Bind checks and decisions to one candidate | Records human authority; automation has none |

Only a projection proposal or release receipt enters release-eligibility review.
Every other exchange kind is transport-only even when it is public-safe,
complete, and checksum-valid.

### Minimum-necessary boundary composition

When an envelope draws from scopes `S1 ... Sn`, its allowed fields are:

```text
effective fields = requested fields ∩ allowed(S1) ∩ ... ∩ allowed(Sn)
```

The same rule applies to intended audience, retention, quotation, asset use, and
redistribution. An explicit override requires approval from every authority whose
scope would otherwise withhold the field. A missing or ambiguous decision fails
closed.

An envelope records public coverage and limitations without exposing a protected
population's size or shape. “No public record supplied” is not evidence that no
private record exists.

### Context packets are transport, not truth

A context packet should retain the strongest useful properties demonstrated by
the adjacent compiler practice:

- frozen graph snapshot and seed set;
- explicit typed traversal allow and deny rules;
- per-seed and union frontiers;
- cumulative degree directories;
- exact semantic paths and deferred evidence hubs;
- artifact budget, byte budget, and token estimate;
- exact, pointer, protected, unavailable, and not-recovered dispositions;
- input fingerprint, file checksums, and a human-readable overview; and
- idempotent regeneration from unchanged inputs.

These properties make a packet inspectable and reproducible. They do not make it
the canonical location of a source, establish that the selected context is
editorially adequate, or allow it to release a projection. A packet consumer
must cite the originating canonical IDs and snapshots rather than minting claims
from filenames or packet proximity.

### Canonical editions and public records

A canonical edition owns the stable public identity and body, when a body is
allowed. The public record owns a subject-centered join across editions. The
semantic-evidence graph owns interpretation and projection eligibility. These
records link by public IDs and pinned commits; they do not duplicate bodies by
default.

An exchange from an edition includes:

- the stable public record ID;
- canonical repository-relative path where public;
- edition snapshot commit;
- body digest or record digest;
- source cutoff and completeness statement;
- correction or supersession state;
- rights and consent state appropriate to the exchanged fields; and
- an explicit statement of what the record does not establish.

If the edition changes, the consumer may retain the earlier pinned reference as
historical provenance, but it must process any correction or restriction notice
before continuing a dependent projection.

### Heteroglossia and source-backed voice

Cross-repository synthesis uses an ensemble model. An envelope may carry several
attributed lenses, qualifications, contradictions, or unknowns. It must not
convert them into one institutional voice merely because a public composition
needs concise prose.

A source-backed voice review records:

- which public-safe source records informed the writing;
- which linguistic features or recurring concerns were observed;
- which wording is newly authored synthesis;
- where perspectives differ or remain unresolved;
- whether a first-person or participant-specific phrase has human confirmation;
  and
- which invitation or call to action is supportable at the declared temporal
  posture.

A fictionalized expert voice, including the role play used to critique this
proposal, remains a review hypothesis. It is never a quotation, endorsement,
participant statement, or proxy decision.

### Temporal posture and project composition

Every public-composition envelope declares one temporal posture:

- `historic`: the project or practice is described as a past record; invitations
  do not imply a currently operating service;
- `current`: a dated source establishes current operation, ownership,
  availability, and contact path; or
- `relaunch-proposed`: future-facing language is explicitly a proposal and does
  not claim that a relaunch has occurred.

This field constrains titles, verbs, calls to action, contact language, event
status, and update cadence. A composition without a recognized posture remains
held. Changing posture invalidates its release receipt.

### Candidate-bound release receipts

A release receipt refers to one unchanged candidate:

```text
candidate commit
+ candidate content fingerprint
+ input snapshot digests
+ generated output digests
+ deterministic check results
+ human decision records
= candidate-bound receipt
```

The minimum human gates are:

1. public safety;
2. rights;
3. consent;
4. collective credit and agency;
5. editorial selection and composition;
6. voice and attribution; and
7. publication.

Each gate records state, authority, decision owner, and decision time. A gate may
be explicitly not applicable only where the review protocol permits it; public
safety, editorial selection, and publication require affirmative approval.
Tests may validate the presence and candidate binding of a human decision record.
They cannot determine that the person had authority, made a sound judgment, or
actually granted approval.

Any change to source, copy, structured records, assets, generated outputs,
dependency behavior, or candidate fingerprint makes earlier receipts stale.
Receipts from sibling launch candidates are historical comparison evidence and
cannot certify this branch. Deployment and production indexing remain later,
separate decisions even after publication approval.

The synthetic evaluator's strongest positive result is therefore
`eligible-for-human-controlled-action` with `automation_authority: none`. It
never returns `published`, `approved`, `deployed`, or `indexable`.

### Correction and withdrawal propagation

Corrections append to history. They identify the affected public IDs, the
raising authority or lens, status, requested effect, and dependent envelopes.
The original remains preserved unless a separate lawful retention rule requires
otherwise; that storage question is not decided by this RFC.

An unresolved correction with effect `restrict-projection` holds every affected
projection. Acceptance may narrow or withdraw a later composition while keeping
the historical provenance legible. Rejection or dispute remains attributed and
does not become invented consensus.

Public correction notices use public IDs only. If the correction concerns a
protected identity or relationship, the protected system emits a new public-safe
notice without revealing the mapping.

### Machine-readable proposal contract

The companion
[`0006-federated-knowledge-exchange-and-release-receipts.contract.json`](./0006-federated-knowledge-exchange-and-release-receipts.contract.json)
records repository roles, exchange kinds, transitions, candidate binding,
temporal postures, human gates, correction behavior, and authority invariants.

The synthetic evaluator and tests live at:

- `scripts/rfcs/federated-knowledge-exchange-eval.mjs`
- `scripts/rfcs/federated-knowledge-exchange-eval.test.mjs`

They exercise only synthetic envelopes. They read no adjacent repository,
source material, authenticated provider, private graph, or deployment state.
Their presence is implementation evidence about the proposal, not authorization
to adopt it.

## Security and privacy

The protocol treats repository history, pull requests, logs, generated reports,
and packets as disclosure surfaces. Principal threats include:

- exposing a private repository or protected source through a locator, backlink,
  record count, checksum, tombstone, or identifier;
- using a context packet as a durable shadow archive after access or consent is
  withdrawn;
- copying source bodies when a reference would satisfy the target purpose;
- revealing the existence or shape of protected relationships through public
  graph structure;
- carrying credentials, browser state, signed URLs, or machine-local paths in an
  envelope;
- treating a public-safe summary as consent to name, quote, reproduce, or
  publish;
- flattening several participants into a synthesized endorsement;
- reusing stale checks after copy, assets, generated records, or dependencies
  change; and
- letting broad destination permissions override a narrow source boundary.

The design fails closed:

- public envelopes use new public IDs and public-safe references;
- protected mappings remain only in the protected authority;
- source bodies are omitted by default;
- all exchange kinds declare purpose, recipient role, coverage, limitations, and
  disposition;
- composed scopes use their permission intersection;
- transport artifacts have no release authority;
- unresolved restriction requests hold projection;
- stale candidate receipts fail;
- public builds require no private dependency; and
- automation records `automation_authority: none`.

This RFC and its fixtures must remain safe to quote in a public newspaper. Real
private examples, locators, identifiers, source bodies, graph counts, and access
receipts do not belong here.

## Publication workflow

This RFC changes no public copy or route. If later accepted, a source-backed
portfolio path would remain:

```text
bounded source encounter
  -> governed research record
  -> reviewed publication proposal with new public identity
  -> canonical edition decision
  -> pinned public-record or semantic-graph reference
  -> claim, anti-claim, agency, and projection review
  -> candidate-bound projection proposal
  -> exact-candidate checks
  -> separate recorded human gates
  -> human-controlled release action
  -> separate deployment and indexing decisions
```

A project-site composition may begin with already-public canonical records and
original artifacts, but follows the same projection and human-gate tail. No
source repository, research packet, public record, graph packet, or release
evaluator may push directly to a public surface.

Jamie retains authority over RFC stage, public wording, first-person voice,
rights, consent, collective credit, editorial selection, publication,
deployment, and production indexing. Collaborators, participants, and rights
holders retain their applicable independent authority.

## Rollout plan

No operational rollout begins while this RFC remains `proposed`.

1. **Proposal review.** Review role boundaries, exchange kinds, forbidden
   fields, correction behavior, temporal posture, and the meaning of a release
   receipt.
2. **Synthetic pressure test.** Expand the current evaluator with adversarial
   synthetic envelopes only after each behavior has a failing test.
3. **Read-only compatibility map.** Compare the proposed roles and envelope
   fields with existing public-safe exports without changing canonical records.
4. **One public-safe reference canary.** If separately authorized, move one
   already-public record reference between two roles and verify source cutoff,
   digest, limitation, and correction handling.
5. **Correction drill.** Issue a synthetic restriction notice and confirm that
   every derived projection becomes held without deleting provenance.
6. **Composition canary.** On an exact staging candidate, compare historic,
   current, and proposed-relaunch language; retain no change without current
   source and human review.
7. **Implementation proposal.** Name package location, ownership, migrations,
   compatibility, rollback, and per-repository adoption PRs for separate human
   authorization.
8. **Observation period.** Measure stale-receipt detection, correction latency,
   operator burden, packet usefulness, and publication errors before considering
   a default.

Rollback preserves every canonical source record and prior pinned reference,
removes no history, stops envelope generation, and treats any generated packets
or receipts as non-authoritative derived artifacts.

## Decision gates

Before this RFC may advance beyond `proposed`, Jamie must decide:

- whether repository roles are the right unit of federation;
- whether the exchange kinds are minimal and sufficient;
- whether canonical editions and the public record need distinct formal roles;
- whether a shared envelope belongs in this repository or a neutral package;
- which public identifiers may safely span repositories;
- which rights and consent states may be exchanged publicly;
- whether temporal posture is required for every public composition;
- whether the candidate fingerprint is defined consistently across repositories;
- which correction statuses hold downstream projections;
- which human gates allow `not-applicable` and what evidence supports that state;
- who may record each human gate; and
- whether any canary may access or modify an adjacent repository.

Before implementation, review must include knowledge architecture, privacy,
research operations, editorial practice, public portfolio, developer experience,
and deployment. A green evaluator, merged proposal, branch label, or pull request
cannot advance the stage.

Before any public release, the exact candidate must have fresh deterministic
receipts and separately recorded public-safety, rights, consent, credit,
editorial, voice, and publication decisions. Staging deployment and production
indexing require their own later decisions.

## Drawbacks

- A protocol adds manifests, joins, terminology, and review work to small
  exchanges.
- Stable IDs and fingerprints can drift unless every role implements them
  consistently.
- A shared envelope may tempt teams to standardize internal schemas prematurely.
- Separating canonical edition, public record, semantic graph, and composition
  can create duplicate metadata and unclear correction ownership.
- Human gate records can become bureaucratic theater if authority, scope, and
  exact candidate are not actually reviewed.
- Strict candidate invalidation increases the cost of late copy or asset changes.
- Temporal posture can oversimplify projects that are dormant, intermittent,
  stewarded by others, or active only in part.
- Minimum-necessary exchange can initially reduce recall and require follow-up
  requests.
- Synthetic tests can create false confidence about social, editorial, rights,
  and consent judgments they cannot perform.

## Alternatives

### Extend RFC 0005 only

RFC 0005 could add more packet and transition fields. That would keep fewer
documents, but it would conflate graph layers with repository roles and make a
single exploring RFC carry packet, federation, composition, and release policy.

### Put all knowledge in one repository

One canonical monorepo would simplify joins and versioning. It would also widen
the disclosure surface, blur custody and editorial authority, and make public
builds more likely to depend on private material.

### Use a shared database or event bus

A service could coordinate schemas, updates, and corrections in real time. It
would add infrastructure, authentication, retention, migration, availability,
and incident-response burdens beyond V1 and could turn private access into a
hidden public dependency.

### Treat Git commits as the complete protocol

Pinned commits are essential but do not express purpose, coverage, limitations,
rights, consent, correction state, temporal posture, human gates, or the
distinction between transport and canonical authority.

### Treat graph packets as canonical exports

Packets already contain paths, manifests, artifacts, and checksums. Making them
canonical would multiply source copies, weaken correction and revocation, and
confuse retrieval adequacy with publication readiness.

### Rely on pull-request check status

CI is useful for deterministic invariants. It cannot establish consent, rights,
collective credit, source-backed voice, editorial selection, human authority,
deployment approval, or production indexing.

### Do nothing

Repositories can continue exchanging ad hoc references. Recent differentiation
makes that increasingly risky: more capable packets and richer public editions
increase both the value and the chance of accidental authority transfer.

## Unresolved questions

- Should the envelope be JSON, JSON Lines, Markdown front matter, or a small set
  of interoperable serializations?
- Does the ecosystem need one namespace authority, or can repository-scoped IDs
  remain sufficient with explicit aliases?
- Which role is responsible for detecting that a pinned source edition has a
  newer correction or withdrawal?
- How should a public correction notice preserve accountability without exposing
  a protected participant or relationship?
- Should the public record and semantic-evidence graph remain separate roles if
  one repository currently implements both?
- How should partial, intermittent, or community-stewarded activity map to the
  three initial temporal postures?
- What exactly enters a content fingerprint, and how are nondeterministic build
  outputs excluded or normalized?
- Can candidate receipts be composed safely across repositories, or must every
  destination always regenerate a local receipt?
- Which fields are safe in a public coverage statement when even a count or gap
  could disclose a protected corpus?
- What is the minimum correction propagation latency for a live public surface?
- How should downstream systems behave when an upstream canonical edition
  disappears, becomes private, or can no longer be refreshed?
- Which human decisions can be recorded by role identifiers without exposing
  private staff or participant identities?
- What evidence would justify moving this RFC from `proposed` to `exploring`?
