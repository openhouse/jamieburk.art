# Public Safety

Public safety is part of the product. The site should make Jamie's work
credible without exposing private source material.

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

## Project-Specific Limits

Harry J. Epstein Company:
No private dashboards, customer data, revenue detail, credentials, vendor
terms, or internal operations documents.

FairRentNYC / NYC Artist Coalition / Commercial Rent Stabilization:
No private coalition notes, raw transcripts, legal-review materials,
stakeholder lists, raw strategy context, private emails, venue-level lease or
landlord details, or unapproved quotes.

CallNYC:
Archived civic-data prototype. Not an official or current City Council service.

WOWList:
No private user data, organizer contact lists, or unapproved community records.

196 / Sunday Dinner:
No guest lists, attendance records, addresses, private stories, raw RSVP data,
or unapproved photos.

KC Town Hall:
No private financial, legal, property, banking, or stakeholder details.

Source-Backed Team Memory:
Lab/method page only for V1. Not production SaaS, legal or medical advice, AI
replacement for judgment, or a private archive browser.

## Production Rule

Production indexing is exact opt-in only:

```ts
export const ROBOTS_INDEXABLE =
  IS_PRODUCTION && process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index";
```
