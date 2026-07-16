import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-16";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated public-safe archival review"
];

const ids = {
  corpus: "SRC-JAMIE-FACEBOOK-POST-CORPUS-2026",
  report: "SRC-JAMIE-FACEBOOK-POST-REPORT-2026",
  graphRun: "SRC-JAMIE-FACEBOOK-GRAPH-RUN-2026",
  visualRun: "SRC-JAMIE-FACEBOOK-VISUAL-RUN-2026",
  nterPost: "SRC-JAMIE-FACEBOOK-NTER-OPENING-2010",
  wowListPost: "SRC-JAMIE-FACEBOOK-WOWLIST-NINE-CITIES-2015",
  councilStatPost: "SRC-JAMIE-FACEBOOK-COUNCILSTAT-JOB-2016",
  letNycDancePost: "SRC-JAMIE-FACEBOOK-LETNYCDANCE-NPR-2017",
  kcTownHallPost: "SRC-JAMIE-FACEBOOK-KCTOWNHALL-START-2018",
  talksNotRaidsPost: "SRC-JAMIE-FACEBOOK-TALKSNOTRAIDS-ACTION-2019",
  populationClaim: "CLM-JAMIE-FACEBOOK-OWNER-POST-POPULATION",
  audienceClaim: "CLM-JAMIE-FACEBOOK-AUDIENCE-RECONCILIATION",
  sourceClaim: "CLM-JAMIE-FACEBOOK-POSTED-SOURCE-ROUTING",
  practiceClaim: "CLM-JAMIE-FACEBOOK-PARTICIPATION-ROUTING-PRACTICE",
  stakeholderClaim: "CLM-JAMIE-FACEBOOK-STAKEHOLDER-REFERENCES",
  signalClaim: "CLM-JAMIE-FACEBOOK-SELECTED-PUBLIC-SIGNALS",
  councilStatClaim: "CLM-JAMIE-FACEBOOK-COUNCILSTAT-LANGUAGE",
  populationInquiry: "INQ-JAMIE-FACEBOOK-POPULATION",
  sourceInquiry: "INQ-JAMIE-FACEBOOK-POSTED-SOURCES",
  engagementInquiry: "INQ-JAMIE-FACEBOOK-STAKEHOLDER-ENGAGEMENT",
  councilStatInquiry: "INQ-JAMIE-FACEBOOK-COUNCILSTAT-ROLE"
} as const;

const publicPost = (
  id: string,
  title: string,
  publishedAt: string,
  canonicalUrl: string,
  publicCitation: string,
  publicNote: string,
  supportsGenerally: string[],
  doesNotEstablish: string[]
): SourceRecord => ({
  id,
  title,
  author: "Jamie Burkart",
  kind: "institutional-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: reviewedAt,
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote,
  supportsGenerally,
  doesNotEstablish
});

export const personalFacebookPostReviewSummary = {
  ownerFilteredRecords: 1243,
  cursorPages: 621,
  returnedNodes: 3728,
  terminalHasNextPage: false,
  missingDates: 0,
  ownerAbsent: 0,
  dateRange: { earliest: "2006-12-19", latest: "2022-06-12" },
  graphAudienceLabels: { public: 268, friends: 1, onlyMe: 1, unlabeled: 973 },
  visualAudienceLabels: {
    public: 671,
    friends: 204,
    onlyMe: 98,
    unlabeled: 270
  },
  visuallyAvailableRecords: 1237,
  visuallyUnavailableRecords: 6,
  missionRoutedRecords: 181,
  externalUrlBearingRecords: 430,
  uniqueNormalizedExternalUrls: 549,
  selectedPublicPosts: 6
} as const;

export const personalFacebookPostSources: SourceRecord[] = [
  {
    id: ids.corpus,
    title: "Jamie Burkart personal Facebook full-population public-safe controls",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated public-safe archival review",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/corpora/jamie-personal-facebook-posts-full-population-2026-07-16.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart personal Facebook full-population public-safe controls, reconciled July 16, 2026.",
    publicNote:
      "A minimized control artifact accounts for 1,243 owner-filtered records, reconciles two capture methods, preserves aggregate mission and route classifications, and promotes six individually rechecked public posts without publishing bulk post text or social-graph identities.",
    supportsGenerally: [
      "1,243-record current owner-filtered population",
      "621-page terminal cursor traversal",
      "December 2006 through June 2022 visible chronology",
      "method-specific audience reconciliation",
      "181 mission-routed records",
      "549 normalized external source and action-route leads"
    ],
    doesNotEstablish: [
      "a native Meta export, deletion history, or immutable lifetime publication count",
      "that every record was or is public",
      "authorship of quoted, shared, linked, photographed, or collaborator-created material",
      "readership, engagement, endorsement, conversion, causality, or impact"
    ]
  },
  {
    id: ids.report,
    title: "Jamie Burkart personal Facebook archival-production report",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated public-safe archival review",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/jamie-personal-facebook-posts.md",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart personal Facebook archival-production report, July 16, 2026.",
    publicNote:
      "Documents population controls, source discovery, mission routing, selected public records, engagement boundaries, and the decision to keep new social metrics off the portfolio site.",
    supportsGenerally: [
      "capture and reconciliation method",
      "privacy and collective-credit boundaries",
      "source-lead disposition",
      "projection decision"
    ],
    doesNotEstablish: [
      "a native Meta owner export",
      "complete deleted or hidden history",
      "audience response by stakeholder identity",
      "permission to publish protected records"
    ]
  },
  {
    id: ids.graphRun,
    title: "Authenticated Jamie Burkart Facebook graph-cursor research run",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-13 through 2026-07-15",
    publicCitation:
      "Protected graph-cursor census of Jamie Burkart's owner-filtered Facebook Manage Posts surface, July 2026.",
    publicNote:
      "The protected run traversed 621 cursor pages to a terminal false value, deduplicated 3,728 returned nodes into 1,243 records, recovered structural URL fields, and retained raw record bodies outside the public repository.",
    protectedLocatorId: "LOC-JAMIE-FACEBOOK-GRAPH-RUN-2026",
    supportsGenerally: [
      "terminal pagination control",
      "population, chronology, record-form, URL, mission, and reference aggregates"
    ],
    doesNotEstablish: [
      "a lifetime account archive",
      "public audience for unlabeled records",
      "reliable population-wide interaction counters",
      "permission to publish raw records"
    ]
  },
  {
    id: ids.visualRun,
    title: "Authenticated Jamie Burkart Facebook visual research run",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Protected visual traversal of Jamie Burkart's owner-filtered Facebook Manage Posts surface, July 16, 2026.",
    publicNote:
      "A second full traversal independently recovered the same 1,243 records and exposed audience labels for 973 records. Raw text, nonpublic records, comments, identities, media, and authenticated state remain protected.",
    protectedLocatorId: "LOC-JAMIE-FACEBOOK-VISUAL-RUN-2026",
    supportsGenerally: [
      "independent 1,243-record reconciliation",
      "671 Public, 204 Friends, 98 Only me, and 270 unlabeled capture-date audience states",
      "six unavailable record shells"
    ],
    doesNotEstablish: [
      "historical audience settings at publication time",
      "a native Meta export",
      "permission to publish nonpublic records",
      "population-wide engagement"
    ]
  },
  publicPost(
    ids.nterPost,
    "Jamie Burkart public NTER CHNG opening post",
    "2010-01-10",
    "https://www.facebook.com/jburkart/posts/226963042167",
    "Jamie Burkart, public Facebook post about the NTER CHNG opening, January 10, 2010.",
    "The public post preserves a dated opening trace and credits Drew Bolton, Jamie Burkart, and Garrett Fuselier as creators of the interactive text-messaging work.",
    ["dated opening trace", "three co-creator credits", "a public opening-album route"],
    ["division of technical labor", "sole authorship", "media-republication rights"]
  ),
  publicPost(
    ids.wowListPost,
    "Jamie Burkart public WOW List nine-city routing post",
    "2015-10-05",
    "https://www.facebook.com/jburkart/posts/pfbid02hjaUtK2swFUy1XeNkQjqUnZj4M6ecbYpPjGa365MFo2oWR57HwEqNdrhSDQjJjBMl",
    "Jamie Burkart, public Facebook post about WOW List community calendars in nine cities, October 5, 2015.",
    "The public post attributes nine community calendars to WOW List members, provides a join route, and displayed 28 likes and eight comments when rechecked July 16, 2026.",
    ["Jamie's attributed nine-city statement", "a join route", "mutable capture-date aggregate counters"],
    ["independently verified sustained activity in every city", "a lifetime city count", "reach, conversion, or impact"]
  ),
  publicPost(
    ids.councilStatPost,
    "Jamie Burkart public CouncilStat job-routing post",
    "2016-05-18",
    "https://www.facebook.com/jburkart/posts/pfbid023maJq9xB4QQYyFzJswPL5tbT2ToUbJxJ5MRnV9L51y94fPDVZVuHcVGsuBpmEnTSl",
    "Jamie Burkart, public Facebook post routing readers to a New York City Council CouncilStat job notice, May 18, 2016.",
    "The public post preserves Jamie's attributed invitation language and a CouncilStat job route; it displayed seven likes and no comments when rechecked July 16, 2026.",
    ["Jamie's first-person invitation language", "CouncilStat job route", "mutable capture-date aggregate counters"],
    ["employment, title, contract, formal team membership, hiring authority, or authorship of the job notice"]
  ),
  publicPost(
    ids.letNycDancePost,
    "Jamie Burkart public Let NYC Dance press-and-action post",
    "2017-09-20",
    "https://www.facebook.com/jburkart/posts/pfbid021AY6ydWmHSAXQooc1KgivMWjY3jcuWSj958Z73MQ6fJick7jNaHHDwfKgZuo7cbal",
    "Jamie Burkart, public Facebook post pairing NPR Cabaret Law coverage with a Let NYC Dance action route, September 20, 2017.",
    "The public post pairs Jamie's NPR quotation with a Council call to action and a Let NYC Dance call-script route; it displayed 24 reactions when rechecked July 16, 2026.",
    ["press-to-action routing", "Council contact and campaign call-script routes", "mutable capture-date aggregate counter"],
    ["sole campaign authorship", "calls placed", "legislative causation", "reach, conversion, endorsement, or impact"]
  ),
  publicPost(
    ids.kcTownHallPost,
    "Jamie Burkart public KC Town Hall project announcement",
    "2018-07-02",
    "https://www.facebook.com/jburkart/posts/pfbid023rhzPSnUranjNyMCotufqMNS6uqLJatPp9R4e2m4s1ytZutdVSw2vKzEijbueVigl",
    "Jamie Burkart, public Facebook post announcing the KC Town Hall project, July 2, 2018.",
    "The public post says Jamie and Julia Fredenburg were starting the project and describes its intended neighborhood-resource and cultural-center purpose. It displayed 106 reactions, 14 comments, and three shares when rechecked July 16, 2026.",
    ["Jamie's attributed co-initiation statement", "stated public-benefit intention", "mutable capture-date aggregate counters"],
    ["sole founding", "later funding, completion, transition, or impact", "unique people, endorsement, reach, or causality"]
  ),
  publicPost(
    ids.talksNotRaidsPost,
    "Jamie Burkart public Talks Not Raids action-routing post",
    "2019-02-11",
    "https://www.facebook.com/jburkart/posts/pfbid033Wq5p6tEctq8Lc4R5WxYpCyTgUfeEpyTQGa6y7VsTwMjfk81CJb7C7RRoxmAAQWXl",
    "Jamie Burkart, public Facebook post routing readers to a Talks Not Raids City Hall action, February 11, 2019.",
    "The public post routes readers among a City Hall hearing, NYC Artist Coalition media, the campaign site, and Council action on Intro 1156.",
    ["hearing, coalition-media, campaign-site, and legislative routing"],
    ["sole authorship of shared coalition material", "attendance", "bill outcome", "legislative causation", "reach or impact"]
  )
];

export const personalFacebookPostClaims: ClaimRecord[] = [
  {
    id: ids.populationClaim,
    project: "personal-facebook",
    internalClaim:
      "The July 2026 owner-filtered Facebook Manage Posts census returned 1,243 unique records across 621 cursor pages, ended with has-next-page false, and spans visible endpoints from December 19, 2006, through June 12, 2022.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Two authenticated methods independently account for 1,243 current owner-filtered records spanning December 2006 through June 2022.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/jamie-personal-facebook-posts"],
      rationale: "Population control belongs in the research record, not as a portfolio accomplishment metric."
    }],
    evidence: [
      { sourceId: ids.graphRun, relationship: "private-support", supports: ["621 cursor pages", "3,728 returned nodes", "1,243 unique records", "terminal has-next-page false", "visible chronology"], confidence: "high", renderCitation: false },
      { sourceId: ids.visualRun, relationship: "corroborating", supports: ["independent 1,243-record traversal", "matching visible endpoints"], confidence: "high", renderCitation: false },
      { sourceId: ids.corpus, relationship: "corroborating", supports: ["public-safe aggregate controls and commitments"], confidence: "high", renderCitation: false },
      { sourceId: ids.report, relationship: "corroborating", supports: ["method, privacy boundary, and projection decision"], confidence: "high", renderCitation: false }
    ],
    boundaries: [
      "Complete means every record returned by the capture-date Manage Posts surface filtered to Posted by You received a disposition.",
      "The census is not a native Meta export, deletion history, or immutable lifetime publication count.",
      "Raw bodies and nonpublic records remain outside the public repository."
    ],
    antiClaims: [
      "Jamie published exactly 1,243 Facebook posts in his lifetime.",
      "Every personal Facebook post Jamie ever made was recovered.",
      "All 1,243 records were public."
    ],
    researchInquiryIds: [ids.populationInquiry],
    reviewedAt,
    reviewedBy
  },
  {
    id: ids.audienceClaim,
    project: "personal-facebook",
    internalClaim:
      "The graph-field crawl exposed audience labels for 270 records, while the independent visual traversal exposed 973 labels: 671 Public, 204 Friends, and 98 Only me, leaving 270 unlabeled and six visually unavailable record shells.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Audience coverage is method-dependent: the visual pass exposed 973 current labels while the structural crawl exposed 270.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/jamie-personal-facebook-posts"],
      rationale: "Make the reconciliation visible so unlabeled never silently becomes public."
    }],
    evidence: [
      { sourceId: ids.graphRun, relationship: "private-support", supports: ["268 Public, one friends, one Only me, and 973 unlabeled graph-field observations"], confidence: "high", renderCitation: false },
      { sourceId: ids.visualRun, relationship: "private-support", supports: ["671 Public, 204 Friends, 98 Only me, and 270 unlabeled visual observations", "six unavailable shells"], confidence: "high", renderCitation: false }
    ],
    boundaries: [
      "The two distributions measure field visibility in different capture methods; they are not competing lifetime privacy histories.",
      "Current audience labels do not establish the setting at publication time.",
      "Unlabeled records are never inferred public, and only individually rechecked Public posts may be promoted."
    ],
    antiClaims: ["All unlabeled records were public.", "The crawl proves historical audience settings.", "Nonpublic record contents may be published because Jamie owns the account."],
    researchInquiryIds: [ids.populationInquiry],
    reviewedAt,
    reviewedBy
  },
  {
    id: ids.sourceClaim,
    project: "personal-facebook",
    internalClaim:
      "The structural full-population pass recovered 430 URL-bearing records and 549 unique normalized external URLs as source-discovery and action-routing leads; selected destinations were matched to existing close-read knowledge-bank sources.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "The census yielded 549 normalized external routes; selected mission sources were associated with existing records and the remainder stay in a research queue.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/jamie-personal-facebook-posts"],
      rationale: "Preserve the source-discovery value without treating posted links as corroboration."
    }],
    evidence: [
      { sourceId: ids.graphRun, relationship: "private-support", supports: ["430 URL-bearing records", "549 unique normalized external routes"], confidence: "high", renderCitation: false }
    ],
    boundaries: [
      "A posted URL remains a source lead until the destination is independently recovered, close-read, and decomposed.",
      "Posting does not establish truth, authorship, partnership, endorsement, readership, clicks, conversion, causality, or outcomes.",
      "The visual method recovered fewer rendered links than the structural crawl; the counts must not be mixed."
    ],
    antiClaims: ["All 549 links corroborate Jamie's professional record.", "Every linked organization partnered with or endorsed Jamie."],
    researchInquiryIds: [ids.sourceInquiry],
    reviewedAt,
    reviewedBy
  },
  {
    id: ids.practiceClaim,
    project: "personal-facebook",
    internalClaim:
      "Selected public posts document Jamie repeatedly connecting project explanation and source material to usable participation routes, including joining a community calendar, contacting Council, attending a hearing, and navigating among campaign media, sites, and legislation.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Selected public posts show Jamie repeatedly connecting project explanation and source material to concrete participation routes.",
      status: "active",
      citationRequired: true,
      surfaces: ["docs/knowledge-bank/projects/jamie-personal-facebook-posts"],
      rationale: "Retain as a source-backed operating pattern while the current website already presents stronger project-specific evidence."
    }],
    evidence: [
      { sourceId: ids.nterPost, relationship: "direct-support", supports: ["project-opening and public-album routing"], confidence: "high", renderCitation: true },
      { sourceId: ids.wowListPost, relationship: "direct-support", supports: ["project explanation paired with a join route"], confidence: "high", renderCitation: true },
      { sourceId: ids.letNycDancePost, relationship: "direct-support", supports: ["press coverage paired with Council contact and call-script routes"], confidence: "high", renderCitation: true },
      { sourceId: ids.talksNotRaidsPost, relationship: "direct-support", supports: ["hearing, coalition-media, campaign-site, and legislation routing"], confidence: "high", renderCitation: true }
    ],
    boundaries: [
      "The sources establish Jamie's public routing practice, not reader action or campaign outcome.",
      "Collective campaign material retains its original authorship and shared credit."
    ],
    antiClaims: ["Jamie's posts caused attendance, calls, legislation, or policy outcomes.", "Jamie solely authored or owned the collective campaigns."],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  },
  {
    id: ids.stakeholderClaim,
    project: "personal-facebook",
    internalClaim:
      "Within the 181-record deterministic mission-routing set, the structural classifier matched NYC Council in 20 records, Rafael Espinal in 18, Market Hotel in nine, the Office of Nightlife in six, and Antonio Reynoso in five.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Deterministic reference counts route civic names and institutions for research; they do not measure incoming stakeholder engagement.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/jamie-personal-facebook-posts"],
      rationale: "Keep the counts useful for research while preventing mention from being mislabeled engagement."
    }],
    evidence: [{ sourceId: ids.graphRun, relationship: "private-support", supports: ["bounded overlapping mention and route matches"], confidence: "high", renderCitation: false }],
    boundaries: [
      "These are outgoing mentions, tags, quotations, event references, or links in Jamie's records, not actions by the named stakeholders.",
      "The visual classifier used different rules and produced different routing counts; neither classifier is an identity-complete engagement census."
    ],
    antiClaims: ["Twenty New York City Council members engaged with Jamie's Facebook account.", "The named officials endorsed Jamie or every referenced campaign."],
    researchInquiryIds: [ids.engagementInquiry],
    reviewedAt,
    reviewedBy
  },
  {
    id: ids.signalClaim,
    project: "personal-facebook",
    internalClaim:
      "On July 16, 2026, selected individually rechecked public posts displayed 106 reactions, 14 comments, and three shares for the KC Town Hall announcement; 28 likes and eight comments for the WOW List nine-city post; 24 reactions for the Let NYC Dance post; and seven likes with no comments for the CouncilStat job-route post.",
    status: "use-with-care",
    projections: [{
      key: "archive-note",
      text: "Selected public posts retain mutable aggregate interaction counters, preserved only as dated interface observations.",
      status: "hold",
      citationRequired: true,
      surfaces: [],
      rationale: "The counters are not sufficiently stable or interpretable for the website or resume."
    }],
    evidence: [
      { sourceId: ids.kcTownHallPost, relationship: "direct-support", supports: ["capture-date KC Town Hall aggregate counters"], confidence: "high", renderCitation: false },
      { sourceId: ids.wowListPost, relationship: "direct-support", supports: ["capture-date WOW List aggregate counters"], confidence: "high", renderCitation: false },
      { sourceId: ids.letNycDancePost, relationship: "direct-support", supports: ["capture-date Let NYC Dance aggregate counter"], confidence: "high", renderCitation: false },
      { sourceId: ids.councilStatPost, relationship: "direct-support", supports: ["capture-date CouncilStat aggregate counters"], confidence: "high", renderCitation: false }
    ],
    boundaries: [
      "Counters are mutable current interface observations, not publication-time analytics.",
      "Do not sum them into unique people, reach, stakeholder engagement, endorsement, attendance, conversion, causality, or impact.",
      "Responder identities and comment text remain outside the public aggregate claim."
    ],
    antiClaims: ["The selected posts reached 165 people.", "Reaction and comment counts prove stakeholder endorsement or project impact."],
    researchInquiryIds: [ids.engagementInquiry],
    reviewedAt,
    reviewedBy
  },
  {
    id: ids.councilStatClaim,
    project: "callnyc",
    internalClaim:
      "In a May 2016 public post linking a CouncilStat job notice, Jamie invited open-data practitioners to work with him and a City Council team.",
    status: "use-with-care",
    projections: [{
      key: "archive-note",
      text: "A public 2016 post preserves Jamie's CouncilStat job-routing language while his exact working relationship remains unresolved.",
      status: "hold",
      citationRequired: true,
      surfaces: [],
      rationale: "Do not project attributed social wording into an employment or title claim without corroboration."
    }],
    evidence: [{ sourceId: ids.councilStatPost, relationship: "direct-support", supports: ["Jamie's attributed first-person wording", "CouncilStat job route"], confidence: "high", renderCitation: false }],
    boundaries: ["The post does not resolve employment, title, contract, formal team membership, hiring authority, or authorship of the job notice."],
    antiClaims: ["Jamie was employed by the CouncilStat team.", "Jamie controlled hiring for the CouncilStat job."],
    researchInquiryIds: [ids.councilStatInquiry],
    reviewedAt,
    reviewedBy
  }
];

export const personalFacebookPostInquiries: ResearchInquiry[] = [
  {
    id: ids.populationInquiry,
    project: "personal-facebook",
    question: "What is the complete current owner-filtered Manage Posts population, and which audience and availability fields can be reconciled across capture methods?",
    methods: [
      "Traversed 621 graph-cursor pages until has-next-page was false and deduplicated 3,728 returned nodes into 1,243 records.",
      "Performed a separate full visual traversal of the Posted by You surface and independently recovered 1,243 records.",
      "Compared chronology, owner presence, audience labels, unavailable shells, URL extraction, and classifier outputs without publishing raw records."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Both methods recovered 1,243 records with the same visible December 2006 and June 2022 endpoints.",
      "The graph run exposed audience fields for 270 records; the visual run exposed 973 current audience labels.",
      "Six visual record shells were unavailable."
    ],
    limitations: [
      "The surface is not a native owner export and cannot recover deleted, removed, or otherwise absent history.",
      "Current audience labels do not establish publication-time settings.",
      "Different URL and mission classifiers have different recall and must retain separate denominators."
    ],
    sourceIds: [ids.corpus, ids.graphRun, ids.visualRun],
    publicSummary: "Two methods independently account for 1,243 current owner-filtered records; audience, URL, and classification coverage remain method-specific.",
    protectedLocatorId: "LOC-JAMIE-FACEBOOK-FULL-POPULATION-2026"
  },
  {
    id: ids.sourceInquiry,
    project: "personal-facebook",
    question: "Which of 549 normalized external routes can be recovered, close-read, decomposed, and associated with existing or new knowledge-bank sources?",
    methods: [
      "Recovered structural external URL fields and normalized duplicate destinations.",
      "Separated posted routes from source claims.",
      "Matched selected mission-relevant destinations to existing close-read source records and recorded blocked or dead destinations as unresolved leads."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The structural pass recovered 430 URL-bearing records and 549 unique normalized external routes.",
      "Selected Charlotte Street, Pitch, Gothamist, WNYC, NPR, project-site, and campaign routes already have bounded knowledge-bank records.",
      "The remaining routes stay in the protected research queue rather than becoming automatic corroboration."
    ],
    limitations: [
      "Many historical destinations are dead, redirected, blocked, changed, or insufficiently connected to Jamie's role.",
      "Posting a destination does not establish authorship, agreement, partnership, readership, or outcome."
    ],
    sourceIds: [ids.graphRun, ids.corpus, "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01", "SRC-WATERWAYS-PITCH-GULF-2009-09-03", "SRC-NYCAC-X-GOTHAMIST-CABARET-MOMENTUM-2017", "SRC-PRESS-LND-WNYC-BUREAUCRATIC-DANCE", "SRC-NYCAC-NPR-2017-09-20"],
    publicSummary: "The full pass yielded 549 normalized source and action-route leads; selected independently reviewed destinations were associated with existing records and the remainder remain queued.",
    protectedLocatorId: "LOC-JAMIE-FACEBOOK-POSTED-URL-INVENTORY-2026"
  },
  {
    id: ids.engagementInquiry,
    project: "personal-facebook",
    question: "What incoming engagement by mission-relevant stakeholder groups can be established without exposing personal identities or converting outgoing references into engagement?",
    methods: [
      "Counted outgoing name and route matches separately from incoming actions.",
      "Reopened six individually selected Public posts and retained only dated aggregate counters.",
      "Excluded responder names, comment text, social-graph identities, and inferred stakeholder classes."
    ],
    runAt: reviewedAt,
    resultStatus: "inconclusive",
    findings: [
      "The 1,243-record Manage Posts population did not expose reliable population-wide reaction, comment, or share totals.",
      "Selected public posts retain mutable aggregate counters.",
      "No identity-complete stakeholder engagement census was recovered."
    ],
    limitations: [
      "Aggregate counters are not unique people or stakeholder classes.",
      "Outgoing references are not incoming engagement.",
      "A native export may still omit historical deleted or changed interactions."
    ],
    sourceIds: [ids.graphRun, ids.visualRun, ids.wowListPost, ids.letNycDancePost, ids.kcTownHallPost, ids.councilStatPost],
    publicSummary: "The pass preserves selected dated aggregate counters but does not claim population-wide or stakeholder-identity engagement.",
    protectedLocatorId: "LOC-JAMIE-FACEBOOK-ENGAGEMENT-REVIEW-2026"
  },
  {
    id: ids.councilStatInquiry,
    project: "callnyc",
    question: "What exact working relationship underlies Jamie's May 2016 invitation to work with him and a City Council team through a linked CouncilStat job notice?",
    methods: [
      "Rechecked the post's Public audience label, first-person wording, job route, and capture-date aggregate counters.",
      "Separated directly observable wording from employment, title, contract, team-membership, and hiring-authority interpretations.",
      "Left recovery of the original job notice and corroborating records open."
    ],
    runAt: reviewedAt,
    resultStatus: "inconclusive",
    findings: ["The public post directly supports Jamie's attributed invitation language and the CouncilStat job route.", "The post does not resolve Jamie's formal relationship to the team."],
    limitations: ["The historical job notice is not currently available.", "Social wording cannot distinguish employment, contract, collaboration, referral, or adjacent work without corroboration."],
    sourceIds: [ids.councilStatPost],
    publicSummary: "Jamie's public post preserves a CouncilStat job route and attributed team language; his exact formal relationship remains unresolved."
  }
];

export const personalFacebookPostIntake: IntakeRecordInput[] = [
  {
    id: "INT-JAMIE-FACEBOOK-FULL-POPULATION-2026-07-16",
    receivedAt: reviewedAt,
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "Jamie Burkart personal Facebook full-population archival pass",
    description: "A two-method census and classification pass accounted for every record currently returned by Facebook Manage Posts filtered to Posted by You while keeping bulk text, nonpublic records, identities, media, and authenticated state outside the public repository.",
    whyItMatters: "The archive surfaces professional evidence and source leads while providing a durable privacy and completeness contract for future agents.",
    projectIds: ["personal-facebook"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote: "Promoted population, audience, URL-routing, participation-routing, stakeholder-reference, and selected-signal claims with strict boundaries.",
    sourceIds: [ids.corpus, ids.report, ids.graphRun, ids.visualRun, ids.nterPost, ids.wowListPost, ids.councilStatPost, ids.letNycDancePost, ids.kcTownHallPost, ids.talksNotRaidsPost],
    claimIds: [ids.populationClaim, ids.audienceClaim, ids.sourceClaim, ids.practiceClaim, ids.stakeholderClaim, ids.signalClaim, ids.councilStatClaim],
    inquiryIds: [ids.populationInquiry, ids.sourceInquiry, ids.engagementInquiry, ids.councilStatInquiry],
    artifactPaths: ["docs/knowledge-bank/corpora/jamie-personal-facebook-posts-full-population-2026-07-16.json", "docs/knowledge-bank/projects/jamie-personal-facebook-posts.md"],
    boundaries: ["Do not publish raw post bodies, nonpublic records, comments, identities, media, authenticated state, or protected locators.", "Do not infer lifetime completeness, public audience, stakeholder engagement, endorsement, conversion, causality, or impact."]
  }
];
