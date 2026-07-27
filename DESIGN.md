---
name: "Jamie Burkart Portfolio"
description: "A public-safe professional index of operating structure, collective work, evidence, and care."
colors:
  base-white: "#ffffff"
  reading-surface: "#f3f6f8"
  soft-rule: "#d9e4e9"
  ink: "#1a232b"
  muted-ink: "#66737b"
  public-blue: "#0b5f81"
  work-jacket-blue: "#2f6f89"
  protected-green: "#4e6f61"
  outcome-green: "#245b3e"
  correction-red: "#c83b32"
  machine-graphite: "#222b36"
  observed-blue: "#4c97c2"
  corroborated-green: "#4a7f4f"
  disputed-ochre: "#d1a23f"
  harm-red: "#a52a24"
  vandyke-brown: "#765c4c"
  lemon-field: "#f3df9a"
  pale-orange: "#efd5c7"
  pale-blue: "#d9e4e9"
  classic-rose: "#d5b8bc"
  selection-overlay: "#d1a23f73"
  hero-wash: "#ffffffe0"
  hero-wash-mobile: "#ffffffe6"
  light-rule: "#ffffff40"
  light-copy: "#ffffffeb"
  light-source: "#ffffffc7"
typography:
  display:
    fontFamily: "Karla, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0"
  headline:
    fontFamily: "Karla, ui-sans-serif, system-ui, sans-serif"
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
    fontFamily: "Oswald, Arial Narrow, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.055em"
rounded:
  inline: "0.15rem"
  selector: "0.25rem"
  field: "0.25rem"
  box: "0.25rem"
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
    backgroundColor: "{colors.work-jacket-blue}"
    textColor: "{colors.base-white}"
    rounded: "{rounded.card}"
    padding: "0.75rem 1.25rem"
  button-secondary:
    backgroundColor: "{colors.base-white}"
    textColor: "{colors.public-blue}"
    rounded: "{rounded.card}"
    padding: "0.75rem 1.25rem"
  button-ghost:
    backgroundColor: "{colors.base-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "0.75rem 1.25rem"
  card:
    backgroundColor: "{colors.reading-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "1.25rem"
  status-chip:
    backgroundColor: "{colors.base-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.75rem"
---

# Design System: Jamie Burkart Portfolio

## 1. Overview

**Creative North Star: "The Human Index"**

The portfolio is a public workbench: a calm, legible place where evidence,
photographs, collective credit, and operating decisions have been sorted and
made usable. Its visual language comes from working materials Jamie actually
uses: a blue work jacket, correction marks, public records, meeting packets,
index cards, and practical institutional forms.

The brand is the practice. The site should help a hiring reader see how Jamie
turns emerging work into structure while preserving the people, limits, and
sources that make each account trustworthy. Photography supplies presence and
particularity. Type and layout supply the durable handoff.

**Key Characteristics:**
- Public-safe before persuasive.
- Dense enough to show real work, calm enough to scan.
- Precise, warm, modular, and ethically grounded.
- Evidence-led without resembling an archive browser.
- Human presence without decorative sentiment.

## 2. Colors

The palette combines calibrated white and blue-grey reading surfaces with a
work-jacket blue, institutional green, graphite, and red-pencil correction.
Secondary pastels appear only as quiet evidence and artifact fields.

### Primary
- **Work-Jacket Blue:** Primary controls and the ordinary presence of work.
- **Public Blue:** Links, navigation emphasis, and civic-facing structure.

### Secondary
- **Protected Green:** Stewardship, privacy, and supporting systems.
- **Outcome Green:** Results and role-fit emphasis.
- **Correction Red:** Attribution, repair, and accountable intervention.

### Tertiary
- **Observed Blue:** Information received or witnessed but not necessarily verified.
- **Corroborated Green:** Independent support exists.
- **Disputed Ochre:** Sources conflict or human review remains open.
- **Harm Red:** Unsafe, destructive, or irreversible action.

### Neutral
- **Base White:** Calibrated page ground and the photographic reference point.
- **Reading Surface:** Secondary reading bands and restrained cards.
- **Soft Rule:** Dividers and low-emphasis containment.
- **Ink:** Primary text.
- **Muted Ink:** Secondary text only at accessible contrast.
- **Machine Graphite:** Asserted information, machinery, and formal authority.
- **Vandyke Brown:** Archival warmth used sparingly.

### Named Rules

**The Semantic Color Rule.** Color must clarify status, evidence, action, or
reading hierarchy. If color only decorates, remove it.

**The Correction Rule.** Red marks accountable intervention, not generic
urgency. Harm has its own darker red.

**The Ochre Rarity Rule.** Ochre earns attention through scarcity. Reserve it
for focus, selection, disputed state, and occasional proof.

## 3. Typography

**Display Font:** Karla with system sans fallbacks.
**Body Font:** Karla with system sans fallbacks.
**Label Font:** Oswald with Arial Narrow and system sans fallbacks.

**Character:** Karla keeps the site direct, humane, and highly readable. Oswald
creates a narrow civic-label voice for compact metadata without competing with
the body copy.

### Hierarchy
- **Display** (700, responsive, 1 line-height): Jamie's name and true page titles.
- **Headline** (700, 1.875rem, 1.2 line-height): Section and case-study landmarks.
- **Title** (600, 1.25rem, 1.35 line-height): Card titles and artifact names.
- **Body** (400, 17px, 1.65 line-height): Summaries, notes, and case-study prose,
  generally held to 65-75 characters.
- **Label** (600, 0.875rem, 0.055em tracking): Navigation, status, source, and
  compact metadata. Uppercase is reserved for labels, not every section.

### Named Rules

**The Plain Evidence Rule.** Use weight, spacing, and placement before visual
effects. Letter spacing is zero except for the established label voice.

**The Scale Rule.** Hero-scale type belongs only in a hero. Dense professional
surfaces use smaller, tighter headings.

## 4. Elevation

The system is flat by default. Depth comes from full borders, tonal surface
changes, photography, and reading hierarchy. A quiet two-pixel surface shadow
may separate an individual card or artifact, but no page section floats as a
decorative panel.

### Shadow Vocabulary
- **Quiet Surface Shadow** (`0 1px 2px rgba(26, 35, 43, 0.08)`): Individual
  cards and representative artifacts only.

### Named Rules

**The Flat Workbench Rule.** Surfaces rest on the page. Lift appears only when
it helps an actual object read as discrete.

**The Full-Border Rule.** Use a complete one-pixel boundary or none. Thick
colored side stripes are forbidden.

## 5. Components

### Buttons
- **Shape:** Stable, modest rounded rectangles with an 0.5rem radius.
- **Primary:** Work-Jacket Blue with white text and 0.75rem by 1.25rem padding.
- **Hover / Focus:** Hover reinforces the civic palette. Focus uses a visible
  three-pixel ochre outline with offset.
- **Secondary / Ghost:** Secondary is a full Public Blue outline. Ghost is
  text-led and gains only a pale blue hover field.

### Chips
- **Style:** Compact metadata with full borders or solid semantic fills.
- **State:** Chips communicate status unless explicitly implemented as controls.

### Cards / Containers
- **Corner Style:** Modest 0.5rem radius.
- **Background:** Base White or Reading Surface.
- **Shadow Strategy:** Quiet Surface Shadow only.
- **Border:** One-pixel ink-tinted full borders.
- **Internal Padding:** 1.25rem baseline.

### Inputs / Fields
- **Style:** White or Reading Surface, one-pixel full border, 0.25rem radius.
- **Focus:** Three-pixel ochre outline with offset.
- **Error / Disabled:** Error uses Harm Red and plain language. Disabled state
  remains legible and never relies on opacity alone.

### Navigation

Navigation is restrained and text-led. It must let a time-limited hiring reader
move directly among Work, Resume, About, and Contact. Mobile navigation uses a
real disclosure control, stable touch targets, and visible focus.

### Photography

A photograph is an occurrence, not decoration. The asset, derivative, crop,
caption, credit, surrounding copy, viewport, destination, and action are
reviewed together. Public-repo presence does not by itself clear production,
indexing, rights, consent, or exact credit.

### Case Studies

The case-study model is the signature information system: what was unclear,
what became usable, Jamie's role, collective context, artifacts, sources,
known/open/protected boundaries, care notes, and credits.

## 6. Do's and Don'ts

### Do:
- **Do** make the role, action, outcome, source basis, and honest limit scan quickly.
- **Do** use photography to reveal real work, people, place, and participation.
- **Do** preserve collective credit, consent, rights, attribution, and protected absence.
- **Do** keep focus states, keyboard paths, reduced motion, and contrast at WCAG 2.2 AA or better.
- **Do** keep public safety visible in case-study and photographic structures.

### Don't:
- **Don't** make the site feel like a generic SaaS landing page, a private
  archive browser, a consultant hype funnel, a heavy animated portfolio, or a
  decorative AI-generated template.
- **Don't** publish inflated claims, unapproved metrics, raw transcripts,
  private coalition notes, legal-review materials, private correspondence,
  internal analytics, client-private material, unapproved photos, private
  fonts, or unapproved stakeholder details.
- **Don't** use gradient text, glassmorphism, giant hero metrics, decorative
  side-stripe borders, repeated icon-card grids, or decorative background grids.
- **Don't** make every section an uppercase eyebrow or numbered index.
- **Don't** over-round cards or nest cards inside cards.
