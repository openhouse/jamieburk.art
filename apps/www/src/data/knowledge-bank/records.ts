import { knowledgeBankSchema, type KnowledgeBank } from "./schema.ts";
import { knowledgeDevelopmentRecords } from "./development-records.ts";
import { evidenceBatchRecords } from "./evidence-batch-2026-07-12.ts";
import { strengtheningBatchRecords } from "./strengthening-batch-2026-07-12.ts";
import { strengtheningDevelopmentRecords } from "./strengthening-development-2026-07-12.ts";
import { campaignPressBatchRecords } from "./campaign-press-batch-2026-07-12.ts";
import { campaignPressDevelopmentRecords } from "./campaign-press-development-2026-07-12.ts";
import { kcTownHallCouncilBatchRecords } from "./kc-town-hall-council-batch-2026-07-12.ts";
import { kcTownHallCouncilDevelopmentRecords } from "./kc-town-hall-council-development-2026-07-12.ts";
import { archivalProductionBatchRecords } from "./archival-production-batch-2026-07-12.ts";
import { archivalProductionDevelopmentRecords } from "./archival-production-development-2026-07-12.ts";
import { sharedDriveArchivalBatchRecords } from "./shared-drive-archival-batch-2026-07-12.ts";
import { sharedDriveArchivalDevelopmentRecords } from "./shared-drive-archival-development-2026-07-12.ts";
import { socialArchiveBatchRecords } from "./social-archive-batch-2026-07-12.ts";
import { socialArchiveDevelopmentRecords } from "./social-archive-development-2026-07-12.ts";
import { socialAuthenticatedBatchRecords } from "./social-authenticated-batch-2026-07-12.ts";
import { socialAuthenticatedDevelopmentRecords } from "./social-authenticated-development-2026-07-12.ts";
import { callnycPopulationBatchRecords } from "./callnyc-population-batch-2026-07-12.ts";
import { callnycPopulationDevelopmentRecords } from "./callnyc-population-development-2026-07-12.ts";
import { wowlistPopulationBatchRecords } from "./wowlist-population-batch-2026-07-12.ts";
import { wowlistPopulationDevelopmentRecords } from "./wowlist-population-development-2026-07-12.ts";
import { kctownhallPopulationBatchRecords } from "./kctownhall-population-batch-2026-07-12.ts";
import { kctownhallPopulationDevelopmentRecords } from "./kctownhall-population-development-2026-07-12.ts";
import { nycartcPopulationBatchRecords } from "./nycartc-population-batch-2026-07-12.ts";
import { nycartcPopulationDevelopmentRecords } from "./nycartc-population-development-2026-07-12.ts";
import { urbanhermitPopulationBatchRecords } from "./urbanhermit-population-batch-2026-07-13.ts";
import { urbanhermitPopulationDevelopmentRecords } from "./urbanhermit-population-development-2026-07-13.ts";
import { nycartcFacebookEventsBatchRecords } from "./nycartc-facebook-events-batch-2026-07-13.ts";
import { nycartcFacebookEventsDevelopmentRecords } from "./nycartc-facebook-events-development-2026-07-13.ts";
import { facebookEventSurfacesBatchRecords } from "./facebook-event-surfaces-batch-2026-07-13.ts";
import { facebookEventSurfacesDevelopmentRecords } from "./facebook-event-surfaces-development-2026-07-13.ts";

const knowledgeBankInput = {
  intakeItems: [
    ...knowledgeDevelopmentRecords.intakeItems,
    ...strengtheningDevelopmentRecords.intakeItems,
    ...campaignPressDevelopmentRecords.intakeItems,
    ...kcTownHallCouncilDevelopmentRecords.intakeItems,
    ...archivalProductionDevelopmentRecords.intakeItems,
    ...sharedDriveArchivalDevelopmentRecords.intakeItems,
    ...socialArchiveDevelopmentRecords.intakeItems,
    ...socialAuthenticatedDevelopmentRecords.intakeItems,
    ...callnycPopulationDevelopmentRecords.intakeItems,
    ...wowlistPopulationDevelopmentRecords.intakeItems,
    ...kctownhallPopulationDevelopmentRecords.intakeItems,
    ...nycartcPopulationDevelopmentRecords.intakeItems,
    ...urbanhermitPopulationDevelopmentRecords.intakeItems,
    ...nycartcFacebookEventsDevelopmentRecords.intakeItems,
    ...facebookEventSurfacesDevelopmentRecords.intakeItems
  ],
  sourceReadings: [
    ...knowledgeDevelopmentRecords.sourceReadings,
    ...strengtheningDevelopmentRecords.sourceReadings,
    ...campaignPressDevelopmentRecords.sourceReadings,
    ...kcTownHallCouncilDevelopmentRecords.sourceReadings,
    ...archivalProductionDevelopmentRecords.sourceReadings,
    ...sharedDriveArchivalDevelopmentRecords.sourceReadings,
    ...socialArchiveDevelopmentRecords.sourceReadings,
    ...socialAuthenticatedDevelopmentRecords.sourceReadings,
    ...callnycPopulationDevelopmentRecords.sourceReadings,
    ...wowlistPopulationDevelopmentRecords.sourceReadings,
    ...kctownhallPopulationDevelopmentRecords.sourceReadings,
    ...nycartcPopulationDevelopmentRecords.sourceReadings,
    ...urbanhermitPopulationDevelopmentRecords.sourceReadings,
    ...nycartcFacebookEventsDevelopmentRecords.sourceReadings,
    ...facebookEventSurfacesDevelopmentRecords.sourceReadings
  ],
  candidateClaims: [
    ...knowledgeDevelopmentRecords.candidateClaims,
    ...strengtheningDevelopmentRecords.candidateClaims,
    ...campaignPressDevelopmentRecords.candidateClaims,
    ...kcTownHallCouncilDevelopmentRecords.candidateClaims,
    ...archivalProductionDevelopmentRecords.candidateClaims,
    ...sharedDriveArchivalDevelopmentRecords.candidateClaims,
    ...socialArchiveDevelopmentRecords.candidateClaims,
    ...socialAuthenticatedDevelopmentRecords.candidateClaims,
    ...callnycPopulationDevelopmentRecords.candidateClaims,
    ...wowlistPopulationDevelopmentRecords.candidateClaims,
    ...kctownhallPopulationDevelopmentRecords.candidateClaims,
    ...nycartcPopulationDevelopmentRecords.candidateClaims,
    ...urbanhermitPopulationDevelopmentRecords.candidateClaims,
    ...nycartcFacebookEventsDevelopmentRecords.candidateClaims,
    ...facebookEventSurfacesDevelopmentRecords.candidateClaims
  ],
  promotions: [
    ...knowledgeDevelopmentRecords.promotions,
    ...strengtheningDevelopmentRecords.promotions,
    ...campaignPressDevelopmentRecords.promotions,
    ...kcTownHallCouncilDevelopmentRecords.promotions,
    ...archivalProductionDevelopmentRecords.promotions,
    ...sharedDriveArchivalDevelopmentRecords.promotions,
    ...socialArchiveDevelopmentRecords.promotions,
    ...socialAuthenticatedDevelopmentRecords.promotions,
    ...callnycPopulationDevelopmentRecords.promotions,
    ...wowlistPopulationDevelopmentRecords.promotions,
    ...kctownhallPopulationDevelopmentRecords.promotions,
    ...nycartcPopulationDevelopmentRecords.promotions,
    ...urbanhermitPopulationDevelopmentRecords.promotions,
    ...nycartcFacebookEventsDevelopmentRecords.promotions,
    ...facebookEventSurfacesDevelopmentRecords.promotions
  ],
  editorialBriefs: [
    ...knowledgeDevelopmentRecords.editorialBriefs,
    ...strengtheningDevelopmentRecords.editorialBriefs,
    ...campaignPressDevelopmentRecords.editorialBriefs,
    ...kcTownHallCouncilDevelopmentRecords.editorialBriefs,
    ...archivalProductionDevelopmentRecords.editorialBriefs,
    ...sharedDriveArchivalDevelopmentRecords.editorialBriefs,
    ...socialArchiveDevelopmentRecords.editorialBriefs,
    ...callnycPopulationDevelopmentRecords.editorialBriefs,
    ...wowlistPopulationDevelopmentRecords.editorialBriefs,
    ...kctownhallPopulationDevelopmentRecords.editorialBriefs,
    ...nycartcPopulationDevelopmentRecords.editorialBriefs,
    ...urbanhermitPopulationDevelopmentRecords.editorialBriefs,
    ...nycartcFacebookEventsDevelopmentRecords.editorialBriefs,
    ...facebookEventSurfacesDevelopmentRecords.editorialBriefs
  ],
  discoveryNotes: [
    ...knowledgeDevelopmentRecords.discoveryNotes,
    ...strengtheningDevelopmentRecords.discoveryNotes,
    ...campaignPressDevelopmentRecords.discoveryNotes,
    ...kcTownHallCouncilDevelopmentRecords.discoveryNotes,
    ...archivalProductionDevelopmentRecords.discoveryNotes,
    ...sharedDriveArchivalDevelopmentRecords.discoveryNotes,
    ...socialArchiveDevelopmentRecords.discoveryNotes,
    ...callnycPopulationDevelopmentRecords.discoveryNotes,
    ...kctownhallPopulationDevelopmentRecords.discoveryNotes,
    ...nycartcPopulationDevelopmentRecords.discoveryNotes,
    ...urbanhermitPopulationDevelopmentRecords.discoveryNotes,
    ...nycartcFacebookEventsDevelopmentRecords.discoveryNotes,
    ...facebookEventSurfacesDevelopmentRecords.discoveryNotes
  ],
  sources: [
    {
      id: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
      title: "Civic Hall announcement of New York City Council hackathon",
      organization: "Civic Hall",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2016-01-29",
      accessedAt: "2026-07-11",
      canonicalUrl: "https://x.com/CivicHall/status/693124020917522433",
      archiveUrl: "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
      preferredPublicUrl: "archive",
      publicCitation: "Civic Hall announcement of a January 30, 2016, 1-3 p.m. New York City Council hackathon focused on constituent services.",
      publicNote: "The archived Civic Hall page preserves the embedded social post. It is not a recovered Civic Hall calendar listing or event-detail page.",
      supportsGenerally: ["January 30, 2016", "1-3 p.m.", "New York City Council hackathon", "constituent-services purpose"],
      doesNotEstablish: ["a recovered Civic Hall calendar listing", "a dedicated event-detail page", "the complete formal event title", "the agenda", "the participant roster"]
    },
    {
      id: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
      title: "New York City Council event-day CouncilStat hackathon post",
      organization: "New York City Council",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2016-01-30",
      accessedAt: "2026-07-11",
      canonicalUrl: "https://x.com/NYCCouncil/status/693509031768506368",
      archiveUrl: "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
      preferredPublicUrl: "archive",
      publicCitation: "New York City Council event-day post from Civic Hall identifying the gathering as the Council's first CouncilStat hackathon.",
      publicNote: "The source supports the narrower 'first CouncilStat hackathon' wording, not a broader historical superlative.",
      supportsGenerally: ["January 30, 2016", "Civic Hall", "first CouncilStat hackathon"],
      doesNotEstablish: ["broader historical hackathon superlatives", "the full agenda", "a complete attendee list", "formal winners", "CallNYC as an official submission"]
    },
    {
      id: "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC",
      title: "New York City Council Hackathon promotional graphic",
      organization: "New York City Council / Civic Hall",
      kind: "promotional-graphic",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-11",
      assetUrl: "https://pbs.twimg.com/media/CZ5m-mAWwAA42td.png:large",
      preferredPublicUrl: "asset",
      publicCitation: "NYC Council-branded promotional graphic reading 'New York City Council Hackathon' and displaying labs.council.nyc.",
      publicNote: "The graphic supports the visible event branding, not a longer formal registration title.",
      supportsGenerally: ["New York City Council Hackathon branding", "labs.council.nyc"],
      doesNotEstablish: ["a longer formal registration title", "the agenda", "breakout structure", "participant roster"],
      media: {
        mediaKind: "graphic",
        rightsStatus: "unknown",
        consentStatus: "not-applicable",
        publicDisplayStatus: "metadata-only",
        visibleText: ["New York City Council Hackathon", "labs.council.nyc"]
      }
    },
    {
      id: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO",
      title: "Participant photograph of Digital District breakout placard",
      kind: "participant-photograph",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publicCitation: "Participant photograph showing a placard reading 'Digital District - Help improve City Council District office operations.'",
      publicNote: "The photograph remains outside the public repository pending rights, consent, and editorial review.",
      protectedLocatorId: "PHOTO-CALLNYC-DIGITAL-DISTRICT-2016-001",
      supportsGenerally: ["Digital District placard wording", "breakout-table context", "collaborative working setting"],
      doesNotEstablish: ["the official event title", "the facilitator", "the complete agenda", "the event start time", "the identity or consent status of all people depicted"],
      media: {
        mediaKind: "photograph",
        rightsStatus: "permission-needed",
        consentStatus: "review-needed",
        publicDisplayStatus: "hold",
        visibleText: ["Digital District", "Help improve City Council District office operations"],
        captureTimestamp: "approximately 2:10 p.m.",
        timestampConfidence: "limited"
      }
    },
    {
      id: "SRC-CALLNYC-POLITICO-2016-03-14",
      title: "Website provides new information about council members' focus",
      organization: "Politico New York",
      author: "Miranda Neubauer",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2016-03-14",
      accessedAt: "2026-07-11",
      archiveUrl: "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf",
      preferredPublicUrl: "archive",
      publicCitation: "Miranda Neubauer, 'Website provides new information about council members' focus,' Politico New York, March 14, 2016.",
      publicNote: "The reporting connects Jamie to the January event, the fuller data release, and his independent development and iteration of CallNYC.",
      supportsGenerally: ["CallNYC existed", "Jamie's relationship to the project", "CouncilStat and event relationship", "press date and coverage"],
      doesNotEstablish: ["CallNYC as an official Council product", "CallNYC as a formal hackathon submission", "CallNYC as a documented winner"]
    },
    {
      id: "SRC-CALLNYC-GITHUB-REPOSITORY",
      title: "CallNYC source repository",
      organization: "openhouse",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-11",
      canonicalUrl: "https://github.com/openhouse/CallNYC",
      preferredPublicUrl: "canonical",
      publicCitation: "Public CallNYC source repository.",
      publicNote: "The repository documents the surviving implementation of the independent, archived prototype.",
      supportsGenerally: ["project implementation", "surviving source code"],
      doesNotEstablish: ["official Council ownership", "formal hackathon submission status", "current resident-service guidance"]
    },
    {
      id: "SRC-CALLNYC-CIVIC-HALL-RESEARCH-2026",
      title: "Civic Hall calendar and event-detail recovery research run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      publicCitation: "Documented 2026 Wayback/CDX review of Civic Hall event captures.",
      publicNote: "The bounded search recovered embedded social-feed evidence but no dedicated Civic Hall listing or event-detail page.",
      protectedLocatorId: "RESEARCH-CALLNYC-CIVIC-HALL-CDX-2026-001",
      supportsGenerally: ["bounded negative search finding", "research method and limitations"],
      doesNotEstablish: ["that no event page ever existed"]
    },
    ...evidenceBatchRecords.sources,
    ...strengtheningBatchRecords.sources,
    ...campaignPressBatchRecords.sources,
    ...kcTownHallCouncilBatchRecords.sources,
    ...archivalProductionBatchRecords.sources,
    ...sharedDriveArchivalBatchRecords.sources,
    ...socialArchiveBatchRecords.sources,
    ...socialAuthenticatedBatchRecords.sources,
    ...callnycPopulationBatchRecords.sources,
    ...wowlistPopulationBatchRecords.sources,
    ...kctownhallPopulationBatchRecords.sources,
    ...nycartcPopulationBatchRecords.sources,
    ...urbanhermitPopulationBatchRecords.sources,
    ...nycartcFacebookEventsBatchRecords.sources,
    ...facebookEventSurfacesBatchRecords.sources
  ],
  claims: [
    {
      id: "CLM-CALLNYC-HACKATHON-DATE-TIME",
      project: "callnyc",
      internalClaim: "The New York City Council constituent-services hackathon took place at Civic Hall on January 30, 2016, from 1-3 p.m.",
      status: "confirmed",
      projections: [{ key: "case-study", text: "On January 30, 2016, the New York City Council held a 1-3 p.m. hackathon at Civic Hall focused on constituent services.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [
        { sourceId: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", relationship: "direct-support", supports: ["date", "time", "Council event", "constituent-services purpose"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368", relationship: "corroborating", supports: ["date", "venue", "CouncilStat context"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["Do not describe the Wayback page as a recovered event calendar listing."],
      antiClaims: [], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON",
      project: "callnyc",
      internalClaim: "The New York City Council described the gathering as its first CouncilStat hackathon.",
      status: "confirmed-with-boundary",
      projections: [{ key: "case-study", text: "The Council described the gathering as its first CouncilStat hackathon.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368", relationship: "direct-support", supports: ["the Council's own first-CouncilStat description"], confidence: "high", renderCitation: true }],
      boundaries: [],
      antiClaims: ["first civic-data hackathon", "first civic-tech hackathon", "the Council's first hackathon of any kind"],
      researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-EVENT-BRANDING",
      project: "callnyc",
      internalClaim: "The surviving promotional graphic uses the branding 'New York City Council Hackathon.'",
      status: "confirmed-with-boundary",
      projections: [{ key: "case-study", text: "The surviving promotional graphic uses the branding 'New York City Council Hackathon.'", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC", relationship: "direct-support", supports: ["graphic wording", "event branding"], confidence: "high", renderCitation: true }],
      boundaries: ["Treat the wording as visible branding, not proof of a longer formal registration title."],
      antiClaims: [], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
      project: "callnyc",
      internalClaim: "After the fuller CouncilStat dataset was released, Jamie independently built CallNYC as a public-facing interpretation of those constituent-services records.",
      status: "confirmed-with-boundary",
      projections: [
        { key: "case-study", text: "After the fuller CouncilStat dataset was released, Jamie developed CallNYC.org as an independent public-facing interpretation of those constituent-services records.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] },
        { key: "work-card", text: "Built an independent civic-data follow-on translating CouncilStat constituent-services records into resident-facing issue pathways and next-step guidance.", status: "active", citationRequired: false, surfaces: ["/work", "/work/callnyc"] },
        { key: "resume-html", text: "Built CallNYC.org as an independent follow-on to the New York City Council's first CouncilStat hackathon, translating constituent-services data into resident-facing issue pages and next-step guidance; covered in Politico New York.", status: "active", citationRequired: false, surfaces: ["/resume"] }
      ],
      evidence: [
        { sourceId: "SRC-CALLNYC-POLITICO-2016-03-14", relationship: "direct-support", supports: ["sequence from the January event through the fuller data release", "Jamie's independent development and iteration", "Politico coverage"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-GITHUB-REPOSITORY", relationship: "corroborating", supports: ["surviving implementation of the independent prototype"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["CallNYC was an independent follow-on, not an official Council product, documented formal submission, or winner."],
      antiClaims: ["Jamie caused the CouncilStat release", "CallNYC was commissioned by the Council", "CallNYC was a winning hackathon submission"],
      researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS",
      project: "callnyc",
      internalClaim: "CallNYC is an archived independent civic-data prototype, not an official or current New York City Council service.",
      status: "confirmed-with-boundary",
      projections: [{ key: "case-study", text: "CallNYC is an archived independent prototype, not an official or current New York City Council service.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [
        { sourceId: "SRC-CALLNYC-GITHUB-REPOSITORY", relationship: "direct-support", supports: ["surviving independent implementation"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-POLITICO-2016-03-14", relationship: "context", supports: ["contemporaneous independent-project framing"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["Historical officeholders, statistics, categories, and contact information are not current guidance."],
      antiClaims: [], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-DIGITAL-DISTRICT",
      project: "callnyc",
      internalClaim: "A participant photograph documents a breakout table labeled 'Digital District - Help improve City Council District office operations.'",
      status: "use-with-care",
      projections: [{ key: "photo-caption", text: "Participant photograph documenting the Digital District breakout table.", status: "hold", citationRequired: true, surfaces: [] }],
      evidence: [{ sourceId: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO", relationship: "private-support", supports: ["placard wording", "breakout-table context"], confidence: "high", renderCitation: false }],
      boundaries: ["Do not describe Digital District as the official event title.", "Do not publish the photograph before rights, consent, and editorial review."],
      antiClaims: [], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-CIVIC-HALL-PAGE-NOT-RECOVERED",
      project: "callnyc",
      internalClaim: "No Civic Hall calendar listing or dedicated event-detail page was recovered in the documented Wayback/CDX review.",
      status: "not-recovered",
      projections: [{ key: "archive-note", text: "No Civic Hall calendar listing or dedicated event-detail page has been recovered in the documented Wayback/CDX review.", status: "active", citationRequired: false, surfaces: ["docs/knowledge-bank/projects/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-CIVIC-HALL-RESEARCH-2026", relationship: "direct-support", supports: ["bounded negative search finding"], confidence: "high", renderCitation: false }],
      boundaries: ["Negative search is not proof of nonexistence.", "The archived Civic Hall page preserves embedded social-feed evidence, not a recovered event listing."],
      antiClaims: ["No Civic Hall event page existed."],
      researchInquiryIds: ["INQ-CALLNYC-CIVIC-HALL-PAGE-2026"], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    ...evidenceBatchRecords.claims,
    ...strengtheningBatchRecords.claims,
    ...campaignPressBatchRecords.claims,
    ...kcTownHallCouncilBatchRecords.claims,
    ...archivalProductionBatchRecords.claims,
    ...sharedDriveArchivalBatchRecords.claims,
    ...socialArchiveBatchRecords.claims,
    ...socialAuthenticatedBatchRecords.claims,
    ...callnycPopulationBatchRecords.claims,
    ...wowlistPopulationBatchRecords.claims,
    ...kctownhallPopulationBatchRecords.claims,
    ...nycartcPopulationBatchRecords.claims,
    ...urbanhermitPopulationBatchRecords.claims,
    ...nycartcFacebookEventsBatchRecords.claims,
    ...facebookEventSurfacesBatchRecords.claims
  ],
  researchInquiries: [{
    id: "INQ-CALLNYC-CIVIC-HALL-PAGE-2026",
    project: "callnyc",
    question: "Can a dedicated Civic Hall calendar listing or event-detail page for the January 30, 2016, CouncilStat hackathon be recovered from the searched Wayback/CDX corpus?",
    methods: ["Reviewed 4,630 deduplicated HTML captures and 1,240 original URLs.", "Grouped 296 distinct event-prefix URL keys and inspected 215 successful event pages, 74 redirects, and 7 captured 404s.", "Searched event-like captures for CouncilStat, constituent services, and New York City Council references."],
    runAt: "2026-07-11",
    resultStatus: "not-recovered",
    findings: ["No CouncilStat, constituent-services, or NYC Council event slug was recovered.", "No dedicated Civic Hall event page or calendar listing was recovered.", "The archived Civic Hall page preserves embedded social-feed evidence supporting date, time, venue, branding, CouncilStat context, and constituent-services purpose."],
    limitations: ["Negative search is not proof of nonexistence.", "Google Form contents were not recovered.", "The agenda, breakout roster, and registration contents were not recovered."],
    sourceIds: ["SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368", "SRC-CALLNYC-CIVIC-HALL-RESEARCH-2026"],
    publicSummary: "A review of 4,630 deduplicated HTML captures, 1,240 original URLs, and 296 distinct event-prefix keys recovered embedded social-feed evidence but no dedicated Civic Hall listing or event-detail page.",
    protectedLocatorId: "RESEARCH-CALLNYC-CIVIC-HALL-CDX-2026-001"
  }, ...evidenceBatchRecords.researchInquiries, ...strengtheningBatchRecords.researchInquiries, ...campaignPressBatchRecords.researchInquiries, ...kcTownHallCouncilBatchRecords.researchInquiries, ...archivalProductionBatchRecords.researchInquiries, ...sharedDriveArchivalBatchRecords.researchInquiries, ...socialArchiveBatchRecords.researchInquiries, ...callnycPopulationBatchRecords.researchInquiries, ...wowlistPopulationBatchRecords.researchInquiries, ...kctownhallPopulationBatchRecords.researchInquiries, ...nycartcPopulationBatchRecords.researchInquiries, ...urbanhermitPopulationBatchRecords.researchInquiries, ...nycartcFacebookEventsBatchRecords.researchInquiries, ...facebookEventSurfacesBatchRecords.researchInquiries],
  corrections: [
    { id: "COR-CALLNYC-CHRONOLOGY-2026", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", previousText: "2014-2015", replacementText: "2016", reason: "Recovered event, data-release, and press chronology places the project in 2016.", decidedAt: "2026-07-11", affectedSurfaces: ["/work", "/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-SUPERLATIVE-2026", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", previousText: "first civic-data hackathon", replacementText: "first CouncilStat hackathon", reason: "The event-day Council post supports only the narrower phrase.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-EVENT-TIME-2026", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", previousText: "approximately 2:10 p.m. photograph timestamp as event time", replacementText: "1-3 p.m. from the Civic Hall announcement", reason: "Direct event-announcement evidence is stronger than participant photograph metadata for public event hours.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank"], status: "active" }
  ],
  pages: [{
    id: "callnyc",
    surface: "/work/callnyc",
    sourceOrder: [
      "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
      "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
      "SRC-CALLNYC-POLITICO-2016-03-14",
      "SRC-CALLNYC-GITHUB-REPOSITORY",
      "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC"
    ],
    occurrences: [
      { id: "event-date-time", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", projection: "case-study", sourceIds: ["SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
      { id: "first-councilstat-hackathon", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
      { id: "independent-follow-on", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"] },
      { id: "event-branding", claimId: "CLM-CALLNYC-EVENT-BRANDING", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC"] },
      { id: "press-coverage", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14"] },
      { id: "archived-status", claimId: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS", projection: "case-study", sourceIds: ["SRC-CALLNYC-GITHUB-REPOSITORY", "SRC-CALLNYC-POLITICO-2016-03-14"] }
    ]
  }, ...evidenceBatchRecords.pages, ...strengtheningBatchRecords.pages, ...campaignPressBatchRecords.pages, ...kcTownHallCouncilBatchRecords.pages],
  pressCollections: campaignPressBatchRecords.pressCollections
} satisfies KnowledgeBank;

export const knowledgeBank = knowledgeBankSchema.parse(knowledgeBankInput);
