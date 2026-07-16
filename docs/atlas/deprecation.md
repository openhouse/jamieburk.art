# Deprecated feature-evals knowledge banks

The knowledge banks in `feature/evals-A` through `feature/evals-N` are frozen
reference sources at the exact commits in `feature-evals-integration.json`.
They are not future authoring surfaces or runtime dependencies.

Atlas retains their knowledge in five forms:

1. complete canonical Atlas records for the selected authoritative lifecycle
   and public-proof layer.
2. native-addressed semantic identities, variants, documents, locators, and
   stakeholder representations;
3. explicit situated-evaluation, procedure, dataset, and narrative targets;
4. full-fidelity SHA-256 source objects with format-aware structural profiles;
   and
5. historical Git associations retained only as accession provenance and an
   additional initial-materialization recovery path.

New work depends on Atlas. Corrections create new Atlas records and correction
relationships; they do not rewrite frozen source history. Deleting branch refs
is safe after the Atlas merge ancestry and a verified portable bundle have been
retained. The bundle itself operates without Git. Squash-merging Atlas breaks
the additional ancestry guarantee even though it does not change the native
bundle contract.
