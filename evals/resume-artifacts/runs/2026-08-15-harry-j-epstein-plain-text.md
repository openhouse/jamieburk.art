# Harry J. Epstein plain-text resume hill climb — 2026-08-15

## Decision

Harry J. Epstein Company remains named in the OTI-tailored resume, but it is
plain text rather than an outbound link. The change keeps attention on Jamie's
experience and preserves the surrounding paragraph's visual rhythm.

## Artifact synchronization

- Markdown SHA-256: `cee950eb8e146578033a9b6c48948ab5e72f182b716e11aa7bdb60dd479be27c`
- Opportunity PDF SHA-256: `8f5039b6327cb12b472b9123ef7919f6f2e9400cc952c6c10e681a06d35536db`
- Public portfolio PDF SHA-256: `8f5039b6327cb12b472b9123ef7919f6f2e9400cc952c6c10e681a06d35536db`
- PDF structure: two tagged US Letter pages, 96,970 bytes
- Embedded typography: Palatino Linotype, Oswald, Karla

Both exported pages were rendered and visually inspected. Harry J. Epstein
Company now matches the surrounding body text, has no underline, and has no
PDF link annotation. Page layout, pagination, typography, Politico New York's
canonical article link, and all other intentional project links remain intact.

## Eval hill climb

The resume artifact gate now accepts a governed `plainTextProjectNames` list.
For every configured project, it rejects both a Markdown link around the label
and the forbidden PDF destination. A mutation test proves the gate detects the
previous Harry J. Epstein link behavior.

## Human gates

- Jamie approves the exact resume and public portfolio before submission.
- Jamie alone uploads and submits the application.
- NYC OTI retains civil-service eligibility, interview, and hiring authority.
