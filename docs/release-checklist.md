# Release Checklist

## Local Checks

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run check
npm run check:production
```

## Staging Checks

- Deploy the reviewed commit SHA to `jamieburk-art-staging`.
- Verify `https://staging.jamieburk.art`.
- Confirm `/api/health` reports staging values.
- Confirm `/robots.txt` disallows `/`.
- Confirm responses include `X-Robots-Tag: noindex, nofollow`.
- Confirm `/sitemap.xml` uses staging URLs.

## Production Checks

- Use the same reviewed commit SHA that passed staging review.
- Set `APP_ENV=production`.
- Set `SITE_URL=https://jamieburk.art`.
- Set `NEXT_PUBLIC_SITE_URL=https://jamieburk.art`.
- Set `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- Set `NEXT_PUBLIC_CONTACT_EMAIL` to the approved public email.
- Run `npm run check:production`.

## Content Approval

- No unresolved `TODO: Jamie approval required` markers in public content.
- Named projects have quick purpose frames.
- Copy uses action verbs and makes Jamie's role visible.
- Specialized terms and acronyms are defined or avoided.
- Claims answer toward what end.

## Resume Approval

- Resume PDF is final for launch.
- Resume PDF downloads from `/resume`.
- Resume PDF has selectable text.
- Resume page contains no placeholder or approval-warning copy.
- Phone number appears only in the approved resume PDF unless Jamie separately approves public site placement.

## Contact Approval

- Public email is approved.
- LinkedIn URL is approved or intentionally omitted.
- GitHub URL is approved or intentionally omitted.
- Blank optional social URLs do not render placeholder rows.

## Metrics Approval

- Proof metrics are approved, softened, or removed.
- `apps/www/src/data/proofs.ts` claims, source-basis notes, confidence labels,
  visibility labels, public-use rules, and guardrails are approved.
- Contribution language does not overclaim.
- Private dashboards, internal revenue details, and customer data remain offline.

## Accessibility QA

- Check 320px mobile width.
- Check 375px mobile width.
- Check tablet.
- Check desktop.
- Verify keyboard navigation.
- Verify skip link.
- Verify visible focus states.
- Verify one H1 per page.
- Verify clear heading hierarchy.
- Verify link text is clear out of context.
- Verify contrast for Broadway blue, badges, buttons, and proof strips.
- Verify reduced-motion behavior.

## SEO / Indexing QA

- Staging remains noindex.
- Production canonical URLs use `https://jamieburk.art`.
- Production sitemap URLs use `https://jamieburk.art`.
- Production robots settings allow indexing only after approval.

## Public-Safety QA

- No private material is committed or exposed.
- No credentials or secret-like strings are committed.
- No private font files are committed.
- No unapproved screenshots, photos, quotes, or collaborator names are published.
- Case studies preserve Known / Open / Protected boundaries.

## Deployment / Rollback

- Deploy staging first.
- Promote only the reviewed commit SHA.
- Keep previous production SHA available for rollback.
- Verify all main routes return 200 after deployment:
  `/`, `/work`, `/work/technical-operations`, `/work/harry-j-epstein`,
  `/work/fair-rent-nyc`, `/work/callnyc`, `/proofs`,
  `/lab/source-backed-team-memory`, `/resume`, `/contact`, `/colophon`,
  `/robots.txt`, `/sitemap.xml`, and the resume PDF path.

## Final Jamie Approval

- Jamie approves content.
- Jamie approves resume.
- Jamie approves contact values.
- Jamie approves metrics.
- Jamie approves screenshots and artifacts.
- Jamie approves collaborator names, credits, photos, and quotes.
- Jamie approves final staging review before production.
