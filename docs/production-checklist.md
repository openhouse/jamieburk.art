# Production Checklist

Production should not become indexable until every item below has been reviewed.

## Content

- Knowledge bank exists at `docs/knowledge-bank`.
- Website copy projects from the knowledge bank instead of exposing raw proof.
- No `/proofs` route exists.
- No private transcripts, emails, legal-review materials, raw community records,
  stakeholder lists, screenshots, quotes, or photos are published without
  approval.
- Resume PDF is the exact approved public resume.
- Public email, LinkedIn, and GitHub links are approved and supplied through
  environment variables.
- Homepage proof points use public-safe, bounded language.
- Work pages use Known / Open / Protected or equivalent boundary language.
- Case-study metrics are aggregate, approved, and carefully phrased.

## Technical

- `npm run check`
- `npm run check:public-safety`
- `npm run check:routes`
- `npm run check:production` with production environment variables
- `robots.txt` allows indexing only when production and
  `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- `sitemap.xml` uses `https://jamieburk.art` only in production.
- Lab routes are excluded from the canonical sitemap unless Jamie approves
  indexing them.
- Redirects resolve old case-study slugs to canonical routes.
- `www.jamieburk.art` redirects to `jamieburk.art`.

## Environment

Production must set:

```bash
APP_ENV=production
SITE_ENV=production
NEXT_PUBLIC_DEPLOY_ENV=production
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=index
NEXT_PUBLIC_CONTACT_EMAIL=<approved-public-email>
NEXT_TELEMETRY_DISABLED=1
```

Optional public contact links:

```bash
NEXT_PUBLIC_LINKEDIN_URL=<approved-public-linkedin-url>
NEXT_PUBLIC_GITHUB_URL=<approved-public-github-url>
```

## Launch Blockers

- Placeholder resume PDF remains.
- Production contact email is missing.
- Any production-facing `TODO: Jamie approval required.` remains.
- Any tracked private source folder or protected filename appears.
- Any local font file is committed.
- Any production page uses protected source categories as evidence instead of
  public-safe summaries.
