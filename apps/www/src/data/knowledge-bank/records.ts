import { historicalKnowledge } from "./historical-knowledge.ts";
import { googleDriveSharedDrivesProduction } from "./google-drive-shared-drives-production.ts";
import { kcTownHallFunding } from "./kc-town-hall-funding.ts";
import { nycacPressArchive } from "./nycac-press-archive.ts";
import { nycacSourceExpansion } from "./nycac-source-expansion.ts";
import { proofCoverageTargets } from "./proof-coverage.ts";
import { knowledgeBankSchema } from "./schema.ts";
import { teamsArchiveProduction } from "./teams-archive-production.ts";

const knowledgeBankInput = {
  intakeItems: [
    {
      id: "INTAKE-CALLNYC-DIGITAL-DISTRICT-PHOTO",
      kind: "photo-lead",
      title: "Digital District participant photograph lead",
      submittedAt: "2026-07-12",
      submittedBy: "Jamie Burkart and photo-editor review",
      projectIds: ["callnyc"],
      reason: "Preserve a visual lead whose placard text may clarify the hackathon's breakout structure without treating the photograph as self-interpreting or cleared for publication.",
      visibility: "protected",
      disposition: "protected",
      sourceIds: ["SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO"],
      observationIds: ["OBS-CALLNYC-DIGITAL-DISTRICT-PLACARD"],
      researchInquiryIds: ["INQ-CALLNYC-DIGITAL-DISTRICT-PHOTO"],
      boundaries: [
        "Retain only public-safe visual metadata in the repository; the image, identities, and private locator stay outside the public web bundle.",
        "Publication requires separate photographer, rights, represented-people, crop, and editorial review."
      ]
    },
    ...historicalKnowledge.intakeItems,
    ...googleDriveSharedDrivesProduction.intakeItems,
    ...teamsArchiveProduction.intakeItems,
    ...kcTownHallFunding.intakeItems,
    ...nycacSourceExpansion.intakeItems,
    ...nycacPressArchive.intakeItems
  ],
  observations: [
    {
      id: "OBS-CALLNYC-DIGITAL-DISTRICT-PLACARD",
      intakeId: "INTAKE-CALLNYC-DIGITAL-DISTRICT-PHOTO",
      sourceId: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO",
      project: "callnyc",
      kind: "visual-observation",
      text: "A visible placard reads 'Digital District - Help improve City Council District office operations' in a collaborative breakout-table setting.",
      locator: "Protected participant photograph; placard area only.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-CALLNYC-DIGITAL-DISTRICT"],
      researchInquiryIds: ["INQ-CALLNYC-DIGITAL-DISTRICT-PHOTO"],
      limitations: [
        "The image does not establish the full event title, facilitator, agenda, participant identities, or consent to publish.",
        "The approximate timestamp is not used to establish event hours."
      ]
    },
    ...historicalKnowledge.observations,
    ...googleDriveSharedDrivesProduction.observations,
    ...teamsArchiveProduction.observations,
    ...kcTownHallFunding.observations,
    ...nycacSourceExpansion.observations,
    ...nycacPressArchive.observations
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
      id: "SRC-CALLNYC-PROJECT-MARK",
      title: "CallNYC project mark",
      organization: "CallNYC",
      kind: "promotional-graphic",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://github.com/openhouse/CallNYC/blob/main/android-icon-192x192.png",
      assetUrl: "https://raw.githubusercontent.com/openhouse/CallNYC/main/android-icon-192x192.png",
      preferredPublicUrl: "canonical",
      publicCitation: "CallNYC project mark preserved in the public source repository.",
      publicNote: "The mark documents the independent prototype's public identity. It does not establish official New York City Council affiliation or current-service status.",
      supportsGenerally: ["CallNYC project identity", "visible CALL NYC wording"],
      doesNotEstablish: ["official New York City Council ownership", "official affiliation", "formal submission status", "current resident-service status"],
      media: {
        mediaKind: "graphic",
        rightsStatus: "cleared",
        consentStatus: "not-applicable",
        publicDisplayStatus: "cleared",
        visibleText: ["CALL NYC"]
      }
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
    ...historicalKnowledge.sources,
    ...googleDriveSharedDrivesProduction.sources,
    ...teamsArchiveProduction.sources,
    ...kcTownHallFunding.sources,
    ...nycacSourceExpansion.sources,
    ...nycacPressArchive.sources
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
      id: "CLM-CALLNYC-PROJECT-MARK",
      project: "callnyc",
      internalClaim: "The public CallNYC source repository preserves a black-and-white project mark reading 'CALL NYC.'",
      status: "confirmed-with-boundary",
      projections: [{ key: "photo-caption", text: "The public source repository preserves this project mark from the archived CallNYC prototype.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-PROJECT-MARK", relationship: "direct-support", supports: ["visible project mark", "CALL NYC wording", "public repository preservation"], confidence: "high", renderCitation: true }],
      boundaries: ["Describe this as the independent prototype's project mark, not evidence of Council ownership or affiliation."],
      antiClaims: ["official New York City Council mark", "proof of Council ownership", "proof of current-service status"],
      researchInquiryIds: [], reviewedAt: "2026-07-12", reviewedBy: ["Jamie Burkart", "Codex public-safety review"]
    },
    {
      id: "CLM-CALLNYC-DIGITAL-DISTRICT",
      project: "callnyc",
      internalClaim: "A participant photograph documents a breakout table labeled 'Digital District - Help improve City Council District office operations.'",
      status: "use-with-care",
      projections: [{ key: "photo-caption", text: "Participant photograph documenting the Digital District breakout table.", status: "hold", citationRequired: true, surfaces: [] }],
      evidence: [{ sourceId: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO", relationship: "private-support", supports: ["placard wording", "breakout-table context"], confidence: "high", renderCitation: false }],
      boundaries: ["Do not describe Digital District as the official event title.", "Do not publish the photograph before rights, consent, and editorial review."],
      antiClaims: ["The photograph identifies a facilitator.", "The photograph establishes participant consent.", "Digital District was the formal event title."], researchInquiryIds: ["INQ-CALLNYC-DIGITAL-DISTRICT-PHOTO"], reviewedAt: "2026-07-12", reviewedBy: ["Jamie Burkart", "Codex archival review", "photo-editor feedback review"]
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
    ...historicalKnowledge.claims,
    ...googleDriveSharedDrivesProduction.claims,
    ...teamsArchiveProduction.claims,
    ...kcTownHallFunding.claims,
    ...nycacSourceExpansion.claims,
    ...nycacPressArchive.claims
  ],
  researchInquiries: [
    {
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
    },
    {
      id: "INQ-CALLNYC-DIGITAL-DISTRICT-PHOTO",
      project: "callnyc",
      question: "What public-safe context can be established from the Digital District photograph, and what rights, consent, and corroboration are required before any public use?",
      methods: [
        "Recorded only visible placard wording and generic breakout-table context.",
        "Separated direct visual observation from inferred identities, roles, agenda, and event hours.",
        "Compared the possible claim against the existing CallNYC chronology while preserving a publication hold."
      ],
      runAt: "2026-07-12",
      resultStatus: "partially-recovered",
      findings: [
        "The placard wording and collaborative breakout setting are visually recoverable.",
        "The photograph is not cleared for public display and cannot establish identities, facilitation, consent, or a complete agenda."
      ],
      limitations: [
        "Photographer and rights-holder approval are unresolved.",
        "Represented people and any appropriate crop require consent review.",
        "A photograph is evidence of what is visibly present, not a complete account of the event."
      ],
      sourceIds: ["SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO"],
      publicSummary: "A protected participant photograph preserves the visible Digital District breakout wording; public display remains on hold pending rights, consent, and editorial review.",
      protectedLocatorId: "PHOTO-CALLNYC-DIGITAL-DISTRICT-2016-001"
    },
    ...historicalKnowledge.researchInquiries,
    ...googleDriveSharedDrivesProduction.researchInquiries,
    ...teamsArchiveProduction.researchInquiries,
    ...kcTownHallFunding.researchInquiries,
    ...nycacSourceExpansion.researchInquiries,
    ...nycacPressArchive.researchInquiries
  ],
  proofCoverageTargets: [...proofCoverageTargets],
  corrections: [
    { id: "COR-CALLNYC-CHRONOLOGY-2026", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", previousText: "2014-2015", replacementText: "2016", reason: "Recovered event, data-release, and press chronology places the project in 2016.", decidedAt: "2026-07-11", affectedSurfaces: ["/work", "/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-SUPERLATIVE-2026", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", previousText: "first civic-data hackathon", replacementText: "first CouncilStat hackathon", reason: "The event-day Council post supports only the narrower phrase.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-EVENT-TIME-2026", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", previousText: "approximately 2:10 p.m. photograph timestamp as event time", replacementText: "1-3 p.m. from the Civic Hall announcement", reason: "Direct event-announcement evidence is stronger than participant photograph metadata for public event hours.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank"], status: "active" },
    ...kcTownHallFunding.corrections
  ],
  pages: [{
    id: "callnyc",
    surface: "/work/callnyc",
    sourceOrder: [
      "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
      "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
      "SRC-CALLNYC-POLITICO-2016-03-14",
      "SRC-CALLNYC-GITHUB-REPOSITORY",
      "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC",
      "SRC-CALLNYC-PROJECT-MARK",
      "SRC-CALLNYC-SCHOOL-OF-DATA-2016-03-08"
    ],
    occurrences: [
      { id: "event-date-time", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", projection: "case-study", sourceIds: ["SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
      { id: "first-councilstat-hackathon", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
      { id: "independent-follow-on", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"] },
      { id: "event-branding", claimId: "CLM-CALLNYC-EVENT-BRANDING", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC"] },
      { id: "project-mark", claimId: "CLM-CALLNYC-PROJECT-MARK", projection: "photo-caption", sourceIds: ["SRC-CALLNYC-PROJECT-MARK"] },
      { id: "press-coverage", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14"] },
      { id: "school-of-data-feature", claimId: "CLM-CALLNYC-SCHOOL-OF-DATA-FEATURE", projection: "case-study", sourceIds: ["SRC-CALLNYC-SCHOOL-OF-DATA-2016-03-08"] },
      { id: "archived-status", claimId: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS", projection: "case-study", sourceIds: ["SRC-CALLNYC-GITHUB-REPOSITORY", "SRC-CALLNYC-POLITICO-2016-03-14"] }
    ]
  }, {
    id: "fair-rent-nyc",
    surface: "/work/fair-rent-nyc",
    sourceOrder: [
      "SRC-NYCAC-GOTHAMIST-CABARET-2017-06-19",
      "SRC-NYCAC-NPR-CABARET-2017-09-20",
      "SRC-NYCAC-BEDFORD-DIY-SPACES-2017-02-07",
      "SRC-NYCAC-SUPPORTERS-LIST",
      "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12",
      "SRC-NYCAC-GREENE-HILL-QA-2017-12-19",
      "SRC-NYC-SBJSA-HEARING-2018-10-22"
    ],
    occurrences: [
      { id: "cabaret-safety-organizing", claimId: "CLM-NYCAC-CABARET-SAFETY-ORGANIZING", projection: "case-study", sourceIds: ["SRC-NYCAC-GOTHAMIST-CABARET-2017-06-19"] },
      { id: "founder-operating-role", claimId: "CLM-NYCAC-FOUNDER-AND-OPERATING-ROLE", projection: "case-study", sourceIds: ["SRC-NYCAC-NPR-CABARET-2017-09-20", "SRC-NYCAC-BEDFORD-DIY-SPACES-2017-02-07", "SRC-NYCAC-SUPPORTERS-LIST"] },
      { id: "nightlife-town-hall", claimId: "CLM-NYCAC-NIGHTLIFE-TOWN-HALL-2017", projection: "case-study", sourceIds: ["SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12", "SRC-NYCAC-GREENE-HILL-QA-2017-12-19"] },
      { id: "sbjsa-testimony", claimId: "CLM-NYCAC-SBJSA-TESTIMONY-2018", projection: "case-study", sourceIds: ["SRC-NYC-SBJSA-HEARING-2018-10-22"] }
    ]
  }, kcTownHallFunding.page]
};

export const knowledgeBank = knowledgeBankSchema.parse(knowledgeBankInput);
