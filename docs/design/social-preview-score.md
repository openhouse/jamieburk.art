# Global social-preview rendering score

This document explains the executable score in
`apps/www/src/data/social-preview-composition.json`. The score treats the
composition as a reproducible set of instructions: the image route realizes
it, and the evaluator checks that the realization remains faithful.

## Intent

Keep the East River photograph legible as situated evidence while Jamie's name
and the homepage proposition retain textual authority at social-card and
message-preview sizes. The selected composition is **Image 4**, with the
gradient layer at **85.4% overall opacity**. The gradient's colors and stops,
photo crop, typography, spacing, and content remain otherwise unchanged.

## Ranked instructions

1. **Truth and governance.** Use the governed exact photograph, shared identity
   copy, and approved Palatino name raster. A visual refinement never expands
   rights, attribution choices, production authorization, or indexing state.
2. **Name, proposition, place.** Preserve the reading order Jamie Burkart,
   homepage proposition, `jamieburk.art`, while Jamie and the East River remain
   recognizable.
3. **Accessible authority.** Keep every text layer at or above 4.5:1 against the
   composited photograph at 1200 × 630, 600 × 315, and 300 × 158.
4. **Photographic openness.** Use the least darkening that preserves the
   selected hierarchy and contrast margin. The image should remain a photograph,
   not become a detached title card.
5. **Exact-candidate review.** Any governed input, rendering instruction,
   candidate fingerprint, or rendered-pixel change invalidates the prior review.

The measured AA floor for the present photo, crop, gradient, and text is
`0.82395`. The selected `0.854` opacity deliberately keeps a small margin above
that floor. The floor is evidence about this exact composition, not a reusable
constant for another photograph or layout.

## Change protocol

1. Edit the declarative score; do not introduce competing visual constants in
   the image route.
2. Run `npm run test:social-preview` and `npm run evals:social-preview`.
3. Render the exact candidate at all three review sizes and inspect crop,
   hierarchy, line wrapping, safe areas, photographic recognition, and contrast.
4. Replace the checksum-bound QA evidence and record the exact candidate and
   pixel digests only after that inspection.
5. Deploy and attest staging separately. Staging feedback never implies
   production publication, indexing, rights expansion, or continuing liveness.

The governed photographer attribution remains in the knowledge-bank occurrence.
Its omission from the pixels is an occurrence-specific, permission-backed
composition choice, not a deletion of authorship.
