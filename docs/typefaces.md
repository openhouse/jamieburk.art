# Typefaces

V1 ships safe web fonts only.

- Karla is the body/UI/prose face.
- League Spartan remains the current display face unless Archivo Narrow is
  separately approved after visual QA.
- Archivo Narrow may be tested for display headings, eyebrows, and proof labels.

Do not commit or serve private/proprietary font binaries. Do not ship Trade
Gothic, Verlag, Gotham Rounded, Maria handwriting font files, or other private
type assets unless licensing and public use are explicitly approved.

When Google fonts are used, load them through `next/font/google` so the app owns
font optimization and self-hosting behavior.
