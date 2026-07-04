# Jamie Burkart Portfolio

A content-driven professional portfolio for Jamie Burkart, focused on technical project management, product operations, implementation, civic/public-interest technology, documentation, and source-backed team memory.

## Stack

- Next.js App Router
- React
- TypeScript
- MDX-ready content files
- Tailwind CSS
- daisyUI
- Node 26
- npm workspaces
- Dockerfile
- Dokku

## Local development

```bash
nvm use
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Typecheck and lint

```bash
npm run check
```

## Content

Work items live in `apps/site/src/content/work`.

## Add a work item

1. Create a new `.mdx` file in `apps/site/src/content/work`.
2. Add frontmatter that matches the work schema.
3. Add body content using the case-study template.
4. Run `npm run check`.
5. Confirm no private or sensitive material is included.

## Update resume

Replace `apps/site/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf` with the final approved PDF before launch.

## Public assets

Images live in `apps/site/public/images`. Use public-safe screenshots, redacted diagrams, recreated proof sheets, or approved images only.

## Deployment

This repo deploys to Dokku as app `jamieburk-art`.

```bash
git push dokku main:master
```

The production domain is:

```text
https://jamieburk.art
```

## Dokku setup notes

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
dokku ports:set jamieburk-art http:80:3000
```

If using the Dokku Let's Encrypt plugin:

```bash
dokku letsencrypt:set jamieburk-art email jamie.burkart@gmail.com
dokku letsencrypt:enable jamieburk-art
dokku letsencrypt:cron-job --add
```

## Privacy

Do not commit private documents, raw notes, client-sensitive material, health or financial information, private contact lists, unapproved photos, or raw transcripts.

When unsure, mark content:

```text
TODO: Jamie approval required.
```
