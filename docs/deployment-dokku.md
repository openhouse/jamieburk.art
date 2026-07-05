# Dokku Deployment

This site uses Dockerfile deployment on Dokku. Deploy to staging first, review the public surface, then promote the same commit to production.

## Apps and Domains

Staging app: `jamieburk-art-staging`

Staging domain: `staging.jamieburk.art`

Production app: `jamieburk-art`

Production domains: `jamieburk.art`, `www.jamieburk.art`

## Staging Setup

```bash
dokku apps:create jamieburk-art-staging
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku config:set jamieburk-art-staging NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_DEPLOY_ENV=staging NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
dokku proxy:ports-set jamieburk-art-staging http:80:3000
dokku letsencrypt:set jamieburk-art-staging email <approved-email>
dokku letsencrypt:enable jamieburk-art-staging
```

## Production Setup

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_DEPLOY_ENV=production NEXT_PUBLIC_SITE_URL=https://jamieburk.art
dokku proxy:ports-set jamieburk-art http:80:3000
dokku letsencrypt:set jamieburk-art email <approved-email>
dokku letsencrypt:enable jamieburk-art
```

## Local Remotes

```bash
git remote add dokku-staging dokku@<droplet-host-or-ip>:jamieburk-art-staging
git remote add dokku-production dokku@<droplet-host-or-ip>:jamieburk-art
```

## Deploy Flow

```bash
git push dokku-staging HEAD:main
# Review https://staging.jamieburk.art
git push dokku-production HEAD:main
```

Production must not launch until the placeholder resume PDF has been replaced with Jamie's approved current resume.
