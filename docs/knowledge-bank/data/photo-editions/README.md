# Photo Edition Snapshots

This directory may hold public-safe, versioned occurrence snapshots for
human-directed comparison with `npm run photos:edition -- --compare <path>`.

A snapshot must contain an edition `id` and an `occurrences` array. It may not
contain private source locators, permission correspondence, Apple Photos
identifiers, or unrestricted source metadata. Comparing editions reports
additions, removals, and changed occurrences; it never chooses or publishes an
edition.
