# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager -
Product Operations & Implementation.

The site should make this believable: Jamie helps teams turn ambiguous, loosely
defined work into usable systems.

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
npm run prelaunch
```

## Environment

Staging is the first deployment target and is non-indexable by default:

```bash
APP_ENV=staging
SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=noindex
NEXT_TELEMETRY_DISABLED=1
```

Production should only be enabled after staging review:

```bash
APP_ENV=production
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=index
NEXT_TELEMETRY_DISABLED=1
```

Production indexing is explicit opt-in. Any missing, blank, or non-`index`
`NEXT_PUBLIC_ROBOTS_POLICY` value must produce noindex behavior.

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

Use Karla for body/UI/prose and Archivo Narrow for display headings, section
eyebrows, proof labels, and compact metadata. Do not commit or serve private,
proprietary, or unlicensed font files. See `docs/typefaces.md`.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- Use `docs/claim-register.md` as the canonical public wording guide for proof
  metrics, credit language, and claims that should stay approximate.
- When uncertain, mark: `TODO: Jamie approval required.`

Keep private source material outside the repo. These folders are ignored in Git
and Docker build context if they ever appear locally:

```txt
private/
archive-private/
raw/
transcripts-private/
client-private/
legal-review/
```

## Launch Blockers

- Run `npm run public-safety` and resolve blockers before trusted review.
- Confirm staging noindex behavior before sharing staging.
- Confirm screenshots/artifacts.
- Confirm exact proof metrics against `docs/claim-register.md`.
- Confirm collaborator names, photos, and quotes.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm production indexing is explicitly enabled with `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- Confirm no private/proprietary fonts are committed or served.
