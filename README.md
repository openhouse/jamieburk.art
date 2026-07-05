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

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output.

Deploy to staging first:

```text
https://staging.jamieburk.art
```

Production is the eventual public target, but should not be deployed until the
staging build has been reviewed and approved:

```text
https://jamieburk.art
https://www.jamieburk.art
```

Recommended Dokku apps:

```text
jamieburk-art-staging
jamieburk-art
```

Staging app config:

```bash
dokku config:set jamieburk-art-staging \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_TELEMETRY_DISABLED=1 \
  JB_ENV=staging
```

Production app config:

```bash
dokku config:set jamieburk-art \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_TELEMETRY_DISABLED=1 \
  JB_ENV=production
```

Staging deploy after one-time Dokku setup:

```bash
git push dokku-staging <branch-name>:main
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

In staging, `robots.txt` disallows all crawling and the app sends
`X-Robots-Tag: noindex, nofollow`. Noindex is not privacy; do not put sensitive
material on staging or production.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health, therapy, family, trust, financial, or insurance details, private correspondence, private client materials, unapproved photos, private fonts, credentials, raw civic-campaign internal material, legal review notes, private stakeholder lists, private analytics dashboards, or unapproved screenshots.
- Use public-safe summaries, redacted screenshots, representative diagrams, approved public artifacts, and precise collective-work language.
- Use verbs like co-built, stewarded, supported, contributed to, helped structure, translated, documented, implemented, and maintained.
- Treat public metrics as pending approval until Jamie confirms, softens, or replaces them.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Inputs Still Needed

- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
