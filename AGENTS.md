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
- `npm run preflight:staging`
- `npm run preflight:production`

Use `npm run preflight:staging` before staging review. Use
`npm run preflight:production` only with production environment values and after
Jamie approves the public contact and resume surfaces.

## Chad Lens

See `docs/knowledge-bank/chad-lens.md`.

Lean into the strongest defensible professional story:

Jamie turns under-structured work into usable systems.

Make Jamie's operating role legible: delivery coordination, planning rhythms,
status reporting, risk surfacing, onboarding, handbooks, runbooks, decision
logs, action trackers, retrospectives, documentation architecture, public-facing
tools, and durable handoffs.

Do not understate systems work as merely notes, tracking, or static pages. Do not
overstate collective work as solo authorship, official authority, legal analysis,
policy ownership, or causal impact unless the proof supports it.

## Knowledge / Proof Workflow

The public site is a projection of a repo-internal knowledge bank. Do not create
a public `/proofs` page for V1.

- `docs/knowledge-bank/README.md` explains the governance model.
- `docs/knowledge-bank/claims.md` tracks public wording and status.
- `docs/knowledge-bank/proofs.md` records public-safe claim boundaries.
- `docs/knowledge-bank/anti-claims.md` records claims the site must not imply.
- `docs/knowledge-bank/source-policy.md` defines allowed source classes.
- `apps/www/src/data/proofs.ts` is the typed claim source that app pages may use.

Every strong claim should have a support level, allowed locations, do-not-say
boundaries, and protected-note guidance. Prefer aggregate, public-safe wording
when source materials are private.

## Public-Safety Rules

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health/financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, or raw community records.

Use public-safe summaries, redacted examples, representative diagrams, approved
artifacts, and careful collective-work language.

When uncertain, write: `TODO: Jamie approval required.`

Do not ship unresolved approval markers in production-visible app content.
Production checks should fail if app content still carries unresolved approval,
placeholder, private, confidential, raw transcript, or unapproved contact
language.

## Scope Rules

Do not add a CMS, database, auth, search, analytics, AI chatbot, archive browser,
private document browser, full photo archive, heavy animation, or major framework
change for V1.

## Deployment

Staging first: `staging.jamieburk.art`, noindex.
Production later: `jamieburk.art`, indexable only after Jamie approves content.

Staging can be honest about pending approvals. Production must be clean.
Production indexing requires `APP_ENV=production`, `SITE_URL=https://jamieburk.art`,
`NEXT_PUBLIC_SITE_URL=https://jamieburk.art`, and
`NEXT_PUBLIC_ROBOTS_POLICY=index`.
Production may remain `noindex` for quiet review before final indexing approval.
Staging noindex is a review safeguard, not a privacy boundary.

## Contact / Resume

Centralize public contact settings in `apps/www/src/data/site.ts` using:

- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_LINKEDIN_URL`
- `NEXT_PUBLIC_GITHUB_URL`

Production requires an approved public email. LinkedIn and GitHub are optional.
Do not add unapproved phone numbers, personal addresses, private emails, or
contact-form infrastructure.

Do not replace or promote resume assets unless Jamie has approved the public
contact details and PDF content.

## Voice

Precise, warm, modular, ethically grounded. Documentation is care. Do not
overclaim.
