# Typeface Policy

V1 ships with safe web fonts only.

## Production Pairing

- Karla: body text, UI text, long prose, buttons, ordinary links, and dense
  reading surfaces.
- Archivo Narrow: display headings, section eyebrows, proof labels, compact
  metadata, status labels, and OpenGraph display treatment where legible.

## Not Used In V1

- League Spartan from the scaffold.
- Oswald from alternate production-readiness variants.
- Private handwriting fonts or proprietary local font files.

## Rules

- Use `next/font/google` for Karla and Archivo Narrow.
- Do not commit private or proprietary font files.
- Do not serve private or proprietary font files.
- Do not reference proprietary font names in shipped CSS stacks.
- Keep letter spacing at `0`.
- Verify labels remain readable on mobile.
