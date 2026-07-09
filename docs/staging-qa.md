# Staging QA

Use this checklist after deploying the reviewed branch to
`https://staging.jamieburk.art`.

## Commands

```bash
curl -I https://staging.jamieburk.art/
curl -i https://staging.jamieburk.art/robots.txt
curl -i https://staging.jamieburk.art/sitemap.xml
curl -I https://staging.jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
```

## Expected

- Homepage returns 200.
- `X-Robots-Tag` is `noindex, nofollow` on staging.
- `robots.txt` disallows `/`.
- `sitemap.xml` returns 200 and uses `https://staging.jamieburk.art` URLs.
- Resume PDF returns 200 and opens as the current two-page resume.
- `/contact` shows real email, LinkedIn, GitHub, Brooklyn location, resume, and
  role-fit proof-page links.
- `/work/technical-operations` reads as the OTI role-fit proof page.
- `/lab/source-backed-team-memory` is shareable without naming private calls,
  companies, transcripts, or relationship context.

## Routes

Check:

```txt
/
/work
/work/technical-operations
/resume
/about
/contact
/colophon
/lab/source-backed-team-memory
/work/harry-j-epstein
/work/fair-rent-nyc
/work/callnyc
/work/wowlist
/work/196-sunday-dinner
/work/kc-town-hall
/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
/robots.txt
/sitemap.xml
/api/health
```
