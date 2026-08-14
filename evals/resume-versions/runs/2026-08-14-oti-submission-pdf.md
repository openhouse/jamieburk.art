# OTI Senior Product Manager submission PDF hill climb

Date: 2026-08-14
Job ID: 782366
Resume source: `resume-versions/2026-08-14/nyc-oti-senior-product-manager-782366/Jamie-Burkart-Resume.md`

## Outcome

The application-specific Markdown resume was imported into a native copy of a
previous Google Docs resume. The previous document was treated as read-only and
its revision remained unchanged after the copy-and-adapt workflow. Google Doc
source and copy locators are intentionally not committed.

The final PDF is a two-page, tagged US Letter document. It preserves the prior
resume's Palatino Linotype name treatment, Oswald role line, Karla body and
heading system, teal accent, compact margins, bullet geometry, and contact-link
treatment.

One factual boundary was strengthened before export: the KC Town Hall line now
says `$490,539 public funding recommendation`, matching the governed public
claim rather than calling the recommendation an award.

## Visual hill climb

The first export split the Selected Product Evidence list between pages. A
forced break before WOWList overcorrected and left too much white space on page
one. The retained composition breaks before 196 Artists Residency, keeping
WOWList with the primary product narrative and allowing every experience block
and evidence list to remain intact.

Both final pages were rendered at 144 dpi and visually inspected. The final
artifact has no clipping, overlap, broken glyphs, stranded heading, or isolated
bullet continuation. Text extraction remains machine-readable.

## Deterministic gate

The resume-version eval now binds the source Markdown digest to the exact PDF
digest and checks:

- two page objects and a two-page PDF page tree;
- a tagged document-title presentation flag;
- embedded Palatino Linotype, Oswald, and Karla fonts;
- US Letter, byte-count, filename, and MIME metadata;
- a complete two-page visual-inspection receipt; and
- omission of protected Google Docs locators.

A mutation test proves that a stale PDF digest fails closed.

## Human gates

- Jamie approves the exact PDF before application upload.
- Jamie verifies the production portfolio URL after deploying the approved
  candidate.
- NYC OTI determines civil-service minimum-qualification eligibility and every
  hiring decision.
