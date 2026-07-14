import { knowledgeBankSchema, type KnowledgeBank } from "./schema.ts";
import {
  lifecycleClaims,
  lifecycleResearchInquiries,
  lifecycleSources
} from "./lifecycle-records.ts";

const knowledgeBankInput = {
  intakeItems: [
    {
      id: "INT-2026-07-13-PITCH-RAFT",
      kind: "url",
      capturedAt: "2026-07-13",
      submittedBy: "Jamie Burkart",
      publicSafeDescription: "The Pitch article about Jamie's 2007 experiential raft expedition and its relationship to Kansas City transportation history and the Missouri River.",
      submittedUrl: "https://www.thepitchkc.com/when-artists-turn-huck-finn/",
      projectIds: ["water-publics"],
      entityIds: ["missouri-river"],
      dateHints: ["2007-08-09"],
      sensitivity: "public-safe",
      availability: "live",
      status: "promoted",
      sourceIds: ["SRC-WATER-PITCH-HUCK-FINN-2007"],
      claimIds: ["CLM-WATER-RAFT-ORIGINATION"],
      inquiryIds: []
    },
    {
      id: "INT-2026-07-13-CHARLOTTE-STREET-WATER",
      kind: "url",
      capturedAt: "2026-07-13",
      submittedBy: "Jamie Burkart",
      publicSafeDescription: "Charlotte Street program page for Great Accommodations, including its participatory river-city premise, outreach, programs, installation, and Jamie's account of the earlier raft journey.",
      submittedUrl: "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
      projectIds: ["water-publics"],
      entityIds: ["charlotte-street-foundation", "missouri-river", "mississippi-river"],
      dateHints: ["2009-09-01", "2009-10-03"],
      sensitivity: "public-safe",
      availability: "live",
      status: "promoted",
      sourceIds: ["SRC-WATER-CHARLOTTE-STREET-GREAT-ACCOMMODATIONS-2009"],
      claimIds: [
        "CLM-WATER-RAFT-VOYAGE",
        "CLM-GREAT-ACCOMMODATIONS-PARTICIPATORY-PROGRAM"
      ],
      inquiryIds: []
    },
    {
      id: "INT-2026-07-13-GOOD-TIMES-OPEN-HOUSE",
      kind: "url",
      capturedAt: "2026-07-13",
      submittedBy: "Jamie Burkart",
      publicSafeDescription: "Good Times reporting on Jamie's 2006 Porter Bridge Gallery Open House as a ten-day experiment in communal living, facilitation, participation, and public documentation.",
      submittedUrl: "https://www.goodtimes.sc/archives/metro-santa-cruz/06.28.06/open-house-0626.html",
      projectIds: ["open-house"],
      entityIds: ["porter-bridge-gallery"],
      dateHints: ["2006-06-28"],
      sensitivity: "public-safe",
      availability: "live",
      status: "promoted",
      sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006"],
      claimIds: ["CLM-OPEN-HOUSE-PARTICIPATORY-PRACTICE"],
      inquiryIds: []
    },
    {
      id: "INT-2026-07-13-GOTHAMIST-CABARET",
      kind: "url",
      capturedAt: "2026-07-13",
      submittedBy: "Jamie Burkart",
      publicSafeDescription: "Gothamist reporting on Jamie's fire-code study groups, Cabaret Law repeal advocacy, and affiliation with NYC Artist Coalition.",
      submittedUrl: "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
      projectIds: ["nyc-artist-coalition"],
      entityIds: ["nyc-artist-coalition", "nyc-cabaret-law"],
      dateHints: ["2017-06-19"],
      sensitivity: "public-safe",
      availability: "live",
      status: "promoted",
      sourceIds: ["SRC-NYCARTC-GOTHAMIST-CABARET-2017"],
      claimIds: ["CLM-NYCARTC-FOUNDING-ROLE", "CLM-NYCARTC-CABARET-LAW-ADVOCACY"],
      inquiryIds: ["INQ-NYCARTC-CABARET-REPEAL-CAUSALITY"]
    },
    {
      id: "INT-2026-07-13-NPR-NIGHTLIFE",
      kind: "url",
      capturedAt: "2026-07-13",
      submittedBy: "Jamie Burkart",
      publicSafeDescription: "NPR reporting on NYC Artist Coalition participation in Let NYC Dance, Jamie's founding affiliation, the Office of Nightlife, and the 2017 Cabaret Law campaign.",
      submittedUrl: "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife?renderPlatform=nprone_ios&unified=true",
      projectIds: ["nyc-artist-coalition"],
      entityIds: ["nyc-artist-coalition", "let-nyc-dance", "nyc-cabaret-law", "nyc-office-of-nightlife"],
      dateHints: ["2017-09-20"],
      sensitivity: "public-safe",
      availability: "live",
      status: "promoted",
      sourceIds: ["SRC-NYCARTC-NPR-NIGHTLIFE-2017"],
      claimIds: [
        "CLM-NYCARTC-FOUNDING-ROLE",
        "CLM-NYCARTC-CABARET-LAW-ADVOCACY",
        "CLM-NYC-OFFICE-NIGHTLIFE-ESTABLISHMENT"
      ],
      inquiryIds: ["INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE", "INQ-NYCARTC-CABARET-REPEAL-CAUSALITY"]
    },
    {
      id: "INT-2026-07-13-GREENE-HILL-NEWSLETTER",
      kind: "url",
      capturedAt: "2026-07-13",
      submittedBy: "Jamie Burkart",
      publicSafeDescription: "Greene Hill Food Co-op Q&A with Jamie Burkart and Julia Fredenberg covering NYC Artist Coalition, Cabaret Law advocacy, and a September 28 Office of Nightlife town-hall invitation.",
      submittedUrl: "https://www.greenehillfood.coop/master-blog/2017/12/september-2017-newsletter",
      projectIds: ["nyc-artist-coalition"],
      entityIds: ["nyc-artist-coalition"],
      dateHints: ["2017-09-28", "2017-12-19"],
      sensitivity: "public-safe",
      availability: "live",
      status: "promoted",
      sourceIds: ["SRC-NYCARTC-GREENE-HILL-NEWSLETTER-2017"],
      claimIds: [
        "CLM-NYCARTC-CABARET-LAW-ADVOCACY",
        "CLM-NYCARTC-SEPTEMBER-TOWN-HALL-INVITATION"
      ],
      inquiryIds: [
        "INQ-NYCARTC-GREENE-HILL-RECOVERY",
        "INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS"
      ]
    },
    {
      id: "INT-2026-07-13-NYC-COUNCIL-NIGHTLIFE",
      kind: "url",
      capturedAt: "2026-07-13",
      submittedBy: "Codex source discovery",
      publicSafeDescription: "Official New York City Council press release describing the August 24, 2017 vote on Introduction 1688-A to establish an Office of Nightlife and Nightlife Advisory Board.",
      submittedUrl: "https://council.nyc.gov/press/2017/08/24/1453/",
      projectIds: ["nyc-artist-coalition"],
      entityIds: ["new-york-city-council", "nyc-office-of-nightlife"],
      dateHints: ["2017-08-24"],
      sensitivity: "public-safe",
      availability: "live",
      status: "promoted",
      sourceIds: ["SRC-NYC-COUNCIL-OFFICE-NIGHTLIFE-2017"],
      claimIds: ["CLM-NYC-OFFICE-NIGHTLIFE-ESTABLISHMENT"],
      inquiryIds: ["INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE"]
    },
    {
      id: "INT-2026-07-13-NYC-COUNCIL-CABARET-VOTE",
      kind: "url",
      capturedAt: "2026-07-13",
      submittedBy: "Codex source discovery",
      publicSafeDescription: "Official New York City Council press release describing the October 31, 2017 vote on Introduction 1652-A to repeal the 1926 Cabaret Law while retaining specified security measures.",
      submittedUrl: "https://council.nyc.gov/press/2017/10/31/1541/",
      projectIds: ["nyc-artist-coalition"],
      entityIds: ["new-york-city-council", "nyc-cabaret-law"],
      dateHints: ["2017-10-31"],
      sensitivity: "public-safe",
      availability: "live",
      status: "promoted",
      sourceIds: ["SRC-NYC-COUNCIL-CABARET-VOTE-2017"],
      claimIds: ["CLM-NYC-CABARET-LAW-COUNCIL-VOTE"],
      inquiryIds: ["INQ-NYCARTC-CABARET-REPEAL-CAUSALITY"]
    },
    {
      id: "INT-2026-07-13-MEMORY-CALLNYC-COUNCIL-ENGAGEMENT",
      kind: "metric",
      capturedAt: "2026-07-13",
      submittedBy: "Jamie Burkart",
      publicSafeDescription: "Research lead concerning engagement by New York City Council member accounts with the public CallNYC social-media account.",
      projectIds: ["callnyc"],
      entityIds: ["new-york-city-council"],
      dateHints: ["2016"],
      sensitivity: "public-safe",
      availability: "unknown",
      status: "deferred",
      sourceIds: [],
      claimIds: [],
      inquiryIds: ["INQ-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT"],
      dispositionReason: "Requires a bounded account list, time window, metric definitions, capture method, and missing-post analysis before any number is publishable."
    },
    {
      id: "INT-2026-07-13-MEMORY-NYCARTC-OFFICE-NIGHTLIFE-ROLE",
      kind: "memory",
      capturedAt: "2026-07-13",
      submittedBy: "Jamie Burkart",
      publicSafeDescription: "Jamie's memory of an instrumental coalition role in creating New York City's first Office of Nightlife.",
      projectIds: ["nyc-artist-coalition"],
      entityIds: ["nyc-artist-coalition", "nyc-office-of-nightlife"],
      dateHints: ["2017"],
      sensitivity: "public-safe",
      availability: "unknown",
      status: "deferred",
      sourceIds: [],
      claimIds: [],
      inquiryIds: ["INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE"],
      dispositionReason: "Context and institutional outcome are sourced; Jamie's exact contribution requires additional public or collaborator evidence."
    },
    {
      id: "INT-2026-07-13-MEMORY-NYCARTC-TOWN-HALLS",
      kind: "memory",
      capturedAt: "2026-07-13",
      submittedBy: "Jamie Burkart",
      publicSafeDescription: "Jamie's memory of producing large town halls intended to help the Office of Nightlife protect small, diverse cultural spaces.",
      projectIds: ["nyc-artist-coalition"],
      entityIds: ["nyc-artist-coalition", "nyc-office-of-nightlife"],
      dateHints: ["2017 onward"],
      sensitivity: "public-safe",
      availability: "unknown",
      status: "deferred",
      sourceIds: [],
      claimIds: [],
      inquiryIds: ["INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS"],
      dispositionReason: "Requires event records, public notices, attendance or scale evidence, Jamie's production role, and collective credits."
    },
    {
      id: "INT-2026-07-13-MEMORY-TALKS-NOT-RAIDS-MARCH",
      kind: "memory",
      capturedAt: "2026-07-13",
      submittedBy: "Jamie Burkart",
      publicSafeDescription: "Jamie's memory of Talks Not Raids work seeking transparency about M.A.R.C.H. enforcement operations and contributing to their eventual disbandment.",
      projectIds: ["nyc-artist-coalition"],
      entityIds: ["nyc-artist-coalition"],
      dateHints: ["2017 onward"],
      sensitivity: "public-safe",
      availability: "unknown",
      status: "deferred",
      sourceIds: [],
      claimIds: [],
      inquiryIds: ["INQ-NYCARTC-TALKS-NOT-RAIDS-MARCH"],
      dispositionReason: "Requires public campaign artifacts, enforcement records, chronology, the official disposition of M.A.R.C.H., and evidence connecting coalition advocacy to the outcome."
    }
  ],
  entities: [
    {
      id: "charlotte-street-foundation",
      kind: "organization",
      name: "Charlotte Street Foundation",
      aliases: ["Charlotte Street"],
      publicDescription: "Kansas City arts organization that presented Great Accommodations in 2009."
    },
    {
      id: "let-nyc-dance",
      kind: "campaign",
      name: "Let NYC Dance",
      aliases: [],
      publicDescription: "Collective campaign banner used by organizations advocating Cabaret Law repeal."
    },
    {
      id: "mississippi-river",
      kind: "place",
      name: "Mississippi River",
      aliases: [],
      publicDescription: "River in the publicly described route and river-city network of Jamie's water projects."
    },
    {
      id: "missouri-river",
      kind: "place",
      name: "Missouri River",
      aliases: [],
      publicDescription: "Kansas City's historic waterway and an organizing subject of Jamie's raft and participatory projects."
    },
    {
      id: "new-york-city-council",
      kind: "organization",
      name: "New York City Council",
      aliases: ["NYC Council"],
      publicDescription: "Municipal legislative body appearing in CallNYC and nightlife-policy records."
    },
    {
      id: "nyc-artist-coalition",
      kind: "organization",
      name: "NYC Artist Coalition",
      aliases: ["NYC Arts Coalition"],
      publicDescription: "Artist and cultural-space coalition active in New York City civic and nightlife advocacy."
    },
    {
      id: "nyc-cabaret-law",
      kind: "law",
      name: "New York City Cabaret Law",
      aliases: ["Cabaret Law", "1926 Cabaret Law"],
      publicDescription: "1926 licensing law targeted by a collective 2017 repeal campaign."
    },
    {
      id: "nyc-office-of-nightlife",
      kind: "public-office",
      name: "New York City Office of Nightlife",
      aliases: ["Office of Nightlife"],
      publicDescription: "Municipal office established in 2017 to engage nightlife stakeholders and review industry issues."
    },
    {
      id: "porter-bridge-gallery",
      kind: "venue",
      name: "Porter Bridge Gallery",
      aliases: [],
      publicDescription: "University of California, Santa Cruz gallery where Open House took place in 2006."
    }
  ],
  projects: [
    {
      id: "callnyc",
      title: "CallNYC",
      summary: "Independent civic-data prototype translating CouncilStat constituent-services records into resident-facing pathways.",
      status: "historical",
      period: { start: "2016", end: "2016" },
      entityIds: [],
      publicSurfaceCandidates: ["/work/callnyc"],
      photoResearchPrompts: [
        "Interfaces, working sessions, and public artifacts that show how CouncilStat records became resident pathways."
      ]
    },
    {
      id: "nyc-artist-coalition",
      title: "NYC Artist Coalition",
      summary: "Collective civic, cultural-space, nightlife, public-web, and policy-communications work in which Jamie contributed coalition-building and operating infrastructure.",
      status: "ongoing",
      period: { start: "2017" },
      entityIds: [
        "nyc-artist-coalition",
        "let-nyc-dance",
        "nyc-cabaret-law",
        "nyc-office-of-nightlife",
        "new-york-city-council"
      ],
      publicSurfaceCandidates: ["/work/fair-rent-nyc", "/work/technical-operations"],
      photoResearchPrompts: [
        "Public rallies, hearings, town halls, working sessions, campaign sites, and facilitation moments that show Jamie's role without converting collective work into solo credit."
      ]
    },
    {
      id: "open-house",
      title: "Open House",
      summary: "Ten-day 2006 participatory gallery experiment in communal living, shared responsibility, facilitation, and public documentation.",
      status: "historical",
      period: { start: "2006", end: "2006" },
      entityIds: ["porter-bridge-gallery"],
      publicSurfaceCandidates: [],
      photoResearchPrompts: [
        "Wide views of the inhabited gallery, public participation, shared making, facilitation, and contemporaneous documentation with participant rights reviewed."
      ]
    },
    {
      id: "water-publics",
      title: "Water Publics",
      summary: "Raft, installation, correspondence, and participatory programs using connected waterways to help city residents imagine civic and regional relationships.",
      status: "historical",
      period: { start: "2007", end: "2009" },
      entityIds: ["charlotte-street-foundation", "missouri-river", "mississippi-river"],
      publicSurfaceCandidates: [],
      photoResearchPrompts: [
        "The bicycle-powered raft, river encounters, correspondence, maps, installation components, public programs, and resident participation along connected waterways."
      ]
    }
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
      projectIds: ["callnyc"],
      intakeIds: [],
      reviewStatus: "reviewed",
      reviewedAt: "2026-07-11",
      reviewedBy: ["Jamie Burkart", "Codex archival review"],
      legacyImportedAt: "2026-07-11",
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
      projectIds: ["callnyc"],
      intakeIds: [],
      reviewStatus: "reviewed",
      reviewedAt: "2026-07-11",
      reviewedBy: ["Jamie Burkart", "Codex archival review"],
      legacyImportedAt: "2026-07-11",
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
      projectIds: ["callnyc"],
      intakeIds: [],
      reviewStatus: "reviewed",
      reviewedAt: "2026-07-11",
      reviewedBy: ["Jamie Burkart", "Codex archival review"],
      legacyImportedAt: "2026-07-11",
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
      projectIds: ["callnyc"],
      intakeIds: [],
      reviewStatus: "reviewed",
      reviewedAt: "2026-07-11",
      reviewedBy: ["Jamie Burkart", "Codex archival review"],
      legacyImportedAt: "2026-07-11",
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
      projectIds: ["callnyc"],
      intakeIds: [],
      reviewStatus: "reviewed",
      reviewedAt: "2026-07-11",
      reviewedBy: ["Jamie Burkart", "Codex archival review"],
      legacyImportedAt: "2026-07-11",
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
      projectIds: ["callnyc"],
      intakeIds: [],
      reviewStatus: "reviewed",
      reviewedAt: "2026-07-11",
      reviewedBy: ["Jamie Burkart", "Codex archival review"],
      legacyImportedAt: "2026-07-11",
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
      projectIds: ["callnyc"],
      intakeIds: [],
      reviewStatus: "reviewed",
      reviewedAt: "2026-07-11",
      reviewedBy: ["Jamie Burkart", "Codex archival review"],
      legacyImportedAt: "2026-07-11",
      protectedLocatorId: "RESEARCH-CALLNYC-CIVIC-HALL-CDX-2026-001",
      supportsGenerally: ["bounded negative search finding", "research method and limitations"],
      doesNotEstablish: ["that no event page ever existed"]
    },
    ...lifecycleSources
  ],
  claims: [
    {
      id: "CLM-CALLNYC-HACKATHON-DATE-TIME",
      project: "callnyc",
      claimType: "chronology",
      internalClaim: "The New York City Council constituent-services hackathon took place at Civic Hall on January 30, 2016, from 1-3 p.m.",
      status: "confirmed",
      publicationStatus: "public",
      editorialStatus: "active",
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
      claimType: "attributed-description",
      internalClaim: "The New York City Council described the gathering as its first CouncilStat hackathon.",
      status: "confirmed-with-boundary",
      publicationStatus: "qualified",
      editorialStatus: "active",
      projections: [{ key: "case-study", text: "The Council described the gathering as its first CouncilStat hackathon.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368", relationship: "direct-support", supports: ["the Council's own first-CouncilStat description"], confidence: "high", renderCitation: true }],
      boundaries: ["Preserve attribution to the Council and the narrower CouncilStat wording."],
      antiClaims: ["first civic-data hackathon", "first civic-tech hackathon", "the Council's first hackathon of any kind"],
      researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-EVENT-BRANDING",
      project: "callnyc",
      claimType: "attributed-description",
      internalClaim: "The surviving promotional graphic uses the branding 'New York City Council Hackathon.'",
      status: "confirmed-with-boundary",
      publicationStatus: "qualified",
      editorialStatus: "active",
      projections: [{ key: "case-study", text: "The surviving promotional graphic uses the branding 'New York City Council Hackathon.'", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC", relationship: "direct-support", supports: ["graphic wording", "event branding"], confidence: "high", renderCitation: true }],
      boundaries: ["Treat the wording as visible branding, not proof of a longer formal registration title."],
      antiClaims: [], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
      project: "callnyc",
      claimType: "activity",
      internalClaim: "After the fuller CouncilStat dataset was released, Jamie independently built CallNYC as a public-facing interpretation of those constituent-services records.",
      status: "confirmed-with-boundary",
      publicationStatus: "qualified",
      editorialStatus: "active",
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
      claimType: "attributed-description",
      internalClaim: "CallNYC is an archived independent civic-data prototype, not an official or current New York City Council service.",
      status: "confirmed-with-boundary",
      publicationStatus: "qualified",
      editorialStatus: "active",
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
      claimType: "activity",
      internalClaim: "A participant photograph documents a breakout table labeled 'Digital District - Help improve City Council District office operations.'",
      status: "use-with-care",
      publicationStatus: "qualified",
      editorialStatus: "candidate",
      projections: [{ key: "photo-caption", text: "Participant photograph documenting the Digital District breakout table.", status: "hold", citationRequired: true, surfaces: [] }],
      evidence: [{ sourceId: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO", relationship: "private-support", supports: ["placard wording", "breakout-table context"], confidence: "high", renderCitation: false }],
      boundaries: ["Do not describe Digital District as the official event title.", "Do not publish the photograph before rights, consent, and editorial review."],
      antiClaims: [], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-CIVIC-HALL-PAGE-NOT-RECOVERED",
      project: "callnyc",
      claimType: "negative-research-finding",
      internalClaim: "No Civic Hall calendar listing or dedicated event-detail page was recovered in the documented Wayback/CDX review.",
      status: "not-recovered",
      publicationStatus: "internal-only",
      editorialStatus: "active",
      projections: [{ key: "archive-note", text: "No Civic Hall calendar listing or dedicated event-detail page has been recovered in the documented Wayback/CDX review.", status: "active", citationRequired: false, surfaces: ["docs/knowledge-bank/projects/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-CIVIC-HALL-RESEARCH-2026", relationship: "direct-support", supports: ["bounded negative search finding"], confidence: "high", renderCitation: false }],
      boundaries: ["Negative search is not proof of nonexistence.", "The archived Civic Hall page preserves embedded social-feed evidence, not a recovered event listing."],
      antiClaims: ["No Civic Hall event page existed."],
      researchInquiryIds: ["INQ-CALLNYC-CIVIC-HALL-PAGE-2026"], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    ...lifecycleClaims
  ],
  researchInquiries: [
    {
      id: "INQ-CALLNYC-CIVIC-HALL-PAGE-2026",
      project: "callnyc",
      intakeIds: [],
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
    ...lifecycleResearchInquiries
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
      id: "fair-rent-nyc",
      surface: "/work/fair-rent-nyc",
      sourceOrder: [
        "SRC-NYCARTC-NPR-NIGHTLIFE-2017",
        "SRC-NYCARTC-GOTHAMIST-CABARET-2017"
      ],
      occurrences: [
        {
          id: "nycartc-founding-role",
          claimId: "CLM-NYCARTC-FOUNDING-ROLE",
          projection: "case-study",
          sourceIds: ["SRC-NYCARTC-NPR-NIGHTLIFE-2017", "SRC-NYCARTC-GOTHAMIST-CABARET-2017"]
        },
        {
          id: "nycartc-cabaret-advocacy",
          claimId: "CLM-NYCARTC-CABARET-LAW-ADVOCACY",
          projection: "case-study",
          sourceIds: ["SRC-NYCARTC-GOTHAMIST-CABARET-2017", "SRC-NYCARTC-NPR-NIGHTLIFE-2017"]
        }
      ]
    }
  ]
} satisfies KnowledgeBank;

export const knowledgeBank = knowledgeBankSchema.parse(knowledgeBankInput);
