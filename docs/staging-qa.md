# Staging QA

Run before production promotion:

- `nvm use`
- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run public-safety`
- `npm run check`
- `npm run check:production` with production-like environment values
- Docker build/run if practical
- `curl /api/health`
- `curl /robots.txt`
- `curl /sitemap.xml`
- canonical URLs
- public routes
- mobile layout
- keyboard navigation
- focus states
- content-safety review

Expected staging behavior:

- `/api/health` reports staging values and `robotsIndexable: false`.
- `robots.txt` disallows `/`.
- HTML responses include `X-Robots-Tag: noindex, nofollow`.
- `sitemap.xml` returns valid XML with `https://staging.jamieburk.art` URLs.
- Public pages contain no visible approval TODOs.
- Public contact values render only when configured.

Public routes to verify:

- `/`
- `/work`
- `/work/technical-operations`
- `/work/harry-j-epstein`
- `/work/fair-rent-nyc`
- `/work/callnyc`
- `/work/wowlist`
- `/work/196-sunday-dinner`
- `/work/kc-town-hall`
- `/lab/source-backed-team-memory`
- `/resume`
- `/about`
- `/contact`
- `/colophon`
- `/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`
- `/robots.txt`
- `/sitemap.xml`
- `/api/health`
