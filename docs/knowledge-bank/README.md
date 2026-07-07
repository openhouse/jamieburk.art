# Knowledge Bank

This folder is the public-safe editorial and proof layer behind jamieburk.art.

The website is a selected proof surface. The knowledge bank records the safer
internal logic underneath that surface:

- what claims may be made;
- what supports them;
- where they may appear;
- what wording is approved, softened, open, or protected;
- who still needs to review a claim;
- what should never be implied;
- what protected material must stay outside the repo.

This is not a private archive.
This is not a raw evidence room.
This is not a CMS.
This is not a public page.
This is not a legal record.

Protected evidence stays outside the repo.

## Canonical Structure

- `claims.md`: public-safe claim register and surface map.
- `approval-register.md`: approval states and remaining review blockers.
- `source-classes.md`: source classes and source-handling rules.
- `publication-rules.md`: where claims may appear on the public site.
- `anti-claims.md`: claims and implications that must not appear publicly.
- `review-checklist.md`: human review checklist before strengthening public
  claims or promoting production.
- `opportunities/`: internal alignment notes for employment-facing and
  consulting-facing language.

Typed app projection lives in `apps/www/src/data/proofs.ts`. Public pages may
project selected wording from that file, but the site should not expose the bank
as `/knowledge-bank`, `/proofs`, `/claims`, or `/internal`.

## Workflow

1. Add or update the claim in `claims.md`.
2. Confirm source class and approval state.
3. Check `anti-claims.md` for accidental implications.
4. Confirm allowed public surfaces in `publication-rules.md`.
5. Project only the approved public wording into the website.
6. Run public-safety, route, build, and production preflight checks before
   launch.

## Editorial Rule

Use the strongest accurate claim, but keep the verb honest. If the work was
collective, use collective language. If the evidence is private, summarize the
source class and keep the protected source outside Git.
