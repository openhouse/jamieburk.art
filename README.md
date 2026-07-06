# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager -
Product Operations & Implementation.

The site should make this believable: Jamie creates operating structure for
complex public-facing teams.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, npm
workspaces, Docker, and Dokku. The canonical app is `apps/www`.

## Local Development

```bash
nvm install
nvm use
npm ci
npm run dev
```

Use `.env.example` for local environment defaults.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
npm run check
npm run check:routes -- http://localhost:3000
```

Production preflight is intentionally stricter and should be run with production
environment variables after the final resume and contact details are approved:

```bash
npm run preflight:production
```

## Environment

Staging is the first deployment target and is non-indexable by default:

```bash
APP_ENV=staging
SITE_ENV=staging
NEXT_PUBLIC_DEPLOY_ENV=staging
SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=noindex
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_LINKEDIN_URL=
NEXT_PUBLIC_GITHUB_URL=
NEXT_TELEMETRY_DISABLED=1
```

Production should only be enabled after staging review:

```bash
APP_ENV=production
SITE_ENV=production
NEXT_PUBLIC_DEPLOY_ENV=production
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=index
NEXT_PUBLIC_CONTACT_EMAIL=<approved-public-email>
NEXT_PUBLIC_LINKEDIN_URL=
NEXT_PUBLIC_GITHUB_URL=
NEXT_TELEMETRY_DISABLED=1
```

`NEXT_PUBLIC_CONTACT_EMAIL` is required for production. LinkedIn and GitHub are
optional; when they are unset in production, the contact page omits those rows.

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone
output.

Staging first:

```txt
jamieburk-art-staging -> staging.jamieburk.art
```

Production later:

```txt
jamieburk-art -> jamieburk.art
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to the
container. See `docs/deployment.md` for the staging and production command
drafts, Docker build args, and verification checklist.

## Typeface Policy

Use Karla for body/UI text and League Spartan for display headings. Do not commit
or serve private, proprietary, or unlicensed font files.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Blockers

- Replace placeholder resume PDF.
- Confirm public email.
- Confirm LinkedIn and GitHub or omit them.
- Confirm proof metrics.
- Confirm public-safe screenshots/artifacts.
- Confirm collaborator names, photos, and quotes.
- Confirm sitemap and noindex behavior.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm no private/proprietary fonts are committed or served.

## Production Safety Gates

The production preflight script checks the obvious launch blockers before a
production deploy:

- production deployment environment
- canonical site URL set to `https://jamieburk.art`
- `NEXT_PUBLIC_ROBOTS_POLICY=index`
- approved public email configured
- no unguarded approval TODOs in production-facing app files
- placeholder resume PDF removed
- no committed private/proprietary font files
- no committed `.env` files except `.env.example`

The route check script accepts a base URL:

```bash
npm run check:routes -- https://staging.jamieburk.art
```

Expected staging behavior:

- `/robots.txt` disallows `/`
- `/api/health` reports staging and `robotsIndexable: false`
- HTML responses include `X-Robots-Tag: noindex, nofollow`
- `/sitemap.xml` returns XML using `https://staging.jamieburk.art` URLs

Expected production behavior after approval:

- `/robots.txt` allows `/`
- `/sitemap.xml` returns production canonical URLs
- HTML responses do not include the noindex header

## Accessibility QA Notes

- Skip link exists and becomes visible on focus.
- Global `:focus-visible` styles are present for keyboard navigation.
- Reduced-motion preferences are respected in global CSS.
- Route QA now covers the primary public pages and metadata endpoints.
- Before production approval, run a browser pass at 320px, 375px, 768px, and
  desktop widths for heading order, one H1 per page, link clarity, contrast, and
  keyboard-only navigation.
