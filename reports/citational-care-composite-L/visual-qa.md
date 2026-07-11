# Citational Care Composite L Visual QA

Date: 2026-07-11

This report is the review ledger for citation rendering on:

- `/`
- `/work`
- `/work/callnyc`
- `/work/technical-operations`
- `/colophon`

## Completed In This PR

- Citation markers use superscript numerical links.
- Citation notes use a native ordered list inside `role="doc-endnotes"`.
- Backlinks use `role="doc-backlink"` and are hidden in print.
- Source links use human-readable labels rather than raw URLs.
- Private and summary-only sources render labels only.
- The CSS includes focus-visible outlines, `:target` note highlighting,
  `scroll-margin-top`, wrapping source-link rows, and print URL expansion.
- The Technical Operations heading was reduced at the base breakpoint to avoid
  320 px overflow risk before returning to the larger size at `sm`.

## Automated / Deterministic Coverage

- `npm run check:citations` validates citation structure and forbidden public
  locators.
- `npm run test:citations` validates page-local numbering, repeated occurrence
  ID support, note/backlink ID shape, private-source behavior, correction
  references, negative-search caveats, media distinctions, and DPUB-ARIA roles.
- Server-rendered smoke checks should inspect `/work/callnyc`,
  `/work/technical-operations`, `/colophon`, `/robots.txt`, `/sitemap.xml`, and
  `/api/health` before merge.

## Manual / Preview Checklist

- [ ] 320 px width: no horizontal overflow.
- [ ] 375 px width: no horizontal overflow.
- [ ] 768 px width: citation markers do not collide with punctuation.
- [ ] 1024 px width: notes wrap source titles and links.
- [ ] 1440 px width: note measure remains readable.
- [ ] Keyboard focus is visible on noteref links.
- [ ] Noteref target lands below the sticky header.
- [ ] Target note is visibly identifiable.
- [ ] Backlink returns to the citation.
- [ ] Print retains notes and hides navigation-only backlinks.
- [ ] CSS-off document remains understandable.
- [ ] JavaScript-disabled navigation works.
- [ ] Browser console has no errors.
- [ ] Rendered HTML has no duplicate IDs.
- [ ] Rendered HTML exposes no private locator.

## Suggested Screenshots For PR Review

Attach screenshots rather than committing a large binary set unless the repo
adopts screenshot tracking later:

1. CallNYC desktop.
2. CallNYC 320 px.
3. Citation keyboard focus.
4. Target note and backlink.
5. Technical Operations cited proof.
