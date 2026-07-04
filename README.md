# Jamie Burkart Portfolio

Portfolio site for Jamie Burkart, Technical Project Manager - Product Operations & Implementation.

## Stack

- Next.js App Router
- React
- TypeScript
- MDX
- Tailwind CSS
- daisyUI
- Node 26
- npm workspaces
- Dockerfile deployment to Dokku

## Local Development

```bash
nvm install
nvm use
npm install
npm run dev
```

## Build

```bash
npm run typecheck
npm run build
```

## Run Production Locally

```bash
PORT=3000 npm run start
```

## Content

Structured work data currently lives in:

```text
apps/web/src/content/work-data.ts
```

Editable MDX drafts live in:

```text
apps/web/src/content/work
```

## Add A Work Item

1. Create a new `.mdx` file in `apps/web/src/content/work`.
2. Add frontmatter using the existing files as a model.
3. Add or update the matching typed entry in `apps/web/src/content/work-data.ts`.
4. Use the case-study sections: context, what was unclear, what became usable, outcomes, proof, and public-safety notes.

## Deployment

Production deploys to Dokku from the repository root.

```bash
git push dokku main
```

Target domain:

```text
https://jamieburk.art
```

## Privacy

Do not commit private documents, raw notes, client-sensitive material, health or financial information, legal-review materials, unapproved names, unapproved photos, private fonts, or credentials.

When unsure, mark:

```text
TODO: Jamie approval required.
```
