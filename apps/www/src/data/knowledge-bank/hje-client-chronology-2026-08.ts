import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-08-14";
const reviewedBy = ["Jamie Burkart", "Codex chronology integration"];
const correctionIntakeId = "INTAKE-HJE-THICK-ARTS-CLIENT-CHRONOLOGY-2026-08-14";
const formationIntakeId = "INTAKE-THICK-ARTS-LLC-DOS-FILING-2026-08-14";
const firstPartySourceId = "SRC-HJE-THICK-ARTS-FIRST-PARTY-CHRONOLOGY-2026-08-14";
const dosSourceId = "SRC-NYS-DOS-THICK-ARTS-LLC-FORMATION-2012-07-06";
const relationshipObservationId = "OBS-HJE-THICK-ARTS-FIRST-CLIENT-2009-2015";
const formationObservationId = "OBS-THICK-ARTS-LLC-FORMATION-2012-07-06";
const relationshipClaimId = "CLM-HJE-THICK-ARTS-FIRST-CLIENT-2009-2015";
const formationClaimId = "CLM-THICK-ARTS-LLC-FORMATION-2012-07-06";
const dosQueryUrl = "https://data.ny.gov/resource/n9v6-gdp6.json?%24select=dos_id%2Ccurrent_entity_name%2Cinitial_dos_filing_date%2Ccounty%2Cjurisdiction%2Centity_type&%24where=current_entity_name%3D%27THICK%20ARTS%20LLC%27";

const intakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: correctionIntakeId,
    kind: "collaborator-note",
    title: "Harry J. Epstein Company client chronology correction",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart",
    projectIds: ["harry-j-epstein"],
    reason: "Record Jamie's correction that Harry J. Epstein Company was a client from 2009 through 2015 and became Thick Arts LLC's first client when Jamie formalized the practice.",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [firstPartySourceId],
    observationIds: [relationshipObservationId],
    researchInquiryIds: [],
    boundaries: [
      "Jamie's correction establishes the client relationship, first-client status, and maintained 2009-2015 portfolio period.",
      "It does not independently establish every contract, invoice, billing month, or later maintenance interaction.",
      "The professional practice began before the LLC existed; the official filing date is separately sourced."
    ]
  },
  {
    id: formationIntakeId,
    kind: "public-url",
    title: "New York Department of State Thick Arts LLC filing record",
    submittedAt: reviewedAt,
    submittedBy: "Codex public-source review",
    projectIds: ["harry-j-epstein"],
    reason: "Verify the legal formation date independently without using a corporate filing to infer client history.",
    sourceUrl: dosQueryUrl,
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [dosSourceId],
    observationIds: [formationObservationId],
    researchInquiryIds: [],
    boundaries: [
      "The Department of State record establishes the entity name, type, jurisdiction, and initial filing date.",
      "It does not establish when Jamie's professional practice began, the identity of any client, or the duration of a client engagement."
    ]
  }
];

const observations: KnowledgeBank["observations"] = [
  {
    id: relationshipObservationId,
    intakeId: correctionIntakeId,
    sourceId: firstPartySourceId,
    comparisonSourceIds: [dosSourceId],
    project: "harry-j-epstein",
    kind: "participant-memory",
    text: "Jamie Burkart states that Harry J. Epstein Company was a client from 2009 through 2015 and became Thick Arts LLC's first client when he formalized the practice during that engagement.",
    locator: "Jamie-authorized first-party chronology correction, August 14, 2026",
    status: "verified",
    publicSafe: true,
    claimIds: [relationshipClaimId],
    researchInquiryIds: [],
    limitations: [
      "This first-party correction is authoritative for Jamie's portfolio chronology but is not a substitute for a month-by-month contract or invoice ledger."
    ]
  },
  {
    id: formationObservationId,
    intakeId: formationIntakeId,
    sourceId: dosSourceId,
    comparisonSourceIds: [],
    project: "harry-j-epstein",
    kind: "source-fact",
    text: "The New York Department of State Active Corporations dataset identifies THICK ARTS LLC as a domestic limited liability company with an initial DOS filing date of July 6, 2012.",
    locator: "Entity row for THICK ARTS LLC; Initial DOS Filing Date field",
    status: "verified",
    publicSafe: true,
    claimIds: [formationClaimId, relationshipClaimId],
    researchInquiryIds: [],
    limitations: [
      "The filing record does not establish client identity, engagement dates, or when Jamie began practicing independently."
    ]
  }
];

const sources: KnowledgeBank["sources"] = [
  {
    id: firstPartySourceId,
    title: "Jamie Burkart first-party HJE and Thick Arts chronology correction",
    organization: "Thick Arts LLC",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "Jamie-authorized correction recorded August 14, 2026",
    accessedAt: reviewedAt,
    publicCitation: "Jamie Burkart first-party chronology correction, August 14, 2026.",
    publicNote: "Only the bounded public-safe relationship and year range are projected; the underlying working conversation is not published.",
    supportsGenerally: ["Harry J. Epstein Company as Thick Arts LLC's first client", "professional practice active from 2009", "bounded 2009-2015 HJE client period"],
    doesNotEstablish: ["the official LLC filing date", "every contract or invoice date", "an HJE client relationship continuing after 2015", "sole causation for company outcomes"]
  },
  {
    id: dosSourceId,
    title: "New York Department of State Active Corporations record for THICK ARTS LLC",
    organization: "New York State Department of State",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2012-07-06",
    accessedAt: reviewedAt,
    canonicalUrl: dosQueryUrl,
    preferredPublicUrl: "canonical",
    publicCitation: "New York State Department of State, Active Corporations: Beginning 1800, THICK ARTS LLC entity record, accessed August 14, 2026.",
    publicNote: "The field-limited query omits the registered process address from the public portfolio citation.",
    supportsGenerally: ["THICK ARTS LLC entity name", "domestic limited liability company entity type", "July 6, 2012 initial DOS filing date"],
    doesNotEstablish: ["the 2009 start of Jamie's professional practice", "Harry J. Epstein Company as a client", "the duration of the HJE engagement"]
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: relationshipClaimId,
    project: "harry-j-epstein",
    internalClaim: "Jamie worked with Harry J. Epstein Company from 2009-2015; when he formalized his independent practice as Thick Arts LLC in 2012, HJE became the LLC's first client.",
    status: "confirmed-with-boundary",
    projections: [
      { key: "resume-html", text: "From 2009-2015, led e-commerce and operational modernization for Harry J. Epstein Company; in 2012, formalized the practice as Thick Arts LLC with HJE as the LLC's first client.", status: "active", citationRequired: false, surfaces: ["resumes/2026-08-14"] },
      { key: "archive-note", text: "The professional practice began by 2009; it was formalized as Thick Arts LLC in 2012, with Harry J. Epstein Company as the LLC's first client during a 2009-2015 engagement.", status: "active", citationRequired: false, surfaces: ["docs/knowledge-bank/projects/harry-j-epstein.md", "docs/knowledge-bank/timelines/practice-2004-present.md"] }
    ],
    evidence: [
      { sourceId: firstPartySourceId, relationship: "direct-support", supports: ["first-client relationship", "professional practice active from 2009", "bounded 2009-2015 HJE client period"], confidence: "high", renderCitation: false },
      { sourceId: dosSourceId, relationship: "corroborating", supports: ["the LLC existed during the client engagement", "July 6, 2012 legal formation date"], confidence: "high", renderCitation: false }
    ],
    boundaries: [
      "Use 2009-present only for the combined independent practice and later LLC, not for the legal entity alone.",
      "Use 2009-2015 for the HJE client engagement and July 6, 2012 for the LLC's initial DOS filing.",
      "Do not turn the continuing practice into a claim that HJE remained a client after 2015.",
      "Do not infer every contract, invoice, billing month, or maintenance interaction from the maintained portfolio range."
    ],
    antiClaims: ["Harry J. Epstein Company is a current client of Thick Arts LLC", "Thick Arts LLC legally existed in 2009", "the HJE client engagement ended in 2011", "the HJE client engagement continued from 2009 to the present"],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  },
  {
    id: formationClaimId,
    project: "harry-j-epstein",
    internalClaim: "The New York Department of State records July 6, 2012 as the initial DOS filing date for THICK ARTS LLC.",
    status: "confirmed",
    projections: [
      { key: "resume-html", text: "In 2012, formalized the practice as Thick Arts LLC.", status: "active", citationRequired: false, surfaces: ["resumes/2026-08-14"] },
      { key: "archive-note", text: "Thick Arts LLC's initial DOS filing date was July 6, 2012.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/sources/nys-dos-thick-arts-llc-formation-2012-07-06.md", "docs/knowledge-bank/projects/harry-j-epstein.md"] }
    ],
    evidence: [
      { sourceId: dosSourceId, relationship: "direct-support", supports: ["July 6, 2012 initial DOS filing date", "THICK ARTS LLC as a domestic limited liability company"], locator: "Initial DOS Filing Date and Entity Type fields", confidence: "high", renderCitation: true }
    ],
    boundaries: ["The filing date is the legal-entity date, not the beginning of Jamie's independent professional practice.", "The official entity record does not identify any client or establish the duration of any client engagement."],
    antiClaims: ["Thick Arts LLC was legally formed in 2009", "the Department of State record establishes Harry J. Epstein Company as a client"],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  }
];

export const hjeClientChronologyAugust2026 = { intakeItems, observations, sources, claims };
