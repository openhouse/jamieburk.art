# Jamie Burkart Portfolio

A content-driven professional portfolio for Jamie Burkart, focused on technical project management, product operations, implementation, civic/public-interest technology, documentation, and source-backed team memory.

## Stack

Next.js App Router / React / TypeScript / MDX / Tailwind CSS / daisyUI / Node 26 / Dokku.

## Node Version

Use Node 26.

```bash
nvm install
nvm use
node -v
```

Note: Node 26 enters LTS in October 2026. This repo uses Node 26 because it is the requested 2026/2027 runtime target.

## Local Development

```bash
npm ci
npm run dev
```

## Build

```bash
npm run check
npm run build
```

## Content

Work items live in `apps/site/src/content/work` as MDX files. Lab notes live in `apps/site/src/content/lab`.

## Add A Work Item

1. Create a new `.mdx` file in `apps/site/src/content/work`.
2. Export a `metadata` object with the required fields.
3. Use the case-study body pattern already present in the existing files.
4. Set `contentState` and `visibility`.
5. Add public-safety notes for sensitive work.

## Update Resume

Replace `apps/site/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.

## Privacy

Do not commit private documents, raw notes, client-sensitive material, health/financial information, private contact lists, credentials, legal-review materials, unapproved names, or unapproved photos.

When unsure, mark:

```text
TODO: Jamie approval required.
```

## Deployment

The site deploys to Dokku using the root `Dockerfile`.

```bash
git remote add dokku dokku@YOUR_SERVER:jamieburk-art
git push dokku main
```

Suggested Dokku setup:

```bash
dokku apps:create jamieburk-art
dokku config:set jamieburk-art NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_SITE_URL=https://jamieburk.art
dokku proxy:ports-set jamieburk-art http:80:3000
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
```
