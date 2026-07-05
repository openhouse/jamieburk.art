# Deployment

This site deploys to Dokku with Dockerfile deployment and Next.js standalone output. Deploy to staging first, review the exact commit, then promote that same commit to production.

## Apps

```bash
# Staging app
dokku apps:create jamieburk-art-staging
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku proxy:ports-set jamieburk-art-staging http:80:3000

# Production app
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku proxy:ports-set jamieburk-art http:80:3000
```

## Environment

Set environment config before the first deploy so the Next.js build and runtime agree on canonical URLs and robots policy.

```bash
dokku config:set jamieburk-art-staging \
  SITE_ENV=staging \
  NODE_ENV=production \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_ROBOTS_POLICY=noindex \
  NEXT_TELEMETRY_DISABLED=1

dokku config:set jamieburk-art \
  SITE_ENV=production \
  NODE_ENV=production \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_ROBOTS_POLICY=index \
  NEXT_TELEMETRY_DISABLED=1
```

Local development defaults are listed in `.env.example`.

## Remotes

```bash
git remote add dokku-staging dokku@DROPLET_HOST_OR_IP:jamieburk-art-staging
git remote add dokku-production dokku@DROPLET_HOST_OR_IP:jamieburk-art
```

Deploy the current branch to staging:

```bash
git push dokku-staging HEAD:main
```

After staging review, deploy the same reviewed commit to production:

```bash
git push dokku-production HEAD:main
```

## TLS

Use the approved public email address before enabling Let's Encrypt:

```bash
dokku letsencrypt:set jamieburk-art-staging email APPROVED_EMAIL
dokku letsencrypt:enable jamieburk-art-staging

dokku letsencrypt:set jamieburk-art email APPROVED_EMAIL
dokku letsencrypt:enable jamieburk-art
```

## DNS

```text
A      staging      DROPLET_IPV4
A      @            DROPLET_IPV4
A      www          DROPLET_IPV4
```

Only add AAAA records if IPv6 is configured correctly for the Droplet, Dokku, and DNS provider.

## Smoke Test

```bash
docker build -t jamieburk-art .
docker run --rm -p 3000:3000 jamieburk-art
curl -i http://localhost:3000/api/health
curl -i http://localhost:3000/robots.txt
curl -i http://localhost:3000/sitemap.xml
```

Expected policy:

- Staging uses `https://staging.jamieburk.art` and `NEXT_PUBLIC_ROBOTS_POLICY=noindex`.
- Production uses `https://jamieburk.art` and `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- Staging robots disallow crawling.
- Production robots allow crawling and publish the sitemap.
