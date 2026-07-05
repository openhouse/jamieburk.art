# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, Docker, Dokku.

Canonical app path: `apps/web`

Canonical workspace package: `@jamieburkart/web`

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

Target domain: <https://jamieburk.art>

Normal deploy after one-time Dokku setup:

```bash
git push dokku main
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

See `docs/dokku.md` for the one-time Dokku app setup checklist.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/web/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
- Final approval for impact claims marked in the site with `TODO: Jamie approval required before launch.`
