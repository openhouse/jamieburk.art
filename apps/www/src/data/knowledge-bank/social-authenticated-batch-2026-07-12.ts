import type { KnowledgeBank } from "./schema.ts";

type SocialAuthenticatedBatch = Pick<KnowledgeBank, "sources" | "claims">;

export const socialAuthenticatedBatchRecords: SocialAuthenticatedBatch = {
  sources: [
    {
      id: "SRC-SOCIAL-X-AUTHENTICATED-RUN-2026",
      title: "Authenticated X project-account and Council-roster research run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-12",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for a July 2026 authenticated X search of project accounts, domain links, replies, mentions, and 60 historical Council handles.",
      publicNote:
        "The run recovered indexed public posts through an authenticated browser. It is a bounded search corpus, not an official account export or complete interaction graph.",
      protectedLocatorId: "RESEARCH-X-AUTHENTICATED-SOCIAL-2026-001",
      supportsGenerally: [
        "11 @CallNYCapp mention results, 47 CallNYC-authored results, and 45 callnyc.org link results",
        "395 @NYCArtC mention results, 59 reply-search results, and 279 NYC Artist Coalition-authored results",
        "a roster-driven query of 60 historical Council handles recovered 28 posts from 12 then-sitting Council-member accounts",
        "the separate CallNYC profile capture adds Mathieu Eugene, yielding a recovered minimum of 13 then-sitting Council members and 29 direct posts across the two projects",
        "authenticated X search returned no historical @wowlist results, while public oEmbed and Wayback separately preserve two posts"
      ],
      doesNotEstablish: [
        "a complete account export",
        "all deleted posts or historical handle changes",
        "the identities behind all likes or reposts",
        "impressions or audience reach",
        "individual authorship of shared-account posts",
        "policy causality"
      ]
    },
    {
      id: "SRC-SOCIAL-CALLNYC-PETER-KOO-2016",
      title: "Peter Koo repost of CallNYC Lifeline recognition",
      organization: "Office of Council Member Peter Koo",
      author: "Peter Koo",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-04-27",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/CMPeterKoo/status/725422741160079360",
      preferredPublicUrl: "canonical",
      publicCitation: "Peter Koo repost of a CallNYC constituent-service recognition, April 27, 2016.",
      supportsGenerally: ["a then-sitting Council member account directly amplified CallNYC"],
      doesNotEstablish: ["endorsement of every CallNYC interpretation", "a complete engagement total"]
    },
    {
      id: "SRC-SOCIAL-CALLNYC-STEVEN-MATTEO-2016",
      title: "Steven Matteo reply to CallNYC",
      organization: "Office of Council Member Steven Matteo",
      author: "Steven Matteo",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-05-03",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/StevenMatteo/status/727621921341358081",
      preferredPublicUrl: "canonical",
      publicCitation: "Steven Matteo reply to CallNYC about constituent pothole concerns, May 3, 2016.",
      supportsGenerally: ["a then-sitting Council member account directly replied to CallNYC"],
      doesNotEstablish: ["resolution of the reported issue", "a complete engagement total"]
    },
    {
      id: "SRC-SOCIAL-CALLNYC-RUBEN-WILLS-2016",
      title: "Ruben Wills reply to CallNYC",
      organization: "Office of Council Member Ruben Wills",
      author: "Ruben Wills",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-05-17",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/CM_RubenWills/status/732717792097603584",
      preferredPublicUrl: "canonical",
      publicCitation: "Ruben Wills reply to CallNYC and the New York City Council, May 17, 2016.",
      supportsGenerally: ["a then-sitting Council member account directly replied to CallNYC"],
      doesNotEstablish: ["the substance hidden earlier in the reply thread", "a complete engagement total"]
    },
    {
      id: "SRC-SOCIAL-CALLNYC-MARGARET-CHIN-2017",
      title: "Margaret Chin response to CallNYC recognition",
      organization: "Office of Council Member Margaret Chin",
      author: "Margaret Chin",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-07-11",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/CM_MargaretChin/status/884863588317442049",
      preferredPublicUrl: "canonical",
      publicCitation: "Margaret Chin response thanking CallNYC for recognition, July 11, 2017.",
      supportsGenerally: [
        "a then-sitting Council member directly acknowledged CallNYC",
        "the response connected recognition to improving constituent-service numbers"
      ],
      doesNotEstablish: ["independent validation of CallNYC's method", "a complete engagement total"]
    },
    {
      id: "SRC-SOCIAL-NYCAC-CARLINA-RIVERA-2018",
      title: "Carlina Rivera reply to NYC Artist Coalition",
      organization: "Office of Council Member Carlina Rivera",
      author: "Carlina Rivera",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2018-10-20",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/CarlinaRivera/status/1053849469853274112",
      preferredPublicUrl: "canonical",
      publicCitation: "Carlina Rivera reply to NYC Artist Coalition affirming co-sponsorship and support, October 20, 2018.",
      supportsGenerally: ["a then-sitting Council member directly replied to the coalition account"],
      doesNotEstablish: ["which proposal is visible outside the full thread", "policy passage"]
    },
    {
      id: "SRC-SOCIAL-NYCAC-STEPHEN-LEVIN-2019",
      title: "Stephen Levin thanks NYC Artist Coalition after MARCH hearing",
      organization: "Office of Council Member Stephen Levin",
      author: "Stephen Levin",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-02-11",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/StephenLevin33/status/1095020293112979457",
      preferredPublicUrl: "canonical",
      publicCitation: "Stephen Levin post thanking NYC Artist Coalition and venue participants after MARCH testimony, February 11, 2019.",
      supportsGenerally: [
        "a then-sitting Council member publicly credited NYC Artist Coalition for helping surface venue testimony",
        "the account identity was legible in the Talks Not Raids hearing record"
      ],
      doesNotEstablish: ["solo campaign ownership", "sole causality for later enforcement reform"]
    },
    {
      id: "SRC-SOCIAL-NYCAC-JUSTIN-BRANNAN-2019",
      title: "Justin Brannan reply to NYC Artist Coalition",
      organization: "Office of Council Member Justin Brannan",
      author: "Justin Brannan",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-08-30",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/JustinBrannan/status/1167536258438115333",
      preferredPublicUrl: "canonical",
      publicCitation: "Justin Brannan reply to NYC Artist Coalition and the MTA, August 30, 2019.",
      supportsGenerally: ["a then-sitting Council member account directly replied to the coalition account"],
      doesNotEstablish: ["a substantive policy position", "the context outside the full reply thread"]
    },
    {
      id: "SRC-SOCIAL-NYCAC-MARK-LEVINE-2020",
      title: "Mark Levine reply to NYC Artist Coalition",
      organization: "Office of Council Member Mark Levine",
      author: "Mark Levine",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-03-20",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/MarkLevineNYC/status/1241027587947876352",
      preferredPublicUrl: "canonical",
      publicCitation: "Mark Levine scheduling reply to NYC Artist Coalition, March 20, 2020.",
      supportsGenerally: ["a then-sitting Council member account directly replied to the coalition account"],
      doesNotEstablish: ["the full scheduling context", "a substantive policy position"]
    },
    {
      id: "SRC-SOCIAL-NYCAC-JIMMY-VAN-BRAMER-2020",
      title: "Jimmy Van Bramer post prioritizing arts and culture",
      organization: "Office of Council Member Jimmy Van Bramer",
      author: "Jimmy Van Bramer",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-10-26",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/JimmyVanBramer/status/1320792543773282304",
      preferredPublicUrl: "canonical",
      publicCitation: "Jimmy Van Bramer post naming NYC Artist Coalition while calling for arts and culture support, October 26, 2020.",
      supportsGenerally: ["a then-sitting Council member included the coalition identity in public arts advocacy"],
      doesNotEstablish: ["coalition authorship of the post", "a specific enacted outcome"]
    },
    {
      id: "SRC-SOCIAL-NYCAC-BRAD-LANDER-2021",
      title: "Brad Lander commercial-rent committee reply",
      organization: "Office of Council Member Brad Lander",
      author: "Brad Lander",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2021-01-28",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/bradlander/status/1354840336330330116",
      preferredPublicUrl: "canonical",
      publicCitation: "Brad Lander reply about supporting Commercial Rent Stabilization in committee remarks, January 28, 2021.",
      publicNote:
        "Authenticated X search preserved the coalition account among the reply participants even though the compact rendered text collapses some handles.",
      supportsGenerally: [
        "a then-sitting Council member directly engaged a coalition thread",
        "the reply connected public discussion to Commercial Rent Stabilization committee remarks"
      ],
      doesNotEstablish: ["passage of the proposal", "NYC Artist Coalition as sole campaign owner"]
    },
    {
      id: "SRC-SOCIAL-OLYMPIA-NYCAC-CORPUS-2026",
      title: "Olympia Kazi public NYC Artist Coalition mention corpus",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-12",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for 89 unique authenticated-search posts by Olympia Kazi mentioning @NYCArtC from November 2019 through June 2022.",
      publicNote:
        "The posts are Olympia Kazi's public authorship and demonstrate sustained use of the coalition identity around cultural policy, hearings, Fair Rent NYC, nightlife, and cultural-space work.",
      protectedLocatorId: "RESEARCH-OLYMPIA-NYCAC-CORPUS-2026-001",
      supportsGenerally: [
        "89 unique public posts by Olympia Kazi mentioning @NYCArtC",
        "a date range from November 1, 2019, through June 9, 2022",
        "sustained public documentation across Fair Rent NYC, nightlife, hearings, cultural-space advocacy, and coalition work"
      ],
      doesNotEstablish: [
        "Olympia's authorship of posts published from the shared @NYCArtC account",
        "an official complete export of Olympia's account",
        "that Jamie directed or authored Olympia's posts",
        "audience reach or policy causality"
      ]
    },
    {
      id: "SRC-SOCIAL-OLYMPIA-NYCAC-HEARING-2022",
      title: "Olympia Kazi nightlife oversight hearing post",
      author: "Olympia Kazi",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2022-04-18",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/olympiakazi/status/1516092153893691392",
      preferredPublicUrl: "canonical",
      publicCitation: "Olympia Kazi post preparing for a City Council nightlife oversight hearing, April 18, 2022.",
      supportsGenerally: [
        "Olympia publicly connected NYC Artist Coalition work to an Office of Nightlife oversight hearing",
        "the post linked Save NYC Spaces, Talks Not Raids, and Fair Rent NYC through one coalition identity"
      ],
      doesNotEstablish: ["authorship of shared-account posts", "sole campaign ownership", "policy causality"]
    },
    {
      id: "SRC-SOCIAL-NYC-INSTITUTIONAL-CORPUS-2026",
      title: "NYC institutional engagement with NYC Artist Coalition corpus",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-12",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for 17 authenticated-search posts from NYC Cultural Affairs and NYC311 engaging @NYCArtC in 2017.",
      publicNote:
        "The corpus preserves direct city-agency dialogue and service routing; it is not a measure of all city-government engagement.",
      protectedLocatorId: "RESEARCH-NYC-INSTITUTIONAL-NYCAC-2026-001",
      supportsGenerally: [
        "17 direct posts from NYC Cultural Affairs and NYC311 engaging @NYCArtC",
        "CreateNYC dialogue about artist services, community-driven spaces, the Cabaret Law, MARCH, and interagency relationships",
        "NYC Cultural Affairs crediting the coalition with gathering a large crowd for a DIY-spaces discussion"
      ],
      doesNotEstablish: ["all city-agency engagement", "formal policy adoption", "individual authorship of coalition posts"]
    },
    {
      id: "SRC-SOCIAL-NYCULTURE-MARCH-CABARET-2017",
      title: "NYC Cultural Affairs asks NYC Artist Coalition about MARCH and Cabaret Law",
      organization: "NYC Department of Cultural Affairs",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-03-03",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/NYCulture/status/837715449920032768",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Cultural Affairs reply asking NYC Artist Coalition for detail about MARCH and the Cabaret Law, March 3, 2017.",
      supportsGenerally: [
        "a city agency directly solicited coalition knowledge during CreateNYC",
        "MARCH and Cabaret Law concerns entered public cultural-planning dialogue"
      ],
      doesNotEstablish: ["adoption of every coalition recommendation", "policy causality", "individual authorship"]
    },
    {
      id: "SRC-SOCIAL-DOCUMENT-JOURNAL-NIGHTLIFE-2018",
      title: "Taking back New York City's nightlife",
      organization: "Document Journal",
      author: "Daisy Prince",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2018-02-27",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.documentjournal.com/2018/02/taking-back-new-york-citys-nightlife/",
      preferredPublicUrl: "canonical",
      publicCitation: "Daisy Prince, 'Taking back New York City's nightlife,' Document Journal, February 27, 2018.",
      publicNote:
        "The article spells Jamie's surname 'Burkhart' in an image caption; the pictured person is Jamie Burkart. The source also photographs and quotes Olympia Kazi.",
      supportsGenerally: [
        "Jamie was visibly included among NYC Artist Coalition participants in the Cabaret Law repeal effort",
        "Olympia Kazi was photographed and quoted as a coalition and Let NYC Dance participant",
        "the campaign connected repeal to discriminatory enforcement, public safety, and dialogue with the NYPD"
      ],
      doesNotEstablish: [
        "Jamie or Olympia as sole campaign leaders",
        "individual causality for repeal",
        "correct spelling in the original image caption"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-NYCAC-OLYMPIA-PUBLIC-STEWARDSHIP",
      project: "nyc-artist-coalition",
      internalClaim:
        "Authenticated search recovered 89 unique public posts by Olympia Kazi mentioning @NYCArtC from November 2019 through June 2022 across cultural policy, hearings, Fair Rent NYC, nightlife, and cultural-space work.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Olympia Kazi publicly carried and amplified the @NYCArtC identity across at least 89 recovered posts from November 2019 through June 2022.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/social-archive-2026-07-12"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-SOCIAL-OLYMPIA-NYCAC-CORPUS-2026",
          relationship: "direct-support",
          supports: ["bounded count, date range, and thematic continuity"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-SOCIAL-OLYMPIA-NYCAC-HEARING-2022",
          relationship: "corroborating",
          supports: ["a representative public hearing and campaign-continuity post"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Credit the posts to Olympia Kazi.",
        "Do not infer that Olympia authored posts from the shared @NYCArtC account.",
        "Eighty-nine is a recovered authenticated-search count, not an official account-export total."
      ],
      antiClaims: [
        "Jamie authored Olympia Kazi's posts",
        "Jamie solely directed the coalition's public voice",
        "social documentation alone caused policy outcomes"
      ],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-NYCAC-CITY-DIALOGUE",
      project: "nyc-artist-coalition",
      internalClaim:
        "Authenticated search recovered 17 posts from NYC Cultural Affairs and NYC311 directly engaging @NYCArtC in 2017, including CreateNYC dialogue on community spaces, artist services, Cabaret Law, MARCH, and interagency relationships.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "NYC Artist Coalition's public identity supported sustained, issue-specific dialogue with NYC Cultural Affairs and NYC311 during CreateNYC.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/social-archive-2026-07-12"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-SOCIAL-NYC-INSTITUTIONAL-CORPUS-2026",
          relationship: "direct-support",
          supports: ["17-post bounded institutional corpus"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-SOCIAL-NYCULTURE-MARCH-CABARET-2017",
          relationship: "direct-support",
          supports: ["direct agency solicitation of coalition knowledge"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-SOCIAL-NYCAC-CREATENYC-TWITTER-DATA-2017",
          relationship: "corroborating",
          supports: ["official CreateNYC public-record context"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Seventeen is a bounded authenticated-search count, not all city-government engagement.",
        "Dialogue and acknowledgment do not equal adoption of every recommendation."
      ],
      antiClaims: ["NYC adopted every coalition recommendation", "the dialogue proves sole policy causality"],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ]
};
