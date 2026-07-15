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

Campaign press sections are preserved as typed source collections rather than
treated as automatic claim support. The generated
[NYC Artist Coalition campaign press corpus](campaign-press-corpus.md) records
all 45 listings across Let NYC Dance, Talks Not Raids, Save NYC Spaces, and the
December 2021 Fair Rent NYC capture, with 44 unique canonical article records.
The frozen extraction fixture makes collection membership reproducible.
