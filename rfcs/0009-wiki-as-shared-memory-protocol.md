---
rfc: 9
title: Wiki as Shared Memory Protocol for People and Agents
stage: proposed
start_date: 2026-08-24
authors:
  - Jamie Burkart
  - Codex, AI-assisted draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - research-operations
  - privacy-governance
  - developer-experience
implementation: null
supersedes: []
superseded_by: null
---

# Wiki as Shared Memory Protocol for People and Agents

## Summary

Investigate the wiki as a source-backed, model-agnostic, human-inspectable
protocol for shared factual holding among people and agents with different
contexts. The shared object would preserve claims, sources, disagreement, open
questions, decisions, and revision history without treating generated text as
evidence or requiring every participant to hold the same view. This RFC records
a research proposition and the smallest useful pilot. It does not authorize a
production system or a new public portfolio claim.

## Motivation

Teams increasingly work through a shifting mixture of conversations, documents,
repositories, models, and agents. Each participant sees a different part of the
record. A summary can collapse important disagreement; a transcript can be too
large to use; and an agent's context disappears when its session ends.

Jamie's proposition is that the durable coordination layer can take wiki form:
familiar pages with stable identities, source relationships, visible revision,
and human-readable prose, joined to structured records that agents can inspect.
The aim is not one universal memory. It is a shared place where participants can
see what is supported, what is disputed, what changed, and who may decide or
publish.

Three prior lines of work help make the proposition testable without implying
endorsement:

- Ward Cunningham's Federated Wiki demonstrates page circulation, plural
  authorship, and local authority across independently hosted sites.
- Denny Vrandecic's Abstract Wikipedia proposal demonstrates shared structured
  knowledge that can support different language renderings while communities
  retain editorial choice.
- Ember's RFC process demonstrates staged governance that keeps proposal,
  acceptance, implementation, release, and recommendation distinct. Yehuda Katz
  is used only as a fictionalized analytical lens because Ember publicly lists
  him in framework-core and steering roles; he is not identified as the author
  of this process or a participant in this research.

## Goals

- Define shared factual holding without equating it with truth or consensus.
- Keep source custody, evidence, interpretation, model output, consent, and
  publication authority distinct.
- Preserve disagreement and uncertainty as usable team knowledge.
- Let people and different agents inspect and propose changes to the same stable
  account.
- Test whether the form improves finding, tracing, correcting, and continuing
  work across context changes.
- Reuse the repository's existing intake, observation, claim, inquiry, packet,
  projection, RFC, and exact-candidate evaluation mechanisms.

## Non-goals

- Do not build a universal ontology, database, CMS, or autonomous memory service.
- Do not claim that a wiki guarantees truth, trust, consensus, or correctness.
- Do not grant agents authority to merge evidence, consent to publication,
  approve a claim, publish, merge, or deploy.
- Do not require participants to share identical context or beliefs.
- Do not make private sources public or expose protected locators.
- Do not claim participation, review, collaboration, or endorsement by Ward
  Cunningham, Denny Vrandecic, Yehuda Katz, Wikimedia, Federated Wiki, or Ember.
- Do not add the proposition to the public portfolio before pilot evidence and
  Jamie's separate editorial approval.

## Terminology

**Wiki protocol:** The conventions that let participants identify, read, trace,
discuss, and propose changes to durable knowledge pages and their structured
records. It is a protocol pattern, not a requirement to use one wiki product.

**Shared factual holding:** A traceable team account of what is claimed,
supported, disputed, decided, and revised. Shared means mutually inspectable;
it does not mean unanimously believed.

**Context packet:** An approved, purpose-specific selection of graph material
given to a person or agent. A packet transports context and does not become
canonical truth.

**Proposed write:** A candidate observation, claim, correction, or relationship
that remains reviewable until the relevant human authority accepts it.

**Disagreement record:** A durable account of incompatible interpretations,
their sources, present status, and the decision or research still needed.

**Projection:** A purpose-specific rendering composed from reviewed graph
material. It is not a new source of truth or publication permission.

## Detailed design

The current Knowledge Wiki Graph remains the substrate. Semantic records hold
meaning and stable identity. Evidence records hold support, complication, and
status. Source-custody records hold authoritative bytes and access conditions.
Projections render selected, reviewed material for a purpose.

A useful shared-memory page must make the following recoverable to both a person
and an agent:

1. the stable subject and current proposition;
2. status and last review date;
3. direct and complicating sources;
4. competing interpretations or disagreement;
5. open research questions;
6. decision owner and authority limits;
7. change rationale and prior wording;
8. allowed audiences and public-use state.

Agents receive only approved context packets. Their writes enter intake as
proposals. Deterministic schema, reference, privacy, date, and authority checks
run before any model assessment. A model may compare sources, identify conflict,
or draft a proposed update, but it cannot turn its own output into evidence or
approve its own write. Human review controls claim maturity, publication,
external action, merge, and deployment.

### Governed knowledge-operations profile

A 2026-08-29 close reading of seven exact revisions in the related NYC Artist
Coalition / Fair Rent NYC Knowledge Operations repository produced an internal
research-control profile for this repository. The profile does not copy the
source repository's private or campaign-specific content. It adapts mechanisms:

- three coordinated operational graph responsibilities for evidence and
  custody, agency and authority, and projection and action;
- exact-revision ecosystem coverage with explicit invalidation triggers;
- generated and materialized views that cannot become canonical by accident;
- deterministic freshness, schema, privacy, rights, consent, and authority
  gates before subjective model assessment;
- explicit dispositions for every reviewed source branch, with branch presence
  kept separate from agreement and new or moved branches reopening review;
- healthy editorial states for both a source-bounded close reading and a
  review-complete responsible stop that does not invent missing patterns;
- governed packet states for every current person or team, with minimum evidence
  requirements, known gaps, explicit human decision ownership, and separate
  speaking-authority governance for team language;
- situated support records whose typed act, exact object, campaign or matter,
  context, date, role, source, limiting inference, and correction route remain
  explicit; attention, coverage, authorship, participation, warmth, historical
  support, endorsement, contact permission, and representation authority do
  not silently transfer into one another;
- deterministic, idempotent materialization into distinct public candidates
  and private human-review views, with reference checks, content-addressed
  receipts, stable entity/assertion/source back-references, and no automatic
  publication or outreach;
- minimum-necessary private-source returns that distinguish configured,
  snapshot-current, and live-current coverage; preserve direction and original
  authorship across reaction echoes and mirrored target bodies; require
  independent identity resolution before merging ambiguous threads; exclude raw
  bodies, contact details, provider locators, and decoder debris; and never turn
  warmth or attention into commitment, publication, or external-action authority;
- a body-free message-state ladder that keeps presence, delivery, reading,
  reaction, reply, scheduling, role, assignment, completion, endorsement,
  verified authority, and an explicit open state separate; requires evidence,
  limiting inference, human authority, and correction at every step; and accepts
  a source as covered only when its custody, scope, selection method, cutoff,
  blind spots, next review trigger, and retained human action gate are recorded;
- situated editorial-voice records that cannot be treated as impersonation,
  endorsement, sign-off, or human authority; and
- an accountable public-surface contract for affected people, purpose, current
  invitation, human action, correction, and return.

The profile is implemented as an internal public-safe evaluator and method
record. Its implementation is evidence that the research control exists, not
that the proposed multi-participant pilot has run, been adopted, or produced an
outcome. This RFC therefore remains `proposed` and its production
`implementation` field remains null.

The exact source revisions and their public-safe contribution summaries live in
`evals/knowledge-wiki/ecosystem-operations-profile.json`. The evaluator can
compare the recorded revisions with the public remote before a fresh close
reading. Any mismatch invalidates the prior review rather than silently
carrying its conclusions forward.

Agreement is represented socially rather than metaphysically. The graph can say
that a group currently accepts one account for a stated purpose, that another
participant dissents, or that the evidence remains inconclusive. Correction
does not erase the earlier record; it links previous wording to replacement and
reason.

### Intellectual lineage and scope

The following sources are design context, not ancestry claims or endorsements:

- [Federated Wiki](https://fed.wiki.org/federated-wiki.html) informs plural
  authorship, page circulation, and local authority.
- [Abstract Wikipedia's July 2020 announcement](https://meta.wikimedia.org/wiki/Abstract_Wikipedia/July_2020_announcement)
  informs shared structure, multiple expressions, and community moderation.
- [Improving Ember's RFC Process](https://blog.emberjs.com/improved-rfc-process/)
  informs explicit stages between proposal and recommended practice.
- [Ember's public team page](https://emberjs.com/teams/) limits the factual basis
  for selecting a fictionalized Yehuda Katz analytical lens. The modeled lens is
  not the named person and has no authority.

The proposal extends RFCs 0005 and 0006 by asking whether their governed graph
and packet boundaries can support an observable multi-participant handoff. It
does not alter their stage or authorize their broader implementation.

## Security and privacy

Access is not consent, evidence is not publication permission, and a successful
evaluation is not authority. Protected sources remain in their authorized
custody systems. Packets expose the minimum approved context and omit private
locators, credentials, correspondence, raw transcripts, personal records, and
unapproved media.

Every proposed write retains provenance. Unknown provenance, failed reference
checks, unclear rights, prompt-injected source material, or ambiguous authority
must fail closed into inquiry or human review. Agents may not silently resolve
identity collisions or disagreements.

## Publication workflow

The canonical claim created with this RFC has one held projection with no public
surface. Publishing it requires evidence from the controlled pilot, a new exact
candidate evaluation, claim and citation review, and Jamie's explicit editorial
approval. The cited people and projects should not become a decorative public
roster. If a future public account uses a lineage, it must state the precise
idea borrowed and the no-endorsement boundary without burdening the reader.

## Rollout plan

1. Record this proposed RFC, its sources, observations, claim, and research
   inquiry in the Knowledge Bank.
2. Run one controlled task with two people and two agents receiving deliberately
   different approved context packets.
3. Require the group to produce one shared account containing support,
   disagreement, open questions, decision ownership, and change rationale.
4. Ask each participant to find an answer, trace it, propose a correction,
   preserve dissent, and decide whether the work can continue, must be revised,
   or should stop.
5. Compare the result with an ordinary document handoff using the same task.
6. Record failure modes and Jamie's decision before changing this RFC's stage or
   activating a public projection.

Rollback is removal of the experimental packet and pilot artifacts. The durable
RFC and inconclusive inquiry remain as research history unless Jamie closes or
supersedes them.

## Decision gates

- The graph validates with the proposition held from public projection.
- The three contextual lineages and no-endorsement boundaries remain explicit.
- The pilot defines observable find, trace, correct, dissent, and continuation
  behaviors before it runs.
- Participants review whether the shared account represents their disagreements
  accurately.
- Jamie decides whether the evidence supports further implementation, public
  composition, or closure.

## Drawbacks

The structure can become burdensome, formal, or falsely authoritative. A wiki
can accumulate stale pages while appearing current. Models may converge on
polished but weakly supported prose, amplify a shared error, or mistake the
visible graph for the whole record. Explicit disagreement and provenance add
maintenance cost. Familiarity with wiki form does not guarantee that the form
is the best interface for every team or task.

## Alternatives

- **Ordinary shared documents:** easy to adopt, but source relationships,
  disagreement, stable identity, and change authority remain implicit.
- **Chat or transcript memory:** preserves conversational texture, but makes
  current status and correction expensive to recover.
- **Vector retrieval alone:** can locate related material, but similarity does
  not express evidentiary relationship, authority, or accepted correction.
- **One agent-owned memory:** offers continuity for that agent, but is harder for
  other models and people to inspect, contest, and carry forward.
- **Do nothing:** avoids new process while leaving cross-context continuity
  dependent on individual recollection and ad hoc summaries.

## Unresolved questions

- What evidence would distinguish improved shared understanding from merely
  better-formatted documentation?
- How much structure can participants maintain before the protocol becomes a
  burden?
- Which disagreements require a human decision, and which should remain open?
- How should confidence and freshness decay when sources or team membership
  change?
- Can different model families use the same packet without converging on the
  same unsupported inference?
- What minimum observation period would justify moving from an experimental
  protocol to a recommended team practice?
