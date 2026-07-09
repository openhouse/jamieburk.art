# Content Safety

This repo is public. The public site may project strong, defensible claims, but
private proof material stays outside the repo.

## Public-Safe Defaults

- Use `docs/knowledge-bank/claims.md` and `apps/www/src/data/proofs.ts` as the
  claim source of truth.
- Use contribution language for collective or multi-factor outcomes.
- Keep unresolved review state out of production-facing pages.
- Keep phone numbers out of website HTML; the approved resume PDF may contain
  Jamie's phone number.
- Use public sources, approved resume language, public-safe archive summaries,
  and collaborator-reviewed wording.

## Do Not Commit

- Raw transcripts, raw Otter exports, repaired transcript dumps, speaker/timecode
  dumps, or private meeting notes.
- Private coalition notes, legal-review materials, private correspondence,
  stakeholder lists, applicant/grantee records, donor/list exports, or payment
  files.
- Internal analytics dashboards, customer data, vendor terms, credentials,
  secrets, private keys, certificates, or environment files.
- Private/proprietary font files, unapproved screenshots, unapproved photos, or
  unapproved quotes.

## Verification

Run:

```bash
npm run knowledge-bank
npm run public-safety
npm run check:routes
```

`npm run public-safety` fails on production-facing approval markers,
placeholder resume text, private-path markers, committed font binaries, secret
patterns, raw/private transcript markers, phone numbers in HTML, and non-explicit
production indexing.
