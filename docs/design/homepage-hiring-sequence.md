# Homepage hiring sequence

## Decision

The homepage is an argument, not a chronology. Its six selected projects stay
in this order:

1. **Harry J. Epstein Company** - answer the rushed reader's first conventional
   employment question with long-term commercial stewardship, maintained
   systems, and a carefully framed measurable business contribution.
2. **NYC Artist Coalition / FairRentNYC** - immediately establish that Jamie's
   civic consequence, field credibility, coalition operations, and public
   communication are current.
3. **CallNYC.org** - show direct resident-facing product translation with the
   original launch interface, while keeping its present archived and unofficial
   status explicit.
4. **KC Town Hall** - carry the argument into municipal coordination, public
   funding, field implementation, resident service, and responsible transition.
5. **WOWList.org** - show original platform thinking, natural-language
   interaction design, product operations, and distributed community use.
6. **196 Artists Residency / Sunday Dinner** - close with the human purpose of
   the operating work: invitation, onboarding, facilitation, recurrence, care,
   and continuity over time.

The order answers six hiring questions in sequence: Can Jamie deliver for an
established organization? Is his public-service practice current? Can he
translate public needs into a usable service? Can he manage implementation
across municipal, physical, and operational dependencies? Can he originate a
product model? Can he sustain participation after launch?

KC Spaces Fund remains in the complete work index as a polished, truthful proof
of rapid campaign implementation and collaborator-led credit. It leaves the
homepage because the active opportunity set makes KC Town Hall's implementation
depth and Sunday Dinner's onboarding and continuity evidence more decisive.

## Visual rhythm

The sequence alternates public systems and situated work. Harry J. Epstein's
commercial storefront opens with immediate professional legibility; the Market
Hotel photograph restores bodies and current civic consequence; CallNYC shows
the resident-facing interface; KC Town Hall shows implementation in the built
world; WOW List returns to platform thinking; and Sunday Dinner closes in a
shared human scene. Captions state what each image proves and preserve
historical or collective-credit context without asking the image to carry
unsupported claims.

Before the selected-project sequence, one compact bridge pairs the Shoestring
Press facilitation photograph with the FairRentNYC public surface. It states the
portfolio's central relationship directly: the field work and the technical
work are one implementation practice. The bridge uses a different governed
photograph from the Market Hotel cover below, so the page moves from close
facilitation to public room rather than repeating an image.

## Cross-candidate synthesis, August 21, 2026

A close reading of the three staging candidates selected B as the foundation:
it offered the strongest all-purpose hiring sequence and the clearest opening
for a rushed reader. The revision retains that structure and exact reviewed
hero, imports A's strongest experiential thesis as the compact screen-and-room
bridge, and places C's more direct “See role-fit evidence” action in that
bridge. It does not import C's dark hero panel, reorder B's projects, or add
unsupported claims.

## Maintenance mechanism

- `homepageHiringSequence` in `apps/www/src/data/work.ts` is the canonical
  ordered list used to render the homepage.
- `HomeFieldSystemEvidence` is the canonical screen-and-room bridge. It stays
  between `CapabilityGrid` and the selected-project sequence and binds its
  photograph to a homepage-specific Knowledge Bank occurrence.
- The bridge's primary action leads directly to Technical Operations &
  Implementation; the hero's reviewed work-index and resume actions remain
  unchanged.
- The “Start here” path mirrors Technical Operations, the first three project
  proofs, and the resume.
- `homepage-hiring-sequence` in the layout eval is a blocking deterministic
  gate. It runs before any optional hiring-reader role-play assessment.
- CallNYC uses an original 2016 press-kit screenshot; its caption must identify
  the current instance as archived, unofficial, and non-current.
- KC Spaces Fund uses a public website capture; its copy must describe Jamie's
  web implementation role while preserving collaborator-led campaign credit.
- Sunday Dinner closes the homepage sequence and cannot be removed without a new
  human editorial decision.
- A later reorder should name the changed hiring question, update this decision,
  update the deterministic gate, and receive human editorial review.

Automated checks do not replace Jamie's visual, factual, rights, or production
approval.
