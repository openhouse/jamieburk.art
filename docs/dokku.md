# Dokku Deployment

Target production domain: <https://jamieburk.art>

The app is built from the root `Dockerfile` and serves HTTP on port `3000`.
The current Dockerfile keeps the Next.js standalone output strategy.

## One-Time App Setup

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku git:set jamieburk-art deploy-branch main
dokku ports:set jamieburk-art http:80:3000
```

If the Dokku Let's Encrypt plugin is installed:

```bash
dokku letsencrypt:enable jamieburk-art
```

## Normal Deploy

```bash
git push dokku main
```

## Local Docker Check

```bash
docker build -t jamieburk-art .
docker run --rm -p 3000:3000 jamieburk-art
curl -I http://localhost:3000/api/health
```
