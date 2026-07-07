# Deployment

This site is staging-first. Deploy and review `staging.jamieburk.art` before
production receives the same reviewed commit.

Never put private source archives in this repo or Docker context. Staging
`noindex` is a review safeguard, not a privacy boundary.

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
review. Start production as a quiet `noindex` soft launch; flip to `index` only
after Jamie's final approval.

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
  NEXT_PUBLIC_ROBOTS_POLICY=noindex \
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
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_ROBOTS_POLICY=noindex'
```

After final approval, change both runtime config and build args to:

```bash
NEXT_PUBLIC_ROBOTS_POLICY=index
```

Configure `www.jamieburk.art` to redirect to the apex at the proxy/DNS layer or
with the active Dokku redirect plugin before production sharing.

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
npm run public-safety
curl -i http://localhost:3000/api/health
curl -i http://localhost:3000/robots.txt
curl -i http://localhost:3000/sitemap.xml
curl -I http://localhost:3000/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
curl -I http://localhost:3000/opengraph-image
npm run check:routes -- http://localhost:3000
```

Expected staging behavior:

- `/api/health` returns a minimal non-sensitive service status.
- `/robots.txt` disallows `/`.
- `/sitemap.xml` uses the staging or local site URL, never production.
- Responses include `X-Robots-Tag: noindex, nofollow` outside production.
- The resume PDF responds with `X-Robots-Tag: noindex, nofollow`.
- The OpenGraph image returns an image response.

## Production Preflight

Run production preflight with production-like variables before the quiet
production soft launch:

```bash
APP_ENV=production \
SITE_ENV=production \
NEXT_PUBLIC_DEPLOY_ENV=production \
SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_ROBOTS_POLICY=noindex \
npm run preflight:production
```

If a running production or local standalone URL is available, add
`CHECK_ROUTES_BASE_URL` so preflight also runs the route checker.

Run it again before final indexing:

```bash
APP_ENV=production \
SITE_ENV=production \
NEXT_PUBLIC_DEPLOY_ENV=production \
SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_ROBOTS_POLICY=index \
npm run preflight:production
```

## Rollback

- Keep the last reviewed production commit or image available.
- If production indexing is wrong, set `NEXT_PUBLIC_ROBOTS_POLICY=noindex`,
  rebuild/redeploy if required, and verify `X-Robots-Tag` and `robots.txt`.
- If sensitive content ships, redeploy the previous reviewed commit and treat
  search removal as a follow-up incident task.
