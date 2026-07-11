import {
  pageCitationManifestSchema,
  type PageCitationManifest
} from "./schemas.ts";

const pageCitationManifestsInput = [
  {
    pageId: "callnyc",
    path: "/work/callnyc",
    mdxPath: "apps/www/src/content/work/callnyc.mdx",
    allowedNoteIds: [
      "callnyc-event-date-time",
      "callnyc-event-branding-councilstat",
      "callnyc-participation-follow-on",
      "callnyc-product-method",
      "callnyc-digital-district-photo",
      "callnyc-calendar-search-limit"
    ],
    occurrences: [
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
    ],
    expectedOccurrenceCount: 8
  }
] satisfies PageCitationManifest[];

export const pageCitationManifests = pageCitationManifestSchema
  .array()
  .parse(pageCitationManifestsInput);
export const pageCitationManifestsById = Object.fromEntries(
  pageCitationManifests.map((manifest) => [manifest.pageId, manifest])
) as Record<string, PageCitationManifest>;
