# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, Docker, and Dokku.

This repo currently uses `apps/www`, npm, `package-lock.json`, and Next.js standalone output. Keep those conventions for the first staging pass.

Node 26 is the requested target runtime for this project. If a dependency or Dokku build issue blocks launch before Node 26 is stable in this environment, temporarily switch to Node 24 LTS and return to Node 26 after compatibility is stable.

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

## Environment

Set these values per deploy target:

```bash
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_SITE_ENV=staging
NEXT_TELEMETRY_DISABLED=1
```

Production should use:

```bash
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

`NEXT_PUBLIC_SITE_ENV=staging` disallows all crawlers in `robots.txt` and adds `noindex, nofollow` metadata. This is only indexing protection; do not put private material into staging.

## Staging-First Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output. Staging should be reviewed before production.

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

Deploy staging first:

```bash
git push dokku-staging develop
```

Deploy production only after staging review:

```bash
git push dokku-production develop
```

If the deployment branch changes from `develop`, document that before deploying.

### Staging Dokku Setup

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

### Production Dokku Setup

Only after Jamie reviews staging:

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

Do not set a custom `PORT` unless needed. The Dockerfile expects the app to run internally on `3000`.

## Docker Verification

```bash
docker build -t jamie-portfolio .
docker run --rm -p 3000:3000 jamie-portfolio
curl http://localhost:3000/api/health
```

After Dokku staging deploy:

```bash
curl -I https://staging.jamieburk.art
curl https://staging.jamieburk.art/api/health
```

## Typography

The site uses safe Google Fonts through `next/font/google`:

- Karla for body text, navigation, case studies, cards, buttons, metadata, and public-safety notes.
- Oswald for restrained display moments such as eyebrow labels, proof-strip labels, and selected section labels.

Do not include or commit Trade Gothic, Verlag, Gotham Rounded, Maria handwriting font, private font files, or commercial webfont files.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Do not publish private contact lists, legal review notes, internal campaign strategy, raw residency records, private analytics dashboards, private revenue specifics, or unapproved screenshots/artifacts.
- Use public-safe summaries, redacted screenshots, representative diagrams, approved public artifacts, careful collective-work language, and `TODO: Jamie approval required`.
- Use precise collective-work verbs: co-built, stewarded, supported, contributed to, helped structure, translated, coordinated, and maintained.
- When uncertain, mark: `TODO: Jamie approval required.`

Sensitive case studies should keep Known / Open / Protected, care note / limits, source layer, and public-safety note sections.

## Resume PDF

The staging site may keep the placeholder resume PDF:

```text
apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
```

Production must replace it with the current approved resume PDF before launch. Keep the same filename unless code references are updated.

## Launch Inputs Still Needed

- Jamie approval of the public email currently set to `jamie.burkart@gmail.com`.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
- Approval for public metric wording and any exact claims.
- Staging review for factual accuracy, privacy, public-safety, metrics, artifacts, mobile readability, and type hierarchy.
