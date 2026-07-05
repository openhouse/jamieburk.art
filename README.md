# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, Docker, Dokku.

The canonical app path for this scaffold is `apps/www`. Earlier planning notes may mention `apps/web`, but this pass keeps `apps/www` to avoid churn while the proof site stabilizes.

This project intentionally uses Node 26 for the 2026/2027 build target. Revisit the Node pin before long-term maintenance if Active LTS stability becomes more important than this forward-looking constraint.

## Local Development

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
npm run build
```

Run the combined local check with:

```bash
npm run check
```

## Environment

Copy `.env.example` for local development. Staging and production should set the same keys with environment-specific values:

```bash
NEXT_PUBLIC_DEPLOY_ENV=local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ALLOW_INDEXING=false
NEXT_TELEMETRY_DISABLED=1
```

Staging deploys first to `https://staging.jamieburk.art` with indexing disabled:

```bash
NEXT_PUBLIC_DEPLOY_ENV=staging
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_ALLOW_INDEXING=false
NEXT_TELEMETRY_DISABLED=1
```

Production deploys to `https://jamieburk.art` only after review, with indexing explicitly enabled:

```bash
NEXT_PUBLIC_DEPLOY_ENV=production
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ALLOW_INDEXING=true
NEXT_TELEMETRY_DISABLED=1
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output.

Staging target domain: <https://staging.jamieburk.art>

Production target domain: <https://jamieburk.art>

Staging setup:

```bash
dokku apps:create jamieburk-art-staging
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku config:set jamieburk-art-staging \
  NODE_ENV=production \
  NEXT_PUBLIC_DEPLOY_ENV=staging \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_ALLOW_INDEXING=false \
  NEXT_TELEMETRY_DISABLED=1
dokku letsencrypt:enable jamieburk-art-staging
```

Production setup after review:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art \
  NODE_ENV=production \
  NEXT_PUBLIC_DEPLOY_ENV=production \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_ALLOW_INDEXING=true \
  NEXT_TELEMETRY_DISABLED=1
dokku letsencrypt:enable jamieburk-art
```

Suggested local remotes:

```bash
git remote add dokku-staging dokku@<droplet-host-or-ip>:jamieburk-art-staging
git remote add dokku-production dokku@<droplet-host-or-ip>:jamieburk-art
```

Deploy staging first:

```bash
git push dokku-staging scaffold/A+N:main
```

Promote production only after review:

```bash
git push dokku-production main
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

Local Docker smoke test:

```bash
docker build -t jamieburk-art:local .
docker run --rm -p 3000:3000 -e PORT=3000 jamieburk-art:local
```

## Typography

Karla is the everyday reading and UI typeface. League Gothic is the safe open display accent for short hero, label, and proof moments. Proprietary and personal fonts are reference-only unless explicitly licensed and permissioned.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`
- Production must not contain approval TODOs, placeholder resume language, private visibility flags, draft status flags, or obvious private-data markers. The public-safety check warns locally and blocks production.

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
