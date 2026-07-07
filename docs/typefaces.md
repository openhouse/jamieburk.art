# Typefaces

V1 ships safe web fonts only.

- Karla is the body/UI/prose face.
- League Spartan is the current display face.

Do not commit or serve private/proprietary font binaries. Do not ship Trade
Gothic, Verlag, Gotham Rounded, handwriting font files, or other private type
assets.

When Google fonts are used, load them through `next/font/google` so the app owns
font optimization and self-hosting behavior.
