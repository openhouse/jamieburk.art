---
rfc: 9
title: Wiki Form for Shared Agentic Memory
stage: exploring
start_date: 2026-08-24
authors:
  - Jamie Burkart
  - Codex, AI-assisted draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - agentic-memory
  - human-computer-collaboration
  - privacy-governance
  - editorial
  - public-portfolio
implementation: null
supersedes: []
superseded_by: null
---

# Wiki Form for Shared Agentic Memory

> **Proposal boundary**
>
> This RFC is an `exploring` design record. Merging it preserves Jamie
> Burkart's proposition for discussion and evaluation. It does not establish
> that the proposition is true, authorize implementation or adoption, grant
> source access, confer publication authority, or record the participation,
> review, approval, or endorsement of any named analytical lens. Jamie remains
> the decision owner for every stage change and public release.

## Summary

Treat the wiki as the governing form for source-backed shared memory among
people, repositories, large language models, and agents with different
contexts. In this proposal, a wiki is not merely editable pages or a familiar
interface. It is a human-inspectable, source-backed knowledge medium through
which participants can develop shared working memory without erasing
provenance, plurality, disagreement, revision history, or human authority.

The proposal extends RFC 0005's semantic, evidence, source-custody, and
projection responsibilities and RFC 0006's federated exchange model. It asks
whether a legible, revisable wiki surface can let differently situated people
and agents work from the same constellation of knowledge universes while
remaining able to trace what is believed, why it is believed, what remains
open, and who can authorize the next action.

## Motivation

Agentic work creates a coordination problem before it creates a storage
problem. Different agents enter with different context windows, instructions,
tools, retrieval results, and model behavior. People bring situated knowledge,
relationships, language, judgment, and authority that are not interchangeable
with model context. Project repositories and source systems each retain their
own histories, access rules, and custody responsibilities.

A single generated summary can make these differences temporarily invisible,
but it cannot safely become shared memory merely by sounding coherent. It may
omit a source, flatten disagreement, conceal a protection boundary, confuse an
evaluation with authorization, or make a later agent unable to reconstruct why
a claim was accepted.

The working proposition is that the wiki form offers a useful social and
technical answer. It is already legible as linked, revisable knowledge rather
than a sealed model state. Its pages can expose sources, history, uncertainty,
relationships, and correction paths. It can be read and revised by people
without requiring repository fluency, while agents can consume the same stable
records and explicit relationships.

This does not mean that a wiki manufactures factual agreement. It means that a
wiki can make the terms of working agreement, unresolved difference, and
revision visible enough for people and agents to collaborate responsibly.

## Goals

- Make shared working memory human-inspectable and agent-usable.
- Keep every projected claim traceable to evidence and source-custody records.
- Preserve attributed disagreement, open questions, and plural contexts rather
  than synthesizing them into a false single voice.
- Maintain stable identities, links, and revision history so later readers and
  agents can understand how a record changed.
- Let each repository and source system retain local authority while selected
  context travels through governed packets and projections.
- Separate knowledge maturity from action authority: a well-supported claim
  does not itself authorize publication, deployment, spending, or commitment.
- Provide a familiar, low-burden public and team interface for inspecting,
  correcting, and continuing the work.
- Run deterministic truth, privacy, lifecycle, and packet checks before any
  interpretive model evaluation.

## Non-goals

- Claiming that a wiki automatically produces truth, consensus, factual
  agreement, neutrality, or good decisions.
- Requiring every participant to hold identical beliefs or context.
- Replacing human judgment, source expertise, rights review, consent,
  collective credit, or publication authority with an LLM or agent.
- Treating a passing evaluation, context packet, generated summary, or model
  confidence score as permission to act.
- Building a company-wide knowledge platform, CMS, graph database, archive
  browser, or AI chatbot through this RFC.
- Publishing private correspondence, protected source locators, raw community
  records, client material, or private model context.
- Implying that Ward Cunningham, Maggie Appleton, Yehuda Katz, or any other
  named analytical lens participated in, reviewed, approved, or endorsed this
  proposal.

## Terminology

**Wiki form**
: A linked, revisable, human-inspectable knowledge medium with stable page
  identities, visible relationships, source traceability, and correction
  history. The form may be implemented through files, repositories, generated
  pages, or compatible tools; it is not defined by one software package.

**Shared working memory**
: The currently usable account of what a team knows, why it believes it, what
  remains open or protected, and what actions are authorized. Shared does not
  mean that every participant has read, agreed with, or internalized every
  record.

**Knowledge universe**
: A project- or source-specific body of material, relationships, conventions,
  authority, and context. A knowledge universe can participate in more than
  one graph responsibility while retaining its own custody and release rules.

**Agent context**
: The instructions, retrieved records, tools, conversation state, and model
  behavior available to one agent at a particular time. Agent context is
  transient and is not canonical memory.

**Working agreement**
: A source-backed interpretation sufficiently reviewed for a stated purpose.
  It may coexist with attributed disagreement and can be revised. It is not a
  universal truth claim or an action authorization.

**Fictionalized analytical lens**
: A model-evaluation perspective derived from a named person's public work. It
  is not that person's participation, private view, quotation, review,
  approval, endorsement, or authority.

## Detailed design

### Constitutional core

The Knowledge Wiki retains the RFC 0005 flow:

```text
source custody
  -> evidence and atomic observations
  -> reviewed semantic claims and relationships
  -> audience-specific projection
  -> separate human action or publication decision
```

The wiki surface is the inspectable working interface across those
responsibilities. It must not collapse them. Every claim page should make it
possible, within the recipient's authorized scope, to answer:

1. What is being asserted?
2. Which observations and sources support or complicate it?
3. What remains open, disputed, or protected?
4. How and when did the record change?
5. Who owns the decision to publish, act, revise, or stop?

### Plural contexts without false consensus

People and agents may enter from different knowledge universes and retrieve
different evidence. The system should preserve source-backed lenses as
attributed records and make conflicts inspectable. It may compose a working
agreement for a stated task, but it must not silently erase the contributing
lenses or present an ensemble synthesis as unanimous institutional knowledge.

### Stable social knowledge and transient agent context

Agent prompts and context windows are task-specific and transient. Durable
memory belongs in reviewed records with stable identifiers, source
relationships, boundaries, and revision history. An agent may propose a
change, observation, relationship, or projection; it may not silently rewrite
the durable record or advance its maturity.

### Lifecycle and compatibility

Knowledge records and system proposals require explicit lifecycle states.
Proposed, exploring, accepted, implemented, released, and recommended are not
synonyms. A public page can describe an exploring proposition as research
without claiming that the underlying system has been accepted or deployed.

The wiki form should have a small constitutional core and explicit extension
points. Project-specific schemas, source adapters, and evaluation suites can
vary, but they must preserve stable identities, provenance, protected
boundaries, revision history, and human decision ownership.

### Evaluation order

Evaluation proceeds from cheaper and more decisive checks to interpretive
ones:

1. deterministic structure, identifier, source, lifecycle, and public-safety
   checks;
2. mutation tests that prove each hard gate can fail;
3. fictionalized analytical-lens model review of the exact eligible public
   packet;
4. a separate human decision about revision, publication, adoption, or action.

No model call can cure a failed deterministic gate, and no model pass can
satisfy the human decision.

### Analytical lenses for this exploration

Three named public-work lenses test different parts of the proposition:

- A **Ward Cunningham lens** asks whether the form remains open to incremental
  correction, observable change, and organic growth without centralizing every
  context into one owner.
- A **Maggie Appleton lens** asks whether the knowledge remains explorable,
  evolving, independently held, and legible to people without repository
  fluency.
- A **Yehuda Katz lens** asks whether the constitutional core, extension
  points, compatibility promises, lifecycle stages, and decision authorities
  are explicit.

These are fictionalized analytical lenses only. Their public work informs the
questions; the named people do not participate in the evaluation and have no
authority in this repository.

## Security and privacy

- Access is not consent, evidence is not publication permission, and model
  access is not authority.
- Private paths, protected locators, credentials, raw correspondence, and
  unapproved source material remain outside public records and model packets.
- A public claim can record that protected support exists only when the wording
  does not reveal the protected material or imply that it is publicly
  inspectable.
- Cross-universe packets inherit the most restrictive applicable boundary.
- The system fails closed when source identity, rights, consent, represented
  people, audience, or action authority is unresolved.

## Publication workflow

1. Record the proposition as an intake item and atomic observation.
2. Attach this RFC as a source with its `exploring` status visible.
3. Update the canonical claim, boundaries, anti-claims, and audience-specific
   wording.
4. Run deterministic and mutation checks.
5. If eligible, run fictionalized analytical-lens evaluation against the exact
   public packet.
6. Present the candidate and evaluation limits to Jamie.
7. Jamie alone decides whether to publish, revise, withhold, deploy, or index.

## Rollout plan

1. **Portfolio proposition:** add one concise source-backed explanation to the
   existing Knowledge Wiki Graph page.
2. **Evaluation contract:** encode the three independent analytical questions,
   public-only boundary, deterministic-first order, and all-pass rule.
3. **Small-team pilot:** test whether a teammate can find, trace, challenge,
   correct, and continue one decision trail using approved sources.
4. **Cross-agent study:** compare how different agents use the same frozen wiki
   packet and record where interpretations diverge.
5. **Stage review:** use observed handoffs and correction behavior—not document
   volume or model confidence—to decide whether the RFC should advance.

Each phase must be reversible. Later phases require fresh human authorization.

## Decision gates

- The canonical claim and public projection preserve research-stage wording.
- The source, evidence, semantic, and projection responsibilities remain
  distinct.
- Mutation tests demonstrate that truth, authority, maturity, and named-lens
  safeguards can fail independently.
- A real teammate can inspect and correct a limited decision trail without
  needing hidden repository context.
- Jamie reviews the exact candidate and separately authorizes any stage change,
  publication, deployment, or indexing.

## Drawbacks

- Maintaining sources, history, boundaries, and correction paths costs more
  than producing summaries.
- A familiar wiki surface can conceal complex governance unless the underlying
  distinctions remain visible.
- Too much provenance can burden a reader; too little can make the record
  impossible to trust or correct.
- A named analytical-lens evaluation may be mistaken for endorsement unless its
  fictionalized boundary is repeated and enforced.
- Stable records can still become stale. Revision history is not a substitute
  for active stewardship.

## Alternatives

**Store memory only in model context or a vector database.** This may improve
retrieval but does not provide an adequate human-readable correction,
provenance, or authority surface.

**Use a single generated summary as canonical memory.** This reduces reading
burden but hides plurality, revision, and omission risk.

**Use repositories without a wiki projection.** This preserves version history
and local authority but makes participation difficult for people who do not
work directly in the repository.

**Do nothing.** Existing RFCs already govern much of the architecture, but the
central proposition—that wiki form is the social interface for shared agentic
memory—would remain implicit and therefore difficult to evaluate.

## Unresolved questions

- What minimum history and attribution should be visible on a public page?
- How should two source-backed but incompatible working agreements coexist?
- Which edits may an agent propose automatically, and which always require
  prior human initiation?
- What is the smallest useful cross-agent study that does not expose protected
  context or create a false benchmark of agreement?
- How should the system show that a record was available to an agent without
  claiming that it was considered or acted upon?
