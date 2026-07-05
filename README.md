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

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output. Deploy to staging first, review there, then promote the same reviewed commit to production.

Staging target: <https://staging.jamieburk.art>

Production target: <https://jamieburk.art>

Dokku apps:

```text
jamieburk-art-staging
jamieburk-art
```

Domains:

```text
staging.jamieburk.art -> jamieburk-art-staging
jamieburk.art -> jamieburk-art
www.jamieburk.art -> jamieburk-art
```

Git remotes:

```bash
git remote add dokku-staging dokku@<DROPLET_HOST_OR_IP>:jamieburk-art-staging
git remote add dokku-production dokku@<DROPLET_HOST_OR_IP>:jamieburk-art
```

Deploy from the reviewed branch:

```bash
git push dokku-staging develop
git push dokku-production develop
```

If the deployment branch changes, document that branch here before deploying.

Staging setup:

```bash
dokku apps:create jamieburk-art-staging
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku ports:set jamieburk-art-staging http:80:3000
dokku config:set jamieburk-art-staging \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_SITE_ENV=staging \
  NEXT_TELEMETRY_DISABLED=1
```

After DNS resolves:

```bash
dokku letsencrypt:enable jamieburk-art-staging
```

Production setup, after staging review:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku ports:set jamieburk-art http:80:3000
dokku config:set jamieburk-art \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_SITE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1
```

After DNS resolves:

```bash
dokku letsencrypt:enable jamieburk-art
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.
Do not set a custom `PORT` unless needed.

## Runtime

Node 26 is the requested target runtime for this project. If a dependency or Dokku build issue blocks launch before Node 26 is stable in this environment, temporarily switch to Node 24 LTS and return to Node 26 after compatibility is stable.

## Environment

Use these variables to set canonical URLs and indexing behavior:

```bash
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_SITE_ENV=staging
```

```bash
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_ENV=production
```

Staging sets robots to disallow indexing and emits noindex/nofollow metadata. This is not privacy; private material must not be committed or deployed.

## Typography

The site uses safe Google Fonts through `next/font/google`:

- Karla for body, UI, navigation, cards, case-study text, and metadata.
- Oswald for display labels, proof-strip copy, and selected section labels.

Do not commit proprietary or private fonts, including Trade Gothic, Verlag, Gotham Rounded, Maria handwriting fonts, commercial webfont files, or private font files.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Do not publish private contact lists, legal review notes, internal campaign strategy, raw residency records, private analytics dashboards, or private revenue specifics.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`

## Resume PDF

The staging scaffold may include a placeholder PDF at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.

Before production, replace that file with the current approved resume PDF and verify the `/resume` page download.

## Launch Inputs Still Needed

- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
- Jamie approval for final metrics, exact public claims, screenshots/artifacts, homepage wording, and production launch.
