import type { KnowledgeBank } from "./schema.ts";

type SocialArchiveBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

export const socialArchiveBatchRecords: SocialArchiveBatch = {
  sources: [
    {
      id: "SRC-SOCIAL-JAMIE-IDENTITY-CONFIRMATION-2026",
      title: "Jamie Burkart confirmation of project social-identity authorship",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      capturedAt: "2026-07-12",
      accessedAt: "2026-07-12",
      publicCitation:
        "Jamie's July 2026 confirmation that he established the CallNYC, NYC Artist Coalition, and WOWList social accounts and the NYC Artist Coalition logo and website family.",
      publicNote:
        "The confirmation supports Jamie's direct identity-system contribution; it does not attribute every post to Jamie or diminish collaborators' authorship and stewardship.",
      protectedLocatorId: "CONFIRMATION-SOCIAL-IDENTITY-JAMIE-2026-001",
      supportsGenerally: [
        "Jamie established the project accounts",
        "Jamie created the NYC Artist Coalition logo and website family",
        "multiple collaborators used the NYC Artist Coalition account over time"
      ],
      doesNotEstablish: [
        "Jamie authored every post",
        "Jamie solely led the campaigns",
        "the identity system belonged to Jamie rather than the collective",
        "which collaborator authored any particular post"
      ]
    },
    {
      id: "SRC-SOCIAL-CALLNYC-PROFILE-CAPTURE-2026",
      title: "CallNYC X profile capture",
      organization: "CallNYC",
      kind: "project-archive",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      capturedAt: "2026-07-11",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata from a July 11, 2026, rendered capture of the CallNYC X profile and its visible timeline.",
      publicNote:
        "The local PDF is not shipped. Public post URLs recovered from its link annotations are separately recorded as public sources.",
      protectedLocatorId: "CAPTURE-CALLNYC-X-PROFILE-2026-001",
      supportsGenerally: [
        "the profile displayed 110 posts, 69 followers, and 194 following at capture time",
        "the profile identified CallNYC as joined in March 2016",
        "the visible timeline included posts from Helen Rosenthal and Mathieu Eugene amplifying CallNYC",
        "the visible timeline preserved CallNYC award posts naming Julissa Ferreras, Mathieu Eugene, and Chaim Deutsch"
      ],
      doesNotEstablish: [
        "a complete account export",
        "a comprehensive engagement count",
        "the identity of every account that liked or reposted a post",
        "that every mentioned Council member engaged with CallNYC"
      ]
    },
    {
      id: "SRC-SOCIAL-CALLNYC-LAUNCH-POST-2016",
      title: "CallNYC launch post",
      organization: "CallNYC",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-03-05",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/CallNYCapp/status/706208629360304128",
      preferredPublicUrl: "canonical",
      publicCitation: "CallNYC launch post, March 5, 2016.",
      publicNote:
        "The wording 'first project using' is the project's contemporaneous self-description, not an independently verified superlative.",
      supportsGenerally: [
        "the @CallNYCapp project identity was active by March 5, 2016",
        "the account launched CallNYC as a use of Council constituent-services data"
      ],
      doesNotEstablish: [
        "an independently verified first-of-kind claim",
        "official Council ownership",
        "comprehensive account reach"
      ]
    },
    {
      id: "SRC-SOCIAL-CALLNYC-HELEN-ROSENTHAL-2016",
      title: "Helen Rosenthal post directing residents to CallNYC",
      organization: "Office of Council Member Helen Rosenthal",
      author: "Helen Rosenthal",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-09-27",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/HelenRosenthal/status/780797474277511170",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Helen Rosenthal post directing residents to find their Council member through CallNYC, September 27, 2016.",
      supportsGenerally: [
        "a then-sitting Council member account directly promoted CallNYC",
        "the post framed Council offices as resident-help resources"
      ],
      doesNotEstablish: [
        "official Council endorsement of every CallNYC interpretation",
        "a comprehensive Council-member engagement count",
        "current resident-service guidance"
      ]
    },
    {
      id: "SRC-SOCIAL-CALLNYC-MATHIEU-EUGENE-2016",
      title: "Mathieu Eugene post amplifying a CallNYC housing award",
      organization: "Office of Council Member Mathieu Eugene",
      author: "Mathieu Eugene",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-10-04",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/CMMathieuEugene/status/783305320508514304",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Mathieu Eugene post amplifying CallNYC's HPD Housing Lottery service-case recognition, October 4, 2016.",
      publicNote:
        "The surviving profile capture preserves the quoted CallNYC post context that X oEmbed does not include.",
      supportsGenerally: [
        "a then-sitting Council member account amplified a CallNYC recognition post",
        "the response connected the data to constituent housing help"
      ],
      doesNotEstablish: [
        "independent validation of CallNYC's ranking method",
        "a comprehensive Council-member engagement count",
        "official Council ownership of CallNYC"
      ]
    },
    {
      id: "SRC-SOCIAL-NYCAC-ACCOUNT",
      title: "NYC Artist Coalition social account",
      organization: "NYC Artist Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/NYCArtC",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition public social account, @NYCArtC.",
      supportsGenerally: [
        "the coalition uses @NYCArtC as a public project identity",
        "the identity spans multiple coalition campaigns"
      ],
      doesNotEstablish: [
        "individual authorship of posts",
        "sole campaign ownership",
        "a complete engagement history"
      ]
    },
    {
      id: "SRC-SOCIAL-NYCAC-CREATENYC-TWITTER-DATA-2017",
      title: "CreateNYC Twitter data appendix",
      organization: "City of New York",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl:
        "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect3_Twitter-data.pdf",
      preferredPublicUrl: "canonical",
      publicCitation: "CreateNYC Appendix, Section 3, Twitter data, 2017.",
      publicNote:
        "The appendix is a bounded hashtag dataset, not a complete account archive or measure of total reach.",
      supportsGenerally: [
        "NYC Artist Coalition posts appeared in the city's CreateNYC Twitter dataset",
        "NYC Cultural Affairs publicly credited @NYCArtC with gathering a large crowd for a DIY-spaces discussion",
        "the dataset preserves repost and favorite counts observed at collection time"
      ],
      doesNotEstablish: [
        "all NYC Artist Coalition social activity",
        "individual post authorship",
        "policy causality",
        "current engagement totals"
      ]
    },
    {
      id: "SRC-SOCIAL-NYCAC-TOWN-HALL-POST-2017",
      title: "NYC Artist Coalition CreateNYC town-hall post",
      organization: "NYC Artist Coalition",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2017-03-31",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/NYCArtC/status/847855360614563842",
      archiveUrl:
        "https://web.archive.org/web/20180224204132/https://twitter.com/nycartc/status/847855360614563842",
      preferredPublicUrl: "canonical",
      publicCitation:
        "NYC Artist Coalition post documenting a CreateNYC town hall on community-driven spaces, March 31, 2017.",
      supportsGenerally: [
        "the account documented coalition convening and public cultural-planning participation",
        "the post connected artists, venues, Cultural Affairs, and Council members in one public thread"
      ],
      doesNotEstablish: [
        "solo authorship of the town hall",
        "individual authorship of the post",
        "policy causality"
      ]
    },
    {
      id: "SRC-SOCIAL-NYCAC-ESPINAL-NIGHTLIFE-2018",
      title: "Espinal hosts new nightlife mayor",
      organization: "Brooklyn Daily Eagle",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2018-03-28",
      accessedAt: "2026-07-12",
      canonicalUrl:
        "https://brooklyneagle.com/67628/brooklyn-political-roundup-march-28-nixon-visits-nycha-in-crown-heights-with-adams/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Brooklyn Daily Eagle, 'Espinal hosts new nightlife mayor,' March 28, 2018.",
      publicNote:
        "The article reproduces Rafael Espinal's post stating that he and @NYCArtC welcomed the Nightlife Mayor to Brooklyn.",
      supportsGenerally: [
        "Rafael Espinal publicly identified joint work with @NYCArtC",
        "the account functioned as a legible coalition identity in direct Council-member communication"
      ],
      doesNotEstablish: [
        "Jamie as sole organizer of the event",
        "individual authorship of the @NYCArtC account",
        "NYC Artist Coalition as sole cause of the Office of Nightlife"
      ]
    },
    {
      id: "SRC-SOCIAL-NYCAC-CABARET-REPEAL-POST-2017",
      title: "NYC Artist Coalition Cabaret Law repeal post",
      organization: "NYC Artist Coalition",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-11-03",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/NYCArtC/status/926538867146149888",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition Cabaret Law repeal post, November 3, 2017.",
      supportsGenerally: [
        "the account documented the Cabaret Law repeal outcome",
        "the post linked the campaign site and contemporaneous reporting"
      ],
      doesNotEstablish: [
        "solo policy causality",
        "individual post authorship",
        "that every linked source was produced by the coalition"
      ]
    },
    {
      id: "SRC-SOCIAL-NYCAC-TALKS-NOT-RAIDS-POST-2019",
      title: "NYC Artist Coalition Talks Not Raids action post",
      organization: "NYC Artist Coalition",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2019-09-04",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/NYCArtC/status/1169388006844829696",
      archiveUrl:
        "https://web.archive.org/web/20190918184001/https://twitter.com/NYCArtC/status/1169388006844829696",
      preferredPublicUrl: "canonical",
      publicCitation:
        "NYC Artist Coalition Talks Not Raids transparency-rally post, September 4, 2019.",
      supportsGenerally: [
        "the account provided a public action pathway for the Talks Not Raids campaign",
        "the post connected event participation, issue explanation, coalition partners, and Council sponsors"
      ],
      doesNotEstablish: [
        "solo policy causality",
        "individual post authorship",
        "the complete campaign history"
      ]
    },
    {
      id: "SRC-SOCIAL-NYCAC-FAIR-RENT-HEARING-POST-2021",
      title: "NYC Artist Coalition Fair Rent NYC hearing recap post",
      organization: "NYC Artist Coalition",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2021-09-21",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/NYCArtC/status/1440383492315963392",
      preferredPublicUrl: "canonical",
      publicCitation:
        "NYC Artist Coalition Fair Rent NYC hearing recap post, September 21, 2021.",
      publicNote:
        "The hearing participation totals are contemporaneous campaign reporting and require Council-record corroboration before broader projection.",
      supportsGenerally: [
        "the account documented a seven-hour hearing and contrasting supporter/opponent testimony",
        "the account translated hearing participation into a concise public narrative"
      ],
      doesNotEstablish: [
        "independently audited hearing totals",
        "individual post authorship",
        "passage of the legislation"
      ]
    },
    {
      id: "SRC-SOCIAL-NYCAC-FAIR-RENT-POST-2024",
      title: "NYC Artist Coalition Fair Rent NYC accountability thread",
      organization: "NYC Artist Coalition",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2024-10-14",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/NYCArtC/status/1845643222011273429",
      preferredPublicUrl: "canonical",
      publicCitation:
        "NYC Artist Coalition Fair Rent NYC accountability thread, October 14, 2024.",
      supportsGenerally: [
        "the shared account continued to carry Fair Rent NYC advocacy in 2024",
        "the account addressed Council leadership and members through a persistent coalition identity"
      ],
      doesNotEstablish: [
        "individual post authorship",
        "Council agreement with the post",
        "policy passage"
      ]
    },
    {
      id: "SRC-SOCIAL-NYCAC-CONTINUITY-POST-2025",
      title: "NYC Artist Coalition venue-grant resource post",
      organization: "NYC Artist Coalition",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2025-08-24",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/NYCArtC/status/1959523347596808245",
      preferredPublicUrl: "canonical",
      publicCitation:
        "NYC Artist Coalition venue-grant resource post, August 24, 2025.",
      supportsGenerally: [
        "the account remained active more than eight years after its 2017 launch",
        "the identity continued to distribute practical opportunities to cultural spaces"
      ],
      doesNotEstablish: [
        "uninterrupted posting throughout every year",
        "individual post authorship",
        "the account's complete operating history"
      ]
    },
    {
      id: "SRC-SOCIAL-WOWLIST-MARCHES-POST-2016",
      title: "WOWList nationwide-marches post",
      organization: "WOWList",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-11-09",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/wowlist/status/796473557387575297",
      preferredPublicUrl: "canonical",
      publicCitation: "WOWList nationwide-marches post, November 9, 2016.",
      supportsGenerally: [
        "the historical @wowlist account distributed a nationwide event-discovery route",
        "the post framed the project as public coordination infrastructure for collective action"
      ],
      doesNotEstablish: [
        "a complete account history",
        "the number of events or cities represented",
        "individual post authorship",
        "audience reach or event attendance"
      ]
    },
    {
      id: "SRC-SOCIAL-WOWLIST-PARTICIPATION-POST-2016",
      title: "WOWList participation and updates post",
      organization: "WOWList",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2016-11-14",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/wowlist/status/798274424763981824",
      archiveUrl:
        "https://web.archive.org/web/20200626201704/https://twitter.com/wowlist/status/798274424763981824",
      preferredPublicUrl: "canonical",
      publicCitation: "WOWList participation and updates post, November 14, 2016.",
      supportsGenerally: [
        "the historical account invited people to add events and receive updates",
        "the project connected marches, meetings, and local connection through a shared public identity"
      ],
      doesNotEstablish: [
        "a complete account history",
        "the number of contributors, events, or cities",
        "individual post authorship",
        "audience reach or sustained adoption"
      ]
    },
    {
      id: "SRC-SOCIAL-NYCAC-CORPUS-RUN-2026",
      title: "NYC Artist Coalition social-post corpus research run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-12",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for a July 2026 Wayback CDX and X oEmbed review of the NYC Artist Coalition account.",
      publicNote:
        "The run recovered 286 distinct archived post URLs and readable oEmbed metadata for 279. Counts are corpus counts, not complete account totals.",
      protectedLocatorId: "RESEARCH-NYCAC-SOCIAL-CORPUS-2026-001",
      supportsGenerally: [
        "286 distinct @NYCArtC status URLs were recovered from the bounded Wayback index",
        "279 returned readable public oEmbed metadata",
        "the readable corpus spans March 2017 through February 2023",
        "keyword coding recovered substantial cross-campaign and public-process documentation"
      ],
      doesNotEstablish: [
        "a complete account export",
        "all deleted, reply, quote, or repost activity",
        "identity-level like or repost totals",
        "individual post authorship",
        "audience reach or policy causality"
      ]
    },
    {
      id: "SRC-SOCIAL-NYCAC-LINK-CENSUS-2026",
      title: "NYC Artist Coalition outbound-link census",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-12",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for a July 2026 resolution and classification of links in the recovered NYC Artist Coalition post corpus.",
      publicNote:
        "All 193 unique short links in the readable corpus resolved; 59 distinct non-campaign external resource destinations across 42 domains were identified for deeper reading.",
      protectedLocatorId: "RESEARCH-NYCAC-SOCIAL-LINKS-2026-001",
      supportsGenerally: [
        "193 unique short links were resolved",
        "the corpus connected campaigns to reporting, public records, grants, hearings, and practical resources",
        "59 distinct non-campaign external resource destinations across 42 domains were identified"
      ],
      doesNotEstablish: [
        "that every destination remains current",
        "that every linked article was earned media",
        "that Jamie selected or authored every link",
        "audience reach"
      ]
    },
    {
      id: "SRC-SOCIAL-CITY-LIMITS-CRS-COVID-2020",
      title: "City's Small Businesses Need Rent Stabilization to Survive COVID-19, Advocates Say",
      organization: "City Limits",
      author: "Bridget Bartolini",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-04-06",
      accessedAt: "2026-07-12",
      canonicalUrl:
        "https://citylimits.org/citys-small-businesses-need-rent-stabilization-to-survive-covid-19-advocates-say/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Bridget Bartolini, 'City's Small Businesses Need Rent Stabilization to Survive COVID-19, Advocates Say,' City Limits, April 6, 2020.",
      supportsGenerally: [
        "public reporting on Intro 1796 and the commercial-rent campaign context",
        "small-business rent pressure during the early COVID-19 shutdown"
      ],
      doesNotEstablish: [
        "Jamie as bill author",
        "NYC Artist Coalition as sole campaign owner",
        "passage of Intro 1796"
      ]
    },
    {
      id: "SRC-SOCIAL-BUZZFEED-MARCH-GENTRIFICATION-2020",
      title: "As Wealthy Residents Moved In, These Business Owners Found Themselves Raided By Police",
      organization: "BuzzFeed News",
      author: "Lam Thuy Vo",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-08-27",
      accessedAt: "2026-07-12",
      canonicalUrl:
        "https://www.buzzfeednews.com/article/lamvo/gentrification-noise-complaints-police",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Lam Thuy Vo, 'As Wealthy Residents Moved In, These Business Owners Found Themselves Raided By Police,' BuzzFeed News, August 27, 2020.",
      supportsGenerally: [
        "reported effects of MARCH raids on cultural spaces",
        "the relationship among gentrification, complaints, enforcement, and business precarity"
      ],
      doesNotEstablish: [
        "Talks Not Raids as sole cause of later reforms",
        "Jamie as sole campaign leader",
        "conditions at every MARCH target"
      ]
    },
    {
      id: "SRC-SOCIAL-GOTHAMIST-BOOK-CULTURE-2020",
      title: "UWS Book Culture Seized By City Marshal Over Unpaid Rent",
      organization: "Gothamist",
      author: "Ben Yakas",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-01-08",
      accessedAt: "2026-07-12",
      canonicalUrl:
        "https://gothamist.com/arts-entertainment/uws-book-culture-seized-city-marshal-over-unpaid-rent",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Ben Yakas, 'UWS Book Culture Seized By City Marshal Over Unpaid Rent,' Gothamist, January 8, 2020.",
      supportsGenerally: [
        "a concrete storefront rent-dispute example amplified by @NYCArtC",
        "the campaign account's use of reporting as public explanatory context"
      ],
      doesNotEstablish: [
        "that rent was the only business pressure",
        "policy causality",
        "Jamie as author of the social post"
      ]
    },
    {
      id: "SRC-SOCIAL-EATER-NEIRS-2020",
      title: "One of NYC's Oldest Bars Forced to Close After 190 Years in Queens",
      organization: "Eater NY",
      author: "Stefanie Tuder",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-01-09",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://ny.eater.com/2020/1/9/21058579/neirs-tavern-closed-nyc",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Stefanie Tuder, 'One of NYC's Oldest Bars Forced to Close After 190 Years in Queens,' Eater NY, January 9, 2020.",
      supportsGenerally: [
        "a concrete long-running neighborhood-business rent example amplified by @NYCArtC",
        "the campaign account's use of reporting to connect policy to recognizable places"
      ],
      doesNotEstablish: [
        "that rent was the only business pressure",
        "policy causality",
        "Jamie as author of the social post"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-NYCAC-PUBLIC-IDENTITY-SYSTEM",
      project: "nyc-artist-coalition",
      internalClaim:
        "Jamie established NYC Artist Coalition's public identity system, including its logo, campaign website family, and shared social account; collaborators sustained and used that collective identity over time.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Jamie established NYC Artist Coalition's public identity system across its logo, campaign website family, and shared social account; collaborators sustained and used that collective identity over time.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/social-archive-2026-07-12"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-SOCIAL-JAMIE-IDENTITY-CONFIRMATION-2026",
          relationship: "private-support",
          supports: ["Jamie's direct authorship and setup contribution"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-SOCIAL-NYCAC-ACCOUNT",
          relationship: "corroborating",
          supports: ["the surviving shared account identity"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-SOCIAL-NYCAC-CONTINUITY-POST-2025",
          relationship: "corroborating",
          supports: ["multi-year continuity of the identity"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Do not attribute every post to Jamie.",
        "Preserve collective ownership and collaborator authorship.",
        "Named collaborator authorship of particular posts requires direct confirmation."
      ],
      antiClaims: [
        "Jamie was the sole voice of NYC Artist Coalition",
        "Jamie authored every campaign post",
        "Jamie owned the coalition identity personally"
      ],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-NYCAC-SOCIAL-IDENTITY-CONTINUITY",
      project: "nyc-artist-coalition",
      internalClaim:
        "The @NYCArtC identity carried coalition convening, Cabaret Law repeal, Talks Not Raids, Fair Rent NYC, resource distribution, and public accountability work from 2017 through at least 2025.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The shared @NYCArtC identity carried coalition convening, campaign action, public accountability, and cultural-space resources from 2017 through at least 2025.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/social-archive-2026-07-12"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-SOCIAL-NYCAC-TOWN-HALL-POST-2017",
          relationship: "direct-support",
          supports: ["2017 coalition-convening use"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-SOCIAL-NYCAC-TALKS-NOT-RAIDS-POST-2019",
          relationship: "direct-support",
          supports: ["2019 campaign-action use"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-SOCIAL-NYCAC-FAIR-RENT-POST-2024",
          relationship: "direct-support",
          supports: ["2024 Fair Rent NYC use"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-SOCIAL-NYCAC-CONTINUITY-POST-2025",
          relationship: "direct-support",
          supports: ["2025 resource-distribution use"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "This is continuity of a shared project identity, not proof of one person's uninterrupted account operation.",
        "Do not infer individual authorship from the account name."
      ],
      antiClaims: [
        "Jamie wrote every @NYCArtC post",
        "the account was active every day or month from 2017 through 2025",
        "social posting alone caused campaign outcomes"
      ],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM",
      project: "public-project-identities",
      internalClaim:
        "The bounded recovered evidence directly documents public engagement by at least three distinct then-sitting New York City Council member accounts with CallNYC or NYC Artist Coalition: Helen Rosenthal, Mathieu Eugene, and Rafael Espinal.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Recovered public evidence documents direct engagement by at least three distinct then-sitting Council member accounts with CallNYC or NYC Artist Coalition: Helen Rosenthal, Mathieu Eugene, and Rafael Espinal.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/social-archive-2026-07-12"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-SOCIAL-CALLNYC-HELEN-ROSENTHAL-2016",
          relationship: "direct-support",
          supports: ["Helen Rosenthal directly promoted CallNYC"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-SOCIAL-CALLNYC-MATHIEU-EUGENE-2016",
          relationship: "direct-support",
          supports: ["Mathieu Eugene amplified a CallNYC recognition post"],
          publicNote: "Quoted-post context is preserved in the bounded profile capture.",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-SOCIAL-NYCAC-ESPINAL-NIGHTLIFE-2018",
          relationship: "direct-support",
          supports: ["Rafael Espinal publicly identified joint work with @NYCArtC"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Three is a recovered minimum, not a comprehensive total.",
        "Mentions by a project account are not counted as inbound engagement.",
        "Anonymous likes or repost counts are not attributed to Council members."
      ],
      antiClaims: [
        "Only three Council members engaged",
        "every Council member mentioned by a project account engaged",
        "the engagements constitute official Council endorsement"
      ],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-NYCAC-SOCIAL-PUBLIC-RECORD",
      project: "nyc-artist-coalition",
      internalClaim:
        "NYC Artist Coalition's social identity became part of the official CreateNYC public record and functioned as a source-linked public documentation layer across coalition campaigns.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "NYC Artist Coalition's social identity appears in the official CreateNYC Twitter-data appendix and functioned as a source-linked public documentation layer across coalition campaigns.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/social-archive-2026-07-12"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-SOCIAL-NYCAC-CREATENYC-TWITTER-DATA-2017",
          relationship: "direct-support",
          supports: ["official cultural-planning record", "institutional recognition"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-SOCIAL-NYCAC-LINK-CENSUS-2026",
          relationship: "direct-support",
          supports: ["source-linked documentation pattern"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The account corpus is incomplete and the link census measures destinations, not earned-media reach.",
        "Do not attribute every source selection or post to Jamie."
      ],
      antiClaims: [
        "every linked source was press coverage",
        "the account generated all linked reporting",
        "social activity proves policy causality"
      ],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-PROJECT-SOCIAL-ARCHIVE-2026",
      project: "public-project-identities",
      question:
        "What project social accounts, public-documentation patterns, source links, mission-relevant traction, and Council-member engagements can be reproducibly recovered?",
      methods: [
        "Checked live project sites for canonical social links and shared-account reuse.",
        "Inspected a July 11 rendered CallNYC profile capture and recovered public status URLs from PDF link annotations.",
        "Queried the Internet Archive CDX index for distinct @NYCArtC status URLs.",
        "Requested public X oEmbed metadata for 286 distinct archived status URLs; 279 returned readable post metadata.",
        "Queried Wayback CDX and public X oEmbed for the historical @wowlist account and recovered two readable November 2016 posts.",
        "Resolved all 193 unique short links in the readable @NYCArtC corpus and classified campaign, government, reporting, resource, and platform destinations.",
        "Reviewed the City of New York CreateNYC Twitter-data appendix and published reporting that reproduces Council-member posts."
      ],
      runAt: "2026-07-12",
      resultStatus: "partially-recovered",
      findings: [
        "CallNYC used @CallNYCapp; NYC Artist Coalition and four campaign sites shared @NYCArtC; historical WOWList posts used @wowlist.",
        "The @NYCArtC corpus recovered 286 distinct archived post URLs and readable metadata for 279, spanning March 2017 through February 2023.",
        "Keyword coding within the overlapping 279-post corpus identified 11 Let NYC Dance, 12 Talks Not Raids, 144 Fair Rent NYC, 34 Save NYC Spaces, 41 COVID/mutual-aid, and 70 public-process posts.",
        "All 193 unique short links resolved; 59 distinct non-campaign external resource destinations across 42 domains were identified for deeper reading.",
        "Public evidence documents a recovered minimum of three then-sitting Council member accounts directly engaging with CallNYC or NYC Artist Coalition.",
        "The CreateNYC appendix preserves NYC Cultural Affairs crediting @NYCArtC with gathering a large crowd for a DIY-spaces discussion.",
        "The shared @NYCArtC identity remained publicly active through at least August 2025.",
        "Two recovered @wowlist posts show the project distributing nationwide marches and inviting people to add events and receive updates about marches, meetings, and local connection."
      ],
      limitations: [
        "No official X account export or complete authenticated search corpus was available to this run.",
        "Wayback coverage is selective; oEmbed does not expose complete reply, quote, repost, like, or impression histories.",
        "Mentions are outbound address, not evidence that the mentioned account engaged.",
        "Keyword groups overlap and are descriptive coding, not mutually exclusive campaign totals.",
        "The account was collaborative; post-level authorship cannot be inferred from the account identity.",
        "The recovered Council count is a minimum and must not be presented as exhaustive."
      ],
      sourceIds: [
        "SRC-SOCIAL-CALLNYC-PROFILE-CAPTURE-2026",
        "SRC-SOCIAL-CALLNYC-HELEN-ROSENTHAL-2016",
        "SRC-SOCIAL-CALLNYC-MATHIEU-EUGENE-2016",
        "SRC-SOCIAL-NYCAC-CREATENYC-TWITTER-DATA-2017",
        "SRC-SOCIAL-NYCAC-ESPINAL-NIGHTLIFE-2018",
        "SRC-SOCIAL-NYCAC-CORPUS-RUN-2026",
        "SRC-SOCIAL-NYCAC-LINK-CENSUS-2026",
        "SRC-SOCIAL-NYCAC-CONTINUITY-POST-2025",
        "SRC-SOCIAL-WOWLIST-MARCHES-POST-2016",
        "SRC-SOCIAL-WOWLIST-PARTICIPATION-POST-2016"
      ],
      publicSummary:
        "A bounded social-archive pass recovered three canonical project identities, 279 readable @NYCArtC posts from 286 archived URLs, two readable historical @wowlist posts, 193 resolved source links, and a minimum of three direct Council-member account engagements while preserving the incomplete-coverage boundary.",
      protectedLocatorId: "RESEARCH-PROJECT-SOCIAL-ARCHIVE-2026-001"
    }
  ]
};
