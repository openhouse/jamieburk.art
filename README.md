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

Production target domain: <https://jamieburk.art>

See [docs/deployment.md](docs/deployment.md) for staging and production setup.

## Staging

Staging deploys to:

<https://staging.jamieburk.art>

Dokku app:

```text
jamieburk-art-staging
```

Suggested staging remote:

```bash
git remote add dokku-staging dokku@<dokku-host>:jamieburk-art-staging
git push dokku-staging HEAD:main
```

Suggested production remote:

```bash
git remote add dokku-production dokku@<dokku-host>:jamieburk-art
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, keep the material out of public pages and mark it as draft or pending in the content workflow.

See [docs/content-workflow.md](docs/content-workflow.md) for adding or updating work items.

## Launch Inputs Still Needed

- LinkedIn URL and public-ready GitHub URL, if Jamie wants them listed.
- Current approved resume PDF for `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
