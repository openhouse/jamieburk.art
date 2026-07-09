# Staging QA

Run this after deploying a reviewed commit to staging.

## HTTP Checks

```bash
curl -I https://staging.jamieburk.art/
curl -i https://staging.jamieburk.art/api/health
curl -i https://staging.jamieburk.art/robots.txt
curl -i https://staging.jamieburk.art/sitemap.xml
curl -I https://staging.jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
```

Expected staging behavior:

- homepage returns 200;
- `/api/health` reports staging, `siteUrl=https://staging.jamieburk.art`, and
  `robotsIndexable=false`;
- `robots.txt` disallows `/`;
- HTML responses include `X-Robots-Tag: noindex, nofollow`;
- sitemap URLs use `https://staging.jamieburk.art`;
- resume PDF returns 200 and sends a noindex/noarchive header.

## Browser Checks

- mobile width;
- keyboard navigation;
- visible focus states;
- clear link labels;
- readable contrast;
- long-page readability;
- resume PDF link works;
- `/contact` shows email, LinkedIn, GitHub, Brooklyn location, and resume link;
- `/work/technical-operations` reads as a role-fit proof page;
- `/lab/source-backed-team-memory` is shareable without private names or
  company context.

