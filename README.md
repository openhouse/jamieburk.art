# Jamie Burkart Portfolio

Public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

The first launch goal is a small, reviewable site that shows how Jamie turns under-structured civic, cultural, small-business, public-facing, and technical work into usable systems, documentation, tools, workflows, and handoffs.

## Stack

- Next.js App Router, React, and TypeScript
- MDX content with typed metadata helpers
- Tailwind CSS 4 and daisyUI 5
- npm workspaces with deployable app at `apps/site`
- Node 26 via `.nvmrc`
- Root Dockerfile for Dokku deployment
- No analytics, CMS, database, search, contact form backend, or AI chatbot in V1

## Local Development

```bash
nvm install
nvm use
npm install
npm run dev
```

Workspace commands run against `@jamie/site`:

```bash
npm run typecheck
npm run lint
npm run check
npm run build
```

## Content Editing

Work metadata lives in `apps/site/src/data/work.ts`. Public pages should keep the recurring grammar visible:

- What was unclear?
- What became usable?
- What remains protected?
- What this proves
- Source trail

Do not add private sources, raw meeting records, unapproved screenshots, client details, private notes, credentials, protected personal information, or proprietary font files.

## Resume

The resume route expects the approved PDF here:

```text
apps/site/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
```

Staging may carry a clearly marked placeholder. Production should not be promoted until the approved PDF is in place.

## Public Safety

Use public-safe wording such as co-built, contributed to, helped structure, supported, public-safe summary, redacted example, representative diagram, approval required, and private material intentionally omitted.

When a fact, image, quote, source, or contact detail is not approved, omit it or mark it as pending in staging. See `docs/CONTENT_SAFETY.md`.

## Staging Deploy

Staging is the first deploy target:

```bash
dokku apps:create jamieburk-art-staging
dokku proxy:ports-set jamieburk-art-staging http:80:3000
dokku domains:set jamieburk-art-staging staging.jamieburk.art
dokku config:set jamieburk-art-staging NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_DEPLOY_ENV=staging NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art NEXT_PUBLIC_NO_INDEX=true
git push dokku-staging HEAD:main
```

Staging is noindexed through `robots.txt`, page metadata, and an `X-Robots-Tag` header.

## Production Deploy

Promote the same reviewed commit only after staging approval:

```bash
dokku apps:create jamieburk-art
dokku proxy:ports-set jamieburk-art http:80:3000
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_DEPLOY_ENV=production NEXT_PUBLIC_SITE_URL=https://jamieburk.art NEXT_PUBLIC_NO_INDEX=false
git push dokku-production HEAD:main
```

See `docs/DEPLOYMENT.md` for DNS, HTTPS, Docker, and verification commands.
