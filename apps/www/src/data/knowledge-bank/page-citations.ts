import { pageCitationSetSchema, type PageCitationSet } from "./schemas.ts";

const pageCitationSetsInput = [
  {
    pageId: "callnyc-case-study",
    references: [
      { refId: "callnyc-summary-event", noteId: "callnyc-event" },
      { refId: "callnyc-summary-project", noteId: "callnyc-project-and-iteration" },
      { refId: "callnyc-context-event", noteId: "callnyc-event" },
      {
        refId: "callnyc-context-branding",
        noteId: "callnyc-branding-and-councilstat"
      },
      {
        refId: "callnyc-context-digital-district",
        noteId: "callnyc-digital-district"
      },
      { refId: "callnyc-context-project", noteId: "callnyc-project-and-iteration" },
      { refId: "callnyc-timeline-event", noteId: "callnyc-event" },
      { refId: "callnyc-timeline-project", noteId: "callnyc-project-and-iteration" },
      { refId: "callnyc-work-project", noteId: "callnyc-project-and-iteration" },
      { refId: "callnyc-work-data", noteId: "callnyc-data-limits" },
      { refId: "callnyc-use-iteration", noteId: "callnyc-project-and-iteration" },
      { refId: "callnyc-evidence-event", noteId: "callnyc-event" },
      {
        refId: "callnyc-evidence-digital-district",
        noteId: "callnyc-digital-district"
      },
      { refId: "callnyc-evidence-data", noteId: "callnyc-data-limits" },
      { refId: "callnyc-archive-disclaimer", noteId: "callnyc-archive-status" }
    ]
  }
] satisfies PageCitationSet[];

export const pageCitationSets = pageCitationSetSchema.array().parse(pageCitationSetsInput);

export const pageCitationSetsById = Object.fromEntries(
  pageCitationSets.map((set) => [set.pageId, set])
) as Record<string, PageCitationSet>;
