# AGENTS.md - jamieburk.art

## Mission

Build and maintain a focused, public-safe portfolio that makes Jamie legible as a
Technical Project Manager - Product Operations & Implementation lead who creates
operating structure for complex public-facing teams.

## Current Canonical App

Use `apps/www`. Do not rename it to `apps/site`, `apps/web`, or another path
without explicit approval.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, npm
workspaces, Dockerfile, Dokku.

## Commands

- `npm ci`
- `npm run dev`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run check`
- `npm run knowledge-bank`
- `npm run public-safety`
- `npm run check:routes`
- `npm run check:citations`
- `npm run test:citations`
- `npm run report:citations`
- `npm run check:knowledge-intake`
- `npm run check:nycac-facebook-events`
- `npm run evals:nycac-facebook-events`
- `npm run check:facebook-events-archive`
- `npm run evals:facebook-events-archive`
- `npm run check:wowlist-facebook-posts`
- `npm run evals:wowlist-facebook-posts`
- `npm run check:nycac-facebook-posts`
- `npm run evals:nycac-facebook-posts`
- `npm run check:personal-facebook-posts`
- `npm run evals:personal-facebook-posts`

## Public-Safety Rules

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health/financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, or raw community records.

Use public-safe summaries, redacted examples, representative diagrams, approved
artifacts, and careful collective-work language.

When uncertain, write: `TODO: Jamie approval required.`

## Knowledge Bank

Use `docs/knowledge-bank/` and `apps/www/src/data/proofs.ts` as the
public-safe claim layer.

Citational claims use `apps/www/src/data/knowledge-bank/records.ts` as their
canonical machine-readable source. Do not add or strengthen a public factual
claim without updating the canonical claim, evidence relationship, and source
records.

Use `<Claim>` for high-risk canonical wording and `<Cite>` for supported
authored prose. Do not type citation numbers manually.

Do not expose private source paths, private assets, protected locators, signed
URLs, or raw research artifacts. Regenerate the redacted public registry after
changing canonical records.

Website copy should project from the knowledge bank and stay optimized for
clarity, audience, and purpose.

Do not strengthen a claim in a public page unless the stronger claim exists in
the bank with source basis, status, guardrail, and public-use boundary.

Every structured claim needs status, support level, evidence class, public
wording, guardrail, protected boundaries, and last-reviewed date.

Treat Google Drive and iCloud inventories as research maps, not role evidence
or publication permission. Do not commit private Drive or file identifiers,
private links, synced paths, credentials, contact records, or row-level data.
Use opaque protected locators and public-safe structural summaries.

Treat campaign press sections as finding aids. A placement edge can establish
that a campaign site listed an article, but it cannot establish what the
article proves. Preserve original and archival URLs, deduplicate shared
articles, and require a separate close-read evidence relationship before using
an article for a claim or public projection.

The website should read as a composed portfolio, not a claims database.

Do not add `/proofs`, `/knowledge-bank`, or `/public-claims` public routes.

### Knowledge intake

- Give every supplied URL, memory, possible claim, artifact lead, engagement
  lead, or research lead a stable `INTAKE-` record or explicit duplicate hold.
- Close-read a public source before marking it reviewed or decomposed.
- Keep maturity, public-use policy, and editorial selection separate.
- Decompose sources into atomic claims with locators, evidence roles,
  limitations, anti-claims, and open inquiries.
- Do not turn Jamie's memory into independent corroboration.
- Do not silently discard unresolved material or publish it merely because the
  source is public.
- Report intake IDs and dispositions after processing new material.

## Chad Lens

Minimize the reader's burden. Make Jamie visible as the actor, explain what the
work made usable, translate specialized language for hiring and public-sector
readers, and use collective-work language where the work was collective.

## Scope Rules

Do not add a CMS, database, auth, search, analytics, AI chatbot, archive browser,
private document browser, full photo archive, heavy animation, or major framework
change for V1.

## Social-Media Archival Production

- Use authenticated access only for read-only review of public records unless
  Jamie explicitly requests a private-data operation.
- Never publish private messages, analytics, drafts, credentials, cookies,
  session material, or private collaborator records.
- Treat an account as project infrastructure, not proof that Jamie authored
  every post. Preserve collective authorship and changing stewardship.
- Count direct engagement only from recoverable account-authored replies,
  reposts, quote posts, mentions, or thread participation. A one-way tag,
  follow, unattributed aggregate reaction, or inferred view is not engagement.
- Store current profile counts as mutable reconciliation controls, not reach
  measures or deletion histories. Keep unresolved timeline slots explicit.
- Council-member-account activity is not official Council endorsement,
  adoption, reach, or policy causality.
- No verified account recovered means only that the bounded pass did not
  recover one; it never means no account existed.
- Treat Facebook Past Events as a dated interface population. Reconcile the
  displayed host control to recovered and explicitly unresolved slots; do not
  rename a reconciled control full historical content recovery.
- Treat annual Meta Business Suite Published exports as a surviving owner-data
  population. Reconcile every nonempty year and every unique post identity, but
  do not call that denominator every post ever created or a deletion history.
- Keep raw owner exports, native post and Page IDs, raw bodies, comments,
  interaction identities, authenticated routes, and sensitive posted URLs out
  of the public repository. Use one-way identities and public-safe route
  dispositions for reconciliation.
- Facebook response labels are not attendance, unique people, reach,
  endorsement, mandate, or impact. Keep organizer, cohost, venue, and official
  displays bounded to an event-level interface unless another source supports
  a stronger relationship.
- Treat a personal Facebook owner-post cursor population as a bounded returned
  surface, not an immutable all-ever account archive or deletion history.
  Keep raw posts, ordinary-life context, native IDs, comments, responder
  identities, audience-unknown material, and authenticated routes outside the
  public repository. A posted URL is a research lead until close-read; an
  outbound stakeholder mention is not inbound engagement.

## Launch-Readiness Evals

- Read `evals/launch-readiness/v19/evals.json` before optimizing the public site
  for production or job applications.
- Run `npm run eval:launch-readiness` to establish the current baseline.
- Improve one failing mutable criterion at a time and keep a change only when
  the lexicographic objective improves without regressing a hard gate or
  protected invariant.
- Do not satisfy human approval or rights-clearance gates on Jamie's behalf.
- Do not improve clarity, visual proof, or conversion by deleting citations,
  qualifications, collective credit, accessibility affordances, or public-safe
  boundaries.
- A release pass requires two independent observation runs for the same commit;
  use `npm run eval:launch-readiness:strict -- --observations <run-a>,<run-b>`.

## Deployment

Staging first: `staging.jamieburk.art`, noindex.
Production later: `jamieburk.art`, indexable only after Jamie approves content.

## Voice

Precise, warm, modular, ethically grounded. Documentation is care. Do not
overclaim.
