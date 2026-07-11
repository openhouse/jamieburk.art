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
- `npm run knowledge-bank`
- `npm run public-safety`
- `npm run check:routes`
- `npm run check:citations`
- `npm run test:citations`
- `npm run report:citations`

## Public-Safety Rules

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health/financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, or raw community records.

Use public-safe summaries, redacted examples, representative diagrams, approved
artifacts, and careful collective-work language.

When uncertain, write: `TODO: Jamie approval required.`

## Knowledge Bank

Use `docs/knowledge-bank/` and `apps/www/src/data/proofs.ts` as the
public-safe claim layer.

Website copy should project from the knowledge bank and stay optimized for
clarity, audience, and purpose.

Do not strengthen a claim in a public page unless the stronger claim exists in
the bank with source basis, status, guardrail, and public-use boundary.

Every structured claim needs status, support level, evidence class, public
wording, guardrail, protected boundaries, and last-reviewed date.

The website should read as a composed portfolio, not a claims database.

Do not add `/proofs`, `/knowledge-bank`, or `/public-claims` public routes.

## Citational Care

Use the app-local citation system under `apps/www/src/data/knowledge-bank/`,
`apps/www/src/lib/citations/`, and `apps/www/src/components/citations/`.

Do not add a second citation package, API, database, CMS, or remark/rehype
citation pipeline unless explicitly requested.

Separate source origin from preservation. If an Internet Archive capture
preserves a public source, name the original publisher as the source and the
archive as preservation context.

Public citations must be page-local, generated at render time, and reset per
page. Do not store global citation numbers in the data.

Public projections require approved claims, allowed surfaces, evidence
relationships, source boundaries, required qualifiers, and anti-claims.

Private evidence may be represented only as a public-safe summary. Do not expose
private paths, raw metadata, participant identities, unapproved media, or
unpublished source files.

Run `npm run check:citations`, `npm run test:citations`, and
`npm run report:citations` after editing cited claims.

## Chad Lens

Minimize the reader's burden. Make Jamie visible as the actor, explain what the
work made usable, translate specialized language for hiring and public-sector
readers, and use collective-work language where the work was collective.

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
