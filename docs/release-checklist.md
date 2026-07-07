# Release Checklist

## Before Staging

- Run `npm ci`.
- Run `npm run check`.
- Run `npm run check:production` in a production-like shell to confirm blockers
  are explicit.
- Confirm no private/proprietary font files are committed.
- Confirm no raw private source materials are committed.
- Confirm `/lab/source-backed-team-memory` remains reachable but is not in the
  V1 production sitemap.

## Staging Review

- Confirm `staging.jamieburk.art` is noindex.
- Confirm responses include `X-Robots-Tag: noindex, nofollow`.
- Confirm metadata and sitemap use staging URLs.
- Confirm legacy work redirects.
- Review mobile layout, keyboard focus, and public copy.

## Before Production Indexing

- Jamie approves the exact resume PDF.
- Jamie approves public contact path.
- Jamie approves LinkedIn and GitHub links or they remain omitted.
- Jamie approves proof metrics and wording.
- Jamie approves collaborator names, screenshots, quotes, and artifacts or they
  remain omitted.
- Jamie gives written production go.

## Production Expected Behavior

- `SITE_URL` and `NEXT_PUBLIC_SITE_URL` are exactly `https://jamieburk.art`.
- `NEXT_PUBLIC_ROBOTS_POLICY` is exactly `index`.
- `robots.txt` allows indexing and includes the sitemap.
- Sitemap uses apex production URLs only.
- Resume PDF remains noindex for V1.
- `/api/health` exposes only minimal public state.
