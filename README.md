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
npm run check
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
NEXT_PUBLIC_LINKEDIN_URL=<approved-linkedin-or-blank>
NEXT_PUBLIC_GITHUB_URL=<approved-github-or-blank>
NEXT_TELEMETRY_DISABLED=1
```

Production indexing requires `NEXT_PUBLIC_ROBOTS_POLICY=index`; any missing,
blank, `noindex`, or unknown value keeps responses non-indexable.

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
proof labels, and selected emphasis. Do not commit or serve private,
proprietary, or unlicensed font files. See `docs/typefaces.md`.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- When uncertain, leave a launch-blocker note that requires Jamie approval
  rather than publishing private or unconfirmed material.

## Launch Blockers

- Jamie must approve the exact resume PDF before production.
- Jamie must approve exact public contact presentation before production.
- Confirm optional LinkedIn and GitHub links, or omit them.
- Confirm screenshots/artifacts.
- Confirm exact proof metrics or keep softened language.
- Confirm collaborator names, photos, and quotes.
- Confirm staging noindex behavior.
- Confirm production indexing is intentionally enabled with `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm no private/proprietary fonts are committed or served.
- Confirm public-safety and production preflight checks pass.
