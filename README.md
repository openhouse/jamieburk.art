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

Local development defaults to the staging URL:

```txt
https://staging.jamieburk.art
```

Override with:

```bash
APP_ENV=production SITE_URL=https://jamieburk.art NEXT_PUBLIC_SITE_URL=https://jamieburk.art npm run build
```

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output.

Deploy and review staging first:

```txt
https://staging.jamieburk.art
```

Production comes later after review:

```txt
https://jamieburk.art
```

Staging is reviewable but not indexable. It emits staging canonical URLs, disallows crawlers in `robots.txt`, and sends `X-Robots-Tag: noindex, nofollow` when built with staging env.

See [docs/deployment.md](docs/deployment.md) for Dokku setup, Docker verification, build args, and production promotion notes.

Normal staging deploy after one-time Dokku setup:

```bash
git push staging HEAD:main
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, private client/community records, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`

See [docs/content-safety.md](docs/content-safety.md) for the fuller public-safety checklist.

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
