# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager -
Product Operations & Implementation.

The site should make this believable: Jamie creates operating structure for
complex public-facing teams.

Plain-language translation: Jamie turns ambiguous, loosely defined work into
usable systems.

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
npm run public-safety
npm run knowledge-bank
npm run build
npm run check
```

The release-candidate app build uses `next build --webpack` for stability.

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

Production indexing is strict opt-in. Missing, blank, staging, local, or unknown
values default to noindex. `APP_ENV=production` alone is not enough; production
must also use `SITE_URL=https://jamieburk.art` and
`NEXT_PUBLIC_ROBOTS_POLICY=index`.

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

## Knowledge Bank

Use `docs/knowledge-bank/claims.json` as the machine-checkable source for public
professional accomplishment claims. `docs/knowledge-bank/claims.md` is the
editorial view, `approval-register.md` tracks launch approvals, and
`source-classes.md` defines what kind of support can sit behind a claim.

The website is a projection from the knowledge bank, not a dump of private
evidence. Do not turn private source packages, raw transcripts, private
coalition notes, private analytics, or raw community records into public proof.

## Chad Lens

Use `docs/chad-lens.md` when editing public copy. The site should minimize the
reader's burden, show Jamie as the actor, explain what changed, and avoid tiny
inflation.

## Typeface Policy

Use Karla for body/UI/prose and Archivo Narrow for display headings and compact
proof labels. Do not commit or serve private, proprietary, or unlicensed font
files. See `docs/typefaces.md`.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Blockers

- Confirm the resume PDF remains the approved public-download file.
- Confirm whether the resume PDF should remain noindex in production.
- Confirm public email for website display.
- Confirm LinkedIn and GitHub links for website display.
- Confirm screenshots/artifacts.
- Confirm exact proof metrics.
- Confirm collaborator names, photos, and quotes.
- Review `docs/knowledge-bank/claims.json` against public site copy.
- Confirm staging noindex behavior.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm no private/proprietary fonts are committed or served.
- Run `npm run production-safety` before indexing.
