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
- **Proof surface manifests:** Jamie-approved, audience-specific selections for
  each public proof destination in `lifecycle-records.ts`.
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

See [knowledge-lifecycle.md](knowledge-lifecycle.md) for intake, research,
promotion, retrieval, and visual-feedback operations;
[citational-care.md](citational-care.md) for public citation authoring; and
[projects/callnyc.md](projects/callnyc.md) for the first complete citation pilot.

Research runs may also leave a human-readable public-safe map under `research/`.
The [July 13 ten-source ingestion](research/2026-07-13-ten-source-ingestion.md)
shows how new sources become observations, bounded claims, research questions,
and selective exact-surface projections.

The [July 15 project social-media archival production inventory](research/2026-07-15-project-social-media-archive-production.md)
records the recovered account registry, authenticated collection methods,
named public engagement ledgers, lower-bound counts, collective-authorship
limits, held role claims, and selective portfolio projection. Its
[redacted population fixture](fixtures/social-account-populations.json) lets CI
recompute the CallNYC and NYC Artist Coalition Council-member floors and the
CallNYC, WOW List, KC Town Hall, and KC Spaces Fund population findings without
storing post text, private account data, or session material. The WOW List pass
reconciles all 38 displayed records, 35 posted-link occurrences, and a bounded
10-account stakeholder sample while retaining only public-safe counts and edges.
The KC Town Hall pass adds a [full-population production note](intake/2026-07-14-kctownhall-full-population-social-corpus.md)
and [183-item public-safe ledger](data/kctownhall-public-post-ledger.json), with
exact profile reconciliation, record-level themes and links, metric ownership,
and a fail-closed privacy boundary.

The [NYC Artist Coalition full-population receipt](intake/2026-07-15-nycartc-x-full-population.md)
accounts for the profile's 5,124 reported posts as 3,367 recovered account
items plus an explicit 1,757-item recovery gap. The governed corpus separates
696 authored posts from 2,671 reposts, resolves every one of the 1,235 distinct
short URLs in recovered account items, and preserves campaign, source,
stakeholder, and dated-counter findings with shared-authorship and
outbound-versus-incoming boundaries. These deeper findings remain held from
the website unless a future editorial purpose makes them clearer than the
current bounded coalition projection.

The [Urbanhermit full-population receipt](intake/2026-07-15-urbanhermit-x-full-population.md)
reconciles all 434 records counted by Jamie's live personal profile on July 15,
2026: 340 originals, 13 replies, and 81 native reposts. Its aggregate-only
fixture retains exact population, link, mission-signal, stakeholder-group, and
dated interaction accounting without publishing raw post text or a
reconstructable item-level personal timeline. Selected NPR, KCUR, participant,
project, and local-reporting sources matured into bounded reserve claims; all
are promoted for internal composition while every public projection remains
held from the current job-application website. A closed aggregate schema and
protected-side derivation manifest make the 434-of-434 result reproducible for
authorized reviewers without publishing a row-level personal timeline.

Campaign press sections are preserved as typed source collections rather than
treated as automatic claim support. The generated
[NYC Artist Coalition campaign press corpus](campaign-press-corpus.md) records
all 45 listings across Let NYC Dance, Talks Not Raids, Save NYC Spaces, and the
December 2021 Fair Rent NYC capture, with 44 unique canonical article records.
The frozen extraction fixture makes collection membership reproducible.

The authenticated [NYC Artist Coalition Facebook post pass](projects/nyc-artist-coalition-facebook-posts.md)
accounts for all 444 rows and 444 unique post IDs in five annual Meta Business
Suite Published exports across the surviving 2017-2021 chronology, cross-checked
against a terminal Page-feed traversal. Its
[public-safe corpus](corpora/nycartc-facebook-posts-full-population.json) and
manifest preserve 67 posted routes, mission and civic-interface patterns, and
bounded owner-export metrics while withholding raw exports, post bodies,
platform IDs, engager identities, sensitive routes, and authenticated state.
Shared-account human authorship and incoming stakeholder-group engagement remain
explicit research questions; no website copy changes were made from this pass.

The [WOW List Facebook post archival-production report](projects/wowlist-facebook-posts.md)
accounts for all 57 records in a terminal 19-page protected capture and gives
each a public-safe content, live, and publisher-attribution disposition. The
manager-only audit attributes 51 records to Jamie, attributes none to another
publisher, and leaves six unresolved. Its public fixture inventories operating
patterns and 65 distinct public posted URLs without republishing raw messages,
contacts, ordinary individual source accounts, comments, or account
administration. A fresh authenticated bidirectional page reconciliation on July
15 recovered the same 53 message-bearing live records in both directions; four
no-message records remain represented through the protected population rather
than silently falling out. Its
[public-safe acquisition manifest](corpora/wowlist-facebook-posts-acquisition-manifest.json)
adds protected-input attestations, the public 57-ID digest, traversal
checkpoints, and independent denominator mutations without publishing raw
content. Only the bounded Facebook publishing-role claim projects to the case
study; the population, source ecology, mission synthesis, and engagement
questions remain reserve knowledge.
