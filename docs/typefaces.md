# Typeface Policy

V1 uses safe web fonts only.

## Shipped Pairing

- Karla: body text, UI text, buttons, ordinary links, and long prose.
- Archivo Narrow: display headings, section eyebrows, proof labels, compact
  metadata, and selected OpenGraph treatment.

## Rules

- Do not commit private, proprietary, or unlicensed font files.
- Do not serve private, proprietary, or unlicensed font files.
- Do not reference private font names in shipped CSS stacks.
- Load shipped web fonts through `next/font/google`, which self-hosts the font
  assets in the built app.

## Not In V1

- League Spartan is removed from the public V1 implementation.
- Oswald is not part of this release.
- Private handwriting or proprietary display fonts are not part of this release.
