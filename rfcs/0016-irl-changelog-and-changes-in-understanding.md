---
rfc: 16
title: IRL Changelog and Evidence-Linked Changes in Understanding
stage: implementing
start_date: 2026-09-06
authors:
  - Jamie Burkart
  - Codex, AI-assisted draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - research-operations
  - privacy-governance
  - editorial
  - developer-experience
implementation: scripts/irl-changelog/README.md
supersedes: []
superseded_by: null
---

# IRL Changelog and Evidence-Linked Changes in Understanding

## Summary

Make the IRL changelog a durable, private, evidence-linked record of consequential
changes in lived circumstances **and in our understanding of them**. An entry
records the earlier picture, the new evidence, what changed, why it matters, and
what remains unestablished. It connects to existing people, projects, practices,
events, and evidence; it does not replace their pages or the source archive.
Ordinary corrections append to history. Current-state pages identify the exact
history they used and become stale when that basis changes. Recording knowledge
never authorizes a task, contact, publication, or institutional decision.

Jamie explicitly requested implementation on September 6, 2026. The design is
accepted for implementation; the operator-invoked runtime and synthetic pressure
tests are now in [scripts/irl-changelog](../scripts/irl-changelog/README.md).
This is not an operational rollout or a migration approval. Existing histories
remain intact pending the separate corpus, mapping and contextual-use gates.
Observer-specific time, dependency-scoped holds and use-specific privacy review
remain hard requirements.

## Motivation

A current-state page answers “What is our best supported picture now?” A source
archive answers “What did this source contain?” Neither necessarily answers
“How did the picture change, when did we learn that, and what would change our
mind again?” Git records edits, but an edit date does not establish an event
date, receipt of a message, an accepted commitment, or a change in a relationship.

Existing bounded changelog work establishes a useful starting point: separate
event and observation dates, cited comparisons, additive corrections, generated
Markdown, and integrity checks. Formalization must preserve that working history
without treating a prototype's fields as a complete shared graph protocol.
Typed entity resolution, projection freshness, concurrent writes, and migration
decisions need explicit contracts.

The intended readers are maintainers and authorized knowledge workers. This is
explanation plus reference: enough structure to preserve trust, without making
every conversation turn a new administrative obligation.

## Goals

- Preserve the difference between lived events, attributed reports, operating
  artifacts, and changes in interpretation.
- Make consequential transformations recoverable through citations and graph
  relationships, including changed constraints and reasons to stop pursuing work.
- Preserve what was understood at the time without pretending a retrospective
  reconstruction was contemporaneous knowledge.
- Make corrections and stale downstream summaries visible.
- Support finite review and practical orientation without productivity scoring
  or automatic commitments.
- Keep private working context useful while public composition remains selective.

## Non-goals

- No diary-completeness requirement, activity surveillance, emotional scoring,
  relationship ranking, or inference that an empty log means nothing happened.
- No replacement for source intake, transcripts, correspondence coverage,
  situated writer's voice pages, task tracking, or source custody.
- No new database, public route, private browser, event bus, background collector,
  scheduled job, synchronization service, or new source access.
- No automatic task assignment, contact, calendar entry, accepted offer,
  employment transition, public claim promotion, merge, deployment, or indexing.
- No acceptance of another proposed RFC and no operational migration of the
  existing changelog from implementation authorization alone.

## Terminology

**Event:** a source-bounded occurrence in the world. A draft is not a sent message;
a meeting is not a collective mandate; a proposal is not an agreement.

**Attributed report:** what an identified speaker or sender reported. Its
existence as speech and the truth of its subject matter are separate claims.

**Understanding change:** an explicitly authored revision in interpretation,
including a narrowed conclusion, a newly recognized constraint, or a useful
uncertainty. It is not evidence of another person's unspoken intentions.

**Operating artifact:** something made usable, such as a draft or a verified
tool. Its existence does not establish external adoption or a lived outcome.

**Correction:** a new entry that identifies an earlier entry, the specific field
being corrected, the reason, and the new evidence. It is not a silent rewrite.

**Current-state projection:** a purpose-specific summary of eligible graph
records, with an exact evidence basis. “Current” describes its basis, not its
truth, authorization, or completeness.

**Material change:** a difference consequential enough to alter a working
interpretation, constraint, available option, responsibility, or decision basis.
Importance is a reasoned judgment, not a numeric impact or wellbeing score.

## Detailed design

### 1. Component boundary and graph placement

The changelog is a history of evidence-linked understanding, not a fourth
canonical source store. Use the distinctions in
[RFC 0005](./0005-three-layer-knowledge-graph.md) without accepting that
exploring proposal by implication.

| Relationship | Target and meaning | What it does not establish |
|---|---|---|
| `about` | Resolved, typed semantic entity: person, team, project, event, opportunity, practice, or commitment | A mention is not ownership, consent, intent, or an assigned task |
| `supports`, `complicates`, `contradicts` | Evidence pin plus exact passage and a bounded support statement | A source's existence is not proof of every claim in it |
| `custody_ref` | Opaque identifier resolved only in an authorized custody scope | Access permission or a public navigation link |
| `corrects` | Earlier entry plus field and reason | Erasure of earlier understanding or automatic global retraction |
| `informs` | Candidate person/project/practice/current-state or weekly-review projection | Automatic promotion, publication, or commitment |

The graph, evidence, and custody roles retain their own authority. A changelog
entry cannot cite itself as independent evidence for its factual content.
Cross-system packets follow local authority and minimum disclosure, as proposed
in [RFC 0006](./0006-federated-knowledge-exchange-and-release-receipts.md).
Packets transport understanding; they do not manufacture truth.

### 2. When an entry earns a place

During an already authorized workflow, ask whether the evidence changes:

- what happened or what is now possible;
- the best supported interpretation of a relationship or project;
- an accepted responsibility, a constraint, or a relevant working practice;
- the provenance or reliability of evidence on which earlier work relied.

If not, preserve the source's disposition in its source workflow without
manufacturing an IRL entry. “Leave nothing on the cutting room floor” requires
accountable source coverage; it does not require flattening every utterance into
a consequential transformation.

One entry should express one intelligible change. Related changes may share an
event identifier or source without becoming duplicate facts. A large meeting
may support several entries; many messages may support one entry. Deduplicate
by evidence, subject, and meaning, not by timestamps alone.

The human interface should ask for the changed picture, its significance, its
limits, and its evidence—not require manual completion of every machine field.
Adapters supply verified identifiers, pins, timestamps, and review references.
An explicit “no further evidence needed for this purpose” is a valid
`next_evidence` statement; it does not manufacture a follow-up obligation.

### 3. Entry contract

Stable identity is `ledger scope + entry ID`. Existing local identifiers remain
valid; cross-ledger composition adds a namespace, not a renumbering. Prefer
opaque generated IDs for future concurrent writers. A ledger also declares one
`observer_id`: whose learning history it records. That identity is stable across
ordinary appends. It is not the author of every source and does not describe
what every participant knew. Multiple observers need separately attributed
histories, not a merged institutional mind.

| Field | Required meaning |
|---|---|
| `id`, `kind` | Stable identity; event, attributed report, understanding, operating artifact, or correction |
| `event_time` | Source-supported start/end dates, or explicit unknown with a reason |
| `learned_on`, `learning_time_reason` | When the named observer learned this; use null plus a reason when unknown, never an inferred date |
| `recorded_at` | Actual append time, in UTC; a ledger IANA timezone interprets local dates |
| `before` | Earlier picture plus basis: earlier source state, retrospective comparison, or explicit unknown |
| `now` | Narrowest defensible changed picture |
| `consequence` | Why the difference matters for working understanding |
| `limitation` | What the record does not establish, including live alternatives |
| `next_evidence` | What would resolve uncertainty; explicitly not an assigned task |
| `about` | Typed, resolved entity references, or an unresolved disposition |
| `evidence` | Source pin, passage, relation, support type, and limitation |
| `corrections` | Earlier entry, specific field, and reason; empty for ordinary entries |
| `attribution` | Required for attributed reports: person reference and the matching source passage |

Earlier-source comparisons must cite both sides where available. If the earlier
picture is reconstructed now, label it retrospective instead of inventing an
earlier belief or date. A limitation is substantive prose, not merely “uncertain.”

An attributed-report source or operating artifact cannot establish external
occurrence merely because a caller labels its support as “occurrence.” Source
classification and passage entailment must agree; human review still verifies
both against the actual source.

A reference source pin uses an immutable revision, content digest, source kind,
and opaque custody reference. The source workflow verifies actual bytes and
authorization. A 40-character revision and 64-character digest that pass a
pattern check are **not** proof that the source was fetched, read, or certified.
Other source systems require an explicitly designed adapter, not a fabricated
Git revision.

Current source eligibility is resolved separately from immutable pin identity.
A source may become restricted without changing the historical bytes it once
supported. That change blocks reuse; it does not retroactively grant permission.
A global `permitted` flag is only a coarse custody precondition. It cannot
establish that a particular recipient, purpose, or transformation is appropriate;
projection requires the additional contextual review defined below.

The [machine-readable contract](./0016-irl-changelog-and-changes-in-understanding.contract.json)
defines the bounded reference vocabulary. The revised synthetic record contract
is version 2 and rejects version 1 rather than silently adding meanings to old
fixtures. This is not a version change to any existing operational ledger.

### 4. Two historical questions, three recorded coordinates

Separate “what happened then?” from “what did this observer understand at the
time?” Append time additionally establishes when that understanding entered this
record. These are not three independent truth databases. The learning date is a
bounded assertion about an identified observer; recording time is write metadata.
Only the latter can normally be assigned automatically at append.

Ordinary known-date entries require event end no later than learning date, and
learning date no later than the local calendar date of recording. Append order
is monotonic in recorded UTC time. A newly discovered old event appears as new
learning about an older event. The same event can have different learning times
for different observers; one person's receipt does not establish another's.

Martin Fowler's [bitemporal-history explanation](https://martinfowler.com/articles/bitemporal-history.html)
distinguishes actual history from record history and cautions that the added
complexity must earn its place. Our additional distinction between human learning
and system recording is a project-specific design choice, not a claim that his
pattern requires three clocks. Keep it only where it answers a real question.

Unknown dates are explicit and held for contextual review, not converted into
today's date. Unknown learning uses `learned_on: null` and a substantive
`learning_time_reason`. It holds that entry's use for review, not every unrelated
subject view. No activity log, Git commit, or source modification time may fill
this gap by assumption.

A future scheduled event can be the subject of a report made
today; its future occurrence remains unestablished. The event being logged in
that case is the scheduling/reporting event, not the future meeting.

Corrections do not backdate the operator's knowledge. They name the earlier
entry and preserve the later time at which its limits became apparent.

### 5. Lifecycle, correction, and current state

The conceptual lifecycle is:

`candidate → structurally eligible → human-reviewed understanding → selected projection`

Held and denied candidates retain a disposition in the authorized intake
workflow. Denial here means “do not append/promote this candidate,” not “delete
the source.” A structurally eligible entry can still be factually wrong. Reference
snapshots can contain held candidates; using one supported subset does not
approve the entire snapshot or authorize storage of its contents.

A human review receipt must bind the exact entry, source revisions, graph
resolution, reviewer, time, decision, and limitations. The reference evaluator
does not issue such receipts. Later changes invalidate their use for a new
candidate.

Ordinary writes are additive. Prior entry content and source pin identities
must remain exact prefixes of the accepted history. Compare against an
independently selected prior checkpoint, not merely whatever a rewritten
working tree calls HEAD. Source eligibility is a current custody decision,
not a frozen historical grant.

Corrections target earlier entries only, name the field affected, and cite their
basis. “Latest wins” is not an adequate interpretation rule: two sources may
remain in conflict, and correcting timing need not retract the rest of a
conversation. A correction to a correction is another visible, backward-linked
entry.

A current-state projection records its entity scope, the ordered entry IDs it
considered, the ledger fingerprint, its source/permission checks, and its human
review status. Its relevant basis includes directly related entries, the earlier
entries they correct, and all later corrections to that connected history. Follow
these links to a fixed point, regardless of subject labels; preserve append order
in the resulting basis. A correction-first view must include the historical target,
just as an older subject view must include its later corrections.

Malformed identity, chronology, or history makes the snapshot structurally unsafe
and holds projection globally. Missing evidence, unresolved references, unknown
dates, or restricted sources in an otherwise valid snapshot hold the dependent
view. An unrelated held entry must not block that view or be deleted to unblock
it. Do not silently omit a relevant held dependency to manufacture completeness.

The reference evaluator hashes canonical JSON with recursively sorted object
keys and preserved array order. It conservatively marks a changed whole-ledger
fingerprint stale; a later implementation may optimize invalidation only if it
preserves correction and restriction propagation. A matching fingerprint alone
is insufficient when the declared basis omits a relevant correction.

A fresh basis yields only a `current-candidate`. It does not judge the generated
prose, choose among disputed interpretations, or authorize public use. A stale
page may remain a labeled historical edition; it must not present itself as
verified current understanding. Even a current candidate means only “current for
this declared subject and use,” not “the complete or official picture.”

### 6. Relationships, voices, and review interfaces

A person page may link to changes that concern that person. A situated writer's
voice page retains cited speech and its context. The changelog should link to
that situated reading where relevant, while distinguishing the person's words
from the operator's later interpretation. Merely appearing in another person's
message does not establish a speaker's view. Correcting the operator's
interpretation must not rewrite the speaker's preserved words.

Provide three reading depths within the authorized scope: a concise current
picture with its as-of basis; the changes and competing interpretations behind
it; and the governed evidence/history. People, projects, and practices are useful
entry points; chronology is another navigation option, not the graph's organizing
principle. Held material remains discoverable through an appropriate private
coverage/disposition view, without leaking it into an unrelated summary.

Maggie Appleton's [digital-garden essay](https://maggieappleton.com/garden-history)
connects evolving notes through context rather than publication order and makes
unfinished understanding visible. The design inference here is to keep history
available without requiring readers to traverse it all. Borrowing that principle
does not import a learning-in-public policy for entrusted correspondence.

Source workflows in [RFC 0013](./0013-governed-audio-to-knowledge-workflow.md) and
[RFC 0015](./0015-governed-correspondence-readings.md) can propose candidates
during authorized work. This RFC neither authorizes collection nor declares
those workflows complete. It also does not turn an automatic transcript or
speaker label into certified evidence.

The [finite weekly review proposal](./0014-finite-weekly-review-and-sustainable-commitment-protocol.md)
may consume changelog entries to ask what changed. Retained uncertainty and
`next_evidence` do not become next-week commitments. Zero new commitments is
valid. No chronicle of activity is a score of Jamie's life.

The shared-memory principles in
[RFC 0009](./0009-wiki-as-shared-memory-protocol.md) remain compatible: retain
source-aware perspectives and disagreement without pretending all participants
endorsed the synthesis.

### 7. Operational write contract — proposed, not implemented here

An eventual writer should require the expected prior ledger fingerprint,
validate an additive candidate, resolve authorized entity and source references,
and stage all derived outputs before replacing any current files. Commit the
ledger, Markdown, pointers, ledgers, and checksums as one validated generation.
A crash must leave a recoverable previous generation or an explicit incomplete
generation, not a falsely green mix.

Use a single-writer lock or compare-and-swap check. A stale writer retries from
the new head; it does not silently overwrite a concurrent append. An idempotency
key suppresses retry duplication, not distinct perspectives on the same event.
Git branch conflicts require reviewed resolution. Publication and collection
remain outside this writer.

Do not replace existing manual-edit conflict protection with an unconditional
renderer. “Append-only” is the ordinary history rule, not permission to retain
restricted material forever. A human-authorized retention/redaction exception
has a separate access-restricted procedure, impact review, recovery plan where
permitted, and a minimum-necessary audit disposition. No such exception is
automated or performed by this RFC.

### 8. Compatibility and migration

The existing bounded approach already supports separate event/observation dates,
source pins, comparison prose, append checks, generated Markdown, and checksum
coverage. Preserve it unchanged during proposal review.

| Existing concept | Proposed treatment |
|---|---|
| Local sequential entry IDs | Preserve; qualify with ledger scope at exchange boundaries |
| Observation date | Preserve verbatim; do not guess whether it was learning or recording time; map missing learning time to an explicit held unknown |
| Whole-entry supersession | Preserve legacy meaning; use explicitly scoped corrections for new entries after acceptance |
| Entity strings | Resolve through an adapter; unresolved references remain held |
| Evidence/support prose | Preserve; add typed relationships only after actual review |
| Markdown and checksum projections | Keep existing integrity/manual-edit guards; prototype atomic generation separately |

Version 2 of the synthetic reference contract is intentionally not a compatibility
adapter. Actual adapters, observer assignment, and contextual-review provenance
must be approved before any operational migration. Existing governed records and
the original evaluation receipt remain historical evidence, not outdated files to
rewrite for a green check.

A migration manifest must identify every old entry and source, its hash and new
mapping, all unresolved fields, and whether any semantics changed. Re-rendering
is not proof of equivalence. Never overwrite old entries to make them conform
to this reference fixture. No migration has been executed in this proposal.

### 9. Synthetic example and editorial pressure test

Entirely invented example: a team reports a delivery date. The operator records
a narrower planning assumption, with a limitation that delivery has not occurred.
Later evidence corrects the date. A new correction links the earlier entry;
a project summary based on the old entry becomes stale. Nothing in that chain
authorizes contacting the team, assigning work, or claiming successful delivery.
The executable fixtures use invented identifiers and contain no private cases.

The following are fictionalized analytical lenses, not quotations, real
participation, endorsements, or decision authority:

These readings refer to the original proposal and its revised sections. They are
editorial design inferences, not a simulated approval panel or a calibrated judge.

- **Abby Covert lens:** The relationship table usefully separates meaning,
  evidence, and custody, but a string labeled “resolved” is not sufficient
  identity validation. The reference now rejects matching-but-invalid entity
  types; actual graph resolution remains an adapter responsibility.
- **Vivian Gornick lens:** “Earlier picture” is the central literary and epistemic
  promise. A correction-first view that omits what it corrects breaks that promise.
  Section 5 now requires historical targets as well as later corrections. A
  retrospective comparison remains labeled, not passed off as an earlier belief.
- **Zora Neale Hurston lens:** The situated-voice provision protects attribution,
  but operator understanding must not become everyone's shared mind. The revised
  ledger identifies its observer and preserves each speaker's words separately
  from later interpretation. Disagreement remains a legitimate record.
- **Deborah Treisman lens:** The anti-busywork principle was stronger than the
  original reading interface. Section 6 now specifies reading depths, and the
  eval section distinguishes tested reference decisions from unperformed human
  close reading. Fifty passing examples would not establish fifty truths.
- **Maggie Appleton lens:** The original global hold made an unrelated incomplete
  entry prevent a useful subject reading. Section 5 now scopes ordinary evidence
  holds to dependencies, while Section 6 favors contextual entry points over a
  mandatory feed. Preservation and selective reading can coexist.
- **Martin Fowler lens:** Three required clocks risk false precision when the
  learning date is unknown. Section 4 distinguishes the two historical questions
  from recording metadata, identifies the observer, and gives unknown learning
  a held representation. It does not introduce a new temporal database.
- **Helen Nissenbaum lens:** “Private” and “permitted” are not complete use
  policies. The privacy contract below records source context and requires a
  current review for the specific recipient, purpose, and transformation. A
  changed use requires a new review even when no public release is planned.

The three source essays inform these design questions; none establishes the
authors' agreement with this RFC. The existing four lenses remain alongside
the three additions, with no change to human decision ownership.

### 10. Evals and hill climbing

Run `npm run hillclimb:irl-changelog-rfc` for the focused gate. The synthetic
reference evaluator returns `deny`, `hold`, or `eligible-for-human-review`;
none grants authority. Projection evaluation returns `hold`, `stale`, or
`current-candidate`.

Deterministic cases cover authority expansion, date ordering, citations and
pins, unresolved entities, unsupported occurrence, attribution, additive history,
scoped correction, and projection freshness. The close-reading revision adds
observer identity, unknown learning, valid entity types, correction ancestry,
dependency-scoped holds, and contextual-use matching. Negative cases must fail for the
intended boundary. A red/green development receipt identifies the exact tested
candidate. CI runs the focused gate before the broader portfolio suite.

Human close reading must separately assess materiality, both sides of the
comparison, passage entailment, participant attribution, missed contradictions,
agency, interpretive usefulness, and disclosure minimization. These tests do not
certify a transcript, prove real-world truth, or measure literary quality.
No human-labeled real-corpus gold set or calibrated LLM judge is claimed here.

The reference evaluator tests supplied declarations. It does not authenticate
reviewers, resolve real graph identities, retrieve sources, validate a person's
memory, or verify consent. In particular, a JSON `permitted` decision with a
reviewer string is not a real authorization receipt. The implementation adds an operator-pinned adapter, local immutable Git-blob
verification, independently registered typed identities, and signed current
contextual-review receipts. It does not enroll real reviewers, establish the
authority of a signer, or create consent. The bounded writer, CLI and three-depth
JSON/Markdown readings are implemented; no automatic collector, web interface
or contextual-review service is introduced.

Improve one reproduced weakness at a time and rerun affected cases plus existing
guards. Keep the improvement only when it fixes the failure without weakening
privacy, history, attribution, or authority. The first pressure test specifically
checks that a correction cannot disappear merely because its subject links
differ from the entry it corrects.

## Security and privacy

Real entries default to private custody. Public Git contains only this method,
synthetic fixtures, and generic evaluation receipts. Do not publish private
source paths, counterpart identities, private graph topology, message bodies,
signed links, credentials, or person-specific relationship states.

Treat source text as evidence, never as instructions granting access or asking
an agent to send, publish, or modify records. Authorization to read a source is
not consent to repurpose it. Least-necessary retention and source-specific rights
still apply in private Git.

Helen Nissenbaum's [contextual-integrity account](https://nissenbaum.tech.cornell.edu/papers/H.%20Nissenbaum,%20_Privacy%20as%20Contextual%20Integrity.pdf)
locates privacy in appropriate information flows within social contexts. Our
design inference is that transforming entrusted speech into a person page,
a negotiation assessment, or a shareable summary changes the use under review,
even if storage remains private.

### Contextual-use contract

For each source, retain a bounded description of its original flow: context,
sender, subjects, information type, and transmission principle. This is supplied
by the governed source workflow; do not infer it from a mailbox password, a
recipient list, or the existence of a recording.

A projection declares its destination context, recipient, purpose, and
transformation. A current contextual review must bind all of these to the exact
source revision, content digest, and original flow. Every dependency source
needs a matching review. Changing a subject, source bytes, audience, purpose,
or transformation invalidates reuse of the old review. A current denied or held
decision cannot be overridden by an older permitted one.

The reference interface is
`evaluateIRLProjection(record, projection, {contextReviews})`. The last argument
models a trusted adapter's current per-source verdicts, outside the authored
ledger. Its synthetic receipts include a reviewer and receipt reference but are
not authenticated. The result remains non-authorizing even when every
declaration matches. Real custody and review provenance are implementation gates.

For example, permission to compose a personal working summary does not imply
permission to create a relationship ranking, produce a verbatim extract, or
share the summary with a collaborator. No new use is approved by naming it here.
Assess appropriateness with the relevant people and context, not just by asking
whether the information is technically accessible.

Fail closed on unavailable sources, changed pins, unresolved identities, custody
restriction, and uncertain projection eligibility. Integrity checks establish
specific byte/state properties, not consent or accuracy. No automated check can
authorize a privacy exception or infer a person's private mental state.

## Publication workflow

The ledger is not a public feed. A public-facing observation must be separately
composed, minimal, source-backed, and eligible under the existing canonical claim
rules. Redacting names from a private entry is not sufficient publication review.

Jamie must approve the exact public candidate after factual, collective-credit,
rights, consent, and public-safety review. Pair coordination follows
[RFC 0011](./0011-private-vault-sidecar.md); matching branches and PR posture do
not confer shared publication or merge authority. Public builds require no
private checkout or authenticated source.

## Rollout plan

1. **Accepted for implementation:** the September 6 implementation request
   advances this RFC to implementing. Runtime, CLI and synthetic regression tests
   are delivered; existing operational records stay intact.
2. **Separate migration approval:** select a bounded adapter pilot, checkpoint
   old history independently, and approve field mappings and unknown handling.
   A read-only migration plan does not satisfy this gate.
3. **Implementation pilot:** start with one writer and a recoverable generation,
   source/identity resolution, and trustworthy current contextual reviews. Add
   concurrent-writer machinery only if demonstrated use requires it; do not
   weaken crash recovery or manual-edit protection in the smaller pilot.
4. **Projection pilot:** bind one current-state page to exact entry IDs and a
   declared use. Verify correction ancestry, later corrections, relevant source
   restrictions, and changed recipient/purpose invalidate its basis, while
   unrelated held entries do not prevent a supported view.
5. **Observation:** review usefulness and burden during ordinary authorized work;
   do not create a monitoring schedule by implication.

Rollback disables the new adapter/consumer and restores the verified previous
generation where permitted. Preserve new entries and their dispositions for
reconciliation rather than deleting learning to recover an older schema.

## Decision gates

- **Acceptance — Jamie:** approve materiality criteria, correction semantics,
  private scope, contextual-use expectations, and the unresolved questions below.
  Satisfied for implementation by the September 6 explicit implementation request;
  this does not satisfy the following gates.
- **Migration — Jamie:** approve a bounded corpus, reversible mapping,
  independently pinned baseline, and unknown-field treatment.
- **Operational — Jamie with evidence:** require source/identity resolution,
  exact-candidate tests, human reading of representative cases, crash recovery,
  and observed correction propagation plus changed-use review exercises.
- **Publication — Jamie plus applicable rights/consent owners:** approve each
  separate exact public candidate. Neither an operational ledger nor a paired
  PR can satisfy this gate.

## Drawbacks

The model adds review burden and can become repetitive if every source fragment
is promoted. Structured fields can disguise weak interpretation. Retrospective
comparisons can invent an earlier certainty. Conservatively invalidating a whole
ledger can make many summaries stale. Immutable history can conflict with
retention obligations unless exceptions are governed. A second automated writer
introduces concurrency and recovery costs before it creates useful understanding.
Context descriptions can become bureaucracy or false precision if users must
invent missing norms. Keep explicit unknowns, adapter-supplied metadata, and
scoped human review; do not turn privacy into a checkbox recital.

## Alternatives

- **Only Git history:** simplest infrastructure, but edit diffs do not preserve
  event/learning distinctions or a reasoned account of what changed.
- **Only weekly reviews:** useful synthesis, but discoveries between reviews and
  correction lineage can disappear.
- **Only mutable current-state pages:** low reading burden, but silently loses
  earlier reasoning. Retain these as projections with a history basis.
- **Log every message automatically:** superficially complete but duplicates
  source coverage, inflates significance, and increases disclosure and review risk.
- **A new event-sourcing service:** potentially powerful, but disproportionate
  to this bounded need and outside this proposal's implementation scope.

## Unresolved questions

- What few examples does Jamie consider consequential enough to log, including
  changed constraints, conscious non-pursuit, and meaningful non-work life?
- Which existing graph resolver should own typed identity and unresolved aliases?
- What independent checkpoint and retention policy should protect accepted
  history without freezing restricted content forever?
- Which first current-state page is worth the maintenance burden of a pilot?
- When is conservative whole-ledger invalidation too noisy, and what evidence
  would justify narrower dependency tracking?
- Who may issue and revoke contextual reviews for each source family, and how
  will a real adapter verify those current decisions independently of the writer?
- Which held unknowns merit further investigation, and which should remain
  permanently unknown without imposing work on unrelated subject views?
