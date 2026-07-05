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

## Deploy Targets

Staging:

<https://staging.jamieburk.art>

Production:

<https://jamieburk.art>
<https://www.jamieburk.art>

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output.

## Environment Variables

Local defaults are documented in `.env.example`.

```bash
# staging
dokku config:set jamieburk-art-staging \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
  NEXT_PUBLIC_ENVIRONMENT=staging \
  NEXT_PUBLIC_ALLOW_INDEXING=false

# production
dokku config:set jamieburk-art \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  NEXT_PUBLIC_ENVIRONMENT=production \
  NEXT_PUBLIC_ALLOW_INDEXING=true
```

## Deployment

Add remotes after the Dokku apps exist:

```bash
git remote add staging dokku@[DROPLET_HOST_OR_IP]:jamieburk-art-staging
git remote add production dokku@[DROPLET_HOST_OR_IP]:jamieburk-art
```

Deploy staging first:

```bash
git push staging develop:main
```

Deploy production only after staging QA passes:

```bash
git push production develop:main
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

Do not deploy production until staging passes QA and placeholder resume/contact fields are resolved.

Useful Dokku checks:

```bash
dokku logs jamieburk-art-staging -t
dokku ps:report jamieburk-art-staging
dokku releases jamieburk-art-staging

dokku logs jamieburk-art -t
dokku ps:report jamieburk-art
dokku releases jamieburk-art
```

DNS required:

```text
A     staging    [DROPLET_IPV4]
A     @          [DROPLET_IPV4]
A     www        [DROPLET_IPV4]
```

If IPv6 is configured:

```text
AAAA  staging    [DROPLET_IPV6]
AAAA  @          [DROPLET_IPV6]
AAAA  www        [DROPLET_IPV6]
```

Do not enable Let's Encrypt until DNS resolves and the app is reachable over HTTP.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
