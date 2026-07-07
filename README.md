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
npm run public-safety
npm run check
```

`npm run check` runs typecheck, lint, build, and the public-safety scanner.
`npm run preflight:production` checks production environment, indexing,
redirect, sitemap, resume, and public-safety guardrails without external network
calls.

## Claim Governance

The website is a projection of the public-safe knowledge bank:

- `docs/proofs-bank.md` is the source bank for professional claims.
- `docs/claim-register.md` tracks claims currently projected onto the site.
- `docs/chad-lens.md` defines the hiring-facing copy standard.
- `docs/content-safety.md` defines what stays out of the repo and public pages.
- `docs/release-checklist.md` defines staging, production, and indexing gates.

Use Chad's lens before changing public copy: make Jamie visible as the actor,
answer "toward what end?", define unfamiliar entities, preserve collective
credit, and avoid overclaiming.

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

Production should only be enabled after staging review:

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

Use Karla for body/UI text and League Spartan for display headings. Do not commit
or serve private, proprietary, or unlicensed font files.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- When uncertain, keep the material off public pages and track the question in
  `docs/claim-register.md` or `docs/release-checklist.md`.

## Release Gates

See `docs/release-checklist.md`.

Production remains gated on approved resume exposure, approved contact paths,
public-safe claims, no visible internal approval notes, no private materials,
production preflight, and explicit indexing approval.
