# Sunday Dinner Attendance Workbook Verification

**Reviewed:** 2026-07-15

## Answer First

A protected Sunday Dinner workbook directly supports the portfolio's **300+
gatherings** claim. Its main worksheet contains **345 event-specific columns**
spanning **January 2012 through March 2021**. Of those columns, **340 have a
positive cached yes count**.

This is strong evidence for more than 300 documented gatherings. It is not a
license to publish participant data or to invent an audience total.

## Method

The workbook was inspected as an Excel artifact so formula cells, cached
values, worksheet structure, and event-column labels remained distinct. The
main worksheet contains 711 rows, 393 columns, and 11,414 formula cells.

The public-safe [aggregate
ledger](../data/sunday-dinner-attendance-aggregate-ledger.json) records only
workbook shape, event-column counts, date boundaries, numbering quality, and
claim limits. It contains no participant row.

## Data-Quality Findings

The event labels include repeated numeric prefixes, missing prefixes, a 300th
event label without a three-digit prefix, and livestream-era entries. The
workbook also uses formulas, repeated people, and plus-one behavior. These are
normal properties of a long-running operational record, but they matter for
what can be claimed.

These numbering irregularities are preserved rather than silently cleaned up.

Accordingly:

- event columns are documentary records, not a clean unique in-person-event key;
- cached yes counts cannot be summed into unique attendees, people, meals, or RSVPs;
- the workbook does not establish a complete lifetime population; and
- it does not verify the separate **20+ resident artists** aggregate.

The 20-plus resident-artist aggregate remains a separate proof question.

## Public Safety

Names, phone numbers, email addresses, home and event locations, private notes,
and individual attendance histories remain protected. The public repository
retains no raw workbook row and no underlying Drive locator.

## Publication Decision

The 300-plus gathering lane is selected and now protected-source-backed. The
combined Sunday Dinner / 196 proof remains partially backed because the
resident-artist aggregate requires a separate count methodology.
