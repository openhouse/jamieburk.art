# Typeface Policy

V1 ships with safe web fonts only.

## Shipped

- Karla: body/UI/prose.
- Archivo Narrow: display/headings/eyebrows/proof labels.

## Not shipped unless licensed

- Trade Gothic Bold.
- Verlag Black.
- Gotham Rounded.

## Not shipped unless explicitly permissioned

- Maria handwriting font.

## Notes

- Do not commit private or proprietary font files.
- Do not reference proprietary font names in shipped CSS stacks unless Jamie explicitly requests that as non-loaded local fallbacks.
- Use `next/font/google` so web fonts are self-hosted by Next.js at build/runtime and the browser does not fetch them directly from Google.
