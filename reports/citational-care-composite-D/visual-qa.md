# Citational Care Composite D: Visual QA

Date: 2026-07-11

Production-mode URL tested: `http://127.0.0.1:3033`

## Viewports and modes

- Desktop: 1440 x 1000
- Mobile: 320 x 900
- Mobile: 375 x 900
- Tablet: 768 x 900
- Text zoom simulation: 200% at 768 x 900
- Keyboard-only navigation
- JavaScript disabled
- Print media emulation

## Results

| Check | Result |
| --- | --- |
| Noteref links | 6 |
| Reference entries | 6 |
| Unique occurrence anchors | 6 of 6 |
| Unique reference targets | 6 of 6 |
| Repeated notes reuse one number | Passed in regression test fixture |
| Backlinks resolve | 6 of 6 |
| Duplicate DOM IDs | 0 |
| Horizontal overflow | None at 320, 375, 768, or 200% text zoom |
| Protected locator in HTML | None |
| Machine-local path in HTML | None |
| Participant photograph published | No; only the governance statement that it remains offline is visible |
| Browser console warnings/errors | 0 |
| JavaScript-disabled navigation | Passed |
| Sources in print | Visible |
| Backlinks in print | Hidden |

The first source target uses a border, background, and the text “Selected source
note,” so target state does not rely on color alone. Noterefs and backlinks have
semantic roles and accessible labels. External links remain ordinary same-tab
anchors.

## Screenshots

- `callnyc-desktop.png`
- `callnyc-mobile-320.png`
- `callnyc-mobile-375.png`
- `callnyc-citation-focus.png`
- `callnyc-source-target.png`

The QA script lived outside the repository and did not contain or capture
private browser state.
