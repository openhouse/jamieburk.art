# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, Docker, Dokku.

## Local Development

```bash
nvm install
nvm use
corepack enable
pnpm install
pnpm dev
```

## Checks

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm check
docker build -t jamieburk-art .
docker run --rm -p 3000:3000 jamieburk-art
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output.

Production target: <https://jamieburk.art>
Dokku app: `jamieburk-art`
Runtime: Node 26

One-time Dokku remote setup:

```bash
git remote add dokku dokku@[DROPLET_HOST_OR_IP]:jamieburk-art
```

Normal deploy from `develop` after one-time Dokku setup:

```bash
git push dokku develop:main
```

Or, if deploying from `main`:

```bash
git push dokku main
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`
- Do not commit private fonts or private source materials.

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
