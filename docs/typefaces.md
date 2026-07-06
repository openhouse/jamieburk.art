# Typeface policy

V1 ships only safe web typefaces loaded through `next/font/google`.

## Shipped

- Body / UI / prose: Karla
- Display / headings / proof labels: Archivo Narrow

`next/font/google` self-hosts these fonts in the Next build. The browser should
not fetch them client-side from Google.

## Historical references only

These typefaces may describe the visual neighborhood, but they are not shipped:

- Trade Gothic
- Verlag
- Gotham Rounded
- FondFont RISQUE / Risque source
- Maria handwriting font

Do not commit or serve private, proprietary, unlicensed, or
permission-sensitive font files. By default, the repo should contain no `.ttf`,
`.otf`, `.woff`, or `.woff2` files.
