# Deployment

This site is staging-first. Deploy and review `staging.jamieburk.art` before
production receives the same reviewed commit.

## Dokku Apps

```txt
jamieburk-art-staging -> staging.jamieburk.art
jamieburk-art         -> jamieburk.art
```

## Staging Setup Draft

```bash
dokku apps:create jamieburk-art-staging
dokku builder:set jamieburk-art-staging selected dockerfile
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku proxy:ports-set jamieburk-art-staging http:80:3000

dokku config:set jamieburk-art-staging \
  APP_ENV=staging \
  SITE_ENV=staging \
  NEXT_PUBLIC_DEPLOY_ENV=staging \
  SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_ROBOTS_POLICY=noindex \
  NEXT_TELEMETRY_DISABLED=1 \
  NODE_ENV=production \
  PORT=3000 \
  HOSTNAME=0.0.0.0
```

The app reads URL and robots settings during build for metadata, sitemap, and
robots output. If Dokku does not expose config values during Docker build, add
matching build args:

```bash
dokku docker-options:add jamieburk-art-staging build '--build-arg APP_ENV=staging'
dokku docker-options:add jamieburk-art-staging build '--build-arg SITE_ENV=staging'
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_DEPLOY_ENV=staging'
dokku docker-options:add jamieburk-art-staging build '--build-arg SITE_URL=https://staging.jamieburk.art'
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art'
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_ROBOTS_POLICY=noindex'
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ofdj6rnm'
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_CLOUDINARY_PILOT=enabled'
```

Enable TLS after DNS resolves:

```bash
dokku letsencrypt:set jamieburk-art-staging email <approved-email>
dokku letsencrypt:enable jamieburk-art-staging
```

Local remote:

```bash
git remote add dokku-staging dokku@<droplet-host-or-ip>:jamieburk-art-staging
git push dokku-staging HEAD:main
```

## Production Setup Draft

Use this only after staging content, accessibility, metadata, and public-safety
review.

```bash
dokku apps:create jamieburk-art
dokku builder:set jamieburk-art selected dockerfile
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku proxy:ports-set jamieburk-art http:80:3000

dokku config:set jamieburk-art \
  APP_ENV=production \
  SITE_ENV=production \
  NEXT_PUBLIC_DEPLOY_ENV=production \
  SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_ROBOTS_POLICY=index \
  NEXT_TELEMETRY_DISABLED=1 \
  NODE_ENV=production \
  PORT=3000 \
  HOSTNAME=0.0.0.0
```

If staging required build args, add production build args too:

```bash
dokku docker-options:add jamieburk-art build '--build-arg APP_ENV=production'
dokku docker-options:add jamieburk-art build '--build-arg SITE_ENV=production'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_DEPLOY_ENV=production'
dokku docker-options:add jamieburk-art build '--build-arg SITE_URL=https://jamieburk.art'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_SITE_URL=https://jamieburk.art'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_ROBOTS_POLICY=index'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ofdj6rnm'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_CLOUDINARY_PILOT=enabled'
```

Enable TLS:

```bash
dokku letsencrypt:set jamieburk-art email <approved-email>
dokku letsencrypt:enable jamieburk-art
```

Local remote:

```bash
git remote add dokku-production dokku@<droplet-host-or-ip>:jamieburk-art
git push dokku-production HEAD:main
```

## Local Docker Verification

```bash
docker build \
  --build-arg APP_ENV=staging \
  --build-arg SITE_ENV=staging \
  --build-arg NEXT_PUBLIC_DEPLOY_ENV=staging \
  --build-arg SITE_URL=https://staging.jamieburk.art \
  --build-arg NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  --build-arg NEXT_PUBLIC_ROBOTS_POLICY=noindex \
  -t jamieburk-art:staging-test .
```

```bash
docker run --rm -p 3000:3000 \
  -e APP_ENV=staging \
  -e SITE_ENV=staging \
  -e NEXT_PUBLIC_DEPLOY_ENV=staging \
  -e SITE_URL=http://localhost:3000 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  -e NEXT_PUBLIC_ROBOTS_POLICY=noindex \
  jamieburk-art:staging-test
```

Verify:

```bash
curl -i http://localhost:3000/api/health
curl -i http://localhost:3000/robots.txt
curl -i http://localhost:3000/sitemap.xml
```

Expected staging behavior:

- `/api/health` returns the current environment, site URL, and robots state.
- `/robots.txt` disallows `/`.
- `/sitemap.xml` uses the staging or local site URL, never production.
- Responses include `X-Robots-Tag: noindex, nofollow` outside production.

## Governed Cloudinary pilot

Cloudinary is an optional delivery projection, not the media source of truth.
The exact allowlist, asset versions, responsive widths, and quality policies
live in `apps/www/src/lib/media-delivery.ts`; the public-safe upload receipt is
`reports/media/cloudinary-pilot-2026-08-15.json`. Only these sources participate:

- `/images/field-notes/nycac-shoestring-facilitation.webp`
- `/artifacts/fair-rent-nyc/let-nyc-dance-public-surface.webp`

`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is a public delivery identifier.
`NEXT_PUBLIC_CLOUDINARY_PILOT` must equal `enabled` at build time to activate
the allowlist. It defaults to `disabled`; a missing cloud name, disabled flag,
or unlisted source keeps the existing same-origin path. Never put upload
credentials, account secrets, signed administration URLs, photo masters, or
private archive metadata in a `NEXT_PUBLIC_*` variable, Git, an eval receipt, or
the client bundle.

Direct Cloudinary `<img srcset>` delivery intentionally bypasses Next image
optimization for the two allowlisted assets, avoiding a second transformation
and cache layer. The Open Graph image, resume PDF, fonts, and every unlisted
asset remain same-origin. The Docker image continues to package `public/` and
`.next/static/` so rollback does not depend on Cloudinary.

Run the blocking contract before deployment:

```bash
npm run evals:media-delivery
npm run test:media-delivery
```

Rollback requires a rebuild because the public configuration is compiled into
the Next bundle:

```bash
dokku docker-options:remove <app> build '--build-arg NEXT_PUBLIC_CLOUDINARY_PILOT=enabled'
dokku docker-options:add <app> build '--build-arg NEXT_PUBLIC_CLOUDINARY_PILOT=disabled'
git push <dokku-remote> HEAD:main
```

This bounded decision is recorded in the Knowledge Wiki at
`docs/knowledge-bank/decisions/cloudinary-selective-media-delivery-2026-08-15.md`.
