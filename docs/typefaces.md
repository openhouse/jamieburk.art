# Typeface Policy

V1 ships with safe web fonts only through `next/font/google`, so fonts are
self-hosted by Next.js and not fetched directly from Google by the browser.

## Shipped

- Karla: body/UI/prose.
- Archivo Narrow: display/headings/eyebrows/proof labels.

## Not Shipped Unless Licensed

- Trade Gothic Bold.
- Verlag Black.
- Gotham Rounded.

## Not Shipped Unless Explicitly Permissioned

- Maria handwriting font.

## Rules

- Do not commit private or proprietary font files.
- Do not serve private or proprietary font files.
- Do not reference proprietary font names in shipped CSS stacks.
- Keep production font loading on `next/font/google` for V1.
