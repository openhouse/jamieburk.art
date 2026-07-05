# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

The current app lives at `apps/www`. Keep that path canonical for this scaffold unless there is a concrete build or deployment reason to move it.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, Docker, Dokku.

## Local Development

```bash
nvm install
nvm use
npm ci
npm run dev
```

Use `.env.example` as the local environment shape:

```bash
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEPLOY_ENV=development
```

## Checks

```bash
npm run typecheck
npm run lint
npm run build
npm run check:public-safety
npm run check
```

`npm run check:public-safety` blocks committed private env/key-like files in every environment. It warns on staging/development for launch placeholders and fails production when source content still includes public-approval markers such as `TODO: Jamie approval required`.

To test the production gate locally:

```bash
NEXT_PUBLIC_DEPLOY_ENV=production npm run check:public-safety
```

## Docker

The repo uses the root `Dockerfile` and Next.js standalone output.

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  --build-arg NEXT_PUBLIC_DEPLOY_ENV=staging \
  -t jamieburk-art:scaffold-a .
docker run --rm -p 3000:3000 -e PORT=3000 jamieburk-art:scaffold-a
```

Then verify:

- <http://localhost:3000>
- <http://localhost:3000/api/health>

The app serves on `PORT`, defaulting to `3000`, so Dokku can provide the runtime port.

Pass the same public env values at build time and runtime for the target environment. Static metadata is generated during `next build`; runtime routes such as `/robots.txt`, `/sitemap.xml`, and `/api/health` also read these values when the server starts.

## Deployment

Deploy to staging first. Do not production-deploy until Jamie has reviewed role clarity, public safety, contact info, resume replacement, screenshots/artifacts, and remaining placeholders.

Staging app:

```bash
dokku apps:create jamieburk-art-staging
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku config:set jamieburk-art-staging \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_DEPLOY_ENV=staging
dokku letsencrypt:enable jamieburk-art-staging
```

Production app:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_DEPLOY_ENV=production
dokku letsencrypt:enable jamieburk-art
```

Local deploy remote example:

```bash
git remote add dokku-staging dokku@<droplet-host-or-ip>:jamieburk-art-staging
git push dokku-staging scaffold/A-O:main
```

Staging uses `NEXT_PUBLIC_DEPLOY_ENV=staging`, which disallows crawling in `robots.txt` and adds `X-Robots-Tag: noindex, nofollow`.

Production uses `NEXT_PUBLIC_DEPLOY_ENV=production`, which allows crawling and emits the sitemap URL from `NEXT_PUBLIC_SITE_URL`.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, credentials, customer data, private analytics dashboards, stakeholder lists, or legal-review materials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to, helped structure, public-safe summary, archived prototype, and not an official current service.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Blockers

Before production, Jamie must supply or approve:

- Public email address.
- LinkedIn URL.
- Public-ready GitHub URL.
- Current resume PDF to replace `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE.
- Public-safe screenshots or artifacts for FairRentNYC / CRS.
- CallNYC archive, citation, or screenshot approach.
- Final decision on whether Source-Backed Team Memory is indexed publicly.

## Production Promotion Checklist

- `npm ci` succeeds.
- `npm run typecheck` succeeds.
- `npm run lint` succeeds.
- `npm run build` succeeds.
- `NEXT_PUBLIC_DEPLOY_ENV=production npm run check:public-safety` succeeds.
- Docker image builds and serves `/` and `/api/health`.
- Staging has been reviewed at <https://staging.jamieburk.art>.
- Public contact, resume, and approved artifacts are no longer placeholders.
