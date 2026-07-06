# Typefaces

V1 ships with safe web fonts only.

## Shipped Pairing

- Karla: body, UI, and prose text
- League Spartan: display headings

Both are loaded through `next/font/google`.

## Policy

- Do not commit private or proprietary font files.
- Do not serve private or proprietary font files.
- Do not add `.ttf`, `.otf`, `.woff`, or `.woff2` files without explicit license review.
- Use `next/font/google` for V1 font loading.

Trade Gothic, Verlag, Gotham Rounded, RISQUE, and Maria are not shipped unless licensing and permission are explicit.

Archivo Narrow remains a strong V1.1 candidate for a more civic compressed display register, but it is intentionally outside the production-blocker patch.
