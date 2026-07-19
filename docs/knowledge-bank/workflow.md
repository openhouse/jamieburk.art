# Knowledge Wiki workflow

## Read

1. Open [the Knowledge Wiki root](README.md).
2. Open Markdown Preview to the side.
3. Follow ordinary relative links and heading fragments.
4. Search a stable ID when path or title language is uncertain.
5. Use Find All References for inbound links, then compare the generated
   backlink view.

## Author

1. Start with a reader task and an existing record kind.
2. Give the page a stable ID only when it has enough evidence, relation, review,
   or retrieval value to deserve a record.
3. Use prose links for context and typed relations for machine meaning.
4. Add an anti-claim or boundary when a likely inference is broader than the
   evidence.
5. Keep protected evidence outside the repository; use an opaque existing
   registry ID when necessary.

## Move or rename

1. Preserve `id`.
2. Use VS Code's link-aware move or rename.
3. Update `canonical_path` and typed relation `href` values.
4. Preserve a useful alias when the human-facing name changed.
5. Run `npm run wiki:check` and inspect the graph delta.

## Correct

Create or update a correction record with the previous wording, replacement,
reason, affected surfaces, evidence relationship, and human-review state. Do not
silently erase consequential public history.

## Generate and verify

```text
npm run wiki:graph
npm run wiki:report
npm run wiki:check
npm run wiki:test
npm run wiki:eval
```

Files under `_generated` and `reports/wiki-*` are derived. Do not edit them as
canonical records.
