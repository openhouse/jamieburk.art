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

## Public-Safety Rules

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health/financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, or raw community records.

Use public-safe summaries, redacted examples, representative diagrams, approved
artifacts, and careful collective-work language.

When uncertain, write: `TODO: Jamie approval required.`

## Knowledge Bank

Treat `docs/knowledge-bank/` as the public-safe claim-governance layer. Do not
strengthen a public website claim unless the knowledge bank status, source
class, and boundary support that wording. The website is a projection from the
bank, not a private archive or evidence dump.

Before shipping public copy, apply the Chad Lens:

- make Jamie visible as the actor;
- answer "toward what end?";
- translate specialized terms once;
- use words instead of symbols or unexplained shorthand;
- protect collective credit and avoid unsupported ownership claims;
- make the work impressive without making the reader decode it.

Prefer action verbs such as clarified, structured, built, co-built, stewarded,
translated, coordinated, facilitated, documented, implemented, synthesized,
mapped, supported, maintained, transferred, and improved.

Avoid unsupported hero language such as "single-handedly built," "led the
movement," "owned the bill," "solved the crisis," or "caused 2x growth."

## Scope Rules

Do not add a CMS, database, auth, search, analytics, AI chatbot, archive browser,
private document browser, full photo archive, heavy animation, or major framework
change for V1.

## Deployment

Staging first: `staging.jamieburk.art`, noindex.
Production later: `jamieburk.art`, indexable only after Jamie approves content.
Production indexing must remain explicit opt-in: `APP_ENV=production`,
`SITE_URL=https://jamieburk.art`, and `NEXT_PUBLIC_ROBOTS_POLICY=index`.

## Voice

Precise, warm, modular, ethically grounded. Documentation is care. Do not
overclaim.
