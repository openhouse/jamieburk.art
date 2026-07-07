# Content Safety

Public safety is part of the product. The portfolio should project defensible
public claims from approved summaries, not expose private source material.

## Do Not Publish

- Private correspondence
- Protected meeting exports
- Private coalition notes
- Legal-review detail
- Health or financial detail
- Stakeholder lists
- Internal analytics
- Client-private material
- Raw community records
- Credentials, tokens, passwords, or keys
- Private or proprietary font files
- Unapproved photos, quotes, screenshots, or collaborator names

## Use Instead

- Public-safe summaries
- Redacted representative examples
- Approved public artifacts
- Public websites and public records
- Aggregate wording when exact detail is not approved
- Collective-work language when work was collective
- Known / Open / Protected boundaries in case studies

## Exact Claims

Exact metrics must be present in `docs/knowledge-bank/claims.json` with an
approved status before they appear in production-facing HTML. If approval is not
complete, keep the exact claim in the bank with `needs-jamie-approval` and an
empty `projectedPages` array.

The supplied resume PDF may carry approved resume wording, but the website
should still use the safest public wording unless Jamie approves the exact page
surface.
