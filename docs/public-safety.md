# Public-Safety Rules

The repo may contain public-safe summaries, approved artifacts, redacted
diagrams, representative artifact descriptions, and documented absence. Private
source material belongs outside the repo and outside the Docker build context.

## Ignored Private Folders

These folders are ignored in Git and Docker:

```text
private/
archive-private/
raw/
transcripts-private/
client-private/
legal-review/
*.private.*
```

## Public-Safety Scanner

Run:

```bash
npm run public-safety
```

Production blockers include visible approval TODOs, placeholder resume material,
private/draft public work states, credential-looking assignments, known private
local paths, raw transcript export markers, private font files, and staging URLs
inside production-facing metadata.

The scanner may warn on words such as "source," "archive," "legal," "private,"
"client," "coalition," "dashboard," "transcript," or "AI." Those terms are not
blockers by themselves because the site needs to name what is protected.

## Review Standard

- Known: public-safe and evidence-backed enough to say.
- Open: needs approval, citation, screenshot, or stronger evidence.
- Protected: intentionally omitted because privacy, consent, client trust, law,
  civic sensitivity, or community safety requires it.

When uncertain in private planning docs, write `TODO: Jamie approval required.`
Public app pages should not show approval TODOs.
