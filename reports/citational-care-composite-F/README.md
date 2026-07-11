# Citational care composite F: visual and runtime QA

Reviewed July 11, 2026 against `feature/citational-care-composite` at
`5d57171ab6e6d643ca8e57efc41578791830142b`.

## Browser observations

- Desktop, 1425 x 990 content viewport: the cited opening reads clearly before
  the notes; markers follow first appearance; the right-hand project summary
  remains separate from the citation system.
- References, desktop: six page-local notes are ordered and legible. Original
  posts, archived copies, contextual carriers, public sources, and governed
  summary-only evidence use distinct labels.
- Navigation: eight citation occurrences resolve to six notes. Citation 4 is
  reused three times and renders three distinct backlinks. Forward and return
  links update the URL fragment without JavaScript-specific behavior.
- Keyboard: focusing citation 1 produced a 3px solid ochre outline.
- Target state: following citation 1 highlighted its complete evidence note
  with a pale ochre background.
- Mobile, 320 x 844 browser viewport: no content overlap or content-width
  overflow was observed. Eight citation occurrences and all six reference notes
  remained present.
- 200% equivalent reflow: a 1440 x 1000 desktop viewport was tested at a
  720 x 500 CSS-pixel viewport. There was no horizontal content overflow.
- Browser console: no errors.

The in-app browser did not expose its native print-preview surface. The print
stylesheet and automated citation contract were therefore checked directly:
reference URLs print after links, backlinks and the correction invitation are
hidden, targets do not retain screen-only highlighting, markers remain inline,
and source blocks avoid breaking across pages.

## Screenshots

1. `01-callnyc-desktop-opening.jpg`
2. `02-callnyc-desktop-references.jpg`
3. `03-citation-target-highlight.jpg`
4. `04-citation-keyboard-focus.jpg`
5. `05-callnyc-mobile-320.jpg`

## Runtime checks

- `npm run check`: passed, including typecheck, lint, citation validation,
  citation tests, production build, Knowledge Bank, public safety, and routes.
- `npm run preflight:staging`: passed with staging noindex values.
- Docker staging image: built and ran successfully.
- Docker routes: `/api/health`, `/work/callnyc`, `/robots.txt`, and
  `/sitemap.xml` returned 200.
- Container-rendered CallNYC HTML: eight `doc-noteref` markers, one
  `doc-endnotes` region, eight `doc-backlink` links, and no private filesystem
  path.
- Staging robots response: `Disallow: /`; production indexing was not enabled.
