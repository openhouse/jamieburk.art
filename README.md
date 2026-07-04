# Jamie Burkart Portfolio

A Next.js, TypeScript, and MDX portfolio site for Jamie Burkart.

## Stack

- Next.js App Router
- React
- TypeScript
- MDX
- Tailwind CSS
- daisyUI
- pnpm workspaces
- Node 26 via nvm
- Dockerfile deployment
- Dokku on DigitalOcean

## Local Setup

```bash
nvm install
nvm use
corepack enable
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Check

```bash
pnpm check
```

## Deploy

```bash
git remote add dokku dokku@[DROPLET_IP]:jamieburk-art
git push dokku main
```

## Dokku Domain

```bash
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
```

## Dokku Runtime

```bash
dokku builder:set jamieburk-art selected dockerfile
dokku proxy:ports-set jamieburk-art http:80:3000
dokku config:set jamieburk-art NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_SITE_URL=https://jamieburk.art
```

## Content

Work items live in:

```text
apps/site/content/work
```

Lab pages live in:

```text
apps/site/content/lab
```

## Add A Work Item

1. Create a new `.mdx` file.
2. Add typed frontmatter.
3. Use the case-study template.
4. Mark sensitive drafts clearly.
5. Run `pnpm check`.

## Privacy

Do not commit private documents, raw notes, client-sensitive material, health or financial information, photos without permission, private coalition materials, credentials, or raw transcripts.

## Deployment Notes

The root Dockerfile builds `apps/site` and runs the Next standalone server on `$PORT`.

Node 26 is the requested target. As of July 2026, it is the current even-numbered line and scheduled to become Active LTS in October 2026. Re-check the Node release schedule before any long-lived production lock.
