# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager -
Product Operations & Implementation.

The site should make this believable: Jamie turns under-structured work into
usable systems for complex public-facing teams.

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
npm run public-safety
npm run check
npm run check:production
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
NEXT_TELEMETRY_DISABLED=1
```

Production should only be enabled after staging review and Jamie approval.
Production indexing is opt-in only when `NEXT_PUBLIC_ROBOTS_POLICY=index`:

```bash
APP_ENV=production
SITE_ENV=production
NEXT_PUBLIC_DEPLOY_ENV=production
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=index
NEXT_TELEMETRY_DISABLED=1
```

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

Use Karla for body/UI/prose and Archivo Narrow for display headings, eyebrows,
proof labels, and compact public-facing emphasis. Do not commit or serve
private, proprietary, or unlicensed font files. See `docs/typefaces.md`.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- Keep uncertainty in non-public review notes, launch blockers, and pull request
  checklists rather than visible production pages.

## Public-Safety Gate

`npm run public-safety` scans the public app source, public assets, PDFs, work
metadata, env policy, route/sitemap/robots configuration, and Docker context
risk. It is intentionally default-deny for production. `npm run check` includes
the public-safety gate; `npm run check:production` runs it with production
indexing explicitly enabled.

## Launch Blockers

- Confirm exact resume PDF before production.
- Keep phone off the website; it may appear only inside an explicitly approved
  public resume PDF.
- Confirm public email, LinkedIn, and GitHub links before publishing them as
  site UI.
- Confirm screenshots/artifacts.
- Confirm exact proof metrics.
- Confirm collaborator names, photos, and quotes.
- Confirm staging noindex behavior.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm no private/proprietary fonts are committed or served.
