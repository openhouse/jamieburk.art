# Human Launch QA Protocol M

Status: `pending-human-review`

Run this protocol on the exact candidate that may be shared or deployed. Record
the commit SHA, candidate content hash, rubric hash set, evidence snapshot hash,
staging URL, browser and assistive-technology versions, date, and reviewer
class. A later material change resets the hands-on review.

## Browser And Accessibility

- Visit every canonical route and redirect with keyboard-only navigation.
- Verify skip link, visible focus, heading order, link purpose, citation return
  behavior, and modal or disclosure focus where present.
- Use VoiceOver or an equivalent screen reader for home, Work, Technical
  Operations, resume, Contact, and one long case study.
- Review 320 px and 375 px mobile widths, desktop, 200 percent zoom, text
  reflow, contrast, reduced motion, and horizontal overflow.
- Verify that images and artifacts have useful alternative text and that
  decorative media is ignored by assistive technology.
- Confirm the resume PDF has selectable text, working links, no clipping, the
  approved phone policy, and a predictable download action.

Automated lint, type, route, and browser checks support this review; they do not
complete it.

## Runtime And Release

- Confirm `/api/health`, TLS, apex and `www` behavior, canonical URLs, sitemap,
  robots metadata, `X-Robots-Tag`, and the staging noindex policy.
- Confirm the built runtime serves static assets and the resume PDF on
  `PORT=3000`.
- Record the exact candidate deployed to staging and the exact candidate
  proposed for production.
- Document the rollback command or known-good image before cutover.
- Keep production deployment and indexing as Jamie's explicit decisions.

## Whole-Graph Public Safety

Perform a whole-graph mosaic privacy review across claims, citations, project
pages, dates, names, screenshots, and linked public sources. A set of
individually public-safe details can become identifying or harmful in
combination. Hold or generalize combinations that create that risk.

## Drift And Receipt

The deterministic receipt records the rubric hash set, policy hash set,
candidate content hash, evidence snapshot hash, checker version, command,
result, and decision. Any
rubric, evidence, policy, or public-projection drift requires a new receipt.
Human observations stay pending until performed and are not replaced by a
passing hash check.
