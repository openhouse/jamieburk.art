# Deployment

This site deploys through Dokku using the root `Dockerfile` and Next.js standalone output.

## Environments

Staging:

```text
App: jamieburk-art-staging
URL: https://staging.jamieburk.art
Indexing: disabled
```

Production:

```text
App: jamieburk-art
URL: https://jamieburk.art
Indexing: enabled after approval
```

## Staging Setup

Run on the Dokku host:

```bash
dokku apps:create jamieburk-art-staging
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku config:set jamieburk-art-staging \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_ENV=staging \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_ALLOW_INDEXING=false
dokku docker-options:add jamieburk-art-staging build \
  "--build-arg=NEXT_PUBLIC_SITE_ENV=staging" \
  "--build-arg=NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art" \
  "--build-arg=NEXT_PUBLIC_ALLOW_INDEXING=false"
dokku proxy:ports-set jamieburk-art-staging http:80:3000
```

If Let's Encrypt is available:

```bash
dokku letsencrypt:set jamieburk-art-staging email <approved-email>
dokku letsencrypt:enable jamieburk-art-staging
```

Local remote and deploy:

```bash
git remote add dokku-staging dokku@<dokku-host>:jamieburk-art-staging
git push dokku-staging HEAD:main
```

If the Dokku app expects a different deploy branch, set it explicitly:

```bash
dokku git:set jamieburk-art-staging deploy-branch main
```

## Production Setup

Production is deployable only after staging review approves copy, contact details, resume, screenshots or artifacts, robots/indexing, and canonical URLs.

Run on the Dokku host:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_ENV=production \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_ALLOW_INDEXING=true
dokku docker-options:add jamieburk-art build \
  "--build-arg=NEXT_PUBLIC_SITE_ENV=production" \
  "--build-arg=NEXT_PUBLIC_SITE_URL=https://jamieburk.art" \
  "--build-arg=NEXT_PUBLIC_ALLOW_INDEXING=true"
dokku proxy:ports-set jamieburk-art http:80:3000
```

If Let's Encrypt is available:

```bash
dokku letsencrypt:set jamieburk-art email <approved-email>
dokku letsencrypt:enable jamieburk-art
```

Local remote:

```bash
git remote add dokku-production dokku@<dokku-host>:jamieburk-art
```

Deploy only after explicit production approval:

```bash
git push dokku-production main:main
```

## Health Check

The app exposes `/api/health`.

Expected staging shape:

```json
{
  "ok": true,
  "service": "jamie-portfolio",
  "environment": "staging",
  "site": "https://staging.jamieburk.art"
}
```

## Smoke Test

Before asking Jamie to review staging, verify:

- `/api/health` returns the expected environment and site URL.
- `/robots.txt` disallows indexing on staging.
- `/sitemap.xml` uses the active `NEXT_PUBLIC_SITE_URL`.
- Home, Work, Technical Operations, HJE, FairRentNYC, CallNYC, Source-Backed Team Memory, Resume, and Contact load.
- The resume page does not expose a placeholder PDF as an approved resume.
