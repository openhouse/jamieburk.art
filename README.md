# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Stack

- Next.js App Router
- React
- TypeScript
- MDX
- Tailwind CSS
- daisyUI
- Node 26
- Docker
- Dokku

## Local Development

```bash
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

Node 26 is the requested runtime for this scaffold. Revisit the runtime when Node 26 enters or passes its next LTS phase.

## Content

Work items live in `apps/site/src/content/work` with public-safe frontmatter and MDX body copy.

## Add A Work Item

1. Create a new `.mdx` file in `apps/site/src/content/work`.
2. Add the required frontmatter.
3. Use the case-study template structure.
4. Include public-safety notes where needed.
5. Set status and visibility honestly.

## Update Resume

Replace:

```text
apps/site/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
```

The checked-in file is a placeholder until the approved PDF is supplied.

## Deployment

This repo deploys to Dokku through the included Dockerfile.

```bash
git remote add dokku dokku@[DROPLET_IP_OR_HOST]:jamieburk-art
git push dokku main
```

The app should serve:

```text
https://jamieburk.art
```

See `dokku.md` for the full server checklist.

## Privacy

Do not commit private documents, raw notes, client-sensitive material, health or financial information, legal-review materials, private correspondence, unapproved names, unapproved photos, or credentials.

When uncertain, mark:

```text
TODO: Jamie approval required before publishing this detail.
```
