---
rfc: 6
title: Governed Knowledge Graph Federation and Convergence Receipts
stage: exploring
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
implementation: null
supersedes: []
superseded_by: null
---

# Governed Knowledge Graph Federation and Convergence Receipts

> **Proposal boundary**
>
> This RFC is an `exploring` design record. Its read-only evaluator is
> implementation evidence, not implementation authorization. Merging it does
> not authorize a cross-repository import, repository visibility change,
> correction decision, public projection, launch-design selection, deployment,
> or indexing. Jamie Burkart remains the decision owner for every stage change.

## Summary

Define a small federation receipt for composing Knowledge Wiki records across
repositories without collapsing their authorities. A receipt binds each graph
instance to an exact revision and manifest digest; records declared and observed
visibility separately; requires every instance to remain independently usable;
joins stable identities without merging claims; assigns canonical authority by
facet; makes reciprocal references explicitly non-authoritative; carries open
corrections into dependent projection decisions; and keeps public projection
behind source release state plus rights, consent, credit, editorial, and
public-wording gates. A read-only prototype exercises these rules against
synthetic scenarios. It reads no sibling repository, executes no adapter, and
creates no public route.

## Motivation

The Knowledge Wiki is no longer one graph in one repository. A close reading on
August 13, 2026 found several distinct but related developments:

- the portfolio Wiki now has an evaluated semantic, evidence, custody, and
  projection-layer prototype with plural lenses, handoff states, participant
  corrections, and scope-boundary composition;
- a Jamie-centered public-record edition has grown beyond its initial
  statement index to include bounded records for WOW List relational curation,
  recomposable civic-cultural systems, and continuity across Sunday Dinner,
  WOW List, and NYC Artist Coalition;
- a governed WOW List collaborator workspace uses the same layered model while
  keeping source custody and every public projection separately controlled;
- the current WOW List implementation compiles a standalone public-safe graph,
  shares the stable identity `project.wowlist` with this repository at an
  exact revision, and exposes a narrower runtime projection;
- protected archival research has made multi-lens timelines, scoped universes,
  corrections, and typed handoffs operational without publishing protected
  source payloads; and
- several portfolio and product launch branches now carry different
  compositions, evidence populations, and exact-candidate judgments.

These developments are compatible, but they are not interchangeable. One
repository may be authoritative for source bodies, another for private
research coverage, another for semantic interpretation, another for a live
product implementation, and this repository for portfolio composition. Stable
identity makes joining possible; it does not decide which wording, evidence,
permission, correction, or projection wins.

The close reading also exposed a general drift class: repository host
visibility, a manifest's declared visibility, public-release authorization,
and portfolio eligibility can disagree. Host access is an observed condition,
not a substitute for a source-owned release decision. A system that checks only
one of those fields can turn an administrative state change into accidental
publication authority.

The expected outcome is a reviewable convergence layer that lets graphs refer
to one another without creating a circular source of truth, a live private
dependency, or an automatic path from access to publication.

## Goals

- Bind every participating graph instance to an exact source revision and
  manifest digest.
- Record declared visibility, freshly observed visibility, release authority,
  and projection authority as separate states.
- Preserve standalone builds and reviews when any sibling repository or
  network source is unavailable.
- Join stable entities across graph instances without implicitly merging
  claims, evidence, review dates, or projection decisions.
- Assign one canonical authority for each declared facet of a shared identity.
- Permit reciprocal references while preventing them from acquiring canonical
  authority merely because they form a cycle.
- Hold an active projection when a selected source is private, unobserved,
  release-ineligible, missing a human gate, or subject to an unresolved
  restricting correction.
- Make the contract testable with public-safe synthetic fixtures before any
  real adapter or migration is proposed.
- Give launch branches a donor and comparison role without treating branch
  recency as semantic, editorial, or production authority.

## Non-goals

- This RFC does not accept or operationalize RFC 0005.
- It does not choose a graph database, package registry, hosting service,
  schema repository, or synchronization platform.
- It does not add a CMS, search service, archive browser, authentication
  system, analytics, AI chatbot, or public Knowledge Wiki route.
- It does not read, clone, fetch, or materialize a sibling repository at build
  time.
- It does not copy private graph structure, source locators, communications,
  database rows, photographs, participant records, or protected counts into
  public Git.
- It does not make a private repository public, infer that a public repository
  is publication-authorized, or treat a release flag as rights or consent.
- It does not reconcile competing portfolio launch designs or merge their
  public surfaces.
- It does not resolve a correction, approve a projection, deploy to staging or
  production, or enable search indexing.

## Terminology

**Graph instance**
: One repository's independently governed semantic, evidence, custody-pointer,
or projection records at an exact revision.

**Federation receipt**
: A public-safe, content-addressed declaration of the instances, stable
identities, facet authorities, references, corrections, and projection gates
considered for one convergence decision.

**Stable identity**
: An identifier intentionally shared across instances, such as
`project.wowlist`. Shared identity permits a join but does not imply that the
records, claims, evidence, or permissions are equivalent.

**Facet authority**
: The instance responsible for one bounded responsibility, such as source body,
source custody, evidence, semantic interpretation, or portfolio projection.

**Declared visibility**
: The visibility state asserted by the source-owned manifest or governance
record.

**Observed visibility**
: A dated external observation of the repository host or release surface.
Observation can become stale and does not confer authority.

**Release authority**
: A source-owned decision that an exact record or snapshot may leave its
current governance envelope. It remains separate from rights, consent, credit,
editorial selection, deployment, and indexing.

**Reciprocal reference**
: Two instances referring to one another for context or lineage. A reference
edge has no canonical authority by default.

**Convergence**
: A reviewed decision to join or compare exact graph records for a bounded
purpose. Convergence is not repository merger, claim merger, or public launch.

## Detailed design

### Governing rule

The federation layer composes authorities; it does not centralize them:

```text
exact graph instance receipts
  -> stable-identity join
  -> facet-authority map
  -> correction and visibility audit
  -> recipient-specific projection decision
```

No arrow transfers the authority of the prior state. An exact revision does not
prove release authority. A shared stable ID does not merge claims. A valid
source release does not satisfy rights or consent. A passing projection audit
does not deploy or index anything.

### Instance receipt

Each instance supplies:

| Field | Purpose |
| --- | --- |
| `id` | Local identifier within the receipt |
| `registry` | Public registry name or an approved opaque identity |
| `source_revision` | Exact 40-character Git revision |
| `manifest_digest` | SHA-256 of the reviewed manifest |
| `declared_visibility` | Source-owned visibility declaration |
| `observed_visibility` | Fresh host observation or `unobserved` |
| `public_release_authorized` | Source-owned release decision |
| `runtime_dependency` | `local`, `none`, or `checked-in-snapshot` |
| `standalone` | Whether the consuming build survives source absence |

An unobserved instance may remain in a held research receipt, but it cannot
support an active public projection. A declared and observed mismatch fails the
receipt. Live private or network dependencies fail the public-build boundary.

### Stable identities and facet authority

An identity lists member records as `instance_id:record_id`. Its claim policy
must remain `independent`. The compiled receipt deliberately emits
`claims_merged: false`.

Facet authority is explicit and singular. The prototype recognizes:

- `source-custody`;
- `source-body`;
- `evidence`;
- `semantic-interpretation`; and
- `portfolio-projection`.

Two instances cannot both claim the same facet within one identity receipt.
Different facets may remain authoritative in different repositories. This
supports real federation without pretending that one graph owns every layer.

### Reciprocal references

Repositories may cite one another for provenance, lineage, interpretation, or
compatibility. Every reciprocal reference carries `authority: none`. The
authority map, not graph direction or cycle depth, determines canonical
responsibility.

This rule is especially important when a public-record edition cites a
portfolio method page while the portfolio also pins a public-record manifest.
The cycle is useful provenance. It is not a license for either side to
re-import its own interpretation as independent evidence.

### Projection decision

Every selected record is evaluated against:

1. exact instance revision and manifest digest;
2. declared public visibility;
3. currently observed public visibility;
4. source-owned public-release authorization;
5. public-safe wording;
6. rights decision;
7. consent decision;
8. collective-credit review;
9. editorial approval; and
10. unresolved corrections that restrict projection.

Missing conditions appear as explicit reasons. A held projection may retain
those reasons safely. An active projection with any reason fails closed.

The current prototype does not claim that these booleans are sufficient for a
real release. It proves only that the modeled minimum cannot be silently
omitted.

### Correction propagation

A correction targets an exact instance and record. When its status is
`proposed`, `acknowledged`, `disputed`, or `held`, and its effect is
`restrict-projection`, every dependent active projection must become held.
The original record remains preserved under RFC 0005's correction model.

The prototype evaluates propagation; it does not decide whether the correction
is accurate, who may resolve it, or how repository history should be remediated.

### Branches as donor candidates

A launch branch contributes an exact, inspectable candidate. Its date, suffix,
visual finish, test count, staging state, or human scorecard does not make it a
canonical source for another branch.

Convergence work should record, per donor:

- exact base and head;
- semantic contribution;
- public-surface contribution;
- generated-output and candidate-bound evidence;
- conflicts with other donors;
- human gates still open; and
- disposition: adopt, adapt, hold, reject, or re-derive.

This RFC deliberately keeps the current portfolio launch alternatives separate.
The new branch can be the leading edge for federation governance without
silently selecting one of their public compositions.

### Read-only prototype

The proposal contract lives at
`rfcs/0006-governed-knowledge-graph-federation.contract.json`. The evaluator
is `scripts/knowledge-wiki/federation-convergence.mjs`; its behavior suite is
`scripts/knowledge-wiki/federation-convergence.test.mjs`.

The evaluator:

- consumes one local JSON scenario;
- performs no network request or sibling-repository read;
- emits deterministic checks, bounded identity joins, projection decisions,
  and failure reasons;
- rejects private locators and credential-like material;
- refuses to advance the RFC's own stage; and
- exits nonzero when a hard gate fails.

The behavior suite covers a held reciprocal reference, a fully eligible active
projection, unauthorized source release, private and unobserved visibility,
host-state drift, live private dependencies, implicit claim merging,
authoritative reference cycles, duplicate facet authority, restricting
corrections, unpinned snapshots, incomplete instance receipts, undeclared
projection states, protected locators, and self-advanced RFC stage.

Run:

```sh
node --test scripts/knowledge-wiki/federation-convergence.test.mjs
```

The prototype is intentionally synthetic. A real ecosystem receipt needs a
separate proposal for source selection, public-safe identifiers, observation
freshness, and accountable human review.

## Security and privacy

The principal risks are authority laundering and topology leakage.

Authority laundering occurs when repository access, host visibility, a shared
ID, a successful build, or a high evaluation score is treated as permission to
publish. The contract keeps those states separate and requires active
projections to pass every modeled gate.

Topology leakage occurs when a public federation record reveals private
repository URLs, branch names, source paths, graph counts, protected
relationships, correction targets, or custody locations. Real receipts must
use approved public registries or opaque instance IDs and disclose only the
minimum fields necessary for the convergence decision.

Additional rules:

- credentials and protected locators never enter a federation receipt;
- private source systems remain unavailable to public builds;
- observed host state must be dated and refreshed before release;
- an `unobserved` state cannot support active projection;
- a mismatch between declared and observed visibility blocks convergence;
- public visibility is not present-day consent or rights clearance;
- source disappearance and correction must fail dependent projections closed;
- repository history remains a disclosure surface; and
- no synthetic pass is evidence that a real private graph is safe to expose.

## Publication workflow

This RFC creates no public content route. A future projection would require:

1. a bounded recipient and purpose;
2. an exact federation receipt containing only approved public-safe topology;
3. source-owned release decisions for every selected record;
4. current visibility observations;
5. rights, consent, identity, and collective-credit review;
6. correction and withdrawal review;
7. Jamie's editorial approval of the exact wording and selected records;
8. candidate-bound application, citation, accessibility, and public-safety
   checks;
9. separate staging approval; and
10. separate production and indexing approval.

Approval of one projection does not approve another audience, wording, branch,
repository visibility change, or future source revision.

## Rollout plan

1. **Exploring contract.** Review the vocabulary, facet authorities, visibility
   states, and synthetic failures in this pull request.
2. **Public-safe compatibility inventory.** Identify which existing records can
   participate without exposing private topology. Record excluded systems and
   reasons.
3. **One held canary.** Build a receipt for one shared stable identity with no
   active projection and no live external dependency.
4. **Correction drill.** Mutate the canary with a restricting correction and
   prove every dependent projection holds.
5. **Visibility drill.** Exercise declared, observed, unobserved, and drifted
   states without changing a real repository's visibility.
6. **Human review.** Jamie and relevant rights, credit, privacy, editorial, and
   technical reviewers decide whether the design should advance.
7. **Separate implementation proposal.** If accepted, name package ownership,
   schema location, source adapters, observation freshness, rollback, and
   operational responsibility.
8. **Observation period.** Measure whether receipts reduce drift and review
   burden before recommending federation as a default.

Rollback means removing the prototype command and tests while preserving this
exploring RFC and every existing canonical graph. No repository migration or
public projection is required to evaluate the proposal.

## Decision gates

Jamie must explicitly decide:

- whether federation receipts are the preferred convergence mechanism;
- whether `project.wowlist` and other stable identities may span these
  environments under an independent-claims rule;
- which facet vocabulary is sufficiently complete;
- which registry and repository names may appear in public receipts;
- how fresh observed visibility must be before projection;
- who owns correction propagation across repositories;
- whether a shared schema belongs here, in another repository, or in a neutral
  package;
- which launch donors, if any, should contribute to a later public candidate;
- what evidence is required before this RFC advances to `accepted`; and
- whether any real cross-repository projection is appropriate.

Before acceptance, review must cover knowledge architecture, privacy, research
operations, developer experience, editorial practice, public portfolio impact,
and compatibility with RFCs 0001, 0004, and 0005. Tests and pull-request merge
status cannot advance these gates.

## Drawbacks

- Federation receipts add another contract and review artifact.
- Exact revisions and observation receipts create routine maintenance work.
- Singular facet authority may be difficult when responsibility is genuinely
  shared or contested.
- An opaque public receipt can be so cautious that it offers little debugging
  value.
- A detailed receipt can expose private topology even without source bodies.
- Reciprocal references remain cognitively complex even when authority is
  explicit.
- Fail-closed visibility checks may delay a legitimate release when host state
  cannot be observed.
- Correction propagation across Git histories may require stronger operational
  procedures than this prototype models.
- A synthetic evaluator can create false confidence if treated as a production
  federation service.

## Alternatives

### Copy records into one canonical repository

This simplifies retrieval but duplicates authority, weakens correction and
withdrawal propagation, increases disclosure, and turns the portfolio into a
custody system.

### Treat a shared stable ID as full equivalence

This makes joins easy but silently merges claims, evidence, review dates, and
permissions that belong to different authorities.

### Let source direction determine authority

A directed edge does not express who owns source bodies, semantics, custody,
or projection. Reciprocal references make direction especially misleading.

### Use live Git submodules or network APIs

Live dependencies improve freshness but make the public build depend on private
availability and access state. They also create a larger credential and
disclosure surface.

### Maintain federation only in prose

Prose preserves reasoning but cannot reliably detect unpinned revisions,
visibility drift, duplicate facet authority, or active projections with open
corrections.

### Merge the newest launch branches

Recency does not resolve competing compositions, stale candidate-bound
evidence, rights state, or public-release authority. Donor comparison should
precede any merge.

### Do nothing

The current graphs can continue to link manually. As reciprocal references and
standalone implementations grow, authority and correction drift would remain
implicit and increasingly difficult to audit.

## Unresolved questions

- Should observed visibility be recorded by the source, consumer, or an
  independent release receipt?
- Does a visibility observation need a timestamp, host identity, and expiry?
- Which facets require singular authority, and which need a plural or disputed
  state?
- How should a source record delegate one facet temporarily?
- Can a stable ID span public and private systems safely, or should every
  outward projection receive a distinct public ID?
- How should correction propagation work when the affected repository is
  unavailable or immutable?
- Should a held projection record every missing gate publicly, or only a
  redacted reason class?
- Which parts of a federation receipt belong in public Git, private Git, or a
  sealed release system?
- How should source disappearance differ from explicit withdrawal?
- What is the minimum canary that demonstrates value without exposing private
  topology?
- How should two legitimate but conflicting semantic interpretations appear in
  one recipient packet?
- When, if ever, may one instance cache another instance's public source body?
- Should launch-donor dispositions live in this contract, an RFC appendix, or a
  separate candidate ledger?
