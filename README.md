# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager -- Product Operations & Implementation.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, Docker, Dokku.

## Node

Use Node 26:

```bash
nvm install
nvm use
node --version
```

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Production Docker build

```bash
docker build -t jamieburk-art .
docker run --rm -p 3000:3000 jamieburk-art
```

## Deploy to Dokku

```bash
git remote add dokku dokku@<droplet-ip-or-host>:jamieburk-art
git push dokku main
```

On the droplet:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
dokku letsencrypt:set jamieburk-art email <approved-email>
dokku letsencrypt:enable jamieburk-art
```

## Content

Work items live in `apps/web/content/work`.

Case studies are MDX files with exported metadata. Public pages should answer what was unclear, what became usable, and what is known, open, and protected.

## Privacy

Do not commit private documents, raw notes, private coalition materials, private correspondence, unapproved images, health/financial details, credentials, or font files that cannot be publicly distributed.

When a detail needs approval, keep it public-safe and mark the next decision in the content or page copy.
