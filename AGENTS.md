# AGENTS.md - jamieburk.art

## Mission

Build and maintain a focused, public-safe portfolio that makes Jamie legible as a
Technical Project Manager - Product Operations & Implementation lead who creates
operating structure for complex public-facing teams.

Use Chad's lens for this composite branch: do not make the reader decode Jamie.
State what Jamie does, for whom, toward what end, and what becomes usable.

## Current Canonical App

Use `apps/www`. Do not rename it to `apps/site`, `apps/web`, or another path
without explicit approval.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, npm
workspaces, Dockerfile, Dokku.

## Commands

- `npm ci`
- `npm run dev`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run knowledge-bank`
- `npm run public-safety`
- `npm run routes`
- `npm run preflight:staging`
- `npm run preflight:production`
- `npm run check`

## Public-Safety Rules

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health/financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, or raw community records.

Use public-safe summaries, redacted examples, representative diagrams, approved
artifacts, and careful collective-work language.

When uncertain, keep the material out of the public surface and record the
approval need in staging QA or launch notes.

## Knowledge Bank Rules

- Public claims should come from `docs/knowledge-bank/claims.md`.
- Project proof should be summarized in `docs/knowledge-bank/proofs.md`.
- Projection rules live in `docs/knowledge-bank/projection-guide.md` and
  `docs/knowledge-bank/projection-map.md`.
- Protected evidence stays outside the repo.
- Use Chad's lens: purpose, agency, legibility, precision, contribution, reader
  burden.
- Do not add private source material to prove public claims.
- If a public sentence risks implying an anti-claim, rewrite it or remove it.

## Scope Rules

Do not add a CMS, database, auth, search, analytics, AI chatbot, archive browser,
private document browser, full photo archive, heavy animation, or major framework
change for V1.

## Deployment

Staging first: `staging.jamieburk.art`, noindex.
Production later: `jamieburk.art`, indexable only after Jamie approves content.

## Voice

Precise, warm, modular, ethically grounded. Documentation is care. Do not
overclaim.
