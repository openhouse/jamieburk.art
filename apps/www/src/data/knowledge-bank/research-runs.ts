import {
  researchRunRecordSchema,
  type ResearchRunRecord
} from "./schemas.ts";

const researchRunRecordsInput = [
  {
    id: "civic-hall-cdx-research-run-record",
    purpose:
      "Determine whether a Civic Hall calendar listing or dedicated event page could be recovered for the January 2016 CouncilStat hackathon.",
    performedAt: "2026-07-11",
    method:
      "Reviewed deduplicated HTML captures and a separate all-status event-prefix inventory, then searched recovered URL keys for CouncilStat, constituent-services, and NYC Council event slugs.",
    queryScope: [
      "Civic Hall HTML captures",
      "Original URLs represented by those captures",
      "All-status Civic Hall event-prefix URL keys"
    ],
    tools: ["Internet Archive CDX records", "Local deterministic URL-key review"],
    capturesReviewed: 4630,
    originalUrlsReviewed: 1240,
    eventUrlKeysReviewed: 296,
    finding:
      "No matching calendar listing or dedicated event page was recovered in the documented search.",
    limitations: [
      "A negative archival finding does not prove that no listing or dedicated page ever existed.",
      "The surviving Wayback page is an embedded-social-feed carrier, not an event listing.",
      "Raw captures and working materials remain outside the public repository."
    ]
  }
] satisfies ResearchRunRecord[];

export const researchRunRecords = researchRunRecordSchema
  .array()
  .parse(researchRunRecordsInput);
