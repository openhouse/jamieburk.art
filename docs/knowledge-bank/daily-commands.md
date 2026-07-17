# Knowledge-bank daily commands

Use `npm run knowledge:intake -- --help` to capture a public-safe source,
artifact, memory, photo, or collaborator lead. The default dry run prints the
validated receipt. Add `--write` only after reading it. Written receipts live in
`intake/receipts.jsonl` as a queue; they do not become canonical claims until a
human-reviewed edit integrates source, observation, evidence, boundary, and
inquiry records in `records.ts` and its imported modules.

Use `npm run knowledge:query` to search record classes, projects, statuses, IDs,
or text. Use `npm run knowledge:report -- --write` for an aggregate lifecycle
report and `npm run knowledge:projection-map -- --write` for the active/held
surface map. Generated reports are deterministic and ignored by Git.

Run `npm run check:projections` after changing any claim, proof, page, card,
resume source, metadata, or citation. It rejects public-registry drift,
unauthorized occurrences, protected citation sources, held wording on a public
surface, and stale superseded wording.

An intake receipt is deliberately weaker than a source record. A source record
is deliberately weaker than a claim. A defensible claim is deliberately
separate from the decision to activate one public projection. These distinctions
let the bank retain depth without making the website carry all of it.
