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

## Chad Lens

Launch-readiness `v2` adds `CHAD-001`, a two-grader semantic criterion for
reader burden, actor visibility, concrete intervention, usable result, purpose,
and collective-credit boundaries. Both independent baseline graders scored the
current priority surfaces at `0.8`. A complete semantic rescore then exposed an
editorial-layering failure; one bounded deduplication pass raised editorial from
`0.5` to `0.8` while preserving the Chad score at `0.8`.

See `chad-lens-review.md` for the surface findings, stopping decision, and
non-blocking opportunities toward `1.0`.

## NYC Artist Coalition X archival production

Launch-readiness `v13` adds a deterministic full-population disposition gate
for `@NYCArtC`, two public-safe ledgers, eight close-read source records, three
held claim candidates, and a first-party owner-archive inquiry. The recursive
run also records two editorial and one projection-governance failure found and
repaired by independent graders before all agent-mutable criteria passed.

See `nycartc-x-full-population-recursive-run.md` for the population boundary,
stakeholder floors, score progression, exact-candidate browser evidence, and
the runtime and human stop boundary.

## Urbanhermit X archival production

Launch-readiness `v14` adds a deterministic full-live-population gate for
Jamie's personal `@urbanhermit` account. Three independent authenticated passes
reconciled all 434 live profile-counted records while the public repository kept
only a minimized aggregate ledger, selected source leads, bounded claims, and
an explicit all-ever owner-archive inquiry. A recursive semantic pass exposed
and repaired reader-burden, evidence-locator, metadata-stage, and editorial
layering failures before two independent graders passed every mutable criterion.

See `urbanhermit-full-population-recursive-run.md` for the source and stakeholder
findings, held claim palette, score progression, browser evidence, and stop
boundary.
