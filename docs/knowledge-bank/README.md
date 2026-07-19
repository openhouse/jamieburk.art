---
id: index.knowledge-wiki
title: Knowledge Wiki
kind: index
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-18
review_by: 2027-01-18
aliases:
  - Knowledge Bank
relations:
  - type: indexes
    target: project.callnyc
  - type: indexes
    target: project.nyc-artist-coalition
  - type: indexes
    target: project.wowlist
  - type: indexes
    target: project.kc-town-hall
  - type: indexes
    target: project.fair-rent-nyc
  - type: indexes
    target: project.harry-j-epstein
  - type: indexes
    target: project.let-nyc-dance
  - type: indexes
    target: project.talks-not-raids
  - type: indexes
    target: event.nycac.office-of-nightlife-town-hall-2017
  - type: indexes
    target: place.small-cultural-spaces
  - type: indexes
    target: event.nycc.councilstat-hackathon-2016
  - type: indexes
    target: capability.technical-operations
  - type: indexes
    target: method.source-backed-team-memory
  - type: indexes
    target: method.original-source-rereading
  - type: indexes
    target: method.transition-and-handoff
  - type: indexes
    target: method.jamie-at-work
  - type: indexes
    target: method.participation-and-relational-infrastructure
  - type: indexes
    target: method.outcomes-and-adoption
  - type: indexes
    target: policy.people-and-collective-credit
  - type: indexes
    target: index.claim-maturity-dashboard
  - type: indexes
    target: index.knowledge-wiki-project-dossiers
  - type: indexes
    target: index.employment-context
  - type: governed_by
    target: policy.knowledge-wiki-schema
  - type: governed_by
    target: policy.knowledge-wiki-authoring
---

# Knowledge Wiki

> Formerly called the Knowledge Bank. The compatibility path remains
> `docs/knowledge-bank/` during the bounded migration.

This directory is the public-safe knowledge base for Jamie Burkart's
professional accomplishment claims.

The repo is public. Do not put anything here that would be unsafe, unfair, too
private, or too hard to defend if quoted in a newspaper.

The website is a projection of this wiki. The wiki can hold more structure than
the site shows: canonical claim language, evidence posture, source-basis
categories, public-use guidance, guardrails, projection surfaces, and explicit
non-public boundaries.

The website should use the clearest subset for a specific audience and purpose.

## Purpose

The Knowledge Wiki exists to:

- preserve strong, defensible professional claims;
- preserve relationships among artistic, civic, technical, and social practice
  without reducing any one of them to organizational utility;
- keep public site copy grounded in evidence;
- separate verified scope from open questions;
- make future edits easier to audit;
- prevent both overstatement and understatement;
- reduce the risk that private evidence leaks into public pages;
- make the Technical Operations / Product Operations / Implementation story
  easier to maintain.

## Publication Model

- **Capture ledger:** low-friction public-safe intake for URLs, memories,
  artifacts, possible metrics, corrections, and photo leads.
- **Research workbench:** normalized sources, atomic observations, bounded
  research tasks, and explicit limitations.
- **Knowledge Wiki:** public-safe Markdown layer for context, relationships,
  navigation, governance, and research orientation. It does not duplicate the
  exact claims and evidence owned by the typed registry.
- **Citation registry:** canonical sources, evidence relationships, claims,
  projections, inquiries, corrections, and page plans in
  `apps/www/src/data/knowledge-bank/records.ts`.
- **Structured proof data:** broader professional claim layer in
  `apps/www/src/data/proofs.ts`.
- **Public website:** purpose-built projection that selects, sequences, and
  rewrites claims for readers.
- **Private archive:** not in this repo.

## Start Here

- [Jamie at Work](methods/jamie-at-work.md)
- [NYC Artist Coalition](projects/nyc-artist-coalition.md)
- [Let NYC Dance](projects/let-nyc-dance.md)
- [Talks Not Raids](projects/talks-not-raids.md)
- [Office of Nightlife town hall](events/office-of-nightlife-town-hall-2017.md)
- [WOW List](projects/wowlist.md)
- [KC Town Hall](projects/kc-town-hall.md)
- [Fair Rent NYC and Commercial Rent Stabilization](projects/fair-rent-nyc.md)
- [Harry J. Epstein Company](projects/harry-j-epstein.md)
- [Participation and Relational Infrastructure](methods/participation-and-relational-infrastructure.md)
- [Small Cultural Spaces Where Culture Is Born](places/small-cultural-spaces.md)
- [Outcomes and Adoption](outcomes-and-adoption.md)
- [People, Collective Credit, and Protected Absences](people-and-collective-credit.md)
- [Claim Maturity Dashboard](claim-maturity-dashboard.md)
- [CallNYC chronology and boundaries](projects/callnyc.md#corrected-chronology)
- [CouncilStat hackathon event](events/councilstat-hackathon-2016.md)
- [Technical Operations capability](capabilities/technical-operations.md)
- [Source-Backed Team Memory method](methods/source-backed-team-memory.md)
- [Original-source rereading](methods/original-source-rereading.md)
- [Transition and handoff](methods/transition-and-handoff.md)
- [Project dossier directory](indexes/project-dossiers.md)
- [Employment context and priority opportunities](employment/README.md)
- [Schema and authority contract](schema.md)
- [Authoring and review workflow](authoring.md)
- [Generated health report](../../reports/wiki-health.md)

See [intake-and-promotion.md](intake-and-promotion.md) for the complete
development lifecycle and [photo-evidence-loop.md](photo-evidence-loop.md) for
the visual-research feedback process.

See [composite-integration.md](composite-integration.md) for the append-safe
intake command, read-only lifecycle query, fail-closed projection inventory,
candidate-bound composite evals, and the read-only integration map for the
frozen `feature/evals-A` through `feature/evals-N` family.

## Core Rule

If a private archive supports a public claim, describe the aggregate result or
public-safe pattern. Do not describe the private record inventory in unnecessary
detail.

## Projection Rule

The site should project from the governed knowledge system, not mirror the wiki.

For hiring pages, prefer role-fit claims: requirements, workflow mapping,
documentation architecture, source-backed memory, implementation support,
quality assurance, user acceptance testing, stakeholder updates, operating
documentation, onboarding, and handoffs.

For case studies, prefer project-specific claims: what was unclear, what became
usable, what Jamie did, and what boundary remains protected.

For homepage proof, prefer compact claims that a busy reader can understand in
one pass.

See [citational-care.md](citational-care.md) for the established validation
workflow. The [project dossier directory](indexes/project-dossiers.md) preserves
the broader research record without making the root page an archive tour or
implying that every dossier belongs on the portfolio.
