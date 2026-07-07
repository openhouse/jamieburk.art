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
npm run check
npm run typecheck
npm run lint
npm run build
npm run public-safety
npm run preflight:staging
```

Production promotion has a stricter gate:

```bash
APP_ENV=production \
SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_ROBOTS_POLICY=index \
NEXT_PUBLIC_CONTACT_EMAIL=approved-public-email@example.com \
npm run preflight:production
```

This command is expected to fail until Jamie approves the public email, final
resume surface, and any production-only approval blockers.

## Environment

Staging is the first deployment target and is non-indexable by default:

```bash
APP_ENV=staging
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
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=index
NEXT_PUBLIC_CONTACT_EMAIL=approved-public-email@example.com
NEXT_PUBLIC_LINKEDIN_URL=
NEXT_PUBLIC_GITHUB_URL=
NEXT_TELEMETRY_DISABLED=1
```

Production indexing only turns on when the production domain and explicit
`NEXT_PUBLIC_ROBOTS_POLICY=index` are both present.

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

The repo contains a governed, public-safe knowledge bank rather than a public
proofs page.

- `docs/knowledge-bank.md` sets the narrative source of truth.
- `docs/proofs-bank.md` describes defensible claims and boundaries.
- `docs/public-claims-inventory.md` tracks public wording and approval status.
- `apps/www/src/data/proofs.ts` is the typed claim source that the website may
  project into homepage, work, resume, lab, and technical-operations surfaces.

The site should be a clear projection of the bank, not a dump of the bank.

## Typeface Policy

Use Karla for body/UI text and Archivo Narrow for display headings. Do not
commit or serve private, proprietary, or unlicensed font files.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- When uncertain in docs, mark: `TODO: Jamie approval required.`
- Do not ship unresolved approval markers in production-visible app content.

## Launch Blockers

- Confirm public email and set `NEXT_PUBLIC_CONTACT_EMAIL`.
- Confirm LinkedIn and GitHub links if they are used.
- Confirm resume page and final resume PDF.
- Confirm screenshots/artifacts.
- Confirm exact proof metrics.
- Confirm collaborator names, photos, and quotes.
- Confirm staging noindex behavior.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm no private/proprietary fonts are committed or served.
- Pass `npm run preflight:production` with production environment values.
