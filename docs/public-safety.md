# Public-Safety Governance

The portfolio publishes public-safe summaries, representative artifacts, and approved public materials. Private source material stays outside the repository and outside the Docker context.

## Global No-Publish Rules

Do not publish private emails, raw transcripts, private coalition notes, legal-review materials, health or financial details, private correspondence, unapproved photos, private fonts, credentials, private stakeholder lists, internal analytics, client-private materials, or raw community records.

Use careful collective-work language where outcomes were collaborative: contributed to, helped structure, supported, stewarded, translated, coordinated, maintained, and co-built.

## Project-Specific Rules

### Harry J. Epstein Company

Do not publish private dashboards, internal revenue details, customer data, vendor terms, credentials, or internal operating practices.

### FairRentNYC / NYC Artist Coalition / Commercial Rent Stabilization

Do not publish private coalition notes, legal-review materials, stakeholder lists, raw strategy context, private emails, or unapproved quotes.

### CallNYC

Always frame as an archived civic-data prototype, not an official or current City Council service.

### 196 / Sunday Dinner

Do not publish guest lists, attendance lists, private resident details, addresses, unapproved images, or private community records.

### KC Town Hall

Do not publish private financial, legal, property, banking, partner, ownership, or stakeholder details.

### Source-Backed Team Memory

Frame as an early method / lab / proof-of-practice. It is not production SaaS, not a replacement for judgment, and not a private archive browser.

## Production Gate

`npm run public-safety` checks public source, public assets, PDFs, work metadata, env policy, routes, sitemap, robots, and Docker context risk. `npm run check:production` runs the same gate with production indexing explicitly enabled.
