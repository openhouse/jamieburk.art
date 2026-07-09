# Staging QA

Staging exists so the same commit can be reviewed before production receives it.
Staging should be shareable for review but not indexable.

## Environment

Expected staging values:

```txt
APP_ENV=staging
SITE_ENV=staging
NEXT_PUBLIC_DEPLOY_ENV=staging
SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=noindex
NEXT_PUBLIC_CONTACT_EMAIL=jamie.burkart@gmail.com
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/jamie-burkart
NEXT_PUBLIC_GITHUB_URL=https://github.com/openhouse
```

## Smoke Commands

```bash
curl -I https://staging.jamieburk.art/
curl https://staging.jamieburk.art/robots.txt
curl https://staging.jamieburk.art/sitemap.xml
curl https://staging.jamieburk.art/api/health
curl -I https://staging.jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
```

Expected behavior:

- `robots.txt` disallows all.
- Pages include `X-Robots-Tag: noindex, nofollow`.
- Sitemap uses staging URLs.
- Health reports staging and noindex.
- Resume PDF is noindex.
- No public TODOs or placeholders are visible.

## Manual Pages

- `/`
- `/work`
- `/work/technical-operations`
- `/resume`
- `/contact`
- `/lab/source-backed-team-memory`
- `/work/harry-j-epstein`
- `/work/fair-rent-nyc`
- `/work/callnyc`
- `/work/wowlist`
- `/work/196-sunday-dinner`
- `/work/kc-town-hall`
- `/colophon`
