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
    },
    {
      id: "SRC-NTER-CHNG-INSTALLER-RUNBOOK-2011",
      title: "NTER CHNG Installer",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2011-04-13T18:25:12.160Z",
      accessedAt: "2026-07-15",
      publicCitation:
        "Protected NTER CHNG installation runbook created April 13, 2011; close-read July 15, 2026.",
      publicNote:
        "The working document organizes the May 2011 America: Now and Here restaging across software, server and display components, fabrication, testing, gallery installation, fine-tuning, and teardown. Its underlying Drive locator remains protected.",
      supportsGenerally: [
        "May 2011 restaging for America: Now and Here",
        "software refinement and separate server-side and wall-side concerns",
        "hosting, display computers, projectors, networking, and wiring",
        "wall fabrication, floor anchoring, installation testing, and teardown",
        "an integrated technical, spatial, and production workflow"
      ],
      doesNotEstablish: [
        "authorship of the document",
        "individual responsibility for each listed task",
        "that every planned task was completed exactly as written",
        "sole technical, artistic, fabrication, or production authorship",
        "audience reach, reception, or downstream impact"
      ],
      protectedLocatorId: "ARCHIVE-NTER-CHNG-INSTALLER-RUNBOOK-2011-001"
    },
    {
      id: "SRC-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011",
      title: "NTER CHNG exhibit information and 2011 working prompts",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2011-04-06T19:49:17.517Z",
      accessedAt: "2026-07-15",
      publicCitation:
        "Protected NTER CHNG project working document created April 6, 2011; close-read July 15, 2026.",
      publicNote:
        "The document preserves project-authored 2010 exhibit information, a collaborative description of the software-and-architectural installation, and 2011 working prompts. Participant phone numbers and message text are intentionally excluded.",
      supportsGenerally: [
        "a January 2010 original Cocoon Gallery presentation",
        "the listed January 8 opening date",
        "joint credit to Drew Bolton, Jamie Burkart, and Garrett Fuselier",
        "the creators' description of the project as equal parts software application and architectural installation",
        "the intended shift from private one-to-one texting toward a shared many-to-many gallery exchange"
      ],
      doesNotEstablish: [
        "an independently verified closing date",
        "authorship of every line in the working document",
        "which collaborator performed each technical or production task",
        "participant consent for republication of phone numbers or message text",
        "attendance, reach, reception, or impact"
      ],
      protectedLocatorId: "ARCHIVE-NTER-CHNG-EXHIBIT-WORKING-DOC-2011-001"
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
        "A separate project working document dates the original presentation to January 2010; the exact closing date remains unresolved because surviving sources conflict."
      ],
      antiClaims: [
        "Jamie solely created NTER CHNG",
        "Jamie alone programmed, designed, produced, or documented the installation",
        "The archived project page establishes attendance or impact",
        "The installation's exact closing date is settled by the surviving records"
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
        },
        {
          sourceId: "SRC-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011",
          relationship: "private-support",
          supports: [
            "the creators' framing of private one-to-one texting becoming a shared many-to-many gallery exchange"
          ],
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
    },
    {
      id: "CLM-NTER-CHNG-ORIGINAL-EXHIBITION-2010",
      project: "nter-chng",
      internalClaim:
        "A surviving project-authored exhibit-information document dates NTER CHNG's original Cocoon Gallery presentation to January 2010 and lists a January 8 opening; the protected document lists January 29 as the closing date while the archived project page says the installation was open until January 24, so the exact closing date remains unresolved.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "A surviving project-authored exhibit document dates NTER CHNG's original Cocoon Gallery presentation to January 2010; the recovered sources conflict on the exact closing date.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/nter-chng-2026-07-14"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011",
          relationship: "private-support",
          supports: ["January 2010 chronology and the listed January 8 opening"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011",
          relationship: "supports-boundary",
          supports: ["the conflicting January 24 closing-date wording"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Describe the chronology as project-authored rather than independently verified.",
        "January 2010 and the listed January 8 opening are supported by the protected working document.",
        "Do not choose between the January 24 and January 29 closing dates without another contemporaneous source."
      ],
      antiClaims: [
        "NTER CHNG's original Cocoon Gallery presentation opened in January 2011",
        "All surviving records agree on the exact closing date",
        "The protected working document is an independent venue record"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-PROJECT-ARTIFACTS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex Google Docs archival review"]
    },
    {
      id: "CLM-NTER-CHNG-INTEGRATED-INSTALLATION-SYSTEM-2011",
      project: "nter-chng",
      internalClaim:
        "A surviving May 2011 installer runbook documents NTER CHNG's America: Now and Here restaging as an integrated implementation spanning software refinement, server-side and wall-side components, hosting, display computers, projectors, networking and wiring, wall fabrication, floor anchoring, installation testing, gallery fine-tuning, documentation planning, and teardown.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The May 2011 installer runbook shows NTER CHNG being delivered as an integrated software, hardware, fabrication, and gallery-production system.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/nter-chng-2026-07-14"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NTER-CHNG-INSTALLER-RUNBOOK-2011",
          relationship: "private-support",
          supports: [
            "the planned software, hosting, display, fabrication, installation, testing, and teardown workflow"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011",
          relationship: "private-support",
          supports: [
            "the creators' description of the work as equal parts software application and architectural installation"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Treat the runbook as evidence of project scope and delivery planning, not proof that every listed task was completed exactly as written.",
        "Keep the three-person collaboration visible and do not assign individual tasks without additional evidence.",
        "Do not expose protected document locators, participant records, phone numbers, or message text."
      ],
      antiClaims: [
        "Jamie independently built every part of the NTER CHNG technical system",
        "The runbook proves the final installation matched every planning detail",
        "The working documents establish audience scale or impact"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-PROJECT-ARTIFACTS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex Google Docs archival review"]
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
    },
    {
      id: "INQ-NTER-CHNG-PROJECT-ARTIFACTS-2026",
      project: "nter-chng",
      question:
        "What can the newly surfaced NTER CHNG working documents establish about chronology, implementation scope, and the collaboration without exposing participant records or inventing individual roles?",
      methods: [
        "Read connector-visible Google Drive metadata for both documents and recorded their titles and 2011 creation timestamps.",
        "Close-read the full paragraph populations of the installer runbook and the combined exhibit-information and working-prompt document.",
        "Separated project-authored statements from independent public corroboration and preserved the three-person collaboration.",
        "Compared the January 2010 exhibit-information chronology with the archived project's conflicting January closing-date language.",
        "Excluded participant phone numbers, message text, Drive IDs, URLs, and protected locators from the public registry and human-readable report."
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "A project-authored exhibit-information section dates the original Cocoon Gallery presentation to January 2010 and lists January 8 as the opening date.",
        "The protected document lists a January 29 closing date, while the archived project page separately says the installation was open until January 24; the exact closing date remains unresolved.",
        "The installer runbook explicitly frames its work as staging NTER CHNG for America: Now and Here in May 2011.",
        "The runbook spans software refinement, separate server-side and wall-side concerns, hosting, display hardware, projectors, networking, wiring, physical wall fabrication, floor anchoring, testing, fine-tuning, documentation planning, and teardown.",
        "The exhibit document describes NTER CHNG as equal parts software application and architectural installation and frames its interaction as turning private one-to-one texting into a shared many-to-many exchange."
      ],
      limitations: [
        "Neither document exposes usable revision history or author metadata through the connector.",
        "The documents do not assign individual technical, artistic, production, or documentation responsibilities among Drew Bolton, Jamie Burkart, and Garrett Fuselier.",
        "The runbook records planned work and does not independently prove completion of every task as written.",
        "The exhibit document is project-authored rather than an independent venue or press record.",
        "The exhibit document contains participant phone numbers and message text that must remain excluded from the public repository."
      ],
      sourceIds: [
        "SRC-NTER-CHNG-INSTALLER-RUNBOOK-2011",
        "SRC-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011",
        "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011",
        "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011"
      ],
      publicSummary:
        "Protected project documents strengthen NTER CHNG's chronology and implementation record: an original January 2010 Cocoon Gallery presentation followed by a May 2011 America: Now and Here restaging, delivered through an integrated software, hardware, fabrication, and gallery-production workflow. Individual responsibilities and the exact original closing date remain unresolved.",
      protectedLocatorId: "RESEARCH-NTER-CHNG-PROJECT-ARTIFACTS-2026-001"
    }
  ]
};
