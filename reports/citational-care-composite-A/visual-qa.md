# Citational Care Composite QA

Date: 2026-07-11

Tested the Node 26 webpack production build in headless Chromium. Docker/Turbopack
verification is recorded separately in the pull request.

## Routes and widths

The following routes returned HTTP 200 with zero horizontal overflow at 320,
375, 768, 1024, and 1440 px:

- `/`
- `/work`
- `/work/callnyc`
- `/work/technical-operations`
- `/colophon`

## Interaction and accessibility

- Four `doc-noteref` links, four source notes, and four `doc-backlink` links were
  present on CallNYC.
- Every noteref had a group-specific accessible name.
- Keyboard focus produced a visible outline and a usable pointer target.
- The first noteref landed below the sticky header at a stable group-based target.
- `:target` highlighting was visible.
- The backlink returned to its exact occurrence.
- Basic noteref navigation worked with JavaScript disabled.
- Original and archive links had distinct labels.
- Sources remained visible in print; navigation-only backlinks were hidden.
- No protected Digital District text appeared in rendered HTML.
- No browser console errors or page errors were observed.

## QA assets

- [CallNYC desktop opening](callnyc-desktop-opening.png)
- [CallNYC 320 px opening](callnyc-mobile-320.png)
- [Inline citation keyboard focus](callnyc-noteref-focus.png)
- [Source-note target](callnyc-source-target.png)
- [CallNYC print PDF](callnyc-print.pdf)

## Correction found during QA

The pre-existing Technical Operations heading overflowed at 320 px because the
48 px word `Implementation` exceeded the content width. The heading now uses a
36 px base size and retains 48 px from the `sm` breakpoint upward. The repeated
five-width pass confirmed zero overflow.
