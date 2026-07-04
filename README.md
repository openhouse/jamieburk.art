# jamieburk.art

Portfolio site for Jamie Burkart.

## Stack

- Next.js App Router
- React
- TypeScript
- MDX
- Tailwind CSS
- daisyUI
- Node 26
- Dockerfile deploy to Dokku

## Local development

```bash
nvm install
nvm use
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build

```bash
npm run build
```

## Typecheck

```bash
npm run typecheck
```

## Deploy

Push the monorepo root to Dokku:

```bash
git push dokku main
```

Production URL:

```text
https://jamieburk.art
```

## Content

Work items live in typed data for the first scaffold:

```text
apps/web/src/data/work.ts
```

MDX draft files are reserved for the next content pass:

```text
apps/web/src/content/work
```

## Privacy

Do not commit private documents, raw notes, client-sensitive material, health or financial information, private contact lists, private coalition materials, unapproved photos, credentials, or private fonts.

When unsure, mark:

```text
TODO: Jamie approval required.
```
