# Proofs Bank

This repo contains a public-safe knowledge base of Jamie Burkart's professional
accomplishments. Treat every line as publishable: if a claim would be awkward,
unsafe, or unfair in a newspaper, it does not belong here.

The canonical structured bank is `apps/www/src/data/proofs.ts`. The website
projects selected claims from that file into homepage proof points, resume-page
highlights, work-page evidence, and the Technical Operations role page.

## Rules

- Keep claims specific, bounded, and source-aware.
- Prefer durable accomplishment claims over private source detail.
- Use collective-work language where the work was collaborative.
- Separate the public claim from the protected evidence behind it.
- Do not publish credentials, private contacts, private records, unapproved
  images, private financial detail, sensitive strategy context, or user-level
  archive exports.
- If a claim needs approval or a better source trail, do not project it onto the
  website.

## Claim Fields

Each proof claim should include:

- `id`: stable claim identifier.
- `claim`: public-safe core wording.
- `detailedClaim`: fuller public-safe explanation.
- `sourceBasis`: source category, not a private file path.
- `sourceNote`: short public-safe basis for why the claim is defensible.
- `publicBoundary`: what the claim must not expose or imply.
- `defensibility`: `strong`, `bounded`, or `contextual`.
- `surfaces`: approved website projections for specific audiences.

## Current Public-Safe Claims

| Claim ID | Defensibility | Public-safe claim | Source basis | Boundary |
| --- | --- | --- | --- | --- |
| `career-operating-structure-14-years` | Strong | 14+ years creating operating structure across civic, cultural, small-business, and technical environments. | Approved resume and public-safe review of selected work. | Does not imply one continuous title, employer, or full-time role. |
| `hje-modernization-stewardship` | Strong | Led long-running web, e-commerce, marketing, analytics, content, and operational workflow improvements for Harry J. Epstein Company. | Approved resume, public HJE site, public-safe narrative review, and firsthand operational record. | No dashboards, customer data, vendor terms, credentials, revenue breakdowns, or sensitive operating practices. |
| `hje-revenue-growth-contribution` | Bounded | Contributed to a period of 2x revenue growth for a legacy e-commerce business. | Approved resume and firsthand operational record. | Must stay as contribution language; no sole-causation claim. |
| `fairrent-campaign-memory-30-pages` | Strong | Built and stewarded 30+ pages of shared civic campaign memory and source maps. | Public-safe review of campaign-memory materials and firsthand operational record. | No sensitive strategy context, legal or policy review detail, collaborator lists, or unapproved quotes. |
| `fairrent-known-open-protected-method` | Strong | Used Known / Open / Protected boundaries to separate public-safe material, unresolved questions, and protected civic coordination context. | Public-safe review of documentation patterns. | Describe the method without exposing the protected material. |
| `callnyc-civic-data-prototype` | Bounded | Built CallNYC as an archived civic-data prototype after a New York City Council civic-data hackathon. | Approved resume and historical project review. | Do not present it as current, official, comprehensive, legal, emergency, or agency guidance. |
| `wowlist-platform-model` | Strong | Co-built WOWList as a Python / Django + Ember.js community-calendar platform organized around followable keyword communities. | Historical project review and aggregate archive analysis. | No private user data, organizer contact details, or unapproved community records. |
| `wowlist-scale-aggregate` | Strong | Aggregate local-archive analysis supports WOWList usage across 35+ city scenes, with 1,800+ users and 16,000+ posts/events. | Aggregate archive analysis. | Keep numbers aggregate; no raw exports or user-level records. |
| `sunday-dinner-participation-infrastructure` | Strong | Created participation infrastructure for 196 Artists Residency / Sunday Dinner, documenting 300+ gatherings and supporting 20+ resident artists. | Approved resume and public-safe review of community records. | No guest lists, attendance records, addresses, private stories, or unapproved images. |
| `kc-town-hall-public-funding` | Strong | Co-led redevelopment planning and public-benefit documentation for KC Town Hall LLC, including work tied to a $490,539 public funding recommendation. | Approved resume and public-safe project review. | No private financial, legal, property, banking, or stakeholder detail. |
| `source-backed-team-memory-method` | Strong | Designs source-backed documentation practices for knowledge-heavy teams: decision lineage, onboarding context, meeting synthesis, and human-correctable AI workflows. | Public-safe lab materials, consulting proposals, and reviewed method descriptions. | Present as an early method and consulting practice, not a finished production SaaS or replacement for judgment. |

## Projection Model

The proof bank can hold more nuance than the website shows. A claim should only
appear on a public page when the surface has an explicit projection string:

- `homepage`: short, scan-friendly proof point.
- `resume`: resume-page highlight.
- `workEvidence`: selected proof for a case study.
- `technicalOperations`: role-specific proof for hiring or implementation
  reviewers.

This lets the site stay clear while the repo keeps the editorial reasoning
behind the claims.
