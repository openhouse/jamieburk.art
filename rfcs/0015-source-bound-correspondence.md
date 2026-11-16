---
rfc: 15
title: Source-bound correspondence readings and coverage
stage: proposed
start_date: 2026-09-05
authors:
  - AI-assisted working draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - privacy-governance
  - research-operations
implementation: scripts/mail-workflow/core.mjs
supersedes: []
superseded_by: null
---

# Source-bound correspondence readings and coverage

## Summary

Extend the private knowledge graph with one cited, message-situated encounter
per message and identified person or team. Bind readings to exact source
revisions, header identities and quoted segments. Generate linked person,
situated-voice, message and practices pages while preserving the difference
between a current representation and a completely reviewed mailbox inventory.

This design remains proposed. The bounded implementation follows Jamie's direct
request for correspondence analysis and evals; it does not declare a new
organization-wide default, authorize publication, or advance a human RFC gate.

## Motivation

Correspondence has several overlapping identities: mailbox, address, sender,
quoted speaker, recipient, team context and human author. Treating them as one
identity creates misattribution. A promising exchange can be mistaken for an
agreement; a loaded page can be mistaken for an entire archive. Both mistakes
would make relationship knowledge less trustworthy.

## Goals

- Every registered message has an explicit cited reading or an unresolved task
  for each identified participant and associated team.
- Interpretations cite the exact segment and source revision.
- People, teams, messages, voices and practices are traversable in private.
- Inventory completeness and analysis completeness are independently legible.
- Synthetic mutation tests enforce privacy and evidence boundaries.

## Non-goals

No public mailbox browser, public relationship directory, personality scoring,
sensitive-trait inference, mailbox administration, autonomous credential storage,
scheduled ingestion, external destination access or publication approval.

## Terminology

A **capture** is a preserved representation with a declared fidelity class.
A **message** is a retained incoming, outgoing, draft or automated record, not
proof of delivery. A **situated reading** is an attributed report or documented
interpretation from a particular occasion, not the subject's self-authored page.
A **recipient-context entry** records receipt/context without attributing the
sender's language to the recipient. A **hold** is an unmet evidence requirement.

## Detailed design

The public engine accepts private-authorized input containing entities, a
service/domain/account inventory, folder counts, message metadata and readings.
An isolated private adapter reads sources from safe repository-relative paths.
It verifies captures, evaluates the graph and projects managed Markdown blocks.
Authored notes outside those blocks are preserved. Retired inputs withdraw
generated findings without deleting authored notes or history.

Each message header binds author, recipients, displayed date and subject to its
hashed capture. Authored, quoted, signature and automation segments remain
distinct. Missing and changed-source readings become explicit tasks; they never
receive fabricated interpretation. Separate delivery records remain separate,
even when their body text is identical.

Own-voice, needs, strengths, aptitudes, affordances, kindness and expressed
interests require own-authored evidence. These labels describe source-bounded
expressions, never sensitive traits or universal character. Recipient and team
context may document a relationship or process without claiming authorship.
Team speaking authority requires independently verified collective authorship.

Every reading records limits, source ID, checksum, segment and exact specimen.
Dates and source IDs join private pages; no private graph is required to compile
the public site. Operator summaries omit subjects, identities and body text.
Even those summaries remain private if their counts reveal protected activity.

Completion requires verified live service/domain/account scope, actual mailbox
access, folder enumeration, settled message counts reconciled to registered
records and complete readings. A migration spreadsheet is only a lead.
Thread/listing counts are not message counts. Unverified aliases, catch-alls
and forwarding destinations remain holds; a forwarder never grants access.

## Security and privacy

Credentials, session material and live authenticated URLs are prohibited inputs.
Credential fields inside serialized captures are checked after parsing.
The adapter rejects path traversal, symlinks and unmanaged output collisions
before writing. Quoted markup is escaped so rendered passages cannot activate
remote images. This is defense in depth, not a guarantee that arbitrary free
text cannot contain a secret; private intake review remains necessary.

Keep raw mailbox exports and unabridged source custody outside Git. Private Git
contains minimum-necessary derived evidence, capture limitations and pointers.
Read-only is an operating boundary unless the provider enforces it technically.
Opening mail may mark it read; do not claim flag preservation without evidence.
Do not bypass browser or provider security restrictions. Pause retrieval and
request user review; record failed exports and unverified logout accurately.

## Publication workflow

All correspondence and derived relationship pages stay private by default.
No public projection is added. Access is not consent; evidence is not publication
permission. Jamie must separately approve public wording, attribution, rights,
relationship disclosure and publication. Passing tests cannot satisfy these gates.

## Rollout plan

1. Validate the shared engine against synthetic adversarial fixtures.
2. Use the private adapter for a bounded authorized corpus and expose holds.
3. Review each cited interpretation, identity and capture limitation.
4. Expand only through authorized source access with reconciled folder coverage.
5. Keep public/private branch names, PR titles, bases and draft posture paired;
   commits, checks, reviews and merges remain independent.
6. Roll back the engine/adapter together and regenerate affected managed blocks;
   retain source custody and authored notes. No live mailbox state is changed.

## Decision gates

The decision owner must approve any operational/default RFC advancement.
Deterministic checks establish structural integrity, not exhaustive retrieval,
human editorial approval, source authenticity or consent. Whole-corpus
completion remains a separate nonzero gate while evidence is missing.
No inherited launch or exact-candidate human-review gate is weakened.

## Drawbacks

Manual contextual interpretation is slower than bulk summarization. Rendered
captures may lack original MIME headers. A structurally valid interpretation can
still be shallow or wrong; exact quotations alone do not establish entailment.
Large mailboxes require durable source custody and incremental coverage ledgers.

## Alternatives

A universal summary loses per-message traceability. A traits database encourages
overgeneralization. Raw mailbox commits increase exposure and repository size.
Keeping only links risks source loss. The selected approach combines bounded
derived specimens, separate custody and explicit unresolved states.

## Unresolved questions

- Which delegated access method can enforce read-only operation?
- How should recurring collection be approved and scheduled, if later requested?
- What adjudication process resolves uncertain person/address identity?
- Which long-term custody location and retention policy should become canonical?
