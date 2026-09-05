---
rfc: 13
title: Governed Audio-to-Knowledge Workflow
stage: proposed
start_date: 2026-09-04
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
  - editorial
implementation: null
supersedes: []
superseded_by: null
---

# Governed Audio-to-Knowledge Workflow

> **Proposal and authority boundary**
>
> Jamie's direct instruction on 4 September 2026 authorizes this RFC draft,
> its machine-readable contract, and its deterministic evaluation. It does not
> authorize implementation, an external upload, access expansion, transcript
> acceptance, graph promotion, quotation, attribution, publication,
> deployment, indexing, assignment, source deletion, or merge.

## Summary

Standardize one manifest-driven, resumable workflow for authorized recorded
audio. A job moves through ten ordered stages: intake authorization, exact
source custody, bounded context collection, provider-input preparation,
provider transcription, diarization reconciliation, source-loyal repair,
private close reading, graph-projection candidate, and human disposition.

Every stage consumes hash-bound inputs, produces a durable receipt, and
invalidates its downstream lineage when an input changes. The complete private
record remains distinct from bounded tracked and public projections. The final
machine output is a candidate for human review, not canonical knowledge or
publication authority.

This RFC is a proposal. It defines the contract and evaluation for a future
runtime; it does not implement the runtime or any provider adapter.

## Motivation

Recorded conversations can carry context that ordinary notes omit: sequence,
hesitation, contradiction, repair, interruption, changes of mind, and the
difference between a proposal and an accepted commitment. They can also create
unusually high privacy, consent, attribution, and interpretive risk.

The Knowledge Wiki already distinguishes source custody, evidence,
interpretation, semantic relations, and reviewed projections. Audio needs the
same separation. Without one standard workflow, individual call-processing
efforts can drift on basic questions:

- Was the original preserved before it was transcoded or uploaded?
- Which exact bytes reached a provider?
- Was provider completion observed, or merely requested?
- Is a speaker identity machine-suggested, context-supported, or human-reviewed?
- Which context sources and cutoffs informed a repair?
- Was an unintelligible phrase preserved as uncertain or silently invented?
- Does a tracked summary map to a complete private record?
- Did a close reading distinguish speech, report, interpretation, inference,
  question, and proposed action?
- Did an extracted action become an assignment without acceptance?
- Did an interpretation become canonical or public without a human decision?

The observed need is an inspectable chain of custody and judgment from source
artifact to candidate knowledge. The assumption to test is whether one generic,
provider-neutral runner can reduce repeated manual work without making these
boundaries harder to see.

## Goals

- Preserve exact source recordings before any transformation.
- Bind every derivative and provider submission to source identity.
- Collect only authorized, minimum-necessary context with queries and cutoffs.
- Preserve exact provider returns separately from corrections.
- Treat diarization and speaker identity as evidence-bound candidates.
- Repair recognition and segmentation errors without inventing inaudible text.
- Preserve cadence, vernacular, contradiction, overlap, and uncertainty.
- Complete the private working record before producing a narrower projection.
- Make every close-reading proposition cite and classify its evidence.
- Produce graph candidates without automatic promotion.
- Resume safely after interruptions and invalidate stale downstream artifacts.
- Emit body-free receipts suitable for review in a public-safe repository.
- Keep the public application independent of permissioned operating material.

## Non-goals

- Do not implement the runtime or any provider adapter in this RFC change.
- Do not select a permanent transcription vendor.
- Do not initiate or imply an external upload.
- Do not certify audio, transcript wording, or speaker identity automatically.
- Do not infer consent from source access or authentication.
- Do not make a participant list proof that anyone spoke.
- Do not reconstruct missing or inaudible words.
- Do not turn extracted tasks into accepted assignments.
- Do not turn private retention into quotation or publication permission.
- Do not publish raw audio, private context, transcript bodies, or protected
  locators in the public repository.
- Do not make the public build depend on a permissioned operating companion.
- Do not delete sources merely because a derivative or transcript exists.
- Do not merge, deploy, index, or publish through a passing evaluation.

## Terminology

**Audio job**
: One content-addressed processing lineage for a stable recording identity,
  declared purpose, exact source hash, and workflow-schema version. A dropped
  and reconnected call may contain multiple ordered source segments.

**Stage receipt**
: A durable, body-free account of one transition: input and output identities,
  code and adapter versions, checks, limitations, human-gate state, and next
  allowed transition.

**Exact source**
: The original bytes copied into governed custody before transformation.

**Provider input**
: The exact zero-copy or transformed bytes submitted to a local or external
  transcription adapter, bound to the exact source.

**Exact provider return**
: The uncorrected output observed and preserved from a transcription adapter.
  It remains separate from normalized machine text and later repairs.

**Complete private repair**
: The full source-supported working transcript, including restrictions,
  uncertainty, gaps, segment boundaries, and the repair ledger.

**Bounded tracked projection**
: A narrower, explicitly governed derivative whose omissions map to retained
  private custody. It is not a substitute for the complete private repair.

**Private close reading**
: A source-cited interpretation produced only after an accepted repair
  candidate, with speech, report, interpretation, inference, question, and
  proposed action kept distinct.

**Graph-projection candidate**
: A proposed Knowledge Wiki change that has passed deterministic structure
  checks but has not been accepted into canonical graph state.

**Human gate**
: Evidence of an applicable human decision. A gate can be satisfied by a
  sufficiently specific active authorization; it does not always require a
  redundant interruption.

## Detailed design

### Hard invariants

The following are hard gates. A high aggregate score cannot compensate for a
failure in any one of them.

1. **Preservation precedes transformation.** No transcode, chunk, upload,
   transcription, or repair begins before exact source custody is verified.
2. **Artifacts remain distinct.** Source, provider input, provider return,
   machine text, complete repair, bounded projection, close reading, and graph
   candidate have separate identities and review states.
3. **Access is not consent.** Reading a source or authenticating to a service
   does not establish processing, circulation, quotation, attribution,
   publication, or deletion authority.
4. **Provider completion is observed.** A submission, queue, progress
   indicator, or provider page is not a completed return.
5. **Diarization is a hypothesis.** Machine labels remain candidates; an
   unknown speaker is preferable to false identity certainty.
6. **Repair is source-loyal.** Repair may correct supported errors but may not
   invent missing speech or harmonize contradiction.
7. **Private completeness precedes projection.** A narrow derivative can omit
   restricted material only after complete private custody is preserved and
   the omission is explicitly mapped.
8. **Interpretation does not become speech.** An inference or editorial
   synthesis cannot be rewritten as something a participant said.
9. **Projection is not promotion.** Automation produces graph candidates;
   humans accept, revise, hold, or reject them.
10. **Evaluation is not authority.** A green test grants no upload, assignment,
    organizational, quotation, publication, deletion, merge, or deployment
    permission.

### Ten-stage state machine

| Order | Stage | Required input | Durable output | Named stop condition |
|---|---|---|---|---|
| 1 | `intake-authorization` | purpose, processing basis, private destination, restrictions | authorized manifest candidate | authority or destination unresolved |
| 2 | `exact-source-custody` | manifest and source artifact | immutable copy, checksum, technical metadata | copy or checksum unverified |
| 3 | `bounded-context-collection` | source receipt and approved source scopes | context packet, query/cutoff manifest, blind spots | scope or cutoff missing |
| 4 | `provider-input-preparation` | exact source and adapter contract | source-bound submission object and receipt | bytes cannot be bound to source |
| 5 | `provider-transcription` | provider input and execution authorization | exact return, machine transcript, import receipt | return incomplete or unobserved |
| 6 | `diarization-reconciliation` | exact return and permitted speaker evidence | speaker candidates and uncertainty ledger | identity or review evidence missing |
| 7 | `source-loyal-repair` | machine text, speaker candidates, repair rules | complete repair, bounded projection, edit ledger | evidence or restriction unresolved |
| 8 | `private-close-reading` | accepted repair and bounded context | cited interpretation and open questions | repair unaccepted or inference unlabeled |
| 9 | `graph-projection-candidate` | accepted reading and graph schema | candidate packet and disposition ledger | schema, evidence, or authority failure |
| 10 | `human-disposition` | candidate and all prior receipts | accepted private update or named blocked state | decision owner has not accepted candidate |

No stage is silently skipped. A stage may instead produce an explicit no-op
receipt. If source bytes already satisfy an adapter, for example, the provider
input may reuse them while retaining a separate submission identity.

Every receipt records the job and stage IDs, attempt number, timestamps, input
and output hashes, byte counts and media types, applicable code, adapter, model,
prompt and dictionary versions, deterministic checks, human-gate state,
limitations, and next allowed transition. Blocked attempts are durable; a
retry appends an attempt rather than erasing the reason work stopped.

### Job identity, resume, and invalidation

The job key derives from stable recording identity, exact source hash, declared
purpose, and workflow-schema version. A meeting title is metadata rather than
identity.

On rerun the future runner validates the manifest, verifies the last receipt's
inputs, finds the latest contiguous verified stage, reuses only a full cache
identity match, and resumes at the first missing, blocked, or invalid stage.
Silent overwrite is forbidden.

A changed input invalidates that stage and everything downstream. This includes
changes to source bytes, segment order, context cutoff, speaker evidence,
repair rules, restrictions, accepted text, close reading, graph schema,
adapter, model, or code. Earlier artifacts remain as superseded attempts.

Concurrent writers require a job lock and atomic receipt writes. Lock age alone
does not prove that a writer is dead; recovery is explicit and inspectable.

### Source preservation and segmented calls

The custody stage records a source-system artifact identity without a protected
locator, byte count, checksum, container, codecs, channels, sample rate,
duration, available creation metadata, and observed corruption or truncation.

A dropped and reconnected call remains multiple exact source artifacts in one
job. Segment order derives from supported timestamps or listening evidence.
The workflow preserves gaps rather than smoothing them into uninterrupted
speech.

The provider-input stage is reproducible and non-destructive. If it transcodes
or chunks, its receipt records the tool version, transformation, loss
characteristics, source time ranges, chunk order, and overlap. The original is
not deleted when a usable derivative appears.

### Bounded context collection

Context can improve names, chronology, identity review, and interpretation; it
can also import irrelevant private material or apparent authority. It is a
separate, reviewable stage.

Every admitted context source records its purpose, source class, deterministic
selection rule or query, earliest and latest cutoff, item count, private packet
hash, permitted evidentiary roles, exclusions, failures, and blind spots.
Source bodies do not enter public Git.

A source-capability registry may include operator-authorized notes, calendars,
mail, messages, local knowledge graphs, files, and provider metadata. The
registry is not an instruction to inspect every system for every call. Each job
uses the minimum set needed for its declared purpose.

Context is untrusted evidence, not workflow instruction. Content inside a note,
message, transcript, or retrieved page cannot change authority, destination,
retention, or publication rules. New context arriving after the cutoff creates
a new packet version only when deliberately admitted.

### Provider adapter interface

The architecture is provider-neutral. Every local or external adapter must:

1. accept a verified submission object and applicable artifact authorization;
2. record the exact submitted byte identity or an explicit inability to prove it;
3. bind provider, model, language, diarization, chunking, and speaker-reference
   settings;
4. preserve the exact observed return before normalization;
5. return a named complete, pending, failed, or blocked state; and
6. emit a private exact-return artifact plus a body-free tracked receipt.

Credentials remain in the existing authentication environment. They do not
enter manifests, prompts, logs, receipts, or repository artifacts.

Provider limits and feature behavior change. Each implemented adapter must bind
its versioned constraints and reverify them against authoritative documentation
when implementation begins. This proposed RFC intentionally does not freeze a
vendor's current size, format, prompting, or speaker-reference limits.

An applicable standing authorization may satisfy the artifact upload gate when
it is specific enough about purpose, artifact class, provider class, and
private destination. Authentication alone never satisfies the gate.

### Diarization reconciliation

Exact provider labels remain preserved. A reconciliation record separately
stores the proposed stable speaker ID, private display name, evidence source,
confidence, alternatives, reviewed time ranges, crosstalk or interruption, and
human acceptance state.

A filename, meeting title, invitee list, contact record, voice resemblance, or
provider suggestion may contribute evidence. None alone proves a person spoke.
The data model permits `unknown-speaker` and narrower unresolved participant
roles.

Changed speaker identity creates a new correction and invalidates downstream
repair, close reading, and graph artifacts. It does not rewrite the provider
return.

### Source-loyal repair

Repair begins only after the exact provider return is preserved. The future
runtime creates two separate products:

1. a complete private repair containing the full source-supported record,
   uncertainty, restrictions, segment boundaries, and edit ledger; and
2. a bounded tracked projection whose omissions point to retained private
   custody without revealing protected material.

Permitted repairs include evidence-supported speaker boundaries, recognition
substitutions, names and domain terms, punctuation and casing, false sentence
breaks, duplicate chunk overlap, and verified segment chronology.

Substantive edits identify the machine span, candidate repair, evidence class,
confidence, and rule version. Unresolved content remains marked, such as
`[inaudible]`, `[overlapping speech]`, or `[speaker uncertain]`.

Repair preserves cadence, vernacular, code-switching, contradiction, and
meaningful hesitation. It does not standardize speech into an institutional
house voice. A readable transcript is not called audio-certified without the
required human listening review.

Participant-specific restrictions control projection. A general retention
policy cannot override them. A request not to record or retain becomes a named
human-resolution state, not an automatic deletion or automatic refusal.

### Private close reading

Close reading begins only after the repair candidate satisfies its human gate.
Every proposition cites transcript segment IDs and uses one of six classes:

1. `exact-speech` — source-supported wording within its authorized use;
2. `attributed-report` — what a participant says another person or group did;
3. `documented-interpretation` — a reading supported by cited passages;
4. `inference` — a reasoned but unconfirmed conclusion;
5. `open-question` — material uncertainty requiring evidence or judgment; or
6. `proposed-action` — a possible next step, not an accepted assignment.

The reading preserves changes of mind, contradiction, ambiguity, emotional
register, silence, interruption, and the difference between exploring an idea
and making a commitment. Machine-generated action items remain review inputs.

### Graph candidate and human disposition

The graph stage produces a candidate packet containing stable IDs, actor,
action, purpose, result and credit scope where applicable, evidence class,
source citations, support and uncertainty, privacy class, correction route,
change relationship, proposed disposition, decision owner, and explicit
non-claims about consent, endorsement, authority, commitment, and publication.

Automation may validate and render the packet. It cannot promote the packet to
canonical state. Jamie may accept, revise, hold, reject, or request evidence.

Public projection is outside this workflow. A later public candidate begins a
separate review of purpose, audience, source basis, privacy, quotation,
attribution, rights, consent, collective credit, organizational authority,
exact wording, and publication. The correct public result may be empty.

### Permissioned operating companion

The public RFC and contract contain no private source inventory, source body,
relationship record, protected locator, or private repository identity. A
separately permissioned operating companion may hold governed manifests,
complete private repairs, private close readings, restriction state, and graph
candidates. It may refer to the stable public projection ID.

The public application must build, test, render, and deploy without access to
that companion. The public graph has no resolvable backlink or diagnostic that
reveals whether a private edge or record exists.

### Automation and human gates

| Decision | Automation may prepare | Authority retained |
|---|---|---|
| Processing basis and destination | validate declared fields against a policy | Jamie resolves missing or conflicting authority |
| External provider use | prepare source-bound input and find an applicable authorization | a specific human authorization must cover the artifact |
| Speaker identity and repair | propose labels and edits with evidence | human review accepts or rejects accuracy claims |
| Close reading | draft cited classifications and questions | Jamie accepts, revises, or holds interpretation |
| Graph promotion | validate and render a candidate | Jamie accepts canonical private changes |
| Assignment or organizational position | surface explicit statements and uncertainty | the relevant person or organization accepts or adopts |
| Quotation, attribution, and publication | prepare a separately reviewable candidate | applicable rights, consent, restriction, credit, and publication gates remain human |
| Source deletion | identify a request and prepare a resolution packet | this workflow never performs deletion |

### Error recovery and observability

The runner reports stage, attempt, input identity, blocker, and next allowed
action. It never returns a generic success while provider return, review, graph
disposition, or publication remains pending.

Named recoverable states include unavailable source, checksum mismatch,
unsupported media, incomplete context cutoff, authentication required,
ambiguous upload, transcription pending, unavailable exact export, segment or
chunk ambiguity, unresolved speaker, listening review required, participant
restriction unresolved, disputed interpretation, and graph-schema failure.

Logs are body-minimized. They record artifact IDs, hashes, counts, durations,
state changes, and error classes without transcript text, correspondence,
credentials, private graph content, or protected locators.

### Proposed implementation components

If Jamie accepts this RFC, implementation should extend existing source,
artifact, evaluation, and graph-packet conventions with:

- a versioned audio-job schema and manifest validator;
- a content-addressed private artifact-store interface;
- preservation, inspection, provider-input, and segmentation stages;
- provider adapters behind one exact-return interface;
- a context-source capability registry;
- speaker-candidate and repair-ledger schemas;
- a private review interface with source-time playback;
- a close-reading evidence classifier and citation validator;
- a private graph-candidate builder;
- body-free tracked receipt rendering; and
- an inspection-first resumable command with explicit external-execution flags.

Existing one-off call repair scripts become migration evidence and fixtures,
not the permanent generic API.

## Security and privacy

Raw audio, exact provider-return bodies, machine transcript bodies, complete
private repairs, context bodies, credentials, signed URLs, contact data, and
protected locators remain outside public Git. Public tracked artifacts contain
only the generic contract, body-free receipts, public-safe synthetic fixtures,
explicitly approved bounded projections, and evaluation results.

The main risks are:

- source loss before transformation;
- accidental external upload from authenticated access;
- private text leaking through logs or failures;
- provider output being mistaken for corrected truth;
- false speaker identity from diarization or participant lists;
- editorial repair changing voice or meaning;
- interpretation being misrepresented as speech;
- private retention being treated as permission to quote or publish;
- machine action extraction creating obligations;
- canonical graph mutation without human review; and
- a public runtime dependency revealing permissioned topology.

The workflow fails closed at each risk. Participant-specific restrictions take
precedence over generic circulation rules. Exact source deletion is not part of
the runtime. Private access, recording authority, processing basis, retention,
quotation, attribution, publication, and deletion remain separate questions.

## Publication workflow

This RFC has no automatic public-content output. Public projection is outside
the audio job and begins only from a separately prepared candidate.

1. Complete and human-review the private repair and close reading.
2. Produce only a bounded public candidate from permitted evidence.
3. Prove that no raw audio, transcript body, private context, relationship
   state, protected locator, or permissioned topology entered the candidate.
4. Review quotation, attribution, rights, consent, collective credit,
   organizational authority, exact wording, and correction path.
5. Jamie approves or rejects the exact public candidate.
6. Merge, deployment, and indexing remain separate decisions.

A passing audio-workflow evaluation is never publication approval.

## Rollout plan

1. **Proposal and evaluator — complete in this change.** Add the RFC,
   machine-readable contract, provisional adversarial cases, and deterministic
   evaluator. No runtime or external action is included.
2. **Manifest and local custody runner.** After RFC acceptance, implement
   schema validation, source preservation, inspection, provider-input creation,
   locks, receipts, resume, and invalidation using synthetic audio.
3. **One provider adapter.** Implement a single adapter with explicit execution,
   applicable upload authorization, exact input identity, observed return,
   versioned constraints, safe retries, and exact-return preservation.
4. **Diarization and repair review.** Implement speaker candidates, edit ledger,
   uncertainty markers, private review interface, and reviewed fixtures.
5. **Close reading and graph candidates.** Implement evidence classes,
   transcript citations, contradiction checks, candidate construction, and
   Jamie's explicit disposition.
6. **Observation and refinement.** Measure failure modes on real but governed
   jobs before recommending a default.

Rollback of an implemented phase disables new execution while preserving exact
sources, prior outputs, receipts, and superseded state. Rollback never means
deleting custody history.

## Decision gates

- Jamie accepts or revises this proposed ten-stage model.
- Jamie confirms the relationship to existing retention and source-custody
  policies before implementation.
- Synthetic fixtures cover preservation, retries, segmentation, and leakage.
- Every external adapter requires an applicable artifact authorization and
  current provider-constraint review.
- A human accepts speaker and repair accuracy before close reading.
- A human accepts the close reading before graph-candidate construction.
- Jamie disposes each canonical graph candidate.
- Public projection, publication, merge, deployment, and indexing retain their
  separate gates.
- Passing evals do not advance any of these decisions automatically.

## Drawbacks

- Ten stages and durable receipts create more artifacts than an informal
  transcription workflow.
- Retaining originals, provider returns, and superseded attempts consumes
  storage.
- Provider completion and multiple human gates make apparent completion slower.
- A generic adapter interface can conceal provider-specific behavior unless its
  versioned constraints are actively maintained.
- Hash and lineage correctness do not establish transcript truth or fair
  interpretation.
- A review interface adds significant implementation and accessibility work.
- Operators may experience explicit blocked states as friction even when that
  friction is protecting authority or evidence.

## Alternatives

**Continue with one-off scripts** is fastest for the next call but repeats
policy and leaves resume, invalidation, and completion semantics inconsistent.

**Treat the transcription provider as the system of record** reduces local
work but makes provider state equal to project state and weakens custody and
repair provenance.

**Store every artifact in Git** makes versioning familiar but turns repository
history into a raw-media and private-body store. A private repository alone
does not make that appropriate.

**Use only local transcription** avoids external upload but does not solve
custody, diarization, repair, interpretation, restriction, or graph-authority
problems. It remains a valid adapter option.

**Fully automate graph promotion** reduces review time but can harden recognition
and interpretation errors into canonical knowledge or inferred obligations.

**Require a new approval prompt for every technical stage** makes authority
visible but creates review theater. The proposed model instead requires proof
that the gate is covered and permits a sufficiently specific active
authorization to satisfy repeated technical steps.

## Unresolved questions

- Which synthetic and already-reviewed recordings should become initial fixtures?
- Should the first adapter be local or external?
- What proportion of a call requires human listening before repair acceptance?
- Which private artifact-store interface best fits existing source custody?
- How should overlapping speech and multilingual passages be reviewed?
- What retention review interval applies to superseded derivatives when no
  participant-specific rule controls them?
- Which graph candidate classes, if any, may be reviewed in a batch?
- What evidence after real use would justify moving from `operational` to
  `recommended`?
