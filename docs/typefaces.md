# Typeface Policy

V1 ships with safe web fonts only through `next/font/google`, so fonts are
self-hosted by Next.js and not fetched directly from Google by the browser.

## Shipped

- Karla: body/UI/prose.
- Archivo Narrow: display/headings/eyebrows/proof labels.

## Why This Pair

Karla keeps long case-study summaries, navigation, labels, and operational copy
readable without becoming corporate-neutral. Archivo Narrow gives headings,
eyebrows, and proof labels a compact civic / operating-system emphasis.

Together they safely evoke the practical energy of condensed public-facing
grotesques and friendly rounded sans faces without shipping, naming in CSS, or
serving any private or proprietary font files.

## Not Shipped Unless Licensed

- Trade Gothic Bold.
- Verlag Black.
- Gotham Rounded.
- Risque / RISQUE.

## Not Shipped Unless Explicitly Permissioned

- Maria handwriting font.

## Rules

- Do not commit private or proprietary font files.
- Do not serve private or proprietary font files.
- Do not reference proprietary font names in shipped CSS stacks.
- Keep production font loading on `next/font/google` for V1.
