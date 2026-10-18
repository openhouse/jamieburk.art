# Artifact-specific private reading

A meeting is an event, not a single artifact. A disabled platform feature, a
separate recording, its machine export, and an editorial repair have distinct
provenance. Do not spread a feature-specific restriction across unrelated
artifacts solely because they share an event title. Equally, a different recorder
does not defeat a genuinely event-wide or artifact-specific restriction.

The read-only `read-access` command accepts a private manifest and an existing
source file. It checks the observed bytes against an artifact-bound authorization
and an explicit restriction inventory. Unknown restriction scope fails closed.
The inventory and interpretation require source review; passing a structural
check is not a legal determination, independent proof of consent, or permission
to make a new recording or provider upload.

```sh
node scripts/audio-workflow/cli.mjs read-access --manifest /private/custody/access.json --source /private/custody/reader.md
```

Keep manifests, actual locators and restriction evidence in private custody.
Public tests use synthetic artifacts only. The command emits reason codes and
authority boundaries, not private source text, titles, identities or locators.
Existing held workflow jobs remain held. An authorized separate artifact receives
its own record; never rewrite a historical receipt to imply earlier processing.

Private reading must retain full source coverage, ambiguity, explicit deferrals,
and the difference between a request, acceptance and delivery. A situated voice
entry uses that person's own attributed words, not another person's report of
them. Unresolved setup audio and overlapping farewells remain unassigned.
