---
rfc: 14
title: Governed Audio-to-Knowledge Workflow
stage: implementing
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
  - source-custody
  - developer-experience
  - editorial
implementation: "private:audio-workflow.2026-09-04"
supersedes: []
superseded_by: null
---

# Governed Audio-to-Knowledge Workflow

> **Acceptance and authority boundary**
>
> Jamie accepted this RFC and authorized bounded private implementation on
> September 4, 2026. That decision authorizes the named transcript-revisit
> migration pass and private source custody needed for it. It does not authorize
> external upload, participant contact, deletion, public projection,
> publication, or deployment. Those remain separate per-job human gates.

## Summary

Define one resumable, idempotent workflow for turning an authorized set of call
recordings into governed Knowledge Wiki updates:

```text
intake
  -> immutable audio custody
  -> bounded context packet
  -> transcription and diarization
  -> unchanged service export
  -> separately repaired edition
  -> source-cited close reading
  -> private graph update
  -> private human review
  -> separately authorized public projection, if any
```

The workflow treats a dropped and reconnected call as one call family with
multiple fragments, not as either one silently concatenated file or unrelated
meetings. It preserves exact audio, provider output, editorial repair, and
interpretation as different artifact layers. It holds incomplete provider jobs,
records uncertainty rather than inventing speech or speaker identity, defaults
knowledge updates to the private graph, and requires an independent human gate
before any public candidate exists.

This pull request contains the RFC, a machine-readable contract, deterministic
state evaluator, and adversarial cases. The paired private implementation adds
an executable preservation, audit, build, status, and verification surface plus
one stage-by-stage receipt for every bounded queue item. It does not contain or
authorize a live provider connector.

## Decision record

On September 4, 2026, Jamie, the named decision owner, explicitly requested:
“Please accept and implement the RFC” and “Work through the entire queue,
bringing all up to our latest standards.” The implementation therefore advances
the RFC to `implementing` and authorizes bounded source access and private
processing for the existing 46-entry queue.

Acceptance does not collapse the remaining gates. In particular:

- no transcript or audio may be uploaded to a third party without a specific
  action-time authorization for the named source and destination;
- an inaccessible body remains an explicit held record;
- a processed queue receipt is not audio certification or participant review;
- no public projection, publication, deployment, deletion, or participant
  contact is authorized; and
- `operational` remains a later decision after human review and observed use.

## Motivation

### September 5 extension: automatic returns to each person's voice page

Jamie requested a cited close-reading entry for every transcript and every
person in that person's situated writer's voice graph page. This extends the
accepted private workflow; it does not authorize publishing the corpus or
modeling a participant's voice as if they authored new speech.

The coverage key is **transcript edition plus attributed person**, not a
meeting-level summary. Normal private audio refresh, build, and render commands
generate the entries and reciprocal transcript/person links. CI checks coverage
and staleness; it never fetches private sources from the public repository.

Each observation must locate an attributable passage by artifact ID, source
checksum, line span, timestamp where present, fragment/section, and segment
checksum. Repaired and service editions stay distinguishable. Mentioning a
person does not make that person a speaker. Tentative names, room voices, and
overlaps get edition-scoped unresolved entries, not guessed identities. Plain
named labels retain an explicit timestamp gap. Editorial notes containing words
such as “speaker” or “group” cannot become speaker identities. A known
participant without attributable speech receives a gap entry; a missing body
without a roster retains an unresolved census.

The first automatic pass produces **rhetorical reading candidates**: questions,
qualifications, contrasts, conditions, collective address, examples, sequence,
repairs, boundaries, and acknowledgements. These observations describe local
language, not stable personality, health, authority, acceptance, or consent.
Substantive interpretations may be added as separately cited editorial records.
Candidate creation alone cannot mark the close-reading stage complete. Existing
keyword counts are source-audit hints, not a substitute for close reading.

The automatic return must also expose an editorial queue covering every entry:
source or attribution needed, substantive reading needed, or a substantive
candidate awaiting review. An existing paragraph cannot hide an unfinished
reading. Candidate coverage and substantive coverage are separate measures.

An authorized local refresh may checksum-audit a newly available edition of an
already registered transcript before returning it to the graph. This is additive
source registration, not blanket discovery or semantic approval. Missing or
changed prior editions stop the refresh before derived output is replaced;
unregistered source bodies are not read by this bounded refresh. Corrections
require an explicit edition and attribution decision, not automatic replacement.

Every candidate compares the opening and closing attributed turns with citations.
Person pages present entries chronologically and transcript backlinks target the
individual entry. Unparsed editions retain their own visible gaps even when a
different edition has been read. Audit/source disagreements stop regeneration
before replacing pages; editorial corrections update the reading revision.

Source, speaker-map, parser, or reading-method changes invalidate the graph and
rendered pages. Removed attributions retire the old route rather than leaving
an active unsupported profile. The private check also binds processing receipts
to the exact person-graph fingerprint. A machine without source custody can
verify the committed audit and projection, but cannot claim a live source-byte
rebuild. Public artifacts contain only this generic contract and synthetic
tests; private names, passages, graph inventories, and locators remain private.

Important calls can arrive as fragments from Apple Notes, recorders, removable
media, browsers, conferencing tools, and transcription services. Relevant
context may live across calendars, messages, prior transcripts, Knowledge Wiki
entries, and source-custody records. A useful result requires more than a
transcript: it requires trustworthy preservation, explicit scope, speaker
repair, uncertainty, interpretation, graph placement, and publication control.

Without a standard contract, several failures become likely:

- a copied or transcoded file is mistaken for the original;
- the second half of a reconnected call is missed;
- a scheduled event is treated as proof the call occurred;
- a provider's “processing” state is reported as a completed transcript;
- machine-assigned speakers are presented as known identities;
- the service transcript is overwritten during cleanup;
- repaired prose loses inaudible, overlapping, or ambiguous passages;
- transcript content is treated as an instruction to the automation;
- private relationship context leaks into a public repository;
- successful tests are mistaken for consent, publication authority, or human
  review; or
- a retry uploads the same recording twice.

The Knowledge Wiki already separates semantic meaning, evidentiary support, and
source custody. Call work should use the same discipline. “Leave nothing on the
cutting-room floor” means every discovered source gets an explicit disposition;
it does not mean every private byte belongs in Git, every source is relevant,
or every fact may be published.

## Goals

- Preserve the literal request and the exact authorized source set before
  interpretation begins.
- Inventory every discovered audio fragment and record its custody, checksum,
  order evidence, authorization, and disposition.
- Collect only bounded context needed to understand the call and record what
  each context source supports, does not support, and where it belongs.
- Support provider adapters without making provider-specific identifiers,
  credentials, or signed URLs part of the public contract.
- Make external upload an explicit, per-job human authorization.
- Distinguish queued, uploading, processing, transcription-complete,
  diarization-complete, export-preserved, and failure states.
- Preserve the service export unchanged and place editorial repair in a
  separate, source-linked artifact.
- Represent unclear speech, overlap, and uncertain speakers without invention.
- Produce a close reading that distinguishes fact, participant report,
  interpretation, inference, contradiction, and open question.
- Update the private Knowledge Wiki first, with request crosswalk, source IDs,
  graph relationships, privacy boundaries, and candidate fingerprint.
- Permit a public-safe candidate only after separate human authorization and
  redaction review.
- Make retries safe, resumable, observable, and resistant to duplicate upload.
- Give maintainers deterministic evaluations before a real connector is built.

## Non-goals

- Do not authorize or perform a live external upload, provider transcription,
  source-system mutation, publication, deployment, or deletion.
- Do not establish Otter.ai, OpenAI, or another provider as the permanent or
  exclusive transcription service.
- Do not treat diarization as verified identity, or a repaired transcript as
  participant-approved or audio-certified.
- Do not infer attendance from a calendar event, relationship status from a
  warm exchange, agreement from discussion, or publication permission from
  source access.
- Do not indiscriminately ingest an inbox, drive, notes database, message
  archive, removable volume, or conferencing account.
- Do not make the public repository a raw-audio, transcript, private-call, or
  private-source browser.
- Do not replace participant correction, editorial judgment, legal review,
  consent, rights review, or Jamie's release authority with automated checks.
- Do not automatically delete local, provider, custody, or Git artifacts after
  a successful run.
- Do not promise universal source discovery. The workflow proves the bounded
  search and dispositions it actually completed.

## Terminology

**Call family:** One communicative event and all its discovered recording
fragments, including fragments created by a dropped connection or recorder
restart.

**Exact audio:** The byte-preserved source recording registered at intake. It is
immutable and identified by checksum, byte size, format, and a protected
custody locator.

**Derived upload copy:** A separately checksummed copy created only when a
provider requires splitting, transcoding, normalization, or a size-compatible
representation. It never replaces the exact audio.

**Context packet:** A bounded set of pre-call, same-day, and relationship or
project sources selected for interpreting the call. Every source has a
disposition and an evidentiary boundary.

**Service export:** The transcript, diarization, timestamps, and metadata
returned by the provider, preserved unchanged with retrieval time and checksum.

**Repaired edition:** A separate editorial derivative that corrects automated
transcription or speaker assignment while preserving decisions, source links,
and uncertainty.

**Close reading:** A source-cited interpretation of language, sequence,
relationship, decisions, tensions, changes, and open questions. It is not a
substitute for the underlying record or participant approval.

**Disposition:** The explicit state assigned to a discovered source or
fragment—for example preserved exact, preserved derived, governed pointer,
excluded as unrelated, held pending access, or explicit gap.

**Public projection:** A minimal public-safe composition derived from governed
private knowledge after a separate authorization. It is not a copy or
sanitization of a private transcript.

## Detailed design

### Job manifest

Each call family begins with a private job manifest. The manifest is the
resumption point and decision record, not a transcript. It includes:

- a stable job ID and call-family ID;
- the literal request and timestamp;
- bounded source systems and search roots;
- source-access authorization and exclusions;
- explicit external-upload authorization state;
- discovered and registered fragment counts;
- fragment sequence evidence and unresolved ordering;
- exact and derived checksums;
- provider, job state, attempt count, and private provider locator;
- service-export checksum and retrieval state;
- repair, close-reading, graph-update, and review states;
- every hold, denial, error, retry, disposition, and human gate; and
- the exact candidate fingerprint used for verification.

The manifest stores protected locators only in the authorized private or
operator-local layer. A public receipt may expose counts, state names, and
non-sensitive fingerprints, but not filenames that reveal participants,
provider IDs, local paths, signed URLs, or transcript bodies.

### State machine

The canonical sequence is:

1. `intake`
2. `audio-preservation`
3. `context-collection`
4. `transcription`
5. `service-export-custody`
6. `repair`
7. `close-reading`
8. `private-graph-update`
9. `private-review`
10. `public-projection-review` when separately requested
11. `public-candidate-review` when separately authorized and redacted

Every stage ends as `complete`, `held`, `denied`, `failed-retryable`, or
`failed-terminal`. A later stage cannot erase an earlier hold. A run resumes at
the earliest incomplete stage after revalidating the upstream fingerprints it
depends on.

`complete` means the stage's evidence exists. It does not mean the participant
approved it, the RFC was accepted, the workflow was published, or a later gate
was satisfied.

### Audio discovery and preservation

Discovery is bounded to the source systems, date window, participants, and
search roots authorized for the job. For each candidate recording, the worker:

1. records where and how it was found without placing the protected locator in
   public Git;
2. captures byte size, media format, duration when readable, and checksum;
3. preserves the exact original without normalizing metadata or audio;
4. records whether the artifact belongs to the call family;
5. establishes fragment order from recording metadata, timestamps, content,
   or an explicit unresolved state; and
6. assigns a disposition even when the artifact is duplicate, unrelated,
   inaccessible, corrupt, or missing.

Hash equality may establish byte identity, but duplicate custody copies do not
become independent corroborating sources. Concatenation, compression,
transcoding, channel mixing, or size splitting creates a derived upload copy
with its own checksum and parent relationship.

No automatic cleanup follows preservation. Deletion or no-retention requires a
separate explicit human decision and any governing legal or contractual rule.

### Bounded context collection

Context collection begins only after the audio register is complete. The job
declares which contextual questions matter—for example participant identity,
call purpose, prior commitments, referenced documents, relationship history,
or the state of a proposal—and searches only the authorized surfaces needed to
answer them.

Each context record states:

- source ID, date, evidence class, and custody class;
- why it was selected;
- what it supports;
- what it does not establish;
- whether it is exact, derived, pointer-only, inaccessible, duplicate, or
  excluded; and
- public, private, or source-custody placement.

A calendar invitation supports a scheduled state, not occurrence. A recording
supports occurrence within its captured interval, not necessarily the full
scheduled duration. Later participant reports remain participant reports unless
independently corroborated. An inaccessible or slow-to-materialize source is an
explicit gap, not silently omitted.

### Provider adapter and transcription

Providers implement one narrow adapter contract:

- `prepare`: validate accepted format and size without changing exact audio;
- `submit`: use a derived checksum as an idempotency input where possible;
- `status`: return normalized job and diarization states;
- `export`: retrieve the most complete available provider-native result;
- `verify`: checksum the unchanged export; and
- `receipt`: record attempts, timestamps, errors, and private provider state.

The deduplication key is `provider + derived-audio-sha256`. Before submission,
the worker checks the private job ledger for an existing provider job or
completed export using that key. A retry polls or resumes that job; it does not
upload the same bytes again unless a human explicitly overrides the collision
after review.

External upload always requires affirmative authorization for the exact job,
provider, source set, and purpose. Prior account access or prior upload consent
does not silently authorize another recording. Credentials, session cookies,
provider IDs, and signed URLs remain outside public Git.

Provider states normalize to `not-started`, `queued`, `uploading`, `processing`,
`complete`, `failed-retryable`, and `failed-terminal`. Diarization has its own
state. A transcript is not complete while either transcription or required
diarization is still processing.

### Unchanged export and repaired edition

The provider export is preserved exactly as received before repair. The receipt
records provider, retrieval time, format, size, checksum, and parent audio IDs.
No speaker rename, punctuation correction, whitespace cleanup, or format
conversion may overwrite this artifact.

The repaired edition is a different record. At segment level it preserves:

- stable segment and parent service-export IDs;
- timestamps when available;
- provider speaker label and repaired speaker label;
- original service text or a pointer to it;
- repaired text;
- decision type and rationale;
- confidence or uncertainty label; and
- reviewer and review state.

Allowed uncertainty labels include `unclear`, `speaker-uncertain`, `overlap`,
`inaudible`, `fragment-boundary`, and `possible-crosstalk`. The editor may fix a
word or speaker only when evidence supports the change. It may not invent
speech to make the conversation smoother. A full recording review may support
an audio-reviewed state; otherwise the edition must not claim audio
certification. Participant review is a later, independent state.

### Close reading

Close reading uses the repaired edition, unchanged service export, exact audio
where authorized and necessary, and bounded context packet. It records:

- what happened in the captured call and where fragment boundaries occur;
- decisions, offers, requests, commitments, refusals, holds, and unresolved
  questions in sequence;
- changes from earlier calls or messages;
- distinctive language and interaction patterns without exceeding quotation
  or publication rights;
- facts, participant reports, editorial interpretation, and inference as
  separate claim types;
- contradictions, uncertainty, missing context, and alternative readings;
- commercial, relational, legal, consent, and authority states without
  collapsing one into another; and
- the minimum necessary private knowledge needed for future work.

Every material assertion cites source IDs. A summary must not replace the
repair, service export, or exact audio. A close reading may be editorially
complete while participant correction and publication remain unrequested.

### Private graph update and public projection

The default destination is the paired private Knowledge Wiki. A complete
candidate includes:

- the original request and request-family crosswalk;
- source, artifact, communication-event, claim, contradiction, search, and
  coverage records as applicable;
- custody pointers and checksums;
- unchanged provider output and repaired edition in their authorized layers;
- the close reading and updated relationship or project pages;
- explicit gaps and corrections;
- privacy review, evaluation profile, and hill-climb receipt; and
- a candidate fingerprint bound to the verification run.

The public repository may receive only a separately composed projection. That
projection requires its own purpose, audience, source basis, human
authorization, and privacy review. It must not contain raw transcript text,
private participant identity, relationship state, protected locator, provider
identifier, or a graph edge whose combination reveals the private source.

The direction of projection is private knowledge to a minimal public candidate.
The public evaluator or a public page-owner review never gains access to the
private relationship record merely because the repositories share a branch.

### Implemented operator surface

The first private implementation exposes small, composable preservation,
auditing, receipt-building, status, and verification commands. Provider-specific
transcription remains held behind its separate adapter and authorization gate:

```text
audio-job preserve
audio-job audit
audio-job build
audio-job status
audio-job verify
```

Each command is safe to rerun and fails closed when the queue census, authority
boundary, state sequence, or summary drifts. The provider adapter remains an
unimplemented extension point: external upload, source mutation, deletion, and
publication require exact authorization and cannot be inferred from a passing
private migration run.

### Transcript revisit queue

Adopting the workflow requires a migration queue for transcripts created under
earlier methods. Discovery is bounded to named corpus manifests, governed
source records, and explicitly searched repositories. It does not begin by
copying transcript bodies or walking every personal source system.

Each deduplicated queue entry records:

- stable queue and source-record IDs;
- discovery corpus, date, and minimum-necessary title;
- current custody, exact-audio, service-export, diarization, repair,
  close-reading, and graph states;
- whether the item is preserved, unavailable, partial, automated-only,
  superseded, held, or ready for an RFC 0014 layer audit;
- priority and the reason for that priority;
- the next human, custody, recovery, repair, or method-audit gate; and
- false-by-default processing, upload, public-projection, and publication
  authority.

Priority describes review urgency, not permission or execution order:

- `P0` — recent, active call families with enough custody to audit immediately;
- `P1` — missing, partial, automated-only, identity-questioned, held, or
  publicly relied-on transcript records that need a bounded recovery decision;
- `P2` — preserved legacy editions that need layer-separation and custody
  audits before being called current-method records; and
- `P3` — low-urgency records retained for future review.

Duplicate working-tree copies, public-safe source notes, and private corpus
records must converge on one source record when evidence shows that they refer
to the same transcript. A duplicate is recorded in the discovery receipt, not
added as a second obligation. An inaccessible body remains a queue entry with
an explicit next gate.

Building or reprioritizing the queue authorizes no source access, audio review,
external upload, repair, participant contact, public projection, or deletion.
The September 4 implementation request is a separate bounded authority receipt
for source access and private processing of these 46 entries. Each entry
re-enters the RFC state machine through the earliest unmet gate and retains that
hold even after its current-method processing receipt is created.

#### Authenticated remote discovery

When local cloud files are online-only, slow to materialize, or incomplete, a
separately authorized authenticated browser may support a bounded read-only
inventory. The discovery receipt must name the exact surface inspected, visible
item count, matching-record count, deduplication result, search capability,
search-completeness state, and limitations. It must not preserve credentials,
session data, protected locators, or transcript bodies.

A visible Recents list, favorite folder, or selected directory is a bounded
surface, not a provider-wide search. If search requires enabling another device,
new account capability, or a verification flow that was not completed, record
search as unavailable and incomplete. Do not claim completeness, activate the
feature, or substitute another browser merely to remove the limitation.

Remote visibility may correct `unavailable` to `visible but not custody
receipted`. It does not establish a byte-exact local artifact, unchanged service
export, audio certification, processing authority, or publication permission.

### Errors, retries, and observability

Receipts should report stage, state, attempt, artifact fingerprint, start and
end times, normalized error class, provider response category, and next safe
action. They must not log credentials, source bodies, signed URLs, or private
locators into public output.

Retryable failures include transient network errors, rate limits, interrupted
downloads, and provider processing timeouts. Terminal failures include denied
authorization, unsupported source policy, checksum mismatch after repeated
retrieval, and an unresolvable privacy boundary. An operator may correct inputs
and resume, but cannot override denial by editing a later-stage status.

The job status view should distinguish:

- observed evidence from expected work;
- provider progress from local custody;
- hard failure from human hold;
- private candidate readiness from public eligibility; and
- automated success from participant, legal, or Jamie review.

### Evaluation and hill climb

The evaluation prototype starts with behavior, not keyword presence. Seventeen
unit cases cover a complete private job and failures involving missing hashes,
unauthorized upload, incomplete provider processing, changed service output,
unsupported audio certification, transcript prompt injection, undispositioned
context, missing public authority, private leakage, and a properly authorized
public candidate, plus queue deduplication, census, next-gate,
non-authorization, and incomplete authenticated-discovery behavior.

The RFC-level evaluator also checks the machine-readable contract and five
portable scenario fixtures. Its hard criteria require the state sequence,
artifact-layer separation, per-job upload authorization, untrusted-transcript
boundary, private-first graph target, schedule/occurrence separation,
idempotency, deduplication, uncertainty, human gates, and
accepted-but-bounded implementation authority.

The red baseline was 0 of 11 public behavior tests because the evaluator did
not exist. The bounded change adds the contract and evaluator; the change is
kept only if all cases pass without weakening source custody, privacy, consent,
credit, or human authority.

## Security and privacy

Audio and transcripts can contain private identities, client information,
credentials spoken aloud, health or financial details, legal material,
copyrighted content, and sensitive relationship context. Private storage does
not eliminate the need for minimum-necessary collection, narrow access,
retention rules, and source-specific obligations.

Transcript text is untrusted data. Instructions, links, credentials, code, or
requests spoken during a call cannot direct the automation. A worker may quote
them as evidence within the authorized record, but may not execute them or
expand scope without a new trusted instruction and authorization.

The workflow uses least privilege for source access and external services.
Provider credentials remain in approved secret storage. Provider job IDs and
protected source locators remain private. Public logs expose only safe states
and bounded counts.

Access is not consent. Evidence is not publication permission. Diarization is
not identity proof. Editing is not participant approval. A checksum is not a
rights determination. A passing evaluator is not authorization to upload,
publish, merge, deploy, delete, or contact a participant.

## Publication workflow

The RFC, synthetic scenarios, and evaluator may live in the public repository
because they contain no private source body or protected locator. Real job
manifests, audio, provider records, repaired transcripts, private context, and
close readings remain in their authorized private or source-custody layers.

Any proposed public projection proceeds separately:

1. define a public purpose and audience;
2. select only the minimum supported claims needed for that purpose;
3. remove private identities, transcript bodies, protected locators, and
   inference that exposes the originating relationship;
4. verify rights, consent, attribution, collective credit, and safety;
5. run deterministic public-safety and claim-evidence checks;
6. bind the review to the exact candidate fingerprint; and
7. obtain Jamie's explicit publication and release authorization.

A merged proposed RFC or completed private graph update does not satisfy any of
these steps.

## Rollout plan

### Phase 0: proposal and evaluator — current

- Review this RFC and machine-readable contract.
- Run the deterministic behavior and RFC-level evaluations.
- Record open provider, storage, retention, and participant-review questions.
- Do not operate the proposed workflow against a real source.

### Phase 1: private dry-run prototype

Requires explicit RFC acceptance and implementation authorization.

- Implement manifest validation, bounded inventory, hashing, and no-upload
  dry-run status.
- Use synthetic or specifically authorized fixtures.
- Prove repeat runs are idempotent and do not duplicate artifacts.
- Threat-model transcript prompt injection and public/private leakage.

### Phase 2: one authorized call-family canary

Requires a new per-job source-access and external-upload decision.

- Use one bounded call family and one provider adapter.
- Preserve exact, derived, service, repair, and reading layers separately.
- Exercise failure, resume, duplicate detection, and provider export recovery.
- Complete private human review; make no public projection by default.

### Phase 3: paired-worktree integration

- Bind private job and public-safe receipt state to the same named branch.
- Keep protected locators, bodies, and identities private.
- Verify that public checks can run without private repository access.
- Document recovery when only one paired repository is available.

### Phase 4: operational decision

- Review canary evidence, security, cost, provider terms, correction burden,
  and retention behavior.
- Accept, revise, or close the workflow through an explicit human decision.
- Mark it operational only after repeated real use demonstrates reliable
  custody, repair, and handoff.

Rollback stops new jobs and external submissions while preserving existing
authorized custody and receipts. It does not automatically delete artifacts or
rewrite history.

## Decision gates

- **RFC acceptance:** Jamie decides whether the design may advance beyond the
  proposal and evaluator.
- **Implementation:** Jamie authorizes the exact private prototype scope and
  repository placement.
- **Source access:** Each job identifies authorized systems, roots, date window,
  and exclusions.
- **External upload:** Each job names the exact provider, source set, and
  purpose before submission.
- **Provider terms and security:** Human review confirms acceptable handling,
  retention, deletion, and account controls.
- **Participant correction:** Any request for review or correction is a
  separate decision; absence of review remains visible.
- **Private graph candidate:** A human reviews the exact repaired edition,
  reading, claims, gaps, and fingerprint.
- **Public projection:** A human separately authorizes a minimal public-safe
  composition.
- **Publication and release:** Jamie approves the exact public commit and any
  deployment or indexing action.
- **Deletion or no retention:** A separate explicit human decision applies the
  relevant source, legal, contractual, and backup policy.

Automation may stop, hold, deny, retry, draft, and evaluate. It may not satisfy
a human gate by changing a status field.

## Drawbacks

- The layered record creates more files and metadata than a simple transcript.
- Full audio review and careful speaker repair are time-intensive.
- Provider-neutral adapters may obscure useful provider-specific features.
- Idempotency and resumability require durable private state and migration care.
- A private-first default can delay public updates even when the final claim is
  harmless.
- Detailed receipts can themselves reveal sensitive patterns unless their
  public form is minimized.
- Fragment sequencing and context selection still require judgment; a state
  machine cannot remove ambiguity.
- The workflow may encourage collecting more context than needed unless the
  bounded question and disposition gates remain strict.

These costs are justified only for calls important enough to enter the
Knowledge Wiki. Lightweight calls may receive a pointer and explicit
disposition without full transcription or close reading.

## Alternatives

### Keep only the provider transcript

Rejected because it loses exact-source custody, provider errors, editorial
provenance, and a reliable path for correction.

### Edit the service transcript in place

Rejected because the original output becomes unrecoverable and editorial
choices become indistinguishable from provider evidence.

### Concatenate every fragmented call before preservation

Rejected because it destroys the fragment-level source record. A derived
joined copy may be useful for a provider, but exact fragments remain canonical.

### Use one universal transcription provider

Deferred. A narrow adapter allows provider choice based on file limits,
diarization, privacy, cost, and export quality while keeping the governance
contract stable.

### Publish redacted transcripts directly from the private sidecar

Rejected. Redaction alone can preserve identifying combinations and excess
private detail. Public output should be a purpose-built projection.

### Fully automate speaker repair and close reading

Rejected. Automation may propose repairs and interpretations, but uncertainty,
participant identity, relationship state, and publication require review.

### Store all raw sources in private Git

Rejected. Private Git is a governed knowledge layer, not automatically the
right custody system for large, regulated, restricted, or separately retained
source artifacts.

## Unresolved questions

- Which private manifest schema and migration policy should become canonical?
- Which storage class should hold exact audio, derived upload copies, and
  provider exports for each source type?
- Which provider should be the first canary, and what account-level retention,
  deletion, training-use, and export guarantees apply?
- When should large files be split, compressed, or transcoded, and which audio
  properties must a derived copy preserve?
- What evidence is sufficient to replace a provider speaker label with a named
  person?
- Which repair decisions require full audio review, a second editor, or
  participant correction?
- How should quotation rights and participant correction requests propagate to
  prior derived artifacts?
- What retention schedule applies to provider-side copies and local staging
  files after verified export?
- What is the recovery procedure when a provider job exists but its local
  private receipt is lost, or when paired branches diverge?
- Which close-reading templates vary by domain—commercial, civic, editorial,
  legal, or personal—and which core fields remain invariant?
- What is the smallest safe public receipt that demonstrates method without
  exposing private provenance?
- Who besides Jamie may approve source access, participant outreach, deletion,
  or publication for future projects?
