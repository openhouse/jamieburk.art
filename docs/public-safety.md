# Public Safety

This repo may contain public-safe summaries, approved artifacts, redacted or
recreated examples, and reviewed content. Private source materials must live
outside this repo.

## Do Not Commit

- Private emails or private correspondence.
- Raw transcripts or raw community records.
- Private coalition notes or legal-review materials.
- Health, financial, banking, property, or stakeholder-private details.
- Client-private materials, internal analytics, credentials, secrets, tokens, or
  API keys.
- Private or proprietary font files.
- Unapproved photos, screenshots, quotes, names, or source artifacts.
- `.env` files other than `.env.example`.
- `.key`, `.pem`, `.ttf`, `.otf`, `.woff`, or `.woff2` files.

## Allowed Public-Safe Materials

- Public-safe summaries.
- Proofs-bank claims reviewed for newspaper-safe publication.
- Representative diagrams.
- Redacted examples.
- Approved PDFs and public artifacts.
- Collective-work language where work was collaborative.
- Known / Open / Protected summaries that explain what can be said, what needs
  review, and what stays protected.

## Scanner

Use one canonical scanner:

```bash
node scripts/check-public-safety.mjs
node scripts/check-public-safety.mjs --production
```

Non-production mode may warn on approval-sensitive language. Production mode
fails hard on blockers.

## Review Records

Public-safety findings should be reviewed in the release checklist or PR notes.
Do not copy private values into logs or comments. If a finding is intentionally
allowed, record the reason, owner, and review date.
