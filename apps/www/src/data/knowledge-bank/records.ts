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
      id: "SRC-CALLNYC-COUNCIL-MINUTES-2016-09-28",
      title: "New York City Council stated-meeting minutes",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-09-28",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=5b6f62c6-7eae-4d9e-9aec-c8b8fc36438c&ID=38126&M=AO&N=TWludXRlcyBvZiB0aGUgU3RhdGVkIE1lZXRpbmc%3D",
      preferredPublicUrl: "canonical",
      publicCitation: "New York City Council, minutes of the stated meeting, September 28, 2016.",
      publicNote: "The minutes list Helen Rosenthal, Ydanis Rodriguez, Rosie Mendez, Mathieu Eugene, and Peter Koo as serving Council members in 2016.",
      supportsGenerally: ["2016 Council officeholding for the five named members"],
      doesNotEstablish: ["an institutional Council endorsement of CallNYC", "the social-media actions themselves"]
    },
    {
      id: "SRC-CALLNYC-HELEN-ROSENTHAL-780797474277511170",
      title: "Helen Rosenthal constituent-facing CallNYC recommendation",
      organization: "Office of Council Member Helen Rosenthal",
      author: "Helen Rosenthal",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-09-27",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/HelenRosenthal/status/780797474277511170",
      preferredPublicUrl: "canonical",
      publicCitation: "Helen Rosenthal, public post directing constituents to find their Council member through CallNYC.org, September 27, 2016.",
      publicNote: "This is a direct member-authored recommendation of CallNYC to constituents.",
      supportsGenerally: ["Helen Rosenthal publicly recommended CallNYC", "constituent-facing amplification"],
      doesNotEstablish: ["an institutional NYC Council endorsement", "current constituent guidance"]
    },
    {
      id: "SRC-CALLNYC-YDANIS-RODRIGUEZ-733089563334299648",
      title: "Ydanis Rodriguez quote post responding to CallNYC",
      organization: "Office of Council Member Ydanis Rodriguez",
      author: "Ydanis Rodriguez",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-05-19",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/ydanis/status/733089563334299648",
      preferredPublicUrl: "canonical",
      publicCitation: "Ydanis Rodriguez, public quote post responding to CallNYC's recognition of his office's tenant-rights work, May 2016.",
      publicNote: "Rodriguez described protecting tenants' rights as a privilege while quote-amplifying the CallNYC recognition.",
      supportsGenerally: ["Ydanis Rodriguez publicly amplified CallNYC", "affirmative member-authored response"],
      doesNotEstablish: ["an institutional NYC Council endorsement", "exclusive credit for tenant-rights work"]
    },
    {
      id: "SRC-CALLNYC-ROSIE-MENDEZ-733410096915550208",
      title: "Rosie Mendez quote post responding to CallNYC",
      organization: "Office of Council Member Rosie Mendez",
      author: "Rosie Mendez",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-05-19",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/RosieMendez/status/733410096915550208",
      preferredPublicUrl: "canonical",
      publicCitation: "Rosie Mendez, public quote post thanking her team in response to CallNYC's recognition of emergency-repair constituent work, May 19, 2016.",
      publicNote: "Mendez quote-amplified the CallNYC recognition and credited her staff.",
      supportsGenerally: ["Rosie Mendez publicly amplified CallNYC", "collective team credit"],
      doesNotEstablish: ["an institutional NYC Council endorsement", "Jamie as the source of the office's constituent-service work"]
    },
    {
      id: "SRC-CALLNYC-MATHIEU-EUGENE-783305320508514304",
      title: "Mathieu Eugene quote post responding to CallNYC",
      organization: "Office of Council Member Mathieu Eugene",
      author: "Mathieu Eugene",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-10-04",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/CMMathieuEugene/status/783305320508514304",
      preferredPublicUrl: "canonical",
      publicCitation: "Mathieu Eugene, public quote post responding to CallNYC's recognition of his office's housing work, October 4, 2016.",
      publicNote: "Eugene described himself as honored to help constituents while quote-amplifying the CallNYC recognition.",
      supportsGenerally: ["Mathieu Eugene publicly amplified CallNYC", "affirmative member-authored response"],
      doesNotEstablish: ["an institutional NYC Council endorsement", "exclusive credit for housing assistance"]
    },
    {
      id: "SRC-CALLNYC-PETER-KOO-RETWEET-725422714807267328",
      title: "Peter Koo retweet of CallNYC Lifeline recognition",
      organization: "Office of Council Member Peter Koo",
      author: "Peter Koo",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2016-04-27",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/CMPeterKoo/status/725422714807267328",
      archiveUrl: "https://web.archive.org/web/20200625082202/https://twitter.com/CallNYCapp/status/725403215282487296/photo/1?utm_source=fb&utm_medium=fb&utm_campaign=CMPeterKoo&utm_content=725422714807267328",
      preferredPublicUrl: "archive",
      publicCitation: "Archived CallNYC post and still-resolvable Peter Koo retweet-object URL documenting Koo's retweet of the project's Lifeline recognition, April 27, 2016.",
      publicNote: "The retweet is directly supported. A like is strongly indicated by the archived combined engagement row but is not separately attributed in public wording.",
      supportsGenerally: ["Peter Koo retweeted CallNYC", "public amplification of the Lifeline recognition"],
      doesNotEstablish: ["a separately attributable like", "an institutional NYC Council endorsement"]
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
      id: "CLM-CALLNYC-COUNCIL-MEMBER-AMPLIFICATION",
      project: "callnyc",
      internalClaim: "At least five sitting NYC Council members publicly amplified CallNYC in 2016 through a constituent-facing recommendation, affirmative quote posts, and a verified retweet.",
      status: "confirmed-with-boundary",
      projections: [
        { key: "case-study", text: "At least five sitting NYC Council members publicly amplified CallNYC in 2016 through a constituent-facing recommendation, affirmative quote posts, and a verified retweet.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] },
        { key: "resume-html", text: "At least five sitting NYC Council members publicly amplified CallNYC in 2016.", status: "active", citationRequired: false, surfaces: ["/resume"] },
        { key: "technical-operations", text: "Earned public amplification from at least five sitting NYC Council members.", status: "active", citationRequired: false, surfaces: ["/work/technical-operations"] }
      ],
      evidence: [
        { sourceId: "SRC-CALLNYC-COUNCIL-MINUTES-2016-09-28", relationship: "context", supports: ["the five named people were serving Council members in 2016"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-HELEN-ROSENTHAL-780797474277511170", relationship: "direct-support", supports: ["direct constituent-facing recommendation of CallNYC"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-YDANIS-RODRIGUEZ-733089563334299648", relationship: "direct-support", supports: ["affirmative quote-amplification by Ydanis Rodriguez"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-ROSIE-MENDEZ-733410096915550208", relationship: "direct-support", supports: ["quote-amplification and staff credit by Rosie Mendez"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-MATHIEU-EUGENE-783305320508514304", relationship: "direct-support", supports: ["affirmative quote-amplification by Mathieu Eugene"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-PETER-KOO-RETWEET-725422714807267328", relationship: "direct-support", supports: ["verified retweet by Peter Koo"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["This is public amplification by individual member accounts, not an official NYC Council endorsement.", "At least five is a verified minimum, not a complete historical census."],
      antiClaims: ["The NYC Council officially endorsed CallNYC", "Only five Council members engaged", "Every CallNYC mention, tag, like, or repost came from a Council member"],
      researchInquiryIds: [], reviewedAt: "2026-07-12", reviewedBy: ["Jamie Burkart", "Codex authenticated timeline and archival review"]
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
  pages: [{
    id: "callnyc",
    surface: "/work/callnyc",
    sourceOrder: [
      "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
      "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
      "SRC-CALLNYC-POLITICO-2016-03-14",
      "SRC-CALLNYC-GITHUB-REPOSITORY",
      "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC",
      "SRC-CALLNYC-COUNCIL-MINUTES-2016-09-28",
      "SRC-CALLNYC-HELEN-ROSENTHAL-780797474277511170",
      "SRC-CALLNYC-YDANIS-RODRIGUEZ-733089563334299648",
      "SRC-CALLNYC-ROSIE-MENDEZ-733410096915550208",
      "SRC-CALLNYC-MATHIEU-EUGENE-783305320508514304",
      "SRC-CALLNYC-PETER-KOO-RETWEET-725422714807267328"
    ],
    occurrences: [
      { id: "event-date-time", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", projection: "case-study", sourceIds: ["SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
      { id: "first-councilstat-hackathon", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
      { id: "independent-follow-on", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"] },
      { id: "event-branding", claimId: "CLM-CALLNYC-EVENT-BRANDING", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC"] },
      { id: "press-coverage", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14"] },
      { id: "council-member-amplification", claimId: "CLM-CALLNYC-COUNCIL-MEMBER-AMPLIFICATION", projection: "case-study", sourceIds: ["SRC-CALLNYC-COUNCIL-MINUTES-2016-09-28", "SRC-CALLNYC-HELEN-ROSENTHAL-780797474277511170", "SRC-CALLNYC-YDANIS-RODRIGUEZ-733089563334299648", "SRC-CALLNYC-ROSIE-MENDEZ-733410096915550208", "SRC-CALLNYC-MATHIEU-EUGENE-783305320508514304", "SRC-CALLNYC-PETER-KOO-RETWEET-725422714807267328"] },
      { id: "archived-status", claimId: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS", projection: "case-study", sourceIds: ["SRC-CALLNYC-GITHUB-REPOSITORY", "SRC-CALLNYC-POLITICO-2016-03-14"] }
    ]
  }]
} satisfies KnowledgeBank;

export const knowledgeBank = knowledgeBankSchema.parse(knowledgeBankInput);
