# Deployment

This site is staging-first. Deploy and review `staging.jamieburk.art` before
production receives the same reviewed commit.

Production indexing is strict opt-in. The app stays noindex unless production
uses the exact approved URL and `NEXT_PUBLIC_ROBOTS_POLICY=index`.

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

The app build script currently uses `next build --webpack` because Turbopack
hung locally during the composite production-readiness verification pass.

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
review. Promote the exact reviewed staging commit, not a moving branch tip.

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
```

If `www.jamieburk.art` is configured, redirect it to `https://jamieburk.art`
through Dokku/nginx or the host-aware app redirect. Do not add speculative
content-route redirects unless the URL has already been shared.

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
curl -i http://localhost:3000/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
```

Expected staging behavior:

- `/api/health` returns the current environment, site URL, and robots state.
- `/robots.txt` disallows `/`.
- `/sitemap.xml` uses the staging or local site URL, never production.
- Responses include `X-Robots-Tag: noindex, nofollow` outside production.
- The resume PDF response includes `X-Robots-Tag: noindex, nofollow`.
- The sitemap does not include the resume PDF.

## Production Dry Run

Before production indexing, run:

```bash
npm run check
npm run check:production-readiness
```

Then build with production values:

```bash
docker build \
  --build-arg APP_ENV=production \
  --build-arg SITE_ENV=production \
  --build-arg NEXT_PUBLIC_DEPLOY_ENV=production \
  --build-arg SITE_URL=https://jamieburk.art \
  --build-arg NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  --build-arg NEXT_PUBLIC_ROBOTS_POLICY=index \
  -t jamieburk-art:production-test .
```

Expected production behavior after approval:

- `/api/health` reports production and `robotsIndexable: true`.
- `/robots.txt` allows `/` and lists the production sitemap.
- `/sitemap.xml` uses only `https://jamieburk.art` URLs.
- The resume PDF remains noindex and is not listed in the sitemap.
- HTML responses do not include noindex headers.
