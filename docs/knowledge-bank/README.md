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
- retain public-safe fragments before their eventual relevance is known;
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

See [lifecycle.md](lifecycle.md) for the intake-to-source-to-claim process,
projection restraint, recursive eval, and photo-feedback loop.

The campaign press corpus is normalized in
`apps/www/src/data/knowledge-bank/campaignPress.ts` and documented for human
review in
[projects/nyca-campaign-press-index.md](projects/nyca-campaign-press-index.md).
It preserves placements, distinct articles, archive state, and claim-use
boundaries separately.

The NYC Artist Coalition Facebook event production is documented in
[nycartc-facebook-events-2026-07-13.md](nycartc-facebook-events-2026-07-13.md).
Its public event and outbound-link ledgers live under `data/`. The 34-slot
control is fully disposed as 33 recovered event records and one metadata-free
unresolved slot. This is complete control accounting, not complete content or
lifetime-history recovery. Facebook response displays remain mutable
event-level platform signals rather than attendance, unique-person, reach, or
impact measures. Event pages establish collective public surfaces; they do not
assign individual authorship or policy causality.

The personal and WOW List Facebook event pass is documented in
[personal-wowlist-facebook-events-2026-07-14.md](personal-wowlist-facebook-events-2026-07-14.md).
Two terminal traversals returned the same 502 IDs on Jamie's Past events
surface. The separate hosted-events tab exposed 21 records, 18 of which
overlapped, yielding 505 distinct current IDs across the two personal tabs.
`data/personal-wowlist-facebook-event-controls.json` preserves aggregate
reconciliation, and
`jamie-facebook-displayed-host-event-census-2026-07-14.csv` classifies the 20
Past events cards that display Jamie as host. The record-level association
graph remains protected. The current WOW List Page event surface displayed
zero records. A separate bounded historical search recovered none; that
non-recovery is not proof of historical absence.

The recovered KC Town Hall public-funding sequence is documented in
[projects/kc-town-hall-council-allocation-2019.md](projects/kc-town-hall-council-allocation-2019.md).
It keeps the Board recommendation, Council acceptance, appropriation, later
contract-delay state, Jamie's first-person stewardship transition, City
withdrawal, and reappropriation as distinct evidence-bearing events.

The authenticated personal-social review is documented in
[projects/urbanhermit-x-population-2026-07-14.md](projects/urbanhermit-x-population-2026-07-14.md).
Its public ledgers preserve redacted row-level dispositions and aggregate
summaries for the current 434-record profile control and a 26-record
inbound-search floor. Ordered rows retain coarse year and research classes for
auditability, which carries residual reconstruction risk. They intentionally omit
raw post text, handles, status identifiers, exact dates, personal context, and
per-record metrics. Selected professional records enter the typed bank only
after close reading; the personal timeline is not a public portfolio artifact.
