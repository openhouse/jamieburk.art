# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager -
Product Operations & Implementation.

The site should make this believable: Jamie builds the operational backbone
teams need to stay focused, unblocked, documented, and shipping.

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
npm run check:knowledge-bank
npm run check
```

Production release validation is explicit:

```bash
APP_ENV=production SITE_ENV=production NEXT_PUBLIC_DEPLOY_ENV=production SITE_URL=https://jamieburk.art NEXT_PUBLIC_SITE_URL=https://jamieburk.art NEXT_PUBLIC_ROBOTS_POLICY=index NEXT_PUBLIC_CONTACT_EMAIL=<approved-email> npm run check:production
```

Route checks require a running deployment or local server:

```bash
npm run check:routes -- https://staging.jamieburk.art
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
NEXT_PUBLIC_CONTACT_EMAIL=<approved-email>
NEXT_PUBLIC_LINKEDIN_URL=<approved-linkedin-or-blank>
NEXT_PUBLIC_GITHUB_URL=<approved-github-or-blank>
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

Use Karla for body/UI text and League Spartan for the current display face. Do
not commit or serve private, proprietary, or unlicensed font files. See
`docs/typefaces.md`.

## Knowledge Bank

`docs/knowledge-bank/` is the repo-internal public-safe source of truth for
professional accomplishment claims. The website is a composed projection of that
knowledge bank, optimized for hiring-reader clarity and public safety. It is not
a `/proofs` site section, CMS, database, archive browser, or private document
browser.

Public pages should use the recommended public wording by default, keep exact
metrics on approved surfaces, and preserve Known / Open / Protected boundaries.
The goal is not to say more. The goal is to make every public claim easier to
trust.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Blockers

- Confirm final resume PDF approval before production.
- Confirm public email approval.
- Confirm LinkedIn and GitHub links.
- Confirm screenshots/artifacts.
- Confirm exact proof metrics or soften them according to the knowledge bank.
- Confirm collaborator names, photos, and quotes.
- Confirm the knowledge-bank projection map matches visible site surfaces.
- Confirm the anti-claims file has been checked against homepage, work, resume,
  about, lab, metadata, and social text.
- Confirm all interactive controls have visible focus states and meaningful
  labels.
- Confirm page structure, heading order, landmark labels, and link text remain
  clear across desktop and mobile.
- Confirm staging noindex behavior.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm no private/proprietary fonts are committed or served.
- Confirm `npm run check:production` passes with production env vars.
- Confirm the exact staging-reviewed SHA is approved before production.
