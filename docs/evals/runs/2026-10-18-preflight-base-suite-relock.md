# Base-suite maintenance relock

The retained composite lock referenced portfolio suite version 3 at commit
`851db33bd8a2b3ddd64ff9d3c4319487ef8750c4`. The version number did not change
when later commits added requirements. This maintenance pass compares those
bytes to the current suite rather than treating equal version numbers as equal
rubrics.

- Previous canonical base digest: `09bf36049d6947d5200814ee7afe6ab4810ba7797d98ee573ef7eba1a2bdd8d7`.
- Current canonical base digest: `3c6f84bcdc711cb458e575eb301dc2b9bf40d5cda461a9b4298b7d4bd17522df`.
- Relocked composite digest: `41ca29153aa3d86a552467b8d1c09e7aac57e31623795f6c5aa72e60c59c7e95`.

## Semantic delta

PR-004 now checks visitor-facing language across resume, contact and shared
actions, including source/built HTML checks and a mobile resume review. PR-017
adds a blocking, source-independent public engagement pathway requirement.
To retain the 100-point budget, PR-001 changes from 10 to 9, PR-005 from 11 to
10, PR-007 from 4 to 3, and PR-014 from 8 to 6; PR-017 receives 5. Those existing
blocking criteria remain mandatory regardless of their weight. No existing
pass criterion or threshold was removed or relaxed.

The composite's nine criteria, two independent exact-candidate holdouts,
not-observed rule, grader separation, source-tree fingerprint and human gates
are unchanged. This relock records the already-landed base-suite changes; it
does not record a passing review. New final composite reviews remain required
after all candidate changes and derived reports are complete.
