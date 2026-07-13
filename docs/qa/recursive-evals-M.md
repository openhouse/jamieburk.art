# Recursive Evals Protocol M

Use this protocol for launch-readiness passes, job-application readiness, and
PRs that change public claims. The goal is not to expand the site. The goal is
to make the current public surface accurate, contactable, verifiable,
public-safe, and ready to act from.

## Inputs

- Exact branch, commit SHA, and PR URL.
- Current staging URL and `/api/health` output.
- `docs/knowledge-bank/claims.md`, `apps/www/src/data/proofs.ts`, and
  `apps/www/src/data/work.ts`.
- Current resume PDF and contact/social links.
- Staging pages for home, work, Technical Operations, resume, contact, about,
  colophon, lab, and each case study.

## Recursive Loop

1. **Provenance pass:** confirm the branch, SHA, staging URL, health endpoint,
   robots policy, sitemap host, and canonical host being reviewed.
2. **Claim pass:** check every public claim against the knowledge bank. Strengthen
   understatements only when evidence supports them; soften or omit overclaims.
3. **Boundary pass:** confirm private material is absent, collective-work language
   is preserved, and public pages do not expose internal approval workflow.
4. **Hiring pass:** confirm the homepage, Technical Operations page, resume, and
   contact path make Jamie easy to refer, interview, and hire.
5. **Chad-lens pass:** run `npm run check:chad-lens`. Revise failing public
   surfaces until the deterministic criterion reaches 10/10.
6. **Knowledge-lifecycle pass:** run `npm run check:knowledge-lifecycle`.
   Continue intake, reading, research, promotion, and editorial selection until
   every criterion passes without promoting unresolved claims. The current
   suite contains 52 deterministic lifecycle criteria, including bounded Teams,
   Shared Drive, project-social, authenticated-search, collaborator-credit,
   city-dialogue, and full-population CallNYC, WOWList, and KC Town Hall
   archival-production gates.
7. **Web pass:** check routes, redirects, metadata, sitemap, robots, mobile
   layout, keyboard navigation, focus states, and key links.
8. **Automation pass:** run `npm run check`, `npm run check:evals`,
   `npm run preflight:staging`, and `npm run preflight:production` when the
   environment is available.
9. **Decision pass:** record remaining blockers as P0, P1, or P2. Repeat the loop
   only for unresolved P0/P1 blockers.

## Chad-Lens Criterion

`npm run check:chad-lens` is a deterministic copy regression eval. It requires
all 10 criteria to pass:

- Jamie is the visible actor on the homepage, Technical Operations page, resume
  page, work index, and work cards.
- The three role-focused introductions say what the resulting structure lets
  people or teams do.
- Every structured work item names a concrete usable output.
- Work cards show Jamie's role and dates before project detail.
- Collective civic work retains contribution and stewardship language.

The eval reduces review drift; it does not establish factual truth. Claim
accuracy still belongs to the knowledge-bank, provenance, and boundary passes.
The initial branch baseline was 5/10. The copy hill climb added explicit team
agency to four introductions and made Jamie's role visible on work cards.

## P0: Blocks Job-Application Sharing

- Public pages contain TODO, placeholder, pending approval, or before-launch
  language.
- Resume PDF is missing, placeholder, unreadable, or inconsistent with the site.
- Public contact path is missing or broken.
- CallNYC uses unsupported 2014-2015 language or lacks the verified 2016
  CouncilStat / Politico framing.
- Private material, raw transcripts, private local paths, credentials, private
  screenshots, private fonts, or unapproved personal/community records appear in
  the repo or public surface.
- `npm run check`, `npm run check:chad-lens`, or `npm run public-safety` fails.

## P1: Blocks Production Cutover

- Production does not serve the reviewed portfolio SHA.
- Apex, `www`, and `npr.jamieburk.art` routing are not documented and verified.
- TLS, canonical URLs, sitemap host, robots policy, or `X-Robots-Tag` behavior is
  wrong for staging or production.
- Route smoke tests or key external links fail.
- Mobile and keyboard QA have not been reviewed.

## P2: Does Not Block Immediate Sharing

- Additional representative screenshots, diagrams, or photos.
- Broader archive recovery.
- More exhaustive citation density on non-controversial background sentences.
- Visual refinements that do not affect legibility, safety, or conversion.

## Speaker Lens

- **Jamie Burkart:** Is this true, bounded, and useful to share now?
- **Abby Covert:** Can a new reader find the right page without learning the
  internal structure?
- **Cyd Harrell:** Does the site prove public-interest delivery judgment?
- **Shreya Shankar:** Are claims and checks tied to evidence, not confidence
  theater?
- **Lisa Gelobter:** Is the release sequence operationally sane?
- **Dominic P. Berg:** Is the patch small, reviewable, and verifiable?
- **Amanda Clayman:** Are blockers separated from refinements?
- **Austin Belcak:** Would a hiring manager know what to do next?
- **David C. Baker:** Is the value easy to buy or refer?
- **Deborah Treisman:** Is the public copy finished, restrained, and precise?
- **Mimi Onuoha:** Are protected absences legible without exposure?
- **Rosten Woo:** Are civic materials understandable without internal context?
- **Stephen Coles:** Is the type and interface legible enough to trust?
- **Shannon Mattern:** Does the site show infrastructure as care, not clutter?
- **Darius Kazemi:** Is the system simple enough to maintain?
