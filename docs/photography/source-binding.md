# Source binding

A public photo ID must remain stable when a private file path, Photos database
row, album, edit, or device changes.

The public repository stores:

- a stable public binding ID;
- the private provider name;
- a state such as `pending-private-verification` or `verified-private`;
- public derivative identity and checksum.

It does not store:

- Apple Photos identifiers;
- private paths or filenames;
- People labels;
- exact coordinates;
- source timestamps whose precision is withheld;
- secret fingerprints or private catalog counts.

Verification occurs locally through multiple signals. Drift fails closed and
opens a source-return task; it never silently rebinds the public asset.
