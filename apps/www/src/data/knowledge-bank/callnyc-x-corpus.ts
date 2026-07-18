import type { KnowledgeBank } from "./schema.ts";

export const callnycXCorpusIntakeItems: KnowledgeBank["intakeItems"] = [{
  id: "INTAKE-2026-07-15-CALLNYC-X-FULL-POPULATION",
  receivedAt: "2026-07-15",
  inputKind: "metric",
  summary: "Authenticated full-population accounting of the @CallNYCapp timeline, including recovered posts, unavailable residuals, posted URLs, mission patterns, and public engagement counters.",
  projectIds: ["callnyc"],
  researchStatus: "researched",
  publicationStatus: "projected",
  sourceIds: ["SRC-CALLNYC-X-FULL-POPULATION-2026-07-15", "SRC-CALLNYC-X-LAUNCH-2016-03-05", "SRC-CALLNYC-X-JAMIE-IDENTIFICATION-2016-03-16", "SRC-CALLNYC-X-JSON-API-2016-04-20", "SRC-CALLNYC-X-POLITICO-CIRCULATION-2016-03-17", "SRC-CALLNYC-GIZMODO-311-2016-03-10", "SRC-CALLNYC-GOTHAMIST-PULASKI-2016-04-28"],
  observationIds: ["OBS-CALLNYC-X-POPULATION-ACCOUNTING", "OBS-CALLNYC-X-COMPOSITION", "OBS-CALLNYC-X-ISSUE-RECOGNITION-SYSTEM", "OBS-CALLNYC-X-RESIDENT-PATHWAY-BREADTH", "OBS-CALLNYC-X-PUBLIC-COUNTER-SNAPSHOT", "OBS-CALLNYC-X-POSTED-URL-INVENTORY", "OBS-CALLNYC-X-JAMIE-PUBLIC-IDENTIFICATION", "OBS-CALLNYC-X-JSON-API"],
  claimIds: ["CLM-CALLNYC-X-PUBLIC-DOCUMENTATION-SYSTEM", "CLM-CALLNYC-X-JAMIE-BUILDER-IDENTIFICATION"],
  researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
  nextActions: [
    "Request an official account export if the three unavailable residual posts need status-level recovery.",
    "Treat public counters as dated events, not fixed metrics, unique people, or identified stakeholders.",
    "Keep account-authored posts, third-party reposts, incoming engagement, and outbound recognition distinct."
  ]
}];

export const callnycXCorpusSources: KnowledgeBank["sources"] = [
  {
    id: "SRC-CALLNYC-X-FULL-POPULATION-2026-07-15",
    title: "Authenticated @CallNYCapp full-population archival review",
    organization: "Codex archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "Authenticated profile, Replies, and date-partitioned Latest-search review completed July 15, 2026",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/CallNYCapp",
    preferredPublicUrl: "canonical",
    publicCitation: "Authenticated full-population review of the public @CallNYCapp timeline, July 15, 2026.",
    publicNote: "The public JSON corpus preserves 107 recovered status records and accounts for the profile's displayed population of 110 with three explicitly unavailable residual posts.",
    supportsGenerally: ["110 displayed posts, 107 recovered status records, and three unavailable residual posts", "92 account-authored posts and 15 third-party reposts", "70 issue-recognition posts addressing 24 Council-member accounts and two city-agency accounts", "63 distinct CallNYC destinations across 16 service categories", "posted URLs, chronology, and dated public-counter analysis"],
    doesNotEstablish: ["the status IDs or content of three unavailable residual posts", "identities behind aggregate counters", "supportive sentiment or Council endorsement", "official project status or current service accuracy"]
  },
  {
    id: "SRC-CALLNYC-X-LAUNCH-2016-03-05",
    title: "CallNYC public launch post",
    organization: "CallNYC",
    author: "CallNYC",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-03-05",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/CallNYCapp/status/706208629360304128",
    preferredPublicUrl: "canonical",
    publicCitation: "CallNYC, public launch post, March 5, 2016.",
    supportsGenerally: ["public launch date", "Council constituent-services data framing", "Open Data Day context"],
    doesNotEstablish: ["official Council affiliation", "formal hackathon submission", "current service status"]
  },
  {
    id: "SRC-CALLNYC-X-JAMIE-IDENTIFICATION-2016-03-16",
    title: "CallNYC post identifying Jamie Burkart",
    organization: "CallNYC",
    author: "Jamie Burkart, as identified in the post text",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-03-16",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/CallNYCapp/status/710150246781882369",
    preferredPublicUrl: "canonical",
    publicCitation: "CallNYC, X post identifying Jamie Burkart and describing CallNYC as his first civic-tech project, March 16, 2016.",
    supportsGenerally: ["public self-identification by name", "Jamie's CallNYC relationship", "contemporaneous civic-tech framing"],
    doesNotEstablish: ["authorship of every account post", "official Council affiliation", "current account custody"]
  },
  {
    id: "SRC-CALLNYC-X-JSON-API-2016-04-20",
    title: "CallNYC Council-member handle API post",
    organization: "CallNYC",
    author: "Jamie Burkart, as identified by the first-person account context",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-20",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/CallNYCapp/status/722837286476390401",
    preferredPublicUrl: "canonical",
    publicCitation: "CallNYC, X post describing a JSON API for Council-member Twitter usernames, April 20, 2016.",
    supportsGenerally: ["a first-person implementation statement", "a public JSON API for Council-member handles"],
    doesNotEstablish: ["current API availability", "official Council API status", "sole authorship of every component"]
  },
  {
    id: "SRC-CALLNYC-X-POLITICO-CIRCULATION-2016-03-17",
    title: "CallNYC circulates Politico coverage",
    organization: "CallNYC",
    author: "CallNYC",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-03-17",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/CallNYCapp/status/710507767447031808",
    preferredPublicUrl: "canonical",
    publicCitation: "CallNYC, X post linking Politico New York coverage, March 17, 2016.",
    supportsGenerally: ["public circulation of the Politico article", "relationship-centered constituent-service framing"],
    doesNotEstablish: ["endorsement by Politico", "official Council adoption"]
  },
  {
    id: "SRC-CALLNYC-GIZMODO-311-2016-03-10",
    title: "Check the History of Any NYC Address Through Its 311 Complaint Record",
    organization: "Gizmodo",
    author: "Alissa Walker",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-03-10",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://gizmodo.com/check-the-history-of-complaints-at-any-nyc-address-with-1764099069",
    preferredPublicUrl: "canonical",
    publicCitation: "Alissa Walker, 'Check the History of Any NYC Address Through Its 311 Complaint Record,' Gizmodo, March 10, 2016.",
    publicNote: "CallNYC linked the article in a March 17 post praising an adjacent civic-data project.",
    supportsGenerally: ["an adjacent public-data tool circulated by CallNYC", "the timeline's civic-technology source ecology"],
    doesNotEstablish: ["a CallNYC feature", "Jamie's authorship of the cited tool", "CallNYC coverage by Gizmodo"]
  },
  {
    id: "SRC-CALLNYC-GOTHAMIST-PULASKI-2016-04-28",
    title: "Long-Overdue Pulaski Bridge Bike Path Will Officially Open Friday",
    organization: "Gothamist",
    author: "Miranda Katz",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-28",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://gothamist.com/news/long-overdue-pulaski-bridge-bike-path-will-officially-open-friday",
    preferredPublicUrl: "canonical",
    publicCitation: "Miranda Katz, 'Long-Overdue Pulaski Bridge Bike Path Will Officially Open Friday,' Gothamist, April 28, 2016.",
    publicNote: "The @CallNYCapp timeline reposted Gothamist's article post as part of its transportation information ecology.",
    supportsGenerally: ["a transportation article reposted by CallNYC", "the timeline's public-information source ecology"],
    doesNotEstablish: ["CallNYC coverage by Gothamist", "Jamie's role in the bridge project", "authorship of the Gothamist post"]
  }
];

export const callnycXCorpusObservations: KnowledgeBank["observations"] = [
  {
    id: "OBS-CALLNYC-X-POPULATION-ACCOUNTING",
    sourceId: "SRC-CALLNYC-X-FULL-POPULATION-2026-07-15",
    project: "callnyc",
    text: "The profile displayed 110 posts. Authenticated profile scrolling recovered 106 unique status objects and date-partitioned Latest search recovered one more, producing 107 records. Three displayed posts remained unavailable; population accounting is 100% while status-level recovery is 97.3%.",
    locator: "Profile heading, Posts and Replies surfaces, date-partitioned from:CallNYCapp search, and docs/knowledge-bank/corpora/callnyc-x-public-corpus.json",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CALLNYC-X-PUBLIC-DOCUMENTATION-SYSTEM"],
    researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review and status-ID reconciliation"]
  },
  {
    id: "OBS-CALLNYC-X-COMPOSITION",
    sourceId: "SRC-CALLNYC-X-FULL-POPULATION-2026-07-15",
    project: "callnyc",
    text: "The 107 records comprise 92 account-authored posts and 15 third-party reposts. Account-authored posts run from March 5 through October 4, 2016; reposted material extends the timeline through November 14, 2016.",
    locator: "Corpus accountAction and publishedAt fields",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CALLNYC-X-PUBLIC-DOCUMENTATION-SYSTEM"],
    researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex structured corpus analysis"]
  },
  {
    id: "OBS-CALLNYC-X-ISSUE-RECOGNITION-SYSTEM",
    sourceId: "SRC-CALLNYC-X-FULL-POPULATION-2026-07-15",
    project: "callnyc",
    text: "Seventy account-authored posts used a repeated 'provides/gives the most ... help' pattern to recognize issue-specific constituent-service activity. They addressed 24 distinct Council-member accounts and two city-agency accounts, @NYCHA and @NYCHousing.",
    locator: "Repeated-phrase classification joined to unique mentioned handles",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CALLNYC-X-PUBLIC-DOCUMENTATION-SYSTEM"],
    researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex structured text and handle analysis"]
  },
  {
    id: "OBS-CALLNYC-X-RESIDENT-PATHWAY-BREADTH",
    sourceId: "SRC-CALLNYC-X-FULL-POPULATION-2026-07-15",
    project: "callnyc",
    text: "Account-authored posts contain 83 CallNYC link occurrences spanning 63 distinct destinations and 16 service-category paths. Housing and buildings led with 23 occurrences, followed by transportation with 14, immigration with six, and finance and general welfare with four each.",
    locator: "Resolved callnyc.org URLs grouped by first path segment",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CALLNYC-X-PUBLIC-DOCUMENTATION-SYSTEM"],
    researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex resolved-URL analysis"]
  },
  {
    id: "OBS-CALLNYC-X-PUBLIC-COUNTER-SNAPSHOT",
    sourceId: "SRC-CALLNYC-X-FULL-POPULATION-2026-07-15",
    project: "callnyc",
    text: "Fifty-nine of 92 account-authored posts displayed at least one public interaction on July 15, 2026. Visible counters summed to eight replies, 74 reposts, and 111 likes. These are dated counter events, not unique people or identified stakeholder accounts.",
    locator: "Public reply, repost, and like counters on recovered account-authored status cards",
    status: "verified",
    confidence: "high",
    claimIds: [],
    researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-counter aggregation"]
  },
  {
    id: "OBS-CALLNYC-X-POSTED-URL-INVENTORY",
    sourceId: "SRC-CALLNYC-X-FULL-POPULATION-2026-07-15",
    project: "callnyc",
    text: "The corpus contains 98 link occurrences, 84 unique t.co links, and 76 distinct final destinations. Eighty-two short links resolved by redirect and two were recovered from visible labels. Sources include Council and BetaNYC tools, NYC government resources, Politico, Gizmodo, Gothamist, WOW List, and public-service media.",
    locator: "Corpus links fields and bounded redirect-resolution run",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CALLNYC-X-PUBLIC-DOCUMENTATION-SYSTEM"],
    researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex posted-URL inventory"]
  },
  {
    id: "OBS-CALLNYC-X-JAMIE-PUBLIC-IDENTIFICATION",
    sourceId: "SRC-CALLNYC-X-JAMIE-IDENTIFICATION-2016-03-16",
    project: "callnyc",
    text: "A March 16, 2016, CallNYC post identifies the first-person speaker as Jamie Burkart and describes CallNYC as his first civic-tech project while also naming WOW List.",
    locator: "Status 710150246781882369",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CALLNYC-X-JAMIE-BUILDER-IDENTIFICATION"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-CALLNYC-X-JSON-API",
    sourceId: "SRC-CALLNYC-X-JSON-API-2016-04-20",
    project: "callnyc",
    text: "An April 20, 2016, first-person CallNYC post states that Jamie made a JSON API for retrieving New York City Council member Twitter usernames and links to CallNYC's API path.",
    locator: "Status 722837286476390401",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CALLNYC-X-JAMIE-BUILDER-IDENTIFICATION"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  }
];

export const callnycXCorpusClaims: KnowledgeBank["claims"] = [
  {
    id: "CLM-CALLNYC-X-PUBLIC-DOCUMENTATION-SYSTEM",
    project: "callnyc",
    internalClaim: "CallNYC's public account operationalized its data-to-guidance model through 70 recovered issue-recognition posts addressing 24 Council-member accounts and two city-agency accounts across 63 distinct CallNYC destinations.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "A full-population-accounted pass recovered 70 issue-recognition posts addressing 24 Council-member accounts and two city-agency accounts across 63 CallNYC destinations.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/callnyc"]
      },
      {
        key: "case-study",
        text: "CallNYC's public account extended that translation layer into 70 recovered issue-recognition posts, addressing 24 Council-member accounts and two city-agency accounts across 63 distinct CallNYC destinations.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/callnyc"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-CALLNYC-X-FULL-POPULATION-2026-07-15",
        relationship: "direct-support",
        supports: ["status corpus", "70-post pattern", "mentioned-account counts", "resolved destination count"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYC-COUNCIL-STATED-MEETING-2016-11-16",
        relationship: "supports-boundary",
        supports: ["contemporaneous Council-member status during the 2016 activity period"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The displayed population is accounted for as 107 recovered records plus three unavailable residual posts; do not call 107 a complete export.",
      "Recognition posts identify data patterns and addressed accounts, not endorsement or adoption.",
      "The social record is historical and not current constituent-service guidance."
    ],
    antiClaims: ["All 110 displayed posts were recovered at status level.", "Twenty-four Council members endorsed CallNYC.", "CallNYC was an official Council service.", "Every interaction was supportive."],
    researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated research review"]
  },
  {
    id: "CLM-CALLNYC-X-JAMIE-BUILDER-IDENTIFICATION",
    project: "callnyc",
    internalClaim: "The CallNYC account identified Jamie Burkart by name, described CallNYC as his first civic-tech project, and later carried a first-person statement that he made a JSON API for Council-member Twitter usernames.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Contemporaneous CallNYC posts identify Jamie by name, describe CallNYC as his first civic-tech project, and state that he made a JSON API for Council-member Twitter usernames.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/callnyc"]
    }],
    evidence: [
      {
        sourceId: "SRC-CALLNYC-X-JAMIE-IDENTIFICATION-2016-03-16",
        relationship: "direct-support",
        supports: ["Jamie's name", "first-person project relationship", "civic-tech framing"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-CALLNYC-X-JSON-API-2016-04-20",
        relationship: "direct-support",
        supports: ["first-person API implementation statement"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: ["The posts support Jamie's project and implementation relationship, not authorship of every account post or component."],
    antiClaims: ["Jamie authored every @CallNYCapp post.", "Jamie was commissioned by the Council.", "The API was an official Council API."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated research review"]
  }
];

export const callnycXCorpusResearchInquiries: KnowledgeBank["researchInquiries"] = [{
  id: "INQ-CALLNYC-X-FULL-POPULATION-2026",
  project: "callnyc",
  question: "What source, claim, URL, public-documentation, and traction evidence is recoverable across the full displayed population of @CallNYCapp posts?",
  methods: ["Crawl authenticated public Posts and Replies surfaces to stable exhaustion.", "Run date-partitioned Latest searches for from:CallNYCapp.", "Deduplicate by status ID and reconcile against the displayed post count.", "Resolve every unique t.co link, retaining visible labels when redirects fail.", "Separate authored posts from third-party reposts and aggregate only public counters.", "Classify issue-recognition language, stakeholder handles, destination paths, source domains, and articles."],
  runAt: "2026-07-15",
  resultStatus: "partially-recovered",
  findings: [
    "The profile displayed 110 posts; 107 unique status records were recovered and three remained unavailable.",
    "The corpus contains 92 account-authored posts and 15 third-party reposts.",
    "Seventy issue-recognition posts addressed 24 Council-member accounts and two city-agency accounts.",
    "Account-authored posts link to 63 CallNYC destinations across 16 service categories.",
    "All 84 unique short links are accounted for: 82 by redirect and two by visible-label inference.",
    "Authored-post counters total eight replies, 74 reposts, and 111 likes as of July 15, 2026.",
    "External sources include civic tools, government resources, Politico, Gizmodo, Gothamist, and WOW List."
  ],
  limitations: ["Three posts in X's displayed total were not exposed as status objects.", "Public counters are mutable and do not identify people, stakeholder groups, or sentiment.", "Counters on a repost belong to the original third-party post, not CallNYC's repost action.", "Deleted content, renamed accounts, ranking, and search omissions may limit recall.", "No credentials, cookies, private messages, settings, audience data, or authenticated-user interaction state were retained."],
  sourceIds: ["SRC-CALLNYC-X-FULL-POPULATION-2026-07-15", "SRC-CALLNYC-X-LAUNCH-2016-03-05", "SRC-CALLNYC-X-JAMIE-IDENTIFICATION-2016-03-16", "SRC-CALLNYC-X-JSON-API-2016-04-20", "SRC-CALLNYC-X-POLITICO-CIRCULATION-2016-03-17", "SRC-CALLNYC-GIZMODO-311-2016-03-10", "SRC-CALLNYC-GOTHAMIST-PULASKI-2016-04-28"],
  publicSummary: "The full displayed population is accounted for as 107 recovered status records and three unavailable residual posts; the corpus documents a systematic issue-recognition and resident-pathway layer without converting missing content or aggregate engagement into false certainty."
}];
