# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager -
Product Operations & Implementation.

The site should make this believable: Jamie turns ambiguous work into usable
operating systems for complex public-facing teams.

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
npm run check:public-safety
npm run check:production
```

The app uses `next build --webpack` for V1 because the local darwin/arm64
verification path can fall back to WASM SWC bindings, and Turbopack requires
native bindings on this platform.

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
NEXT_PUBLIC_CONTACT_LABEL=
NEXT_PUBLIC_LINKEDIN_URL=
NEXT_PUBLIC_LINKEDIN_LABEL=
NEXT_PUBLIC_GITHUB_URL=
NEXT_PUBLIC_GITHUB_LABEL=
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
NEXT_PUBLIC_CONTACT_LABEL=<approved-public-email-label>
NEXT_PUBLIC_LINKEDIN_URL=<approved-linkedin-url-or-blank>
NEXT_PUBLIC_LINKEDIN_LABEL=<approved-linkedin-label-or-blank>
NEXT_PUBLIC_GITHUB_URL=<approved-github-url-or-blank>
NEXT_PUBLIC_GITHUB_LABEL=<approved-github-label-or-blank>
NEXT_TELEMETRY_DISABLED=1
```

Production indexing is opt-in: `NEXT_PUBLIC_ROBOTS_POLICY` must be exactly
`index`, the environment URLs must match `https://jamieburk.art`, and Jamie must
give written go/no-go approval.

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

Use Karla for body/UI/prose and Archivo Narrow for display headings, proof
labels, eyebrows, and compact metadata through `next/font/google`. Do not commit
or serve private, proprietary, or unlicensed font files. See
`docs/typefaces.md`.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- When uncertain, use review notes and launch blockers rather than public-facing
  TODOs.

## Launch Blockers

- Confirm approved resume PDF and last-updated date.
- Confirm approved public email. Confirm LinkedIn and GitHub links or omit unapproved rows.
- Confirm screenshots/artifacts.
- Confirm exact proof metrics.
- Confirm collaborator names, photos, and quotes.
- Confirm staging noindex behavior.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm no private/proprietary fonts are committed or served.
- Confirm `npm run check:production` passes with approved production-like env.

Node 26 is the requested V1 target. Recheck its LTS status before long-term
production hardening.
