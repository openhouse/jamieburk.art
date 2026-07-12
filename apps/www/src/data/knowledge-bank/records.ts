import { knowledgeBankSchema, type KnowledgeBankInput } from "./schema.ts";
import {
  lifecycleClaims,
  lifecycleEntities,
  lifecycleIntake,
  lifecycleProjectionDecisions,
  lifecycleResearchTasks,
  lifecycleSourceReadings,
  lifecycleSources
} from "./lifecycle-records.ts";

const knowledgeBankInput = {
  entities: lifecycleEntities,
  intake: lifecycleIntake,
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
      intakeIds: ["INTAKE-MIGRATION-CALLNYC-PUBLIC-CORPUS"],
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
      intakeIds: ["INTAKE-CALLNYC-SUPERLATIVE-CORRECTION"],
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
      intakeIds: ["INTAKE-MIGRATION-CALLNYC-PUBLIC-CORPUS"],
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
      intakeIds: ["INTAKE-CALLNYC-DIGITAL-DISTRICT-PHOTO"],
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
      intakeIds: ["INTAKE-MIGRATION-CALLNYC-PUBLIC-CORPUS"],
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
      intakeIds: ["INTAKE-MIGRATION-CALLNYC-PUBLIC-CORPUS"],
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
      intakeIds: ["INTAKE-MIGRATION-CALLNYC-RESEARCH"],
      protectedLocatorId: "RESEARCH-CALLNYC-CIVIC-HALL-CDX-2026-001",
      supportsGenerally: ["bounded negative search finding", "research method and limitations"],
      doesNotEstablish: ["that no event page ever existed"]
    },
    {
      id: "SRC-HJE-PUBLIC-STOREFRONT-2026",
      title: "Harry J. Epstein Company public storefront",
      organization: "Harry J. Epstein Company",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.harryepstein.com/",
      preferredPublicUrl: "canonical",
      publicCitation: "Harry J. Epstein Company's public e-commerce storefront.",
      publicNote: "The public surface documents customer-facing navigation, search, product content, checkout access, and the company's distinctive editorial voice.",
      intakeIds: ["INTAKE-MIGRATION-HJE-PUBLIC-CLAIMS"],
      supportsGenerally: ["public storefront features", "customer-facing e-commerce surface", "company voice"],
      doesNotEstablish: ["Jamie's role", "revenue growth", "internal systems", "causal business outcomes"]
    },
    {
      id: "SRC-HJE-PUBLIC-RESUME-2026-07-11",
      title: "Jamie Burkart public resume - selected impact",
      organization: "Jamie Burkart",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-07-11",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
      preferredPublicUrl: "canonical",
      publicCitation: "Jamie Burkart, public resume, selected-impact entry for Harry J. Epstein Company, July 11, 2026.",
      publicNote: "The public resume supports Jamie's approved contribution wording. The underlying business figures remain private and are not presented as audited financial disclosure.",
      intakeIds: ["INTAKE-MIGRATION-HJE-PUBLIC-CLAIMS"],
      supportsGenerally: ["Jamie's HJE improvement areas", "contribution to 2x revenue growth", "legacy e-commerce context"],
      doesNotEstablish: ["sole causality", "audited financial results", "the underlying revenue figures", "ownership of all business growth"]
    },
    {
      id: "SRC-FAIRRENTNYC-PUBLIC-SITE-2026",
      title: "FairRentNYC public campaign site",
      organization: "NYC Artist Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://fairrentnyc.nycartc.com/",
      preferredPublicUrl: "canonical",
      publicCitation: "FairRentNYC public campaign site.",
      publicNote: "The public surface connects a Commercial Rent Stabilization call to action with a reference-library pathway.",
      intakeIds: ["INTAKE-MIGRATION-FAIRRENT-PUBLIC-CLAIM"],
      supportsGenerally: ["campaign identity", "Commercial Rent Stabilization call to action", "public reference-library pathway"],
      doesNotEstablish: ["Jamie's co-founder role", "Jamie's authorship", "shared-memory page counts", "policy outcomes"]
    },
    {
      id: "SRC-WOWLIST-WAYBACK-2016-02-12",
      title: "WOWList archived public application surface",
      organization: "WOWList",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      capturedAt: "2016-02-12T01:12:39Z",
      accessedAt: "2026-07-12",
      archiveUrl: "https://web.archive.org/web/20160212011239/https://wowlist.org/",
      preferredPublicUrl: "archive",
      publicCitation: "February 12, 2016, Wayback capture of the WOWList public application.",
      publicNote: "The capture identifies WOWList as an event-sharing and community-building project and preserves Ember application metadata plus a configured application-programming-interface endpoint.",
      intakeIds: ["INTAKE-MIGRATION-WOWLIST-PUBLIC-CLAIM"],
      supportsGenerally: ["event-sharing purpose", "community-building purpose", "Ember application surface", "configured API endpoint"],
      doesNotEstablish: ["user totals", "event totals", "city-ecosystem adoption", "Jamie's role", "current service availability"]
    },
    ...lifecycleSources
  ],
  claims: [
    {
      id: "CLM-CALLNYC-HACKATHON-DATE-TIME",
      project: "callnyc",
      internalClaim: "The New York City Council constituent-services hackathon took place at Civic Hall on January 30, 2016, from 1-3 p.m.",
      status: "confirmed",
      maturity: "projected",
      intakeIds: ["INTAKE-MIGRATION-CALLNYC-PUBLIC-CORPUS"],
      projections: [{ key: "case-study", text: "On January 30, 2016, the New York City Council held a 1-3 p.m. hackathon at Civic Hall focused on constituent services.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [
        { sourceId: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", relationship: "direct-support", supports: ["date", "time", "Council event", "constituent-services purpose"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368", relationship: "corroborating", supports: ["date", "venue", "CouncilStat context"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["Do not describe the Wayback page as a recovered event calendar listing."],
      antiClaims: ["The participant photograph timestamp establishes the event hours."], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON",
      project: "callnyc",
      internalClaim: "The New York City Council described the gathering as its first CouncilStat hackathon.",
      status: "confirmed-with-boundary",
      maturity: "projected",
      intakeIds: ["INTAKE-CALLNYC-SUPERLATIVE-CORRECTION"],
      requiredSupportTags: ["first-councilstat-wording"],
      projections: [{ key: "case-study", text: "The Council described the gathering as its first CouncilStat hackathon.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368", relationship: "direct-support", supports: ["the Council's own first-CouncilStat description"], propositionIds: ["PROP-CALLNYC-FIRST-COUNCILSTAT"], confidence: "high", renderCitation: true }],
      boundaries: ["Use the Council's narrower first-CouncilStat wording rather than a broader historical superlative."],
      antiClaims: ["first civic-data hackathon", "first civic-tech hackathon", "the Council's first hackathon of any kind"],
      disposition: { reason: "This claim supersedes a broader unsupported superlative.", predecessorClaimIds: ["CLM-CALLNYC-FIRST-CIVIC-DATA-HACKATHON-SUPERSEDED"], successorClaimIds: [], decidedAt: "2026-07-11" },
      researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-EVENT-BRANDING",
      project: "callnyc",
      internalClaim: "The surviving promotional graphic uses the branding 'New York City Council Hackathon.'",
      status: "confirmed-with-boundary",
      maturity: "projected",
      intakeIds: ["INTAKE-MIGRATION-CALLNYC-PUBLIC-CORPUS"],
      projections: [{ key: "case-study", text: "The surviving promotional graphic uses the branding 'New York City Council Hackathon.'", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC", relationship: "direct-support", supports: ["graphic wording", "event branding"], confidence: "high", renderCitation: true }],
      boundaries: ["Treat the wording as visible branding, not proof of a longer formal registration title."],
      antiClaims: ["The graphic establishes a complete formal registration title."], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
      project: "callnyc",
      internalClaim: "After the fuller CouncilStat dataset was released, Jamie independently built CallNYC as a public-facing interpretation of those constituent-services records.",
      status: "confirmed-with-boundary",
      maturity: "projected",
      intakeIds: ["INTAKE-MIGRATION-CALLNYC-PUBLIC-CORPUS"],
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
      maturity: "projected",
      intakeIds: ["INTAKE-MIGRATION-CALLNYC-PUBLIC-CORPUS"],
      projections: [{ key: "case-study", text: "CallNYC is an archived independent prototype, not an official or current New York City Council service.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [
        { sourceId: "SRC-CALLNYC-GITHUB-REPOSITORY", relationship: "direct-support", supports: ["surviving independent implementation"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-POLITICO-2016-03-14", relationship: "context", supports: ["contemporaneous independent-project framing"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["Historical officeholders, statistics, categories, and contact information are not current guidance."],
      antiClaims: ["CallNYC is a current or official New York City Council service."], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-DIGITAL-DISTRICT",
      project: "callnyc",
      internalClaim: "A participant photograph documents a breakout table labeled 'Digital District - Help improve City Council District office operations.'",
      status: "use-with-care",
      maturity: "corroborated",
      intakeIds: ["INTAKE-CALLNYC-DIGITAL-DISTRICT-PHOTO"],
      requiredSupportTags: ["digital-district-placard"],
      projections: [{ key: "photo-caption", text: "Participant photograph documenting the Digital District breakout table.", status: "hold", citationRequired: true, surfaces: [] }],
      evidence: [{ sourceId: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO", relationship: "private-support", supports: ["placard wording", "breakout-table context"], propositionIds: ["PROP-CALLNYC-DIGITAL-DISTRICT-PLACARD"], confidence: "high", renderCitation: false }],
      boundaries: ["Do not describe Digital District as the official event title.", "Do not publish the photograph before rights, consent, and editorial review."],
      antiClaims: ["Digital District was the title of the overall event.", "The private photograph is cleared for public display."], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-CIVIC-HALL-PAGE-NOT-RECOVERED",
      project: "callnyc",
      internalClaim: "No Civic Hall calendar listing or dedicated event-detail page was recovered in the documented Wayback/CDX review.",
      status: "not-recovered",
      maturity: "projected",
      intakeIds: ["INTAKE-MIGRATION-CALLNYC-RESEARCH"],
      projections: [{ key: "archive-note", text: "No Civic Hall calendar listing or dedicated event-detail page has been recovered in the documented Wayback/CDX review.", status: "active", citationRequired: false, surfaces: ["docs/knowledge-bank/projects/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-CIVIC-HALL-RESEARCH-2026", relationship: "direct-support", supports: ["bounded negative search finding"], confidence: "high", renderCitation: false }],
      boundaries: ["Negative search is not proof of nonexistence.", "The archived Civic Hall page preserves embedded social-feed evidence, not a recovered event listing."],
      antiClaims: ["No Civic Hall event page existed."],
      researchInquiryIds: ["INQ-CALLNYC-CIVIC-HALL-PAGE-2026"], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-HJE-PUBLIC-ECOMMERCE-SURFACE",
      project: "harry-j-epstein",
      internalClaim: "The current Harry J. Epstein Company storefront presents a customer-facing e-commerce system with product navigation, search, product content, checkout access, and a distinctive editorial voice.",
      status: "confirmed-with-boundary",
      maturity: "projected",
      intakeIds: ["INTAKE-MIGRATION-HJE-PUBLIC-CLAIMS"],
      projections: [{ key: "case-study", text: "The current public storefront combines tool-type and brand navigation, search, product content, checkout access, and the company's distinctive public voice.", status: "active", citationRequired: true, surfaces: ["/work/harry-j-epstein"] }],
      evidence: [{ sourceId: "SRC-HJE-PUBLIC-STOREFRONT-2026", relationship: "direct-support", supports: ["public storefront features", "customer-facing e-commerce surface", "company voice"], confidence: "high", renderCitation: true }],
      boundaries: ["The public storefront documents the customer-facing surface, not Jamie's role, internal systems, revenue growth, or causal business outcomes."],
      antiClaims: ["The public storefront alone proves Jamie caused revenue growth."],
      researchInquiryIds: [], reviewedAt: "2026-07-12", reviewedBy: ["Jamie Burkart", "Codex public-source review"]
    },
    {
      id: "CLM-HJE-REVENUE-GROWTH-CONTRIBUTION",
      project: "harry-j-epstein",
      internalClaim: "Jamie's web, e-commerce, marketing, analytics, and operations improvements contributed to a period of 2x revenue growth at Harry J. Epstein Company.",
      status: "confirmed-with-boundary",
      maturity: "projected",
      intakeIds: ["INTAKE-MIGRATION-HJE-PUBLIC-CLAIMS"],
      projections: [{ key: "case-study", text: "Jamie's web, e-commerce, marketing, analytics, and operations improvements contributed to a period of 2x revenue growth.", status: "active", citationRequired: true, surfaces: ["/work/harry-j-epstein"] }],
      evidence: [{ sourceId: "SRC-HJE-PUBLIC-RESUME-2026-07-11", relationship: "direct-support", supports: ["Jamie's HJE improvement areas", "contribution to 2x revenue growth", "legacy e-commerce context"], confidence: "high", renderCitation: true }],
      boundaries: ["Treat this as approved contribution language, not sole causality or audited public financial disclosure; underlying figures remain private."],
      antiClaims: ["Jamie caused all revenue growth.", "The portfolio publishes audited revenue figures.", "Jamie solely owned the business outcome."],
      researchInquiryIds: [], reviewedAt: "2026-07-12", reviewedBy: ["Jamie Burkart", "Codex public-source review"]
    },
    {
      id: "CLM-FAIRRENTNYC-PUBLIC-CAMPAIGN-SURFACE",
      project: "fair-rent-nyc",
      internalClaim: "FairRentNYC's public campaign surface joins a Commercial Rent Stabilization call to action with a public reference-library pathway.",
      status: "confirmed-with-boundary",
      maturity: "projected",
      intakeIds: ["INTAKE-MIGRATION-FAIRRENT-PUBLIC-CLAIM"],
      projections: [{ key: "case-study", text: "FairRentNYC's public site connects a Commercial Rent Stabilization call to action with a public reference-library pathway.", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"] }],
      evidence: [{ sourceId: "SRC-FAIRRENTNYC-PUBLIC-SITE-2026", relationship: "direct-support", supports: ["campaign identity", "Commercial Rent Stabilization call to action", "public reference-library pathway"], confidence: "high", renderCitation: true }],
      boundaries: ["The public site documents the campaign surface, not individual authorship, coalition roles, private documentation volume, or policy outcomes."],
      antiClaims: ["The public site alone proves Jamie caused a policy outcome."],
      researchInquiryIds: [], reviewedAt: "2026-07-12", reviewedBy: ["Jamie Burkart", "Codex public-source review"]
    },
    {
      id: "CLM-WOWLIST-ARCHIVED-PUBLIC-SURFACE",
      project: "wowlist",
      internalClaim: "A February 2016 capture preserves WOWList's public event-sharing application, community-building description, Ember application metadata, and configured API endpoint.",
      status: "confirmed-with-boundary",
      maturity: "projected",
      intakeIds: ["INTAKE-MIGRATION-WOWLIST-PUBLIC-CLAIM"],
      projections: [{ key: "case-study", text: "A February 2016 capture preserves WOWList as a public event-sharing and community-building application, with Ember application metadata and a configured API endpoint.", status: "active", citationRequired: true, surfaces: ["/work/wowlist"] }],
      evidence: [{ sourceId: "SRC-WOWLIST-WAYBACK-2016-02-12", relationship: "direct-support", supports: ["event-sharing purpose", "community-building purpose", "Ember application surface", "configured API endpoint"], confidence: "high", renderCitation: true }],
      boundaries: ["The archived application shell does not establish user totals, event totals, geographic adoption, Jamie's role, or current availability."],
      antiClaims: ["The archived application shell proves the portfolio's scale or adoption claims."],
      researchInquiryIds: [], reviewedAt: "2026-07-12", reviewedBy: ["Jamie Burkart", "Codex public-source review"]
    },
    ...lifecycleClaims
  ],
  sourceReadings: lifecycleSourceReadings,
  researchTasks: lifecycleResearchTasks,
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
  }],
  projectionDecisions: lifecycleProjectionDecisions,
  corrections: [
    { id: "COR-CALLNYC-CHRONOLOGY-2026", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", previousText: "2014-2015", replacementText: "2016", reason: "Recovered event, data-release, and press chronology places the project in 2016.", decidedAt: "2026-07-11", affectedSurfaces: ["/work", "/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-SUPERLATIVE-2026", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", previousText: "first civic-data hackathon", replacementText: "first CouncilStat hackathon", reason: "The event-day Council post supports only the narrower phrase.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank", "resume"], status: "active", intakeIds: ["INTAKE-CALLNYC-SUPERLATIVE-CORRECTION"] },
    { id: "COR-CALLNYC-EVENT-TIME-2026", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", previousText: "approximately 2:10 p.m. photograph timestamp as event time", replacementText: "1-3 p.m. from the Civic Hall announcement", reason: "Direct event-announcement evidence is stronger than participant photograph metadata for public event hours.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank"], status: "active" }
  ],
  pages: [
    {
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
    },
    {
      id: "harry-j-epstein",
      surface: "/work/harry-j-epstein",
      sourceOrder: ["SRC-HJE-PUBLIC-STOREFRONT-2026", "SRC-HJE-PUBLIC-RESUME-2026-07-11"],
      occurrences: [
        { id: "public-storefront", claimId: "CLM-HJE-PUBLIC-ECOMMERCE-SURFACE", projection: "case-study", sourceIds: ["SRC-HJE-PUBLIC-STOREFRONT-2026"] },
        { id: "revenue-growth-contribution", claimId: "CLM-HJE-REVENUE-GROWTH-CONTRIBUTION", projection: "case-study", sourceIds: ["SRC-HJE-PUBLIC-RESUME-2026-07-11"] }
      ]
    },
    {
      id: "fair-rent-nyc",
      surface: "/work/fair-rent-nyc",
      sourceOrder: ["SRC-FAIRRENTNYC-PUBLIC-SITE-2026"],
      occurrences: [{ id: "public-campaign-surface", claimId: "CLM-FAIRRENTNYC-PUBLIC-CAMPAIGN-SURFACE", projection: "case-study", sourceIds: ["SRC-FAIRRENTNYC-PUBLIC-SITE-2026"] }]
    },
    {
      id: "wowlist",
      surface: "/work/wowlist",
      sourceOrder: ["SRC-WOWLIST-WAYBACK-2016-02-12"],
      occurrences: [{ id: "archived-public-surface", claimId: "CLM-WOWLIST-ARCHIVED-PUBLIC-SURFACE", projection: "case-study", sourceIds: ["SRC-WOWLIST-WAYBACK-2016-02-12"] }]
    }
  ]
} satisfies KnowledgeBankInput;

export const knowledgeBank = knowledgeBankSchema.parse(knowledgeBankInput);
