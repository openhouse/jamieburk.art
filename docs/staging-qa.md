# Staging QA

## Commands

- `nvm use`
- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run public-safety`
- `npm run check`
- `npm run check:production`
- `npm run check:routes -- https://staging.jamieburk.art` when staging is deployed.

## Route Checks

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
- `/api/health`
- `/robots.txt`
- `/sitemap.xml`
- `/opengraph-image`

## Temporary Redirect Checks

- `/work/fairrentnyc -> /work/fair-rent-nyc`
- `/work/fairrentnyc-commercial-rent-stabilization -> /work/fair-rent-nyc`
- `/work/commercial-rent-stabilization -> /work/fair-rent-nyc`
- `/work/196-artists-residency -> /work/196-sunday-dinner`
- `/work/source-backed-team-memory -> /lab/source-backed-team-memory`

## Staging Behavior

- `/api/health` reports staging or a non-production deploy state.
- `robots.txt` disallows `/`.
- Responses include noindex/nofollow where intended.
- `sitemap.xml` returns valid XML with staging URLs.
- No route returns 500.
- No public page displays approval TODOs.
- Contact page omits unset optional channels rather than showing blank links.

## Manual QA

- 320px mobile width.
- Keyboard navigation.
- Visible focus states.
- Skip link.
- One H1 per page.
- Logical heading order.
- Known / Open / Protected blocks readable on mobile.
- Resume PDF downloads on mobile.
- External links are labeled clearly.
- Proof strip text does not overflow.
