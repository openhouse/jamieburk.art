# Typeface Policy

## Production V1

Use only:

- Karla: body text, prose, navigation, cards, UI labels, and long-form reading.
- Archivo Narrow: headings, eyebrows, proof labels, compact metadata, and public-notice emphasis.

Both fonts are loaded through `next/font/google`.

## Private-Font Guardrails

Do not commit or serve `.ttf`, `.otf`, `.woff`, or `.woff2` files.

Treat Trade Gothic, Verlag, Gotham Rounded, Risque, and Maria as design
references only unless Jamie explicitly supplies licensing, permission, and a
production decision.

## Review Rules

- Keep body copy readable before expressive.
- Use display type for hierarchy, not ornament.
- Keep letter spacing at `0`.
- Do not introduce private, proprietary, or unlicensed font files.
- Run `npm run check:production` before production promotion.
