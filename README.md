# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, Docker, Dokku.

## Local Development

```bash
nvm install
nvm use
npm install
npm run dev
```

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output. Deploy to staging first, review the public surface, then promote the same commit to production.

Staging app: `jamieburk-art-staging`

Staging domain: <https://staging.jamieburk.art>

Production app: `jamieburk-art`

Production domains: <https://jamieburk.art> and <https://www.jamieburk.art>

Staging deploy:

```bash
git push dokku-staging HEAD:main
```

Production deploy, after staging approval:

```bash
git push dokku-production HEAD:main
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

See `docs/deployment-dokku.md` for Dokku app setup, domains, config, TLS, and remotes.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Inputs Still Needed

- Launch blocker: replace the placeholder resume PDF at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf` with Jamie's approved current resume before production.
- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
