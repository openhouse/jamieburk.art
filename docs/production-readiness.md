# Production Readiness

This is a staging-first portfolio. Production indexing is an explicit consent switch.

## Stack Commitments

- `apps/www` remains the canonical app path.
- Next.js App Router.
- React.
- TypeScript.
- MDX.
- Tailwind CSS.
- daisyUI.
- Node 26.
- npm workspaces.
- Root Dockerfile.
- Dokku.
- Staging-first deployment.

Do not change package managers, frameworks, app paths, or deployment model in production-readiness or knowledge-bank PRs unless Jamie explicitly asks.

## Indexing Rules

- Production indexing requires `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- Missing, blank, `noindex`, or unknown robots policy keeps the site non-indexable.
- Staging remains noindex.
- `SITE_URL` / `NEXT_PUBLIC_SITE_URL` control sitemap and canonical URL generation.
- `/api/health` exposes safe environment state only.
- Do not infer indexability merely from `APP_ENV=production`.

## Contact Rules

- Public contact values come from deployment environment variables:
  - `NEXT_PUBLIC_CONTACT_EMAIL`
  - `NEXT_PUBLIC_LINKEDIN_URL`
  - `NEXT_PUBLIC_GITHUB_URL`
- Public email is required for production.
- LinkedIn is optional and omitted if unset.
- GitHub is optional and omitted if unset.
- No blank public links.
- No phone number in HTML.
- The phone number may appear in the reviewed resume PDF when Jamie approves that resume.

## Safety Checks

Run before production promotion:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run public-safety`
- `npm run check`
- `APP_ENV=production SITE_URL=https://jamieburk.art NEXT_PUBLIC_SITE_URL=https://jamieburk.art NEXT_PUBLIC_ROBOTS_POLICY=index NEXT_PUBLIC_CONTACT_EMAIL=<approved email> npm run check:production`

## Promotion Rule

Production may only become indexable after:

- Staging deploy is reviewed.
- Public-safety checks pass.
- Production preflight passes.
- Jamie approves the exact reviewed commit.
- Indexing is intentionally enabled with `NEXT_PUBLIC_ROBOTS_POLICY=index`.

## Rollback

- Keep the last good commit or image available.
- If production indexing is wrong, restore noindex immediately and redeploy if required.
- If content is wrong, redeploy the previous reviewed commit and document the rollback reason.
