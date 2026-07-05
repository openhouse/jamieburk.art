# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

The active app lives in `apps/www`.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, Docker, and Dokku.

## Local setup

```bash
nvm install
nvm use
npm ci
npm run dev
```

## Checks

```bash
npm run typecheck
npm run lint
npm run public-safety
npm run build
```

For the full local gate:

```bash
npm run preflight
```

## Environment URLs

The public site URL is driven by environment variables:

```bash
NEXT_PUBLIC_DEPLOY_ENV=staging
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
```

Production should use:

```bash
NEXT_PUBLIC_DEPLOY_ENV=production
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
```

Staging sets noindex metadata and disallows all crawling in `robots.txt`.

## Staging deploy

This app deploys to Dokku using the root Dockerfile and Next.js standalone output.

```bash
git remote add dokku-staging dokku@[DROPLET_IP_OR_HOSTNAME]:jamieburk-art-staging
git push dokku-staging HEAD:main
```

See `docs/deployment.md` for Dokku app setup, domains, config, DNS, TLS, Docker testing, and rollback notes.

## Production deploy

Deploy production only after staging review:

```bash
git remote add dokku-production dokku@[DROPLET_IP_OR_HOSTNAME]:jamieburk-art
git push dokku-production HEAD:main
```

## Content workflow

Work metadata lives in `apps/www/src/data/work.ts`. MDX case-study pages live in `apps/www/src/content/work` and should match the `slug` used by the metadata item.

Every Work card should preserve the method signal:

- `What was unclear`
- `What became usable`

To update the resume PDF, replace:

```text
apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
```

See `docs/content-workflow.md` for project-addition steps and visibility rules.

## Public-safety rules

- Do not publish private notes, raw transcripts, private coalition notes, health or financial details, legal-review materials, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: `co-built`, `stewarded`, `supported`, `contributed to`, and `helped structure`.
- When uncertain, mark: `TODO: Jamie approval required.`

Run:

```bash
npm run public-safety
```

See `docs/public-safety.md` for the full public-safety posture.

## Typeface rules

Karla is the body, interface, navigation, metadata, card, and general prose face.

Oswald is the display/public-notice accent face for short labels and proof moments. Do not use it for paragraphs.

Do not commit private or unlicensed font files.

See `docs/design-system.md` for the current color, type, spacing, and component guidance.

## Launch inputs still needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current approved resume PDF.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
