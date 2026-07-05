# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Stack

- Next.js App Router
- React
- TypeScript
- MDX
- Tailwind CSS
- daisyUI
- Node 26 via nvm
- npm workspaces
- Dockerfile deployment
- Dokku on DigitalOcean

## App Path

The current app lives at:

```text
apps/www
```

Earlier planning docs sometimes used `apps/web`; scaffold/A uses `apps/www`, and we are keeping that path for V1 to avoid churn.

## Environment

Copy the root `.env.example` into the app directory for local development defaults:

```bash
cp .env.example apps/www/.env.local
```

Staging should use:

```bash
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_SITE_ENV=staging
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production
```

Production should use:

```bash
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production
```

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

The production build currently uses Next's webpack build mode for reliability with the pinned Next 16 scaffold. The default Turbopack build stalled locally during this hardening pass.

## Docker Local Test

```bash
docker build -t jamieburk-art .
docker run --rm -p 3000:3000 jamieburk-art
```

The app serves on port `3000`. The standalone server path is expected at `apps/www/server.js` inside the Next.js standalone output, with `server.js` as a fallback.

## Staging Deploy

Staging URL:

```text
https://staging.jamieburk.art
```

On the Dokku host:

```bash
dokku apps:create jamieburk-art-staging
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku config:set jamieburk-art-staging \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_SITE_ENV=staging
dokku proxy:ports-set jamieburk-art-staging http:80:3000
```

If Dokku does not auto-detect the Dockerfile builder:

```bash
dokku builder:set jamieburk-art-staging selected dockerfile
```

From local:

```bash
git remote add dokku-staging dokku@[DROPLET_HOST_OR_IP]:jamieburk-art-staging
git push dokku-staging HEAD:main
```

After deploy:

```bash
dokku logs jamieburk-art-staging -t
dokku ps:report jamieburk-art-staging
dokku domains:report jamieburk-art-staging
```

After DNS points to the droplet and HTTP is reachable, enable TLS:

```bash
dokku letsencrypt:enable jamieburk-art-staging
```

## Production Deploy

Do not deploy production until staging has passed review.

Production URL:

```text
https://jamieburk.art
```

Production target later:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_SITE_ENV=production
dokku proxy:ports-set jamieburk-art http:80:3000
```

Deploy later:

```bash
git remote add dokku-production dokku@[DROPLET_HOST_OR_IP]:jamieburk-art
git push dokku-production HEAD:main
```

Then enable TLS after DNS is correct:

```bash
dokku letsencrypt:enable jamieburk-art
```

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
