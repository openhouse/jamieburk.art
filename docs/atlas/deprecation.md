# Deprecated feature-evals knowledge banks

The knowledge banks in `feature/evals-A` through `feature/evals-N` are frozen
reference sources at the exact commits in `feature-evals-integration.json`.
They are not future authoring surfaces or runtime dependencies.

Atlas retains them in four forms:

1. exact source commits and blobs reachable through Atlas Git ancestry;
2. a complete content-addressed artifact inventory;
3. queryable semantic identifiers, variants, abstracts, and safe locators; and
4. complete canonical Atlas records for the selected authoritative lifecycle
   and public-proof layer.

New work depends on Atlas. Corrections create new Atlas records and correction
relationships; they do not rewrite frozen source history. Deleting branch refs
is safe only after the Atlas merge ancestry and an independent source bundle
have been retained. Squash-merging Atlas breaks the ancestry guarantee.
