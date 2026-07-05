# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, Docker, Dokku.

## Environments

- Staging app: `jamieburk-art-staging`
- Staging domain: <https://staging.jamieburk.art>
- Production app: `jamieburk-art`
- Production domain: <https://jamieburk.art>

## Local Development

```bash
nvm install
nvm use
npm ci
npm run dev
```

## Checks

```bash
npm run check
npm run build
```

## Environment Variables

Copy `.env.example` when running staging-like local checks.

```bash
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_DEPLOY_ENV=staging
NEXT_PUBLIC_CONTACT_EMAIL=
```

Do not commit real secrets. V1 should not need secrets.

## Docker

Next.js metadata, sitemap, robots, and health output use build-time public environment values.

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

Verify:

```bash
curl -I http://localhost:3000
curl http://localhost:3000/api/health
curl http://localhost:3000/robots.txt
curl http://localhost:3000/sitemap.xml
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output.

Deploy to staging first:

```bash
dokku apps:create jamieburk-art-staging
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku config:set jamieburk-art-staging \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_DEPLOY_ENV=staging
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

From local:

```bash
git remote add dokku-staging dokku@[DROPLET_IP_OR_HOST]:jamieburk-art-staging
git push dokku-staging scaffold/A-E:main
```

See `docs/deploy.md` for Docker verification, staging TLS, and production promotion steps.

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
