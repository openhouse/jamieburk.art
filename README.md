# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Stack

Primary app path: `apps/www`.

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, npm workspaces, root Dockerfile, Dokku.

## Environment

Copy `.env.example` for local/staging defaults:

```bash
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
SITE_INDEXABLE=false
NEXT_TELEMETRY_DISABLED=1
```

Use `SITE_INDEXABLE=false` for staging so `robots.txt` disallows indexing and page metadata emits `noindex,nofollow`. Use `SITE_INDEXABLE=true` only for the approved production release.

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

## Docker

```bash
docker build -t jamieburk-art:scaffold-a .
docker run --rm -p 3000:3000 jamieburk-art:scaffold-a
```

Then check:

- <http://localhost:3000>
- <http://localhost:3000/api/health>
- <http://localhost:3000/work>
- <http://localhost:3000/work/technical-operations>
- <http://localhost:3000/resume>
- <http://localhost:3000/contact>
- <http://localhost:3000/colophon>
- <http://localhost:3000/robots.txt>
- <http://localhost:3000/sitemap.xml>

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output. The app serves on port `3000`; Dokku/nginx should proxy public domains to that container.

`app.json` keeps the production app name for platform metadata. Dokku app names and domains are set explicitly below.

### Staging First

Deploy staging before production:

```text
jamieburk-art-staging -> staging.jamieburk.art
```

On the Dokku host:

```bash
dokku apps:create jamieburk-art-staging
dokku builder:set jamieburk-art-staging selected dockerfile
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku config:set jamieburk-art-staging \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  SITE_INDEXABLE=false \
  PORT=3000 \
  HOSTNAME=0.0.0.0
dokku proxy:ports-set jamieburk-art-staging http:80:3000
```

Local remote:

```bash
git remote add dokku-staging dokku@YOUR_DROPLET_HOST_OR_IP:jamieburk-art-staging
git push dokku-staging scaffold/A+B:main
```

Enable TLS once DNS points correctly:

```bash
dokku letsencrypt:set jamieburk-art-staging email YOUR_EMAIL@example.com
dokku letsencrypt:enable jamieburk-art-staging
```

### Production After Jamie Approves Staging

```text
jamieburk-art -> jamieburk.art / www.jamieburk.art
```

On the Dokku host:

```bash
dokku apps:create jamieburk-art
dokku builder:set jamieburk-art selected dockerfile
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  SITE_INDEXABLE=true \
  PORT=3000 \
  HOSTNAME=0.0.0.0
dokku proxy:ports-set jamieburk-art http:80:3000
```

Local remote:

```bash
git remote add dokku-production dokku@YOUR_DROPLET_HOST_OR_IP:jamieburk-art
git push dokku-production main
```

Enable TLS:

```bash
dokku letsencrypt:set jamieburk-art email YOUR_EMAIL@example.com
dokku letsencrypt:enable jamieburk-art
```

If either app was previously buildpack-deployed, clear or verify ports before relying on Dockerfile ports:

```bash
dokku ports:clear jamieburk-art-staging
dokku ports:clear jamieburk-art
```

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`
- Do not commit private or proprietary font files.

## Typefaces

V1 ships with safe web typefaces loaded through `next/font/google`:

- Karla for body/UI/prose.
- Archivo Narrow for display/headings/eyebrows/proof labels.

See `docs/typefaces.md` before changing font policy.

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
