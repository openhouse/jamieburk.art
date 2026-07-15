import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated social-media archival review"
];

const accountPost = (
  id: string,
  title: string,
  publishedAt: string,
  canonicalUrl: string,
  publicCitation: string,
  supportsGenerally: string[],
  doesNotEstablish: string[] = []
): SourceRecord => ({
  id,
  title,
  author: "KC Town Hall (@KCTownHall)",
  kind: "institutional-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: "2026-07-15",
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote:
    "A public project-account post establishes what the account published, not the individual author of every post.",
  supportsGenerally,
  doesNotEstablish
});

const publicReply = (
  id: string,
  title: string,
  author: string,
  publishedAt: string,
  canonicalUrl: string,
  publicCitation: string,
  supportsGenerally: string[],
  doesNotEstablish: string[] = []
): SourceRecord => ({
  id,
  title,
  author,
  kind: "government-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: "2026-07-15",
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote:
    "This public interaction is counted only because its visible reply or quote-post relationship to KC Town Hall is preserved in the corpus.",
  supportsGenerally,
  doesNotEstablish
});

export const kcTownHallXFullPopulationBatch20260715: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
} = {
  intake: [
    {
      id: "INT-KCTH-X-FULL-POPULATION-2026",
      kind: "artifact-lead",
      capturedAt: "2026-07-15",
      capturedFrom: "Authenticated replies-inclusive @KCTownHall timeline",
      publicSafeSummary:
        "A governed inventory of the full profile-reported KC Town Hall post population: 181 recovered account items, an explicit two-item gap, seven public conversation contexts, resolved URLs, mission patterns, and public-safety boundaries.",
      projects: ["kc-town-hall"],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: [
        "SRC-KCTH-X-CORPUS-2026-07-15",
        "SRC-KCTH-WAYBACK-ROOT-2018",
        "SRC-KCTH-WAYBACK-JOIN-2019",
        "SRC-KCTH-WAYBACK-TIRES-2020",
        "SRC-KCTH-X-TIRED-OF-TIRES-LAUNCH-2019",
        "SRC-KCTH-X-ROBINSON-REPLY-2020",
        "SRC-KCTH-X-JUSTUS-REPLY-2019",
        "SRC-KCTH-X-LUCAS-QUOTE-2019",
        "SRC-KCTH-X-KCMO311-REPLY-2018",
        "SRC-KCTH-KCUR-PRIMARY-GUIDE-2018",
        "SRC-KCTH-MO-VOTER-LOOKUP",
        "SRC-KCTH-NORTHEAST-HOUSING-2018",
        "SRC-KCTH-YOUTUBE-PAINT-2018",
        "SRC-KCTH-YOUTUBE-COVID-2020",
        "SRC-KCTH-KCSTAR-LEONS-LEAD",
        "SRC-KCTH-GOFUNDME-CHURCH-LEAD",
        "SRC-KCTH-ROBINSON-OFFICIAL-ROLE",
        "SRC-KCTH-JUSTUS-OFFICIAL-ROLE"
      ],
      claimIds: [
        "CLM-KCTH-X-PUBLIC-OPERATIONS",
        "CLM-KCTH-X-CIVIC-ENGAGEMENT",
        "CLM-KCTH-X-PUBLIC-SOURCE-CIRCULATION",
        "CLM-KCTH-X-SOCIAL-TRACTION-OBSERVATION",
        "CLM-KCTH-X-SELF-REPORTED-TIRE-OUTCOMES"
      ],
      researchTaskIds: [
        "TASK-KCTH-X-RECOVER-TWO-MISSING",
        "TASK-KCTH-X-CORROBORATE-TIRE-OUTCOMES",
        "TASK-KCTH-X-ACCOUNT-AUTHORSHIP",
        "TASK-KCTH-X-DEAD-LINK-RECOVERY"
      ],
      notes: [
        "The full reported population is accounted for as 181 recovered items plus an explicit two-item recovery gap; seven conversation records are context, not account posts.",
        "Visible interaction totals and account self-reported tire outcomes are retained as research observations and held from public accomplishment messaging.",
        "No private messages, account settings, non-public analytics, credentials, follower exports, or session data were inspected or committed."
      ],
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  sources: [
    {
      id: "SRC-KCTH-X-CORPUS-2026-07-15",
      title: "Authenticated KC Town Hall full population-accounted corpus",
      author: "Codex authenticated browser review",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: "2026-07-15",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://x.com/KCTownHall/with_replies",
      assetUrl:
        "https://github.com/openhouse/jamieburk.art/blob/2c52fda25c42b4ccff5f32e3642fc0efa60154c6/docs/knowledge-bank/corpora/kctownhall-x-full-population-2026-07-15.json",
      preferredPublicUrl: "asset",
      publicCitation:
        "Committed item-level corpus from the authenticated replies-inclusive @KCTownHall review, July 15, 2026.",
      publicNote:
        "The profile reported 183 posts. The governed corpus preserves 181 distinct account items, an explicit two-item recovery gap, 31 resolved short URLs, and seven separately classified public conversation contexts.",
      supportsGenerally: [
        "the complete population accounting on the capture date",
        "authored, reposted, link, media, mission-pattern, and dated visible-interaction classifications",
        "a lower bound of visible incoming engagement from Council-member and city-service accounts"
      ],
      doesNotEstablish: [
        "the contents of the two unrecovered items",
        "the individual author of every project-account post",
        "Jamie's authorship or operational role after his project transition",
        "private or historically hidden engagement",
        "survey representativeness, policy causation, project completion, or current property status"
      ]
    },
    {
      id: "SRC-KCTH-WAYBACK-ROOT-2018",
      title: "KC Town Hall root page",
      organization: "KC Town Hall",
      author: "Julia and Jamie",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      capturedAt: "2018-08-03",
      accessedAt: "2026-07-15",
      canonicalUrl: "http://kctownhall.com/",
      archiveUrl:
        "https://web.archive.org/web/20180803002431/http://kctownhall.com/",
      preferredPublicUrl: "archive",
      publicCitation:
        "KC Town Hall root page, archived by the Wayback Machine on August 3, 2018.",
      publicNote:
        "The earliest recovered root page states the historic-neighborhood-resource purpose. Its project byline does not assign every later project action to either named author.",
      supportsGenerally: ["the public historic-neighborhood-resource purpose", "the early project web surface"],
      doesNotEstablish: ["project completion", "sole authorship", "current property status"]
    },
    {
      id: "SRC-KCTH-WAYBACK-JOIN-2019",
      title: "Join KC Town Hall",
      organization: "KC Town Hall",
      author: "Julia and Jamie",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      capturedAt: "2019-08-13",
      accessedAt: "2026-07-15",
      canonicalUrl: "http://kctownhall.com/join/",
      archiveUrl:
        "https://web.archive.org/web/20190813025929/http://kctownhall.com/join/",
      preferredPublicUrl: "archive",
      publicCitation:
        "'Join KC Town Hall,' archived by the Wayback Machine on August 13, 2019.",
      publicNote:
        "The recovered page invited people to follow and participate in building a neighborhood resource and cultural center.",
      supportsGenerally: ["a public participation invitation", "the neighborhood-resource and cultural-center purpose"],
      doesNotEstablish: ["participation totals", "representativeness", "completed redevelopment"]
    },
    {
      id: "SRC-KCTH-WAYBACK-TIRES-2020",
      title: "Tired of Tires? Free Tire Pickup",
      organization: "KC Town Hall",
      author: "Julia and Jamie",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2019-05-02",
      capturedAt: "2020-10-30",
      accessedAt: "2026-07-15",
      canonicalUrl: "http://kctownhall.com/tires/",
      archiveUrl:
        "https://web.archive.org/web/20201030223311/http://kctownhall.com/tires/",
      preferredPublicUrl: "archive",
      publicCitation:
        "Julia and Jamie, 'Tired of Tires? Free Tire Pickup,' KC Town Hall, published May 2, 2019; archived October 30, 2020.",
      publicNote:
        "The archived article metadata and byline identify Julia and Jamie as authors and name KC Town Hall with Oak Park Neighborhood Association as program partners. The page's savings figure is project-authored documentation, not independent corroboration.",
      supportsGenerally: [
        "Jamie's public authorship of the Tired of Tires project page",
        "the KC Town Hall and Oak Park Neighborhood Association partnership",
        "a monthly free home tire-pickup workflow"
      ],
      doesNotEstablish: [
        "Jamie's sole authorship or sole operation of the program",
        "Jamie's authorship of every project-account post",
        "independent verification of the page's savings figure",
        "program causation or complete outcomes"
      ]
    },
    accountPost(
      "SRC-KCTH-X-TIRED-OF-TIRES-LAUNCH-2019",
      "KC Town Hall announces Tired of Tires pickup",
      "2019-05-03",
      "https://x.com/KCTownHall/status/1124416898064580608",
      "KC Town Hall publicly announced free neighborhood tire pickup with Oak Park on May 3, 2019.",
      ["Tired of Tires public launch communication", "collective neighborhood coordination"],
      ["Jamie's sole authorship", "a verified tire total", "program causation or completion"]
    ),
    accountPost(
      "SRC-KCTH-X-TIRE-OUTCOME-SELF-REPORT-2020",
      "KC Town Hall posts tire-program outcome figures",
      "2020-08-01",
      "https://x.com/KCTownHall/status/1289713591843565569",
      "KC Town Hall posted self-reported tire-program outcome figures on August 1, 2020.",
      ["the figures the project account publicly reported", "a trigger for independent corroboration"],
      ["independent verification of the figures", "Jamie's authorship or operational responsibility", "causation"]
    ),
    publicReply(
      "SRC-KCTH-X-ROBINSON-REPLY-2020",
      "Melissa Robinson replies to KC Town Hall",
      "Melissa Robinson (@Robinson4kc)",
      "2020-08-01",
      "https://x.com/Robinson4kc/status/1289714535251742726",
      "Councilmember Melissa Robinson publicly thanked KC Town Hall for work to improve community conditions on August 1, 2020.",
      ["visible incoming Council-member engagement", "public recognition of community-condition work"],
      ["independent verification of the linked tire figures", "formal endorsement of every project claim", "policy causation"]
    ),
    publicReply(
      "SRC-KCTH-X-JUSTUS-REPLY-2019",
      "Jolie Justus replies in KC Town Hall grocery-access thread",
      "Jolie Justus (@joliejustus)",
      "2019-04-29",
      "https://x.com/joliejustus/status/1122883010582466560",
      "Councilmember Jolie Justus replied in the KC Town Hall Leon's Thriftway thread on April 29, 2019.",
      ["visible incoming Council-member engagement", "public dialogue about neighborhood grocery access"],
      ["a completed grocery-access intervention", "KC Town Hall causation", "Jamie's authorship of the account post"]
    ),
    publicReply(
      "SRC-KCTH-X-LUCAS-QUOTE-2019",
      "Quinton Lucas quote-posts KC Town Hall grocery-access message",
      "Quinton Lucas (@QuintonLucasKC)",
      "2019-04-29",
      "https://x.com/QuintonLucasKC/status/1122866432130334720",
      "Councilmember Quinton Lucas quote-posted KC Town Hall's Leon's Thriftway message on April 29, 2019.",
      ["visible incoming Council-member engagement", "public dialogue about neighborhood grocery access"],
      ["a completed grocery-access intervention", "KC Town Hall causation", "Jamie's authorship of the account post"]
    ),
    publicReply(
      "SRC-KCTH-X-KCMO311-REPLY-2018",
      "KCMO 311 replies in KC Town Hall service thread",
      "KCMO 311 (@KCMO311)",
      "2018-08-27",
      "https://x.com/KCMO311/status/1034093516073459712",
      "KCMO 311 publicly replied in a KC Town Hall neighborhood service thread on August 27, 2018.",
      ["visible incoming city-service-account engagement", "public service follow-up"],
      ["confirmed resolution of the reported condition", "service outcome causation"]
    ),
    {
      id: "SRC-KCTH-KCUR-PRIMARY-GUIDE-2018",
      title: "A Cheat Sheet For Tuesday's Primary Election In Missouri",
      organization: "KCUR",
      author: "Erica Hunzinger",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2018-08-05",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://www.kcur.org/politics-elections-and-government/2018-08-05/a-cheat-sheet-for-tuesdays-primary-election-in-missouri",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Erica Hunzinger, 'A Cheat Sheet For Tuesday's Primary Election In Missouri,' KCUR, August 5, 2018.",
      publicNote:
        "KC Town Hall linked this guide in a voter-information post. The article is public-service context, not evidence of reach or turnout caused by the account.",
      supportsGenerally: ["the substance and date of a posted public voting resource"],
      doesNotEstablish: ["voter reach", "turnout", "Jamie's authorship of the post"]
    },
    {
      id: "SRC-KCTH-MO-VOTER-LOOKUP",
      title: "Missouri voter registration lookup",
      organization: "Missouri Secretary of State",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://voteroutreach.sos.mo.gov/portal",
      preferredPublicUrl: "canonical",
      publicCitation: "Missouri Secretary of State, voter registration lookup.",
      publicNote:
        "KC Town Hall linked an earlier version of this official lookup in the same voter-information post.",
      supportsGenerally: ["an official voter-information destination"],
      doesNotEstablish: ["use totals", "turnout", "KC Town Hall authorship of the government service"]
    },
    {
      id: "SRC-KCTH-NORTHEAST-HOUSING-2018",
      title: "Affordable housing policy hits docket at KCMO",
      organization: "Northeast News",
      author: "Paul Thompson",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2018-09-19",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://northeastnews.net/pages/affordable-housing-policy-hits-docket-kcmo/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Paul Thompson, 'Affordable housing policy hits docket at KCMO,' Northeast News, September 19, 2018.",
      publicNote:
        "KC Town Hall linked this article. It describes seven housing proposals before the Council Housing Committee and identifies Quinton Lucas as committee chair.",
      supportsGenerally: ["the affordable-housing policy context shared by the account", "Quinton Lucas's Council role during the period"],
      doesNotEstablish: ["KC Town Hall authorship of the policies", "policy causation", "adoption of all seven proposals"]
    },
    {
      id: "SRC-KCTH-YOUTUBE-PAINT-2018",
      title: "4 TONS of DUMPED LATEX PAINT - SOLUTION",
      organization: "YouTube",
      author: "KC Town Hall",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2018-08-30",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://www.youtube.com/watch?v=PmLjLyOpS9I",
      preferredPublicUrl: "canonical",
      publicCitation:
        "KC Town Hall, '4 TONS of DUMPED LATEX PAINT - SOLUTION,' YouTube, linked August 30, 2018.",
      publicNote:
        "YouTube metadata preserves the KC Town Hall channel attribution. The title's tonnage is an account claim, not independent measurement.",
      supportsGenerally: ["public neighborhood-condition documentation", "a KC Town Hall video artifact"],
      doesNotEstablish: ["independent tonnage verification", "Jamie's sole authorship or role"]
    },
    {
      id: "SRC-KCTH-YOUTUBE-COVID-2020",
      title: "#COVID19 Relief: Stay Safe Resources",
      organization: "YouTube",
      author: "KC Town Hall",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-04-20",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://www.youtube.com/watch?v=onCKU-TuPhc",
      preferredPublicUrl: "canonical",
      publicCitation:
        "KC Town Hall, '#COVID19 Relief: Stay Safe Resources,' YouTube, linked April 20, 2020.",
      publicNote:
        "YouTube metadata preserves the KC Town Hall channel attribution and public-resource title.",
      supportsGenerally: ["public circulation of COVID-19 relief and safety resources"],
      doesNotEstablish: ["resource uptake", "health outcomes", "Jamie's sole authorship or role"]
    },
    {
      id: "SRC-KCTH-KCSTAR-LEONS-LEAD",
      title:
        "Leon's Thriftway may be the oldest black-owned grocery store in the country",
      organization: "The Kansas City Star",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "dead",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://www.kansascity.com/news/business/article87241897.html",
      preferredPublicUrl: "canonical",
      publicCitation:
        "The Kansas City Star, 'Leon's Thriftway may be the oldest black-owned grocery store in the country,' linked by @KCTownHall on April 29, 2019; page not recovered in this pass.",
      publicNote:
        "Only the displayed title and URL were recovered from the public post. The article body remains a source lead.",
      supportsGenerally: ["a posted source lead concerning neighborhood grocery access"],
      doesNotEstablish: ["the article's complete reporting", "the age or ownership superlative", "an accomplished KC Town Hall outcome"]
    },
    {
      id: "SRC-KCTH-GOFUNDME-CHURCH-LEAD",
      title: "Church air-conditioner theft fundraiser",
      organization: "GoFundMe",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "dead",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://www.gofundme.com/f/church-ac-theft",
      preferredPublicUrl: "canonical",
      publicCitation:
        "GoFundMe destination linked by @KCTownHall on August 6, 2019; page now unavailable.",
      publicNote:
        "The dead destination is retained as a research lead, not evidence of funds raised or beneficiary outcomes.",
      supportsGenerally: ["a posted mutual-aid source lead"],
      doesNotEstablish: ["funds raised", "beneficiary identity or outcome", "KC Town Hall administration of the fundraiser"]
    },
    {
      id: "SRC-KCTH-ROBINSON-OFFICIAL-ROLE",
      title: "Melissa Robinson person detail",
      organization: "City of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://kansascity.legistar.com/PersonDetail.aspx?From=RSS&G=d2e89a09-8736-4efb-b4ae-572e0903bd5a&GUID=1696D403-A114-4AB0-B632-A303AF8E3B3C&ID=240616",
      preferredPublicUrl: "canonical",
      publicCitation:
        "City of Kansas City, Missouri, Legistar person detail for Councilmember Melissa Robinson.",
      publicNote:
        "The official record lists Robinson's Councilmember service beginning July 19, 2019, encompassing the August 2020 reply date.",
      supportsGenerally: ["Melissa Robinson's sitting Council-member status on the interaction date"],
      doesNotEstablish: ["endorsement of every KC Town Hall claim", "policy causation"]
    },
    {
      id: "SRC-KCTH-JUSTUS-OFFICIAL-ROLE",
      title: "City Council Finance and Governance Committee agenda",
      organization: "City of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-03-06",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://kansascity.legistar.com/View.ashx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=442065A0-011D-439A-AEC5-C47DAA9C03AA&ID=949675&M=M",
      preferredPublicUrl: "canonical",
      publicCitation:
        "City of Kansas City, Missouri, City Council Finance and Governance Committee agenda, March 6, 2019.",
      publicNote:
        "The official Council agenda identifies Jolie Justus as vice chair during the same Council term as the April 2019 interactions.",
      supportsGenerally: ["Jolie Justus's sitting Council-member status during the interaction period"],
      doesNotEstablish: ["endorsement of every KC Town Hall claim", "policy causation"]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-KCTH-X-POPULATION-ACCOUNTING-2026",
      sourceId: "SRC-KCTH-X-CORPUS-2026-07-15",
      project: "kc-town-hall",
      assertion:
        "The profile reported 183 posts; the pass recovered 181 distinct account items and explicitly retains the two-item gap, with seven public conversation records separated from the denominator.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-X-PUBLIC-OPERATIONS", "CLM-KCTH-X-CIVIC-ENGAGEMENT"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-WAYBACK-ROOT-MISSION-2018",
      sourceId: "SRC-KCTH-WAYBACK-ROOT-2018",
      project: "kc-town-hall",
      assertion:
        "The earliest recovered root page describes restoring a historic Kansas City neighborhood resource together.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTOWNHALL-SOCIAL-DOCUMENTATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-WAYBACK-JOIN-PARTICIPATION-2019",
      sourceId: "SRC-KCTH-WAYBACK-JOIN-2019",
      project: "kc-town-hall",
      assertion:
        "The recovered join page invited people to follow and participate in building a neighborhood resource and cultural center.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTOWNHALL-SOCIAL-DOCUMENTATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-WAYBACK-TIRES-AUTHORSHIP-2020",
      sourceId: "SRC-KCTH-WAYBACK-TIRES-2020",
      project: "kc-town-hall",
      assertion:
        "The archived Tired of Tires article identifies Julia and Jamie as authors and KC Town Hall with Oak Park Neighborhood Association as program partners.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-X-PUBLIC-OPERATIONS", "CLM-KCTH-X-SELF-REPORTED-TIRE-OUTCOMES"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-X-PUBLIC-OPERATIONS-2026",
      sourceId: "SRC-KCTH-X-CORPUS-2026-07-15",
      project: "kc-town-hall",
      assertion:
        "Among 155 recovered authored posts, 99 document or coordinate the Tired of Tires program, 12 match survey-and-listening language, and 11 preserve building-history or adaptive-reuse context.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-X-PUBLIC-OPERATIONS"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-X-STAKEHOLDER-LOWER-BOUND-2026",
      sourceId: "SRC-KCTH-X-CORPUS-2026-07-15",
      project: "kc-town-hall",
      assertion:
        "The preserved public conversation contexts show visible incoming replies or a quote-post from at least three then-sitting Council-member accounts and one KCMO 311 reply; outbound mentions are excluded.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-X-CIVIC-ENGAGEMENT"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-X-TRACTION-SNAPSHOT-2026",
      sourceId: "SRC-KCTH-X-CORPUS-2026-07-15",
      project: "kc-town-hall",
      assertion:
        "Seventy-seven of 155 authored posts displayed at least one visible interaction on July 15, 2026; visible totals were 22 replies, 70 reposts, 174 likes, and one bookmark.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-X-SOCIAL-TRACTION-OBSERVATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-X-TIRED-OF-TIRES-LAUNCH-2019",
      sourceId: "SRC-KCTH-X-TIRED-OF-TIRES-LAUNCH-2019",
      project: "kc-town-hall",
      assertion:
        "The project account publicly announced free neighborhood tire pickup with Oak Park on May 3, 2019.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-X-PUBLIC-OPERATIONS"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    ...[
      ["ROBINSON", "SRC-KCTH-X-ROBINSON-REPLY-2020", "Melissa Robinson visibly replied to the KC Town Hall account in August 2020."],
      ["JUSTUS", "SRC-KCTH-X-JUSTUS-REPLY-2019", "Jolie Justus visibly replied in a KC Town Hall grocery-access thread in April 2019."],
      ["LUCAS", "SRC-KCTH-X-LUCAS-QUOTE-2019", "Quinton Lucas visibly quote-posted a KC Town Hall grocery-access message in April 2019."],
      ["KCMO311", "SRC-KCTH-X-KCMO311-REPLY-2018", "KCMO 311 visibly replied in a KC Town Hall neighborhood-service thread in August 2018."]
    ].map(([suffix, sourceId, assertion]) => ({
      id: `AST-KCTH-X-${suffix}-ENGAGEMENT`,
      sourceId,
      project: "kc-town-hall",
      assertion,
      relationship: "supports" as const,
      confidence: "high" as const,
      candidateClaimIds: ["CLM-KCTH-X-CIVIC-ENGAGEMENT"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    })),
    ...[
      ["KCUR", "SRC-KCTH-KCUR-PRIMARY-GUIDE-2018", "The linked KCUR article is a Missouri primary-election guide and voter-information resource."],
      ["MO-VOTER", "SRC-KCTH-MO-VOTER-LOOKUP", "The linked Missouri Secretary of State service is an official voter registration lookup."],
      ["NORTHEAST-HOUSING", "SRC-KCTH-NORTHEAST-HOUSING-2018", "The linked Northeast News article describes seven affordable-housing proposals before the Council Housing Committee."],
      ["YOUTUBE-PAINT", "SRC-KCTH-YOUTUBE-PAINT-2018", "A linked KC Town Hall YouTube video documents a dumped-latex-paint response; the title's tonnage is not independently corroborated."],
      ["YOUTUBE-COVID", "SRC-KCTH-YOUTUBE-COVID-2020", "A linked KC Town Hall YouTube video circulates COVID-19 relief and safety resources."],
      ["KCSTAR-LEAD", "SRC-KCTH-KCSTAR-LEONS-LEAD", "The Kansas City Star title and URL are preserved from the post, but the article body was not recovered."],
      ["GOFUNDME-LEAD", "SRC-KCTH-GOFUNDME-CHURCH-LEAD", "The posted GoFundMe destination is now unavailable and cannot support fundraising or beneficiary-outcome claims."]
    ].map(([suffix, sourceId, assertion]) => ({
      id: `AST-KCTH-X-SOURCE-${suffix}`,
      sourceId,
      project: "kc-town-hall",
      assertion,
      relationship: /LEAD/.test(suffix) ? "bounds" as const : "contextualizes" as const,
      confidence: "high" as const,
      candidateClaimIds: ["CLM-KCTH-X-PUBLIC-SOURCE-CIRCULATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    })),
    {
      id: "AST-KCTH-X-ROBINSON-OFFICIAL-ROLE",
      sourceId: "SRC-KCTH-ROBINSON-OFFICIAL-ROLE",
      project: "kc-town-hall",
      assertion:
        "The official person record places Melissa Robinson in Council service beginning July 19, 2019, encompassing the August 2020 reply date.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-X-CIVIC-ENGAGEMENT"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-KCTH-X-JUSTUS-OFFICIAL-ROLE",
      sourceId: "SRC-KCTH-JUSTUS-OFFICIAL-ROLE",
      project: "kc-town-hall",
      assertion:
        "An official March 2019 Council agenda identifies Jolie Justus as vice chair during the same Council term as the April 2019 interaction.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-X-CIVIC-ENGAGEMENT"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  claims: [
    {
      id: "CLM-KCTH-X-PUBLIC-OPERATIONS",
      project: "kc-town-hall",
      internalClaim:
        "An archived Tired of Tires page identifies Julia and Jamie as authors and KC Town Hall with Oak Park Neighborhood Association as program partners; the recovered account population documents sustained shared public operations across 99 of 155 authored posts.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "An archived Tired of Tires page names Julia and Jamie as authors and KC Town Hall with Oak Park Neighborhood Association as program partners. The shared account became an operating surface, not only an announcement channel: 99 of 155 recovered authored posts document or coordinate tire-program work.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-WAYBACK-TIRES-2020",
          relationship: "direct-support",
          supports: ["Julia and Jamie author byline", "KC Town Hall and Oak Park partnership", "monthly free tire-pickup workflow"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCTH-X-CORPUS-2026-07-15",
          relationship: "direct-support",
          supports: ["181-item corpus", "99-post Tired of Tires pattern", "survey/listening and adaptive-reuse patterns"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCTH-X-TIRED-OF-TIRES-LAUNCH-2019",
          relationship: "corroborating",
          supports: ["public launch communication", "collective neighborhood coordination"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "The archived byline supports Jamie's public documentation role for the Tired of Tires page; it does not prove he authored every account post or personally performed all later program work.",
        "The pattern count describes public documentation and coordination; it does not independently verify pickup totals, cost savings, survey reach, program causation, or project completion.",
        "Two of 183 profile-reported items remain unrecovered."
      ],
      antiClaims: [
        "Jamie alone authored the Tired of Tires page or operated the program alone",
        "Jamie authored all 155 project-account posts",
        "Jamie personally operated every Tired of Tires pickup",
        "The corpus independently verifies the account's tire totals or cost-savings figures",
        "The adaptive-reuse project was completed"
      ],
      researchInquiryIds: ["INQ-KCTH-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-KCTH-X-CIVIC-ENGAGEMENT",
      project: "kc-town-hall",
      internalClaim:
        "At least three then-sitting Kansas City Council-member accounts visibly replied to or quote-posted @KCTownHall, and KCMO 311 visibly replied in a neighborhood-service thread.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "The public record also preserves two-way civic dialogue: at least three then-sitting Kansas City Council-member accounts visibly replied to or quote-posted KC Town Hall, and KCMO 311 replied in a neighborhood-service thread.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-X-CORPUS-2026-07-15",
          relationship: "direct-support",
          supports: ["seven classified public conversation contexts", "three-account Council-member lower bound", "one KCMO 311 reply"],
          confidence: "high",
          renderCitation: true
        },
        ...[
          "SRC-KCTH-X-ROBINSON-REPLY-2020",
          "SRC-KCTH-X-JUSTUS-REPLY-2019",
          "SRC-KCTH-X-LUCAS-QUOTE-2019",
          "SRC-KCTH-X-KCMO311-REPLY-2018"
        ].map((sourceId) => ({
          sourceId,
          relationship: "corroborating" as const,
          supports: ["a visible incoming public interaction"],
          confidence: "high" as const,
          renderCitation: true
        })),
        {
          sourceId: "SRC-KCTH-ROBINSON-OFFICIAL-ROLE",
          relationship: "corroborating",
          supports: ["Robinson's Council service on the reply date"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCTH-JUSTUS-OFFICIAL-ROLE",
          relationship: "corroborating",
          supports: ["Justus's Council role during the interaction period"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCTH-NORTHEAST-HOUSING-2018",
          relationship: "corroborating",
          supports: ["Lucas's Council committee-chair role during the period"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "The count is a lower bound from seven preserved public conversation records, not a complete stakeholder census.",
        "Outbound tags and mentions are excluded; only visible replies or quote-posts count as incoming engagement.",
        "Engagement documents public dialogue, not endorsement, policy causation, completed service resolution, or Jamie's authorship of each project-account post."
      ],
      antiClaims: [
        "Every tagged public official engaged with KC Town Hall",
        "Council-member engagement proves policy endorsement or causation",
        "KCMO 311 confirmed that the reported condition was resolved",
        "Jamie personally authored every exchange"
      ],
      researchInquiryIds: ["INQ-KCTH-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-KCTH-X-PUBLIC-SOURCE-CIRCULATION",
      project: "kc-town-hall",
      internalClaim:
        "The account circulated public resources about voting, affordable housing, transit, grocery access, neighborhood conditions, mutual aid, and COVID-19 relief.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "The project account also served as a source-distribution surface for voting, affordable-housing, transit, grocery-access, neighborhood-condition, mutual-aid, and COVID-19 resources.",
          status: "active",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-X-CORPUS-2026-07-15",
          relationship: "direct-support",
          supports: ["130 authored outgoing-link occurrences", "eleven authored external-link occurrences", "posted URL inventory"],
          confidence: "high",
          renderCitation: true
        },
        ...[
          "SRC-KCTH-KCUR-PRIMARY-GUIDE-2018",
          "SRC-KCTH-MO-VOTER-LOOKUP",
          "SRC-KCTH-NORTHEAST-HOUSING-2018",
          "SRC-KCTH-YOUTUBE-PAINT-2018",
          "SRC-KCTH-YOUTUBE-COVID-2020"
        ].map((sourceId) => ({
          sourceId,
          relationship: "context" as const,
          supports: ["a mission-relevant posted public resource"],
          confidence: "high" as const,
          renderCitation: true
        }))
      ],
      boundaries: [
        "Linking or reposting a source does not establish KC Town Hall or Jamie as its author.",
        "The source inventory documents circulation, not audience reach, uptake, agreement, or caused outcomes.",
        "Dead and unrecovered pages remain leads and are not used for substantive claims."
      ],
      antiClaims: [
        "KC Town Hall authored the linked journalism or government resources",
        "Every linked source was independently endorsed",
        "Posted resources prove audience uptake or civic outcomes"
      ],
      researchInquiryIds: ["INQ-KCTH-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-KCTH-X-SOCIAL-TRACTION-OBSERVATION",
      project: "kc-town-hall",
      internalClaim:
        "On July 15, 2026, 77 of 155 authored posts displayed at least one visible interaction; visible totals were 22 replies, 70 reposts, 174 likes, and one bookmark.",
      status: "use-with-care",
      maturity: "partially-supported",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "A dated authenticated observation retained visible interaction labels for research while holding volatile totals from accomplishment messaging.",
          status: "hold",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-X-CORPUS-2026-07-15",
          relationship: "direct-support",
          supports: ["dated visible interaction labels", "aggregate arithmetic"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "These are volatile platform observations, not stable historical analytics or unique people.",
        "The totals may omit deleted, hidden, private, suppressed, or unavailable activity.",
        "They belong to the shared account and do not measure Jamie's individual impact."
      ],
      antiClaims: [
        "The totals are complete lifetime analytics",
        "Each interaction represents a unique person",
        "Visible engagement proves program outcomes or Jamie's individual impact"
      ],
      researchInquiryIds: ["INQ-KCTH-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-KCTH-X-SELF-REPORTED-TIRE-OUTCOMES",
      project: "kc-town-hall",
      internalClaim:
        "The project account self-reported 142 tires collected, no tires left on the curb, and $17,768 in avoided costs in an August 2020 post.",
      status: "use-with-care",
      maturity: "research-needed",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "The account's quantitative tire-program outcome post remains held pending independent corroboration and role attribution.",
          status: "hold",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-X-TIRE-OUTCOME-SELF-REPORT-2020",
          relationship: "direct-support",
          supports: ["the fact and wording of the account's self-report"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-X-ROBINSON-REPLY-2020",
          relationship: "context",
          supports: ["a public Councilmember response in the thread"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The figures are a project-account self-report and are not independently corroborated in this pass.",
        "The record does not assign the underlying operations, measurement, or post authorship to Jamie.",
        "The Councilmember reply recognizes community work but does not verify each number."
      ],
      antiClaims: [
        "The corpus independently verifies 142 tires or $17,768",
        "Melissa Robinson audited or endorsed the figures",
        "Jamie personally produced the reported outcomes"
      ],
      researchInquiryIds: ["INQ-KCTH-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  researchTasks: [
    {
      id: "TASK-KCTH-X-RECOVER-TWO-MISSING",
      project: "kc-town-hall",
      question:
        "Can the two profile-reported but unrecovered account items be identified through a lawful export, public archive, or later authenticated pass?",
      priority: "medium",
      status: "queued",
      methodsPlanned: ["request or inspect a lawful account export", "query public web archives", "repeat dated authenticated searches"],
      successCriteria: ["recover canonical status IDs or preserve an explicit not-recovered finding", "update corpus denominator without silently changing prior observations"],
      sourceIds: ["SRC-KCTH-X-CORPUS-2026-07-15"],
      claimIds: ["CLM-KCTH-X-PUBLIC-OPERATIONS", "CLM-KCTH-X-CIVIC-ENGAGEMENT"],
      publicSummary: "Resolve or continue to disclose the two-item recovery gap.",
      reviewedAt: "2026-07-15"
    },
    {
      id: "TASK-KCTH-X-CORROBORATE-TIRE-OUTCOMES",
      project: "kc-town-hall",
      question:
        "Can program records, city disposal records, fiscal documents, or bounded collaborator testimony independently corroborate the account's tire and avoided-cost figures?",
      priority: "high",
      status: "queued",
      methodsPlanned: ["seek public program or disposal records", "inspect public-safe project records", "request bounded collaborator confirmation"],
      successCriteria: ["independently corroborate each projected number", "separate program-level outcomes from Jamie's role", "keep unsupported figures held"],
      sourceIds: ["SRC-KCTH-X-TIRE-OUTCOME-SELF-REPORT-2020", "SRC-KCTH-X-ROBINSON-REPLY-2020", "SRC-KCTH-WAYBACK-TIRES-2020"],
      claimIds: ["CLM-KCTH-X-SELF-REPORTED-TIRE-OUTCOMES"],
      publicSummary: "Corroborate quantitative Tired of Tires outcomes before public projection.",
      reviewedAt: "2026-07-15"
    },
    {
      id: "TASK-KCTH-X-ACCOUNT-AUTHORSHIP",
      project: "kc-town-hall",
      question:
        "What public-safe evidence can establish Jamie's account-establishment, authorship, or operating role without assigning later collective output to him?",
      priority: "high",
      status: "in-progress",
      methodsPlanned: ["inspect public-safe account-creation or code records", "seek bounded collaborator testimony", "compare dated role and transition records"],
      successCriteria: ["establish a dated, bounded role claim", "separate Jamie's contribution from shared and post-transition account activity"],
      sourceIds: ["SRC-KCTH-X-CORPUS-2026-07-15", "SRC-KCTH-WAYBACK-TIRES-2020"],
      claimIds: ["CLM-KCTH-X-PUBLIC-OPERATIONS"],
      publicSummary: "An archived project page now corroborates Jamie's bounded Tired of Tires authorship role; account establishment and post-level authorship remain open.",
      reviewedAt: "2026-07-15"
    },
    {
      id: "TASK-KCTH-X-DEAD-LINK-RECOVERY",
      project: "kc-town-hall",
      question:
        "Can the KC Star Leon's article, GoFundMe page, two Facebook records, and expired KC Town Hall routes be recovered from lawful public archives?",
      priority: "medium",
      status: "in-progress",
      methodsPlanned: ["query public web archives", "inspect public metadata", "preserve not-recovered dispositions where bodies remain unavailable"],
      successCriteria: ["recover and close-read public page bodies or retain explicit source-lead boundaries", "never infer missing content from a title alone"],
      sourceIds: ["SRC-KCTH-KCSTAR-LEONS-LEAD", "SRC-KCTH-GOFUNDME-CHURCH-LEAD"],
      claimIds: ["CLM-KCTH-X-PUBLIC-SOURCE-CIRCULATION"],
      publicSummary: "Continue preservation of mission-relevant posted sources without overstating unrecovered pages.",
      reviewedAt: "2026-07-15"
    }
  ],
  researchInquiries: [
    {
      id: "INQ-KCTH-X-FULL-POPULATION-2026",
      project: "kc-town-hall",
      question:
        "What mission-relevant sources, claims, and public stakeholder-engagement patterns appear across the full profile-reported @KCTownHall population?",
      methods: [
        "traversed the authenticated replies-inclusive timeline to exhaustion and deduplicated canonical status IDs",
        "cross-checked the posts-only timeline and authored searches, including the launch boundary",
        "resolved every recovered t.co destination and separated authored posts, reposts, and public conversation context",
        "classified mission patterns, incoming stakeholder interactions, media, URLs, and dated visible engagement",
        "close-read recoverable mission-relevant external sources and queued dead or inaccessible pages as leads",
        "excluded private account surfaces, contact numbers, analytics, personal interaction state, credentials, and session data"
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "The profile reported 183 posts; 181 distinct account items were recovered, preserving an explicit two-item gap and seven separately classified public conversation contexts.",
        "The recovered account population contains 155 authored posts and 26 reposts spanning July 2018 through September 2022.",
        "Ninety-nine authored posts document or coordinate Tired of Tires activity; twelve match survey-and-listening language; eleven preserve building-history or adaptive-reuse context.",
        "An archived Tired of Tires page identifies Julia and Jamie as authors and KC Town Hall with Oak Park Neighborhood Association as program partners; this supports Jamie's public documentation role without assigning all program operations or later account output to him.",
        "At least three then-sitting Council-member accounts visibly replied to or quote-posted KC Town Hall, and KCMO 311 visibly replied in a neighborhood-service thread. Outbound mentions were excluded.",
        "The account's 115 authored posts with outgoing links contain 130 link occurrences: 119 KC Town Hall destinations and eleven external destinations.",
        "Mission-relevant posted sources include KCUR and Missouri voter resources, Northeast News housing coverage, RideKC, two KC Town Hall YouTube records, a KC Star grocery-access lead, a dead GoFundMe lead, and two Facebook leads.",
        "Visible engagement totals and the account's self-reported tire outcomes remain held from portfolio accomplishment messaging."
      ],
      limitations: [
        "Two profile-reported items did not render and were not recovered through authored searches or public archive status queries.",
        "X can omit deleted, hidden, private, region-limited, or platform-suppressed material; visible interaction labels are volatile dated observations.",
        "The shared account does not identify the individual author of every post or assign later operations to Jamie.",
        "Replies and quote-posts establish public dialogue, not endorsement, causation, complete stakeholder participation, or completed outcomes.",
        "Several posted pages were dead or inaccessible and remain leads rather than substantive evidence."
      ],
      sourceIds: [
        "SRC-KCTH-X-CORPUS-2026-07-15",
        "SRC-KCTH-WAYBACK-ROOT-2018",
        "SRC-KCTH-WAYBACK-JOIN-2019",
        "SRC-KCTH-WAYBACK-TIRES-2020",
        "SRC-KCTH-X-TIRED-OF-TIRES-LAUNCH-2019",
        "SRC-KCTH-X-ROBINSON-REPLY-2020",
        "SRC-KCTH-X-JUSTUS-REPLY-2019",
        "SRC-KCTH-X-LUCAS-QUOTE-2019",
        "SRC-KCTH-X-KCMO311-REPLY-2018",
        "SRC-KCTH-KCUR-PRIMARY-GUIDE-2018",
        "SRC-KCTH-MO-VOTER-LOOKUP",
        "SRC-KCTH-NORTHEAST-HOUSING-2018",
        "SRC-KCTH-YOUTUBE-PAINT-2018",
        "SRC-KCTH-YOUTUBE-COVID-2020"
      ],
      publicSummary:
        "The full reported population is accounted for as 181 recovered account items plus an explicit two-item gap. The archive supports project-level public-operations and civic-dialogue claims while holding volatile engagement, uncorroborated outcome numbers, and individual authorship attribution."
    }
  ]
};
