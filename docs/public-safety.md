# Public Safety

This repo publishes a public-safe selected proof site. It must not become a
private archive, raw transcript store, legal-review folder, client document
browser, or private stakeholder list.

## Protected Material

Do not commit or publish:

- private emails or correspondence
- raw transcripts or private coalition notes
- legal-review materials
- health or financial details
- credentials, tokens, private keys, or non-example env files
- private stakeholder lists, customer data, or vendor terms
- internal analytics dashboards or raw revenue detail
- client-private materials
- raw community records, attendance lists, addresses, or guest data
- unapproved photos, screenshots, quotes, collaborator names, or artifacts
- private, proprietary, or unlicensed font files

## Approved Public Forms

Use public-safe summaries, redacted examples, representative diagrams, approved
artifacts, public sources, and careful collective-work language. When a claim is
collective, use language such as "helped," "supported," "contributed to," or
"co-built" unless Jamie has explicitly approved stronger wording.

Use the Known / Open / Protected model on case studies:

- Known: approved public claims, public sources, or source-backed summaries.
- Open: claims, screenshots, names, metrics, or artifacts still awaiting review.
- Protected: private material that stays outside the repo and off the public
  site.

Maintain stronger claim language in `docs/proofs-bank/` before it appears in
app copy. The proofs bank can name aggregate facts, source classes, public-safe
source IDs, wording, and approval boundaries without publishing private source
material.

Documentation may name protected categories without exposing private details.
The point is to make the boundary visible, not to publish the source material.

## Repo Boundaries

The repo ignores these local-only folders:

- `private/`
- `archive-private/`
- `raw/`
- `transcripts-private/`
- `client-private/`
- `legal-review/`

Do not add a `private/README.md` or any other committed file inside those
folders. If private material is needed for review, keep it outside the repo.

## Checks

Run:

```bash
npm run check:public-safety
```

The check blocks credential-looking strings, tracked env files, private source
folders, local font files, placeholder resume files, and production-facing
approval TODOs. It warns on sensitive category words outside docs because naming
a risk is allowed; accidentally publishing source material is not.

For production, run with approved environment values:

```bash
npm run check:production
```

Production requires `SITE_URL=https://jamieburk.art`,
`NEXT_PUBLIC_SITE_URL=https://jamieburk.art`,
`NEXT_PUBLIC_ROBOTS_POLICY=index`, and an approved
`NEXT_PUBLIC_CONTACT_EMAIL`.
