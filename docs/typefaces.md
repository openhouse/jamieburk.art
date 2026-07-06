# Typeface Policy

V1 uses a small, explicit type system:

- Karla: body text, UI text, prose, cards, headings, and readable case-study
  surfaces.
- Oswald: nav, labels, eyebrows, compact metadata, and status-like annotations.
- League Spartan: rare generated Open Graph or display material only.

Archivo Narrow is rejected for V1 because it overlaps with the Oswald decision
and would create a second narrow/display voice without a distinct job.

## Implementation

The served fonts are configured in `apps/www/src/app/layout.tsx` through
`next/font/google`. CSS variables are defined in `apps/www/src/app/globals.css`:

- `--font-body`
- `--font-display`
- `--font-label`

`DESIGN.md` and the colophon should continue to match those served fonts. If the
implementation changes, update both documents in the same pull request.

## Readability Rules

Use uppercase Oswald only for short labels, nav items, eyebrows, and metadata.
Keep tracking restrained, avoid negative letter spacing, and check mobile wraps
for labels longer than one or two words.

Long-form reading surfaces stay in Karla. Do not use Oswald for paragraphs or
case-study body copy.

## Font Safety

Do not commit proprietary or private font files. The public-safety check fails on
font binary extensions in the repo.
