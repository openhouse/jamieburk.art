# Jamie Burkart Portfolio

A content-driven professional portfolio for Jamie Burkart, focused on technical project management, product operations, implementation, civic/public-interest technology, documentation, and source-backed team memory.

## Stack

- Next.js App Router
- React
- TypeScript
- MDX
- Tailwind CSS
- daisyUI
- Node 26 via nvm
- Dockerfile-based Dokku deployment

## Local Development

```bash
nvm use
npm ci
npm run dev
```

## Build

```bash
npm run check
```

## Content

Case studies live in `apps/web/src/content/work`.

## Add a Work Item

1. Create a new `.mdx` file in `apps/web/src/content/work`.
2. Add frontmatter matching `WorkMeta`.
3. Use the case-study template.
4. Add public-safety notes for sensitive work.
5. Run `npm run check`.

## Update Resume

Replace `apps/web/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.

## Deploy

Initial Dokku setup:

```bash
dokku apps:create jamieburk-art
dokku builder-dockerfile:set jamieburk-art dockerfile-path .dokku/Dockerfile
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
```

Deploy:

```bash
git remote add dokku dokku@<droplet-ip-or-host>:jamieburk-art
git push dokku main
```

## Privacy

Do not commit private documents, raw notes, client-sensitive material, health or financial information, private correspondence, unapproved names, unapproved photos, credentials, private coalition records, or private residency records.

When unsure, mark:

```text
TODO: Jamie approval required before publishing this detail.
```

