# Source Classes

The machine-readable source record separates source kind, visibility, and
preservation status. These are different questions.

## Kind

Kinds describe what a source is: government record or social post,
institutional page or post, archived capture, promotional graphic, published
article, project archive, participant photograph, photo metadata, or research
run.

Kind does not decide whether the source is safe to publish.

## Visibility

- `public`: approved source metadata and public URLs may be published.
- `public-metadata-only`: a public-safe description may be published without
  exposing the asset.
- `private`: the source remains outside the repository.
- `protected`: the source is withheld under a specific duty of care.

## Preservation

- `live`: the public source is currently reachable at its canonical location.
- `archived`: the preserved copy is the reliable public location.
- `live-and-archived`: both locations are recorded.
- `dead`: a previously public source is no longer reachable.
- `private`: the underlying source is intentionally not public.

URL status can change. Source identity and evidence boundaries should remain
stable when links are updated.
