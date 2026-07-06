# Typeface Policy

V1 ships with safe web fonts only.

## Shipped

- Karla: body, UI, prose, cards, and longer descriptions.
- Archivo Narrow: display headings, section eyebrows, proof labels, and compact public-facing emphasis.

## Not Shipped Unless Licensed

- Trade Gothic Bold.
- Verlag Black.
- Gotham Rounded.
- Risque.

## Not Shipped Unless Explicitly Permissioned

- Maria handwriting font.

## Rules

- Do not commit private, proprietary, or unlicensed font files.
- Use `next/font/google` so web fonts are handled by Next rather than loaded from arbitrary external CSS.
- Production safety checks fail if tracked `.ttf`, `.otf`, `.woff`, or `.woff2` files are present outside approved generated build output.
