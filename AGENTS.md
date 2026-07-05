# AGENTS.md - jamieburk.art

This repo is Jamie Burkart's public portfolio.

## Mission

Build and maintain a focused, public-safe portfolio that makes Jamie legible as a Technical Project Manager - Product Operations & Implementation lead who creates operating structure for complex public-facing teams.

## Current canonical app

Use `apps/www`. Do not rename to `apps/site` without explicit approval.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS 4, daisyUI 5, Node 26, npm workspaces, Dockerfile, Dokku.

## Commands

- `npm ci`
- `npm run dev`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run check`

## Public-safety rules

Do not publish private emails, raw transcripts, private coalition notes, legal-review materials, health/financial details, private correspondence, unapproved photos, private fonts, credentials, private stakeholder lists, or internal client analytics.

Use public-safe summaries, redacted examples, representative diagrams, approved artifacts, and careful collective-work language.

When uncertain, write `TODO: Jamie approval required.`

## Scope rules

Do not add CMS, database, auth, search, analytics, AI chatbot, archive browser, heavy animation, or a major framework change for V1.

## Deployment

Staging first: `staging.jamieburk.art`, noindex.
Production later: `jamieburk.art`, indexable only after Jamie approves content.
