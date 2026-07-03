# Jamie Burkart Portfolio V1

A first deployable portfolio for Jamie Burkart: Technical Project Manager — Product Operations & Implementation.

## Stack
- Next.js App Router, React, TypeScript
- MDX case studies with `@next/mdx`, `remark-gfm`, `gray-matter`, and `zod`
- Tailwind CSS and daisyUI theme `jamie`
- Node 26, npm workspaces
- Dockerfile-based Dokku deployment

## Local development
```bash
nvm use
npm install
npm run dev
npm run check
npm run build
```

The public web app lives in `apps/web`.

## Content editing
Case studies live in `apps/web/src/content/work`. Each MDX file uses frontmatter for cards and a public-safe case-study body. Keep the sections: one-line summary, at a glance, context, what was unclear, what I did, what became usable, tools and systems, outcomes / impact, what this proves, known / open / protected, and caveats.

## Public-safety rules
Do not publish private health, therapy, financial, family, residency, coalition, client, legal-review, analytics, raw transcript, stakeholder-list, credential, or unapproved photo material. Where unsure, add: `TODO: Jamie approval required before publishing this detail.`

## Resume
The route `/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf` exists. Replace the placeholder PDF in `apps/web/public/resume` with the approved résumé before launch.

## Dokku deploy
```bash
dokku apps:create jamieburk-art
dokku builder-dockerfile:set jamieburk-art dockerfile-path .dokku/Dockerfile
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
git remote add dokku dokku@<droplet-ip-or-host>:jamieburk-art
git push dokku main
```

## Local Docker test
```bash
docker build -f .dokku/Dockerfile -t jamieburk-art .
docker run --rm -p 3000:3000 -e PORT=3000 jamieburk-art
```
