# Source Binding

The public repository never stores an Apple Photos identifier, source filename,
private path, exact coordinate, private preview digest, People association, or
source-resource fingerprint.

Photo Fieldwork keeps a private mapping between:

- durable source identifiers and technical properties;
- the exact reviewed source preview;
- one random public opaque ID;
- one exact public derivative and destination;
- verification and transform receipts.

The public record may contain the random opaque ID because it reveals no source
structure and resolves only inside the private studio.

## Verification

The East River canary was matched to the authorized private source through:

- an existing Photo Fieldwork catalog record;
- individual local visual review of the private preview;
- exact dimensions for the reviewed preview and public derivative;
- a local ImageMagick similarity comparison;
- a SHA-256 checksum of the public derivative.

No pixel or private metadata upload was required.

## Rotation

If an opaque ID is compromised, issue a new random ID, update the private
mapping, record the correction publicly, and deprecate the prior binding. Never
derive the replacement from the source identifier or checksum.
