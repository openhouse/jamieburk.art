import type { KnowledgeBank, SourceReading } from "./schema.ts";
import {
  campaignPressArticleSeeds,
  campaignPressCollections
} from "./campaign-press-batch-2026-07-12.ts";

type CampaignPressDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

const collectionBySourceId = new Map<string, string[]>();
for (const collection of campaignPressCollections) {
  for (const item of collection.entries) {
    const campaigns = collectionBySourceId.get(item.sourceId) ?? [];
    campaigns.push(collection.campaign);
    collectionBySourceId.set(item.sourceId, campaigns);
  }
}

const articleReadings: SourceReading[] = campaignPressArticleSeeds.map((seed) => {
  const suffix = seed.id.replace(/^SRC-/, "");
  const campaigns = collectionBySourceId.get(seed.id) ?? [];
  const campaignText = campaigns.join(" and ");
  return {
    id: `READ-${suffix}-2026`,
    sourceId: seed.id,
    readAt: "2026-07-12",
    reader: "Codex public-source review",
    assertions: [
      {
        id: `AST-${suffix}-PUBLICATION`,
        statement: `${seed.organization} published "${seed.title}," which is preserved as a source record in the ${campaignText} reporting collection.`,
        confidence: "high",
        publicSafe: true
      },
      {
        id: `AST-${suffix}-RETRIEVAL`,
        statement:
          seed.retrievalStatus === "read"
            ? "The public article was read for campaign context during this research pass."
            : "A public Archive.org capture was located, but the article body was not relied on for factual claims in this pass.",
        confidence: seed.retrievalStatus === "read" ? "high" : "moderate",
        publicSafe: true
      }
    ],
    limitations: [
      seed.retrievalStatus === "read"
        ? "The article supplies reporting context; inclusion does not establish Jamie's authorship, commissioning role, reach, or sole policy causality."
        : "This is a metadata and preservation reading, not a verified article-body reading; it supports the source trail only."
    ],
    entityIds: ["nyc-artist-coalition"],
    themeIds: ["campaign-information-architecture", "press-context"],
    candidateClaimIds: ["CND-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE"]
  };
});

export const campaignPressDevelopmentRecords: CampaignPressDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-12-LET-NYC-DANCE-PRESS",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "url",
      visibility: "public",
      summary: "Ingest every article listed in the Let NYC Dance campaign press section.",
      sourceUrl: "https://letnycdance.nycartc.com/",
      projectHints: ["nyc-artist-coalition"],
      status: "processed",
      disposition: "Preserved 21 placements as a typed campaign collection with article-level source and reading lineage.",
      linkedRecordIds: ["SRC-LET-NYC-DANCE-CAMPAIGN-SITE", "CND-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE", "CLM-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE"]
    },
    {
      id: "INT-2026-07-12-TALKS-NOT-RAIDS-PRESS",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "url",
      visibility: "public",
      summary: "Ingest every article listed in the Talks Not Raids campaign press section.",
      sourceUrl: "https://talksnotraids.com/",
      projectHints: ["nyc-artist-coalition"],
      status: "processed",
      disposition: "Preserved seven placements as a typed campaign collection with article-level source and reading lineage.",
      linkedRecordIds: ["SRC-TALKS-NOT-RAIDS-PUBLIC-SITE", "CND-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE", "CLM-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE"]
    },
    {
      id: "INT-2026-07-12-SAVE-NYC-SPACES-PRESS",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "url",
      visibility: "public",
      summary: "Ingest every article listed in the Save NYC Spaces campaign press section.",
      sourceUrl: "https://savenycspaces.nycartc.com/",
      projectHints: ["nyc-artist-coalition"],
      status: "processed",
      disposition: "Preserved eight placements as a typed campaign collection with article-level source and reading lineage.",
      linkedRecordIds: ["SRC-SAVE-NYC-SPACES-CAMPAIGN-SITE", "CND-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE", "CLM-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE"]
    },
    {
      id: "INT-2026-07-12-FAIR-RENT-NYC-PRESS",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "url",
      visibility: "public",
      summary: "Ingest every article in the Fair Rent NYC reporting and narrative-context section.",
      sourceUrl: "https://fairrentnyc.nycartc.com/",
      projectHints: ["nyc-artist-coalition"],
      status: "processed",
      disposition: "Preserved the public reporting entry and its public-share boundary as a typed campaign collection.",
      linkedRecordIds: ["SRC-FAIR-RENT-NYC-REFERENCE-LIBRARY", "CND-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE", "CLM-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE"]
    }
  ],
  sourceReadings: [
    {
      id: "READ-LET-NYC-DANCE-CAMPAIGN-SITE-2026",
      sourceId: "SRC-LET-NYC-DANCE-CAMPAIGN-SITE",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "AST-LET-NYC-DANCE-ACTION-SURFACE", statement: "The site combines Cabaret Law advocacy, public action language, coalition context, and a press section.", confidence: "high", publicSafe: true },
        { id: "AST-LET-NYC-DANCE-PRESS-COUNT", statement: "The surviving press section lists 21 article placements.", confidence: "high", publicSafe: true }
      ],
      limitations: ["The list count is not a measure of unique earned-media placements, audience reach, or Jamie's causal influence on repeal."],
      entityIds: ["nyc-artist-coalition"],
      themeIds: ["campaign-information-architecture", "cabaret-law"],
      candidateClaimIds: ["CND-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE"]
    },
    {
      id: "READ-SAVE-NYC-SPACES-CAMPAIGN-SITE-2026",
      sourceId: "SRC-SAVE-NYC-SPACES-CAMPAIGN-SITE",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "AST-SAVE-NYC-SPACES-ACTION-SURFACE", statement: "The site combines Office of Nightlife context, public advocacy, and a press section.", confidence: "high", publicSafe: true },
        { id: "AST-SAVE-NYC-SPACES-PRESS-COUNT", statement: "The surviving press section lists eight article placements.", confidence: "high", publicSafe: true }
      ],
      limitations: ["The site documents coalition advocacy and public information architecture, not Jamie's sole causality for the Office of Nightlife."],
      entityIds: ["nyc-artist-coalition"],
      themeIds: ["campaign-information-architecture", "office-of-nightlife"],
      candidateClaimIds: ["CND-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE"]
    },
    {
      id: "READ-FAIR-RENT-NYC-REFERENCE-LIBRARY-2026",
      sourceId: "SRC-FAIR-RENT-NYC-REFERENCE-LIBRARY",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "AST-FAIR-RENT-LIBRARY-PUBLIC-BOUNDARY", statement: "The library identifies its linked materials as public or public-share approved.", confidence: "high", publicSafe: true },
        { id: "AST-FAIR-RENT-LIBRARY-REPORTING-COUNT", statement: "Its reporting and narrative-context section lists one published article.", confidence: "high", publicSafe: true }
      ],
      limitations: ["The library is a curated source surface; inclusion does not mean endorsement of every article argument or sole authorship of the policy work."],
      entityIds: ["nyc-artist-coalition", "fair-rent-nyc"],
      themeIds: ["campaign-information-architecture", "public-source-boundaries"],
      candidateClaimIds: ["CND-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE"]
    },
    ...articleReadings
  ],
  candidateClaims: [
    {
      id: "CND-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE",
      project: "nyc-artist-coalition",
      text: "Across four campaign sites Jamie built, public action pathways were paired with curated reporting context; 37 surviving list placements point to 36 distinct articles.",
      status: "promoted",
      sourceIds: campaignPressCollections.map((collection) => collection.campaignSourceId),
      researchInquiryIds: ["INQ-NYCAC-CAMPAIGN-PRESS-CENSUS-2026"],
      supportSummary: "The four live campaign surfaces and a deduplicated typed census directly establish the information-architecture pattern and exact collection counts.",
      missingEvidence: [],
      boundaries: ["Describe placements in surviving site lists, not earned-media reach.", "Preserve collective-work language and do not imply article authorship."],
      promotedClaimId: "CLM-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-NYCAC-PRESS-REACH",
      project: "nyc-artist-coalition",
      text: "The campaign sites generated 36 earned-media hits and a measurable audience reach.",
      status: "hold",
      sourceIds: campaignPressCollections.flatMap((collection) => collection.entries.map((item) => item.sourceId)),
      researchInquiryIds: ["INQ-NYCAC-CAMPAIGN-PRESS-CENSUS-2026"],
      supportSummary: "The census establishes listed articles, not how coverage originated, whether every item was earned, or how many people saw it.",
      missingEvidence: ["media-monitoring methodology", "audience and referral data", "evidence of commissioning or pitching relationships"],
      boundaries: ["Do not convert a curated bibliography into a reach metric."],
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-NYCAC-CAMPAIGN-SOLO-CAUSALITY",
      project: "nyc-artist-coalition",
      text: "Jamie's campaign websites and their press coverage caused the Cabaret Law repeal, Office of Nightlife, MARCH reforms, and commercial-rent policy agenda.",
      status: "hold",
      sourceIds: campaignPressCollections.map((collection) => collection.campaignSourceId),
      researchInquiryIds: ["INQ-NYCAC-CAMPAIGN-PRESS-CENSUS-2026"],
      supportSummary: "The sites establish Jamie's web craft within collective campaigns; they do not isolate causality across legislative, executive, coalition, and public processes.",
      missingEvidence: ["multi-party causal history", "collaborator testimony", "legislative and agency attribution"],
      boundaries: ["Use built, supported, advocated, convened, and contributed within collective context."],
      reviewedAt: "2026-07-12"
    }
  ],
  promotions: [
    {
      id: "PROM-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE-2026",
      candidateClaimId: "CND-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE",
      claimId: "CLM-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE",
      decision: "promoted",
      reason: "The exact collection count and repeated campaign-information pattern are directly visible, hiring-relevant, and carefully bounded.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex public-source review"]
    },
    {
      id: "PROM-NYCAC-PRESS-REACH-HOLD-2026",
      candidateClaimId: "CND-NYCAC-PRESS-REACH",
      decision: "held",
      reason: "A curated press list is not an earned-media or audience-reach measurement.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex public-source review"]
    },
    {
      id: "PROM-NYCAC-CAMPAIGN-SOLO-CAUSALITY-HOLD-2026",
      candidateClaimId: "CND-NYCAC-CAMPAIGN-SOLO-CAUSALITY",
      decision: "held",
      reason: "The campaigns were collective and the reviewed press corpus does not establish sole causality.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex public-source review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-NYCAC-CAMPAIGN-PRESS-HIRING-2026",
      audience: "Hiring managers and public-interest technical operations collaborators",
      goal: "Show Jamie's repeatable campaign information-architecture craft without turning press context into a prestige or causality claim.",
      argument: "Jamie built usable public surfaces that connected complex civic campaigns to action, source context, and durable public memory.",
      selectedClaimIds: ["CLM-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE"],
      heldCandidateClaimIds: ["CND-NYCAC-PRESS-REACH", "CND-NYCAC-CAMPAIGN-SOLO-CAUSALITY"],
      rationale: ["The composed site needs one clear proof of repeated system design, not a 36-item press wall.", "The complete corpus remains available to future agents and editors in the knowledge bank."],
      createdAt: "2026-07-12"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-NYCAC-CAMPAIGN-PRESS-FOLLOWUP-2026",
      kind: "agent-research",
      summary: "Future passes can close-read metadata-only archive captures, recover publication dates and bylines, and connect article assertions to narrower campaign-history claims.",
      projectHints: ["nyc-artist-coalition"],
      sourceIds: campaignPressArticleSeeds.filter((seed) => seed.retrievalStatus === "metadata-only").map((seed) => seed.id),
      candidateClaimIds: ["CND-NYCAC-PRESS-REACH", "CND-NYCAC-CAMPAIGN-SOLO-CAUSALITY"],
      rightsReviewRequired: false,
      status: "researching",
      createdAt: "2026-07-12"
    }
  ]
};
