# Scope and coverage

## Population

The pilot population is all three entries marked `recovered-full-text` in
`docs/knowledge-bank/data/public-testimony-corpus-2026-07-28.json` as of the
August 3, 2026 implementation review.

| State | Count |
| --- | ---: |
| Eligible recovered full-text statements | 3 |
| Included | 3 |
| Excluded | 0 |

This is complete for that named governed population, not for everything Jamie
has ever said in public.

## Deliberate exclusions

- Public appearances whose verbatim statements have not been recovered.
- Prepared remarks that were not delivered.
- Third-party speech from the hearings; the existing heteroglossia indexes
  retain metadata and point to controlling official transcripts without
  republishing raw third-party speech.
- Recommendation letters, correspondence, direct messages, private
  transcripts, educational records, and protected relationship evidence.
- Photographs. Candidate discovery and rights review remain separate from
  public media projection.

## Source cutoff

The pilot freezes the governed public-testimony corpus reviewed July 28, 2026
and the exact statement bodies fingerprinted in `catalog.json`. A new statement,
body correction, or source replacement changes the candidate and requires a
fresh build, eval pass, and human publication review.
