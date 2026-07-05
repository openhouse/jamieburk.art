# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, Docker, Dokku.

## Local Setup

```bash
nvm install
nvm use
npm ci
npm run dev
```

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Docker Test

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  --build-arg NEXT_PUBLIC_DEPLOY_ENV=staging \
  -t jamie-portfolio:scaffold-a .
docker run --rm -p 3000:3000 jamie-portfolio:scaffold-a
```

In another terminal:

```bash
curl -I http://localhost:3000
curl http://localhost:3000/api/health
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output.

Deploy staging first. Production should wait until Jamie approves staging.

Two Dokku apps are expected:

```text
jamieburk-art-staging -> staging.jamieburk.art
jamieburk-art -> jamieburk.art / www.jamieburk.art
```

Suggested remotes:

```bash
git remote add dokku-staging dokku@<DROPLET_HOST_OR_IP>:jamieburk-art-staging
git remote add dokku-production dokku@<DROPLET_HOST_OR_IP>:jamieburk-art
```

Staging app setup:

```bash
dokku apps:create jamieburk-art-staging
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku ports:set jamieburk-art-staging http:80:3000
dokku config:set jamieburk-art-staging \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_DEPLOY_ENV=staging \
  NEXT_TELEMETRY_DISABLED=1
dokku docker-options:add jamieburk-art-staging build \
  '--build-arg NEXT_PUBLIC_SITE_URL --build-arg NEXT_PUBLIC_DEPLOY_ENV'
```

After DNS resolves:

```bash
dokku letsencrypt:enable jamieburk-art-staging
```

Deploy staging from the hardening branch or `develop` after merge:

```bash
git push dokku-staging scaffold/A-K:main
```

or:

```bash
git push dokku-staging develop:main
```

Production app setup, after staging approval:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku ports:set jamieburk-art http:80:3000
dokku config:set jamieburk-art \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_DEPLOY_ENV=production \
  NEXT_TELEMETRY_DISABLED=1
dokku docker-options:add jamieburk-art build \
  '--build-arg NEXT_PUBLIC_SITE_URL --build-arg NEXT_PUBLIC_DEPLOY_ENV'
```

After DNS resolves:

```bash
dokku letsencrypt:enable jamieburk-art
```

Deploy production only after Jamie approves staging and production content:

```bash
git push dokku-production develop:main
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

## Staging Review Checklist

- <https://staging.jamieburk.art> loads.
- `/api/health` returns OK and reports the staging URL/environment.
- `/`, `/work`, `/work/technical-operations`, `/lab/source-backed-team-memory`, `/resume`, `/contact`, and `/colophon` load without runtime errors.
- `/robots.txt` disallows staging and `/sitemap.xml` uses the staging URL.
- Staging sends noindex signals and contains only public-safe material.
- The resume placeholder and contact TODOs are resolved or visibly staging-only.
- Mobile layout and keyboard focus are usable.

## Production Approval Checklist

- Jamie has reviewed staging and given explicit production approval.
- The approved resume PDF has replaced the placeholder.
- Public email, LinkedIn, GitHub, metrics, screenshots, and artifacts are approved or removed.
- Production sitemap uses <https://jamieburk.art>.
- Production robots/indexing is not blocked by staging settings.
- No visitor-facing TODOs remain unless intentionally public.
- Let’s Encrypt works for `jamieburk.art` and the chosen `www` behavior.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
