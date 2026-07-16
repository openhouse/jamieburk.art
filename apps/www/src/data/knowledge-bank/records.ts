import { knowledgeBankSchema, type KnowledgeBank } from "./schema.ts";
import {
  intakeClaimRecords,
  intakeRecords,
  intakeResearchInquiries,
  intakeSourceRecords
} from "./intake.ts";
import {
  researchedClaimRecords20260713,
  researchedIntakeRecords20260713,
  researchedSourceRecords20260713
} from "./intake-2026-07-13.ts";
import {
  campaignPressArticleSourceRecords,
  campaignPressClaimRecords,
  campaignPressIndexSourceRecords,
  campaignPressIntakeRecords,
  campaignPressPlacementRecords,
  campaignPressResearchInquiries
} from "./campaign-press-2026-07-14.ts";
import {
  archiveClaimRecords20260714,
  archiveIntakeRecords20260714,
  archiveResearchInquiries20260714,
  archiveSourceRecords20260714
} from "./archive-intake-2026-07-14.ts";
import {
  sharedDriveClaimRecords20260714,
  sharedDriveIntakeRecords20260714,
  sharedDriveResearchInquiries20260714,
  sharedDriveSourceRecords20260714
} from "./shared-drive-intake-2026-07-14.ts";
import {
  socialAccountRecords20260714,
  socialMediaClaimRecords20260714,
  socialMediaIntakeRecords20260714,
  socialMediaResearchInquiries20260714,
  socialMediaSourceRecords20260714
} from "./social-media-intake-2026-07-14.ts";
import {
  webArchiveClaimRecords20260715,
  webArchiveIntakeRecords20260715,
  webArchiveResearchInquiries20260715,
  webArchiveSourceRecords20260715
} from "./web-archive-intake-2026-07-15.ts";
import {
  kcTownHallFieldClaimRecords20260715,
  kcTownHallFieldIntakeRecords20260715,
  kcTownHallFieldResearchInquiries20260715,
  kcTownHallFieldSourceRecords20260715
} from "./kc-town-hall-field-intake-2026-07-15.ts";
import {
  wowListFullPopulationClaimRecords20260715,
  wowListFullPopulationIntakeRecords20260715,
  wowListFullPopulationResearchInquiries20260715,
  wowListFullPopulationSourceRecords20260715
} from "./wowlist-x-full-population-2026-07-15.ts";
import {
  kcTownHallFullPopulationClaimRecords20260715,
  kcTownHallFullPopulationIntakeRecords20260715,
  kcTownHallFullPopulationResearchInquiries20260715,
  kcTownHallFullPopulationSourceRecords20260715
} from "./kc-town-hall-x-full-population-2026-07-15.ts";
import {
  nycArtCXArchivalClaimRecords20260715,
  nycArtCXArchivalIntakeRecords20260715,
  nycArtCXArchivalResearchInquiries20260715,
  nycArtCXArchivalSourceRecords20260715
} from "./nycartc-x-archival-production-2026-07-15.ts";
import {
  urbanhermitFullPopulationClaimRecords20260715,
  urbanhermitFullPopulationIntakeRecords20260715,
  urbanhermitFullPopulationResearchInquiries20260715,
  urbanhermitFullPopulationSourceRecords20260715
} from "./urbanhermit-x-full-population-2026-07-15.ts";
import {
  nycacFacebookEventClaims,
  nycacFacebookEventInquiries,
  nycacFacebookEventIntake,
  nycacFacebookEventSources
} from "./nycac-facebook-events-full-population.ts";
import {
  facebookEventArchiveClaimRecords20260716,
  facebookEventArchiveIntakeRecords20260716,
  facebookEventArchiveResearchInquiries20260716,
  facebookEventArchiveSourceRecords20260716
} from "./facebook-events-archive-2026-07-16.ts";

const knowledgeBankInput = {
  intakes: [
    ...intakeRecords,
    ...researchedIntakeRecords20260713,
    ...campaignPressIntakeRecords,
    ...archiveIntakeRecords20260714,
    ...sharedDriveIntakeRecords20260714,
    ...socialMediaIntakeRecords20260714,
    ...webArchiveIntakeRecords20260715,
    ...kcTownHallFieldIntakeRecords20260715,
    ...wowListFullPopulationIntakeRecords20260715,
    ...kcTownHallFullPopulationIntakeRecords20260715,
    ...nycArtCXArchivalIntakeRecords20260715,
    ...urbanhermitFullPopulationIntakeRecords20260715,
    ...nycacFacebookEventIntake,
    ...facebookEventArchiveIntakeRecords20260716
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
    ...intakeSourceRecords,
    ...researchedSourceRecords20260713,
    ...campaignPressIndexSourceRecords,
    ...campaignPressArticleSourceRecords,
    ...archiveSourceRecords20260714,
    ...sharedDriveSourceRecords20260714,
    ...socialMediaSourceRecords20260714,
    ...webArchiveSourceRecords20260715,
    ...kcTownHallFieldSourceRecords20260715,
    ...wowListFullPopulationSourceRecords20260715,
    ...kcTownHallFullPopulationSourceRecords20260715,
    ...nycArtCXArchivalSourceRecords20260715,
    ...urbanhermitFullPopulationSourceRecords20260715,
    ...nycacFacebookEventSources,
    ...facebookEventArchiveSourceRecords20260716
  ],
  claims: [
    {
      id: "CLM-CALLNYC-HACKATHON-DATE-TIME",
      project: "callnyc",
      internalClaim: "The New York City Council held a constituent-services hackathon at Civic Hall on January 30, 2016; Civic Hall announced the session for 1-3 p.m.",
      status: "confirmed",
      projections: [{ key: "case-study", text: "On January 30, 2016, the New York City Council held a constituent-services hackathon at Civic Hall. Civic Hall announced the session for 1-3 p.m.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
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
      projections: [{ key: "case-study", text: "The surviving promotional graphic uses the branding 'New York City Council Hackathon.'", status: "hold", citationRequired: false, surfaces: [] }],
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
    ...intakeClaimRecords,
    ...researchedClaimRecords20260713,
    ...campaignPressClaimRecords,
    ...archiveClaimRecords20260714,
    ...sharedDriveClaimRecords20260714,
    ...socialMediaClaimRecords20260714,
    ...webArchiveClaimRecords20260715,
    ...kcTownHallFieldClaimRecords20260715,
    ...wowListFullPopulationClaimRecords20260715,
    ...kcTownHallFullPopulationClaimRecords20260715,
    ...nycArtCXArchivalClaimRecords20260715,
    ...urbanhermitFullPopulationClaimRecords20260715,
    ...nycacFacebookEventClaims,
    ...facebookEventArchiveClaimRecords20260716
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
  },
    ...intakeResearchInquiries,
    ...campaignPressResearchInquiries,
    ...archiveResearchInquiries20260714,
    ...sharedDriveResearchInquiries20260714,
    ...socialMediaResearchInquiries20260714,
    ...webArchiveResearchInquiries20260715,
    ...kcTownHallFieldResearchInquiries20260715,
    ...wowListFullPopulationResearchInquiries20260715,
    ...kcTownHallFullPopulationResearchInquiries20260715,
    ...nycArtCXArchivalResearchInquiries20260715,
    ...urbanhermitFullPopulationResearchInquiries20260715,
    ...nycacFacebookEventInquiries,
    ...facebookEventArchiveResearchInquiries20260716
  ],
  corrections: [
    { id: "COR-CALLNYC-CHRONOLOGY-2026", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", previousText: "2014-2015", replacementText: "2016", reason: "Recovered event, data-release, and press chronology places the project in 2016.", decidedAt: "2026-07-11", affectedSurfaces: ["/work", "/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-SUPERLATIVE-2026", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", previousText: "first civic-data hackathon", replacementText: "first CouncilStat hackathon", reason: "The event-day Council post supports only the narrower phrase.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-EVENT-TIME-2026", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", previousText: "approximately 2:10 p.m. photograph timestamp as event time", replacementText: "1-3 p.m. from the Civic Hall announcement", reason: "Direct event-announcement evidence is stronger than participant photograph metadata for public event hours.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank"], status: "active" }
  ],
  pages: [
    {
      id: "callnyc",
      surface: "/work/callnyc",
      sharedBoundary:
        "Across the account records below, public interaction is a bounded recovery floor. It does not establish Council endorsement or adoption, policy causality, complete historical engagement, or post-level authorship.",
      sourceBoundaryOmissions: {
        "SRC-X-CALLNYC-MATTEO-REPLY-2016": ["formal endorsement", "Council adoption"],
        "SRC-X-CALLNYC-RODRIGUEZ-QUOTE-2016": [
          "formal endorsement",
          "Council adoption",
          "policy causality"
        ],
        "SRC-X-CALLNYC-MENDEZ-QUOTE-2016": [
          "formal endorsement",
          "Council adoption",
          "policy causality"
        ],
        "SRC-X-CALLNYC-ROSENTHAL-PROMOTION-2016": [
          "formal endorsement",
          "Council adoption"
        ],
        "SRC-X-CALLNYC-EUGENE-QUOTE-2016": [
          "formal endorsement",
          "Council adoption",
          "policy causality"
        ]
      },
      sourceOrder: [
        "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
        "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
        "SRC-CALLNYC-POLITICO-2016-03-14",
        "SRC-CALLNYC-GITHUB-REPOSITORY",
        "SRC-X-CALLNYC-MATTEO-REPLY-2016",
        "SRC-X-CALLNYC-RODRIGUEZ-QUOTE-2016",
        "SRC-X-CALLNYC-MENDEZ-QUOTE-2016",
        "SRC-X-CALLNYC-ROSENTHAL-PROMOTION-2016",
        "SRC-X-CALLNYC-EUGENE-QUOTE-2016"
      ],
      occurrences: [
        { id: "event-date-time", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", projection: "case-study", sourceIds: ["SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
        { id: "first-councilstat-hackathon", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
        { id: "independent-follow-on", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"] },
        { id: "press-coverage", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14"] },
        { id: "council-account-engagement", claimId: "CLM-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT-2016", projection: "case-study", sourceIds: ["SRC-X-CALLNYC-MATTEO-REPLY-2016", "SRC-X-CALLNYC-RODRIGUEZ-QUOTE-2016", "SRC-X-CALLNYC-MENDEZ-QUOTE-2016", "SRC-X-CALLNYC-ROSENTHAL-PROMOTION-2016", "SRC-X-CALLNYC-EUGENE-QUOTE-2016"] },
        { id: "archived-status", claimId: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS", projection: "case-study", sourceIds: ["SRC-CALLNYC-GITHUB-REPOSITORY", "SRC-CALLNYC-POLITICO-2016-03-14"] }
      ]
    },
    {
      id: "196-sunday-dinner",
      surface: "/work/196-sunday-dinner",
      sourceOrder: [
        "SRC-COMMUNITY-GREENE-HILL-QA-2017",
        "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026"
      ],
      occurrences: [
        { id: "weekly-community-dinners", claimId: "CLM-SUNDAY-DINNER-WEEKLY-COMMUNITY-2017", projection: "case-study" },
        {
          id: "public-milestone-continuity",
          claimId: "CLM-SUNDAY-DINNER-MILESTONES-2014-2016",
          projection: "case-study",
          sourceIds: ["SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026"]
        }
      ]
    },
    {
      id: "wowlist",
      surface: "/work/wowlist",
      sourceOrder: [
        "SRC-X-WOWLIST-PUNKS-USE-2015",
        "SRC-X-WOWLIST-MUSIC-HACKATHON-ATTRIBUTION-2015",
        "SRC-WOWLIST-PUBLIC-SAFE-AGGREGATE-2026",
        "SRC-FACEBOOK-WOWLIST-PROFILE-2026"
      ],
      occurrences: [
        {
          id: "organizer-product-use",
          claimId: "CLM-WOWLIST-ORGANIZER-PRODUCT-USE",
          projection: "case-study",
          sourceIds: ["SRC-X-WOWLIST-PUNKS-USE-2015"]
        },
        {
          id: "jamie-peer-attribution",
          claimId: "CLM-WOWLIST-JAMIE-PEER-ATTRIBUTION",
          projection: "case-study",
          sourceIds: ["SRC-X-WOWLIST-MUSIC-HACKATHON-ATTRIBUTION-2015"]
        },
        {
          id: "historical-scale-snapshot",
          claimId: "CLM-WOWLIST-HISTORICAL-SCALE-SNAPSHOT",
          projection: "case-study",
          sourceIds: ["SRC-WOWLIST-PUBLIC-SAFE-AGGREGATE-2026"]
        },
        {
          id: "facebook-mission-language",
          claimId: "CLM-WOWLIST-FACEBOOK-MISSION-STATEMENT-2026",
          projection: "case-study",
          sourceIds: ["SRC-FACEBOOK-WOWLIST-PROFILE-2026"]
        }
      ]
    },
    {
      id: "fair-rent-nyc",
      surface: "/work/fair-rent-nyc",
      sharedBoundary:
        "Across the shared-account and Council-member records below, account activity does not establish Jamie's post-level authorship, official Council endorsement, a complete historical census, reach, or policy causality.",
      sourceBoundaryOmissions: {
        "SRC-X-NYCARTC-PROFILE-AUDIT-2026": [
          "Jamie's authorship of team posts",
          "official Council endorsement, reach, or policy causality"
        ],
        "SRC-X-NYCARTC-ESPINAL-2017": [
          "Jamie's authorship",
          "Council endorsement of every coalition campaign"
        ],
        "SRC-X-NYCARTC-LEVIN-2019": ["official endorsement"],
        "SRC-X-NYCARTC-RIVERA-2021": ["official Council endorsement", "Jamie's authorship"],
        "SRC-X-NYCARTC-BRANNAN-2019": ["official endorsement", "Jamie's authorship"],
        "SRC-X-NYCARTC-VAN-BRAMER-2020": ["official endorsement", "Jamie's authorship"],
        "SRC-X-NYCARTC-LEVINE-REPLY-2020": ["mission-specific endorsement", "Jamie's authorship"],
        "SRC-X-NYCARTC-LANDER-REPLY-2021": ["official Council endorsement", "Jamie's authorship"]
      },
      sourceOrder: [
        "SRC-NYCAC-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018",
        "SRC-CRS-PUBLIC-BASELINE-HANDOUT-2026-03-27",
        "SRC-X-NYCARTC-PROFILE-AUDIT-2026",
        "SRC-DOCUMENT-JOURNAL-NIGHTLIFE-2018",
        "SRC-X-NYCARTC-ESPINAL-2017",
        "SRC-X-NYCARTC-LEVIN-2019",
        "SRC-X-NYCARTC-RIVERA-2021",
        "SRC-X-NYCARTC-BRANNAN-2019",
        "SRC-X-NYCARTC-VAN-BRAMER-2020",
        "SRC-X-NYCARTC-LEVINE-REPLY-2020",
        "SRC-X-NYCARTC-LANDER-REPLY-2021",
        "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        "SRC-NYCAC-GOTHAMIST-CABARET-2017",
        "SRC-NYCAC-NPR-NIGHTLIFE-2017",
        "SRC-COMMUNITY-GREENE-HILL-QA-2017"
      ],
      occurrences: [
        { id: "sbjsa-testimony", claimId: "CLM-NYCAC-SBJSA-TESTIMONY-2018", projection: "case-study" },
        { id: "public-baseline-pilot", claimId: "CLM-CRS-PUBLIC-BASELINE-PILOT-2026", projection: "case-study" },
        { id: "shared-campaign-identity", claimId: "CLM-NYCARTC-SHARED-CAMPAIGN-IDENTITY", projection: "case-study", sourceIds: ["SRC-X-NYCARTC-PROFILE-AUDIT-2026", "SRC-DOCUMENT-JOURNAL-NIGHTLIFE-2018"] },
        { id: "council-account-engagement", claimId: "CLM-NYCARTC-COUNCIL-ACCOUNT-ENGAGEMENT", projection: "case-study", sourceIds: ["SRC-X-NYCARTC-PROFILE-AUDIT-2026", "SRC-X-NYCARTC-ESPINAL-2017", "SRC-X-NYCARTC-LEVIN-2019", "SRC-X-NYCARTC-RIVERA-2021", "SRC-X-NYCARTC-BRANNAN-2019", "SRC-X-NYCARTC-VAN-BRAMER-2020", "SRC-X-NYCARTC-LEVINE-REPLY-2020", "SRC-X-NYCARTC-LANDER-REPLY-2021"] },
        { id: "coalition-participation-system", claimId: "CLM-NYCAC-PARTICIPATION-SYSTEM", projection: "case-study", sourceIds: ["SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026", "SRC-NYCAC-GOTHAMIST-CABARET-2017", "SRC-NYCAC-NPR-NIGHTLIFE-2017", "SRC-COMMUNITY-GREENE-HILL-QA-2017"] }
      ]
    },
    {
      id: "kc-town-hall",
      surface: "/work/kc-town-hall",
      sharedBoundary:
        "Across the municipal records below, a proposal, recommendation, appropriation, or negotiation status does not establish an executed agreement, disbursement, construction, completed redevelopment, personal receipt, or individual causality.",
      sourceBoundaryOmissions: {
        "SRC-KC-TOWN-HALL-CCED-MINUTES-2019": [
          "that the request was final funding received",
          "that construction was completed"
        ],
        "SRC-KC-TOWN-HALL-COUNCIL-RESOLUTION-190649": [
          "that a funding agreement was executed",
          "that funds were paid or disbursed",
          "that construction began or was completed",
          "that Jamie alone caused the Council action"
        ],
        "SRC-KC-TOWN-HALL-COUNCIL-ORDINANCE-190642": [
          "that funds were paid or disbursed",
          "that a funding agreement was executed",
          "that construction began or was completed",
          "that Jamie personally received the appropriation",
          "that Jamie alone caused the Council action"
        ],
        "SRC-KC-TOWN-HALL-CCED-PROJECT-UPDATE-2022": [
          "that a funding agreement was later executed",
          "construction or project completion"
        ]
      },
      sourceOrder: [
        "SRC-KC-TOWN-HALL-CCED-MINUTES-2019",
        "SRC-KC-TOWN-HALL-COUNCIL-RESOLUTION-190649",
        "SRC-KC-TOWN-HALL-COUNCIL-ORDINANCE-190642",
        "SRC-KC-TOWN-HALL-CCED-PROJECT-UPDATE-2022",
        "SRC-KC-TOWN-HALL-WITHDRAWAL-ORDINANCE-2024",
        "SRC-X-KCTOWNHALL-NEIGHBORHOOD-PROCESS-2018",
        "SRC-X-KCTOWNHALL-FULL-POPULATION-2026",
        "SRC-X-KCTOWNHALL-BTG-TIRE-DROPOFF-2019"
      ],
      occurrences: [
        { id: "public-proposal", claimId: "CLM-KC-TOWN-HALL-PROPOSAL-2019", projection: "case-study" },
        { id: "council-acceptance", claimId: "CLM-KC-TOWN-HALL-COUNCIL-ACCEPTANCE-2019", projection: "case-study" },
        { id: "council-appropriation", claimId: "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019", projection: "case-study" },
        { id: "interim-funding-status", claimId: "CLM-KC-TOWN-HALL-INTERIM-FUNDING-STATUS-2022", projection: "case-study" },
        { id: "project-withdrawal", claimId: "CLM-KC-TOWN-HALL-WITHDRAWN-2024", projection: "case-study" },
        {
          id: "resident-input-surface",
          claimId: "CLM-KCTOWNHALL-RESIDENT-INPUT-SURFACE",
          projection: "case-study",
          sourceIds: ["SRC-X-KCTOWNHALL-NEIGHBORHOOD-PROCESS-2018"]
        },
        {
          id: "tire-operating-pattern",
          claimId: "CLM-KCTOWNHALL-TIRE-OPERATING-PATTERN",
          projection: "case-study",
          sourceIds: ["SRC-X-KCTOWNHALL-FULL-POPULATION-2026"]
        },
        {
          id: "tire-dropoff-corroboration",
          claimId: "CLM-KCTOWNHALL-TIRE-DROPOFF-CORROBORATION",
          projection: "case-study",
          sourceIds: ["SRC-X-KCTOWNHALL-BTG-TIRE-DROPOFF-2019"]
        },
        {
          id: "council-response-floor",
          claimId: "CLM-KCTOWNHALL-COUNCIL-RESPONSE-FLOOR",
          projection: "case-study",
          sourceIds: ["SRC-X-KCTOWNHALL-FULL-POPULATION-2026"]
        }
      ]
    }
  ],
  campaignPressPlacements: campaignPressPlacementRecords,
  socialAccounts: socialAccountRecords20260714
} satisfies KnowledgeBank;

export const knowledgeBank = knowledgeBankSchema.parse(knowledgeBankInput);
