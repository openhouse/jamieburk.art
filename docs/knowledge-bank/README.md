# Knowledge Bank

This directory is the public-safe knowledge base for Jamie Burkart's
professional accomplishment claims.

The repo is public. Do not put anything here that would be unsafe, unfair, too
private, or too hard to defend if quoted in a newspaper.

The website is a projection of this bank. The bank can hold more structure than
the site shows: canonical claim language, evidence posture, source-basis
categories, public-use guidance, guardrails, projection surfaces, and explicit
non-public boundaries.

The website should use the clearest subset for a specific audience and purpose.

## Knowledge Lifecycle

Every useful fragment should receive a disposition, but publication is never
automatic:

1. **Capture:** Add a public-safe intake record with provenance, why it matters,
   project links, and explicit boundaries.
2. **Triage:** Link it to a source, inquiry, claim, correction, or a documented
   defer/reject reason.
3. **Research:** Read sources closely, record what each establishes and does not
   establish, and keep unresolved questions open.
4. **Mature:** Promote a claim only when evidence, confidence, reviewer,
   boundaries, and anti-claims are present.
5. **Project:** Decide independently whether the claim belongs on a particular
   website page, in a photo brief, only in the public-safe bank, or nowhere yet.
6. **Revisit:** Treat new sources, collaborator corrections, and photo-editor
   discoveries as fresh intake. They may strengthen, narrow, supersede, or
   retract earlier claims.

The canonical typed records live in `apps/www/src/data/knowledge-bank/`. Run
`npm run knowledge-lifecycle` to enforce the lifecycle and
`npm run report:knowledge-lifecycle` to see held mature claims and research
backlog items.

## Purpose

The knowledge bank exists to:

- preserve strong, defensible professional claims;
- keep public site copy grounded in evidence;
- separate verified scope from open questions;
- make future edits easier to audit;
- prevent both overstatement and understatement;
- reduce the risk that private evidence leaks into public pages;
- make the Technical Operations / Product Operations / Implementation story
  easier to maintain.

## Publication Model

- **Knowledge bank:** public-safe repository layer for defensible claims,
  boundaries, and projection guidance.
- **Intake ledger:** lossless public-safe queue of incoming URLs, artifacts,
  memories, hypotheses, corrections, and photo leads with explicit disposition.
- **Citation registry:** canonical sources, evidence relationships, claims,
  projections, inquiries, corrections, and page plans in
  `apps/www/src/data/knowledge-bank/records.ts`.
- **Structured proof data:** broader professional claim layer in
  `apps/www/src/data/proofs.ts`.
- **Public website:** purpose-built projection that selects, sequences, and
  rewrites claims for readers.
- **Private archive:** not in this repo.

## Core Rule

If a private archive supports a public claim, describe the aggregate result or
public-safe pattern. Do not describe the private record inventory in unnecessary
detail.

## Projection Rule

The site should project from this bank, not mirror it.

For hiring pages, prefer role-fit claims: requirements, workflow mapping,
documentation architecture, source-backed memory, implementation support,
quality assurance, user acceptance testing, stakeholder updates, operating
documentation, onboarding, and handoffs.

For case studies, prefer project-specific claims: what was unclear, what became
usable, what Jamie did, and what boundary remains protected.

For homepage proof, prefer compact claims that a busy reader can understand in
one pass.

See [citational-care.md](citational-care.md) for the authoring and validation
workflow and [projects/callnyc.md](projects/callnyc.md) for the first complete
pilot.
