# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager -
Product Operations & Implementation.

The site should make this believable: Jamie creates operating structure for
complex public-facing teams by helping them surface the structure inside
emerging work and turn it into usable systems.

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
npm run check:routes
npm run check:public-safety
npm run check:production
```

`npm run check` runs the app's type, lint, and build checks. `check:routes`
verifies canonical work routes, legacy redirects, sitemap membership, www
redirect configuration, and confirms there is no public `/proofs` route.
`check:public-safety` blocks private-source folders, credentials, private font
files, and the known placeholder resume. `check:production` runs the production
gate with production environment variables and should block while the placeholder
resume remains.

## Proofs Bank

`docs/proofs-bank/claims.md` is the canonical public professional claims file.
Add or revise claims there before projecting them into website copy or
structured site data. Public pages may use only `approved` or `public-safe`
claims; stronger metrics and archival claims remain approval-gated.

The proofs bank is documentation, not a public website section. There should be
no `/proofs` route in V1.

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
NEXT_PUBLIC_LINKEDIN_URL=<approved-linkedin-url>
NEXT_PUBLIC_GITHUB_URL=<approved-github-url>
NEXT_TELEMETRY_DISABLED=1
```

Production indexing is opt-in only: the app becomes indexable only when the
environment is production and `NEXT_PUBLIC_ROBOTS_POLICY=index`. Production also
requires `NEXT_PUBLIC_CONTACT_EMAIL`; optional LinkedIn and GitHub rows stay
hidden unless their environment variables are present.

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

Use Karla for body/UI text and Archivo Narrow for display headings, proof
labels, and compact metadata. Do not commit or serve private, proprietary, or
unlicensed font files.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- Add or revise public professional claims in
  `docs/proofs-bank/claims.md` before projecting them into website copy or
  structured site data.
- Website copy may only project claims marked `approved` or `public-safe`.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Blockers

- Replace placeholder resume PDF before production.
- Confirm public email.
- Confirm LinkedIn and GitHub links.
- Confirm screenshots/artifacts.
- Confirm exact proof metrics.
- Confirm collaborator names, photos, and quotes.
- Confirm staging noindex behavior.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm no private/proprietary fonts are committed or served.
