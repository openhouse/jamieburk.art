# Production Readiness

This branch implements the V1 composite bundle from the M review:

- Technical Operations in primary navigation and a role-fit proof page.
- Karla + Oswald as the served V1 type system.
- Opt-in production indexing through `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- Canonical route hygiene with temporary redirects for legacy paths.
- Site contact values from `apps/www/src/data/site.ts` and optional public env
  values.
- Approved resume PDF committed at
  `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- One public-safety scanner at `scripts/check-public-safety.mjs`.
- Chad-lens editorial guidance in `docs/chad-lens.md`.
- Public-safe proofs bank in `docs/proofs-bank.md` and
  `apps/www/src/data/proofs.ts`.

## Merge Strategy

Do not merge candidate branches wholesale. The V1 bundle is a composite of the
smallest useful pieces from M, K, O, and N:

- M: Technical Operations route, nav prominence, Karla + Oswald type direction.
- K: opt-in production indexing and private path ignores.
- O: route canonicalization, Start Here flow, and temporary redirects.
- N: contact source of truth and a single safety-check shape.

D/F/J-style preflights are included only as wrappers around the canonical check
commands. Do not add multiple competing scanners.

## Launch Gates

These must pass before production:

- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run public-safety`
- `npm run preflight:staging`
- `npm run preflight:production`
- Docker build and smoke test for `/api/health`, `/robots.txt`, `/sitemap.xml`,
  the resume PDF, and key routes.
- Manual review of contact, resume, Technical Operations, FairRentNYC,
  Source-Backed Team Memory, mobile labels, and long-page background grid.
- Chad-lens review for purpose, agency, legibility, precision, contribution, and
  reader burden.
- Proofs-bank review for public-safe claim strength, support level, website
  projection, and explicit non-public boundaries.

Jamie gives final production approval after staging review. A final reviewer
should inspect the diff before production deploy, with special attention to
public-safety boundaries, claims, routes, metadata, and contact.

## Remaining Launch Blockers

- Jamie approval of public email/contact path.
- Jamie approval of resume PDF and phone-in-PDF behavior.
- Jamie approval of proof metrics, especially revenue and public-funding
  numbers.
- Collaborator consent for any future names, credits, quotes, screenshots, or
  photos.
- Staging smoke tests against the deployed domain.
- Production smoke tests immediately after deploy.
- Final Chad-lens editorial review of homepage, Technical Operations,
  FairRentNYC, Source-Backed Team Memory, and resume page.

## Approval Ownership

- Jamie approves production deploy, public contact, resume artifact, proof
  metrics, collaborator names, screenshots, quotes, and artifacts.
- Technical reviewer approves build, Docker, redirects, robots, sitemap,
  metadata, headers, and rollback readiness.
- Editorial reviewer approves Chad-lens clarity and claim discipline.

## Content Decisions

- Public contact email is approved through the site data layer.
- LinkedIn and GitHub are optional public rows. Production may launch without
  them if Jamie removes or withholds approval.
- No phone number appears on the website outside the approved resume PDF.
- The resume PDF should not be indexed independently.
- Screenshots are not required for V1 if text-only case studies remain accurate
  and public-safe.
- Source-Backed Team Memory remains a lab page in V1 and should avoid naming
  private collaborators, pricing, or unapproved client detail.
- KC Town Hall uses supported/contributed language, not co-led language.
- Exact KC Town Hall public-funding numbers remain approval-gated until Jamie
  approves the public source package.

## Indexing and Routes

Production indexing is opt-in. Staging stays noindex/nofollow at metadata and
header levels. Robots, sitemap, canonical metadata, and Open Graph metadata are
built from the same `SITE_URL` source.

Canonical V1 routes:

- `/work/fair-rent-nyc`
- `/work/196-sunday-dinner`
- `/lab/source-backed-team-memory`
- `/work/technical-operations`

Legacy redirects are temporary for this production-readiness pass. Switch to
permanent redirects only after production behavior is stable.

## V1.1

Move these out of V1 unless Jamie explicitly approves them:

- Approved screenshots, photos, quotes, and richer artifacts.
- Permanent redirects after launch verification.
- Deeper archive or case-study media.
- More precise metric substantiation.
- Optional generated Open Graph refinement.
- Any CMS, search, analytics, private archive, AI chatbot, auth, or database.
