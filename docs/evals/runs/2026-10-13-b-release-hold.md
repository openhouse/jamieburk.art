# B release is held

The corrected public candidate is not ready to deploy. The latest independent
readings found a historical-evidence gap; the required final reviews remain unmet.
Staging B has not been changed by this release attempt. Production and indexing
also remain unapproved.

## What the independent readings found

Three fresh, isolated advisory readers reviewed professor candidate
`d0eee54723f9d1e8f420ec7a0e933f5cc6e6fd39e9d23b13eea0a7f0242a1f19`.
Their PR-015 scores were 3, 4, 4. Their PR-016 scores were 3, 3, 3.
The actual named people did not participate or approve the work.

The six raw scorecards remain unchanged under
`docs/qa/evals-H/*-pre-label-correction-2026-10-13-*.json`.
Earlier passing editions refer to earlier candidates; they are history, not
approval of this candidate. The active professor ledger now points to the held
readings rather than those earlier passes.

The readers independently found that descriptive campaign-memory cards and
reconstructed workflows do not supply three publicly demonstrated, complete
observe/model/prototype/use/learn/revise/handoff loops. A current storefront
does not prove a particular historical iteration. Circulation does not prove
resident usability testing. A planned acceptance workflow does not establish
that the planned residency happened.

## Bounded corrections after that review

- The resume action now has measured 5.59:1 text contrast in default, hover,
  and keyboard-focus states. Its keyboard outline also measures 5.59:1.
  These states are checked at all four supported widths.
- Technical Operations labels its evidence as public evidence, distinguishing
  reconstructions and summaries from withheld original records.
- Text-only artifact cards explicitly say “Public summary.” No new historical
  testing, feedback, completed outcome, or handoff is asserted.
- The existing Market Hotel, Sunday Dinner, and KC Town Hall cover uses now
  have accurate homepage, work-index, and case-study occurrence bindings.
  The August 13 portfolio authorization already covered editorial selection,
  responsive crops, public Git, and staging review. These records grant no new
  permission and do not approve production or indexing.
- A new photo regression checks observed rendered image/route pairs against
  their matching asset, derivative, occurrence, and permission source. The
  missing homepage bindings failed before repair and pass afterward.

The corrected professor candidate is
`c72b3d03fcfca73fd74dd063179e3e16d48959924a889b1134386d2c768b1faa`.
It has not received new professor or composite approval. The old grades have
not been rebound to these corrected bytes.

## What remains

1. Identify approved, source-specific evidence of actual use, feedback,
   revision, and handoff for three full examples. Keep protected source
   material private; seek any needed human decision before publishing it.
2. Commission fresh independent readings only after the underlying evidence
   materially changes. Do not rerun judges merely to obtain a higher score.
3. Once prerequisites pass, obtain two acceptable composite judgments for
   the exact full source tree and run the complete release checks again.
4. Deploy only the verified B candidate to staging B. Production and indexing
   remain separate human decisions.

The current responsive accessibility matrix, source checks, build, and review
holds are separate evidence. Green technical checks cannot override a held
review or supply missing historical evidence. The complete command and the
full check census are recorded by the release operator; a held result is not
reported as a pass.

## Verification results

The serial `npm run check` exits 1 at `evals:professor-lenses`. The separate
89-command census completed: 85 commands exit 0; these four exit nonzero:

- `npm run evals:professor-lenses`
- `npm run test:professor-lenses`
- `npm run evals:composite`
- `npm run test:composite`

The professor hold concerns the last reviewed fingerprint and non-unanimous
readings. Composite criteria COMP-006 and COMP-009 remain unmet. The current
candidate does not inherit either older passing result.

The census also exposed a unit-test setup that used stale real scorecards before
testing duplicate rejection. Only the two new fixtures were repaired afterward:
they now use explicitly synthetic, in-memory candidates and cards, and assert
the reviewer criterion alone. Both focused regressions pass. The complete
professor test suite is now 13/14; its remaining failure is the current-candidate
release integration test. No synthetic fixture is saved as review evidence.

Passing current checks include the 60-case responsive matrix, 15 accessibility
evidence tests, four visual-freshness tests, 37 photo tests, the 18 photo checks
and six criteria, the Wiki's 505 records / 1,837 edges / 576 prose links with
zero orphans, and the app's typecheck, lint, and staging-mode build.

Named human-reader acceptance remains **FAIL, 0/8**. Its availability command
exits 0; that is not human acceptance or corroboration.

The raw census helper retained a baseline `candidateCommit` value of
`82f550d56c48a67990f350eea4d859555a2e56fa`. That field is not the tested source
head. The serial receipt directly records source head
`bacdfd7f58d098363ef625db5da5ad6a9cbc594d` and a full-source fingerprint.
The raw census is preserved unchanged. The subsequent fixture-only rerun and
final serial check are separate observations, not a relabeled full census.

Staging B returned HTTP 200 and `noindex, nofollow` on October 13. Its health
response identifies the staging B URL, `isProduction: false`, and
`robotsIndexable: false`. No deployment was performed.
