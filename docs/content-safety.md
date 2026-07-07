# Content Safety

This site is a public-safe professional proof surface, not a private archive.
Publish summaries, representative patterns, redrawn diagrams, approved public
artifacts, and careful collective-work language.

## Publishing Rules

- Minimize the reader's burden without exposing private context.
- Use action verbs that show what Jamie clarified, structured, coordinated,
  documented, built, co-built, stewarded, translated, synthesized, maintained,
  reported, or improved.
- Use helped / supported / contributed to / co-built where work was collective.
- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Keep unapproved screenshots, quotes, collaborator names, artifacts, and proof
  metrics out of production-facing pages.
- No phone number appears on website pages. A phone number may remain inside the
  approved resume PDF only when Jamie approves that exact PDF for public
  download.

## Known / Open / Protected

Known is public-safe and evidence-backed enough to say. Open needs approval,
citation, screenshot, or stronger evidence. Protected is intentionally omitted
because privacy, consent, client trust, law, civic sensitivity, or community
safety requires it.

## Checks

Use staging checks while content is still under review:

```bash
npm run public-safety
```

Use production checks before indexing:

```bash
npm run production-safety
```

Staging mode may warn on approval-needed language. Production mode fails on
approval blockers. Both modes fail on hard blockers such as secrets, committed
private font files, committed non-example env files, private local paths, missing
resume PDF, or placeholder resume PDF.
