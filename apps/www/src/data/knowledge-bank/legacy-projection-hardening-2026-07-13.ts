import type { SourceReading } from "./schema.ts";

export const legacyProjectionReadings = [
  {
    id: "READ-CALLNYC-CIVIC-HALL-ANNOUNCEMENT-2016",
    sourceId: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-CALLNYC-CIVIC-HALL-DATE-TIME", text: "Civic Hall announced the New York City Council hackathon for January 30, 2016, from 1-3 p.m.", relationToJamie: "project-context", supportTags: ["callnyc-event-date-time"], confidence: "high", locator: "Embedded Civic Hall social post" },
      { id: "PROP-CALLNYC-CIVIC-HALL-PURPOSE", text: "The announcement describes the hackathon as focused on constituent services.", relationToJamie: "project-context", supportTags: ["callnyc-constituent-services-purpose"], confidence: "high", locator: "Embedded Civic Hall social post" }
    ],
    limitations: ["The Wayback capture preserves an embedded social post, not a recovered Civic Hall calendar listing or event-detail page.", "The announcement does not establish a complete formal title, agenda, participant roster, or Jamie's role."],
    researchTaskIds: []
  },
  {
    id: "READ-CALLNYC-HACKATHON-GRAPHIC-2016",
    sourceId: "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-CALLNYC-GRAPHIC-BRANDING", text: "The recovered promotional graphic visibly reads 'New York City Council Hackathon.'", relationToJamie: "project-context", supportTags: ["callnyc-event-branding"], confidence: "high", locator: "Visible graphic text" },
      { id: "PROP-CALLNYC-GRAPHIC-LABS", text: "The recovered promotional graphic displays labs.council.nyc.", relationToJamie: "project-context", supportTags: ["callnyc-labs-council-branding"], confidence: "high", locator: "Visible graphic text" }
    ],
    limitations: ["Visible graphic wording does not establish a longer formal registration title, agenda, breakout structure, or participant roster."],
    researchTaskIds: []
  },
  {
    id: "READ-CALLNYC-POLITICO-2016-03-14",
    sourceId: "SRC-CALLNYC-POLITICO-2016-03-14",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-CALLNYC-POLITICO-INDEPENDENT-FOLLOW-ON", text: "Politico connects Jamie's independent development of CallNYC to the January Civic Hall event and subsequent public release of the fuller CouncilStat data.", relationToJamie: "direct-role", supportTags: ["callnyc-independent-follow-on", "callnyc-after-data-release"], confidence: "high", locator: "Article project chronology" },
      { id: "PROP-CALLNYC-POLITICO-ITERATION", text: "Politico reports that Jamie iterated CallNYC's filtering, public discovery, sharing, and contact pathways.", relationToJamie: "direct-role", supportTags: ["callnyc-reported-iteration"], confidence: "high", locator: "Article implementation discussion" },
      { id: "PROP-CALLNYC-POLITICO-INDEPENDENT-STATUS", text: "Politico presents CallNYC as Jamie's independent project rather than an official Council service.", relationToJamie: "direct-role", supportTags: ["callnyc-independent-status"], confidence: "high", locator: "Article project framing" }
    ],
    limitations: ["The article does not establish CallNYC as a commissioned Council product, formal hackathon submission, or winning entry.", "The article does not establish broad adoption or measured improvements in constituent services."],
    researchTaskIds: []
  },
  {
    id: "READ-CALLNYC-GITHUB-REPOSITORY",
    sourceId: "SRC-CALLNYC-GITHUB-REPOSITORY",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-CALLNYC-GITHUB-SURVIVING-IMPLEMENTATION", text: "The public repository preserves the source implementation of CallNYC.", relationToJamie: "project-context", supportTags: ["callnyc-surviving-implementation"], confidence: "high", locator: "Repository contents" },
      { id: "PROP-CALLNYC-GITHUB-ARCHIVED-PROTOTYPE", text: "The repository documents CallNYC as a historical prototype rather than a current constituent-service application.", relationToJamie: "project-context", supportTags: ["callnyc-archived-prototype-status"], confidence: "high", locator: "Repository description and contents" }
    ],
    limitations: ["The repository does not establish official Council ownership, formal submission status, current resident-service guidance, adoption, or outcome measures."],
    researchTaskIds: []
  },
  {
    id: "READ-CALLNYC-CIVIC-HALL-RESEARCH-2026",
    sourceId: "SRC-CALLNYC-CIVIC-HALL-RESEARCH-2026",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-CALLNYC-RESEARCH-NO-CALENDAR-RECOVERED", text: "The documented Wayback and CDX review recovered no dedicated Civic Hall calendar listing or event-detail page for the gathering.", relationToJamie: "limitation", supportTags: ["callnyc-no-calendar-page-recovered"], confidence: "high", locator: "Research-run findings" },
      { id: "PROP-CALLNYC-RESEARCH-EMBEDDED-SOCIAL-ONLY", text: "The recovered Civic Hall evidence comes from an embedded social feed rather than a dedicated event listing.", relationToJamie: "limitation", supportTags: ["callnyc-embedded-social-only"], confidence: "high", locator: "Research-run findings" }
    ],
    limitations: ["A bounded negative search does not establish that no calendar listing or event-detail page ever existed."],
    researchTaskIds: []
  },
  {
    id: "READ-HJE-PUBLIC-STOREFRONT-2026",
    sourceId: "SRC-HJE-PUBLIC-STOREFRONT-2026",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-HJE-STOREFRONT-ECOMMERCE-SURFACE", text: "The public Harry J. Epstein Company storefront exposes tool-type and brand navigation, search, product content, and checkout access.", relationToJamie: "project-context", supportTags: ["hje-public-ecommerce-surface"], confidence: "high", locator: "Public storefront" },
      { id: "PROP-HJE-STOREFRONT-EDITORIAL-VOICE", text: "The public storefront presents the company's distinctive editorial voice alongside its commerce functions.", relationToJamie: "project-context", supportTags: ["hje-public-editorial-voice"], confidence: "high", locator: "Public storefront copy" }
    ],
    limitations: ["The storefront alone does not establish Jamie's role, internal systems, revenue growth, or causal business outcomes."],
    researchTaskIds: []
  },
  {
    id: "READ-HJE-PUBLIC-RESUME-2026-07-11",
    sourceId: "SRC-HJE-PUBLIC-RESUME-2026-07-11",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-HJE-RESUME-IMPROVEMENT-AREAS", text: "Jamie's public resume identifies web, e-commerce, marketing, analytics, and operations as his improvement areas at Harry J. Epstein Company.", relationToJamie: "direct-role", supportTags: ["hje-improvement-areas"], confidence: "high", locator: "Harry J. Epstein Company selected-impact entry" },
      { id: "PROP-HJE-RESUME-REVENUE-CONTRIBUTION", text: "Jamie's public resume states that his work contributed to a period of 2x revenue growth.", relationToJamie: "direct-role", supportTags: ["hje-revenue-contribution-wording"], confidence: "high", locator: "Harry J. Epstein Company selected-impact entry" },
      { id: "PROP-HJE-RESUME-FINANCIAL-BOUNDARY", text: "The approved wording is a contribution claim, not a claim of sole causality or audited public financial disclosure.", relationToJamie: "limitation", supportTags: ["hje-private-financial-boundary"], confidence: "high", locator: "Public source note and claim boundary" },
      { id: "PROP-196-RESUME-FOUNDER-SCALE", text: "Jamie's approved public resume identifies him as founder of 196 Artists Residency and reports support for more than 20 resident artists.", relationToJamie: "direct-role", supportTags: ["196-residency-founder-scale"], confidence: "moderate", locator: "Selected Impact and Community Infrastructure entries" }
    ],
    limitations: ["The source is Jamie's approved public resume, not independent financial reporting.", "Underlying business figures remain private and are not presented as audited financial disclosure.", "The resume is a first-party public source; it does not independently corroborate the 20-plus resident-artist aggregate."],
    researchTaskIds: []
  },
  {
    id: "READ-FAIRRENTNYC-PUBLIC-SITE-2026",
    sourceId: "SRC-FAIRRENTNYC-PUBLIC-SITE-2026",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-FAIRRENT-SITE-CRS-CALL-TO-ACTION", text: "The FairRentNYC public campaign site presents a Commercial Rent Stabilization call to action.", relationToJamie: "project-context", supportTags: ["fairrent-crs-call-to-action"], confidence: "high", locator: "Public campaign site" },
      { id: "PROP-FAIRRENT-SITE-REFERENCE-LIBRARY", text: "The FairRentNYC public campaign site provides a pathway to a public reference library.", relationToJamie: "project-context", supportTags: ["fairrent-reference-library-pathway"], confidence: "high", locator: "Public campaign site" }
    ],
    limitations: ["The public site alone does not establish Jamie's role, individual authorship, private documentation volume, or policy outcomes."],
    researchTaskIds: []
  },
  {
    id: "READ-WOWLIST-WAYBACK-2016-02-12",
    sourceId: "SRC-WOWLIST-WAYBACK-2016-02-12",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-WOWLIST-WAYBACK-EVENT-SHARING", text: "The archived public surface describes WOWList as an event-sharing and community-building application.", relationToJamie: "project-context", supportTags: ["wowlist-event-sharing-purpose", "wowlist-community-building-purpose"], confidence: "high", locator: "Archived public application surface" },
      { id: "PROP-WOWLIST-WAYBACK-EMBER-API", text: "The archived public surface preserves Ember application metadata and a configured application-programming-interface endpoint.", relationToJamie: "project-context", supportTags: ["wowlist-ember-application", "wowlist-api-endpoint"], confidence: "high", locator: "Archived application metadata" }
    ],
    limitations: ["The archived application shell does not establish user totals, event totals, geographic adoption, Jamie's role, or current availability."],
    researchTaskIds: []
  }
] satisfies SourceReading[];
