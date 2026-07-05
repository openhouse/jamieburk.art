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

## Environment

Copy `.env.example` for local or staging defaults.

```env
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
SITE_INDEXABLE=false
NEXT_TELEMETRY_DISABLED=1
```

Use these values for staging. Production should use `NEXT_PUBLIC_SITE_URL=https://jamieburk.art` and `SITE_INDEXABLE=true` only after Jamie approves public content.

Set these values before the production build, because Next.js emits static metadata, robots, and sitemap output during `npm run build`.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
npm run check
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output.

Deploy staging first, then production later after review.

Dokku apps:

- `jamieburk-art-staging` -> `staging.jamieburk.art`
- `jamieburk-art` -> `jamieburk.art` / `www.jamieburk.art`

One-time staging setup:

```bash
dokku apps:create jamieburk-art-staging
dokku builder:set jamieburk-art-staging selected dockerfile
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku config:set jamieburk-art-staging \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  PORT=3000 \
  HOSTNAME=0.0.0.0 \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  SITE_INDEXABLE=false
dokku proxy:ports-set jamieburk-art-staging http:80:3000
```

One-time production setup, later:

```bash
dokku apps:create jamieburk-art
dokku builder:set jamieburk-art selected dockerfile
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  PORT=3000 \
  HOSTNAME=0.0.0.0 \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  SITE_INDEXABLE=true
dokku proxy:ports-set jamieburk-art http:80:3000
```

Local deploy remotes:

```bash
git remote add dokku-staging dokku@YOUR_DROPLET_HOST_OR_IP:jamieburk-art-staging
git remote add dokku-production dokku@YOUR_DROPLET_HOST_OR_IP:jamieburk-art
```

Deploy staging first:

```bash
git push dokku-staging HEAD:main
```

Production release happens later, only after Jamie reviews staging:

```bash
git push dokku-production HEAD:main
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, legal-review materials, health or financial details, private correspondence, unapproved photos, private fonts, credentials, private stakeholder lists, or internal client analytics.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
