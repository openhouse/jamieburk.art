---
name: "Jamie Burkart Portfolio"
description: "A photographic, source-backed portfolio for operational production, implementation, and civic work."
colors:
  hospital-jacket-blue: "#2f6f89"
  reading-white: "#ffffff"
  institutional-blue-gray: "#f3f6f8"
  rule-blue-gray: "#d9e4e9"
  ink: "#1a232b"
  graphite: "#222b36"
  stewardship-green: "#4e6f61"
  observed-blue: "#4c97c2"
  corroborated-green: "#4a7f4f"
  disputed-ochre: "#d1a23f"
  correction-red: "#c83b32"
  harm-red: "#a52a24"
typography:
  display:
    fontFamily: "Iowan Old Style, Baskerville, Georgia, ui-serif, serif"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0"
  headline:
    fontFamily: "Iowan Old Style, Baskerville, Georgia, ui-serif, serif"
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
  selector: "0.25rem"
  field: "0.25rem"
  box: "0.25rem"
  card: "0.5rem"
  pill: "999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.hospital-jacket-blue}"
    textColor: "{colors.reading-white}"
    rounded: "{rounded.field}"
    padding: "0.75rem 1rem"
  button-inverted:
    backgroundColor: "{colors.reading-white}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.field}"
    padding: "0.75rem 1rem"
  status-chip:
    backgroundColor: "{colors.reading-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.65rem"
  photo-caption:
    backgroundColor: "{colors.reading-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.selector}"
    padding: "0.75rem 0"
---

# Design System: Jamie Burkart Portfolio

## Overview

**Creative North Star: "The Living Public Workbench"**

The site is an inhabited working surface, not a showroom. Documentary
photographs supply place, weather, bodies, materials, and the scale of
collective action. Type and rules orient a stranger through the work while the
Knowledge Wiki, citations, captions, and care limits keep the public argument
answerable to evidence and people.

The first viewport should establish Jamie, the literal field of the work, and
the role he is seeking. Deeper sections move between photographic presence and
quietly structured records. The interface recedes when an image needs room and
becomes more explicit when evidence, limits, or a next action must be read.

**Key Characteristics:**

- Photographic before decorative.
- Direct enough for a time-limited hiring reader.
- Source-backed without turning the page into an archive browser.
- Warm through human presence, not ornamental softness.
- Collective-credit and protected-absence aware.
- Flat, stable, and materially legible.

## Colors

The Human Index palette begins with the blue of Jamie's work jacket, then uses
white, graphite, green, ochre, and red as functional material states. Color
names describe what a tone does in the system; they do not imply that automated
status is final authority.

### Primary

- **Hospital-Jacket Blue:** Primary links, selected navigation, and structural
  emphasis. It carries ordinary work, continuity, and public action.

### Secondary

- **Stewardship Green:** Handoff, care, outcomes, and quieter supporting
  emphasis.
- **Observed Blue:** Information received or witnessed but not necessarily
  corroborated.
- **Corroborated Green:** Independent support exists; certainty is still
  bounded.

### Tertiary

- **Disputed Ochre:** Focus, selection, unresolved interpretation, and human
  review.
- **Correction Red:** Attribution, repair, and accountable intervention.
- **Harm Red:** Destructive or unsafe action. Correction uses Correction Red,
  not Harm Red.

### Neutral

- **Reading White:** Calibrated primary page and caption surface.
- **Institutional Blue-Gray:** Secondary reading bands and framed evidence.
- **Rule Blue-Gray:** Dividers and quiet containment.
- **Ink:** Primary reading color.
- **Graphite:** Dark material bands, hero context, and formal machinery.

### Named Rules

**The Status Is Not Authority Rule.** A semantic color may orient review; it
never clears a claim, photograph, or release gate.

**The White Reference Rule.** Long reading happens on calibrated white or
blue-gray surfaces. Warmth comes from people, material, and language, not a
site-wide beige wash.

**The Correction Is Visible Rule.** Repair and supersession remain legible;
they are not silently blended into the latest version.

## Typography

**Display Font:** Iowan Old Style with Baskerville, Georgia, and system serif
fallbacks.

**Body Font:** Karla with system sans-serif fallbacks.

**Label Font:** Oswald with Arial Narrow and system sans-serif fallbacks.

**Character:** The serif gives names, propositions, and case-study landmarks a
human editorial gravity. Karla keeps dense operational evidence lucid. Oswald
works like a compact printed label for navigation and metadata, not a voice for
paragraphs.

### Hierarchy

- **Display** (700, responsive, 1 line-height): Jamie's name and true page
  titles only.
- **Headline** (700, approximately 1.875rem, 1.2 line-height): Section
  propositions and case-study landmarks.
- **Title** (600, 1.25rem, 1.35 line-height): Project and artifact titles.
- **Body** (400, 17px, 1.65 line-height): Summaries, narrative, captions, and
  care language. Reading measures stay near 65-72 characters.
- **Label** (600, compact, tracked uppercase): Navigation, status, metadata, and
  occasional section orientation.

### Named Rules

**The Proposition Before Label Rule.** A label may orient a section, but the
meaning lives in the nearby proposition, image, or evidence. Do not build every
section from identical eyebrow scaffolding.

**The Zero-Tracking Reading Rule.** Display and body text use zero letter
spacing. Only compact labels carry measured tracking.

## Layout

The main frame is 1100px at most, with a one-rem viewport gutter. Reading
columns stop near 72 characters. Full-bleed photographic bands may expand to
90rem while their captions and copy return to stable reading alignments.

The homepage moves through distinct rhythms: immersive hero, fast hiring path,
proof strip, image-and-proposition band, selected project rows, dark material
interlude, and direct contact. Case studies use wide lead images, bounded
captions, full-width reading bands, and occasional two-image sequences.

The phi grid is available for compositions that need asymmetry, not as visible
decoration. At narrow viewports, paired image/text bands, project rows, caption
columns, and photo sequences become one stable column. Fixed aspect ratios and
Next Image sizing prevent content shift.

**The Stranger Path Rule.** Every major page must give a new visitor
orientation, role relevance, evidence, and a next route without requiring prior
knowledge of the archive.

**The Photograph Gets a Job Rule.** An image must contribute presence, place,
relation, process, contradiction, or material evidence. If it merely fills
space, remove it.

## Elevation & Depth

The system is flat by default. Depth comes from photographic layers, dark and
light material bands, one-pixel rules, and content rhythm. A small shadow may
separate a genuinely discrete card or artifact; it does not decorate every
surface.

Motion is limited to state feedback and navigation. All transitions preserve a
visible default and collapse under reduced-motion preferences.

**The Surface Before Shadow Rule.** Prefer a tonal change or full rule before a
shadow. Never pair a decorative wide shadow with a one-pixel border.

## Shapes

Controls and machine-like panels use quarter-rem corners. Cards may reach a
half-rem. Pills are reserved for compact status or tag metadata. Photographs
remain rectangular and unornamented.

**The Practical Corner Rule.** Shape communicates handle, label, or containment.
No large rounded panels, floating capsules, or cards nested inside cards.

## Components

### Hero

A full-bleed archival photograph fills the first viewport. Jamie's name, role,
operating proposition, and two direct actions sit over a restrained dark
overlay. The factual caption and credit move into a separate Graphite band so
they remain readable and do not impersonate hero copy.

### Photo Figure

Every photograph receives a stable aspect ratio, bounded object position,
responsive sizes, factual alt text, caption, and credit. Caption language
describes what the approved occurrence can establish; deeper interpretation
belongs in nearby prose or the Wiki.

### Project Row

Project previews are horizontal records, not floating cards. A representative
image or index number leads to role, situation, what became usable, tags, and a
clear case-study route.

### Evidence and Care

Citation markers stay available but visually secondary. Known, open, protected,
source-basis, and care-limit sections use full borders, tonal surfaces, and
plain headings rather than colored side tabs.

### Navigation and Actions

The sticky header remains compact and keyboard navigable. Buttons use familiar
rectangular forms, at least 44px touch height, clear hover and focus states, and
literal commands.

## Do's and Don'ts

### Do:

- **Do** let the first viewport establish Jamie, role fit, and the actual field
  of work.
- **Do** alternate photographic presence with quiet, highly scannable evidence.
- **Do** keep captions factual, credits explicit, and interpretation bounded.
- **Do** show collective activity without using collaborators as background
  proof of Jamie's importance.
- **Do** preserve strong visible focus, semantic structure, stable image
  dimensions, and reduced-motion behavior.
- **Do** let protected absence remain an intentional editorial result.

### Don't:

- **Don't** make the site feel like a generic SaaS landing page, private archive
  browser, consultant hype funnel, or decorative AI template.
- **Don't** use an unapproved photograph, crop, caption, credit, name, metric,
  or collective outcome to close a persuasive gap.
- **Don't** use thick side-rule callouts, gradient text, glassmorphism,
  decorative grids, giant metrics, or repeated identical card sections.
- **Don't** over-round working surfaces or place cards inside cards.
- **Don't** treat a strong image, oral history, green evaluation, or merged pull
  request as automatic publication authority.
- **Don't** let citations overwhelm the stranger's primary reading path.
