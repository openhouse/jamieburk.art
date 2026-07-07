export type ProofStatus =
  | "approved"
  | "needs-approval"
  | "public-safe-summary"
  | "evidence-needed"
  | "omit-from-production"
  | "protected";

export type ProofSupportLevel =
  | "strong"
  | "moderate"
  | "needs-evidence"
  | "private-evidence";

export type ProofLocation =
  | "home"
  | "work"
  | "case-study"
  | "resume-page"
  | "resume-pdf"
  | "lab"
  | "technical-operations";

export type ProofClaim = {
  id: string;
  label: string;
  shortWording: string;
  longWording?: string;
  status: ProofStatus;
  supportLevel: ProofSupportLevel;
  allowedLocations: ProofLocation[];
  sourceBasis?: string[];
  publicSources?: Array<{ label: string; url: string }>;
  doNotSay: string[];
  protectedNotes?: string;
  chadLensNote?: string;
};

export const proofClaims: ProofClaim[] = [
  {
    id: "claim-operating-structure-14-years",
    label: "14+ Years Operating Structure",
    shortWording:
      "14+ years creating operating structure across civic, cultural, small-business, and technical environments",
    status: "approved",
    supportLevel: "strong",
    allowedLocations: ["home", "work", "resume-page", "resume-pdf", "technical-operations"],
    sourceBasis: ["approved resume", "selected public-safe project record"],
    doNotSay: ["14+ years in one continuous formal title"],
    chadLensNote:
      "Use this as the career pattern, then quickly show what Jamie made usable."
  },
  {
    id: "claim-hje-revenue-growth",
    label: "Harry J. Epstein Online Growth",
    shortWording:
      "Legacy e-commerce modernization tied to online growth, marketing, analytics, content, and operating workflows",
    longWording:
      "Jamie contributed to online growth while supporting e-commerce, analytics, marketing, content, and operating workflow improvements for an 80+ year-old industrial supply business.",
    status: "public-safe-summary",
    supportLevel: "private-evidence",
    allowedLocations: ["home", "work", "case-study", "resume-page", "technical-operations"],
    sourceBasis: [
      "approved resume",
      "Harry J. Epstein public website",
      "public-source notes",
      "protected internal evidence"
    ],
    publicSources: [
      { label: "Harry J. Epstein Company", url: "https://www.harryepstein.com/" }
    ],
    doNotSay: [
      "Jamie alone caused revenue growth",
      "Jamie single-handedly doubled revenue",
      "Private dashboards, customer data, or internal revenue detail"
    ],
    protectedNotes:
      "Internal dashboards, customer records, vendor terms, and detailed revenue records stay private.",
    chadLensNote:
      "Strongest safe public verb is contributed to, supported, translated, or modernized."
  },
  {
    id: "claim-nac-campaign-infrastructure",
    label: "NYC Artist Coalition Campaign Infrastructure",
    shortWording:
      "NYC Artist Coalition / FairRentNYC systems work for cultural-space safety, nightlife support, anti-displacement, and Commercial Rent Stabilization",
    longWording:
      "Jamie is a co-founding member of NYC Artist Coalition whose public-safe lane includes civic systems, documentation architecture, campaign web infrastructure, source mapping, action tracking, policy communications, cultural-space field follow-up, and careful public/private boundary-setting.",
    status: "public-safe-summary",
    supportLevel: "strong",
    allowedLocations: ["home", "work", "case-study", "resume-page", "technical-operations"],
    sourceBasis: [
      "public campaign pages",
      "approved resume",
      "public-safe running minutes",
      "Jamie review confirmation"
    ],
    publicSources: [
      { label: "NYC Artist Coalition", url: "https://nycartc.com/" },
      { label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" },
      { label: "Let NYC Dance", url: "https://letnycdance.nycartc.com/" },
      { label: "Talks Not Raids", url: "https://talksnotraids.com/" }
    ],
    doNotSay: [
      "Jamie alone led NYC Artist Coalition",
      "Jamie alone won policy outcomes",
      "Jamie owns partner organizations or all campaign content"
    ],
    protectedNotes:
      "Private coalition records, contact lists, admin details, analytics, strategy notes, and unapproved partner material stay private.",
    chadLensNote:
      "Keep collective credit visible while making Jamie's systems role legible."
  },
  {
    id: "claim-crs-campaign-memory",
    label: "Commercial Rent Stabilization Campaign Memory",
    shortWording:
      "30+ pages of Commercial Rent Stabilization campaign memory, source maps, action tracking, and public-data framing",
    longWording:
      "Jamie helped structure and steward shared Commercial Rent Stabilization campaign-memory infrastructure: running minutes, source maps, action trackers, open questions, public-data framing, and public/private boundaries.",
    status: "public-safe-summary",
    supportLevel: "private-evidence",
    allowedLocations: ["home", "work", "case-study", "resume-page", "technical-operations"],
    sourceBasis: [
      "public-safe running-minutes summary",
      "public-data memos",
      "legislative provenance/redline material",
      "protected working records"
    ],
    doNotSay: [
      "Jamie owned the bill",
      "Jamie provided legal advice",
      "Jamie spoke for every coalition collaborator"
    ],
    protectedNotes:
      "Private coalition notes, legal-review material, strategy context, stakeholder lists, private messages, and unapproved quotes stay private.",
    chadLensNote:
      "Documentation is the operating system here, not clerical support."
  },
  {
    id: "claim-callnyc-civic-data-prototype",
    label: "CallNYC Civic Data Prototype",
    shortWording:
      "Archived civic-data prototype translating constituent-services open data into resident-facing issue pathways",
    longWording:
      "Jamie built CallNYC.org as an archived civic-tech prototype that translated New York City Council constituent-services open data into resident-facing issue pathways, district context, and possible next steps.",
    status: "approved",
    supportLevel: "strong",
    allowedLocations: ["work", "case-study", "resume-page", "technical-operations"],
    sourceBasis: ["archived project context", "approved resume", "public-safe case summary"],
    doNotSay: [
      "Official City Council service",
      "Current service",
      "Legal guidance",
      "Emergency guidance"
    ],
    chadLensNote:
      "Name the user-facing transformation: open data became issue pathways."
  },
  {
    id: "claim-wowlist-city-ecosystems",
    label: "WOWList City Ecosystems",
    shortWording:
      "WOWList archive: 1,800+ users, 16,000+ event posts, and 35+ active city/region scenes by 2017",
    longWording:
      "Jamie co-built a Django / Ember community-calendar platform whose local archive supports aggregate public-safe claims about users, event posts, follows, saves, and active city/region scenes.",
    status: "public-safe-summary",
    supportLevel: "private-evidence",
    allowedLocations: ["home", "work", "case-study", "resume-page", "technical-operations"],
    sourceBasis: ["public-safe local archive aggregate analysis", "approved resume"],
    doNotSay: [
      "Current active service",
      "Official city chapters",
      "Complete public archive",
      "Raw user records",
      "Raw organizer records"
    ],
    protectedNotes:
      "User records, organizer contact lists, database exports, private media, access material, and raw archive records stay private.",
    chadLensNote:
      "This is product-operations proof: community vocabulary became a usable platform."
  },
  {
    id: "claim-196-gatherings-residents",
    label: "196 / Sunday Dinner Participation Infrastructure",
    shortWording:
      "300+ gatherings and 20+ resident artists supported through repeatable hosting, onboarding, facilitation, and continuity systems",
    status: "public-safe-summary",
    supportLevel: "private-evidence",
    allowedLocations: ["home", "work", "case-study", "resume-page", "technical-operations"],
    sourceBasis: ["approved resume", "aggregate workbook review", "Jamie review confirmation"],
    doNotSay: [
      "Publish guest lists",
      "Name participants without consent",
      "Publish addresses, attendance records, private stories, or unapproved photos"
    ],
    protectedNotes:
      "Participant identities, guest lists, attendance records, private stories, addresses, and unapproved photos stay private.",
    chadLensNote:
      "Do not reduce this to hosting; frame the participation system."
  },
  {
    id: "claim-kc-town-hall-funding-recommendation",
    label: "KC Town Hall Public-Benefit Documentation",
    shortWording:
      "Adaptive-reuse planning and public-benefit documentation tied to a $490,539 public-funding recommendation",
    status: "public-safe-summary",
    supportLevel: "private-evidence",
    allowedLocations: ["case-study", "technical-operations"],
    sourceBasis: ["public-safe KC packet", "public-record context", "approved resume"],
    doNotSay: [
      "Jamie solely secured funding",
      "Funding was fully disbursed",
      "Redevelopment was completed unless separately verified"
    ],
    protectedNotes:
      "Private legal, property, banking, partner-sensitive, and finance-sensitive material stays private.",
    chadLensNote:
      "Say recommendation unless disbursement or final funding status is separately verified."
  },
  {
    id: "claim-source-backed-team-memory-lab",
    label: "Source-Backed Team Memory Lab",
    shortWording:
      "Lab method for turning meetings, decisions, open questions, and source materials into human-reviewable operating memory",
    status: "approved",
    supportLevel: "moderate",
    allowedLocations: ["lab", "technical-operations"],
    sourceBasis: ["source-backed memory proposal", "Noting.us system spec", "practice record"],
    doNotSay: [
      "Finished SaaS",
      "AI replacement for judgment",
      "Legal advice system",
      "Medical advice system",
      "Therapeutic advice system",
      "Private archive browser"
    ],
    chadLensNote:
      "This can support bridge-work conversations, but it should not overtake the homepage."
  },
  {
    id: "claim-ai-evals-certificate",
    label: "AI Evals Professional Development",
    shortWording:
      "Completed AI Evals for Engineers & PMs in 2026, strengthening evals, traces, annotation, retrieval-quality, and human-review practice",
    status: "approved",
    supportLevel: "strong",
    allowedLocations: ["resume-page", "resume-pdf", "lab", "technical-operations"],
    sourceBasis: ["certificate image", "approved resume context"],
    doNotSay: [
      "Formal degree",
      "Academic research leadership",
      "Production AI deployment by itself"
    ],
    chadLensNote:
      "Use as supporting evidence for AI-readiness and evaluation literacy."
  }
];

const safeProjectionStatuses = new Set<ProofStatus>(["approved", "public-safe-summary"]);

function canProject(claim: ProofClaim, location: ProofLocation) {
  return safeProjectionStatuses.has(claim.status) && claim.allowedLocations.includes(location);
}

export const homeProofItems = proofClaims
  .filter((claim) => canProject(claim, "home"))
  .map((claim) => claim.shortWording);

export const resumeHighlights = proofClaims
  .filter((claim) => canProject(claim, "resume-page"))
  .map((claim) => claim.shortWording);

export const technicalOperationsProofItems = proofClaims
  .filter((claim) => canProject(claim, "technical-operations"))
  .map((claim) => ({
    label: claim.label,
    text: claim.longWording ?? claim.shortWording
  }));
