import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const corpusIntakeId = "INT-2026-07-14-FB-WOWLIST-POSTS";
const managementMemoryIntakeId =
  "INT-2026-07-14-FB-WOWLIST-SOCIAL-MANAGEMENT-MEMORY";

const selectedPostIntakes = [
  {
    id: "INT-2026-07-14-FB-WOWLIST-NINE-CITIES",
    publicSafeDescription:
      "WOW List's October 2015 video post announcing community calendars in nine cities.",
    submittedUrl:
      "https://www.facebook.com/wowlist/videos/439926419547504/",
    dateHints: ["2015-10-05"],
    sourceIds: ["SRC-FB-WOWLIST-NINE-CITIES-2015"]
  },
  {
    id: "INT-2026-07-14-FB-WOWLIST-COMMUNITY-FIRST",
    publicSafeDescription:
      "WOW List's May 2016 post sharing a member's reflection on community-first design and making it easier to gather.",
    submittedUrl:
      "https://www.facebook.com/wowlist/posts/515811585292320",
    dateHints: ["2016-05-23"],
    sourceIds: ["SRC-FB-WOWLIST-COMMUNITY-FIRST-2016"]
  },
  {
    id: "INT-2026-07-14-FB-WOWLIST-CABARET-LAW",
    publicSafeDescription:
      "WOW List's July 2017 post routing its audience to NYC Artist Coalition's Cabaret Law repeal work.",
    submittedUrl:
      "https://www.facebook.com/wowlist/posts/702379893302154",
    dateHints: ["2017-07-03"],
    sourceIds: ["SRC-FB-WOWLIST-CABARET-LAW-2017"]
  },
  {
    id: "INT-2026-07-14-FB-WOWLIST-WOMENS-MARCH",
    publicSafeDescription:
      "WOW List post routing readers to a community calendar for the January 2017 Women's March.",
    submittedUrl:
      "https://www.facebook.com/wowlist/posts/616983925175085",
    dateHints: ["2017-01"],
    sourceIds: ["SRC-FB-WOWLIST-WOMENS-MARCH-2017"]
  },
  {
    id: "INT-2026-07-14-FB-WOWLIST-ART-HERO",
    publicSafeDescription:
      "WOW List photo post routing readers to an artist-to-artist DIY-space support email template.",
    submittedUrl:
      "https://www.facebook.com/photo/?fbid=604149446458533&set=a.158894413420666",
    dateHints: ["2016-12"],
    sourceIds: ["SRC-FB-WOWLIST-ART-HERO-2016"]
  },
  {
    id: "INT-2026-07-14-FB-WOWLIST-SAFER-SPACES",
    publicSafeDescription:
      "WOW List post routing readers to the safer spaces organizing resource after the Ghost Ship fire.",
    submittedUrl:
      "https://www.facebook.com/wowlist/posts/599384950268316",
    dateHints: ["2016-12"],
    sourceIds: ["SRC-FB-WOWLIST-SAFER-SPACES-2016"]
  }
];

const destinationIntakes = [
  {
    id: "INT-2026-07-14-WESTWORD-DENVER-DIY-FUND",
    publicSafeDescription:
      "Westword reporting linked from the WOW List Page about a Denver Arts & Venues and Meow Wolf fund for DIY spaces.",
    submittedUrl:
      "https://www.westword.com/arts-culture/city-partners-with-meow-wolf-on-20-000-denver-diy-spaces-fund-8782025/",
    dateHints: ["2017-03-09"],
    sourceIds: ["SRC-WESTWORD-DENVER-DIY-FUND-2017"]
  },
  {
    id: "INT-2026-07-14-WWEEK-THE-KNOW-CLOSING",
    publicSafeDescription:
      "Willamette Week reporting linked from the WOW List Page about the closure and prospective relocation of Portland venue The Know.",
    submittedUrl: "https://www.wweek.com/bars/2016/07/01/the-know-is-closing/",
    dateHints: ["2016-07-01"],
    sourceIds: ["SRC-WWEEK-THE-KNOW-CLOSING-2016"]
  },
  {
    id: "INT-2026-07-14-INDIEGOGO-ORANGE-COUNTY-DIY",
    publicSafeDescription:
      "Campaign destination linked from the WOW List Page for an all-ages, safer, sober, community-driven arts and music space in Orange County.",
    submittedUrl:
      "https://www.indiegogo.com/projects/get-orange-county-diy-a-permanent-home#/",
    dateHints: ["2016"],
    sourceIds: ["SRC-INDIEGOGO-ORANGE-COUNTY-DIY"]
  }
];

export const wowlistFacebookPostIntakes = [
  {
    id: corpusIntakeId,
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    publicSafeDescription:
      "A record-level census and close reading of all 54 unique posts currently recoverable from WOW List's public Facebook Page timeline, retained outside the repository.",
    projectIds: ["wowlist"],
    entityIds: [],
    dateHints: ["approximately 2015-04 through 2018-03"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: [
      "SRC-FB-WOWLIST-PROFILE-2026",
      "SRC-FB-WOWLIST-POST-CORPUS-2026",
      "SRC-FB-WOWLIST-CONTENT-LIBRARY-2026",
      "SRC-FB-WOWLIST-POSTED-URL-INVENTORY-2026"
    ],
    claimIds: [
      "CLM-FB-WOWLIST-POST-POPULATION-2026",
      "CLM-FB-WOWLIST-PUBLISHER-METADATA-2026",
      "CLM-FB-WOWLIST-COMMUNITY-ROUTING",
      "CLM-FB-WOWLIST-CULTURAL-CIVIC-ROUTING",
      "CLM-FB-WOWLIST-ENGAGEMENT-SNAPSHOT-2026",
      "CLM-FB-WOWLIST-POSTED-URL-ROUTING-2026"
    ],
    inquiryIds: ["INQ-FB-WOWLIST-POST-CORPUS-2026"],
    protectedLocatorId: "FB-WOWLIST-POST-CORPUS-2026-001"
  },
  {
    id: managementMemoryIntakeId,
    kind: "memory",
    capturedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    publicSafeDescription:
      "Jamie's memory that WOW List was his and Richard Album's project and that Jamie believes he managed all of its social presence.",
    projectIds: ["wowlist"],
    entityIds: [],
    dateHints: ["2014-2018"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-JAMIE-WOWLIST-SOCIAL-MANAGEMENT-MEMORY-2026"],
    claimIds: ["CLM-FB-WOWLIST-SOCIAL-MANAGEMENT-ROLE"],
    inquiryIds: ["INQ-FB-WOWLIST-SOCIAL-MANAGEMENT-ROLE-2026"],
    protectedLocatorId: "MEMORY-WOWLIST-SOCIAL-MANAGEMENT-2026-001"
  },
  ...selectedPostIntakes.map((item) => ({
    ...item,
    kind: "url" as const,
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    projectIds: ["wowlist"],
    entityIds: [],
    sensitivity: "public-safe" as const,
    availability: "live" as const,
    status: "promoted" as const,
    claimIds: [],
    inquiryIds: []
  })),
  ...destinationIntakes.map((item) => ({
    ...item,
    kind: "url" as const,
    capturedAt: "2026-07-14",
    submittedBy: "Codex source discovery from the authenticated WOW List post corpus",
    projectIds: ["wowlist"],
    entityIds: [],
    sensitivity: "public-safe" as const,
    availability: "live" as const,
    status: "promoted" as const,
    claimIds: [],
    inquiryIds: []
  }))
] satisfies IntakeItem[];

const selectedPostSources = [
  {
    id: "SRC-FB-WOWLIST-NINE-CITIES-2015",
    title: "WOW List members in nine cities introduce community calendars",
    canonicalUrl:
      "https://www.facebook.com/wowlist/videos/439926419547504/",
    publishedAt: "2015-10-05",
    intakeIds: ["INT-2026-07-14-FB-WOWLIST-NINE-CITIES"],
    publicNote:
      "WOW List's Page described members in nine cities introducing community calendars and linked a join route.",
    supportsGenerally: [
      "WOW List's attributed nine-city statement",
      "community-calendar and join framing",
      "a currently visible 13-like, 3-comment, 53-view platform snapshot"
    ],
    doesNotEstablish: [
      "independently verified city-level adoption",
      "historic reach or impact",
      "that current views measure the post's original audience"
    ]
  },
  {
    id: "SRC-FB-WOWLIST-COMMUNITY-FIRST-2016",
    title: "WOW List post sharing a member's community-first reflection",
    canonicalUrl:
      "https://www.facebook.com/wowlist/posts/515811585292320",
    publishedAt: "2016-05-23",
    intakeIds: ["INT-2026-07-14-FB-WOWLIST-COMMUNITY-FIRST"],
    publicNote:
      "The Page shared a member's attributed account of WOW List as community-first infrastructure designed to make gathering easier.",
    supportsGenerally: [
      "an attributed member reflection on community-first design",
      "a public members-hangout reference",
      "gathering and sharing as stated design intentions"
    ],
    doesNotEstablish: [
      "that every member held the same view",
      "literal absence of platform administration",
      "formal product-governance rules"
    ]
  },
  {
    id: "SRC-FB-WOWLIST-CABARET-LAW-2017",
    title: "WOW List post routing readers to Cabaret Law repeal advocacy",
    canonicalUrl:
      "https://www.facebook.com/wowlist/posts/702379893302154",
    publishedAt: "2017-07-03",
    intakeIds: ["INT-2026-07-14-FB-WOWLIST-CABARET-LAW"],
    publicNote:
      "The Page urged readers to contact the City Council about Introduction 1652 and shared NYC Artist Coalition's New Yorker coverage.",
    supportsGenerally: [
      "WOW List's public routing into Cabaret Law repeal advocacy",
      "a visible connection between WOW List and NYC Artist Coalition publishing"
    ],
    doesNotEstablish: [
      "that WOW List caused the law's repeal",
      "Jamie's sole authorship of the coalition campaign",
      "audience conversion or legislative impact"
    ]
  },
  {
    id: "SRC-FB-WOWLIST-WOMENS-MARCH-2017",
    title: "WOW List Women's March community-calendar post",
    canonicalUrl:
      "https://www.facebook.com/wowlist/posts/616983925175085",
    publishedAt: undefined,
    intakeIds: ["INT-2026-07-14-FB-WOWLIST-WOMENS-MARCH"],
    publicNote:
      "The Page routed readers to a WOW List calendar for Women's March events in Washington and other cities.",
    supportsGenerally: [
      "movement-event discovery through a WOW List calendar",
      "cross-city public-event routing"
    ],
    doesNotEstablish: [
      "attendance at any march",
      "official Women's March partnership",
      "historic calendar traffic"
    ]
  },
  {
    id: "SRC-FB-WOWLIST-ART-HERO-2016",
    title: "WOW List artist-to-artist DIY-space support post",
    canonicalUrl:
      "https://www.facebook.com/photo/?fbid=604149446458533&set=a.158894413420666",
    publishedAt: undefined,
    intakeIds: ["INT-2026-07-14-FB-WOWLIST-ART-HERO"],
    publicNote:
      "The Page routed readers to an email template asking well-known artists to support underground scenes after the Ghost Ship fire.",
    supportsGenerally: [
      "artist-to-artist support routing",
      "DIY-space safety and solidarity framing"
    ],
    doesNotEstablish: [
      "who used the template",
      "responses by any named artist",
      "outcomes caused by the post"
    ]
  },
  {
    id: "SRC-FB-WOWLIST-SAFER-SPACES-2016",
    title: "WOW List post routing readers to safer spaces",
    canonicalUrl:
      "https://www.facebook.com/wowlist/posts/599384950268316",
    publishedAt: undefined,
    intakeIds: ["INT-2026-07-14-FB-WOWLIST-SAFER-SPACES"],
    publicNote:
      "The Page linked a public resource framed as organizing with people responding to tragedy with care.",
    supportsGenerally: [
      "post-fire safety-resource routing",
      "care-centered cultural-space organizing context"
    ],
    doesNotEstablish: [
      "authorship of the linked resource",
      "adoption of the resource",
      "safety outcomes"
    ]
  }
];

export const wowlistFacebookPostSources = [
  {
    id: "SRC-FB-WOWLIST-PROFILE-2026",
    title: "WOW List public Facebook Page",
    organization: "WOW List",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/wowlist/",
    preferredPublicUrl: "canonical",
    publicCitation: "WOW List public Facebook Page, accessed July 14, 2026.",
    publicNote:
      "The current Page displayed 185 followers and described WOW List as an event-sharing and community-building project.",
    locator: "Page identity, About text, follower display, Featured area, and Posts timeline.",
    projectIds: ["wowlist"],
    intakeIds: [corpusIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "current Page identity",
      "current About text",
      "current follower display",
      "access to the currently recoverable public timeline"
    ],
    doesNotEstablish: [
      "historic follower counts",
      "deleted or unpublished posts",
      "sole account administration",
      "impact of the project"
    ]
  },
  {
    id: "SRC-FB-WOWLIST-POST-CORPUS-2026",
    title: "Authenticated WOW List Facebook public-post census",
    organization: "Codex archival production",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Authenticated archival review of WOW List's currently recoverable public Facebook posts, July 14, 2026.",
    publicNote:
      "Two terminal-scroll passes recovered the same 54 unique posts after removing two documented Facebook render artifacts from 56 post-like variants.",
    locator:
      "Authenticated Page-management view; post-level extraction from the virtualized public timeline; two exact terminal-scroll traversals; record-by-record close reading.",
    projectIds: ["wowlist"],
    intakeIds: [corpusIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "54-record current public-timeline reconciliation",
      "publisher-metadata accounting",
      "mission-theme and stakeholder-route classification",
      "current visible reaction snapshot"
    ],
    doesNotEstablish: [
      "posts deleted before capture",
      "unpublished Page drafts",
      "complete pre-migration Page history",
      "sole account administration",
      "independent verification of every linked claim"
    ],
    protectedLocatorId: "FB-WOWLIST-POST-CORPUS-2026-001"
  },
  {
    id: "SRC-FB-WOWLIST-CONTENT-LIBRARY-2026",
    title: "WOW List Meta Content Library lifetime control",
    organization: "Meta",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Authenticated Meta Content Library review for WOW List, July 14, 2026.",
    publicNote:
      "The lifetime Content Library displayed 5 records, all represented in the larger public-timeline corpus; older Featured posts demonstrate that the library is not a complete historical control.",
    locator:
      "Professional Dashboard > Content > Content Library, Lifetime date filter.",
    projectIds: ["wowlist"],
    intakeIds: [corpusIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "5 currently displayed lifetime Content Library rows",
      "current per-row administrative metrics for those five rows",
      "migration or product-surface incompleteness relative to the public timeline"
    ],
    doesNotEstablish: [
      "a five-post historical Page population",
      "complete historical engagement",
      "public reach or impact"
    ],
    protectedLocatorId: "FB-WOWLIST-CONTENT-LIBRARY-2026-001"
  },
  {
    id: "SRC-FB-WOWLIST-POSTED-URL-INVENTORY-2026",
    title: "WOW List Facebook posted-URL research inventory",
    organization: "Codex archival production",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Posted-URL inventory derived from the authenticated WOW List Facebook corpus, July 14, 2026.",
    publicNote:
      "Current post cards exposed 80 resolved URL occurrences across 71 distinct destinations, including 20 wowlist.org occurrences; additional cards preserved destination titles without a retrievable href.",
    locator:
      "Resolved post-card anchors after Facebook redirect decoding and tracking-parameter removal; raw record-level inventory remains private.",
    projectIds: ["wowlist"],
    intakeIds: [corpusIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "current URL-routing inventory",
      "source-discovery leads",
      "direct project-domain route count"
    ],
    doesNotEstablish: [
      "truth of linked content",
      "endorsement by linked organizations",
      "clicks, conversions, or outcomes",
      "URLs no longer exposed by current Facebook cards"
    ],
    protectedLocatorId: "FB-WOWLIST-POSTED-URL-INVENTORY-2026-001"
  },
  {
    id: "SRC-JAMIE-WOWLIST-SOCIAL-MANAGEMENT-MEMORY-2026",
    title: "Jamie Burkart first-person WOW List social-management recollection",
    organization: "Jamie Burkart",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Jamie Burkart first-person recollection recorded for archival research, July 14, 2026.",
    publicNote:
      "Jamie recalls that WOW List was his and Richard Album's project and believes he managed all of the project's social presence.",
    locator: "First-person research intake.",
    projectIds: ["wowlist"],
    intakeIds: [managementMemoryIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
    supportsGenerally: [
      "Jamie's attributed recollection of social-management responsibility",
      "the explicit joint-project boundary with Richard Album"
    ],
    doesNotEstablish: [
      "sole account administration",
      "authorship of every quoted or shared source",
      "Richard Album's or other collaborators' recollections"
    ],
    protectedLocatorId: "MEMORY-WOWLIST-SOCIAL-MANAGEMENT-2026-001"
  },
  ...selectedPostSources.map((source) => ({
    ...source,
    organization: "WOW List",
    kind: "institutional-social-post" as const,
    visibility: "public" as const,
    preservationStatus: "live" as const,
    accessedAt: "2026-07-14",
    preferredPublicUrl: "canonical" as const,
    publicCitation: `${source.title}${source.publishedAt ? `, ${source.publishedAt}` : ""}.`,
    locator:
      "Authenticated public Page timeline card and linked public post surface.",
    projectIds: ["wowlist"],
    reviewStatus: "reviewed" as const,
    reviewDepth: "close-reading" as const,
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  })),
  {
    id: "SRC-WESTWORD-DENVER-DIY-FUND-2017",
    title: "City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund",
    organization: "Denver Westword",
    author: "Patricia Calhoun",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-09",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.westword.com/arts-culture/city-partners-with-meow-wolf-on-20-000-denver-diy-spaces-fund-8782025/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Patricia Calhoun, 'City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund,' Denver Westword, March 9, 2017.",
    publicNote:
      "The article reports a Denver Arts & Venues and Meow Wolf funding partnership for DIY and alternative spaces.",
    locator: "Headline, publication date, opening report, and grant-program details.",
    projectIds: ["wowlist"],
    intakeIds: ["INT-2026-07-14-WESTWORD-DENVER-DIY-FUND"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex public-source review"],
    supportsGenerally: [
      "reported $20,000 Denver Arts & Venues contribution",
      "reported Meow Wolf partnership",
      "DIY-space safety and infrastructure context"
    ],
    doesNotEstablish: [
      "WOW List's role in creating the fund",
      "grant outcomes",
      "that sharing the article caused applications or policy change"
    ]
  },
  {
    id: "SRC-WWEEK-THE-KNOW-CLOSING-2016",
    title: "The Know Is Closing",
    organization: "Willamette Week",
    author: "Matthew Singer",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-07-01",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.wweek.com/bars/2016/07/01/the-know-is-closing/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Matthew Singer, 'The Know Is Closing,' Willamette Week, July 1, 2016.",
    publicNote:
      "The article reports the closure of the Portland venue after a rent increase and its intention to relocate.",
    locator: "Headline, publication date, venue history, rent account, and relocation statement.",
    projectIds: ["wowlist"],
    intakeIds: ["INT-2026-07-14-WWEEK-THE-KNOW-CLOSING"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex public-source review"],
    supportsGenerally: [
      "reported venue closure",
      "reported rent pressure",
      "reported intention to relocate"
    ],
    doesNotEstablish: [
      "WOW List's role in the venue",
      "the outcome of relocation",
      "that sharing the article caused public funding"
    ]
  },
  {
    id: "SRC-INDIEGOGO-ORANGE-COUNTY-DIY",
    title: "Get Orange County DIY a permanent home",
    organization: "Indiegogo",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.indiegogo.com/projects/get-orange-county-diy-a-permanent-home#/",
    preferredPublicUrl: "canonical",
    publicCitation: "'Get Orange County DIY a permanent home,' Indiegogo campaign page.",
    publicNote:
      "The current research pass recovered the campaign title and WOW List's posted framing; the destination body remains a metadata-level research lead.",
    locator: "Campaign title and destination metadata.",
    projectIds: ["wowlist"],
    intakeIds: ["INT-2026-07-14-INDIEGOGO-ORANGE-COUNTY-DIY"],
    reviewStatus: "reviewed",
    reviewDepth: "metadata",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex source-routing review"],
    supportsGenerally: ["existence of the linked campaign destination"],
    doesNotEstablish: [
      "campaign outcome",
      "current organizational status",
      "WOW List's role beyond routing readers to the campaign"
    ]
  }
] satisfies SourceRecord[];

export const wowlistFacebookPostClaims = [
  {
    id: "CLM-FB-WOWLIST-POST-POPULATION-2026",
    project: "wowlist",
    claimType: "metric",
    internalClaim:
      "Two exact terminal-scroll traversals recovered 54 unique public-timeline posts from the current WOW List Facebook Page after removing two documented render artifacts from 56 post-like variants.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-FB-WOWLIST-POST-CORPUS-2026",
        relationship: "private-support",
        supports: [
          "two exact terminal traversals",
          "56 extracted variants",
          "two render-artifact exclusions",
          "54 unique retained posts"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-WOWLIST-CONTENT-LIBRARY-2026",
        relationship: "supports-boundary",
        supports: ["five-row lifetime library control and its incompleteness"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Completeness is limited to posts currently recoverable from the authenticated public Page timeline on July 14, 2026.",
      "Deleted, unpublished, pre-migration-omitted, and otherwise unavailable records are outside the observable population.",
      "The five-row Meta Content Library is a current administrative surface, not the historical population control."
    ],
    antiClaims: [
      "WOW List published exactly 54 Facebook posts in its history.",
      "Meta's lifetime Content Library proves WOW List published only five posts."
    ],
    researchInquiryIds: ["INQ-FB-WOWLIST-POST-CORPUS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-WOWLIST-PUBLISHER-METADATA-2026",
    project: "wowlist",
    claimType: "role",
    internalClaim:
      "Facebook's admin-only publisher field names Jamie Burkart on all 54 unique posts in the currently recoverable WOW List Page timeline.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [
      {
        key: "archive-note",
        text: "Every currently recoverable WOW List Facebook post displays Jamie Burkart in Facebook's Page-manager publisher field.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-WOWLIST-POST-CORPUS-2026",
        relationship: "private-support",
        supports: ["54-of-54 publisher-metadata accounting"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Publisher metadata supports publishing activity, not sole Page administration or exclusive social-management control.",
      "Quoted, shared, and linked material retains its original authorship.",
      "WOW List was a joint project with Richard Album; this finding does not reduce collective project credit."
    ],
    antiClaims: [
      "Jamie alone created every item shared by WOW List.",
      "Jamie was the sole WOW List administrator.",
      "Richard Album did not contribute to WOW List."
    ],
    researchInquiryIds: ["INQ-FB-WOWLIST-SOCIAL-MANAGEMENT-ROLE-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-WOWLIST-SOCIAL-MANAGEMENT-ROLE",
    project: "wowlist",
    claimType: "role",
    internalClaim:
      "Jamie recalls managing WOW List's social presence; the complete currently recoverable Facebook post corpus independently shows Jamie in the publisher field on every retained post.",
    status: "use-with-care",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-JAMIE-WOWLIST-SOCIAL-MANAGEMENT-MEMORY-2026",
        relationship: "direct-support",
        supports: ["Jamie's attributed social-management recollection"],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-WOWLIST-POST-CORPUS-2026",
        relationship: "corroborating",
        supports: ["consistent publisher metadata across 54 recovered posts"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Preserve first-person attribution until account-administration records or collaborator confirmation establish the broader management claim.",
      "Publishing all recovered posts does not prove sole account access, sole strategy, or authorship of shared material.",
      "The project and its accomplishments remain jointly credited to Jamie and Richard Album."
    ],
    antiClaims: [
      "Jamie definitively and exclusively controlled every WOW List social account.",
      "The publisher field proves sole project ownership."
    ],
    researchInquiryIds: ["INQ-FB-WOWLIST-SOCIAL-MANAGEMENT-ROLE-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-FB-WOWLIST-COMMUNITY-ROUTING",
    project: "wowlist",
    claimType: "activity",
    internalClaim:
      "The recovered Facebook corpus documents WOW List as a public identity and routing system through which local organizers promoted joinable calendars, contributed events, and described the platform as an alternative to Facebook for finding in-person cultural activity.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-FB-WOWLIST-NINE-CITIES-2015",
        relationship: "direct-support",
        supports: ["attributed nine-city calendar statement", "join route"],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-WOWLIST-COMMUNITY-FIRST-2016",
        relationship: "direct-support",
        supports: ["attributed community-first design reflection"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-WOWLIST-POST-CORPUS-2026",
        relationship: "private-support",
        supports: [
          "local-calendar routes",
          "organizer adoption quotations",
          "community contribution patterns"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
        relationship: "corroborating",
        supports: [
          "Jamie's attributed nine-city statement",
          "join route",
          "nine city labels in the comment thread"
        ],
        locator: "Public post text, join link, and city-tag comments.",
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "Member and Page statements document use and intent; they do not independently establish site-wide adoption totals.",
      "Local organizers' quoted words remain attributed to them.",
      "The current corpus is a social-publishing record, not a complete product-analytics dataset."
    ],
    antiClaims: [
      "Facebook engagement proves adoption in every named city.",
      "Jamie authored every organizer quotation.",
      "WOW List replaced Facebook for all participating scenes."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-WOWLIST-CULTURAL-CIVIC-ROUTING",
    project: "wowlist",
    claimType: "activity",
    internalClaim:
      "WOW List's recovered Facebook record joined event discovery to cultural-infrastructure support, mutual-aid and safety resources, national movement calendars, and later NYC cultural-policy advocacy.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-FB-WOWLIST-CABARET-LAW-2017",
        relationship: "direct-support",
        supports: ["Cabaret Law campaign routing"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-WOWLIST-WOMENS-MARCH-2017",
        relationship: "direct-support",
        supports: ["movement-event calendar routing"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-WOWLIST-ART-HERO-2016",
        relationship: "direct-support",
        supports: ["artist-solidarity resource routing"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-WOWLIST-SAFER-SPACES-2016",
        relationship: "direct-support",
        supports: ["care-centered safety-resource routing"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-WOWLIST-POST-CORPUS-2026",
        relationship: "private-support",
        supports: ["cross-corpus cultural and civic routing pattern"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Routing or amplifying a campaign does not establish authorship, partnership, endorsement, attendance, or causality.",
      "Destination sources must be separately reviewed before their claims support public portfolio copy."
    ],
    antiClaims: [
      "WOW List created every linked fund, campaign, or safety resource.",
      "Facebook posts prove policy impact or event attendance."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-WOWLIST-ENGAGEMENT-SNAPSHOT-2026",
    project: "wowlist",
    claimType: "metric",
    internalClaim:
      "At capture, Facebook exposed 88 visible reactions across 39 of the 54 recovered posts; the nine-city video displayed 13 likes, 3 comments, and 53 views.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-FB-WOWLIST-POST-CORPUS-2026",
        relationship: "private-support",
        supports: ["current visible reaction census"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-WOWLIST-NINE-CITIES-2015",
        relationship: "direct-support",
        supports: ["current video reaction, comment, and view displays"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "These are mutable July 14, 2026 platform displays, not historic campaign reach.",
      "Reactions, comments, views, interested responses, and followers are different measures and are not attendance or impact.",
      "The 303 interested display on a shared event card is not a WOW List audience or attendance count."
    ],
    antiClaims: [
      "WOW List reached only 53 people.",
      "303 people attended a WOW List event.",
      "The current reaction sum measures the project's total impact."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-WOWLIST-POSTED-URL-ROUTING-2026",
    project: "wowlist",
    claimType: "activity",
    internalClaim:
      "Current post cards exposed 80 resolved URL occurrences across 71 distinct destinations, including 20 wowlist.org occurrences, plus additional title-only destination cards.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-FB-WOWLIST-POSTED-URL-INVENTORY-2026",
        relationship: "private-support",
        supports: [
          "resolved URL-occurrence count",
          "distinct destination count",
          "direct project-domain route count",
          "title-only source leads"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "A posted URL is a research route, not evidence that every destination claim is true.",
      "Facebook no longer exposes every historic destination href, so title-only cards remain source-discovery leads.",
      "Links to people or organizations do not establish endorsement or collaboration."
    ],
    antiClaims: [
      "Every linked organization endorsed WOW List.",
      "The link inventory proves clicks, conversions, or outcomes."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const wowlistFacebookPostResearchInquiries = [
  {
    id: "INQ-FB-WOWLIST-POST-CORPUS-2026",
    project: "wowlist",
    intakeIds: [corpusIntakeId],
    question:
      "What is the full population of WOW List Facebook posts currently recoverable through the authenticated public Page and administrative surfaces?",
    methods: [
      "Traversed the public Page timeline to its terminal scroll twice at different step sizes and compared exact post-level fingerprints.",
      "Separated individual publisher-header records from Facebook's virtualized containers and removed two documented duplicate render artifacts.",
      "Close-read all 54 retained posts and decoded currently exposed Facebook redirect destinations.",
      "Reconciled the timeline against the two Featured records and the five-row Lifetime Content Library display.",
      "Kept the record-level census outside the public repository under an opaque artifact ID."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "Both terminal-scroll passes produced the same 54 unique retained posts after two render-artifact exclusions from 56 post-like variants.",
      "Both Featured records occur within the reconciled timeline population.",
      "The five Lifetime Content Library rows are a subset of the timeline and do not recover the older Featured records.",
      "All 54 retained cards expose Jamie Burkart in Facebook's admin-only publisher field.",
      "Current cards exposed 80 resolved URL occurrences across 71 distinct destinations and preserved additional title-only source leads."
    ],
    limitations: [
      "This is 100% of the currently recoverable public timeline population, not an official Meta export of all posts ever created.",
      "Deleted, unpublished, pre-migration-omitted, and otherwise unavailable records cannot be counted from the current surfaces.",
      "Facebook obfuscates many timeline timestamps and no longer exposes every historic outbound href.",
      "Current engagement displays are mutable and do not measure attendance, reach at publication, or project impact."
    ],
    sourceIds: [
      "SRC-FB-WOWLIST-PROFILE-2026",
      "SRC-FB-WOWLIST-POST-CORPUS-2026",
      "SRC-FB-WOWLIST-CONTENT-LIBRARY-2026",
      "SRC-FB-WOWLIST-POSTED-URL-INVENTORY-2026"
    ],
    publicSummary:
      "Two exact terminal-scroll passes reconciled all 54 unique posts currently recoverable from the public WOW List Page timeline. The five-row Content Library is a migration-limited subset, and unavailable historical records remain outside the observable population.",
    protectedLocatorId: "FB-WOWLIST-POST-CORPUS-2026-001"
  },
  {
    id: "INQ-FB-WOWLIST-SOCIAL-MANAGEMENT-ROLE-2026",
    project: "wowlist",
    intakeIds: [managementMemoryIntakeId, corpusIntakeId],
    question:
      "Can Jamie's recollection that he managed all WOW List social presence be promoted beyond an attributed first-person role claim?",
    methods: [
      "Recorded Jamie's recollection with the joint-project boundary intact.",
      "Accounted for the admin-only publisher field across every currently recoverable Facebook post.",
      "Separated publishing metadata from account access, strategy, shared-source authorship, and project ownership."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "All 54 currently recoverable Facebook posts name Jamie Burkart in the publisher field.",
      "The corpus strongly corroborates sustained Page publishing by Jamie.",
      "No current record reviewed in this pass establishes exclusive administration across every WOW List social account."
    ],
    limitations: [
      "Publisher metadata is not a complete account-administration log.",
      "The current Facebook corpus does not establish who set strategy, held credentials, or managed other platforms.",
      "Collaborator confirmation or account-administration records would strengthen the broader management claim.",
      "WOW List remains jointly credited to Jamie Burkart and Richard Album."
    ],
    sourceIds: [
      "SRC-JAMIE-WOWLIST-SOCIAL-MANAGEMENT-MEMORY-2026",
      "SRC-FB-WOWLIST-POST-CORPUS-2026"
    ],
    publicSummary:
      "Jamie recalls managing WOW List's social presence, and every currently recoverable Facebook post names him in the Page publisher field. The broader exclusive-management claim remains attributed pending account or collaborator evidence.",
    protectedLocatorId: "MEMORY-WOWLIST-SOCIAL-MANAGEMENT-2026-001"
  }
] satisfies ResearchInquiry[];
