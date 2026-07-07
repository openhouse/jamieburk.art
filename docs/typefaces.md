# Typefaces

V1 ships safe web fonts only.

- Karla is the body/UI/prose face.
- League Spartan remains the current display face for V1.

Do not commit or serve private/proprietary font binaries. Do not ship Trade
Gothic, Verlag, Gotham Rounded, Maria handwriting font files, or other private
type assets.

When Google fonts are used, load them through `next/font/google` so the app owns
font optimization and self-hosting behavior.
