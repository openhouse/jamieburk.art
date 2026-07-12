# feature/evals-D QA evidence

## Responsive hard gate

Measured every application-facing route at `320`, `375`, `768`, and `1440`
CSS pixels against the local branch build.

For every route and width:

```text
document.documentElement.scrollWidth <= document.documentElement.clientWidth
document.body.scrollWidth <= document.documentElement.clientWidth
heading.scrollWidth <= heading.clientWidth
```

The pass includes the two previously failing surfaces:

- `technical-operations-320.png`
- `source-backed-team-memory-320.png`

The implementation uses responsive heading type and honest control wrapping. It
does not hide overflow or clip content.

## Case-study tag contrast

The case-study metadata panel now renders inverse tags using Oil White text at
full opacity over a 12 percent Oil White tint on Broadway Blue.

```text
foreground: rgb(238, 239, 236)
effective background: rgb(38, 112, 142)
contrast: 4.80:1
```

See `callnyc-tag-contrast.png`. This clears the WCAG AA `4.5:1` requirement
for normal text. Focus, zoom, citation, and keyboard checks remain separate
parts of the accessibility gate.
