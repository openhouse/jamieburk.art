# Typeface Policy

V1 ships with safe web fonts only.

## Shipped

- Karla: body, UI, and prose.
- Archivo Narrow: display, headings, eyebrows, and proof labels.

## Not Shipped Unless Licensed

- Trade Gothic Bold.
- Verlag Black.
- Gotham Rounded.

## Not Shipped Unless Explicitly Permissioned

- Maria handwriting font.

## Rules

- Do not commit private or proprietary font files.
- Do not serve private or proprietary font files.
- Use `next/font/google` so web fonts are self-hosted by Next.js.
- Safety scripts must not fail only because this policy document mentions proprietary reference fonts.
- Do not reintroduce League Spartan or Oswald for V1 without a deliberate design decision.
