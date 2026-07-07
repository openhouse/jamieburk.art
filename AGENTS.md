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
- `npm run public-safety`
- `npm run check`

## Knowledge Bank

Use `docs/knowledge-bank/README.md` as the orientation file for public-safe
claim governance. Use `docs/proofs-bank.md` for reusable proof claims,
`docs/public-claims-inventory.md` for page-level claim placement, and
`docs/copy-guidelines.md` for professional-legibility rules.

Website components should project from reviewed claims where feasible. Do not
strengthen claims directly in React components when a proof-bank or inventory
update is needed first.

## Public-Safety Rules

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health/financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, or raw community records.

Use public-safe summaries, redacted examples, representative diagrams, approved
artifacts, and careful collective-work language.

When uncertain, move the issue to `docs/launch-blockers.md`,
`docs/public-claims-inventory.md`, or `docs/knowledge-bank/approval-register.md`.
Do not publish unresolved TODOs in public UI.

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
