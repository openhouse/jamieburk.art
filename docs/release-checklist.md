# Release Checklist

## Architecture

- `apps/www` remains canonical.
- npm workspaces remain the package manager.
- Node 26 is used for verification.
- No CMS, database, auth, analytics, search, AI chatbot, private archive browser,
  or major framework change is added for V1.

## Knowledge Bank

- Public-safe knowledge bank exists in `docs/knowledge-bank/`.
- Public claims inventory exists in `claims.md` and `claims.json`.
- Professional Legibility Lens exists.
- Source policy and publication rules exist.
- App proof data is aligned with approved or softened claims.

## Public Safety

- Private sources stay outside the repo.
- Exact metrics remain softened unless approved.
- Private-path ignores are present in `.gitignore` and `.dockerignore`.
- One canonical public-safety scanner exists.
- Generic "transcript" is not blocked; private transcript exposure is blocked.
- Placeholder resume blocks production.
- Resume PDF is noindexed unless Jamie approves indexing.

## Routes

- Canonical V1 routes are in the sitemap.
- Legacy redirect sources are not in the sitemap.
- Redirects remain temporary until production behavior is verified.
- `www.jamieburk.art` redirects to `jamieburk.art`.

## Launch Gates

- `npm run knowledge-bank` passes.
- `npm run public-safety` passes.
- `npm run preflight:staging` passes.
- `npm run preflight:production` passes.
- Docker build/run passes.
- Staging smoke tests pass after deploy.
- Browser/mobile/accessibility review is complete before accessibility claims are
  made.
