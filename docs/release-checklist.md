# Release Checklist

Use this checklist for staging review, production deploy, and final indexing.

## Before Staging Review

- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run public-safety`
- `npm run check:routes`
- `npm run preflight:staging`
- Review homepage, Work, Technical Operations, Resume, Contact, and case studies
- Check keyboard navigation, visible focus states, and mobile layout
- Confirm staging has `robots.txt` disallowing `/`, metadata noindex, and
  `X-Robots-Tag: noindex, nofollow`

## Before Production Deploy

- Same commit reviewed on staging is the commit promoted to production
- Public contact path is final or optional contact rows are hidden
- Resume PDF is current, approved, selectable, and intentionally public
- Visible internal review notes are absent from public pages
- Claims match `docs/knowledge-bank/claims.md`
- Private source material is absent from git
- Redirects are configured for known alternate routes
- `npm run preflight:production` passes in the intended robots mode

## Before Indexing

- Jamie approves the reviewed production surface
- `NEXT_PUBLIC_ROBOTS_POLICY=index` is intentionally set
- Canonical URLs point to `https://jamieburk.art`
- Sitemap contains canonical public pages only
- Resume PDF indexing policy is intentional
- Final health, robots, sitemap, and route checks pass

## Reviewer Roles

Jamie approves production content, contact, resume, collaborator naming, public
artifacts, and final indexing.

A referral-minded reviewer should answer: what role would you refer Jamie for?

A public-safety-minded reviewer should answer: did anything feel too private or
overclaimed?

A design/type-minded reviewer should answer: does the site feel legible,
distinct, and serious enough for the intended audience?

