import type { KnowledgeBank } from "./schema.ts";

type KcTownHallCouncilBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries" | "pages"
>;

export const kcTownHallCouncilBatchRecords: KcTownHallCouncilBatch = {
  sources: [
    {
      id: "SRC-KCMO-KC-TOWN-HALL-RESOLUTION-190649-2019",
      title: "Resolution 190649: KC Town Hall funding recommendation",
      organization: "City Council of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-09-26",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://clerk.kcmo.gov/LegislationDetail.aspx?GUID=44A50FFC-321A-41C7-9A86-6ADD9083B156&ID=5515936&Options=&Search=",
      preferredPublicUrl: "canonical",
      publicCitation: "City Council of Kansas City, Missouri, Resolution 190649, adopted as substituted September 26, 2019.",
      publicNote: "The Council record shows adoption of a resolution accepting the CCED Board recommendation to fund KC Town Hall in the amount of $490,539 and authorizing negotiation of a funding agreement.",
      supportsGenerally: [
        "Council adoption of the KC Town Hall funding recommendation",
        "$490,539 authorized for the proposed project",
        "authorization to negotiate a funding agreement"
      ],
      doesNotEstablish: [
        "execution of a funding agreement",
        "disbursement of funds",
        "Phase One completion or completion of the full redevelopment"
      ]
    },
    {
      id: "SRC-KCMO-CCED-ORDINANCE-190642-2019",
      title: "Committee Substitute for Ordinance 190642: CCED Round Two appropriations",
      organization: "City Council of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-09-26",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://clerk.kcmo.gov/LegislationDetail.aspx?GUID=B387009F-F7F7-454D-950A-E44588056314&ID=5515929&Options=&Search=",
      preferredPublicUrl: "canonical",
      publicCitation: "City Council of Kansas City, Missouri, Committee Substitute for Ordinance 190642, passed as substituted September 26, 2019.",
      publicNote: "The Council record shows passage of the companion ordinance reappropriating $10,691,631 in Central City Sales Tax funds into designated Round Two project accounts.",
      supportsGenerally: [
        "Council passage of the Round Two appropriation ordinance",
        "appropriation into designated CCED project accounts",
        "the September 26, 2019 Council funding action"
      ],
      doesNotEstablish: [
        "execution of KC Town Hall's funding agreement",
        "disbursement to KC Town Hall",
        "completion of every funded Round Two project"
      ]
    },
    {
      id: "SRC-KCMO-CCED-CLAWBACK-240317-2024",
      title: "Ordinance 240317: reappropriation of unused CCED project funds",
      organization: "City Council of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2024-03-28",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://clerk.kcmo.gov/LegislationDetail.aspx?GUID=E3F31A7F-65F8-464E-ABD4-197DEB6D80C8&ID=6586846&Options=&Search=",
      preferredPublicUrl: "canonical",
      publicCitation: "City Council of Kansas City, Missouri, Ordinance 240317, passed March 28, 2024.",
      publicNote: "The authenticated 2024 record states that Ordinance 190642 appropriated $490,539 to KC Town Hall, that KC Town Hall later withdrew and would not proceed, and that the unused project allocation was reappropriated.",
      supportsGenerally: [
        "Ordinance 190642 appropriated $490,539 to the KC Town Hall project account",
        "KC Town Hall later withdrew and did not proceed",
        "the unused $490,539 allocation was reappropriated in 2024"
      ],
      doesNotEstablish: [
        "that KC Town Hall received or spent the appropriated funds",
        "the reason for the project's withdrawal",
        "Phase One completion or completion of the full redevelopment"
      ]
    },
    {
      id: "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026",
      title: "Jamie Burkart public review confirmation of KC Town Hall transition",
      organization: "Jamie Burkart",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-07-12",
      accessedAt: "2026-07-12",
      publicCitation: "Jamie Burkart, public portfolio review confirmation, July 12, 2026.",
      publicNote: "Jamie confirms that he transitioned the KC Town Hall project to a mission-aligned organization as his direct involvement concluded.",
      supportsGenerally: [
        "Jamie transitioned the project to a mission-aligned organization",
        "the transition was an intentional continuity action"
      ],
      doesNotEstablish: [
        "the identity of the receiving organization",
        "the legal or financial terms of the transition",
        "the reason for the transition",
        "Phase One completion or completion of the full redevelopment"
      ]
    }
  ],
  claims: [],
  researchInquiries: [
    {
      id: "INQ-KC-TOWN-HALL-COUNCIL-AUTHORIZATION-2026",
      project: "kc-town-hall",
      question: "Did the Kansas City Council act on the CCED Board's $490,539 recommendation for KC Town Hall, and what happened to the allocation afterward?",
      methods: [
        "Reviewed the official legislative history for Resolution 190649.",
        "Reviewed the official legislative history for companion Ordinance 190642.",
        "Reviewed Ordinance 240317 for the City's retrospective account of appropriation and the later project withdrawal.",
        "Recorded Jamie's public review confirmation that he transitioned the project to a mission-aligned organization."
      ],
      runAt: "2026-07-12",
      resultStatus: "recovered",
      findings: [
        "On September 26, 2019, the Council adopted Resolution 190649 as substituted, accepting the CCED Board recommendation to fund KC Town Hall in the amount of $490,539 and authorizing negotiation of a funding agreement.",
        "At the same meeting, the Council passed Ordinance 190642 as substituted, reappropriating Central City Sales Tax funds into designated Round Two project accounts.",
        "Ordinance 240317 later states that Ordinance 190642 appropriated $490,539 to KC Town Hall's project account.",
        "Jamie confirms that he transitioned the project to a mission-aligned organization as his direct involvement concluded.",
        "The 2024 ordinance states that KC Town Hall withdrew and would no longer proceed, and it reappropriated the unused allocation."
      ],
      limitations: [
        "Council authorization and appropriation are not proof of an executed funding agreement or disbursement.",
        "The reviewed records do not establish the reason for withdrawal, Phase One completion, or completion of the full redevelopment.",
        "Jamie's confirmation does not identify the receiving organization or disclose the reasons or terms of the transition.",
        "No roll-call vote count was recovered; the official histories report adopted or passed as substituted."
      ],
      sourceIds: [
        "SRC-KCMO-KC-TOWN-HALL-RESOLUTION-190649-2019",
        "SRC-KCMO-CCED-ORDINANCE-190642-2019",
        "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026",
        "SRC-KCMO-CCED-CLAWBACK-240317-2024"
      ],
      publicSummary: "The Council accepted and appropriated the $490,539 KC Town Hall allocation in 2019. Jamie later transitioned the project to a mission-aligned organization; KC Town Hall withdrew from the original allocation, and the City reappropriated the unused funds."
    }
  ],
  pages: []
};
