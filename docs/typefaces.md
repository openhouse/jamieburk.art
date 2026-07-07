# Typeface Policy

V1 ships with safe web fonts only.

## Shipped

- Karla: body/UI/prose.
- Archivo Narrow: display/headings/eyebrows/proof labels.

## Not shipped unless licensed

- Trade Gothic Bold.
- Verlag Black.
- Gotham Rounded.

## Not shipped unless explicitly permissioned

- Maria handwriting font.

## Rules

- Do not commit private or proprietary font files.
- Do not serve private or proprietary font files.
- Do not reference proprietary fonts in shipped CSS stacks unless Jamie explicitly approves them as non-loaded local fallbacks.
- Use `next/font/google` so web fonts are self-hosted by Next.
