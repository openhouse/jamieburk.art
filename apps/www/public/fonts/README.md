# Social-preview fonts

These static fonts make the Open Graph renderer deterministic and keep it
independent of network font requests during `next build`.

- `libre-baskerville/LibreBaskerville-Regular.ttf` comes from
  `impallari/Libre-Baskerville` at commit
  `d20160cfa0ac4c532327f85b3ca4054acf92ed38` and is covered by the adjacent
  SIL Open Font License.
- `karla/Karla-Medium.ttf` comes from `googlefonts/karla` at commit
  `69b25f663101efb4113dd7ed416c120dd2dce56a` and is covered by the adjacent
  SIL Open Font License.

The composition contract in `apps/www/src/data/social-preview.ts` is the source
of truth for font selection, visual priorities, and the approved render hash.
Changing a font is a new social-preview composition decision: rebuild, inspect
the PNG, obtain Jamie's approval for the exact output, and only then update the
approved hash.
