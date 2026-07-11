import { citationPageSchema, type CitationPage } from "./schema.ts";

const citationPagesInput = [
  {
    id: "callnyc",
    sourceOrder: [
      "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
      "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
      "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC",
      "SRC-CALLNYC-POLITICO-2016-03-14",
      "SRC-CALLNYC-GITHUB-REPOSITORY"
    ],
    occurrences: [
      {
        id: "event-date-time",
        claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME",
        sourceIds: [
          "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
          "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"
        ]
      },
      {
        id: "first-councilstat-hackathon",
        claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON",
        sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"]
      },
      {
        id: "independent-follow-on",
        claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
        sourceIds: [
          "SRC-CALLNYC-POLITICO-2016-03-14",
          "SRC-CALLNYC-GITHUB-REPOSITORY"
        ]
      },
      {
        id: "event-branding",
        claimId: "CLM-CALLNYC-EVENT-BRANDING",
        sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC"]
      },
      {
        id: "press-coverage",
        claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
        sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14"]
      },
      {
        id: "archived-status",
        claimId: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS",
        sourceIds: [
          "SRC-CALLNYC-POLITICO-2016-03-14",
          "SRC-CALLNYC-GITHUB-REPOSITORY"
        ]
      }
    ]
  }
] satisfies CitationPage[];

export const citationPages = citationPageSchema.array().parse(citationPagesInput);
