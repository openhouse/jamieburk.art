# Deployment

This portfolio is staging-first. Production content and indexing are not approved yet.

## Environment

Staging:

```bash
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_DEPLOY_ENV=staging
NEXT_PUBLIC_ALLOW_INDEXING=false
```

Production later:

```bash
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_DEPLOY_ENV=production
NEXT_PUBLIC_ALLOW_INDEXING=true
```

`NEXT_PUBLIC_ALLOW_INDEXING=false` sets page metadata to noindex/nofollow and makes `robots.txt` return `Disallow: /`.

Set these public values before the Next.js image build. The Dockerfile also accepts them as build args so static metadata, sitemap, and robots output match the target environment.

## Dokku Staging

On the DigitalOcean / Dokku host:

```bash
dokku apps:create jamieburk-art-staging
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku config:set jamieburk-art-staging \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_DEPLOY_ENV=staging \
  NEXT_PUBLIC_ALLOW_INDEXING=false
```

Local remote:

```bash
git remote add dokku-staging dokku@[DROPLET_HOST_OR_IP]:jamieburk-art-staging
git push dokku-staging HEAD:main
```

Health checks:

```bash
curl https://staging.jamieburk.art/api/health
curl https://staging.jamieburk.art/robots.txt
```

## Dokku Production Later

Do not enable indexing until production content is public-safe and approved.

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_DEPLOY_ENV=production \
  NEXT_PUBLIC_ALLOW_INDEXING=true
```

Local remote:

```bash
git remote add dokku-prod dokku@[DROPLET_HOST_OR_IP]:jamieburk-art
git push dokku-prod HEAD:main
```

## Local Verification

```bash
nvm use
npm ci
npm run typecheck
npm run lint
npm run build
npm run check -w @jamie-burkart/www
```

Docker:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  --build-arg NEXT_PUBLIC_DEPLOY_ENV=staging \
  --build-arg NEXT_PUBLIC_ALLOW_INDEXING=false \
  -t jamieburk-art .
docker run --rm -p 3000:3000 \
  -e PORT=3000 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  -e NEXT_PUBLIC_DEPLOY_ENV=staging \
  -e NEXT_PUBLIC_ALLOW_INDEXING=false \
  jamieburk-art
```

Then verify:

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/robots.txt
```
