# Proof Intake

Use this when new collaborator notes, archival findings, public links, or
AI-assisted reviews surface possible proof of Jamie's work.

The goal is not to throw anything away. The goal is to preserve the evidentiary
trail in the right layer.

## Three Layers

### Private proof intake

Raw proof belongs outside this public repo. This can include collaborator
emails, private notes, screenshots, exports, transcripts, invoices, private
shared documents, message archives, sensitive project records, or uncertain
memories.

### Validated proof ledger

The public repo may hold a distilled ledger entry once the claim has been
reviewed for truth, consent, public safety, and usefulness. Ledger entries live
in:

- `docs/knowledge-bank/claims.md`
- `apps/www/src/data/proofs.ts`

### Public site projection

The website uses only the subset that helps a reader understand Jamie's role.
It should not mirror the whole bank, and it should never expose raw sources.

## Intake Template

```md
Project:
Date range:
Contributor or source:
Source type:
What Jamie did:
What became usable:
Evidence summary:
Confidence level:
Consent status:
Public-safe wording:
Private/protected boundaries:
Do not say:
Possible site surfaces:
Follow-up needed:
Last reviewed:
```

## AI-Assisted Review Notes

AI-assisted archival notes can help identify patterns, source classes, and
candidate claims. They are not collaborator testimony. If they enter the public
repo, keep only the public-safe claim, evidence posture, guardrail, and
protected boundaries.

Do not publish private record inventories, private paths, private filenames,
correspondence excerpts, subscriber data, billing details, or sensitive
operational context.

## Promotion Rule

Move a candidate claim into public copy only after:

- the claim is in `docs/knowledge-bank/claims.md`;
- the structured proof exists in `apps/www/src/data/proofs.ts`;
- status is `ready` or `careful`;
- guardrails and do-not-say lines are explicit;
- collaborator-sensitive naming, quotes, photos, or artifacts are approved or
  omitted.
