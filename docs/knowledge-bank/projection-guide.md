# Projection Guide

The public website should project selected claims from the Proofs Bank.

The website is not a claim database. It is a composed public surface for hiring managers, referrers, collaborators, and public-interest technology readers.

## Projection Rules

1. Use safe wording by default.
2. Use stronger wording only when approved.
3. Use contribution language for collective work.
4. Include limits notes for sensitive pages.
5. Do not publish protected material.
6. Do not invent proof language inside components.
7. If a claim is Open, either soften it or keep it out of public UI.
8. If a claim is Protected, do not render it.

## Page Projection

### Homepage

Use only low-risk, high-level claims. Avoid exact metrics unless approved. The homepage should make Jamie legible in seconds, not prove every source.

Best proof families:

- operating backbone / 14+ years
- HJE contribution with bounded revenue language
- campaign web and campaign-memory infrastructure
- WOWList aggregate platform scale
- Sunday Dinner / 196 participation infrastructure

### Technical Operations

Use capability and role-fit claims:

- operating backbone
- delivery coordination
- requirements
- workflows
- action trackers
- status rhythms
- runbooks
- onboarding
- launch support
- durable handoffs

### Case Studies

Use project-specific safe wording with Known / Open / Protected.

Each case should answer:

- What was emerging?
- What became usable?
- What did Jamie do?
- What should remain protected?

### Resume Page

Use only claims consistent with the approved resume PDF. The PDF remains the canonical resume artifact; the HTML page provides an accessible summary.

No phone number in HTML for V1.

### Lab Pages

Use Source-Backed Team Memory as early method / proof-of-practice. Keep limits language visible.

Avoid finished SaaS, private archive browser, autonomous publication, and client-adoption claims.

## Data Projection

`apps/www/src/data/proofs.ts` may project reviewed safe wording into components. The Markdown Knowledge Bank remains the editorial source of truth.
