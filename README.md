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
npm run public-safety
npm run preflight:staging
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
NEXT_PUBLIC_CONTACT_EMAIL=jamie.burkart@gmail.com
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/jamie-burkart
NEXT_PUBLIC_GITHUB_URL=https://github.com/openhouse
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
NEXT_PUBLIC_CONTACT_EMAIL=jamie.burkart@gmail.com
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/jamie-burkart
NEXT_PUBLIC_GITHUB_URL=https://github.com/openhouse
NEXT_TELEMETRY_DISABLED=1
```

Production indexing is opt-in: production becomes indexable only when the app is
running as production and `NEXT_PUBLIC_ROBOTS_POLICY=index`.

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

Use Karla for body/UI/prose/cards and Oswald for labels, metadata, eyebrows, and
navigation. League Spartan is reserved for rare generated Open Graph or display
material only. Do not commit or serve private, proprietary, or unlicensed font
files.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Blockers

- Approved resume PDF is missing or contains placeholder text.
- Public email is missing from the contact source of truth.
- Production indexing is enabled without Jamie approval.
- Public-safety scan fails.
- Screenshots, artifacts, exact proof metrics, collaborator names, photos, or
  quotes are unapproved.
- Confirm staging noindex behavior.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm no private/proprietary fonts are committed or served.
