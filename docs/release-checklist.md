# Release Checklist

## Staging

- Deploy to `staging.jamieburk.art`.
- Confirm staging displays `Staging review - not indexed`.
- Run `npm ci`.
- Run `npm run check`.
- Run `npm run check:content`.
- Verify `/api/health`, `/robots.txt`, and `/sitemap.xml`.
- Confirm `/robots.txt` disallows `/`.
- Confirm HTML responses include `X-Robots-Tag: noindex, nofollow`.
- Review homepage, work index, one case study, resume, contact, about, and
  colophon at desktop and mobile sizes.
- Check keyboard navigation, skip link visibility, focus states, heading order,
  readable line lengths, and reduced-motion behavior.

## Production Dry Run

- Confirm Jamie has approved the final resume PDF.
- Confirm public email, LinkedIn URL, and GitHub URL or omission.
- Confirm screenshots, public artifacts, metrics, collaborator names, photos,
  and quotes.
- Run `npm run check:production`.
- Build with production environment values:

```bash
docker build \
  --build-arg APP_ENV=production \
  --build-arg SITE_ENV=production \
  --build-arg NEXT_PUBLIC_DEPLOY_ENV=production \
  --build-arg SITE_URL=https://jamieburk.art \
  --build-arg NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
  --build-arg NEXT_PUBLIC_ROBOTS_POLICY=index \
  -t jamieburk-art:production-test .
```

- Confirm canonical URLs and sitemap URLs use `https://jamieburk.art`.
- Confirm `/robots.txt` allows indexing.
- Confirm public HTML responses do not include `X-Robots-Tag: noindex, nofollow`.
- Confirm there are no unresolved approval TODOs, placeholder resume notes,
  draft/private content states, private-material markers, or private font files.

Production should not be deployed or indexed until this checklist is complete
and Jamie approves the content.
