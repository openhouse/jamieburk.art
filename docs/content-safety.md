# Content Safety

This portfolio is public-safe by default. It is not a private archive, transcript browser, analytics dump, or source-material repository.

## Rules

- Do not publish private emails, raw transcripts, private coalition notes, legal-review materials, health/financial details, private correspondence, unapproved photos, private fonts, credentials, stakeholder lists, internal analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted examples, representative diagrams, approved artifacts, and careful collective-work language.
- When uncertain, do not invent and do not publish a public-facing TODO. Move the uncertainty into review notes, checklists, or a launch blocker.
- Production requires Jamie approval for facts, contact, resume, claims, collaborator names, screenshots, quotes, artifacts, and go/no-go.

## Known / Open / Protected

Known is public-safe and evidence-backed enough to say. Open needs approval, citation, screenshot, or stronger evidence. Protected is intentionally omitted because privacy, consent, client trust, law, civic sensitivity, or community safety requires it.

## Production Gate

Run these before production promotion:

```bash
npm run check:public-safety
npm run check:production
```

Staging may expose review state. Production must not expose unresolved approval TODOs, placeholder contact labels, placeholder resume text, private or draft work states, private paths, secrets, private font references, or the placeholder resume PDF.
