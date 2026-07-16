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

## Knowledge Lifecycle

Every useful fragment should receive a disposition, but publication is never
automatic:

1. **Capture:** Add a public-safe intake record with provenance, why it matters,
   project links, and explicit boundaries.
2. **Triage:** Link it to a source, inquiry, claim, correction, or a documented
   defer/reject reason.
3. **Research:** Read sources closely, record what each establishes and does not
   establish, and keep unresolved questions open.
4. **Mature:** Promote a claim only when evidence, confidence, reviewer,
   boundaries, and anti-claims are present.
5. **Project:** Decide independently whether the claim belongs on a particular
   website page, in a photo brief, only in the public-safe bank, or nowhere yet.
6. **Revisit:** Treat new sources, collaborator corrections, and photo-editor
   discoveries as fresh intake. They may strengthen, narrow, supersede, or
   retract earlier claims.

The canonical typed records live in `apps/www/src/data/knowledge-bank/`. Run
`npm run knowledge-lifecycle` to enforce the lifecycle and
`npm run report:knowledge-lifecycle` to see held mature claims and research
backlog items.

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
- **Intake ledger:** lossless public-safe queue of incoming URLs, artifacts,
  memories, hypotheses, corrections, and photo leads with explicit disposition.
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
pilot. The Kansas City records are separated into
[KC Town Hall](projects/kc-town-hall.md) and
[neighborhood operations](projects/kansas-city-neighborhood-operations.md) so
construction delivery, participatory listening, recurring service operations,
and still-open role research do not blur into one claim.

The July 15 iCloud archive-production pass adds focused project records for
[Fair Rent NYC and Commercial Rent Stabilization](projects/fair-rent-nyc.md),
[Source-Backed Team Memory](projects/source-backed-team-memory.md), and
[professional development](projects/professional-development.md). Historical
visual and participatory work remains grouped in
[participatory public practice](projects/participatory-public-practice.md).

The July 15 [Google Drive Shared Drive archival-production pass](projects/google-drive-archive-production.md)
adds a privacy-screened corpus method plus concrete records for commercial
vacancy public-data design, Fair Rent NYC web operations, and Sunday Dinner /
196 participation infrastructure. Maps, neighborhood communications,
photographs, recordings, video, brand-system, and cultural-media leads remain
inquiries where authorship, methodology, role, completion, consent, accuracy,
context, or rights are unresolved.

The July 15 [social-media archival-production pass](projects/social-media-archive-production.md)
adds a public-safe account registry and bounded engagement ledgers for CallNYC,
NYC Artist Coalition and its shared campaigns, WOW List, KC Town Hall, and KC
Spaces Fund. It keeps project identity, account establishment, shared use,
individual post authorship, public interaction, endorsement, and policy
causation as separate claim types.

The CallNYC pass also preserves a reproducible item-level corpus: 107 distinct
timeline items recovered against a 110-post profile baseline, with the raw
authenticated capture, transformation manifest, derivation script, posted URL
inventory, and unresolved three-count difference kept together. See the
[full-population research run](runs/2026-07-15-callnyc-x-full-population.md).

The [WOW List full-population pass](projects/wowlist.md) reconciles all 38
profile-reported posts to 38 distinct canonical status IDs. Its reproducible
corpus separates 22 authored posts from 16 reposts, resolves all 35 posted
short-URL occurrences, recovers three public product-support conversations,
and preserves organizer-use, civic-care, and field-learning patterns without
assigning every project-account post to Jamie. See the
[research run](runs/2026-07-15-wowlist-x-full-population.md).

Historical scale and Jamie's technical contribution have a separate archive
inquiry and intake, so the social corpus is not asked to prove implementation
or adoption.

The [KC Town Hall project note](projects/kc-town-hall.md) now links a complete
183-record public-account fixture to the existing municipal, Phase One,
neighborhood-listening, and stewardship records. The population separates 142
originals, 13 replies, 28 reposts, and five conversation-context cards; retains
posted-source and stakeholder-response inventories; and keeps historical
contact details, raw post text, individual authorship, self-published program
totals, endorsement, and causal impact behind explicit boundaries. A separate
redacted acquisition ledger preserves the authenticated route inventory, and a
31-item URL disposition ledger routes every posted short URL to a promoted
source, an operational link family, or a named research inquiry. See the
[full-population research run](runs/2026-07-15-kctownhall-x-full-population.md).
The case study now also projects the municipal packet's statement that the
$189,629 Phase One scope was completed and its collaborative survey account
while keeping Jamie's general-contractor title and individual survey authorship
in research.

The [NYC Artist Coalition project note](projects/nyc-artist-coalition.md) now
links a population-accounted `@NYCArtC` archive. The profile's 5,124 reported
slots are dispositioned as 3,367 recovered public items and an explicit
1,757-item owner-archive gap. A minimized public ledger preserves aggregate
classifications and cryptographic reconciliation controls; the authenticated
capture, full item-level record, bulk post text, and per-item counters stay
protected outside the repo. All new social metrics remain held from the public
site. See the
[research run](runs/2026-07-15-nycartc-x-full-population.md).

The personal [@urbanhermit project note](projects/urbanhermit.md) records a
complete capture-date live-profile pass: three independent traversals recovered
the same 434-status population. The public repo retains a minimized aggregate,
digest, and selected-source ledger; the item-level capture, raw post text,
ordinary-life context, and other people's unnecessary traces stay in Jamie's
protected archive. Selected public attributions deepen WOW List, Horse Lords,
8th Street Tunnel, NYC Artist Coalition, and Tired of Tires records without
adding a new website projection. See the
[research run](runs/2026-07-15-urbanhermit-x-full-population.md).

The July 16 [personal and WOW List Facebook event pass](projects/personal-and-wowlist-facebook-events.md)
accounts for all 511 cards exposed by Jamie's personal Past Events surface,
separates 20 explicit organizer records from 491 profile-associated research
leads, and records one current WOW List Page rendering with no Events section
as a historical-preservation inquiry. The complete personal index remains
protected; the public repo keeps a minimized ledger, integrity digests,
selected mission-relevant events, and strict response and stakeholder
boundaries. See the
[research run](runs/2026-07-16-facebook-personal-wowlist-events.md).
