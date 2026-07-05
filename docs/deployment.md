# Deployment

This app deploys with the root Dockerfile, Next.js standalone output, npm workspaces, Node 26, and Dokku. Staging should be deployed and reviewed before production.

## Environments

| Environment | Dokku app | Domain | APP_ENV |
| --- | --- | --- | --- |
| Staging | jamieburk-art-staging | https://staging.jamieburk.art | staging |
| Production | jamieburk-art | https://jamieburk.art | production |

The app reads `APP_ENV`, `SITE_URL`, and `NEXT_PUBLIC_SITE_URL`. Next metadata, sitemap, robots, and static routes may be produced during `next build`, so Docker build args must match the target environment.

## Local Docker Check

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

- `/api/health` returns `ok: true`, `appEnv: "staging"`, and `siteUrl: "https://staging.jamieburk.art"`.
- `/robots.txt` disallows all crawlers.
- Responses include `X-Robots-Tag: noindex, nofollow`.
- Sitemap and canonical metadata use `https://staging.jamieburk.art`.

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
  NODE_ENV=production

dokku docker-options:add jamieburk-art-staging build '--build-arg APP_ENV'
dokku docker-options:add jamieburk-art-staging build '--build-arg SITE_URL'
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_SITE_URL'

dokku letsencrypt:set jamieburk-art-staging email <approved-email>
dokku letsencrypt:enable jamieburk-art-staging
```

Local remote:

```bash
git remote add staging dokku@<droplet-ip-or-host>:jamieburk-art-staging
git push staging HEAD:main
```

## Production Dokku Setup

Run production setup only after staging content, accessibility, metadata, and public-safety review.

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
  NODE_ENV=production

dokku docker-options:add jamieburk-art build '--build-arg APP_ENV'
dokku docker-options:add jamieburk-art build '--build-arg SITE_URL'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_SITE_URL'

dokku letsencrypt:set jamieburk-art email <approved-email>
dokku letsencrypt:enable jamieburk-art
```

Local remote:

```bash
git remote add production dokku@<droplet-ip-or-host>:jamieburk-art
git push production HEAD:main
```

## Production Verification

Before production deploy, simulate production locally:

```bash
APP_ENV=production \
SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
npm run build
```

Then confirm production `/robots.txt` allows crawling and includes `https://jamieburk.art/sitemap.xml`.

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL.
- Public-ready GitHub URL.
- Current resume PDF to replace the placeholder.
- Public-safe screenshots or artifacts for Harry J. Epstein Company, FairRentNYC / Commercial Rent Stabilization, and CallNYC.
- Approval for exact public impact metrics.
- Approval for collaborator names, photos, or specific quotes.
- DNS access and Dokku droplet details.
- Approved Let's Encrypt email.
- Confirmation of whether `www.jamieburk.art` should redirect to apex or serve separately.
