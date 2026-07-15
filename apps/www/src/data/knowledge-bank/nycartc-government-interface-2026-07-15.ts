import type {
  ClaimRecord,
  EntityRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchInquiry,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

const inquiryId = "INQ-NYCARTC-DCLA-COUNCIL-INTERFACE-2026";
const taskId = "TASK-NYCARTC-INSTITUTIONAL-INTERFACE-CORROBORATION";

export const nycArtCGovernmentInterfaceEntities = [
  {
    id: "ENT-NYC-DCLA",
    kind: "institution",
    label: "New York City Department of Cultural Affairs",
    publicSafeSummary: "The city agency that led the CreateNYC cultural-planning process during the coalition's formation.",
    aliases: ["DCLA", "NYC Cultural Affairs"],
    relatedEntityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-TOM-FINKELPEARL"],
    status: "historical"
  },
  {
    id: "ENT-NYC-COUNCIL",
    kind: "institution",
    label: "New York City Council",
    publicSafeSummary: "New York City's legislative body and a recurring public-hearing, oversight, and policy interface for NYC Artist Coalition work.",
    aliases: ["NYC Council", "City Council"],
    relatedEntityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-RAFAEL-ESPINAL"],
    status: "historical"
  },
  {
    id: "ENT-TOM-FINKELPEARL",
    kind: "person",
    label: "Tom Finkelpearl",
    publicSafeSummary: "Commissioner of the New York City Department of Cultural Affairs during the 2017 CreateNYC process.",
    aliases: ["Thomas Finkelpearl"],
    relatedEntityIds: ["ENT-NYC-DCLA", "ENT-NYC-ARTIST-COALITION"],
    status: "historical"
  },
  {
    id: "ENT-RAFAEL-ESPINAL",
    kind: "person",
    label: "Rafael Espinal",
    publicSafeSummary: "New York City Council member who sponsored the 2017 Office of Nightlife and Cabaret Law repeal legislation.",
    aliases: ["Council Member Rafael Espinal"],
    relatedEntityIds: ["ENT-NYC-COUNCIL", "ENT-NYC-ARTIST-COALITION", "ENT-OFFICE-OF-NIGHTLIFE", "ENT-CABARET-LAW-REPEAL"],
    status: "historical"
  }
] satisfies EntityRecord[];

export const nycArtCGovernmentInterfaceIntake = [
  {
    id: "INTAKE-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017",
    receivedAt: "2026-07-15",
    kind: "public-url",
    publicSafeSummary: "Official Council transcript in which Commissioner Tom Finkelpearl connected CreateNYC's reciprocal public-engagement process with the formation of NYC Artist Coalition.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=68A2E207-53EA-43CA-A03E-F879A113464E&ID=5271559&M=F",
    entityIds: ["ENT-NYC-DCLA", "ENT-NYC-COUNCIL", "ENT-TOM-FINKELPEARL", "ENT-NYC-ARTIST-COALITION"],
    disposition: "source-created",
    sourceIds: ["SRC-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017"],
    claimIds: ["CLM-NYCARTC-DCLA-RECIPROCAL-PUBLIC-INTERFACE-2017", "CLM-NYCARTC-FINKELPEARL-TESTIMONY-SIGNIFICANCE-2017", "CLM-NYCARTC-INSTITUTIONAL-NEED-INTERPRETATION-2026"],
    researchTaskIds: [taskId],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-CREATENYC-NYC-ARTISTS-2017",
    receivedAt: "2026-07-15",
    kind: "public-url",
    publicSafeSummary: "Official CreateNYC page crediting a DCLA office-hours meeting with spurring NYC Artist Coalition and crediting the coalition with recommendations and dialogue about preserving artist-led spaces.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://createnyc.cityofnewyork.us/the-cultural-plan/issue-areas/nyc-artsts/",
    entityIds: ["ENT-NYC-DCLA", "ENT-NYC-ARTIST-COALITION"],
    disposition: "source-created",
    sourceIds: ["SRC-CREATENYC-NYC-ARTISTS-2017"],
    claimIds: ["CLM-NYCARTC-DCLA-RECIPROCAL-PUBLIC-INTERFACE-2017", "CLM-NYCARTC-FINKELPEARL-TESTIMONY-SIGNIFICANCE-2017", "CLM-NYCARTC-INSTITUTIONAL-NEED-INTERPRETATION-2026"],
    researchTaskIds: [taskId],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-CREATENYC-NYCARTC-RECOMMENDATIONS-2017",
    receivedAt: "2026-07-15",
    kind: "public-url",
    publicSafeSummary: "Coalition recommendations preserved in the official CreateNYC appendix, translating informal-space concerns into bounded administrative and policy proposals.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect5_NYC-Artist-Coalition-DIY-Community.pdf",
    entityIds: ["ENT-NYC-DCLA", "ENT-TOM-FINKELPEARL", "ENT-NYC-ARTIST-COALITION", "ENT-CABARET-LAW-REPEAL"],
    disposition: "source-created",
    sourceIds: ["SRC-CREATENYC-NYCARTC-RECOMMENDATIONS-2017"],
    claimIds: ["CLM-NYCARTC-DCLA-RECIPROCAL-PUBLIC-INTERFACE-2017", "CLM-NYCARTC-INSTITUTIONAL-NEED-INTERPRETATION-2026"],
    researchTaskIds: [taskId],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-NYC-COUNCIL-NIGHTLIFE-ADVISORY-BOARD-2018",
    receivedAt: "2026-07-15",
    kind: "public-url",
    publicSafeSummary: "Official Council announcement describing stakeholder voice, expertise, recommendations, and the appointment of a NYC Artist Coalition member to the Nightlife Advisory Board.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://council.nyc.gov/press/2018/07/12/1624/",
    entityIds: ["ENT-NYC-COUNCIL", "ENT-RAFAEL-ESPINAL", "ENT-NYC-ARTIST-COALITION", "ENT-OFFICE-OF-NIGHTLIFE"],
    disposition: "source-created",
    sourceIds: ["SRC-NYC-COUNCIL-NIGHTLIFE-ADVISORY-BOARD-2018"],
    claimIds: ["CLM-NYCARTC-COUNCIL-ESPINAL-POLICY-INTERFACE-2017-2018", "CLM-NYCARTC-INSTITUTIONAL-NEED-INTERPRETATION-2026"],
    researchTaskIds: [taskId],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-NYCARTC-CABARET-COUNCIL-ACTION-2017",
    receivedAt: "2026-07-15",
    kind: "public-url",
    publicSafeSummary: "Coalition-owned campaign page turning Cabaret Law repeal into district-oriented facts, maps, Council contact information, and a public action path.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://nycartc.com/cabaret/",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-NYC-COUNCIL", "ENT-RAFAEL-ESPINAL", "ENT-CABARET-LAW-REPEAL"],
    disposition: "source-created",
    sourceIds: ["SRC-NYCARTC-CABARET-COUNCIL-ACTION-2017"],
    claimIds: ["CLM-NYCARTC-COUNCIL-ESPINAL-POLICY-INTERFACE-2017-2018", "CLM-NYCARTC-INSTITUTIONAL-NEED-INTERPRETATION-2026"],
    researchTaskIds: [taskId],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-NYCARTC-CABARET-TESTIMONY-2017",
    receivedAt: "2026-07-15",
    kind: "public-url",
    publicSafeSummary: "Coalition testimony describing repeat Council participation, collective campaign work, Office of Nightlife formation input, and Rafael Espinal's legislative role.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://nycartc.com/nyc-artist-coalition-repeal-the-cabaret-law-bill-1652-testimony/",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-NYC-COUNCIL", "ENT-RAFAEL-ESPINAL", "ENT-OFFICE-OF-NIGHTLIFE", "ENT-CABARET-LAW-REPEAL"],
    disposition: "source-created",
    sourceIds: ["SRC-NYCARTC-CABARET-TESTIMONY-2017"],
    claimIds: ["CLM-NYCARTC-COUNCIL-ESPINAL-POLICY-INTERFACE-2017-2018", "CLM-NYCARTC-INSTITUTIONAL-NEED-INTERPRETATION-2026"],
    researchTaskIds: [taskId],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

export const nycArtCGovernmentInterfaceSources = [
  {
    id: "SRC-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017",
    title: "Fiscal 2018 Executive Budget hearing transcript: Department of Cultural Affairs",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-05-19",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=68A2E207-53EA-43CA-A03E-F879A113464E&ID=5271559&M=F",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, Fiscal 2018 Executive Budget hearing transcript for the Department of Cultural Affairs, May 19, 2017, pp. 89-93.",
    publicNote: "Finkelpearl described CreateNYC as an opportunity for a close reciprocal public relationship, called for more direct feedback, cited the power of bringing people together around a common cause, and then named NYC Artist Coalition's formation after a DCLA meeting.",
    intakeIds: ["INTAKE-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017"],
    supportsGenerally: ["Finkelpearl's reciprocal-public-relationship frame", "DCLA's desire for direct feedback", "NYC Artist Coalition as his concrete example of convening around a common cause"],
    doesNotEstablish: ["that DCLA created or controlled the coalition", "why Finkelpearl personally selected every example", "that DCLA adopted every coalition recommendation", "Jamie's individual contribution"]
  },
  {
    id: "SRC-CREATENYC-NYC-ARTISTS-2017",
    title: "NYC Artists",
    organization: "CreateNYC / City of New York",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://createnyc.cityofnewyork.us/the-cultural-plan/issue-areas/nyc-artsts/",
    preferredPublicUrl: "canonical",
    publicCitation: "CreateNYC, 'NYC Artists,' section on the safety and sustainability of artist-led community spaces.",
    publicNote: "The official cultural-plan record says DCLA's January 2017 DIY and alternative-art-spaces meeting spurred NYC Artist Coalition, which then organized, supplied recommendations, and drove dialogue about preserving artist-led spaces.",
    intakeIds: ["INTAKE-CREATENYC-NYC-ARTISTS-2017"],
    supportsGenerally: ["official recognition of the coalition's emergence", "organized recommendations", "dialogue about preserving artist-led spaces"],
    doesNotEstablish: ["a complete founding roster", "individual authorship of the recommendations", "adoption of every proposal", "sole coalition causation for later policy"]
  },
  {
    id: "SRC-CREATENYC-NYCARTC-RECOMMENDATIONS-2017",
    title: "NYC Artist Coalition recommendations for the CreateNYC cultural plan",
    organization: "NYC Artist Coalition / CreateNYC",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-17",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect5_NYC-Artist-Coalition-DIY-Community.pdf",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Artist Coalition, recommendations to DCLA Commissioner Tom Finkelpearl for CreateNYC, preserved in the official CreateNYC appendix, March 2017.",
    publicNote: "The document translates concerns about criminalization, administrative support, safety, permits, affordability, and agency navigation into a structured public agenda and records a town hall with DCLA and Council members Rafael Espinal and Antonio Reynoso.",
    intakeIds: ["INTAKE-CREATENYC-NYCARTC-RECOMMENDATIONS-2017"],
    supportsGenerally: ["structured coalition recommendations", "translation of small-space concerns into administrative proposals", "town-hall interface with DCLA and Council members"],
    doesNotEstablish: ["Jamie's authorship of every recommendation", "consensus among every artist or venue", "government adoption or implementation", "causal responsibility for legislation"]
  },
  {
    id: "SRC-NYC-COUNCIL-NIGHTLIFE-ADVISORY-BOARD-2018",
    title: "New York City Council and Mayor Bill de Blasio appoint members to the Nightlife Advisory Board",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-07-12",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://council.nyc.gov/press/2018/07/12/1624/",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, 'New York City Council and Mayor Bill de Blasio Appoint Members to the Nightlife Advisory Board,' July 12, 2018.",
    publicNote: "The Council described the board as a source of stakeholder voice, expertise, guidance, and formal recommendations, and identified appointee Olympia Kazi as a NYC Artist Coalition member.",
    intakeIds: ["INTAKE-NYC-COUNCIL-NIGHTLIFE-ADVISORY-BOARD-2018"],
    supportsGenerally: ["the Council's stated need for stakeholder voice and expertise", "a formal recommendation pathway", "NYC Artist Coalition representation on the board"],
    doesNotEstablish: ["that the coalition controlled the board", "that Jamie was appointed", "that every coalition priority was adopted", "that Espinal depended exclusively on the coalition"]
  },
  {
    id: "SRC-NYCARTC-CABARET-COUNCIL-ACTION-2017",
    title: "Tell NYC Council: Legalize Dance - Repeal NYC's 1926 Cabaret Law",
    organization: "NYC Artist Coalition",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-08-01",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://nycartc.com/cabaret/",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Artist Coalition, 'Tell NYC Council: Legalize Dance - Repeal NYC's 1926 Cabaret Law,' August 1, 2017.",
    publicNote: "The campaign surface connected a Council bill with public talking points, district-specific citation and license maps, Council-member contact information, and a letter to Rafael Espinal.",
    intakeIds: ["INTAKE-NYCARTC-CABARET-COUNCIL-ACTION-2017"],
    supportsGenerally: ["district-oriented policy translation", "a public Council contact path", "a coalition letter to Rafael Espinal", "Cabaret Law repeal mobilization"],
    doesNotEstablish: ["individual authorship of every page element", "unique callers or participants", "Council-member persuasion caused by the page", "sole coalition causation for repeal"]
  },
  {
    id: "SRC-NYCARTC-CABARET-TESTIMONY-2017",
    title: "NYC Artist Coalition testimony on Int. 1652-2017",
    organization: "NYC Artist Coalition",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-09-14",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://nycartc.com/nyc-artist-coalition-repeal-the-cabaret-law-bill-1652-testimony/",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Artist Coalition, testimony on Int. 1652-2017 before the New York City Council Committee on Consumer Affairs, September 14, 2017.",
    publicNote: "The testimony records repeat Council participation, collective campaign work, involvement in the Office of Nightlife formation process, and Rafael Espinal's sponsorship and coalition relationship.",
    intakeIds: ["INTAKE-NYCARTC-CABARET-TESTIMONY-2017"],
    supportsGenerally: ["repeat coalition testimony", "collective Cabaret Law campaign work", "participation in Office of Nightlife formation", "Espinal's legislative sponsorship and ally relationship"],
    doesNotEstablish: ["that the coalition authored the legislation", "that Espinal adopted every recommendation", "Jamie's authorship of the testimony", "sole coalition causation for enactment"]
  }
] satisfies SourceRecord[];

export const nycArtCGovernmentInterfaceReadings = [
  {
    id: "READ-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017",
    sourceId: "SRC-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017",
    status: "closely-read",
    readAt: "2026-07-15",
    propositions: [
      { id: "PROP-FINKELPEARL-RECIPROCAL-PUBLIC-RELATIONSHIP", text: "Finkelpearl described CreateNYC as an opportunity to reimagine DCLA's work through a close reciprocal relationship with the public and said the agency wanted more direct feedback.", relationToJamie: "project-context", supportTags: ["nycartc-dcla-reciprocal-feedback"], confidence: "high", locator: "Transcript pp. 91-92" },
      { id: "PROP-FINKELPEARL-NYCARTC-COMMON-CAUSE-EXAMPLE", text: "Immediately after citing the power of bringing people together around a common cause, Finkelpearl told the Council that NYC Artist Coalition formed after DCLA hosted a January meeting for the DIY arts community.", relationToJamie: "project-context", supportTags: ["nycartc-finkelpearl-testimony-example"], confidence: "high", locator: "Transcript p. 92" }
    ],
    limitations: ["The transcript supports the sequence and institutional frame, but Finkelpearl did not explicitly state every reason he selected NYC Artist Coalition as an example.", "The testimony does not attribute individual coalition contributions to Jamie or establish adoption of coalition proposals."],
    researchTaskIds: [taskId]
  },
  {
    id: "READ-CREATENYC-NYC-ARTISTS-2017",
    sourceId: "SRC-CREATENYC-NYC-ARTISTS-2017",
    status: "closely-read",
    readAt: "2026-07-15",
    propositions: [
      { id: "PROP-CREATENYC-NYCARTC-ORIGIN-RECOGNITION", text: "CreateNYC's official record says DCLA's January 2017 DIY and alternative-art-spaces meeting spurred the establishment of NYC Artist Coalition.", relationToJamie: "project-context", supportTags: ["nycartc-createnyc-official-origin"], confidence: "high", locator: "NYC Artists issue-area section" },
      { id: "PROP-CREATENYC-NYCARTC-DIALOGUE-RECOGNITION", text: "CreateNYC says the coalition organized, provided recommendations about safe artist-led spaces, and drove thoughtful dialogue about preserving those spaces for experimentation and community building.", relationToJamie: "collective-role", supportTags: ["nycartc-createnyc-official-recognition"], confidence: "high", locator: "NYC Artists issue-area section" }
    ],
    limitations: ["The page provides institutional recognition, not a complete founding chronology or contribution ledger.", "Its language does not establish which recommendations were adopted or assign causal shares for later legislation."],
    researchTaskIds: [taskId]
  },
  {
    id: "READ-CREATENYC-NYCARTC-RECOMMENDATIONS-2017",
    sourceId: "SRC-CREATENYC-NYCARTC-RECOMMENDATIONS-2017",
    status: "closely-read",
    readAt: "2026-07-15",
    propositions: [
      { id: "PROP-NYCARTC-CREATENYC-POLICY-TRANSLATION", text: "The coalition organized small-space concerns into recommendations covering criminalization, MARCH transparency, permits, cultural liaisons, technical support, and affordability.", relationToJamie: "collective-role", supportTags: ["nycartc-createnyc-recommendations"], confidence: "high", locator: "Recommendations pp. 4-7" },
      { id: "PROP-NYCARTC-DCLA-COUNCIL-TOWN-HALL-INTERFACE", text: "The appendix records a March 2017 Market Hotel town hall connecting the DIY community with DCLA and Council Members Rafael Espinal and Antonio Reynoso.", relationToJamie: "project-context", supportTags: ["nycartc-dcla-council-town-hall-interface"], confidence: "high", locator: "Appendix event notes p. 10" }
    ],
    limitations: ["The coalition document is a record of proposals and convening, not proof of government adoption, implementation, or impact.", "The source does not assign authorship of each recommendation or event role to Jamie."],
    researchTaskIds: [taskId]
  },
  {
    id: "READ-NYC-COUNCIL-NIGHTLIFE-ADVISORY-BOARD-2018",
    sourceId: "SRC-NYC-COUNCIL-NIGHTLIFE-ADVISORY-BOARD-2018",
    status: "closely-read",
    readAt: "2026-07-15",
    propositions: [
      { id: "PROP-NYC-COUNCIL-STAKEHOLDER-VOICE-PATH", text: "The Council described the Nightlife Advisory Board as giving stakeholders a voice and path to solutions and as a source of diverse expertise and formal recommendations to the Mayor and Council.", relationToJamie: "project-context", supportTags: ["nyc-council-stakeholder-voice-path"], confidence: "high", locator: "Council press release" },
      { id: "PROP-NYC-COUNCIL-NYCARTC-BOARD-REPRESENTATION", text: "The Council identified appointee Olympia Kazi as a NYC Artist Coalition member, placing coalition experience inside the formal advisory structure.", relationToJamie: "collective-role", supportTags: ["nycartc-nightlife-board-representation"], confidence: "high", locator: "City Council appointees" }
    ],
    limitations: ["The appointment belongs to Olympia Kazi and does not confer individual credit on Jamie.", "Representation on an advisory board does not establish control, adoption of every recommendation, or policy causation."],
    researchTaskIds: [taskId]
  },
  {
    id: "READ-NYCARTC-CABARET-COUNCIL-ACTION-2017",
    sourceId: "SRC-NYCARTC-CABARET-COUNCIL-ACTION-2017",
    status: "closely-read",
    readAt: "2026-07-15",
    propositions: [
      { id: "PROP-NYCARTC-CABARET-DISTRICT-ACTION-SYSTEM", text: "The coalition campaign translated a Council bill into public talking points, district-specific maps, Council-member contacts, and a call path for constituent action.", relationToJamie: "collective-role", supportTags: ["nycartc-cabaret-district-action-system"], confidence: "high", locator: "Campaign action page" },
      { id: "PROP-NYCARTC-ESPINAL-RECOMMENDATION-LETTER", text: "The campaign page preserves a coalition recommendation letter addressed to Council Member Rafael Espinal.", relationToJamie: "project-context", supportTags: ["nycartc-espinal-direct-policy-interface"], confidence: "high", locator: "On Our Letterhead section" }
    ],
    limitations: ["The project-owned page does not identify the author of every tool or quantify completed constituent actions.", "The campaign infrastructure does not establish that it changed any specific Council member's vote."],
    researchTaskIds: [taskId]
  },
  {
    id: "READ-NYCARTC-CABARET-TESTIMONY-2017",
    sourceId: "SRC-NYCARTC-CABARET-TESTIMONY-2017",
    status: "closely-read",
    readAt: "2026-07-15",
    propositions: [
      { id: "PROP-NYCARTC-REPEAT-COUNCIL-TESTIMONY", text: "The September testimony says the coalition returned to the Council committee three months after its earlier Cabaret Law oversight testimony.", relationToJamie: "collective-role", supportTags: ["nycartc-repeat-council-testimony"], confidence: "high", locator: "Opening paragraph" },
      { id: "PROP-NYCARTC-ESPINAL-LEGISLATIVE-COMPLEMENT", text: "The testimony credits Rafael Espinal with legislative sponsorship while describing the coalition's collective campaign and participation in the Office of Nightlife formation process.", relationToJamie: "project-context", supportTags: ["nycartc-espinal-legislative-complement"], confidence: "high", locator: "Campaign and Office of Nightlife paragraphs" }
    ],
    limitations: ["The testimony is coalition-authored advocacy, not an independent allocation of causal responsibility.", "It does not establish Jamie's authorship of the testimony or every campaign action."],
    researchTaskIds: [taskId]
  }
] satisfies SourceReading[];

export const nycArtCGovernmentInterfaceClaims = [
  {
    id: "CLM-NYCARTC-DCLA-RECIPROCAL-PUBLIC-INTERFACE-2017",
    project: "nyc-artist-coalition",
    internalClaim: "Jamie helped establish and produce a coalition participation system that converted dispersed small-space experience into organized recommendations, town halls, and continuing dialogue; DCLA's own CreateNYC record recognized the coalition as an important public interface for safe, sustainable artist-led spaces.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-NYCARTC-FACEBOOK-EVENT-CENSUS-2026", "INTAKE-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017", "INTAKE-CREATENYC-NYC-ARTISTS-2017", "INTAKE-CREATENYC-NYCARTC-RECOMMENDATIONS-2017"],
    requiredSupportTags: ["nycartc-jamie-event-system-role", "nycartc-createnyc-official-recognition", "nycartc-createnyc-recommendations", "nycartc-dcla-reciprocal-feedback"],
    composition: {
      action: "Helped establish and produce a recurring coalition interface that gathered small-space experience, organized it into recommendations and public meetings, and carried it into dialogue with DCLA.",
      intendedEnd: "Make informal and artist-led cultural spaces visible to cultural policy, connect safety with preservation rather than displacement, and give participants a usable route into city decision-making.",
      usableResult: "A repeatable public process of meetings, town halls, recommendations, and follow-up that CreateNYC itself recognized as thoughtful dialogue about preserving artist-led spaces.",
      audience: "Artists and small-space operators seeking support, DCLA staff shaping cultural policy, Council members, advocates, and hiring readers evaluating civic implementation work.",
      collectiveCredit: "The coalition interface belonged to its organizers, participants, venue hosts, partner groups, DCLA staff, and public officials; Jamie's documented event-system contribution sits within that shared work.",
      causalBoundary: "The record supports Jamie's contribution to the participation system and DCLA's recognition of the coalition separately; it does not assign him authorship of every recommendation or show that DCLA adopted every proposal."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-NYCARTC-JAMIE-EVENT-PRACTICE-2026", relationship: "private-support", supports: ["Jamie's first-person account of his event-system contribution"], propositionIds: ["PROP-NYCARTC-JAMIE-EVENT-SYSTEM-ROLE"], confidence: "moderate", renderCitation: false },
      { sourceId: "SRC-CREATENYC-NYC-ARTISTS-2017", relationship: "direct-support", supports: ["official recognition of coalition recommendations and dialogue"], propositionIds: ["PROP-CREATENYC-NYCARTC-ORIGIN-RECOGNITION", "PROP-CREATENYC-NYCARTC-DIALOGUE-RECOGNITION"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-CREATENYC-NYCARTC-RECOMMENDATIONS-2017", relationship: "direct-support", supports: ["structured policy translation and a DCLA-Council town-hall interface"], propositionIds: ["PROP-NYCARTC-CREATENYC-POLICY-TRANSLATION", "PROP-NYCARTC-DCLA-COUNCIL-TOWN-HALL-INTERFACE"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017", relationship: "corroborating", supports: ["DCLA's reciprocal-public-relationship and direct-feedback purpose"], propositionIds: ["PROP-FINKELPEARL-RECIPROCAL-PUBLIC-RELATIONSHIP"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Keep DCLA recognition distinct from adoption or funding.", "Keep Jamie's documented contribution distinct from collective recommendations, facilitation, and policy outcomes."],
    antiClaims: ["Jamie alone created or led NYC Artist Coalition.", "DCLA delegated its cultural-planning authority to the coalition.", "DCLA adopted every coalition recommendation.", "The coalition represented every artist, venue, or cultural community in New York City."],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex public-source review"]
  },
  {
    id: "CLM-NYCARTC-FINKELPEARL-TESTIMONY-SIGNIFICANCE-2017",
    project: "nyc-artist-coalition",
    internalClaim: "Finkelpearl's decision to mention NYC Artist Coalition in May 2017 Council testimony is best understood as a concrete example of CreateNYC's claimed public value: a DCLA convening had helped produce organized civic capacity, direct feedback, recommendations, and an ongoing relationship around a common cultural-policy problem.",
    status: "inference",
    maturity: "corroborated",
    intakeIds: ["INTAKE-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017", "INTAKE-CREATENYC-NYC-ARTISTS-2017"],
    requiredSupportTags: ["nycartc-dcla-reciprocal-feedback", "nycartc-finkelpearl-testimony-example", "nycartc-createnyc-official-recognition"],
    projections: [],
    evidence: [
      { sourceId: "SRC-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017", relationship: "direct-support", supports: ["the sequence and public-engagement frame within Finkelpearl's testimony"], propositionIds: ["PROP-FINKELPEARL-RECIPROCAL-PUBLIC-RELATIONSHIP", "PROP-FINKELPEARL-NYCARTC-COMMON-CAUSE-EXAMPLE"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-CREATENYC-NYC-ARTISTS-2017", relationship: "corroborating", supports: ["official recognition of the coalition's recommendations and continuing dialogue"], propositionIds: ["PROP-CREATENYC-NYCARTC-DIALOGUE-RECOGNITION"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["State this as a source-backed interpretation of the testimony's structure and context, not a quotation of Finkelpearl's private motive.", "The example demonstrated public-process value; it did not establish that DCLA controlled the coalition or implemented its full agenda."],
    antiClaims: ["Finkelpearl said DCLA could not function without NYC Artist Coalition.", "Finkelpearl endorsed every coalition position.", "Inclusion in testimony was a funding award, formal partnership, or delegation of authority.", "The testimony proves Jamie's individual role."],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex governance interpretation"]
  },
  {
    id: "CLM-NYCARTC-COUNCIL-ESPINAL-POLICY-INTERFACE-2017-2018",
    project: "nyc-artist-coalition",
    internalClaim: "Jamie helped operate NYC Artist Coalition's public participation system while the coalition turned cultural-space concerns and Espinal-sponsored policy into usable letters, district information, hearing pathways, testimony, and town halls; the Council later formalized stakeholder voice and coalition representation through the Nightlife Advisory Board.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-NYCARTC-FACEBOOK-EVENT-CENSUS-2026", "INTAKE-BEDFORD-NIGHT-MAYOR-2017", "INTAKE-NYCARTC-CABARET-COUNCIL-ACTION-2017", "INTAKE-NYCARTC-CABARET-TESTIMONY-2017", "INTAKE-NYC-COUNCIL-NIGHTLIFE-ADVISORY-BOARD-2018"],
    requiredSupportTags: ["nycartc-jamie-event-system-role", "office-nightlife-jamie-speaker", "nycartc-cabaret-district-action-system", "nycartc-repeat-council-testimony", "nyc-council-stakeholder-voice-path"],
    composition: {
      action: "Helped operate a coalition participation system that connected public policy with district information, recommendation letters, hearings, testimony, and cultural-space town halls.",
      intendedEnd: "Give affected artists and small-space operators practical ways to understand proposals, speak for themselves, and shape how nightlife policy would be implemented.",
      usableResult: "A documented pathway from coalition meetings and public tools to repeat Council testimony, dialogue with Espinal and other officials, and a formal stakeholder-advisory structure that included coalition representation.",
      audience: "Artists, venues, residents, Council members and staff, city agencies, coalition partners, and hiring readers evaluating stakeholder-centered public implementation.",
      collectiveCredit: "Espinal and Council colleagues exercised legislative authority; Olympia Kazi and many coalition participants carried testimony and representation; Jamie's documented contribution was part of the shared participation and communications system.",
      causalBoundary: "The sources establish complementary roles and recurring interaction, not that Jamie authored legislation, that the coalition determined Council action, or that any single event caused enactment."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-NYCARTC-JAMIE-EVENT-PRACTICE-2026", relationship: "private-support", supports: ["Jamie's first-person account of his event-system contribution"], propositionIds: ["PROP-NYCARTC-JAMIE-EVENT-SYSTEM-ROLE"], confidence: "moderate", renderCitation: false },
      { sourceId: "SRC-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017", relationship: "corroborating", supports: ["Jamie's named speaker role and coalition town-hall production"], propositionIds: ["PROP-BEDFORD-TOWN-HALL-SPEARHEADED", "PROP-BEDFORD-JAMIE-SPEAKER"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYCARTC-CABARET-COUNCIL-ACTION-2017", relationship: "direct-support", supports: ["district-oriented public tools and a direct policy interface with Espinal"], propositionIds: ["PROP-NYCARTC-CABARET-DISTRICT-ACTION-SYSTEM", "PROP-NYCARTC-ESPINAL-RECOMMENDATION-LETTER"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYCARTC-CABARET-TESTIMONY-2017", relationship: "direct-support", supports: ["repeat testimony and complementary coalition-Espinal roles"], propositionIds: ["PROP-NYCARTC-REPEAT-COUNCIL-TESTIMONY", "PROP-NYCARTC-ESPINAL-LEGISLATIVE-COMPLEMENT"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYC-COUNCIL-NIGHTLIFE-ADVISORY-BOARD-2018", relationship: "corroborating", supports: ["the Council's stated stakeholder-voice purpose and coalition representation"], propositionIds: ["PROP-NYC-COUNCIL-STAKEHOLDER-VOICE-PATH", "PROP-NYC-COUNCIL-NYCARTC-BOARD-REPRESENTATION"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Use complementary-role language: coalition participation infrastructure and legislative authority were different contributions.", "Credit Olympia Kazi's board appointment and testimony to her, not to Jamie."],
    antiClaims: ["Jamie authored Espinal's bills or determined the Council's votes.", "Espinal or the Council depended exclusively on NYC Artist Coalition.", "The coalition spoke for every nightlife worker, artist, venue, or resident.", "A town hall, map, letter, or hearing alone caused Cabaret Law repeal or Office of Nightlife creation."],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex public-source review"]
  },
  {
    id: "CLM-NYCARTC-INSTITUTIONAL-NEED-INTERPRETATION-2026",
    project: "nyc-artist-coalition",
    internalClaim: "The record supports understanding NYC Artist Coalition as a nonexclusive civic intermediary that lowered the cost of public listening for DCLA and the Council: it gathered situated knowledge from informal cultural spaces, translated it into proposals and constituent action, convened officials with affected publics, and sustained feedback from agenda formation through implementation. This explains why the coalition was useful to Finkelpearl and Espinal without claiming literal institutional dependence.",
    status: "inference",
    maturity: "corroborated",
    intakeIds: ["INTAKE-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017", "INTAKE-CREATENYC-NYC-ARTISTS-2017", "INTAKE-CREATENYC-NYCARTC-RECOMMENDATIONS-2017", "INTAKE-NYCARTC-CABARET-COUNCIL-ACTION-2017", "INTAKE-NYCARTC-CABARET-TESTIMONY-2017", "INTAKE-NYC-COUNCIL-NIGHTLIFE-ADVISORY-BOARD-2018"],
    requiredSupportTags: ["nycartc-dcla-reciprocal-feedback", "nycartc-createnyc-official-recognition", "nycartc-createnyc-recommendations", "nycartc-cabaret-district-action-system", "nyc-council-stakeholder-voice-path"],
    projections: [],
    evidence: [
      { sourceId: "SRC-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017", relationship: "direct-support", supports: ["DCLA's reciprocal-public-relationship and direct-feedback frame"], propositionIds: ["PROP-FINKELPEARL-RECIPROCAL-PUBLIC-RELATIONSHIP", "PROP-FINKELPEARL-NYCARTC-COMMON-CAUSE-EXAMPLE"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-CREATENYC-NYC-ARTISTS-2017", relationship: "corroborating", supports: ["official recognition of organized recommendations and continuing dialogue"], propositionIds: ["PROP-CREATENYC-NYCARTC-DIALOGUE-RECOGNITION"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-CREATENYC-NYCARTC-RECOMMENDATIONS-2017", relationship: "direct-support", supports: ["translation of situated concerns into bounded proposals and public dialogue"], propositionIds: ["PROP-NYCARTC-CREATENYC-POLICY-TRANSLATION", "PROP-NYCARTC-DCLA-COUNCIL-TOWN-HALL-INTERFACE"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYCARTC-CABARET-COUNCIL-ACTION-2017", relationship: "direct-support", supports: ["translation of legislation into constituent-facing action"], propositionIds: ["PROP-NYCARTC-CABARET-DISTRICT-ACTION-SYSTEM"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYC-COUNCIL-NIGHTLIFE-ADVISORY-BOARD-2018", relationship: "corroborating", supports: ["the Council's explicit stakeholder-voice, expertise, and recommendation rationale"], propositionIds: ["PROP-NYC-COUNCIL-STAKEHOLDER-VOICE-PATH"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["This is an institutional-function interpretation synthesized from public records, not a claim about private motives or exclusive dependency.", "Use 'useful,' 'valuable,' or 'served as' rather than saying an official or institution literally needed the coalition unless a direct source supports that wording."],
    antiClaims: ["DCLA, the Council, Finkelpearl, or Espinal could not act without NYC Artist Coalition.", "The coalition held formal governmental authority.", "Government engagement proves endorsement of every coalition position.", "NYC Artist Coalition represented the whole cultural or nightlife field.", "Jamie individually supplied every intermediary function or caused the legislative outcomes."],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex governance interpretation"]
  }
] satisfies ClaimRecord[];

export const nycArtCGovernmentInterfaceResearchTasks = [
  {
    id: taskId,
    project: "nyc-artist-coalition",
    question: "What participant or official accounts can further distinguish why DCLA, the Council, Tom Finkelpearl, and Rafael Espinal valued NYC Artist Coalition's participation infrastructure, and which recommendations entered policy or implementation?",
    status: "open",
    priority: "high",
    openedAt: "2026-07-15",
    intakeIds: nycArtCGovernmentInterfaceIntake.map((item) => item.id),
    sourceIds: nycArtCGovernmentInterfaceSources.map((item) => item.id),
    claimIds: ["CLM-NYCARTC-DCLA-RECIPROCAL-PUBLIC-INTERFACE-2017", "CLM-NYCARTC-FINKELPEARL-TESTIMONY-SIGNIFICANCE-2017", "CLM-NYCARTC-COUNCIL-ESPINAL-POLICY-INTERFACE-2017-2018", "CLM-NYCARTC-INSTITUTIONAL-NEED-INTERPRETATION-2026"],
    nextActions: [
      "Invite Tom Finkelpearl, Rafael Espinal, relevant former DCLA and Council staff, Olympia Kazi, and other coalition participants to describe the relationship in their own words.",
      "Recover any written DCLA testimony, briefing notes, correspondence, or public meeting records that clarify why NYC Artist Coalition was selected as an example and how recommendations were evaluated.",
      "Trace each 2017 coalition recommendation to adopted, partially adopted, rejected, superseded, or not-recovered outcomes without inferring causation.",
      "Seek permissioned collaborator evidence that can attribute Jamie's specific event, web, communications, facilitation, and policy-translation work more granularly.",
      "Keep private correspondence and unapproved recollections outside the public repository; store only public-safe conclusions and stable non-sensitive identifiers."
    ]
  }
] satisfies ResearchTask[];

export const nycArtCGovernmentInterfaceInquiries = [
  {
    id: inquiryId,
    project: "nyc-artist-coalition",
    question: "Why was NYC Artist Coalition useful to DCLA, the Council, Tom Finkelpearl, and Rafael Espinal, and what part of that institutional interface can be attributed to Jamie?",
    methods: [
      "Close-read the May 2017 official Council transcript, preserving the sequence of Finkelpearl's claims.",
      "Compare the transcript with official CreateNYC recognition and the coalition recommendations preserved in the CreateNYC appendix.",
      "Review coalition Council-action and testimony records alongside the Council's stated purpose for the Nightlife Advisory Board.",
      "Connect institutional records to already-corroborated evidence of Jamie's event-system, town-hall, and coalition-organizer role.",
      "Separate direct evidence, collective contribution, governance inference, private motive, and causal claims."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "Finkelpearl explicitly framed CreateNYC as a reciprocal public relationship, asked for more direct feedback, cited the power of convening around common cause, and then named NYC Artist Coalition's formation.",
      "CreateNYC officially credited the coalition with organizing, providing recommendations, and driving dialogue about safe and sustainable artist-led spaces.",
      "The coalition translated dispersed concerns into administrative recommendations, district-specific public tools, testimony, hearings, and town halls.",
      "The Council explicitly described its nightlife advisory structure as a source of stakeholder voice, expertise, guidance, and recommendations, and appointed a NYC Artist Coalition member.",
      "The public record supports complementary roles: Espinal supplied legislative sponsorship; the coalition supplied participation, translation, constituency, and implementation-feedback infrastructure.",
      "Jamie's documented contribution is strongest at the level of building and operating the coalition's participation and public-communications system, within collective work."
    ],
    limitations: [
      "No source recovered in this pass states Finkelpearl's complete personal motive for selecting NYC Artist Coalition as a testimony example.",
      "No source establishes literal or exclusive institutional dependency on the coalition.",
      "The sources do not allocate every recommendation, event role, communication, or policy outcome among individual coalition participants.",
      "Government recognition, attendance, testimony, and representation do not by themselves establish adoption, impact, or causation."
    ],
    sourceIds: nycArtCGovernmentInterfaceSources.map((item) => item.id),
    publicSummary: "Public records support understanding NYC Artist Coalition as a civic-cultural intermediary: it gathered situated knowledge from informal spaces, translated it into recommendations and public action, convened affected people with officials, and sustained feedback across planning, legislation, and implementation. Jamie helped build and operate that interface, but the work and outcomes remain collective."
  }
] satisfies ResearchInquiry[];

export const nycArtCGovernmentInterfaceDecisions = nycArtCGovernmentInterfaceClaims
  .filter((claim) => claim.maturity === "public-ready")
  .map((claim) => ({
    id: `DEC-${claim.id.replace(/^CLM-/, "")}-DEFER`,
    claimId: claim.id,
    surface: "future-portfolio-composition",
    decision: "defer" as const,
    rationale: "The claim is public-ready and retained as high-value reserve material, but this research pass does not automatically expand the live portfolio argument.",
    decidedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex editorial review"]
  })) satisfies ProjectionDecision[];
