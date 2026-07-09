# Public Safety

This is the top-level launch reference. The canonical detailed policy lives in
`docs/knowledge-bank/public-safety.md`.

## Rule

The repo is public. Do not commit raw transcripts, private correspondence,
private coalition notes, legal-review materials, client-private documents, raw
community records, unapproved screenshots, unapproved photos, unapproved quotes,
credentials, private stakeholder lists, internal analytics, private font files,
or raw spreadsheets with private rows.

## Release Gates

- `npm run knowledge-bank`
- `npm run public-safety`
- `npm run check`
- `npm run preflight:staging`
- `npm run preflight:production`

Production indexing requires Jamie's explicit approval before
`NEXT_PUBLIC_ROBOTS_POLICY=index` is set.

