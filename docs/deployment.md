# Deployment

This repo deploys `apps/www`, a Next.js App Router app, through the root Dockerfile.

## Local preflight

Use Node 26, then run:

```bash
nvm use
npm ci
npm run typecheck
npm run lint
npm run public-safety
npm run build
```

`npm run preflight` runs the same checks in sequence, ending with a production build.

## Docker test

Build and run the image locally:

```bash
docker build -t jamieburk-art .
docker run --rm -p 3000:3000 jamieburk-art
```

Check:

- `http://localhost:3000/`
- `http://localhost:3000/work`
- `http://localhost:3000/work/technical-operations`
- `http://localhost:3000/resume`
- `http://localhost:3000/contact`
- `http://localhost:3000/colophon`
- `http://localhost:3000/api/health`
- `http://localhost:3000/sitemap.xml`
- `http://localhost:3000/robots.txt`

The Dockerfile expects the standalone server at `apps/www/server.js` inside `.next/standalone`, with `server.js` fallback support for other Next standalone layouts.

## Dokku staging

Create and configure the staging app:

```bash
dokku apps:create jamieburk-art-staging
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku config:set jamieburk-art-staging \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_DEPLOY_ENV=staging \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
```

Add the deploy remote once:

```bash
git remote add dokku-staging dokku@[DROPLET_IP_OR_HOSTNAME]:jamieburk-art-staging
```

Deploy the current branch:

```bash
git push dokku-staging HEAD:main
```

## Dokku production

Create and configure the production app:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_DEPLOY_ENV=production \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art
```

Add the deploy remote once:

```bash
git remote add dokku-production dokku@[DROPLET_IP_OR_HOSTNAME]:jamieburk-art
```

Deploy only after staging review:

```bash
git push dokku-production HEAD:main
```

## DNS and TLS

Point `staging.jamieburk.art`, `jamieburk.art`, and `www.jamieburk.art` at the Dokku host. After DNS resolves, enable Let's Encrypt for each Dokku app and verify that production redirects `www.jamieburk.art` to `jamieburk.art` if that redirect is configured.

## Rollback

Use Dokku's release history to identify the last known-good release, then roll back the affected app. After rollback, verify `/api/health`, `/robots.txt`, and the highest-priority public pages.
