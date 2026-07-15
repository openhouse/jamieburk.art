import type { KnowledgeBank } from "./schema.ts";

type NterChngBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

export const nterChngBatchRecords: NterChngBatch = {
  sources: [
    {
      id: "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011",
      title: "NTER CHNG archived project site",
      author: "Drew Bolton, Jamie Burkart, and Garrett Fuselier",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      capturedAt: "2011-01-28T19:33:50Z",
      accessedAt: "2026-07-14",
      archiveUrl:
        "https://web.archive.org/web/20110128193350/http://nterchng.com/",
      preferredPublicUrl: "archive",
      publicCitation:
        "Archived NTER CHNG project site crediting Drew Bolton, Jamie Burkart, and Garrett Fuselier, captured January 28, 2011.",
      publicNote:
        "The project page identifies NTER CHNG as an interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier at the Arts Incubator Cocoon Gallery in Kansas City. It says the installation was open until January 24 but does not state the year or opening date.",
      supportsGenerally: [
        "the title NTER CHNG",
        "the medium `interactive texting installation`",
        "joint credit to Drew Bolton, Jamie Burkart, and Garrett Fuselier",
        "presentation at Arts Incubator Cocoon Gallery in Kansas City",
        "a public project website and downloadable-press-release link"
      ],
      doesNotEstablish: [
        "the exact original opening date or year",
        "the division of artistic, technical, production, or documentation labor",
        "individual ownership of the collaboration",
        "attendance, audience, reception, or impact",
        "the contents of the linked press release, which was not preserved"
      ]
    },
    {
      id: "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
      title: "I Text, Therefore I Am",
      organization: "America: Now and Here",
      author: "BProffer",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2011-06-22",
      capturedAt: "2012-10-17T09:05:12Z",
      accessedAt: "2026-07-14",
      archiveUrl:
        "https://web.archive.org/web/20121017090512/http://americanowandhere.org/2011/06/i-text-therefore-i-am/",
      preferredPublicUrl: "archive",
      publicCitation:
        "America: Now and Here, `I Text, Therefore I Am`, June 22, 2011, archived October 17, 2012.",
      publicNote:
        "The exhibition's own site describes visitors texting a displayed number at NTER CHNG and seeing their messages projected onto a floor-to-ceiling white gauze screen as moving thought clouds.",
      supportsGenerally: [
        "NTER CHNG's inclusion in the Kansas City presentation of America: Now and Here",
        "an SMS participation pathway",
        "projection onto a floor-to-ceiling gauze screen",
        "messages appearing as animated overlapping thought clouds",
        "observed public interaction with the installation"
      ],
      doesNotEstablish: [
        "the installation's creator names",
        "the division of labor among creators",
        "the complete technical architecture",
        "an exact participant count",
        "uniform audience interpretation or critical consensus"
      ]
    },
    {
      id: "SRC-NERMAN-AMERICA-NOW-HERE-2011",
      title: "America: Now and Here - Barbara Kruger",
      organization: "Nerman Museum of Contemporary Art / The Kansas City Star",
      author: "Alice Thorson",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2011-04-30",
      accessedAt: "2026-07-14",
      canonicalUrl:
        "https://www.nermanmuseum.org/exhibitions/2011-05-11-kruger-barbara-america-now-here.html",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Alice Thorson, `America: Now and Here - Barbara Kruger`, The Kansas City Star, April 30, 2011, preserved by the Nerman Museum of Contemporary Art.",
      publicNote:
        "The institutional page describes America: Now and Here as a multidisciplinary national project launching in Kansas City to foster dialogue through the arts and records its May 11-12 Barbara Kruger truck presentation at the Nerman Museum.",
      supportsGenerally: [
        "the exhibition's Kansas City launch context",
        "its multidisciplinary national and local artist structure",
        "its public-dialogue purpose",
        "the May 2011 Nerman Museum presentation"
      ],
      doesNotEstablish: [
        "NTER CHNG's inclusion",
        "NTER CHNG's creators or mechanism",
        "Jamie's role in the wider America: Now and Here organization",
        "audience or impact metrics for NTER CHNG"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION",
      project: "nter-chng",
      internalClaim:
        "NTER CHNG was a collaborative interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier, presented at the Arts Incubator Cocoon Gallery in Kansas City.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Drew Bolton, Jamie Burkart, and Garrett Fuselier created NTER CHNG, an interactive texting installation presented at Kansas City's Arts Incubator Cocoon Gallery.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/nter-chng-2026-07-14"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011",
          relationship: "direct-support",
          supports: ["title, medium, collaborators, and original venue"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Credit Drew Bolton, Jamie Burkart, and Garrett Fuselier together.",
        "The archived page does not establish the division of artistic, technical, production, or documentation labor.",
        "The exact original opening date and year remain unresolved."
      ],
      antiClaims: [
        "Jamie solely created NTER CHNG",
        "Jamie alone programmed, designed, produced, or documented the installation",
        "The archived project page establishes attendance or impact",
        "The installation opened in a specific year without further evidence"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex Wayback archival review"]
    },
    {
      id: "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011",
      project: "nter-chng",
      internalClaim:
        "NTER CHNG was included in the Kansas City presentation of America: Now and Here in 2011, where visitors could text a displayed number and see their messages projected as moving thought clouds on a floor-to-ceiling gauze screen.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "America: Now and Here's own archived site documents NTER CHNG in its 2011 Kansas City presentation as an SMS-to-projection installation that turned visitors' texts into moving thought clouds on a gauze screen.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/nter-chng-2026-07-14"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
          relationship: "direct-support",
          supports: ["exhibition inclusion, visitor interaction, and displayed mechanism"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NERMAN-AMERICA-NOW-HERE-2011",
          relationship: "context",
          supports: ["Kansas City launch, multidisciplinary structure, and public-dialogue purpose"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011",
          relationship: "corroborating",
          supports: ["the matching project title and interactive-texting medium"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The official exhibition post establishes presentation and interaction but does not name the creators; creator credit comes from the archived project site.",
        "Describe the installation as included in the Kansas City presentation, not as representative of the entire national program.",
        "Do not infer participant totals, critical consensus, or institutional commissioning terms."
      ],
      antiClaims: [
        "America: Now and Here commissioned Jamie alone",
        "NTER CHNG was the central or signature work of the national exhibition",
        "The installation reached a known number of visitors",
        "The exhibition record establishes individual creator roles"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex Wayback archival review"]
    },
    {
      id: "CLM-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD",
      project: "participatory-public-systems",
      internalClaim:
        "NTER CHNG is an early documented example of Jamie's collaborative participatory-systems practice: it used familiar personal technology to let visitors alter a shared public visual environment in real time.",
      status: "inference",
      projections: [
        {
          key: "archive-note",
          text:
            "NTER CHNG extends Jamie's participatory-systems record into interactive media: a familiar personal action, sending a text, changed a shared public projection in real time.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/nter-chng-2026-07-14"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011",
          relationship: "direct-support",
          supports: ["interactive-texting medium and joint creator credit"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
          relationship: "direct-support",
          supports: ["visitor input changing a shared projected display"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "This is a thematic inference across Jamie's record, not wording used by the creators or exhibition.",
        "Keep the collaboration visible and do not assign sole system design or implementation to Jamie.",
        "Do not project to the website until it materially improves a defined audience argument."
      ],
      antiClaims: [
        "NTER CHNG proves Jamie independently built the complete technical system",
        "The installation's participation model produced a measured civic outcome",
        "Every audience interaction was meaningful, safe, or preserved"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex editorial synthesis"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NTER-CHNG-AMERICA-NOW-HERE-2026",
      project: "nter-chng",
      question:
        "What can surviving public records establish about NTER CHNG, its collaborators, its interaction design, and its inclusion in America: Now and Here?",
      methods: [
        "Recovered and close-read the January 28, 2011 Wayback capture of NTER CHNG's project site.",
        "Queried the Wayback CDX index for the original project domain and confirmed that the linked press-release PDF was not captured.",
        "Identified the former official exhibition domain as americanowandhere.org and searched its archived URL population for NTER CHNG-related pages.",
        "Recovered and close-read the official June 22, 2011 America: Now and Here post `I Text, Therefore I Am`.",
        "Compared the exhibition post with the Nerman Museum's preserved Kansas City Star exhibition page to bound the larger program context.",
        "Separated direct source statements from thematic inference and held unsupported role, opening-date, audience, commission, and impact claims."
      ],
      runAt: "2026-07-14",
      resultStatus: "recovered",
      findings: [
        "The archived project site identifies NTER CHNG as an interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier at Arts Incubator Cocoon Gallery in Kansas City.",
        "The official exhibition site documents NTER CHNG in the 2011 Kansas City presentation of America: Now and Here.",
        "The official account describes visitors texting a displayed number and seeing messages projected onto floor-to-ceiling white gauze as overlapping moving thought clouds.",
        "The Nerman Museum page independently establishes the exhibition's May 2011 Kansas City launch context, multidisciplinary structure, and public-dialogue purpose.",
        "Together the sources support a bounded early participatory-systems claim without assigning sole authorship or a division of labor."
      ],
      limitations: [
        "The archived project page says the installation was open until January 24 but does not state the year or opening date.",
        "The linked project press release was not recovered in the Wayback collection.",
        "The project page names all three collaborators but does not divide artistic, technical, production, or documentation responsibilities.",
        "The official exhibition post does not name the creators; creator credit depends on the separate project source.",
        "No source recovered in this pass establishes attendance, participant demographics, commission terms, audience reach, critical consensus, or downstream impact.",
        "The official exhibition article includes anecdotal participant messages; those are not reproduced in the knowledge bank."
      ],
      sourceIds: [
        "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011",
        "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
        "SRC-NERMAN-AMERICA-NOW-HERE-2011"
      ],
      publicSummary:
        "Archived project and exhibition sources establish NTER CHNG as a collaborative interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier and document its SMS-to-projection presentation in America: Now and Here's 2011 Kansas City program.",
      protectedLocatorId: "RESEARCH-NTER-CHNG-WAYBACK-2026-001"
    }
  ]
};
