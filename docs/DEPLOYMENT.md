# Deployment

Deployment uses the root Dockerfile, Next.js standalone output, and two Dokku apps.

## Targets

- Staging app: `jamieburk-art-staging`
- Staging domain: `staging.jamieburk.art`
- Production app: `jamieburk-art`
- Production domains: `jamieburk.art`, `www.jamieburk.art`

## DNS

- Point `staging.jamieburk.art` to the Dokku host.
- Point `jamieburk.art` to the Dokku host.
- Point `www.jamieburk.art` to the Dokku host.
- Wait for DNS to resolve before enabling Let's Encrypt.

## Dokku Setup

```bash
dokku apps:create jamieburk-art-staging
dokku proxy:ports-set jamieburk-art-staging http:80:3000
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku config:set jamieburk-art-staging NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_DEPLOY_ENV=staging NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art NEXT_PUBLIC_NO_INDEX=true
```

```bash
dokku apps:create jamieburk-art
dokku proxy:ports-set jamieburk-art http:80:3000
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_DEPLOY_ENV=production NEXT_PUBLIC_SITE_URL=https://jamieburk.art NEXT_PUBLIC_NO_INDEX=false
```

Optional public contact email:

```bash
dokku config:set jamieburk-art-staging NEXT_PUBLIC_CONTACT_EMAIL=approved@example.com
dokku config:set jamieburk-art NEXT_PUBLIC_CONTACT_EMAIL=approved@example.com
```

## Local Remotes

```bash
git remote add dokku-staging dokku@YOUR_DROPLET_HOSTNAME_OR_IP:jamieburk-art-staging
git remote add dokku-production dokku@YOUR_DROPLET_HOSTNAME_OR_IP:jamieburk-art
```

## Local Docker Test

```bash
docker build -t jamieburk-art .
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_DEPLOY_ENV=staging \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  -e NEXT_PUBLIC_NO_INDEX=true \
  jamieburk-art
```

Check the running container:

```bash
curl -I http://localhost:3000
curl -s http://localhost:3000/api/health
curl -s http://localhost:3000/robots.txt
```

## Staging Deploy

```bash
git push dokku-staging HEAD:main
```

Verify:

```bash
curl -I https://staging.jamieburk.art
curl -s https://staging.jamieburk.art/api/health
curl -s https://staging.jamieburk.art/robots.txt
```

Staging should report `environment: staging`, use `https://staging.jamieburk.art`, and disallow indexing.

## HTTPS

```bash
dokku letsencrypt:set jamieburk-art-staging email APPROVED_EMAIL
dokku letsencrypt:enable jamieburk-art-staging
dokku letsencrypt:set jamieburk-art email APPROVED_EMAIL
dokku letsencrypt:enable jamieburk-art
```

## Production Promotion Checklist

- Jamie approved the staging site.
- Approved resume PDF is in `apps/site/public/resume/`.
- Approved public email is configured or contact details are intentionally omitted.
- LinkedIn and GitHub URLs are confirmed or omitted.
- No private or protected material is present.
- No private/proprietary font files are committed.
- Canonical URLs and sitemap URLs use `https://jamieburk.art`.
- `NEXT_PUBLIC_DEPLOY_ENV=production`.
- `NEXT_PUBLIC_NO_INDEX=false`.
- Docker build uses `apps/site` and `@jamie/site`.

Promote:

```bash
git push dokku-production HEAD:main
```

Post-deploy checks:

```bash
curl -I https://jamieburk.art
curl -s https://jamieburk.art/api/health
curl -s https://jamieburk.art/robots.txt
```
