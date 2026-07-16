import type { KnowledgeBank } from "./schema.ts";

type KansasCityStarRaftBatch = Pick<KnowledgeBank, "sources" | "claims">;

export const kansasCityStarRaftBatchRecords: KansasCityStarRaftBatch = {
  sources: [
    {
      id: "SRC-KANSAS-CITY-STAR-RAFT-2007",
      title: "In the name of art, go with the flow",
      organization: "The Kansas City Star",
      author: "Darryl Levings",
      kind: "published-article",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publishedAt: "2007-11-15",
      accessedAt: "2026-07-16",
      publicCitation:
        "Darryl Levings, 'In the name of art, go with the flow,' The Kansas City Star, November 15, 2007, pages A1 and A4.",
      publicNote:
        "The front-page feature and A4 continuation document the in-progress collaborative raft expedition from Kansas City into Louisiana, its improvised technical design, public participation, and recovery from a 51-day interruption in Vicksburg.",
      protectedLocatorId: "ARCHIVE-KANSAS-CITY-STAR-RAFT-SCAN-2007-001",
      supportsGenerally: [
        "Jamie originated the expedition idea and participated in the three-person core crew with Libby Hendon and Laura Mattingly",
        "the crew had traveled more than 1,000 miles from Kansas City into Louisiana by November 2007",
        "the roughly 12-by-13-foot raft used two bicycles linked to a paddlewheel and reclaimed materials",
        "friends and people encountered along the river were invited to participate",
        "the crew resumed after a 51-day Vicksburg interruption with legal, community, and technical support"
      ],
      doesNotEstablish: [
        "completion of the saltwater objective after publication",
        "an exact final landing point on the Gulf of Mexico",
        "solo authorship or execution by Jamie",
        "permission to republish the scan or newspaper photography"
      ],
      media: {
        mediaKind: "document",
        rightsHolder: "The Kansas City Star",
        rightsStatus: "permission-needed",
        consentStatus: "not-applicable",
        publicDisplayStatus: "metadata-only",
        visibleText: [
          "In the name of art, go with the flow",
          "Adventure of a lifetime takes three friends from KC to Louisiana"
        ]
      }
    }
  ],
  claims: [
    {
      id: "CLM-RAFT-EXPEDITION-DESIGN-RESILIENCE",
      project: "participatory-public-systems",
      internalClaim:
        "Jamie originated and helped carry out a collaborative art expedition that traveled more than 1,000 miles from Kansas City into Louisiana on a bicycle-powered raft built from reclaimed materials, inviting participation and resuming after a 51-day interruption.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Contemporaneous front-page reporting documents Jamie as the originator and one of three core participants in a collaborative art expedition that traveled more than 1,000 miles from Kansas City into Louisiana on a bicycle-powered raft built from reclaimed materials. The crew invited people they met to join, adapted through a 51-day Vicksburg interruption, and framed the journey as a living experiment in reconnecting river communities.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/projects/participatory-public-systems"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KANSAS-CITY-STAR-RAFT-2007",
          relationship: "direct-support",
          supports: [
            "Jamie's originating role",
            "the three-person core crew",
            "more than 1,000 miles from Kansas City into Louisiana",
            "bicycle-powered reclaimed-material construction",
            "participatory invitation",
            "the 51-day Vicksburg interruption and resumption"
          ],
          locator: "Front page and page A4 continuation",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-RAFT-SOUNDINGS-2007",
          relationship: "corroborating",
          supports: [
            "the Kansas City starting point",
            "more than 1,000 miles traveled",
            "human-powered construction",
            "invitations to participate"
          ],
          locator: "Expedition background and participant sections",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Credit Libby Hendon, Laura Mattingly, and the wider network that joined, hosted, assisted, or repaired the expedition.",
        "Treat the Kansas City Star article as an in-progress November 2007 report, not proof of the later endpoint.",
        "Keep the supplied scan and newspaper photography out of the public repository until rights are cleared.",
        "Retain this as knowledge-bank depth unless a future composition needs it."
      ],
      antiClaims: [
        "Jamie completed the expedition alone",
        "the article proves the crew reached or landed on the Gulf of Mexico",
        "the Coast Guard interruption was resolved by Jamie alone",
        "the newspaper scan or photographs are cleared for republication"
      ],
      researchInquiryIds: ["INQ-RIVER-RAFT-ROUTE-2026"],
      reviewedAt: "2026-07-16",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ]
};
