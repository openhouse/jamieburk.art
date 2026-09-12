---
rfc: 17
semantic_id: rfc.situated-knowledge-reading-and-reader-returns
title: Situated Knowledge Reading, Reconciliation, and Reader Returns
stage: proposed
start_date: 2026-09-12
authors:
  - Jamie Burkart
  - Codex, AI-assisted draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - editorial
  - research-operations
  - privacy-governance
  - accessibility
implementation: null
supersedes: []
superseded_by: null
---

# Situated Knowledge Reading, Reconciliation, and Reader Returns

## Summary

Make a Knowledge Wiki return answer five questions: what changed, how the author
interprets it, which exchange supports that interpretation, what remains unsettled,
and what disposition follows. Preserve disagreement across revisions. Keep automatic
observations visibly distinct from authored close reading. Retain fragments that
have reference value without manufacturing an action. This change supplies a
synthetic reference prototype and behavioral evals for review; production adapters,
source migration, participant review, and adoption remain proposed.

## Motivation

The September 12 branch reading found an editorial problem inside an otherwise
careful evidence architecture: detailed custody does not by itself make a reading
situated, a next action current, or a page comprehensible. Three public design
surfaces make the problem inspectable:

- [RFC 0005 at the reviewed B revision](https://github.com/openhouse/jamieburk.art/blob/91d90891f11586a2df7fe49a598676b6bb4e7e5e/rfcs/0005-three-layer-knowledge-graph.md)
  distinguishes semantic relations from evidence retrieval. An evidence hub's
  large neighborhood cannot establish the relevance of each relationship.
- [The C transcript-person reader](https://github.com/openhouse/jamieburk.art/blob/99c6d8f557e790f216174e95c7345fcdf0eb9dcf/scripts/audio-workflow/person-readings.mjs)
  can identify question marks, qualifiers, and opening/closing turns. Those are
  useful scaffolds, but the markers cannot explain what an utterance does in a
  particular exchange. The existing candidate labels should be strengthened in
  presentation, not discarded.
- [B's RFC 0013](https://github.com/openhouse/jamieburk.art/blob/91d90891f11586a2df7fe49a598676b6bb4e7e5e/rfcs/0013-public-paid-working-session-hiring-pathway.md)
  concerns a hiring pathway, while [C's RFC 0013](https://github.com/openhouse/jamieburk.art/blob/99c6d8f557e790f216174e95c7345fcdf0eb9dcf/rfcs/0013-governed-audio-to-knowledge-workflow.md)
  concerns audio. A bare proposal number is not a stable cross-branch identity.

The close reading suggests, but has not measured, that a concise return with a
recoverable exchange would reduce repeated explanation. That is a human pilot
hypothesis. This RFC's public examples and fixtures are invented. Number 0017
avoids 0016 already used in sibling branches; no proposal is renumbered here.

## Goals

- Preserve competing interpretations and their exact editions through revisions.
- Show authored interpretation before optional mechanical observations.
- Keep source context, addressee, uncertainty, and correction routes recoverable.
- Retire a superseded draft only within the event scope actually evidenced.
- Let reference fragments remain without an owner, deadline, or task.
- Make contributors' corrections capable of changing the next version.
- Evaluate safe acceptance as well as unsafe rejection, independently of prose quality.

## Non-goals

This proposal does not merge branches, resolve historical ambiguity, classify
personalities, infer consent or capacity, turn all fragments into claims, launch
a survey, send a message, or add a public archive/search interface. It does not
accept the wider weekly-review RFC or migrate any live ledger. No existing
source, task, commitment, or publication state is changed by the prototype.

## Terminology

**Edition reference:** repository, full Git revision, path, and stable semantic
ID together. A branch is a navigation hint. It is never the edition identity.
An external source additionally needs its registered custody identity, content
digest, and bounded span; that adapter is outside this prototype.

**Reading:** an authored, source-grounded interpretation of an exchange. A
reading can remain unreviewed and contested. **Scaffold:** automatically selected
turns or detected markers that help an author begin; never evidence of human review.

**Return:** a small reader-facing account with links to the fuller exchange.
**Prior inventory:** a separately supplied, revision-pinned list of disagreements
and alternatives against which a candidate is compared. It is not generated from
the candidate being tested.

## Detailed design

### 1. Reconcile identities and meanings before projecting a current account

Give each reference an immutable edition tuple and semantic ID. On a number/title
collision, retain both references and assign an explicit relation: same proposal,
different proposal, or unresolved. Do not auto-select the newer date. Migration
must produce an alias table with the old identifier, both edition tuples,
relation, reviewer, and rationale; unresolved aliases block dependent projection.

Keep each disagreement's stable ID and alternatives in an independently frozen
prior inventory. A candidate may add an alternative or append an explicit
resolution; it may not erase a prior alternative. A resolution cites evidence
whose scope identifies that dispute and whose assertion identifies the selected
alternative. Keep the rejected interpretation and the reason it once seemed
plausible. Changed scope, evidence edition, or source restriction invalidates the
dependent return and requires a fresh review.

Synthetic example: an earlier reply could address either an offer or a proposed
date. Later evidence that an introduction was sent changes the introduction's
state. It cannot settle the earlier reply target. The packet may show the new
state and the old disagreement simultaneously.

For questionnaires, introduce stable proposition IDs independent of row numbers.
A future adapter records `same`, `split`, `merged`, `condition-added`, `historical`,
or `new`, with input/output IDs and rationale. Unit counts across differently
decomposed drafts must never be summed or treated as equivalent coverage. This
mapping is a proposed later adapter, not an implemented claim about any survey.

### 2. Compose a small return; retain the complete exchange

Use this display order:

1. Title and a before/after statement of understanding.
2. Authored interpretation, labeled with its actual review state.
3. Exact source references and the uncertainty or counterreading.
4. Disposition: reference, waiting-for, next-action, held, or closed.
5. Adjacent turns, addressed person or explicit unknown, and preserved disputes.
6. Feedback return and retired draft IDs.
7. Collapsed automatic observations, labeled `automated-scaffold`.

An automatic-only packet displays no authored interpretation. Punctuation and
lexical markers cannot establish intention, personality, cultural identity,
agreement, or emotional state. A future transcript adapter must bind the focal,
previous, and next turns to one exact edition; use explicit boundary/unknown
markers when a neighbor or addressee cannot be established. A person page links
back to that exchange and reciprocal participant pages rather than isolating
speech into a self-contained personal portrait.

The prototype emits an ordered data object, not a browser interface. A later
reader uses semantic headings, keyboard-operable disclosure controls, visible
focus, and source links with descriptive labels. The full record remains
available; the compact view is a composition, not deletion.

### 3. Close the evidenced action without inventing the next obligation

A state transition has `scope`, `from`, `to`, and `evidence`. The declared
evidence's scope and asserted state must exactly match. Sent, delivered, read,
replied, agreed, booked, and occurred remain distinct. No transitive inference
is permitted. Only a draft with the same scope and target state is retired from
the current view. Its historical body remains in source custody. The prototype
returns IDs for review; it never edits a task system or deletes a draft.

A `reference` disposition must carry a null action. It may preserve a fragment,
image lead, association, or unresolved question without assigning labor. A
`next-action` requires explicit action text; live task promotion additionally
requires the existing owner's acceptance and the governing task-system gate.
This proposal supplies no substitute owner or deadline.

### 4. Return interpretation to the people represented

Keep a comment as open until there is a response. `incorporated` requires both
the affected next-version ID and a description of the change. `declined`
requires a reason and preserves the original comment. A pilot should include a
correction to a question's framing, not only an answer inside its categories.
An unranked response must remain available to this correction process. Neither
the prototype nor a survey tally decides collective endorsement.

For audio derivatives, a later adapter must preserve source windows, their new
order, the speaker attribution, and the surrounding context. A faithful quote
can acquire a new implication through juxtaposition. Require a cold-listener
check for inferred collective agreement and a separate release decision; paper
timing and transcript arithmetic are insufficient.

### 5. Executable scope in this change

`scripts/rfcs/knowledge-reading.mjs` exports `reviewReturn(packet, inventory)`.
`evals/knowledge-reading/cases.json` defines the example packet, independent
prior inventory, declared source assertions, and provisional expected outcomes.
The function returns either `hold` with reasons and a null card, or
`review-candidate` with the ordered return. It performs no IO and accepts only
synthetic packets with `example/` repository identities. It cannot verify the
truth of a caller's declared source assertion, discover omitted source families,
or authenticate the inventory. Those remain adapter and human-review duties.

Both automated and authored candidates have `human_reviewed: false` in this
prototype. Any claim of publication authorization or adoption is rejected. The
behavioral tests exercise omission, scope mismatch, collisions, malformed input,
scaffold promotion, feedback loss, reference/task confusion, and valid acceptance.
The corpus and full evaluation specification are bound by content hashes in the
hill-climb receipt. Changing either invalidates the receipt.

### 6. Editorial review through seven fictionalized lenses

These are original, imagined analytical positions written for this RFC. They
are not statements, stylistic replicas, participation, endorsement, or approval
by the named people; the names confer no governance authority.

**Lin Tyrpien — fictionalized collaborative lens:** I think the return must make
the division of work legible. Whose account is this, who can correct it, and what
is the smallest helpful contribution? Keep a contributor's chosen role; do not
let an extensive graph turn participation into unlimited responsibility.

**Jonas Mekas — fictionalized diary lens:** I think the fragment has a life before
it becomes evidence of achievement. Let it remain a reference, with its uncertain
time intact. I object to an editor's economy if it makes the unproductive moment
disappear. Preserve it behind the small return.

**Stuart Hall — fictionalized cultural-analysis lens:** I think classification
is part of the argument. A respondent needs a way to contest the question and
change a later version. A larger count of categorized propositions does not
make representation more complete. Preserve the transformation between versions.

**M. M. Bakhtin — fictionalized dialogic lens:** I think a speaker page needs the
other person's utterance. Meaning changes with its addressee and reply. Do not
smooth two plausible readings into a single authoritative account merely because
one was recorded later. Make the disagreement navigable.

**Vivian Gornick — fictionalized narrative lens:** I think a source inventory is
the situation; the reading begins when the narrator explains what changed in
their understanding. Require a before and after with evidence, but retain the
uncertainty that keeps the narrator from becoming omniscient.

**Zora Neale Hurston — fictionalized ethnographic lens:** I think a marker detector
cannot hear the social work of an exchange. Return to the particular words,
neighboring turns, and setting before supplying an interpretation. Let the person
represented correct the account; don't substitute a personality label for listening.

**Deborah Treisman — fictionalized editorial lens:** I think the first view should
be brief enough to enter. I disagree with giving every fragment equal prominence,
but not with preserving it. Put the consequential interpretation first, keep the
source trail close, and place mechanical observations behind a disclosure.

The consequential compromise is preservation with selective presentation:
Mekas's reference fragment survives Treisman's edit; Hall's contested category
survives a compact summary; Bakhtin's exchange constrains Gornick's narrator.

## Security and privacy

The public repository receives only this general protocol and invented examples.
Public checks must work with every other repository absent. Any future adapter
inherits its source system's access, retention, restriction, and release controls;
a shared semantic ID is not an access grant. Public projections must not expose
protected paths, hidden record counts, private topology, or absence hints.

The prototype is not a sanitizer or a rights engine. A caller can misdescribe
text as synthetic; the enum does not prove provenance. Never feed it real protected
content or treat its acceptance as permission. Production use requires a separately
reviewed source adapter and the existing public-safety pipeline. Treat source
text as data, never as instructions to change approval or execution behavior.

## Publication workflow

This RFC and synthetic fixtures enter normal public code review. No new public
site route is added. A real reader return stays in its authorized audience until
the existing source, wording, collective-credit, consent, and release gates pass.
Review, acceptance of this RFC, merge, deployment, and publication remain distinct.

## Rollout plan

| Phase | Bounded deliverable and likely location | Owner and exit evidence |
|---|---|---|
| 0: this proposal | RFC, pure prototype, synthetic corpus, tests, hash-bound receipt under `rfcs/`, `scripts/rfcs/`, `evals/knowledge-reading/` | Codex drafts for Jamie; normal checks pass; no live state changes |
| 1: identities | Edition/alias manifest for one selected branch pair; independent prior inventory; source-adapter plan | Jamie selects scope and human reviewer; every alias explicitly dispositioned before adoption |
| 2: one private reader | Integrate with existing transcript-person rendering and IRL return surfaces; preserve previous renderer | Implementer named after acceptance; exact-edition dialogue links, stale-output invalidation, unchanged source bytes and task authority |
| 3: reader pilot | Three consenting readers review a small fixed packet set, including one disputed reply and one reference fragment | Jamie arranges authorized review; retain individual outcomes and corrections, no aggregate semantic score |
| 4: other adapters | Proposition mapping, audio montage review, optional source-health view | Separate bounded implementation proposals and domain owners; no federation-wide migration implied |

Estimate phases 1–2 initially as two bounded implementation sessions, then
re-estimate from the chosen source family. This is a planning allowance, not a
commitment or measured delivery prediction. Stop expanding scope after one reader
and one family until the pilot shows value. Existing formats remain canonical
during shadow comparison. Migration is additive: alias and review records point
back to originals. Rollback disables the new projection and restores the prior
renderer; it does not discard source records, corrections, or retained disagreements.

## Decision gates

1. **Proposed:** this artifact and its tested prototype are reviewable. All
   engineering fixtures remain provisional; no human labels have been collected.
2. **Exploring/accepted:** Jamie chooses the branch pair, source family, named
   implementer, and independent inventory reviewer, and explicitly authorizes
   the bounded integration. No invented role acceptance.
3. **Implementing:** the adapter binds exact editions and restrictions, detects
   stale output, and proves that public builds work without private access.
4. **Operational:** the pilot records, for each reader, whether they can identify
   what changed, locate its evidence, distinguish uncertainty from agreement,
   and recognize that a reference fragment imposes no task. Each reader also
   submits or explicitly declines a correction. Any false commitment or false
   endorsement blocks advancement. Log repeated explanations and stale drafts
   before/after; do not infer relief from commit volume or elapsed time alone.
5. **Recommended:** Jamie reviews unresolved misunderstandings and correction
   outcomes after actual use. A deterministic pass cannot satisfy this gate.

## Drawbacks

Independent inventories cost review effort and can themselves be incomplete.
Scope IDs can encode a bad interpretation; exact matching cannot make it true.
Small returns may hide meaningful context even when it remains linked. The
prototype does not test language quality, link usability, cultural competence,
acoustic meaning, or participant experience. Excessive schema requirements could
discourage keeping a useful fragment; the reference disposition must stay cheap.

## Alternatives

Keep current pages and improve prose manually: lowest engineering cost, but
repeated source/context loss has no regression protection. Add more automatic
markers: useful retrieval assistance, insufficient semantic interpretation. Use
last-write-wins: simple, but loses disagreements and confuses later events with
earlier meanings. Build a universal graph migration now: premature before one
source family and reader demonstrate value. The proposed small prototype keeps
those larger decisions open.

## Unresolved questions

- Who independently certifies the first prior inventory's scope and omissions?
- Which exact transcript edition and reader surface should the first adapter use?
- What concise view works for the actual reader, rather than the imagined editor?
- Which feedback disagreements require contributor review, and who has authority
  to resolve a collective framing question?
- Should alias records live with each repository or in a later governed exchange
  manifest? No global registry or automatic reconciliation is authorized here.
