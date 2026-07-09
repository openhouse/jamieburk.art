# Launch Blockers

Production should not be deployed until this list is clear.

## P0 Complete In This Branch

- Public contact page uses real email, LinkedIn, GitHub, location, resume, and
  Technical Operations proof-page links.
- Resume page no longer contains launch-note copy.
- Resume PDF has been replaced with a two-page text-selectable PDF generated
  from the authorized current resume content.
- Homepage and Technical Operations page foreground operating backbone,
  planning, documentation, decision records, onboarding, reporting, launch
  support, and durable handoffs.
- Robots indexing requires explicit `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- Staging was checked and returns homepage 200, robots noindex, and sitemap 200
  with staging URLs.

## Still Required Before Production

- Redeploy staging from this branch.
- Re-run local and staging route checks after deploy.
- Open the resume PDF manually in a browser.
- Confirm no visible public launch notes or temporary draft language in deployed HTML.
- Soft-launch production with `NEXT_PUBLIC_ROBOTS_POLICY=noindex`.
- Only switch production to `NEXT_PUBLIC_ROBOTS_POLICY=index` after final review.
