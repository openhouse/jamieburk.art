# AGENTS.md - jamieburk.art

## Mission

Build and maintain a focused, public-safe portfolio that makes Jamie legible as a
Technical Project Manager - Product Operations & Implementation lead who creates
operating structure for complex public-facing teams.

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
- `npm run check`
- `npm run public-safety`
- `npm run preflight:staging`
- `npm run preflight:production`

## Public-Safety Rules

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health/financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, or raw community records.

Use public-safe summaries, redacted examples, representative diagrams, approved
artifacts, and careful collective-work language.

When uncertain, write: `TODO: Jamie approval required.`

Before production, remove or resolve production-facing TODO markers. The public
safety script is the source of truth for automated launch blockers.

Public contact is sourced from `apps/www/src/data/site.ts` and optional
`NEXT_PUBLIC_CONTACT_*` environment values. Do not publish a phone number on the
site outside the approved resume PDF.

## Scope Rules

Do not add a CMS, database, auth, search, analytics, AI chatbot, archive browser,
private document browser, full photo archive, heavy animation, or major framework
change for V1.

## Deployment

Staging first: `staging.jamieburk.art`, noindex.
Production later: `jamieburk.art`, indexable only after Jamie approves content.
Production indexing is opt-in and requires both production environment settings
and `NEXT_PUBLIC_ROBOTS_POLICY=index`.

## Voice

Precise, warm, modular, ethically grounded. Documentation is care. Do not
overclaim.

Use `docs/chad-lens.md` for resume-facing and portfolio-facing copy. Public
pages should make purpose, agency, legibility, precision, and contribution
explicit enough that a busy hiring reader can understand the work without Jamie
in the room.
