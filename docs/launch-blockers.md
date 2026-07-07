# Launch Blockers

Production remains blocked until:

- Jamie approves the exact resume PDF.
- Jamie approves exact public contact presentation.
- `NEXT_PUBLIC_ROBOTS_POLICY=index` is intentionally set for production.
- Staging noindex is verified.
- Production sitemap and canonical URLs are verified.
- No visible public TODOs remain.
- No private/draft work items are published.
- No private/proprietary font files are committed or served.
- Public-safety and production preflight scripts pass.
- Proof metrics are approved or softened.
- Collaborator-sensitive language is approved.
- Route redirects are confirmed.
- Jamie approves the exact commit for production promotion.
- Knowledge Bank claims marked `needs-review` are either approved, softened, or not rendered.

## Current Open Production Questions

- Confirm final public email and optional LinkedIn/GitHub URLs through deployment environment variables.
- Confirm exact staging commit before promotion.
- Confirm whether any collaborator names, quotes, screenshots, or photos should be added later. The current branch does not need them.
- Confirm whether CallNYC Politico coverage should be linked after exact citation review.

## Not Blockers

- Protected evidence staying private.
- Lack of raw archive publication.
- Lack of screenshots where consent or privacy is unresolved.
- Staging remaining non-indexable while review continues.
