# Typefaces

V1 uses Karla for body/UI text and League Spartan for display headings through
`next/font/google`.

This is a conservative production choice: it is already implemented, readable,
license-safe through Google Fonts, and stable across the current visual system.

## Policy

- Keep `next/font/google` as the only font-loading method for V1.
- Do not commit `.ttf`, `.otf`, `.woff`, or `.woff2` files.
- Do not reference private or proprietary font names in shipped CSS stacks.
- If the display face changes later, update `apps/www/src/app/layout.tsx`,
  `apps/www/src/app/globals.css`, the colophon, and this file in the same
  commit.

## Current Colophon Wording

Karla for body/UI text and League Spartan for display headings. No private or
proprietary font files are committed or served.

