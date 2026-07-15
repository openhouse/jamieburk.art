import { knowledgeBankSchema, type KnowledgeBank } from "./schema.ts";
import {
  nycaPressClaims,
  nycaPressEvidenceByClaim,
  nycaPressIntakeItems,
  nycaPressObservations,
  nycaPressResearchInquiries,
  nycaPressSources
} from "./nyca-press-corpus.ts";
import {
  icloudTeamsClaims,
  icloudTeamsIntakeItems,
  icloudTeamsObservations,
  icloudTeamsResearchInquiries,
  icloudTeamsSources
} from "./icloud-teams-archive.ts";
import {
  googleDriveClaims,
  googleDriveIntakeItems,
  googleDriveObservations,
  googleDriveResearchInquiries,
  googleDriveSources
} from "./google-drive-shared-drives.ts";
import {
  nterChngArchiveClaims,
  nterChngArchiveIntakeItems,
  nterChngArchiveObservations,
  nterChngArchiveResearchInquiries,
  nterChngArchiveSources
} from "./nter-chng-archive.ts";
import {
  socialAccountArchiveClaims,
  socialAccountArchiveIntakeItems,
  socialAccountArchiveObservations,
  socialAccountArchiveResearchInquiries,
  socialAccountArchiveSources
} from "./social-account-archive.ts";
import {
  callnycXCorpusClaims,
  callnycXCorpusIntakeItems,
  callnycXCorpusObservations,
  callnycXCorpusResearchInquiries,
  callnycXCorpusSources
} from "./callnyc-x-corpus.ts";
import {
  wowlistXCorpusClaims,
  wowlistXCorpusIntakeItems,
  wowlistXCorpusObservations,
  wowlistXCorpusResearchInquiries,
  wowlistXCorpusSources
} from "./wowlist-x-corpus.ts";

const knowledgeBankInput = {
  intakeItems: [
    ...nycaPressIntakeItems,
    ...icloudTeamsIntakeItems,
    ...googleDriveIntakeItems,
    ...nterChngArchiveIntakeItems,
    ...socialAccountArchiveIntakeItems,
    ...callnycXCorpusIntakeItems,
    ...wowlistXCorpusIntakeItems,
    {
      id: "INTAKE-2026-07-15-KC-TOWN-HALL-STEWARDSHIP-TRANSITION",
      receivedAt: "2026-07-15",
      inputKind: "memory",
      summary: "Jamie's first-person clarification that he concluded his KC Town Hall role by transitioning project stewardship to an organization he regarded as mission-aligned.",
      projectIds: ["kc-town-hall"],
      researchStatus: "needs-more-research",
      publicationStatus: "projected",
      sourceIds: ["SRC-KC-TOWN-HALL-JAMIE-TRANSITION-ACCOUNT-2026-07-15"],
      observationIds: ["OBS-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-ACCOUNT"],
      claimIds: ["CLM-KC-TOWN-HALL-STEWARDSHIP-TRANSITION"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-2026"],
      nextActions: [
        "Seek public-safe handoff records or collaborator confirmation for the receiving organization, timing, scope, and continuity outcomes.",
        "Limit research and publication to the professional stewardship transition.",
        "Keep the stewardship handoff distinct from the later municipal funding withdrawal unless evidence establishes their relationship."
      ]
    },
    {
      id: "INTAKE-2026-07-15-KC-TOWN-HALL-PHASE-ONE-NEIGHBORHOOD-WORK",
      receivedAt: "2026-07-15",
      inputKind: "document",
      summary: "A protected 2019 KC Town Hall CCED proposal and Jamie's first-person account documenting Phase One construction, the neighborhood survey, and related East Side neighborhood service and civic-design work.",
      projectIds: ["kc-town-hall", "kansas-city-neighborhood-programs"],
      researchStatus: "needs-more-research",
      publicationStatus: "eligible",
      sourceIds: [
        "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
        "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15"
      ],
      observationIds: [
        "OBS-KC-TOWN-HALL-PROPOSER-TEAM-2019",
        "OBS-KC-TOWN-HALL-PHASE-ONE-COMPLETED-2019",
        "OBS-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY-2019",
        "OBS-KC-TOWN-HALL-GENERAL-CONTRACTOR-ACCOUNT",
        "OBS-KC-TOWN-HALL-SITE-LISTENING-ACCOUNT",
        "OBS-KC-TIRED-OF-TIRES-ACCOUNT",
        "OBS-KC-TIRED-OF-TIRES-EXPANSION-ACCOUNT",
        "OBS-KC-CLEVELAND-UNIFY-TO-BEAUTIFY-ACCOUNT"
      ],
      claimIds: [
        "CLM-KC-TOWN-HALL-PHASE-ONE-COMPLETION",
        "CLM-KC-TOWN-HALL-GENERAL-CONTRACTOR-ROLE",
        "CLM-KC-TOWN-HALL-PARTICIPATORY-SURVEY",
        "CLM-KC-TIRED-OF-TIRES-OPERATIONS",
        "CLM-KC-CLEVELAND-UNIFY-TO-BEAUTIFY"
      ],
      researchInquiryIds: [
        "INQ-KC-TOWN-HALL-CONSTRUCTION-ROLE-2026",
        "INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"
      ],
      nextActions: [
        "Seek permits, contracts, invoices, schedules, photographs, correspondence, or collaborator confirmation for Jamie's day-to-day general-contractor role and survey-system authorship.",
        "Recover Oak Park, Indian Mound, HENC, city, church, social-media, handbill, map, meeting, and funding records for TiredOfTires and Cleveland Avenue Unify to Beautify.",
        "Keep Pastor Lee's authorship of the Cleveland Avenue corridor concept and the collective work of neighborhood organizations explicit."
      ]
    },
    {
      id: "INTAKE-2026-07-14-KC-TOWN-HALL-COUNCIL-FUNDING",
      receivedAt: "2026-07-14",
      inputKind: "claim",
      summary: "Official Kansas City records tracing KC Town Hall's $490,539 CCED proposal from board recommendation through Council acceptance and appropriation, followed by funding-agreement negotiation, project withdrawal, and return of the unused appropriation.",
      projectIds: ["kc-town-hall"],
      researchStatus: "researched",
      publicationStatus: "eligible",
      sourceIds: [
        "SRC-KC-TOWN-HALL-CCED-MINUTES-2019",
        "SRC-KC-TOWN-HALL-RESOLUTION-190649",
        "SRC-KC-TOWN-HALL-ORDINANCE-190642",
        "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
        "SRC-KC-TOWN-HALL-ORDINANCE-240317"
      ],
      observationIds: [
        "OBS-KC-TOWN-HALL-COUNCIL-RESOLUTION-190649",
        "OBS-KC-TOWN-HALL-COUNCIL-APPROPRIATION-190642",
        "OBS-KC-TOWN-HALL-CCED-UPDATE-2022",
        "OBS-KC-TOWN-HALL-WITHDRAWAL-CLAWBACK-240317"
      ],
      claimIds: [
        "CLM-KC-TOWN-HALL-FUNDING-RECOMMENDATION",
        "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"
      ],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-FUNDING-2026"],
      nextActions: [
        "Use Council-appropriation language together with the non-disbursement and later clawback boundary.",
        "Do not infer Jamie's individual role in securing the Council actions from the legislative records alone."
      ]
    },
    {
      id: "INTAKE-2026-07-12-PORTFOLIO-STRENGTHENING-SOURCES",
      receivedAt: "2026-07-12",
      inputKind: "url",
      summary: "Ten public sources selected to strengthen Sunday Dinner, WOW List, NYC Artist Coalition, collaborative media, waterways, KC Town Hall, and Kansas City public-program claims.",
      projectIds: [
        "196-sunday-dinner",
        "wowlist",
        "nyc-artist-coalition",
        "claudettes-theatre-on-wheels",
        "kc-town-hall",
        "kansas-city-public-programs",
        "waterways-participatory-art"
      ],
      researchStatus: "researched",
      publicationStatus: "eligible",
      sourceIds: [
        "SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017-12-19",
        "SRC-NYCA-BEDFORD-BOWERY-DIY-SPACES-2017-02-07",
        "SRC-NYCA-SAVE-NYC-SPACES-SITE",
        "SRC-NYCA-EDGE-OF-SOUND-TOWN-HALL-2017-10-14",
        "SRC-NYCA-MIXMAG-CABARET-2017-09-20",
        "SRC-CLAUDETTE-MICHAEL-REES-AR",
        "SRC-KC-TOWN-HALL-CCED-MINUTES-2019",
        "SRC-KC-EIGHTH-STREET-TUNNEL-KCUR-2016-09-15",
        "SRC-WATERWAYS-PITCH-GULF-2009-09-03",
        "SRC-KC-FRONTIER-DREAMERS-2012-05-17"
      ],
      observationIds: [
        "OBS-SUNDAY-DINNER-GREENE-HILL-WEEKLY-OPEN",
        "OBS-GREENE-HILL-WOWLIST-CABARET",
        "OBS-NYCA-BEDFORD-ORGANIZER-MUTUAL-AID",
        "OBS-NYCA-SAVE-SPACES-PUBLIC-AGENDA",
        "OBS-NYCA-EDGE-TOWN-HALL-ORGANIZING",
        "OBS-NYCA-MIXMAG-HEARING-TESTIMONY",
        "OBS-CLAUDETTE-AR-COLLABORATION",
        "OBS-KC-TOWN-HALL-CCED-RECOMMENDATION",
        "OBS-KC-TUNNEL-SCREENING",
        "OBS-WATERWAYS-PITCH-GULF-COMPLETION",
        "OBS-KC-FRONTIER-DREAMERS"
      ],
      claimIds: [
        "CLM-SUNDAY-DINNER-WEEKLY-OPEN-GATHERING",
        "CLM-NYCA-MUTUAL-AID-ORGANIZER-ROLE",
        "CLM-NYCA-COFOUNDER-ROLE",
        "CLM-NYCA-CABARET-LAW-CONTRIBUTION",
        "CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL",
        "CLM-CLAUDETTE-AR-COLLABORATION",
        "CLM-KC-TOWN-HALL-FUNDING-RECOMMENDATION",
        "CLM-KC-EIGHTH-STREET-TUNNEL-PROGRAM",
        "CLM-WATERWAYS-RAFT-EXPEDITION",
        "CLM-KC-FRONTIER-PUBLIC-SPACE-PROGRAM"
      ],
      researchInquiryIds: [
        "INQ-NYCA-COFOUNDER-ROLE-2026",
        "INQ-SUNDAY-DINNER-AGGREGATE-HISTORY-2026"
      ],
      nextActions: [
        "Use the newly public source layer to strengthen selected portfolio wording without treating every eligible claim as a required website projection.",
        "Continue research into exact NYC Artist Coalition founding responsibilities, Sunday Dinner aggregate counts, and collaborator-approved media."
      ]
    },
    {
      id: "INTAKE-2026-07-12-WATERWAYS-AND-OPEN-HOUSE-URLS",
      receivedAt: "2026-07-12",
      inputKind: "url",
      summary: "Three public articles and institutional pages concerning Jamie's raft expedition, waterways-centered participatory work, Open House, and Shop Shows.",
      projectIds: ["waterways-participatory-art", "open-house"],
      researchStatus: "researched",
      publicationStatus: "knowledge-bank-only",
      sourceIds: [
        "SRC-WATERWAYS-PITCH-2007-08-09",
        "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
        "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28"
      ],
      observationIds: [
        "OBS-WATERWAYS-PITCH-RAFT-ORIGIN",
        "OBS-WATERWAYS-PITCH-MISSOURI-CROSSING",
        "OBS-WATERWAYS-CHARLOTTE-EXPEDITION",
        "OBS-WATERWAYS-CHARLOTTE-PARTICIPATION",
        "OBS-WATERWAYS-CHARLOTTE-INSTALLATION",
        "OBS-OPEN-HOUSE-GALLERY-RESIDENCY",
        "OBS-OPEN-HOUSE-SHOP-SHOWS",
        "OBS-OPEN-HOUSE-DOCUMENTATION"
      ],
      claimIds: [
        "CLM-WATERWAYS-RAFT-EXPEDITION",
        "CLM-WATERWAYS-GREAT-ACCOMMODATIONS",
        "CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAMS"
      ],
      researchInquiryIds: [],
      nextActions: [
        "Search Jamie's public archive for route, collaborator, and program documentation before considering a website projection.",
        "Use the project graph to brief photo editors on waterways, raft, Open House, and participatory-program imagery."
      ]
    },
    {
      id: "INTAKE-2026-07-12-NIGHTLIFE-URLS",
      receivedAt: "2026-07-12",
      inputKind: "url",
      summary: "Public reporting and primary government records concerning Jamie's and NYC Artist Coalition's Cabaret Law, Office of Nightlife, town-hall, and MARCH-reform work.",
      projectIds: ["nyc-artist-coalition"],
      researchStatus: "needs-more-research",
      publicationStatus: "knowledge-bank-only",
      sourceIds: [
        "SRC-NYCA-GOTHAMIST-CABARET-2017-06-19",
        "SRC-NYCA-NPR-CABARET-2017-09-20",
        "SRC-NYCA-COUNCIL-CABARET-HEARING-2017-06-19",
        "SRC-NYCA-LEGISTAR-CABARET-REPEAL-2017",
        "SRC-NYCA-MOME-OFFICE-NIGHTLIFE-2017-09-19",
        "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
        "SRC-NYCA-BUSHWICK-DAILY-NIGHT-MAYOR-2017-10-12",
        "SRC-NYCA-VILLAGE-VOICE-NIGHT-MAYOR-2017-11-17",
        "SRC-NYCA-NIGHT-MAYOR-LETTER-2017-09-08",
        "SRC-NYCA-TALKS-NOT-RAIDS",
        "SRC-NYCA-LEGISTAR-MARCH-TRANSPARENCY-2019",
        "SRC-NYCA-MAYOR-CURE-2023-12-28"
      ],
      observationIds: [
        "OBS-NYCA-FIRE-CODE-STUDY-GROUPS",
        "OBS-NYCA-CABARET-RALLY",
        "OBS-NYCA-CABARET-TESTIMONY",
        "OBS-NYCA-CABARET-REPEAL-ENACTED",
        "OBS-NYCA-OFFICE-NIGHTLIFE-ENACTED",
        "OBS-NYCA-TOWN-HALL-SPEARHEADED",
        "OBS-NYCA-TOWN-HALL-JAMIE-PARTICIPATION",
        "OBS-NYCA-TALKS-NOT-RAIDS-POSITION",
        "OBS-NYCA-MARCH-TRANSPARENCY-LAW",
        "OBS-NYCA-MARCH-REPLACED-BY-CURE"
      ],
      claimIds: [
        "CLM-NYCA-CABARET-LAW-CONTRIBUTION",
        "CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL",
        "CLM-NYCA-TALKS-NOT-RAIDS-LONG-ARC"
      ],
      researchInquiryIds: [
        "INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026",
        "INQ-NYCA-MARCH-CAUSAL-LINK-2026"
      ],
      nextActions: [
        "Recover additional primary coalition records and public testimony identifying Jamie's individual production and drafting responsibilities.",
        "Trace the documented path from Talks Not Raids advocacy to Local Law 220 and the CURE transition without assuming sole causality."
      ]
    },
    {
      id: "INTAKE-2026-07-12-NYCA-FOUNDING-MEMORY",
      receivedAt: "2026-07-12",
      inputKind: "memory",
      summary: "Jamie identifies an instrumental role in creating NYC Artist Coalition and in its nightlife-policy and public-program work.",
      projectIds: ["nyc-artist-coalition"],
      researchStatus: "needs-more-research",
      publicationStatus: "pending",
      sourceIds: [],
      observationIds: [],
      claimIds: ["CLM-NYCA-COFOUNDER-ROLE"],
      researchInquiryIds: ["INQ-NYCA-COFOUNDER-ROLE-2026"],
      nextActions: [
        "Locate contemporaneous founding documents, public biographies, organizational records, and collaborator-confirmed accounts.",
        "Keep the existing approved co-founder wording bounded while the independent citation layer develops."
      ]
    },
    {
      id: "INTAKE-2026-07-12-CALLNYC-COUNCIL-ENGAGEMENT",
      receivedAt: "2026-07-12",
      inputKind: "metric",
      summary: "Candidate evidence concerning engagement with the CallNYC social account by New York City Council member accounts.",
      projectIds: ["callnyc"],
      researchStatus: "researched",
      publicationStatus: "projected",
      sourceIds: [
        "SRC-CALLNYC-X-TIMELINE-PDF-2026-07-11",
        "SRC-CALLNYC-COUNCIL-PB-ROSTER-2016-08-04",
        "SRC-CALLNYC-X-AUTHENTICATED-MENTION-SEARCH-2026-07-15",
        "SRC-CALLNYC-X-MARGARET-CHIN-2017-07-11",
        "SRC-CALLNYC-X-RUBEN-WILLS-2016-05-17",
        "SRC-CALLNYC-X-STEVEN-MATTEO-2016-05-03",
        "SRC-CALLNYC-X-PETER-KOO-2016-04-27",
        "SRC-NYC-COUNCIL-STATED-MEETING-2016-11-16"
      ],
      observationIds: [
        "OBS-CALLNYC-MATHIEU-EUGENE-AMPLIFICATION",
        "OBS-CALLNYC-HELEN-ROSENTHAL-PROMOTION",
        "OBS-CALLNYC-X-MARGARET-CHIN",
        "OBS-CALLNYC-X-RUBEN-WILLS",
        "OBS-CALLNYC-X-STEVEN-MATTEO",
        "OBS-CALLNYC-X-PETER-KOO"
      ],
      claimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS"],
      researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"],
      nextActions: [
        "Seek a complete account export or additional archive captures if an exact platform-wide count becomes necessary.",
        "Keep replies, reposts, quote posts, direct promotions, likes, and inaccessible content as separate interaction classes."
      ]
    }
  ],
  sources: [
    ...wowlistXCorpusSources,
    ...nycaPressSources,
    ...icloudTeamsSources,
    ...googleDriveSources,
    ...nterChngArchiveSources,
    ...socialAccountArchiveSources,
    ...callnycXCorpusSources,
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
    {
      id: "SRC-CALLNYC-X-TIMELINE-PDF-2026-07-11",
      title: "CallNYC X timeline capture",
      kind: "archived-web-capture",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      capturedAt: "2026-07-11T18:02:08-04:00",
      accessedAt: "2026-07-12",
      publicCitation: "Seven-page PDF capture of the public CallNYC X timeline, created July 11, 2026.",
      publicNote: "The underlying capture remains outside the public repository. Visual review preserves a bounded timeline slice, not a complete export.",
      protectedLocatorId: "CAPTURE-CALLNYC-X-TIMELINE-2026-07-11",
      supportsGenerally: [
        "visible CallNYC timeline posts",
        "a Mathieu Eugene quote-post of a CallNYC award post",
        "a Helen Rosenthal post directing readers to callnyc.org",
        "visible dates and engagement counts for the captured posts"
      ],
      doesNotEstablish: [
        "a comprehensive account history",
        "all Council-member interactions",
        "deleted or inaccessible posts",
        "endorsement or adoption by the New York City Council",
        "the identity of every account behind aggregate likes or repost counts"
      ]
    },
    {
      id: "SRC-CALLNYC-COUNCIL-PB-ROSTER-2016-08-04",
      title: "PBNYC Cycle 6 has begun",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-08-04",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://council.nyc.gov/news/2016/08/04/pbnyc-cycle-6-has-begun/",
      preferredPublicUrl: "canonical",
      publicCitation: "New York City Council, 'PBNYC Cycle 6 has begun,' August 4, 2016.",
      publicNote: "Contemporaneous Council page listing Helen Rosenthal and Mathieu Eugene as Council members by district during the relevant period.",
      supportsGenerally: [
        "Helen Rosenthal served as Council Member for District 6",
        "Mathieu Eugene served as Council Member for District 40",
        "both held office during the captured 2016 interaction period"
      ],
      doesNotEstablish: [
        "their CallNYC interactions",
        "endorsement or adoption of CallNYC",
        "a complete Council-member roster for every CallNYC post",
        "the social-account ownership or verification method"
      ]
    },
    {
      id: "SRC-WATERWAYS-PITCH-2007-08-09",
      title: "When Artists Turn Huck Finn",
      organization: "The Pitch",
      author: "Eric Barton",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2007-08-09",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.thepitchkc.com/when-artists-turn-huck-finn/",
      preferredPublicUrl: "canonical",
      publicCitation: "Eric Barton, 'When Artists Turn Huck Finn,' The Pitch, August 9, 2007.",
      publicNote: "Contemporaneous independent reporting on the origin and Missouri portion of the raft expedition.",
      supportsGenerally: [
        "Jamie conceived an experiential boat expedition",
        "the raft used recycled materials",
        "the group crossed Missouri by river",
        "the project responded to Kansas City's lost relationship with the Missouri River"
      ],
      doesNotEstablish: [
        "that Jamie completed the expedition alone",
        "the complete route to the Gulf of Mexico",
        "a complete participant roster",
        "every later waterways program"
      ]
    },
    {
      id: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
      title: "Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water",
      organization: "Charlotte Street Foundation",
      author: "Charlotte Street Foundation",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2009-09-01",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
      preferredPublicUrl: "canonical",
      publicCitation: "Charlotte Street Foundation, 'Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water,' September 1, 2009.",
      publicNote: "Institutional project description documenting the exhibition, prior raft expedition, outreach, public programs, and participatory methods.",
      supportsGenerally: [
        "Jamie spearheaded Great Accommodations",
        "the project treated rivers as a social network",
        "the earlier raft expedition traveled from Kansas City down the Missouri and Mississippi for four months",
        "the exhibition used participatory, computational, sculptural, video, community, and documentary forms"
      ],
      doesNotEstablish: [
        "solo authorship of collaborators' contributions",
        "the exact final landing location of the raft",
        "current program status",
        "permission to publish every linked photograph"
      ]
    },
    {
      id: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
      title: "Open House",
      organization: "Good Times",
      author: "Laura Mattingly",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2006-06-28",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.goodtimes.sc/archives/metro-santa-cruz/06.28.06/open-house-0626.html",
      preferredPublicUrl: "canonical",
      publicCitation: "Laura Mattingly, 'Open House,' Good Times, June 28, 2006.",
      publicNote: "Contemporaneous reporting on Open House, Shop Shows, communal participation, and working documentation.",
      supportsGenerally: [
        "Jamie initiated a ten-day public communal-living experiment in a UCSC gallery",
        "Jamie and housemates held participatory Shop Shows from 2003 to 2005",
        "participants documented daily activity",
        "the programs invited visitors to shape the environment"
      ],
      doesNotEstablish: [
        "solo authorship of participants' work",
        "a complete attendance record",
        "permission to identify or publish every participant",
        "current program status"
      ]
    },
    {
      id: "SRC-NYCA-GOTHAMIST-CABARET-2017-06-19",
      title: "DIY Venues Demand Repeal Of Widely Reviled Cabaret Law",
      organization: "Gothamist",
      author: "Emma Whitford",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2017-06-19",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
      archiveUrl: "https://web.archive.org/web/20190507132352/http://gothamist.com:80/2017/06/19/cabaret_law_nyc.php",
      preferredPublicUrl: "canonical",
      publicCitation: "Emma Whitford, 'DIY Venues Demand Repeal Of Widely Reviled Cabaret Law,' Gothamist, June 19, 2017.",
      publicNote: "Independent reporting directly identifies Jamie's fire-code study groups, City Hall rally, NYC Artist Coalition affiliation, and safety framing.",
      supportsGenerally: [
        "Jamie organized fire-code study groups for DIY venues",
        "Jamie rallied for full Cabaret Law repeal",
        "Jamie represented an NYC Artist Coalition safety argument"
      ],
      doesNotEstablish: [
        "that Jamie solely led the repeal campaign",
        "that NYC Artist Coalition alone caused repeal",
        "that every venue agreed with the coalition",
        "the later legislative outcome by itself"
      ]
    },
    {
      id: "SRC-NYCA-NPR-CABARET-2017-09-20",
      title: "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife",
      organization: "NPR",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2017-09-20",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife",
      archiveUrl: "https://web.archive.org/web/20251028172606/https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife",
      preferredPublicUrl: "canonical",
      publicCitation: "NPR, 'With Its No Dancing Law Verging On Repeal, New York Legitimizes Its Nightlife,' September 20, 2017.",
      publicNote: "National reporting contextualizing the broader nightlife movement and political moment; the canonical page was robots-blocked during this review and was cross-checked through syndicated copies.",
      supportsGenerally: [
        "a broad nightlife-advocacy movement supported repeal",
        "Councilmember Rafael Espinal advanced nightlife legislation",
        "the repeal effort had national coverage",
        "Jamie was identified as a founding member of NYC Artist Coalition"
      ],
      doesNotEstablish: [
        "Jamie's complete founding responsibilities",
        "the coalition's complete founding chronology or roster",
        "sole causality for repeal",
        "sole coalition leadership"
      ]
    },
    {
      id: "SRC-NYCA-COUNCIL-CABARET-HEARING-2017-06-19",
      title: "New York City Council Committee on Consumer Affairs Cabaret Law hearing transcript",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-06-19",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=41F1062B-FC32-4A12-846E-65CEB3BB052C&ID=5316935&M=F",
      preferredPublicUrl: "canonical",
      publicCitation: "New York City Council, Committee on Consumer Affairs hearing transcript on Cabaret Law enforcement, June 19, 2017.",
      publicNote: "Primary government record preserving Jamie's testimony as a member of NYC Artist Coalition calling for repeal and representation for low-income communities.",
      supportsGenerally: [
        "Jamie testified before the Council",
        "Jamie identified himself with NYC Artist Coalition",
        "Jamie called for Cabaret Law repeal",
        "Jamie called for low-income-community representation in nightlife governance"
      ],
      doesNotEstablish: [
        "sole authorship of the coalition position",
        "sole causality for repeal",
        "official legal analysis by Jamie",
        "the final legislative vote"
      ]
    },
    {
      id: "SRC-NYCA-LEGISTAR-CABARET-REPEAL-2017",
      title: "Introduction 1652-2017 - Cabaret licensing repeal",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-11-27",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=6FDA3305-06B3-47B3-9DF6-21B605C5A8EE&ID=3086319",
      preferredPublicUrl: "canonical",
      publicCitation: "New York City Council, Introduction 1652-2017, enacted as Local Law 214 of 2017, November 27, 2017.",
      publicNote: "Primary record confirming enactment of the Cabaret licensing repeal and retained safety measures.",
      supportsGenerally: [
        "the Council approved the repeal legislation",
        "the mayor signed it",
        "the law repealed cabaret licensing requirements",
        "some security requirements remained"
      ],
      doesNotEstablish: [
        "which advocates caused enactment",
        "Jamie's individual contribution",
        "that every dancing-related zoning restriction ended",
        "sole coalition causality"
      ]
    },
    {
      id: "SRC-NYCA-MOME-OFFICE-NIGHTLIFE-2017-09-19",
      title: "Mayor de Blasio Signs Bill Establishing Nightlife Mayor",
      organization: "NYC Mayor's Office of Media and Entertainment",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-09-19",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.nyc.gov/site/mome/news/091917-nightlife-office.page",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Mayor's Office of Media and Entertainment, 'Mayor de Blasio Signs Bill Establishing Nightlife Mayor,' September 19, 2017.",
      publicNote: "Primary city record confirming creation and intended functions of the Office of Nightlife.",
      supportsGenerally: [
        "the Office of Nightlife was established",
        "the office would address nightlife challenges and opportunities",
        "the office would implement taskforce recommendations"
      ],
      doesNotEstablish: [
        "Jamie's individual role",
        "NYC Artist Coalition's complete role",
        "that the office adopted every advocate recommendation",
        "sole causality"
      ]
    },
    {
      id: "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
      title: "What Can the Night Mayor Do? The DIY Scene Discusses",
      organization: "Bedford + Bowery",
      author: "Cassidy Dawn Graves",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2017-10-12",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
      archiveUrl: "https://web.archive.org/web/20260106102010/https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
      preferredPublicUrl: "canonical",
      publicCitation: "Cassidy Dawn Graves, 'What Can the Night Mayor Do? The DIY Scene Discusses,' Bedford + Bowery, October 12, 2017.",
      publicNote: "Independent reporting describing the town hall as spearheaded by NYC Artist Coalition, the coalition as instrumental in advocacy, and Jamie as a participating coalition speaker.",
      supportsGenerally: [
        "NYC Artist Coalition spearheaded the town hall",
        "independent reporting described the coalition as instrumental in Office of Nightlife and repeal advocacy",
        "Jamie participated as an NYC Artist Coalition speaker"
      ],
      doesNotEstablish: [
        "Jamie's exact production responsibilities",
        "solo coalition leadership",
        "sole causality for legislation",
        "the complete participant roster"
      ]
    },
    {
      id: "SRC-NYCA-BUSHWICK-DAILY-NIGHT-MAYOR-2017-10-12",
      title: "Influential Bushwick Artists and Nightlife Advocates Met City Reps to Hash Out Night Mayor Role",
      organization: "Bushwick Daily",
      author: "Andrew Tobia",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-10-12",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://bushwickdaily.com/news/4985-artists-and-advocates-join-forces-to-protect-nyc-s-diy-culture-and-art-spaces/",
      preferredPublicUrl: "canonical",
      publicCitation: "Andrew Tobia, 'Influential Bushwick Artists and Nightlife Advocates Met City Reps to Hash Out Night Mayor Role,' Bushwick Daily, October 12, 2017.",
      publicNote: "Independent event coverage identifying NYC Artist Coalition as organizer of the packed Market Hotel town hall.",
      supportsGenerally: [
        "NYC Artist Coalition organized the town hall",
        "artists and officials discussed expectations for the Office of Nightlife",
        "the event centered small and culturally significant spaces"
      ],
      doesNotEstablish: [
        "Jamie's exact production responsibilities",
        "the event's official status as a city hearing",
        "sole coalition causality for the office",
        "every attendee's position"
      ]
    },
    {
      id: "SRC-NYCA-VILLAGE-VOICE-NIGHT-MAYOR-2017-11-17",
      title: "Awaiting the Night Mayor",
      organization: "The Village Voice",
      author: "Roshan Abraham",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-11-17",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.villagevoice.com/awaiting-the-night-mayor/",
      preferredPublicUrl: "canonical",
      publicCitation: "Roshan Abraham, 'Awaiting the Night Mayor,' The Village Voice, November 17, 2017.",
      publicNote: "Independent reporting on NYC Artist Coalition's town halls, Cabaret Law advocacy, Office of Nightlife concerns, and enforcement context.",
      supportsGenerally: [
        "NYC Artist Coalition organized the Save NYC Spaces town hall",
        "the coalition hosted town halls with city officials",
        "the broader coalition had legislative successes",
        "MARCH enforcement was part of the public concern"
      ],
      doesNotEstablish: [
        "Jamie's exact individual role",
        "solo causality for legislative outcomes",
        "that every later Office of Nightlife policy followed coalition demands",
        "the complete organizing roster"
      ]
    },
    {
      id: "SRC-NYCA-NIGHT-MAYOR-LETTER-2017-09-08",
      title: "NYC Artist Coalition letter concerning the Office of Nightlife",
      organization: "NYC Artist Coalition and co-signing organizations",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-09-08",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://savenycspaces.nycartc.com/download/Night-Mayor-Letter-MOME-9-23-17.pdf",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition and co-signing organizations, letter concerning the Office of Nightlife, September 8, 2017.",
      publicNote: "Public coalition letter inviting city agencies to an October 11 town hall and arguing for an equitable, trust-based Office of Nightlife.",
      supportsGenerally: [
        "NYC Artist Coalition helped convene the October 11 town hall",
        "the coalition sought an equitable and trust-based Office of Nightlife",
        "multiple cultural organizations co-signed the letter"
      ],
      doesNotEstablish: [
        "Jamie's individual authorship",
        "agreement by every nightlife stakeholder",
        "city adoption of every recommendation",
        "sole coalition causality"
      ]
    },
    {
      id: "SRC-NYCA-TALKS-NOT-RAIDS",
      title: "Talks Not Raids: Transparency on MARCH Raids in NYC",
      organization: "Talks Not Raids Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live-and-archived",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://talksnotraids.com/",
      archiveUrl: "https://web.archive.org/web/20260416022227/https://talksnotraids.com/",
      preferredPublicUrl: "canonical",
      publicCitation: "Talks Not Raids Coalition, 'Talks Not Raids: Transparency on MARCH Raids in NYC.'",
      publicNote: "Public campaign surface advocating trust, transparency, and relationship-based safety work in place of disruptive MARCH raids.",
      supportsGenerally: [
        "the coalition publicly advocated talks rather than raids",
        "the campaign framed MARCH as harmful to vulnerable cultural spaces",
        "the campaign sought trust with public-safety stakeholders",
        "the site preserves a curated press index of seven articles"
      ],
      doesNotEstablish: [
        "Jamie's individual authorship",
        "that the campaign alone caused later legislation",
        "that the campaign alone caused replacement of MARCH",
        "the complete coalition history"
      ]
    },
    {
      id: "SRC-NYCA-LEGISTAR-MARCH-TRANSPARENCY-2019",
      title: "Introduction 1156-2018 - MARCH reporting and notice requirements",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-12-15",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=6A35ADA6-86E7-40B0-AD39-5B6E376FD23F&ID=3704342",
      preferredPublicUrl: "canonical",
      publicCitation: "New York City Council, Introduction 1156-2018, enacted as Local Law 220 of 2019, December 15, 2019.",
      publicNote: "Primary record confirming MARCH reporting requirements and advance-notice and response provisions for establishments.",
      supportsGenerally: [
        "MARCH reporting requirements were enacted",
        "advance written notification was required in many circumstances",
        "establishments gained an opportunity to provide information"
      ],
      doesNotEstablish: [
        "which advocates caused enactment",
        "Jamie's individual role",
        "that MARCH ended in 2019",
        "sole coalition causality"
      ]
    },
    {
      id: "SRC-NYCA-MAYOR-CURE-2023-12-28",
      title: "Mayor Adams Launches CURE, Phasing Out MARCH Enforcement",
      organization: "NYC Mayor's Office",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2023-12-28",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.nyc.gov/mayors-office/news/2023/12/mayor-adams-launches-effort-enhance-nightlife-safety-strengthen-small-businesses-phasing",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Mayor's Office, 'Mayor Adams Launches Effort to Enhance Nightlife Safety and Strengthen Small Businesses, Phasing Out MARCH Enforcement,' December 28, 2023.",
      publicNote: "Primary city record confirming that CURE replaced MARCH with an engagement-first process; the accompanying transcript names NYC Artist Coalition among nightlife advocates.",
      supportsGenerally: [
        "CURE replaced MARCH",
        "the replacement emphasized communication and correction before enforcement",
        "NYC Artist Coalition was acknowledged among nightlife advocates"
      ],
      doesNotEstablish: [
        "that NYC Artist Coalition alone caused the replacement",
        "Jamie's individual causal contribution",
        "that enforcement ended entirely",
        "that every campaign demand was adopted"
      ]
    },
    {
      id: "SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017-12-19",
      title: "The Co-op Q&A With Jamie Burkart and Julie Fredenberg",
      organization: "Greene Hill Food Co-op",
      author: "Outreach Committee",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-12-19",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.greenehillfood.coop/master-blog/2017/12/september-2017-newsletter",
      preferredPublicUrl: "canonical",
      publicCitation: "Greene Hill Food Co-op Outreach Committee, 'The Co-op Q&A With Jamie Burkart and Julie Fredenberg,' December 19, 2017.",
      publicNote: "Contemporaneous community profile documenting weekly open Sunday dinners, WOW List, coalition participation, Cabaret Law advocacy, and an invitation to public dialogue with the new Office of Nightlife.",
      supportsGenerally: [
        "Jamie and Julie hosted Sunday dinners every week in their Brooklyn apartment",
        "the dinners were open to the community",
        "they maintained WOW List as a community-events list",
        "they worked as part of NYC Artist Coalition on Cabaret Law repeal",
        "Jamie articulated an equity-centered community-space rationale"
      ],
      doesNotEstablish: [
        "the lifetime number of dinners",
        "the number of resident artists",
        "sole ownership of Sunday Dinner or WOW List",
        "sole causality for Cabaret Law repeal"
      ]
    },
    {
      id: "SRC-NYCA-BEDFORD-BOWERY-DIY-SPACES-2017-02-07",
      title: "6 Things to Know About Making DIY Spaces Work",
      organization: "Bedford + Bowery",
      author: "Cassidy Dawn Graves",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-02-07",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://bedfordandbowery.com/2017/02/6-things-to-know-about-making-diy-spaces-work/",
      preferredPublicUrl: "canonical",
      publicCitation: "Cassidy Dawn Graves, '6 Things to Know About Making DIY Spaces Work,' Bedford + Bowery, February 7, 2017.",
      publicNote: "Independent reporting identifies Jamie as an NYC Artist Coalition organizer and documents a coalition-organized safety and policy meeting and a mutual-aid network with more than 100 sign-ups at the time.",
      supportsGenerally: [
        "Jamie was identified as an NYC Artist Coalition organizer",
        "the coalition organized a DIY-space safety and policy meeting",
        "Jamie described organizing as collective protection",
        "more than 100 people had signed up for the coalition mutual-aid network"
      ],
      doesNotEstablish: [
        "that Jamie alone organized the meeting",
        "a current membership count",
        "that every proposal was adopted",
        "the coalition's complete founding history"
      ]
    },
    {
      id: "SRC-NYCA-SAVE-NYC-SPACES-SITE",
      title: "Save NYC Spaces: New Nightlife Mayor Must Assist Diverse Cultures",
      organization: "NYC Artist Coalition and Save NYC Spaces coalition",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live-and-archived",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://savenycspaces.nycartc.com/",
      archiveUrl: "https://web.archive.org/web/20260521133438/https://savenycspaces.nycartc.com/",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition and Save NYC Spaces coalition, 'Save NYC Spaces: New Nightlife Mayor Must Assist Diverse Cultures.'",
      publicNote: "Public campaign surface preserving a multi-organization agenda, participant statements, media materials, and Jamie's attribution as NYC Artist Coalition.",
      supportsGenerally: [
        "a public Save NYC Spaces campaign agenda",
        "demands concerning criminalization, support, displacement, representation, and MARCH transparency",
        "Jamie participated under NYC Artist Coalition attribution",
        "the campaign centered neighborhood-scale cultural access",
        "the site preserves a curated press index of eight articles"
      ],
      doesNotEstablish: [
        "Jamie's authorship of every campaign statement",
        "sole coalition leadership",
        "that every demand was enacted",
        "complete event-production responsibility"
      ]
    },
    {
      id: "SRC-NYCA-EDGE-OF-SOUND-TOWN-HALL-2017-10-14",
      title: "#SaveNYCSpaces Means Protecting the City's Most Vulnerable Populations",
      organization: "Edge of Sound",
      author: "Kristine Villanueva",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-10-14",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://medium.com/edge-of-sound/savenycspaces-means-protecting-the-citys-most-vulnerable-populations-9f7395138bae",
      preferredPublicUrl: "canonical",
      publicCitation: "Kristine Villanueva, '#SaveNYCSpaces Means Protecting the City's Most Vulnerable Populations,' Edge of Sound, October 14, 2017.",
      publicNote: "Independent event reporting identifies NYC Artist Coalition as organizer, quotes Jamie on cultural-space purpose and continuing public dialogue, and situates the town hall at Market Hotel.",
      supportsGenerally: [
        "NYC Artist Coalition organized the Market Hotel event",
        "Jamie publicly articulated the community-space purpose",
        "Jamie described continued dialogue with the Office of Nightlife",
        "the event centered affordability, inclusion, and safety"
      ],
      doesNotEstablish: [
        "Jamie's complete production role",
        "sole authorship of the event agenda",
        "sole causality for policy outcomes",
        "that all attendees endorsed every position"
      ]
    },
    {
      id: "SRC-NYCA-MIXMAG-CABARET-2017-09-20",
      title: "Let NYC dance: The battle to save New York City's nightlife",
      organization: "Mixmag",
      author: "Miranda Bryant",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-09-20",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://mixmag.net/feature/let-nyc-dance-the-battle-to-save-new-york-citys-nightlife",
      preferredPublicUrl: "canonical",
      publicCitation: "Miranda Bryant, 'Let NYC dance: The battle to save New York City's nightlife,' Mixmag, September 20, 2017.",
      publicNote: "Independent music-industry reporting places Jamie at the repeal hearing as an NYC Artist Coalition member and preserves his warning about discriminatory third-party complaints against community spaces.",
      supportsGenerally: [
        "Jamie testified at the Cabaret Law repeal hearing",
        "Jamie was identified with NYC Artist Coalition",
        "Jamie described discriminatory use of the law against community spaces",
        "the hearing was part of a broader collective repeal campaign"
      ],
      doesNotEstablish: [
        "that Jamie led the complete repeal campaign",
        "sole causality for repeal",
        "that repeal resolved all nightlife regulation",
        "the accuracy of every industry-wide estimate in the article"
      ]
    },
    {
      id: "SRC-CLAUDETTE-MICHAEL-REES-AR",
      title: "Claudette's Theatre on Wheels",
      organization: "Studio Michael Rees / ad hoc",
      author: "Michael Rees",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://michaelrees.org/claudette",
      preferredPublicUrl: "canonical",
      publicCitation: "Michael Rees, 'Claudette's Theatre on Wheels,' Studio Michael Rees / ad hoc.",
      publicNote: "Collaborator-authored project page documenting Jamie and Michael Rees's augmented-reality collaboration and Jamie's shared video-production work.",
      supportsGenerally: [
        "Jamie and Michael Rees collaborated on an augmented-reality experience for Make Use Visible Munich",
        "Jamie shared video-production credit with Anne Dufy Burkart and Julia Fredenburg",
        "the experience used short video clips in an app-based portrait of Claudette"
      ],
      doesNotEstablish: [
        "Jamie's sole authorship of the AR application",
        "the exact software stack",
        "audience or adoption metrics",
        "rights clearance for every embedded media asset"
      ]
    },
    {
      id: "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-ACCOUNT-2026-07-15",
      title: "Jamie Burkart first-person clarification of KC Town Hall stewardship transition",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-15",
      accessedAt: "2026-07-15",
      publicCitation: "Jamie Burkart, first-person clarification of KC Town Hall stewardship transition, July 15, 2026 (protected source).",
      publicNote: "First-person account that Jamie concluded his active KC Town Hall role by transitioning project stewardship to an organization he regarded as mission-aligned.",
      supportsGenerally: [
        "Jamie's reported transition of KC Town Hall project stewardship",
        "Jamie's reported intent to place the project with a mission-aligned organization rather than leave it without a handoff"
      ],
      doesNotEstablish: [
        "independent corroboration of the transition",
        "the receiving organization's identity, consent to be named, legal role, or current status",
        "the date, terms, assets, responsibilities, or outcomes of the transition",
        "a causal or organizational relationship between the stewardship transition and the later municipal funding withdrawal"
      ],
      protectedLocatorId: "LOC-KC-TOWN-HALL-JAMIE-TRANSITION-ACCOUNT-2026-07-15"
    },
    {
      id: "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
      title: "KC Town Hall Central City Economic Development grant proposal and support letters",
      organization: "KC Town Hall",
      author: "Jamie Burkart and Julia Fredenburg",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2019-03-25",
      accessedAt: "2026-07-15",
      publicCitation: "KC Town Hall, Central City Economic Development grant proposal and support letters, 2019 (protected project record).",
      publicNote: "Contemporaneous proposal naming Jamie and Julia Fredenburg as founders and project managers, documenting the Phase One cold-shell scope as completed in 2019, identifying the project team, and describing a neighborhood survey that shaped the proposal.",
      supportsGenerally: [
        "Jamie Burkart and Julia Fredenburg were identified as KC Town Hall founders and project managers",
        "the proposal identified historic masonry, architecture, roofing, concrete, electrical, and legal team members",
        "the proposal marked Phase One cold-shell work as completed in 2019",
        "Phase One included roof, masonry, floor-framing, water-service, access, safety, site, and materials work",
        "KC Town Hall conducted a neighborhood survey with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church",
        "the proposal stated that survey results directly shaped the proposal"
      ],
      doesNotEstablish: [
        "that Jamie held a licensed general-contractor credential",
        "that Jamie alone completed or managed every Phase One task",
        "independent third-party certification of every completion or cost statement",
        "that Phase Two was completed",
        "permission to publish financial, contact, support-letter, or other protected details from the source"
      ],
      protectedLocatorId: "LOC-KC-TOWN-HALL-CCED-PROPOSAL-2019"
    },
    {
      id: "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15",
      title: "Jamie Burkart first-person account of KC Town Hall and neighborhood work",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-15",
      accessedAt: "2026-07-15",
      publicCitation: "Jamie Burkart, first-person account of KC Town Hall Phase One and related Kansas City neighborhood work, July 15, 2026 (protected source).",
      publicNote: "First-person account preserving Jamie's day-to-day construction coordination, participatory survey, TiredOfTires, and Cleveland Avenue Unify to Beautify contributions for corroboration and bounded public use.",
      supportsGenerally: [
        "Jamie's reported day-to-day general-contractor role during Phase One",
        "Jamie's reported coordination of multiple specialist trades and professional teams",
        "Jamie's reported authorship of the neighborhood survey handbill and data-collection system",
        "Jamie's reported design and monthly operations role in TiredOfTires",
        "Jamie's reported co-founding and design role in Cleveland Avenue Unify to Beautify"
      ],
      doesNotEstablish: [
        "independent corroboration of the general-contractor title, legal status, or licensing",
        "independent verification of monthly tire totals, dates, or geographic expansion",
        "independent verification of Jamie's exact Cleveland Avenue responsibilities or funding influence",
        "sole authorship of collective neighborhood work",
        "Pastor Lee's corridor concept as Jamie's idea"
      ],
      protectedLocatorId: "LOC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15"
    },
    {
      id: "SRC-KC-TOWN-HALL-CCED-MINUTES-2019",
      title: "Central City Economic Development Sales Tax Board minutes",
      organization: "City of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000",
      preferredPublicUrl: "canonical",
      publicCitation: "City of Kansas City, Missouri, Central City Economic Development Sales Tax Board minutes, 2019.",
      publicNote: "Official record identifies Jamie as KC Town-Hall presenter, describes the adaptive-reuse proposal, and records a unanimous recommendation to City Council for $490,539 in funding.",
      supportsGenerally: [
        "Jamie presented the KC Town-Hall proposal",
        "the proposal concerned four retail spaces and three apartment units",
        "the board recommended the project to City Council",
        "the recommended funding amount was $490,539"
      ],
      doesNotEstablish: [
        "final City Council approval",
        "funds received or spent",
        "current property status",
        "Jamie's sole responsibility for the project"
      ]
    },
    {
      id: "SRC-KC-TOWN-HALL-RESOLUTION-190649",
      title: "Second Committee Substitute for Resolution No. 190649",
      organization: "Council of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-09-26",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=44A50FFC-321A-41C7-9A86-6ADD9083B156&ID=5515936&Options=&Search=",
      assetUrl: "https://kansascity.legistar.com/View.ashx?M=F&ID=10628240&GUID=2CBC09C0-65EC-4F05-A70F-FCD8E4F7FBE3&G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A",
      preferredPublicUrl: "canonical",
      publicCitation: "Council of Kansas City, Missouri, Second Committee Substitute for Resolution No. 190649, adopted September 26, 2019.",
      publicNote: "The official history records adoption as substituted. The authenticated resolution accepts the CCED Board's $490,539 recommendation and authorizes negotiation of a funding agreement with KC Town Hall.",
      supportsGenerally: [
        "the Council accepted the CCED Board's KC Town Hall recommendation",
        "the accepted amount was not to exceed $490,539",
        "the City Manager was authorized to negotiate a funding agreement",
        "the Council action occurred on September 26, 2019"
      ],
      doesNotEstablish: [
        "that a funding agreement was executed",
        "that funds were received, disbursed, or spent",
        "that the project was completed",
        "Jamie's individual role in securing the Council action"
      ]
    },
    {
      id: "SRC-KC-TOWN-HALL-ORDINANCE-190642",
      title: "Committee Substitute for Ordinance No. 190642",
      organization: "Council of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-09-26",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=B387009F-F7F7-454D-950A-E44588056314&ID=5515929&Options=&Search=",
      assetUrl: "https://kansascity.legistar.com/View.ashx?M=F&ID=10628353&GUID=DAED2DE7-AA03-43D8-B1C9-448EA4DAEEB2&G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A",
      preferredPublicUrl: "canonical",
      publicCitation: "Council of Kansas City, Missouri, Committee Substitute for Ordinance No. 190642, passed September 26, 2019.",
      publicNote: "The official history records passage as substituted. Section 2 of the authenticated ordinance appropriates $490,539 to KC Town Hall within the Central City Sales Tax-Projects account.",
      supportsGenerally: [
        "the Council passed the ordinance as substituted on September 26, 2019",
        "the ordinance appropriated $490,539 to KC Town Hall",
        "the appropriation followed the Central City Sales Tax Board's Round Two recommendations"
      ],
      doesNotEstablish: [
        "that appropriated funds were received, disbursed, or spent",
        "that a funding agreement was executed",
        "that the project was completed",
        "Jamie's individual role in securing the Council vote"
      ]
    },
    {
      id: "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
      title: "Central City Sales Tax Project Updates - May 17, 2022",
      organization: "City of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2022-05-17",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://clerk.kcmo.gov/View.ashx?GUID=C851CE5D-2041-4E27-9967-26DB1BFD1D4F&ID=10918035&M=F",
      preferredPublicUrl: "canonical",
      publicCitation: "City of Kansas City, Missouri, 'Central City Sales Tax Project Updates,' May 17, 2022.",
      publicNote: "The official status table lists a $490,539 CCED budget for KC Town Hall, no disbursed amount, and General Services negotiating the funding agreement as of May 17, 2022.",
      supportsGenerally: [
        "the KC Town Hall CCED budget remained $490,539",
        "no funds were reported as disbursed as of May 17, 2022",
        "the funding agreement remained under negotiation as of that date"
      ],
      doesNotEstablish: [
        "what occurred after May 17, 2022",
        "the reasons for the negotiation timeline",
        "that no other public or private funding existed",
        "individual responsibility for the project's status"
      ]
    },
    {
      id: "SRC-KC-TOWN-HALL-ORDINANCE-240317",
      title: "Ordinance No. 240317",
      organization: "Council of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2024-03-28",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://clerk.kcmo.gov/LegislationDetail.aspx?GUID=E3F31A7F-65F8-464E-ABD4-197DEB6D80C8&ID=6586846&Options=&Search=",
      preferredPublicUrl: "canonical",
      publicCitation: "Council of Kansas City, Missouri, Ordinance No. 240317, passed March 28, 2024.",
      publicNote: "This later official record confirms Ordinance 190642's $490,539 KC Town Hall appropriation, states that the project withdrew, and reduces the full project account so the unused funds can be returned to the Central City Sales Tax Fund.",
      supportsGenerally: [
        "retrospective confirmation of the 2019 $490,539 appropriation",
        "KC Town Hall later withdrew from the project",
        "the Council reclaimed the full $490,539 project appropriation in 2024"
      ],
      doesNotEstablish: [
        "the reasons for withdrawal",
        "individual responsibility for the withdrawal",
        "that the 2019 Council appropriation did not occur",
        "the status of any unrelated funding or property interest"
      ]
    },
    {
      id: "SRC-KC-EIGHTH-STREET-TUNNEL-KCUR-2016-09-15",
      title: "The 8th Street Tunnel Is A Gateway To Kansas City's History",
      organization: "KCUR",
      author: "Cody Newill",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-09-15",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
      preferredPublicUrl: "canonical",
      publicCitation: "Cody Newill, 'The 8th Street Tunnel Is A Gateway To Kansas City's History,' KCUR, September 15, 2016.",
      publicNote: "Independent public-radio reporting documents Jamie's 2006 participatory route and film screening in the tunnel and his public-history rationale.",
      supportsGenerally: [
        "Jamie led participants through downtown Kansas City to a tunnel screening",
        "Jamie programmed and projected three films in the tunnel",
        "the program connected transit history, artistic space, and public access",
        "Jamie advocated educational public access to the tunnel"
      ],
      doesNotEstablish: [
        "that the event had current authorization requirements",
        "a complete participant count",
        "that Jamie owned or controlled the tunnel",
        "that public access is currently safe or permitted"
      ]
    },
    {
      id: "SRC-WATERWAYS-PITCH-GULF-2009-09-03",
      title: "Former Huck Finn artist now working in a pink, plastic bubble",
      organization: "The Pitch",
      author: "Carolyn Szczepanski",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2009-09-03",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.thepitchkc.com/former-huck-finn-artist-now-working-in-a-pink-plastic-bubble/",
      preferredPublicUrl: "canonical",
      publicCitation: "Carolyn Szczepanski, 'Former Huck Finn artist now working in a pink, plastic bubble,' The Pitch, September 3, 2009.",
      publicNote: "Independent follow-up reporting confirms that Jamie and collaborators reached the Gulf of Mexico four months after departing Kansas City and connects the expedition to Great Accommodations.",
      supportsGenerally: [
        "the collaborative raft expedition reached the Gulf of Mexico",
        "the journey lasted four months",
        "the raft was bicycle-propelled and built from recycled materials",
        "the expedition informed Great Accommodations"
      ],
      doesNotEstablish: [
        "that Jamie completed the expedition alone",
        "a complete route log",
        "a complete participant roster",
        "every later waterways project"
      ]
    },
    {
      id: "SRC-KC-FRONTIER-DREAMERS-2012-05-17",
      title: "We Can Be Dreamers",
      organization: "The Frontier / Charlotte Street",
      author: "Julia Cole",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2012-05-17",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://thefrontierkc.wordpress.com/2012/05/17/we-can-be-dreamers/",
      preferredPublicUrl: "canonical",
      publicCitation: "Julia Cole, 'We Can Be Dreamers,' The Frontier / Charlotte Street, May 17, 2012.",
      publicNote: "Institutional project archive documents Jamie's interviews, reenactment sessions, video, and public program concerning youth, public space, curfews, and the urban commons.",
      supportsGenerally: [
        "Jamie conducted interviews and reenactment sessions",
        "Jamie created a short video from reporting and original interviews",
        "the project convened public discussion with a council member and ACLU legal director",
        "the work connected public-space rules with community imagination"
      ],
      doesNotEstablish: [
        "that Jamie alone organized The Frontier",
        "that every participant shared Jamie's interpretation",
        "that the planned pamphlet was completed",
        "current legal guidance concerning public assembly"
      ]
    }
  ],
  observations: [
    ...wowlistXCorpusObservations,
    ...nycaPressObservations,
    ...icloudTeamsObservations,
    ...googleDriveObservations,
    ...nterChngArchiveObservations,
    ...socialAccountArchiveObservations,
    ...callnycXCorpusObservations,
    {
      id: "OBS-CALLNYC-MATHIEU-EUGENE-AMPLIFICATION",
      sourceId: "SRC-CALLNYC-X-TIMELINE-PDF-2026-07-11",
      project: "callnyc",
      text: "The captured timeline visibly preserves an October 4, 2016, post from Dr. Mathieu Eugene quoting CallNYC's October 3 HPD Housing Lottery award post.",
      locator: "PDF page 1, captured timeline near the top",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS"],
      researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex PDF text and visual review"]
    },
    {
      id: "OBS-CALLNYC-HELEN-ROSENTHAL-PROMOTION",
      sourceId: "SRC-CALLNYC-X-TIMELINE-PDF-2026-07-11",
      project: "callnyc",
      text: "The captured timeline visibly preserves a September 27, 2016, post from Helen Rosenthal directing readers to find their Council member through callnyc.org; CallNYC reposted that post.",
      locator: "PDF page 1, captured timeline below the first recommendation module",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS"],
      researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex PDF text and visual review"]
    },
    {
      id: "OBS-WATERWAYS-PITCH-RAFT-ORIGIN",
      sourceId: "SRC-WATERWAYS-PITCH-2007-08-09",
      project: "waterways-participatory-art",
      text: "The Pitch reported that Jamie conceived the experiential boat expedition while investigating Kansas City's transportation history and its diminished relationship with the Missouri River.",
      locator: "Article body, opening project-history paragraphs",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-WATERWAYS-RAFT-EXPEDITION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-WATERWAYS-PITCH-MISSOURI-CROSSING",
      sourceId: "SRC-WATERWAYS-PITCH-2007-08-09",
      project: "waterways-participatory-art",
      text: "The Pitch documented a group of Kansas City and California participants crossing Missouri on a homemade raft built from recycled materials.",
      locator: "Article summary and opening body",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-WATERWAYS-RAFT-EXPEDITION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-WATERWAYS-CHARLOTTE-EXPEDITION",
      sourceId: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
      project: "waterways-participatory-art",
      text: "Charlotte Street's project history records Jamie describing a four-month bicycle-powered paddle-wheel raft journey from Kansas City down the Missouri and Mississippi until the water tasted salty.",
      locator: "Great Accommodations project description, prior-expedition section",
      status: "verified",
      confidence: "moderate",
      claimIds: ["CLM-WATERWAYS-RAFT-EXPEDITION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-WATERWAYS-CHARLOTTE-PARTICIPATION",
      sourceId: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
      project: "waterways-participatory-art",
      text: "Great Accommodations invited people across river cities to contribute stories and perspectives through mailed letters, targeted outreach, public programs, and facilitated participation.",
      locator: "Great Accommodations project description, outreach and public-program sections",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-WATERWAYS-GREAT-ACCOMMODATIONS"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-WATERWAYS-CHARLOTTE-INSTALLATION",
      sourceId: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
      project: "waterways-participatory-art",
      text: "The institutional description identifies interactive video, participatory sculpture, computer programs, community projects, recycled materials, public programs, facilitation, and working documentation as parts of the exhibition.",
      locator: "Great Accommodations exhibition-format section",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-WATERWAYS-GREAT-ACCOMMODATIONS"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-OPEN-HOUSE-GALLERY-RESIDENCY",
      sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
      project: "open-house",
      text: "Good Times reported that Jamie turned a UCSC gallery allocation into a ten-day public experiment in communal living and open participation.",
      locator: "Article headline and opening project description",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAMS"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-OPEN-HOUSE-SHOP-SHOWS",
      sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
      project: "open-house",
      text: "The article documents earlier Shop Shows held by Jamie and housemates from 2003 to 2005, where visitors were invited to contribute work, perform, share food, and shape the event.",
      locator: "Shop Shows section",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAMS"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-OPEN-HOUSE-DOCUMENTATION",
      sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
      project: "open-house",
      text: "Good Times describes participants maintaining detailed records of daily activity and using the project as a setting for dialogue, revision, and collective interpretation.",
      locator: "Open House activity and documentation sections",
      status: "verified",
      confidence: "moderate",
      claimIds: ["CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAMS"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-FIRE-CODE-STUDY-GROUPS",
      sourceId: "SRC-NYCA-GOTHAMIST-CABARET-2017-06-19",
      project: "nyc-artist-coalition",
      text: "Gothamist directly reported that Jamie organized fire-code study groups for New York City DIY venues.",
      locator: "Article opening paragraph",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-CABARET-LAW-CONTRIBUTION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-CABARET-RALLY",
      sourceId: "SRC-NYCA-GOTHAMIST-CABARET-2017-06-19",
      project: "nyc-artist-coalition",
      text: "Gothamist directly identified Jamie as an NYC Artist Coalition member rallying at City Hall for full Cabaret Law repeal and articulating a safety concern for small venues.",
      locator: "Article opening and Jamie attribution",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-CABARET-LAW-CONTRIBUTION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-CABARET-TESTIMONY",
      sourceId: "SRC-NYCA-COUNCIL-CABARET-HEARING-2017-06-19",
      project: "nyc-artist-coalition",
      text: "The Council transcript records Jamie identifying himself with NYC Artist Coalition, calling for repeal, and asking for low-income communities to have representation in nightlife governance.",
      locator: "Committee transcript pages 199-202",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-CABARET-LAW-CONTRIBUTION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-CABARET-REPEAL-ENACTED",
      sourceId: "SRC-NYCA-LEGISTAR-CABARET-REPEAL-2017",
      project: "nyc-artist-coalition",
      text: "The Council record confirms that Introduction 1652 was approved on October 31 and signed as Local Law 214 on November 27, 2017, repealing cabaret licensing requirements while retaining specified safety measures.",
      locator: "Legislation details and enactment history",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-CABARET-LAW-CONTRIBUTION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-OFFICE-NIGHTLIFE-ENACTED",
      sourceId: "SRC-NYCA-MOME-OFFICE-NIGHTLIFE-2017-09-19",
      project: "nyc-artist-coalition",
      text: "The city record confirms that legislation establishing the Office of Nightlife was signed on September 19, 2017.",
      locator: "Press release opening and office-description section",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL"],
      researchInquiryIds: ["INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-TOWN-HALL-SPEARHEADED",
      sourceId: "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
      project: "nyc-artist-coalition",
      text: "Bedford + Bowery reported that NYC Artist Coalition spearheaded the Market Hotel town hall and described the coalition as instrumental in Office of Nightlife and Cabaret Law advocacy.",
      locator: "Town-hall opening and coalition-history paragraphs",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL"],
      researchInquiryIds: ["INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-TOWN-HALL-JAMIE-PARTICIPATION",
      sourceId: "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
      project: "nyc-artist-coalition",
      text: "The same report identifies Jamie and Olympia Kazi as NYC Artist Coalition participants who had spoken at hearings or town halls.",
      locator: "Town-hall participant paragraph",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL"],
      researchInquiryIds: ["INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-TALKS-NOT-RAIDS-POSITION",
      sourceId: "SRC-NYCA-TALKS-NOT-RAIDS",
      project: "nyc-artist-coalition",
      text: "The public campaign advocated trust, communication, transparency, and relationship-based safety work instead of disruptive MARCH raids.",
      locator: "Campaign overview and coalition statement",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-TALKS-NOT-RAIDS-LONG-ARC"],
      researchInquiryIds: ["INQ-NYCA-MARCH-CAUSAL-LINK-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-MARCH-TRANSPARENCY-LAW",
      sourceId: "SRC-NYCA-LEGISTAR-MARCH-TRANSPARENCY-2019",
      project: "nyc-artist-coalition",
      text: "Local Law 220 established MARCH reporting and advance-notice provisions and gave establishments an opportunity to provide relevant information before many operations.",
      locator: "Legislation summary and enactment details",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-TALKS-NOT-RAIDS-LONG-ARC"],
      researchInquiryIds: ["INQ-NYCA-MARCH-CAUSAL-LINK-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-MARCH-REPLACED-BY-CURE",
      sourceId: "SRC-NYCA-MAYOR-CURE-2023-12-28",
      project: "nyc-artist-coalition",
      text: "The Mayor's Office announced that CURE replaced MARCH with an engagement-first process emphasizing communication and opportunities to correct issues before enforcement.",
      locator: "Press release opening and program-description section",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-TALKS-NOT-RAIDS-LONG-ARC"],
      researchInquiryIds: ["INQ-NYCA-MARCH-CAUSAL-LINK-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-SUNDAY-DINNER-GREENE-HILL-WEEKLY-OPEN",
      sourceId: "SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017-12-19",
      project: "196-sunday-dinner",
      text: "Greene Hill Food Co-op documented that Jamie and Julie hosted Sunday-night dinners every week in their Brooklyn apartment and that the dinners were open to the community.",
      locator: "Profile introduction and Q&A",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-SUNDAY-DINNER-WEEKLY-OPEN-GATHERING"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-GREENE-HILL-WOWLIST-CABARET",
      sourceId: "SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017-12-19",
      project: "nyc-artist-coalition",
      text: "The same profile records Jamie and Julie maintaining WOW List and working as part of NYC Artist Coalition on Cabaret Law repeal while inviting readers into dialogue about the Office of Nightlife.",
      locator: "Profile introduction and outside-work Q&A",
      status: "verified",
      confidence: "high",
      claimIds: [
        "CLM-NYCA-CABARET-LAW-CONTRIBUTION",
        "CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL"
      ],
      researchInquiryIds: ["INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-BEDFORD-ORGANIZER-MUTUAL-AID",
      sourceId: "SRC-NYCA-BEDFORD-BOWERY-DIY-SPACES-2017-02-07",
      project: "nyc-artist-coalition",
      text: "Bedford + Bowery identified Jamie as an NYC Artist Coalition organizer at a coalition-organized safety and policy meeting and reported that more than 100 people had signed up for the coalition's mutual-aid network.",
      locator: "Opening meeting description and Jamie quotation",
      status: "verified",
      confidence: "high",
      claimIds: [
        "CLM-NYCA-MUTUAL-AID-ORGANIZER-ROLE",
        "CLM-NYCA-COFOUNDER-ROLE"
      ],
      researchInquiryIds: ["INQ-NYCA-COFOUNDER-ROLE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-SAVE-SPACES-PUBLIC-AGENDA",
      sourceId: "SRC-NYCA-SAVE-NYC-SPACES-SITE",
      project: "nyc-artist-coalition",
      text: "The public Save NYC Spaces surface preserves an inter-organizational agenda addressing criminalization, practical support, displacement, representation, and MARCH transparency, and attributes Jamie to NYC Artist Coalition.",
      locator: "Campaign agenda, participant statements, coalition, and media sections",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL"],
      researchInquiryIds: ["INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-EDGE-TOWN-HALL-ORGANIZING",
      sourceId: "SRC-NYCA-EDGE-OF-SOUND-TOWN-HALL-2017-10-14",
      project: "nyc-artist-coalition",
      text: "Edge of Sound reported that NYC Artist Coalition organized the Market Hotel event and quoted Jamie explaining its cultural-space purpose and commitment to continuing public dialogue.",
      locator: "Event description and Jamie quotations",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL"],
      researchInquiryIds: ["INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-MIXMAG-HEARING-TESTIMONY",
      sourceId: "SRC-NYCA-MIXMAG-CABARET-2017-09-20",
      project: "nyc-artist-coalition",
      text: "Mixmag placed Jamie at the Cabaret Law repeal hearing as an NYC Artist Coalition member and preserved his argument that discriminatory third-party complaints could be used to target community spaces.",
      locator: "Cabaret Law hearing section",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-CABARET-LAW-CONTRIBUTION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-CLAUDETTE-AR-COLLABORATION",
      sourceId: "SRC-CLAUDETTE-MICHAEL-REES-AR",
      project: "claudettes-theatre-on-wheels",
      text: "Michael Rees documents collaborating with Jamie on an augmented-reality experience for Make Use Visible Munich, with Jamie sharing video-production credit with Anne Dufy Burkart and Julia Fredenburg.",
      locator: "Project description and collaborator credits",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-CLAUDETTE-AR-COLLABORATION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-ACCOUNT",
      sourceId: "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-ACCOUNT-2026-07-15",
      project: "kc-town-hall",
      text: "Jamie reports that when he concluded his active KC Town Hall role, he transitioned project stewardship to an organization he regarded as mission-aligned.",
      locator: "First-person clarification, stewardship-transition statement",
      status: "provisional",
      confidence: "moderate",
      claimIds: ["CLM-KC-TOWN-HALL-STEWARDSHIP-TRANSITION"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex intake review"]
    },
    {
      id: "OBS-KC-TOWN-HALL-PROPOSER-TEAM-2019",
      sourceId: "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
      project: "kc-town-hall",
      text: "The 2019 proposal identifies Jamie Burkart and Julia Fredenburg as founders and project managers and presents named specialists for historic masonry restoration, architecture, roofing, concrete, electrical work, and legal counsel.",
      locator: "PDF page 2, Project Narrative page 1, 'Proposer'",
      status: "verified",
      confidence: "high",
      claimIds: [
        "CLM-KC-TOWN-HALL-PHASE-ONE-COMPLETION",
        "CLM-KC-TOWN-HALL-GENERAL-CONTRACTOR-ROLE"
      ],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-CONSTRUCTION-ROLE-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Codex visual PDF review"]
    },
    {
      id: "OBS-KC-TOWN-HALL-PHASE-ONE-COMPLETED-2019",
      sourceId: "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
      project: "kc-town-hall",
      text: "The proposal labels Phase One's cold-shell work 'Completed 2019' and itemizes roof deck repair, insulation and TPO membrane, masonry repair, structural floor and ceiling framing, water service, construction storage, trash and tree removal, basement access, materials transport, site safety, air quality, tools, and materials.",
      locator: "PDF pages 11-12, Finance pages 10-11, 'Summary of Budget and Financing' and 'Phase One: Cold Shell - Completed 2019'",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-KC-TOWN-HALL-PHASE-ONE-COMPLETION"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-CONSTRUCTION-ROLE-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Codex visual PDF review"]
    },
    {
      id: "OBS-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY-2019",
      sourceId: "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
      project: "kc-town-hall",
      text: "The proposal reproduces a KC Town Hall neighborhood survey handbill, identifies Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as survey partners, and states that residents' responses directly shaped the proposal.",
      locator: "PDF page 4, Project Narrative page 3, 'Neighborhood Process'",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-KC-TOWN-HALL-PARTICIPATORY-SURVEY"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Codex visual PDF review"]
    },
    {
      id: "OBS-KC-TOWN-HALL-GENERAL-CONTRACTOR-ACCOUNT",
      sourceId: "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15",
      project: "kc-town-hall",
      text: "Jamie reports serving as the day-to-day general contractor for Phase One, arriving first each morning with measured drawings and survey cards, hiring and coordinating historic brick masonry, roofing, carpentry, welding, engineering, architecture, and plumbing teams, and sequencing work from the basement through the roof deck, including placement of the TPO membrane with the restored parapet and ceramic caps.",
      locator: "First-person account, Phase One construction paragraph",
      status: "provisional",
      confidence: "moderate",
      claimIds: ["CLM-KC-TOWN-HALL-GENERAL-CONTRACTOR-ROLE"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-CONSTRUCTION-ROLE-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex intake review"]
    },
    {
      id: "OBS-KC-TOWN-HALL-SITE-LISTENING-ACCOUNT",
      sourceId: "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15",
      project: "kc-town-hall",
      text: "Jamie reports that daily on-site presence allowed neighborhood histories, needs, and ideas for the long-abandoned building to accumulate over time, and that he created the 4-by-6-inch survey handbill and its backing contact and response system to turn those encounters into participatory planning.",
      locator: "First-person account, site presence and survey-system paragraphs",
      status: "provisional",
      confidence: "moderate",
      claimIds: ["CLM-KC-TOWN-HALL-PARTICIPATORY-SURVEY"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-CONSTRUCTION-ROLE-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex intake review"]
    },
    {
      id: "OBS-KC-TIRED-OF-TIRES-ACCOUNT",
      sourceId: "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15",
      project: "kansas-city-neighborhood-programs",
      text: "Jamie reports that, as an Oak Park Neighborhood Association member, he designed TiredOfTires identity and neighborhood communications, coordinated with Kansas City, conducted free monthly tire pickup, logged each haul in a spreadsheet, and delivered and unloaded tires at the city's East Bottoms recycling center.",
      locator: "First-person account, TiredOfTires paragraphs",
      status: "provisional",
      confidence: "moderate",
      claimIds: ["CLM-KC-TIRED-OF-TIRES-OPERATIONS"],
      researchInquiryIds: ["INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex intake review"]
    },
    {
      id: "OBS-KC-TIRED-OF-TIRES-EXPANSION-ACCOUNT",
      sourceId: "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15",
      project: "kansas-city-neighborhood-programs",
      text: "Jamie reports that TiredOfTires later expanded to include the Indian Mound neighborhood and connected its pickups with neighborhood-association and Chestnut Street Resource Center cleanup communications.",
      locator: "First-person account, TiredOfTires expansion and monthly route paragraphs",
      status: "provisional",
      confidence: "moderate",
      claimIds: ["CLM-KC-TIRED-OF-TIRES-OPERATIONS"],
      researchInquiryIds: ["INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex intake review"]
    },
    {
      id: "OBS-KC-CLEVELAND-UNIFY-TO-BEAUTIFY-ACCOUNT",
      sourceId: "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15",
      project: "kansas-city-neighborhood-programs",
      text: "Jamie reports co-founding Cleveland Avenue Unify to Beautify within the Historic East Neighborhoods Coalition around Pastor Lee's corridor concept, contributing identity design, logo, photography, social media, listening-session maps, resident-reporting tools, and print runs of hundreds of handbills used in meetings that included elected officials; he recalls the resulting corridor context contributing to discretionary capital-improvement discussions.",
      locator: "First-person account, HENC and Cleveland Avenue paragraphs",
      status: "provisional",
      confidence: "moderate",
      claimIds: ["CLM-KC-CLEVELAND-UNIFY-TO-BEAUTIFY"],
      researchInquiryIds: ["INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex intake review"]
    },
    {
      id: "OBS-KC-TOWN-HALL-CCED-RECOMMENDATION",
      sourceId: "SRC-KC-TOWN-HALL-CCED-MINUTES-2019",
      project: "kc-town-hall",
      text: "Kansas City board minutes identify Jamie as presenter of a KC Town-Hall adaptive-reuse proposal and record a unanimous recommendation to City Council for $490,539 in funding.",
      locator: "Proposal table and June 13, 2019 recommendation motion",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-KC-TOWN-HALL-FUNDING-RECOMMENDATION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-KC-TOWN-HALL-COUNCIL-RESOLUTION-190649",
      sourceId: "SRC-KC-TOWN-HALL-RESOLUTION-190649",
      project: "kc-town-hall",
      text: "On September 26, 2019, the Kansas City Council adopted Resolution 190649 as substituted, accepting the CCED Board's recommendation to fund KC Town Hall in an amount not to exceed $490,539 and authorizing negotiation of a funding agreement.",
      locator: "Legislative history and authenticated resolution, title and Sections 1-2",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-FUNDING-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-KC-TOWN-HALL-COUNCIL-APPROPRIATION-190642",
      sourceId: "SRC-KC-TOWN-HALL-ORDINANCE-190642",
      project: "kc-town-hall",
      text: "On September 26, 2019, the Kansas City Council passed Ordinance 190642 as substituted; Section 2 appropriated $490,539 to KC Town Hall in the Central City Sales Tax-Projects account.",
      locator: "Legislative history and authenticated ordinance, Section 2 project table",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-FUNDING-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-KC-TOWN-HALL-CCED-UPDATE-2022",
      sourceId: "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
      project: "kc-town-hall",
      text: "Kansas City's May 17, 2022 CCED update listed the $490,539 KC Town Hall budget with no funds disbursed and described the funding agreement as still under negotiation.",
      locator: "KC Town Hall row in the May 17, 2022 project-status table",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-FUNDING-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-KC-TOWN-HALL-WITHDRAWAL-CLAWBACK-240317",
      sourceId: "SRC-KC-TOWN-HALL-ORDINANCE-240317",
      project: "kc-town-hall",
      text: "In 2024, Kansas City recorded that KC Town Hall had withdrawn and passed Ordinance 240317 reducing the full $490,539 project account so the unused appropriation could be returned to the Central City Sales Tax Fund.",
      locator: "Ordinance 240317 title, recitals, and Section 1",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-FUNDING-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-KC-TUNNEL-SCREENING",
      sourceId: "SRC-KC-EIGHTH-STREET-TUNNEL-KCUR-2016-09-15",
      project: "kansas-city-public-programs",
      text: "KCUR documented Jamie leading participants through downtown Kansas City to a three-film screening he programmed in the 8th Street Tunnel and connected the event to public history and future educational access.",
      locator: "Tunnel rediscovery and Jamie program section",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-KC-EIGHTH-STREET-TUNNEL-PROGRAM"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-WATERWAYS-PITCH-GULF-COMPLETION",
      sourceId: "SRC-WATERWAYS-PITCH-GULF-2009-09-03",
      project: "waterways-participatory-art",
      text: "The Pitch's 2009 follow-up reported that Jamie and collaborators reached the Gulf of Mexico four months after departing Kansas City on their bicycle-propelled raft.",
      locator: "Opening expedition recap",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-WATERWAYS-RAFT-EXPEDITION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-KC-FRONTIER-DREAMERS",
      sourceId: "SRC-KC-FRONTIER-DREAMERS-2012-05-17",
      project: "kansas-city-public-programs",
      text: "The Frontier archive documents Jamie conducting interviews and reenactment sessions, making a short research video, and contributing to a public program about youth, curfews, assembly, and the urban commons.",
      locator: "Project statement, video description, and public-program recap",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-KC-FRONTIER-PUBLIC-SPACE-PROGRAM"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    }
  ],
  claims: [
    ...wowlistXCorpusClaims,
    ...nycaPressClaims,
    ...icloudTeamsClaims,
    ...googleDriveClaims,
    ...nterChngArchiveClaims,
    ...socialAccountArchiveClaims,
    ...callnycXCorpusClaims,
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
    {
      id: "CLM-WATERWAYS-RAFT-EXPEDITION",
      project: "waterways-participatory-art",
      internalClaim: "Jamie conceived and organized a collaborative bicycle-powered raft expedition built from recycled materials that traveled from Kansas City down the Missouri and Mississippi to the Gulf of Mexico over four months, using the river as a setting for public encounter and inquiry.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "Jamie conceived and organized a collaborative, bicycle-powered raft expedition from Kansas City down the Missouri and Mississippi to the Gulf of Mexico over four months, connecting river travel, recycled construction, public encounter, and inquiry into how cities relate to their waterways.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/waterways-and-participatory-art"]
      }],
      evidence: [
        {
          sourceId: "SRC-WATERWAYS-PITCH-2007-08-09",
          relationship: "direct-support",
          supports: ["Jamie's conception and organization", "recycled-material raft", "Missouri River journey", "Kansas City waterways inquiry"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
          relationship: "corroborating",
          supports: ["bicycle-powered paddle-wheel design", "four-month duration", "travel down the Missouri and Mississippi", "public encounter along the route"],
          confidence: "moderate",
          renderCitation: true
        },
        {
          sourceId: "SRC-WATERWAYS-PITCH-GULF-2009-09-03",
          relationship: "corroborating",
          supports: ["Gulf of Mexico endpoint", "four-month duration", "collaborative expedition", "connection to Great Accommodations"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Describe the expedition as collaborative; do not erase fellow travelers or hosts.",
        "Do not imply that the recovered sources provide a complete route log or participant roster."
      ],
      antiClaims: [
        "Jamie completed the expedition alone.",
        "The recovered sources establish every participant or stop."
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-WATERWAYS-GREAT-ACCOMMODATIONS",
      project: "waterways-participatory-art",
      internalClaim: "Jamie spearheaded Great Accommodations, a multi-component participatory project that treated river systems as social infrastructure and invited people across river cities to contribute stories, perspectives, and public programs.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "Jamie spearheaded Great Accommodations, using exhibitions, correspondence, public programs, facilitation, video, sculpture, software, community projects, and working documentation to help people imagine relationships among river cities.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/waterways-and-participatory-art"]
      }],
      evidence: [{
        sourceId: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
        relationship: "direct-support",
        supports: ["Jamie spearheaded the project", "river as social network", "public outreach", "participatory and documentary methods"],
        confidence: "high",
        renderCitation: true
      }],
      boundaries: [
        "Credit Suzanne Hogan and other collaborators when naming their specific contributions.",
        "Do not convert participants' stories into Jamie's authored content."
      ],
      antiClaims: [
        "Jamie alone created every part of Great Accommodations.",
        "The project represented every river community.",
        "All linked images are cleared for publication."
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAMS",
      project: "open-house",
      internalClaim: "Jamie initiated Open House, a ten-day public experiment in communal living inside a UCSC gallery, building on earlier Shop Shows that invited visitors to contribute work, perform, share food, reshape the environment, and document what unfolded.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "Jamie initiated Open House, a ten-day gallery experiment in communal living and public participation, building on Shop Shows where visitors contributed art, performance, food, interpretation, and working documentation.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/waterways-and-participatory-art"]
      }],
      evidence: [{
        sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
        relationship: "direct-support",
        supports: ["Jamie's initiation of Open House", "ten-day communal-living experiment", "Shop Shows history", "open participation and documentation"],
        confidence: "high",
        renderCitation: true
      }],
      boundaries: [
        "Use collective language for housemates, residents, visitors, and participant-created work.",
        "Do not publish participant identities or photographs without appropriate review."
      ],
      antiClaims: [
        "Jamie authored every participant contribution.",
        "The article is a complete attendance or activity record.",
        "Open House was a conventional solo exhibition."
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-NYCA-CABARET-LAW-CONTRIBUTION",
      project: "nyc-artist-coalition",
      internalClaim: "As part of NYC Artist Coalition and a broader nightlife-advocacy movement, Jamie organized fire-code study groups, rallied, and testified for Cabaret Law repeal; independent reporting described the coalition as instrumental in advocacy before the Council enacted repeal in 2017.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "Jamie contributed directly to the collective campaign to repeal New York City's Cabaret Law by organizing fire-code study groups for DIY venues, rallying at City Hall, testifying before the Council, and advancing a safety-and-equity argument through NYC Artist Coalition. Independent reporting described the coalition as instrumental in the advocacy; the Council enacted repeal in 2017.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
      }],
      evidence: [
        ...(nycaPressEvidenceByClaim["CLM-NYCA-CABARET-LAW-CONTRIBUTION"] ?? []),
        {
          sourceId: "SRC-NYCA-GOTHAMIST-CABARET-2017-06-19",
          relationship: "direct-support",
          supports: ["fire-code study groups", "City Hall rally", "Jamie attribution", "NYC Artist Coalition affiliation"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-COUNCIL-CABARET-HEARING-2017-06-19",
          relationship: "direct-support",
          supports: ["Jamie's Council testimony", "call for repeal", "coalition affiliation", "representation request"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
          relationship: "corroborating",
          supports: ["independent description of coalition advocacy as instrumental", "Jamie's coalition participation"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-LEGISTAR-CABARET-REPEAL-2017",
          relationship: "context",
          supports: ["Council approval", "mayoral signature", "repeal outcome"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-NPR-CABARET-2017-09-20",
          relationship: "context",
          supports: ["broader nightlife-advocacy movement", "national reporting context"],
          confidence: "moderate",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-MIXMAG-CABARET-2017-09-20",
          relationship: "corroborating",
          supports: ["Jamie's hearing testimony", "coalition affiliation", "discriminatory enforcement concern"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017-12-19",
          relationship: "corroborating",
          supports: ["contemporaneous coalition participation", "Cabaret Law repeal work", "equity rationale"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "The repeal was a collective political outcome involving advocates, venue operators, communities, Council members, city officials, and other organizations.",
        "Name Jamie's documented actions without assigning him sole causality or legal authorship."
      ],
      antiClaims: [
        "Jamie single-handedly repealed the Cabaret Law.",
        "NYC Artist Coalition alone caused repeal.",
        "Jamie authored Local Law 214.",
        "Repeal removed every zoning or safety rule affecting dancing."
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL",
      project: "nyc-artist-coalition",
      internalClaim: "NYC Artist Coalition helped shape the public conversation around the new Office of Nightlife and spearheaded an October 2017 Market Hotel town hall; reporting identifies Jamie as a participating coalition speaker, but his complete individual production role needs further documentation.",
      status: "use-with-care",
      projections: [{
        key: "archive-note",
        text: "NYC Artist Coalition spearheaded a packed October 2017 Market Hotel town hall where artists, venue operators, officials, and community members articulated expectations for the new Office of Nightlife. Independent reporting identifies Jamie as a participating coalition speaker; research into his complete production role remains open.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
      }],
      evidence: [
        ...(nycaPressEvidenceByClaim["CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL"] ?? []),
        {
          sourceId: "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
          relationship: "direct-support",
          supports: ["coalition spearheaded town hall", "Jamie participation", "coalition advocacy context"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-BUSHWICK-DAILY-NIGHT-MAYOR-2017-10-12",
          relationship: "corroborating",
          supports: ["coalition event organization", "packed Market Hotel setting", "public priorities"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-VILLAGE-VOICE-NIGHT-MAYOR-2017-11-17",
          relationship: "corroborating",
          supports: ["Save NYC Spaces town hall", "city-official participation", "coalition town-hall practice"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-NIGHT-MAYOR-LETTER-2017-09-08",
          relationship: "direct-support",
          supports: ["coalition invitation", "October 11 event", "equity and trust priorities"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-MOME-OFFICE-NIGHTLIFE-2017-09-19",
          relationship: "context",
          supports: ["Office of Nightlife enactment", "official office purpose"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-EDGE-OF-SOUND-TOWN-HALL-2017-10-14",
          relationship: "corroborating",
          supports: ["coalition organized the event", "Jamie's public purpose statement", "commitment to continuing dialogue"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-SAVE-NYC-SPACES-SITE",
          relationship: "direct-support",
          supports: ["public campaign agenda", "coalition breadth", "Jamie's coalition attribution", "representation and access priorities"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017-12-19",
          relationship: "corroborating",
          supports: ["Jamie's coalition participation", "town-hall invitation", "Office of Nightlife equity goals"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Do not present Jamie as the sole creator of the Office of Nightlife or sole producer of the town hall.",
        "Keep Jamie's complete production role open until contemporaneous division-of-labor evidence is recovered."
      ],
      antiClaims: [
        "Jamie single-handedly created the Office of Nightlife.",
        "Jamie alone produced the Market Hotel town hall.",
        "The city adopted every town-hall recommendation."
      ],
      researchInquiryIds: ["INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-NYCA-TALKS-NOT-RAIDS-LONG-ARC",
      project: "nyc-artist-coalition",
      internalClaim: "Talks Not Raids publicly advocated trust, transparency, and communication in place of MARCH raids; the city later enacted MARCH reporting and notice requirements and replaced MARCH with CURE, but the campaign's precise causal contribution to those outcomes needs further documentation.",
      status: "use-with-care",
      projections: [{
        key: "archive-note",
        text: "Talks Not Raids advocated trust, transparency, and communication in place of disruptive MARCH raids. The city later enacted reporting and advance-notice requirements and, in 2023, replaced MARCH with the engagement-first CURE process. The chronology is established; the campaign's precise causal contribution remains an open research question.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
      }],
      evidence: [
        ...(nycaPressEvidenceByClaim["CLM-NYCA-TALKS-NOT-RAIDS-LONG-ARC"] ?? []),
        {
          sourceId: "SRC-NYCA-TALKS-NOT-RAIDS",
          relationship: "direct-support",
          supports: ["campaign position", "trust and communication framing", "MARCH transparency concern"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-LEGISTAR-MARCH-TRANSPARENCY-2019",
          relationship: "context",
          supports: ["reporting requirements", "advance notice", "opportunity to respond"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-MAYOR-CURE-2023-12-28",
          relationship: "context",
          supports: ["MARCH replacement", "CURE engagement-first approach", "NYC Artist Coalition acknowledgement among advocates"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "The sources establish advocacy and later policy outcomes, but not a complete causal chain.",
        "Do not describe CURE as ending all nightlife enforcement."
      ],
      antiClaims: [
        "Jamie single-handedly disbanded MARCH.",
        "Talks Not Raids alone caused Local Law 220 or CURE.",
        "CURE eliminated enforcement.",
        "Every campaign demand was adopted."
      ],
      researchInquiryIds: ["INQ-NYCA-MARCH-CAUSAL-LINK-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-SUNDAY-DINNER-WEEKLY-OPEN-GATHERING",
      project: "196-sunday-dinner",
      internalClaim: "Jamie and Julie Fredenberg hosted a Sunday-night dinner every week in their Brooklyn apartment that was open to the community.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "Jamie and Julie Fredenberg co-hosted a weekly Sunday-night dinner in their Brooklyn apartment that was open to the community, using a recurring rhythm of invitation and hospitality to create space for connection.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/196-sunday-dinner"]
      }],
      evidence: [{
        sourceId: "SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017-12-19",
        relationship: "direct-support",
        supports: ["Jamie and Julie co-hosting", "weekly recurrence", "Brooklyn apartment setting", "open community invitation"],
        confidence: "high",
        renderCitation: true
      }],
      boundaries: [
        "Credit Julie Fredenberg and the participating community.",
        "This source does not verify the portfolio's lifetime gathering or resident-artist totals."
      ],
      antiClaims: [
        "Jamie hosted Sunday Dinner alone.",
        "The public source establishes 300-plus gatherings or 20-plus resident artists.",
        "Participant identities or private records are public."
      ],
      researchInquiryIds: ["INQ-SUNDAY-DINNER-AGGREGATE-HISTORY-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-NYCA-MUTUAL-AID-ORGANIZER-ROLE",
      project: "nyc-artist-coalition",
      internalClaim: "Independent reporting identified Jamie as an NYC Artist Coalition organizer at a coalition safety and policy meeting and documented more than 100 mutual-aid network sign-ups at that point in 2017.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "Independent reporting identified Jamie as an NYC Artist Coalition organizer at a 2017 DIY-space safety and policy meeting and documented more than 100 sign-ups to the coalition's mutual-aid network at that time.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
      }],
      evidence: [{
        sourceId: "SRC-NYCA-BEDFORD-BOWERY-DIY-SPACES-2017-02-07",
        relationship: "direct-support",
        supports: ["organizer attribution", "coalition-organized meeting", "safety and policy agenda", "more than 100 mutual-aid sign-ups"],
        confidence: "high",
        renderCitation: true
      }],
      boundaries: [
        "The network figure is a contemporaneous lower-bound snapshot, not a current membership total.",
        "Meeting and network accomplishments were collective."
      ],
      antiClaims: [
        "Jamie alone created or ran the mutual-aid network.",
        "The coalition currently has the same membership count.",
        "Every meeting proposal became policy."
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-CLAUDETTE-AR-COLLABORATION",
      project: "claudettes-theatre-on-wheels",
      internalClaim: "Jamie collaborated with Michael Rees on an augmented-reality experience for Make Use Visible Munich and shared video-production work with Anne Dufy Burkart and Julia Fredenburg.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "Jamie collaborated with Michael Rees on an augmented-reality experience for Make Use Visible Munich, combining app-based viewing with video Jamie produced alongside Anne Dufy Burkart and Julia Fredenburg.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/claudettes-theatre-on-wheels"]
      }],
      evidence: [{
        sourceId: "SRC-CLAUDETTE-MICHAEL-REES-AR",
        relationship: "direct-support",
        supports: ["Jamie and Michael Rees collaboration", "augmented-reality format", "Make Use Visible Munich", "shared video-production credits"],
        confidence: "high",
        renderCitation: true
      }],
      boundaries: [
        "Preserve Michael Rees's collaboration credit and the shared video-production credits.",
        "Do not infer an unrecovered software stack or sole application authorship."
      ],
      antiClaims: [
        "Jamie single-handedly created the AR project.",
        "Jamie alone produced all video.",
        "The source establishes audience metrics."
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-KC-TOWN-HALL-STEWARDSHIP-TRANSITION",
      project: "kc-town-hall",
      internalClaim: "Jamie reports that when he concluded his active KC Town Hall role, he transitioned project stewardship to an organization he regarded as mission-aligned.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "case-study",
        text: "When Jamie concluded his active role, he transitioned project stewardship to an organization he regarded as mission-aligned.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/kc-town-hall"]
      }],
      evidence: [{
        sourceId: "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-ACCOUNT-2026-07-15",
        relationship: "direct-support",
        supports: ["first-person stewardship transition", "mission-aligned handoff intent"],
        confidence: "moderate",
        renderCitation: false
      }],
      boundaries: [
        "This bounded claim is confirmed by Jamie's direct first-person account of his own professional handoff; independent corroboration remains open.",
        "Do not name the receiving organization or assert legal succession, ownership transfer, current operations, or continuity outcomes without public-safe evidence and permission.",
        "Kansas City's later withdrawal record does not establish how the municipal funding disposition relates to Jamie's earlier stewardship transition."
      ],
      antiClaims: [
        "Jamie left KC Town Hall without arranging a handoff.",
        "The receiving organization became KC Town Hall's verified legal successor or owner.",
        "The stewardship transition caused, constituted, or completed the later municipal funding withdrawal.",
        "The project remains active under the receiving organization today."
      ],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex intake review"]
    },
    {
      id: "CLM-KC-TOWN-HALL-PHASE-ONE-COMPLETION",
      project: "kc-town-hall",
      internalClaim: "Jamie Burkart and Julia Fredenburg co-founded KC Town Hall and were named project managers in its 2019 CCED proposal, which records completion of a multi-trade Phase One cold-shell restoration including roof, masonry, structural framing, water, access, safety, and site work.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "Jamie Burkart and Julia Fredenburg co-founded KC Town Hall and served as project managers. The project's 2019 CCED proposal records completion of Phase One cold-shell work spanning the roof, historic masonry, structural framing, water service, access, safety, and site operations.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/kc-town-hall"]
      }],
      evidence: [{
        sourceId: "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
        relationship: "direct-support",
        supports: ["Jamie and Julia's founder and project-manager attribution", "Phase One completion in 2019", "multi-trade cold-shell scope"],
        locator: "PDF pages 2 and 11-12",
        confidence: "high",
        renderCitation: false
      }],
      boundaries: [
        "The proposal is a contemporaneous applicant-produced project record, not an independent third-party completion certification.",
        "Completion refers to the proposal's defined Phase One cold-shell scope, not Phase Two or the complete redevelopment.",
        "Preserve Julia Fredenburg's co-founder and project-manager credit and the work of the named trade and professional teams."
      ],
      antiClaims: [
        "Jamie alone restored KC Town Hall.",
        "The complete redevelopment or Phase Two was completed in 2019.",
        "Phase One completion means the later public appropriation was received or spent."
      ],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-CONSTRUCTION-ROLE-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex visual PDF review"]
    },
    {
      id: "CLM-KC-TOWN-HALL-GENERAL-CONTRACTOR-ROLE",
      project: "kc-town-hall",
      internalClaim: "Jamie reports serving as KC Town Hall's day-to-day general contractor for Phase One, hiring and coordinating masonry, roofing, carpentry, welding, engineering, architecture, and plumbing work and sequencing construction across the building.",
      status: "use-with-care",
      projections: [{
        key: "case-study",
        text: "Jamie served as the day-to-day construction coordinator for Phase One, working across multiple specialist trades from the basement through the roof.",
        status: "hold",
        citationRequired: false,
        surfaces: ["/work/kc-town-hall"]
      }],
      evidence: [
        {
          sourceId: "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15",
          relationship: "direct-support",
          supports: ["first-person general-contractor role", "trade hiring and coordination", "daily site sequencing"],
          confidence: "moderate",
          renderCitation: false
        },
        {
          sourceId: "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
          relationship: "corroborating",
          supports: ["Jamie project-manager attribution", "named multi-trade team", "completed Phase One scope"],
          locator: "PDF pages 2 and 11-12",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The exact general-contractor title and day-to-day scope currently rest on Jamie's first-person account, with the proposal corroborating project management, team structure, and completed work.",
        "Do not imply a contractor license, permit status, or legal designation that has not been recovered.",
        "Do not erase Julia Fredenburg's co-founder and project-manager role or the specialist teams' execution credit."
      ],
      antiClaims: [
        "Jamie was independently verified as a licensed general contractor.",
        "Jamie personally performed every trade on Phase One.",
        "Jamie alone managed or completed the restoration."
      ],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-CONSTRUCTION-ROLE-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex intake review"]
    },
    {
      id: "CLM-KC-TOWN-HALL-PARTICIPATORY-SURVEY",
      project: "kc-town-hall",
      internalClaim: "KC Town Hall conducted a neighborhood survey with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church whose results directly shaped the proposal; Jamie reports designing the handbill and backing contact and response system.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "KC Town Hall conducted a neighborhood survey with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church, and the project proposal states that residents' responses directly shaped its program.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/kc-town-hall"]
      }],
      evidence: [
        {
          sourceId: "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
          relationship: "direct-support",
          supports: ["survey handbill", "Oak Park and New Horizon partnership", "survey influence on the proposal"],
          locator: "PDF page 4",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15",
          relationship: "private-support",
          supports: ["Jamie's reported handbill design", "backing contact and response system", "daily site listening process"],
          confidence: "moderate",
          renderCitation: false
        }
      ],
      boundaries: [
        "The proposal confirms the survey and its influence but does not independently attribute the handbill or data system to Jamie.",
        "Do not publish resident identities, contact details, individual responses, or private survey data.",
        "Preserve Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as survey partners."
      ],
      antiClaims: [
        "Jamie alone designed the neighborhood process.",
        "The survey represented every neighborhood resident.",
        "Private contact or response records are public evidence."
      ],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-CONSTRUCTION-ROLE-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex visual PDF review"]
    },
    {
      id: "CLM-KC-TIRED-OF-TIRES-OPERATIONS",
      project: "kansas-city-neighborhood-programs",
      internalClaim: "Jamie reports designing and operating Oak Park Neighborhood Association's free monthly TiredOfTires pickup with the City, logging and transporting neighborhood tires for recycling, and later extending service to Indian Mound.",
      status: "use-with-care",
      projections: [{
        key: "archive-note",
        text: "Jamie designed communications and helped operate a free monthly neighborhood tire-recycling pickup through Oak Park Neighborhood Association, later extending the route to Indian Mound.",
        status: "hold",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/kansas-city-neighborhood-programs"]
      }],
      evidence: [
        {
          sourceId: "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15",
          relationship: "direct-support",
          supports: ["program identity and communication design", "city coordination", "monthly pickup and recycling operations", "reported Indian Mound expansion"],
          confidence: "moderate",
          renderCitation: false
        },
        {
          sourceId: "SRC-KC-TIRE-PICKUP-LEDGER-2019-2022",
          relationship: "corroborating",
          supports: ["multi-year monthly operating ledger", "structured tire-count tracking", "modeled disposal-cost calculation"],
          publicNote: "The spreadsheet corroborates sustained recordkeeping and aggregate activity, not Jamie's sole role or every program detail.",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The ledger corroborates structured monthly operations and a project-recorded aggregate, but Jamie's exact role and the Indian Mound expansion still rest on his first-person account.",
        "Do not publish participant addresses, contact lists, route details, or represent the project-maintained aggregate as an independent audit.",
        "Preserve Oak Park Neighborhood Association, Indian Mound neighbors, the Chestnut Street Resource Center, city staff, and participating residents as collective actors."
      ],
      antiClaims: [
        "Jamie created or operated TiredOfTires alone.",
        "A lifetime tire total has been independently verified.",
        "The current record establishes every program date or service boundary."
      ],
      researchInquiryIds: ["INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex intake and structured spreadsheet review"]
    },
    {
      id: "CLM-KC-CLEVELAND-UNIFY-TO-BEAUTIFY",
      project: "kansas-city-neighborhood-programs",
      internalClaim: "Jamie reports co-founding Cleveland Avenue Unify to Beautify within the Historic East Neighborhoods Coalition and supporting Pastor Lee's corridor concept through identity, logo, photography, social media, listening-session maps, resident-reporting tools, large handbill runs, and public meetings that contributed corridor context to capital-improvement discussions.",
      status: "use-with-care",
      projections: [{
        key: "archive-note",
        text: "Within the Historic East Neighborhoods Coalition, Jamie helped launch Cleveland Avenue Unify to Beautify and built visual and participation tools around Pastor Lee's idea of the avenue as a shared East Side corridor.",
        status: "hold",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/kansas-city-neighborhood-programs"]
      }],
      evidence: [{
        sourceId: "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15",
        relationship: "direct-support",
        supports: ["reported co-founding role", "identity and logo design", "photography and social media", "listening-session maps and resident-reporting tools", "printed outreach production"],
        confidence: "moderate",
        renderCitation: false
      }],
      boundaries: [
        "Pastor Lee originated the Cleveland Avenue corridor concept; do not transfer that authorship to Jamie.",
        "Jamie's exact co-founding status, dates, meeting sequence, elected-official participation, and influence on discretionary capital funding remain queued for corroboration.",
        "Preserve HENC, participating neighborhood associations, residents, clergy, elected officials, and other organizers as collective actors."
      ],
      antiClaims: [
        "Jamie originated Pastor Lee's Cleveland Avenue corridor concept.",
        "Jamie alone founded or operated Cleveland Avenue Unify to Beautify.",
        "Jamie personally determined or secured corridor capital-improvement funding."
      ],
      researchInquiryIds: ["INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex intake review"]
    },
    {
      id: "CLM-KC-TOWN-HALL-FUNDING-RECOMMENDATION",
      project: "kc-town-hall",
      internalClaim: "Jamie presented KC Town-Hall's adaptive-reuse proposal, and the Central City Economic Development Sales Tax Board unanimously recommended it to City Council for $490,539 in funding.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "Jamie presented KC Town-Hall's adaptive-reuse proposal for four retail spaces and three apartment units; the Central City Economic Development Sales Tax Board unanimously recommended the project to City Council for $490,539 in funding.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/kc-town-hall"]
      }],
      evidence: [{
        sourceId: "SRC-KC-TOWN-HALL-CCED-MINUTES-2019",
        relationship: "direct-support",
        supports: ["Jamie presenter attribution", "adaptive-reuse scope", "unanimous board recommendation", "$490,539 amount"],
        confidence: "high",
        renderCitation: true
      }],
      boundaries: [
        "The board recommendation is distinct from the Council's later acceptance and appropriation, which are tracked in a separate claim.",
        "Do not publish private property, financial, legal, or stakeholder records."
      ],
      antiClaims: [
        "KC Town-Hall received or spent $490,539.",
        "The board recommendation was final City Council approval.",
        "Jamie was solely responsible for the project."
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION",
      project: "kc-town-hall",
      internalClaim: "After the CCED Board recommended KC Town Hall's proposal, the Kansas City Council accepted the recommendation and appropriated $490,539 on September 26, 2019; the funding agreement remained under negotiation in 2022, and the full unused appropriation was reclaimed after the project withdrew in 2024.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "After the CCED Board recommended KC Town Hall's proposal, the Kansas City Council accepted the recommendation and appropriated $490,539 in September 2019. The project later withdrew, and the City reclaimed the full unused appropriation in 2024.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/kc-town-hall"]
      }],
      evidence: [
        {
          sourceId: "SRC-KC-TOWN-HALL-CCED-MINUTES-2019",
          relationship: "context",
          supports: ["the preceding board recommendation and Jamie's presenter attribution"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KC-TOWN-HALL-RESOLUTION-190649",
          relationship: "direct-support",
          supports: ["Council acceptance of the recommendation", "$490,539 amount", "authorization to negotiate a funding agreement"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KC-TOWN-HALL-ORDINANCE-190642",
          relationship: "direct-support",
          supports: ["Council passage", "September 26, 2019 date", "$490,539 appropriation to KC Town Hall"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
          relationship: "supports-boundary",
          supports: ["no funds reported disbursed as of May 17, 2022", "funding agreement still under negotiation"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KC-TOWN-HALL-ORDINANCE-240317",
          relationship: "supports-boundary",
          supports: ["project withdrawal", "2024 reclamation of the full unused appropriation"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Council appropriation is not receipt, disbursement, expenditure, an executed funding agreement, or project completion.",
        "The legislative records do not establish Jamie's individual role in securing the Council actions.",
        "Whenever the appropriation is described, preserve the later non-disbursement, withdrawal, and clawback context."
      ],
      antiClaims: [
        "KC Town Hall received or spent the $490,539 appropriation.",
        "Council appropriation proves that the redevelopment was completed.",
        "Jamie personally controlled the Council vote or funding agreement.",
        "The 2024 clawback means the 2019 Council appropriation never occurred."
      ],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-FUNDING-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "CLM-KC-EIGHTH-STREET-TUNNEL-PROGRAM",
      project: "kansas-city-public-programs",
      internalClaim: "In 2006 Jamie led participants through downtown Kansas City to a three-film screening he programmed inside the 8th Street Tunnel, connecting transit history, public access, and artistic space.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "In 2006 Jamie led participants through downtown Kansas City to a three-film screening he programmed inside the 8th Street Tunnel, using an overlooked transit site to connect public history, artistic space, and civic imagination.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/kansas-city-public-programs"]
      }],
      evidence: [{
        sourceId: "SRC-KC-EIGHTH-STREET-TUNNEL-KCUR-2016-09-15",
        relationship: "direct-support",
        supports: ["2006 date", "participant route", "three-film screening", "Jamie programming and projection", "public-history rationale"],
        confidence: "high",
        renderCitation: true
      }],
      boundaries: [
        "Describe the event historically; do not imply current access, safety, or permission.",
        "Do not infer a participant count."
      ],
      antiClaims: [
        "Jamie owns or controls the 8th Street Tunnel.",
        "The tunnel is currently open or safe for public access.",
        "The event was a conventional theater screening."
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-KC-FRONTIER-PUBLIC-SPACE-PROGRAM",
      project: "kansas-city-public-programs",
      internalClaim: "For The Frontier's Beating the Bounds, Jamie conducted interviews and reenactment sessions, made a research video, and contributed to a public program about youth, curfews, assembly, and the urban commons.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "For The Frontier's Beating the Bounds, Jamie conducted interviews and reenactment sessions, made a research video, and helped convene public discussion about youth, curfews, assembly, and the urban commons.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/kansas-city-public-programs"]
      }],
      evidence: [{
        sourceId: "SRC-KC-FRONTIER-DREAMERS-2012-05-17",
        relationship: "direct-support",
        supports: ["Jamie interviews", "reenactment sessions", "research video", "public discussion", "public-space and curfew subject"],
        confidence: "high",
        renderCitation: true
      }],
      boundaries: [
        "The Frontier and Beating the Bounds were collective programs with institutional and collaborator context.",
        "Do not present the historical project text as current legal guidance."
      ],
      antiClaims: [
        "Jamie alone organized The Frontier.",
        "Every participant shared Jamie's interpretation.",
        "The source proves the planned pamphlet was completed."
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-NYCA-COFOUNDER-ROLE",
      project: "nyc-artist-coalition",
      internalClaim: "Jamie co-founded NYC Artist Coalition and played an instrumental role in creating its operating, civic, and public-communications infrastructure.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "Contemporaneous reporting identified Jamie as a founding member and organizer of NYC Artist Coalition. This supports the bounded public claim that he co-founded the coalition; its creation and accomplishments were collective.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
      }],
      evidence: [
        ...(nycaPressEvidenceByClaim["CLM-NYCA-COFOUNDER-ROLE"] ?? []),
        {
          sourceId: "SRC-NYCA-NPR-CABARET-2017-09-20",
          relationship: "direct-support",
          supports: ["contemporaneous founding-member attribution", "coalition affiliation", "Cabaret Law advocacy context"],
          confidence: "moderate",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-BEDFORD-BOWERY-DIY-SPACES-2017-02-07",
          relationship: "corroborating",
          supports: ["early organizer attribution", "coalition public meeting", "mutual-aid work"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Use co-founded or founding member with collective credit; exact founding chronology and division of labor remain open.",
        "Website authorship and policy contributions should remain separate, source-linked claims."
      ],
      antiClaims: [
        "Jamie solely founded NYC Artist Coalition.",
        "Jamie controlled all coalition decisions.",
        "Every coalition accomplishment belongs to Jamie."
      ],
      researchInquiryIds: ["INQ-NYCA-COFOUNDER-ROLE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS",
      project: "callnyc",
      internalClaim: "A bounded authenticated search and preserved timeline capture recover at least six distinct then-Council-member accounts publicly replying to, amplifying, or promoting CallNYC between April 2016 and July 2017: Peter Koo, Steven Matteo, Ruben Wills, Helen Rosenthal, Mathieu Eugene, and Margaret Chin.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text: "A bounded review recovers at least six distinct then-Council-member accounts publicly replying to, amplifying, or promoting CallNYC between April 2016 and July 2017. This is a documented lower bound, not a comprehensive engagement count.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/projects/callnyc"]
        },
        {
          key: "case-study",
          text: "A bounded review recovered at least six then-Council-member accounts publicly replying to, amplifying, or promoting CallNYC between April 2016 and July 2017.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/callnyc"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-CALLNYC-X-TIMELINE-PDF-2026-07-11",
          relationship: "private-support",
          supports: ["Mathieu Eugene quote-post", "Helen Rosenthal callnyc.org promotion", "captured dates", "two additional distinct Council-member accounts"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-CALLNYC-X-AUTHENTICATED-MENTION-SEARCH-2026-07-15",
          relationship: "direct-support",
          supports: ["11-post direct-mention corpus", "four additional Council-member accounts", "dates and interaction text"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-CALLNYC-X-MARGARET-CHIN-2017-07-11",
          relationship: "direct-support",
          supports: ["Margaret Chin direct mention and response"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-CALLNYC-X-RUBEN-WILLS-2016-05-17",
          relationship: "direct-support",
          supports: ["Ruben Wills direct reply"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-CALLNYC-X-STEVEN-MATTEO-2016-05-03",
          relationship: "direct-support",
          supports: ["Steven Matteo direct reply"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-CALLNYC-X-PETER-KOO-2016-04-27",
          relationship: "direct-support",
          supports: ["Peter Koo public amplification"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-CALLNYC-COUNCIL-PB-ROSTER-2016-08-04",
          relationship: "supports-boundary",
          supports: ["contemporaneous Council-member status for Helen Rosenthal and Mathieu Eugene"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NYC-COUNCIL-STATED-MEETING-2016-11-16",
          relationship: "supports-boundary",
          supports: ["official Council-member status for all six recovered officeholders during the relevant Council term"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Use at least six and the April 2016-July 2017 date range; do not describe the result as comprehensive.",
        "The four direct-mention search results and two preserved-timeline results come from complementary recovery methods.",
        "Do not aggregate visible repost and like counts without identifying which accounts performed them.",
        "Engagement does not establish endorsement, adoption, commissioning, or official status."
      ],
      antiClaims: [
        "The Council endorsed CallNYC.",
        "Council members adopted CallNYC.",
        "Only six Council members engaged with CallNYC.",
        "The preserved timeline is a complete export.",
        "Social engagement proves official project status."
      ],
      researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex authenticated research review"]
    }
  ],
  researchInquiries: [
    ...wowlistXCorpusResearchInquiries,
    ...nycaPressResearchInquiries,
    ...icloudTeamsResearchInquiries,
    ...googleDriveResearchInquiries,
    ...nterChngArchiveResearchInquiries,
    ...socialAccountArchiveResearchInquiries,
    ...callnycXCorpusResearchInquiries,
  {
    id: "INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-2026",
    project: "kc-town-hall",
    question: "Which public-safe professional records or collaborator accounts can corroborate Jamie's transition of KC Town Hall stewardship to a mission-aligned organization?",
    methods: [
      "Seek handoff correspondence, agreements, meeting records, organizational records, or collaborator confirmation limited to the professional transition.",
      "Establish the receiving organization, approximate date, transferred responsibilities, and continuity outcomes only where publication is permitted.",
      "Keep the stewardship handoff analytically separate from the later municipal funding withdrawal unless a source establishes the relationship."
    ],
    resultStatus: "queued",
    findings: [],
    limitations: [
      "The current record is Jamie's first-person account and does not independently establish the receiving organization, timing, terms, or outcomes.",
      "The official municipal records establish a later funding withdrawal but do not establish its relationship to the stewardship transition.",
      "Current ownership, operations, property status, and the receiving organization's permission to be named are not established."
    ],
    sourceIds: ["SRC-KC-TOWN-HALL-JAMIE-TRANSITION-ACCOUNT-2026-07-15"],
    publicSummary: "Jamie reports transitioning KC Town Hall project stewardship to a mission-aligned organization when he concluded his active role; professional handoff records and collaborator confirmation remain to be recovered."
  },
  {
    id: "INQ-KC-TOWN-HALL-CONSTRUCTION-ROLE-2026",
    project: "kc-town-hall",
    question: "Which records independently establish Jamie's day-to-day general-contractor responsibilities, Phase One work sequence, and authorship of the survey handbill and data system?",
    methods: [
      "Visually review the protected CCED proposal for role labels, contractor structure, completed Phase One scope, and neighborhood-process documentation.",
      "Seek permits, contracts, invoices, schedules, measured drawings, construction photographs, correspondence, and collaborator confirmation.",
      "Separate project-manager attribution and project-level completion from an unrecovered licensed or legal general-contractor designation."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The proposal identifies Jamie Burkart and Julia Fredenburg as founders and project managers.",
      "The proposal names masonry, architecture, roofing, concrete, electrical, and legal team members and records Phase One cold-shell work as completed in 2019.",
      "The proposal reproduces the neighborhood survey and says its results directly shaped the proposal.",
      "Jamie's first-person account supplies the day-to-day general-contractor role, trade coordination, site listening, and handbill and data-system authorship."
    ],
    limitations: [
      "The exact general-contractor title, license or permit status, day-to-day task division, and survey-system authorship are not independently recovered.",
      "The proposal is a contemporaneous applicant-produced record rather than independent completion certification.",
      "Protected financial, contact, support-letter, resident, and stakeholder details remain outside the public repository."
    ],
    sourceIds: [
      "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
      "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15"
    ],
    publicSummary: "A contemporaneous proposal confirms Jamie's founder and project-manager attribution, a named multi-trade team, Phase One completion in 2019, and a neighborhood survey that shaped the proposal. Jamie's exact general-contractor and survey-system responsibilities remain queued for independent corroboration.",
    protectedLocatorId: "RESEARCH-KC-TOWN-HALL-CONSTRUCTION-ROLE-2026"
  },
  {
    id: "INQ-KC-NEIGHBORHOOD-PROGRAMS-2026",
    project: "kansas-city-neighborhood-programs",
    question: "Which public-safe records can corroborate Jamie's TiredOfTires and Cleveland Avenue Unify to Beautify roles, chronology, operating scope, collaborators, and civic outcomes?",
    methods: [
      "Recover Oak Park Neighborhood Association, Indian Mound, Historic East Neighborhoods Coalition, New Horizon, Chestnut Street Resource Center, and Kansas City records.",
      "Search handbills, logos, maps, photographs, social posts, meeting materials, email, pickup logs, recycling receipts, and public funding or capital-improvement records.",
      "Request collaborator confirmation while preserving Pastor Lee's authorship and collective neighborhood credit."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "A protected KC Town Hall project spreadsheet records 1,970 tires across 25 nonzero monthly entries from May 2019 through September 2022.",
      "The spreadsheet models $44,890 in disposal costs from per-tire assumptions.",
      "The ledger materially corroborates sustained monthly recordkeeping but does not independently establish Jamie's sole operating role, every pickup location, or Indian Mound expansion."
    ],
    limitations: [
      "Jamie's exact role, the Indian Mound expansion, Cleveland Avenue co-founding status, elected-official participation, and funding influence still rely on first-person memory or remain unrecovered.",
      "The spreadsheet is a project-maintained ledger rather than an independent audit, and its dollar figure is modeled rather than verified realized savings.",
      "Participant addresses, contact lists, private messages, and route-level data remain protected.",
      "Pastor Lee's corridor concept and all collective neighborhood labor must retain their own attribution."
    ],
    sourceIds: [
      "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15",
      "SRC-KC-TIRE-PICKUP-LEDGER-2019-2022"
    ],
    publicSummary: "A protected project ledger corroborates sustained monthly tire-count tracking and records 1,970 tires from May 2019 through September 2022. Jamie's exact role, expansion history, and Cleveland Avenue contributions remain queued for public-safe collaborator and institutional corroboration."
  },
  {
    id: "INQ-KC-TOWN-HALL-COUNCIL-FUNDING-2026",
    project: "kc-town-hall",
    question: "Did the Kansas City Council act on the CCED Board's $490,539 KC Town Hall recommendation, and what was the later disposition of the appropriation?",
    methods: [
      "Trace the board recommendation into Kansas City's Legistar legislative history.",
      "Review the authenticated Council resolution and appropriation ordinance rather than inferring final action from board minutes.",
      "Review later official project-status and clawback records to distinguish appropriation from agreement execution, disbursement, expenditure, and completion."
    ],
    runAt: "2026-07-14",
    resultStatus: "recovered",
    findings: [
      "On September 26, 2019, the Council adopted Resolution 190649 as substituted, accepting the CCED Board's recommendation and authorizing negotiation of a funding agreement for up to $490,539.",
      "On the same date, the Council passed Ordinance 190642 as substituted, appropriating $490,539 to KC Town Hall in the Central City Sales Tax-Projects account.",
      "A May 17, 2022 city status report listed no funds disbursed and described the funding agreement as under negotiation.",
      "Ordinance 240317, passed March 28, 2024, states that KC Town Hall withdrew and reduces the full $490,539 project account so the unused appropriation can return to the Central City Sales Tax Fund."
    ],
    limitations: [
      "The legislative action record does not preserve an individual roll-call vote for Ordinance 190642.",
      "The records do not establish Jamie's individual role in securing the Council actions.",
      "Appropriation is not receipt, disbursement, expenditure, an executed funding agreement, or project completion.",
      "The reviewed public records do not explain the reasons for withdrawal."
    ],
    sourceIds: [
      "SRC-KC-TOWN-HALL-CCED-MINUTES-2019",
      "SRC-KC-TOWN-HALL-RESOLUTION-190649",
      "SRC-KC-TOWN-HALL-ORDINANCE-190642",
      "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
      "SRC-KC-TOWN-HALL-ORDINANCE-240317"
    ],
    publicSummary: "Kansas City Council records confirm that the Council accepted the CCED Board's recommendation and appropriated $490,539 to KC Town Hall in 2019; the funding was not reported disbursed in 2022, and the full unused appropriation was reclaimed after the project withdrew in 2024."
  },
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
    id: "INQ-SUNDAY-DINNER-AGGREGATE-HISTORY-2026",
    project: "196-sunday-dinner",
    question: "Which public-safe records can validate Sunday Dinner's lifetime gathering and resident-artist totals without exposing participant identities, addresses, or private community records?",
    methods: [
      "Identify public event archives, collaborator-approved histories, and aggregate operational records.",
      "Reconcile date range, recurrence, cancellations, and the definition of a gathering or resident artist.",
      "Publish only aggregate findings that can be audited without exposing protected participant data."
    ],
    resultStatus: "queued",
    findings: [],
    limitations: [
      "The Greene Hill profile confirms weekly recurrence and open invitation but not lifetime totals.",
      "Participant identities, addresses, attendance records, and private communications remain protected."
    ],
    sourceIds: ["SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017-12-19"],
    publicSummary: "Weekly open community dinners are independently documented; aggregate lifetime totals remain queued for privacy-preserving verification."
  },
  {
    id: "INQ-NYCA-COFOUNDER-ROLE-2026",
    project: "nyc-artist-coalition",
    question: "Which contemporaneous public, organizational, and collaborator-approved sources establish Jamie's co-founder role and specific founding responsibilities in NYC Artist Coalition?",
    methods: [
      "Search public organizational histories, archived website biographies, launch materials, and contemporaneous press.",
      "Review public-safe founding documents and request collaborator confirmation where appropriate.",
      "Separate formal title, practical founding labor, website authorship, and collective governance."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "NPR contemporaneously identified Jamie as a founding member of NYC Artist Coalition.",
      "Bedford + Bowery identified Jamie as an NYC Artist Coalition organizer in February 2017 and documented concrete safety-meeting and mutual-aid work.",
      "THUMP independently reported that NYC Artist Coalition formed in January 2017 amid post-Ghost Ship safety concerns and documented the coalition's early meeting with the cultural-affairs commissioner; this strengthens the chronology without assigning Jamie's exact founding labor.",
      "The sources support a bounded co-founder or founding-member claim while leaving exact founding chronology and division of labor open."
    ],
    limitations: [
      "The reviewed sources do not provide a complete founding roster, date, governance history, or division of labor.",
      "Private coalition records must remain outside the public repository."
    ],
    sourceIds: [
      "SRC-NYCA-NPR-CABARET-2017-09-20",
      "SRC-NYCA-BEDFORD-BOWERY-DIY-SPACES-2017-02-07",
      "SRC-NYCA-PRESS-VICE-THUMP-2017-03-21-A-COALITION-OF-ADVOCACY-GROUPS"
    ],
    publicSummary: "Contemporaneous national and local reporting supports a bounded founding-member and organizer claim while exact founding responsibilities remain open."
  },
  {
    id: "INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026",
    project: "nyc-artist-coalition",
    question: "What specific organizing, production, drafting, facilitation, and follow-through responsibilities did Jamie hold in NYC Artist Coalition's Office of Nightlife advocacy and October 2017 town hall?",
    methods: [
      "Close-read independent event coverage, the coalition letter, city records, public event materials, and hearing transcripts.",
      "Search public-safe project archives for role assignments, authored materials, production records, and collaborator-approved accounts.",
      "Keep coalition accomplishment and Jamie's direct contribution as separate linked claims."
    ],
    runAt: "2026-07-12",
    resultStatus: "partially-recovered",
    findings: [
      "Independent coverage says NYC Artist Coalition spearheaded and organized the Market Hotel town hall.",
      "Independent coverage identifies Jamie as an NYC Artist Coalition participant who spoke at hearings or town halls.",
      "A second independent report identifies NYC Artist Coalition as organizer and quotes Jamie articulating the event's purpose and commitment to continuing dialogue.",
      "A contemporaneous Greene Hill Food Co-op profile records Jamie working as part of the coalition and inviting readers into the Office of Nightlife town hall.",
      "The public coalition letter documents the event's equity, trust, and representation goals.",
      "amNewYork documented more than 100 venue operators, artists, and community members attending a later NYC Artist Coalition forum with the city's first nightlife mayor in March 2018, supporting continued public accountability work after the office was created.",
      "Jamie's complete individual production and drafting responsibilities are not yet recovered."
    ],
    limitations: [
      "Group-level event credit does not establish Jamie's complete division of labor.",
      "The reviewed sources do not support sole causality for creation of the Office of Nightlife.",
      "Private coalition records and unapproved collaborator accounts remain outside the repo."
    ],
    sourceIds: [
      "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
      "SRC-NYCA-BUSHWICK-DAILY-NIGHT-MAYOR-2017-10-12",
      "SRC-NYCA-VILLAGE-VOICE-NIGHT-MAYOR-2017-11-17",
      "SRC-NYCA-NIGHT-MAYOR-LETTER-2017-09-08",
      "SRC-NYCA-MOME-OFFICE-NIGHTLIFE-2017-09-19",
      "SRC-NYCA-EDGE-OF-SOUND-TOWN-HALL-2017-10-14",
      "SRC-NYCA-SAVE-NYC-SPACES-SITE",
      "SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017-12-19",
      "SRC-NYCA-PRESS-AMNY-2018-03-27-NIGHTLIFE-MAYOR-ARIEL-PALITZ-IN"
    ],
    publicSummary: "The coalition's town-hall and advocacy role is strongly documented, and Jamie is documented as a participating coalition speaker; his complete production role remains open."
  },
  {
    id: "INQ-NYCA-MARCH-CAUSAL-LINK-2026",
    project: "nyc-artist-coalition",
    question: "What documented causal contribution did Talks Not Raids, NYC Artist Coalition, and Jamie make to MARCH transparency requirements and the later replacement of MARCH with CURE?",
    methods: [
      "Compare the public campaign's demands with Local Law 220, MARCH reports, CURE materials, hearing testimony, and city acknowledgements.",
      "Search legislative histories and public testimony for explicit references to the campaign, coalition, and Jamie.",
      "Distinguish chronological alignment, public acknowledgement, policy influence, and sole causality."
    ],
    runAt: "2026-07-12",
    resultStatus: "partially-recovered",
    findings: [
      "Talks Not Raids publicly advocated transparency, trust, communication, and relationship-based safety work in place of disruptive raids.",
      "Contemporaneous Gothamist, Bedford + Bowery, and Baffler reporting documented the transparency dispute, uncertainty in MARCH data, venue testimony, public-records work, and City Council scrutiny surrounding the campaign.",
      "Local Law 220 later required MARCH reporting and advance notice in many circumstances.",
      "The city replaced MARCH with the engagement-first CURE process in 2023.",
      "The CURE announcement transcript acknowledged NYC Artist Coalition among nightlife advocates, but the reviewed sources do not establish a complete causal chain or Jamie's individual causal contribution."
    ],
    limitations: [
      "Temporal sequence and thematic alignment do not by themselves prove causation.",
      "The reviewed legislation summary does not name every contributing advocate.",
      "Further hearing, drafting, and collaborator evidence is needed before strengthening the causal claim."
    ],
    sourceIds: [
      "SRC-NYCA-TALKS-NOT-RAIDS",
      "SRC-NYCA-PRESS-GOTHAMIST-2019-02-12-LAWMAKERS-DEMAND-TRANSPARENCY-ON-SURPRISE",
      "SRC-NYCA-PRESS-BEDFORD-BOWERY-2019-02-12-DISCO-DISCORD-NYPD-AND-NIGHTLIFE",
      "SRC-NYCA-PRESS-BAFFLER-2018-02-12-CUT-THE-MUSIC-LIZ-PELLY",
      "SRC-NYCA-LEGISTAR-MARCH-TRANSPARENCY-2019",
      "SRC-NYCA-MAYOR-CURE-2023-12-28"
    ],
    publicSummary: "The campaign position, later transparency law, and eventual CURE replacement are documented; the campaign's and Jamie's precise causal contributions remain open."
  },
  {
    id: "INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026",
    project: "callnyc",
    question: "Which New York City Council member accounts engaged with the CallNYC social account, through which interaction types, and during what date range?",
    methods: [
      "Recover authenticated account exports, archived timelines, supplied PDF captures, or API records.",
      "Build a dated Council-member account roster appropriate to the historical period.",
      "Deduplicate posts and classify replies, mentions, reposts, quotes, and likes separately.",
      "Record inaccessible or deleted content as unknown rather than zero."
    ],
    runAt: "2026-07-12",
    resultStatus: "partially-recovered",
    findings: [
      "A seven-page PDF capture was inspected through text extraction and rendered visual review.",
      "The captured timeline visibly preserves Mathieu Eugene quote-posting a CallNYC award post on October 4, 2016.",
      "The captured timeline visibly preserves Helen Rosenthal directing readers to callnyc.org on September 27, 2016.",
      "Authenticated Latest search recovered 11 direct-mention posts, including posts by Margaret Chin, Ruben Wills, Steven Matteo, and Peter Koo.",
      "Official Council records confirm the six recovered officeholders served during the relevant Council term.",
      "The defensible current metric is a lower bound of at least six distinct then-Council-member accounts publicly replying to, amplifying, or promoting CallNYC between April 2016 and July 2017."
    ],
    limitations: [
      "The PDF and authenticated search are bounded recovery surfaces, not a complete account export.",
      "Direct-mention search can omit quote posts and URL-only promotions, while the timeline capture covers only a visible slice.",
      "Platform blocking, deleted posts, account renames, and incomplete archives may limit recall.",
      "Aggregate repost and like counts do not identify every acting account.",
      "Engagement cannot be interpreted as endorsement, adoption, commissioning, or official status without additional evidence."
    ],
    sourceIds: [
      "SRC-CALLNYC-X-TIMELINE-PDF-2026-07-11",
      "SRC-CALLNYC-COUNCIL-PB-ROSTER-2016-08-04",
      "SRC-CALLNYC-X-AUTHENTICATED-MENTION-SEARCH-2026-07-15",
      "SRC-CALLNYC-X-MARGARET-CHIN-2017-07-11",
      "SRC-CALLNYC-X-RUBEN-WILLS-2016-05-17",
      "SRC-CALLNYC-X-STEVEN-MATTEO-2016-05-03",
      "SRC-CALLNYC-X-PETER-KOO-2016-04-27",
      "SRC-NYC-COUNCIL-STATED-MEETING-2016-11-16"
    ],
    publicSummary: "Complementary authenticated search and preserved-timeline evidence document at least six then-Council-member accounts replying to, amplifying, or promoting CallNYC in 2016-2017; comprehensive platform-wide measurement remains open."
  }],
  corrections: [
    { id: "COR-FAIR-RENT-MEMORY-PAGE-COUNT-2026", claimId: "CLM-CRS-SHARED-MEMORY-SYSTEM", previousText: "30+ pages of shared campaign-memory infrastructure", replacementText: "a shared campaign-memory system organizing decisions, owners, open questions, city/state lanes, consent levels, and next steps", reason: "The recovered records support the system's structure and Jamie's stewardship more directly than an unnecessary page-count shorthand.", decidedAt: "2026-07-15", affectedSurfaces: ["/work", "/work/fair-rent-nyc", "knowledge-bank"], status: "active" },
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
      "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC",
      "SRC-CALLNYC-X-FULL-POPULATION-2026-07-15",
      "SRC-NYC-COUNCIL-STATED-MEETING-2016-11-16",
      "SRC-CALLNYC-X-AUTHENTICATED-MENTION-SEARCH-2026-07-15"
    ],
    occurrences: [
      { id: "event-date-time", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", projection: "case-study", sourceIds: ["SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
      { id: "first-councilstat-hackathon", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
      { id: "independent-follow-on", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"] },
      { id: "event-branding", claimId: "CLM-CALLNYC-EVENT-BRANDING", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC"] },
      { id: "press-coverage", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14"] },
      { id: "social-documentation-system", claimId: "CLM-CALLNYC-X-PUBLIC-DOCUMENTATION-SYSTEM", projection: "case-study", sourceIds: ["SRC-CALLNYC-X-FULL-POPULATION-2026-07-15", "SRC-NYC-COUNCIL-STATED-MEETING-2016-11-16"] },
      { id: "council-engagement", claimId: "CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS", projection: "case-study", sourceIds: ["SRC-CALLNYC-X-AUTHENTICATED-MENTION-SEARCH-2026-07-15", "SRC-NYC-COUNCIL-STATED-MEETING-2016-11-16"] },
      { id: "archived-status", claimId: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS", projection: "case-study", sourceIds: ["SRC-CALLNYC-GITHUB-REPOSITORY", "SRC-CALLNYC-POLITICO-2016-03-14"] }
    ]
  }, {
    id: "wowlist",
    surface: "/work/wowlist",
    sourceOrder: [
      "SRC-WOWLIST-X-SUPPORT-FEED-2015-04-24",
      "SRC-WOWLIST-X-SUPPORT-PROFILE-2015-04-24",
      "SRC-WOWLIST-X-SUPPORT-SUBMISSION-2015-04-24",
      "SRC-WOWLIST-X-SUPPORT-NYCDIY-IDENTITY-2016-09-01",
      "SRC-WOWLIST-X-SUPPORT-NYCDIY-JOIN-2016-09-01",
      "SRC-WOWLIST-X-SUPPORT-NYCDIY-LINEAGE-2016-09-01"
    ],
    occurrences: [{
      id: "public-support-surface",
      claimId: "CLM-WOWLIST-X-PUBLIC-SUPPORT-SURFACE",
      projection: "case-study",
      sourceIds: [
        "SRC-WOWLIST-X-SUPPORT-FEED-2015-04-24",
        "SRC-WOWLIST-X-SUPPORT-PROFILE-2015-04-24",
        "SRC-WOWLIST-X-SUPPORT-SUBMISSION-2015-04-24",
        "SRC-WOWLIST-X-SUPPORT-NYCDIY-IDENTITY-2016-09-01",
        "SRC-WOWLIST-X-SUPPORT-NYCDIY-JOIN-2016-09-01",
        "SRC-WOWLIST-X-SUPPORT-NYCDIY-LINEAGE-2016-09-01"
      ]
    }]
  }]
} satisfies KnowledgeBank;

export const knowledgeBank = knowledgeBankSchema.parse(knowledgeBankInput);
