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

## Public visual proof

The three priority case studies now render one dated public-web capture each:

- HJE: public New Items collection with filters, product cards, pricing, cart
  actions, and brand artwork;
- FairRentNYC: public campaign explainer text and navigation, framed without
  identifiable participant photography;
- CallNYC: archived issue-first interface and visible unofficial/currentness
  disclaimer, framed without the public-official photograph below it.

Each record includes source URL, capture date, evidence scope, rights status,
alt text, and a caption stating what the capture does not establish. No private
analytics, order data, coalition records, participant images, or internal
materials are included.

At `320` CSS pixels all three figures measured `288` pixels wide, their images
measured `286` pixels wide, and each page retained
`scrollWidth <= clientWidth`.

## Recursive semantic review

Two independent LLM graders evaluated the same public surfaces against the
same clarity, editorial, and voice rubrics. Both initially scored editorial
layering at `0.5`; after one bounded structural and prose revision, both scored
all three semantic criteria at `0.8`.

See `semantic-review.md` for the before/after record and unresolved human and
runtime gates.
