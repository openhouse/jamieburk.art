# Content Safety

The public portfolio should make the work understandable without exposing the
materials that made the work possible.

## Never Publish

- Private emails or phone numbers.
- Raw transcripts.
- Private coalition notes.
- Legal review materials.
- Health or financial details.
- Private correspondence.
- Unapproved photos, quotes, or screenshots.
- Private/proprietary fonts.
- Credentials, keys, tokens, or secret configuration.
- Private stakeholder lists.
- Internal analytics.
- Client-private materials.
- Raw community records, guest lists, attendance records, or contact sheets.

## Protected Repository Paths

These folders and patterns must remain ignored by Git and Docker:

```txt
private/
archive-private/
raw/
transcripts-private/
client-private/
legal-review/
support-private/
job-hunt-private/
screenshots-private/
private-screenshots/
raw-otter/
*.private.*
```

## Public-Safe Substitutes

- Public-safe summaries instead of raw notes.
- Redacted screenshots instead of full operational interfaces.
- Representative artifacts instead of private source documents.
- Public links instead of local source paths.
- Approximate counts when exact counts would imply false precision.
- Collective-work language where work was collective.
- "Source-backed" language only when the source boundary is clear.

## Scanner Policy

Staging should warn on review terms such as "transcript," "source," "archive,"
"legal," "private," "protected," and "redacted" when they appear near safety
language.

Production should fail on:

- visible Jamie-approval TODOs;
- placeholder resume text;
- private work visibility;
- draft work status;
- raw transcript or raw Otter markers;
- private-folder markers in public app code or assets;
- credential-looking strings;
- private key blocks;
- local private source paths;
- unapproved font files.

False positives should be handled by narrowing scanner patterns or rewriting
public copy. Do not train the team to ignore noisy failures.
