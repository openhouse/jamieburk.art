# Content Safety

This portfolio is public-safe by default. It is not a private archive, transcript browser, analytics dump, or source-material repository.

`docs/proofs-bank.md` is the canonical public-safe knowledge base for claims in
this repo. It may include strong professional claims, aggregate metrics, source
posture, and publication boundaries. It must not include raw private source
material.

## Rules

- Do not publish private emails, raw transcripts, private coalition notes, legal-review materials, health/financial details, private correspondence, unapproved photos, private fonts, credentials, stakeholder lists, internal analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted examples, representative diagrams, approved artifacts, and careful collective-work language.
- When uncertain, do not invent and do not publish a public-facing TODO. Move the uncertainty into review notes, checklists, or a launch blocker.
- Production requires Jamie approval for facts, contact, resume, claims, collaborator names, screenshots, quotes, artifacts, and go/no-go.

## Known / Open / Protected

Known is public-safe and evidence-backed enough to say. Open needs approval, citation, screenshot, or stronger evidence. Protected is intentionally omitted because privacy, consent, client trust, law, civic sensitivity, or community safety requires it.

## Project-Specific Rules

Harry J. Epstein Company:
No private dashboards, customer data, revenue detail, credentials, vendor terms, or internal operations documents.

FairRentNYC / Commercial Rent Stabilization:
No private coalition notes, legal-review materials, stakeholder lists, raw strategy context, private emails, or unapproved quotes.

CallNYC:
Archived civic-data prototype. Not an official or current City Council service.

WOWList:
No private user data, organizer contact lists, or unapproved community records.

196 / Sunday Dinner:
No guest lists, attendance records, addresses, private stories, or unapproved photos.

KC Town Hall:
No private financial, legal, property, banking, or stakeholder details.

Source-Backed Team Memory:
Early method / research / consulting practice. Not a production SaaS, AI replacement for judgment, legal or medical advice system, or private archive browser.

## Production Gate

Run these before production promotion:

```bash
npm run check:public-safety
npm run check:production
```

Staging may expose review state. Production must not expose unresolved approval TODOs, placeholder contact labels, placeholder resume text, private or draft work states, private paths, secrets, private font references, or the placeholder resume PDF.

Scanner allowlist entries, if ever used, must include a pattern, reason, owner, reviewed date, and re-review date. Do not use an allowlist to hide unresolved production questions.
