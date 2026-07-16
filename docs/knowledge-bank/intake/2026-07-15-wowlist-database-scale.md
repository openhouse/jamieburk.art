# WOW List Database Scale Verification

**Reviewed:** 2026-07-15

## Answer First

The latest unique protected WOW List database snapshot directly supports the
historical scale already used by the portfolio. A deterministic aggregate pass
recovered **1,846 users**, **16,142 posts or events**, **23,864 tags or lists**,
**28,837 tag follows**, **20,927 stars**, and **15,915 Google Calendar events**.

The geographic result is also defensible with an explicit denominator:
**35 nonblank city or region labels contain at least 50 geocoded posts or
events**. This is the basis for the public phrase **roughly 35 city
ecosystems**.

## Method

The review used the archive-created timestamp to select the latest unique
snapshot, restored it to SQL without running the historical application, and
parsed complete table-copy blocks into aggregate counters. It checked ten
relevant tables for duplicate primary keys and found none. All 16,142 posts or
events had a resolvable geolocation reference; 12,433 mapped to a nonblank city
or region label and 3,709 had a blank or unusable label.

The public-safe [aggregate ledger](../data/wowlist-database-aggregate-ledger.json)
contains the reproducible results and boundaries. It contains no raw rows.

## Claim Boundary

The result supports historical snapshot language, not a current-platform or
official-chapter claim. Thirty-five is a count of city or region labels meeting
a 50-post/event threshold. It does not establish 35 official chapters, 35
currently active communities, 35 distinct organizer groups, or independent
adoption in every label.

The user count is a database-record count, not a verified unique-active-user,
retention, or satisfaction measure. The archive also does not establish
complete uploads, current operation, business impact, or Jamie's sole ownership.
Richard and other contributors retain shared-project credit.

## Public Safety

The underlying database contains email, password, user, organizer, content,
relationship, and precise location material. None of it belongs in this public
repository. Only aggregate results, methods, and non-inferential boundaries are
retained.

## Publication Decision

The aggregate claim is selected because it makes the existing WOW List scale
language reviewable. Independent public-source coverage of adoption and the
project's full collaborator history remains useful research depth.
