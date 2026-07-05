# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, Docker, Dokku.

- App path: `apps/www`
- Package: `@jamie-burkart/www`
- Package manager: npm workspaces
- Staging target: <https://staging.jamieburk.art>
- Production target: <https://jamieburk.art>

## Local Development

```bash
nvm install
nvm use
npm install
npm run dev
```

## Environment

Copy `.env.example` for local staging-like defaults.

```bash
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_DEPLOY_ENV=staging
NEXT_PUBLIC_NOINDEX=true
NEXT_TELEMETRY_DISABLED=1
```

Staging uses `NEXT_PUBLIC_NOINDEX=true`. Production must set `NEXT_PUBLIC_SITE_URL=https://jamieburk.art`, `NEXT_PUBLIC_DEPLOY_ENV=production`, and `NEXT_PUBLIC_NOINDEX=false`.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Typeface Policy

V1 uses open-source fonts through `next/font/google`.

Approved V1 fonts:

- Karla
- Oswald

Do not commit or deploy Trade Gothic, Verlag, Gotham Rounded, the Maria handwriting font, or any private/custom font file unless Jamie has confirmed web-use rights and deployment permission in writing.

When uncertain, use Karla and Oswald only.

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output.

Staging target domain: <https://staging.jamieburk.art>

Production target domain: <https://jamieburk.art>

Create the staging app and environment:

```bash
dokku apps:create jamieburk-art-staging
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku config:set jamieburk-art-staging NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art NEXT_PUBLIC_DEPLOY_ENV=staging NEXT_PUBLIC_NOINDEX=true
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art'
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_DEPLOY_ENV=staging'
dokku docker-options:add jamieburk-art-staging build '--build-arg NEXT_PUBLIC_NOINDEX=true'
dokku ports:set jamieburk-art-staging http:80:3000
```

After DNS resolves and the first staging deploy works:

```bash
dokku letsencrypt:set jamieburk-art-staging email jamie.burkart@gmail.com
dokku letsencrypt:enable jamieburk-art-staging
```

Local staging remote:

```bash
git remote add dokku-staging dokku@[DROPLET_IP_OR_HOST]:jamieburk-art-staging
git push dokku-staging scaffold/A+M:main
```

Production later:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_SITE_URL=https://jamieburk.art NEXT_PUBLIC_DEPLOY_ENV=production NEXT_PUBLIC_NOINDEX=false
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_SITE_URL=https://jamieburk.art'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_DEPLOY_ENV=production'
dokku docker-options:add jamieburk-art build '--build-arg NEXT_PUBLIC_NOINDEX=false'
dokku ports:set jamieburk-art http:80:3000
```

Do not deploy production until staging is reviewed and approved.

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

## Docker Check

```bash
docker build -t jamieburk-art .
docker run --rm -p 3000:3000 jamieburk-art
curl http://localhost:3000/api/health
```

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf` before production.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
- Review staging before production and remove public TODOs.
