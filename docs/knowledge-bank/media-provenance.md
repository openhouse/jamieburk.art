# Media Provenance

Media records keep visual evidence separate from publication permission.

A photograph can support an internal claim without being publicly publishable.
The fact that an image exists, what it appears to show, who owns it, whether
people pictured consent to publication, and whether it may appear on the public
site are separate decisions.

## Rules

- Store public-safe media metadata in `apps/www/src/data/citations/media.json`.
- Do not store private file paths, raw camera-library paths, or temporary
  research paths in the public repository.
- Rights and consent must be approved before a participant image can be used as
  a public citation or public asset.
- A photograph timestamp establishes capture time, not necessarily event start
  time.
- Original metadata and reconstructed facts should remain separate.
- Crop and redaction notes should describe the review needed before public use.

## Digital District Photograph

The Digital District participant photograph is represented as an internal media
record with pending rights and consent. It is not published, linked, or used as
a public citation.
