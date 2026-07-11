# Citational Care Composite B - Visual QA

Reviewed: 2026-07-11

Route: `/work/callnyc`

## Responsive review

The built production app was inspected at 320, 375, 768, and 1440 CSS pixels.
Each viewport rendered:

- three citation markers;
- three reader-facing citation notes;
- seven public source links;
- no duplicate element IDs;
- no horizontal overflow in the reference list;
- no console errors.

The 320-pixel view preserved readable line lengths, visible citation markers,
and a stable case-study layout. The desktop view kept the references readable
beside the existing metadata rail.

## Fragment navigation

Selecting citation 1 changed the fragment to `#reference-callnyc-1` and landed
on the matching reference. Selecting its backlink changed the fragment to
`#cite-callnyc-event-context` and returned to the originating claim.

The rendered markup and automated tests verify `doc-noteref` and
`doc-backlink` roles, descriptive labels, unique IDs, and distinct backlinks.
Visible `:focus-visible` styles are defined for citation markers and backlinks.

The available browser controller did not successfully synthesize a real Tab
and Enter sequence. A final human keyboard and screen-reader spot check remains
recommended before production publication; this limitation does not affect the
deterministic component, accessibility-markup, fragment, or build checks.

## Source and safety behavior

- Public source titles link to their approved URLs.
- The Wayback capture is described as an archival carrier, not a recovered
  event listing.
- The Digital District participant photograph remains withheld and is absent
  from the public citation projection pending rights and participant review.
- No private path, filename, GPS record, face tag, or participant identity is
  rendered or committed.
- Staging and production indexing behavior was not changed by this work.

## Open follow-up

The approved resume PDF still says "first civic-data hackathon." The public
site and Knowledge Bank use the supported wording "first CouncilStat
hackathon." Update the PDF only through its approved source and generation
workflow.
