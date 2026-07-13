import { knowledgeBankSchema, type KnowledgeBank } from "./schema.ts";

const knowledgeBankInput = {
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
    {
      id: "SRC-WATERWAYS-PITCH-HUCK-FINN-2007",
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
      publicNote: "Contemporaneous reporting identifies Jamie as the originator of an experiential river expedition and documents a recycled-material raft crossing Missouri.",
      supportsGenerally: ["Jamie conceived the expedition", "recycled-material raft", "Missouri River context", "connection between transportation history and public art"],
      doesNotEstablish: ["completion of the full route to the Gulf of Mexico", "the exact final landing point", "Jamie's sole authorship of the collective expedition", "a complete participant roster"]
    },
    {
      id: "SRC-WATERWAYS-CHARLOTTE-STREET-GREAT-ACCOMMODATIONS-2009",
      title: "Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water",
      organization: "Charlotte Street Foundation",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2009-09-01",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
      preferredPublicUrl: "canonical",
      publicCitation: "Charlotte Street Foundation, 'Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water,' September 1, 2009.",
      publicNote: "The institutional project page describes Jamie as spearheading a participatory river-city exhibition and credits Suzanne Hogan as a collaborator in its outreach.",
      supportsGenerally: ["Great Accommodations project and exhibition", "Jamie's project leadership", "Suzanne Hogan collaboration", "participatory river-city outreach", "interactive installation and public-program components", "Jamie's retrospective account of the raft journey"],
      doesNotEstablish: ["Jamie's sole authorship of every project component", "independent verification of every detail in Jamie's retrospective raft account", "a complete collaborator list", "the exact final landing point of the raft journey"]
    },
    {
      id: "SRC-PARTICIPATION-GOOD-TIMES-OPEN-HOUSE-2006",
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
      publicNote: "Contemporaneous reporting documents Jamie's ten-day Open House experiment, earlier collectively produced Shop Shows, and his explicit commitment to communal responsibility and decision-making.",
      supportsGenerally: ["Open House at Porter Bridge Gallery", "ten-day communal-living and participatory-art experiment", "Shop Shows from 2003 to 2005", "communal responsibility and decision-making", "inclusive public participation"],
      doesNotEstablish: ["Jamie as sole leader or sole author", "a complete participant roster", "a permanent housing program", "the safety or consent status of publishing every participant detail"]
    },
    {
      id: "SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19",
      title: "DIY Venues Demand Repeal Of Widely Reviled Cabaret Law",
      organization: "Gothamist",
      author: "Emma Whitford",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-06-19",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
      preferredPublicUrl: "canonical",
      publicCitation: "Emma Whitford, 'DIY Venues Demand Repeal Of Widely Reviled Cabaret Law,' Gothamist, June 19, 2017.",
      publicNote: "The reporting identifies Jamie with NYC Artist Coalition, documents his fire-code study groups and City Hall advocacy, and quotes his public-safety analysis of the Cabaret Law.",
      supportsGenerally: ["Jamie's NYC Artist Coalition affiliation", "fire-code study groups organized by Jamie", "Jamie's participation in City Hall repeal advocacy", "Jamie's public-safety framing", "Cabaret Law and Office of Nightlife policy context"],
      doesNotEstablish: ["Jamie alone repealed the Cabaret Law", "Jamie alone created NYC Artist Coalition", "Jamie authored the repeal legislation", "Jamie alone created the Office of Nightlife", "the complete coalition campaign history"]
    },
    {
      id: "SRC-NYCA-NPR-CABARET-REPEAL-2017-09-20",
      title: "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife",
      organization: "NPR",
      author: "Jane Lerner",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-09-20",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife",
      preferredPublicUrl: "canonical",
      publicCitation: "Jane Lerner, 'With Its No Dancing Law Verging On Repeal, New York Legitimizes Its Nightlife,' NPR, September 20, 2017.",
      publicNote: "Captured as national context for the Cabaret Law repeal movement. Direct access to the canonical page was blocked during this review, so person-specific use requires a later close reading.",
      supportsGenerally: ["national coverage of the 2017 Cabaret Law repeal movement", "nightlife and cultural-space policy context"],
      doesNotEstablish: ["Jamie's role in the repeal campaign", "NYC Artist Coalition's complete role", "Jamie's role in creating the Office of Nightlife", "causality for the final policy outcome"]
    }
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
        { key: "work-card", text: "Jamie built CallNYC.org as an archived, unofficial, independent civic-data prototype translating CouncilStat constituent-services records into resident-facing issue pathways and next-step guidance.", status: "active", citationRequired: false, surfaces: ["/work", "/work/callnyc"] },
        { key: "resume-html", text: "Jamie built CallNYC.org as an archived, unofficial, independent follow-on to the New York City Council's first CouncilStat hackathon, translating constituent-services data into resident-facing issue pages and next-step guidance; covered in Politico New York.", status: "active", citationRequired: false, surfaces: ["/resume"] }
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
    }
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
  }],
  corrections: [
    { id: "COR-CALLNYC-CHRONOLOGY-2026", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", previousText: "2014-2015", replacementText: "2016", reason: "Recovered event, data-release, and press chronology places the project in 2016.", decidedAt: "2026-07-11", affectedSurfaces: ["/work", "/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-SUPERLATIVE-2026", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", previousText: "first civic-data hackathon", replacementText: "first CouncilStat hackathon", reason: "The event-day Council post supports only the narrower phrase.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-EVENT-TIME-2026", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", previousText: "approximately 2:10 p.m. photograph timestamp as event time", replacementText: "1-3 p.m. from the Civic Hall announcement", reason: "Direct event-announcement evidence is stronger than participant photograph metadata for public event hours.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank"], status: "active" }
  ],
  intakeItems: [
    {
      id: "INTAKE-WATERWAYS-PARTICIPATORY-PRACTICE-2026-07-12",
      title: "Waterways, communal space, and participatory cultural practice",
      project: "waterways-participatory-practice",
      kind: "claim-candidate",
      summary: "Jamie surfaced a long arc of participatory work spanning Shop Shows, Open House, a recycled-material river expedition, and Great Accommodations. The sources suggest a durable practice of turning homes, galleries, and waterways into shared structures for participation, communal authorship, and civic imagination.",
      status: "claim-candidate",
      sourceIds: [
        "SRC-WATERWAYS-PITCH-HUCK-FINN-2007",
        "SRC-WATERWAYS-CHARLOTTE-STREET-GREAT-ACCOMMODATIONS-2009",
        "SRC-PARTICIPATION-GOOD-TIMES-OPEN-HOUSE-2006"
      ],
      relatedClaimIds: [],
      candidateClaims: [
        "From 2003 to 2005, Jamie and his housemates held collectively produced Shop Shows in their Santa Cruz home, inviting participants to contribute art, performance, food, and unfinished work.",
        "In 2006, Jamie turned Porter Bridge Gallery into Open House, a ten-day experiment in communal living and participatory art whose responsibility and decision-making he explicitly described as communal.",
        "Jamie conceived an experiential river expedition; a group of Kansas City and California participants traveled across Missouri on a homemade raft built from recycled materials.",
        "In 2009, Jamie spearheaded Great Accommodations and worked with Suzanne Hogan on outreach that invited river communities to contribute stories and perspectives to an interactive exhibition and its public programs."
      ],
      propositions: [
        {
          id: "PROP-WATERWAYS-SHOP-SHOWS-2003-2005",
          text: "From 2003 to 2005, Jamie and his housemates held collectively produced Shop Shows in their Santa Cruz home, inviting participants to contribute art, performance, food, and unfinished work.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-PARTICIPATION-GOOD-TIMES-OPEN-HOUSE-2006"],
          sourceSupport: ["2003-2005 dates", "Jamie and housemates", "open art show", "potluck", "participant performance and workshopping"],
          boundaries: ["Keep the housemates visible as co-producers.", "Do not infer a complete event count, participant count, or program archive."],
          decisionUse: "Supports a future claim about Jamie's early practice of building low-barrier participation structures in domestic cultural space."
        },
        {
          id: "PROP-WATERWAYS-OPEN-HOUSE-2006",
          text: "In 2006, Jamie turned Porter Bridge Gallery into Open House, a ten-day experiment in communal living and participatory art whose responsibility and decision-making he explicitly described as communal.",
          status: "direct-support",
          sourceIds: ["SRC-PARTICIPATION-GOOD-TIMES-OPEN-HOUSE-2006"],
          sourceSupport: ["2006 publication and project context", "ten-day experiment", "communal living", "participatory art", "Jamie's explicit non-leader and communal-decision framing"],
          boundaries: ["Do not describe Open House as a permanent housing program.", "Do not publish sensitive participant circumstances or identities as professional proof."],
          decisionUse: "Supports a concrete facilitation and participatory-program claim while preserving the project's communal governance."
        },
        {
          id: "PROP-WATERWAYS-RAFT-CONCEPTION-2007",
          text: "Jamie conceived an experiential river expedition; a group of Kansas City and California participants traveled across Missouri on a homemade raft built from recycled materials.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-WATERWAYS-PITCH-HUCK-FINN-2007"],
          sourceSupport: ["Jamie originated the idea", "experiential expedition", "Kansas City and California participants", "cross-Missouri travel", "homemade recycled-material raft"],
          boundaries: ["Separate Jamie's conception from the group's collective travel and construction.", "This source does not establish completion to the Gulf, the exact endpoint, or a complete collaborator roster."],
          decisionUse: "Supports a bounded claim about project conception and collective expedition design without overstating route completion."
        },
        {
          id: "PROP-WATERWAYS-GREAT-ACCOMMODATIONS-2009",
          text: "In 2009, Jamie spearheaded Great Accommodations and worked with Suzanne Hogan on outreach that invited river communities to contribute stories and perspectives to an interactive exhibition and its public programs.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-WATERWAYS-CHARLOTTE-STREET-GREAT-ACCOMMODATIONS-2009"],
          sourceSupport: ["2009 exhibition", "Jamie spearheaded the project", "Suzanne Hogan collaboration", "river-community outreach", "contributed stories and perspectives", "interactive exhibition", "public programs"],
          boundaries: ["Credit Suzanne Hogan for the documented outreach collaboration.", "Do not treat Jamie's retrospective raft account on the page as independent verification of every route detail."],
          decisionUse: "Supports claims about public-engagement program design, collaborative outreach, facilitation, and interactive cultural production."
        }
      ],
      researchQuestions: [
        "What route, dates, duration, collaborators, public programs, and stopping points can be independently established for the raft expedition?",
        "Which additional institutional records, photographs, project sites, press accounts, and collaborator memories survive?",
        "How should this early participatory practice connect to Jamie's later hosting, facilitation, civic systems, and public-engagement work without flattening its artistic character?"
      ],
      boundaries: [
        "Do not publish the Gulf-of-Mexico completion claim until route and endpoint evidence is reconciled.",
        "Credit Suzanne Hogan and other collaborators where the sources identify collective work.",
        "Do not convert communal authorship into sole-leadership language.",
        "Do not project this intake item directly to the website; create and approve a governed claim first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-12",
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "INTAKE-NYCA-CULTURAL-SPACE-POLICY-2026-07-12",
      title: "NYC Artist Coalition formation and cultural-space policy campaigns",
      project: "nyc-artist-coalition",
      kind: "memory-fragment",
      summary: "Jamie identifies an instrumental role in creating NYC Artist Coalition and contributing to linked campaigns around Cabaret Law repeal, Office of Nightlife creation and accountability, large public town halls, Talks Not Raids, MARCH raid transparency and disbandment, nightlife enforcement reporting, and protection of small diverse cultural spaces.",
      status: "researching",
      sourceIds: [
        "SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19",
        "SRC-NYCA-NPR-CABARET-REPEAL-2017-09-20"
      ],
      relatedClaimIds: [],
      candidateClaims: [
        "In 2017, Jamie organized fire-code study groups for DIY venues and rallied at City Hall for full repeal of New York City's Cabaret Law.",
        "Speaking publicly as a member of NYC Artist Coalition, Jamie argued that Cabaret Law licensing barriers discouraged otherwise code-compliant spaces from approaching the Fire Department, creating a safety crisis."
      ],
      propositions: [
        {
          id: "PROP-NYCA-FIRE-CODE-STUDY-GROUPS-2017",
          text: "In 2017, Jamie organized fire-code study groups for DIY venues and rallied at City Hall for full repeal of New York City's Cabaret Law.",
          status: "direct-support",
          sourceIds: ["SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19"],
          sourceSupport: ["Jamie organized fire-code study groups", "DIY venue context", "Jamie rallied at City Hall", "full-repeal position"],
          boundaries: ["Do not convert documented advocacy into sole causality for repeal.", "Do not infer the complete study-group curriculum, attendance, or duration from this article."],
          decisionUse: "Supports a concrete public-safety organizing and policy-advocacy claim."
        },
        {
          id: "PROP-NYCA-CABARET-SAFETY-ANALYSIS-2017",
          text: "Speaking publicly as a member of NYC Artist Coalition, Jamie argued that Cabaret Law licensing barriers discouraged otherwise code-compliant spaces from approaching the Fire Department, creating a safety crisis.",
          status: "direct-support",
          sourceIds: ["SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19"],
          sourceSupport: ["Jamie's NYC Artist Coalition affiliation", "Jamie's public analysis", "licensing barrier", "Fire Department access", "safety-crisis framing"],
          boundaries: ["Attribute the analysis to Jamie rather than presenting it as an adjudicated legal finding.", "Do not imply that this statement alone caused legislation or agency change."],
          decisionUse: "Supports a claim about translating venue experience and regulation into a clear public-safety argument."
        },
        {
          id: "PROP-NYCA-OFFICE-OF-NIGHTLIFE-CONTEXT-2017",
          text: "The June 2017 policy context included Council Member Rafael Espinal's proposal for an Office of Nightlife intended to bridge venues, communities, and city government.",
          status: "context-only",
          sourceIds: ["SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19"],
          sourceSupport: ["Rafael Espinal introduced the proposal", "bridge role described in the article", "contemporaneous policy context"],
          boundaries: ["The article does not establish Jamie's role in creating the office.", "Do not use this context proposition as proof of coalition or individual causality."],
          decisionUse: "Preserves the institutional context while withholding a Jamie-specific claim.",
          nextStep: "Review Council legislation, hearing records, campaign materials, town-hall records, and collaborator accounts for Jamie's documented contribution."
        },
        {
          id: "PROP-NYCA-COALITION-FORMATION-MEMORY",
          text: "Jamie remembers playing an instrumental role in creating NYC Artist Coalition and its operating infrastructure.",
          status: "memory-lead",
          sourceIds: [],
          sourceSupport: [],
          boundaries: ["This is Jamie's recollection, not a source-established formation claim.", "Formation credit requires collaborator and contemporaneous-record review."],
          decisionUse: "Preserves a potentially central professional claim for focused formation research.",
          nextStep: "Locate formation messages, early websites, meeting records, first public statements, and accounts from founding collaborators."
        },
        {
          id: "PROP-NYCA-TOWN-HALLS-AND-CAMPAIGN-SYSTEMS-MEMORY",
          text: "Jamie remembers producing large town halls and building campaign websites, policy communications, and coordination systems for NYC Artist Coalition work.",
          status: "memory-lead",
          sourceIds: [],
          sourceSupport: [],
          boundaries: ["No scale, event count, audience count, or comprehensive output list is yet established here.", "Preserve co-producer, convener, host, and institutional credit when records are recovered."],
          decisionUse: "Preserves a high-value implementation and public-engagement thread for event-by-event research.",
          nextStep: "Recover event listings, agendas, programs, recordings, press, campaign repositories, and collaborator accounts; map Jamie's action and each event's outcome."
        },
        {
          id: "PROP-NYCA-TALKS-NOT-RAIDS-MARCH-MEMORY",
          text: "Jamie remembers contributing to Talks Not Raids work that sought MARCH raid transparency and ultimately helped end the raid program.",
          status: "memory-lead",
          sourceIds: [],
          sourceSupport: [],
          boundaries: ["The campaign sequence, Jamie's mechanism of contribution, and the institutional decision to end MARCH are not yet established here.", "Do not claim sole or direct causality without public records and collective context."],
          decisionUse: "Preserves an important public-accountability and enforcement-reform thread for targeted research.",
          nextStep: "Recover MARCH policy and disbandment records, Council oversight materials, Talks Not Raids campaign artifacts, press, and collaborator accounts."
        },
        {
          id: "PROP-NYCA-POLICY-OUTCOMES-MEMORY",
          text: "Jamie remembers contributing materially to collective campaigns around Cabaret Law repeal, Office of Nightlife creation and accountability, nightlife-enforcement transparency, and MARCH disbandment.",
          status: "memory-lead",
          sourceIds: [],
          sourceSupport: [],
          boundaries: ["Treat each policy outcome as a separate causal question.", "Government decisions and collective advocacy outcomes require institutional and collaborator evidence."],
          decisionUse: "Preserves the broader outcome hypothesis without allowing it to function as a current claim.",
          nextStep: "Build a dated campaign-by-campaign source map connecting Jamie's documented actions, collective advocacy, legislation or agency decisions, and public outcomes."
        }
      ],
      researchQuestions: [
        "Which formation records and collaborator accounts establish Jamie's role in creating NYC Artist Coalition?",
        "What did Jamie specifically initiate, produce, host, build, facilitate, document, or steward in each campaign?",
        "Which legislation, hearing records, Council materials, agency records, campaign sites, press reports, and public statements establish the sequence from advocacy to policy outcome?",
        "What public records establish the origin, mandate, transparency changes, and disbandment of MARCH?",
        "Which town halls did Jamie produce, who convened them, how many people participated, and what changed because of them?"
      ],
      boundaries: [
        "Treat Jamie's recollection as a research lead, not self-authenticating proof of causality or scale.",
        "Use collective-credit language and distinguish instrumental contribution from sole causation.",
        "The Gothamist source directly supports fire-code study groups, City Hall advocacy, coalition affiliation, and Jamie's safety analysis; it does not establish the full campaign history.",
        "The NPR source is context only until it is closely read for person- and organization-specific evidence.",
        "Do not project this intake item directly to the website; strengthen or create governed claims first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-12",
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "INTAKE-CALLNYC-COUNCIL-ENGAGEMENT-2026-07-12",
      title: "NYC Council member engagement with CallNYC on Twitter",
      project: "callnyc",
      kind: "metric-lead",
      summary: "Jamie remembers meaningful engagement with the @CallNYCapp account by New York City Council member accounts. The possible evidence includes follows, replies, mentions, retweets, quote posts, likes, and link sharing, but no complete defensible metric has yet been established.",
      status: "captured",
      sourceIds: [],
      relatedClaimIds: [],
      candidateClaims: [],
      propositions: [
        {
          id: "PROP-CALLNYC-COUNCIL-ENGAGEMENT-MEMORY",
          text: "Jamie remembers meaningful engagement with @CallNYCapp by New York City Council member and institutional accounts.",
          status: "memory-lead",
          sourceIds: [],
          sourceSupport: [],
          boundaries: ["Meaningful engagement is not yet defined or counted.", "Historical account ownership, officeholder status, and interaction type require verification."],
          decisionUse: "Preserves a potentially useful adoption and public-sector resonance signal without publishing an unsupported metric.",
          nextStep: "Recover an authenticated export, API corpus, archive, or account-data download and classify every interaction by type, date, and account status."
        },
        {
          id: "PROP-CALLNYC-ENGAGEMENT-METRIC-DEFINITION",
          text: "Any future CallNYC Council-engagement metric must separate follows, replies, mentions, reposts, quote posts, likes, and link shares within a stated historical time window and denominator.",
          status: "research-only",
          sourceIds: [],
          sourceSupport: [],
          boundaries: ["Do not combine unlike interaction types into one promotional total.", "Do not treat a partial visible timeline as a complete corpus."],
          decisionUse: "Defines the minimum evidence contract for promoting the memory into a defensible metric claim.",
          nextStep: "Choose the recoverable corpus first, then document inclusion rules, exclusions, account classification, denominator, and time window before counting."
        }
      ],
      researchQuestions: [
        "Which Council member and institutional Council accounts engaged with @CallNYCapp, in what ways, and on what dates?",
        "Can the complete account timeline and engagement graph be recovered from an authenticated export, API, archive, or Jamie's account data?",
        "Which interactions are attributable to officeholders, staff-managed accounts, institutional accounts, or later handle changes?",
        "What denominator and time window would make any engagement statistic intelligible rather than promotional?"
      ],
      boundaries: [
        "Do not publish counts derived from an incomplete or blocked timeline.",
        "Separate follows, likes, replies, mentions, reposts, and link shares rather than collapsing them into one engagement number.",
        "Preserve historical officeholder and account-status context.",
        "Do not project this intake item directly to the website; create and approve a sourced metric claim first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-12",
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex intake review"]
    }
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
  }]
} satisfies KnowledgeBank;

export const knowledgeBank = knowledgeBankSchema.parse(knowledgeBankInput);
