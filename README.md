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
- npm workspaces
- Dockerfile deployment to Dokku

## Local Development

```bash
nvm use
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Production

The site deploys to Dokku from the root monorepo.

```bash
git push dokku main
```

Production target: `https://jamieburk.art`

## Content

Work items live in `apps/web/src/content/work` as public-safe MDX files with frontmatter.

To add a work item:

1. Create a new `.mdx` file.
2. Add frontmatter matching the content model.
3. Use the case-study grammar: what was unclear, what became usable, what this proves.
4. Set `contentState` and `privacyLevel`.
5. Add public-safety notes for sensitive work.

## Public-Safety Rule

Do not publish private documents, raw notes, client-sensitive material, private coalition notes, health or financial information, legal-review materials, unapproved names, unapproved photos, credentials, or raw transcripts.

When unsure, mark `TODO: Jamie approval required` or use `Selected public-safe materials available on request`.
