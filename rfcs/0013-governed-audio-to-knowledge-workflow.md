---
rfc: 13
title: Governed Audio-to-Knowledge Workflow
stage: implementing
start_date: 2026-09-04
authors:
  - Jamie Burkart
  - Codex, AI-assisted drafting
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - privacy-governance
  - research-operations
  - developer-experience
  - editorial
implementation: scripts/audio-workflow/cli.mjs
supersedes: []
superseded_by: null
---

# Governed Audio-to-Knowledge Workflow

> **Implementation boundary**
>
> Jamie Burkart accepted this RFC and authorized its implementation on
> 2026-09-04. Acceptance does not itself authorize source access, recording
> acquisition, external upload, known-speaker reference use, publication,
> deployment, or use of an unrelated call. Every processing run still requires
> bounded job authority.

## Summary

Define one resumable, provider-adaptable workflow for turning authorized audio
recordings into governed Knowledge Wiki updates without collapsing source
custody, machine transcription, diarization, repair, interpretation, or public
projection. The workflow inventories every observed artifact, preserves source
bytes and hashes, operates on derivatives, records external-transfer authority,
retains immutable provider output, represents speaker uncertainty honestly,
produces a conservative source-linked repair, and writes a private close reading
before any separately reviewed public candidate.

Automation may perform deterministic inventory, hashing, derivative creation,
provider submission after a per-job gate, export collection, validation,
candidate binding, and private draft generation. It may not infer standing
consent, silently name speakers, certify its own repair, discard an artifact,
publish, quote, attribute, contact a participant, or turn private understanding
into a public claim.

## Motivation

Call records arrive through different devices and applications. One
conversation may be split across files after a dropped connection; another may
have a recorder original, a normalized derivative, several provider exports,
and separate participant-facing and private repairs. Manual handling makes
predictable failures likely:

- a fragment can disappear between discovery and transcription;
- a convenience conversion can overwrite or obscure the original;
- an external upload can occur without a recorded privacy gate;
- a provider panel can be mistaken for a completed export;
- diarization labels can be treated as established identities;
- a plausible repair can exceed the audio evidence;
- a participant-facing omission can be mistaken for private deletion;
- a close reading can lose its source and claim lineage;
- a retry can create duplicate artifacts; and
- a private record can be projected publicly without a distinct review.

Recent bounded call-preservation work demonstrated that a complete private
record is compatible with restrained outward disclosure, but required manual
reconciliation across these stages. The desired outcome is a smaller operator
mental model with stronger evidence: one manifest, one state machine, explicit
receipts, no silent loss, and no automatic expansion of authority.

## Goals

- Standardize intake, preservation, context collection, transcription,
  diarization, repair, close reading, Knowledge Wiki update, and verification.
- Account for every observed recording fragment and every derived artifact.
- Preserve original bytes and provider exports unchanged with SHA-256 receipts.
- Make transformations reproducible and keep segment order explicit.
- Support multiple transcription providers through a narrow adapter contract.
- Resume safely after interruption without duplicate uploads or artifacts.
- Keep unknown and uncertain speakers visible rather than inventing identity.
- Make every repair traceable to audio, provider output, and segment boundaries.
- Keep record, attributed statement, interpretation, inference, contradiction,
  and open question distinct in the Knowledge Wiki.
- Default complete call records and close readings to permissioned private
  knowledge while requiring a separate public-projection packet.
- Fail closed on missing authority, incomplete custody, stale receipts,
  credentials, destructive transforms, or attempted automatic publication.

## Non-goals

- Do not authorize recording, source access, external transfer, or processing
  merely because this RFC exists.
- Do not build a mailbox, Apple Notes, cloud-drive, or recorder-volume crawler.
- Do not make a transcription provider the canonical archive.
- Do not promise perfect recognition, diarization, or speaker identity.
- Do not silently clean up grammar, remove repetition, reconcile disagreement,
  or reconstruct missing audio.
- Do not make private Git an unrestricted raw-audio or raw-export vault.
- Do not publish transcript text, private close readings, participant names, or
  protected context.
- Do not contact participants for correction or consent automatically.
- Do not convert a successful run into consent, endorsement, legal sufficiency,
  publication clearance, merge approval, or deployment authority.
- Do not retroactively claim that all historical calls have been discovered or
  processed.

## Terminology

**Call family**
: The bounded set of recording fragments and contextual artifacts believed to
  represent one conversation or one explicitly grouped sequence. The boundary
  records accounts, devices, locations, dates, queries, and cutoffs.

**Source original**
: An observed recording file retained byte for byte in source custody. It is
  read-only, checksum-bound, and never the target of normalization or repair.

**Processing derivative**
: A reproducible copy created for format, channel, loudness, size, or provider
  constraints. Its recipe and source hash are recorded.

**Provider export**
: The unchanged transcript, diarization, timing, and metadata returned by an
  external or local transcription system.

**Conservative repair**
: A derived readable transcript corrected only where audio, timing, provider
  output, and bounded context support the change. Uncertain, overlapping,
  inaudible, truncated, and missing material remains visibly marked.

**Private close reading**
: A source-linked interpretation for Jamie's private working understanding. It
  distinguishes direct record, attributed report, interpretation, inference,
  contradiction, and open question.

**Projection packet**
: A separately reviewed, minimum-necessary public candidate with its own
  wording, sources, rights, consent, credit, audience, and human authority.

**Job receipt**
: An immutable record of one stage's inputs, outputs, tool or provider version,
  hashes, timestamps, status, limits, and unresolved conditions.

**Revisit queue**
: A body-free, private planning register for historical transcript and recording
  families that may benefit from the current method. Each discovered candidate
  has a disposition, dependency state, evidence basis, priority, and next safe
  action. Priority is sequencing metadata, not processing authority.

## Detailed design

### Historical discovery and revisit queue

Historical backfill begins with a bounded discovery receipt, not a crawler or
an implied processing job. The receipt records the searched source classes,
queries or routing rules, access method, cutoff, materialization limits, and
known blind spots. It may inventory private candidate families in a private
sidecar, but the public repository retains only the generic method and its
evaluation state.

Every observed candidate receives exactly one disposition:

- `queued` when a bounded future revisit is useful;
- `reference-current` when it is a control demonstrating the latest method;
- `held-participant-restriction` when a restriction forbids further processing;
- `out-of-scope` when it is not an audio-recording transcript family; or
- `unresolved` when source identity or custody cannot yet be responsibly
  established.

A queue item records source IDs, current transcript and audio state, method
version and gaps, dependencies, evidence basis, disposition, priority, a
defect-specific revisit trigger, and one next safe action. It does not contain
raw dialogue, protected locators, provider IDs, credentials, or public
projections.
An unavailable or dataless source remains a custody state rather than becoming
an absence claim. A message-thread projection, official third-party transcript,
or media attachment is not silently promoted into the recorded-call queue.

Current-method controls are not backlog. Participant-restricted holds are not
actionable. A priority label cannot authorize source access, materialization,
external transfer, transcription, voice-reference use, preservation, quotation,
publication, or contact. Those gates remain explicit and per job.

### Authenticated cloud recovery

When local custody exposes a dataless placeholder or unreliable directory, a
bounded job may use an authenticated browser as a read-only fallback only when
the active authority permits that account and source family. The receipt records
the access surface, exact folder route or submitted query, candidate count,
cutoff, observed file kind and size, download outcome, and every unresolved
condition. It never stores credentials, session material, protected URLs, or
unnecessary account identifiers.

A cloud listing is not preservation. The workflow distinguishes
`cloud-listed`, `confirmed-empty`, `recovered-and-hashed`,
`technically-readable`, and `download-timed-out`. A listed object may establish
that a local placeholder is not negative evidence. A cloud-reported zero-byte
object is an empty source, not a materialization failure. A download counts as
recovered only after its exact bytes enter private source custody outside Git
and receive a SHA-256 receipt. A timeout remains unresolved even when the
provider shows a file size.
Technical readability does not establish transcription completion, diarization,
speaker identity, listening review, or content certification.

The fallback is read-only: it does not upload, edit, rename, move, delete,
share, change permissions, or bulk export. Recovered bodies never enter the
public repository and remain outside private Git by default. The queue may
retain body-free hashes, sizes, state transitions, and next actions; it may not
convert web access into content correctness, processing completion, speaker
identity, consent, or publication authority.

### One manifest and one state machine

Each authorized run starts with a private job manifest and a stable opaque job
ID. The manifest records scope, authority, call-family boundary, known source
systems, requested destination, and every stage state. It does not contain
credentials or unnecessary contact data.

The canonical stages are:

```text
intake -> inventory -> preservation -> preparation -> transcription
       -> diarization -> repair -> close-reading -> projection -> verification
```

A stage may be `not-started`, `held`, `running`, `complete`, `failed`, or
`superseded`. Downstream stages consume only complete, hash-bound upstream
receipts. Re-running a complete stage with unchanged inputs returns its existing
receipt. Changed inputs invalidate that stage and every dependent receipt.

### Implemented command surface

The runner exposes small composable subcommands rather than one opaque agent
action:

```text
plan       create or inspect the bounded job manifest
queue      discover and disposition historical candidates
inventory  enumerate artifacts and record dispositions
preserve   hash originals and verify read-only source custody
prepare    create reproducible processing derivatives
transcribe submit after the external-transfer gate and collect exports
diarize    map speaker clusters with explicit uncertainty
repair     produce a conservative, segment-linked repair candidate
wiki       draft the private close reading and graph updates
project    prepare a separately governed projection decision
verify     evaluate completeness, lineage, privacy, and exact receipts
```

These subcommands are implemented by `scripts/audio-workflow/cli.mjs`, invoked
as `node scripts/audio-workflow/cli.mjs <subcommand> ...`.
Each command supports a dry run, reads one explicit job manifest, writes only to
the stage's declared destination, and exits nonzero on a hold or denial.

### Intake and authority

The intake receipt records:

- the exact user request or other authority source;
- the authorized people, subject, date, accounts, devices, and locations;
- whether local inspection, preservation, external transfer, transcription,
  known-speaker references, and private retention are authorized;
- the intended private and outward audiences; and
- explicit prohibitions and unresolved permissions.

Authority is per job. A prior upload authorization, connected account, saved
browser session, or merged RFC does not authorize a new call. When an external
provider is requested, the runner pauses for the required private-data transfer
confirmation unless the exact active request already records it.

### Inventory and context collection

Inventory is read-only. It enumerates likely recording fragments and contextual
artifacts from the authorized locations, records access time and method, and
assigns every observed item one disposition: source original, derived input,
provider export, governed pointer, duplicate by hash, protected, inaccessible,
out of scope, or unresolved gap.

Context collection may use calendar, notes, messages, or Knowledge Wiki records
only within the authorized scope. Context can help bound chronology and repair
names or terms; it cannot prove that a scheduled call occurred, establish who
spoke, or override conflicting audio. Search misses remain scoped misses.

### Preservation and preparation

The source original remains in its appropriate source vault. The preservation
receipt records its byte size, media metadata, SHA-256, custody class, and
access result. The runner never writes tags, conversions, or transcript data
back into the original.

Preparation creates derivatives when a provider requires another format,
channel layout, duration, or size. A derivative receipt records the source
hash, exact command or library version, output hash, segment start and end,
and ordering key. Provider limits are adapter data rather than global
assumptions. For example, an adapter with a per-request size limit segments a
derived copy and preserves the reassembly order; it never segments the source
original destructively.

### Transcription-provider adapter

Each adapter declares:

- supported input formats and current size or duration limits;
- local or external processing status;
- model, version, response format, and chunking behavior;
- whether diarization and known-speaker references are supported;
- submission ID handling without committing protected provider locators;
- completion polling and export formats; and
- retry and rate-limit behavior.

The canonical evidence is the collected export, not a visible provider panel or
submission state. Provider transcript, timestamps, diarization, and metadata are
preserved unchanged. An interrupted or still-processing job remains held.

### Diarization and speaker identity

Generic labels such as `Speaker 1` are valid when consistently mapped across
segments. A named label requires supporting evidence and human review. Vocal
style, conversational role, filename, calendar invitation, or provider guess
alone is not sufficient.

Known-speaker reference audio is a separate sensitive input and requires
specific authorization. The adapter records that a reference was used, its
governed source ID, and its custody without embedding the reference in a public
receipt. Uncertain assignments remain generic or carry an uncertainty marker.

### Conservative repair

Repair never edits a provider export. It creates a new derived document with:

- links to the source-audio and provider-export IDs;
- stable segment and timestamp lineage;
- recorded speaker-label changes and reasons;
- visible `[inaudible]`, `[overlap]`, `[uncertain: …]`, `[truncated]`, and
  `[recording gap]` markers where appropriate;
- a repair log distinguishing recognition correction, diarization correction,
  punctuation for readability, and unresolved material; and
- a status that is never `audio-certified` solely by automation.

Automated assistance may propose corrections, but a correction survives only
when bounded evidence supports it. Context may resolve a proper noun; it may not
invent missing speech or silently harmonize contradictions.

### Close reading and graph update

The complete repair and private close reading are separate artifacts. The close
reading cites registered source IDs and uses explicit evidence states:

- direct record;
- attributed statement;
- documented interpretation;
- inference;
- contradiction; and
- open question.

The private graph records people, organizations, events, concepts, decisions,
commitments, corrections, restrictions, and public-projection candidates only
to the extent supported. It records what each source does not establish. A call
may update existing pages or create a bounded call page, but duplicate entities
must be resolved through stable IDs rather than name similarity alone.

### Automatic situated person-by-transcript readings

The September 5 extension makes person-level reading coverage part of the
accepted implementation. Each registered transcript has a disposition; every
observed speaker and explicitly mapped participant has one entry on a private
situated writer's voice page. A mentioned person is not thereby a speaker.
Unmapped or overlapping labels remain source-scoped unresolved identities.
The pages contain analysis about recorded language, never invented speech in
someone else's name or a claim of real participation in an analytical role play.

Each entry carries event context, source and person IDs, the source SHA-256,
speaker-assignment limits, fragment-specific timestamps, line citations, a
bounded specimen, interpretation, and what the evidence does not establish.
The engine rejects quotations outside that person's cited turn. It preserves
restricted-turn dispositions without repeating restricted substance. Both
restriction review and authored interpretation bind to the exact source bytes.
Changed bytes hold new extracts until restriction review is refreshed and mark
the old interpretation stale. Original transcripts are never overwritten.

`scripts/audio-workflow/person-reading-files.mjs` materializes deterministic
private pages and a transcript-to-person index from a declared manifest. It
discovers transcript-named Markdown only within explicitly listed local roots;
unregistered discoveries receive source-review holds, not an inferred identity
or a completed reading. Queue metadata without source text remains an explicit
gap. This is not an account crawler, background schedule, or claim of universal
historical coverage. Synthetic tests exercise the public implementation without
private access; a permissioned consumer may vendor the source-free engine.

The command surface is:

```text
voices --private-root <authorized-root> --manifest <relative-manifest> [--write|--check]
repair --manifest <job> --receipt <repair-receipt> --private-root <authorized-root>
       --voice-manifest <relative-manifest> [--write]
wiki --manifest <job> --receipt <receipt> --private-root <authorized-root>
     --voice-manifest <relative-manifest> [--write]
```

`voices` defaults to a non-writing plan. `--write` is idempotent and refuses to
overwrite manual changes or silently delete obsolete pages. `--check` fails
when the exact projection is stale. The `repair --write` command automatically
refreshes this projection for the job's explicit
`private_context.transcript_source_ids`: a repair cannot be recorded through
this CLI while silently omitting the person pages. It requires the private
manifest and source-access/preservation authority. Without `--write`, it plans
the refresh without changing either pages or the job. A successful refresh is
not yet a completed close-reading receipt.

The `wiki` command rechecks the projection before advancing close reading.
Both commands hold close reading when any required entry is merely
an automatic draft, stale, unattributed, missing, or restricted. The coverage
receipt binds the projection fingerprint to the repair-stage fingerprint **and
checks the actual repaired bytes**. The repair receipt must declare
`transcript_source_sha256`, an exact map from the job's source IDs to SHA-256s
of its repaired transcript artifacts. Missing or extra IDs, unavailable bytes,
and revision mismatches fail before projection writes. Copying an upstream
fingerprint into a receipt is not source verification. A complete-stage API
receipt also requires `source_binding_verified: true`; this is an assertion by
the trusted local runtime, not a cryptographic attestation against a malicious
operator editing manifests.

All supplied receipts are validated before page writes. An unchanged repair
retry retains a current close-reading receipt; changed source or projection
fingerprints invalidate it. An authored candidate without a matching reading
receipt is held as `person-close-reading-receipt-required`. Automated drafts
remain `person-close-readings-pending`, not editorial completion. Holds exit 2;
validation failures exit 1. Manual page edits are preserved and require review.

Legacy repair receipts without the artifact-hash map must be migrated from
verified local repairs; do not fabricate completion of upstream stages or
rewrite historical receipts to manufacture a fully complete job. The standalone
`voices` projection remains available for these legacy artifacts while their
workflow migration is held. The write sequence is deliberately fail-closed,
not a cross-file transaction: a crash after page refresh but before the job
write leaves the job unadvanced, and a retry rechecks both.

Historical gaps outside the bounded job do not block that job, but remain
visible in the full private index.

An automatic extract is not a substantive close reading. An authored,
source-checked candidate is not human approval, speaker certification, consent,
or publication authority. These states remain separate. Private checks enforce
freshness at the workflow boundary; continuous filesystem watching is not part
of this implementation.

### Projection and public update

Private completion ends at `ready-for-private-knowledge-update`. It does not
advance publication. A proposed public update requires a distinct projection
packet and human review of purpose, audience, minimum necessity, factual
support, privacy, quotation, attribution, rights, consent, collective credit,
and exact wording.

Public receipts may describe the generic workflow and its test state. They must
not reveal the private repository, protected job ID, participant identity,
record count, source locator, provider submission ID, transcript content, or
private graph topology.

### Idempotency, recovery, and observability

Artifact identity is based on job ID, role, source hash, transformation recipe,
and segment order. A retry cannot create a second canonical artifact with the
same identity. Conflicting hashes hold the job for reconciliation.

Logs contain stage, status, elapsed time, byte counts, non-sensitive error
classes, and receipt IDs—not transcript text, names, credentials, cookies,
tokens, source paths, or provider URLs. A failed stage leaves originals and
completed receipts untouched. Recovery resumes from the most recent unchanged
receipt.

## Security and privacy

Raw recordings, raw account exports, provider working files, credentials,
cookies, tokens, and sensitive binaries remain in source custody outside public
Git and outside private Git by default. Governed private Git may hold a complete
repaired transcript and private close reading only with explicit preservation
authority and reviewed private access, consistent with RFC 0011.

The system follows least privilege. It reads only declared sources, writes only
declared destinations, redacts logs, and treats authentication failure as a
hold—not an empty result. It does not store passwords, API keys, one-time codes,
saved-session material, or known-speaker samples in manifests or receipts.

Participant restrictions govern disclosure even when Jamie is authorized to
retain a complete private working record. Private retention does not establish
quotation permission, attribution permission, participant confirmation,
endorsement, representation, or public-interest necessity.

## Publication workflow

1. Complete and verify the private job through close reading.
2. Mark the job `ready-for-private-knowledge-update`, never `published`.
3. If outward use is desired, create a separate projection packet containing
   only the minimum necessary candidate.
4. Evaluate the packet against public-source, claim, privacy, rights, consent,
   attribution, credit, and language gates.
5. Obtain Jamie's explicit decision for the exact wording and surface.
6. Update the public repository through its own branch, checks, review, and
   merge decision.
7. Preserve the private source record regardless of whether the projection is
   revised, rejected, published, or later corrected.

No workflow stage sends a participant-facing transcript, contacts a speaker,
publishes, deploys, indexes, or merges automatically.

## Rollout plan

1. **Contract, queue pilot, and evals:** preserve this proposed RFC,
   machine-readable contract, deterministic scenario suite, and a body-free
   private revisit queue. Do not process new audio merely because it is queued.
2. **Local dry-run prototype:** implement manifest parsing, inventory, hashing,
   and receipt validation using synthetic or expressly designated non-sensitive
   fixtures.
3. **Private retrospective:** with separate authorization, model one already
   completed call family without uploading or altering any source.
4. **Provider adapter trial:** test one authorized recording and one adapter;
   require the external-transfer gate and preserve the unchanged export.
5. **Repair and close-reading trial:** compare automated drafts against audio,
   record correction categories, and review false speaker assignments.
6. **Paired Knowledge Wiki trial:** create a private update and a separately
   held public projection candidate; verify public opacity.
7. **Observation:** measure artifact completeness, duplicate rate, repair error
   classes, operator burden, and privacy incidents before proposing
   `operational` status.

Rollback disables the runner and provider adapter while retaining source
originals, immutable exports, job manifests, receipts, and correction history.
Rollback never deletes or publishes a private call record.

## Decision gates

- Jamie must accept the RFC before implementation begins.
- Each job needs explicit source-access and private-preservation authority.
- Each external transfer needs active-job authorization and private-data
  confirmation.
- Each known-speaker reference needs specific authorization.
- Named speaker labels require supporting evidence and human review.
- Audio certification, participant confirmation, and corrections sent outward
  remain human processes.
- Private access changes remain Jamie decisions.
- Every public projection requires its own evidence, privacy, rights, consent,
  attribution, credit, wording, and surface review.
- Merge, deployment, indexing, contact, and publication remain separate human
  decisions.
- No deterministic or model-based evaluator may satisfy these human gates.

## Decision history

- **2026-09-04 — accepted:** Jamie Burkart explicitly instructed the project to
  accept and implement RFC 0013.
- **2026-09-04 — implementation opened:** the public-safe runner implements the
  stage machine, per-job authority checks, queue disposition checks, idempotent
  receipts, downstream invalidation, reason-coded holds, dry-run defaults, and
  body-free operator summaries. Private source maps, artifacts, job receipts,
  repairs, and close readings remain in their governed custody layers.
- **Operational status remains open:** processing a retrospective queue supplies
  implementation evidence, but `operational` still requires exact receipts for
  the final candidate and Jamie's later stage decision.

### Implementation hill climb

The first runner pass exposed a contract mismatch: a reason-coded hold appeared
in the JSON result but did not set a nonzero process status. A failing regression
test fixed the boundary. Holds now return status `2`, denials and invalid queues
return `1`, and completed dry runs return `0`. This lets orchestration stop on a
governed hold without treating it as either success or an unclassified crash.

## Drawbacks

- Manifests and receipts add work before the first readable transcript exists.
- Provider adapters require maintenance as formats, limits, and exports change.
- Conservative repair is slower than accepting plausible machine text.
- Complete private records increase the consequence of an access-control error.
- Fragment-level lineage can be cumbersome for long or frequently interrupted
  calls.
- Generic speaker labels may reduce immediate readability while identities are
  unresolved.
- Idempotent retries and exact-candidate receipts require more storage than an
  overwrite-in-place workflow.
- A strong deterministic gate cannot judge the literary or strategic quality
  of a close reading.

## Alternatives

**Keep the current manual process.** This avoids implementation cost but retains
the demonstrated risks of lost fragments, inconsistent receipts, repeated
uploads, and collapsed boundaries.

**Use one transcription provider as the archive.** This is simpler but makes
provider state, export affordances, retention, and diarization behavior a
single point of failure.

**Commit raw audio and every provider artifact to private Git.** This creates a
convenient single location but turns private Git into an oversized source vault
and increases accidental disclosure risk.

**Publish only summaries and discard full private repairs.** This minimizes
retention but destroys entrusted context, correction paths, contradictions, and
the evidence needed to revise future understanding.

**Fully automatic repair and publication.** This is rejected because speaker
identity, ambiguous audio, privacy, quotation, consent, attribution, and public
purpose cannot be safely inferred from pipeline completion.

## Unresolved questions

- Which manifest schema and command package should become canonical after RFC
  acceptance?
- Which source-vault locations and retention schedules should adapters support?
- Should the first adapter be a local transcription CLI, an external API, a
  browser-only provider, or two adapters tested against the same fixture?
- What human review interface best supports audio playback beside segments,
  provider output, repair history, and speaker-label changes?
- Which repair-error taxonomy should be measured before an operational trial?
- What threshold of changed words or speaker assignments requires a second
  human review?
- How should revoked access, source deletion requests, and retention conflicts
  be represented without erasing audit history?
- What observation period and incident-free evidence should be required before
  considering `operational` or `recommended` status?
