# Knowledge Bank

This directory is the public-safe knowledge base for Jamie Burkart's
professional accomplishment claims.

The repo is public. Do not put anything here that would be unsafe, unfair, too
private, or too hard to defend if quoted in a newspaper.

The website is a projection of this bank. The bank can hold more structure than
the site shows: canonical claim language, evidence posture, source-basis
categories, public-use guidance, guardrails, projection surfaces, and explicit
non-public boundaries.

The website should use the clearest subset for a specific audience and purpose.

## No silent loss

Every submitted memory, URL, article, website, photograph, document, claim, or
correction receives a durable intake record and disposition. A fragment may
become a source, claim, inquiry, or project relationship; it may also be merged,
protected, or rejected with a reason. Intake never becomes public copy merely
because it was submitted.

The framework keeps three judgments independent:

- **Evidentiary maturity:** what the record currently establishes.
- **Publication safety:** whether and under what boundary it may be public.
- **Editorial selection:** whether it serves the argument of a particular
  public composition now.

Publicly defensible does not mean selected. Reserve material remains available
for future applications, case studies, research, and photo-editor briefs without
crowding the current site.

## Purpose

The knowledge bank exists to:

- preserve strong, defensible professional claims;
- keep public site copy grounded in evidence;
- separate verified scope from open questions;
- make future edits easier to audit;
- prevent both overstatement and understatement;
- reduce the risk that private evidence leaks into public pages;
- make the Technical Operations / Product Operations / Implementation story
  easier to maintain.

## Publication Model

- **Knowledge bank:** public-safe repository layer for defensible claims,
  boundaries, and projection guidance.
- **Citation registry:** canonical sources, evidence relationships, claims,
  projections, inquiries, corrections, and page plans in
  `apps/www/src/data/knowledge-bank/records.ts`.
- **Intake and lifecycle framework:** public-safe leads, project relationships,
  publication decisions, proof-source coverage, and photo research in
  `apps/www/src/data/knowledge-bank/framework.ts`.
- **Structured proof data:** broader professional claim layer in
  `apps/www/src/data/proofs.ts`.
- **Public website:** purpose-built projection that selects, sequences, and
  rewrites claims for readers.
- **Private archive:** not in this repo.
- **Aggregate archival ledgers:** public-safe dispositions that reconcile a
  bounded research population without reproducing personal timelines, private
  records, or raw interaction data.

The NYC Artist Coalition Facebook event pass demonstrates the event-node form
of this model. `nycartc-facebook-events-2026-07-13.md` interprets the practice;
`data/nycartc-facebook-event-ledger.json` dispositions all 34 current control
slots; and `data/nycartc-facebook-event-link-ledger.json` routes 61 posted-link
occurrences without exposing guest identities, comments, meeting-access paths,
working-document locators, or private account context.

The personal and WOW List Facebook event pass adds a deliberately asymmetric
control. `personal-wowlist-facebook-events-2026-07-14.md` interprets 20
recovered Jamie-hosted event pages and one unresolved slot;
`data/personal-wowlist-facebook-event-controls.json` preserves aggregate
reconciliation for the 502-record personal association surface and the zero
record current WOW List surface; and
`jamie-facebook-hosted-event-census-2026-07-14.csv` gives every hosted-event
control slot a public-safe disposition. The record-level personal association
graph remains protected.

The WOW List Facebook post pass closes a separate 57-record owner-timeline
population. `intake/2026-07-14-wowlist-facebook-posts.md` interprets the
distributed-use, civic-routing, interaction, and publishing-role findings;
`data/wowlist-facebook-post-census-2026-07-14.csv` dispositions every recovered
post ID. A protected Page-management audit attributes 51 matching records to
Jamie, leaves six unavailable or redirected records unresolved, and exposes no
per-record administrator data in this public repository.

The NYC Artist Coalition Facebook post pass accounts for all 441 unique records
in the surviving public owner timeline exposed by the current interface.
`intake/2026-07-14-nycartc-facebook-posts.md` interprets the civic-publication,
source-routing, stakeholder-reference, and mutable-interaction patterns;
`data/nycartc-facebook-post-census-2026-07-14.csv` gives every recovered record
a public-safe disposition. A first-party crosscheck showed that managed Page
content and the public timeline are not equivalent, and individual publisher
attribution remains unresolved.

The KC Spaces Fund Facebook post pass accounts for all 38 records in the
surviving public Page timeline exposed by the current interface.
`intake/2026-07-14-kcspacesfund-facebook-posts.md` interprets the campaign
sequence, cross-channel identity, grantee recognition, routes, mutable reaction
floor, and Jamie's non-posting role boundary;
`data/kcspacesfund-facebook-post-census-2026-07-14.csv` gives every recovered
record a public-safe disposition. Raw post text, identities, comments, contact
details, and administrator context remain protected.

The personal Facebook post pass accounts for all 1,243 unique records returned
by the authenticated `Posted by: You` control after reconciling 3,728 returned
nodes across 621 cursor pages. `intake/2026-07-14-jamie-facebook-posts.md`
interprets the population, professional-candidate, external-destination, source-
discovery, and engagement-boundary findings;
`data/jamie-facebook-post-census-2026-07-14.csv` gives every unique record an
aggregate-only disposition. Raw posts, URLs, exact dates, identities, privacy
context, interactions, and media remain protected.

The July 14 iCloud Teams expansion uses authenticated web controls and local
materialization as complementary archive surfaces. It adds a source-backed
creative-technology reserve record, verifies the Commercial Rent Stabilization
30-plus-page claim against one preserved 34-page document while retaining an
earlier 12-page snapshot, and narrows the approved-resume proof queue. See
`intake/2026-07-14-icloud-teams-expansion.md` and
`projects/creative-technology-practice.md`. No private archive document,
contact detail, local path, or browser-session material enters the repo.

## Core Rule

If a private archive supports a public claim, describe the aggregate result or
public-safe pattern. Do not describe the private record inventory in unnecessary
detail.

## Projection Rule

The site should project from this bank, not mirror it.

For hiring pages, prefer role-fit claims: requirements, workflow mapping,
documentation architecture, source-backed memory, implementation support,
quality assurance, user acceptance testing, stakeholder updates, operating
documentation, onboarding, and handoffs.

For case studies, prefer project-specific claims: what was unclear, what became
usable, what Jamie did, and what boundary remains protected.

For homepage proof, prefer compact claims that a busy reader can understand in
one pass.

See [citational-care.md](citational-care.md) for the authoring and validation
workflow and [projects/callnyc.md](projects/callnyc.md) for the first complete
pilot.
