# Typeface Policy

This V1 site ships a public-safe Google-font system through `next/font/google`.

## Shipped

- Karla: body text, UI prose, cards, paragraphs, and long descriptions.
- Archivo Narrow: display headings, section eyebrows, compact proof labels, and metadata.
- System sans fallbacks: used when web fonts are unavailable.

## Not Shipped

- Oswald.
- Private or proprietary typefaces.
- Local `.ttf`, `.otf`, `.woff`, or `.woff2` files.
- Handwriting or display fonts without explicit licensing and approval.

## Enforcement

Private/proprietary font files are ignored by `.gitignore` and `.dockerignore`.
`npm run public-safety` fails if tracked font files appear outside ignored build
output.
