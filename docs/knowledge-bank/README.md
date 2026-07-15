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

Nothing is silently discarded. That does not mean everything is published.
Every public-safe lead receives an intake record and disposition; only supported
claims become eligible for projection, and only claims useful to the current
argument are selected for a public surface.

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
- **Intake ledger:** public-safe record of URLs, recollections, artifact leads,
  photo observations, collaborator notes, and research questions. Intake is
  memory, not confirmation.
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

## Evaluation Trust Boundary

Deterministic checks govern the collective-credit inventory, runtime renderers,
projection routes, public surfaces, and every visible resume block. The frozen
policy baseline is pinned to the annotated Git tag
`knowledge-bank-policy-baseline-2026-07-15-v4`; ordinary branch commits cannot
silently rewrite that tagged object. The evaluator also pins the annotated tag
object ID, and the tag is published to `origin` so a clean clone or CI checkout
can reproduce the same baseline without local state.

This is a drift detector, not a substitute for judgment. A candidate patch
cannot grade its own semantics, so `KB-007` and `KB-009` also require two
independent evaluator reviews of the exact candidate commit. The hybrid
scorecard records those reviews and is accepted only when its candidate SHA
matches the governed input tree. Moving the tag, changing the policy contract,
or changing claim-support assignments requires explicit new human review.

See [citational-care.md](citational-care.md) for the authoring and validation
workflow, [development-loop.md](development-loop.md) for the recursive
knowledge-development protocol, and [projects/callnyc.md](projects/callnyc.md)
for the first complete citation pilot.

Archive-production run records live in [runs](runs). The Google Drive pass is
documented in
[2026-07-14-google-drive-archive-production.md](runs/2026-07-14-google-drive-archive-production.md).
The authenticated project-account pass is documented in
[2026-07-14-social-account-production.md](runs/2026-07-14-social-account-production.md),
and the complete CallNYC population pass is documented in
[2026-07-14-callnyc-x-full-population.md](runs/2026-07-14-callnyc-x-full-population.md),
with a committed public browser extraction, transformation manifest, and
`scripts/derive-callnyc-x-corpus.mjs` check that reproduces the 107 item records
and their aggregate metrics. The governed account map and per-project findings are in
[projects/social-account-inventory.md](projects/social-account-inventory.md).
The full NYC Artist Coalition population-accounting pass is documented in
[2026-07-15-nycartc-x-full-population.md](runs/2026-07-15-nycartc-x-full-population.md),
with a public-safe raw extraction, deterministic derivation, and explicit
1,757-item recovery gap.

The recovered record for the collaborative interactive installation
*NTER CHNG* is in [projects/nter-chng.md](projects/nter-chng.md), with the
Wayback research and explicit not-recovered boundaries documented in
[2026-07-15-nter-chng-archive-production.md](runs/2026-07-15-nter-chng-archive-production.md).
