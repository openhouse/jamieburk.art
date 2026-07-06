# Content Safety

This portfolio is public-safe by design. It should make Jamie's work legible
without exposing private records, sensitive coalition context, or unapproved
materials.

## Publishable Patterns

- Use public-safe summaries, approved artifacts, representative diagrams,
  redacted screenshots, source maps, decision records, handoff memos, and
  careful role descriptions.
- Use collective-work language where appropriate: contributed to, helped
  structure, stewarded, supported, co-built, translated, and maintained.
- Keep the Known / Open / Protected pattern visible on work pages:
  - Known: what can be stated publicly now.
  - Open: what needs Jamie or collaborator approval.
  - Protected: what must stay offline.

## Do Not Publish

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health or financial details, private correspondence,
unapproved photos, private fonts, credentials, stakeholder lists, internal
analytics, client-private materials, or raw community records.

Do not use old private material to resolve a public launch blocker. If a value,
artifact, name, metric, screenshot, link, photo, or quote is uncertain, mark:

```txt
TODO: Jamie approval required.
```

## Production Gate

Staging may include visible TODOs while Jamie reviews the site. Production must
not. Run the release gate before any production deploy:

```bash
npm run check:production
```

That command intentionally blocks production while unresolved approval markers,
placeholder resume text, draft/private public data, unsafe URLs, private font
references, or obvious private-material markers remain in public routes,
content, data, or metadata.
