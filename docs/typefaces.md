# Typefaces

The V1 type direction is public-safe and font-file-free.

## Current Policy

- The CSS font stack prefers Karla for body, UI, prose, card, and long-reading
  text when available locally.
- The CSS font stack prefers Oswald for label, metadata, section-eyebrow, and
  compact civic-emphasis text when available locally.
- League Spartan is not required for the shipped interface in this branch.
- No private, proprietary, or unapproved font files should be committed or
  served from this repo.
- Production builds must not depend on fetching Google Fonts or any other
  external font service.

Use CSS font stacks and system fallbacks rather than committing font binaries or
requiring remote font fetches during build.
