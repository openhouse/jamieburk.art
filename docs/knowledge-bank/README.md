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
canonical_path: docs/knowledge-bank/README.md
summary: >
  Start-here page for the public-safe, Markdown-first editorial and research
  system that compiles into a governed graph and selective projections.
relations:
  - type: related_to
    target: index.knowledge-wiki.pilot
    href: indexes/pilot.md
    context: Bounded first implementation of stable identity and typed relations.
  - type: related_to
    target: index.knowledge-wiki.employment-context
    href: indexes/employment-context.md
    context: Present-tense opportunity research and public-only hiring evaluation.
  - type: related_to
    target: index.knowledge-wiki.living-archive
    href: indexes/living-archive.md
    context: Orientation, missing-page, project, and situated source-return map.
  - type: related_to
    target: index.knowledge-wiki.project-lineages
    href: indexes/project-lineages.md
    context: Bounded inheritance, adaptation, and divergence across projects.
  - type: related_to
    target: index.knowledge-wiki.decision-records
    href: indexes/decision-records.md
    context: Decision reconstructions with evidence states, unknowns, and projection holds.
  - type: related_to
    target: index.knowledge-wiki.family-closure
    href: indexes/family-closure.md
    context: Selective integration record for the frozen Knowledge Wiki A-E branch family.
  - type: related_to
    target: index.knowledge-wiki.photographic-knowledge-loop
    href: indexes/photographic-knowledge-loop.md
    context: Governed path from private source binding through curation, placement, recollection, correction, and portfolio editions.
  - type: related_to
    target: project.nyc-artist-coalition
    href: projects/nyc-artist-coalition-2017.md
    context: Governed civic-systems record strengthened by complete shared-folder accounting.
---

# Knowledge Wiki

**Former and compatibility name:** Knowledge Bank

This directory is the public-safe knowledge base for Jamie Burkart's
professional accomplishment claims.

The Knowledge Wiki is Jamie Burkart's internal, Git-reviewed, Markdown-first
system for source-backed operating memory. It is not a public or anonymously
editable wiki. Anything committed to this public repository must be public-safe.
Protected source material remains outside the repository.

The repo is public. Do not put anything here that would be unsafe, unfair, too
private, or too hard to defend if quoted in a newspaper.

The website is a projection of this bank. The bank can hold more structure than
the site shows: canonical claim language, evidence posture, source-basis
categories, public-use guidance, guardrails, projection surfaces, and explicit
non-public boundaries.

The website should use the clearest subset for a specific audience and purpose.

## Start here

- [Pilot map](indexes/pilot.md): the bounded governed records and ordinary
  navigation path.
- [Architecture decision](../architecture/ADR-knowledge-wiki-canonicality.md):
  what is canonical, derived, transitional, and projected.
- [Record contract](schema.md): stable IDs, lifecycle, relations, evidence, and
  projection rules.
- [Generated index](_generated/index-by-kind.md): rebuildable views of governed
  records.
- [Wiki health report](../../reports/wiki-health.md): hard gates, diagnostics,
  and human work that automation cannot complete.
- [Employment context](indexes/employment-context.md): live official-source
  opportunities, stable requirement IDs, public-only reader evaluation, and
  private job-search boundaries.
- [Living archive](indexes/living-archive.md): Jamie, the practice throughline,
  the priority project and campaign cohort, ethical methods, visual evidence,
  and a dated return to original source material.
- [Project lineages](indexes/project-lineages.md): inheritance, adaptation, and
  divergence without retrospective inevitability.
- [Decision records](indexes/decision-records.md): bounded reconstructions that
  preserve actors, constraints, evidence states, artifacts, and unknowns.
- [Branch-family closure](indexes/family-closure.md): exact frozen donors,
  selected strengths, consolidated pages, deliberate deferrals, and the human
  gates still required before public projection.
- [Photographic knowledge loop](indexes/photographic-knowledge-loop.md):
  governed file pages, permissions, curation, placements, recollections,
  protected absences, and dated portfolio editions.
- [NYC Artist Coalition](projects/nyc-artist-coalition-2017.md): public-source
  claims, collective-credit boundaries, and the governed shared-folder research
  pass.
- [Open questions](_generated/wanted-pages.md): deliberate missing knowledge,
  kept distinct from broken links and nonexistence.

Daily work begins here: open Markdown Preview to the side, follow ordinary
links, search stable IDs, use Find All References when needed, and run
`npm run wiki:check` before committing. See the
[VS Code workflow](workflow.md) for moves, corrections, and generated files.

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
- retain public-safe fragments and research leads that may matter to a future
  application, argument, or photo brief even when they do not belong on today's
  site.

## Publication Model

- **Knowledge bank:** public-safe repository layer for defensible claims,
  boundaries, and projection guidance.
- **Intake and observations:** lossless public-safe capture and proposition-level
  source reading in `historical-knowledge.ts`.
- **Citation registry:** canonical sources, evidence relationships, claims,
  projections, inquiries, corrections, and page plans in
  `apps/www/src/data/knowledge-bank/records.ts`.
- **Agency graph:** source-linked actor, action, purpose, result, and
  collective-credit relations in
  `apps/www/src/data/knowledge-bank/agency-graph.ts`.
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

See [intake-and-maturation.md](intake-and-maturation.md) for the recursive intake,
research, claim-maturation, selective-projection, and photo-feedback workflow.

See
[projects/blind-spot-evaluation-controls.md](projects/blind-spot-evaluation-controls.md)
for the eleven governed gaps that remain after the current archival and site
passes. A passing blind-spot eval means the gap is honestly bounded and
instrumented; it does not mean missing human evidence has been invented or the
gap has been resolved.

See
[agency-and-collective-credit.md](agency-and-collective-credit.md)
for the rule that separates individual contribution, shared production,
coalition action, and institutional enactment.

See
[projects/nycac-finkelpearl-council-hearing-review.md](projects/nycac-finkelpearl-council-hearing-review.md)
for the bounded 2014-2019 Council transcript search, its one
commissioner-attributed NYC Artist Coalition occurrence, the rejected 2018
speaker-co-occurrence, and the institutional-capacity interpretation.

See
[projects/nycac-campaign-press-archive.md](projects/nycac-campaign-press-archive.md)
for the complete, deduplicated press indexes from Let NYC Dance, Talks Not
Raids, Save NYC Spaces, and the supplied Fair Rent NYC Wayback capture.

See
[projects/talks-not-raids.md](projects/talks-not-raids.md)
for the bounded sequence from the coalition's 2017 transparency proposal,
through Jamie's campaign-site implementation and Local Law 220, to the City's
reported replacement of M.A.R.C.H. with CURE in December 2023.

See
[projects/kc-spaces-fund-facebook-posts.md](projects/kc-spaces-fund-facebook-posts.md)
and its
[40-row public-safe census](../../apps/www/src/data/knowledge-bank/fixtures/kcspacesfund-facebook-posts-full-population.json)
for the complete capture-date KC Spaces Fund Facebook population, mission and
fundraising routes, funded-space spotlights, bounded interaction signals,
collective credit, and Jamie's documented digital-infrastructure boundary.

See
[projects/jamie-personal-facebook-posts.md](projects/jamie-personal-facebook-posts.md)
and its
[public-safe aggregate controls](data/jamie-personal-facebook-post-controls.json)
for the complete population returned by Facebook's authenticated
`Manage Posts > Posted by: You` surface: 1,243 unique records across 621 cursor
pages, mission and source-routing leads, six individually governed public
specimens, and strict privacy, stakeholder, attribution, and engagement
boundaries. The record-level corpus remains protected.

See
[projects/kc-town-hall.md](projects/kc-town-hall.md)
for the official sequence from CCED Board recommendation through Council
acceptance, negotiation authority, and appropriation, followed by
non-disbursement, withdrawal, and return of the full unused amount.

See the
[KC Town Hall full social-population production note](intake/2026-07-14-kctownhall-full-population-social-corpus.md)
and its
[183-row public-safe ledger](data/kctownhall-public-post-ledger.json)
for the complete surviving account census, all posted URLs, resident-service
workflow, public repost-list audit, Council-role checks, and collective-credit
boundaries.

See the
[KC Town Hall field implementation and neighborhood-practice review](intake/2026-07-15-kcth-field-implementation-neighborhood-practice.md)
for the protected 2019 proposal close reading, participant-memory intake,
survey and tire-service evidence, and research queues for Phase One,
Tired of Tires, and Cleveland Avenue Unify to Beautify.

See
[projects/archive-production-2026-07-14.md](projects/archive-production-2026-07-14.md)
for the public-safe production record from the Jamie Projects History, CRS,
and job-hunt working archives, including held claims, protected support, open
inquiries, and current projection decisions.

See the
[July 15 iCloud Teams delta](projects/icloud-teams-archive-delta-2026-07-15.md)
for the authenticated-folder reconciliation, strengthened raft field-operations
evidence, protected early social-computing lead, CRS and job-hunt no-duplication
decisions, and route, privacy, permission, and collective-credit boundaries.

See
[projects/google-drive-production-2026-07-14.md](projects/google-drive-production-2026-07-14.md)
for the public-safe Shared Drive review, two protected workflow claims promoted
to the 196 Artists Residency / Sunday Dinner case study, and four media or
meeting-record leads held for permission and corroboration.

See
[projects/social-media-archive-production.md](projects/social-media-archive-production.md)
for the project-account registry, bounded public-timeline inventories,
attributable civic-engagement evidence, collective-credit boundaries, and
selective website projections from the July 2026 authenticated X review.

See
[projects/nycac-social-population.md](projects/nycac-social-population.md)
and its
[3,123-row public-safe manifest](../../apps/www/src/data/knowledge-bank/fixtures/nycartc-retrievable-population.json)
for the complete review of the `@NYCArtC` retrievable public union, all 1,161
distinct posted short URLs, mission and source-network classifications,
bounded incoming response, X platform limits, and the 2,001-record owner-
archive gap.
The
[recursive evaluation run](../../evals/knowledge-bank/runs/2026-07-15-nycac-retrievable-social-population.md)
preserves the rejected holdouts, repairs, final independent acceptance, and
stopping decision.

See the
[NYC Artist Coalition Facebook event production](projects/nyc-artist-coalition-facebook-events.md)
and its
[33-event public-safe census](../../apps/www/src/data/knowledge-bank/fixtures/nycartc-facebook-events-full-population.json)
for complete disposition of Facebook's 34 displayed past-event slots, the
rotating cultural-space meeting pattern, event-source routes, stakeholder
interfaces, response-label boundaries, Jamie's attributed participation-system
account, and the unresolved native-owner-export gap.

See
[projects/urbanhermit-social-population.md](projects/urbanhermit-social-population.md)
and its
[434-row public-safe fixture](../../apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json)
for the complete capture-date `@urbanhermit` live-profile population, all 321
distinct posted short URLs, source-authorship and mission-signal separation,
bounded incoming response, mature source findings, and owner-archive boundary.

See
[projects/callnyc-social-population.md](projects/callnyc-social-population.md)
and its
[110-row machine-readable manifest](data/callnyc-x-population-2026-07-15.json)
for the full-population disposition pass on `@CallNYCapp`, the posted-URL
inventory, issue-distribution analysis, and complete public-repost audit.

See
[projects/wowlist-social-population.md](projects/wowlist-social-population.md)
and its
[38-row machine-readable manifest](data/wowlist-x-population-2026-07-15.json)
for the complete recovered `@wowlist` profile population, all 35 posted URLs,
historical product-workflow findings, bounded external-adoption evidence, and
the account-owned engagement audit.

See
[projects/wowlist-facebook-posts.md](projects/wowlist-facebook-posts.md)
and its
[57-row public-safe census](../../apps/www/src/data/knowledge-bank/fixtures/wowlist-facebook-posts-full-population.json)
for every distinct post exposed by the authenticated WOW List Facebook feed on
the capture date, all 55 posted URLs, organizer-workflow and care-routing
patterns, displayed-interaction boundaries, and the native-export and
post-authorship gaps.

See the
[WOW List, Sunday Dinner, and Call Script continuity review](projects/wowlist-sunday-dinner-callscript-continuity.md)
and its
[public-safe aggregate controls](data/wowlist-sunday-dinner-callscript-controls.json)
for a fresh reproduction of the July 2017 WOW List production counts, protected
corroboration of Sunday Dinner's 300-plus gathering scale, and the bounded
public-source sequence from popular.vote through Call Script's participatory
coalition-name poll and the next NYC Artist Coalition meeting.
The
[recursive evaluation run](../../evals/knowledge-bank/runs/2026-07-15-wowlist-sunday-dinner-callscript-continuity.md)
preserves the rejected candidates, narrow review-lock promotions, privacy
controls, and final stopping criteria.
The [NYC Artist Coalition Facebook post population](projects/nyc-artist-coalition-facebook-posts.md)
records all 445 distinct posts exposed by the authenticated capture-date Page
feed, 67 cleaned off-Facebook routes, issue and stakeholder classifications,
displayed-interaction boundaries, shared-account authorship limits, and the
selective website projection. The public-safe row ledger is preserved in
[its fixture](../../apps/www/src/data/knowledge-bank/fixtures/nycartc-facebook-posts-full-population.json).
The [recursive evaluation run](../../evals/knowledge-bank/runs/2026-07-15-nycac-facebook-posts.md)
records the rejected holdouts, structural repairs, final rendered projection,
and two accepted independent reviews.
