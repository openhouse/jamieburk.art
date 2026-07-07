# Launch Blockers

This checklist records what must be true before staging review can become
production approval.

## Knowledge Bank

- `claims.json` parses as JSON and exposes a top-level `claims` array.
- Every claim has an `id`, `status`, `supportLevel`, `recommendedPublicWording`,
  `allowedSurfaces`, and at least one source class.
- Every homepage proof-strip claim appears in the knowledge bank.
- `claims.md` remains a readable companion to the structured register.
- `approval-register.md`, `source-classes.md`, `public-safety.md`,
  `chad-lens.md`, `projection-map.md`, `launch-blockers.md`, and
  `anti-claims.md` are current.
- Open claims stay out of public copy until approved or softened.
- Protected context does not appear in the repo as proof material.

## Claim Discipline

- The homepage proof strip uses softened public wording.
- HJE growth language remains contribution-framed.
- NYC Artist Coalition / FairRentNYC language is collective and does not imply
  sole leadership, legal authority, or official ownership of outcomes.
- Commercial Rent Stabilization material does not expose private coalition
  notes, legal-review material, stakeholder lists, raw transcripts, private
  emails, or unapproved quotes.
- CallNYC remains framed as an archived, unofficial civic-tech prototype.
- WOWList public language does not publish raw user, organizer, account, or
  database records.
- Sunday Dinner / 196 language does not publish guest lists, attendance
  records, addresses, contact details, private stories, private interiors, or
  unapproved images.
- Source-Backed Team Memory remains a bounded method or lab, not a production
  SaaS claim.

## Website

- No `/proofs` public page exists.
- The work index uses "Representative artifacts" or equivalent public-safe
  language.
- Known / Open / Protected boundaries are visible where they help readers
  understand why private proof is not being published.
- Contact surfaces are environment-driven and use only approved public contact
  links.
- The public resume PDF is current and approved.
- Metadata, Open Graph text, and page descriptions do not strengthen claims
  beyond page body copy.
- No private fonts, credentials, local paths, private correspondence, private
  coalition records, private client materials, raw community records, or
  unapproved photos are committed.

## Accessibility And Usability

- Pages keep a clear heading order.
- Interactive controls have visible focus states.
- Link text is meaningful without surrounding context.
- Navigation landmarks and page titles are understandable.
- Text remains readable and non-overlapping on mobile and desktop.
- The site can be used without relying on image-only proof.

## Release

- `npm run check:knowledge-bank` passes.
- `npm run check` passes.
- `npm run check:production` passes with approved production environment
  values before production release.
- Staging remains noindex.
- Production becomes indexable only after Jamie approves the staging-reviewed
  content and exact deployment SHA.
