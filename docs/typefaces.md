# Typefaces

The V1 site uses Google-hosted web fonts through `next/font/google`:

- Karla for body and UI text.
- Archivo Narrow for display headings.

No private, proprietary, or unlicensed font files should be committed or served.

## Rationale

Karla keeps long proof, case-study, and documentation text readable. Archivo
Narrow gives headings a civic placard quality without importing private brand
fonts or making the page feel decorative.

## Rules

- Do not commit `.otf`, `.ttf`, `.woff`, `.woff2`, or other local font files.
- Do not reference private font names in public-facing app code.
- Keep letter spacing at `0`.
- Use display type for page titles and major headings only.
- Verify mobile headings after type changes.
