# Launch Checklist

This site is staging-first. Production should not become indexable until Jamie
approves the items below.

## Contact

- Confirm the public email.
- Confirm LinkedIn and GitHub URLs, or remove those rows before launch.
- Do not launch production while the primary contact path is still a TODO.

## Resume

- Replace the placeholder resume PDF with the current approved PDF.
- Confirm whether the resume PDF should be indexable in production.
- If the PDF should remain download-only, add a production `X-Robots-Tag:
  noindex` header for the PDF route before launch.

## Proof Metrics

Confirm these claims before production indexing:

- 14+ years building operating structure.
- 2x revenue growth contribution for a legacy e-commerce business.
- 30+ pages of civic campaign-memory infrastructure.
- 35 city ecosystems reached through WOWList.org.
- 300+ hosted gatherings / 20+ resident artists supported.

Keep the language careful: contributed to, helped structure, built and
stewarded, supported, co-built, translated, public-safe summary, archived
prototype, and proof-of-practice.

Avoid stronger claims unless Jamie explicitly approves them: caused,
guaranteed, single-handedly, official, legal determination, owned the campaign,
led the movement, or AI platform.

## Public Safety

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health or financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, raw community records, private
guest/residency details, private company or coalition strategy, or unapproved
quotes.

When uncertain, write: `TODO: Jamie approval required.`

## Indexing And Routes

- Confirm staging serves `noindex, nofollow`.
- Confirm production metadata uses `https://jamieburk.art`.
- Keep `/work/fairrentnyc-commercial-rent-stabilization` canonical.
- Keep `/work/fair-rent-nyc` redirected to the canonical FairRentNYC route.
- Keep `/work/source-backed-team-memory` redirected to
  `/lab/source-backed-team-memory`.

## Bounded Scope

- Keep Source-Backed Team Memory framed as early research / method / consulting
  practice.
- Do not frame it as production SaaS, an AI replacement for judgment, or a
  private archive browser.
- Do not add a CMS, database, auth, search, analytics, AI chatbot, archive
  browser, contact-form backend, or major framework change for V1.
