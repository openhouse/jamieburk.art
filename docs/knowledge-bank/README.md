---
wiki_record: true
id: index.knowledge-wiki
title: Knowledge Wiki
kind: index
status: maintained
visibility: public-safe
sensitivity: low
projection_status: not-applicable
discoverable: true
last_reviewed: 2026-07-18
review_by: 2027-01-18
review_state: completed
owner: Jamie Burkart
aliases:
  - Knowledge Bank
canonical_path: docs/knowledge-bank/README.md
relations:
  - type: documents
    target: index.knowledge-wiki-pilot
    href: indexes/pilot.md
    context: Start-here map for the bounded foundation records.
---

# Knowledge Wiki

**Knowledge Wiki**, formerly called **Knowledge Bank**, is Jamie Burkart's
internal, Git-reviewed, Markdown-first system for source-backed operating
memory. Markdown is the human record, the Wiki Graph is derived, and the
portfolio is a selective public projection.

The path remains `docs/knowledge-bank/` during the compatibility period. Stable
record IDs, not paths or titles, carry identity. See the
[foundation pilot](indexes/pilot.md), the
[architecture decision](../architecture/ADR-knowledge-wiki-name-and-model.md),
and the [authoring guide](knowledge-wiki-authoring.md).

## Start Here

- [Foundation pilot](indexes/pilot.md): bounded records that demonstrate the
  document, semantic, evidence, and governance graphs.
- [Projects](projects/): project histories and editorial boundaries.
- [Sources and claims](citational-care.md): canonical citation and evidence
  workflow.
- [Lifecycle](lifecycle.md): intake, promotion, correction, and retirement.
- [Current opportunities](opportunities/): role-specific evidence maps.
- [Open questions](launch-blockers.md): human decisions automation must not
  impersonate.
- [Generated Wiki health](../../reports/knowledge-wiki/generated/wiki-health.md):
  reproducible structural diagnostics and manual authority gates.

## What Is Not Here

The public repository is not the Source Vault. It does not contain raw private
archives, private correspondence, unapproved photographs, participant lists,
protected locators, credentials, or relationship graphs. `noindex` is not a
privacy boundary.

This directory is the public-safe knowledge system for Jamie Burkart's
professional accomplishment claims.

The repo is public. Do not put anything here that would be unsafe, unfair, too
private, or too hard to defend if quoted in a newspaper.

The website is a projection of this bank. The bank can hold more structure than
the site shows: canonical claim language, evidence posture, source-basis
categories, public-use guidance, guardrails, projection surfaces, and explicit
non-public boundaries.

The website should use the clearest subset for a specific audience and purpose.

Submitted fragments enter through the intake lifecycle before they become
sources or claims. See [lifecycle.md](lifecycle.md) for capture, review,
promotion, projection, maintenance, and photo-feedback rules.

The July 2026 [iCloud Teams archival-production passes](research/icloud-teams-archival-production-2026-07.md)
show how working archives become public sources, private metadata records,
atomic claims, anti-claims, and verification inquiries without exposing the
underlying private files. The second pass adds public creative-technical
records, collaborative Wikipedia provenance, a bounded Council-event handoff,
Chad-lens provenance, and separate evidence for course enrollment and
completion.

The [social-media archival-production pass](research/social-media-archival-production-2026-07.md)
adds complete-population reconciliation, explicit retrieval gaps, project-link
discovery, and bounded stakeholder-response evidence. The [Google Drive Shared
Drives pass](research/google-drive-shared-drives-archival-production-2026-07.md)
adds private workflow evidence and rights-aware audiovisual research queues
without publishing Drive identifiers or source materials.

The [NTER CHNG working-artifact pass](research/nter-chng-google-drive-working-artifacts-2010-2011.md)
adds protected 2010-2011 production and design records: an America: Now and Here
restaging plan and a prompt/exhibit-description compilation. It preserves
cross-disciplinary production depth and project language while withholding
Drive identifiers, contact details, message text, and unsupported individual
labor or authorship claims.

The [NYC Artist Coalition Facebook event pass](research/nycartc-facebook-events-archival-production-2026-07.md)
accounts for a 34-slot event control with 33 recovered records and one unresolved
slot. It preserves the complete surviving chronology, Page-host boundaries,
rotating-venue practice, public-institution interfaces, posted-source routes,
and the difference between response signals and attendance.

The [personal and WOW List Facebook event pass](research/personal-wowlist-facebook-events-archival-production-2026-07.md)
accounts for 502 Past event IDs and 21 Hosted-tab IDs on Jamie's current
personal controls, reconciles them to 505 distinct IDs, close-reads the complete
20-card subset displaying Jamie as host, and records a bounded WOW List
non-recovery. It keeps association, displayed host labels, authorship,
attendance, response displays, and professional significance separate.

The [WOW List Facebook post pass](research/wowlist-facebook-posts-archival-production-2026-07.md)
reconciles all 54 unique posts currently recoverable from the public Page
timeline, close-reads the full population, records Jamie's 54-of-54 publisher
metadata, and develops source-routing and mission-pattern depth without turning
mutable engagement displays into impact or publisher metadata into sole
administration.

The [NYC Artist Coalition Facebook post pass](research/nycartc-facebook-posts-archival-production-2026-07.md)
reconciles the same 444 post identities across two independent authenticated
traversals, classifies every currently recoverable record, and preserves
collective participation, source-routing, stakeholder-addressing, and role
boundaries without converting Page identity into individual authorship.

The [NYC Artist Coalition institutional-value synthesis](research/nycartc-dcla-council-institutional-value-2017.md)
closely reads Finkelpearl's 2017 DCLA and Council testimony with CreateNYC,
Council, town-hall, and Jamie-role records. It distinguishes public
institutional rationale from private motive and keeps DCLA, Council, Espinal,
coalition, Jamie, and collective policy causality separate.

The [WOW List, Sunday Dinner, and Call Script relational-infrastructure pass](research/wowlist-sunday-dinner-callscript-archival-production-2012-2017.md)
combines private database aggregates, protected workbook aggregates, and a
public Call Script trace. It documents a functional bridge from WOW List's
Popular Vote layer into early NYC Artist Coalition participation while keeping
database tags, attendance semantics, account authorship, and individual
facilitation credit separate.

The [Jamie personal Facebook post pass](research/jamie-personal-facebook-posts-archival-production-2026-07.md)
accounts for all 1,243 records currently returned by the authenticated
owner-filtered Manage Posts control across 621 cursor pages. It keeps the raw
record census private while promoting individually rechecked public sources,
source leads, action-routing patterns, explicit anti-claims, and one newly
close-read independent article.

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
- **Structured proof data:** broader professional claim layer in
  `apps/www/src/data/proofs.ts`.
- **Public website:** purpose-built projection that selects, sequences, and
  rewrites claims for readers.
- **Private archive:** not in this repo.

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

## KC Spaces Fund Facebook Posts

The July 14, 2026 authenticated pass reconciled the same 37 Page-level records
across two independently paced traversals of KC Spaces Fund's currently
recoverable 2020 Facebook timeline. The Page corpus is campaign voice, not
evidence that Jamie authored its posts. It preserves 12 named support
announcements, mission and action routes, a dated mutable reaction snapshot,
and one bounded grantee-response specimen.

Separate implementation evidence supports Jamie's behind-the-scenes digital
role across the campaign site, theme, fundraising widget, deployment, and web
affordances. His naming contribution remains an attributed memory: the public
identity is uniform, but uniformity alone does not identify the decision-maker.
See the [research note](research/kcspacesfund-facebook-posts-archival-production-2026-07.md).

## Jamie Personal Facebook Posts

The July 15, 2026 authenticated pass reached a terminal cursor after 621 pages
and reconciled 1,243 unique records currently returned by **Manage Posts >
Posted by You**. A deterministic research pass routed 181 records into
overlapping mission categories and recovered 549 unique normalized external
source leads.

The raw corpus remains private because audience labels were not exposed for
most records and because personal posts can contain private-life context. Only
six posts individually reopened and rechecked as public became source nodes.
Selected current counters remain dated mutable observations and cannot be
summed into reach, unique people, stakeholder engagement, endorsement,
attendance, conversion, causality, or impact.

The pass adds public traces to NTER CHNG, WOW List, KC Town Hall, Let NYC Dance,
Talks Not Raids, and CallNYC research. It also promotes one independent Pitch
article reporting that Jamie and his fellow artists reached the Gulf of Mexico
four months after leaving Kansas City on their raft. See the [research
note](research/jamie-personal-facebook-posts-archival-production-2026-07.md).

## Kansas City Star Raft Source

The July 16, 2026 pass close-read a locally preserved two-page reproduction of
The Kansas City Star's November 15, 2007 front-page report on *Release Yourself
onto the Water Until It Tastes of Salt*. The source independently strengthens
Jamie's origination record while preserving Libby Hendon and Laura Mattingly as
the other two named crew members at that stage. It also documents travel beyond
the 1,000-mile marker, the recycled bicycle-powered craft, and Jamie's
attributed civic premise connecting Kansas City's West Bottoms with Delta river
towns.

The Star story is a contemporaneous mid-voyage account, not evidence of later
Gulf completion, uninterrupted travel, sole authorship, or a complete labor
roster. The PDF and credited photographs remain protected and uncommitted. A
related live [Pitch update](https://www.thepitchkc.com/artists-turned-huck-finn-part-iii/)
was independently recovered and added as corroborating public evidence. See the
[full production record](research/kansas-city-star-raft-archival-production-2007.md).

## KC Town Hall Phase One And Neighborhood Stewardship

The July 15, 2026 pass separates four connected bodies of work that should not
be collapsed into one oversized claim: the Phase One cold-shell restoration,
the neighborhood survey and contact system, TiredOfTires operations, and
Cleveland Ave Unify to Beautify civic-design support.

The 2019 CCED proposal packet directly supports a $189,629 Phase One scope,
specialized construction work, local hiring and trade-learning context, and a
listening process that shaped the proposal. Jamie's general-contractor title,
daily site-coordination account, and individual design and operating roles are
preserved as attributed first-person claims pending collaborator or closeout
corroboration. A private operating calculator records 1,970 tires across 25
nonzero logged months within 26 monthly columns; that internal total is not an
independently audited public impact metric. See the [public-safe research
note](research/kc-town-hall-phase-one-neighborhood-stewardship-2018-2022.md).
