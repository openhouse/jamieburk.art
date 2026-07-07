# Deployment

This site is staging-first. Deploy and review `staging.jamieburk.art` before
production receives the same reviewed commit.

The build script uses `next build --webpack` for V1 because local darwin/arm64
verification can fall back to WASM SWC bindings, and Turbopack requires native
bindings on that platform.

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
  NEXT_PUBLIC_CONTACT_EMAIL= \
  NEXT_PUBLIC_CONTACT_LABEL= \
  NEXT_PUBLIC_LINKEDIN_URL= \
  NEXT_PUBLIC_LINKEDIN_LABEL= \
  NEXT_PUBLIC_GITHUB_URL= \
  NEXT_PUBLIC_GITHUB_LABEL= \
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
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_CONTACT_EMAIL='
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_CONTACT_LABEL='
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_LINKEDIN_URL='
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_LINKEDIN_LABEL='
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_GITHUB_URL='
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_GITHUB_LABEL='
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
  NEXT_PUBLIC_CONTACT_EMAIL=<approved-public-email> \
  NEXT_PUBLIC_CONTACT_LABEL=<approved-public-email-label> \
  NEXT_PUBLIC_LINKEDIN_URL=<approved-linkedin-url-or-blank> \
  NEXT_PUBLIC_LINKEDIN_LABEL=<approved-linkedin-label-or-blank> \
  NEXT_PUBLIC_GITHUB_URL=<approved-github-url-or-blank> \
  NEXT_PUBLIC_GITHUB_LABEL=<approved-github-label-or-blank> \
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
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_CONTACT_EMAIL=<approved-public-email>'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_CONTACT_LABEL=<approved-public-email-label>'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_LINKEDIN_URL=<approved-linkedin-url-or-blank>'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_LINKEDIN_LABEL=<approved-linkedin-label-or-blank>'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_GITHUB_URL=<approved-github-url-or-blank>'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_GITHUB_LABEL=<approved-github-label-or-blank>'
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
  --build-arg NEXT_PUBLIC_CONTACT_EMAIL= \
  --build-arg NEXT_PUBLIC_CONTACT_LABEL= \
  --build-arg NEXT_PUBLIC_LINKEDIN_URL= \
  --build-arg NEXT_PUBLIC_LINKEDIN_LABEL= \
  --build-arg NEXT_PUBLIC_GITHUB_URL= \
  --build-arg NEXT_PUBLIC_GITHUB_LABEL= \
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
curl -I http://localhost:3000/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
```

Expected staging behavior:

- `/api/health` returns the current environment, site URL, and robots state.
- `/robots.txt` disallows `/`.
- `/sitemap.xml` uses the staging or local site URL, never production.
- Responses include `X-Robots-Tag: noindex, nofollow` outside production.
- The resume PDF response includes `X-Robots-Tag: noindex, nofollow`.
- The page chrome includes `Staging review - not indexed` outside production.

## Production Dry Run

Production is blocked until Jamie approves launch content and the production
gate clears.

```bash
NEXT_PUBLIC_CONTACT_EMAIL=<approved-public-email> \
NEXT_PUBLIC_CONTACT_LABEL=<approved-public-email-label> \
NEXT_PUBLIC_LINKEDIN_URL=<approved-linkedin-url-or-blank> \
NEXT_PUBLIC_LINKEDIN_LABEL=<approved-linkedin-label-or-blank> \
NEXT_PUBLIC_GITHUB_URL=<approved-github-url-or-blank> \
NEXT_PUBLIC_GITHUB_LABEL=<approved-github-label-or-blank> \
npm run check:production
```

Expected production behavior:

- Canonical URLs use `https://jamieburk.art`.
- Sitemap URLs use `https://jamieburk.art`.
- `/robots.txt` allows indexing and includes the sitemap.
- Public HTML pages do not receive `X-Robots-Tag: noindex, nofollow`.
- The resume PDF remains noindex unless Jamie separately approves direct PDF indexing.
- `NEXT_PUBLIC_CONTACT_EMAIL` is set to Jamie's approved public email.
- No staging or localhost URL is used for production metadata.
- No unresolved approval TODOs, placeholder contact labels, draft/private content states, private source paths, or private font files are present.
