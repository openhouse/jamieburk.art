# Citational Care Visual QA

Date: 2026-07-11

Tested the Node 26 webpack production build in headless Chromium.

## Routes and widths

The following routes returned HTTP 200 with zero horizontal overflow at 320,
375, 768, 1024, and 1440 px:

- `/`
- `/work`
- `/work/callnyc`
- `/work/technical-operations`
- `/colophon`

## Interaction and accessibility

- Three `doc-noteref` links, three source notes, and three `doc-backlink` links
  were present on CallNYC.
- Every noteref had a source-specific accessible name.
- Keyboard focus produced a visible outline.
- The first noteref moved to `#source-callnyc-1` below the sticky header.
- The backlink returned to `#cite-callnyc-announced-schedule-1`.
- The Sources section remained visible in print; navigation-only backlinks were
  hidden.
- No browser console errors or page errors were observed.
- Source titles and links wrapped without horizontal overflow.

## Screenshots

- [CallNYC desktop](callnyc-desktop.png)
- [CallNYC mobile](callnyc-mobile.png)
- [Noteref keyboard focus](callnyc-noteref-focus.png)
- [Source-note target and backlink](callnyc-source-target.png)
- [Colophon citation policy](colophon-desktop.png)

## Correction found during QA

The pre-existing Technical Operations heading overflowed at 320 px because the
48 px word `Implementation` exceeded the content width. The heading now uses a
36 px base size and retains 48 px from the `sm` breakpoint upward. A repeated
five-width pass confirmed zero overflow.
