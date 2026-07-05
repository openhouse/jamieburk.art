# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, Docker, Dokku.

## Local Development

```bash
nvm install
nvm use
npm ci
npm run dev
```

Copy `.env.example` to `.env.local` when local environment values are needed.

## Checks

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run check
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output.

Staging target: <https://staging.jamieburk.art>

Production target: <https://jamieburk.art>

### Environment

```bash
NEXT_PUBLIC_SITE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_INDEXING=false

NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_CONTACT_EMAIL_LABEL=Email Jamie
NEXT_PUBLIC_LINKEDIN_URL=
NEXT_PUBLIC_GITHUB_URL=
```

Staging must remain noindexed. Production indexing should stay disabled until Jamie approves launch.

### One-time Dokku setup

```bash
dokku apps:create jamieburk-art-staging
dokku apps:create jamieburk-art

dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art

dokku config:set jamieburk-art-staging \
  NEXT_PUBLIC_SITE_ENV=staging \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_ENABLE_INDEXING=false

dokku config:set jamieburk-art \
  NEXT_PUBLIC_SITE_ENV=production \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_ENABLE_INDEXING=false
```

### Local deploy remotes

```bash
git remote add dokku-staging dokku@YOUR_DROPLET_HOST:jamieburk-art-staging
git remote add dokku-production dokku@YOUR_DROPLET_HOST:jamieburk-art
```

### Deploy staging

```bash
git push dokku-staging HEAD:main
curl -i https://staging.jamieburk.art/api/health
```

If the Dokku Dockerfile builder does not expose config vars during image build,
also pass matching `NEXT_PUBLIC_*` values as Docker build args in the Dokku host
configuration so generated metadata, sitemap, robots, and headers match the
target domain.

### Deploy production after approval

```bash
git push dokku-production HEAD:main
curl -i https://jamieburk.art/api/health
dokku config:set jamieburk-art NEXT_PUBLIC_ENABLE_INDEXING=true
```

### SSL

If the Dokku Let's Encrypt plugin is installed:

```bash
dokku letsencrypt:enable jamieburk-art-staging
dokku letsencrypt:enable jamieburk-art
dokku letsencrypt:cron-job --add
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

### Local Docker check

```bash
docker build -t jamieburk-art:local .
docker run --rm -p 3000:3000 jamieburk-art:local
curl -i http://localhost:3000/api/health
```

To build a staging-flavored image locally:

```bash
docker build -t jamieburk-art:staging \
  --build-arg NEXT_PUBLIC_SITE_ENV=staging \
  --build-arg NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  --build-arg NEXT_PUBLIC_ENABLE_INDEXING=false \
  .
```

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, keep material private or mark it for Jamie review outside public UI.

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
- Claim review for revenue growth, campaign-memory page count, city ecosystem reach, gathering and resident-artist counts, public funding recommendations, and press citations.
