export type ProofProject = {
  title: string;
  category: string;
  claim: string;
  proof: string;
  websiteUse: string;
  boundary: string;
};

export const proofPrinciples = [
  {
    title: "Known",
    text:
      "Public-safe and evidence-backed enough to say directly on the site."
  },
  {
    title: "Open",
    text:
      "Potentially useful, but needs approval, stronger citation, screenshot review, or collaborator confirmation."
  },
  {
    title: "Protected",
    text:
      "Intentionally omitted because privacy, consent, client trust, law, civic sensitivity, or community safety requires it."
  }
];

export const featuredProofClaims = [
  {
    label: "Operating structure",
    text: "14+ years turning ambiguous work into requirements, workflows, documentation, public tools, and durable handoffs."
  },
  {
    label: "Legacy e-commerce",
    text: "Paper-and-phone catalog operations translated into searchable e-commerce, dealer-pricing, analytics, and publishing systems."
  },
  {
    label: "Civic memory",
    text: "30+ pages of campaign-memory infrastructure for Commercial Rent Stabilization collaboration."
  },
  {
    label: "Community platform",
    text: "WOWList archive shows 1,800+ users, 16,000+ events/posts, and 35+ active city scenes by July 2017."
  },
  {
    label: "Participation systems",
    text: "300+ documented gatherings and 20+ resident artists supported through consent-aware community infrastructure."
  }
];

export const proofProjects: ProofProject[] = [
  {
    title: "NYC Artist Coalition",
    category: "Civic and cultural-space infrastructure",
    claim:
      "Jamie is a co-founder and civic-systems / documentation / policy-communications lead for NYC Artist Coalition.",
    proof:
      "Public campaign history supports collective work around Cabaret Law repeal advocacy, Office of Nightlife / SaveNYCSpaces advocacy, M.A.R.C.H. transparency work, and Fair Rent NYC / Commercial Rent Stabilization advocacy.",
    websiteUse:
      "Describe Jamie's role as coalition infrastructure: campaign sites, explainers, testimony support, source maps, meeting memory, action materials, and public-safe language.",
    boundary:
      "Use collective-work language. Do not claim Jamie alone passed laws, created offices, wrote legal analysis, or owned the movement."
  },
  {
    title: "Harry J. Epstein Company",
    category: "Private-sector implementation",
    claim:
      "Jamie helped an 80+ year-old industrial business translate paper-and-phone catalog operations into searchable e-commerce, analytics, publishing, product-data, and workflow systems.",
    proof:
      "Public/archival sources support the online-store launch and public features. Resume/source materials support Jamie's internal implementation role and contribution language around a period of 2x revenue growth.",
    websiteUse:
      "Use as private-sector technical project management, e-commerce operations, analytics, content, and workflow proof.",
    boundary:
      "No private dashboards, customer data, revenue detail, vendor terms, credentials, or internal operating documents."
  },
  {
    title: "FairRentNYC / Commercial Rent Stabilization",
    category: "Civic documentation and source-backed memory",
    claim:
      "Jamie helped build and steward public-safe campaign-memory and coordination infrastructure for Commercial Rent Stabilization and storefront-stability advocacy.",
    proof:
      "Public-safe records support 30+ pages of running minutes, action trackers, source maps, legal/policy question logs, public-data framing, consent-aware story handling, and follow-up protocols.",
    websiteUse:
      "Use as civic operations, documentation architecture, public/private boundary, and source-backed memory proof.",
    boundary:
      "No private coalition notes, legal-review materials, stakeholder lists, raw strategy documents, private emails, unapproved quotes, or sensitive tenant/business details."
  },
  {
    title: "CallNYC",
    category: "Open-data civic prototype",
    claim:
      "Jamie built an archived civic-data prototype translating newly released City Council constituent-services open data into resident-facing find-help / next-steps guidance.",
    proof:
      "Archive traces include press/civic-tech references, a public GitHub trace, and CouncilStat release / hackathon context.",
    websiteUse:
      "Use as open-data translation, resident-facing civic interface, scope-disclaimer, and public-prototype proof.",
    boundary:
      "Archived and unofficial only. Do not imply current public-service status, official City Council affiliation, legal guidance, or emergency-service guidance."
  },
  {
    title: "WOWList",
    category: "Full-stack community platform",
    claim:
      "Jamie designed and co-built a Python / Django, PostgreSQL / PostGIS, and Ember.js community-calendar and social discovery platform organized around followable keyword communities.",
    proof:
      "Local aggregate archive analysis shows 1,846 users, 16,142 posts/events, 23,864 lists/tags, 28,837 list follows, 20,927 saved/starred events, 15,915 synced Google Calendar events, and 35+ active city scenes by July 2017.",
    websiteUse:
      "Use as full-stack public platform, social product logic, community publishing, event distribution, and product-operations proof.",
    boundary:
      "Use aggregate metrics only. Do not publish raw user data, emails, contact lists, password/session data, private media, or user-level examples without approval."
  },
  {
    title: "Sunday Dinner / 196 Artists Residency",
    category: "Participation infrastructure",
    claim:
      "Jamie created repeatable hosting, onboarding, facilitation, documentation, and continuity systems across 300+ gatherings and 20+ resident artists.",
    proof:
      "Private aggregate records show numbered gatherings through 345 and substantial participation infrastructure.",
    websiteUse:
      "Use as onboarding, facilitation, hospitality systems, artist support, continuity, and consent-boundary proof.",
    boundary:
      "Summary-only. No guest lists, attendance records, addresses, phone numbers, private stories, private scores, or unapproved photos."
  },
  {
    title: "Source-Backed Team Memory",
    category: "AI-assisted documentation method",
    claim:
      "Jamie is developing a bounded lab method for source-backed team memory: reviewable, human-correctable, source-linked operating memory for knowledge-heavy teams.",
    proof:
      "Public-safe lab materials support Known / Open / Protected, decision records, source inventories, transcript-to-minutes workflows, governance policies, eval ideas, human review, and Markdown-first knowledge pages.",
    websiteUse:
      "Use as a lab / proof-of-practice connecting technical project management, product operations, documentation architecture, AI eval discipline, human review, and governance.",
    boundary:
      "Not a finished SaaS, chatbot, private archive browser, surveillance system, legal/medical advice system, or replacement for human judgment."
  }
];
