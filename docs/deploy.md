# Deployment

This site deploys through Dokku with the root `Dockerfile` and Next.js standalone output. Deploy staging first, review it, then promote intentionally to production.

## Environments

| Environment | Dokku app | Domain |
| --- | --- | --- |
| Staging | `jamieburk-art-staging` | `https://staging.jamieburk.art` |
| Production | `jamieburk-art` | `https://jamieburk.art` |

Next.js metadata, sitemap, robots, and the health endpoint use `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_DEPLOY_ENV`. These values must be present at build time for Docker images.

## Local Docker Verification

```bash
docker build -t jamieburk-art \
  --build-arg NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  --build-arg NEXT_PUBLIC_DEPLOY_ENV=staging \
  .

docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  -e NEXT_PUBLIC_DEPLOY_ENV=staging \
  jamieburk-art
```

In another shell:

```bash
curl -I http://localhost:3000
curl http://localhost:3000/api/health
curl http://localhost:3000/robots.txt
curl http://localhost:3000/sitemap.xml
```

Expected staging behavior:

- the homepage responds;
- `/api/health` reports `environment: "staging"`;
- `/robots.txt` disallows `/`;
- metadata and sitemap URLs use the build-time site URL.

## Dokku Staging

```bash
dokku apps:create jamieburk-art-staging
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku config:set jamieburk-art-staging \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_DEPLOY_ENV=staging
```

The app listens on port `3000`.

```bash
dokku proxy:ports-set jamieburk-art-staging http:80:3000
```

From local:

```bash
git remote add dokku-staging dokku@[DROPLET_IP_OR_HOST]:jamieburk-art-staging
git push dokku-staging scaffold/A-E:main
```

After the first deploy:

```bash
curl -I http://staging.jamieburk.art
curl http://staging.jamieburk.art/api/health
curl http://staging.jamieburk.art/robots.txt
```

Enable TLS after DNS resolves and the app is reachable over HTTP:

```bash
dokku letsencrypt:set jamieburk-art-staging email [APPROVED_EMAIL]
dokku letsencrypt:enable jamieburk-art-staging
```

## Production

Do not deploy production until Jamie approves staging content and launch blockers are cleared.

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_DEPLOY_ENV=production
```

Production deploy, after approval:

```bash
git remote add dokku-production dokku@[DROPLET_IP_OR_HOST]:jamieburk-art
git push dokku-production develop:main
```

Expected production behavior:

- `https://jamieburk.art` responds;
- `/robots.txt` allows crawling;
- `/sitemap.xml` uses `https://jamieburk.art`;
- canonical and OpenGraph URLs use production;
- no placeholder resume, private details, or unapproved TODOs remain.
