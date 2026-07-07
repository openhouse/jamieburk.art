# Public-Safety Checks

The portfolio uses public-safe summaries and approved artifacts. Private source
materials stay outside the repo.

## Private Folders

These names are ignored by Git and Docker build context:

```txt
private/
archive-private/
raw/
transcripts-private/
client-private/
legal-review/
*.private.*
```

## Scanner

Run:

```bash
npm run public-safety
```

The scanner checks the served app source, public assets, public resume PDF text
when `pdftotext` is available, package scripts, and required ignore entries.

Hard blockers include visible approval TODOs, placeholder resume copy, draft or
private work items, credential-looking strings, private local source paths,
private folder markers, raw transcript markers, and private font files.

Words such as source, archive, legal, transcript, private, client, dashboard, and
AI are warnings by themselves. They can appear in public-safe explanations when
the surrounding context is clear.

## Review Posture

Staging may surface warnings for human review. Production must have zero
blockers before indexing is enabled.
