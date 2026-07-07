# Release Checklist

This is the production go/no-go checklist. Staging may ship with pending
approval notes in docs, but production pages should not contain visible approval
TODOs or placeholders.

## Content and Claims

- [ ] All homepage proof-strip claims are in `public-claims-inventory.md`.
- [ ] Metrics are approved or softened.
- [ ] Collective work uses collective language.
- [ ] No visible `TODO: Jamie approval required` appears in production pages.
- [ ] Screenshots, artifacts, collaborator names, photos, and quotes are
  approved before publication.

## Contact and Resume

- [ ] Approved resume PDF installed at
  `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- [ ] `NEXT_PUBLIC_RESUME_PDF_APPROVED=true` only after that exact PDF is
  approved.
- [ ] No phone number in the PDF unless Jamie explicitly approved that exact
  PDF for public use.
- [ ] Public email approved or hidden.
- [ ] LinkedIn approved or hidden.
- [ ] GitHub approved or hidden.
- [ ] Resume PDF route remains noindex for V1.

## Safety

- [ ] No private/proprietary font files are tracked.
- [ ] No `.env` files are tracked except `.env.example`.
- [ ] No private folders are tracked.
- [ ] Public-safety script passes.
- [ ] Knowledge-bank script passes.

## Deployment and Indexing

- [ ] Staging is noindex/nofollow.
- [ ] Production remains noindex unless Jamie approves indexing.
- [ ] Production indexing requires all three:
  `APP_ENV=production`, `SITE_URL=https://jamieburk.art`, and
  `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- [ ] Sitemap and canonicals are verified.
- [ ] `/lab/source-backed-team-memory` is omitted from the production sitemap
  unless Jamie explicitly approves indexing the lab page.
- [ ] Canonical redirects are present.
- [ ] Production preflight passes.
- [ ] `npm run check` passes.
- [ ] Accessibility spot-check complete.
