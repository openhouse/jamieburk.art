import type {
  ClaimRecord,
  IntakeItem,
  ProjectRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const corpusIntakeId = "INT-2026-07-14-FB-KCSPACES-POSTS";
const digitalOperationsIntakeId =
  "INT-2026-07-14-KCSPACES-DIGITAL-OPERATIONS-ARCHIVE";
const namingMemoryIntakeId =
  "INT-2026-07-14-KCSPACES-NAMING-MEMORY";
const nonPosterMemoryIntakeId =
  "INT-2026-07-14-KCSPACES-NON-POSTER-MEMORY";

export const kcSpacesFundProject = {
  id: "kc-spaces-fund",
  title: "KC Spaces Fund",
  summary:
    "A collaborator-led 2020 emergency mutual-aid campaign for grassroots Kansas City-area arts and culture spaces; surviving records support Jamie's public-web, campaign-theme, and fundraising-display work, while he separately recalls supporting selection of a uniformly available cross-platform name.",
  status: "historical",
  period: { start: "2020-04", end: "2020-07" },
  entityIds: [],
  publicSurfaceCandidates: ["/work/technical-operations"],
  photoResearchPrompts: [
    "Public campaign graphics, website captures, mutual-aid print artifacts, and grantee announcements that show the campaign's operational system while preserving organizer, artist, and grantee credit.",
    "Behind-the-scenes implementation records that document Jamie's web, theme, deployment, and fundraising-widget work without exposing credentials, donor data, applications, or private collaborator records."
  ]
} satisfies ProjectRecord;

const publicUrlIntakes = [
  {
    id: "INT-2026-07-14-FB-KCSPACES-PAGE",
    description:
      "KC Spaces Fund public Facebook Page and its currently recoverable 2020 post chronology.",
    url: "https://www.facebook.com/KCSpacesFund/",
    sourceIds: ["SRC-FB-KCSPACES-PROFILE-2026"]
  },
  {
    id: "INT-2026-07-14-KCSPACES-HOME",
    description:
      "KC Spaces Fund public campaign home page describing the emergency mutual-aid purpose and linking donation, application, join, contact, and social routes.",
    url: "https://kcspacesfund.com/",
    sourceIds: ["SRC-KCSPACES-SITE-2020"]
  },
  {
    id: "INT-2026-07-14-KCSPACES-APPLY",
    description:
      "KC Spaces Fund public application page describing eligibility, grants up to $500, priority communities, rolling timing, geography, fiscal sponsorship, and named organizers.",
    url: "https://kcspacesfund.com/apply/",
    sourceIds: ["SRC-KCSPACES-APPLY-2020"]
  },
  {
    id: "INT-2026-07-14-KCSPACES-GOFUNDME",
    description:
      "KC Spaces Fund public GoFundMe page preserving the campaign total, donation count, organizer, fiscal-sponsor relationship, and public campaign description.",
    url: "https://www.gofundme.com/f/kcspacesfund",
    sourceIds: ["SRC-KCSPACES-GOFUNDME-2020"]
  },
  {
    id: "INT-2026-07-14-KCSTAR-COVID-HELP",
    description:
      "Kansas City Star public-service article listing KC Spaces Fund among ways to support artists and artisans during the COVID-19 crisis.",
    url: "https://www.kansascity.com/news/coronavirus/article241807581.html",
    sourceIds: ["SRC-KCSTAR-COVID-HELP-2020"]
  },
  {
    id: "INT-2026-07-14-ODDITIES-MAPE-KAIJU",
    description:
      "Oddities Prints product page documenting one Mutual Aid Print Exchange artifact that directed part of its proceeds to KC Spaces Fund and KC Tenants.",
    url: "https://www.odditiesprints.com/odd-shop/frank-norton-kaiju",
    sourceIds: ["SRC-ODDITIES-MAPE-KAIJU-2020"]
  },
  {
    id: "INT-2026-07-14-FB-KCSPACES-BLACKBOX",
    description:
      "KC Spaces Fund public Blackbox on Troost funding announcement, retained as a bounded example of visible grantee and institutional response.",
    url: "https://www.facebook.com/photo/?fbid=136348721358895",
    sourceIds: ["SRC-FB-KCSPACES-BLACKBOX-2020"]
  }
];

export const kcSpacesFundFacebookPostIntakes = [
  {
    id: corpusIntakeId,
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    publicSafeDescription:
      "A record-level census and close reading of all 37 Page-level posts currently recoverable from the KC Spaces Fund public Facebook timeline, retained outside the repository.",
    projectIds: ["kc-spaces-fund"],
    entityIds: [],
    dateHints: ["2020-04-07 through 2020-07-09"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: [
      "SRC-FB-KCSPACES-PROFILE-2026",
      "SRC-FB-KCSPACES-POST-CORPUS-2026",
      "SRC-FB-KCSPACES-POSTED-URL-INVENTORY-2026"
    ],
    claimIds: [
      "CLM-FB-KCSPACES-POST-POPULATION-2026",
      "CLM-FB-KCSPACES-MUTUAL-AID-PRACTICE",
      "CLM-FB-KCSPACES-GRANTEE-ANNOUNCEMENTS",
      "CLM-FB-KCSPACES-ENGAGEMENT-SNAPSHOT-2026",
      "CLM-FB-KCSPACES-STAKEHOLDER-RESPONSE",
      "CLM-FB-KCSPACES-POSTED-URL-ROUTING-2026"
    ],
    inquiryIds: [
      "INQ-FB-KCSPACES-POST-CORPUS-2026",
      "INQ-FB-KCSPACES-POSTED-SOURCES-2026"
    ],
    protectedLocatorId: "FB-KCSPACES-POST-CORPUS-2026-001"
  },
  {
    id: digitalOperationsIntakeId,
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex archival review",
    publicSafeDescription:
      "Public-safe metadata from the surviving KC Spaces Fund site, campaign-theme, fundraising-widget, deployment, and launch-operation archive.",
    projectIds: ["kc-spaces-fund"],
    entityIds: [],
    dateHints: ["2020-04"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-KCSPACES-DIGITAL-OPERATIONS-ARCHIVE-2026"],
    claimIds: ["CLM-KCSPACES-DIGITAL-OPERATIONS-ROLE"],
    inquiryIds: ["INQ-KCSPACES-ROLE-AND-NAMING-2026"],
    protectedLocatorId: "KCSPACES-DIGITAL-OPERATIONS-ARCHIVE-2026-001"
  },
  {
    id: namingMemoryIntakeId,
    kind: "memory",
    capturedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    publicSafeDescription:
      "Jamie's memory that he supported selection of a project name available consistently across campaign domains and social platforms.",
    projectIds: ["kc-spaces-fund"],
    entityIds: [],
    dateHints: ["2020-04"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-JAMIE-KCSPACES-NAMING-MEMORY-2026"],
    claimIds: ["CLM-KCSPACES-NAMING-SUPPORT"],
    inquiryIds: ["INQ-KCSPACES-ROLE-AND-NAMING-2026"],
    protectedLocatorId: "MEMORY-KCSPACES-NAMING-2026-001"
  },
  {
    id: nonPosterMemoryIntakeId,
    kind: "memory",
    capturedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    publicSafeDescription:
      "Jamie's statement that he was not the stakeholder or owner posting through the KC Spaces Fund Facebook account.",
    projectIds: ["kc-spaces-fund"],
    entityIds: [],
    dateHints: ["2020-04 through 2020-07"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-JAMIE-KCSPACES-NON-POSTER-MEMORY-2026"],
    claimIds: ["CLM-KCSPACES-DIGITAL-OPERATIONS-ROLE"],
    inquiryIds: ["INQ-KCSPACES-ROLE-AND-NAMING-2026"],
    protectedLocatorId: "MEMORY-KCSPACES-NON-POSTER-2026-001"
  },
  ...publicUrlIntakes.map((item) => ({
    id: item.id,
    kind: "url" as const,
    capturedAt: "2026-07-14",
    submittedBy: "Codex source discovery and close reading",
    publicSafeDescription: item.description,
    submittedUrl: item.url,
    projectIds: ["kc-spaces-fund"],
    entityIds: [],
    dateHints: [],
    sensitivity: "public-safe" as const,
    availability: "live" as const,
    status: "promoted" as const,
    sourceIds: item.sourceIds,
    claimIds: [],
    inquiryIds: []
  })),
  {
    id: "INT-2026-07-14-KCSPACES-DO816-LEAD",
    kind: "lead",
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    publicSafeDescription:
      "Facebook card preserving the title 'The Daily DoGood: Kansas City'; the current card did not expose a stable destination URL.",
    projectIds: ["kc-spaces-fund"],
    entityIds: [],
    dateHints: ["2020"],
    sensitivity: "public-safe",
    availability: "unknown",
    status: "deferred",
    sourceIds: [],
    claimIds: [],
    inquiryIds: ["INQ-FB-KCSPACES-POSTED-SOURCES-2026"],
    dispositionReason:
      "Retain as a title-level source lead until a stable destination and article body are recovered and close-read."
  }
] satisfies IntakeItem[];

const reviewedPublicSource = {
  visibility: "public" as const,
  preservationStatus: "live" as const,
  accessedAt: "2026-07-14",
  preferredPublicUrl: "canonical" as const,
  projectIds: ["kc-spaces-fund"],
  reviewStatus: "reviewed" as const,
  reviewDepth: "close-reading" as const,
  reviewedAt: "2026-07-14",
  reviewedBy: ["Codex archival review"]
};

export const kcSpacesFundFacebookPostSources = [
  {
    id: "SRC-FB-KCSPACES-PROFILE-2026",
    title: "KC Spaces Fund public Facebook Page",
    organization: "KC Spaces Fund",
    kind: "institutional-social-post",
    ...reviewedPublicSource,
    canonicalUrl: "https://www.facebook.com/KCSpacesFund/",
    publicCitation:
      "KC Spaces Fund public Facebook Page, accessed July 14, 2026.",
    publicNote:
      "The current Page identifies the campaign as supporting grassroots arts and culture spaces during COVID-19 and displays 108 followers and one following.",
    locator:
      "Page identity, description, action links, current follower display, and 2020 Posts timeline.",
    intakeIds: [corpusIntakeId, "INT-2026-07-14-FB-KCSPACES-PAGE"],
    supportsGenerally: [
      "current Page identity and description",
      "access to the currently recoverable 2020 Page timeline",
      "mutable displays of 108 followers and one following"
    ],
    doesNotEstablish: [
      "a lifetime post population or deletion history",
      "human authorship of individual posts",
      "historic reach, endorsement, causality, or impact"
    ]
  },
  {
    id: "SRC-FB-KCSPACES-POST-CORPUS-2026",
    title: "Authenticated KC Spaces Fund Facebook public-post census",
    organization: "Codex archival production",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Authenticated archival review of KC Spaces Fund's currently recoverable public Facebook posts, July 14, 2026.",
    publicNote:
      "Two independently paced traversals reconciled the same 37 Page-level records across the April 7 through July 9, 2020, currently visible chronology.",
    locator:
      "Authenticated public Page timeline; two exact 37-record classification-set matches; 22 and 20 terminal no-addition controls; record-level date, message, attachment, grantee, route, and mutable-reaction disposition.",
    projectIds: ["kc-spaces-fund"],
    intakeIds: [corpusIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "37-record current public-timeline reconciliation",
      "33 text-bearing posts, four no-message attachment shells, and 20 photo-bearing posts",
      "12 named grantee or disbursement announcements",
      "dated current visible-reaction and stakeholder-response snapshots"
    ],
    doesNotEstablish: [
      "posts deleted before capture, unpublished records, or a lifetime historical population",
      "human publisher or author of any individual post",
      "unique people, reach, donation conversion, endorsement, causality, or impact"
    ],
    protectedLocatorId: "FB-KCSPACES-POST-CORPUS-2026-001"
  },
  {
    id: "SRC-FB-KCSPACES-POSTED-URL-INVENTORY-2026",
    title: "KC Spaces Fund Facebook posted-URL inventory",
    organization: "Codex archival production",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Public-safe URL inventory from KC Spaces Fund's currently recoverable Facebook Page posts, July 14, 2026.",
    publicNote:
      "The current rendered corpus exposed 11 unique normalized route strings across kcspacesfund.com, gofundme.com, odditiesprints.com, and twocc.us, plus one title-only Do816 lead.",
    locator:
      "Normalized current hrefs and expanded outer Page messages; tracking variants and duplicate anchor-plus-inline renderings collapsed.",
    projectIds: ["kc-spaces-fund"],
    intakeIds: [corpusIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "11 unique normalized route strings",
      "four destination domains",
      "donation, application, campaign-site, print, and grantee routes",
      "one title-only Do816 source lead"
    ],
    doesNotEstablish: [
      "truth of linked content before destination review",
      "authorship, readership, endorsement, clicks, donation conversion, partnership, or outcomes"
    ],
    protectedLocatorId: "FB-KCSPACES-POSTED-URL-INVENTORY-2026-001"
  },
  {
    id: "SRC-KCSPACES-DIGITAL-OPERATIONS-ARCHIVE-2026",
    title: "KC Spaces Fund digital-operations archive review",
    organization: "Codex archival production",
    kind: "project-archive",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Public-safe metadata from the surviving KC Spaces Fund digital-operations archive, reviewed July 14, 2026.",
    publicNote:
      "The reviewed archive connects Jamie to the Ghost campaign site, campaign-theme changes, GoFundMe widget, deployment work, and a launch checklist assignment for website-template changes.",
    locator:
      "Surviving site repository with 73 Jamie-authored commits, fundraising-widget repository with 10 Jamie-authored commits, 34 Jamie-authored campaign-theme commits, deployment configuration, and protected launch-operation records.",
    projectIds: ["kc-spaces-fund"],
    intakeIds: [digitalOperationsIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex archival review"],
    supportsGenerally: [
      "Jamie's behind-the-scenes site implementation and maintenance",
      "campaign-theme customization",
      "fundraising-display widget implementation",
      "deployment and web-affordance support"
    ],
    doesNotEstablish: [
      "public organizer status",
      "fundraising ownership, grant decisions, or fiscal sponsorship",
      "sole authorship of campaign strategy, copy, or public voice"
    ],
    protectedLocatorId: "KCSPACES-DIGITAL-OPERATIONS-ARCHIVE-2026-001"
  },
  {
    id: "SRC-JAMIE-KCSPACES-NAMING-MEMORY-2026",
    title: "Jamie's KC Spaces Fund naming-support recollection",
    author: "Jamie Burkart",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Jamie Burkart first-person recollection about KC Spaces Fund naming support, accessioned July 14, 2026.",
    publicNote:
      "Jamie remembers supporting selection of a project name that was available consistently across social accounts and domain names.",
    locator: "First-person submission with role and credit boundaries.",
    projectIds: ["kc-spaces-fund"],
    intakeIds: [namingMemoryIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
    supportsGenerally: ["Jamie's attributed naming-support recollection"],
    doesNotEstablish: [
      "that Jamie alone selected or approved the name",
      "the exact decision chronology or collaborator roles",
      "that current uniform public identifiers prove who made the naming decision"
    ],
    protectedLocatorId: "MEMORY-KCSPACES-NAMING-2026-001"
  },
  {
    id: "SRC-JAMIE-KCSPACES-NON-POSTER-MEMORY-2026",
    title: "Jamie's KC Spaces Fund non-poster role statement",
    author: "Jamie Burkart",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Jamie Burkart first-person statement about his KC Spaces Fund Facebook role, accessioned July 14, 2026.",
    publicNote:
      "Jamie states that he was not the stakeholder or owner posting through the KC Spaces Fund Facebook account.",
    locator: "First-person submission with role and authorship boundaries.",
    projectIds: ["kc-spaces-fund"],
    intakeIds: [nonPosterMemoryIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
    supportsGenerally: [
      "Jamie's attributed statement that his documented support role did not include owning or serving as the stakeholder posting through the Facebook account"
    ],
    doesNotEstablish: [
      "the identity of every human publisher",
      "the complete account-administration chronology",
      "that Jamie never advised on content, infrastructure, or identity"
    ],
    protectedLocatorId: "MEMORY-KCSPACES-NON-POSTER-2026-001"
  },
  {
    id: "SRC-KCSPACES-SITE-2020",
    title: "KC Spaces Fund campaign home page",
    organization: "KC Spaces Fund",
    kind: "institutional-web-page",
    ...reviewedPublicSource,
    canonicalUrl: "https://kcspacesfund.com/",
    publicCitation: "KC Spaces Fund campaign home page.",
    publicNote:
      "The public site describes support for grassroots arts and culture spaces during COVID-19 and exposes Donate, Join, Apply, Contact, and campaign-social routes.",
    locator: "Home-page description, primary actions, footer, and public social links.",
    intakeIds: ["INT-2026-07-14-KCSPACES-HOME"],
    supportsGenerally: [
      "campaign purpose",
      "public donation, application, join, and contact pathways",
      "uniform KCSpacesFund identity across the campaign domain and linked social accounts"
    ],
    doesNotEstablish: [
      "who selected the project name",
      "individual authorship of site copy",
      "fundraising conversion or campaign impact"
    ]
  },
  {
    id: "SRC-KCSPACES-APPLY-2020",
    title: "KC Spaces Fund application and eligibility page",
    organization: "KC Spaces Fund",
    kind: "institutional-web-page",
    ...reviewedPublicSource,
    canonicalUrl: "https://kcspacesfund.com/apply/",
    publicCitation: "KC Spaces Fund application and eligibility page.",
    publicNote:
      "The public page describes grants up to $500, priority communities, a rolling April-through-June process, Kansas City and Lawrence geography, Allied Media Projects as fiscal sponsor, and the campaign's named organizers.",
    locator: "Eligibility, priority, grant, timing, geography, fiscal-sponsor, and organizer sections.",
    intakeIds: ["INT-2026-07-14-KCSPACES-APPLY"],
    supportsGenerally: [
      "grants up to $500",
      "priority for BIPOC, LGBTQIA+, Disabled, and Immigrant communities",
      "rolling April-through-June process",
      "Lawrence expansion",
      "Allied Media Projects fiscal sponsorship",
      "public organizer credit to Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo"
    ],
    doesNotEstablish: [
      "Jamie's participation in grant decisions",
      "Jamie as a public organizer",
      "actual disbursement to every announced grantee"
    ]
  },
  {
    id: "SRC-KCSPACES-GOFUNDME-2020",
    title: "KC Spaces Fund GoFundMe campaign",
    organization: "KC Spaces Fund / Allied Media Projects Inc.",
    kind: "institutional-web-page",
    ...reviewedPublicSource,
    canonicalUrl: "https://www.gofundme.com/f/kcspacesfund",
    publicCitation: "KC Spaces Fund GoFundMe campaign.",
    publicNote:
      "The public campaign displays $9,590 raised against a $9,500 goal from 107 donations and identifies Kendell Harbin as organizer for Allied Media Projects Inc.",
    locator: "Campaign total, goal, donation count, organizer, beneficiary, and campaign description.",
    intakeIds: ["INT-2026-07-14-KCSPACES-GOFUNDME"],
    supportsGenerally: [
      "$9,590 raised against a $9,500 goal",
      "107 donations",
      "Kendell Harbin as organizer for Allied Media Projects Inc.",
      "April 7, 2020 campaign opening"
    ],
    doesNotEstablish: [
      "Jamie's ownership of the fundraiser",
      "unique donors or donation conversion from Facebook",
      "the complete disbursement ledger or grant-decision process"
    ]
  },
  {
    id: "SRC-KCSTAR-COVID-HELP-2020",
    title: "Money, blood, time: How to help KC during COVID-19 crisis",
    organization: "The Kansas City Star",
    kind: "published-article",
    ...reviewedPublicSource,
    publishedAt: "2020-04-10",
    canonicalUrl:
      "https://www.kansascity.com/news/coronavirus/article241807581.html",
    publicCitation:
      "The Kansas City Star, 'Money, blood, time: How to help KC during COVID-19 crisis,' April 10, 2020.",
    publicNote:
      "The public-service article lists KC Spaces Fund under support for artists and artisans.",
    locator: "Support artists and artisans section.",
    intakeIds: ["INT-2026-07-14-KCSTAR-COVID-HELP"],
    supportsGenerally: [
      "independent public listing of the campaign as a COVID-era support route for artists and artisans"
    ],
    doesNotEstablish: [
      "campaign effectiveness",
      "Jamie's role",
      "endorsement by every stakeholder named in the article"
    ]
  },
  {
    id: "SRC-ODDITIES-MAPE-KAIJU-2020",
    title: "Frank Norton: Kaiju Mutual Aid Print Exchange page",
    organization: "Oddities Prints",
    kind: "institutional-web-page",
    ...reviewedPublicSource,
    canonicalUrl: "https://www.odditiesprints.com/odd-shop/frank-norton-kaiju",
    publicCitation:
      "Oddities Prints, Frank Norton 'Kaiju' Mutual Aid Print Exchange page.",
    publicNote:
      "The product page identifies the print as part of the Mutual Aid Print Exchange and says proceeds partially benefited KC Spaces Fund and KC Tenants.",
    locator: "Product description and beneficiary statement.",
    intakeIds: ["INT-2026-07-14-ODDITIES-MAPE-KAIJU"],
    supportsGenerally: [
      "one documented mutual-aid print artifact",
      "stated partial benefit to KC Spaces Fund and KC Tenants"
    ],
    doesNotEstablish: [
      "the complete print-exchange catalog",
      "sales or proceeds totals",
      "Jamie as organizer or artist for the print exchange"
    ]
  },
  {
    id: "SRC-FB-KCSPACES-BLACKBOX-2020",
    title: "KC Spaces Fund Blackbox on Troost funding announcement",
    organization: "KC Spaces Fund",
    kind: "institutional-social-post",
    ...reviewedPublicSource,
    publishedAt: "2020-05-21",
    canonicalUrl: "https://www.facebook.com/photo/?fbid=136348721358895",
    publicCitation:
      "KC Spaces Fund Facebook post announcing support for Blackbox on Troost, May 21, 2020.",
    publicNote:
      "The current post displays 15 reactions and one visible thank-you comment from Blackbox on Troost; its reaction panel includes public organization accounts from the grantee, peer-space, cultural-institution, and organizer ecosystem.",
    locator: "Post message, current reaction panel, and visible comment thread.",
    intakeIds: ["INT-2026-07-14-FB-KCSPACES-BLACKBOX"],
    supportsGenerally: [
      "one named grantee announcement",
      "one direct public grantee response",
      "one bounded current stakeholder-response sample",
      "current display of 15 reactions"
    ],
    doesNotEstablish: [
      "campaign-wide stakeholder endorsement",
      "unique people or historic reach",
      "attendance, donation conversion, causality, or impact"
    ]
  }
] satisfies SourceRecord[];

const internalOnly = {
  publicationStatus: "internal-only" as const,
  editorialStatus: "candidate" as const,
  projections: []
};

export const kcSpacesFundFacebookPostClaims = [
  {
    id: "CLM-FB-KCSPACES-POST-POPULATION-2026",
    project: "kc-spaces-fund",
    claimType: "metric",
    internalClaim:
      "Two independently paced authenticated traversals reconciled the same 37 Page-level KC Spaces Fund Facebook records currently recoverable from April 7 through July 9, 2020.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [{
      sourceId: "SRC-FB-KCSPACES-POST-CORPUS-2026",
      relationship: "private-support",
      supports: ["two exact 37-record reconciliations", "current chronology boundaries"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Completeness is limited to the currently recoverable authenticated Page surface on July 14, 2026.",
      "Deleted, unpublished, pre-migration-omitted, and otherwise unavailable records are outside the observable population.",
      "This is not a native Meta export or deletion history."
    ],
    antiClaims: [
      "KC Spaces Fund published exactly 37 Facebook posts in its history.",
      "No historical Facebook post is missing."
    ],
    researchInquiryIds: ["INQ-FB-KCSPACES-POST-CORPUS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-KCSPACES-MUTUAL-AID-PRACTICE",
    project: "kc-spaces-fund",
    claimType: "activity",
    internalClaim:
      "The recovered Page documents a collective mutual-aid operating practice that repeatedly routed people among donation, application, priority-community, grantee, regional-expansion, and artist-print pathways.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [
      {
        sourceId: "SRC-FB-KCSPACES-POST-CORPUS-2026",
        relationship: "private-support",
        supports: ["repeated mission and action-routing pattern"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-KCSPACES-APPLY-2020",
        relationship: "corroborating",
        supports: ["eligibility, priority, timing, geography, and organizer context"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-ODDITIES-MAPE-KAIJU-2020",
        relationship: "corroborating",
        supports: ["one mutual-aid print pathway"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is a campaign-level collective practice, not an assignment of Page authorship, organizing ownership, grant decisions, or public voice to Jamie.",
      "Routing documents public infrastructure and intent, not readership, donations, conversion, partnership, or impact."
    ],
    antiClaims: [
      "Jamie authored the KC Spaces Fund Facebook campaign.",
      "The Facebook record by itself proves the campaign's social impact."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-KCSPACES-GRANTEE-ANNOUNCEMENTS",
    project: "kc-spaces-fund",
    claimType: "metric",
    internalClaim:
      "The current Facebook corpus contains 12 named grantee or disbursement announcements from April 18 through July 9, 2020.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [{
      sourceId: "SRC-FB-KCSPACES-POST-CORPUS-2026",
      relationship: "private-support",
      supports: ["12-record named announcement inventory", "announcement chronology"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "A public announcement is not a complete grant ledger or proof of every underlying payment event.",
      "The count does not identify Jamie as a grant decision-maker or campaign organizer."
    ],
    antiClaims: [
      "Jamie selected or paid the 12 announced grantees.",
      "The Facebook announcements are a complete financial record."
    ],
    researchInquiryIds: ["INQ-FB-KCSPACES-POST-CORPUS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-KCSPACES-ENGAGEMENT-SNAPSHOT-2026",
    project: "kc-spaces-fund",
    claimType: "metric",
    internalClaim:
      "On July 14, 2026, 28 of the 37 currently recoverable Page-level records displayed reactions; the mutable counters summed to 117 reactions, comprising 78 Likes and 39 Loves.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [{
      sourceId: "SRC-FB-KCSPACES-POST-CORPUS-2026",
      relationship: "private-support",
      supports: ["dated aggregate current reaction snapshot"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "These are mutable current interface observations, not publication-time analytics.",
      "They are not unique people, reach, donor conversion, endorsement, causality, or impact."
    ],
    antiClaims: [
      "KC Spaces Fund reached 117 people through Facebook.",
      "The reactions prove campaign or stakeholder impact."
    ],
    researchInquiryIds: ["INQ-FB-KCSPACES-POST-CORPUS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-KCSPACES-STAKEHOLDER-RESPONSE",
    project: "kc-spaces-fund",
    claimType: "activity",
    internalClaim:
      "The May 21 Blackbox on Troost announcement currently preserves one direct public grantee thank-you comment and reactions from public accounts in the grantee, organizer, peer-space, and cultural-institution ecosystem.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [{
      sourceId: "SRC-FB-KCSPACES-BLACKBOX-2020",
      relationship: "direct-support",
      supports: ["one visible grantee comment", "one bounded stakeholder-response sample"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "This finding is limited to one currently visible post and its current public response surface.",
      "Reaction-panel presence does not establish campaign-wide endorsement, formal partnership, attendance, donation, or impact."
    ],
    antiClaims: [
      "Key Kansas City institutions endorsed the whole campaign.",
      "One post's reaction panel proves campaign-wide stakeholder engagement."
    ],
    researchInquiryIds: ["INQ-FB-KCSPACES-POST-CORPUS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-KCSPACES-POSTED-URL-ROUTING-2026",
    project: "kc-spaces-fund",
    claimType: "metric",
    internalClaim:
      "The current rendered corpus exposed 11 unique normalized route strings across 4 domains, covering campaign, donation, application, mutual-aid-print, and grantee routes, plus one title-only Do816 lead.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [{
      sourceId: "SRC-FB-KCSPACES-POSTED-URL-INVENTORY-2026",
      relationship: "private-support",
      supports: ["11 unique route strings", "four domains", "route categories"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Posted routes are source-discovery and action-routing leads until their destinations are independently reviewed.",
      "A posted URL does not establish authorship, truth, readership, endorsement, clicks, donation conversion, partnership, or outcomes."
    ],
    antiClaims: [
      "Every linked source is true because KC Spaces Fund posted it.",
      "Every linked organization endorsed or partnered with KC Spaces Fund."
    ],
    researchInquiryIds: ["INQ-FB-KCSPACES-POSTED-SOURCES-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-KCSPACES-FUNDRAISING-OUTCOME",
    project: "kc-spaces-fund",
    claimType: "outcome",
    internalClaim:
      "The public GoFundMe displays $9,590 raised against a $9,500 goal from 107 donations and identifies Kendell Harbin as organizer for Allied Media Projects Inc.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [{
      sourceId: "SRC-KCSPACES-GOFUNDME-2020",
      relationship: "direct-support",
      supports: ["campaign total", "goal", "donation count", "organizer and fiscal-sponsor framing"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Preserve GoFundMe's organizer and beneficiary framing.",
      "Do not attribute fundraising ownership, donor conversion, grant decisions, or fiscal sponsorship to Jamie."
    ],
    antiClaims: [
      "Jamie raised $9,590 for KC Spaces Fund.",
      "Facebook activity caused 107 donations."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex archival review"]
  },
  {
    id: "CLM-KCSPACES-DIGITAL-OPERATIONS-ROLE",
    project: "kc-spaces-fund",
    claimType: "role",
    internalClaim:
      "Jamie supported KC Spaces Fund as behind-the-scenes digital infrastructure by implementing and maintaining the Ghost campaign site, campaign-theme changes, fundraising-display widget, deployment configuration, and web action affordances.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [
      {
        sourceId: "SRC-KCSPACES-DIGITAL-OPERATIONS-ARCHIVE-2026",
        relationship: "private-support",
        supports: ["site, theme, widget, deployment, and launch-operation work"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-KCSPACES-SITE-2020",
        relationship: "corroborating",
        supports: ["surviving public campaign site and action architecture"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-JAMIE-KCSPACES-NON-POSTER-MEMORY-2026",
        relationship: "supports-boundary",
        supports: ["Jamie's attributed non-poster and non-owner role statement"],
        confidence: "limited",
        renderCitation: false
      }
    ],
    boundaries: [
      "Public organizer credit remains with Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo as named by the campaign.",
      "The evidence supports technical and operational contribution, not ownership of the fundraiser, campaign voice, strategy, grant decisions, or fiscal sponsorship."
    ],
    antiClaims: [
      "Jamie organized KC Spaces Fund.",
      "Jamie ran the fundraiser or made grant decisions.",
      "Jamie authored the campaign's Facebook posts."
    ],
    researchInquiryIds: ["INQ-KCSPACES-ROLE-AND-NAMING-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-KCSPACES-NAMING-SUPPORT",
    project: "kc-spaces-fund",
    claimType: "role",
    internalClaim:
      "Jamie recalls supporting selection of the KC Spaces Fund name so it was available consistently across social platforms and domain names; the current public site corroborates the uniform identity outcome, not the decision-maker or decision process.",
    status: "use-with-care",
    ...internalOnly,
    evidence: [
      {
        sourceId: "SRC-JAMIE-KCSPACES-NAMING-MEMORY-2026",
        relationship: "private-support",
        supports: ["Jamie's attributed naming-support recollection"],
        confidence: "limited",
        renderCitation: false
      },
      {
        sourceId: "SRC-KCSPACES-SITE-2020",
        relationship: "corroborating",
        supports: ["uniform KCSpacesFund public identity outcome"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Preserve first-person attribution until a collaborator proof note or contemporaneous naming record establishes the decision chronology.",
      "Uniform public identifiers do not prove who proposed, selected, approved, registered, or administered the name."
    ],
    antiClaims: [
      "Jamie alone named KC Spaces Fund.",
      "Cross-platform availability proves Jamie made the naming decision."
    ],
    researchInquiryIds: ["INQ-KCSPACES-ROLE-AND-NAMING-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies ClaimRecord[];

export const kcSpacesFundFacebookPostResearchInquiries = [
  {
    id: "INQ-FB-KCSPACES-POST-CORPUS-2026",
    project: "kc-spaces-fund",
    intakeIds: [corpusIntakeId],
    question:
      "What is the complete current recoverable KC Spaces Fund Facebook Page-post population, and what can its chronology, mission patterns, grantee announcements, routes, and mutable reactions safely establish?",
    methods: [
      "Filtered the authenticated public Page to its 2020 chronology and ran two traversals with distinct scroll cadences.",
      "Selected Page-level records whose profile identity began with KC Spaces Fund, including location-qualified Page posts, while excluding nested shared-story cards from the denominator.",
      "Reconciled exact date, message or attachment class, and photo identifiers where exposed across both passes.",
      "Close-read all 37 retained records and separated current visible reactions, one bounded stakeholder-response sample, posted routes, Page voice, and Jamie's role evidence."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "Both traversals reconciled the same 37 Page-level records after 22 and 20 terminal no-addition controls.",
      "The currently recoverable chronology runs from April 7 through July 9, 2020, and includes 33 text-bearing posts, four no-message attachment shells, and 20 photo-bearing posts.",
      "The corpus contains 12 named grantee or disbursement announcements and repeated donation, application, priority-community, regional-expansion, and mutual-aid-print routes.",
      "Twenty-eight posts currently display 117 reactions: 78 Likes and 39 Loves."
    ],
    limitations: [
      "This is 100 percent coverage of the currently recoverable July 2026 Page surface, not a native export, deletion history, or lifetime total.",
      "Page identity does not establish the human author or publisher of an individual post.",
      "Current reactions are mutable interface observations, not unique people, historic reach, donor conversion, endorsement, causality, or impact."
    ],
    sourceIds: [
      "SRC-FB-KCSPACES-PROFILE-2026",
      "SRC-FB-KCSPACES-POST-CORPUS-2026",
      "SRC-FB-KCSPACES-POSTED-URL-INVENTORY-2026",
      "SRC-FB-KCSPACES-BLACKBOX-2020"
    ],
    publicSummary:
      "Two independently paced traversals reconciled all 37 Page-level posts currently recoverable from KC Spaces Fund's July 2026 Facebook surface; deleted, unpublished, and otherwise unavailable records remain outside the observable population.",
    protectedLocatorId: "FB-KCSPACES-POST-CORPUS-2026-001"
  },
  {
    id: "INQ-FB-KCSPACES-POSTED-SOURCES-2026",
    project: "kc-spaces-fund",
    intakeIds: [corpusIntakeId, "INT-2026-07-14-KCSPACES-DO816-LEAD"],
    question:
      "Which destinations posted by KC Spaces Fund can be recovered, close-read, and promoted from route leads into independent knowledge-bank sources?",
    methods: [
      "Normalized currently exposed hrefs and expanded message URLs, collapsing tracking and duplicate anchor-plus-inline renderings.",
      "Close-read the campaign site, application page, GoFundMe, Kansas City Star article, and one representative Oddities Prints page.",
      "Retained the current Do816 card at title-only lead status because a stable destination was not exposed."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The current corpus exposed 11 unique normalized route strings across four domains.",
      "The campaign site, application page, fundraiser, independent public-service article, and one mutual-aid-print artifact are now close-read source records.",
      "The Do816 title 'The Daily DoGood: Kansas City' remains an unresolved destination lead."
    ],
    limitations: [
      "A posted URL is not automatic corroboration of its propositions.",
      "No route establishes authorship, readership, endorsement, clicks, donation conversion, partnership, or outcomes without additional evidence.",
      "Some embedded cards no longer expose their original destination URL."
    ],
    sourceIds: [
      "SRC-FB-KCSPACES-POSTED-URL-INVENTORY-2026",
      "SRC-KCSPACES-SITE-2020",
      "SRC-KCSPACES-APPLY-2020",
      "SRC-KCSPACES-GOFUNDME-2020",
      "SRC-KCSTAR-COVID-HELP-2020",
      "SRC-ODDITIES-MAPE-KAIJU-2020"
    ],
    publicSummary:
      "The current Page exposed 11 unique route strings; selected campaign, fundraising, press, and print destinations were close-read while one Do816 card remains a title-only lead.",
    protectedLocatorId: "FB-KCSPACES-POSTED-SOURCES-2026-001"
  },
  {
    id: "INQ-KCSPACES-ROLE-AND-NAMING-2026",
    project: "kc-spaces-fund",
    intakeIds: [digitalOperationsIntakeId, namingMemoryIntakeId, nonPosterMemoryIntakeId],
    question:
      "What surviving implementation records and collaborator proof notes can establish Jamie's KC Spaces Fund digital-operations and naming contributions while preserving organizer and public-voice credit?",
    methods: [
      "Reviewed surviving site, campaign-theme, fundraising-widget, deployment, launch-checklist, and public identity records.",
      "Accessioned Jamie's first-person naming-support recollection separately from the implementation archive and public campaign surfaces.",
      "Accessioned Jamie's first-person statement that he was not the stakeholder or owner posting through the Facebook account."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The implementation archive strongly supports Jamie's behind-the-scenes site, theme, widget, deployment, and web-affordance work.",
      "Jamie states that he was not the stakeholder or owner posting through the Facebook account; this remains first-person role evidence, not a native publisher ledger.",
      "The current campaign site shows a uniform KCSpacesFund identity across the public domain and linked social accounts.",
      "Jamie's naming contribution remains an attributed recollection because uniform identifiers do not identify the decision-maker or complete decision process."
    ],
    limitations: [
      "The reviewed records do not make Jamie a public organizer, fundraiser owner, grant decision-maker, fiscal sponsor, or author of the campaign's Facebook voice.",
      "A collaborator proof note or contemporaneous naming record is still needed to establish the naming chronology and division of labor.",
      "Private applicant, donor, subscriber, payment, credential, billing, email, message, and Drive records remain protected."
    ],
    sourceIds: [
      "SRC-KCSPACES-DIGITAL-OPERATIONS-ARCHIVE-2026",
      "SRC-JAMIE-KCSPACES-NAMING-MEMORY-2026",
      "SRC-JAMIE-KCSPACES-NON-POSTER-MEMORY-2026",
      "SRC-KCSPACES-SITE-2020",
      "SRC-KCSPACES-APPLY-2020"
    ],
    publicSummary:
      "The surviving implementation archive supports Jamie's behind-the-scenes digital-operations role; his naming contribution remains an attributed memory pending collaborator or contemporaneous decision records.",
    protectedLocatorId: "KCSPACES-ROLE-AND-NAMING-2026-001"
  }
] satisfies ResearchInquiry[];
