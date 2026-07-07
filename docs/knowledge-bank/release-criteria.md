# Release Criteria

The goal is the smallest production-safe release that helps Jamie get referred,
interviewed, and hired.

## Referrer-Safe

The site can be shared with trusted referrers when:

- The homepage makes Jamie legible in 30 seconds.
- The public contact path works.
- The resume link is intentional and current for the audience.
- No visible TODOs or scaffold notes remain.
- No private materials are exposed.
- Core links work.
- Staging is noindex.
- Claims are careful enough not to create cleanup work.

## Staging Gate

Staging should pass:

```bash
npm run public-safety
npm run route-check
npm run typecheck
npm run lint
npm run build
npm run check
```

Expected staging behavior:

- `APP_ENV=staging`
- `NEXT_PUBLIC_ROBOTS_POLICY=noindex`
- `robots.txt` disallows `/`
- `X-Robots-Tag` is `noindex, nofollow`
- sitemap URLs use `https://staging.jamieburk.art` or the local test URL
- warnings are reviewed, not ignored

## Production Gate

Production should not go live until:

- Approved resume PDF is in place.
- Approved contact email is configured.
- LinkedIn and GitHub URLs are approved or omitted.
- `APP_ENV=production`.
- `SITE_URL=https://jamieburk.art`.
- `NEXT_PUBLIC_SITE_URL=https://jamieburk.art`.
- `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- No deprecated environment aliases are set.
- Public-safety scan passes in production mode.
- Route check passes.
- Sitemap, robots, health, canonical metadata, and OpenGraph output are checked.
- Claims and credits in `public-claims-inventory.md` are approved.
- Jamie has reviewed every public page.
- Rollback path is documented.

Production command:

```bash
APP_ENV=production \
SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_ROBOTS_POLICY=index \
NEXT_PUBLIC_CONTACT_EMAIL=<approved-public-email> \
npm run production-safety
```

## Current Known Blocker

The committed resume PDF is still a placeholder in this branch. Production
safety should fail until the approved current resume is added.
