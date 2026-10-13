# Resume and reader-facing language review

Date: October 13, 2026. Starting public candidate: `aa0cd516eed41bc792d08826369bc0a571e77df0`.

## Bounded improvement

The reported resume note addressed the publishing team, not a visitor. Removed
that note, separated the role from the specialty, and replaced the long opening
inventory with a shorter summary. Download and contact actions are unchanged.

An independent copy audit found the same failure in four case-study publisher
notes. The shared component no longer renders `publicSafety.note`; the internal
data remains unchanged. Visitor-facing `careNote`, source basis, citations,
collective credit and evidence limits remain intact. No factual claim was
strengthened and no resume PDF was changed.

The existing source and built-page checks now reject the original note and the
known publisher instructions. Added test-first cases for multiline source,
inline markup, line breaks, entities, metadata, accessible labels, button
labels, new data files, nested routes and empty builds. A field-specific source
exemption preserves internal notes without exempting adjacent visitor copy or
rendered HTML. The PR-004 editorial rubric now asks who each helper note serves.

See [the deterministic hill-climb receipt](../evals/public-language/runs/2026-10-13-reader-facing-publication-language.json)
for the observed red/green results and limitations. No subjective score or
historical human verdict was rewritten.

## Local verification

- Public-language tests: 23/23 pass; source scan: 81 files, no findings.
- Fresh build and rendered scan: 16 HTML pages, no findings. The first build
  could not fetch configured fonts within the network sandbox; the network-enabled
  retry passed without changing dependencies or font configuration.
- Typecheck, lint, public safety, routes and citations pass. Public safety
  retains 11 existing warnings.
- Browser inspection at 360, 375, 768 and 1280 CSS pixels found no horizontal
  overflow. Role/specialty typography is distinct; both CTA targets are 46 pixels
  high; the PDF link retains its download attribute. Keyboard focus is visible,
  and the contact link reaches the contact page. The 375-pixel composition brings
  Selected impact into the first screen.
- The Fair Rent case study still exposes its reader-facing Claim and care
  limits while omitting the publishing instruction.
- An independent technical review found and then rechecked fixes for an HTML
  tokenizer defect and a line-break bypass. Its final review reported no
  unresolved actionable findings, with 23 tests and both scans reverified.

## Release limits

The final local `npm run check` stops at the existing professor-review gate:
0/6 final passing scorecards match candidate fingerprint
`a7e20d28ac4800252a69324f7eee1e5d66196e0dc7842cdd5f436ab05931986a`.
This is not a full-suite pass. The new copy and local browser inspection do not
refresh those named-reader or human-approval receipts.

This report records pre-deployment evidence. Exact deployed commit, runtime
verification, hosted-check state and rollback reference belong in the existing
pull-request deployment update. Only C review staging is authorized by this
request. Production and indexing remain held. Known-phrase checks complement,
but cannot replace, editorial review of new wording, runtime content or PDFs.
