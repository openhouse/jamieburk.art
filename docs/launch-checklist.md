# Launch Checklist

Use this as the final review list before production becomes indexable.

## Public Surface

- [ ] Homepage has no visible review markers or placeholder copy.
- [ ] Start Here links include Technical Operations, HJE, FairRentNYC, CallNYC,
  and resume.
- [ ] Technical Operations is visible in the primary nav and footer.
- [ ] `/work/technical-operations` reads as a role-fit proof page.
- [ ] `/contact` shows email, Brooklyn, LinkedIn, GitHub, and resume download.
- [ ] `/resume` links to the approved resume PDF.
- [ ] Source-Backed Team Memory is visible, bounded, and human-reviewed.
- [ ] Public pages do not expose private source material, private transcripts,
  private collaborator context, phone numbers in HTML, or unresolved review
  state.

## Local Gates

- [ ] `npm ci`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run check`
- [ ] `npm run public-safety`
- [ ] `npm run knowledge-bank`
- [ ] `npm run check:routes`
- [ ] `npm run preflight:staging`
- [ ] `npm run preflight:production`
- [ ] Docker build, if Docker is available locally.

## Staging Smoke

- [ ] `https://staging.jamieburk.art/api/health` reports staging and
  `robotsIndexable: false`.
- [ ] `https://staging.jamieburk.art/robots.txt` disallows crawling.
- [ ] `https://staging.jamieburk.art/sitemap.xml` returns valid XML with staging
  URLs and canonical routes only.
- [ ] Resume PDF returns `X-Robots-Tag: noindex, noarchive`.

## Production Sequence

1. Merge reviewed PR.
2. Deploy to staging.
3. Run local and staging checks.
4. Deploy production with `NEXT_PUBLIC_ROBOTS_POLICY=noindex` for soft launch if
   needed.
5. Smoke test production routes, metadata, sitemap, robots, redirects, resume
   PDF header, and contact links.
6. Set `NEXT_PUBLIC_ROBOTS_POLICY=index` only after the indexing decision is
   intentional.
7. Rebuild/redeploy and re-test production robots, headers, sitemap, canonical
   metadata, OpenGraph image, and resume PDF.
