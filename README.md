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

Run the production preflight only with production environment values, before
enabling the public production app:

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
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_LINKEDIN_URL=
NEXT_PUBLIC_GITHUB_URL=
NEXT_TELEMETRY_DISABLED=1
```

Production requires an approved `NEXT_PUBLIC_CONTACT_EMAIL`. LinkedIn and
GitHub are optional; if they are not configured in production, the contact page
omits those rows rather than showing approval TODOs.

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

## Staging Smoke Checks

```bash
curl -i https://staging.jamieburk.art/robots.txt
curl -i https://staging.jamieburk.art/sitemap.xml
curl -I https://staging.jamieburk.art/
curl -s https://staging.jamieburk.art/api/health
npm run check:routes -- https://staging.jamieburk.art
```

Expected staging behavior:

- `robots.txt` disallows `/`.
- `/api/health` reports `appEnv` as staging and `robotsIndexable` as `false`.
- HTML responses include `X-Robots-Tag: noindex, nofollow`.
- `sitemap.xml` returns valid XML.
- Sitemap URLs use `https://staging.jamieburk.art`.

Production expected behavior, after Jamie approves launch:

- `robots.txt` allows `/`.
- `sitemap.xml` is present.
- Canonical and sitemap URLs use `https://jamieburk.art`.
- HTML responses do not include the noindex `X-Robots-Tag`.

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

- Replace placeholder resume PDF before production.
- Confirm public email.
- Confirm exact proof metrics.
- Confirm public-safe screenshots/artifacts.
- Confirm collaborator names, photos, and quotes.
- Confirm LinkedIn and GitHub or omit them.
- Confirm sitemap and noindex behavior.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm no private/proprietary fonts are committed or served.
