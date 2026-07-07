# Release Checklist

## Staging Review

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run check`
- [ ] `npm run public-safety`
- [ ] `/api/health` returns staging values.
- [ ] `/robots.txt` disallows all.
- [ ] `/sitemap.xml` uses staging URLs only.
- [ ] Responses include `X-Robots-Tag: noindex, nofollow`.
- [ ] Contact page has no visible TODO rows.
- [ ] Resume page links to the approved public PDF.
- [ ] No placeholder resume copy remains.

## Trusted Referrer Review

- [ ] Homepage explains Jamie's role in 30 seconds.
- [ ] Work cards answer what was unclear, what became usable, and toward what
      end.
- [ ] Technical Operations page clearly maps to delivery coordination, risk
      surfacing, onboarding, documentation, reporting, and durable handoffs.
- [ ] Source-Backed Team Memory is framed as method, not finished SaaS.
- [ ] Case-study claims use contribution and collective-work language.
- [ ] Public claims match `docs/claim-register.md`.
- [ ] Screenshots, photos, metrics, collaborator names, and credits are approved
      or omitted.

## Production Release

- [ ] Deploy the exact staging-reviewed commit.
- [ ] TLS is enabled for `jamieburk.art` and `www.jamieburk.art`.
- [ ] `www.jamieburk.art` redirects to `jamieburk.art`.
- [ ] `/api/health`, `/robots.txt`, `/sitemap.xml`, `/resume`, `/contact`, and
      representative work routes return expected responses.
- [ ] Rollback SHA or Dokku release is recorded.

## Production Indexing

- [ ] Jamie approves every public page.
- [ ] Claims, credits, screenshots, photos, and resume contact details are
      approved.
- [ ] `docs/claim-register.md` is current for the released public wording.
- [ ] Production canonical, OpenGraph, and sitemap URLs point to
      `https://jamieburk.art`.
- [ ] `NEXT_PUBLIC_ROBOTS_POLICY=index` is explicitly configured.
- [ ] Production indexing is smoke-tested after deploy.
