# Home social-card rendering contract

- Status: selected for the `feature/launch-2026-08-13-02-C` candidate
- Decision owner: Jamie Burkart
- Canonical executable contract: `apps/www/src/data/social-card.ts`
- Renderer: `apps/www/src/app/opengraph-image/route.tsx`
- Deterministic eval: `scripts/tests/social-sharing.test.mjs`

## Decision

Use the role-led cinematic composition: Jamie's canonical role in Karla Bold
above his name in TeX Gyre Pagella, directly over the full-bleed East River
photograph. One light wash and one left-to-right charcoal gradient support the
copy. The gradient reaches the complete frame and becomes transparent before
the right-side portrait. There is no tagline, URL, photo label, photo credit,
vertical rule, or floating placard in the pixels.

This composition won because it makes the intended professional reading
available in roughly two seconds while keeping person, place, weather,
infrastructure, and field presence visible. The tagline-led alternative remains
a useful general identity study, but asks an application reader to infer the
role family.

## Priority order

When priorities conflict, resolve them in this order:

1. Governed public use, dignity, consent, and attribution boundaries.
2. Two-second comprehension of the current role family.
3. Recognition of Jamie Burkart as the person doing the work.
4. WCAG AA contrast when the card is reduced to a common social-preview size.
5. Co-presence of person and place; the photograph remains evidence, not wallpaper.
6. Parity with the site's identity typography and editorial voice.
7. Restraint: one role, one name, one photograph, one wash, one gradient.
8. Exact render, metadata, cache revision, governed occurrence, and eval parity.

These priorities are mirrored as machine-readable identifiers in
`homeSocialCardRenderContract.priorities`.

## Instructions for making the image

1. Resolve the governed, metadata-stripped East River derivative from the local
   application bundle. Do not fetch a network image at render time.
2. Fill a 1200 by 630 frame with the photograph, using `cover` and the approved
   `center 46%` alignment.
3. Apply the light full-frame charcoal wash.
4. Apply the cinematic charcoal gradient over the full frame. Keep it darkest
   beneath the copy and transparent before the portrait.
5. Render the canonical role first in Karla Bold.
6. Render `Jamie Burkart` second in TeX Gyre Pagella Regular.
7. Add nothing else to the pixels.
8. Inspect the result at 1200 by 630 and at common social-preview scale.
9. Confirm metadata, dimensions, alt text, permission state, exact render hash,
   cache revision, governed occurrence, and evals all describe the same artifact.

The executable version of these instructions lives in
`homeSocialCardRenderContract.instructions`, `layerOrder`, `visibleCopyOrder`,
and `layers`. The renderer consumes that contract instead of repeating its own
layout constants.

## Accessibility boundary

The text-over-image measurement scans the actual white glyph footprint against
the composited photograph, wash, and gradient. Because social cards are often
downscaled, the governing target is 4.5:1 rather than relying on the 3:1
large-text exception.

- Minimum continuously modeled identity-gradient opacity: `0.674140289044`.
- Selected identity-gradient opacity: `1`.
- Selected candidate's measured worst-case contrast: `9.482961545:1`.
- Limiting copy: the smaller role line.

`buildSocialCardLayout` rejects a contract below the recorded opacity floor.
Changing the photograph, crop, wash, gradient stops, typography, copy, or copy
position invalidates the old measurement and requires a new measurement before
acceptance.

## Change protocol

A visual change is not complete until all affected siblings move together:

- executable render contract and renderer;
- Open Graph and Twitter metadata;
- cache revision when rendered pixels change;
- governed photography occurrence and permission boundary;
- deterministic social-sharing eval;
- portfolio production-readiness rubric;
- exact 1200 by 630 render and SHA-256;
- full-size and downscaled visual inspection;
- staging deployment and source-to-deployment attestation.

Do not update an old render hash, contrast receipt, human review, or release
record merely to make a changed candidate appear approved. Those artifacts bind
only to the candidate they actually evaluated.
