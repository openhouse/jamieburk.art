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

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Environment

The site URL is environment-driven so staging can be reviewed before production.

```bash
NEXT_PUBLIC_DEPLOY_ENV=staging
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_TELEMETRY_DISABLED=1
```

Production should set:

```bash
NEXT_PUBLIC_DEPLOY_ENV=production
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_TELEMETRY_DISABLED=1
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output.
Deploy to staging first, review it, and only then promote the same commit to production.

The app serves on port `3000`; Dokku/nginx should proxy the public domains to that container.

## Dokku staging setup

On the droplet:

```bash
dokku apps:create jamieburk-art-staging
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku config:set jamieburk-art-staging \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_DEPLOY_ENV=staging \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art

dokku letsencrypt:set jamieburk-art-staging email <approved-email>
dokku letsencrypt:enable jamieburk-art-staging
```

## Deploy to staging

```bash
git remote add dokku-staging dokku@<droplet-host-or-ip>:jamieburk-art-staging
git push dokku-staging HEAD:main
```

Preview: <https://staging.jamieburk.art>

Staging is intentionally noindex and shows a staging banner.

## Dokku production setup

On the droplet:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_DEPLOY_ENV=production \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art

dokku letsencrypt:set jamieburk-art email <approved-email>
dokku letsencrypt:enable jamieburk-art
```

## Deploy to production

```bash
git remote add dokku-production dokku@<droplet-host-or-ip>:jamieburk-art
git push dokku-production HEAD:main
```

Production: <https://jamieburk.art>

Do not push to production until staging has been reviewed.

## Typefaces

The public site uses Karla for body/UI/case-study text and League Spartan for display emphasis. Both are loaded as safe web fonts through `next/font/google`.

Do not commit or load Trade Gothic, Verlag, Gotham Rounded, `maria-extra-bold.ttf`, or any other private or unlicensed font file. Private or proprietary typefaces may be mentioned only as design-history references.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch blockers

- Replace placeholder resume PDF before production.
- Confirm public email.
- Confirm LinkedIn and GitHub links.
- Confirm screenshots/artifacts.
- Confirm all proof metrics.
- Confirm staging noindex behavior.
- Confirm production metadata points to `https://jamieburk.art`.
