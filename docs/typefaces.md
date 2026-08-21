# Typefaces

The V1 type direction is public-safe and uses one governed, open-license font
asset for Jamie Burkart's name.

## Current Policy

- Karla is the body, UI, prose, card, and long-reading font.
- Oswald is the label, metadata, section-eyebrow, and compact civic-emphasis
  font.
- TeX Gyre Pagella Regular is the identity face for Jamie Burkart's name on the
  site and in the Open Graph card. It is a Palatino-related face based on URW
  Palladio L and is distributed under the GUST Font License.
- The system serif stack remains the display face for page titles and editorial
  landmarks.
- League Spartan is not required for the shipped interface in this branch.
- No private, proprietary, or unapproved font files should be committed or
  served from this repo.

Use `next/font/google` for Karla and Oswald in the HTML site. The Open Graph
renderer uses explicitly governed local Karla Regular and Bold TTFs because
adding a custom identity font replaces its default fallback set. Any committed
font must have a documented public license, upstream provenance, checksum, and
bounded role before it can be served.

## Governed identity asset

- Family: TeX Gyre Pagella
- Style: Regular
- Version: 2.501 (2018-05-08)
- Upstream: `https://ctan.org/texarchive/fonts/tex-gyre`
- File: `apps/www/public/fonts/tex-gyre-pagella/texgyrepagella-regular.otf`
- SHA-256: `44e64260716d8f2bbe412baa1ee99b7c995190ac4573177c24def0b9200438c7`
- License: GUST Font License, an instance of LPPL 1.3c or later
- Included notices: `GUST-FONT-LICENSE.txt`,
  `README-TeX-Gyre-Pagella.txt`, and `MANIFEST-TeX-Gyre-Pagella.txt`

Do not replace this asset with Iowan Old Style, Palatino, Palatino Linotype,
Baskerville, Georgia, a resume-embedded subset, or another system font binary
without a separately documented redistribution license and an approved design
decision.

## Governed Open Graph interface asset

- Family: Karla
- Styles: Regular 400 and Bold 700, version 2.004
- Upstream: `https://github.com/google/fonts/tree/main/ofl/karla`
- Files: `apps/www/public/fonts/karla/Karla-Regular.ttf` and
  `apps/www/public/fonts/karla/Karla-Bold.ttf`
- Regular SHA-256: `1a4e409e44eb3c3c541cac5e885219bd66d43262214186634f5811449100a090`
- Bold SHA-256: `aea96b84cfc4265c73b56caa9cb205d63bebfb26cb15ccccf0f237530cf8d231`
- License: SIL Open Font License 1.1
- Included notices: `OFL.txt`, `METADATA.pb`, and `upstream_info.md`
