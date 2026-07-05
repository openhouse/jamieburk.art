# Type System

The V1 type system uses safe public web fonts through `next/font/google`. Do not commit private or proprietary font files.

## Fonts

- Karla: primary body, UI, case-study prose, cards, navigation, and documentation voice
- Archivo Narrow: civic label voice for eyebrows, metadata labels, proof labels, status badges, and small public-notice surfaces
- League Spartan: geometric display voice for rare major display moments such as the homepage name treatment and OpenGraph direction

## Private Font Ban

Do not use or commit:

- Trade Gothic Bold
- Verlag Black
- Gotham Rounded
- Maria handwriting font
- FondFont RISQUE / Risque
- Any private, proprietary, or unapproved font files

## Implementation

Font helpers live in:

```text
apps/site/src/lib/fonts.ts
```

The root layout applies the font variables to the `html` element.

CSS variables are declared in `apps/site/src/app/globals.css`:

```css
--font-body
--font-condensed
--font-display
```

Shared label classes:

```css
.eyebrow
.metadata-label
.status-label
.proof-label
.display-caps
```

Keep type calm. Do not use all-caps display everywhere, and keep letter spacing at zero for consistency with the app design constraints.
