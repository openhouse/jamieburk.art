# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, Docker, Dokku.

## Local Development

```bash
nvm install
nvm use
npm ci
npm run dev
```

Copy `apps/www/.env.example` to `apps/www/.env.local` for local staging-like defaults.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
npm run check -w @jamie-burkart/www
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output.

Staging target: <https://staging.jamieburk.art>

Production target, later: <https://jamieburk.art>

Environment is staging-first by default:

```bash
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_DEPLOY_ENV=staging
NEXT_PUBLIC_ALLOW_INDEXING=false
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

Set public environment values before the image build so static metadata, sitemap, and robots output match the target. See `docs/deployment.md` for Dokku staging setup, production setup, health checks, and local Docker verification.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
