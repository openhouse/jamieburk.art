# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Purpose

This site helps hiring managers, recruiters, referrers, and collaborators understand how Jamie turns under-structured work into usable systems: requirements, workflows, documentation, decision trails, launch support, onboarding, and durable handoffs.

## Stack

- npm workspaces monorepo
- Next.js App Router
- React
- TypeScript
- MDX content files
- Tailwind CSS
- daisyUI
- Node 26 via nvm and Docker
- Dokku deployment to DigitalOcean

## Local Development

Use Node 26:

```bash
nvm install 26
nvm use
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Check

```bash
npm run check
```

## Content

Work items live in `apps/web/src/content/work`.

## Add A Work Item

1. Create a new `.mdx` file in `apps/web/src/content/work`.
2. Add frontmatter using the WorkItem schema.
3. Use the case-study template.
4. Include Known / Open / Protected.
5. Add a public-safety note if any material is sensitive.

## Update Resume

Replace the PDF in `apps/web/public/resume` with the current approved resume PDF.

## Privacy

Do not commit private documents, raw notes, client-sensitive material, health or financial information, private correspondence, unapproved names, or unapproved photos.

## Deployment

Production deploys by pushing to Dokku:

```bash
git push dokku main
```

Expected domain:

```text
https://jamieburk.art
```
