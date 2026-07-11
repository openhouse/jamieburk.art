import { pageCitationSetSchema, type PageCitationSet } from "./schemas.ts";

const pageCitationSetsInput = [
  {
    pageId: "callnyc-case-study",
    references: [
      { refId: "callnyc-summary-event", noteId: "callnyc-event-date-time" },
      {
        refId: "callnyc-summary-follow-on",
        noteId: "callnyc-participation-follow-on"
      },
      { refId: "callnyc-opening-event", noteId: "callnyc-event-date-time" },
      {
        refId: "callnyc-opening-branding",
        noteId: "callnyc-event-branding-councilstat"
      },
      {
        refId: "callnyc-opening-follow-on",
        noteId: "callnyc-participation-follow-on"
      },
      { refId: "callnyc-opening-method", noteId: "callnyc-product-method" },
      {
        refId: "callnyc-digital-district",
        noteId: "callnyc-digital-district-photo"
      },
      { refId: "callnyc-data-limits", noteId: "callnyc-product-method" },
      {
        refId: "callnyc-calendar-search",
        noteId: "callnyc-calendar-search-limit"
      },
      { refId: "callnyc-archive-status", noteId: "callnyc-product-method" }
    ]
  }
] satisfies PageCitationSet[];

export const pageCitationSets = pageCitationSetSchema.array().parse(pageCitationSetsInput);

export const pageCitationSetsById = Object.fromEntries(
  pageCitationSets.map((set) => [set.pageId, set])
) as Record<string, PageCitationSet>;
