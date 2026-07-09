# Staging QA

Current staging target:

```text
https://staging.jamieburk.art
```

## Required HTTP Checks

```bash
curl -i https://staging.jamieburk.art/api/health
curl -i https://staging.jamieburk.art/robots.txt
curl -i https://staging.jamieburk.art/sitemap.xml
curl -I https://staging.jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
curl -I https://staging.jamieburk.art/opengraph-image
```

Expected staging behavior:

- `/api/health` returns `ok: true`, `appEnv: "staging"`, and
  `robotsIndexable: false`.
- `/robots.txt` disallows `/`.
- `/sitemap.xml` returns valid XML with staging URLs.
- Resume PDF returns `X-Robots-Tag: noindex, noarchive`.
- Global HTML responses include `X-Robots-Tag: noindex, nofollow`.

## Manual Pages

- `/`
- `/work`
- `/work/technical-operations`
- `/resume`
- `/about`
- `/contact`
- `/colophon`
- `/lab/source-backed-team-memory`
- `/work/harry-j-epstein`
- `/work/fair-rent-nyc`
- `/work/callnyc`
- `/work/wowlist`
- `/work/196-sunday-dinner`
- `/work/kc-town-hall`

## Browser QA

- Check 320px mobile width.
- Check mobile navigation and Start Here links.
- Check keyboard tab order and visible focus states.
- Check contact email click behavior.
- Check resume download.
- Check proof strip readability.
- Check case-study sidebars on mobile.
- Check color contrast on blue, green, ochre, and pale surfaces.
- Check reduced-motion behavior.
- Check OpenGraph image and 404 page.
