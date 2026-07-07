# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager -
Product Operations & Implementation.

The site should make this believable: Jamie creates operating structure for
complex public-facing teams.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, npm
workspaces, Docker, and Dokku. The canonical app is `apps/www`.

## Local Development

```bash
nvm install
nvm use
npm ci
npm run dev
```

Use `.env.example` for local environment defaults.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
npm run check
npm run check:production
```

## Environment

Staging is the first deployment target and is non-indexable by default:

```bash
APP_ENV=staging
SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=noindex
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_LINKEDIN_URL=
NEXT_PUBLIC_GITHUB_URL=
NEXT_TELEMETRY_DISABLED=1
```

Production should only be enabled after staging review:

```bash
APP_ENV=production
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=index
NEXT_PUBLIC_CONTACT_EMAIL=<approved-public-email>
NEXT_PUBLIC_LINKEDIN_URL=<approved-linkedin-url-or-empty>
NEXT_PUBLIC_GITHUB_URL=<approved-github-url-or-empty>
NEXT_TELEMETRY_DISABLED=1
```

Production indexing is opt-in. The site only becomes indexable when
`APP_ENV=production`, `SITE_URL=https://jamieburk.art`, and
`NEXT_PUBLIC_ROBOTS_POLICY=index` are all true.

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone
output.

Staging first:

```txt
jamieburk-art-staging -> staging.jamieburk.art
```

Production later:

```txt
jamieburk-art -> jamieburk.art
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to the
container. See `docs/deployment.md` for the staging and production command
drafts, Docker build args, and verification checklist.

## Typeface Policy

Use Karla for body, prose, and UI text. Use Archivo Narrow for headings, labels,
eyebrows, proof labels, and compact public-notice emphasis. Do not commit or
serve private, proprietary, or unlicensed font files.

Trade Gothic, Verlag, Gotham Rounded, Risque, and Maria are design references
only unless Jamie explicitly supplies licensing or permission.

## Editorial Representation Rules

Professional copy should use action verbs, define named projects, avoid
unexplained acronyms, clarify technical terms, answer toward what end, and make
Jamie's role visible without overclaiming.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- When uncertain, mark: `TODO: Jamie approval required.`

## Internal Proof Knowledge Graph

The public-safe proof knowledge graph lives at `apps/www/src/data/proofs.ts`.
It is the repo-internal source-of-truth claim layer for Jamie's professional
accomplishments: claim, source basis, confidence, visibility, public-use
guidance, and guardrails.

The website is a composed projection of that graph, optimized for audience,
purpose, and clarity through homepage proof strips, resume highlights,
role-specific proof rows, case studies, and supporting pages. The graph itself
is not exposed as a public route or archive index. See `docs/proofs-bank.md`
before adding or changing public claims.

## Launch Blockers

- Replace placeholder resume PDF before production.
- Confirm public email.
- Confirm LinkedIn and GitHub links.
- Confirm screenshots/artifacts.
- Confirm exact proof metrics.
- Confirm collaborator names, photos, and quotes.
- Confirm staging noindex behavior.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm no private/proprietary fonts are committed or served.
- Confirm `npm run check:production` fails until every production approval and
  environment value is ready, then passes on the reviewed commit before launch.
