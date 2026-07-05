# Deployment

The first deployment target is staging:

```text
https://staging.jamieburk.art
```

Production comes after Jamie reviews staging:

```text
https://jamieburk.art
```

## Environment

The app defaults to staging when no environment is set.

```bash
APP_ENV=staging
SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

For production, use:

```bash
APP_ENV=production
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

## Staging Dokku Setup

```bash
dokku apps:create jamieburk-art-staging
dokku builder:set jamieburk-art-staging selected dockerfile
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku proxy:ports-set jamieburk-art-staging http:80:3000

dokku config:set jamieburk-art-staging \
  APP_ENV=staging \
  SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_TELEMETRY_DISABLED=1 \
  NODE_ENV=production \
  PORT=3000 \
  HOSTNAME=0.0.0.0

dokku docker-options:add jamieburk-art-staging build '--build-arg APP_ENV=staging'
dokku docker-options:add jamieburk-art-staging build '--build-arg SITE_URL=https://staging.jamieburk.art'
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art'
```

Enable TLS after DNS resolves:

```bash
dokku letsencrypt:set jamieburk-art-staging email <approved-email>
dokku letsencrypt:enable jamieburk-art-staging
```

Local remote:

```bash
git remote add staging dokku@<droplet-ip-or-host>:jamieburk-art-staging
git push staging HEAD:main
```

## Production Dokku Setup

Do this only after staging content, accessibility, metadata, and public-safety review.

```bash
dokku apps:create jamieburk-art
dokku builder:set jamieburk-art selected dockerfile
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku proxy:ports-set jamieburk-art http:80:3000

dokku config:set jamieburk-art \
  APP_ENV=production \
  SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_TELEMETRY_DISABLED=1 \
  NODE_ENV=production \
  PORT=3000 \
  HOSTNAME=0.0.0.0

dokku docker-options:add jamieburk-art build '--build-arg APP_ENV=production'
dokku docker-options:add jamieburk-art build '--build-arg SITE_URL=https://jamieburk.art'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_SITE_URL=https://jamieburk.art'

dokku letsencrypt:set jamieburk-art email <approved-email>
dokku letsencrypt:enable jamieburk-art
```

Local remote:

```bash
git remote add production dokku@<droplet-ip-or-host>:jamieburk-art
git push production HEAD:main
```

## Local Docker Verification

```bash
docker build \
  --build-arg APP_ENV=staging \
  --build-arg SITE_URL=https://staging.jamieburk.art \
  --build-arg NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  -t jamieburk-art:staging-test .

docker run --rm -p 3000:3000 \
  -e APP_ENV=staging \
  -e SITE_URL=https://staging.jamieburk.art \
  -e NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  jamieburk-art:staging-test
```

Verify:

```bash
curl -i http://localhost:3000/api/health
curl -i http://localhost:3000/robots.txt
curl -i http://localhost:3000/sitemap.xml
```

Expected staging behavior:

- `/api/health` returns `appEnv: "staging"` and `siteUrl: "https://staging.jamieburk.art"`.
- `/robots.txt` disallows crawling.
- Pages emit noindex/nofollow metadata.
- Canonical URLs use `https://staging.jamieburk.art`.
- Top navigation and Work cards render and link correctly.

## Production Gate

Do not deploy production until Jamie approves public email/contact info, resume PDF, screenshots or placeholders, claims and metrics, named collaborators/credits, and production URL behavior including `www`.
