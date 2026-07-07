# Source Classes

This file defines how the knowledge bank can cite sources without turning the
public repo into a private archive.

## Rules

- Use public source IDs directly only when the source is already public and safe
  for readers.
- Use public-safe archive summaries to support claim discipline inside the repo;
  do not attach or quote the underlying private source files.
- If a source contains private correspondence, raw meeting material, account
  data, health/financial details, personal data, collaborator-private context,
  or legal-review material, cite only the approved aggregate claim.
- Add a source class before strengthening a public claim.

## Source Classes

| Class | Meaning | Public use | Boundary |
| --- | --- | --- | --- |
| `public-artifact` | Public-facing artifact, page, PDF, press item, certificate, public campaign page, or public record already safe to cite. | Can support public pages when relevant and current. | Cite what the artifact shows; do not infer private operational facts from it. |
| `private-confirmed` | Claim confirmed by private archive review but not supported by a publishable source artifact. | Internal claim discipline only unless converted to a public-safe summary. | Do not publish underlying source names, local paths, raw excerpts, or identifying details. |
| `needs-collaborator-approval` | Claim involves collaborators, coalition context, client context, quotes, photos, or relationship-sensitive details. | Do not publish until review is complete. | Use summary language or mark `TODO: Jamie approval required.` |
| `needs-citation` | Claim looks plausible but still needs a reviewed public source, approved artifact, or public-safe summary. | Internal only. | Do not publish as fact until sourced. |
| `protected` | Material may inform Jamie's confidence but should not enter public copy or this repo as proof. | No public use. | Keep out of the repo and out of the website. |
| `memory-only` | Personal recollection or working memory not yet confirmed by source review. | No public use beyond prompting research. | Do not convert into public claims. |
| `portfolio-synthesis` | Cross-project synthesis derived from multiple approved, public-safe claims. | Can shape positioning and page introductions. | Must remain grounded in the claim bank and avoid universal promises. |
| `approved-resume` | Current resume PDF approved for the public portfolio, including phone number in the PDF surface. | Public resume download and baseline claim support. | Do not publish old resume drafts, comments, or unapproved edits. |
| `certificate` | Public-safe certificate or training artifact. | Professional-development proof. | Describe completion only; do not inflate into a degree or formal credential. |
| `public-source` | A source already public on the web or in a public civic record. | Can be linked if current and relevant. | Attribute carefully; do not infer private operations from public pages. |
| `public-record` | Government or public-record material suitable for public claim support. | Can support scale/funding/status facts where reviewed. | Use exact legal/public-record meaning; avoid implying outcomes not in the record. |
| `public-safe-archive-summary` | A summary derived from Jamie's private records but scrubbed for public-safe use. | Supports the knowledge bank and selected public wording. | Do not publish raw records, private filenames, local paths, transcripts, emails, or contact lists. |
| `pending-public-citation` | A source believed to exist publicly but not yet verified in this repo. | Internal only. | Do not link, quote, or foreground until verified. |

## Canonical Source Groups

| Source group | Supports | Boundary |
| --- | --- | --- |
| Approved 2026 resume PDF | Core role, HJE, CallNYC, NYC Artist Coalition / FairRentNYC, Commercial Rent Stabilization, WOWList, Sunday Dinner, KC Town Hall, AI eval completion. | Current approved PDF only. |
| AI Evals certificate | AI evaluation literacy and professional development. | Course completion only. |
| HJE public sources and summaries | Legacy business context, public web transition, e-commerce/operations story. | Do not publish private dashboards, revenue detail, customer data, vendor terms, or credentials. |
| Politico New York article archive for CallNYC | Public press coverage: Miranda Neubauer, "Website provides new information about council members' focus," March 14, 2016. | Historical coverage only; keep CallNYC framed as an archived civic-tech prototype. |
| NYC Artist Coalition public campaign surfaces | Public coalition history around cultural-space advocacy, enforcement transparency, Fair Rent, and Commercial Rent Stabilization. | Collective-work language only. |
| Commercial Rent Stabilization public-safe summaries | Campaign-memory, source maps, policy/data framing, follow-up systems. | No private coalition notes, legal-review context, stakeholder lists, raw transcripts, or unapproved quotes. |
| WOWList public-safe archive summaries | Product model, technology stack, aggregate adoption, community platform context. | No raw user or organizer records. |
| Sunday Dinner workbook summary | Aggregate gathering/resident-artist support and participation systems. | No guest lists, addresses, contact records, private stories, or unapproved images. |
| KC Town Hall public-funding summary | Adaptive-reuse planning, public-benefit documentation, project frame, funding recommendation. | No private project-finance, banking, legal, property, or partner details. |
| Source-Backed Team Memory summaries | Lab/method framing, source artifact to structured record to human review habit. | No client-private source artifacts or private workspace details. |
