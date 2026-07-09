# Launch Checklist

Use this before staging review, production smoke testing, or sharing the site
with OTI, Jonathan Marmor, referrers, or aligned civic/product contacts.

## Content

- Homepage states: "I turn ambiguous, loosely defined work into usable systems
  for public-facing teams."
- Contact page shows public email, Brooklyn, LinkedIn, GitHub, resume, and the
  best-fit conversations note.
- Resume page has HTML fallback content: Profile, Core Capabilities, Selected
  Impact, Experience summary, Education / Professional Development, and PDF
  CTA.
- Technical Operations page can stand alone as an OTI referral page.
- Source-Backed Team Memory is bounded as a 1-2 week sprint / consulting
  practice, not a finished SaaS.
- Footer says: "Public-safe, referral-ready proof site for selected
  professional work."

## Claims

- Each strong public claim maps to `apps/www/src/data/proofs.ts`.
- KC Spaces Fund remains internal-only until collaborators confirm public
  wording.
- FairRentNYC and CRS use collective-work language.
- HJE growth language says contribution, not causation.
- CallNYC is archived and unofficial.
- 196 / Sunday Dinner does not expose participant names, photos, addresses, or
  attendance records.
- KC Town Hall omits private legal, financial, family, property, lender, and
  partner details.

## Checks

- `npm run public-safety`
- `npm run knowledge-bank`
- `npm run check:routes`
- `npm run check`
- `npm run preflight:staging`
- `npm run preflight:production:soft`
- `npm run preflight:production`

## Manual Review

- Keyboard navigation works.
- Skip link appears on focus.
- Mobile navigation works at 320px.
- Headings are logical and each page has one H1.
- Link labels make sense out of context.
- Proof cards do not rely on color alone.
- Reduced motion is respected.
- Resume PDF downloads and remains noindex.
- Staging is noindex.
- Production indexing is explicit opt-in only after final review.
