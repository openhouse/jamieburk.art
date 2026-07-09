# Release Checklist

This file is the release-oriented entrypoint for production review.

The detailed launch checklist lives in `docs/launch-checklist.md`.

Before production:

- `npm ci`
- `npm run check`
- `npm run public-safety`
- `npm run check:knowledge-bank`
- `npm run check:routes`
- `npm run preflight:production`
- verify staging health, robots, sitemap, redirects, and resume PDF headers
- verify mobile, keyboard, focus, headings, and PDF link labels
- confirm Jamie go/no-go before production indexing

Production indexing requires explicit opt-in environment variables. Staging
must remain noindex.
