# feature/knowledge-j verification

Date: 2026-07-16

Evaluated candidate: `3cae667f95173ff7e6bea678ecd577a94784c94a`

Candidate archive fingerprint: `sha256:555bf876946275633d97a0eb6847cd30f643b52be29e5bb526b351cd6af745cc`

## Recursive iterations

### Iteration 1: baseline implementation

The composite integration established the shared eval contract, lifecycle
workbench, fail-closed governance, CI checks, and public/private boundaries. A
first browser pass found horizontal overflow on Technical Operations and the
Lab call to action at 320 px. Responsive heading and button changes removed both
failures on the next complete pass.

### Iteration 2: inspectability and indexing

An independent exploratory review identified two machine-fixable defects:

- the HTML resume page was sitemap-listed while a broad `/resume/:path*` rule
  also noindexed it;
- the lead portfolio pages described artifacts without consistently exposing a
  genuine public artifact, and the Lab described its method without showing a
  worked example.

The candidate now scopes noindex to the phone-bearing PDF, omits request-time
sitemap timestamps, links the Harry J. Epstein, FairRentNYC, and CallNYC pages
to inspectable public artifacts with source notes, exposes those artifacts from
Technical Operations, and includes a synthetic Known / Open / Protected example.

### Iteration 3: accessibility contrast

The first literal 56-cell viewport and axe matrix found 284 color-contrast
failures on the shared case-study sidebar: seven low-contrast labels and six
tags per case-study route at each width. The shared `TagList` gained an on-dark
variant and sidebar labels moved to a higher-contrast paper color.

The unchanged matrix then passed with zero axe violations and no regressions.

## Browser matrix

All 14 canonical routes were tested at 320, 375, 768, and 1280 px with reduced
motion requested. The 56 passing cells had:

- HTTP 200;
- one `h1` and one `main#main`;
- no horizontal overflow, clipped content, missing images, or unnamed links;
- a visible `Skip to content` link targeting `#main` as the first Tab stop;
- zero axe WCAG 2 A/AA and WCAG 2.1 A/AA violations;
- zero browser console errors.

The 56 temporary full-page screenshots total 36,525,950 bytes and have bundle
fingerprint `sha256:1be09d5dc1733438f9e7dec033875bc8a7204ba2ffb5e6f50878d12114faad5d`.
They were evaluation artifacts, not public-site content, and are not committed.

## Deterministic checks

The following passed under Node 26.5.0 and npm 11.17.0:

- `npm run check`
- `npm run preflight:staging`
- `npm run preflight:production`
- `git diff --check`

The complete check includes 84 citation/archive tests, six composite-contract
tests, 20 portfolio-eval tests, 16 knowledge-bank-eval tests, 11 blind-spot-eval
tests, 19 lifecycle tests, eight integrity mutation tests, typecheck, lint,
production build, compiled-leak detection, public safety, and route checks.

## Container smoke

Image `jamieburk-art:knowledge-j-final` built with digest
`sha256:254f822960f0413591c0e32ac7c4fe7178e8f5fb70959901ea19a887e0172d90`.
The staging-mode smoke test confirmed:

- configured user `nextjs`, runtime UID `1001`;
- healthy staging response with indexing disabled;
- HTML resume HTTP 200 under the environment-wide staging noindex policy;
- PDF resume HTTP 200, `application/pdf`, and route-specific
  `X-Robots-Tag: noindex, nofollow`;
- sitemap contains the HTML resume, omits the PDF, and contains no request-time
  `lastModified` values;
- robots disallows crawling in staging.

The smoke-test container was stopped.

## Honest stop state

Automated and local-browser evidence passes. Release certification remains
human-blocked. The external-transfer ledger still requires explicit informed
approval before public-repository knowledge-bank contents and eval prompts are
sent to an external judge. Human cold-reader observations, candidate-specific
consent for future collaborator-sensitive media, exact production approval,
and live public-domain cutover evidence are also not observed.

`npm audit --omit=dev` reports two moderate advisories through Next.js's bundled
PostCSS version. npm proposes an incompatible forced downgrade rather than a
compatible remediation, so no forced dependency rewrite was applied.
