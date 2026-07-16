import type { KnowledgeBank } from "./schema.ts";

type TeamsArchivalDeepeningBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

export const teamsArchivalDeepeningBatchRecords: TeamsArchivalDeepeningBatch = {
  sources: [
    {
      id: "SRC-CLAUDETTE-MICHAEL-REES-2022",
      title: "Claudette's Theatre on Wheels",
      organization: "Michael Rees Studio",
      author: "Michael Rees",
      kind: "personal-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://michaelrees.org/claudette",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Michael Rees, 'Claudette's Theatre on Wheels,' accessed July 15, 2026.",
      publicNote:
        "The collaborator-authored project page credits Jamie Burkart and Michael Rees with the augmented-reality experience and separately credits the source-video production team.",
      supportsGenerally: [
        "Jamie Burkart and Michael Rees collaborated to create an augmented-reality experience for Make Us Visible in Munich",
        "short video clips appeared when a participant selected tondos in the experience",
        "the source video was produced by Jamie Burkart, Anne Dufy Burkart, and Julia Fredenburg with Claudette"
      ],
      doesNotEstablish: [
        "Jamie's sole authorship of the artwork or software",
        "the division of 3D, code, hosting, or deployment responsibilities",
        "audience, reach, or impact totals",
        "rights clearance for project photographs or video"
      ]
    },
    {
      id: "SRC-CLAUDETTE-MAKE-US-VISIBLE-MUNICH-2022",
      title: "Make Us Visible Munich city program",
      organization: "Make Us Visible / XR Ensemble",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://www.makeusvisible.io/events/cities?cityName=Munich%20(English)&cityId=5&page=1",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Make Us Visible, Munich city program listing for 'Claudette's Theatre On Wheels,' accessed July 15, 2026.",
      publicNote:
        "The institutional program page lists Claudette's Theatre On Wheels and credits Michael Rees and Jamie Burkart.",
      supportsGenerally: [
        "the project's inclusion in the Make Us Visible Munich program",
        "public project credit to Michael Rees and Jamie Burkart"
      ],
      doesNotEstablish: [
        "individual technical responsibilities",
        "sole authorship by either collaborator",
        "the final deployment state",
        "audience or impact totals"
      ]
    },
    {
      id: "SRC-CLAUDETTE-IMPLEMENTATION-HANDOFF-2022",
      title: "Claudette's Theatre on Wheels implementation handoff",
      organization: "Claudette's Theatre on Wheels collaborators",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2022-08-22",
      publicCitation:
        "Public-safe metadata for a Claudette's Theatre on Wheels implementation handoff, August 22, 2022.",
      publicNote:
        "The private correspondence remains outside the repository. Its bounded metadata corroborates a working 3D asset, click-triggered video behavior, and an 8th Wall handoff without allocating individual code authorship.",
      protectedLocatorId: "ARCHIVE-CLAUDETTE-IMPLEMENTATION-HANDOFF-2022-001",
      supportsGenerally: [
        "the collaboration had a working GLB asset and click-triggered video behavior",
        "the experience was working in 8th Wall before handoff",
        "the collaborators requested integration guidance from the receiving production team"
      ],
      doesNotEstablish: [
        "that Jamie wrote all or any specific code module",
        "that every handoff item entered the final public deployment unchanged",
        "sole project ownership",
        "public clearance of the correspondence, contact details, or implementation URL"
      ]
    },
    {
      id: "SRC-CRS-90-DAY-OPERATING-PLAN-2026",
      title: "90-Day Action Plan for Fair Rent NYC and Commercial Rent Stabilization",
      organization: "Fair Rent NYC / NYC Artist Coalition",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publishedAt: "2026-04-06",
      publicCitation:
        "Jamie Burkart, public-safe metadata for '90-Day Action Plan for Fair Rent NYC and Commercial Rent Stabilization,' April 6, 2026.",
      publicNote:
        "The protected working plan translates coalition needs into sequenced operating infrastructure and explicit success conditions. Names, outreach lists, strategy context, and working links remain private.",
      protectedLocatorId: "ARCHIVE-CRS-90-DAY-OPERATING-PLAN-2026-001",
      supportsGenerally: [
        "Jamie authored a phased 90-day coalition operating plan",
        "the plan defines a clear join path, recurring room, reusable message kit, consent-aware story bank, implementation-readiness packet, process norms, action tracking, and durable campaign memory",
        "the plan separates Jamie's infrastructure role from ownership of the movement",
        "the plan gives deliverables an order and explicit success conditions"
      ],
      doesNotEstablish: [
        "completion of every proposed deliverable",
        "coalition adoption or approval of every recommendation",
        "Jamie's ownership of the campaign or movement",
        "public clearance of stakeholder names, outreach records, strategy details, or working links"
      ]
    },
    {
      id: "SRC-JOB-HUNT-RESUME-PARITY-2026",
      title: "Approved application resume parity check",
      organization: "Jamie Burkart portfolio release process",
      kind: "research-run",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publishedAt: "2026-07-11",
      accessedAt: "2026-07-15",
      publicCitation:
        "Public-safe metadata for the July 15, 2026 parity check of Jamie Burkart's approved July 11 application resume and the portfolio-served PDF.",
      publicNote:
        "A SHA-256 comparison found the job-hunt copy and the website's served resume PDF byte-identical during this review. The checksum and private archive locator are not published.",
      protectedLocatorId: "RESEARCH-JOB-HUNT-RESUME-PARITY-2026-001",
      supportsGenerally: [
        "the July 11 application resume and the website-served resume were byte-identical on July 15, 2026",
        "the approved phone-in-PDF version is the version projected by the website"
      ],
      doesNotEstablish: [
        "that every external resume copy is identical",
        "that future resume revisions require no parity check",
        "independent verification of the resume's accomplishment claims"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-CRS-90-DAY-OPERATING-PLAN",
      project: "fair-rent-nyc",
      internalClaim:
        "Jamie translated an emerging coalition's needs into a sequenced, bounded 90-day operating plan with explicit deliverables and success conditions.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "Jamie authored a sequenced 90-day operating plan that translated an emerging coalition's needs into concrete shared infrastructure: a clear join path, recurring meeting cadence, reusable message kit, consent-aware story bank, implementation-readiness packet, decision norms, action tracking, and durable campaign memory. The plan defines priorities and success conditions; it is not a claim that every proposed deliverable was completed or adopted.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/fair-rent-nyc"]
        },
        {
          key: "technical-operations",
          text:
            "Authored a sequenced 90-day coalition operating plan with concrete deliverables, success conditions, consent boundaries, and decision infrastructure.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/technical-operations"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-CRS-90-DAY-OPERATING-PLAN-2026",
          relationship: "private-support",
          supports: [
            "Jamie's authorship",
            "the sequenced operating plan",
            "the named deliverables, boundaries, and success conditions"
          ],
          locator: "Core role, deliverables, priority order, and phased plan",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-GDRIVE-CRS-RUNNING-MEMORY-2026",
          relationship: "context",
          supports: [
            "the surrounding shared-memory and action-tracking practice"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Describe the record as an authored operating plan, not proof that every recommendation was completed or adopted.",
        "The movement and campaign remained collective; the plan explicitly bounded Jamie's infrastructure role.",
        "Do not publish stakeholder names, outreach lists, private strategy, consent records, or working links from the underlying artifact."
      ],
      antiClaims: [
        "Jamie completed every item in the 90-day plan",
        "The coalition formally adopted every recommendation",
        "Jamie owned or led the entire movement",
        "The protected plan is a public coalition document"
      ],
      researchInquiryIds: ["INQ-TEAMS-ARCHIVAL-DEEPENING-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CLAUDETTE-AR-COLLABORATION-2022",
      project: "claudette-theatre-on-wheels",
      internalClaim:
        "Jamie collaborated with Michael Rees on an augmented-reality experience that paired a 3D interface with click-triggered video portraits for Make Us Visible Munich.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Jamie Burkart and Michael Rees collaborated on Claudette's Theatre on Wheels, an augmented-reality experience presented through Make Us Visible's Munich program. Michael Rees's project page also credits video production to Jamie, Anne Dufy Burkart, and Julia Fredenburg with Claudette; short clips appeared when viewers selected tondos in the experience.",
          status: "active",
          citationRequired: true,
          surfaces: ["knowledge-bank-only"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-CLAUDETTE-MICHAEL-REES-2022",
          relationship: "direct-support",
          supports: [
            "the Jamie-and-Michael collaboration",
            "the augmented-reality experience",
            "the click-triggered clips and shared video-production credit"
          ],
          locator: "Project description and collaborator credits",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-CLAUDETTE-MAKE-US-VISIBLE-MUNICH-2022",
          relationship: "corroborating",
          supports: [
            "the Munich program context",
            "public credit to Michael Rees and Jamie Burkart"
          ],
          locator: "Munich project listing",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-CLAUDETTE-IMPLEMENTATION-HANDOFF-2022",
          relationship: "private-support",
          supports: [
            "the working 3D, click-triggered video, and handoff context"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Keep Michael Rees, Anne Dufy Burkart, Julia Fredenburg, and Claudette in the credit line appropriate to their documented roles.",
        "Do not assign Jamie sole authorship of the artwork, 3D asset, code, hosting, or deployment.",
        "Do not infer audience, reach, reception, or impact totals.",
        "Do not publish private correspondence, implementation URLs, contact details, or uncleared media."
      ],
      antiClaims: [
        "Jamie independently created Claudette's Theatre on Wheels",
        "Jamie wrote the entire augmented-reality application",
        "The project achieved a measured audience or adoption outcome",
        "Private implementation correspondence is a public testimonial"
      ],
      researchInquiryIds: ["INQ-TEAMS-ARCHIVAL-DEEPENING-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-TEAMS-ARCHIVAL-DEEPENING-2026",
      project: "knowledge-bank",
      question:
        "What additive, public-safe evidence in Jamie Projects History, CRS, and job-hunt strengthens Jamie's hiring narrative without duplicating the July 12 archival-production pass?",
      methods: [
        "Re-inventoried all three required collections and routed through their overview and context documents before reading individual artifacts.",
        "Compared potential findings against the canonical knowledge bank to avoid duplicating already-ingested river, music-technology, policy-data, and source-lineage evidence.",
        "Closely read public project pages, protected implementation correspondence, Jamie's authored 90-day operating plan, shared running-minutes context, the current job-hunt outline, and the approved resume artifact.",
        "Compared the July 11 job-hunt resume against the website-served PDF using SHA-256 without publishing private locators or checksum values.",
        "Tested the authenticated iCloud web fallback and recorded its signed-out state rather than treating inaccessible web content as recovered."
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "Jamie Projects History supplied public collaborator and institutional evidence for a 2022 augmented-reality project combining 3D interaction, video, and public presentation.",
        "CRS supplied a Jamie-authored 90-day operating plan that turns coalition needs into sequenced deliverables, success conditions, consent boundaries, and durable operating infrastructure.",
        "The job-hunt folder supplied a release control: its July 11 application resume was byte-identical to the PDF served by the portfolio during this review.",
        "The Claudette record remains knowledge-bank depth; the 90-day operating-plan claim is projected because it directly strengthens the technical project management argument."
      ],
      limitations: [
        "The collections are large and mutable; this was a high-signal close-reading pass, not an assertion that every file was semantically reviewed.",
        "The iCloud web view available to the browser was signed out, so locally materialized records supplied the evidence in this pass.",
        "Private correspondence, stakeholder names, outreach lists, consent records, strategy context, working links, phone numbers, and email addresses remain excluded.",
        "An authored plan proves planning and requirements work, not completion or coalition adoption of every item.",
        "Public collaborator credit does not establish the division of individual technical labor inside the augmented-reality implementation."
      ],
      sourceIds: [
        "SRC-CLAUDETTE-MICHAEL-REES-2022",
        "SRC-CLAUDETTE-MAKE-US-VISIBLE-MUNICH-2022",
        "SRC-CLAUDETTE-IMPLEMENTATION-HANDOFF-2022",
        "SRC-CRS-90-DAY-OPERATING-PLAN-2026",
        "SRC-JOB-HUNT-RESUME-PARITY-2026"
      ],
      publicSummary:
        "A second close-reading pass across Jamie Projects History, CRS, and job-hunt added a bounded augmented-reality collaboration, promoted a sequenced coalition operating-plan claim, and verified application-resume parity while retaining explicit collective-credit, completion, privacy, and iCloud-access boundaries.",
      protectedLocatorId: "RESEARCH-TEAMS-ARCHIVAL-DEEPENING-2026-001"
    }
  ]
};
