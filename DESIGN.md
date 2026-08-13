---
name: "Jamie Burkart Portfolio"
description: "A public-service briefing folio showing how complicated public work becomes traceable decisions and usable systems."
theme: "public-service-folio"
form_seed: "603b707c"
colors:
  broadway-blue: "#0e62a3"
  oil-white: "#fffdf7"
  warm-paper: "#f2eee4"
  ink: "#101b20"
  graphite: "#4d5d61"
  deep-green: "#1f6b53"
  dark-field: "#18252a"
  yellow-ochre: "#d7a615"
  signal-yellow: "#f4c447"
  pale-orange: "#f5d7ca"
  pale-blue: "#d9eaf2"
  progress-rose: "#c63b21"
typography:
  display: "Oswald, Arial Narrow, ui-sans-serif, system-ui, sans-serif"
  body: "Karla, ui-sans-serif, system-ui, sans-serif"
  label: "Oswald, Arial Narrow, ui-sans-serif, system-ui, sans-serif"
rounded:
  structural: "0"
  compact: "0.25rem"
---

# Design System: Public Service Briefing Folio

## North Star

The portfolio is a composed briefing for a public-sector product hiring panel.
Its visual and editorial mechanism is simple: complicated public work becomes
traceable decisions, sequenced delivery, and usable systems. Its cultural home
is civic fieldwork, product delivery, briefing folios, and launch rooms—not a
personal archive, dashboard, or prestige display.

The first surface establishes product ownership, public-service judgment, and
shipping fluency through a literal proposition, a working-session photograph,
direct actions, and a numbered lifecycle rail. Later surfaces turn claims into
stage rows, case comparisons, evidence ledgers, captions, and accountable next
moves.

The two governing composition rules are:

1. **Evidence rail.** Every major surface exposes sequence, proof, or ownership
   through numbered progress marks, ruled rows, lifecycle rails, or decision
   ledgers.
2. **Folio field.** Consequential language receives generous space. Decorative
   cards do not fill the field.

## FORM direction contract

The corroborated FORM seed for this direction is `603b707c`. The five blocks
below are also emitted by the root layout as stable `data-form-*` attributes so
the implemented site and this document can be checked against each other.

1. **World:** Public Service Briefing Folio.
2. **Mechanism:** Complicated public work becomes traceable decisions and
   usable systems.
3. **First surface:** Product ownership, public-service judgment, and shipping
   fluency are legible within ten seconds.
4. **Signature:** Evidence rail plus generous documentary folio field.
5. **Craft floor:** No eyebrows above headings, generic card grids, gradients,
   fake technical chrome, authority-by-association, or decorative metrics.

## Color

- **Broadway blue** carries navigation, links, and product actions.
- **Ink** and **dark field** establish authority in evidence rails and proof
  sections.
- **Oil white** and **warm paper** are documentary reading surfaces.
- **Pale blue** marks public-product context and hero fields.
- **Signal yellow** identifies next moves and links on dark fields.
- **Progress rose** marks sequence numbers and accountable movement.
- **Deep green** supports stewardship and durable outcomes.
- **Graphite** carries secondary prose and captions.
- **Yellow ochre** is reserved for focus and evidence emphasis.
- **Pale orange** is available for bounded support, not general decoration.

Yellow and rose always indicate action, progression, or evidence. They are not
confetti. Gradients, glows, glass effects, and simulated paper texture are
prohibited.

## Typography

Oswald supplies the compressed language of public notices, launch-room boards,
and briefing covers. Karla keeps evidence and operational prose warm, plain,
and fast to read.

Display headlines use Oswald at approximately
`clamp(3.8rem, 7.5vw, 6rem)`, weight 600, line-height 0.9, and restrained
negative tracking. Section headlines use the same family at
`clamp(2.7rem, 5vw, 5rem)`. Body copy begins at 17px and generally stays within
34–42rem or 72 characters. Labels use compact uppercase Oswald. Large display
type belongs to the page proposition and major section arguments; evidence
rows, captions, and controls remain compact.

## Layout and elevation

The documentary field uses a maximum 1240px frame, 1rem side gutters, broad
vertical intervals, and full-width tonal bands. Desktop heroes split roughly
1:0.92 between argument and photograph. Introductory sections often split
0.9:1.1; stages become three columns; ledgers use approximately 0.34:0.66
label-to-evidence columns.

The system is flat by default. Depth comes from color fields, rules,
photographic crops, and density changes—not floating cards. A shadow is
permitted only for a temporary overlay such as the open mobile menu. If a
boundary can be communicated with a rule or tonal field, a shadow is forbidden.

## Components

### Briefing header

A sticky white header uses a fine ink rule. Desktop navigation is compact and
horizontal; hover adds a Broadway blue underline. Mobile uses a native
`details` menu with a minimum 44px trigger.

### Product proposition

The hero pairs a short product-leadership argument with a public-work
photograph. It is a split folio, not full-bleed wallpaper. Primary and secondary
actions are square, heavy, and at least 48px high.

### Evidence rail and progress marks

Lifecycle rails use ink backgrounds, signal-yellow numerals, white labels, and
ruled divisions. Stage lists use progress-rose numerals, large Oswald headings,
and concise Karla explanations. Proof and delivery ledgers use durable rows
rather than cards.

### Casebook

Lead cases sit in a full-width dark field. Each combines product language,
explicit hiring signals, documentary photography, caption and credit lines,
and underlined yellow links. Small evidence tags may rotate slightly when they
represent workshop material; this is a bounded exception.

### Photography and captions

Photography is evidence, not wallpaper. Every image must come through the
photography registry with stable dimensions, descriptive alt text, factual
caption, creator or portfolio authorization credit, neutral public filename,
metadata-stripped derivative, allowed placements, and release-state boundary.

Captions sit below the image behind a fine rule. Caption and credit may share a
row on wide screens and wrap naturally on narrow screens. Crops may vary by
placement but may not distort event context, collective credit, or represented
people. Private album names, People tags, exact locations, and source paths
stay outside the public repository.

### Actions and links

Primary actions are ink on oil white and become Broadway blue on hover.
Secondary actions are outlined and gain signal yellow on hover. Text links use
a visible underline. Focus uses a 3px yellow-ochre outline with a 3px offset.

## Mobile behavior and accessibility

Below 768px, split arguments, stages, case comparisons, and ledgers become a
single reading column. The homepage orders proposition, actions, photograph,
caption, then lifecycle rail. The rail becomes stacked rows. Mobile display
type uses `clamp(3.35rem, 16vw, 4.8rem)`. The 1rem gutter remains fixed and no
content requires horizontal scrolling.

Maintain one H1 per route, semantic ordered and definition lists, figure and
caption relationships, skip navigation, 44px command targets, AA contrast,
visible focus, explicit image dimensions, reduced-motion behavior, and no
horizontal overflow. Rendered QA must force lazy-loaded images through the
viewport before accepting a candidate.

## Do and do not

Do make Jamie’s role, decisions, product moves, and handoffs immediately
scannable. Use rules, numbers, lifecycle marks, and evidence ledgers as the
signature vocabulary. Keep product, engineering, policy, legal,
communications, and collective credit distinct. Treat repository checks,
staging approval, production publication, and indexing as separate gates.

Do not revive or blend the superseded Human Index world. Avoid generic SaaS
landing patterns, nested cards, dashboard chrome, pills, gradients, floating
orbs, glassmorphism, faux paper, decorative seals, heavy animation, and
authority-by-association. Do not publish private correspondence, raw records,
internal analytics, legal-review material, archive locators, unsupported
metrics, or people and photographs lacking the applicable authorization.

Access, automated evaluation, staging visibility, and repository inclusion are
not publication permission. Jamie remains the publication and indexing
decision owner.
