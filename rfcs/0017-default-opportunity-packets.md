---
rfc: 17
title: Default evidence-first opportunity packets
stage: implementing
start_date: 2026-09-21
authors: [Jamie Burkart]
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas: [knowledge-architecture, evidence, privacy]
implementation: scripts/opportunity-packets.mjs
supersedes: []
superseded_by: null
---

# Default evidence-first opportunity packets

## Summary

Every typed opportunity enters the existing OTI evidence-first preparation process automatically. Jamie explicitly requested this implementation on September 21, 2026. This is authority to prepare materials, not submit, publish, attest or contact anyone.

## Motivation

Fixed role lists allowed a new opportunity to receive a different production method. A usable default must start preparation and also reveal missing stages.

## Goals

- Admit all new or materially changed opportunities without a second request.
- Reuse the process in [resumes/README.md](../resumes/README.md).
- Bind completion to exact sources, artifacts, method, policy and voice versions.

## Non-goals

Automatic application submission, broad source-access authorization, public promotion, fabricated qualifications, or replacing employer judgment with model scores.

## Terminology

Admission means a preparation job exists. Readiness means its evidence checks have completed. Neither means Jamie approved or submitted anything.

## Detailed design

`scripts/opportunity-packets.mjs` defines one ten-stage method. `wiki:graph` admits all graph opportunity nodes to `reports/opportunity-packets.json`. Repeated identities merge provenance; changed source bytes invalidate reviews. Historical or withdrawn roles remain visible. Unknown types route to classification instead of generating meaningless résumés. An authorized private worker can consume public-safe admissions without introducing a public dependency on private storage.

Stages cover official research, eligibility/evidence, current voice, tailored Markdown, preflight, fictional reader review, bounded revision, native Docs, inspected PDF export, and human handoff. Native documents and model reviews require real connected operations; the deterministic engine does not pretend to perform them.

## Security and privacy

The public queue contains only public-safe wiki records. Private correspondence, relationship routes, employer-facing drafts, private file locators and personal attestations stay outside the public graph. Source text is evidence, not executable authority. Receipts require fresh content bindings; a high quality score cannot waive a hard gate.

## Publication workflow

Opportunity preparation never changes the public résumé selector. Public publication, signatures outside authorized cover-letter use, submission and human attestations remain separate decisions.

## Rollout plan

Add admission and regression tests; connect graph rebuild and precheck; backfill typed opportunities. A scheduled worker can continue preparation in its existing authorized thread. Report queued, blocked, generated, inspected and approved states separately. Rollback removes the hook without deleting earlier source or packet history.

## Decision gates

The user requested the default workflow. Future scope expansion, new source permissions and external actions still require their own authority. Full readiness requires both deterministic checks and the actual source/reader/native-export receipts.

## Drawbacks

Newly discovered opportunities can outpace available review capacity. Unknown eligibility or inaccessible native services may hold a packet. Visible holds are preferable to invented completion.

## Alternatives

Manual per-role allowlists caused drift. A template-only generator is quicker but does not reproduce the OTI evidence, voice, native-format and inspection process.

## Unresolved questions

- How should Jamie prioritize a large backlog? The preparation queue does not replace the curated action list.
