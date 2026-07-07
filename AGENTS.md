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
- `npm run check:routes`
- `npm run preflight:production`

## Public-Safety Rules

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health/financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, or raw community records.

Use public-safe summaries, redacted examples, representative diagrams, approved
artifacts, and careful collective-work language.

When uncertain, write: `TODO: Jamie approval required.`

## Chad Lens

Before shipping public copy, make Jamie visible as the actor, explain toward
what end the work mattered, translate specialized terms once, spell out or avoid
acronyms, define unfamiliar entities, protect collective credit, and avoid
making the reader decode why the work is impressive.

Prefer verbs like built, co-built, created, stewarded, synthesized, structured,
translated, coordinated, documented, maintained, supported, contributed to, and
helped teams use.

Use care with shorthand such as under-structured, lightweight, tracking, data,
AI-ready, source-backed, knowledge graph, LLM, maintainers, and builds. Translate
them into plain language the first time they appear.

## Knowledge Bank

The canonical internal knowledge-bank layer is `docs/knowledge-bank/`. It is a
public-safe claim governance layer, not a private archive and not a public
website section. The app may project selected approved wording from
`apps/www/src/data/proofs.ts`, but do not add `/knowledge-bank`, `/proofs`,
`/claims`, or `/internal` routes for V1.

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
