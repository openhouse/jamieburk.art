# Portfolio Blind-Spot Evals

**Reviewed:** July 15, 2026

**Suite:** `.agents/evals/portfolio-blind-spots.json`

**Evidence:**
`docs/knowledge-bank/data/portfolio-blind-spots-evidence-2026-07-15.json`

## Rule

The point of this suite is not to turn every blind spot green. It is to make
each blind spot observable, improve every condition an agent can legitimately
improve, and stop when the missing evidence must come from a person, a hiring
process, or a rights holder.

A protocol is not a completed interview. A public article is not collaborator
approval. A photo file is not permission. An application is not a market
response. The agent may prepare these channels but may not impersonate their
results.

## BS-001 Collaborator Corroboration And Independent Review

### Current state

The knowledge bank contains public records, project archives, Jamie's bounded
recollections, and AI-assisted archival reviews. It does not yet contain two
independent reviews of the exact candidate or sufficient collaborator response
for every role claim that rests primarily on recollection.

### Review packet

Give each reviewer:

1. The exact candidate commit and relevant public page.
2. The claim, source posture, boundaries, and anti-claims.
3. A request to mark each statement **confirm**, **complicate**, **correct**,
   **not observed**, or **do not publish**.
4. Optional fields for the reviewer's relationship to the project, period of
   direct observation, public attribution preference, and permission scope.

Store only the reviewer's public-safe disposition in this repository. Keep
contact details, raw correspondence, private memories, and unapproved language
outside it.

### Completion evidence

- Two independent exact-candidate scorecards.
- Project-relevant collaborator dispositions for recollection-dependent claims.
- Corrections and permission limits integrated without erasing disagreement.

**Current status:** Human-blocked. Zero reviews are recorded.

## BS-002 First-Screen Hiring Conversion

The homepage hero now exposes the complete hiring proposition without requiring
archive knowledge:

- **Role:** Technical Project Manager - Product Operations & Implementation.
- **Action:** turn emerging stakeholder needs into requirements, workflows,
  decision records, onboarding materials, and handoffs.
- **End:** help teams decide, launch public work, and transfer ownership.
- **Actions:** selected work, resume, and contact.
- **Framing:** operating structure is emerging or still forming; the language
  does not shame collaborators for uncertainty or transition.

The Technical Operations page then maps that promise to named projects and what
became usable. The current public selection leads with Harry J. Epstein,
FairRentNYC / Commercial Rent Stabilization, and CallNYC.

**Current status:** Machine criterion met.

## BS-003 Current Professional Evidence

The forward-facing record is not a course badge standing alone. It includes:

| Governed proof | Current signal | Boundary |
| --- | --- | --- |
| `fair-rent-public-data-pilot` | 2026 data-product requirements and privacy-by-design work | Proposal, not City adoption |
| `commercial-vacancy-quarterly-corpus` | 81-quarter corpus through Q4 2025, assembled and reviewed in 2026 | Corpus assembly, not source-data authorship |
| `source-backed-team-memory-method` | 2026 bounded knowledge-system and review-loop method | Lab and consulting method, not production SaaS or completed client delivery |
| `product-operations-delivery-practice` | Current requirements-to-handoff operating practice | Transferable practice, not certification |
| `ai-evals-professional-development` | 2026 application-centric AI evaluation coursework | Professional development, not instructor affiliation or certification authority |

Together these establish current implementation, product operations, data,
knowledge-system, and AI-evaluation direction.

**Current status:** Machine criterion met.

## BS-004 Hiring-Reader And Market Observation

### Timed reader protocol

Use the exact candidate with no optimization history. Give each reader two
minutes across the homepage, Technical Operations page, and resume. Ask them to:

1. Name the role family.
2. Describe what Jamie makes usable.
3. Name three accurate proof examples.
4. Identify the strongest unresolved doubt.
5. Choose the next action they would take.

Record task completion, time, route sequence, verbatim interpretation up to 25
words with consent, and an observer's behavioral note. Do not show the expected
answers until the session ends.

Run at least five sessions. At least two readers should have relevant hiring or
recruiting experience. Store only consented, de-identified aggregate findings
in this repository.

### Market-response protocol

Across a bounded application sample, record only:

- target role family;
- portfolio entry route;
- response category: no response, decline, screening, interview, referral, or
  offer;
- whether the portfolio was explicitly mentioned;
- the observation window.

Keep employer names, contacts, correspondence, compensation, demographic data,
and private analytics outside the public repository.

**Current status:** Human-blocked. Zero sessions and zero response observations
are recorded.

## BS-005 Three Lead Action-To-Outcome Chains

### Harry J. Epstein Company

**Context:** an established industrial supplier adapting legacy knowledge and
customer service to e-commerce.

**Jamie's action:** translated operating knowledge into web, e-commerce,
analytics, marketing, content, and workflow improvements.

**Work products:** searchable e-commerce and product content, analytics and
marketing workflows, and repeatable digital practices.

**Observable result:** clearer product discovery and ordering, more repeatable
internal workflows, and a bounded contribution to a period of revenue growth.

**Boundary:** contribution and stewardship do not establish sole causation or
ownership of company outcomes.

### FairRentNYC / Commercial Rent Stabilization

**Context:** a multi-organization collaboration needed shared memory, source
lineage, public action tools, and bounded data-product requirements.

**Jamie's action:** built shared memory, created a legislative provenance map,
helped coordinate a versioned web relaunch, organized an 81-quarter corpus, and
specified a privacy-preserving pilot.

**Work products:** decision and action records, source map, public action paths,
vacancy corpus, and smallest-serious data-product scope.

**Observable result:** collaborators gained traceable decisions, source
lineage, public interfaces, and an implementable pilot specification.

**Boundary:** these contributions do not establish movement leadership,
legislative authorship, policy causation, or City implementation of the pilot.

### CallNYC

**Context:** constituent-services data was difficult to interpret as issue
pathways and resident next steps.

**Jamie's action:** built and iterated an independent prototype's issue
taxonomy, guidance, public interface, and communication system.

**Work products:** issue pages, district and representative context, next-step
guidance, and a repeatable social translation system.

**Observable result:** the archived interface made issue pathways more legible,
received public coverage, and drew visible engagement from Council-member
accounts.

**Boundary:** the prototype remained independent, archived, and unofficial;
coverage and engagement do not establish City adoption, universal reach, or
policy impact.

**Current status:** Machine criterion met.

## BS-006 Rights-Aware Visual Edit

The public asset tree currently contains the approved resume PDF and no raster
project-image set. That absence is now measured rather than disguised by styled
artifact cards.

For each proposed visual, record:

- subject and project;
- date or bounded chronology;
- what work condition, artifact, interaction, or result it demonstrates;
- photographer and rights holder;
- permission and consent status;
- alt text and caption;
- supported claim identifiers;
- public-display disposition.

Begin with the three lead case studies. A photo editor should select for
evidence, not atmosphere. Files remain outside the public repository until
rights and consent are cleared.

**Current status:** Human-blocked. Zero selected or rights-cleared lead visuals
are recorded.

## BS-007 Maintenance Dashboard

Run:

```bash
npm run report:knowledge-maintenance
```

The report inventories sources, assertions, claims, proof records, research
tasks, review age, held and not-recovered records, contradictions, unresolved
references, intake sources without assertions, unlinked sources, duplicate
IDs, and target-role coverage.

The first run exposed one unlinked public Espinal source. This pass decomposed
it into `AST-NAC-ESPINAL-TNR-PUBLIC-CREDIT-2019`; the current report has zero
unresolved source IDs, intake sources without assertions, unlinked sources,
duplicate IDs, or reviews older than the 90-day policy.

The report does not promote claims. Forty-six held claims, three not-recovered
claims, five inference claims, and the open research queue remain visible work.

**Current status:** Machine criterion met.

## BS-008 Prof. Margaret Morse Lens

Margaret Morse's historical evaluations do not function here as a testimonial
wall. They establish a criterion: can the portfolio recognize thought embodied
in an installation, tool, situation, act of attention, or mode of hospitality,
or does it value only what becomes an organizational deliverable?

The public hill climb adds one bounded threshold to the About page:

- participatory art and social software remain visible as origins of the
  present operating practice;
- people appear in relation to place, system, and one another;
- structure begins with attention to people, materials, histories, and
  relationships;
- the resulting forms are meant to be inhabited, questioned, and carried
  forward, not merely administered.

The claim cites only the public 2006 Good Times Open House article. The
protected educational record, student identifier, grades, private locator,
correspondence, and recommendation image do not enter the public citation
registry. The recommendation remains metadata-only pending rights and display
review.

The source review also found a conflict: the recovered unofficial evaluation
file records the New York installation title as `Art is Long`, while Jamie's
supplied transcription records `Time is Long`. The title remains held. Neither
reading is silently corrected or projected.

The first-screen role proposition is unchanged. This deeper threshold explains
why Jamie's operational systems attend to participation, memory, place, and
care without asking a hiring reader to infer the role.

**Current status:** Machine criterion met.

## BS-009 Prof. Warren Sack Lens

Warren Sack's historical evaluations supply a second criterion: does the
portfolio show Jamie moving through the complete social-information-systems
sequence, or only list finished outputs?

The protected source layer distinguishes:

1. relational analysis across physical and online social space;
2. recursive analysis of overlapping group memberships;
3. a social-and-image similarity prototype;
4. an interactive interface built and demonstrated with Max/MSP Jitter;
5. a collectively designed sensor- and projection-based installation.

The public claim stays narrower. It describes the recurring concern with people
in relation to place, system, and one another. Four governed proof records show
that this pattern continued beyond student work:

- `wowlist-community-platform`;
- `callnyc-civic-data-guidance`;
- `nyc-artist-coalition-public-web-infrastructure`;
- `source-backed-team-memory-method`.

The evaluator rejects any public claim that Jamie independently invented
structural equivalence, solely designed the collective installation, or
delivered a historical course prototype as a production search system. Sack's
interpretation remains attributed to Sack inside the protected evidence layer.

**Current status:** Machine criterion met.

## Hill-Climb Result

The machine-actionable criteria for role clarity, current evidence,
action-to-outcome chains, maintenance, the Morse lens, and the Sack lens are
met. Protocols and honest zero baselines now exist for the remaining human
work. The suite therefore stops at **human-blocked**, not threshold-met:
collaborator review, hiring-reader observation, market feedback, and
visual-rights clearance still require people.
