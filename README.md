# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

Core sentence: Jamie turns under-structured work into usable systems.

Support sentence: Jamie creates operating structure for complex public-facing teams.

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
npm run check
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output. The first deployment target is staging.

Staging domain: <https://staging.jamieburk.art>

Production domain, after staging review: <https://jamieburk.art>

```bash
APP_ENV=staging
SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
```

Staging is reviewable but not indexable: robots disallow crawling, page metadata uses noindex/nofollow, and canonical URLs point to the staging domain. Production enables indexing only when `APP_ENV=production` or `SITE_URL=https://jamieburk.art`.

See [docs/deployment.md](docs/deployment.md) for Dokku staging and production commands.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`
- Keep Known / Open / Protected where it already exists.

See [docs/content-safety.md](docs/content-safety.md) for project-specific public-safety rules.

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
- Approval for exact public impact metrics.
- Approval for collaborator names, photos, or specific quotes.
- DNS access, Dokku droplet details, and approved Let's Encrypt email.
- Confirmation of whether `www.jamieburk.art` should redirect to apex or serve separately.
