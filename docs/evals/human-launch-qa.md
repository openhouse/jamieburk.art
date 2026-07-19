# Hands-On Human Launch QA

This is the execution record for `PR-025`. Automated preflight output may
prepare and corroborate this review, but it cannot replace human use.

## Candidate

| Field | Value |
| --- | --- |
| Candidate SHA | Pending |
| Review date | Pending |
| Production indexing decision | Pending Jamie approval |
| Primary reviewer role | Pending |
| Screen-reader reviewer role | Pending |
| Trusted-reader role | Pending |

## Route Tasks

Test every canonical route on the exact candidate:

- homepage, Work, Technical Operations, every case study, Resume, About,
  Contact, Colophon, and Source-Backed Team Memory;
- keyboard-only navigation, visible focus, skip link, headings, link purpose,
  citations, external-link behavior, and primary actions;
- mobile use at 320 and 375 CSS pixels on a real device where possible;
- desktop use at 1280 CSS pixels or wider;
- VoiceOver with Safari on macOS or iOS for navigation, headings, links,
  citations, and resume/contact paths;
- contrast, zoom to 200 percent, reduced motion, and text reflow;
- every page of the resume PDF, machine-readable text, links, clipping, phone
  policy, and download behavior;
- redirects, canonical URLs, sitemap, robots, OpenGraph, health response, TLS,
  `www` behavior, and rollback note.

## Result Matrix

| Surface | Keyboard | Screen reader | Mobile | Contrast / zoom | Links | Content and privacy | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Primary navigation and homepage | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Work index and case studies | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Technical Operations | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Resume HTML and PDF | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| About, Contact, and Colophon | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Lab | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Production metadata and redirects | N/A | N/A | Pending | N/A | Pending | Pending | Pending |

## Trusted-Reader Question

> I understand what Jamie does, and nothing feels private, overstated, broken,
> or confusing.

Response: **Pending**

`PR-025` cannot pass until all high-severity findings are closed, the trusted
reader answers affirmatively with caveats dispositioned, and Jamie approves the
exact candidate and indexing state.
