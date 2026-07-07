export type ProofClaim = {
  id: string;
  approvedWording: string;
  evidenceBasis: string[];
  publicSources?: Array<{ label: string; url: string }>;
  avoid: string[];
};

export const proofClaims: ProofClaim[] = [
  {
    id: "operating-structure",
    approvedWording:
      "14+ years creating operating structure across civic, cultural, small-business, and technical environments",
    evidenceBasis: [
      "Approved resume",
      "Portfolio project record across e-commerce, civic documentation, community systems, and source-backed memory"
    ],
    avoid: ["Reducing the role to tracking, note-taking, or general support"]
  },
  {
    id: "hje-revenue-growth",
    approvedWording:
      "Contributed to 2x revenue growth while modernizing e-commerce and operations for a legacy industrial business",
    evidenceBasis: [
      "Approved resume",
      "Long-running Harry J. Epstein Company web, e-commerce, analytics, marketing, content, and operations role"
    ],
    publicSources: [
      {
        label: "ToolGuyd: Harry Epstein launches online store",
        url: "https://toolguyd.com/harry-epstein-launches-new-online-store/"
      },
      {
        label: "KCUR: online sales and public business context",
        url: "https://www.kcur.org/show/central-standard/2016-04-21/how-flying-dolphins-kept-this-old-school-kansas-city-hardware-store-alive"
      },
      {
        label: "Harry J. Epstein Company about page",
        url: "https://www.harryepstein.com/pages/about-us"
      }
    ],
    avoid: ["Caused 2x revenue growth", "Private dashboards or revenue detail"]
  },
  {
    id: "fairrent-operating-memory",
    approvedWording:
      "Built shared civic operating memory: running minutes, source maps, action trackers, and review lanes across a commercial-rent campaign",
    evidenceBasis: [
      "Approved Commercial Rent Stabilization running-minutes summary",
      "Source maps, action trackers, public-data framing, review lanes, and public-safe explanations"
    ],
    avoid: ["Led the movement", "Owned the bill", "Provided legal advice"]
  },
  {
    id: "nac-campaign-infrastructure",
    approvedWording:
      "Designed NYC Artist Coalition's visual identity and built public campaign websites for cultural-space safety, support, and anti-displacement work",
    evidenceBasis: [
      "Jamie-approved authorship claim",
      "Public NYC Artist Coalition, Let NYC Dance, Save NYC Spaces, Talks Not Raids, and FairRentNYC campaign websites"
    ],
    publicSources: [
      { label: "NYC Artist Coalition", url: "https://nycartc.com/" },
      { label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" },
      { label: "Talks Not Raids", url: "https://talksnotraids.com/" },
      { label: "Let NYC Dance", url: "https://letnycdance.nycartc.com/" },
      { label: "Save NYC Spaces", url: "https://savenycspaces.nycartc.com/" }
    ],
    avoid: [
      "Claiming Jamie alone won policy outcomes",
      "Private coalition records, contact lists, strategy notes, or CMS/admin details"
    ]
  },
  {
    id: "wowlist-active-scenes",
    approvedWording:
      "Co-built a Django / Ember community calendar used across 35+ active city scenes",
    evidenceBasis: [
      "Approved WOWList aggregate report",
      "35+ active city scenes defined as city or region entries with at least 50 geocoded posts/events"
    ],
    avoid: ["Official city chapters", "Hundreds of active cities", "Raw user or organizer records"]
  },
  {
    id: "sunday-dinner-196",
    approvedWording:
      "Created repeatable hosting and continuity systems across 300+ gatherings and 20+ resident artists",
    evidenceBasis: [
      "Jamie-approved aggregate count",
      "Historical Sunday Dinner / 196 event and residency records"
    ],
    avoid: ["Guest lists", "Raw attendance records", "Unapproved photos or participant names"]
  },
  {
    id: "callnyc-politico",
    approvedWording:
      "Built CallNYC.org, an archived civic-data prototype that translated New York City Council constituent-services open data into resident-facing issue pathways and next-step guidance",
    evidenceBasis: [
      "CallNYC project archive",
      "Politico New York coverage by Miranda Neubauer, March 14, 2016"
    ],
    publicSources: [
      {
        label: "Politico New York archived PDF",
        url: "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf"
      }
    ],
    avoid: ["Official City Council service", "Current civic service", "Legal or emergency guidance"]
  }
];

export const homeProofItems = proofClaims
  .filter((claim) =>
    [
      "operating-structure",
      "hje-revenue-growth",
      "fairrent-operating-memory",
      "nac-campaign-infrastructure",
      "wowlist-active-scenes",
      "sunday-dinner-196"
    ].includes(claim.id)
  )
  .map((claim) => claim.approvedWording);

export const resumeHighlights = homeProofItems;
