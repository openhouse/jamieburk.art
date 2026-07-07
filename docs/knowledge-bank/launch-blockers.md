# Launch Blockers

## Blocks Production Deploy

- Private files, private source directories, credentials, private keys, local
  private paths, or unlicensed font binaries are tracked in git
- Production public-safety check fails
- Build, typecheck, lint, or route checks fail
- Required production environment values are missing or contradictory
- Canonical production URL is wrong

## Blocks Production Indexing

- Resume PDF is not current and approved
- Public contact path is not final
- Visible internal review notes appear on public pages
- Claims are stronger than `claims.md`
- Collaborator names, photos, screenshots, quotes, or artifacts are not reviewed
  for public use
- `NEXT_PUBLIC_ROBOTS_POLICY` is not explicitly `index`
- Sitemap or canonical URLs are wrong

## Allowed On Staging

- Noindex review state
- Hidden optional contact/social links until exact URLs are approved
- Public-safe boundary language such as "private material intentionally
  omitted" or "Known / Open / Protected"
- Production blockers documented in this file and surfaced by checks

