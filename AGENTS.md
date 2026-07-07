# AGENTS.md - jamieburk.art

## Mission

Build and maintain a focused, public-safe portfolio that makes Jamie legible as a
Technical Project Manager - Product Operations & Implementation lead who creates
operating structure for complex public-facing teams.

Chad-lens rule: make Jamie legible, action-oriented, and purpose-first. Do not
make a hiring reader decode what Jamie did, toward what end, for whom, and what
became usable.

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
- `npm run check:knowledge-bank`
- `npm run check:production`

## Knowledge Bank

Use `docs/knowledge-bank/` as the repo-internal public-safe source of truth for
professional accomplishment claims. The website is a projection of that bank,
not an archive browser and not a `/proofs` page.

Use `recommendedPublicWording` by default. Use stronger claim language only when
the target surface is explicitly approved. Keep exact metrics off the homepage
proof strip unless the claim and surface are approved.

The goal is not to say more. The goal is to make every public claim easier to
trust.

## Public-Safety Rules

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health/financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, or raw community records.

Use public-safe summaries, redacted examples, representative diagrams, approved
artifacts, and careful collective-work language.

When uncertain, write: `TODO: Jamie approval required.`

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
