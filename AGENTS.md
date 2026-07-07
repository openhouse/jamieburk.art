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

Do not render public approval TODOs on the website. If approval is missing,
omit the claim or artifact from public pages and record the blocker in docs.

Use `docs/proofs-bank/` as the public-safe knowledge base for professional
accomplishment claims. Use `docs/claim-register.md` for exact release wording.
The website is a projection from those sources; do not strengthen a public claim
unless the proofs bank already supports the stronger language.

## Chad Lens

Use the Chad Lens when editing resume-facing and portfolio-facing copy:

1. Purpose: say toward what end the work existed and why the system mattered.
2. Agency: make Jamie visible as the actor with an accurate action verb.
3. Legibility: make the work understandable to public-sector, HR, recruiter,
   and technical-operations readers without insider decoding.
4. Precision: when saying data, systems, documentation, or AI, name the specific
   work.
5. Contribution: use stewardship language where appropriate and avoid inflated
   ownership claims.
6. Reader burden: make the value understandable on first pass.

Use terms such as `under-structured`, `lightweight`, `tracking`, `data`,
`AI-ready`, `source-backed`, `Noting.us`, `knowledge graph`, `LLM`,
`maintainers`, and `builds` with care. Replace or explain them when a busy
hiring manager would otherwise need Jamie in the room.

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
