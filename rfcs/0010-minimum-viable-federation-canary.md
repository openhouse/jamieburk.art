---
rfc: 10
title: Minimum Viable Federation Canary for Responsible Knowledge Passage
stage: proposed
start_date: 2026-09-04
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
  - accessibility
  - public-portfolio
implementation: null
supersedes: []
superseded_by: null
---

# Minimum Viable Federation Canary for Responsible Knowledge Passage

> **Proposal boundary**
>
> This RFC is `proposed`. It specifies a bounded experiment for review; it does
> not authorize cross-repository synchronization, source access, schema
> migration, public projection, deployment, indexing, or an RFC stage change.
> The accompanying evaluator uses synthetic events and reads no external source
> repository. Jamie Burkart remains the decision owner.

## Summary

Test one responsible passage from an already-public canonical source through a
reviewable interpretation and portfolio-projection proposal, followed by a
correction or withdrawal that must hold every dependent projection. Use the
existing three-statement Sourcebook pilot as the bounded source population, but
exercise correction behavior with synthetic data unless a separate human
decision authorizes a real correction. Organize the work through three maps --
record, meaning, and action -- and three complementary review capabilities --
intelligibility, legitimacy, and federation. The result should show whether the
repositories can cooperate without transferring custody, canonical authority,
consent, editorial selection, or publication authority.

## Motivation

The Knowledge Wiki Graph ecosystem has strong local controls but does not yet
offer one trustworthy account of its current federated state. The current
portfolio graph contains 504 records and 1,831 edges, of which 1,151 use the
generic `related_to` relation. Claims also occupy several overlapping models:
Markdown graph records, the canonical citation registry, the proof registry,
external source editions, and Sourcebook publication packets.

Two currentness problems make a broad rollout premature. The graph compiler has
a historical default date that can report no stale pages even when review dates
have passed. The ecosystem profile promises to reopen review for newly listed
branches, but its remote check asks only about branches already registered.
These are not merely reporting defects. They make it difficult for a person or
agent to know which candidate, authority, or interpretation is current.

RFC 0004 supplies a bounded Sourcebook pilot. RFC 0005 distinguishes semantic,
evidence, and custody responsibilities. RFC 0006 defines transport envelopes,
local authority, and candidate-bound receipts. RFC 0009 explores shared factual
holding without equating it with truth or consensus. This RFC does not replace
those proposals. It narrows their next useful question to one inspectable
journey whose failure modes can be observed end to end.

The three review capabilities came from a user-requested fictionalized
analytical exercise. The people whose work informed those lenses are not
authors, participants, reviewers, endorsers, or decision-makers for this RFC.
Publicly documented expertise is not evidence of interest or availability.

## Goals

- Make the location and revision of the authoritative record discoverable.
- Distinguish record location, interpreted meaning, and allowed action.
- Carry only a minimum-necessary, public-safe reference across repositories.
- Preserve local authority when a record is transported.
- Require exact revision and content-fingerprint binding.
- Make affected-party review, refusal, correction, and decision ownership
  visible in the action map.
- Demonstrate that a correction or withdrawal holds every known dependent
  projection before further public action.
- Run deterministic checks before subjective review and human decisions.
- Measure whether a new operator can trace the record and identify the next
  permissible action without learning the entire ecosystem.
- Produce evidence useful for deciding whether RFC 0006 should advance, change,
  or remain proposed.

## Non-goals

- Do not build a universal ontology, database, CMS, or synchronization service.
- Do not unify repository histories or transfer canonical ownership.
- Do not ingest private correspondence, transcript bodies, source pixels,
  protected locators, credentials, or private graph topology.
- Do not create a new public route or publish the canary to the portfolio.
- Do not convert the three Sourcebook statements into a new canonical body.
- Do not use a model judgment as evidence, consent, approval, or authority.
- Do not guarantee deletion from Git history, caches, exports, or downstream
  systems.
- Do not resolve the complete `related_to` migration or all claim-schema drift.
- Do not imply participation, review, endorsement, or availability by people
  whose public work informed the three capability lanes.

## Terminology

**Responsible passage:** A bounded movement of a reference or proposal across
repository roles while its origin, authority, audience, limitations, and
correction state remain inspectable.

**Minimum viable federation:** The smallest cross-repository behavior that can
demonstrate local authority, exact-revision transport, correction propagation,
and a human-controlled stop.

**Record map:** The view that answers where authoritative bytes and canonical
records live, at which exact revision and fingerprint.

**Meaning map:** The view that distinguishes observation, evidence, claim,
anti-claim, disagreement, correction, and projection relationships.

**Action map:** The view that names who may inspect, interpret, correct, refuse,
select, publish, deploy, index, or stop.

**Intelligibility review:** Evaluation of whether a person can find the start,
understand the vocabulary, trace provenance, and identify the next allowed step.

**Legitimacy review:** Evaluation of who benefits, who bears risk, who is
represented, who may refuse or correct, and who has decision authority.

**Federation review:** Evaluation of whether independently governed repositories
can exchange bounded records without transferring source or publication
authority.

**Canary:** The three already-public, self-authored statements in the existing
Sourcebook pilot plus one synthetic correction or withdrawal exercise.

**Received proposal:** A transported record accepted for local review. It is not
a canonical claim, approved projection, or publication authorization.

## Detailed design

### Three-map operator model

Every canary view must answer three different questions without requiring the
operator to infer one from another.

| Map | Question | Minimum fields |
| --- | --- | --- |
| Record | Where does the authoritative record live? | repository role, record ID, revision, content fingerprint |
| Meaning | What is being asserted or disputed? | object kind, typed relationship, evidence posture, correction state |
| Action | What may happen next, and who may decide? | allowed action, required gate, named authority, present state |

The views may be generated from shared data, but they are not synonyms. A public
repository does not make every record public. A supported claim does not become
selected. Selection does not establish consent. A release receipt does not
authorize deployment or indexing.

### Three complementary review capabilities

The canary requires three independent forms of critique:

1. **Intelligibility:** reduce conceptual duplication, reconcile vocabulary,
   and test retrieval with people who did not build the system.
2. **Legitimacy:** inspect participation, benefit, burden, refusal, correction,
   collective credit, and the identity of each human authority.
3. **Federation:** test identifiers, exact revisions, envelopes, schema
   evolution, correction propagation, and local authority.

These are capability requirements, not permanent roles or appointments. One
person may cover more than one capability, and a well-known adviser cannot
substitute for affected-party review.

### Canary population

Use the three-statement Sourcebook pilot because it is already bounded to public,
self-authored material and does not require a new public body. The evaluator
must not open external repositories or materialize source bodies. It uses
synthetic event metadata whose identifiers do not describe private people or
records.

Unless separately authorized, the correction exercise is synthetic. It tests
behavior rather than claiming that a real statement is wrong. A later real
canary would require an approved correction or withdrawal and a new exact
candidate review.

### Responsible-passage states

The proposed state sequence is:

```text
canonical public source
  -> received proposal
  -> reviewed interpretation
  -> projection proposal
  -> held for human decision
  -> held after correction or eligible for separately authorized action
```

No automated transition ends in published, deployed, indexed, consented, or
approved. The receiving repository may reject the proposal or represent a
different interpretation while retaining the origin reference.

### Minimum exchange event

Each synthetic event contains:

- a stable event ID and event kind;
- origin repository role, record ID, exact revision, and content fingerprint;
- target repository role;
- purpose and allowed audience;
- separate source, interpretation, and publication authorities; and
- correction identity, superseded revision, and affected projection IDs when
  the event is a correction notice.

Public events forbid raw source bodies, protected locators, private identifiers,
credentials, and private graph topology. Boundary composition remains
minimum-necessary and most-restrictive.

### Evidence posture and incomplete source access

A protected, body-free research calibration surfaced three failure modes that
the canary should make executable without importing the private material that
revealed them:

1. An outbound message or proposal can establish that something was sent. It
   cannot by itself establish acceptance, adoption, delivery, deployment,
   endorsement, or payment. Silence never supplies the missing response.
2. A source that is listed but dataless, inaccessible, or not materialized is
   unresolved. Its unavailable body cannot be treated as empty content,
   disconfirming evidence, or permission to infer what it contains.
3. Byte-identical exports share one content fingerprint. Repeated copies may
   improve custody resilience, but they do not create independent
   corroboration.

The public evaluator represents only these generic evidence postures. It does
not contain identities, correspondence, transcript text, protected locators,
company context, or claims about a real relationship. These holds can be
resolved only by newly available qualified evidence and the relevant human
gates, not by model confidence.

### Correction and withdrawal behavior

A correction notice must name every known dependent projection. Receipt of a
complete notice moves those projections to `hold-projection`; it does not edit
or delete the originating record. A missing downstream inventory is itself a
hold because the system cannot demonstrate containment.

The original remains available where local policy requires an append-only audit
trail. The system must state that it cannot guarantee deletion from Git history,
caches, exports, screenshots, or systems it does not control. A restrictive
notice propagates faster than any later relaxation.

### Currentness

Every result records an explicit evaluation time, exact input revisions, and a
candidate fingerprint. A changed record, contract, evaluator, or projection
invalidates dependent receipts. Remote frontier discovery must enumerate
matching branches before comparing registered revisions; checking only known
branches does not satisfy freshness.

Reproducible historical snapshots and current operational health are separate
reports. Neither may silently borrow the other's clock.

### Evaluation strategy

Evaluation runs in this order:

1. **Deterministic:** schema, required fields, exact bindings, forbidden-field
   detection, authority separation, correction propagation, and mutation tests.
2. **Subjective:** fresh readers attempt to identify the authoritative record,
   present interpretation, open disagreement, and next allowed action.
3. **Human:** affected-party, rights, consent, collective-credit, editorial,
   publication, deployment, indexing, and RFC-stage decisions.

Failure at an earlier phase stops the candidate before a more expensive phase.
A model may compare or draft but cannot approve its own output. A passing score
does not advance the RFC stage.

### Success criteria

The canary is successful only when:

- all deterministic hard gates and mutation cases pass;
- no public event contains a forbidden field;
- an exact source reference reaches only `received-proposal`;
- a stale reference is denied;
- outbound-only evidence cannot establish a response-dependent outcome;
- an unavailable source body remains unresolved rather than becoming negative
  evidence;
- duplicate content fingerprints do not count as independent corroboration;
- a correction holds every identified dependent projection;
- a missing downstream inventory remains held;
- a new operator can find the canonical record and decision owner;
- an affected reviewer can identify refusal and correction routes;
- rollback removes derived canary outputs without changing canonical sources;
- no automated result claims publication, deployment, indexing, consent, or RFC
  acceptance.

## Security and privacy

The evaluator uses synthetic, body-free fixtures. It performs no network access,
source materialization, or external repository read. Public fixtures must not
contain raw correspondence, transcript bodies, protected locators, credentials,
private identifiers, private graph counts, or private topology.

The recursive forbidden-field check rejects protected field names even when
nested. This is a defense against accidental envelope expansion, not proof that
all public text is safe. Human review remains responsible for indirect
identification, contextual harm, collective credit, rights, consent, and the
adequacy of redaction.

The correction mechanism is fail-closed. Incomplete correction notices remain
held. Automation cannot relax a restriction or infer approval from silence,
repository access, prior publication, or a passing evaluation.

## Publication workflow

This RFC and its synthetic evaluator may be reviewed in the public repository.
The canary creates no public portfolio route and performs no publication.

A later public projection would require, for the exact candidate:

1. confirmed canonical source identity and revision;
2. public-safety review;
3. affected-party review where applicable;
4. rights and consent decisions;
5. collective-credit review;
6. editorial selection by the named human authority;
7. candidate-bound verification;
8. a separate publication decision; and
9. separate deployment and production-indexing decisions.

An adviser, evaluator, model, pull-request approval, or merge cannot satisfy
these human gates unless the relevant governance explicitly names that person as
the authority for that exact decision.

## Rollout plan

### Phase 0: proposed contract

Merge, revise, close, or leave this RFC open for discussion. The included
contract and synthetic evaluator are proposal evidence only. No source or public
surface changes occur.

### Phase 1: bounded synthetic canary

If Jamie advances the RFC, run the synthetic events against the existing
three-statement Sourcebook population. Record exact inputs, outputs, mutations,
operator burden, and rollback behavior. Do not access a sibling repository.

### Phase 2: independent review

Run separate intelligibility, legitimacy, and federation reviews. Recruit
affected-party review independently of any expert advisory review. Preserve
disagreement rather than averaging it into one score.

### Phase 3: authorized real correction

Only after an explicit decision, substitute one approved real correction or
withdrawal. Bind every receipt to the new exact candidate. Stop if downstream
projection coverage cannot be enumerated.

### Phase 4: observation and decision

Observe correction latency, stale-reference detection, retrieval success,
operator burden, false holds, and boundary failures. Use that evidence to decide
whether to amend RFC 0006, advance either RFC, or stop.

Rollback removes synthetic fixtures, derived reports, and evaluator wiring. It
does not rewrite canonical Sourcebook records or claim deletion from Git history.

## Decision gates

Jamie must explicitly decide:

- whether the three-map model is a useful operator contract;
- whether the three capability lanes are complete;
- whether the Sourcebook pilot is the right canary population;
- whether any real correction or withdrawal may be used;
- which people constitute affected-party review;
- who owns source, interpretation, correction, editorial, publication,
  deployment, and indexing decisions;
- whether the correction inventory is sufficiently complete;
- whether RFC 0006 should be amended or advanced;
- whether any schema consolidation or cross-repository implementation is
  authorized; and
- whether the canary may ever reach a public portfolio surface.

Automated checks cannot advance these gates. The three expert capability lanes
are advisory and do not confer decision authority.

## Drawbacks

- A small canary may underrepresent difficult private-source and collective-work
  cases.
- Three maps add documentation and interface work before reducing complexity.
- Fail-closed correction behavior may hold legitimate projections longer than
  desired.
- Complete downstream enumeration may be expensive across loosely coupled
  systems.
- Exact-candidate invalidation creates recurring verification work.
- Synthetic success may not predict the social difficulty of a real correction.
- Expert review can create false legitimacy if affected people are not included.
- Another RFC and contract add maintenance burden to an already extensive
  governance corpus.

## Alternatives

**Implement RFC 0006 directly.** Not preferred while the ecosystem lacks a
small, observable end-to-end correction case and RFC 0006 remains proposed.

**Consolidate every claim schema first.** This may eventually be useful, but it
creates a large migration before proving which shared contract is necessary.

**Use one central database.** This would simplify queries while collapsing local
authority, custody boundaries, and repository-specific correction ownership.

**Treat the portfolio repository as canonical.** Rejected because the portfolio
is a selective audience projection, not a private archive or universal claims
database.

**Add more evaluation lenses without a canary.** Rejected because additional
judgments cannot repair an untraceable transition.

**Do nothing.** This avoids new machinery but leaves currentness, correction
propagation, vocabulary overlap, and cross-repository authority unresolved.

## Unresolved questions

- Should correction notices identify all downstream projections centrally, or
  should each consumer acknowledge its own affected projections?
- What maximum correction-propagation latency is acceptable?
- Which relation types should replace the highest-consequence uses of
  `related_to`?
- Can the three claim models share identifiers without sharing one schema?
- What constitutes a representative independent intelligibility test?
- How can affected-party refusal be represented without exposing identity or
  private topology?
- When does retaining an append-only correction trail create more risk than
  value?
- Should RFC 0010 remain separate after the experiment, or become an amendment
  to RFC 0006?
