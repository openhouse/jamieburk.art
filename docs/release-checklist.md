# Release Checklist

## Staging

- `SITE_URL` and `NEXT_PUBLIC_SITE_URL` point to `https://staging.jamieburk.art`.
- `NEXT_PUBLIC_ROBOTS_POLICY` is not `index`.
- `robots.txt` disallows indexing.
- Public copy has no visible approval TODOs.
- Contact links appear only when approved environment values are present.
- The résumé PDF is present and returns `X-Robots-Tag: noindex`.

## Production

- Jamie has approved production indexing in writing.
- `APP_ENV`, `SITE_ENV`, and `NEXT_PUBLIC_DEPLOY_ENV` are `production`.
- `SITE_URL` and `NEXT_PUBLIC_SITE_URL` are `https://jamieburk.art`.
- `NEXT_PUBLIC_ROBOTS_POLICY=index` is set only for final public launch.
- `NEXT_PUBLIC_CONTACT_EMAIL` uses an approved public contact path.
- Sitemap contains canonical public routes and omits the résumé PDF.
- `www.jamieburk.art` redirects to `jamieburk.art`.
- Public-safety, route, build, and production preflight checks pass.
