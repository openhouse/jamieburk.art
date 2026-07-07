# Content Safety

This portfolio is public-safe by default. It is not a private archive,
transcript browser, analytics dump, legal-review folder, or source-material
repository.

## Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted examples, representative diagrams,
  approved artifacts, aggregate metrics, and careful collective-work language.
- Move uncertainty into review notes, claim statuses, launch blockers, or
  approval gates. Do not put visible approval TODOs on public pages.
- Production requires Jamie approval for facts, contact, resume, metrics,
  collaborator names, screenshots, quotes, artifacts, and final go/no-go.

## Known / Open / Protected

Known means public-safe and evidence-backed enough to say.

Open means useful but requiring approval, stronger citation, screenshot review,
collaborator confirmation, or tighter wording before publication.

Protected means intentionally omitted because privacy, consent, client trust,
law, civic sensitivity, or community safety requires it.

## Production Gate

Run:

```bash
npm run check:public-safety
npm run check:production
```

Scanner allowlist entries, if ever used, must include a pattern, reason, owner,
reviewed date, and re-review date. Do not use an allowlist to hide unresolved
production questions.
