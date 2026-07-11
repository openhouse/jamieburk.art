# Citational Care

Citational care is the practice of keeping public claims connected to the
evidence, caveat, and limit that make them responsible to say.

The public principle is:

```text
Here is what we are saying.
Here is what supports it.
Here is the limit of what that source establishes.
Here is what remains unresolved.
```

## Rules

1. A citation supports the exact clause beside it.
2. Stable IDs live in the Knowledge Bank; page numbers are generated.
3. Public citation permission is separate from internal evidentiary support.
4. One claim may require multiple sources.
5. Caveats remain attached to claims and sources.
6. Private evidence can support an internal claim without becoming a public link.
7. "Not recovered" is a research finding, not positive evidence.
8. The website projects from the Knowledge Bank; it does not expose the entire bank.
9. Citations should lower reader burden, not turn the page into a research memo.
10. Citational care preserves confidence and uncertainty at the same time.

## Repo Model

Structured citation data lives in `apps/www/src/data/citations/`.

- `sources.json` records source class, original URL, archive URL, rights posture,
  public-citation permission, caveat, and last review date.
- `claims.json` records exact claim wording, support relationships, status,
  confidence, guardrails, and allowed projection surfaces.
- `notes.json` records the public editorial note attached to a claim, the
  sources used by that note, and whether original or archive links should render.
- `pages.json` records page-local citation order by note ID and occurrence IDs.
  Display numbers are generated from this order and must not be stored as stable
  data.
- `research-findings.json` records search results such as "not recovered" so
  they do not get mistaken for positive evidence.
- `media.json` records rights, consent, caption, alt text, and publication
  status for photographs and other visual artifacts.
- `corrections.json` records factual corrections without turning the public page
  into a correction ledger.

The public website consumes this structured layer through server-rendered
components. The Knowledge Bank can hold more structure than the public page
shows, but it must remain public-safe because the repository is public.

## Boundaries

Do not commit private source paths, private archives, raw transcripts, private
correspondence, unapproved photographs, unapproved screenshots, credential
material, internal analytics, or collaborator-private context.

Private evidence may justify an internal confidence level, but public pages
should cite only sources that are public-safe and approved for public citation.
If a source is private, pending rights, or consent-sensitive, keep it out of the
public projection until review is complete.

## Contributor Checklist

Before adding a cited public claim:

1. Add or update a stable claim record.
2. Add or update source records.
3. Attach caveats to the exact claim/source relationship.
4. Add the page-local projection and occurrence ID.
5. Render the claim with `<Citation />` and the page with `<References />`.
6. Run `npm run citations` and `npm run check`.
