import type {
  IntakeRecord,
  SourceReading,
  SourceRecord
} from "./schema.ts";

export const kansasCityStarRiverIntake = [
  {
    id: "INTAKE-KCSTAR-RIVER-EXPEDITION-2007",
    receivedAt: "2026-07-16",
    kind: "private-archive-pointer",
    publicSafeSummary:
      "Participant-supplied scan of contemporaneous Kansas City Star reporting on the 2007 river expedition, reviewed without republishing the copyrighted pages.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-RIVER-PUBLIC-ENGAGEMENT"],
    disposition: "source-created",
    sourceIds: ["SRC-KCSTAR-RIVER-EXPEDITION-2007"],
    claimIds: [
      "CLM-RIVER-EXPEDITION-ORIGIN",
      "CLM-RIVER-EXPEDITION-GULF-COMPLETION",
      "CLM-RIVER-EXPEDITION-ORGANIZER-2007"
    ],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  }
] satisfies IntakeRecord[];

export const kansasCityStarRiverSources = [
  {
    id: "SRC-KCSTAR-RIVER-EXPEDITION-2007",
    title: "In the name of art, go with the flow",
    organization: "The Kansas City Star",
    author: "Darryl Levings",
    kind: "published-article",
    visibility: "public-metadata-only",
    preservationStatus: "archived",
    publishedAt: "2007-11-15",
    accessedAt: "2026-07-16",
    publicCitation:
      "Darryl Levings, \"In the name of art, go with the flow,\" The Kansas City Star, November 15, 2007, pp. A1, A4.",
    publicNote:
      "A participant-supplied scan was reviewed. No public article URL was recovered, and the copyrighted scan is not republished.",
    intakeIds: ["INTAKE-KCSTAR-RIVER-EXPEDITION-2007"],
    supportsGenerally: [
      "Jamie originated the expedition idea",
      "the three-person crew included Libby Hendon and Laura Mattingly",
      "the crew built a found-material bicycle-powered paddlewheel raft",
      "the journey began in Kansas City and had passed one thousand river miles",
      "Jamie invited people encountered along the route to join the raft",
      "the project framed rivers as lived cultural connections between places and people",
      "the crew adapted the craft and operating plan after regulatory and logistical interruptions"
    ],
    doesNotEstablish: [
      "the later Gulf of Mexico arrival",
      "sole authorship or sole construction by Jamie",
      "the exact division of labor among the crew and supporters",
      "a complete route log or participant list",
      "measured audience, civic, or cultural outcomes"
    ],
    protectedLocatorId: "ARCHIVE-KCSTAR-RIVER-2007-001",
    media: {
      mediaKind: "document",
      rightsStatus: "permission-needed",
      consentStatus: "not-applicable",
      publicDisplayStatus: "metadata-only",
      visibleText: [
        "In the name of art, go with the flow",
        "RIVER: Adventure of a lifetime takes three friends from KC to Louisiana"
      ]
    }
  }
] satisfies SourceRecord[];

export const kansasCityStarRiverReadings = [
  {
    id: "READ-KCSTAR-RIVER-EXPEDITION-2007",
    sourceId: "SRC-KCSTAR-RIVER-EXPEDITION-2007",
    status: "closely-read",
    readAt: "2026-07-16",
    propositions: [
      {
        id: "PROP-KCSTAR-RIVER-PUBLICATION",
        text: "The article appeared on the Kansas City Star front page on November 15, 2007, and continued on page A4.",
        relationToJamie: "project-context",
        supportTags: ["kcstar-river-contemporary-reporting"],
        confidence: "high",
        locator: "Pages A1 and A4"
      },
      {
        id: "PROP-KCSTAR-RIVER-ORIGIN",
        text: "The article attributes the expedition's originating dream, vision, or idea to Jamie.",
        relationToJamie: "direct-role",
        supportTags: ["expedition-concept-origin"],
        confidence: "high",
        locator: "Page A4, project origin"
      },
      {
        id: "PROP-KCSTAR-RIVER-CREW",
        text: "The article names Libby Hendon and Laura Mattingly with Jamie as the three friends carrying out the journey.",
        relationToJamie: "collective-role",
        supportTags: ["river-expedition-crew-credit"],
        confidence: "high",
        locator: "Pages A1 and A4, captions and crew description"
      },
      {
        id: "PROP-KCSTAR-RIVER-CONSTRUCTION",
        text: "The crew built the approximately twelve-by-thirteen-foot raft in three weeks from discarded materials and powered it with two bicycles connected to a paddlewheel.",
        relationToJamie: "collective-role",
        supportTags: ["river-found-material-construction"],
        confidence: "high",
        locator: "Page A4, craft description"
      },
      {
        id: "PROP-KCSTAR-RIVER-IN-PROGRESS-ROUTE",
        text: "The article reports that the crew left Kansas City's West Bottoms on July 21, had passed the one-thousand-mile marker, and was continuing through Louisiana when the article was published.",
        relationToJamie: "collective-role",
        supportTags: ["river-thousand-miles-in-progress"],
        confidence: "high",
        locator: "Page A4, route and progress descriptions"
      },
      {
        id: "PROP-KCSTAR-RIVER-PARTICIPATION",
        text: "Jamie described inviting people met along the route to join the raft and framed the journey as a lived river experience centered on meeting people.",
        relationToJamie: "direct-role",
        supportTags: ["river-participant-invitation"],
        confidence: "high",
        locator: "Page A4, Jamie voice-mail account and project purpose"
      },
      {
        id: "PROP-KCSTAR-RIVER-CULTURAL-CONNECTION",
        text: "Jamie described the river as a possible cultural connection between Kansas City's West Bottoms and economically marginalized communities farther south.",
        relationToJamie: "direct-role",
        supportTags: ["river-cultural-connection-purpose"],
        confidence: "high",
        locator: "Page A4, Jamie discussion of the river and connected places"
      },
      {
        id: "PROP-KCSTAR-RIVER-ADAPTATION",
        text: "The article documents the crew responding to regulatory and logistical interruption by modifying the craft, adding safety and communication equipment, and revising how they continued the journey.",
        relationToJamie: "collective-role",
        supportTags: ["river-adaptive-implementation"],
        confidence: "high",
        locator: "Page A4, Coast Guard interruption and subsequent modifications"
      }
    ],
    limitations: [
      "The article records the expedition in progress through Louisiana on November 15, 2007; it does not establish the later Gulf arrival.",
      "The article attributes the originating idea to Jamie but does not divide construction, navigation, support, or adaptation labor among every contributor.",
      "The participant-supplied scan has no recovered public article URL and remains outside the repository for copyright reasons.",
      "The article does not establish measured participation, civic, or cultural outcomes."
    ],
    researchTaskIds: []
  }
] satisfies SourceReading[];
