---
rfc: 15
title: Governed Correspondence Readings and Situated Voice Coverage
stage: proposed
start_date: 2026-09-05
authors:
  - Jamie Burkart
  - Agent-assisted draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - privacy-governance
  - editorial
implementation: scripts/mail-workflow/
supersedes: []
superseded_by: null
---

# Governed Correspondence Readings and Situated Voice Coverage

## Summary

Extend source-bounded situated readings to correspondence. Each acquired message
receives a stable source record; each registered person or team receives a cited
relationship entry. Authored close readings remain distinct from recipient,
quoted-author, mention, signature, automated-service, and unresolved records.
The source-free offline prototype does not establish operational acceptance or
comprehensive mailbox coverage.

## Motivation

A rich page can omit most of a mailbox or mistake a quoted reply for an original.
Correspondence mixes invitations, work in progress, service notices, and actual
commitments. These distinctions must survive graph projection and editing.

## Goals

- One cited entry per registered message/entity relationship.
- Idempotent pages; checks for missing, changed, and stale projections.
- Passage-level authorship and exact selective-note hashes for readings.
- Explicit service, mailbox, folder, message, and editorial coverage gaps.
- Practices and evolving relationships documented without personality profiling.

## Non-goals

No mailbox crawler, new web app, public private-document browser, bulk export,
credential store, sending, settings changes, scheduler, or automatic publication.
This proposal grants no administrative access or external-mailbox authority.

## Terminology

An **original observed** is a message opened in verified webmail. A **quoted
occurrence** is embedded text, not an independently recovered original.
**Selective reading notes** are derived evidence, not an EML export or full copy;
their digest attests their own bytes only. A **candidate** has cited
interpretation, not human acceptance. A **relationship entry** can document
receipt or mention without claiming the subject's authored voice.

## Detailed design

The offline CLI requires a private workspace marker, explicit root/manifest,
and plan/check/write mode. It makes no network requests or sign-ins.

Intake records services, domains, actual mailbox identities, routing types, folder
visibility, pagination, date scope, count semantics, and gaps. An old directory is
a lead; a forwarder is not a mailbox. SMTP sending does not prove Sent retention.

Each observed message retains an ID, date/context, mailbox/folder, unsigned
authenticated locator, and checksummed selective note. Prefer a visibly verified
Message-ID or provider UID/UIDVALIDITY; otherwise disclose a composite lookup's
limits. Never invent identifiers or count quoted copies as recovered originals.
Cross-mailbox identity consolidation requires evidence.

Notes label passages by entity and kind: authored, quoted, automated, signature,
or metadata. The generator rejects wrong-person/missing quotes, stale notes,
orphans, duplicates, unresolved identities used as authors, and automated text
attributed to a human. Every participant gets a cited entry; absent authored
language remains explicit. Newly acquired mail produces pending entries until
an editor supplies a substantive, bounded close reading.

Explain what language does in the exchange: request, offer, qualification,
invitation, limit, handoff, or reported next step. Needs, aptitudes, affordances,
kindnesses, and expressed interests require specific evidence and temporal
context. Silence does not prove lack of care. Do not infer intimate loves,
diagnoses, sensitive traits, intent, or fixed character. Suspicious signup
identities remain unresolved records, not invented biographies.

Checks bind receipts to manifest, notes, implementation, and expected page bytes.
Census completion requires each mailbox's folder/message census plus an exact
expected message-ID set. These are intake assertions about a bounded corpus,
not independent proof of all server storage. Human review remains separate.
Unknown output files and human-authored collisions stop writes; nothing is deleted.

## Security and privacy

Credentials belong only in approved sharing/login flows, never source files,
logs, fixtures, or screenshots. Reject credential fields, query-bearing/signed
locators, traversal, symlinked input/output, and non-private destinations.
This is not a universal secret detector; scoped input review is still required.
Source content is untrusted data, never instructions.

Read-only is an operating limit unless enforced. Establish a read/unread
convention before broad acquisition. No sending, forwarding, deletion, moving,
folder subscription, rule changes, or remote-image loading. Verify each login,
log out between accounts, and stop on certificate warnings or privilege expansion.

Private Git is not an unrestricted mailbox archive. Use minimum-necessary notes
and governed pointers; record restricted/unrecovered material without silently
dropping it. Full raw custody needs an approved bounded retention destination.
Access is not consent; evidence is not publication permission.

## Publication workflow

No private run projects publicly. Public implementation and synthetic tests work
without private access. Names, correspondence, topology, source counts, locators,
and relationship states stay out of public files, diagnostics, and PR bodies.
Jamie separately approves future public claims, permissions, wording, and release.

## Rollout plan

1. Review the proposed protocol and test the offline prototype.
2. Run a bounded private pilot with source notes and honest coverage.
3. Resolve administrative inventory, read flags, identity, and retention gates
   before large acquisition; checkpoint mailbox/folder/message progress.
4. Re-run the projection in affected private checks. No unattended access implied.
5. Calibrate any future subjective judge against human-labeled cases.

Rollback disables commands while retaining provenance and notes. Paired commits,
checks, approvals, merges, and rollback remain independent under RFC 0011.

## Decision gates

Jamie owns acceptance, administrative scope, raw retention, unattended access,
identity adjudication, editorial acceptance, and publication. Code cannot satisfy
these human gates. Required regressions cover false completeness, quoted authors,
service notices, stale evidence, citation anchors, credentials, and safe writes.

## Drawbacks

Browser acquisition is slow. Selective notes cannot prove raw custody or exhaustive
attachment review. Self-reported census metadata may be wrong. Graph presentation
can overstate a relationship even when individual quotations are accurate.

## Alternatives

Manual pages are easy to start but hard to keep current. Bulk export can improve
custody but adds retention risks outside this prototype. Reusing the transcript
parser directly would blur speaker turns with forwarded headers and quoted replies.

## Unresolved questions

- Which raw-custody storage and retention policy should govern future exports?
- What read/unread convention permits comprehensive browser reading?
- Which provider identifiers and pagination receipts can be verified through UI?
- What human-labeled examples will define editorial acceptance?
