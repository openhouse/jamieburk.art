# Content Workflow

Use this site as a public-safe proof surface, not a full archive.

## Add A Work Item

1. Add metadata in `apps/www/src/data/work.ts`.
2. Add the matching MDX page in `apps/www/src/content/work/`.
3. Use public-safe summaries, representative workflow language, and approved public links only.
4. Keep the `knownOpenProtected` fields current so each page is clear about what is known, what remains open, and what stays protected.
5. Run `npm run typecheck`, `npm run lint`, and `npm run build`.

## Public-Safety Labels

Use the existing metadata fields consistently:

- `public`: approved public material.
- `public-safe`: summary written for public release without sensitive detail.
- `summary-only`: intentionally brief, with private source material omitted.
- `redacted`: public page depends on redacted artifacts.
- `private`: do not publish as a public page.
- `Draft`: not ready for staging review.

## Approved Artifacts

Approved artifacts may include:

- public links;
- redacted screenshots;
- recreated diagrams;
- public-safe workflow maps;
- approved handouts or press links;
- summary-only evidence statements.

Do not add an artifact just because it exists. Add it only when it is approved, useful, and safe for the public V1 site.

## Never Commit

Do not commit private emails, raw transcripts, private coalition notes, stakeholder lists, legal-review materials, unapproved quotes, unapproved photos, raw Sunday Dinner or residency records, health details, therapy details, financial details, home address details, credentials, private font files, private analytics dashboards, private revenue detail, or client-sensitive materials.

## Resume PDF

The expected public resume path is:

```text
apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
```

Only add that file when Jamie has approved it for public download. Until then, keep PDF download links hidden and let the resume page state that the PDF is pending.
