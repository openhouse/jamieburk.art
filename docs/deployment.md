# Deployment

This site is staging-first. Deploy and review `staging.jamieburk.art` before
production receives the same reviewed commit.

## Dokku Apps

```text
jamieburk-art-staging -> staging.jamieburk.art
jamieburk-art         -> jamieburk.art
www.jamieburk.art     -> jamieburk.art
```

## Canonical Environment

```text
APP_ENV=staging|production
SITE_URL=https://staging.jamieburk.art or https://jamieburk.art
NEXT_PUBLIC_SITE_URL=same as SITE_URL
NEXT_PUBLIC_ROBOTS_POLICY=noindex|index
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0
```

Production indexing is opt-in. Production is indexable only when all of these
are true:

```text
APP_ENV=production
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=index
```

## Staging Setup Draft

```bash
dokku apps:create jamieburk-art-staging
dokku builder:set jamieburk-art-staging selected dockerfile
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku proxy:ports-set jamieburk-art-staging http:80:3000

dokku config:set jamieburk-art-staging \
  APP_ENV=staging \
  SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_ROBOTS_POLICY=noindex \
  NEXT_TELEMETRY_DISABLED=1 \
  NODE_ENV=production \
  PORT=3000 \
  HOSTNAME=0.0.0.0
```

Dockerfile deploys need matching build args for values used during `next build`:

```bash
dokku docker-options:add jamieburk-art-staging build '--build-arg APP_ENV=staging'
dokku docker-options:add jamieburk-art-staging build '--build-arg SITE_URL=https://staging.jamieburk.art'
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art'
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_ROBOTS_POLICY=noindex'
```

Enable TLS after DNS resolves:

```bash
dokku letsencrypt:set jamieburk-art-staging email <approved-email>
dokku letsencrypt:enable jamieburk-art-staging
```

Deploy:

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
  SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_ROBOTS_POLICY=index \
  NEXT_TELEMETRY_DISABLED=1 \
  NODE_ENV=production \
  PORT=3000 \
  HOSTNAME=0.0.0.0
```

Production build args:

```bash
dokku docker-options:add jamieburk-art build '--build-arg APP_ENV=production'
dokku docker-options:add jamieburk-art build '--build-arg SITE_URL=https://jamieburk.art'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_SITE_URL=https://jamieburk.art'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_ROBOTS_POLICY=index'
```

Enable TLS:

```bash
dokku letsencrypt:set jamieburk-art email <approved-email>
dokku letsencrypt:enable jamieburk-art
```

Deploy:

```bash
git remote add dokku-production dokku@<droplet-host-or-ip>:jamieburk-art
git push dokku-production HEAD:main
```

## Local Docker Verification

```bash
docker build \
  --build-arg APP_ENV=staging \
  --build-arg SITE_URL=https://staging.jamieburk.art \
  --build-arg NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  --build-arg NEXT_PUBLIC_ROBOTS_POLICY=noindex \
  -t jamieburk-art:staging-test .
```

```bash
docker run --rm -p 3000:3000 \
  -e APP_ENV=staging \
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
curl -I http://localhost:3000/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
```

Expected staging behavior:

- `/api/health` reports `appEnv: staging`, `isProduction: false`, and
  `robotsIndexable: false`.
- `/robots.txt` disallows `/`.
- `/sitemap.xml` uses staging or local URLs, never production.
- Responses include `X-Robots-Tag: noindex, nofollow` outside production.
- The resume PDF is noindexed.

## Rollback

If production is wrong, set production robots policy back to noindex if needed,
redeploy the previous known-good SHA or Dokku release, then verify
`/api/health`, `/robots.txt`, `/sitemap.xml`, `/`, `/resume`, and `/contact`.
