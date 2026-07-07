# Knowledge Bank

This folder is the public-safe editorial and proof layer behind jamieburk.art.

The website is a selected proof surface. The knowledge bank records the safer
internal logic behind that surface:

- what claims may be made;
- what evidence class supports them;
- where they may appear;
- who owns approval;
- what still needs review;
- what should never be implied;
- what protected material must stay outside the repo.

This is not a source dump.
This is not a private archive.
This is not a CMS.
This is not a legal record.
This is not a public route.

Protected evidence stays outside the repo.

## Core Rules

Do not make the reader decode Jamie.

The public site may use only approved, public-safe claims from this bank.

Use the strongest accurate claim, but keep the verb honest. If the work was
collective, use collective language. If the evidence is private, summarize the
source class and keep the protected source outside Git.

If a claim would be unsafe, unfair, embarrassing, or too context-dependent if
quoted publicly, do not put it on the public site.

## Files

- `chad-lens.md`: the editorial standard for making unusual work legible.
- `claims.md`: stable public claim IDs, status, source class, page scope, and
  approval owner.
- `proofs.md`: project-by-project proof map organized around what was unclear,
  what Jamie did, what became usable, and toward what end.
- `anti-claims.md`: claims and implications that must not appear publicly.
- `sources.md`: source classes and source-handling rules.
- `source-policy.md`: compatibility pointer for older branch names.
- `projection-guide.md`: how public surfaces project from the bank.
- `projection-map.md`: claim IDs grouped by public surface.
- `publication-rules.md`: where claims may appear on the public site.
- `launch-blockers.md`: unresolved content, approval, and release blockers.
- `opportunities/`: internal alignment notes for active opportunity contexts.
- `review-checklist.md`: human review checklist before strengthening public
  claims or promoting production.

## Workflow

1. Add or update the claim in `claims.md`.
2. Confirm the source class in `sources.md`.
3. Add project proof context in `proofs.md` when the claim affects a case study.
4. Check `anti-claims.md` for implications the sentence might accidentally make.
5. Project only the approved public wording into the website.
6. Run `npm run knowledge-bank`, `npm run public-safety`, and
   `npm run routes`.

## Public-Site Projection

The public page should be smaller than the knowledge bank. Public copy should
answer:

- What did Jamie do?
- For whom?
- Toward what end?
- What became usable?
- Why does it matter for this role?

The knowledge bank exists so future edits can be bolder without becoming less
true.
