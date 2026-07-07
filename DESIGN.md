---
name: "Jamie Burkart Portfolio"
description: "Public-safe portfolio for technical project management, product operations, implementation, and civic documentation work."
colors:
  broadway-blue: "#0b5f81"
  oil-white: "#eeefec"
  oil-paper: "#f7f4ee"
  oil-ink: "#343435"
  dark-gray: "#5e5f61"
  deep-green: "#1f5c3e"
  vandyke-brown: "#76533a"
  yellow-ochre: "#e9b64e"
  lemon-yellow: "#f7ec86"
  pale-orange: "#fce1d1"
  pale-blue: "#74c2e5"
  classic-rose: "#e2aeb4"
typography:
  display:
    fontFamily: "Archivo Narrow, Karla, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "0"
  headline:
    fontFamily: "Archivo Narrow, Karla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0"
  title:
    fontFamily: "Karla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0"
  body:
    fontFamily: "Karla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0"
  label:
    fontFamily: "Archivo Narrow, Karla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0"
rounded:
  selector: "0.35rem"
  field: "0.35rem"
  box: "0.5rem"
  card: "0.5rem"
  pill: "999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.25rem"
  xl: "2rem"
  section: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.broadway-blue}"
    textColor: "{colors.oil-white}"
    rounded: "{rounded.field}"
    padding: "0.75rem 1rem"
  button-secondary:
    backgroundColor: "{colors.oil-paper}"
    textColor: "{colors.oil-ink}"
    rounded: "{rounded.field}"
    padding: "0.75rem 1rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.broadway-blue}"
    rounded: "{rounded.field}"
    padding: "0.75rem 1rem"
  card:
    backgroundColor: "{colors.oil-paper}"
    textColor: "{colors.oil-ink}"
    rounded: "{rounded.card}"
    padding: "1.25rem"
  status-chip:
    backgroundColor: "{colors.oil-white}"
    textColor: "{colors.oil-ink}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.65rem"
---

# Design System: Jamie Burkart Portfolio

## 1. Overview

**Creative North Star: "The Public Workbench"**

The system should feel like a careful working table where evidence has been
sorted, labeled, and made usable without exposing private source material. It
uses print-adjacent restraint, civic color, readable type, and modest component
structure to make complex work legible.

This is a brand surface, but the brand is the operating practice. The design
must create trust through order, language, and public-safety boundaries rather
than spectacle. It rejects generic SaaS drama, consultant hype, private archive
behavior, and decorative AI-template flourishes.

**Key Characteristics:**
- Public-safe before persuasive.
- Dense enough to show real work, calm enough to scan.
- Warm, precise, and modular.
- Evidence-led, never inflated.
- Human without becoming decorative.

## 2. Colors

The palette is civic and archival: blue and green carry structure and trust,
ochre adds a restrained signal color, and warm paper tones support long reading.

### Primary
- **Broadway Blue** (`--jb-broadway-blue`): Primary action, links, status emphasis,
  proof-strip surfaces, and structural accents.

### Secondary
- **Deep Green** (`--jb-deep-green`): Outcome language, role-fit emphasis, and
  quieter confidence after the primary action color has done its work.
- **Yellow Ochre** (`--jb-yellow-ochre`): Selection, focus visibility, and sparing
  highlight moments.

### Tertiary
- **Pale Blue, Pale Orange, Lemon Yellow, Classic Rose**: Supporting artifact
  surface colors. Use them as soft evidence-layer cues, never as a rainbow
  decoration system.

### Neutral
- **Oil White** (`--jb-oil-white`): Main page ground.
- **Oil Paper** (`--jb-oil-paper`): Alternate section and card surface.
- **Oil Ink** (`--jb-oil-ink`): Primary text.
- **Dark Gray** (`--jb-dark-gray`): Secondary text only when contrast remains
  comfortably readable.
- **Vandyke Brown** (`--jb-vandyke-brown`): Archival warmth and rule accents.

### Named Rules

**The Public-Safety Color Rule.** Color must clarify status, evidence, action,
or reading hierarchy. If color only decorates, remove it.

**The Ochre Rarity Rule.** Yellow ochre earns attention through scarcity. Use it
for focus, selection, and occasional proof, not as a general accent wash.

## 3. Typography

**Display Font:** Archivo Narrow with Karla and system sans fallbacks.
**Body Font:** Karla with system sans fallbacks.
**Label Font:** Archivo Narrow for compact proof labels and public metadata
emphasis; Karla for navigation and longer UI labels. There is no mono system in
the current site.

**Character:** The pairing is practical and public-facing. Archivo Narrow gives
headings and compact proof labels a civic, condensed, public-notice quality;
Karla keeps long summaries readable, approachable, and unshowy.

### Hierarchy

- **Display** (700, large responsive heading, tight line-height): Hero identity
  and major page titles only.
- **Headline** (700, 1.875rem, 1.2 line-height): Section headers and case-study
  landmarks.
- **Title** (600, 1.25rem, 1.35 line-height): Card titles, artifact names, and
  sidebar blocks.
- **Body** (400, 17px, generous line-height): Project summaries, notes, care
  language, and MDX case-study prose. Keep reading measures near 65-75
  characters.
- **Label** (700, 0.875rem): Status, navigation, and compact metadata.

### Named Rules

**The Plain Evidence Rule.** Use type weight, spacing, and placement before
inventing visual effects. No gradient text, no ornamental tracking, no clever
typographic gimmicks.

## 4. Elevation

This system is flat by default. Depth comes from borders, tonal surface changes,
section rhythm, and reading hierarchy. The current soft shadow is a minor
affordance on cards and artifact surfaces; it must stay quiet and never combine
with heavy blur or glossy glass effects.

### Shadow Vocabulary

- **Quiet Surface Shadow** (`shadow-sm`): A low-contrast lift for cards or
  representative artifact panels only.

### Named Rules

**The Flat Workbench Rule.** Surfaces rest on the page. Lift appears only when it
helps a card or artifact read as a discrete object.

## 5. Components

### Buttons

- **Shape:** Modest rounded rectangle (0.35rem).
- **Primary:** Broadway Blue background with Oil White text; use for the main
  route forward.
- **Hover / Focus:** Hover may shift toward Deep Green. Focus must preserve the
  visible Yellow Ochre outline.
- **Secondary / Ghost:** Secondary uses the warm surface and a full border.
  Ghost keeps the page quiet and should remain text-forward.

### Chips

- **Style:** Compact, rounded metadata labels with clear contrast.
- **State:** Chips are informational unless explicitly wired as filters later;
  do not imply interactivity without behavior.

### Cards / Containers

- **Corner Style:** Gentle radius (0.5rem), never pill-shaped.
- **Background:** Oil Paper or Oil White, selected for reading contrast.
- **Shadow Strategy:** Quiet Surface Shadow only; no dramatic card stacks.
- **Border:** One-pixel ink-tinted borders for containment.
- **Internal Padding:** 1.25rem is the common content-card baseline.

### Inputs / Fields

No mature form system exists yet. If fields are added, use Oil White or Oil
Paper surfaces, one-pixel borders, 0.35rem radius, strong visible focus, clear
labels, and plain error text.

### Navigation

Navigation is restrained and text-led. It should help a reviewer move between
work, resume, about, contact, and lab surfaces without turning into a product
app shell.

### Signature Component

The case-study model is the signature system: status, visibility, what was
unclear, what became usable, artifacts, source layer, known/open/protected, care
notes, and credits. Preserve that information architecture wherever possible.

## 6. Do's and Don'ts

### Do:

- **Do** keep public safety visible in the structure of every case study.
- **Do** use Broadway Blue for primary action and Deep Green for outcome-oriented
  emphasis.
- **Do** keep summaries scannable while preserving nuance.
- **Do** use representative diagrams, approved artifacts, and redacted examples
  instead of raw private material.
- **Do** keep focus states highly visible and reduced-motion behavior intact.

### Don't:

- **Don't** make the site feel like a generic SaaS landing page, a private
  archive browser, a consultant hype funnel, a heavy animated portfolio, or a
  decorative AI-generated template.
- **Don't** publish private emails, raw transcripts, private coalition notes,
  legal-review materials, private correspondence, internal analytics,
  client-private material, unapproved photos, private fonts, or named
  stakeholder details without approval.
- **Don't** use gradient text, glassmorphism, giant hero metrics, decorative
  side-stripe borders, or endlessly repeated icon-card grids.
- **Don't** over-round cards or panels beyond the existing 0.5rem card radius.
- **Don't** let color or visual texture compete with the evidence.
