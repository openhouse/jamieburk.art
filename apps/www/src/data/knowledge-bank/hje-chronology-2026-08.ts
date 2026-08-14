const reviewedAt = "2026-08-14";
const reviewedBy = ["Jamie Burkart", "Codex public-record and Archive.org review"];

export const hjeChronologyAugust2026 = {
  intakeItems: [
    {
      id: "INTAKE-THICK-ARTS-NYS-DOS-2026",
      kind: "public-url",
      title: "Thick Arts LLC New York Department of State formation record",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex public-record review",
      projectIds: ["harry-j-epstein", "thick-arts"],
      reason: "Verify when Jamie formalized his practice as Thick Arts LLC without using the filing record to overstate what it says about clients or contracts.",
      sourceUrl: "https://data.ny.gov/resource/n9v6-gdp6.json?$select=dos_id%2Ccurrent_entity_name%2Cinitial_dos_filing_date%2Ccounty%2Cjurisdiction%2Centity_type&$where=current_entity_name%3D%27THICK%20ARTS%20LLC%27",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-THICK-ARTS-NYS-DOS-2012-07-06"],
      observationIds: ["OBS-THICK-ARTS-FORMATION-2012-07-06"],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      boundaries: [
        "The state record establishes the LLC's filing date, entity type, jurisdiction, county, and DOS ID.",
        "It does not identify the LLC's members, clients, contracts, invoices, or first engagement."
      ]
    },
    {
      id: "INTAKE-HJE-WAYBACK-STOREFRONT-2026",
      kind: "public-url",
      title: "Harry J. Epstein Company storefront Wayback chronology",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex public-web review",
      projectIds: ["harry-j-epstein"],
      reason: "Bound the observable operating life and 2015 transition of store.harryepstein.com without converting web captures into contract evidence.",
      sourceUrl: "https://web.archive.org/web/20150703004948/http://store.harryepstein.com/",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-HJE-WAYBACK-STOREFRONT-2010-01-01",
        "SRC-HJE-WAYBACK-STOREFRONT-2015-07-03",
        "SRC-HJE-WAYBACK-STOREFRONT-REDIRECT-2015-08-01"
      ],
      observationIds: [
        "OBS-HJE-STOREFRONT-ACTIVE-2010",
        "OBS-HJE-STOREFRONT-ACTIVE-2015",
        "OBS-HJE-STOREFRONT-REDIRECT-2015"
      ],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      boundaries: [
        "Wayback captures establish observation dates, not the exact launch date or continuous availability.",
        "A storefront capture does not independently establish a client, contract, payment, or maintenance relationship.",
        "The successor website is business context, not evidence of Jamie's current stewardship."
      ]
    },
    {
      id: "INTAKE-HJE-FIRST-CLIENT-ACCOUNT-2026",
      kind: "memory-lead",
      title: "Harry J. Epstein Company as Thick Arts LLC's first client",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["harry-j-epstein", "thick-arts"],
      reason: "Preserve Jamie's authorized first-party statement that the 2009-2015 Harry J. Epstein engagement preceded and then became the first client relationship of Thick Arts LLC after its 2012 formation.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: ["SRC-HJE-FIRST-CLIENT-ACCOUNT-2026"],
      observationIds: ["OBS-HJE-FIRST-THICK-ARTS-CLIENT"],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      boundaries: [
        "Identify the first-client relationship as Jamie's first-party professional account rather than independent corroboration.",
        "Keep the 2009 relationship start distinct from the LLC's July 6, 2012 formation.",
        "Do not convert Jamie's client relationship into sole credit for the Sackin family's business, product knowledge, staff labor, customer relationships, or later maintenance."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-THICK-ARTS-FORMATION-2012-07-06",
      intakeId: "INTAKE-THICK-ARTS-NYS-DOS-2026",
      sourceId: "SRC-THICK-ARTS-NYS-DOS-2012-07-06",
      project: "thick-arts",
      kind: "source-fact",
      text: "The New York Department of State records Thick Arts LLC, DOS ID 4267566, as a domestic limited liability company filed on July 6, 2012 in Kings County, New York.",
      locator: "NY Open Data dataset n9v6-gdp6; entity-name query for THICK ARTS LLC.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-HJE-THICK-ARTS-FORMALIZATION-2009-2015"],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      limitations: [
        "The public record does not name the LLC's members or clients.",
        "The filing date is not the start date of Jamie's earlier Harry J. Epstein engagement."
      ]
    },
    {
      id: "OBS-HJE-STOREFRONT-ACTIVE-2010",
      intakeId: "INTAKE-HJE-WAYBACK-STOREFRONT-2026",
      sourceId: "SRC-HJE-WAYBACK-STOREFRONT-2010-01-01",
      project: "harry-j-epstein",
      kind: "source-fact",
      text: "Archive.org observed store.harryepstein.com on January 1, 2010 redirecting into its merchant2 commerce application; a directly captured storefront homepage followed on March 3, 2010.",
      locator: "Wayback captures 20100101090939 and 20100303123533.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-HJE-THICK-ARTS-FORMALIZATION-2009-2015"],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      limitations: [
        "The first capture is an observation bound, not proof of the exact storefront launch date.",
        "The capture does not establish who held the client relationship or every implementation responsibility."
      ]
    },
    {
      id: "OBS-HJE-STOREFRONT-ACTIVE-2015",
      intakeId: "INTAKE-HJE-WAYBACK-STOREFRONT-2026",
      sourceId: "SRC-HJE-WAYBACK-STOREFRONT-2015-07-03",
      project: "harry-j-epstein",
      kind: "source-fact",
      text: "A July 3, 2015 Archive.org capture preserves a functioning Harry J. Epstein storefront homepage with catalog navigation, search, products, prices, account and checkout routes, and current 2015 publishing.",
      locator: "Wayback capture 20150703004948.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-HJE-THICK-ARTS-FORMALIZATION-2009-2015"],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      limitations: [
        "The capture establishes an observable customer-facing system, not every checkout dependency or private operating system.",
        "The capture does not independently identify Jamie or Thick Arts as maintainer on that date."
      ]
    },
    {
      id: "OBS-HJE-STOREFRONT-REDIRECT-2015",
      intakeId: "INTAKE-HJE-WAYBACK-STOREFRONT-2026",
      sourceId: "SRC-HJE-WAYBACK-STOREFRONT-REDIRECT-2015-08-01",
      project: "harry-j-epstein",
      kind: "source-fact",
      text: "By August 1, 2015, store.harryepstein.com redirected to the successor site at www.harryepstein.com/index.php/.",
      locator: "Wayback capture 20150801160416 and archived HTTP Location header.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-HJE-THICK-ARTS-FORMALIZATION-2009-2015"],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      limitations: [
        "A redirect establishes a host transition, not the exact contract end date or who built the successor site.",
        "Later redirects or errors do not extend the old storefront's active operating period."
      ]
    },
    {
      id: "OBS-HJE-FIRST-THICK-ARTS-CLIENT",
      intakeId: "INTAKE-HJE-FIRST-CLIENT-ACCOUNT-2026",
      sourceId: "SRC-HJE-FIRST-CLIENT-ACCOUNT-2026",
      project: "harry-j-epstein",
      kind: "participant-memory",
      text: "Jamie dates the Harry J. Epstein Company client relationship 2009-2015 and identifies it as the engagement that became Thick Arts LLC's first client relationship after the LLC was formed in 2012.",
      locator: "Authorized first-party professional account supplied August 14, 2026.",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-HJE-THICK-ARTS-FORMALIZATION-2009-2015"],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      limitations: [
        "This is a first-party statement, not an independently reviewed contract or collaborator testimonial.",
        "Exact invoice and billing bookends remain recoverable from protected business records."
      ]
    }
  ],
  sources: [
    {
      id: "SRC-THICK-ARTS-NYS-DOS-2012-07-06",
      title: "New York Department of State record for Thick Arts LLC",
      organization: "New York State Department of State, Division of Corporations",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2012-07-06",
      accessedAt: reviewedAt,
      canonicalUrl: "https://data.ny.gov/resource/n9v6-gdp6.json?$select=dos_id%2Ccurrent_entity_name%2Cinitial_dos_filing_date%2Ccounty%2Cjurisdiction%2Centity_type&$where=current_entity_name%3D%27THICK%20ARTS%20LLC%27",
      preferredPublicUrl: "canonical",
      publicCitation: "New York Department of State record for Thick Arts LLC, DOS ID 4267566, filed July 6, 2012.",
      publicNote: "The official dataset identifies the entity as a New York domestic LLC filed in Kings County. It does not identify members or clients.",
      supportsGenerally: [
        "Thick Arts LLC's initial DOS filing date was July 6, 2012",
        "Thick Arts LLC is a New York domestic limited liability company",
        "Thick Arts LLC's DOS ID is 4267566"
      ],
      doesNotEstablish: [
        "who the LLC's members or clients were",
        "Harry J. Epstein Company's first-client status",
        "the 2009 start of Jamie's client relationship",
        "contract or invoice dates"
      ]
    },
    {
      id: "SRC-HJE-WAYBACK-STOREFRONT-2010-01-01",
      title: "Harry J. Epstein Company storefront first observed host capture",
      organization: "Harry J. Epstein Company",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2010-01-01",
      accessedAt: reviewedAt,
      canonicalUrl: "http://store.harryepstein.com/",
      archiveUrl: "https://web.archive.org/web/20100101090939/http://store.harryepstein.com/",
      preferredPublicUrl: "archive",
      publicCitation: "Archive.org capture of store.harryepstein.com entering its merchant2 commerce application, January 1, 2010.",
      publicNote: "A directly captured storefront homepage appears on March 3, 2010; January 1 is an observed lower bound rather than an exact launch date.",
      supportsGenerally: ["the store host responded and redirected into its commerce application on January 1, 2010"],
      doesNotEstablish: ["the exact storefront launch date", "a client or contract start date", "continuous availability between captures"]
    },
    {
      id: "SRC-HJE-WAYBACK-STOREFRONT-2015-07-03",
      title: "Harry J. Epstein Company functioning storefront capture",
      organization: "Harry J. Epstein Company",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2015-07-03",
      accessedAt: reviewedAt,
      canonicalUrl: "http://store.harryepstein.com/",
      archiveUrl: "https://web.archive.org/web/20150703004948/http://store.harryepstein.com/",
      preferredPublicUrl: "archive",
      publicCitation: "Archive.org capture of the functioning Harry J. Epstein Company storefront homepage, July 3, 2015.",
      publicNote: "The page includes catalog navigation, search, product prices, account and checkout routes, and 2015 publishing.",
      supportsGenerally: ["a functioning customer-facing storefront remained observable on July 3, 2015"],
      doesNotEstablish: ["the exact client end date", "Jamie's responsibility for every component or business outcome", "current maintenance of the successor website"]
    },
    {
      id: "SRC-HJE-WAYBACK-STOREFRONT-REDIRECT-2015-08-01",
      title: "Harry J. Epstein Company storefront successor-site redirect",
      organization: "Harry J. Epstein Company",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2015-08-01",
      accessedAt: reviewedAt,
      canonicalUrl: "http://store.harryepstein.com/",
      archiveUrl: "https://web.archive.org/web/20150801160416/http://store.harryepstein.com/",
      preferredPublicUrl: "archive",
      publicCitation: "Archive.org capture of store.harryepstein.com redirecting to the successor www.harryepstein.com site, August 1, 2015.",
      publicNote: "The archived HTTP response redirects the old host to http://www.harryepstein.com/index.php/.",
      supportsGenerally: ["the old storefront host redirected to the successor website by August 1, 2015"],
      doesNotEstablish: ["the exact client end date", "who built or maintained the successor website", "current client stewardship"]
    },
    {
      id: "SRC-HJE-FIRST-CLIENT-ACCOUNT-2026",
      title: "Jamie Burkart first-party Harry J. Epstein client chronology account",
      author: "Jamie Burkart",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      accessedAt: reviewedAt,
      publicCitation: "Jamie Burkart first-party professional account dating the Harry J. Epstein engagement 2009-2015 and identifying it as Thick Arts LLC's first client relationship after the LLC's formation.",
      publicNote: "This is an authorized first-party professional account, not an independently reviewed contract, invoice ledger, or collaborator testimonial.",
      protectedLocatorId: "RESEARCH-HJE-FIRST-CLIENT-ACCOUNT-2026-001",
      supportsGenerally: [
        "the Harry J. Epstein client relationship ran 2009-2015",
        "the existing engagement became Thick Arts LLC's first client relationship after its 2012 formation"
      ],
      doesNotEstablish: [
        "independent corroboration of the first-client relationship",
        "the exact first invoice, payment, or contract dates",
        "sole authorship of company knowledge, staff work, photography, content, or business outcomes"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-HJE-THICK-ARTS-FORMALIZATION-2009-2015",
      project: "harry-j-epstein",
      internalClaim: "Jamie dates the Harry J. Epstein Company client relationship 2009-2015 and identifies it as the engagement that became Thick Arts LLC's first client after the LLC was formed on July 6, 2012. The formation date is independently supported by the New York Department of State; first-client status remains an authorized first-party professional account; Archive.org supplies separate storefront observation bounds.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "Jamie began working with Harry J. Epstein Company in 2009. He formalized his practice as Thick Arts LLC on July 6, 2012, with the existing engagement becoming the LLC's first client relationship; the work continued through 2015. The formation date comes from New York's official entity record, while first-client status and the 2009-2015 relationship are Jamie's authorized professional account. Archive.org independently preserves the commerce host from January 2010 through a functioning July 2015 storefront and its August 2015 redirect to a successor site.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/harry-j-epstein"]
        },
        {
          key: "work-card",
          text: "First Thick Arts client relationship, 2009-2015; the LLC was formed in 2012 and the historic storefront remained observable through its 2015 transition.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-THICK-ARTS-NYS-DOS-2012-07-06",
          relationship: "direct-support",
          supports: ["Thick Arts LLC's initial DOS filing date was July 6, 2012"],
          locator: "Official NY Open Data entity record for DOS ID 4267566.",
          publicNote: "Independent support for the LLC formation date only; the record does not name clients or members.",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-HJE-FIRST-CLIENT-ACCOUNT-2026",
          relationship: "private-support",
          supports: ["the 2009-2015 client relationship and first-client status"],
          locator: "Authorized first-party professional account.",
          publicNote: "First-party support for the client chronology; not presented as independent corroboration.",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-HJE-WAYBACK-STOREFRONT-2010-01-01",
          relationship: "corroborating",
          supports: ["the commerce host was observable at the start of 2010"],
          locator: "Wayback capture 20100101090939.",
          publicNote: "Archive observation bound, not an exact launch or contract date.",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-HJE-WAYBACK-STOREFRONT-2015-07-03",
          relationship: "corroborating",
          supports: ["a functioning customer-facing storefront remained observable on July 3, 2015"],
          locator: "Wayback capture 20150703004948.",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-HJE-WAYBACK-STOREFRONT-REDIRECT-2015-08-01",
          relationship: "supports-boundary",
          supports: ["the old storefront redirected to a successor site by August 1, 2015"],
          locator: "Wayback capture 20150801160416.",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Keep the 2009 client relationship start distinct from Thick Arts LLC's July 6, 2012 legal formation.",
        "Present first-client status as Jamie's first-party account, not a fact proved by the state record or Archive.org.",
        "Use Archive.org dates as storefront observation bounds, not contract or billing dates.",
        "Do not present the successor website as Jamie's current implementation or maintenance work.",
        "Keep the Sackin family's authority and product knowledge, staff labor, customers, vendors, and later maintenance distinct from Jamie's contribution."
      ],
      antiClaims: [
        "Harry J. Epstein Company was a Thick Arts client before Thick Arts LLC legally existed",
        "New York's entity record proves Harry J. Epstein Company was Thick Arts LLC's first client",
        "Archive.org proves the exact contract dates",
        "Jamie currently maintains the successor Harry J. Epstein website"
      ],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      reviewedAt,
      reviewedBy
    }
  ],
  entities: [
    { id: "ENT-THICK-ARTS-LLC", name: "Thick Arts LLC", kind: "organization", aliases: ["Thick Arts"], publicSafe: true },
    { id: "ENT-HARRY-J-EPSTEIN-COMPANY", name: "Harry J. Epstein Company", kind: "organization", aliases: ["HJE"], publicSafe: true },
    { id: "ENT-HJE-HISTORIC-STOREFRONT", name: "store.harryepstein.com historic storefront", kind: "system", aliases: ["Harry J. Epstein online store"], publicSafe: true }
  ],
  agencyRelations: [
    {
      id: "REL-THICK-ARTS-HJE-STOREFRONT",
      project: "harry-j-epstein",
      actorIds: ["ENT-THICK-ARTS-LLC"],
      action: "implemented-and-maintained",
      objectId: "ENT-HJE-HISTORIC-STOREFRONT",
      purpose: "Translate Harry J. Epstein Company's specialized product knowledge, customer relationships, and operating practices into usable e-commerce and digital workflows without flattening its voice.",
      result: "The historic storefront joined catalog navigation, search, products, prices, account and checkout routes, customer guidance, and publishing; Archive.org preserves it through July 2015 before an August 2015 successor-site redirect.",
      creditScope: "shared",
      status: "use-with-care",
      claimIds: ["CLM-HJE-THICK-ARTS-FORMALIZATION-2009-2015"],
      sourceIds: [
        "SRC-THICK-ARTS-NYS-DOS-2012-07-06",
        "SRC-HJE-FIRST-CLIENT-ACCOUNT-2026",
        "SRC-HJE-WAYBACK-STOREFRONT-2010-01-01",
        "SRC-HJE-WAYBACK-STOREFRONT-2015-07-03",
        "SRC-HJE-WAYBACK-STOREFRONT-REDIRECT-2015-08-01"
      ],
      sourceSupportKeys: [
        "Thick Arts LLC's initial DOS filing date was July 6, 2012",
        "the Harry J. Epstein client relationship ran 2009-2015",
        "the existing engagement became Thick Arts LLC's first client relationship after its 2012 formation",
        "the store host responded and redirected into its commerce application on January 1, 2010",
        "a functioning customer-facing storefront remained observable on July 3, 2015",
        "the old storefront host redirected to the successor website by August 1, 2015"
      ],
      boundaries: [
        "The state record supports formation; Jamie's account supports first-client status; the web archive supports separate storefront observation bounds.",
        "Shared credit preserves the Sackin family's authority and product knowledge, staff work, customers, vendors, and later maintainers.",
        "The relation ends with the documented 2009-2015 engagement and does not assert current maintenance of the successor site."
      ],
      reviewedAt,
      reviewedBy
    }
  ],
  researchInquiries: [
    {
      id: "INQ-HJE-CLIENT-BOOKENDS",
      project: "harry-j-epstein",
      question: "Which protected client, invoice, contract, correspondence, source-control, or handoff records can independently establish the exact billing bookends of Harry J. Epstein Company's relationship with Jamie and Thick Arts LLC?",
      methods: [
        "Query the New York Department of State record for Thick Arts LLC's legal formation date.",
        "Review Archive.org captures for independent storefront observation bounds.",
        "Keep the first-party client relationship, legal formation, public storefront chronology, and billing dates as distinct evidence layers."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "New York Department of State data verifies Thick Arts LLC was filed July 6, 2012.",
        "Jamie dates the Harry J. Epstein client relationship 2009-2015 and identifies it as the engagement that became Thick Arts LLC's first client relationship.",
        "Archive.org observes the commerce host from January 2010, a functioning storefront through July 3, 2015, and a successor-site redirect by August 1, 2015."
      ],
      limitations: [
        "The government record does not identify LLC members or clients.",
        "No first invoice, final invoice, or signed contract was normalized in this source return.",
        "Wayback captures are observation bounds rather than legal or billing evidence."
      ],
      sourceIds: [
        "SRC-THICK-ARTS-NYS-DOS-2012-07-06",
        "SRC-HJE-FIRST-CLIENT-ACCOUNT-2026",
        "SRC-HJE-WAYBACK-STOREFRONT-2010-01-01",
        "SRC-HJE-WAYBACK-STOREFRONT-2015-07-03",
        "SRC-HJE-WAYBACK-STOREFRONT-REDIRECT-2015-08-01"
      ],
      publicSummary: "Jamie dates the Harry J. Epstein engagement 2009-2015. New York records independently verify Thick Arts LLC's July 6, 2012 formation, and Archive.org separately bounds the historic storefront from January 2010 through its July-August 2015 transition; first-client status remains Jamie's authorized professional account.",
      protectedLocatorId: "RESEARCH-HJE-CLIENT-BOOKENDS-2026-001"
    }
  ],
  corrections: [
    {
      id: "COR-HJE-TIMEFRAME-2026",
      claimId: "CLM-HJE-THICK-ARTS-FORMALIZATION-2009-2015",
      previousText: "2012-Present",
      replacementText: "2009-2015 client relationship; Thick Arts LLC formed July 6, 2012",
      reason: "The old wording conflated Thick Arts LLC's broader tenure with this completed client relationship and omitted the pre-LLC period Jamie has now authorized for public use.",
      decidedAt: reviewedAt,
      affectedSurfaces: ["/work", "/work/harry-j-epstein", "knowledge-bank"],
      status: "active"
    }
  ]
} as const;
