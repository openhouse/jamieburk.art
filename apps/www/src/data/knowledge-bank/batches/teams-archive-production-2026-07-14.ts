import type {
  ClaimRecord,
  IntakeItem,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedBy = ["Jamie Burkart", "Codex archival review"];

export const teamsArchiveProductionBatch20260714: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
} = {
  intake: [
    {
      id: "INT-TEAMS-PROJECT-HISTORY-APPRAISAL-2026",
      kind: "artifact-lead",
      capturedAt: "2026-07-14",
      capturedFrom: "Jamie Projects History archival production pass",
      publicSafeSummary:
        "Appraise a retrospective project-history collection for public traces, defensible project claims, and role-credit gaps.",
      projects: ["portfolio-archive", "sunday-dinner", "nter-chng"],
      status: "integrated",
      disposition: "source-created",
      sourceIds: [
        "SRC-TEAMS-PROJECT-HISTORY-OVERVIEW-2026",
        "SRC-TEAMS-SUNDAY-DINNER-ARCHIVE-2016",
        "SRC-NTER-CHNG-PROJECT-SITE-2011",
        "SRC-NTER-CHNG-PITCH-2010",
        "SRC-NTER-CHNG-ANH-KC-2011"
      ],
      claimIds: [
        "CLM-SUNDAY-DINNER-100TH-PUBLIC-TRACE",
        "CLM-NTER-CHNG-CO-CREATION",
        "CLM-NTER-CHNG-PARTICIPATORY-SYSTEM",
        "CLM-NTER-CHNG-AMERICA-NOW-HERE"
      ],
      researchTaskIds: ["TASK-NTER-CHNG-ROLE-AND-TECHNICAL-DETAIL"],
      notes: [
        "Existing bank coverage was retained for already integrated projects; newly surfaced traces were promoted only to the maturity supported by the reviewed source.",
        "The July 15 public-source pass resolved the NTER CHNG co-creator question and consolidated the earlier NTR CHNG lead into the canonical project record."
      ],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "INT-TEAMS-CLAUDETTES-PLACEHOLDER-2026",
      kind: "artifact-lead",
      capturedAt: "2026-07-14",
      capturedFrom: "Jamie Projects History archival production pass",
      publicSafeSummary:
        "Recover public project credits for Claudette's Theater on Wheels without treating an unavailable cloud placeholder as a missing historical record.",
      projects: ["claudettes-theater-on-wheels"],
      status: "integrated",
      disposition: "source-created",
      sourceIds: [
        "SRC-CLAUDETTES-MICHAEL-REES-PROJECT-PAGE-2022",
        "SRC-CLAUDETTES-MAKE-US-VISIBLE-MUNICH-2022"
      ],
      claimIds: [],
      researchTaskIds: ["TASK-CLAUDETTES-ROLE-SOURCE-RECOVERY"],
      notes: [
        "The first pass preserved the selected public-page capture as unavailable rather than nonexistent.",
        "A July 15 follow-up recovered a live primary project page and a public event capture that credit Jamie's collaboration while preserving Michael Rees, Anne Dufy Burkart, Julia Fredenburg, Claudette, and the wider #MakeUsVisible context.",
        "The role assertion is integrated as source-backed knowledge. Public projection remains an editorial decision after project-classification review."
      ],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "INT-TEAMS-CRS-ARCHIVAL-PRODUCTION-2026",
      kind: "artifact-lead",
      capturedAt: "2026-07-14",
      capturedFrom: "Commercial Rent Stabilization working-archive appraisal",
      publicSafeSummary:
        "Develop source-backed claims from shared campaign memory, legislative provenance, and privacy-preserving commercial-data product briefs.",
      projects: ["fair-rent-nyc", "commercial-rent-data"],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: [
        "SRC-TEAMS-CRS-RUNNING-MINUTES-2026",
        "SRC-TEAMS-CRS-PROVENANCE-REDLINE-2026",
        "SRC-TEAMS-CRS-PUBLIC-DATA-BRIEFS-2025-2026",
        "SRC-TEAMS-CRS-90-DAY-ACTION-PLAN-2026"
      ],
      claimIds: [
        "CLM-CRS-SHARED-MEMORY-SYSTEM",
        "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE",
        "CLM-CRS-PRIVACY-PRESERVING-DATA-PILOT"
      ],
      researchTaskIds: ["TASK-CRS-90-DAY-IMPLEMENTATION-VERIFICATION"],
      notes: [
        "Private strategy, legal-review context, stakeholder details, and vulnerable business information remain outside the repository.",
        "The 90-day action plan is retained as evidence of operating design, not proof that every proposed deliverable was adopted or completed."
      ],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "INT-TEAMS-JOB-HUNT-APPRAISAL-2026",
      kind: "artifact-lead",
      capturedAt: "2026-07-14",
      capturedFrom: "Job-hunt dossier archival production pass",
      publicSafeSummary:
        "Reconcile current role positioning with the bounded source-backed team-memory method and its public-safe operating constraints.",
      projects: ["career-positioning", "source-backed-team-memory"],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: [
        "SRC-TEAMS-JOB-HUNT-CONTEXT-2026",
        "SRC-TEAMS-SOURCE-BACKED-MEMORY-SPRINT-2026"
      ],
      claimIds: ["CLM-SOURCE-BACKED-MEMORY-BOUNDED-SPRINT"],
      researchTaskIds: [],
      notes: [
        "The public record preserves the reusable method, not collaborator identity, pricing, private company context, or unaccepted commercial outcomes.",
        "The July 15 close reading retained the dossier as a routing map and did not upgrade quantified claims from summary or resume language."
      ],
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  sources: [
    {
      id: "SRC-TEAMS-PROJECT-HISTORY-OVERVIEW-2026",
      title: "Jamie Projects History collection overview",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-02-01",
      publicCitation:
        "Public-safe appraisal of Jamie Burkart's retrospective project-history collection, reviewed July 14, 2026; underlying archive not published.",
      publicNote:
        "The collection is an evidence map, not automatic proof of Jamie's role in every contained project or artifact.",
      supportsGenerally: [
        "fifteen named project-family collections",
        "surviving public web captures and project traces",
        "a research path for underrepresented cultural and technical work"
      ],
      doesNotEstablish: [
        "Jamie's authorship of every contained artifact",
        "complete collaborator rosters",
        "public-display permission for private or participant material"
      ]
    },
    {
      id: "SRC-TEAMS-SUNDAY-DINNER-ARCHIVE-2016",
      title: "Sunday Dinner public archive capture",
      kind: "archived-web-capture",
      visibility: "public-metadata-only",
      preservationStatus: "archived",
      capturedAt: "2026-02-01",
      publicCitation:
        "Archived public Sunday Dinner index preserving March 14, 2016, posts labeled 'Sunday Dinner 100'; underlying local capture not published.",
      publicNote:
        "This is a lower-bound public trace. It corroborates a hundredth-gathering milestone but does not independently establish the later 300-plus total or residency scale.",
      supportsGenerally: [
        "a public Sunday Dinner archive",
        "March 14, 2016, posts labeled Sunday Dinner 100",
        "recurring documentation of the gathering practice"
      ],
      doesNotEstablish: [
        "the current 300-plus gathering total",
        "the 20-plus resident-artist total",
        "attendance or comprehensive participant records"
      ]
    },
    {
      id: "SRC-CLAUDETTES-MICHAEL-REES-PROJECT-PAGE-2022",
      title: "Claudette's Theatre on Wheels project page",
      organization: "Michael Rees / ad hoc",
      author: "Michael Rees",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://michaelrees.org/claudette",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Michael Rees, 'Claudette's Theatre on Wheels,' project page, accessed July 15, 2026.",
      publicNote:
        "The page credits the augmented-reality collaboration and separately credits the people who produced the source video with Claudette.",
      supportsGenerally: [
        "Jamie Burkart and Michael Rees as collaborators on the augmented-reality experience",
        "the #MakeUsVisible Munich context",
        "video produced by Jamie Burkart, Anne Dufy Burkart, and Julia Fredenburg with Claudette",
        "video filmed in 2017"
      ],
      doesNotEstablish: [
        "sole authorship by Jamie",
        "sole authorship by Michael Rees",
        "Jamie's authorship of every technical or artistic component",
        "ownership of Claudette's life story"
      ]
    },
    {
      id: "SRC-CLAUDETTES-MAKE-US-VISIBLE-MUNICH-2022",
      title: "#MakeUsVisible Munich event capture",
      organization: "ARORA / XR Ensemble",
      kind: "archived-web-capture",
      visibility: "public-metadata-only",
      preservationStatus: "archived",
      capturedAt: "2026-01-08",
      publicCitation:
        "Archived public #MakeUsVisible Munich event page for 'Claudette's Theatre On Wheels,' reviewed July 15, 2026; local capture not published.",
      publicNote:
        "The capture preserves event dates, venue, artist credits, and a description of the short-video interaction without exposing local archive paths.",
      supportsGenerally: [
        "an October 1-31, 2022, Munich presentation",
        "Residenz Theatre as the displayed venue",
        "Michael Rees and Jamie Burkart as displayed artists",
        "short clips activated through clickable tondos in the app"
      ],
      doesNotEstablish: [
        "attendance or audience reach",
        "sole authorship by either displayed artist",
        "the division of every technical task",
        "rights to republish the underlying audio or images"
      ]
    },
    {
      id: "SRC-TEAMS-CRS-RUNNING-MINUTES-2026",
      title: "Commercial Rent Stabilization collaboration running minutes",
      author: "Jamie Burkart and collaborators",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-05-13",
      publicCitation:
        "Public-safe aggregate review of Commercial Rent Stabilization collaboration running minutes, reviewed July 14, 2026; private working record not published.",
      publicNote:
        "The review preserves system design and Jamie's documented stewardship while withholding strategy, contact, legal-review, and vulnerable-business context.",
      supportsGenerally: [
        "a shared memory system for meetings, decisions, open questions, actions, and campaign history",
        "Jamie as the named steward of the running record",
        "city and state lanes tracked as aligned but distinct",
        "consent and privacy controls for business stories and contact data"
      ],
      doesNotEstablish: [
        "Jamie's sole leadership of the coalition",
        "official legal advice",
        "ownership of partner relationships",
        "policy outcomes caused by one person"
      ]
    },
    {
      id: "SRC-TEAMS-CRS-PROVENANCE-REDLINE-2026",
      title: "Commercial Rent Stabilization legislative provenance redline, 2019-2025",
      author: "Jamie Burkart, NYC Artist Coalition",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-05-16",
      publicCitation:
        "Jamie Burkart, NYC Artist Coalition, public-safe summary of a Commercial Rent Stabilization legislative provenance redline, updated May 16, 2026; working artifact not published.",
      publicNote:
        "Tracked-change reviewer labels identify source layers, not individual drafting authorship or legal approval.",
      supportsGenerally: [
        "Jamie prepared the provenance artifact",
        "the redline begins with NYC Council Intro 93",
        "successive layers include Fair Rent NYC legal-counsel recommendations, Small Business Survival Act-derived language, and 2025 Albany revisions",
        "the artifact distinguishes policy lineage from individual authorship"
      ],
      doesNotEstablish: [
        "Jamie authored the legislation",
        "the artifact is official legal analysis",
        "every inherited provision remains legally sufficient",
        "reviewer labels are individual drafting credits"
      ]
    },
    {
      id: "SRC-TEAMS-CRS-PUBLIC-DATA-BRIEFS-2025-2026",
      title: "Commercial vacancy and lease-cost open-data pilot briefs",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-03-27",
      publicCitation:
        "Jamie Burkart, public-safe aggregate review of 2025-2026 commercial vacancy and lease-cost open-data pilot briefs; working artifacts reviewed July 14, 2026 and not published in full.",
      publicNote:
        "The briefs are proposals and product specifications. They do not establish agency adoption, data publication, or an implemented City product.",
      supportsGenerally: [
        "Jamie authored privacy-preserving commercial-data proposals",
        "a smallest-serious pilot comprising an indicators table, coverage and suppression table, and methods note",
        "minimum fields for geography-aggregated vacancy and lease-cost indicators",
        "explicit exclusion of raw confidential filings and identifying records"
      ],
      doesNotEstablish: [
        "City adoption or implementation",
        "publication of the proposed indicators",
        "agency approval",
        "access to confidential tax or lease records"
      ]
    },
    {
      id: "SRC-TEAMS-CRS-90-DAY-ACTION-PLAN-2026",
      title: "Fair Rent NYC and Commercial Rent Stabilization 90-day action plan",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-04-06",
      publicCitation:
        "Public-safe appraisal of Jamie Burkart's April 2026 Fair Rent NYC and Commercial Rent Stabilization 90-day action plan; private working artifact not published.",
      publicNote:
        "The appraisal preserves the operating design and explicit role boundaries while withholding names, strategy, contacts, and live-campaign details.",
      supportsGenerally: [
        "a role framed around shared public goods rather than sole movement ownership",
        "a canonical join path and recurring room",
        "a shared message kit and stewarded story bank",
        "an implementation-readiness packet",
        "a durable movement-memory and source-of-truth spine"
      ],
      doesNotEstablish: [
        "coalition adoption of the plan",
        "completion of every proposed deliverable",
        "sole leadership by Jamie",
        "consent to publish private campaign strategy or participant information"
      ]
    },
    {
      id: "SRC-TEAMS-JOB-HUNT-CONTEXT-2026",
      title: "Job-hunt context and evidence map",
      author: "Jamie Burkart with AI-assisted archival synthesis",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-03",
      publicCitation:
        "Public-safe appraisal of Jamie Burkart's 2026 job-hunt context and evidence map; underlying dossier not published.",
      publicNote:
        "The map routes research toward primary artifacts and approved resume language; it is not independent proof of each summarized accomplishment.",
      supportsGenerally: [
        "technical project management, product operations, implementation, and knowledge systems as the current role frame",
        "source-backed team memory as a current practice direction",
        "a distinction between public-facing tools and backstage operating systems"
      ],
      doesNotEstablish: [
        "independent verification of every resume metric",
        "acceptance of any proposal",
        "permission to publish private job-search conversations"
      ]
    },
    {
      id: "SRC-TEAMS-SOURCE-BACKED-MEMORY-SPRINT-2026",
      title: "Source-Backed Team Memory Sprint proposal",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-06-26",
      publicCitation:
        "Jamie Burkart, public-safe method summary derived from a June 2026 Source-Backed Team Memory Sprint proposal; recipient and commercial terms omitted.",
      publicNote:
        "The source establishes a designed method and offer, not a completed client engagement or production software deployment.",
      supportsGenerally: [
        "one bounded source-to-memory loop",
        "one approved non-sensitive or synthetic source bundle",
        "human review of AI-drafted organizational memory",
        "a friction map, small prototype, privacy notes, and continue-revise-stop recommendation"
      ],
      doesNotEstablish: [
        "a completed client engagement",
        "a production SaaS platform",
        "broad access to company systems",
        "acceptance of the proposed commercial terms"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-TEAMS-PROJECT-HISTORY-FIFTEEN-FAMILIES",
      sourceId: "SRC-TEAMS-PROJECT-HISTORY-OVERVIEW-2026",
      project: "portfolio-archive",
      assertion:
        "The appraised collection contains fifteen named project-family directories spanning cultural programs, civic tools, public campaigns, community platforms, and built-environment work.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-SUNDAY-DINNER-100TH-PUBLIC-TRACE",
      sourceId: "SRC-TEAMS-SUNDAY-DINNER-ARCHIVE-2016",
      project: "sunday-dinner",
      assertion:
        "The archived public index includes March 14, 2016, posts labeled 'Sunday Dinner 100,' providing a public lower-bound trace for the recurring practice.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-SUNDAY-DINNER-100TH-PUBLIC-TRACE"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CLAUDETTES-AR-COLLABORATION",
      sourceId: "SRC-CLAUDETTES-MICHAEL-REES-PROJECT-PAGE-2022",
      project: "portfolio-archive",
      assertion:
        "Michael Rees's public project page credits Jamie Burkart and Michael Rees with collaborating on an augmented-reality experience for #MakeUsVisible Munich and credits Jamie Burkart, Anne Dufy Burkart, and Julia Fredenburg with Claudette on the source video.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-CLAUDETTES-MUNICH-EVENT",
      sourceId: "SRC-CLAUDETTES-MAKE-US-VISIBLE-MUNICH-2022",
      project: "portfolio-archive",
      assertion:
        "The archived public event page displays an October 1-31, 2022, Munich presentation at Residenz Theatre, credits Michael Rees and Jamie Burkart as artists, and describes short clips activated through clickable tondos in the app.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: [],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-CRS-RUNNING-MEMORY-SYSTEM",
      sourceId: "SRC-TEAMS-CRS-RUNNING-MINUTES-2026",
      project: "fair-rent-nyc",
      assertion:
        "The running record identifies Jamie as its steward and structures decisions, actions, open questions, city and state lanes, consent levels, and data-follow-up responsibilities as shared campaign memory.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-CRS-SHARED-MEMORY-SYSTEM"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CRS-90-DAY-SHARED-PUBLIC-GOODS",
      sourceId: "SRC-TEAMS-CRS-90-DAY-ACTION-PLAN-2026",
      project: "fair-rent-nyc",
      assertion:
        "Jamie's 90-day plan structures the work around a join path, recurring room, message kit, story bank, implementation-readiness packet, and durable shared memory while explicitly rejecting sole movement ownership.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-CRS-PROVENANCE-REDLINE-SOURCE-LAYERS",
      sourceId: "SRC-TEAMS-CRS-PROVENANCE-REDLINE-2026",
      project: "fair-rent-nyc",
      assertion:
        "Jamie's tracked-change redline makes successive policy source layers visible while explicitly separating reviewer labels from individual legislative drafting credit.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CRS-DATA-PILOT-SMALLEST-SERIOUS-V1",
      sourceId: "SRC-TEAMS-CRS-PUBLIC-DATA-BRIEFS-2025-2026",
      project: "commercial-rent-data",
      assertion:
        "Jamie's public-data brief specifies a smallest-serious pilot with an aggregate indicators table, coverage and suppression table, methods note, minimum useful fields, and explicit confidential-data exclusions.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-CRS-PRIVACY-PRESERVING-DATA-PILOT"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-JOB-HUNT-CURRENT-ROLE-FRAME",
      sourceId: "SRC-TEAMS-JOB-HUNT-CONTEXT-2026",
      project: "career-positioning",
      assertion:
        "The current evidence map frames Jamie's work around technical project management, product operations, implementation, documentation architecture, public-interest technology, and source-backed memory.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-SOURCE-BACKED-MEMORY-BOUNDED-SPRINT"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-SOURCE-BACKED-MEMORY-BOUNDED-SPRINT",
      sourceId: "SRC-TEAMS-SOURCE-BACKED-MEMORY-SPRINT-2026",
      project: "source-backed-team-memory",
      assertion:
        "Jamie designed a bounded source-backed memory sprint around one approved source bundle, human review, a small prototype, explicit privacy controls, and a continue-revise-stop decision.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-SOURCE-BACKED-MEMORY-BOUNDED-SPRINT"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    }
  ],
  claims: [
    {
      id: "CLM-SUNDAY-DINNER-100TH-PUBLIC-TRACE",
      project: "sunday-dinner",
      internalClaim:
        "A surviving public archive labels multiple March 14, 2016, posts 'Sunday Dinner 100,' corroborating that the recurring practice had reached a hundredth-gathering milestone by then.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "A surviving public archive preserves a 'Sunday Dinner 100' milestone from March 2016.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-TEAMS-SUNDAY-DINNER-ARCHIVE-2016",
          relationship: "direct-support",
          supports: ["the public archive label", "the March 2016 date", "a hundredth-gathering lower bound"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The source corroborates a hundredth-gathering milestone; the approved 300-plus and 20-plus totals retain their separate aggregate source basis."
      ],
      antiClaims: [
        "The archive independently proves 300-plus gatherings",
        "Every participant or gathering is publicly documented",
        "Jamie owns the community's stories or images"
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "CLM-CRS-SHARED-MEMORY-SYSTEM",
      project: "fair-rent-nyc",
      internalClaim:
        "Jamie built and stewarded a shared Commercial Rent Stabilization memory system that organized decisions, actions, open questions, city and state lanes, data stewardship, and consent boundaries for collective work.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "Jamie built and stewarded a shared Commercial Rent Stabilization memory system for decisions, action items, open questions, city and state lanes, data stewardship, and consent boundaries.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/fair-rent-nyc"]
        },
        {
          key: "technical-operations",
          text:
            "Built shared operating memory that separated decisions, actions, open questions, aligned workstreams, and protected context.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/technical-operations"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-TEAMS-CRS-RUNNING-MINUTES-2026",
          relationship: "direct-support",
          supports: ["Jamie's stewardship", "document architecture", "decision and action tracking", "consent and privacy boundaries"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The system supported a collaboration among Action Lab, Small Business United, Fair Rent NYC, NYC Artist Coalition, and other partners; it did not make Jamie the sole coalition leader."
      ],
      antiClaims: [
        "Jamie owned the coalition",
        "Jamie controlled partner data",
        "The running record was official legal advice",
        "The documentation alone caused policy outcomes"
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE",
      project: "fair-rent-nyc",
      internalClaim:
        "Jamie prepared a tracked-change legislative provenance redline that made successive source layers visible from NYC Council Intro 93 through Fair Rent NYC recommendations, Small Business Survival Act-derived language, and 2025 Albany revisions.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "Jamie prepared a tracked-change legislative provenance redline that made source lineage visible across NYC Council Intro 93, Fair Rent NYC recommendations, Small Business Survival Act-derived language, and 2025 Albany revisions.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/fair-rent-nyc"]
        },
        {
          key: "technical-operations",
          text:
            "Created a legislative provenance redline so collaborators could distinguish inherited source layers from questions requiring fresh legal review.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/technical-operations"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-TEAMS-CRS-PROVENANCE-REDLINE-2026",
          relationship: "direct-support",
          supports: ["Jamie as preparer", "tracked-change method", "named source layers", "source-credit boundary"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The redline preserves work by Council sponsors and staff, Fair Rent NYC counsel, prior legislative advocates, and Albany staff; reviewer labels denote source layers rather than personal drafting credit."
      ],
      antiClaims: [
        "Jamie authored the legislation",
        "Jamie provided official legal analysis",
        "The redline resolves every legal question",
        "Earlier advocates or legislative staff are erased from the lineage"
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "CLM-CRS-PRIVACY-PRESERVING-DATA-PILOT",
      project: "commercial-rent-data",
      internalClaim:
        "Jamie authored a privacy-preserving pilot specification for geography-aggregated commercial vacancy and lease-cost indicators, including a minimum data schema, coverage and suppression table, methods note, and explicit confidential-data exclusions.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "Jamie designed a privacy-preserving pilot data product for geography-aggregated commercial vacancy and lease-cost indicators, specifying a minimum schema, coverage and suppression table, methods note, and confidential-data exclusions.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/fair-rent-nyc"]
        },
        {
          key: "technical-operations",
          text:
            "Scoped a smallest-serious-v1 for a privacy-preserving commercial vacancy and lease-cost data product, including schema, coverage, suppression, methods, and explicit exclusions.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/technical-operations"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-TEAMS-CRS-PUBLIC-DATA-BRIEFS-2025-2026",
          relationship: "direct-support",
          supports: ["Jamie's authorship", "pilot scope", "minimum fields", "suppression and coverage controls", "confidential-data exclusions"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The proposal builds on City data systems and analytical precedents and was developed in coalition and public-interest contexts; it is a product specification, not an implemented or City-approved data release."
      ],
      antiClaims: [
        "The City adopted or implemented Jamie's proposal",
        "Jamie published the underlying indicators",
        "Jamie accessed confidential tax or lease records",
        "Jamie alone created the public data systems on which the proposal builds"
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "CLM-SOURCE-BACKED-MEMORY-BOUNDED-SPRINT",
      project: "source-backed-team-memory",
      internalClaim:
        "Jamie designed a bounded discovery and prototype sprint that tests one approved source-to-memory loop with human review, explicit privacy controls, a small prototype, and a continue-revise-stop recommendation.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: false,
      projections: [
        {
          key: "case-study",
          text:
            "The method starts with one bounded use case and one approved non-sensitive or synthetic source bundle, then produces a reviewable prototype and a continue, revise, or stop recommendation.",
          status: "active",
          citationRequired: false,
          surfaces: ["/lab/source-backed-team-memory"]
        },
        {
          key: "technical-operations",
          text:
            "Designed a bounded source-to-memory sprint with human review, explicit privacy controls, and a continue-revise-stop decision.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/technical-operations"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-TEAMS-SOURCE-BACKED-MEMORY-SPRINT-2026",
          relationship: "direct-support",
          supports: ["bounded use case", "approved source bundle", "human review", "prototype deliverables", "decision recommendation"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The source establishes a designed method and consulting offer, not a completed engagement, accepted proposal, or production deployment."
      ],
      antiClaims: [
        "Jamie delivered this sprint for a client",
        "Noting.us is production software",
        "The method requires broad system access",
        "AI replaces human review"
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-14",
      reviewedBy
    }
  ],
  researchTasks: [
    {
      id: "TASK-CLAUDETTES-ROLE-SOURCE-RECOVERY",
      project: "claudettes-theater-on-wheels",
      question:
        "Which materialized public or collaborator-approved sources establish Jamie's contribution to Claudette's Theater on Wheels?",
      priority: "low",
      status: "completed",
      methodsPlanned: [
        "Retry targeted cloud materialization without downloading the entire private collection",
        "Recover public event and project credits",
        "Inspect public audio metadata and collaborator pages",
        "Request collaborator confirmation if role language remains unclear"
      ],
      successCriteria: [
        "Distinguish unavailable cloud material from a source that did not exist",
        "Recover Jamie's specific role from a public or approved source",
        "Preserve collaborator and project credit"
      ],
      sourceIds: [
        "SRC-CLAUDETTES-MICHAEL-REES-PROJECT-PAGE-2022",
        "SRC-CLAUDETTES-MAKE-US-VISIBLE-MUNICH-2022"
      ],
      claimIds: [],
      publicSummary:
        "Public sources now establish Jamie's bounded collaboration on Claudette's Theatre on Wheels while preserving the other artists, video producers, Claudette, and #MakeUsVisible context.",
      reviewedAt: "2026-07-15"
    },
    {
      id: "TASK-CRS-90-DAY-IMPLEMENTATION-VERIFICATION",
      project: "fair-rent-nyc",
      question:
        "Which dated public or collaborator-approved records show which 90-day action-plan deliverables were adopted, completed, handed off, or revised?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Compare the plan with later dated running minutes and public campaign outputs",
        "Separate Jamie-authored artifacts from coalition decisions and partner-owned work",
        "Seek collaborator confirmation for adoption and handoff claims",
        "Verify public-facing deliverables without publishing private contacts, strategy, or participant records"
      ],
      successCriteria: [
        "Map each proposed deliverable to adopted, completed, revised, deferred, or not recovered",
        "Preserve collective decision-making and ownership",
        "Promote only completed work with dated evidence",
        "Keep private campaign details out of the public repository"
      ],
      sourceIds: ["SRC-TEAMS-CRS-90-DAY-ACTION-PLAN-2026"],
      claimIds: [],
      publicSummary:
        "Treat the 90-day plan as operating-design evidence while researching dated implementation and handoff outcomes separately.",
      reviewedAt: "2026-07-15"
    }
  ]
};
