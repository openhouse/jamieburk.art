# Citational care composite G visual QA

Reviewed on 2026-07-11 against the production build at
`/work/callnyc`.

## Captures

- `callnyc-chronology-desktop.png`: canonical opening claims and page-local
  multi-source citations.
- `callnyc-citation-focus.png`: visible 3px ochre keyboard focus on citation
  `[1]`.
- `callnyc-target-highlight.png`: highlighted source target after following
  citation `[1]`.
- `callnyc-mobile-320.png`: opening chronology at a 320px browser viewport.
- `callnyc-sources-mobile-375.png`: Sources and notes at a 375px browser
  viewport.

## Observed behavior

- 9 noteref links, 5 ordered source notes, and 9 occurrence-specific
  backlinks rendered in server HTML.
- No duplicate IDs or broken fragment targets.
- Repeated sources retained one page-local number.
- Multi-source occurrences remained separately focusable.
- Citation and backlink navigation worked without client-side state.
- Source targets were visibly highlighted.
- No horizontal overflow or offscreen citation links at 320px or 375px.
- The Sources and notes fragment cleared the sticky header.
- Browser console contained no warnings or errors.
- Print CSS retained endnotes and public URLs while hiding return links.

The generated registry report is available locally at the ignored path
`reports/generated/citations.md` after running `npm run report:citations`.
