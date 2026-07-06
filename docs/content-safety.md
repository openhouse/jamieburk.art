# Content Safety

This portfolio is public-safe before it is persuasive.

Publish public-safe summaries, approved artifacts, redacted examples, and
representative diagrams. Use careful collective-work language: contributed to,
helped structure, stewarded, supported, co-built.

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health or financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, or raw community records.

When uncertain, mark `TODO: Jamie approval required.` Staging may show these
blockers. Production must not.

Protect the Known / Open / Protected pattern:

- Known: what can be said publicly now.
- Open: what needs Jamie or collaborator approval.
- Protected: what stays offline even if it explains the work.

Run:

```bash
npm run check:content
npm run check:production
```

`check:production` is expected to fail until launch blockers are resolved.
