# Knowledge Bank Intake Queue

This directory is a public-safe receiving surface for leads that are not yet
canonical sources, evidence relationships, claims, or inquiries.

Create a draft:

~~~bash
npm run knowledge:intake -- \
  --title "Public article lead" \
  --kind source-url \
  --summary "Public article requiring close reading." \
  --url "https://example.com/article"
~~~

Add --write only after inspecting the JSON. Protected material may be represented
only by a public-safe summary and opaque --locator ID; it cannot include a URL or
private filesystem path.

Queued records remain status received and projection intent undecided. A
contributor must close-read and migrate the useful result into
apps/www/src/data/knowledge-bank/records.ts or a canonical batch module. Remove
the queue receipt only after its canonical intake ID and relationships exist.

Commands:

~~~bash
npm run check:knowledge-intake
npm run knowledge:query -- --query "CouncilStat"
npm run knowledge:palette -- --surface /work/callnyc
~~~

Publication-palette output includes only active projections authorized for the
exact requested surface. It never edits the website.

