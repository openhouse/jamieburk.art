# Typefaces

The V1 type pairing is Karla + Archivo Narrow, loaded through
`next/font/google`.

- Karla: body, UI, prose, navigation, buttons, and long-form case-study text.
- Archivo Narrow: H1/H2, display headings, compact proof labels, and public
  metadata emphasis.

No private or proprietary font files should be committed or served. Do not ship
Trade Gothic, Verlag, Gotham Rounded, FondFont RISQUE, Maria, or local font
files for V1.

If a future design review changes the pair, update:

- `apps/www/src/app/layout.tsx`
- `apps/www/src/app/globals.css`
- `DESIGN.md`
- `docs/typefaces.md`
- `apps/www/src/app/colophon/page.tsx`
