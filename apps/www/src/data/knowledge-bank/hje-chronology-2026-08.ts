const reviewedAt = "2026-08-14";
const reviewedBy = ["Jamie Burkart", "Codex public-record and Archive.org chronology review"];

export const hjeChronologyAugust2026 = {
  intakeItems: [
    {
      id: "INTAKE-THICK-ARTS-NYS-DOS-2026",
      kind: "public-url",
      title: "Thick Arts LLC New York State formation record",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex public-record review",
      projectIds: ["harry-j-epstein", "thick-arts"],
      reason: "Independently verify when Jamie formalized his HJE work as Thick Arts LLC without moving the 2009 start of the client engagement to the later legal formation date.",
      sourceUrl: "https://data.ny.gov/resource/n9v6-gdp6.json?$select=dos_id,current_entity_name,initial_dos_filing_date,county,jurisdiction,entity_type&$where=upper(current_entity_name)%20=%20%22THICK%20ARTS%20LLC%22",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-THICK-ARTS-NYS-DOS-ACTIVE-CORPORATIONS"],
      observationIds: ["OBS-THICK-ARTS-FORMED-2012-07-06"],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      boundaries: [
        "The State record dates the LLC filing; it does not establish when Jamie first began doing the underlying client work.",
        "New York State describes the open dataset as general-public information rather than certified legal documentation.",
        "The filing record does not independently identify Harry J. Epstein Company as the LLC's first client."
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
        "Wayback captures establish observation dates, not the exact launch date or every day of continuous availability.",
        "A functioning or redirecting storefront does not by itself establish a client, contract, payment, or maintenance relationship.",
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
      reason: "Preserve Jamie's authorized first-party statement that Harry J. Epstein Company was the first client of Thick Arts LLC and reconcile that relationship with the documented 2009-2015 engagement chronology.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: ["SRC-HJE-FIRST-CLIENT-ACCOUNT-2026"],
      observationIds: ["OBS-HJE-FIRST-THICK-ARTS-CLIENT"],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      boundaries: [
        "Identify the first-client relationship as Jamie's first-party professional account rather than independent corroboration.",
        "Do not infer exact incorporation, invoice, payment, or contract dates from the storefront archive.",
        "Do not convert Jamie's company relationship into sole credit for the Sackin family's business, product knowledge, staff labor, customer relationships, or later maintenance."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-THICK-ARTS-FORMED-2012-07-06",
      intakeId: "INTAKE-THICK-ARTS-NYS-DOS-2026",
      sourceId: "SRC-THICK-ARTS-NYS-DOS-ACTIVE-CORPORATIONS",
      project: "harry-j-epstein",
      kind: "source-fact",
      text: "The New York State Department of State active-corporations dataset records THICK ARTS LLC, DOS ID 4267566, as a domestic limited liability company with an initial filing date of July 6, 2012.",
      locator: "Official Open NY record for DOS ID 4267566, queried by exact entity name.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-THICK-ARTS-FORMATION-2012-07-06"],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      limitations: [
        "The filing date does not change the first-party account that Jamie's HJE work began in 2009.",
        "The official entity record does not identify the LLC's first client or every member and business decision."
      ]
    },
    {
      id: "OBS-HJE-STOREFRONT-ACTIVE-2010",
      intakeId: "INTAKE-HJE-WAYBACK-STOREFRONT-2026",
      sourceId: "SRC-HJE-WAYBACK-STOREFRONT-2010-01-01",
      project: "harry-j-epstein",
      kind: "source-fact",
      text: "Archive.org first observed store.harryepstein.com on January 1, 2010, when the host redirected into its merchant2 commerce application; a directly captured storefront homepage followed on March 3, 2010.",
      locator: "Wayback captures 20100101090939 and 20100303123533.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-HJE-STOREFRONT-CHRONOLOGY-2009-2015"],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      limitations: [
        "The first Archive.org capture is a lower observation bound, not proof that the storefront launched that day.",
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
      claimIds: ["CLM-HJE-STOREFRONT-CHRONOLOGY-2009-2015"],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      limitations: [
        "The capture establishes an observable customer-facing system, not the availability of every checkout dependency or private operating system.",
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
      claimIds: ["CLM-HJE-STOREFRONT-CHRONOLOGY-2009-2015"],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      limitations: [
        "A redirect establishes a host transition, not the exact contract end date or who built the successor site.",
        "Later captures of redirects or errors do not extend the old storefront's active operating period."
      ]
    },
    {
      id: "OBS-HJE-FIRST-THICK-ARTS-CLIENT",
      intakeId: "INTAKE-HJE-FIRST-CLIENT-ACCOUNT-2026",
      sourceId: "SRC-HJE-FIRST-CLIENT-ACCOUNT-2026",
      project: "harry-j-epstein",
      kind: "participant-memory",
      text: "Jamie states that his Harry J. Epstein Company work began in 2009; during that engagement he formalized the practice by forming Thick Arts LLC in 2012, with HJE as the LLC's first client; and the client relationship continued through 2015.",
      locator: "Authorized first-party professional account supplied August 14, 2026.",
      status: "corroborated",
      publicSafe: true,
      claimIds: [
        "CLM-HJE-FIRST-THICK-ARTS-CLIENT",
        "CLM-THICK-ARTS-FORMATION-2012-07-06",
        "CLM-HJE-STOREFRONT-CHRONOLOGY-2009-2015"
      ],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      limitations: [
        "This is a first-party statement, not an independently reviewed contract or collaborator testimonial.",
        "The 2009-2015 public period is a portfolio chronology; exact legal and billing bookends remain recoverable from protected business records."
      ]
    }
  ],
  sources: [
    {
      id: "SRC-THICK-ARTS-NYS-DOS-ACTIVE-CORPORATIONS",
      title: "New York State active-corporations record for THICK ARTS LLC",
      organization: "New York State Department of State",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2012-07-06",
      accessedAt: reviewedAt,
      canonicalUrl: "https://data.ny.gov/resource/n9v6-gdp6.json?$select=dos_id,current_entity_name,initial_dos_filing_date,county,jurisdiction,entity_type&$where=upper(current_entity_name)%20=%20%22THICK%20ARTS%20LLC%22",
      preferredPublicUrl: "canonical",
      publicCitation: "New York State Department of State active-corporations record for THICK ARTS LLC, DOS ID 4267566, initial filing date July 6, 2012.",
      publicNote: "The official Open NY record identifies a domestic limited liability company in Kings County. The State describes this dataset as general-public information rather than certified legal documentation.",
      supportsGenerally: [
        "THICK ARTS LLC has New York DOS ID 4267566",
        "the entity's initial DOS filing date is July 6, 2012",
        "the entity is recorded as a domestic limited liability company in New York"
      ],
      doesNotEstablish: [
        "that Jamie's underlying HJE work began only when the LLC was filed",
        "Harry J. Epstein Company's first-client status",
        "the exact first or final invoice, payment, or contract date",
        "certified legal status for a legal proceeding"
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
      publicCitation: "Archive.org capture of store.harryepstein.com redirecting into its merchant2 commerce application, January 1, 2010.",
      publicNote: "A directly captured storefront homepage appears on March 3, 2010; January 1 is the earliest host observation returned by the reviewed CDX index.",
      supportsGenerally: [
        "store.harryepstein.com responded and redirected into its merchant2 commerce application on January 1, 2010",
        "the host was observable by Archive.org at the start of 2010"
      ],
      doesNotEstablish: [
        "the exact storefront launch date",
        "a client or contract start date",
        "who implemented or maintained every component",
        "continuous availability between captures"
      ]
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
      publicNote: "The page visibly includes catalog navigation, search, product prices, account and checkout routes, and 2015 publishing.",
      supportsGenerally: [
        "a functioning customer-facing storefront remained observable on July 3, 2015",
        "the public system joined commerce, product information, navigation, customer guidance, and publishing"
      ],
      doesNotEstablish: [
        "the exact client or contract end date",
        "availability of every transaction dependency",
        "Jamie's responsibility for every component or business outcome",
        "current maintenance of the successor website"
      ]
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
      supportsGenerally: [
        "the old storefront host redirected to the successor website by August 1, 2015",
        "July-August 2015 is the observed storefront transition window"
      ],
      doesNotEstablish: [
        "the exact client or contract end date",
        "who built or maintained the successor website",
        "the legal or billing terms of the migration",
        "current client stewardship"
      ]
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
      publicCitation: "Jamie Burkart first-party professional account stating that his HJE work began in 2009, was formalized through Thick Arts LLC in 2012 with HJE as its first client, and continued through 2015, August 14, 2026.",
      publicNote: "This is an authorized first-party professional account, not an independently reviewed contract, invoice ledger, or collaborator testimonial.",
      protectedLocatorId: "RESEARCH-HJE-FIRST-CLIENT-ACCOUNT-2026-001",
      supportsGenerally: [
        "Harry J. Epstein Company was the first client of Thick Arts LLC",
        "Jamie formed Thick Arts LLC during the already-running HJE engagement to formalize his work",
        "Jamie authorizes the portfolio to present the documented engagement as 2009-2015"
      ],
      doesNotEstablish: [
        "independent corroboration of the first-client relationship",
        "the exact legal formation, first invoice, payment, or contract dates",
        "sole authorship of company knowledge, staff work, photography, content, or business outcomes",
        "a current client relationship"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-THICK-ARTS-FORMATION-2012-07-06",
      project: "harry-j-epstein",
      internalClaim: "Jamie's work with Harry J. Epstein Company began in 2009. During that engagement, he formalized the practice by forming Thick Arts LLC. The New York State Department of State records the LLC's initial filing date as July 6, 2012, and Jamie identifies HJE as the LLC's first client.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "The work began in 2009. Jamie formalized the practice as Thick Arts LLC during the engagement; New York State records the LLC's initial filing on July 6, 2012, and Jamie identifies Harry J. Epstein Company as its first client.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/harry-j-epstein"]
        },
        {
          key: "work-card",
          text: "Work began in 2009; Jamie formalized it as Thick Arts LLC in 2012, with HJE as the LLC's first client.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-THICK-ARTS-NYS-DOS-ACTIVE-CORPORATIONS",
          relationship: "direct-support",
          supports: [
            "THICK ARTS LLC's initial New York DOS filing date is July 6, 2012",
            "the entity is a New York domestic limited liability company with DOS ID 4267566"
          ],
          locator: "Exact-name query in the official Open NY active-corporations dataset.",
          publicNote: "Official public record for the formation date; not evidence of the engagement's 2009 start or first-client identity.",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-HJE-FIRST-CLIENT-ACCOUNT-2026",
          relationship: "private-support",
          supports: [
            "Jamie's HJE work began in 2009",
            "Jamie formed Thick Arts LLC during the HJE engagement to formalize his work",
            "Harry J. Epstein Company was Thick Arts LLC's first client"
          ],
          locator: "Authorized first-party professional account.",
          publicNote: "First-party relationship and career-sequence account; the LLC filing date is independently confirmed.",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The HJE work began in 2009; the July 6, 2012 LLC filing formalized an already-running practice.",
        "The New York State record independently establishes the filing date, not HJE's first-client status.",
        "The first-client and reason-for-forming relationship remain Jamie's authorized first-party professional account.",
        "Do not infer exact invoice, contract, payment, or ownership terms."
      ],
      antiClaims: [
        "Jamie's HJE work began only when Thick Arts LLC was formed in 2012",
        "The New York State filing independently proves HJE was the first client",
        "The open-data result is a certified legal document",
        "The HJE relationship continues to the present"
      ],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-HJE-FIRST-THICK-ARTS-CLIENT",
      project: "harry-j-epstein",
      internalClaim: "Jamie states that his work with Harry J. Epstein Company began in 2009 and that, when he formalized the practice as Thick Arts LLC in 2012, HJE became the first client of Thick Arts LLC. The first-client relationship is authorized for public portfolio use as a first-party professional fact, while the LLC filing date is independently verified and contract or collaborator corroboration remains distinct.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "Jamie began working with Harry J. Epstein Company in 2009 and later formalized the practice as Thick Arts LLC, with HJE as the LLC's first client.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/harry-j-epstein"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-HJE-FIRST-CLIENT-ACCOUNT-2026",
          relationship: "private-support",
          supports: ["Harry J. Epstein Company was the first client of Thick Arts LLC"],
          locator: "Authorized first-party professional account.",
          publicNote: "First-party client relationship supplied and approved by Jamie; not presented as independent corroboration.",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Present the relationship as Jamie's authorized first-party professional account.",
        "Do not imply independent contract or collaborator corroboration where none has been normalized.",
        "Client status does not confer ownership of the client's business, institutional knowledge, staff labor, or later work."
      ],
      antiClaims: [
        "Public sources independently prove Harry J. Epstein Company was Thick Arts LLC's first client",
        "Jamie owned Harry J. Epstein Company",
        "Jamie alone created the company's public voice or business results",
        "Harry J. Epstein Company remains a current Thick Arts client"
      ],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-HJE-STOREFRONT-CHRONOLOGY-2009-2015",
      project: "harry-j-epstein",
      internalClaim: "The governed portfolio dates the Harry J. Epstein Company client engagement 2009-2015. Archive.org first observed the store host entering its commerce application on January 1, 2010, preserves a functioning storefront through July 3, 2015, and records a redirect to the successor site by August 1, 2015.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "The documented engagement ran from 2009 through 2015. Archive.org first observed the commerce host in January 2010, preserves the functioning storefront through July 2015, and records its redirect to a successor site by August 2015.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/harry-j-epstein"]
        },
        {
          key: "work-card",
          text: "Thick Arts' first client engagement, 2009-2015, with the historic storefront independently observable through July 2015.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-HJE-FIRST-CLIENT-ACCOUNT-2026",
          relationship: "private-support",
          supports: ["Jamie authorizes the portfolio to present the documented engagement as 2009-2015"],
          locator: "Authorized first-party professional account.",
          publicNote: "First-party approval establishes the portfolio period; exact billing bookends remain separately researchable.",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-HJE-WAYBACK-STOREFRONT-2010-01-01",
          relationship: "corroborating",
          supports: [
            "store.harryepstein.com responded and redirected into its merchant2 commerce application on January 1, 2010",
            "the host was observable by Archive.org at the start of 2010"
          ],
          locator: "Wayback capture 20100101090939.",
          publicNote: "Earliest reviewed Archive.org host observation; not an exact launch date.",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-HJE-WAYBACK-STOREFRONT-2015-07-03",
          relationship: "direct-support",
          supports: [
            "a functioning customer-facing storefront remained observable on July 3, 2015",
            "the public system joined commerce, product information, navigation, customer guidance, and publishing"
          ],
          locator: "Wayback capture 20150703004948.",
          publicNote: "Latest reviewed successful storefront-homepage capture.",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-HJE-WAYBACK-STOREFRONT-REDIRECT-2015-08-01",
          relationship: "direct-support",
          supports: [
            "the old storefront host redirected to the successor website by August 1, 2015",
            "July-August 2015 is the observed storefront transition window"
          ],
          locator: "Wayback capture 20150801160416 and archived Location header.",
          publicNote: "First reviewed post-storefront capture redirects to the successor host.",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Use 2009-2015 for the portfolio engagement, not 2012-Present.",
        "Describe January 2010 and July-August 2015 as Archive.org observation boundaries rather than exact launch and contract dates.",
        "Do not present the current successor website as Jamie's currently maintained implementation or as proof of a present client relationship.",
        "Keep company authority, staff and family knowledge, customer relationships, and later maintenance distinct from Jamie's contribution."
      ],
      antiClaims: [
        "Harry J. Epstein Company was a Thick Arts client from 2012 to the present",
        "Archive.org proves the exact contract start and end dates",
        "Jamie currently maintains the successor Harry J. Epstein website",
        "The storefront capture proves every transaction path remained functional"
      ],
      researchInquiryIds: ["INQ-HJE-CLIENT-BOOKENDS"],
      reviewedAt,
      reviewedBy
    }
  ],
  entities: [
    {
      id: "ENT-THICK-ARTS-LLC",
      name: "Thick Arts LLC",
      kind: "organization",
      aliases: ["Thick Arts"],
      publicSafe: true
    },
    {
      id: "ENT-HARRY-J-EPSTEIN-COMPANY",
      name: "Harry J. Epstein Company",
      kind: "organization",
      aliases: ["HJE"],
      publicSafe: true
    },
    {
      id: "ENT-HJE-HISTORIC-STOREFRONT",
      name: "store.harryepstein.com historic storefront",
      kind: "system",
      aliases: ["Harry J. Epstein online store"],
      publicSafe: true
    }
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
      claimIds: [
        "CLM-HJE-FIRST-THICK-ARTS-CLIENT",
        "CLM-THICK-ARTS-FORMATION-2012-07-06",
        "CLM-HJE-STOREFRONT-CHRONOLOGY-2009-2015"
      ],
      sourceIds: [
        "SRC-HJE-FIRST-CLIENT-ACCOUNT-2026",
        "SRC-THICK-ARTS-NYS-DOS-ACTIVE-CORPORATIONS",
        "SRC-HJE-WAYBACK-STOREFRONT-2010-01-01",
        "SRC-HJE-WAYBACK-STOREFRONT-2015-07-03",
        "SRC-HJE-WAYBACK-STOREFRONT-REDIRECT-2015-08-01"
      ],
      sourceSupportKeys: [
        "Harry J. Epstein Company was the first client of Thick Arts LLC",
        "the entity's initial DOS filing date is July 6, 2012",
        "store.harryepstein.com responded and redirected into its merchant2 commerce application on January 1, 2010",
        "a functioning customer-facing storefront remained observable on July 3, 2015",
        "the old storefront host redirected to the successor website by August 1, 2015"
      ],
      boundaries: [
        "The first-client and implementation relationship is an authorized first-party account combined with public web chronology, not an independently reviewed contract record.",
        "Shared credit preserves the Sackin family's authority and product knowledge, staff work, photography and content labor, customer relationships, vendors, and later maintainers.",
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
      question: "Which protected formation, invoice, contract, correspondence, source-control, or handoff records can independently establish the exact legal and billing bookends of Harry J. Epstein Company's Thick Arts relationship?",
      methods: [
        "Compare Thick Arts formation records, client agreements, invoices, payments, correspondence, repository history, and handoff records without publishing protected business data.",
        "Keep the first-party client relationship, public storefront observation period, and legal or billing dates as distinct evidence layers.",
        "Seek a collaborator-approved proof note if finer client chronology becomes necessary for a public surface."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "Jamie states that his HJE work began in 2009, that he formed Thick Arts LLC during the engagement to formalize the practice, and that HJE was the LLC's first client.",
        "The New York State Department of State active-corporations dataset independently records THICK ARTS LLC's initial filing date as July 6, 2012 under DOS ID 4267566.",
        "Archive.org first observed the store host entering its commerce application on January 1, 2010.",
        "Archive.org preserves a functioning storefront on July 3, 2015 and a successor-site redirect on August 1, 2015."
      ],
      limitations: [
        "No first invoice, final invoice, signed contract, or independently attributable client testimonial was normalized in this source return.",
        "The official formation record establishes the LLC filing date but not the 2009 work start or HJE's first-client identity.",
        "Wayback captures are observation bounds rather than legal or billing evidence.",
        "The current successor website does not establish a present client relationship or Jamie's current maintenance role."
      ],
      sourceIds: [
        "SRC-HJE-FIRST-CLIENT-ACCOUNT-2026",
        "SRC-THICK-ARTS-NYS-DOS-ACTIVE-CORPORATIONS",
        "SRC-HJE-WAYBACK-STOREFRONT-2010-01-01",
        "SRC-HJE-WAYBACK-STOREFRONT-2015-07-03",
        "SRC-HJE-WAYBACK-STOREFRONT-REDIRECT-2015-08-01"
      ],
      publicSummary: "The portfolio records that Jamie's HJE work began in 2009, that he formalized the practice as Thick Arts LLC during the engagement, and that HJE was the LLC's first client. New York State independently dates the LLC filing to July 6, 2012, while Archive.org bounds the storefront from January 2010 through the July-August 2015 transition; exact billing and contract bookends remain protected research work.",
      protectedLocatorId: "RESEARCH-HJE-CLIENT-BOOKENDS-2026-001"
    }
  ],
  corrections: [
    {
      id: "COR-HJE-TIMEFRAME-2026",
      claimId: "CLM-HJE-STOREFRONT-CHRONOLOGY-2009-2015",
      previousText: "2012-Present",
      replacementText: "2009-2015",
      reason: "Jamie identifies HJE as Thick Arts LLC's first client and approves the 2009-2015 engagement period; Archive.org preserves the historic storefront through July 2015 and its successor-site redirect by August 2015. The old wording conflated Thick Arts' broader tenure with this completed client engagement.",
      decidedAt: reviewedAt,
      affectedSurfaces: ["/work", "/work/harry-j-epstein", "knowledge-bank"],
      status: "active"
    }
  ]
} as const;
