import type { KnowledgeBank } from "./schema.ts";

type NycacGovernmentInterfaceBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

export const nycacGovernmentInterfaceBatchRecords: NycacGovernmentInterfaceBatch = {
  sources: [
    {
      id: "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017",
      title:
        "Joint Finance and Cultural Affairs hearing transcript: Fiscal Year 2018 Executive Budget",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-05-19",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://legistar.council.nyc.gov/View.ashx?GUID=68A2E207-53EA-43CA-A03E-F879A113464E&ID=5271559&M=F",
      preferredPublicUrl: "canonical",
      publicCitation:
        "New York City Council, joint Finance and Cultural Affairs Fiscal Year 2018 Executive Budget hearing transcript, May 19, 2017.",
      publicNote:
        "In his formal Council testimony, DCLA Commissioner Tom Finkelpearl cited NYC Artist Coalition's formation after a DCLA-hosted DIY arts-community meeting while describing expanded direct public feedback and the power of convening around a common cause.",
      supportsGenerally: [
        "Tom Finkelpearl referred to NYC Artist Coalition in formal testimony to the City Council",
        "he linked the coalition's formation to a DCLA-hosted DIY arts-community meeting",
        "he presented the coalition while explaining the value of direct public feedback and reciprocal public relationships during CreateNYC"
      ],
      doesNotEstablish: [
        "that Finkelpearl said he personally needed Jamie or NYC Artist Coalition",
        "Finkelpearl's private motives",
        "Jamie's individual authorship of the coalition's formation",
        "that DCLA adopted every coalition recommendation",
        "a complete census of every Finkelpearl reference in every Council record"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-NYCAC-GOVERNMENT-INTERFACE-2017-2019",
      project: "nyc-artist-coalition",
      internalClaim:
        "Official Council transcripts show NYC Artist Coalition functioning as a durable interface between cultural spaces and city government: DCLA Commissioner Tom Finkelpearl cited its formation as evidence of public-engagement value in 2017, and Council Chair Rory Lancman used its FOIL-derived MARCH analysis in agency oversight in 2019.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "NYC Artist Coalition became a durable interface between cultural spaces and city government. In 2017, DCLA Commissioner Tom Finkelpearl cited its formation in Council testimony while explaining the value of expanded public feedback. In 2019, Council Chair Rory Lancman used the coalition's FOIL-derived MARCH analysis to question NYPD and proposed a follow-up meeting with the coalition.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017",
          relationship: "direct-support",
          supports: [
            "Finkelpearl's Council reference to NYC Artist Coalition",
            "the direct-public-feedback context",
            "the coalition's formation after a DCLA-hosted DIY meeting"
          ],
          locator: "Transcript pages 91-93, especially page 92",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYC-COUNCIL-MARCH-HEARING-2019",
          relationship: "direct-support",
          supports: [
            "Council use of coalition FOIL analysis",
            "questions to NYPD about non-enforcement outcomes and racial disparities",
            "proposed follow-up meeting with the coalition"
          ],
          locator: "Transcript pages 15-28",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-CREATENYC-NYCAC-APPENDIX-2017",
          relationship: "corroborating",
          supports: [
            "coalition recommendations entered the CreateNYC public record",
            "the recommendations addressed community-driven cultural spaces"
          ],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "The records establish demonstrated institutional use, not officials' private motives or institutional dependence on one coalition.",
        "Credit NYC Artist Coalition collectively; do not assign Jamie sole authorship of every recommendation, FOIL analysis, testimony, or policy outcome.",
        "Connect Jamie to the identity, web, participation, and documentation systems he helped build through separately supported claims."
      ],
      antiClaims: [
        "Finkelpearl said he needed Jamie personally",
        "DCLA, the Council, or Rafael Espinal depended solely on NYC Artist Coalition",
        "Jamie alone produced the MARCH analysis",
        "NYC Artist Coalition alone caused Cabaret Law repeal, Office of Nightlife creation, or MARCH reform"
      ],
      researchInquiryIds: ["INQ-NYCAC-FINKELPEARL-COUNCIL-REFERENCE-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex official-record review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NYCAC-FINKELPEARL-COUNCIL-REFERENCE-2026",
      project: "nyc-artist-coalition",
      question:
        "Did Tom Finkelpearl refer to NYC Artist Coalition in City Council testimony, and what do official records establish about the coalition's value to DCLA, the Council, and Council Member Rafael Espinal?",
      methods: [
        "Searched the official NYC Council Legistar index for combinations of Finkelpearl, NYC Artist Coalition, Artist Coalition, DIY arts community, and CreateNYC.",
        "Downloaded and text-searched the recovered May 19, 2017 joint budget hearing transcript.",
        "Rechecked the June 19, 2017 Cabaret Law and February 11, 2019 MARCH hearing transcripts for Finkelpearl and coalition references.",
        "Compared direct official statements with the City-hosted CreateNYC appendix and existing official enactment records.",
        "Separated directly stated institutional use from bounded interpretation about why officials benefited from the coalition."
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "One direct Finkelpearl reference was recovered in the official May 19, 2017 Council budget-hearing transcript.",
        "Finkelpearl placed NYC Artist Coalition in a passage about close reciprocal relationships with the public, expanded direct feedback, and the power of bringing people together around a common cause.",
        "He stated that the coalition formed after DCLA hosted a January meeting for the DIY arts community.",
        "The June 19, 2017 Cabaret Law transcript does not contain Finkelpearl's name; DCLA was represented by Deputy Commissioner Kristen Sakoda.",
        "The February 11, 2019 MARCH transcript does not contain Finkelpearl's name, but it shows Council Chair Rory Lancman repeatedly using coalition FOIL analysis to question NYPD and proposing a meeting with the coalition.",
        "The official records support describing NYC Artist Coalition as a usable civic interface and evidence-producing oversight partner."
      ],
      limitations: [
        "This is a bounded search of official indexed records and three closely relevant full transcripts, not a guaranteed census of every Council attachment or imperfectly indexed scan.",
        "No recovered source says that Finkelpearl, DCLA, the Council, or Espinal 'needed' Jamie or the coalition in those words.",
        "The records establish public use and benefit; explanations of private motive remain inference.",
        "The records do not allocate individual authorship for every coalition artifact or establish sole causality for legislation and agency outcomes."
      ],
      sourceIds: [
        "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017",
        "SRC-NYC-COUNCIL-CABARET-HEARING-2017",
        "SRC-NYC-COUNCIL-MARCH-HEARING-2019",
        "SRC-CREATENYC-NYCAC-APPENDIX-2017",
        "SRC-NYC-MOME-OFFICE-NIGHTLIFE-2017",
        "SRC-NYC-COUNCIL-CABARET-REPEAL-2017"
      ],
      publicSummary:
        "Official Council records show Finkelpearl citing NYC Artist Coalition as an example of expanded public engagement in 2017 and the Council using coalition FOIL research as oversight infrastructure in 2019. They establish institutional use, not private motive or sole causality."
    }
  ]
};
