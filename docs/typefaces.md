# Typeface Policy

V1 uses safe web fonts through `next/font/google`.

## Production Direction

- Karla for body, UI, and prose.
- Archivo Narrow for display headings, page titles, proof labels, and compact
  case-study headings.

This pairing supports the intended public voice: clear, civic, compact, and
professional without using private or proprietary font files.

## Not Shipped

Do not commit, serve, or reference private/proprietary copies of:

- Trade Gothic
- Verlag
- Gotham Rounded
- FondFont RISQUE
- Maria handwriting font
- any unapproved `.ttf`, `.otf`, `.woff`, or `.woff2` file

These typefaces may remain design references in private notes, but they are not
part of the public production CSS stack.

## Review

Before production indexing:

- Confirm no font files are committed.
- Confirm public CSS stacks do not reference private/proprietary fonts.
- Confirm headings and compact proof labels render acceptably with Archivo
  Narrow.
