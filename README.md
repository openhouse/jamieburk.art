# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager -
Product Operations & Implementation.

The site should make this believable: Jamie turns under-structured work into
usable systems. Plainly: Jamie helps teams surface the structure inside emerging
work, translate between technical and nontechnical audiences, coordinate
stakeholders, document decisions, and leave behind workflows, launch support,
onboarding materials, and handoffs people can use.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, npm
workspaces, Docker, and Dokku. The canonical app is `apps/www`.

## Local Development

```bash
nvm install
nvm use
npm ci
npm run dev
```

Use `.env.example` for local environment defaults.

## Checks

```bash
npm run typecheck
npm run lint
npm run public-safety
npm run check:routes
npm run build
npm run preflight:staging
npm run check
```

## Environment

Staging is the first deployment target and is non-indexable by default:

```bash
APP_ENV=staging
SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=noindex
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0
```

Production should only be enabled after staging review:

```bash
APP_ENV=production
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=noindex
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0
```

Production indexing is explicit opt-in. Missing, staging, malformed, or
non-`index` robots policy resolves to noindex. Change
`NEXT_PUBLIC_ROBOTS_POLICY=index` only after final indexing approval.

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone
output.

Staging first:

```txt
jamieburk-art-staging -> staging.jamieburk.art
```

Production later:

```txt
jamieburk-art -> jamieburk.art
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to the
container. See `docs/deployment.md` for the staging and production command
drafts, Docker build args, and verification checklist.

## Typeface Policy

Use Karla for body/UI/prose text and Archivo Narrow for display headings,
section eyebrows, proof labels, and compact metadata. League Spartan and Oswald
are not part of V1. Do not commit or serve private, proprietary, or unlicensed
font files. See `docs/typefaces.md`.

## Proofs Bank

The public-safe claim system lives in `docs/proofs-bank/`.

- `docs/proofs-bank/README.md` explains the model.
- `docs/proofs-bank/claims.md` records defensible proof narratives.
- `docs/proofs-bank/sources.md` records claim wording, approval state, source
  basis, site surfaces, and boundaries.
- `docs/proofs-bank/projection-guide.md` defines how the website may project
  from the bank.
- `docs/chad-lens.md` records the professional-legibility rules.
- `docs/release-checklist.md` defines staging, referrer, production, indexing,
  and rollback gates.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- Update `docs/proofs-bank/sources.md` before strengthening
  public copy or moving a metric to a new page.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Blockers

- Replace placeholder resume PDF before production.
- Confirm public email.
- Confirm LinkedIn and GitHub links.
- Confirm screenshots/artifacts.
- Confirm exact proof metrics against `docs/proofs-bank/`.
- Confirm collaborator names, photos, and quotes.
- Confirm staging noindex behavior.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm no private/proprietary fonts are committed or served.
