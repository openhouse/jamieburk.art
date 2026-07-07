# Public Safety

This portfolio is public-safe by design. The goal is not to hide Jamie's record;
it is to make the record defensible without publishing private material.

## Publishing Standard

Use public-safe summaries, aggregate metrics, public links, representative
diagrams, approved artifacts, careful collective-work language, and visible
approval markers.

When uncertain, write:

`TODO: Jamie approval required.`

## Do Not Publish

- Private emails or correspondence.
- Raw transcripts.
- Private coalition notes.
- Legal-review materials.
- Health, family, or financial details.
- Credentials, keys, tokens, passwords, or account details.
- Private stakeholder, customer, user, vendor, organizer, guest, or attendee
  lists.
- Internal analytics, dashboards, or revenue detail.
- Client-private materials.
- Raw community records.
- Raw data exports.
- Private source folders.
- Unapproved screenshots, quotes, photos, or collaborator names.
- Private, proprietary, or unlicensed font files.

## Public-Safe Replacements

- Use aggregate counts instead of raw records.
- Use role language instead of private job-history detail.
- Use public links instead of private source files.
- Use representative diagrams instead of private screenshots.
- Use contribution language for shared outcomes.
- Use Known / Open / Protected framing where a case study needs boundaries.

## Civic And Coalition Work

Collective work needs collective verbs. Prefer:

- helped;
- contributed;
- co-built;
- supported;
- structured;
- stewarded;
- translated;
- documented;
- mapped.

Do not imply Jamie alone led a movement, owned a coalition position, authored
legal advice, or caused a public outcome unless that stronger claim is
separately approved and sourced.

## Production Rule

Production indexing is opt-in only:

```ts
export const ROBOTS_INDEXABLE =
  IS_PRODUCTION && process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index";
```

Staging and local deployments should remain `noindex`.
