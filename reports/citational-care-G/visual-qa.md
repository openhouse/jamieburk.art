# Citational Care Visual QA

Reviewed 2026-07-11 against the production build on a local server.

## Evidence

- `callnyc-desktop.png`: complete 1440px case study and endnotes.
- `callnyc-mobile-320.png`: complete page at the minimum reviewed width.
- `callnyc-mobile-375.png`: complete page at a common mobile width.
- `callnyc-citation-focus.png`: keyboard focus on an inline noteref.
- `callnyc-endnotes-mobile.png`: source target and boundary note on mobile.

## Results

- Nine noteref links resolve to five ordered source notes.
- Repeated sources reuse their page-local number.
- Nine return links resolve to unique occurrence anchors.
- The page contains one semantic `doc-endnotes` region and five real list items.
- Keyboard focus renders a 3px yellow-ochre outline.
- Citation and return navigation work without client-side state.
- No duplicate DOM IDs were found.
- No protected locator or local source path appears in rendered HTML.
- No horizontal overflow or offscreen citation marker was found at 320px or
  375px.
- Browser console review found no warnings or errors.
- The participant photograph is not published.
