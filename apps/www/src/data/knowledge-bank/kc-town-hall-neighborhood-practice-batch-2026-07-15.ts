import type { KnowledgeBank } from "./schema.ts";

type KcTownHallNeighborhoodPracticeBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries" | "pages"
>;

export const kcTownHallNeighborhoodPracticeBatchRecords: KcTownHallNeighborhoodPracticeBatch = {
  sources: [
    {
      id: "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026",
      title: "Jamie Burkart public review confirmation of East Kansas City neighborhood practice",
      organization: "Jamie Burkart",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-07-15",
      accessedAt: "2026-07-15",
      publicCitation:
        "Jamie Burkart, public portfolio review confirmation of his East Kansas City neighborhood service and civic-design work, July 15, 2026.",
      publicNote:
        "Jamie confirms his initial Tired of Tires field-operations role, pro bono neighborhood design and print work, and co-founding contribution to Cleveland Ave Unify to Beautify while crediting Pastor Lee with the corridor concept.",
      supportsGenerally: [
        "Jamie designed and coordinated the initial monthly Tired of Tires operation through Oak Park Neighborhood Association",
        "Jamie routed pickup requests, collected and delivered tires to the city recycling center, and recorded monthly counts",
        "Jamie paired service routes with KC Town Hall survey collection and neighborhood-information distribution",
        "Jamie served neighborhood groups as a pro bono identity, mapping, photography, social, and print resource",
        "Jamie was a co-founding contributor to Cleveland Ave Unify to Beautify",
        "Pastor Lee originated the Cleveland Avenue corridor concept",
        "Jamie remembers the tire-pickup service later including Indian Mound"
      ],
      doesNotEstablish: [
        "independent corroboration of every remembered task, date, count, or handoff",
        "Jamie's sole ownership or operation of collective neighborhood programs",
        "municipal ownership, funding, endorsement, or independent validation of Tired of Tires",
        "the date, scope, or duration of the remembered Indian Mound expansion",
        "that Cleveland Ave Unify to Beautify caused a specific capital allocation",
        "implementation of every resident priority"
      ]
    },
    {
      id: "SRC-CLEVELAND-AVE-KC-TIRED-OF-TIRES-2020",
      title: "Cleveland Ave KC post about monthly free tire pickup",
      organization: "Cleveland Ave KC",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: "Public post published in September 2020",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://www.facebook.com/ClevelandAveKC/posts/1633775000115273",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Cleveland Ave KC, public Facebook post about monthly free residential tire pickup, 2020.",
      publicNote:
        "The post credits KC Town Hall and Oak Park Neighborhood Association with a monthly free residential tire-pickup service in historic East Kansas City and routes people to request pickup or volunteer.",
      supportsGenerally: [
        "monthly free residential tire pickup",
        "KC Town Hall and Oak Park Neighborhood Association program credit",
        "historic East Kansas City service framing",
        "resident-request and volunteer pathways"
      ],
      doesNotEstablish: [
        "Jamie's individual operating role",
        "independently audited tire or savings totals",
        "the complete service timeline or operator roster",
        "the Indian Mound expansion"
      ]
    },
    {
      id: "SRC-HENC-STRATEGIC-PLAN-2024",
      title: "HENC Strategic Plan 3.0",
      organization: "Historic East Neighborhoods Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: "Strategic plan marked Updated 01/2024",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://extension.missouri.edu/media/wysiwyg/News/TheNetwork/March2024/HENC%20Strategic%20Plan%203.0%20%28PDF%29.pdf",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Historic East Neighborhoods Coalition, HENC Strategic Plan 3.0, updated January 2024.",
      publicNote:
        "The plan describes HENC as a coalition of neighborhood associations and other stakeholders serving Kansas City's Third Council District, includes Oak Park among its member neighborhoods, and names asset mapping, website development, stakeholder surveys, partnerships, and funding accountability among its methods and goals.",
      supportsGenerally: [
        "HENC's collective neighborhood-association structure",
        "Oak Park's inclusion among HENC member neighborhoods",
        "HENC's East Kansas City service context",
        "asset mapping and stakeholder surveys as coalition implementation methods",
        "funding accountability and district improvements as coalition goals"
      ],
      doesNotEstablish: [
        "Cleveland Ave Unify to Beautify's formation, team, or operating history",
        "Jamie's individual HENC or Cleveland Avenue role",
        "Pastor Lee's originating role",
        "attendance at listening sessions",
        "influence on a specific capital decision"
      ]
    },
    {
      id: "SRC-KCTH-OAK-PARK-DUMPSTER-DAY-2019",
      title: "KC Town Hall Oak Park neighborhood cleanup post",
      organization: "KC Town Hall",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-10-10",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://x.com/KCTownHall/status/1182329689689473029",
      preferredPublicUrl: "canonical",
      publicCitation:
        "KC Town Hall, Oak Park Neighborhood Association cleanup and dumpster-day post, October 10, 2019.",
      publicNote:
        "The post publicizes Oak Park Neighborhood Association's free neighborhood cleanup and multiple disposal locations.",
      supportsGenerally: [
        "Oak Park Neighborhood Association's public neighborhood-cleanup communication",
        "KC Town Hall's use as a neighborhood-information surface"
      ],
      doesNotEstablish: [
        "Jamie's authorship of the post",
        "Jamie's production or distribution of printed materials",
        "attendance, participation, or cleanup totals"
      ]
    },
    {
      id: "SRC-KCTH-CHESTNUT-TIRE-COLLECTION-2021",
      title: "KC Town Hall Chestnut Family Resource Center tire-collection post",
      organization: "KC Town Hall",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2021-10-03",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://x.com/KCTownHall/status/1444466053665509377",
      preferredPublicUrl: "canonical",
      publicCitation:
        "KC Town Hall, Tired of Tires post thanking Chestnut Family Resource Center for collecting tires at its dumpster day, October 3, 2021.",
      publicNote:
        "The post thanks Chestnut Family Resource Center for collecting tires at its dumpster day and documents a neighborhood-partner handoff into the recurring pickup workflow.",
      supportsGenerally: [
        "Chestnut Family Resource Center participation in tire collection",
        "connection between dumpster-day collection and the recurring Tired of Tires workflow",
        "public follow-through through the KC Town Hall account"
      ],
      doesNotEstablish: [
        "Jamie's authorship of the post",
        "Jamie's responsibility for the 2021 operation",
        "independently audited tire totals",
        "the full partner roster"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-EAST-KC-TIRED-OF-TIRES-OPERATIONS",
      project: "kc-town-hall",
      internalClaim:
        "Jamie designed and ran the initial monthly Tired of Tires field operation through Oak Park Neighborhood Association, coordinating with city services, routing requests, collecting and delivering tires to the city recycling center, tracking monthly counts, and pairing pickup routes with neighborhood information; the public workflow and program record remain collective.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "Jamie designed and ran the initial monthly Tired of Tires field operation through Oak Park Neighborhood Association: coordinating with city services, routing requests, collecting and delivering tires to the city recycling center, recording monthly counts, and using pickup routes to distribute neighborhood information. Jamie and Julia co-authored the public workflow; the service itself was collective and continued beyond Jamie's individually documented role.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/kc-town-hall"]
        },
        {
          key: "archive-note",
          text:
            "Jamie confirms that he designed, coordinated, and ran the initial Tired of Tires field operation through Oak Park Neighborhood Association; public sources independently establish the collective monthly service and its recurring public workflow.",
          status: "active",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/kc-town-hall-neighborhood-practice-2026-07-15"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026",
          relationship: "direct-support",
          supports: [
            "Jamie's initial program design and city coordination",
            "pickup routing, collection, recycling delivery, print distribution, and count tracking"
          ],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
          relationship: "corroborating",
          supports: [
            "Julia and Jamie's public workflow authorship",
            "KC Town Hall and Oak Park Neighborhood Association program credit",
            "request, volunteer, eligibility, schedule, and contact pathways"
          ],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-CLEVELAND-AVE-KC-TIRED-OF-TIRES-2020",
          relationship: "corroborating",
          supports: [
            "monthly free residential service",
            "collective program credit",
            "resident-request and volunteer pathways"
          ],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCTH-FULL-POPULATION-RUN-2026",
          relationship: "context",
          supports: ["recurring public-account continuity and follow-through"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Jamie's individual operating role is a firsthand confirmation; public program sources do not independently identify the operator for each pickup.",
        "Credit Julia and Jamie for the public workflow and KC Town Hall with Oak Park Neighborhood Association and later partners for the service.",
        "Do not assign every operation or shared-account post through 2022 to Jamie.",
        "City coordination does not establish municipal ownership, funding, endorsement, or independent validation.",
        "Project-reported tire and avoided-fee totals remain unaudited and outside the active projection."
      ],
      antiClaims: [
        "Jamie alone created and operated Tired of Tires through 2022",
        "Tired of Tires was a City of Kansas City program",
        "The current record independently audits tire or savings totals",
        "Every Tired of Tires public post was written by Jamie"
      ],
      researchInquiryIds: ["INQ-EAST-KC-NEIGHBORHOOD-PRACTICE-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex public-safe archival review"]
    },
    {
      id: "CLM-EAST-KC-FIELD-COMMUNICATIONS-PRACTICE",
      project: "east-kc-neighborhood-practice",
      internalClaim:
        "Across KC Town Hall, Oak Park, HENC, and Chestnut neighborhood work, Jamie acted as a pro bono design and print resource and paired direct service with survey intake, neighborhood-information distribution, and operational recordkeeping.",
      status: "use-with-care",
      projections: [
        {
          key: "archive-note",
          text:
            "Firsthand role record: Jamie paired direct neighborhood service with pro bono design and print production, survey intake, information distribution, and operational recordkeeping across related East Kansas City efforts.",
          status: "active",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/kc-town-hall-neighborhood-practice-2026-07-15"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026",
          relationship: "direct-support",
          supports: [
            "pro bono design and print work",
            "distribution of service, cleanup, survey, and listening-session materials on pickup routes",
            "field collection and monthly recordkeeping"
          ],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCTH-OAK-PARK-DUMPSTER-DAY-2019",
          relationship: "context",
          supports: ["Oak Park cleanup communication carried by the KC Town Hall public surface"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-CHESTNUT-TIRE-COLLECTION-2021",
          relationship: "context",
          supports: ["Chestnut's dumpster-day collection feeding the tire-pickup workflow"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The integrated role description is Jamie's firsthand account; the public posts establish the related neighborhood information and service surfaces, not Jamie's authorship of each artifact or post.",
        "Use 'large print runs' rather than an exact handbill count until production records are reconciled.",
        "Preserve collective credit for each neighborhood organization, resident, city staff member, and collaborator."
      ],
      antiClaims: [
        "Jamie alone operated every neighborhood program",
        "Every public post or handbill was authored by Jamie",
        "The work represented every resident",
        "Neighborhood service activity proves a specific policy or funding outcome"
      ],
      researchInquiryIds: ["INQ-EAST-KC-NEIGHBORHOOD-PRACTICE-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex public-safe archival review"]
    },
    {
      id: "CLM-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE",
      project: "east-kc-neighborhood-practice",
      internalClaim:
        "Jamie identifies himself as a co-founding contributor to HENC's Cleveland Ave Unify to Beautify program and credits Pastor Lee with the corridor concept; Jamie contributed identity, logo, photography, social, listening-session maps, resident-reporting surfaces, and pro bono print production.",
      status: "use-with-care",
      projections: [
        {
          key: "archive-note",
          text:
            "Firsthand role record: Jamie was a co-founding contributor to HENC's Cleveland Ave Unify to Beautify program, contributing identity, mapping, photography, social, listening-session, resident-reporting, and print systems while crediting Pastor Lee with the corridor concept.",
          status: "active",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/kc-town-hall-neighborhood-practice-2026-07-15"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026",
          relationship: "direct-support",
          supports: [
            "Jamie's co-founding program contribution",
            "Pastor Lee's originating corridor concept",
            "identity, map, photography, social, listening-session, resident-reporting, and print contributions"
          ],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-HENC-STRATEGIC-PLAN-2024",
          relationship: "context",
          supports: [
            "HENC's coalition context",
            "Oak Park's membership context",
            "asset mapping and stakeholder surveys as coalition methods"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Jamie's role and Pastor Lee's originating role are firsthand confirmations; the HENC plan supplies organizational context but does not describe this program.",
        "Preserve collective credit for Pastor Lee, HENC, neighborhood associations, residents, elected officials, and other contributors.",
        "The current record does not establish attendance, geographic coverage, implementation, or influence on a specific capital decision.",
        "Do not treat mapped or reported priorities as statistically representative."
      ],
      antiClaims: [
        "Jamie originated the Cleveland Avenue corridor concept",
        "Jamie alone founded or operated Unify to Beautify",
        "Unify to Beautify caused a specific capital allocation",
        "Every mapped priority was implemented"
      ],
      researchInquiryIds: ["INQ-EAST-KC-NEIGHBORHOOD-PRACTICE-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex public-safe archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-EAST-KC-NEIGHBORHOOD-PRACTICE-2026",
      project: "east-kc-neighborhood-practice",
      question:
        "What can Jamie's firsthand account, the complete KC Town Hall social record, public service pages, and HENC context establish about his Tired of Tires operations, field communications, and Cleveland Avenue civic-design work?",
      methods: [
        "Separated Jamie's firsthand role confirmation from public sources that establish program existence, collective credit, and organizational context.",
        "Reused the complete 183-record KC Town Hall census and archived Tired of Tires workflow page.",
        "Close-read the Cleveland Ave KC service post, Oak Park cleanup post, Chestnut collection post, and HENC strategic plan.",
        "Searched the recovered KC Town Hall and personal social corpora for Indian Mound, HENC, and Cleveland Ave Unify to Beautify references.",
        "Searched public web results for Cleveland Ave Unify to Beautify, HENC corridor records, Indian Mound expansion, and capital-decision documentation.",
        "Kept resident locations, contact pathways, phone numbers, raw survey responses, and private operational records outside the public repository."
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "Jamie confirms that he designed, coordinated, and ran the initial monthly Tired of Tires field operation through Oak Park Neighborhood Association.",
        "The archived service page identifies Julia and Jamie as workflow authors and credits KC Town Hall with Oak Park Neighborhood Association for the monthly program.",
        "The complete public-account record independently establishes recurring service, intake, schedules, public follow-through, and later collective continuity.",
        "Public posts document Oak Park cleanup information and Chestnut Family Resource Center feeding collected tires into the program workflow.",
        "Jamie confirms a pro bono design, print, mapping, photography, social, and field-communications practice across related neighborhood efforts.",
        "Jamie identifies himself as a co-founding contributor to Cleveland Ave Unify to Beautify and credits Pastor Lee with the corridor concept.",
        "HENC's public strategic plan confirms the coalition's East Kansas City context, includes Oak Park among member neighborhoods, and names asset mapping and stakeholder surveys among its methods."
      ],
      limitations: [
        "The public program sources do not independently assign Jamie responsibility for each pickup, artifact, or shared-account post.",
        "No dated public record was recovered in this pass for the remembered Indian Mound expansion.",
        "No source recovered in this pass establishes the full Cleveland Ave Unify to Beautify team, listening-session attendance, mapped priorities, or implementation history.",
        "No proposition-level official record was recovered linking the Cleveland Avenue process to a particular capital allocation.",
        "Project-reported tire and avoided-fee totals remain unaudited."
      ],
      sourceIds: [
        "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026",
        "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
        "SRC-KCTH-FULL-POPULATION-RUN-2026",
        "SRC-CLEVELAND-AVE-KC-TIRED-OF-TIRES-2020",
        "SRC-HENC-STRATEGIC-PLAN-2024",
        "SRC-KCTH-OAK-PARK-DUMPSTER-DAY-2019",
        "SRC-KCTH-CHESTNUT-TIRE-COLLECTION-2021"
      ],
      publicSummary:
        "Jamie designed and ran the initial Tired of Tires field operation and used neighborhood service as a surface for intake, information distribution, and recordkeeping; his related Cleveland Avenue design role is preserved as a bounded firsthand account while program formation and funding influence remain open research.",
      protectedLocatorId: "RESEARCH-EAST-KC-NEIGHBORHOOD-PRACTICE-2026-001"
    }
  ],
  pages: []
};
