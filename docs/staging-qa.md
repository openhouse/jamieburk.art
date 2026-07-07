# Staging QA

Staging is reviewable but not indexable.

## Curl Checks

```bash
curl -i https://staging.jamieburk.art/api/health
curl -i https://staging.jamieburk.art/robots.txt
curl -i https://staging.jamieburk.art/sitemap.xml
curl -I https://staging.jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
```

## Expected Staging Behavior

- `/api/health` reports staging / non-indexable state.
- `/robots.txt` disallows `/`.
- `/sitemap.xml` uses `https://staging.jamieburk.art` URLs.
- HTML responses include `X-Robots-Tag: noindex, nofollow`.
- The resume PDF response includes `X-Robots-Tag: noindex, nofollow`.
- The page chrome shows `Staging review - not indexed`.

## Expected Production Behavior

- `/api/health` reports production / indexable state only after the approved env is set.
- `/robots.txt` allows `/`.
- `/robots.txt` includes a sitemap only when indexable.
- `/sitemap.xml` uses only `https://jamieburk.art` URLs.
- Canonical URLs use the apex production domain.
- No staging URLs appear in metadata or sitemap output.
- The resume PDF remains noindex unless Jamie explicitly approves direct PDF indexing.
