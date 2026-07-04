# Jamie Burkart Portfolio

A content-driven professional portfolio for Jamie Burkart, focused on technical project management, product operations, implementation, civic/public-interest technology, documentation, and source-backed team memory.

## Stack

Next.js App Router / React / TypeScript / MDX / Tailwind CSS / daisyUI / Node 26 / pnpm workspaces.

## Local development

Use Node 26:

```bash
nvm use
corepack enable
pnpm install
pnpm dev
```

The app runs from `apps/web` and is served locally through the root `pnpm dev` script.

## Build

```bash
pnpm build
```

## Check

```bash
pnpm check
```

## Docker build

```bash
docker build -t jamie-burkart-portfolio .
docker run --rm -p 3000:3000 jamie-burkart-portfolio
```

## Content

Work items live in `apps/web/content/work`. The rendered route data currently lives in `apps/web/lib/work.ts` so the scaffold is static-first and easy to review.

## Add a work item

1. Create a new `.mdx` file in `apps/web/content/work`.
2. Add public-safe frontmatter and body content using the case-study template.
3. Add or update the matching item in `apps/web/lib/work.ts`.
4. Run `pnpm check`.

## Update resume

Replace `apps/web/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf` with the current public-safe resume PDF.

## Deployment

The Dokku app is expected to be `jamieburk-art`.

```bash
git remote add dokku dokku@[DROPLET_HOST_OR_IP]:jamieburk-art
git push dokku main
```

Production domain:

```text
https://jamieburk.art
```

## Privacy

Do not commit private documents, raw notes, client-sensitive material, health/financial information, private contact lists, unapproved photos, private transcripts, credentials, private coalition notes, legal-review materials, raw residency records, or internal analytics.

When unsure, mark content:

```text
TODO: Jamie approval required.
```
