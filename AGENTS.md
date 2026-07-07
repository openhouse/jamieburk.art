# AGENTS.md - jamieburk.art

## Mission

Build and maintain a focused, public-safe portfolio that makes Jamie legible as a
Technical Project Manager - Product Operations & Implementation lead who helps
teams turn ambiguous, loosely defined work into usable systems.

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
- `npm run prelaunch`

## Public-Safety Rules

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health/financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, or raw community records.

Use public-safe summaries, redacted examples, representative diagrams, approved
artifacts, and careful collective-work language.

When uncertain, write: `TODO: Jamie approval required.`

Private source material must stay outside the repo. If local working folders are
needed, use ignored names such as `private/`, `archive-private/`, `raw/`,
`transcripts-private/`, `client-private/`, and `legal-review/`.

## Scope Rules

Do not add a CMS, database, auth, search, analytics, AI chatbot, archive browser,
private document browser, full photo archive, heavy animation, or major framework
change for V1.

## Deployment

Staging first: `staging.jamieburk.art`, noindex.
Production later: `jamieburk.art`, indexable only after Jamie approves content
and `NEXT_PUBLIC_ROBOTS_POLICY=index` is explicitly configured.

## Voice

Precise, warm, modular, ethically grounded. Documentation is care. Do not
overclaim.
