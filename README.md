# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, npm workspaces, Docker, Dokku.

The web app lives at `apps/www`.

## Local Development

```bash
nvm install
nvm use
npm install
npm run dev
```

Create `.env.local` from `.env.example` for staging-like local behavior:

```bash
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_DEPLOY_ENV=staging
NEXT_PUBLIC_NOINDEX=true
NEXT_TELEMETRY_DISABLED=1
```

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Staging Deployment

This app deploys to Dokku using the root Dockerfile and Next.js standalone output. Staging is the first deployment target and must remain noindexed.

Staging target: <https://staging.jamieburk.art>

Expected Dokku app:

```text
jamieburk-art-staging
```

Expected staging config:

```bash
dokku config:set jamieburk-art-staging NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art NEXT_PUBLIC_DEPLOY_ENV=staging NEXT_PUBLIC_NOINDEX=true
dokku ports:set jamieburk-art-staging http:80:3000
```

Deploy a review branch to staging with:

```bash
git push dokku-staging scaffold/A-N:main
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container. Verify `/api/health` after deploy.

## Production Deployment

Do not deploy production until staging review is complete, the approved resume is present, public contact links are approved, public TODOs are removed, and noindex is disabled.

Production target: <https://jamieburk.art>

Expected production config:

```bash
dokku config:set jamieburk-art NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_SITE_URL=https://jamieburk.art NEXT_PUBLIC_DEPLOY_ENV=production NEXT_PUBLIC_NOINDEX=false
dokku ports:set jamieburk-art http:80:3000
```

## Content Rules

- Do not publish home address, birth date, private phone, private emails, raw transcripts, private coalition notes, health details, financial details, private correspondence, unapproved photos, private fonts, credentials, or API keys.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`
- Treat noindex as indexing guidance, not a security boundary.

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
