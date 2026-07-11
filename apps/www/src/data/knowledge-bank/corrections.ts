import { correctionSchema, type CorrectionRecord } from "./schema.ts";

const correctionInput: CorrectionRecord[] = [
  {
    id: "callnyc-project-year-2016",
    projectId: "callnyc",
    recordedAt: "2026-07-11",
    previousText: ["2014-2015"],
    correctedText: "2016",
    reason:
      "Recovered event evidence, the CouncilStat release chronology, the public repository, and contemporaneous Politico New York coverage place the documented event and CallNYC build in 2016.",
    affectedSurfaces: [
      "case-study",
      "technical-operations",
      "homepage",
      "resume-html",
      "resume-pdf"
    ],
    status: "partially-applied",
    publicNote:
      "The website now uses 2016. The downloadable resume PDF remains a separately governed artifact and must be regenerated before it can be treated as consistent with this correction."
  }
];

export const corrections = correctionInput.map((correction) =>
  correctionSchema.parse(correction)
);
