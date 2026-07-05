# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

Deploy to staging first. Do not push production until staging passes QA.

## Stack

- Next.js App Router
- React
- TypeScript
- MDX
- Tailwind CSS
- daisyUI
- Node 26
- Docker
- Dokku
- npm workspaces

The app workspace is `apps/www` and the package name is `@jamie-burkart/www`.

## Local Development

```bash
nvm install
nvm use
npm ci
npm run dev
```

Local default URL: <http://localhost:3000>

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

Run the full local gate before opening a deploy PR:

```bash
npm run check
```

## Docker Local Smoke Test

Build the production image from the repo root:

```bash
docker build -t jamieburk-art .
```

Run it with staging-safe local indexing rules:

```bash
docker run --rm -p 3000:3000 \
  -e PORT=3000 \
  -e HOSTNAME=0.0.0.0 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  -e NEXT_PUBLIC_ALLOW_INDEXING=false \
  -e NEXT_PUBLIC_ENVIRONMENT=local-docker \
  jamieburk-art
```

Then check the health route:

```bash
curl -i http://localhost:3000/api/health
```

Expected JSON shape:

```json
{
  "ok": true,
  "service": "jamie-portfolio",
  "environment": "local-docker"
}
```

## Environment Variables

Staging:

```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_ENVIRONMENT=staging
NEXT_PUBLIC_ALLOW_INDEXING=false
```

Production:

```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_ALLOW_INDEXING=true
```

`NEXT_PUBLIC_SITE_URL` drives metadata, canonical URLs, Open Graph URLs, and the sitemap. `NEXT_PUBLIC_ALLOW_INDEXING=false` makes `robots.txt` disallow all crawlers and omits the sitemap URL from robots output.

## Dokku Staging Setup

Use a dedicated staging app:

```bash
dokku apps:create jamieburk-art-staging
dokku domains:set jamieburk-art-staging staging.jamieburk.art

dokku config:set jamieburk-art-staging \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_ENVIRONMENT=staging \
  NEXT_PUBLIC_ALLOW_INDEXING=false
```

Add the local staging remote:

```bash
git remote add staging dokku@[DROPLET_HOST_OR_IP]:jamieburk-art-staging
```

Deploy staging:

```bash
git push staging develop:main
```

If the Dokku app is configured to accept the pushed branch name directly, use:

```bash
git push staging develop
```

After staging responds over HTTP, enable TLS:

```bash
dokku letsencrypt:set jamieburk-art-staging email jamie.burkart@gmail.com
dokku letsencrypt:enable jamieburk-art-staging
```

Staging acceptance:

- `https://staging.jamieburk.art` loads.
- `https://staging.jamieburk.art/api/health` returns `200`.
- `robots.txt` disallows indexing.
- Metadata and sitemap URLs use `https://staging.jamieburk.art`.

## Dokku Production Setup

Use a separate production app:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art

dokku config:set jamieburk-art \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_ENVIRONMENT=production \
  NEXT_PUBLIC_ALLOW_INDEXING=true
```

Add the local production remote:

```bash
git remote add production dokku@[DROPLET_HOST_OR_IP]:jamieburk-art
```

Deploy production only after staging passes QA:

```bash
git push production develop:main
```

After production responds over HTTP, enable TLS:

```bash
dokku letsencrypt:set jamieburk-art email jamie.burkart@gmail.com
dokku letsencrypt:enable jamieburk-art
```

Production acceptance:

- `https://jamieburk.art` and `https://www.jamieburk.art` load.
- `/api/health` returns `200`.
- `robots.txt` allows indexing.
- The sitemap and canonical URLs use `https://jamieburk.art`.
- Placeholder resume and launch TODOs are resolved or intentionally omitted.

## Content Rules

- This is a selected proof system, not a full archive, blog, art monograph, startup pitch, AI demo, CMS project, or personal memoir.
- Do not publish private emails, raw transcripts, private coalition notes, legal-review materials, health or financial details, trust / tax / banking details, private correspondence, stakeholder lists, unapproved photos, private fonts, credentials, `.env` files, private dashboards, client-sensitive materials, or raw guest / residency records.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: contributed to, helped structure, built and stewarded, supported, translated, co-built.
- When uncertain, mark: `TODO: Jamie approval required.`

## Public-Safety Rules

- HJE impact language should say `contributed to 2x revenue growth` unless Jamie approves a more specific claim.
- FairRentNYC / Commercial Rent Stabilization must use collective-work language and must not claim legal expertise or ownership of the campaign.
- CallNYC must remain clearly labeled: `Archived civic-data prototype. Not an official or current City Council service.`
- 196 / Sunday Dinner must not expose guest data, attendance records, addresses, private resident details, unapproved photos, or private community stories.
- Sensitive work should preserve the Known / Open / Protected framing.
- Do not ship unresolved TODOs to production unless the missing field is intentionally omitted.

## Launch Inputs Still Needed

- Dokku droplet hostname or IP.
- Confirmation that `jamieburk-art-staging` is the approved staging app name.
- Confirmation that `jamieburk-art` is the approved production app name.
- Approved public email address, or a decision to omit it.
- LinkedIn URL and public-ready GitHub URL, or a decision to omit them.
- Current approved resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`, or a decision to hide resume downloads before production.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, CallNYC, and other case-study pages.
- Decision on whether Source-Backed Team Memory remains visible in V1 or moves to V1.1.
