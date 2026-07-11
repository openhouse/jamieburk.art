import { correctionRecordSchema, type CorrectionRecord } from "./schemas.ts";

const correctionRecordsInput = [
  {
    id: "callnyc-year-correction-2026",
    recordedAt: "2026-07-11",
    objectIds: ["callnyc.event.date-and-venue"],
    previousPublicText: "CallNYC project years: 2014-2015",
    revisedPublicText: "CallNYC project year: 2016",
    reason:
      "Converging public event records and contemporaneous reporting support the corrected 2016 chronology.",
    evidenceAdded: [
      "civic-hall-x-693124020917522433",
      "nyc-council-x-693509031768506368",
      "civic-hall-wayback-2016-01-31",
      "callnyc-politico-2016-03-14"
    ],
    status: "published"
  }
] satisfies CorrectionRecord[];

export const correctionRecords = correctionRecordSchema
  .array()
  .parse(correctionRecordsInput);
