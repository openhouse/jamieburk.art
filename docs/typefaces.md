# Typefaces

The V1 type direction is public-safe and font-file-free.

## Current Policy

- Karla is the body, UI, prose, card, and long-reading font.
- Oswald is the label, metadata, section-eyebrow, and compact civic-emphasis
  font.
- A Palatino-first system serif is the display face for identity and editorial
  landmarks. The global Open Graph image uses a metadata-stripped transparent
  raster of Jamie's name made in Palatino because `ImageResponse` cannot use
  the server's platform fonts.
- The raster preserves visible letterforms but does not distribute a
  reconstructive font program. No private, proprietary, unlicensed, or
  unapproved font files should be committed or served from this repo.

Karla and Oswald continue through `next/font/google`. Palatino remains a system
font with the existing serif fallbacks; only the rasterized name artwork enters
the public bundle.
