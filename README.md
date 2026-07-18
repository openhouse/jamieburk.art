# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager -
Product Operations & Implementation.

The site should make this believable: Jamie creates operating structure for
complex public-facing teams.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, npm
workspaces, Docker, and Dokku. The canonical app is `apps/www`.

## Local Development

```bash
nvm install
nvm use
npm ci
npm run dev
```

Use `.env.example` for local environment defaults.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
npm run check
npm run knowledge-bank
npm run public-safety
npm run check:routes
npm run check:citations
npm run test:citations
npm run report:citations
npm run check:portfolio-evals
npm run test:portfolio-evals
npm run report:portfolio-evals
npm run check:eval-contract
npm run certify:eval-contract
npm run test:eval-contract
npm run test:browser-evals
npm run check:projections
npm run preflight:staging
npm run preflight:production
```

## Knowledge Bank

This repo includes a public-safe knowledge bank for professional claims:

- `docs/knowledge-bank/`
- `apps/www/src/data/proofs.ts`
- `apps/www/src/data/knowledge-bank/records.ts`

The website is a projection of this bank. Pages select, sequence, and phrase
claims for specific readers. Do not add stronger claims to app copy without
first adding a public-safe proof record.

The knowledge bank is not a private archive. Do not commit raw transcripts,
private coalition notes, legal-review materials, private correspondence,
client-private material, internal analytics, raw community records, unapproved
photos, unapproved screenshots, or unapproved quotes.

There is intentionally no public `/proofs` route. The site should remain a
composed portfolio, not a claims database.

`npm run knowledge-bank` checks the proof schema, projection rules, and work
metadata. `npm run check:routes` checks canonical routes and legacy redirects.
`npm run check:citations` validates the source-to-projection graph and redacted
public registry; `npm run test:citations` runs citation regressions; and
`npm run report:citations` writes an ignored review report to
`reports/generated/citations.md`.

Archive-production passes are evaluated as hard gates rather than informal
notes. Run `npm run check:knowledge-evals`, `npm run test:knowledge-evals`, and
`npm run report:knowledge-evals`. The latest Shared Drives pass is documented at
`docs/knowledge-bank/projects/google-drive-shared-drives-production-2026-07-14.md`;
the repository retains only public-safe records, never Shared Drive identifiers,
private URLs, permissions, participant rows, or credentials.

Daily knowledge work uses four small, local commands. Intake is a dry run unless
`--write` is supplied; a receipt remains an unvalidated lead until it is
integrated into the canonical graph.

```bash
npm run knowledge:intake -- --title "Source title" --project callnyc \
  --kind public-url --reason "What this may establish" \
  --url https://example.org/source
npm run knowledge:query -- --type claim --project callnyc --active
npm run knowledge:report -- --write
npm run knowledge:projection-map -- --write
npm run eval:run
```

The intake command rejects private paths, validates the record shape, assigns a
stable ID, and preserves a repeated lead with a `duplicate` disposition. Query,
report, and projection-map output distinguish sources, observations, memories,
claims, inquiries, active projections, and held depth. Generated reports stay
outside version control under `reports/generated/`.
See `docs/knowledge-bank/daily-commands.md` for the complete intake and
promotion boundary.

`npm run eval:run` executes the frozen composite contract against a committed
candidate and records command output digests. Independent blind judgments are
recorded with `npm run eval:record-holdout -- --input /path/to/judgment.json
--prompt evals/_shared/holdout-a.md --session stable-session-id`. Failed runs and
rejected judgments remain in the hash-chained history. See
`docs/evals/composite-governance.md`.

Use `npm run check:eval-records` for complete history validation and
`npm run check:eval-contract` for contract structure plus an advisory stop-state
report. `npm run certify:eval-contract` is the fail-closed certification gate;
it succeeds only after two deterministic passes and two separately attested,
prior-score-blind model-context holdouts accept one unchanged candidate. Raw
command logs and normalized text copies are both retained. A model-context
attestation records process separation; it is not proof of a human identity or
substitute for the contract's external human gates.

The shipped resume PDF is generated from
`docs/knowledge-bank/public-artifacts/resume-technical-project-manager-2026-07-17.html`
with `npm run generate:resume`. Public-safety checks compare extracted PDF text
to the committed text projection and enforce the approved contact, CallNYC, and
KC Town Hall language.

## Environment

Staging is the first deployment target and is non-indexable by default:

```bash
APP_ENV=staging
SITE_ENV=staging
NEXT_PUBLIC_DEPLOY_ENV=staging
SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=noindex
NEXT_TELEMETRY_DISABLED=1
```

Production should only be enabled after staging review:

```bash
APP_ENV=production
SITE_ENV=production
NEXT_PUBLIC_DEPLOY_ENV=production
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=index
NEXT_TELEMETRY_DISABLED=1
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone
output.

Staging first:

```txt
jamieburk-art-staging -> staging.jamieburk.art
```

Production later:

```txt
jamieburk-art -> jamieburk.art
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to the
container. See `docs/deployment.md` for the staging and production command
drafts, Docker build args, and verification checklist.

## Typeface Policy

Use Karla for body, UI, prose, and display headings. Use Oswald for labels,
metadata, and compact civic emphasis. Do not commit or serve private,
proprietary, or unlicensed font files. See `docs/typefaces.md`.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- When uncertain, mark: `TODO: Jamie approval required.`
  Do not render that marker in production-facing pages; keep launch blockers in
  `docs/knowledge-bank/launch-blockers.md`.

## Launch Readiness

Approved contact details and public-use boundaries live in
`docs/knowledge-bank/approval-register.md`. Cleared content gates and the
remaining exact-commit release actions live in
`docs/knowledge-bank/launch-blockers.md`. Re-run the complete checks for every
production candidate; do not infer readiness from an earlier commit.

The recursive agent evaluation suite lives in `evals/launch-readiness/`. Run
`npm run check:launch-evals`, `npm run test:launch-evals`, and
`npm run report:launch-evals`. Hard gates remain authoritative; weighted judge
scores may improve clarity but may not override safety, consent, accessibility,
or exact-commit release requirements.

The complementary portfolio-effectiveness suite lives in
`evals/portfolio-effectiveness/`. It evaluates hiring-reader comprehension,
collaborator-backed role attribution, complete operating narratives, recent
practice, consent-cleared visual evidence, exact-SHA release proof, and the
maintainability of this evaluation system. Run `npm run check:portfolio-evals`,
`npm run test:portfolio-evals`, and `npm run report:portfolio-evals`. A locally
passing score does not stand in for human reader sessions, collaborator proof
notes, artifact rights clearance, externally verified outcomes, or production
evidence from the exact deployed commit.

The shared contract in `evals/_shared/contract.json` binds all three suites to a
versioned rubric digest and a governed-candidate digest. Run
`npm run check:eval-contract`, `npm run test:eval-contract`, and
`npm run report:eval-contract`. A valid recursive stop requires two passing
deterministic runs and two independent, prior-score-blind holdouts on the same
unchanged governed candidate. Generated run reports do not alter that digest.
Changing a rubric version resets the pass and holdout streak. Acceptance for PR
review never grants production approval.
