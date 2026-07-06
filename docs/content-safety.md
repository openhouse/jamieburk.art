# Content Safety

This site is a public-safe portfolio, not a private archive. Publish summaries,
representative patterns, redacted examples, approved public artifacts, and
careful collective-work language.

## Rules

- Publish public-safe summaries only.
- Use careful collective-work language: contributed to, helped structure,
  stewarded, supported, co-built.
- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health/financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- When uncertain, mark `TODO: Jamie approval required`.
- Protect the Known / Open / Protected pattern on work pages.

## Production Gate

Run the content scan before production:

```bash
npm run check:content
APP_ENV=production npm run check:content
npm run check:production
```

Staging may contain approval TODOs. Production must not contain unresolved TODOs,
placeholder resume language, draft/private content states, private-material
markers, production metadata pointing at staging or localhost, or private font
files.
