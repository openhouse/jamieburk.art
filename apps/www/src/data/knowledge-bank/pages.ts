import {
  pageProjectionSchema,
  type PageProjection
} from "./schema.ts";

const pageInput: PageProjection[] = [
  {
    id: "callnyc",
    path: "/work/callnyc",
    title: "CallNYC.org",
    surface: "case-study",
    referenceHeading: "Sources and notes",
    occurrences: [
      {
        id: "summary-event",
        noteId: "callnyc-event",
        claimId: "callnyc-event-date-time",
        accessibleLabel: "Citation for the CallNYC event date and context"
      },
      {
        id: "summary-follow-on",
        noteId: "callnyc-project-and-iteration",
        claimId: "callnyc-independent-follow-on",
        accessibleLabel: "Citation for Jamie's independent CallNYC follow-on"
      },
      {
        id: "context-councilstat",
        noteId: "callnyc-branding-and-councilstat",
        claimId: "callnyc-councilstat-context",
        accessibleLabel: "Citation for the CouncilStat event context"
      },
      {
        id: "context-event-hours",
        noteId: "callnyc-event",
        claimId: "callnyc-event-date-time",
        accessibleLabel: "Citation for the announced event hours"
      },
      {
        id: "context-branding",
        noteId: "callnyc-branding-and-councilstat",
        claimId: "callnyc-event-branding",
        accessibleLabel: "Citation for the recovered event branding"
      },
      {
        id: "context-breakout",
        noteId: "callnyc-digital-district",
        claimId: "callnyc-digital-district-breakout",
        accessibleLabel: "Citation for the Digital District breakout"
      },
      {
        id: "timeline-event",
        noteId: "callnyc-event",
        claimId: "callnyc-jamie-participation",
        accessibleLabel: "Citation for Jamie's hackathon participation"
      },
      {
        id: "timeline-release",
        noteId: "callnyc-project-and-iteration",
        claimId: "callnyc-independent-follow-on",
        accessibleLabel: "Citation for the CouncilStat release and CallNYC chronology"
      },
      {
        id: "work-method",
        noteId: "callnyc-project-and-iteration",
        claimId: "callnyc-product-method",
        accessibleLabel: "Citation for Jamie's CallNYC product method"
      },
      {
        id: "use-iteration",
        noteId: "callnyc-project-and-iteration",
        claimId: "callnyc-use-and-iteration",
        accessibleLabel: "Citation for CallNYC use and iteration"
      },
      {
        id: "data-limits",
        noteId: "callnyc-data-limits",
        claimId: "callnyc-data-limitations",
        accessibleLabel: "Citation for CouncilStat data limitations"
      },
      {
        id: "archive-status",
        noteId: "callnyc-archive-status",
        claimId: "callnyc-archived-unofficial-status",
        accessibleLabel: "Citation for CallNYC's archived and unofficial status"
      }
    ],
    assetIds: []
  },
  {
    id: "technical-operations",
    path: "/work/technical-operations",
    title: "Technical Operations & Implementation",
    surface: "technical-operations",
    referenceHeading: "Sources and notes",
    occurrences: [
      {
        id: "callnyc-product-method",
        noteId: "callnyc-project-and-iteration",
        claimId: "callnyc-product-method",
        accessibleLabel: "Citation for the CallNYC technical-operations proof"
      }
    ],
    assetIds: []
  }
];

export const pageProjections = pageInput.map((page) =>
  pageProjectionSchema.parse(page)
);
