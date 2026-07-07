# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager -
Product Operations & Implementation.

The site should make this believable: Jamie creates operating structure for
complex public-facing teams.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, npm
workspaces, Docker, and Dokku. The canonical app is `apps/www`.

npm workspaces are accepted for V1. Earlier pnpm preferences are superseded for
this scaffold to avoid package-manager churn before launch.

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
npm run check:public-safety
npm run check:routes
npm run check:production
```

`npm run check` runs the app type/lint/build checks and the non-production
public-safety scan. `npm run check:production` requires production env values,
then runs safety, route, and build checks.

## Environment

Staging is the first deployment target and is non-indexable by default:

```bash
APP_ENV=staging
SITE_ENV=staging
NEXT_PUBLIC_DEPLOY_ENV=staging
SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=noindex
NEXT_PUBLIC_CONTACT_EMAIL=<approved-public-email>
NEXT_PUBLIC_LINKEDIN_URL=<optional-approved-linkedin-url>
NEXT_PUBLIC_GITHUB_URL=<optional-approved-github-url>
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
NEXT_PUBLIC_LINKEDIN_URL=<optional-approved-linkedin-url>
NEXT_PUBLIC_GITHUB_URL=<optional-approved-github-url>
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

Use Karla for body/UI text and Archivo Narrow for headings, labels, proof
surfaces, and metadata. Do not commit or serve private, proprietary, or
unlicensed font files, including Trade Gothic, Verlag, Gotham Rounded, FondFont
RISQUE, or Maria unless licensing and permission are explicitly approved.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- When uncertain, mark: `TODO: Jamie approval required.`
- Keep private source folders such as `private/`, `raw/`,
  `archive-private/`, `transcripts-private/`, `client-private/`, and
  `legal-review/` out of the repo.
- Use active, plain-language copy: put Jamie back into the sentence, prefer
  verbs like designs, coordinates, synthesizes, translates, documents,
  preserves, supports, and ships, and answer what the work enabled for a team,
  reader, collaborator, or community.
- Define insider language near first use. Do not make hiring readers decode
  terms like under-structured, data, tracking, maintainers, minimum viable
  product (MVP), user acceptance testing (UAT), quality assurance (QA), large
  language model (LLM), or source-backed memory.

## Launch Blockers

- Confirm the approved resume PDF remains current before production.
- Confirm public email and set `NEXT_PUBLIC_CONTACT_EMAIL`.
- Confirm optional LinkedIn and GitHub links before setting their env vars.
- Confirm screenshots/artifacts.
- Confirm exact proof metrics.
- Confirm collaborator names, photos, and quotes.
- Confirm staging noindex behavior.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm no private/proprietary fonts are committed or served.
- Confirm `npm run check:production` passes with production env values.
