# Homepage hiring sequence

## Decision

The homepage is an argument, not a chronology. Its five selected projects stay
in this order:

1. **NYC Artist Coalition / FairRentNYC** - establish current civic consequence,
   field credibility, and coalition operations.
2. **CallNYC.org** - show direct resident-facing product translation with the
   original launch interface, while keeping its present archived and unofficial
   status explicit.
3. **KC Spaces Fund** - prove rapid implementation and visual finish through the
   campaign's coherent public website, with collaborator-led campaign credit.
4. **Harry J. Epstein Company** - establish long-term technical and operational
   stewardship in a durable commercial system.
5. **WOWList.org** - close with original platform thinking, natural-language
   interaction design, community operations, and product range.

The order answers five hiring questions in sequence: Is the work current? Can
Jamie translate public needs into a usable service? Can he ship a polished
interface? Can he steward a system over time? Can he originate a product model?

## Visual rhythm

The first card is a situated field photograph. The next two are contrasting
public interfaces: CallNYC's coral civic-information system, then KC Spaces
Fund's deep-blue campaign surface. Harry J. Epstein follows with a commercial
storefront, and WOW List closes with a community-platform threshold. Captions
state what each image proves and preserve historical or collective-credit
context without asking the image to carry unsupported claims.

## Maintenance mechanism

- `homepageHiringSequence` in `apps/www/src/data/work.ts` is the canonical
  ordered list used to render the homepage.
- The “Start here” path mirrors Technical Operations, the first three project
  proofs, and the resume.
- `homepage-hiring-sequence` in the layout eval is a blocking deterministic
  gate. It runs before any optional hiring-reader role-play assessment.
- CallNYC uses an original 2016 press-kit screenshot; its caption must identify
  the current instance as archived, unofficial, and non-current.
- KC Spaces Fund uses a public website capture; its copy must describe Jamie's
  web implementation role while preserving collaborator-led campaign credit.
- A later reorder should name the changed hiring question, update this decision,
  update the deterministic gate, and receive human editorial review.

Automated checks do not replace Jamie's visual, factual, rights, or production
approval.
