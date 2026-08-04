# Information architecture: Jamie Burkart Sourcebook pilot

## Structural model

```text
START-HERE
  -> generated browse facet
       -> catalog entry
            -> one canonical statement body
            -> controlling official source
            -> Knowledge Wiki interpretation
```

The canonical body is never copied to satisfy a second navigation path.
`catalog.json` owns perspective metadata. Generated browse pages own no facts;
they are rebuildable link routes. The Knowledge Wiki owns claims and
anti-claims. The portfolio remains a selective projection with no new route in
this increment.

## Taxonomy

| Entity | Authority | Identifier form |
| --- | --- | --- |
| Perspective | Sourcebook catalog | `perspective.*` |
| Statement body | Existing governed testimony file | `testimony.*` Knowledge Wiki ID plus SHA-256 |
| Event | Bounded official context | `hearing.*` |
| Person | Public identity | `person.*` |
| Source | Controlling public record | Existing `SRC-*` public source ID |
| Publication packet | Trust-boundary proposal | `publication-packet.*` |
| Interpretation | Knowledge Wiki | existing claim, source, project, and index IDs |

## Navigation

Primary entry is task-oriented rather than biographical: browse a date,
project, theme, or source type; then read the canonical statement. Every record
shows what it establishes and what it does not. Rights and validation reports
remain first-class navigation destinations.

## Progressive disclosure

1. Title, date, public body, and stance.
2. Complete canonical statement.
3. Source locator, editorial state, credit boundary, and anti-claims.
4. Knowledge Wiki synthesis and dependency graph.

Protected archive topology is never a disclosure layer.

## Evolution

The in-repository pilot can later move to a separate public repo by preserving
public IDs and replacing same-commit joins with repository, commit, and export
fingerprint references. Third-party perspectives require a newly reviewed
population and permission matrix; they are not a schema-only expansion.
